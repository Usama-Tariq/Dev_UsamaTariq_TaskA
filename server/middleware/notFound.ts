import { Request, Response } from "express";
import { ApiErrorResponse } from "../../shared/http";

export const notFoundHandler = (
  _req: Request,
  res: Response<ApiErrorResponse>
): void => {
  res.status(404).json({ error: "Not found" });
};
