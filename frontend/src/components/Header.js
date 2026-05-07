import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinkClass = ({ isActive }) =>
  `transition-colors duration-200 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-gray-dark)] hover:text-[var(--color-accent)]'}`

const Header = ({ services = [] }) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-[var(--color-gray-vlight)]" data-testid="site-header">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2 group" data-testid="logo-home-link">
          <span className="textH3 font-bold tracking-tight text-[var(--color-primary)]">Whitten</span>
          <span className="textSmall uppercase tracking-[0.18em] text-[var(--color-gray)] group-hover:text-[var(--color-accent)] transition-colors">Associates</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8 textSmall uppercase tracking-wider">
          {services.map((s) => (
            <li key={s._id}>
              <NavLink to={`/service/${s.slug?.current}`} className={navLinkClass} data-testid={`nav-service-${s.slug?.current}`}>
                {s.title}
              </NavLink>
            </li>
          ))}
          <li className="w-px h-5 bg-[var(--color-gray-vlight)]" aria-hidden />
          <li>
            <NavLink to="/portfolio" className={navLinkClass} data-testid="nav-portfolio">Portfolio</NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={navLinkClass} data-testid="nav-about">About Us</NavLink>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-[var(--color-primary)]"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[var(--color-gray-vlight)] bg-white">
          <ul className="px-6 py-4 flex flex-col gap-4 textBody">
            {services.map((s) => (
              <li key={s._id}>
                <NavLink to={`/service/${s.slug?.current}`} onClick={() => setOpen(false)} className={navLinkClass}>
                  {s.title}
                </NavLink>
              </li>
            ))}
            <li><NavLink to="/portfolio" onClick={() => setOpen(false)} className={navLinkClass}>Portfolio</NavLink></li>
            <li><NavLink to="/about-us" onClick={() => setOpen(false)} className={navLinkClass}>About Us</NavLink></li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
