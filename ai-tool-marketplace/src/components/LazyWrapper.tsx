"use client";

import { Suspense, lazy, ComponentType } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LazyWrapperProps {
  fallback?: React.ReactNode;
  className?: string;
}

export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn);

  return function WrappedLazyComponent(
    props: React.ComponentProps<T> & LazyWrapperProps
  ) {
    const { fallback: customFallback, className, ...componentProps } = props;

    const defaultFallback = (
      <div
        className={`flex items-center justify-center p-8 ${className || ""}`}
      >
        <LoadingSpinner size="md" />
      </div>
    );

    return (
      <Suspense fallback={customFallback || defaultFallback}>
        <LazyComponent {...(componentProps as React.ComponentProps<T>)} />
      </Suspense>
    );
  };
}
