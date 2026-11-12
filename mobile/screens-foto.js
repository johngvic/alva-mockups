/* ===== Foto: tirar com a câmera ou escolher da galeria (Zeladoria e comprovantes) =====
 * Spec `maintenance` (MNT-UC-03, MNT-P-21): o pedido aceita UMA foto opcional, guardada no kernel `Files` (dono `maintenance.work`);
 * outras fotos vão como comentário. Política de imagem do `Files`: .jpg, .jpeg, .png ou .webp, até `files.usage.image.maxBytes` (5 MB).
 * No protótipo a câmera abre dentro do app (getUserMedia: a câmera traseira no celular, a webcam no computador).
 * Sem câmera ou sem permissão, cai na galeria. A foto tirada sai em JPEG reduzida para no máximo 1600 px, bem abaixo dos 5 MB. */
Object.assign(I,{
 image:I.image||'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
 trash:I.trash||'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
 flipcam:'<path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/><path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"/><circle cx="12" cy="12" r="3"/><path d="m18 22-3-3 3-3"/><path d="m6 2 3 3-3 3"/>',
 send:I.send||'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
 expand:'<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>'
});
const PF={};                                   /* foto escolhida por campo (data URL) */
const PF_MAX=5*1024*1024,PF_TYPES=['image/jpeg','image/png','image/webp'],PF_EXT=/\.(jpe?g|png|webp)$/i;
const pfBody=(id,src)=>src
 ?`<div class="pf-prev"><button type="button" class="pf-img" data-pfv="${id}" aria-label="Ver a foto"><img src="${src}" alt="Foto anexada"></button>
   <div class="pf-bar"><span class="pf-ok">${ic('check',14,2.5)}Foto anexada</span><span class="grow"></span><button type="button" class="pf-mini" data-pfc="${id}">${ic('camera',16,2)}Trocar</button><button type="button" class="pf-mini pf-del" data-pfx="${id}" aria-label="Remover a foto">${ic('trash',16,2)}</button></div></div>`
 :`<div class="pf-empty"><button type="button" class="pf-btn pf-main" data-pfc="${id}"><span class="pf-i">${ic('camera',22,1.9)}</span><span class="stack" style="gap:1px;align-items:flex-start"><b>Tirar foto</b><small>Abre a câmera</small></span></button>
   <button type="button" class="pf-btn" data-pfg="${id}"><span class="pf-i">${ic('image',20,1.9)}</span><span class="stack" style="gap:1px;align-items:flex-start"><b>Galeria</b><small>Escolher</small></span></button></div>`;
/* campo de foto: label, os dois botões (ou a prévia) e a dica com a política do Files */
function photoField({id,label='Foto',opt=true,hint='JPG, PNG ou WEBP, até 5 MB.'}){
 return `<div class="pf" id="pf-${id}"><span class="pf-l">${label}${opt?' <small>opcional</small>':''}</span><div class="pf-box">${pfBody(id,PF[id])}</div><p class="pf-h" data-h="${esc(hint)}">${esc(hint)}</p>
  <input type="file" id="${id}" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" hidden></div>`;}
function pfSet(id,src){if(src)PF[id]=src;else delete PF[id];const w=document.getElementById('pf-'+id);if(!w)return;$('.pf-box',w).innerHTML=pfBody(id,src);pfErr(id,'');}
function pfErr(id,msg){const h=document.querySelector('#pf-'+id+' .pf-h');if(!h)return;h.classList.toggle('err',!!msg);h.textContent=msg||h.dataset.h;}
/* reduz para no máximo 1600 px e devolve JPEG (o que o app enviaria ao Files) */
function pfShrink(src,cb){const im=new Image();im.onload=()=>{const k=Math.min(1,1600/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.82));};im.onerror=()=>cb(null);im.src=src;}
function pfFile(id,f){if(!f)return;
 if(!(PF_TYPES.includes(f.type)||PF_EXT.test(f.name))){pfErr(id,'Use uma foto JPG, PNG ou WEBP.');return;}
 if(f.size>PF_MAX){pfErr(id,'A foto passa de 5 MB. Escolha outra ou tire pela câmera.');return;}
 const rd=new FileReader();rd.onload=()=>pfShrink(rd.result,s=>s?pfSet(id,s):pfErr(id,'Não deu para abrir esta imagem.'));rd.readAsDataURL(f);}
/* liga os botões do campo dentro da folha (a delegação cobre trocar e remover depois de redesenhar) */
function photoWire(root){if(!root||root.__pf)return;root.__pf=1;
 root.addEventListener('click',e=>{const t=e.target.closest('[data-pfc],[data-pfg],[data-pfx],[data-pfv]');if(!t||!root.contains(t))return;e.preventDefault();
  if(t.dataset.pfc)pfCamera(t.dataset.pfc);
  else if(t.dataset.pfg)document.getElementById(t.dataset.pfg).click();
  else if(t.dataset.pfx)pfSet(t.dataset.pfx,null);
  else if(t.dataset.pfv)photoView(PF[t.dataset.pfv]);});
 root.addEventListener('change',e=>{const i=e.target;if(i.type!=='file'||!i.closest('.pf'))return;pfFile(i.id,i.files&&i.files[0]);i.value='';});}
