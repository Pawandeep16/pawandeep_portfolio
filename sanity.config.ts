import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  projectId:'0yo7qjoj',
  dataset:'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
