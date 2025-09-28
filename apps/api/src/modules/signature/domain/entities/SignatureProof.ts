import { Result, ok, err } from "../result";
import type { DomainError } from "../errors";
import { Message } from "../value-objects/Message";
import { SignatureHex } from "../value-objects/SignatureHex";

export type SignatureProofProps = {
  message: Message;
  signature: SignatureHex;
};

export class SignatureProof {
  private constructor(private readonly props: SignatureProofProps) {}

  static create(input: {
    message: string;
    signature: string;
  }): Result<DomainError, SignatureProof> {
    const m = Message.create(input.message);
    if (!m.ok) return err(m.error);

    const s = SignatureHex.create(input.signature);
    if (!s.ok) return err(s.error);

    return ok(new SignatureProof({ message: m.value, signature: s.value }));
  }

  get message(): Message {
    return this.props.message;
  }
  get signature(): SignatureHex {
    return this.props.signature;
  }
}
