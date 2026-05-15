# Cron Expression Builder & Explainer — Production-Grade Project Document

> A web application that lets users **visually build, explain, validate, and learn** cron expressions in real time.
> Built with **Next.js 15 + React 19 + TypeScript + Tailwind CSS 4** — optimised for SEO, performance, and SaaS scalability.

---

## 1. Product Overview

### 1.1 What it does
A single-page-feeling, multi-route web app where any user can:

| Capability | Description |
|---|---|
| **Visual Builder** | 5 input fields (Minute · Hour · Day · Month · Weekday) with dropdowns, sliders, and quick-pick chips |
| **Live Explainer** | Real-time natural-language translation (e.g. *"Every 5 minutes, between 9am–10am, Monday to Friday"*) |
| **Validator** | Detects illegal ranges, conflicting day-of-month / day-of-week, unsupported tokens |
| **Next-Run Preview** | Shows the next 5–10 fire times in the user's timezone |
| **Presets Library** | One-click common patterns (hourly, daily at 9am, every weekday, last Friday of month, etc.) |
| **Reverse Mode** | Paste an existing cron string → app explains and visualises it |
| **Copy / Share / Embed** | Copy button, shareable URL with state in query params, embeddable iframe widget |
| **Learn Mode** | Interactive tutorial covering `*`, `*/n`, `a-b`, `a,b`, `L`, `W`, `#` |
| **Format Switcher** | Standard 5-field, Quartz 6/7-field, AWS, Jenkins, Kubernetes CronJob |

### 1.2 Target users
- DevOps / SREs writing scheduled jobs
- Backend developers configuring background workers
- Students learning cron syntax
- SaaS dashboards needing a cron picker (embed market)

### 1.3 Monetisation hooks (post-MVP)
- Free tier: builder, explainer, share links
- Pro tier ($5/mo): saved expressions, team workspace, API access, embeddable widget without branding
- API: `GET /api/explain?cron=…` for B2B integrations

---

## 2. Tech Stack (Decided)

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR + SSG for SEO, file-based routing, RSC |
| UI library | **React 19** | Industry standard, concurrent features |
| Language | **TypeScript 5.x (strict)** | Type safety end-to-end |
| Styling | **Tailwind CSS 4** | Utility-first, fast iteration, JIT |
| Component primitives | **shadcn/ui + Radix UI** | Accessible, headless, copy-paste ownership |
| Icons | **Lucide React** | Tree-shakeable |
| State (client) | **Zustand** | Small, no boilerplate; better than Redux for this scope |
| State (URL) | **nuqs** | Type-safe URL query state for shareable cron links |
| Cron engine | **cronstrue** (explain) + **cron-parser** (next-run) | Battle-tested, no need to reinvent |
| Forms | **React Hook Form + Zod** | Schema-validated inputs |
| Animations | **Framer Motion** | Field-flip animation matching the screenshot aesthetic |
| Analytics | **Vercel Analytics + PostHog** | Privacy-friendly, funnel tracking |
| Error tracking | **Sentry** | Production diagnostics |
| Testing | **Vitest + React Testing Library + Playwright** | Unit + component + E2E |
| Linting | **ESLint (flat config) + Prettier + TypeScript ESLint** | Enforced via Husky |
| Git hooks | **Husky + lint-staged** | Pre-commit checks |
| CI/CD | **GitHub Actions → Vercel** | Zero-config deploys, preview URLs per PR |
| Hosting | **Vercel** (Edge + ISR) | Free tier covers MVP, scales to enterprise |
| Domain / DNS | **Cloudflare** | DDoS protection, fast DNS |

### Why **Next.js + React** over alternatives
| Metric | Why Next.js wins for *this* product |
|---|---|
| **Build speed** | Turbopack dev server, fast HMR |
| **SEO** | Server-rendered preset pages = ranks for *"cron every 5 minutes"*, *"cron weekday 9am"* searches |
| **Performance** | Static generation of preset/learn pages, RSC for explainer |
| **Maintenance** | Largest ecosystem, easiest hiring, official Vercel support |
| **Scales to SaaS** | Add auth, database, API routes without changing framework |

---

## 3. Directory Structure

