import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://DanteHalfeye.github.io',
  base: '/GDPortfolio',
  integrations: [sitemap()],
});