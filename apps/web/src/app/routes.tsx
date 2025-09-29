import { Page } from "@/pages/home/ui/Page";
import { AppProviders } from "./providers";

export function AppRoutes() {
  return (
    <AppProviders>
      <Page />
    </AppProviders>
  );
}
