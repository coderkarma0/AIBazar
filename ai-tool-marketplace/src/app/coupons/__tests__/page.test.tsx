import { render, screen } from "@testing-library/react";
import CouponsPage from "../page";

// Mock the coupons data
jest.mock("../../../../data/coupons.json", () => [
  {
    id: "c1",
    toolId: "chatgpt",
    code: "GPT20OFF",
    description: "Get 20% off ChatGPT Plus subscription",
    expiry: "2025-12-31",
  },
  {
    id: "c2",
    toolId: "midjourney",
    code: "MIDJ15",
    description: "15% discount on Midjourney monthly plan",
    expiry: "2025-11-15",
  },
  {
    id: "c3",
    toolId: "notion-ai",
    code: "NOTION10",
    description: "Save 10% on Notion AI annual subscription",
    expiry: "2025-10-01",
  },
]);

// Mock the CouponCard component
jest.mock("@/components/CouponCard", () => {
  return function MockCouponCard({
    coupon,
  }: {
    coupon: { id: string; code: string; description: string };
  }) {
    return (
      <div data-testid={`coupon-card-${coupon.id}`}>
        <div>{coupon.code}</div>
        <div>{coupon.description}</div>
      </div>
    );
  };
});

describe("CouponsPage", () => {
  it("renders the page header correctly", () => {
    render(<CouponsPage />);

    expect(screen.getByText("Discount Coupons")).toBeInTheDocument();
    expect(
      screen.getByText(/Save money on your favorite AI tools/)
    ).toBeInTheDocument();
  });

  it("renders all coupon cards", () => {
    render(<CouponsPage />);

    expect(screen.getByTestId("coupon-card-c1")).toBeInTheDocument();
    expect(screen.getByTestId("coupon-card-c2")).toBeInTheDocument();
    expect(screen.getByTestId("coupon-card-c3")).toBeInTheDocument();
  });

  it("displays coupon codes and descriptions", () => {
    render(<CouponsPage />);

    expect(screen.getByText("GPT20OFF")).toBeInTheDocument();
    expect(screen.getByText("MIDJ15")).toBeInTheDocument();
    expect(screen.getByText("NOTION10")).toBeInTheDocument();

    expect(
      screen.getByText("Get 20% off ChatGPT Plus subscription")
    ).toBeInTheDocument();
    expect(
      screen.getByText("15% discount on Midjourney monthly plan")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Save 10% on Notion AI annual subscription")
    ).toBeInTheDocument();
  });

  it("uses responsive grid layout", () => {
    const { container } = render(<CouponsPage />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
  });

  it("applies correct styling classes", () => {
    const { container } = render(<CouponsPage />);

    // Check main container styling (now uses PageLayout)
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toHaveClass("bg-gray-50");

    // Check max-width container
    const maxWidthContainer = container.querySelector(".max-w-7xl");
    expect(maxWidthContainer).toHaveClass(
      "mx-auto",
      "px-4",
      "sm:px-6",
      "lg:px-8"
    );
  });
});

describe("CouponsPage - Component Structure", () => {
  it("has proper page structure and accessibility", () => {
    const { container } = render(<CouponsPage />);

    // Check for main heading
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Discount Coupons");

    // Check for proper semantic structure
    expect(container.querySelector("h1")).toBeInTheDocument();

    // Check grid container exists
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders with proper background and spacing", () => {
    const { container } = render(<CouponsPage />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("min-h-screen", "bg-gray-50");
  });
});

describe("CouponsPage - Integration", () => {
  it("integrates properly with CouponCard components", () => {
    render(<CouponsPage />);

    // Verify that the page renders the expected number of coupon cards
    const couponCards = screen.getAllByTestId(/coupon-card-/);
    expect(couponCards).toHaveLength(3);

    // Verify that each coupon card has the expected data
    expect(screen.getByTestId("coupon-card-c1")).toBeInTheDocument();
    expect(screen.getByTestId("coupon-card-c2")).toBeInTheDocument();
    expect(screen.getByTestId("coupon-card-c3")).toBeInTheDocument();
  });

  it("displays coupons in the correct grid layout", () => {
    const { container } = render(<CouponsPage />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("gap-6");

    // Check that all coupon cards are within the grid
    const couponCards = container.querySelectorAll(
      '[data-testid^="coupon-card-"]'
    );
    expect(couponCards).toHaveLength(3);

    couponCards.forEach((card) => {
      expect(grid).toContainElement(card as HTMLElement);
    });
  });

  it("has proper page metadata structure", () => {
    render(<CouponsPage />);

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Discount Coupons");

    // Check for descriptive text
    expect(
      screen.getByText(/Save money on your favorite AI tools/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Click to copy any coupon code/)
    ).toBeInTheDocument();
  });
});
