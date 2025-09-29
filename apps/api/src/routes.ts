import type { Express } from "express";
import express from "express";
import { healthRouter } from "./modules/health";
import { signatureRouter } from "./modules/signature";

export function registerRoutes(app: Express) {
  const v1 = express.Router();
  v1.use("/health", healthRouter);
  v1.use(signatureRouter);
  app.use("/api/v1", v1);
}
