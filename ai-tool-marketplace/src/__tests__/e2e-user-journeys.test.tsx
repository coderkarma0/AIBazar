import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import Home from "@/app/page";
import ToolsPage from "@/app/tools/page";
import CouponsPage from "@/app/coupons/page";
import LeaderboardPage from "@/app/leaderboard/page";

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

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

// Mock the data files with comprehensive test data
jest.mock("@/data/tools.json", () => [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Conversational AI",
    description:
      "An advanced conversational AI model that can assist with writing, coding, learning, and more.",
    bestPractices: [
      "Be specific with your prompts for better results.",
      "Break complex tasks into smaller instructions.",
    ],
    suggestedPrompts: [
      "Explain quantum computing in simple terms.",
      "Write a professional email about project updates.",
    ],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "AI Art",
    description:
      "An AI tool for generating high-quality images from text prompts.",
    bestPractices: [
      "Use descriptive language for better visuals.",
      "Specify art styles and techniques.",
    ],
    suggestedPrompts: [
      "A futuristic city skyline at sunset, cyberpunk style.",
      "Portrait of a wise old wizard, oil painting style.",
    ],
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    category: "Productivity",
    description:
      "An AI assistant built into Notion for summarizing, brainstorming, and writing content.",
    bestPractices: [
      "Highlight text before using the summarize feature.",
      "Use templates for consistent results.",
    ],
    suggestedPrompts: [
      "Summarize meeting notes into action points.",
      "Generate ideas for a marketing campaign.",
    ],
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

jest.mock("@/data/coupons.json", () => [
  {
    id: "c1",
    toolId: "chatgpt",
    code: "CHATGPT20",
    description: "Get 20% off ChatGPT Plus subscription",
    expiry: "2025-12-31",
  },
  {
    id: "c2",
    toolId: "midjourney",
    code: "MIDJOURNEY15",
    description: "15% off Midjourney subscription",
    expiry: "2025-06-30",
  },
]);

describe("End-to-End User Journeys", () => {
  beforeEach(() => {
    mockWriteText.mockClear();
    mockWriteText.mockResolvedValue(undefined);
  });

  describe("Complete User Journey: Homepage → Tools → Search → Filter", () => {
    it("allows user to navigate from homepage to tools and perform search operations", async () => {
      // Step 1: Start on homepage
      const { unmount } = render(<Home />);

      // Verify homepage content
      expect(
        screen.getByRole("heading", { name: /ai tool marketplace/i })
      ).toBeInTheDocument();
      expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      expect(screen.getByText("Midjourney")).toBeInTheDocument();
      expect(screen.getByText("Notion AI")).toBeInTheDocument();

      // Verify navigation link exists
      const exploreToolsLink = screen.getByRole("link", {
        name: /explore tools/i,
      });
      expect(exploreToolsLink).toHaveAttribute("href", "/tools");

      // Step 2: Navigate to tools page (simulate navigation)
      unmount();
      render(<ToolsPage />);

      // Wait for tools page to load
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { level: 1, name: /ai tools/i })
        ).toBeInTheDocument();
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      // Verify initial state
      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();

      // Step 3: Perform search operation
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Wait for search results
      await waitFor(
        () => {
          expect(screen.getByText("ChatGPT")).toBeInTheDocument();
          expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
          expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      expect(screen.getByText("Showing 1 of 3 tools")).toBeInTheDocument();

      // Step 4: Clear search and apply category filter
      const clearButton = screen.getByLabelText("Clear search term: Chat");
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      // Apply category filter
      const categorySelect = screen.getByDisplayValue("All Categories");
      fireEvent.change(categorySelect, { target: { value: "AI Art" } });

      await waitFor(() => {
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.queryByText("ChatGPT")).not.toBeInTheDocument();
        expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
      });

      expect(screen.getByText("Showing 1 of 3 tools")).toBeInTheDocument();

      // Step 5: Reset filters
      fireEvent.change(categorySelect, { target: { value: "All Categories" } });

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();
    });
  });

  describe("Complete User Journey: Homepage → Leaderboard → Tools", () => {
    it("allows user to navigate from homepage to leaderboard and explore rankings", async () => {
      // Step 1: Start on homepage
      const { unmount } = render(<Home />);

      // Verify leaderboard link
      const leaderboardLink = screen.getByRole("link", {
        name: /view full leaderboard/i,
      });
      expect(leaderboardLink).toHaveAttribute("href", "/leaderboard");

      // Step 2: Navigate to leaderboard (simulate navigation)
      unmount();
      render(<LeaderboardPage />);

      // Wait for leaderboard to load
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: /ai tools leaderboard/i })
        ).toBeInTheDocument();
      });

      // Verify leaderboard content
      expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      expect(screen.getByText("Midjourney")).toBeInTheDocument();
      expect(screen.getByText("Notion AI")).toBeInTheDocument();

      // Verify rankings
      expect(screen.getByText("#1")).toBeInTheDocument();
      expect(screen.getByText("#2")).toBeInTheDocument();
      expect(screen.getByText("#3")).toBeInTheDocument();

      // Verify scores
      expect(screen.getByText("9.8")).toBeInTheDocument();
      expect(screen.getByText("9.5")).toBeInTheDocument();
      expect(screen.getByText("9.2")).toBeInTheDocument();

      // Verify achievements
      expect(
        screen.getByText("Most versatile AI assistant of the year")
      ).toBeInTheDocument();
      expect(screen.getByText("Best AI image generator")).toBeInTheDocument();
      expect(screen.getByText("Top productivity booster")).toBeInTheDocument();
    });
  });

  describe("Complete User Journey: Coupons Page with Clipboard Operations", () => {
    it("allows user to browse and copy coupon codes", async () => {
      // Navigate to coupons page
      render(<CouponsPage />);

      // Wait for coupons to load
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { level: 1, name: /discount coupons/i })
        ).toBeInTheDocument();
      });

      // Verify coupon content
      expect(screen.getByText("CHATGPT20")).toBeInTheDocument();
      expect(screen.getByText("MIDJOURNEY15")).toBeInTheDocument();
      expect(
        screen.getByText("Get 20% off ChatGPT Plus subscription")
      ).toBeInTheDocument();
      expect(
        screen.getByText("15% off Midjourney subscription")
      ).toBeInTheDocument();

      // Test clipboard functionality - only one coupon should be copyable (the other is expired)
      const copyButtons = screen.getAllByText("Copy Code");
      expect(copyButtons).toHaveLength(1); // Only one active coupon

      // Verify expired coupon shows "Expired" button and badge
      expect(screen.getAllByText("Expired")).toHaveLength(2); // Badge and button

      // Copy the active coupon
      fireEvent.click(copyButtons[0]);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith("CHATGPT20");
      });

      // Verify success feedback
      await waitFor(() => {
        expect(screen.getByText("Copied!")).toBeInTheDocument();
      });
    });
  });

  describe("Complete User Journey: Search → Empty State → Recovery", () => {
    it("handles empty search results and provides recovery options", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Search for non-existent tool
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "NonExistentTool" } });
      });

      // Wait for empty state
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

      // Verify recovery options are available
      expect(screen.getByText("Clear search")).toBeInTheDocument();

      // Use recovery option
      const clearSearchButton = screen.getByText("Clear search");
      fireEvent.click(clearSearchButton);

      // Verify recovery
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      expect(searchInput).toHaveValue("");
      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();
    });
  });

  describe("Complete User Journey: Multi-step Filter Combination", () => {
    it("allows complex filtering scenarios with multiple steps", async () => {
      render(<ToolsPage />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Step 1: Apply category filter
      const categorySelect = screen.getByDisplayValue("All Categories");
      fireEvent.change(categorySelect, {
        target: { value: "Conversational AI" },
      });

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
        expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
      });

      // Step 2: Add search filter on top of category filter
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Wait for combined filter results
      await waitFor(
        () => {
          expect(screen.getByText("ChatGPT")).toBeInTheDocument();
          expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
          expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      expect(screen.getByText("Showing 1 of 3 tools")).toBeInTheDocument();

      // Step 3: Change category while keeping search
      fireEvent.change(categorySelect, { target: { value: "AI Art" } });

      await waitFor(() => {
        expect(screen.getByText("No tools found")).toBeInTheDocument();
      });

      // Step 4: Clear search to see AI Art tools
      const clearButton = screen.getByLabelText("Clear search term: Chat");
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.queryByText("ChatGPT")).not.toBeInTheDocument();
        expect(screen.queryByText("Notion AI")).not.toBeInTheDocument();
      });

      // Step 5: Reset all filters
      fireEvent.change(categorySelect, { target: { value: "All Categories" } });

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility Journey: Keyboard Navigation and Screen Reader Support", () => {
    it("supports complete keyboard navigation workflow", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Test keyboard focus on search input
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      searchInput.focus();
      expect(document.activeElement).toBe(searchInput);

      // Test keyboard input
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Chat" } });
      });

      // Focus should remain on search input
      expect(document.activeElement).toBe(searchInput);

      // Test tab navigation to category select
      const categorySelect = screen.getByDisplayValue("All Categories");
      categorySelect.focus();
      expect(document.activeElement).toBe(categorySelect);

      // Verify ARIA labels are present for screen readers
      expect(searchInput).toHaveAttribute("aria-describedby", "search-help");
      expect(categorySelect).toHaveAttribute(
        "aria-describedby",
        "category-help"
      );

      // Verify screen reader content
      expect(screen.getByText(/Type to filter tools by name/)).toHaveClass(
        "sr-only"
      );
      expect(screen.getByText(/Select a category to filter tools/)).toHaveClass(
        "sr-only"
      );

      // Test tool links are accessible
      await waitFor(
        () => {
          const toolLinks = screen.getAllByRole("link");
          const chatgptLink = toolLinks.find((link) =>
            link.textContent?.includes("ChatGPT")
          );
          expect(chatgptLink).toHaveAttribute("href", "/tools/chatgpt");
        },
        { timeout: 1000 }
      );
    });
  });

  describe("Responsive Design Journey: Mobile to Desktop Experience", () => {
    it("maintains functionality across different viewport sizes", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Verify responsive grid classes
      const toolsGrid = screen.getByRole("list", { name: /AI tools found/ });
      expect(toolsGrid).toHaveClass(
        "grid",
        "grid-cols-1", // Mobile: 1 column
        "md:grid-cols-2", // Tablet: 2 columns
        "lg:grid-cols-3", // Desktop: 3 columns
        "xl:grid-cols-4" // Large desktop: 4 columns
      );

      // Verify responsive search controls
      const searchContainer = screen.getByRole("search");
      expect(searchContainer).toHaveClass(
        "flex",
        "flex-col", // Mobile: stacked
        "sm:flex-row" // Desktop: side by side
      );

      // Test functionality works regardless of layout
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "Mid" } });
      });

      await waitFor(
        () => {
          expect(screen.getByText("Midjourney")).toBeInTheDocument();
          expect(screen.queryByText("ChatGPT")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Verify responsive behavior is maintained during interactions
      expect(toolsGrid).toHaveClass(
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4"
      );
    });
  });

  describe("Error Recovery Journey: Handling Edge Cases", () => {
    it("gracefully handles various error scenarios and provides recovery", async () => {
      render(<ToolsPage />);

      // Wait for load
      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
      });

      // Test empty search recovery
      const searchInput = screen.getByPlaceholderText(
        "Search tools by name..."
      );
      await act(async () => {
        fireEvent.change(searchInput, {
          target: { value: "xyz123nonexistent" },
        });
      });

      await waitFor(
        () => {
          expect(screen.getByText("No tools found")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Test search recovery option
      expect(screen.getByText("Clear search")).toBeInTheDocument();

      // Test clearing search
      const clearSearchButton = screen.getByText("Clear search");
      fireEvent.click(clearSearchButton);

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();

      // Test category filter with no results scenario
      const categorySelect = screen.getByDisplayValue("All Categories");
      fireEvent.change(categorySelect, { target: { value: "AI Art" } });

      await waitFor(() => {
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.queryByText("ChatGPT")).not.toBeInTheDocument();
      });

      // Apply search that will have no results with current category
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "ChatGPT" } });
      });

      await waitFor(
        () => {
          expect(screen.getByText("No tools found")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Should show both recovery options
      expect(screen.getByText("Clear search")).toBeInTheDocument();
      expect(screen.getByText("Show all categories")).toBeInTheDocument();

      // Test clearing category filter
      const showAllCategoriesButton = screen.getByText("Show all categories");
      fireEvent.click(showAllCategoriesButton);

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.queryByText("Midjourney")).not.toBeInTheDocument();
      });

      // Clear search to show all tools
      const finalClearButton = screen.getByLabelText(
        "Clear search term: ChatGPT"
      );
      fireEvent.click(finalClearButton);

      await waitFor(() => {
        expect(screen.getByText("ChatGPT")).toBeInTheDocument();
        expect(screen.getByText("Midjourney")).toBeInTheDocument();
        expect(screen.getByText("Notion AI")).toBeInTheDocument();
      });

      expect(screen.getByText("Showing 3 of 3 tools")).toBeInTheDocument();
    });
  });
});
