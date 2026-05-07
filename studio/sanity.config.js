import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'whittenAssociates',
  title: 'Whitten Associates',
  projectId: '6raq5w4t',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
})
