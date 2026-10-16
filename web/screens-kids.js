/* ================= Kids ================= */
let _kid=0;const kid=p=>p+(++_kid);
const TURMAS=[{id:'t1',n:'Berçário',min:0,max:2},{id:'t2',n:'Maternal',min:3,max:4},{id:'t3',n:'Jardim',min:5,max:6},{id:'t4',n:'Kids A',min:7,max:9}];
const KTEAMS=[{id:'k1',n:'Berçário — Domingo manhã',m:['Cláudia Ferraz','Patrícia Lima']},{id:'k2',n:'Maternal — Domingo manhã',m:['Mônica Souza']},{id:'k3',n:'Kids A — Domingo manhã',m:['Henrique Costa','Giovanna Martins']}];
const SALAS=[{id:'s1',n:'Berçário',cap:15,turma:'t1',team:'k1',active:true,pres:8,mon:'Carla Nunes'},{id:'s2',n:'Maternal',cap:20,turma:'t2',team:'k2',active:true,pres:12,mon:'João Lima'},{id:'s3',n:'Jardim',cap:22,turma:'t3',team:'',active:true,pres:15,mon:'Ana Souza'},{id:'s4',n:'Kids A',cap:25,turma:'t4',team:'k3',active:true,pres:18,mon:'Marcos Pereira'}];
const KWAIT=2,KREG=82;
const tById=id=>TURMAS.find(t=>t.id===id),kById=id=>KTEAMS.find(t=>t.id===id),sById=id=>SALAS.find(s=>s.id===id);
const faixa=t=>t?`${t.min}–${t.max} anos`:'—';
const KTONE=['ceu','damasco','lima','rosado','menta','salvia'];
const kTone=i=>KTONE[i%KTONE.length];
const zelo=`<span class="zelo">${ic('swap',13,2)}Sincronizado com o <b>Zelo Kids</b></span>`;
const kHead=(t,sub,act)=>`<header class="ph rise"><div><p class="eb">Kids</p><h1>${t}</h1><p class="lede">${sub}</p></div><div class="pact">${act||''}</div></header>`;

function kVis(){
 const act=SALAS.filter(s=>s.active),pres=act.reduce((a,s)=>a+s.pres,0),vol=new Set(KTEAMS.flatMap(t=>t.m)).size;
 return `${kHead('Kids','Administração do Ministério Infantil',zelo)}
 <section class="card korg rise" style="--d:1"><div class="kon"><span class="eb" style="margin:0">Como se organiza</span><p class="who" style="margin:4px 0 0">Salas, times e turmas são geridos aqui. Cadastro de crianças, famílias e check-in continuam no Zelo Kids.</p></div>
  <div class="kflow">
   <button class="kfn" data-a="nav" data-v="kturmas"><span class="kfi">${ic('users',16)}</span><span><b>Turma</b><small>a faixa etária</small></span></button><span class="kfa">${ic('arrowR',14,2)}<small>alocada em</small></span>
   <button class="kfn kmain" data-a="nav" data-v="ksalas"><span class="kfi">${ic('door',16)}</span><span><b>Sala</b><small>o espaço, com capacidade</small></span></button><span class="kfa rev">${ic('arrowR',14,2)}<small>servida por</small></span>
   <button class="kfn" data-a="nav" data-v="ktimes"><span class="kfi">${ic('hand',16)}</span><span><b>Time</b><small>voluntários e professores</small></span></button>
  </div></section>
 <section class="card kpis4 rise" style="--d:2">
  <div class="k4"><span class="kl">Salas abertas</span><span class="kv">${act.length}</span><span class="kd">de ${SALAS.length} cadastradas</span></div>
  <div class="k4"><span class="kl">Crianças presentes</span><span class="kv">${pres}<small class="kof"> de ${KREG}</small></span><span class="kmeter"><i style="width:${Math.round(pres/KREG*100)}%"></i></span></div>
  <div class="k4"><span class="kl">Voluntários servindo</span><span class="kv">${vol}</span><span class="kd">em ${KTEAMS.length} times</span></div>
  <div class="k4"><span class="kl">Aguardando check-in</span><span class="kv" style="color:var(--st-sol)">${KWAIT}</span><span class="kd">na recepção agora</span></div>
 </section>
 <div class="sh rise" style="--d:3;margin-top:6px"><h2><span class="live"><i></i>Ocupação ao vivo</span></h2><span class="who">Domingo, 18/09/2026 · atualizado há 1 min</span></div>
 <div class="kroom rise" style="--d:3">${act.map((s,i)=>{const t=tById(s.turma),tm=kById(s.team),r=Math.round(s.pres/s.cap*100);return `<article class="card kr">
  <div class="kr1"><div><b>${esc(s.n)}</b><span>${t?esc(t.n)+' · '+faixa(t):'Sem turma'}</span></div><span class="krn"><b>${s.pres}</b>/${s.cap}</span></div>
  <div class="seats" aria-label="${s.pres} de ${s.cap} lugares ocupados">${Array.from({length:s.cap},(_,j)=>`<i class="${j<s.pres?'on':''}"></i>`).join('')}</div>
  <div class="kr3"><span class="cresp"><span class="av" style="background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${initials(s.mon)}</span>${esc(s.mon)}</span><span class="${r>=85?'full':''}">${r}% ocupada</span></div>
  ${tm?'':`<button class="kwarn" data-a="nav" data-v="ksalas">${ic('alert',13,2)}Sala sem time vinculado</button>`}
 </article>`;}).join('')}</div>`;
}

