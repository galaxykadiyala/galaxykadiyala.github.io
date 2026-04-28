/**
 * Generates public/apple-touch-icon.png from an inline SVG using sharp.
 * Run with: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';

// iOS home screen icons need an opaque background.
// Use the site's paper colour (#f8f6f2) with a rounded square.
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#f8f6f2"/>
  <text x="90" y="132"
        text-anchor="middle"
        font-family="monospace"
        font-size="128"
        font-weight="700"
        fill="#d85a30">&gt;</text>
</svg>`);

await sharp(svg)
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('✓ public/apple-touch-icon.png written');
