import LeaderboardTable from "@/components/LeaderboardTable";
import PageLayout from "@/components/PageLayout";
import { LeaderboardEntry, Tool } from "@/types";
import leaderboardData from "@/data/leaderboard.json";
import toolsData from "@/data/tools.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Leaderboard - Top Rated AI Tools Rankings",
  description:
    "Discover the top-rated AI tools based on community scores and achievements. See which tools are leading the way in innovation and user satisfaction.",
  keywords: [
    "AI tools leaderboard",
    "top AI tools",
    "AI tools ranking",
    "best AI tools",
    "community ratings",
    "AI tool reviews",
    "tool comparison",
  ],
  openGraph: {
    title: "AI Tools Leaderboard - Top Rated AI Tools Rankings",
    description:
      "Discover the top-rated AI tools based on community scores and achievements. See which tools are leading the way in innovation and user satisfaction.",
    url: "https://ai-tool-marketplace.vercel.app/leaderboard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Leaderboard - Top Rated AI Tools Rankings",
    description:
      "Discover the top-rated AI tools based on community scores and achievements.",
  },
  alternates: {
    canonical: "https://ai-tool-marketplace.vercel.app/leaderboard",
  },
};

export default function LeaderboardPage() {
  // Cast the imported data to the correct types
  const leaderboard = leaderboardData as LeaderboardEntry[];
  const tools = toolsData as Tool[];

  // Generate structured data for the leaderboard
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Tools Leaderboard",
    description:
      "Rankings of the top AI tools based on community scores and achievements",
    url: "https://ai-tool-marketplace.vercel.app/leaderboard",
    numberOfItems: leaderboard.length,
    itemListElement: leaderboard.slice(0, 10).map((entry) => {
      const tool = tools.find((t) => t.id === entry.toolId);
      return {
        "@type": "ListItem",
        position: entry.rank,
        item: {
          "@type": "SoftwareApplication",
          name: tool?.name || "Unknown Tool",
          description: tool?.description || "",
          applicationCategory: tool?.category || "AI Tool",
          url: `https://ai-tool-marketplace.vercel.app/tools/${entry.toolId}`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: entry.score,
            bestRating: 10,
            worstRating: 0,
          },
          award: entry.achievement,
        },
      };
    }),
    publisher: {
      "@type": "Organization",
      name: "AI Tool Marketplace",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <PageLayout
        title="AI Tools Leaderboard"
        description="Discover the top-rated AI tools based on community scores and achievements. See which tools are leading the way in innovation and user satisfaction."
      >
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Leaderboard Table */}
            <section aria-labelledby="leaderboard-section-heading">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <header className="px-6 py-4 border-b border-gray-200">
                  <h2
                    id="leaderboard-section-heading"
                    className="text-xl font-semibold text-gray-900"
                  >
                    Community Rankings
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Rankings based on user ratings, features, and community
                    feedback
                  </p>
                </header>

                <LeaderboardTable leaderboardData={leaderboard} tools={tools} />
              </div>
            </section>

            {/* Additional Info Section */}
            <aside
              className="mt-8 bg-blue-50 rounded-lg p-6"
              aria-labelledby="ranking-info-heading"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                  <h3
                    id="ranking-info-heading"
                    className="text-lg font-medium text-blue-900"
                  >
                    How Rankings Work
                  </h3>
                  <p className="mt-2 text-blue-700">
                    Our leaderboard rankings are based on a comprehensive
                    scoring system that considers user ratings, feature
                    completeness, ease of use, and community feedback. Scores
                    are updated regularly to reflect the latest developments in
                    the AI tools landscape.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
