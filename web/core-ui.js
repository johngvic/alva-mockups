/* ===== Alva async buttons — mesmo padrão do app mobile ===== */
const AWORK={Entrar:'Entrando',Enviar:'Enviando',Salvar:'Salvando',Criar:'Criando',Confirmar:'Confirmando',Adicionar:'Adicionando',Publicar:'Publicando',Aprovar:'Aprovando',Aprovado:'Aprovando',Importar:'Importando',Emitir:'Emitindo',Excluir:'Excluindo',Remover:'Removendo',Desativar:'Desativando',Cancelar:'Cancelando',Rejeitar:'Rejeitando',Registrar:'Registrando',Transferir:'Transferindo',Agendar:'Agendando',Gerar:'Gerando',Reenviar:'Enviando',Lembrar:'Enviando',Marcar:'Salvando',Encerrar:'Encerrando',Continuar:'Carregando',Convidar:'Convidando',Vincular:'Vinculando',Iniciar:'Iniciando',Entrar_:'Entrando',Descartar:'Descartando',Reativar:'Reativando',Duplicar:'Duplicando'};
const ackSvg=`<svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="ckp" d="M5 12.5l4.5 4.5L19 7"/></svg>`;
function aStart(b,ms){if(b.dataset.ahtml!=null)return;const txt=b.textContent.trim(),first=txt.split(/\s+/)[0];b.dataset.ahtml=b.innerHTML;b.style.width=b.getBoundingClientRect().width+'px';b.style.setProperty('--dur',(ms||1100)+'ms');b.classList.add('is-busy');
 b.innerHTML=`<span class="bprog"></span><span class="bl"><i class="bspin"></i>${AWORK[first]||'Um instante'}</span>`;requestAnimationFrame(()=>requestAnimationFrame(()=>b.classList.add('run')));}
