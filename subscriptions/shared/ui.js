/* Alva · utilitários de UI compartilhados (ícones, formatação, gráficos SVG) */

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
export const wait = ms => new Promise(r => setTimeout(r, ms));
export const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- ícones (traço, estilo Lucide) ---------- */
const I = {
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  bank: '<path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M12 2 20 7H4z"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  up: '<path d="M7 17 17 7M7 7h10v10"/>',
  down: '<path d="M17 7 7 17M17 17H7V7"/>',
  swap: '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
  calendar: '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  piggy: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8M16 13H8M16 17H8"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".6" fill="currentColor"/>',
  bell: '<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M10.6 5.6A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.6 3.4M6.2 6.9C3.8 8.6 2.5 12 2.5 12S6 18.5 12 18.5c1.9 0 3.5-.6 4.9-1.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  alert: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  chevR: '<path d="M9 5l7 7-7 7"/>',
  chevL: '<path d="M15 5l-7 7 7 7"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
  dots: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  logout: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
  sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3"/><path d="M14 2v4M8 10v4M16 18v4"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  pen: '<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  wifiOff: '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
  sparkle: '<path d="M9.94 15.5a2 2 0 0 0-1.44-1.44l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  updown: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
  archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  percent: '<path d="m19 5-14 14"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
  smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  more: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
};
export const ic = (n, s = 20, w = 1.75) =>
  `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ''}</svg>`;

/* logo Alva: o sol nascendo (mesma geometria do design system) */
let _lg = 0;
export const logoMark = (h = 24) => { const k = ++_lg; return `<svg class="sun" viewBox="0 0 48 32" width="${h * 1.5}" height="${h}" aria-hidden="true"><defs><linearGradient id="lgd${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--sun1)"/><stop offset=".5" stop-color="var(--sun2)"/><stop offset="1" stop-color="var(--sun3)"/></linearGradient><clipPath id="lgc${k}"><rect x="0" y="0" width="48" height="25"/></clipPath></defs><g stroke-width="2.6" stroke-linecap="round"><line class="ray" x1="11.16" y1="20.83" x2="5.93" y2="19.13"/><line class="ray" x1="16.06" y1="14.08" x2="12.83" y2="9.63"/><line class="ray" x1="24" y1="11.5" x2="24" y2="6"/><line class="ray" x1="31.94" y1="14.08" x2="35.17" y2="9.63"/><line class="ray" x1="36.84" y1="20.83" x2="42.07" y2="19.13"/></g><g clip-path="url(#lgc${k})"><circle class="disc" cx="24" cy="25" r="10" fill="url(#lgd${k})"/></g><line class="horizon" x1="5" y1="28.5" x2="43" y2="28.5" stroke-width="2.6" stroke-linecap="round"/></svg>`; };
export const logo = (h = 24, word = true) => `<span class="logo" role="img" aria-label="Alva" style="font-size:${Math.round(h * 1.05)}px">${logoMark(h)}${word ? '<span class="lw">alva</span>' : ''}</span>`;

