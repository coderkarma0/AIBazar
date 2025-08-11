import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Coupon } from "@/types";
import CouponCard from "../CouponCard";

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

const mockCoupon: Coupon = {
  id: "c1",
  toolId: "chatgpt",
  code: "GPT20OFF",
  description: "Get 20% off ChatGPT Plus subscription",
  expiry: "2025-12-31",
};

const expiredCoupon: Coupon = {
  id: "c2",
  toolId: "midjourney",
  code: "EXPIRED10",
  description: "This coupon has expired",
  expiry: "2023-01-01",
};

const expiringSoonCoupon: Coupon = {
  id: "c3",
  toolId: "notion-ai",
  code: "SOON15",
  description: "This coupon expires soon",
  expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0], // 3 days from now
};

describe("CouponCard", () => {
  beforeEach(() => {
    mockWriteText.mockClear();
    mockWriteText.mockResolvedValue(undefined);
  });

  it("renders coupon information correctly", () => {
    render(<CouponCard coupon={mockCoupon} />);

    expect(screen.getByText("GPT20OFF")).toBeInTheDocument();
    expect(
      screen.getByText("Get 20% off ChatGPT Plus subscription")
    ).toBeInTheDocument();
    expect(screen.getByText(/Expires: Dec 31, 2025/)).toBeInTheDocument();
  });

  it("displays copy button for valid coupons", () => {
    render(<CouponCard coupon={mockCoupon} />);

    expect(screen.getByText("Copy Code")).toBeInTheDocument();
  });

  it("copies coupon code to clipboard when copy button is clicked", async () => {
    render(<CouponCard coupon={mockCoupon} />);

    const copyButton = screen.getByText("Copy Code");
    fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith("GPT20OFF");
  });

  it("shows success feedback after copying", async () => {
    render(<CouponCard coupon={mockCoupon} />);

    const copyButton = screen.getByText("Copy Code");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
  });

  it("resets to copy button after 2 seconds", async () => {
    jest.useFakeTimers();
    render(<CouponCard coupon={mockCoupon} />);

    const copyButton = screen.getByText("Copy Code");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText("Copy Code")).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("displays expired status for expired coupons", () => {
    render(<CouponCard coupon={expiredCoupon} />);

    expect(screen.getAllByText("Expired")).toHaveLength(2); // Badge and button
    expect(screen.getByText(/Expires: Jan 1, 2023/)).toBeInTheDocument();
  });

  it("disables copy button for expired coupons", () => {
    render(<CouponCard coupon={expiredCoupon} />);

    const copyButton = screen.getByRole("button");
    expect(copyButton).toBeDisabled();
    expect(copyButton).toHaveTextContent("Expired");
  });

  it("displays expiring soon warning for coupons expiring within 7 days", () => {
    render(<CouponCard coupon={expiringSoonCoupon} />);

    expect(screen.getByText("Expires Soon")).toBeInTheDocument();
  });

  it("applies correct styling for expired coupons", () => {
    const { container } = render(<CouponCard coupon={expiredCoupon} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("border-red-200", "bg-red-50");
  });

  it("applies correct styling for expiring soon coupons", () => {
    const { container } = render(<CouponCard coupon={expiringSoonCoupon} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("border-yellow-200", "bg-yellow-50");
  });

  it("handles clipboard API errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockWriteText.mockRejectedValue(new Error("Clipboard API failed"));

    render(<CouponCard coupon={mockCoupon} />);

    const copyButton = screen.getByText("Copy Code");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to copy coupon code: ",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
