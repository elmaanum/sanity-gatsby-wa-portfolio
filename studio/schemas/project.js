export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'featured',
      title: 'Featured on home page',
      type: 'boolean',
      description: 'Show this project in the featured carousel on the home page. Aim for 2–4 featured projects.',
      initialValue: false,
    },
    {
      name: 'featuredOrder',
      title: 'Featured order',
      type: 'number',
      description: 'Display order in the featured section (lower numbers first). Only matters when "Featured" is on.',
      hidden: ({ parent }) => !parent?.featured,
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'figure' }],
    },
    {
      name: 'serviceTypes',
      title: 'Service Types',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'service' } }],
    },
    {
      name: 'serviceSubtypes',
      title: 'Service Sub-types',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'serviceSubtype' } }],
    },
    { name: 'description', title: 'Description', type: 'simplePortableText' },
    { name: 'client', title: 'Client', type: 'string' },
  ],
  preview: {
    select: { title: 'title', featured: 'featured', media: 'images.0' },
    prepare({ title, featured, media }) {
      return {
        title: featured ? `★ ${title}` : title,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'featuredOrder', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
}
