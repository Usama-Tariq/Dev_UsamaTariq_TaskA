import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse } from "../../shared/http";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
): void => {
  console.error("Unhandled error:", err);

  res.status(500).json({
    error: "Internal server error",
  });
};
