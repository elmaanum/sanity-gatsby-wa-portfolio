/**
 * Backend API base URL (no trailing slash).
 * In development, defaults to http://localhost:8000 when REACT_APP_BACKEND_URL is unset.
 * Production builds must set REACT_APP_BACKEND_URL at build time.
 */
export function getBackendBaseUrl() {
  const raw = process.env.REACT_APP_BACKEND_URL
  if (raw && String(raw).trim()) {
    return String(raw).replace(/\/+$/, '')
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000'
  }
  return ''
}
