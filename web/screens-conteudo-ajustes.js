/* ================= Ajustes de Conteúdo (21/10/2026) =================
   Só mostra que existe: série mista, "Gera certificado", comentários, aba Conteúdo do ministério como lista de leitura
   e a mesma trilha do discipulado no Acompanhamento. Sem persistência. */

/* ---------- série mista: qualquer série aceita pregação, vídeo, música e material ---------- */
NX_SERIES.forEach(s=>{s.type='Misto';});
if(!NX_SERIES.some(s=>s.id==='sx1')){PSERIES.push({id:'sx1',n:'Primeiros passos na fé',h:2});NX_SERIES.push({id:'sx1',n:'Primeiros passos na fé',type:'Misto',desc:'Uma pregação, um vídeo, uma música e um material para quem está começando.',min:'',visibility:'Interno',cert:true,items:[PREGS[0].id,NX_VIDEOS[0].id,SONGS[0].id,MATS[0].id],people:[]});nxSyncSr();}

/* ---------- "Gera certificado" (curso e jornada) ---------- */
document.addEventListener('change',e=>{const t=e.target.closest&&e.target.closest('[data-cert]');if(!t)return;const [k,id]=t.dataset.cert.split('|'),o=k==='course'?[...JORNS.flatMap(j=>j.courses),...CSOLO.flatMap(j=>j.courses)].find(c=>c.id===id):k==='series'?NX_SERIES.find(s=>s.id===id):JORNS.find(j=>j.id===id);if(!o)return;o.cert=t.checked;toast(t.checked?'Certificado ligado':'Certificado desligado');});

