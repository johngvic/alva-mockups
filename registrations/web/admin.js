/* VEM · web · administração: usuários e permissões do organizador e, só para o super admin, a plataforma
   (organizadores, recursos habilitados, super usuários e auditoria). Mesmo desenho do Alva Web. */
import { $, $$, esc, ic, initials } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { AREAS, LEVELS, PERFIS, ORG_USERS, FEATURES, FLAGS, SUPERS, AUDIT } from '../shared/data2.js';
import { S, A, toast, val, fld, ferr, fclear, dlg, closeDlg, confirmAct, chip, note, page, kpis, empty, orgOf, pager, render } from './core.js';
import { avatar } from './people.js';

const money = D.money;
const perfil = id => PERFIS.find(p => p.id === id);
const LV = { none: ['neutro', 'Sem acesso'], view: ['transf', 'Ver'], edit: ['pendente', 'Editar'], admin: ['pago', 'Administrar'] };
const areasTxt = p => { const a = AREAS.filter(([k]) => p.perms[k] !== 'none'); return a.length === AREAS.length ? 'Todas as áreas' : a.map(([, n]) => n.split(' ')[0]).join(', ') || 'Nenhuma'; };

/* ---------- usuários e permissões (organizador) ---------- */
export function usuarios() {
  const l = ORG_USERS.filter(u => u.org === S.org);
  return page('Usuários e permissões', 'Quem acessa o painel deste organizador e o que cada pessoa pode fazer.', `<button class="btn" data-a="usrNew">${ic('plus', 16, 2.2)}Convidar pessoa</button>`, 'Administração')
    + note('shield', 'Cada pessoa tem um <b>perfil</b>, e cada perfil define o acesso por área: eventos, inscrições, financeiro, equipes, comunicação e configuração. Crie e ajuste os perfis em <button class="btn ghost sm" data-a="go" data-v="perfis">Perfis</button>.')
    + `<div class="tw"><table><thead><tr><th>Pessoa</th><th>Perfil</th><th>Acesso</th><th>Situação</th><th>Último acesso</th><th class="r"></th></tr></thead><tbody>${l.map(u => { const p = perfil(u.perfil); return `<tr class="row" tabindex="0" data-a="usrEdit" data-v="${u.id}"><td><span class="pcell">${avatar(u.n)}<span><b>${esc(u.n)}</b><small>${esc(u.e)}</small></span></span></td><td><b>${esc(p.n)}</b></td><td>${esc(areasTxt(p))}</td><td>${u.st === 'ativo' ? chip('pago', 'Ativo') : chip('pendente', 'Convite enviado')}</td><td>${u.last}</td><td class="r"><button class="ibtn" data-a="usrDel" data-v="${u.id}" aria-label="Remover ${esc(u.n)}">${ic('trash', 15, 2)}</button></td></tr>`; }).join('')}</tbody></table></div>`;
}
const perfilOpts = () => PERFIS.map(p => [p.id, p.n]);
A.usrNew = () => { const d = dlg(`<h2>Convidar pessoa</h2><p class="lede">A pessoa recebe um e-mail com o link do primeiro acesso.</p>${fld('uN', 'Nome')}${fld('uE', 'E-mail', { type: 'email' })}${fld('uP', 'Perfil', { opts: perfilOpts(), v: 'p3', hint: 'Você pode mudar depois.' })}<div id="uPv" class="pv"></div><div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="uGo">Enviar convite</button></div>`);
  const prev = () => { const p = perfil(val('uP')); $('#uPv', d).innerHTML = `<p class="foot" style="margin:0">${esc(p.desc)} <b>${esc(areasTxt(p))}.</b></p>`; }; $('#uP', d).addEventListener('change', prev); prev();
  $('#uGo', d).addEventListener('click', () => { fclear(); if (!val('uN')) return ferr('uN', 'Informe o nome'); if (!/^\S+@\S+\.\S+$/.test(val('uE'))) return ferr('uE', 'E-mail inválido'); if (ORG_USERS.some(u => u.e.toLowerCase() === val('uE').toLowerCase())) return ferr('uE', 'Esse e-mail já tem acesso'); ORG_USERS.push({ id: 'u' + Date.now(), org: S.org, n: val('uN'), e: val('uE'), perfil: val('uP'), st: 'convidado', last: '—' }); AUDIT.unshift({ at: D.TODAY + ' 10:00', who: orgOf().owner, what: `Convidou ${val('uN')} como ${perfil(val('uP')).n}`, ref: 'Usuários e permissões', org: S.org }); closeDlg(); render(true); toast('Convite enviado'); }); };
