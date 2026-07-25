import { Request, Response, NextFunction } from 'express';
import { Appointment } from '../models/Appointment';
import { AppError } from '../utils/AppError';

export const mockVerifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appointmentId, paymentMethod } = req.body;

    if (!appointmentId || !paymentMethod) {
      return next(new AppError('Please provide appointmentId and paymentMethod', 400));
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return next(new AppError('Appointment not found', 404));
    }

    // Verify ownership (only the patient who booked it can pay for it)
    if (appointment.patientId.toString() !== req.user?._id.toString()) {
      return next(new AppError('You do not have permission to pay for this appointment', 403));
    }

    if (appointment.paymentStatus === 'paid') {
      return next(new AppError('Appointment is already paid', 400));
    }

    // SIMULATED SERVER-SIDE VERIFICATION LOGIC
    // In a real app, this is where we'd verify a webhook payload from Stripe/Razorpay
    // or call their API to check the transaction status.
    
    const mockTransactionId = `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Update appointment state on the server
    appointment.paymentStatus = 'paid';
    appointment.paymentMethod = paymentMethod;
    appointment.transactionId = mockTransactionId;
    
    await appointment.save();

    res.status(200).json({
      status: 'success',
      message: 'Payment verified successfully',
      data: {
        transactionId: mockTransactionId,
        paymentStatus: 'paid'
      }
    });
  } catch (error) {
    next(error);
  }
};
