import type { PropsWithChildren } from "react";
import { DynamicProvider } from "./DynamicProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return <DynamicProvider>{children}</DynamicProvider>;
}
