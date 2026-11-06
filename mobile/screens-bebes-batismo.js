/* ================= Apresentação de Bebês ao Senhor (membro) ================= */
S.apb={max:24,prazo:7,
 datas:[{id:'bd1',y:2026,m:10,d:4,h:'10h',t:'Apresentação de bebês',vagas:5,used:2},{id:'bd2',y:2026,m:10,d:11,h:'10h',t:'Apresentação de bebês',vagas:6,used:2},{id:'bd4',y:2026,m:10,d:25,h:'10h',t:'Apresentação de bebês',vagas:6,used:6},{id:'bd5',y:2026,m:11,d:8,h:'10h',t:'Apresentação de bebês',vagas:6,used:1}],
 kids:[{id:'k1',n:'Helena Pereira',nasc:'2026-02-10'},{id:'k2',n:'Lucas Pereira',nasc:'2023-05-02'}],
 pedidos:[{id:'ap1',kid:'k2',bebe:'Lucas Pereira',cert:'Lucas Pereira',pais:['Rafael Pereira','Camila Pereira'],when:'Dom, 14 mai 2023 · 10h',culto:'Culto de Celebração',st:'realizada',emit:true}],
 f:null};
const APB_ST={aguardando:['warning','Aguardando'],confirmado:['success','Confirmado'],realizada:['success','Realizada'],recusado:['danger','Recusado'],cancelado:['danger','Cancelado']};
const apbM=(nasc,y,m,d)=>{const a=new Date(nasc+'T12:00'),b=new Date(y,m-1,d,12);let n=(b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth());if(b.getDate()<a.getDate())n--;return Math.max(0,n);};
const apbAge=n=>n<1?'recém-nascido(a)':n<12?`${n} ${n===1?'mês':'meses'}`:(()=>{const y=Math.floor(n/12),r=n%12;return `${y} ano${y>1?'s':''}${r?` e ${r} ${r===1?'mês':'meses'}`:''}`;})();
const apbMaxTx=()=>S.apb.max%12?`${S.apb.max} meses`:`${S.apb.max/12} anos`;
const apbDays=dt=>Math.round((new Date(dt.y,dt.m-1,dt.d,12)-new Date(TODAY.y,TODAY.m-1,TODAY.d,12))/864e5);
const apbKidNow=k=>apbM(k.nasc,TODAY.y,TODAY.m,TODAY.d);
const apbActive=kid=>S.apb.pedidos.find(p=>p.kid===kid&&['aguardando','confirmado','realizada'].includes(p.st));
function apbCertHTML(p){return `<div class="apb-cert"><div class="apb-cert-in"><span class="apb-c-eb">Certificado de</span><h2 class="apb-c-t">Apresentação ao Senhor</h2><p class="apb-c-tx">Certificamos que</p><p class="apb-c-n">${esc(p.cert)}</p><p class="apb-c-tx">filho(a) de ${p.pais.map(esc).join(' e ')}, foi apresentado(a) ao Senhor diante da igreja reunida em ${p.when.split(' · ')[0].replace(/^\w+, /,'')}.</p><blockquote>“Levaram-no a Jerusalém, para o apresentarem ao Senhor.”<cite>Lucas 2:22</cite></blockquote><div class="apb-c-sig"><span><i></i>Pr. Rafael Pereira</span><span><i></i>${esc(S.church.name||'Alva Sede')}</span></div></div></div>`;}

