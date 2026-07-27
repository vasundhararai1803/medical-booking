import { Router } from 'express';
import {
  createAppointment,
  getMyPatientAppointments,
  getDoctorSchedule,
  cancelAppointment,
  updateAppointmentStatus,
  getBookedSlots,
  getAllSystemAppointments
} from '../controllers/appointmentController';
import { protect, restrictTo } from '../middlewares/auth';
import { upload } from '../middlewares/upload';
import { validateRequest } from '../middlewares/validateRequest';
import { createAppointmentSchema } from '../schemas/appointmentSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment Booking and Management
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - appointmentDate
 *               - timeSlot
 *               - type
 *             properties:
 *               doctorId:
 *                 type: string
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *               timeSlot:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [in-person, video]
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Validation failed or slot taken
 *       401:
 *         description: Not authenticated
 *       409:
 *         description: Conflict, slot already booked
 */
router.get('/booked-slots', getBookedSlots);

router.use(protect);

router.get('/all', restrictTo('doctor', 'admin'), getAllSystemAppointments);

router.post('/', restrictTo('patient'), upload.single('medicalReport'), validateRequest(createAppointmentSchema), createAppointment);
router.get('/my-appointments', restrictTo('patient'), getMyPatientAppointments);
router.get('/doctor-schedule', restrictTo('doctor'), getDoctorSchedule);
router.patch('/:id/cancel', cancelAppointment);
router.patch('/:id/status', restrictTo('doctor', 'admin'), updateAppointmentStatus);

export default router;
