/* ---------- Devocional na Agenda (protótipo, 05/11/2026) ----------
 * O participante recebe um conteúdo por dia, só depois que a data chega: os dias futuros ficam escondidos.
 * Aparece em Agenda › Eventos (o devocional do dia) e na aba Agenda › Devocional. Abrir o dia registra que a pessoa leu. */
const DEV_T=['Liderar começa em casa','O líder que escuta','Servir antes de mandar','Coragem para decidir','Humildade que sustenta','Equipe antes de projeto','Dar o exemplo','Corrigir com amor','Delegar com confiança','Perseverar na pressão','Descansar também é liderar','Formar novos líderes','Visão que contagia'];
const DEV_TH=['Uma leitura curta e uma pergunta para o dia.','Um texto para ler com calma e anotar o que ficou.','Passagem bíblica e uma aplicação prática.'];
const DEV_ALL=Array.from({length:15},(_,i)=>{const d=new Date(2026,8,21+i);return K(d.getFullYear(),d.getMonth()+1,d.getDate());});
const DEV_D={};DEV_T.forEach((t,i)=>{DEV_D[DEV_ALL[i]]={n:i+1,t:`Dia ${i+1} · ${t}`,theme:DEV_TH[i%3],files:[`Lideranca-Forte-Dia-${String(i+1).padStart(2,'0')}.${i===7?'docx':'pdf'}`]};});
const DEV_SEEN=new Set(DEV_ALL.slice(0,7));
const dvOn=()=>S.role!=='visitante';
const dvHasK=k=>dvOn()&&k<=todayKey&&!!DEV_D[k];
const dvRel=()=>DEV_ALL.filter(k=>k<=todayKey&&DEV_D[k]);
const dvPend=()=>dvOn()?dvRel().filter(k=>!DEV_SEEN.has(k)).length:0;
const dvDnum=k=>DEV_ALL.indexOf(k)+1;
function dvCard(k){const d=DEV_D[k],o=KD(k),seen=DEV_SEEN.has(k);
 return `<article class="ev-c es2" style="--t:var(--tone-damasco);--i:0">
  <div class="es2-r"><span class="ev-dt"><b>${o.d}</b><small>${WD[dow(o.y,o.m,o.d)].toLowerCase()}</small></span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-cat"><i></i>Devocional<em>· Dia ${dvDnum(k)} de ${DEV_ALL.length}</em></span><span class="ev-t">${esc(d.t)}</span><span class="ev-m">${ic('clipboard',13,2)}<span class="ev-pl">${d.files.length} arquivo${d.files.length>1?'s':''}</span></span></span>
   ${seen?ST2('ok','Lido'):ST2('warn','Para ler')}</div>
  <div class="es2-a"><button class="btn ${seen?'ghost2':'primary'} sm" data-a="dvOpen" data-v="${k}">${seen?'Ler de novo':'Ler agora'}</button></div></article>`;}
const dvEv=k=>dvHasK(k)?`<div class="ev-list">${dvCard(k)}</div>`:'';
function dvTab(){
 const rel=dvRel(),lidos=rel.filter(k=>DEV_SEEN.has(k)).length,pend=rel.length-lidos,nx=DEV_ALL.find(k=>k>todayKey&&DEV_D[k]),o=nx&&KD(nx);
 return `<div class="stack g4"><article class="card" style="padding:16px 18px;border-radius:var(--r-lg)"><div class="stack g3"><div class="row between"><div class="stack" style="gap:3px"><span class="it-title">Liderança Forte</span><span class="it-sub">21 set a 5 out · dia ${DEV_ALL.indexOf(todayKey)+1} de ${DEV_ALL.length}</span></div>${pend?ST2('warn',pend+' para ler'):ST2('ok','Em dia')}</div>
  <div class="bar"><i style="width:${rel.length?Math.round(lidos/rel.length*100):0}%"></i></div><span class="foot" style="margin:0">Você leu ${lidos} de ${rel.length} dias liberados</span></div></article>
  <div class="stack g3"><p class="eb2">Dias liberados</p><div class="ev-list">${rel.slice().reverse().map(dvCard).join('')}</div></div>
  <p class="foot" style="margin:0">${nx?`O próximo dia libera em ${o.d} de ${MONTHS[o.m-1].slice(0,3).toLowerCase()}.`:'Não há próximos dias por enquanto.'} Os dias futuros ficam escondidos até a data chegar.</p></div>`;
}
A.dvOpen=v=>{const k=+v,d=DEV_D[k];if(!d)return;const first=!DEV_SEEN.has(k);DEV_SEEN.add(k);
 sheet(`<div class="stack g5"><div class="stack g2"><p class="eb2">Devocional · Dia ${dvDnum(k)} de ${DEV_ALL.length}</p><h3 class="t2">${esc(d.t)}</h3><p class="body">${esc(d.theme)}</p></div>
  <div class="stack g3"><p class="eb2">Para ler</p>${d.files.map(f=>`<button type="button" class="card row g4" data-a="dvFile" data-v="${esc(f)}" style="padding:14px 16px;border-radius:var(--r-lg);align-items:center;text-align:left"><span style="display:grid;place-items:center">${ic('clipboard',18,2)}</span><span class="grow it-title">${esc(f)}</span><span class="tlink">Abrir</span></button>`).join('')}</div>
  <p class="foot" style="margin:0">${first?'Registrado: quem organiza o devocional vê que você leu este dia.':'Você já leu este dia.'}</p>
  <button class="btn primary block" data-a="closeSheet">Fechar</button></div>`);
 softRender();};
