import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import type { PropsWithChildren } from "react";

import { env } from "@/shared/config/env";

export function DynamicProvider({ children }: PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: env.DYNAMIC_ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
