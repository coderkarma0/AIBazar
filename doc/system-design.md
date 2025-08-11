# System Design — AI Tool Marketplace (Frontend-Only)

## 1. Overview

This is a static, frontend-only web application built using Next.js 15, TailwindCSS, and shadcn/ui.
The platform lists AI tools with documentation, prompts, leaderboards, and coupon rewards.
No backend or authentication is required — all data is static JSON.

## 2. Architecture

- **Framework**: Next.js (App Router / Pages Router optional)
- **Styling**: TailwindCSS + shadcn/ui components
- **Data**: Local JSON files (`/data`)
- **State Management**: Minimal, handled via React hooks
- **Routing**:
  - `/` — Homepage
  - `/tools` — All AI tools listing
  - `/tools/[id]` — Single tool details
  - `/leaderboard` — Top-rated tools & achievements
  - `/coupons` — Discount coupons

## 3. Data Flow

- Pages import static JSON files at build time
- Components consume props passed from pages
- No API calls — completely static

## 4. Deployment

- Deployable to Vercel / Netlify as static site
