import type { NextFunction, Request, Response } from "express";
import { HttpError } from "./errors";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const isHttp = err instanceof HttpError;
  const status = isHttp ? err.status : 500;
  const message = isHttp ? err.message : "Internal Server Error";
  res.status(status).json({ ok: false, error: { message } });
}
