/* VEM · web · protótipo. Cinco perfis: organizador (empresa ou igreja via Alva), comprador, equipe do evento e super admin.
   Dados fictícios, sem integração ou persistência. Cobrança e taxas vêm da configuração do Assinaturas. */
import { $, $$, esc, ic, vemLogo, initials } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { ORG_USERS } from '../shared/data2.js';
import { S, A, setRender, toast, closeDlg, dlg, orgOf, myEvents } from './core.js';
import { login, authAfter, enterAs, ENTRY } from './auth.js';
import { overview, eventos, evento, inscricoes, orgAfter, feat } from './org.js';
import { financeiro, recebimento, empresa, comunicacao, equipes } from './fin.js';
import { usuarios, perfis, superOverview, recursos, supers, auditoria, adminAfter } from './admin.js';
import { buyerViews, buyerAfter } from './buyer.js';
import { staffViews, staffNav, staffAfter, kioskView } from './staff.js';
import './people.js';

const ORG_VIEWS = { overview, eventos, evento, inscricoes, financeiro, recebimento, empresa, comunicacao, equipes, usuarios, perfis };
const SUPER_VIEWS = { superOverview, recursos, supers, auditoria };
const orgNav = () => [['Geral', [['overview', 'home', 'Visão geral'], ['eventos', 'calendar', 'Eventos']]], ['Vendas', [['inscricoes', 'users', 'Inscrições'], ['financeiro', 'wallet', 'Financeiro']]], ['Operação', [['equipes', 'scan', 'Equipes e portaria'], ['comunicacao', 'message', 'Comunicação']]], ['Administração', [['usuarios', 'user', 'Usuários e permissões'], ['perfis', 'shield', 'Perfis']]], ['Configuração', [['recebimento', 'card', 'Recebimento'], ['empresa', 'building', 'Organizador']]]];
const superNav = () => [['Plataforma', [['superOverview', 'home', 'Visão geral'], ['recursos', 'sliders', 'Recursos habilitados'], ['supers', 'user', 'Super usuários'], ['auditoria', 'shield', 'Auditoria']]]];

