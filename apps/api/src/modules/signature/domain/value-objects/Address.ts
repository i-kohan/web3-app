import { Result, ok, err } from "../result";
import { DomainError, DomainErrorCode as E } from "../errors";

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

export class Address {
  private constructor(private readonly _value: `0x${string}`) {}

  static create(input: string): Result<DomainError, Address> {
    if (typeof input !== "string" || !ADDRESS_RE.test(input)) {
      return err({
        code: E.ADDRESS_INVALID,
        message: "address must be 0x + 40 hex",
      });
    }

    const normalized = `0x${input.slice(2).toLowerCase()}` as `0x${string}`;

    return ok(new Address(normalized));
  }

  get value(): `0x${string}` {
    return this._value;
  }
  equals(other: Address): boolean {
    return this._value === other._value;
  }
  toString(): string {
    return this._value;
  }
}
