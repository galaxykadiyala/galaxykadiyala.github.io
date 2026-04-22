#!/usr/bin/env node
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const title = process.argv[2];
if (!title) {
  console.error('Usage: npm run new-post -- "My Post Title"');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const filename = `${today}-${slug}.md`;
const filepath = join(process.cwd(), 'src/content/blog', filename);

if (existsSync(filepath)) {
  console.error(`Error: ${filepath} already exists`);
  process.exit(1);
}

const frontmatter = `---
title: "${title}"
description: ''
date: ${new Date().toISOString()}
tags: []
draft: true
---

# ${title}

Draft.
`;

writeFileSync(filepath, frontmatter);
console.log(filepath);
