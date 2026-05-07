import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanity, urlFor } from '../lib/sanity'
import ContactModal from '../components/ContactModal'

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80'
const DEFAULT_HEADLINE = 'Planning and architecture services to create innovative and successful communities'
const DEFAULT_ACCOLADES = ['Trusted partners', '40+ projects delivered', '50+ years combined experience']

const Home = ({ services = [], settings }) => {
  const [siteServices, setSiteServices] = useState(services)
  useEffect(() => {
    if (services.length === 0) {
      sanity.fetch(`*[_type=="service"] | order(title asc){ _id, title, slug, mainImage }`).then(setSiteServices).catch(() => {})
    } else {
      // Re-fetch with mainImage for service cards
      sanity.fetch(`*[_type=="service"] | order(title asc){ _id, title, slug, mainImage }`).then(setSiteServices).catch(() => setSiteServices(services))
    }
  }, [services])

  const heroSrc = settings?.heroImage ? urlFor(settings.heroImage).width(2000).fit('max').url() : FALLBACK_HERO
  const headline = settings?.heroHeadline || DEFAULT_HEADLINE
  const accolades = (settings?.accolades && settings.accolades.length > 0) ? settings.accolades : DEFAULT_ACCOLADES
  const logos = settings?.clientLogos || []

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 gap-0 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 px-6 lg:pl-10 lg:pr-0 py-12 lg:py-24 flex items-center">
            <div className="fadeUp">
              <div className="textMicro uppercase tracking-[0.25em] text-[var(--color-accent)] mb-5">Whitten Associates</div>
              <h1 className="textH1 text-[var(--color-shadow)] max-w-xl">{headline}</h1>
              <div className="mt-8 flex gap-3">
                <Link to="/portfolio" className="btn btn-primary" data-testid="hero-portfolio-cta">See our work</Link>
                <ContactModal>
                  <button className="btn btn-ghost" data-testid="hero-contact-cta">Start a project</button>
                </ContactModal>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[560px]">
            <img src={heroSrc} alt="Architecture team at work" className="absolute inset-0 w-full h-full object-cover" data-testid="hero-image" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:via-white/0" />
          </div>
        </div>
      </section>

      {/* Accolades */}
      <section className="bg-[var(--color-gray-vlight)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid gap-6 sm:grid-cols-3" data-testid="accolades-list">
          {accolades.map((line, i) => (
            <div key={i} className="textH3 text-center text-[var(--color-primary)] font-medium">{line}</div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="textMicro uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">What we do</div>
            <h2 className="textH1 text-[var(--color-shadow)]">Services</h2>
          </div>
          <Link to="/portfolio" className="hidden md:inline textSmall uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-accent)]">View portfolio →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="services-grid">
          {siteServices.map((s) => (
            <Link key={s._id} to={`/service/${s.slug?.current}`} className="group relative rounded-lg overflow-hidden bg-[var(--color-shadow)] aspect-[4/5]" data-testid={`service-card-${s.slug?.current}`}>
              {s.mainImage ? (
                <img src={urlFor(s.mainImage).width(800).height(1000).fit('crop').url()} alt={s.mainImage?.alt || s.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-shadow)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="textH2 text-white">{s.title}</div>
                <div className="mt-2 textSmall uppercase tracking-wider text-[var(--color-accent)]">Explore →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Client logos */}
      {logos.length > 0 && (
        <section className="border-t border-[var(--color-gray-vlight)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center" data-testid="client-logos">
            {logos.map((l, i) => (
              <img key={i} src={urlFor(l).width(300).fit('max').url()} alt={l?.alt || 'Client logo'} className="max-h-12 mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
