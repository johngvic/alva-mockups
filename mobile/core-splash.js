/* ================= Splash screen ================= */
function splashSVG(){const C={x:60,y:58},R0=27,R1=40,ang=[-162,-126,-90,-54,-18],del=[.98,.72,.46,.6,.86],sh=[1.62,1.5,1.42,1.47,1.56];
 const L=(a,i,cls,st)=>{const r=a*Math.PI/180,x1=C.x+R0*Math.cos(r),y1=C.y+R0*Math.sin(r),x2=C.x+R1*Math.cos(r),y2=C.y+R1*Math.sin(r);return `<line class="${cls}" style="${st}" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" pathLength="1"/>`;};
 return `<svg class="sp-sun" viewBox="0 0 120 76" aria-hidden="true"><defs><linearGradient id="spG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sp-s1"/><stop offset="1" class="sp-s2"/></linearGradient><clipPath id="spC"><rect x="0" y="0" width="120" height="${C.y}"/></clipPath>
  <filter id="spBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6"/></filter></defs>
  <g class="sp-halo" filter="url(#spBlur)" stroke-width="7" stroke-linecap="round">${ang.map((a,i)=>L(a,i,'sp-hr',`--d:${sh[i]}s`)).join('')}</g>
  <g class="sp-rays" stroke-width="5.2" stroke-linecap="round">${ang.map((a,i)=>L(a,i,'sp-ray',`--d:${del[i]}s`)).join('')}</g>
  <g class="sp-shine" stroke-width="5.2" stroke-linecap="round">${ang.map((a,i)=>L(a,i,'sp-sh',`--d:${sh[i]}s`)).join('')}</g>
  <g clip-path="url(#spC)"><circle class="sp-disc" cx="${C.x}" cy="${C.y}" r="21" fill="url(#spG)"/><rect class="sp-dsh" x="30" y="30" width="16" height="30" fill="#fff" transform="skewX(-20)"/></g>
  <line class="sp-hz" x1="14" y1="66" x2="106" y2="66" stroke-width="5.2" stroke-linecap="round" pathLength="1"/></svg>`;}
function showSplash(fast){const ph=$('#phone');if(!ph)return;const old=$('#splash');if(old)old.remove();clearTimeout(window._spT1);clearTimeout(window._spT2);clearTimeout(window._spT3);
 const d=document.createElement('div');d.id='splash';d.className='splash';d.innerHTML=`<div class="sp-glow"></div><div class="sp-mark">${splashSVG()}</div>`;
 ph.appendChild(d);ph.classList.add('sp-on');
 window._spT1=setTimeout(()=>{const sun=$('.sp-sun',d),tgt=null;
  if(tgt){const a=sun.getBoundingClientRect(),b=tgt.getBoundingClientRect();const ax=a.left+a.width*.5,ay=a.top+a.height*58/76,bx=b.left+b.width*.5,by=b.top+b.height*25/32;
   const k=(b.height*10/32)/(a.width*21/120);sun.style.transformOrigin=`${a.width*.5}px ${a.height*58/76}px`;sun.style.transform=`translate(${bx-ax}px,${by-ay}px) scale(${k})`;d.classList.add('sp-morph');}
  else d.classList.add('sp-out');
  ph.classList.remove('sp-on');ph.classList.add('sp-reveal');},fast?900:2250);
 window._spT2=setTimeout(()=>d.classList.add('sp-fade'),fast?1250:2900);
 window._spT3=setTimeout(()=>{d.remove();ph.classList.remove('sp-reveal');},fast?1700:3400);}
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Abertura</span><div class="rail-nav"><button type="button" id="spReplay">Rever splash screen</button></div>`;sec.parentNode.insertBefore(box,sec);
 $('#spReplay').addEventListener('click',()=>{S.hist=[];S.screen='welcome';$('#overlay').innerHTML='';render('none');showSplash();});})();
