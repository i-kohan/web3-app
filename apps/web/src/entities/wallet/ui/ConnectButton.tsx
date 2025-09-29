import { Button } from "@/shared/ui/button";
import { useWallet } from "../model";

export function ConnectButton() {
  const { address, isConnected, connect, disconnect } = useWallet();

  if (!isConnected) {
    return <Button onClick={connect}>Connect Wallet</Button>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">
        {address?.slice(0, 6)}…{address?.slice(-4)}
      </span>
      <Button variant="outline" onClick={disconnect}>
        Disconnect
      </Button>
    </div>
  );
}
