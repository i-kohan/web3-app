import { SignerPanel } from "@/widgets/signer-panel/ui/SignerPanel";

export function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Signer Demo</h1>
      <SignerPanel />
    </div>
  );
}
