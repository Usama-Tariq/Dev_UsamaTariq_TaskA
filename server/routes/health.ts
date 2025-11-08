import { Router, Request, Response } from "express";
import { HealthResponse } from "../../shared/http";
import { config } from "../config/env";

const router = Router();

router.get("/health", (_req: Request, res: Response<HealthResponse>): void => {
  const payload: HealthResponse = {
    status: "ok",
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    env: config.nodeEnv,
  };

  res.json(payload);
});

export default router;
