# TODOS

Deferred design findings from `/design-review` on 2026-05-15.
Full audit: `~/.gstack/projects/test-claude/designs/design-audit-20260515/`

## High impact (visible to users, blocking real launch)

- [x] **F002 — Mobile layout broken (no responsive breakpoints).** ~~Sidebar takes 60% of viewport at 375px; KPI grid overflows.~~ Fixed: sidebar hidden < md with mobile brand bar replacement, single-column grids on mobile, compact header/clock. Hamburger drawer still missing — deferred until F003 routing is wired (otherwise drawer reveals dead nav).
- [x] **F003 — Nothing is interactive except sidebar hover.** ~~Calendar pills, task checkboxes, KPI cards are all visual stubs.~~ Routing wired (Next.js (dashboard) route group), 4 pages with mock content (Calendrier month view, Tâches full list w/ filters + state, Projets cards, Rapports stat blocks + chart), sidebar nav uses Link + usePathname for active state. Vue d'ensemble's KPI cards and calendar pills are still non-clickable — future polish to navigate to relevant detail pages.
- [x] **F004 — `Sidebar.tsx` duplicated inline in `page.tsx` with drifted icons.** ~~Delete the inline copy, import `<Sidebar />`. Icons disagree between the two implementations.~~ Fixed.
- [x] **F007 — Dark mode is half-wired.** ~~`globals.css` declares dark tokens but components use `bg-white`, `text-gray-900` directly.~~ Wired up with class-based `dark:` variant + theme-init script (localStorage + prefers-color-scheme).

## High impact (accessibility)

- [x] **F020 (residual) — Remaining contrast cases:** ~~sidebar "Admin" role label `gray-500` on `gray-900` is 3.67:1; `indigo-200` on `indigo-600` is 4.22:1.~~ Admin label bumped to gray-400 (4.84:1 AA pass). The indigo-200/600 case was already fixed in F015 (changed to indigo-100 on indigo-600 ≈ 9:1).

## Medium impact (structure / cleanliness)

- [x] **F010 — No color design tokens.** ~~Indigo hardcoded 9+ times across files. Extract to `--brand-indigo`, `--accent-sky`, etc.~~ Inline hex literals extracted; Tailwind utility classes (bg-indigo-600 etc.) still hardcoded — full @theme migration is a separate refactor.
- [ ] **F011 — No global search.** Cmd+K palette or top-bar search input. Standard workspace expectation.
- [x] **F013 — Activity feed avatars use color-only meaning.** ~~Add `aria-label` for each event so the avatar color isn't the only signal.~~ Closed as false positive: the visible text adjacent to each avatar ("Marie a commenté le PR #38") fully names the actor; avatar colors don't encode status, just per-person decoration; aria-hidden on the avatar div is correct.
- [x] **F014 — `active: true` hardcoded on "Vue d'ensemble".** ~~Will be obviated by F003 (routing).~~ Done with F003: active state derived from `usePathname()` + aria-current="page".
- [x] **F016 — No empty states designed.** ~~Add zero-data fallbacks for the task list and activity feed.~~ Done for /taches per-filter empty states. Activity feed empty state still TODO (no current way to trigger it).
- [x] **F021 — Faux task checkboxes.** ~~Replace styled `<div>` with `<input type="checkbox">` for keyboard/screen-reader support.~~ Real inputs (peer sr-only) + visual span driven by peer-checked. State is local until F003 wires persistence.
- [x] **F022 — Weak brand identity.** ~~`<title>Dashboard</title>` is generic.~~ Title now "Workspace — Vue d'ensemble", description names actual content. Sidebar/H1 already use "Workspace.". Full brand naming decision still open if you want a product name beyond "Workspace".

## Polish

- [x] **F019 — Five border-radius tiers.** ~~Consolidate to 3 tiers with rationale.~~ Done. 3 tiers: `rounded-2xl` (large surface containers), `rounded-lg` (interactive/grouped — buttons, icons, calendar days), `rounded-full` (pills, avatars, checkbox circles).

