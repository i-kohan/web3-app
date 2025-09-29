import { use } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function createNetworkLoadingPromise(loadingNetwork: boolean): Promise<void> {
  if (!loadingNetwork) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const checkLoading = () => {
      if (!loadingNetwork) {
        resolve();
      } else {
        setTimeout(checkLoading, 100);
      }
    };
    checkLoading();
  });
}

export function useWallet() {
  const { user, primaryWallet, handleLogOut, loadingNetwork } =
    useDynamicContext();

  if (loadingNetwork) {
    use(createNetworkLoadingPromise(loadingNetwork));
  }

  return {
    address: primaryWallet?.address ?? null,
    isConnected: Boolean(user && primaryWallet),
    disconnect: () => handleLogOut(),
  };
}
