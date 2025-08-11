import { notFound } from "next/navigation";
import toolsData from "@/data/tools.json";
import { Tool } from "@/types";
import PromptCard from "@/components/PromptCard";
import PageLayout from "@/components/PageLayout";

interface ToolDetailPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all tools at build time
export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    id: tool.id,
  }));
}

// Generate metadata for each tool page
export async function generateMetadata({ params }: ToolDetailPageProps) {
  const tool = toolsData.find((t) => t.id === params.id);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.name} - AI Tool Marketplace`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: ToolDetailPageProps) {
  const tool = toolsData.find((t) => t.id === params.id) as Tool | undefined;

  if (!tool) {
    notFound();
    return null; // This won't be reached but helps with TypeScript
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: tool.name },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tool Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h1>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {tool.category}
                </span>
              </div>
            </div>
          </div>

          {/* Tool Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About {tool.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          </div>

          {/* Best Practices Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Best Practices
            </h2>
            <ul className="space-y-2">
              {tool.bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700">{practice}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Prompts Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Suggested Prompts
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tool.suggestedPrompts.map((prompt, index) => (
                <PromptCard key={index} prompt={prompt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
