/* VEM · web · comprador: descobrir eventos, comprar e ver ingressos com QR por código. */
import { $, $$, esc, ic, initials } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { couponOk } from '../shared/data2.js';
import { qrSVG } from '../shared/logic.js';
import { S, A, toast, val, dlg, closeDlg, chip, note, empty, cvr, originTag, ordChip, render, later } from './core.js';

const evById = id => D.evOf(id);
const orgN = e => D.orgOf(e.org).n;
const stateOf = e => D.isPast(e) ? ['bad', 'Encerrado'] : e.st === 'pausado' ? ['warn', 'Vendas pausadas'] : D.evLeft(e) === 0 ? ['bad', 'Esgotado'] : null;
const myOrder = e => S.profile === 'buyer' && D.MY().find(o => o.ev === e.id && o.st !== 'cancelado' && o.st !== 'reembolsado');
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const cities = () => [...new Set(D.EVENTS.filter(e => e.st === 'publicado' || e.st === 'pausado').map(e => e.city))].sort();
const GCLS = { Conferência: 'ceu', Retiro: 'lima', Congresso: 'damasco', Curso: 'menta', Show: 'rosado', Encontro: 'salvia', Outro: 'ceu' };

function card(e) {
  const s = stateOf(e), d = new Date(e.d + 'T12:00:00');
  return `<button class="bc" data-a="bEvento" data-v="${e.id}"><div class="bc-c">${cvr(e, 150)}<span class="bc-d"><b>${d.getDate()}</b><small>${D.MON[d.getMonth()]}</small></span>${s ? `<span class="bc-s ${s[0]}">${s[1]}</span>` : ''}</div><div class="bc-b"><div class="row g2"><span class="pill">${esc(e.cat)}</span>${originTag(e)}</div><b>${esc(e.t)}</b><small>${D.whenOf(e)} · ${esc(e.city)}</small><div class="bc-f"><span>${esc(orgN(e))}</span><b>${D.evFrom(e) ? (e.tickets.length > 1 ? 'a partir de ' : '') + D.moneyS(D.evFrom(e)) : 'Grátis'}</b></div></div></button>`;
}
export function descobrir() {
  const q = norm(S.bq.trim()), ban = D.EVENTS.filter(e => e.banner && e.banner.on && e.st === 'publicado' && !D.isPast(e));
  const l = D.EVENTS.filter(e => (e.st === 'publicado' || e.st === 'pausado') && !D.isPast(e) && (S.bcat === 'Todos' || e.cat === S.bcat) && (S.bcity === 'todas' || e.city === S.bcity) && (S.bprice === 'todos' || (S.bprice === 'free' ? !D.evFrom(e) : D.evFrom(e) > 0)) && (!q || norm(e.t + ' ' + orgN(e) + ' ' + e.city + ' ' + e.cat).includes(q))).sort((a, b) => a.d < b.d ? -1 : 1);
  return `<section class="hero"><div class="hero-in"><p class="eb2">Eventos de igrejas e organizadores</p><h1>Encontre o próximo evento<br>e garanta o seu lugar.</h1><label class="hs">${ic('search', 20, 2)}<input id="bq" placeholder="Busque por evento, cidade ou organizador" value="${esc(S.bq)}" autocomplete="off"></label></div></section>
  <div class="bwrap">${ban.length && !q && S.bcat === 'Todos' ? `<div class="bbn">${ban.map(e => `<button class="bn cv-${GCLS[e.cat] || 'ceu'}" data-a="bEvento" data-v="${e.id}"><span>${D.whenOf(e)} · ${esc(e.city)}</span><b>${esc(e.banner.title || e.t)}</b><em>${esc(e.banner.line || '')}</em><i class="btn sm">${D.evFrom(e) ? 'Ver ingressos' : 'Inscrever-se'}</i></button>`).join('')}</div>` : ''}
  <div class="bfil"><div class="bchips">${['Todos', ...D.CATS.filter(c => c !== 'Outro')].map(c => `<button class="bchip" aria-pressed="${S.bcat === c}" data-a="bCat" data-v="${c}">${c}</button>`).join('')}</div><div class="bsel"><select data-a="bCity" aria-label="Cidade"><option value="todas">Todas as cidades</option>${cities().map(c => `<option ${S.bcity === c ? 'selected' : ''}>${c}</option>`).join('')}</select><select data-a="bPrice" aria-label="Preço">${[['todos', 'Qualquer preço'], ['free', 'Gratuitos'], ['paid', 'Pagos']].map(([k, t]) => `<option value="${k}" ${S.bprice === k ? 'selected' : ''}>${t}</option>`).join('')}</select></div></div>
  <p class="bcount">${l.length} ${l.length === 1 ? 'evento' : 'eventos'}</p>${l.length ? `<div class="bgrid">${l.map(card).join('')}</div>` : empty('Nenhum evento encontrado. Tente outros filtros.')}</div>`;
}

