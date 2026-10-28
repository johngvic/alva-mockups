/* ================= Cuidado › Acompanhamento (casos) ================= */
I.hospital='<path d="M12 7v4"/><path d="M14 9h-4"/><path d="M18 21V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v15"/><path d="M3 21h18"/><path d="M10 21v-4h4v4"/>';
I.flower='<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/>';
const CTYPE={Visita:'home',Hospital:'hospital',Aconselhamento:'message',Luto:'flower',Oração:'hands'};
const CST={urgente:['Urgente','var(--st-rec)','var(--st-rec-bg)'],acompanhando:['Acompanhando','var(--st-sol)','var(--st-sol-bg)'],resolvido:['Resolvido','var(--st-int)','var(--st-int-bg)']};
const PASTORS=[['Pr. Rafael Pereira','ceu'],['Diác. Ana Costa','rosado'],['Pr. Marcos Lima','salvia'],['Pra. Daniela Rocha','damasco']];
let _cid=0;
const CS=(n,st,type,desc,resp,o={})=>({id:'c'+(++_cid),sched:o.sched||[],n,tone:o.tone||TONES[_cid%6],st,type,desc,resp,restr:!!o.restr,meets:o.meets||[],opened:o.opened||addDays(-10),resolved:o.resolved||'',vago:!!o.vago});
const crespInner=c=>c.vago?'Sem responsável · pendente':`<span class="av" style="background:var(--tone-${pTone(c.resp)});color:var(--tone-${pTone(c.resp)}-ink)">${pInit(c.resp)}</span>${esc(c.resp)}`;
const CASES=[
 CS('Maria Santos','urgente','Hospital','Internada no Hospital São Paulo — cirurgia programada para sexta.','Pr. Rafael Pereira',{tone:'rosado',opened:addDays(-4),meets:[{d:addDays(-1),t:'Visita no hospital. Família presente, pediu oração pela cirurgia.',result:'Combinar novo contato com a família após a cirurgia.',mode:'Presencial',time:'15:00',where:'Hospital São Paulo'},{d:addDays(-4),t:'Ligação após a internação.'}]}),
 CS('João Oliveira','acompanhando','Aconselhamento','Passando por divórcio. Terceira sessão de aconselhamento agendada.','Diác. Ana Costa',{restr:true,tone:'ceu',opened:addDays(-40),sched:[{d:addDays(5),t:'19:30',mode:'Presencial',where:'Gabinete pastoral'}],meets:[{d:addDays(-6),t:'2ª sessão de aconselhamento.'},{d:addDays(-20),t:'1ª sessão.'},{d:addDays(-40),t:'Primeira conversa após o culto.'}]}),
 CS('Clara Ferreira','acompanhando','Luto','Perdeu o pai em agosto. Necessita de visita e suporte.','Pr. Marcos Lima',{tone:'lima',vago:true,opened:addDays(-35)}),
 CS('Pedro Almeida','urgente','Oração','Crise de ansiedade severa. Afastado do trabalho.','Pr. Rafael Pereira',{restr:true,tone:'damasco',opened:addDays(-3),meets:[{d:addDays(-2),t:'Conversa por telefone. Encaminhado para acompanhamento profissional.'}]}),
 CS('Lucia Gomes','resolvido','Visita','Visitação realizada. Membro bem-acolhida e encorajada.','Pra. Daniela Rocha',{tone:'menta',resolved:addDays(-8),meets:[{d:addDays(-8),t:'Visita em casa com a equipe de recepção.'}]}),
 CS('Roberto Nunes','resolvido','Hospital','Recebeu alta após a cirurgia. Recuperação em casa.','Pr. Rafael Pereira',{tone:'salvia',resolved:addDays(-15),meets:[{d:addDays(-15),t:'Visita no dia da alta.'},{d:addDays(-19),t:'Visita no hospital.'}]}),
];
CASES.forEach(c=>{if(!c.trail)c.trail=[];if(c.stage==null)c.stage=2;});
CASES[0].trail=[{k:'Curso',t:'Vida de oração',note:'Para fazer junto com a família',done:false}];
Object.assign(S,{cf:'ativos',cq:''});
const cById=id=>CASES.find(c=>c.id===id);
const cPill=c=>`<span class="stp" style="--c:${CST[c.st][1]};--b:${CST[c.st][2]}"><i></i>${CST[c.st][0]}</span>`;
const pInit=n=>n.replace(/^(Pr\.|Pra\.|Diác\.)\s/,'').split(' ').map(w=>w[0]).slice(0,2).join('');
const pTone=n=>(PASTORS.find(p=>p[0]===n)||[0,'ceu'])[1];
const ago=iso=>{const n=-inDays(iso);return n===0?'hoje':n===1?'ontem':`há ${n} dias`;};

