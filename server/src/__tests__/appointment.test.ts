import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import app from '../app';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Doctor } from '../models/Doctor';
import { Appointment } from '../models/Appointment';

describe.skip('Appointment Routes', () => {
  let patientCookie: string;
  let doctorId: string;
  const appointmentDate = new Date();
  appointmentDate.setUTCHours(0, 0, 0, 0); // normalize

  beforeEach(async () => {
    // Ensure indexes are built (especially the compound unique index) so memory-server enforces constraints
    await Appointment.syncIndexes();

    // 1. Create a patient user and get cookie
    const patientRes = await request(app).post('/api/auth/register').send({
      name: 'Test Patient',
      email: 'patient@example.com',
      password: 'password123',
      role: 'patient',
    });
    patientCookie = patientRes.headers['set-cookie'];

    // 2. Create a doctor user and doctor profile
    const docUser = await User.create({
      name: 'Test Doctor',
      email: 'doctor@example.com',
      password: 'password123',
      role: 'doctor',
    });

    const doc = await Doctor.create({
      userId: docUser._id,
      specializations: ['General Dentistry'],
      qualifications: ['BDS'],
      experience: '5 years',
      consultationFee: 500,
    });
    doctorId = (doc as any)._id.toString();
  });

  describe('POST /api/appointments', () => {
    it('should successfully create an appointment (pending status)', async () => {
      const response = await request(app)
        .post('/api/appointments')
        .set('Cookie', patientCookie)
        .send({
          doctorId,
          appointmentDate: appointmentDate.toISOString(),
          timeSlot: '10:00 AM',
          type: 'in-person',
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.appointment.status).toBe('pending');
      expect(response.body.data.appointment.paymentStatus).toBe('pending');
    });

    it('should reject booking due to missing validation fields (Zod)', async () => {
      const response = await request(app)
        .post('/api/appointments')
        .set('Cookie', patientCookie)
        .send({
          doctorId,
          // Missing appointmentDate and timeSlot
          type: 'invalid-type', 
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
    });

    it('should reject booking if slot is already taken (Race Condition / 409 Conflict)', async () => {
      // Create first appointment
      await request(app)
        .post('/api/appointments')
        .set('Cookie', patientCookie)
        .send({
          doctorId,
          appointmentDate: appointmentDate.toISOString(),
          timeSlot: '11:00 AM',
          type: 'in-person',
        });

      // Try to create the same appointment slot
      const conflictResponse = await request(app)
        .post('/api/appointments')
        .set('Cookie', patientCookie)
        .send({
          doctorId,
          appointmentDate: appointmentDate.toISOString(),
          timeSlot: '11:00 AM',
          type: 'in-person',
        });

      // Note: Because supertest requests are sequential in this block, our `findOne` check in the controller 
      // will catch it and return a 400. To truly test the 11000 duplicate key (atomic reservation), 
      // we can simulate a race condition using Promise.all
      const race1 = request(app)
        .post('/api/appointments')
        .set('Cookie', patientCookie)
        .send({ doctorId, appointmentDate: appointmentDate.toISOString(), timeSlot: '12:00 PM', type: 'in-person' });

      const race2 = request(app)
        .post('/api/appointments')
        .set('Cookie', patientCookie)
        .send({ doctorId, appointmentDate: appointmentDate.toISOString(), timeSlot: '12:00 PM', type: 'in-person' });

      const [res1, res2] = await Promise.all([race1, race2]);

      // One should succeed (201) and one should fail (409 Conflict)
      const statuses = [res1.status, res2.status].sort();
      expect(statuses).toEqual([201, 409]);
    });
  });
});
