import { render, screen } from "@testing-library/react";
import { Tool } from "@/types";
import ToolCard from "../ToolCard";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

const mockTool: Tool = {
  id: "test-tool",
  name: "Test Tool",
  category: "Conversational AI",
  description: "This is a test tool for unit testing purposes.",
  bestPractices: ["Practice 1", "Practice 2"],
  suggestedPrompts: ["Prompt 1", "Prompt 2"],
};

describe("ToolCard", () => {
  it("renders tool information correctly", () => {
    render(<ToolCard tool={mockTool} />);

    expect(screen.getByText("Test Tool")).toBeInTheDocument();
    expect(screen.getByText("Conversational AI")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test tool for unit testing purposes.")
    ).toBeInTheDocument();
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("creates correct link to tool details page", () => {
    render(<ToolCard tool={mockTool} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/tools/test-tool");
  });

  it("applies correct category color for Conversational AI", () => {
    render(<ToolCard tool={mockTool} />);

    const categoryBadge = screen.getByText("Conversational AI");
    expect(categoryBadge).toHaveClass("bg-blue-100", "text-blue-800");
  });

  it("applies default category color for unknown category", () => {
    const toolWithUnknownCategory = {
      ...mockTool,
      category: "Unknown Category",
    };

    render(<ToolCard tool={toolWithUnknownCategory} />);

    const categoryBadge = screen.getByText("Unknown Category");
    expect(categoryBadge).toHaveClass("bg-gray-100", "text-gray-800");
  });
});
