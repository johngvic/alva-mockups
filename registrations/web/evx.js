/* VEM · web · evento: equipes (cada uma com líder), comunicação (push e banner), quadros de tarefas e caixas.
   O Alva Web tem as mesmas abas de Quadros e Caixas no evento. */
import { $, $$, esc, ic, initials } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { TEAMS, BOARDS, CASH, PUSHES, cashBal, staffOf } from '../shared/data2.js';
import { S, A, toast, val, fld, ferr, fclear, dlg, closeDlg, confirmAct, chip, note, kpis, prog, empty, render, orgOf } from './core.js';
import { avatar } from './people.js';

const cur = () => D.evOf(S.evId);
const ro = e => D.orgOf(e.org).via === 'alva';
const orgStaff = () => D.STAFF.filter(s => s.org === S.org || s.org === (cur() || {}).org);
const money = D.money;

export const evxTabList = (e, feat) => [
  ['equipe', 'Equipes', TEAMS.filter(t => t.ev === e.id).length],
  ...(feat('push') || feat('banners') ? [['comunicacao', 'Comunicação', PUSHES.filter(p => p.ev === e.id).length]] : []),
  ...(feat('quadros') ? [['quadros', 'Quadros', BOARDS.filter(b => b.ev === e.id).length]] : []),
  ...(feat('caixas') ? [['caixas', 'Caixas', CASH.filter(c => c.ev === e.id).length]] : []),
];
export const evxTabs = { equipe: tEquipes, comunicacao: tCom, quadros: tQuadros, caixas: tCaixas };

