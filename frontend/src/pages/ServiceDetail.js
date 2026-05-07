import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sanity, urlFor } from '../lib/sanity'
import PortableText from '../components/PortableText'
import ContactModal from '../components/ContactModal'

const ServiceDetail = () => {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    sanity
      .fetch(
        `{
          "service": *[_type=="service" && slug.current==$slug][0]{
            _id, title, mainImage, body,
            "serviceSubtypes": serviceSubtypes[]->{ _id, name }
          },
          "projects": *[_type=="project" && references(*[_type=="service" && slug.current==$slug]._id)]{
            _id, title, slug, description, images, client
          }
        }`,
        { slug }
      )
      .then((res) => {
        setService(res.service)
        setProjects(res.projects || [])
      })
      .catch(() => setService(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 textBody text-[var(--color-gray)]" data-testid="service-loading">Loading…</div>
  if (!service) return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20" data-testid="service-not-found">
      <h1 className="textH1 mb-4">Service not found</h1>
      <Link to="/" className="btn btn-primary">Back home</Link>
    </div>
  )

  return (
    <div data-testid="service-page">
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[16/7] w-full overflow-hidden bg-[var(--color-shadow)]">
          {service.mainImage && (
            <img src={urlFor(service.mainImage).width(2000).fit('crop').url()} alt={service.mainImage?.alt || service.title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-20 lg:-mt-28 relative z-10">
          <div className="bg-white shadow-2xl rounded-lg p-8 lg:p-12 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="textMicro uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">Service</div>
              <h1 className="textH1 text-[var(--color-shadow)] mb-6">{service.title}</h1>
              <div><PortableText value={service.body} /></div>
            </div>
            <aside className="lg:border-l lg:pl-8 border-[var(--color-gray-vlight)]">
              {service.serviceSubtypes?.length > 0 && (
                <>
                  <div className="textSmall uppercase tracking-wider text-[var(--color-gray)] mb-3">What's included</div>
                  <ul className="textBody text-[var(--color-gray-dark)] space-y-2 mb-6">
                    {service.serviceSubtypes.map((s) => (
                      <li key={s._id} className="flex gap-2"><span className="text-[var(--color-accent)]">·</span>{s.name}</li>
                    ))}
                  </ul>
                </>
              )}
              <ContactModal>
                <button className="btn btn-accent w-full" data-testid="service-contact-cta">Discuss your project</button>
              </ContactModal>
            </aside>
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <h2 className="textH1 text-[var(--color-shadow)] mb-10">Projects</h2>
          <div className="space-y-16" data-testid="service-projects">
            {projects.map((p) => {
              const sortedImages = (p.images || []).slice().sort((a, b) => (a?.priority ?? 999) - (b?.priority ?? 999))
              const cover = sortedImages[0]
              return (
                <article key={p._id} className="grid gap-8 lg:grid-cols-12 items-start">
                  <div className="lg:col-span-7 aspect-[16/9] overflow-hidden rounded-md bg-[var(--color-gray-vlight)]">
                    {cover && <img src={urlFor(cover).width(1300).fit('crop').url()} alt={cover?.alt || p.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="lg:col-span-5">
                    <h3 className="textH2 text-[var(--color-shadow)] mb-2">{p.title}</h3>
                    {p.client && <div className="textSmall uppercase tracking-wider text-[var(--color-accent)] mb-3">{p.client}</div>}
                    <PortableText value={p.description} />
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

export default ServiceDetail
