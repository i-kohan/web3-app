import { Result, ok, err } from "../result";
import { DomainError, DomainErrorCode as E } from "../errors";

const HEX_RE = /^0x[0-9a-fA-F]+$/;
// 65 bytes (r 32 + s 32 + v 1) = 130 hex chars + '0x' → length 132
const ECDSA_SIGNATURE_LEN = 132;

export class SignatureHex {
  private constructor(private readonly _value: `0x${string}`) {}

  static create(
    input: string,
    opts?: { strictLength?: boolean }
  ): Result<DomainError, SignatureHex> {
    if (typeof input !== "string" || !HEX_RE.test(input)) {
      return err({
        code: E.SIGNATURE_NOT_HEX,
        message: "signature must be 0x-hex",
      });
    }

    if (opts?.strictLength && input.length !== ECDSA_SIGNATURE_LEN) {
      return err({
        code: E.SIGNATURE_INVALID_LENGTH,
        message: `expected ${ECDSA_SIGNATURE_LEN} chars`,
      });
    }

    const normalized = `0x${input.slice(2).toLowerCase()}` as `0x${string}`;
    return ok(new SignatureHex(normalized));
  }

  get value(): `0x${string}` {
    return this._value;
  }
  equals(other: SignatureHex): boolean {
    return this._value === other._value;
  }
}
