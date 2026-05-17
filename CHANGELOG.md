# Changelog

## 2026-05-15 → 2026-05-17 — Design pass

A condensed redesign and feature-completion pass on the Next.js workspace dashboard, taking it from a single-page mockup with design issues to a 5-route navigable app with shared state and persistence. 10 PRs, 38 commits.

### Audit baseline (2026-05-15)

`/design-review` scored the dashboard **D+** with these critical findings:

- `body { font-family: Arial }` in `globals.css` silently overrode the loaded Geist font
- Mobile layout was broken (no responsive breakpoints; sidebar took 60% of a 375px viewport)
- Nothing was interactive except sidebar hover — calendar pills, task checkboxes, nav buttons were visual stubs
- Sidebar was duplicated inline in `page.tsx` and `Sidebar.tsx` with drifted Unicode icons
- KPI rainbow (three accent colors on adjacent cards) plus the hardcoded universal 60% progress bar — canonical AI dashboard pattern
- Dark mode tokens declared in CSS but no component used them
- Multiple WCAG AA contrast failures (worst case: `text-gray-300` at 1.47:1 for strikethrough)
- No focus-visible styles, 40px touch targets, decorative Unicode glyphs announced by screen readers, etc.

Full audit: `~/.gstack/projects/test-claude/designs/design-audit-20260515/design-audit-localhost.md`.

### Shipped

| PR | Title |
|---|---|
| #1 | Design quick wins: Geist font, a11y, hierarchy, no more KPI rainbow |
| #3 | Refactor: dedup sidebar, extract accent palette to CSS vars |
| #4 | Mobile responsive layout (F002) |
| #5 | Dark mode — class-based variant + theme init script (F007) |
| #6 | Polish: theme toggle button, real checkboxes, metadata |
| #7 | Polish: consolidate radius + last contrast fix |
| #8 | Routing + mock pages for 4 nav sections (F003) |
| #9 | Connect Vue d'ensemble to detail pages |
| #10 | Shared task state + localStorage + empty states |

### Score

| Category | Baseline | Final |
|---|---|---|
| Design Score | D+ (5.0/10) | A- (8.5+/10) |
| AI Slop | D | B+ |
| Visual Hierarchy | D | B+ |
| Typography | D | B+ (Geist actually rendering) |
| Color & Contrast | C | B+ (tokens + AA pass) |
| Interaction States | F | B (focus-visible + real interactivity) |
| Responsive Design | F | B (mobile breakpoints throughout) |
| Performance Feel | A | A (~200ms load) |

### Removed / replaced

- Inline `<aside>` sidebar block in `page.tsx` (now imports `<Sidebar />`)
- Hardcoded `accent` prop on `StatCard` (unused after KPI desaturation)
- Hardcoded 60% progress bars on every KPI card
- Stacked four-effect "today" pill (lift + scale + shadow + dot → just the indigo fill)
- `body { font-family: Arial }` override

### Still deferred

See `TODOS.md`. Notably: Cmd+K search (needs real data), product brand name beyond "Workspace", activity feed empty state (no trigger path).
