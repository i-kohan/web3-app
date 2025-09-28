import { Result, ok, err } from "../result";
import { DomainErrorCode as E } from "../errors";

export class Message {
  private constructor(private readonly _value: string) {}

  static create(
    input: string,
    opts?: { maxLength?: number }
  ): Result<{ code: (typeof E)[keyof typeof E] }, Message> {
    const max = opts?.maxLength ?? 10_000;

    if (typeof input !== "string")
      return err({ code: E.MESSAGE_EMPTY, message: "message must be string" });

    if (input.trim().length === 0)
      return err({ code: E.MESSAGE_EMPTY, message: "message is empty" });

    if (input.length > max)
      return err({
        code: E.MESSAGE_TOO_LONG,
        message: `message length > ${max}`,
      });

    return ok(new Message(input));
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
