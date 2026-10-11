/* VEM · dados fictícios complementares: cupons por pessoa, equipes, quadros, caixas, comunicação,
   perfis e permissões, recursos habilitados, super usuários, auditoria e contas de entrada. */
import { EVENTS, ORGS, STAFF, TODAY, evOf, dBR } from './data.js';

/* ---------- cupons: tipo (percentual ou valor) e quem pode usar (qualquer pessoa ou uma pessoa por e-mail) ---------- */
EVENTS.forEach(e => e.coupons.forEach(c => { c.mode = c.mode || 'liberado'; c.email = c.email || ''; }));
evOf('e3').coupons.push({ code: 'BOLSA-HELENA', type: 'val', v: 180, exp: '', uses: 1, mode: 'especifico', email: 'helena.costa@email.com' });
/* o cupom vale para o comprador? A regra é a mesma do voucher do Alva. Devolve o motivo, ou '' se vale. */
export const couponOk = (c, email) => !c ? 'Cupom não encontrado' : (c.exp && c.exp < TODAY) ? 'Cupom expirado em ' + dBR(c.exp) : (c.mode === 'especifico' && c.email && String(email).toLowerCase() !== c.email.toLowerCase()) ? 'Este cupom é de outra pessoa' : '';

/* ---------- equipes do evento (cada uma com líder), quadros, caixas e comunicação ---------- */
export const TEAMS = [
  { id: 'tm1', ev: 'e1', n: 'Portaria', leader: 's1', members: ['s2', 's3'], can: 'checkin' },
  { id: 'tm2', ev: 'e1', n: 'Recepção', leader: 's3', members: [], can: 'none' },
  { id: 'tm3', ev: 'e1', n: 'Som e iluminação', leader: 's1', members: [], can: 'none' },
  { id: 'tm4', ev: 'e1', n: 'Alimentação', leader: 's2', members: [], can: 'none' },
  { id: 'tm5', ev: 'e3', n: 'Portaria', leader: 's1', members: ['s3'], can: 'checkin' },
  { id: 'tm6', ev: 'e5', n: 'Portaria', leader: 's4', members: ['s5'], can: 'checkin' },
  { id: 'tm7', ev: 'e5', n: 'Apoio ao instrutor', leader: 's5', members: [], can: 'none' },
  { id: 'tm8', ev: 'e6', n: 'Portaria', leader: 's4', members: ['s5'], can: 'checkin' },
  { id: 'tm9', ev: 'e6', n: 'Segurança', leader: 's5', members: [], can: 'none' },
];
export const staffOf = id => STAFF.find(s => s.id === id);
export const BOARDS = [
  { id: 'b1', ev: 'e1', n: 'Preparação do retiro', tasks: [
    { id: 'k1', col: 0, t: 'Confirmar o ônibus de ida e volta', who: 'Rafael Pereira', due: '2026-10-14' }, { id: 'k2', col: 1, t: 'Montar o mapa dos quartos', who: 'Juliana Reis', due: '2026-10-16' },
    { id: 'k3', col: 1, t: 'Imprimir as pulseiras da portaria', who: 'Diego Martins', due: '2026-10-16' }, { id: 'k4', col: 2, t: 'Contratar a equipe de som', who: 'Rafael Pereira', due: '2026-10-10' }, { id: 'k5', col: 2, t: 'Fechar o cardápio com a cozinha', who: 'Juliana Reis', due: '2026-10-12' }] },
  { id: 'b2', ev: 'e5', n: 'Logística do workshop', tasks: [
    { id: 'k6', col: 0, t: 'Reservar o estúdio para o dia todo', who: 'Camila Ribeiro', due: '2026-10-20' }, { id: 'k7', col: 1, t: 'Imprimir as apostilas', who: 'Tiago Nunes', due: '2026-10-22' }, { id: 'k8', col: 2, t: 'Definir o roteiro das ruas', who: 'Camila Ribeiro', due: '2026-10-15' }] },
];
export const CASH = [
  { id: 'cx1', ev: 'e1', n: 'Caixa principal', main: true, st: 'aberto', entries: [
    { id: 'l1', t: 'in', v: 5000, d: '2026-10-01', desc: 'Verba da igreja para o retiro', cat: 'Aporte', by: 'Rafael Pereira' }, { id: 'l2', t: 'out', v: 2800, d: '2026-10-08', desc: 'Sinal da chácara', cat: 'Local', by: 'Rafael Pereira' },
    { id: 'l3', t: 'out', v: 640, d: '2026-10-12', desc: 'Material de papelaria e pulseiras', cat: 'Material', by: 'Diego Martins' }, { id: 'l4', t: 'in', v: 900, d: '2026-10-13', desc: 'Doações para bolsas', cat: 'Doação', by: 'Juliana Reis' },
    { id: 'l9', t: 'out', v: 1500, d: '2026-10-14', desc: 'Aporte para Alimentação', cat: 'Aporte', by: 'Rafael Pereira', xfer: true }] },
  { id: 'cx2', ev: 'e1', n: 'Alimentação', main: false, st: 'aberto', entries: [
    { id: 'l5', t: 'in', v: 1500, d: '2026-10-14', desc: 'Aporte do Caixa principal', cat: 'Aporte', by: 'Rafael Pereira', xfer: true }, { id: 'l6', t: 'out', v: 420, d: '2026-10-15', desc: 'Compras do mercado', cat: 'Alimentação', by: 'Juliana Reis' }] },
  { id: 'cx3', ev: 'e5', n: 'Caixa principal', main: true, st: 'aberto', entries: [
    { id: 'l7', t: 'in', v: 800, d: '2026-10-05', desc: 'Capital inicial', cat: 'Aporte', by: 'Marina Duarte' }, { id: 'l8', t: 'out', v: 350, d: '2026-10-09', desc: 'Aluguel de equipamentos', cat: 'Equipamento', by: 'Camila Ribeiro' }] },
];
export const cashBal = c => c.entries.reduce((a, l) => a + (l.t === 'in' ? l.v : -l.v), 0);
export const PUSHES = [
  { id: 'n1', ev: 'e1', t: 'O retiro começa hoje!', msg: 'Chegada a partir das 8h na Chácara Alva. Leve o QR Code do ingresso.', aud: 'Todos os inscritos', at: '2026-10-17 07:00', st: 'enviado', n: 70 },
  { id: 'n2', ev: 'e1', t: 'Falta pouco para o retiro', msg: 'Confira o que levar e o horário de saída do ônibus.', aud: 'Todos os inscritos', at: '2026-10-15 18:00', st: 'enviado', n: 68 },
  { id: 'n3', ev: 'e5', t: 'Seu pagamento ainda está pendente', msg: 'Conclua o pagamento para liberar o QR Code do workshop.', aud: 'Pagamento pendente', at: '2026-10-16 10:00', st: 'enviado', n: 4 },
  { id: 'n4', ev: 'e6', t: 'Festival Gospel: ingressos com 20% de desconto', msg: 'Use o cupom FESTIVAL20 até 28/10.', aud: 'Todos os inscritos', at: '2026-10-24 09:00', st: 'agendado', n: 0 },
];

