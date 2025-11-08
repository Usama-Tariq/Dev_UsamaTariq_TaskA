import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  app.use("/api", apiRouter);

  app.use("/api", notFoundHandler);
  app.use(errorHandler);

  return app;
};
