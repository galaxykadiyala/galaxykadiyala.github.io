#!/usr/bin/env node

const { UMAMI_API_URL, UMAMI_API_KEY, UMAMI_WEBSITE_ID } = process.env;
const jsonMode = process.argv.includes('--json');
const daysIdx = process.argv.indexOf('--days');
const days = daysIdx !== -1 ? parseInt(process.argv[daysIdx + 1], 10) || 7 : 7;

if (!UMAMI_API_KEY) {
  console.error('Error: UMAMI_API_KEY is not set.');
  console.error('Hint: Copy .env.example to .env and add your Umami API key.');
  console.error('      Generate one at https://api.umami.is/v1 under your account settings.');
  process.exit(1);
}

const baseUrl = UMAMI_API_URL || 'https://api.umami.is/v1';
const websiteId = UMAMI_WEBSITE_ID;
const headers = { 'x-umami-api-key': UMAMI_API_KEY };

async function get(path) {
  const res = await fetch(`${baseUrl}${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${path}`);
  return res.json();
}

function pct(current, previous) {
  if (!previous) return '+100%';
  const delta = ((current - previous) / previous) * 100;
  return (delta >= 0 ? '+' : '') + delta.toFixed(1) + '%';
}

const now = Date.now();
const DAY = 86400000;
const curr = { startAt: now - days * DAY, endAt: now };
const prev = { startAt: now - 2 * days * DAY, endAt: now - days * DAY };

const qs = (o) => new URLSearchParams({ websiteId, ...o, startAt: o.startAt, endAt: o.endAt }).toString();

const [currStats, prevStats, pages, referrers] = await Promise.all([
  get(`/websites/${websiteId}/stats?${qs(curr)}`),
  get(`/websites/${websiteId}/stats?${qs(prev)}`),
  get(`/websites/${websiteId}/metrics?${qs(curr)}&type=url&limit=5`),
  get(`/websites/${websiteId}/metrics?${qs(curr)}&type=referrer&limit=5`),
]);

const visitors = currStats.visitors?.value ?? currStats.uniques?.value ?? 0;
const prevVisitors = prevStats.visitors?.value ?? prevStats.uniques?.value ?? 0;
const pageviews = currStats.pageviews?.value ?? 0;
const prevPageviews = prevStats.pageviews?.value ?? 0;

if (jsonMode) {
  console.log(JSON.stringify({ visitors, pageviews, pages, referrers }, null, 2));
} else {
  console.log(`Visitors:  ${visitors} (${pct(visitors, prevVisitors)})`);
  console.log(`Pageviews: ${pageviews} (${pct(pageviews, prevPageviews)})`);
  console.log('\nTop 5 pages:');
  (pages || []).slice(0, 5).forEach((p) => console.log(`  ${p.x}  ${p.y}`));
  console.log('\nTop 5 referrers:');
  (referrers || []).slice(0, 5).forEach((r) => console.log(`  ${r.x || '(direct)'}  ${r.y}`));
}
