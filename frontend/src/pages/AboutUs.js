import React, { useEffect, useState } from 'react'
import { sanity, urlFor } from '../lib/sanity'
import PortableText from '../components/PortableText'

const FALLBACK_BLURB = `Our goal is to create innovative, market-responsive communities and developments that deliver lasting value for our clients. By combining thoughtful design, strategic planning, and in-depth market analysis, we provide practical solutions grounded in real-world development experience. Our integrated background in architecture, planning, and development allows us to balance creativity with feasibility, ensuring every project is both visionary and achievable.`

const AboutUs = ({ settings:settingsProp }) => {
  const [people, setPeople] = useState([])
  const [settings, setSettings] = useState(settingsProp || null)

  useEffect(() => {
    sanity
      .fetch(`*[_type=="person"]{ _id, name, slug, credentials, image, bio }`)
      .then(setPeople)
      .catch(() => setPeople([]))
  }, [])

  useEffect(() => {
    if (settings) return
    sanity
      .fetch(`*[_id=="siteSettings"][0]{ aboutBlurb }`)
      .then(setSettings)
      .catch(() => {})
  }, [settings])

  const blurb = settings?.aboutBlurb

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16" data-testid="about-page">
      <div className="textMicro uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">Who we are</div>
      <h1 className="textH1 text-[var(--color-shadow)] mb-10">About Us</h1>

      <div className="max-w-3xl text-[var(--color-gray-dark)] mb-16">
        {blurb ? <PortableText value={blurb} /> : <p className="textBody leading-relaxed">{FALLBACK_BLURB}</p>}
      </div>

      <h2 className="textH2 text-[var(--color-shadow)] mb-8">Our team</h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3" data-testid="people-grid">
        {people.map((p) => (
          <div key={p._id} className="flex flex-col gap-4">
            <div className="aspect-[4/5] overflow-hidden rounded-md bg-[var(--color-gray-vlight)]">
              {p.image ? (
                <img src={urlFor(p.image).width(600).height(750).fit('crop').url()} alt={p.image?.alt || p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-shadow)]" />
              )}
            </div>
            <div>
              <div className="textH3 text-[var(--color-shadow)]">{p.name}</div>
              {p.credentials && <div className="textSmall text-[var(--color-accent)] uppercase tracking-wider">{p.credentials}</div>}
              <div className="mt-3"><PortableText value={p.bio} /></div>
            </div>
          </div>
        ))}
        {people.length === 0 && (
          <div className="textBody text-[var(--color-gray)]" data-testid="people-empty">Team members will appear here once added in the Sanity Studio.</div>
        )}
      </div>
    </div>
  )
}

export default AboutUs
