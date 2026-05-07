export default {
  name: 'service',
  title: 'Service Type',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'mainImage', title: 'Main image', type: 'figure' },
    {
      name: 'serviceSubtypes',
      title: 'Service Sub-types',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'serviceSubtype' } }],
    },
    { name: 'body', title: 'Body', type: 'simplePortableText' },
  ],
  preview: {
    select: { title: 'title', media: 'mainImage' },
  },
}
