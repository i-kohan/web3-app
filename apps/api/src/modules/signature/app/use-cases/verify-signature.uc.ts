import { ok, err, type Result } from "../../domain/result";
import type { DomainError } from "../../domain/errors";
import { SignatureProof } from "../../domain/entities/SignatureProof";
import type { VerifySignatureDtoIn, VerifySignatureDtoOut } from "../dto";
import type { SignatureVerifier } from "../../infra";

export function createVerifySignatureUseCase(deps: {
  verifier: SignatureVerifier;
}) {
  return async function verifySignature(
    input: VerifySignatureDtoIn
  ): Promise<Result<DomainError, VerifySignatureDtoOut>> {
    const proofRes = SignatureProof.create({
      message: input.message,
      signature: input.signature,
    });

    if (!proofRes.ok) return err(proofRes.error);

    const proof = proofRes.value;

    const recoveredRes = await deps.verifier.recoverSigner(
      proof.message,
      proof.signature
    );

    if (!recoveredRes.ok) {
      return ok({
        isValid: false,
        signer: null,
        originalMessage: proof.message.value,
      });
    }

    const recovered = recoveredRes.value;

    return ok({
      isValid: true,
      signer: recovered.value,
      originalMessage: proof.message.value,
    });
  };
}
