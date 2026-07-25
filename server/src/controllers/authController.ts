import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = generateToken((user._id as string).toString(), user.role);

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const userRole = role === 'doctor' || role === 'admin' ? role : 'patient';

    // Only use MongoDB

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: userRole,
    });

    sendTokenResponse(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Only use MongoDB

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
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

// Removed getMockUser
