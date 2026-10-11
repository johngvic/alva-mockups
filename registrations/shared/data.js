/* VEM · dados fictícios compartilhados pelo app e pela web do produto de inscrições.
   Eventos das igrejas (origem "alva") chegam do Alva; eventos de empresas (origem "vem") nascem aqui.
   Taxas e forma de recebimento vêm da configuração de pagamentos do Assinaturas (valores de exemplo). */

export const TODAY = '2026-10-17';
export const money = v => 'R$ ' + (+v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const moneyS = v => (+v || 0) ? 'R$ ' + (+v).toLocaleString('pt-BR', { minimumFractionDigits: Number.isInteger(+v) ? 0 : 2, maximumFractionDigits: 2 }) : 'Grátis';
export const MON = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const WD = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const dt = s => new Date(s + 'T12:00:00');
export const dayLabel = s => { const d = dt(s); return `${WD[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`; };
export const dShort = s => { const d = dt(s); return `${d.getDate()} ${MON[d.getMonth()]}`; };
export const dBR = s => s ? s.slice(8) + '/' + s.slice(5, 7) + '/' + s.slice(0, 4) : '';
export const diffDays = (a, b) => Math.round((dt(a) - dt(b)) / 864e5);
export const addDays = (s, n) => { const d = dt(s); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
export const whenOf = e => e.d2 && e.d2 !== e.d ? `${dShort(e.d)} a ${dShort(e.d2)}` : dayLabel(e.d);

/* ---------- organizadores ---------- */
export const ORGS = [
  { id: 'o1', n: 'Alva Sede', kind: 'igreja', via: 'alva', city: 'São Paulo', uf: 'SP', doc: 'CNPJ 12.345.678/0001-90', owner: 'Rafael Pereira', email: 'financeiro@alvasede.org' },
  { id: 'o2', n: 'Alva Norte', kind: 'igreja', via: 'alva', city: 'São Paulo', uf: 'SP', doc: 'CNPJ 12.345.678/0002-71', owner: 'Ana Clara Lima', email: 'norte@alva.org' },
  { id: 'o3', n: 'Studio Vida Eventos', kind: 'empresa', via: 'vem', city: 'São Paulo', uf: 'SP', doc: 'CNPJ 45.678.901/0001-23', owner: 'Marina Duarte', email: 'marina@studiovida.com.br' },
  { id: 'o4', n: 'Conecta Treinamentos', kind: 'empresa', via: 'vem', city: 'Campinas', uf: 'SP', doc: 'CNPJ 56.789.012/0001-34', owner: 'Bruno Tavares', email: 'bruno@conecta.com.br' },
];
export const orgOf = id => ORGS.find(o => o.id === id);

/* configuração de pagamentos: vem do Assinaturas, aqui só leitura */
export const PAY = {
  pix: { n: 'Pix', pct: .0099, fix: 0, settle: 'no dia seguinte' },
  cartao: { n: 'Cartão de crédito', pct: .0399, fix: .49, settle: 'em 2 dias úteis' },
};
export const CATS = ['Conferência', 'Retiro', 'Congresso', 'Curso', 'Show', 'Encontro', 'Outro'];
export const CATG = { Conferência: 'ceu', Retiro: 'lima', Congresso: 'damasco', Curso: 'menta', Show: 'rosado', Encontro: 'salvia', Outro: 'ceu' };

/* ---------- eventos ---------- */
const T = (id, n, desc, price, o = {}) => ({ id, n, desc, price, cap: 0, incl: [], per: [], off: false, ...o });
const I = (id, n, price, p = '') => ({ id, n, price, p, off: false });
export const EVENTS = [
  { id: 'e1', org: 'o1', origin: 'alva', t: 'Retiro de Jovens 2026', cat: 'Retiro', city: 'Mairiporã', uf: 'SP', venue: 'Chácara Alva', d: '2026-10-17', d2: '2026-10-18', time: '08h', st: 'publicado', checkin: 'periodo', periods: ['Sábado', 'Domingo'], cap: 100,
    desc: 'Dois dias de retiro para jovens na Chácara Alva: louvor, estudos e comunhão. Vagas limitadas.',
    tickets: [T('t1', 'Participante', 'Hospedagem e programação do retiro.', 120), T('t2', 'Participante + almoços', 'Programação e os dois almoços.', 160, { cap: 40, incl: ['a1', 'a2'] }), T('t3', 'Equipe de serviço', 'Para quem serve no retiro.', 80, { cap: 20 })],
    items: [I('a1', 'Almoço', 25, 'Sábado'), I('a2', 'Almoço', 25, 'Domingo')], coupons: [{ code: 'RETIRO10', type: 'val', v: 20, exp: '2026-10-16', uses: 0 }] },
  { id: 'e2', org: 'o1', origin: 'alva', t: 'Conferência Missões', cat: 'Conferência', city: 'São Paulo', uf: 'SP', venue: 'Auditório Alva Sede', d: '2026-10-09', d2: '', time: '19h30', st: 'encerrado', checkin: 'inteiro', periods: [], cap: 150,
    desc: 'Noite de conferência sobre missões, com missionários convidados.',
    tickets: [T('t1', 'Ingresso', 'Entrada na conferência.', 60)], items: [], coupons: [] },
  { id: 'e3', org: 'o1', origin: 'alva', t: 'Conferência de Mulheres', cat: 'Conferência', city: 'São Paulo', uf: 'SP', venue: 'Auditório Alva Sede', d: '2026-11-14', d2: '', time: '08h30', st: 'publicado', checkin: 'inteiro', periods: [], cap: 300,
    desc: 'Uma manhã de conferência para mulheres, com palestras, louvor e comunhão. Escolha o ingresso com café, almoço ou VIP.',
    tickets: [T('t1', 'Normal', 'Entrada na conferência.', 80), T('t2', 'Com café', 'Entrada e café da manhã.', 95, { incl: ['c1'] }), T('t3', 'Com café e almoço', 'Entrada, café da manhã e almoço.', 125, { incl: ['c1', 'c2'] }), T('t4', 'VIP', 'Lugar na frente, café, almoço e kit.', 180, { cap: 40, incl: ['c1', 'c2', 'c3'] })],
    items: [I('c1', 'Café da manhã', 15), I('c2', 'Almoço', 35), I('c3', 'Kit de boas-vindas', 20)], coupons: [{ code: 'MULHERES10', type: 'val', v: 10, exp: '2026-11-10', uses: 0 }] },
  { id: 'e4', org: 'o2', origin: 'alva', t: 'Noite de Louvor Norte', cat: 'Show', city: 'São Paulo', uf: 'SP', venue: 'Alva Norte · Santana', d: '2026-10-24', d2: '', time: '19h30', st: 'publicado', checkin: 'inteiro', periods: [], cap: 220,
    desc: 'Uma noite aberta de louvor e adoração. Entrada gratuita, mas é preciso se inscrever.',
    tickets: [T('t1', 'Inscrição', 'Entrada gratuita.', 0)], items: [], coupons: [] },
  { id: 'e5', org: 'o3', origin: 'vem', t: 'Workshop de Fotografia Urbana', cat: 'Curso', city: 'São Paulo', uf: 'SP', venue: 'Estúdio Vida · Pinheiros', d: '2026-10-24', d2: '', time: '09h', st: 'publicado', checkin: 'inteiro', periods: [], cap: 40,
    desc: 'Um dia de prática nas ruas de Pinheiros com fotógrafos profissionais: composição, luz natural e edição no celular.',
    tickets: [T('t1', 'Individual', 'Uma vaga no workshop.', 180, { cap: 30 }), T('t2', 'Dupla', 'Duas vagas, para você e um amigo.', 320, { cap: 10 }), T('t3', 'Premium', 'Vaga, almoço e apostila impressa.', 260, { cap: 12, incl: ['i1', 'i2'] })],
    items: [I('i1', 'Almoço', 40), I('i2', 'Apostila impressa', 25)], coupons: [{ code: 'FOTO15', type: 'pct', v: 15, exp: '2026-10-22', uses: 0 }] },
  { id: 'e6', org: 'o3', origin: 'vem', t: 'Festival Gospel Zona Sul', cat: 'Show', city: 'São Paulo', uf: 'SP', venue: 'Espaço Interlagos', d: '2026-10-31', d2: '2026-11-01', time: '16h', st: 'publicado', checkin: 'periodo', periods: ['Sábado', 'Domingo'], cap: 1200,
    desc: 'Dois dias de música com grandes nomes do gospel nacional, praça de alimentação e área kids.',
    tickets: [T('t1', 'Pista', 'Acesso à pista.', 90), T('t2', 'Pista Premium', 'Pista com área reservada e fila rápida.', 160, { cap: 300 }), T('t3', 'Camarote', 'Camarote com open bar de sucos e lanches.', 280, { cap: 80, incl: ['f2'] }), T('t4', 'Pista · só sábado', 'Acesso à pista apenas no sábado.', 60, { per: ['Sábado'] })],
    items: [I('f1', 'Estacionamento', 30, 'Sábado'), I('f1b', 'Estacionamento', 30, 'Domingo'), I('f2', 'Camiseta oficial', 60)], coupons: [{ code: 'FESTIVAL20', type: 'pct', v: 20, exp: '2026-10-28', uses: 0 }] },
  { id: 'e7', org: 'o3', origin: 'vem', t: 'Congresso de Empreendedores 2027', cat: 'Congresso', city: 'São Paulo', uf: 'SP', venue: '', d: '2027-03-20', d2: '', time: '09h', st: 'rascunho', checkin: 'inteiro', periods: [], cap: 500, desc: '',
    tickets: [T('t1', 'Ingresso', '', 0)], items: [], coupons: [] },
  { id: 'e8', org: 'o4', origin: 'vem', t: 'Curso Intensivo de Liderança', cat: 'Curso', city: 'Campinas', uf: 'SP', venue: 'Centro de Convenções Conecta', d: '2026-11-07', d2: '2026-11-08', time: '08h30', st: 'publicado', checkin: 'periodo', periods: ['Sábado', 'Domingo'], cap: 60,
    desc: 'Dois dias de imersão em liderança de equipes, comunicação e gestão de conflitos.',
    tickets: [T('t1', 'Presencial', 'Os dois dias, com material.', 450, { cap: 40 }), T('t2', 'Presencial + almoços', 'Os dois dias, material e almoços.', 520, { cap: 20, incl: ['l1', 'l2'] })],
    items: [I('l1', 'Almoço', 35, 'Sábado'), I('l2', 'Almoço', 35, 'Domingo')], coupons: [] },
  { id: 'e9', org: 'o3', origin: 'vem', t: 'Encontro de Casais Aliança', cat: 'Encontro', city: 'Atibaia', uf: 'SP', venue: 'Pousada Recanto', d: '2026-11-21', d2: '2026-11-22', time: '14h', st: 'pausado', checkin: 'inteiro', periods: [], cap: 24,
    desc: 'Um fim de semana para casais fortalecerem a relação, com programação, refeições e hospedagem.',
    tickets: [T('t1', 'Casal', 'Hospedagem e refeições para duas pessoas.', 890, { cap: 24 })], items: [], coupons: [] },
];
export const evOf = id => EVENTS.find(e => e.id === id);
/* banners que o organizador configurou para aparecer no topo do Descobrir (app e site) */
Object.assign(EVENTS.find(e => e.id === 'e6'), { banner: { on: true, title: 'Festival Gospel Zona Sul', line: 'Dois dias de música, praça de alimentação e área kids.' } });
Object.assign(EVENTS.find(e => e.id === 'e3'), { banner: { on: true, title: 'Conferência de Mulheres', line: 'Uma manhã para mulheres: escolha o ingresso com café, almoço ou VIP.' } });
Object.assign(EVENTS.find(e => e.id === 'e1'), { banner: { on: true, title: 'Retiro de Jovens 2026', line: 'Hoje e amanhã na Chácara Alva. Últimos ingressos.' } });
export const tkOf = (e, id) => e.tickets.find(t => t.id === id) || e.tickets[0];
export const itOf = (e, id) => e.items.find(i => i.id === id);
export const itLabel = i => i.n + (i.p ? ' · ' + i.p : '');
export const evFrom = e => { const a = e.tickets.filter(t => !t.off); return a.length ? Math.min(...a.map(t => t.price)) : 0; };
export const isPast = e => (e.d2 || e.d) < TODAY;
export const isToday = e => e.d <= TODAY && (e.d2 || e.d) >= TODAY;
/* o que falta para publicar (a mesma regra do Alva) */
export const missing = e => [!e.desc?.trim() && 'descrição', !e.venue?.trim() && 'local', !e.city?.trim() && 'cidade', !e.tickets.length && 'ingresso'].filter(Boolean);

/* ---------- inscrições (pedidos) ---------- */
const NAMES = ['Giovanna Martins', 'Renan Ferreira', 'Camila Sousa', 'Thiago Mendes', 'Larissa Rocha', 'Marcos Vieira', 'Beatriz Nunes', 'Juliana Reis', 'Patrícia Gomes', 'Débora Alves', 'Helena Costa', 'Sandra Lopes', 'Rebeca Dias', 'Marta Silveira', 'Aline Barros', 'Felipe Andrade', 'Diego Faria', 'Renata Campos', 'Elisa Moura', 'Lucas Prado', 'Gabriela Telles', 'Pedro Henrique Lima', 'Carolina Furtado', 'Bruno Xavier', 'Natália Pires', 'Vinícius Rangel', 'Mariana Cunha', 'Rodrigo Esteves', 'Fernanda Lacerda', 'Gustavo Brandão', 'Isabela Moraes', 'Leonardo Teixeira', 'Priscila Antunes', 'Eduardo Salgado', 'Vanessa Duarte', 'André Luiz Ramos', 'Tatiane Peixoto', 'Fábio Nogueira', 'Cristiane Matos', 'Samuel Barreto', 'Raquel Figueira', 'Henrique Zanetti', 'Luciana Azevedo', 'Matheus Coelho', 'Bianca Falcão', 'Otávio Menezes', 'Paula Guimarães', 'Caio Albuquerque', 'Sofia Bittencourt', 'Joaquim Neves'];
let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const pick = a => a[Math.floor(rnd() * a.length)];
const mail = n => n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z ]/g, '').trim().replace(/\s+/g, '.') + '@email.com';
export const ORDERS = [];
let oid = 0;
export const accKeys = (e, tk) => e.checkin === 'inteiro' ? ['geral'] : e.checkin === 'periodo' ? (tk.per?.length ? e.periods.filter(p => tk.per.includes(p)) : e.periods).map(p => 'p:' + p) : [];
function gen(e, n, opts = {}) {
  const { weights, paidRate = .86, usedRate = 0, items = .3, coupon = .12 } = opts;
  const start = addDays(e.d, -(opts.win || 70));
  for (let i = 0; i < n; i++) {
    const buyer = NAMES[(i * 7 + e.id.charCodeAt(1) * 3 + Math.floor(rnd() * 5)) % NAMES.length];
    let r = rnd() * (weights ? weights.reduce((a, b) => a + b, 0) : e.tickets.length), ti = 0;
    if (weights) { for (; ti < weights.length - 1 && r > weights[ti]; ti++) r -= weights[ti]; } else ti = Math.floor(r);
    const tk = e.tickets[ti], x = rnd();
    const st = x < paidRate ? 'pago' : x < paidRate + .08 ? 'pendente' : x < paidRate + .11 ? 'cancelado' : 'reembolsado';
    const buy = e.items.filter(it => !tk.incl.includes(it.id) && rnd() < items).map(it => it.id);
    const cp = e.coupons.length && rnd() < coupon ? e.coupons[0].code : '';
    const span = Math.max(1, Math.min(diffDays(TODAY, start), diffDays(e.d, start) - 1)), at = addDays(start, Math.floor(rnd() * span));
    const o = { id: 'p' + (++oid), ev: e.id, buyer: { n: buyer, e: mail(buyer) }, at, tk: tk.id, buy, cp, st, m: rnd() < .62 ? 'pix' : 'cartao', ck: {} };
    if (st === 'pago' && usedRate) {
      const keys = accKeys(e, tk);
      keys.forEach((k, ki) => { if (rnd() < usedRate / (1 + ki * .6)) o.ck[k] = String(8 + Math.floor(rnd() * 3)).padStart(2, '0') + ':' + String(Math.floor(rnd() * 60)).padStart(2, '0'); });
    }
    ORDERS.push(o);
  }
}
gen(EVENTS[0], 78, { weights: [6, 3, 1.2], usedRate: .62, items: .35 });
gen(EVENTS[1], 112, { usedRate: .78 });
gen(EVENTS[2], 64, { weights: [4, 3, 4, 1], items: .3 });
gen(EVENTS[3], 140, { paidRate: 1 });
gen(EVENTS[4], 22, { weights: [5, 2, 2], items: .5 });
gen(EVENTS[5], 96, { weights: [5, 3, 1.5, 2], items: .4 });
gen(EVENTS[7], 14, { weights: [3, 1] });
gen(EVENTS[8], 9, { paidRate: .8 });
/* cupons e vendas do dia a dia: contagem de usos */
ORDERS.forEach(o => { const c = evOf(o.ev).coupons.find(x => x.code === o.cp); if (c && o.st === 'pago') c.uses++; });

