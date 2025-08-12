import { render, screen } from "@testing-library/react";
import PageLayout from "../PageLayout";

describe("PageLayout", () => {
  it("renders children content", () => {
    render(
      <PageLayout>
        <div>Test content</div>
      </PageLayout>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <PageLayout title="Test Page Title">
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Page Title"
    );
  });

  it("renders description when provided", () => {
    render(
      <PageLayout title="Test Title" description="This is a test description">
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("does not render header section when no title or description provided", () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders breadcrumbs when provided", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Tools", href: "/tools" },
      { label: "Current Page" },
    ];

    render(
      <PageLayout breadcrumbs={breadcrumbs}>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByLabelText("Breadcrumb navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Tools" })).toHaveAttribute(
      "href",
      "/tools"
    );
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("does not render breadcrumbs when not provided", () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(
      screen.queryByLabelText("Breadcrumb navigation")
    ).not.toBeInTheDocument();
  });

  it("does not render breadcrumbs when empty array provided", () => {
    render(
      <PageLayout breadcrumbs={[]}>
        <div>Content</div>
      </PageLayout>
    );

    expect(
      screen.queryByLabelText("Breadcrumb navigation")
    ).not.toBeInTheDocument();
  });

  it("renders breadcrumb separators correctly", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Tools", href: "/tools" },
      { label: "Current Page" },
    ];

    const { container } = render(
      <PageLayout breadcrumbs={breadcrumbs}>
        <div>Content</div>
      </PageLayout>
    );

    // Should have 2 separators for 3 breadcrumb items
    const separators = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <PageLayout className="custom-class">
        <div>Content</div>
      </PageLayout>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies default background and layout classes", () => {
    const { container } = render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(container.firstChild).toHaveClass("min-h-screen", "bg-gray-50");
  });

  it("renders main element with proper structure", () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("flex-1");
    expect(main).toContainHTML("<div>Content</div>");
  });

  it("handles breadcrumbs with mixed linked and non-linked items", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Category" }, // No href
      { label: "Current Page" },
    ];

    render(
      <PageLayout breadcrumbs={breadcrumbs}>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Category" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });
});
