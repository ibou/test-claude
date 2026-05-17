# Workspace Dashboard

A workspace dashboard demo built on Next.js 16. Five navigable pages, dark mode with system + manual toggle, mobile-responsive, accessibility AA, and a shared task store persisted to localStorage.

This is a **mockup demo** — all data is local and seeded. There is no backend, no auth, and no real persistence beyond `localStorage`.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS v4 with `@theme inline` + custom `dark` variant
- Geist font via `next/font`

## Getting started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

```bash
npm run build      # Production build
npm run start      # Run the built app
npm run lint       # ESLint
```

## Routes

| Path | Description |
|---|---|
| `/` | Vue d'ensemble — KPI cards, weekly calendar, task preview, activity feed |
| `/calendrier` | Month view with mock events; today highlighted |
| `/taches` | Full task list with Toutes/Ouvertes/Terminées filters + empty states |
| `/projets` | 6 project cards: status pill, accent progress bar, member avatars |
| `/rapports` | 4 metric blocks with delta indicators + 12-week velocity bar chart |

## Features

- **Dark mode** — class-based `dark:` variant; an inline `next/script beforeInteractive` reads `localStorage.theme` + `prefers-color-scheme` and applies `.dark` before first paint (no FOUC). A toggle button in the header flips between modes and persists the choice.
- **Mobile responsive** — sidebar hidden below `md`, replaced by a compact brand bar. Grids collapse from 3 → 1 col, header stacks vertically, calendar/clock scale down. Hamburger drawer to reach nav on mobile is deliberately not implemented (the nav has 5 destinations that all work — a drawer is meaningful when one exists).
- **Shared task state** — `TasksProvider` lives in the dashboard layout; Vue d'ensemble and `/taches` consume the same store via `useTasks()`. Toggles persist to `localStorage` under `workspace.tasks.v1` and survive route navigation + page reload.
- **Accessibility** — semantic landmarks, `aria-current` on the active nav link, `aria-hidden` on decorative Unicode icons and avatar initials, real `<input type="checkbox">` for tasks (keyboard-tabbable, Space toggles), 44px touch targets on nav, visible `:focus-visible` ring, WCAG AA contrast across both themes.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout: <html>, fonts, theme init script
│   ├── globals.css                 # Tailwind import, CSS vars, dark variant
│   └── (dashboard)/                # Route group with shared chrome
│       ├── layout.tsx              # Sidebar + mobile brand bar + TasksProvider
│       ├── page.tsx                # Vue d'ensemble
│       ├── calendrier/page.tsx
│       ├── taches/page.tsx
│       ├── projets/page.tsx
│       └── rapports/page.tsx
├── components/
│   ├── Sidebar.tsx                 # Nav links, usePathname-derived active state
│   ├── PageHeader.tsx              # Sticky title + Clock + ThemeToggle
│   ├── Clock.tsx                   # Live time + date, tabular-nums
│   ├── ThemeToggle.tsx             # Sun/moon toggle, localStorage persist
│   ├── StatCard.tsx                # KPI card, optional href makes it a Link
│   ├── WeeklyCalendar.tsx          # 7-day strip, today highlighted
│   └── MonthCalendar.tsx           # Calendrier page month grid
└── lib/
    └── tasks-context.tsx           # TasksProvider + useTasks hook + storage
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions, theming approach, and state model rationale.

## License

Demo project, no license.
