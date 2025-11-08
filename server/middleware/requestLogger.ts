import { NextFunction, Request, Response } from "express";
import { config } from "../config/env";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (config.nodeEnv === "test") {
    return next();
  }

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  next();
};
