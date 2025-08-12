import { notFound } from "next/navigation";
import toolsData from "@/data/tools.json";
import { Tool } from "@/types";
import PromptCard from "@/components/PromptCard";
import PageLayout from "@/components/PageLayout";

interface ToolDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all tools at build time
export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    id: tool.id,
  }));
}

// Generate metadata for each tool page
export async function generateMetadata({ params }: ToolDetailPageProps) {
  const { id } = await params;
  const tool = toolsData.find((t) => t.id === id);

  if (!tool) {
    return {
      title: "Tool Not Found - AI Tool Marketplace",
      description: "The requested AI tool could not be found.",
    };
  }

  return {
    title: `${tool.name} - ${tool.category} AI Tool`,
    description: `${tool.description} Learn best practices, get suggested prompts, and discover how to use ${tool.name} effectively.`,
    keywords: [
      tool.name,
      tool.category,
      "AI tool",
      "best practices",
      "prompts",
      "artificial intelligence",
      ...tool.bestPractices
        .slice(0, 3)
        .map((practice) => practice.split(" ").slice(0, 3).join(" ")),
    ],
    openGraph: {
      title: `${tool.name} - ${tool.category} AI Tool`,
      description: `${tool.description} Learn best practices and get suggested prompts for ${tool.name}.`,
      url: `https://ai-tool-marketplace.vercel.app/tools/${id}`,
      type: "article",
      article: {
        section: tool.category,
        tags: [tool.name, tool.category, "AI tool", "best practices"],
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - ${tool.category} AI Tool`,
      description: `${tool.description} Learn best practices and get suggested prompts.`,
    },
    alternates: {
      canonical: `https://ai-tool-marketplace.vercel.app/tools/${id}`,
    },
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { id } = await params;
  const tool = toolsData.find((t) => t.id === id) as Tool | undefined;

  if (!tool) {
    notFound();
    return null; // This won't be reached but helps with TypeScript
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: tool.name },
  ];

  // Generate structured data for the tool
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "AI Tool Marketplace",
    },
    datePublished: "2024-01-01",
    dateModified: "2024-12-01",
    url: `https://ai-tool-marketplace.vercel.app/tools/${id}`,
    mainEntity: {
      "@type": "Article",
      headline: `${tool.name} - Best Practices and Usage Guide`,
      description: `Learn how to use ${tool.name} effectively with best practices and suggested prompts.`,
      author: {
        "@type": "Organization",
        name: "AI Tool Marketplace",
      },
      publisher: {
        "@type": "Organization",
        name: "AI Tool Marketplace",
      },
      datePublished: "2024-01-01",
      dateModified: "2024-12-01",
    },
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tool Header */}
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h1>
                <span
                  className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                  aria-label={`Category: ${tool.category}`}
                >
                  {tool.category}
                </span>
              </div>
            </div>
          </header>

          {/* Tool Description */}
          <section className="mb-8" aria-labelledby="description-heading">
            <h2
              id="description-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              About {tool.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          </section>

          {/* Best Practices Section */}
          <section className="mb-8" aria-labelledby="best-practices-heading">
            <h2
              id="best-practices-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              Best Practices
            </h2>
            <ul
              className="space-y-2"
              role="list"
              aria-label="Best practices for using this tool"
            >
              {tool.bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start" role="listitem">
                  <span
                    className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"
                    aria-hidden="true"
                  ></span>
                  <span className="text-gray-700">{practice}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Suggested Prompts Section */}
          <section className="mb-8" aria-labelledby="prompts-heading">
            <h2
              id="prompts-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              Suggested Prompts
            </h2>
            <div
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              role="list"
              aria-label="Suggested prompts for this AI tool"
            >
              {tool.suggestedPrompts.map((prompt, index) => (
                <div key={index} role="listitem">
                  <PromptCard prompt={prompt} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
