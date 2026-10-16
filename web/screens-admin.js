/* ================= Administração ================= */
const AREAS_P=['Membros','Integração','Cuidado','Comunidade','Kids','Eventos','Conteúdo','Financeiro','Administração'];
const ACTS=['Ver','Criar','Editar','Excluir'];
const ROLES={Administrador:['st-rec'],Pastor:['st-ace'],Líder:['st-ace'],Secretaria:['st-int'],Voluntário:['st-sol']};
const IGREJAS=[{id:'g1',n:'Alva Sede — Centro',rede:'n1',lead:'Pr. Eduardo Nunes'},{id:'g2',n:'Alva Zona Norte',rede:'n1',lead:'Pr. Marcelo Reis'},{id:'g3',n:'Alva Campinas',rede:'n2',lead:'Pra. Helena Prado'}];
const ORG={id:'o1',n:'Igreja Alva',label:'Regional',admins:['u1','u3','u5']};
const ORGS=[{id:'o1',n:'Igreja Alva'},{id:'o2',n:'Comunidade Esperança'}];
const NETS=[{id:'n1',n:'Regional São Paulo',sup:'Rodrigo Alves',main:true,meets:[]},{id:'n2',n:'Regional Interior',sup:'Camila Duarte',main:false,meets:[]}];
/* Log de acessos: toda entrada numa organização/igreja fica registrada; SuperOperator precisa justificar (motivo e protocolo), os demais são registrados em silêncio. */
const ACCESS_LOG=[
 {actor:'Rafael Pereira',role:null,target:'Alva Sede — Centro',reason:'',protocol:'',at:'08/10/2026 · 09:03'},
 {actor:'Ana Lima',role:null,target:'Alva Sede — Centro',reason:'',protocol:'',at:'07/10/2026 · 14:40'},
 {actor:'Marcos Souza',role:null,target:'Alva Zona Norte',reason:'',protocol:'',at:'07/10/2026 · 10:12'},
 {actor:'Patrícia Oliveira',role:null,target:'Alva Sede — Centro',reason:'',protocol:'',at:'06/10/2026 · 16:28'},
 {actor:'Tiago Borges',role:'SuperAdmin',target:'Igreja Alva',reason:'',protocol:'',at:'08/10/2026 · 09:16'},
 {actor:'André Rocha',role:'SuperOperator',target:'Alva Sede — Centro',reason:'Chamado de suporte: igreja reportou erro no caixa da cafeteria',protocol:'SUP-4821',at:'06/10/2026 · 11:05'},
];
function logAccess(target,reason,protocol){const role=S.platformRole||null,actor=role==='SuperOperator'?'André Rocha':role==='SuperAdmin'?'Tiago Borges':ME.n;
 ACCESS_LOG.unshift({actor,role,target,reason:reason||'',protocol:protocol||'',at:new Date().toLocaleDateString('pt-BR')+' · '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})});}
let _uid=0;
const U=(n,e,role,igs,perm,last,tone)=>({id:'u'+(++_uid),n,e,role,igs,cur:igs[0],perm,last,tone,active:true});
const PM=o=>{const p={};AREAS_P.forEach(a=>p[a]=o[a]||[]);return p;};
const ALL=PM(Object.fromEntries(AREAS_P.map(a=>[a,ACTS])));
const USERS=[
 U('Rafael Pereira','rafael@alvaigreja.com.br','Administrador',['g1','g2','g3'],ALL,'agora','ceu'),
 U('Ana Lima','ana.lima@alvaigreja.com.br','Líder',['g1','g2'],PM({Membros:['Ver','Editar'],Comunidade:['Ver','Criar','Editar'],Eventos:['Ver']}),'há 2 h','rosado'),
 U('Marcos Souza','marcos@alvaigreja.com.br','Pastor',['g1','g2'],PM({Membros:['Ver','Editar'],Integração:['Ver','Editar'],Cuidado:ACTS,Comunidade:['Ver'],Eventos:['Ver']}),'ontem','salvia'),
 U('Juliana Prado','juliana@alvaigreja.com.br','Voluntário',['g1'],PM({Eventos:['Ver','Editar'],Kids:['Ver']}),'há 3 dias','lima'),
 U('Patrícia Oliveira','patricia@alvaigreja.com.br','Secretaria',['g1','g2'],PM({Membros:ACTS,Integração:ACTS,Eventos:['Ver','Criar','Editar'],Financeiro:['Ver']}),'hoje','damasco'),
 U('Diego Martins','diego@alvaigreja.com.br','Líder',['g3'],PM({Comunidade:['Ver','Editar'],Eventos:ACTS}),'convite enviado','menta'),
];
const LOG=[
 {u:'Rafael Pereira',a:'Excluiu',e:'Membro',x:'Bruno Carvalho',d:'2026-09-18',t:'09:12'},
 {u:'Ana Lima',a:'Editou',e:'Ministério',x:'Louvor',d:'2026-09-18',t:'08:40'},
 {u:'Marcos Souza',a:'Adicionou',e:'Item de almoxarifado',x:'Violão Yamaha',d:'2026-09-17',t:'17:02'},
 {u:'Sistema',a:'Aprovou',e:'Integração',x:'Bruno Carvalho',det:'Aceita → Integrado',d:'2026-09-17',t:'12:15'},
 {u:'Rafael Pereira',a:'Transferiu',e:'Cuidado pastoral',x:'Maria Santos',det:'para Pr. Marcos Lima',d:'2026-09-16',t:'15:30'},
];
const ACOL={Excluiu:'var(--st-rec)',Editou:'var(--st-ace)',Adicionou:'var(--st-int)',Aprovou:'var(--st-int)',Transferiu:'var(--st-sol)',Alterou:'var(--st-ace)'};
const LGPD=[{id:'l1',n:'Ricardo Santos',type:'Exportação de dados',st:'concluido',d:'2026-09-10',done:'2026-09-11'},{id:'l2',n:'Fernanda Lima',type:'Exclusão de conta',st:'pendente',d:'2026-09-15'}];
Object.assign(S,{user:null,uq:'',atab:'log',aq:'',af:'todas'});
const uById=id=>USERS.find(u=>u.id===id),gById=id=>IGREJAS.find(g=>g.id===id);
const uAv=(u,c='')=>`<span class="av ${c}" style="background:var(--tone-${u.tone});color:var(--tone-${u.tone}-ink)">${initials(u.n)}</span>`;
const rPill=r=>`<span class="stp" style="--c:var(--${ROLES[r][0]});--b:var(--${ROLES[r][0]}-bg)"><i></i>${r}</span>`;
const permCount=u=>AREAS_P.reduce((a,k)=>a+u.perm[k].length,0);
const dBRs=d=>{const [y,m,dd]=d.split('-');return `${dd}/${m}/${y}`;};
const admHead=(t,sub,act)=>`<header class="ph rise"><div><p class="eb">Administração</p><h1>${t}</h1><p class="lede">${sub}</p></div><div class="pact">${act||''}</div></header>`;

