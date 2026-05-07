import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-32 text-center" data-testid="not-found-page">
    <div className="textMicro uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">404</div>
    <h1 className="textH1 text-[var(--color-shadow)] mb-4">Page not found</h1>
    <p className="textBody text-[var(--color-gray)] mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn btn-primary">Back home</Link>
  </div>
)

export default NotFound
