export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
    {
      name: 'description',
      title: 'Description',
      type: 'simplePortableText',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    // prepare({ title = 'No title', publishedAt, slug = {}, media }) {
    //   const path = `/${dateSegment}/${slug.current}/`;
    //   return {
    //     title,
    //     media,
    //     subtitle: publishedAt ? path : 'Missing publishing date',
    //   };
    // },
  },
};
