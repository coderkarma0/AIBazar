import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI IDE Guide - Complete Workflow for Project Context | AI Tool Marketplace",
  description:
    "Complete step-by-step guide for onboarding AI-powered IDEs with full project context. Includes exact prompts, bug fix templates, and best practices for Cursor and other AI IDEs.",
  keywords: [
    "AI IDE",
    "Cursor IDE",
    "project context",
    "AI development",
    "code fixes",
    "debugging workflow",
    "AI prompts",
    "development guide",
  ],
  openGraph: {
    title: "AI IDE Guide - Complete Workflow for Project Context",
    description:
      "Master AI-powered development with this comprehensive guide. Learn exact prompts, templates, and workflows for onboarding AI IDEs.",
    type: "article",
  },
};

export default function AIIDEGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI IDE Complete Workflow Guide
          </h1>
          <p className="text-xl text-gray-600">
            A copy-pasteable playbook for onboarding AI-powered IDEs with full
            project context
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🚀 Quick TL;DR
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Open the project in the AI IDE and ensure it can see the
              repo/workspace
            </li>
            <li>
              Run basic commands (npm install, npm test, npm run dev) to confirm
              environment
            </li>
            <li>
              Give the AI a short repo index + essential files (README,
              package.json, key routes/components)
            </li>
            <li>
              Ask the AI to summarise the repo (it &quot;indexes&quot; for you)
            </li>
            <li>
              When you need a fix: create a small reproducible bug report, paste
              logs + file paths, and ask for a patch/diff
            </li>
            <li>Review the patch locally, run tests, commit & push</li>
          </ol>
        </div>

        <div className="space-y-8">
          {/* Step-by-step Guide */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📋 Step-by-step: Onboard an AI-IDE to an existing project
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Step 0 — Prepare your environment
                </h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    {`# clone or open the project
git status
git checkout -b feat/your-branch-or-fix/your-bug
npm ci         # or npm install
npm run dev    # start dev server
npm test       # run test suite`}
                  </pre>
                </div>
                <p className="text-gray-600 mt-2">
                  Make sure tests/builds run locally (or capture failing
                  output). Don&apos;t paste secrets anywhere.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Step 1 — Provide a small repo index (one-time)
                </h3>
                <p className="text-gray-600 mb-3">
                  Tell the AI the top-level structure so it can navigate faster.
                  Paste (or ask AI to read) your README.md and package.json
                  (these are high-signal). Also list key folders/files:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-700">
                    {`/package.json
/README.md
/next.config.js
/tsconfig.json
/src/pages/
/src/components/
/src/lib/
/data/
/docs/`}
                  </pre>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    📋 Prompt to paste into IDE chat:
                  </h4>
                  <div className="bg-white p-3 rounded border text-sm">
                    <p className="font-mono text-gray-800">
                      Hi — I&apos;m giving you the project context. Please
                      summarize the repo and note the main entry points,
                      build/test commands, and top-level components. Use README
                      and package.json below, then give me a one-paragraph
                      summary.
                    </p>
                    <p className="mt-2 text-gray-600">
                      &lt;PASTE README&gt;
                      <br />
                      &lt;PASTE package.json&gt;
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      (If the IDE can access the workspace automatically, say:
                      &quot;Please scan the workspace and summarize key
                      files.&quot;)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Step 2 — Ask the AI to create an internal index
                </h3>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    📋 Prompt:
                  </h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono text-gray-800">
                    Please index the project and list the 10 most important
                    files to inspect for frontend bugs (e.g. main routes,
                    layout, API client, store). Output paths and a one-line
                    reason for each.
                  </div>
                </div>
                <p className="text-gray-600 mt-2">This helps the AI focus.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Step 3 — Narrow scope for the task
                </h3>
                <p className="text-gray-600 mb-3">
                  If you want a fix in a component, tell the AI exactly which
                  files the issue likely touches. Example:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-700">
                    Suspect files: /src/components/ToolCard.tsx and
                    /src/pages/tools/[id].tsx
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Bug Fix Template */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🐛 How to request a code fix (exact process + template)
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  A. Minimal Reproducible Bug Report (what to include)
                </h3>
                <p className="text-gray-600 mb-3">Always include:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Title (concise)</li>
                  <li>Environment (node, browser, OS)</li>
                  <li>Branch name & commit hash</li>
                  <li>Steps to reproduce (exact clicks/commands)</li>
                  <li>Expected result</li>
                  <li>
                    Actual result (paste error message / stack trace /
                    screenshot)
                  </li>
                  <li>Which files you think are involved (paths)</li>
                  <li>Command output of failing test or console logs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  B. Bug request template (paste into IDE chat)
                </h3>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">
                    📋 Copy-Paste Template:
                  </h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {`BUG FIX REQUEST

Title: [short] e.g. "Tool details page crashes when description is empty"

Environment:
- Node: 18.16
- Next.js: 14.0.0
- Browser: Chrome 116
- Branch: fix/tool-details-empty-desc (based on main at commit abc123)

Reproduction Steps:
1. npm run dev
2. Open http://localhost:3000/tools/chatgpt
3. Observe console and page crash

Expected:
- Page should render and show "No description available" if description is empty.

Actual:
- Error in console: "TypeError: Cannot read properties of undefined (reading 'map')"
- Stack trace:
TypeError: Cannot read properties of undefined (reading 'map')
at renderBestPractices (/src/pages/tools/[id].tsx:45:16)
at ...

Files to inspect:
- src/pages/tools/[id].tsx
- src/components/PromptCard.tsx

What I have tried:
- Checked tools.json; some entries have empty bestPractices arrays
- Re-ran dev server; error reproducible

Request:
- Please provide the minimal code change to handle empty or undefined bestPractices safely.
- Provide the change as a unified git patch (diff) or full file contents.
- Explain the root cause in 2–3 lines and list tests I should run.

Please produce:
1) Short diagnosis
2) Patch (unified diff or full file)
3) Optional: one test (Jest/Playwright) to verify fix`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prompt Bank */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🏦 Useful Prompt Bank (copy-paste ready)
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Index repo</h3>
                <div className="bg-white p-3 rounded border text-sm font-mono text-gray-700">
                  You are a senior engineer. Summarize this repo in 5 bullets:
                  purpose, stack, build/test commands, key folders, areas most
                  likely to contain bugs. Use README and package.json below:
                  &lt;paste&gt;
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Quick diagnosis
                </h3>
                <div className="bg-white p-3 rounded border text-sm font-mono text-gray-700">
                  I see this stack trace: &lt;paste&gt;. Root cause and minimal
                  fix please. Provide a patch.
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Write a test
                </h3>
                <div className="bg-white p-3 rounded border text-sm font-mono text-gray-700">
                  Write a Jest/Testing Library test for &lt;component&gt; that
                  asserts &lt;behavior&gt;. Place test in &lt;path&gt;.
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Code review
                </h3>
                <div className="bg-white p-3 rounded border text-sm font-mono text-gray-700">
                  Review the following PR/files for: security issues,
                  performance, accessibility, missing tests. Provide prioritized
                  fixes.
                </div>
              </div>
            </div>
          </section>

          {/* Safety & Recovery */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🛡️ Safety, Secrets, and Recovery
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  ⚠️ Safety Guidelines
                </h3>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  <li>
                    Never paste secrets (API keys, .env values) into open
                    prompts. Use placeholders.
                  </li>
                  <li>Paste only logs, stack traces, and code.</li>
                  <li>
                    Always run the AI&apos;s suggested changes locally and run
                    your tests before merging.
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">
                  🚨 Recovery & Revert
                </h3>
                <p className="text-red-700 mb-2">
                  If a patch breaks the build:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                  <pre>
                    {`# If you applied a patch but haven't committed:
git restore src/path/to/file

# If you committed:
git revert <bad-commit-hash>

# If you want to reset branch to remote:
git reset --hard origin/main`}
                  </pre>
                </div>
                <p className="text-red-700 mt-2 text-sm">
                  Keep small commits so you can revert easily.
                </p>
              </div>
            </div>
          </section>

          {/* Final Checklist */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              ✅ Final Checklist Before Merging a Fix
            </h2>

            <div className="grid gap-2">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  CI (lint + tests) passes locally and on PR
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">Manual QA steps executed</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  PR description + changelog added
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  Commit message follows conventional commits (feat/fix/chore)
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  No secrets leaked in code or PR
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">
                  Tests added for regression
                </span>
              </label>
            </div>
          </section>
          {/* AI IDE Comparison */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🔍 AI IDE Comparison: Choose Your Development Partner
            </h2>

            <p className="text-gray-600 mb-6">
              Choosing the right AI-powered IDE can significantly impact your
              development workflow. Here&apos;s a comprehensive comparison of
              the top three AI IDEs to help you make an informed decision.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-900">
                      Cursor IDE
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-900">
                      Tabnine IDE
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-purple-900">
                      Kiro IDE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Pricing
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-blue-900">
                          Free + Pro
                        </div>
                        <div className="text-xs text-gray-600">
                          $20/month Pro
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-900">
                          Free + Pro
                        </div>
                        <div className="text-xs text-gray-600">
                          $12/month Pro
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-purple-900">
                          Free + Pro
                        </div>
                        <div className="text-xs text-gray-600">
                          $15/month Pro
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      AI Models
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      GPT-4, Claude, Gemini
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      Custom + GPT models
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      GPT-4, Claude, Custom
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Code Completion
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Excellent</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Excellent</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Excellent</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Chat Interface
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Built-in</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Limited</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Codebase Context
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Full repo</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">File-based</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Full repo + specs</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Refactoring
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Testing Support
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Advanced</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Project Management
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                      <span className="text-sm">None</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                      <span className="text-sm">None</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Specs & Tasks</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      Collaboration
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-sm">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-sm">Team features</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">
                  🎯 Best for: Code-focused developers
                </h3>
                <p className="text-sm text-blue-800 mb-3">
                  Cursor excels at code completion and has excellent AI chat
                  integration. Perfect for developers who want powerful AI
                  assistance without complexity.
                </p>
                <a
                  href="https://cursor.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Download Cursor IDE →
                </a>
              </div>

              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <h3 className="font-semibold text-green-900 mb-2">
                  💰 Best for: Budget-conscious teams
                </h3>
                <p className="text-sm text-green-800 mb-3">
                  Tabnine offers the most affordable pro plan with solid code
                  completion. Great for teams that need AI assistance at scale
                  without breaking the budget.
                </p>
                <a
                  href="https://www.tabnine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Download Tabnine →
                </a>
              </div>

              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                <h3 className="font-semibold text-purple-900 mb-2">
                  🚀 Best for: Full-stack project management
                </h3>
                <p className="text-sm text-purple-800 mb-3">
                  Kiro combines powerful AI coding with project management
                  features like specs and tasks. Ideal for teams building
                  complex applications from requirements to deployment.
                </p>
                <a
                  href="https://kiro.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Download Kiro IDE →
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                🤔 Which IDE Should You Choose?
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <strong>Choose Cursor</strong> if you want the most mature AI
                  coding experience with excellent chat features
                </li>
                <li>
                  <strong>Choose Tabnine</strong> if you&apos;re
                  budget-conscious and primarily need smart code completion
                </li>
                <li>
                  <strong>Choose Kiro</strong> if you want AI coding plus
                  project management, specs, and team collaboration features
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            🎯 Pro Tips for Success
          </h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>
              Start with small, focused requests to build trust with the AI
            </li>
            <li>Always provide context about what you&apos;ve already tried</li>
            <li>Ask for explanations along with code changes</li>
            <li>Use the AI for code reviews and suggestions, not just fixes</li>
            <li>Keep your prompts specific and actionable</li>
            <li>Build up a library of working prompts for your team</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
