/* ================= Ingressos: compras adicionais ligadas a cada ingresso + política de reembolso ================= */
/* Modelo: o catálogo de compras adicionais continua no card lateral (vale para todos os ingressos).
   Cada ingresso decide, por item, se NÃO oferece (t.skip), se VENDE (com preço próprio opcional, t.px) ou se INCLUI (t.incl).
   Pacotes exclusivos nascem dentro do ingresso (item.tk = id do ingresso). */
const itPx=(e,it,t)=>t&&t.px&&t.px[it.id]!=null&&t.px[it.id]!==''?(+t.px[it.id]||0):(+it.price||0);
const itOff=(e,it,t)=>!!t&&!it.off&&(!it.tk||it.tk===t.id)&&!(t.skip||[]).includes(it.id)&&!(t.incl||[]).includes(it.id);
const tkOffers=(e,t)=>(e.items||[]).filter(i=>itOff(e,i,t));
const itTkName=(e,it)=>{const t=(e.tickets||[]).find(x=>x.id===it.tk);return t?t.n:'';};
regTot=function(e,r){const t=tkOf(e,r);return (+r.val||0)+buyOf(e,r).reduce((a,i)=>a+itPx(e,i,t),0);};
regCalc=function(e,st,m){
 const t=e.tickets.find(x=>x.id===st.tk),base=t?tkPrice(e,t):0,code=(st.vc||'').trim().toUpperCase(),vc=code?e.vouchers.find(x=>x.code===code):null;
 let err='',disc=0;
 if(code&&!vc)err='Voucher não encontrado neste evento';
 else if(vc&&vc.exp&&inDays(vc.exp)<0)err=`Expirou em ${dBR(vc.exp)}`;
 else if(vc&&vc.mode==='especifico'&&m&&vc.email!==m.e)err=`Este voucher é só para ${vc.email}`;
 else if(vc)disc=vDisc(vc,base);
 const adds=[...st.buy].map(id=>itById(e,id)).filter(i=>i&&t&&itOff(e,i,t)),add=adds.reduce((a,i)=>a+itPx(e,i,t),0);
 return {t,base,vc,code,disc,err,adds,add,val:base-disc,tot:base-disc+add};
};

