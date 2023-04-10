import { MdSettings } from 'react-icons/md';

const hiddenDocTypes = listItem =>
  !['service', 'serviceSubtype', 'person', 'project', 'siteSettings'].includes(listItem.getId());

export default S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        )
        .icon(MdSettings),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('Service Subtypes')
        .schemaType('serviceSubtype')
        .child(S.documentTypeList('serviceSubtype').title('Service Subtypes')),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),

      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
