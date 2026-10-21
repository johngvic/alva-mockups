/**
 * Screenshot do protótipo Alva (web).
 *
 *   node tools/screenshot.mjs <areaId> <nome> [largura] [altura] [light|dark] [full]
 *
 * Ex.: node tools/screenshot.mjs membros membros-dark 1440 900 dark
 *
 * Faz login na conta demo, navega até a área pedida e salva em tools/shots/<nome>.png.
 * Requer as dependências do app rodando (npm run dev) na porta 5174.
 */
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, 'shots');
mkdirSync(outDir, { recursive: true });

// playwright costuma estar em um repositório vizinho; procura o primeiro que resolver
let chromium;
for (const candidate of [
  'playwright',
  '../alva-web/node_modules/playwright',
  '../../alva-web/node_modules/playwright',
]) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch {}
}
if (!chromium) {
  console.error('playwright nao encontrado. Instale com: npm i -D playwright');
  process.exit(1);
}

const BASE = process.env.ALVA_BASE || 'http://localhost:5174';
const area = process.argv[2] || 'hoje';
const name = process.argv[3] || area;
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const theme = process.argv[6] === 'dark' ? 'dark' : 'light';
const full = process.argv[7] === 'full';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

const click = (action, value) =>
  page.evaluate(
    ([a, v]) => {
      const b = document.createElement('button');
      b.dataset.a = a;
      b.dataset.v = v;
      document.body.appendChild(b);
      b.click();
      b.remove();
    },
    [action, value],
  );

await page.goto(`${BASE}/web/`, { waitUntil: 'networkidle' });
await page.click('[data-a="auDemo"]');
await page.waitForSelector('.au-ig2', { timeout: 10000 });
await page.click('.au-ig2');
await page.waitForTimeout(1200);

await click('nav', area);
await page.waitForTimeout(1200);

if (theme === 'dark') {
  await click('theme', 'noite');
  await page.waitForTimeout(700);
}

const file = resolve(outDir, `${name}.png`);
await page.screenshot({ path: file, fullPage: full });
console.log('saved', file);
if (errors.length) console.log('CONSOLE ERRORS:\n' + errors.slice(0, 20).join('\n'));

await browser.close();
