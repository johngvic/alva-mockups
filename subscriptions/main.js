/* Assinaturas · administração multiproduto · protótipo. Sistema à parte, com login próprio de administrador.
   Adaptação para Alva. Regras comerciais ainda pendentes; dados fictícios, sem integração ou persistência. */
import { $, $$, esc, ic, logo, logoMark, wait, fmtFull } from './shared/ui.js';

let DEFER = false, Q = [];
const ZK_LOGO = new URL('./shared/zelos-kids.webp', import.meta.url).href;
const ZK_SHEEP = new URL('./shared/zk-sheep.webp', import.meta.url).href;
/* marca da plataforma: neutra, porque aqui se administram vários produtos */
const pmark = (sz = 32) => `<span class="pmark" style="--s:${sz}px" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 11V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 13v1a4 4 0 0 1-4 4h-13"/></svg></span>`;
const brandP = (sz = 32, sub = true) => `<span class="brandp">${pmark(sz)}<span><b>Assinaturas</b>${sub ? '<small>Administração multiproduto</small>' : ''}</span></span>`;
/* logo de cada produto, em um selo com fundo claro */
const plogo = (code, size = 'md') => code === 'zeloskids' ? `<span class="plogo ${size} zk" title="Zelos Kids"><img src="${ZK_LOGO}" alt="Zelos Kids"></span>` : code === 'alva' ? `<span class="plogo ${size} al" title="Alva">${logo(size === 'lg' ? 26 : size === 'md' ? 15 : 11)}</span>` : `<span class="plogo ${size}">${esc((prodOf(code)?.name || '?').slice(0, 2))}</span>`;
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TODAY = '2026-10-16', CUR = TODAY.slice(0, 7);
const brl = c => 'R$ ' + (c / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const diff = (a, b) => Math.round((new Date(a + 'T12:00:00') - new Date(b + 'T12:00:00')) / 864e5);
const shiftYm = (ym, k) => { const d = new Date(+ym.slice(0, 4), +ym.slice(5) - 1 + k, 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; };
const MON = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const PROVIDERS = [['asaas', 'Asaas'], ['mercadopago', 'Mercado Pago'], ['stripe', 'Stripe'], ['pix', 'PIX próprio']];
const PNAME = Object.fromEntries(PROVIDERS);
const ROLES = { Administrador: 'Tudo, inclusive equipe, produtos, chaves, provedor e preços', Financeiro: 'Cobranças, descontos, vouchers, relatórios, planos e preços', Suporte: 'Consulta e reenvio de cobranças e avisos' };
const defParams = o => ({ currency: 'BRL', cycles: ['mensal', 'anual'], tolerance: 5, trialDays: 0, methods: ['PIX', 'Cartão'], window: '30 a 90 dias (a definir)', cacheTtl: 300, ...o });
const mkTerms = (pre, v = '1.0') => [{ id: pre + '-termos', type: 'Termos de uso', title: 'Termos de uso', version: v, required: true, date: '2026-08-01' }, { id: pre + '-priv', type: 'Política de privacidade', title: 'Política de privacidade', version: '1.0', required: true, date: '2026-08-01' }];
const D = {
  products: [
    { code: 'alva', name: 'Alva', tagline: 'Pessoas, cuidado e gestão de igrejas', provider: 'asaas', status: 'active', env: 'Demonstração', keys: [{ id: 'k1', tail: '3f9a', active: true, at: '2026-08-01', last: '2026-10-16 14:20' }], secret: 'whsec_••••••••3f9a', eventsUrl: 'https://alva.example.invalid/api/v1/integrations/subscriptions/events', provisionUrl: 'https://alva.example.invalid/api/v1/integrations/subscriptions/provision', fields: 'Nome da organização e endereço (slug)', params: defParams({ tolerance: 5 }), terms: [...mkTerms('lu', '1.2'), { id: 'lu-mkt', type: 'Marketing (opt-in)', title: 'Receber novidades e ofertas', version: '1.0', required: false, date: '2026-08-01' }] },
    { code: 'zeloskids', name: 'Zelos Kids', tagline: 'Gestão e cuidado do ministério infantil', provider: 'mercadopago', status: 'active', env: 'Demonstração', keys: [{ id: 'k1', tail: '77b1', active: true, at: '2026-09-02', last: '2026-10-16 13:01' }], secret: 'whsec_••••••••77b1', eventsUrl: 'https://zeloskids.example.invalid/hooks/assinaturas', provisionUrl: 'https://zeloskids.example.invalid/hooks/provisionar', fields: 'Nome da igreja e responsável', params: defParams({ cycles: ['mensal', 'anual'], tolerance: 3, trialDays: 7, methods: ['PIX', 'Cartão'] }), terms: [...mkTerms('di'), { id: 'di-mkt', type: 'Marketing (opt-in)', title: 'Novidades do ministério infantil', version: '1.0', required: false, date: '2026-09-02' }] },
  ],
  plans: [
    { product: 'alva', code: 'crescimento', name: 'Crescimento', ent: {}, mensal: 19700, anual: 197000, active: true },
    { product: 'zeloskids', code: 'semente', name: 'Semente', ent: {}, mensal: 0, anual: 0, active: true },
    { product: 'zeloskids', code: 'colheita', name: 'Colheita', ent: {}, mensal: 29700, anual: 297000, active: true },
    { product: 'alva', code: 'semente', name: 'Semente', ent: {}, mensal: 0, anual: 0, active: true },
    { product: 'alva', code: 'essencial', name: 'Essencial', ent: {}, mensal: 3990, anual: 39900, active: true },
    { product: 'alva', code: 'colheita', name: 'Colheita', ent: {}, mensal: 29700, anual: 297000, active: true },
    { product: 'zeloskids', code: 'essencial', name: 'Essencial', ent: {}, mensal: 9700, anual: 97000, active: true },
    { product: 'zeloskids', code: 'crescimento', name: 'Crescimento', ent: {}, mensal: 19700, anual: 197000, active: true },
  ],
  vouchers: [
    { product: 'alva', code: 'BEMVINDO10', label: 'Boas-vindas', kind: 'pct', value: 10, cycles: 3, active: true, uses: 6 },
    { product: 'alva', code: 'INSTABILIDADE', label: 'Compensação por instabilidade', kind: 'fixed', value: 1000, cycles: 1, active: true, uses: 2 },
    { product: 'alva', code: 'PARCEIRO20', label: 'Parceiros', kind: 'pct', value: 20, cycles: null, active: true, uses: 3 },
    { product: 'alva', code: 'BLACK2025', label: 'Campanha encerrada', kind: 'pct', value: 30, cycles: 1, active: false, uses: 11 },
    { product: 'zeloskids', code: 'BOASVINDASKIDS', label: 'Lançamento', kind: 'pct', value: 10, cycles: 2, active: true, uses: 4 },
  ],
  customers: [], subs: [], charges: [], events: [], changes: [], cancels: [], audit: [],
  team: [
    { email: 'admin@alva.app', name: 'Administrador', role: 'Administrador', scope: 'all', status: 'active', last: '2026-10-16 08:10' },
    { email: 'financeiro@alva.app', name: 'Financeiro', role: 'Financeiro', scope: 'all', status: 'active', last: '2026-10-15 17:02' },
    { email: 'suporte@alva.app', name: 'Suporte', role: 'Suporte', scope: 'all', status: 'active', last: '2026-10-16 09:40' },
    { email: 'ana@zeloskids.app', name: 'Ana (Zelos Kids)', role: 'Financeiro', scope: ['zeloskids'], status: 'active', last: '2026-10-14 10:20' },
  ],
};
/* [nome, e-mail, produto, plano, ciclo, situação, referência no produto, forma de pagamento] */
const SEED = [
  ['Marina Alves', 'marina@exemplo.com', 'alva', 'essencial', 'mensal', 'active', 'familia-alves', 'Cartão final 4242'], ['Roberto Lima', 'roberto@exemplo.com', 'alva', 'essencial', 'anual', 'active', 'igreja-central', 'Cartão final 1881'],
  ['Paula Nogueira', 'paula.n@exemplo.com', 'alva', 'semente', 'mensal', 'active', 'paula-nogueira', 'PIX'], ['Diego Ramos', 'diego@ramos.com.br', 'alva', 'essencial', 'mensal', 'past_due', 'comunidade-ramos', 'PIX'],
  ['Clara Freitas', 'clara@exemplo.com', 'alva', 'semente', 'anual', 'active', 'clara-freitas', 'Cartão final 7710'], ['Grupo Mendes', 'fin@grupomendes.com.br', 'alva', 'colheita', 'anual', 'active', 'grupo-mendes', 'Cartão final 0099'],
  ['Tiago Prado', 'tiago@exemplo.com', 'alva', 'semente', 'mensal', 'canceled', 'tiago-prado', 'PIX'], ['Helena Costa', 'helena.c@exemplo.com', 'alva', 'essencial', 'mensal', 'active', 'helena-costa', 'PIX'],
  ['Bruno Vieira', 'bruno@exemplo.com', 'alva', 'semente', 'mensal', 'past_due', 'bruno-vieira', 'PIX'], ['Lívia Torres', 'livia@exemplo.com', 'alva', 'essencial', 'anual', 'active', 'igreja-torres', 'Cartão final 3305'],
  ['Otávio Reis', 'otavio@exemplo.com', 'alva', 'semente', 'mensal', 'pending', 'otavio-reis', 'PIX'], ['Sandra Melo', 'sandra@exemplo.com', 'alva', 'semente', 'mensal', 'canceled', 'sandra-melo', 'Cartão final 5512'],
  ['Eduardo Pinto', 'edu@pinto.com', 'alva', 'essencial', 'mensal', 'suspended', 'comunidade-esperanca', 'PIX'], ['Raquel Dias', 'raquel@exemplo.com', 'alva', 'semente', 'anual', 'active', 'raquel-dias', 'Cartão final 6120'],
  ['Marina Alves', 'marina@exemplo.com', 'zeloskids', 'crescimento', 'mensal', 'active', 'familia-alves-din', 'Cartão final 4242'], ['Helena Costa', 'helena.c@exemplo.com', 'zeloskids', 'essencial', 'mensal', 'active', 'costa-din', 'PIX'],
  ['Fábio Moura', 'fabio@exemplo.com', 'zeloskids', 'essencial', 'mensal', 'active', 'moura-din', 'Cartão final 2210'], ['Letícia Sá', 'leticia@exemplo.com', 'zeloskids', 'essencial', 'mensal', 'past_due', 'sa-din', 'PIX'],
  ['Caio Barros', 'caio@exemplo.com', 'zeloskids', 'crescimento', 'mensal', 'active', 'barros-din', 'Cartão final 8841'], ['Nina Duarte', 'nina@exemplo.com', 'zeloskids', 'essencial', 'mensal', 'canceled', 'duarte-din', 'PIX'],
  ['Paula Nogueira', 'paula.n@exemplo.com', 'zeloskids', 'crescimento', 'anual', 'active', 'paula-crescimento', 'Cartão final 4242'], ['Armando Silva', 'armando@exemplo.com', 'zeloskids', 'crescimento', 'mensal', 'active', 'armando', 'Cartão final 9013'],
  ['Joana Pires', 'joana@exemplo.com', 'zeloskids', 'essencial', 'mensal', 'active', 'joana-pires', 'Cartão final 1190'], ['Rui Tavares', 'rui@exemplo.com', 'zeloskids', 'essencial', 'anual', 'suspended', 'rui-tavares', 'Cartão final 6677'],
  ['Bia Campos', 'bia@exemplo.com', 'zeloskids', 'essencial', 'mensal', 'past_due', 'bia-campos', 'Cartão final 5300'],
];
let n = 0; const id = p => `${p}${++n}`;
const pcode = p => D.products.find(x => x.code === p);
const planOf = (p, c) => D.plans.find(x => x.product === p && x.code === c);
D.plans.sort((a, b) => a.product.localeCompare(b.product) || ['semente', 'essencial', 'crescimento', 'colheita'].indexOf(a.code) - ['semente', 'essencial', 'crescimento', 'colheita'].indexOf(b.code));
SEED.forEach(([name, email, product, plan, cycle, status, ref, method], i) => {
  let c = D.customers.find(x => x.email === email);
  if (!c) { c = { id: id('c'), name, email, cpf: `***.${100 + i * 7}.***-${10 + i % 90}`, phone: `(11) 9${8000 + i * 113}-${1000 + i * 77}`, city: ['São Paulo, SP', 'Curitiba, PR', 'Recife, PE', 'Belo Horizonte, MG'][i % 4], since: addDays('2026-03-01', i * 6) }; D.customers.push(c); }
  const start = status === 'pending' ? addDays(TODAY, -1) : addDays(c.since, product === 'alva' ? 0 : 20 + i), sub = { id: id('s'), customer: c.id, product, memberId: 'mem_' + (7000 + i * 37).toString(36).toUpperCase() + 'K' + (i + 2), ref, plan, cycle, status, method, start, next: null, end: null, discounts: [], consents: {} };
  sub.end = status === 'canceled' ? addDays(TODAY, -(i * 3 % 20) - 3) : null;
  D.subs.push(sub);
  pcode(product).terms.forEach((t, k) => { if (t.required) sub.consents[t.id] = { version: (i + k) % 7 === 3 ? '1.0' : t.version, at: start }; else if ((i + k) % 2) sub.consents[t.id] = { version: t.version, at: start, accepted: true }; });
  const price = planOf(product, plan)[cycle], step = cycle === 'anual' ? 365 : 30;
  if (price === 0) { sub.status = status === 'canceled' ? 'canceled' : 'active'; sub.next = null; return; }
  if (status === 'pending') D.charges.push({ id: id('ch'), sub: sub.id, due: addDays(TODAY, 1), gross: price, amount: price, discount: 0, method, status: 'pending', paidAt: null, attempts: 0 });
  else { for (let k = 0; ; k++) { const due = addDays(start, k * step); if (due > TODAY || (sub.end && due > sub.end)) break; D.charges.push({ id: id('ch'), sub: sub.id, due, gross: price, amount: price, discount: 0, method, status: 'paid', paidAt: due, attempts: 0 }); }
    const last = D.charges.filter(h => h.sub === sub.id).at(-1); sub.next = status === 'canceled' ? null : addDays(last.due, step);
    if (status === 'past_due') { last.status = 'overdue'; last.paidAt = null; last.attempts = 2; last.due = addDays(TODAY, -(4 + i % 6)); }
    if (status === 'suspended') { sub.suspended = { at: addDays(TODAY, -6), kind: 'fraud_suspicion', reason: 'Acessos simultâneos de vários países; verificando com o cliente.', by: 'Administrador', prev: 'active', frozenNext: sub.next }; sub.next = null; D.charges.push({ id: id('ch'), sub: sub.id, due: sub.suspended.frozenNext, gross: price, amount: price, discount: 0, method, status: 'paused', paidAt: null, attempts: 0 }); }
    if (status === 'active' && method === 'PIX' && i % 2) D.charges.push({ id: id('ch'), sub: sub.id, due: sub.next, gross: price, amount: price, discount: 0, method, status: 'pending', paidAt: null, attempts: 0 }); }
  D.events.push({ id: id('e'), sub: sub.id, type: 'subscription.provisioned', at: `${start} 10:02`, status: 'ok', attempts: 1 });
  if (status === 'past_due') D.events.push({ id: id('e'), sub: sub.id, type: 'subscription.payment_overdue', at: `${addDays(TODAY, -2)} 06:00`, status: i === 8 ? 'failed' : 'ok', attempts: i === 8 ? 3 : 1 });
  if (status === 'suspended') D.events.push({ id: id('e'), sub: sub.id, type: 'subscription.suspended', at: `${addDays(TODAY, -6)} 11:15`, status: 'ok', attempts: 1 });
  if (status === 'canceled') { D.events.push({ id: id('e'), sub: sub.id, type: 'subscription.canceled', at: `${sub.end} 06:00`, status: 'ok', attempts: 1 }); D.cancels.push({ sub: sub.id, at: addDays(sub.end, -5), until: sub.end, reason: i % 2 ? 'Preço' : 'Não uso mais', by: 'Cliente' }); }
});
const SB = i => D.subs[i];
D.changes.push({ sub: SB(7).id, at: '2026-09-28', from: 'semente · mensal', to: 'essencial · mensal', kind: 'upgrade', by: 'Cliente' }, { sub: SB(9).id, at: '2026-09-02', from: 'essencial · mensal', to: 'essencial · anual', kind: 'ciclo', by: 'Cliente' }, { sub: SB(16).id, at: '2026-09-20', from: 'familia · mensal', to: 'crescimento · mensal', kind: 'upgrade', by: 'Cliente' });
SB(2).discounts.push({ id: 'd1', label: 'BEMVINDO10', kind: 'pct', value: 10, left: 2, reason: 'Voucher de boas-vindas', by: 'Cliente', at: '2026-08-20' });
D.audit.push({ at: '2026-10-15 17:20', who: 'Financeiro', what: 'Reenviou cobrança PIX', ref: 'Diego Ramos', product: 'alva' }, { at: '2026-10-14 09:05', who: 'Administrador', what: 'Alterou preço do plano Essencial mensal de R$ 37,90 para R$ 39,90', ref: 'Plano Essencial', product: 'alva' }, { at: '2026-10-10 16:00', who: 'Administrador', what: 'Revisou configuração demonstrativa do Zelos Kids', ref: 'Produtos', product: 'zeloskids' });

const S = { screen: 'login', admin: null, theme: 'auto', q: '', f: {}, cid: null, sid: null, tab: 'resumo', prod: 'all', pid: null, ptab: 'geral' };
try { const t = localStorage.getItem('org-theme'); if (t) S.theme = t; } catch (e) { /* sem storage */ }
const A = {};
const cust = x => D.customers.find(c => c.id === x), subOf = x => D.subs.find(s => s.id === x), prodOf = c => D.products.find(p => p.code === c);
const subCust = s => cust(s.customer), custSubs = cid => D.subs.filter(x => x.customer === cid);
const planOfSub = s => planOf(s.product, s.plan);
const gross = s => planOfSub(s)[s.cycle];
/* preço com desconto: percentual sobre o preço cheio e valor fixo, nunca abaixo de zero */
const net = s => Math.max(0, gross(s) - (s.discounts || []).reduce((a, d) => a + (d.kind === 'pct' ? Math.round(gross(s) * d.value / 100) : d.value), 0));
const SS = { active: ['pago', 'Ativa'], past_due: ['vencido', 'Em atraso'], suspended: ['transf', 'Suspensa'], canceling: ['pendente', 'Cancelamento agendado'], canceled: ['neutro', 'Cancelada'], pending: ['pendente', '1º pagamento'] };
const CS = { paid: ['pago', 'Paga'], pending: ['pendente', 'Pendente'], overdue: ['vencido', 'Atrasada'], paused: ['transf', 'Pausada'], canceled: ['neutro', 'Cancelada'] };
const chip = ([k, l]) => `<span class="st ${k}">${l}</span>`;
const note = (i, h, tn = '') => `<div class="note ${tn}">${ic(i, 17, 2)}<div>${h}</div></div>`;
function toast(m, tn = 'ok') { if (DEFER) { Q.push(() => toast(m, tn)); Q.toast = Q.toast || tn; return; } const b = $('#toasts'), e = document.createElement('div'); e.className = 'toast ' + tn; e.setAttribute('role', 'status'); e.innerHTML = `${ic(tn === 'bad' ? 'alert' : 'check', 16, 2.4)}<span>${esc(m)}</span>`; b.appendChild(e); setTimeout(() => e.remove(), 3400); }
const val = i => ($('#' + i)?.value ?? '').trim();
function fld(i, label, o = {}) { const { type = 'text', v = '', hint = '', opts, ta } = o; return `<div class="fld" id="f-${i}"><label for="${i}">${label}</label>${opts ? `<select id="${i}">${opts.map(([k, l]) => `<option value="${esc(k)}" ${k === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>` : ta ? `<textarea id="${i}">${esc(v)}</textarea>` : `<input id="${i}" type="${type}" value="${esc(v)}">`}<span class="hint">${esc(hint)}</span></div>`; }
const ferr = (i, m) => { const f = $('#f-' + i); f.classList.add('bad'); $('.hint', f).textContent = m; return false; };
const fclear = () => $$('.fld.bad').forEach(f => { f.classList.remove('bad'); $('.hint', f).textContent = ''; });
function dlg(html, wide) { $$('.dlgw').forEach(d => d.remove()); const d = document.createElement('div'); d.className = 'dlgw'; d.innerHTML = `<div class="dlg ${wide ? 'wide' : ''}" role="dialog" aria-modal="true"><button class="ibtn dlg-x" data-a="closeDlg" aria-label="Fechar">${ic('x', 16, 2.2)}</button>${html}</div>`; setTimeout(() => d.querySelector('input:not([type=radio]):not([type=checkbox]):not([readonly]),select,textarea')?.focus({ preventScroll: true }), 60); d.addEventListener('click', e => { if (e.target === d) d.remove(); }); document.body.append(d); return d; }
const closeDlg0 = () => $$('.dlgw').forEach(d => d.remove());
const closeDlg = () => { if (DEFER) { Q.push(closeDlg0); return; } closeDlg0(); };
A.closeDlg = closeDlg;

/* ---------- escopo de produtos e seletor ---------- */
const scopeOf = () => (S.admin.scope === 'all' ? D.products.map(p => p.code) : S.admin.scope);
const visProd = () => D.products.filter(p => scopeOf().includes(p.code));
const inSel = pc => scopeOf().includes(pc) && (S.prod === 'all' || S.prod === pc);
const mSubs = () => D.subs.filter(s => inSel(s.product));
const mCharges = () => D.charges.filter(c => inSel(subOf(c.sub).product));
const mEvents = () => D.events.filter(e => inSel(subOf(e.sub).product));
const mCancels = () => D.cancels.filter(c => inSel(subOf(c.sub).product));
const mChanges = () => D.changes.filter(c => inSel(subOf(c.sub).product));
const mAudit = () => D.audit.filter(a => !a.product || inSel(a.product));
const prodCombo = () => (visProd().length > 1 ? `<select data-a="prod" aria-label="Filtrar por produto"><option value="all" ${S.prod === 'all' ? 'selected' : ''}>Todos os produtos</option>${visProd().map(p => `<option value="${p.code}" ${S.prod === p.code ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select>` : '');
const guide = (title, body) => `<section class="guide"><span class="gtag">Guia · não faz parte do sistema</span><h2>${title}</h2>${body}</section>`;
const multi = () => S.prod === 'all' && visProd().length > 1;
const ptag = pc => `<span class="ptag">${pc === 'alva' ? `<i class="pt-al">${logoMark(9)}</i>` : pc === 'zeloskids' ? `<i class="pt-zk"><img src="${ZK_SHEEP}" alt=""></i>` : ''}${esc(prodOf(pc).name)}</span>`;
const log = (what, ref, product) => D.audit.unshift({ at: `${TODAY} 14:32`, who: S.admin.name, what, ref, product: product || (S.prod !== 'all' ? S.prod : null) });
const isAdm = () => S.admin.role === 'Administrador', canWrite = () => S.admin.role !== 'Suporte';
const guard = () => { if (!canWrite()) { toast('Seu perfil (Suporte) só consulta e reenvia.', 'bad'); return false; } return true; };
const emit = (sub, type) => D.events.unshift({ id: id('e'), sub, type, at: `${TODAY} 14:32`, status: 'ok', attempts: 1 });
const ebOf = () => { const g = NAVG.find(([, ks]) => ks.includes(S.screen)); return g ? `<p class="eb">${g[0]}</p>` : ''; };
const crumb = (k, l, cur) => `<nav class="crumb" aria-label="Trilha"><button class="crumb-bk" data-a="go" data-v="${k}" aria-label="Voltar para ${l}">${ic('chevL', 16, 2.2)}<span>Voltar</span></button><i class="crumb-sep"></i><a href="#" data-a="go" data-v="${k}">${l}</a>${ic('chevR', 13, 2)}<span>${cur}</span></nav>`;
const prodChip = () => S.prod !== 'all' && visProd().length > 1 && !['produto', 'equipe', 'auditoria', 'produtos'].includes(S.screen) ? `<div class="pfilter">${S.prod === 'zeloskids' ? `<span class="pf-ic"><img src="${ZK_SHEEP}" alt=""></span>` : `<span class="pf-ic al">${logoMark(10)}</span>`}<span>Mostrando só <b>${esc(prodOf(S.prod).name)}</b></span><button class="pf-x" data-a="prodAll">${ic('x', 13, 2.4)}Ver todos os produtos</button></div>` : '';
const page = (t, p, right = '', eb = null) => `<div class="ph"><div>${eb ?? ebOf()}<h1>${t}</h1>${p ? `<p>${p}</p>` : ''}${prodChip()}</div><div>${right}</div></div>`;
const empty = t => `<div class="empty">${t}</div>`;
const cLink = (s, tab = 'resumo') => `<a href="#" class="clink" data-a="cliente" data-v="${s.customer}|${tab}|${s.id}">${esc(subCust(s).name)}</a>`;
const brlS = c => c >= 100000 ? 'R$ ' + (c / 100000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : brl(c).replace(',00', '');
const bars = items => { const mx = Math.max(1, ...items.map(i => i[1])); return `<div class="bars">${items.map(([l, v, t]) => `<div class="bar" title="${esc(l)}: ${t ?? brl(v)}"><span class="bv num">${t ?? brlS(v)}</span><i style="height:${Math.max(3, v / mx * 100)}%"></i><small>${esc(l)}</small></div>`).join('')}</div>`; };
const hbars = items => { const mx = Math.max(1, ...items.map(i => i[1])); return `<ul class="hb">${items.map(([l, v, t]) => `<li><span>${esc(l)}</span><b style="--w:${Math.max(2, v / mx * 100)}%"></b><em class="num">${t ?? brl(v)}</em></li>`).join('')}</ul>`; };
const pendingConsents = s => prodOf(s.product).terms.filter(t => { const c = s.consents[t.id]; return t.required ? !c || c.version !== t.version : !c; }).map(t => ({ documentId: t.id, type: t.type, version: t.version, required: t.required }));
/* resposta da consulta de acesso (contrato: INTEGRATION-CONTRACT, seção 1) */
const accessResponse = s => ({ productCode: s.product, memberId: s.memberId, status: s.status, plan: { code: s.plan, cycle: s.cycle === 'anual' ? 'yearly' : 'monthly', validUntil: s.end || s.next || s.suspended?.frozenNext || null }, entitlements: planOfSub(s).ent, graceUntil: null, reasonCode: s.status === 'suspended' ? s.suspended.kind : s.status === 'past_due' ? 'payment' : null, pendingConsents: pendingConsents(s), checkedAt: `${TODAY}T14:32:00Z`, cacheTtlSeconds: prodOf(s.product).params.cacheTtl });
const actionList = s => s.status === 'suspended' ? [['resume', 'refresh', 'Reativar…'], ['cancel', 'ban', 'Cancelar assinatura', 1]] : s.status === 'canceled' ? [['reactivate', 'refresh', 'Reativar']] : s.status === 'canceling' ? [['discount', 'percent', 'Aplicar voucher ou desconto'], ['undoCancel', 'undo', 'Desfazer cancelamento'], ['endNow', 'ban', 'Encerrar agora', 1]] : [['discount', 'percent', 'Aplicar voucher ou desconto'], ['chPlan', 'swap', 'Trocar plano'], ['suspend', 'clock', 'Suspender'], ['cancel', 'ban', 'Cancelar assinatura', 1]];
const actions = (s, big) => {
  if (!big) return `<button class="ibtn more" data-a="rowMenu" data-v="${s.id}" aria-label="Ações da assinatura de ${esc(subCust(s).name)}" aria-haspopup="menu">${ic('dots', 18, 2)}</button>`;
  const b = (a, l, cls = 'sec') => `<button class="btn ${cls} sm" data-a="${a}" data-v="${s.id}">${l}</button>`;
  if (s.status === 'suspended') return b('resume', 'Reativar…', big ? '' : 'sec') + b('cancel', 'Cancelar');
  if (s.status === 'canceled') return b('reactivate', 'Reativar', big ? '' : 'sec');
  if (s.status === 'canceling') return b('discount', big ? 'Aplicar voucher ou desconto' : 'Desconto') + b('undoCancel', 'Desfazer cancelamento') + b('endNow', 'Encerrar agora', 'dng');
  return b('discount', big ? 'Aplicar voucher ou desconto' : 'Desconto') + b('chPlan', 'Trocar plano') + b('suspend', 'Suspender') + b('cancel', 'Cancelar', big ? 'dng' : 'sec');
};

/* ---------- login próprio com segundo fator ---------- */
function login() {
  const mfa = S.pending;
  const prods = D.products.map(p => `<li>${plogo(p.code, 'lg')}<span><b>${esc(p.name)}</b><small>${esc(p.tagline)}</small></span></li>`).join('');
  return `<div class="auth"><aside class="auth-art">${brandP(36)}<div class="art-body"><p class="art-eb">Uma operação, vários produtos</p><h2>Clientes, planos e cobranças de cada produto, <em>em um só lugar.</em></h2><p>Cada produto mantém o seu provedor de pagamento, as suas chaves, os seus planos e os seus termos. A equipe enxerga só o que o seu escopo libera.</p><ul class="art-prods" aria-label="Produtos administrados">${prods}</ul></div><small class="art-ft">Acesso restrito à equipe · login próprio, separado dos clientes e dos produtos</small></aside>
<div class="auth-main"><div class="box"><div class="auth-brand">${brandP(30, false)}</div><p class="eb">${mfa ? 'Segundo fator' : 'Administração'}</p><h1>${mfa ? 'Confirme o código' : 'Entrar'}</h1><p class="lede">${mfa ? `Enviamos um código de 6 dígitos para <b>${esc(mfa.email)}</b>. <em>Protótipo: 123456.</em>` : 'Use o e-mail da equipe para acessar a administração dos produtos.'}</p>
${mfa ? `<div class="fld" id="f-mC"><label for="otp0">Código de 6 dígitos</label><div class="otp" role="group" aria-label="Código de 6 dígitos">${[0, 1, 2, 3, 4, 5].map(k => `<input class="otp-i" id="otp${k}" inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="${k ? 'off' : 'one-time-code'}" aria-label="Dígito ${k + 1} de 6" placeholder="·">`).join('')}</div><input type="hidden" id="mC"><span class="hint"></span></div><button class="btn block" id="mGo">Entrar</button><button class="btn ghost block" data-a="loginBack" style="margin-top:8px">Usar outro e-mail</button>` : `${fld('lE', 'E-mail', { type: 'email', v: 'admin@alva.app' })}${fld('lP', 'Senha', { type: 'password', v: 'senha-admin' })}<button class="btn block" id="lGo">Continuar</button><div class="auth-prods" aria-hidden="true">${D.products.map(p => plogo(p.code, 'sm')).join('')}<span>${D.products.length} produtos nesta administração</span></div><p class="test">Perfis de teste: admin@alva.app (administrador), financeiro@alva.app, suporte@alva.app (só consulta e reenvios) e ana@zeloskids.app (financeiro só do Zelos Kids). Senha <code>errada</code> recusa.</p>`}</div></div></div>`;
}
A.loginBack = () => { S.pending = null; render(); };
function bindLogin() {
  const otps = $$('.otp-i');
  if (otps.length) {
    const box = $('.otp'), sync = () => { $('#mC').value = otps.map(o => o.value).join(''); otps.forEach(o => o.classList.toggle('filled', !!o.value)); fclear(); box.classList.remove('bad'); if (otps.every(o => o.value)) setTimeout(() => { const g = $('#mGo'); if (g && !g.classList.contains('is-busy')) g.click(); }, 120); };
    otps.forEach((o, k) => {
      o.addEventListener('input', () => { o.value = o.value.replace(/\D/g, '').slice(-1); if (o.value && otps[k + 1]) otps[k + 1].focus(); sync(); });
      o.addEventListener('keydown', e => { if (e.key === 'Backspace' && !o.value && otps[k - 1]) { otps[k - 1].value = ''; otps[k - 1].focus(); sync(); e.preventDefault(); } if (e.key === 'ArrowLeft' && otps[k - 1]) otps[k - 1].focus(); if (e.key === 'ArrowRight' && otps[k + 1]) otps[k + 1].focus(); if (e.key === 'Enter') $('#mGo')?.click(); });
      o.addEventListener('focus', () => o.select());
      o.addEventListener('paste', e => { const d = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault(); d.split('').forEach((c, x) => { if (otps[x]) otps[x].value = c; }); (otps[d.length] || otps[5]).focus(); sync(); });
    });
    setTimeout(() => otps[0].focus(), 40);
  }
  $('#lGo')?.addEventListener('click', async () => { fclear(); const a = D.team.find(x => x.email === val('lE').toLowerCase()); if (!a || val('lP') === 'errada' || val('lP').length < 6) return ferr('lP', 'E-mail ou senha incorretos.'); if (a.status === 'invited') return ferr('lE', 'Convite ainda não aceito. Use o link enviado ao e-mail.'); const bt = $('#lGo'); aStart(bt, 500); await wait(500); S.pending = a; render(); });
  $('#mGo')?.addEventListener('click', async () => { fclear(); if (val('mC').length < 6) { ferr('mC', 'Digite os 6 dígitos do código.'); $$('.otp-i').find(o => !o.value)?.focus(); return; } if (val('mC') !== '123456') { const bx = $('.otp'); bx.classList.remove('bad'); void bx.offsetWidth; bx.classList.add('bad'); ferr('mC', 'Código incorreto. Confira o e-mail e tente de novo.'); setTimeout(() => { $$('.otp-i').forEach(o => { o.value = ''; o.classList.remove('filled'); }); $('#mC').value = ''; $('#otp0')?.focus(); }, 450); return; } const bt = $('#mGo'); aStart(bt, 400); await wait(400); aDone(bt, 'Tudo certo'); await wait(450); const a = S.pending; S.pending = null; S.admin = { email: a.email, name: a.name, role: a.role, scope: a.scope }; a.last = `${TODAY} 14:32`; S.prod = a.scope !== 'all' && a.scope.length === 1 ? a.scope[0] : 'all'; S.screen = 'overview'; render(); });
}

/* ---------- visão geral ---------- */
const mrrOf = list => list.reduce((a, s) => a + (s.cycle === 'anual' ? Math.round(net(s) / 12) : net(s)), 0);
const monthPaid = ym => mCharges().filter(c => c.status === 'paid' && c.paidAt?.startsWith(ym)).reduce((a, c) => a + c.amount, 0);
const dashboardViews = () => S.admin.role === 'Administrador' ? ['financial','operational'] : [S.admin.role === 'Suporte' ? 'operational' : 'financial'];
A.dashboardView = view => { if (dashboardViews().includes(view)) { S.dashboardView = view; render(); } };
function overview() {
  const allowed = dashboardViews(), view = allowed.includes(S.dashboardView) ? S.dashboardView : allowed[0];
  const subs = mSubs(), charges = mCharges(), events = mEvents(), active = subs.filter(s=>s.status==='active');
  const late = charges.filter(c=>c.status==='overdue').sort((a,b)=>a.due.localeCompare(b.due));
  const suspended = subs.filter(s=>s.status==='suspended');
  const failed = events.filter(e=>e.status==='failed').sort((a,b)=>a.at.localeCompare(b.at));
  const renewals = active.filter(s=>s.next && s.next>=TODAY && s.next<=addDays(TODAY,30)).sort((a,b)=>a.next.localeCompare(b.next));
  const pending = subs.filter(s=>s.status==='pending');
  const cancellations = mCancels().filter(c=>c.until>=TODAY);
  const sum = list=>list.reduce((n,c)=>n+c.amount,0);
  const metric=(label,value,caption)=>`<div class="kpi"><small>${label}</small><b>${value}</b><span>${caption}</span></div>`;
  const list=(items,blank)=>items.length?`<ul class="dash-queue">${items.join('')}</ul>`:empty(blank);
  const item=(s,title,detail,tab='resumo',action='Ver assinatura')=>`<li><span class="dash-dot"></span><div><b>${esc(title)}</b><p>${esc(subCust(s).name)} · ${esc(prodOf(s.product).name)}</p><small>${esc(detail)}</small></div><span class="dash-link">${cLink(s,tab)}<small>${action} →</small></span></li>`;
  const section=(id,title,items,blank)=>`<section class="card" id="${id}"><h2>${title} <span class="dash-count">${items.length}</span></h2>${list(items,blank)}</section>`;
  const alert=(anchor,label,count)=>`<a class="dash-alert" href="#${anchor}" data-a="jump" data-v="${anchor}"><strong>${count}</strong><span>${label}</span><b aria-hidden="true">${ic('arrowR',15,2)}</b></a>`;
  const desc=view==='financial'?'Recebimentos, inadimplência e próximos compromissos.':'Continuidade do acesso e entregas aos produtos.';
  const seg=allowed.length>1?`<nav class="tabs seg" aria-label="Visão do dashboard">${allowed.map(v=>`<button data-a="dashboardView" data-v="${v}" aria-pressed="${v===view}">${ic(v==='financial'?'wallet':'activity',15,2)}${v==='financial'?'Financeira':'Operacional'}</button>`).join('')}</nav>`:'';
  const wd=new Date(TODAY+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});
  const header=page('Visão geral',`${S.prod==='all'?'Todos os produtos':esc(prodOf(S.prod).name)} · ${desc}`,seg,`<p class="eb">${wd}</p>`);
  if(view==='financial') {
    const lateTotal=sum(late), nextCharges=charges.filter(c=>c.status==='pending' && c.due>=TODAY && c.due<=addDays(TODAY,30));
    const forecast=sum(nextCharges)+renewals.filter(s=>!nextCharges.some(c=>c.sub===s.id && c.due===s.next)).reduce((n,s)=>n+net(s),0);
    const six=Array.from({length:6},(_,i)=>shiftYm(CUR,i-5));
    return header+`<section class="kpis">${metric('Receita recorrente mensal',brl(mrrOf(active)),`${active.length} assinaturas ativas`)}${metric('Recebido no mês',brl(monthPaid(CUR)),'Pagamentos confirmados')}${metric('Previsto em 30 dias',brl(forecast),'Cobranças pendentes e renovações, sem duplicidade')}${metric('Total vencido',brl(lateTotal),`${late.length} cobranças em atraso`)}</section><div class="dash-alerts">${alert('dash-late','Cobranças vencidas',late.length)}${alert('dash-first','Primeiro pagamento',pending.length)}${alert('dash-renew','Renovações em 30 dias',renewals.length)}${alert('dash-cancel','Cancelamentos agendados',cancellations.length)}</div>`+
    section('dash-late','Cobranças que precisam de atenção',late.map(c=>item(subOf(c.sub),`${brl(c.amount)} em atraso`,`${Math.max(0,diff(TODAY,c.due))} dias · vencimento ${fmtFull(c.due)} · ${c.attempts} tentativas`,'pagamentos','Ver cobrança')),'Nenhuma cobrança vencida.')+
    `<div class="g2">${section('dash-first','Aguardando primeiro pagamento',pending.map(s=>item(s,'Cadastro aguardando pagamento',`Desde ${fmtFull(s.start)}`,'pagamentos','Ver cobrança')),'Nenhuma assinatura aguardando primeiro pagamento.')}${section('dash-cancel','Cancelamentos agendados',cancellations.map(c=>item(subOf(c.sub),'Encerramento programado',`${fmtFull(c.until)} · ${c.reason}`)),'Nenhum cancelamento agendado.')}</div>`+
    section('dash-renew','Próximas renovações',renewals.map(s=>item(s,`${fmtFull(s.next)} · ${brl(net(s))}`,`${planOfSub(s).name} · ${s.cycle}`,'pagamentos')),'Nenhuma renovação nos próximos 30 dias.')+
    `<div class="g2"><section class="card"><h2>Recebido por mês</h2>${bars(six.map(ym=>[MON[+ym.slice(5)-1],monthPaid(ym)]))}</section><section class="card"><h2>Receita recorrente por plano</h2>${hbars(D.plans.filter(p=>inSel(p.product)).map(p=>[prodOf(p.product).name+' · '+p.name,mrrOf(active.filter(s=>s.product===p.product&&s.plan===p.code))]).filter(x=>x[1]>0))}</section></div>`;
  }
  const provisioning=failed.filter(e=>e.type.includes('provision'));
  const notices=failed.filter(e=>!e.type.includes('provision'));
  const incomplete=visProd().filter(p=>inSel(p.code)).filter(p=>{integrationData(p);const o=p.outgoing;return !p.keys.some(k=>k.active)||!o.eventsUrl||!o.provisionUrl||(o.auth==='OAuth 2.0 client credentials'? !o.tokenUrl||!o.clientId||!o.clientSecret:!o.credential);});
  const eventRows=items=>items.map(e=>item(subOf(e.sub),e.type,`Desde ${e.at} · ${e.attempts} tentativas · entrega não confirmada`,'avisos','Ver entrega'));
  return header+`<section class="kpis">${metric('Assinaturas ativas',active.length,'Acesso em funcionamento')}${metric('Assinaturas suspensas',suspended.length,'Intervenção ou análise necessária')}${metric('Entregas com falha',failed.length,'Eventos e provisionamento')}${metric('Produtos a configurar',incomplete.length,'Endpoints ou autenticação incompletos')}</section><div class="dash-alerts">${alert('dash-suspended','Suspensões',suspended.length)}${alert('dash-provision','Provisionamento com falha',provisioning.length)}${alert('dash-events','Eventos não entregues',notices.length)}${alert('dash-config','Configurações pendentes',incomplete.length)}</div>`+
  section('dash-suspended','Assinaturas suspensas',suspended.map(s=>item(s,s.suspended?.kind==='payment'?'Suspensão por inadimplência':'Suspensão administrativa',`${s.suspended?.at ? 'Desde '+fmtFull(s.suspended.at)+' · ' : ''}${s.suspended?.reason||'Motivo não informado'}`)),'Nenhuma assinatura suspensa.')+
  `<div class="g2">${section('dash-provision','Falhas de provisionamento',eventRows(provisioning),'Nenhuma falha de provisionamento registrada.')}${section('dash-events','Falhas de entrega aos produtos',eventRows(notices),'Todos os eventos registrados foram entregues.')}</div>`+
  `<section class="card" id="dash-config"><h2>Configuração dos produtos</h2>${incomplete.length?incomplete.map(p=>`<p>${esc(p.name)} · configuração incompleta <button class="btn sec sm" data-a="produto" data-v="${p.code}">Ver produto</button></p>`).join(''):empty('Endpoints e autenticação configurados para os produtos selecionados.')}</section><section class="card"><h2>Últimas entregas</h2>${list([...events].sort((a,b)=>b.at.localeCompare(a.at)).slice(0,6).map(e=>item(subOf(e.sub),e.status==='ok'?'Entrega confirmada':'Entrega pendente',`${e.type} · ${e.at}`,'avisos','Ver entrega')),'Nenhuma entrega registrada.')}</section>`;
}

/* ---------- relatórios ---------- */
/* ---------- gráficos dos relatórios ---------- */
const brlK = c => c >= 100000 ? 'R$ ' + (c / 100000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : 'R$ ' + Math.round(c / 100).toLocaleString('pt-BR');
const niceMax = v => { if (v <= 0) return 100; const p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; };
let gid = 0;
function areaChart(pts, { partial } = {}) {
  const W = 520, H = 210, L = 54, R = 14, T = 16, B = 28, pw = W - L - R, ph = H - T - B, mx = niceMax(Math.max(...pts.map(p => p[1])) * 1.1), k = ++gid, n = pts.length;
  const x = i => L + (n > 1 ? i * pw / (n - 1) : pw / 2), y = v => T + ph - v / mx * ph;
  const grid = [0, .5, 1].map(f => `<line x1="${L}" x2="${W - R}" y1="${y(mx * f)}" y2="${y(mx * f)}" class="gl"/><text x="${L - 10}" y="${y(mx * f) + 4}" text-anchor="end" class="axt">${brlK(mx * f)}</text>`).join('');
  const full = partial ? pts.slice(0, -1) : pts;
  const path = arr => arr.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  const line = path(full), area = `${path(pts)} L${x(n - 1)},${T + ph} L${x(0)},${T + ph} Z`;
  const tail = partial && n > 1 ? `<path d="M${x(n - 2)},${y(pts[n - 2][1])} L${x(n - 1)},${y(pts[n - 1][1])}" class="ln tail"/>` : '';
  const dots = pts.map((p, i) => `<circle cx="${x(i)}" cy="${y(p[1])}" r="4" class="dot${partial && i === n - 1 ? ' part' : ''}" data-i="${i}"/>`).join('');
  const labels = pts.map((p, i) => `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" class="axt">${esc(p[0])}</text>`).join('');
  const data = esc(JSON.stringify(pts.map((p, i) => [p[0], brl(p[1]), x(i) / W, y(p[1]) / H, partial && i === n - 1 ? 'mês em andamento' : ''])));
  return `<div class="rcw" data-pts="${data}"><svg class="rc area" viewBox="0 0 ${W} ${H}" role="img" aria-label="Receita recebida por mês: ${pts.map(p => p[0] + ' ' + brl(p[1])).join(', ')}"><defs><linearGradient id="ag${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--brand)" stop-opacity=".18"/><stop offset="1" stop-color="var(--brand)" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#ag${k})" class="ar"/><line class="guide" x1="0" x2="0" y1="${T}" y2="${T + ph}"/><path d="${line}" class="ln" pathLength="1"/>${tail}${dots}${labels}</svg><div class="tip" hidden></div>${partial ? '<p class="rc-note"><i></i>Outubro ainda em andamento</p>' : ''}</div>`;
}
function colChart(items) {
  const W = 520, H = 210, L = 54, R = 14, T = 26, B = 28, pw = W - L - R, ph = H - T - B, mx = niceMax(Math.max(...items.map(i => i[1]))), n = items.length, gw = pw / n, bw = Math.min(56, gw * .5);
  const y = v => T + ph - v / mx * ph;
  const grid = [0, .5, 1].map(f => `<line x1="${L}" x2="${W - R}" y1="${y(mx * f)}" y2="${y(mx * f)}" class="gl"/><text x="${L - 10}" y="${y(mx * f) + 4}" text-anchor="end" class="axt">${brlK(mx * f)}</text>`).join('');
  const cols = items.map(([l, v, sub], i) => { const cx = L + gw * i + gw / 2, h = Math.max(0, T + ph - y(v)); return `<g class="col" style="--i:${i}"><title>${esc(l)}: ${brl(v)}</title>${v ? `<rect x="${cx - bw / 2}" y="${y(v)}" width="${bw}" height="${h}" rx="8" class="${i === 0 ? 'now' : ''}"/><text x="${cx}" y="${y(v) - 8}" text-anchor="middle" class="vl">${brlK(v)}</text>` : `<rect x="${cx - bw / 2}" y="${T + ph - 4}" width="${bw}" height="4" rx="2" class="zero"/><text x="${cx}" y="${T + ph - 12}" text-anchor="middle" class="axt">sem previsão</text>`}<text x="${cx}" y="${H - 8}" text-anchor="middle" class="axt">${esc(l)}</text></g>`; }).join('');
  return `<svg class="rc cols" viewBox="0 0 ${W} ${H}" role="img" aria-label="Previsão de recebimento por semana">${grid}${cols}</svg>`;
}
function donutChart(items, center) {
  const tot = items.reduce((a, i) => a + i[1], 0) || 1, r = 15.9155, C = 2 * Math.PI * r, cols = ['var(--seq4)', 'var(--seq2)', 'var(--seq3)', 'var(--seq1)']; let off = 0;
  const arcs = items.map(([l, v], i) => { const len = v / tot * C, g = items.length > 1 ? .8 : 0, d = `<circle r="${r}" cx="21" cy="21" fill="none" stroke="${cols[i % 4]}" stroke-width="5" stroke-linecap="butt" stroke-dasharray="${Math.max(.1, len - g)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 21 21)" class="arc" style="--i:${i}"><title>${esc(l)}: ${brl(v)}</title></circle>`; off += len; return d; }).join('');
  return `<div class="dn"><div class="dn-c"><svg viewBox="0 0 42 42" role="img" aria-label="Distribuição"><circle r="${r}" cx="21" cy="21" fill="none" stroke="var(--surface-3)" stroke-width="5"/>${arcs}</svg><span><b>${center[0]}</b><small>${center[1]}</small></span></div><ul class="rlg">${items.map(([l, v, t], i) => `<li><i style="background:${cols[i % 4]}"></i><span>${esc(l)}</span><b>${Math.round(v / tot * 100)}%</b><small>${t ?? brl(v)}</small></li>`).join('')}</ul></div>`;
}
function stackBar(items, fmt = brl, cols = ['var(--st-sol)', 'color-mix(in srgb,var(--st-rec) 60%,var(--st-sol))', 'var(--st-rec)']) {
  const tot = items.reduce((a, i) => a + i[1], 0);
  return `<div class="sb">${tot ? items.map(([l, v], i) => v ? `<i style="flex:${v};background:${cols[i % 3]}" title="${esc(l)}: ${fmt(v)}"></i>` : '').join('') : '<i class="none"></i>'}</div><ul class="rlg row">${items.map(([l, v], i) => `<li><i style="background:${cols[i % 3]}"></i><span>${esc(l)}</span><b>${fmt(v)}</b></li>`).join('')}</ul>`;
}
const rank = (items, fmt = brl) => { const mx = Math.max(1, ...items.map(i => i[1])); return `<ol class="rk">${items.sort((a, b) => b[1] - a[1]).map(([l, v, t]) => `<li><span class="rk-l">${esc(l)}</span><span class="rk-v num">${t ?? fmt(v)}</span><span class="rk-b"><i style="--w:${Math.max(3, v / mx * 100)}%"></i></span></li>`).join('')}</ol>`; };
const delta = (a, b) => { if (!b) return ''; const p = Math.round((a - b) / b * 100); return `<span class="dl ${p >= 0 ? 'up' : 'dn2'}">${ic(p >= 0 ? 'up' : 'down', 13, 2.4)}${Math.abs(p)}%</span>`; };
const rh = (title, big, sub, extra = '') => `<div class="rh"><h2>${title}</h2><div class="rh-n"><b class="num">${big}</b>${extra}</div>${sub ? `<p class="rh-s">${sub}</p>` : ''}</div>`;

function relatorios() {
  const act = mSubs().filter(s => s.status === 'active'), months = Array.from({ length: 6 }, (_, i) => shiftYm(CUR, i - 5));
  const byMethod = {}; mCharges().filter(c => c.status === 'paid').forEach(c => { const k = c.method === 'PIX' ? 'PIX' : 'Cartão'; byMethod[k] = (byMethod[k] || 0) + c.amount; });
  const late = mCharges().filter(c => c.status === 'overdue'), aging = [['1 a 3 dias', 1, 3], ['4 a 7 dias', 4, 7], ['Mais de 7 dias', 8, 999]].map(([l, a, b]) => [l, late.filter(c => { const d = diff(TODAY, c.due); return d >= a && d <= b; }).reduce((s, c) => s + c.amount, 0)]);
  const reasons = {}; mCancels().forEach(c => { reasons[c.reason] = (reasons[c.reason] || 0) + 1; });
  const fc = Array.from({ length: 4 }, (_, i) => { const a = addDays(TODAY, i * 7), b = addDays(TODAY, i * 7 + 6); const v = mCharges().filter(c => c.status === 'pending' && c.due >= a && c.due <= b).reduce((s, c) => s + c.amount, 0) + act.filter(s => s.cycle === 'mensal' && !D.charges.some(c => c.sub === s.id && c.status === 'pending') && s.next >= a && s.next <= b).reduce((s, x) => s + net(x), 0); return [i === 0 ? 'Esta semana' : fmtFull(a).slice(0, 5), v]; });
  const disc = act.filter(s => (s.discounts || []).length).map(s => [subCust(s).name, gross(s) - net(s)]);
  const ratio = [['Mensal', act.filter(s => s.cycle === 'mensal').length], ['Anual', act.filter(s => s.cycle === 'anual').length]];
  const perProd = visProd().map(p => [p.name, mrrOf(D.subs.filter(s => s.product === p.code && s.status === 'active'))]);
  const rec = months.map(ym => [MON[+ym.slice(5) - 1], monthPaid(ym)]), recTot = rec.reduce((a, r) => a + r[1], 0), cur = rec.at(-1)[1], prev = rec.at(-2)[1];
  const fcTot = fc.reduce((a, f) => a + f[1], 0), lateTot = aging.reduce((a, x) => a + x[1], 0), payTot = Object.values(byMethod).reduce((a, v) => a + v, 0);
  const canc = Object.entries(reasons), discTot = disc.reduce((a, d) => a + d[1], 0), mrrTot = perProd.reduce((a, p) => a + p[1], 0);
  return `${page('Relatórios', `${S.prod === 'all' ? 'Todos os produtos' : esc(prodOf(S.prod).name)} · valores em reais`, '<button class="btn sec" data-a="expCsv">Exportar CSV</button>')}
${multi() ? `<section class="card rcard rprod"><div class="rp-l">${rh('Receita recorrente por produto', brl(mrrTot), 'por mês, somando os produtos')}${donutChart(perProd, [brlK(mrrTot), 'por mês'])}</div><div class="rp-r">${visProd().map((p, i) => { const a = D.subs.filter(s => s.product === p.code && s.status === 'active'), m = mrrOf(a), all = D.subs.filter(s => s.product === p.code), late = all.filter(s => s.status === 'past_due').length; return `<button class="rp-c" data-a="prodView" data-v="${p.code}"><span class="rp-h">${plogo(p.code, 'sm')}<b>${esc(p.name)}</b><i style="background:${['var(--seq4)', 'var(--seq2)', 'var(--seq3)'][i % 3]}"></i></span><span class="rp-m num">${brl(m)}<small>/mês</small></span><span class="rp-k"><span><small>Ativas</small><b class="num">${a.length}</b></span><span><small>Ticket médio</small><b class="num">${a.length ? brlK(m / a.length) : '—'}</b></span><span><small>Em atraso</small><b class="num${late ? ' neg' : ''}">${late}</b></span></span><span class="rp-go">Ver só ${esc(p.name)} ${ic('arrowR', 14, 2.2)}</span></button>`; }).join('')}</div></section>` : ''}
<div class="g2 g2w"><section class="card rcard">${rh('Receita recebida', brl(recTot), `nos últimos 6 meses · outubro até ${fmtFull(TODAY).slice(0, 5)}`)}${areaChart(rec, { partial: true })}</section>
<section class="card rcard">${rh('Previsão de recebimento', brl(fcTot), 'nas próximas 4 semanas')}${colChart(fc)}<p class="foot">Cobranças pendentes e próximos ciclos mensais. PIX só entra quando a cobrança é gerada.</p></section></div>
<div class="g2 g2w"><section class="card rcard">${rh('Inadimplência', brl(lateTot), `${late.length} cobrança${late.length === 1 ? '' : 's'} em atraso, por tempo de atraso`)}${stackBar(aging)}<p class="foot">Depois da tolerância de cada produto, a situação vira em atraso.</p></section>
<section class="card rcard">${rh('Formas de pagamento', brl(payTot), 'total recebido')}${donutChart(Object.entries(byMethod), [Object.keys(byMethod).length, 'formas'])}<div class="rsub"><h3>Ciclo das assinaturas ativas</h3>${stackBar(ratio, v => v + (v === 1 ? ' assinatura' : ' assinaturas'), ['var(--seq4)', 'var(--seq2)'])}</div></section></div>
<div class="g2 g2w"><section class="card rcard">${rh('Cancelamentos', String(canc.reduce((a, c) => a + c[1], 0)), 'por motivo')}${canc.length ? rank(canc.map(([k, v]) => [k, v, v + (v === 1 ? ' cancelamento' : ' cancelamentos')])) : `<div class="r-empty">${ic('check', 18, 2.2)}<span>Nenhum cancelamento ${S.prod === 'all' ? '' : 'neste produto '}até agora.</span></div>`}</section>
<section class="card rcard">${rh('Descontos ativos', brl(discTot), 'deixam de ser cobrados por mês')}${disc.length ? rank(disc) : `<div class="r-empty">${ic('check', 18, 2.2)}<span>Nenhum desconto ativo.</span></div>`}<p class="foot">Vouchers e descontos manuais ficam registrados no cliente.</p></section></div>`;
}
A.expCsv = () => toast('Exportação gerada (simulada): relatorio-assinaturas.csv');

/* ---------- produtos ---------- */
const PS = { active: ['pago', 'Ativo'], draft: ['pendente', 'Rascunho'], paused: ['neutro', 'Pausado'] };
function produtos() {
  return `${page('Produtos', 'Cada produto tem o seu provedor de pagamento, as suas chaves, os seus parâmetros, os seus planos e os seus termos.', ``)}${isAdm() ? '' : note('lock', 'Só o administrador cadastra produtos e mexe em chaves e provedor.')}
<div class="tw"><table><thead><tr><th>Produto</th><th>Provedor</th><th>Planos</th><th class="r">Ativas</th><th class="r">Receita mensal</th><th>Chave</th><th>Situação</th></tr></thead><tbody>${visProd().map(p => { const a = D.subs.filter(s => s.product === p.code && s.status === 'active'), k = p.keys.find(x => x.active); return `<tr class="row" tabindex="0" data-a="produto" data-v="${p.code}"><td><span class="pcell">${plogo(p.code, 'md')}<span><b>${esc(p.name)}</b><small>${esc(p.tagline)} · <code>${p.code}</code></small></span></span></td><td>${PNAME[p.provider]}<small>${p.env}</small></td><td>${D.plans.filter(x => x.product === p.code).length}</td><td class="r num">${a.length}</td><td class="r num">${brl(mrrOf(a))}</td><td><code>••••${k ? k.tail : '—'}</code></td><td>${chip(PS[p.status])}</td></tr>`; }).join('')}</tbody></table></div>`;
}
A.produto = c => { S.pid = c; S.ptab = 'geral'; S.screen = 'produto'; closeDlg(); render(); window.scrollTo(0, 0); };
A.ptab = v => { S.ptab = v; render(); };
const CONFIG = {
  params: {
    currency: ['Moeda', 'text'], cycles: ['Ciclos habilitados', 'list', ['mensal', 'anual']],
    tolerance: ['Tolerância de atraso (dias)', 'number', 30], trialDays: ['Período de teste (dias)', 'number', 90],
    methods: ['Formas de pagamento', 'list', ['PIX', 'Cartão', 'Boleto']],
    window: ['Janela pós-cancelamento', 'text'], cacheTtl: ['Cache da consulta de acesso (segundos)', 'number', 3600]
  },
  incoming: { accessUrl: ['Endpoint de consulta de acesso', 'url'], header: ['Cabeçalho da chave do produto', 'text'] },
  outgoing: { eventsUrl: ['Endpoint de eventos', 'url'], provisionUrl: ['Endpoint de provisionamento', 'url'], auth: ['Autenticação do produto', 'select', ['Bearer token', 'API key', 'OAuth 2.0 client credentials']], header: ['Cabeçalho da API key', 'text'], credential: ['Token / chave do produto', 'secret'], tokenUrl: ['Endpoint de autenticação OAuth', 'url'], clientId: ['Client ID', 'text'], clientSecret: ['Client secret', 'secret'], scope: ['Escopo OAuth (opcional)', 'optional'] }
};
let editingConfig = '';
function integrationData(p) {
  p.incoming ||= { accessUrl: `https://subscriptions.example.invalid/api/v1/access/${p.code}/members/{memberId}`, header: 'X-Product-Key' };
  p.outgoing ||= { eventsUrl: p.eventsUrl, provisionUrl: p.provisionUrl, auth: 'Bearer token', header: 'X-Api-Key', credential: 'demo-product-token', tokenUrl: `https://${p.code}.example.invalid/oauth/token`, clientId: `${p.code}-subscriptions-demo`, clientSecret: 'demo-client-secret', scope: '' };
}
function configSection(p, group, title, description) {
  integrationData(p);
  const allowed = group === 'params' ? isAdm() || S.admin.role === 'Financeiro' : isAdm();
  const rows = Object.entries(CONFIG[group]).filter(([key]) => group !== 'outgoing' || !(['header'].includes(key) && p.outgoing.auth !== 'API key') && !(['credential'].includes(key) && p.outgoing.auth === 'OAuth 2.0 client credentials') && !(['tokenUrl','clientId','clientSecret','scope'].includes(key) && p.outgoing.auth !== 'OAuth 2.0 client credentials'));
  return `<section class="card"><h2>${title}</h2><p class="foot">${description}</p><div class="config-rows">${rows.map(([key,[label,type,options]]) => {
    const ref = `${group}|${key}`, value = p[group][key];
    const display = type === 'secret' ? (value ? '•••••••• · configurado' : 'Não configurado') : Array.isArray(value) ? value.join(', ') : value === '' || value == null ? 'Não definido' : value;
    let editor = '';
    if (editingConfig === ref && allowed) {
      if (type === 'list') editor = options.map(option => `<label class="opt"><input type="checkbox" name="configValue" value="${esc(option)}" ${value.includes(option) ? 'checked' : ''}>${esc(option)}</label>`).join('');
      else if (type === 'select') editor = `<select id="configValue" aria-label="${label}">${options.map(option => `<option ${value === option ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select>`;
      else editor = `<input id="configValue" aria-label="${label}" type="${type === 'secret' ? 'password' : type === 'number' ? 'number' : 'text'}" value="${type === 'secret' ? '' : esc(value)}" placeholder="${type === 'secret' ? 'Informe somente uma credencial fictícia' : ''}">`;
      editor = `<div class="config-editor">${editor}<p role="status" id="configError"></p><div class="chips"><button class="btn sm" data-a="configSave" data-v="${ref}">Salvar</button><button class="btn sec sm" data-a="configCancel">Cancelar</button></div></div>`;
    }
    return `<div class="config-row"><div><b>${label}</b><p>${esc(display)}</p>${editor}</div>${editor ? '' : `<button class="btn sec sm" data-a="configEdit" data-v="${ref}" aria-label="Editar ${label}" ${allowed ? '' : 'disabled'}>Editar</button>`}</div>`;
  }).join('')}</div></section>`;
}
function integrationSections(p) {
  return configSection(p,'incoming','Produto → Assinaturas','O produto envia sua chave para consultar o serviço de assinaturas. As chaves são gerenciadas acima.') + configSection(p,'outgoing','Assinaturas → Produto','Callbacks de eventos e provisionamento usam os endpoints e a autenticação próprios deste produto. Credenciais independentes da chave de entrada. Use apenas valores fictícios: nenhuma chamada é feita.') + `<section class="card"><h2>Assinatura dos eventos</h2><p class="foot">HMAC verifica a integridade dos eventos; não substitui a autenticação do produto.</p><p>${esc(p.secret)}</p><button class="btn sec sm" data-a="rotate" ${isAdm() ? '' : 'disabled'}>Rotacionar segredo HMAC</button></section>`;
}
A.configEdit = ref => { editingConfig = ref; render(); };
A.configCancel = () => { editingConfig = ''; render(); };
A.configSave = ref => {
  const [group,key] = ref.split('|'), p = prodOf(S.pid), spec = CONFIG[group]?.[key];
  if (!spec || !(isAdm() || group === 'params' && S.admin.role === 'Financeiro')) return;
  const [label,type,max] = spec;
  let value = type === 'list' ? [...document.querySelectorAll('[name=configValue]:checked')].map(x=>x.value) : document.querySelector('#configValue').value.trim();
  const fail = message => { document.querySelector('#configError').textContent = message; };
  if (type === 'list' && !value.length) return fail('Selecione pelo menos uma opção.');
  if (type !== 'list' && type !== 'optional' && !value) return fail('Informe um valor.');
  if (type === 'number') { value = Number(value); if (!Number.isInteger(value) || value < 0 || value > max) return fail(`Informe um inteiro entre 0 e ${max}.`); }
  if (type === 'url') { try { if (new URL(value).protocol !== 'https:') return fail('Use um endereço HTTPS.'); } catch { return fail('Informe um endereço HTTPS válido.'); } }
  p[group][key] = value;
  if (group === 'outgoing' && ['eventsUrl','provisionUrl'].includes(key)) p[key] = value;
  log(`Alterou ${label}`, `Produto ${p.name}`, p.code);
  editingConfig = ''; render(); toast('Configuração atualizada.');
};

const PTABS = [['geral', 'Geral'], ['integracao', 'Integração e chaves'], ['parametros', 'Parâmetros'], ['termos', 'Termos e consentimentos']];
function produtoPage() {
  const p = prodOf(S.pid), pl = D.plans.filter(x => x.product === p.code), subs = D.subs.filter(s => s.product === p.code), act = subs.filter(s => s.status === 'active');
  const head = `${crumb('produtos', 'Produtos', esc(p.name))}${page(`<span class="ph-prod">${plogo(p.code, 'lg')}<span>${esc(p.name)}</span></span>`, `${esc(p.tagline)} · <code>${p.code}</code> · ${chip(PS[p.status])}`, isAdm() ? (p.status === 'active' ? `<button class="btn sec sm" data-a="pStatus" data-v="paused">Pausar vendas</button>` : p.status === 'paused' ? `<button class="btn sm" data-a="pStatus" data-v="active">Retomar vendas</button>` : `<button class="btn sm" data-a="pStatus" data-v="active">Ativar produto</button>`) : '')}<nav class="tabs" role="tablist">${PTABS.map(([k, l]) => `<button role="tab" aria-selected="${S.ptab === k}" data-a="ptab" data-v="${k}">${l}</button>`).join('')}</nav>`;
  let body = '';
  if (S.ptab === 'geral') body = `<section class="kpis"><div class="kpi"><small>Assinaturas ativas</small><b>${act.length}</b><span>${subs.length} no total</span></div><div class="kpi"><small>Receita mensal</small><b>${brl(mrrOf(act))}</b></div><div class="kpi"><small>Planos</small><b>${pl.length}</b><span>${pl.filter(x => x.active).length} ativos</span></div><div class="kpi"><small>Termos vigentes</small><b>${p.terms.length}</b><span>${subs.filter(s => pendingConsents(s).some(c => c.required)).length} membro(s) com aceite pendente</span></div></section>
<section class="card"><h2>Dados do produto</h2><dl class="kv"><div><dt>Nome</dt><dd>${esc(p.name)}</dd></div><div><dt>Código</dt><dd><code>${p.code}</code></dd></div><div><dt>Provedor de pagamento</dt><dd><select data-a="prov" aria-label="Provedor" ${isAdm() ? '' : 'disabled'}>${PROVIDERS.map(([k, l]) => `<option value="${k}" ${p.provider === k ? 'selected' : ''}>${l}</option>`).join('')}</select></dd></div><div><dt>Ambiente</dt><dd>${p.env}</dd></div><div><dt>Campos extras do checkout</dt><dd>${esc(p.fields)}</dd></div></dl>${note('info', 'O provedor vale por produto. Trocar o provedor afeta só as cobranças novas; as existentes continuam onde estão. O pagamento é transparente (sem PCI): nunca vemos dados de cartão.')}<div class="chips"><button class="btn sec sm" data-a="go" data-v="planos">Ver planos do produto</button></div></section>`;
  else if (S.ptab === 'integracao') body = `<section class="card"><h2>Chaves do produto</h2><p class="foot" style="margin:0 0 10px">O produto usa a chave para consultar o acesso e se autenticar. Pode haver duas ativas ao mesmo tempo, durante a troca.</p><ul class="tl">${p.keys.map(k => `<li><code>${p.env === 'Produção' ? 'lk_live' : 'lk_test'}_••••••••${k.tail}</code> ${k.active ? chip(['pago', 'Ativa']) : chip(['neutro', 'Revogada'])}<small>Criada em ${fmtFull(k.at)} · último uso ${k.last || 'nunca'} ${k.active && isAdm() ? `<button class="btn ghost sm" data-a="keyRevoke" data-v="${k.id}">Revogar</button>` : ''}</small></li>`).join('')}</ul><div class="chips"><button class="btn sm" data-a="keyNew" ${isAdm() ? '' : 'disabled'}>Gerar nova chave</button></div></section>
${integrationSections(p)}
${guide('Simulador da consulta de acesso', `<p class="foot" style="margin:0 0 12px">Veja o que o produto recebe quando consulta um membro. Teste também chave inválida e chave de outro produto.</p><div class="fgrid2">${fld('tPick', 'Membro', { opts: [['', 'Escolha um membro…'], ...D.subs.filter(s => s.product === p.code).map(s => [s.memberId, `${subCust(s).name} · ${s.memberId}`])] })}${fld('tKey', 'Chave usada', { opts: [['ok', 'Chave ativa deste produto'], ['revoked', 'Chave revogada'], ['other', 'Chave de outro produto']] })}</div>${fld('tMem', 'memberId', { hint: 'Digite um identificador qualquer para ver o erro 404.' })}<button class="btn sm" data-a="testAccess">Consultar</button><div id="tRes" style="margin-top:12px"></div>`)}`;
  else if (S.ptab === 'parametros') body = configSection(p, 'params', 'Parâmetros', 'Edite e salve cada parâmetro individualmente.');
  else body = `<section class="card"><h2>Termos e consentimentos</h2>${note('info', 'Cada documento tem versão e é obrigatório ou opcional (opt-in). Publicar uma nova versão obrigatória marca os membros como pendentes; a consulta de acesso passa a listar o documento em <code>pendingConsents</code> e o produto pede o novo aceite.')}<div class="tw" style="box-shadow:none;margin:0"><table><thead><tr><th>Documento</th><th>Versão</th><th>Tipo</th><th class="r">Aceite em dia</th><th></th></tr></thead><tbody>${p.terms.map(t => { const ok = subs.filter(s => { const c = s.consents[t.id]; return t.required ? c && c.version === t.version : c && c.accepted; }).length; return `<tr><td><b>${esc(t.title)}</b><small>${esc(t.type)} · publicado em ${fmtFull(t.date)}</small></td><td>${t.version}</td><td>${t.required ? chip(['pendente', 'Obrigatório']) : chip(['neutro', 'Opt-in'])}</td><td class="r num">${ok} de ${subs.length}</td><td><div class="act"><button class="btn sec sm" data-a="termPub" data-v="${t.id}" ${isAdm() ? '' : 'disabled'}>Publicar nova versão</button></div></td></tr>`; }).join('')}</tbody></table></div><div class="chips"><button class="btn sm" data-a="termNew" ${isAdm() ? '' : 'disabled'}>Novo documento</button></div></section>`;
  return head + body;
}
A.prov = v => { if (!isAdm()) return toast('Só o administrador troca o provedor.', 'bad'); const p = prodOf(S.pid), old = p.provider; p.provider = v; log(`Trocou o provedor de ${PNAME[old]} para ${PNAME[v]}`, `Produto ${p.name}`, p.code); toast('Provedor alterado. Novas cobranças usam o novo provedor; as existentes continuam onde estão.'); render(); };
A.rotate = () => { if (!isAdm()) return toast('Só o administrador rotaciona o segredo.', 'bad'); const p = prodOf(S.pid); p.secret = 'whsec_••••••••' + Math.random().toString(16).slice(2, 6); log('Rotacionou o segredo de assinatura', `Produto ${p.name}`, p.code); toast('Segredo rotacionado. Atualize o produto com o novo valor.'); render(); };
A.pStatus = v => { if (!isAdm()) return; const p = prodOf(S.pid); if (v === 'active' && p.status === 'draft') { if (!D.plans.some(x => x.product === p.code && x.active)) return toast('Cadastre ao menos um plano ativo antes de ativar o produto.', 'bad'); } p.status = v; log(v === 'active' ? 'Ativou as vendas do produto' : 'Pausou as vendas do produto', `Produto ${p.name}`, p.code); toast(v === 'active' ? 'Produto ativo para novas vendas.' : 'Vendas pausadas. Assinantes atuais não mudam.'); render(); };
A.keyNew = () => { if (!isAdm()) return; const p = prodOf(S.pid), tail = Math.random().toString(16).slice(2, 6), full = `${p.env === 'Produção' ? 'lk_live' : 'lk_test'}_${Math.random().toString(16).slice(2, 14)}${Math.random().toString(16).slice(2, 14)}${tail}`;
  p.keys.unshift({ id: id('k'), tail, active: true, at: TODAY, last: '' }); log('Gerou uma nova chave do produto', `Produto ${p.name}`, p.code);
  dlg(`<h2>Nova chave gerada</h2><p class="lede">Copie agora. Por segurança, ela <b>não será mostrada de novo</b>: depois só aparecem os 4 últimos caracteres.</p><div class="fld"><input readonly value="${full}" style="font-family:ui-monospace,Menlo,monospace;font-size:13px"></div>${note('info', 'A chave antiga continua ativa até você revogá-la. Troque no produto e, depois, revogue a antiga.')}<div class="ft2"><button class="btn sm" data-a="closeDlg">Já copiei</button></div>`); render(); };
A.keyRevoke = kid => { if (!isAdm()) return; const p = prodOf(S.pid), k = p.keys.find(x => x.id === kid); if (p.keys.filter(x => x.active).length <= 1) return toast('Gere outra chave antes de revogar a única ativa. Sem chave, o produto não consulta o acesso.', 'bad'); k.active = false; log(`Revogou a chave final ${k.tail}`, `Produto ${p.name}`, p.code); toast('Chave revogada. Chamadas com ela passam a receber 401.'); render(); };
A.testAccess = () => { const p = prodOf(S.pid), kk = val('tKey'), mid = val('tMem') || val('tPick'); let code, body;
  if (kk === 'revoked') { code = 401; body = { error: 'invalid_product_key' }; } else if (kk === 'other') { code = 403; body = { error: 'product_key_mismatch' }; }
  else { const s = D.subs.find(x => x.product === p.code && x.memberId === mid); if (!s) { code = 404; body = { error: 'member_not_found' }; } else { code = 200; body = accessResponse(s); } }
  $('#tRes').innerHTML = `<p style="margin:0 0 6px;font-weight:700">HTTP ${code} ${code === 200 ? chip(['pago', 'OK']) : chip(['vencido', 'Erro'])}</p><pre class="json">${esc(JSON.stringify(body, null, 2))}</pre>${code === 200 ? '<p class="foot">O produto decide o que fazer com o estado: este sistema só informa.</p>' : ''}`; };
document.addEventListener('change', e => { if (e.target.id === 'tPick') { const m = document.getElementById('tMem'); if (m) m.value = e.target.value; } });
A.termPub = tid => { if (!isAdm()) return; const p = prodOf(S.pid), t = p.terms.find(x => x.id === tid), d = dlg(`<h2>Nova versão de “${esc(t.title)}”</h2><p class="lede">Versão atual: ${t.version}.</p>${fld('vN', 'Nova versão', { hint: 'Ex.: 1.3' })}${t.required ? note('warn', 'Documento obrigatório: todos os membros ficam com o aceite <b>pendente</b> e o produto é avisado (<code>consent.required</code>).') : note('info', 'Documento opcional: a nova versão fica disponível; ninguém é bloqueado.')}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="vGo">Publicar</button></div>`);
  $('#vGo', d).addEventListener('click', () => { fclear(); const v = val('vN'); if (!/^\d+(\.\d+)*$/.test(v)) return ferr('vN', 'Use o formato 1.3.'); if (v === t.version) return ferr('vN', 'A versão precisa ser diferente da atual.'); t.version = v; t.date = TODAY; let n2 = 0; if (t.required) D.subs.filter(s => s.product === p.code && s.status !== 'canceled').forEach(s => { emit(s.id, 'consent.required'); n2++; }); log(`Publicou a versão ${v} de ${t.title}`, `Produto ${p.name}`, p.code); closeDlg(); toast(t.required ? `Versão publicada. ${n2} membro(s) com aceite pendente.` : 'Versão publicada.'); render(); }); };
A.termNew = () => { if (!isAdm()) return; const p = prodOf(S.pid), d = dlg(`<h2>Novo documento</h2>${fld('dT', 'Tipo', { opts: [['Termos de uso', 'Termos de uso'], ['Política de privacidade', 'Política de privacidade'], ['Marketing (opt-in)', 'Consentimento de marketing (opt-in)'], ['Outro', 'Outro']] })}${fld('dN', 'Título')}${fld('dV', 'Versão', { v: '1.0' })}<label class="opt"><input type="checkbox" id="dR"><span><b>Obrigatório</b><small>Sem aceite, aparece como pendente na consulta de acesso. Opt-in nunca bloqueia.</small></span></label><div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="dGo">Criar</button></div>`);
  $('#dGo', d).addEventListener('click', () => { fclear(); if (!val('dN')) return ferr('dN', 'Informe o título.'); p.terms.push({ id: id('t'), type: val('dT'), title: val('dN'), version: val('dV') || '1.0', required: $('#dR').checked, date: TODAY }); log(`Criou o documento ${val('dN')}`, `Produto ${p.name}`, p.code); closeDlg(); toast('Documento criado.'); render(); }); };
A.pNew = () => toast('Este mock contempla somente Alva e Zelos Kids.');

/* ---------- clientes ---------- */
function clientes() {
  const q = S.q.toLowerCase(), rows = [];
  D.customers.filter(c => !q || (c.name + c.email).toLowerCase().includes(q)).forEach(c => custSubs(c.id).filter(s => inSel(s.product)).forEach((s, i) => rows.push({ c, s, first: i === 0 })));
  return `${page('Clientes', 'Uma linha por assinatura: a mesma pessoa aparece uma vez para cada produto que assina, cada uma com o seu plano e o seu valor pago. Toque para ver tudo: pagamentos, assinatura, descontos, termos, avisos e atividade.')}<div class="tools">${prodCombo()}<input id="q" placeholder="Buscar por nome ou e-mail" value="${esc(S.q)}" aria-label="Buscar"></div>
<div class="tw"><table><thead><tr><th>Cliente</th><th>Produto</th><th>Plano</th><th>Situação</th><th class="r">Pago até hoje</th></tr></thead><tbody>${pageOf('cl', rows).map(({ c, s, first }) => { const paid = D.charges.filter(h => h.sub === s.id && h.status === 'paid').reduce((x, h) => x + h.amount, 0); return `<tr class="row ${first ? '' : 'again'}" tabindex="0" data-a="cliente" data-v="${c.id}|resumo|${s.id}"><td><b>${esc(c.name)}</b><small>${esc(c.email)}</small></td><td>${ptag(s.product)}</td><td>${esc(planOfSub(s).name)} · ${s.cycle}${(s.discounts || []).length ? ' <span class="pill">desconto</span>' : ''}</td><td>${chip(SS[s.status])}</td><td class="r num">${brl(paid)}</td></tr>`; }).join('') || `<tr><td colspan="5">${empty('Nenhum cliente encontrado.')}</td></tr>`}</tbody></table>${pager('cl', rows.length)}</div>`;
}
A.cliente = v => { const [cid, tab, sid] = v.split('|'); S.cid = cid; S.tab = tab || 'resumo'; S.sid = sid || null; S.screen = 'cliente'; closeDlg(); render(); window.scrollTo(0, 0); };
A.pickSub = sid => { S.sid = sid; render(); };
const TABS = [['resumo', 'Resumo'], ['pagamentos', 'Pagamentos'], ['assinatura', 'Assinatura e descontos'], ['termos', 'Termos e consentimentos'], ['avisos', 'Avisos'], ['atividade', 'Atividade']];
A.tab = v => { S.tab = v; render(); };
function clientePage() {
  const c = cust(S.cid), all = custSubs(c.id).filter(s => scopeOf().includes(s.product)); let s = all.find(x => x.id === S.sid) || all.find(x => inSel(x.product)) || all[0]; S.sid = s.id;
  const ch = D.charges.filter(h => h.sub === s.id).sort((a, b) => b.due.localeCompare(a.due)), paid = ch.filter(h => h.status === 'paid'), tot = paid.reduce((a, h) => a + h.amount, 0), p = prodOf(s.product);
  const ev = D.events.filter(e => e.sub === s.id), act = D.audit.filter(a => a.ref === c.name), disc = s.discounts || [], months = Math.max(0, Math.floor(diff(TODAY, s.start) / 30)), pc = pendingConsents(s);
  const sw = all.length > 1 ? `<div class="swt" role="group" aria-label="Assinaturas desta pessoa">${all.map(x => `<button data-a="pickSub" data-v="${x.id}" aria-pressed="${x.id === s.id}">${esc(prodOf(x.product).name)} · ${esc(planOf(x.product, x.plan).name)} ${chip(SS[x.status])}</button>`).join('')}</div>` : '';
  const head = `${crumb('clientes', 'Clientes', esc(c.name))}${page(esc(c.name), `${esc(c.email)} · ${ptag(s.product)} <code>${s.memberId}</code>`, actions(s, true))}${sw}
<nav class="tabs" role="tablist">${TABS.map(([k, l]) => `<button role="tab" aria-selected="${S.tab === k}" data-a="tab" data-v="${k}">${l}${k === 'avisos' && ev.some(e => e.status === 'failed') ? ' <span class="badge">!</span>' : ''}${k === 'termos' && pc.some(x => x.required) ? ' <span class="badge">!</span>' : ''}</button>`).join('')}</nav>`;
  let body = '';
  const warn = s.status === 'suspended' ? note('warn', `<b>Contrato suspenso</b> desde ${fmtFull(s.suspended.at)} por ${esc(s.suspended.by)}. Motivo: ${esc(s.suspended.reason)}. Cobranças e vigência estão pausadas; o titular ainda pode exportar os dados e excluir a conta no produto.`) : s.status === 'canceling' ? note('warn', `<b>Cancelamento agendado.</b> O acesso continua até ${fmtFull(s.end)}.`) : '';
  if (S.tab === 'resumo') body = `${warn}<section class="kpis"><div class="kpi"><small>Situação</small><b style="font-size:20px">${chip(SS[s.status])}</b><span>${esc(planOfSub(s).name)} · ${s.cycle}</span></div><div class="kpi"><small>Total pago</small><b>${brl(tot)}</b><span>${paid.length} pagamento(s)</span></div><div class="kpi"><small>${['canceled', 'canceling'].includes(s.status) ? 'Acesso até' : 'Próxima cobrança'}</small><b style="font-size:22px">${s.status === 'suspended' ? 'Pausada' : fmtFull(s.end || s.next || s.start)}</b><span>${brl(net(s))}${disc.length ? ` (cheio ${brl(gross(s))})` : ''}</span></div><div class="kpi"><small>Cliente deste produto há</small><b>${months} mês(es)</b><span>desde ${fmtFull(s.start)}</span></div></section>
<div class="g2"><section class="card"><h2>Dados do titular</h2><dl class="kv"><div><dt>Nome</dt><dd>${esc(c.name)}</dd></div><div><dt>E-mail</dt><dd>${esc(c.email)}</dd></div><div><dt>CPF</dt><dd>${esc(c.cpf)}</dd></div><div><dt>Telefone</dt><dd>${esc(c.phone)}</dd></div><div><dt>Cidade</dt><dd>${esc(c.city)}</dd></div><div><dt>Cliente desde</dt><dd>${fmtFull(c.since)}</dd></div></dl><p class="foot">Nunca guardamos dados de cartão; só a bandeira e os 4 últimos dígitos.</p></section>
<section class="card"><h2>Assinatura em ${esc(p.name)}</h2><dl class="kv"><div><dt>Plano</dt><dd>${esc(planOfSub(s).name)} · ${s.cycle}</dd></div><div><dt>Valor cheio</dt><dd>${brl(gross(s))}</dd></div><div><dt>Valor cobrado</dt><dd><b>${brl(net(s))}</b></dd></div><div><dt>Pagamento</dt><dd>${esc(s.method)} · ${PNAME[p.provider]}</dd></div><div><dt>Referência no produto</dt><dd>${esc(s.ref)}</dd></div><div><dt>memberId</dt><dd><code>${s.memberId}</code></dd></div></dl>${disc.length ? note('info', `Desconto ativo: ${disc.map(d => `${esc(d.label)} (${d.kind === 'pct' ? d.value + '%' : brl(d.value)}, ${d.left ? d.left + ' cobrança(s)' : 'durante a vigência'})`).join('; ')}.`) : ''}</section></div>

<section class="card"><h2>Últimos pagamentos</h2>${chTable(ch.slice(0, 4), false)}<p style="margin-top:10px"><button class="btn ghost sm" data-a="tab" data-v="pagamentos">Ver todo o histórico</button></p></section>
${guide('O que o produto recebe na consulta de acesso', `<pre class="json">${esc(JSON.stringify(accessResponse(s), null, 2))}</pre><p class="foot">Exemplo para quem integra: o produto consulta este estado e decide o que fazer. Esta resposta é montada pela API; não é uma tela do sistema.</p>`)}`;
  else if (S.tab === 'pagamentos') body = `<section class="kpis"><div class="kpi"><small>Total pago</small><b>${brl(tot)}</b><span>${paid.length} cobrança(s) paga(s)</span></div><div class="kpi"><small>Pendente</small><b>${brl(ch.filter(h => h.status === 'pending').reduce((a, h) => a + h.amount, 0))}</b></div><div class="kpi"><small>Atrasado</small><b class="${ch.some(h => h.status === 'overdue') ? 'neg' : ''}">${brl(ch.filter(h => h.status === 'overdue').reduce((a, h) => a + h.amount, 0))}</b></div><div class="kpi"><small>Descontos dados</small><b>${brl(ch.reduce((a, h) => a + (h.discount || 0), 0))}</b></div></section><section class="card"><h2>Histórico completo de cobranças · ${esc(p.name)}</h2>${chTable(pageOf('cli', ch), true)}${pager('cli', ch.length)}</section>`;
  else if (S.tab === 'assinatura') body = `<div class="g2"><section class="card"><h2>Descontos e vouchers</h2>${disc.length ? `<ul class="tl">${disc.map(d => `<li><b>${esc(d.label)}</b> · ${d.kind === 'pct' ? d.value + '%' : brl(d.value)} · ${d.left ? d.left + ' cobrança(s) restante(s)' : 'durante a vigência do plano'}<small>${esc(d.reason)} · ${esc(d.by)} · ${fmtFull(d.at)} <button class="btn ghost sm" data-a="discOff" data-v="${s.id}|${d.id}">Remover</button></small></li>`).join('')}</ul>` : empty('Nenhum desconto aplicado.')}<div class="chips" style="margin-top:12px"><button class="btn sm" data-a="discount" data-v="${s.id}">Aplicar voucher ou desconto</button></div></section>
<section class="card"><h2>Trocas de plano</h2>${D.changes.filter(x => x.sub === s.id).length ? `<ul class="tl">${D.changes.filter(x => x.sub === s.id).map(x => `<li>${esc(x.from)} → <b>${esc(x.to)}</b> <span class="pill">${x.kind}</span><small>${fmtFull(x.at)} · ${esc(x.by)}</small></li>`).join('')}</ul>` : empty('Sem trocas de plano.')}${D.cancels.filter(x => x.sub === s.id).map(x => note('warn', `Cancelamento pedido em ${fmtFull(x.at)} (${esc(x.reason)}) por ${esc(x.by)}. Acesso até ${fmtFull(x.until)}.`)).join('')}</section></div>`;
  else if (S.tab === 'termos') body = `<section class="card"><h2>Termos e consentimentos · ${esc(p.name)}</h2>${pc.some(x => x.required) ? note('warn', 'Há aceite obrigatório pendente. A consulta de acesso lista o documento em <code>pendingConsents</code> e o produto pede o aceite.') : note('ok', 'Todos os documentos obrigatórios estão aceitos na versão vigente.')}<div class="tw" style="box-shadow:none;margin:0"><table><thead><tr><th>Documento</th><th>Versão vigente</th><th>Situação</th></tr></thead><tbody>${p.terms.map(t => { const k = s.consents[t.id]; let st; if (t.required) st = k && k.version === t.version ? chip(['pago', 'Aceito']) + `<small>v${k.version} em ${fmtFull(k.at)}</small>` : k ? chip(['vencido', 'Desatualizado']) + `<small>aceitou v${k.version}; vigente v${t.version}</small>` : chip(['vencido', 'Pendente']); else st = k && k.accepted ? chip(['pago', 'Aceitou']) + `<small>em ${fmtFull(k.at)}</small>` : chip(['neutro', 'Não aceitou']); return `<tr><td><b>${esc(t.title)}</b><small>${esc(t.type)} · ${t.required ? 'obrigatório' : 'opcional (opt-in)'}</small></td><td>v${t.version}</td><td>${st}</td></tr>`; }).join('')}</tbody></table></div></section>`;
  else if (S.tab === 'avisos') body = `<section class="card"><h2>Avisos enviados a ${esc(p.name)}</h2>${note('info', 'Cada aviso é uma mensagem automática deste sistema ao produto, dizendo o que mudou (primeiro pagamento, atraso, cancelamento, troca de plano). O produto também pode consultar o estado a qualquer momento.')}${evTable(ev)}</section>`;
  else body = `<section class="card"><h2>Atividade da equipe sobre este cliente</h2>${act.length ? `<ul class="tl">${act.map(a => `<li><b>${esc(a.what)}</b><small>${esc(a.who)} · ${a.at}</small></li>`).join('')}</ul>` : empty('Nenhuma ação da equipe registrada.')}</section>`;
  return head + body;
}
function chTable(list, withAct) { return `<div class="tw" style="box-shadow:none;margin:0"><table><thead><tr><th>Vencimento</th><th class="r">Valor</th><th>Forma</th><th>Situação</th>${withAct ? '<th></th>' : ''}</tr></thead><tbody>${list.map(h => `<tr><td>${fmtFull(h.due)}${h.paidAt ? `<small>paga em ${fmtFull(h.paidAt)}</small>` : ''}</td><td class="r num">${brl(h.amount)}${h.discount ? `<small>cheio ${brl(h.gross)} · desc. ${brl(h.discount)}</small>` : ''}</td><td>${esc(h.method)}</td><td>${chip(CS[h.status])}${h.attempts ? `<small>${h.attempts} tentativa(s)</small>` : ''}</td>${withAct ? `<td><div class="act">${['pending', 'overdue'].includes(h.status) ? `<button class="btn sec sm" data-a="resend" data-v="${h.id}">Reenviar</button><button class="btn sec sm" data-a="markPaid" data-v="${h.id}">Marcar como paga</button>` : ''}</div></td>` : ''}</tr>`).join('') || `<tr><td colspan="5">${empty('Sem cobranças.')}</td></tr>`}</tbody></table></div>`; }
function evTable(list) { return `<div class="tw" style="box-shadow:none;margin:0"><table><thead><tr><th>Evento</th><th>Quando</th><th>Entrega</th><th></th></tr></thead><tbody>${list.map(e => `<tr><td><code>${esc(e.type)}</code><small>${esc(e.id)}</small></td><td>${e.at}</td><td>${e.status === 'ok' ? chip(['pago', 'Entregue']) : chip(['vencido', 'Falhou'])}<small>${e.attempts} tentativa(s)</small></td><td>${e.status === 'failed' ? `<button class="btn sec sm" data-a="evRetry" data-v="${e.id}">Reenviar</button>` : ''}</td></tr>`).join('') || `<tr><td colspan="4">${empty('Nenhum aviso.')}</td></tr>`}</tbody></table></div>`; }

/* ---------- assinaturas ---------- */
function assinaturas() {
  const f = S.f.subs || {}, list = mSubs().filter(s => (!f.st || s.status === f.st) && (!f.pl || s.plan === f.pl));
  const plans = D.plans.filter(p => inSel(p.product));
  return `${page('Assinaturas', 'Trocar plano, aplicar voucher ou desconto, suspender, cancelar e reativar. Cada mudança avisa o produto e fica na auditoria.')}<div class="tools">${prodCombo()}<select data-a="flt" data-k="subs.st" aria-label="Situação"><option value="">Todas as situações</option>${Object.entries(SS).map(([k, v]) => `<option value="${k}" ${f.st === k ? 'selected' : ''}>${v[1]}</option>`).join('')}</select><select data-a="flt" data-k="subs.pl" aria-label="Plano"><option value="">Todos os planos</option>${[...new Set(plans.map(p => p.code))].map(c => `<option value="${c}" ${f.pl === c ? 'selected' : ''}>${esc(plans.find(p => p.code === c).name)}</option>`).join('')}</select></div>
<div class="tw"><table><thead><tr><th>Cliente</th>${multi() ? '<th>Produto</th>' : ''}<th>Plano</th><th>Valor cobrado</th><th>Situação</th><th>Próxima cobrança / fim</th><th></th></tr></thead><tbody>${pageOf('as', list).map(s => `<tr class="row" tabindex="0" data-a="cliente" data-v="${s.customer}|assinatura|${s.id}"><td><b>${esc(subCust(s).name)}</b><small>${esc(s.method)}</small></td>${multi() ? `<td>${ptag(s.product)}</td>` : ''}<td>${esc(planOfSub(s).name)} · ${s.cycle}</td><td class="num">${brl(net(s))}${(s.discounts || []).length ? `<small>cheio ${brl(gross(s))}</small>` : ''}</td><td>${chip(SS[s.status])}</td><td>${s.status === 'suspended' ? 'Pausada' : fmtFull(s.end || s.next || s.start)}</td><td><div class="act">${actions(s)}</div></td></tr>`).join('') || `<tr><td colspan="7">${empty('Nenhuma assinatura neste filtro.')}</td></tr>`}</tbody></table>${pager('as', list.length)}</div>`;
}
A.flt = (v, el) => { const [a, k] = el.dataset.k.split('.'); (S.f[a] ||= {})[k] = v; render(); };
const lg = (s, what) => log(what, subCust(s).name, s.product);
A.chPlan = sid => { if (!guard()) return; const s = subOf(sid), p = prodOf(s.product), d = dlg(`<h2>Trocar plano</h2><p class="lede">${esc(subCust(s).name)} · ${esc(p.name)} · hoje ${esc(planOfSub(s).name)} (${s.cycle})</p>${D.plans.filter(x => x.product === s.product && x.active).map(x => p.params.cycles.filter(cy => x[cy] != null).map(cy => `<label class="opt"><input type="radio" name="np" value="${x.code}|${cy}" ${s.plan === x.code && s.cycle === cy ? 'checked' : ''}><span><b>${esc(x.name)} · ${cy}</b><small>${brl(x[cy])} · ${Object.entries(x.ent).map(([k, v]) => `${k}: ${v}`).join(', ')}</small></span></label>`).join('')).join('')}<div id="npN"></div><div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="npGo">Confirmar troca</button></div>`);
  const order = D.plans.filter(x => x.product === s.product).map(x => x.code), upd = () => { const [k] = d.querySelector('input:checked').value.split('|'); $('#npN', d).innerHTML = order.indexOf(k) < order.indexOf(s.plan) ? note('warn', 'Efeitos da mudança, proporcionalidade e recursos por plano ainda serão definidos. Aqui a troca é apenas demonstrativa.') : ''; };
  $$('input[name=np]', d).forEach(i => i.addEventListener('change', upd)); upd();
  $('#npGo', d).addEventListener('click', () => { const [k, cy] = d.querySelector('input:checked').value.split('|'); if (k === s.plan && cy === s.cycle) return toast('Escolha um plano ou ciclo diferente.', 'bad');
    const from = `${s.plan} · ${s.cycle}`, kind = k === s.plan ? 'ciclo' : order.indexOf(k) > order.indexOf(s.plan) ? 'upgrade' : 'downgrade'; s.plan = k; s.cycle = cy; D.changes.unshift({ sub: s.id, at: TODAY, from, to: `${k} · ${cy}`, kind, by: S.admin.name }); emit(s.id, 'subscription.plan_changed'); lg(s, `Trocou plano de ${from} para ${k} · ${cy}`); closeDlg(); toast('Plano alterado. O produto foi avisado.'); render(); }); };
A.cancel = sid => { if (!guard()) return; const s = subOf(sid), d = dlg(`<h2>Cancelar assinatura</h2><p class="lede">${esc(subCust(s).name)} · ${esc(prodOf(s.product).name)} · ${esc(planOfSub(s).name)}</p>
<label class="opt"><input type="radio" name="cm" value="end" checked><span><b>No fim do período pago</b><small>O acesso continua até ${fmtFull(s.next || TODAY)}; depois bloqueia.</small></span></label><label class="opt"><input type="radio" name="cm" value="now"><span><b>Imediato</b><small>O acesso é bloqueado agora.</small></span></label>${fld('cM', 'Motivo', { opts: [['Preço', 'Preço'], ['Não uso mais', 'Não usa mais'], ['Faltou algo', 'Faltou algo'], ['Inadimplência', 'Inadimplência'], ['Outro', 'Outro']] })}${note('info', 'Depois do fim, o produto abre a janela de exportação e exclusão do próprio produto. O titular pode excluir a conta quando quiser.')}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Voltar</button><button class="btn dng sm" id="cGo">Cancelar assinatura</button></div>`);
  $('#cGo', d).addEventListener('click', () => { const now = d.querySelector('input[name=cm]:checked').value === 'now'; s.end = now ? TODAY : (s.next || TODAY); s.status = now ? 'canceled' : 'canceling'; s.next = null; D.cancels.unshift({ sub: s.id, at: TODAY, until: s.end, reason: val('cM'), by: S.admin.name }); D.charges.filter(h => h.sub === s.id && ['pending', 'paused'].includes(h.status)).forEach(h => { h.status = 'canceled'; });
    emit(s.id, now ? 'subscription.canceled' : 'subscription.cancellation_scheduled'); lg(s, `Cancelou a assinatura ${now ? 'imediatamente' : 'no fim do período'} (${val('cM')})`); closeDlg(); toast(now ? 'Assinatura cancelada agora.' : 'Cancelamento agendado para o fim do período.'); render(); }); };
A.undoCancel = sid => { if (!guard()) return; const s = subOf(sid); s.status = 'active'; s.next = s.end; s.end = null; D.cancels = D.cancels.filter(c => c.sub !== sid || c.until !== s.next); emit(s.id, 'subscription.reactivated'); lg(s, 'Desfez o cancelamento agendado'); toast('Cancelamento desfeito. O produto foi avisado.'); render(); };
A.endNow = sid => { if (!guard()) return; const s = subOf(sid); s.status = 'canceled'; s.end = TODAY; emit(s.id, 'subscription.canceled'); lg(s, 'Encerrou o acesso agora (cancelamento agendado antecipado)'); toast('Acesso encerrado agora.'); render(); };
A.reactivate = sid => { if (!guard()) return; const s = subOf(sid); s.status = 'active'; s.end = null; s.next = addDays(TODAY, 30); emit(s.id, 'subscription.reactivated'); lg(s, 'Reativou a assinatura'); closeDlg(); toast('Assinatura reativada. O produto foi avisado.'); render(); };
/* suspensão: temporária e reversível; pausa cobranças e vigência, com motivo obrigatório */
A.suspend = sid => { if (!guard()) return; const s = subOf(sid), d = dlg(`<h2>Suspender contrato</h2><p class="lede">${esc(subCust(s).name)} · ${esc(prodOf(s.product).name)} · ${esc(planOfSub(s).name)}. A consulta de acesso passa a responder <code>suspended</code>, mesmo que esteja tudo pago.</p>${fld('sK', 'Tipo do motivo', { opts: [['admin_request', 'A pedido do cliente ou da equipe'], ['fraud_suspicion', 'Suspeita de uso indevido'], ['other', 'Outro']] })}${fld('sR', 'Motivo (fica na auditoria)', { ta: true, hint: 'Descreva o que aconteceu.' })}${note('info', 'As cobranças ficam <b>pausadas</b> e a <b>vigência para de correr</b>. O titular continua podendo exportar os dados e excluir a conta no produto. Para voltar, use “Reativar”.')}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn dng sm" id="sGo">Suspender</button></div>`);
  $('#sGo', d).addEventListener('click', () => { fclear(); if (val('sR').length < 8) return ferr('sR', 'Descreva o motivo (8 caracteres ou mais).'); s.suspended = { at: TODAY, kind: val('sK'), reason: val('sR'), by: S.admin.name, prev: s.status, frozenNext: s.next };
    s.status = 'suspended'; s.next = null; D.charges.filter(h => h.sub === s.id && ['pending', 'overdue'].includes(h.status)).forEach(h => { h.was = h.status; h.status = 'paused'; }); emit(s.id, 'subscription.suspended'); lg(s, `Suspendeu o contrato (${val('sK')}): ${val('sR')}`); closeDlg(); toast('Contrato suspenso. Cobranças e vigência pausadas; o produto foi avisado.'); render(); }); };
A.resume = sid => { if (!guard()) return; const s = subOf(sid), sp = s.suspended, days = Math.max(0, diff(TODAY, sp.at)), fz = sp.frozenNext || addDays(TODAY, 30);
  const calc = m => (m === 'keep' ? (fz < TODAY ? TODAY : fz) : m === 'extend' ? addDays(fz, days) : val('rD'));
  const d = dlg(`<h2>Reativar contrato</h2><p class="lede">${esc(subCust(s).name)} · ${esc(prodOf(s.product).name)} · suspenso há ${days} dia(s), desde ${fmtFull(sp.at)}.</p>${note('info', `Motivo da suspensão: ${esc(sp.reason)}`)}<p style="margin:0 0 8px;font-weight:700">O que fazer com a vigência?</p>
<label class="opt"><input type="radio" name="rm" value="keep" checked><span><b>Manter as datas do ciclo</b><small>A próxima cobrança continua em ${fmtFull(fz)}${fz < TODAY ? ' (já passou: cobra hoje)' : ''}. Os dias suspensos não são devolvidos.</small></span></label>
<label class="opt"><input type="radio" name="rm" value="extend"><span><b>Estender pelos dias suspensos</b><small>As datas andam ${days} dia(s): próxima cobrança em ${fmtFull(addDays(fz, days))}.</small></span></label>
<label class="opt"><input type="radio" name="rm" value="custom"><span><b>Definir a data da próxima cobrança</b><small>Você escolhe.</small></span></label><div id="rC" hidden>${fld('rD', 'Próxima cobrança', { type: 'date', v: addDays(TODAY, 30) })}</div><div id="rP"></div><div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="rGo">Reativar contrato</button></div>`);
  const mode = () => d.querySelector('input[name=rm]:checked').value, show = () => { $('#rC', d).hidden = mode() !== 'custom'; const nx = calc(mode()); $('#rP', d).innerHTML = nx ? note('ok', `Próxima cobrança: <b>${fmtFull(nx)}</b>. As cobranças pausadas voltam e o produto é avisado.`) : ''; };
  $$('input[name=rm]', d).forEach(i => i.addEventListener('change', show)); $('#rD', d).addEventListener('input', show); show();
  $('#rGo', d).addEventListener('click', () => { fclear(); const nx = calc(mode()); if (!nx || nx < TODAY) return ferr('rD', 'Escolha uma data de hoje em diante.');
    s.status = 'active'; s.next = nx; s.suspended = null; D.charges.filter(h => h.sub === s.id && h.status === 'paused').forEach((h, k) => { h.status = 'pending'; h.attempts = 0; if (k === 0) h.due = nx; });
    emit(s.id, 'subscription.resumed'); lg(s, `Reativou o contrato após ${days} dia(s) de suspensão (${mode() === 'keep' ? 'datas mantidas' : mode() === 'extend' ? 'vigência estendida' : 'nova data ' + fmtFull(nx)})`); closeDlg(); toast('Contrato reativado. O produto foi avisado.'); render(); }); };

/* ---------- voucher e desconto ---------- */
A.discount = sid => { if (!guard()) return; const s = subOf(sid), vs = D.vouchers.filter(v => v.product === s.product && v.active), d = dlg(`<h2>Aplicar voucher ou desconto</h2><p class="lede">${esc(subCust(s).name)} · ${esc(prodOf(s.product).name)} · ${esc(planOfSub(s).name)} ${s.cycle} · hoje ${brl(net(s))}</p>
<label class="opt"><input type="radio" name="dm" value="voucher" ${vs.length ? 'checked' : 'disabled'}><span><b>Usar um voucher</b><small>${vs.length ? 'Regras prontas, cadastradas em Vouchers deste produto' : 'Este produto não tem voucher ativo'}</small></span></label><div id="dV" ${vs.length ? '' : 'hidden'}>${vs.length ? fld('dC', 'Voucher', { opts: vs.map(v => [v.code, `${v.code} · ${v.kind === 'pct' ? v.value + '%' : brl(v.value)} · ${v.cycles ? v.cycles + ' cobrança(s)' : 'vigência'}`]) }) : ''}</div>
<label class="opt"><input type="radio" name="dm" value="custom" ${vs.length ? '' : 'checked'}><span><b>Desconto manual</b><small>Por exemplo, compensação por instabilidade</small></span></label><div id="dX" ${vs.length ? 'hidden' : ''}><div class="fgrid2">${fld('dK', 'Tipo', { opts: [['pct', 'Percentual (%)'], ['fixed', 'Valor fixo (R$)']] })}${fld('dVl', 'Valor', { hint: 'Ex.: 15 (%) ou 10,00 (R$)' })}</div>${fld('dD', 'Duração', { opts: [['1', 'Só a próxima cobrança'], ['3', 'As próximas 3 cobranças'], ['0', 'Durante a vigência do plano']] })}</div>
${fld('dR', 'Motivo (fica na auditoria)', { ta: true, hint: 'Ex.: instabilidade de 12 a 14/10, combinado com o cliente.' })}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="dGo">Aplicar</button></div>`);
  const mode = () => d.querySelector('input[name=dm]:checked').value;
  $$('input[name=dm]', d).forEach(i => i.addEventListener('change', () => { $('#dV', d).hidden = mode() !== 'voucher'; $('#dX', d).hidden = mode() !== 'custom'; }));
  $('#dGo', d).addEventListener('click', () => { fclear(); if (val('dR').length < 6) return ferr('dR', 'Descreva o motivo (6 caracteres ou mais).');
    let disc; if (mode() === 'voucher') { const v = vs.find(x => x.code === val('dC')); if (!v) return ferr('dC', 'Escolha um voucher ativo.'); v.uses++; disc = { label: v.code, kind: v.kind, value: v.value, left: v.cycles }; }
    else { const raw = parseFloat(val('dVl').replace(',', '.')), k = val('dK'); if (!(raw > 0)) return ferr('dVl', 'Informe um valor maior que zero.'); if (k === 'pct' && raw > 100) return ferr('dVl', 'O percentual vai até 100.'); const value = k === 'pct' ? raw : Math.round(raw * 100); if (k === 'fixed' && value > gross(s)) return ferr('dVl', `O desconto não pode passar do valor do plano (${brl(gross(s))}).`); disc = { label: 'Desconto manual', kind: k, value, left: +val('dD') || null }; }
    s.discounts.push({ id: id('d'), ...disc, reason: val('dR'), by: S.admin.name, at: TODAY });
    const pend = D.charges.filter(h => h.sub === s.id && ['pending', 'overdue'].includes(h.status)).sort((a, b) => a.due.localeCompare(b.due))[0];
    if (pend) { pend.gross = gross(s); pend.amount = net(s); pend.discount = pend.gross - pend.amount; }
    lg(s, `Aplicou ${disc.label} (${disc.kind === 'pct' ? disc.value + '%' : brl(disc.value)}): ${val('dR')}`); closeDlg(); toast(`Desconto aplicado. Valor cobrado: ${brl(net(s))}.`); render(); }); };
A.discOff = v => { if (!guard()) return; const [sid, did] = v.split('|'), s = subOf(sid); s.discounts = s.discounts.filter(x => x.id !== did); lg(s, 'Removeu um desconto'); toast('Desconto removido.'); render(); };
function vouchers() {
  const list = D.vouchers.filter(v => inSel(v.product));
  return `${page('Vouchers', 'Descontos prontos para aplicar em uma assinatura. Cada voucher pertence a um produto. O desconto vale pela duração definida e fica registrado no cliente.', `<button class="btn sm" data-a="vNew" ${canWrite() ? '' : 'disabled'}>${ic('plus', 15, 2.4)}Novo voucher</button>`)}
<div class="tools">${prodCombo()}</div><div class="tw"><table><thead><tr><th>Código</th>${multi() ? '<th>Produto</th>' : ''}<th>Desconto</th><th>Duração</th><th class="r">Usos</th><th>Situação</th><th></th></tr></thead><tbody>${pageOf('vo', list).map(v => `<tr><td><b>${esc(v.code)}</b><small>${esc(v.label)}</small></td>${multi() ? `<td>${ptag(v.product)}</td>` : ''}<td>${v.kind === 'pct' ? v.value + '%' : brl(v.value)}</td><td>${v.cycles ? v.cycles + ' cobrança(s)' : 'Durante a vigência'}</td><td class="r num">${v.uses}</td><td>${v.active ? chip(['pago', 'Ativo']) : chip(['neutro', 'Inativo'])}</td><td><div class="act"><button class="btn sec sm" data-a="vOn" data-v="${v.product}|${v.code}">${v.active ? 'Desativar' : 'Ativar'}</button></div></td></tr>`).join('') || `<tr><td colspan="7">${empty('Nenhum voucher neste produto.')}</td></tr>`}</tbody></table>${pager('vo', list.length)}</div>${note('info', 'Depois, a vitrine do produto pode aceitar o código no checkout. Neste protótipo, a equipe aplica o voucher na assinatura.')}`;
}
A.vOn = v => { if (!guard()) return; const [p, c] = v.split('|'), x = D.vouchers.find(y => y.product === p && y.code === c); x.active = !x.active; log(`${x.active ? 'Ativou' : 'Desativou'} o voucher ${c}`, 'Vouchers', p); render(); };
const prodField = (id0) => (S.prod === 'all' ? fld(id0, 'Produto', { opts: visProd().map(p => [p.code, p.name]) }) : '');
const prodPick = id0 => (S.prod === 'all' ? val(id0) : S.prod);
A.vNew = () => { if (!guard()) return; const d = dlg(`<h2>Novo voucher</h2>${prodField('nPr')}${fld('nC', 'Código', { hint: 'Letras maiúsculas e números. Ex.: AMIGO15' })}${fld('nL', 'Nome interno')}<div class="fgrid2">${fld('nK', 'Tipo', { opts: [['pct', 'Percentual (%)'], ['fixed', 'Valor fixo (R$)']] })}${fld('nV', 'Valor')}</div>${fld('nD', 'Duração', { opts: [['1', 'Só a próxima cobrança'], ['3', 'As próximas 3 cobranças'], ['12', 'As próximas 12 cobranças'], ['0', 'Durante a vigência do plano']] })}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="nGo">Criar</button></div>`);
  $('#nGo', d).addEventListener('click', () => { fclear(); const pr = prodPick('nPr'), code = val('nC').toUpperCase(), raw = parseFloat(val('nV').replace(',', '.')), k = val('nK'); if (!/^[A-Z0-9]{4,20}$/.test(code)) return ferr('nC', 'Use 4 a 20 letras maiúsculas ou números.'); if (D.vouchers.some(v => v.product === pr && v.code === code)) return ferr('nC', 'Já existe um voucher com este código neste produto.'); if (!(raw > 0) || (k === 'pct' && raw > 100)) return ferr('nV', 'Valor inválido.');
    D.vouchers.unshift({ product: pr, code, label: val('nL') || code, kind: k, value: k === 'pct' ? raw : Math.round(raw * 100), cycles: +val('nD') || null, active: true, uses: 0 }); log(`Criou o voucher ${code}`, 'Vouchers', pr); closeDlg(); toast('Voucher criado.'); render(); }); };

/* ---------- cobranças ---------- */
function cobrancas() {
  const f = S.f.ch || {}, list = mCharges().filter(c => !f.st || c.status === f.st).sort((a, b) => b.due.localeCompare(a.due));
  return `${page('Cobranças e pagamentos', 'Uma cobrança por ciclo. Toque numa linha para abrir o cliente e ver todo o histórico.')}<div class="tools">${prodCombo()}<select data-a="flt" data-k="ch.st" aria-label="Situação"><option value="">Todas</option>${Object.entries(CS).map(([k, v]) => `<option value="${k}" ${f.st === k ? 'selected' : ''}>${v[1]}</option>`).join('')}</select></div>
<div class="tw"><table><thead><tr><th>Cliente</th>${multi() ? '<th>Produto</th>' : ''}<th>Vencimento</th><th class="r">Valor</th><th>Forma</th><th>Situação</th><th></th></tr></thead><tbody>${pageOf('ch', list).map(c => { const s = subOf(c.sub); return `<tr class="row" tabindex="0" data-a="cliente" data-v="${s.customer}|pagamentos|${s.id}"><td><b>${esc(subCust(s).name)}</b><small>${esc(planOfSub(s).name)} · ${s.cycle}</small></td>${multi() ? `<td>${ptag(s.product)}</td>` : ''}<td>${fmtFull(c.due)}${c.paidAt ? `<small>paga em ${fmtFull(c.paidAt)}</small>` : ''}</td><td class="r num">${brl(c.amount)}${c.discount ? `<small>desc. ${brl(c.discount)}</small>` : ''}</td><td>${esc(c.method)}</td><td>${chip(CS[c.status])}${c.attempts ? `<small>${c.attempts} tentativa(s)</small>` : ''}</td><td><div class="act">${['pending', 'overdue'].includes(c.status) ? `<button class="btn sec sm" data-a="resend" data-v="${c.id}">Reenviar cobrança</button><button class="btn sec sm" data-a="markPaid" data-v="${c.id}">Marcar como paga</button>` : ''}</div></td></tr>`; }).join('') || `<tr><td colspan="7">${empty('Nenhuma cobrança neste filtro.')}</td></tr>`}</tbody></table>${pager('ch', list.length)}</div>`;
}
A.resend = cid => { const c = D.charges.find(x => x.id === cid), s = subOf(c.sub); c.attempts++; lg(s, `Reenviou cobrança ${c.method} de ${brl(c.amount)}`); toast(c.method === 'PIX' ? 'Nova cobrança PIX enviada por e-mail.' : 'Nova tentativa no cartão solicitada ao provedor.'); render(); };
A.markPaid = cid => { if (!guard()) return; const c = D.charges.find(x => x.id === cid), s = subOf(c.sub), d = dlg(`<h2>Marcar como paga</h2><p class="lede">Use só para reconciliar um pagamento que o provedor confirmou fora do fluxo. Fica na auditoria.</p>${fld('mP', 'Motivo e comprovante', { ta: true, hint: 'Ex.: PIX recebido direto na conta, comprovante nº…' })}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="mpGo">Confirmar</button></div>`);
  $('#mpGo', d).addEventListener('click', () => { fclear(); if (val('mP').length < 8) return ferr('mP', 'Descreva o motivo (8 caracteres ou mais).'); c.status = 'paid'; c.paidAt = TODAY; (s.discounts || []).forEach(x => { if (x.left) x.left--; }); s.discounts = (s.discounts || []).filter(x => x.left !== 0); if (s.status === 'past_due' || s.status === 'pending') { s.status = 'active'; s.next = addDays(TODAY, 30); emit(s.id, 'subscription.activated'); } lg(s, `Marcou cobrança como paga: ${val('mP')}`); closeDlg(); toast('Cobrança paga. O produto foi avisado.'); render(); }); };

/* ---------- planos ---------- */
const entText = o => Object.entries(o).map(([k, v]) => `${k} = ${v}`).join('\n'), parseEnt = t => Object.fromEntries(t.split('\n').map(l => l.split('=').map(x => x.trim())).filter(a => a[0] && a[1]));
function planos() {
  const list = D.plans.filter(p => inSel(p.product));
  return `${page('Planos', 'Planos dos dois produtos. Preços demonstrativos; recursos e limites ainda em definição.', `<button class="btn sm" data-a="plNew" ${canWrite() ? '' : 'disabled'}>${ic('plus', 15, 2.4)}Novo plano</button>`)}
<div class="tools">${prodCombo()}</div><div class="tw"><table><thead><tr><th>Plano</th>${multi() ? '<th>Produto</th>' : ''}<th>Recursos</th><th class="r">Mensal</th><th class="r">Anual</th><th>Situação</th><th></th></tr></thead><tbody>${pageOf('pl', list).map(x => `<tr><td><b>${esc(x.name)}</b><small>${x.code}</small></td>${multi() ? `<td>${ptag(x.product)}</td>` : ''}<td>${Object.entries(x.ent).map(([k, v]) => `${esc(k)}: <b>${esc(v)}</b>`).join('<br>') || 'A definir'}</td><td class="r num">${x.mensal != null ? brl(x.mensal) : '—'}</td><td class="r num">${x.anual != null ? brl(x.anual) : '—'}</td><td>${x.active ? chip(['pago', 'Ativo']) : chip(['neutro', 'Inativo'])}</td><td><div class="act"><button class="btn sec sm" data-a="plEdit" data-v="${x.product}|${x.code}">Editar</button><button class="btn sec sm" data-a="planOn" data-v="${x.product}|${x.code}">${x.active ? 'Desativar' : 'Ativar'}</button></div></td></tr>`).join('') || `<tr><td colspan="7">${empty('Nenhum plano neste produto.')}</td></tr>`}</tbody></table>${pager('pl', list.length)}</div>`;
}
A.planOn = v => { if (!guard()) return; const [pr, c] = v.split('|'), p = planOf(pr, c); p.active = !p.active; log(`${p.active ? 'Ativou' : 'Desativou'} o plano ${p.name}`, 'Planos', pr); toast(p.active ? 'Plano ativo para novas vendas.' : 'Plano fora de venda. Assinantes atuais não mudam.'); render(); };
const planForm = (p, prod) => `${p ? '' : fld('pC', 'Código', { hint: 'Letras minúsculas e números. Não muda depois.' })}${fld('pN', 'Nome', { v: p?.name || '' })}${fld('pE', 'Recursos por plano (a definir)', { ta: true, v: p ? entText(p.ent) : '', hint: 'Opcional no mock. Recursos e limites comerciais ainda não foram aprovados.' })}<div class="fgrid2">${prod.params.cycles.includes('mensal') ? fld('pM', 'Mensal (R$)', { v: p?.mensal != null ? (p.mensal / 100).toFixed(2).replace('.', ',') : '' }) : ''}${prod.params.cycles.includes('anual') ? fld('pA', 'Anual (R$)', { v: p?.anual != null ? (p.anual / 100).toFixed(2).replace('.', ',') : '', hint: 'Sugestão: 10 vezes o mensal.' }) : ''}</div>`;
const readPlan = (prod) => { const m = $('#pM') ? Math.round(parseFloat(val('pM').replace(',', '.')) * 100) : null, a = $('#pA') ? Math.round(parseFloat(val('pA').replace(',', '.')) * 100) : null; if (!val('pN')) return ferr('pN', 'Informe o nome.'); const ent = parseEnt(val('pE')); if ($('#pM') && !(m >= 0)) return ferr('pM', 'Informe zero ou um valor positivo.'); if ($('#pA') && !(a >= 0)) return ferr('pA', 'Informe zero ou um valor positivo.'); return { name: val('pN'), ent, mensal: m, anual: a }; };
A.plNew = () => { if (!guard()) return; const sel = S.prod === 'all' ? visProd().find(p => p.status !== 'paused') || visProd()[0] : prodOf(S.prod);
  const d = dlg(`<h2>Novo plano</h2>${S.prod === 'all' ? fld('pPr', 'Produto', { opts: visProd().map(p => [p.code, p.name]), v: sel.code }) : `<p class="lede">Produto: <b>${esc(sel.name)}</b></p>`}<div id="pForm">${planForm(null, sel)}</div><div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="pGo">Criar plano</button></div>`);
  $('#pPr', d)?.addEventListener('change', () => { $('#pForm', d).innerHTML = planForm(null, prodOf(val('pPr'))); });
  $('#pGo', d).addEventListener('click', () => { fclear(); const pr = prodPick('pPr') || sel.code, prod = prodOf(pr), code = val('pC').toLowerCase(); if (!/^[a-z0-9]{3,20}$/.test(code)) return ferr('pC', 'Use 3 a 20 letras minúsculas ou números.'); if (planOf(pr, code)) return ferr('pC', 'Já existe um plano com este código neste produto.'); const r = readPlan(prod); if (!r) return;
    D.plans.push({ product: pr, code, ...r, active: true }); log(`Criou o plano ${r.name}`, 'Planos', pr); closeDlg(); toast('Plano criado.'); render(); }); };
A.plEdit = v => { if (!guard()) return; const [pr, c] = v.split('|'), p = planOf(pr, c), prod = prodOf(pr), d = dlg(`<h2>Editar plano ${esc(p.name)}</h2><p class="lede">${esc(prod.name)}. Vale para novas assinaturas; quem já assina mantém o preço até trocar de plano.</p>${planForm(p, prod)}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="pGo">Salvar</button></div>`);
  $('#pGo', d).addEventListener('click', () => { fclear(); const r = readPlan(prod); if (!r) return; log(`Alterou o plano ${p.name}: ${p.mensal != null ? brl(p.mensal) : '—'}/${p.anual != null ? brl(p.anual) : '—'} para ${r.mensal != null ? brl(r.mensal) : '—'}/${r.anual != null ? brl(r.anual) : '—'}`, `Plano ${p.name}`, pr); Object.assign(p, r); closeDlg(); toast('Plano atualizado.'); render(); }); };

/* ---------- cancelamentos, trocas, avisos ---------- */
const cancelamentos = () => `${page('Cancelamentos', 'O acesso continua até o fim do período pago; depois o produto bloqueia e abre a janela de exportação e exclusão.')}<div class="tools">${prodCombo()}</div><div class="tw"><table><thead><tr><th>Cliente</th>${multi() ? '<th>Produto</th>' : ''}<th>Plano</th><th>Pedido em</th><th>Acesso até</th><th>Motivo</th><th>Por</th></tr></thead><tbody>${mCancels().map(c => { const s = subOf(c.sub); return `<tr class="row" tabindex="0" data-a="cliente" data-v="${s.customer}|assinatura|${s.id}"><td><b>${esc(subCust(s).name)}</b></td>${multi() ? `<td>${ptag(s.product)}</td>` : ''}<td>${esc(planOfSub(s).name)} · ${s.cycle}</td><td>${fmtFull(c.at)}</td><td>${fmtFull(c.until)}</td><td>${esc(c.reason)}</td><td>${esc(c.by)}</td></tr>`; }).join('') || `<tr><td colspan="7">${empty('Nenhum cancelamento.')}</td></tr>`}</tbody></table></div>`;
const trocas = () => `${page('Trocas de plano', 'Histórico de upgrades, downgrades e mudanças de ciclo.')}<div class="tools">${prodCombo()}</div><div class="tw"><table><thead><tr><th>Cliente</th>${multi() ? '<th>Produto</th>' : ''}<th>Data</th><th>De</th><th>Para</th><th>Tipo</th><th>Por</th></tr></thead><tbody>${mChanges().map(c => { const s = subOf(c.sub); return `<tr class="row" tabindex="0" data-a="cliente" data-v="${s.customer}|assinatura|${s.id}"><td><b>${esc(subCust(s).name)}</b></td>${multi() ? `<td>${ptag(s.product)}</td>` : ''}<td>${fmtFull(c.at)}</td><td>${esc(c.from)}</td><td>${esc(c.to)}</td><td><span class="pill">${c.kind}</span></td><td>${esc(c.by)}</td></tr>`; }).join('')}</tbody></table></div>`;
const EVENTS = [
  ['member.provisioned', 'Primeiro pagamento confirmado', 'Ativa', 'Cria o usuário ou a organização do produto'],
  ['subscription.activated', 'Pagou depois de atraso ou pendência', 'Ativa', 'Libera o acesso'],
  ['subscription.plan_changed', 'Troca de plano ou de ciclo', 'Ativa', 'Atualiza limites e recursos'],
  ['subscription.payment_overdue', 'Atraso passou da tolerância do produto', 'Em atraso', 'Bloqueia ou limita'],
  ['subscription.suspended', 'A equipe suspendeu o contrato', 'Suspensa', 'Bloqueia ou limita; o titular ainda exporta e exclui'],
  ['subscription.resumed', 'A equipe levantou a suspensão', 'Ativa', 'Libera o acesso'],
  ['subscription.cancellation_scheduled', 'Cancelamento pedido, vale até o fim do período', 'Cancelamento agendado', 'Acesso continua, com aviso do fim'],
  ['subscription.canceled', 'Fim do período ou cancelamento imediato', 'Cancelada', 'Bloqueia e abre a janela de exportação e exclusão'],
  ['subscription.reactivated', 'Cancelamento desfeito ou assinatura retomada', 'Ativa', 'Libera o acesso'],
  ['consent.required', 'Nova versão obrigatória de termos', 'a atual', 'Pede o novo aceite'],
  ['member.deleted', 'O titular excluiu a conta no produto (sentido contrário)', 'Cancelada', 'Cancela a assinatura; débito fica só com dados mínimos'],
];
const EVL = Object.fromEntries(EVENTS.map(e => [e[0], e[3]]));
const eventos = () => `${page('Avisos aos produtos', 'Mensagens automáticas que este sistema envia aos produtos a cada mudança. O produto também pode consultar o estado a qualquer momento.')}${note('info', '<b>Para que servem:</b> o produto não sabe quem pagou. Quando alguém paga pela primeira vez, atrasa, é suspenso, cancela ou troca de plano, este sistema avisa o produto, que decide se libera ou bloqueia. Cada aviso é assinado (para ninguém falsificar) e tem um identificador (para não valer duas vezes). Se um aviso falha, ele é reenviado com o mesmo identificador.')}

<div class="tools">${prodCombo()}</div><div class="tw"><table><thead><tr><th>Cliente</th>${multi() ? '<th>Produto</th>' : ''}<th>Evento</th><th>Quando</th><th>Entrega</th><th></th></tr></thead><tbody>${pageOf('ev', mEvents()).map(e => { const s = subOf(e.sub); return `<tr class="row" tabindex="0" data-a="cliente" data-v="${s.customer}|avisos|${s.id}"><td><b>${esc(subCust(s).name)}</b><small>${s.memberId}</small></td>${multi() ? `<td>${ptag(s.product)}</td>` : ''}<td><code>${esc(e.type)}</code><small>${esc(e.id)} · ${EVL[e.type] || ''}</small></td><td>${e.at}</td><td>${e.status === 'ok' ? chip(['pago', 'Entregue']) : chip(['vencido', 'Falhou'])}<small>${e.attempts} tentativa(s)</small></td><td>${e.status === 'failed' ? `<button class="btn sec sm" data-a="evRetry" data-v="${e.id}">Reenviar</button>` : ''}</td></tr>`; }).join('')}</tbody></table>${pager('ev', mEvents().length)}</div>
${guide('Catálogo de eventos', `<p class="foot" style="margin:0 0 10px">Nome padronizado <code>entidade.ação</code>, ação no passado. Cada evento leva a situação nova do contrato e vale para qualquer produto.</p><div class="tw" style="box-shadow:none;margin:0"><table><thead><tr><th>Evento</th><th>Quando</th><th>Situação nova</th><th>Efeito sugerido no produto</th></tr></thead><tbody>${EVENTS.map(e => `<tr><td><code>${e[0]}</code></td><td>${e[1]}</td><td>${e[2]}</td><td>${e[3]}</td></tr>`).join('')}</tbody></table></div>`)}`;
A.evRetry = eid => { const e = D.events.find(x => x.id === eid), s = subOf(e.sub); e.attempts++; e.status = 'ok'; lg(s, `Reenviou aviso ${e.type}`); toast('Aviso reenviado com o mesmo identificador. O produto confirmou.'); render(); };

/* ---------- equipe e auditoria ---------- */
const scopeText = m => (m.scope === 'all' ? 'Todos os produtos' : m.scope.map(c => prodOf(c).name).join(', '));
function equipe() {
  return `${page('Equipe', 'Quem entra neste sistema para administrar e acompanhar. Cada pessoa tem login próprio, segundo fator, uma permissão e um escopo de produtos.', `<button class="btn sm" data-a="mNew" ${isAdm() ? '' : 'disabled'}>${ic('plus', 15, 2.4)}Adicionar pessoa</button>`)}${isAdm() ? '' : note('lock', 'Só o administrador adiciona pessoas e muda permissões e escopo.')}
<div class="tw"><table><thead><tr><th>Pessoa</th><th>Permissão</th><th>Produtos</th><th>Situação</th><th>Último acesso</th><th></th></tr></thead><tbody>${D.team.map(m => `<tr><td><b>${esc(m.name)}</b><small>${esc(m.email)}</small></td><td>${isAdm() && m.email !== S.admin.email ? `<select data-a="mRole" data-k="${esc(m.email)}" aria-label="Permissão de ${esc(m.name)}">${Object.keys(ROLES).map(r => `<option ${m.role === r ? 'selected' : ''}>${r}</option>`).join('')}</select>` : esc(m.role)}</td><td>${esc(scopeText(m))}</td><td>${m.status === 'active' ? chip(['pago', 'Ativa']) : chip(['pendente', 'Convite enviado'])}</td><td>${m.last || '—'}</td><td><div class="act">${isAdm() && m.email !== S.admin.email ? `<button class="btn sec sm" data-a="mScope" data-v="${esc(m.email)}">Escopo</button>${m.status === 'invited' ? `<button class="btn sec sm" data-a="mAccept" data-v="${esc(m.email)}">Simular aceite</button>` : ''}<button class="btn sec sm" data-a="mDel" data-v="${esc(m.email)}">Remover</button>` : ''}</div></td></tr>`).join('')}</tbody></table></div>
<section class="card"><h2>O que cada permissão faz</h2><table style="min-width:0"><tbody>${Object.entries(ROLES).map(([k, v]) => `<tr><td style="width:150px"><b>${k}</b></td><td>${v}</td></tr>`).join('')}</tbody></table><p class="foot">O escopo limita a quais produtos a pessoa enxerga e age. Quem tem escopo parcial só vê os produtos liberados no seletor, nas listas e nos relatórios.</p></section>`;
}
const scopeFields = cur => `<p style="margin:0 0 6px;font-weight:700;font-size:13px">Produtos</p><label class="opt"><input type="radio" name="sc" value="all" ${cur === 'all' ? 'checked' : ''}><span><b>Todos os produtos</b><small>Inclusive os que forem cadastrados depois</small></span></label><label class="opt"><input type="radio" name="sc" value="some" ${cur !== 'all' ? 'checked' : ''}><span><b>Só alguns</b><small>${D.products.map(p => `<label style="display:inline-flex;gap:5px;margin-right:12px"><input type="checkbox" name="scp" value="${p.code}" ${cur !== 'all' && cur.includes(p.code) ? 'checked' : ''}>${esc(p.name)}</label>`).join('')}</small></span></label>`;
const readScope = d => { if (d.querySelector('input[name=sc]:checked').value === 'all') return 'all'; const l = [...d.querySelectorAll('input[name=scp]:checked')].map(x => x.value); return l.length ? l : null; };
A.mNew = () => { if (!isAdm()) return; const d = dlg(`<h2>Adicionar pessoa</h2><p class="lede">Ela recebe um convite por e-mail, cria a senha, configura o segundo fator e entra.</p>${fld('mE', 'E-mail')}${fld('mN', 'Nome')}${fld('mR', 'Permissão', { opts: Object.keys(ROLES).map(r => [r, `${r} · ${ROLES[r]}`]), v: 'Suporte' })}${scopeFields('all')}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="mGo">Enviar convite</button></div>`);
  $('#mGo', d).addEventListener('click', () => { fclear(); const e = val('mE').toLowerCase(), sc = readScope(d); if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return ferr('mE', 'Informe um e-mail válido.'); if (D.team.some(m => m.email === e)) return ferr('mE', 'Esta pessoa já está na equipe.'); if (!val('mN')) return ferr('mN', 'Informe o nome.'); if (!sc) return toast('Escolha ao menos um produto.', 'bad'); D.team.push({ email: e, name: val('mN'), role: val('mR'), scope: sc, status: 'invited', last: '' }); log(`Convidou ${e} como ${val('mR')} (${sc === 'all' ? 'todos os produtos' : sc.join(', ')})`, 'Equipe'); closeDlg(); toast(`Convite enviado para ${e}.`); render(); }); };
A.mScope = e => { if (!isAdm()) return; const m = D.team.find(x => x.email === e), d = dlg(`<h2>Escopo de ${esc(m.name)}</h2><p class="lede">Define a quais produtos a pessoa tem acesso.</p>${scopeFields(m.scope)}<div class="ft2"><button class="btn sec sm" data-a="closeDlg">Cancelar</button><button class="btn sm" id="sGo">Salvar</button></div>`);
  $('#sGo', d).addEventListener('click', () => { const sc = readScope(d); if (!sc) return toast('Escolha ao menos um produto.', 'bad'); m.scope = sc; log(`Mudou o escopo de ${e} para ${sc === 'all' ? 'todos os produtos' : sc.join(', ')}`, 'Equipe'); closeDlg(); toast('Escopo atualizado.'); render(); }); };
A.mRole = (v, el) => { const m = D.team.find(x => x.email === el.dataset.k); log(`Mudou a permissão de ${m.email} de ${m.role} para ${v}`, 'Equipe'); m.role = v; toast('Permissão atualizada.'); render(); };
A.mAccept = e => { const m = D.team.find(x => x.email === e); m.status = 'active'; m.last = `${TODAY} 14:32`; log(`${e} aceitou o convite`, 'Equipe'); toast('Convite aceito (simulado).'); render(); };
A.mDel = e => { if (!isAdm()) return; const adm = D.team.filter(m => m.role === 'Administrador' && m.status === 'active'), m = D.team.find(x => x.email === e); if (m.role === 'Administrador' && adm.length <= 1) return toast('A equipe precisa de ao menos um administrador.', 'bad'); D.team = D.team.filter(x => x.email !== e); log(`Removeu ${e} da equipe`, 'Equipe'); toast('Acesso removido. As sessões dessa pessoa foram encerradas.'); render(); };
const ACOL = { Alterou: 'var(--st-ace)', Trocou: 'var(--st-ace)', Mudou: 'var(--st-ace)', Revisou: 'var(--st-ace)', Criou: 'var(--st-int)', Gerou: 'var(--st-int)', Convidou: 'var(--st-int)', Publicou: 'var(--st-int)', Ativou: 'var(--st-int)', Reativou: 'var(--st-int)', Aplicou: 'var(--st-int)', Marcou: 'var(--st-int)', Reenviou: 'var(--st-sol)', Suspendeu: 'var(--st-sol)', Pausou: 'var(--st-sol)', Rotacionou: 'var(--st-sol)', Desfez: 'var(--st-sol)', Removeu: 'var(--st-rec)', Revogou: 'var(--st-rec)', Cancelou: 'var(--st-rec)', Desativou: 'var(--st-rec)', Encerrou: 'var(--st-rec)' };
const verbOf = a => a.what.split(' ')[0];
const auditoria = () => {
  S.af ||= 'todas'; S.aq ??= '';
  const all = mAudit(), q = S.aq.trim().toLowerCase(), verbs = [...new Set(all.map(verbOf))];
  if (S.af !== 'todas' && !verbs.includes(S.af)) S.af = 'todas';
  const l = all.filter(a => (S.af === 'todas' || verbOf(a) === S.af) && (!q || (a.who + ' ' + a.what + ' ' + a.ref).toLowerCase().includes(q)));
  const days = {}; l.forEach(a => (days[a.at.slice(0, 10)] ||= []).push(a));
  const dayLabel = d => d === TODAY ? 'Hoje' : diff(TODAY, d) === 1 ? 'Ontem' : new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }).replace('.', '');
  const people = new Set(all.map(a => a.who)).size, last = all.map(a => a.at).sort().at(-1);
  const line = a => { const v = verbOf(a), rest = a.what.slice(v.length + 1); return `<li><span class="at">${a.at.slice(11, 16)}</span><span class="adot" style="background:${ACOL[v] || 'var(--ink-soft)'}"></span><span class="ab"><b>${esc(a.who)}</b> <span class="aa" style="color:${ACOL[v] || 'var(--ink-muted)'}">${esc(v.toLowerCase())}</span> ${esc(rest)}${a.ref && !a.what.includes(a.ref) ? ` <span class="soft">· ${esc(a.ref)}</span>` : ''}</span>${a.product ? ptag(a.product) : '<em class="tag">Geral</em>'}</li>`; };
  return `${page('Auditoria', 'Quem fez o quê, quando e em qual produto. Os registros não são editados.', '<button class="btn sec" data-a="expAudit">Exportar CSV</button>')}
<section class="kpis k3"><div class="kpi"><small>Ações registradas</small><b>${all.length}</b><span>${S.prod === 'all' ? 'todos os produtos' : esc(prodOf(S.prod).name)}</span></div><div class="kpi"><small>Pessoas da equipe</small><b>${people}</b><span>com ações registradas</span></div><div class="kpi"><small>Último registro</small><b>${last ? last.slice(11, 16) : '—'}</b><span>${last ? (last.slice(0, 10) === TODAY ? 'hoje' : fmtFull(last.slice(0, 10))) : 'sem registros'}</span></div></section>
<section class="tw alogc"><div class="tbar"><label class="sbox">${ic('search', 16)}<input id="aq" placeholder="Buscar por pessoa ou registro" value="${esc(S.aq)}" autocomplete="off" aria-label="Buscar na auditoria"></label><div class="chipsf" role="group" aria-label="Filtrar por ação">${[['todas', 'Todas'], ...verbs.map(v => [v, v])].map(([k, t]) => `<button class="chipf${S.af === k ? ' on' : ''}" data-a="af" data-v="${esc(k)}" aria-pressed="${S.af === k}">${k !== 'todas' ? `<i style="background:${ACOL[k] || 'var(--ink-soft)'}"></i>` : ''}${esc(t)}<small>${k === 'todas' ? all.length : all.filter(a => verbOf(a) === k).length}</small></button>`).join('')}</div></div>
${l.length ? Object.keys(days).sort().reverse().map(d => `<div class="mgh"><span>${dayLabel(d)}</span><b>${days[d].length}</b></div><ol class="alog">${days[d].sort((x, y) => y.at.localeCompare(x.at)).map(line).join('')}</ol>`).join('') : `<div class="mempty"><p>Nada encontrado.</p><span>Nenhum registro corresponde a essa busca ou filtro.</span></div>`}
<div class="tfoot"><span>Os registros não podem ser editados nem apagados.</span><span>${l.length} de ${all.length}</span></div></section>`;
};
A.af = v => { S.af = v; render(); };
A.expAudit = () => toast('Exportação gerada (simulada): auditoria-assinaturas.csv');

/* ---------- shell ---------- */
const NAVG = [['Geral', ['overview', 'relatorios']], ['Comercial', ['clientes', 'assinaturas', 'cobrancas', 'planos', 'vouchers']], ['Ciclo de vida', ['cancelamentos', 'trocas', 'eventos']], ['Configuração', ['produtos', 'equipe', 'auditoria']]];
const NAV = [['overview', 'home', 'Visão geral'], ['relatorios', 'chart', 'Relatórios'], ['produtos', 'grid', 'Produtos'], ['clientes', 'users', 'Clientes'], ['assinaturas', 'repeat', 'Assinaturas'], ['cobrancas', 'receipt', 'Cobranças'], ['planos', 'tag', 'Planos'], ['vouchers', 'percent', 'Vouchers'], ['cancelamentos', 'ban', 'Cancelamentos'], ['trocas', 'swap', 'Trocas de plano'], ['eventos', 'send', 'Avisos aos produtos'], ['equipe', 'user', 'Equipe'], ['auditoria', 'shield', 'Auditoria']];
const VIEWS = { overview, relatorios, produtos, produto: produtoPage, clientes, cliente: clientePage, assinaturas, cobrancas, planos, vouchers, cancelamentos, trocas, eventos, equipe, auditoria };
const NAV_OF = { produto: 'produtos', cliente: 'clientes' };
function render() { if (DEFER) { Q.push(render0); return; } render0(); }
function render0() {
  document.documentElement.dataset.theme = S.theme === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'noite' : 'dia') : S.theme;
  if (!S.admin) { $('#root').innerHTML = login(); document.title = 'Entrar · Assinaturas'; return bindLogin(); }
  if (S.prod !== 'all' && !scopeOf().includes(S.prod)) S.prod = 'all';
  const bad = mCharges().filter(c => c.status === 'overdue').length + mEvents().filter(e => e.status === 'failed').length, cur = NAV_OF[S.screen] || S.screen, vp = visProd();
  const pIco = S.prod !== 'all' ? (S.prod === 'zeloskids' ? `<span class="psel-ic zk"><img src="${ZK_SHEEP}" alt=""></span>` : `<span class="psel-ic al">${logoMark(13)}</span>`) : `<span class="psel-ic all">${ic('grid', 17, 2)}</span>`;
  const pMeta = S.prod !== 'all' ? `${PNAME[prodOf(S.prod).provider]} · ${prodOf(S.prod).env}` : `${vp.length} produtos`;
  const sel = `<div class="psel">${pIco}<div class="psel-b"><label for="prodSel">Produto</label><select id="prodSel" data-a="prod" aria-label="Produto">${vp.length > 1 ? `<option value="all" ${S.prod === 'all' ? 'selected' : ''}>Todos os produtos</option>` : ''}${vp.map(p => `<option value="${p.code}" ${S.prod === p.code ? 'selected' : ''}>${esc(p.name)}${p.status !== 'active' ? ' (' + PS[p.status][1].toLowerCase() + ')' : ''}</option>`).join('')}</select><small>${pMeta}</small></div></div>`;
  const navItem = k => { const [, i, l] = NAV.find(x => x[0] === k); return `<button data-a="go" data-v="${k}" ${cur === k ? 'aria-current="page"' : ''}>${ic(i, 18, 1.9)}<span>${l}</span>${k === 'cobrancas' && bad ? `<span class="badge" aria-label="${bad} pendências">${bad}</span>` : ''}</button>`; };
  const ini = S.admin.name.split(/[\s(]+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const dark = document.documentElement.dataset.theme === 'noite';
  $('#root').innerHTML = `<div class="app"><aside class="side" id="side" aria-label="Menu"><div class="brand">${brandP(30)}<button class="ibtn side-x" data-a="navClose" aria-label="Fechar menu">${ic('x', 16, 2.2)}</button></div>${sel}<button class="sbtn" data-a="cmdOpen">${ic('search', 17, 2)}<span>Buscar</span><kbd>${/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'} K</kbd></button><nav class="nv" aria-label="Principal">${NAVG.map(([g, ks]) => `<p class="nv-h">${g}</p>${ks.map(navItem).join('')}`).join('')}</nav><div class="who-w"><button class="who" data-a="whoMenu" aria-haspopup="menu" aria-expanded="false"><span class="av" aria-hidden="true">${ini}</span><span class="who-t"><b>${esc(S.admin.name)}</b><small>${esc(S.admin.email)}</small></span>${ic('updown', 15, 2.2)}</button></div></aside><div class="veil" data-a="navClose"></div><div class="shell"><header class="topbar"><button class="ibtn" data-a="navOpen" aria-label="Abrir menu">${ic('menu', 18, 2)}</button>${brandP(26, false)}<span class="tb-sp"></span><button class="ibtn" data-a="cmdOpen" aria-label="Buscar">${ic('search', 17, 2)}</button></header><main id="main"><div class="wrap">${VIEWS[S.screen]()}</div></main></div></div>`;
  enhance();
  document.title = `${S.screen === 'cliente' ? cust(S.cid).name : S.screen === 'produto' ? prodOf(S.pid).name : NAV.find(x => x[0] === S.screen)[2]} · Assinaturas`;
  const aq = $('#aq'); if (aq) aq.addEventListener('input', e => { S.aq = e.target.value; const p = e.target.selectionStart; render(); const n = $('#aq'); n.focus(); n.setSelectionRange(p, p); });
  const q = $('#q'); if (q) q.addEventListener('input', e => { S.q = e.target.value; if (S.pg) S.pg.cl = 0; const p = e.target.selectionStart; render(); const n = $('#q'); n.focus(); n.setSelectionRange(p, p); });
}
A.go = v => { S.screen = v; render(); window.scrollTo(0, 0); };
A.navOpen = () => { $('#side')?.classList.add('open'); $('#side .nv button[aria-current]')?.focus({ preventScroll: true }); };
A.navClose = () => $('#side')?.classList.remove('open');
A.demoInfo = () => { A.navClose(); dlg(`<h2>Ambiente de demonstração</h2><p class="lede">Dois produtos de exemplo: Alva e Zelos Kids. Valores, ciclos, provedores e regras financeiras são fictícios para explorar as telas. Não são ofertas ou decisões comerciais. Limites dos planos ainda não definidos.</p><p class="lede">Nada é salvo: ao recarregar a página, os dados voltam ao início.</p><div class="ft2"><button class="btn" data-a="closeDlg">Entendi</button></div>`); };
A.jump = v => { document.getElementById(v)?.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); };
A.prod = v => { S.prod = v; render(); };
A.theme = () => { S.theme = document.documentElement.dataset.theme === 'noite' ? 'dia' : 'noite'; try { localStorage.setItem('org-theme', S.theme); } catch (e) { /* sem storage */ } render(); };
A.logout = () => { S.admin = null; render(); };
document.addEventListener('click', e => { const t = e.target.closest('[data-a]'); if (!t || t.matches('select')) return; const f = A[t.dataset.a]; if (!f) return; e.preventDefault(); f(t.dataset.v ?? '', t); });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('tr.row')) e.target.click(); if (e.key === 'Escape') { closeDlg(); A.navClose(); } });
document.addEventListener('change', e => { const t = e.target.closest('select[data-a]'); if (t && A[t.dataset.a]) A[t.dataset.a](t.value, t); });
const q = new URLSearchParams(location.search);
if (q.get('theme')) S.theme = q.get('theme');
if (q.get('u')) { const a = D.team.find(x => x.email.startsWith(q.get('u'))); if (a) { S.admin = { email: a.email, name: a.name, role: a.role, scope: a.scope }; S.screen = VIEWS[q.get('screen')] ? q.get('screen') : 'overview'; if (q.get('prod') && prodOf(q.get('prod'))) S.prod = q.get('prod'); else if (a.scope !== 'all' && a.scope.length === 1) S.prod = a.scope[0]; if (S.screen === 'cliente') S.cid = q.get('cid') || D.customers[0].id; if (S.screen === 'produto') S.pid = q.get('pid') || 'alva'; } }
render();

