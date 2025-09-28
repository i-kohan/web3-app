import type { Result } from "../../domain/result";
import type { DomainError } from "../../domain/errors";
import type { Message } from "../../domain/value-objects/Message";
import type { SignatureHex } from "../../domain/value-objects/SignatureHex";
import type { Address } from "../../domain/value-objects/Address";

export interface SignatureVerifier {
  recoverSigner(
    message: Message,
    signature: SignatureHex
  ): Promise<Result<DomainError, Address>>;
}
