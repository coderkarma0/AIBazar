import { render, screen } from "@testing-library/react";
import LeaderboardPage from "../page";

// Mock the data imports
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
]);

jest.mock("../../../../data/tools.json", () => [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Conversational AI",
    description: "An advanced conversational AI model",
    bestPractices: [],
    suggestedPrompts: [],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "AI Art",
    description: "An AI tool for generating high-quality images",
    bestPractices: [],
    suggestedPrompts: [],
  },
]);

describe("LeaderboardPage", () => {
  it("renders the leaderboard page with correct title", () => {
    render(<LeaderboardPage />);

    expect(screen.getByText("AI Tools Leaderboard")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover the top-rated AI tools based on community scores and achievements/
      )
    ).toBeInTheDocument();
  });

  it("renders the community rankings section", () => {
    render(<LeaderboardPage />);

    expect(screen.getByText("Community Rankings")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Rankings based on user ratings, features, and community feedback"
      )
    ).toBeInTheDocument();
  });

  it("renders the how rankings work section", () => {
    render(<LeaderboardPage />);

    expect(screen.getByText("How Rankings Work")).toBeInTheDocument();
    expect(
      screen.getByText(/Our leaderboard rankings are based on/)
    ).toBeInTheDocument();
  });

  it("renders the leaderboard table with data", () => {
    render(<LeaderboardPage />);

    // Check for table headers
    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("Tool")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Achievement")).toBeInTheDocument();

    // Check for tool data
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("Midjourney")).toBeInTheDocument();
    expect(screen.getByText("9.8")).toBeInTheDocument();
    expect(screen.getByText("9.5")).toBeInTheDocument();
  });

  it("has proper responsive layout classes", () => {
    const { container } = render(<LeaderboardPage />);

    // Check for responsive container classes
    expect(container.querySelector(".max-w-7xl")).toBeInTheDocument();
    expect(
      container.querySelector(".px-4.sm\\:px-6.lg\\:px-8")
    ).toBeInTheDocument();
  });
});