V.bebes=()=>{const P=S.apb.pedidos,open=S.apb.datas.filter(d=>apbDays(d)>=S.apb.prazo&&d.used<d.vagas);
 return {sb:'var(--ink)',html:`${subHead('Apresentações','Seu bebê apresentado ao Senhor no culto, com a igreja reunida.')}
 <div class="pad stack g6" style="padding-bottom:24px">
  <section class="apb-hero"><span class="apb-hi">${ic('pacifier',22,1.8)}</span><blockquote>“Levaram-no a Jerusalém, para o apresentarem ao Senhor.”<cite>Lucas 2:22</cite></blockquote><p>Os pais trazem o bebê à frente no culto, a igreja ora pela família e vocês recebem o certificado no app.</p></section>
  ${P.length?`<section class="stack g3"><p class="eb2">Seus pedidos</p>${P.map(p=>{const s=APB_ST[p.st];return `<article class="card apb-p ${p.st}"><div class="row g3" style="align-items:flex-start"><span class="apb-av">${ic('pacifier',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">${esc(p.bebe)}</span><span class="it-sub">${p.culto} · ${p.when}</span></div>${status(s[0],s[1])}</div>
   ${p.st==='aguardando'?`<p class="apb-note">${ic('clock',14,2)}A secretaria confirma em até 3 dias úteis. Você recebe um aviso aqui no app.</p><button class="tlink" style="align-self:flex-start;padding:0" data-a="apbCancel" data-v="${p.id}">Cancelar pedido</button>`:p.st==='confirmado'?`<p class="apb-note ok">${ic('check',14,2.4)}Chegue 20 minutos antes e procure a recepção. Vocês serão chamados à frente.</p><button class="tlink" style="align-self:flex-start;padding:0" data-a="apbCancel" data-v="${p.id}">Cancelar inscrição</button>`:p.st==='realizada'?(p.emit?`<button class="btn outline md block" data-a="apbCert" data-v="${p.id}">${ic('award',16,2)}Ver certificado</button>`:`<p class="apb-note">${ic('clock',14,2)}A secretaria está preparando o certificado. Você recebe um aviso aqui quando estiver pronto.</p>`):p.why?`<p class="apb-note bad">${ic('info',14,2)}${esc(p.why)}</p>`:''}</article>`;}).join('')}</section>`:''}
  <section class="stack g3"><p class="eb2">Como funciona</p><ol class="steps"><li>Escolha uma das datas de apresentação.</li><li>A secretaria confirma o pedido.</li><li>No culto, vocês apresentam o bebê à frente.</li><li>A secretaria emite o certificado, que chega aqui no app e em Meus documentos.</li></ol>
   <p class="foot">Para bebês de até ${apbMaxTx()}. Pelo menos um dos responsáveis precisa ser membro. Pedidos até ${S.apb.prazo} dias antes da data.</p></section>
 </div>
 <div class="apb-dock"><button class="btn primary block" data-a="apbNew" ${open.length?'':'disabled'}>${open.length?'Agendar apresentação':'Sem datas abertas no momento'}</button></div>`};};

