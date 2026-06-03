import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
const PROJECT_ID = 'dqwhxx3m'
const DATASET    = 'production'

export default defineConfig({
  name: 'ia-loire-valley',
  title: 'IA Loire Valley – Admin',
  projectId: PROJECT_ID,
  dataset: DATASET,
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
