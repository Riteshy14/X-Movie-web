// src/types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;  // or number depending on your JWT structure
      };
    }
  }
}

export {}