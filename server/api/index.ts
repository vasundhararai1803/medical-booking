import mongoose from 'mongoose';
import { Request, Response } from 'express';
import app from '../src/app';

// Cache the Mongoose connection promise so cold starts reuse active connections
let cachedDb: Promise<typeof mongoose> | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Please define the MONGO_URI environment variable');
  }

  console.log('Establishing new database connection for serverless function...');
  cachedDb = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
    maxPoolSize: 5,
    bufferCommands: false, // Return error if connection fails instead of hanging
  });

  return cachedDb;
}

export default async function handler(req: Request, res: Response) {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(503).json({
      success: false,
      message: 'Database connection failed during cold start',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Invoke the Express app with the incoming request
  return app(req, res);
}
