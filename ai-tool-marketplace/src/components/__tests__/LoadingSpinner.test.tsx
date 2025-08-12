import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with default props", () => {
    render(<LoadingSpinner />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getAllByText("Loading...")).toHaveLength(2); // sr-only and visible text
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    const customText = "Please wait...";
    render(<LoadingSpinner text={customText} />);

    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it("renders without visible text when text prop is empty", () => {
    render(<LoadingSpinner text="" />);

    // Should still have sr-only text for accessibility
    expect(
      screen.getByText("Loading...", { selector: ".sr-only" })
    ).toBeInTheDocument();
    // Should not have visible paragraph text
    expect(
      screen.queryByText("Loading...", { selector: "p" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies small size classes correctly", () => {
    render(<LoadingSpinner size="sm" text="Small spinner" />);

    const spinner = screen.getByRole("status");
    const text = screen.getByText("Small spinner");

    expect(spinner).toHaveClass("h-4", "w-4");
    expect(text).toHaveClass("text-sm");
  });

  it("applies medium size classes correctly (default)", () => {
    render(<LoadingSpinner size="md" text="Medium spinner" />);

    const spinner = screen.getByRole("status");
    const text = screen.getByText("Medium spinner");

    expect(spinner).toHaveClass("h-8", "w-8");
    expect(text).toHaveClass("text-base");
  });

  it("applies large size classes correctly", () => {
    render(<LoadingSpinner size="lg" text="Large spinner" />);

    const spinner = screen.getByRole("status");
    const text = screen.getByText("Large spinner");

    expect(spinner).toHaveClass("h-12", "w-12");
    expect(text).toHaveClass("text-lg");
  });

  it("applies fullScreen layout when fullScreen is true", () => {
    const { container } = render(<LoadingSpinner fullScreen />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      "min-h-screen",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "bg-gray-50"
    );
  });

  it("applies default layout when fullScreen is false", () => {
    const { container } = render(<LoadingSpinner fullScreen={false} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "py-8"
    );
    expect(wrapper).not.toHaveClass("min-h-screen", "bg-gray-50");
  });

  it("applies custom className", () => {
    const customClass = "custom-spinner-class";
    const { container } = render(<LoadingSpinner className={customClass} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(customClass);
  });

  it("has proper accessibility attributes", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");

    const srOnlyText = screen.getByText("Loading...", { selector: ".sr-only" });
    expect(srOnlyText).toBeInTheDocument();
  });

  it("applies animation classes", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass(
      "animate-spin",
      "rounded-full",
      "border-2",
      "border-gray-300",
      "border-t-blue-600"
    );
  });
});
