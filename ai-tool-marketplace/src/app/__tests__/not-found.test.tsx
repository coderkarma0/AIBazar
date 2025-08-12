import { render, screen } from "@testing-library/react";
import NotFound from "../not-found";

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

describe("NotFound Page", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it("renders the 404 page with correct heading", () => {
    const heading = screen.getByRole("heading", { name: /page not found/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays an appropriate error message", () => {
    const errorMessage = screen.getByText(
      /oops! the page you're looking for doesn't exist/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("provides navigation links to main sections", () => {
    // Check for "Go Home" link
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    // Check for "Browse Tools" link
    const toolsLink = screen.getByRole("link", { name: /browse tools/i });
    expect(toolsLink).toBeInTheDocument();
    expect(toolsLink).toHaveAttribute("href", "/tools");

    // Check for "View Leaderboard" link
    const leaderboardLink = screen.getByRole("link", {
      name: /view leaderboard/i,
    });
    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink).toHaveAttribute("href", "/leaderboard");

    // Check for "Get Coupons" link
    const couponsLink = screen.getByRole("link", { name: /get coupons/i });
    expect(couponsLink).toBeInTheDocument();
    expect(couponsLink).toHaveAttribute("href", "/coupons");
  });

  it("includes help text with homepage link", () => {
    const helpText = screen.getByText(/if you believe this is an error/i);
    expect(helpText).toBeInTheDocument();

    const homepageLink = screen.getByRole("link", { name: /homepage/i });
    expect(homepageLink).toBeInTheDocument();
    expect(homepageLink).toHaveAttribute("href", "/");
  });

  it("has consistent styling with the rest of the application", () => {
    // Check for main container with proper background
    const container = screen.getByText(/page not found/i).closest("div");
    expect(container?.parentElement).toHaveClass("min-h-screen", "bg-gray-50");

    // Check for primary button styling on "Go Home" link
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toHaveClass("bg-blue-600", "text-white");

    // Check for secondary button styling on other links
    const toolsLink = screen.getByRole("link", { name: /browse tools/i });
    expect(toolsLink).toHaveClass("border-blue-600", "text-blue-600");
  });

  it("includes proper accessibility features", () => {
    // Check for proper heading structure
    const heading = screen.getByRole("heading", { name: /page not found/i });
    expect(heading).toBeInTheDocument();

    // Check for descriptive link text
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });

    // Check for SVG icons with aria-hidden
    const svgIcons = document.querySelectorAll("svg[aria-hidden='true']");
    expect(svgIcons.length).toBeGreaterThan(0);
  });

  it("provides clear navigation options for all main sections", () => {
    // Verify all main navigation sections are represented
    const expectedSections = [
      { name: /go home/i, href: "/" },
      { name: /browse tools/i, href: "/tools" },
      { name: /view leaderboard/i, href: "/leaderboard" },
      { name: /get coupons/i, href: "/coupons" },
    ];

    expectedSections.forEach(({ name, href }) => {
      const link = screen.getByRole("link", { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("displays helpful error explanation", () => {
    const explanation = screen.getByText(
      /it might have been moved, deleted, or you entered the wrong url/i
    );
    expect(explanation).toBeInTheDocument();
  });
});