/* ---------- formatação ---------- */
export const brl = (c, o = {}) => {
  const n = Math.abs(c) / 100;
  let s = n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (o.short) {
    s = n >= 1000 ? (n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }
  const pre = o.sign ? (c > 0 ? '+ ' : c < 0 ? '− ' : '') : (c < 0 ? '−' : '');
  return pre + 'R$ ' + s;
};
const WD = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const MON = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const dt = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const fmtD = s => s.slice(8) + '/' + s.slice(5, 7);
export const fmtFull = s => s.slice(8) + '/' + s.slice(5, 7) + '/' + s.slice(0, 4);
export const fmtLong = s => { const d = dt(s); return `${WD[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`; };
export const monLabel = ym => `${MONTHS[+ym.slice(5) - 1]} de ${ym.slice(0, 4)}`;
export const monShort = ym => MON[+ym.slice(5) - 1];
export const initials = n => n.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
export const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
export const parseMoney = v => {
  const t = String(v).replace(/[^\d,.-]/g, '');
  if (!t) return NaN;
  const norm = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t;
  const n = Number(norm);
  return Number.isFinite(n) ? Math.round(n * 100) : NaN;
};

/* ---------- gráficos SVG (sem dependências) ---------- */
const PAL = ['var(--c1)', 'var(--c5)', 'var(--c7)', 'var(--c6)', 'var(--c8)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];
export const palette = i => PAL[i % PAL.length];

/* donut: items = [{label, v}] */
export function donut(items, { size = 168, total, centerTop = '', centerBot = '' } = {}) {
  const tot = total ?? items.reduce((a, b) => a + b.v, 0);
  const r = 15.9155, C = 2 * Math.PI * r;
  let off = 0;
  const arcs = tot > 0 ? items.map((it, i) => {
    const len = it.v / tot * C;
    const s = `<circle r="${r}" cx="21" cy="21" fill="none" stroke="${palette(i)}" stroke-width="5.2" stroke-dasharray="${Math.max(len - .6, .1)} ${C - Math.max(len - .6, .1)}" stroke-dashoffset="${-off}" transform="rotate(-90 21 21)"><title>${esc(it.label)}: ${brl(it.v)}</title></circle>`;
    off += len; return s;
  }).join('') : '';
  return `<div class="donut" style="width:${size}px;height:${size}px"><svg viewBox="0 0 42 42" width="${size}" height="${size}" role="img" aria-label="Distribuição por categoria"><circle r="${r}" cx="21" cy="21" fill="none" stroke="var(--surface-3)" stroke-width="5.2"/>${arcs}</svg><div class="dc"><small>${centerTop}</small><b class="num">${centerBot}</b></div></div>`;
}

/* barras agrupadas receita/despesa por mês. data=[{label,rec,desp,state}] */
export function barChart(data, { h = 190, onlyNet = false } = {}) {
  const W = 640, pb = 24, pt = 10, plot = h - pb - pt;
  const max = Math.max(1, ...data.map(d => Math.max(d.rec, d.desp)));
  const gw = W / data.length, bw = Math.min(22, gw / 3);
  const y = v => pt + plot - (v / max) * plot;
  const grid = [0, .5, 1].map(f => `<line x1="0" x2="${W}" y1="${pt + plot * (1 - f)}" y2="${pt + plot * (1 - f)}" stroke="var(--line)" stroke-width="1"/><text x="2" y="${pt + plot * (1 - f) - 3}" class="axt">${brl(max * f, { short: true })}</text>`).join('');
  const bars = data.map((d, i) => {
    const cx = gw * i + gw / 2, fut = d.state !== 'real';
    const tip = `${d.label}: receitas ${brl(d.rec)} · despesas ${brl(d.desp)}${fut ? ' (previsto)' : ''}`;
    const mk = (v, x, col) => `<rect x="${x}" y="${y(v)}" width="${bw}" height="${Math.max(0, pt + plot - y(v))}" rx="4" fill="${col}" ${fut ? `fill-opacity=".38" stroke="${col}" stroke-dasharray="3 2" stroke-width="1.2"` : ''}/>`;
    return `<g><title>${esc(tip)}</title>${mk(d.rec, cx - bw - 2, 'var(--pos)')}${mk(d.desp, cx + 2, 'var(--neg)')}<text x="${cx}" y="${h - 6}" text-anchor="middle" class="axt">${d.label}</text></g>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${h}" class="chart" role="img" aria-label="Receitas e despesas por mês" preserveAspectRatio="none">${grid}${bars}</svg>`;
}

/* linha simples. pts=[{label,v}] */
export function lineChart(pts, { h = 170, area = true } = {}) {
  const W = 640, pb = 24, pt = 12, plot = h - pb - pt;
  const vs = pts.map(p => p.v), mn = Math.min(0, ...vs), mx = Math.max(1, ...vs);
  const x = i => 14 + i * (W - 28) / Math.max(1, pts.length - 1), y = v => pt + plot - ((v - mn) / (mx - mn || 1)) * plot;
  const d = pts.map((p, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.v).toFixed(1)).join(' ');
  const dots = pts.map((p, i) => `<circle cx="${x(i)}" cy="${y(p.v)}" r="3.5" fill="var(--surface)" stroke="var(--brand)" stroke-width="2"><title>${esc(p.label)}: ${brl(p.v)}</title></circle><text x="${x(i)}" y="${h - 6}" text-anchor="middle" class="axt">${p.label}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${h}" class="chart" role="img" aria-label="Evolução por mês" preserveAspectRatio="none"><line x1="0" x2="${W}" y1="${pt + plot}" y2="${pt + plot}" stroke="var(--line)"/>${area ? `<path d="${d} L${x(pts.length - 1)} ${pt + plot} L${x(0)} ${pt + plot} Z" fill="var(--brand)" fill-opacity=".1"/>` : ''}<path d="${d}" fill="none" stroke="var(--brand)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

export const progress = (pct, cls = '') => `<span class="bar ${cls}" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.min(100, Math.max(0, pct))}%"></i></span>`;