/* ---------- diálogo do ingresso ---------- */
tkDlg=function(tid){
 const e=eById(S.evt);evEnsure(e);const t=tid?e.tickets.find(x=>x.id===tid):null,id=t?t.id:'tk'+(++_tkn),sold=t?tkSold(e,t):0,money=e.paid,per=e.checkin==='periodo'&&e.periods.length,ed=!!t;
 const pool=e.items.filter(i=>(!i.tk||i.tk===id)&&(!i.off||(t&&(t.incl||[]).includes(i.id)))),staged=[],ad={};
 pool.forEach(i=>{const inc=t&&(t.incl||[]).includes(i.id),off=t&&(t.skip||[]).includes(i.id);ad[i.id]={m:inc?'incl':off?'off':'sell',p:i.tk?String(i.price):(t&&t.px&&t.px[i.id]!=null?String(t.px[i.id]):'')};});
 const all=()=>[...pool,...staged];let cur=0;
 const row=i=>{const s=ad[i.id],ex=!!i.tk;return `<div class="tg-ad ${s.m}" data-id="${i.id}"><span class="tg-adn"><b>${esc(i.n)}${ex?'<em class="tg-ex">só neste ingresso</em>':''}</b><small>${esc(i.p||'Evento inteiro')} · ${ex?'pacote do ingresso':'catálogo '+brl(i.price)}</small></span>
  <span class="cm-q tg-adm" role="group" aria-label="${esc(i.n)}">${[['off','Não'],['sell','Vender'],['incl','Incluso']].map(([k,l])=>`<button type="button" data-m="${k}" class="${s.m===k?'on':''}">${l}</button>`).join('')}</span>
  <span class="mpre sm tg-adp" ${s.m==='sell'?'':'hidden'}><em>R$</em><input type="number" min="0" step="0.01" inputmode="decimal" value="${esc(s.p)}" placeholder="${ex?'0,00':String(i.price).replace('.',',')}" aria-label="Preço de ${esc(i.n)} neste ingresso"></span>
  <span class="tg-adx">${staged.includes(i)?`<button type="button" class="ibtn sm" data-del="${i.id}" aria-label="Remover pacote" title="Remover">${ic('x',14)}</button>`:''}</span></div>`;};
 const paintAd=()=>{const box=$('#tgAd');box.innerHTML=all().length?all().map(row).join(''):`<p class="who" style="margin:0 0 4px">Nenhuma compra adicional ainda. Crie um pacote só para este ingresso abaixo, ou cadastre itens para todos em “Compras adicionais”.</p>`;};
 openDlg(`${dlgHead(ed?'Editar ingresso':'Novo ingresso',esc(e.t))}
  <div class="evs-steps tg-steps">${['Ingresso','Compras adicionais'].map((l,i)=>`<button type="button" class="evs-st" data-go="${i}"><span>${i+1}</span><em>${l}</em></button>`).join('')}</div>
  <form class="tg-form" id="tgF" novalidate>
  <div class="tg-pane evs-g" data-p="0">
   <label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: VIP" value="${esc(t?t.n:'')}" autocomplete="off"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><input name="desc" placeholder="Ex.: Lugar na frente e kit de boas-vindas" value="${esc(t?t.desc||'':'')}" autocomplete="off"></label>
   ${money?`<label class="fld"><span class="fl">Valor</span><span class="mpre"><em>R$</em><input name="price" type="number" min="0" step="0.01" inputmode="decimal" value="${t?t.price:''}" placeholder="0,00"></span><span class="err"></span></label>`:''}
   <label class="fld ${money?'':'wide'}"><span class="fl">Vagas <small>opcional</small></span><input name="cap" type="number" min="1" inputmode="numeric" value="${t&&t.cap?t.cap:''}" placeholder="Sem limite"><span class="err"></span>${sold?`<span class="hint">${sold} ${sold===1?'inscrito':'inscritos'} neste ingresso</span>`:''}</label>
   ${per?`<div class="fld wide"><span class="fl">Vale para <small>sem marcar, vale para o evento todo</small></span><div class="tg-inc">${e.periods.map(p=>`<label class="tg-ic"><input type="checkbox" name="per" value="${esc(p)}" ${t&&t.per.includes(p)?'checked':''}><span><b>${esc(p)}</b></span></label>`).join('')}</div></div>`:''}
  </div>
  <div class="tg-pane" data-p="1" hidden>
   <div class="tg-how"><p class="tg-lead">O que a pessoa pode comprar com este ingresso?</p><div class="tg-modes">
    <div class="tg-mode sell"><span class="tg-mi">${ic('wallet',16,2)}</span><b>Vender</b><small>Aparece na inscrição. Preço do catálogo ou um valor só deste ingresso.</small></div>
    <div class="tg-mode incl"><span class="tg-mi">${ic('gift',16,2)}</span><b>Incluso</b><small>Já vem no ingresso, sem custo extra.</small></div>
    <div class="tg-mode off"><span class="tg-mi">${ic('pause',16,2)}</span><b>Não</b><small>Fica escondido para quem escolher este ingresso.</small></div></div></div>
   <div class="tg-adl" id="tgAd"></div>
   <div class="tg-new" id="tgNew"><span class="tg-newh">${ic('plus',13,2.2)}Novo pacote só para este ingresso</span><div class="tg-newf"><input id="npN" placeholder="Ex.: Pacote família" aria-label="Nome do pacote" autocomplete="off"><span class="mpre sm"><em>R$</em><input id="npP" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00" aria-label="Preço do pacote"></span>${per?`<span class="selw"><select id="npV" aria-label="Vale para"><option value="">Evento inteiro</option>${e.periods.map(p=>`<option>${esc(p)}</option>`).join('')}</select>${ic('updown',13)}</span>`:''}<button type="button" class="btn sec sm" id="npA">Adicionar</button></div></div>
  </div>
  <div class="dfoot evs-foot" id="tgFoot"></div></form>`,'lg');
 const f=$('#tgF'),bad=(n,m)=>{const el=f.elements[n],fl=el.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;el.focus();};
 const draw=()=>{f.querySelectorAll('.tg-pane').forEach(x=>x.hidden=+x.dataset.p!==cur);
  $$('.tg-steps .evs-st').forEach((b,i)=>{b.classList.toggle('on',i===cur);b.classList.toggle('done',i<cur);b.firstChild.innerHTML=i<cur?ic('check',11,3):i+1;});
  const save=`<button type="submit" class="btn pri">${ed?'Salvar':'Criar ingresso'}</button>`;
  $('#tgFoot').innerHTML=cur===0?`<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><span class="evs-fr"><button type="button" class="btn ${ed?'sec':'pri'}" data-next>Continuar${ic('arrowR',14,2)}</button>${ed?save:''}</span>`
   :`<button type="button" class="btn sec" data-back>${ic('chevL',14,2)}Voltar</button>${save}`;
  const first=cur===0?f.elements.n:$('#npN');if(first&&cur===1)first.blur();};
 const check0=()=>{const n=f.elements.n.value.trim();
  if(!n){bad('n','Informe o nome');return false;}
  if(e.tickets.some(o=>o!==t&&norm(o.n)===norm(n))){bad('n','Já existe um ingresso com esse nome');return false;}
  if(money){if(f.elements.price.value===''){bad('price','Informe o valor (0 para gratuito)');return false;}if(!(+f.elements.price.value>=0)){bad('price','Valor inválido');return false;}}
  const cap=+f.elements.cap.value||0;if(cap&&cap<sold){bad('cap',`Já há ${sold} inscritos; as vagas não podem ser menos que isso`);return false;}return true;};
 const go=i=>{if(i>cur&&!check0()){cur=0;draw();return;}cur=i;draw();};
 paintAd();draw();
 f.parentNode.querySelector('.tg-steps').addEventListener('click',x=>{const b=x.target.closest('[data-go]');if(b)go(+b.dataset.go);});
 f.addEventListener('input',x=>{x.target.closest('.fld')?.classList.remove('bad');const r=x.target.closest('.tg-ad');if(r&&x.target.type==='number')ad[r.dataset.id].p=x.target.value;});
 f.addEventListener('click',x=>{const b=x.target.closest('button');if(!b)return;
  if('next' in b.dataset){go(1);return;}if('back' in b.dataset){go(0);return;}
  if(b.dataset.m){const r=b.closest('.tg-ad'),s=ad[r.dataset.id];s.m=b.dataset.m;r.className='tg-ad '+s.m;r.querySelectorAll('.tg-adm button').forEach(y=>y.classList.toggle('on',y===b));r.querySelector('.tg-adp').hidden=s.m!=='sell';return;}
  if(b.dataset.del){const i=staged.findIndex(y=>y.id===b.dataset.del);if(i>=0){staged.splice(i,1);delete ad[b.dataset.del];paintAd();}return;}
  if(b.id==='npA')addNew();});
 const addNew=()=>{const n=$('#npN').value.trim(),p=$('#npP').value;if(!n){$('#npN').focus();return;}if(p===''||!(+p>=0)){$('#npP').focus();toast('Informe o preço do pacote');return;}
  if(all().some(i=>norm(i.n)===norm(n)&&(i.p||'')===(($('#npV')||{}).value||''))){toast('Esse item já existe');return;}
  const it={id:'it'+(++_tkn),n,price:+p,p:($('#npV')||{}).value||'',tk:id};staged.push(it);ad[it.id]={m:'sell',p:String(+p)};$('#npN').value='';$('#npP').value='';paintAd();$('#npN').focus();};
 f.addEventListener('keydown',x=>{if(x.key==='Enter'&&(x.target.id==='npN'||x.target.id==='npP')){x.preventDefault();addNew();}});
 f.addEventListener('submit',x=>{x.preventDefault();
  if(cur===0&&!ed){go(1);return;}
  if(!check0()){cur=0;draw();check0();return;}
  const n=f.elements.n.value.trim(),price=money?+f.elements.price.value:(t?t.price:0),cap=+f.elements.cap.value||0;
  for(const i of all()){const s=ad[i.id];if(s.m==='sell'&&s.p!==''&&!(+s.p>=0)){cur=1;draw();toast(`Preço inválido em ${i.n}`);return;}if(s.m==='sell'&&i.tk&&!(+s.p>0)){cur=1;draw();toast(`Informe o preço de ${i.n}`);return;}}
  const pers=[...f.querySelectorAll('input[name=per]:checked')].map(i=>i.value),incl=[],skip=[],px={};
  all().forEach(i=>{const s=ad[i.id];if(s.m==='incl')incl.push(i.id);else if(s.m==='off')skip.push(i.id);else if(!i.tk&&s.p!==''&&+s.p!==+i.price)px[i.id]=+s.p;if(i.tk&&s.m!=='off'&&s.p!=='')i.price=+s.p;});
  staged.forEach(i=>e.items.push(i));
  const d={n,desc:f.elements.desc.value.trim(),price,cap,incl,skip,px,per:pers};
  if(t)Object.assign(t,d);else e.tickets.push({id,off:false,...d});
  evSync(e);closeDlg();rerEv();toast(t?`${n} atualizado`:`${n} criado`);});
 setTimeout(()=>f.elements.n.focus(),80);
};

