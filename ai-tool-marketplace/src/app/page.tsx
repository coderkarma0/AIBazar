import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { Tool, LeaderboardEntry } from "@/types";
import toolsData from "@/data/tools.json";
import leaderboardData from "@/data/leaderboard.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Marketplace - Discover the Best AI Tools",
  description:
    "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings. Your comprehensive directory for AI productivity tools.",
  openGraph: {
    title: "AI Tool Marketplace - Discover the Best AI Tools",
    description:
      "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings. Your comprehensive directory for AI productivity tools.",
    url: "https://ai-tool-marketplace.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Marketplace - Discover the Best AI Tools",
    description:
      "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings.",
  },
  alternates: {
    canonical: "https://ai-tool-marketplace.vercel.app",
  },
};

export default function Home() {
  // Get top 3 tools from leaderboard
  const topTools = leaderboardData
    .slice(0, 3)
    .map((entry: LeaderboardEntry) => {
      const tool = toolsData.find((t: Tool) => t.id === entry.toolId);
      return tool;
    })
    .filter(Boolean) as Tool[];

  // Generate structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Tool Marketplace",
    description:
      "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings.",
    url: "https://ai-tool-marketplace.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://ai-tool-marketplace.vercel.app/tools?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Top AI Tools",
      description: "The most popular and highly-rated AI tools",
      numberOfItems: topTools.length,
      itemListElement: topTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.description,
          applicationCategory: tool.category,
          url: `https://ai-tool-marketplace.vercel.app/tools/${tool.id}`,
        },
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "AI Tool Marketplace",
      url: "https://ai-tool-marketplace.vercel.app",
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                AI Tool Marketplace
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover the best AI tools, learn best practices, and get
                exclusive discount codes
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-lg"
                aria-describedby="explore-tools-description"
              >
                Explore Tools
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <span id="explore-tools-description" className="sr-only">
                Navigate to the tools listing page to browse all available AI
                tools
              </span>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section
          className="py-16 sm:py-24"
          aria-labelledby="featured-tools-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2
                id="featured-tools-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Top Rated Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the most popular and highly-rated AI tools in our
                community
              </p>
            </header>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Top rated AI tools"
            >
              {topTools.map((tool) => (
                <div key={tool.id} role="listitem">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/leaderboard"
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                aria-describedby="leaderboard-link-description"
              >
                View Full Leaderboard
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <span id="leaderboard-link-description" className="sr-only">
                Navigate to the leaderboard page to see complete rankings of all
                AI tools
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
