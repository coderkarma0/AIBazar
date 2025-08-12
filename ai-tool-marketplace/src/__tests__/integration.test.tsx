import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import Home from "@/app/page";
import ToolsPage from "@/app/tools/page";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Mock the data files with consistent test data
jest.mock("@/data/tools.json", () => [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Conversational AI",
    description:
      "An advanced conversational AI model that can assist with writing, coding, learning, and more.",
    bestPractices: ["Be specific with your prompts for better results."],
    suggestedPrompts: ["Explain quantum computing in simple terms."],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "AI Art",
    description:
      "An AI tool for generating high-quality images from text prompts.",
    bestPractices: ["Use descriptive language for better visuals."],
    suggestedPrompts: ["A futuristic city skyline at sunset, cyberpunk style."],
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    category: "Productivity",
    description:
      "An AI assistant built into Notion for summarizing, brainstorming, and writing content.",
    bestPractices: ["Highlight text before using the summarize feature."],
    suggestedPrompts: ["Summarize meeting notes into action points."],
  },
]);

jest.mock("@/data/leaderboard.json", () => [
  {
    rank: 1,
    toolId: "chatgpt",
    score: 9.8,
    achievement: "Most versatile AI assistant of the year",
  },
  {
    rank: 2,
    toolId: "midjourney",
    score: 9.5,
    achievement: "Best AI image generator",
  },
  {
    rank: 3,
    toolId: "notion-ai",
    score: 9.2,
    achievement: "Top productivity booster",
  },
]);