A.usrEdit = (v, b, ev) => { if (ev && ev.target.closest('[data-a=usrDel]')) return; const u = ORG_USERS.find(x => x.id === v);
  const d = dlg(`<h2>${esc(u.n)}</h2><p class="lede">${esc(u.e)}</p>${fld('eP', 'Perfil', { opts: perfilOpts(), v: u.perfil })}<div id="ePv"></div><div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button>${u.st === 'convidado' ? '<button class="btn sec" data-a="soon" data-v="Convite reenviado">Reenviar convite</button>' : ''}<button class="btn" id="eGo">Salvar</button></div>`);
  const prev = () => { const p = perfil(val('eP')); $('#ePv', d).innerHTML = `<div class="pmx">${AREAS.map(([k, n]) => `<div><span>${n}</span>${chip(...LV[p.perms[k]])}</div>`).join('')}</div>`; }; $('#eP', d).addEventListener('change', prev); prev();
  $('#eGo', d).addEventListener('click', () => { const old = perfil(u.perfil).n; u.perfil = val('eP'); AUDIT.unshift({ at: D.TODAY + ' 10:05', who: orgOf().owner, what: `Mudou o perfil de ${u.n} de ${old} para ${perfil(u.perfil).n}`, ref: 'Usuários e permissões', org: S.org }); closeDlg(); render(true); toast('Perfil atualizado'); }); };
A.usrDel = v => { const u = ORG_USERS.find(x => x.id === v); if (u.perfil === 'p1' && ORG_USERS.filter(x => x.org === S.org && x.perfil === 'p1').length < 2) return toast('Precisa existir pelo menos um administrador.', 'bad'); confirmAct({ title: `Remover ${esc(u.n)}?`, body: 'A pessoa perde o acesso ao painel agora. Fica registrado na auditoria.', label: 'Remover pessoa', fn: () => { ORG_USERS.splice(ORG_USERS.indexOf(u), 1); render(true); toast('Pessoa removida'); } }); };

