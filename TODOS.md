# TODOS

Deferred design findings from `/design-review` on 2026-05-15.
Full audit: `~/.gstack/projects/test-claude/designs/design-audit-20260515/`

## High impact (visible to users, blocking real launch)

- [ ] **F002 — Mobile layout broken (no responsive breakpoints).** Sidebar takes 60% of viewport at 375px; KPI grid overflows. Needs design pass: sidebar-as-drawer? bottom nav? Hide on mobile and replace with hamburger?
- [ ] **F003 — Nothing is interactive except sidebar hover.** Calendar pills, task checkboxes, KPI cards are all visual stubs. Needs routing (Calendrier/Tâches/Projets/Rapports), state management for task completion, and click handlers across the dashboard.
- [x] **F004 — `Sidebar.tsx` duplicated inline in `page.tsx` with drifted icons.** ~~Delete the inline copy, import `<Sidebar />`. Icons disagree between the two implementations.~~ Fixed.
- [ ] **F007 — Dark mode is half-wired.** `globals.css` declares dark tokens but components use `bg-white`, `text-gray-900` directly. Either remove the dark tokens or refactor components to use theme variables.

## High impact (accessibility)

- [ ] **F020 (residual) — Remaining contrast cases:** sidebar "Admin" role label `gray-500` on `gray-900` is 3.67:1 (fails AA for normal text); `indigo-200` on `indigo-600` is 4.22:1 (fails AA normal, passes large).

## Medium impact (structure / cleanliness)

- [x] **F010 — No color design tokens.** ~~Indigo hardcoded 9+ times across files. Extract to `--brand-indigo`, `--accent-sky`, etc.~~ Inline hex literals extracted; Tailwind utility classes (bg-indigo-600 etc.) still hardcoded — full @theme migration is a separate refactor.
- [ ] **F011 — No global search.** Cmd+K palette or top-bar search input. Standard workspace expectation.
- [ ] **F013 — Activity feed avatars use color-only meaning.** Add `aria-label` for each event so the avatar color isn't the only signal.
- [ ] **F014 — `active: true` hardcoded on "Vue d'ensemble"** in both sidebar implementations. Will be obviated by F003 (routing) but worth noting.
- [ ] **F016 — No empty states designed.** Add zero-data fallbacks for the task list and activity feed.
- [ ] **F021 — Faux task checkboxes.** Replace styled `<div>` with `<input type="checkbox">` for keyboard/screen-reader support.
- [ ] **F022 — Weak brand identity.** `<title>Dashboard</title>` is generic. Decide product name; update title, description, H1.

## Polish

- [ ] **F019 — Five border-radius tiers** (`rounded-2xl`, `rounded-xl`, `rounded-lg`, `rounded-full`, plus implicit). Consolidate to 3 tiers with rationale (cards / pills / circles).

---

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
