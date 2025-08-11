import { render, screen } from "@testing-library/react";
import { LeaderboardEntry, Tool } from "@/types";
import LeaderboardTable from "../LeaderboardTable";

const mockTools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Conversational AI",
    description: "An advanced conversational AI model.",
    bestPractices: [],
    suggestedPrompts: [],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "AI Art",
    description: "An AI tool for generating images.",
    bestPractices: [],
    suggestedPrompts: [],
  },
];

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    toolId: "chatgpt",
    score: 9.8,
    achievement: "Most versatile AI assistant",
  },
  {
    rank: 2,
    toolId: "midjourney",
    score: 9.5,
    achievement: "Best AI image generator",
  },
];

describe("LeaderboardTable", () => {
  it("renders table headers correctly", () => {
    render(
      <LeaderboardTable
        leaderboardData={mockLeaderboardData}
        tools={mockTools}
      />
    );

    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("Tool")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Achievement")).toBeInTheDocument();
  });

  it("displays leaderboard entries correctly", () => {
    render(
      <LeaderboardTable
        leaderboardData={mockLeaderboardData}
        tools={mockTools}
      />
    );

    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("Midjourney")).toBeInTheDocument();
    expect(screen.getByText("9.8")).toBeInTheDocument();
    expect(screen.getByText("9.5")).toBeInTheDocument();
  });

  it("highlights top rank with special styling", () => {
    render(
      <LeaderboardTable
        leaderboardData={mockLeaderboardData}
        tools={mockTools}
      />
    );

    const topRankRow = screen.getByText("#1").closest("tr");
    expect(topRankRow).toHaveClass(
      "bg-yellow-50",
      "border-l-4",
      "border-yellow-400"
    );
  });

  it("displays tool categories", () => {
    render(
      <LeaderboardTable
        leaderboardData={mockLeaderboardData}
        tools={mockTools}
      />
    );

    expect(screen.getByText("Conversational AI")).toBeInTheDocument();
    expect(screen.getByText("AI Art")).toBeInTheDocument();
  });

  it("displays achievement badges", () => {
    render(
      <LeaderboardTable
        leaderboardData={mockLeaderboardData}
        tools={mockTools}
      />
    );

    expect(screen.getByText("Most versatile AI assistant")).toBeInTheDocument();
    expect(screen.getByText("Best AI image generator")).toBeInTheDocument();
  });

  it("handles missing tool data gracefully", () => {
    const leaderboardWithMissingTool: LeaderboardEntry[] = [
      {
        rank: 1,
        toolId: "unknown-tool",
        score: 8.0,
        achievement: "Unknown achievement",
      },
    ];

    render(
      <LeaderboardTable
        leaderboardData={leaderboardWithMissingTool}
        tools={mockTools}
      />
    );

    expect(screen.getByText("Unknown Tool")).toBeInTheDocument();
    expect(screen.getByText("8.0")).toBeInTheDocument();
  });

  it("applies alternating row colors correctly", () => {
    render(
      <LeaderboardTable
        leaderboardData={mockLeaderboardData}
        tools={mockTools}
      />
    );

    const rows = screen.getAllByRole("row");
    // Skip header row (index 0), check data rows
    const firstDataRow = rows[1]; // ChatGPT (rank 1) - should have yellow highlighting
    const secondDataRow = rows[2]; // Midjourney (rank 2) - should have gray background (odd row)

    expect(firstDataRow).toHaveClass("bg-yellow-50"); // Top rank special styling
    expect(secondDataRow).toHaveClass("bg-gray-50"); // Odd row styling
  });
});