/* ---------- página do evento e compra ---------- */
function rgCalc() {
  const g = S.rg, e = evById(g.ev), t = D.tkOf(e, g.tk), c = e.coupons.find(x => x.code === g.cp), disc = c ? Math.min(t.price, c.type === 'pct' ? Math.round(t.price * c.v) / 100 : c.v) : 0;
  const adds = g.buy.map(id => D.itOf(e, id)).filter(i => i && !t.incl.includes(i.id)), add = adds.reduce((a, i) => a + i.price, 0);
  return { e, t, c, disc, adds, add, total: t.price - disc + add };
}
const initRg = e => { const t = e.tickets.find(x => !x.off && D.tkLeft(e, x) !== 0) || e.tickets[0]; S.rg = { ev: e.id, tk: t.id, buy: [], cp: '', cpTxt: '', pay: 'pix', other: false, pn: '', pe: '' }; };
export function bEventoPage() {
  const e = evById(S.buyEv); if (!e) { S.screen = 'descobrir'; return descobrir(); }
  if (!S.rg || S.rg.ev !== e.id) initRg(e);
  const s = stateOf(e), org = D.orgOf(e.org), mine = myOrder(e), left = D.evLeft(e), c = rgCalc(), g = S.rg, t = c.t, tks = e.tickets.filter(x => !x.off), adds = e.items.filter(i => !i.off);
  const panel = s ? `<div class="bp"><h3>${s[1]}</h3><p class="sub">${D.isPast(e) ? 'Este evento já aconteceu.' : e.st === 'pausado' ? 'O organizador pausou as vendas por enquanto.' : 'Todas as vagas foram preenchidas.'}</p></div>`
    : `<div class="bp"><h3>Sua inscrição</h3>
    <div class="bsel1"><span><small>Ingresso escolhido</small><b>${esc(t.n)}</b></span><b class="px">${t.price ? D.moneyS(t.price) : 'Grátis'}</b></div>
    ${adds.length ? `<h4>Compras adicionais <small>opcional</small></h4><div class="opts3">${adds.map(i => { const inc = t.incl.includes(i.id), on = inc || g.buy.includes(i.id); return `<button class="o3" role="checkbox" aria-checked="${on}" data-a="rgAdd" data-v="${i.id}" ${inc ? 'disabled' : ''}><span class="grow"><b>${esc(i.n)}</b><small>${inc ? 'Já incluso no seu ingresso' : esc(i.p || 'Evento todo')}</small></span><b class="px">${inc ? 'Incluso' : D.moneyS(i.price)}</b><i class="ck">${ic('check', 12, 3)}</i></button>`; }).join('')}</div>` : ''}
    <label class="chk2"><input type="checkbox" id="bOther" ${g.other ? 'checked' : ''} data-a="rgWho"><span>Estou comprando para <b>outra pessoa</b></span></label>
    ${g.other ? `<div class="fgrid2"><div class="fld"><label for="pn">Nome da pessoa</label><input id="pn" value="${esc(g.pn)}"></div><div class="fld"><label for="pe">E-mail</label><input id="pe" type="email" value="${esc(g.pe)}"></div></div>` : ''}
    ${t.price ? `<h4>Cupom ou voucher <small>opcional</small></h4>${c.c ? `<div class="cpok">${ic('percent', 16, 2)}<span class="grow"><code>${esc(c.c.code)}</code> − ${D.money(c.disc)}</span><button class="btn ghost sm" data-a="cpClear">Remover</button></div>` : `<div class="cpf"><input id="cp" placeholder="Código do cupom" value="${esc(g.cpTxt || '')}" autocomplete="off"><button class="btn sec sm" data-a="cpApply">Aplicar</button></div>`}` : ''}
    ${c.total ? `<h4>Pagamento</h4><div class="seg" id="paySeg">${[['pix', 'Pix'], ['cartao', 'Cartão']].map(([k, l]) => `<button type="button" aria-pressed="${g.pay === k}" data-a="rgPay" data-v="${k}">${l}</button>`).join('')}</div>` : ''}
    <div class="bsum"><div><span>${esc(t.n)}</span><span>${t.price ? D.money(t.price) : 'Grátis'}</span></div>${c.disc ? `<div><span>Cupom ${esc(c.c.code)}</span><span>− ${D.money(c.disc)}</span></div>` : ''}${c.add ? `<div><span>${c.adds.length} ${c.adds.length === 1 ? 'compra adicional' : 'compras adicionais'}</span><span>${D.money(c.add)}</span></div>` : ''}<div class="tot"><span>Total</span><span>${c.total ? D.money(c.total) : 'Grátis'}</span></div></div>
    <button class="btn block" data-a="rgGo">${S.profile !== 'buyer' ? 'Entrar para comprar' : c.total ? (g.pay === 'pix' ? 'Pagar com Pix' : 'Pagar com cartão') + ' · ' + D.money(c.total) : 'Confirmar inscrição'}</button><p class="foot" style="text-align:center;margin-top:10px">${c.total ? 'Os códigos são liberados quando o pagamento confirmar.' : 'Seus códigos aparecem em Meus ingressos.'}</p></div>`;
  return `<div class="bwrap"><nav class="crumb" aria-label="Trilha"><button class="crumb-bk" data-a="bBack">${ic('chevL', 16, 2.2)}<span>Voltar</span></button><i class="crumb-sep"></i><a href="#" data-a="bBack">Descobrir</a>${ic('chevR', 13, 2)}<span>${esc(e.t)}</span></nav>
  <header class="bhero cv-${GCLS[e.cat] || 'ceu'}"><div class="row g2" style="flex-wrap:wrap"><span class="pill gl">${esc(e.cat)}</span>${originTag(e)}${s ? `<span class="pill gl">${s[1]}</span>` : left && left < 30 ? `<span class="pill gl">Últimas ${left} vagas</span>` : ''}</div><h1>${esc(e.t)}</h1><p>por <b>${esc(org.n)}</b>${org.via === 'alva' ? ' · igreja, evento publicado pelo Alva' : ''}</p>
   <div class="binfo"><div>${ic('calendar', 18, 1.9)}<span><b>${D.whenOf(e)}</b>${e.time}${e.periods.length ? ' · ' + e.periods.join(' e ') : ''}</span></div><div>${ic('pin', 18, 1.9)}<span><b>${esc(e.venue)}</b>${esc(e.city)}, ${e.uf}</span></div></div></header>
  ${mine ? `<div class="bmine">${ic('ticket', 18, 2)}<span class="grow"><b>Você já tem ingresso para este evento</b> · ${esc(D.tkOf(e, mine.tk).n)}. Se quiser, pode comprar outro, por exemplo para um amigo.</span><button class="btn sec sm" data-a="bOrd" data-v="${mine.id}">Ver meus ingressos</button></div>` : ''}
  <div class="bev"><div class="bev-m"><h3>Sobre o evento</h3><p class="bdesc">${esc(e.desc)}</p>
   <h3>Escolha o ingresso</h3><div class="opts3 big" role="radiogroup">${tks.map(x => { const l = D.tkLeft(e, x), out = l === 0; return `<button class="o3" role="radio" aria-checked="${x.id === g.tk}" data-a="rgTk" data-v="${x.id}" ${out || s ? 'disabled' : ''}><span class="grow"><b>${esc(x.n)}</b><small>${out ? 'Esgotado' : esc(x.desc)}</small>${x.incl.length ? `<small class="inc">Inclui ${x.incl.map(id => esc(D.itLabel(D.itOf(e, id)))).join(', ')}</small>` : ''}${x.per.length ? `<small class="inc">Vale só ${x.per.join(' e ')}</small>` : ''}${l != null && l > 0 && l <= 15 ? `<small class="inc">Restam ${l}</small>` : ''}</span><b class="px">${x.price ? D.moneyS(x.price) : 'Grátis'}</b><i class="rd"></i></button>`; }).join('')}</div>
   ${adds.length ? `<p class="foot">${ic('gift', 13, 2)} Você escolhe as compras adicionais (${adds.map(D.itLabel).join(', ')}) no painel ao lado.</p>` : ''}
   <div class="bog"><span class="oav">${initials(org.n)}</span><span class="grow"><b>${esc(org.n)}</b><small>${org.via === 'alva' ? 'Igreja · evento publicado pelo Alva' : 'Organizador no VEM'}</small></span></div>
   <p class="foot">Cancelamento: até 7 dias antes do evento, com reembolso integral. O organizador pode ter regras próprias.</p></div><aside class="bev-s">${panel}</aside></div></div>`;
}
Object.assign(A, {
  bEvento: v => { S.buyEv = v; S.screen = 'bEvento'; render(); window.scrollTo(0, 0); },
  bBack: () => { S.screen = 'descobrir'; render(); }, bCat: v => { S.bcat = v; render(true); }, bCity: v => { S.bcity = v; render(true); }, bPrice: v => { S.bprice = v; render(true); },
  rgTk: v => { const t = D.tkOf(evById(S.rg.ev), v); S.rg.tk = v; S.rg.buy = S.rg.buy.filter(id => !t.incl.includes(id)); render(true); },
  rgAdd: v => { const g = S.rg; g.buy = g.buy.includes(v) ? g.buy.filter(x => x !== v) : [...g.buy, v]; render(true); },
  rgWho: () => { S.rg.other = !S.rg.other; render(true); }, rgPay: v => { S.rg.pay = v; render(true); },
  cpApply: () => { const g = S.rg, e = evById(g.ev), code = (val('cp') || '').toUpperCase(), c = e.coupons.find(x => x.code === code); if (!code) return toast('Digite o código do cupom.', 'bad'); const why = couponOk(c, D.BUYER.e); if (why) { g.cpTxt = code; return toast(why + '.', 'bad'); } g.cp = c.code; g.cpTxt = ''; render(true); toast('Cupom aplicado'); },
  cpClear: () => { S.rg.cp = ''; render(true); },
  rgGo: () => { if (S.profile !== 'buyer') { toast('Entre na sua conta para comprar.', 'bad'); S.profile = null; S.screen = 'login'; render(); return; } const g = S.rg; if (g.other) { if (!g.pn.trim() || !/@/.test(g.pe)) return toast('Informe o nome e um e-mail válido da pessoa.', 'bad'); } const c = rgCalc(); if (!c.total) return place(c); pay(c); },
  bOrd: v => { S.ord = v; S.screen = 'ingressos'; render(); const o = D.ORDERS.find(x => x.id === v); if (o) ordDlg(o); },
  bTicket: v => ordDlg(D.ORDERS.find(x => x.id === v)),
});
function place(c) {
  const g = S.rg, e = c.e, st = c.total ? 'pendente' : 'pago', o = { id: 'p' + Date.now(), ev: e.id, buyer: D.BUYER, at: D.TODAY, tk: g.tk, buy: c.adds.map(i => i.id), cp: c.c ? c.c.code : '', st, m: g.pay, ck: {} };
  if (g.other) o.part = { n: g.pn.trim(), e: g.pe.trim() }; D.ORDERS.push(o); if (c.c && st === 'pago') c.c.uses++; S.rg = null; closeDlg();
  dlg(`<div class="okc">${ic('check', 30, 2.5)}</div><h2>${c.total ? 'Aguardando o pagamento' : 'Inscrição confirmada!'}</h2><p class="lede">${c.total ? `Assim que o ${g.pay === 'pix' ? 'Pix' : 'cartão'} cair, seus códigos são liberados.` : 'Seus QR Codes já estão em Meus ingressos.'}</p><div class="ft2"><button class="btn" data-a="bOrd" data-v="${o.id}">Ver meus ingressos</button></div>`);
  if (c.total) setTimeout(() => { o.st = 'pago'; const c2 = e.coupons.find(x => x.code === o.cp); if (c2) c2.uses++; if (['ingressos', 'bEvento'].includes(S.screen)) render(true); toast('Pagamento confirmado'); }, 3500);
}
function pay(c) {
  const kind = S.rg.pay, cells = Array.from({ length: 441 }, (_, i) => { const x = i % 21, y = Math.floor(i / 21), f = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); const edge = f && (x % 14 === 0 || x % 14 === 6 || y % 14 === 0 || y % 14 === 6 || (x % 14 >= 2 && x % 14 <= 4 && y % 14 >= 2 && y % 14 <= 4)); return f ? (edge ? 1 : 0) : ((x * 7 + y * 13 + x * y) % 5 < 2 ? 1 : 0); });
  const d = dlg(kind === 'cartao' ? `<h2>Pagar com cartão</h2><p class="lede">${D.money(c.total)} à vista.</p><div class="cardv">${ic('card', 22, 1.9)}<span class="grow"><b>Visa final 4242</b><small>Cartão salvo na sua conta</small></span>${chip('pago', 'Padrão')}</div><div class="ft2"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn" id="pgo">Pagar ${D.money(c.total)}</button></div>`
    : `<h2>Pagar com Pix</h2><p class="lede">${D.money(c.total)} · a inscrição confirma assim que o pagamento cair.</p><div class="pixqr">${cells.map(x => `<i style="background:${x ? '#010f12' : '#fff'}"></i>`).join('')}</div><div class="ft2" style="flex-wrap:wrap"><button class="btn sec" data-a="soon" data-v="Código Pix copiado">Copiar código Pix</button><button class="btn" id="pgo">Já paguei</button></div>`);
  $('#pgo', d).addEventListener('click', e => later(e.currentTarget, 700, () => place(c)));
}

