export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
    { name: 'image', title: 'Image', type: 'figure' },
    {
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'Short list of certificates (e.g. "A.I.A., LEED AP")',
    },
    { name: 'bio', title: 'Bio', type: 'simplePortableText' },
  ],
  preview: { select: { title: 'name', media: 'image' } },
}
