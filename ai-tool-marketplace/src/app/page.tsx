import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { Tool, LeaderboardEntry } from "@/types";
import toolsData from "@/data/tools.json";
import leaderboardData from "@/data/leaderboard.json";

export default function Home() {
  // Get top 3 tools from leaderboard
  const topTools = leaderboardData
    .slice(0, 3)
    .map((entry: LeaderboardEntry) => {
      const tool = toolsData.find((t: Tool) => t.id === entry.toolId);
      return tool;
    })
    .filter(Boolean) as Tool[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI Tool Marketplace
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the best AI tools, learn best practices, and get
              exclusive discount codes
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
            >
              Explore Tools
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Top Rated Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular and highly-rated AI tools in our
              community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/leaderboard"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              View Full Leaderboard
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