/* ---------- cálculo ---------- */
export const couponDisc = (e, o) => { const c = e.coupons.find(x => x.code === o.cp); if (!c) return 0; const p = tkOf(e, o.tk).price; return Math.min(p, c.type === 'pct' ? Math.round(p * c.v) / 100 : c.v); };
export const ticketNet = (e, o) => tkOf(e, o.tk).price - couponDisc(e, o);
export const addons = (e, o) => o.buy.map(id => itOf(e, id)).filter(Boolean);
export const total = (e, o) => ticketNet(e, o) + addons(e, o).reduce((a, i) => a + i.price, 0);
export const fee = (e, o) => { const t = total(e, o); if (!t) return 0; const f = PAY[o.m]; return Math.round((t * f.pct + f.fix) * 100) / 100; };
export const slug = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toUpperCase();
/* códigos de uma inscrição: acesso, itens inclusos e compras (mesma regra do Alva) */
export function codes(e, o) {
  const tk = tkOf(e, o.tk), num = String(400 + (+e.id.slice(1)) * 37 + (+o.id.slice(1) % 97));
  const ps = tk.per?.length ? e.periods.filter(p => tk.per.includes(p)) : e.periods;
  const acc = e.checkin === 'inteiro' ? [{ k: 'geral', n: 'Entrada geral', tag: 'Acesso', code: `VEM-${num}-ACESSO-GERAL` }] : e.checkin === 'periodo' ? ps.map(p => ({ k: 'p:' + p, n: 'Entrada · ' + p, tag: 'Acesso', code: `VEM-${num}-${slug(p)}` })) : [];
  const inc = tk.incl.map(id => itOf(e, id)).filter(Boolean).map(i => ({ k: 'inc:' + i.id, n: itLabel(i), tag: 'Incluso', code: `VEM-${num}-${slug(itLabel(i))}-INC` }));
  const buy = addons(e, o).map(i => ({ k: 'i:' + i.id, n: itLabel(i), tag: 'Compra', code: `VEM-${num}-${slug(itLabel(i))}` }));
  return e.checkin === 'off' ? [] : [...acc, ...inc, ...buy];
}
export const ordersOf = e => ORDERS.filter(o => o.ev === e.id);
export function stats(e) {
  const os = ordersOf(e), live = os.filter(o => o.st === 'pago' || o.st === 'pendente'), paid = os.filter(o => o.st === 'pago'), pend = os.filter(o => o.st === 'pendente');
  const gross = paid.reduce((a, o) => a + total(e, o), 0), fees = paid.reduce((a, o) => a + fee(e, o), 0), toRec = pend.reduce((a, o) => a + total(e, o), 0);
  const acc = paid.flatMap(o => codes(e, o).filter(c => c.tag === 'Acesso').map(c => ({ o, c, at: o.ck[c.k] || '' })));
  return { os, sold: live.length, paid: paid.length, pend: pend.length, gross, fees, net: gross - fees, toRec, disc: paid.reduce((a, o) => a + couponDisc(e, o), 0), codes: acc.length, used: acc.filter(x => x.at).length };
}
export const tkSold = (e, t) => ORDERS.filter(o => o.ev === e.id && o.tk === t.id && (o.st === 'pago' || o.st === 'pendente')).length;
export const tkLeft = (e, t) => t.cap ? Math.max(0, t.cap - tkSold(e, t)) : null;
export const evLeft = e => { const left = e.cap - stats(e).sold; return Math.max(0, left); };

