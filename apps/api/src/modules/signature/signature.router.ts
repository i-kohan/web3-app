import { Router } from "express";
import { verifySignatureController } from "./signature.controller";

export const router = Router();
router.post("/verify-signature", verifySignatureController);
