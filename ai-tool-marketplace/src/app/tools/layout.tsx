import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory - Browse All AI Tools",
  description:
    "Browse our comprehensive directory of AI tools. Search and filter by category to find the perfect AI tools for your productivity, creativity, and automation needs.",
  keywords: [
    "AI tools directory",
    "browse AI tools",
    "search AI tools",
    "filter AI tools",
    "productivity tools",
    "automation tools",
    "AI categories",
  ],
  openGraph: {
    title: "AI Tools Directory - Browse All AI Tools",
    description:
      "Browse our comprehensive directory of AI tools. Search and filter by category to find the perfect AI tools for your productivity, creativity, and automation needs.",
    url: "https://ai-tool-marketplace.vercel.app/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory - Browse All AI Tools",
    description:
      "Browse our comprehensive directory of AI tools. Search and filter by category to find the perfect AI tools.",
  },
  alternates: {
    canonical: "https://ai-tool-marketplace.vercel.app/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