function kSalas(){
 const act=SALAS.filter(s=>s.active),cap=act.reduce((a,s)=>a+s.cap,0),noT=SALAS.filter(s=>!s.turma).length,noTeam=SALAS.filter(s=>!s.team).length;
 return `${kHead('Salas','Espaços físicos do Ministério Infantil',`${rpBtn('kids','salas')}<button class="btn pri" data-a="kSala">${ic('plus',15,2.2)}Nova sala</button>`)}
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Salas ativas</span><span class="kv">${act.length}</span><span class="kd">${SALAS.length-act.length} inativa${SALAS.length-act.length===1?'':'s'}</span></div>
  <div class="k4"><span class="kl">Capacidade total</span><span class="kv">${cap}</span><span class="kd">crianças por culto</span></div>
  <div class="k4"><span class="kl">Sem turma</span><span class="kv">${noT}</span><span class="kd">sem faixa etária definida</span></div>
  <div class="k4"><span class="kl">Sem time</span><span class="kv" style="${noTeam?'color:var(--st-sol)':''}">${noTeam}</span><span class="kd">sem voluntários escalados</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="trow ks thead"><span>Sala</span><span>Turma</span><span>Capacidade</span><span>Time</span><span>Status</span><span></span></div>
  ${SALAS.map((s,i)=>{const t=tById(s.turma),tm=kById(s.team);return `<div class="trow ks ${s.active?'':'off'}">
   <span class="tn"><span class="htile" style="--s:36px;background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${ic('door',17)}</span><span class="hn"><b>${esc(s.n)}</b><span>${t?faixa(t):'Sem faixa etária'}</span></span></span>
   <span class="kt">${t?esc(t.n):'<span class="soft">—</span>'}</span>
   <span class="kc"><span class="kcap">${Array.from({length:Math.ceil(s.cap/5)},()=>'<i></i>').join('')}</span><b>${s.cap}</b></span>
   <span class="ktm">${tm?esc(tm.n):'<em class="tag warn">Sem time</em>'}</span>
   <span class="ts">${s.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativa</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativa</span>'}</span>
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="kMenu" data-v="${s.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kPop-${s.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kSala" data-v="${s.id}">${ic('pen',16)}Editar sala</button><button class="pi" data-a="kSalaTog" data-v="${s.id}">${ic(s.active?'pause':'check',16)}${s.active?'Desativar':'Reativar'}</button><hr><button class="pi danger" data-a="kSalaDel" data-v="${s.id}">${ic('x',16)}Excluir sala</button></div></div></span></div>`;}).join('')}
  <div class="tfoot"><span>${SALAS.length} salas</span></div></section>`;
}

function kTimes(){
 const vol=new Set(KTEAMS.flatMap(t=>t.m)).size,empty=KTEAMS.filter(t=>!t.m.length).length;
 return `${kHead('Times','Voluntários e professores do Ministério Infantil',`<button class="btn pri" data-a="kTeam">${ic('plus',15,2.2)}Novo time</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Times</span><span class="kv">${KTEAMS.length}</span><span class="kd">${SALAS.filter(s=>s.team).length} salas atendidas</span></div>
  <div class="k4"><span class="kl">Voluntários</span><span class="kv">${vol}</span><span class="kd">servindo nos times</span></div>
  <div class="k4"><span class="kl">Times sem membro</span><span class="kv" style="${empty?'color:var(--st-sol)':''}">${empty}</span><span class="kd">${empty?'precisam de voluntários':'todos com gente'}</span></div>
 </section>
 <p class="who rise" style="--d:2;margin:2px 4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">${ic('swap',13,2)}A mesma equipe é a base que o Zelo Kids usa para escalar quem serve em cada sala. Também aparece em <button class="lnk inl" data-a="kGoMin">Comunidade › Ministérios › Kids</button>.</p>
 <div class="rgrid2 rise" style="--d:3">${KTEAMS.map((t,i)=>{const rooms=SALAS.filter(s=>s.team===t.id);return `<article class="card rc">
  <div class="rc1"><div><b>${esc(t.n)}</b><span>${rooms.length?'Serve em '+rooms.map(r=>esc(r.n)).join(', '):'Nenhuma sala vinculada'}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="kTMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kTPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi danger" data-a="kTeamDel" data-v="${t.id}">${ic('x',16)}Excluir time</button></div></div></div>
  ${t.m.length?`<div class="kmem">${t.m.map((n,j)=>`<span class="kmc"><span class="av" style="background:var(--tone-${kTone(i+j)});color:var(--tone-${kTone(i+j)}-ink)">${initials(n)}</span>${esc(n)}<button data-a="kMemDel" data-v="${t.id}|${j}" aria-label="Remover ${esc(n)}">${ic('x',12,2.2)}</button></span>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhum voluntário ainda.</p>'}
  <button class="btn sec sm" data-a="kMem" data-v="${t.id}" style="align-self:flex-start">${ic('userplus',14)}Adicionar voluntário</button></article>`;}).join('')}</div>`;
}

function kTurmas(){
 const linked=TURMAS.filter(t=>SALAS.some(s=>s.turma===t.id)).length,MAX=12;
 return `${kHead('Turmas','Faixas etárias do Ministério Infantil',`<button class="btn pri" data-a="kTurma">${ic('plus',15,2.2)}Nova turma</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Turmas</span><span class="kv">${TURMAS.length}</span><span class="kd">de ${Math.min(...TURMAS.map(t=>t.min))} a ${Math.max(...TURMAS.map(t=>t.max))} anos</span></div>
  <div class="k4"><span class="kl">Com sala</span><span class="kv">${linked}</span><span class="kd">alocadas em uma sala</span></div>
  <div class="k4"><span class="kl">Sem sala</span><span class="kv" style="${TURMAS.length-linked?'color:var(--st-sol)':''}">${TURMAS.length-linked}</span><span class="kd">ainda sem espaço</span></div>
 </section>
 <p class="who rise" style="--d:2;margin:2px 4px">Turma é só a faixa etária. Currículo e jornadas ficam em Conteúdo › Jornadas.</p>
 <section class="card pc rise" style="--d:3"><div class="sh"><h2>Faixas etárias</h2><span class="who">0 a ${MAX} anos</span></div>
  <div class="ages"><div class="agax">${Array.from({length:MAX+1},(_,i)=>`<span style="left:${(i+.5)/(MAX+1)*100}%">${i}</span>`).join('')}</div>
  ${TURMAS.slice().sort((a,b)=>a.min-b.min).map((t,i)=>{const rooms=SALAS.filter(s=>s.turma===t.id);return `<div class="agr"><div class="agn"><b>${esc(t.n)}</b><span>${rooms.length?rooms.map(r=>esc(r.n)).join(', '):'<em class="tag warn">Sem sala</em>'}</span></div>
   <div class="agt"><span class="agb" style="left:${t.min/(MAX+1)*100}%;width:${(t.max-t.min+1)/(MAX+1)*100}%;background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${faixa(t)}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="kTuMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kTuPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kTurma" data-v="${t.id}">${ic('pen',16)}Editar turma</button><hr><button class="pi danger" data-a="kTurmaDel" data-v="${t.id}">${ic('x',16)}Excluir turma</button></div></div></div>`;}).join('')}</div>
 </section>`;
}

const pop=id=>{const p=$('#'+id);closePops(p);p.classList.toggle('open');};
const KA={
 kGoMin:()=>{const m=MINIS.find(x=>x.n==='Kids');S.active='ministerios';S.mini=m?m.id:null;S.mtab='times';render();window.scrollTo({top:0});},
 kMenu:v=>pop('kPop-'+v),kTMenu:v=>pop('kTPop-'+v),kTuMenu:v=>pop('kTuPop-'+v),
 kSala:v=>{closePops();const s=v?sById(v):null;openDlg(`${dlgHead(s?'Editar sala':'Nova sala')}<form class="fgrid" id="ksF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Nome da sala</span><input name="n" value="${esc(s?s.n:'')}" placeholder="Ex.: Sala 3" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Capacidade</span><input name="cap" type="number" min="1" inputmode="numeric" value="${s?s.cap:''}" placeholder="Nº de crianças"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Turma <small>opcional</small></span><span class="selw"><select name="turma"><option value="">Nenhuma</option>${TURMAS.map(t=>`<option value="${t.id}" ${s&&s.turma===t.id?'selected':''}>${esc(t.n)} · ${faixa(t)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Define a faixa etária da sala.</span></label>
   <label class="fld wide"><span class="fl">Time <small>opcional</small></span><span class="selw"><select name="team"><option value="">Nenhum</option>${KTEAMS.map(t=>`<option value="${t.id}" ${s&&s.team===t.id?'selected':''}>${esc(t.n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Qual time de voluntários serve nesta sala.</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${s?'Salvar':'Criar sala'}</button></div></form>`);
  const f=$('#ksF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),cap=+fd.get('cap');if(!n)bad('n','Dê um nome à sala');else if(SALAS.some(x=>x!==s&&norm(x.n)===norm(n)))bad('n','Já existe uma sala com esse nome');if(!cap||cap<1)bad('cap','Informe a capacidade');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{if(s)Object.assign(s,{n,cap,turma:fd.get('turma'),team:fd.get('team')});else SALAS.push({id:kid('s'),n,cap,turma:fd.get('turma'),team:fd.get('team'),active:true,pres:0,mon:'—'});closeDlg();render();toast(s?`${n} atualizada`:`${n} criada · sincronizando com o Zelo Kids`);},700);});},
 kSalaTog:v=>{closePops();const s=sById(v);s.active=!s.active;render();toast(s.active?`${s.n} reativada`:`${s.n} desativada`);},
 kSalaDel:v=>{closePops();const s=sById(v);confirmDel({title:`Excluir a sala ${s.n}?`,body:'Ela deixa de aparecer no check-in do Zelo Kids. As crianças e o histórico de frequência não são apagados.',label:'Excluir sala',onConfirm:()=>{const i=SALAS.indexOf(s);SALAS.splice(i,1);render();toast(`${s.n} excluída`,()=>{SALAS.splice(i,0,s);render();});}});},
 kTeam:()=>simpleDlg('Novo time','Nome','Ex.: Jardim — Domingo noite',v=>{KTEAMS.push({id:kid('k'),n:v,m:[]});render();toast(`Time ${v} criado`);}),
 kTeamDel:v=>{closePops();const t=kById(v),rooms=SALAS.filter(s=>s.team===t.id);confirmDel({title:`Excluir o time ${t.n}?`,body:`${rooms.length?`${rooms.map(r=>r.n).join(', ')} fica${rooms.length>1?'m':''} sem time. `:''}Os ${t.m.length} voluntários continuam cadastrados.`,label:'Excluir time',onConfirm:()=>{const i=KTEAMS.indexOf(t);KTEAMS.splice(i,1);rooms.forEach(r=>r.team='');render();toast('Time excluído',()=>{KTEAMS.splice(i,0,t);rooms.forEach(r=>r.team=t.id);render();});}});},
 kMem:v=>{const t=kById(v),cand=MEMBERS.filter(m=>!t.m.includes(m.n));openDlg(`${dlgHead('Adicionar voluntário',esc(t.n))}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="kmq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="kmp">${candList(cand,'')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="kMemDo" data-v="${t.id}">Adicionar</button></div>`,'sm');$('#kmq').addEventListener('input',e=>{$('#kmp').innerHTML=candList(cand,e.target.value);});},
 kMemDo:(v,b)=>{const s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const t=kById(v),m=byId(s.value);b.classList.add('busy');setTimeout(()=>{t.m.push(m.n);closeDlg();render();toast(`${m.n.split(' ')[0]} entrou no time`);},500);},
 kMemDel:v=>{const [tid,j]=v.split('|'),t=kById(tid),n=t.m[+j];confirmDel({title:`Remover ${n.split(' ')[0]} do time?`,body:`${n} deixa de ser escalado(a) em ${t.n}.`,label:'Remover',onConfirm:()=>{t.m.splice(+j,1);render();toast(`${n.split(' ')[0]} removido(a)`,()=>{t.m.splice(+j,0,n);render();});}});},
 kTurma:v=>{closePops();const t=v?tById(v):null;openDlg(`${dlgHead(t?'Editar turma':'Nova turma')}<form class="fgrid" id="ktF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(t?t.n:'')}" placeholder="Ex.: Pré-adolescentes" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Idade mínima</span><input name="min" type="number" min="0" max="17" inputmode="numeric" value="${t?t.min:''}" placeholder="anos"><span class="err"></span></label>
   <label class="fld"><span class="fl">Idade máxima</span><input name="max" type="number" min="0" max="17" inputmode="numeric" value="${t?t.max:''}" placeholder="anos"><span class="err"></span></label>
   <p class="hint wide" id="ktH" style="margin:-4px 0 0"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${t?'Salvar':'Criar turma'}</button></div></form>`,'sm');
  const f=$('#ktF'),hint=()=>{const a=+f.min.value,b=+f.max.value;if(f.min.value===''||f.max.value===''){$('#ktH').textContent='';return;}const ov=TURMAS.filter(x=>x!==t&&a<=x.max&&b>=x.min);$('#ktH').innerHTML=ov.length?`<span style="color:var(--st-sol)">Sobrepõe ${ov.map(x=>x.n+' ('+faixa(x)+')').join(', ')}</span>`:`${a}–${b} anos · sem sobreposição`;};
  f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');hint();});hint();
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),a=fd.get('min'),b=fd.get('max');if(!n)bad('n','Dê um nome à turma');if(a==='')bad('min','Informe');if(b==='')bad('max','Informe');else if(+b<+a)bad('max','Menor que a mínima');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{if(t)Object.assign(t,{n,min:+a,max:+b});else TURMAS.push({id:kid('t'),n,min:+a,max:+b});closeDlg();render();toast(t?`${n} atualizada`:`Turma ${n} criada`);},600);});},
 kTurmaDel:v=>{closePops();const t=tById(v),rooms=SALAS.filter(s=>s.turma===t.id);confirmDel({title:`Excluir a turma ${t.n}?`,body:`${rooms.length?`${rooms.map(r=>r.n).join(', ')} fica${rooms.length>1?'m':''} sem faixa etária definida. `:''}As crianças cadastradas no Zelo Kids não são afetadas.`,label:'Excluir turma',onConfirm:()=>{const i=TURMAS.indexOf(t);TURMAS.splice(i,1);rooms.forEach(r=>r.turma='');render();toast('Turma excluída',()=>{TURMAS.splice(i,0,t);rooms.forEach(r=>r.turma=t.id);render();});}});},
};

