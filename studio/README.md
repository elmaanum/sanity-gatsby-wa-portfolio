# Whitten Associates — Sanity Studio v3

This is the content management studio for the Whitten Associates website.

## Setup (one-time)

```bash
cd studio
npm install
npx sanity@latest login         # log in with the account that owns project 6raq5w4t
```

## Run locally

```bash
npm run dev
# Studio: http://localhost:3333
```

## Deploy

Hosts the studio at `https://<your-name>.sanity.studio` (free):

```bash
npm run deploy
```

## Notes

- **Project ID:** `6raq5w4t`
- **Dataset:** `production`
- Schemas are ported from the original v1 studio. Field names match, so existing content reads cleanly.
- `siteSettings` has been extended with `heroImage`, `heroHeadline`, `aboutBlurb`, `accolades`, and `clientLogos` — all optional. Fill them in to replace the hard-coded placeholders on the website.