/* ===== botões assíncronos: mesmo padrão do Alva Web e do Alva Mobile ===== */
const AWORK = { Entrar: 'Entrando', Continuar: 'Verificando', Enviar: 'Enviando', Salvar: 'Salvando', Criar: 'Criando', Confirmar: 'Confirmando', Aplicar: 'Aplicando', Publicar: 'Publicando', Suspender: 'Suspendendo', Cancelar: 'Cancelando', Reativar: 'Reativando', Reenviar: 'Enviando', Marcar: 'Salvando', Gerar: 'Gerando', Exportar: 'Exportando', Desativar: 'Desativando', Ativar: 'Ativando', Remover: 'Removendo', Revogar: 'Revogando', Encerrar: 'Encerrando', Desfazer: 'Desfazendo', Rotacionar: 'Rotacionando', Pausar: 'Pausando', Retomar: 'Retomando', Simular: 'Simulando', Trocar: 'Trocando', Já: 'Concluindo' };
const ADONE = { Enviar: 'Enviado', Salvar: 'Salvo', Criar: 'Criado', Confirmar: 'Confirmado', Aplicar: 'Aplicado', Publicar: 'Publicado', Suspender: 'Suspenso', Cancelar: 'Cancelado', Reativar: 'Reativado', Reenviar: 'Enviado', Marcar: 'Marcada', Gerar: 'Gerada', Exportar: 'Exportado', Desativar: 'Desativado', Ativar: 'Ativado', Remover: 'Removido', Revogar: 'Revogada', Encerrar: 'Encerrado', Desfazer: 'Desfeito', Rotacionar: 'Rotacionado', Pausar: 'Pausadas', Retomar: 'Retomadas', Simular: 'Aceito', Trocar: 'Trocado' };
const ackSvg = `<svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="ckp" d="M5 12.5l4.5 4.5L19 7"/></svg>`;
function aStart(b, ms) { if (!b || b.dataset.ahtml != null) return; const first = b.textContent.trim().split(/\s+/)[0]; b.dataset.ahtml = b.innerHTML; b.style.minWidth = b.getBoundingClientRect().width + 'px'; b.style.setProperty('--dur', (ms || 900) + 'ms'); b.classList.add('is-busy'); b.innerHTML = `<span class="bprog"></span><span class="bl"><i class="bspin"></i>${AWORK[first] || 'Um instante'}</span>`; requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('run'))); }
function aDone(b, label) { if (!b) return; b.classList.add('is-done'); b.innerHTML = `<span class="bl">${ackSvg}${esc(label)}</span>`; }
/* Cada clique em botão roda a ação com a tela "segurada": se a ação terminou com sucesso (toast positivo),
   o botão mostra o progresso e a confirmação antes de fechar o diálogo e atualizar a tela. */
