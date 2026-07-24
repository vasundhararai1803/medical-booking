import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';

// Mock storage for offline testing
const mockUsers: any[] = [];
let mockUserIdCounter = 1;

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '15m',
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Please provide name, email, and password', 400));
    }

    const userRole = role === 'doctor' || role === 'admin' ? role : 'patient';

    // Offline mock fallback
    if (mongoose.connection.readyState !== 1) {
      const existing = mockUsers.find(u => u.email === email);
      if (existing) return next(new AppError('Email already in use', 400));
      
      const newUser = { id: String(mockUserIdCounter++), name, email, password, role: userRole };
      mockUsers.push(newUser);
      
      const token = generateToken(newUser.id, newUser.role);
      res.status(201).json({
        success: true,
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
      });
      return;
    }

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

    const token = generateToken((newUser._id as string).toString(), newUser.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
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

    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    // Offline mock fallback
    if (mongoose.connection.readyState !== 1) {
      const user = mockUsers.find(u => u.email === email);
      if (!user || user.password !== password) {
        return next(new AppError('Incorrect email or password', 401));
      }
      const token = generateToken(user.id, user.role);
      res.status(200).json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
      return;
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken((user._id as string).toString(), user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
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

export const getMockUser = (id: string) => {
  return mockUsers.find(u => u.id === id);
};
