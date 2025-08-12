import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI Development Playbook - How We Built This Project | AI Tool Marketplace",
  description:
    "Complete step-by-step playbook for building projects with AI IDEs. Learn our exact process, prompts, and workflow for creating the AI Tool Marketplace from scratch.",
  keywords: [
    "AI development",
    "project playbook",
    "AI IDE workflow",
    "development process",
    "Next.js project",
    "AI-assisted coding",
    "project documentation",
  ],
  openGraph: {
    title: "AI Development Playbook - How We Built This Project",
    description:
      "Learn our complete workflow for building projects with AI IDEs. From requirements to deployment.",
    type: "article",
  },
};

export default function AIDevelopmentPlaybook() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Development Playbook
          </h1>
          <p className="text-xl text-gray-600">
            How we built the AI Tool Marketplace using AI-powered IDEs - A
            complete step-by-step guide
          </p>
        </header>

        <div className="space-y-8">
          {/* Step 0 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              0️⃣ Before you open the IDE — prep & access
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What to collect:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Client bullet points (raw)</li>
                  <li>
                    Target audience, non-functional constraints (performance,
                    compliance), deadlines, budget
                  </li>
                  <li>
                    Any brand assets, API keys (keep secrets out of AI prompts)
                  </li>
                  <li>
                    Access: repo (or create one), cloud account/hosting details,
                    domain
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">
                  🚨 Rule: never paste secrets into the IDE chat or public
                  prompts.
                </p>
              </div>
            </div>
          </section>

          {/* Step 1 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              1️⃣ Clarify the bullets into measurable acceptance criteria
            </h2>

            <p className="text-gray-600 mb-4">
              <strong>Why:</strong> AI and devs need clear acceptance criteria.
              Do this once, collaboratively with client.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Example client bullets (raw)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>&quot;Make a marketplace for AI tools&quot;</li>
                    <li>&quot;Users can browse tools&quot;</li>
                    <li>&quot;Show best practices and prompts&quot;</li>
                    <li>&quot;Leaderboard and coupons&quot;</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  📋 Prompt (use IDE chat, persona = product manager):
                </h4>
                <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {`You are a senior product manager. Convert these bullets into 6-8 user stories with acceptance criteria (GIVEN/WHEN/THEN), priority (P0/P1), and a rough dev estimate in hours. Keep items small and testable.

Bullets:
- Make a marketplace for AI tools
- Users can browse tools  
- Show best practices and prompts
- Leaderboard and coupons
- Search and categories
- Responsive UI

Expected output (example user story):
US-101: As a user, I can browse AI tools with title, description, category so I can find relevant tools.
Acceptance: Given user visits /tools, when page loads, then tools are displayed in a grid with search and filter options.
Priority: P0, Est: 8h.`}
                  </pre>
                </div>
              </div>

              <p className="text-gray-600">
                <strong>Action:</strong> review & send these stories to the
                client for quick sign-off.
              </p>
            </div>
          </section>

          {/* Step 2 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              2️⃣ Create repo, branch strategy, and board
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Do yourself:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    Create repo with main protected, enable Issues,
                    Project/Board
                  </li>
                  <li>Add README.md, CONTRIBUTING.md, PR_TEMPLATE.md</li>
                  <li>
                    Choose branch naming convention: feat/xxx, fix/xxx,
                    chore/xxx
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  📋 Prompt (AI to generate README & templates):
                </h4>
                <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {`Create a README for "AI Tool Marketplace" with sections: overview, tech stack, local setup, run, test, deploy, env vars (no secrets). 

Also produce a CONTRIBUTING.md with branching and PR rules, and a PR_TEMPLATE.md.`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              3️⃣ Scaffold the project (skeleton, infra, basic pages)
            </h2>

            <p className="text-gray-600 mb-4">
              <strong>Goal:</strong> get a minimal runnable app (a
              &quot;vertical slice&quot;) quickly.
            </p>

            <div className="space-y-4">
              <p className="text-gray-700">
                Decide stack fast (matching client constraints). Example:
                Next.js (React + SSR), TailwindCSS, TypeScript.
              </p>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">
                  📋 Prompt (scaffold):
                </h4>
                <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {`You are a senior fullstack engineer. Generate a minimal Next.js + TypeScript app scaffold with:

- pages: /, /tools, /tools/[id], /leaderboard, /coupons
- components: ToolCard, PromptCard, LeaderboardTable, CouponCard
- data: JSON files for tools, leaderboard, coupons
- styling: TailwindCSS + shadcn/ui setup
- Basic eslint/prettier config
- Package.json with all dependencies

Only include code files and commands for setup. Keep it minimal.`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  What you do:
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>
                    Accept the scaffold, run locally, ensure{" "}
                    <code className="bg-gray-200 px-1 rounded">
                      npm run dev
                    </code>{" "}
                    works
                  </li>
                  <li>
                    Commit{" "}
                    <code className="bg-gray-200 px-1 rounded">
                      feat: scaffold app — initial vertical slice
                    </code>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              4️⃣ Turn each user story into an issue and small PR-sized tasks
            </h2>

            <p className="text-gray-600 mb-4">
              <strong>Rule:</strong> each task ≤ 2–3 hours where possible.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">
                  📋 Prompt (AI = backlog manager):
                </h4>
                <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {`For the user story "User can browse AI tools" split into 5 dev tasks:
1. Create tools data structure and JSON
2. Build ToolCard component
3. Create tools listing page with grid
4. Add search functionality
5. Add category filtering

For each task provide title, short description, acceptance criteria, estimate.`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Example issue body template:
                </h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="whitespace-pre-wrap">
                    {`Title: Create ToolCard component

Description: Build reusable ToolCard component that displays tool name, category, description with proper styling.

Acceptance: 
- Component accepts tool props (name, category, description, id)
- Renders with TailwindCSS styling
- Links to /tools/[id] page
- Responsive design

Estimate: 2h`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Golden Rules */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              ⭐ Golden Rules / Best Practices
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">
                    Small PRs: keep changes reviewable
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">
                    Always run tests locally before merging AI-generated code
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">
                    Human review mandatory for security, architecture, and UX
                    decisions
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Pin dependencies & scan</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">
                    Never paste secrets into prompts. Use placeholders
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">
                    Add acceptance tests: they&apos;re the contract with the
                    client
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">
                    Keep commits small and focused
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">
                    Document your prompts for team reuse
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Final Checklist */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              ✅ Final Checklist to Ship
            </h2>

            <div className="grid gap-2">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  Client acceptance criteria signed off
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  Vertical slice running locally + tests passing
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">CI on PRs (lint/tests)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  Basic dependency scans configured
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  Component docs & README written
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  UAT checklist passed and client approved
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">Release tag & deploy</span>
              </label>
            </div>
          </section>

          {/* Real Example */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🎯 Mini End-to-End Example (Our AI Tool Marketplace)
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Client bullets:
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>&quot;Create a marketplace for AI tools&quot;</li>
                    <li>&quot;Show best practices and prompts&quot;</li>
                    <li>&quot;Leaderboard with rankings&quot;</li>
                    <li>&quot;Coupon system for discounts&quot;</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Turn into a story (example):
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-900 font-semibold">
                    US-001: User browses AI tools
                  </p>
                  <p className="text-blue-800">
                    <strong>Acceptance:</strong> User can view tools in grid,
                    search by name, filter by category, click to view details.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Task breakdown:
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Create tools JSON data structure — 1h</li>
                    <li>Build ToolCard component — 2h</li>
                    <li>Create tools listing page with grid — 2h</li>
                    <li>Add search functionality — 2h</li>
                    <li>Add category filtering — 2h</li>
                    <li>Unit + integration tests — 2h</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  📋 Prompt to scaffold tools page:
                </h4>
                <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {`Create a Next.js tools listing page with:
- Import tools from JSON data
- ToolCard component displaying name, category, description
- Search input with debounced filtering
- Category dropdown filter
- Responsive grid layout
- TypeScript interfaces
- Unit tests with Testing Library

Provide complete file contents for all components.`}
                  </pre>
                </div>
              </div>

              <p className="text-gray-700">
                AI provides code → you run{" "}
                <code className="bg-gray-200 px-1 rounded">npm test</code> → fix
                edge cases via follow-up prompts if errors appear.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            🚀 Ready to Build Your Next Project?
          </h2>
          <p className="text-blue-800 mb-4">
            This playbook is exactly how we built this AI Tool Marketplace.
            Follow these steps with any AI-powered IDE to create professional,
            well-tested applications efficiently.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Next.js
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              TailwindCSS
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              AI-Assisted Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