```
cron-builder/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # lint + typecheck + test on every PR
│       └── e2e.yml                   # Playwright on main
├── .husky/
│   ├── pre-commit                    # lint-staged
│   └── commit-msg                    # commitlint
├── .vscode/
│   ├── settings.json                 # format on save, tailwind intellisense
│   └── extensions.json               # recommended extensions
├── public/
│   ├── favicon.svg
│   ├── og-image.png                  # 1200x630 social preview
│   ├── robots.txt
│   └── sitemap.xml                   # auto-generated at build
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # route group, shared marketing layout
│   │   │   ├── page.tsx              # / — landing + builder above fold
│   │   │   ├── learn/
│   │   │   │   ├── page.tsx          # /learn — tutorial index
│   │   │   │   └── [slug]/page.tsx   # /learn/special-characters etc.
│   │   │   ├── presets/
│   │   │   │   ├── page.tsx          # /presets — gallery
│   │   │   │   └── [slug]/page.tsx   # /presets/every-weekday-9am (SEO pages)
│   │   │   └── examples/
│   │   │       └── [expression]/page.tsx  # /examples/0-9-*-*-1-5 (long-tail SEO)
│   │   ├── (app)/                    # route group for authenticated app (Phase 2)
│   │   │   ├── dashboard/page.tsx
│   │   │   └── saved/page.tsx
│   │   ├── api/
│   │   │   ├── explain/route.ts      # GET ?cron=… → { human, nextRuns, valid }
│   │   │   ├── validate/route.ts
│   │   │   └── og/route.tsx          # dynamic OG image generation
│   │   ├── embed/
│   │   │   └── page.tsx              # /embed?cron=… — iframe-able widget
│   │   ├── layout.tsx                # root layout, fonts, providers
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── globals.css               # Tailwind + CSS vars
│   ├── components/
│   │   ├── ui/                       # shadcn primitives (Button, Input, Tooltip…)
│   │   ├── builder/
│   │   │   ├── CronBuilder.tsx       # orchestrator
│   │   │   ├── CronField.tsx         # one of the 5 boxes from the screenshot
│   │   │   ├── FieldPopover.tsx      # dropdown editor when clicking a field
│   │   │   ├── QuickPicks.tsx        # chips: "Every minute", "Hourly"...
│   │   │   └── FormatTabs.tsx        # 5-field / 6-field / 7-field switch
│   │   ├── explainer/
│   │   │   ├── HumanExplanation.tsx  # the "→ Every 5 minutes..." line
│   │   │   ├── NextRunsList.tsx
│   │   │   └── SpecialCharsLegend.tsx
│   │   ├── presets/
│   │   │   ├── PresetCard.tsx
│   │   │   └── PresetGrid.tsx
│   │   ├── learn/
│   │   │   └── InteractiveExample.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── shared/
│   │       ├── CopyButton.tsx
│   │       ├── ShareDialog.tsx
│   │       └── SEOHead.tsx
│   ├── lib/
│   │   ├── cron/
│   │   │   ├── parse.ts              # string → CronAST
│   │   │   ├── stringify.ts          # CronAST → string
│   │   │   ├── explain.ts            # CronAST → human (wraps cronstrue)
│   │   │   ├── nextRuns.ts           # wraps cron-parser
│   │   │   ├── validate.ts           # zod schema + semantic checks
│   │   │   ├── presets.ts            # named common patterns
│   │   │   └── formats/              # dialect adapters
│   │   │       ├── standard.ts
│   │   │       ├── quartz.ts
│   │   │       └── aws.ts
│   │   ├── seo.ts                    # metadata helpers
│   │   ├── analytics.ts              # posthog wrapper
│   │   └── utils.ts                  # cn(), classnames
│   ├── hooks/
│   │   ├── useCronState.ts           # zustand store
│   │   ├── useCronUrl.ts             # nuqs-based URL sync
│   │   └── useCopyToClipboard.ts
│   ├── stores/
│   │   └── cronStore.ts              # zustand
│   ├── types/
│   │   ├── cron.ts                   # CronExpression, CronField, CronFormat
│   │   └── preset.ts
│   ├── config/
│   │   ├── site.ts                   # site name, URL, social handles
│   │   └── presets.ts                # seed data for /presets pages
│   └── middleware.ts                 # rate-limit /api, redirects
├── tests/
│   ├── unit/
│   │   └── lib/cron/*.test.ts
│   ├── components/
│   │   └── builder/*.test.tsx
│   └── e2e/
│       ├── builder.spec.ts
│       └── share.spec.ts
├── .env.example
├── .env.local                        # gitignored
├── .eslintrc.cjs → eslint.config.mjs # flat config
├── .gitignore
├── .nvmrc                            # node 22
├── .prettierrc
├── commitlint.config.js
├── next.config.ts
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts                # (Tailwind 4 mostly CSS-config; keep minimal)
├── tsconfig.json
├── vitest.config.ts
└── PROJECT_STRUCTURE.md              # this file
```

