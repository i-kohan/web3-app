import express from "express";
import { applyParsing, applySecurity } from "./middlewares";
import { registerRoutes } from "./routes";
import { errorMiddleware } from "./core/http/error-middleware";

export function createApp() {
  const app = express();
  applyParsing(app);
  applySecurity(app);
  registerRoutes(app);
  app.use(errorMiddleware);
  return app;
}