let pressed = null;
document.addEventListener('click', e => { const b = e.target.closest('.btn'); if (!b || b.disabled || b.classList.contains('is-busy')) return; pressed = b; DEFER = true; Q = []; }, true);
document.addEventListener('click', () => {
  if (!DEFER) return; const q = Q, b = pressed; DEFER = false; Q = []; pressed = null;
  const run = () => q.forEach(f => f());
  if (!q.length) return;
  if (q.toast !== 'ok' || RM || !b || !b.isConnected) return run();
  const first = b.textContent.trim().split(/\s+/)[0];
  aStart(b, 650); setTimeout(() => { aDone(b, ADONE[first] || 'Pronto'); setTimeout(run, 520); }, 650);
});


/* ===== menu de ações da linha: popover no desktop, folha no celular ===== */
const closeMenu = () => { $$('.menu,.menu-veil').forEach(m => m.remove()); $$('.more[aria-expanded]').forEach(b => b.removeAttribute('aria-expanded')); };
A.rowMenu = (sid, el) => {
  const open = el.getAttribute('aria-expanded'); closeMenu(); if (open) return;
  const s = subOf(sid), m = document.createElement('div'); m.className = 'menu'; m.setAttribute('role', 'menu');
  m.innerHTML = `<p class="menu-h">${esc(subCust(s).name)}<small>${esc(prodOf(s.product).name)} · ${esc(planOfSub(s).name)} ${s.cycle}</small></p>${actionList(s).map(([a, i, l, d]) => `<button class="mi${d ? ' dng' : ''}" role="menuitem" data-a="${a}" data-v="${s.id}">${ic(i, 17, 2)}${l}</button>`).join('')}`;
  const mobile = matchMedia('(max-width:640px)').matches;
  if (mobile) { const v = document.createElement('div'); v.className = 'menu-veil'; document.body.append(v); m.classList.add('sheet'); }
  document.body.append(m); el.setAttribute('aria-expanded', 'true');
  if (!mobile) { const r = el.getBoundingClientRect(), h = m.offsetHeight; m.style.top = (r.bottom + 6 + h > innerHeight ? r.top - h - 6 : r.bottom + 6) + 'px'; m.style.right = Math.max(12, innerWidth - r.right) + 'px'; }
  m.querySelector('.mi')?.focus({ preventScroll: true });
};
document.addEventListener('click', e => { if (!e.target.closest('.menu') && !e.target.closest('.more')) closeMenu(); }, true);
document.addEventListener('click', e => { if (e.target.closest('.menu .mi')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
addEventListener('scroll', () => { if (!$('.menu.sheet')) closeMenu(); }, { passive: true });

/* ===== exclusões e encerramentos passam por confirmação ===== */
function confirmAct({ title, body, label, fn }) {
  const d = dlg(`<div class="cf-ic">${ic('alert', 22, 2)}</div><h2>${title}</h2><p class="lede">${body}</p><div class="ft2"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dng" id="cfGo">${label}</button></div>`);
  $('#cfGo', d).addEventListener('click', () => { closeDlg(); fn(); });
}
{
  const mDel = A.mDel, keyRevoke = A.keyRevoke, discOff = A.discOff, endNow = A.endNow;
  A.mDel = e => { if (!isAdm()) return; const m = D.team.find(x => x.email === e); confirmAct({ title: `Remover ${esc(m.name)} da equipe?`, body: 'A pessoa perde o acesso agora e as sessões abertas são encerradas. Fica registrado na auditoria.', label: 'Remover pessoa', fn: () => mDel(e) }); };
  A.keyRevoke = kid => { if (!isAdm()) return; const p = prodOf(S.pid), k = p.keys.find(x => x.id === kid); if (p.keys.filter(x => x.active).length <= 1) return keyRevoke(kid); confirmAct({ title: `Revogar a chave final ${k.tail}?`, body: 'Chamadas com essa chave passam a receber 401. Confira se o produto já usa a chave nova.', label: 'Revogar chave', fn: () => keyRevoke(kid) }); };
  A.discOff = v => { if (!guard()) return; confirmAct({ title: 'Remover este desconto?', body: 'As próximas cobranças voltam ao valor cheio do plano. Fica registrado na auditoria.', label: 'Remover desconto', fn: () => discOff(v) }); };
  A.endNow = sid => { if (!guard()) return; const s = subOf(sid); confirmAct({ title: 'Encerrar o acesso agora?', body: `${esc(subCust(s).name)} perde o acesso a ${esc(prodOf(s.product).name)} hoje, em vez de ${fmtFull(s.end)}. O produto é avisado.`, label: 'Encerrar agora', fn: () => endNow(sid) }); };
}

/* ===== depois de cada render: busca dentro da lista e tabelas legíveis no celular ===== */
var lastKey = '';
function countIn(el) { if (el.children.length) return; const t = el.textContent.trim(), m = t.match(/^(R\$\s)?([\d.]+)(,(\d{2}))?(.*)$/); if (!m) return; const money = !!m[1], to = money ? +(m[2].replace(/\./g, '') + (m[4] || '00')) : +m[2].replace(/\./g, ''); if (!to) return; const rest = m[5] || '', t0 = performance.now(), D = 900;
  const f = now => { const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3), v = Math.round(to * e); el.textContent = k < 1 ? (money ? brl(v) : v.toLocaleString('pt-BR')) + rest : t; if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }
function enhance() {
  const key = [S.screen, S.tab, S.ptab, S.dashboardView, S.cid, S.sid, S.pid, S.prod].join('|'), w = $('.wrap');
  if (w && key !== lastKey && !RM) { w.classList.add('enter'); [...w.children].forEach((el, i) => el.style.setProperty('--d', Math.min(i, 8))); $$('.kpi b, .dash-alert strong', w).forEach(countIn); }
  lastKey = key;
  $$('.tools').forEach(t => { const n = t.nextElementSibling; if (n && n.classList.contains('tw')) n.prepend(t); });
  $$('.tw table').forEach(tb => { const hs = $$('thead th', tb).map(th => th.textContent.trim()); $$('tbody tr', tb).forEach(tr => [...tr.children].forEach((td, i) => { if (!td.hasAttribute('colspan')) td.dataset.label = hs[i] || ''; })); });
  enhanceSelects($('#root'));
}
enhance();

/* ===== paginação (cobranças e histórico de pagamentos) ===== */
function pageOf(k, list) { S.pg ||= {}; const PG_SIZE = 10, max = Math.max(0, Math.ceil(list.length / PG_SIZE) - 1), n = Math.min(S.pg[k] || 0, max); S.pg[k] = n; return list.slice(n * PG_SIZE, n * PG_SIZE + PG_SIZE); }
function pager(k, total) {
  const PG_SIZE = 10; S.pg ||= {}; if (!total) return ''; if (total <= PG_SIZE) return `<nav class="pager" aria-label="Paginação"><span class="pg-info">Mostrando <b>${total}</b> de <b>${total}</b></span></nav>`;
  const n = S.pg[k] || 0, pages = Math.ceil(total / PG_SIZE), a = n * PG_SIZE + 1, b = Math.min(total, a + PG_SIZE - 1);
  const nums = []; for (let i = 0; i < pages; i++) if (i === 0 || i === pages - 1 || Math.abs(i - n) <= 1) nums.push(i); else if (nums[nums.length - 1] !== '…') nums.push('…');
  return `<nav class="pager" aria-label="Paginação"><span class="pg-info">Mostrando <b>${a}–${b}</b> de <b>${total}</b></span><div class="pg-btns"><button class="pg-b" data-a="pg" data-v="${k}|${n - 1}" ${n === 0 ? 'disabled' : ''} aria-label="Página anterior">${ic('chevL', 16, 2.2)}</button>${nums.map(i => i === '…' ? '<span class="pg-gap">…</span>' : `<button class="pg-b${i === n ? ' on' : ''}" data-a="pg" data-v="${k}|${i}" ${i === n ? 'aria-current="page"' : ''} aria-label="Página ${i + 1}">${i + 1}</button>`).join('')}<button class="pg-b" data-a="pg" data-v="${k}|${n + 1}" ${n >= pages - 1 ? 'disabled' : ''} aria-label="Próxima página">${ic('chevR', 16, 2.2)}</button></div></nav>`;
}
A.pg = v => { const [k, n] = v.split('|'); S.pg ||= {}; S.pg[k] = Math.max(0, +n); render(); const t = $(`.pager`)?.closest('.tw,.card'); if (t && t.getBoundingClientRect().top < 0) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); };
{ const flt = A.flt, prod = A.prod, cli = A.cliente, pick = A.pickSub;
  A.flt = (v, el) => { S.pg = {}; flt(v, el); }; A.prod = v => { S.pg = {}; prod(v); };
  A.cliente = v => { S.pg = { ...S.pg, cli: 0 }; cli(v); }; A.pickSub = v => { S.pg = { ...S.pg, cli: 0 }; pick(v); }; }

/* ===== selects próprios: mesma lista de opções em todo o painel =====
   O <select> nativo continua no DOM (valor, eventos e validações não mudam); só a aparência é trocada. */
const csClose = () => { $$('.cs-pop,.cs-veil').forEach(x => x.remove()); $$('.cs[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false')); };
function csLabel(sel) { const o = sel.options[sel.selectedIndex]; return o ? o.textContent : ''; }
function csName(sel) { return sel.getAttribute('aria-label') || (sel.id && document.querySelector(`label[for="${sel.id}"]`)?.textContent) || ''; }
function enhanceSelects(root = document) {
  $$('select:not(.cs-native)', root).forEach(sel => {
    sel.classList.add('cs-native'); sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true');
    const b = document.createElement('button'); b.type = 'button'; b.className = 'cs'; b.disabled = sel.disabled;
    b.setAttribute('role', 'combobox'); b.setAttribute('aria-haspopup', 'listbox'); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', csName(sel));
    b.innerHTML = `<span class="cs-v">${esc(csLabel(sel))}</span>${ic('updown', 15, 2.2)}`;
    sel.after(b); b._sel = sel;
    if (sel.id) { const l = document.querySelector(`label[for="${sel.id}"]`); if (l) l.addEventListener('click', e => { e.preventDefault(); b.focus(); }); }
    sel.addEventListener('change', () => { b.querySelector('.cs-v').textContent = csLabel(sel); });
  });
}
function csOpen(b) {
  const sel = b._sel, cur = sel.selectedIndex, mobile = matchMedia('(max-width:640px)').matches;
  csClose(); b.setAttribute('aria-expanded', 'true');
  const pop = document.createElement('div'); pop.className = 'cs-pop' + (mobile ? ' sheet' : ''); pop.setAttribute('role', 'listbox');
  pop.innerHTML = (mobile ? `<p class="cs-h">${esc(csName(b._sel) || 'Escolha uma opção')}</p>` : '') + [...sel.options].map((o, i) => `<button type="button" class="cs-o${i === cur ? ' on' : ''}" role="option" aria-selected="${i === cur}" data-i="${i}" ${o.disabled ? 'disabled' : ''}><span>${esc(o.textContent)}</span>${i === cur ? ic('check', 16, 2.4) : ''}</button>`).join('');
  if (mobile) { const v = document.createElement('div'); v.className = 'cs-veil'; v.addEventListener('click', csClose); document.body.append(v); }
  document.body.append(pop);
  if (!mobile) { const r = b.getBoundingClientRect(); pop.style.minWidth = Math.max(r.width, 200) + 'px'; pop.style.left = Math.min(r.left, innerWidth - pop.offsetWidth - 12) + 'px'; const h = pop.offsetHeight, below = innerHeight - r.bottom; pop.style.top = (below < h + 12 && r.top > below ? Math.max(12, r.top - h - 6) : r.bottom + 6) + 'px'; }
  pop._btn = b; (pop.querySelector('.cs-o.on') || pop.querySelector('.cs-o'))?.focus({ preventScroll: true });
  pop.querySelector('.cs-o.on')?.scrollIntoView({ block: 'nearest' });
}
function csPick(pop, i) { const b = pop._btn, sel = b._sel; csClose(); b.focus({ preventScroll: true }); if (sel.selectedIndex === i) return; sel.selectedIndex = i; b.querySelector('.cs-v').textContent = csLabel(sel); sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); }
document.addEventListener('click', e => {
  const b = e.target.closest('.cs'); if (b) { e.preventDefault(); e.stopPropagation(); b.getAttribute('aria-expanded') === 'true' ? csClose() : csOpen(b); return; }
  const o = e.target.closest('.cs-o'); if (o) { e.preventDefault(); e.stopPropagation(); csPick(o.closest('.cs-pop'), +o.dataset.i); return; }
  if (!e.target.closest('.cs-pop')) csClose();
}, true);
document.addEventListener('keydown', e => {
  const b = e.target.closest?.('.cs'); if (b && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); csOpen(b); return; }
  const pop = e.target.closest?.('.cs-pop'); if (!pop) return;
  const os = $$('.cs-o:not(:disabled)', pop), k = os.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); os[Math.min(os.length - 1, k + 1)]?.focus(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); os[Math.max(0, k - 1)]?.focus(); }
  else if (e.key === 'Home') { e.preventDefault(); os[0]?.focus(); } else if (e.key === 'End') { e.preventDefault(); os.at(-1)?.focus(); }
  else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); const bt = pop._btn; csClose(); bt.focus(); e.stopPropagation(); }
  else if (e.key.length === 1) { const ch = e.key.toLowerCase(), nx = os.slice(k + 1).concat(os.slice(0, k + 1)).find(x => x.textContent.trim().toLowerCase().startsWith(ch)); nx?.focus(); }
}, true);
addEventListener('resize', csClose); addEventListener('scroll', e => { if (!e.target.closest?.('.cs-pop') && !$('.cs-pop.sheet')) csClose(); }, { passive: true, capture: true });
{ const dlg0 = dlg; dlg = (html, wide) => { const d = dlg0(html, wide); enhanceSelects(d); return d; }; }
enhanceSelects($('#root'));

