import { ConnectButton } from "@/entities/wallet/ui/ConnectButton";
import { SignerPanel } from "@/widgets/signer-panel/ui/SignerPanel";

export function Page() {
  return (
    <div className="p-6 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Signer Demo</h1>
        <ConnectButton />
      </header>
      <SignerPanel />
    </div>
  );
}
