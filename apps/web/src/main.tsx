import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import "./index.css";
import { AppRoutes } from "./app/routes.tsx";
import { SuspenseBoundary } from "./shared/ui/suspense-boundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SuspenseBoundary>
        <AppRoutes />
      </SuspenseBoundary>
    </ThemeProvider>
  </StrictMode>
);