/* ---------- administração do organizador: perfis, usuários e permissões ---------- */
export const AREAS = [['eventos', 'Eventos e ingressos'], ['inscricoes', 'Inscrições e check-in'], ['financeiro', 'Financeiro'], ['equipe', 'Equipes do evento'], ['comunicacao', 'Comunicação'], ['config', 'Organizador e recebimento']];
export const LEVELS = [['none', 'Sem acesso'], ['view', 'Ver'], ['edit', 'Editar'], ['admin', 'Administrar']];
export const PERFIS = [
  { id: 'p1', n: 'Administrador', desc: 'Tudo, inclusive usuários, perfis e configuração.', locked: true, perms: { eventos: 'admin', inscricoes: 'admin', financeiro: 'admin', equipe: 'admin', comunicacao: 'admin', config: 'admin' } },
  { id: 'p2', n: 'Financeiro', desc: 'Vê vendas e repasses; não mexe nos eventos.', perms: { eventos: 'view', inscricoes: 'view', financeiro: 'admin', equipe: 'none', comunicacao: 'none', config: 'view' } },
  { id: 'p3', n: 'Coordenador de eventos', desc: 'Cria e edita eventos, ingressos e equipes.', perms: { eventos: 'edit', inscricoes: 'edit', financeiro: 'view', equipe: 'edit', comunicacao: 'edit', config: 'none' } },
  { id: 'p4', n: 'Supervisor de portaria', desc: 'Acompanha o check-in e a equipe da portaria.', perms: { eventos: 'view', inscricoes: 'edit', financeiro: 'none', equipe: 'edit', comunicacao: 'none', config: 'none' } },
];
export const ORG_USERS = [
  { id: 'u1', org: 'o3', n: 'Marina Duarte', e: 'marina@studiovida.com.br', perfil: 'p1', st: 'ativo', last: 'hoje' }, { id: 'u2', org: 'o3', n: 'Camila Ribeiro', e: 'camila@studiovida.com.br', perfil: 'p3', st: 'ativo', last: 'ontem' },
  { id: 'u3', org: 'o3', n: 'Paulo Mendes', e: 'paulo@studiovida.com.br', perfil: 'p2', st: 'ativo', last: 'há 3 dias' }, { id: 'u4', org: 'o3', n: 'Renata Gil', e: 'renata@studiovida.com.br', perfil: 'p3', st: 'convidado', last: '—' },
  { id: 'u5', org: 'o1', n: 'Rafael Pereira', e: 'financeiro@alvasede.org', perfil: 'p1', st: 'ativo', last: 'hoje' }, { id: 'u6', org: 'o1', n: 'Ana Clara Lima', e: 'anaclara@alvasede.org', perfil: 'p3', st: 'ativo', last: 'ontem' }, { id: 'u7', org: 'o1', n: 'Larissa Pires', e: 'larissa@alvasede.org', perfil: 'p4', st: 'ativo', last: 'há 2 dias' },
  { id: 'u8', org: 'o2', n: 'Ana Clara Lima', e: 'norte@alva.org', perfil: 'p1', st: 'ativo', last: 'hoje' }, { id: 'u9', org: 'o4', n: 'Bruno Tavares', e: 'bruno@conecta.com.br', perfil: 'p1', st: 'ativo', last: 'hoje' },
];
export const FEATURES = [
  { k: 'marketplace', n: 'Aparecer no Descobrir', desc: 'Eventos publicados aparecem no app e no site do VEM.' }, { k: 'banners', n: 'Banners no Descobrir', desc: 'O organizador pode destacar eventos no topo do app.' },
  { k: 'push', n: 'Push para inscritos', desc: 'Enviar avisos às pessoas inscritas pelo app.' }, { k: 'totem', n: 'Totem de autoatendimento', desc: 'Modo totem para a entrada do evento.' },
  { k: 'quadros', n: 'Quadros de tarefas', desc: 'Quadros de tarefas dentro do evento.' }, { k: 'caixas', n: 'Caixas do evento', desc: 'Controle de dinheiro do evento em caixas.' },
  { k: 'cupons', n: 'Cupons e vouchers', desc: 'Descontos por percentual, valor ou pessoa.' }, { k: 'paginapublica', n: 'Página pública do organizador', desc: 'vem.app/o/nome-do-organizador, com a marca e os eventos.' },
];
export const FLAGS = {}; ORGS.forEach(o => { FLAGS[o.id] = {}; FEATURES.forEach(f => { FLAGS[o.id][f.k] = !(o.id === 'o4' && ['push', 'banners', 'totem'].includes(f.k)); }); });
export const SUPERS = [{ id: 'su1', n: 'Tiago Borges', e: 'tiago@alva.app', role: 'SuperAdmin', last: 'hoje' }, { id: 'su2', n: 'Luana Pires', e: 'luana@alva.app', role: 'SuperOperator', last: 'ontem' }, { id: 'su3', n: 'Heitor Alves', e: 'heitor@alva.app', role: 'SuperOperator', last: 'há 4 dias' }];
export const AUDIT = [
  { at: '2026-10-17 07:02', who: 'Rafael Pereira', what: 'Enviou um push para 70 inscritos', ref: 'Retiro de Jovens 2026', org: 'o1' }, { at: '2026-10-16 17:40', who: 'Marina Duarte', what: 'Pausou as vendas do Encontro de Casais Aliança', ref: 'Encontro de Casais Aliança', org: 'o3' },
  { at: '2026-10-16 11:12', who: 'Camila Ribeiro', what: 'Criou o cupom FOTO15', ref: 'Workshop de Fotografia Urbana', org: 'o3' }, { at: '2026-10-15 09:30', who: 'Tiago Borges', what: 'Desativou o Totem para Conecta Treinamentos', ref: 'Recursos habilitados', org: 'o4' },
  { at: '2026-10-14 16:05', who: 'Luana Pires', what: 'Consultou dados de uma inscrição (LGPD)', ref: 'Workshop de Fotografia Urbana', org: 'o3' }, { at: '2026-10-14 10:21', who: 'Ana Clara Lima', what: 'Mudou o perfil de Larissa Pires para Supervisor de portaria', ref: 'Usuários e permissões', org: 'o1' },
  { at: '2026-10-13 15:48', who: 'Marina Duarte', what: 'Reembolsou uma inscrição', ref: 'Workshop de Fotografia Urbana', org: 'o3' }, { at: '2026-10-12 08:00', who: 'Sistema', what: 'Repasse concluído', ref: 'Conferência Missões · R$ 5.687,20', org: 'o1' },
];
/* contas de entrada: cada e-mail abre um perfil (a mesma pessoa pode ter mais de um organizador) */
export const ACCOUNTS = [
  { e: 'marina@studiovida.com.br', n: 'Marina Duarte', profile: 'org', orgs: ['o3'] }, { e: 'financeiro@alvasede.org', n: 'Rafael Pereira', profile: 'org', orgs: ['o1', 'o2'] },
  { e: 'bruno@conecta.com.br', n: 'Bruno Tavares', profile: 'org', orgs: ['o4'] }, { e: 'ana.costa@email.com', n: 'Ana Costa', profile: 'buyer', orgs: [] },
  { e: 'juliana.reis@email.com', n: 'Juliana Reis', profile: 'staff', orgs: ['o1'] }, { e: 'tiago@alva.app', n: 'Tiago Borges', profile: 'super', orgs: [] },
];
export const INVITES = [{ e: 'renata@studiovida.com.br', n: 'Renata Gil', code: '123456', profile: 'org', orgs: ['o3'] }];
