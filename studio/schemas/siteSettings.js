export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phonenumber', title: 'Phone Number', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    {
      name: 'heroImage',
      title: 'Home Hero Image',
      type: 'figure',
      description: 'Large image shown on the home page hero.',
    },
    {
      name: 'heroHeadline',
      title: 'Home Hero Headline',
      type: 'string',
    },
    {
      name: 'aboutBlurb',
      title: 'About Page Intro',
      type: 'simplePortableText',
    },
    {
      name: 'accolades',
      title: 'Accolades / Stats',
      type: 'array',
      description: 'Short stat phrases shown under the hero (e.g. "40 projects").',
      of: [{ type: 'string' }],
    },
    {
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [{ type: 'figure' }],
    },
  ],
  preview: { select: { title: 'title' } },
}
