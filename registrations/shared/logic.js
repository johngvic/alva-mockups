/* VEM · regras de leitura de QR e check-in, usadas pelo app e pela web. */
import * as D from './data.js';

export const todayName = () => ({ 6: 'Sábado', 0: 'Domingo' }[new Date(D.TODAY + 'T12:00:00').getDay()] || '');
export const nowHM = () => new Date().toTimeString().slice(0, 5);

export function qrSVG(seed) {
  let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => { h ^= h << 13; h >>>= 0; h ^= h >>> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const N = 25; let r = '';
  const fin = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#010f12"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#010f12"/>`;
  const inF = (x, y) => (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { if (inF(x, y)) continue; if (rnd() < .5) r += `<rect x="${x}" y="${y}" width="1" height="1" fill="#010f12"/>`; }
  return `<svg viewBox="-2 -2 29 29" shape-rendering="crispEdges" role="img" aria-label="QR Code"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/>${r}${fin(0, 0)}${fin(18, 0)}${fin(0, 18)}</svg>`;
}

/* todos os códigos de um evento, com a pessoa e o horário de uso */
export const evCodes = e => D.ordersOf(e).flatMap(o => D.codes(e, o).map(c => ({ o, c, at: o.ck[c.k] || '' })));
export const accCodes = e => evCodes(e).filter(x => x.c.tag === 'Acesso');
export const ckStats = e => { const a = accCodes(e).filter(x => x.o.st === 'pago'); return { n: a.length, d: a.filter(x => x.at).length }; };
export const who = o => o.part ? o.part.n : o.buyer.n;

/* procura por código, ou por e-mail da inscrição (totem) */
export function ckFind(e, str) {
  const s = String(str).trim().toUpperCase(); if (!s) return null; const ac = evCodes(e);
  return ac.find(x => x.c.code === s) || ac.find(x => x.c.tag === 'Acesso' && !x.at && (x.o.buyer.e.toUpperCase() === s || (x.o.part && x.o.part.e && x.o.part.e.toUpperCase() === s))) || null;
}

/* avalia um código sem registrar nada: pronto (ready), já usado, pagamento pendente, outro dia etc. */
export function ckEval(e, hit, via = 'qr') {
  if (!hit) return { k: 'bad', icon: 'x', t: 'Código não encontrado', d: 'Esse código não pertence a este evento. Confira com a pessoa.' };
  const { o, c } = hit, tk = D.tkOf(e, o.tk).n, base = { who: who(o), tk, item: c.n };
  if (o.st === 'pendente') return { ...base, k: 'bad', icon: 'alert', t: 'Pagamento pendente', d: 'A inscrição ainda não foi paga. Peça para a pessoa concluir o pagamento.' };
  if (o.st !== 'pago') return { ...base, k: 'bad', icon: 'x', t: 'Inscrição cancelada', d: 'Esse ingresso não vale mais.' };
  if (!D.isToday(e)) return { ...base, k: 'warn', icon: 'calendar', t: 'Evento fora da data', d: `O evento acontece em ${D.whenOf(e)}.` };
  if (c.tag === 'Acesso' && e.checkin === 'periodo' && c.k.startsWith('p:') && c.k.slice(2) !== todayName()) return { ...base, k: 'warn', icon: 'calendar', t: 'Código de outro dia', d: `Este código vale ${c.k.slice(2) === 'Domingo' ? 'no domingo' : 'no sábado'}. Hoje é ${todayName().toLowerCase()}.` };
  if (o.ck[c.k]) return { ...base, k: 'warn', icon: 'clock', t: c.tag === 'Acesso' ? 'Já entrou' : 'Já retirado', d: `${c.tag === 'Acesso' ? 'Entrada' : 'Retirada'} registrada às ${o.ck[c.k]}.` };
  return { ...base, k: 'ok', ready: true, icon: 'check', t: c.tag === 'Acesso' ? 'Pode entrar' : 'Pode entregar', d: c.tag === 'Acesso' ? 'Confirme a entrada para registrar.' : `Confirme a entrega de ${c.n}.` };
}
export const ckCommit = hit => { hit.o.ck[hit.c.k] = nowHM(); };

/* valida e, se estiver tudo certo, registra a entrada ou a retirada do item */
export function ckResult(e, hit, via = 'qr') {
  const r = ckEval(e, hit, via);
  if (!r.ready) return r;
  ckCommit(hit);
  return { ...r, ready: false, t: hit.c.tag === 'Acesso' ? 'Entrada liberada' : 'Item entregue', d: hit.c.tag === 'Acesso' ? (via === 'totem' ? 'Entregue a pulseira.' : 'Pode entrar.') : `${hit.c.n} entregue.` };
}
