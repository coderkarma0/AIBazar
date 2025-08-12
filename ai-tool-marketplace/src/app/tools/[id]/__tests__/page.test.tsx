import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as React from "react";
import ToolDetailPage, {
  generateStaticParams,
  generateMetadata,
} from "../page";

// Mock the tools data
jest.mock("@/data/tools.json", () => [
  {
    id: "test-tool-1",
    name: "Test Tool 1",
    category: "Test Category",
    description: "This is a test tool description for testing purposes.",
    bestPractices: [
      "Be specific with your prompts for better results.",
      "Break complex tasks into smaller instructions.",
      "Use system messages to set context.",
    ],
    suggestedPrompts: ["Test prompt 1", "Test prompt 2", "Test prompt 3"],
  },
  {
    id: "test-tool-2",
    name: "Test Tool 2",
    category: "Another Category",
    description: "This is another test tool description.",
    bestPractices: ["Practice 1", "Practice 2"],
    suggestedPrompts: ["Prompt A", "Prompt B"],
  },
]);

// Mock Next.js navigation functions
const mockNotFound = jest.fn();
jest.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe("ToolDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateStaticParams", () => {
    it("returns all tool IDs for static generation", async () => {
      const params = await generateStaticParams();

      expect(params).toEqual([{ id: "test-tool-1" }, { id: "test-tool-2" }]);
    });
  });

  describe("generateMetadata", () => {
    it("generates correct metadata for existing tool", async () => {
      const metadata = await generateMetadata({
        params: { id: "test-tool-1" },
      });

      expect(metadata).toEqual({
        title: "Test Tool 1 - AI Tool Marketplace",
        description: "This is a test tool description for testing purposes.",
      });
    });

    it("generates not found metadata for non-existent tool", async () => {
      const metadata = await generateMetadata({
        params: { id: "non-existent" },
      });

      expect(metadata).toEqual({
        title: "Tool Not Found",
      });
    });
  });

  describe("ToolDetailPage Component", () => {
    it("renders tool details for valid tool ID", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      // Check tool name in heading
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Test Tool 1");

      // Check category
      expect(screen.getByText("Test Category")).toBeInTheDocument();

      // Check description
      expect(
        screen.getByText(
          "This is a test tool description for testing purposes."
        )
      ).toBeInTheDocument();
    });

    it("calls notFound for invalid tool ID", () => {
      render(<ToolDetailPage params={{ id: "invalid-id" }} />);

      expect(mockNotFound).toHaveBeenCalled();
    });

    it("renders breadcrumb navigation", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      // Check breadcrumb navigation exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Check breadcrumb links
      const homeLink = screen.getByText("Home").closest("a");
      const toolsLink = screen.getByText("Tools").closest("a");

      expect(homeLink).toHaveAttribute("href", "/");
      expect(toolsLink).toHaveAttribute("href", "/tools");

      // Check breadcrumb text in navigation
      expect(nav).toHaveTextContent("Home");
      expect(nav).toHaveTextContent("Tools");
      expect(nav).toHaveTextContent("Test Tool 1");
    });

    it("displays tool header with name and category badge", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Test Tool 1");

      const categoryBadge = screen.getByText("Test Category");
      expect(categoryBadge).toHaveClass(
        "bg-blue-100",
        "text-blue-800",
        "rounded-full"
      );
    });

    it("renders about section with description", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      expect(screen.getByText("About Test Tool 1")).toBeInTheDocument();
      expect(
        screen.getByText(
          "This is a test tool description for testing purposes."
        )
      ).toBeInTheDocument();
    });

    it("displays best practices section with bulleted list", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      expect(screen.getByText("Best Practices")).toBeInTheDocument();

      // Check all best practices are rendered
      expect(
        screen.getByText("Be specific with your prompts for better results.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Break complex tasks into smaller instructions.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Use system messages to set context.")
      ).toBeInTheDocument();
    });

    it("renders suggested prompts section with prompt cards", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      expect(screen.getByText("Suggested Prompts")).toBeInTheDocument();

      // Check all prompts are rendered
      expect(screen.getByText("Test prompt 1")).toBeInTheDocument();
      expect(screen.getByText("Test prompt 2")).toBeInTheDocument();
      expect(screen.getByText("Test prompt 3")).toBeInTheDocument();

      // Check copy buttons are present
      const copyButtons = screen.getAllByText("Copy");
      expect(copyButtons).toHaveLength(3);
    });

    it("handles copy to clipboard functionality", async () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      const copyButtons = screen.getAllByText("Copy");
      const firstCopyButton = copyButtons[0];

      fireEvent.click(firstCopyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
          "Test prompt 1"
        );
      });
    });

    it("applies responsive grid layout for prompts", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      const promptsGrid = document.querySelector(".grid");
      expect(promptsGrid).toHaveClass(
        "gap-4",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });

    it("has proper semantic HTML structure", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      // Check heading hierarchy
      const h1 = screen.getByRole("heading", { level: 1 });
      const h2Elements = screen.getAllByRole("heading", { level: 2 });

      expect(h1).toHaveTextContent("Test Tool 1");
      expect(h2Elements).toHaveLength(3); // About, Best Practices, Suggested Prompts
    });

    it("renders responsive layout classes", () => {
      render(<ToolDetailPage params={{ id: "test-tool-1" }} />);

      // Check for PageLayout structure instead of old container classes
      const maxWidthContainer = document.querySelector(".max-w-4xl");
      expect(maxWidthContainer).toHaveClass("mx-auto");

      // Check for responsive padding classes
      const paddingContainer = document.querySelector(".px-4");
      expect(paddingContainer).toBeInTheDocument();
    });

    it("handles tools with different numbers of practices and prompts", () => {
      render(<ToolDetailPage params={{ id: "test-tool-2" }} />);

      // Check tool name in heading
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Test Tool 2");

      expect(screen.getByText("Practice 1")).toBeInTheDocument();
      expect(screen.getByText("Practice 2")).toBeInTheDocument();
      expect(screen.getByText("Prompt A")).toBeInTheDocument();
      expect(screen.getByText("Prompt B")).toBeInTheDocument();

      const copyButtons = screen.getAllByText("Copy");
      expect(copyButtons).toHaveLength(2); // Only 2 prompts for this tool
    });
  });
});