/* ---------- busca (Ctrl K) ---------- */
function cmdItems(q) {
  const s = q.trim().toLowerCase(), out = [];
  if (S.profile === 'org') {
    const pages = [...orgNav().flatMap(([, it]) => it)];
    pages.filter(p => !s || p[2].toLowerCase().includes(s)).forEach(p => out.push({ g: 'Páginas', i: p[1], t: p[2], s: '', a: 'go', v: p[0] }));
    if (s.length >= 2) {
      myEvents().filter(e => (e.t + ' ' + e.city).toLowerCase().includes(s)).slice(0, 5).forEach(e => out.push({ g: 'Eventos', i: 'ticket', t: e.t, s: D.whenOf(e) + ' · ' + e.city, a: 'evento', v: e.id }));
      myEvents().flatMap(D.ordersOf).filter(o => (o.buyer.n + ' ' + o.buyer.e).toLowerCase().includes(s)).slice(0, 6).forEach(o => out.push({ g: 'Pessoas e inscrições', i: 'user', t: o.buyer.n, s: D.evOf(o.ev).t + ' · ' + o.buyer.e, a: 'person', v: o.id }));
    }
  } else if (S.profile === 'super') SUPER_NAV_ITEMS().filter(p => !s || p[2].toLowerCase().includes(s)).forEach(p => out.push({ g: 'Páginas', i: p[1], t: p[2], s: '', a: 'go', v: p[0] }));
  else if (S.profile === 'staff') D.STAFF_ME.events.map(D.evOf).filter(e => !s || e.t.toLowerCase().includes(s)).forEach(e => out.push({ g: 'Eventos', i: 'door', t: 'Portaria · ' + e.t, s: D.whenOf(e), a: 'stOpen', v: e.id }));
  return out;
}
const SUPER_NAV_ITEMS = () => superNav().flatMap(([, it]) => it);
A.cmdOpen = () => {
  if (!['org', 'super', 'staff'].includes(S.profile)) return; S.cmdSel = 0;
  const d = dlg(`<div class="cmdh">${ic('search', 18, 2)}<input id="cmdq" placeholder="Buscar evento, pessoa ou página" autocomplete="off"><kbd>Esc</kbd></div><div id="cmdl" class="cmdl"></div>`);
  const paint = () => { const it = cmdItems($('#cmdq').value); window.__cmd = it; let g = ''; $('#cmdl').innerHTML = it.length ? it.map((x, i) => `${x.g !== g ? `<p class="cmdg">${g = x.g}</p>` : ''}<button class="cmdi ${i === S.cmdSel ? 'on' : ''}" data-i="${i}">${ic(x.i, 17, 2)}<span class="grow"><b>${esc(x.t)}</b>${x.s ? `<small>${esc(x.s)}</small>` : ''}</span></button>`).join('') : '<div class="empty">Nada encontrado.</div>'; };
  const pick = i => { const x = window.__cmd[i]; if (!x) return; closeDlg(); A[x.a](x.v, null, null); };
  $('#cmdq').addEventListener('input', () => { S.cmdSel = 0; paint(); });
  $('#cmdq').addEventListener('keydown', e => { const n = (window.__cmd || []).length; if (e.key === 'ArrowDown') { S.cmdSel = (S.cmdSel + 1) % Math.max(1, n); paint(); e.preventDefault(); } else if (e.key === 'ArrowUp') { S.cmdSel = (S.cmdSel - 1 + n) % Math.max(1, n); paint(); e.preventDefault(); } else if (e.key === 'Enter') { pick(S.cmdSel); e.preventDefault(); } });
  $('#cmdl').addEventListener('click', e => { const b = e.target.closest('.cmdi'); if (b) pick(+b.dataset.i); });
  paint(); $('#cmdq').focus();
};
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); A.cmdOpen(); } });

/* ---------- shell do painel (organizador, equipe e super admin) ---------- */
function adminShell(nav, views) {
  const org = orgOf(), staff = S.profile === 'staff', sup = S.profile === 'super';
  const who = sup ? { n: 'Tiago Borges', e: 'tiago@alva.app' } : staff ? D.STAFF_ME : ORG_USERS.find(u => u.org === S.org && u.perfil === 'p1') || { n: org.owner, e: org.email };
  const cur = S.screen === 'stCheckin' ? 'stEventos' : S.screen === 'evento' ? 'eventos' : S.screen;
  const navItem = ([k, i, l]) => `<button data-a="go" data-v="${k}" ${cur === k ? 'aria-current="page"' : ''}>${ic(i, 18, 1.9)}<span>${l}</span></button>`;
  const body = (views[S.screen] || views[Object.keys(views)[0]])();
  const orgs = (S.profile === 'org') ? D.ORGS.filter(o => o.via === org.via && (org.via === 'alva' ? ['o1', 'o2'].includes(o.id) : [o.id].includes(S.org))) : [];
  const card = sup ? `<div class="orgc"><span class="oav" style="background:var(--st-sol-bg);color:var(--st-sol)">${ic('shield', 18, 2)}</span><span class="grow"><b>Plataforma VEM</b><small>Super admin</small></span></div>` : `<div class="orgc"><span class="oav">${initials(staff ? D.orgOf(D.STAFF_ME.org).n : org.n)}</span><span class="grow"><b>${esc(staff ? D.orgOf(D.STAFF_ME.org).n : org.n)}</b><small>${staff ? D.STAFF_ME.role : org.via === 'alva' ? 'Igreja · via Alva' : 'Empresa'}</small></span>${orgs.length > 1 ? `<button class="ibtn sm" data-a="orgSwitch" aria-label="Trocar organizador">${ic('updown', 15, 2)}</button>` : ''}</div>`;
  return `<div class="app"><aside class="side" id="side" aria-label="Menu"><div class="brand">${vemLogo(24)}<button class="ibtn side-x" data-a="navClose" aria-label="Fechar menu">${ic('x', 16, 2.2)}</button></div><p class="brand-sub">${sup ? 'Super admin' : staff ? 'Equipe do evento' : 'Painel do organizador'}</p>${card}
  <button class="sbtn" data-a="cmdOpen">${ic('search', 17, 2)}<span>Buscar</span><kbd>${/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'} K</kbd></button>
  <nav class="nv" aria-label="Principal">${nav.map(([g, items]) => `<p class="nv-h">${g}</p>${items.map(navItem).join('')}`).join('')}</nav>
  <div class="who-w"><button class="who" data-a="logout" title="Sair"><span class="av" aria-hidden="true">${initials(who.n)}</span><span class="who-t"><b>${esc(who.n)}</b><small>Sair da conta</small></span>${ic('logout', 16, 2)}</button><button class="ibtn th" data-a="theme" aria-label="Trocar tema">${ic(document.documentElement.dataset.theme === 'noite' ? 'sun' : 'moon', 16, 2)}</button></div></aside><div class="veil" data-a="navClose"></div>
  <div class="shell"><header class="topbar"><button class="ibtn" data-a="navOpen" aria-label="Abrir menu">${ic('menu', 18, 2)}</button>${vemLogo(20)}<span class="tb-sp"></span><button class="ibtn" data-a="cmdOpen" aria-label="Buscar">${ic('search', 17, 2)}</button></header><main id="main"><div class="wrap">${body}</div></main></div></div>`;
}
A.orgSwitch = () => { const ids = D.ORGS.filter(o => ['o1', 'o2'].includes(o.id)); S.org = S.org === 'o1' ? 'o2' : 'o1'; S.screen = 'overview'; S.evId = null; S.pg = {}; toast('Agora em ' + D.orgOf(S.org).n); S.render(); };

