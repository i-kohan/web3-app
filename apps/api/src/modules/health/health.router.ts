import { Router } from "express";
import { getHealth } from "./health.controller";

export const router = Router();
router.get("/", getHealth);
