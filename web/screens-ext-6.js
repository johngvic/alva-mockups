/* ---------- Lojas: paginação de Itens e Vendas ---------- */
const fdPagedPage=()=>/^(cafe|rest|shop)-(items|sales)$/.test(S.active);
{const base=foodPage;foodPage=function(){if(!fdPagedPage())return base.apply(this,arguments);const keep=S.foodRows;S.foodRows=1e9;const h=base.apply(this,arguments);S.foodRows=keep;return h;};}
function fdPaginate(){if(!fdPagedPage())return;const sec=$('#main .mtab');if(!sec)return;const rows=[...sec.querySelectorAll('.trow:not(.thead)')];if(!rows.length)return;
 const sig=[S.active,S.foodQuery,S.foodStatus,S.foodMethod,S.foodCat,S.foodItemF,S.foodMode,S.foodMonth,S.foodDay,rows.length].join('|');if(S.fdSig!==sig){S.fdSig=sig;S.fdPg=1;}
 rows.forEach(r=>r.style.display='');const rh=rows[0].offsetHeight||60,top=rows[0].getBoundingClientRect().top+window.scrollY;
 const avail=window.innerHeight-Math.min(top,window.innerHeight*.6)-60-28,pp=Math.max(4,Math.min(30,Math.floor(avail/rh))),P=Math.max(1,Math.ceil(rows.length/pp));S.fdPg=Math.min(Math.max(1,S.fdPg||1),P);const c=S.fdPg;
 rows.forEach((r,i)=>{r.style.display=i>=(c-1)*pp&&i<c*pp?'':'none';});
 const noun=S.active.endsWith('sales')?['venda','vendas']:['item','itens'],n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-c)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}
 let f=sec.querySelector(':scope > .tfoot');if(!f){f=document.createElement('div');f.className='tfoot';sec.appendChild(f);}f.classList.add('fd-pf');
 f.innerHTML=`<span>${P>1?`${(c-1)*pp+1}–${Math.min(rows.length,c*pp)} de ${rows.length} ${noun[1]}`:`${rows.length} ${rows.length===1?noun[0]:noun[1]}`}</span>${P>1?`<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="fdPg" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="fdPg" data-v="${i}">${i}</button>`).join('')}<button class="ibtn sm" data-a="fdPg" data-v="${c+1}" ${c===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`:''}`;}
Object.assign(A,{fdPg:v=>{S.fdPg=+v;fdPaginate();$('#main .mtab')?.scrollIntoView({block:'nearest',behavior:'smooth'});}});
{const base=render;render=function(){const x=base.apply(this,arguments);requestAnimationFrame(fdPaginate);return x;};}
window.addEventListener('resize',()=>{clearTimeout(window._fdT);window._fdT=setTimeout(fdPaginate,150);});