/* ---------- shell público (comprador) ---------- */
function pubShell() {
  const buyer = S.profile === 'buyer', cur = S.screen === 'bEvento' ? 'descobrir' : S.screen;
  const body = buyerViews[S.screen] ? buyerViews[S.screen]() : buyerViews.descobrir();
  return `<div class="pub"><header class="ptop"><div class="ptop-in"><button class="plg" data-a="go" data-v="descobrir" aria-label="VEM, início">${vemLogo(24)}</button><nav aria-label="Principal">${[['descobrir', 'Descobrir'], ['ingressos', 'Meus ingressos']].map(([k, l]) => `<button data-a="go" data-v="${k}" ${cur === k ? 'aria-current="page"' : ''}>${l}</button>`).join('')}</nav><span class="tb-sp"></span><button class="ibtn" data-a="theme" aria-label="Trocar tema">${ic(document.documentElement.dataset.theme === 'noite' ? 'sun' : 'moon', 16, 2)}</button>${buyer ? `<button class="pu" data-a="go" data-v="perfil"><span class="av">${initials(D.BUYER.n)}</span><span>${esc(D.BUYER.n.split(' ')[0])}</span></button><button class="btn ghost sm" data-a="logout">Sair</button>` : `<button class="btn sm" data-a="logout">Entrar</button>`}</div></header><main>${body}</main><footer class="pfoot">VEM · um produto Alva · protótipo com dados fictícios</footer></div>`;
}

A.go = v => { if (S.profile === 'visitor' && ['ingressos', 'perfil'].includes(v)) { toast('Entre na sua conta para ver seus ingressos.', 'bad'); return; } S.screen = v; S.pg = {}; if (v === 'eventos') S.evId = null; S.render(); window.scrollTo(0, 0); };
A.navOpen = () => $('#side')?.classList.add('open'); A.navClose = () => $('#side')?.classList.remove('open');
A.theme = () => { S.theme = document.documentElement.dataset.theme === 'noite' ? 'dia' : 'noite'; try { localStorage.setItem('vem-web-theme', S.theme); } catch (e) { /* sem storage */ } S.render(true); };

