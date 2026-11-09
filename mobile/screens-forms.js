/* =========================================================
   FORMULÁRIOS COMPLETOS · motor de campos ricos
   Uma seção do motor de lista (screens-pessoas.js) vira formulário
   completo ao definir  form:[...], main:'k', sub:['k',...], pub:1.
   Tipos: text, area, sel (1 opção), multi (várias), date, time, num,
   money, link, file, image, tog. {h:'Título'} cria um subtítulo e
   {half:1} em dois campos seguidos os coloca lado a lado.
   {if:['k','valor']} mostra o campo só quando outro tem aquele valor.
   ========================================================= */
Object.assign(I,{
 clip:'<path d="M21 11.5l-8.6 8.6a5 5 0 01-7.1-7.1l8.6-8.6a3.4 3.4 0 014.8 4.8l-8.6 8.6a1.7 1.7 0 01-2.4-2.4l7.9-7.9"/>',
 file:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/>',
 image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'
});
const RF_MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const rfDate=s=>{if(!s)return '';const [y,m,d]=s.split('-');return +d+' '+RF_MES[+m-1]+(y==='2026'?'':' '+y);};
const rfIso=s=>{const [d,m]=s.split(' '),i=RF_MES.indexOf(m);return i<0?'':'2026-'+String(i+1).padStart(2,'0')+'-'+d.padStart(2,'0');};
const rfSize=n=>n<1024?n+' B':n<1048576?Math.round(n/1024)+' KB':(n/1048576).toFixed(1).replace('.',',')+' MB';
const rfEmpty=x=>Array.isArray(x)?!x.length:(x===undefined||x===null||x===''||x===false);
const RFS={files:{}};

const rfFmt=(f,x)=>{const t=f.t||'text';
 if(t==='date')return (f.pre||'')+rfDate(x);
 if(t==='num'){const n=parseInt(String(x).replace(/\D/g,''));return (f.pre||'')+(isNaN(n)?x:n.toLocaleString('pt-BR'))+(f.sfx?' '+f.sfx:'');}
 if(t==='multi')return x.join(', ');
 if(t==='file'||t==='image')return x.map(a=>a.name).join(', ');
 if(t==='tog')return x?'Sim':'Não';
 if(t==='money')return 'R$ '+x;
 return (f.pre||'')+x+(f.sfx?' '+f.sfx:'');};
function rfSub(c,v){if(c.subFn)return c.subFn(v);return c.sub.map(k=>{const f=c.form.find(y=>y.k===k),x=v[k];if(!f||rfEmpty(x))return '';
 if(f.t==='file')return x[0].name.split('.').pop().toUpperCase()+' · '+x[0].sz;
 return rfFmt(f,x);}).filter(Boolean).join(' · ');}
const rfDetail=(c,v)=>c.form.filter(f=>!f.h&&f.k!==c.main&&!rfEmpty(v[f.k])).map(f=>[f.l,rfFmt(f,v[f.k])]);
const rfMedia=r=>r.v?Object.values(r.v).flat().filter(a=>a&&a.url&&/^(audio|video)/.test(a.type||'')).map(a=>/^audio/.test(a.type)?`<audio class="rfaud" controls preload="none" src="${a.url}"></audio>`:`<video class="rfaud" controls preload="metadata" src="${a.url}"></video>`).join(''):'';

const rfList=(k,img)=>(RFS.files[k]||[]).map((f,i)=>`<div class="rff">${f.url&&img?`<img src="${f.url}" alt="">`:`<span class="rfi">${ic(img?'image':'clip',18)}</span>`}<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(f.name)}</span><span class="vs">${esc(f.sz||'')}</span></span><button type="button" class="rfx" data-rf="rm" data-k="${k}" data-i="${i}" aria-label="Remover">${ic('x',16,2.2)}</button></div>`).join('');

