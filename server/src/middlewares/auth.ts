import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    // Only use MongoDB

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token no longer exists.',
          401
        )
      );
    }

    req.user = {
      _id: (currentUser._id as string).toString(),
      id: (currentUser._id as string).toString(),
      email: currentUser.email,
      role: currentUser.role,
      name: currentUser.name,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Your token has expired! Please log in again.', 401));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token. Please log in again!', 401));
    } else {
      next(error);
    }
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