/* ===== busca rápida (Cmd/Ctrl + K), mesmo desenho do Alva Web ===== */
let cmdSel = 0, cmdItems = [];
function cmdEl() {
  let el = $('#scrim'); if (el) return el;
  el = document.createElement('div'); el.id = 'scrim'; el.className = 'scrim'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Buscar');
  el.innerHTML = `<div class="cmd"><div class="in">${ic('search', 18)}<input id="cq" placeholder="Buscar clientes, telas ou ações" autocomplete="off" aria-controls="cres"><kbd>esc</kbd></div><div class="res" id="cres" role="listbox"></div><div class="cft"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>↵</kbd> abrir</span><span><kbd>esc</kbd> fechar</span></div></div>`;
  document.body.append(el);
  el.addEventListener('click', e => { if (e.target === el) cmdClose(); const r = e.target.closest('.ri'); if (r) cmdPick(+r.dataset.i); });
  el.addEventListener('mousemove', e => { const r = e.target.closest('.ri'); if (r && +r.dataset.i !== cmdSel) { cmdSel = +r.dataset.i; $$('.ri', el).forEach(b => b.classList.toggle('sel', +b.dataset.i === cmdSel)); } });
  $('#cq', el).addEventListener('input', e => cmdList(e.target.value));
  return el;
}
const norm = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function cmdOpen() { if (!S.admin) return; A.navClose(); csClose(); closeMenu(); const el = cmdEl(); el.classList.add('open'); const i = $('#cq'); i.value = ''; cmdList(''); setTimeout(() => i.focus(), 30); }
function cmdClose() { $('#scrim')?.classList.remove('open'); }
function cmdList(q0) {
  const q = norm(q0.trim());
  const people = q ? D.customers.map(c => ({ c, subs: custSubs(c.id).filter(s => scopeOf().includes(s.product)) })).filter(x => x.subs.length && norm(x.c.name + ' ' + x.c.email).includes(q)).slice(0, 6).map(({ c, subs }) => ({ k: 'cli', id: c.id, sid: subs[0].id, label: c.name, sub: subs.map(s => prodOf(s.product).name).join(' · ') })) : [];
  const prods = visProd().filter(p => !q || norm(p.name + ' ' + p.code).includes(q)).map(p => ({ k: 'prod', id: p.code, icon: 'grid', label: p.name, sub: 'Produto' }));
  const areas = NAV.filter(n => !q || norm(n[2] + ' ' + (NAVG.find(g => g[1].includes(n[0]))?.[0] || '')).includes(q)).map(n => ({ k: 'go', id: n[0], icon: n[1], label: n[2], sub: NAVG.find(g => g[1].includes(n[0]))?.[0] }));
  const acts = [['vNew', 'percent', 'Novo voucher', canWrite()], ['plNew', 'tag', 'Novo plano', canWrite()], ['mNew', 'user', 'Adicionar pessoa à equipe', isAdm()], ['expCsv', 'download', 'Exportar relatório CSV', true], ['theme', document.documentElement.dataset.theme === 'noite' ? 'sun' : 'moon', document.documentElement.dataset.theme === 'noite' ? 'Usar tema claro' : 'Usar tema escuro', true]].filter(a => a[3] && (!q || norm(a[2]).includes(q))).map(a => ({ k: 'act', id: a[0], icon: a[1], label: a[2], sub: 'Ação' }));
  if (q) prods.splice(3);
  cmdItems = [...people, ...areas, ...prods, ...acts]; cmdSel = 0;
  const sec = (t, arr) => arr.length ? `<div class="pl">${t}</div>${arr.map(it => { const j = cmdItems.indexOf(it); return `<button class="ri${j === cmdSel ? ' sel' : ''}" data-i="${j}" role="option">${it.k === 'cli' ? `<span class="av">${esc(it.label.split(' ').map(w => w[0]).slice(0, 2).join(''))}</span>` : ic(it.icon, 18, 1.9)}<span class="rl">${esc(it.label)}</span>${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</button>`; }).join('')}` : '';
  $('#cres').innerHTML = cmdItems.length ? sec('Clientes', people) + sec('Ir para', areas) + sec('Produtos', prods) + sec('Ações', acts) : `<div class="nores">Nada encontrado para “${esc(q0)}”.</div>`;
}
function cmdPick(i) { const it = cmdItems[i]; if (!it) return; cmdClose();
  if (it.k === 'go') A.go(it.id); else if (it.k === 'cli') A.cliente(`${it.id}|resumo|${it.sid}`); else if (it.k === 'prod') A.produto(it.id); else A[it.id]?.(); }
function cmdMove(d) { if (!cmdItems.length) return; cmdSel = (cmdSel + d + cmdItems.length) % cmdItems.length; $$('#cres .ri').forEach(b => b.classList.toggle('sel', +b.dataset.i === cmdSel)); $(`#cres .ri[data-i="${cmdSel}"]`)?.scrollIntoView({ block: 'nearest' }); }
A.cmdOpen = cmdOpen;
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#scrim.open') ? cmdClose() : cmdOpen(); return; }
  if (!$('#scrim.open')) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); cmdMove(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); cmdMove(-1); }
  else if (e.key === 'Enter') { e.preventDefault(); cmdPick(cmdSel); } else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cmdClose(); }
}, true);

