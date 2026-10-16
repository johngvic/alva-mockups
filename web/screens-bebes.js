/* ================= Agenda › Apresentação de Bebês ao Senhor ================= */
const BBR={maxM:24,vagas:6,prazo:7};
const BBD=[{id:'bd0',ev:'ev1',vagas:6,st:'fechada'},{id:'bd1',ev:'ev2',vagas:5,st:'aberta'},{id:'bd2',ev:'ev3',vagas:6,st:'aberta'}];
let _bbid=0;const BBP_=(bebe,nasc,pais,d,st,at,extra={})=>Object.assign({id:'bp'+(++_bbid),bebe,nasc,pais,cert:bebe,d,st,at,why:'',certOk:false},extra);
const BBP=[
 BBP_('Alice Rocha Reis','2026-03-12',['Daniela Rocha','Bruno Reis'],'bd1','aguardando','2026-09-24'),
 BBP_('Theo Andrade Costa','2025-11-02',['Felipe Andrade','Marina Costa'],'bd1','confirmado','2026-09-12'),
 BBP_('Laura Nunes Faria','2026-06-20',['Clara Nunes','Diego Faria'],'bd2','aguardando','2026-09-27'),
 BBP_('Miguel Santana','2024-01-15',['Igor Santana'],'bd2','aguardando','2026-09-28'),
 BBP_('Benjamin Lins Campos','2026-01-10',['Otávio Lins','Renata Campos'],'bd0','realizada','2026-09-02',{certOk:true}),
 BBP_('Maria Clara Prado','2025-12-04',['Juliana Prado'],'bd0','realizada','2026-09-05'),
 BBP_('Davi Teixeira','2026-02-18',['Lucas Teixeira'],'bd1','recusado','2026-09-20',{why:'Data já estava cheia; família vai escolher 11/out'}),
];
Object.assign(S,{bbq:'',bbf:'todos',bbd:null,bbdf:'prox'});
const BBST={aguardando:['Aguardando','var(--st-sol)','var(--st-sol-bg)'],confirmado:['Confirmado','var(--st-int)','var(--st-int-bg)'],realizada:['Realizada','var(--brand-text)','var(--brand-soft)'],recusado:['Recusado','var(--st-rec)','var(--st-rec-bg)']};
const bbPill=s=>`<span class="stp" style="--c:${BBST[s][1]};--b:${BBST[s][2]}"><i></i>${BBST[s][0]}</span>`;
const bbD=id=>BBD.find(d=>d.id===id);
const bbEv=p=>p.evx||eById(bbD(p.d).ev); /* p.evx: apresentação registrada à mão em Secretaria, sem evento na Agenda */
const bbM=(nasc,iso)=>{const a=new Date(nasc+'T12:00'),b=new Date(iso+'T12:00');let m=(b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth());if(b.getDate()<a.getDate())m--;return Math.max(0,m);};
const bbAge=m=>m<1?'recém-nascido':m<12?`${m} ${m===1?'mês':'meses'}`:(()=>{const y=Math.floor(m/12),r=m%12;return `${y} ano${y>1?'s':''}${r?` e ${r} ${r===1?'mês':'meses'}`:''}`;})();
const bbUsed=d=>BBP.filter(p=>p.d===d.id&&(p.st==='confirmado'||p.st==='aguardando'||p.st==='realizada')).length;
const bbOver=p=>bbM(p.nasc,bbEv(p).d)>BBR.maxM;
/* o certificado de apresentação é emitido pela Secretaria (Atos e Documentos); aqui ele só aparece para consulta */
const bbDoc=p=>SX_DOCS.find(d=>d.bb===p.id&&d.st==='valido')||null;
const bbAv=n=>`<span class="bb-av" style="--h:${(n.length*37)%360}">${ic('pacifier',16,1.8)}</span>`;
const bbMaxTx=()=>BBR.maxM%12?`${BBR.maxM} meses`:`${BBR.maxM/12} ano${BBR.maxM>12?'s':''}`;

