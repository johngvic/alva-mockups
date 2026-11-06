/* ---------- toast ---------- */
const TI={success:['check','var(--success-fill)','var(--success-ink)'],error:['x','var(--danger-fill)','var(--danger-ink)'],info:['info','var(--info-fill)','var(--info-ink)']};
function toast(type,title,msg){
 const box=$('#toasts');const t=document.createElement('div');const c=TI[type]||TI.info;
 t.className='toast';t.setAttribute('role',type==='error'?'alert':'status');
 t.innerHTML=`<span class="tico" style="background:${c[1]};color:${c[2]}">${ic(c[0],15,2.5)}</span><div class="grow"><b>${esc(title)}</b>${msg?`<span style="opacity:.8">${esc(msg)}</span>`:''}</div>`;
 box.appendChild(t);while(box.children.length>2)box.firstChild.remove();
 const kill=()=>{t.classList.add('out');setTimeout(()=>t.remove(),260)};
 t.addEventListener('click',kill);setTimeout(kill,type==='error'?4200:3200);
}
/* ---------- sheet ---------- */
function sheet(html,onMount){
 const o=$('#overlay');
 o.innerHTML=`<div class="scrim" data-a="closeSheet" data-self="1"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div></div>`;
 onMount&&onMount($('.sheet',o));
 const f=$('.sheet input,.sheet textarea',o);if(f&&!f.readOnly)setTimeout(()=>f.focus({preventScroll:true}),340);
}
function closeSheet(){const o=$('#overlay');const sc=$('.scrim',o);if(!sc)return Promise.resolve();sc.classList.add('closing');$('.sheet',o).classList.add('closing');return wait(210).then(()=>{o.innerHTML=''});}
function overlayLoading(text){const o=$('#overlay');o.innerHTML=`<div class="loading-over" role="status" aria-live="polite"><div class="ld"><span class="ld-glow"></span>${splashSVG()}</div><p class="ld-t">${esc(String(text).replace(/…$/,''))}<span class="ld-d"><i></i><i></i><i></i></span></p><span class="ld-bar"><i></i></span></div>`;}

/* ---------- forms ---------- */
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function field(o){
 const {id,label,type='text',ph='',val='',hint='',ac='',im='',reveal=false,area=false,max=''}=o;
 return `<div class="field" id="f-${id}"><label for="${id}">${label}</label><div class="fbox">${o.icon?ic(o.icon,20):''}${area?`<textarea id="${id}" placeholder="${esc(ph)}" maxlength="${max||500}">${esc(val)}</textarea>`:`<input id="${id}" type="${type}" placeholder="${esc(ph)}" value="${esc(val)}" ${ac?`autocomplete="${ac}"`:''} ${im?`inputmode="${im}"`:''} ${max?`maxlength="${max}"`:''}>`}${reveal?`<button type="button" class="eyebtn" data-a="reveal" data-v="${id}" aria-label="Mostrar senha" aria-pressed="false">${ic('eye',20,1.75)}</button>`:''}</div><span class="hint" data-hint="${esc(hint)}">${esc(hint)}</span></div>`;
}
function setErr(id,msg){const f=$('#f-'+id);if(!f)return;f.classList.add('invalid');const h=$('.hint',f);h.innerHTML=ic('alert',14,2)+'<span>'+esc(msg)+'</span>';f.classList.remove('shake');void f.offsetWidth;f.classList.add('shake');}
function clearErr(id){const f=$('#f-'+id);if(!f||!f.classList.contains('invalid'))return;f.classList.remove('invalid');const h=$('.hint',f);h.textContent=h.dataset.hint||'';}
const WORK={Falar:'Conectando',Entrar:'Entrando',Enviar:'Enviando',Salvar:'Salvando',Criar:'Criando',Confirmar:'Confirmando',Quero:'Enviando',Contribuir:'Processando',Pagar:'Processando',Continuar:'Buscando',Buscar:'Buscando',Aceitar:'Confirmando',Recusar:'Enviando',Bloquear:'Bloqueando',Inscrever:'Reservando','Inscrever-se':'Reservando',Concluir:'Salvando',Solicitar:'Enviando','Já':'Verificando',Cancelar:'Cancelando',Entrar_:'Entrando'};
async function busy(btn,ms,fn,done){if(!btn)return;const html=btn.innerHTML,txt=btn.textContent.trim();const w=btn.getBoundingClientRect().width;const first=txt.split(/\s+/)[0];const work=WORK[first]||'Um instante';
 if(!btn.classList.contains('block'))btn.style.width=w+'px';btn.disabled=true;btn.classList.add('is-busy');btn.style.setProperty('--dur',ms+'ms');
 btn.innerHTML=`<span class="bprog"></span><span class="bl"><i class="bspin"></i>${work}</span>`;
 requestAnimationFrame(()=>requestAnimationFrame(()=>btn.classList.add('run')));
 await wait(ms);
 if(done&&btn.isConnected){btn.classList.add('is-done');btn.innerHTML=`<span class="bl bdone"><svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="ckp" d="M5 12.5l4.5 4.5L19 7"/></svg>${esc(done)}</span>`;await wait(760);}
 if(btn.isConnected){btn.disabled=false;btn.classList.remove('is-busy','run','is-done');btn.style.width='';btn.innerHTML=html;}
 if(fn)fn();}
