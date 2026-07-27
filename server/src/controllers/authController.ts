import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';
import { sendEmail } from '../utils/sendEmail';
import { Otp } from '../models/Otp';
import { formatPhone } from '../utils/formatPhone';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET, {
    expiresIn: '12h',
  });
};

const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const token = generateToken(String(user._id), user.role);

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 12 * 60 * 60 * 1000, // Exactly 12 hours
  });

  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!email || !password || !name) {
      return next(new AppError('Name, email, and password are required', 400));
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return next(new AppError('User already exists', 400));
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: role || 'patient',
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return next(new AppError('Email/phone and password are required', 400));
    }

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    }).select('+password');

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { identifier } = req.body;
    
    // Check if user exists (for login) or we could just send OTP anyway
    let user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    });

    if (!user) {
      // Optional: auto-create user for seamless passwordless login, or return error
      return next(new AppError('User not found. Please register first.', 404));
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`🔑 DEV OTP CODE (Login): ${otpCode}`);

    await Otp.deleteMany({ identifier });
    await Otp.create({
      identifier,
      otpHash: otpCode,
    });

    // Simulate sending email/SMS
    console.log(`\n\n========== SIMULATED LOGIN OTP ==========`);
    console.log(`To: ${identifier}`);
    console.log(`Code: ${otpCode}`);
    console.log(`===========================================\n\n`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { identifier, otp } = req.body;

    const otpRecord = await Otp.findOne({ identifier }).sort({ createdAt: -1 });
    if (!otpRecord) return next(new AppError('OTP expired or invalid', 400));

    const isMatch = await otpRecord.matchOtp(otp);
    if (!isMatch) return next(new AppError('Incorrect OTP', 401));

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    });

    if (!user) {
       return next(new AppError('User not found', 404));
    }

    await Otp.deleteOne({ _id: otpRecord._id });
    
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const requestProfileUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) return next(new AppError('Not authenticated', 401));

    const { name, email, phone } = req.body;
    
    // Generate 4-digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`🔑 DEV OTP CODE: ${otpCode}`);

    const identifier = email || phone || user.email;

    await Otp.deleteMany({ identifier });

    await Otp.create({
      identifier,
      otpHash: otpCode,
      metadata: { name, email, phone },
    });

    if (user.email && !user.email.endsWith('@placeholder.com')) {
      await sendEmail({
        to: user.email,
        subject: 'Verify your profile update',
        text: `Your verification code is: ${otpCode}. It will expire in 5 minutes.`,
      });
    }

    const targetPhone = phone || user.phone;
    if (targetPhone) {
      try {
        const formattedPhone = formatPhone(targetPhone);
        console.log(`\n\n========== SIMULATED SMS ==========`);
        console.log(`To: ${formattedPhone}`);
        console.log(`Message: Your Facio Dental profile update code is ${otpCode}. Valid for 5 mins.`);
        console.log(`===================================\n\n`);
      } catch (smsError) {
        console.error('SMS Gateway Error:', smsError);
      }
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent to verify profile update',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyProfileUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) return next(new AppError('Not authenticated', 401));

    const { otp } = req.body;
    if (!otp) return next(new AppError('OTP is required', 400));

    const identifier = user.email || user.phone;
    const otpRecord = await Otp.findOne({ identifier, 'metadata.email': { $exists: true } }).sort({ createdAt: -1 });
    if (!otpRecord) return next(new AppError('OTP expired or invalid', 400));

    const isMatch = await otpRecord.matchOtp(otp);
    if (!isMatch) return next(new AppError('Incorrect OTP', 401));

    if (otpRecord.metadata) {
      const { name, email, phone } = otpRecord.metadata as { name?: string; email?: string; phone?: string };
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      await user.save();
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      return next(new AppError('Email or phone already in use', 409));
    }
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logoutUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