/* Apresentação é um tipo de evento (Agenda › Eventos). Dentro do evento, a aba Bebês usa as linhas e ações abaixo; a configuração de vagas do evento fica em BBD */
const bdSt=d=>{const e=eById(d.ev),u=bbUsed(d);return past(e)?stpill('var(--ink-muted)','var(--surface-2)','Realizada'):u>=d.vagas?stpill('var(--st-rec)','var(--st-rec-bg)','Esgotada'):stpill('var(--st-int)','var(--st-int-bg)','Aberta');};
const bdPast=d=>past(eById(d.ev));
const bdAsc=(a,b)=>eById(a.ev).d<eById(b.ev).d?-1:1;
function bbRow(p){
 const e=bbEv(p),m=bbM(p.nasc,e.d),ov=m>BBR.maxM;
 return `<div class="trow bb" tabindex="0" data-a="bbOpen" data-v="${p.id}">
   <span class="tn">${bbAv(p.bebe)}<span class="hn"><b>${esc(p.bebe)}</b><span class="${ov&&p.st!=='realizada'?'bb-ov':''}">${bbAge(m)} na data${ov&&p.st!=='realizada'?` · acima de ${bbMaxTx()}`:''}</span></span></span>
   <span class="bb-pa">${p.pais.map(n=>esc(n)).join(' e ')}</span>
   <span class="bb-cu">${dBR(e.d)} · ${e.time}<small>${esc(e.t)}</small></span>
   <span class="ts">${bbPill(p.st)}${p.st==='realizada'?`<span class="bb-cs ${bbDoc(p)?'ok':''}">${ic(bbDoc(p)?'check':'award',11,2.4)}${bbDoc(p)?(p.certOk?'Certificado enviado':'Certificado emitido'):'Na secretaria'}</span>`:''}</span>
   <span class="bb-ac">${p.st==='aguardando'?`<button class="btn pri sm" data-a="bbOk" data-v="${p.id}">Confirmar</button>`:p.st==='realizada'?`<button class="btn sec sm" data-a="bbCert" data-v="${p.id}">${ic('award',13)}Certificado</button>`:p.st==='confirmado'&&!past(e)?'':p.st==='confirmado'?`<button class="btn sec sm" data-a="bbDone" data-v="${p.id}">Marcar realizada</button>`:''}${ic('chevR',16)}</span></div>`;
}
function bbAfter(){const q=$('#bbq');if(q)q.addEventListener('input',e=>{S.bbq=e.target.value;const p=e.target.selectionStart;render();const n=$('#bbq');n.focus();n.setSelectionRange(p,p);});}
const bbRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};

function bbCertHTML(p,doc){const e=bbEv(p),sg=doc?doc.sig.split(' — '):['Pr. Rafael Pereira','Pastor presidente'];return `<div class="bb-cert"><div class="bb-cert-in">
 <div class="bb-c-top">${logo(18,false)}<span>${esc(CHURCHES[S.church].n)}</span></div>
 <p class="bb-c-eb">Certificado de</p><h2 class="bb-c-t">Apresentação ao Senhor</h2>
 <p class="bb-c-tx">Certificamos que</p><p class="bb-c-name">${esc(p.cert)}</p>
 <p class="bb-c-tx">nascido(a) em ${dBR(p.nasc)}, filho(a) de ${p.pais.map(esc).join(' e ')}, foi apresentado(a) ao Senhor diante da igreja reunida em ${dBR(e.d)}.</p>
 <blockquote>“Levaram-no a Jerusalém, para o apresentarem ao Senhor.”<cite>Lucas 2:22</cite></blockquote>
 <div class="bb-c-sig"><span><i></i>${esc(sg[0])}<small>${esc(sg[1]||'')}</small></span><span><i></i>${esc(CHURCHES[S.church].n)}<small>${dBR(e.d)}</small></span></div>
 </div></div>`;}

