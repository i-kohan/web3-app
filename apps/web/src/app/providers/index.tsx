import type { PropsWithChildren } from "react";
import { DynamicProvider } from "./DynamicProvider";
import { Toaster } from "sonner";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <DynamicProvider>
      {children}
      <Toaster />
    </DynamicProvider>
  );
}
