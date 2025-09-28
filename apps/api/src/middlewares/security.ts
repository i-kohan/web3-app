import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";

export function applySecurity(app: Express) {
  app.use(helmet());
  app.use(cors());
}
