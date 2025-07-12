import { MemStorage } from '../server/storage';

// Create a global storage instance for Vercel serverless functions
declare global {
  var __storage: MemStorage | undefined;
}

// Use a global variable to persist storage across function calls
export const storage = globalThis.__storage ?? new MemStorage();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__storage = storage;
}
