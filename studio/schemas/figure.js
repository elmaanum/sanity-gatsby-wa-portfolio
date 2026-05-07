export default {
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    { name: 'caption', title: 'Caption', type: 'string' },
    {
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Important for SEO and accessibility.',
      validation: (Rule) => Rule.required().error('Alt text is required.'),
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Display order when multiple images exist (lower numbers first).',
    },
  ],
}
