import type { SignatureResult } from "@/entities/signature/types";

type Props = { result: SignatureResult | null };

export function VerifyPanel({ result }: Props) {
  if (!result) return null;
  return (
    <div>
      <p>isValid: {String(result.isValid)}</p>
      <p>signer: {result.signer}</p>
      <p>originalMessage: {result.originalMessage}</p>
    </div>
  );
}
