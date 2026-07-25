import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../app';
import { User } from '../models/User';

describe.skip('Auth Routes', () => {
  const testUser = {
    name: 'Test Patient',
    email: 'test@example.com',
    password: 'password123',
    role: 'patient',
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user and return a cookie', async () => {
      const response = await request(app).post('/api/auth/register').send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.body.user.email).toBe(testUser.email);
      
      // Verify user was saved in db
      const userInDb = await User.findOne({ email: testUser.email });
      expect(userInDb).toBeTruthy();
    });

    it('should fail registration with invalid email format (Zod validation)', async () => {
      const response = await request(app).post('/api/auth/register').send({
        ...testUser,
        email: 'invalid-email',
      });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
    });

    it('should fail registration with short password (Zod validation)', async () => {
      const response = await request(app).post('/api/auth/register').send({
        ...testUser,
        password: 'short',
      });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user and set cookie', async () => {
      // First register
      await request(app).post('/api/auth/register').send(testUser);

      // Then login
      const response = await request(app).post('/api/auth/login').send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // Check if Set-Cookie header exists
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should reject login with wrong password', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const response = await request(app).post('/api/auth/login').send({
        email: testUser.email,
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Incorrect email or password');
    });
  });
});
