import { describe, it, expect } from "vitest";
import { createVerifySignatureUseCase } from "../app/use-cases/verify-signature.uc";
import type { SignatureVerifier } from "../infra";
import { ok, err } from "../domain/result";
import { Address } from "../domain/value-objects/Address";
import { Message } from "../domain/value-objects/Message";
import { SignatureHex } from "../domain/value-objects/SignatureHex";
import { DomainErrorCode as E } from "../domain/errors";

const makeOkVerifier = (addr: string): SignatureVerifier => ({
  recoverSigner: async (m, s) => {
    if (!(m instanceof Message) || !(s instanceof SignatureHex))
      throw new Error("VO expected");

    const a = Address.create(addr);

    if (!a.ok) throw new Error("bad mock address");

    return ok(a.value);
  },
});

const errorVerifier: SignatureVerifier = {
  recoverSigner: async () => err({ code: E.RECOVERY_FAILED }),
};

describe("use-case: verifySignature", () => {
  it("returns isValid:true with signer on success", async () => {
    const useCase = createVerifySignatureUseCase({
      verifier: makeOkVerifier("0x" + "1".repeat(40)),
    });
    const res = await useCase({
      message: "hello",
      signature: "0x" + "ab".repeat(65),
    });

    expect(res.ok).toBe(true);
    expect(res.ok && res.value.isValid).toBe(true);
    expect(res.ok && res.value.signer).toBe("0x" + "1".repeat(40));
    expect(res.ok && res.value.originalMessage).toBe("hello");
  });

  it("returns isValid:false when recovery fails", async () => {
    const useCase = createVerifySignatureUseCase({ verifier: errorVerifier });
    const res = await useCase({
      message: "hello",
      signature: "0x" + "ab".repeat(65),
    });

    expect(res.ok).toBe(true);
    expect(res.ok && res.value.isValid).toBe(false);
    expect(res.ok && res.value.signer).toBeNull();
  });

  it("returns Err for bad input (MESSAGE_EMPTY)", async () => {
    const useCase = createVerifySignatureUseCase({
      verifier: makeOkVerifier("0x" + "1".repeat(40)),
    });
    const res = await useCase({
      message: "   ",
      signature: "0x" + "ab".repeat(65),
    });

    expect(res.ok).toBe(false);
    expect(!res.ok && res.error.code).toBe(E.MESSAGE_EMPTY);
  });
});
