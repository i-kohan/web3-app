import { useCallback, useState } from "react";
import { SignForm } from "@/features/sign-message/ui/SignForm";
import { VerifyPanel } from "@/features/verify-signature/ui/VerifyPanel";
import { verify } from "@/features/verify-signature/model";
import type { SignatureResult } from "@/entities/signature/types";
import { useHistory } from "@/entities/history/model";
import { HistoryList } from "./HistoryList";

export function SignerPanel() {
  const [history, { add, clear, remove }] = useHistory();

  const [result, setResult] = useState<SignatureResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSigned = useCallback(
    async (message: string, signature: string) => {
      setError(null);
      setLoading(true);
      try {
        const res = await verify(message, signature);
        setResult(res);
        add(message, signature, res);
      } catch (e) {
        setResult(null);
        setError(e instanceof Error ? e.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    },
    [add]
  );

  return (
    <div className="space-y-4">
      <SignForm onSigned={handleSigned} />
      {loading && <p>Verifying…</p>}
      {error && <p className="text-red-600">{error}</p>}
      <VerifyPanel result={result} />
      <HistoryList items={history} onClear={clear} onRemove={remove} />
    </div>
  );
}
