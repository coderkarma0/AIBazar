import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Tool Marketplace - Discover the Best AI Tools",
    template: "%s | AI Tool Marketplace",
  },
  description:
    "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings. Your comprehensive directory for AI productivity tools.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "productivity",
    "machine learning",
    "automation",
    "AI marketplace",
    "best practices",
    "discount codes",
    "leaderboard",
  ],
  authors: [{ name: "AI Tool Marketplace Team" }],
  creator: "AI Tool Marketplace",
  publisher: "AI Tool Marketplace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ai-tool-marketplace.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-tool-marketplace.vercel.app",
    title: "AI Tool Marketplace - Discover the Best AI Tools",
    description:
      "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings. Your comprehensive directory for AI productivity tools.",
    siteName: "AI Tool Marketplace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Tool Marketplace - Discover the Best AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Marketplace - Discover the Best AI Tools",
    description:
      "Discover the best AI tools, learn best practices, get exclusive discount codes, and explore community rankings.",
    images: ["/og-image.png"],
    creator: "@aitoolmarketplace",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <header>
          <Navigation />
        </header>
        <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
          <div id="main-content">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
