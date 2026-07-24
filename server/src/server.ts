import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aurasmile';

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
    console.warn('⚠️ Please ensure MongoDB is running locally or provide a valid MONGO_URI in .env');
    console.warn('⚠️ The server will still boot for mock routing purposes.');
  });

const server = app.listen(PORT, () => {
  console.log(`🚀 AuraSmile Server is running on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: any) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