function aEnd(b){if(b.dataset.ahtml==null)return;b.innerHTML=b.dataset.ahtml;delete b.dataset.ahtml;b.classList.remove('is-busy','run','is-done');b.style.width='';}
function aDone(b,label){b.classList.add('is-done');b.innerHTML=`<span class="bl bdone">${ackSvg}${esc(label)}</span>`;}
new MutationObserver(ms=>ms.forEach(m=>{const b=m.target;if(!b.classList||!b.classList.contains('btn'))return;const on=b.classList.contains('busy');if(on&&b.dataset.ahtml==null)aStart(b);else if(!on&&b.dataset.ahtml!=null&&!b.classList.contains('is-done')&&!b.dataset.alock)aEnd(b);})).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
function busy(b,ms,label,fn){b.dataset.alock=1;b.style.setProperty('--dur',ms+'ms');b.classList.add('busy');aStart(b,ms);setTimeout(()=>{b.classList.remove('busy');if(b.isConnected){aDone(b,label);}fn&&fn();setTimeout(()=>{if(b.isConnected){delete b.dataset.alock;aEnd(b);}},900);},ms);}
/* botão voltar junto aos breadcrumbs */
function addCrumbBack(){$$('nav.crumb').forEach(n=>{if(n.querySelector('.crumb-bk'))return;const backs=n.querySelectorAll('.lnk.back');if(!backs.length)return;const t=backs[backs.length-1];n.insertAdjacentHTML('afterbegin',`<button class="crumb-bk" data-a="crumbBack" aria-label="Voltar para ${esc(t.textContent.trim())}" title="Voltar para ${esc(t.textContent.trim())}">${ic('chevL',16,2.2)}<span>Voltar</span></button><i class="crumb-sep"></i>`);});}
new MutationObserver(()=>addCrumbBack()).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
const BKA={};BKA.crumbBack=(v,b)=>{const n=b.closest('nav.crumb'),bs=n.querySelectorAll('.lnk.back');bs[bs.length-1].click();};
document.addEventListener('keydown',e=>{if(e.altKey&&e.key==='ArrowLeft'){const b=$('.crumb-bk');if(b){e.preventDefault();b.click();}}});
/* ===== Padrão de lista: busca + filtros sempre no topo do container da lista ===== */
const LSTD={
 oracao:{list:'.pgrid2',move:'.wrap>.chips',item:'.pgrid2>.card',ph:'Buscar pedido ou pessoa'},
 ksalas:{list:'section.card.mtab',item:'.trow:not(.thead)',ph:'Buscar sala ou monitor'},
 ktimes:{list:'.rgrid2',item:'.rgrid2>.card',ph:'Buscar time ou voluntário'},
 kturmas:{list:'section.card.pc',item:'.ages>*',ph:'Buscar turma'},
 redes:{list:'.rgrid2',move:'.wrap>.sbox',item:null},
 multi:{list:'.rgrid2',item:'.rgrid2>.card',ph:'Buscar rede ou igreja'},
 salas:{list:'.sp-grid',item:'.sp-c',ph:'Buscar sala, local ou recurso'},
 acat:{list:'.ax-kg',item:'.ax-kc',ph:'Buscar categoria ou item'},
 aemp:{list:'.ax-lg',item:'.ax-lc',ph:'Buscar item ou pessoa'},
 adev:{list:'section.ax-feed',item:'.ax-fr',ph:'Buscar item ou pessoa'},
 adist:{list:'.ax-dg',item:'.ax-dc',ph:'Buscar destino ou item'},
 amov:{list:'section.ax-tline',item:'.ax-mv',group:'.ax-day',ph:'Buscar item, pessoa ou destino'},
 pregacoes:{list:'.ct-grid',move:'.ct-bar',item:null},
 videos:{list:'.ct-grid,.mempty',move:'.ct-bar',item:null},
 series:{list:'.ct-jg',move:'.ct-bar',item:null},
 jornadas:{list:'.ct-jg',move:'.ct-bar',item:null},
  material:{list:'.mt-grid',move:'.ct-bar',item:null},
  cursos:{list:'.ct-jg,.mempty',move:'.ct-bar',item:null},
 push:{list:'section.card.mtab',item:'.cm-pr',ph:'Buscar envio'},
 banners:{list:'.cm-bgrid',item:'.cm-bc',ph:'Buscar banner'},
 transmissoes:{list:'.cm-chs2',item:'.cm-ch',ph:'Buscar canal'},
 fpag:{list:'section.fi-bills',item:'.fi-bill',group:'.fi-grp',ph:'Buscar conta ou categoria'},
 frec:{list:'.fi-recs',item:'.fi-rc',ph:'Buscar previsão'},
 fapr:{list:'.fi-aps',item:'.fi-ap',ph:'Buscar aprovação ou pessoa'},
 fdoa:{list:'.fi-camps',item:'.fi-cm',ph:'Buscar campanha'},
};
S.lqs=S.lqs||{};
function lstdApply(id){const c=LSTD[id],box=$('#main .lstd');if(!c||!c.item||!box)return;const q=norm(S.lqs[id]||''),its=$$(c.item,box);let n=0;its.forEach(el=>{const ok=!q||norm(el.textContent).includes(q);el.hidden=!ok;if(ok)n++;});if(c.group)$$(c.group,box).forEach(g=>g.hidden=!!q&&!$$(c.item,g).some(x=>!x.hidden));
 let e=box.querySelector('.lstd-empty');if(q&&!n){if(!e){box.insertAdjacentHTML('beforeend',`<div class="mempty lstd-empty"><p>Nada encontrado.</p><span>Nenhum resultado para “<b></b>”.</span></div>`);e=box.querySelector('.lstd-empty');}e.querySelector('b').textContent=S.lqs[id];}else if(e)e.remove();
 const cnt=box.querySelector('.lstd-n');if(cnt)cnt.textContent=q?`${n} de ${its.length}`:`${its.length}`;}
function lstd(){const id=S.active,c=LSTD[id];if(!c||S.auth)return;const w=$('#main .wrap'),list=w&&w.querySelector(c.list);if(!list||list.closest('.lstd'))return;
 let box,bar;const isCard=list.matches('section.card');
 if(isCard){box=list;bar=box.querySelector(':scope>.tbar');}else{box=document.createElement('section');box.className='card mtab lstd-wrap rise';box.style.setProperty('--d','2');list.before(box);box.appendChild(list);list.classList.add('lbody');}
 box.classList.add('lstd');
 if(!bar){bar=document.createElement('div');bar.className='tbar';box.prepend(bar);}
 if(c.move){const mv=w.querySelector(c.move);if(mv&&mv!==list){if(mv.classList.contains('sbox')||mv.classList.contains('chips'))bar.appendChild(mv);else{[...mv.children].forEach(ch=>bar.appendChild(ch));mv.remove();}}}
 if(c.item&&!bar.querySelector('.sbox')){bar.insertAdjacentHTML('afterbegin',`<label class="sbox">${ic('search',16)}<input class="lstd-q" placeholder="${c.ph}" value="${esc(S.lqs[id]||'')}" autocomplete="off" aria-label="${c.ph}"></label>`);
  if(!bar.querySelector('.chips'))bar.insertAdjacentHTML('beforeend',`<span class="lstd-c"><b class="lstd-n"></b> ${c.item.includes('trow')||c.item.includes('fr')||c.item.includes('mv')||c.item.includes('bill')||c.item.includes('pr')?'itens':'cards'}</span>`);
  bar.querySelector('.lstd-q').addEventListener('input',e=>{S.lqs[id]=e.target.value;lstdApply(id);});}
 const sb=bar.querySelector('.sbox');if(sb&&bar.firstElementChild!==sb)bar.prepend(sb);
 if(isCard&&!box.classList.contains('mtab')){const cs=getComputedStyle(box);bar.style.margin=`-${cs.paddingTop} -${cs.paddingRight} 12px -${cs.paddingLeft}`;bar.style.borderRadius='inherit';bar.style.borderBottomLeftRadius=bar.style.borderBottomRightRadius='0';}
 lstdApply(id);}
{const _render=render;render=function(){_render.apply(this,arguments);try{lstd();}catch(e){console.error(e);}};}
/* ---------- toast ---------- */
function toast(msg,undo){$$('#toasts .toast').forEach(t=>{t.classList.add('out');setTimeout(()=>t.remove(),260);});const el=document.createElement('div');el.className='toast';el.innerHTML=`${ic('check',17,2.25)}<span>${esc(msg)}</span>${undo?'<button>Desfazer</button>':''}`;$('#toasts').appendChild(el);
 const kill=()=>{el.classList.add('out');setTimeout(()=>el.remove(),260);};
 if(undo)el.querySelector('button').onclick=()=>{undo();kill();};setTimeout(kill,undo?5000:2800);}