/* ---------- equipes ---------- */
export function syncStaff() { D.STAFF.forEach(s => { s.events = [...new Set(TEAMS.filter(t => t.can === 'checkin' && (t.leader === s.id || t.members.includes(s.id))).map(t => t.ev))]; }); }
function tEquipes(e) {
  const l = TEAMS.filter(t => t.ev === e.id);
  return note('scan', 'Cada equipe tem um <b>líder</b>. Quem está numa equipe com <b>check-in</b> faz a leitura de QR no app do VEM. As igrejas também usam estas equipes: o Alva não cria staff.')
    + `<div class="sh" style="margin-bottom:12px"><h2 style="margin:0;font:600 16px var(--font-display)">Equipes do evento</h2><button class="btn sec sm" data-a="tmNew">${ic('plus', 14, 2.2)}Nova equipe</button></div>`
    + (l.length ? `<div class="tmg">${l.map(t => { const ld = staffOf(t.leader), mem = t.members.map(staffOf).filter(Boolean); return `<article class="card tm"><div class="tm-h"><span class="tm-i">${ic(t.can === 'checkin' ? 'scan' : 'users', 18, 1.9)}</span><span class="grow"><b>${esc(t.n)}</b>${t.can === 'checkin' ? '<small>Faz o check-in no app</small>' : '<small>Sem acesso ao check-in</small>'}</span><button class="ibtn sm" data-a="tmDel" data-v="${t.id}" aria-label="Excluir equipe">${ic('trash', 14, 2)}</button></div>
    <div class="tm-l">${ld ? `${avatar(ld.n)}<span class="grow"><b>${esc(ld.n)}</b><small>${esc(ld.e)}</small></span>${chip('transf', 'Líder')}` : '<span class="mute">Sem líder</span>'}</div>
    ${mem.length ? `<ul class="tm-m">${mem.map(m => `<li>${avatar(m.n)}<span class="grow"><b>${esc(m.n)}</b><small>${esc(m.e)}</small></span><button class="ibtn sm" data-a="tmRm" data-v="${t.id}|${m.id}" aria-label="Tirar ${esc(m.n)}">${ic('x', 13, 2)}</button></li>`).join('')}</ul>` : '<p class="foot" style="margin:10px 0 0">Sem outras pessoas.</p>'}
    <div class="tm-f"><button class="btn sec sm" data-a="tmAdd" data-v="${t.id}">${ic('plus', 13, 2.2)}Adicionar pessoa</button><button class="btn ghost sm" data-a="tmEdit" data-v="${t.id}">Editar equipe</button></div></article>`; }).join('')}</div>` : empty('Nenhuma equipe ainda. Crie a portaria, o som, a recepção…'));
}
const personOpts = (ex = []) => orgStaff().filter(s => !ex.includes(s.id)).map(s => [s.id, `${s.n} · ${s.e}`]);
A.tmNew = () => tmDlg();
A.tmEdit = v => tmDlg(v);
function tmDlg(id) {
  const e = cur(), t = id ? TEAMS.find(x => x.id === id) : null, names = ['Portaria', 'Recepção', 'Som e iluminação', 'Alimentação', 'Segurança', 'Credenciamento', 'Apoio'];
  const d = dlg(`<h2>${t ? 'Editar equipe' : 'Nova equipe'}</h2><p class="lede">${esc(e.t)}</p>${fld('tN', 'Nome da equipe', { v: t ? t.n : '', ph: 'Ex.: Recepção' })}<div class="opts2" style="margin:-4px 0 12px;flex-direction:row;flex-wrap:wrap">${names.map(n => `<button type="button" class="chipf" data-nm="${n}">${n}</button>`).join('')}</div>
   ${fld('tL', 'Líder da equipe', { opts: [['', 'Escolha uma pessoa'], ...personOpts(), ['__new', 'Convidar uma pessoa nova…']], v: t ? t.leader : '' })}<div id="tNew" hidden><div class="fgrid2">${fld('tNn', 'Nome da pessoa')}${fld('tNe', 'E-mail', { type: 'email' })}</div></div>
   <div class="fld"><label class="chk2"><input type="checkbox" id="tC" ${!t || t.can === 'checkin' ? 'checked' : ''}><span>Esta equipe faz o <b>check-in</b> no app do VEM</span></label></div>
   <div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="tGo">${t ? 'Salvar' : 'Criar equipe'}</button></div>`);
  d.addEventListener('click', ev => { const b = ev.target.closest('[data-nm]'); if (b) $('#tN', d).value = b.dataset.nm; });
  $('#tL', d).addEventListener('change', () => { $('#tNew', d).hidden = val('tL') !== '__new'; });
  $('#tGo', d).addEventListener('click', () => {
    fclear(); const n = val('tN'); if (!n) return ferr('tN', 'Informe o nome da equipe'); if (TEAMS.some(x => x.ev === e.id && x !== t && x.n.toLowerCase() === n.toLowerCase())) return ferr('tN', 'Já existe uma equipe com esse nome');
    let lead = val('tL'); if (!lead) return ferr('tL', 'Escolha o líder da equipe');
    if (lead === '__new') { if (!val('tNn')) return ferr('tNn', 'Informe o nome'); if (!/^\S+@\S+\.\S+$/.test(val('tNe'))) return ferr('tNe', 'E-mail inválido'); const p = { id: 's' + Date.now(), n: val('tNn'), e: val('tNe'), org: e.org, role: 'Portaria', events: [], last: 'convite enviado' }; D.STAFF.push(p); lead = p.id; }
    const can = $('#tC', d).checked ? 'checkin' : 'none';
    if (t) Object.assign(t, { n, leader: lead, can }); else TEAMS.push({ id: 'tm' + Date.now(), ev: e.id, n, leader: lead, members: [], can });
    syncStaff(); closeDlg(); render(true); toast(t ? 'Equipe atualizada' : 'Equipe criada');
  });
}
A.tmDel = v => { const t = TEAMS.find(x => x.id === v); confirmAct({ title: `Excluir a equipe ${esc(t.n)}?`, body: 'As pessoas perdem o acesso que vinha desta equipe.', label: 'Excluir equipe', fn: () => { TEAMS.splice(TEAMS.indexOf(t), 1); syncStaff(); render(true); toast('Equipe excluída'); } }); };
A.tmRm = v => { const [tid, pid] = v.split('|'), t = TEAMS.find(x => x.id === tid); t.members = t.members.filter(x => x !== pid); syncStaff(); render(true); toast('Pessoa removida da equipe'); };
A.tmAdd = v => {
  const t = TEAMS.find(x => x.id === v), opts = personOpts([t.leader, ...t.members]);
  const d = dlg(`<h2>Adicionar pessoa</h2><p class="lede">Equipe ${esc(t.n)}${t.can === 'checkin' ? ' · usa o app do VEM para o check-in' : ''}</p>${fld('mP', 'Pessoa', { opts: [['', 'Escolha uma pessoa'], ...opts, ['__new', 'Convidar uma pessoa nova…']] })}<div id="mNew" hidden><div class="fgrid2">${fld('mN', 'Nome')}${fld('mE', 'E-mail', { type: 'email' })}</div><p class="foot">A pessoa recebe um convite por e-mail para entrar no app do VEM.</p></div><div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="mGo">Adicionar</button></div>`);
  $('#mP', d).addEventListener('change', () => { $('#mNew', d).hidden = val('mP') !== '__new'; });
  $('#mGo', d).addEventListener('click', () => { fclear(); let p = val('mP'); if (!p) return ferr('mP', 'Escolha uma pessoa');
    if (p === '__new') { if (!val('mN')) return ferr('mN', 'Informe o nome'); if (!/^\S+@\S+\.\S+$/.test(val('mE'))) return ferr('mE', 'E-mail inválido'); const np = { id: 's' + Date.now(), n: val('mN'), e: val('mE'), org: cur().org, role: 'Portaria', events: [], last: 'convite enviado' }; D.STAFF.push(np); p = np.id; }
    t.members.push(p); syncStaff(); closeDlg(); render(true); toast('Pessoa adicionada à equipe'); });
};

