/* VEM · web · organizador (empresa ou igreja via Alva): painel, eventos, ingressos, inscrições e check-in. */
import { $, $$, esc, ic, initials } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { couponOk, FLAGS } from '../shared/data2.js';
import { evCodes, ckStats, todayName, who } from '../shared/logic.js';
import { S, A, toast, val, fld, ferr, fclear, dlg, closeDlg, confirmAct, chip, note, page, kpis, tabs, bars, hbars, prog, empty, crumb, cvr, originTag, evChip, ordChip, orgOf, myEvents, pager, render } from './core.js';
import { avatar } from './people.js';
import { evxTabs, evxTabList } from './evx.js';

export const ro = e => D.orgOf(e.org).via === 'alva';
export const evById = id => D.evOf(id);
export const cur = () => evById(S.evId);
export const stOf = e => D.stats(e);
export const orgOrders = () => myEvents().flatMap(D.ordersOf);
export const feat = k => FLAGS[S.org] ? FLAGS[S.org][k] !== false : true;
const live = os => os.filter(o => o.st === 'pago' || o.st === 'pendente');
const roNote = e => ro(e) ? note('home', `Este evento é gerenciado no <b>Alva</b>. Ingressos, compras e cupons são editados lá; aqui você acompanha vendas, equipe e portaria. <button class="btn sec sm" data-a="openAlva">Abrir no Alva</button>`) : '';
const days = n => Array.from({ length: n }, (_, i) => D.addDays(D.TODAY, i - n + 1));
const cntBy = (os, d) => os.filter(o => o.at === d && (o.st === 'pago' || o.st === 'pendente')).length;
export const dayBars = os => bars(days(14).map(d => [d.slice(8), cntBy(os, d), String(cntBy(os, d))]));
const needs = e => D.missing(e);
export const MON_ABR = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const kfmt = v => v >= 10000 ? 'R$ ' + (v / 1000).toFixed(1).replace('.', ',') + ' mil' : D.moneyS(Math.round(v));
export const lastMonths = n => { const b = new Date(D.TODAY + 'T12:00:00'); return Array.from({ length: n }, (_, i) => { const d = new Date(b.getFullYear(), b.getMonth() - (n - 1 - i), 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; }); };
const greet = () => 'Bom dia';

/* ---------- visão geral (dashboard) ---------- */
export function overview() {
  const evs = myEvents(), org = orgOf(), st = evs.map(stOf), sum = k => st.reduce((a, s) => a + s[k], 0);
  const upcoming = evs.filter(e => !D.isPast(e) && e.st !== 'rascunho').sort((a, b) => a.d < b.d ? -1 : 1), drafts = evs.filter(e => e.st === 'rascunho'), paused = evs.filter(e => e.st === 'pausado' && !D.isPast(e));
  const pends = evs.filter(e => !D.isPast(e) && stOf(e).pend).map(e => ({ e, n: stOf(e).pend, v: stOf(e).toRec })), nPend = pends.reduce((a, x) => a + x.n, 0);
  const today = evs.filter(D.isToday), week = upcoming.filter(e => D.diffDays(e.d, D.TODAY) <= 7);
  const low = upcoming.filter(e => e.cap && stOf(e).sold / e.cap < .3 && D.diffDays(e.d, D.TODAY) <= 20 && D.diffDays(e.d, D.TODAY) > 0);
  const item = (title, detail, sub, a, v, lbl) => `<li><span class="dash-dot"></span><div><b>${title}</b><p>${detail}</p>${sub ? `<small>${sub}</small>` : ''}</div><span class="dash-link"><a href="#" data-a="${a}" data-v="${v}">${lbl} →</a></span></li>`;
  const section = (id, title, items, blank) => `<section class="card" id="${id}"><h2>${title} <span class="dash-count">${items.length}</span></h2>${items.length ? `<ul class="dash-queue">${items.join('')}</ul>` : empty(blank)}</section>`;
  const alert = (anchor, label, count) => `<a class="dash-alert" href="#${anchor}" data-a="jump" data-v="${anchor}"><strong>${count}</strong><span>${label}</span><b aria-hidden="true">${ic('arrowR', 15, 2)}</b></a>`;
  const wd = new Date(D.TODAY + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const header = page(`${greet()}, ${esc(org.owner.split(' ')[0])}`, org.via === 'alva' ? `${esc(org.n)} · eventos que vêm do Alva, com vendas, portaria e financeiro.` : `${esc(org.n)} · vendas e inscrições dos seus eventos.`, '', wd);
  const ms = lastMonths(6), byM = ms.map(m => [MON_ABR[+m.slice(5) - 1], live(orgOrders()).filter(o => o.at.startsWith(m) && o.st === 'pago').reduce((a, o) => a + D.total(evById(o.ev), o), 0)]);
  return header + (org.via === 'alva' ? note('home', 'Os eventos desta igreja são criados e editados no <b>Alva</b> e aparecem aqui e no app do VEM automaticamente.') : '')
    + kpis([['Ingressos vendidos', sum('sold').toLocaleString('pt-BR'), `${sum('paid')} pagos`], ['Receita bruta', D.money(sum('gross')), 'pagamentos confirmados'], ['Líquido', D.money(sum('net')), `após ${D.money(sum('fees'))} de taxas`], ['A receber', D.money(sum('toRec')), `${sum('pend')} pagamentos pendentes`]])
    + `<div class="dash-alerts">${alert('dash-pend', 'Pagamentos pendentes', nPend)}${alert('dash-draft', 'Rascunhos para publicar', drafts.length)}${alert('dash-week', 'Eventos nos próximos 7 dias', week.length)}${alert('dash-low', 'Vendas abaixo do esperado', low.length + paused.length)}</div>`
    + section('dash-pend', 'Pagamentos pendentes', pends.map(x => item(esc(x.e.t), `${x.n} ${x.n === 1 ? 'pagamento pendente' : 'pagamentos pendentes'} · ${D.money(x.v)} a receber`, 'Sem pagar, o QR Code fica bloqueado.', 'evTabGo', x.e.id + '|inscricoes', 'Ver inscrições')), 'Nenhum pagamento pendente.')
    + `<div class="g2">${section('dash-draft', 'Rascunhos para publicar', drafts.map(e => item(esc(e.t), needs(e).length ? 'Falta ' + needs(e).join(', ') : 'Pronto para publicar', D.whenOf(e), 'evTabGo', e.id + '|resumo', 'Abrir evento')), 'Nenhum rascunho.')}
    ${section('dash-low', 'Atenção nas vendas', [...low.map(e => item(esc(e.t), `${stOf(e).sold} de ${e.cap} ingressos a ${D.diffDays(e.d, D.TODAY)} dias do evento`, 'Que tal um cupom ou um banner no Descobrir?', 'evTabGo', e.id + '|comunicacao', 'Divulgar')), ...paused.map(e => item(esc(e.t), 'Vendas pausadas', D.whenOf(e), 'evTabGo', e.id + '|resumo', 'Retomar'))], 'Tudo no ritmo esperado.')}</div>`
    + `<section class="card" id="dash-week"><h2>Próximos eventos <span class="dash-count">${upcoming.length}</span></h2>${upcoming.length ? `<ul class="evl">${upcoming.slice(0, 6).map(e => { const s = stOf(e); return `<li><button data-a="evento" data-v="${e.id}"><span class="dtile"><b>${+e.d.slice(8)}</b><small>${D.MON[+e.d.slice(5, 7) - 1]}</small></span><span class="grow"><b>${esc(e.t)}</b><small>${D.whenOf(e)} · ${s.sold}${e.cap ? ' de ' + e.cap : ''} ingressos · ${D.money(s.net)} líquido</small>${prog(s.sold, e.cap)}</span>${ic('chevR', 15, 2.2)}</button></li>`; }).join('')}</ul>` : empty('Nenhum evento próximo.')}</section>`
    + `<div class="g2"><section class="card"><h2>Vendas nos últimos 14 dias</h2>${dayBars(orgOrders())}</section><section class="card"><h2>Líquido por mês</h2>${bars(byM.map(([l, v]) => [l, v, kfmt(v)]))}</section></div>`;
}
A.jump = v => document.getElementById(v)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
A.evTabGo = v => { const [id, tab] = v.split('|'); S.evId = id; S.evTab = tab; S.screen = 'evento'; resetEv(); render(); window.scrollTo(0, 0); };
const resetEv = () => { S.iq = ''; S.iqs = 'todos'; S.iqt = 'todos'; S.iqc = 'todos'; S.ckq = ''; S.ckf = 'todos'; S.pg = {}; S.cxv = null; S.bdv = null; };

/* ---------- lista de eventos ---------- */
export function eventos() {
  const q = S.q.trim().toLowerCase(), all = myEvents(), church = D.orgOf(S.org).via === 'alva';
  const l = all.filter(e => (S.ef === 'todos' || (S.ef === 'encerrado' ? D.isPast(e) && e.st !== 'rascunho' : S.ef === e.st && !D.isPast(e))) && (!q || (e.t + ' ' + e.city).toLowerCase().includes(q))).sort((a, b) => a.d < b.d ? 1 : -1);
  const cnt = k => all.filter(e => k === 'todos' || (k === 'encerrado' ? D.isPast(e) && e.st !== 'rascunho' : e.st === k && !D.isPast(e))).length;
  return page('Eventos', church ? 'Os eventos criados no Alva aparecem aqui sozinhos.' : 'Crie, publique e acompanhe os seus eventos.', church ? `<button class="btn sec" data-a="openAlva">${ic('home', 16, 2)}Criar no Alva</button>` : `<button class="btn" data-a="newEvent">${ic('plus', 16, 2.2)}Novo evento</button>`, 'Geral')
    + `<div class="tw"><div class="tools"><input id="q" placeholder="Buscar por nome ou cidade" value="${esc(S.q)}" autocomplete="off"><select data-a="ef" aria-label="Situação">${[['todos', 'Todos'], ['publicado', 'Publicados'], ['rascunho', 'Rascunhos'], ['pausado', 'Vendas pausadas'], ['encerrado', 'Encerrados']].map(([k, t]) => `<option value="${k}" ${S.ef === k ? 'selected' : ''}>${t} (${cnt(k)})</option>`).join('')}</select></div>
    ${l.length ? `<table><thead><tr><th>Evento</th><th>Data</th><th>Situação</th><th>Vendidos</th><th class="r">Líquido</th></tr></thead><tbody>${l.map(e => { const s = stOf(e); return `<tr class="row" tabindex="0" data-a="evento" data-v="${e.id}"><td><b>${esc(e.t)}</b> ${originTag(e)}<small>${esc(e.city)}, ${e.uf} · ${esc(e.cat)}</small></td><td>${D.whenOf(e)}<small>${e.time}</small></td><td>${evChip(e)}</td><td><span class="num">${s.sold}${e.cap ? ' / ' + e.cap : ''}</span>${prog(s.sold, e.cap)}</td><td class="r num">${D.money(s.net)}</td></tr>`; }).join('')}</tbody></table>` : empty('Nenhum evento corresponde a esse filtro.')}</div>`;
}

/* ---------- evento ---------- */
const BASE_TABS = e => [['resumo', 'Resumo'], ['detalhes', 'Detalhes'], ['ingressos', 'Ingressos', e.tickets.length], ['compras', 'Compras adicionais', e.items.length], ...(feat('cupons') ? [['cupons', 'Cupons', e.coupons.length]] : []), ['inscricoes', 'Inscrições', stOf(e).sold], ...(e.checkin !== 'off' ? [['checkin', 'Check-in', stOf(e).used]] : [])];
const TAB_END = e => [['financeiro', 'Financeiro'], ['divulgacao', 'Divulgação']];
export const ETABS = e => [...BASE_TABS(e), ...evxTabList(e, feat), ...TAB_END(e)];
export function evento() {
  const e = cur(); if (!e) { S.screen = 'eventos'; return eventos(); }
  if (!ETABS(e).some(t => t[0] === S.evTab)) S.evTab = 'resumo';
  const body = ({ resumo: tResumo, detalhes: tDetalhes, ingressos: tIngressos, compras: tCompras, cupons: tCupons, inscricoes: tInsc, checkin: tCheckin, financeiro: tFin, divulgacao: tDiv, ...evxTabs })[S.evTab](e);
  const pausable = e.st === 'pausado';
  const acts = ro(e) ? `<button class="btn sec" data-a="openAlva">${ic('home', 16, 2)}Editar no Alva</button>` : (e.st === 'rascunho' ? `<button class="btn" data-a="publish">${ic('globe', 16, 2)}Publicar</button>` : D.isPast(e) ? '' : pausable ? `<button class="btn" data-a="resume">Retomar vendas</button>` : `<button class="btn sec" data-a="pause">Pausar vendas</button>`);
  return crumb('eventos', 'Eventos', esc(e.t)) + `<div class="evh"><div class="evh-c">${cvr(e, 96)}</div><div class="evh-t"><div class="row g2">${evChip(e)}${originTag(e)}<span class="pill">${esc(e.cat)}</span></div><h1>${esc(e.t)}</h1><p>${D.whenOf(e)} · ${e.time} · ${esc(e.venue || 'Local a definir')} · ${esc(e.city)}, ${e.uf}</p></div><div class="evh-a">${acts}<button class="btn sec" data-a="preview" data-v="${e.id}">${ic('eye', 16, 2)}Ver página pública</button></div></div>`
    + tabs(ETABS(e), S.evTab, 'evTab') + `<div class="evb">${body}</div>`;
}
A.evTab = v => { S.evTab = v; render(); };

function tResumo(e) {
  const s = stOf(e), ck = ckStats(e), miss = needs(e), byT = e.tickets.map(t => [t.n, D.tkSold(e, t), String(D.tkSold(e, t))]);
  return roNote(e) + kpis([['Vendidos', `${s.sold}${e.cap ? ' / ' + e.cap : ''}`, `${s.paid} pagos · ${s.pend} pendentes`], ['Líquido', D.money(s.net), `bruto ${D.money(s.gross)}`], ['Check-ins', e.checkin === 'off' ? '—' : `${ck.d} / ${ck.n}`, e.checkin === 'off' ? 'sem controle de entrada' : 'entradas confirmadas'], ['A receber', D.money(s.toRec), 'pagamentos pendentes']])
    + `<div class="g2"><section class="card"><h2>Vendas por dia</h2>${dayBars(D.ordersOf(e))}</section><section class="card"><h2>Por ingresso</h2>${byT.length ? hbars(byT) : empty('Sem ingressos.')}</section></div>`
    + (e.st === 'rascunho' ? `<section class="card"><h2>Para publicar</h2>${miss.length ? note('alert', `Falta preencher: <b>${miss.join(', ')}</b>.`, 'warn') : note('check', 'Tudo pronto. Publique para abrir as vendas.', 'ok')}<button class="btn" data-a="publish">Publicar evento</button></section>` : '');
}

/* ---------- detalhes: mesmo desenho do Alva ---------- */
const COUNTRIES = ['Brasil', 'Portugal', 'Estados Unidos', 'Argentina', 'Paraguai', 'Uruguai', 'Outro'];
const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const stateField = (id, country, v) => country === 'Brasil' ? fld(id, 'Estado', { opts: [['', 'Escolha'], ...UFS.map(u => [u, u])], v }) : fld(id, 'Estado ou região', { v });
const priceRange = e => { const p = e.tickets.filter(t => !t.off).map(t => +t.price || 0); if (!p.length) return 'sem ingressos'; const m = Math.min(...p), M = Math.max(...p); return !M ? 'Gratuita' : m === M ? D.money(m) : `de ${D.money(m)} a ${D.money(M)}`; };
const paid = e => e.tickets.some(t => t.price > 0);
function tDetalhes(e) {
  const r = ro(e), row = (i, tone, l, main, sub, edit) => `<div class="evi-r"><span class="htile" style="background:var(--t${tone});color:var(--t${tone}i)">${ic(i, 17, 2)}</span><span class="grow"><span class="evi-l">${l}</span><b>${main}</b>${sub ? `<span>${sub}</span>` : ''}</span></div>`;
  const info = `<section class="card"><div class="sh"><h2>Informações</h2>${r ? '' : `<button class="btn sec sm" data-a="evEditDlg">${ic('pen', 14, 2)}Editar</button>`}</div><div class="evi-g">${row('calendar', 'ceu', 'Quando', D.whenOf(e), e.time + (e.periods.length ? ' · ' + e.periods.join(' e ') : ''))}${row('pin', 'menta', 'Onde', esc(e.venue || 'Local a definir'), `${esc(e.city)}, ${e.uf}${e.country && e.country !== 'Brasil' ? ' · ' + esc(e.country) : ''}`)}${row('ticket', 'damasco', 'Categoria', esc(e.cat), r ? 'Evento da igreja' : 'Evento do organizador')}${row('users', 'lima', 'Capacidade', e.cap ? e.cap + ' vagas' : 'Sem limite', `${stOf(e).sold} inscritos`)}</div>${e.desc ? `<p class="evi-d">${esc(e.desc)}</p>` : '<p class="evi-d mute">Sem descrição ainda.</p>'}</section>`;
  const insc = `<section class="card"><div class="sh"><h2>Inscrição</h2>${chip(paid(e) ? 'transf' : 'pago', paid(e) ? 'Paga' : 'Gratuita')}</div><p class="foot" style="margin:-6px 0 12px">${paid(e) ? `Ingressos ${priceRange(e)}. A cobrança usa a configuração de pagamentos do Assinaturas.` : 'Qualquer pessoa se inscreve sem pagar.'}</p>
    <div class="tg">${e.tickets.map(t => `<div class="tg-r ${t.off ? 'off' : ''}"><span class="grow"><b>${esc(t.n)}</b>${t.off ? ' <span class="st neutro">Pausado</span>' : ''}<small>${esc(t.desc || '')}</small></span><span class="tg-p"><b class="num">${t.price ? D.money(t.price) : 'Grátis'}</b><small>${D.tkSold(e, t)}${t.cap ? '/' + t.cap : ''} inscritos</small></span></div>`).join('')}</div>
    <div style="margin-top:12px"><button class="btn sec sm" data-a="evTab" data-v="ingressos">${ic('ticket', 14, 2)}Gerenciar ingressos</button></div></section>`;
  const ck = `<section class="card"><div class="sh"><h2>Check-in</h2></div><p class="foot" style="margin:-6px 0 12px">Define os códigos que cada ingresso gera. A leitura é feita pela equipe, no app do VEM.</p>
    <div class="vis3" id="ckSeg">${[['off', 'Desligado', 'Sem controle de entrada.'], ['inteiro', 'Evento inteiro', 'Um código vale o evento todo.'], ['periodo', 'Por período', 'Um código por dia ou turno.']].map(([k, l, s]) => `<label class="${r ? 'ro' : ''}"><input type="radio" name="ck" value="${k}" ${e.checkin === k ? 'checked' : ''} ${r ? 'disabled' : `data-a="dCk" data-v="${k}"`}><span><b>${l}</b><small>${s}</small></span></label>`).join('')}</div>
    ${e.checkin === 'periodo' ? `<div class="pers" style="margin-top:12px">${e.periods.map((p, i) => `<div class="per"><span class="pn">${esc(p)}</span>${r ? '' : `<button class="ibtn sm" data-a="perDel" data-v="${i}" aria-label="Remover ${esc(p)}">${ic('x', 14, 2)}</button>`}</div>`).join('') || '<p class="muted2">Nenhum período ainda.</p>'}${r ? '' : `<form class="perF" id="perF"><input placeholder="Ex.: Sábado" aria-label="Novo período" autocomplete="off"><button class="btn sec sm" type="submit">${ic('plus', 13, 2.2)}Adicionar período</button></form>`}</div>` : ''}</section>`;
  const comp = `<section class="card"><div class="sh"><h2>Compras adicionais</h2></div>${e.items.length ? `<div class="tg">${e.items.map(i => `<div class="tg-r ${i.off ? 'off' : ''}"><span class="grow"><b>${esc(i.n)}</b><small>${esc(i.p || 'Evento inteiro')}</small></span><b class="num">${D.money(i.price)}</b></div>`).join('')}</div>` : '<p class="muted2" style="margin:0 0 4px">Nenhum item ainda.</p>'}<div style="margin-top:12px"><button class="btn sec sm" data-a="evTab" data-v="compras">Gerenciar compras</button></div></section>`;
  return roNote(e) + `<div class="g2"><div>${info}${insc}</div><div>${ck}${comp}${divSummary(e)}</div></div>`;
}
const divSummary = e => { const miss = needs(e); return `<section class="card"><div class="sh"><h2>Divulgação no VEM</h2>${e.st === 'publicado' || e.st === 'pausado' ? chip(miss.length ? 'pendente' : 'pago', miss.length ? 'Incompleto' : 'Publicado') : chip('neutro', 'Rascunho')}</div><p class="foot" style="margin:-6px 0 12px">${miss.length ? 'Falta ' + miss.join(', ') + ' para aparecer no app.' : 'Página pública e destaque no app configurados.'}</p><button class="btn sec sm" data-a="evTab" data-v="divulgacao">Ver divulgação</button></section>`; };
A.dCk = v => { cur().checkin = v; render(true); };
A.perDel = v => { const e = cur(); e.periods.splice(+v, 1); e.tickets.forEach(t => { t.per = t.per.filter(p => e.periods.includes(p)); }); render(true); };
A.evEditDlg = () => {
  const e = cur(), c0 = e.country || 'Brasil';
  const d = dlg(`<h2>Editar evento</h2><p class="lede">${esc(e.t)}</p><div class="fgrid2">${fld('dT', 'Título', { v: e.t })}${fld('dC', 'Categoria', { v: e.cat, opts: D.CATS.map(c => [c, c]) })}${fld('dD', 'Data de início', { type: 'date', v: e.d })}${fld('dD2', 'Data de término', { type: 'date', v: e.d2, hint: 'Em branco para um dia só.' })}${fld('dH', 'Horário', { v: e.time })}${fld('dK', 'Capacidade', { type: 'number', v: e.cap || '', hint: 'Em branco = sem limite.' })}${fld('dV', 'Local', { v: e.venue })}${fld('dP', 'País', { v: c0, opts: COUNTRIES.map(c => [c, c]) })}<div id="dUfW">${stateField('dU', c0, e.uf)}</div>${fld('dCi', 'Cidade', { v: e.city })}</div>${fld('dDe', 'Descrição', { ta: 1, v: e.desc, ph: 'O que a pessoa precisa saber para se inscrever.' })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="dGo">Salvar alterações</button></div>`, true);
  $('#dP', d).addEventListener('change', () => { $('#dUfW', d).innerHTML = stateField('dU', val('dP'), ''); });
  $('#dGo', d).addEventListener('click', () => {
    fclear(); const t = val('dT'); if (!t) return ferr('dT', 'Informe o título'); const dd = val('dD'); if (!dd) return ferr('dD', 'Escolha a data'); const d2 = val('dD2'); if (d2 && d2 < dd) return ferr('dD2', 'Depois da data de início');
    Object.assign(e, { t, cat: val('dC'), d: dd, d2, time: val('dH') || e.time, venue: val('dV'), country: val('dP'), city: val('dCi'), uf: val('dU').toUpperCase().slice(0, 3), cap: +val('dK') || 0, desc: val('dDe') });
    closeDlg(); render(true); toast('Alterações salvas');
  });
};

/* ---------- ingressos ---------- */
function tIngressos(e) {
  const r = ro(e);
  return roNote(e) + `<section class="card"><div class="sh"><h2>Tipos de ingresso</h2>${r ? '' : `<button class="btn sec sm" data-a="tkNew">${ic('plus', 14, 2.2)}Novo ingresso</button>`}</div><p class="foot">O que a pessoa escolhe ao se inscrever. Ingresso com inscritos não se apaga: pause a venda.</p>
  <div class="tg">${e.tickets.map(t => { const sold = D.tkSold(e, t), inc = t.incl.map(id => D.itOf(e, id)).filter(Boolean).map(D.itLabel); return `<div class="tg-r ${t.off ? 'off' : ''}" ${r ? '' : `tabindex="0" data-a="tkEdit" data-v="${t.id}"`}><span class="grow"><b>${esc(t.n)}</b>${t.off ? ' <span class="st neutro">Vendas pausadas</span>' : D.tkLeft(e, t) === 0 ? ' <span class="st vencido">Esgotado</span>' : ''}<small>${esc(t.desc || '')}</small>${inc.length || t.per.length ? `<span class="tg-ch">${inc.map(x => `<i>${ic('check', 10, 3)}${esc(x)}</i>`).join('')}${t.per.length ? `<i class="per">${ic('calendar', 10, 2.4)}${esc(t.per.join(' + '))}</i>` : ''}</span>` : ''}</span><span class="tg-p"><b class="num">${t.price ? D.money(t.price) : 'Grátis'}</b><small>${sold}${t.cap ? ' / ' + t.cap : ''} ${sold === 1 ? 'inscrito' : 'inscritos'}</small>${t.cap ? prog(sold, t.cap) : ''}</span>${r ? '' : `<span class="tg-a"><button class="btn sec sm" data-a="tkPause" data-v="${t.id}">${t.off ? 'Retomar' : 'Pausar'}</button><button class="ibtn" data-a="tkDel" data-v="${t.id}" aria-label="Excluir ingresso">${ic('trash', 15, 2)}</button></span>`}</div>`; }).join('')}</div></section>`;
}
function tkDlg(tid) {
  const e = cur(), t = tid ? e.tickets.find(x => x.id === tid) : null, sold = t ? D.tkSold(e, t) : 0, per = e.checkin === 'periodo' && e.periods.length;
  const d = dlg(`<h2>${t ? 'Editar ingresso' : 'Novo ingresso'}</h2><p class="lede">${esc(e.t)}</p><div class="fgrid2">${fld('kN', 'Nome', { v: t ? t.n : '', ph: 'Ex.: VIP' })}${fld('kPr', 'Valor (R$)', { type: 'number', v: t ? t.price : '', ph: '0,00', hint: '0 para gratuito.', extra: 'step="0.01" min="0"' })}</div>${fld('kD', 'Descrição', { v: t ? t.desc : '', ph: 'Ex.: Lugar na frente e kit' })}${fld('kC', 'Vagas (opcional)', { type: 'number', v: t && t.cap ? t.cap : '', hint: sold ? `${sold} já inscritos neste ingresso.` : 'Em branco = sem limite.' })}
  ${per ? `<div class="fld"><label>Vale para <span class="foot" style="display:inline">sem marcar, vale o evento todo</span></label><div class="opts2">${e.periods.map(p => `<label><input type="checkbox" name="kPer" value="${esc(p)}" ${t && t.per.includes(p) ? 'checked' : ''}><span>${esc(p)}</span></label>`).join('')}</div></div>` : ''}
  <div class="fld"><label>O que já vem incluso <span class="foot" style="display:inline">cada item gera o próprio código</span></label>${e.items.length ? `<div class="opts2">${e.items.map(i => `<label><input type="checkbox" name="kInc" value="${i.id}" ${t && t.incl.includes(i.id) ? 'checked' : ''}><span>${esc(D.itLabel(i))} <small>${D.money(i.price)} à parte</small></span></label>`).join('')}</div>` : '<p class="foot" style="margin:0">Nenhum item cadastrado. Crie itens em Compras adicionais.</p>'}</div>
  <div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="kGo">${t ? 'Salvar' : 'Criar ingresso'}</button></div>`);
  $('#kGo', d).addEventListener('click', () => {
    fclear(); const n = val('kN'); if (!n) return ferr('kN', 'Informe o nome'); if (e.tickets.some(o => o !== t && o.n.toLowerCase() === n.toLowerCase())) return ferr('kN', 'Já existe um ingresso com esse nome');
    if (val('kPr') === '' || !(+val('kPr') >= 0)) return ferr('kPr', 'Informe o valor'); const cap = +val('kC') || 0; if (cap && cap < sold) return ferr('kC', `Já há ${sold} inscritos`);
    const v = { n, desc: val('kD'), price: +val('kPr'), cap, incl: $$('input[name=kInc]:checked', d).map(i => i.value), per: $$('input[name=kPer]:checked', d).map(i => i.value) };
    if (t) Object.assign(t, v); else e.tickets.push({ id: 't' + Date.now().toString(36), off: false, ...v });
    closeDlg(); render(true); toast(t ? 'Ingresso atualizado' : 'Ingresso criado');
  });
}
Object.assign(A, {
  tkNew: () => tkDlg(), tkEdit: (v, b, ev) => { if (ev && ev.target.closest('[data-a=tkPause],[data-a=tkDel]')) return; tkDlg(v); },
  tkPause: v => { const t = cur().tickets.find(x => x.id === v); t.off = !t.off; render(true); toast(t.off ? 'Vendas pausadas' : 'Vendas retomadas'); },
  tkDel: v => { const e = cur(), t = e.tickets.find(x => x.id === v), sold = D.tkSold(e, t); if (sold) return toast(`${sold} pessoas já estão inscritas. Pause a venda em vez de excluir.`, 'bad'); if (e.tickets.length < 2) return toast('O evento precisa de pelo menos um ingresso.', 'bad'); confirmAct({ title: `Excluir o ingresso ${esc(t.n)}?`, body: 'Ele deixa de ser oferecido na inscrição.', label: 'Excluir ingresso', fn: () => { e.tickets.splice(e.tickets.indexOf(t), 1); render(true); toast('Ingresso excluído'); } }); },
});

/* ---------- compras adicionais ---------- */
const ORDERS_BUY = (e, i) => D.ordersOf(e).filter(o => (o.st === 'pago' || o.st === 'pendente') && o.buy.includes(i.id)).length;
function tCompras(e) {
  const r = ro(e);
  return roNote(e) + `<section class="card"><div class="sh"><h2>Compras adicionais</h2>${r ? '' : `<button class="btn sec sm" data-a="itNew">${ic('plus', 14, 2.2)}Novo item</button>`}</div><p class="foot">Itens vendidos junto com o ingresso: almoço, estacionamento, camiseta… Cada um gera o próprio código${e.checkin === 'off' ? '. Sem controle de entrada, o item é cobrado mas não gera código' : ''}.</p>
  ${e.items.length ? `<div class="tw" style="margin-top:12px"><table><thead><tr><th>Item</th><th>Vale para</th><th class="r">Valor</th><th>Vendidos</th><th class="r"></th></tr></thead><tbody>${e.items.map(i => { const n = ORDERS_BUY(e, i), inT = e.tickets.filter(t => t.incl.includes(i.id)); return `<tr class="${i.off ? 'again' : ''}"><td><b>${esc(i.n)}</b>${i.off ? ' <span class="st neutro">Venda encerrada</span>' : ''}${inT.length ? `<small>Incluso em ${inT.map(t => esc(t.n)).join(', ')}</small>` : ''}</td><td>${esc(i.p || 'Evento inteiro')}</td><td class="r num">${D.money(i.price)}</td><td class="num">${n}</td><td class="r">${r ? '' : `<button class="btn sec sm" data-a="itOff" data-v="${i.id}">${i.off ? 'Retomar' : n ? 'Parar de vender' : 'Remover'}</button>`}</td></tr>`; }).join('')}</tbody></table></div>` : empty('Nenhum item ainda.')}</section>`;
}
A.itNew = () => {
  const e = cur(), per = e.checkin === 'periodo' && e.periods.length;
  const d = dlg(`<h2>Novo item</h2><p class="lede">${esc(e.t)}</p><div class="fgrid2">${fld('iN', 'Nome', { ph: 'Ex.: Almoço' })}${fld('iP', 'Valor (R$)', { type: 'number', ph: '0,00', extra: 'step="0.01" min="0"' })}</div>${per ? fld('iV', 'Vale para', { opts: [['', 'Evento inteiro'], ...e.periods.map(p => [p, p])] }) : ''}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="iGo">Criar item</button></div>`);
  $('#iGo', d).addEventListener('click', () => { fclear(); const n = val('iN'); if (!n) return ferr('iN', 'Informe o nome'); if (!(+val('iP') > 0)) return ferr('iP', 'Informe o valor'); const p = per ? val('iV') : ''; if (e.items.some(i => i.n.toLowerCase() === n.toLowerCase() && i.p === p)) return ferr('iN', 'Esse item já existe'); e.items.push({ id: 'i' + Date.now().toString(36), n, price: +val('iP'), p, off: false }); closeDlg(); render(true); toast('Item criado'); });
};
A.itOff = v => { const e = cur(), i = D.itOf(e, v), n = ORDERS_BUY(e, i); if (i.off) { i.off = false; render(true); return toast('Item voltou a ser vendido'); }
  const inT = e.tickets.filter(t => t.incl.includes(i.id)); if (inT.length) return toast(`${i.n} está incluso em ${inT.map(t => t.n).join(', ')}. Tire de lá antes.`, 'bad');
  confirmAct({ title: `${n ? 'Parar de vender' : 'Remover'} ${esc(D.itLabel(i))}?`, body: n ? `${n} pessoas já compraram; o item continua valendo para elas e só deixa de ser vendido.` : 'Ele deixa de ser oferecido na inscrição.', label: n ? 'Parar de vender' : 'Remover', fn: () => { if (n) i.off = true; else e.items.splice(e.items.indexOf(i), 1); render(true); toast(n ? 'Item não é mais vendido' : 'Item removido'); } }); };

/* ---------- cupons (tipo e quem pode usar, igual ao voucher do Alva) ---------- */
function tCupons(e) {
  const r = ro(e);
  return roNote(e) + `<section class="card"><div class="sh"><h2>Cupons de desconto</h2>${r ? '' : `<button class="btn sec sm" data-a="cpNew">${ic('plus', 14, 2.2)}Novo cupom</button>`}</div><p class="foot">O desconto vale em qualquer ingresso e nunca passa do valor dele. Compras adicionais não recebem desconto.</p>
  ${e.coupons.length ? `<div class="vgrid">${e.coupons.map((c, i) => { const exp = c.exp && c.exp < D.TODAY, full = c.type === 'val' && c.v >= Math.min(...e.tickets.map(t => t.price)); return `<article class="vc ${exp ? 'exp' : ''}"><div class="vc1"><code class="vcode">${esc(c.code)}</code>${r ? '' : `<button class="ibtn sm" data-a="cpDel" data-v="${i}" aria-label="Excluir cupom">${ic('x', 14, 2)}</button>`}</div>
   <div class="vc2"><b>${c.type === 'pct' ? c.v + '%' : full ? 'Bolsa integral' : '− ' + D.money(c.v)}</b><span>${c.type === 'pct' ? 'de desconto no ingresso' : full ? 'ingresso gratuito' : 'de desconto no ingresso'}</span></div>
   <div class="vc3"><span>${c.mode === 'especifico' ? `${ic('lock', 13, 2)}${esc(c.email)}` : `${ic('users', 13, 2)}Qualquer pessoa`}</span><span>${c.uses} ${c.uses === 1 ? 'uso' : 'usos'}</span></div><div class="vc4 ${exp ? 'bad' : ''}">${c.exp ? (exp ? `Expirou em ${D.dBR(c.exp)}` : `Vale até ${D.dBR(c.exp)}`) : 'Nunca expira'}</div></article>`; }).join('')}</div>` : empty('Nenhum cupom. Crie códigos de desconto para este evento.')}</section>`;
}
A.cpNew = () => { const e = cur();
  const d = dlg(`<h2>Novo cupom</h2><p class="lede">${esc(e.t)}</p>${fld('cC', 'Código', { ph: 'Ex.: AMIGO10' })}<div class="fgrid2">${fld('cT', 'Tipo de desconto', { opts: [['pct', 'Percentual (%)'], ['val', 'Valor fixo (R$)']] })}${fld('cV', 'Desconto', { type: 'number', ph: '0', extra: 'min="1"' })}</div><div class="fgrid2">${fld('cE', 'Expira em (opcional)', { type: 'date' })}</div>
   <div class="fld"><label>Quem pode usar</label><div class="vis3 two" id="cpM"><label><input type="radio" name="cm" value="liberado" checked><span><b>Qualquer pessoa</b><small>Quem tiver o código.</small></span></label><label><input type="radio" name="cm" value="especifico"><span><b>Uma pessoa</b><small>Só um e-mail autorizado.</small></span></label></div></div><div id="cpEW" hidden>${fld('cEm', 'E-mail autorizado', { type: 'email', ph: 'pessoa@email.com' })}</div>
   <div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="cGo">Criar cupom</button></div>`);
  d.addEventListener('change', () => { $('#cpEW', d).hidden = $$('input[name=cm]:checked', d)[0].value !== 'especifico'; });
  $('#cGo', d).addEventListener('click', () => { fclear(); const c = val('cC').toUpperCase().replace(/\s/g, '-'); if (c.length < 3) return ferr('cC', 'Use pelo menos 3 caracteres'); if (e.coupons.some(x => x.code === c)) return ferr('cC', 'Esse código já existe'); const v = +val('cV'); if (!(v > 0)) return ferr('cV', 'Informe o desconto'); if (val('cT') === 'pct' && v > 100) return ferr('cV', 'No máximo 100%');
    const mode = $$('input[name=cm]:checked', d)[0].value; if (mode === 'especifico' && !/^\S+@\S+\.\S+$/.test(val('cEm'))) return ferr('cEm', 'Informe um e-mail válido');
    e.coupons.push({ code: c, type: val('cT'), v, exp: val('cE'), uses: 0, mode, email: mode === 'especifico' ? val('cEm') : '' }); closeDlg(); render(true); toast(`Cupom ${c} criado`); }); };
A.cpDel = v => { const e = cur(), c = e.coupons[+v]; confirmAct({ title: `Excluir o cupom ${esc(c.code)}?`, body: c.uses ? `Ele já foi usado ${c.uses} ${c.uses === 1 ? 'vez' : 'vezes'}; essas inscrições mantêm o desconto.` : 'Ninguém mais consegue usar o código.', label: 'Excluir cupom', fn: () => { e.coupons.splice(+v, 1); render(true); toast('Cupom excluído'); } }); };

/* ---------- inscrições ---------- */
export const ckOf = (e, o) => { const a = D.codes(e, o).filter(c => c.tag === 'Acesso'); const d = a.filter(c => o.ck[c.k]).length; return { k: e.checkin === 'off' ? 'nock' : d === 0 ? 'wait' : d === a.length ? 'in' : 'part', d, t: a.length }; };
export const ckPill = c => c.k === 'nock' ? '<span class="mute">—</span>' : c.k === 'in' ? chip('pago', c.t > 1 ? `Entrou ${c.d}/${c.t}` : 'Entrou') : c.k === 'part' ? chip('pendente', `Parcial ${c.d}/${c.t}`) : chip('neutro', 'Aguardando');
export function ordTable(list, key, withEv) {
  const p = pager(list, key);
  return list.length ? `<table><thead><tr><th>Comprador</th>${withEv ? '<th>Evento</th>' : ''}<th>Ingresso</th><th>Pagamento</th><th class="r">Total</th><th>Check-in</th><th>Data</th></tr></thead><tbody>${p.rows.map(o => { const e = evById(o.ev), t = D.tkOf(e, o.tk), nb = D.addons(e, o).length; return `<tr class="row" tabindex="0" data-a="person" data-v="${o.id}"><td><span class="pcell">${avatar(who(o))}<span><b>${esc(who(o))}</b><small>${esc(o.buyer.e)}</small></span></span></td>${withEv ? `<td>${esc(e.t)}</td>` : ''}<td>${esc(t.n)}${nb ? `<small>+${nb} ${nb === 1 ? 'compra' : 'compras'}</small>` : ''}</td><td>${ordChip(o)}</td><td class="r num">${D.total(e, o) ? D.money(D.total(e, o)) : 'Grátis'}</td><td>${ckPill(ckOf(e, o))}</td><td class="num">${D.dBR(o.at)}</td></tr>`; }).join('')}</tbody></table>${p.html}` : empty('Nada encontrado.');
}
function tInsc(e) {
  const q = S.iq.trim().toLowerCase(), l = D.ordersOf(e).filter(o => (S.iqs === 'todos' || o.st === S.iqs) && (S.iqt === 'todos' || o.tk === S.iqt) && (S.iqc === 'todos' || ckOf(e, o).k === S.iqc) && (!q || (who(o) + ' ' + o.buyer.e).toLowerCase().includes(q))).sort((a, b) => a.at < b.at ? 1 : -1);
  return `<div class="tw"><div class="tools"><input id="iq" placeholder="Buscar por nome ou e-mail" value="${esc(S.iq)}" autocomplete="off"><select data-a="iqs" aria-label="Pagamento">${[['todos', 'Qualquer pagamento'], ['pago', 'Pagos'], ['pendente', 'Pendentes'], ['cancelado', 'Cancelados'], ['reembolsado', 'Reembolsados']].map(([k, t]) => `<option value="${k}" ${S.iqs === k ? 'selected' : ''}>${t}</option>`).join('')}</select>${e.tickets.length > 1 ? `<select data-a="iqt" aria-label="Ingresso"><option value="todos">Todos os ingressos</option>${e.tickets.map(t => `<option value="${t.id}" ${S.iqt === t.id ? 'selected' : ''}>${esc(t.n)}</option>`).join('')}</select>` : ''}${e.checkin !== 'off' ? `<select data-a="iqc" aria-label="Check-in">${[['todos', 'Qualquer check-in'], ['in', 'Entrou'], ['part', 'Parcial'], ['wait', 'Aguardando']].map(([k, t]) => `<option value="${k}" ${S.iqc === k ? 'selected' : ''}>${t}</option>`).join('')}</select>` : ''}<button class="btn sec sm" data-a="exportar" data-v="as inscrições do evento">${ic('download', 15, 2)}Exportar CSV</button></div>${ordTable(l, 'ins')}</div>`;
}
export function inscricoes() {
  const evs = myEvents(), q = S.iq.trim().toLowerCase();
  const l = orgOrders().filter(o => (S.iqe === 'todos' || o.ev === S.iqe) && (S.iqs === 'todos' || o.st === S.iqs) && (S.iqc === 'todos' || ckOf(evById(o.ev), o).k === S.iqc) && (!q || (who(o) + ' ' + o.buyer.e + ' ' + evById(o.ev).t).toLowerCase().includes(q))).sort((a, b) => a.at < b.at ? 1 : -1);
  return page('Inscrições', 'Todas as inscrições dos seus eventos. Toque numa linha para ver ingressos, compras e fazer o check-in.', `<button class="btn sec" data-a="exportar" data-v="as inscrições">${ic('download', 16, 2)}Exportar CSV</button>`, 'Vendas')
    + `<div class="tw"><div class="tools"><input id="iq" placeholder="Buscar por nome, e-mail ou evento" value="${esc(S.iq)}" autocomplete="off"><select data-a="iqe" aria-label="Evento"><option value="todos">Todos os eventos</option>${evs.filter(e => D.ordersOf(e).length).map(e => `<option value="${e.id}" ${S.iqe === e.id ? 'selected' : ''}>${esc(e.t)}</option>`).join('')}</select><select data-a="iqs" aria-label="Pagamento">${[['todos', 'Qualquer pagamento'], ['pago', 'Pagos'], ['pendente', 'Pendentes'], ['cancelado', 'Cancelados'], ['reembolsado', 'Reembolsados']].map(([k, t]) => `<option value="${k}" ${S.iqs === k ? 'selected' : ''}>${t}</option>`).join('')}</select><select data-a="iqc" aria-label="Check-in">${[['todos', 'Qualquer check-in'], ['in', 'Entrou'], ['part', 'Parcial'], ['wait', 'Aguardando'], ['nock', 'Evento sem check-in']].map(([k, t]) => `<option value="${k}" ${S.iqc === k ? 'selected' : ''}>${t}</option>`).join('')}</select></div>${ordTable(l, 'insAll', true)}</div>`;
}
Object.assign(A, {
  iqs: v => { S.iqs = v; S.pg = {}; render(true); }, iqe: v => { S.iqe = v; S.pg = {}; render(true); }, iqc: v => { S.iqc = v; S.pg = {}; render(true); }, iqt: v => { S.iqt = v; S.pg = {}; render(true); },
  ef: v => { S.ef = v; render(true); }, exportar: v => toast(`Arquivo com ${v} pronto para baixar`), soon: v => toast(v), openAlva: () => toast('Abre o Alva Web no evento'),
});

/* ---------- check-in: acompanhamento, com a pessoa ao clicar ---------- */
export function ckRowsHtml(e) {
  const q = S.ckq.trim().toLowerCase(), f = S.ckf;
  const rows = evCodes(e).filter(x => (f === 'todos' || (f === 'in' ? x.at : f === 'wait' ? !x.at && x.o.st === 'pago' : x.o.st === 'pendente' && !x.at)) && (!q || (who(x.o) + ' ' + x.c.n + ' ' + x.c.code).toLowerCase().includes(q))).sort((a, b) => (!!b.at - !!a.at) || (a.at < b.at ? 1 : -1) || who(a.o).localeCompare(who(b.o)));
  const p = pager(rows, 'ck', 15);
  return rows.length ? `<table><thead><tr><th>Pessoa</th><th>Código</th><th>Ingresso</th><th>Situação</th></tr></thead><tbody>${p.rows.map(x => `<tr class="row" tabindex="0" data-a="person" data-v="${x.o.id}|${x.c.k}"><td><span class="pcell">${avatar(who(x.o))}<span><b>${esc(who(x.o))}</b></span></span></td><td>${esc(x.c.n)}<small>${x.c.tag}</small></td><td>${esc(D.tkOf(e, x.o.tk).n)}</td><td>${x.at ? chip('pago', 'Entrou às ' + x.at) : x.o.st === 'pendente' ? chip('pendente', 'Aguardando pagamento') : x.o.st !== 'pago' ? chip('neutro', 'Cancelado') : chip('neutro', 'Aguardando')}</td></tr>`).join('')}</tbody></table>${p.html}` : empty('Nenhum código encontrado.');
}
export function ckCounts(e) { const all = evCodes(e); return { todos: all.length, in: all.filter(x => x.at).length, wait: all.filter(x => !x.at && x.o.st === 'pago').length, blk: all.filter(x => x.o.st === 'pendente' && !x.at).length }; }
export const ckChips = e => { const c = ckCounts(e); return `<div class="chips" style="margin:0">${[['todos', 'Todos'], ['in', 'Entraram'], ['wait', 'Aguardando'], ...(c.blk ? [['blk', 'Sem pagamento']] : [])].map(([k, l]) => `<button class="chipf ${S.ckf === k ? 'on' : ''}" data-a="ckf" data-v="${k}">${l}<small>${c[k]}</small></button>`).join('')}</div>`; };
function tCheckin(e) {
  const all = evCodes(e).filter(x => x.o.st === 'pago'), acc = all.filter(x => x.c.tag === 'Acesso'), done = acc.filter(x => x.at), last = [...done].sort((a, b) => a.at < b.at ? 1 : -1)[0];
  const grp = (list, key) => { const m = new Map(); list.forEach(x => { const k = key(x), g = m.get(k) || { k, n: 0, d: 0 }; g.n++; if (x.at) g.d++; m.set(k, g); }); return [...m.values()]; };
  const bar = g => `<div class="ei-b"><div class="ei-bh"><span>${esc(g.k)}</span><b>${g.d}<small>/${g.n}</small></b></div>${prog(g.d, g.n, 'ok')}</div>`;
  const items = grp(all.filter(x => x.c.tag !== 'Acesso'), x => x.c.n), pend = evCodes(e).filter(x => x.o.st === 'pendente' && x.c.tag === 'Acesso').length;
  return `<div class="note"><div>${ic('shield', 17, 2)}</div><div>O check-in é feito pela <b>equipe, no app do VEM</b> (leitor de QR, totem ou lista). Aqui você acompanha ao vivo e, se precisar, confirma uma entrada pela pessoa. <button class="btn sec sm" data-a="evTab" data-v="equipe">Ver equipes</button></div></div>`
    + kpis([['Entradas', `${done.length} / ${acc.length}`, acc.length ? Math.round(done.length / acc.length * 100) + '% dos códigos liberados' : ''], ['Faltam entrar', acc.length - done.length, 'códigos liberados'], ['Aguardando pagamento', pend, pend ? 'libera depois de pagar' : 'nenhum travado'], ['Último check-in', last ? last.at : '—', last ? who(last.o) : 'ninguém entrou ainda']])
    + `<div class="g2"><section class="card"><h2>${e.checkin === 'periodo' ? 'Por período' : 'Entrada'}</h2>${grp(acc, x => x.c.n.replace('Entrada · ', '').replace('Entrada geral', 'Evento inteiro')).map(bar).join('') || empty('Nada liberado.')}</section>
    <section class="card"><h2>${e.tickets.length > 1 ? 'Por ingresso' : 'Itens retirados'}</h2>${(e.tickets.length > 1 ? grp(acc, x => D.tkOf(e, x.o.tk).n) : items).map(bar).join('') || empty('Nada ainda.')}</section></div>
    ${e.tickets.length > 1 && items.length ? `<section class="card"><h2>Itens retirados</h2>${items.map(bar).join('')}</section>` : ''}
    <div class="tw"><div class="tools"><input id="ckq" placeholder="Buscar pessoa ou código" value="${esc(S.ckq)}" autocomplete="off">${ckChips(e)}</div><div id="ckrows">${ckRowsHtml(e)}</div></div>`;
}
A.ckf = v => { S.ckf = v; render(true); };

/* ---------- financeiro do evento ---------- */
export const repasse = (e, s) => D.isPast(e) ? chip('pago', 'Repassado') : s.net ? chip('pendente', 'Previsto · ' + D.dBR(D.addDays(e.d2 || e.d, 1))) : chip('neutro', '—');
function tFin(e) {
  const s = stOf(e), os = D.ordersOf(e), paidO = os.filter(o => o.st === 'pago');
  const byT = e.tickets.map(t => { const rs = paidO.filter(o => o.tk === t.id); return [t.n, rs.length, rs.reduce((a, o) => a + D.ticketNet(e, o), 0)]; }).filter(x => x[1]);
  const byI = e.items.map(i => { const rs = paidO.filter(o => o.buy.includes(i.id)); return [D.itLabel(i), rs.length, rs.length * i.price]; }).filter(x => x[1]);
  const meth = ['pix', 'cartao'].map(m => { const rs = paidO.filter(o => o.m === m); return [D.PAY[m].n, rs.length, rs.reduce((a, o) => a + D.total(e, o), 0), rs.reduce((a, o) => a + D.fee(e, o), 0)]; }).filter(x => x[1]);
  const row = (l, sub, v) => `<div class="ef-r"><span><b>${l}</b>${sub ? `<small>${sub}</small>` : ''}</span><b class="num">${v}</b></div>`;
  return kpis([['Arrecadado (bruto)', D.money(s.gross), `${s.paid} pagamentos`], ['Taxas de pagamento', '− ' + D.money(s.fees), 'Pix e cartão'], ['Líquido', D.money(s.net), 'o que vai para você'], ['A receber', D.money(s.toRec), `${s.pend} pendentes`]])
    + `<div class="g2"><div><section class="card"><h2>Vendas por ingresso</h2>${byT.length ? byT.map(x => row(esc(x[0]), `${x[1]} pagos`, D.money(x[2]))).join('') : empty('Nenhuma venda ainda.')}</section><section class="card"><h2>Compras adicionais</h2>${byI.length ? byI.map(x => row(esc(x[0]), `${x[1]} pagas`, D.money(x[2]))).join('') : empty('Nenhuma compra adicional.')}</section></div>
    <div><section class="card"><h2>Taxas por forma de pagamento</h2>${meth.length ? meth.map(x => row(x[0], `${x[1]} pagamentos · ${D.money(x[2])}`, '− ' + D.money(x[3]))).join('') : empty('Nenhum pagamento confirmado.')}<p class="foot">Taxas conforme a configuração de pagamentos do seu plano, no Assinaturas.</p></section>
    ${s.disc ? `<section class="card"><h2>Descontos concedidos</h2>${row('Cupons', `${e.coupons.reduce((a, c) => a + c.uses, 0)} usos`, '− ' + D.money(s.disc))}</section>` : ''}
    <section class="card"><h2>Repasse</h2><div class="ef-r"><span><b>Líquido do evento</b><small>${D.isPast(e) ? 'Repassado após o evento' : 'Repasse depois do evento, conforme o prazo de cada forma de pagamento'}</small></span><b class="num">${D.money(s.net)}</b></div><div style="margin-top:6px">${repasse(e, s)}</div></section></div></div>`;
}

/* ---------- divulgação ---------- */
function tDiv(e) {
  const miss = needs(e), r = ro(e), b = e.banner && e.banner.on;
  return roNote(e) + `<div class="g2"><section class="card"><h2>Página pública no VEM</h2>${miss.length ? note('alert', `Falta preencher: <b>${miss.join(', ')}</b>. Sem isso o evento não é publicado.`, 'warn') : e.st === 'publicado' || e.st === 'pausado' ? note('check', `${e.st === 'pausado' ? 'Página visível, com as vendas pausadas.' : 'Publicado. Qualquer pessoa pode se inscrever pelo app e pelo site.'}`, 'ok') : note('info', 'Pronto para publicar.')}
  <div class="fld"><label>Link do evento</label><div class="lk"><code>vem.app/e/${e.id}</code><button class="btn sec sm" data-a="soon" data-v="Link copiado">Copiar</button></div></div>
  <div class="fld"><label>Capa</label>${e.cover ? `<div class="cvrow">${cvr(e, 44, 'sm')}<span class="grow">${esc(e.cover)}</span>${r ? '' : '<button class="btn sec sm" data-a="coverDel">Remover</button>'}</div>` : r ? '<p class="foot" style="margin:0">Sem capa. Adicione no Alva.</p>' : `<button class="btn sec" data-a="coverAdd">${ic('plus', 14, 2.2)}Escolher imagem</button>`}</div>
  <div class="fld"><label>Banner no Descobrir</label><p class="foot" style="margin:0 0 8px">${b ? 'O evento aparece em destaque no topo do app e do site.' : 'Destaque o evento no topo do Descobrir.'}</p><button class="btn sec sm" data-a="evTab" data-v="comunicacao">${b ? 'Editar banner' : 'Configurar banner'}</button></div></section>
  <section class="card"><h2>Como aparece no app</h2><div class="prev">${cvr(e, 120)}<div class="prev-b"><div class="row g2"><span class="pill">${esc(e.cat)}</span>${originTag(e)}</div><b>${esc(e.t)}</b><small>${D.whenOf(e)} · ${esc(e.city || 'cidade')}</small><span class="prev-p">${D.evFrom(e) ? (e.tickets.length > 1 ? 'a partir de ' : '') + D.moneyS(D.evFrom(e)) : 'Grátis'}</span></div></div></section></div>`;
}
Object.assign(A, { coverAdd: () => { cur().cover = 'capa-' + cur().t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-') + '.jpg'; render(true); toast('Capa adicionada'); }, coverDel: () => { cur().cover = ''; render(true); } });

/* ---------- publicar, pausar, novo evento ---------- */
Object.assign(A, {
  publish: () => { const e = cur(), m = needs(e); if (m.length) { S.evTab = 'divulgacao'; render(); return toast(`Falta preencher: ${m.join(', ')}.`, 'bad'); } confirmAct({ title: 'Publicar este evento?', body: 'Ele aparece no app e no site do VEM e as vendas começam agora.', label: 'Publicar', tone: '', fn: () => { e.st = 'publicado'; render(true); toast('Evento publicado'); } }); },
  pause: () => confirmAct({ title: 'Pausar as vendas?', body: 'A página continua visível, mas ninguém consegue se inscrever até você retomar. Quem já comprou não é afetado.', label: 'Pausar vendas', fn: () => { cur().st = 'pausado'; render(true); toast('Vendas pausadas'); } }),
  resume: () => { cur().st = 'publicado'; render(true); toast('Vendas retomadas'); },
  preview: v => toast('Abre a página pública vem.app/e/' + v),
  newEvent: () => {
    const o = orgOf(), d = dlg(`<h2>Novo evento</h2><p class="lede">Comece pelo básico. Você completa ingressos, local e descrição depois.</p>${fld('nT', 'Título', { ph: 'Ex.: Workshop de Fotografia' })}<div class="fgrid2">${fld('nC', 'Categoria', { opts: D.CATS.map(c => [c, c]) })}${fld('nD', 'Data', { type: 'date', v: D.addDays(D.TODAY, 30) })}${fld('nH', 'Horário', { v: '19h' })}${fld('nK', 'Capacidade', { type: 'number', ph: 'Sem limite' })}${fld('nP', 'País', { opts: COUNTRIES.map(c => [c, c]) })}<div id="nUfW">${stateField('nU', 'Brasil', o.uf)}</div></div>${fld('nCi', 'Cidade', { v: o.city })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="nGo">Criar rascunho</button></div>`);
    $('#nP', d).addEventListener('change', () => { $('#nUfW', d).innerHTML = stateField('nU', val('nP'), ''); });
    $('#nGo', d).addEventListener('click', () => { fclear(); const t = val('nT'); if (!t) return ferr('nT', 'Informe o título'); if (!val('nD')) return ferr('nD', 'Escolha a data'); if (!val('nCi')) return ferr('nCi', 'Informe a cidade');
      const e = { id: 'e' + Date.now().toString(36), org: S.org, origin: 'vem', t, cat: val('nC'), country: val('nP'), city: val('nCi'), uf: val('nU').toUpperCase().slice(0, 3), venue: '', d: val('nD'), d2: '', time: val('nH') || '19h', st: 'rascunho', checkin: 'inteiro', periods: [], cap: +val('nK') || 0, desc: '', tickets: [{ id: 't1', n: 'Ingresso', desc: '', price: 0, cap: 0, incl: [], per: [], off: false }], items: [], coupons: [] }; D.EVENTS.push(e); closeDlg(); S.evId = e.id; S.evTab = 'detalhes'; S.screen = 'evento'; render(); toast('Rascunho criado'); });
  },
  evento: v => { S.evId = v; S.evTab = 'resumo'; S.screen = 'evento'; resetEv(); render(); window.scrollTo(0, 0); },
  evFin: v => { S.evId = v; S.evTab = 'financeiro'; S.screen = 'evento'; render(); window.scrollTo(0, 0); },
});

export const orgViews = { overview, eventos, evento, inscricoes };
export function orgAfter() {
  const q = $('#q'); if (q) q.addEventListener('input', e => { S.q = e.target.value; const p = e.target.selectionStart; render(true); const n = $('#q'); n.focus(); n.setSelectionRange(p, p); });
  const iq = $('#iq'); if (iq) iq.addEventListener('input', e => { S.iq = e.target.value; S.pg = {}; const p = e.target.selectionStart; render(true); const n = $('#iq'); n.focus(); n.setSelectionRange(p, p); });
  const ck = $('#ckq'); if (ck) ck.addEventListener('input', e => { S.ckq = e.target.value; const ev = cur(); $('#ckrows').innerHTML = ckRowsHtml(ev); });
  const pf = $('#perF'); if (pf) pf.addEventListener('submit', x => { x.preventDefault(); const e = cur(), i = pf.querySelector('input'), v = i.value.trim(); if (!v) return i.focus(); if (e.periods.some(p => p.toLowerCase() === v.toLowerCase())) return toast('Esse período já existe', 'bad'); e.periods.push(v); render(true); });
}
