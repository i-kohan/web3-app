import type { Express } from "express";
import express from "express";

export function applyParsing(app: Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}
