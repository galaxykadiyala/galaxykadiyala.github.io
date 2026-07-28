import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://galaxykadiyala.github.io',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/blog/2026-06-04-the-hour-i-can-t-account-for': '/blog/2026-06-04-the-hour-i-cant-account-for',
    '/blog/2026-05-07-what-breaks-when-you-automate-across-7-teams-and-3-timezones': '/blog/2026-05-09-what-breaks-when-you-automate-across-7-teams-and-3-timezones',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});