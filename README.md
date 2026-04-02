# galaxykadiyala.github.io

Personal site and blog — built with [Astro](https://astro.build), deployed to GitHub Pages.

🌐 **Live at:** https://galaxykadiyala.github.io

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/galaxykadiyala/galaxykadiyala.github.io.git
cd galaxykadiyala.github.io
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
# → http://localhost:4321
```

### 4. Build for production
```bash
npm run build
```

---

## Writing a new blog post

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "My New Post"
date: 2025-01-01
category: "Mozilla"
description: "A short description for previews."
---

Your content here in Markdown...
```

The filename becomes the URL slug. E.g. `my-new-post.md` → `/blog/my-new-post`

---

## Adding a project

Create a new `.md` file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "What it does."
url: "https://..."
github: "https://github.com/..."
tags: ["Astro", "Open Source"]
status: "active"   # active | wip | archived
year: 2025
---
```

---

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`).

**One-time setup:**
1. Go to your repo → **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to `GitHub Actions`
3. Push to `main` — it deploys automatically ✨

---

## Tech stack

- **Framework:** [Astro](https://astro.build) v4
- **Fonts:** Syne + Instrument Serif (Google Fonts)
- **Deployment:** GitHub Pages via GitHub Actions
- **Content:** Markdown / MDX via Astro Content Collections
