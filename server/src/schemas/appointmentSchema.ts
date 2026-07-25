import { z } from 'zod';

export const createAppointmentSchema = z.object({
  body: z.object({
    doctorId: z.string().min(1, 'Doctor ID is required'),
    treatmentId: z.string().optional(),
    appointmentDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
    timeSlot: z.string().min(1, 'Time slot is required'),
    type: z.enum(['in-person', 'video'], {
      errorMap: () => ({ message: 'Type must be either in-person or video' }),
    }),
    notes: z.string().optional(),
    paymentMethod: z.string().optional(),
  }),
});