A.dvFile=v=>toast('info','Abrindo o arquivo',v);

/* Abas da Agenda: rolagem com borda suave, ícone e contador */
const AG_TABS=[['Eventos','calendar'],['Escalas','clipboard'],['Encontros','home'],['Discipulado','sprout'],['Devocional','book'],['Acompanhamento','care']];
const agBadge=t=>t==='Escalas'?S.escalas.filter(x=>x.st==='pendente').length:t==='Encontros'?invPend():t==='Discipulado'?S.discs.filter(x=>x.st==='pendente').length:t==='Devocional'?dvPend():t==='Acompanhamento'&&S.care.next&&S.care.next.st==='pendente'?1:0;
function agTabsHTML(){const L=AG_TABS.filter(([t])=>t!=='Devocional'||dvOn()),i0=Math.max(0,L.findIndex(([t])=>t===S.ag.tab));return `<div class="gnav agnav"><button class="gar${i0===0?' off':''}" data-a="agStep" data-v="-1" aria-label="Aba anterior">${ic('chevL',16,2.25)}</button><div class="utw"><div class="utabs" role="tablist" id="agTabs">${L.map(([t,i])=>{const n=agBadge(t);return `<button role="tab" aria-selected="${S.ag.tab===t}" data-a="agTab" data-v="${t}">${ic(i,15,2)}<span>${t}</span>${n?`<small class="ubdg" aria-label="${n} pendente${n>1?'s':''}">${n}</small>`:''}</button>`;}).join('')}</div></div><button class="gar${i0===L.length-1?' off':''}" data-a="agStep" data-v="1" aria-label="Próxima aba">${ic('chevR',16,2.25)}</button></div><div class="gdots">${L.map(([t],i)=>`<button class="gdot${i===i0?' on':''}" data-a="agTab" data-v="${t}" aria-label="${t}"></button>`).join('')}</div>`;}
const agTabScroll=(smooth)=>{const b=$('#agTabs [aria-selected="true"]'),w=$('#agTabs');if(!b||!w)return;const x=b.offsetLeft-(w.clientWidth-b.offsetWidth)/2;w.scrollTo({left:Math.max(0,x),behavior:smooth?'smooth':'auto'});const sync=()=>{const p=w.parentNode;p.classList.toggle('fl',w.scrollLeft>4);p.classList.toggle('fr',w.scrollLeft<w.scrollWidth-w.clientWidth-4);};sync();if(!w.dataset.sc){w.dataset.sc=1;w.addEventListener('scroll',sync,{passive:true});}
 const nav=w.closest('.agnav'),tb=[...w.querySelectorAll('[role="tab"]')],i=tb.indexOf(b);if(nav){nav.classList.toggle('ov',w.scrollWidth>w.clientWidth+2);const ar=nav.querySelectorAll('.gar');ar[0].classList.toggle('off',i<=0);ar[1].classList.toggle('off',i>=tb.length-1);nav.nextElementSibling&&[...nav.nextElementSibling.children].forEach((d,k)=>d.classList.toggle('on',k===i));}};
A.agStep=v=>{const tb=[...document.querySelectorAll('#agTabs [role="tab"]')],i=tb.findIndex(x=>x.getAttribute('aria-selected')==='true')+(+v);if(i>=0&&i<tb.length)A.agTab(tb[i].dataset.v);};
{const base=A.agTab;A.agTab=v=>{base(v);agTabScroll(true);};}
const agTabHint=()=>{if(S.agHinted)return;const w=$('#agTabs');if(!w||w.scrollWidth-w.clientWidth<24)return;S.agHinted=true;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const x0=w.scrollLeft,d=Math.min(72,w.scrollWidth-w.clientWidth-x0);if(d<16)return;setTimeout(()=>{w.style.scrollSnapType='none';w.scrollTo({left:x0+d,behavior:'smooth'});setTimeout(()=>{w.scrollTo({left:x0,behavior:'smooth'});setTimeout(()=>{w.style.scrollSnapType='';},600);},650);},700);};
{const base=render;render=function(){const r=base.apply(this,arguments);if(S.screen==='agenda')requestAnimationFrame(()=>{agTabScroll(false);agTabHint();});return r;};}
{const base=softRender;softRender=function(){const r=base.apply(this,arguments);if(S.screen==='agenda')requestAnimationFrame(()=>agTabScroll(false));return r;};}

