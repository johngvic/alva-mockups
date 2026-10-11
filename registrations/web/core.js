/* VEM · web · peças compartilhadas: estado, ações, diálogos e componentes de página. */
import { $, $$, esc, ic } from '../shared/ui.js';
import * as D from '../shared/data.js';

export const S = {
  profile: null,          // 'org' | 'buyer' | 'staff'
  org: 'o3',              // organizador em uso
  screen: 'login', evId: null, evTab: 'resumo', theme: 'auto',
  q: '', ef: 'todos', iq: '', iqe: 'todos', iqs: 'todos', iqt: 'todos', iqc: 'todos', cq: '', cf: 'todos',
  bq: '', bcat: 'Todos', bcity: 'todas', bprice: 'todos', buyEv: null, rg: null, ord: null,
  ckEv: null, ckq: '', ckf: 'todos', last: null,
};
try { const t = localStorage.getItem('vem-web-theme'); if (t) S.theme = t; } catch (e) { /* sem storage */ }
export const A = {};
let renderFn = () => { };
export const setRender = f => { renderFn = f; };
export const render = (keep) => renderFn(keep);

export function toast(m, tn = 'ok') { const b = $('#toasts'), e = document.createElement('div'); e.className = 'toast ' + tn; e.setAttribute('role', 'status'); e.innerHTML = `${ic(tn === 'bad' ? 'alert' : 'check', 16, 2.4)}<span>${esc(m)}</span>`; b.appendChild(e); setTimeout(() => e.remove(), 3400); }
export const val = i => ($('#' + i)?.value ?? '').trim();
export function fld(i, label, o = {}) { const { type = 'text', v = '', hint = '', opts, ta, ph = '', extra = '' } = o; return `<div class="fld" id="f-${i}"><label for="${i}">${label}</label>${opts ? `<select id="${i}">${opts.map(([k, l]) => `<option value="${esc(k)}" ${String(k) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>` : ta ? `<textarea id="${i}" placeholder="${esc(ph)}">${esc(v)}</textarea>` : `<input id="${i}" type="${type}" value="${esc(v)}" placeholder="${esc(ph)}" ${extra}>`}<span class="hint">${esc(hint)}</span></div>`; }
export const ferr = (i, m) => { const f = $('#f-' + i); f.classList.add('bad'); $('.hint', f).textContent = m; f.querySelector('input,select,textarea')?.focus(); return false; };
export const fclear = () => $$('.fld.bad').forEach(f => { f.classList.remove('bad'); $('.hint', f).textContent = f.dataset.h || ''; });
export function dlg(html, wide) { $$('.dlgw').forEach(d => d.remove()); const d = document.createElement('div'); d.className = 'dlgw'; d.innerHTML = `<div class="dlg ${wide ? 'wide' : ''}" role="dialog" aria-modal="true"><button class="ibtn dlg-x" data-a="closeDlg" aria-label="Fechar">${ic('x', 16, 2.2)}</button>${html}</div>`; setTimeout(() => d.querySelector('input:not([type=radio]):not([type=checkbox]):not([readonly]),select,textarea')?.focus({ preventScroll: true }), 60); d.addEventListener('click', e => { if (e.target === d) d.remove(); }); document.body.append(d); return d; }
export const closeDlg = () => $$('.dlgw').forEach(d => d.remove());
A.closeDlg = closeDlg;
export function confirmAct({ title, body, label, fn, tone = 'dng' }) {
  const d = dlg(`<div class="cf-ic">${ic('alert', 22, 2)}</div><h2>${title}</h2><p class="lede">${body}</p><div class="ft2"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn ${tone}" id="cfGo">${label}</button></div>`);
  $('#cfGo', d).addEventListener('click', () => { closeDlg(); fn(); });
}

/* ---------- componentes ---------- */
export const chip = (k, l) => `<span class="st ${k}">${l}</span>`;
export const note = (i, h, tn = '') => `<div class="note ${tn}">${ic(i, 17, 2)}<div>${h}</div></div>`;
export const page = (t, p, right = '', eb = '') => `<div class="ph"><div>${eb ? `<p class="eb">${eb}</p>` : ''}<h1>${t}</h1>${p ? `<p>${p}</p>` : ''}</div><div>${right}</div></div>`;
export const kpis = (items, cls = '') => `<div class="kpis ${cls}">${items.map(([l, v, s]) => `<div class="kpi"><small>${l}</small><b>${v}</b>${s ? `<span>${s}</span>` : ''}</div>`).join('')}</div>`;
export const tabs = (list, cur, act) => `<div class="tabs" role="tablist">${list.map(([k, l, n]) => `<button role="tab" aria-selected="${cur === k}" data-a="${act}" data-v="${k}">${l}${n != null && n !== '' ? ` <span class="pill">${n}</span>` : ''}</button>`).join('')}</div>`;
export const bars = items => { const mx = Math.max(1, ...items.map(i => i[1])); return `<div class="bars">${items.map(([l, v, t]) => `<div class="bar" title="${esc(l)}: ${t ?? D.money(v)}"><span class="bv num">${t ?? D.money(v)}</span><i style="height:${Math.max(3, v / mx * 100)}%"></i><small>${esc(l)}</small></div>`).join('')}</div>`; };
export const hbars = items => { const mx = Math.max(1, ...items.map(i => i[1])); return `<ul class="hb">${items.map(([l, v, t]) => `<li><span>${esc(l)}</span><b style="--w:${Math.max(2, v / mx * 100)}%"></b><em class="num">${t ?? D.money(v)}</em></li>`).join('')}</ul>`; };
export const prog = (n, m, cls = '') => `<span class="pgb ${cls}" role="progressbar" aria-valuenow="${m ? Math.round(n / m * 100) : 0}"><i style="width:${m ? Math.min(100, n / m * 100) : 0}%"></i></span>`;
export const empty = t => `<div class="empty">${t}</div>`;
export const crumb = (back, l, cur) => `<nav class="crumb" aria-label="Trilha"><button class="crumb-bk" data-a="${back}" aria-label="Voltar para ${l}">${ic('chevL', 16, 2.2)}<span>Voltar</span></button><i class="crumb-sep"></i><a href="#" data-a="${back}">${l}</a>${ic('chevR', 13, 2)}<span>${cur}</span></nav>`;
export const cvr = (e, h = 120, cls = '') => `<div class="cvr cv-${D.CATG[e.cat] || 'ceu'} ${cls}" style="height:${h}px">${ic(e.cat === 'Show' ? 'sparkle' : e.cat === 'Curso' ? 'file' : 'ticket', Math.round(h * .38), 1.3)}</div>`;
export const originTag = e => D.orgOf(e.org).via === 'alva' ? `<span class="otag alva">${ic('home', 11, 2.2)}Alva</span>` : `<span class="otag">VEM</span>`;
export const EV_ST = { publicado: ['pago', 'Publicado'], rascunho: ['neutro', 'Rascunho'], encerrado: ['transf', 'Encerrado'], pausado: ['pendente', 'Vendas pausadas'] };
export const evChip = e => { const s = D.isPast(e) && e.st !== 'rascunho' ? EV_ST.encerrado : EV_ST[e.st]; return chip(s[0], s[1]); };
export const ORD_ST = { pago: ['pago', 'Pago'], pendente: ['pendente', 'Pendente'], cancelado: ['neutro', 'Cancelado'], reembolsado: ['transf', 'Reembolsado'] };
export const ordChip = o => chip(...ORD_ST[o.st]);
export const orgOf = () => D.orgOf(S.org);
export const myEvents = () => D.EVENTS.filter(e => e.org === S.org);
/* simula o clique com progresso do botão e depois executa */
export function later(btn, ms, fn) { if (!btn) return fn(); const html = btn.innerHTML; btn.disabled = true; btn.classList.add('is-busy'); btn.innerHTML = `<span class="bl"><i class="bspin"></i>Um instante</span>`; setTimeout(() => { fn(); if (btn.isConnected) { btn.disabled = false; btn.classList.remove('is-busy'); btn.innerHTML = html; } }, ms); }
export const pager = (list, key, size = 12) => { S.pg ||= {}; const max = Math.max(0, Math.ceil(list.length / size) - 1), n = Math.min(S.pg[key] || 0, max); S.pg[key] = n; return { rows: list.slice(n * size, n * size + size), html: list.length > size ? `<nav class="pager"><span class="pg-info">Mostrando <b>${n * size + 1}–${Math.min(list.length, n * size + size)}</b> de <b>${list.length}</b></span><div class="pg-btns"><button class="btn sec sm" data-a="pg" data-v="${key}|-1" ${n === 0 ? 'disabled' : ''}>Anterior</button><button class="btn sec sm" data-a="pg" data-v="${key}|1" ${n === max ? 'disabled' : ''}>Próxima</button></div></nav>` : `<nav class="pager"><span class="pg-info">${list.length} ${list.length === 1 ? 'item' : 'itens'}</span></nav>` }; };
A.pg = v => { const [k, d] = v.split('|'); S.pg[k] = (S.pg[k] || 0) + +d; render(true); };