const BBA={
 bbF:v=>{S.bbf=v;render();},
 bbAdd:v=>{const d=bbD(v),e=eById(d.ev);if(e.st!=='confirmado'){toast('Confirme a data do evento antes de adicionar bebês.');return;}if(bdPast(d)){toast('Esta data já aconteceu.');return;}if(bbUsed(d)>=d.vagas){toast('Sem vagas nesta data. Aumente as vagas para adicionar.');return;}
  const ms=sxInteg().filter(m=>sxSitOf(m)==='ativo'),free=d.vagas-bbUsed(d);
  sxDlg('Adicionar bebê',esc(e.t)+' · '+dBR(e.d)+' · '+free+(free===1?' vaga livre':' vagas livres'),
   sxF('Nome do bebê','<input name="n" autocomplete="off">','Vira o nome no certificado. A família confirma depois, se precisar corrigir.')
   +sxF('Data de nascimento','<input type="date" name="nasc" max="'+SX_TODAY+'">')
   +sxF('Responsável (membro ativo)',sxSel('r1',ms.map(m=>[m.n,m.n]),ms[0].n),'Pelo menos um responsável precisa ser membro ativo.')
   +sxF('Outro responsável (opcional)','<input name="r2" placeholder="Nome" autocomplete="off">'),sxOk('Adicionar e confirmar'));
  const f=$('#sxF');f.onsubmit=ev=>{ev.preventDefault();sxClr(f);const n=f.n.value.trim();
   if(!n)return sxErr(f,'n','Informe o nome do bebê');if(!f.nasc.value)return sxErr(f,'nasc','Informe a data de nascimento');if(f.nasc.value>SX_TODAY)return sxErr(f,'nasc','A data não pode ser futura');
   if(bbUsed(d)>=d.vagas)return sxErr(f,'n','As vagas acabaram enquanto você preenchia');
   const pais=[f.r1.value,f.r2.value.trim()].filter(Boolean),p=BBP_(n,f.nasc.value,pais,d.id,'confirmado',SX_TODAY);BBP.push(p);
   LOG.unshift({u:'Rafael Pereira',a:'Adicionou',e:'Apresentação de bebê',x:n,det:dBR(e.d),d:SX_TODAY,t:new Date().toTimeString().slice(0,5)});
   closeDlg();bbRe();toast(n.split(' ')[0]+' adicionado(a) e confirmado(a) em '+dBR(e.d)+(bbM(p.nasc,e.d)>BBR.maxM?'. Acima da idade da regra.':''));};},
 bbVagas:v=>{const d=bbD(v),u=bbUsed(d);
  sxDlg('Vagas desta data',esc(eById(d.ev).t)+' · '+dBR(eById(d.ev).d),sxF('Vagas','<input type="number" name="n" min="'+Math.max(1,u)+'" max="20" value="'+d.vagas+'">','Não pode ser menor que as '+u+' já ocupadas. Máximo de 20.'),sxOk('Salvar'));
  const f=$('#sxF');f.onsubmit=ev=>{ev.preventDefault();sxClr(f);const n=parseInt(f.n.value,10);
   if(!(n>=Math.max(1,u)&&n<=20))return sxErr(f,'n','Use um número entre '+Math.max(1,u)+' e 20');
   d.vagas=n;closeDlg();bbRe();toast('Vagas desta data: '+n);};},
 bbOpen:(v,b,ev)=>{if(ev&&ev.target.closest('[data-a=bbOk],[data-a=bbCert],[data-a=bbDone]'))return;const p=BBP.find(x=>x.id===v),e=bbEv(p),m=bbM(p.nasc,e.d),ov=m>BBR.maxM&&p.st!=='realizada';
  openDlg(`${dlgHead('Pedido de apresentação',`Recebido em ${dBR(p.at)}`)}
   <div class="bb-head">${bbAv(p.bebe)}<div class="dkt"><b>${esc(p.bebe)}</b><span>Nasceu em ${dBR(p.nasc)} · ${bbAge(m)} na data</span></div>${bbPill(p.st)}</div>
   ${ov?`<p class="lm-w bad" style="margin:12px 0 0">${ic('alert',14,2.2)}<span><b>Acima da idade da regra (${bbMaxTx()})</b><br>Converse com a família antes de confirmar. Você pode confirmar mesmo assim.</span></p>`:''}
   <dl class="bb-dl"><div><dt>Culto</dt><dd>${esc(e.t)} · ${wd(e.d)}, ${dBR(e.d)} · ${e.time}</dd></div><div><dt>Responsáveis</dt><dd>${p.pais.map(n=>`${esc(n)} <span class="bb-mb">${ic('check',10,3)}membro</span>`).join('<br>')}</dd></div>${p.why?`<div><dt>Motivo da recusa</dt><dd>${esc(p.why)}</dd></div>`:''}</dl>
   <label class="fld"><span class="fl">Nome no certificado</span><input id="bbCn" value="${esc(p.cert)}" ${bbDoc(p)?'disabled':''} autocomplete="off"><span class="hint">${bbDoc(p)?`Certificado nº ${bbDoc(p).num} emitido pela secretaria.`:'A secretaria emite o certificado com este nome. Confira com a família.'}</span><span class="err"></span></label>
   <div class="dfoot bb-ft">${p.st==='aguardando'?`<button class="btn sec" data-a="bbNo" data-v="${p.id}">Recusar</button><button class="btn pri" data-a="bbOk" data-v="${p.id}">${ov?'Confirmar mesmo assim':'Confirmar'}</button>`:p.st==='confirmado'?`<button class="btn sec" data-a="bbCancel" data-v="${p.id}">Cancelar apresentação</button>${past(e)||e.d===CKDAY?`<button class="btn pri" data-a="bbDone" data-v="${p.id}">Marcar realizada</button>`:`<button class="btn pri" data-a="bbSaveName" data-v="${p.id}">Salvar</button>`}`:p.st==='realizada'?`<button class="btn sec" data-a="bbSaveName" data-v="${p.id}" ${bbDoc(p)?'disabled':''}>Salvar nome</button><button class="btn pri" data-a="bbCert" data-v="${p.id}">${ic('award',14)}Ver certificado</button>`:`<button class="btn sec" data-a="closeDlg">Fechar</button>`}</div>`,'sm');},
 bbSaveName:(v,bt)=>{const p=BBP.find(x=>x.id===v),n=$('#bbCn').value.trim();if(!n){const f=$('#bbCn').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent='Informe o nome';return;}busy(bt,500,'Salvo',()=>{p.cert=n;setTimeout(()=>{closeDlg();bbRe();toast('Nome do certificado salvo');},300);});},
 bbOk:(v,bt)=>{const p=BBP.find(x=>x.id===v),d=bbD(p.d),cn=$('#bbCn');if(eById(d.ev).st!=='confirmado'){toast('Confirme a data do evento antes de confirmar bebês.');return;}if(cn&&cn.value.trim())p.cert=cn.value.trim();
  const conf=BBP.filter(x=>x.d===d.id&&(x.st==='confirmado'||x.st==='realizada')).length;if(conf>=d.vagas){toast(`Não há vagas confirmadas livres em ${dBR(eById(d.ev).d)}. Aumente as vagas ou recuse.`);return;}
  busy(bt,600,'Confirmado',()=>{p.st='confirmado';LOG.unshift({u:'Rafael Pereira',a:'Confirmou',e:'Apresentação de bebê',x:p.bebe,det:dBR(eById(d.ev).d),d:'2026-09-30',t:new Date().toTimeString().slice(0,5)});setTimeout(()=>{closeDlg();bbRe();toast(`Apresentação de ${p.bebe.split(' ')[0]} confirmada. A família recebe o aviso no app.`,()=>{p.st='aguardando';bbRe();});},300);});},
 bbNo:v=>{const p=BBP.find(x=>x.id===v),others=BBD.filter(d=>d.id!==p.d&&d.st==='aberta'&&bbUsed(d)<d.vagas);
  openDlg(`${dlgHead(`Recusar o pedido de ${esc(p.bebe.split(' ')[0])}?`,'A família recebe o motivo no app.')}<div class="ckwhy" id="bbW">${['Data cheia','Acima da idade','Responsáveis não são membros','Outro'].map(w=>`<button type="button" class="chipf" data-w="${w}">${w}</button>`).join('')}</div>
   <label class="fld" style="margin-top:10px"><span class="fl">Mensagem para a família</span><textarea class="ta" id="bbWm" rows="3" maxlength="200" placeholder="Ex.: que tal no culto do dia 11?"></textarea><span class="err"></span></label>
   ${others.length?`<p class="hint" style="margin:8px 0 0">${ic('info',12,2)} Datas com vaga: ${others.map(d=>dBR(eById(d.ev).d)).join(', ')}. A família pode pedir de novo pelo app.</p>`:''}
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" data-a="bbDoNo" data-v="${v}">Recusar pedido</button></div>`,'sm');
  $('#bbW').addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(!t)return;$$('#bbW .chipf').forEach(z=>z.classList.toggle('on',z===t));$('#bbWm').closest('.fld').classList.remove('bad');});},
 bbDoNo:(v,bt)=>{const w=$('#bbW .chipf.on'),m=$('#bbWm').value.trim();if(!w){const f=$('#bbWm').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent='Escolha um motivo';return;}if(w.dataset.w==='Outro'&&!m){const f=$('#bbWm').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent='Explique o motivo para a família';return;}
  const p=BBP.find(x=>x.id===v);bt.classList.add('busy');setTimeout(()=>{p.st='recusado';p.why=w.dataset.w+(m?' · '+m:'');closeDlg();bbRe();toast(`Pedido de ${p.bebe.split(' ')[0]} recusado. A família foi avisada.`,()=>{p.st='aguardando';p.why='';bbRe();});},500);},
 bbCancel:v=>{const p=BBP.find(x=>x.id===v);confirmDel({title:`Cancelar a apresentação de ${p.bebe.split(' ')[0]}?`,body:`A família é avisada no app e a vaga de ${dBR(bbEv(p).d)} volta a ficar livre.`,label:'Cancelar apresentação',onConfirm:()=>{p.st='recusado';p.why='Cancelada pela secretaria';bbRe();toast('Apresentação cancelada',()=>{p.st='confirmado';p.why='';bbRe();});}});},
 bbDone:(v,bt)=>{const p=BBP.find(x=>x.id===v);busy(bt,600,'Realizada',()=>{p.st='realizada';setTimeout(()=>{closeDlg();bbRe();toast(`Apresentação de ${p.bebe.split(' ')[0]} registrada. A secretaria emite o certificado em Secretaria › Atos.`);},300);});},
 bbCert:v=>{const p=BBP.find(x=>x.id===v),d=bbDoc(p);
  if(!d){openDlg(`${dlgHead('Certificado de apresentação',esc(p.bebe))}<p class="fi-note">${ic('info',15)}<span>O certificado ainda não foi emitido. Quem emite é a <b>secretaria</b>, em Secretaria › Atos. Assim que for emitido, ele aparece aqui para consulta.</span></p>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="bbGoSec">Abrir em Secretaria</button></div>`,'sm');return;}
  openDlg(`${dlgHead('Certificado de apresentação',`${esc(p.bebe)} · nº ${d.num} · emitido em ${dBR(d.d)} pela secretaria`)}${bbCertHTML(p,d)}
  <p class="hint" style="margin:10px 0 0">${ic('info',12,2)} Consulta. A emissão e o envio à família são feitos em Secretaria.</p>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="bbPdf" data-v="${p.id}">${ic('arrowDn',14,2)}Baixar PDF</button></div>`,'lg bb-cdlg');},
 bbGoSec:()=>{closeDlg();A.nav('sec-atos');},
 bbPdf:v=>{const p=BBP.find(x=>x.id===v);toast(`Baixando Certificado-${p.bebe.split(' ')[0]}.pdf`);},
 /* bbSend saiu: o envio do certificado é feito pela Secretaria (sxBbSend) */
 bbRules:()=>{let m=BBR.maxM,vg=BBR.vagas,pz=BBR.prazo;const row=(id,lab,val,sub)=>`<div class="bb-rr"><div class="dkt"><b>${lab}</b><span>${sub}</span></div><div class="lm2-step"><button type="button" data-s="${id}|-1">${ic('minus',15,2.4)}</button><output><b id="bbR${id}">${val}</b></output><button type="button" data-s="${id}|1">${ic('plus',15,2.4)}</button></div></div>`;
  openDlg(`${dlgHead('Regras da apresentação','Valem para os pedidos feitos pelo app.')}<div class="bb-rules">${row('m','Idade máxima',m,'em meses, no dia do evento')}${row('v','Vagas por evento',vg,'padrão ao criar um evento de apresentação')}${row('p','Prazo para pedir',pz,'dias antes do evento')}
   <div class="bb-rr fixed"><div class="dkt"><b>Responsável membro</b><span>Pelo menos um dos responsáveis precisa ser membro ativo</span></div><span class="bb-lock">${ic('lock',13,2)}Sempre</span></div>
   <div class="bb-rr fixed"><div class="dkt"><b>Certificado</b><span>Emitido pela secretaria depois da apresentação e enviado no app e por e-mail</span></div><span class="bb-lock">${ic('award',13,2)}Sempre</span></div></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="bbSaveRules">Salvar</button></div>`,'sm');
  const lim={m:[1,48],v:[1,20],p:[0,30]},val={m,v:vg,p:pz};$('.bb-rules').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;const [k,d]=b.dataset.s.split('|');val[k]=Math.max(lim[k][0],Math.min(lim[k][1],val[k]+ +d));$('#bbR'+k).textContent=val[k];});window._bbR=val;},
 bbSaveRules:(v,bt)=>{const r=window._bbR;busy(bt,500,'Salvo',()=>{Object.assign(BBR,{maxM:r.m,vagas:r.v,prazo:r.p});setTimeout(()=>{closeDlg();bbRe();toast(`Regras salvas: até ${bbMaxTx()}, ${BBR.vagas} vagas, pedidos até ${BBR.prazo} dias antes`);},300);});},
};

