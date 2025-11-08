// server/index.ts
import path from "path";
import express from "express";
import { createApp } from "./app";
import { config, NodeEnv } from "./config/env";

const app = createApp();

// Serve frontend in production
if (config.nodeEnv === NodeEnv.PRODUCTION) {
  const distPath = path.join(__dirname, "..", "dist");

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(config.port, () => {
  console.log(
    `Server listening on http://localhost:${config.port} (${config.nodeEnv})`
  );
});
