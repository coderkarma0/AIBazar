import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Navigation from "../Navigation";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("Navigation", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation with all menu items", () => {
    render(<Navigation />);

    expect(screen.getByText("AI Bazar")).toBeInTheDocument();
    expect(screen.getAllByText("Home")).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText("Tools")).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText("Leaderboard")).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText("Coupons")).toHaveLength(2); // Desktop and mobile
  });

  it("highlights active page correctly", () => {
    mockUsePathname.mockReturnValue("/tools");
    render(<Navigation />);

    const toolsLink = screen.getAllByText("Tools")[0]; // Get desktop version
    expect(toolsLink).toHaveClass("bg-blue-100", "text-blue-700");
  });

  it("highlights home page when on root path", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Navigation />);

    const homeLink = screen.getAllByText("Home")[0]; // Get desktop version
    expect(homeLink).toHaveClass("bg-blue-100", "text-blue-700");
  });

  it("highlights tools page when on tool detail page", () => {
    mockUsePathname.mockReturnValue("/tools/chatgpt");
    render(<Navigation />);

    const toolsLink = screen.getAllByText("Tools")[0]; // Get desktop version
    expect(toolsLink).toHaveClass("bg-blue-100", "text-blue-700");
  });

  it("shows mobile menu button on small screens", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Toggle navigation menu");
    expect(menuButton).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Toggle navigation menu");

    // Mobile menu should be hidden initially
    const mobileMenu =
      screen.getAllByText("Home")[1].parentElement?.parentElement;
    expect(mobileMenu).toHaveClass("hidden");

    // Click to open menu
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass("block");

    // Click to close menu
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass("hidden");
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Toggle navigation menu");

    // Open mobile menu
    fireEvent.click(menuButton);
    const mobileMenu =
      screen.getAllByText("Home")[1].parentElement?.parentElement;
    expect(mobileMenu).toHaveClass("block");

    // Click a mobile menu link
    const mobileHomeLink = screen.getAllByText("Home")[1];
    fireEvent.click(mobileHomeLink);

    // Menu should be closed
    expect(mobileMenu).toHaveClass("hidden");
  });

  it("has proper accessibility attributes", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Toggle navigation menu");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveAttribute("aria-label", "Toggle navigation menu");

    // Check for screen reader text
    expect(screen.getByText("Open main menu")).toHaveClass("sr-only");
  });

  it("renders correct links with proper hrefs", () => {
    render(<Navigation />);

    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const toolsLinks = screen.getAllByRole("link", { name: "Tools" });
    const leaderboardLinks = screen.getAllByRole("link", {
      name: "Leaderboard",
    });
    const couponsLinks = screen.getAllByRole("link", { name: "Coupons" });

    expect(homeLinks[0]).toHaveAttribute("href", "/");
    expect(toolsLinks[0]).toHaveAttribute("href", "/tools");
    expect(leaderboardLinks[0]).toHaveAttribute("href", "/leaderboard");
    expect(couponsLinks[0]).toHaveAttribute("href", "/coupons");
  });

  it("brand logo links to home page", () => {
    render(<Navigation />);

    const brandLink = screen.getByRole("link", { name: "AI Bazar" });
    expect(brandLink).toHaveAttribute("href", "/");
  });
});