function render(keep) {
  document.documentElement.dataset.theme = S.theme === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'noite' : 'dia') : S.theme;
  const y = window.scrollY; let html, after = () => { };
  if (!S.profile) { html = login(); after = authAfter; }
  else if (S.profile === 'org') { if (!ORG_VIEWS[S.screen]) S.screen = 'overview'; html = adminShell(orgNav(), ORG_VIEWS); after = () => { orgAfter(); adminAfter(); }; }
  else if (S.profile === 'super') { if (!SUPER_VIEWS[S.screen]) S.screen = 'superOverview'; html = adminShell(superNav(), SUPER_VIEWS); after = adminAfter; }
  else if (S.profile === 'staff') { if (!staffViews[S.screen] && S.screen !== 'kiosk') S.screen = 'stEventos'; html = S.screen === 'kiosk' ? kioskView() : adminShell(staffNav(), staffViews); after = staffAfter; }
  else { if (!buyerViews[S.screen]) S.screen = 'descobrir'; html = pubShell(); after = buyerAfter; }
  $('#root').innerHTML = html; after();
  $$('.tw table').forEach(tb => { const hs = $$('thead th', tb).map(th => th.textContent.trim()); $$('tbody tr', tb).forEach(tr => [...tr.children].forEach((td, i) => { if (!td.hasAttribute('colspan')) td.dataset.label = hs[i] || ''; })); });
  const T = { overview: 'Visão geral', eventos: 'Eventos', evento: 'Evento', inscricoes: 'Inscrições', financeiro: 'Financeiro', equipes: 'Equipes', comunicacao: 'Comunicação', usuarios: 'Usuários e permissões', perfis: 'Perfis', recebimento: 'Recebimento', empresa: 'Organizador', descobrir: 'Descobrir', bEvento: 'Evento', ingressos: 'Meus ingressos', perfil: 'Perfil', stEventos: 'Meus eventos', stCheckin: 'Portaria', kiosk: 'Totem', superOverview: 'Plataforma', recursos: 'Recursos habilitados', supers: 'Super usuários', auditoria: 'Auditoria' };
  document.title = S.profile ? 'VEM · ' + (T[S.screen] || 'protótipo') : 'Entrar · VEM';
  if (keep) window.scrollTo(0, y);
}
setRender(render); S.render = render;

document.addEventListener('click', e => { const t = e.target.closest('[data-a]'); if (!t || t.matches('select')) return; const f = A[t.dataset.a]; if (!f) return; if (!t.matches('input[type=checkbox]')) e.preventDefault(); f(t.dataset.v ?? '', t, e); });
document.addEventListener('change', e => { const t = e.target.closest('select[data-a]'); if (t && A[t.dataset.a]) A[t.dataset.a](t.value, t); });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('tr.row')) e.target.click(); if (e.key === 'Escape') { closeDlg(); A.navClose(); } });

const q = new URLSearchParams(location.search);
if (q.get('theme')) S.theme = q.get('theme');
if (q.get('profile')) { const k = ENTRY.findIndex(x => x[0] === q.get('profile') && (!q.get('org') || x[1] === q.get('org'))); if (k >= 0) A.enter(k); else if (q.get('profile') === 'visitor') A.enterGuest(); }
if (q.get('screen') && S.profile) S.screen = q.get('screen');
if (q.get('ev')) { S.evId = q.get('ev'); S.buyEv = q.get('ev'); S.ckEv = q.get('ev'); if (S.profile === 'org' && !q.get('screen')) S.screen = 'evento'; } if (q.get('tab')) S.evTab = q.get('tab');
if (q.get('person') && S.profile) A.person(q.get('person'));
if (q.get('step')) { S.au = { step: q.get('step'), tab: 'senha', email: q.get('email') || '', acct: null }; }
render();
