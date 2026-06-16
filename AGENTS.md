# AGENTS.md — template-trade-manchester

> Standalone, conversion-focused landing-page template for a Manchester multi-trade firm (the "Mancunia Trades" demo). Part of the NEO-1 workspace (see root ../../../AGENTS.md).

## What it is
A lean, single-page SEOJack website template: a polished demo home page for a family-run UK trade firm with a sticky callback CTA, accreditations, stats, why-us, recent jobs, and 0% finance messaging. It is a self-contained Next.js App Router app — no Tailwind, Convex, or Clerk — built for fast organic discovery and to be embedded in an iframe on seojack.net's `/demo/[id]` viewer. It also doubles as a seed that the SEOJack builder can clone (the `SeojackCredit` footer link is stripped when used as a seed).

## Stack
- Next.js 16 (App Router), React 19, React DOM 19
- TypeScript 5.7 (strict), Node types 22
- `lucide-react` for icons
- Styling: one scoped CSS file (`app/globals.css`), every selector prefixed `.trade-manchester-demo` — no CSS framework

## Structure
- `app/layout.tsx` — SEO metadata, OpenGraph/Twitter, JSON-LD (LocalBusiness, FAQ, Breadcrumb), theme color
- `app/page.tsx` — renders `<DemoBody />`
- `app/DemoBody.tsx` — `'use client'` page body, sections, content constants
- `app/data.ts` — typed `SiteMeta` content (currently minimal/placeholder)
- `app/primitives.tsx` — shared motion primitives (Reveal, Headline, Magnetic, Marquee)
- `app/globals.css` — single scoped CSS literal for the whole demo
- `app/SeojackCredit.tsx` — footer credit / inbound link (stripped for builder seeds)
- `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg` — indexability + favicon
- `next.config.ts` — image `remotePatterns` for `cdn.seojack.website`

## Commands
Package manager: npm (only `package-lock.json` present).
- Install: `npm install`
- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint` (`next lint`)
No test script is defined.

## Conventions & notes
- No env vars required; all content is hard-coded constants in `DemoBody.tsx`/`layout.tsx`. Media is served from `https://cdn.seojack.website/templates/tpl_trade_manchester*`.
- Registry id `tpl_trade_manchester`; showcased at https://seojack.net/templates/tpl_trade_manchester.
- `BASE_URL` in `layout.tsx` is `https://template-trade-manchester.seojack.site`; README also cites a live URL `https://trade-manchester.templates.seojack.website` — domains may differ across config; verify before relying on either.
- Do NOT set `X-Frame-Options: DENY` or `frame-ancestors 'none'` — the template is embedded in an iframe on seojack.net (see comment in `next.config.ts`).
- All CSS selectors must stay prefixed `.trade-manchester-demo` to keep styles scoped when embedded.
- Content convention: realistic, no lorem ipsum — real-sounding names, copy, prices, addresses (per `app/data.ts` header).
- Note: README's "Anatomy" table mentions `app/styles.ts`, but the actual scoped-CSS file is `app/globals.css`.
- Deploy target: own GitHub repo + own Vercel project (see `docs/templates-github-org.md` referenced in README).

## Provenance
Clone of https://github.com/seojack-templates/template-trade-manchester.git. Default branch main.
