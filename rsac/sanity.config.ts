import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'rsac',

  projectId: process.env.SANITY_API_PROJECT_ID || '',
  dataset: process.env.SANITY_API_DATASET || '',
  token: process.env.SANITY_API_WRITE_TOKEN || '',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
