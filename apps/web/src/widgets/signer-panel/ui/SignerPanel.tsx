import { useState } from "react";
import { SignForm } from "@/features/sign-message/ui/SignForm";
import { VerifyPanel } from "@/features/verify-signature/ui/VerifyPanel";
import { verify } from "@/features/verify-signature/model";
import type { SignatureResult } from "@/entities/signature/types";

export function SignerPanel() {
  const [result, setResult] = useState<SignatureResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSigned(message: string, signature: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await verify(message, signature);
      setResult(res);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <SignForm onSigned={handleSigned} />
      {loading && <p>Verifying…</p>}
      {error && <p className="text-red-600">{error}</p>}
      <VerifyPanel result={result} />
    </div>
  );
}
