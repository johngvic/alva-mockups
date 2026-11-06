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
/* Splash "amanhecer": a cena do rodapé da landing (céu azul, sol nascendo atrás de colinas em camadas) e,
   no meio dela, a marca da Alva se desenhando. Tudo em CSS/SVG; --k acelera a linha do tempo na versão rápida. */
function nsHill(base,amp,seed){let p='M-10,860 L-10,'+base;for(let x=-10;x<=400;x+=6){const y=base-amp*(.5*Math.sin(x/70+seed)+.3*Math.sin(x/31+seed*2.3)+.2*Math.sin(x/130+seed*.7));p+=' L'+x+','+y.toFixed(1);}return p+' L400,860 Z';}
function nsScene(){const SX=195,SY=560,stars=Array.from({length:16},(_,i)=>{const a=Math.sin(i*91.7)*43758.5,b=Math.sin(i*12.9+4)*24634.6;const x=(a-Math.floor(a))*380+5,y=(b-Math.floor(b))*300+30,r=.7+(i%3)*.45;return `<circle class="ns-star" style="--i:${i}" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r}"/>`;}).join('');
 const beams=[[-52,300],[-27,420],[0,520],[27,420],[52,300]].map(([a,l])=>{const r=(a-90)*Math.PI/180,t=(a-90+5)*Math.PI/180,u=(a-90-5)*Math.PI/180;return `<path d="M${SX},${SY} L${(SX+Math.cos(t)*(l+360)).toFixed(0)},${(SY+Math.sin(t)*(l+360)).toFixed(0)} L${(SX+Math.cos(u)*(l+360)).toFixed(0)},${(SY+Math.sin(u)*(l+360)).toFixed(0)} Z"/>`;}).join('');
 return `<svg class="ns-scene" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
  <linearGradient id="nsSky" x1="0" y1="0" x2="0" y2="1"><stop offset=".08" style="stop-color:var(--ns-top)"/><stop offset=".52" style="stop-color:var(--ns-mid)"/><stop offset=".8" style="stop-color:var(--ns-low)"/></linearGradient>
  <radialGradient id="nsDawn"><stop offset="0" stop-color="#e6f4f7" stop-opacity=".5"/><stop offset=".35" stop-color="#a9c8da" stop-opacity=".22"/><stop offset=".7" stop-color="#6da8a7" stop-opacity=".08"/><stop offset="1" stop-color="#6da8a7" stop-opacity="0"/></radialGradient>
  <radialGradient id="nsHalo"><stop offset="0" stop-color="#c7ebea" stop-opacity=".6"/><stop offset=".45" stop-color="#6da8a7" stop-opacity=".16"/><stop offset="1" stop-color="#6da8a7" stop-opacity="0"/></radialGradient>
  <linearGradient id="nsDisc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4fbff"/><stop offset=".5" stop-color="#a9c8da"/><stop offset="1" stop-color="#6da8a7"/></linearGradient>
  <radialGradient id="nsBeam" gradientUnits="userSpaceOnUse" cx="${SX}" cy="${SY}" r="620"><stop offset="0" stop-color="#e6f4f7" stop-opacity=".34"/><stop offset=".55" stop-color="#a9c8da" stop-opacity=".1"/><stop offset="1" stop-color="#a9c8da" stop-opacity="0"/></radialGradient>
  <linearGradient id="nsH1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb0c9"/><stop offset="1" stop-color="#4f8aa6"/></linearGradient>
  <linearGradient id="nsH2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7c9d"/><stop offset="1" stop-color="#25607f"/></linearGradient>
  <linearGradient id="nsH3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f5878"/><stop offset="1" stop-color="#0d3248"/></linearGradient>
  <filter id="nsSoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter><filter id="nsB1" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="7"/></filter><filter id="nsB2" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="4.5"/></filter><filter id="nsB3" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="2.5"/></filter></defs>
  <rect width="390" height="844" fill="url(#nsSky)"/>
  <g class="ns-stars">${stars}</g>
  <ellipse class="ns-dawn" cx="${SX}" cy="${SY+10}" rx="460" ry="300" fill="url(#nsDawn)"/>
  <g class="ns-beams" fill="url(#nsBeam)" filter="url(#nsSoft)">${beams}</g>
  <g class="ns-sun"><circle class="ns-halo" cx="${SX}" cy="${SY}" r="170" fill="url(#nsHalo)"/></g>
  <path class="ns-hill h1" d="${nsHill(615,30,1.3)}" fill="url(#nsH1)" fill-opacity=".34" filter="url(#nsB1)"/>
  <path class="ns-hill h2" d="${nsHill(668,26,4.1)}" fill="url(#nsH2)" fill-opacity=".3" filter="url(#nsB2)"/>
  <path class="ns-hill h3" d="${nsHill(728,22,7.7)}" fill="url(#nsH3)" fill-opacity=".42" filter="url(#nsB3)"/></svg>`;}
function showSplash(fast){const ph=$('#phone');if(!ph)return;const old=$('#splash');if(old)old.remove();clearTimeout(window._spT1);clearTimeout(window._spT2);clearTimeout(window._spT3);
 const d=document.createElement('div');d.id='splash';d.className='nsplash'+(fast?' fast':'');
 d.innerHTML=`${nsScene()}<div class="ns-mark"><span class="ns-aura"></span><span class="ns-ring"></span><span class="ns-ring r2"></span>${splashSVG()}</div><span class="ns-bloom"></span>`;
 ph.appendChild(d);ph.classList.add('sp-on');
 window._spT1=setTimeout(()=>{d.classList.add('ns-out');ph.classList.remove('sp-on');ph.classList.add('sp-reveal');},fast?1100:3000);
 window._spT2=setTimeout(()=>d.classList.add('sp-fade'),fast?1500:3500);
 window._spT3=setTimeout(()=>{d.remove();ph.classList.remove('sp-reveal');},fast?2000:4100);}
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Abertura</span><div class="rail-nav"><button type="button" id="spReplay">Rever splash screen</button></div>`;sec.parentNode.insertBefore(box,sec);
 $('#spReplay').addEventListener('click',()=>{S.hist=[];S.screen='welcome';$('#overlay').innerHTML='';render('none');showSplash();});})();
