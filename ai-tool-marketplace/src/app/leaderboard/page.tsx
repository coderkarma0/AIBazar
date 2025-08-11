import LeaderboardTable from "@/components/LeaderboardTable";
import PageLayout from "@/components/PageLayout";
import { LeaderboardEntry, Tool } from "@/types";
import leaderboardData from "@/data/leaderboard.json";
import toolsData from "@/data/tools.json";

export default function LeaderboardPage() {
  // Cast the imported data to the correct types
  const leaderboard = leaderboardData as LeaderboardEntry[];
  const tools = toolsData as Tool[];

  return (
    <PageLayout
      title="AI Tools Leaderboard"
      description="Discover the top-rated AI tools based on community scores and achievements. See which tools are leading the way in innovation and user satisfaction."
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Community Rankings
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Rankings based on user ratings, features, and community feedback
              </p>
            </div>

            <LeaderboardTable leaderboardData={leaderboard} tools={tools} />
          </div>

          {/* Additional Info Section */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-900">
                  How Rankings Work
                </h3>
                <p className="mt-2 text-blue-700">
                  Our leaderboard rankings are based on a comprehensive scoring
                  system that considers user ratings, feature completeness, ease
                  of use, and community feedback. Scores are updated regularly
                  to reflect the latest developments in the AI tools landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
