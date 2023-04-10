import { MdPerson } from 'react-icons/md';

export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontend will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure',
    },
    {
      name: 'credentials',
      title: 'Credentials',
      description: 'Short list of certificates, etc... (e.g. "A.I.A., LEED AP")',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'simplePortableText',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};
