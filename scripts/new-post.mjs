#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const title = process.argv[2];
if (!title) {
  console.error('Usage: npm run post -- "My Post Title"');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const filename = `${today}-${slug}.md`;
const postPath = join(process.cwd(), 'src/content/blog', filename);

if (existsSync(postPath)) {
  console.error(`Error: ${postPath} already exists`);
  process.exit(1);
}

writeFileSync(postPath, `---
title: "${title}"
description: ''
date: ${new Date().toISOString()}
tags: []
draft: true
---

# ${title}

`);
console.log(`✓ Post:  ${postPath}`);

// Distribution draft
const distDir = join(process.cwd(), 'distribution');
if (!existsSync(distDir)) mkdirSync(distDir);

const siteUrl = process.env.SITE_URL || 'https://galaxykadiyala.github.io';
const distPath = join(distDir, `${slug}.txt`);

writeFileSync(distPath, `# Distribution Draft: ${title}
# Slug:  ${slug}
# Date:  ${today}
# URL:   ${siteUrl}/blog/${slug}

────────────────────────────────────────────
SHORT SUMMARY (2–3 lines for newsletters / bio links)
────────────────────────────────────────────
${title}. [Write 2–3 lines summarizing the core insight here.]


────────────────────────────────────────────
LINKEDIN DRAFT
────────────────────────────────────────────
[Opening hook — one sentence that makes someone stop scrolling.]

[Core insight or story — 3–5 short paragraphs. Be specific.]

Key takeaways:
→ [Point 1]
→ [Point 2]
→ [Point 3]

Read: ${siteUrl}/blog/${slug}

#TPM #SystemsThinking #[AddTags]


────────────────────────────────────────────
NEXT STEPS
────────────────────────────────────────────
[ ] Generate OG image:  npm run og-image -- ${slug}
[ ] Set draft: false in frontmatter
[ ] Fill in description field
[ ] Review and publish
`);
console.log(`✓ Draft: ${distPath}`);
