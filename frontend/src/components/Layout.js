import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { sanity } from '../lib/sanity'

const Layout = ({ children }) => {
  const [services, setServices] = useState([])
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    sanity
      .fetch(`*[_type == "service"] | order(title asc){ _id, title, slug }`)
      .then(setServices)
      .catch(() => setServices([]))

    sanity
      .fetch(`*[_id == "siteSettings"][0]{ title, email, phonenumber, address, heroImage, heroHeadline, aboutBlurb, accolades, clientLogos }`)
      .then(setSettings)
      .catch(() => setSettings(null))
  }, [])

  return (
    <div className="min-h-screen flex flex-col" data-testid="app-root">
      <Header services={services} />
      <main className="flex-1">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { services, settings })
            : child
        )}
      </main>
      <Footer settings={settings} />
    </div>
  )
}

export default Layout