/* ===== menu da conta (mesmo padrão do Alva Web) ===== */
A.whoMenu = (v, el) => {
  const open = el.getAttribute('aria-expanded') === 'true'; closeMenu(); $$('.who[aria-expanded]').forEach(x => x.setAttribute('aria-expanded', 'false')); if (open) return;
  const dark = document.documentElement.dataset.theme === 'noite', sc = S.admin.scope === 'all' ? 'Todos os produtos' : S.admin.scope.map(c => prodOf(c).name).join(', ');
  const m = document.createElement('div'); m.className = 'menu who-menu'; m.setAttribute('role', 'menu');
  m.innerHTML = `<div class="wm-h"><span class="av">${esc(el.querySelector('.av').textContent)}</span><span><b>${esc(S.admin.name)}</b><small>${esc(S.admin.email)}</small></span></div><dl class="wm-kv"><div><dt>Permissão</dt><dd>${esc(S.admin.role)}</dd></div><div><dt>Produtos</dt><dd>${esc(sc)}</dd></div></dl><button class="mi" role="menuitem" data-a="theme">${ic(dark ? 'sun' : 'moon', 17, 2)}${dark ? 'Usar tema claro' : 'Usar tema escuro'}</button><button class="mi dng" role="menuitem" data-a="logout">${ic('logout', 17, 2)}Sair</button>`;
  const w = el.closest('.who-w'); w.append(m); el.setAttribute('aria-expanded', 'true'); m.querySelector('.mi')?.focus({ preventScroll: true });
};
document.addEventListener('click', e => { if (!e.target.closest('.who-w')) $$('.who[aria-expanded="true"]').forEach(x => { x.setAttribute('aria-expanded', 'false'); x.parentElement.querySelector('.who-menu')?.remove(); }); }, true);