function rfField(f,v){const id='rf_'+f.k,x=v[f.k],t=f.t||'text';
 const w=s=>f.if?`<div data-if="${esc(f.if[0]+'|'+f.if[1])}">${s}</div>`:s;
 if(t==='sel'||t==='multi'){
  const arr=t==='multi'?(x||[]):[x===undefined&&f.def?f.opts[0]:x];
  if(t==='sel'&&f.opts.length>8)return w(`<div class="field" id="f-${id}"><label for="${id}">${f.l}</label><div class="fbox"><select id="${id}"><option value="">Selecione</option>${f.opts.map(o=>`<option ${o===x?'selected':''}>${esc(o)}</option>`).join('')}</select></div><div class="hint"></div></div>`);
  return w(`<div class="field" id="f-${id}"><label>${f.l}</label><div class="vchips" data-rf="${t}" data-k="${f.k}">${f.opts.map(o=>`<button type="button" aria-pressed="${arr.includes(o)}" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="hint"></div></div>`);}
 if(t==='file'||t==='image'){const img=t==='image';
  return w(`<div class="field" id="f-${id}"><label>${f.l}</label><div class="rfl" id="rfl_${f.k}">${rfList(f.k,img)}</div><label class="rfadd tap" for="${id}">${ic(img?'image':'clip',18)}<span>${f.btn||(img?'Escolher imagem':'Anexar arquivo')}</span></label><input id="${id}" type="file" hidden ${img?'accept="image/*"':f.acc?`accept="${f.acc}"`:''} ${f.multi?'multiple':''}><div class="hint"></div></div>`);}
 if(t==='tog')return w(`<button type="button" class="rfsw tap" data-rf="tog" data-k="${f.k}" aria-pressed="${!!x}"><span class="stack" style="gap:2px;text-align:left"><b>${f.l}</b>${f.hint?`<small>${f.hint}</small>`:''}</span><i class="rfk"></i></button>`);
 if(t==='area')return w(field({id,label:f.l,ph:f.ph||'',val:x||'',area:true,max:1500}));
 const ty={date:'date',time:'time',link:'url'}[t]||'text',im={num:'numeric',money:'decimal'}[t]||'';
 return w(field({id,label:f.l,ph:f.ph||(t==='money'?'0,00':''),val:x||'',type:ty,im}));}

function rfRead(sh,F){const v={};F.forEach(f=>{if(f.h)return;const t=f.t||'text',k=f.k;
 if(t==='sel'){const b=sh.querySelector(`[data-rf="sel"][data-k="${k}"] [aria-pressed="true"]`),s=sh.querySelector('select#rf_'+k);v[k]=b?b.dataset.o:s?s.value:'';}
 else if(t==='multi')v[k]=[...sh.querySelectorAll(`[data-rf="multi"][data-k="${k}"] [aria-pressed="true"]`)].map(b=>b.dataset.o);
 else if(t==='file'||t==='image')v[k]=(RFS.files[k]||[]).slice();
 else if(t==='tog')v[k]=sh.querySelector(`[data-rf="tog"][data-k="${k}"]`).getAttribute('aria-pressed')==='true';
 else v[k]=val('rf_'+k);});return v;}

function rfWire(sh,F){
 const sync=()=>{const v=rfRead(sh,F);sh.querySelectorAll('[data-if]').forEach(e=>{const [k,x]=e.dataset.if.split('|');e.hidden=v[k]!==x;});};
 sh.addEventListener('click',e=>{const c=e.target.closest('[data-rf]');if(!c)return;const m=c.dataset.rf,k=c.dataset.k;
  if(m==='sel'||m==='multi'){const b=e.target.closest('button[data-o]');if(!b)return;
   if(m==='sel')c.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));
   b.setAttribute('aria-pressed',m==='sel'?'true':String(b.getAttribute('aria-pressed')!=='true'));clearErr('rf_'+k);}
  else if(m==='tog')c.setAttribute('aria-pressed',String(c.getAttribute('aria-pressed')!=='true'));
  else if(m==='rm'){const f=F.find(y=>y.k===k);RFS.files[k].splice(+c.dataset.i,1);$('#rfl_'+k,sh).innerHTML=rfList(k,f.t==='image');}
  sync();});
 sh.addEventListener('change',e=>{const i=e.target;
  if(i.type==='file'){const k=i.id.slice(3),f=F.find(y=>y.k===k);
   const nf=[...i.files].map(x=>({name:x.name,sz:rfSize(x.size),url:URL.createObjectURL(x),type:x.type}));
   RFS.files[k]=f.multi?RFS.files[k].concat(nf):nf.slice(0,1);
   $('#rfl_'+k,sh).innerHTML=rfList(k,f.t==='image');i.value='';clearErr('rf_'+k);}
  else if(i.tagName==='SELECT')clearErr(i.id);
  sync();});
 sh.addEventListener('input',e=>{if(e.target.id&&e.target.id.startsWith('rf_'))clearErr(e.target.id);});
 sync();}

function rfSave(c,r,F,sh){const v=rfRead(sh,F),off=f=>f.if&&v[f.if[0]]!==f.if[1];let bad='';
 F.forEach(f=>{if(f.h||bad||off(f)||!f.req)return;if(rfEmpty(v[f.k])){bad=f.k;setErr('rf_'+f.k,(f.t==='file'||f.t==='image')?'Anexe um arquivo.':'Preencha este campo.');const e=$('#f-rf_'+f.k,sh);if(e)e.scrollIntoView({block:'center',behavior:'smooth'});}});
 if(bad)return;
 F.forEach(f=>{if(!f.h&&off(f))delete v[f.k];});
 const pub=v._pub;delete v._pub;
 const n=v[c.main],s=rfSub(c,v)||(r&&r.s)||c.empty||'Sem detalhes ainda',d=rfDetail(c,v),im=c.form.find(f=>f.t==='image'),cover=(im&&v[im.k]&&v[im.k][0]&&v[im.k][0].url)||'';
 const cap=parseInt(v.cap)||0;
 if(r)Object.assign(r,{n,s,v,d,cover:cover||r.cover},cap?{cap}:{});
 else c.rows.unshift({id:'x'+Date.now(),n,s,v,d,cover,cap:cap||10,oc:0,st:pub&&c.ST.pb?'pb':c.newSt?c.newSt():Object.keys(c.ST)[0]});
 closeSheet();softRender();toast('success',r?'Salvo':'Criado',n);}

function rfForm(c,r){
 const F=c.form.concat(!r&&c.pub?[{k:'_pub',l:'Publicar ao salvar',t:'tog',hint:'Fica visível para os membros no app'}]:[]),v=r&&r.v?r.v:{};
 RFS.files={};F.forEach(f=>{if(f.t==='file'||f.t==='image')RFS.files[f.k]=(v[f.k]||[]).slice();});
 let h='';
 for(let i=0;i<F.length;i++){const f=F[i];
  if(f.h){h+=`<p class="eb2" style="padding-top:8px">${f.h}</p>`;continue;}
  if(f.half&&F[i+1]&&F[i+1].half){h+=`<div class="row g3">${rfField(f,v)}${rfField(F[i+1],v)}</div>`;i++;continue;}
  h+=rfField(f,v);}
 sheet(`<div class="stack g5"><h3 class="t2">${r?(c.editLabel&&c.editLabel(r)||'Editar'):c.add}</h3>${h}<div class="row g3 rfact"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="lfOk">Salvar</button></div></div>`,sh=>{rfWire(sh,F);$('#lfOk',sh).addEventListener('click',()=>rfSave(c,r,F,sh));});}
