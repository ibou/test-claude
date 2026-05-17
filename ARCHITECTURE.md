# Architecture

Design decisions and rationale behind the workspace dashboard. Reference for changes that touch the shape of the app.

## Routing

Uses Next.js App Router with a single route group, `src/app/(dashboard)/`, that owns the shared chrome (sidebar + mobile brand bar) via `layout.tsx`. The group is invisible in URLs — `(dashboard)/calendrier/page.tsx` resolves to `/calendrier`.

The root `src/app/layout.tsx` is intentionally minimal: it sets up `<html>` with the Geist font variables, runs the dark-mode init script (see [Theming](#theming)), and renders the body. All UI lives inside the dashboard route group.

**Why a route group rather than a regular layout?** Future routes outside the dashboard (e.g., `/login`, `/onboarding`, marketing pages) shouldn't carry the sidebar. The group makes that opt-in.

**Navigation state** — `Sidebar.tsx` reads the active route via `usePathname()` and applies `aria-current="page"`. There is no manually-tracked active flag; the URL is the source of truth.

## State

Task data lives in `src/lib/tasks-context.tsx` — a small React Context provider that:

1. Seeds with 10 mock tasks.
2. Hydrates from `localStorage["workspace.tasks.v1"]` on mount.
3. Persists every change back to localStorage (gated by a `hydrated` flag so the initial render doesn't overwrite stored state).
4. Exposes `tasks`, `toggle(id)`, `openCount`, `doneCount`.

The provider wraps the dashboard layout's children, so context survives client-side navigation between pages — Vue d'ensemble and `/taches` both consume it and stay in sync.

**Why Context rather than Zustand/Redux/etc.?** State is small (one array of 10 items), updates are infrequent (manual toggles), and there are exactly two consumers. Context is in the standard library, has zero dependencies, and is sufficient. If the model grows (multiple stores, complex selectors, transactions) the migration target is Zustand.

**Why not a hook with localStorage directly per component?** Cross-tab sync would need a `storage` event listener in every consumer, and the data would diverge between tabs until that fired. Context centralizes the writes.

**What about Vue d'ensemble's "Réunions" and "Objectifs" KPIs?** They are hardcoded — no data source exists. When real data lands, these KPI cards become consumers of their respective stores (a future `MeetingsContext`, an analytics fetch, etc.).

## Theming

Tailwind v4 with `@theme inline` declares a CSS-variable-driven palette:

- `--background`, `--foreground` (base, light + dark via `@media`)
- `--brand-indigo`, `--accent-sky`, `--accent-emerald`, `--accent-amber` (extracted from inline hex literals during F010)
- `--font-sans`, `--font-mono` (Geist, via `next/font` variables)

**Dark mode strategy** — `@custom-variant dark (&:where(.dark, .dark *))` overrides Tailwind's default media-query-based dark variant with a class-based one. Two reasons:

1. **Manual override** — a user toggle is impossible with media-only. The `ThemeToggle` component writes `localStorage.theme = "dark" | "light"` and adds/removes `.dark` on `<html>`.
2. **No FOUC** — `src/app/layout.tsx` renders a `next/script` with `strategy="beforeInteractive"` that reads `localStorage.theme` and `prefers-color-scheme`, then applies `.dark` synchronously before the first paint. The pre-existing `suppressHydrationWarning` on `<html>` absorbs the class diff between server and client.

System preference is still respected — if `localStorage.theme` is unset, the script falls back to `prefers-color-scheme: dark`.

## Components

The components fall into three layers:

**Chrome** — `Sidebar.tsx`, `PageHeader.tsx`. These live around every dashboard page.

**Display** — `Clock.tsx`, `StatCard.tsx`, `WeeklyCalendar.tsx`, `MonthCalendar.tsx`. Self-contained widgets that take props and render. `StatCard` accepts an optional `href` to become a Link, used on Vue d'ensemble's KPI cards to jump to detail pages.

**Interactive primitives** — `ThemeToggle.tsx`. Tiny client component with its own state.

There is no page-content component layer because each route's content is small enough to inline. If `/projets` and `/rapports` grow, a `ProjectCard` and `MetricCard` extraction is the obvious next step.

## Accessibility

The audit on 2026-05-15 found contrast failures, missing focus indicators, under-sized touch targets, decorative glyphs read aloud, and faux checkboxes. Current state:

- All body text and labels pass WCAG AA contrast in both themes
- `:focus-visible` ring (2px indigo with 2px offset) on every interactive element
- Sidebar touch targets at 44px (was 40px)
- Unicode icons (`▣ ◷ ☐ ◈ ◉`, brand dots, stat icons) marked `aria-hidden="true"` — their adjacent text labels carry the meaning
- Task list uses real `<input type="checkbox">` (hidden via `peer sr-only`) — Tab + Space work, screen readers announce "checkbox, checked, [label]"
- Calendar pills use `aria-label="${day} ${date} — ouvrir le calendrier"` since the visible label is just the abbreviation
- `aria-current="page"` on the active sidebar nav link

The Tâches checkboxes on `/taches` update the shared store immediately; on Vue d'ensemble they do too — the KPI subtitle reflects the change in the same tick.

## Mock data

Everything is mock. The Tâches list is the only mock store with persistence; everything else is rendered from inline arrays:

- `Vue d'ensemble`: STATS for Réunions and Objectifs, ACTIVITY for the activity feed
- `Calendrier`: events anchored relative to "today" inside `getMockEvents()` so the page is always populated
- `Projets`: PROJECTS array with name, status, progress, members
- `Rapports`: METRICS array + TREND array for the bar chart

This is intentional — `test-claude` is a design surface, not a product. When real data sources land, each inline array becomes a fetch/store consumer.

## Build + dev

`next dev` uses Turbopack. We hit a recurring HMR quirk during the redesign: edits to `globals.css` occasionally don't propagate to the served CSS chunk on the first save — the symptom is "I changed a CSS variable but the page doesn't reflect it." Workaround is to touch the file a second time (or any sibling file) to force a rebuild. This is logged as a gstack operational learning and we found it more reliable than fighting the cache.

## Things deliberately deferred

See `TODOS.md` for the full list. Highlights:

- **Cmd+K global search** — meaningful once there's real data to index.
- **Hamburger drawer for mobile sidebar** — not added because the 5 routes are all reachable from `/` via clickable cards, calendar, and activity feed links. A drawer with the same 5 entries would be redundant. If the nav grows past what the brand bar can announce, add the drawer.
- **Backend / auth / multi-user** — out of scope for `test-claude`.
