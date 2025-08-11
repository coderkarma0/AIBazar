import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock the data files
jest.mock("../../../../data/tools.json", () => [
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

jest.mock("../../../../data/leaderboard.json", () => [
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

describe("Homepage", () => {
  it("renders the hero section with title and tagline", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /ai tool marketplace/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /discover the best ai tools, learn best practices, and get exclusive discount codes/i
      )
    ).toBeInTheDocument();
  });

  it("renders the Explore Tools CTA button", () => {
    render(<Home />);

    const exploreButton = screen.getByRole("link", { name: /explore tools/i });
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton).toHaveAttribute("href", "/tools");
  });

  it("displays the top 3 tools from leaderboard", () => {
    render(<Home />);

    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("Midjourney")).toBeInTheDocument();
    expect(screen.getByText("Notion AI")).toBeInTheDocument();
  });

  it("renders the featured tools section heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /top rated tools/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /discover the most popular and highly-rated ai tools in our community/i
      )
    ).toBeInTheDocument();
  });

  it("renders the View Full Leaderboard link", () => {
    render(<Home />);

    const leaderboardLink = screen.getByRole("link", {
      name: /view full leaderboard/i,
    });
    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink).toHaveAttribute("href", "/leaderboard");
  });

  it("displays tool cards with proper links", () => {
    render(<Home />);

    const chatgptLink = screen.getByRole("link", { name: /chatgpt/i });
    const midjourneyLink = screen.getByRole("link", { name: /midjourney/i });
    const notionLink = screen.getByRole("link", { name: /notion ai/i });

    expect(chatgptLink).toHaveAttribute("href", "/tools/chatgpt");
    expect(midjourneyLink).toHaveAttribute("href", "/tools/midjourney");
    expect(notionLink).toHaveAttribute("href", "/tools/notion-ai");
  });

  it("has responsive design classes", () => {
    render(<Home />);

    const heroSection = screen
      .getByRole("heading", { name: /ai tool marketplace/i })
      .closest("section");
    expect(heroSection).toHaveClass("bg-white");

    // Check that the page has the main background class
    const mainDiv = screen
      .getByRole("heading", { name: /ai tool marketplace/i })
      .closest("div[class*='min-h-screen']");
    expect(mainDiv).toHaveClass("min-h-screen", "bg-gray-50");
  });
});
