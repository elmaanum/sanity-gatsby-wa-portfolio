import React from 'react'
import ContactModal from './ContactModal'

const Footer = ({ settings }) => {
  // Single source of truth = Sanity. Fields render only when filled.
  const address = settings?.address
  const phone = settings?.phonenumber
  const email = settings?.email

  return (
    <footer className="bg-[var(--color-shadow)] text-white mt-24" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-[1fr_auto] items-start">
        <div>
          <div className="textH2 mb-4">Let's build something lasting.</div>
          <div className="textBody opacity-80 leading-relaxed flex flex-wrap gap-x-6 gap-y-2">
            {address && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                className="hover:text-[var(--color-accent)] transition-colors"
                data-testid="footer-address"
              >
                {address}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[var(--color-accent)] transition-colors" data-testid="footer-phone">
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="hover:text-[var(--color-accent)] transition-colors" data-testid="footer-email">
                {email}
              </a>
            )}
          </div>
        </div>
        <ContactModal>
          <button className="btn btn-accent" data-testid="footer-contact-button">Contact Us</button>
        </ContactModal>
      </div>
      <div className="border-t border-white/10 py-5 text-center textMicro opacity-60">
        © {new Date().getFullYear()} Maanum Architecture, Inc. · In partnership with Whitten Associates
      </div>
    </footer>
  )
}

export default Footer