/* ---------- meus ingressos ---------- */
export function ingressos() {
  const all = D.MY().sort((a, b) => evById(a.ev).d < evById(b.ev).d ? -1 : 1);
  return `<div class="bwrap"><h1 class="bh1">Meus ingressos</h1>${all.length ? `<div class="stubs">${all.map(o => { const e = evById(o.ev), t = D.tkOf(e, o.tk), n = D.codes(e, o).length, used = D.codes(e, o).filter(c => o.ck[c.k]).length; return `<button class="stub" data-a="bTicket" data-v="${o.id}">${cvr(e, 120, 'stubc')}<span class="stub-b"><b>${esc(e.t)}</b><small>${D.whenOf(e)} · ${esc(e.city)}</small><small>${esc(t.n)}${o.buy.length ? ' · +' + o.buy.length + ' ' + (o.buy.length === 1 ? 'compra' : 'compras') : ''}${n ? ` · ${n} ${n === 1 ? 'código' : 'códigos'}${used ? ` · ${used} usado${used === 1 ? '' : 's'}` : ''}` : ''}</small><span class="row g2" style="margin-top:8px">${ordChip(o)}${D.isPast(e) ? '<span class="pill">Anterior</span>' : ''}</span></span>${ic('chevR', 16, 2.2)}</button>`; }).join('')}</div>` : empty('Você ainda não tem ingressos.')}</div>`;
}
function ordDlg(o) {
  const e = evById(o.ev), t = D.tkOf(e, o.tk), cs = D.codes(e, o), locked = o.st !== 'pago';
  dlg(`<h2>${esc(e.t)}</h2><p class="lede">${D.whenOf(e)} · ${esc(e.venue)} · ${ordChip(o)}</p>
  ${o.st === 'pendente' ? note('alert', 'Os códigos são liberados quando o pagamento confirmar.', 'warn') : locked ? note('alert', 'Esta inscrição foi cancelada. Os códigos não valem mais.', 'warn') : ''}
  <dl class="dlist">${[['Ingresso', t.n], ...(o.part ? [['Participante', o.part.n]] : []), ...(D.addons(e, o).length ? [['Compras', D.addons(e, o).map(D.itLabel).join(', ')]] : []), ...(o.cp ? [['Cupom', o.cp]] : []), ['Total', D.total(e, o) ? D.money(D.total(e, o)) : 'Grátis']].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  ${cs.length ? `<p class="eb" style="margin:18px 0 10px">${cs.length} ${cs.length === 1 ? 'código' : 'códigos'} · um QR para cada</p><div class="qrs">${cs.map(c => { const at = o.ck[c.k]; return `<article class="qrc ${at ? 'used' : ''}"><div class="row between"><span><b>${esc(c.n)}</b><small>${c.tag === 'Acesso' ? 'Entrada' : c.tag === 'Incluso' ? 'Incluso no ingresso' : 'Compra adicional'}</small></span>${at ? '<span class="pill">Usado às ' + at + '</span>' : locked ? chip('pendente', 'Bloqueado') : chip('pago', 'Válido')}</div>${locked ? `<div class="qrbox lock">${ic('lock', 30, 1.8)}</div>` : `<div class="qrbox">${qrSVG(c.code)}</div>`}<code>${c.code}</code></article>`; }).join('')}</div><p class="foot">A equipe lê o QR na entrada, pelo app do VEM.</p>` : ''}
  <div class="ft2"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`, true);
}

/* ---------- perfil ---------- */
export function perfil() {
  return `<div class="bwrap narrow"><h1 class="bh1">Perfil</h1><section class="card"><div class="org-h"><span class="oav">${initials(D.BUYER.n)}</span><span class="grow"><b>${esc(D.BUYER.n)}</b><small>${esc(D.BUYER.e)}</small></span></div><dl class="dlist">${[['Pagamento salvo', 'Visa final 4242'], ['Notificações', 'Lembretes de eventos por e-mail'], ['Conta', 'A mesma no app e no site']].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></section></div>`;
}
export const buyerViews = { descobrir, bEvento: bEventoPage, ingressos, perfil };
export function buyerAfter() {
  const q = $('#bq'); if (q) q.addEventListener('input', e => { S.bq = e.target.value; const p = e.target.selectionStart; render(true); const n = $('#bq'); n.focus(); n.setSelectionRange(p, p); });
  const pn = $('#pn'); if (pn) pn.addEventListener('input', e => { S.rg.pn = e.target.value; }); const pe = $('#pe'); if (pe) pe.addEventListener('input', e => { S.rg.pe = e.target.value; });
  const cp = $('#cp'); if (cp) cp.addEventListener('input', e => { S.rg.cpTxt = e.target.value; });
}
