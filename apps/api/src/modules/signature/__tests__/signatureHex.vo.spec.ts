import { describe, it, expect } from "vitest";
import { SignatureHex } from "../domain/value-objects/SignatureHex";
import { DomainErrorCode as E } from "../domain/errors";

describe("SignatureHex VO", () => {
  it("accepts valid 0x-hex (normalizes to lower-case)", () => {
    const r = SignatureHex.create("0xAaBb");

    expect(r.ok).toBe(true);
    expect(r.ok && r.value.value).toBe("0xaabb");
  });

  it("rejects non-hex", () => {
    const r = SignatureHex.create("not-hex");

    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.code).toBe(E.SIGNATURE_NOT_HEX);
  });

  it("rejects wrong length when strict", () => {
    const r = SignatureHex.create("0x12", { strictLength: true });

    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.code).toBe(E.SIGNATURE_INVALID_LENGTH);
  });
});
