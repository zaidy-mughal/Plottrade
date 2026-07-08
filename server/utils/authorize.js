import { errorHandler } from "../utils/errorHandler.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(errorHandler(403, "You are not authorized"));
    }
    next();
  };
};