/* ---------- Usuários ---------- */
const MODS=['Membros','Integração','Cuidado','Comunidade','Kids','Agenda e eventos','Espaços','Almoxarifado','Cafeteria','Restaurante','Loja','Conteúdo','Comunicação','Financeiro','Multi-igreja'];
const RPERM={};const rp=o=>Object.fromEntries(MODS.map(m=>[m,o[m]||[]]));
RPERM.Administrador=rp(Object.fromEntries(MODS.map(m=>[m,ACTS])));
RPERM.Pastor=rp({Membros:ACTS,Integração:ACTS,Cuidado:ACTS,Comunidade:ACTS,Kids:['Ver'],'Agenda e eventos':['Ver','Criar','Editar'],Conteúdo:['Ver','Criar','Editar'],Comunicação:['Ver','Criar'],Financeiro:['Ver']});
RPERM['Líder']=rp({Membros:['Ver'],Comunidade:['Ver','Editar'],'Agenda e eventos':['Ver','Criar','Editar'],Espaços:['Ver','Criar'],Almoxarifado:['Ver','Criar']});
RPERM.Secretaria=rp({Membros:ACTS,Integração:ACTS,'Agenda e eventos':ACTS,Espaços:ACTS,Comunicação:['Ver','Criar','Editar'],Financeiro:['Ver']});
RPERM['Voluntário']=rp({'Agenda e eventos':['Ver'],Kids:['Ver'],Espaços:['Ver']});
const SAREAS=[['Almoxarifado','box'],['Ministério de Louvor','music'],['Ministério Infantil','baby'],['Casa Norte — Lapa','home'],['Integração','userplus'],['Financeiro','wallet']];
const SPERM={Visualizar:['Só consulta','eye','var(--ink-muted)','var(--surface-2)'],Editar:['Cria e altera','pen','var(--st-ace)','var(--st-ace-bg)'],Admin:['Líder da área — pode conceder acesso','shield','var(--st-rec)','var(--st-rec-bg)']};
let _scid=0;const SC=(area,who,perm)=>({id:'sc'+(++_scid),area,who,perm});
const SCOPES=[SC('Almoxarifado','Lucas Teixeira','Admin'),SC('Ministério de Louvor','Ana Clara Lima','Admin'),SC('Ministério de Louvor','Bruno Reis','Visualizar'),SC('Ministério Infantil','Daniela Rocha','Admin'),SC('Ministério Infantil','Clara Nunes','Editar'),SC('Casa Norte — Lapa','Otávio Lins','Admin'),SC('Integração','Helena Duarte','Editar')];
Object.assign(S,{utab:'users',mxRole:'Administrador',mxDraft:null});
const spPill=p=>`<span class="stp" style="--c:${SPERM[p][2]};--b:${SPERM[p][3]}"><i></i>${p}</span>`;
function usersList(){
 const kp=`<section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Usuários do painel</span><span class="kv">${USERS.filter(u=>!u.revoked).length}</span><span class="kd">${USERS.filter(u=>!u.revoked&&idStatus(u)==='Ativo').length} ativos</span></div>
  <div class="k4"><span class="kl">Administradores</span><span class="kv" style="color:var(--st-rec)">${USERS.filter(u=>u.role==='Administrador').length}</span><span class="kd">acesso total</span></div>
  <div class="k4"><span class="kl">Líderes</span><span class="kv">${USERS.filter(u=>u.role==='Líder').length}</span><span class="kd">${Object.keys(ROLES).length} roles cadastradas</span></div>
  <div class="k4"><span class="kl">Acessos por área</span><span class="kv">${SCOPES.length}</span><span class="kd">em ${new Set(SCOPES.map(x=>x.area)).size} áreas</span></div></section>`;
 const tabs=`<div class="segc up-tabs rise" style="--d:2" role="tablist">${[['users','Usuários',USERS.length],['scope','Acessos por área',SCOPES.length],['matrix','Papéis e matriz',Object.keys(ROLES).length]].map(t=>`<button data-a="uTab" data-v="${t[0]}" aria-pressed="${S.utab===t[0]}">${t[1]}<small class="cm-n">${t[2]}</small></button>`).join('')}</div>`;
 return `${admHead('Usuários e permissões','Pessoas, papéis e acessos por área',`<button class="btn sec" data-a="idExport">Exportar</button><button class="btn pri" data-a="uInvite">${ic('plus',15,2.2)}Adicionar usuário</button>`)}${kp}${tabs}
 <div class="rise" style="--d:3">${S.utab==='scope'?scopeTab():S.utab==='matrix'?matrixTab():usersTab()}</div>`;
}
function usersTab(){const q=norm(S.uq),l=USERS.filter(u=>!q||norm(u.n+' '+u.e+' '+u.role).includes(q));
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="uq" placeholder="Buscar por nome, e-mail ou role" value="${esc(S.uq)}" autocomplete="off"></label></div>
  <div class="trow us thead"><span>Usuário</span><span>Role</span><span>Acesso</span><span>Igrejas</span><span>Último acesso</span><span></span></div>
  ${l.map(u=>{const sc=SCOPES.filter(x=>x.who.split(' ')[0]===u.n.split(' ')[0]);return `<div class="trow us ${u.active?'':'off'}" tabindex="0" data-a="uOpen" data-v="${u.id}"><span class="tn">${uAv(u)}<span class="hn"><b>${esc(u.n)}</b><span>${esc(u.e)}</span></span></span>
   <span class="ts">${rPill(u.role)}</span>
   <span class="uacc">${u.role==='Administrador'?'<span class="soft">Todas as áreas</span>':`<span class="pmini">${AREAS_P.map(a=>`<i class="${u.perm[a].length?(u.perm[a].length>=3?'full':'on'):''}" title="${a}: ${u.perm[a].join(', ')||'sem acesso'}"></i>`).join('')}</span><span>${AREAS_P.filter(a=>u.perm[a].length).length} áreas${sc.length?` · +${sc.length} escopado`:''}</span>`}</span>
   <span class="uig">${u.igs.length} ${u.igs.length>1?'igrejas':'igreja'}</span><span class="ulast">${u.active?u.last:'<span class="soft">Suspenso</span>'}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
  <div class="tfoot"><span>${l.length} usuários</span></div></section>`;}
function scopeTab(owner=null){
 const areas=owner?new Set(idUserAreaRows(owner).map(x=>x.area)):null;
 const byA={};SCOPES.filter(x=>!areas||areas.has(x.area)).forEach(x=>{(byA[x.area]=byA[x.area]||[]).push(x);});
 return `${owner?'':`<p class="fi-note">${ic('info',15)}<span>Acesso restrito a <b>uma área</b> (só o Almoxarifado, só o Louvor…): a pessoa não vê os outros módulos. Quem é <b>Admin</b> da área pode conceder Visualizar ou Editar a outros ali — nunca acima do próprio nível. O acesso global por role fica na <button class="lnk" data-a="uTab" data-v="matrix">Matriz de permissões</button>.</span></p>
 `}
 <div class="sc-g">${Object.entries(byA).map(([a,xs])=>{const canManage=!owner||xs.some(x=>x.who===owner.n&&x.perm==='Admin');const ai=(SAREAS.find(s=>s[0]===a)||[a,'layers'])[1];return `<article class="card sc-c"><div class="sc-h"><span class="sc-ai">${ic(ai,18)}</span><div class="dkt"><b>${esc(a)}</b><span>${xs.length} pessoa${xs.length>1?'s':''} com acesso</span></div>${canManage?`<button class="ibtn sm" data-a="scNew" data-v="${esc(a)}" aria-label="Adicionar acesso em ${esc(a)}" title="Adicionar pessoa">${ic('plus',14,2.2)}</button>`:''}</div>
  ${xs.sort((p,q)=>Object.keys(SPERM).indexOf(q.perm)-Object.keys(SPERM).indexOf(p.perm)).map(x=>`<div class="sc-r" id="${x.id}"><span class="av" style="background:var(--tone-${TONES[x.who.length%6]});color:var(--tone-${TONES[x.who.length%6]}-ink)">${initials(x.who)}</span><span class="dkt"><b>${esc(x.who)}</b><span>${SPERM[x.perm][0]}</span></span>
   ${!canManage||(owner&&x.who===owner.n)?`<span class="who">${x.perm==='Visualizar'?'Ver':x.perm}</span>`:`<div class="sc-seg" role="radiogroup" aria-label="Permissão de ${esc(x.who)}">${Object.keys(SPERM).map(p=>`<button class="${x.perm===p?'on':''}" data-a="scSet" data-v="${x.id}|${p}" style="--c:${SPERM[p][2]};--b:${SPERM[p][3]}" title="${SPERM[p][0]}">${p==='Visualizar'?'Ver':p}</button>`).join('')}</div>`}
   <button class="lnk" data-a="idScopeHistory" data-v="${esc(x.who)}">Histórico</button>${!canManage||(owner&&x.who===owner.n)?'':`<button class="ibtn sm sc-x" data-a="scDel" data-v="${x.id}" aria-label="Remover acesso">${ic('x',13)}</button>`}</div>`).join('')}</article>`;}).join('')}
  ${owner?'':`<button class="cm-badd" data-a="scNew" style="min-height:180px"><span>${ic('plus',20,2)}</span><b>Adicionar acesso</b><small>Área, pessoa e nível</small></button>`}</div>`;}
function matrixTab(){const r=S.mxRole,d=S.mxDraft||(S.mxDraft=JSON.parse(JSON.stringify(RPERM[r]))),dirty=JSON.stringify(d)!==JSON.stringify(RPERM[r]),n=MODS.reduce((a,m)=>a+d[m].length,0),locked=idProtected(r);
 return `<p class="fi-note">${ic('info',15)}<span>Define o acesso <b>global</b> de cada role aos módulos. O nome da role é livre (Tesoureiro, Visualizador…). Acesso a um ministério ou departamento específico fica em <button class="lnk" data-a="uTab" data-v="scope">Acessos por área</button>.</span></p>
 <section class="card mx-c"><div class="mx-roles">${Object.keys(ROLES).map(k=>`<button class="mx-rb ${k===r?'on':''}" data-a="mxRole" data-v="${esc(k)}" style="--c:var(--${ROLES[k][0]})"><i></i><b>${esc(k)}</b><small>${USERS.filter(u=>u.role===k).length} usuário${USERS.filter(u=>u.role===k).length===1?'':'s'}</small></button>`).join('')}<button class="mx-rb new" data-a="mxNew">${ic('plus',14,2.2)}<b>Novo papel</b></button></div>
  <div class="mx-sum" style="--c:var(--${ROLES[r][0]})"><div class="mx-id">${ring(Math.round(n/(MODS.length*ACTS.length)*100),64,`var(--${ROLES[r][0]})`)}<div><b>${esc(r)}</b><span>${n} de ${MODS.length*ACTS.length} permissões</span>${locked?`<small>${ic('lock',11)} Sempre acesso total</small>`:`<small class="ok">${MODS.filter(m=>d[m].length).length} de ${MODS.length} módulos visíveis</small>`}</div></div>
   <div class="mx-acts">${ACTS.map(a=>{const c=MODS.filter(m=>d[m].includes(a)).length;return `<div class="mx-ab"><span><b>${a}</b><em>${c}/${MODS.length}</em></span><span class="mx-abb"><i style="width:${c/MODS.length*100}%"></i></span></div>`;}).join('')}</div>
   ${locked?'':`<div class="mx-pre"><span class="fl">Atalhos</span><div class="mx-pg"><button data-a="mxPre" data-v="all">${ic('check',12,2.6)}Tudo</button><button data-a="mxPre" data-v="ver">${ic('eye',12)}Só ver</button><button data-a="mxPre" data-v="none">${ic('x',12,2.4)}Limpar</button></div></div>`}</div>
  <div class="mx-t ${locked?'locked':''}"><div class="mx-hr"><span>Módulo</span>${ACTS.map(a=>`<button class="mx-col" data-a="mxCol" data-v="${a}" ${locked?'disabled':''} title="Marcar/desmarcar coluna">${a}</button>`).join('')}</div>
   ${MODS.map(m=>`<div class="mx-r ${d[m].length?'':'none'}"><button class="mx-m" data-a="mxRow" data-v="${esc(m)}" ${locked?'disabled':''}>${esc(m)}<small>${d[m].length?d[m].length===4?'acesso total':d[m].join(' · '):'sem acesso'}</small></button>${ACTS.map(a=>`<button class="mx-cell ${d[m].includes(a)?'on':''}" data-a="mxCell" data-v="${esc(m)}|${a}" ${locked?'disabled':''} aria-pressed="${d[m].includes(a)}" aria-label="${esc(m)}: ${a}">${ic('check',14,2.8)}</button>`).join('')}</div>`).join('')}</div>
  <div class="mx-f ${dirty?'dirty':''}"><span>${dirty?`${ic('alert',13,2)}Alterações não salvas`:`${ic('check',13,2.4)}Tudo salvo`}</span><span class="row2"><button class="btn sec" data-a="mxCancel" ${dirty?'':'disabled'}>Cancelar</button><button class="btn pri" data-a="mxSave" ${dirty?'':'disabled'}>Salvar permissões</button></span></div></section>`;}
function userDetail(){
 const u=uById(S.user);if(!u){S.user=null;return usersList();}
 const admin=u.role==='Administrador';
 return `<nav class="crumb rise"><span class="soft">Administração</span>${ic('chevR',13,2)}<button class="lnk back" data-a="uBack">Usuários e permissões</button>${ic('chevR',13,2)}<span>${esc(u.n)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid"><div class="avw">${uAv(u,'xl')}<button class="avedit" data-a="uPhoto" aria-label="Alterar foto">${ic('camera',14)}</button></div><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(u.n)}</h1>${rPill(u.role)}${u.active?'':'<span class="stp" style="--c:var(--st-rec);--b:var(--st-rec-bg)"><i></i>Suspenso</span>'}</div><p>${esc(u.e)} · último acesso ${u.last}</p></div></div>
  <div class="pact">${u.last==='convite enviado'?`<button class="btn sec" data-a="uResendInvite">${ic('mail',15)}Reenviar convite</button>`:''}<button class="btn sec" data-a="uReset">${ic('key',15)}Redefinir senha</button><div style="position:relative"><button class="ibtn" data-a="uMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="uPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="uRole">${ic('shield',17)}Alterar papel</button><button class="pi" data-a="uSusp">${ic(u.active?'pause':'check',17)}${u.active?'Suspender acesso':'Reativar acesso'}</button><hr><button class="pi danger" data-a="uDel">${ic('x',17)}Remover usuário</button></div></div></div></header>
 <div class="pgrid rise" style="--d:2">
  <section class="card pc"><div class="sh"><h2>Permissões em ${esc(gById(u.cur).n)}</h2><span class="who" id="psaved">${admin?'Administrador tem acesso total':'Toque para ligar ou desligar'}</span></div>
   ${admin?`<div class="soft-empty"><p>Acesso total a todas as áreas.</p><span class="who">Para limitar, troque o papel para outro que não seja Administrador.</span></div>`:`<div class="pmx"><div class="pmh"><span>Área</span>${ACTS.map(a=>`<span>${a}</span>`).join('')}</div>
   ${AREAS_P.map(a=>`<div class="pmr ${u.perm[a].length?'':'none'}"><span class="pma">${a}</span>${ACTS.map(x=>`<label class="pmc"><input type="checkbox" data-area="${a}" data-act="${x}" ${u.perm[a].includes(x)?'checked':''} aria-label="${a}: ${x}"><span>${ic('check',13,2.8)}</span></label>`).join('')}</div>`).join('')}</div>
   <p class="who" style="margin:12px 0 0">“Ver” é ligado automaticamente quando outra ação é permitida. As mudanças salvam na hora.</p>`}</section>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Igreja atual</h2><button class="btn sec sm" data-a="uChurch">${ic('swap',14)}Trocar</button></div>
    <div class="dk" style="cursor:default"><span class="dot" style="width:32px;height:32px;border-radius:10px;background:var(--brand);color:var(--on-brand);display:grid;place-items:center;font:700 11px/1 var(--font-text)">${initials(gById(u.cur).n.split(' — ')[0])}</span><span class="dkt"><b>${esc(gById(u.cur).n)}</b><span>As permissões ao lado valem para esta igreja</span></span></div>
    <p class="who" style="margin:12px 0 0">Tem acesso a ${u.igs.length} ${u.igs.length>1?'igrejas':'igreja'}: ${u.igs.map(g=>esc(gById(g).n)).join(', ')}.</p></section>
   <section class="card pc"><div class="sh"><h2>Atividade recente</h2><button class="lnk" data-a="nav" data-v="auditoria">Auditoria ${ic('arrowR',14,2)}</button></div>${(()=>{const l=LOG.filter(x=>x.u===u.n);return l.length?`<ol class="mini-tl">${l.map(x=>`<li><b>${x.a} ${x.e.toLowerCase()} · ${esc(x.x)}</b><span>${dBRs(x.d)} às ${x.t}</span></li>`).join('')}</ol>`:'<p class="who" style="margin:0">Nenhuma ação registrada nos últimos 30 dias.</p>';})()}</section>
  </div></div>`;
}

/* ---------- Multi-igreja ---------- */
function chpDoOpen(v,reason,protocol){S.chp=v;S.chpTab='quem';S.chpEd=null;logAccess(gById(v).n,reason,protocol);render();window.scrollTo({top:0});}
function chpJustify(v){const g=gById(v);
 openDlg(`${dlgHead('Motivo do acesso',`Carregar ${esc(g.n)} como SuperOperator. Fica registrado no Log de acessos, visível ao SuperAdmin.`)}<form id="chpJustF" class="fgrid one" novalidate>${fTa('reason','Motivo','',300,{rows:3,ph:'Por que você está entrando nesta igreja?'})}${fIn('protocol','Protocolo/chamado','',{wide:1,opt:1,ph:'Ex.: SUP-1234'})}<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="chpJustOk" disabled>Entrar</button></div></form>`,'sm');
 const f=$('#chpJustF'),ok=$('#chpJustOk');
 f.addEventListener('input',e=>{ok.disabled=!f.reason.value.trim();if(e.target.matches('textarea[maxlength]')){const em=f.querySelector(`em[data-for="${e.target.name}"]`);if(em)em.textContent=e.target.value.length+'/'+e.target.maxLength;}});
 f.addEventListener('submit',e=>{e.preventDefault();const reason=f.reason.value.trim();if(!reason)return;const protocol=f.protocol.value.trim();closeDlg();chpDoOpen(v,reason,protocol);});
 setTimeout(()=>f.reason.focus(),80);}
function multiList(){
 return `${admHead('Multi-igreja','Redes, igrejas e o perfil de cada uma no app',`${rpBtn('multi','igrejas')}<button class="btn pri" data-a="nAdd">${ic('plus',15,2.2)}Nova rede</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Redes</span><span class="kv">${NETS.length}</span><span class="kd">agrupam igrejas</span></div>
  <div class="k4"><span class="kl">Igrejas</span><span class="kv">${IGREJAS.length}</span><span class="kd">${IGREJAS.filter(g=>!g.rede).length} sem rede</span></div>
  <div class="k4"><span class="kl">Acesso global</span><span class="kv">${new Set(NETS.flatMap(n=>n.glob)).size}</span><span class="kd">usuários veem a rede toda</span></div>
 </section>
 <div class="rgrid2 rise" style="--d:2">${NETS.map(n=>{const gs=IGREJAS.filter(g=>g.rede===n.id);return `<article class="card rc">
  <div class="rc1"><div><b>${esc(n.n)}</b><span>${gs.length} ${gs.length===1?'igreja':'igrejas'} · ${n.glob.length} com acesso global</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="nMenu" data-v="${n.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="nPop-${n.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="netRen" data-v="${n.id}">${ic('pen',16)}Renomear rede</button><button class="pi" data-a="gAdd" data-v="${n.id}">${ic('plus',16)}Adicionar igreja</button><hr><button class="pi danger" data-a="nDel" data-v="${n.id}">${ic('x',16)}Excluir rede</button></div></div></div>
  <div class="glist">${gs.map(g=>{const us=USERS.filter(u=>u.igs.includes(g.id));return `<button class="gi gi-b" data-a="chpOpen" data-v="${g.id}"><span class="dot" style="width:34px;height:34px;border-radius:10px;background:var(--brand-soft);color:var(--brand-text);display:grid;place-items:center">${ic('church',16)}</span><span class="dkt"><b>${esc(g.n)}</b><span>${us.length} usuários · perfil no app ${chpPct(g.id)}%</span></span><span class="stack sm">${us.slice(0,4).map(u=>uAv(u)).join('')}</span><span class="gi-go">${ic('chevR',16)}</span></button>`;}).join('')||'<p class="who" style="margin:0">Nenhuma igreja nesta rede.</p>'}</div>
  <div class="gglob"><span class="fl">Acesso global</span><div class="kmem">${n.glob.map(id=>{const u=uById(id);return u?`<span class="kmc">${uAv(u)}${esc(u.n)}</span>`:'';}).join('')}<button class="kmc add" data-a="nGlob" data-v="${n.id}">${ic('plus',13,2.2)}Adicionar</button></div></div>
 </article>`;}).join('')}</div>`;
}

/* ---------- Auditoria & LGPD ---------- */
function auditPage(){
 const pend=LGPD.filter(x=>x.st==='pendente').length;
 return `${admHead('Auditoria e LGPD','Quem fez o quê, quando, e pedidos de dados pessoais',`<button class="btn sec" data-a="export" data-v="o CSV da auditoria">Exportar CSV</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Ações registradas</span><span class="kv">${LOG.length}</span><span class="kd">nos últimos 7 dias</span></div>
  <div class="k4"><span class="kl">Pedidos LGPD pendentes</span><span class="kv" style="${pend?'color:var(--st-sol)':''}">${pend}</span><span class="kd">${pend?'prazo legal de 15 dias':'nada aguardando'}</span></div>
  <div class="k4"><span class="kl">Pedidos concluídos</span><span class="kv">${LGPD.filter(x=>x.st==='concluido').length}</span><span class="kd">em 2026</span></div>
 </section>
 <div class="utabs rise" style="--d:2">${[['log','Log de auditoria'],['lgpd','LGPD']].map(t=>`<button class="${S.atab===t[0]?'on':''}" data-a="aTab" data-v="${t[0]}">${t[1]}${t[0]==='lgpd'&&pend?` <small class="bdg">${pend}</small>`:''}</button>`).join('')}</div>
 <div id="abody" class="rise" style="--d:3">${S.atab==='log'?aLog():aLgpd()}</div>`;
}
function aLog(){
 const q=norm(S.aq),acts=[...new Set(LOG.map(x=>x.a))];
 const l=LOG.filter(x=>(S.af==='todas'||x.a===S.af)&&(!q||norm(x.u+' '+x.e+' '+x.x).includes(q)));
 const days={};l.forEach(x=>(days[x.d]=days[x.d]||[]).push(x));
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="aq" placeholder="Buscar por usuário ou registro" value="${esc(S.aq)}" autocomplete="off"></label>
  <div class="chips">${[['todas','Todas'],...acts.map(a=>[a,a])].map(c=>`<button class="chipf ${S.af===c[0]?'on':''}" data-a="aFilter" data-v="${c[0]}">${c[0]!=='todas'?`<i style="background:${ACOL[c[0]]}"></i>`:''}${c[1]}</button>`).join('')}</div></div>
  ${l.length?Object.keys(days).sort().reverse().map(d=>`<div class="mgh" style="position:static"><span>${inDays(d)===0?'Hoje':wd(d)+', '+fmtD(d)}</span></div><ol class="alog">${days[d].map(x=>`<li><span class="at">${x.t}</span><span class="adot" style="background:${ACOL[x.a]}"></span><span class="ab"><span><b>${esc(x.u)}</b> <span class="aa" style="color:${ACOL[x.a]}">${x.a.toLowerCase()}</span> ${x.e.toLowerCase()} <b>${esc(x.x)}</b>${x.det?` <span class="soft">· ${esc(x.det)}</span>`:''}</span></span>${x.u==='Sistema'?'<em class="tag">Automático</em>':''}</li>`).join('')}</ol>`).join(''):'<div class="mempty"><p>Nada encontrado.</p><span>Nenhum registro corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>Os registros são mantidos por 5 anos e não podem ser editados.</span></div></section>`;
}
function accRoleLabel(x){
 if(x.role==='SuperAdmin')return 'Super admin';
 if(x.role==='SuperOperator')return 'Super operador';
 const u=USERS.find(u=>u.n===x.actor);
 return u?u.role:'Usuário';
}
function aAccess(){
 const q=norm(S.aaq||''),role=S.aar||'todas';
 const visible=ACCESS_LOG.filter(x=>(role==='todas'||accRoleLabel(x)===role)&&(!q||norm(x.actor+' '+x.target).includes(q)));
 const roles=[...new Set(ACCESS_LOG.map(x=>accRoleLabel(x)))];
 const sig=[q,role].join('|');if(S.aaSig!==sig){S.aaSig=sig;S.aap=1;}
 const pp=8,pages=Math.max(1,Math.ceil(visible.length/pp)),c=S.aap=Math.min(Math.max(1,S.aap||1),pages),st=(c-1)*pp,list=visible.slice(st,st+pp);
 const nums=[];for(let i=1;i<=pages;i++){if(i===1||i===pages||Math.abs(i-c)<=1)nums.push(i);else if(nums[nums.length-1]!=='…')nums.push('…');}
 const pager=pages>1?`<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="aAccPage" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${nums.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="aAccPage" data-v="${i}" aria-current="${i===c?'page':'false'}">${i}</button>`).join('')}<button class="ibtn sm" data-a="aAccPage" data-v="${c+1}" ${c===pages?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`:'';
 return `<section class="card mtab rise" style="--d:1">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="aaq" placeholder="Buscar por pessoa ou organização/igreja" value="${esc(S.aaq||'')}" autocomplete="off"></label>
  <div class="chips">${[['todas','Todas',ACCESS_LOG.length],...roles.map(r=>[r,r,ACCESS_LOG.filter(x=>accRoleLabel(x)===r).length])].map(c=>`<button class="chipf ${role===c[0]?'on':''}" data-a="aAccFilter" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${list.length?`<div class="trow accl thead"><span>Pessoa</span><span>Organização/igreja</span><span>Motivo</span><span>Protocolo</span><span>Quando</span></div>${list.map(x=>`<div class="trow accl"><span class="tn">${admAv(x.actor)}<span class="hn"><b>${esc(x.actor)}</b><small>${accRoleLabel(x)}</small></span></span><span class="adm-l">${esc(x.target)}</span><span>${x.reason?esc(x.reason):'<span class="soft">—</span>'}</span><span>${x.protocol?esc(x.protocol):'<span class="soft">—</span>'}</span><span class="adm-d">${x.at}</span></div>`).join('')}`:'<div class="mempty" style="margin:0 20px 20px"><p>Nada encontrado.</p></div>'}
  <div class="tfoot"><span>${pages>1?`${st+1}–${Math.min(visible.length,st+pp)} de ${visible.length} acessos`:`${visible.length} acesso${visible.length===1?'':'s'}`} · registros mantidos por 5 anos</span>${pager}</div></section>`;
}
function aLgpd(){
 return `<section class="card mtab">
  <div class="trow lg thead"><span>Membro</span><span>Pedido</span><span>Status</span><span>Solicitado</span><span></span></div>
  ${LGPD.map(x=>{const left=15+inDays(x.d);return `<div class="trow lg"><span class="tn"><span class="av" style="background:var(--tone-${x.st==='pendente'?'damasco':'ceu'});color:var(--tone-${x.st==='pendente'?'damasco':'ceu'}-ink)">${initials(x.n)}</span><span><b>${esc(x.n)}</b></span></span>
   <span class="lty">${ic(x.type.startsWith('Exclus')?'x':'share',14)}${x.type}</span>
   <span class="ts">${x.st==='pendente'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>${left<=0?'Vence hoje':'Pendente · '+left+(left>1?' dias':' dia')}</span>`:`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Concluído</span>`}</span>
   <span class="ldt">${dBRs(x.d)}${x.done?`<small>concluído ${dBRs(x.done)}</small>`:''}</span>
   <span class="hma">${x.st==='pendente'?`<button class="btn ${x.type.startsWith('Exclus')?'dang':'pri'} sm" data-a="lProc" data-v="${x.id}">Processar</button>`:`<button class="btn sec sm" data-a="export" data-v="o comprovante do pedido de ${esc(x.n)}">Comprovante</button>`}</span></div>`;}).join('')}
  <div class="tfoot"><span>A LGPD dá 15 dias para responder a cada pedido.</span></div></section>`;
}


/* ---------- Multi-igreja › perfil institucional da igreja ----------
   O que cada igreja personaliza no app: Quem somos (frase, história, valores, números, redes) e Fale com a secretaria. */
Object.assign(I,{
 instagram:'<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
 youtube:'<path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
 facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
 tiktok:'<path d="M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5"/>',
 globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
});
/* redes sociais: lista livre, igual ao Conecte-se do app (nome, perfil e link) */
const SOCT={instagram:['Instagram','instagram.com/'],tiktok:['TikTok','tiktok.com/@'],facebook:['Facebook','facebook.com/'],youtube:['YouTube','youtube.com/@'],x:['X','x.com/'],spotify:['Spotify','open.spotify.com/'],site:['Site',''],outra:['Outra','']};
const SOCI={site:'globe',outra:'link',x:'link',spotify:'music'};
const socIc=t=>SOCI[t]||t;
const SR=(t,n,h,u)=>({t,n,h,u});
const CHP={
 g1:{tagline:'Um lugar para encontrar Deus, crescer em comunidade e ser enviado.',story:'A Igreja Alva nasceu em 2012 com um propósito simples: ser um lugar onde pessoas encontram Deus, crescem em comunidade e são enviadas para transformar o mundo ao redor.\n\nDesde então, vimos centenas de vidas transformadas pelo Evangelho em São Paulo e região.',founded:'2012',stats:true,
  values:['Presença de Deus','Comunidade autêntica','Discipulado intencional','Missão local e global'],
  social:[SR('instagram','Instagram','@igrejaalva','instagram.com/igrejaalva'),SR('tiktok','TikTok','@igrejaalva','tiktok.com/@igrejaalva'),SR('facebook','Facebook','Igreja Alva','facebook.com/igrejaalva')],live:'youtube.com/@igrejaalva/live',
  hours:'Segunda a sexta, das 9h às 18h',wa:'(11) 99123-4455',phone:'(11) 3456-7890',email:'secretaria@alvaigreja.com.br',
  street:'Rua das Acácias, 500',district:'Jardins',city:'São Paulo',sub:'SP',country:'BR',cep:'01404-000',
  requests:['Declaração de membro','Agendar batismo ou casamento','Atualizar cadastro da família','Segunda via de recibo'],
  services:[{d:'Domingo',h:'10h',n:'Culto da família'},{d:'Domingo',h:'18h30',n:'Culto de celebração'},{d:'Quarta',h:'20h',n:'Culto de oração'}]},
 g2:{tagline:'Uma família na Zona Norte, de portas abertas.',story:'',founded:'2019',stats:true,values:['Presença de Deus','Comunidade autêntica'],
  social:[SR('instagram','Instagram Zona Norte','@alvazonanorte','instagram.com/alvazonanorte')],live:'',
  hours:'Terça a sexta, das 14h às 19h',wa:'(11) 98877-1020',phone:'',email:'',
  street:'Av. Cruzeiro do Sul, 1800',district:'Santana',city:'São Paulo',sub:'SP',country:'BR',cep:'02031-000',
  requests:['Declaração de membro'],services:[{d:'Domingo',h:'10h',n:'Culto da família'}]},
 g3:{tagline:'',story:'',founded:'',stats:false,values:[],social:[],live:'',
  hours:'',wa:'',phone:'',email:'',street:'',district:'',city:'Campinas',sub:'SP',country:'BR',cep:'',requests:[],services:[]},
};
const CHP_MEM={g1:1240,g2:380,g3:210},CHP_CASAS={g1:48,g2:12,g3:6};
const chpG=id=>IGREJAS.find(g=>g.id===id);
/* o que conta para "perfil completo", com a aba onde se resolve */
const CHP_CHECK=[['tagline','Frase de apresentação','quem','ap'],['story','História','quem','ap'],['values','Pelo menos 3 valores','quem','val'],['social','Uma rede social','redes','soc'],['contact','WhatsApp ou telefone','sec','at'],['email','E-mail da secretaria','sec','at'],['hours','Horário de atendimento','sec','at'],['street','Endereço','sec','end'],['services','Horário de culto','cultos','cul']];
const chpHas=(c,k)=>k==='values'?c.values.length>=3:k==='social'?c.social.length>0:k==='contact'?!!(c.wa||c.phone):k==='services'?c.services.length>0:!!String(c[k]||'').trim();
const chpMissing=id=>CHP_CHECK.filter(x=>!chpHas(CHP[id],x[0]));
const chpPct=id=>Math.round((CHP_CHECK.length-chpMissing(id).length)/CHP_CHECK.length*100);
const CHP_TABS=[['quem','Quem somos'],['sec','Secretaria'],['redes','Redes e transmissão'],['cultos','Cultos']];
const CHP_DAYS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const fmtTel=v=>{const d=String(v).replace(/\D/g,'').slice(0,11);if(d.length<3)return d;if(d.length<7)return `(${d.slice(0,2)}) ${d.slice(2)}`;return d.length===11?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;};
const socUrl=(t,h)=>{h=String(h||'').trim();if(!h||!SOCT[t]||!SOCT[t][1])return '';return SOCT[t][1]+h.replace(/^@/,'');};

function chpPage(){
 const g=chpG(S.chp),c=CHP[S.chp];if(!g||!c){S.chp=null;return multiList();}
 const net=NETS.find(n=>n.id===g.rede),miss=chpMissing(S.chp),pct=chpPct(S.chp),tab=S.chpTab||'quem';
 const mt=t=>miss.filter(x=>x[2]===t).length;
 return `<nav class="crumb rise" aria-label="Você está em"><span class="soft">Administração</span>${ic('chevR',13,2)}<button class="lnk back" data-a="chpBack">Multi-igreja</button>${ic('chevR',13,2)}<span>${esc(g.n)}</span></nav>
 <header class="card prof cip-h rise" style="--d:1">
  <div class="pid"><span class="cip-ic">${ic('church',22)}</span><div class="pn"><h1>${esc(g.n)}</h1><p>${net?esc(net.n)+' · ':''}${esc(chpPlace(c)||'Cidade não informada')} · aparece no app para ${(CHP_MEM[S.chp]||0).toLocaleString('pt-BR')} membros</p></div></div>
  <div class="pact cip-meter" title="${pct}% do perfil preenchido"><span class="cip-ring" style="--p:${pct}"><b>${pct}%</b></span><span class="cip-mt"><b>${pct===100?'Perfil completo':'Perfil no app'}</b><span>${pct===100?'Tudo o que o app mostra está preenchido':`Falta${miss.length>1?'m':''} ${miss.length} ${miss.length>1?'itens':'item'}`}</span></span></div>
  ${miss.length?`<div class="cip-miss">${miss.map(x=>`<button class="chip" data-a="chpGo" data-v="${x[2]}|${x[3]}">${ic('plus',12,2.4)}${x[1]}</button>`).join('')}</div>`:''}
  <div class="ptabs" role="tablist">${CHP_TABS.map(t=>`<button role="tab" class="${tab===t[0]?'on':''}" aria-selected="${tab===t[0]}" data-a="chpTab" data-v="${t[0]}">${t[1]}${mt(t[0])?`<small class="warn">${mt(t[0])}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="pgrid cip-grid rise" style="--d:2"><div class="col" id="chpBody">${chpBody()}</div>
  <aside class="card cip-prev" aria-label="Como aparece no app"><div class="cip-stage"><div class="cip-fit" id="chpFit"><div class="mv-dev"><div class="mv-ph"><div class="mv-sb" aria-hidden="true"><span>18:40</span><span class="mv-sbi"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1.5 4.5a9.5 9.5 0 0 1 13 0"/><path d="M4 7.2a5.6 5.6 0 0 1 8 0"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/></svg><svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3" stroke="currentColor" opacity=".45"/><rect x="2.5" y="2.5" width="17" height="7" rx="1.5" fill="currentColor"/><rect x="23" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".45"/></svg></span></div>
    <div class="mv-scr" id="chpPrev">${chpPrev(c)}</div>
    <nav class="mv-tabs" aria-hidden="true">${[['home','Início'],['calendar','Agenda'],['users','Grupos'],['book','Cursos'],['dots','Mais']].map((t,i)=>`<span class="${i===4?'on':''}">${ic(t[0],20,1.9)}<b>${t[1]}</b></span>`).join('')}</nav></div></div></div></div></aside></div>`;
}
const chpPvView=()=>(S.chpTab||'quem')==='sec'?'sec':'quem';

/* seção com modo leitura e modo edição (mesmo padrão do perfil do membro) */
function chpSec(k,title,sub,view,form){const ed=S.chpEd===k;
 return `<section class="card pc sec cip-sec ${ed?'editing':''}" id="chs-${k}"><div class="sh"><div><h2>${title}</h2>${sub?`<p class="who" style="margin:4px 0 0">${sub}</p>`:''}</div>${ed?'':`<button class="btn sec sm" data-a="chpEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid cip-f" data-chsec="${k}" novalidate>${form}<div class="dfoot"><button type="button" class="btn sec" data-a="chpCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`:view}</section>`;}
const kvv=(l,v,wide)=>`<div${wide?' class="wide"':''}><dt>${l}</dt><dd>${v?v:'<span class="soft">Não informado</span>'}</dd></div>`;
const fIn=(name,label,val,o={})=>`<label class="fld${o.wide?' wide':''}"><span class="fl">${label}${o.opt?' <small>opcional</small>':''}</span>${o.pre?`<span class="cip-pre"><span>${o.pre}</span><input name="${name}" value="${esc(val||'')}" placeholder="${o.ph||''}" autocomplete="off" ${o.attr||''}></span>`:`<input name="${name}" value="${esc(val||'')}" placeholder="${o.ph||''}" autocomplete="off" ${o.attr||''}>`}${o.hint?`<span class="hint">${o.hint}</span>`:''}<span class="err"></span></label>`;
const fTa=(name,label,val,max,o={})=>`<label class="fld wide"><span class="fl cip-cnt">${label}${o.opt?' <small>opcional</small>':''}<em data-for="${name}">${String(val||'').length}/${max}</em></span><textarea class="ta" name="${name}" maxlength="${max}" rows="${o.rows||3}" placeholder="${o.ph||''}">${esc(val||'')}</textarea>${o.hint?`<span class="hint">${o.hint}</span>`:''}<span class="err"></span></label>`;
/* lista editável: linhas com subir, descer e remover */
function fList(name,label,items,o){return `<div class="fld wide"><span class="fl">${label}${o.max?` <small>até ${o.max}</small>`:''}</span><ol class="cip-list" data-list="${name}" data-max="${o.max||99}">${items.map((v,i)=>fRow(name,v,o)).join('')}</ol><button type="button" class="btn sec sm cip-add" data-a="chpRowAdd" data-v="${name}" ${items.length>=(o.max||99)?'disabled':''}>${ic('plus',14,2.2)}${o.add}</button><span class="err"></span></div>`;}
function fSocRow(v){v=v||SR('instagram','Instagram','','');const T=SOCT[v.t]||SOCT.outra;
 return `<li class="cip-row cip-srow"><div class="cip-sg">
  <label class="fld"><span class="fl">Rede</span><span class="selw"><select name="st">${Object.entries(SOCT).map(([k,x])=>`<option value="${k}" ${k===v.t?'selected':''}>${x[0]}</option>`).join('')}</select>${ic('chevD',14)}</span></label>
  <label class="fld"><span class="fl">Nome no app</span><input name="sn" value="${esc(v.n||'')}" maxlength="28" placeholder="${T[0]}" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Perfil</span><input name="sh" value="${esc(v.h||'')}" maxlength="40" placeholder="@suaigreja" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Link</span><span class="cip-pre"><span>https://</span><input name="su" value="${esc(v.u||'')}" placeholder="${T[1]?T[1]+'suaigreja':'suaigreja.com.br'}" autocomplete="off"></span><span class="err"></span></label>
 </div><span class="cip-ra"><button type="button" class="ibtn sm" data-a="chpRowMv" data-v="-1" aria-label="Subir">${ic('arrowUp',14,2)}</button><button type="button" class="ibtn sm" data-a="chpRowMv" data-v="1" aria-label="Descer">${ic('arrowDn',14,2)}</button><button type="button" class="ibtn sm cip-rm" data-a="chpRowRm" aria-label="Remover">${ic('x',14,2)}</button></span></li>`;}
function fRow(name,v,o){if(name==='social')return fSocRow(v);o=o||CHP_LISTS[name];
 const body=name==='services'?`<span class="selw cip-day"><select name="sd" aria-label="Dia">${CHP_DAYS.map(d=>`<option ${d===(v.d||'Domingo')?'selected':''}>${d}</option>`).join('')}</select>${ic('chevD',14)}</span><input name="sh" value="${esc(v.h||'')}" placeholder="19h30" aria-label="Horário" class="cip-hr"><input name="sn" value="${esc(v.n||'')}" placeholder="Nome do culto" aria-label="Nome do culto">`:`<input name="${name}" value="${esc(v||'')}" placeholder="${o.ph}" aria-label="${o.one}" maxlength="${o.len||60}">`;
 return `<li class="cip-row">${name==='services'?'':'<span class="cip-n"></span>'}${body}<span class="cip-ra"><button type="button" class="ibtn sm" data-a="chpRowMv" data-v="-1" aria-label="Subir">${ic('arrowUp',14,2)}</button><button type="button" class="ibtn sm" data-a="chpRowMv" data-v="1" aria-label="Descer">${ic('arrowDn',14,2)}</button><button type="button" class="ibtn sm cip-rm" data-a="chpRowRm" aria-label="Remover">${ic('x',14,2)}</button></span></li>`;}
const CHP_LISTS={values:{ph:'Ex.: Comunidade autêntica',one:'Valor',len:48,max:6,add:'Adicionar valor'},requests:{ph:'Ex.: Declaração de membro',one:'Pedido',len:60,max:8,add:'Adicionar pedido'},services:{max:10,add:'Adicionar culto'},social:{max:8,add:'Adicionar rede'}};

function chpBody(){const c=CHP[S.chp],t=S.chpTab||'quem';
 if(t==='quem')return chpSec('ap','Apresentação','Abre a tela Quem somos.',
   `<dl class="kv grid">${kvv('Frase de apresentação',c.tagline?esc(c.tagline):'',1)}${kvv('História',c.story?esc(c.story).replace(/\n+/g,'<br><br>'):'',1)}</dl>`,
   `${fTa('tagline','Frase de apresentação',c.tagline,120,{rows:2,ph:'Em uma frase, quem é a igreja',hint:'Aparece em destaque no topo da tela.'})}${fTa('story','História',c.story,900,{rows:6,opt:1,ph:'Como a igreja começou e o que vive hoje',hint:'Deixe uma linha em branco para separar parágrafos.'})}
`)
  +chpSec('num','Números','Os números da igreja que abrem a tela, logo abaixo da história.',
   `<div class="cip-nums ${c.stats?'':'off'}">${chpStats(c).map(x=>`<div><b>${x[0]?esc(x[0]):'—'}</b><span>${x[1]}</span><small>${x[2]}</small></div>`).join('')}</div><p class="who cip-numst">${c.stats?ic('eye',14)+'Aparecem no app':ic('eyeOff',14)+'Ocultos no app'}</p>`,
   `${fIn('founded','Ano de fundação',c.founded,{opt:1,ph:'2012',attr:'inputmode="numeric" maxlength="4"',hint:'Membros, igrejas e Casas vêm do sistema.'})}
    <div class="fld"><span class="fl">No app</span><div class="yn" role="radiogroup" aria-label="Números no app"><label><input type="radio" name="stats" value="1" ${c.stats?'checked':''}><span>Mostrar</span></label><label><input type="radio" name="stats" value="0" ${!c.stats?'checked':''}><span>Ocultar</span></label></div></div>`)
  +chpSec('val','Nossos valores','Lista numerada, na ordem definida aqui.',
   c.values.length?`<ol class="cip-vals">${c.values.map(v=>`<li>${esc(v)}</li>`).join('')}</ol>`:'<div class="soft-empty"><p>Nenhum valor cadastrado.</p><span class="who">Sem valores, a seção não aparece no app.</span></div>',
   fList('values','Valores',c.values,CHP_LISTS.values));
 if(t==='sec')return chpSec('at','Atendimento','Tela Fale com a secretaria.',
   `<dl class="kv grid">${kvv('Horário de atendimento',esc(c.hours),1)}${kvv('WhatsApp',esc(c.wa))}${kvv('Telefone',esc(c.phone))}${kvv('E-mail',esc(c.email),1)}</dl>`,
   `${fIn('hours','Horário de atendimento',c.hours,{wide:1,ph:'Segunda a sexta, das 9h às 18h'})}${fIn('wa','WhatsApp',c.wa,{ph:'(11) 99999-9999',attr:'inputmode="tel" data-tel',hint:'Abre a conversa pelo botão do app.'})}${fIn('phone','Telefone',c.phone,{opt:1,ph:'(11) 3333-3333',attr:'inputmode="tel" data-tel'})}${fIn('email','E-mail',c.email,{wide:1,ph:'secretaria@suaigreja.com.br',attr:'type="email" inputmode="email"'})}`)
  +chpSec('end','Endereço','Também aparece em Onde estamos.',
   `<dl class="kv grid">${kvv('Rua e número',esc(c.street),1)}${kvv('Bairro',esc(c.district))}${kvv('CEP',esc(c.cep))}${kvv('Cidade',esc(c.city))}${kvv(NX_COUNTRIES[c.country||'BR'].div,esc(chpPlace({city:'',sub:c.sub,country:c.country})))}${kvv('País',esc(NX_COUNTRIES[c.country||'BR'].n))}</dl>`,
   `${fIn('street','Rua e número',c.street,{wide:1,ph:'Rua das Acácias, 500'})}${fIn('district','Bairro',c.district,{ph:'Jardins'})}${(c.country||'BR')==='BR'?fIn('cep','CEP',c.cep,{opt:1,ph:'00000-000',attr:'inputmode="numeric" maxlength="9" data-cep'}):fIn('cep','Código postal',c.cep,{opt:1,ph:'',attr:'maxlength="12"'})}${fIn('city','Cidade',c.city,{ph:'São Paulo'})}<label class="fld"><span class="fl">${NX_COUNTRIES[c.country||'BR'].div}</span><span class="selw"><select name="sub">${nxSubOpts(c.country||'BR',c.sub)}</select>${ic('updown',14)}</span></label><label class="fld wide"><span class="fl">País</span><input value="${esc(NX_COUNTRIES[c.country||'BR'].n)}" disabled><span class="hint">Definido ao criar a igreja. Não muda depois que a igreja tem dados, porque define a moeda e as divisões do endereço.</span></label>`)
  +chpSec('req','Pedidos mais comuns','Atalhos que o membro toca para pedir algo à secretaria.',
   c.requests.length?`<ul class="cip-reqs">${c.requests.map(v=>`<li>${esc(v)}${ic('chevR',14,2)}</li>`).join('')}</ul>`:'<div class="soft-empty"><p>Nenhum pedido cadastrado.</p><span class="who">Sem pedidos, a lista não aparece no app.</span></div>',
   fList('requests','Pedidos',c.requests,CHP_LISTS.requests));
 if(t==='redes')return chpSec('soc','Redes sociais','Aparecem em Conecte-se, na ordem definida aqui. O nome é o que o membro vê no app; sem link, ele é montado a partir do perfil.',
   c.social.length?`<div class="cip-socv">${c.social.map(x=>`<div><span class="cip-si">${ic(socIc(x.t),16)}</span><span><b>${esc(x.n)}</b><small>${esc(x.h||x.u)}</small></span></div>`).join('')}</div>`:'<div class="soft-empty"><p>Nenhuma rede cadastrada.</p><span class="who">Sem redes, a seção Conecte-se não aparece no app.</span></div>',
   fList('social','Redes',c.social,CHP_LISTS.social))
  +`<section class="card pc sec cip-sec"><div class="sh"><div><h2>Transmissão ao vivo</h2><p class="who" style="margin:4px 0 0">Os canais e horários de transmissão são gerenciados em Comunicação › Transmissões.</p></div></div><button class="lnk" data-a="nav" data-v="transmissoes">Ir para Transmissões ${ic('arrowR',14,2)}</button></section>`;
 return chpSec('cul','Horários de culto','Aparecem em Onde estamos e na tela da igreja.',
   c.services.length?`<ul class="cip-svc">${c.services.map(v=>`<li><b>${esc(v.d)}</b><span>${esc(v.h)}</span><small>${esc(v.n)}</small></li>`).join('')}</ul>`:'<div class="soft-empty"><p>Nenhum horário de culto.</p><span class="who">Cadastre ao menos um para o app mostrar quando a igreja se reúne.</span></div>',
   fList('services','Cultos',c.services,CHP_LISTS.services));
}

/* ---------- prévia do app ---------- */
const chpSvcLine=c=>{if(!c.services.length)return 'horários a definir';const by={};c.services.forEach(v=>(by[v.d]=by[v.d]||[]).push(v.h));return Object.entries(by).map(([d,h])=>`${d.toLowerCase()}s ${h.join(' e ')}`).join(' · ');};
function chpStats(c){const g=chpG(S.chp),net=IGREJAS.filter(x=>x.rede===g.rede),rn=(NETS.find(n=>n.id===g.rede)||{}).n||'rede';
 return [[c.founded,'fundação','Informado pela igreja'],[(CHP_MEM[S.chp]||0).toLocaleString('pt-BR'),'membros','Do cadastro de membros'],[String(net.length),net.length>1?'igrejas':'igreja','Igrejas da '+rn],[String(CHP_CASAS[S.chp]||0),'Casas ativas','Do módulo Casas']];}
function chpPrev(c){const g=chpG(S.chp),ph=v=>`<span class="mv-ph-tx">${v}</span>`;
 const head=(t,lede)=>`<header class="mv-sub"><span class="mv-ib">${ic('chevL',20,2.25)}</span><h1>${t}</h1>${lede?`<p class="mv-lede">${lede}</p>`:''}</header>`;
 if(chpPvView()==='sec'){
  const rows=[c.phone||c.wa?['Telefone',c.phone||c.wa,1]:null,c.email?['E-mail',c.email,1]:null].filter(Boolean);
  return `${head('Fale com a secretaria',c.hours?'Atendimento: '+esc(c.hours).replace(/^./,m=>m.toLowerCase())+'.':ph('Horário de atendimento'))}<div class="mv-body">
   ${c.wa?`<span class="mv-btn">Chamar no WhatsApp</span>`:''}
   <div class="mv-kv">${rows.map(r=>`<div class="mv-kr"><span class="mv-kl"><small>${r[0]}</small><b>${esc(r[1])}</b></span><i>Copiar</i></div>`).join('')}<div class="mv-kr mv-st"><small>Endereço</small><b>${c.street?esc(c.street)+(c.district?' · '+esc(c.district):''):ph('Endereço')}</b>${chpPlace(c)?`<span>${esc(chpPlace(c))}</span>`:''}</div></div>
   ${c.requests.length?`<section class="mv-sec"><p class="mv-eb">Pedidos mais comuns</p><div class="mv-list">${c.requests.map(r=>`<div class="mv-it"><b class="mv-it-t" style="font-weight:500">${esc(r)}</b>${ic('chevR',18,2)}</div>`).join('')}</div></section>`:''}
  </div>`;}
 const net=IGREJAS.filter(x=>x.rede===g.rede);
 const stats=chpStats(c).filter(x=>x[0]);
 const paras=String(c.story||'').split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
 return `${head('Quem somos')}<div class="mv-body">
  <div class="mv-hero"><p>${c.tagline?esc(c.tagline):ph('Sua frase de apresentação aparece aqui.')}</p></div>
  ${paras.length?`<div class="mv-story">${paras.map((p,i)=>`<p${i?'':' class="on"'}>${esc(p)}</p>`).join('')}</div>`:''}
  ${c.stats&&stats.length?`<div class="mv-stats">${stats.map(x=>`<div><b>${esc(x[0])}</b><span>${x[1]}</span></div>`).join('')}</div>`:''}
  ${c.values.length?`<section class="mv-sec"><p class="mv-eb">Nossos valores</p><ol class="mv-steps">${c.values.map(v=>`<li>${esc(v)}</li>`).join('')}</ol></section>`:''}
  ${c.social.length?`<section class="mv-sec" data-pv="redes"><p class="mv-eb">Conecte-se</p><div class="mv-socs">${c.social.map(x=>`<div class="mv-soc"><span class="mv-sa">${ic('arrowR',16,2)}</span><b>${esc(x.n)}</b><span>${esc(x.h||x.u)}</span></div>`).join('')}</div></section>`:''}
  <section class="mv-sec" data-pv="cultos"><p class="mv-eb">Onde estamos</p><div class="mv-list">${net.map(x=>{const cc=CHP[x.id];return `<div class="mv-it"><span class="mv-ibx">${ic('church',20,1.9)}</span><span class="mv-it-b"><b class="mv-it-t">${esc(x.n)}</b><span class="mv-it-s">${esc(chpPlace(cc)||'')}${chpPlace(cc)?' · ':''}${chpSvcLine(cc)}</span></span></div>`;}).join('')}</div></section>
 </div>`;}
/* encaixa o aparelho (406×860) na coluna e na altura da janela, sem distorcer as medidas do app */
function chpFit(){const f=$('#chpFit');if(!f)return;const card=f.closest('.cip-prev'),grid=card.parentElement,cs=getComputedStyle(card),px=parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight),py=parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom),wide=matchMedia('(min-width:1024px)').matches;
 /* o aparelho aparece sempre inteiro: cabe na altura que sobra abaixo do topo do card (sem rolar) e a coluna acompanha a largura dele */
 const top=wide?card.getBoundingClientRect().top+scrollY:0,h=innerHeight-(wide?top+24:96)-py,w=wide?380-px:card.clientWidth-px;
 const k=Math.max(.4,Math.min(1,w/406,h/860));f.style.setProperty('--k',k.toFixed(4));grid.style.setProperty('--pcol',Math.round(406*k+px)+'px');}
if(!window._chpFitOn){window._chpFitOn=1;addEventListener('resize',()=>chpFit());}
/* lê o formulário aberto sem salvar (para a prévia ao vivo e para salvar) */
function chpRead(f){const k=f.dataset.chsec,c=JSON.parse(JSON.stringify(CHP[S.chp])),v=n=>(f.querySelector(`[name="${n}"]`)?.value||'').trim();
 if(k==='ap'){c.tagline=v('tagline');c.story=f.querySelector('[name=story]').value.trim();}
 if(k==='num'){c.founded=v('founded');c.stats=f.querySelector('[name=stats]:checked')?.value==='1';}
 if(k==='val'||k==='req'){const n=k==='val'?'values':'requests';c[n]=$$(`[name="${n}"]`,f).map(i=>i.value.trim()).filter(Boolean);}
 if(k==='at'){c.hours=v('hours');c.wa=v('wa');c.phone=v('phone');c.email=v('email');}
 if(k==='end'){c.street=v('street');c.district=v('district');c.cep=v('cep');c.city=v('city');c.sub=v('sub');}
 if(k==='soc')c.social=$$('.cip-srow',f).map(r=>{const g=n=>r.querySelector(`[name=${n}]`).value.trim(),t=g('st');return SR(t,g('sn'),g('sh'),g('su').replace(/^https?:\/\//,'').replace(/\/+$/,'')||socUrl(t,g('sh')));}).filter(x=>x.n||x.h||x.u);
 if(k==='cul')c.services=$$('.cip-row',f).map(r=>({d:r.querySelector('[name=sd]').value,h:r.querySelector('[name=sh]').value.trim(),n:r.querySelector('[name=sn]').value.trim()})).filter(x=>x.h||x.n);
 return c;}
const chpPaint=c=>{const p=$('#chpPrev');if(p){const y=p.scrollTop;p.innerHTML=chpPrev(c||CHP[S.chp]);p.scrollTop=y;}};
function chpRows(f){$$('.cip-list',f).forEach(l=>{const rows=$$('.cip-row',l),max=+l.dataset.max;rows.forEach((r,i)=>{const n=r.querySelector('.cip-n');if(n)n.textContent=i+1;r.querySelector('[data-v="-1"]').disabled=i===0;r.querySelector('[data-v="1"]').disabled=i===rows.length-1;});const add=l.parentElement.querySelector('.cip-add');if(add)add.disabled=rows.length>=max;});}
function chpErr(f,name,msg){const i=f.querySelector(`[name="${name}"]`),fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=msg;i.focus();return false;}
function chpValid(f){const k=f.dataset.chsec,v=n=>(f.querySelector(`[name="${n}"]`)?.value||'').trim();
 if(k==='num'){if(v('founded')&&!(/^\d{4}$/.test(v('founded'))&&+v('founded')>=1800&&+v('founded')<=2026))return chpErr(f,'founded','Use um ano entre 1800 e 2026');}
 if(k==='at'){const d=x=>x.replace(/\D/g,'').length;if(v('wa')&&d(v('wa'))<10)return chpErr(f,'wa','Informe DDD e número');if(v('phone')&&d(v('phone'))<10)return chpErr(f,'phone','Informe DDD e número');if(v('email')&&!/^\S+@\S+\.\S+$/.test(v('email')))return chpErr(f,'email','E-mail inválido');}
 if(k==='end'){if(v('cep')&&v('cep').replace(/\D/g,'').length!==8)return chpErr(f,'cep','CEP tem 8 números');}
 if(k==='soc'){for(const r of $$('.cip-srow',f)){const g=n=>r.querySelector(`[name=${n}]`),t=g('st').value,has=['sn','sh','su'].some(n=>g(n).value.trim());if(!has)continue;const bad=(i,m)=>{const fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;i.focus();return false;};
  if(!g('sn').value.trim())return bad(g('sn'),'Dê um nome para a rede');if(!g('sh').value.trim()&&!g('su').value.trim())return bad(g('sh'),'Informe o perfil ou o link');if(!g('su').value.trim()&&!SOCT[t][1])return bad(g('su'),'Cole o link');if(/\s/.test(g('su').value.trim()))return bad(g('su'),'O link não pode ter espaços');}}
 if(k==='cul'){const r=$$('.cip-row',f).find(r=>{const h=r.querySelector('[name=sh]').value.trim(),n=r.querySelector('[name=sn]').value.trim();return (h||n)&&!h;});if(r){const i=r.querySelector('[name=sh]'),fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Informe o horário de cada culto';i.focus();return false;}}
 return true;}
function chpAfter(){
 requestAnimationFrame(()=>typeof tabInd==='function'&&tabInd());
 chpFit();const pv=$('#chpPrev'),an=pv&&pv.querySelector(`[data-pv="${S.chpTab||'quem'}"]`);if(pv)pv.scrollTop=an?Math.max(0,an.offsetTop-110):0;
 const f=$('form[data-chsec]');if(!f)return;chpRows(f);
 const sb=f.querySelector('[type=submit]'),orig=JSON.stringify(chpRead(f));
 const upd=()=>{const c=chpRead(f);sb.disabled=JSON.stringify(c)===orig;chpPaint(c);};sb.disabled=true;
 f.addEventListener('input',e=>{const t=e.target;t.closest('.fld')?.classList.remove('bad');
  if(t.matches('[data-tel]')){const p=t.selectionStart===t.value.length;t.value=fmtTel(t.value);if(p)t.setSelectionRange(t.value.length,t.value.length);}
  if(t.matches('[data-cep]')){const d=t.value.replace(/\D/g,'').slice(0,8);t.value=d.length>5?d.slice(0,5)+'-'+d.slice(5):d;}
  if(t.matches('textarea[maxlength]')){const em=f.querySelector(`em[data-for="${t.name}"]`);if(em)em.textContent=t.value.length+'/'+t.maxLength;}
  upd();});
 f.addEventListener('change',e=>{const t=e.target;if(t.name==='st'){const r=t.closest('.cip-srow'),n=r.querySelector('[name=sn]'),T=SOCT[t.value],old=Object.values(SOCT).map(x=>x[0]);if(!n.value.trim()||old.includes(n.value.trim()))n.value=T[0];n.placeholder=T[0];r.querySelector('[name=su]').placeholder=T[1]?T[1]+'suaigreja':'suaigreja.com.br';}upd();});
 f.addEventListener('cip-rows',upd);
 f.addEventListener('submit',e=>{e.preventDefault();if(!chpValid(f))return;const c=chpRead(f),k=f.dataset.chsec;
  busy(sb,700,'Salvo',()=>{CHP[S.chp]=c;S.chpEd=null;const y=window.scrollY;render();window.scrollTo(0,y);toast(({ap:'Apresentação atualizada no app',num:'Números atualizados no app',val:'Valores atualizados no app',at:'Atendimento atualizado no app',end:'Endereço atualizado no app',req:'Pedidos atualizados no app',soc:'Redes sociais atualizadas no app',cul:'Horários de culto atualizados no app'})[k]);
   const s=$('#chs-'+k);if(s)s.animate([{boxShadow:'0 0 0 2px var(--brand)'},{boxShadow:'var(--shadow-card)'}],{duration:1200,easing:'ease-out'});});});
 const first=f.querySelector('input:not([type=radio]),textarea');if(first&&!S._chpNoFocus)setTimeout(()=>first.focus({preventScroll:true}),60);S._chpNoFocus=0;
}
const chpRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const CPA={
 netRen:v=>{closePops();const n=NETS.find(x=>x.id===v);openDlg(`${dlgHead('Renomear rede','O nome aparece no seletor de igrejas e no painel.')}<form class="fgrid one" id="nrF" novalidate><label class="fld"><span class="fl">Nome da rede</span><input name="v" value="${esc(n.n)}" maxlength="40" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Salvar</button></div></form>`,'sm');
  const f=$('#nrF'),i=f.querySelector('input'),sb=f.querySelector('[type=submit]');setTimeout(()=>i.select(),80);i.addEventListener('input',()=>{i.closest('.fld').classList.remove('bad');sb.disabled=i.value.trim()===n.n;});
  f.addEventListener('submit',e=>{e.preventDefault();const x=i.value.trim();if(!x){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome para a rede';i.focus();return;}if(NETS.some(o=>o!==n&&norm(o.n)===norm(x))){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Já existe uma rede com esse nome';i.focus();return;}const old=n.n;busy(sb,500,'Salvo',()=>{n.n=x;closeDlg();chpRe();toast(`Rede renomeada para ${x}`,()=>{n.n=old;chpRe();});});});},
 chpOpen:v=>{if(S.platformRole==='SuperOperator'){chpJustify(v);return;}chpDoOpen(v);},
 chpBack:()=>{S.chp=null;S.chpEd=null;render();window.scrollTo({top:0});},
 chpTab:v=>{S.chpTab=v;S.chpEd=null;S.chpPv=null;chpRe();},
 chpGo:v=>{const [t,k]=v.split('|');S.chpTab=t;S.chpEd=k;S.chpPv=null;render();const s=$('#chs-'+k);if(s){const y=s.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:y,behavior:'smooth'});}},
 chpEdit:v=>{S.chpEd=v;chpRe();},
 chpCancel:()=>{S.chpEd=null;chpRe();},
 chpRowAdd:(v,b)=>{const l=b.parentElement.querySelector('.cip-list'),f=b.closest('form');if($$('.cip-row',l).length>=+l.dataset.max)return;l.insertAdjacentHTML('beforeend',fRow(v,v==='services'?{d:'Domingo',h:'',n:''}:v==='social'?null:''));chpRows(f);const r=l.lastElementChild;r.querySelector('input').focus();f.dispatchEvent(new Event('cip-rows'));},
 chpRowMv:(v,b)=>{const r=b.closest('.cip-row'),f=b.closest('form');if(+v<0&&r.previousElementSibling)r.parentElement.insertBefore(r,r.previousElementSibling);else if(+v>0&&r.nextElementSibling)r.parentElement.insertBefore(r.nextElementSibling,r);chpRows(f);b.focus();f.dispatchEvent(new Event('cip-rows'));},
 chpRowRm:(v,b)=>{const r=b.closest('.cip-row'),f=b.closest('form'),l=r.parentElement;r.remove();chpRows(f);(l.querySelector('.cip-row:last-child input')||f.querySelector('.cip-add'))?.focus();f.dispatchEvent(new Event('cip-rows'));},
};

const admRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const mxRe=()=>{const y=window.scrollY;const w=$('.mx-c');if(w){const t=document.createElement('div');t.innerHTML=matrixTab();w.replaceWith(t.querySelector('.mx-c'));}window.scrollTo(0,y);};
function admAfter(){
 if(S.active==='multi'&&S.chp)chpAfter();
 const uq=$('#uq');if(uq)uq.addEventListener('input',e=>{S.uq=e.target.value;const p=e.target.selectionStart;render();const n=$('#uq');n.focus();n.setSelectionRange(p,p);});
 $$('[id^="flagPilotQ-"]').forEach(inp=>inp.addEventListener('input',e=>{const i=e.target.dataset.fi;S.flagPilotQ=S.flagPilotQ||{};S.flagPilotQ[i]=e.target.value;const p=e.target.selectionStart;render();const n=$('#flagPilotQ-'+i);if(n){n.focus();n.setSelectionRange(p,p);}}));
 const aq=$('#aq');if(aq)aq.addEventListener('input',e=>{S.aq=e.target.value;const p=e.target.selectionStart;$('#abody').innerHTML=aLog();admAfter();const n=$('#aq');n.focus();n.setSelectionRange(p,p);});
 const aaq=$('#aaq');if(aaq)aaq.addEventListener('input',e=>{S.aaq=e.target.value;const p=e.target.selectionStart;$('#abody').innerHTML=aAccess();admAfter();const n=$('#aaq');n.focus();n.setSelectionRange(p,p);});
 $$('.pmc input').forEach(i=>i.addEventListener('change',()=>{const u=uById(S.user),a=i.dataset.area,x=i.dataset.act;let p=u.perm[a];
  if(i.checked){if(!p.includes(x))p.push(x);if(x!=='Ver'&&!p.includes('Ver'))p.push('Ver');}else{p=p.filter(v=>v!==x);if(x==='Ver')p=[];}u.perm[a]=ACTS.filter(v=>p.includes(v));
  const row=i.closest('.pmr');row.querySelectorAll('input').forEach(c=>c.checked=u.perm[a].includes(c.dataset.act));row.classList.toggle('none',!u.perm[a].length);
  const s=$('#psaved');s.innerHTML=`${ic('check',13,2.4)} Salvo`;s.style.color='var(--st-int)';clearTimeout(window._ps);window._ps=setTimeout(()=>{s.textContent='Toque para ligar ou desligar';s.style.color='';},1500);
  LOG.unshift({u:'Rafael Pereira',a:'Alterou',e:'Permissões de',x:u.n,det:`${a}: ${u.perm[a].join(', ')||'sem acesso'}`,d:'2026-09-30',t:new Date().toTimeString().slice(0,5)});}));
}
const AA={
 uOpen:v=>{S.user=v;render();window.scrollTo({top:0});},
 uBack:()=>{S.user=null;render();},
 uMenu:()=>{const p=$('#uPop');closePops(p);p.classList.toggle('open');},
 uPhoto:()=>toast('Envio de foto: em breve no protótipo'),
 uReset:(v,b)=>busy(b,900,'Link enviado',()=>toast(`Link de redefinição enviado para ${uById(S.user).e}`)),
 uChurch:()=>{const u=uById(S.user);openDlg(`${dlgHead('Trocar de igreja','As permissões mostradas passam a ser as desta igreja.')}<div class="pick">${u.igs.map(g=>`<label class="pk"><span class="dot" style="width:32px;height:32px;border-radius:10px;background:var(--brand-soft);color:var(--brand-text);display:grid;place-items:center;flex:none">${ic('church',15)}</span><span><b>${esc(gById(g).n)}</b><small>${g===u.cur?'Atual':'Tem acesso'}</small></span><input type="radio" name="ig" value="${g}" ${g===u.cur?'checked':''}></label>`).join('')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="uDoChurch">Trocar</button></div>`,'sm');},
 uDoChurch:()=>{const u=uById(S.user),g=$('input[name=ig]:checked').value;closeDlg();if(g===u.cur)return;u.cur=g;render();toast(`Agora vendo ${gById(g).n}`);},
 uRole:()=>{closePops();const u=uById(S.user);openDlg(`${dlgHead('Alterar papel',esc(u.n))}<div class="vis">${Object.keys(ROLES).map(r=>`<label><input type="radio" name="rl" value="${r}" ${u.role===r?'checked':''}><span><b>${r}</b><small>${{Administrador:'Acesso total a todas as áreas e igrejas.',Pastor:'Cuidado pastoral, membros e comunidade.',Líder:'Casas, ministérios e escalas sob sua liderança.',Secretaria:'Cadastros, integração e eventos.',Voluntário:'Só o que for liberado por área.'}[r]}</small></span></label>`).join('')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="uDoRole">Salvar</button></div>`,'sm');},
 uDoRole:()=>{const u=uById(S.user),r=$('input[name=rl]:checked').value;closeDlg();if(r===u.role)return;const old=u.role;u.role=r;if(r==='Administrador')u.perm=JSON.parse(JSON.stringify(ALL));render();toast(`${u.n.split(' ')[0]} agora é ${r}`,()=>{u.role=old;render();});},
 uSusp:()=>{closePops();const u=uById(S.user);if(!u.active){u.active=true;render();toast('Acesso reativado');return;}confirmDel({title:`Suspender o acesso de ${u.n.split(' ')[0]}?`,body:'A pessoa sai do painel na hora e não consegue entrar até você reativar. Permissões e histórico ficam guardados.',label:'Suspender acesso',onConfirm:()=>{u.active=false;render();toast('Acesso suspenso');}});},
 uDel:()=>{closePops();const u=uById(S.user);confirmDel({title:`Remover ${u.n} do painel?`,body:'O acesso e todas as permissões são apagados. O cadastro de membro e o histórico de auditoria continuam.',label:'Remover usuário',typed:u.n.split(' ')[0],onConfirm:()=>{USERS.splice(USERS.indexOf(u),1);S.user=null;render();toast(`${u.n} removido(a) do painel`);}});},
 uInvite:()=>{const cands=[...new Map(MEMBERS.filter(m=>m.tit&&m.e&&!USERS.some(u=>u.e===m.e)).map(m=>[m.n,m])).values()];
  openDlg(`${dlgHead('Adicionar usuário','Precisa ser um membro cadastrado. Ele recebe um e-mail para criar a senha.')}<form class="fgrid one" id="uiF" novalidate>
   <div class="fld"><span class="fl">Membro</span><label class="sbox" style="height:40px">${ic('search',15)}<input id="uiQ" placeholder="Buscar membro" autocomplete="off"></label><div class="pick ui-pick" id="uiP"></div><span class="err"></span></div>
   <label class="fld"><span class="fl">E-mail</span><span class="cm-pre">${ic('mail',14)}<input name="e" readonly placeholder="Escolha um membro" tabindex="-1"></span><span class="hint">Vem do cadastro do membro — para mudar, edite em Membros.</span></label>
   <div class="fld"><span class="fl">Role</span><div class="ui-roles">${Object.keys(ROLES).map((r,i)=>`<label><input type="radio" name="role" value="${r}" ${r==='Voluntário'?'checked':''}><span style="--c:var(--${ROLES[r][0]})"><i></i><b>${r}</b><small>${MODS.filter(m=>RPERM[r]&&RPERM[r][m].length).length} módulos</small></span></label>`).join('')}</div></div>
   <div class="fld"><span class="fl">Igrejas da rede</span><div class="ui-chs">${CHURCHES.map((c,i)=>`<label><input type="checkbox" name="ig" value="g${i+1}" ${!i?'checked':''}><span>${chTile(c,28)}<b>${esc(c.n)}</b><i class="cb">${ic('check',11,3)}</i></span></label>`).join('')}</div><span class="err"></span></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="uiOk" disabled>Adicionar</button></div></form>`,'lg');
  const f=$('#uiF');let sel=null;const draw=q=>{q=norm(q||'');$('#uiP').innerHTML=cands.filter(m=>norm(m.n).includes(q)).slice(0,5).map(m=>`<label class="pk ${sel===m?'on':''}">${mav(m)}<span><b>${esc(m.n)}</b><small>${esc(m.e)}</small></span><input type="radio" name="pm" value="${m.id}" ${sel===m?'checked':''}></label>`).join('')||'<p class="who" style="padding:10px">Nenhum membro encontrado.</p>';};draw();
  $('#uiQ').addEventListener('input',e=>draw(e.target.value));
  $('#uiP').addEventListener('change',e=>{sel=MEMBERS.find(m=>m.id===e.target.value);f.e.value=sel.e;$('#uiOk').disabled=false;$$('#uiP .pk').forEach(l=>l.classList.toggle('on',l.querySelector('input').checked));});
  f.addEventListener('submit',e=>{e.preventDefault();if(!sel)return;const igs=[...f.querySelectorAll('[name=ig]:checked')].map(x=>x.value);if(!igs.length){const fl=$('.ui-chs').closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha ao menos uma igreja';return;}
   $('#uiOk').classList.add('busy');setTimeout(()=>{const r=f.querySelector('[name=role]:checked').value;USERS.push(U(sel.n,sel.e,r,igs,r==='Administrador'?JSON.parse(JSON.stringify(ALL)):PM({}),'convite enviado',sel.tone||'menta'));closeDlg();S.utab='users';render();toast(`${sel.n.split(' ')[0]} adicionado · convite enviado para ${sel.e}`);},800);});},
 uTab:v=>{if(S.utab==='matrix'&&S.mxDraft&&JSON.stringify(S.mxDraft)!==JSON.stringify(RPERM[S.mxRole])&&v!=='matrix'){confirmDel({title:'Descartar alterações?',body:`As mudanças na role ${esc(S.mxRole)} não foram salvas.`,label:'Descartar',onConfirm:()=>{S.mxDraft=null;S.utab=v;admRe();}});return;}S.utab=v;admRe();},
 scSet:v=>{const [id,p]=v.split('|'),x=SCOPES.find(z=>z.id===id);if(x.perm===p)return;const old=x.perm;x.perm=p;admRe();toast(`${x.who.split(' ')[0]}: ${p} em ${x.area}`,()=>{x.perm=old;admRe();});},
 scDel:v=>{const x=SCOPES.find(z=>z.id===v);confirmDel({title:'Remover este acesso?',body:`${esc(x.who)} deixa de ver ${esc(x.area)}.`,label:'Remover',onConfirm:()=>{const i=SCOPES.indexOf(x);SCOPES.splice(i,1);admRe();toast('Acesso removido',()=>{SCOPES.splice(i,0,x);admRe();});}});},
 scNew:v=>{const ppl=[...new Set(MEMBERS.filter(m=>m.tit).map(m=>m.n))].sort();openDlg(`${dlgHead('Adicionar acesso','A pessoa só vê a área escolhida.')}<form id="scF" class="fgrid one" novalidate>
   <div class="fld"><span class="fl">Área</span><div class="sc-ap">${SAREAS.map(a=>`<label><input type="radio" name="a" value="${esc(a[0])}" ${a[0]===(v||SAREAS[0][0])?'checked':''}><span>${ic(a[1],15)}${esc(a[0])}</span></label>`).join('')}</div></div>
   <label class="fld"><span class="fl">Pessoa</span><span class="selw"><select name="w"><option value="">Escolha…</option>${ppl.map(n=>`<option>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="err"></span></label>
   <div class="fld"><span class="fl">Nível nesta área</span><div class="sc-lv">${Object.entries(SPERM).map(([k,x],i)=>`<label><input type="radio" name="p" value="${k}" ${i?'':'checked'}><span style="--c:${x[2]};--b:${x[3]}"><i>${ic(x[1],15)}</i><b>${k}</b><small>${x[0]}</small></span></label>`).join('')}</div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="scOk" disabled>Adicionar acesso</button></div></form>`);
  const f=$('#scF'),ok=$('#scOk');const chk=()=>{const a=f.querySelector('[name=a]:checked').value,w=f.w.value,dup=w&&SCOPES.some(x=>x.area===a&&x.who===w);f.w.closest('.fld').classList.toggle('bad',!!dup);f.w.closest('.fld').querySelector('.err').textContent=dup?'Essa pessoa já tem acesso a essa área':'';ok.disabled=!w||dup;};f.addEventListener('change',chk);chk();
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const x=SC(f.querySelector('[name=a]:checked').value,f.w.value,f.querySelector('[name=p]:checked').value);SCOPES.push(x);closeDlg();admRe();setTimeout(()=>{const el=document.getElementById(x.id);el&&el.classList.add('sc-new');},30);toast(`${x.who.split(' ')[0]} agora acessa ${x.area}`);},600);});},
 mxRole:v=>{const go=()=>{S.mxRole=v;S.mxDraft=null;admRe();};if(S.mxDraft&&JSON.stringify(S.mxDraft)!==JSON.stringify(RPERM[S.mxRole])){confirmDel({title:'Descartar alterações?',body:`As mudanças na role ${esc(S.mxRole)} não foram salvas.`,label:'Descartar',onConfirm:go});return;}go();},
 mxCell:(v,b)=>{const [m,a]=v.split('|'),d=S.mxDraft;let p=d[m];if(p.includes(a)){p=p.filter(x=>x!==a);if(a==='Ver')p=[];}else{p.push(a);if(!p.includes('Ver'))p.push('Ver');}d[m]=ACTS.filter(x=>p.includes(x));mxRe();},
 mxRow:v=>{const d=S.mxDraft;d[v]=d[v].length===4?[]:[...ACTS];mxRe();},
 mxCol:v=>{const d=S.mxDraft,all=MODS.every(m=>d[m].includes(v));MODS.forEach(m=>{let p=d[m].filter(x=>x!==v);if(!all){p.push(v);if(!p.includes('Ver'))p.push('Ver');}else if(v==='Ver')p=[];d[m]=ACTS.filter(x=>p.includes(x));});mxRe();},
 mxPre:v=>{const d=S.mxDraft;MODS.forEach(m=>d[m]=v==='all'?[...ACTS]:v==='ver'?['Ver']:[]);mxRe();},
 mxCancel:()=>{S.mxDraft=null;admRe();toast('Alterações descartadas');},
 mxSave:(v,b)=>busy(b,800,'Salvo',()=>{RPERM[S.mxRole]=JSON.parse(JSON.stringify(S.mxDraft));setTimeout(()=>{S.mxDraft=null;admRe();},950);toast(`Permissões de ${S.mxRole} salvas · ${USERS.filter(u=>u.role===S.mxRole).length} usuário(s) afetado(s)`);}),
 mxNew:()=>simpleDlg('Nova role','Nome da role','Ex.: Tesoureiro',v=>{if(ROLES[v]){toast('Essa role já existe');return;}ROLES[v]=['st-sol'];RPERM[v]=rp({});S.mxRole=v;S.mxDraft=null;admRe();toast(`Role ${v} criada — marque as permissões`);}),
 nMenu:v=>{const p=$('#nPop-'+v);closePops(p);p.classList.toggle('open');},
 nAdd:()=>simpleDlg('Nova rede','Nome da rede','Ex.: Rede Alva Litoral',v=>{if(NETS.some(n=>norm(n.n)===norm(v))){toast('Já existe uma rede com esse nome');return;}NETS.push({id:'n'+Date.now(),n:v,glob:['u1']});render();toast(`${v} criada`);}),
 nDel:v=>{closePops();const n=NETS.find(x=>x.id===v),gs=IGREJAS.filter(g=>g.rede===v);confirmDel({title:`Excluir ${n.n}?`,body:`${gs.length?`${gs.map(g=>g.n).join(', ')} fica${gs.length>1?'m':''} sem rede. `:''}Os ${n.glob.length} acessos globais desta rede são removidos. As igrejas e os dados não são apagados.`,label:'Excluir rede',typed:gs.length?n.n:null,onConfirm:()=>{NETS.splice(NETS.indexOf(n),1);gs.forEach(g=>g.rede='');render();toast(`${n.n} excluída`);}});},
 gAdd:v=>{closePops();simpleDlg('Adicionar igreja','Nome da igreja','Ex.: Alva Santos',x=>{IGREJAS.push({id:'g'+Date.now(),n:x,rede:v});render();toast(`${x} adicionada`);});},
 aTab:v=>{S.atab=v;render();},
 aFilter:v=>{S.af=v;$('#abody').innerHTML=aLog();admAfter();},
 aAccFilter:v=>{S.aar=v;$('#abody').innerHTML=aAccess();admAfter();},
 aAccPage:v=>{S.aap=+v;$('#abody').innerHTML=aAccess();admAfter();$('#abody').scrollIntoView({block:'nearest',behavior:'smooth'});},
 lProc:v=>{const x=LGPD.find(l=>l.id===v),fin=()=>{x.st='concluido';x.done='2026-09-30';LOG.unshift({u:'Rafael Pereira',a:x.type.startsWith('Exclus')?'Excluiu':'Aprovou',e:'Pedido LGPD',x:x.n,det:x.type,d:'2026-09-30',t:new Date().toTimeString().slice(0,5)});render();};
  if(x.type.startsWith('Exclus'))confirmDel({title:`Excluir a conta de ${x.n}?`,body:'Os dados pessoais são apagados de forma permanente, como pede a LGPD. Registros financeiros ficam anonimizados pelo prazo legal. Esta ação não pode ser desfeita.',label:'Excluir dados pessoais',typed:x.n.split(' ')[0],onConfirm:()=>{fin();toast(`Pedido de ${x.n.split(' ')[0]} concluído · comprovante enviado`);}});
  else{fin();toast('Arquivo gerado e enviado por e-mail');}},
};

