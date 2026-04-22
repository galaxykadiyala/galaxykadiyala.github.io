# Scripts

**new-post** — scaffolds a draft blog post with today's date slug.
`npm run new-post -- "My Post Title"`

**analytics** — prints last-7d vs prior-7d Umami stats. Requires `.env` with `UMAMI_API_KEY`.
`npm run analytics` or `npm run analytics -- --json`

**og-image** — generates a 1200×630 PNG from a post's title into `public/og/`.
`npm run og-image -- <post-slug>`

Install new deps: `npm install`
Copy `.env.example` to `.env` and fill in `UMAMI_API_KEY` before running analytics.
