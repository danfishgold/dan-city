import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
  ],
  site: process.env.URL || 'http://localhost:3000',
})
