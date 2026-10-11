/* VEM · web · a pessoa da inscrição: ingressos, compras e check-in. Mesmo desenho do detalhe da inscrição no Alva Web.
   Usado pelo organizador (inscrições e check-in do evento) e pela equipe (portaria). */
import { $, esc, ic, initials } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { ckEval, ckCommit, who } from '../shared/logic.js';
import { S, A, toast, dlg, closeDlg, confirmAct, chip, render } from './core.js';

const TONES = ['ceu', 'menta', 'damasco', 'rosado', 'lima', 'salvia'];
export const avatar = (n, big) => `<span class="pav ${big ? 'lg' : ''}" style="background:var(--t${TONES[n.length % 6]});color:var(--t${TONES[n.length % 6]}i)">${initials(n)}</span>`;
const PAYCHIP = o => o.st === 'pago' ? chip('pago', 'Pago') : o.st === 'pendente' ? chip('pendente', 'Pendente') : o.st === 'cancelado' ? chip('neutro', 'Cancelado') : chip('transf', 'Reembolsado');

/* opts: { key: código em foco (vindo de uma leitura), scan: resultado da leitura, admin: mostra reembolso e reenvio } */
export function personDlg(oid, opts = {}) {
  const o = D.ORDERS.find(x => x.id === oid); if (!o) return;
  const e = D.evOf(o.ev), t = D.tkOf(e, o.tk), cs = D.codes(e, o), blocked = o.st !== 'pago', done = cs.filter(c => o.ck[c.k]).length, tot = D.total(e, o), nm = who(o);
  S.pOpts = opts; S.pOid = oid;
  const scan = opts.scan ? `<div class="pscan ${opts.scan.k}">${ic(opts.scan.icon, 18, 2.2)}<div><b>${esc(opts.scan.t)}</b><span>${esc(opts.scan.d)}</span></div></div>` : '';
  dlg(`<div class="pdh"><div class="pdr">${avatar(nm, true)}<div><h3>${esc(nm)}</h3><p>${esc(e.t)}${o.part ? ` · comprado por ${esc(o.buyer.n)}` : ''}</p></div></div></div>
  ${scan}
  <dl class="pkv"><div><dt>E-mail</dt><dd>${esc(o.part ? o.part.e : o.buyer.e)}</dd></div><div><dt>Inscrição</dt><dd>${D.dBR(o.at)}</dd></div><div><dt>Ingresso</dt><dd>${esc(t.n)}</dd></div><div><dt>Pagamento</dt><dd>${PAYCHIP(o)}</dd></div>${tot ? `<div><dt>Total</dt><dd class="num">${D.money(tot)}${o.cp ? ` <span class="vtag">${ic('ticket', 11, 2)}${esc(o.cp)}</span>` : ''}</dd></div>` : ''}${tot && o.st === 'pago' ? `<div><dt>Forma</dt><dd>${D.PAY[o.m].n}</dd></div>` : ''}</dl>
  <div class="psh"><span class="pfl">Ingressos e compras</span><span class="muted2">${cs.length ? `${done} de ${cs.length} com check-in` : 'sem controle de entrada'}</span></div>
  ${blocked ? `<div class="pwarn">${ic('alert', 14, 2)}${o.st === 'pendente' ? 'O check-in libera quando o pagamento for confirmado.' : 'Esta inscrição não vale mais: os códigos estão bloqueados.'}</div>` : ''}
  ${cs.length ? `<div class="ptks">${cs.map(c => { const at = o.ck[c.k], r = ckEval(e, { o, c, at }), alt = c.tag !== 'Acesso'; return `<div class="ptk ${at ? 'in' : ''} ${opts.key === c.k ? 'foc' : ''}"><div class="ptkl"><div class="ptk1"><b>${esc(c.n)}</b>${chip(alt ? 'transf' : 'pago', c.tag)}</div><span class="ptkc">${c.code}</span></div>
    ${at ? `<button class="ptst ok" data-a="ptCk" data-v="${o.id}|${c.k}" title="Desfazer check-in">${ic('check', 13, 2.6)}Entrou às ${at}</button>` : r.ready ? `<button class="ptst" data-a="ptCk" data-v="${o.id}|${c.k}">Aguardando · fazer check-in</button>` : `<button class="ptst" disabled title="${esc(r.d)}">${blocked ? 'Bloqueado' : esc(r.t)}</button>`}</div>`; }).join('')}</div>` : ''}
  <div class="ft2" style="justify-content:space-between;flex-wrap:wrap">${opts.admin ? `<div class="row g2" style="flex-wrap:wrap">${o.st === 'pendente' ? `<button class="btn sec" data-a="ptPaid" data-v="${o.id}">Marcar como pago</button>` : ''}<button class="btn sec" data-a="ptResend" data-v="${o.id}">${ic('mail', 15, 2)}${o.st === 'pendente' ? 'Reenviar link de pagamento' : 'Reenviar ingresso'}</button>${o.st === 'pago' || o.st === 'pendente' ? `<button class="btn dng sm" data-a="ptCancel" data-v="${o.id}">${o.st === 'pago' ? 'Reembolsar' : 'Cancelar inscrição'}</button>` : ''}</div>` : '<span></span>'}<button class="btn sec" data-a="closeDlg">Fechar</button></div>`, true);
}
Object.assign(A, {
  ptCk: v => {
    const [oid, key] = v.split('|'), o = D.ORDERS.find(x => x.id === oid), e = D.evOf(o.ev), c = D.codes(e, o).find(x => x.k === key);
    if (o.ck[key]) { const old = o.ck[key]; delete o.ck[key]; toast(`Check-in desfeito (${c.n})`); personDlg(oid, { ...S.pOpts, scan: null, key }); render(true); return; }
    const hit = { o, c, at: '' }, r = ckEval(e, hit);
    if (!r.ready) { toast(r.t + '. ' + r.d, 'bad'); return; }
    ckCommit(hit); toast(`${c.tag === 'Acesso' ? 'Entrada registrada' : 'Item entregue'}: ${who(o)} · ${c.n}`);
    personDlg(oid, { ...S.pOpts, scan: { k: 'ok', icon: 'check', t: c.tag === 'Acesso' ? 'Entrada registrada' : 'Item entregue', d: `${c.n} às ${o.ck[key]}` }, key }); render(true);
  },
  ptPaid: v => { const o = D.ORDERS.find(x => x.id === v); o.st = 'pago'; personDlg(v, S.pOpts); render(true); toast('Pagamento confirmado manualmente'); },
  ptResend: v => { const o = D.ORDERS.find(x => x.id === v); toast(o.st === 'pendente' ? 'Link de pagamento reenviado' : 'Ingresso reenviado por e-mail'); },
  ptCancel: v => { const o = D.ORDERS.find(x => x.id === v), pago = o.st === 'pago', e = D.evOf(o.ev); confirmAct({ title: pago ? 'Reembolsar esta inscrição?' : 'Cancelar esta inscrição?', body: pago ? `O valor de ${D.money(D.total(e, o))} volta ao comprador pelo mesmo meio e os códigos deixam de valer.` : 'A vaga é liberada e os códigos deixam de valer.', label: pago ? 'Reembolsar' : 'Cancelar inscrição', fn: () => { o.st = pago ? 'reembolsado' : 'cancelado'; render(true); personDlg(v, S.pOpts); toast(pago ? 'Reembolso solicitado' : 'Inscrição cancelada'); } }); },
  person: (v, b, ev) => { const [oid, key] = v.split('|'); personDlg(oid, { key: key || undefined, admin: S.profile === 'org' }); },
});