const val=id=>{const e=$('#'+id);return e?e.value.trim():''};
function maskPhone(v){const d=v.replace(/\D/g,'').slice(0,11);if(d.length<=2)return d.length?'('+d:'';if(d.length<=7)return `(${d.slice(0,2)}) ${d.slice(2)}`;return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;}

/* ---------- shared pieces ---------- */
function authHero(compact,back){
 return `<header class="hero-auth ${compact?'compact':''}">
  <div class="orb" style="width:280px;height:280px;right:-90px;top:-70px;background:#6da8a7;opacity:.85"></div>
  <div class="orb" style="width:220px;height:220px;left:-80px;bottom:-110px;background:#07486e"></div>
  <div class="orb" style="width:140px;height:140px;right:70px;bottom:-60px;background:#a9c8da;opacity:.55"></div>
  ${back?`<button class="back" data-a="back">${ic('chevL',22,2.25)}Voltar</button>`:''}
  <h1 class="wordmark">${logo(compact?34:56,!compact)}</h1>
  ${compact?'':'<p class="tagline">Sua comunidade,<br>ao alcance de <em>cada momento</em>.</p>'}
 </header>`;
}
function appHead(inner,orb){
 const o=orb||['#6da8a7','#07486e'];
 return `<header class="apphead"><div class="orb" style="width:240px;height:240px;right:-80px;top:-100px;background:${o[0]}"></div><div class="orb" style="width:180px;height:180px;left:-70px;top:-40px;background:${o[1]};opacity:.4"></div>${inner}</header>`;
}
const roleTag=()=>{const r=ROLES[S.role];return `<span class="tag sm" id="roleTag" style="${tone(r[1])}">${r[0]}</span>`;};
const tag=(t,label,sm)=>`<span class="tag ${sm?'sm':''}" style="${tone(t)}">${esc(label)}</span>`;
const status=(k,label)=>`<span class="status st-${k}">${ic({success:'check',warning:'alert',danger:'x',info:'info'}[k],12,2.75)}${esc(label)}</span>`;
const avs=(n,label,ring)=>{const ns=['AS','BL','CR','DM'],ts=['lima','damasco','ceu','rosado'];return `<span class="avs">${ns.map((x,i)=>`<span style="${tone(ts[i])};${ring?'box-shadow:0 0 0 2px '+ring:''}">${x}</span>`).join('')}<em>${label}</em></span>`;};
const dateblk=(e,soft)=>`<span class="dateblk ${soft?'soft':''}"><b>${String(e.d).padStart(2,'0')}</b><small>${soft?WD[dow(e.y,e.m,e.d)]:MON3[e.m-1]}</small></span>`;
const sectionHead=(eb,title,action,a,v)=>`<div class="row between pad" style="align-items:flex-end;gap:16px"><div class="stack" style="gap:4px">${eb?`<p class="eyebrow">${eb}</p>`:''}<h2 class="t2">${title}</h2></div>${action?`<button class="link" data-a="${a}" data-v="${v||''}">${action}${ic('chevR',16,2)}</button>`:''}</div>`;

const V={};/* screens */

