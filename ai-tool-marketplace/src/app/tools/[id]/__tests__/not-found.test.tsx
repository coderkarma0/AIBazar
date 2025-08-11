import { render, screen } from "@testing-library/react";
import * as React from "react";
import NotFound from "../not-found";

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("NotFound", () => {
  it("renders 404 error message", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Tool Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The AI tool you're looking for doesn't exist or may have been removed."
      )
    ).toBeInTheDocument();
  });

  it("displays navigation links", () => {
    render(<NotFound />);

    const browseToolsLink = screen.getByText("Browse All Tools");
    const homepageLink = screen.getByText("Return to Homepage");

    expect(browseToolsLink).toBeInTheDocument();
    expect(homepageLink).toBeInTheDocument();

    // Check link destinations
    expect(browseToolsLink.closest("a")).toHaveAttribute("href", "/tools");
    expect(homepageLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("has proper styling classes", () => {
    render(<NotFound />);

    const container = document.querySelector(".container");
    expect(container).toHaveClass("mx-auto", "px-4", "py-16");

    const browseButton = screen.getByText("Browse All Tools");
    expect(browseButton).toBeInTheDocument();
    expect(browseButton.tagName).toBe("A"); // It's a link element
  });

  it("has proper semantic structure", () => {
    render(<NotFound />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h1).toHaveTextContent("404");
    expect(h2).toHaveTextContent("Tool Not Found");
  });

  it("centers content properly", () => {
    render(<NotFound />);

    const centerContainer = document.querySelector(".max-w-md");
    expect(centerContainer).toHaveClass("mx-auto", "text-center");
  });
});