/* ---------- comunicação: push e banner ---------- */
/* Lembretes automáticos: um push a 30, 15, 7 e 1 dia do evento. O texto aceita {evento}, {data}, {hora} e {local}. */
const REM_DAYS = [30, 15, 7, 1];
const REM_DEF = {
  30: { t: 'Faltam 30 dias!', msg: 'Guarde a data: {evento} é {data}, {local}. Seu ingresso está em Meus ingressos.' },
  15: { t: 'Faltam 15 dias', msg: '{evento} é {data}, às {hora}, {local}. Já deu para sentir o clima!' },
  7: { t: 'Falta uma semana', msg: '{evento} é {data}. Confira o seu ingresso e o QR Code em Meus ingressos.' },
  1: { t: 'É amanhã!', msg: '{evento}, às {hora}, {local}. Leve o QR Code do ingresso: ele funciona sem internet.' },
};
const remOf = e => { if (!e.reminders) { e.reminders = {}; REM_DAYS.forEach(n => { e.reminders[n] = { on: true, t: REM_DEF[n].t, msg: REM_DEF[n].msg }; }); } return e.reminders; };
const fillTpl = (e, x) => x.replace(/\{evento\}/g, e.t).replace(/\{data\}/g, D.whenOf(e)).replace(/\{hora\}/g, e.time || '').replace(/\{local\}/g, e.venue || e.city);
const remDate = (e, n) => D.addDays(e.d, -n);
const dayWord = n => n === 1 ? 'um dia antes' : n + ' dias antes';
const MODELS = [['r30', '30 dias antes', 30], ['r15', '15 dias antes', 15], ['r7', '7 dias antes', 7], ['r1', 'Um dia antes', 1], ['hor', 'Mudança de horário', 0], ['pend', 'Pagamento pendente', 0]];
const MODEL_TXT = { hor: { t: 'Mudou o horário', msg: 'Atenção: o horário de {evento} foi alterado. Veja o novo horário na página do evento.' }, pend: { t: 'Falta o pagamento', msg: 'Sua inscrição em {evento} ainda não foi paga. Pague para liberar os seus QR Codes.' } };
function tCom(e) {
  const pushes = PUSHES.filter(p => p.ev === e.id), b = e.banner || { on: false, title: e.t, line: '' }, f = k => !(window.__noFeat && window.__noFeat[k]);
  const live = D.ordersOf(e).filter(o => o.st === 'pago' || o.st === 'pendente');
  const rem = remOf(e), rascunho = e.st === 'rascunho';
  const remCard = `<section class="card" style="margin-bottom:16px"><div class="sh"><h2>Lembretes automáticos</h2></div><p class="foot">O VEM envia sozinho, às 9h, um aviso aos inscritos nestes momentos antes do evento. Edite o texto ou desligue o que não quiser.</p>${rascunho ? note('alert', 'Os lembretes só começam quando o evento for publicado.', 'warn') : ''}
   <ul class="pushl">${REM_DAYS.map(n => { const r = rem[n], dt = remDate(e, n), past = dt < D.TODAY; return `<li><span class="pi">${ic('bell', 16, 2)}</span><span class="grow"><b>${dayWord(n)[0].toUpperCase() + dayWord(n).slice(1)} · ${esc(r.t)}</b><small>${esc(fillTpl(e, r.msg))}</small><small>${!r.on ? 'Desligado' : past ? 'Já passou (' + D.dBR(dt).slice(0, 5) + ')' : 'Sai em ' + D.dBR(dt).slice(0, 5) + ' às 9h'}</small></span>${r.on ? (past ? chip('neutro', 'Já passou') : chip('pendente', 'Agendado')) : chip('neutro', 'Desligado')}<button class="btn ghost sm" data-a="remEdit" data-v="${n}">Editar</button><label class="tog"><input type="checkbox" data-a="remTog" data-v="${n}" ${r.on ? 'checked' : ''} aria-label="Ligar lembrete ${dayWord(n)}"><span class="sw"></span></label></li>`; }).join('')}</ul></section>`;
  return remCard + `<div class="g2"><section class="card"><div class="sh"><h2>Push para os inscritos</h2><button class="btn sec sm" data-a="pushNew">${ic('plus', 14, 2.2)}Novo push</button></div><p class="foot">Avisos no celular de quem se inscreveu pelo app: "o evento está chegando", mudança de horário, pagamento pendente.</p>
   ${pushes.length ? `<ul class="pushl">${pushes.map(p => `<li><span class="pi">${ic('bell', 16, 2)}</span><span class="grow"><b>${esc(p.t)}</b><small>${esc(p.msg)}</small><small>${esc(p.aud)} · ${p.at.replace(/-/g, '/').slice(5)}${p.st === 'enviado' ? ` · ${p.n} ${p.n === 1 ? 'pessoa' : 'pessoas'}` : ''}</small></span>${p.st === 'agendado' ? chip('pendente', 'Agendado') : chip('pago', 'Enviado')}${p.st === 'agendado' ? `<button class="ibtn sm" data-a="pushDel" data-v="${p.id}" aria-label="Cancelar envio">${ic('x', 14, 2)}</button>` : ''}</li>`).join('')}</ul>` : empty('Nenhum push enviado ainda.')}</section>
  <section class="card"><div class="sh"><h2>Banner no Descobrir</h2><label class="tog"><input type="checkbox" id="bnOn" ${b.on ? 'checked' : ''} data-a="bnTog"><span class="sw"></span></label></div><p class="foot">Destaque este evento no topo do Descobrir, no app e no site. O toque no banner abre a página do evento.</p>
   <div class="fgrid2" style="grid-template-columns:1fr">${fld('bT', 'Título do banner', { v: b.title || e.t })}${fld('bL', 'Frase de apoio', { v: b.line || '', ph: 'Ex.: Últimos ingressos com o lote promocional' })}</div>
   <div class="slide-prev gr-${gcls(e)}"><span>${D.whenOf(e)} · ${esc(e.city)}</span><b>${esc(b.title || e.t)}</b><em>${esc(b.line || e.desc.slice(0, 70))}</em><i class="btn sm">${D.evFrom(e) ? 'Ver ingressos' : 'Inscrever-se'}</i></div>
   <div class="ft3" style="margin-top:12px"><button class="btn" data-a="bnSave">Salvar banner</button></div></section></div>
  <p class="foot" style="margin-top:-4px">${live.length} ${live.length === 1 ? 'pessoa pode receber' : 'pessoas podem receber'} push neste evento.</p>`;
}
const gcls = e => ({ Conferência: 'brasa', Retiro: 'lima', Congresso: 'aurora', Curso: 'mar', Show: 'vinho', Encontro: 'mar', Outro: 'brasa' }[e.cat] || 'brasa');
A.bnTog = () => { const e = cur(); e.banner = e.banner || { on: false, title: e.t, line: '' }; e.banner.on = $('#bnOn').checked; render(true); toast(e.banner.on ? 'Banner ligado: aparece no Descobrir' : 'Banner desligado'); };
A.bnSave = () => { const e = cur(); e.banner = { on: $('#bnOn').checked, title: val('bT') || e.t, line: val('bL') }; render(true); toast('Banner salvo'); };
A.remTog = (v, b) => { const r = remOf(cur())[v]; r.on = b.checked; render(true); toast(r.on ? 'Lembrete ligado: ' + dayWord(+v) : 'Lembrete desligado'); };
A.remEdit = v => {
  const e = cur(), r = remOf(e)[v], d = dlg(`<h2>Lembrete ${dayWord(+v)}</h2><p class="lede">${esc(e.t)} · sai em ${D.dBR(remDate(e, +v)).slice(0, 5)} às 9h</p>${fld('rT', 'Título', { v: r.t })}${fld('rM', 'Mensagem', { ta: 1, v: r.msg, hint: 'Use {evento}, {data}, {hora} e {local}. Até 140 caracteres depois de preenchido.' })}
   <p class="eb" style="margin:6px 0 4px">Como vai chegar</p><div class="slide-prev" id="rPrev" style="min-height:0"><b></b><em></em></div>
   <div class="ft2"><button class="btn sec" id="rReset">Voltar ao texto padrão</button><button class="btn" id="rGo">Salvar</button></div>`);
  const pv = () => { $('#rPrev b', d).textContent = val('rT'); $('#rPrev em', d).textContent = fillTpl(e, val('rM')); };
  d.addEventListener('input', pv); pv();
  $('#rReset', d).addEventListener('click', () => { $('#rT', d).value = REM_DEF[v].t; $('#rM', d).value = REM_DEF[v].msg; pv(); });
  $('#rGo', d).addEventListener('click', () => { fclear(); if (!val('rT')) return ferr('rT', 'Informe o título'); if (!val('rM')) return ferr('rM', 'Escreva a mensagem'); if (fillTpl(e, val('rM')).length > 140) return ferr('rM', 'Passa de 140 caracteres depois de preenchido'); r.t = val('rT'); r.msg = val('rM'); closeDlg(); render(true); toast('Lembrete salvo'); });
};
A.pushDel = v => { const i = PUSHES.findIndex(p => p.id === v); PUSHES.splice(i, 1); render(true); toast('Envio cancelado'); };
A.pushNew = () => {
  const e = cur(), pend = D.ordersOf(e).filter(o => o.st === 'pendente').length, all = D.ordersOf(e).filter(o => o.st === 'pago' || o.st === 'pendente').length;
  const d = dlg(`<h2>Novo push</h2><p class="lede">${esc(e.t)}</p><p class="eb" style="margin:0 0 6px">Começar de um modelo</p><div class="opts2" style="margin:0 0 14px;flex-direction:row;flex-wrap:wrap">${MODELS.map(([k, l]) => `<button type="button" class="chipf" data-mdl="${k}">${l}</button>`).join('')}</div>${fld('pT', 'Título', { ph: 'Ex.: O evento está chegando!' })}${fld('pM', 'Mensagem', { ta: 1, ph: 'Até 140 caracteres.' })}
   ${fld('pA', 'Para quem', { opts: [['Todos os inscritos', `Todos os inscritos (${all})`], ['Pagamento pendente', `Só com pagamento pendente (${pend})`], ...(e.tickets.length > 1 ? e.tickets.map(t => ['Ingresso ' + t.n, `Quem comprou ${t.n} (${D.tkSold(e, t)})`]) : [])] })}
   <div class="fld"><label>Quando</label><div class="vis3 two"><label><input type="radio" name="pw" value="now" checked><span><b>Agora</b><small>Envia em seguida.</small></span></label><label><input type="radio" name="pw" value="later"><span><b>Agendar</b><small>Escolha o dia e a hora.</small></span></label></div></div><div id="pWhen" hidden><div class="fgrid2">${fld('pD', 'Data', { type: 'date', v: D.TODAY })}${fld('pH', 'Hora', { type: 'time', v: '09:00' })}</div></div>
   <div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="pGo">Enviar</button></div>`);
  d.addEventListener('click', ev => {
    const b = ev.target.closest('[data-mdl]'); if (!b) return; const m = MODELS.find(x => x[0] === b.dataset.mdl), n = m[2], tpl = n ? remOf(e)[n] : MODEL_TXT[m[0]];
    $('#pT', d).value = tpl.t; $('#pM', d).value = fillTpl(e, tpl.msg);
    if (n) { const dt = remDate(e, n); if (dt >= D.TODAY) { $$('input[name=pw]', d)[1].checked = true; $('#pD', d).value = dt; $('#pH', d).value = '09:00'; } else { $$('input[name=pw]', d)[0].checked = true; toast('Essa data já passou: o push sai agora', 'bad'); } $('#pWhen', d).hidden = $$('input[name=pw]:checked', d)[0].value !== 'later'; $('#pGo', d).textContent = $$('input[name=pw]:checked', d)[0].value === 'later' ? 'Agendar' : 'Enviar'; }
  });
  d.addEventListener('change', () => { $('#pWhen', d).hidden = $$('input[name=pw]:checked', d)[0].value !== 'later'; $('#pGo', d).textContent = $$('input[name=pw]:checked', d)[0].value === 'later' ? 'Agendar' : 'Enviar'; });
  $('#pGo', d).addEventListener('click', () => { fclear(); const t = val('pT'); if (!t) return ferr('pT', 'Informe o título'); const m = val('pM'); if (!m) return ferr('pM', 'Escreva a mensagem'); if (m.length > 140) return ferr('pM', 'No máximo 140 caracteres');
    const later = $$('input[name=pw]:checked', d)[0].value === 'later', aud = val('pA'), n = aud === 'Pagamento pendente' ? pend : aud.startsWith('Ingresso ') ? D.tkSold(e, e.tickets.find(x => 'Ingresso ' + x.n === aud)) : all;
    PUSHES.unshift({ id: 'n' + Date.now(), ev: e.id, t, msg: m, aud, at: later ? `${val('pD')} ${val('pH')}` : `${D.TODAY} 09:00`, st: later ? 'agendado' : 'enviado', n: later ? 0 : n }); closeDlg(); render(true); toast(later ? 'Push agendado' : `Push enviado para ${n} ${n === 1 ? 'pessoa' : 'pessoas'}`); });
};

