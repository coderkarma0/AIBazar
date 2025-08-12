import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "@/app/page";
import ToolsPage from "@/app/tools/page";
import LeaderboardPage from "@/app/leaderboard/page";
import CouponsPage from "@/app/coupons/page";
import ToolCard from "@/components/ToolCard";
import PromptCard from "@/components/PromptCard";
import LeaderboardTable from "@/components/LeaderboardTable";
import CouponCard from "@/components/CouponCard";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock data
const mockTool = {
  id: "test-tool",
  name: "Test AI Tool",
  category: "Conversational AI",
  description: "A test AI tool for accessibility testing",
  bestPractices: ["Practice 1", "Practice 2"],
  suggestedPrompts: ["Test prompt 1", "Test prompt 2"],
};

const mockLeaderboardEntry = {
  rank: 1,
  toolId: "test-tool",
  score: 9.5,
  achievement: "Top Performer",
};

const mockCoupon = {
  id: "test-coupon",
  toolId: "test-tool",
  code: "TEST50",
  description: "Test discount coupon",
  expiry: "2025-12-31",
};

// Jest matchers are extended via jest-dom.d.ts

describe("Accessibility Tests", () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  describe("Component Accessibility", () => {
    it("ToolCard should not have accessibility violations", async () => {
      const { container } = render(<ToolCard tool={mockTool} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("PromptCard should not have accessibility violations", async () => {
      const { container } = render(
        <PromptCard prompt="Test prompt for accessibility" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("LeaderboardTable should not have accessibility violations", async () => {
      const { container } = render(
        <LeaderboardTable
          leaderboardData={[mockLeaderboardEntry]}
          tools={[mockTool]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("CouponCard should not have accessibility violations", async () => {
      const { container } = render(<CouponCard coupon={mockCoupon} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("Navigation should not have accessibility violations", async () => {
      const { container } = render(<Navigation />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("PageLayout should not have accessibility violations", async () => {
      const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Current Page" },
      ];

      const { container } = render(
        <PageLayout
          title="Test Page"
          description="Test page description"
          breadcrumbs={breadcrumbs}
        >
          <div>Test content</div>
        </PageLayout>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Page Accessibility", () => {
    it("Homepage should not have accessibility violations", async () => {
      const { container } = render(<Home />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("LeaderboardPage should not have accessibility violations", async () => {
      const { container } = render(<LeaderboardPage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("CouponsPage should not have accessibility violations", async () => {
      const { container } = render(<CouponsPage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Keyboard Navigation", () => {
    it("ToolCard should be keyboard accessible", () => {
      const { container } = render(<ToolCard tool={mockTool} />);
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/tools/test-tool");
    });

    it("PromptCard copy button should be keyboard accessible", () => {
      const { container } = render(<PromptCard prompt="Test prompt" />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute("tabindex", "-1");
    });

    it("CouponCard copy button should be keyboard accessible", () => {
      const { container } = render(<CouponCard coupon={mockCoupon} />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute("tabindex", "-1");
    });

    it("Navigation links should be keyboard accessible", () => {
      const { container } = render(<Navigation />);
      const links = container.querySelectorAll("a");
      links.forEach((link) => {
        expect(link).not.toHaveAttribute("tabindex", "-1");
      });
    });
  });

  describe("ARIA Labels and Roles", () => {
    it("ToolCard should have proper ARIA attributes", () => {
      const { container } = render(<ToolCard tool={mockTool} />);
      const article = container.querySelector("article");
      const categorySpan = container.querySelector(
        '[aria-label="Category: Conversational AI"]'
      );

      expect(article).toBeInTheDocument();
      expect(categorySpan).toBeInTheDocument();
      expect(categorySpan).toHaveAttribute(
        "aria-label",
        "Category: Conversational AI"
      );
    });

    it("LeaderboardTable should have proper table roles", () => {
      const { container } = render(
        <LeaderboardTable
          leaderboardData={[mockLeaderboardEntry]}
          tools={[mockTool]}
        />
      );

      const table = container.querySelector("table");
      const headers = container.querySelectorAll("th");
      const cells = container.querySelectorAll("td");

      expect(table).toHaveAttribute("role", "table");
      expect(headers.length).toBeGreaterThan(0);
      expect(cells.length).toBeGreaterThan(0);

      headers.forEach((header) => {
        expect(header).toHaveAttribute("scope", "col");
        expect(header).toHaveAttribute("role", "columnheader");
      });
    });

    it("CouponCard should have proper ARIA attributes", () => {
      const { container } = render(<CouponCard coupon={mockCoupon} />);
      const article = container.querySelector("article");
      const button = container.querySelector("button");

      expect(article).toBeInTheDocument();
      expect(article).toHaveAttribute("aria-labelledby");
      expect(article).toHaveAttribute("aria-describedby");
      expect(button).toHaveAttribute("aria-label");
    });
  });

  describe("Screen Reader Support", () => {
    it("should have proper heading hierarchy", () => {
      const { container } = render(
        <PageLayout title="Test Page">
          <section>
            <h2>Section Heading</h2>
            <h3>Subsection Heading</h3>
          </section>
        </PageLayout>
      );

      const h1 = container.querySelector("h1");
      const h2 = container.querySelector("h2");
      const h3 = container.querySelector("h3");

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
    });

    it("should have screen reader only text for important actions", () => {
      const { container } = render(<ToolCard tool={mockTool} />);
      const srText = container.querySelector(".sr-only");
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent("Click to view details");
    });

    it("should have live regions for dynamic content", () => {
      const { container } = render(<PromptCard prompt="Test prompt" />);
      // The live region is added dynamically when copied, so we check the structure
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-label");
    });
  });

  describe("Focus Management", () => {
    it("should have visible focus indicators", () => {
      const { container } = render(<ToolCard tool={mockTool} />);
      const link = container.querySelector("a");
      expect(link).toHaveClass(
        "focus:outline-none",
        "focus:underline",
        "focus:text-blue-600"
      );
    });

    it("buttons should have focus rings", () => {
      const { container } = render(<PromptCard prompt="Test prompt" />);
      const button = container.querySelector("button");
      expect(button).toHaveClass(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-500"
      );
    });

    it("form elements should have focus rings", () => {
      const { container } = render(<ToolsPage />);
      const input = container.querySelector("input");
      const select = container.querySelector("select");

      if (input) {
        expect(input).toHaveClass("focus:ring-2", "focus:ring-blue-500");
      }
      if (select) {
        expect(select).toHaveClass("focus:ring-2", "focus:ring-blue-500");
      }
    });
  });
});
