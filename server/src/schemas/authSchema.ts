import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['patient', 'doctor', 'admin']).optional(),
  }),
});

export const sendOtpSchema = z.object({
  body: z.object({
    identifier: z.string().min(3, 'Email or phone is required'),
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    identifier: z.string().min(3, 'Email or phone is required'),
    code: z.string().length(4, 'OTP must be 4 digits'),
  }),
});
