/* ---------- Seletores padrão do projeto: select, data, mês e hora ----------
   Substitui os menus nativos do navegador (que não aceitam estilo) por painéis do Alva.
   Os campos continuam sendo <select> e <input>, então nada nas telas precisa mudar. */
const UIP={el:null,anchor:null,close(){if(UIP.el){UIP.el.remove();UIP.el=null;}if(UIP.anchor){UIP.anchor.classList.remove('uip-open');UIP.anchor.removeAttribute('aria-expanded');UIP.anchor=null;}document.removeEventListener('pointerdown',UIP.out,true);document.removeEventListener('keydown',UIP.key,true);window.removeEventListener('resize',UIP.close);document.removeEventListener('scroll',UIP.scr,true);},
 out(e){if(UIP.el&&!UIP.el.contains(e.target)&&!(UIP.anchor&&UIP.anchor.contains(e.target)))UIP.close();},
 scr(e){if(UIP.el&&!UIP.el.contains(e.target))UIP.close();},
 key(e){if(!UIP.el)return;if(e.key==='Escape'){e.stopPropagation();e.preventDefault();const a=UIP.anchor;UIP.close();a&&a.focus();return;}if(UIP.onkey)UIP.onkey(e);},
 /* abre um painel ancorado no campo */
 open(anchor,html,cls,w){UIP.close();const el=document.createElement('div');el.className='uipop '+(cls||'');el.innerHTML=html;document.body.appendChild(el);UIP.el=el;UIP.anchor=anchor;anchor.classList.add('uip-open');anchor.setAttribute('aria-expanded','true');UIP.w=w||0;UIP.place();
  document.addEventListener('pointerdown',UIP.out,true);document.addEventListener('keydown',UIP.key,true);window.addEventListener('resize',UIP.close);document.addEventListener('scroll',UIP.scr,true);requestAnimationFrame(()=>el.classList.add('open'));return el;},
 place(w){const el=UIP.el,a=UIP.anchor;el.style.maxHeight='';w=w||UIP.w||0;UIP.w=w;const r=(a.closest('.selw,.sp-unit,.uip-w')||a).getBoundingClientRect();const vw=window.innerWidth,vh=window.innerHeight;
  el.style.minWidth=Math.max(w||0,Math.min(r.width,360))+'px';const eh=el.offsetHeight,ew=el.offsetWidth;
  let top=r.bottom+6;const below=vh-r.bottom-12,above=r.top-12;if(eh>below&&above>below){top=Math.max(8,r.top-6-Math.min(eh,above));el.style.maxHeight=Math.min(eh,above)+'px';}else el.style.maxHeight=Math.min(eh,Math.max(160,below))+'px';
  let left=Math.min(Math.max(8,r.left),vw-ew-8);el.style.top=top+'px';el.style.left=left+'px';}};

/* ---------- select ---------- */
function uipSelect(sel){if(sel.disabled||sel.multiple||sel.size>1)return;
 if(UIP.anchor===sel){UIP.close();return;}
 const opts=[...sel.children].flatMap(c=>c.tagName==='OPTGROUP'?[{g:c.label},...[...c.children].map(o=>({o}))]:[{o:c}]);
 const n=opts.filter(x=>x.o).length,search=n>9;let act=sel.selectedIndex;
 const row=x=>x.g?`<div class="uip-g">${esc(x.g)}</div>`:`<button type="button" class="uip-i ${x.o.index===sel.selectedIndex?'cur':''}" role="option" data-i="${x.o.index}" ${x.o.disabled?'disabled':''} aria-selected="${x.o.index===sel.selectedIndex}"><span>${esc(x.o.textContent)}</span>${x.o.index===sel.selectedIndex?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`;
 const el=UIP.open(sel,`${search?`<label class="uip-s">${ic('search',15)}<input type="text" placeholder="Buscar" autocomplete="off"></label>`:''}<div class="uip-l" role="listbox">${opts.map(row).join('')}</div>`,'uip-sel');
 const list=el.querySelector('.uip-l'),items=()=>[...list.querySelectorAll('.uip-i:not([disabled]):not([hidden])')];
 const mark=i=>{items().forEach(b=>b.classList.toggle('hot',+b.dataset.i===i));const b=list.querySelector('.uip-i.hot');if(b)b.scrollIntoView({block:'nearest'});};
 const pick=i=>{sel.selectedIndex=i;UIP.close();sel.dispatchEvent(new Event('input',{bubbles:true}));sel.dispatchEvent(new Event('change',{bubbles:true}));sel.focus();};
 list.onclick=e=>{const b=e.target.closest('.uip-i');if(b&&!b.disabled)pick(+b.dataset.i);};
 list.onmousemove=e=>{const b=e.target.closest('.uip-i');if(b)mark(+b.dataset.i);};
 const si=el.querySelector('input');if(si){si.focus();si.oninput=()=>{const q=norm(si.value);list.querySelectorAll('.uip-i').forEach(b=>b.hidden=!!q&&!norm(b.textContent).includes(q));};}
 UIP.onkey=e=>{const it=items();if(!it.length)return;const cur=it.findIndex(b=>b.classList.contains('hot'));
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const nx=it[(cur+(e.key==='ArrowDown'?1:-1)+it.length)%it.length];mark(+nx.dataset.i);}
  else if(e.key==='Enter'){e.preventDefault();e.stopPropagation();if(cur>=0)pick(+it[cur].dataset.i);}
  else if(e.key==='Tab')UIP.close();};
 mark(act);requestAnimationFrame(()=>{const s=list.querySelector('.uip-i.cur');if(s)s.scrollIntoView({block:'center'});});}
