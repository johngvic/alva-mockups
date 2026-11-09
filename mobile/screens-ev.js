
/* =========================================================
   AGENDA › EVENTOS · check-in na porta e ingressos (como no web)
   Aparecem como dois botões na ficha do evento.
   ========================================================= */
{
const TK={};
const tkOf=n=>TK[n]||(TK[n]=n==='Conferência Anual 2026'?[{n:'Inscrição geral',p:'80,00',q:120,s:84},{n:'Estudante',p:'40,00',q:30,s:12}]:[]);
const insOf=r=>LSD.agenda['Inscrições'].rows.filter(x=>x.v&&x.v.evento===r.n&&x.st!=='ca');
const ckLine=(x,i)=>`<div class="vr">${pavM(x.n,lsAv[i%6])}<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(x.n)}</span><span class="vs">${x.ck?'Presente':'Aguardando'}</span></span><button class="btn ${x.ck?'primary':'outline'} sm" data-a="evCkT" data-v="${x.id}" id="ck-${x.id}">${x.ck?'Presente':'Check-in'}</button></div>`;
const CK={tab:'cam',res:null,code:false},CKP='Recepção';
Object.assign(I,{
 printer:'<path d="M6 9V3h12v6"/><rect x="6" y="14" width="12" height="7"/><path d="M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/>',
 scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>'
});
const CKR={ok:['ok','Entrada liberada'],used:['warning','Já usado'],pend:['warning','Pagamento pendente'],bad:['danger','Código inválido']};
const ckRes=id=>{const x=CK.res;if(!x)return '';const [tn,tt]=CKR[x.k],p=x.p;
 const d=x.k==='ok'?esc(p.n)+' · '+esc(p.v&&p.v.evento||''):x.k==='used'?esc(p.n)+' entrou às '+p.ck:x.k==='pend'?esc(p.n)+' · libera quando o pagamento confirmar':'Esse código não pertence a este evento.';
 return `<div class="stack g3"><div class="vr">${vsTag(tn,tt)}<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${tt}</span><span class="vs">${d}</span></span></div>
  ${x.k==='ok'?`<button class="btn primary md block" data-a="evCkOk" data-v="${id}|print">${ic('printer',18,2)}Confirmar e imprimir etiqueta</button><button class="btn outline md block" data-a="evCkOk" data-v="${id}|no">Confirmar sem imprimir</button>`:''}</div>`;};
function ckSheet(id){const r=lsRow(id),l=insOf(r),n=l.filter(x=>x.ck).length,pct=l.length?Math.round(n/l.length*100):0;
 const tabs=`<div class="utabs ul" role="tablist">${[['cam','Câmera'],['lista','Lista'],['auto','Autoatendimento']].map(([k,t])=>`<button role="tab" aria-selected="${CK.tab===k}" data-a="evCkTab" data-v="${id}|${k}">${t}</button>`).join('')}</div>`;
 let body='';
 if(CK.tab==='cam')body=`<div class="vf"><div class="vf-fr"></div><div class="vf-ln"></div><span class="vf-hint">Aponte para o QR Code do ingresso</span></div>
  <button class="btn primary md block" data-a="evCkSim" data-v="${id}|ok">${ic('scan',18,2)}Simular leitura</button>${ckRes(id)}
  ${CK.code?`<div class="stack g3">${field({id:'ckc',label:'Código do ingresso ou nome',ph:'Ex.: Carlos Mendes'})}<button class="btn outline md block" data-a="evCkType" data-v="${id}">Buscar</button></div>`:`<button class="tlink" data-a="evCkCode" data-v="${id}">Digitar o código</button>`}
  <div class="stack g2"><p class="eb2">Demonstração: outros resultados</p><div class="row g2" style="flex-wrap:wrap"><button class="btn outline sm" data-a="evCkSim" data-v="${id}|used">Já usado</button><button class="btn outline sm" data-a="evCkSim" data-v="${id}|pend">Pagamento pendente</button><button class="btn outline sm" data-a="evCkBad" data-v="${id}">Código inválido</button></div></div>`;
 else if(CK.tab==='lista')body=l.length?`<div class="vl">${l.map(ckLine).join('')}</div>`:vsEmpty('Sem inscritos','As inscrições deste evento aparecem aqui.');
 else body=`<div class="stack g4"><p class="callout">O participante lê o QR da impressora com o app do Alva. O Alva confere a inscrição e a etiqueta sai sozinha, sem fila na porta.</p>
  <div class="vl">${['O participante abre o ingresso no app e toca em Ler QR da impressora','O Alva confere a inscrição e o pagamento','A etiqueta sai na impressora '+CKP].map((t,i)=>`<div class="vr"><b>${i+1}</b><span class="grow vn" style="white-space:normal">${t}</span></div>`).join('')}</div>
  <button class="btn primary md block" data-a="evCkQr" data-v="${id}">${ic('printer',18,2)}Mostrar QR da impressora</button></div>`;
 sheet(`<div class="stack g5"><div class="row between" style="align-items:baseline"><h3 class="t2">Check-in</h3><span class="vs" id="ckN">${n} de ${l.length} entradas</span></div><p class="callout">${esc(r.n)}</p>
  <span class="ckbar"><i id="ckBar" style="width:${pct}%"></i></span>
  <div class="gnote"><b>Impressora ${CKP}</b><span>Conectada · a etiqueta sai ao confirmar a entrada</span></div>${tabs}${body}
  <button class="btn outline md block" data-a="lsOpen" data-v="${id}">Voltar</button></div>`);}
Object.assign(A,{
 evCk:id=>{CK.tab='cam';CK.res=null;CK.code=false;ckSheet(id);},
 evCkTab:v=>{const [id,k]=v.split('|');CK.tab=k;CK.res=null;CK.code=false;ckSheet(id);},
 evCkCode:id=>{CK.code=true;ckSheet(id);},
 /* leitura simulada do QR do ingresso: ok | used | pend; a equipe vê o resultado e confirma */
 evCkSim:v=>{const [id,k]=v.split('|'),l=insOf(lsRow(id));let p=null;
  if(k==='ok'){p=l.find(x=>!x.ck&&x.st==='cf');if(!p){toast('info','Sem códigos para ler','Todos já entraram ou estão pendentes.');return;}}
  else if(k==='used'){p=l.find(x=>x.ck);if(!p){toast('info','Ninguém entrou ainda','Leia um código válido primeiro.');return;}}
  else if(k==='pend'){p=l.find(x=>x.st==='pe');if(!p){toast('info','Sem pendências','Todos os pagamentos estão confirmados.');return;}}
  CK.res={k,p};CK.code=false;ckSheet(id);},
 evCkBad:id=>{CK.res={k:'bad'};CK.code=false;ckSheet(id);},
 evCkType:id=>{const v=(val('ckc')||'').trim();if(!v){toast('error','Digite o código','Informe o código do ingresso ou o nome.');return;}
  const p=insOf(lsRow(id)).find(x=>norm2(x.n).includes(norm2(v)));CK.res=p?{k:p.ck?'used':p.st==='pe'?'pend':'ok',p}:{k:'bad'};CK.code=false;ckSheet(id);},
 evCkOk:v=>{const [id,m]=v.split('|'),p=CK.res&&CK.res.p;if(!p)return;p.ck=new Date().toTimeString().slice(0,5);CK.res=null;ckSheet(id);
  toast('success','Entrada registrada',p.n+(m==='print'?' · etiqueta enviada para a impressora '+CKP+'.':''));},
 evCkQr:id=>{sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">QR da impressora</h3><p class="callout">Impressora ${CKP} · ${esc(lsRow(id).n)}</p></div>
  <div class="qr ckqr">${qrSVG('ALVA-PRN-'+CKP+'-'+id)}</div><p class="vs" style="text-align:center;white-space:normal">Quem se inscreveu lê este QR com o app do Alva e a etiqueta sai sozinha. O QR muda a cada 2 minutos, por isso fica numa tela e não impresso na parede.</p>
  <button class="btn outline md block" data-a="evCk" data-v="${id}">Voltar ao check-in</button></div>`);},
 evCkT:iid=>{const x=LSD.agenda['Inscrições'].rows.find(y=>y.id===iid);x.ck=x.ck?'':new Date().toTimeString().slice(0,5);const b=$('#ck-'+iid);if(b){b.className='btn '+(x.ck?'primary':'outline')+' sm';b.textContent=x.ck?'Presente':'Check-in';b.previousElementSibling.lastElementChild.textContent=x.ck?'Presente':'Aguardando';}
  const l=insOf({n:x.v.evento}),n=$('#ckN'),bar=$('#ckBar'),c=l.filter(y=>y.ck).length;if(n)n.textContent=c+' de '+l.length+' entradas';if(bar)bar.style.width=(l.length?Math.round(c/l.length*100):0)+'%';},
 evTk:id=>{const r=lsRow(id),l=tkOf(r.n);
  sheet(`<div class="stack g5"><h3 class="t2">Ingressos</h3><p class="callout">${esc(r.n)}</p>
  ${l.length?`<div class="vl">${l.map(t=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(t.n)}</span><span class="vs">R$ ${t.p} · ${t.s} de ${t.q} vendidos</span></span>${vsTag(t.s>=t.q?'off':'ok',t.s>=t.q?'Esgotado':'À venda')}</div>`).join('')}</div>`:vsEmpty('Sem ingressos','Os ingressos são criados na web.')}
  <button class="btn outline md block" data-a="lsOpen" data-v="${id}">Voltar</button><p class="vs">Criar, pausar e excluir ingresso fica na web.</p></div>`);}

});
}
