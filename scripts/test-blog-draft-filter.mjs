import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const checks = [
  {
    file: 'src/pages/blog/index.astro',
    pattern: /getCollection\('blog',\s*\(\{\s*data\s*\}\)\s*=>\s*!data\.draft\)/,
    message: 'blog index must exclude draft posts from getCollection()',
  },
  {
    file: 'src/pages/blog/[slug].astro',
    pattern: /getCollection\('blog',\s*\(\{\s*data\s*\}\)\s*=>\s*!data\.draft\)/,
    message: 'blog static paths must exclude draft posts from getCollection()',
  },
];

const failures = [];

for (const check of checks) {
  const fullPath = join(root, check.file);
  const source = readFileSync(fullPath, 'utf8');
  if (!check.pattern.test(source)) {
    failures.push(`${check.file}: ${check.message}`);
  }
}

if (failures.length) {
  console.error('Draft filtering checks failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('All draft filtering checks passed.');
