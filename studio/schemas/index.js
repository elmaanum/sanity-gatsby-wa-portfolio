import service from './service'
import serviceSubtype from './serviceSubtype'
import person from './person'
import project from './project'
import siteSettings from './siteSettings'
import figure from './figure'
import simplePortableText from './simplePortableText'

export const schemaTypes = [
  // Objects
  figure,
  simplePortableText,
  // Documents
  service,
  serviceSubtype,
  person,
  project,
  siteSettings,
]
