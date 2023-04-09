// Document types
import service from './documents/service';
import serviceSubtype from './documents/serviceSubtype';
import person from './documents/person';
import project from './documents/project';
import siteSettings from './documents/siteSettings';

// Object types
import figure from './objects/figure';
import simplePortableText from './objects/simplePortableText';

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  figure,
  simplePortableText,
  // The following are document types which will appear
  // in the studio.
  service,
  serviceSubtype,
  person,
  project,
  siteSettings,
];
