import Link from "next/link";
import { Tool } from "@/types";

interface ToolCardProps {
  tool: Tool;
}

const categoryColors: Record<string, string> = {
  "Conversational AI": "bg-blue-100 text-blue-800",
  "AI Art": "bg-purple-100 text-purple-800",
  Productivity: "bg-green-100 text-green-800",
  "Code Generation": "bg-orange-100 text-orange-800",
  "Data Analysis": "bg-indigo-100 text-indigo-800",
  Writing: "bg-pink-100 text-pink-800",
  default: "bg-gray-100 text-gray-800",
};

export default function ToolCard({ tool }: ToolCardProps) {
  const categoryColor = categoryColors[tool.category] || categoryColors.default;

  return (
    <Link href={`/tools/${tool.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 h-full border border-gray-200 hover:border-blue-300">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}
          >
            {tool.category}
          </span>
        </div>

        {/* Tool Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {tool.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-medium">Learn more</span>
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
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
        </div>
      </div>
    </Link>
  );
}
