import { Request, Response, NextFunction } from 'express';
import { Doctor } from '../models/Doctor';
import { Appointment } from '../models/Appointment';
import { AppError } from '../utils/AppError';

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { specialization, minRating, languages } = req.query;

    const query: any = {};

    if (specialization) {
      query.specializations = { $in: [specialization as string] };
    }
    if (minRating) {
      query['rating.average'] = { $gte: Number(minRating) };
    }
    if (languages) {
      const langs = (languages as string).split(',');
      query.languages = { $in: langs };
    }

    const doctors = await Doctor.find(query).populate({
      path: 'userId',
      select: 'name email avatar',
    });

    res.status(200).json({
      status: 'success',
      results: doctors.length,
      data: {
        doctors,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'userId',
      select: 'name email avatar',
    });

    if (!doctor) {
      return next(new AppError('No doctor found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doctor,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { weeklyAvailability } = req.body;

    if (!weeklyAvailability || !Array.isArray(weeklyAvailability)) {
      return next(new AppError('Please provide a valid weekly availability array', 400));
    }

    // req.user.id is the User._id, we need to find the Doctor document where userId matches
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user?._id },
      { weeklyAvailability },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return next(new AppError('Doctor profile not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doctor,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return next(new AppError('Please provide doctorId and date', 400));
    }

    const queryDate = new Date(date as string);
    if (isNaN(queryDate.getTime())) {
      return next(new AppError('Invalid date format', 400));
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return next(new AppError('Doctor not found', 404));
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[queryDate.getDay()];

    const daySchedule = (doctor as any).weeklyAvailability?.find((d: any) => d.dayOfWeek === dayName);
    
    if (!daySchedule) {
      res.status(200).json({
        status: 'success',
        data: {
          availableSlots: [],
        },
      });
      return;
    }

    // Generate discrete time slots based on startTime, endTime, and slotDurationMins
    const parseTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const formatTime = (totalMinutes: number) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const startMins = parseTime(daySchedule.startTime);
    const endMins = parseTime(daySchedule.endTime);
    const duration = daySchedule.slotDurationMins || 30;

    const allSlots: string[] = [];
    for (let current = startMins; current + duration <= endMins; current += duration) {
      const startSlot = formatTime(current);
      const endSlot = formatTime(current + duration);
      allSlots.push(`${startSlot} - ${endSlot}`);
    }

    // Query Appointment collection for existing bookings
    // We should match the date ignoring time part, or expect the client to send exact midnight UTC date
    const startOfDay = new Date(queryDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(queryDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      doctorId,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $ne: 'cancelled' },
    } as any);

    const bookedSlots = bookedAppointments.map((app) => app.timeSlot);
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    res.status(200).json({
      status: 'success',
      data: {
        availableSlots,
      },
    });
  } catch (error) {
    next(error);
  }
};