/* ---------- command palette ---------- */
let sel=0,items=[];
function cmdOpen(){$('#scrim').classList.add('open');const i=$('#q');i.value='';cmdList('');setTimeout(()=>i.focus(),30);}
function cmdClose(){$('#scrim').classList.remove('open');}
function cmdList(q){q=q.trim().toLowerCase();
 const areas=AREAS().filter(n=>!q||norm(n[2]+' '+(n[3]||'')).includes(norm(q))).map(n=>({k:'area',id:n[0],icon:n[1],label:n[2],sub:n[3]}));
 const ppl=MEMBERS.filter(p=>q&&norm(p.n).includes(norm(q))).slice(0,6).map(p=>({k:'p',id:p.id,label:p.n,sub:ST[p.st].l+(p.min.length?' · '+p.min.join(', '):'')}));
 const acts=[{k:'act',icon:'userplus',label:'Cadastrar pessoa',sub:'Ação'},{k:'act',icon:'calendar',label:'Criar evento',sub:'Ação'}].filter(a=>!q||a.label.toLowerCase().includes(q));
 items=[...ppl,...areas,...acts];sel=0;
 const sec=(t,arr)=>arr.length?`<div class="pl">${t}</div>${arr.map(it=>{const j=items.indexOf(it);return `<button class="ri ${j===sel?'sel':''}" data-i="${j}">${it.k==='p'?`<span class="av">${it.label.split(' ').map(w=>w[0]).slice(0,2).join('')}</span>`:ic(it.icon,18)}${esc(it.label)}${it.sub?`<small>${esc(it.sub)}</small>`:''}</button>`}).join('')}`:'';
 $('#res').innerHTML=items.length?sec('Pessoas',ppl)+sec('Ir para',areas)+sec('Ações',acts):`<div class="nores">Nada encontrado para “${esc(q)}”.</div>`;}
function cmdPick(i){const it=items[i];if(!it)return;cmdClose();
 if(it.k==='area'){S.active=it.id;render();}
 else if(it.k==='p'){S.active='membros';S.member=it.id;S.tab='geral';render();window.scrollTo({top:0});}
 else toast(`${it.label}: em breve no protótipo`);}
function cmdMove(d){if(!items.length)return;sel=(sel+d+items.length)%items.length;$$('.ri').forEach(b=>b.classList.toggle('sel',+b.dataset.i===sel));$(`.ri[data-i="${sel}"]`)?.scrollIntoView({block:'nearest'});}

/* ---------- actions ---------- */
function closePops(except){$$('.pop.open').forEach(p=>{if(p!==except)p.classList.remove('open');});}

function setDone(id,v){const t=TASKS.find(x=>x.id===id);t.done=v;const el=$('#'+id);el.classList.toggle('gone',v);
 if(v)setTimeout(()=>{if(t.done)el.style.display='none';},380);else el.style.display='';
 $('#allDone').style.display=openCount()?'none':'';
 const n=openCount(),c=$('#cnt');c.textContent=n;c.style.visibility=n?'':'hidden';c.animate([{transform:'scale(1.3)'},{transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
 $('#undoAll').style.display=n<3&&n>0?'':'none';$('#lede').innerHTML=lede(n);softSide();}