/* ---------- quadros de tarefas ---------- */
const COLS = ['A fazer', 'Fazendo', 'Feito'];
function tQuadros(e) {
  const l = BOARDS.filter(b => b.ev === e.id), b = l.find(x => x.id === S.bdv);
  if (b) return boardView(e, b);
  return `<div class="sh" style="margin-bottom:12px"><h2 style="margin:0;font:600 16px var(--font-display)">Quadros de tarefas</h2><button class="btn sec sm" data-a="bdNew">${ic('plus', 14, 2.2)}Novo quadro</button></div><p class="foot" style="margin:-4px 0 14px">Organize o que falta fazer para o evento. Cada quadro tem as colunas A fazer, Fazendo e Feito.</p>`
    + (l.length ? `<div class="bdg">${l.map(x => { const n = x.tasks.length, done = x.tasks.filter(t => t.col === 2).length; return `<button class="card bdc" data-a="bdOpen" data-v="${x.id}"><b>${esc(x.n)}</b><span class="mute">${n} ${n === 1 ? 'tarefa' : 'tarefas'} · ${done} ${done === 1 ? 'feita' : 'feitas'}</span>${prog(done, n, 'ok')}<div class="bdcols">${COLS.map((c, i) => `<span><b>${x.tasks.filter(t => t.col === i).length}</b>${c}</span>`).join('')}</div></button>`; }).join('')}</div>` : empty('Nenhum quadro ainda. Crie o primeiro para dividir o trabalho.'));
}
function boardView(e, b) {
  const due = t => t.due ? (t.col !== 2 && t.due < D.TODAY ? `<span class="st vencido">${D.dBR(t.due).slice(0, 5)}</span>` : `<span class="st neutro">${D.dBR(t.due).slice(0, 5)}</span>`) : '';
  return `<nav class="crumb" style="margin-bottom:12px"><button class="crumb-bk" data-a="bdBack">${ic('chevL', 16, 2.2)}<span>Quadros</span></button><i class="crumb-sep"></i><span>${esc(b.n)}</span></nav>
  <div class="sh" style="margin-bottom:12px"><h2 style="margin:0;font:600 16px var(--font-display)">${esc(b.n)}</h2><div class="row g2"><button class="btn sec sm" data-a="tkAddDlg" data-v="${b.id}">${ic('plus', 14, 2.2)}Nova tarefa</button><button class="btn ghost sm" data-a="bdDel" data-v="${b.id}">Excluir quadro</button></div></div>
  <div class="kb">${COLS.map((c, i) => `<section class="kbc"><header><b>${c}</b><span class="dash-count">${b.tasks.filter(t => t.col === i).length}</span></header>${b.tasks.filter(t => t.col === i).map(t => `<article class="kbt ${i === 2 ? 'done' : ''}"><b>${esc(t.t)}</b><div class="kbm">${t.who ? `<span class="kbw">${avatar(t.who)}<small>${esc(t.who.split(' ')[0])}</small></span>` : '<span></span>'}${due(t)}</div><div class="kba">${i > 0 ? `<button class="ibtn sm" data-a="tkMv" data-v="${b.id}|${t.id}|-1" aria-label="Mover para ${COLS[i - 1]}">${ic('chevL', 14, 2.2)}</button>` : '<span></span>'}<button class="ibtn sm" data-a="tkRm" data-v="${b.id}|${t.id}" aria-label="Excluir tarefa">${ic('trash', 13, 2)}</button>${i < 2 ? `<button class="ibtn sm" data-a="tkMv" data-v="${b.id}|${t.id}|1" aria-label="Mover para ${COLS[i + 1]}">${ic('chevR', 14, 2.2)}</button>` : '<span></span>'}</div></article>`).join('') || '<p class="foot" style="text-align:center;margin:14px 0">Nada aqui.</p>'}</section>`).join('')}</div>`;
}
Object.assign(A, {
  bdOpen: v => { S.bdv = v; render(true); }, bdBack: () => { S.bdv = null; render(true); },
  bdNew: () => { const e = cur(), d = dlg(`<h2>Novo quadro</h2><p class="lede">${esc(e.t)}</p>${fld('bdN', 'Nome do quadro', { ph: 'Ex.: Preparação do evento' })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="bdGo">Criar quadro</button></div>`); $('#bdGo', d).addEventListener('click', () => { fclear(); const n = val('bdN'); if (!n) return ferr('bdN', 'Informe o nome'); const b = { id: 'b' + Date.now(), ev: e.id, n, tasks: [] }; BOARDS.push(b); S.bdv = b.id; closeDlg(); render(true); toast('Quadro criado'); }); },
  bdDel: v => { const b = BOARDS.find(x => x.id === v); confirmAct({ title: `Excluir o quadro ${esc(b.n)}?`, body: `As ${b.tasks.length} tarefas são apagadas.`, label: 'Excluir quadro', fn: () => { BOARDS.splice(BOARDS.indexOf(b), 1); S.bdv = null; render(true); toast('Quadro excluído'); } }); },
  tkAddDlg: v => { const e = cur(), b = BOARDS.find(x => x.id === v), people = [...new Set(TEAMS.filter(t => t.ev === e.id).flatMap(t => [t.leader, ...t.members]).map(id => (staffOf(id) || {}).n).filter(Boolean))];
    const d = dlg(`<h2>Nova tarefa</h2><p class="lede">${esc(b.n)}</p>${fld('tkT', 'Tarefa', { ph: 'O que precisa ser feito' })}<div class="fgrid2">${fld('tkW', 'Responsável', { opts: [['', 'Sem responsável'], ...people.map(n => [n, n])] })}${fld('tkD', 'Prazo (opcional)', { type: 'date' })}</div>${fld('tkC', 'Coluna', { opts: COLS.map((c, i) => [i, c]) })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="tkGo">Criar tarefa</button></div>`);
    $('#tkGo', d).addEventListener('click', () => { fclear(); const t = val('tkT'); if (!t) return ferr('tkT', 'Descreva a tarefa'); b.tasks.push({ id: 'k' + Date.now(), col: +val('tkC'), t, who: val('tkW'), due: val('tkD') }); closeDlg(); render(true); toast('Tarefa criada'); }); },
  tkMv: v => { const [bid, tid, d] = v.split('|'), t = BOARDS.find(b => b.id === bid).tasks.find(x => x.id === tid); t.col = Math.max(0, Math.min(2, t.col + +d)); render(true); },
  tkRm: v => { const [bid, tid] = v.split('|'), b = BOARDS.find(x => x.id === bid), t = b.tasks.find(x => x.id === tid); b.tasks.splice(b.tasks.indexOf(t), 1); render(true); toast('Tarefa excluída'); },
});

