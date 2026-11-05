/* ================= Devocional (módulo novo, 05/11/2026) =================
 * Um conteúdo por dia, preso a um PERÍODO e a PARTICIPANTES escolhidos a dedo (não há inscrição). É como uma série, mas com data:
 * cada dia é uma "aula" (título, tema do dia e arquivos ou um item da biblioteca) que só aparece para o participante quando o dia chega.
 * Dá para montar aos poucos. Quem administra acompanha quem viu e quem não viu, dia a dia. Sem certificado.
 * Menu: Pessoas › Devocional (abaixo de Integração). Só web nesta etapa (no app, entraria como o item do dia na Agenda).
 * Reaproveita os cartões da Série (ct-jc), a ficha com abas (prof/ptabs), o seletor de pessoas (cpick) e o progresso (tr/ring). */
const DV_ST={and:['Em andamento','--st-int','--st-int-bg'],agd:['Agendado','--st-sol','--st-sol-bg'],enc:['Encerrado','--ink-muted','--surface-2']};
const DV_WD=['dom','seg','ter','qua','qui','sex','sáb'];
const dvAdd=(iso,n)=>{const d=new Date(iso+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const dvDates=v=>{const l=[];for(let d=v.from;d<=v.to&&l.length<400;d=dvAdd(d,1))l.push(d);return l;};
const dvSt=v=>v.to<NOWD?'enc':v.from>NOWD?'agd':'and';
const dvPill=v=>{const s=DV_ST[dvSt(v)];return `<span class="stp" style="--c:var(${s[1]});--b:var(${s[2]})"><i></i>${s[0]}</span>`;};
const dvHas=(v,iso)=>!!(v.days[iso]&&v.days[iso].t);
const dvRel=v=>dvDates(v).filter(d=>d<=NOWD&&dvHas(v,d));/* dias já liberados (data chegou e tem conteúdo) */
const dvSeen=(v,p,iso)=>(v.seen[p]||[]).includes(iso);
/* Quem entra no meio vê tudo que já foi liberado, mas só conta (e só pode atrasar) a partir do dia em que entrou. */
const dvJoin=(v,p)=>(v.joined&&v.joined[p])||v.from;
const dvElig=(v,iso)=>v.people.filter(p=>dvJoin(v,p)<=iso);
const dvPrg=(v,p)=>{const r=dvRel(v).filter(d=>d>=dvJoin(v,p)),n=r.filter(d=>dvSeen(v,p,d)).length;return {n,t:r.length,pct:r.length?Math.round(n/r.length*100):0};};
const dvViewers=(v,iso)=>v.people.filter(p=>dvSeen(v,p,iso));
const dvAvg=v=>v.people.length&&dvRel(v).length?Math.round(v.people.reduce((a,p)=>a+dvPrg(v,p).pct,0)/v.people.length):0;
const dvDayNo=(v,iso)=>dvDates(v).indexOf(iso)+1;
const dvShort=iso=>{const m=+iso.slice(5,7);return `${+iso.slice(8)} ${MONTHS[m-1].slice(0,3).toLowerCase()}`;};
const dvWk=iso=>DV_WD[new Date(iso+'T12:00:00Z').getUTCDay()];
const dvPool=()=>[...new Set([...PASTORS.map(p=>p[0]),...MEMBERS.filter(m=>m.st==='integrado').map(m=>m.n)])];
const dvGroups=()=>[['Pastores',()=>PASTORS.map(p=>p[0])],...MINIS.map(m=>[m.n,()=>{try{return mnPpl(m).map(p=>p.n||p).filter(Boolean);}catch(e){return [];}}]),['Todos os membros integrados',()=>MEMBERS.filter(m=>m.st==='integrado').map(m=>m.n)]];
const dvLibItem=id=>{let x;
 if((x=PREGS.find(p=>p.id===id)))return {k:'Pregação',t:x.t,id};
 if((x=NX_VIDEOS.find(p=>p.id===id)))return {k:'Vídeo',t:x.t,id};
 if((x=SONGS.find(p=>p.id===id)))return {k:'Música',t:x.n,id};
 if((x=MATS.find(p=>p.id===id)))return {k:'Material de apoio',t:x.t,id};
 return null;};

let _dvid=0;
const dvMk=o=>Object.assign({id:'dv'+(++_dvid),n:'',desc:'',from:'',to:'',people:[],days:{},seen:{},joined:{}},o);
const DV=[];
(()=>{
 const pool=dvPool(),T1=['Liderar começa em casa','O líder que escuta','Servir antes de mandar','Coragem para decidir','Humildade que sustenta','Equipe antes de projeto','Dar o exemplo','Corrigir com amor','Delegar com confiança','Perseverar na pressão','Descansar também é liderar','Formar novos líderes','Visão que contagia','Prestar contas','Liderar em oração'];
 const th=['Uma leitura curta e uma pergunta para o dia.','Um texto para ler com calma e anotar o que ficou.','Passagem bíblica e uma aplicação prática.'];
 const f=(i,k)=>[{n:`Lideranca-Forte-Dia-${String(i+1).padStart(2,'0')}.${k}`,kb:[420,610,880,1320][i%4]}];
 /* 1) Em andamento: 15 dias, 12 pessoas, conteúdo até o 13º dia (os dias 12 e 13 ainda não chegaram; 14 e 15 sem conteúdo) */
 const a=dvMk({n:'Liderança Forte',desc:'Quinze dias de formação para quem lidera na igreja: um texto por dia, para ler e aplicar.',from:'2026-09-21',to:'2026-10-05',people:pool.slice(0,12)});
 dvDates(a).slice(0,13).forEach((d,i)=>{a.days[d]={t:`Dia ${i+1} · ${T1[i]}`,theme:th[i%3],files:i===4?[]:f(i,i===7?'docx':'pdf'),lib:i===4?PREGS[0].id:null};});
 const k=[11,11,10,9,11,8,7,10,4,0,11,0],rel=dvRel(a);
 a.people.forEach((p,i)=>{let l=rel.slice(0,k[i]);if(i%4===2&&l.length>4)l=l.filter((_,j)=>j!==3);a.seen[p]=l;});
 a.joined[a.people[9]]='2026-09-28';a.seen[a.people[9]]=rel.filter(d=>d>='2026-09-28').slice(0,2);/* entrou no dia 8: só conta dali em diante */
 DV.push(a);
 /* 2) Agendado: só os pastores, 10 dias, 4 dias montados */
 const b=dvMk({n:'Tempo com Deus · Pastores',desc:'Dez manhãs de devocional para a equipe pastoral, antes da conferência.',from:'2026-10-05',to:'2026-10-14',people:PASTORS.map(p=>p[0])});
 ['Silêncio e escuta','O cuidado do pastor','Sabedoria para decidir','Unidade na equipe'].forEach((t,i)=>{b.days[dvAdd('2026-10-05',i)]={t:`Dia ${i+1} · ${t}`,theme:th[i%3],files:[{n:`Tempo-com-Deus-${i+1}.pdf`,kb:540+i*90}],lib:null};});
 DV.push(b);
 /* 3) Encerrado: semana de oração */
 const c=dvMk({n:'Semana de Oração',desc:'Sete dias de oração e jejum guiados, no começo do mês.',from:'2026-09-08',to:'2026-09-14',people:pool.slice(0,8)});
 ['Gratidão','Arrependimento','Intercessão pela cidade','Intercessão pela igreja','Pela família','Pelos enfermos','Louvor e entrega'].forEach((t,i)=>{c.days[dvAdd('2026-09-08',i)]={t:`Dia ${i+1} · ${t}`,theme:th[i%3],files:[{n:`Semana-de-Oracao-${i+1}.pdf`,kb:380+i*70}],lib:null};});
 c.people.forEach((p,i)=>{c.seen[p]=dvDates(c).filter((_,j)=>!(i%3===1&&j===5)&&!(i===7&&j>3));});
 DV.push(c);
})();
Object.assign(S,{dv:null,dvTab:'dias',dvList:'todos'});

/* ---------- menu e permissões ---------- */
(()=>{
 const g=NAV.find(x=>x[0]==='Geral')[1].find(i=>i[0]==='pessoas')[3];g.splice(g.findIndex(x=>x[0]==='integracao')+1,0,['devocional','Devocional']);
 SAREAS.push(['Devocional','dawn']);MODS.push('Devocional');
 Object.keys(RPERM).forEach(r=>{RPERM[r].Devocional=r==='Administrador'?ACTS.slice():r==='Pastor'?['Ver','Criar','Editar']:[];});
})();

/* ---------- lista ---------- */
function dvPage(){return S.dv&&DV.some(v=>v.id===S.dv)?dvFicha():dvLista();}
function dvLista(){
 S.dv=null;
 const cnt=s=>DV.filter(v=>dvSt(v)===s).length,f=S.dvList,l=DV.filter(v=>f==='todos'||dvSt(v)===f);
 const and=DV.filter(v=>dvSt(v)==='and'),hoje=and.filter(v=>dvHas(v,NOWD)),leram=hoje.reduce((a,v)=>a+dvViewers(v,NOWD).length,0),total=hoje.reduce((a,v)=>a+v.people.length,0);
 const nx=DV.filter(v=>dvSt(v)==='agd').sort((a,b)=>a.from.localeCompare(b.from))[0];
 const tabs=`<div class="utabs rise" style="--d:2" role="tablist">${[['todos','Todos',DV.length],['and','Em andamento',cnt('and')],['agd','Agendados',cnt('agd')],['enc','Encerrados',cnt('enc')]].map(t=>`<button role="tab" class="${f===t[0]?'on':''}" aria-selected="${f===t[0]}" data-a="dvFilter" data-v="${t[0]}">${t[1]}<small class="cnt">${t[2]}</small></button>`).join('')}</div>`;
 return `<header class="ph rise"><div><p class="eb">Pessoas</p><h1>Devocional</h1><p class="lede">Um conteúdo por dia, para um grupo de pessoas, dentro de um período</p></div><div class="pact"><button class="btn pri" data-a="dvNew">${ic('plus',15,2.2)}Novo devocional</button></div></header>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Em andamento</span><span class="kv">${cnt('and')}</span><span class="kd">${and.reduce((a,v)=>a+v.people.length,0)} participações</span></div>
  <div class="k4"><span class="kl">Agendados</span><span class="kv">${cnt('agd')}</span><span class="kd">${nx?`próximo começa em ${dvShort(nx.from)}`:'nenhum agendado'}</span></div>
  <div class="k4"><span class="kl">Encerrados</span><span class="kv">${cnt('enc')}</span><span class="kd">${DV.filter(v=>dvSt(v)==='enc').reduce((a,v)=>a+v.people.length,0)} participações</span></div>
  <div class="k4"><span class="kl">Leram hoje</span><span class="kv">${leram}<small style="font-size:.55em"> de ${total}</small></span><span class="kd">${hoje.length?`no${hoje.length>1?'s':''} devocional${hoje.length>1?'is':''} de hoje`:'sem devocional hoje'}</span></div>
 </section>${tabs}
 <section class="card mtab rise" style="--d:3">${l.length?`<div class="dv-t dv-th"><span>Devocional</span><span>Período</span><span>Andamento</span><span>Participantes</span><span>Leitura</span><span>Situação</span><span></span></div>
  ${l.map(v=>{const ds=dvDates(v),nd=ds.length,mont=ds.filter(d=>dvHas(v,d)).length,s=dvSt(v),pct=dvAvg(v),falta=nd-mont,
   and=s==='and'?`Dia ${dvDayNo(v,NOWD)} de ${nd}`:s==='agd'?`Começa em ${dvShort(v.from)}`:`Encerrado em ${dvShort(v.to)}`;
   return `<div class="dv-t" tabindex="0" data-a="dvOpen" data-v="${v.id}"><span class="dv-n"><span class="htile" style="--s:38px;background:var(--tone-damasco);color:var(--tone-damasco-ink)">${ic('dawn',18,1.9)}</span><span class="zt-n"><b>${esc(v.n)}</b><span>${falta&&s!=='enc'?`${mont} de ${nd} dias montados`:'Todos os dias montados'}</span></span></span>
   <span class="dv-pe">${dvShort(v.from)} <span class="soft">a ${dvShort(v.to)}</span></span>
   <span class="dv-an">${and}</span>
   <span class="dv-pp">${v.people.length?`<b>${v.people.length}</b>`:'<span class="soft">—</span>'}</span>
   <span class="dv-le">${s==='agd'?'<span class="soft">—</span>':`<span class="tr ${pct===100?'done':''}"><i style="width:${pct}%"></i></span><b>${pct}%</b>`}</span>
   <span class="dv-sx">${dvPill(v)}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
  <div class="tfoot"><span>${l.length} ${l.length===1?'devocional':'devocionais'}</span></div>`:`<div class="mempty"><p>${DV.length?'Nenhum devocional nesta aba.':'Nenhum devocional ainda.'}</p><span>${DV.length?'Escolha outra aba para ver os demais.':'Crie o primeiro: defina o período, escolha os participantes e monte um conteúdo por dia.'}</span></div>`}</section>`;
}

/* ---------- ficha ---------- */
function dvFicha(){
 const v=DV.find(x=>x.id===S.dv),ds=dvDates(v),nd=ds.length,mont=ds.filter(d=>dvHas(v,d)).length,s=dvSt(v);
 const tabs=[['dias','Dias',nd],['pes','Participantes e Progresso',v.people.length]];
 return `<nav class="crumb rise"><span class="soft">Pessoas</span>${ic('chevR',13,2)}<button class="lnk back" data-a="dvBack">Devocional</button>${ic('chevR',13,2)}<span>${esc(v.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid"><span class="htile" style="--s:64px;background:var(--tone-damasco);color:var(--tone-damasco-ink)">${ic('dawn',30,1.9)}</span><div class="pn"><h1>${esc(v.n)}</h1><p>${fmtD(v.from)} a ${fmtD(v.to)} · ${nd} dias${v.desc?' · '+esc(v.desc):''}</p><div class="ca-tgs">${dvPill(v)}${s==='and'?`<em class="tag">Dia ${dvDayNo(v,NOWD)} de ${nd}</em>`:''}</div></div></div>
  <div class="pact"><button class="btn sec" data-a="dvEdit" data-v="${v.id}">${ic('pen',15)}Editar</button><div style="position:relative"><button class="ibtn" data-a="dvMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="dvPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="dvDel" data-v="${v.id}">${ic('x',16)}Excluir o devocional</button></div></div></div>
  <div class="ikpi hk"><div><b>${nd}</b><span>Dias</span></div><div><b>${mont}</b><span>Com conteúdo</span></div><div><b>${v.people.length}</b><span>Participantes</span></div><div><b>${s==='agd'?'—':dvAvg(v)+'%'}</b><span>Leitura média</span></div></div>
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${S.dvTab===t[0]?'on':''}" data-a="dvTab" data-v="${t[0]}">${t[1]}<small class="cnt">${t[2]}</small></button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${S.dvTab==='pes'?dvPes(v):dvDias(v)}</div>`;
}
function dvDias(v){
 const ds=dvDates(v);
 return `<section class="card mtab"><p class="bd-note" style="margin:0 0 10px">${ic('info',13,2)}Um conteúdo por dia, como uma aula. O participante só vê o dia quando a data chega; os dias que ainda não chegaram ficam escondidos, então dá para montar aos poucos.</p>
 <div class="dv-r dv-h"><span>Dia</span><span>Conteúdo</span><span>Situação</span><span>Quem viu</span><span></span></div>
 ${ds.map(d=>{const x=v.days[d],has=dvHas(v,d),past=d<NOWD,hoje=d===NOWD,el=dvElig(v,d),n=el.filter(p=>dvSeen(v,p,d)).length,tot=el.length,pct=tot?Math.round(n/tot*100):0;
  const st=!has?(d<=NOWD?'<span class="stp" style="--c:var(--st-rec);--b:var(--st-rec-bg)"><i></i>Sem conteúdo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Sem conteúdo</span>'):hoje?'<span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>Hoje</span>':past?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Liberado</span>':`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Libera em ${dvShort(d)}</span>`;
  const files=has?[...(x.lib&&dvLibItem(x.lib)?[`${dvLibItem(x.lib).k}: ${dvLibItem(x.lib).t}`]:[]),...x.files.map(f=>f.n)]:[];
  return `<div class="dv-r" tabindex="0" data-a="dvDay" data-v="${d}"><span class="dv-d fd-dt"><b>${+d.slice(8)}</b><small>${dvShort(d).split(' ')[1]}</small></span>
   <span class="dv-b"><b>${has?esc(x.t):'<span class="soft">Nenhum conteúdo ainda</span>'}</b><small>${has?esc(x.theme||'')+(files.length?`<span class="dv-fs">${files.map(f=>`<span class="zl-fl">${ic('file',12,2)}${esc(f)}</span>`).join('')}</span>`:''):`${dvWk(d)}, ${fmtD(d)}`}</small></span>
   <span class="dv-s">${st}</span>
   <span class="dv-w">${has&&d<=NOWD?`<button class="dv-who" data-a="dvWho" data-v="${d}" title="Ver quem viu e quem não viu"><span class="tr ${pct===100?'done':''}"><i style="width:${pct}%"></i></span><small><b>${n}</b> de ${tot} viram</small></button>`:'<span class="soft">—</span>'}</span>
   <span class="dv-a"><button class="btn sec sm" data-a="dvDay" data-v="${d}">${has?'Editar':'Montar o dia'}</button></span></div>`;}).join('')}</section>`;
}
function dvPes(v){
 const s=dvSt(v),ds=dvDates(v),rows=v.people.map(p=>{const g=dvPrg(v,p);return {p,g,st:!g.t?'ag':g.pct===100?'ok':g.n===0?'nao':'atr'};});
 const c=k=>rows.filter(r=>r.st===k).length;
 const pill={ok:['Em dia','--st-int','--st-int-bg'],atr:['Atrasado','--st-sol','--st-sol-bg'],nao:['Não começou','--st-rec','--st-rec-bg'],ag:['Aguardando','--ink-muted','--surface-2']};
 /* uma barrinha por dia do período: verde = leu, vermelho = não leu (dia já liberado), cinza = ainda não liberado ou sem conteúdo */
 const bars=p=>`<span class="attd dv-att">${ds.map(d=>{const has=dvHas(v,d),rel=has&&d<=NOWD,ok=rel&&dvSeen(v,p,d),pre=rel&&d<dvJoin(v,p)&&!ok;return `<i class="${pre?'pre':!rel?'na':ok?'ok':'no'}" title="${dvShort(d)} · ${!has?'sem conteúdo':!rel?'ainda não liberado':pre?'antes de entrar, não conta':ok?'leu':'não leu'}"></i>`;}).join('')}</span>`;
 return `<section class="card mtab"><div class="tbar"><p class="who" style="margin:0">${s==='agd'?'O devocional ainda não começou.':`<b>${c('ok')}</b> em dia · <b>${c('atr')}</b> atrasados · <b>${c('nao')}</b> não começaram`}</p><div class="pact"><button class="btn pri sm" data-a="dvAddP" data-v="${v.id}">${ic('userplus',14,2.2)}Adicionar participantes</button></div></div>
 ${v.people.length?`<p class="dv-leg"><span><i class="ok"></i>Leu</span><span><i class="no"></i>Não leu</span><span><i class="na"></i>Ainda não liberado ou sem conteúdo</span>${v.people.some(p=>dvJoin(v,p)>v.from)?'<span><i class="pre"></i>Antes de entrar (não conta)</span>':''}<small>Cada barra é um dia do período.</small></p>
 <div class="dv-p dv-ph"><span>Pessoa</span><span>Progresso</span><span>Situação</span><span></span></div>${rows.map(r=>`<div class="dv-p"><span class="tn">${avN(r.p)}<span class="dv-nm"><b>${esc(r.p)}</b>${dvJoin(v,r.p)>v.from?`<small>Entrou em ${dvShort(dvJoin(v,r.p))}</small>`:''}</span></span>
  <span class="dv-bar">${bars(r.p)}<b>${r.g.t?`${r.g.n}/${r.g.t}`:'—'}</b></span>
  <span class="dv-sit"><span class="stp" style="--c:var(${pill[r.st][1]});--b:var(${pill[r.st][2]})"><i></i>${pill[r.st][0]}</span></span>
  <span class="dv-x"><button class="ibtn sm" data-a="dvRmP" data-v="${v.id}|${esc(r.p)}" aria-label="Tirar do devocional" title="Tirar do devocional">${ic('x',14)}</button></span></div>`).join('')}`:`<div class="mempty"><p>Nenhum participante ainda.</p><span>Escolha as pessoas que vão receber este devocional.</span></div>`}
 </section>`;
}

/* ---------- diálogos e ações ---------- */
const dvForm=(...a)=>zForm(...a);/* o mesmo formulário de diálogo da Zeladoria */
const dvRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);requestAnimationFrame(tabInd);};
function dvFormV(v){
 const nov=!v,seriesOpts=NX_SERIES.filter(s=>s.items&&s.items.length).map(s=>`<option value="${s.id}">${esc(s.n)} · ${s.items.length} conteúdos</option>`).join('');
 dvForm(nov?'Novo devocional':'Editar devocional',nov?'Defina o período; os participantes e os dias você monta depois.':esc(v.n),
  `<label class="fld"><span class="fl">Nome</span><input name="n" maxlength="80" value="${esc(v?v.n:'')}" placeholder="Ex.: Liderança Forte" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Sobre o devocional <small>opcional</small></span><textarea class="ta" name="desc" rows="2" maxlength="200" placeholder="Em uma frase, do que se trata">${esc(v?v.desc:'')}</textarea></label>
   <div class="fgrid"><label class="fld"><span class="fl">Começa em</span><input type="date" name="from" value="${v?v.from:''}"><span class="err"></span></label><label class="fld"><span class="fl">Termina em</span><input type="date" name="to" value="${v?v.to:''}"><span class="err"></span></label></div>
   <p class="hint" id="dvN"></p>
   ${nov&&seriesOpts?`<label class="fld"><span class="fl">Começar de uma série <small>opcional</small></span><span class="selw"><select name="ser"><option value="">Não, montar do zero</option>${seriesOpts}</select>${ic('updown',14)}</span><span class="hint">Cada conteúdo da série vira um dia, na ordem. Dá para trocar depois.</span></label>`:''}`,nov?'Criar devocional':'Salvar',
  (f,bad)=>{const fd=new FormData(f),n=fd.get('n').trim(),a=fd.get('from'),b=fd.get('to');
   if(!n)return bad('n','Dê um nome ao devocional');if(!a)return bad('from','Escolha o primeiro dia');if(!b)return bad('to','Escolha o último dia');if(b<a)return bad('to','O último dia vem antes do primeiro');
   if(Math.round((Date.parse(b)-Date.parse(a))/864e5)+1>120)return bad('to','O período pode ter até 120 dias');
   if(!nov){const fora=Object.keys(v.days).filter(d=>dvHas(v,d)&&(d<a||d>b));if(fora.length)return bad('to',`Há ${fora.length} dia${fora.length>1?'s':''} com conteúdo fora do novo período. Remova o conteúdo antes.`);
    Object.keys(v.days).filter(d=>d<a||d>b).forEach(d=>delete v.days[d]);Object.assign(v,{n,desc:fd.get('desc').trim(),from:a,to:b});closeDlg();dvRe();toast('Devocional atualizado');return;}
   const x=dvMk({n,desc:fd.get('desc').trim(),from:a,to:b});const sid=fd.get('ser'),sr=sid&&NX_SERIES.find(s=>s.id===sid);
   if(sr)dvDates(x).forEach((d,i)=>{const it=dvLibItem(sr.items[i]);if(it)x.days[d]={t:`Dia ${i+1} · ${it.t}`,theme:'',files:[],lib:it.id};});
   DV.unshift(x);S.dv=x.id;S.dvTab='dias';closeDlg();render();window.scrollTo(0,0);requestAnimationFrame(tabInd);toast('Devocional criado. Agora monte os dias e escolha os participantes');});
 const f=$('#dvN')?$('#dvN').closest('form'):null;if(!f)return;
 const upd=()=>{const a=f.elements.from.value,b=f.elements.to.value;$('#dvN').textContent=a&&b&&b>=a?`${Math.round((Date.parse(b)-Date.parse(a))/864e5)+1} dias de devocional`:'';};
 f.addEventListener('input',upd);f.addEventListener('change',upd);upd();
}
function dvDayDlg(iso){
 const v=DV.find(x=>x.id===S.dv),old=v.days[iso]||null,no=dvDayNo(v,iso);
 /* mesmo seletor de "Adicionar à série" (tipo, busca e lista), para escolher um item que já existe na biblioteca */
 const TY=[['Pregação',PREGS,'pregacoes'],['Vídeo',NX_VIDEOS,'videos'],['Música',SONGS,'musicas'],['Material',MATS,'material']],cls=TY.reduce((m,y)=>{m[y[0]]=y[2];return m;},{}),MAX=40;
 const typeOf=id=>{const x=TY.find(y=>y[1].some(o=>o.id===id));return x?x[0]:null;};
 let src=old&&old.lib&&typeOf(old.lib)?'lib':'new',type=(old&&old.lib&&typeOf(old.lib))||TY[0][0],sel=old&&old.lib&&typeOf(old.lib)?old.lib:'',q='',files=old?old.files.map(x=>Object.assign({},x)):[],touched=!!(old&&old.t);
 const chips=()=>files.map((f,i)=>`<span class="dv-chip">${ic('file',13,2)}${esc(f.n)}<button type="button" class="ibtn sm" data-dvrm="${i}" aria-label="Tirar">${ic('x',12)}</button></span>`).join('')||'<span class="soft">Nenhum arquivo ainda</span>';
 openDlg(`${dlgHead(`${old?'Editar':'Montar'} o dia ${no}`,`${dvWk(iso)}, ${fmtD(iso)} · ${esc(v.n)}`)}<form id="dvDF" class="fgrid one" novalidate>
  <label class="fld"><span class="fl">Título</span><input name="t" maxlength="90" value="${esc(old?old.t:'')}" placeholder="Ex.: Dia ${no} · Servir antes de mandar" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Tema do dia <small>opcional</small></span><textarea class="ta" name="theme" rows="2" maxlength="240" placeholder="Do que se trata o dia, em uma ou duas frases">${esc(old?old.theme:'')}</textarea></label>
  <div class="fld" id="dvSrcF"><span class="fl">Conteúdo do dia</span><div class="yn" role="radiogroup" aria-label="De onde vem o conteúdo"><label><input type="radio" name="src" value="new" ${src==='new'?'checked':''}><span>Subir um arquivo novo</span></label><label><input type="radio" name="src" value="lib" ${src==='lib'?'checked':''}><span>Escolher da biblioteca</span></label></div><span class="err"></span></div>
  <div id="dvPN" ${src==='new'?'':'hidden'}><div class="dv-fls" id="dvFl">${chips()}</div><label class="btn sec sm dv-up">${ic('upload',14,2)}Subir arquivo<input type="file" id="dvUp" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,image/*" hidden></label><span class="hint">PDF, Word ou PowerPoint. A maioria dos devocionais é um documento.</span></div>
  <div id="dvPL" ${src==='lib'?'':'hidden'}><div class="mcp"><div class="mcp-ty">${TY.map(y=>`<button type="button" data-ty="${y[0]}" class="${y[0]===type?'on':''}"><span class="mc-i t-${y[2]}">${ic(NX_TYPE_IC[y[0]],15,1.8)}</span>${y[0]}<small id="dvN-${y[0]}"></small></button>`).join('')}</div>
   <div class="mcp-r"><label class="sbox">${ic('search',16)}<input id="dvQ" placeholder="Buscar na biblioteca" autocomplete="off"></label><div class="mtf-list" id="dvLs" style="max-height:260px"></div></div></div></div>
  ${iso<=NOWD?`<p class="bd-note">${ic('info',13,2)}Este dia já chegou: o que você salvar aparece na hora para os participantes.</p>`:`<p class="who">Este dia só aparece para os participantes em ${fmtD(iso)}.</p>`}
  <div class="dfoot">${old?'<button type="button" class="btn sec danger" id="dvRmDay" style="margin-right:auto">Tirar o conteúdo do dia</button>':''}<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${old?'Salvar o dia':'Publicar o dia'}</button></div></form>`,'lg');
 const f=$('#dvDF'),bad=(el,msg)=>{const fl=el.closest('.fld');fl.classList.add('bad');const er=fl.querySelector('.err');if(er)er.textContent=msg;};
 const paint=()=>{const ql=norm(q),all=TY.find(y=>y[0]===type)[1].filter(o=>{const x=nxItemInfo(type,o);return !ql||norm(x.t+' '+x.sub).includes(ql);}),l=all.slice(0,MAX);
  $('#dvLs').innerHTML=l.map(o=>{const x=nxItemInfo(type,o),on=sel===o.id;return `<button type="button" class="mtf-p ${on?'on':''}" data-k="${o.id}"><span class="mc-i t-${cls[type]}">${ic(NX_TYPE_IC[type],14,1.8)}</span><span class="dkt"><b>${esc(x.t)}</b><span>${esc([x.sub.replace(/^[^·]+(· )?/,''),x.dur?nxMin(x.dur):''].filter(Boolean).join(' · ')||type)}</span></span><i class="mtf-ck">${ic('check',12,2.6)}</i></button>`;}).join('')+(all.length>MAX?`<p class="who" style="padding:10px">Mostrando ${MAX} de ${all.length}. Use a busca para achar o resto.</p>`:'')||'<p class="who" style="padding:10px">Nada encontrado.</p>';
  TY.forEach(y=>{$('#dvN-'+y[0]).textContent=sel&&y[1].some(o=>o.id===sel)?'1':'';});};
 const setSrc=s=>{src=s;$('#dvPN').hidden=s!=='new';$('#dvPL').hidden=s!=='lib';$('#dvSrcF').classList.remove('bad');if(s==='lib')paint();};
 f.addEventListener('change',e=>{if(e.target.name==='src')setSrc(e.target.value);});
 f.addEventListener('input',e=>{const fl=e.target.closest('.fld');if(fl)fl.classList.remove('bad');if(e.target.name==='t')touched=true;if(e.target.id==='dvQ'){q=e.target.value;paint();}});
 f.addEventListener('click',e=>{
  const rm=e.target.closest('[data-dvrm]');if(rm){files.splice(+rm.dataset.dvrm,1);$('#dvFl').innerHTML=chips();return;}
  const ty=e.target.closest('[data-ty]');if(ty){type=ty.dataset.ty;f.querySelectorAll('#dvPL [data-ty]').forEach(y=>y.classList.toggle('on',y===ty));paint();return;}
  const it=e.target.closest('[data-k]');if(it){sel=it.dataset.k;const tp=typeOf(sel),x=nxItemInfo(tp,TY.find(y=>y[0]===tp)[1].find(o=>o.id===sel));if(!touched||!f.elements.t.value.trim()){f.elements.t.value=`Dia ${no} · ${x.t}`;touched=false;}$('#dvSrcF').classList.remove('bad');paint();}});
 $('#dvUp').addEventListener('change',e=>{[...e.target.files].forEach(x=>files.push({n:x.name,kb:Math.max(1,Math.round(x.size/1024))}));e.target.value='';$('#dvFl').innerHTML=chips();$('#dvSrcF').classList.remove('bad');});
 const rd=$('#dvRmDay');if(rd)rd.addEventListener('click',()=>{delete v.days[iso];closeDlg();dvRe();toast('Conteúdo do dia removido');});
 f.onsubmit=e=>{e.preventDefault();const t=f.elements.t.value.trim();if(!t)return bad(f.elements.t,'Dê um título ao dia');
  if(src==='new'&&!files.length)return bad($('#dvSrcF'),'Suba pelo menos um arquivo');if(src==='lib'&&!sel)return bad($('#dvSrcF'),'Escolha um item da biblioteca');
  v.days[iso]={t,theme:f.elements.theme.value.trim(),files:src==='new'?files:[],lib:src==='lib'?sel:null};closeDlg();dvRe();toast(old?'Dia atualizado':'Dia publicado');};
}
function dvWhoDlg(iso){
 const v=DV.find(x=>x.id===S.dv),x=v.days[iso],yes=dvViewers(v,iso),no=dvElig(v,iso).filter(p=>!yes.includes(p));
 openDlg(`${dlgHead('Quem viu',esc(x.t)+' · '+fmtD(iso))}<div class="dv-who2"><section><h3>Viram <small>${yes.length}</small></h3>${yes.length?`<ul class="zl-att">${yes.map(p=>`<li>${avN(p)}<span class="zl-at"><b>${esc(p)}</b></span><span class="sp-ok">${ic('check',13,2.4)}</span></li>`).join('')}</ul>`:'<p class="who">Ninguém ainda.</p>'}</section>
  <section><h3>Ainda não viram <small>${no.length}</small></h3>${no.length?`<ul class="zl-att">${no.map(p=>`<li>${avN(p)}<span class="zl-at"><b>${esc(p)}</b></span></li>`).join('')}</ul>`:'<p class="who">Todos viram.</p>'}</section></div><div class="dfoot"><button type="button" class="btn pri" data-a="closeDlg">Fechar</button></div>`,'md');
}
function dvAddDlg(id){
 const v=DV.find(x=>x.id===id),pool=dvPool().filter(p=>!v.people.includes(p)),st={sel:new Set(),q:''},groups=dvGroups();
 const list=()=>{const q=norm(st.q);return pool.filter(n=>!q||norm(n).includes(q)).map((n,i)=>`<label><input type="checkbox" data-mp="${esc(n)}" ${st.sel.has(n)?'checked':''}>${pav(n,TONES[i%6],'')}<span><b>${esc(n)}</b></span><i class="cb">${ic('check',12,2.8)}</i></label>`).join('')||'<p class="who">Ninguém com esse nome.</p>';};
 openDlg(`${dlgHead('Adicionar participantes',esc(v.n))}<div class="fgrid one">
  <label class="fld"><span class="fl">Adicionar um grupo inteiro</span><span class="selw"><select id="dvG"><option value="">Escolha pastores, um ministério...</option>${groups.map((g,i)=>`<option value="${i}">${esc(g[0])}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Marca todos do grupo. Dá para desmarcar quem não deve participar.</span></label>
  <div class="mw-tools"><label class="sbox">${ic('search',15)}<input id="dvQ" placeholder="Buscar pessoa" autocomplete="off"></label></div>
  <p class="who"><b id="dvC">0</b> pessoas escolhidas</p><div class="cpick mw-list" id="dvL">${list()}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" id="dvOk" disabled>Adicionar</button></div>`,'lg');
 const root=document.querySelector('.dlgw .dlg'),upd=()=>{$('#dvC').textContent=st.sel.size;$('#dvOk').disabled=!st.sel.size;$('#dvOk').textContent=st.sel.size?`Adicionar ${st.sel.size}`:'Adicionar';};
 root.addEventListener('change',e=>{const t=e.target;if(t.id==='dvG'){const g=groups[+t.value];if(g){g[1]().filter(n=>pool.includes(n)).forEach(n=>st.sel.add(n));$('#dvL').innerHTML=list();upd();}t.value='';return;}
  if(t.dataset.mp!==undefined){t.checked?st.sel.add(t.dataset.mp):st.sel.delete(t.dataset.mp);upd();}});
 root.addEventListener('input',e=>{if(e.target.id==='dvQ'){st.q=e.target.value;$('#dvL').innerHTML=list();}});
 $('#dvOk').addEventListener('click',()=>{st.sel.forEach(n=>{if(!v.people.includes(n)){v.people.push(n);v.seen[n]=[];v.joined[n]=NOWD>v.from?NOWD:v.from;}});const k=st.sel.size;closeDlg();dvRe();toast(`${k} participante${k>1?'s':''} adicionado${k>1?'s':''}`);});
}
const DVA={
 dvFilter:v=>{S.dvList=v;render();requestAnimationFrame(tabInd);},
 dvOpen:v=>{S.dv=v;S.dvTab='dias';render();window.scrollTo({top:0});requestAnimationFrame(tabInd);},
 dvBack:()=>{S.dv=null;render();window.scrollTo({top:0});},
 dvTab:v=>{S.dvTab=v;dvRe();},
 dvMenu:()=>{const p=$('#dvPop');closePops(p);p.classList.toggle('open');},
 dvNew:()=>dvFormV(null),
 dvEdit:v=>dvFormV(DV.find(x=>x.id===v)),
 dvDel:v=>{closePops();const x=DV.find(d=>d.id===v);confirmDel({title:`Excluir ${esc(x.n)}?`,body:`Os ${dvDates(x).filter(d=>dvHas(x,d)).length} dias montados e o registro de quem viu deixam de existir.`,onConfirm:()=>{const i=DV.indexOf(x);DV.splice(i,1);S.dv=null;render();toast('Devocional excluído',()=>{DV.splice(i,0,x);render();});}});},
 dvDay:v=>dvDayDlg(v),
 dvWho:v=>dvWhoDlg(v),
 dvAddP:v=>dvAddDlg(v),
 dvRmP:v=>{const [id,p]=v.split('|'),x=DV.find(d=>d.id===id);confirmDel({title:`Tirar ${esc(p)}?`,body:'A pessoa deixa de ver o devocional e o que ela já viu sai do progresso.',label:'Tirar',onConfirm:()=>{x.people=x.people.filter(n=>n!==p);delete x.seen[p];delete x.joined[p];dvRe();toast('Participante retirado');}});}
};
Object.assign(A,DVA);

/* ---------- página e navegação ---------- */
{const _ph=placeholder;placeholder=id=>id==='devocional'?dvPage():_ph(id);}
{const _nav=A.nav;A.nav=v=>{S.dv=null;_nav(v);};}
{const _r=render;render=function(){_r.apply(this,arguments);if(S.active==='devocional'&&S.dv)requestAnimationFrame(tabInd);};}
