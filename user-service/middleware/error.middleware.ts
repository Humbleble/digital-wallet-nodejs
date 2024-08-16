import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface ValidationError extends Error {
  errors: { [key: string]: { message: string } };
}

interface DuplicateKeyError extends Error {
  code: number;
  keyValue: { [key: string]: string };
}

interface UnauthorizedError extends Error {
  name: string;
}

const errorHandler = (
  err: ValidationError | DuplicateKeyError | UnauthorizedError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values((err as ValidationError).errors).map(error => error.message);
    return res.status(400).json({ error: errors });
  }

  // Mongoose duplicate key error
  if ('code' in err && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `${field} already exists.` });
  }

  // JWT authentication error
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Default to 500 server error
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;