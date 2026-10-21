/* ================= Cuidado › Discipulado ================= */
const TRILHA=['Primeiros passos','Vida de oração','Fundamentos','Vida na Palavra','Caráter cristão','Missão e chamado'];
const RHY={7:'Semanal',14:'Quinzenal',30:'Mensal'};
const TODAY=new Date(2026,8,30);
const addDays=(n)=>{const d=new Date(TODAY);d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
let _did=0;
const DN=(n,parent,o={})=>({id:'d'+(++_did),n,parent,tone:o.tone||TONES[_did%6],role:o.role||'Membro',rhythm:o.rhythm||14,last:o.last,stage:o.stage||0,paused:!!o.paused,gone:!!o.gone,notes:o.notes||'',meets:o.meets||[],open:true});
const MT=(d,type,o={})=>({id:'e'+Math.random().toString(36).slice(2,8),d,type,content:o.c||'',mode:o.mode||'Presencial',link:o.link||'',time:o.t||'19:30',note:o.note||'',mat:o.mat||'',parts:o.parts});
const DISC=[
 DN('Pr. Rafael Pereira',null,{role:'Pastor',rhythm:30,last:29,tone:'ceu'}),
 DN('Ana Clara Lima','d1',{role:'Líder',rhythm:14,last:25,tone:'ceu',notes:'Conduz a casa de Vila Nova. Pediu ajuda para organizar a agenda dos discípulos.'}),
 DN('Gabriel Souza','d2',{rhythm:7,last:22,stage:3,tone:'menta',meets:[MT(addDays(-22),'done',{c:'Fundamentos: graça e fé. Conversamos sobre como aplicar o estudo na rotina e reservamos um momento para dúvidas.',mat:'Trilha · Fundamentos',note:'Retomar no próximo encontro as dúvidas sobre a leitura da semana.'}),MT(addDays(-36),'done',{c:'Vida de oração: rotina diária'}),MT(addDays(3),'sched',{t:'20:00',mode:'Remoto',link:'https://meet.google.com/abc-defg-hij'})]}),
 DN('Pedro Almeida','d3',{rhythm:7,last:12,stage:1,tone:'damasco',meets:[MT(addDays(5),'sched',{t:'19:00'})]}),
 DN('Isabela Rocha','d2',{rhythm:7,last:13,stage:5,tone:'rosado',meets:[MT(addDays(-13),'done',{c:'Caráter cristão: perdão'}),MT(addDays(-27),'done',{c:'Vida na Palavra: leitura devocional'})]}),
 DN('Marcos Souza Ramos','d1',{role:'Líder',rhythm:14,last:18,gone:true,tone:'salvia'}),
 DN('Lucas Mendes','d6',{rhythm:14,last:51,stage:2,paused:true,tone:'lima',notes:'Pausou por mudança de turno no trabalho. Retomar em novembro.',meets:[MT(addDays(-51),'done',{c:'Vida de oração: ACTS'})]}),
 DN('Fernanda Lima','d6',{rhythm:14,last:26,stage:6,tone:'damasco',meets:[MT(addDays(-26),'done',{c:'Missão e chamado: dons'}),MT(addDays(9),'sched',{t:'10:00'})]}),
];
Object.assign(S,{disc:null,dtab:'rede',dpt:'geral',dq:'',df:'todos'});
const dById=id=>DISC.find(x=>x.id===id);
const kids=id=>DISC.filter(x=>x.parent===id);
const desc=id=>kids(id).flatMap(k=>[k,...desc(k.id)]);
const dStatus=d=>d.paused?'pausado':d.last<=d.rhythm?'emdia':'atrasado';
const DST={emdia:['Em dia','var(--st-int)','var(--st-int-bg)'],atrasado:['Atrasado','var(--st-rec)','var(--st-rec-bg)'],pausado:['Pausado','var(--ink-muted)','var(--surface-2)']};
const dPill=d=>{const s=DST[dStatus(d)];return `<span class="stp" style="--c:${s[1]};--b:${s[2]}"><i></i>${s[0]}</span>`;};
const dAv=(d,c='')=>`<span class="av ${c}" style="background:var(--tone-${d.tone});color:var(--tone-${d.tone}-ink)">${initials(d.n.replace('Pr. ',''))}</span>`;
const first=d=>d.n.replace('Pr. ','').split(' ')[0];
const dLbl=n=>n===0?'hoje':n===1?'ontem':`há ${n} dias`;
const fmtD=iso=>{const [y,m,d]=iso.split('-');return `${+d} ${MONTHS[+m-1].slice(0,3)}`;};
const wd=iso=>['dom','seg','ter','qua','qui','sex','sáb'][new Date(iso+'T12:00').getDay()];
const inDays=iso=>Math.round((new Date(iso+'T12:00')-new Date(2026,8,30,12))/864e5);

function cadence(d){const pct=Math.min(100,Math.round(d.last/d.rhythm*100)),over=d.last>d.rhythm;
 return `<span class="cad ${d.paused?'pz':over?'over':''}" title="${RHY[d.rhythm]} · último contato ${dLbl(d.last)}"><span class="cadt"><i style="width:${pct}%"></i></span><span class="cadl">${dLbl(d.last)}</span></span>`;}
function dProg(d){const t=dTrail(d),c=t.reduce((a,x)=>a+x.c,0),n=t.reduce((a,x)=>a+x.done,0);return {c,n,p:c?Math.round(n/c*100):0};}
function dProgTxt(d){const g=dProg(d);return g.c?`${g.n} de ${g.c} ${g.c===1?'etapa':'etapas'} · ${g.p}%`:'Sem trilha';}
function stageDots(d){if(!d.stage)return '';const g=dProg(d);return `<span class="tp" style="width:48px" title="${dProgTxt(d)}"><i style="width:${g.p}%"></i></span>`;}

/* ---------- list ---------- */
function discList(){
 const c=k=>DISC.filter(d=>dStatus(d)===k).length;
 return `<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Discipulado</h1><p class="lede">Rede de discipulado, cadência de contato e encontros de acompanhamento</p></div>
  <div class="pact">${rpBtn('discipulado','pares')}<button class="btn pri" data-a="dAdd">${ic('plus',15,2.2)}Adicionar pessoa</button></div></header>
 <section class="card dsum rise" style="--d:1">
  <div class="dsn"><b>${DISC.length}</b><span>pessoas na rede</span></div>
  <div class="dsbar">${['emdia','atrasado','pausado'].map(k=>c(k)?`<i style="flex-grow:${c(k)};background:${DST[k][1]}"></i>`:'').join('')}</div>
  <div class="dsl">${['emdia','atrasado','pausado'].map(k=>`<span><i style="background:${DST[k][1]}"></i><b>${c(k)}</b> ${DST[k][0].toLowerCase()}${c(k)>1&&k!=='emdia'?'s':''}</span>`).join('')}</div>
 </section>
 <div class="utabs rise" style="--d:2" role="tablist">${[['rede','Rede'],['resumo','Resumo']].map(t=>`<button role="tab" class="${S.dtab===t[0]?'on':''}" aria-selected="${S.dtab===t[0]}" data-a="dtab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
 <div id="dbody" class="rise" style="--d:3">${S.dtab==='rede'?dRede():dResumo()}</div>`;
}
function dRede(){
 const q=norm(S.dq);const match=d=>(S.df==='todos'||dStatus(d)===S.df)&&(!q||norm(d.n).includes(q));
 const visible=d=>match(d)||desc(d.id).some(match);
 const node=(d,depth)=>{const ch=kids(d.id).filter(visible),base=desc(d.id).length,dim=!match(d);
  return `<li class="dn ${dim?'dim':''} ${d.gone?'gone':''}" style="--dep:${depth}">
   <div class="drow" tabindex="0" data-a="dOpen" data-v="${d.id}">
    ${ch.length?`<button class="dtog ${d.open?'open':''}" data-a="dToggle" data-v="${d.id}" aria-label="${d.open?'Recolher':'Expandir'}" aria-expanded="${d.open}">${ic('chevR',14,2.2)}</button>`:'<span class="dtog nil"></span>'}
    ${dAv(d)}
    <span class="dtx"><span class="dt1"><b>${d.gone?'Vaga · antes: '+esc(d.n):esc(d.n)}</b>${d.role!=='Membro'&&!d.gone?`<em class="tag">${d.role}</em>`:''}${d.gone?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Vaga</span>':dPill(d)}</span>
     <span class="dt2">${d.gone?`<span class="vac">${ic('user',13,2)}Sem discipulador${ch.length?` · ${ch.length} ${ch.length>1?'discípulos aguardam':'discípulo aguarda'}`:''}</span>`:d.stage?`${stageDots(d)}<span>${dProgTxt(d)}</span>`:`<span>${RHY[d.rhythm]}</span>`}${base?`<span class="sep">·</span><span>${base} na base</span>`:''}${d.meets.filter(m=>m.type==='done').length?`<span class="sep">·</span><span>${d.meets.filter(m=>m.type==='done').length} encontro${d.meets.filter(m=>m.type==='done').length>1?'s':''}</span>`:''}</span></span>
    <span class="dr">${d.gone?`<button class="btn sec sm" data-a="dVacant" data-v="${d.id}">Preencher a vaga</button>`:cadence(d)}${ic('chevR',16)}</span>
   </div>
   ${ch.length&&d.open?`<ul class="dkids">${ch.map(k=>node(k,depth+1)).join('')}</ul>`:''}
  </li>`;};
 const roots=DISC.filter(d=>!d.parent&&visible(d));
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="dq" placeholder="Buscar na rede" value="${esc(S.dq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos',DISC.length],['atrasado','Atrasados'],['emdia','Em dia'],['pausado','Pausados']].map(c=>`<button class="chipf ${S.df===c[0]?'on':''}" data-a="dFilter" data-v="${c[0]}">${c[0]!=='todos'?`<i style="background:${DST[c[0]][1]}"></i>`:''}${c[1]}<small>${c[2]??DISC.filter(d=>dStatus(d)===c[0]).length}</small></button>`).join('')}</div>
  <div class="tlegend"><span>Último contato</span><span class="cad"><span class="cadt"><i style="width:60%"></i></span></span><span>dentro do ritmo</span><span class="cad over"><span class="cadt"><i style="width:100%"></i></span></span><span>atrasado</span></div></div>
  ${roots.length?`<ul class="dtree">${roots.map(r=>node(r,0)).join('')}</ul>`:`<div class="mempty"><p>Ninguém por aqui.</p><span>Ninguém na rede corresponde a esse filtro.</span></div>`}
 </section>`;
}
function dResumo(){
 const trail=DISC.filter(d=>d.stage),andam=trail.filter(d=>!d.paused&&d.stage<6).length,paus=trail.filter(d=>d.paused).length,form=trail.filter(d=>d.stage===6).length;
 const all=DISC.flatMap(d=>d.meets.map(m=>({...m,who:d}))),done=all.filter(m=>m.type==='done'),sched=all.filter(m=>m.type==='sched').sort((a,b)=>a.d<b.d?-1:1);
 const month=done.filter(m=>m.d.slice(0,7)==='2026-09').length,next7=sched.filter(m=>inDays(m.d)<=7).length;
 const late=DISC.filter(d=>dStatus(d)==='atrasado').sort((a,b)=>(b.last-b.rhythm)-(a.last-a.rhythm));
 return `<div class="rgrid">
  <section class="card kpis4"><div class="k4"><span class="kl">Em andamento</span><span class="kv">${andam}</span><span class="kd">${paus} pausado</span></div><div class="k4"><span class="kl">Encontros em setembro</span><span class="kv">${month}</span><span class="kd">${done.length} em 2026</span></div><div class="k4"><span class="kl">Próximos 7 dias</span><span class="kv">${next7}</span><span class="kd">${sched.length} agendados no total</span></div><div class="k4"><span class="kl">Formados</span><span class="kv">${form}</span><span class="kd">concluíram a trilha</span></div></section>
  <section class="card pc rtrail"><div class="sh"><h2>Trilha por pessoa</h2><span class="who">etapas da trilha</span></div>
   <div class="trl">${trail.sort((a,b)=>dProg(b).p-dProg(a).p).map(d=>`<button class="trr" data-a="dOpen" data-v="${d.id}">${dAv(d)}<span class="trn"><b>${first(d)} ${d.n.split(' ').slice(-1)}</b><span>${dProgTxt(d)}${d.paused?' · pausado':''}</span></span>
    <span class="tp ${d.paused?'pz':''}" style="width:96px"><i style="width:${dProg(d).p}%"></i></span><b class="trp">${dProg(d).p}%</b></button>`).join('')}</div>
   </section>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Próximos encontros</h2><span class="who">${sched.length}</span></div>
    ${sched.length?`<ol class="upc">${sched.map(m=>`<li><span class="ud"><b>${fmtD(m.d).split(' ')[0]}</b><span>${fmtD(m.d).split(' ')[1]}</span></span><span class="ub"><b>${esc(m.who.n)}</b><span>${wd(m.d)} · ${m.time.replace(':00','h')} · ${m.mode==='Remoto'?'Remoto':'Presencial'}</span></span><span class="who">${inDays(m.d)===0?'hoje':'em '+inDays(m.d)+'d'}</span></li>`).join('')}</ol>`:'<p class="who">Nada agendado.</p>'}</section>
   <section class="card pc"><div class="sh"><h2>Contato atrasado</h2><span class="who">por dias além do ritmo</span></div>
    <ol class="late">${late.slice(0,4).map(d=>`<li><button class="lt" data-a="dOpen" data-v="${d.id}">${dAv(d)}<span><b>${esc(d.n)}</b><span>${RHY[d.rhythm]} · ${dLbl(d.last)}</span></span><em>+${d.last-d.rhythm}d</em></button></li>`).join('')}</ol></section>
  </div>
 </div>`;
}

/* ---------- detail ---------- */
function discDetail(){
 const d=dById(S.disc);if(!d){S.disc=null;return discList();}
 const p=d.parent&&dById(d.parent);
 return `<nav class="crumb rise"><span class="soft">Cuidado</span>${ic('chevR',13,2)}<button class="lnk back" data-a="dBack">Discipulado</button>${ic('chevR',13,2)}<span>${esc(d.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${dAv(d,'xl')}<div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(d.n)}</h1>${dPill(d)}</div>
   <p>${d.role} · Discipulado por ${p?`<button class="lnk inl" data-a="dOpen" data-v="${p.id}">${esc(p.n)}</button>`:'ninguém (topo da rede)'}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="dReg">Registrar encontro</button><button class="btn pri" data-a="dSched">${ic('calendar',15)}Agendar</button>
   <div style="position:relative"><button class="ibtn" data-a="dMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="dPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="dTransfer">${ic('swap',17)}Transferir discipulador</button>${d.stage?`<button class="pi" data-a="dPause">${ic('pause',17)}${d.paused?'Retomar discipulado':'Pausar discipulado'}</button>`:''}<hr><button class="pi danger" data-a="dRemove">${ic('x',17)}Remover da rede</button></div></div></div>
  <div class="ptabs" role="tablist">${[['geral','Detalhes'],['enc','Encontros']].map(t=>`<button role="tab" class="${S.dpt===t[0]?'on':''}" data-a="dpt" data-v="${t[0]}">${t[1]}${t[0]==='enc'&&d.meets.length?`<small>${d.meets.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="dtb" class="rise" style="--d:2">${S.dpt==='geral'?dGeral(d):dEnc(d)}</div>`;
}
function dGeral(d){
 const k=kids(d.id),next=d.meets.filter(m=>m.type==='sched').sort((a,b)=>a.d<b.d?-1:1)[0],due=d.rhythm-d.last;
 return `<div class="pgrid">
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Cadência de contato</h2><span class="who">${d.paused?'Pausado':due>=0?`próximo contato em até <b>${due} ${due===1?'dia':'dias'}</b>`:`<b style="color:var(--st-rec)">${-due} dias</b> além do ritmo`}</span></div>
    <div class="cadbig ${d.paused?'pz':d.last>d.rhythm?'over':''}"><div class="cbt">${Array.from({length:Math.max(d.rhythm,d.last)},(_,i)=>`<i class="${i<d.last?(i<d.rhythm?'on':'ov'):''} ${i===d.rhythm-1?'lim':''}"></i>`).join('')}</div>
     <div class="cbl"><span>Último contato <b>${dLbl(d.last)}</b></span><span>Ritmo: ${d.rhythm} dias</span></div></div>
    <div class="fld" style="margin-top:16px"><span class="fl">Ritmo de contato</span><div class="yn" role="radiogroup" id="rhy">${[7,14,30].map(r=>`<label><input type="radio" name="rhy" value="${r}" ${d.rhythm===r?'checked':''}><span>${RHY[r]}</span></label>`).join('')}</div></div>
    <p class="who" style="margin:10px 0 0">Calculado a partir do último encontro realizado.${next?` Próximo agendado: <b>${wd(next.d)}, ${fmtD(next.d)} às ${next.time.replace(':00','h')}</b>.`:''}</p>
   </section>
   ${d.stage?`<section class="card pc"><div class="sh"><h2>Trilha</h2><span class="who">${dTrail(d).filter(j=>j.done>=j.c).length} de ${d.trail.length} itens concluídos</span></div>
    <ol class="ct-tl">${dTrail(d).map(dTrailRow).join('')}
     <li class="ct-addn"><span class="ct-node add">${ic('plus',14,2.2)}</span><button class="ct-cc add" data-a="dAddJ"><b>Adicionar à trilha</b><span>Jornada, curso, pregação, música ou material</span></button></li></ol>
    <p class="who" style="margin:12px 0 0">Toque em um item para abri-lo. O progresso vem do que o discípulo assiste e conclui no app.</p></section>`:''}
   <section class="card pc"><div class="sh"><h2>Discípulos</h2><button class="btn sec sm" data-a="dAddUnder">${ic('plus',14,2.2)}Adicionar discípulo</button></div>
    ${k.length?`<div class="dks">${k.map(c=>`<button class="dk" data-a="dOpen" data-v="${c.id}">${dAv(c)}<span class="dkt"><b>${esc(c.n)}</b><span>${c.stage?dProgTxt(c):RHY[c.rhythm]}${desc(c.id).length?` · ${desc(c.id).length} na base`:''}</span></span>${dPill(c)}</button>`).join('')}</div>`:`<div class="soft-empty"><p>${first(d)} ainda não discipula ninguém.</p></div>`}</section>
  </div>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Anotações</h2><span class="who" id="nsaved"></span></div>
    <textarea id="dnotes" class="ta" rows="6" placeholder="Pedidos, contexto, próximos passos… só a liderança vê.">${esc(d.notes)}</textarea></section>
   <section class="card pc"><div class="sh"><h2>Discipulador</h2><button class="lnk" data-a="dTransfer">Transferir</button></div>
    ${d.parent?(()=>{const p=dById(d.parent);return `<button class="dk" data-a="dOpen" data-v="${p.id}">${dAv(p)}<span class="dkt"><b>${esc(p.n)}</b><span>${p.role} · ${RHY[p.rhythm]}</span></span>${ic('chevR',16)}</button>`;})():`<p class="who" style="margin:0">Topo da rede. Ninguém acima.</p>`}</section>
  </div>
 </div>`;
}
function dEnc(d){
 const ms=d.meets.slice().sort((a,b)=>a.d<b.d?1:-1),sched=ms.filter(m=>m.type==='sched').reverse(),done=ms.filter(m=>m.type==='done');
 if(!ms.length)return `<section class="card pc"><div class="eempty"><span class="eei">${ic('calendar',22)}</span><p>Nenhum encontro ainda.</p><span class="who">Agende o próximo ou registre um encontro que já aconteceu.</span><div class="row2" style="justify-content:center"><button class="btn sec" data-a="dReg">Registrar encontro</button><button class="btn pri" data-a="dSched">Agendar encontro</button></div></div></section>`;
 const item=m=>`<li class="${m.type}"><span class="ed"><b>${fmtD(m.d).split(' ')[0]}</b><span>${fmtD(m.d).split(' ')[1]}</span></span>
  <div class="eb2"><div class="et"><div><b>${m.type==='done'?`<button class="lnk record-title" data-a="dViewMeet" data-v="${m.id}">${esc(m.content||'Encontro realizado')}</button>`:m.type==='sched'?`${m.mode==='Remoto'?'Encontro remoto':'Encontro presencial'}`:esc(m.content||'Encontro')}</b><span class="who">${wd(m.d)} · ${m.time.replace(':00','h')}${m.type==='done'?` · ${m.mode}`:` · ${inDays(m.d)===0?'hoje':'em '+inDays(m.d)+' dias'}`}${m.mat?' · '+esc(m.mat):''}</span></div>
   <div class="ea">${m.type==='sched'?`${m.link?`<button class="btn sec sm" data-a="copy" data-v="${esc(m.link)}">Copiar link</button>`:''}<button class="btn pri sm" data-a="dConclude" data-v="${m.id}">Concluir</button>`:''}<button class="ibtn sm" data-a="dDelMeet" data-v="${m.id}" aria-label="Excluir encontro" title="Excluir encontro">${ic('x',14)}</button></div></div>
   ${m.note?`<p class="who" style="margin:6px 0 0">${esc(m.note)}</p>`:''}</div></li>`;
 return `<section class="card pc"><div class="sh"><h2>Encontros</h2><div class="row2"><button class="btn sec sm" data-a="dReg">Registrar</button><button class="btn pri sm" data-a="dSched">Agendar</button></div></div>
  ${sched.length?`<p class="eh">Agendados</p><ol class="elist">${sched.map(item).join('')}</ol>`:''}
  ${done.length?`<p class="eh">Realizados</p><ol class="elist">${done.map(item).join('')}</ol>`:''}</section>`;
}

function discAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#dq');if(q)q.addEventListener('input',e=>{S.dq=e.target.value;const pos=e.target.selectionStart;$('#dbody').innerHTML=dRede();discAfter();const n=$('#dq');n.focus();n.setSelectionRange(pos,pos);});
 const r=$('#rhy');if(r)r.addEventListener('change',e=>{const d=dById(S.disc);d.rhythm=+e.target.value;$('#dtb').innerHTML=dGeral(d);discAfter();toast(`Ritmo de ${first(d)} alterado para ${RHY[d.rhythm].toLowerCase()}`);});
 const n=$('#dnotes');if(n){let t;n.addEventListener('input',()=>{$('#nsaved').textContent='Salvando…';clearTimeout(t);t=setTimeout(()=>{dById(S.disc).notes=n.value;$('#nsaved').innerHTML=`${ic('check',13,2.4)} Salvo`;},700);});}
}
const dJById=id=>JORNS.find(x=>x.id===id);
function dTrail(d){if(!d.trail)d.trail=['j2','j1'].map(id=>({k:'Jornada',id}));let left=Math.round(d.stage/6*9);
 return d.trail.map(t=>{if(t.k&&t.k!=='Jornada'){const c=t.k==='Curso'?4:/^Série/.test(t.t)?3:1;return {k:t.k,n:t.t,note:t.note||'',c,done:t.done?c:0,courses:[]};}
  const j=dJById(t.id)||{n:'Jornada',courses:[]},cs=j.courses.map(c=>c.n),done=Math.min(cs.length,left);left=Math.max(0,left-cs.length);return {k:'Jornada',id:t.id,n:j.n,note:t.note||'',c:cs.length,done,courses:cs};});}
function dTrailRow(j,i){const jor=j.k==='Jornada',pr=Math.round(j.done/Math.max(1,j.c)*100),fin=j.done>=j.c,nt=j.note?`<span style="white-space:normal;font-style:italic">${esc(j.note)}</span>`:'';
 const acts=`<button type="button" class="ibtn sm" data-a="dJSwap" data-v="${i}" title="Trocar por outro item" aria-label="Trocar item">${ic('swap',14)}</button><button type="button" class="ibtn sm" data-a="dJDel" data-v="${i}" title="Remover da trilha" aria-label="Remover da trilha">${ic('x',14)}</button>${ic('chevR',16)}`;
 return `<li><span class="ct-node">${fin?ic('check',16,2.6):i+1}</span>`+(jor
  ?`<div class="ct-cc" tabindex="0" data-a="dJGo" data-v="${i}" style="grid-template-columns:minmax(0,1fr) auto auto auto auto auto"><div class="ct-ccb"><b>${tpIcon('Jornada',14)}${esc(j.n)}</b><span style="white-space:normal">${j.courses.map((c,k)=>`${k<j.done?'✓':'○'} ${esc(c)}`).join('  ·  ')}</span>${nt}</div><span class="ct-ccm"><b>${j.c}</b> etapas</span><span class="ct-ccp"><span class="tr"><i style="width:${pr}%"></i></span><small>${j.done} de ${j.c} · ${pr}%</small></span>${acts}</div></li>`
  :`<div class="ct-cc" tabindex="0" data-a="dJGo" data-v="${i}" style="grid-template-columns:minmax(0,1fr) auto auto auto auto auto"><div class="ct-ccb"><b>${tpIcon(j.k,14)}${esc(j.n)}</b><span>${j.k}</span>${nt}</div><span class="ct-ccm"><b>${j.c}</b> ${j.c===1?'etapa':'etapas'}</span><span class="ct-ccp"><span class="tr"><i style="width:${pr}%"></i></span><small>${j.done} de ${j.c} · ${pr}%</small></span>${acts}</div></li>`);}
const TP_TYPES=['Jornada','Curso','Pregação','Música','Material'],TP_CLR={Jornada:'#0e7c66'},tpIc=k=>k==='Jornada'?'route':CTYPE_IC[k];
const tpKey=t=>t.k==='Jornada'||!t.k?'Jornada|'+t.id:t.k+'|'+t.t;
const tpIcon=(k,sz=15)=>`<span class="mc-i t-${k==='Jornada'?'cursos':MC_PAGE[k]}" ${TP_CLR[k]?`style="--k:${TP_CLR[k]}"`:''}>${ic(tpIc(k),sz,1.8)}</span>`;
/* mesmo diálogo "Vincular conteúdo" do ministério, sem "Para quem" e "Obrigatório"; replace = índice do item que está sendo trocado */
function dTrailPick(d,replace,re){dTrail(d);const single=replace!=null,have=new Set(d.trail.map(tpKey));let type=TP_TYPES[0],sel=new Set(),q='';
 const items=t=>t==='Jornada'?JORNS.filter(j=>j.st==='ativa').map(j=>({k:'Jornada|'+j.id,l:j.n})):CONTENT[t].map(x=>({k:t+'|'+x,l:x}));
 openDlg(`${dlgHead(single?'Trocar item da trilha':'Adicionar à trilha',`Trilha de ${esc(first(d))}`)}<div class="mcp">
  <div class="mcp-ty">${TP_TYPES.map(t=>`<button type="button" data-ty="${t}" class="${t===type?'on':''}">${tpIcon(t)}${t}<small id="tpN-${t}"></small></button>`).join('')}</div>
  <div class="mcp-r"><label class="sbox">${ic('search',16)}<input id="tpQ" placeholder="Buscar na biblioteca" autocomplete="off"></label><div class="mtf-list" id="tpL" style="max-height:260px"></div>
   <label class="fld" style="margin-top:12px"><span class="fl">Observação <small>opcional</small></span><textarea class="ta" id="tpNote" rows="2" placeholder="Ex.: Assistir antes do nosso próximo encontro"></textarea></label></div></div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" id="tpOk" disabled>${single?'Trocar':'Adicionar'}</button></div>`,'lg');
 const paint=()=>{const ql=norm(q),l=items(type).filter(x=>!ql||norm(x.l).includes(ql));
  $('#tpL').innerHTML=l.map(x=>{const had=have.has(x.k);return `<button type="button" class="mtf-p ${sel.has(x.k)?'on':''}" data-k="${esc(x.k)}" ${had?'disabled':''}>${tpIcon(type,14)}<span class="dkt"><b>${esc(x.l)}</b><span>${had?'Já na trilha':type}</span></span><i class="mtf-ck">${ic('check',12,2.6)}</i></button>`;}).join('')||'<p class="who" style="padding:10px">Nada encontrado.</p>';
  TP_TYPES.forEach(t=>{const n=[...sel].filter(k=>k.startsWith(t+'|')).length;$('#tpN-'+t).textContent=n||'';});
  const ok=$('#tpOk');ok.disabled=!sel.size;ok.textContent=single?'Trocar':sel.size?`Adicionar ${sel.size} ${sel.size===1?'item':'itens'}`:'Adicionar';};
 const D=$('.mcp');D.addEventListener('click',e=>{const t=e.target.closest('[data-ty],[data-k]');if(!t||t.disabled)return;
  if(t.dataset.ty){type=t.dataset.ty;D.querySelectorAll('[data-ty]').forEach(x=>x.classList.toggle('on',x===t));paint();}
  if(t.dataset.k){const k=t.dataset.k;if(single){sel.clear();sel.add(k);}else sel.has(k)?sel.delete(k):sel.add(k);paint();}});
 $('#tpQ').addEventListener('input',e=>{q=e.target.value;paint();});paint();
 $('#tpOk').onclick=()=>{const note=$('#tpNote').value.trim(),mk=k=>{const [ty,v]=[k.slice(0,k.indexOf('|')),k.slice(k.indexOf('|')+1)];return ty==='Jornada'?{k:ty,id:v,note}:{k:ty,t:v,note,done:false};},es=[...sel].map(mk);
  if(single)d.trail[replace]=es[0];else es.forEach(x=>d.trail.push(x));
  closeDlg();(re||reDisc)();toast(single?`Item trocado na trilha de ${first(d)}`:`${es.length} ${es.length===1?'item adicionado':'itens adicionados'} à trilha de ${first(d)}`);};}
function reDisc(){const d=dById(S.disc);$('#dtb').innerHTML=S.dpt==='geral'?dGeral(d):dEnc(d);$$('.ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.dpt));const e=$('.ptabs [data-v=enc]');if(e)e.innerHTML=`Encontros${d.meets.length?`<small>${d.meets.length}</small>`:''}`;discAfter();}
const partsOf=d=>{const p=d.parent&&dById(d.parent);return [d.n,p?p.n:null].filter(Boolean);};
function partsField(d){return `<div class="fld"><span class="fl">Participantes</span><div class="parts" id="parts">${partsOf(d).map(n=>`<span class="pchip">${esc(n)}</span>`).join('')}<input id="partIn" placeholder="Adicionar…" list="partList" autocomplete="off"></div><datalist id="partList">${MEMBERS.map(m=>`<option value="${esc(m.n)}">`).join('')}</datalist></div>`;}
function bindParts(){const i=$('#partIn');if(!i)return;const add=()=>{const v=i.value.trim();if(!v)return;i.insertAdjacentHTML('beforebegin',`<span class="pchip">${esc(v)}<button type="button" aria-label="Remover" onclick="this.parentNode.remove()">×</button></span>`);i.value='';};i.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===','){e.preventDefault();add();}});i.addEventListener('change',add);}
function regDlg(d,from){
 openDlg(`${dlgHead(from?'Concluir encontro':'Registrar encontro',from?'Conte o que foi tratado para fechar o encontro agendado.':'Para um encontro que já aconteceu e não foi agendado antes.')}
 <form class="fgrid one" id="regF" novalidate>
  <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${from?from.d:TODAY.toISOString().slice(0,10)}" max="${TODAY.toISOString().slice(0,10)}"><span class="err"></span></label>
  <label class="fld"><span class="fl">Conteúdo tratado</span><textarea class="ta" name="c" rows="3" placeholder="O que foi conversado ou trabalhado"></textarea><span class="err"></span></label>
  ${partsField(d)}
  <label class="fld"><span class="fl">Anotação pessoal <small>opcional</small></span><textarea class="ta" name="note" rows="2" placeholder="Só você vê"></textarea></label>
  <label class="fld"><span class="fl">Material de apoio <small>opcional</small></span><span class="selw"><select name="mat"><option value="">Nenhum</option>${d.stage?`<option>Trilha · ${TRILHA[d.stage-1]}</option>`:''}<option>Estudo · O Sermão do Monte</option><option>Estudo · Frutos do Espírito</option><option>Livro · Vida com propósito</option></select>${ic('updown',14)}</span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${from?'Concluir':'Registrar'}</button></div></form>`);
 bindParts();const f=$('#regF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;i.focus();};
  if(!fd.get('d'))return bad('d','Escolha a data');if(!fd.get('c').trim())return bad('c','Descreva o que foi tratado');
  const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{if(from)d.meets.splice(d.meets.indexOf(from),1);d.meets.push(MT(fd.get('d'),'done',{c:fd.get('c').trim(),note:fd.get('note'),mat:fd.get('mat'),mode:from?from.mode:'Presencial',t:from?from.time:'19:30',parts:$$('#parts .pchip').map(p=>p.textContent.replace('×','').trim())}));
   d.last=Math.max(0,-inDays(fd.get('d')));closeDlg();S.dpt='enc';render();toast(`Encontro com ${first(d)} registrado · contato em dia`);},800);});
}

