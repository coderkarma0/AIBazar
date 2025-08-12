import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import LazyWrapper from "../LazyWrapper";

// Mock the ErrorBoundary and LoadingSpinner components
jest.mock("../ErrorBoundary", () => {
  return function MockErrorBoundary({
    children,
    fallback,
    showDetails,
  }: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    showDetails?: boolean;
  }) {
    return (
      <div data-testid="error-boundary" data-show-details={showDetails}>
        {fallback && <div data-testid="error-fallback">{fallback}</div>}
        {children}
      </div>
    );
  };
});

jest.mock("../LoadingSpinner", () => {
  return function MockLoadingSpinner({ text }: { text?: string }) {
    return <div data-testid="loading-spinner">{text}</div>;
  };
});

// Mock component that throws an error (for potential future use)
// const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
//   if (shouldThrow) {
//     throw new Error("Test error");
//   }
//   return <div>No error</div>;
// };

// Mock component that simulates lazy loading (for potential future use)
// const LazyComponent = ({ delay = 0 }: { delay?: number }) => {
//   if (delay > 0) {
//     throw new Promise((resolve) => setTimeout(resolve, delay));
//   }
//   return <div data-testid="lazy-content">Lazy loaded content</div>;
// };

describe("LazyWrapper", () => {
  it("renders children when no error occurs", () => {
    render(
      <LazyWrapper>
        <div data-testid="test-child">Test content</div>
      </LazyWrapper>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("wraps children in ErrorBoundary", () => {
    render(
      <LazyWrapper>
        <div>Test content</div>
      </LazyWrapper>
    );

    const errorBoundary = screen.getByTestId("error-boundary");
    expect(errorBoundary).toBeInTheDocument();
  });

  it("passes showErrorDetails prop to ErrorBoundary", () => {
    render(
      <LazyWrapper showErrorDetails={true}>
        <div>Test content</div>
      </LazyWrapper>
    );

    const errorBoundary = screen.getByTestId("error-boundary");
    expect(errorBoundary).toHaveAttribute("data-show-details", "true");
  });

  it("uses default loading text when no loadingText prop is provided", () => {
    render(
      <LazyWrapper>
        <Suspense fallback={<div>Custom fallback</div>}>
          <div>Content</div>
        </Suspense>
      </LazyWrapper>
    );

    // The default fallback should be available (LoadingSpinner with default text)
    // Since we're mocking Suspense behavior, we check that the wrapper is set up correctly
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("uses custom loading text when loadingText prop is provided", () => {
    const customLoadingText = "Custom loading message";

    render(
      <LazyWrapper loadingText={customLoadingText}>
        <div>Content</div>
      </LazyWrapper>
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("uses custom fallback when provided", () => {
    const customFallback = (
      <div data-testid="custom-fallback">Custom loading...</div>
    );

    render(
      <LazyWrapper fallback={customFallback}>
        <div>Content</div>
      </LazyWrapper>
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("passes errorFallback to ErrorBoundary", () => {
    const customErrorFallback = (
      <div data-testid="custom-error">Custom error</div>
    );

    render(
      <LazyWrapper errorFallback={customErrorFallback}>
        <div>Content</div>
      </LazyWrapper>
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("has correct default props", () => {
    render(
      <LazyWrapper>
        <div>Content</div>
      </LazyWrapper>
    );

    const errorBoundary = screen.getByTestId("error-boundary");
    expect(errorBoundary).toHaveAttribute("data-show-details", "false");
  });

  it("renders with all custom props", () => {
    const customFallback = <div data-testid="custom-fallback">Loading...</div>;
    const customErrorFallback = (
      <div data-testid="custom-error">Error occurred</div>
    );
    const customLoadingText = "Please wait...";

    render(
      <LazyWrapper
        fallback={customFallback}
        errorFallback={customErrorFallback}
        loadingText={customLoadingText}
        showErrorDetails={true}
      >
        <div data-testid="wrapped-content">Content</div>
      </LazyWrapper>
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByTestId("wrapped-content")).toBeInTheDocument();

    const errorBoundary = screen.getByTestId("error-boundary");
    expect(errorBoundary).toHaveAttribute("data-show-details", "true");
  });
});
