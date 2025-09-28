import { describe, it, expect } from "vitest";
import { Message } from "../domain/value-objects/Message";
import { DomainErrorCode as E } from "../domain/errors";

describe("Message VO", () => {
  it("creates with non-empty string", () => {
    const r = Message.create(" hello ");

    expect(r.ok).toBe(true);
    expect(r.ok && r.value.value).toBe(" hello ");
  });

  it("rejects empty (after trim)", () => {
    const r = Message.create("   ");

    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.code).toBe(E.MESSAGE_EMPTY);
  });

  it("rejects too long", () => {
    const long = "a".repeat(10001);
    const r = Message.create(long);

    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.code).toBe(E.MESSAGE_TOO_LONG);
  });
});