---

## 4. Data Model

### 4.1 Core type
```ts
// src/types/cron.ts
export type CronFormat = 'standard' | 'quartz' | 'aws';

export interface CronExpression {
  format: CronFormat;
  fields: {
    second?: string;      // quartz only
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
    year?: string;        // quartz only
  };
  raw: string;            // "*/5 9 * * 1-5"
}

export interface ExplainResult {
  human: string;
  isValid: boolean;
  errors: string[];
  nextRuns: Date[];
  timezone: string;
}
```

### 4.2 URL state shape
```
/?m=*/5&h=9&dom=*&mon=*&dow=1-5&fmt=standard&tz=America/Los_Angeles
```
Shareable, bookmarkable, SEO-friendly when canonicalised to `/examples/[expression]`.

---

## 5. Key Pages & SEO Strategy

| Route | Render mode | Purpose | Target keywords |
|---|---|---|---|
| `/` | SSG + client island | Hero + live builder | "cron expression builder" |
| `/presets` | SSG | Gallery of named patterns | "cron examples" |
| `/presets/[slug]` | SSG (100+ pages) | Each common cron | "cron every 5 minutes", "cron weekday 9am"… |
| `/examples/[expression]` | ISR | Auto-generated per query | long-tail "cron 0 9 * * 1-5" |
| `/learn` | SSG | Tutorial hub | "how cron works" |
| `/learn/[slug]` | SSG | One concept per page | "cron special characters", "what is L in cron" |
| `/embed` | Edge | Iframe widget | (no SEO; viral distribution) |
| `/api/explain` | Edge | JSON API | (developer adoption) |

**Auto-generated sitemap** lists every preset + top 500 example URLs → ~1000 indexable pages on day one.

---

## 6. Component Contract — The 5 Field Boxes

Matches **Image 1** exactly:

```tsx
<CronBuilder>
  <FormatTabs />                                       {/* 5-field / 6-field */}
  <div className="flex gap-3">
    <CronField label="Minute"  value="*/5"  onChange={…} />
    <CronField label="Hour"    value="9"    onChange={…} />
    <CronField label="Day"     value="*"    onChange={…} />
    <CronField label="Month"   value="*"    onChange={…} />
    <CronField label="Weekday" value="1-5"  onChange={…} />
  </div>
  <HumanExplanation expression={…} />                  {/* "→ Every 5 minutes..." */}
  <SpecialCharsLegend />
  <QuickPicks />
  <NextRunsList />
  <ShareDialog /> <CopyButton />
</CronBuilder>
```

**`CronField`** behaviour:
- Displays current token in monospaced rounded box (matching screenshot)
- Click → opens `FieldPopover` with: visual selector (sliders/checkboxes), advanced raw input, examples
- Validates on blur with Zod
- Framer-Motion flip animation when value changes

---

## 7. Non-Functional Requirements (Production Bar)

### 7.1 Performance budgets
| Metric | Budget |
|---|---|
| LCP | < 1.5s on 4G |
| INP | < 200ms |
| CLS | < 0.05 |
| Total JS (gzipped, homepage) | < 90KB |
| Lighthouse (Performance / Accessibility / SEO) | ≥ 95 each |

Enforced via **`@next/bundle-analyzer`** + Lighthouse CI in GitHub Actions.

### 7.2 Accessibility (WCAG 2.2 AA)
- All interactive elements keyboard-navigable; visible focus rings
- Radix primitives → screen-reader correct
- Colour contrast ≥ 4.5:1 (dark theme verified)
- `prefers-reduced-motion` respected
- `aria-live="polite"` on the explainer so VoiceOver reads each update