document.addEventListener('mousedown',e=>{const s=e.target.closest&&e.target.closest('select');if(s&&!s.disabled&&!s.multiple&&!(s.size>1)){e.preventDefault();s.focus();uipSelect(s);}},true);
document.addEventListener('keydown',e=>{const s=e.target;if(s&&s.tagName==='SELECT'&&!UIP.el&&(e.key==='Enter'||e.key===' '||(e.altKey&&e.key==='ArrowDown'))){e.preventDefault();uipSelect(s);}},true);

/* ---------- data ---------- */
const UIP_M=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const uipIso=(y,m,d)=>`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
function uipFire(inp){inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}));}
function uipDate(inp){if(inp.disabled||inp.readOnly)return;if(UIP.anchor===inp){UIP.close();return;}
 const isM=inp.type==='month',t=new Date(),today=uipIso(t.getFullYear(),t.getMonth()+1,t.getDate());
 let v=inp.value||'',vy=+(v.slice(0,4))||t.getFullYear(),vm=+(v.slice(5,7))||t.getMonth()+1,mode=isM?'m':'d',view={y:vy,m:vm};
 const min=inp.min||'',max=inp.max||'';
 const draw=()=>{const el=UIP.el;let h='';
  if(mode==='d'){const first=new Date(view.y,view.m-1,1).getDay(),days=new Date(view.y,view.m,0).getDate(),cells=[];for(let i=0;i<first;i++)cells.push('<span></span>');
   for(let d=1;d<=days;d++){const iso=uipIso(view.y,view.m,d),off=(min&&iso<min)||(max&&iso>max);cells.push(`<button type="button" class="uic-d ${iso===today?'today':''} ${iso===v?'cur':''}" data-d="${iso}" ${off?'disabled':''}>${d}</button>`);}
   h=`<div class="uic-h"><button type="button" class="uic-t" data-go="m">${UIP_M[view.m-1]} ${view.y}${ic('chevD',13,2.2)}</button><span class="uic-n"><button type="button" class="ibtn sm" data-nav="-1" aria-label="Mês anterior">${ic('chevL',14,2)}</button><button type="button" class="ibtn sm" data-nav="1" aria-label="Próximo mês">${ic('chevR',14,2)}</button></span></div><div class="uic-w">${['dom','seg','ter','qua','qui','sex','sáb'].map(x=>`<span>${x}</span>`).join('')}</div><div class="uic-g">${cells.join('')}</div>`;}
  else{h=`<div class="uic-h"><span class="uic-t static">${view.y}</span><span class="uic-n"><button type="button" class="ibtn sm" data-nav="-12" aria-label="Ano anterior">${ic('chevL',14,2)}</button><button type="button" class="ibtn sm" data-nav="12" aria-label="Próximo ano">${ic('chevR',14,2)}</button></span></div><div class="uic-mg">${UIP_M.map((n,i)=>{const iso=uipIso(view.y,i+1,1).slice(0,7),off=(min&&iso<min.slice(0,7))||(max&&iso>max.slice(0,7));return `<button type="button" class="uic-mo ${iso===v.slice(0,7)?'cur':''} ${iso===today.slice(0,7)?'today':''}" data-mo="${i+1}" ${off?'disabled':''}>${n.slice(0,3)}</button>`;}).join('')}</div>`;}
  h+=`<div class="uic-f">${inp.required?'<span></span>':`<button type="button" class="lnk inl" data-clr>Limpar</button>`}<button type="button" class="lnk inl" data-today>${isM?'Este mês':'Hoje'}</button></div>`;
  el.innerHTML=h;UIP.place();};
 const el=UIP.open(inp,'','uip-cal',286);draw();
 el.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.go){mode='m';draw();return;}
  if(b.dataset.nav){const k=+b.dataset.nav;if(Math.abs(k)===12)view.y+=k/12;else{view.m+=k;if(view.m<1){view.m=12;view.y--;}if(view.m>12){view.m=1;view.y++;}}draw();return;}
  if(b.dataset.mo){if(isM){inp.value=view.y+'-'+String(b.dataset.mo).padStart(2,'0');UIP.close();uipFire(inp);inp.focus();}else{view.m=+b.dataset.mo;mode='d';draw();}return;}
  if(b.dataset.d){inp.value=b.dataset.d;UIP.close();uipFire(inp);inp.focus();return;}
  if('clr' in b.dataset){inp.value='';UIP.close();uipFire(inp);inp.focus();return;}
  if('today' in b.dataset){inp.value=isM?today.slice(0,7):today;UIP.close();uipFire(inp);inp.focus();}};
 UIP.onkey=null;}

/* ---------- hora ---------- */
function uipTime(inp){if(inp.disabled||inp.readOnly)return;if(UIP.anchor===inp){UIP.close();return;}
 let [H,M]=(inp.value||'').split(':').map(Number);const has=!isNaN(H);if(!has){H=null;M=null;}
 const mins=[];for(let m=0;m<60;m+=5)mins.push(m);if(M!=null&&!mins.includes(M)){mins.push(M);mins.sort((a,b)=>a-b);}
 const p2=n=>String(n).padStart(2,'0');
 const draw=()=>{UIP.el.querySelector('.uit-h').innerHTML=Array.from({length:24},(_,i)=>`<button type="button" class="uit-i ${i===H?'cur':''}" data-h="${i}">${p2(i)}</button>`).join('');UIP.el.querySelector('.uit-m').innerHTML=mins.map(m=>`<button type="button" class="uit-i ${m===M?'cur':''}" data-m="${m}">${p2(m)}</button>`).join('');UIP.place();};
 const el=UIP.open(inp,`<div class="uit"><div class="uit-c"><span class="uit-l">Hora</span><div class="uit-h"></div></div><div class="uit-c"><span class="uit-l">Minuto</span><div class="uit-m"></div></div></div><div class="uic-f">${inp.required?'<span></span>':`<button type="button" class="lnk inl" data-clr>Limpar</button>`}<button type="button" class="lnk inl" data-now>Agora</button></div>`,'uip-time',200);draw();
 const sync=(close)=>{if(H==null)return;if(M==null)M=0;inp.value=p2(H)+':'+p2(M);uipFire(inp);if(close){UIP.close();inp.focus();}else draw();};
 requestAnimationFrame(()=>{el.querySelectorAll('.uit-i.cur').forEach(b=>b.scrollIntoView({block:'center'}));});
 el.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.h!=null&&b.dataset.h!==''){H=+b.dataset.h;sync(false);return;}
  if(b.dataset.m!=null&&b.dataset.m!==''){if(H==null)H=new Date().getHours();M=+b.dataset.m;sync(true);return;}
  if('clr' in b.dataset){inp.value='';UIP.close();uipFire(inp);return;}
  if('now' in b.dataset){const n=new Date();H=n.getHours();M=Math.round(n.getMinutes()/5)*5%60;sync(true);}};
 UIP.onkey=null;}

document.addEventListener('click',e=>{const i=e.target.closest&&e.target.closest('input[type=date],input[type=month],input[type=time]');if(!i)return;e.preventDefault();if(i.type==='time')uipTime(i);else uipDate(i);},true);
document.addEventListener('keydown',e=>{const i=e.target;if(i&&i.tagName==='INPUT'&&/^(date|month|time)$/.test(i.type)&&!UIP.el&&(e.key==='Enter'||(e.altKey&&e.key==='ArrowDown'))){e.preventDefault();if(i.type==='time')uipTime(i);else uipDate(i);}},true);