/* ---------- caixas ---------- */
function tCaixas(e) {
  let l = CASH.filter(c => c.ev === e.id); if (!l.length) { CASH.push({ id: 'cx' + Date.now(), ev: e.id, n: 'Caixa principal', main: true, st: 'aberto', entries: [] }); l = CASH.filter(c => c.ev === e.id); }
  const c = l.find(x => x.id === S.cxv); if (c) return cashView(e, c, l);
  const tot = l.reduce((a, x) => a + cashBal(x), 0);
  return `<div class="sh" style="margin-bottom:12px"><h2 style="margin:0;font:600 16px var(--font-display)">Caixas do evento</h2><button class="btn sec sm" data-a="cxNew">${ic('plus', 14, 2.2)}Novo caixa</button></div><p class="foot" style="margin:-4px 0 14px">Controle o dinheiro do evento: o caixa principal e quantos secundários precisar (comida, recepção, equipamento). Separado do que entra pelas inscrições.</p>`
    + kpis([['Saldo total', money(tot), `${l.length} ${l.length === 1 ? 'caixa' : 'caixas'}`], ['Entradas', money(l.reduce((a, x) => a + inOf(x), 0)), 'sem aportes entre caixas'], ['Saídas', money(l.reduce((a, x) => a + outOf(x), 0)), 'sem repasses entre caixas'], ['Caixas abertos', l.filter(x => x.st === 'aberto').length, '']])
    + `<div class="bdg">${l.map(x => `<button class="card bdc" data-a="cxOpen" data-v="${x.id}"><span class="row g2"><b>${esc(x.n)}</b>${x.main ? chip('transf', 'Principal') : ''}${x.st === 'encerrado' ? chip('neutro', 'Encerrado') : ''}</span><span class="cxs ${cashBal(x) < 0 ? 'neg' : ''}">${money(cashBal(x))}</span><span class="mute">${x.entries.length} lançamentos</span></button>`).join('')}</div>`;
}
const inOf = c => c.entries.filter(l => l.t === 'in' && !l.xfer).reduce((a, l) => a + l.v, 0), outOf = c => c.entries.filter(l => l.t === 'out' && !l.xfer).reduce((a, l) => a + l.v, 0), xfOf = c => c.entries.filter(l => l.xfer).reduce((a, l) => a + (l.t === 'in' ? l.v : -l.v), 0);
function cashView(e, c, all) {
  const closed = c.st === 'encerrado', others = all.filter(x => x !== c && x.st === 'aberto'), canX = !closed && (c.main ? others.some(x => !x.main) : true);
  const rows = [...c.entries].sort((a, b) => a.d < b.d ? 1 : -1);
  return `<nav class="crumb" style="margin-bottom:12px"><button class="crumb-bk" data-a="cxBack">${ic('chevL', 16, 2.2)}<span>Caixas</span></button><i class="crumb-sep"></i><span>${esc(c.n)}</span></nav>
  <div class="sh" style="margin-bottom:12px"><h2 style="margin:0;font:600 16px var(--font-display)">${esc(c.n)} ${c.main ? chip('transf', 'Principal') : ''}${closed ? chip('neutro', 'Encerrado') : ''}</h2><div class="row g2" style="flex-wrap:wrap">${canX ? `<button class="btn sec sm" data-a="cxXfer" data-v="${c.id}">${ic('swap', 14, 2)}${c.main ? 'Enviar a um caixa' : 'Devolver ao principal'}</button>` : ''}${closed ? `<button class="btn sec sm" data-a="cxReopen" data-v="${c.id}">Reabrir caixa</button>` : `<button class="btn sec sm" data-a="cxEntry" data-v="${c.id}|in">${ic('plus', 14, 2.2)}Entrada</button><button class="btn sec sm" data-a="cxEntry" data-v="${c.id}|out">${ic('minus', 14, 2.2)}Saída</button>${c.main ? '' : `<button class="btn ghost sm" data-a="cxClose" data-v="${c.id}">Encerrar caixa</button>`}`}</div></div>`
    + kpis([['Saldo', `<span class="${cashBal(c) < 0 ? 'neg' : ''}">${money(cashBal(c))}</span>`, ''], ['Entradas', money(inOf(c)), ''], ['Saídas', money(outOf(c)), ''], ['Aportes e repasses', (xfOf(c) > 0 ? '+' : '') + money(xfOf(c)), c.main ? 'enviado e devolvido' : 'recebido, menos o devolvido']])
    + `<div class="tw">${rows.length ? `<table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th class="r">Valor</th></tr></thead><tbody>${rows.map(l => `<tr><td class="num">${D.dBR(l.d)}</td><td><b>${esc(l.desc)}</b><small>${esc(l.by)}</small></td><td>${l.xfer ? `<span class="st transf">${esc(l.cat)}</span>` : esc(l.cat)}</td><td class="r num ${l.xfer ? '' : l.t === 'in' ? 'pos' : 'neg'}">${l.t === 'in' ? '+' : '−'} ${money(l.v)}</td></tr>`).join('')}</tbody></table>` : empty('Nenhum lançamento ainda.')}</div>`;
}
Object.assign(A, {
  cxOpen: v => { S.cxv = v; render(true); }, cxBack: () => { S.cxv = null; render(true); },
  cxNew: () => { const e = cur(), d = dlg(`<h2>Novo caixa</h2><p class="lede">${esc(e.t)}</p>${fld('cxN', 'Nome do caixa', { ph: 'Ex.: Alimentação' })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="cxGo">Criar caixa</button></div>`); $('#cxGo', d).addEventListener('click', () => { fclear(); const n = val('cxN'); if (!n) return ferr('cxN', 'Informe o nome'); CASH.push({ id: 'cx' + Date.now(), ev: e.id, n, main: false, st: 'aberto', entries: [] }); closeDlg(); render(true); toast('Caixa criado'); }); },
  cxEntry: v => { const [id, t] = v.split('|'), c = CASH.find(x => x.id === id);
    const d = dlg(`<h2>${t === 'in' ? 'Nova entrada' : 'Nova saída'}</h2><p class="lede">${esc(c.n)} · saldo ${money(cashBal(c))}</p><div class="fgrid2">${fld('xV', 'Valor (R$)', { type: 'number', ph: '0,00', extra: 'step="0.01" min="0"' })}${fld('xD', 'Data', { type: 'date', v: D.TODAY })}</div>${fld('xT', 'Descrição', { ph: t === 'in' ? 'Ex.: Doação' : 'Ex.: Compra de material' })}${fld('xC', 'Categoria', { opts: (t === 'in' ? ['Doação', 'Aporte', 'Venda', 'Outros'] : ['Alimentação', 'Material', 'Local', 'Equipamento', 'Serviços', 'Outros']).map(x => [x, x]) })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="xGo">Lançar</button></div>`);
    $('#xGo', d).addEventListener('click', () => { fclear(); const x = +val('xV'); if (!(x > 0)) return ferr('xV', 'Informe um valor maior que zero'); if (!val('xT')) return ferr('xT', 'Descreva o lançamento'); if (val('xD') > D.TODAY) return ferr('xD', 'A data não pode ser futura');
      c.entries.push({ id: 'l' + Date.now(), t, v: x, d: val('xD'), desc: val('xT'), cat: val('xC'), by: orgOf().owner }); closeDlg(); render(true); toast(t === 'in' ? 'Entrada lançada' : (cashBal(c) < 0 ? 'Saída lançada, acima do saldo' : 'Saída lançada')); }); },
  cxXfer: v => { const e = cur(), c = CASH.find(x => x.id === v), all = CASH.filter(x => x.ev === e.id && x.st === 'aberto' && x !== c), dests = c.main ? all.filter(x => !x.main) : all.filter(x => x.main), bal = cashBal(c);
    const d = dlg(`<h2>${c.main ? 'Enviar a um caixa' : 'Devolver ao caixa principal'}</h2><p class="lede">${esc(c.n)} · saldo ${money(bal)}</p>${fld('fT', c.main ? 'Para qual caixa?' : 'Devolver para', { opts: dests.map(x => [x.id, x.n]) })}${fld('fV', 'Valor (R$)', { type: 'number', ph: '0,00', hint: 'Não dá para enviar mais do que o saldo.', extra: 'step="0.01" min="0"' })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="fGo">${c.main ? 'Enviar' : 'Devolver'}</button></div>`);
    $('#fGo', d).addEventListener('click', () => { fclear(); const x = +val('fV'); if (!(x > 0)) return ferr('fV', 'Informe um valor maior que zero'); if (x > bal) return ferr('fV', 'O saldo deste caixa é ' + money(bal)); const to = CASH.find(y => y.id === val('fT')), k = to.main ? 'Repasse' : c.main ? 'Aporte' : 'Transferência';
      c.entries.push({ id: 'l' + Date.now(), t: 'out', v: x, d: D.TODAY, desc: `${k} para ${to.n}`, cat: k, by: orgOf().owner, xfer: true }); to.entries.push({ id: 'l' + (Date.now() + 1), t: 'in', v: x, d: D.TODAY, desc: `${k} ${c.main ? 'do' : 'de'} ${c.n}`, cat: k, by: orgOf().owner, xfer: true }); closeDlg(); render(true); toast(`${k} de ${money(x)} para ${to.n}`); }); },
  cxClose: v => { const c = CASH.find(x => x.id === v), main = CASH.find(x => x.ev === c.ev && x.main), bal = cashBal(c); confirmAct({ title: `Encerrar o caixa ${esc(c.n)}?`, body: bal > 0 ? `O saldo de ${money(bal)} volta para o ${esc(main.n)}.` : 'O caixa fica só para consulta e pode ser reaberto.', label: 'Encerrar caixa', tone: '', fn: () => { if (bal > 0) { c.entries.push({ id: 'l' + Date.now(), t: 'out', v: bal, d: D.TODAY, desc: `Repasse para ${main.n}`, cat: 'Repasse', by: orgOf().owner, xfer: true }); main.entries.push({ id: 'l' + (Date.now() + 1), t: 'in', v: bal, d: D.TODAY, desc: `Repasse de ${c.n}`, cat: 'Repasse', by: orgOf().owner, xfer: true }); } c.st = 'encerrado'; S.cxv = null; render(true); toast('Caixa encerrado'); } }); },
  cxReopen: v => { CASH.find(x => x.id === v).st = 'aberto'; render(true); toast('Caixa reaberto'); },
});
syncStaff();
