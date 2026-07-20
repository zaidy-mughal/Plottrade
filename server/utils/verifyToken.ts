import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler.js';

export interface UserPayload extends jwt.JwtPayload {
  id: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  if (!process.env.JWT_SECRET) {
    return next(errorHandler(500, 'JWT_SECRET is not defined'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = decoded as UserPayload;
    next();
  });
};