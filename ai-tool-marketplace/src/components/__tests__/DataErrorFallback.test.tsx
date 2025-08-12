import { render, screen, fireEvent } from "@testing-library/react";
import DataErrorFallback from "../DataErrorFallback";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("DataErrorFallback", () => {
  it("renders with default props", () => {
    render(<DataErrorFallback />);

    expect(screen.getByText("Unable to Load Content")).toBeInTheDocument();
    expect(
      screen.getByText(/we're having trouble loading this content/i)
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <DataErrorFallback
        title="Custom Error Title"
        description="Custom error description"
      />
    );

    expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
    expect(screen.getByText("Custom error description")).toBeInTheDocument();
  });

  it("displays retry button when retry function is provided", () => {
    const mockRetry = jest.fn();
    render(<DataErrorFallback retry={mockRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("hides retry button when showRetry is false", () => {
    const mockRetry = jest.fn();
    render(<DataErrorFallback retry={mockRetry} showRetry={false} />);

    expect(
      screen.queryByRole("button", { name: /try again/i })
    ).not.toBeInTheDocument();
  });

  it("renders default navigation suggestions", () => {
    render(<DataErrorFallback />);

    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    const toolsLink = screen.getByRole("link", { name: /browse tools/i });
    expect(toolsLink).toBeInTheDocument();
    expect(toolsLink).toHaveAttribute("href", "/tools");
  });

  it("renders custom suggestions", () => {
    const customSuggestions = [
      { label: "Custom Link 1", href: "/custom1" },
      { label: "Custom Link 2", href: "/custom2" },
    ];

    render(<DataErrorFallback suggestions={customSuggestions} />);

    expect(screen.getByRole("link", { name: "Custom Link 1" })).toHaveAttribute(
      "href",
      "/custom1"
    );
    expect(screen.getByRole("link", { name: "Custom Link 2" })).toHaveAttribute(
      "href",
      "/custom2"
    );
  });

  it("shows technical error details in development", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    render(<DataErrorFallback error="Technical error message" />);

    const detailsElement = screen.getByText("Show Technical Details");
    expect(detailsElement).toBeInTheDocument();

    fireEvent.click(detailsElement);
    expect(screen.getByText("Technical error message")).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it("hides technical error details in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    render(<DataErrorFallback error="Technical error message" />);

    expect(
      screen.queryByText("Show Technical Details")
    ).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it("has proper accessibility features", () => {
    const mockRetry = jest.fn();
    render(<DataErrorFallback retry={mockRetry} />);

    // Check for proper heading
    const heading = screen.getByRole("heading", {
      name: /unable to load content/i,
    });
    expect(heading).toBeInTheDocument();

    // Check for accessible buttons and links
    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toHaveAccessibleName();

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });

    // Check for aria-hidden on decorative icons
    const svgIcons = document.querySelectorAll("svg[aria-hidden='true']");
    expect(svgIcons.length).toBeGreaterThan(0);
  });

  it("applies consistent styling", () => {
    render(<DataErrorFallback />);

    // Check for centered layout
    const container = screen
      .getByText(/unable to load content/i)
      .closest("div");
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );

    // Check for proper text styling
    const heading = screen.getByRole("heading", {
      name: /unable to load content/i,
    });
    expect(heading).toHaveClass("text-2xl", "font-bold", "text-gray-900");
  });

  it("renders suggestions with icons", () => {
    const customSuggestions = [
      {
        label: "Custom Link",
        href: "/custom",
        icon: <span data-testid="custom-icon">Icon</span>,
      },
    ];

    render(<DataErrorFallback suggestions={customSuggestions} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /custom link/i })
    ).toBeInTheDocument();
  });
});
