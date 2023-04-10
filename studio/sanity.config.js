// sanity.config.js
// This file is used to configure the Sanity Studio

import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import deskStructure from './deskStructure';
import schemas from './schemas/schema';

export default defineConfig({
  title: 'WhittenAssociates-Sanity',
  projectId: '6raq5w4t',
  dataset: 'production',
  plugins: [
    '@sanity/base',
    '@sanity/components',
    '@sanity/default-layout',
    '@sanity/default-login',
    '@sanity/dashboard',
    '@sanity/desk-tool',
    'dashboard-widget-structure-menu',
    'dashboard-widget-document-list',
    'dashboard-widget-netlify',
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemas,
  },
});
