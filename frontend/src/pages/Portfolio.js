import React, { useEffect, useMemo, useState } from 'react'
import { sanity, urlFor } from '../lib/sanity'
import ProjectViewer from '../components/ProjectViewer'

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(null)

  useEffect(() => {
    sanity
      .fetch(`*[_type=="project"] | order(title asc){
        _id, title, slug, client, description, images,
        "serviceTitles": serviceTypes[]->title
      }`)
      .then((res) => setProjects(res || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  const serviceOptions = useMemo(() => {
    const set = new Set()
    projects.forEach((p) => (p.serviceTitles || []).forEach((t) => set.add(t)))
    return ['all', ...Array.from(set).sort()]
  }, [projects])

  const visible = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => (p.serviceTitles || []).includes(filter))
  }, [filter, projects])

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16" data-testid="portfolio-page">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <div className="textMicro uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">Selected work</div>
          <h1 className="textH1 text-[var(--color-shadow)]">Portfolio</h1>
        </div>
        <div className="flex items-center gap-3 textSmall">
          <span className="text-[var(--color-gray)]">Show me</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-[var(--color-gray-light)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            data-testid="portfolio-filter"
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="text-[var(--color-gray)]">projects</span>
        </div>
      </div>

      {loading && <div className="textBody text-[var(--color-gray)]" data-testid="portfolio-loading">Loading projects…</div>}

      {!loading && visible.length === 0 && (
        <div className="textBody text-[var(--color-gray)]" data-testid="portfolio-empty">
          No projects to show yet. Add some in the Sanity Studio.
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-testid="portfolio-grid">
        {visible.map((p) => {
          const cover = (p.images || []).slice().sort((a, b) => (a?.priority ?? 999) - (b?.priority ?? 999))[0]
          return (
            <button
              key={p._id}
              onClick={() => setActive(p)}
              className="text-left group focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded-lg overflow-hidden"
              data-testid={`portfolio-tile-${p.slug?.current}`}
            >
              <div className="aspect-[7/6] overflow-hidden bg-[var(--color-gray-vlight)]">
                {cover ? (
                  <img src={urlFor(cover).width(700).height(600).fit('crop').url()} alt={cover?.alt || p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-shadow)]" />
                )}
              </div>
              <div className="pt-4">
                <div className="textH3 text-[var(--color-shadow)] group-hover:text-[var(--color-accent)] transition-colors">{p.title}</div>
                <div className="textSmall text-[var(--color-gray)] mt-1">{(p.serviceTitles || [])[0] || ''}</div>
              </div>
            </button>
          )
        })}
      </div>

      {active && <ProjectViewer project={active} onClose={() => setActive(null)} />}
    </div>
  )
}

export default Portfolio
