import imageUrlBuilder from '@sanity/image-url'
import { getBackendBaseUrl } from './apiBase'

const PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID || '6raq5w4t'
const DATASET = process.env.REACT_APP_SANITY_DATASET || 'production'

// Always hit /api/sanity on the same origin. Works on:
//   - Vercel (Vercel Functions in frontend/api/sanity.py serve this path)
//   - Emergent preview (ingress routes /api/* to FastAPI on :8001)
//   - localhost dev (proxy via package.json or CORS via dev backend)
export const sanity = {
  fetch: async (query, params = null) => {
    const res = await fetch('/api/sanity', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, params }),
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      throw new Error(`Sanity query failed: ${res.status} ${txt}`)
    }
    const data = await res.json()
    return data.result
  },
}

// Image URL builder is purely client-side — no API call, just builds CDN URLs.
const builder = imageUrlBuilder({ projectId: PROJECT_ID, dataset: DATASET })
export const urlFor = (source) => builder.image(source)
