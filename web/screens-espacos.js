/* ================= Espaços › Reservas e Salas ================= */
Object.assign(I,{
 tv:'<rect width="20" height="15" x="2" y="3" rx="2"/><path d="M7 21h10"/>',
 mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
 snow:'<path d="M12 2v20"/><path d="m4.9 4.9 14.2 14.2"/><path d="M2 12h20"/><path d="m4.9 19.1 14.2-14.2"/>',
 chair:'<path d="M7 18v3"/><path d="M17 18v3"/><path d="M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6"/><path d="M4 11h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/>',
 piano:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 4v10"/><path d="M10 4v10"/><path d="M14 4v10"/><path d="M18 4v10"/><path d="M2 14h20"/>',
 wifi:'<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M12 20h.01"/>',
});
const RECS=[['som','Som','mic'],['proj','Projetor','monitor'],['tv','TV','tv'],['ar','Ar-condicionado','snow'],['wifi','Wi-Fi','wifi']];
const ESPS=[
 {id:'s1',n:'Auditório Principal',cap:300,loc:'Térreo',desc:'',act:true,rec:['som','proj','ar','wifi'],tone:'ceu',icon:'church',fixed:[[0,'09:00','12:30','Culto de Celebração'],[0,'18:00','20:30','Culto da noite'],[3,'19:30','21:30','Culto de quarta']]},
 {id:'s2',n:'Sala de Reuniões A',cap:12,loc:'1º andar',desc:'',act:true,rec:['tv','ar','wifi'],tone:'menta',icon:'users',fixed:[]},
 {id:'s3',n:'Sala de Reuniões B',cap:8,loc:'1º andar',desc:'Ideal para aconselhamento.',act:true,rec:['ar'],tone:'salvia',icon:'message',fixed:[]},
 {id:'s4',n:'Sala Kids',cap:25,loc:'Anexo',desc:'Sala do Kids A. Reservada pelo Culto Kids; fora desse horário fica livre pra reserva.',act:true,rec:['tv','ar'],tone:'damasco',icon:'baby',fixed:[]},
 {id:'s5',n:'Espaço Multiuso',cap:60,loc:'2º andar',desc:'',act:true,rec:['som'],tone:'rosado',icon:'layers',fixed:[]},
 {id:'s7',n:'Sala Berçário',cap:15,loc:'Anexo',desc:'',act:true,rec:['ar'],tone:'damasco',icon:'baby',fixed:[]},
 {id:'s8',n:'Sala Maternal',cap:20,loc:'Anexo',desc:'',act:true,rec:['ar'],tone:'damasco',icon:'baby',fixed:[]},
 {id:'s9',n:'Sala Jardim',cap:22,loc:'Anexo',desc:'',act:true,rec:['ar'],tone:'damasco',icon:'baby',fixed:[]},
 {id:'s6',n:'Sala de Oração',cap:15,loc:'Térreo',desc:'Em reforma até novembro.',act:false,rec:[],tone:'lima',icon:'hands',fixed:[]},
];
/* uso fixo: regras com vigência e recorrência (dia fixo, semanal, quinzenal, mensal, anual) */
let _uid2=0;const UF=(l,f,t,rec,o={})=>({id:'u'+(++_uid2),l,f,t,rec,days:o.days||[],mode:o.mode||'semana',date:o.date||'',from:o.from||'2026-01-01',to:o.to||''});
ESPS.forEach(s=>{s.uso=s.fixed.map(x=>UF(x[3],x[1],x[2],'semanal',{days:[x[0]]}));delete s.fixed;s.custom=[];s.hist=[{t:'Sala criada',d:'2026-01-10',by:'Administração'}];});
ESPS[0].custom=[{k:'c1',n:'Teclado fixo'}];ESPS[0].rec.push('c1');
/* o Culto Kids (evento do ministério Kids) reserva as salas do Kids, todo domingo */
['s7','s8','s9','s4'].forEach(id=>{const sp=ESPS.find(x=>x.id===id);[['srK1','10:00','12:00','Culto Kids · manhã'],['srK2','19:00','21:00','Culto Kids · noite']].forEach(([ser,f,t,l])=>{const e=EVTS.find(x=>x.ser===ser);sp.uso.push(Object.assign(UF(l,f,t,'semanal',{days:[0],from:'2026-10-04'}),{ev:e.id}));});});
ESPS[1].uso.push(UF('Conselho pastoral','08:00','09:30','quinzenal',{days:[1],from:'2026-09-07'}));
ESPS[4].uso.push(UF('Reunião de diáconos','19:30','21:00','mensal',{mode:'semana',date:'2026-10-06',from:'2026-01-06'}));
ESPS[4].custom=[{k:'c2',n:'Bebedouro'},{k:'c3',n:'Cadeiras extras'},{k:'c4',n:'Instrumentos'}];ESPS[4].rec.push('c2','c3','c4');
ESPS[0].uso.push(UF('Culto de Natal','19:00','22:00','anual',{mode:'dia',date:'2026-12-24'}));
let _rvid=0;
const RV=(s,d,f,t,p,who,why,st='confirmada',reason='')=>({id:'rv'+(++_rvid),s,d,f,t,p,who,why,st,reason});
const RESERVAS=[
 RV('s3','2026-09-20','09:00','10:00',5,'Ana Clara Lima','Aconselhamento pastoral','cancelada','Remarcado pelo solicitante'),
 RV('s2','2026-09-24','19:00','21:00',8,'Lucas Teixeira','Reunião de liderança do Ministério de Jovens'),
 RV('s5','2026-09-26','14:00','17:00',40,'Helena Duarte','Ensaio do coral'),
 RV('s5','2026-10-01','14:00','17:00',40,'Helena Duarte','Ensaio do coral'),
 RV('s2','2026-10-01','19:00','21:00',10,'Lucas Teixeira','Reunião de liderança do Ministério de Jovens'),
 RV('s3','2026-10-02','10:00','11:00',3,'Otávio Lins','Aconselhamento pastoral'),
 RV('s1','2026-10-03','08:00','12:00',120,'Thiago Barros','Ensaio geral — Conferência Missões'),
 RV('s4','2026-10-03','15:00','17:00',18,'Daniela Rocha','Treinamento de monitores Kids'),
 RV('s1','2026-10-04','14:00','16:00',80,'Clara Nunes','Ensaio de casamento','cancelada','Data mudou'),
 RV('s5','2026-10-05','19:30','21:30',35,'Marina Costa','Curso de casais'),
 RV('s2','2026-10-06','08:00','09:00',6,'Carlos Eduardo Silva','Reunião de pastores'),
 RV('s3','2026-10-07','16:00','17:30',4,'Otávio Lins','Aconselhamento pastoral'),
];
RESERVAS.push(Object.assign(RV('s5','2026-10-09','18:00','12:00',50,'Thiago Barros','Retiro de jovens'),{d2:'2026-10-11'}));
const NOWD='2026-10-01',NOWM=15*60+20,H0=0,H1=24;
setTimeout(()=>{const r=RESERVAS.find(x=>x.why==='Ensaio geral — Conferência Missões');if(r&&!LOANS.some(l=>l.rv===r.id))[['it3',1],['it5',1],['it2',3]].forEach(([id,q])=>{const l=LN(id,q,r.who,r.d,'2026-10-04');l.rv=r.id;l.st='pend';l.asked='2026-09-30';l.note='Reserva · '+slById(r.s).n;LOANS.unshift(l);});},0);
Object.assign(S,{rvDay:NOWD,rvWk:NOWD,rvq:'',rvf:'prox',rvSala:null,slq:''});
const slById=id=>ESPS.find(s=>s.id===id);
const DOWN=['domingo','segunda','terça','quarta','quinta','sexta','sábado'],DOWS=['dom','seg','ter','qua','qui','sex','sáb'];
const REC_L=[['semanal','Semanal'],['quinzenal','Quinzenal'],['mensal','Mensal'],['anual','Anual']];
const nthOf=d=>Math.ceil(+d.slice(8)/7),ORD=n=>n>=5?'última':n+'ª';
const dim=d=>new Date(+d.slice(0,4),+d.slice(5,7),0).getDate(),dayOn=(d,a)=>+d.slice(8)===Math.min(+a.slice(8),dim(d)),nthOn=(d,a)=>{if(dow(d)!==dow(a))return false;const n=nthOf(a);return n>=5?+d.slice(8)+7>dim(d):nthOf(d)===n;};
const dDiff=(a,b)=>Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);
function ruleOn(u,d){if(u.from&&d<u.from)return false;if(u.to&&d>u.to)return false;const a=u.date||u.from,w=dow(d);
 if(u.rec==='unico')return d===u.date;
 if(u.rec==='semanal')return u.days.includes(w);
 if(u.rec==='quinzenal'){if(!u.days.includes(w))return false;const s0=addD(u.from,-dow(u.from));return Math.floor(dDiff(s0,d)/7)%2===0;}
 if(u.rec==='mensal')return u.mode==='dia'?dayOn(d,a):nthOn(d,a);
 if(u.rec==='anual'){if(d.slice(5,7)!==a.slice(5,7))return false;return u.mode==='dia'?dayOn(d,a):nthOn(d,a);}
 return false;}
const dayNm=w=>(w===0||w===6?'todo ':'toda ')+DOWN[w];
const plural=w=>DOWN[w].replace(/(a|o)$/,'$1s').replace('terça','terças').replace('sábado','sábados');
function ruleTxt(u){const a=u.date||u.from,dt=x=>`${+x.slice(8)} de ${MONTHS[+x.slice(5,7)-1]}`;let t='';
 if(u.rec==='unico')t=u.date?`Somente em ${fmtDate(u.date)}`:'Escolha a data';
 else if(u.rec==='semanal')t=u.days.length===1?dayNm(u.days[0]):u.days.length?'Toda semana: '+u.days.map(w=>DOWS[w]).join(', '):'Escolha os dias';
 else if(u.rec==='quinzenal')t=u.days.length?'A cada 2 semanas, às '+u.days.map(plural).join(' e '):'Escolha os dias';
 else if(u.rec==='mensal')t=!a?'Escolha a data de referência':u.mode==='dia'?`Todo dia ${+a.slice(8)} do mês`:`${ORD(nthOf(a))} ${DOWN[dow(a)]} de cada mês`;
 else if(u.rec==='anual')t=!a?'Escolha a data de referência':u.mode==='dia'?`Todo ano em ${dt(a)}`:`${ORD(nthOf(a))} ${DOWN[dow(a)]} de ${MONTHS[+a.slice(5,7)-1]}, todo ano`;
 return t.charAt(0).toUpperCase()+t.slice(1);}
