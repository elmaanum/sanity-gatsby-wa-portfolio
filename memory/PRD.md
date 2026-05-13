# Whitten Associates — Rebuild PRD

## Original problem
Erik (the user) had a 2020/2021 Sanity-Gatsby portfolio site for the architecture firm
Whitten Associates that never deployed and was never completed. Original repo:
https://github.com/elmaanum/sanity-gatsby-wa-portfolio  (branches: `production`,
`create-services-page`)

Asked Emergent to review it, decide whether to update or rebuild, and complete it.

## Decision (after code review)
**Hybrid:** keep the existing Sanity dataset (`6raq5w4t`, dataset `production`) and
its content; rebuild the Studio in v3 and the frontend in a modern stack.

## Architecture (as built)
- **`/app/frontend/`** — React 19 SPA, React Router, Tailwind, `@sanity/client` (via
  backend proxy) + `@sanity/image-url`. Pages: Home, Portfolio, About Us,
  /service/:slug, NotFound. Contact form modal with Resend.
- **`/app/backend/`** — FastAPI on port 8001. Endpoints:
  - `GET  /api/health` — service status
  - `POST /api/contact` — Resend email delivery
  - `POST /api/sanity` — GROQ proxy (avoids legacy Sanity CORS issues)
- **`/app/studio/`** — Sanity Studio v3. Schemas ported from the original v1 studio:
  `service`, `serviceSubtype`, `person`, `project`, `siteSettings`, plus objects
  `figure` and `simplePortableText`. Extended `siteSettings` with `heroImage`,
  `heroHeadline`, `aboutBlurb`, `accolades`, `clientLogos`.

## Live URLs
- Preview (frontend): https://legacy-sanity-audit.preview.emergentagent.com
- **Sanity Studio (live): https://maanum-architecture.sanity.studio/**

## Design tokens (faithful to original Figma)
Accent green `#31c17c`, primary blue `#3a506b`, shadow `#0b132b`, neutrals + white.
Font: Montserrat. Generous whitespace, photo-led layouts.

## Implementation status (2026-05-11)
- ✅ Studio v3 deployed to `maanum-architecture.sanity.studio`
- ✅ Schemas ported and reading existing 2020 content correctly (4 services, 5
  projects, 2 people verified)
- ✅ Frontend SPA built with all four pages + 404 + Contact modal
- ✅ FastAPI Sanity proxy works (`/api/sanity`) — bypasses legacy CORS
- ✅ Resend contact endpoint coded; user has added API key locally
- ✅ Service detail page (was a stub in original) now complete with hero, body,
  subtypes sidebar, and project list
- ✅ About Us placeholder copy replaced; pulls from `siteSettings.aboutBlurb` if
  filled, fallback otherwise
- ✅ All `data-testid` attributes added to interactive elements

## What's left (Erik to do)
- 🟡 **Content authoring** in the live Studio:
  - Fill `siteSettings` → `heroImage`, `heroHeadline`, `accolades`, `aboutBlurb`,
    `clientLogos` to replace remaining hardcoded fallback copy
  - Verify `email`, `phonenumber`, `address` are current
- 🟡 **Verify domain in Resend** (currently uses `onboarding@resend.dev` sender —
  dev mode only delivers to verified test addresses). Verify `whittenassociates.com`
  DNS records (SPF/DKIM) → switch sender to `hello@whittenassociates.com`
- 🟡 **Sanity CORS** — add localhost + future Vercel/custom domain to API → CORS
  origins (optional, lets us remove the proxy hop)
- 🟡 **Revoke the Sanity deploy token** shared in chat (a new one is needed for
  next deploy)
- 🔴 **Vercel deploy** — pending architecture decision (Option A: refactor
  `/api/contact` + `/api/sanity` into Next.js route handlers so Vercel hosts
  everything; Option B: deploy frontend to Vercel + backend to Railway/Render)

## Backlog / nice-to-haves
- **P1** Feature flag on `project` schema (`featured: boolean`) + surface featured
  projects on home/service pages for lead conversion
- **P1** SEO: react-helmet-async per page, generated sitemap, OG image
- **P2** Replace `react-dropdown` style filter with Radix Select for keyboard a11y
- **P2** Lazy-load portfolio images with `loading="lazy"` and blur placeholder
- **P2** Analytics (Plausible or GA4)
- **P3** Blog/news section if firm publishes thought leadership

## Repo notes
- User pushed via Emergent "Save to GitHub" to a fresh branch in the existing
  `elmaanum/sanity-gatsby-wa-portfolio` repo; old `production` and
  `create-services-page` branches preserved for reference.
- Cursor IDE not available (user's Mac too old); user is on VS Code which is
  functionally equivalent.

## Sanity project info
- projectId: `6raq5w4t`
- dataset: `production`
- studio: `maanum-architecture.sanity.studio`
- Original CORS allowlist still in place from 2020 (needs updating)