/* câmera dentro do app: visor, obturador, virar a câmera, revisar (Usar foto / Tirar de novo) */
let PF_STREAM=null;
const pfStop=()=>{if(PF_STREAM){PF_STREAM.getTracks().forEach(t=>t.stop());PF_STREAM=null;}};
function pfCamera(id){const ph=$('#phone')||document.body;let cam=document.querySelector('.pfcam');if(cam)cam.remove();
 cam=document.createElement('div');cam.className='pfcam';cam.setAttribute('role','dialog');cam.setAttribute('aria-label','Câmera');
 cam.innerHTML=`<div class="pfc-top"><button type="button" class="pfc-ib" data-c="x" aria-label="Fechar a câmera">${ic('x',22,2.2)}</button><span class="pfc-t">Foto do pedido</span><button type="button" class="pfc-ib" data-c="flip" aria-label="Virar a câmera" hidden>${ic('flipcam',22,1.9)}</button></div>
  <div class="pfc-view"><video playsinline muted autoplay></video><img alt="Foto tirada" hidden><div class="pfc-msg" hidden></div><span class="pfc-frame" aria-hidden="true"></span></div>
  <div class="pfc-bot"><div class="pfc-shoot"><button type="button" class="pfc-ib pfc-gal" data-c="gal" aria-label="Escolher da galeria">${ic('image',22,1.9)}</button><button type="button" class="pfc-shut" data-c="shot" aria-label="Tirar a foto"><i></i></button><span class="pfc-sp"></span></div>
   <div class="pfc-rev" hidden><button type="button" class="btn outline md" data-c="again">Tirar de novo</button><button type="button" class="btn primary md" data-c="use">${ic('check',18,2.2)}Usar foto</button></div></div>`;
 ph.appendChild(cam);requestAnimationFrame(()=>cam.classList.add('on'));
 const v=$('video',cam),img=$('img',cam),msg=$('.pfc-msg',cam),flip=cam.querySelector('[data-c="flip"]');let face='environment',shot=null;
 const close=()=>{pfStop();cam.classList.remove('on');setTimeout(()=>cam.remove(),220);};
 const fail=t=>{v.hidden=true;msg.hidden=false;msg.innerHTML=`<span class="pfc-mi">${ic('camera',28,1.8)}</span><b>Não deu para abrir a câmera</b><span>${t}</span><button type="button" class="btn primary md" data-c="gal">${ic('image',18,2)}Escolher da galeria</button>`;cam.querySelector('.pfc-shut').disabled=true;};
 const start=async()=>{pfStop();if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)){fail('Este navegador não dá acesso à câmera. No app, o botão abre a câmera do celular.');return;}
  try{PF_STREAM=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:face},width:{ideal:1920},height:{ideal:1080}},audio:false});if(!cam.isConnected){pfStop();return;}
   v.srcObject=PF_STREAM;v.hidden=false;msg.hidden=true;v.classList.toggle('mir',face==='user');cam.querySelector('.pfc-shut').disabled=false;
   try{const ds=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput');flip.hidden=ds.length<2;}catch(e){}}
  catch(e){fail(e&&e.name==='NotAllowedError'?'O acesso à câmera foi negado. Libere a câmera nas permissões do navegador ou escolha uma foto da galeria.':'Nenhuma câmera encontrada neste aparelho.');}};
 const review=on=>{img.hidden=!on;v.hidden=on||!PF_STREAM;$('.pfc-shoot',cam).hidden=on;$('.pfc-rev',cam).hidden=!on;cam.classList.toggle('rev',on);};
 cam.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;const c=b.dataset.c;
  if(c==='x')close();
  else if(c==='flip'){face=face==='environment'?'user':'environment';start();}
  else if(c==='gal'){close();document.getElementById(id).click();}
  else if(c==='shot'){if(!v.videoWidth)return;const k=Math.min(1,1600/Math.max(v.videoWidth,v.videoHeight)),cv=document.createElement('canvas');cv.width=Math.round(v.videoWidth*k);cv.height=Math.round(v.videoHeight*k);const g=cv.getContext('2d');if(face==='user'){g.translate(cv.width,0);g.scale(-1,1);}g.drawImage(v,0,0,cv.width,cv.height);shot=cv.toDataURL('image/jpeg',.82);img.src=shot;cam.classList.add('flash');setTimeout(()=>cam.classList.remove('flash'),180);review(true);}
  else if(c==='again'){shot=null;review(false);}
  else if(c==='use'&&shot){pfSet(id,shot);close();toast('success','Foto anexada');}});
 start();}
/* ver a foto em tela cheia */
function photoView(src,cap){if(!src)return;const ph=$('#phone')||document.body,w=document.createElement('div');w.className='pfview';
 w.innerHTML=`<button type="button" class="pfc-ib" aria-label="Fechar">${ic('x',22,2.2)}</button><img src="${src}" alt="${esc(cap||'Foto')}">${cap?`<p>${esc(cap)}</p>`:''}`;
 ph.appendChild(w);requestAnimationFrame(()=>w.classList.add('on'));w.addEventListener('click',()=>{w.classList.remove('on');setTimeout(()=>w.remove(),200);});}
