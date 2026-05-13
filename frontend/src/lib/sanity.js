import imageUrlBuilder from '@sanity/image-url'
import { getBackendBaseUrl } from './apiBase'

const PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID || '6raq5w4t'
const DATASET = process.env.REACT_APP_SANITY_DATASET || 'production'
// When BACKEND_URL is empty, use relative paths — works on Vercel (same origin)
// and in Emergent preview (ingress routes /api/* to FastAPI on :8001).
const API = process.env.REACT_APP_BACKEND_URL || ''

// Server-side proxy fetch — avoids CORS issues from legacy Sanity CORS settings
export const sanity = {
  fetch: async (query, params = null) => {
    const base = getBackendBaseUrl()
    if (!base) {
      const detail =
        'Set REACT_APP_BACKEND_URL before building for production.'
      if (process.env.NODE_ENV === 'production') {
        console.error('[sanity]', detail)
      }
      throw new Error(detail)
    }

    const res = await fetch(`${base}/api/sanity`, {
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

// Client-side image URL builder works without API access (just builds CDN URLs)
const builder = imageUrlBuilder({ projectId: PROJECT_ID, dataset: DATASET })
export const urlFor = (source) => builder.image(source)
