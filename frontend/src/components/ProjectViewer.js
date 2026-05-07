import React, { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { urlFor } from '../lib/sanity'
import PortableText from './PortableText'

const ProjectViewer = ({ project, onClose }) => {
  const sorted = useMemo(
    () => (project?.images || []).slice().sort((a, b) => (a?.priority ?? 999) - (b?.priority ?? 999)),
    [project]
  )
  const [idx, setIdx] = useState(0)

  const next = () => setIdx((i) => (i + 1) % sorted.length)
  const prev = () => setIdx((i) => (i - 1 + sorted.length) % sorted.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted.length])

  if (!project) return null
  const current = sorted[idx]

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 fadeUp" role="dialog" aria-modal="true" data-testid="project-viewer">
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-2 text-white/80 hover:text-white" data-testid="project-viewer-close">
        <X size={28} />
      </button>

      <div className="relative w-full max-w-6xl">
        <div className="aspect-[16/9] bg-black rounded-md overflow-hidden">
          {current ? (
            <img src={urlFor(current).width(1600).fit('max').url()} alt={current?.alt || project.title} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-[var(--color-shadow)]" />
          )}
        </div>

        {sorted.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full" data-testid="project-viewer-prev">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full" data-testid="project-viewer-next">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {sorted.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-[var(--color-accent)] w-5' : 'bg-white/40'}`} />
              ))}
            </div>
          </>
        )}

        <div className="mt-6 bg-white text-[var(--color-black)] rounded-md p-6">
          <div className="textH2 text-[var(--color-shadow)] mb-1">{project.title}</div>
          {project.client && <div className="textSmall uppercase tracking-wider text-[var(--color-accent)] mb-3">{project.client}</div>}
          <PortableText value={project.description} />
        </div>
      </div>
    </div>
  )
}

export default ProjectViewer
