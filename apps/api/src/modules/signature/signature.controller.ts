import type { Request, Response } from "express";
import type { VerifySignatureDtoIn } from "./app/dto";
import { createVerifySignatureUseCase } from "./app/use-cases/verify-signature.uc";
import { EthersSignatureVerifier } from "./infra";
import { BadRequestError } from "../../core/http/errors";

const useCase = createVerifySignatureUseCase({
  verifier: new EthersSignatureVerifier(),
});

export async function verifySignatureController(req: Request, res: Response) {
  const body = (req.body ?? {}) as Partial<VerifySignatureDtoIn>;

  if (typeof body.message !== "string" || typeof body.signature !== "string") {
    throw new BadRequestError(
      'Fields "message" and "signature" must be strings'
    );
  }

  const result = await useCase({
    message: body.message,
    signature: body.signature,
  });

  if (!result.ok) {
    throw new BadRequestError(result.error.code);
  }

  return res.json({ ok: true, data: result.value });
}