/* ---------- pessoas ---------- */
export const BUYER = { n: 'Ana Costa', e: 'ana.costa@email.com' };
const mine = (ev, tk, buy, st, m, cp = '', ck = {}) => { const o = { id: 'p' + (++oid), ev, buyer: BUYER, at: addDays(TODAY, -6), tk, buy, cp, st, m, ck }; ORDERS.push(o); return o; };
mine('e1', 't2', [], 'pago', 'cartao', '', {});
mine('e3', 't3', ['c3'], 'pago', 'pix');
mine('e5', 't1', ['i2'], 'pendente', 'pix');
mine('e2', 't1', [], 'pago', 'pix', '', { geral: '19:41' });
export const MY = () => ORDERS.filter(o => o.buyer === BUYER);
export const STAFF = [
  { id: 's1', n: 'Rafael Pereira', e: 'rafael@alvasede.org', org: 'o1', role: 'Coordenação', events: ['e1', 'e2', 'e3'], last: 'hoje' },
  { id: 's2', n: 'Juliana Reis', e: 'juliana.reis@email.com', org: 'o1', role: 'Portaria', events: ['e1'], last: 'hoje' },
  { id: 's3', n: 'Diego Martins', e: 'diego.martins@email.com', org: 'o1', role: 'Portaria', events: ['e1', 'e3'], last: 'há 2 dias' },
  { id: 's4', n: 'Camila Ribeiro', e: 'camila@studiovida.com.br', org: 'o3', role: 'Coordenação', events: ['e5', 'e6'], last: 'ontem' },
  { id: 's5', n: 'Tiago Nunes', e: 'tiago.n@email.com', org: 'o3', role: 'Portaria', events: ['e5', 'e6'], last: 'há 5 dias' },
  { id: 's6', n: 'Larissa Pinto', e: 'larissa.p@email.com', org: 'o4', role: 'Portaria', events: ['e8'], last: 'nunca' },
];
export const STAFF_ME = STAFF[1];
