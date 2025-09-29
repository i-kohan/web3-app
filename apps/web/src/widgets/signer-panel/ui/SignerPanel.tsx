import { useState } from "react";
import { useWallet } from "@/entities/wallet/model";
import { useSignMessage } from "@/features/sign-message/model";
import { verify } from "@/features/verify-signature/model";
import { VerifyPanel } from "@/features/verify-signature/ui/VerifyPanel";
import type { SignatureResult } from "@/entities/signature/types";
import { useHistory } from "@/entities/history/model";
import { HistoryList } from "./HistoryList";
import { SignForm } from "@/features/sign-message/ui/SignForm";
import { toast } from "sonner";
import { ErrorBoundary } from "@/shared/ui/error-boundary";

export function SignerPanel() {
  const { isConnected } = useWallet();
  const signMessage = useSignMessage();
  const [
    historyItems,
    { add: addToHistory, clear: clearHistory, remove: removeHistoryItem },
    isHistoryLoading,
  ] = useHistory();
  const [result, setResult] = useState<SignatureResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(message: string) {
    setLoading(true);
    setResult(null);

    try {
      if (!isConnected) throw new Error("Connect your wallet first");

      toast.info("Signing message...");
      const signature = await signMessage(message);

      toast.info("Verifying signature...");
      const res = await verify(message, signature);

      setResult(res);
      addToHistory(message, signature, res);
      toast.success("Verified", {
        description: res.isValid
          ? "Signature is valid"
          : "Signature is invalid",
      });
    } catch (e) {
      toast.error("Error", {
        description: e instanceof Error ? e.message : "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <ErrorBoundary>
          <SignForm
            onSubmit={handleSubmit}
            disabled={loading || !isConnected}
            logged={isConnected}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <VerifyPanel result={result} />
        </ErrorBoundary>
      </div>

      <div className="space-y-4">
        <ErrorBoundary>
          <HistoryList
            items={historyItems}
            onClear={clearHistory}
            onRemove={removeHistoryItem}
            isLoading={isHistoryLoading}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