/* ---------- comentários: no painel só aparecem os feitos no app; quem tem Conteúdo apaga ---------- */
let _cmid=0;
const CMTS={};
const cmtList=k=>CMTS[k]||(CMTS[k]=[]);
const cmtSeed=(k,l)=>{CMTS[k]=l.map(c=>({id:'cm'+(++_cmid),...c}));};
cmtSeed('content.sermon:'+PREGS[0].id,[{n:'Ana Lima',t:'Que palavra! Obrigada por compartilhar.',at:'há 2 dias'},{n:'Bruno Reis',t:'Fortaleceu a minha semana.',at:'há 1 dia'}]);
cmtSeed('content.video:'+NX_VIDEOS[0].id,[{n:'Helena Duarte',t:'Compartilhei com a minha casa.',at:'há 3 dias'}]);
cmtSeed('learning.series:'+NX_SERIES[0].id,[{n:'Daniela Rocha',t:'Estou no terceiro item, muito bom.',at:'ontem'}]);
function cmtCard(kind,id){const k=kind+':'+id,l=cmtList(k);
 return `<section class="card pc cmt" data-k="${k}" style="margin-top:16px"><div class="sh"><h2>Comentários</h2><span class="who">${l.length}</span></div>
  ${l.length?`<div class="esms">${l.map(c=>`<div class="esm"><span class="av" style="background:var(--tone-${TONES[c.n.length%6]});color:var(--tone-${TONES[c.n.length%6]}-ink)">${initials(c.n)}</span><span class="dkt"><b>${esc(c.n)} <small class="soft">· ${c.at}</small></b><span style="white-space:normal">${esc(c.t)}</span></span><button class="ibtn sm" data-a="cmtDel" data-v="${k}|${c.id}" aria-label="Apagar comentário" title="Apagar">${ic('x',13)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0 0 4px">Ninguém comentou ainda.</p>'}
  <p class="hint" style="margin:10px 0 0">Os comentários são feitos pelos membros, no app. Quem tem Conteúdo pode apagar.</p></section>`;}
const cmtPaint=k=>{const el=document.querySelector(`.cmt[data-k="${k}"]`);if(el){const i=k.indexOf(':');el.outerHTML=cmtCard(k.slice(0,i),k.slice(i+1));}};
Object.assign(A,{
 cmtDel:v=>{const i=v.lastIndexOf('|'),k=v.slice(0,i),id=v.slice(i+1),l=cmtList(k),n=l.findIndex(c=>c.id===id),c=l[n];if(!c)return;l.splice(n,1);cmtPaint(k);toast('Comentário apagado',()=>{l.splice(n,0,c);cmtPaint(k);});}});
{const o=pgEdit;pgEdit=function(){const h=o.apply(this,arguments);return S.preg&&PREGS.some(x=>x.id===S.preg)?h+cmtCard('content.sermon',S.preg):h;};}
{const o=nxVideoPage;nxVideoPage=function(){const h=o.apply(this,arguments);return S.nxVideo&&NX_VIDEOS.some(v=>v.id===S.nxVideo)?h+cmtCard('content.video',S.nxVideo):h;};}
{const o=nxSeriesPage;nxSeriesPage=function(){let h=o.apply(this,arguments);const s=S.nxSeries&&NX_SERIES.find(x=>x.id===S.nxSeries);if(!s)return h;
 h=h.replace('<ol class="ct-tl" id="nxSerList">','<label class="tog" style="margin:4px 0 14px"><input type="checkbox" data-cert="series|'+s.id+'" '+(s.cert?'checked':'')+'><span class="sw"></span><span><b>Gera certificado</b><small>Ao concluir todos os itens da série</small></span></label><ol class="ct-tl" id="nxSerList">');
 return h+cmtCard('learning.series',S.nxSeries);};}
{const o=joDetail;joDetail=function(){const h=o.apply(this,arguments);return S.jor&&!S.cur&&JORNS.some(j=>j.id===S.jor)?h+cmtCard('learning.journey',S.jor):h;};}
{const o=cuDetail;cuDetail=function(){const h=o.apply(this,arguments),j=jById(S.jor);return j&&S.cur&&cuById(j,S.cur)?h+cmtCard('learning.course',S.cur):h;};}
{const o=A.alEdit;A.alEdit=function(v){o.apply(this,arguments);const f=$('#alF');if(f)f.insertAdjacentHTML('afterend',cmtCard('learning.lesson',v));};}
[...JORNS,...CSOLO].forEach(j=>{const au=j.courses[0]&&j.courses[0].aulas[0];if(au)cmtSeed('learning.lesson:'+au.id,[{n:'Helena Duarte',t:'A aula sobre a graça me ajudou muito.',at:'há 4 dias'},{n:'Bruno Reis',t:'Gostei do versículo-base.',at:'há 2 dias'}]);});
{const o=sgForm;sgForm=function(id){o.apply(this,arguments);if(id){const f=$('#sgF');if(f)f.insertAdjacentHTML('afterend',cmtCard('content.song',id));}};}

/* ---------- aba Conteúdo do ministério: lista de leitura (do ministério e vinculado), por tipo ---------- */
Object.assign(CONTENT,{Jornada:JORNS.filter(j=>j.st!=='concluida').map(j=>j.n),Série:NX_SERIES.map(s=>s.n)});
Object.assign(CTYPE_IC,{Jornada:'route',Série:'layers',Vídeo:'play'});
Object.assign(MC_PAGE,{Jornada:'jornadas',Série:'series',Vídeo:'videos'});
const MC_PL={Curso:'Cursos',Jornada:'Jornadas',Série:'Séries',Pregação:'Pregações',Vídeo:'Vídeos',Música:'Músicas',Material:'Materiais'};
/* item restrito a um ministério não pode ser vinculado a outro (só público ou interno) */
const mcRestr=(type,name)=>{const o=type==='Pregação'?PREGS.find(p=>p.t===name):type==='Música'?SONGS.find(s=>s.n===name):type==='Material'?MATS.find(m=>m.t===name):type==='Curso'?(CSOLO.find(j=>j.courses[0].n===name)||{}):type==='Série'?NX_SERIES.find(s=>s.n===name):null;return !!(o&&o.min);};
const mcOwned=m=>[...CSOLO.filter(j=>j.min===m.n).map(j=>['Curso',j.courses[0].n]),...NX_SERIES.filter(s=>s.min===m.n).map(s=>['Série',s.n]),...PREGS.filter(p=>p.min===m.n).map(p=>['Pregação',p.t]),...NX_VIDEOS.filter(v=>v.min===m.n).map(v=>['Vídeo',v.t]),...SONGS.filter(s=>s.min===m.n).map(s=>['Música',s.n]),...MATS.filter(x=>x.min===m.n).map(x=>['Material',x.t])];
mnCont=function(m){mnNorm(m);const own=mcOwned(m),lk=m.content,types=Object.keys(MC_PL).filter(t=>own.some(o=>o[0]===t)||lk.some(c=>c.type===t));
 const row=(t,title,tag,act,v)=>`<div class="ct1" tabindex="0" data-a="${act}" data-v="${v}" style="cursor:pointer"><span class="cti">${ic(CTYPE_IC[t],16)}</span><span class="ctt"><b>${esc(title)}</b><small>${tag}</small></span>${ic('chevR',14,2)}</div>`;
 return `<section class="card pc"><div class="sh"><div><h2>Conteúdo do ministério</h2><p class="who" style="margin:4px 0 0">O que é do ministério e o que está vinculado a ele. Tudo é cadastrado em Conteúdo; aqui você consulta e vincula o que for público ou interno.</p></div><button class="btn sec sm" data-a="mcNew">${ic('plus',14,2.2)}Vincular conteúdo</button></div>
  ${types.length?types.map(t=>`<p class="fl" style="margin:18px 0 8px">${MC_PL[t]}</p><div class="conts">${own.filter(o=>o[0]===t).map(o=>row(t,o[1],'Do ministério','mcOpen',t)).join('')}${lk.map((c,i)=>c.type===t&&!own.some(o=>o[0]===t&&o[1]===c.t)?row(t,c.t,'Vinculado em '+c.at+(c.teams.length?' · para '+c.teams.map(esc).join(', '):'')+(c.req?' · obrigatório':''),'mcView',i):'').join('')}</div>`).join(''):mnEmpty('Nenhum conteúdo vinculado.','Vincule um curso, pregação, música ou material.','book','mcNew')}</section>`;};

/* ---------- Acompanhamento: a mesma trilha do discipulado ---------- */
if(!TP_TYPES.includes('Série'))TP_TYPES.push('Série');
CASES.forEach(c=>{if(!c.trail)c.trail=[];if(c.stage==null)c.stage=2;});
CASES[0].trail=[{k:'Curso',t:'Vida de oração',note:'Para fazer junto com a família',done:false}];
{const o=caseDetail;caseDetail=function(){const h=o.apply(this,arguments),c=cById(S.case);if(!c||(S.careTab||'details')!=='details')return h;const tr=dTrail(c);
 return h+`<section class="card pc rise" style="--d:3;margin-top:16px"><div class="sh"><h2>Trilha</h2><span class="who">${tr.filter(j=>j.done>=j.c).length} de ${tr.length} itens concluídos</span></div>
  <ol class="ct-tl">${tr.map(dTrailRow).join('').replace(/data-a="dJ(Swap|Del|Go)"/g,'data-a="cJ$1"')}
   <li class="ct-addn"><span class="ct-node add">${ic('plus',14,2.2)}</span><button class="ct-cc add" data-a="cAddJ"><b>Adicionar à trilha</b><span>Jornada, curso, série, pregação, música ou material</span></button></li></ol>
  <p class="who" style="margin:12px 0 0">Toque em um item para abri-lo. O progresso vem do que a pessoa assiste e conclui no app.</p></section>`;};}
Object.assign(A,{
 cAddJ:()=>dTrailPick(cById(S.case),undefined,cRe),
 cJSwap:v=>dTrailPick(cById(S.case),+v,cRe),
 cJDel:v=>{const c=cById(S.case),r=dTrail(c)[+v],t=c.trail[+v];confirmDel({title:'Remover este item da trilha?',body:`“${esc(r.n)}” sai da trilha de ${esc(first(c))}. O conteúdo continua existindo em Conteúdo.`,label:'Remover',onConfirm:()=>{c.trail.splice(+v,1);cRe();toast('Item removido da trilha',()=>{c.trail.splice(+v,0,t);cRe();});}});},
 cJGo:v=>{const c=cById(S.case),t=(dTrail(c),c.trail[+v]);if(t.k&&t.k!=='Jornada'){S.case=null;A.nav(MC_PAGE[t.k]);return;}S.jor=t.id;S.jtab='trilha';S.active='jornadas';S.case=null;render();window.scrollTo({top:0});}});
