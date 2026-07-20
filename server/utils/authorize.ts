import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler.js';

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return next(errorHandler(403, 'You are not authorized'));
    }
    next();
  };
};