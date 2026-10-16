/* ================= Pessoas › Integração ================= */
/* generic destructive confirmation */
function confirmDel({title,body,label='Excluir',typed,onConfirm}){
 openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead(title,body)}</div>
  ${typed?`<label class="fld"><span class="fl">Para confirmar, digite <b>${esc(typed)}</b></span><input id="cdq" autocomplete="off"><span class="err"></span></label>`:''}
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn dang" id="cdok" ${typed?'disabled':''}>${label}</button></div>`,'sm del');
 const ok=$('#cdok');
 if(typed)$('#cdq').addEventListener('input',e=>{ok.disabled=norm(e.target.value.trim())!==norm(typed);});
 ok.addEventListener('click',()=>{ok.classList.add('busy');setTimeout(()=>{closeDlg();onConfirm();},650);});
 setTimeout(()=>(typed?$('#cdq'):$('.dlg .btn.sec'))?.focus(),80);
}

const POOL=['Aline Rocha','Bruna Tavares','Caio Almeida','Davi Monteiro','Érica Lopes','Fábio Nogueira','Gabriela Sá','Heitor Cunha','Isabela Freitas','João Vitor Reis','Karina Melo','Leonardo Paiva','Mariana Dias','Nathan Borges','Olívia Prado','Paula Serra','Rodrigo Leal','Sabrina Costa','Tiago Moraes','Úrsula Neves','Vinícius Lara','Yasmin Castro','Wesley Porto','Alice Fontes','Bernardo Vaz','Cecília Ramos','Diego Antunes','Elaine Moura','Felipe Brito','Giovana Lemos','Hugo Marins','Ingrid Sales','Júlia Arruda','Kevin Rocha','Luana Pires'];
const STEPS_DEF=[['Boas-vindas','Culto de domingo','calendar'],['Café com a liderança','Salão social','coffee'],['Fundamentos da fé','3 encontros','book'],['Batismo','Chácara Alva','sprout'],['Integração','Culto de celebração','check']];
const IST={pendente:['Pendente','var(--st-sol)','var(--st-sol-bg)'],aceito:['Aceito','var(--st-ace)','var(--st-ace-bg)'],andamento:['Em etapas','var(--ink-muted)','var(--surface-2)'],integrado:['Integrado','var(--st-int)','var(--st-int-bg)']};
let _iid=0;
function mkInteg(n,date,time,total,integ,o={}){
 const id='i'+(++_iid),ppl=[];
 const nA=o.aceitos??(total>integ?Math.min(1,total-integ):0),nP=o.pend??(total-integ-nA>0?1:0);
 for(let i=0;i<total;i++){const nm=POOL[(i+_iid*7)%POOL.length];const st=i<integ?'integrado':i<integ+nA?'aceito':i<integ+nA+nP?'pendente':'andamento';
  ppl.push({id:id+'p'+i,n:nm,tone:TONES[(i+_iid)%6],st,step:st==='integrado'?5:st==='andamento'?1+(i%3):st==='aceito'?1:0,ph:`(11) 9${String(8000+i*37).slice(0,4)}-${String(1000+i*91).slice(-4)}`});}
 return {id,n,date,time,limit:o.limit||'',link:o.link||'',resp:o.resp||'',contact:o.contact||'',current:!!o.current,active:!!o.active,ppl,steps:STEPS_DEF.map((s,i)=>({id:id+'s'+i,t:s[0],w:s[1],icon:s[2],date:o.stepDates?o.stepDates[i]:''}))};
}
const INTEGS=[
 mkInteg('Setembro/2026','2026-09-18','08:00',34,12,{current:true,active:true,limit:40,link:'https://chat.whatsapp.com/grupo-do-zap',resp:'m3',contact:'https://wa.me/5511987542201',stepDates:['2026-09-21','2026-09-28','2026-10-05','2026-10-18','2026-10-25']}),
 mkInteg('Agosto/2026','2026-08-18','08:00',28,21,{link:'https://chat.whatsapp.com/agosto',resp:'m10'}),
 mkInteg('Julho/2026','2026-07-18','08:00',19,19,{aceitos:0,pend:0,resp:'m12'}),
 mkInteg('Abril/2026','2026-04-17','08:00',25,23,{resp:'m10'}),
 mkInteg('Teste1','2026-04-23','08:00',3,0,{aceitos:0,pend:3}),
 mkInteg('Admin_teste','2026-04-17','08:00',1,0,{aceitos:0,pend:1}),
 mkInteg('Pietra B','2026-08-19','08:00',1,0,{aceitos:0,pend:1}),
];
/* regras da igreja para as integrações (valem como padrão; cada integração ainda pode mudar o seu limite) */
const INTR={max:30,prazo:3,aceite:'manual',cert:false};
/* fila de espera: lista da igreja (não de uma integração). Entra quem pede com a integração lotada, fora do prazo ou sem integração aberta; ordem de chegada */
const IGFILA=[['Mariana Teixeira','(11) 98811-2034','2026-09-12','lotada'],['Gustavo Lopes','(11) 97722-3410','2026-09-15','lotada'],['Paula Menezes','(11) 98123-9087','2026-09-22','prazo'],['Rogério Alves','(11) 99144-7755','2026-09-25','prazo'],['Tatiane Duarte','(11) 96655-2218','2026-09-28','sem']].map((x,i)=>({id:'f'+(i+1),n:x[0],ph:x[1],since:x[2],why:x[3],tone:TONES[i%6]}));
Object.assign(S,{igTop:'lista'});
Object.assign(S,{integ:null,itab:'det',iq:'',ifilter:'todas',iedit:null,imq:'',imf:'todos'});
const ibyId=id=>INTEGS.find(x=>x.id===id);
const icount=(g,st)=>g.ppl.filter(p=>p.st===st).length;
const iprog=g=>g.ppl.length?Math.round(icount(g,'integrado')/g.ppl.length*100):0;
const dBR=d=>{if(!d)return '';const [y,m,dd]=d.split('-');return `${dd}/${m}/${y}`;};
const dLong=d=>{if(!d)return '';const [y,m,dd]=d.split('-');return `${+dd} ${MONTHS[+m-1].slice(0,3)} ${y}`;};
const pAv=p=>`<span class="av" style="background:var(--tone-${p.tone});color:var(--tone-${p.tone}-ink)">${initials(p.n)}</span>`;
const iPill=g=>g.current?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Atual</span>`:`<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Encerrada</span>`;

/* ---------- list ---------- */
function integList(){
 const cur=INTEGS.find(g=>g.current);
 return `<header class="ph rise"><div><p class="eb">Pessoas</p><h1>Integração</h1><p class="lede">Fluxo de integração de novos membros</p><p class="who" style="margin:6px 0 0">${INTR.max?'Até '+INTR.max+' pessoas':'Sem limite de pessoas'} · pedidos até ${INTR.prazo} ${INTR.prazo===1?'dia':'dias'} antes do início · aceite ${INTR.aceite==='auto'?'automático':'manual'}${INTR.cert?' · com certificado':''}${IGFILA.length?' · '+IGFILA.length+' na fila de espera':''}</p></div>
  <div class="pact">${rpBtn('integracao','turmas')}<button class="btn sec" data-a="igRules">${ic('sliders',15)}Regras</button>
   <button class="btn pri" data-a="addInteg">${ic('plus',15,2.2)}Nova integração</button></div></header>
 ${cur?`<button class="card icur rise" style="--d:1" data-a="openInteg" data-v="${cur.id}">
   <div class="ic1"><span class="eb" style="margin:0">Integração atual</span><b>${cur.n}</b><span class="who">Começou em ${dLong(cur.date)} · ${cur.ppl.length}${cur.limit?' de '+cur.limit:''} pessoas</span></div>
   <div class="ic2">${ibar(cur)}</div>
   <div class="ic3"><span class="big">${iprog(cur)}<small>%</small></span><span class="who">integrados</span></div>
  </button>`:''}
 <section class="card mtab rise" style="--d:2" aria-label="Integrações">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="iq" placeholder="Pesquisar integração" value="${esc(S.iq)}" autocomplete="off"></label>
   <div class="chips" role="tablist">${[['todas','Todas',INTEGS.length],['ativa','Atual',INTEGS.filter(g=>g.current).length],['inativa','Encerradas',INTEGS.filter(g=>!g.current).length]].map(c=>`<button role="tab" class="chipf ${S.ifilter===c[0]?'on':''}" data-a="ifilter" data-v="${c[0]}" aria-selected="${S.ifilter===c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="irows">${irows()}</div>
 </section>`;
}
/* ---------- fila de espera ---------- */
const IGWHY={lotada:['Integração lotada','var(--st-sol)','var(--st-sol-bg)'],prazo:['Fora do prazo','var(--st-ace)','var(--st-ace-bg)'],sem:['Sem integração aberta','var(--ink-muted)','var(--surface-2)']};
function igFree(){const cur=INTEGS.find(g=>g.current);return !cur?0:cur.limit?Math.max(0,+cur.limit-cur.ppl.length):Infinity;}
function igCallIds(ids){const cur=INTEGS.find(g=>g.current);if(!cur)return 0;let k=0;
 for(const id of ids){if(igFree()<=0)break;const i=IGFILA.findIndex(x=>x.id===id);if(i<0)continue;const p=IGFILA.splice(i,1)[0];cur.ppl.push({id:cur.id+'q'+p.id,n:p.n,tone:p.tone,st:'aceito',step:1,ph:p.ph});k++;}return k;}
function igFila(){
 const cur=INTEGS.find(g=>g.current),free=igFree(),n=Math.min(IGFILA.length,free===Infinity?IGFILA.length:free);
 const info=!cur?'Não há integração aberta. Crie uma integração para chamar a fila.':free===Infinity?`${esc(cur.n)} está aberta, sem limite de vagas.`:free>0?`${esc(cur.n)} tem ${free} ${free===1?'vaga livre':'vagas livres'}.`:`${esc(cur.n)} está lotada. Aumente o limite ou espere a próxima integração.`;
 return `<section class="card sx-list rise" style="--d:2" aria-label="Fila de espera"><div class="sx-bar"><span class="who" style="margin:0;display:inline-flex;align-items:center;gap:6px">${ic('info',14,2)}${info}</span>${n>0?`<button class="btn pri sm" data-a="igCallN">${ic('userplus',14)}Chamar os próximos ${n}</button>`:''}</div>
  ${IGFILA.length?IGFILA.map((p,i)=>`<div class="sx-r static"><span class="sx-ti" style="font:700 15px/1 var(--font-display)">${i+1}º</span><span class="sx-m"><b>${esc(p.n)}</b><small>${esc(p.ph)} · na fila desde ${dBR(p.since)}</small></span><span class="sx-c">${sxPill(IGWHY[p.why][0],IGWHY[p.why][1],IGWHY[p.why][2])}</span><span class="sx-s"></span><span class="sx-ch"><button class="btn sec sm" data-a="igCall" data-v="${p.id}" ${free>0?'':'disabled'} title="${free>0?'':'Sem vaga na integração atual'}">Chamar</button><button class="ibtn sm" data-a="igRm" data-v="${p.id}" aria-label="Remover da fila" title="Remover da fila">${ic('x',15)}</button></span></div>`).join(''):`<div class="mempty"><p>Ninguém na fila.</p><span>Quando uma integração lotar ou não houver uma aberta, quem pedir entra aqui.</span></div>`}
  <p class="sx-priv">${ic('info',13,2)} A fila é da igreja, não de uma integração. Entra quem pede com a integração lotada, fora do prazo (${INTR.prazo} ${INTR.prazo===1?'dia':'dias'} antes do início) ou sem integração aberta, por ordem de chegada. Chamar aceita a pessoa na integração atual e avisa no app${INTR.aceite==='auto'?'; com o aceite automático, a fila é chamada sozinha quando uma integração abre':''}.</p></section>`;
}
{const _il=integList;integList=function(){
 const h=_il(),i=h.indexOf('<section class="card mtab rise" style="--d:2" aria-label="Integrações">');
 /* abas depois do card de status, como em Discipulado */
 const tabs=`<div class="utabs rise" style="--d:2;margin-top:16px" role="tablist">${[['lista','Integrações',0],['fila','Fila de espera',IGFILA.length]].map(t=>`<button role="tab" class="${S.igTop===t[0]?'on':''}" aria-selected="${S.igTop===t[0]}" data-a="igTop" data-v="${t[0]}">${t[1]}${t[2]?`<span class="bdg">${t[2]}</span>`:''}</button>`).join('')}</div>`;
 if(i<0)return h;
 return S.igTop==='fila'?h.slice(0,i)+tabs+igFila():h.slice(0,i)+tabs+h.slice(i);};}
function ibar(g,noLeg){const t=g.ppl.length||1,seg=[['integrado',icount(g,'integrado')],['andamento',icount(g,'andamento')],['aceito',icount(g,'aceito')],['pendente',icount(g,'pendente')]];
 return `<div class="ibar">${seg.map(s=>s[1]?`<i style="flex-grow:${s[1]};background:${s[0]==='andamento'?'var(--seq2)':IST[s[0]][1]}" title="${IST[s[0]][0]}: ${s[1]}"></i>`:'').join('')}</div>${noLeg?`<div class="ileg"><span><i style="background:var(--seq2)"></i>Em etapas <b>${icount(g,'andamento')}</b></span><span class="soft">· ${iprog(g)}% concluído</span></div>`:''}${noLeg?'':`
 <div class="ileg">${seg.filter(s=>s[1]).map(s=>`<span><i style="background:${s[0]==='andamento'?'var(--seq2)':IST[s[0]][1]}"></i>${IST[s[0]][0]} <b>${s[1]}</b></span>`).join('')}</div>`}`;}
function irows(){
 const q=norm(S.iq);const list=INTEGS.filter(g=>(S.ifilter==='todas'||(S.ifilter==='ativa')===g.current)&&(!q||norm(g.n).includes(q)));
 if(!list.length)return `<div class="mempty"><p>Nada encontrado.</p><span>Nenhuma integração corresponde a esses filtros.</span></div>`;
 return `<div class="trow ig thead"><span>Nome</span><span>Data</span><span>Membros</span><span>Integrados</span><span>Progresso</span><span>Status</span><span></span></div>
 ${list.map(g=>{const p=iprog(g);return `<div class="trow ig" tabindex="0" data-a="openInteg" data-v="${g.id}">
  <span class="tn"><b>${esc(g.n)}</b></span><span class="idt">${dBR(g.date)} <span class="soft">às ${g.time.replace(':00','h').replace(/^0/,'')}</span></span>
  <span class="inum"><b>${g.ppl.length}</b>${g.limit?`<span class="soft">/${g.limit}</span>`:''}<em> membros</em></span><span class="inum"><b>${icount(g,'integrado')}</b><em> integrados</em></span>
  <span class="ipg"><span class="tr"><i style="width:${p}%;${p===100?'background:var(--st-int)':''}"></i></span><b>${p}%</b></span>
  <span class="ts">${iPill(g)}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
 <div class="tfoot"><span>Mostrando ${list.length} de ${INTEGS.length}</span></div>`;
}

/* ---------- detail ---------- */
const ITABS=[['det','Detalhes'],['etapas','Etapas'],['membros','Membros']];
function integDetail(){
 const g=ibyId(S.integ);if(!g){S.integ=null;return integList();}
 const t=g.ppl.length;
 return `<nav class="crumb rise"><span class="soft">Pessoas</span>${ic('chevR',13,2)}<button class="lnk back" data-a="backInteg">Integração</button>${ic('chevR',13,2)}<span>${esc(g.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid"><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(g.n)}</h1>${iPill(g)}</div><p>Iniciada em ${dBR(g.date)} às ${g.time.replace(':00','h').replace(/^0/,'')} · ${t} ${t===1?'membro':'membros'}${g.limit?' de '+g.limit:''}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="resend">${ic('mail',15)}Reenviar e-mail</button>${rpBtn('integracao','pessoas')}
   <div style="position:relative"><button class="ibtn" data-a="igMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="igPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="delInteg">${ic('x',17)}Excluir integração</button></div></div></div>
  <div class="ikpi">
   <div><b>${t}</b><span>Total</span></div><div><b>${icount(g,'integrado')}</b><span>Integrados</span></div><div><b>${icount(g,'aceito')}</b><span>Aceitos</span></div><div><b>${icount(g,'pendente')}</b><span>Pendentes</span></div>
   <div class="ikbar">${ibar(g,1)}</div>
  </div>
  <div class="ptabs" role="tablist">${ITABS.map(x=>`<button role="tab" class="${S.itab===x[0]?'on':''}" aria-selected="${S.itab===x[0]}" data-a="itab" data-v="${x[0]}">${x[1]}${x[0]==='membros'?`<small>${t}</small>`:x[0]==='etapas'?`<small>${g.steps.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="itabBody" class="rise" style="--d:2">${itabBody(g)}</div>`;
}
function itabBody(g){return ({det:iDet,etapas:iSteps,membros:iMembers})[S.itab](g);}
const ISECS={
 info:{t:'Informações',f:[['n','Nome da integração','text'],['date','Data de início','date'],['time','Horário','time'],['limit','Limite de membros','number','Deixe vazio para sem limite']]},
 wa:{t:'Comunicação via WhatsApp',f:[['link','Link do grupo','url'],['resp','Responsável','person'],['contact','Contato do responsável','url']]},
};
function iVal(g,f){const v=g[f[0]];if(f[0]==='date')return v?dLong(v):'';if(f[0]==='time')return v?v.replace(':00','h').replace(/^0/,''):'';if(f[0]==='resp')return v&&byId(v)?byId(v).n:'';if(f[0]==='limit')return v?v+' pessoas':'Sem limite';return v;}
function iDet(g){
 return `<div class="dgrid">${Object.keys(ISECS).map(k=>{const s=ISECS[k],ed=S.iedit===k;return `<section class="card pc sec ${ed?'editing':''}" id="isec-${k}"><div class="sh"><h2>${s.t}</h2>${ed?'':`<button class="btn sec sm" data-a="iEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" data-isec="${k}" novalidate>${s.f.map(f=>ifield(g,f)).join('')}<div class="dfoot"><button type="button" class="btn sec" data-a="iCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid">${s.f.map(f=>{const v=iVal(g,f);return `<div><dt>${f[1]}</dt><dd>${!v?'<span class="soft">Não informado</span>':(f[2]==='url'?`<span class="cp" data-a="copy" data-v="${esc(v)}" title="Copiar">${esc(v.replace('https://',''))}</span>`:esc(v))}</dd></div>`;}).join('')}</dl>`}</section>`;}).join('')}
  <section class="card pc curc"><div class="curr"><div><h2 style="margin:0;font:600 17px/22px var(--font-display)">Integração atual</h2><p class="who" style="margin:4px 0 0">É para ela que vão os novos pedidos de integração feitos pelo app.</p></div>
   <label class="tog"><input type="checkbox" id="curTog" ${g.current?'checked':''}><span class="sw"></span></label></div></section>
 </div>`;
}
function ifield(g,f){const id='if-'+f[0],v=g[f[0]]||'';
 if(f[2]==='person')return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="${f[0]}"><option value="">Sem responsável</option>${MEMBERS.filter(m=>m.tit&&m.ph).map(m=>`<option value="${m.id}" ${v===m.id?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;
 return `<label class="fld ${f[0]==='link'?'wide':''}" for="${id}"><span class="fl">${f[1]}</span><input id="${id}" name="${f[0]}" type="${f[2]}" value="${esc(v)}" ${f[2]==='number'?'min="1" inputmode="numeric" placeholder="Sem limite"':''} ${f[2]==='url'?'placeholder="https://"':''}>${f[3]?`<span class="hint">${f[3]}</span>`:''}<span class="err"></span></label>`;}
function iSteps(g){
 const t=g.ppl.length||1;
 return `<section class="card pc"><div class="sh"><h2>Etapas da integração</h2><button class="btn sec sm" data-a="addStep">${ic('plus',14,2.2)}Nova etapa</button></div>
  ${g.steps.length?`<ol class="steps">${g.steps.map((s,i)=>{const done=g.ppl.filter(p=>p.step>i).length,pct=Math.round(done/t*100);return `<li class="${pct===100?'full':pct>0?'part':''}">
   <span class="sn">${i+1}</span>
   <div class="sb"><div class="st1"><div><b>${esc(s.t)}</b><span class="who">${esc(s.w)}${s.date?' · '+dLong(s.date):''}</span></div>
    <div class="sa"><span class="who"><b>${done}</b> de ${g.ppl.length} concluíram</span><button class="ibtn sm" data-a="delStep" data-v="${i}" aria-label="Excluir etapa" title="Excluir etapa">${ic('x',14)}</button></div></div>
    <span class="tr"><i style="width:${pct}%"></i></span></div></li>`;}).join('')}</ol>`:`<div class="soft-empty"><p>Nenhuma etapa definida.</p><button class="btn pri" data-a="addStep">${ic('plus',14,2.2)}Criar primeira etapa</button></div>`}
 </section>`;
}
function iMembers(g){
 const q=norm(S.imq),ord={pendente:0,aceito:1,andamento:2,integrado:3};const list=g.ppl.filter(p=>(S.imf==='todos'||p.st===S.imf)&&(!q||norm(p.n).includes(q))).sort((a,b)=>ord[a.st]-ord[b.st]||b.step-a.step);
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="imq" placeholder="Buscar pessoa" value="${esc(S.imq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos',g.ppl.length],...Object.keys(IST).map(k=>[k,IST[k][0],icount(g,k)])].map(c=>`<button class="chipf ${S.imf===c[0]?'on':''}" data-a="imf" data-v="${c[0]}">${c[0]!=='todos'?`<i style="background:${c[0]==='andamento'?'var(--seq2)':IST[c[0]][1]}"></i>`:''}${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${list.length?`<div class="trow im thead"><span>Pessoa</span><span>Etapa atual</span><span>Status</span><span></span></div>${list.map(p=>`<div class="trow im" id="${p.id}">
   <span class="tn">${pAv(p)}<span><b>${esc(p.n)}</b></span></span>
   <span class="ist">${p.st==='integrado'?'<span class="soft">Concluiu todas</span>':p.step===0?'<span class="soft">Aguardando aceite</span>':`<span class="stepdots">${g.steps.map((s,i)=>`<i class="${i<p.step?'on':''}"></i>`).join('')}</span>${esc((g.steps[p.step]||g.steps[g.steps.length-1]||{t:''}).t)}`}</span>
   <span class="ts"><span class="stp" style="--c:${IST[p.st][1]};--b:${IST[p.st][2]}"><i></i>${IST[p.st][0]}</span></span>
   <span class="iact">${p.st==='pendente'?`<button class="btn pri sm" data-a="acceptP" data-v="${p.id}">Aceitar</button>`:p.st!=='integrado'?`<button class="btn sec sm" data-a="advanceP" data-v="${p.id}">Avançar etapa</button>`:''}<button class="ibtn sm" data-a="removeP" data-v="${p.id}" aria-label="Remover da integração" title="Remover da integração">${ic('x',14)}</button></span></div>`).join('')}`
  :`<div class="mempty"><p>Ninguém por aqui.</p><span>Nenhuma pessoa nesse filtro.</span></div>`}
  <div class="tfoot"><span>${list.length} de ${g.ppl.length} pessoas</span></div></section>`;
}

function integAfter(){
 const iq=$('#iq');if(iq)iq.addEventListener('input',e=>{S.iq=e.target.value;$('#irows').innerHTML=irows();});
 bindIntegTab();requestAnimationFrame(tabInd);
}
function bindIntegTab(){
 const imq=$('#imq');if(imq)imq.addEventListener('input',e=>{S.imq=e.target.value;const pos=e.target.selectionStart;reITab();const n=$('#imq');n.focus();n.setSelectionRange(pos,pos);});
 $$('form[data-isec]').forEach(f=>f.addEventListener('submit',saveISec));
 const rs=$('#if-resp');if(rs)rs.addEventListener('change',()=>{const m=byId(rs.value),c=$('#if-contact');if(m&&c)c.value='https://wa.me/55'+m.ph.replace(/\D/g,'');});
 const ct=$('#curTog');if(ct)ct.addEventListener('change',curToggle);
}
function reITab(){const g=ibyId(S.integ);$('#itabBody').innerHTML=itabBody(g);$$('.ptabs button').forEach(b=>{b.classList.toggle('on',b.dataset.v===S.itab);});tabInd();bindIntegTab();}
function saveISec(e){e.preventDefault();const f=e.target,g=ibyId(S.integ),k=f.dataset.isec,fd=new FormData(f);
 const n=f.querySelector('[name=n]');if(n&&!n.value.trim()){n.closest('.fld').classList.add('bad');n.parentNode.querySelector('.err').textContent='Informe um nome';n.focus();return;}
 const l=f.querySelector('[name=link]');if(l&&l.value&&!/^https:\/\/chat\.whatsapp\.com\//.test(l.value)){l.closest('.fld').classList.add('bad');l.parentNode.querySelector('.err').textContent='Use um link de convite do WhatsApp (chat.whatsapp.com/…)';l.focus();return;}
 const b=f.querySelector('button[type=submit]');b.classList.add('busy');
 setTimeout(()=>{ISECS[k].f.forEach(x=>{if(fd.has(x[0]))g[x[0]]=fd.get(x[0]);});S.iedit=null;render();toast(`${ISECS[k].t} atualizadas`);},800);}
function curToggle(e){const g=ibyId(S.integ),on=e.target.checked,other=INTEGS.find(x=>x.current&&x!==g);
 if(!on){e.target.checked=true;toast('Defina outra integração como atual para encerrar esta');return;}
 e.target.checked=false;
 openDlg(`${dlgHead(`Tornar ${g.n} a integração atual?`,other?`<b>${esc(other.n)}</b> deixará de ser a atual e não receberá novos pedidos. As pessoas que já estão nela continuam no fluxo.`:'Novos pedidos de integração passarão a entrar nela.')}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="doCurrent">Tornar atual</button></div>`,'sm');}

const IA={
 iexpMenu:()=>{const p=$('#iexpPop');closePops(p);p.classList.toggle('open');},
 igMenu:()=>{const p=$('#igPop');closePops(p);p.classList.toggle('open');},
 ifilter:v=>{S.ifilter=v;$$('.chipf[data-a=ifilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#irows').innerHTML=irows();},
 openInteg:v=>{S.integ=v;S.itab='det';S.iedit=null;S.imq='';S.imf='todos';render();window.scrollTo({top:0});},
 backInteg:()=>{S.integ=null;render();},
 itab:v=>{S.itab=v;S.iedit=null;reITab();},
 iEdit:v=>{S.iedit=v;reITab();$(`#isec-${v} input`)?.focus();},
 iCancel:()=>{S.iedit=null;reITab();},
 imf:v=>{S.imf=v;reITab();},
 resend:(v,b)=>busy(b,1000,'E-mail reenviado',()=>toast(`E-mail reenviado para ${icount(ibyId(S.integ),'pendente')+icount(ibyId(S.integ),'aceito')} pessoas com etapas em aberto`)),
 doCurrent:(v,b)=>{b.classList.add('busy');setTimeout(()=>{const g=ibyId(S.integ);INTEGS.forEach(x=>x.current=false);g.current=true;closeDlg();render();toast(`${g.n} agora é a integração atual`);},700);},
 acceptP:v=>{const g=ibyId(S.integ),p=g.ppl.find(x=>x.id===v);p.st='aceito';p.step=1;render();toast(`${p.n.split(' ')[0]} aceito(a) na integração`);},
 advanceP:v=>{const g=ibyId(S.integ),p=g.ppl.find(x=>x.id===v);p.step++;if(p.st==='aceito')p.st='andamento';let au='';if(p.step>=g.steps.length){p.st='integrado';p.step=g.steps.length;const mm=MEMBERS.find(x=>x.n===p.n);if(mm){const was=mm.st;mm.st='integrado';if(was!=='integrado')au=sxIntegrated(mm);}}render();toast(p.st==='integrado'?`${p.n.split(' ')[0]} concluiu a integração`+(au?'. '+au:''):`${p.n.split(' ')[0]} avançou para ${g.steps[p.step].t}`);},
 removeP:v=>{const g=ibyId(S.integ),i=g.ppl.findIndex(x=>x.id===v),p=g.ppl[i];
  confirmDel({title:`Remover ${p.n.split(' ')[0]} desta integração?`,body:'A pessoa sai do fluxo e das estatísticas desta integração. O cadastro de membro não é apagado.',label:'Remover',onConfirm:()=>{g.ppl.splice(i,1);render();toast(`${p.n.split(' ')[0]} removido(a)`,()=>{g.ppl.splice(i,0,p);render();});}});},
 delStep:v=>{const g=ibyId(S.integ),i=+v,s=g.steps[i];
  confirmDel({title:`Excluir a etapa “${s.t}”?`,body:'O progresso das pessoas nesta etapa será perdido. As demais etapas são renumeradas.',label:'Excluir etapa',onConfirm:()=>{g.steps.splice(i,1);render();toast(`Etapa “${s.t}” excluída`,()=>{g.steps.splice(i,0,s);render();});}});},
 delInteg:()=>{closePops();const g=ibyId(S.integ);
  confirmDel({title:`Excluir ${g.n}?`,body:`As ${g.ppl.length} pessoas vinculadas perdem o histórico desta integração. Esta ação não pode ser desfeita.`,label:'Excluir integração',typed:g.n,onConfirm:()=>{INTEGS.splice(INTEGS.indexOf(g),1);if(g.current&&INTEGS[0])INTEGS[0].current=true;S.integ=null;render();toast(`${g.n} excluída`);}});},
 addStep:()=>{openDlg(`${dlgHead('Nova etapa','Aparece no fim do fluxo desta integração.')}<form class="fgrid one" id="stF" novalidate>
   <label class="fld"><span class="fl">Nome da etapa</span><input name="t" placeholder="Ex.: Entrevista pastoral" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Local ou formato <small>opcional</small></span><input name="w" placeholder="Ex.: Sala 2 · 30 min" autocomplete="off"></label>
   <label class="fld"><span class="fl">Data <small>opcional</small></span><input name="date" type="date"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar etapa</button></div></form>`,'sm');
  $('#stF').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target),t=fd.get('t').trim();if(!t){const i=e.target.querySelector('[name=t]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome à etapa';i.focus();return;}
   const b=e.target.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const g=ibyId(S.integ);g.steps.push({id:g.id+'s'+Date.now(),t,w:fd.get('w')||'—',date:fd.get('date')});closeDlg();render();toast(`Etapa “${t}” criada`);},600);});},
 addInteg:()=>{const next='Outubro/2026';openDlg(`${dlgHead('Nova integração','Os novos pedidos feitos pelo app entram na integração atual.')}
  <form class="fgrid" id="igF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome da integração</span><input name="n" value="${next}" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Data de início</span><input name="date" type="date" value="2026-10-16"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input name="time" type="time" value="08:00"></label>
   <label class="fld wide"><span class="fl">Limite de membros <small>opcional</small></span><input name="limit" type="number" min="1" inputmode="numeric" placeholder="Sem limite" value="${INTR.max||''}"><span class="err"></span></label>
   <p class="fsec wide">${ic('message',15)}Comunicação via WhatsApp</p>
   <label class="fld wide"><span class="fl">Link do grupo <small>opcional</small></span><input name="link" type="url" placeholder="https://chat.whatsapp.com/…"><span class="err"></span></label>
   <label class="fld"><span class="fl">Responsável</span><span class="selw"><select name="resp" id="igResp"><option value="">Sem responsável</option>${MEMBERS.filter(m=>m.tit&&m.ph).map(m=>`<option value="${m.id}">${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Contato</span><input name="contact" id="igCt" type="url" placeholder="Preenchido pelo responsável"></label>
   <label class="tog wide"><input type="checkbox" name="cur" id="igCur" checked><span class="sw"></span><span><b>Definir como integração atual</b><small id="igCurNote">${INTEGS.find(g=>g.current)?`${INTEGS.find(g=>g.current).n} deixará de receber novos pedidos`:'Novos pedidos entram nesta integração'}</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar integração</button></div></form>`);
  const f=$('#igF');$('#igResp').addEventListener('change',e=>{const m=byId(e.target.value);$('#igCt').value=m?'https://wa.me/55'+m.ph.replace(/\D/g,''):'';});
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim();if(!n)bad('n','Informe um nome');else if(INTEGS.some(g=>norm(g.n)===norm(n)))bad('n','Já existe uma integração com esse nome');
   if(!fd.get('date'))bad('date','Escolha a data');const lk=fd.get('link');if(lk&&!/^https:\/\/chat\.whatsapp\.com\//.test(lk))bad('link','Use um link de convite do WhatsApp');if(!ok)return;
   const b=f.querySelector('[type=submit]');b.classList.add('busy');
   setTimeout(()=>{const g=mkInteg(n,fd.get('date'),fd.get('time')||'08:00',0,0,{aceitos:0,pend:0,link:lk,resp:fd.get('resp'),contact:fd.get('contact'),limit:fd.get('limit')});if(fd.get('cur')){INTEGS.forEach(x=>x.current=false);g.current=true;}INTEGS.unshift(g);let called=0;const waiting=IGFILA.length;if(g.current&&waiting&&INTR.aceite==='auto')called=igCallIds(IGFILA.map(x=>x.id));closeDlg();S.integ=g.id;S.itab='det';render();toast(`${n} criada${g.current?' e definida como atual':''}.${waiting?(called?` ${called} ${called===1?'pessoa foi chamada':'pessoas foram chamadas'} da fila (aceite automático).`:g.current?` ${waiting} ${waiting===1?'pessoa espera':'pessoas esperam'} na fila: chame em Fila de espera.`:''):''}`);},900);});},
};

