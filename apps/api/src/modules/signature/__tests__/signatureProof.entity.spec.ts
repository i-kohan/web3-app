import { describe, it, expect } from "vitest";
import { SignatureProof } from "../domain/entities/SignatureProof";
import { DomainErrorCode as E } from "../domain/errors";

describe("SignatureProof entity", () => {
  it("ok when message and signature valid", () => {
    const r = SignatureProof.create({
      message: "hi",
      signature: "0x" + "ab".repeat(65),
    });

    expect(r.ok).toBe(true);
  });

  it("propagates message error", () => {
    const r = SignatureProof.create({
      message: "   ",
      signature: "0x" + "ab".repeat(65),
    });

    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.code).toBe(E.MESSAGE_EMPTY);
  });

  it("propagates signature error", () => {
    const r = SignatureProof.create({
      message: "hello",
      signature: "bad",
    });

    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.code).toBe(E.SIGNATURE_NOT_HEX);
  });
});
