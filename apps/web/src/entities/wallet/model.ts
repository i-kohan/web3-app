import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function useWallet() {
  const { user, primaryWallet, setShowAuthFlow, handleLogOut } =
    useDynamicContext();

  return {
    address: primaryWallet?.address ?? null,
    isConnected: Boolean(user && primaryWallet),
    connect: () => setShowAuthFlow(true),
    disconnect: () => handleLogOut(),
  };
}
