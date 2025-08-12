import { render, screen } from "@testing-library/react";
import AIDevelopmentPlaybook from "../page";

describe("AI Development Playbook Page", () => {
  beforeEach(() => {
    render(<AIDevelopmentPlaybook />);
  });

  it("renders the main heading and description", () => {
    expect(
      screen.getByRole("heading", { name: /ai development playbook/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /how we built the ai tool marketplace using ai-powered ides/i
      )
    ).toBeInTheDocument();
  });

  it("renders all 11 workflow steps", () => {
    // Check for all step headings (0-10 + final sections)
    expect(
      screen.getByText(/0️⃣ before you open the ide — prep & access/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /1️⃣ clarify the bullets into measurable acceptance criteria/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/2️⃣ create repo, branch strategy, and board/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/3️⃣ scaffold the project/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /4️⃣ turn each user story into an issue and small pr-sized tasks/i
      )
    ).toBeInTheDocument();
  });

  it("renders the client bullets example", () => {
    expect(
      screen.getByText(/example client bullets \(raw\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/make a marketplace for ai tools/i)
    ).toHaveLength(2); // Appears in multiple places
    expect(screen.getAllByText(/users can browse tools/i)).toHaveLength(2); // Also appears in multiple places
    expect(
      screen.getAllByText(/show best practices and prompts/i)
    ).toHaveLength(3); // Also appears in multiple places
    expect(screen.getAllByText(/leaderboard and coupons/i)).toHaveLength(2); // Also appears in multiple places
  });

  it("renders copyable prompts and templates", () => {
    // Check for prompt sections
    expect(
      screen.getByText(/📋 prompt \(use ide chat, persona = product manager\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/📋 prompt \(ai to generate readme & templates\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/📋 prompt \(scaffold\)/i)).toBeInTheDocument();

    // Check for specific prompt content
    expect(
      screen.getByText(/you are a senior product manager/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you are a senior fullstack engineer/i)
    ).toBeInTheDocument();
  });

  it("renders the golden rules section", () => {
    expect(
      screen.getByRole("heading", { name: /golden rules \/ best practices/i })
    ).toBeInTheDocument();

    // Check for specific rules
    expect(
      screen.getByText(/small prs: keep changes reviewable/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/always run tests locally before merging/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/never paste secrets into prompts/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/human review mandatory for security/i)
    ).toBeInTheDocument();
  });

  it("renders the final checklist", () => {
    expect(
      screen.getByRole("heading", { name: /final checklist to ship/i })
    ).toBeInTheDocument();

    // Check for checklist items
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(7);

    expect(
      screen.getByText(/client acceptance criteria signed off/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/vertical slice running locally/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/ci on prs \(lint\/tests\)/i)).toBeInTheDocument();
    expect(screen.getByText(/release tag & deploy/i)).toBeInTheDocument();
  });

  it("renders the real example section", () => {
    expect(
      screen.getByRole("heading", { name: /mini end-to-end example/i })
    ).toBeInTheDocument();

    // Check for example content
    expect(screen.getByText(/client bullets:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/create a marketplace for ai tools/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/turn into a story \(example\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/us-001: user browses ai tools/i)
    ).toBeInTheDocument();
  });

  it("renders task breakdown examples", () => {
    expect(screen.getByText(/task breakdown:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/create tools json data structure — 1h/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/build toolcard component — 2h/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/add search functionality — 2h/i)
    ).toBeInTheDocument();
  });

  it("renders code examples and commands", () => {
    // Check for specific code examples
    expect(
      screen.getByText(/feat: scaffold app — initial vertical slice/)
    ).toBeInTheDocument();
    expect(screen.getByText(/npm test/)).toBeInTheDocument();

    // Check for file structure examples
    expect(
      screen.getByText(
        /pages: \/, \/tools, \/tools\/\[id\], \/leaderboard, \/coupons/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /components: toolcard, promptcard, leaderboardtable, couponcard/i
      )
    ).toBeInTheDocument();
  });

  it("renders the ready to build section", () => {
    expect(
      screen.getByRole("heading", {
        name: /ready to build your next project\?/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /this playbook is exactly how we built this ai tool marketplace/i
      )
    ).toBeInTheDocument();

    // Check for technology tags
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("TailwindCSS")).toBeInTheDocument();
    expect(screen.getByText("AI-Assisted Development")).toBeInTheDocument();
  });

  it("has proper responsive layout", () => {
    const container = screen
      .getByRole("heading", { name: /ai development playbook/i })
      .closest("div");
    expect(container).toHaveClass(
      "max-w-4xl",
      "mx-auto",
      "px-4",
      "sm:px-6",
      "lg:px-8"
    );
  });

  it("has proper semantic structure", () => {
    // Check for proper heading hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("AI Development Playbook");

    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(8);

    const h3Elements = screen.getAllByRole("heading", { level: 3 });
    expect(h3Elements.length).toBeGreaterThan(5);
  });

  it("contains structured sections with proper styling", () => {
    // Check for section containers
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(8);

    // Check for proper styling classes
    sections.forEach((section) => {
      expect(section).toHaveClass(
        "bg-white",
        "rounded-lg",
        "shadow-sm",
        "border",
        "border-gray-200",
        "p-6"
      );
    });
  });

  it("has proper accessibility features", () => {
    // Check for proper list structures
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThan(5);

    // Check for proper button/checkbox accessibility
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveClass("rounded", "border-gray-300");
    });
  });

  it("contains warning and safety information", () => {
    expect(
      screen.getByText(/🚨 rule: never paste secrets into the ide chat/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/never paste secrets into prompts/i)
    ).toBeInTheDocument();
  });

  it("provides actionable examples and templates", () => {
    // Check for example issue template
    expect(
      screen.getByText(/title: create toolcard component/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/estimate: 2h/i)).toBeInTheDocument();

    // Check for acceptance criteria examples - use getAllByText since it appears multiple times
    expect(screen.getAllByText(/acceptance:/i)).toHaveLength(3);
    expect(
      screen.getByText(/component accepts tool props/i)
    ).toBeInTheDocument();
  });
});
