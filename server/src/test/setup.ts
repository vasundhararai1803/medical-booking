import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach, vi } from 'vitest';

// Mock sendEmail utility to prevent actual emails from being sent
vi.mock('../utils/sendEmail', () => ({
  sendEmail: vi.fn().mockResolvedValue(true),
}));

let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Create in-memory mongodb
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
});