const dNx=d=>`${wd(d)} ${+d.slice(8)}/${d.slice(5,7)}${d.slice(0,4)!==NOWD.slice(0,4)?'/'+d.slice(2,4):''}`;
const dShort=x=>`${+x.slice(8)} ${MONTHS[+x.slice(5,7)-1].slice(0,3)} ${x.slice(0,4)}`;
const vigTxt=u=>u.to?`De ${dShort(u.from)} a ${dShort(u.to)}`:`Desde ${dShort(u.from)} · sem data final`;
function ruleNext(u,n=4){const out=[];let d=u.from>NOWD?u.from:NOWD;for(let i=0;i<800&&out.length<n;i++){if(u.to&&d>u.to)break;if(ruleOn(u,d))out.push(d);d=addD(d,1);}return out;}
const recOf=(s,k)=>{const r=RECS.find(x=>x[0]===k);if(r)return r;const c=(s.custom||[]).find(x=>x.k===k);return c?[c.k,c.n,'tag']:null;};
/* disponibilidade de um item do almoxarifado numa data (empréstimos que cobrem o dia, atrasados contam como fora) */
/* disponível em TODO o período: soma o que está fora ou pedido (pendente) em cada dia e pega o pior dia */
const avOn=(it,d,skipRv,d2)=>{d2=d2||d;let worst=it.total;for(let x=d;x<=d2;x=addD(x,1)){const used=LOANS.filter(l=>l.item===it.id&&l.rv!==skipRv&&l.st!=='rec'&&l.from<=x&&(l.due>=x||(l.st!=='pend'&&l.due<NOWD))).reduce((a,l)=>a+(l.st==='pend'?l.qty:lnOpen(l)),0);worst=Math.min(worst,it.total-used);if(x>=addD(d,60))break;}return Math.max(0,worst);};
const LNST={pend:['Agendado','var(--st-sol)','var(--st-sol-bg)'],rec:['Recusado','var(--st-rec)','var(--st-rec-bg)'],ok:['Aprovado','var(--st-int)','var(--st-int-bg)']};
const lnPill=l=>{const k=l.st==='pend'?'pend':l.st==='rec'?'rec':'ok';return `<span class="stp" style="--c:${LNST[k][1]};--b:${LNST[k][2]}"><i></i>${LNST[k][0]}</span>`;};
const rvItems=id=>LOANS.filter(l=>l.rv===id);
const mm=t=>{const [h,m]=t.split(':').map(Number);return h*60+m;};
const hm=t=>{const [h,m]=t.split(':');return `${+h}h${m!=='00'?m:''}`;};
const tt=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
const addD=(iso,n)=>{const d=new Date(iso+'T12:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
const dow=iso=>new Date(iso+'T12:00').getDay();
const avN=n=>`<span class="av" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`;
const rvEnd=r=>r.d2||r.d;
const rvPast=r=>rvEnd(r)<NOWD||(rvEnd(r)===NOWD&&mm(r.t)<NOWM);
const rvStarted=r=>r.d<NOWD||(r.d===NOWD&&mm(r.f)<=NOWM);
const rvTouch=(r,d)=>r.d<=d&&d<=rvEnd(r);
const rvWhen=r=>rvEnd(r)===r.d?`${hm(r.f)} – ${hm(r.t)}`:`${dBR(r.d).slice(0,5)} ${hm(r.f)} → ${dBR(rvEnd(r)).slice(0,5)} ${hm(r.t)}`;
/* everything occupying a room on a date: reservations + fixed uses */
function busyOn(sid,d,skip){const s=slById(sid);
 return [...RESERVAS.filter(r=>r.s===sid&&rvTouch(r,d)&&r.st==='confirmada'&&r.id!==skip).map(r=>({f:r.d===d?mm(r.f):0,t:rvEnd(r)===d?mm(r.t):1440,l:r.why,r,cl:r.d<d,cr:rvEnd(r)>d})),...s.uso.filter(u=>ruleOn(u,d)).map(u=>({f:mm(u.f),t:mm(u.t),l:u.l,fix:1,u}))].sort((a,b)=>a.f-b.f);}
function conflict(sid,d,f,t,skip){return busyOn(sid,d,skip).find(b=>f<b.t&&t>b.f);}
function conflictRange(sid,d,f,d2,t,skip){for(let x=d,i=0;x<=d2&&i<400;x=addD(x,1),i++){const c=conflict(sid,x,x===d?f:0,x===d2?t:1440,skip);if(c)return c;}return null;}
function nextFree(sid,d,f,t,skip){const dur=t-f;let s=f;for(let i=0;i<60;i++){const c=busyOn(sid,d,skip).find(b=>s<b.t&&s+dur>b.f);if(!c)return s+dur<=H1*60?s:null;s=c.t;}return null;}
const hrs=(sid,d)=>busyOn(sid,d).reduce((a,b)=>a+(b.t-b.f),0)/60;
const occ=(sid,d)=>busyOn(sid,d).reduce((a,b)=>a+(b.t-b.f),0)/((H1-H0)*60);

/* ---------- Reservas ---------- */
function rvPage(){
 const act=ESPS.filter(s=>s.act),days=[...Array(7)].map((_,i)=>addD(S.rvWk,i)),dayR=RESERVAS.filter(r=>rvTouch(r,S.rvDay)&&r.st==='confirmada');
 const pct=Math.round(act.reduce((a,s)=>a+occ(s.id,S.rvDay),0)/act.length*100);
 const span=(H1-H0)*60,pos=(f,t)=>`left:${(f-H0*60)/span*100}%;width:${(t-f)/span*100}%`;
 return `<header class="ph rise"><div><p class="eb">Espaços</p><h1>Reservas</h1><p class="lede">Quem usa cada sala, e quando</p></div><div class="pact"><button class="btn pri" data-a="rvNew">${ic('plus',15,2.2)}Nova reserva</button></div></header>
 <section class="card sp-map rise" style="--d:1">
  <div class="sp-mh"><div class="sp-wk"><button class="ibtn sm" data-a="rvWk" data-v="-7" aria-label="Semana anterior">${ic('chevL',14,2)}</button>
   <div class="sp-days">${days.map(d=>{const n=RESERVAS.filter(r=>rvTouch(r,d)&&r.st==='confirmada').length;return `<button class="sp-day ${d===S.rvDay?'on':''} ${d===NOWD?'today':''}" data-a="rvDay" data-v="${d}"><small>${d===NOWD?'hoje':wd(d)}</small><b>${+d.slice(8)}</b><i>${[...Array(Math.min(n,3))].map(()=>'<em></em>').join('')}</i></button>`;}).join('')}</div>
   <button class="ibtn sm" data-a="rvWk" data-v="7" aria-label="Próxima semana">${ic('chevR',14,2)}</button></div>
   <div class="sp-stat"><div><b>${dayR.length}</b><span>reserva${dayR.length===1?'':'s'}</span></div><div><b>${dayR.reduce((a,r)=>a+r.p,0)}</b><span>pessoas esperadas</span></div><div><b>${pct}<small>%</small></b><span>horário reservado</span></div></div></div>
  <div class="sp-tlw"><div class="sp-tl">
   <div class="sp-hrs"><span></span><div>${[...Array(H1-H0)].map((_,i)=>`<span>${H0+i}h</span>`).join('')}</div></div>
   ${act.map(s=>`<div class="sp-row"><div class="sp-rn"><b>${esc(s.n)}</b><span>${s.cap} lugares</span></div><div class="sp-trk" data-sala="${s.id}" title="Clique num horário livre para reservar">
    ${busyOn(s.id,S.rvDay).map(b=>b.fix?`<span class="sp-blk fix" style="${pos(b.f,b.t)}" title="${esc(b.l)} · uso fixo"><b>${esc(b.l)}</b><small>${hm(tt(b.f))}–${hm(tt(b.t))}</small></span>`:`<button class="sp-blk ${rvPast(b.r)?'past':''}" style="${pos(b.f,b.t)}" data-a="rvView" data-v="${b.r.id}" title="${esc(b.l)}"><b>${esc(b.l)}</b><small>${b.cl||b.cr?`${b.cl?'◂ ':''}${hm(tt(b.f))}–${b.cr?'23h59':hm(tt(b.t))}${b.cr?' ▸':''}`:`${hm(b.r.f)}–${hm(b.r.t)}`} · ${b.r.p} pessoas</small></button>`).join('')}
   </div></div>`).join('')}
   ${S.rvDay===NOWD&&NOWM>H0*60&&NOWM<H1*60?`<span class="sp-now" style="--x:${(NOWM-H0*60)/span}"><i>${tt(NOWM).replace(':','h')}</i></span>`:''}
  </div></div>
  <div class="sp-leg"><span><i class="r"></i>Reserva</span><span><i class="f"></i>Uso fixo (cultos e Kids)</span><span class="soft">Toque num horário livre para reservar</span></div>
 </section>
 ${rvList()}`;
}
function rvList(){
 const q=norm(S.rvq),cnt=f=>RESERVAS.filter(r=>rvF(r,f)).length;
 const l=RESERVAS.filter(r=>rvF(r,S.rvf)&&(!S.rvSala||r.s===S.rvSala)&&(!q||norm(r.who+' '+r.why+' '+slById(r.s).n).includes(q))).sort((a,b)=>(a.d+a.f<b.d+b.f?-1:1)*(S.rvf==='pass'||S.rvf==='canc'?-1:1));
 return `<section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="rvq" placeholder="Buscar sala, pessoa ou finalidade" value="${esc(S.rvq)}" autocomplete="off"></label>
  <div class="chips">${[['prox','Próximas'],['pass','Passadas'],['canc','Canceladas'],['todas','Todas']].map(c=>`<button class="chipf ${S.rvf===c[0]?'on':''}" data-a="rvF" data-v="${c[0]}">${c[1]}<small>${cnt(c[0])}</small></button>`).join('')}
  ${S.rvSala?`<button class="chipf on sp-flt" data-a="rvSalaClr">${esc(slById(S.rvSala).n)}${ic('x',12,2.4)}</button>`:''}</div></div>
  ${l.length?`<div class="trow rsv thead"><span>Quando</span><span>Sala</span><span>Pessoas</span><span>Solicitante</span><span>Status</span></div>${l.map(r=>{const s=slById(r.s),pc=Math.min(100,r.p/s.cap*100);return `<div class="trow rsv ${r.st==='cancelada'||rvPast(r)?'off':''}" tabindex="0" data-a="rvView" data-v="${r.id}">
   <span class="tn">${dTile({d:r.d})}<span class="hn"><b>${rvWhen(r)}</b><span>${esc(r.why||'Sem finalidade')}</span></span></span>
   <span class="rvs"><b>${esc(s.n)}</b><span>${esc(s.loc)}</span></span>
   <span class="rvp"><span class="tr"><i style="width:${pc}%"></i></span><span><b>${r.p}</b>/${s.cap}</span></span>
   <span class="rvw">${avN(r.who)}<span>${esc(r.who)}</span></span>
   <span class="ts">${r.st==='cancelada'?`<span class="rvc"><span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Cancelada</span>${r.reason?`<small>${esc(r.reason)}</small>`:''}</span>`:rvPast(r)?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizada</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmada</span>'}</span></div>`;}).join('')}`
  :`<div class="mempty"><p>Nenhuma reserva aqui.</p><span>${S.rvf==='prox'?'Quando alguém reservar uma sala, ela aparece nesta lista.':'Nada corresponde a esse filtro.'}</span></div>`}
  <div class="tfoot"><span>${l.length} reserva${l.length===1?'':'s'}</span></div></section>`;
}
function rvF(r,f){return f==='todas'?true:f==='canc'?r.st==='cancelada':f==='pass'?r.st==='confirmada'&&rvPast(r):r.st==='confirmada'&&!rvPast(r);}

const rvHist=r=>{const out=[{t:'Reserva criada',d:r.d0||'2026-09-28',by:r.who},...(r.hist||[])];if(r.st==='cancelada')out.push({t:'Reserva cancelada'+(r.reason?` · ${r.reason}`:''),d:r.dc||NOWD,by:'Secretaria'});rvItems(r.id).filter(l=>l.st==='rec').forEach(l=>out.push({t:`Item recusado pelo almoxarifado · ${itm(l.item).n}${l.why?` (${l.why})`:''}`,d:NOWD,by:'Almoxarifado'}));return out.map((e,i)=>({...e,i})).sort((a,b)=>a.d===b.d?b.i-a.i:(a.d<b.d?1:-1));};
const rvHistHtml=r=>`<div class="rvr-i"><div class="sh"><h3>Histórico</h3></div><ul>${rvHist(r).map(e=>`<li><span>${esc(e.t)}<small class="rvr-why">${dBR(e.d)} · ${esc(e.by)}</small></span></li>`).join('')}</ul></div>`;
function rvDlg(rid){const r=RESERVAS.find(x=>x.id===rid),s=slById(r.s),pastR=rvPast(r);
 openDlg(`${dlgHead(esc(s.n),`${esc(s.loc)} · até ${s.cap} pessoas`)}
  <div class="rvd-when">${dTile({d:r.d})}<div><b>${rvWhen(r)}</b><span>${rvEnd(r)===r.d?`${wd(r.d)}, ${fmtDate(r.d)}`:`${wd(r.d)}, ${fmtDate(r.d)} a ${wd(rvEnd(r))}, ${fmtDate(rvEnd(r))}`}</span></div>${r.st==='cancelada'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Cancelada</span>':pastR?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizada</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmada</span>'}</div>
  <dl class="rvd-kv"><div><dt>Finalidade</dt><dd>${esc(r.why||'—')}</dd></div><div><dt>Solicitante</dt><dd class="rvw">${avN(r.who)}${esc(r.who)}</dd></div>
   <div><dt>Pessoas</dt><dd><span class="rvp"><span class="tr"><i style="width:${Math.min(100,r.p/s.cap*100)}%"></i></span><span><b>${r.p}</b> de ${s.cap}</span></span></dd></div>
   ${r.st==='cancelada'?`<div><dt>Motivo do cancelamento</dt><dd>${esc(r.reason||'Não informado')}</dd></div>`:''}</dl>
  ${rvItems(r.id).length?`<div class="rvr-i"><div class="sh"><h3>Itens do almoxarifado</h3><span class="who">${(l=>l.from===l.due?dBR(l.from):`${dBR(l.from).slice(0,5)} a ${dBR(l.due).slice(0,5)}`)(rvItems(r.id)[0])}</span></div><ul>${rvItems(r.id).map(l=>{const it=itm(l.item);return `<li>${kTile(icat(it.cat),30)}<span>${esc(it.n)} · ${l.qty}×${l.st==='rec'&&l.why?`<small class="rvr-why">${esc(l.why)}</small>`:''}</span>${lnPill(l)}</li>`;}).join('')}</ul></div>`:''}
  ${rvHistHtml(r)}
  <div class="dfoot" style="justify-content:space-between">${r.st==='confirmada'&&!pastR?`<button class="btn ghostd" data-a="rvCancel" data-v="${r.id}">Cancelar reserva</button><span class="row2"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="rvEdit" data-v="${r.id}">${ic('clock',15)}Remarcar</button></span>`:'<span></span><button class="btn sec" data-a="closeDlg">Fechar</button>'}</div>`,'sm');}

function rvForm(o={}){
 const edit=o.id?RESERVAS.find(x=>x.id===o.id):null,d0=o.d||(S.rvDay<NOWD?NOWD:S.rvDay),s0=o.s||'s2';let f0=o.f,t0=o.t;if(!f0){const nf=nextFree(s0,d0,19*60,20*60);f0=tt(nf!=null?nf:19*60);t0=tt((nf!=null?nf:19*60)+60);}
 const v=edit?{...edit}:{s:s0,d:d0,d2:d0,f:f0,t:t0,p:'',who:'',why:''};const pick={};const per={a:'',b:''};if(edit)rvItems(edit.id).filter(l=>l.st!=='rec').forEach(l=>{pick[l.item]=(pick[l.item]||0)+l.qty;per.a=l.from;per.b=l.due;});let step=1;
 openDlg(`${dlgHead(edit?'Remarcar reserva':'Nova reserva',edit?'Mude a sala, o dia, o horário ou os itens. Avisamos o solicitante.':'Sala, horário e, se precisar, itens do almoxarifado.')}
  <ol class="rvw-steps" id="rvSteps">${['Sala e horário','Itens do almoxarifado','Revisão'].map((x,i)=>`<li class="${i?'':'on'}"><i>${i+1}</i><span>${x}</span></li>`).join('')}</ol>
  <form id="rvF" novalidate><div class="rvw-p rv1" data-p="1">
   <section class="rv-sec"><h4>Sala</h4><div class="sp-pick rv-pick">${ESPS.filter(s=>s.act).map(s=>`<label><input type="radio" name="s" value="${s.id}" ${v.s===s.id?'checked':''}><span class="htile" style="--s:30px;background:var(--tone-${s.tone});color:var(--tone-${s.tone}-ink)">${ic(s.icon,15)}</span><span><b>${esc(s.n)}</b><small>${s.cap} lugares · ${esc(s.loc)}</small></span></label>`).join('')}</div></section>
   <section class="rv-sec"><h4>Quando</h4><div class="rv-when"><label class="fld"><span class="fl">Início · data</span><input type="date" name="d" value="${v.d}" min="${NOWD}"></label><label class="fld"><span class="fl">Início · hora</span><input type="time" name="f" value="${v.f}" step="60"></label><label class="fld"><span class="fl">Término · data</span><input type="date" name="d2" value="${v.d2||v.d}" min="${v.d}"></label><label class="fld"><span class="fl">Término · hora</span><input type="time" name="t" value="${v.t}" step="60"></label></div><div class="rv-whenx"><button type="button" class="btn sec sm" id="rvDay">Dia inteiro</button><span class="who">A reserva pode durar de algumas horas a um mês ou mais.</span></div><div class="sp-av" id="rvAv"></div></section>
   <section class="rv-sec"><h4>Detalhes</h4><div class="rv-det"><label class="fld"><span class="fl">Solicitante</span><span class="selw"><select name="who"><option value="">Escolha…</option>${MEMBERS.filter((m,i,a)=>a.findIndex(x=>x.n===m.n)===i).map(m=>`<option ${m.n===v.who?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
    <label class="fld"><span class="fl">Pessoas</span><input type="number" name="p" min="1" inputmode="numeric" value="${v.p}" placeholder="0"><span class="sp-cap" id="rvCap"></span></label>
    <label class="fld rv-why"><span class="fl">Finalidade <small>opcional</small></span><input name="why" value="${esc(v.why)}" placeholder="Ex.: Reunião de liderança" autocomplete="off"></label></div></section>
   </div>
   <div class="rvw-p" data-p="2" hidden></div><div class="rvw-p" data-p="3" hidden></div>
   <div class="dfoot rvw-ft"><button type="button" class="btn sec" id="rvBack">Cancelar</button><span class="rvw-cnt" id="rvCnt"></span><button type="submit" class="btn pri" id="rvOk">Continuar</button></div></form>`,'lg');
 const f=$('#rvF'),ok=$('#rvOk'),span=(H1-H0)*60;
 const chk=()=>{const sid=f.s.value,s=slById(sid),d=f.d.value,d2=f.d2.value||d,a=f.f.value?mm(f.f.value):0,b=f.t.value?mm(f.t.value):0,p=+f.p.value||0;
  const ok2=d&&f.f.value&&f.t.value&&(d2>d||(d2===d&&a<b));let msg='',bad=false;const c=ok2&&conflictRange(sid,d,a,d2,b,edit&&edit.id);
  if(!d||!f.f.value||!f.t.value){msg=`<span class="soft">Escolha data e horário para ver a disponibilidade.</span>`;bad=true;}
  else if(!ok2){msg=`<span class="sp-bad">${ic('alert',14,2)}O término precisa ser depois do início.</span>`;bad=true;}
  else if(c){msg=`<span class="sp-bad">${ic('alert',14,2)}Conflita com <b>${esc(c.l)}</b> (${hm(tt(c.f))}–${hm(tt(c.t))})</span>`;bad=true;}
  else msg=`<span class="sp-ok">${ic('check',14,2.4)}${esc(s.n)} está livre nesse horário</span>`;
  const av=$('#rvAv');if(!av.dataset.init){av.dataset.init=1;av.innerHTML=`<div class="sp-mini"><div class="sp-bars"></div><em id="rvSel" class="hide"><span></span></em></div><div class="sp-mt"><span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>23h59</span></div><div class="sp-msg" id="rvMsg"></div>`;}
  const key=sid+'|'+d,bw=av.querySelector('.sp-bars');
  if(bw.dataset.k!==key){bw.dataset.k=key;bw.innerHTML=d?busyOn(sid,d,edit&&edit.id).map((x,i)=>`<i class="${x.fix?'f':''}" style="left:${(x.f-H0*60)/span*100}%;width:${(x.t-x.f)/span*100}%;--i:${i}" title="${esc(x.l)} · ${hm(tt(x.f))}–${hm(tt(x.t))}"></i>`).join(''):'';}
  const sel=$('#rvSel'),valid=ok2&&d2===d;
  if(valid){const L=Math.max(0,(a-H0*60)/span*100),W=Math.max(1.2,(Math.min(b,H1*60)-Math.max(a,H0*60))/span*100);
   const wasHidden=sel.classList.contains('hide');if(wasHidden){sel.style.transition='none';sel.style.left=L+'%';sel.style.width=W+'%';sel.offsetWidth;sel.style.transition='';}
   sel.classList.remove('hide');sel.style.left=L+'%';sel.style.width=W+'%';sel.querySelector('span').textContent=`${hm(f.f.value)}–${hm(f.t.value)}`;
   sel.classList.toggle('lbl-r',L>70);
   const wasBad=sel.classList.contains('bad');sel.classList.toggle('bad',!!c);if(c&&!wasBad){sel.classList.remove('sx');sel.offsetWidth;sel.classList.add('sx');}
   if(!c&&wasBad){sel.classList.remove('sb');sel.offsetWidth;sel.classList.add('sb');}
   $$('.sp-bars i',av).forEach(i=>i.classList.toggle('hit',!!c&&i.title.startsWith(c.l)));}
  else sel.classList.add('hide');
  const mg=$('#rvMsg');if(mg.dataset.m!==msg){mg.dataset.m=msg;mg.innerHTML=msg;mg.classList.remove('in');mg.offsetWidth;mg.classList.add('in');}
  const sg=$('#rvSug');if(sg)sg.onclick=()=>{f.f.value=sg.dataset.f;f.t.value=sg.dataset.t;chk();};
  const cp=$('#rvCap');if(p>s.cap){cp.innerHTML=`<span class="tr bad"><i style="width:100%"></i></span><span class="sp-bad">Passa ${p-s.cap} da capacidade (${s.cap})</span>`;bad=true;}else cp.innerHTML=`<span class="tr"><i style="width:${p/s.cap*100}%"></i></span><span>${p?`${p} de ${s.cap} lugares`:`Capacidade: ${s.cap} lugares`}</span>`;
  if(!p||!f.who.value)bad=true;ok.disabled=bad;};
 const sumHTML=()=>{const s=slById(f.s.value),n=Object.values(pick).reduce((a,b)=>a+b,0);return n?`${n} ${n>1?'itens':'item'}`:'';};
 const items2=()=>{per.a=f.d.value;per.b=f.d2.value||f.d.value;if(per.b<per.a)per.b=per.a;const d=per.a,d2=per.b,q=norm(S.rvIq||''),k=S.rvIk||'';const its=ITEMS.filter(i=>i.tipo==='emp'&&(!k||i.cat===k)&&(!q||norm(i.n+' '+(i.sku||'')).includes(q)));
  return `<div class="rvi-top"><label class="sbox">${ic('search',16)}<input id="rvIq" placeholder="Buscar item do almoxarifado" value="${esc(S.rvIq||'')}" autocomplete="off"></label>
   <div class="chips">${[['','Todos'],...ICATS.filter(c=>ITEMS.some(i=>i.tipo==='emp'&&i.cat===c.id)).map(c=>[c.id,c.n])].map(c=>`<button type="button" class="chipf ${k===c[0]?'on':''}" data-rvk="${c[0]}">${c[1]}</button>`).join('')}</div></div>
   <div class="rvi-per"><p class="who">${ic('calendar',14)}<span>Período dos itens: o mesmo da reserva (${d===d2?dBR(d):`${dBR(d).slice(0,5)} a ${dBR(d2).slice(0,5)}`}).</span></p><p class="who">${ic('box',14)}<span>Pedido em nome de <b>${esc(f.who.value||'quem reserva')}</b>. Um líder do almoxarifado aprova ou recusa; a reserva da sala não depende disso.</span></p></div>
   <div class="rvi-list">${its.length?its.map(it=>{const av=avOn(it,d,edit&&edit.id,d2),q=pick[it.id]||0,c=icat(it.cat);return `<div class="rvi ${q?'on':''} ${av===0&&!q?'out':''}">${kTile(c,36)}<span class="dkt"><b>${esc(it.n)}</b><span>${av===0?(d===d2?'Indisponível nessa data':'Indisponível no período'):`${av} de ${it.total} disponíveis ${d===d2?'nessa data':'em todo o período'}`}</span></span>
    <span class="rvi-q"><button type="button" class="ibtn sm" data-q="-1" data-it="${it.id}" ${q?'':'disabled'} aria-label="Menos">${ic('minus',14,2.2)}</button><b>${q}</b><button type="button" class="ibtn sm" data-q="1" data-it="${it.id}" ${q>=av?'disabled':''} aria-label="Mais">${ic('plus',14,2.2)}</button></span></div>`;}).join(''):'<div class="mempty"><p>Nada encontrado.</p><span>Tente outra busca.</span></div>'}</div>`;};
 const review=()=>{const s=slById(f.s.value),its=Object.entries(pick).filter(x=>x[1]>0);
  return `<div class="rvr"><div class="rvr-c"><span class="htile" style="--s:42px;background:var(--tone-${s.tone});color:var(--tone-${s.tone}-ink)">${ic(s.icon,20)}</span><div><b>${esc(s.n)}</b><span>${f.d2.value===f.d.value?`${wd(f.d.value)}, ${fmtDate(f.d.value)} · ${hm(f.f.value)}–${hm(f.t.value)}`:`${dBR(f.d.value).slice(0,5)} ${hm(f.f.value)} → ${dBR(f.d2.value).slice(0,5)} ${hm(f.t.value)}`}</span></div><button type="button" class="lnk" data-go="1">Alterar</button></div>
   <dl class="rvd-kv"><div><dt>Solicitante</dt><dd class="rvw">${avN(f.who.value)}${esc(f.who.value)}</dd></div><div><dt>Pessoas</dt><dd>${f.p.value} de ${s.cap}</dd></div><div><dt>Finalidade</dt><dd>${esc(f.why.value.trim()||'—')}</dd></div></dl>
   <div class="rvr-i"><div class="sh"><h3>Itens do almoxarifado</h3><button type="button" class="lnk" data-go="2">${its.length?'Alterar':'Adicionar'}</button></div>${its.length?`<ul>${its.map(([id,q])=>{const it=itm(id);return `<li>${kTile(icat(it.cat),30)}<span>${esc(it.n)}</span><b>${q}×</b></li>`;}).join('')}</ul><p class="hint">${per.a===per.b?`Empréstimo para ${dBR(per.a)}`:`Empréstimo de ${dBR(per.a)} até ${dBR(per.b)}`}. Vai para aprovação no almoxarifado.</p>`:'<p class="who" style="margin:0">Nenhum item. A reserva é só da sala.</p>'}</div></div>`;};
 const go=n=>{step=n;$$('.rvw-p',f).forEach(p=>p.hidden=+p.dataset.p!==n);$$('#rvSteps li').forEach((li,i)=>{li.classList.toggle('on',i+1===n);li.classList.toggle('done',i+1<n);});
  if(n===2){$('.rvw-p[data-p="2"]',f).innerHTML=items2();bind2();}if(n===3)$('.rvw-p[data-p="3"]',f).innerHTML=review();
  $('#rvBack').textContent=n===1?'Cancelar':'Voltar';ok.textContent=n===3?(edit?'Salvar alterações':'Confirmar reserva'):'Continuar';
  $('#rvCnt').textContent=n===2?(sumHTML()||'Itens são opcionais'):'';if(n===1)chk();else ok.disabled=false;$('.dlg').scrollTop=0;};
 const bind2=()=>{const p=$('.rvw-p[data-p="2"]',f),q=$('#rvIq');const per2=()=>{per.a=f.d.value;per.b=f.d2.value||per.a;if(per.b<per.a)per.b=per.a;Object.keys(pick).forEach(k=>{const av=avOn(itm(k),per.a,edit&&edit.id,per.b);if(pick[k]>av)pick[k]=av;});p.innerHTML=items2();bind2();$('#rvCnt').textContent=sumHTML()||'Itens são opcionais';};q.addEventListener('input',e=>{S.rvIq=e.target.value;const c=e.target.selectionStart;p.innerHTML=items2();bind2();const n=$('#rvIq');n.focus();n.setSelectionRange(c,c);});};
 f.addEventListener('click',e=>{const b=e.target.closest('[data-q],[data-rvk],[data-go]');if(!b)return;
  if(b.dataset.go){go(+b.dataset.go);return;}
  if(b.dataset.rvk!==undefined){S.rvIk=b.dataset.rvk;$('.rvw-p[data-p="2"]',f).innerHTML=items2();bind2();return;}
  const id=b.dataset.it,it=itm(id),av=avOn(it,per.a||f.d.value,edit&&edit.id,per.b);pick[id]=Math.max(0,Math.min(av,(pick[id]||0)+ +b.dataset.q));$('.rvw-p[data-p="2"]',f).innerHTML=items2();bind2();$('#rvCnt').textContent=sumHTML()||'Itens são opcionais';});
 $('#rvBack').addEventListener('click',()=>{if(step===1)closeDlg();else go(step-1);});
 const di=$('#rvDay');if(di)di.addEventListener('click',()=>{f.f.value='00:00';f.d2.value=addD(f.d.value,1);f.t.value='00:00';chk();});
 S.rvIq='';S.rvIk='';
 f.addEventListener('input',e=>{if(step===1)chk();});f.addEventListener('change',e=>{if(step===1){if(e.target.name==='d'){if(f.d2.value<f.d.value)f.d2.value=f.d.value;f.d2.min=f.d.value;}chk();per.a='';per.b='';}});chk();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;if(step<3){go(step+1);return;}ok.classList.add('busy');setTimeout(()=>{const o2={s:f.s.value,d:f.d.value,d2:f.d2.value>f.d.value?f.d2.value:'',f:f.f.value,t:f.t.value,p:+f.p.value,who:f.who.value,why:f.why.value.trim()};
  let rv;if(edit){const prevWho=edit.who;(edit.hist=edit.hist||[]).push({t:'Reserva remarcada ou editada'+(prevWho!==o2.who?' · solicitante trocado':''),d:NOWD,by:'Você'});Object.assign(edit,o2);rv=edit;rv._pw=prevWho;for(let i=LOANS.length-1;i>=0;i--)if(LOANS[i].rv===edit.id)LOANS.splice(i,1);}else{rv=RV(o2.s,o2.d,o2.f,o2.t,o2.p,o2.who,o2.why);rv.d2=o2.d2;rv.d0=NOWD;RESERVAS.push(rv);}
  Object.entries(pick).filter(x=>x[1]>0).forEach(([id,q])=>{const l=LN(id,q,o2.who,per.a||o2.d,per.b||per.a||o2.d);l.rv=rv.id;l.st='pend';l.asked=NOWD;l.note='Reserva · '+slById(o2.s).n;LOANS.unshift(l);});
  S.rvDay=o2.d;if(o2.d<S.rvWk||o2.d>addD(S.rvWk,6))S.rvWk=o2.d;closeDlg();render();const ni=Object.values(pick).reduce((a,b)=>a+b,0);toast(edit?(rv._pw&&rv._pw!==o2.who?`Reserva atualizada · ${rv._pw.split(' ')[0]} e ${o2.who.split(' ')[0]} foram avisados`:`Reserva atualizada · ${o2.who.split(' ')[0]} foi avisado(a)`):`Reserva confirmada · ${slById(o2.s).n}, ${hm(o2.f)}–${hm(o2.t)}${ni?` · ${ni} ${ni>1?'itens enviados':'item enviado'} para aprovação`:''}`);},650);});
}

/* ---------- Salas ---------- */
function slPage(){
 const act=ESPS.filter(s=>s.act),off=ESPS.filter(s=>!s.act),wk=[...Array(7)].map((_,i)=>addD(NOWD,i));
 const wkN=s=>RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&wk.some(x=>rvTouch(r,x))).length,top=act.slice().sort((a,b)=>wkN(b)-wkN(a))[0];
 return `<header class="ph rise"><div><p class="eb">Espaços</p><h1>Salas</h1><p class="lede">Os espaços da igreja que podem ser reservados</p></div><div class="pact"><button class="btn pri" data-a="slNew">${ic('plus',15,2.2)}Adicionar sala</button></div></header>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Salas ativas</span><span class="kv">${act.length}</span><span class="kd">${off.length?`${off.length} desativada${off.length===1?'':'s'}`:'todas disponíveis'}</span></div>
  <div class="k4"><span class="kl">Capacidade total</span><span class="kv">${act.reduce((a,s)=>a+s.cap,0)}</span><span class="kd">lugares nas salas ativas</span></div>
  <div class="k4"><span class="kl">Reservas nos próximos 7 dias</span><span class="kv">${act.reduce((a,s)=>a+wkN(s),0)}</span><span class="kd">sem contar os cultos</span></div>
  <div class="k4"><span class="kl">Mais procurada</span><span class="kv sp-kvt">${esc(top.n)}</span><span class="kd">${wkN(top)} reservas na semana</span></div></section>
 <div class="sp-grid rise" style="--d:2">${act.map(s=>slCard(s,wk)).join('')}<button class="sp-add" data-a="slNew"><span>${ic('plus',20,2)}</span><b>Adicionar sala</b><small>Capacidade, local e recursos</small></button></div>
 ${off.length?`<section class="card sp-off rise" style="--d:3"><div class="sh"><h2>Desativadas</h2><span class="who">Não aparecem para reserva</span></div>${off.map(s=>`<div class="sp-or"><span class="htile" style="--s:34px;background:var(--surface-2);color:var(--ink-soft)">${ic(s.icon,16)}</span><span class="dkt"><b>${esc(s.n)}</b><span>${s.cap} lugares · ${esc(s.loc)}${s.desc?' · '+esc(s.desc):''}</span></span><button class="btn sec sm" data-a="slOn" data-v="${s.id}">Reativar</button></div>`).join('')}</section>`:''}`;
}
function slCard(s,wk){
 const nx=RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&!rvPast(r)).sort((a,b)=>a.d+a.f<b.d+b.f?-1:1)[0];
 const fx=s.uso.length?[...new Set(s.uso.map(u=>u.l))].join(', '):'';
 return `<article class="card sp-c"><header><span class="htile" style="--s:42px;background:var(--tone-${s.tone});color:var(--tone-${s.tone}-ink)">${ic(s.icon,20)}</span><button class="dkt sp-open" data-a="slOpen" data-v="${s.id}"><b>${esc(s.n)}</b><span>${ic('pin',12)}${esc(s.loc)}</span></button>
  <div style="position:relative"><button class="ibtn sm" data-a="slMenu" data-v="${s.id}" aria-label="Ações">${ic('dots',16)}</button><div class="pop" id="slPop-${s.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="slEdit" data-v="${s.id}">${ic('sliders',16)}Editar sala</button><button class="pi" data-a="slFix" data-v="${s.id}">${ic('lock',16)}Uso fixo</button><button class="pi" data-a="slRes" data-v="${s.id}">${ic('calendar',16)}Ver reservas</button><button class="pi" data-a="slHistO" data-v="${s.id}">${ic('clock',16)}Histórico</button><hr><button class="pi danger" data-a="slOff" data-v="${s.id}">${ic('x',16)}Desativar</button></div></div></header>
  <div class="sp-cap2"><b>${s.cap}</b><span>lugares</span></div>
  ${s.desc?`<p class="sp-desc">${esc(s.desc)}</p>`:''}
  ${s.rec.length?`<div class="sp-recs">${s.rec.map(k=>{const r=recOf(s,k);return r?`<span title="${esc(r[1])}">${ic(r[2],13)}${esc(r[1])}</span>`:'';}).join('')}</div>`:''}
  <div class="sp-wkb"><p class="fl">Próximos 7 dias <b>${(()=>{const h=wk.reduce((a,d)=>a+hrs(s.id,d),0);return h?(Math.round(h*10)/10).toString().replace('.',',')+'h em uso':'livre a semana toda';})()}</b></p><div>${wk.map(d=>{const h=hrs(s.id,d);return `<span title="${wd(d)} ${+d.slice(8)} · ${h?String(Math.round(h*10)/10).replace('.',',')+'h em uso':'livre'}"><i style="height:${h?Math.max(10,Math.min(1,h/6)*100):4}%" class="${h>=3?'hi':''} ${h?'':'z'}"></i><small>${wd(d)}</small></span>`;}).join('')}</div>${fx?`<span class="hint">${ic('lock',11)}Uso fixo: ${esc(fx)}</span>`:''}</div>
  <footer>${nx?`<span class="sp-nx"><small>Próxima</small>${wd(nx.d)} ${+nx.d.slice(8)} · ${hm(nx.f)} · ${esc(nx.why)}</span>`:'<span class="sp-nx"><small>Próxima</small>Nenhuma reserva</span>'}<button class="btn sec sm" data-a="slBook" data-v="${s.id}">Reservar</button></footer></article>`;
}
/* ---------- Sala: página própria (Dados · Uso fixo · Reservas) ---------- */
const SL_TABS=[['dados','Dados'],['uso','Uso fixo'],['res','Reservas'],['hist','Histórico']];
function slDetail(){const isNew=S.sala==='new',s=isNew?null:slById(S.sala);if(!isNew&&!s){S.sala=null;return slPage();}
 const t=isNew?'dados':(S.slTab||'dados'),fut=s?RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&!rvPast(r)).length:0;
 return `<nav class="crumb rise" aria-label="Você está em"><span class="soft">Espaços</span>${ic('chevR',13,2)}<button class="lnk back" data-a="slBack">Salas</button>${ic('chevR',13,2)}<span>${isNew?'Nova sala':esc(s.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${isNew?`<span class="htile" style="--s:56px;background:var(--brand-soft);color:var(--brand-text)">${ic('building',24)}</span>`:`<span class="htile" style="--s:56px;background:var(--tone-${s.tone});color:var(--tone-${s.tone}-ink)">${ic(s.icon,24)}</span>`}
   <div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${isNew?'Nova sala':esc(s.n)}</h1>${s?(s.act?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Disponível</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Desativada</span>'):''}</div>
   <p>${isNew?'Preencha os dados. Depois você define o uso fixo e acompanha as reservas.':`${s.cap} lugares${s.loc&&s.loc!=='—'?' · '+esc(s.loc):''} · ${s.uso.length} uso${s.uso.length===1?'':'s'} fixo${s.uso.length===1?'':'s'} · ${fut} reserva${fut===1?'':'s'} futura${fut===1?'':'s'}`}</p></div></div>
  ${s?`<div class="pact"><button class="btn sec" data-a="slBook" data-v="${s.id}">${ic('calendar',15)}Reservar</button><div style="position:relative"><button class="ibtn" data-a="slDMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="slDPop" style="right:0;top:calc(100% + 6px)">${s.act?`<button class="pi danger" data-a="slOff" data-v="${s.id}">${ic('x',17)}Desativar sala</button>`:`<button class="pi" data-a="slOn" data-v="${s.id}">${ic('check',17)}Reativar sala</button>`}</div></div></div>`:''}
  <div class="ptabs" role="tablist">${SL_TABS.map(x=>`<button role="tab" class="${t===x[0]?'on':''}" aria-selected="${t===x[0]}" ${isNew&&x[0]!=='dados'?'disabled title="Salve a sala primeiro"':''} data-a="slTab" data-v="${x[0]}">${x[1]}${s&&x[0]==='uso'&&s.uso.length?`<small>${s.uso.length}</small>`:''}${s&&x[0]==='res'&&fut?`<small>${fut}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${t==='uso'?slUso(s):t==='res'?slCal(s):t==='hist'?slHist(s):slDados(s)}</div>`;}

function slDados(s){const v=s||{n:'',cap:'',loc:'',desc:'',rec:[],custom:[]},cust=(S.slCust||v.custom||[]);
 return `<form id="slF" class="sl-form" novalidate>
  <section class="card pc"><div class="sh"><div><h2>Informações</h2><p class="who" style="margin:4px 0 0">O que aparece para quem reserva.</p></div></div>
   <div class="fgrid sl-g">
    <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(v.n)}" placeholder="Ex.: Sala de Reuniões A" autocomplete="off"><span class="err"></span></label>
    <label class="fld"><span class="fl">Capacidade</span><span class="sp-unit"><input type="number" name="cap" min="1" inputmode="numeric" value="${v.cap}" placeholder="0"><em>pessoas</em></span><span class="err"></span></label>
    <label class="fld"><span class="fl">Localização <small>opcional</small></span><input name="loc" value="${esc(v.loc==='—'?'':v.loc)}" placeholder="Ex.: 1º andar" autocomplete="off"></label>
    <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="3" placeholder="Regras de uso, observações…">${esc(v.desc)}</textarea></label>
   </div></section>
  <section class="card pc"><div class="sh"><div><h2>Características</h2><p class="who" style="margin:4px 0 0">Marque o que a sala tem. Se faltar alguma, crie uma característica só desta sala. Não são itens do almoxarifado e não se emprestam.</p></div></div>
   <div class="sp-rpick sl-recs">${RECS.map(r=>`<label><input type="checkbox" name="rec" value="${r[0]}" ${v.rec.includes(r[0])?'checked':''}><span>${ic(r[2],14)}${r[1]}</span></label>`).join('')}${cust.map(c=>`<label class="cust"><input type="checkbox" name="rec" value="${c.k}" ${v.rec.includes(c.k)||c.fresh?'checked':''}><span>${ic('tag',14)}${esc(c.n)}<button type="button" class="sl-cx" data-a="slCustRm" data-v="${c.k}" aria-label="Remover ${esc(c.n)}">${ic('x',11,2.4)}</button></span></label>`).join('')}</div>
   <div class="sl-cadd"><label class="sbox"><span class="sl-plus">${ic('plus',15,2.2)}</span><input id="slCustN" placeholder="Nova característica, ex.: Bebedouro" maxlength="28" autocomplete="off"></label><button type="button" class="btn sec" data-a="slCustAdd">Adicionar característica</button></div>
   <span class="err" id="slCustErr"></span></section>
  <div class="sl-bar"><span class="who" id="slSt">${s?'Nenhuma alteração':'Preencha nome e capacidade'}</span><span class="row2">${s?'':`<button type="button" class="btn sec" data-a="slBack">Cancelar</button>`}<button type="submit" class="btn pri" id="slOk" disabled>${s?'Salvar alterações':'Criar sala'}</button></span></div>
 </form>`;}

const slLog=(s,t)=>{(s.hist=s.hist||[]).push({t,d:NOWD,by:'Você'});};
function slHist(s){const l=(s.hist||[]).map((e,i)=>({...e,i})).sort((a,b)=>a.d===b.d?b.i-a.i:(a.d<b.d?1:-1));
 return `<section class="card pc"><div class="sh"><h2>Histórico</h2><span class="who">Tudo o que aconteceu com esta sala</span></div>${l.length?`<div class="clist">${l.map(e=>`<div class="dk sl-dk"><span class="sl-h"><b>${dBR(e.d).slice(0,5)}</b><small>${e.d.slice(0,4)}</small></span><span class="dkt"><b>${esc(e.t)}</b><span>${esc(e.by)}</span></span></div>`).join('')}</div>`:'<p class="who">Sem registros.</p>'}</section>`;}
/* Uso fixo */
function ufForm(u){const v=u||{l:'',f:'19:30',t:'21:30',rec:'semanal',days:[3],mode:'semana',date:NOWD,from:NOWD,to:''},show=x=>x?'':'hidden';
 return `<section class="card pc sec editing uf-ed" id="ufEd"><div class="sh"><h2>${u?'Editar uso fixo':'Novo uso fixo'}</h2></div>
  <form id="ufF" class="fgrid uf-g" novalidate>
   <label class="fld wide"><span class="fl">Nome do uso</span><input name="l" value="${esc(v.l)}" placeholder="Ex.: Culto de quarta" maxlength="40" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Início</span><input type="time" name="f" value="${v.f}" step="900"></label>
   <label class="fld"><span class="fl">Término</span><input type="time" name="t" value="${v.t}" step="900"><span class="err"></span></label>
   <div class="fld wide"><span class="fl">Recorrência</span><div class="sp-why">${REC_L.map(r=>`<label><input type="radio" name="rec" value="${r[0]}" ${v.rec===r[0]?'checked':''}><span>${r[1]}</span></label>`).join('')}</div></div>
   <div class="fld wide" data-show="dias" ${show(['semanal','quinzenal'].includes(v.rec))}><span class="fl">Dia da semana</span><div class="sp-rpick uf-days">${DOWS.map((d,i)=>`<label><input type="radio" name="days" value="${i}" ${v.days.includes(i)?'checked':''}><span>${d}</span></label>`).join('')}</div><span class="err"></span></div>
   <label class="fld" data-show="date" ${show(['unico','mensal','anual'].includes(v.rec))}><span class="fl" id="ufDateL">${v.rec==='unico'?'Data':'Data de referência'}</span><input type="date" name="date" value="${v.date||NOWD}"><span class="hint" id="ufDateH">${v.rec==='unico'?'O dia em que a sala fica ocupada.':'A primeira ocorrência. Dela saem o dia do mês e o dia da semana.'}</span></label>
   <div class="fld" data-show="mode" ${show(['mensal','anual'].includes(v.rec))}><span class="fl">Repetir pelo</span><div class="yn uf-mode"><label><input type="radio" name="mode" value="dia" ${v.mode==='dia'?'checked':''}><span id="ufModeD">Dia fixo</span></label><label><input type="radio" name="mode" value="semana" ${v.mode!=='dia'?'checked':''}><span id="ufModeS">Dia da semana</span></label></div></div>
   <div class="fld wide uf-vig"><span class="fl">Vigência</span><div class="uf-vg"><label class="fld"><span class="fl">Começa em</span><input type="date" name="from" value="${v.from}"></label><label class="fld"><span class="fl">Termina em</span><input type="date" name="to" value="${v.to}" ${v.to?'':'disabled'}><span class="err"></span></label><label class="tog uf-noend"><input type="checkbox" name="noend" ${v.to?'':'checked'}><span class="sw"></span><span>Sem data final</span></label></div></div>
   <div class="wide uf-prev" id="ufPrev"></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="ufCancel">Cancelar</button><button type="submit" class="btn pri" id="ufOk">${u?'Salvar uso fixo':'Adicionar uso fixo'}</button></div>
  </form></section>`;}
function slUso(s){const ed=S.uEd,fl=S.ufF||'vig',isEnd=u=>u.to&&u.to<NOWD,list=s.uso.slice().filter(u=>fl==='todos'||(fl==='venc'?isEnd(u):!isEnd(u))).sort((a,b)=>(ruleNext(a,1)[0]||'9')<(ruleNext(b,1)[0]||'9')?-1:1);
 return `<div class="uf-wrap">
  <div class="uf-head"><p class="who" style="margin:0">Horários em que a sala fica bloqueada para reserva, como cultos e encontros recorrentes. Valem dentro da vigência de cada um.</p>${ed||!list.length?'':`<button class="btn pri" data-a="ufNew">${ic('plus',15,2.2)}Adicionar uso fixo</button>`}</div>
  ${ed?'':`<div class="chips">${[['vig','Vigentes'],['venc','Vencidos'],['todos','Todos']].map(c=>`<button class="chipf ${fl===c[0]?'on':''}" data-a="ufF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div>`}
  ${ed==='new'?ufForm():''}
  ${list.length?list.map(u=>ed===u.id?ufForm(u):ufCard(u)).join(''):ed?'':`<section class="card pc"><div class="soft-empty"><p>Nenhum uso fixo.</p><span class="who">A sala fica livre para reserva em qualquer horário.</span><button class="btn pri" data-a="ufNew">${ic('plus',15,2.2)}Adicionar uso fixo</button></div></section>`}
 </div>`;}
function ufCard(u){const nx=ruleNext(u,4),ended=u.to&&u.to<NOWD;
 return `<article class="card pc uf-c ${ended?'off':''}"><div class="uf-l"><span class="uf-time"><b>${hm(u.f)}</b><small>${hm(u.t)}</small></span><div class="uf-b"><b>${esc(u.l)}</b><span>${ruleTxt(u)}</span><span class="uf-meta"><span class="uf-tag">${REC_L.find(r=>r[0]===u.rec)[1]}</span>${ic('calendar',12)}${vigTxt(u)}</span></div></div>
  <div class="uf-r"><div class="uf-nx">${ended?'<span class="soft">Vigência encerrada</span>':nx.length?`<small>Próximas</small>${nx.map(d=>`<span>${dNx(d)}</span>`).join('')}`:'<span class="soft">Sem próximas datas</span>'}</div>
   <div class="row2"><button class="btn sec sm" data-a="ufEdit" data-v="${u.id}">${ic('pen',14)}Editar</button><button class="ibtn sm uf-del" data-a="ufDel" data-v="${u.id}" aria-label="Excluir uso fixo">${ic('x',14,2)}</button></div></div></article>`;}
function ufRead(f){const g=n=>f.querySelector(`[name=${n}]`);return {l:g('l').value.trim(),f:g('f').value,t:g('t').value,rec:f.querySelector('[name=rec]:checked').value,days:[...f.querySelectorAll('[name=days]:checked')].map(x=>+x.value),mode:(f.querySelector('[name=mode]:checked')||{}).value||'semana',date:g('date').value,from:g('from').value||NOWD,to:g('noend').checked?'':g('to').value};}

/* Reservas da sala: calendário do mês */
function slCal(s){const ym=S.slM||NOWD.slice(0,7),[y,m]=ym.split('-').map(Number),days=new Date(y,m,0).getDate(),off=new Date(y,m-1,1).getDay();
 const iso=d=>`${ym}-${String(d).padStart(2,'0')}`,sel=S.slSel&&S.slSel.startsWith(ym)?S.slSel:null;
 const resOn=d=>RESERVAS.filter(r=>r.s===s.id&&rvTouch(r,d)&&r.st==='confirmada'),fixOn=d=>s.uso.filter(u=>ruleOn(u,d));
 const cells=[];for(let i=0;i<off;i++)cells.push('<span class="cd0"></span>');
 for(let d=1;d<=days;d++){const k=iso(d),rs=resOn(k),fx=fixOn(k),all=[...fx.map(u=>({t:u.l,f:1,h:u.f})),...rs.map(r=>({t:r.why||'Reserva',h:r.f}))].sort((a,b)=>a.h<b.h?-1:1);
  cells.push(`<button class="cdy ${k===NOWD?'today':''} ${sel===k?'sel':''} ${k<NOWD?'past':''}" data-a="slDay" data-v="${k}"><span class="cn">${d}</span>${all.slice(0,2).map(e=>`<span class="cev ${e.f?'fx':''}" style="--t:var(--tone-${e.f?'salvia':'ceu'});--ti:var(--tone-${e.f?'salvia':'ceu'}-ink)">${esc(e.t)}</span>`).join('')}${all.length>2?`<span class="cmore">+${all.length-2}</span>`:''}</button>`);}
 const d0=sel||null,items=d0?[...fixOn(d0).map(u=>({h:u.f,e:u.t,t:u.l,sub:'Uso fixo · '+ruleTxt(u),fx:1})),...resOn(d0).map(r=>({h:r.f,e:r.t,t:r.why||'Reserva',sub:`${r.who} · ${r.p} pessoas`,id:r.id}))].sort((a,b)=>a.h<b.h?-1:1)
  :RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&r.d.startsWith(ym)).sort((a,b)=>a.d+a.f<b.d+b.f?-1:1).map(r=>({d:r.d,h:r.f,e:r.t,t:r.why||'Reserva',sub:`${r.who} · ${r.p} pessoas`,id:r.id}));
 return `<div class="calw"><section class="card pc cal"><div class="sh"><h2>${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} ${y}</h2><div class="row2"><button class="ibtn sm" data-a="slM" data-v="-1" aria-label="Mês anterior">${ic('chevL',15,2)}</button><button class="btn sec sm" data-a="slM" data-v="0">Hoje</button><button class="ibtn sm" data-a="slM" data-v="1" aria-label="Próximo mês">${ic('chevR',15,2)}</button></div></div>
  <div class="cgrid">${DOWS.map(x=>`<span class="cwd">${x}</span>`).join('')}${cells.join('')}</div>
  <div class="cleg"><span><i class="lt" style="background:var(--tone-ceu)"></i>Reserva</span><span><i class="lt" style="background:var(--tone-salvia)"></i>Uso fixo</span></div></section>
  <section class="card pc"><div class="sh"><h2>${d0?`${wd(d0)}, ${fmtD(d0)}`:'Reservas no mês'}</h2>${d0?'<button class="lnk" data-a="slDay" data-v="">Ver o mês</button>':''}</div>
   ${items.length?`<div class="clist">${items.map(x=>`<${x.id?'button':'div'} class="dk sl-dk ${x.fx?'fx':''}" ${x.id?`data-a="rvView" data-v="${x.id}"`:''}>${x.d?dTile({d:x.d}):`<span class="sl-h"><b>${hm(x.h)}</b><small>${hm(x.e)}</small></span>`}<span class="dkt"><b>${esc(x.t)}</b><span>${x.d?`${hm(x.h)}–${hm(x.e)} · `:''}${esc(x.sub)}</span></span>${x.fx?`<span class="uf-tag">${ic('lock',11)}Fixo</span>`:''}</${x.id?'button':'div'}>`).join('')}</div>`:`<p class="who" style="margin:0">${d0?'Sala livre o dia todo.':'Nenhuma reserva neste mês.'}</p>`}
   ${s.act&&(!d0||d0>=NOWD)?`<button class="btn pri sl-book" data-a="slBookDay" data-v="${d0||''}">${ic('plus',15,2.2)}${d0?'Reservar neste dia':'Nova reserva'}</button>`:''}</section></div>`;}

function slAfter(){requestAnimationFrame(()=>typeof tabInd==='function'&&tabInd());
 const f=$('#slF');if(f){const s=S.sala==='new'?null:slById(S.sala),ok=$('#slOk'),st=$('#slSt');
  const snap=()=>JSON.stringify([f.n.value.trim(),f.cap.value,f.loc.value.trim(),f.desc.value.trim(),[...f.querySelectorAll('[name=rec]:checked')].map(x=>x.value).sort(),(S.slCust||[]).map(c=>c.n)]),orig=s?JSON.stringify([s.n,String(s.cap),s.loc==='—'?'':s.loc,s.desc,s.rec.slice().sort(),(s.custom||[]).map(c=>c.n)]):'';
  const upd=()=>{const valid=f.n.value.trim()&&+f.cap.value>0,dirty=!s||snap()!==orig;ok.disabled=!valid||!dirty;st.textContent=!valid?'Preencha nome e capacidade':dirty?(s?'Alterações não salvas':'Pronto para criar'):'Nenhuma alteração';st.classList.toggle('warn',!!s&&dirty);};
  f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');upd();});f.addEventListener('change',upd);upd();
  const ci=$('#slCustN');ci.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();A.slCustAdd();}});
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const n=f.n.value.trim();if(ESPS.some(x=>x!==s&&norm(x.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.parentElement.querySelector('.err').textContent='Já existe uma sala com esse nome';f.n.focus();return;}
   busy(ok,600,s?'Salvo':'Criada',()=>{const o={n,cap:+f.cap.value,loc:f.loc.value.trim()||'—',desc:f.desc.value.trim(),rec:[...f.querySelectorAll('[name=rec]:checked')].map(x=>x.value),custom:(S.slCust||[]).map(c=>({k:c.k,n:c.n}))};
    if(s){Object.assign(s,o);slLog(s,'Dados da sala alterados');S.slCust=null;slRe();toast('Sala atualizada');}
    else{const nw={id:'s'+Date.now(),act:true,tone:TONES[ESPS.length%6],icon:'building',uso:[],...o};ESPS.push(nw);S.sala=nw.id;S.slTab='uso';S.slCust=null;render();window.scrollTo({top:0});toast(`${n} criada · agora defina o uso fixo, se houver`);}});});
  if(!s)setTimeout(()=>f.n.focus(),80);}
 const uf=$('#ufF');if(uf){const s=slById(S.sala),edU=S.uEd==='new'?null:s.uso.find(x=>x.id===S.uEd);
  const paint=()=>{const v=ufRead(uf),show=(k,on)=>{const el=uf.querySelector(`[data-show=${k}]`);if(el)el.hidden=!on;};
   show('dias',['semanal','quinzenal'].includes(v.rec));show('date',['unico','mensal','anual'].includes(v.rec));show('mode',['mensal','anual'].includes(v.rec));
   $('#ufDateL').textContent=v.rec==='unico'?'Data':'Data de referência';$('#ufDateH').textContent=v.rec==='unico'?'O dia em que a sala fica ocupada.':'A primeira ocorrência. Dela saem o dia do mês e o dia da semana.';
   if(v.date){$('#ufModeD').textContent=`Dia fixo · ${+v.date.slice(8)}${v.rec==='anual'?'/'+v.date.slice(5,7):''}`;$('#ufModeS').textContent=`Dia da semana · ${ORD(nthOf(v.date))} ${DOWS[dow(v.date)]}`;}
   uf.to.disabled=uf.noend.checked;uf.querySelector('.uf-vig').hidden=v.rec==='unico';
   const tmp={...v,from:v.rec==='unico'?(v.date||NOWD):v.from,to:v.rec==='unico'?(v.date||''):v.to},nx=ruleNext(tmp,6);
   const cf=[];nx.forEach(d=>RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&!rvStarted(r)&&v.f&&v.t&&(d+'T'+v.f)<(rvEnd(r)+'T'+r.t)&&(d+'T'+v.t)>(r.d+'T'+r.f)).forEach(r=>cf.push(r)));
   $('#ufPrev').innerHTML=`<div class="uf-sum"><span class="uf-ic">${ic('lock',16)}</span><div><b>${v.l?esc(v.l)+' · ':''}${ruleTxt(tmp)}${v.f&&v.t?`, das ${hm(v.f)} às ${hm(v.t)}`:''}</b><span>${v.rec==='unico'?'Bloqueio de um dia só':vigTxt(tmp)}</span></div></div>
    ${nx.length?`<div class="uf-nx"><small>Próximas datas bloqueadas</small>${nx.map(d=>`<span>${dNx(d)}</span>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhuma data dentro da vigência.</p>'}
    ${cf.length?`<p class="uf-warn">${ic('alert',14,2)}Já existe${cf.length>1?'m':''} ${cf.length} reserva${cf.length>1?'s':''} nesses horários (${cf.slice(0,2).map(r=>`${wd(r.d)} ${+r.d.slice(8)}, ${esc(r.why||r.who)}`).join('; ')}). Ao salvar, você escolhe: voltar e ajustar ou cancelar essas reservas.</p>`:''}`;};
  uf.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');paint();});uf.addEventListener('change',paint);paint();setTimeout(()=>uf.l.focus(),60);
  uf.addEventListener('submit',e=>{e.preventDefault();const v=ufRead(uf),bad=(el,m)=>{const fl=el.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;el.focus&&el.focus();return false;};
   if(!v.l)return bad(uf.l,'Dê um nome, ex.: Culto de quarta');if(!v.f||!v.t||mm(v.t)<=mm(v.f))return bad(uf.t,'O término precisa ser depois do início');
   if(['semanal','quinzenal'].includes(v.rec)&&!v.days.length)return bad(uf.querySelector('[name=days]'),'Escolha o dia da semana');
   if(v.rec!=='unico'&&v.to&&v.to<v.from)return bad(uf.to,'Termina antes de começar');
   if(v.rec==='unico'){v.from=v.date;v.to=v.date;}else if(!['mensal','anual'].includes(v.rec))v.date='';
   const occD=ruleNext({...v},300);
   const fxC=s.uso.filter(u=>u!==edU).find(u=>occD.some(d=>ruleOn(u,d)&&mm(u.f)<mm(v.t)&&mm(u.t)>mm(v.f)));
   if(fxC)return bad(uf.t,`Conflita com outro uso fixo: ${fxC.l}`);
   const cfl=RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&!rvStarted(r)&&occD.some(d=>(d+'T'+v.f)<(rvEnd(r)+'T'+r.t)&&(d+'T'+v.t)>(r.d+'T'+r.f)));
   const save=can=>busy($('#ufOk'),600,'Salvo',()=>{can.forEach(r=>{r.st='cancelada';r.reason='Substituída por uso fixo';r.dc=NOWD;for(let i=LOANS.length-1;i>=0;i--)if(LOANS[i].rv===r.id)LOANS.splice(i,1);});if(edU)Object.assign(edU,v);else s.uso.push(UF(v.l,v.f,v.t,v.rec,v));slLog(s,(edU?`Uso fixo editado: ${v.l}`:`Uso fixo criado: ${v.l}`)+(can.length?` · ${can.length} reserva${can.length>1?'s canceladas':' cancelada'}`:''));S.uEd=null;slRe();toast((edU?'Uso fixo atualizado':`${v.l} adicionado ao uso fixo`)+(can.length?` · ${can.length} reserva${can.length>1?'s canceladas':' cancelada'}`:''));});
   if(!cfl.length)return save([]);
   openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Há reservas nesses horários',`${cfl.length} reserva${cfl.length>1?'s futuras conflitam':' futura conflita'} com este uso fixo. O que você prefere?`)}</div>
    <div class="clist">${cfl.map(r=>`<div class="dk sl-dk">${dTile({d:r.d})}<span class="dkt"><b>${esc(r.why||'Reserva')}</b><span>${rvWhen(r)} · ${esc(r.who)}</span></span></div>`).join('')}</div>
    <p class="who" style="margin:12px 0 0">Se cancelar, os solicitantes são avisados e os itens do almoxarifado agendados são cancelados.</p>
    <div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar e ajustar</button><button class="btn dang" id="ufCx">Cancelar essas reservas e salvar</button></div>`,'sm del');
   $('#ufCx').addEventListener('click',()=>{closeDlg();save(cfl);});});}
}
const slRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
function spAfter(){
 const q=$('#rvq');if(q)q.addEventListener('input',e=>{S.rvq=e.target.value;const p=e.target.selectionStart;const y=window.scrollY;render();window.scrollTo(0,y);const n=$('#rvq');n.focus();n.setSelectionRange(p,p);});
 $$('.sp-trk').forEach(t=>t.addEventListener('click',e=>{if(e.target.closest('.sp-blk'))return;const r=t.getBoundingClientRect(),m=H0*60+Math.floor((e.clientX-r.left)/r.width*(H1-H0)*2)*30,sid=t.dataset.sala;
  const c=conflict(sid,S.rvDay,m,m+60);if(c&&c.fix){toast(`${slById(sid).n}: ${c.l} nesse horário`);return;}rvForm({s:sid,d:S.rvDay<NOWD?NOWD:S.rvDay,f:tt(m),t:tt(Math.min(m+60,H1*60-1))});}));
 const now=$('.sp-now');if(now){const w=$('.sp-tlw');if(w&&w.scrollWidth>w.clientWidth)w.scrollLeft=Math.max(0,now.offsetLeft-w.clientWidth/2);}
}
const spRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const SPA={
 rvNew:()=>rvForm(),
 rvDay:v=>{S.rvDay=v;spRe();},
 rvWk:v=>{S.rvWk=addD(S.rvWk,+v);S.rvDay=S.rvWk;spRe();},
 rvF:v=>{S.rvf=v;spRe();},
 rvSalaClr:()=>{S.rvSala=null;spRe();},
 rvView:v=>rvDlg(v),
 rvEdit:v=>rvForm({id:v}),
 rvCancel:v=>{const r=RESERVAS.find(x=>x.id===v),s=slById(r.s);if(r.ev){const e=eById(r.ev);toast(`Essa reserva é do evento ${e?e.t:''}. Para liberar a sala, mude o local no evento.`);return;}
  openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Cancelar esta reserva?',`${esc(s.n)} · ${wd(r.d)} ${+r.d.slice(8)}, ${hm(r.f)}–${hm(r.t)}. ${esc(r.who.split(' ')[0])} recebe um aviso.`)}</div>
   <div class="fld"><span class="fl">Motivo</span><div class="sp-why">${['Remarcado pelo solicitante','Sala indisponível','Evento cancelado','Outro'].map((m,i)=>`<label><input type="radio" name="cw" value="${m}" ${i?'':'checked'}><span>${m}</span></label>`).join('')}</div></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="cwOk">Cancelar reserva</button></div>`,'sm del');
  $('#cwOk').addEventListener('click',e=>{const why=$('[name=cw]:checked').value;e.target.classList.add('busy');setTimeout(()=>{const ls=LOANS.filter(l=>l.rv===r.id);ls.forEach(l=>LOANS.splice(LOANS.indexOf(l),1));r.st='cancelada';r.reason=why;r.dc=NOWD;closeDlg();spRe();toast(ls.length?'Reserva cancelada · itens liberados no almoxarifado':'Reserva cancelada');},600);});},
 slNew:()=>{S.sala='new';S.slTab='dados';S.slCust=[];render();window.scrollTo({top:0});},
 slEdit:v=>{closePops();S.sala=v;S.slTab='dados';S.slCust=(slById(v).custom||[]).map(c=>({...c}));render();window.scrollTo({top:0});},
 slOpen:v=>A.slEdit(v),
 slFix:v=>{closePops();A.slEdit(v);S.slTab='uso';render();},
 slBack:()=>{S.sala=null;S.uEd=null;S.slCust=null;render();window.scrollTo({top:0});},
 slTab:v=>{if(S.sala==='new')return;S.slTab=v;S.uEd=null;if(v==='dados')S.slCust=(slById(S.sala).custom||[]).map(c=>({...c}));slRe();},
 slDMenu:()=>{const p=$('#slDPop');closePops(p);p.classList.toggle('open');},
 slCustAdd:()=>{const i=$('#slCustN'),n=i.value.trim(),er=$('#slCustErr');er.style.display='';if(!n){i.focus();return;}
  const all=[...RECS.map(r=>r[1]),...(S.slCust||[]).map(c=>c.n)];if(all.some(x=>norm(x)===norm(n))){er.textContent='Essa característica já existe na lista';er.style.display='block';i.focus();return;}
  const f=$('#slF'),keep=[...f.querySelectorAll('[name=rec]:checked')].map(x=>x.value),vals={n:f.n.value,cap:f.cap.value,loc:f.loc.value,desc:f.desc.value};
  S.slCust=[...(S.slCust||[]),{k:'c'+Date.now(),n,fresh:1}];slRe();const g=$('#slF');Object.entries(vals).forEach(([k,v])=>g[k].value=v);g.querySelectorAll('[name=rec]').forEach(x=>{if(keep.includes(x.value))x.checked=true;});g.dispatchEvent(new Event('change'));$('#slCustN').focus();},
 slCustRm:(v,b,e)=>{e&&e.preventDefault();const f=$('#slF'),keep=[...f.querySelectorAll('[name=rec]:checked')].map(x=>x.value).filter(x=>x!==v),vals={n:f.n.value,cap:f.cap.value,loc:f.loc.value,desc:f.desc.value},c=S.slCust.find(x=>x.k===v);
  S.slCust=S.slCust.filter(x=>x.k!==v);slRe();const g=$('#slF');Object.entries(vals).forEach(([k,x])=>g[k].value=x);g.querySelectorAll('[name=rec]').forEach(x=>{x.checked=keep.includes(x.value);});g.dispatchEvent(new Event('change'));toast(`${c.n} removido · salve para confirmar`);},
 ufF:v=>{S.ufF=v;slRe();},
 ufNew:()=>{S.uEd='new';slRe();},
 ufEdit:v=>{S.uEd=v;slRe();},
 ufCancel:()=>{S.uEd=null;slRe();},
 ufDel:v=>{const s=slById(S.sala),u=s.uso.find(x=>x.id===v);confirmDel({title:`Excluir “${u.l}”?`,body:`${ruleTxt(u)}, das ${hm(u.f)} às ${hm(u.t)}. A sala volta a ficar livre para reserva nesses horários.`,label:'Excluir uso fixo',onConfirm:()=>{const i=s.uso.indexOf(u);s.uso.splice(i,1);slLog(s,`Uso fixo removido: ${u.l}`);slRe();toast('Uso fixo excluído',()=>{s.uso.splice(i,0,u);slRe();});}});},
 slM:v=>{const [y,m]=(S.slM||NOWD.slice(0,7)).split('-').map(Number),d=new Date(y,m-1+ +v,1);S.slM=+v===0?NOWD.slice(0,7):`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;S.slSel=+v===0?NOWD:null;slRe();},
 slDay:v=>{S.slSel=v||null;slRe();},
 slBookDay:v=>{const d=v&&v>=NOWD?v:NOWD;rvForm({s:S.sala,d});},
 slMenu:v=>{const p=$('#slPop-'+v);closePops(p);p.classList.toggle('open');},
 slRes:v=>{closePops();A.slEdit(v);S.slTab='res';render();},
 slHistO:v=>{closePops();A.slEdit(v);S.slTab='hist';render();},
 slBook:v=>rvForm({s:v,d:NOWD}),
 slOff:v=>{closePops();const s=slById(v),fut=RESERVAS.filter(r=>r.s===v&&r.st==='confirmada'&&!rvPast(r));
  confirmDel({title:`Desativar ${s.n}?`,body:fut.length?`Ela sai da lista de reservas. ${fut.length} reserva${fut.length===1?' futura será cancelada':'s futuras serão canceladas'} e os solicitantes recebem aviso.`:'Ela sai da lista de reservas. Você pode reativar quando quiser.',label:'Desativar',typed:fut.length?s.n:null,
   onConfirm:()=>{s.act=false;fut.forEach(r=>{r.st='cancelada';r.reason='Sala desativada';r.dc=NOWD;});slLog(s,`Sala desativada${fut.length?` · ${fut.length} reserva${fut.length>1?'s canceladas':' cancelada'}`:''}`);spRe();toast(`${s.n} desativada`);}});},
 slOn:v=>{const s=slById(v);s.act=true;slLog(s,'Sala reativada');spRe();toast(`${s.n} reativada`);},
};

