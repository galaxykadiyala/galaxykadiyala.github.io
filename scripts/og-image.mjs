#!/usr/bin/env node
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const allMode = process.argv.includes('--all');
const slugArg = process.argv[2];

if (!allMode && !slugArg) {
  console.error('Usage: npm run og-image -- <post-slug>');
  console.error('       npm run og-image -- --all');
  process.exit(1);
}

const blogDir = join(process.cwd(), 'src/content/blog');
const outDir = join(process.cwd(), 'public/og');
mkdirSync(outDir, { recursive: true });

function parseTitle(content) {
  const m = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return m ? m[1] : null;
}

async function generate(file) {
  const content = readFileSync(join(blogDir, file), 'utf8');
  const title = parseTitle(content);
  if (!title) {
    console.error(`Error: could not parse title from ${file}`);
    process.exit(1);
  }
  const fileSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const outPath = join(outDir, `${fileSlug}.png`);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                color: '#f5f0e8',
                fontSize: title.length > 50 ? '60px' : '72px',
                fontWeight: '700',
                lineHeight: '1.1',
                maxWidth: '1000px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: { color: '#888888', fontSize: '32px' },
              children: 'galaxykadiyala.com',
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, fonts: [] }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  writeFileSync(outPath, resvg.render().asPng());
  console.log(outPath);
}

const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));

if (allMode) {
  for (const file of files) await generate(file);
} else {
  const match = files.find((f) => f.includes(slugArg));
  if (!match) {
    console.error(`Error: no blog post matching "${slugArg}"`);
    process.exit(1);
  }
  await generate(match);
}
