import { verifyMessage } from "ethers";
import { ok, err } from "../../domain/result";
import type { Result } from "../../domain/result";
import type { DomainError } from "../../domain/errors";
import type { Message } from "../../domain/value-objects/Message";
import type { SignatureHex } from "../../domain/value-objects/SignatureHex";
import { Address } from "../../domain/value-objects/Address";
import type { SignatureVerifier } from "../ports/SignatureVerifier";

export class EthersSignatureVerifier implements SignatureVerifier {
  async recoverSigner(
    message: Message,
    signature: SignatureHex
  ): Promise<Result<DomainError, Address>> {
    try {
      const recovered = await verifyMessage(message.value, signature.value);
      const addr = Address.create(recovered);

      if (!addr.ok) {
        return err({
          code: "RECOVERY_FAILED",
          message: "recovered address is invalid",
        });
      }

      return ok(addr.value);
    } catch {
      return err({
        code: "RECOVERY_FAILED",
        message: "failed to recover signer from signature",
      });
    }
  }
}