V.bebeNovo=()=>{const F=S.apb.f,st=F.step;
 const steps=['Bebê','Data','Confirmar'];
 let body='';
 if(st===1){const pd=F.date&&S.apb.datas.find(x=>x.id===F.date);body=`${pd?`<div class="apb-evb"><span class="apb-av">${ic('calendar',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">${pd.t}</span><span class="it-sub">${fmtK(K(pd.y,pd.m,pd.d))} · ${pd.h} · data escolhida</span></div></div>`:''}<div class="stack g3"><p class="eb2">Quem será apresentado?</p>${S.apb.kids.map(k=>{const n=apbKidNow(k),done=apbActive(k.id),ov=n>S.apb.max,dis=done||ov;return `<button class="apb-k ${F.kid===k.id?'on':''}" data-a="apbKid" data-v="${k.id}" ${dis?'disabled':''}><span class="apb-av">${ic('pacifier',18,1.8)}</span><span class="grow stack" style="gap:2px;align-items:flex-start"><span class="it-title">${esc(k.n)}</span><span class="it-sub">${apbAge(n)}${done?` · ${done.st==='realizada'?'já apresentado(a)':'já tem pedido'}`:ov?` · acima de ${apbMaxTx()}`:''}</span></span>${dis?ic('lock',16,2):`<span class="apb-rd"></span>`}</button>`;}).join('')}
   ${S.apb.kids.some(k=>apbKidNow(k)>S.apb.max&&!apbActive(k.id))?`<p class="foot">${ic('info',13,2)} Criança acima de ${apbMaxTx()}? Fale com a secretaria.</p>`:''}
   <button class="apb-add ${F.adding?'on':''}" data-a="apbAddKid">${ic('plus',18,2.2)}Cadastrar outro bebê</button>
   ${F.adding?`<div class="stack g4 apb-nk">${field({id:'apbN',label:'Nome completo do bebê',ph:'Como no registro',val:F.nk.n})}${field({id:'apbD',label:'Data de nascimento',type:'date',val:F.nk.d})}<button class="btn outline md block" data-a="apbSaveKid">Adicionar à família</button></div>`:''}</div>`;}
 if(st===2){const k=S.apb.kids.find(x=>x.id===F.kid);body=`<div class="stack g3"><p class="eb2">Em qual data?</p>${S.apb.datas.map(d=>{const dd=apbDays(d),full=d.used>=d.vagas,late=dd<S.apb.prazo,m=apbM(k.nasc,d.y,d.m,d.d),ov=m>S.apb.max,dis=full||late||ov,left=d.vagas-d.used;
   return `<button class="apb-d ${F.date===d.id?'on':''}" data-a="apbDate" data-v="${d.id}" ${dis?'disabled':''}><span class="apb-dt"><b>${d.d}</b>${MONTHS[d.m-1].slice(0,3)}</span><span class="grow stack" style="gap:2px;align-items:flex-start"><span class="it-title">${d.t}</span><span class="it-sub">${fmtK(K(d.y,d.m,d.d)).split(',')[0]} · ${d.h} · ${esc(k.n.split(' ')[0])} com ${apbAge(m)}</span></span><span class="apb-v ${dis?'x':left<=2?'few':''}">${full?'Esgotado':late?'Prazo encerrado':ov?'Acima da idade':left===1?'1 vaga':left+' vagas'}</span></button>`;}).join('')}
   <p class="foot">Os pedidos fecham ${S.apb.prazo} dias antes de cada data.</p></div>`;}
 if(st===3){const k=S.apb.kids.find(x=>x.id===F.kid),d=S.apb.datas.find(x=>x.id===F.date);body=`<div class="stack g5"><div class="apb-sum"><span class="apb-av lg">${ic('pacifier',22,1.8)}</span><div class="stack" style="gap:2px"><span class="it-title">${esc(k.n)}</span><span class="it-sub">${d.t} · ${fmtK(K(d.y,d.m,d.d))} · ${d.h}</span></div></div>
   ${field({id:'apbC',label:'Nome no certificado',val:F.cert,hint:'Confira a grafia: é assim que sai no certificado.'})}
   <div class="stack g2"><span class="eb2">Responsáveis</span><div class="apb-r"><span class="it-title">Rafael Pereira</span><span class="apb-mb">${ic('check',11,3)}Membro</span></div></div>
   ${field({id:'apbP2',label:'Outro responsável (opcional)',val:F.p2,ph:'Nome completo'})}
   <p class="apb-note">${ic('info',14,2)}A presença dos responsáveis no culto é obrigatória: vocês serão chamados à frente com o bebê.</p></div>`;}
 return {sb:'var(--ink)',html:`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="apbBack" aria-label="Voltar">${ic('chevL',20,2.25)}</button><span class="apb-steps">${steps.map((s,i)=>`<i class="${i+1<st?'done':i+1===st?'on':''}"></i>`).join('')}</span></div><h1 class="t1" style="margin-top:14px">Agendar apresentação</h1><p class="callout">Passo ${st} de 3 · ${steps[st-1]}</p></header>
 <div class="pad stack g5" style="padding-bottom:24px">${body}</div>
 <div class="apb-dock"><button class="btn primary block" data-a="apbNext" id="apbGo">${st===3?'Enviar pedido':'Continuar'}</button></div>`};};
HOOK.bebeNovo=function(){const F=S.apb.f;[['apbN',v=>F.nk.n=v],['apbD',v=>F.nk.d=v],['apbC',v=>F.cert=v],['apbP2',v=>F.p2=v]].forEach(([id,fn])=>{const el=$('#'+id);if(el)el.addEventListener('input',()=>{fn(el.value);clearErr(id);});});};
V.bebeCert=()=>{const p=S.apb.pedidos.find(x=>x.id===S.apb.cert);return {sb:'var(--ink)',html:`${subHead('Certificado',esc(p.bebe))}<div class="pad stack g5" style="padding-bottom:40px">${apbCertHTML(p)}<div class="stack g3"><button class="btn primary block" data-a="apbPdf">${ic('share',16,2)}Compartilhar</button><button class="btn outline block" data-a="apbPdf" data-v="pdf">Baixar PDF</button></div></div>`};};
APP.push('bebes','bebeNovo','bebeCert');SUBS.push('bebes','bebeNovo','bebeCert');
Object.assign(A,{
 apbNew:()=>{if(S.role==='visitante'){toast('error','Só para membros','Pelo menos um dos responsáveis precisa ser membro. Fale com a secretaria.');return;}S.apb.f={step:1,kid:null,date:null,cert:'',p2:'Camila Pereira',ok:false,adding:false,nk:{n:'',d:''}};go('bebeNovo');},
 apbBack:()=>{const F=S.apb.f;if(F.step>1){F.step--;render('back');}else back();},
 apbKid:v=>{S.apb.f.kid=v;S.apb.f.adding=false;softRender();},
 apbDate:v=>{S.apb.f.date=v;softRender();},
 apbAddKid:()=>{S.apb.f.adding=!S.apb.f.adding;softRender();setTimeout(()=>{const n=$('#apbN');n&&n.focus();},50);},
 apbSaveKid:()=>{const F=S.apb.f,n=F.nk.n.trim(),d=F.nk.d;let ok=true;
  if(n.split(/\s+/).length<2){setErr('apbN','Informe nome e sobrenome');ok=false;}
  if(!d){setErr('apbD','Informe a data de nascimento');ok=false;}else{const t=new Date(d+'T12:00'),now=new Date(TODAY.y,TODAY.m-1,TODAY.d,12);if(t>now){setErr('apbD','A data não pode ser no futuro');ok=false;}else if(apbM(d,TODAY.y,TODAY.m,TODAY.d)>S.apb.max){setErr('apbD',`Acima de ${apbMaxTx()}. Fale com a secretaria.`);ok=false;}}
  if(!ok)return;const k={id:'k'+Date.now(),n,nasc:d};S.apb.kids.push(k);F.kid=k.id;F.adding=false;F.nk={n:'',d:''};softRender();toast('success',n.split(' ')[0]+' adicionado(a) à família','A secretaria confere os dados na confirmação.');},
 apbTog:(v,el)=>{const on=el.getAttribute('aria-checked')!=='true';el.setAttribute('aria-checked',on);S.apb.f.ok=on;clearErr('apbOk');},
 apbNext:async(v,el)=>{const F=S.apb.f;
  if(F.step===1){if(!F.kid){toast('error','Escolha o bebê','Ou cadastre um novo.');return;}const k=S.apb.kids.find(x=>x.id===F.kid);if(!F.cert)F.cert=k.n;F.step=2;render('fwd');return;}
  if(F.step===2){if(!F.date){toast('error','Escolha um culto','Datas esgotadas ou fora do prazo ficam bloqueadas.');return;}{const d=S.apb.datas.find(x=>x.id===F.date),k=S.apb.kids.find(x=>x.id===F.kid);if(apbM(k.nasc,d.y,d.m,d.d)>S.apb.max||!apbOpen(d)){F.date=null;softRender();toast('error','Esse culto não serve para '+k.n.split(' ')[0],'Escolha outra data da lista.');return;}}F.step=3;render('fwd');return;}
  let ok=true;if(!F.cert.trim()||F.cert.trim().split(/\s+/).length<2){setErr('apbC','Informe o nome completo');ok=false;}if(!ok)return;
  await busy(el,800,null,'Pedido enviado');const k=S.apb.kids.find(x=>x.id===F.kid),d=S.apb.datas.find(x=>x.id===F.date);d.used++;
  S.apb.pedidos.unshift({id:'ap'+Date.now(),kid:k.id,bebe:k.n,cert:F.cert.trim(),pais:['Rafael Pereira',F.p2.trim()].filter(Boolean),when:fmtK(K(d.y,d.m,d.d))+' · '+d.h,culto:d.t,st:'aguardando'});
  S.notifs.unshift({id:'n'+Date.now(),t:'Pedido de apresentação enviado: '+k.n.split(' ')[0],s:d.t+' · '+fmtK(K(d.y,d.m,d.d))+'. A secretaria confirma em até 3 dias.',when:'Agora',grp:'Hoje',tone:'damasco',i:'pacifier',go:'bebes',unread:true});
  S.hist=S.hist.filter(h=>h!=='bebeNovo');S.screen='bebes';render('back');toast('success','Pedido enviado','Avisamos aqui quando a secretaria confirmar.');},
 apbCancel:v=>{const p=S.apb.pedidos.find(x=>x.id===v);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${p.st==='confirmado'?'Cancelar a apresentação?':'Cancelar o pedido?'}</h3><p class="callout">${esc(p.bebe)} · ${p.when}. A vaga volta a ficar livre para outra família.</p></div><div class="stack g3"><button type="button" class="btn primary block danger" id="apbX">Cancelar ${p.st==='confirmado'?'apresentação':'pedido'}</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#apbX',sh).addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Cancelado');p.st='cancelado';p.why='Cancelado por você. Dá para pedir outra data quando quiser.';const d=S.apb.datas.find(x=>p.when.startsWith(fmtK(K(x.y,x.m,x.d))));if(d)d.used--;await closeSheet();softRender();toast('info','Cancelado','A secretaria foi avisada.');});});},
 apbCert:v=>{S.apb.cert=v;go('bebeCert');},
 docDl:v=>toast('success','Baixando o documento',MYDOCS[+v].t+'.pdf'),
 apbFromEv:async v=>{await closeSheet();A.apbNew();if(S.apb.f){S.apb.f.date=v;}},
 apbPdf:(v,el)=>toast('success',v==='pdf'?'Baixando o certificado':'Compartilhando',v==='pdf'?'Certificado-'+S.apb.pedidos.find(x=>x.id===S.apb.cert).bebe.split(' ')[0]+'.pdf':'Escolha onde enviar.'),
});
RAIL.push(['bebes','Membro › Apresentações'],['batismo','Membro › Batismo']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');

/* ================= Batismo (membro): pedido de participação =================
   Pelo app só a apresentação e o batismo têm pedido. Consagração e casamento não: quem decide e registra é a secretaria. */
S.bat={datas:[{id:'bt1',y:2026,m:10,d:18,h:'16h',t:'Batismo nas águas',place:'Chácara Alva'},{id:'bt2',y:2026,m:11,d:22,h:'16h',t:'Batismo nas águas',place:'Chácara Alva'}],
 pessoas:[{id:'pe1',n:'Rafael Pereira',bap:'12/05/2019'},{id:'pe2',n:'Camila Pereira',bap:''},{id:'pe3',n:'Davi Pereira',bap:''}],pedidos:[]};
const BAT_ST={aguardando:['warning','Aguardando'],confirmado:['success','Confirmado'],realizado:['success','Realizado'],cancelado:['danger','Cancelado']};
const batDate=d=>fmtK(K(d.y,d.m,d.d))+' · '+d.h;
S.bat.pedidos.push({id:'bp0',pessoa:'pe3',n:'Davi Pereira',t:'Batismo nas águas',when:batDate(S.bat.datas[1]),st:'confirmado'});
const batActive=pid=>S.bat.pedidos.find(p=>p.pessoa===pid&&['aguardando','confirmado','realizado'].includes(p.st));
V.batismo=()=>{
 if(S.role==='visitante')return sub('Batismo','Disponível para quem já é membro da igreja.',`<p class="callout" style="margin:0">Quando você for membro, dá para pedir o batismo por aqui. Antes disso, fale com a secretaria.</p>`);
 const P=S.bat.pedidos,open=S.bat.datas.filter(d=>apbDays(d)>=0);
 return {sb:'var(--ink)',html:`${subHead('Batismo','Seu batismo nas águas, com a igreja reunida.')}
 <div class="pad stack g6" style="padding-bottom:24px">
  <section class="apb-hero"><span class="apb-hi">${ic('bucket',22,1.8)}</span><blockquote>“Quem crer e for batizado será salvo.”<cite>Marcos 16:16</cite></blockquote><p>Você pode pedir para você ou para alguém da sua família. A secretaria confirma e avisa por aqui.</p></section>
  ${P.length?`<section class="stack g3"><p class="eb2">Seus pedidos</p>${P.map(p=>{const s=BAT_ST[p.st];return `<article class="card apb-p ${p.st}"><div class="row g3" style="align-items:flex-start"><span class="apb-av">${ic('bucket',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">${esc(p.n)}</span><span class="it-sub">${esc(p.t)} · ${p.when}</span></div>${status(s[0],s[1])}</div>
   ${p.st==='aguardando'?`<p class="apb-note">${ic('clock',14,2)}A secretaria confirma em até 3 dias úteis. Você recebe um aviso aqui no app.</p><button class="tlink" style="align-self:flex-start;padding:0" data-a="batCancel" data-v="${p.id}">Cancelar pedido</button>`:p.st==='confirmado'?`<p class="apb-note ok">${ic('check',14,2.4)}Confirmado. Chegue 30 minutos antes e leve uma muda de roupa.</p><button class="tlink" style="align-self:flex-start;padding:0" data-a="batCancel" data-v="${p.id}">Cancelar inscrição</button>`:''}</article>`;}).join('')}</section>`:''}
  <section class="stack g3"><p class="eb2">Como funciona</p><ol class="steps"><li>Escolha quem vai ser batizado(a) e uma das datas.</li><li>A secretaria confirma o pedido.</li><li>No dia, a igreja celebra o batismo nas águas.</li><li>A secretaria emite a certidão, que chega aqui em Meus documentos.</li></ol>
   <p class="foot">Consagração e casamento não têm pedido pelo app: a secretaria decide e registra.</p></section>
 </div>
 <div class="apb-dock"><button class="btn primary block" data-a="batNew" ${open.length?'':'disabled'}>${open.length?'Pedir batismo':'Sem datas abertas no momento'}</button></div>`};};
APP.push('batismo');SUBS.push('batismo');
Object.assign(A,{
 batNew:()=>{if(S.role==='visitante'){toast('error','Só para membros','Fale com a secretaria para pedir o batismo.');return;}const F={pe:null,dt:null};
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pedir batismo</h3><p class="callout">Escolha quem vai ser batizado(a) e a data.</p></div>
   <div class="stack g3"><p class="eb2">Quem</p>${S.bat.pessoas.map(p=>{const dis=!!p.bap||!!batActive(p.id);return `<button type="button" class="apb-k" data-pe="${p.id}" ${dis?'disabled':''}><span class="apb-av">${ic('bucket',18,1.8)}</span><span class="grow stack" style="gap:2px;align-items:flex-start"><span class="it-title">${esc(p.n)}</span><span class="it-sub">${p.bap?'já batizado(a) em '+p.bap:batActive(p.id)?'já tem pedido':'ainda não batizado(a)'}</span></span>${dis?ic('lock',16,2):'<span class="apb-rd"></span>'}</button>`;}).join('')}</div>
   <div class="stack g3"><p class="eb2">Data</p>${S.bat.datas.filter(d=>apbDays(d)>=0).map(d=>`<button type="button" class="apb-d" data-dt="${d.id}"><span class="apb-dt"><b>${d.d}</b>${MONTHS[d.m-1].slice(0,3)}</span><span class="grow stack" style="gap:2px;align-items:flex-start"><span class="it-title">${esc(d.t)}</span><span class="it-sub">${batDate(d)} · ${esc(d.place)}</span></span></button>`).join('')}</div>
   <div class="stack g3"><button type="button" class="btn primary block" id="btGo" disabled>Enviar pedido</button><button type="button" class="tlink" data-a="closeSheet">Agora não</button></div></div>`,sh=>{
   const go=$('#btGo',sh),upd=()=>{go.disabled=!(F.pe&&F.dt);};
   sh.addEventListener('click',e=>{const a=e.target.closest('[data-pe]'),b=e.target.closest('[data-dt]');
    if(a&&!a.disabled){F.pe=a.dataset.pe;$$('[data-pe]',sh).forEach(x=>x.classList.toggle('on',x===a));upd();}
    if(b){F.dt=b.dataset.dt;$$('[data-dt]',sh).forEach(x=>x.classList.toggle('on',x===b));upd();}});
   go.addEventListener('click',async e=>{await busy(e.currentTarget,700,null,'Pedido enviado');const p=S.bat.pessoas.find(x=>x.id===F.pe),d=S.bat.datas.find(x=>x.id===F.dt);
    S.bat.pedidos.unshift({id:'bp'+Date.now(),pessoa:p.id,n:p.n,t:d.t,when:batDate(d),st:'aguardando'});
    S.notifs.unshift({id:'n'+Date.now(),t:'Pedido de batismo enviado: '+p.n.split(' ')[0],s:d.t+' · '+batDate(d)+'. A secretaria confirma em até 3 dias.',when:'Agora',grp:'Hoje',tone:'ceu',i:'bucket',go:'batismo',unread:true});
    await closeSheet();softRender();toast('success','Pedido enviado','Avisamos aqui quando a secretaria confirmar.');});});},
 batCancel:v=>{const p=S.bat.pedidos.find(x=>x.id===v);
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${p.st==='confirmado'?'Cancelar a participação?':'Cancelar o pedido?'}</h3><p class="callout">${esc(p.n)} · ${p.when}. A secretaria é avisada e você pode pedir outra data quando quiser.</p></div><div class="stack g3"><button type="button" class="btn primary block danger" id="btX">Cancelar pedido</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{
   $('#btX',sh).addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Cancelado');p.st='cancelado';await closeSheet();softRender();toast('info','Cancelado','A secretaria foi avisada.');});});}
});


render('none');
