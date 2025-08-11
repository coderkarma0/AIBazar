import { LeaderboardEntry, Tool } from "@/types";

interface LeaderboardTableProps {
  leaderboardData: LeaderboardEntry[];
  tools: Tool[];
}

export default function LeaderboardTable({
  leaderboardData,
  tools,
}: LeaderboardTableProps) {
  // Create a map of toolId to tool for quick lookup
  const toolsMap = tools.reduce((acc, tool) => {
    acc[tool.id] = tool;
    return acc;
  }, {} as Record<string, Tool>);

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tool
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Achievement
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leaderboardData.map((entry, index) => {
            const tool = toolsMap[entry.toolId];
            const isTopRank = entry.rank === 1;
            const isEvenRow = index % 2 === 0;

            return (
              <tr
                key={entry.toolId}
                className={`${
                  isTopRank
                    ? "bg-yellow-50 border-l-4 border-yellow-400"
                    : isEvenRow
                    ? "bg-white"
                    : "bg-gray-50"
                } hover:bg-blue-50 transition-colors duration-200`}
              >
                {/* Rank */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {isTopRank ? (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-lg font-bold text-yellow-600">
                          #{entry.rank}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-semibold text-gray-700">
                        #{entry.rank}
                      </span>
                    )}
                  </div>
                </td>

                {/* Tool Name and Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {tool?.name || "Unknown Tool"}
                    </div>
                    {tool?.category && (
                      <div className="text-sm text-gray-500">
                        {tool.category}
                      </div>
                    )}
                  </div>
                </td>

                {/* Score */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {entry.score.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/10</span>
                  </div>
                </td>

                {/* Achievement */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {entry.achievement}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