const DA={
 dtab:v=>{S.dtab=v;$$('.utabs button').forEach(b=>{b.classList.toggle('on',b.dataset.v===v);});$('#dbody').innerHTML=v==='rede'?dRede():dResumo();discAfter();},
 dFilter:v=>{S.df=v;$('#dbody').innerHTML=dRede();discAfter();},
 dVacant:(v,b,e)=>{e.stopPropagation();toast('Escolha quem entra na vaga: só quem tem Editar ou Admin em Discipulado.');},
 dToggle:(v,b,e)=>{e.stopPropagation();const d=dById(v);d.open=!d.open;$('#dbody').innerHTML=dRede();discAfter();},
 dOpen:(v,b,e)=>{if(e&&e.target.closest('.dtog'))return;S.disc=v;S.dpt='geral';closePops();render();window.scrollTo({top:0,behavior:'smooth'});},
 dBack:()=>{S.disc=null;render();},
 dpt:v=>{S.dpt=v;reDisc();tabInd();},
 dMenu:()=>{const p=$('#dPop');closePops(p);p.classList.toggle('open');},
 dReg:()=>regDlg(dById(S.disc)),
 dConclude:v=>{const d=dById(S.disc);regDlg(d,d.meets.find(m=>m.id===v));},
 dSched:()=>{const d=dById(S.disc);openDlg(`${dlgHead('Agendar encontro','O conteúdo tratado é preenchido quando você concluir o encontro.')}
  <form class="fgrid" id="schF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" min="${TODAY.toISOString().slice(0,10)}" value="${addDays(7)}"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input type="time" name="t" value="19:30"></label>
   <div class="wide">${partsField(d)}</div>
   <div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup" id="modeG"><label><input type="radio" name="mode" value="Presencial" checked><span>${ic('pin',15)}&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"><span>${ic('monitor',15)}&nbsp;Remoto</span></label></div></div>
   <label class="fld wide" id="whereF"><span class="fl">Local <small>opcional</small></span><input name="where" placeholder="Ex.: Café da igreja, sala 2"></label>
   <label class="fld wide" id="linkF" hidden><span class="fl">Link da reunião <small>opcional</small></span><input name="link" type="url" placeholder="Meet, Teams, Zoom… pode preencher depois"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Agendar</button></div></form>`);
  bindParts();$('#modeG').addEventListener('change',e=>{const r=e.target.value==='Remoto';$('#linkF').hidden=!r;$('#whereF').hidden=r;});
  const f=$('#schF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);if(!fd.get('d')){const i=f.querySelector('[name=d]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Escolha a data';return;}
   const lk=fd.get('link');if(lk&&!/^https?:\/\//.test(lk)){const i=f.querySelector('[name=link]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Link inválido';return;}
   const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{d.meets.push(MT(fd.get('d'),'sched',{t:fd.get('t'),mode:fd.get('mode'),link:lk}));closeDlg();S.dpt='enc';render();toast(`Encontro agendado para ${wd(fd.get('d'))}, ${fmtD(fd.get('d'))} · convite enviado`);},800);});},
 dDelMeet:v=>{const d=dById(S.disc),i=d.meets.findIndex(m=>m.id===v),m=d.meets[i];
  confirmDel({title:m.type==='sched'?'Cancelar este encontro?':'Excluir este registro?',body:m.type==='sched'?`Os participantes serão avisados do cancelamento de ${wd(m.d)}, ${fmtD(m.d)}.`:`O registro de ${fmtD(m.d)} sai do histórico de ${first(d)}. A cadência de contato é recalculada.`,label:m.type==='sched'?'Cancelar encontro':'Excluir registro',onConfirm:()=>{d.meets.splice(i,1);reDisc();toast(m.type==='sched'?'Encontro cancelado':'Registro excluído',()=>{d.meets.splice(i,0,m);reDisc();});}});},
 dAddJ:()=>{closePops();dTrailPick(dById(S.disc));},
 dJSwap:v=>dTrailPick(dById(S.disc),+v),
 dJDel:v=>{const d=dById(S.disc),r=dTrail(d)[+v],t=d.trail[+v];confirmDel({title:'Remover este item da trilha?',body:`“${esc(r.n)}” sai da trilha de ${esc(first(d))}. O conteúdo continua existindo em Conteúdo.`,label:'Remover',onConfirm:()=>{d.trail.splice(+v,1);reDisc();toast('Item removido da trilha',()=>{d.trail.splice(+v,0,t);reDisc();});}});},
 dJGo:v=>{const d=dById(S.disc),t=(dTrail(d),d.trail[+v]);if(t.k&&t.k!=='Jornada'){S.disc=null;A.nav(MC_PAGE[t.k]);return;}S.jor=t.id;S.jtab='trilha';S.active='jornadas';S.disc=null;render();window.scrollTo({top:0});},
 dStage:()=>{const d=dById(S.disc),t=TRILHA[d.stage-1];d.stage++;reDisc();toast(`${first(d)} concluiu “${t}”`,()=>{d.stage--;reDisc();});},
 dPause:()=>{closePops();const d=dById(S.disc);d.paused=!d.paused;render();toast(d.paused?`Discipulado de ${first(d)} pausado`:`Discipulado de ${first(d)} retomado`);},
 dRemove:()=>{closePops();const d=dById(S.disc),k=kids(d.id),p=d.parent&&dById(d.parent);
  confirmDel({title:`Remover ${first(d)} da rede?`,body:`${k.length?`${k.length} ${k.length>1?'discípulos passam':'discípulo passa'} a ser acompanhado${k.length>1?'s':''} por ${p?esc(p.n):'ninguém (topo da rede)'}. `:''}Os encontros registrados são apagados.`,label:'Remover da rede',typed:k.length?first(d):null,onConfirm:()=>{k.forEach(c=>c.parent=d.parent);DISC.splice(DISC.indexOf(d),1);S.disc=null;render();toast(`${first(d)} removido(a) da rede`);}});},
 dTransfer:()=>{closePops();const d=dById(S.disc),bad=new Set([d.id,...desc(d.id).map(x=>x.id)]);const opts=DISC.filter(x=>!bad.has(x.id));
  openDlg(`${dlgHead('Transferir discipulador',`Quem passa a acompanhar ${first(d)}?`)}<div class="pick">${[{id:'',n:'Ninguém — topo da rede',tone:'salvia',role:''},...opts].map(o=>`<label class="pk">${o.id?dAv(o):`<span class="av ghost">${ic('arrowR',14,2)}</span>`}<span><b>${esc(o.n)}</b><small>${o.id?`${o.role} · ${desc(o.id).length} na base`:'Sem discipulador'}</small></span><input type="radio" name="np" value="${o.id}" ${o.id===(d.parent||'')?'checked':''}></label>`).join('')}</div>
   <p class="who" style="margin:12px 0 0">${kids(d.id).length?`Os ${desc(d.id).length} da base de ${first(d)} vão junto.`:''}</p><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="dDoTransfer">Transferir</button></div>`,'sm');},
 dDoTransfer:(v,b)=>{const d=dById(S.disc),np=$('input[name=np]:checked').value||null;if(np===d.parent){closeDlg();return;}b.classList.add('busy');setTimeout(()=>{const old=d.parent;d.parent=np;closeDlg();render();toast(`${first(d)} agora é acompanhado(a) por ${np?dById(np).n:'ninguém (topo)'}`,()=>{d.parent=old;render();});},700);},
 dAddUnder:()=>DA.dAdd(S.disc),
 dAdd:(under)=>{under=typeof under==='string'&&under.startsWith('d')?under:'';const inNet=new Set(DISC.map(x=>norm(x.n.replace('Pr. ',''))));const cand=MEMBERS.filter(m=>!inNet.has(norm(m.n)));
  openDlg(`${dlgHead('Adicionar pessoa à rede','Precisa ser um membro cadastrado. Pastores também são membros.')}
  <form class="fgrid" id="daF" novalidate style="grid-template-columns:1fr 1fr">
   <div class="fld wide"><span class="fl">Pessoa</span><label class="sbox" style="margin-bottom:8px">${ic('search',16)}<input id="daq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="dapick" style="max-height:200px">${candList(cand,'')}</div><span class="err"></span></div>
   <label class="fld wide"><span class="fl">Discipulado por</span><span class="selw"><select name="parent"><option value="">Ninguém — topo da rede</option>${DISC.map(x=>`<option value="${x.id}" ${x.id===under?'selected':''}>${esc(x.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <div class="fld wide"><span class="fl">Papel</span><div class="yn" role="radiogroup">${['Membro','Líder','Pastor'].map((r,i)=>`<label><input type="radio" name="role" value="${r}" ${!i?'checked':''}><span>${r}</span></label>`).join('')}</div></div>
   <div class="fld wide"><span class="fl">Ritmo de contato</span><div class="yn" role="radiogroup">${[7,14,30].map(r=>`<label><input type="radio" name="rhy" value="${r}" ${r===14?'checked':''}><span>${RHY[r]}</span></label>`).join('')}</div></div>
   <label class="tog wide"><input type="checkbox" name="trail" checked><span class="sw"></span><span><b>Iniciar a trilha de discipulado</b><small>Começa em “${TRILHA[0]}”</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Adicionar</button></div></form>`);
  $('#daq').addEventListener('input',e=>{$('#dapick').innerHTML=candList(cand,e.target.value);});
  const f=$('#daF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),pid=fd.get('pm');if(!pid){const el=$('#dapick').closest('.fld');el.classList.add('bad');el.querySelector('.err').textContent='Escolha um membro';return;}
   const m=byId(pid),b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const nd=DN(m.n,fd.get('parent')||null,{role:fd.get('role'),rhythm:+fd.get('rhy'),last:0,stage:fd.get('trail')?1:0,tone:m.tone});DISC.push(nd);if(nd.parent)dById(nd.parent).open=true;closeDlg();S.disc=null;S.dtab='rede';render();toast(`${m.n.split(' ')[0]} entrou na rede`);setTimeout(()=>{const r=document.querySelector(`.drow[data-v=${nd.id}]`);r&&r.classList.add('flash');r&&r.scrollIntoView({block:'center',behavior:'smooth'});},100);},800);});},
};
function candList(c,q){q=norm(q);const l=c.filter(m=>norm(m.n).includes(q)).slice(0,8);return l.length?l.map(m=>`<label class="pk">${mav(m)}<span><b>${esc(m.n)}</b><small>${m.min.length?m.min.join(', '):ST[m.st].l}</small></span><input type="radio" name="pm" value="${m.id}"></label>`).join(''):'<p class="who" style="padding:10px">Ninguém encontrado fora da rede.</p>';}

