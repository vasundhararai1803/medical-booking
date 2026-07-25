import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`[FATAL] Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

export const env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  MONGO_URI: process.env.MONGO_URI as string,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
