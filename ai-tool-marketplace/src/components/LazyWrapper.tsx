"use client";

import { Suspense, ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoadingSpinner from "./LoadingSpinner";

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  loadingText?: string;
  showErrorDetails?: boolean;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  errorFallback,
  loadingText = "Loading component...",
  showErrorDetails = false,
}) => {
  const defaultFallback = <LoadingSpinner text={loadingText} />;

  return (
    <ErrorBoundary fallback={errorFallback} showDetails={showErrorDetails}>
      <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default LazyWrapper;