/* ---------- card lateral: mostra o vínculo de cada item ---------- */
{const o=evDet;evDet=function(e){let h=o.apply(this,arguments);if(!e.items||!e.items.length)return h;
 h=h.replace('Itens que a pessoa pode comprar junto com o ingresso','Catálogo para todos os ingressos. Para preço diferente, incluir no pacote ou criar itens exclusivos, edite o ingresso');
 e.items.forEach(it=>{const px=e.tickets.filter(t=>t.px&&t.px[it.id]!=null&&+t.px[it.id]!==+it.price).length,skip=e.tickets.filter(t=>!it.tk&&(t.skip||[]).includes(it.id)).length,ex=it.tk?itTkName(e,it):'';
  const extra=`${ex?` · só em ${esc(ex)}`:''}${px?` · preço especial em ${px} ${px===1?'ingresso':'ingressos'}`:''}${skip?` · fora de ${skip} ${skip===1?'ingresso':'ingressos'}`:''}`;
  if(!extra)return;
  const at=h.indexOf(`data-a="evItemDel" data-v="${it.id}"`);if(at<0)return;const from=h.lastIndexOf('</small>',at);if(from<0)return;h=h.slice(0,from)+extra+h.slice(from);});
 return h;};}

/* ---------- inscrição manual: só as compras que o ingresso escolhido oferece, com o preço dele ---------- */
A.evReg=()=>{const e=eById(S.evt);evEnsure(e);
 if(e.cap&&e.regs.length>=e.cap){toast('Vagas esgotadas. Aumente as vagas para inscrever mais pessoas.');return;}
 const tks=e.tickets.filter(t=>!t.off);if(e.paid&&!tks.length){toast('Nenhum ingresso à venda. Crie ou retome um ingresso primeiro.');return;}
 const cand=MEMBERS.filter(m=>!e.regs.some(r=>r.n===m.n)),st={tk:tks.length?(tks.find(t=>!tkFull(e,t))||tks[0]).id:'',buy:new Set(),vc:''};
 openDlg(`${dlgHead('Adicionar inscrição',esc(e.t))}<div id="rgW"><label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="rq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="rpk" style="max-height:170px">${candList(cand,'')}</div>
  ${tks.length?`<p class="fl tg-h">Ingresso</p><div class="tg-opts">${tks.map(t=>`<label class="tg-o ${tkFull(e,t)?'off':''}"><input type="radio" name="tk" value="${t.id}" ${st.tk===t.id?'checked':''} ${tkFull(e,t)?'disabled':''}><span><b>${esc(t.n)}</b><small>${tkFull(e,t)?'Esgotado':esc([t.desc,tkInclTxt(e,t).length?'Inclui '+tkInclTxt(e,t).join(', '):''].filter(Boolean).join(' · '))||'&nbsp;'}</small></span><b class="mono">${brl(tkPrice(e,t))}</b></label>`).join('')}</div>`:''}
  <div id="rgAdW"></div>
  ${e.paid&&e.vouchers.length?`<label class="fld" style="margin-top:14px"><span class="fl">Voucher <small>opcional</small></span><input id="rv" class="mono" placeholder="Ex.: ${esc(e.vouchers[0].code)}" autocomplete="off" style="text-transform:uppercase"><span class="err"></span></label>`:''}
  <div id="rtot"></div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="evRegDo">Inscrever</button></div></div>`,'sm');
 const W=$('#rgW'),member=()=>{const s=$('input[name=pm]:checked');return s?byId(s.value):null;};
 const adHtml=()=>{const t=e.tickets.find(x=>x.id===st.tk),off=t?tkOffers(e,t):e.items.filter(i=>!i.off&&!i.tk),inc=t?e.items.filter(i=>(t.incl||[]).includes(i.id)):[];
  [...st.buy].forEach(id=>{if(!off.some(i=>i.id===id))st.buy.delete(id);});
  if(!off.length&&!inc.length)return '';
  return `<p class="fl tg-h">Compras adicionais <small>opcional</small></p><div class="tg-opts" id="rgAd">${inc.map(i=>`<label class="tg-o off"><input type="checkbox" disabled><span><b>${esc(i.n)}</b><small>Já incluso neste ingresso</small></span><b class="mono">Incluso</b></label>`).join('')}${off.map(i=>{const sp=t&&t.px&&t.px[i.id]!=null&&+t.px[i.id]!==+i.price;return `<label class="tg-o"><input type="checkbox" value="${i.id}" ${st.buy.has(i.id)?'checked':''}><span><b>${esc(i.n)}</b><small>${esc(i.p||'Evento inteiro')}${sp?` · preço deste ingresso (normal ${brl(i.price)})`:''}</small></span><b class="mono">${brl(itPx(e,i,t))}</b></label>`;}).join('')}</div>`;};
 const paint=()=>{$('#rgAdW').innerHTML=adHtml();const c=regCalc(e,st,member());$('#rtot').innerHTML=regTotHtml(e,c);const rv=$('#rv');if(rv){const fl=rv.closest('.fld');fl.classList.toggle('bad',!!c.err&&!!c.code);fl.querySelector('.err').textContent=c.code?c.err:'';}};
 $('#rq').addEventListener('input',x=>{$('#rpk').innerHTML=candList(cand,x.target.value);});
 W.addEventListener('change',x=>{const t=x.target;if(t.name==='tk')st.tk=t.value;else if(t.closest('#rgAd')){t.checked?st.buy.add(t.value):st.buy.delete(t.value);}paint();});
 const rv=$('#rv');if(rv)rv.addEventListener('input',()=>{st.vc=rv.value;paint();});
 W._st=st;paint();};

