import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { sanity } from '../lib/sanity'

const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const API = process.env.REACT_APP_BACKEND_URL || ''

const ContactModal = ({ children, settings: settingsProp }) => {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [settings, setSettings] = useState(settingsProp || null)

  useEffect(() => {
    if (settings) return
    sanity
      .fetch(`*[_id=="siteSettings"][0]{ phonenumber, email }`)
      .then(setSettings)
      .catch(() => {})
  }, [settings])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!isEmail(form.email)) next.email = 'Enter a valid email'
    if (!form.message.trim()) next.message = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const close = () => {
    setOpen(false)
    setErrors({})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      toast.success("Thank you! We'll be in touch soon.")
      setForm({ name: '', email: '', company: '', message: '' })
      close()
    } catch {
      toast.error('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // Contact info comes from Sanity siteSettings — no hardcoded fallbacks.
  const phone = settings?.phonenumber
  const email = settings?.email

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm fadeUp" role="dialog" aria-modal="true" data-testid="contact-modal">
          <div className="relative bg-white text-[var(--color-black)] w-full max-w-3xl rounded-lg shadow-2xl grid md:grid-cols-2 overflow-hidden">
            <button onClick={close} aria-label="Close" className="absolute top-3 right-3 p-2 text-[var(--color-gray)] hover:text-[var(--color-primary)]" data-testid="contact-close-button">
              <X size={20} />
            </button>
            <div className="bg-[var(--color-primary)] text-white p-8 flex flex-col justify-center gap-4">
              <div className="textH2">Let's Talk!</div>
              <p className="textBody opacity-90">
                Maanum Architecture, Inc. partners with Whitten Associates to deliver thoughtful design and planning for innovative communities. We'd love to hear about your project.
              </p>
              <p className="textBody opacity-90">
                Fill out the form, or reach us directly:
              </p>
              {phone && (
                <div className="textBody">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="underline underline-offset-4 hover:text-[var(--color-accent)]">{phone}</a>
                </div>
              )}
              {email && (
                <div className="textBody">
                  <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-[var(--color-accent)]">{email}</a>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="p-8 flex flex-col gap-4" data-testid="contact-form">
              <Field label="Name" name="name" value={form.name} onChange={onChange} error={errors.name} testId="contact-name" />
              <Field label="Email*" name="email" value={form.email} onChange={onChange} error={errors.email} testId="contact-email" />
              <Field label="Company" name="company" value={form.company} onChange={onChange} testId="contact-company" />
              <Field label="Message*" name="message" value={form.message} onChange={onChange} error={errors.message} testarea testId="contact-message" />
              <button disabled={submitting} type="submit" className="btn btn-accent disabled:opacity-60" data-testid="contact-submit-button">
                {submitting ? 'Sending…' : 'Start the Conversation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

const Field = ({ label, name, value, onChange, error, testarea, testId }) => (
  <label className="textSmall flex flex-col gap-1">
    <span className="text-[var(--color-gray-dark)] font-medium">{label}</span>
    {testarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${error ? 'border-red-500' : 'border-[var(--color-gray-light)]'}`}
        data-testid={testId}
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${error ? 'border-red-500' : 'border-[var(--color-gray-light)]'}`}
        data-testid={testId}
      />
    )}
    {error && <span className="text-red-500 textMicro">{error}</span>}
  </label>
)

export default ContactModal
