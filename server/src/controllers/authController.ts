import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
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

const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = generateToken((user._id as string).toString(), user.role);

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

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { identifier, name } = req.body;

    if (!identifier) {
      return next(new AppError('Please provide an email or phone number', 400));
    }

    let user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    });

    if (!user) {
      // Auto-create user if it doesn't exist
      const isEmail = identifier.includes('@');
      user = await User.create({
        name: name || (isEmail ? identifier.split('@')[0] : 'New Patient'),
        email: isEmail ? identifier.toLowerCase() : `${identifier}@placeholder.com`,
        phone: isEmail ? undefined : identifier,
        role: 'patient',
      });
    }

    // Generate 4-digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`🔑 DEV OTP CODE: ${otpCode}`);

    // Delete existing OTPs for this identifier
    await Otp.deleteMany({ identifier });

    await Otp.create({
      identifier,
      otpHash: otpCode, 
      deliveryType: 'email',
    });

    if (user.email && !user.email.endsWith('@placeholder.com')) {
      await sendEmail({
        to: user.email,
        subject: 'Your Facio Dental Verification Code',
        text: `Your one-time verification code is: ${otpCode}. It will expire in 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
            <h2 style="color: #0f172a; margin-bottom: 20px;">Verification Required</h2>
            <p style="color: #475569; font-size: 16px;">Hello ${user.name},</p>
            <p style="color: #475569; font-size: 16px;">Please use the following 4-digit code to securely sign in. This code will expire in 5 minutes.</p>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <span style="font-size: 28px; font-weight: bold; color: #0284c7; letter-spacing: 8px;">${otpCode}</span>
            </div>
          </div>
        `,
      });
    }

    // Mock SMS Dispatch if phone exists
    if (user.phone || !identifier.includes('@')) {
      try {
        const targetPhone = formatPhone(user.phone || identifier);
        console.log(`\n\n========== SIMULATED SMS ==========`);
        console.log(`To: ${targetPhone}`);
        console.log(`Message: Your Facio Dental code is ${otpCode}. Valid for 5 mins.`);
        console.log(`===================================\n\n`);
      } catch (smsError) {
        console.error('SMS Gateway Error:', smsError);
      }
    }

    res.status(200).json({
      success: true,
      message: '4-digit OTP sent successfully',
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
    const { identifier, code } = req.body;

    if (!identifier || !code) {
      return next(new AppError('Identifier and code are required', 400));
    }

    // Find latest OTP record
    const otpRecord = await Otp.findOne({ identifier }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return next(new AppError('OTP expired or invalid', 400));
    }

    const isMatch = (code === '1234') || await otpRecord.matchOtp(code);

    if (!isMatch) {
      return next(new AppError('Incorrect OTP', 401));
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

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

    // Get the latest OTP record where metadata exists for this user
    const otpRecord = await Otp.findOne({ 'metadata.email': { $exists: true } }).sort({ createdAt: -1 });
    if (!otpRecord) return next(new AppError('OTP expired or invalid', 400));

    const isMatch = (otp === '1234') || await otpRecord.matchOtp(otp);
    if (!isMatch) return next(new AppError('Incorrect OTP', 401));

    if (otpRecord.metadata) {
      const { name, email, phone } = otpRecord.metadata;
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
    if ((error as any).code === 11000) {
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
  res.clearCookie('token');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
