# Whitten Associates Website

Marketing site and project portfolio for Whitten Associates, an architectural planning firm. This is the 2026 rebuild of the original 2020/2021 Sanity+Gatsby site.

> **Live URLs**
> - **Public site (preview):** _set by your deploy host (Vercel/Railway/etc.)_
> - **Sanity Studio (content editor):** https://maanum-architecture.sanity.studio/
> - **Sanity project:** `6raq5w4t`, dataset `production`

---

## Table of contents

1. [Architecture overview](#architecture-overview)
2. [How Sanity works (Studio ↔ Site)](#how-sanity-works-studio--site)
3. [Project structure](#project-structure)
4. [Local development](#local-development)
5. [Environment variables](#environment-variables)
6. [Sanity Studio: develop & deploy](#sanity-studio-develop--deploy)
7. [Backend (FastAPI): develop & deploy](#backend-fastapi-develop--deploy)
8. [Frontend (React): develop & deploy](#frontend-react-develop--deploy)
9. [Deploying to Vercel](#deploying-to-vercel)
10. [Schema changes — the safe workflow](#schema-changes--the-safe-workflow)
11. [Common tasks](#common-tasks)
12. [Troubleshooting](#troubleshooting)

---

## Architecture overview

Three independent pieces:

```
┌────────────────────────┐   GROQ over HTTPS    ┌────────────────────────┐
│  Sanity Studio (v3)    │ ───────────────────► │  Sanity Content Lake   │
│  hosted at             │                      │  project 6raq5w4t      │
│  *.sanity.studio       │ ◄─── content edits ──│  dataset 'production'  │
└────────────────────────┘                      └────────────────────────┘
                                                          ▲
                                                          │ GROQ
                                                          │
┌────────────────────────┐                      ┌────────────────────────┐
│  React SPA (frontend)  │ ──── POST /api/* ──► │  FastAPI (backend)     │
│  hosted on Vercel /    │                      │  proxies Sanity reads, │
│  Netlify / etc.        │ ◄─── JSON results ───│  sends Resend emails   │
└────────────────────────┘                      └────────────────────────┘
```

- **Sanity** is the content database (no MongoDB, no Postgres — Sanity is the backend store for all editable content).
- **Studio** is a React app — used only by editors to manage content. Lives at `maanum-architecture.sanity.studio`.
- **The website (frontend)** is a separate React SPA that reads published content via Sanity's GROQ query API.
- **The FastAPI backend** does two narrow jobs:
  1. **`POST /api/contact`** — sends contact-form submissions through Resend.
  2. **`POST /api/sanity`** — server-side proxy for GROQ queries (bypasses the legacy Sanity CORS allowlist from 2020).

If you add your current domains to Sanity's CORS allowlist (sanity.io/manage → API → CORS origins), the frontend can call Sanity directly and the `/api/sanity` proxy becomes optional. Until then, every page on the site fetches its data through the FastAPI backend.

---

## How Sanity works (Studio ↔ Site)

Mental model in one paragraph:

> Sanity hosts your content in a "dataset" (think of it as a JSON document database). The **Studio** is just an editing UI that reads and writes those documents. The **website** is a totally separate React app that reads the same documents via a query API (GROQ). Editors don't touch the website code; developers don't touch the content. They evolve independently.

Key concepts:

- **Project**: `6raq5w4t` — owns everything.
- **Dataset**: `production` — the actual content (services, projects, people, site settings). One dataset shared across all environments in this setup.
- **Schemas**: TypeScript/JS files in `studio/schemas/` that define what fields each document type has. The Studio uses these to build editing forms. Schemas live in the **studio repo only**, not on Sanity's servers — every time you change a schema, you must redeploy the Studio for editors to see the change.
- **GROQ**: Sanity's query language. Looks like `*[_type=="project" && featured==true]{title, images}`. Fired from the frontend (or our backend proxy) to read content.
- **Image CDN**: Images uploaded in the Studio get a CDN URL. We use `@sanity/image-url` in the frontend to build resized variants on the fly — no upload pipeline, no S3, no image processing on our side.

**Where edits go live:**

1. Editor opens the Studio, edits a field, clicks **Publish**.
2. Sanity's content lake updates instantly.
3. The next time the frontend fetches that query, it sees the new data (cached at the CDN edge for ~minute).
4. No rebuild required (this is an SPA, not SSG). Edits are live immediately.

---

## Project structure

```
/
├── frontend/              # React 19 SPA — the public website
│   ├── src/
│   │   ├── App.js         # Router setup
│   │   ├── lib/sanity.js  # Sanity client (proxies through backend)
│   │   ├── components/    # Header, Footer, ContactModal, ProjectViewer, ...
│   │   └── pages/         # Home, Portfolio, AboutUs, ServiceDetail, NotFound
│   ├── package.json
│   └── .env               # REACT_APP_BACKEND_URL, REACT_APP_SANITY_*
│
├── backend/               # FastAPI — contact form + Sanity proxy
│   ├── server.py          # /api/contact, /api/sanity, /api/health
│   ├── requirements.txt
│   └── .env               # RESEND_API_KEY, MONGO_URL, etc.  (NEVER COMMITTED)
│
├── studio/                # Sanity Studio v3 — content editing UI
│   ├── sanity.config.js   # Studio config (plugins, schemas, project ID)
│   ├── sanity.cli.js      # CLI config — pins deploy hostname
│   ├── schemas/           # Document schemas (project, service, person, ...)
│   └── package.json
│
├── memory/PRD.md          # Living product spec (state of the rebuild)
└── README.md              # This file
```

> The old `web/` and `lerna.json` from the 2020/2021 codebase are **not** in this repo branch. The original code is preserved on the `production` and `create-services-page` branches in the same GitHub repo if you ever need to reference it.

---

## Local development

You need **three terminals** running in parallel (or skip the Studio terminal if you're not editing content):

```bash
# Terminal 1 — backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Terminal 2 — frontend
cd frontend
yarn install
yarn start                       # http://localhost:3000

# Terminal 3 — sanity studio (optional)
cd studio
yarn install
npx sanity login                 # one-time browser auth
yarn dev                         # http://localhost:3333
```

> For local dev, set `frontend/.env`:
> ```
> REACT_APP_BACKEND_URL=http://localhost:8001
> ```

**Required tooling**

| Tool | Version | Notes |
|---|---|---|
| Node.js | 18.x or 20.x | Sanity v3 requires ≥18; v4 (Jul 2026) will require ≥20 |
| Yarn | 1.22.x | Used by frontend & studio |
| Python | 3.11+ | Backend |
| Git | any recent | — |

---

## Environment variables

### `frontend/.env`

```bash
REACT_APP_BACKEND_URL=http://localhost:8001          # local dev
# REACT_APP_BACKEND_URL=https://api.whittenassociates.com  # production

REACT_APP_SANITY_PROJECT_ID=6raq5w4t
REACT_APP_SANITY_DATASET=production
```

### `backend/.env` — **never commit**

```bash
# Sanity (used by /api/sanity proxy)
SANITY_PROJECT_ID=6raq5w4t
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=                                    # leave empty if dataset is public-readable

# Resend (used by /api/contact)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=onboarding@resend.dev                    # change to hello@whittenassociates.com after domain verify
RECIPIENT_EMAIL=info@whittenassociates.com

# Required by FastAPI scaffold (unused in production paths)
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

> **Secret hygiene:** `.gitignore` includes `**/.env`. If you ever accidentally commit a key, **revoke it immediately** at the provider (Resend, Sanity, etc.). Rotating keys is faster than rewriting git history.

### Sanity Studio

No `.env` needed — `studio/sanity.config.js` hardcodes `projectId` and `dataset` (these are public IDs, not secrets).

---

## Sanity Studio: develop & deploy

### Make a schema change

1. Edit a file in `studio/schemas/` (e.g. add a field to `project.js`).
2. Run `yarn dev` locally → see your change at `localhost:3333`.
3. When happy, deploy: `npx sanity deploy`.
4. Editors will see the change at `maanum-architecture.sanity.studio` within seconds.

The hostname is pinned in `sanity.cli.js`:
```js
export default defineCliConfig({
  api: { projectId: '6raq5w4t', dataset: 'production' },
  studioHost: 'maanum-architecture',
})
```

So deploys never prompt for a hostname.

### Authentication for deploys

```bash
npx sanity login                  # opens a browser, persists to ~/.config/sanity/
```

For CI/CD or scripted deploys, set `SANITY_AUTH_TOKEN` in the environment instead. Generate scoped tokens at [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens:

| Permission | Use for |
|---|---|
| **Viewer** | Read-only GROQ queries (use as `SANITY_READ_TOKEN` if the dataset is locked down) |
| **Deploy Studio** | Only allows `sanity deploy` — safest for CI |
| **Editor / Administrator** | Avoid in code — only for humans logging into the Studio |

### Embedded vs hosted Studio

We use the **hosted** option (`*.sanity.studio`) because it's free, requires no infra, and updates independently of the website. The other option (embed the Studio inside the frontend at `/admin`) is doable but couples editing and deploys — not worth it for this scale.

---

## Backend (FastAPI): develop & deploy

### Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/health` | Liveness check; reports whether Resend is configured |
| `POST` | `/api/contact` | Validates form, sends email via Resend, returns `{status, delivered, id}` |
| `POST` | `/api/sanity` | GROQ proxy: body `{query, params}` → returns `{result}` |

### Adding a new endpoint

```python
# backend/server.py
@api_router.post("/your-endpoint")
async def your_handler(body: YourPydanticModel):
    ...
    return {"ok": True}
```

The router is mounted at `/api`. Any prefix outside `/api` won't route correctly in deployment environments (because production gateways are configured to send `/api/*` to the backend).

### Deploy targets

- **Railway** (recommended for solo dev): connect GitHub repo → it auto-detects FastAPI → deploys on every push. Free tier sufficient for this traffic.
- **Render**: same idea, free tier sleeps after 15 min of inactivity (cold starts).
- **Fly.io**: more control, requires a Dockerfile.
- **Vercel**: can host Python via serverless functions, but the simpler path is to **convert the two endpoints to Next.js route handlers** (see "Deploying to Vercel" below).

For Railway/Render, set the start command to:
```
uvicorn server:app --host 0.0.0.0 --port $PORT
```

---

## Frontend (React): develop & deploy

Stack:
- React 19 with React Router 7 (SPA, no SSR)
- Tailwind CSS for styling, with a Montserrat / brand-color design system in `src/index.css`
- `@sanity/client` + `@sanity/image-url` for content
- `sonner` for toasts, `lucide-react` for icons
- `craco` wrapping `react-scripts` (no eject)

```bash
cd frontend
yarn install
yarn start                        # dev server with HMR on :3000
yarn build                        # production bundle → frontend/build/
```

### Deploy

The frontend is a static SPA. Drop the contents of `frontend/build/` on any static host:

- **Vercel** (recommended — see next section)
- **Netlify** (also fine, just connect the repo)
- **Cloudflare Pages**
- **GitHub Pages** (works but no preview deploys)

You **must** configure the host to rewrite all paths to `index.html` (for client-side routing on `/portfolio`, `/service/:slug`, etc.). On Vercel this is automatic for SPAs; on Netlify add `_redirects` with `/* /index.html 200`.

---

## Deploying to Vercel

This repo is pre-configured for **single-deploy on Vercel** — the React frontend and the API endpoints (contact form + Sanity proxy) all ship as one Vercel project.

### What's in place

```
frontend/
├── api/                # Vercel Python serverless functions
│   ├── contact.py      # POST /api/contact  → Resend email
│   ├── sanity.py       # POST /api/sanity   → GROQ proxy
│   └── health.py       # GET  /api/health
├── requirements.txt    # Python deps for the functions (resend)
├── vercel.json         # build + SPA rewrite config
└── src/                # React app
```

The frontend uses **relative URLs** (`/api/contact`, `/api/sanity`) so the same code works locally, in Emergent preview, and on Vercel without env-var changes.

### One-time setup

1. Go to [vercel.com](https://vercel.com) → **Sign up** with GitHub.
2. **Add New… → Project** → import the `sanity-gatsby-wa-portfolio` repo → pick your rebuild branch.
3. **Root Directory:** `frontend` ← *important — Vercel must know to deploy the `frontend/` subfolder, not the repo root*
4. **Framework Preset:** Create React App (auto-detected)
5. **Build Command:** `yarn build` (auto)
6. **Output Directory:** `build` (auto)
7. **Environment Variables** — add these (Settings → Environment Variables):

   | Name | Value | Scope |
   |---|---|---|
   | `RESEND_API_KEY` | `re_...` (your real key) | Production, Preview |
   | `SENDER_EMAIL` | `onboarding@resend.dev` (or your verified domain) | All |
   | `RECIPIENT_EMAIL` | `info@whittenassociates.com` | All |
   | `SANITY_PROJECT_ID` | `6raq5w4t` | All |
   | `SANITY_DATASET` | `production` | All |
   | `SANITY_API_VERSION` | `2024-01-01` | All |
   | `REACT_APP_SANITY_PROJECT_ID` | `6raq5w4t` | All |
   | `REACT_APP_SANITY_DATASET` | `production` | All |

   *Leave `REACT_APP_BACKEND_URL` unset — empty means "use relative URLs," which is what Vercel needs.*

8. Click **Deploy**. First build takes ~2 min.

### Verify the deploy

After it's live (e.g. `https://your-project.vercel.app`):

```bash
# Health check (should show resend_configured: true if env vars are set)
curl https://your-project.vercel.app/api/health

# Sanity proxy test
curl -X POST https://your-project.vercel.app/api/sanity \
  -H "Content-Type: application/json" \
  -d '{"query":"*[_type==\"service\"]{title}"}'

# Submit a contact form test (real email will be sent if RESEND_API_KEY is set)
curl -X POST https://your-project.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"info@whittenassociates.com","company":"WA","message":"Vercel test"}'
```

### Custom domain

Once deploy is verified, attach `whittenassociates.com`:

1. Vercel → Project → **Settings** → **Domains** → Add → type `whittenassociates.com`
2. Vercel will show you DNS records to add. Two options at your DNS provider:
   - **Apex domain (`whittenassociates.com`):** add an A record pointing to `76.76.21.21`
   - **WWW (`www.whittenassociates.com`):** add a CNAME pointing to `cname.vercel-dns.com`
   - Add both — Vercel auto-redirects one to the other
3. SSL is automatic and free. ~10 min for DNS to propagate.

### After the domain is live

Add it to Sanity's CORS allowlist so future direct browser calls don't get blocked (and so we could remove the proxy if desired):

- [sanity.io/manage](https://www.sanity.io/manage) → project `6raq5w4t` → **API** → **CORS origins** → Add:
  - `https://whittenassociates.com`
  - `https://www.whittenassociates.com`
  - `https://*.vercel.app` (covers Vercel preview deploys)

### Deploys going forward

Every `git push` to the main branch auto-deploys to production.
Every PR gets its own **preview URL** for review. This is one of the best Vercel features — never break production with an untested change.

### About the FastAPI backend

The original FastAPI in `backend/` is **no longer required for Vercel deploy** — the Vercel Functions in `frontend/api/` are functionally identical. The FastAPI backend stays in the repo for:

- Local development (some prefer `uvicorn` over `vercel dev`)
- Emergent preview environment (which uses FastAPI for `/api/*`)
- Anyone wanting to deploy backend separately to Railway/Render (Path B)

You can safely ignore or even delete the `backend/` folder once you're committed to Vercel.

---

## Schema changes — the safe workflow

Sanity stores documents loosely typed — your schemas are just the **editing UI's** view of them. So adding fields is safe; renaming or removing fields requires care because old documents may still hold the old field name.

| Change | Safe? | Action needed |
|---|---|---|
| Add a new optional field | ✅ Always safe | Edit schema → deploy Studio |
| Add a required field | ⚠️ Existing docs become "invalid" in Studio (still readable) | Add it as optional first, backfill, then require |
| Rename a field | ❌ Breaks reads | Create new field, write a migration script (`@sanity/migrate`), then remove old field after Studio deploy |
| Remove a field | ⚠️ Data stays in dataset orphaned | Decide if you want to delete the data with a migration too |
| Change a field type | ❌ Breaks reads | Same as rename — go through a new field + migration |

For non-trivial migrations, see [sanity.io/docs/migrating-data](https://www.sanity.io/docs/migrating-data).

---

## Common tasks

### Add a featured project

In the Studio, open any project → toggle **"Featured on home page"** → set "Featured order" (1, 2, 3...) → Publish. It appears immediately on the home page.

### Change the home page hero image / headline

Studio → **Site Settings** → update `Home Hero Image` and `Home Hero Headline` → Publish.

### Update contact email recipient

Edit `backend/.env`:
```
RECIPIENT_EMAIL=newaddress@whittenassociates.com
```
Restart the backend.

### Verify a custom email domain in Resend

1. Resend dashboard → Domains → Add `whittenassociates.com`.
2. Add the SPF/DKIM/DMARC records they show you to your DNS provider.
3. Wait for verification (usually <10 min).
4. Update `backend/.env`:
   ```
   SENDER_EMAIL=hello@whittenassociates.com
   ```
5. Restart backend. The contact form now sends from your domain (better deliverability, looks professional).

### Add a new page

1. Create `frontend/src/pages/YourPage.js`.
2. Register the route in `frontend/src/App.js`.
3. Add a link in `frontend/src/components/Header.js` or `Footer.js`.

### Add a new document type to the Studio

1. Create `studio/schemas/yourType.js`.
2. Register it in `studio/schemas/index.js`.
3. `yarn dev` locally to test, then `npx sanity deploy`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Site loads but shows no services/projects | Backend down OR `REACT_APP_BACKEND_URL` wrong | Check `/api/health` returns `{status:"ok"}`; verify env var |
| Contact form shows success but no email arrives | `RESEND_API_KEY` empty (soft-success mode) OR Resend in dev mode | Check `/api/health` — `resend_configured` must be `true`; verify recipient in Resend |
| Studio deploy fails with "hostname already in use" | Someone else has that name | Pick a different value for `studioHost` in `sanity.cli.js` |
| Studio build fails with "JavaScript heap out of memory" | Default Node heap too small | Run `NODE_OPTIONS="--max-old-space-size=4096" npx sanity deploy` |
| Images load slowly / pixelated | Not using `urlFor()` width/height | Always pass dimensions to `urlFor(asset).width(N).height(N).url()` |
| Frontend CORS errors when calling Sanity directly | Origin not in Sanity's CORS allowlist | sanity.io/manage → API → CORS origins → add your domain |
| "Cannot read property of undefined" in PortableText | Field is empty/null | The `PortableText` component already null-checks — make sure you're passing the raw blocks array, not a string |

---

## Pre-launch checklist

- [ ] Custom domain pointed at deploy host, SSL verified
- [ ] Resend domain verified (SPF/DKIM/DMARC); sender updated
- [ ] All hardcoded fallback copy replaced in Studio → Site Settings
- [ ] At least 2–4 projects marked as "Featured on home page"
- [ ] Sanity CORS allowlist updated with production domains
- [ ] Backend deployed somewhere persistent (Railway / Render / converted to Vercel functions)
- [ ] `backend/.env` set with real Resend key in production environment (not committed)
- [ ] Test contact form end-to-end (submit form → email arrives in inbox)
- [ ] Add analytics (Plausible / Google Analytics)
- [ ] Add a sitemap.xml and robots.txt
- [ ] Test on mobile, tablet, and at 1440px+ viewports

---

## Credits & history

- Original 2020/2021 attempt by Maanum / Kristofer Maanum (Sanity v1 + Gatsby 2 + Lerna). Preserved on `production` and `create-services-page` branches.
- 2026 rebuild: Sanity v3 + React 19 SPA + FastAPI, with the same brand design.
- Sanity project owner: Erik Maanum.

For the full state of the rebuild see [`memory/PRD.md`](memory/PRD.md).