describe("Integration Tests", () => {
  describe("Homepage to Tools Navigation Flow", () => {
    it("displays homepage with featured tools and navigation links", () => {
      render(<Home />);

      // Check hero section
      expect(
        screen.getByRole("heading", { name: /ai tool marketplace/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/discover the best ai tools/i)
      ).toBeInTheDocument();

      // Check featured tools section
      expect(
        screen.getByRole("heading", { name: /top rated tools/i })
      ).toBeInTheDocument();
      expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      expect(screen.getByText("Midjourney")).toBeInTheDocument();
      expect(screen.getByText("Notion AI")).toBeInTheDocument();

      // Check navigation links
      const exploreToolsLink = screen.getByRole("link", {
        name: /explore tools/i,
      });
      expect(exploreToolsLink).toHaveAttribute("href", "/tools");

      const leaderboardLink = screen.getByRole("link", {
        name: /view full leaderboard/i,
      });
      expect(leaderboardLink).toHaveAttribute("href", "/leaderboard");
    });

    it("displays tool cards with correct links to detail pages", () => {
      render(<Home />);

      const chatgptLink = screen.getByRole("link", { name: /chatgpt/i });
      const midjourneyLink = screen.getByRole("link", { name: /midjourney/i });
      const notionLink = screen.getByRole("link", { name: /notion ai/i });

      expect(chatgptLink).toHaveAttribute("href", "/tools/chatgpt");
      expect(midjourneyLink).toHaveAttribute("href", "/tools/midjourney");
      expect(notionLink).toHaveAttribute("href", "/tools/notion-ai");
    });
  });

  describe("Tools Page Search and Filter Integration", () => {
    it("renders tools page with all tools initially", async () => {
      render(<ToolsPage />);

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      // Check tool count
      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();
    });

    it("filters tools by search term", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );

      // Search for "Chat"
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Wait for debounced search
      await waitFor(
        () => {
          expect(screen.getByText("ChatGPT")).toBeInTheDocument();
          expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
          expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Check updated count
      expect(screen.getByText("Showing 1 of 3 tools")).toBeInTheDocument();
      expect(screen.getByText('for "Chat"')).toBeInTheDocument();
    });

    it("filters tools by category", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      const categorySelect = screen.getByDisplayValue("All Categories");

      // Filter by AI Art category
      fireEvent.change(categorySelect, { target: { value: "AI Art" } });

      await waitFor(() => {
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.queryByText("ChatGPT")).not.toBeInTheDocument();
        expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
      });

      // Check updated count
      expect(screen.getByText("Showing 1 of 3 tools")).toBeInTheDocument();
    });

    it("combines search and category filters", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // First apply category filter
      const categorySelect = screen.getByDisplayValue("All Categories");
      fireEvent.change(categorySelect, {
        target: { value: "Conversational AI" },
      });

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
      });

      // Then apply search filter
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Wait for debounced search
      await waitFor(
        () => {
          expect(screen.getByText("ChatGPT")).toBeInTheDocument();
          expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
          expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Check that both filters are applied
      expect(screen.getByText("Showing 1 of 3 tools")).toBeInTheDocument();
      // Note: The search term display might not show when category filter is also applied
    });

    it("displays empty state when no tools match filters", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );

      // Search for non-existent tool
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "NonExistentTool" } });
      });

      // Wait for debounced search and empty state
      await waitFor(
        () => {
          expect(screen.getByText("No tools found")).toBeInTheDocument();
          expect(
            screen.getByText(/No tools match your current filters/)
          ).toBeInTheDocument();
          expect(
            screen.getByText(/Try adjusting your search or category selection/)
          ).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Check clear search button is available
      expect(screen.getByText("Clear search")).toBeInTheDocument();
    });

    it("clears search filters and shows all tools", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );

      // Apply search filter
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Wait for filtered results
      await waitFor(
        () => {
          expect(screen.getByText("ChatGPT")).toBeInTheDocument();
          expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Clear search using the clear button
      const clearButton = screen.getByLabelText("Clear search term: Chat");
      fireEvent.click(clearButton);

      // Wait for all tools to be shown again
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      // Check that search input is cleared
      expect(searchInput).toHaveValue("");
      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();
    });

    it("resets category filter to show all tools", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      const categorySelect = screen.getByDisplayValue("All Categories");

      // Apply category filter
      fireEvent.change(categorySelect, { target: { value: "AI Art" } });

      await waitFor(() => {
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.queryByText("ChatGPT")).not.toBeInTheDocument();
      });

      // Reset to all categories
      fireEvent.change(categorySelect, { target: { value: "All Categories" } });

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();
    });
  });

  describe("Accessibility and User Experience", () => {
    it("has proper ARIA labels and semantic structure", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Check search section has proper ARIA
      const searchSection = screen.getByRole("search");
      expect(searchSection).toBeInTheDocument();

      // Check search input has proper labels
      const searchInput = screen.getByLabelText("Search tools by name");
      expect(searchInput).toBeInTheDocument();

      // Check category filter has proper labels
      const categorySelect = screen.getByLabelText("Filter by category");
      expect(categorySelect).toBeInTheDocument();

      // Check tools grid has proper ARIA
      const toolsList = screen.getByRole("list", { name: /AI tools found/ });
      expect(toolsList).toBeInTheDocument();

      // Check individual tool cards are list items
      const toolItems = screen.getAllByRole("listitem");
      expect(toolItems).toHaveLength(3);
    });

    it("provides screen reader friendly content", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Check for screen reader only content
      expect(screen.getByText("Search and Filter Tools")).toHaveClass(
        "sr-only"
      );
      expect(screen.getByText("AI Tools Results")).toHaveClass("sr-only");

      // Check search help text
      expect(screen.getByText(/Type to filter tools by name/)).toHaveClass(
        "sr-only"
      );
      expect(screen.getByText(/Select a category to filter tools/)).toHaveClass(
        "sr-only"
      );
    });

    it("maintains focus management during interactions", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );

      // Focus search input
      searchInput.focus();
      expect(document.activeElement).toBe(searchInput);

      // Type in search
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Focus should remain on search input
      expect(document.activeElement).toBe(searchInput);
    });
  });

  describe("Responsive Design Integration", () => {
    it("applies responsive grid classes correctly", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Check grid container has responsive classes
      const gridContainer = screen.getByRole("list", {
        name: /AI tools found/,
      });
      expect(gridContainer).toHaveClass(
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4"
      );
    });

    it("applies responsive layout classes to search controls", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Check search controls container has responsive classes
      const searchContainer = screen.getByRole("search");
      expect(searchContainer).toHaveClass(
        "flex",
        "flex-col",
        "sm:flex-row",
        "gap-4"
      );
    });
  });
});
