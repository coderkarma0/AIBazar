import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: unknown) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders error UI when child component throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/we're sorry, but something unexpected happened/i)
    ).toBeInTheDocument();
  });

  it("renders custom fallback when provided", () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  it("provides navigation links in default error UI", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for "Try Again" button
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByRole("link", { name: /go home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /browse tools/i })).toHaveAttribute(
      "href",
      "/tools"
    );
  });

  it("handles retry functionality", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error UI should be displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Click retry button should be available and clickable
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    // Clicking retry should not throw an error
    expect(() => fireEvent.click(tryAgainButton)).not.toThrow();
  });

  it("shows error details when showDetails is true", () => {
    render(
      <ErrorBoundary showDetails={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for error details section
    const detailsElement = screen.getByText("Show Error Details");
    expect(detailsElement).toBeInTheDocument();

    // Click to expand details
    fireEvent.click(detailsElement);

    // Should show error message - use getAllByText since there are multiple "Error:" texts
    const errorTexts = screen.getAllByText(/Error:/);
    expect(errorTexts.length).toBeGreaterThan(0);
    // Use getAllByText for "Test error" as well since it appears in multiple places
    const testErrorTexts = screen.getAllByText(/Test error/);
    expect(testErrorTexts.length).toBeGreaterThan(0);
  });

  it("does not show error details when showDetails is false", () => {
    render(
      <ErrorBoundary showDetails={false}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.queryByText("Show Error Details")).not.toBeInTheDocument();
  });

  it("logs error to console when error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      "ErrorBoundary caught an error:",
      expect.any(Error),
      expect.any(Object)
    );
  });

  it("has proper accessibility features", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for proper heading
    const heading = screen.getByRole("heading", {
      name: /something went wrong/i,
    });
    expect(heading).toBeInTheDocument();

    // Check for accessible buttons and links
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toHaveAccessibleName();

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });

    // Check for aria-hidden on decorative icons
    const svgIcons = document.querySelectorAll("svg[aria-hidden='true']");
    expect(svgIcons.length).toBeGreaterThan(0);
  });

  it("maintains consistent styling with the application", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for main container styling
    const container = screen.getByText(/something went wrong/i).closest("div");
    expect(container?.parentElement).toHaveClass("min-h-screen", "bg-gray-50");

    // Check for primary button styling
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toHaveClass("bg-blue-600", "text-white");

    // Check for secondary link styling
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toHaveClass("border-blue-600", "text-blue-600");
  });
});
