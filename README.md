# Cron Expression Builder & Explainer

A visual cron expression builder with live human-readable explanations and next-run previews.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **5-field visual builder** — click any field to edit with Any / Every / Specific / Range / Custom modes
- **Live explainer** — instant natural-language translation ("Every 5 minutes, between 9am–10am, Monday to Friday")
- **Next 5 runs** — upcoming fire times shown in your local timezone
- **Shareable URLs** — current state lives in query params (`?m=*/5&h=9&dow=1-5`)
- **20 presets** — common patterns one click away
- **Copy button** — expression to clipboard in one tap
- **Quick picks** — chips for the most-used patterns

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 3** for styling
- **Zustand** for client state
- **nuqs** for type-safe URL state
- **Radix UI** primitives (Popover, Tooltip)
- **Framer Motion** for animations
- **cronstrue** — cron → human-readable text
- **cron-parser** — next-run calculation
- **lucide-react** — icons

## Project layout

```
src/
├── app/                   Next.js routes (/, /presets)
├── components/
│   ├── builder/           CronBuilder, CronField, FieldEditor, QuickPicks
│   ├── explainer/         HumanExplanation, NextRunsList, SpecialCharsLegend
│   ├── presets/           PresetGrid
│   ├── layout/            Header, Footer
│   └── shared/            CopyButton
├── lib/cron/              parse, stringify, explain, nextRuns, validate, presets, fieldMeta
├── stores/                cronStore (Zustand)
├── hooks/                 useCronUrlSync
└── types/                 cron.ts
```

## How it works

1. Click a field → Radix popover opens with a mode picker
2. Pick a mode (Any/Every/Specific/Range/Custom), adjust the value
3. The Zustand store updates → three things happen in parallel:
   - The field box flips to the new value (Framer Motion)
   - `cronstrue` regenerates the human-readable line
   - `cron-parser` recomputes the next 5 fire times
4. `nuqs` mirrors the state into the URL — share or bookmark anytime

## Cron syntax cheatsheet

```
*    *    *    *    *
│    │    │    │    │
│    │    │    │    └─ day of week (0–6, Sun–Sat)
│    │    │    └────── month       (1–12)
│    │    └─────────── day of month (1–31)
│    └──────────────── hour         (0–23)
└───────────────────── minute       (0–59)
```

| Symbol | Meaning |
|---|---|
| `*` | every value |
| `*/n` | every n units |
| `a-b` | range from a to b |
| `a,b` | list of values |
| `L` | last (e.g. last day of month) |
| `W` | nearest weekday |

## Roadmap

- [x] **Phase 1 — MVP**: builder, explainer, presets, URL sync
- [ ] **Phase 2 — Growth**: learn pages, `/examples/[expr]` SEO pages, dynamic OG, embed widget
- [ ] **Phase 3 — SaaS**: auth, saved expressions, public API, Stripe billing

## License

MIT
