import mongoose from 'mongoose';
import app from './app';
import { env } from './config/env';

const PORT = env.PORT;
const MONGO_URI = env.MONGO_URI;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to Database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('💥 Shutting down due to database connection failure.');
    process.exit(1);
  });

const server = app.listen(PORT, () => {
  console.log(`🚀 AuraSmile Server is running on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
