/* ================= Comunidade › Ministérios ================= */
let _mnid=0;
const MN=(n,lead,mem,teams,o={})=>({id:'mn'+(++_mnid),n,lead,mem,tone:o.tone||TONES[_mnid%6],icon:o.icon||'users',active:o.active!==false,phone:o.phone||'(11) 9'+(9200+_mnid*37)+'-'+(1000+_mnid*53),desc:o.desc||'',photo:'',teams:(o.teams||['Domingo manhã','Domingo noite','Eventos especiais','Apoio'].slice(0,teams).map((t,i)=>[t,HPOOL[(_mnid*3+i)%HPOOL.length],Math.max(1,Math.round(mem/teams)-(i%2))])).map(t=>({n:t[0],lead:t[1],m:t[2]})),resp:o.resp||[],content:o.content||[],teamsN:teams});
const MINIS=[
 MN('Jovens e Adolescentes','Isabela Rocha',22,3,{icon:'sprout',tone:'lima',desc:'Encontros, discipulado e atividades para adolescentes e jovens.',teams:[['Adolescentes','Gabriel Souza',9],['Jovens','Isabela Rocha',10],['Louvor jovem','Lucas Mendes',3]],resp:['Culto de jovens aos sábados','Retiro anual','Acompanhamento de novos convertidos'],content:[['Curso','O que é a fé'],['Material','Guia do líder de célula jovem']]}),
 MN('Eventos','Diego Martins',10,2,{icon:'ticket',tone:'damasco'}),
 MN('Homens','Ricardo Santos',16,2,{icon:'users',tone:'ceu'}),
 MN('Cafeteria','Camila Sousa',9,1,{icon:'coffee',tone:'damasco'}),
 MN('Zeladoria','Bruno Carvalho',6,1,{icon:'bucket',tone:'salvia'}),
 MN('Cozinha','Mônica Souza',11,2,{icon:'chef',tone:'rosado'}),
 MN('Voluntariado','Larissa Pinto Rocha',14,1,{icon:'hand',tone:'menta'}),
 MN('Louvor','Ana Clara Lima',24,3,{icon:'music',tone:'ceu'}),
 MN('Ceia','Cláudia Ferraz',8,1,{icon:'wine',tone:'rosado'}),
 MN('Integração','Carlos Eduardo Silva',12,2,{icon:'userplus',tone:'lima'}),
 MN('Kids','Marina Costa',18,3,{icon:'baby',tone:'damasco'}),
 MN('Mulheres','Patrícia Lima',15,2,{icon:'heart',tone:'rosado'}),
 MN('Casais','Fernanda Alves Melo',12,1,{icon:'heart',tone:'menta'}),
 MN('Intercessão','Renata Campos',9,1,{icon:'hands',tone:'salvia'}),
 MN('Recepção','Felipe Andrade',13,2,{icon:'door',tone:'ceu'}),
 MN('Mídia','Diego Faria',8,2,{icon:'camera',tone:'lima'}),
 MN('Comunicação','Patrícia Oliveira Nunes',6,1,{icon:'megaphone',tone:'damasco'}),
 MN('Diaconia','Larissa Pires',10,2,{icon:'shield',tone:'menta'}),
 MN('Missões','Thiago Barros',7,1,{icon:'pin',tone:'ceu'}),
 MN('Teatro','Juliana Prado',8,1,{icon:'sparkle',tone:'rosado'}),
];
const CONTENT={Curso:['O que é a fé','Fundamentos da vida cristã','Vida de oração','Liderança servidora'],Pregação:['Série: Frutos do Espírito','Série: Sermão do Monte','Culto de jovens · 20/09'],Música:['Grande é o Senhor','Aclame ao Senhor','Te louvarei'],Material:['Guia do líder de célula jovem','Estudo: Parábolas de Jesus','Apostila de integração']};
const CTYPE_IC={Curso:'award',Pregação:'play',Música:'music',Material:'book'};
Object.assign(S,{mini:null,mtab:'det',mnq:'',mnf:'ativos',mnedit:null});
const mnById=id=>MINIS.find(m=>m.id===id);
const mTile=(m,s=36)=>`<span class="htile" style="--s:${s}px;background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${ic(m.icon,Math.round(s*.47),1.9)}</span>`;
const tCount=m=>m.teams.length||m.teamsN;
function minisList(){
 const act=MINIS.filter(m=>m.active),mem=act.reduce((a,m)=>a+m.mem,0),teams=act.reduce((a,m)=>a+tCount(m),0),max=Math.max(...MINIS.map(m=>m.mem));
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Ministérios</h1><p class="lede">${act.length} ministérios ativos</p></div>
  <div class="pact">${rpBtn('ministerios','lista')}
  <button class="btn pri" data-a="mnAdd">${ic('plus',15,2.2)}Novo ministério</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Ministérios</span><span class="kv">${act.length}</span><span class="kd">${MINIS.length-act.length} inativo${MINIS.length-act.length===1?'':'s'}</span></div>
  <div class="k4"><span class="kl">Membros vinculados</span><span class="kv">${mem}</span><span class="kd">média de ${Math.round(mem/act.length)} por ministério</span></div>
  <div class="k4"><span class="kl">Times ativos</span><span class="kv">${teams}</span><span class="kd">em ${act.length} ministérios</span></div>
 </section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="mnq" placeholder="Buscar ministério ou líder" value="${esc(S.mnq)}" autocomplete="off"></label>
  <div class="chips">${[['ativos','Ativos',act.length],['inativos','Inativos',MINIS.length-act.length],['todos','Todos',MINIS.length]].map(c=>`<button class="chipf ${S.mnf===c[0]?'on':''}" data-a="mnFilter" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="mnrows">${mnRows(max)}</div></section>`;
}
function mnRows(max){
 max=max||Math.max(...MINIS.map(m=>m.mem));const q=norm(S.mnq);
 const l=MINIS.filter(m=>(S.mnf==='todos'||(S.mnf==='ativos')===m.active)&&(!q||norm(m.n+' '+m.lead).includes(q))).sort((a,b)=>b.mem-a.mem);
 if(!l.length)return `<div class="mempty"><p>Nenhum ministério.</p><span>Nada corresponde a esse filtro.</span></div>`;
 const sig=S.mnq+'|'+S.mnf;if(S.mnSig!==sig){S.mnSig=sig;S.mnpg=1;}const pp=S.mnpp||8,P=Math.max(1,Math.ceil(l.length/pp));S.mnpg=Math.min(Math.max(1,S.mnpg||1),P);const c=S.mnpg,pg=l.slice((c-1)*pp,c*pp);
 return `<div class="trow mn thead"><span>Ministério</span><span>Líder</span><span>Membros</span><span>Times</span><span>Status</span><span></span></div>
 ${pg.map(m=>`<div class="trow mn ${m.active?'':'off'}" tabindex="0" data-a="mnOpen" data-v="${m.id}"><span class="tn">${mTile(m)}<span class="hn"><b>${esc(m.n)}</b><span>Ministério de ${esc(m.n)}</span></span></span>
  <span class="hl"><span class="av" style="background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${initials(m.lead)}</span>${esc(m.lead)}</span>
  <span class="mnm"><span class="tr"><i style="width:${Math.round(m.mem/max*100)}%"></i></span><b>${m.mem}</b></span>
  <span class="mnt"><b>${tCount(m)}</b> ${tCount(m)===1?'time':'times'}</span>
  <span class="ts">${m.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>'}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`).join('')}
 <div class="tfoot mn-f"><span>${P>1?`${(c-1)*pp+1}–${Math.min(l.length,c*pp)} de ${l.length} ministérios`:`${l.length} ${l.length===1?'ministério':'ministérios'}`}</span>${P>1?(()=>{const n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-c)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}return `<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="mnPg" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="mnPg" data-v="${i}">${i}</button>`).join('')}<button class="ibtn sm" data-a="mnPg" data-v="${c+1}" ${c===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`;})():''}</div>`;
}
function miniDetail(){
 const m=mnById(S.mini);if(!m){S.mini=null;return minisList();}
 return `<nav class="crumb rise"><span class="soft">Comunidade</span>${ic('chevR',13,2)}<button class="lnk back" data-a="mnBack">Ministérios</button>${ic('chevR',13,2)}<span>${esc(m.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${mTile(m,64)}<div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>Ministério de ${esc(m.n)}</h1>${m.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>'}</div><p>Líder: ${esc(m.lead)} · ${mnPpl(m).length} membros · ${tCount(m)} ${tCount(m)===1?'time':'times'}</p></div></div>
  <div class="pact"><div style="position:relative"><button class="ibtn" data-a="mnMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="mnPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="mnToggle">${ic(m.active?'pause':'check',17)}${m.active?'Inativar ministério':'Reativar ministério'}</button><hr><button class="pi danger" data-a="mnDel">${ic('x',17)}Excluir ministério</button></div></div></div>
  <div class="ptabs" role="tablist">${[['det','Detalhes'],['mem','Membros',mnPpl(m).length],['times','Times',m.teams.length],['resp','Responsabilidades',m.resp.length],['cont','Conteúdo',m.content.length],['esc','Escalas',esCntMin(m)],['quad','Quadros',nxBdCount('min',m.id)],['cx','Caixas',cxCount('min',m.id)]].map(t=>`<button role="tab" class="${S.mtab===t[0]?'on':''}" data-a="mnTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="mntb" class="rise" style="--d:2">${mnTabBody(m)}</div>`;
}
function mnTabBody(m){return ({det:mnDet,mem:mnMembers,times:mnTimes,resp:mnResp,cont:mnCont,esc:mnEsc,quad:m=>bdTab('min',m.id),cx:m=>cxTab('min',m.id)})[S.mtab](m);}
function mnDet(m){const ed=S.mnedit;
 return `<div class="pgrid"><div class="col"><section class="card pc sec ${ed?'editing':''}"><div class="sh"><h2>Informações</h2>${ed?'':`<button class="btn sec sm" data-a="mnEdit">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" id="mnF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Líder</span><span class="selw"><select name="lead">${[...new Set([m.lead,...MEMBERS.filter(x=>x.tit).map(x=>x.n)])].map(n=>`<option ${n===m.lead?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Precisa ser um membro cadastrado.</span></label>
   <label class="fld"><span class="fl">Telefone</span><input name="phone" type="tel" value="${esc(m.phone)}"></label>
   <label class="fld wide"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="3" placeholder="Para que serve este ministério">${esc(m.desc)}</textarea></label>
   <label class="fld wide"><span class="fl">Foto <small>opcional</small></span><input name="photo" type="url" placeholder="https://…" value="${esc(m.photo)}"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="mnCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid2"><div><dt>Líder</dt><dd class="cresp"><span class="av" style="background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${initials(m.lead)}</span>${esc(m.lead)}</dd></div><div><dt>Telefone</dt><dd class="mono">${esc(m.phone)}</dd></div><div style="grid-column:1/-1"><dt>Descrição</dt><dd>${m.desc?esc(m.desc):'<span class="soft">Sem descrição</span>'}</dd></div><div style="grid-column:1/-1"><dt>Foto</dt><dd>${m.photo?esc(m.photo):'<span class="soft">Sem foto · usa o ícone do ministério</span>'}</dd></div></dl>`}</section>
  <p class="who" style="margin:4px 4px 0;display:flex;gap:6px;align-items:center">${ic('lock',13)}O acesso ao painel deste ministério é concedido em Administração › Usuários e permissões.</p></div>
  <div class="col"><section class="card pc"><div class="sh"><h2>Resumo</h2></div><div class="mnsum">
   <button data-a="mnTab" data-v="times"><b>${tCount(m)}</b><span>Times</span></button><button data-a="mnTab" data-v="resp"><b>${m.resp.length}</b><span>Responsabilidades</span></button><button data-a="mnTab" data-v="cont"><b>${m.content.length}</b><span>Conteúdos</span></button><button data-a="mnTab" data-v="mem"><b>${mnPpl(m).length}</b><span>Membros</span></button></div></section>
   <section class="card pc"><div class="sh"><h2>Casas ligadas</h2></div>${(()=>{const cs=CASAS.filter(c=>c.min&&m.n.includes(c.min.split(' ')[0]));return cs.length?cs.map(c=>`<button class="dk" data-a="rGoCasa" data-v="${c.id}">${hTile(c,32)}<span class="dkt"><b>${esc(c.n)}</b><span>${c.ppl.length} pessoas</span></span>${ic('chevR',16)}</button>`).join(''):'<p class="who" style="margin:0">Nenhuma casa de apascentamento ligada a este ministério.</p>';})()}</section></div></div>`;}
function mnEmpty(t,s,btn,act){return `<div class="eempty"><span class="eei">${ic(btn,22)}</span><p>${t}</p><span class="who">${s}</span><button class="btn pri" data-a="${act}" style="margin-top:10px">${ic('plus',14,2.2)}${t.startsWith('Nenhum time')?'Criar primeiro time':t.startsWith('Nenhuma resp')?'Adicionar responsabilidade':'Vincular conteúdo'}</button></div>`;}
function mnTimes(m){return `<section class="card pc"><div class="sh"><h2>Times</h2>${m.teams.length?`<button class="btn sec sm" data-a="mnAddTeam">${ic('plus',14,2.2)}Novo time</button>`:''}</div>
 ${m.teams.length?`<div class="mins">${m.teams.map((t,i)=>`<article class="minc2"><div class="mt"><button class="lnk record-title" data-a="mnInspect" data-v="team|${i}">${esc(t.n)}</button><button class="ibtn sm" data-a="mnDelTeam" data-v="${i}" aria-label="Excluir time">${ic('x',14)}</button></div><span class="who cresp" style="font-weight:400;color:var(--ink-muted)">${ic('user',13)}Líder: ${esc(t.lead)}</span><div class="segl" style="margin-top:12px"><span><b>${t.m}</b> ${t.m===1?'pessoa':'pessoas'}</span></div></article>`).join('')}</div>`:mnEmpty('Nenhum time ainda.','Divida o ministério em times para montar escalas por função.','users','mnAddTeam')}</section>`;}
function mnResp(m){return `<section class="card pc"><div class="sh"><h2>Responsabilidades</h2>${m.resp.length?`<button class="btn sec sm" data-a="mnAddResp">${ic('plus',14,2.2)}Adicionar</button>`:''}</div>
 ${m.resp.length?`<ol class="resps">${m.resp.map((r,i)=>`<li><span class="rn">${i+1}</span><span><button class="lnk record-title" data-a="mnInspect" data-v="resp|${i}">${esc(r)}</button></span><button class="ibtn sm" data-a="mnDelResp" data-v="${i}" aria-label="Remover">${ic('x',14)}</button></li>`).join('')}</ol>`:mnEmpty('Nenhuma responsabilidade ainda.','Liste o que o ministério assume na igreja, como “Montagem do culto de domingo”.','clipboard','mnAddResp')}</section>`;}
function mnCont(m){return `<section class="card pc"><div class="sh"><h2>Conteúdo vinculado</h2>${m.content.length?`<button class="btn sec sm" data-a="mnAddCont">${ic('plus',14,2.2)}Vincular</button>`:''}</div>
 <p class="who" style="margin:-4px 0 16px">Pregações, músicas, cursos e materiais são cadastrados em Conteúdo. Aqui você só vincula o que já existe.</p>
 ${m.content.length?`<div class="conts">${m.content.map((c,i)=>`<div class="ct1"><span class="cti">${ic(CTYPE_IC[c[0]],16)}</span><span class="ctt"><button class="lnk record-title" data-a="mnInspect" data-v="content|${i}">${esc(c[1])}</button><small>${c[0]}</small></span><button class="ibtn sm" data-a="mnDelCont" data-v="${i}" aria-label="Desvincular">${ic('x',14)}</button></div>`).join('')}</div>`:mnEmpty('Nenhum conteúdo vinculado.','Vincule um curso, pregação, música ou material.','book','mnAddCont')}</section>`;}

function rmAfter(){
 requestAnimationFrame(tabInd);
 const rq=$('#rq');if(rq)rq.addEventListener('input',e=>{S.rq=e.target.value;const p=e.target.selectionStart;render();const n=$('#rq');n.focus();n.setSelectionRange(p,p);});
 const q=$('#mnq');if(q)q.addEventListener('input',e=>{S.mnq=e.target.value;$('#mnrows').innerHTML=mnRows();});
 const f=$('#mnF');if(f)f.addEventListener('submit',e=>{e.preventDefault();const m=mnById(S.mini),fd=new FormData(f),ph=fd.get('photo');if(ph&&!/^https?:\/\//.test(ph)){const i=f.querySelector('[name=photo]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Use um link começando com https://';return;}
  const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{m.lead=fd.get('lead');m.phone=fd.get('phone');m.desc=fd.get('desc').trim();m.photo=ph;S.mnedit=null;render();toast('Informações atualizadas');},700);});
}
function reMn(){const m=mnById(S.mini);$('#mntb').innerHTML=mnTabBody(m);$$('.ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.mtab));tabInd();rmAfter();}
function simpleDlg(title,label,ph,onOk){openDlg(`${dlgHead(title)}<form class="fgrid one" id="sF" novalidate><label class="fld"><span class="fl">${label}</span><input name="v" placeholder="${ph}" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Adicionar</button></div></form>`,'sm');
 const f=$('#sF');f.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(f).get('v').trim(),i=f.querySelector('input');if(!v){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Preencha o campo';i.focus();return;}f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{closeDlg();onOk(v);},500);});}
const RA={
 rexpMenu:()=>{const p=$('#rexpPop');closePops(p);p.classList.toggle('open');},
 rMenu:v=>{const p=$('#rPop-'+v);closePops(p);p.classList.toggle('open');},
 rGoCasa:v=>{S.active='casas';S.casa=v;S.ctab='geral';S.mini=null;render();window.scrollTo({top:0});},
 rAdd:()=>{openDlg(`${dlgHead('Nova rede','Uma rede agrupa casas sob um supervisor.')}${rForm(null)}`);rBind(null);},
 rEdit:v=>{closePops();const r=rById(v);openDlg(`${dlgHead('Editar rede')}${rForm(r)}`);rBind(r);},
 rDel:v=>{closePops();const r=rById(v);confirmDel({title:`Excluir ${r.n}?`,body:`${r.casas.length?`As ${r.casas.length} casas vinculadas ficam sem rede. `:''}As casas e os participantes não são apagados.`,label:'Excluir rede',onConfirm:()=>{const i=REDES.indexOf(r);REDES.splice(i,1);render();toast(`${r.n} excluída`,()=>{REDES.splice(i,0,r);render();});}});},
 mnexpMenu:()=>{const p=$('#mnexpPop');closePops(p);p.classList.toggle('open');},
 mnMenu:()=>{const p=$('#mnPop');closePops(p);p.classList.toggle('open');},
 mnFilter:v=>{S.mnf=v;$$('.chipf[data-a=mnFilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#mnrows').innerHTML=mnRows();},
 mnOpen:v=>{S.mini=v;S.mtab='det';S.mnedit=null;render();window.scrollTo({top:0});},
 mnBack:()=>{S.mini=null;render();},
 mnTab:v=>{S.mtab=v;S.mnedit=null;reMn();},
 mnEdit:()=>{S.mnedit=true;reMn();},
 mnCancel:()=>{S.mnedit=null;reMn();},
 mnToggle:()=>{closePops();const m=mnById(S.mini);if(m.active){confirmDel({title:`Inativar o Ministério de ${m.n}?`,body:'Ele some do app e das escalas, mas times, membros e histórico são mantidos. Dá para reativar depois.',label:'Inativar',onConfirm:()=>{m.active=false;render();toast('Ministério inativado');}});}else{m.active=true;render();toast('Ministério reativado');}},
 mnDel:()=>{closePops();const m=mnById(S.mini);confirmDel({title:`Excluir o Ministério de ${m.n}?`,body:`Os ${m.mem} membros são desvinculados e os times, responsabilidades e escalas são apagados. Esta ação não pode ser desfeita. Se quiser só pausar, use “Inativar”.`,label:'Excluir ministério',typed:m.n,onConfirm:()=>{MINIS.splice(MINIS.indexOf(m),1);S.mini=null;render();toast(`Ministério de ${m.n} excluído`);}});},
 mnAddTeam:()=>{const m=mnById(S.mini);openDlg(`${dlgHead('Novo time',`Dentro do Ministério de ${esc(m.n)}.`)}<form class="fgrid one" id="tF" novalidate><label class="fld"><span class="fl">Nome do time</span><input name="n" placeholder="Ex.: Som e projeção" autocomplete="off"><span class="err"></span></label><label class="fld"><span class="fl">Líder do time</span><span class="selw"><select name="l">${MEMBERS.filter(x=>x.tit).map(x=>`<option>${esc(x.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar time</button></div></form>`,'sm');
  const f=$('#tF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),i=f.querySelector('[name=n]');if(!n){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome ao time';i.focus();return;}f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{m.teams.push({n,lead:fd.get('l'),m:1});closeDlg();render();toast(`Time ${n} criado`);},600);});},
 mnDelTeam:v=>{const m=mnById(S.mini),t=m.teams[+v];confirmDel({title:`Excluir o time ${t.n}?`,body:`As ${t.m} pessoas continuam no ministério, mas saem das escalas deste time.`,label:'Excluir time',onConfirm:()=>{m.teams.splice(+v,1);render();toast('Time excluído',()=>{m.teams.splice(+v,0,t);render();});}});},
 mnAddResp:()=>simpleDlg('Nova responsabilidade','Nome','Ex.: Montagem do culto de domingo',v=>{const m=mnById(S.mini);m.resp.push(v);render();toast('Responsabilidade adicionada');}),
 mnDelResp:v=>{const m=mnById(S.mini),r=m.resp[+v];confirmDel({title:'Remover esta responsabilidade?',body:`“${esc(r)}” deixa de aparecer no ministério.`,label:'Remover',onConfirm:()=>{m.resp.splice(+v,1);render();toast('Responsabilidade removida',()=>{m.resp.splice(+v,0,r);render();});}});},
 mnAddCont:()=>{const m=mnById(S.mini),used=new Set(MINIS.flatMap(x=>x.content.map(c=>c[1])));
  const opts=t=>CONTENT[t].filter(x=>!used.has(x));
  openDlg(`${dlgHead('Vincular conteúdo')}<div class="fld"><span class="fl">Tipo</span><div class="yn" id="ctG" role="radiogroup">${Object.keys(CONTENT).map((t,i)=>`<label><input type="radio" name="ct" value="${t}" ${!i?'checked':''}><span>${ic(CTYPE_IC[t],14)}&nbsp;${t}</span></label>`).join('')}</div></div>
   <div class="fld" style="margin-top:14px"><span class="fl" id="ctL">Curso</span><div class="pick" id="ctP"></div><span class="hint">Só aparece conteúdo ainda sem ministério vinculado.</span></div>
   <div class="dfoot" style="margin-top:14px"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="mnDoCont">Vincular</button></div>`,'sm');
  const draw=()=>{const t=$('input[name=ct]:checked').value;$('#ctL').textContent=t;const o=opts(t);$('#ctP').innerHTML=o.length?o.map((x,i)=>`<label class="pk"><span class="cti">${ic(CTYPE_IC[t],15)}</span><span><b>${esc(x)}</b><small>${t}</small></span><input type="radio" name="cv" value="${esc(x)}" ${!i?'checked':''}></label>`).join(''):`<p class="who" style="padding:10px">Todo ${t.toLowerCase()} já está vinculado a um ministério.</p>`;};
  $('#ctG').addEventListener('change',draw);draw();},
 mnDoCont:(v,b)=>{const s=$('input[name=cv]:checked');if(!s){toast('Nada disponível para vincular');return;}const m=mnById(S.mini),t=$('input[name=ct]:checked').value;b.classList.add('busy');setTimeout(()=>{m.content.push([t,s.value]);closeDlg();render();toast(`${s.value} vinculado`);},500);},
 mnDelCont:v=>{const m=mnById(S.mini),c=m.content[+v];confirmDel({title:'Desvincular este conteúdo?',body:`“${esc(c[1])}” continua em Conteúdo, só deixa de estar ligado a este ministério.`,label:'Desvincular',onConfirm:()=>{m.content.splice(+v,1);render();toast('Conteúdo desvinculado',()=>{m.content.splice(+v,0,c);render();});}});},
 mnAdd:()=>{openDlg(`${dlgHead('Novo ministério','Times e responsabilidades podem ser adicionados depois.')}<form class="fgrid" id="naF" novalidate style="grid-template-columns:1fr 1fr">
  <label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Recepção" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Líder</span><span class="selw"><select name="lead">${MEMBERS.filter(x=>x.tit).map(x=>`<option>${esc(x.n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Precisa ser um membro cadastrado.</span></label>
  <label class="fld"><span class="fl">Telefone</span><input name="phone" type="tel" inputmode="tel" placeholder="(11) 99999-9999"></label>
  <label class="fld wide"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="2" placeholder="Para que serve este ministério"></textarea></label>
  <label class="fld wide"><span class="fl">Foto <small>opcional</small></span><input name="photo" type="url" placeholder="https://…"></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar ministério</button></div></form>`);
  const f=$('#naF'),ph=f.querySelector('[name=phone]');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim().replace(/^Ministério (de |do |da )?/i,''),i=f.querySelector('[name=n]');const bad=m=>{i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;i.focus();};
   if(!n)return bad('Dê um nome ao ministério');if(MINIS.some(m=>norm(m.n)===norm(n)))return bad('Esse ministério já existe');
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{const m=MN(n,fd.get('lead'),1,0,{desc:fd.get('desc').trim(),phone:fd.get('phone')});m.photo=fd.get('photo');MINIS.push(m);closeDlg();S.mini=m.id;S.mtab='det';render();toast(`Ministério de ${n} criado`);},700);});},
};