/* ===== tooltip do gráfico de área: o mês mais próximo do cursor ou do toque ===== */
function rcHover(w, cx) {
  const pts = JSON.parse(w.dataset.pts), r = w.querySelector('svg').getBoundingClientRect(), fx = (cx - r.left) / r.width;
  let i = 0; pts.forEach((p, j) => { if (Math.abs(p[2] - fx) < Math.abs(pts[i][2] - fx)) i = j; });
  const p = pts[i], tip = w.querySelector('.tip'), g = w.querySelector('.guide');
  w.querySelectorAll('.dot').forEach(d => d.classList.toggle('on', +d.dataset.i === i));
  g.setAttribute('x1', p[2] * 520); g.setAttribute('x2', p[2] * 520); g.classList.add('on');
  tip.innerHTML = `<small>${esc(p[0])}${p[4] ? ' · ' + p[4] : ''}</small><b>${p[1]}</b>`; tip.hidden = false;
  const left = p[2] * r.width, top = p[3] * r.height; tip.style.left = Math.min(r.width - tip.offsetWidth / 2, Math.max(tip.offsetWidth / 2, left)) + 'px'; tip.style.top = top + 'px';
}
function rcOut(w) { w.querySelector('.tip').hidden = true; w.querySelector('.guide').classList.remove('on'); w.querySelectorAll('.dot.on').forEach(d => d.classList.remove('on')); }
document.addEventListener('pointermove', e => { const w = e.target.closest?.('.rcw'); $$('.rcw').forEach(x => { if (x !== w && !x.querySelector('.tip').hidden) rcOut(x); }); if (w) rcHover(w, e.clientX); });
document.addEventListener('pointerleave', e => { if (e.target.classList?.contains('rcw')) rcOut(e.target); }, true);

/* ===== filtro de produto sempre visível, com saída para todos os produtos ===== */
A.prodAll = () => A.prod('all');
A.prodView = v => { A.prod(v); window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); };