function casesList(){
 const cnt=k=>CASES.filter(c=>c.st===k).length,act=cnt('urgente')+cnt('acompanhando');
 return `<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Acompanhamento</h1><p class="lede">Casos de cuidado pastoral, visitas e aconselhamento</p></div>
  <div class="pact">${rpBtn('acompanhamento','casos')}
  <button class="btn pri" data-a="cAdd">${ic('plus',15,2.2)}Adicionar caso</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Casos ativos</span><span class="kv">${act}</span><span class="kd"><b style="color:var(--st-rec)">${cnt('urgente')} urgentes</b> precisam de atenção</span></div>
  <div class="k4"><span class="kl">Acompanhando</span><span class="kv">${cnt('acompanhando')}</span><span class="kd">em andamento</span></div>
  <div class="k4"><span class="kl">Resolvidos</span><span class="kv">${cnt('resolvido')}</span><span class="kd">nos últimos 30 dias</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="cq" placeholder="Buscar caso ou pessoa" value="${esc(S.cq)}" autocomplete="off"></label>
   <div class="chips">${[['ativos','Ativos',act],['urgente','Urgentes',cnt('urgente')],['acompanhando','Acompanhando',cnt('acompanhando')],['resolvido','Resolvidos',cnt('resolvido')],['todos','Todos',CASES.length]].map(c=>`<button class="chipf ${S.cf===c[0]?'on':''}" data-a="cFilter" data-v="${c[0]}">${CST[c[0]]?`<i style="background:${CST[c[0]][1]}"></i>`:''}${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="crows">${cRows()}</div>
 </section>`;
}
function cRows(){
 const q=norm(S.cq),ord={urgente:0,acompanhando:1,resolvido:2};
 const l=CASES.filter(c=>(S.cf==='todos'||(S.cf==='ativos'?c.st!=='resolvido':c.st===S.cf))&&(!q||norm(c.n+' '+c.desc+' '+c.type+' '+c.resp).includes(q))).sort((a,b)=>ord[a.st]-ord[b.st]);
 if(!l.length)return `<div class="mempty"><p>Nenhum caso aqui.</p><span>${S.cf==='urgente'?'Nenhum caso urgente no momento.':'Nada corresponde a esse filtro.'}</span></div>`;
 return `<div class="clist">${l.map(c=>{const last=c.meets[0];return `<div class="crow ${c.st}" tabindex="0" data-a="cOpen" data-v="${c.id}">
  <span class="av" style="background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${initials(c.n)}</span>
  <div class="cb"><div class="c1"><b>${esc(c.n)}</b>${cPill(c)}<span class="ctype">${ic(CTYPE[c.type],14)}${c.type}</span>${c.restr?`<span class="crestr" title="Só o Administrar e os pastores escolhidos veem o caso completo">${ic('lock',12,2.2)}Restrito</span>`:''}</div>
   <p class="cdesc">${esc(c.desc)}</p>
   <div class="c3"><span class="cresp${c.vago?' vago':''}">${crespInner(c)}</span><span class="sep">·</span><span>${c.meets.length?`${c.meets.length} encontro${c.meets.length>1?'s':''} · último ${ago(last.d)}`:'<b style="color:var(--st-sol)">Nenhum encontro ainda</b>'}</span>${(c.sched||[]).length?`<span class="c-nxp">${ic('calendar',12,2)}Próximo: ${wd(c.sched[0].d).slice(0,3)}, ${fmtD(c.sched[0].d)} · ${c.sched[0].t}</span>`:''}</div></div>
  <span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}</div>
 <div class="tfoot"><span>${l.length} ${l.length>1?'casos':'caso'}</span></div>`;
}
function caseDetail(){
 const c=cById(S.case);if(!c){S.case=null;return casesList();}
 const sch=c.sched||[];
 return `<nav class="crumb rise"><span class="soft">Cuidado</span>${ic('chevR',13,2)}<button class="lnk back" data-a="cBack">Acompanhamento</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid"><span class="av xl" style="background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${initials(c.n)}</span><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(c.n)}</h1>${cPill(c)}</div>
   <p><span class="ctype">${ic(CTYPE[c.type],14)}${c.type}</span> · aberto ${ago(c.opened)}${c.restr?` · <span class="crestr">${ic('lock',12,2.2)}Restrito</span>`:''}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="cReg" data-v="${c.id}">Registrar encontro</button><button class="btn pri" data-a="cSched" data-v="${c.id}">${ic('calendar',15)}Agendar</button>
   <div style="position:relative"><button class="ibtn" data-a="cMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="cPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="cDel" data-v="${c.id}">${ic('x',17)}Excluir caso</button></div></div></div>
 </header>
 <div class="pgrid cdet rise" style="--d:2">
  <section class="card pc"><div class="sh"><h2>Encontros</h2><span class="who">${c.meets.length} registrado${c.meets.length===1?'':'s'}${sch.length?` · ${sch.length} agendado${sch.length===1?'':'s'}`:''}</span></div>
   ${sch.length?`<p class="fl" style="margin:0 0 8px">Próximos</p><div class="c-next">${sch.map((m,i)=>`<div class="c-nx"><span class="c-nd"><b>${+m.d.slice(8)}</b><small>${wd(m.d).slice(0,3)}</small></span><span class="dkt"><b>${m.mode==='Remoto'?'Encontro remoto':'Encontro presencial'}</b><span>${fmtD(m.d)} · ${m.t}${m.mode==='Remoto'?(m.link?' · link enviado':' · link a definir'):m.where?' · '+esc(m.where):''}</span></span><button class="btn sec sm" data-a="cDone" data-v="${c.id}|${i}">Concluir</button><button class="ibtn sm" data-a="cUnsched" data-v="${c.id}|${i}" aria-label="Cancelar encontro" title="Cancelar encontro">${ic('x',13)}</button></div>`).join('')}</div>`:''}
   ${c.meets.length?`${sch.length?'<p class="fl" style="margin:18px 0 10px">Histórico</p>':''}<ol class="mini-tl">${c.meets.map(m=>`<li><b>${esc(m.t)}</b><span>${fmtD(m.d)} · ${ago(m.d)}</span></li>`).join('')}</ol>`
   :`<div class="eempty" style="padding:24px 0 8px"><span class="eei">${ic('calendar',22)}</span><p>Nenhum encontro ainda.</p><span class="who">Agende o primeiro ou registre um que já aconteceu.</span></div>`}</section>
  <aside class="stack-col">
   <section class="card pc"><div class="sh"><h2>Situação</h2></div><div class="yn cst" role="radiogroup" id="cstG">${Object.keys(CST).map(k=>`<label><input type="radio" name="cst" value="${k}" ${c.st===k?'checked':''}><span><i style="background:${CST[k][1]}"></i>${CST[k][0]}</span></label>`).join('')}</div></section>
   <section class="card pc"><div class="sh"><h2>Sobre o caso</h2></div><p class="cdtx">${esc(c.desc)}</p>
    <dl class="cdkv"><div><dt>Responsável</dt><dd class="cresp${c.vago?' vago':''}">${crespInner(c)}</dd></div><div><dt>Quem vê</dt><dd>${c.restr?`${ic('lock',13,2.2)} Administrar e pastores escolhidos`:'Todos os pastores'}</dd></div><div><dt>Aberto em</dt><dd>${fmtD(c.opened)}</dd></div></dl></section>
  </aside></div>`;
}
function caseAfter(){const c=cById(S.case);const g=$('#cstG');if(!c||!g)return;g.addEventListener('change',e=>{const old=c.st,oldResolved=c.resolved;c.st=e.target.value;c.resolved=c.st==='resolvido'?TODAY.toISOString().slice(0,10):'';cRe();toast(`Caso de ${c.n.split(' ')[0]}: ${CST[c.st][0].toLowerCase()}`,()=>{careLog(c,'Alteração de situação desfeita',`${CST[c.st][0]} → ${CST[old][0]}`);c.st=old;c.resolved=oldResolved;cRe();});});}
const cRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
/* Triagem (17/10/2026): quem tem Administrar classifica o caso como normal ou restrito, escolhe os pastores que veem o restrito e designa o responsável */
function cTriage(v){const c=cById(v);if(!c)return;const vw=new Set(c.viewers||[c.resp]);
 openDlg(`${dlgHead('Triagem do caso',`Defina quem pode ver o caso de ${esc(c.n)}.`)}
  <form id="trF" class="fgrid one" novalidate>
   <div class="fld"><span class="fl">Quem vê</span><div class="yn" role="radiogroup"><label><input type="radio" name="tr" value="n" ${c.restr?'':'checked'}><span>Normal</span></label><label><input type="radio" name="tr" value="r" ${c.restr?'checked':''}><span>${ic('lock',13,2.2)}&nbsp;Restrito</span></label></div><span class="hint" id="trH"></span></div>
   <div class="fld" id="trV"><span class="fl">Pastores que veem o caso completo</span><div class="cm-dpick">${PASTORS.map(p=>`<label><input type="checkbox" name="vw" value="${esc(p[0])}" ${vw.has(p[0])?'checked':''}><span>${esc(p[0])}</span></label>`).join('')}</div><span class="hint">Os demais pastores veem só “Caso restrito”, com urgência e status.</span></div>
   <label class="fld"><span class="fl">Responsável</span><span class="selw"><select name="resp">${PASTORS.map(p=>`<option ${p[0]===c.resp?'selected':''}>${esc(p[0])}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar triagem</button></div></form>`,'sm');
 const f=$('#trF'),h=()=>{const r=f.elements.tr.value==='r';$('#trV').hidden=!r;$('#trH').textContent=r?'Só o Administrar e os pastores escolhidos veem o caso completo.':'Todos os pastores com acesso a Acompanhamento veem o caso.';};
 f.addEventListener('change',h);h();
 f.addEventListener('submit',e=>{e.preventDefault();const r=f.elements.tr.value==='r';c.restr=r;c.resp=f.elements.resp.value;c.vago=false;c.viewers=r?[...f.querySelectorAll('[name=vw]:checked')].map(x=>x.value):[];if(r&&!c.viewers.includes(c.resp))c.viewers.push(c.resp);closeDlg();cRe();toast(r?'Caso marcado como restrito':'Caso aberto a todos os pastores');});}
function refreshCases(){if(S.active==='acompanhamento'){const y=window.scrollY;render();window.scrollTo(0,y);}}

/* Trilha do caso: a mesma do discipulado (jornada, curso, série, pregação, música ou material) */
function careTrail(c){const tr=dTrail(c);
 return `<section class="card pc rise" style="--d:3;margin-top:16px"><div class="sh"><h2>Trilha</h2><span class="who">${tr.filter(j=>j.done>=j.c).length} de ${tr.length} itens concluídos</span></div>
  <ol class="ct-tl">${tr.map(dTrailRow).join('').replace(/data-a="dJ(Swap|Del|Go)"/g,'data-a="cJ$1"')}
   <li class="ct-addn"><span class="ct-node add">${ic('plus',14,2.2)}</span><button class="ct-cc add" data-a="cAddJ"><b>Adicionar à trilha</b><span>Jornada, curso, série, pregação, música ou material</span></button></li></ol>
  <p class="who" style="margin:12px 0 0">Toque em um item para abri-lo. O progresso vem do que a pessoa assiste e conclui no app.</p></section>`;}
