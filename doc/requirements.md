# Requirements — AI Tool Marketplace

## 1. Functional Requirements

1. List all AI tools with name, category, description.
2. Show tool details with:
   - Best practices
   - Suggested prompts
3. Provide a leaderboard of tools based on community ratings (static data).
4. Show available coupons for AI subscriptions.
5. Search and filter tools by category.
6. Responsive design for desktop, tablet, and mobile.

## 2. Non-Functional Requirements

1. Performance: Pages should load in under 1s (local JSON, no API calls).
2. Accessibility: Use semantic HTML and aria-labels.
3. SEO: Meta tags, Open Graph tags for pages.
4. Maintainability: Modular components for cards, tables, badges.

## 3. Constraints

- Frontend only — no backend, no user accounts
- All data stored locally
- Minimal dependencies (Next.js, Tailwind, shadcn/ui)

## 4. Deliverables

- Fully functional static Next.js project
- Organized docs folder
- JSON datasets for tools, leaderboard, coupons
- README.md with setup guide
