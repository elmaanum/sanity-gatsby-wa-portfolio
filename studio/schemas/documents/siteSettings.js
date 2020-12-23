export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish',
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe the organization [not used]',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your organization [not used].',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'Company general email address',
    },
    {
      name: 'phonenumber',
      type: 'string',
      title: 'Phone Number',
      description: 'Company general phone number',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
      description: 'Company address (single line)',
    },
  ],
};
