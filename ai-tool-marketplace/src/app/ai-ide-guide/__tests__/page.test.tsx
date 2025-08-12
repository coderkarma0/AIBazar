import { render, screen } from "@testing-library/react";
import AIIDEGuide from "../page";

describe("AI IDE Guide Page", () => {
  beforeEach(() => {
    render(<AIIDEGuide />);
  });

  it("renders the main heading and description", () => {
    expect(
      screen.getByRole("heading", { name: /ai ide complete workflow guide/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /a copy-pasteable playbook for onboarding ai-powered ides/i
      )
    ).toBeInTheDocument();
  });

  it("renders the Quick TL;DR section", () => {
    expect(
      screen.getByRole("heading", { name: /quick tl;dr/i })
    ).toBeInTheDocument();

    // Check for the 6 main steps
    expect(
      screen.getByText(/open the project in the ai ide/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/run basic commands/i)).toBeInTheDocument();
    expect(
      screen.getByText(/give the ai a short repo index/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ask the ai to summarise the repo/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/when you need a fix/i)).toBeInTheDocument();
    expect(screen.getByText(/review the patch locally/i)).toBeInTheDocument();
  });

  it("renders the step-by-step guide section", () => {
    expect(
      screen.getByRole("heading", {
        name: /step-by-step: onboard an ai-ide to an existing project/i,
      })
    ).toBeInTheDocument();

    // Check for main steps
    expect(
      screen.getByText(/step 0 — prepare your environment/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/step 1 — provide a small repo index/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/step 2 — ask the ai to create an internal index/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/step 3 — narrow scope for the task/i)
    ).toBeInTheDocument();
  });

  it("renders the bug fix template section", () => {
    expect(
      screen.getByRole("heading", { name: /how to request a code fix/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/minimal reproducible bug report/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/bug request template/i)).toBeInTheDocument();
    expect(screen.getByText(/copy-paste template/i)).toBeInTheDocument();
  });

  it("renders code examples and prompts", () => {
    // Check for code blocks with git commands
    expect(screen.getByText(/git status/)).toBeInTheDocument();
    expect(screen.getByText(/npm ci/)).toBeInTheDocument();
    expect(screen.getAllByText(/npm run dev/)).toHaveLength(3); // Appears in multiple places
    expect(screen.getAllByText(/npm test/)).toHaveLength(2); // Also appears in multiple places

    // Check for file structure examples
    expect(screen.getByText(/\/package\.json/)).toBeInTheDocument();
    expect(screen.getByText(/\/README\.md/)).toBeInTheDocument();
    expect(screen.getAllByText(/\/src\/components\//)).toHaveLength(2); // Also appears in multiple places
  });

  it("renders the prompt bank section", () => {
    expect(
      screen.getByRole("heading", { name: /useful prompt bank/i })
    ).toBeInTheDocument();

    // Check for prompt categories - use getAllByText for duplicates
    expect(screen.getByText(/index repo/i)).toBeInTheDocument();
    expect(screen.getByText(/quick diagnosis/i)).toBeInTheDocument();
    expect(screen.getByText(/write a test/i)).toBeInTheDocument();
    expect(screen.getAllByText(/code review/i)).toHaveLength(2); // Appears in heading and list
  });

  it("renders the safety and recovery section", () => {
    expect(
      screen.getByRole("heading", { name: /safety, secrets, and recovery/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/safety guidelines/i)).toBeInTheDocument();
    expect(screen.getByText(/recovery & revert/i)).toBeInTheDocument();
    expect(screen.getByText(/never paste secrets/i)).toBeInTheDocument();
  });

  it("renders the final checklist section", () => {
    expect(
      screen.getByRole("heading", {
        name: /final checklist before merging a fix/i,
      })
    ).toBeInTheDocument();

    // Check for checklist items
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(6);

    expect(
      screen.getByText(/ci \(lint \+ tests\) passes locally/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/manual qa steps executed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/no secrets leaked in code or pr/i)
    ).toBeInTheDocument();
  });

  it("renders the pro tips section", () => {
    expect(
      screen.getByRole("heading", { name: /pro tips for success/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/start with small, focused requests/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/always provide context/i)).toBeInTheDocument();
    expect(
      screen.getByText(/build up a library of working prompts/i)
    ).toBeInTheDocument();
  });

  it("has proper responsive layout", () => {
    const container = screen
      .getByRole("heading", { name: /ai ide complete workflow guide/i })
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
    expect(h1).toHaveTextContent("AI IDE Complete Workflow Guide");

    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(5);

    const h3Elements = screen.getAllByRole("heading", { level: 3 });
    expect(h3Elements.length).toBeGreaterThan(3);
  });

  it("contains copyable code blocks", () => {
    // Check for pre elements with code
    const preElements = document.querySelectorAll("pre");
    expect(preElements.length).toBeGreaterThanOrEqual(5);

    // Check for specific code examples
    expect(
      screen.getByText(/git restore src\/path\/to\/file/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/git revert <bad-commit-hash>/)
    ).toBeInTheDocument();
  });

  it("has proper accessibility features", () => {
    // Check for proper ARIA labels and semantic elements
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(5);

    // Check for proper list structures
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThan(3);
  });
});
