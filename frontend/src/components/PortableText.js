import React from 'react'
import { PortableText as PT } from '@portabletext/react'

const components = {
  block: {
    normal: ({ children }) => <p className="textBody mb-4 leading-relaxed text-[var(--color-gray-dark)]">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[var(--color-black)]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

const PortableText = ({ value }) => {
  if (!value) return null
  return <PT value={value} components={components} />
}

export default PortableText
