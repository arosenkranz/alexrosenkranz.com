import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

// https://astro.build/config
export default defineConfig({
  site: 'https://alexrosenkranz.com',
  output: 'static',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
    optimizeDeps: {
      exclude: ['@astrojs/check'],
    },
  },

  adapter: cloudflare(),
});