/* dados de demonstração: preço próprio por ingresso e pacote exclusivo */
(function evSeed2(){const m=EVTS.find(x=>x.t==='Conferência de Mulheres');if(!m||m._s2)return;m._s2=1;
 const a=m.tickets.find(t=>t.id==='tkMa'),c=m.tickets.find(t=>t.id==='tkMc'),b=m.tickets.find(t=>t.id==='tkMb');
 a.px={itMc:12,itMa:30};b.px={itMa:30};
 m.items.push({id:'itMj',n:'Jantar de encerramento',price:45,p:'',tk:c.id});
 a.skip=['itMk'];b.skip=['itMk'];})();

/* ---------- política de reembolso ---------- */
rfHtml=function(e){const R=rfOf(e),cu=R.mode==='custom',err=cu?rfCheck(e):'';
 const tone=p=>p>=100?'full':p>0?'part':'none';
 const step=(when,p,txt,edit)=>`<li class="rf-s ${tone(p)}"><span class="rf-dot"></span><div class="rf-w">${when}${txt?`<small>${txt}</small>`:''}</div><div class="rf-p">${edit||`<b>${p}%</b>`}<span class="rf-bar"><i style="width:${Math.max(0,Math.min(100,p))}%"></i></span></div></li>`;
 const steps=cu?R.bands.map((b,i)=>step(`<span class="rf-lead">Até</span><label class="rf-f"><input type="number" min="1" value="${b.n}" data-rf="n|${i}" aria-label="Prazo"></label><span class="selw rf-u"><select data-rf="u|${i}" aria-label="Unidade"><option value="horas" ${b.u==='horas'?'selected':''}>horas</option><option value="dias" ${b.u==='dias'?'selected':''}>dias</option></select>${ic('updown',13)}</span><span class="rf-lead">antes do início</span>`,b.p,'',`<label class="rf-f rf-pc"><input type="number" min="0" max="100" value="${b.p}" data-rf="p|${i}" aria-label="Percentual devolvido"><em>%</em></label><button type="button" class="ibtn sm rf-x" data-a="rfDel" data-v="${i}" aria-label="Remover faixa" title="Remover faixa" ${R.bands.length<2?'disabled':''}>${ic('x',14)}</button>`)).join('')+step('<b>Depois da última faixa</b>',0,'não há reembolso')
  :step('<b>Até 24 horas antes do início</b>',100,'reembolso total')+step('<b>Depois disso</b>',0,'não há reembolso');
 return `<section class="card pc rfp"><div class="sh"><h2>Política de reembolso</h2><span class="rf-saved">${ic('check',12,2.6)}Salva sozinha</span></div>
  <p class="who" style="margin:-6px 0 14px">Vale para quem cancela a compra. O reembolso sai pelo provedor de pagamento.</p>
  <div class="yn pillt" id="rfG"><label><input type="radio" name="rfm" value="simples" ${cu?'':'checked'}><span>Simples</span></label><label><input type="radio" name="rfm" value="custom" ${cu?'checked':''}><span>Personalizada</span></label></div>
  <ol class="rf-steps">${steps}</ol>
  ${cu?`<button type="button" class="rf-add" data-a="rfAdd">${ic('plus',14,2.2)}Adicionar faixa</button>`:''}
  ${err?`<div class="rgwarn" style="margin-top:12px">${ic('alert',14,2)}${err}</div>`:''}
  <div class="rf-note">${ic('shield',16,2)}<span><b>Direito de arrependimento.</b> Em qualquer política, quem se arrepende em até 7 dias depois da compra, e ainda não fez check-in, tem direito ao reembolso integral.</span></div></section>`;};