/* ---------- perfis (roles) ---------- */
export function perfis() {
  return page('Perfis', 'Crie perfis com o acesso certo para cada tipo de pessoa da sua equipe.', `<button class="btn" data-a="pfNew">${ic('plus', 16, 2.2)}Novo perfil</button>`, 'Administração')
    + `<div class="pfg">${PERFIS.map(p => { const n = ORG_USERS.filter(u => u.org === S.org && u.perfil === p.id).length; return `<article class="card pf"><div class="pf-h"><span class="grow"><b>${esc(p.n)}</b>${p.locked ? ' ' + chip('transf', 'Padrão') : ''}<small>${esc(p.desc)}</small></span><button class="ibtn sm" data-a="pfEdit" data-v="${p.id}" aria-label="Editar perfil">${ic('pen', 14, 2)}</button></div>
    <div class="pmx">${AREAS.map(([k, nm]) => `<div><span>${nm}</span>${chip(...LV[p.perms[k]])}</div>`).join('')}</div><p class="foot" style="margin:12px 0 0">${n} ${n === 1 ? 'pessoa' : 'pessoas'} neste perfil</p></article>`; }).join('')}</div>`;
}
const pfDlg = id => { const p = id ? perfil(id) : null, perms = p ? { ...p.perms } : Object.fromEntries(AREAS.map(([k]) => [k, 'none']));
  const d = dlg(`<h2>${p ? 'Editar perfil' : 'Novo perfil'}</h2><p class="lede">${p && p.locked ? 'O perfil Administrador não pode ser alterado.' : 'Defina o acesso por área.'}</p>${fld('pN', 'Nome do perfil', { v: p ? p.n : '', ph: 'Ex.: Supervisor de som' })}${fld('pD', 'Descrição', { v: p ? p.desc : '', ph: 'Para quem é este perfil' })}
  <div class="pmed">${AREAS.map(([k, n]) => `<label><span>${n}</span><select data-k="${k}" ${p && p.locked ? 'disabled' : ''}>${LEVELS.map(([v, t]) => `<option value="${v}" ${perms[k] === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>`).join('')}</div>
  <div class="ft2">${p && !p.locked ? '<button class="btn dng sm" data-a="pfDel" data-v="' + p.id + '" style="margin-right:auto">Excluir perfil</button>' : ''}<button class="btn sec" data-a="closeDlg">Cancelar</button>${p && p.locked ? '' : `<button class="btn" id="pGo">${p ? 'Salvar' : 'Criar perfil'}</button>`}</div>`, true);
  $('#pGo', d)?.addEventListener('click', () => { fclear(); const n = val('pN'); if (!n) return ferr('pN', 'Informe o nome'); if (PERFIS.some(x => x !== p && x.n.toLowerCase() === n.toLowerCase())) return ferr('pN', 'Já existe um perfil com esse nome'); $$('select[data-k]', d).forEach(s => { perms[s.dataset.k] = s.value; });
    if (p) Object.assign(p, { n, desc: val('pD'), perms }); else PERFIS.push({ id: 'p' + Date.now(), n, desc: val('pD'), perms }); AUDIT.unshift({ at: D.TODAY + ' 10:10', who: orgOf().owner, what: `${p ? 'Alterou' : 'Criou'} o perfil ${n}`, ref: 'Perfis', org: S.org }); closeDlg(); render(true); toast(p ? 'Perfil atualizado' : 'Perfil criado'); }); };
A.pfNew = () => pfDlg(); A.pfEdit = v => pfDlg(v);
A.pfDel = v => { const p = perfil(v), n = ORG_USERS.filter(u => u.perfil === v).length; if (n) return toast(`${n} ${n === 1 ? 'pessoa usa' : 'pessoas usam'} este perfil. Mude o perfil delas antes.`, 'bad'); confirmAct({ title: `Excluir o perfil ${esc(p.n)}?`, body: 'Esta ação não pode ser desfeita.', label: 'Excluir perfil', fn: () => { PERFIS.splice(PERFIS.indexOf(p), 1); closeDlg(); render(true); toast('Perfil excluído'); } }); };

/* ---------- plataforma (super admin) ---------- */
export function superOverview() {
  const evs = D.EVENTS, st = evs.map(D.stats), sum = k => st.reduce((a, s) => a + s[k], 0);
  return page('Visão geral da plataforma', 'Tudo o que roda no VEM, de todos os organizadores.', '', 'Plataforma')
    + kpis([['Organizadores', D.ORGS.length, `${D.ORGS.filter(o => o.kind === 'igreja').length} igrejas · ${D.ORGS.filter(o => o.kind === 'empresa').length} empresas`], ['Eventos', evs.length, `${evs.filter(e => e.st === 'publicado' && !D.isPast(e)).length} no ar`], ['Ingressos vendidos', sum('sold').toLocaleString('pt-BR'), `${sum('paid')} pagos`], ['Movimentado (bruto)', money(sum('gross')), `líquido ${money(sum('net'))}`]])
    + `<section class="card"><h2>Organizadores</h2><div class="tw" style="box-shadow:none;margin:0"><table><thead><tr><th>Organizador</th><th>Tipo</th><th>Eventos</th><th class="r">Vendido (bruto)</th><th>Situação</th></tr></thead><tbody>${D.ORGS.map(o => { const es = D.EVENTS.filter(e => e.org === o.id), g = es.reduce((a, e) => a + D.stats(e).gross, 0); return `<tr><td><b>${esc(o.n)}</b><small>${esc(o.city)}, ${o.uf}</small></td><td>${chip(o.kind === 'igreja' ? 'transf' : 'neutro', o.kind === 'igreja' ? 'Igreja · Alva' : 'Empresa')}</td><td class="num">${es.length}</td><td class="r num">${money(g)}</td><td>${chip('pago', 'Ativo')}</td></tr>`; }).join('')}</tbody></table></div></section>`;
}
export function recursos() {
  const org = D.orgOf(S.superOrg || D.ORGS[0].id), f = FLAGS[org.id];
  return page('Recursos habilitados', 'Ligue ou desligue funcionalidades para cada organizador. Só o super admin vê esta página.', `<select class="selp" data-a="supOrg" aria-label="Organizador">${D.ORGS.map(o => `<option value="${o.id}" ${o.id === org.id ? 'selected' : ''}>${esc(o.n)}</option>`).join('')}</select>`, 'Plataforma')
    + `<section class="card"><h2>${esc(org.n)}</h2><div class="ftl">${FEATURES.map(x => `<label class="ft"><span class="grow"><b>${esc(x.n)}</b><small>${esc(x.desc)}</small></span><span class="tog"><input type="checkbox" ${f[x.k] ? 'checked' : ''} data-a="flagTog" data-v="${org.id}|${x.k}"><span class="sw"></span></span></label>`).join('')}</div></section>`;
}
A.supOrg = v => { S.superOrg = v; render(true); };
A.flagTog = (v, el) => { const [oid, k] = v.split('|'); FLAGS[oid][k] = el.checked; const o = D.orgOf(oid), x = FEATURES.find(y => y.k === k); AUDIT.unshift({ at: D.TODAY + ' 10:20', who: 'Tiago Borges', what: `${el.checked ? 'Ativou' : 'Desativou'} ${x.n} para ${o.n}`, ref: 'Recursos habilitados', org: oid }); toast(`${x.n}: ${el.checked ? 'ligado' : 'desligado'} para ${o.n}`); };
export function supers() {
  return page('Super usuários', 'Quem administra a plataforma. Tem acesso a todos os organizadores, sempre com registro na auditoria.', `<button class="btn" data-a="supNew">${ic('plus', 16, 2.2)}Convidar super usuário</button>`, 'Plataforma')
    + `<div class="tw"><table><thead><tr><th>Pessoa</th><th>Papel</th><th>Pode</th><th>Último acesso</th></tr></thead><tbody>${SUPERS.map(s => `<tr><td><span class="pcell">${avatar(s.n)}<span><b>${esc(s.n)}</b><small>${esc(s.e)}</small></span></span></td><td>${chip(s.role === 'SuperAdmin' ? 'transf' : 'neutro', s.role)}</td><td>${s.role === 'SuperAdmin' ? 'Tudo, inclusive recursos e super usuários' : 'Consultar e operar, sem mudar recursos'}</td><td>${s.last}</td></tr>`).join('')}</tbody></table></div>`;
}
A.supNew = () => { const d = dlg(`<h2>Convidar super usuário</h2><p class="lede">Acesso de plataforma. Use com cuidado.</p>${fld('sN', 'Nome')}${fld('sE', 'E-mail', { type: 'email' })}${fld('sR', 'Papel', { opts: [['SuperOperator', 'SuperOperator · consulta e opera'], ['SuperAdmin', 'SuperAdmin · tudo']] })}<div class="ft2"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn" id="sGo">Enviar convite</button></div>`);
  $('#sGo', d).addEventListener('click', () => { fclear(); if (!val('sN')) return ferr('sN', 'Informe o nome'); if (!/^\S+@\S+\.\S+$/.test(val('sE'))) return ferr('sE', 'E-mail inválido'); SUPERS.push({ id: 'su' + Date.now(), n: val('sN'), e: val('sE'), role: val('sR'), last: '—' }); AUDIT.unshift({ at: D.TODAY + ' 10:30', who: 'Tiago Borges', what: `Convidou ${val('sN')} como ${val('sR')}`, ref: 'Super usuários', org: '' }); closeDlg(); render(true); toast('Convite enviado'); }); };
export function auditoria() {
  const q = (S.aq || '').toLowerCase(), l = AUDIT.filter(a => (S.ao === 'todos' || !S.ao || a.org === S.ao) && (!q || (a.who + ' ' + a.what + ' ' + a.ref).toLowerCase().includes(q))), p = pager(l, 'aud', 12);
  return page('Auditoria', 'Quem fez o quê. Inclui consultas a dados pessoais, para a LGPD.', `<button class="btn sec" data-a="exportar" data-v="a auditoria">${ic('download', 16, 2)}Exportar CSV</button>`, 'Plataforma')
    + note('shield', 'Toda consulta a dados pessoais de inscrições e todo acesso de super usuário ficam registrados aqui, com pessoa, data e motivo.')
    + `<div class="tw"><div class="tools"><input id="aq" placeholder="Buscar pessoa, ação ou evento" value="${esc(S.aq || '')}" autocomplete="off"><select data-a="audOrg" aria-label="Organizador"><option value="todos">Todos os organizadores</option>${D.ORGS.map(o => `<option value="${o.id}" ${S.ao === o.id ? 'selected' : ''}>${esc(o.n)}</option>`).join('')}</select></div>${l.length ? `<table><thead><tr><th>Quando</th><th>Quem</th><th>O que fez</th><th>Onde</th></tr></thead><tbody>${p.rows.map(a => `<tr><td class="num">${a.at.slice(8, 10)}/${a.at.slice(5, 7)} ${a.at.slice(11)}</td><td><b>${esc(a.who)}</b></td><td>${esc(a.what)}</td><td>${esc(a.ref)}</td></tr>`).join('')}</tbody></table>${p.html}` : empty('Nada encontrado.')}</div>`;
}
A.audOrg = v => { S.ao = v; S.pg = {}; render(true); };
export function adminAfter() { const q = $('#aq'); if (q) q.addEventListener('input', e => { S.aq = e.target.value; S.pg = {}; const p = e.target.selectionStart; render(true); const n = $('#aq'); n.focus(); n.setSelectionRange(p, p); }); }
S.ao = 'todos'; S.superOrg = 'o3';
