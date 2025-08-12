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

        {/* AI IDE Comparison Section */}
        <section
          className="py-16 sm:py-24 bg-white"
          aria-labelledby="ide-comparison-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2
                id="ide-comparison-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                🔍 AI IDE Comparison: Choose Your Development Partner
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choosing the right AI-powered IDE can significantly impact your
                development workflow. Here&apos;s a comprehensive comparison of
                the top three AI IDEs to help you make an informed decision.
              </p>
            </header>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-900">
                      Cursor IDE
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-900">
                      Trae IDE
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-purple-900">
                      Kiro IDE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Pricing
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-blue-900">
                          Free + Pro
                        </div>
                        <div className="text-xs text-gray-600">
                          $20/month Pro
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-900">
                          Free + Pro
                        </div>
                        <div className="text-xs text-gray-600">
                          $12/month Pro
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-purple-900">
                          Free + Pro
                        </div>
                        <div className="text-xs text-gray-600">
                          $15/month Pro
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      AI Models
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      GPT-4, Claude, Gemini
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      Custom + GPT models
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      GPT-4, Claude, Custom
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Code Completion
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Excellent</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Excellent</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Excellent</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Chat Interface
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Built-in</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Limited</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Codebase Context
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Full repo</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">File-based</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Full repo + specs</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Refactoring
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Testing Support
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Project Management
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                      <span className="text-sm">None</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                      <span className="text-sm">None</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Specs & Tasks</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Collaboration
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Team features</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">
                  🎯 Best for: Code-focused developers
                </h3>
                <p className="text-sm text-blue-800 mb-4">
                  Cursor excels at code completion and has excellent AI chat
                  integration. Perfect for developers who want powerful AI
                  assistance without complexity.
                </p>
                <a
                  href="https://cursor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Download Cursor IDE →
                </a>
              </div>

              <div className="p-6 border border-green-200 rounded-lg bg-green-50">
                <h3 className="font-semibold text-green-900 mb-2">
                  💰 Best for: Budget-conscious teams
                </h3>
                <p className="text-sm text-green-800 mb-4">
                  Trae offers the most affordable pro plan with solid code
                  completion. Great for teams that need AI assistance at scale
                  without breaking the budget.
                </p>
                <a
                  href="https://www.trae.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Download Trae IDE →
                </a>
              </div>

              <div className="p-6 border border-purple-200 rounded-lg bg-purple-50">
                <h3 className="font-semibold text-purple-900 mb-2">
                  🚀 Best for: Full-stack project management
                </h3>
                <p className="text-sm text-purple-800 mb-4">
                  Kiro combines powerful AI coding with project management
                  features like specs and tasks. Ideal for teams building
                  complex applications from requirements to deployment.
                </p>
                <a
                  href="https://kiro.dev/downloads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Download Kiro IDE →
                </a>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                🤔 Which IDE Should You Choose?
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  <strong>Choose Cursor</strong> if you want the most mature AI
                  coding experience with excellent chat features
                </li>
                <li>
                  <strong>Choose Trae</strong> if you&apos;re budget-conscious
                  and primarily need smart code completion
                </li>
                <li>
                  <strong>Choose Kiro</strong> if you want AI coding plus
                  project management, specs, and team collaboration features
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
