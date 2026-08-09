import mongoose from 'mongoose';

import { env } from './env.js';

/**
 * Opens the MongoDB connection. Called once at startup (before listen);
 * a failure here should crash the process — the API is useless without a DB.
 */
export async function connectDB(): Promise<void> {
  await mongoose.connect(env.mongodbUri);
  console.log('[db] MongoDB connected');
}

/** Closes the MongoDB connection. Called during graceful shutdown. */
export async function disconnectDB(): Promise<void> {
  await mongoose.connection.close();
  console.log('[db] MongoDB connection closed');
}
