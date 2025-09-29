import { ConnectButton } from "@/entities/wallet/ui/ConnectButton";
import { SignerPanel } from "@/widgets/signer-panel/ui/SignerPanel";
import { SuspenseBoundary } from "@/shared/ui/suspense-boundary";
import { Skeleton } from "@/shared/ui/skeleton";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

export function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Signer Demo</h1>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <SuspenseBoundary fallback={<Skeleton className="h-10 w-32" />}>
              <ConnectButton />
            </SuspenseBoundary>
            <ThemeToggle />
          </div>
        </header>
        <SuspenseBoundary fallback={<Skeleton className="h-10 w-32" />}>
          <SignerPanel />
        </SuspenseBoundary>
      </div>
    </div>
  );
}