---

## Fixed by polish/connect-nav + polish/shared-tasks-state, 2026-05-17

- Vue d'ensemble KPI cards + WeeklyCalendar pills are now Links to their detail pages.
- TasksProvider context shared between Vue d'ensemble and /taches; localStorage persists toggles across reloads.
- KPI "Tâches du jour" renamed to "Tâches actives" with derived count (was hardcoded).
- F016 — /taches empty states per filter with icon + reset link.

## Fixed by feat/routing-mock-pages, 2026-05-16

- F003 — Next.js (dashboard) route group, 4 mock pages (Calendrier month view, Tâches full list with filters and local state, Projets cards with progress + status pills + member avatars, Rapports 4-metric blocks + velocity bar chart). Sidebar buttons → Link with usePathname-derived active state. PageHeader component shared across routes; Clock + ThemeToggle live in shared chrome. State for Tâches checkboxes is local to that page; persistence + KPI integration with Vue d'ensemble is a TODO.
- F014 — closed alongside F003.

## Fixed by polish/radius-contrast, 2026-05-16

- F019 — Radius consolidated: `rounded-2xl` (large containers), `rounded-lg` (interactive/grouped), `rounded-full` (pills/avatars). The two rounded-xl usages flattened to rounded-lg.
- F020 (residual) — Sidebar Admin label gray-500 → gray-400 (3.67 → 4.84:1, AA pass). indigo-200/600 case was already addressed in F015.

## Fixed by polish/toggle-a11y, 2026-05-16

- ThemeToggle UI button — sun/moon icon in header, flips `.dark` class + writes localStorage. Lives next to the Clock.
- F013 — closed as false positive (visible name adjacent to avatar fully describes the event; color is decorative).
- F021 — real `<input type="checkbox">` for tasks; visual checkbox driven by peer-checked; tab/space work.
- F022 — title/description metadata replaced placeholder strings with brand-specific copy.

## Fixed by feat/dark-mode, 2026-05-16

- F007 — Class-based `dark:` variant (`@custom-variant dark (&:where(.dark, .dark *))`) + theme-init script in layout.tsx (reads localStorage + prefers-color-scheme, applies `.dark` to `<html>` before first paint). dark: variants added throughout components. Manual toggle ready (`document.documentElement.classList.toggle('dark')`); UI toggle button is a TODO follow-up.

## Fixed by feat/mobile-responsive, 2026-05-16

- F002 — Mobile breakpoints throughout: sidebar hidden < md (replaced by compact brand bar), KPI grid 1→3 cols at sm, bottom row 1→2 cols at md, calendar/header/clock all scale down. Hamburger drawer deferred until F003 routing exists.

## Fixed by refactor/sidebar-tokens, 2026-05-15

- F004 — Sidebar deduplicated (inline copy in page.tsx deleted, `<Sidebar />` imported). Removed unused `"use client"`.
- F010 (partial) — Accent palette extracted to CSS vars (`--brand-indigo`, `--accent-sky`, `--accent-emerald`, `--accent-amber`); inline hex in activity feed replaced. Dead `accent` prop removed from StatCard.

## Fixed by /design-review on main, 2026-05-15

- F001 — `body{font-family:Arial}` override → use `--font-sans` (Geist actually renders now)
- F005 — Visual hierarchy restored (H1 20→24px, clock 30→24px, seconds 24→18px)
- F006 — KPI rainbow desaturated, fake 60% bars removed
- F008 — `:focus-visible` 2px indigo ring added
- F009 — Sidebar nav touch targets bumped 40→44px
- F012 — `aria-hidden="true"` on 13 decorative Unicode glyphs and avatar initials
- F015 — Today cell calmed (dropped shadow + translate + scale + dot)
- F017 — Already correct (Clock.tsx had `tabular-nums`)
- F018 — `text-wrap: balance` on `h1-h4`
- F020 (partial) — Worst contrast cases fixed (subtitle, strikethrough, timestamps)