### 7.3 Security
- CSP header (no inline scripts except hashed Next.js)
- Rate-limit `/api/*` at edge middleware (10 req/s per IP via Upstash)
- No PII collected on the free tier
- Dependencies scanned weekly via Dependabot + `npm audit` in CI

### 7.4 Observability
- Sentry for runtime errors (source maps uploaded on deploy)
- Vercel Analytics for Web Vitals
- PostHog funnel: visit → edit field → copy → share

### 7.5 SEO
- Per-route `<Metadata>` with title, description, OG tags
- JSON-LD `SoftwareApplication` schema on `/`
- JSON-LD `FAQPage` schema on `/learn`
- Dynamic OG images via `/api/og` showing the current cron + explanation
- `sitemap.xml` + `robots.txt` auto-generated
- Canonical URLs on `/examples/*` pages

### 7.6 Internationalisation (Phase 2)
- `next-intl` ready; explainer locale passed to `cronstrue` (it supports 20+ languages out of the box)

---

## 8. Development Workflow

### 8.1 Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint && tsc --noEmit",
  "test": "vitest",
  "test:e2e": "playwright test",
  "analyze": "ANALYZE=true next build",
  "format": "prettier --write ."
}
```

### 8.2 Branch / commit policy
- `main` → production (auto-deploy to vercel)
- `dev` → staging (preview URL)
- Feature branches: `feat/<scope>-<short-desc>`
- Conventional Commits enforced by commitlint (`feat:`, `fix:`, `chore:`…)

### 8.3 PR checklist (template)
- [ ] Tests added / updated
- [ ] Types pass `tsc --noEmit`
- [ ] Lighthouse score unchanged (run locally)
- [ ] Storybook / screenshot attached for UI changes
- [ ] No new `console.log`

---

## 9. Deployment

**Vercel** (recommended) — `vercel.json` minimal; everything via Next.js conventions.

| Environment | URL | Branch |
|---|---|---|
| Production | cronbuilder.app | `main` |
| Preview | `*-cronbuilder.vercel.app` | every PR |
| Staging | staging.cronbuilder.app | `dev` |

Environment variables (`.env.example`):
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SENTRY_AUTH_TOKEN=
SENTRY_DSN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 10. Roadmap

### Phase 1 — MVP (Week 1–2)
- [ ] Repo scaffolding, Tailwind + shadcn setup
- [ ] `lib/cron/*` engine with full test coverage
- [ ] `CronBuilder` + 5 `CronField`s matching screenshot
- [ ] Live `HumanExplanation` + `NextRunsList`
- [ ] URL state sync (`nuqs`)
- [ ] Landing page + 20 seeded presets
- [ ] Deploy to Vercel, custom domain

### Phase 2 — Growth (Week 3–4)
- [ ] `/learn` interactive tutorial (6 pages)
- [ ] Auto-generated `/examples/[expression]` ISR pages
- [ ] Dynamic OG images
- [ ] `/embed` iframe widget
- [ ] PostHog + Sentry wired up
- [ ] 100+ preset SEO pages

### Phase 3 — SaaS layer (Month 2+)
- [ ] Auth via Clerk or Auth.js
- [ ] Postgres (Neon) + Prisma for saved expressions
- [ ] Pro plan via Stripe
- [ ] Public API with API keys
- [ ] Team workspaces

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `cronstrue` doesn't cover all dialects (Quartz `L`, `W`, `#`) | Wrap with custom adapter in `lib/cron/formats/`; add unit tests per dialect |
| SEO competition from existing sites (crontab.guru) | Win on UX (animations, share links, embed), then long-tail keyword volume via `/examples/*` |
| Bundle bloat from animation libs | Lazy-load Framer Motion only on builder route |
| Rate-limit abuse on free `/api/explain` | Upstash rate-limit at edge + cache by query string |

---

## 12. Definition of Done (MVP)

A user can land on `cronbuilder.app`, see the 5 field boxes (exactly like Image 1), click any field, change it through a visual picker, watch the human-readable line update in under 100ms, see the next 5 fire times, copy the expression, and share a URL that restores the exact state — all within a single page that scores ≥ 95 on Lighthouse across the board.
