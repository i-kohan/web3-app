import { Suspense } from "react";
import { ErrorBoundary } from "./error-boundary";
import { Skeleton } from "./skeleton";

export function SuspenseBoundary({
  children,
  fallback = <Skeleton />,
  errorFallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: (error: Error, retry: () => void) => React.ReactNode;
}) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
