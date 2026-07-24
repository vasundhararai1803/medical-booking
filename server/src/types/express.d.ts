import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        id: string;
        email: string;
        role: string;
        name: string;
      };
    }
  }
}
