import { Result, ok, err } from "../result";
import type { DomainError } from "../errors";

export class Message {
  private constructor(private readonly _value: string) {}

  static create(
    input: string,
    opts?: { maxLength?: number }
  ): Result<DomainError, Message> {
    const max = opts?.maxLength ?? 10_000;

    if (typeof input !== "string")
      return err({ code: "MESSAGE_EMPTY", message: "message must be string" });

    const value = input.trim();
    if (!value)
      return err({ code: "MESSAGE_EMPTY", message: "message is empty" });

    if (value.length > max)
      return err({
        code: "MESSAGE_TOO_LONG",
        message: `message length > ${max}`,
      });

    return ok(new Message(value));
  }

  get value(): string {
    return this._value;
  }
  equals(other: Message): boolean {
    return this._value === other._value;
  }
  toString(): string {
    return this._value;
  }
}
