import { Request, Response, NextFunction } from 'express';
import { Appointment } from '../models/Appointment';
import { Doctor } from '../models/Doctor';
import { AppError } from '../utils/AppError';
import { sendEmail } from '../utils/sendEmail';

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { doctorId, treatmentId, appointmentDate, timeSlot, type, notes, paymentMethod } = req.body;
    const medicalReportUrl = req.file?.path;

    // Normalize date to midnight UTC to ensure index matching is strictly by day
    const normalizedDate = new Date(appointmentDate);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const startOfDay = new Date(normalizedDate);
    const endOfDay = new Date(normalizedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingAppointment = await Appointment.findOne({
      doctorId,
      timeSlot,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $ne: 'cancelled' },
    });

    if (existingAppointment) {
      return next(new AppError('This time slot is already booked', 400));
    }

    let videoConsultUrl;
    if (type === 'video') {
      const uniqueId = Math.random().toString(36).substring(2, 10);
      videoConsultUrl = `https://meet.jit.si/FacioDental_Appt_${uniqueId}`;
    }

    let newAppointment;
    try {
      newAppointment = await Appointment.create({
        patientId: req.user?._id,
        doctorId,
        treatmentId,
        appointmentDate: normalizedDate,
        timeSlot,
        type,
        notes,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod,
        medicalReportUrl,
        videoConsultUrl,
      });
    } catch (err: any) {
      if (err.code === 11000) {
        return next(new AppError('This time slot was just booked by another patient. Please select another slot.', 409));
      }
      throw err;
    }

    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('patientId', 'name email phoneNumber')
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } })
      .populate('treatmentId', 'title');

    if (populatedAppointment) {
      const patient: any = populatedAppointment.patientId;
      const doctor: any = populatedAppointment.doctorId;
      const treatment: any = populatedAppointment.treatmentId;

      // Email to Patient
      if (patient?.email) {
        await sendEmail({
          to: patient.email,
          subject: 'Appointment Request Received - Facio Dental',
          html: `
            <h2>Appointment Request Received</h2>
            <p>Dear ${patient.name},</p>
            <p>Your appointment request has been successfully submitted. Here are the details:</p>
            <ul>
              <li><strong>Clinic:</strong> Facio Dental Super Speciality Centre</li>
              <li><strong>Treatment:</strong> ${treatment ? treatment.title : 'General / Custom'}</li>
              <li><strong>Date:</strong> ${new Date(appointmentDate).toDateString()}</li>
              <li><strong>Time:</strong> ${timeSlot}</li>
              <li><strong>Type:</strong> ${type}</li>
              <li><strong>Doctor:</strong> Dr. ${doctor?.userId?.name}</li>
            </ul>
            <p>We will review your request and confirm it shortly.</p>
          `
        });
      }

      // Email to Doctor/Admin
      if (doctor?.userId?.email) {
        await sendEmail({
          to: doctor.userId.email,
          subject: 'New Appointment Request - Facio Dental',
          html: `
            <h2>New Appointment Request</h2>
            <p>You have received a new appointment request:</p>
            <ul>
              <li><strong>Patient Name:</strong> ${patient?.name}</li>
              <li><strong>Contact:</strong> ${patient?.phoneNumber || 'N/A'} (Email: ${patient?.email})</li>
              <li><strong>Treatment:</strong> ${treatment ? treatment.title : 'General / Custom'}</li>
              <li><strong>Date:</strong> ${new Date(appointmentDate).toDateString()}</li>
              <li><strong>Time:</strong> ${timeSlot}</li>
              <li><strong>Type:</strong> ${type === 'video' ? 'Virtual Consultation' : 'In-Clinic Visit'}</li>
              ${videoConsultUrl ? `<li><strong>Video Link:</strong> <a href="${videoConsultUrl}">${videoConsultUrl}</a></li>` : ''}
              ${medicalReportUrl ? `<li><strong>Medical Report:</strong> <a href="${medicalReportUrl}">View Uploaded Document</a></li>` : ''}
            </ul>
            <p>Please log in to the dashboard to confirm or manage this request.</p>
          `
        });
      }
    }

    res.status(201).json({
      status: 'success',
      data: {
        appointment: newAppointment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPatientAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointments = await Appointment.find({ patientId: req.user?._id })
      .populate({
        path: 'doctorId',
        select: 'name email',
      })
      .populate({
        path: 'treatmentId',
        select: 'title category durationMinutes',
      })
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { startDate, endDate, status } = req.query;

    // req.user._id is the User _id. Find the corresponding Doctor document.
    const doctor = await Doctor.findOne({ userId: req.user?._id });
    if (!doctor) {
      return next(new AppError('Doctor profile not found', 404));
    }

    const query: any = { doctorId: doctor._id };

    if (startDate && endDate) {
      query.appointmentDate = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    } else if (startDate) {
      query.appointmentDate = { $gte: new Date(startDate as string) };
    }

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: 'patientId',
        select: 'name email phoneNumber',
      })
      .populate({
        path: 'treatmentId',
        select: 'title category durationMinutes',
      })
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new AppError('No appointment found with that ID', 404));
    }

    // Check ownership or admin rights
    const isPatient = appointment.patientId.toString() === (req.user as any)?._id?.toString();
    const isAdmin = req.user?.role === 'admin';
    // For doctor, check if the doctorId belongs to them
    let isDoctorOwner = false;
    if (req.user?.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user?._id });
      if (doctor && appointment.doctorId.toString() === doctor._id.toString()) {
        isDoctorOwner = true;
      }
    }

    if (!isPatient && !isAdmin && !isDoctorOwner) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      status: 'success',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.body;

    if (!['confirmed', 'completed', 'cancelled'].includes(status)) {
      return next(new AppError('Invalid status', 400));
    }

    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email')
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } })
      .populate('treatmentId', 'title');

    if (!appointment) {
      return next(new AppError('No appointment found with that ID', 404));
    }

    // Verify doctor ownership if role is doctor
    if (req.user?.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user?._id });
      if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }
    }

    appointment.status = status;
    await appointment.save();

    if (status === 'confirmed' || status === 'cancelled') {
      const patient: any = appointment.patientId;
      const treatment: any = appointment.treatmentId;
      const doctor: any = appointment.doctorId;

      if (patient?.email) {
        const statusText = status === 'confirmed' ? 'has been Confirmed' : 'was Cancelled';
        await sendEmail({
          to: patient.email,
          subject: `Appointment ${status === 'confirmed' ? 'Confirmed' : 'Cancelled'} - Facio Dental`,
          html: `
            <h2>Appointment ${statusText}</h2>
            <p>Dear ${patient.name},</p>
            <p>Your appointment with Dr. ${doctor?.userId?.name} for ${treatment ? treatment.title : 'General / Custom'} on ${new Date(appointment.appointmentDate).toDateString()} at ${appointment.timeSlot} ${statusText.toLowerCase()}.</p>
            ${status === 'cancelled' ? '<p>If you have any questions or wish to reschedule, please contact us.</p>' : '<p>We look forward to seeing you!</p>'}
          `
        });
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookedSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return next(new AppError('Please provide both doctorId and date', 400));
    }

    const startOfDay = new Date(date as string);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date as string);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      doctorId,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $ne: 'cancelled' },
    } as any).select('timeSlot -_id');

    const bookedSlots = bookedAppointments.map((app) => app.timeSlot);

    res.status(200).json({
      status: 'success',
      data: {
        bookedSlots,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSystemAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'patientId',
        select: 'name email phoneNumber',
      })
      .populate({
        path: 'doctorId',
        select: 'userId',
        populate: {
          path: 'userId',
          select: 'name'
        }
      })
      .populate({
        path: 'treatmentId',
        select: 'title category durationMinutes',
      })
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (error) {
    next(error);
  }
};
