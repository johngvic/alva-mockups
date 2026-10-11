/* VEM · web · equipe do evento: painel, portaria (leitura, lista e a pessoa) e modo totem. */
import { $, esc, ic, vemLogo } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { TEAMS } from '../shared/data2.js';
import { evCodes, ckStats, ckFind, ckEval, ckResult, who, todayName } from '../shared/logic.js';
import { S, A, toast, val, fld, ferr, dlg, closeDlg, chip, page, kpis, prog, empty, cvr, render } from './core.js';
import { personDlg, avatar } from './people.js';
import { ckRowsHtml, ckChips, ckCounts } from './org.js';

const evById = id => D.evOf(id);
const me = D.STAFF_ME;

export function staffEventos() {
  const mine = me.events.map(evById).sort((a, b) => (D.isToday(b) - D.isToday(a)) || (a.d < b.d ? -1 : 1)), today = mine.filter(D.isToday), tms = TEAMS.filter(t => t.leader === me.id || t.members.includes(me.id));
  const pend = today.reduce((n, e) => n + D.ordersOf(e).filter(o => o.st === 'pendente').length, 0), miss = today.reduce((n, e) => { const s = ckStats(e); return n + s.n - s.d; }, 0);
  const wd = new Date(D.TODAY + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const first = (today[0] || mine[0] || {}).id;
  const alert = (label, count, a, v) => `<a class="dash-alert" href="#" data-a="${a}" data-v="${v || ''}"><strong>${count}</strong><span>${label}</span><b aria-hidden="true">${ic('arrowR', 15, 2)}</b></a>`;
  const item = (title, detail, a, v, lbl) => `<li><span class="dash-dot"></span><div><b>${title}</b><p>${detail}</p></div><span class="dash-link"><a href="#" data-a="${a}" data-v="${v}">${lbl} →</a></span></li>`;
  return page(`Bom dia, ${esc(me.n.split(' ')[0])}`, `${me.role} · ${esc(D.orgOf(me.org).n)}`, '', wd)
    + `<div class="dash-alerts">${alert('Eventos hoje', today.length, 'stOpen', first)}${alert('Faltam entrar', miss, 'stOpen', first)}${alert('Sem pagamento', pend, 'stOpenBlk', first)}${alert('Suas equipes', tms.length, 'jump', 'st-eq')}</div>`
    + `<section class="card"><h2>Precisa da sua atenção <span class="dash-count">${today.length + (pend ? 1 : 0)}</span></h2>${today.length || pend ? `<ul class="dash-queue">${today.map(e => { const s = ckStats(e); return item(`${esc(e.t)} é hoje`, `${s.d} de ${s.n} entradas · ${D.whenOf(e)} · ${esc(e.venue)}`, 'stOpen', e.id, 'Abrir portaria'); }).join('')}${pend ? item(`${pend} ${pend === 1 ? 'pagamento pendente' : 'pagamentos pendentes'}`, 'Esses códigos não entram até pagar. Oriente a pessoa a concluir o pagamento.', 'stOpenBlk', today[0].id, 'Ver quem é') : ''}</ul>` : empty('Nenhum evento hoje.')}</section>`
    + `<section class="card"><h2>Seus eventos <span class="dash-count">${mine.length}</span></h2><div class="bgrid wide" style="margin-top:6px">${mine.map(e => { const s = ckStats(e), tod = D.isToday(e); return `<button class="bc" data-a="stOpen" data-v="${e.id}"><div class="bc-c">${cvr(e, 100)}${tod ? '<span class="bc-s ok">Hoje</span>' : ''}</div><div class="bc-b"><b>${esc(e.t)}</b><small>${D.whenOf(e)} · ${esc(e.venue)}</small>${prog(s.d, s.n, 'ok')}<div class="bc-f"><span><b style="color:var(--ink)">${s.d}</b> de ${s.n} entradas</span><span class="btn sm">Abrir portaria</span></div></div></button>`; }).join('')}</div></section>`
    + `<section class="card" id="st-eq"><h2>Suas equipes <span class="dash-count">${tms.length}</span></h2>${tms.length ? `<ul class="plist">${tms.map(t => `<li><span class="tm-i">${ic(t.can === 'checkin' ? 'scan' : 'users', 16, 1.9)}</span><span class="grow"><b>${esc(t.n)}${t.leader === me.id ? ' · você é líder' : ''}</b><small>${esc(evById(t.ev).t)} · ${1 + t.members.length} ${1 + t.members.length === 1 ? 'pessoa' : 'pessoas'}</small></span>${t.can === 'checkin' ? chip('pago', 'Check-in') : chip('neutro', 'Sem check-in')}</li>`).join('')}</ul>` : empty('Você ainda não está em nenhuma equipe.')}</section>`;
}
A.jump = v => document.getElementById(v)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ---------- portaria ---------- */
const hits = (e, q) => { const s = String(q).trim().toLowerCase(); if (!s) return []; const seen = new Set(); return evCodes(e).filter(x => (x.c.code.toLowerCase().includes(s) || who(x.o).toLowerCase().includes(s) || x.o.buyer.e.toLowerCase().includes(s)) && !seen.has(x.o.id + x.c.k) && seen.add(x.o.id + x.c.k)); };
export function staffCheckin() {
  const e = evById(S.ckEv); if (!e) { S.screen = 'stEventos'; return staffEventos(); }
  const s = ckStats(e), c = ckCounts(e), found = S.scanQ ? hits(e, S.scanQ).slice(0, 6) : null;
  return `<nav class="crumb"><button class="crumb-bk" data-a="stBack">${ic('chevL', 16, 2.2)}<span>Voltar</span></button><i class="crumb-sep"></i><a href="#" data-a="stBack">Meus eventos</a>${ic('chevR', 13, 2)}<span>${esc(e.t)}</span></nav>`
    + page(`Portaria · ${esc(e.t)}`, `${D.isToday(e) ? 'Hoje' : D.whenOf(e)} · ${esc(e.venue)}${e.checkin === 'periodo' ? ' · hoje vale ' + (todayName() || '—') : ''}`, `<button class="btn sec" data-a="kiosk">${ic('monitor', 16, 2)}Modo totem</button>`, 'Equipe')
    + kpis([['Entradas', `${s.d} / ${s.n}`, s.n ? Math.round(s.d / s.n * 100) + '% dos códigos liberados' : ''], ['Faltam entrar', s.n - s.d, 'códigos liberados'], ['Sem pagamento', c.blk, c.blk ? 'não entram ainda' : 'nenhum travado'], ['Último check-in', (evCodes(e).filter(x => x.at).sort((a, b) => a.at < b.at ? 1 : -1)[0] || { at: '—' }).at, 'ao vivo']])
    + `<section class="card"><h2>Ler código</h2><form id="scanF" class="scan"><input id="sc" placeholder="Código do ingresso, nome ou e-mail" autocomplete="off" value="${esc(S.scanQ || '')}" autofocus><button class="btn" type="submit">${ic('search', 16, 2)}Buscar</button></form>
     <div class="row g2" style="flex-wrap:wrap;margin-top:10px"><span class="foot" style="margin:0">Demonstração:</span><button class="btn sec sm" data-a="stSim" data-v="ok">Simular leitura</button><button class="btn sec sm" data-a="stSim" data-v="used">Já usado</button><button class="btn sec sm" data-a="stSim" data-v="pend">Pagamento pendente</button></div>
     ${found ? (found.length ? `<p class="eb" style="margin:16px 0 8px">${found.length === 1 ? 'Encontrei esta pessoa' : 'Encontrei ' + found.length + ' resultados'}</p><ul class="plist">${found.map(x => `<li><span class="pcell">${avatar(who(x.o))}<span><b>${esc(who(x.o))}</b><small>${esc(x.c.n)} · ${esc(D.tkOf(e, x.o.tk).n)}</small></span></span><span class="grow"></span>${x.at ? chip('pago', 'Entrou às ' + x.at) : x.o.st !== 'pago' ? chip('pendente', 'Pendente') : chip('neutro', 'Aguardando')}<button class="btn sm" data-a="person" data-v="${x.o.id}|${x.c.k}">Abrir</button></li>`).join('')}</ul>` : `<div class="res bad" style="margin-top:16px"><span class="rbig">${ic('x', 30, 2.2)}</span><div><h2>Nenhum resultado</h2><p class="sub">Não achei “${esc(S.scanQ)}” neste evento. Confira o código ou busque pelo nome ou e-mail.</p></div></div>`) : ''}</section>`
    + `<div class="tw"><div class="tools"><input id="ckq" placeholder="Buscar na lista por nome ou código" value="${esc(S.ckq)}" autocomplete="off">${ckChips(e)}</div><div id="ckrows">${ckRowsHtml(e)}</div></div>`;
}
export function kioskView() {
  const e = evById(S.ckEv), k = S.kiosk;
  return `<div class="kiosk"><button class="btn ghost kx" data-a="kioskExit">Sair do totem (equipe)</button>${k && k.ok ? `<div class="kc"><span class="kok">${ic('check', 54, 2.4)}</span><h1>Tudo certo, ${esc(String(k.who).split(' ')[0])}!</h1><p>Retire a sua pulseira com a equipe.<br>Bom evento!</p></div>` : `<div class="kc"><div class="kl">${vemLogo(34)}</div><h1>${esc(e.t)}</h1><p>Digite o código do seu ingresso ou o e-mail da inscrição.</p><form id="kF"><input id="kc" placeholder="Código ou e-mail" autocomplete="off" autofocus value="${esc(k && k.v || '')}"><button class="btn" type="submit">Confirmar entrada</button></form>${k && k.err ? `<p class="kerr">${esc(k.err)}</p>` : ''}<small>Não achou? Fale com a equipe na entrada.</small></div>`}</div>`;
}
Object.assign(A, {
  stOpen: v => { S.ckEv = v; S.ckq = ''; S.ckf = 'todos'; S.scanQ = ''; S.screen = 'stCheckin'; render(); window.scrollTo(0, 0); },
  stOpenBlk: v => { S.ckEv = v; S.ckq = ''; S.ckf = 'blk'; S.scanQ = ''; S.screen = 'stCheckin'; render(); window.scrollTo(0, 0); },
  stBack: () => { S.screen = 'stEventos'; render(); },
  stSim: v => { const e = evById(S.ckEv), all = evCodes(e); let hit = null;
    if (v === 'ok') { const pool = all.filter(x => x.o.st === 'pago' && !x.at && x.c.tag === 'Acesso' && (x.c.k === 'geral' || x.c.k === 'p:' + todayName())); hit = pool[Math.floor(Math.random() * pool.length)]; if (!hit) return toast('Sem códigos para ler: todos já entraram ou o evento não é hoje.', 'bad'); }
    else if (v === 'used') { hit = all.find(x => x.at); if (!hit) return toast('Ninguém entrou ainda.', 'bad'); }
    else if (v === 'pend') { hit = all.find(x => x.o.st === 'pendente'); if (!hit) return toast('Todos os pagamentos estão confirmados.', 'bad'); }
    S.scanQ = ''; openHit(e, hit); },
  kiosk: () => { S.kiosk = {}; S.screen = 'kiosk'; render(); },
  kioskExit: () => { const d = dlg('<h2>Sair do totem</h2><p class="lede">Digite o PIN da equipe. <span class="foot">PIN de demonstração: 1234</span></p>' + fld('pin', 'PIN', { ph: '••••', extra: 'inputmode="numeric" maxlength="4"' }) + '<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="pGo">Sair</button></div>'); $('#pGo', d).addEventListener('click', () => { if (val('pin') !== '1234') return ferr('pin', 'PIN incorreto'); closeDlg(); S.screen = 'stCheckin'; S.kiosk = null; render(); toast('Totem encerrado'); }); },
});
/* a leitura mostra a pessoa, com o resultado e o botão de confirmar */
function openHit(e, hit) { render(true); if (!hit) { toast('Código não encontrado neste evento.', 'bad'); return; } personDlg(hit.o.id, { key: hit.c.k, scan: ckEval(e, hit) }); }
export function staffAfter() {
  const f = $('#scanF'); if (f) f.addEventListener('submit', ev => { ev.preventDefault(); const e = evById(S.ckEv), v = val('sc'); if (!v) return toast('Digite o código, o nome ou o e-mail.', 'bad'); const ex = ckFind(e, v); if (ex && ex.c.code === v.trim().toUpperCase()) { S.scanQ = ''; openHit(e, ex); return; } S.scanQ = v; render(true); const n = $('#sc'); n && n.focus(); });
  const q = $('#ckq'); if (q) q.addEventListener('input', e => { S.ckq = e.target.value; const ev = evById(S.ckEv); $('#ckrows').innerHTML = ckRowsHtml(ev); });
  const k = $('#kF'); if (k) k.addEventListener('submit', ev => { ev.preventDefault(); const e = evById(S.ckEv), v = val('kc'), hit = ckFind(e, v); if (!v) return;
    if (!hit) { S.kiosk = { v, err: 'Não encontramos esse código. Confira o ingresso ou fale com a equipe.' }; return render(true); }
    const r = ckResult(e, hit, 'totem'); if (r.k !== 'ok') { S.kiosk = { v, err: r.t + '. ' + r.d }; return render(true); }
    S.kiosk = { ok: true, who: r.who }; render(true); setTimeout(() => { if (S.kiosk && S.kiosk.ok) { S.kiosk = {}; if (S.screen === 'kiosk') render(true); } }, 3200); });
}
export const staffViews = { stEventos: staffEventos, stCheckin: staffCheckin };
export const staffNav = () => [['Equipe', [['stEventos', 'door', 'Meus eventos']]]];
