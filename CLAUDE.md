# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to /dist
npm run preview  # Preview production build locally
```

No test or lint commands are configured.

## Architecture

This is an **Astro 4** static site (personal portfolio + blog) deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

### Content model

Content lives in `src/content/` as Markdown/MDX with Zod-validated frontmatter defined in `src/content/config.ts`:

- **blog**: `title`, `date`, `description`, `category`, `tags[]`, `draft` (bool)
- **projects**: `title`, `description`, `url`, `github`, `tags[]`, `status` (active|archived|wip), `year`

Blog posts use the filename as URL slug (`/blog/[slug]`). Projects are listed at `/projects`.

### Layout system

`src/layouts/BaseLayout.astro` is the single shared layout — it wraps every page with `<Nav>`, `<Footer>`, global CSS, head metadata (title, description, og:image), and Umami analytics. All pages use this layout.

### Styling

`src/styles/global.css` defines the full design system via CSS custom properties:
- **Colors**: `--ink` (#0a0a0a), `--paper` (#f5f0e8), plus 5 named accents (red, yellow, green, blue, orange)
- **Fonts**: Plus Jakarta Sans (sans), Manrope (serif), JetBrains Mono (mono) — loaded from Google Fonts in BaseLayout
- **Container**: max-width 1100px, responsive padding
- Inline styles within `.astro` files are common for page-specific layout.

### Deployment

GitHub Actions (`deploy.yml`) builds the site with Node 22 and deploys to GitHub Pages. The `astro.config.mjs` sets `site: "https://galaxykadiyala.github.io"` which is required for sitemap and canonical URL generation.
