/* Alva Web · protótipo */
window.ALVA_MOBILE_URL = "/mobile/";
const I={
 home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 calendar:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
 book:'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
 heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
 flame:'<path d="M12 21c-4 0-6.5-2.8-6.5-6.3 0-3.7 3-5.7 4-9.2 2 1.5 3 3.2 3 5 1-1 1.6-2.2 1.8-3.5 2.4 2 4.2 4.8 4.2 7.7 0 3.5-2.5 6.3-6.5 6.3z"/>',
 play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
 pause:'<path d="M8 5v14M16 5v14" stroke-width="3"/>',
 gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 11 5 12 8c1-3 3-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
 pin:'<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 bell:'<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>',
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 alert:'<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
 chevR:'<path d="M9 5l7 7-7 7"/>',
 chevL:'<path d="M15 5l-7 7 7 7"/>',
 arrowR:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
 hands:'<path d="M12 21V11.5c0-1-.4-1.9-1.1-2.6L7.4 5.4a1.2 1.2 0 0 0-1.9 1.4l2.3 4.1L5 15.4V21"/><path d="M12 21V11.5c0-1 .4-1.9 1.1-2.6l3.5-3.5a1.2 1.2 0 0 1 1.9 1.4l-2.3 4.1 2.8 4.5V21"/>',
 mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
 lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 church:'<path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5.62a1 1 0 0 0-.55-.9l-4.55-2.27a2 2 0 0 0-1.8 0L6.55 4.72a1 1 0 0 0-.55.9V22"/><path d="m18 7 3.45 1.72a1 1 0 0 1 .55.9V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9.38a1 1 0 0 1 .55-.9L6 7"/>',
 shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
 ticket:'<path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4z"/><path d="M14 7v2M14 11v2M14 15v2"/>',
 radio:'<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
 message:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
 logout:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
 sparkle:'<path d="M9.94 15.5a2 2 0 0 0-1.44-1.44l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
 dots:'<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
 monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
 care:'<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12z"/>',
 swap:'<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
 award:'<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
 music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
 camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
 eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
 eyeOff:'<path d="M10.6 5.6A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.6 3.4M6.2 6.9C3.8 8.6 2.5 12 2.5 12S6 18.5 12 18.5c1.9 0 3.5-.6 4.9-1.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"/>',
 baby:'<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
 door:'<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.56v16.16a1 1 0 0 1-1.24.97L5 20V5.56a2 2 0 0 1 1.52-1.94l4-1A2 2 0 0 1 13 4.56z"/>',
 sliders:'<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
 coffee:'<path d="M10 2v2"/><path d="M14 2v2"/><path d="M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
 wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
 chef:'<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.46.32-.85.74-1.03a4 4 0 0 0-2.23-7.59 5 5 0 0 0-9.02 0 4 4 0 0 0-2.23 7.59c.42.18.74.57.74 1.03V20a1 1 0 0 0 1 1z"/><path d="M6 17h12"/>',
 wine:'<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/>',
 userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>',
 clipboard:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
 library:'<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
 sprout:'<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
 hand:'<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
 car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
 bucket:'<path d="M4.5 10h15"/><path d="M5.5 10l1.4 9.3A2 2 0 0 0 8.9 21h6.2a2 2 0 0 0 2-1.7l1.4-9.3"/><path d="M8 10V8a4 4 0 0 1 8 0v2"/><path d="M8.2 14.5h7.6"/><path d="M20 2.5v3"/><path d="M18.5 4h3"/><path d="M4 3.5c-.6 1-1 1.6-1 2.1a1 1 0 0 0 2 0c0-.5-.4-1.1-1-2.1z"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8M9 9.5h.01M15 9.5h.01"/>',

 box:'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
 wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
 building:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
 layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
 megaphone:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
 sunrise:'<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
 updown:'<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
 menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
 cal2:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
 dawn:'<path d="M3 19h18"/><path d="M7 19a5 5 0 0 1 10 0"/><path d="M12 7v3"/><path d="m5.3 11.3 1.8 1.8"/><path d="m18.7 11.3-1.8 1.8"/>',
 pen:'<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>',
 circleCheck:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
};
const ic=(n,s=20,w=1.75)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]||''}</svg>`;
let _sunId=0;
function sunMark(h,anim){const id='sg'+(++_sunId);const rays=[-162,-126,-90,-54,-18].map((a,i)=>{const r=a*Math.PI/180,x1=24+13.5*Math.cos(r),y1=25+13.5*Math.sin(r),x2=24+19*Math.cos(r),y2=25+19*Math.sin(r);return `<line class="ray" style="--i:${i}" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`;}).join('');
 return `<svg class="sun ${anim?'sun-anim':''}" viewBox="0 0 48 32" height="${h}" width="${h*1.5}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sun1)"/><stop offset=".5" style="stop-color:var(--sun2)"/><stop offset="1" style="stop-color:var(--sun3)"/></linearGradient><clipPath id="${id}c"><rect x="0" y="0" width="48" height="25"/></clipPath></defs><g class="rays" style="stroke:var(--sunray)" stroke-width="2.6" stroke-linecap="round">${rays}</g><g clip-path="url(#${id}c)"><circle class="disc" cx="24" cy="25" r="10" fill="url(#${id})"/></g><line class="horizon" x1="5" y1="28.5" x2="43" y2="28.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`;}
const logo=(h,anim)=>`<span class="logo" role="img" aria-label="alva">${sunMark(h,anim)}<span class="lw">alva</span></span>`;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));


/* ---------- data ---------- */
const S={navOpen:{},theme:'dia',church:0,active:'hoje',day:2,range:'12s'};
try{const t=localStorage.getItem('alva-web-theme');if(t)S.theme=t;}catch(e){}
const CHURCHES=[{n:'Alva Sede',c:'Centro',i:'AS'},{n:'Alva Norte',c:'Santana',i:'AN'},{n:'Alva Jardins',c:'Jardim Europa',i:'AJ'}];
const NAV=[
 [null,[['hoje','dawn','Hoje'],['pessoas','users','Pessoas',[['membros','Membros'],['integracao','Integração de membros']]],['cuidado','heart','Cuidado',[['discipulado','Discipulado'],['acompanhamento','Acompanhamento'],['oracao','Pedidos de oração']]],['comunidade','home','Comunidade',[['casas','Casas de Apascentamento'],['redes','Redes de célula'],['ministerios','Ministérios']]],['kids','baby','Kids',[['kvis','Visão geral'],['ksalas','Salas'],['ktimes','Times'],['kturmas','Turmas']]]]],
 ['Operação',[['agenda','calendar','Agenda e serviço'],['espacos','building','Espaços'],['almox','box','Almoxarifado']]],
 ['Comunicação',[['conteudo','layers','Conteúdo'],['comunicacao','megaphone','Comunicação']]],
 ['Gestão',[['financeiro','wallet','Financeiro'],['admin','shield','Administração',[['usuarios','Usuários e permissões'],['multi','Multi-igreja'],['auditoria','Auditoria e LGPD']]]]],
];
const P=(n,t)=>({n,t,i:n.split(' ').map(w=>w[0]).slice(0,2).join('')});
const WAITING=[P('Carlos Mendes','ceu'),P('Luana Souza','damasco'),P('Paulo Alves','menta')];
const PENDING=[P('Bruno Reis','rosado'),P('Clara Nunes','lima'),P('Diego Faria','ceu'),P('Elisa Moura','salvia')];
const DRAFTS=[['Louvor',75],['Recepção',40],['Kids',20]];
const TASKS=[{id:'t1',area:'integracao'},{id:'t2',area:'agenda'},{id:'t3',area:'agenda'}];
const WEEK=[['seg',28,null],['ter',29,null],['qua',30,'Ensaio do louvor · 20h'],['qui',1,'Reunião de líderes · 20h'],['sex',2,null],['sáb',3,'Montagem do culto · 16h'],['dom',4,'Culto de Celebração · 10h']];
const TEAMS=[['Louvor',5,5],['Recepção',3,5],['Kids',4,6]];
const NEXT=[
 {d:'09',m:'out',t:'Conferência Missões',s:'Sexta · 19h30 · Auditório',cap:[84,120,'inscritos']},
 {d:'11',m:'out',t:'Culto de Celebração',s:'Domingo · 10h · Templo',cap:[6,16,'na escala']},
 {d:'18',m:'out',t:'Batismo nas águas',s:'Domingo · 16h · Chácara Alva',ppl:[P('Ana Lima','menta'),P('João Prado','ceu'),P('Rita Dias','damasco')],more:4},
 {d:'25',m:'out',t:'Encontro de Casais',s:'Sábado · 19h · Salão social',cap:[38,40,'vagas preenchidas']},
];
const BDAYS=[[P('Marina Costa','rosado'),'hoje',1],[P('Felipe Andrade','ceu'),'qui'],[P('Juliana Prado','lima'),'sáb'],[P('Otávio Lins','menta'),'dom']];
const SERIES={'12s':{lab:['jul','','','ago','','','','set','','','','out'],v:[12,13,14,14,16,17,18,19,21,22,24,26],u:'semana'},'6m':{lab:['mai','jun','jul','ago','set','out'],v:[6,9,12,16,21,26],u:'mês'}};
const FUNNEL=[['Visitantes',4,'var(--seq1)'],['Em integração',3,'var(--seq2)'],['Membros',8,'var(--seq3)'],['Servindo',11,'var(--seq4)']];
const PEOPLE=[['Ana Beatriz Lima','Membro · Casa Vila Nova'],['Carlos Mendes','Visitante · chegou em set'],['Daniela Rocha','Líder · Louvor'],['Felipe Andrade','Membro · Recepção'],['Juliana Prado','Staff de eventos'],['Marina Costa','Líder · Kids']];
const AREAS=()=>NAV.flatMap(g=>g[1]).flatMap(n=>n[3]?n[3].map(c=>[c[0],n[1],c[1],n[2]]):[n]);
const area=id=>AREAS().find(n=>n[0]===id);
const cntBadge=()=>TASKS[0].done?'':'<span class="cnt">3</span>';
function navItem(n){
 if(!n[3])return `<button class="ni ${S.active===n[0]?'on':''}" data-a="nav" data-v="${n[0]}" ${S.active===n[0]?'aria-current="page"':''}>${ic(n[1],18)}${n[2]}</button>`;
 const inside=n[3].some(c=>c[0]===S.active),open=S.navOpen[n[0]]??inside;
 return `<div class="ntree ${open?'open':''} ${inside?'inside':''}"><button class="ni par" data-a="navToggle" data-v="${n[0]}" aria-expanded="${open}">${ic(n[1],18)}${n[2]}${!open&&n[0]==='pessoas'?cntBadge():''}<span class="chev">${ic('chevR',15,2)}</span></button>
  <div class="nsub"><div>${n[3].map(c=>`<button class="ni sub ${S.active===c[0]?'on':''}" data-a="nav" data-v="${c[0]}" ${S.active===c[0]?'aria-current="page"':''}>${c[1]}${c[0]==='integracao'?cntBadge():''}</button>`).join('')}</div></div></div>`;
}
const av=(p,cls='')=>`<span class="av ${cls}" style="background:var(--tone-${p.t});color:var(--tone-${p.t}-ink)" title="${esc(p.n)}">${p.i}</span>`;

/* ---------- render ---------- */
function sidebar(){
 const c=CHURCHES[S.church];
 const an=!S.animated;S.animated=true;return `<div class="brand">${logo(20,an)}<button class="ibtn only-m" data-a="closeSide" aria-label="Fechar menu" style="width:32px;height:32px">${ic('x',16)}</button></div>
 <div style="position:relative">
  <button class="church" data-a="churchMenu" aria-haspopup="menu"><span class="dot">${c.i}</span><span class="cn"><b>${c.n}</b><span>${c.c}</span></span>${ic('updown',16)}</button>
  <div class="pop" id="churchPop" role="menu" style="left:0;right:0;top:calc(100% + 6px)"><div class="pl">Trocar de igreja</div>${CHURCHES.map((x,i)=>`<button class="pi" role="menuitemradio" aria-checked="${i===S.church}" data-a="setChurch" data-v="${i}"><span class="dot" style="width:22px;height:22px;border-radius:7px;background:var(--brand);color:var(--on-brand);display:grid;place-items:center;font:700 10px/1 var(--font-text)">${x.i}</span>${x.n}${i===S.church?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div>
 </div>
 <button class="search" data-a="cmd">${ic('search',17)}<span>Buscar</span><kbd>⌘K</kbd></button>
 <nav class="nav" aria-label="Áreas">${NAV.map(g=>`${g[0]?`<div class="grp">${g[0]}</div>`:''}${g[1].map(navItem).join('')}`).join('')}</nav>
 <div class="me">
  <button class="mebtn" data-a="meMenu" aria-haspopup="menu"><span class="av">RP</span><span class="cn"><b>Rafael Pereira</b><span>Administrador</span></span>${ic('updown',16)}</button>
  <div class="pop" id="mePop" role="menu" style="left:0;right:0;bottom:calc(100% + 6px)">
   <div class="pl">Aparência</div>
   <div class="seg" role="group" aria-label="Tema"><button data-a="theme" data-v="dia" aria-pressed="${S.theme==='dia'}">Dia</button><button data-a="theme" data-v="noite" aria-pressed="${S.theme==='noite'}">Noite</button></div>
   <hr><button class="pi" data-a="soon" data-v="Meu perfil">${ic('user',17)}Meu perfil</button><button class="pi" data-a="soon" data-v="Preferências">${ic('sliders',17)}Preferências</button><hr><button class="pi" data-a="openMobile">${ic('phone',17)}Ver app da comunidade</button><button class="pi" data-a="soon" data-v="Vem">${ic('arrowR',17)}Abrir o Vem<span class="ck" style="color:var(--ink-soft)">↗</span></button>
   <hr><button class="pi" data-a="logout">${ic('logout',17)}Sair</button>
  </div>
 </div>`;
}
const greet=()=>{const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';};
const today=()=>new Date(2026,8,30).toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});
const openCount=()=>TASKS.filter(t=>!t.done).length;
function lede(n){return n?`<b>${n} ${n>1?'assuntos pedem':'assunto pede'}</b> sua atenção. O próximo culto é domingo, às 10h.`:'Tudo em dia. O próximo culto é domingo, às 10h.';}
function dayNote(){const w=WEEK[S.day];return w[2]?`<b>${w[0]==='qua'?'Hoje':w[0][0].toUpperCase()+w[0].slice(1)+', '+w[1]}</b>${esc(w[2])}`.replace('</b>','</b> · '):`<b>${w[0][0].toUpperCase()+w[0].slice(1)}, ${w[1]}</b> · Nada na agenda`;}

function actCards(){
 const [t1,t2,t3]=TASKS;
 return `<div class="acts" id="acts">
  <article class="card act ${t1.done?'gone':''}" id="t1" style="${t1.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--warm)"></span>Acolhimento<button class="x" data-a="done" data-v="t1" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${WAITING.length}</span><span class="u">pessoas esperando o primeiro contato</span></div>
   <div class="viz"><div style="display:flex;align-items:center;gap:10px"><span class="stack">${WAITING.map(p=>av(p)).join('')}</span><span class="who"><b>Carlos</b>, Luana e Paulo</span></div><span class="age">A mais antiga espera há 3 dias</span></div>
   <div class="foot"><button class="btn pri" data-a="goTask" data-v="t1">Acolher agora</button></div>
  </article>
  <article class="card act ${t2.done?'gone':''}" id="t2" style="${t2.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--seq3)"></span>Escala de domingo<button class="x" data-a="done" data-v="t2" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${PENDING.length}</span><span class="u">ainda sem resposta para o culto</span></div>
   <div class="viz"><div class="segl"><span><b>12</b>/16 confirmados</span><span class="stack sm">${PENDING.map(p=>av(p)).join('')}</span></div><div class="segs" aria-label="12 de 16 confirmados">${Array.from({length:16},(_,i)=>`<i class="${i<12?'':'off'}"></i>`).join('')}</div></div>
   <div class="foot"><button class="btn pri" data-a="remind">Lembrar os 4</button><button class="lnk" data-a="goTask" data-v="t2" style="margin-left:4px">Ver escala</button></div>
  </article>
  <article class="card act ${t3.done?'gone':''}" id="t3" style="${t3.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--seq2)"></span>Escalas de outubro<button class="x" data-a="done" data-v="t3" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${DRAFTS.length}</span><span class="u">em rascunho, fecham dia 10</span></div>
   <div class="viz drafts">${DRAFTS.map(d=>`<div class="dr"><span>${d[0]}</span><span class="tr"><i data-w="${d[1]}%"></i></span><b>${d[1]}%</b></div>`).join('')}</div>
   <div class="foot"><button class="btn sec" data-a="goTask" data-v="t3">Continuar montagem</button></div>
  </article>
  <article class="card act alldone" id="allDone" style="${openCount()?'display:none':''}">${logo(18,false)}<p>Tudo em dia por aqui.</p><span class="who">Nada pendente agora. Que tal olhar a escala de domingo com calma?</span><button class="lnk" data-a="undoAll">Restaurar pendências</button></article>
 </div>`;
}
function nextCard(){
 const conf=TEAMS.reduce((a,t)=>a+t[1],0),tot=TEAMS.reduce((a,t)=>a+t[2],0);
 return `<section class="nxw rise" style="--d:2" aria-labelledby="h-nx">
 <div class="sh"><h2 id="h-nx">Próximo encontro</h2><span class="pill">em 4 dias</span></div>
 <div class="card nx">
  <div class="nxh"><span class="nxd"><small>dom</small><b>4</b><small>out</small></span><div><h3>Culto de Celebração</h3><p class="when">10h · Templo principal · ~180 pessoas</p></div></div>
  <div class="nxt"><div class="nxth"><span>Equipe</span><span><b>${conf}</b> de ${tot} confirmados</span></div>
   ${TEAMS.map(t=>`<button class="nxr" data-a="team" data-v="${t[0]}"><span class="nxn">${t[0]}</span><span class="pips">${Array.from({length:t[2]},(_,i)=>`<i class="${i<t[1]?'':'off'}"></i>`).join('')}</span><b class="${t[1]<t[2]?'lack':''}">${t[1]<t[2]?`faltam ${t[2]-t[1]}`:'completa'}</b></button>`).join('')}</div>
  <button class="btn lt" data-a="nav" data-v="agenda">Abrir escala</button>
 </div></section>`;
}
function chartSVG(){
 const s=SERIES[S.range],W=600,H=150,pl=0,pb=20,pt=10,max=30,n=s.v.length;
 const x=i=>pl+i*(W-pl)/(n-1),y=v=>pt+(1-v/max)*(H-pt-pb);
 const pts=s.v.map((v,i)=>[x(i),y(v)]);
 const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
 return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Pessoas cadastradas, de ${s.v[0]} para ${s.v[n-1]}">
  <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--brand)" stop-opacity=".18"/><stop offset="1" stop-color="var(--brand)" stop-opacity="0"/></linearGradient></defs>
  <g class="grid">${[10,20,30].map(v=>`<line x1="0" x2="${W}" y1="${y(v)}" y2="${y(v)}" vector-effect="non-scaling-stroke"/>`).join('')}</g>
  <path class="area" d="${d} L${x(n-1)} ${H-pb} L${x(0)} ${H-pb} Z"/>
  <path class="ln" d="${d}" vector-effect="non-scaling-stroke" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1;animation:draw 1.2s .3s cubic-bezier(.65,0,.35,1) forwards"/>
  <line class="cross" y1="${pt}" y2="${H-pb}" vector-effect="non-scaling-stroke"/>
 </svg>
 <div class="axis-h" style="position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;font:500 10.5px/1 var(--font-text);color:var(--ink-soft)">${s.lab.map(l=>`<span style="width:0;display:flex;justify-content:center;white-space:nowrap">${l}</span>`).join('')}</div>
 <span class="mkh" style="position:absolute;width:10px;height:10px;border-radius:50%;background:var(--brand);box-shadow:0 0 0 2px var(--surface);transform:translate(-50%,-50%);opacity:0;pointer-events:none;transition:opacity .12s"></span>
 <div class="tip"></div>`;
}
function pulseCard(){
 const tot=FUNNEL.reduce((a,f)=>a+f[1],0);
 return `<section class="card pulse rise" style="--d:3" aria-labelledby="h-pl">
  <div class="sh"><h2 id="h-pl">Pulso da comunidade</h2><div class="segc" role="group" aria-label="Período"><button data-a="range" data-v="12s" aria-pressed="${S.range==='12s'}">12 sem</button><button data-a="range" data-v="6m" aria-pressed="${S.range==='6m'}">6 meses</button></div></div>
  <div class="kpis">
   <div class="kpi"><span class="kl">Pessoas cadastradas</span><span class="kv" data-count="26">0</span><span class="kd up">+14 no período</span></div>
   <div class="kpi"><span class="kl">Integrados</span><span class="kv"><span data-count="73">0</span>%</span><span class="kd">19 de 26</span></div>
   <div class="kpi"><span class="kl">Servindo</span><span class="kv" data-count="11">0</span><span class="kd">em 6 ministérios</span></div>
  </div>
  <div class="pbody">
   <div class="chart" id="chart">${chartSVG()}</div>
   <div class="funnel"><div class="fl">Caminho de integração<span>${tot} pessoas</span></div>
    <div class="fbar" role="img" aria-label="${FUNNEL.map(f=>f[0]+' '+f[1]).join(', ')}">${FUNNEL.map(f=>`<i style="background:${f[2]}" data-g="${f[1]}" title="${f[0]}: ${f[1]}"></i>`).join('')}</div>
    <div class="fleg">${FUNNEL.map(f=>`<div><i style="background:${f[2]}"></i>${f[0]}<b>${f[1]}</b></div>`).join('')}</div>
   </div>
  </div>
 </section>`;
}
function timeline(){
 return `<section class="card tl rise" style="--d:4" aria-labelledby="h-tl">
  <div class="sh"><h2 id="h-tl">Depois disso</h2><button class="lnk" data-a="nav" data-v="agenda">Agenda ${ic('arrowR',14,2)}</button></div>
  <div class="rail">${NEXT.map((e,i)=>`<button class="stop" data-a="event" data-v="${i}"><span class="d"><b>${e.d}</b><span>${e.m}</span></span><span class="bd"><span><span class="tt">${e.t}</span><br><span class="ts">${e.s}</span></span>${e.cap?`<span class="cap"><span class="tr"><i data-w="${Math.round(e.cap[0]/e.cap[1]*100)}%"></i></span><span><b>${e.cap[0]}</b>/${e.cap[1]} ${e.cap[2]}</span></span>`:`<span class="cap"><span class="stack sm">${e.ppl.map(p=>av(p)).join('')}</span><span><b>+${e.more}</b> batizandos</span></span>`}</span></button>`).join('')}</div>
 </section>`;
}
function bdays(){
 return `<section class="card bday rise" style="--d:5" aria-labelledby="h-bd">
  <div class="sh"><h2 id="h-bd">Aniversários da semana</h2><span class="who">Toque para enviar uma felicitação</span></div>
  <div class="bdays">${BDAYS.map((b,i)=>`<button class="bd1 ${b[2]?'today':''} ${b.sent?'sent':''}" data-a="bday" data-v="${i}" title="Enviar felicitação">${av(b[0])}<span class="tx"><b>${b[0].n.split(' ')[0]}</b><span>${b[1]}</span></span></button>`).join('')}</div>
 </section>`;
}
function home(){
 const n=openCount();
 return `<header class="hd rise"><div><p class="eb">${today()}</p><h1>${greet()}, <em>Rafael</em>.</h1><p class="lede" id="lede">${lede(n)}</p></div></header>
 <div class="dash">
  <div class="col">
   <section class="att rise" style="--d:1" aria-labelledby="h-att"><div class="sh"><h2 id="h-att">Precisa da sua atenção <span class="pill" id="cnt" style="${n?'':'visibility:hidden'}">${n}</span></h2><button class="lnk" data-a="undoAll" id="undoAll" style="${n<3?'':'display:none'}">Restaurar</button></div>${actCards()}</section>
   ${pulseCard()}
   ${bdays()}
  </div>
  <div class="col">${nextCard()}${timeline()}</div>
 </div>`;
}
function placeholder(id){const n=area(id);
 return `<header class="hd rise"><div><p class="eb">${n[3]||"Alva Web"}</p><h1>${n[2]}</h1><p class="lede">Esta área entra nas próximas etapas do protótipo.</p></div></header>
 <section class="card rise" style="--d:1;padding:56px 24px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center"><span class="av" style="width:52px;height:52px;border-radius:16px;background:var(--brand-soft);color:var(--brand-text)">${ic(n[1],22)}</span><p style="margin:6px 0 0;font:italic 400 24px/28px var(--font-serif)">Em construção.</p><span style="font:400 14px/20px var(--font-text);color:var(--ink-muted)">Envie o print da tela atual e redesenhamos seguindo o mesmo sistema.</span><button class="lnk" data-a="nav" data-v="hoje" style="margin-top:6px">Voltar para Hoje ${ic('arrowR',14,2)}</button></section>`;}
function topbar(){const c=CHURCHES[S.church];return `<button class="ibtn" data-a="side" aria-label="Abrir menu">${ic('menu',18)}</button>${logo(16,false)}<button class="ibtn" data-a="cmd" aria-label="Buscar">${ic('search',17)}</button><button class="ibtn" data-a="side" aria-label="${c.n}" style="background:var(--brand);color:var(--on-brand);box-shadow:none;font:700 11px/1 var(--font-text)">${c.i}</button>`;}
function render(){
 document.documentElement.dataset.theme=S.theme;
 if(S.auth){document.body.classList.add('authmode');$('#auth').innerHTML=authView();authAfter();return;}
 document.body.classList.remove('authmode');$('#auth').innerHTML='';
 $('#side').innerHTML=sidebar();$('#topbar').innerHTML=topbar();
 $('#main .wrap').innerHTML=S.active==='hoje'?home():S.active==='membros'?(S.member?profile():members()):S.active==='integracao'?(S.integ?integDetail():integList()):S.active==='discipulado'?(S.disc?discDetail():discList()):S.active==='acompanhamento'?casesList():S.active==='oracao'?prayerList():S.active==='casas'?(S.casa?casaDetail():casasList()):S.active==='redes'?redesList():S.active==='ministerios'?(S.mini?miniDetail():minisList()):S.active==='kvis'?kVis():S.active==='ksalas'?kSalas():S.active==='ktimes'?kTimes():S.active==='kturmas'?kTurmas():S.active==='usuarios'?(S.user?userDetail():usersList()):S.active==='multi'?multiList():S.active==='auditoria'?auditPage():placeholder(S.active);
 if(['usuarios','multi','auditoria'].includes(S.active))admAfter();
 if(S.active==='redes'||S.active==='ministerios')rmAfter();
 if(S.active==='casas')casasAfter();
 if(S.active==='acompanhamento')cuidadoAfter();
 if(S.active==='discipulado')discAfter();
 if(S.active==='membros')peopleAfter();
 if(S.active==='integracao')integAfter();
 requestAnimationFrame(()=>requestAnimationFrame(animateIn));
 requestAnimationFrame(()=>{const on=$('.nav .ni.on'),nv=$('.nav');if(on&&nv){const r=on.getBoundingClientRect(),n=nv.getBoundingClientRect();if(r.bottom>n.bottom-8||r.top<n.top)nv.scrollTop+=r.top-n.top-n.height/2;}});
 if(S.active==='hoje')bindChart();
}
function animateIn(){countUp();$$('[data-w]').forEach(b=>b.style.width=b.dataset.w);$$('.ring .fg').forEach(c=>c.style.strokeDashoffset=c.dataset.off);$$('.fbar i').forEach(i=>i.style.flexGrow=i.dataset.g);}
function countUp(){$$('[data-count]').forEach(el=>{const to=+el.dataset.count,t0=performance.now(),D=900;const f=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e);if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);});}
function softSide(){const sc=$('.nav')?.scrollTop||0;$('#side').innerHTML=sidebar();$('#topbar').innerHTML=topbar();$('.nav').scrollTop=sc;}
function bindChart(){const ch=$('#chart');if(!ch)return;const svg=ch.querySelector('svg'),tip=ch.querySelector('.tip'),mk=ch.querySelector('.mkh'),cr=ch.querySelector('.cross');
 const move=e=>{const s=SERIES[S.range],r=svg.getBoundingClientRect(),n=s.v.length;const px=(e.touches?e.touches[0].clientX:e.clientX)-r.left;const i=Math.max(0,Math.min(n-1,Math.round(px/r.width*(n-1))));
  const X=i/(n-1)*r.width,Y=(10+(1-s.v[i]/30)*120)/150*r.height;ch.classList.add('hov');cr.setAttribute('x1',i/(n-1)*600);cr.setAttribute('x2',i/(n-1)*600);
  mk.style.left=X+'px';mk.style.top=Y+'px';mk.style.opacity=1;tip.style.left=Math.max(50,Math.min(r.width-50,X))+'px';tip.style.top=Y-8+'px';
  const prev=i?s.v[i]-s.v[i-1]:0;tip.innerHTML=`<b>${s.v[i]}</b> pessoas${i?` · ${prev>0?'+'+prev:'sem mudança'} na ${s.u}`:''}`;};
 const out=()=>{ch.classList.remove('hov');mk.style.opacity=0;};
 ch.addEventListener('mousemove',move);ch.addEventListener('touchmove',move,{passive:true});ch.addEventListener('mouseleave',out);ch.addEventListener('touchend',out);}

/* ================= Pessoas › Membros ================= */
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const ST={
 solicitado:{l:'Solicitado',step:1,c:'var(--st-sol)',bg:'var(--st-sol-bg)'},
 aceita:{l:'Aceita',step:2,c:'var(--st-ace)',bg:'var(--st-ace-bg)'},
 integrado:{l:'Integrado',step:3,c:'var(--st-int)',bg:'var(--st-int-bg)'},
 recusado:{l:'Recusado',step:0,c:'var(--st-rec)',bg:'var(--st-rec-bg)'},
};
const MONTHS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const monthLabel=k=>{const [y,m]=k.split('-');return MONTHS[+m-1][0].toUpperCase()+MONTHS[+m-1].slice(1)+' '+y;};
const mShort=k=>{const [y,m]=k.split('-');return MONTHS[+m-1].slice(0,3)+'/'+y.slice(2);};
const TONES=['ceu','menta','damasco','rosado','lima','salvia'];
let _mid=0;
const M=(n,e,ph,int,st,min,o={})=>({id:'m'+(++_mid),n,e,ph,int,st,min,tone:o.tone||TONES[_mid%6],bap:o.bap!==false,tit:o.tit!==false,dup:o.dup||null,role:o.role||'Membro da equipe',since:o.since||'jan/2026',nasc:o.nasc||'1990-05-10',gen:o.gen||'Feminino',civil:o.civil||'Casado(a)',conv:o.conv||'Mais de 10 anos',def:false,pastor:false,second:false,addr:o.addr||{cep:'04538-132',rua:'R. Tabapuã',num:'540',bairro:'Itaim Bibi',cid:'São Paulo',uf:'SP',comp:''},fam:o.fam||[],app:o.app||{st:'ativo',last:'há 3 dias'},attend:o.attend||[1,1,0,1,1,1,1,0,1,1]});
const MEMBERS=[
 M('Ana Clara Lima','anaclara@email.com','(11) 99241-3301','2026-09','integrado',['Louvor'],{tone:'ceu',dup:'m2',nasc:'1997-03-14',civil:'Solteiro(a)',conv:'Entre 5 e 10 anos',addr:{cep:'01310-100',rua:'Av. Paulista',num:'1200',bairro:'Bela Vista',cid:'São Paulo',uf:'SP',comp:''},app:{st:'ativo',last:'há 2 dias'}}),
 M('Ana Clara Lima','anaclara@email.com','(11) 98800-1234','2026-07','solicitado',[],{tone:'ceu',dup:'m1',bap:false}),
 M('Carlos Eduardo Silva','carlos.edu@email.com','(11) 98754-2201','2026-09','aceita',[],{gen:'Masculino',bap:false,tone:'menta'}),
 M('Beatriz Martins Silva','beatriz.ms@email.com','(11) 98754-2202','2026-09','aceita',[],{tone:'rosado'}),
 M('Juliana Costa Ferreira','juliana.cf@email.com','(11) 97643-9912','2026-08','integrado',['Kids'],{tone:'lima',fam:[['m6','Filho']]}),
 M('Pedro Costa Ferreira','','','2026-08','integrado',[],{tit:false,gen:'Masculino',tone:'lima',civil:'Solteiro(a)',nasc:'2014-02-02',fam:[['m5','Mãe']],app:{st:'sem conta'}}),
 M('Marcos Souza Ramos','marcos.sramos@email.com','(11) 98123-4456','2026-08','integrado',['Jovens'],{gen:'Masculino',dup:'m8',tone:'salvia'}),
 M('Marcos Souza Ramos','ramos.antigo@email.com','(11) 98123-4456','2026-07','solicitado',[],{gen:'Masculino',dup:'m7',tone:'salvia'}),
 M('Patrícia Oliveira Nunes','patricia.on@email.com','(11) 97800-8823','2026-07','integrado',['Comunicação'],{tone:'damasco'}),
 M('Daniela Rocha','dani.rocha@email.com','(11) 99102-7781','2026-06','integrado',['Louvor'],{role:'Líder',tone:'rosado',since:'mar/2025'}),
 M('Felipe Andrade','felipe.and@email.com','(11) 98877-1020','2026-06','integrado',['Recepção'],{gen:'Masculino',tone:'ceu'}),
 M('Marina Costa','marina.costa@email.com','(11) 99654-3321','2026-05','integrado',['Kids'],{role:'Líder',tone:'rosado',since:'ago/2024'}),
 M('Lucas Teixeira','lucas.tx@email.com','(11) 97231-5540','2026-09','solicitado',[],{gen:'Masculino',bap:false,tone:'menta'}),
 M('Juliana Prado','ju.prado@email.com','(11) 98012-4431','2026-05','integrado',['Eventos'],{tone:'lima'}),
 M('Bruno Reis','bruno.reis@email.com','(11) 99300-1188','2026-04','integrado',['Louvor'],{gen:'Masculino',tone:'damasco'}),
 M('Clara Nunes','clara.nunes@email.com','(11) 98455-9090','2026-04','integrado',['Recepção'],{tone:'lima'}),
 M('Diego Faria','diego.faria@email.com','(11) 97766-2210','2026-04','integrado',['Mídia'],{gen:'Masculino',tone:'ceu'}),
 M('Elisa Moura','elisa.moura@email.com','(11) 99888-4512','2026-03','integrado',['Kids','Louvor'],{tone:'salvia'}),
 M('Otávio Lins','otavio.lins@email.com','(11) 98111-6677','2026-03','integrado',[],{gen:'Masculino',tone:'menta'}),
 M('Renata Campos','renata.c@email.com','(11) 97002-3345','2026-03','integrado',['Intercessão'],{tone:'damasco'}),
 M('Thiago Barros','thiago.b@email.com','(11) 99745-1102','2026-02','integrado',['Jovens'],{gen:'Masculino',tone:'ceu',fam:[['m22','Filha']]}),
 M('Sofia Barros','','','2026-02','integrado',[],{tit:false,bap:false,tone:'rosado',civil:'Solteiro(a)',nasc:'2012-07-21',fam:[['m21','Pai']],app:{st:'sem conta'}}),
 M('Gustavo Mendes','gustavo.m@email.com','(11) 98543-7788','2026-02','recusado',[],{gen:'Masculino',tone:'salvia',bap:false}),
 M('Helena Duarte','helena.d@email.com','(11) 99432-1009','2026-01','integrado',['Louvor'],{tone:'lima'}),
 M('Igor Santana','igor.s@email.com','(11) 97654-0032','2026-01','aceita',[],{gen:'Masculino',tone:'damasco'}),
 M('Larissa Pires','larissa.p@email.com','(11) 98990-5541','2026-01','integrado',['Diaconia'],{tone:'menta'}),
];
const MIN_ALL=['Louvor','Kids','Jovens','Recepção','Mídia','Comunicação','Intercessão','Diaconia','Eventos','Zeladoria'];
Object.assign(S,{sort:{k:'int',d:-1},filter:'todos',q:'',month:'todas',member:null,tab:'geral',edit:null});
const byId=id=>MEMBERS.find(m=>m.id===id);
const initials=n=>n.split(' ').filter(w=>w.length>2||w===w.toUpperCase()).map(w=>w[0]).slice(0,2).join('')||n.slice(0,2);
const mav=(m,cls='')=>`<span class="av ${cls}" style="background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${initials(m.n)}</span>`;
const age=d=>{const b=new Date(d),t=new Date(2026,8,30);let a=t.getFullYear()-b.getFullYear();if(t<new Date(t.getFullYear(),b.getMonth(),b.getDate()))a--;return a;};
const fmtDate=d=>{const [y,m,dd]=d.split('-');return `${+dd} de ${MONTHS[+m-1]} de ${y}`;};
const dupPairs=()=>{const s=new Set(),out=[];MEMBERS.forEach(m=>{if(m.dup&&byId(m.dup)&&!s.has(m.id)){s.add(m.id);s.add(m.dup);out.push([m,byId(m.dup)]);}});return out;};

function journey(st,compact){
 if(st==='recusado')return `<span class="jr rec" title="Recusado"><i></i><i></i><i></i><em>Recusado</em></span>`;
 const k=ST[st].step;return `<span class="jr s${k}" title="${ST[st].l}"><i></i><i></i><i></i><em>${ST[st].l}</em></span>`;
}
function filtered(){const q=norm(S.q);return MEMBERS.filter(m=>(S.filter==='todos'||m.st===S.filter)&&(S.month==='todas'||m.int===S.month)&&(!q||norm(m.n+' '+m.e+' '+m.ph+' '+m.min.join(' ')).includes(q)));}

/* ---------- list ---------- */
function stPill(st){return `<span class="stp" style="--c:${ST[st].c};--b:${ST[st].bg}"><i></i>${ST[st].l}</span>`;}
function sorted(list){const {k,d}=S.sort;return list.slice().sort((a,b)=>{const va=k==='int'?a.int:k==='st'?ST[a.st].step:norm(a[k]),vb=k==='int'?b.int:k==='st'?ST[b.st].step:norm(b[k]);return (va<vb?-1:va>vb?1:0)*d||norm(a.n).localeCompare(norm(b.n));});}
function members(){
 const tot=MEMBERS.length,cnt=k=>MEMBERS.filter(m=>m.st===k).length,bap=MEMBERS.filter(m=>m.bap).length,tit=MEMBERS.filter(m=>m.tit).length,integ=cnt('integrado');
 const dups=dupPairs();
 const months=[...new Set(MEMBERS.map(m=>m.int))].sort().reverse();
 return `<header class="ph rise">
  <div><p class="eb">Pessoas</p><h1>Membros</h1><p class="lede">${tot} membros cadastrados</p></div>
  <div class="pact">
   <div style="position:relative"><button class="btn sec" data-a="exportMenu" aria-haspopup="menu">Exportar${ic('updown',14)}</button>
    <div class="pop" id="exportPop" role="menu" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="todos os membros">Todos os membros</button><button class="pi" data-a="export" data-v="membros aceitos">Membros aceitos</button><button class="pi" data-a="export" data-v="membros integrados">Membros integrados</button><button class="pi" data-a="export" data-v="a integração selecionada" ${S.month==='todas'?'disabled':''}>Desta integração${S.month==='todas'?'<small style="margin-left:auto;color:var(--ink-soft)">filtre um mês</small>':''}</button></div></div>
   <div style="position:relative"><button class="btn sec" data-a="reportMenu" aria-haspopup="menu">Relatório${ic('updown',14)}</button>
    <div class="pop" id="reportPop" role="menu" style="right:0;top:calc(100% + 6px);min-width:200px"><button class="pi" data-a="export" data-v="o relatório por família">Por família</button></div></div>
   <button class="btn pri" data-a="addMember">${ic('plus',15,2.2)}Adicionar membro</button>
  </div>
 </header>
 <section class="card kpis4 rise" style="--d:1" aria-label="Resumo">
  <div class="k4"><span class="kl">Total de membros</span><span class="kv">${tot}</span><span class="kd">cadastrados</span></div>
  <div class="k4"><span class="kl">Integrados</span><span class="kv">${integ}</span><span class="kmeter"><i style="width:${Math.round(integ/tot*100)}%"></i></span><span class="kd">${Math.round(integ/tot*100)}% do total</span></div>
  <div class="k4"><span class="kl">Batizados</span><span class="kv">${bap}</span><span class="kmeter"><i style="width:${Math.round(bap/tot*100)}%"></i></span><span class="kd">${Math.round(bap/tot*100)}% do total</span></div>
  <div class="k4"><span class="kl">Titulares</span><span class="kv">${tit}</span><span class="kd">${tot-tit} dependentes</span></div>
 </section>
 ${dups.length?`<div class="dupn rise" style="--d:2"><span class="dd"></span><span><b>${dups.length} possíveis cadastros duplicados</b> · ${dups.map(p=>p[0].n).join(' e ')}</span><button class="lnk" data-a="dupes">Revisar ${ic('arrowR',14,2)}</button></div>`:''}
 <section class="card mtab rise" style="--d:3" aria-label="Lista de membros">
  <div class="tbar">
   <label class="sbox">${ic('search',16)}<input id="mq" placeholder="Pesquisar membro" value="${esc(S.q)}" autocomplete="off"><kbd>/</kbd></label>
   <div style="position:relative"><button class="btn sec sel" data-a="monthMenu" aria-haspopup="menu">${S.month==='todas'?'Todas as integrações':'Integração de '+monthLabel(S.month).toLowerCase()}${ic('updown',14)}</button>
    <div class="pop" id="monthPop" role="menu" style="left:0;top:calc(100% + 6px);max-height:300px;overflow:auto"><button class="pi" data-a="month" data-v="todas">Todas as integrações${S.month==='todas'?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button><hr>${months.map(k=>`<button class="pi" data-a="month" data-v="${k}">${monthLabel(k)}<small style="margin-left:6px;color:var(--ink-soft)">${MEMBERS.filter(m=>m.int===k).length}</small>${S.month===k?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>
   <div class="chips" role="tablist" aria-label="Status">${['todos','integrado','aceita','solicitado','recusado'].map(k=>`<button role="tab" class="chipf ${S.filter===k?'on':''}" data-a="filter" data-v="${k}" aria-selected="${S.filter===k}">${k==='todos'?'Todos':`<i style="background:${ST[k].c}"></i>${ST[k].l}`}<small>${k==='todos'?tot:cnt(k)}</small></button>`).join('')}</div>
  </div>
  <div id="mrows">${rows()}</div>
 </section>`;
}
function rows(){
 const list=sorted(filtered());
 const th=(k,l)=>`<button class="th ${S.sort.k===k?'on':''}" data-a="sort" data-v="${k}">${l}${S.sort.k===k?`<span class="sd ${S.sort.d<0?'dn':''}">${ic('chevR',12,2.4)}</span>`:''}</button>`;
 if(!list.length)return `<div class="mempty"><p>Ninguém por aqui.</p><span>Nenhum membro corresponde a esses filtros.</span><button class="lnk" data-a="clearFilters">Limpar filtros</button></div>`;
 return `<div class="trow thead" role="row">${th('n','Nome')}<span>E-mail</span><span>Telefone</span>${th('int','Integração')}<span>Ministério</span>${th('st','Status')}<span></span></div>
 ${list.map(row).join('')}
 <div class="tfoot"><span>${list.length} ${list.length>1?'resultados':'resultado'}</span>${S.filter!=='todos'||S.q||S.month!=='todas'?'<button class="lnk" data-a="clearFilters">Limpar filtros</button>':''}</div>`;
}
function row(m){
 return `<div class="trow ${S.flash===m.id?'flash':''}" role="row" tabindex="0" data-a="open" data-v="${m.id}">
  <span class="tn">${mav(m)}<span><b>${esc(m.n)}</b>${!m.tit?'<em class="tag">Dependente</em>':''}${m.dup?'<em class="tag warn" title="Possível duplicado">Duplicado?</em>':''}</span></span>
  <span class="te ${m.e?'':'nil'}">${m.e?`<span class="cp" data-a="copy" data-v="${esc(m.e)}" title="Copiar">${esc(m.e)}</span>`:'<span class="soft">—</span>'}</span>
  <span class="tp mono ${m.ph?'':'nil'}">${m.ph||'<span class="soft">—</span>'}</span>
  <span class="ti">${monthLabel(m.int).replace(' ','/')}</span>
  <span class="tm">${m.min.length?m.min.join(', '):'<span class="soft">—</span>'}</span>
  <span class="ts">${stPill(m.st)}</span>
  <span class="tc">${ic('chevR',16)}</span>
 </div>`;
}

/* ---------- profile ---------- */
const TABS=[['geral','Visão geral'],['dados','Dados'],['familia','Família'],['min','Ministérios'],['hist','Histórico']];
function profile(){
 const m=byId(S.member);if(!m){S.member=null;return members();}
 const first=m.n.split(' ')[0];
 return `<nav class="crumb rise" aria-label="Você está em"><span class="soft">Pessoas</span>${ic('chevR',13,2)}<button class="lnk back" data-a="backList">Membros</button>${ic('chevR',13,2)}<span>${esc(m.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${mav(m,'xl')}<div class="pn"><h1>${esc(m.n)}</h1><p>${m.tit?'Titular':'Dependente'} · Integração de ${monthLabel(m.int).toLowerCase()}${m.nasc?` · ${age(m.nasc)} anos`:''}</p>
   <div class="pchips"><span class="chip st" style="--c:${ST[m.st].c};--b:${ST[m.st].bg}"><i></i>${ST[m.st].l}</span>${m.bap?'<span class="chip">Batizado(a)</span>':''}${m.min.map(x=>`<span class="chip">${x}</span>`).join('')}</div></div></div>
  <div class="pact">
   ${m.ph?`<button class="ibtn" data-a="wa" data-v="${m.id}" title="WhatsApp" aria-label="WhatsApp">${ic('message',17)}</button><button class="ibtn" data-a="call" data-v="${m.id}" title="Ligar" aria-label="Ligar">${ic('phone',17)}</button>`:''}
   ${m.e?`<button class="ibtn" data-a="copy" data-v="${esc(m.e)}" title="Copiar e-mail" aria-label="Copiar e-mail">${ic('mail',17)}</button>`:''}
   <div style="position:relative"><button class="ibtn" data-a="profMenu" aria-label="Mais ações">${ic('dots',17)}</button>
    <div class="pop" id="profPop" role="menu" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="inactivate">${ic('pause',17)}Inativar cadastro</button><hr><button class="pi danger" data-a="delMember">${ic('x',17)}Excluir cadastro</button></div></div>
  </div>
  <div class="ptabs" role="tablist">${TABS.map(t=>`<button role="tab" class="${S.tab===t[0]?'on':''}" aria-selected="${S.tab===t[0]}" data-a="tab" data-v="${t[0]}">${t[1]}${t[0]==='familia'&&m.fam.length?`<small>${m.fam.length}</small>`:''}${t[0]==='min'&&m.min.length?`<small>${m.min.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="ptab" class="rise" style="--d:2">${tabBody(m)}</div>`;
}
function tabBody(m){return ({geral:tGeral,dados:tDados,familia:tFam,min:tMin,hist:tHist})[S.tab](m);}
function history(m){
 const h=[['Cadastro criado','Pelo app','sys',`02 ${mShort(m.int).split('/')[0]}`]];
 if(m.st!=='recusado'){h.push(['Pediu para se integrar','Pelo app','sys',`05 ${mShort(m.int).split('/')[0]}`]);}
 if(ST[m.st].step>=2)h.push(['Integração aceita','Rafael Pereira','rp',`12 ${mShort(m.int).split('/')[0]}`]);
 if(m.st==='integrado')h.push(['Integrado(a) à comunidade','Rafael Pereira','rp',`26 ${mShort(m.int).split('/')[0]}`]);
 if(m.st==='recusado')h.push(['Integração recusada','Rafael Pereira','rp',`09 ${mShort(m.int).split('/')[0]}`]);
 m.min.forEach(x=>h.push([`Entrou no ministério ${x}`,'Daniela Rocha','dr',m.since]));
 return h;
}
function tGeral(m){
 const steps=[['Cadastro',1],['Solicitou',1],['Aceita',ST[m.st].step>=2],['Integrada',ST[m.st].step>=3],['Batismo',m.bap],['Serve',m.min.length>0]];
 const cur=steps.findIndex(s=>!s[1]);
 const att=m.attend,pres=att.filter(Boolean).length;
 return `<div class="pgrid">
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Caminhada</h2><span class="who">${m.st==='recusado'?'Integração recusada':cur===-1?'Caminho completo':'Próximo passo: <b>'+steps[cur][0].toLowerCase()+'</b>'}</span></div>
    <ol class="walk">${steps.map((s,i)=>`<li class="${s[1]?'done':i===cur?'next':''}"><span class="wd">${s[1]?ic('check',13,2.6):''}</span><span class="wl">${s[0]}</span></li>`).join('')}</ol>
   </section>
   <section class="card pc"><div class="sh"><h2>Onde serve</h2><button class="lnk" data-a="tab" data-v="min">Ministérios ${ic('arrowR',14,2)}</button></div>
    ${m.min.length?`<div class="serve">${m.min.map(x=>`<div class="sv"><div><b>${x}</b><span>${m.role} · desde ${m.since}</span></div><div class="attd" title="${pres} de ${att.length} últimas escalas">${att.map(a=>`<i class="${a?'':'off'}"></i>`).join('')}</div><span class="who"><b>${pres}</b> de ${att.length} escalas</span></div>`).join('')}</div>`:`<div class="soft-empty"><p>${m.n.split(' ')[0]} ainda não serve em nenhum ministério.</p><button class="btn sec" data-a="addMin">${ic('plus',14,2.2)}Vincular a um ministério</button></div>`}
   </section>
   <section class="card pc"><div class="sh"><h2>Família</h2><button class="lnk" data-a="tab" data-v="familia">Ver família ${ic('arrowR',14,2)}</button></div>${famStrip(m)}</section>
  </div>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Contato</h2></div>
    <dl class="kv">
     <div><dt>E-mail</dt><dd>${m.e?`<span class="cp" data-a="copy" data-v="${esc(m.e)}">${esc(m.e)}</span>`:'<span class="soft">Não informado</span>'}</dd></div>
     <div><dt>Telefone</dt><dd class="mono">${m.ph||'<span class="soft">Não informado</span>'}</dd></div>
     <div><dt>Endereço</dt><dd>${m.addr.rua}, ${m.addr.num}<br><span class="soft">${m.addr.bairro} · ${m.addr.cid}/${m.addr.uf} · ${m.addr.cep}</span></dd></div>
     <div><dt>Nascimento</dt><dd>${fmtDate(m.nasc)}</dd></div>
    </dl></section>
   <section class="card pc appc"><div class="sh"><h2>Conta no app</h2><span class="chip st" style="--c:${m.app.st==='ativo'?'var(--st-int)':m.app.st==='suspensa'?'var(--st-rec)':'var(--ink-soft)'};--b:${m.app.st==='ativo'?'var(--st-int-bg)':m.app.st==='suspensa'?'var(--st-rec-bg)':'var(--surface-2)'}"><i></i>${m.app.st==='ativo'?'Ativa':m.app.st==='suspensa'?'Suspensa':'Sem conta'}</span></div>
    ${m.app.st==='sem conta'?`<p class="who" style="margin:10px 0 14px">Dependentes usam o app pela conta do titular.</p>`:`<p class="who" style="margin:10px 0 14px">${esc(m.e)}${m.app.last?` · último acesso ${m.app.last}`:''}</p><div class="row2"><button class="btn sec" data-a="resetPw">Redefinir senha</button><button class="btn ghostd" data-a="suspend">${m.app.st==='suspensa'?'Reativar acesso':'Suspender acesso'}</button></div>`}
   </section>
   <section class="card pc"><div class="sh"><h2>Últimos registros</h2><button class="lnk" data-a="tab" data-v="hist">Histórico ${ic('arrowR',14,2)}</button></div>
    <ol class="mini-tl">${history(m).slice(-3).reverse().map(h=>`<li><b>${h[0]}</b><span>${h[3]} · ${h[1]}</span></li>`).join('')}</ol></section>
  </div>
 </div>`;
}
function famStrip(m){
 if(!m.fam.length)return `<div class="famempty"><span class="fdots">${mav(m)}<i></i><span class="av ghost">${ic('plus',16,2)}</span></span><div><p>Nenhum familiar vinculado.</p><span class="who">Vincule cônjuge, filhos ou pais para relatórios por família.</span></div><button class="btn sec" data-a="addFam">Vincular</button></div>`;
 return `<div class="famrow">${mav(m)}${m.fam.map(f=>{const p=byId(f[0]);return p?`<i class="fl"></i><button class="fm" data-a="open" data-v="${p.id}">${mav(p)}<span><b>${p.n.split(' ')[0]}</b><small>${f[1]}</small></span></button>`:''}).join('')}</div>`;
}
/* Dados: read-first sections, edit in place */
const SECS={
 pess:{t:'Dados pessoais',f:[['n','Nome completo','text'],['e','E-mail','email'],['ph','Telefone','tel'],['nasc','Data de nascimento','date'],['gen','Gênero','seg',['Feminino','Masculino']],['civil','Estado civil','select',['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)']]]},
 fe:{t:'Vida na igreja',f:[['bap','Batizado(a)','bool'],['conv','Tempo de conversão','select',['Menos de 1 ano','Entre 1 e 5 anos','Entre 5 e 10 anos','Mais de 10 anos']],['st','Status de integração','select',['solicitado','aceita','integrado','recusado']],['second','Segunda aliança de casamento','bool'],['pastor','Consagrado(a) a pastor(a)','bool'],['def','Possui deficiência física','bool']]},
 end:{t:'Endereço',f:[['addr.cep','CEP','text'],['addr.rua','Rua','text'],['addr.num','Número','text'],['addr.bairro','Bairro','text'],['addr.cid','Cidade','text'],['addr.uf','Estado','text'],['addr.comp','Complemento','text']]},
};
const gv=(m,k)=>k.split('.').reduce((o,x)=>o&&o[x],m);
const sv=(m,k,v)=>{const p=k.split('.');if(p.length>1)m[p[0]][p[1]]=v;else m[k]=v;};
function showVal(f,v){if(f[2]==='bool')return v?'Sim':'Não';if(f[0]==='st')return ST[v].l;if(f[2]==='date')return v?fmtDate(v):'';return v;}
function tDados(m){return `<div class="dgrid">${Object.keys(SECS).map(k=>secCard(m,k)).join('')}</div>`;}
function secCard(m,k){
 const s=SECS[k],ed=S.edit===k;
 return `<section class="card pc sec ${ed?'editing':''}" id="sec-${k}"><div class="sh"><h2>${s.t}</h2>${ed?'':`<button class="btn sec sm" data-a="editSec" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" data-sec="${k}" novalidate>${s.f.map(f=>field(m,f)).join('')}<div class="dfoot"><button type="button" class="btn sec" data-a="cancelSec">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid">${s.f.map(f=>{const v=showVal(f,gv(m,f[0]));return `<div><dt>${f[1]}</dt><dd>${v===''||v==null?'<span class="soft">Não informado</span>':esc(v)}</dd></div>`;}).join('')}</dl>`}
 </section>`;
}
function field(m,f){const v=gv(m,f[0]),id='f-'+f[0].replace('.','-');
 if(f[2]==='bool')return `<div class="fld"><span class="fl">${f[1]}</span><div class="yn" role="radiogroup" aria-label="${f[1]}"><label><input type="radio" name="${f[0]}" value="1" ${v?'checked':''}><span>Sim</span></label><label><input type="radio" name="${f[0]}" value="0" ${!v?'checked':''}><span>Não</span></label></div></div>`;
 if(f[2]==='seg')return `<div class="fld"><span class="fl">${f[1]}</span><div class="yn" role="radiogroup">${f[3].map(o=>`<label><input type="radio" name="${f[0]}" value="${o}" ${v===o?'checked':''}><span>${o}</span></label>`).join('')}</div></div>`;
 if(f[2]==='select')return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="${f[0]}">${f[3].map(o=>`<option value="${o}" ${v===o?'selected':''}>${f[0]==='st'?ST[o].l:o}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;
 return `<label class="fld ${f[0]==='addr.comp'||f[0]==='n'?'wide':''}" for="${id}"><span class="fl">${f[1]}</span><input id="${id}" name="${f[0]}" type="${f[2]}" value="${esc(v||'')}" ${f[0]==='n'?'required':''}><span class="err"></span></label>`;
}
function tFam(m){
 return `<section class="card pc"><div class="sh"><h2>Composição familiar</h2><button class="btn sec sm" data-a="addFam">${ic('plus',14,2.2)}Vincular familiar</button></div>
  ${m.fam.length?`<div class="famtree"><div class="fcenter">${mav(m,'lg')}<b>${m.n.split(' ')[0]}</b><small>${m.tit?'Titular':'Dependente'}</small></div><div class="fbranch">${m.fam.map((f,i)=>{const p=byId(f[0]);return `<div class="fnode"><button class="fcard" data-a="open" data-v="${p.id}">${mav(p)}<span><b>${esc(p.n)}</b><small>${f[1]} · ${p.tit?'Titular':'Dependente'}${p.nasc?' · '+age(p.nasc)+' anos':''}</small></span></button><button class="x" data-a="unlink" data-v="${i}" title="Desvincular" aria-label="Desvincular">${ic('x',14)}</button></div>`;}).join('')}</div></div>`
  :famStrip(m)}
 </section>`;
}
function tMin(m){
 return `<section class="card pc"><div class="sh"><h2>Ministérios</h2><button class="btn sec sm" data-a="addMin">${ic('plus',14,2.2)}Vincular</button></div>
  ${m.min.length?`<div class="mins">${m.min.map((x,i)=>{const pres=m.attend.filter(Boolean).length;return `<article class="minc2"><div class="mt"><b>${x}</b><div style="position:relative"><button class="ibtn sm" data-a="minMenu" data-v="${i}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="minPop${i}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="soon" data-v="Alterar função">Alterar função</button><button class="pi danger" data-a="unMin" data-v="${i}">Remover do ministério</button></div></div></div><span class="who">${m.role} · desde ${m.since}</span><div class="attd big">${m.attend.map(a=>`<i class="${a?'':'off'}"></i>`).join('')}</div><div class="segl"><span><b>${pres}</b> de ${m.attend.length} últimas escalas</span><span>próxima: dom, 4 out</span></div></article>`;}).join('')}</div>`
  :`<div class="soft-empty"><p>Sem ministérios por enquanto.</p><button class="btn pri" data-a="addMin">${ic('plus',14,2.2)}Vincular a um ministério</button></div>`}
 </section>`;
}
function tHist(m){const h=history(m).reverse();
 return `<section class="card pc"><div class="sh"><h2>Histórico</h2><span class="who">${h.length} registros</span></div>
  <ol class="htl">${h.map(x=>`<li><span class="hd2">${x[3]}</span><span class="hdot ${x[2]}"></span><span class="hb"><b>${x[0]}</b><span>${x[2]==='sys'?'Automático · '+x[1]:'por '+x[1]}</span></span></li>`).join('')}</ol></section>`;
}

/* ---------- dialogs / sheets ---------- */
function openDlg(html,cls=''){closeDlg(true);const d=document.createElement('div');d.className='dlgw';d.innerHTML=`<div class="dlg ${cls}" role="dialog" aria-modal="true">${html}</div>`;document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('open'));d.addEventListener('click',e=>{if(e.target===d)closeDlg();});setTimeout(()=>d.querySelector('input,button.pri')?.focus(),60);return d;}
function closeDlg(now){$$('.dlgw').forEach(d=>{if(now){d.remove();return;}d.classList.remove('open');setTimeout(()=>d.remove(),240);});}
const dlgHead=(t,s)=>`<div class="dh"><div><h3>${t}</h3>${s?`<p>${s}</p>`:''}</div><button class="ibtn sm" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>`;

function peopleAfter(){
 requestAnimationFrame(()=>{$$('.stseg i').forEach(i=>i.style.flexGrow=i.dataset.g);tabInd();});
 const q=$('#mq');if(q){q.addEventListener('input',e=>{S.q=e.target.value;$('#mrows').innerHTML=rows();});}
 $$('form[data-sec]').forEach(f=>f.addEventListener('submit',saveSec));
 if(S.flash)setTimeout(()=>{S.flash=null;},1600);
}
function tabInd(){const on=$('.ptabs button.on'),ind=$('.tind');if(on&&ind){ind.style.width=on.offsetWidth+'px';ind.style.transform=`translateX(${on.offsetLeft}px)`;}}
function reTab(){const m=byId(S.member);$('#ptab').innerHTML=tabBody(m);$$('.ptabs button').forEach(b=>{b.classList.toggle('on',b.dataset.v===S.tab);b.setAttribute('aria-selected',b.dataset.v===S.tab);});tabInd();$$('form[data-sec]').forEach(f=>f.addEventListener('submit',saveSec));}
function saveSec(e){e.preventDefault();const f=e.target,m=byId(S.member),k=f.dataset.sec,fd=new FormData(f);
 const nm=f.querySelector('[name=n]');if(nm&&!nm.value.trim()){nm.closest('.fld').classList.add('bad');nm.nextElementSibling.textContent='Informe o nome';nm.focus();return;}
 const em=f.querySelector('[name=e]');if(em&&em.value&&!/^\S+@\S+\.\S+$/.test(em.value)){em.closest('.fld').classList.add('bad');em.nextElementSibling.textContent='E-mail inválido';em.focus();return;}
 const b=f.querySelector('button[type=submit]');b.classList.add('busy');
 setTimeout(()=>{SECS[k].f.forEach(x=>{if(!fd.has(x[0]))return;let v=fd.get(x[0]);if(x[2]==='bool')v=v==='1';sv(m,x[0],v);});S.edit=null;
  if(k==='pess'||k==='fe'){render();}else reTab();toast(`${SECS[k].t} atualizados`);
  const c=$('#sec-'+k);if(c)c.animate([{boxShadow:'0 0 0 2px var(--brand)'},{boxShadow:'var(--shadow-card)'}],{duration:900});},800);}

const PA={
 open:(v,b,e)=>{if(e&&e.target.closest('[data-a=copy],[data-a=wa]'))return;S.member=v;S.tab='geral';S.edit=null;closePops();render();window.scrollTo({top:0,behavior:'smooth'});},
 backList:()=>{S.member=null;render();},
 sort:v=>{S.sort=S.sort.k===v?{k:v,d:-S.sort.d}:{k:v,d:v==='int'?-1:1};$('#mrows').innerHTML=rows();},
 reportMenu:()=>{const p=$('#reportPop');closePops(p);p.classList.toggle('open');},
 filter:v=>{S.filter=v;$$('.chipf').forEach(b=>{b.classList.toggle('on',b.dataset.v===v);b.setAttribute('aria-selected',b.dataset.v===v);});$$('.stb').forEach(b=>{b.classList.toggle('on',b.dataset.v===v);b.setAttribute('aria-selected',b.dataset.v===v);});$$('.stseg i').forEach((i,j)=>i.classList.toggle('dim',v!=='todos'&&['integrado','aceita','solicitado','recusado'][j]!==v));const r=$('#mrows');r.innerHTML=rows();r.animate([{opacity:.3},{opacity:1}],{duration:220});},
 clearFilters:()=>{S.filter='todos';S.q='';S.month='todas';render();},
 monthMenu:()=>{const p=$('#monthPop');closePops(p);p.classList.toggle('open');},
 month:v=>{S.month=v;closePops();render();},
 exportMenu:()=>{const p=$('#exportPop');closePops(p);p.classList.toggle('open');},
 export:v=>{closePops();toast(`Preparando ${v}…`);setTimeout(()=>toast(`Arquivo com ${v} pronto para baixar`),1400);},
 copy:v=>{try{navigator.clipboard.writeText(v);}catch(e){}toast(`${v} copiado`);},
 wa:v=>toast(`Abrindo conversa com ${byId(v).n.split(' ')[0]} no WhatsApp`),
 call:v=>toast(`Ligando para ${byId(v).ph}`),
 profMenu:()=>{const p=$('#profPop');closePops(p);p.classList.toggle('open');},
 minMenu:v=>{const p=$('#minPop'+v);closePops(p);p.classList.toggle('open');},
 tab:v=>{S.tab=v;S.edit=null;reTab();},
 editSec:v=>{S.edit=v;reTab();const f=$('#sec-'+v+' input,#sec-'+v+' select');f&&f.focus();},
 cancelSec:()=>{S.edit=null;reTab();},
 closeDlg:()=>closeDlg(),
 addMember:()=>{openDlg(`${dlgHead('Adicionar membro','Os demais dados podem ser preenchidos depois.')}
  <form class="fgrid one" id="addF" novalidate>
   <label class="fld"><span class="fl">Nome completo</span><input name="n" required autocomplete="off" placeholder="Ex.: Maria Souza"><span class="err"></span></label>
   <label class="fld"><span class="fl">E-mail <small>opcional</small></span><input name="e" type="email" autocomplete="off" placeholder="nome@email.com"><span class="err"></span></label>
   <label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="ph" type="tel" autocomplete="off" placeholder="(11) 90000-0000" inputmode="tel"><span class="err"></span></label>
   <label class="tog"><input type="checkbox" name="inv" checked><span class="sw"></span><span><b>Convidar para o app</b><small>Enviamos o acesso por e-mail</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Adicionar membro</button></div>
  </form>`);
  const f=$('#addF');const ph=f.querySelector('[name=ph]');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,msg)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=msg;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),em=fd.get('e').trim();if(n.split(' ').length<2)bad('n',n?'Informe nome e sobrenome':'Informe o nome');if(em&&!/^\S+@\S+\.\S+$/.test(em))bad('e','E-mail inválido');
   if(em&&MEMBERS.some(m=>m.e===em))bad('e','Já existe um membro com este e-mail');if(!ok)return;
   const b=f.querySelector('button[type=submit]');b.classList.add('busy');
   setTimeout(()=>{const m=M(n,em,fd.get('ph'),'2026-09','solicitado',[],{bap:false,app:fd.get('inv')?{st:'ativo',last:'convite enviado'}:{st:'sem conta'}});MEMBERS.unshift(m);S.flash=m.id;S.filter='todos';S.month='todas';S.q='';closeDlg();render();toast(`${n.split(' ')[0]} adicionado(a)${fd.get('inv')&&em?' · convite enviado':''}`,()=>{MEMBERS.splice(MEMBERS.indexOf(m),1);render();});},900);});},
 dupes:()=>{const ps=dupPairs();S.dupI=0;dupDlg(ps);},
 merge:(v,b)=>{const ps=dupPairs(),[a,c]=ps[S.dupI];const keep=$('input[name=keep]:checked').value==='a'?a:c,drop=keep===a?c:a;
  b.classList.add('busy');setTimeout(()=>{keep.dup=null;MEMBERS.splice(MEMBERS.indexOf(drop),1);if(!keep.min.length)keep.min=drop.min;const left=dupPairs();toast(`Cadastros de ${keep.n.split(' ')[0]} mesclados`);if(left.length){S.dupI=0;dupDlg(left);}else closeDlg();render();},900);},
 notDup:()=>{const ps=dupPairs(),[a,c]=ps[S.dupI];a.dup=null;c.dup=null;const left=dupPairs();toast('Marcados como pessoas diferentes');if(left.length)dupDlg(left);else closeDlg();render();},
 addFam:()=>{const m=byId(S.member);const cands=MEMBERS.filter(x=>x.id!==m.id&&!m.fam.some(f=>f[0]===x.id));
  openDlg(`${dlgHead('Vincular familiar',`Quem faz parte da família de ${m.n.split(' ')[0]}?`)}
   <label class="sbox" style="margin:0 0 12px">${ic('search',16)}<input id="fq" placeholder="Buscar membro" autocomplete="off"></label>
   <div class="pick" id="fpick">${cands.slice(0,6).map(p=>`<label class="pk">${mav(p)}<span><b>${esc(p.n)}</b><small>${p.tit?'Titular':'Dependente'}</small></span><input type="radio" name="fp" value="${p.id}"></label>`).join('')}</div>
   <div class="fld" style="margin-top:14px"><span class="fl">Parentesco</span><div class="minpick" role="radiogroup" aria-label="Parentesco">${['Cônjuge','Filho(a)','Pai/Mãe','Irmão(ã)','Outro'].map((o,i)=>`<label><input type="radio" name="rel" value="${o}" ${i===0?'checked':''}><span>${o}</span></label>`).join('')}</div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" data-a="doFam">Vincular</button></div>`,'sm');
  $('#fq').addEventListener('input',e=>{const q=norm(e.target.value);$('#fpick').innerHTML=cands.filter(p=>norm(p.n).includes(q)).slice(0,6).map(p=>`<label class="pk">${mav(p)}<span><b>${esc(p.n)}</b><small>${p.tit?'Titular':'Dependente'}</small></span><input type="radio" name="fp" value="${p.id}"></label>`).join('')||'<p class="who" style="padding:12px">Ninguém encontrado.</p>';});},
 doFam:(v,b)=>{const p=$('input[name=fp]:checked');if(!p){$('#fpick').animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'none'}],{duration:240});toast('Escolha uma pessoa da lista');return;}
  const m=byId(S.member),rel=$('input[name=rel]:checked').value,o=byId(p.value);b.classList.add('busy');setTimeout(()=>{m.fam.push([o.id,rel]);closeDlg();reTab();$$('.ptabs button').forEach(x=>{if(x.dataset.v==='familia')x.innerHTML=`Família<small>${m.fam.length}</small>`;});toast(`${o.n.split(' ')[0]} vinculado(a) como ${rel.toLowerCase()}`);},700);},
 unlink:v=>{const m=byId(S.member),f=m.fam[+v],o=byId(f[0]);confirmDel({title:`Desvincular ${o.n.split(' ')[0]}?`,body:`${o.n} deixa de aparecer na família de ${m.n.split(' ')[0]}. Os dois cadastros continuam existindo.`,label:'Desvincular',onConfirm:()=>{m.fam.splice(+v,1);reTab();toast(`${o.n.split(' ')[0]} desvinculado(a)`,()=>{m.fam.splice(+v,0,f);reTab();});}});},
 addMin:()=>{const m=byId(S.member);openDlg(`${dlgHead('Vincular a um ministério')}
   <div class="minpick">${MIN_ALL.filter(x=>!m.min.includes(x)).map((x,i)=>`<label><input type="radio" name="mn" value="${x}" ${i===0?'checked':''}><span>${x}</span></label>`).join('')}</div>
   <div class="fld" style="margin-top:14px"><span class="fl">Função</span><div class="yn" role="radiogroup">${['Membro da equipe','Líder','Apoio'].map((o,i)=>`<label><input type="radio" name="rl" value="${o}" ${i===0?'checked':''}><span>${o}</span></label>`).join('')}</div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" data-a="doMin">Vincular</button></div>`,'sm');},
 doMin:(v,b)=>{const m=byId(S.member),x=$('input[name=mn]:checked').value;b.classList.add('busy');setTimeout(()=>{m.min.push(x);m.role=$('input[name=rl]:checked').value;m.since='out/2026';closeDlg();render();toast(`${m.n.split(' ')[0]} agora serve em ${x}`);},700);},
 unMin:v=>{closePops();const m=byId(S.member),x=m.min[+v];confirmDel({title:`Remover ${m.n.split(' ')[0]} de ${x}?`,body:'A pessoa sai das próximas escalas deste ministério. O histórico de participação é mantido.',label:'Remover',onConfirm:()=>{m.min.splice(+v,1);render();toast(`Removido(a) de ${x}`,()=>{m.min.splice(+v,0,x);render();});}});},
 resetPw:(v,b)=>busy(b,900,'Link enviado',()=>toast(`Link de redefinição enviado para ${byId(S.member).e}`)),
 suspend:()=>{const m=byId(S.member);if(m.app.st==='suspensa'){m.app.st='ativo';reTab();toast('Acesso reativado');return;}
  openDlg(`${dlgHead('Suspender acesso ao app?',`${m.n.split(' ')[0]} não conseguirá entrar até você reativar. O cadastro continua intacto.`)}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn dang" data-a="doSuspend">Suspender acesso</button></div>`,'sm');},
 doSuspend:(v,b)=>{b.classList.add('busy');setTimeout(()=>{byId(S.member).app.st='suspensa';closeDlg();reTab();toast('Acesso suspenso');},700);},
 inactivate:()=>{closePops();const m=byId(S.member);openDlg(`${dlgHead('Inativar cadastro?',`${m.n.split(' ')[0]} sai das listas e escalas, mas o histórico é mantido. Você pode reativar quando quiser.`)}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="doInact">Inativar</button></div>`,'sm');},
 doInact:(v,b)=>{b.classList.add('busy');setTimeout(()=>{const m=byId(S.member),i=MEMBERS.indexOf(m);MEMBERS.splice(i,1);closeDlg();S.member=null;render();toast(`${m.n.split(' ')[0]} foi inativado(a)`,()=>{MEMBERS.splice(i,0,m);render();});},700);},
 delMember:()=>{closePops();const m=byId(S.member);openDlg(`${dlgHead('Excluir cadastro?','Esta ação não pode ser desfeita. Para confirmar, digite o primeiro nome.')}<label class="fld"><span class="fl">Digite “${m.n.split(' ')[0]}”</span><input id="delq" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn dang" data-a="doDel" disabled id="delb">Excluir definitivamente</button></div>`,'sm');
  $('#delq').addEventListener('input',e=>{$('#delb').disabled=e.target.value.trim().toLowerCase()!==m.n.split(' ')[0].toLowerCase();});},
 doDel:(v,b)=>{b.classList.add('busy');setTimeout(()=>{const m=byId(S.member);MEMBERS.splice(MEMBERS.indexOf(m),1);closeDlg();S.member=null;render();toast(`Cadastro de ${m.n.split(' ')[0]} excluído`);},800);},
};
function dupDlg(ps){const [a,c]=ps[S.dupI];
 const rowsC=[['E-mail','e'],['Telefone','ph'],['Integração','int'],['Status','st'],['Ministérios','min'],['Batizado(a)','bap']];
 const val=(m,k)=>k==='int'?monthLabel(m.int):k==='st'?ST[m.st].l:k==='min'?(m.min.join(', ')||'—'):k==='bap'?(m.bap?'Sim':'Não'):(m[k]||'—');
 openDlg(`${dlgHead(`Possível duplicado · ${ps.length>1?`1 de ${ps.length}`:''}`.replace(' · ',ps.length>1?' · ':''),`Compare os cadastros de ${a.n} e escolha qual manter.`)}
  <div class="cmp">${[a,c].map((m,i)=>`<label class="cmpc"><input type="radio" name="keep" value="${i?'c':'a'}" ${m.st==='integrado'||(!i&&a.st!=='integrado'&&c.st!=='integrado')?'checked':''}><span class="cmph">${mav(m)}<span><b>Manter este</b><small>Cadastro de ${monthLabel(m.int).toLowerCase()}</small></span><span class="rd"></span></span>
   <dl>${rowsC.map(r=>{const same=val(a,r[1])===val(c,r[1]);return `<div class="${same?'':'diff'}"><dt>${r[0]}</dt><dd>${esc(val(m,r[1]))}</dd></div>`;}).join('')}</dl></label>`).join('')}</div>
  <p class="who" style="margin:12px 0 0">Os campos marcados são diferentes. Ministérios e histórico do outro cadastro são trazidos para o que ficar.</p>
  <div class="dfoot"><button class="btn sec" data-a="notDup">São pessoas diferentes</button><button class="btn pri" data-a="merge">Mesclar cadastros</button></div>`,'lg');}

/* ================= Pessoas › Integração de membros ================= */
/* generic destructive confirmation */
function confirmDel({title,body,label='Excluir',typed,onConfirm}){
 openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead(title,body)}</div>
  ${typed?`<label class="fld"><span class="fl">Para confirmar, digite <b>${esc(typed)}</b></span><input id="cdq" autocomplete="off"><span class="err"></span></label>`:''}
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn dang" id="cdok" ${typed?'disabled':''}>${label}</button></div>`,'sm del');
 const ok=$('#cdok');
 if(typed)$('#cdq').addEventListener('input',e=>{ok.disabled=norm(e.target.value.trim())!==norm(typed);});
 ok.addEventListener('click',()=>{ok.classList.add('busy');setTimeout(()=>{closeDlg();onConfirm();},650);});
 setTimeout(()=>(typed?$('#cdq'):$('.dlg .btn.sec'))?.focus(),80);
}

const POOL=['Aline Rocha','Bruna Tavares','Caio Almeida','Davi Monteiro','Érica Lopes','Fábio Nogueira','Gabriela Sá','Heitor Cunha','Isabela Freitas','João Vitor Reis','Karina Melo','Leonardo Paiva','Mariana Dias','Nathan Borges','Olívia Prado','Paula Serra','Rodrigo Leal','Sabrina Costa','Tiago Moraes','Úrsula Neves','Vinícius Lara','Yasmin Castro','Wesley Porto','Alice Fontes','Bernardo Vaz','Cecília Ramos','Diego Antunes','Elaine Moura','Felipe Brito','Giovana Lemos','Hugo Marins','Ingrid Sales','Júlia Arruda','Kevin Rocha','Luana Pires'];
const STEPS_DEF=[['Boas-vindas','Culto de domingo','calendar'],['Café com a liderança','Salão social','coffee'],['Fundamentos da fé','3 encontros','book'],['Batismo','Chácara Alva','sprout'],['Integração','Culto de celebração','check']];
const IST={pendente:['Pendente','var(--st-sol)','var(--st-sol-bg)'],aceito:['Aceito','var(--st-ace)','var(--st-ace-bg)'],andamento:['Em etapas','var(--ink-muted)','var(--surface-2)'],integrado:['Integrado','var(--st-int)','var(--st-int-bg)']};
let _iid=0;
function mkInteg(n,date,time,total,integ,o={}){
 const id='i'+(++_iid),ppl=[];
 const nA=o.aceitos??(total>integ?Math.min(1,total-integ):0),nP=o.pend??(total-integ-nA>0?1:0);
 for(let i=0;i<total;i++){const nm=POOL[(i+_iid*7)%POOL.length];const st=i<integ?'integrado':i<integ+nA?'aceito':i<integ+nA+nP?'pendente':'andamento';
  ppl.push({id:id+'p'+i,n:nm,tone:TONES[(i+_iid)%6],st,step:st==='integrado'?5:st==='andamento'?1+(i%3):st==='aceito'?1:0,ph:`(11) 9${String(8000+i*37).slice(0,4)}-${String(1000+i*91).slice(-4)}`});}
 return {id,n,date,time,limit:o.limit||'',link:o.link||'',resp:o.resp||'',contact:o.contact||'',current:!!o.current,active:!!o.active,ppl,steps:STEPS_DEF.map((s,i)=>({id:id+'s'+i,t:s[0],w:s[1],icon:s[2],date:o.stepDates?o.stepDates[i]:''}))};
}
const INTEGS=[
 mkInteg('Setembro/2026','2026-09-18','08:00',34,12,{current:true,active:true,link:'https://chat.whatsapp.com/grupo-do-zap',resp:'m3',contact:'https://wa.me/5511987542201',stepDates:['2026-09-21','2026-09-28','2026-10-05','2026-10-18','2026-10-25']}),
 mkInteg('Agosto/2026','2026-08-18','08:00',28,21,{link:'https://chat.whatsapp.com/agosto',resp:'m10'}),
 mkInteg('Julho/2026','2026-07-18','08:00',19,19,{aceitos:0,pend:0,resp:'m12'}),
 mkInteg('Abril/2026','2026-04-17','08:00',25,23,{resp:'m10'}),
 mkInteg('Teste1','2026-04-23','08:00',3,0,{aceitos:0,pend:3}),
 mkInteg('Admin_teste','2026-04-17','08:00',1,0,{aceitos:0,pend:1}),
 mkInteg('Pietra B','2026-08-19','08:00',1,0,{aceitos:0,pend:1}),
];
Object.assign(S,{integ:null,itab:'det',iq:'',ifilter:'todas',iedit:null,imq:'',imf:'todos'});
const ibyId=id=>INTEGS.find(x=>x.id===id);
const icount=(g,st)=>g.ppl.filter(p=>p.st===st).length;
const iprog=g=>g.ppl.length?Math.round(icount(g,'integrado')/g.ppl.length*100):0;
const dBR=d=>{if(!d)return '';const [y,m,dd]=d.split('-');return `${dd}/${m}/${y}`;};
const dLong=d=>{if(!d)return '';const [y,m,dd]=d.split('-');return `${+dd} ${MONTHS[+m-1].slice(0,3)} ${y}`;};
const pAv=p=>`<span class="av" style="background:var(--tone-${p.tone});color:var(--tone-${p.tone}-ink)">${initials(p.n)}</span>`;
const iPill=g=>g.current?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Atual</span>`:`<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Encerrada</span>`;

/* ---------- list ---------- */
function integList(){
 const cur=INTEGS.find(g=>g.current);
 return `<header class="ph rise"><div><p class="eb">Pessoas</p><h1>Integração de membros</h1><p class="lede">Fluxo de integração de novos membros</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="iexpMenu" aria-haspopup="menu">Exportar${ic('updown',14)}</button>
   <div class="pop" id="iexpPop" role="menu" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="todas as integrações">Exportar todas</button></div></div>
   <button class="btn pri" data-a="addInteg">${ic('plus',15,2.2)}Nova integração</button></div></header>
 ${cur?`<button class="card icur rise" style="--d:1" data-a="openInteg" data-v="${cur.id}">
   <div class="ic1"><span class="eb" style="margin:0">Integração atual</span><b>${cur.n}</b><span class="who">Começou em ${dLong(cur.date)} · ${cur.ppl.length}${cur.limit?' de '+cur.limit:''} pessoas</span></div>
   <div class="ic2">${ibar(cur)}</div>
   <div class="ic3"><span class="big">${iprog(cur)}<small>%</small></span><span class="who">integrados</span></div>
  </button>`:''}
 <section class="card mtab rise" style="--d:2" aria-label="Integrações">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="iq" placeholder="Pesquisar integração" value="${esc(S.iq)}" autocomplete="off"></label>
   <div class="chips" role="tablist">${[['todas','Todas',INTEGS.length],['ativa','Atual',INTEGS.filter(g=>g.current).length],['inativa','Encerradas',INTEGS.filter(g=>!g.current).length]].map(c=>`<button role="tab" class="chipf ${S.ifilter===c[0]?'on':''}" data-a="ifilter" data-v="${c[0]}" aria-selected="${S.ifilter===c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="irows">${irows()}</div>
 </section>`;
}
function ibar(g,noLeg){const t=g.ppl.length||1,seg=[['integrado',icount(g,'integrado')],['andamento',icount(g,'andamento')],['aceito',icount(g,'aceito')],['pendente',icount(g,'pendente')]];
 return `<div class="ibar">${seg.map(s=>s[1]?`<i style="flex-grow:${s[1]};background:${s[0]==='andamento'?'var(--seq2)':IST[s[0]][1]}" title="${IST[s[0]][0]}: ${s[1]}"></i>`:'').join('')}</div>${noLeg?`<div class="ileg"><span><i style="background:var(--seq2)"></i>Em etapas <b>${icount(g,'andamento')}</b></span><span class="soft">· ${iprog(g)}% concluído</span></div>`:''}${noLeg?'':`
 <div class="ileg">${seg.filter(s=>s[1]).map(s=>`<span><i style="background:${s[0]==='andamento'?'var(--seq2)':IST[s[0]][1]}"></i>${IST[s[0]][0]} <b>${s[1]}</b></span>`).join('')}</div>`}`;}
function irows(){
 const q=norm(S.iq);const list=INTEGS.filter(g=>(S.ifilter==='todas'||(S.ifilter==='ativa')===g.current)&&(!q||norm(g.n).includes(q)));
 if(!list.length)return `<div class="mempty"><p>Nada encontrado.</p><span>Nenhuma integração corresponde a esses filtros.</span></div>`;
 return `<div class="trow ig thead"><span>Nome</span><span>Data</span><span>Membros</span><span>Integrados</span><span>Progresso</span><span>Status</span><span></span></div>
 ${list.map(g=>{const p=iprog(g);return `<div class="trow ig" tabindex="0" data-a="openInteg" data-v="${g.id}">
  <span class="tn"><b>${esc(g.n)}</b></span><span class="idt">${dBR(g.date)} <span class="soft">às ${g.time.replace(':00','h').replace(/^0/,'')}</span></span>
  <span class="inum"><b>${g.ppl.length}</b>${g.limit?`<span class="soft">/${g.limit}</span>`:''}<em> membros</em></span><span class="inum"><b>${icount(g,'integrado')}</b><em> integrados</em></span>
  <span class="ipg"><span class="tr"><i style="width:${p}%;${p===100?'background:var(--st-int)':''}"></i></span><b>${p}%</b></span>
  <span class="ts">${iPill(g)}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
 <div class="tfoot"><span>Mostrando ${list.length} de ${INTEGS.length}</span></div>`;
}

/* ---------- detail ---------- */
const ITABS=[['det','Detalhes'],['etapas','Etapas'],['membros','Membros']];
function integDetail(){
 const g=ibyId(S.integ);if(!g){S.integ=null;return integList();}
 const t=g.ppl.length;
 return `<nav class="crumb rise"><span class="soft">Pessoas</span>${ic('chevR',13,2)}<button class="lnk back" data-a="backInteg">Integração de membros</button>${ic('chevR',13,2)}<span>${esc(g.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid"><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(g.n)}</h1>${iPill(g)}</div><p>Iniciada em ${dBR(g.date)} às ${g.time.replace(':00','h').replace(/^0/,'')} · ${t} ${t===1?'membro':'membros'}${g.limit?' de '+g.limit:''}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="resend">${ic('mail',15)}Reenviar e-mail</button><button class="btn sec" data-a="export" data-v="o CSV de ${esc(g.n)}">Exportar CSV</button>
   <div style="position:relative"><button class="ibtn" data-a="igMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="igPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="delInteg">${ic('x',17)}Excluir integração</button></div></div></div>
  <div class="ikpi">
   <div><b>${t}</b><span>Total</span></div><div><b>${icount(g,'integrado')}</b><span>Integrados</span></div><div><b>${icount(g,'aceito')}</b><span>Aceitos</span></div><div><b>${icount(g,'pendente')}</b><span>Pendentes</span></div>
   <div class="ikbar">${ibar(g,1)}</div>
  </div>
  <div class="ptabs" role="tablist">${ITABS.map(x=>`<button role="tab" class="${S.itab===x[0]?'on':''}" aria-selected="${S.itab===x[0]}" data-a="itab" data-v="${x[0]}">${x[1]}${x[0]==='membros'?`<small>${t}</small>`:x[0]==='etapas'?`<small>${g.steps.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="itabBody" class="rise" style="--d:2">${itabBody(g)}</div>`;
}
function itabBody(g){return ({det:iDet,etapas:iSteps,membros:iMembers})[S.itab](g);}
const ISECS={
 info:{t:'Informações',f:[['n','Nome da integração','text'],['date','Data de início','date'],['time','Horário','time'],['limit','Limite de membros','number','Deixe vazio para sem limite']]},
 wa:{t:'Comunicação via WhatsApp',f:[['link','Link do grupo','url'],['resp','Responsável','person'],['contact','Contato do responsável','url']]},
};
function iVal(g,f){const v=g[f[0]];if(f[0]==='date')return v?dLong(v):'';if(f[0]==='time')return v?v.replace(':00','h').replace(/^0/,''):'';if(f[0]==='resp')return v&&byId(v)?byId(v).n:'';if(f[0]==='limit')return v?v+' pessoas':'Sem limite';return v;}
function iDet(g){
 return `<div class="dgrid">${Object.keys(ISECS).map(k=>{const s=ISECS[k],ed=S.iedit===k;return `<section class="card pc sec ${ed?'editing':''}" id="isec-${k}"><div class="sh"><h2>${s.t}</h2>${ed?'':`<button class="btn sec sm" data-a="iEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" data-isec="${k}" novalidate>${s.f.map(f=>ifield(g,f)).join('')}<div class="dfoot"><button type="button" class="btn sec" data-a="iCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid">${s.f.map(f=>{const v=iVal(g,f);return `<div><dt>${f[1]}</dt><dd>${!v?'<span class="soft">Não informado</span>':(f[2]==='url'?`<span class="cp" data-a="copy" data-v="${esc(v)}" title="Copiar">${esc(v.replace('https://',''))}</span>`:esc(v))}</dd></div>`;}).join('')}</dl>`}</section>`;}).join('')}
  <section class="card pc curc"><div class="curr"><div><h2 style="margin:0;font:600 17px/22px var(--font-display)">Integração atual</h2><p class="who" style="margin:4px 0 0">É para ela que vão os novos pedidos de integração feitos pelo app.</p></div>
   <label class="tog"><input type="checkbox" id="curTog" ${g.current?'checked':''}><span class="sw"></span></label></div></section>
 </div>`;
}
function ifield(g,f){const id='if-'+f[0],v=g[f[0]]||'';
 if(f[2]==='person')return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="${f[0]}"><option value="">Sem responsável</option>${MEMBERS.filter(m=>m.tit&&m.ph).map(m=>`<option value="${m.id}" ${v===m.id?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;
 return `<label class="fld ${f[0]==='link'?'wide':''}" for="${id}"><span class="fl">${f[1]}</span><input id="${id}" name="${f[0]}" type="${f[2]}" value="${esc(v)}" ${f[2]==='number'?'min="1" inputmode="numeric" placeholder="Sem limite"':''} ${f[2]==='url'?'placeholder="https://"':''}>${f[3]?`<span class="hint">${f[3]}</span>`:''}<span class="err"></span></label>`;}
function iSteps(g){
 const t=g.ppl.length||1;
 return `<section class="card pc"><div class="sh"><h2>Etapas da integração</h2><button class="btn sec sm" data-a="addStep">${ic('plus',14,2.2)}Nova etapa</button></div>
  ${g.steps.length?`<ol class="steps">${g.steps.map((s,i)=>{const done=g.ppl.filter(p=>p.step>i).length,pct=Math.round(done/t*100);return `<li class="${pct===100?'full':pct>0?'part':''}">
   <span class="sn">${i+1}</span>
   <div class="sb"><div class="st1"><div><b>${esc(s.t)}</b><span class="who">${esc(s.w)}${s.date?' · '+dLong(s.date):''}</span></div>
    <div class="sa"><span class="who"><b>${done}</b> de ${g.ppl.length} concluíram</span><button class="ibtn sm" data-a="delStep" data-v="${i}" aria-label="Excluir etapa" title="Excluir etapa">${ic('x',14)}</button></div></div>
    <span class="tr"><i style="width:${pct}%"></i></span></div></li>`;}).join('')}</ol>`:`<div class="soft-empty"><p>Nenhuma etapa definida.</p><button class="btn pri" data-a="addStep">${ic('plus',14,2.2)}Criar primeira etapa</button></div>`}
 </section>`;
}
function iMembers(g){
 const q=norm(S.imq),ord={pendente:0,aceito:1,andamento:2,integrado:3};const list=g.ppl.filter(p=>(S.imf==='todos'||p.st===S.imf)&&(!q||norm(p.n).includes(q))).sort((a,b)=>ord[a.st]-ord[b.st]||b.step-a.step);
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="imq" placeholder="Buscar pessoa" value="${esc(S.imq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos',g.ppl.length],...Object.keys(IST).map(k=>[k,IST[k][0],icount(g,k)])].map(c=>`<button class="chipf ${S.imf===c[0]?'on':''}" data-a="imf" data-v="${c[0]}">${c[0]!=='todos'?`<i style="background:${c[0]==='andamento'?'var(--seq2)':IST[c[0]][1]}"></i>`:''}${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${list.length?`<div class="trow im thead"><span>Pessoa</span><span>Etapa atual</span><span>Status</span><span></span></div>${list.map(p=>`<div class="trow im" id="${p.id}">
   <span class="tn">${pAv(p)}<span><b>${esc(p.n)}</b></span></span>
   <span class="ist">${p.st==='integrado'?'<span class="soft">Concluiu todas</span>':p.step===0?'<span class="soft">Aguardando aceite</span>':`<span class="stepdots">${g.steps.map((s,i)=>`<i class="${i<p.step?'on':''}"></i>`).join('')}</span>${esc((g.steps[p.step]||g.steps[g.steps.length-1]||{t:''}).t)}`}</span>
   <span class="ts"><span class="stp" style="--c:${IST[p.st][1]};--b:${IST[p.st][2]}"><i></i>${IST[p.st][0]}</span></span>
   <span class="iact">${p.st==='pendente'?`<button class="btn pri sm" data-a="acceptP" data-v="${p.id}">Aceitar</button>`:p.st!=='integrado'?`<button class="btn sec sm" data-a="advanceP" data-v="${p.id}">Avançar etapa</button>`:''}<button class="ibtn sm" data-a="removeP" data-v="${p.id}" aria-label="Remover da integração" title="Remover da integração">${ic('x',14)}</button></span></div>`).join('')}`
  :`<div class="mempty"><p>Ninguém por aqui.</p><span>Nenhuma pessoa nesse filtro.</span></div>`}
  <div class="tfoot"><span>${list.length} de ${g.ppl.length} pessoas</span></div></section>`;
}

function integAfter(){
 const iq=$('#iq');if(iq)iq.addEventListener('input',e=>{S.iq=e.target.value;$('#irows').innerHTML=irows();});
 bindIntegTab();requestAnimationFrame(tabInd);
}
function bindIntegTab(){
 const imq=$('#imq');if(imq)imq.addEventListener('input',e=>{S.imq=e.target.value;const pos=e.target.selectionStart;reITab();const n=$('#imq');n.focus();n.setSelectionRange(pos,pos);});
 $$('form[data-isec]').forEach(f=>f.addEventListener('submit',saveISec));
 const rs=$('#if-resp');if(rs)rs.addEventListener('change',()=>{const m=byId(rs.value),c=$('#if-contact');if(m&&c)c.value='https://wa.me/55'+m.ph.replace(/\D/g,'');});
 const ct=$('#curTog');if(ct)ct.addEventListener('change',curToggle);
}
function reITab(){const g=ibyId(S.integ);$('#itabBody').innerHTML=itabBody(g);$$('.ptabs button').forEach(b=>{b.classList.toggle('on',b.dataset.v===S.itab);});tabInd();bindIntegTab();}
function saveISec(e){e.preventDefault();const f=e.target,g=ibyId(S.integ),k=f.dataset.isec,fd=new FormData(f);
 const n=f.querySelector('[name=n]');if(n&&!n.value.trim()){n.closest('.fld').classList.add('bad');n.parentNode.querySelector('.err').textContent='Informe um nome';n.focus();return;}
 const l=f.querySelector('[name=link]');if(l&&l.value&&!/^https:\/\/chat\.whatsapp\.com\//.test(l.value)){l.closest('.fld').classList.add('bad');l.parentNode.querySelector('.err').textContent='Use um link de convite do WhatsApp (chat.whatsapp.com/…)';l.focus();return;}
 const b=f.querySelector('button[type=submit]');b.classList.add('busy');
 setTimeout(()=>{ISECS[k].f.forEach(x=>{if(fd.has(x[0]))g[x[0]]=fd.get(x[0]);});S.iedit=null;render();toast(`${ISECS[k].t} atualizadas`);},800);}
function curToggle(e){const g=ibyId(S.integ),on=e.target.checked,other=INTEGS.find(x=>x.current&&x!==g);
 if(!on){e.target.checked=true;toast('Defina outra integração como atual para encerrar esta');return;}
 e.target.checked=false;
 openDlg(`${dlgHead(`Tornar ${g.n} a integração atual?`,other?`<b>${esc(other.n)}</b> deixará de ser a atual e não receberá novos pedidos. As pessoas que já estão nela continuam no fluxo.`:'Novos pedidos de integração passarão a entrar nela.')}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="doCurrent">Tornar atual</button></div>`,'sm');}

const IA={
 iexpMenu:()=>{const p=$('#iexpPop');closePops(p);p.classList.toggle('open');},
 igMenu:()=>{const p=$('#igPop');closePops(p);p.classList.toggle('open');},
 ifilter:v=>{S.ifilter=v;$$('.chipf[data-a=ifilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#irows').innerHTML=irows();},
 openInteg:v=>{S.integ=v;S.itab='det';S.iedit=null;S.imq='';S.imf='todos';render();window.scrollTo({top:0});},
 backInteg:()=>{S.integ=null;render();},
 itab:v=>{S.itab=v;S.iedit=null;reITab();},
 iEdit:v=>{S.iedit=v;reITab();$(`#isec-${v} input`)?.focus();},
 iCancel:()=>{S.iedit=null;reITab();},
 imf:v=>{S.imf=v;reITab();},
 resend:(v,b)=>busy(b,1000,'E-mail reenviado',()=>toast(`E-mail reenviado para ${icount(ibyId(S.integ),'pendente')+icount(ibyId(S.integ),'aceito')} pessoas com etapas em aberto`)),
 doCurrent:(v,b)=>{b.classList.add('busy');setTimeout(()=>{const g=ibyId(S.integ);INTEGS.forEach(x=>x.current=false);g.current=true;closeDlg();render();toast(`${g.n} agora é a integração atual`);},700);},
 acceptP:v=>{const g=ibyId(S.integ),p=g.ppl.find(x=>x.id===v);p.st='aceito';p.step=1;render();toast(`${p.n.split(' ')[0]} aceito(a) na integração`);},
 advanceP:v=>{const g=ibyId(S.integ),p=g.ppl.find(x=>x.id===v);p.step++;if(p.st==='aceito')p.st='andamento';if(p.step>=g.steps.length){p.st='integrado';p.step=g.steps.length;}render();toast(p.st==='integrado'?`${p.n.split(' ')[0]} concluiu a integração`:`${p.n.split(' ')[0]} avançou para ${g.steps[p.step].t}`);},
 removeP:v=>{const g=ibyId(S.integ),i=g.ppl.findIndex(x=>x.id===v),p=g.ppl[i];
  confirmDel({title:`Remover ${p.n.split(' ')[0]} desta integração?`,body:'A pessoa sai do fluxo e das estatísticas desta integração. O cadastro de membro não é apagado.',label:'Remover',onConfirm:()=>{g.ppl.splice(i,1);render();toast(`${p.n.split(' ')[0]} removido(a)`,()=>{g.ppl.splice(i,0,p);render();});}});},
 delStep:v=>{const g=ibyId(S.integ),i=+v,s=g.steps[i];
  confirmDel({title:`Excluir a etapa “${s.t}”?`,body:'O progresso das pessoas nesta etapa será perdido. As demais etapas são renumeradas.',label:'Excluir etapa',onConfirm:()=>{g.steps.splice(i,1);render();toast(`Etapa “${s.t}” excluída`,()=>{g.steps.splice(i,0,s);render();});}});},
 delInteg:()=>{closePops();const g=ibyId(S.integ);
  confirmDel({title:`Excluir ${g.n}?`,body:`As ${g.ppl.length} pessoas vinculadas perdem o histórico desta integração. Esta ação não pode ser desfeita.`,label:'Excluir integração',typed:g.n,onConfirm:()=>{INTEGS.splice(INTEGS.indexOf(g),1);if(g.current&&INTEGS[0])INTEGS[0].current=true;S.integ=null;render();toast(`${g.n} excluída`);}});},
 addStep:()=>{openDlg(`${dlgHead('Nova etapa','Aparece no fim do fluxo desta integração.')}<form class="fgrid one" id="stF" novalidate>
   <label class="fld"><span class="fl">Nome da etapa</span><input name="t" placeholder="Ex.: Entrevista pastoral" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Local ou formato <small>opcional</small></span><input name="w" placeholder="Ex.: Sala 2 · 30 min" autocomplete="off"></label>
   <label class="fld"><span class="fl">Data <small>opcional</small></span><input name="date" type="date"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar etapa</button></div></form>`,'sm');
  $('#stF').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target),t=fd.get('t').trim();if(!t){const i=e.target.querySelector('[name=t]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome à etapa';i.focus();return;}
   const b=e.target.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const g=ibyId(S.integ);g.steps.push({id:g.id+'s'+Date.now(),t,w:fd.get('w')||'—',date:fd.get('date')});closeDlg();render();toast(`Etapa “${t}” criada`);},600);});},
 addInteg:()=>{const next='Outubro/2026';openDlg(`${dlgHead('Nova integração','Os novos pedidos feitos pelo app entram na integração atual.')}
  <form class="fgrid" id="igF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome da integração</span><input name="n" value="${next}" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Data de início</span><input name="date" type="date" value="2026-10-16"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input name="time" type="time" value="08:00"></label>
   <label class="fld wide"><span class="fl">Limite de membros <small>opcional</small></span><input name="limit" type="number" min="1" inputmode="numeric" placeholder="Sem limite"><span class="err"></span></label>
   <p class="fsec wide">${ic('message',15)}Comunicação via WhatsApp</p>
   <label class="fld wide"><span class="fl">Link do grupo <small>opcional</small></span><input name="link" type="url" placeholder="https://chat.whatsapp.com/…"><span class="err"></span></label>
   <label class="fld"><span class="fl">Responsável</span><span class="selw"><select name="resp" id="igResp"><option value="">Sem responsável</option>${MEMBERS.filter(m=>m.tit&&m.ph).map(m=>`<option value="${m.id}">${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Contato</span><input name="contact" id="igCt" type="url" placeholder="Preenchido pelo responsável"></label>
   <label class="tog wide"><input type="checkbox" name="cur" id="igCur" checked><span class="sw"></span><span><b>Definir como integração atual</b><small id="igCurNote">${INTEGS.find(g=>g.current)?`${INTEGS.find(g=>g.current).n} deixará de receber novos pedidos`:'Novos pedidos entram nesta integração'}</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar integração</button></div></form>`);
  const f=$('#igF');$('#igResp').addEventListener('change',e=>{const m=byId(e.target.value);$('#igCt').value=m?'https://wa.me/55'+m.ph.replace(/\D/g,''):'';});
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim();if(!n)bad('n','Informe um nome');else if(INTEGS.some(g=>norm(g.n)===norm(n)))bad('n','Já existe uma integração com esse nome');
   if(!fd.get('date'))bad('date','Escolha a data');const lk=fd.get('link');if(lk&&!/^https:\/\/chat\.whatsapp\.com\//.test(lk))bad('link','Use um link de convite do WhatsApp');if(!ok)return;
   const b=f.querySelector('[type=submit]');b.classList.add('busy');
   setTimeout(()=>{const g=mkInteg(n,fd.get('date'),fd.get('time')||'08:00',0,0,{aceitos:0,pend:0,link:lk,resp:fd.get('resp'),contact:fd.get('contact'),limit:fd.get('limit')});if(fd.get('cur')){INTEGS.forEach(x=>x.current=false);g.current=true;}INTEGS.unshift(g);closeDlg();S.integ=g.id;S.itab='det';render();toast(`${n} criada${g.current?' e definida como atual':''}`);},900);});},
};

/* ================= Cuidado › Discipulado ================= */
const TRILHA=['Primeiros passos','Vida de oração','Fundamentos','Vida na Palavra','Caráter cristão','Missão e chamado'];
const RHY={7:'Semanal',14:'Quinzenal',30:'Mensal'};
const TODAY=new Date(2026,8,30);
const addDays=(n)=>{const d=new Date(TODAY);d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
let _did=0;
const DN=(n,parent,o={})=>({id:'d'+(++_did),n,parent,tone:o.tone||TONES[_did%6],role:o.role||'Membro',rhythm:o.rhythm||14,last:o.last,stage:o.stage||0,paused:!!o.paused,notes:o.notes||'',meets:o.meets||[],open:true});
const MT=(d,type,o={})=>({id:'e'+Math.random().toString(36).slice(2,8),d,type,content:o.c||'',mode:o.mode||'Presencial',link:o.link||'',time:o.t||'19:30',note:o.note||'',mat:o.mat||''});
const DISC=[
 DN('Pr. Rafael Pereira',null,{role:'Pastor',rhythm:30,last:29,tone:'ceu'}),
 DN('Ana Clara Lima','d1',{role:'Líder',rhythm:14,last:25,tone:'ceu',notes:'Conduz a casa de Vila Nova. Pediu ajuda para organizar a agenda dos discípulos.'}),
 DN('Gabriel Souza','d2',{rhythm:7,last:22,stage:3,tone:'menta',meets:[MT(addDays(-22),'done',{c:'Fundamentos: graça e fé',mat:'Trilha · Fundamentos'}),MT(addDays(-36),'done',{c:'Vida de oração: rotina diária'}),MT(addDays(3),'sched',{t:'20:00',mode:'Remoto',link:'https://meet.google.com/abc-defg-hij'})]}),
 DN('Pedro Almeida','d3',{rhythm:7,last:12,stage:1,tone:'damasco',meets:[MT(addDays(5),'sched',{t:'19:00'})]}),
 DN('Isabela Rocha','d2',{rhythm:7,last:13,stage:5,tone:'rosado',meets:[MT(addDays(-13),'done',{c:'Caráter cristão: perdão'}),MT(addDays(-27),'done',{c:'Vida na Palavra: leitura devocional'})]}),
 DN('Marcos Souza Ramos','d1',{role:'Líder',rhythm:14,last:18,tone:'salvia'}),
 DN('Lucas Mendes','d6',{rhythm:14,last:51,stage:2,paused:true,tone:'lima',notes:'Pausou por mudança de turno no trabalho. Retomar em novembro.',meets:[MT(addDays(-51),'done',{c:'Vida de oração: ACTS'})]}),
 DN('Fernanda Lima','d6',{rhythm:14,last:26,stage:6,tone:'damasco',meets:[MT(addDays(-26),'done',{c:'Missão e chamado: dons'}),MT(addDays(9),'sched',{t:'10:00'})]}),
];
Object.assign(S,{disc:null,dtab:'rede',dpt:'geral',dq:'',df:'todos'});
const dById=id=>DISC.find(x=>x.id===id);
const kids=id=>DISC.filter(x=>x.parent===id);
const desc=id=>kids(id).flatMap(k=>[k,...desc(k.id)]);
const dStatus=d=>d.paused?'pausado':d.last<=d.rhythm?'emdia':'atrasado';
const DST={emdia:['Em dia','var(--st-int)','var(--st-int-bg)'],atrasado:['Atrasado','var(--st-rec)','var(--st-rec-bg)'],pausado:['Pausado','var(--ink-muted)','var(--surface-2)']};
const dPill=d=>{const s=DST[dStatus(d)];return `<span class="stp" style="--c:${s[1]};--b:${s[2]}"><i></i>${s[0]}</span>`;};
const dAv=(d,c='')=>`<span class="av ${c}" style="background:var(--tone-${d.tone});color:var(--tone-${d.tone}-ink)">${initials(d.n.replace('Pr. ',''))}</span>`;
const first=d=>d.n.replace('Pr. ','').split(' ')[0];
const dLbl=n=>n===0?'hoje':n===1?'ontem':`há ${n} dias`;
const fmtD=iso=>{const [y,m,d]=iso.split('-');return `${+d} ${MONTHS[+m-1].slice(0,3)}`;};
const wd=iso=>['dom','seg','ter','qua','qui','sex','sáb'][new Date(iso+'T12:00').getDay()];
const inDays=iso=>Math.round((new Date(iso+'T12:00')-new Date(2026,8,30,12))/864e5);

function cadence(d){const pct=Math.min(100,Math.round(d.last/d.rhythm*100)),over=d.last>d.rhythm;
 return `<span class="cad ${d.paused?'pz':over?'over':''}" title="${RHY[d.rhythm]} · último contato ${dLbl(d.last)}"><span class="cadt"><i style="width:${pct}%"></i></span><span class="cadl">${dLbl(d.last)}</span></span>`;}
function stageDots(d){if(!d.stage)return '';return `<span class="sdots" title="Etapa ${d.stage} de 6 · ${TRILHA[d.stage-1]}">${TRILHA.map((_,i)=>`<i class="${i<d.stage?'on':''}"></i>`).join('')}</span>`;}

/* ---------- list ---------- */
function discList(){
 const c=k=>DISC.filter(d=>dStatus(d)===k).length;
 return `<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Discipulado</h1><p class="lede">Rede de discipulado, cadência de contato e encontros de acompanhamento</p></div>
  <div class="pact"><button class="btn sec" data-a="export" data-v="o CSV do discipulado">Exportar CSV</button><button class="btn pri" data-a="dAdd">${ic('plus',15,2.2)}Adicionar pessoa</button></div></header>
 <section class="card dsum rise" style="--d:1">
  <div class="dsn"><b>${DISC.length}</b><span>pessoas na rede</span></div>
  <div class="dsbar">${['emdia','atrasado','pausado'].map(k=>c(k)?`<i style="flex-grow:${c(k)};background:${DST[k][1]}"></i>`:'').join('')}</div>
  <div class="dsl">${['emdia','atrasado','pausado'].map(k=>`<span><i style="background:${DST[k][1]}"></i><b>${c(k)}</b> ${DST[k][0].toLowerCase()}${c(k)>1&&k!=='emdia'?'s':''}</span>`).join('')}</div>
 </section>
 <div class="utabs rise" style="--d:2" role="tablist">${[['rede','Rede'],['resumo','Resumo']].map(t=>`<button role="tab" class="${S.dtab===t[0]?'on':''}" aria-selected="${S.dtab===t[0]}" data-a="dtab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
 <div id="dbody" class="rise" style="--d:3">${S.dtab==='rede'?dRede():dResumo()}</div>`;
}
function dRede(){
 const q=norm(S.dq);const match=d=>(S.df==='todos'||dStatus(d)===S.df)&&(!q||norm(d.n).includes(q));
 const visible=d=>match(d)||desc(d.id).some(match);
 const node=(d,depth)=>{const ch=kids(d.id).filter(visible),base=desc(d.id).length,dim=!match(d);
  return `<li class="dn ${dim?'dim':''}" style="--dep:${depth}">
   <div class="drow" tabindex="0" data-a="dOpen" data-v="${d.id}">
    ${ch.length?`<button class="dtog ${d.open?'open':''}" data-a="dToggle" data-v="${d.id}" aria-label="${d.open?'Recolher':'Expandir'}" aria-expanded="${d.open}">${ic('chevR',14,2.2)}</button>`:'<span class="dtog nil"></span>'}
    ${dAv(d)}
    <span class="dtx"><span class="dt1"><b>${esc(d.n)}</b>${d.role!=='Membro'?`<em class="tag">${d.role}</em>`:''}${dPill(d)}</span>
     <span class="dt2">${d.stage?`${stageDots(d)}<span>Etapa ${d.stage}/6 · ${TRILHA[d.stage-1]}</span>`:`<span>${RHY[d.rhythm]}</span>`}${base?`<span class="sep">·</span><span>${base} na base</span>`:''}${d.meets.filter(m=>m.type==='done').length?`<span class="sep">·</span><span>${d.meets.filter(m=>m.type==='done').length} encontro${d.meets.filter(m=>m.type==='done').length>1?'s':''}</span>`:''}</span></span>
    <span class="dr">${cadence(d)}${ic('chevR',16)}</span>
   </div>
   ${ch.length&&d.open?`<ul class="dkids">${ch.map(k=>node(k,depth+1)).join('')}</ul>`:''}
  </li>`;};
 const roots=DISC.filter(d=>!d.parent&&visible(d));
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="dq" placeholder="Buscar na rede" value="${esc(S.dq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos',DISC.length],['atrasado','Atrasados'],['emdia','Em dia'],['pausado','Pausados']].map(c=>`<button class="chipf ${S.df===c[0]?'on':''}" data-a="dFilter" data-v="${c[0]}">${c[0]!=='todos'?`<i style="background:${DST[c[0]][1]}"></i>`:''}${c[1]}<small>${c[2]??DISC.filter(d=>dStatus(d)===c[0]).length}</small></button>`).join('')}</div>
  <div class="tlegend"><span>Último contato</span><span class="cad"><span class="cadt"><i style="width:60%"></i></span></span><span>dentro do ritmo</span><span class="cad over"><span class="cadt"><i style="width:100%"></i></span></span><span>atrasado</span></div></div>
  ${roots.length?`<ul class="dtree">${roots.map(r=>node(r,0)).join('')}</ul>`:`<div class="mempty"><p>Ninguém por aqui.</p><span>Ninguém na rede corresponde a esse filtro.</span></div>`}
 </section>`;
}
function dResumo(){
 const trail=DISC.filter(d=>d.stage),andam=trail.filter(d=>!d.paused&&d.stage<6).length,paus=trail.filter(d=>d.paused).length,form=trail.filter(d=>d.stage===6).length;
 const all=DISC.flatMap(d=>d.meets.map(m=>({...m,who:d}))),done=all.filter(m=>m.type==='done'),sched=all.filter(m=>m.type==='sched').sort((a,b)=>a.d<b.d?-1:1);
 const month=done.filter(m=>m.d.slice(0,7)==='2026-09').length,next7=sched.filter(m=>inDays(m.d)<=7).length;
 const late=DISC.filter(d=>dStatus(d)==='atrasado').sort((a,b)=>(b.last-b.rhythm)-(a.last-a.rhythm));
 return `<div class="rgrid">
  <section class="card kpis4"><div class="k4"><span class="kl">Em andamento</span><span class="kv">${andam}</span><span class="kd">${paus} pausado</span></div><div class="k4"><span class="kl">Encontros em setembro</span><span class="kv">${month}</span><span class="kd">${done.length} em 2026</span></div><div class="k4"><span class="kl">Próximos 7 dias</span><span class="kv">${next7}</span><span class="kd">${sched.length} agendados no total</span></div><div class="k4"><span class="kl">Formados</span><span class="kv">${form}</span><span class="kd">concluíram a trilha</span></div></section>
  <section class="card pc rtrail"><div class="sh"><h2>Trilha por pessoa</h2><span class="who">6 etapas</span></div>
   <div class="trl">${trail.sort((a,b)=>b.stage-a.stage).map(d=>`<button class="trr" data-a="dOpen" data-v="${d.id}">${dAv(d)}<span class="trn"><b>${first(d)} ${d.n.split(' ').slice(-1)}</b><span>${TRILHA[d.stage-1]}${d.paused?' · pausado':''}</span></span>
    <span class="trs ${d.paused?'pz':''}">${TRILHA.map((t,i)=>`<i class="${i<d.stage?'on':''}" title="${i+1}. ${t}"></i>`).join('')}</span><b class="trp">${Math.round(d.stage/6*100)}%</b></button>`).join('')}</div>
   <div class="trk">${TRILHA.map((t,i)=>`<span><b>${i+1}</b>${t}</span>`).join('')}</div></section>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Próximos encontros</h2><span class="who">${sched.length}</span></div>
    ${sched.length?`<ol class="upc">${sched.map(m=>`<li><span class="ud"><b>${fmtD(m.d).split(' ')[0]}</b><span>${fmtD(m.d).split(' ')[1]}</span></span><span class="ub"><b>${esc(m.who.n)}</b><span>${wd(m.d)} · ${m.time.replace(':00','h')} · ${m.mode==='Remoto'?'Remoto':'Presencial'}</span></span><span class="who">${inDays(m.d)===0?'hoje':'em '+inDays(m.d)+'d'}</span></li>`).join('')}</ol>`:'<p class="who">Nada agendado.</p>'}</section>
   <section class="card pc"><div class="sh"><h2>Contato atrasado</h2><span class="who">por dias além do ritmo</span></div>
    <ol class="late">${late.slice(0,4).map(d=>`<li><button class="lt" data-a="dOpen" data-v="${d.id}">${dAv(d)}<span><b>${esc(d.n)}</b><span>${RHY[d.rhythm]} · ${dLbl(d.last)}</span></span><em>+${d.last-d.rhythm}d</em></button></li>`).join('')}</ol></section>
  </div>
 </div>`;
}

/* ---------- detail ---------- */
function discDetail(){
 const d=dById(S.disc);if(!d){S.disc=null;return discList();}
 const p=d.parent&&dById(d.parent);
 return `<nav class="crumb rise"><span class="soft">Cuidado</span>${ic('chevR',13,2)}<button class="lnk back" data-a="dBack">Discipulado</button>${ic('chevR',13,2)}<span>${esc(d.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${dAv(d,'xl')}<div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(d.n)}</h1>${dPill(d)}</div>
   <p>${d.role} · Discipulado por ${p?`<button class="lnk inl" data-a="dOpen" data-v="${p.id}">${esc(p.n)}</button>`:'ninguém (topo da rede)'}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="dReg">Registrar encontro</button><button class="btn pri" data-a="dSched">${ic('calendar',15)}Agendar</button>
   <div style="position:relative"><button class="ibtn" data-a="dMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="dPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="dTransfer">${ic('swap',17)}Transferir discipulador</button>${d.stage?`<button class="pi" data-a="dPause">${ic('pause',17)}${d.paused?'Retomar discipulado':'Pausar discipulado'}</button>`:''}<hr><button class="pi danger" data-a="dRemove">${ic('x',17)}Remover da rede</button></div></div></div>
  <div class="ptabs" role="tablist">${[['geral','Detalhes'],['enc','Encontros']].map(t=>`<button role="tab" class="${S.dpt===t[0]?'on':''}" data-a="dpt" data-v="${t[0]}">${t[1]}${t[0]==='enc'&&d.meets.length?`<small>${d.meets.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="dtb" class="rise" style="--d:2">${S.dpt==='geral'?dGeral(d):dEnc(d)}</div>`;
}
function dGeral(d){
 const k=kids(d.id),next=d.meets.filter(m=>m.type==='sched').sort((a,b)=>a.d<b.d?-1:1)[0],due=d.rhythm-d.last;
 return `<div class="pgrid">
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Cadência de contato</h2><span class="who">${d.paused?'Pausado':due>=0?`próximo contato em até <b>${due} ${due===1?'dia':'dias'}</b>`:`<b style="color:var(--st-rec)">${-due} dias</b> além do ritmo`}</span></div>
    <div class="cadbig ${d.paused?'pz':d.last>d.rhythm?'over':''}"><div class="cbt">${Array.from({length:Math.max(d.rhythm,d.last)},(_,i)=>`<i class="${i<d.last?(i<d.rhythm?'on':'ov'):''} ${i===d.rhythm-1?'lim':''}"></i>`).join('')}</div>
     <div class="cbl"><span>Último contato <b>${dLbl(d.last)}</b></span><span>Ritmo: ${d.rhythm} dias</span></div></div>
    <div class="fld" style="margin-top:16px"><span class="fl">Ritmo de contato</span><div class="yn" role="radiogroup" id="rhy">${[7,14,30].map(r=>`<label><input type="radio" name="rhy" value="${r}" ${d.rhythm===r?'checked':''}><span>${RHY[r]}</span></label>`).join('')}</div></div>
    <p class="who" style="margin:10px 0 0">Calculado a partir do último encontro realizado.${next?` Próximo agendado: <b>${wd(next.d)}, ${fmtD(next.d)} às ${next.time.replace(':00','h')}</b>.`:''}</p>
   </section>
   ${d.stage?`<section class="card pc"><div class="sh"><h2>Trilha</h2><span class="who">Etapa ${d.stage} de 6</span></div>
    <ol class="walk">${TRILHA.map((t,i)=>`<li class="${i<d.stage-1?'done':i===d.stage-1?'next':''}"><span class="wd">${i<d.stage-1?ic('check',13,2.6):''}</span><span class="wl">${t}</span></li>`).join('')}</ol>
    ${d.stage<6?`<div class="row2" style="margin-top:16px"><button class="btn sec sm" data-a="dStage">Concluir “${TRILHA[d.stage-1]}”</button></div>`:'<p class="who" style="margin:14px 0 0">Concluiu a trilha.</p>'}</section>`:''}
   <section class="card pc"><div class="sh"><h2>Discípulos</h2><button class="btn sec sm" data-a="dAddUnder">${ic('plus',14,2.2)}Adicionar discípulo</button></div>
    ${k.length?`<div class="dks">${k.map(c=>`<button class="dk" data-a="dOpen" data-v="${c.id}">${dAv(c)}<span class="dkt"><b>${esc(c.n)}</b><span>${c.stage?`Etapa ${c.stage}/6`:RHY[c.rhythm]}${desc(c.id).length?` · ${desc(c.id).length} na base`:''}</span></span>${dPill(c)}</button>`).join('')}</div>`:`<div class="soft-empty"><p>${first(d)} ainda não discipula ninguém.</p></div>`}</section>
  </div>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Anotações</h2><span class="who" id="nsaved"></span></div>
    <textarea id="dnotes" class="ta" rows="6" placeholder="Pedidos, contexto, próximos passos… só a liderança vê.">${esc(d.notes)}</textarea></section>
   <section class="card pc"><div class="sh"><h2>Discipulador</h2><button class="lnk" data-a="dTransfer">Transferir</button></div>
    ${d.parent?(()=>{const p=dById(d.parent);return `<button class="dk" data-a="dOpen" data-v="${p.id}">${dAv(p)}<span class="dkt"><b>${esc(p.n)}</b><span>${p.role} · ${RHY[p.rhythm]}</span></span>${ic('chevR',16)}</button>`;})():`<p class="who" style="margin:0">Topo da rede. Ninguém acima.</p>`}</section>
  </div>
 </div>`;
}
function dEnc(d){
 const ms=d.meets.slice().sort((a,b)=>a.d<b.d?1:-1),sched=ms.filter(m=>m.type==='sched').reverse(),done=ms.filter(m=>m.type==='done');
 if(!ms.length)return `<section class="card pc"><div class="eempty"><span class="eei">${ic('calendar',22)}</span><p>Nenhum encontro ainda.</p><span class="who">Agende o próximo ou registre um encontro que já aconteceu.</span><div class="row2" style="justify-content:center"><button class="btn sec" data-a="dReg">Registrar encontro</button><button class="btn pri" data-a="dSched">Agendar encontro</button></div></div></section>`;
 const item=m=>`<li class="${m.type}"><span class="ed"><b>${fmtD(m.d).split(' ')[0]}</b><span>${fmtD(m.d).split(' ')[1]}</span></span>
  <div class="eb2"><div class="et"><div><b>${m.type==='sched'?`${m.mode==='Remoto'?'Encontro remoto':'Encontro presencial'}`:esc(m.content||'Encontro')}</b><span class="who">${wd(m.d)} · ${m.time.replace(':00','h')}${m.type==='done'?` · ${m.mode}`:` · ${inDays(m.d)===0?'hoje':'em '+inDays(m.d)+' dias'}`}${m.mat?' · '+esc(m.mat):''}</span></div>
   <div class="ea">${m.type==='sched'?`${m.link?`<button class="btn sec sm" data-a="copy" data-v="${esc(m.link)}">Copiar link</button>`:''}<button class="btn pri sm" data-a="dConclude" data-v="${m.id}">Concluir</button>`:''}<button class="ibtn sm" data-a="dDelMeet" data-v="${m.id}" aria-label="Excluir encontro" title="Excluir encontro">${ic('x',14)}</button></div></div>
   ${m.note?`<p class="who" style="margin:6px 0 0">${esc(m.note)}</p>`:''}</div></li>`;
 return `<section class="card pc"><div class="sh"><h2>Encontros</h2><div class="row2"><button class="btn sec sm" data-a="dReg">Registrar</button><button class="btn pri sm" data-a="dSched">Agendar</button></div></div>
  ${sched.length?`<p class="eh">Agendados</p><ol class="elist">${sched.map(item).join('')}</ol>`:''}
  ${done.length?`<p class="eh">Realizados</p><ol class="elist">${done.map(item).join('')}</ol>`:''}</section>`;
}

function discAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#dq');if(q)q.addEventListener('input',e=>{S.dq=e.target.value;const pos=e.target.selectionStart;$('#dbody').innerHTML=dRede();discAfter();const n=$('#dq');n.focus();n.setSelectionRange(pos,pos);});
 const r=$('#rhy');if(r)r.addEventListener('change',e=>{const d=dById(S.disc);d.rhythm=+e.target.value;$('#dtb').innerHTML=dGeral(d);discAfter();toast(`Ritmo de ${first(d)} alterado para ${RHY[d.rhythm].toLowerCase()}`);});
 const n=$('#dnotes');if(n){let t;n.addEventListener('input',()=>{$('#nsaved').textContent='Salvando…';clearTimeout(t);t=setTimeout(()=>{dById(S.disc).notes=n.value;$('#nsaved').innerHTML=`${ic('check',13,2.4)} Salvo`;},700);});}
}
function reDisc(){const d=dById(S.disc);$('#dtb').innerHTML=S.dpt==='geral'?dGeral(d):dEnc(d);$$('.ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.dpt));const e=$('.ptabs [data-v=enc]');if(e)e.innerHTML=`Encontros${d.meets.length?`<small>${d.meets.length}</small>`:''}`;discAfter();}
const partsOf=d=>{const p=d.parent&&dById(d.parent);return [d.n,p?p.n:null].filter(Boolean);};
function partsField(d){return `<div class="fld"><span class="fl">Participantes</span><div class="parts" id="parts">${partsOf(d).map(n=>`<span class="pchip">${esc(n)}</span>`).join('')}<input id="partIn" placeholder="Adicionar…" list="partList" autocomplete="off"></div><datalist id="partList">${MEMBERS.map(m=>`<option value="${esc(m.n)}">`).join('')}</datalist></div>`;}
function bindParts(){const i=$('#partIn');if(!i)return;const add=()=>{const v=i.value.trim();if(!v)return;i.insertAdjacentHTML('beforebegin',`<span class="pchip">${esc(v)}<button type="button" aria-label="Remover" onclick="this.parentNode.remove()">×</button></span>`);i.value='';};i.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===','){e.preventDefault();add();}});i.addEventListener('change',add);}
function regDlg(d,from){
 openDlg(`${dlgHead(from?'Concluir encontro':'Registrar encontro',from?'Conte o que foi tratado para fechar o encontro agendado.':'Para um encontro que já aconteceu e não foi agendado antes.')}
 <form class="fgrid one" id="regF" novalidate>
  <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${from?from.d:TODAY.toISOString().slice(0,10)}" max="${TODAY.toISOString().slice(0,10)}"><span class="err"></span></label>
  <label class="fld"><span class="fl">Conteúdo tratado</span><textarea class="ta" name="c" rows="3" placeholder="O que foi conversado ou trabalhado"></textarea><span class="err"></span></label>
  ${partsField(d)}
  <label class="fld"><span class="fl">Anotação pessoal <small>opcional</small></span><textarea class="ta" name="note" rows="2" placeholder="Só você vê"></textarea></label>
  <label class="fld"><span class="fl">Material de apoio <small>opcional</small></span><span class="selw"><select name="mat"><option value="">Nenhum</option>${d.stage?`<option>Trilha · ${TRILHA[d.stage-1]}</option>`:''}<option>Estudo · O Sermão do Monte</option><option>Estudo · Frutos do Espírito</option><option>Livro · Vida com propósito</option></select>${ic('updown',14)}</span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${from?'Concluir':'Registrar'}</button></div></form>`);
 bindParts();const f=$('#regF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;i.focus();};
  if(!fd.get('d'))return bad('d','Escolha a data');if(!fd.get('c').trim())return bad('c','Descreva o que foi tratado');
  const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{if(from)d.meets.splice(d.meets.indexOf(from),1);d.meets.push(MT(fd.get('d'),'done',{c:fd.get('c').trim(),note:fd.get('note'),mat:fd.get('mat'),mode:from?from.mode:'Presencial',t:from?from.time:'19:30'}));
   d.last=Math.max(0,-inDays(fd.get('d')));closeDlg();S.dpt='enc';render();toast(`Encontro com ${first(d)} registrado · contato em dia`);},800);});
}

const DA={
 dtab:v=>{S.dtab=v;$$('.utabs button').forEach(b=>{b.classList.toggle('on',b.dataset.v===v);});$('#dbody').innerHTML=v==='rede'?dRede():dResumo();discAfter();},
 dFilter:v=>{S.df=v;$('#dbody').innerHTML=dRede();discAfter();},
 dToggle:(v,b,e)=>{e.stopPropagation();const d=dById(v);d.open=!d.open;$('#dbody').innerHTML=dRede();discAfter();},
 dOpen:(v,b,e)=>{if(e&&e.target.closest('.dtog'))return;S.disc=v;S.dpt='geral';closePops();render();window.scrollTo({top:0,behavior:'smooth'});},
 dBack:()=>{S.disc=null;render();},
 dpt:v=>{S.dpt=v;reDisc();tabInd();},
 dMenu:()=>{const p=$('#dPop');closePops(p);p.classList.toggle('open');},
 dReg:()=>regDlg(dById(S.disc)),
 dConclude:v=>{const d=dById(S.disc);regDlg(d,d.meets.find(m=>m.id===v));},
 dSched:()=>{const d=dById(S.disc);openDlg(`${dlgHead('Agendar encontro','O conteúdo tratado é preenchido quando você concluir o encontro.')}
  <form class="fgrid" id="schF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" min="${TODAY.toISOString().slice(0,10)}" value="${addDays(7)}"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input type="time" name="t" value="19:30"></label>
   <div class="wide">${partsField(d)}</div>
   <div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup" id="modeG"><label><input type="radio" name="mode" value="Presencial" checked><span>${ic('pin',15)}&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"><span>${ic('monitor',15)}&nbsp;Remoto</span></label></div></div>
   <label class="fld wide" id="whereF"><span class="fl">Local <small>opcional</small></span><input name="where" placeholder="Ex.: Café da igreja, sala 2"></label>
   <label class="fld wide" id="linkF" hidden><span class="fl">Link da reunião <small>opcional</small></span><input name="link" type="url" placeholder="Meet, Teams, Zoom… pode preencher depois"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Agendar</button></div></form>`);
  bindParts();$('#modeG').addEventListener('change',e=>{const r=e.target.value==='Remoto';$('#linkF').hidden=!r;$('#whereF').hidden=r;});
  const f=$('#schF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);if(!fd.get('d')){const i=f.querySelector('[name=d]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Escolha a data';return;}
   const lk=fd.get('link');if(lk&&!/^https?:\/\//.test(lk)){const i=f.querySelector('[name=link]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Link inválido';return;}
   const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{d.meets.push(MT(fd.get('d'),'sched',{t:fd.get('t'),mode:fd.get('mode'),link:lk}));closeDlg();S.dpt='enc';render();toast(`Encontro agendado para ${wd(fd.get('d'))}, ${fmtD(fd.get('d'))} · convite enviado`);},800);});},
 dDelMeet:v=>{const d=dById(S.disc),i=d.meets.findIndex(m=>m.id===v),m=d.meets[i];
  confirmDel({title:m.type==='sched'?'Cancelar este encontro?':'Excluir este registro?',body:m.type==='sched'?`Os participantes serão avisados do cancelamento de ${wd(m.d)}, ${fmtD(m.d)}.`:`O registro de ${fmtD(m.d)} sai do histórico de ${first(d)}. A cadência de contato é recalculada.`,label:m.type==='sched'?'Cancelar encontro':'Excluir registro',onConfirm:()=>{d.meets.splice(i,1);reDisc();toast(m.type==='sched'?'Encontro cancelado':'Registro excluído',()=>{d.meets.splice(i,0,m);reDisc();});}});},
 dStage:()=>{const d=dById(S.disc),t=TRILHA[d.stage-1];d.stage++;reDisc();toast(`${first(d)} concluiu “${t}”`,()=>{d.stage--;reDisc();});},
 dPause:()=>{closePops();const d=dById(S.disc);d.paused=!d.paused;render();toast(d.paused?`Discipulado de ${first(d)} pausado`:`Discipulado de ${first(d)} retomado`);},
 dRemove:()=>{closePops();const d=dById(S.disc),k=kids(d.id),p=d.parent&&dById(d.parent);
  confirmDel({title:`Remover ${first(d)} da rede?`,body:`${k.length?`${k.length} ${k.length>1?'discípulos passam':'discípulo passa'} a ser acompanhado${k.length>1?'s':''} por ${p?esc(p.n):'ninguém (topo da rede)'}. `:''}Os encontros registrados são apagados.`,label:'Remover da rede',typed:k.length?first(d):null,onConfirm:()=>{k.forEach(c=>c.parent=d.parent);DISC.splice(DISC.indexOf(d),1);S.disc=null;render();toast(`${first(d)} removido(a) da rede`);}});},
 dTransfer:()=>{closePops();const d=dById(S.disc),bad=new Set([d.id,...desc(d.id).map(x=>x.id)]);const opts=DISC.filter(x=>!bad.has(x.id));
  openDlg(`${dlgHead('Transferir discipulador',`Quem passa a acompanhar ${first(d)}?`)}<div class="pick">${[{id:'',n:'Ninguém — topo da rede',tone:'salvia',role:''},...opts].map(o=>`<label class="pk">${o.id?dAv(o):`<span class="av ghost">${ic('arrowR',14,2)}</span>`}<span><b>${esc(o.n)}</b><small>${o.id?`${o.role} · ${desc(o.id).length} na base`:'Sem discipulador'}</small></span><input type="radio" name="np" value="${o.id}" ${o.id===(d.parent||'')?'checked':''}></label>`).join('')}</div>
   <p class="who" style="margin:12px 0 0">${kids(d.id).length?`Os ${desc(d.id).length} da base de ${first(d)} vão junto.`:''}</p><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="dDoTransfer">Transferir</button></div>`,'sm');},
 dDoTransfer:(v,b)=>{const d=dById(S.disc),np=$('input[name=np]:checked').value||null;if(np===d.parent){closeDlg();return;}b.classList.add('busy');setTimeout(()=>{const old=d.parent;d.parent=np;closeDlg();render();toast(`${first(d)} agora é acompanhado(a) por ${np?dById(np).n:'ninguém (topo)'}`,()=>{d.parent=old;render();});},700);},
 dAddUnder:()=>DA.dAdd(S.disc),
 dAdd:(under)=>{under=typeof under==='string'&&under.startsWith('d')?under:'';const inNet=new Set(DISC.map(x=>norm(x.n.replace('Pr. ',''))));const cand=MEMBERS.filter(m=>!inNet.has(norm(m.n)));
  openDlg(`${dlgHead('Adicionar pessoa à rede','Precisa ser um membro cadastrado. Pastores também são membros.')}
  <form class="fgrid" id="daF" novalidate style="grid-template-columns:1fr 1fr">
   <div class="fld wide"><span class="fl">Pessoa</span><label class="sbox" style="margin-bottom:8px">${ic('search',16)}<input id="daq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="dapick" style="max-height:200px">${candList(cand,'')}</div><span class="err"></span></div>
   <label class="fld wide"><span class="fl">Discipulado por</span><span class="selw"><select name="parent"><option value="">Ninguém — topo da rede</option>${DISC.map(x=>`<option value="${x.id}" ${x.id===under?'selected':''}>${esc(x.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <div class="fld wide"><span class="fl">Papel</span><div class="yn" role="radiogroup">${['Membro','Líder','Pastor'].map((r,i)=>`<label><input type="radio" name="role" value="${r}" ${!i?'checked':''}><span>${r}</span></label>`).join('')}</div></div>
   <div class="fld wide"><span class="fl">Ritmo de contato</span><div class="yn" role="radiogroup">${[7,14,30].map(r=>`<label><input type="radio" name="rhy" value="${r}" ${r===14?'checked':''}><span>${RHY[r]}</span></label>`).join('')}</div></div>
   <label class="tog wide"><input type="checkbox" name="trail" checked><span class="sw"></span><span><b>Iniciar a trilha de discipulado</b><small>Começa em “${TRILHA[0]}”</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Adicionar</button></div></form>`);
  $('#daq').addEventListener('input',e=>{$('#dapick').innerHTML=candList(cand,e.target.value);});
  const f=$('#daF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),pid=fd.get('pm');if(!pid){const el=$('#dapick').closest('.fld');el.classList.add('bad');el.querySelector('.err').textContent='Escolha um membro';return;}
   const m=byId(pid),b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const nd=DN(m.n,fd.get('parent')||null,{role:fd.get('role'),rhythm:+fd.get('rhy'),last:0,stage:fd.get('trail')?1:0,tone:m.tone});DISC.push(nd);if(nd.parent)dById(nd.parent).open=true;closeDlg();S.disc=null;S.dtab='rede';render();toast(`${m.n.split(' ')[0]} entrou na rede`);setTimeout(()=>{const r=document.querySelector(`.drow[data-v=${nd.id}]`);r&&r.classList.add('flash');r&&r.scrollIntoView({block:'center',behavior:'smooth'});},100);},800);});},
};
function candList(c,q){q=norm(q);const l=c.filter(m=>norm(m.n).includes(q)).slice(0,8);return l.length?l.map(m=>`<label class="pk">${mav(m)}<span><b>${esc(m.n)}</b><small>${m.min.length?m.min.join(', '):ST[m.st].l}</small></span><input type="radio" name="pm" value="${m.id}"></label>`).join(''):'<p class="who" style="padding:10px">Ninguém encontrado fora da rede.</p>';}

/* ================= Cuidado › Acompanhamento (casos) ================= */
I.hospital='<path d="M12 7v4"/><path d="M14 9h-4"/><path d="M18 21V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v15"/><path d="M3 21h18"/><path d="M10 21v-4h4v4"/>';
I.flower='<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/>';
const CTYPE={Visita:'home',Hospital:'hospital',Aconselhamento:'message',Luto:'flower',Oração:'hands'};
const CST={urgente:['Urgente','var(--st-rec)','var(--st-rec-bg)'],acompanhando:['Acompanhando','var(--st-sol)','var(--st-sol-bg)'],resolvido:['Resolvido','var(--st-int)','var(--st-int-bg)']};
const PASTORS=[['Pr. Rafael Pereira','ceu'],['Diác. Ana Costa','rosado'],['Pr. Marcos Lima','salvia'],['Pra. Daniela Rocha','damasco']];
let _cid=0;
const CS=(n,st,type,desc,resp,o={})=>({id:'c'+(++_cid),n,tone:o.tone||TONES[_cid%6],st,type,desc,resp,restr:!!o.restr,meets:o.meets||[],opened:o.opened||addDays(-10),resolved:o.resolved||''});
const CASES=[
 CS('Maria Santos','urgente','Hospital','Internada no Hospital São Paulo — cirurgia programada para sexta.','Pr. Rafael Pereira',{tone:'rosado',opened:addDays(-4),meets:[{d:addDays(-1),t:'Visita no hospital. Família presente, pediu oração pela cirurgia.'},{d:addDays(-4),t:'Ligação após a internação.'}]}),
 CS('João Oliveira','acompanhando','Aconselhamento','Passando por divórcio. Terceira sessão de aconselhamento agendada.','Diác. Ana Costa',{restr:true,tone:'ceu',opened:addDays(-40),meets:[{d:addDays(-6),t:'2ª sessão de aconselhamento.'},{d:addDays(-20),t:'1ª sessão.'},{d:addDays(-40),t:'Primeira conversa após o culto.'}]}),
 CS('Clara Ferreira','acompanhando','Luto','Perdeu o pai em agosto. Necessita de visita e suporte.','Pr. Marcos Lima',{tone:'lima',opened:addDays(-35)}),
 CS('Pedro Almeida','urgente','Oração','Crise de ansiedade severa. Afastado do trabalho.','Pr. Rafael Pereira',{restr:true,tone:'damasco',opened:addDays(-3),meets:[{d:addDays(-2),t:'Conversa por telefone. Encaminhado para acompanhamento profissional.'}]}),
 CS('Lucia Gomes','resolvido','Visita','Visitação realizada. Membro bem-acolhida e encorajada.','Pra. Daniela Rocha',{tone:'menta',resolved:addDays(-8),meets:[{d:addDays(-8),t:'Visita em casa com a equipe de recepção.'}]}),
 CS('Roberto Nunes','resolvido','Hospital','Recebeu alta após a cirurgia. Recuperação em casa.','Pr. Rafael Pereira',{tone:'salvia',resolved:addDays(-15),meets:[{d:addDays(-15),t:'Visita no dia da alta.'},{d:addDays(-19),t:'Visita no hospital.'}]}),
];
Object.assign(S,{cf:'ativos',cq:''});
const cById=id=>CASES.find(c=>c.id===id);
const cPill=c=>`<span class="stp" style="--c:${CST[c.st][1]};--b:${CST[c.st][2]}"><i></i>${CST[c.st][0]}</span>`;
const pInit=n=>n.replace(/^(Pr\.|Pra\.|Diác\.)\s/,'').split(' ').map(w=>w[0]).slice(0,2).join('');
const pTone=n=>(PASTORS.find(p=>p[0]===n)||[0,'ceu'])[1];
const ago=iso=>{const n=-inDays(iso);return n===0?'hoje':n===1?'ontem':`há ${n} dias`;};

function casesList(){
 const cnt=k=>CASES.filter(c=>c.st===k).length,act=cnt('urgente')+cnt('acompanhando');
 return `<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Acompanhamento</h1><p class="lede">Casos de cuidado pastoral, visitas e aconselhamento</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="cexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="cexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="todos os casos">Todos os casos</button><button class="pi" data-a="export" data-v="os casos urgentes">Casos urgentes</button></div></div>
  <button class="btn pri" data-a="cAdd">${ic('plus',15,2.2)}Novo caso</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Casos ativos</span><span class="kv">${act}</span><span class="kd"><b style="color:var(--st-rec)">${cnt('urgente')} urgentes</b> precisam de atenção</span></div>
  <div class="k4"><span class="kl">Acompanhando</span><span class="kv">${cnt('acompanhando')}</span><span class="kd">em andamento</span></div>
  <div class="k4"><span class="kl">Resolvidos</span><span class="kv">${cnt('resolvido')}</span><span class="kd">nos últimos 30 dias</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="cq" placeholder="Buscar caso ou pessoa" value="${esc(S.cq)}" autocomplete="off"></label>
   <div class="chips">${[['ativos','Ativos',act],['urgente','Urgentes',cnt('urgente')],['acompanhando','Acompanhando',cnt('acompanhando')],['resolvido','Resolvidos',cnt('resolvido')],['todos','Todos',CASES.length]].map(c=>`<button class="chipf ${S.cf===c[0]?'on':''}" data-a="cFilter" data-v="${c[0]}">${CST[c[0]]?`<i style="background:${CST[c[0]][1]}"></i>`:''}${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="crows">${cRows()}</div>
 </section>`;
}
function cRows(){
 const q=norm(S.cq),ord={urgente:0,acompanhando:1,resolvido:2};
 const l=CASES.filter(c=>(S.cf==='todos'||(S.cf==='ativos'?c.st!=='resolvido':c.st===S.cf))&&(!q||norm(c.n+' '+c.desc+' '+c.type+' '+c.resp).includes(q))).sort((a,b)=>ord[a.st]-ord[b.st]);
 if(!l.length)return `<div class="mempty"><p>Nenhum caso aqui.</p><span>${S.cf==='urgente'?'Nenhum caso urgente no momento.':'Nada corresponde a esse filtro.'}</span></div>`;
 return `<div class="clist">${l.map(c=>{const last=c.meets[0];return `<div class="crow ${c.st}" tabindex="0" data-a="cOpen" data-v="${c.id}">
  <span class="av" style="background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${initials(c.n)}</span>
  <div class="cb"><div class="c1"><b>${esc(c.n)}</b>${cPill(c)}<span class="ctype">${ic(CTYPE[c.type],14)}${c.type}</span>${c.restr?`<span class="crestr" title="Só o responsável e o Presbitério veem">${ic('lock',12,2.2)}Restrito</span>`:''}</div>
   <p class="cdesc">${esc(c.desc)}</p>
   <div class="c3"><span class="cresp"><span class="av" style="background:var(--tone-${pTone(c.resp)});color:var(--tone-${pTone(c.resp)}-ink)">${pInit(c.resp)}</span>${esc(c.resp)}</span><span class="sep">·</span><span>${c.meets.length?`${c.meets.length} encontro${c.meets.length>1?'s':''} · último ${ago(last.d)}`:'<b style="color:var(--st-sol)">Nenhum encontro ainda</b>'}</span></div></div>
  <span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}</div>
 <div class="tfoot"><span>${l.length} ${l.length>1?'casos':'caso'}</span></div>`;
}
function cDrawer(c){
 openDlg(`<div class="dh"><div class="drh"><span class="av lg" style="background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${initials(c.n)}</span><div><h3>${esc(c.n)}</h3><p><span class="ctype">${ic(CTYPE[c.type],14)}${c.type}</span> · aberto ${ago(c.opened)}${c.restr?` · <span class="crestr">${ic('lock',12,2.2)}Restrito</span>`:''}</p></div></div><button class="ibtn sm" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  <div class="fld"><span class="fl">Situação</span><div class="yn cst" role="radiogroup" id="cstG">${Object.keys(CST).map(k=>`<label><input type="radio" name="cst" value="${k}" ${c.st===k?'checked':''}><span><i style="background:${CST[k][1]}"></i>${CST[k][0]}</span></label>`).join('')}</div></div>
  <div class="dsec"><span class="fl">Descrição</span><p>${esc(c.desc)}</p></div>
  <dl class="kv grid2"><div><dt>Responsável</dt><dd class="cresp"><span class="av" style="background:var(--tone-${pTone(c.resp)});color:var(--tone-${pTone(c.resp)}-ink)">${pInit(c.resp)}</span>${esc(c.resp)}</dd></div><div><dt>Quem vê</dt><dd>${c.restr?'Responsável e Presbitério':'Todos os pastores'}</dd></div></dl>
  <div class="dsec"><div class="sh" style="margin-bottom:10px"><span class="fl">Encontros</span><span class="who">${c.meets.length}</span></div>
   <form id="cmF" class="cmf"><textarea class="ta" name="t" rows="2" placeholder="Registrar encontro: o que aconteceu?"></textarea><div class="cmr"><input type="date" name="d" value="${TODAY.toISOString().slice(0,10)}" max="${TODAY.toISOString().slice(0,10)}"><button class="btn pri sm" type="submit">Registrar</button></div></form>
   ${c.meets.length?`<ol class="mini-tl" style="margin-top:16px">${c.meets.map(m=>`<li><b>${esc(m.t)}</b><span>${fmtD(m.d)} · ${ago(m.d)}</span></li>`).join('')}</ol>`:'<p class="who" style="margin:12px 0 0">Nenhum encontro registrado.</p>'}</div>
  <div class="dfoot" style="justify-content:space-between"><button class="btn ghostd" data-a="cDel" data-v="${c.id}">Excluir caso</button><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'drawer');
 $('.dlgw').classList.add('drw');
 $('#cstG').addEventListener('change',e=>{const old=c.st;c.st=e.target.value;if(c.st==='resolvido')c.resolved=TODAY.toISOString().slice(0,10);refreshCases();toast(`Caso de ${c.n.split(' ')[0]}: ${CST[c.st][0].toLowerCase()}`,()=>{c.st=old;refreshCases();cDrawer(c);});});
 $('#cmF').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target),t=fd.get('t').trim();if(!t){e.target.querySelector('textarea').focus();e.target.querySelector('textarea').animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'none'}],{duration:220});return;}
  const b=e.target.querySelector('button');b.classList.add('busy');setTimeout(()=>{c.meets.unshift({d:fd.get('d'),t});refreshCases();cDrawer(c);toast('Encontro registrado');},600);});
}
function refreshCases(){if(S.active==='acompanhamento'){const y=window.scrollY;render();window.scrollTo(0,y);}}

/* ================= Cuidado › Pedidos de oração ================= */
let _pid=0;
const PR=(n,text,when,count,o={})=>({id:'p'+(++_pid),n,text,when,count,tone:o.tone||TONES[_pid%6],mine:!!o.mine,st:o.st||'ativo',priv:!!o.priv,who:o.who||[]});
const PRAYERS=[
 PR('Alícia Mendes','Cura e restauração da saúde da minha mãe.',0,12,{mine:true,tone:'rosado',who:['ceu','lima','menta']}),
 PR('Samuel Torres','Sabedoria e direção para mudança de carreira.',1,8,{tone:'ceu',who:['damasco','salvia']}),
 PR('Beatriz Lima','Reconciliação com meu irmão.',2,15,{tone:'lima',priv:true,who:['rosado','ceu','menta']}),
 PR('Fernando Dias','Aprovação no concurso público.',3,6,{tone:'damasco',who:['salvia','lima']}),
 PR('Carla Souza','Um emprego novo depois de meses procurando.',21,19,{tone:'menta',st:'respondido',who:['ceu','rosado','damasco']}),
];
Object.assign(S,{pf:'ativo'});
const whenL=n=>n===0?'Hoje':n===1?'Ontem':`${n} dias atrás`;
function prayerList(){
 const act=PRAYERS.filter(p=>p.st==='ativo'),conf=act.reduce((a,p)=>a+p.count,0),mine=act.filter(p=>p.mine).length;
 const l=PRAYERS.filter(p=>S.pf==='todos'||p.st===S.pf||(S.pf==='pend'&&p.st==='ativo'&&!p.mine));
 return `<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Pedidos de oração</h1><p class="lede">Pedidos enviados pelos membros pelo app</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="pexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="pexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="os pedidos ativos">Pedidos ativos</button><button class="pi" data-a="export" data-v="todos os pedidos">Todos os pedidos</button></div></div></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Pedidos ativos</span><span class="kv">${act.length}</span><span class="kd">${PRAYERS.filter(p=>p.st==='respondido').length} respondido${PRAYERS.filter(p=>p.st==='respondido').length>1?'s':''}</span></div>
  <div class="k4"><span class="kl">Pessoas orando</span><span class="kv">${conf}</span><span class="kd">confirmações “estou orando”</span></div>
  <div class="k4"><span class="kl">Você está orando</span><span class="kv">${mine}<small class="kof"> de ${act.length}</small></span><span class="kmeter"><i style="width:${act.length?Math.round(mine/act.length*100):0}%"></i></span></div>
 </section>
 <div class="chips rise" style="--d:2">${[['ativo','Ativos',act.length],['pend','Sem sua oração',act.filter(p=>!p.mine).length],['respondido','Respondidos',PRAYERS.filter(p=>p.st==='respondido').length],['todos','Todos',PRAYERS.length]].map(c=>`<button class="chipf ${S.pf===c[0]?'on':''}" data-a="pFilter" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div>
 <div class="pgrid2 rise" style="--d:3">${l.length?l.map(pCard).join(''):`<div class="card mempty" style="grid-column:1/-1"><p>Você está orando por todos.</p><span>Nenhum pedido esperando sua oração.</span></div>`}</div>`;
}
function pCard(p){
 return `<article class="card prc ${p.st}" id="${p.id}">
  <div class="pr1"><span class="av" style="background:var(--tone-${p.tone});color:var(--tone-${p.tone}-ink)">${initials(p.n)}</span><div class="prn"><b>${esc(p.n)}</b><span>${whenL(p.when)}${p.priv?` · <span class="crestr">${ic('lock',11,2.2)}Só liderança</span>`:''}</span></div>
   <div style="position:relative;margin-left:auto"><button class="ibtn sm" data-a="pMenu" data-v="${p.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="pPop-${p.id}" style="right:0;top:calc(100% + 4px)">${p.st==='ativo'?`<button class="pi" data-a="pAnswer" data-v="${p.id}">${ic('check',16)}Marcar como respondido</button>`:`<button class="pi" data-a="pReopen" data-v="${p.id}">${ic('swap',16)}Reabrir pedido</button>`}<hr><button class="pi danger" data-a="pDel" data-v="${p.id}">${ic('x',16)}Excluir pedido</button></div></div></div>
  <blockquote class="prq">${esc(p.text)}</blockquote>
  <div class="pr3"><span class="prw"><span class="stack sm">${p.who.map(t=>`<span class="av" style="background:var(--tone-${t});color:var(--tone-${t}-ink)"></span>`).join('')}${p.mine?'<span class="av" style="background:var(--brand);color:var(--on-brand)">RP</span>':''}</span><span><b>${p.count}</b> orando</span></span>
   ${p.st==='respondido'?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Oração respondida</span>`:`<button class="btn ${p.mine?'sec on':'pri'} sm pray" data-a="pPray" data-v="${p.id}" aria-pressed="${p.mine}">${p.mine?`${ic('check',14,2.4)}Você está orando`:`${ic('hands',15)}Estou orando`}</button>`}</div>
  ${p.mine&&p.st==='ativo'?`<p class="prnote">${ic('bell',13)}${p.n.split(' ')[0]} foi avisada que você está orando</p>`.replace('avisada',p.n.split(' ')[0].endsWith('a')?'avisada':'avisado'):''}
 </article>`;
}
function cuidadoAfter(){
 const q=$('#cq');if(q)q.addEventListener('input',e=>{S.cq=e.target.value;$('#crows').innerHTML=cRows();});
}
const CA={
 cexpMenu:()=>{const p=$('#cexpPop');closePops(p);p.classList.toggle('open');},
 pexpMenu:()=>{const p=$('#pexpPop');closePops(p);p.classList.toggle('open');},
 cFilter:v=>{S.cf=v;$$('.chipf[data-a=cFilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#crows').innerHTML=cRows();},
 cOpen:v=>cDrawer(cById(v)),
 cDel:v=>{const c=cById(v);closeDlg();setTimeout(()=>confirmDel({title:`Excluir o caso de ${c.n.split(' ')[0]}?`,body:`A descrição e os ${c.meets.length} encontros registrados serão apagados. Esta ação não pode ser desfeita.`,label:'Excluir caso',onConfirm:()=>{CASES.splice(CASES.indexOf(c),1);render();toast('Caso excluído');}}),250);},
 cAdd:()=>{const cand=MEMBERS.filter(m=>m.tit);openDlg(`${dlgHead('Novo caso','Registre uma situação que precisa de cuidado pastoral.')}
  <form class="fgrid one" id="caF" novalidate>
   <div class="fld"><span class="fl">Membro</span><label class="sbox" style="margin-bottom:8px">${ic('search',16)}<input id="caq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="capick" style="max-height:176px">${candList(cand,'')}</div><span class="err"></span></div>
   <div class="fld"><span class="fl">Tipo</span><div class="minpick">${Object.keys(CTYPE).map((t,i)=>`<label><input type="radio" name="type" value="${t}" ${!i?'checked':''}><span>${ic(CTYPE[t],14)}&nbsp;${t}</span></label>`).join('')}</div></div>
   <label class="fld"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="3" placeholder="O que está acontecendo e do que a pessoa precisa"></textarea><span class="err"></span></label>
   <label class="fld"><span class="fl">Responsável</span><span class="selw"><select name="resp">${PASTORS.map(p=>`<option>${p[0]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <div class="fld"><span class="fl">Quem pode ver este caso?</span><div class="vis">
    <label><input type="radio" name="restr" value="0" checked><span><b>Todos os pastores</b><small>Qualquer pastor do sistema pode ver.</small></span></label>
    <label><input type="radio" name="restr" value="1"><span><b>${ic('lock',13,2.2)} Restrito</b><small>Só o responsável e o Presbitério. Para casos sensíveis.</small></span></label></div></div>
   <label class="tog"><input type="checkbox" name="urg"><span class="sw"></span><span><b>Marcar como urgente</b><small>Aparece no topo e no painel Hoje</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar caso</button></div></form>`);
  $('#caq').addEventListener('input',e=>{$('#capick').innerHTML=candList(cand,e.target.value);});
  const f=$('#caF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(el,m)=>{el.classList.add('bad');el.querySelector('.err').textContent=m;ok=false;};
   if(!fd.get('pm'))bad($('#capick').closest('.fld'),'Escolha o membro');if(!fd.get('desc').trim())bad(f.querySelector('[name=desc]').closest('.fld'),'Descreva a situação');if(!ok)return;
   const m=byId(fd.get('pm')),b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const c=CS(m.n,fd.get('urg')?'urgente':'acompanhando',fd.get('type'),fd.get('desc').trim(),fd.get('resp'),{restr:fd.get('restr')==='1',tone:m.tone,opened:TODAY.toISOString().slice(0,10)});CASES.unshift(c);closeDlg();S.cf='ativos';render();toast(`Caso de ${m.n.split(' ')[0]} criado · ${fd.get('resp')} foi avisado`);},800);});},
 pFilter:v=>{S.pf=v;render();},
 pMenu:v=>{const p=$('#pPop-'+v);closePops(p);p.classList.toggle('open');},
 pPray:(v,b)=>{const p=PRAYERS.find(x=>x.id===v);p.mine=!p.mine;p.count+=p.mine?1:-1;const el=$('#'+v);el.outerHTML=pCard(p);$('#'+v).animate([{transform:'scale(.99)'},{transform:'none'}],{duration:260});
  if(p.mine)toast(`${p.n.split(' ')[0]} vai saber que você está orando`);updPrayKpi();},
 pAnswer:v=>{closePops();const p=PRAYERS.find(x=>x.id===v);p.st='respondido';render();toast('Pedido marcado como respondido',()=>{p.st='ativo';render();});},
 pReopen:v=>{closePops();const p=PRAYERS.find(x=>x.id===v);p.st='ativo';render();toast('Pedido reaberto');},
 pDel:v=>{closePops();const p=PRAYERS.find(x=>x.id===v);confirmDel({title:'Excluir este pedido de oração?',body:`O pedido de ${p.n.split(' ')[0]} sai do app para todos. As ${p.count} pessoas que estavam orando deixam de vê-lo.`,label:'Excluir pedido',onConfirm:()=>{PRAYERS.splice(PRAYERS.indexOf(p),1);render();toast('Pedido excluído');}});},
};
function updPrayKpi(){const y=window.scrollY;const act=PRAYERS.filter(p=>p.st==='ativo');const k=$$('.kpis4 .k4');if(!k.length)return;
 k[1].querySelector('.kv').textContent=act.reduce((a,p)=>a+p.count,0);const mine=act.filter(p=>p.mine).length;k[2].querySelector('.kv').innerHTML=`${mine}<small class="kof"> de ${act.length}</small>`;k[2].querySelector('.kmeter i').style.width=Math.round(mine/act.length*100)+'%';window.scrollTo(0,y);}

/* ================= Comunidade › Casas de Apascentamento ================= */
const HMIN=['Jovens e Adolescentes','Casais','Mulheres','Homens','Kids'];
const HPOOL=['Beatriz Nogueira','Caio Ramos','Daniel Freitas','Eduarda Lins','Fábio Moura','Gisele Prado','Hugo Lemos','Íris Campos','Jonas Paiva','Kelly Rocha','Lívia Santos','Mateus Leal','Nina Castro','Otto Barros','Priscila Reis','Raul Teles','Sara Brito','Tomás Vieira','Vera Lopes','Wagner Dias','Yara Mendes','Zeca Arruda'];
let _hid=0;
function mkCasa(n,leader,host,count,total,last,o={}){
 const id='h'+(++_hid),named=o.named||[];
 const ppl=[{n:leader,role:'Líder',since:o.since||'jan/2025'},{n:host,role:'Anfitrião',since:o.since||'jan/2025'},...named.map(x=>({n:x[0],role:'Participante',since:x[1]}))];
 let k=_hid*5;while(ppl.length<count){const nm=HPOOL[k++%HPOOL.length];if(!ppl.some(p=>p.n===nm))ppl.push({n:nm,role:'Participante',since:['fev/2025','abr/2025','jun/2025','set/2025','jan/2026','mar/2026'][k%6]});}
 ppl.forEach((p,i)=>{p.id=id+'p'+i;p.tone=TONES[(i+_hid)%6];});
 const meets=[];for(let w=0;w<8;w++){const d=new Date(last+'T12:00');d.setDate(d.getDate()-7*w);const iso=d.toISOString().slice(0,10);const pres={},why={};ppl.forEach((p,i)=>{const on=((i*7+w*3+_hid)%10)<(o.rate||7.6);pres[p.id]=on;if(!on&&(i+w)%3===0)why[p.id]=['Viagem a trabalho','Doente','Plantão','Compromisso familiar'][(i+w)%4];});meets.push({id:id+'e'+w,d:iso,desc:o.descs&&o.descs[w]||['Estudo em grupo e partilha.','Encontro de oração e partilha.','Estudo sobre os frutos do Espírito.','Comunhão com lanche coletivo.'][(w+_hid)%4],mat:w===0&&o.mat?o.mat:'',pres,why,done:true});}
 return {id,n,leader,host,addr:o.addr||'',phone:o.phone||'',min:o.min||'',tone:o.tone||TONES[_hid%6],ppl,meets,total,req:o.req||[]};
}
const CASAS=[
 mkCasa('Casa Norte — Lapa','André Rocha','Patrícia Lima',18,32,'2026-09-14',{tone:'ceu',addr:'Rua das Palmeiras, 45 — Lapa, São Paulo/SP',phone:'(11) 99234-5678',named:[['Cláudia Ferraz','mar/2025'],['Henrique Costa','jun/2025'],['Mônica Souza','ago/2025']],descs:['Estudo sobre os frutos do Espírito, cap. 3 do material de apoio.','Encontro de oração e partilha.'],req:[{n:'Rafael Teixeira',d:'2026-09-18',tone:'menta'}],rate:7.8}),
 mkCasa('Casa Sul — Ipiranga','Fernanda Alves Melo','Rogério Melo',24,28,'2026-09-13',{tone:'damasco',addr:'Rua Bom Pastor, 1200 — Ipiranga, São Paulo/SP',phone:'(11) 98811-2030',min:'Casais',rate:7.2}),
 mkCasa('Casa Leste — Tatuapé','Renan Ferreira','Júlia Ferreira',12,20,'2026-09-11',{tone:'lima',addr:'Rua Tuiuti, 310 — Tatuapé, São Paulo/SP',min:'Jovens e Adolescentes',req:[{n:'Luana Pires',d:'2026-09-25',tone:'rosado'},{n:'Igor Nunes',d:'2026-09-27',tone:'salvia'}],rate:6.6}),
 mkCasa('Casa Oeste — Pinheiros','Larissa Pinto Rocha','Marcelo Rocha',20,35,'2026-09-14',{tone:'rosado',addr:'Rua dos Pinheiros, 870 — Pinheiros, São Paulo/SP',phone:'(11) 97700-4411',rate:8.1}),
 mkCasa('Casa Centro — República','Thiago Mendes','Ana Mendes',9,15,'2026-09-10',{tone:'salvia',addr:'Av. Ipiranga, 200 — República, São Paulo/SP',rate:6.9}),
];
Object.assign(S,{casa:null,ctab:'geral',chamada:null,hq:'',hmin:'todos',hedit:null});
const hById=id=>CASAS.find(c=>c.id===id);
const mRate=(c,m)=>{const t=c.ppl.length;return t?Math.round(c.ppl.filter(p=>m.pres[p.id]).length/t*100):0;};
const cRate=c=>{const ms=c.meets.filter(m=>m.done).slice(0,4);return ms.length?Math.round(ms.reduce((a,m)=>a+mRate(c,m),0)/ms.length):0;};
const cPrev=c=>{const ms=c.meets.filter(m=>m.done).slice(4,8);return ms.length?Math.round(ms.reduce((a,m)=>a+mRate(c,m),0)/ms.length):0;};
const lastMeet=c=>c.meets.filter(m=>m.done)[0];
const hTile=(c,s=38)=>`<span class="htile" style="--s:${s}px;background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${ic('home',Math.round(s*.47),1.9)}</span>`;
const pv=p=>`<span class="av" style="background:var(--tone-${p.tone});color:var(--tone-${p.tone}-ink)">${initials(p.n)}</span>`;
const dmy=iso=>{const [y,m,d]=iso.split('-');return `${d}/${m}/${y}`;};
function spark6(c){const ms=c.meets.filter(m=>m.done).slice(0,6).reverse();return `<span class="hspark" title="Presença nos últimos ${ms.length} encontros">${ms.map(m=>{const r=mRate(c,m);return `<i style="height:${Math.max(12,r)}%" title="${fmtD(m.d)}: ${r}%"></i>`;}).join('')}</span>`;}

function casasList(){
 const tot=CASAS.reduce((a,c)=>a+c.ppl.length,0),sep=CASAS.reduce((a,c)=>a+c.meets.filter(m=>m.done&&m.d.slice(0,7)==='2026-09').length,0);
 const avg=Math.round(CASAS.reduce((a,c)=>a+cRate(c),0)/CASAS.length),prev=Math.round(CASAS.reduce((a,c)=>a+cPrev(c),0)/CASAS.length);
 const req=CASAS.reduce((a,c)=>a+c.req.length,0);
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Casas de Apascentamento</h1><p class="lede">${CASAS.length} casas ativas${req?` · <b>${req} ${req>1?'pedidos':'pedido'} para entrar</b> aguardando`:''}</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="hexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="hexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="a lista de casas">Lista de casas</button><button class="pi" data-a="export" data-v="os participantes de todas as casas">Participantes de todas as casas</button><button class="pi" data-a="export" data-v="o relatório de presença">Relatório de presença</button></div></div>
  <button class="btn pri" data-a="hAdd">${ic('plus',15,2.2)}Nova casa</button></div></header>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Casas</span><span class="kv">${CASAS.length}</span><span class="kd">${CASAS.filter(c=>c.min).length} ligadas a ministérios</span></div>
  <div class="k4"><span class="kl">Participantes</span><span class="kv">${tot}</span><span class="kd up">+8 este mês</span></div>
  <div class="k4"><span class="kl">Encontros em setembro</span><span class="kv">${sep}</span><span class="kd">em ${CASAS.length} casas</span></div>
  <div class="k4"><span class="kl">Presença média</span><span class="kv">${avg}%</span><span class="kd ${avg>=prev?'up':''}">${avg>=prev?'+':''}${avg-prev} p.p. vs. mês anterior</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="hq" placeholder="Buscar por casa, líder ou bairro" value="${esc(S.hq)}" autocomplete="off"></label>
   <div style="position:relative"><button class="btn sec sel" data-a="hminMenu">${S.hmin==='todos'?'Todos os ministérios':S.hmin==='geral'?'Casas gerais':S.hmin}${ic('updown',14)}</button>
    <div class="pop" id="hminPop" style="left:0;top:calc(100% + 6px)">${[['todos','Todos os ministérios'],['geral','Casas gerais (sem ministério)'],...HMIN.map(m=>[m,m])].map(o=>`<button class="pi" data-a="hMin" data-v="${o[0]}">${o[1]}${S.hmin===o[0]?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div></div>
  <div id="hrows">${hRows()}</div>
 </section>`;
}
function hRows(){
 const q=norm(S.hq);const l=CASAS.filter(c=>(S.hmin==='todos'||(S.hmin==='geral'?!c.min:c.min===S.hmin))&&(!q||norm(c.n+' '+c.leader+' '+c.addr).includes(q)));
 if(!l.length)return `<div class="mempty"><p>Nenhuma casa encontrada.</p><span>Tente outro termo ou ministério.</span></div>`;
 return `<div class="trow hs thead"><span>Casa</span><span>Líder</span><span>Participantes</span><span>Presença</span><span>Último encontro</span><span></span></div>
 ${l.map(c=>{const lm=lastMeet(c),ago_=lm?-inDays(lm.d):0,r=cRate(c);return `<div class="trow hs" tabindex="0" data-a="hOpen" data-v="${c.id}">
  <span class="tn">${hTile(c)}<span class="hn"><b>${esc(c.n)}</b>${c.min?`<span>Ministério de ${c.min}</span>`:`<span>${esc(c.addr.split('— ')[1]||'')}</span>`}</span></span>
  <span class="hl">${pv({n:c.leader,tone:c.tone})}${esc(c.leader)}</span>
  <span class="hp"><b>${c.ppl.length}</b>${c.req.length?`<em class="tag warn">+${c.req.length} pedido${c.req.length>1?'s':''}</em>`:''}</span>
  <span class="hr">${spark6(c)}<b>${r}%</b></span>
  <span class="hlast">${lm?`<span>${dmy(lm.d)}</span><span class="${ago_>14?'late':''}">há ${ago_} dias</span>`:'<span class="soft">Nenhum ainda</span>'}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
 <div class="tfoot"><span>${l.length} ${l.length>1?'casas encontradas':'casa encontrada'}</span></div>`;
}

/* ---------- detail ---------- */
function casaDetail(){
 const c=hById(S.casa);if(!c){S.casa=null;return casasList();}
 const lm=lastMeet(c),r=cRate(c),pr=cPrev(c);
 return `<nav class="crumb rise"><span class="soft">Comunidade</span>${ic('chevR',13,2)}<button class="lnk back" data-a="hBack">Casas de Apascentamento</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${hTile(c,64)}<div class="pn"><h1>${esc(c.n)}</h1><p>Líder: ${esc(c.leader)} · ${c.ppl.length} participantes${c.min?` · Ministério de ${c.min}`:''}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="export" data-v="o relatório da ${esc(c.n)}">${ic('share',15)}Relatório</button>
   <div style="position:relative"><button class="ibtn" data-a="hMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="hPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="hDel">${ic('x',17)}Excluir casa</button></div></div></div>
  <div class="ikpi hk">
   <div><b>${c.ppl.length}</b><span>Participantes</span></div><div><b>${c.total}</b><span>Encontros</span></div>
   <div><b>${r}%</b><span>Presença média <em class="${r>=pr?'up':'dn'}">${r>=pr?'↑':'↓'} ${Math.abs(r-pr)} p.p.</em></span></div><div><b>${lm?fmtD(lm.d):'—'}</b><span>Último encontro</span></div>
  </div>
  <div class="ptabs" role="tablist">${[['geral','Visão geral'],['part','Participantes'],['enc','Encontros']].map(t=>`<button role="tab" class="${S.ctab===t[0]?'on':''}" data-a="hTab" data-v="${t[0]}">${t[1]}${t[0]==='part'&&c.req.length?`<small class="warn">${c.req.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="htb" class="rise" style="--d:2">${hTabBody(c)}</div>`;
}
function hTabBody(c){if(S.ctab==='enc'&&S.chamada)return hChamada(c);return ({geral:hGeral,part:hPart,enc:hEnc})[S.ctab](c);}
const HSECS={
 lid:{t:'Liderança',f:[['leader','Líder','person'],['host','Anfitrião','person']]},
 loc:{t:'Local e contato',f:[['addr','Endereço','text'],['phone','Telefone','tel']]},
 min:{t:'Ministério responsável',f:[['min','Ministério','min','Diz para qual público a casa é voltada e ajuda a filtrar a lista.']]},
};
function hGeral(c){
 const ms=c.meets.filter(m=>m.done).slice(0,8).reverse();
 return `<div class="pgrid"><div class="col">${['lid','loc','min'].map(k=>{const s=HSECS[k],ed=S.hedit===k;return `<section class="card pc sec ${ed?'editing':''}" id="hsec-${k}"><div class="sh"><h2>${s.t}</h2>${ed?'':`<button class="btn sec sm" data-a="hEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" data-hsec="${k}" novalidate style="grid-template-columns:1fr 1fr">${s.f.map(f=>hField(c,f)).join('')}<div class="dfoot"><button type="button" class="btn sec" data-a="hCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid2">${s.f.map(f=>{const v=c[f[0]];return `<div><dt>${f[1]}</dt><dd>${!v?`<span class="soft">${f[0]==='min'?'Nenhum — casa geral da igreja':'Não informado'}</span>`:f[0]==='addr'?`${esc(v)}<br><a class="lnk" style="padding:4px 0 0" href="https://www.google.com/maps/search/${encodeURIComponent(v)}" target="_blank" rel="noopener">${ic('pin',13)}Ver no mapa</a>`:f[2]==='person'?`<span class="cresp">${pv(c.ppl.find(p=>p.n===v)||{n:v,tone:c.tone})}${esc(v)}</span>`:esc(f[0]==='min'?'Ministério de '+v:v)}</dd></div>`;}).join('')}</dl>`}</section>`;}).join('')}</div>
  <div class="col"><section class="card pc"><div class="sh"><h2>Presença</h2><span class="who">últimos ${ms.length} encontros</span></div>
   <div class="hbars">${ms.map(m=>{const r=mRate(c,m);return `<div class="hb" title="${fmtD(m.d)}: ${c.ppl.filter(p=>m.pres[p.id]).length} de ${c.ppl.length}"><span class="hbv">${r}%</span><span class="hbt"><i style="height:${r}%"></i></span><span class="hbl">${fmtD(m.d).replace(' ',' ')}</span></div>`;}).join('')}</div>
   <p class="who" style="margin:14px 0 0">Média de <b>${cRate(c)}%</b> no último mês${c.req.length?` · <button class="lnk inl" data-a="hTab" data-v="part">${c.req.length} ${c.req.length>1?'pedidos':'pedido'} para entrar</button>`:''}</p></section>
   <section class="card pc"><div class="sh"><h2>Quem mais faltou</h2><span class="who">últimos 4</span></div>${(()=>{const l4=c.meets.filter(m=>m.done).slice(0,4);const aus=c.ppl.map(p=>({p,n:l4.filter(m=>!m.pres[p.id]).length})).filter(x=>x.n>=2).sort((a,b)=>b.n-a.n).slice(0,4);return aus.length?`<ol class="late">${aus.map(x=>`<li><div class="lt" style="cursor:default">${pv(x.p)}<span><b>${esc(x.p.n)}</b><span>${x.p.role}</span></span><em>${x.n} faltas</em></div></li>`).join('')}</ol>`:'<p class="who" style="margin:0">Ninguém com 2 ou mais faltas seguidas.</p>';})()}</section></div></div>`;
}
function hField(c,f){const id='hf-'+f[0],v=c[f[0]]||'';
 if(f[2]==='person')return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="${f[0]}">${c.ppl.map(p=>`<option ${p.n===v?'selected':''}>${esc(p.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;
 if(f[2]==='min')return `<label class="fld wide" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="min"><option value="">Nenhum — casa geral da igreja</option>${HMIN.map(m=>`<option ${m===v?'selected':''}>${m}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">${f[3]}</span></label>`;
 return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><input id="${id}" name="${f[0]}" type="${f[2]}" value="${esc(v)}"><span class="err"></span></label>`;}
function hPart(c){
 const l4=c.meets.filter(m=>m.done).slice(0,6).reverse();const ord={'Líder':0,'Anfitrião':1,'Participante':2};
 return `${c.req.length?`<section class="card pc reqs"><div class="sh"><h2>Pedidos para entrar</h2><span class="who">${c.req.length}</span></div>${c.req.map((r,i)=>`<div class="req">${pv(r)}<span class="rq"><b>${esc(r.n)}</b><span>pediu pelo app em ${dmy(r.d)}</span></span><button class="btn ghostd sm" data-a="hReject" data-v="${i}">Recusar</button><button class="btn pri sm" data-a="hAccept" data-v="${i}">Aceitar</button></div>`).join('')}</section>`:''}
 <section class="card mtab" style="${c.req.length?'margin-top:16px':''}"><div class="tbar"><span class="who" style="margin-right:auto"><b style="color:var(--ink)">${c.ppl.length}</b> participantes</span><button class="btn pri sm" data-a="hAddP">${ic('plus',14,2.2)}Adicionar participante</button></div>
  <div class="trow hpp thead"><span>Nome</span><span>Papel</span><span>Desde</span><span>Presença recente</span><span></span></div>
  ${c.ppl.slice().sort((a,b)=>ord[a.role]-ord[b.role]).map(p=>`<div class="trow hpp"><span class="tn">${pv(p)}<span><b>${esc(p.n)}</b></span></span>
   <span class="hrole"><span class="stp" style="--c:${p.role==='Líder'?'var(--st-ace)':p.role==='Anfitrião'?'var(--st-int)':'var(--ink-muted)'};--b:${p.role==='Líder'?'var(--st-ace-bg)':p.role==='Anfitrião'?'var(--st-int-bg)':'var(--surface-2)'}"><i></i>${p.role}</span></span>
   <span class="hsince">${p.since}</span>
   <span class="hdots">${l4.map(m=>`<i class="${m.pres[p.id]?'on':''}" title="${fmtD(m.d)}: ${m.pres[p.id]?'presente':'ausente'}"></i>`).join('')}</span>
   <span class="hact">${p.role==='Participante'?`<button class="ibtn sm" data-a="hRemP" data-v="${p.id}" aria-label="Remover da casa" title="Remover da casa">${ic('x',14)}</button>`:''}</span></div>`).join('')}
 </section>`;
}
function hEnc(c){
 const ms=c.meets.slice().sort((a,b)=>a.d<b.d?1:-1);
 return `<section class="card pc"><div class="sh"><h2>Encontros</h2><span class="who">${c.total} no total</span></div>
  <form class="newm" id="nmF"><label class="fld"><span class="fl">Novo encontro</span><input type="date" name="d" id="nmD" max="${addDays(30)}"></label><button class="btn pri" id="nmB" type="submit" disabled>Criar e fazer chamada</button></form>
  <div class="trow hm thead"><span>Data</span><span>Descrição</span><span>Presença</span><span></span></div>
  ${ms.map(m=>{const n=c.ppl.filter(p=>m.pres[p.id]).length,r=mRate(c,m);return `<div class="trow hm"><span class="hmd"><b>${fmtD(m.d)}</b><span>${wd(m.d)}</span></span>
   <span class="hmx"><span>${m.desc?esc(m.desc):'<span class="soft">Sem descrição</span>'}</span>${m.mat?`<span class="mat">${ic('book',12)}${esc(m.mat)}</span>`:''}</span>
   <span class="hmp">${m.done?`<span class="tr"><i style="width:${r}%"></i></span><span><b>${n}</b>/${c.ppl.length}</span>`:'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Chamada pendente</span>'}</span>
   <span class="hma"><button class="btn ${m.done?'sec':'pri'} sm" data-a="hCall" data-v="${m.id}">Chamada</button><button class="ibtn sm" data-a="hDelM" data-v="${m.id}" aria-label="Excluir encontro" title="Excluir encontro">${ic('x',14)}</button></span></div>`;}).join('')}
 </section>`;
}
function hChamada(c){
 const m=c.meets.find(x=>x.id===S.chamada);const n=c.ppl.filter(p=>m.pres[p.id]).length;
 return `<section class="card pc chm"><div class="sh"><div style="display:flex;align-items:center;gap:10px"><button class="ibtn sm" data-a="hCallBack" aria-label="Voltar">${ic('chevL',16,2)}</button><h2>Chamada · ${wd(m.d)}, ${fmtD(m.d)}</h2></div><span class="who" id="chCnt"><b>${n}</b> de ${c.ppl.length} presentes</span></div>
  <form id="chF" class="fgrid" style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Como foi o encontro? <small>opcional</small></span><textarea class="ta" name="desc" rows="3" placeholder="Tema, destaques, pedidos">${esc(m.desc)}</textarea></label>
   <label class="fld"><span class="fl">Material de apoio <small>opcional</small></span><span class="selw"><select name="mat"><option value="">Nenhum</option>${['Frutos do Espírito · cap. 3','O Sermão do Monte','Parábolas de Jesus','Vida em comunidade'].map(x=>`<option ${m.mat===x?'selected':''}>${x}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Fica visível para os participantes no app. Cadastrado em Conteúdo › Material de apoio.</span></label>
   <div class="wide chl"><div class="chh"><span class="fl">Participantes</span><button type="button" class="lnk" data-a="hAllP">Marcar todos presentes</button></div>
    ${c.ppl.map(p=>`<div class="chr ${m.pres[p.id]?'on':''}" data-p="${p.id}">${pv(p)}<span class="chn"><b>${esc(p.n)}</b><span>${p.role}</span></span>
     <input class="why" name="why-${p.id}" placeholder="Motivo da ausência (opcional)" value="${esc(m.why[p.id]||'')}">
     <label class="chk"><input type="checkbox" name="p-${p.id}" ${m.pres[p.id]?'checked':''}><span>${ic('check',14,2.6)}</span>Presente</label></div>`).join('')}</div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="hCallBack">Cancelar</button><button type="submit" class="btn pri">Salvar chamada</button></div></form></section>`;
}

function casasAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#hq');if(q)q.addEventListener('input',e=>{S.hq=e.target.value;$('#hrows').innerHTML=hRows();});
 $$('form[data-hsec]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),fd=new FormData(f),k=f.dataset.hsec,b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{HSECS[k].f.forEach(x=>{if(fd.has(x[0]))c[x[0]]=fd.get(x[0]);});S.hedit=null;render();toast(`${HSECS[k].t} atualizado`);},700);}));
 const d=$('#nmD');if(d)d.addEventListener('input',()=>{$('#nmB').disabled=!d.value;});
 const nm=$('#nmF');if(nm)nm.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),v=d.value;if(c.meets.some(m=>m.d===v)){toast('Já existe um encontro nessa data');return;}const m={id:c.id+'e'+Date.now(),d:v,desc:'',mat:'',pres:{},why:{},done:false};c.meets.unshift(m);c.total++;S.chamada=m.id;reH();});
 const ch=$('#chF');if(ch){const upd=()=>{const n=$$('.chr input[type=checkbox]').filter(x=>x.checked).length;$('#chCnt').innerHTML=`<b>${n}</b> de ${hById(S.casa).ppl.length} presentes`;};
  ch.addEventListener('change',e=>{if(e.target.type==='checkbox'){e.target.closest('.chr').classList.toggle('on',e.target.checked);upd();}});
  ch.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),m=c.meets.find(x=>x.id===S.chamada),fd=new FormData(ch),b=ch.querySelector('[type=submit]');b.classList.add('busy');
   setTimeout(()=>{m.desc=fd.get('desc').trim();m.mat=fd.get('mat');c.ppl.forEach(p=>{m.pres[p.id]=fd.has('p-'+p.id);m.why[p.id]=m.pres[p.id]?'':fd.get('why-'+p.id)||'';});const was=m.done;m.done=true;S.chamada=null;render();toast(`Chamada salva · ${c.ppl.filter(p=>m.pres[p.id]).length} de ${c.ppl.length} presentes`);},700);});}
}
function reH(){const c=hById(S.casa);$('#htb').innerHTML=hTabBody(c);$$('.ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.ctab));tabInd();casasAfter();}
const HA={
 hexpMenu:()=>{const p=$('#hexpPop');closePops(p);p.classList.toggle('open');},
 hminMenu:()=>{const p=$('#hminPop');closePops(p);p.classList.toggle('open');},
 hMin:v=>{S.hmin=v;closePops();render();},
 hMenu:()=>{const p=$('#hPop');closePops(p);p.classList.toggle('open');},
 hOpen:v=>{S.casa=v;S.ctab='geral';S.chamada=null;S.hedit=null;render();window.scrollTo({top:0});},
 hBack:()=>{S.casa=null;render();},
 hTab:v=>{S.ctab=v;S.chamada=null;S.hedit=null;reH();},
 hEdit:v=>{S.hedit=v;reH();},
 hCancel:()=>{S.hedit=null;reH();},
 hCall:v=>{S.chamada=v;reH();$('#htb').scrollIntoView({behavior:'smooth',block:'start'});},
 hCallBack:()=>{const c=hById(S.casa),m=c.meets.find(x=>x.id===S.chamada);if(m&&!m.done){c.meets.splice(c.meets.indexOf(m),1);c.total--;}S.chamada=null;reH();},
 hAllP:()=>{$$('.chr input[type=checkbox]').forEach(x=>{x.checked=true;x.closest('.chr').classList.add('on');});$('#chCnt').innerHTML=`<b>${hById(S.casa).ppl.length}</b> de ${hById(S.casa).ppl.length} presentes`;},
 hDelM:v=>{const c=hById(S.casa),i=c.meets.findIndex(m=>m.id===v),m=c.meets[i];confirmDel({title:`Excluir o encontro de ${fmtD(m.d)}?`,body:'A chamada e a descrição deste encontro serão apagadas e a presença média será recalculada.',label:'Excluir encontro',onConfirm:()=>{c.meets.splice(i,1);c.total--;render();toast('Encontro excluído',()=>{c.meets.splice(i,0,m);c.total++;render();});}});},
 hAccept:v=>{const c=hById(S.casa),r=c.req.splice(+v,1)[0];c.ppl.push({id:c.id+'p'+Date.now(),n:r.n,tone:r.tone,role:'Participante',since:'set/2026'});render();toast(`${r.n.split(' ')[0]} agora participa da ${c.n.split(' — ')[0]}`);},
 hReject:v=>{const c=hById(S.casa),r=c.req[+v];confirmDel({title:`Recusar o pedido de ${r.n.split(' ')[0]}?`,body:'A pessoa é avisada pelo app e pode escolher outra casa.',label:'Recusar pedido',onConfirm:()=>{c.req.splice(+v,1);render();toast('Pedido recusado');}});},
 hRemP:v=>{const c=hById(S.casa),i=c.ppl.findIndex(p=>p.id===v),p=c.ppl[i];confirmDel({title:`Remover ${p.n.split(' ')[0]} da casa?`,body:`${p.n} deixa de aparecer na chamada. O histórico de presença é mantido.`,label:'Remover',onConfirm:()=>{c.ppl.splice(i,1);render();toast(`${p.n.split(' ')[0]} removido(a)`,()=>{c.ppl.splice(i,0,p);render();});}});},
 hAddP:()=>{const c=hById(S.casa),cand=MEMBERS.filter(m=>!c.ppl.some(p=>p.n===m.n));openDlg(`${dlgHead('Adicionar participante',`Quem vai participar da ${c.n}?`)}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="hpq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="hpick">${candList(cand,'')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="hDoAddP">Adicionar</button></div>`,'sm');
  $('#hpq').addEventListener('input',e=>{$('#hpick').innerHTML=candList(cand,e.target.value);});},
 hDoAddP:(v,b)=>{const s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const m=byId(s.value),c=hById(S.casa);b.classList.add('busy');setTimeout(()=>{c.ppl.push({id:c.id+'p'+Date.now(),n:m.n,tone:m.tone,role:'Participante',since:'set/2026'});closeDlg();render();toast(`${m.n.split(' ')[0]} adicionado(a) à casa`);},600);},
 hDel:()=>{closePops();const c=hById(S.casa);confirmDel({title:`Excluir ${c.n}?`,body:`Os ${c.ppl.length} participantes ficam sem casa e os ${c.total} encontros registrados são apagados. Esta ação não pode ser desfeita.`,label:'Excluir casa',typed:c.n.split(' — ')[0],onConfirm:()=>{CASAS.splice(CASAS.indexOf(c),1);S.casa=null;render();toast(`${c.n} excluída`);}});},
 hAdd:()=>{const leaders=MEMBERS.filter(m=>m.tit);openDlg(`${dlgHead('Nova casa','Os participantes podem ser adicionados depois.')}
  <form class="fgrid" id="haF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome da casa</span><input name="n" placeholder="Ex.: Casa Norte — Santana" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Líder</span><span class="selw"><select name="leader">${leaders.map(m=>`<option>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Anfitrião</span><span class="selw"><select name="host">${leaders.map((m,i)=>`<option ${i===2?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld wide"><span class="fl">Endereço</span><input name="addr" placeholder="Rua, número — Bairro, Cidade/UF" autocomplete="off"></label>
   <label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="phone" type="tel" inputmode="tel" placeholder="(11) 90000-0000"></label>
   <label class="fld"><span class="fl">Ministério <small>opcional</small></span><span class="selw"><select name="min"><option value="">Nenhum — casa geral</option>${HMIN.map(m=>`<option>${m}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <p class="hint wide" style="margin:-6px 0 0">O ministério diz para qual público a casa é voltada. Uma casa do Ministério de Jovens fica fácil de filtrar na lista.</p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar casa</button></div></form>`);
  const f=$('#haF'),ph=f.querySelector('[name=phone]');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),i=f.querySelector('[name=n]');const bad=m=>{i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;i.focus();};
   if(!n)return bad('Dê um nome à casa');if(CASAS.some(c=>norm(c.n)===norm(n)))return bad('Já existe uma casa com esse nome');if(fd.get('leader')===fd.get('host')&&false)return;
   const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const c=mkCasa(n,fd.get('leader'),fd.get('host'),2,0,TODAY.toISOString().slice(0,10),{addr:fd.get('addr'),phone:fd.get('phone'),min:fd.get('min')});c.meets=[];c.total=0;CASAS.push(c);closeDlg();S.casa=c.id;S.ctab='geral';render();toast(`${n} criada`);},800);});},
};
(()=>{const c=CASAS[0],m=c.meets[0],pl=c.ppl[1],mo=c.ppl[4];m.pres[c.ppl[0].id]=true;m.pres[pl.id]=false;m.why[pl.id]='Viagem a trabalho';m.pres[mo.id]=false;m.pres[c.ppl[2].id]=true;m.pres[c.ppl[3].id]=true;})();

/* ================= Comunidade › Redes de célula ================= */
let _rid=0;
const RD=(n,sup,tone,casas)=>({id:'r'+(++_rid),n,sup,tone,casas});
const REDES=[RD('Rede Norte','Rodrigo Alves','ceu',['h1','h5']),RD('Rede Sul','Camila Duarte','damasco',['h2']),RD('Rede Leste/Oeste','Diego Martins','lima',['h3','h4'])];
const rById=id=>REDES.find(r=>r.id===id);
const casaRede=hid=>REDES.find(r=>r.casas.includes(hid));
function redesList(){
 const q=norm(S.rq||'');const loose=CASAS.filter(c=>!casaRede(c.id));
 const l=REDES.filter(r=>!q||norm(r.n+' '+r.sup+' '+r.casas.map(h=>hById(h)?.n||'').join(' ')).includes(q));
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Redes de célula</h1><p class="lede">Hierarquia de supervisão: supervisor › líder › casa</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="rexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="rexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="as redes de célula">Redes e casas</button></div></div>
  <button class="btn pri" data-a="rAdd">${ic('plus',15,2.2)}Nova rede</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Redes</span><span class="kv">${REDES.length}</span><span class="kd">${REDES.length} supervisores</span></div>
  <div class="k4"><span class="kl">Casas vinculadas</span><span class="kv">${CASAS.length-loose.length}<small class="kof"> de ${CASAS.length}</small></span><span class="kmeter"><i style="width:${Math.round((CASAS.length-loose.length)/CASAS.length*100)}%"></i></span></div>
  <div class="k4"><span class="kl">Pessoas nas redes</span><span class="kv">${REDES.reduce((a,r)=>a+r.casas.reduce((b,h)=>b+(hById(h)?.ppl.length||0),0),0)}</span><span class="kd">participantes das casas</span></div>
 </section>
 ${loose.length?`<div class="dupn rise" style="--d:2"><span class="dd"></span><span><b>${loose.length} ${loose.length>1?'casas sem rede':'casa sem rede'}</b> · ${loose.map(c=>esc(c.n)).join(', ')}</span></div>`:''}
 <label class="sbox rise" style="--d:2;max-width:360px">${ic('search',16)}<input id="rq" placeholder="Buscar rede, supervisor ou casa" value="${esc(S.rq||'')}" autocomplete="off"></label>
 <div class="rgrid2 rise" style="--d:3" id="rrows">${l.length?l.map(rCard).join(''):'<div class="card mempty" style="grid-column:1/-1"><p>Nenhuma rede encontrada.</p></div>'}</div>`;
}
function rCard(r){
 const cs=r.casas.map(hById).filter(Boolean),ppl=cs.reduce((a,c)=>a+c.ppl.length,0),avg=cs.length?Math.round(cs.reduce((a,c)=>a+cRate(c),0)/cs.length):0;
 return `<article class="card rc">
  <div class="rc1"><div><b>${esc(r.n)}</b><span>${cs.length} ${cs.length===1?'casa':'casas'} · ${ppl} pessoas${cs.length?` · presença ${avg}%`:''}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="rMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rEdit" data-v="${r.id}">${ic('pen',16)}Editar rede</button><hr><button class="pi danger" data-a="rDel" data-v="${r.id}">${ic('x',16)}Excluir rede</button></div></div></div>
  <div class="rtree">
   <div class="rsup"><span class="av" style="background:var(--tone-${r.tone});color:var(--tone-${r.tone}-ink)">${initials(r.sup)}</span><span><b>${esc(r.sup)}</b><small>Supervisor</small></span></div>
   ${cs.length?`<ul>${cs.map(c=>`<li><button class="rcasa" data-a="rGoCasa" data-v="${c.id}">${hTile(c,30)}<span class="rct"><b>${esc(c.n)}</b><small>${esc(c.leader)} · ${c.ppl.length} pessoas</small></span><span class="rpc">${cRate(c)}%</span></button></li>`).join('')}</ul>`:`<p class="who" style="margin:10px 0 0 44px">Nenhuma casa vinculada.</p>`}
  </div>
  <button class="btn sec sm" data-a="rEdit" data-v="${r.id}" style="align-self:flex-start">${ic('plus',14,2.2)}Vincular casas</button>
 </article>`;
}
function rForm(r){
 const leaders=MEMBERS.filter(m=>m.tit);
 return `<form class="fgrid one" id="rF" novalidate>
  <label class="fld"><span class="fl">Nome da rede</span><input name="n" value="${esc(r?r.n:'')}" placeholder="Ex.: Rede Centro" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Supervisor</span><span class="selw"><select name="sup">${[...new Set([...(r?[r.sup]:[]),...leaders.map(m=>m.n)])].map(n=>`<option ${r&&r.sup===n?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Precisa ser um membro cadastrado.</span></label>
  <div class="fld"><span class="fl">Casas vinculadas <small>opcional</small></span><div class="cpick">${CASAS.map(c=>{const o=casaRede(c.id),mine=r&&o===r;return `<label class="${o&&!mine?'taken':''}"><input type="checkbox" name="casa" value="${c.id}" ${mine?'checked':''}>${hTile(c,26)}<span><b>${esc(c.n)}</b><small>${o&&!mine?'Hoje em '+esc(o.n)+' · será movida':esc(c.leader)}</small></span><i class="cb">${ic('check',12,2.8)}</i></label>`;}).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${r?'Salvar':'Criar rede'}</button></div></form>`;
}
function rBind(r){const f=$('#rF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),i=f.querySelector('[name=n]');
  if(!n){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome à rede';i.focus();return;}
  if(REDES.some(x=>x!==r&&norm(x.n)===norm(n))){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Já existe uma rede com esse nome';i.focus();return;}
  const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const sel=fd.getAll('casa');REDES.forEach(x=>{x.casas=x.casas.filter(h=>!sel.includes(h));});
   if(r){r.n=n;r.sup=fd.get('sup');r.casas=sel;}else REDES.push(RD(n,fd.get('sup'),TONES[REDES.length%6],sel));closeDlg();render();toast(r?`${n} atualizada`:`${n} criada`);},700);});}

/* ================= Comunidade › Ministérios ================= */
let _mnid=0;
const MN=(n,lead,mem,teams,o={})=>({id:'mn'+(++_mnid),n,lead,mem,tone:o.tone||TONES[_mnid%6],icon:o.icon||'users',active:o.active!==false,phone:o.phone||'(11) 9'+(9200+_mnid*37)+'-'+(1000+_mnid*53),desc:o.desc||'',photo:'',teams:(o.teams||['Domingo manhã','Domingo noite','Eventos especiais','Apoio'].slice(0,teams).map((t,i)=>[t,HPOOL[(_mnid*3+i)%HPOOL.length],Math.max(1,Math.round(mem/teams)-(i%2))])).map(t=>({n:t[0],lead:t[1],m:t[2]})),resp:o.resp||[],content:o.content||[],teamsN:teams});
const MINIS=[
 MN('Jovens e Adolescentes','Isabela Rocha',22,3,{icon:'sprout',tone:'lima',desc:'Encontros, discipulado e atividades para adolescentes e jovens.',teams:[['Adolescentes','Gabriel Souza',9],['Jovens','Isabela Rocha',10],['Louvor jovem','Lucas Mendes',3]],resp:['Culto de jovens aos sábados','Retiro anual','Acompanhamento de novos convertidos'],content:[['Curso','O que é a fé'],['Material','Guia do líder de célula jovem']]}),
 MN('Eventos','Diego Martins',10,2,{icon:'ticket',tone:'damasco'}),
 MN('Homens','Ricardo Santos',16,2,{icon:'users',tone:'ceu'}),
 MN('Cafeteria','Camila Sousa',9,1,{icon:'coffee',tone:'damasco'}),
 MN('Zeladoria','Bruno Carvalho',6,1,{icon:'bucket',tone:'salvia'}),
 MN('Cozinha','Mônica Souza',11,2,{icon:'chef',tone:'rosado'}),
 MN('Voluntariado','Larissa Pinto Rocha',14,1,{icon:'hand',tone:'menta'}),
 MN('Louvor','Ana Clara Lima',24,3,{icon:'music',tone:'ceu'}),
 MN('Ceia','Cláudia Ferraz',8,1,{icon:'wine',tone:'rosado'}),
 MN('Integração','Carlos Eduardo Silva',12,2,{icon:'userplus',tone:'lima'}),
 MN('Kids','Marina Costa',18,3,{icon:'baby',tone:'damasco'}),
 MN('Mulheres','Patrícia Lima',15,2,{icon:'heart',tone:'rosado'}),
 MN('Casais','Fernanda Alves Melo',12,1,{icon:'heart',tone:'menta'}),
 MN('Intercessão','Renata Campos',9,1,{icon:'hands',tone:'salvia'}),
 MN('Recepção','Felipe Andrade',13,2,{icon:'door',tone:'ceu'}),
 MN('Mídia','Diego Faria',8,2,{icon:'camera',tone:'lima'}),
 MN('Comunicação','Patrícia Oliveira Nunes',6,1,{icon:'megaphone',tone:'damasco'}),
 MN('Diaconia','Larissa Pires',10,2,{icon:'shield',tone:'menta'}),
 MN('Missões','Thiago Barros',7,1,{icon:'pin',tone:'ceu'}),
 MN('Teatro','Juliana Prado',8,1,{icon:'sparkle',tone:'rosado'}),
];
const CONTENT={Curso:['O que é a fé','Fundamentos da vida cristã','Vida de oração','Liderança servidora'],Pregação:['Série: Frutos do Espírito','Série: Sermão do Monte','Culto de jovens · 20/09'],Música:['Grande é o Senhor','Aclame ao Senhor','Te louvarei'],Material:['Guia do líder de célula jovem','Estudo: Parábolas de Jesus','Apostila de integração']};
const CTYPE_IC={Curso:'award',Pregação:'play',Música:'music',Material:'book'};
Object.assign(S,{mini:null,mtab:'det',mnq:'',mnf:'ativos',mnedit:null});
const mnById=id=>MINIS.find(m=>m.id===id);
const mTile=(m,s=36)=>`<span class="htile" style="--s:${s}px;background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${ic(m.icon,Math.round(s*.47),1.9)}</span>`;
const tCount=m=>m.teams.length||m.teamsN;
function minisList(){
 const act=MINIS.filter(m=>m.active),mem=act.reduce((a,m)=>a+m.mem,0),teams=act.reduce((a,m)=>a+tCount(m),0),max=Math.max(...MINIS.map(m=>m.mem));
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Ministérios</h1><p class="lede">${act.length} ministérios ativos</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="mnexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="mnexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="a lista de ministérios">Lista de ministérios</button><button class="pi" data-a="export" data-v="os membros de todos os ministérios">Membros por ministério</button></div></div>
  <button class="btn pri" data-a="mnAdd">${ic('plus',15,2.2)}Novo ministério</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Ministérios</span><span class="kv">${act.length}</span><span class="kd">${MINIS.length-act.length} inativo${MINIS.length-act.length===1?'':'s'}</span></div>
  <div class="k4"><span class="kl">Membros vinculados</span><span class="kv">${mem}</span><span class="kd">média de ${Math.round(mem/act.length)} por ministério</span></div>
  <div class="k4"><span class="kl">Times ativos</span><span class="kv">${teams}</span><span class="kd">em ${act.length} ministérios</span></div>
 </section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="mnq" placeholder="Buscar ministério ou líder" value="${esc(S.mnq)}" autocomplete="off"></label>
  <div class="chips">${[['ativos','Ativos',act.length],['inativos','Inativos',MINIS.length-act.length],['todos','Todos',MINIS.length]].map(c=>`<button class="chipf ${S.mnf===c[0]?'on':''}" data-a="mnFilter" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="mnrows">${mnRows(max)}</div></section>`;
}
function mnRows(max){
 max=max||Math.max(...MINIS.map(m=>m.mem));const q=norm(S.mnq);
 const l=MINIS.filter(m=>(S.mnf==='todos'||(S.mnf==='ativos')===m.active)&&(!q||norm(m.n+' '+m.lead).includes(q))).sort((a,b)=>b.mem-a.mem);
 if(!l.length)return `<div class="mempty"><p>Nenhum ministério.</p><span>Nada corresponde a esse filtro.</span></div>`;
 return `<div class="trow mn thead"><span>Ministério</span><span>Líder</span><span>Membros</span><span>Times</span><span>Status</span><span></span></div>
 ${l.map(m=>`<div class="trow mn ${m.active?'':'off'}" tabindex="0" data-a="mnOpen" data-v="${m.id}"><span class="tn">${mTile(m)}<span class="hn"><b>${esc(m.n)}</b><span>Ministério de ${esc(m.n)}</span></span></span>
  <span class="hl"><span class="av" style="background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${initials(m.lead)}</span>${esc(m.lead)}</span>
  <span class="mnm"><span class="tr"><i style="width:${Math.round(m.mem/max*100)}%"></i></span><b>${m.mem}</b></span>
  <span class="mnt"><b>${tCount(m)}</b> ${tCount(m)===1?'time':'times'}</span>
  <span class="ts">${m.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>'}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`).join('')}
 <div class="tfoot"><span>${l.length} ministérios</span></div>`;
}
function miniDetail(){
 const m=mnById(S.mini);if(!m){S.mini=null;return minisList();}
 return `<nav class="crumb rise"><span class="soft">Comunidade</span>${ic('chevR',13,2)}<button class="lnk back" data-a="mnBack">Ministérios</button>${ic('chevR',13,2)}<span>${esc(m.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${mTile(m,64)}<div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>Ministério de ${esc(m.n)}</h1>${m.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>'}</div><p>Líder: ${esc(m.lead)} · ${m.mem} membros · ${tCount(m)} ${tCount(m)===1?'time':'times'}</p></div></div>
  <div class="pact"><div style="position:relative"><button class="ibtn" data-a="mnMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="mnPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="mnToggle">${ic(m.active?'pause':'check',17)}${m.active?'Inativar ministério':'Reativar ministério'}</button><hr><button class="pi danger" data-a="mnDel">${ic('x',17)}Excluir ministério</button></div></div></div>
  <div class="ptabs" role="tablist">${[['det','Detalhes'],['times','Times',m.teams.length],['resp','Responsabilidades',m.resp.length],['cont','Conteúdo',m.content.length]].map(t=>`<button role="tab" class="${S.mtab===t[0]?'on':''}" data-a="mnTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="mntb" class="rise" style="--d:2">${mnTabBody(m)}</div>`;
}
function mnTabBody(m){return ({det:mnDet,times:mnTimes,resp:mnResp,cont:mnCont})[S.mtab](m);}
function mnDet(m){const ed=S.mnedit;
 return `<div class="pgrid"><div class="col"><section class="card pc sec ${ed?'editing':''}"><div class="sh"><h2>Informações</h2>${ed?'':`<button class="btn sec sm" data-a="mnEdit">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" id="mnF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Líder</span><span class="selw"><select name="lead">${[...new Set([m.lead,...MEMBERS.filter(x=>x.tit).map(x=>x.n)])].map(n=>`<option ${n===m.lead?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Precisa ser um membro cadastrado.</span></label>
   <label class="fld"><span class="fl">Telefone</span><input name="phone" type="tel" value="${esc(m.phone)}"></label>
   <label class="fld wide"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="3" placeholder="Para que serve este ministério">${esc(m.desc)}</textarea></label>
   <label class="fld wide"><span class="fl">Foto <small>opcional</small></span><input name="photo" type="url" placeholder="https://…" value="${esc(m.photo)}"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="mnCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid2"><div><dt>Líder</dt><dd class="cresp"><span class="av" style="background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${initials(m.lead)}</span>${esc(m.lead)}</dd></div><div><dt>Telefone</dt><dd class="mono">${esc(m.phone)}</dd></div><div style="grid-column:1/-1"><dt>Descrição</dt><dd>${m.desc?esc(m.desc):'<span class="soft">Sem descrição</span>'}</dd></div><div style="grid-column:1/-1"><dt>Foto</dt><dd>${m.photo?esc(m.photo):'<span class="soft">Sem foto · usa o ícone do ministério</span>'}</dd></div></dl>`}</section>
  <p class="who" style="margin:4px 4px 0;display:flex;gap:6px;align-items:center">${ic('lock',13)}O acesso ao painel deste ministério é concedido em Administração › Usuários e permissões.</p></div>
  <div class="col"><section class="card pc"><div class="sh"><h2>Resumo</h2></div><div class="mnsum">
   <button data-a="mnTab" data-v="times"><b>${tCount(m)}</b><span>Times</span></button><button data-a="mnTab" data-v="resp"><b>${m.resp.length}</b><span>Responsabilidades</span></button><button data-a="mnTab" data-v="cont"><b>${m.content.length}</b><span>Conteúdos</span></button><div><b>${m.mem}</b><span>Membros</span></div></div></section>
   <section class="card pc"><div class="sh"><h2>Casas ligadas</h2></div>${(()=>{const cs=CASAS.filter(c=>c.min&&m.n.includes(c.min.split(' ')[0]));return cs.length?cs.map(c=>`<button class="dk" data-a="rGoCasa" data-v="${c.id}">${hTile(c,32)}<span class="dkt"><b>${esc(c.n)}</b><span>${c.ppl.length} pessoas</span></span>${ic('chevR',16)}</button>`).join(''):'<p class="who" style="margin:0">Nenhuma casa de apascentamento ligada a este ministério.</p>';})()}</section></div></div>`;}
function mnEmpty(t,s,btn,act){return `<div class="eempty"><span class="eei">${ic(btn,22)}</span><p>${t}</p><span class="who">${s}</span><button class="btn pri" data-a="${act}" style="margin-top:10px">${ic('plus',14,2.2)}${t.startsWith('Nenhum time')?'Criar primeiro time':t.startsWith('Nenhuma resp')?'Adicionar responsabilidade':'Vincular conteúdo'}</button></div>`;}
function mnTimes(m){return `<section class="card pc"><div class="sh"><h2>Times</h2>${m.teams.length?`<button class="btn sec sm" data-a="mnAddTeam">${ic('plus',14,2.2)}Novo time</button>`:''}</div>
 ${m.teams.length?`<div class="mins">${m.teams.map((t,i)=>`<article class="minc2"><div class="mt"><b>${esc(t.n)}</b><button class="ibtn sm" data-a="mnDelTeam" data-v="${i}" aria-label="Excluir time">${ic('x',14)}</button></div><span class="who cresp" style="font-weight:400;color:var(--ink-muted)">${ic('user',13)}Líder: ${esc(t.lead)}</span><div class="segl" style="margin-top:12px"><span><b>${t.m}</b> ${t.m===1?'pessoa':'pessoas'}</span></div></article>`).join('')}</div>`:mnEmpty('Nenhum time ainda.','Divida o ministério em times para montar escalas por função.','users','mnAddTeam')}</section>`;}
function mnResp(m){return `<section class="card pc"><div class="sh"><h2>Responsabilidades</h2>${m.resp.length?`<button class="btn sec sm" data-a="mnAddResp">${ic('plus',14,2.2)}Adicionar</button>`:''}</div>
 ${m.resp.length?`<ol class="resps">${m.resp.map((r,i)=>`<li><span class="rn">${i+1}</span><span>${esc(r)}</span><button class="ibtn sm" data-a="mnDelResp" data-v="${i}" aria-label="Remover">${ic('x',14)}</button></li>`).join('')}</ol>`:mnEmpty('Nenhuma responsabilidade ainda.','Liste o que o ministério assume na igreja, como “Montagem do culto de domingo”.','clipboard','mnAddResp')}</section>`;}
function mnCont(m){return `<section class="card pc"><div class="sh"><h2>Conteúdo vinculado</h2>${m.content.length?`<button class="btn sec sm" data-a="mnAddCont">${ic('plus',14,2.2)}Vincular</button>`:''}</div>
 <p class="who" style="margin:-4px 0 16px">Pregações, músicas, cursos e materiais são cadastrados em Conteúdo. Aqui você só vincula o que já existe.</p>
 ${m.content.length?`<div class="conts">${m.content.map((c,i)=>`<div class="ct1"><span class="cti">${ic(CTYPE_IC[c[0]],16)}</span><span class="ctt"><b>${esc(c[1])}</b><small>${c[0]}</small></span><button class="ibtn sm" data-a="mnDelCont" data-v="${i}" aria-label="Desvincular">${ic('x',14)}</button></div>`).join('')}</div>`:mnEmpty('Nenhum conteúdo vinculado.','Vincule um curso, pregação, música ou material.','book','mnAddCont')}</section>`;}

function rmAfter(){
 requestAnimationFrame(tabInd);
 const rq=$('#rq');if(rq)rq.addEventListener('input',e=>{S.rq=e.target.value;const p=e.target.selectionStart;render();const n=$('#rq');n.focus();n.setSelectionRange(p,p);});
 const q=$('#mnq');if(q)q.addEventListener('input',e=>{S.mnq=e.target.value;$('#mnrows').innerHTML=mnRows();});
 const f=$('#mnF');if(f)f.addEventListener('submit',e=>{e.preventDefault();const m=mnById(S.mini),fd=new FormData(f),ph=fd.get('photo');if(ph&&!/^https?:\/\//.test(ph)){const i=f.querySelector('[name=photo]');i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Use um link começando com https://';return;}
  const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{m.lead=fd.get('lead');m.phone=fd.get('phone');m.desc=fd.get('desc').trim();m.photo=ph;S.mnedit=null;render();toast('Informações atualizadas');},700);});
}
function reMn(){const m=mnById(S.mini);$('#mntb').innerHTML=mnTabBody(m);$$('.ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.mtab));tabInd();rmAfter();}
function simpleDlg(title,label,ph,onOk){openDlg(`${dlgHead(title)}<form class="fgrid one" id="sF" novalidate><label class="fld"><span class="fl">${label}</span><input name="v" placeholder="${ph}" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Adicionar</button></div></form>`,'sm');
 const f=$('#sF');f.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(f).get('v').trim(),i=f.querySelector('input');if(!v){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Preencha o campo';i.focus();return;}f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{closeDlg();onOk(v);},500);});}
const RA={
 rexpMenu:()=>{const p=$('#rexpPop');closePops(p);p.classList.toggle('open');},
 rMenu:v=>{const p=$('#rPop-'+v);closePops(p);p.classList.toggle('open');},
 rGoCasa:v=>{S.active='casas';S.casa=v;S.ctab='geral';S.mini=null;render();window.scrollTo({top:0});},
 rAdd:()=>{openDlg(`${dlgHead('Nova rede','Uma rede agrupa casas sob um supervisor.')}${rForm(null)}`);rBind(null);},
 rEdit:v=>{closePops();const r=rById(v);openDlg(`${dlgHead('Editar rede')}${rForm(r)}`);rBind(r);},
 rDel:v=>{closePops();const r=rById(v);confirmDel({title:`Excluir ${r.n}?`,body:`${r.casas.length?`As ${r.casas.length} casas vinculadas ficam sem rede. `:''}As casas e os participantes não são apagados.`,label:'Excluir rede',onConfirm:()=>{const i=REDES.indexOf(r);REDES.splice(i,1);render();toast(`${r.n} excluída`,()=>{REDES.splice(i,0,r);render();});}});},
 mnexpMenu:()=>{const p=$('#mnexpPop');closePops(p);p.classList.toggle('open');},
 mnMenu:()=>{const p=$('#mnPop');closePops(p);p.classList.toggle('open');},
 mnFilter:v=>{S.mnf=v;$$('.chipf[data-a=mnFilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#mnrows').innerHTML=mnRows();},
 mnOpen:v=>{S.mini=v;S.mtab='det';S.mnedit=null;render();window.scrollTo({top:0});},
 mnBack:()=>{S.mini=null;render();},
 mnTab:v=>{S.mtab=v;S.mnedit=null;reMn();},
 mnEdit:()=>{S.mnedit=true;reMn();},
 mnCancel:()=>{S.mnedit=null;reMn();},
 mnToggle:()=>{closePops();const m=mnById(S.mini);if(m.active){confirmDel({title:`Inativar o Ministério de ${m.n}?`,body:'Ele some do app e das escalas, mas times, membros e histórico são mantidos. Dá para reativar depois.',label:'Inativar',onConfirm:()=>{m.active=false;render();toast('Ministério inativado');}});}else{m.active=true;render();toast('Ministério reativado');}},
 mnDel:()=>{closePops();const m=mnById(S.mini);confirmDel({title:`Excluir o Ministério de ${m.n}?`,body:`Os ${m.mem} membros são desvinculados e os times, responsabilidades e escalas são apagados. Esta ação não pode ser desfeita. Se quiser só pausar, use “Inativar”.`,label:'Excluir ministério',typed:m.n,onConfirm:()=>{MINIS.splice(MINIS.indexOf(m),1);S.mini=null;render();toast(`Ministério de ${m.n} excluído`);}});},
 mnAddTeam:()=>{const m=mnById(S.mini);openDlg(`${dlgHead('Novo time',`Dentro do Ministério de ${esc(m.n)}.`)}<form class="fgrid one" id="tF" novalidate><label class="fld"><span class="fl">Nome do time</span><input name="n" placeholder="Ex.: Som e projeção" autocomplete="off"><span class="err"></span></label><label class="fld"><span class="fl">Líder do time</span><span class="selw"><select name="l">${MEMBERS.filter(x=>x.tit).map(x=>`<option>${esc(x.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar time</button></div></form>`,'sm');
  const f=$('#tF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),i=f.querySelector('[name=n]');if(!n){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome ao time';i.focus();return;}f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{m.teams.push({n,lead:fd.get('l'),m:1});closeDlg();render();toast(`Time ${n} criado`);},600);});},
 mnDelTeam:v=>{const m=mnById(S.mini),t=m.teams[+v];confirmDel({title:`Excluir o time ${t.n}?`,body:`As ${t.m} pessoas continuam no ministério, mas saem das escalas deste time.`,label:'Excluir time',onConfirm:()=>{m.teams.splice(+v,1);render();toast('Time excluído',()=>{m.teams.splice(+v,0,t);render();});}});},
 mnAddResp:()=>simpleDlg('Nova responsabilidade','Nome','Ex.: Montagem do culto de domingo',v=>{const m=mnById(S.mini);m.resp.push(v);render();toast('Responsabilidade adicionada');}),
 mnDelResp:v=>{const m=mnById(S.mini),r=m.resp[+v];confirmDel({title:'Remover esta responsabilidade?',body:`“${esc(r)}” deixa de aparecer no ministério.`,label:'Remover',onConfirm:()=>{m.resp.splice(+v,1);render();toast('Responsabilidade removida',()=>{m.resp.splice(+v,0,r);render();});}});},
 mnAddCont:()=>{const m=mnById(S.mini),used=new Set(MINIS.flatMap(x=>x.content.map(c=>c[1])));
  const opts=t=>CONTENT[t].filter(x=>!used.has(x));
  openDlg(`${dlgHead('Vincular conteúdo')}<div class="fld"><span class="fl">Tipo</span><div class="yn" id="ctG" role="radiogroup">${Object.keys(CONTENT).map((t,i)=>`<label><input type="radio" name="ct" value="${t}" ${!i?'checked':''}><span>${ic(CTYPE_IC[t],14)}&nbsp;${t}</span></label>`).join('')}</div></div>
   <div class="fld" style="margin-top:14px"><span class="fl" id="ctL">Curso</span><div class="pick" id="ctP"></div><span class="hint">Só aparece conteúdo ainda sem ministério vinculado.</span></div>
   <div class="dfoot" style="margin-top:14px"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="mnDoCont">Vincular</button></div>`,'sm');
  const draw=()=>{const t=$('input[name=ct]:checked').value;$('#ctL').textContent=t;const o=opts(t);$('#ctP').innerHTML=o.length?o.map((x,i)=>`<label class="pk"><span class="cti">${ic(CTYPE_IC[t],15)}</span><span><b>${esc(x)}</b><small>${t}</small></span><input type="radio" name="cv" value="${esc(x)}" ${!i?'checked':''}></label>`).join(''):`<p class="who" style="padding:10px">Todo ${t.toLowerCase()} já está vinculado a um ministério.</p>`;};
  $('#ctG').addEventListener('change',draw);draw();},
 mnDoCont:(v,b)=>{const s=$('input[name=cv]:checked');if(!s){toast('Nada disponível para vincular');return;}const m=mnById(S.mini),t=$('input[name=ct]:checked').value;b.classList.add('busy');setTimeout(()=>{m.content.push([t,s.value]);closeDlg();render();toast(`${s.value} vinculado`);},500);},
 mnDelCont:v=>{const m=mnById(S.mini),c=m.content[+v];confirmDel({title:'Desvincular este conteúdo?',body:`“${esc(c[1])}” continua em Conteúdo, só deixa de estar ligado a este ministério.`,label:'Desvincular',onConfirm:()=>{m.content.splice(+v,1);render();toast('Conteúdo desvinculado',()=>{m.content.splice(+v,0,c);render();});}});},
 mnAdd:()=>{openDlg(`${dlgHead('Novo ministério','Times e responsabilidades podem ser adicionados depois.')}<form class="fgrid" id="naF" novalidate style="grid-template-columns:1fr 1fr">
  <label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Recepção" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Líder</span><span class="selw"><select name="lead">${MEMBERS.filter(x=>x.tit).map(x=>`<option>${esc(x.n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Precisa ser um membro cadastrado.</span></label>
  <label class="fld"><span class="fl">Telefone</span><input name="phone" type="tel" inputmode="tel" placeholder="(11) 99999-9999"></label>
  <label class="fld wide"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="2" placeholder="Para que serve este ministério"></textarea></label>
  <label class="fld wide"><span class="fl">Foto <small>opcional</small></span><input name="photo" type="url" placeholder="https://…"></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar ministério</button></div></form>`);
  const f=$('#naF'),ph=f.querySelector('[name=phone]');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim().replace(/^Ministério (de |do |da )?/i,''),i=f.querySelector('[name=n]');const bad=m=>{i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;i.focus();};
   if(!n)return bad('Dê um nome ao ministério');if(MINIS.some(m=>norm(m.n)===norm(n)))return bad('Esse ministério já existe');
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{const m=MN(n,fd.get('lead'),1,0,{desc:fd.get('desc').trim(),phone:fd.get('phone')});m.photo=fd.get('photo');MINIS.push(m);closeDlg();S.mini=m.id;S.mtab='det';render();toast(`Ministério de ${n} criado`);},700);});},
};

/* ================= Kids ================= */
let _kid=0;const kid=p=>p+(++_kid);
const TURMAS=[{id:'t1',n:'Berçário',min:0,max:2},{id:'t2',n:'Maternal',min:3,max:4},{id:'t3',n:'Jardim',min:5,max:6},{id:'t4',n:'Kids A',min:7,max:9}];
const KTEAMS=[{id:'k1',n:'Berçário — Domingo manhã',m:['Cláudia Ferraz','Patrícia Lima']},{id:'k2',n:'Maternal — Domingo manhã',m:['Mônica Souza']},{id:'k3',n:'Kids A — Domingo manhã',m:['Henrique Costa','Giovanna Martins']}];
const SALAS=[{id:'s1',n:'Berçário',cap:15,turma:'t1',team:'k1',active:true,pres:8,mon:'Carla Nunes'},{id:'s2',n:'Maternal',cap:20,turma:'t2',team:'k2',active:true,pres:12,mon:'João Lima'},{id:'s3',n:'Jardim',cap:22,turma:'t3',team:'',active:true,pres:15,mon:'Ana Souza'},{id:'s4',n:'Kids A',cap:25,turma:'t4',team:'k3',active:true,pres:18,mon:'Marcos Pereira'}];
const KWAIT=2,KREG=82;
const tById=id=>TURMAS.find(t=>t.id===id),kById=id=>KTEAMS.find(t=>t.id===id),sById=id=>SALAS.find(s=>s.id===id);
const faixa=t=>t?`${t.min}–${t.max} anos`:'—';
const KTONE=['ceu','damasco','lima','rosado','menta','salvia'];
const kTone=i=>KTONE[i%KTONE.length];
const zelo=`<span class="zelo">${ic('swap',13,2)}Sincronizado com o <b>Zelo Kids</b></span>`;
const kHead=(t,sub,act)=>`<header class="ph rise"><div><p class="eb">Kids</p><h1>${t}</h1><p class="lede">${sub}</p></div><div class="pact">${act||''}</div></header>`;

function kVis(){
 const act=SALAS.filter(s=>s.active),pres=act.reduce((a,s)=>a+s.pres,0),vol=new Set(KTEAMS.flatMap(t=>t.m)).size;
 return `${kHead('Kids','Administração do Ministério Infantil',zelo)}
 <section class="card korg rise" style="--d:1"><div class="kon"><span class="eb" style="margin:0">Como se organiza</span><p class="who" style="margin:4px 0 0">Salas, times e turmas são geridos aqui. Cadastro de crianças, famílias e check-in continuam no Zelo Kids.</p></div>
  <div class="kflow">
   <button class="kfn" data-a="nav" data-v="kturmas"><span class="kfi">${ic('users',16)}</span><span><b>Turma</b><small>a faixa etária</small></span></button><span class="kfa">${ic('arrowR',14,2)}<small>alocada em</small></span>
   <button class="kfn main" data-a="nav" data-v="ksalas"><span class="kfi">${ic('door',16)}</span><span><b>Sala</b><small>o espaço, com capacidade</small></span></button><span class="kfa rev">${ic('arrowR',14,2)}<small>servida por</small></span>
   <button class="kfn" data-a="nav" data-v="ktimes"><span class="kfi">${ic('hand',16)}</span><span><b>Time</b><small>voluntários e professores</small></span></button>
  </div></section>
 <section class="card kpis4 rise" style="--d:2">
  <div class="k4"><span class="kl">Salas abertas</span><span class="kv">${act.length}</span><span class="kd">de ${SALAS.length} cadastradas</span></div>
  <div class="k4"><span class="kl">Crianças presentes</span><span class="kv">${pres}<small class="kof"> de ${KREG}</small></span><span class="kmeter"><i style="width:${Math.round(pres/KREG*100)}%"></i></span></div>
  <div class="k4"><span class="kl">Voluntários servindo</span><span class="kv">${vol}</span><span class="kd">em ${KTEAMS.length} times</span></div>
  <div class="k4"><span class="kl">Aguardando check-in</span><span class="kv" style="color:var(--st-sol)">${KWAIT}</span><span class="kd">na recepção agora</span></div>
 </section>
 <div class="sh rise" style="--d:3;margin-top:6px"><h2><span class="live"><i></i>Ocupação ao vivo</span></h2><span class="who">Domingo, 18/09/2026 · atualizado há 1 min</span></div>
 <div class="kroom rise" style="--d:3">${act.map((s,i)=>{const t=tById(s.turma),tm=kById(s.team),r=Math.round(s.pres/s.cap*100);return `<article class="card kr">
  <div class="kr1"><div><b>${esc(s.n)}</b><span>${t?esc(t.n)+' · '+faixa(t):'Sem turma'}</span></div><span class="krn"><b>${s.pres}</b>/${s.cap}</span></div>
  <div class="seats" aria-label="${s.pres} de ${s.cap} lugares ocupados">${Array.from({length:s.cap},(_,j)=>`<i class="${j<s.pres?'on':''}"></i>`).join('')}</div>
  <div class="kr3"><span class="cresp"><span class="av" style="background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${initials(s.mon)}</span>${esc(s.mon)}</span><span class="${r>=85?'full':''}">${r}% ocupada</span></div>
  ${tm?'':`<button class="kwarn" data-a="nav" data-v="ksalas">${ic('alert',13,2)}Sala sem time vinculado</button>`}
 </article>`;}).join('')}</div>`;
}

function kSalas(){
 const act=SALAS.filter(s=>s.active),cap=act.reduce((a,s)=>a+s.cap,0),noT=SALAS.filter(s=>!s.turma).length,noTeam=SALAS.filter(s=>!s.team).length;
 return `${kHead('Salas','Espaços físicos do Ministério Infantil',`<button class="btn sec" data-a="export" data-v="o CSV das salas">Exportar CSV</button><button class="btn pri" data-a="kSala">${ic('plus',15,2.2)}Nova sala</button>`)}
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Salas ativas</span><span class="kv">${act.length}</span><span class="kd">${SALAS.length-act.length} inativa${SALAS.length-act.length===1?'':'s'}</span></div>
  <div class="k4"><span class="kl">Capacidade total</span><span class="kv">${cap}</span><span class="kd">crianças por culto</span></div>
  <div class="k4"><span class="kl">Sem turma</span><span class="kv">${noT}</span><span class="kd">sem faixa etária definida</span></div>
  <div class="k4"><span class="kl">Sem time</span><span class="kv" style="${noTeam?'color:var(--st-sol)':''}">${noTeam}</span><span class="kd">sem voluntários escalados</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="trow ks thead"><span>Sala</span><span>Turma</span><span>Capacidade</span><span>Time</span><span>Status</span><span></span></div>
  ${SALAS.map((s,i)=>{const t=tById(s.turma),tm=kById(s.team);return `<div class="trow ks ${s.active?'':'off'}">
   <span class="tn"><span class="htile" style="--s:36px;background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${ic('door',17)}</span><span class="hn"><b>${esc(s.n)}</b><span>${t?faixa(t):'Sem faixa etária'}</span></span></span>
   <span class="kt">${t?esc(t.n):'<span class="soft">—</span>'}</span>
   <span class="kc"><span class="kcap">${Array.from({length:Math.ceil(s.cap/5)},()=>'<i></i>').join('')}</span><b>${s.cap}</b></span>
   <span class="ktm">${tm?esc(tm.n):'<em class="tag warn">Sem time</em>'}</span>
   <span class="ts">${s.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativa</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativa</span>'}</span>
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="kMenu" data-v="${s.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kPop-${s.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kSala" data-v="${s.id}">${ic('pen',16)}Editar sala</button><button class="pi" data-a="kSalaTog" data-v="${s.id}">${ic(s.active?'pause':'check',16)}${s.active?'Desativar':'Reativar'}</button><hr><button class="pi danger" data-a="kSalaDel" data-v="${s.id}">${ic('x',16)}Excluir sala</button></div></div></span></div>`;}).join('')}
  <div class="tfoot"><span>${SALAS.length} salas</span></div></section>`;
}

function kTimes(){
 const vol=new Set(KTEAMS.flatMap(t=>t.m)).size,empty=KTEAMS.filter(t=>!t.m.length).length;
 return `${kHead('Times','Voluntários e professores do Ministério Infantil',`<button class="btn pri" data-a="kTeam">${ic('plus',15,2.2)}Novo time</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Times</span><span class="kv">${KTEAMS.length}</span><span class="kd">${SALAS.filter(s=>s.team).length} salas atendidas</span></div>
  <div class="k4"><span class="kl">Voluntários</span><span class="kv">${vol}</span><span class="kd">servindo nos times</span></div>
  <div class="k4"><span class="kl">Times sem membro</span><span class="kv" style="${empty?'color:var(--st-sol)':''}">${empty}</span><span class="kd">${empty?'precisam de voluntários':'todos com gente'}</span></div>
 </section>
 <p class="who rise" style="--d:2;margin:2px 4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">${ic('swap',13,2)}A mesma equipe é a base que o Zelo Kids usa para escalar quem serve em cada sala. Também aparece em <button class="lnk inl" data-a="kGoMin">Comunidade › Ministérios › Kids</button>.</p>
 <div class="rgrid2 rise" style="--d:3">${KTEAMS.map((t,i)=>{const rooms=SALAS.filter(s=>s.team===t.id);return `<article class="card rc">
  <div class="rc1"><div><b>${esc(t.n)}</b><span>${rooms.length?'Serve em '+rooms.map(r=>esc(r.n)).join(', '):'Nenhuma sala vinculada'}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="kTMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kTPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi danger" data-a="kTeamDel" data-v="${t.id}">${ic('x',16)}Excluir time</button></div></div></div>
  ${t.m.length?`<div class="kmem">${t.m.map((n,j)=>`<span class="kmc"><span class="av" style="background:var(--tone-${kTone(i+j)});color:var(--tone-${kTone(i+j)}-ink)">${initials(n)}</span>${esc(n)}<button data-a="kMemDel" data-v="${t.id}|${j}" aria-label="Remover ${esc(n)}">${ic('x',12,2.2)}</button></span>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhum voluntário ainda.</p>'}
  <button class="btn sec sm" data-a="kMem" data-v="${t.id}" style="align-self:flex-start">${ic('userplus',14)}Adicionar voluntário</button></article>`;}).join('')}</div>`;
}

function kTurmas(){
 const linked=TURMAS.filter(t=>SALAS.some(s=>s.turma===t.id)).length,MAX=12;
 return `${kHead('Turmas','Faixas etárias do Ministério Infantil',`<button class="btn pri" data-a="kTurma">${ic('plus',15,2.2)}Nova turma</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Turmas</span><span class="kv">${TURMAS.length}</span><span class="kd">de ${Math.min(...TURMAS.map(t=>t.min))} a ${Math.max(...TURMAS.map(t=>t.max))} anos</span></div>
  <div class="k4"><span class="kl">Com sala</span><span class="kv">${linked}</span><span class="kd">alocadas em uma sala</span></div>
  <div class="k4"><span class="kl">Sem sala</span><span class="kv" style="${TURMAS.length-linked?'color:var(--st-sol)':''}">${TURMAS.length-linked}</span><span class="kd">ainda sem espaço</span></div>
 </section>
 <p class="who rise" style="--d:2;margin:2px 4px">Turma é só a faixa etária. Currículo e jornadas ficam em Conteúdo › Jornadas.</p>
 <section class="card pc rise" style="--d:3"><div class="sh"><h2>Faixas etárias</h2><span class="who">0 a ${MAX} anos</span></div>
  <div class="ages"><div class="agax">${Array.from({length:MAX+1},(_,i)=>`<span style="left:${(i+.5)/(MAX+1)*100}%">${i}</span>`).join('')}</div>
  ${TURMAS.slice().sort((a,b)=>a.min-b.min).map((t,i)=>{const rooms=SALAS.filter(s=>s.turma===t.id);return `<div class="agr"><div class="agn"><b>${esc(t.n)}</b><span>${rooms.length?rooms.map(r=>esc(r.n)).join(', '):'<em class="tag warn">Sem sala</em>'}</span></div>
   <div class="agt"><span class="agb" style="left:${t.min/(MAX+1)*100}%;width:${(t.max-t.min+1)/(MAX+1)*100}%;background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${faixa(t)}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="kTuMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kTuPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kTurma" data-v="${t.id}">${ic('pen',16)}Editar turma</button><hr><button class="pi danger" data-a="kTurmaDel" data-v="${t.id}">${ic('x',16)}Excluir turma</button></div></div></div>`;}).join('')}</div>
 </section>`;
}

const pop=id=>{const p=$('#'+id);closePops(p);p.classList.toggle('open');};
const KA={
 kGoMin:()=>{const m=MINIS.find(x=>x.n==='Kids');S.active='ministerios';S.mini=m?m.id:null;S.mtab='times';render();window.scrollTo({top:0});},
 kMenu:v=>pop('kPop-'+v),kTMenu:v=>pop('kTPop-'+v),kTuMenu:v=>pop('kTuPop-'+v),
 kSala:v=>{closePops();const s=v?sById(v):null;openDlg(`${dlgHead(s?'Editar sala':'Nova sala')}<form class="fgrid" id="ksF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Nome da sala</span><input name="n" value="${esc(s?s.n:'')}" placeholder="Ex.: Sala 3" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Capacidade</span><input name="cap" type="number" min="1" inputmode="numeric" value="${s?s.cap:''}" placeholder="Nº de crianças"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Turma <small>opcional</small></span><span class="selw"><select name="turma"><option value="">Nenhuma</option>${TURMAS.map(t=>`<option value="${t.id}" ${s&&s.turma===t.id?'selected':''}>${esc(t.n)} · ${faixa(t)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Define a faixa etária da sala.</span></label>
   <label class="fld wide"><span class="fl">Time <small>opcional</small></span><span class="selw"><select name="team"><option value="">Nenhum</option>${KTEAMS.map(t=>`<option value="${t.id}" ${s&&s.team===t.id?'selected':''}>${esc(t.n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Qual time de voluntários serve nesta sala.</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${s?'Salvar':'Criar sala'}</button></div></form>`);
  const f=$('#ksF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),cap=+fd.get('cap');if(!n)bad('n','Dê um nome à sala');else if(SALAS.some(x=>x!==s&&norm(x.n)===norm(n)))bad('n','Já existe uma sala com esse nome');if(!cap||cap<1)bad('cap','Informe a capacidade');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{if(s)Object.assign(s,{n,cap,turma:fd.get('turma'),team:fd.get('team')});else SALAS.push({id:kid('s'),n,cap,turma:fd.get('turma'),team:fd.get('team'),active:true,pres:0,mon:'—'});closeDlg();render();toast(s?`${n} atualizada`:`${n} criada · sincronizando com o Zelo Kids`);},700);});},
 kSalaTog:v=>{closePops();const s=sById(v);s.active=!s.active;render();toast(s.active?`${s.n} reativada`:`${s.n} desativada`);},
 kSalaDel:v=>{closePops();const s=sById(v);confirmDel({title:`Excluir a sala ${s.n}?`,body:'Ela deixa de aparecer no check-in do Zelo Kids. As crianças e o histórico de frequência não são apagados.',label:'Excluir sala',onConfirm:()=>{const i=SALAS.indexOf(s);SALAS.splice(i,1);render();toast(`${s.n} excluída`,()=>{SALAS.splice(i,0,s);render();});}});},
 kTeam:()=>simpleDlg('Novo time','Nome','Ex.: Jardim — Domingo noite',v=>{KTEAMS.push({id:kid('k'),n:v,m:[]});render();toast(`Time ${v} criado`);}),
 kTeamDel:v=>{closePops();const t=kById(v),rooms=SALAS.filter(s=>s.team===t.id);confirmDel({title:`Excluir o time ${t.n}?`,body:`${rooms.length?`${rooms.map(r=>r.n).join(', ')} fica${rooms.length>1?'m':''} sem time. `:''}Os ${t.m.length} voluntários continuam cadastrados.`,label:'Excluir time',onConfirm:()=>{const i=KTEAMS.indexOf(t);KTEAMS.splice(i,1);rooms.forEach(r=>r.team='');render();toast('Time excluído',()=>{KTEAMS.splice(i,0,t);rooms.forEach(r=>r.team=t.id);render();});}});},
 kMem:v=>{const t=kById(v),cand=MEMBERS.filter(m=>!t.m.includes(m.n));openDlg(`${dlgHead('Adicionar voluntário',esc(t.n))}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="kmq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="kmp">${candList(cand,'')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="kMemDo" data-v="${t.id}">Adicionar</button></div>`,'sm');$('#kmq').addEventListener('input',e=>{$('#kmp').innerHTML=candList(cand,e.target.value);});},
 kMemDo:(v,b)=>{const s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const t=kById(v),m=byId(s.value);b.classList.add('busy');setTimeout(()=>{t.m.push(m.n);closeDlg();render();toast(`${m.n.split(' ')[0]} entrou no time`);},500);},
 kMemDel:v=>{const [tid,j]=v.split('|'),t=kById(tid),n=t.m[+j];confirmDel({title:`Remover ${n.split(' ')[0]} do time?`,body:`${n} deixa de ser escalado(a) em ${t.n}.`,label:'Remover',onConfirm:()=>{t.m.splice(+j,1);render();toast(`${n.split(' ')[0]} removido(a)`,()=>{t.m.splice(+j,0,n);render();});}});},
 kTurma:v=>{closePops();const t=v?tById(v):null;openDlg(`${dlgHead(t?'Editar turma':'Nova turma')}<form class="fgrid" id="ktF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(t?t.n:'')}" placeholder="Ex.: Pré-adolescentes" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Idade mínima</span><input name="min" type="number" min="0" max="17" inputmode="numeric" value="${t?t.min:''}" placeholder="anos"><span class="err"></span></label>
   <label class="fld"><span class="fl">Idade máxima</span><input name="max" type="number" min="0" max="17" inputmode="numeric" value="${t?t.max:''}" placeholder="anos"><span class="err"></span></label>
   <p class="hint wide" id="ktH" style="margin:-4px 0 0"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${t?'Salvar':'Criar turma'}</button></div></form>`,'sm');
  const f=$('#ktF'),hint=()=>{const a=+f.min.value,b=+f.max.value;if(f.min.value===''||f.max.value===''){$('#ktH').textContent='';return;}const ov=TURMAS.filter(x=>x!==t&&a<=x.max&&b>=x.min);$('#ktH').innerHTML=ov.length?`<span style="color:var(--st-sol)">Sobrepõe ${ov.map(x=>x.n+' ('+faixa(x)+')').join(', ')}</span>`:`${a}–${b} anos · sem sobreposição`;};
  f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');hint();});hint();
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),a=fd.get('min'),b=fd.get('max');if(!n)bad('n','Dê um nome à turma');if(a==='')bad('min','Informe');if(b==='')bad('max','Informe');else if(+b<+a)bad('max','Menor que a mínima');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{if(t)Object.assign(t,{n,min:+a,max:+b});else TURMAS.push({id:kid('t'),n,min:+a,max:+b});closeDlg();render();toast(t?`${n} atualizada`:`Turma ${n} criada`);},600);});},
 kTurmaDel:v=>{closePops();const t=tById(v),rooms=SALAS.filter(s=>s.turma===t.id);confirmDel({title:`Excluir a turma ${t.n}?`,body:`${rooms.length?`${rooms.map(r=>r.n).join(', ')} fica${rooms.length>1?'m':''} sem faixa etária definida. `:''}As crianças cadastradas no Zelo Kids não são afetadas.`,label:'Excluir turma',onConfirm:()=>{const i=TURMAS.indexOf(t);TURMAS.splice(i,1);rooms.forEach(r=>r.turma='');render();toast('Turma excluída',()=>{TURMAS.splice(i,0,t);rooms.forEach(r=>r.turma=t.id);render();});}});},
};

/* ================= Administração ================= */
const AREAS_P=['Membros','Integração','Cuidado','Comunidade','Kids','Eventos','Conteúdo','Financeiro','Administração'];
const ACTS=['Ver','Criar','Editar','Excluir'];
const ROLES={Administrador:['st-rec'],Pastor:['st-ace'],Líder:['st-ace'],Secretaria:['st-int'],Voluntário:['st-sol']};
const IGREJAS=[{id:'g1',n:'Alva Sede — Centro',rede:'n1'},{id:'g2',n:'Alva Zona Norte',rede:'n1'},{id:'g3',n:'Alva Campinas',rede:'n2'}];
const NETS=[{id:'n1',n:'Rede Alva SP',glob:['u1','u3','u5']},{id:'n2',n:'Rede Alva Interior',glob:['u1']}];
let _uid=0;
const U=(n,e,role,igs,perm,last,tone)=>({id:'u'+(++_uid),n,e,role,igs,cur:igs[0],perm,last,tone,active:true});
const PM=o=>{const p={};AREAS_P.forEach(a=>p[a]=o[a]||[]);return p;};
const ALL=PM(Object.fromEntries(AREAS_P.map(a=>[a,ACTS])));
const USERS=[
 U('Rafael Pereira','rafael@alvaigreja.com.br','Administrador',['g1','g2','g3'],ALL,'agora','ceu'),
 U('Ana Lima','ana.lima@alvaigreja.com.br','Líder',['g1','g2'],PM({Membros:['Ver','Editar'],Comunidade:['Ver','Criar','Editar'],Eventos:['Ver']}),'há 2 h','rosado'),
 U('Marcos Souza','marcos@alvaigreja.com.br','Pastor',['g1','g2'],PM({Membros:['Ver','Editar'],Integração:['Ver','Editar'],Cuidado:ACTS,Comunidade:['Ver'],Eventos:['Ver']}),'ontem','salvia'),
 U('Juliana Prado','juliana@alvaigreja.com.br','Voluntário',['g1'],PM({Eventos:['Ver','Editar'],Kids:['Ver']}),'há 3 dias','lima'),
 U('Patrícia Oliveira','patricia@alvaigreja.com.br','Secretaria',['g1','g2'],PM({Membros:ACTS,Integração:ACTS,Eventos:['Ver','Criar','Editar'],Financeiro:['Ver']}),'hoje','damasco'),
 U('Diego Martins','diego@alvaigreja.com.br','Líder',['g3'],PM({Comunidade:['Ver','Editar'],Eventos:ACTS}),'há 6 dias','menta'),
];
const LOG=[
 {u:'Rafael Pereira',a:'Excluiu',e:'Membro',x:'Bruno Carvalho',d:'2026-09-18',t:'09:12'},
 {u:'Ana Lima',a:'Editou',e:'Ministério',x:'Louvor',d:'2026-09-18',t:'08:40'},
 {u:'Marcos Souza',a:'Adicionou',e:'Item de almoxarifado',x:'Violão Yamaha',d:'2026-09-17',t:'17:02'},
 {u:'Sistema',a:'Aprovou',e:'Integração',x:'Bruno Carvalho',det:'Aceita → Integrado',d:'2026-09-17',t:'12:15'},
 {u:'Rafael Pereira',a:'Transferiu',e:'Cuidado pastoral',x:'Maria Santos',det:'para Pr. Marcos Lima',d:'2026-09-16',t:'15:30'},
];
const ACOL={Excluiu:'var(--st-rec)',Editou:'var(--st-ace)',Adicionou:'var(--st-int)',Aprovou:'var(--st-int)',Transferiu:'var(--st-sol)',Alterou:'var(--st-ace)'};
const LGPD=[{id:'l1',n:'Ricardo Santos',type:'Exportação de dados',st:'concluido',d:'2026-09-10',done:'2026-09-11'},{id:'l2',n:'Fernanda Lima',type:'Exclusão de conta',st:'pendente',d:'2026-09-15'}];
Object.assign(S,{user:null,uq:'',atab:'log',aq:'',af:'todas'});
const uById=id=>USERS.find(u=>u.id===id),gById=id=>IGREJAS.find(g=>g.id===id);
const uAv=(u,c='')=>`<span class="av ${c}" style="background:var(--tone-${u.tone});color:var(--tone-${u.tone}-ink)">${initials(u.n)}</span>`;
const rPill=r=>`<span class="stp" style="--c:var(--${ROLES[r][0]});--b:var(--${ROLES[r][0]}-bg)"><i></i>${r}</span>`;
const permCount=u=>AREAS_P.reduce((a,k)=>a+u.perm[k].length,0);
const dBRs=d=>{const [y,m,dd]=d.split('-');return `${dd}/${m}/${y}`;};
const admHead=(t,sub,act)=>`<header class="ph rise"><div><p class="eb">Administração</p><h1>${t}</h1><p class="lede">${sub}</p></div><div class="pact">${act||''}</div></header>`;

/* ---------- Usuários ---------- */
function usersList(){
 const q=norm(S.uq),l=USERS.filter(u=>!q||norm(u.n+' '+u.e+' '+u.role).includes(q)),scoped=USERS.filter(u=>u.role!=='Administrador').length;
 return `${admHead('Usuários e permissões','Quem acessa o painel e o que pode fazer em cada área',`<button class="btn pri" data-a="uInvite">${ic('plus',15,2.2)}Convidar usuário</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Usuários</span><span class="kv">${USERS.length}</span><span class="kd">${USERS.filter(u=>u.active).length} ativos</span></div>
  <div class="k4"><span class="kl">Acessos escopados</span><span class="kv">${scoped}</span><span class="kd">com permissões por área</span></div>
  <div class="k4"><span class="kl">Administradores</span><span class="kv">${USERS.filter(u=>u.role==='Administrador').length}</span><span class="kd">acesso total</span></div>
 </section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="uq" placeholder="Buscar por nome, e-mail ou papel" value="${esc(S.uq)}" autocomplete="off"></label></div>
  <div class="trow us thead"><span>Usuário</span><span>Papel</span><span>Acesso</span><span>Igrejas</span><span>Último acesso</span><span></span></div>
  ${l.map(u=>`<div class="trow us ${u.active?'':'off'}" tabindex="0" data-a="uOpen" data-v="${u.id}"><span class="tn">${uAv(u)}<span class="hn"><b>${esc(u.n)}</b><span>${esc(u.e)}</span></span></span>
   <span class="ts">${rPill(u.role)}</span>
   <span class="uacc">${u.role==='Administrador'?'<span class="soft">Todas as áreas</span>':`<span class="pmini">${AREAS_P.map(a=>`<i class="${u.perm[a].length?(u.perm[a].length>=3?'full':'on'):''}" title="${a}: ${u.perm[a].join(', ')||'sem acesso'}"></i>`).join('')}</span><span>${AREAS_P.filter(a=>u.perm[a].length).length} áreas</span>`}</span>
   <span class="uig">${u.igs.length} ${u.igs.length>1?'igrejas':'igreja'}</span><span class="ulast">${u.active?u.last:'<span class="soft">Suspenso</span>'}</span><span class="tc">${ic('chevR',16)}</span></div>`).join('')}
  <div class="tfoot"><span>${l.length} usuários</span></div></section>`;
}
function userDetail(){
 const u=uById(S.user);if(!u){S.user=null;return usersList();}
 const admin=u.role==='Administrador';
 return `<nav class="crumb rise"><span class="soft">Administração</span>${ic('chevR',13,2)}<button class="lnk back" data-a="uBack">Usuários e permissões</button>${ic('chevR',13,2)}<span>${esc(u.n)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid"><div class="avw">${uAv(u,'xl')}<button class="avedit" data-a="uPhoto" aria-label="Alterar foto">${ic('camera',14)}</button></div><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(u.n)}</h1>${rPill(u.role)}${u.active?'':'<span class="stp" style="--c:var(--st-rec);--b:var(--st-rec-bg)"><i></i>Suspenso</span>'}</div><p>${esc(u.e)} · último acesso ${u.last}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="uReset">${ic('key',15)}Redefinir senha</button><div style="position:relative"><button class="ibtn" data-a="uMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="uPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="uRole">${ic('shield',17)}Alterar papel</button><button class="pi" data-a="uSusp">${ic(u.active?'pause':'check',17)}${u.active?'Suspender acesso':'Reativar acesso'}</button><hr><button class="pi danger" data-a="uDel">${ic('x',17)}Remover usuário</button></div></div></div></header>
 <div class="pgrid rise" style="--d:2">
  <section class="card pc"><div class="sh"><h2>Permissões em ${esc(gById(u.cur).n)}</h2><span class="who" id="psaved">${admin?'Administrador tem acesso total':'Toque para ligar ou desligar'}</span></div>
   ${admin?`<div class="soft-empty"><p>Acesso total a todas as áreas.</p><span class="who">Para limitar, troque o papel para outro que não seja Administrador.</span></div>`:`<div class="pmx"><div class="pmh"><span>Área</span>${ACTS.map(a=>`<span>${a}</span>`).join('')}</div>
   ${AREAS_P.map(a=>`<div class="pmr ${u.perm[a].length?'':'none'}"><span class="pma">${a}</span>${ACTS.map(x=>`<label class="pmc"><input type="checkbox" data-area="${a}" data-act="${x}" ${u.perm[a].includes(x)?'checked':''} aria-label="${a}: ${x}"><span>${ic('check',13,2.8)}</span></label>`).join('')}</div>`).join('')}</div>
   <p class="who" style="margin:12px 0 0">“Ver” é ligado automaticamente quando outra ação é permitida. As mudanças salvam na hora.</p>`}</section>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Igreja atual</h2><button class="btn sec sm" data-a="uChurch">${ic('swap',14)}Trocar</button></div>
    <div class="dk" style="cursor:default"><span class="dot" style="width:32px;height:32px;border-radius:10px;background:var(--brand);color:var(--on-brand);display:grid;place-items:center;font:700 11px/1 var(--font-text)">${initials(gById(u.cur).n.split(' — ')[0])}</span><span class="dkt"><b>${esc(gById(u.cur).n)}</b><span>As permissões ao lado valem para esta igreja</span></span></div>
    <p class="who" style="margin:12px 0 0">Tem acesso a ${u.igs.length} ${u.igs.length>1?'igrejas':'igreja'}: ${u.igs.map(g=>esc(gById(g).n)).join(', ')}.</p></section>
   <section class="card pc"><div class="sh"><h2>Atividade recente</h2><button class="lnk" data-a="nav" data-v="auditoria">Auditoria ${ic('arrowR',14,2)}</button></div>${(()=>{const l=LOG.filter(x=>x.u===u.n);return l.length?`<ol class="mini-tl">${l.map(x=>`<li><b>${x.a} ${x.e.toLowerCase()} · ${esc(x.x)}</b><span>${dBRs(x.d)} às ${x.t}</span></li>`).join('')}</ol>`:'<p class="who" style="margin:0">Nenhuma ação registrada nos últimos 30 dias.</p>';})()}</section>
  </div></div>`;
}

/* ---------- Multi-igreja ---------- */
function multiList(){
 return `${admHead('Multi-igreja','Redes › igrejas › usuários e permissões',`<button class="btn sec" data-a="export" data-v="o CSV de redes e igrejas">Exportar CSV</button><button class="btn pri" data-a="nAdd">${ic('plus',15,2.2)}Nova rede</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Redes</span><span class="kv">${NETS.length}</span><span class="kd">agrupam igrejas</span></div>
  <div class="k4"><span class="kl">Igrejas</span><span class="kv">${IGREJAS.length}</span><span class="kd">${IGREJAS.filter(g=>!g.rede).length} sem rede</span></div>
  <div class="k4"><span class="kl">Acesso global</span><span class="kv">${new Set(NETS.flatMap(n=>n.glob)).size}</span><span class="kd">usuários veem a rede toda</span></div>
 </section>
 <div class="rgrid2 rise" style="--d:2">${NETS.map(n=>{const gs=IGREJAS.filter(g=>g.rede===n.id);return `<article class="card rc">
  <div class="rc1"><div><b>${esc(n.n)}</b><span>${gs.length} ${gs.length===1?'igreja':'igrejas'} · ${n.glob.length} com acesso global</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="nMenu" data-v="${n.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="nPop-${n.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="gAdd" data-v="${n.id}">${ic('plus',16)}Adicionar igreja</button><hr><button class="pi danger" data-a="nDel" data-v="${n.id}">${ic('x',16)}Excluir rede</button></div></div></div>
  <div class="glist">${gs.map(g=>{const us=USERS.filter(u=>u.igs.includes(g.id));return `<div class="gi"><span class="dot" style="width:34px;height:34px;border-radius:10px;background:var(--brand-soft);color:var(--brand-text);display:grid;place-items:center">${ic('church',16)}</span><span class="dkt"><b>${esc(g.n)}</b><span>${us.length} usuários com acesso</span></span><span class="stack sm">${us.slice(0,4).map(u=>uAv(u)).join('')}</span></div>`;}).join('')||'<p class="who" style="margin:0">Nenhuma igreja nesta rede.</p>'}</div>
  <div class="gglob"><span class="fl">Acesso global</span><div class="kmem">${n.glob.map(id=>{const u=uById(id);return u?`<span class="kmc">${uAv(u)}${esc(u.n)}</span>`:'';}).join('')}<button class="kmc add" data-a="nGlob" data-v="${n.id}">${ic('plus',13,2.2)}Adicionar</button></div></div>
 </article>`;}).join('')}</div>`;
}

/* ---------- Auditoria & LGPD ---------- */
function auditPage(){
 const pend=LGPD.filter(x=>x.st==='pendente').length;
 return `${admHead('Auditoria e LGPD','Quem fez o quê, quando, e pedidos de dados pessoais',`<button class="btn sec" data-a="export" data-v="o CSV da auditoria">Exportar CSV</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Ações registradas</span><span class="kv">${LOG.length}</span><span class="kd">nos últimos 7 dias</span></div>
  <div class="k4"><span class="kl">Pedidos LGPD pendentes</span><span class="kv" style="${pend?'color:var(--st-sol)':''}">${pend}</span><span class="kd">${pend?'prazo legal de 15 dias':'nada aguardando'}</span></div>
  <div class="k4"><span class="kl">Pedidos concluídos</span><span class="kv">${LGPD.filter(x=>x.st==='concluido').length}</span><span class="kd">em 2026</span></div>
 </section>
 <div class="utabs rise" style="--d:2">${[['log','Log de auditoria'],['lgpd','LGPD']].map(t=>`<button class="${S.atab===t[0]?'on':''}" data-a="aTab" data-v="${t[0]}">${t[1]}${t[0]==='lgpd'&&pend?` <small class="bdg">${pend}</small>`:''}</button>`).join('')}</div>
 <div id="abody" class="rise" style="--d:3">${S.atab==='log'?aLog():aLgpd()}</div>`;
}
function aLog(){
 const q=norm(S.aq),acts=[...new Set(LOG.map(x=>x.a))];
 const l=LOG.filter(x=>(S.af==='todas'||x.a===S.af)&&(!q||norm(x.u+' '+x.e+' '+x.x).includes(q)));
 const days={};l.forEach(x=>(days[x.d]=days[x.d]||[]).push(x));
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="aq" placeholder="Buscar por usuário ou registro" value="${esc(S.aq)}" autocomplete="off"></label>
  <div class="chips">${[['todas','Todas'],...acts.map(a=>[a,a])].map(c=>`<button class="chipf ${S.af===c[0]?'on':''}" data-a="aFilter" data-v="${c[0]}">${c[0]!=='todas'?`<i style="background:${ACOL[c[0]]}"></i>`:''}${c[1]}</button>`).join('')}</div></div>
  ${l.length?Object.keys(days).sort().reverse().map(d=>`<div class="mgh" style="position:static"><span>${inDays(d)===0?'Hoje':wd(d)+', '+fmtD(d)}</span></div><ol class="alog">${days[d].map(x=>`<li><span class="at">${x.t}</span><span class="adot" style="background:${ACOL[x.a]}"></span><span class="ab"><span><b>${esc(x.u)}</b> <span class="aa" style="color:${ACOL[x.a]}">${x.a.toLowerCase()}</span> ${x.e.toLowerCase()} <b>${esc(x.x)}</b>${x.det?` <span class="soft">· ${esc(x.det)}</span>`:''}</span></span>${x.u==='Sistema'?'<em class="tag">Automático</em>':''}</li>`).join('')}</ol>`).join(''):'<div class="mempty"><p>Nada encontrado.</p><span>Nenhum registro corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>Os registros são mantidos por 5 anos e não podem ser editados.</span></div></section>`;
}
function aLgpd(){
 return `<section class="card mtab">
  <div class="trow lg thead"><span>Membro</span><span>Pedido</span><span>Status</span><span>Solicitado</span><span></span></div>
  ${LGPD.map(x=>{const left=15+inDays(x.d);return `<div class="trow lg"><span class="tn"><span class="av" style="background:var(--tone-${x.st==='pendente'?'damasco':'ceu'});color:var(--tone-${x.st==='pendente'?'damasco':'ceu'}-ink)">${initials(x.n)}</span><span><b>${esc(x.n)}</b></span></span>
   <span class="lty">${ic(x.type.startsWith('Exclus')?'x':'share',14)}${x.type}</span>
   <span class="ts">${x.st==='pendente'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>${left<=0?'Vence hoje':'Pendente · '+left+(left>1?' dias':' dia')}</span>`:`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Concluído</span>`}</span>
   <span class="ldt">${dBRs(x.d)}${x.done?`<small>concluído ${dBRs(x.done)}</small>`:''}</span>
   <span class="hma">${x.st==='pendente'?`<button class="btn ${x.type.startsWith('Exclus')?'dang':'pri'} sm" data-a="lProc" data-v="${x.id}">Processar</button>`:`<button class="btn sec sm" data-a="export" data-v="o comprovante do pedido de ${esc(x.n)}">Comprovante</button>`}</span></div>`;}).join('')}
  <div class="tfoot"><span>A LGPD dá 15 dias para responder a cada pedido.</span></div></section>`;
}

function admAfter(){
 const uq=$('#uq');if(uq)uq.addEventListener('input',e=>{S.uq=e.target.value;const p=e.target.selectionStart;render();const n=$('#uq');n.focus();n.setSelectionRange(p,p);});
 const aq=$('#aq');if(aq)aq.addEventListener('input',e=>{S.aq=e.target.value;const p=e.target.selectionStart;$('#abody').innerHTML=aLog();admAfter();const n=$('#aq');n.focus();n.setSelectionRange(p,p);});
 $$('.pmc input').forEach(i=>i.addEventListener('change',()=>{const u=uById(S.user),a=i.dataset.area,x=i.dataset.act;let p=u.perm[a];
  if(i.checked){if(!p.includes(x))p.push(x);if(x!=='Ver'&&!p.includes('Ver'))p.push('Ver');}else{p=p.filter(v=>v!==x);if(x==='Ver')p=[];}u.perm[a]=ACTS.filter(v=>p.includes(v));
  const row=i.closest('.pmr');row.querySelectorAll('input').forEach(c=>c.checked=u.perm[a].includes(c.dataset.act));row.classList.toggle('none',!u.perm[a].length);
  const s=$('#psaved');s.innerHTML=`${ic('check',13,2.4)} Salvo`;s.style.color='var(--st-int)';clearTimeout(window._ps);window._ps=setTimeout(()=>{s.textContent='Toque para ligar ou desligar';s.style.color='';},1500);
  LOG.unshift({u:'Rafael Pereira',a:'Alterou',e:'Permissões de',x:u.n,det:`${a}: ${u.perm[a].join(', ')||'sem acesso'}`,d:'2026-09-30',t:new Date().toTimeString().slice(0,5)});}));
}
const AA={
 uOpen:v=>{S.user=v;render();window.scrollTo({top:0});},
 uBack:()=>{S.user=null;render();},
 uMenu:()=>{const p=$('#uPop');closePops(p);p.classList.toggle('open');},
 uPhoto:()=>toast('Envio de foto: em breve no protótipo'),
 uReset:(v,b)=>busy(b,900,'Link enviado',()=>toast(`Link de redefinição enviado para ${uById(S.user).e}`)),
 uChurch:()=>{const u=uById(S.user);openDlg(`${dlgHead('Trocar de igreja','As permissões mostradas passam a ser as desta igreja.')}<div class="pick">${u.igs.map(g=>`<label class="pk"><span class="dot" style="width:32px;height:32px;border-radius:10px;background:var(--brand-soft);color:var(--brand-text);display:grid;place-items:center;flex:none">${ic('church',15)}</span><span><b>${esc(gById(g).n)}</b><small>${g===u.cur?'Atual':'Tem acesso'}</small></span><input type="radio" name="ig" value="${g}" ${g===u.cur?'checked':''}></label>`).join('')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="uDoChurch">Trocar</button></div>`,'sm');},
 uDoChurch:()=>{const u=uById(S.user),g=$('input[name=ig]:checked').value;closeDlg();if(g===u.cur)return;u.cur=g;render();toast(`Agora vendo ${gById(g).n}`);},
 uRole:()=>{closePops();const u=uById(S.user);openDlg(`${dlgHead('Alterar papel',esc(u.n))}<div class="vis">${Object.keys(ROLES).map(r=>`<label><input type="radio" name="rl" value="${r}" ${u.role===r?'checked':''}><span><b>${r}</b><small>${{Administrador:'Acesso total a todas as áreas e igrejas.',Pastor:'Cuidado pastoral, membros e comunidade.',Líder:'Casas, ministérios e escalas sob sua liderança.',Secretaria:'Cadastros, integração e eventos.',Voluntário:'Só o que for liberado por área.'}[r]}</small></span></label>`).join('')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="uDoRole">Salvar</button></div>`,'sm');},
 uDoRole:()=>{const u=uById(S.user),r=$('input[name=rl]:checked').value;closeDlg();if(r===u.role)return;const old=u.role;u.role=r;if(r==='Administrador')u.perm=JSON.parse(JSON.stringify(ALL));render();toast(`${u.n.split(' ')[0]} agora é ${r}`,()=>{u.role=old;render();});},
 uSusp:()=>{closePops();const u=uById(S.user);if(!u.active){u.active=true;render();toast('Acesso reativado');return;}confirmDel({title:`Suspender o acesso de ${u.n.split(' ')[0]}?`,body:'A pessoa sai do painel na hora e não consegue entrar até você reativar. Permissões e histórico ficam guardados.',label:'Suspender acesso',onConfirm:()=>{u.active=false;render();toast('Acesso suspenso');}});},
 uDel:()=>{closePops();const u=uById(S.user);confirmDel({title:`Remover ${u.n} do painel?`,body:'O acesso e todas as permissões são apagados. O cadastro de membro e o histórico de auditoria continuam.',label:'Remover usuário',typed:u.n.split(' ')[0],onConfirm:()=>{USERS.splice(USERS.indexOf(u),1);S.user=null;render();toast(`${u.n} removido(a) do painel`);}});},
 uInvite:()=>{openDlg(`${dlgHead('Convidar usuário','A pessoa recebe um e-mail para criar a senha.')}<form class="fgrid one" id="uiF" novalidate>
   <label class="fld"><span class="fl">E-mail</span><input name="e" type="email" placeholder="nome@alvaigreja.com.br" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Nome</span><input name="n" placeholder="Nome e sobrenome" autocomplete="off"><span class="err"></span></label>
   <div class="fld"><span class="fl">Papel</span><div class="minpick">${Object.keys(ROLES).map((r,i)=>`<label><input type="radio" name="role" value="${r}" ${i===4?'checked':''}><span>${r}</span></label>`).join('')}</div></div>
   <div class="fld"><span class="fl">Igrejas</span><div class="cpick">${IGREJAS.map((g,i)=>`<label><input type="checkbox" name="ig" value="${g.id}" ${!i?'checked':''}><span class="dot" style="width:26px;height:26px;border-radius:8px;background:var(--brand-soft);color:var(--brand-text);display:grid;place-items:center">${ic('church',13)}</span><span><b>${esc(g.n)}</b></span><i class="cb">${ic('check',12,2.8)}</i></label>`).join('')}</div><span class="err"></span></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Enviar convite</button></div></form>`);
  const f=$('#uiF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(el,m)=>{el.classList.add('bad');el.querySelector('.err').textContent=m;ok=false;};
   const em=fd.get('e').trim(),n=fd.get('n').trim();if(!/^\S+@\S+\.\S+$/.test(em))bad(f.e.closest('.fld'),em?'E-mail inválido':'Informe o e-mail');else if(USERS.some(u=>u.e===em))bad(f.e.closest('.fld'),'Esse e-mail já tem acesso');
   if(n.split(' ').length<2)bad(f.n.closest('.fld'),'Informe nome e sobrenome');if(!fd.getAll('ig').length)bad($('.cpick').closest('.fld'),'Escolha ao menos uma igreja');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{const r=fd.get('role');USERS.push(U(n,em,r,fd.getAll('ig'),r==='Administrador'?JSON.parse(JSON.stringify(ALL)):PM({}),'convite enviado','menta'));closeDlg();render();toast(`Convite enviado para ${em}`);},800);});},
 nMenu:v=>{const p=$('#nPop-'+v);closePops(p);p.classList.toggle('open');},
 nAdd:()=>simpleDlg('Nova rede','Nome da rede','Ex.: Rede Alva Litoral',v=>{if(NETS.some(n=>norm(n.n)===norm(v))){toast('Já existe uma rede com esse nome');return;}NETS.push({id:'n'+Date.now(),n:v,glob:['u1']});render();toast(`${v} criada`);}),
 nDel:v=>{closePops();const n=NETS.find(x=>x.id===v),gs=IGREJAS.filter(g=>g.rede===v);confirmDel({title:`Excluir ${n.n}?`,body:`${gs.length?`${gs.map(g=>g.n).join(', ')} fica${gs.length>1?'m':''} sem rede. `:''}Os ${n.glob.length} acessos globais desta rede são removidos. As igrejas e os dados não são apagados.`,label:'Excluir rede',typed:gs.length?n.n:null,onConfirm:()=>{NETS.splice(NETS.indexOf(n),1);gs.forEach(g=>g.rede='');render();toast(`${n.n} excluída`);}});},
 gAdd:v=>{closePops();simpleDlg('Adicionar igreja','Nome da igreja','Ex.: Alva Santos',x=>{IGREJAS.push({id:'g'+Date.now(),n:x,rede:v});render();toast(`${x} adicionada`);});},
 nGlob:v=>{const n=NETS.find(x=>x.id===v),cand=USERS.filter(u=>!n.glob.includes(u.id));openDlg(`${dlgHead('Acesso global',`Quem pode ver todas as igrejas da ${esc(n.n)}?`)}<div class="pick">${cand.map(u=>`<label class="pk">${uAv(u)}<span><b>${esc(u.n)}</b><small>${u.role}</small></span><input type="radio" name="gu" value="${u.id}"></label>`).join('')||'<p class="who">Todos já têm acesso global.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="nDoGlob" data-v="${v}">Dar acesso</button></div>`,'sm');},
 nDoGlob:v=>{const s=$('input[name=gu]:checked');if(!s){toast('Escolha um usuário');return;}NETS.find(x=>x.id===v).glob.push(s.value);closeDlg();render();toast(`${uById(s.value).n.split(' ')[0]} agora vê toda a rede`);},
 aTab:v=>{S.atab=v;render();},
 aFilter:v=>{S.af=v;$('#abody').innerHTML=aLog();admAfter();},
 lProc:v=>{const x=LGPD.find(l=>l.id===v),fin=()=>{x.st='concluido';x.done='2026-09-30';LOG.unshift({u:'Rafael Pereira',a:x.type.startsWith('Exclus')?'Excluiu':'Aprovou',e:'Pedido LGPD',x:x.n,det:x.type,d:'2026-09-30',t:new Date().toTimeString().slice(0,5)});render();};
  if(x.type.startsWith('Exclus'))confirmDel({title:`Excluir a conta de ${x.n}?`,body:'Os dados pessoais são apagados de forma permanente, como pede a LGPD. Registros financeiros ficam anonimizados pelo prazo legal. Esta ação não pode ser desfeita.',label:'Excluir dados pessoais',typed:x.n.split(' ')[0],onConfirm:()=>{fin();toast(`Pedido de ${x.n.split(' ')[0]} concluído · comprovante enviado`);}});
  else{fin();toast('Arquivo gerado e enviado por e-mail');}},
};

/* ================= Acesso: entrar, recuperar, convite, escolher igreja, cadastrar igreja ================= */
Object.assign(S,{auth:'login',authErr:0,authEmail:'',authUser:null,signStep:1,sign:{}});
const RROLE={g1:'Administrador',g2:'Administrador',g3:'Administrador'};
const brand=()=>`<aside class="au-brand">
 <div class="au-top">${logo(26,!S.auAnim)}</div>
 <div class="au-mid"><p class="au-line">O cuidado da sua igreja,<br>em <em>um só lugar</em>.</p><p class="au-sub">Pessoas, comunidade, cuidado e operação para quem lidera, em todas as igrejas da sua rede.</p></div>
 <div class="au-hz ${S.auAnim?'still':''}" aria-hidden="true"><span class="au-sun"></span><span class="au-line2"></span></div>
 <p class="au-foot">Alva Web · painel de gestão</p></aside>`;
const eye=`<button type="button" class="au-eye" data-a="auEye" aria-label="Mostrar senha">${ic('eye',18)}</button>`;
const back=(to,l)=>`<button class="lnk au-back" data-a="auGo" data-v="${to}">${ic('chevL',15,2)}${l}</button>`;
function authView(){
 const v=S.auth;let body='';
 if(v==='login'){const locked=S.authErr>=5;body=`
  <div class="au-h"><h1>Entrar no painel</h1><p>Use o e-mail cadastrado pela sua igreja.</p></div>
  <form id="auF" class="au-form" novalidate>
   <label class="fld"><span class="fl">E-mail</span><input name="e" type="email" autocomplete="username" placeholder="nome@suaigreja.com.br" value="${esc(S.authEmail)}" ${locked?'disabled':''}><span class="err"></span></label>
   <label class="fld"><span class="fl au-fl">Senha<button type="button" class="lnk" data-a="auGo" data-v="forgot">Esqueci minha senha</button></span><span class="au-pw"><input name="p" type="password" autocomplete="current-password" placeholder="Sua senha" ${locked?'disabled':''}>${eye}</span><span class="err"></span></label>
   ${S.authErr&&!locked?`<p class="au-warn">${ic('alert',14,2)}E-mail ou senha incorretos. ${5-S.authErr} ${5-S.authErr===1?'tentativa restante':'tentativas restantes'}.</p>`:''}
   ${locked?`<div class="au-lock">${ic('lock',16,2)}<div><b>Acesso bloqueado por 15 minutos</b><span>Por segurança, depois de 5 tentativas. Você pode redefinir a senha agora.</span></div></div>`:''}
   <label class="tog au-keep"><input type="checkbox" name="keep" checked><span class="sw"></span><span><b>Manter conectado</b><small>Neste dispositivo, por 30 dias</small></span></label>
   <button class="btn pri au-cta" type="submit" ${locked?'disabled':''}>Entrar</button>
   ${locked?`<button type="button" class="btn sec au-cta" data-a="auGo" data-v="forgot">Redefinir senha</button>`:''}
  </form>
  <div class="au-alt"><button class="au-opt" data-a="auGo" data-v="invite">${ic('mail',18)}<span><b>Primeiro acesso</b><small>Recebi um convite por e-mail</small></span>${ic('chevR',16)}</button>
   <button class="au-opt" data-a="auGo" data-v="signup">${ic('church',18)}<span><b>Cadastrar minha igreja</b><small>Para pastores e secretarias</small></span>${ic('chevR',16)}</button></div>
  <p class="au-demo">Demonstração: qualquer e-mail entra. Senha <code>errada</code> mostra o erro. Um e-mail com <code>novo</code> não tem conta.</p>`;}
 else if(v==='forgot')body=`${back('login','Voltar para entrar')}<div class="au-h"><h1>Redefinir senha</h1><p>Enviamos um link para criar uma nova senha. Ele vale por 1 hora.</p></div>
  <form id="fgF" class="au-form" novalidate><label class="fld"><span class="fl">E-mail</span><input name="e" type="email" autocomplete="email" placeholder="nome@suaigreja.com.br" value="${esc(S.authEmail)}"><span class="err"></span></label><button class="btn pri au-cta" type="submit">Enviar link</button></form>`;
 else if(v==='sent')body=`<div class="au-done"><span class="au-ic">${ic('mail',24)}</span><h1>Confira seu e-mail</h1><p>Se <b>${esc(S.authEmail||'seu e-mail')}</b> tiver uma conta, o link chega em instantes. Olhe também o spam.</p>
  <button class="btn sec au-cta" id="resend" data-a="auResend" disabled>Reenviar em 30s</button>${back('login','Voltar para entrar')}</div>`;
 else if(v==='invite'){const code=S.inviteOk;body=`${back('login','Voltar para entrar')}
  ${!code?`<div class="au-h"><h1>Primeiro acesso</h1><p>Digite o código de 6 dígitos do convite que chegou no seu e-mail.</p></div>
   <form id="ivF" class="au-form" novalidate><div class="au-otp" id="otp">${Array.from({length:6},(_,i)=>`<input inputmode="numeric" maxlength="1" aria-label="Dígito ${i+1}" autocomplete="one-time-code">`).join('')}</div><span class="err au-otperr"></span>
   <button class="btn pri au-cta" type="submit">Continuar</button><p class="who" style="text-align:center;margin:0">Não recebeu? Peça para a secretaria reenviar o convite.</p></form>`
  :`<div class="au-inv"><span class="av" style="background:var(--tone-ceu);color:var(--tone-ceu-ink)">RP</span><p><b>Rafael Pereira</b> convidou você para a <b>Alva Sede — Centro</b> como <span class="stp" style="--c:var(--st-ace);--b:var(--st-ace-bg)"><i></i>Líder</span></p></div>
   <div class="au-h"><h1>Crie sua senha</h1><p>Confirme seu nome e escolha uma senha para entrar.</p></div>
   <form id="pwF" class="au-form" novalidate>
    <label class="fld"><span class="fl">Nome completo</span><input name="n" value="Ana Lima" autocomplete="name"><span class="err"></span></label>
    <label class="fld"><span class="fl">E-mail</span><input value="ana.lima@alvaigreja.com.br" disabled></label>
    <label class="fld"><span class="fl">Senha</span><span class="au-pw"><input name="p" type="password" autocomplete="new-password" placeholder="Crie uma senha">${eye}</span><span class="err"></span></label>
    <ul class="au-rules" id="rules"><li data-r="len">Pelo menos 8 caracteres</li><li data-r="num">Um número</li><li data-r="case">Letras maiúsculas e minúsculas</li></ul>
    <label class="au-terms"><input type="checkbox" name="t"><span class="cb">${ic('check',12,2.8)}</span><span>Li e aceito os <a href="#" onclick="return false">termos de uso</a> e a <a href="#" onclick="return false">política de privacidade</a>.</span></label><span class="err au-terr"></span>
    <button class="btn pri au-cta" type="submit">Criar senha e entrar</button></form>`}`;}
 else if(v==='church'){const u=S.authUser,META={g1:['São Paulo, SP',1240,'Administrador'],g2:['São Paulo, SP',380,'Pastor'],g3:['Campinas, SP',210,'Líder']};
  body=`<div class="au-who">${uAv(u)}<span class="dkt"><b>${esc(u.n)}</b><span>${esc(S.authEmail||u.e)}</span></span></div>
  <div class="au-h"><h1>Selecione a igreja</h1><p>${u.igs.length>1?`Você tem acesso a ${u.igs.length} igrejas. O seu papel pode ser diferente em cada uma.`:'Confirme a igreja para entrar no painel.'}</p></div>
  <div class="au-ch">${NETS.map(n=>{const gs=IGREJAS.filter(g=>g.rede===n.id&&u.igs.includes(g.id));return gs.length?`<p class="au-net">${esc(n.n)}${n.glob.includes(u.id)?' <span class="soft">· acesso a toda a rede</span>':''}</p>${gs.map(g=>{const m=META[g.id]||['',0,u.role];return `<button class="au-ig" data-a="auPick" data-v="${g.id}"><span class="au-igd">${initials(g.n.split(' — ')[0])}</span><span class="dkt"><b>${esc(g.n)}</b><span>${m[0]} · ${m[1].toLocaleString('pt-BR')} membros${g.id===u.cur?' · último acesso':''}</span></span>${rPill(m[2])}</button>`;}).join('')}`:'';}).join('')}</div>
  <label class="tog au-keep"><input type="checkbox" id="remCh"><span class="sw"></span><span><b>Lembrar minha escolha</b><small>Troque de igreja a qualquer momento pelo menu</small></span></label>
  <button class="btn sec au-cta" data-a="auGo" data-v="login">${ic('chevL',15,2)}Trocar de conta</button>`;}
 else if(v==='signup'){const st=S.signStep,d=S.sign;body=`${back(st===1?'login':'signup1',st===1?'Voltar para entrar':'Voltar')}
  <div class="au-steps"><span class="${st>=1?'on':''}"><i>1</i>Igreja</span><b></b><span class="${st>=2?'on':''}"><i>2</i>Responsável</span></div>
  ${st===1?`<div class="au-h"><h1>Cadastre sua igreja</h1><p>Leva 2 minutos. Nossa equipe confirma o cadastro em até 1 dia útil.</p></div>
   <form id="s1F" class="au-form" novalidate>
    <label class="fld"><span class="fl">Nome da igreja</span><input name="n" value="${esc(d.n||'')}" placeholder="Ex.: Alva Santos"><span class="err"></span></label>
    <div class="au-2"><label class="fld"><span class="fl">Cidade</span><input name="c" value="${esc(d.c||'')}" placeholder="Santos"><span class="err"></span></label><label class="fld"><span class="fl">UF</span><input name="uf" maxlength="2" value="${esc(d.uf||'')}" placeholder="SP" style="text-transform:uppercase"><span class="err"></span></label></div>
    <div class="fld"><span class="fl">Faz parte de uma rede?</span><div class="vis" id="netG">
     <label><input type="radio" name="net" value="nova" ${!d.net||d.net==='nova'?'checked':''}><span><b>Não, é independente</b><small>Você poderá criar uma rede depois, em Administração.</small></span></label>
     ${NETS.map(n=>`<label><input type="radio" name="net" value="${n.id}" ${d.net===n.id?'checked':''}><span><b>${esc(n.n)}</b><small>Um administrador da rede aprova a entrada.</small></span></label>`).join('')}</div></div>
    <button class="btn pri au-cta" type="submit">Continuar</button></form>`
  :`<div class="au-h"><h1>Quem vai administrar?</h1><p>Essa pessoa recebe acesso de Administrador na ${esc(d.n)}.</p></div>
   <form id="s2F" class="au-form" novalidate>
    <label class="fld"><span class="fl">Nome completo</span><input name="rn" autocomplete="name" placeholder="Nome e sobrenome"><span class="err"></span></label>
    <label class="fld"><span class="fl">E-mail</span><input name="re" type="email" autocomplete="email" placeholder="nome@suaigreja.com.br"><span class="err"></span></label>
    <label class="fld"><span class="fl">Telefone</span><input name="rp" type="tel" inputmode="tel" placeholder="(11) 90000-0000"><span class="err"></span></label>
    <label class="fld"><span class="fl">Senha</span><span class="au-pw"><input name="p" type="password" autocomplete="new-password" placeholder="Crie uma senha">${eye}</span><span class="err"></span></label>
    <ul class="au-rules" id="rules"><li data-r="len">Pelo menos 8 caracteres</li><li data-r="num">Um número</li><li data-r="case">Letras maiúsculas e minúsculas</li></ul>
    <label class="au-terms"><input type="checkbox" name="t"><span class="cb">${ic('check',12,2.8)}</span><span>Li e aceito os <a href="#" onclick="return false">termos de uso</a> e a <a href="#" onclick="return false">política de privacidade</a>.</span></label><span class="err au-terr"></span>
    <button class="btn pri au-cta" type="submit">Enviar cadastro</button></form>`}`;}
 else if(v==='signupDone'){const d=S.sign,net=NETS.find(n=>n.id===d.net);body=`<div class="au-done"><span class="au-ic ok">${ic('check',24,2.4)}</span><h1>Cadastro enviado</h1><p>Recebemos a <b>${esc(d.n)}</b>. ${net?`Um administrador da <b>${esc(net.n)}</b> vai aprovar a entrada`:'Nossa equipe confirma em até 1 dia útil'} e avisamos em <b>${esc(d.re)}</b>.</p>
  <ol class="au-next"><li class="done"><i>${ic('check',12,2.8)}</i>Cadastro recebido</li><li><i>2</i>${net?'Aprovação da rede':'Verificação da igreja'}</li><li><i>3</i>Acesso liberado por e-mail</li></ol>
  <button class="btn sec au-cta" data-a="auGo" data-v="login">Voltar para entrar</button></div>`;}
 return `<div class="au">${brand()}<main class="au-main"><div class="au-card rise">${body}</div><p class="au-legal">© 2026 Alva · <a href="#" onclick="return false">Privacidade</a> · <a href="#" onclick="return false">Ajuda</a></p></main></div>`;
}
const pwRules=v=>({len:v.length>=8,num:/\d/.test(v),case:/[a-z]/.test(v)&&/[A-Z]/.test(v)});
function bindPw(f){const p=f.querySelector('[name=p]'),r=$('#rules');if(!p||!r)return;p.addEventListener('input',()=>{const s=pwRules(p.value);r.querySelectorAll('li').forEach(li=>li.classList.toggle('ok',s[li.dataset.r]));});}
function fBad(f,n,m){const i=typeof n==='string'?f.querySelector(`[name=${n}]`):n;const fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;return i;}
function authAfter(){
 if(!S.auAnim)setTimeout(()=>S.auAnim=true,50);
 const all=$$('#auth form');all.forEach(f=>{f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');});bindPw(f);});
 const lf=$('#auF');if(lf){setTimeout(()=>(lf.e.value?lf.p:lf.e).focus(),80);lf.addEventListener('submit',e=>{e.preventDefault();const em=lf.e.value.trim(),pw=lf.p.value;let first=null;
  if(!/^\S+@\S+\.\S+$/.test(em))first=fBad(lf,'e',em?'E-mail inválido':'Informe seu e-mail');if(!pw)first=first||fBad(lf,'p','Informe sua senha');if(first){first.focus();return;}
  S.authEmail=em;const b=lf.querySelector('[type=submit]');b.classList.add('busy');
  setTimeout(()=>{if(/novo/i.test(em)){b.classList.remove('busy');fBad(lf,'e','Não encontramos uma conta com este e-mail. Se foi convidado, use o primeiro acesso.').focus();return;}
   if(pw.toLowerCase()==='errada'){S.authErr++;render();const c=$('.au-card');c.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:260});if(S.authErr<5)$('#auF [name=p]').focus();return;}
   S.authErr=0;S.authUser=USERS[0];S.auth='church';render();},900);});}
 const ff=$('#fgF');if(ff){ff.e.focus();ff.addEventListener('submit',e=>{e.preventDefault();const em=ff.e.value.trim();if(!/^\S+@\S+\.\S+$/.test(em)){fBad(ff,'e',em?'E-mail inválido':'Informe seu e-mail').focus();return;}S.authEmail=em;ff.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{S.auth='sent';render();},900);});}
 const rs=$('#resend');if(rs){let t=30;const it=setInterval(()=>{t--;if(!document.body.contains(rs)){clearInterval(it);return;}if(t<=0){clearInterval(it);rs.disabled=false;rs.textContent='Reenviar link';}else rs.textContent=`Reenviar em ${t}s`;},1000);}
 const otp=$$('#otp input');if(otp.length){otp[0].focus();otp.forEach((i,k)=>{i.addEventListener('input',()=>{i.value=i.value.replace(/\D/g,'').slice(-1);$('.au-otperr').textContent='';$('#otp').classList.remove('bad');if(i.value&&otp[k+1])otp[k+1].focus();if(otp.every(x=>x.value))$('#ivF').requestSubmit();});
  i.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!i.value&&otp[k-1])otp[k-1].focus();});i.addEventListener('paste',e=>{const d=(e.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,6);if(d.length){e.preventDefault();d.split('').forEach((c,j)=>{if(otp[j])otp[j].value=c;});otp[Math.min(d.length,5)].focus();if(d.length===6)$('#ivF').requestSubmit();}});});
  $('#ivF').addEventListener('submit',e=>{e.preventDefault();const c=otp.map(x=>x.value).join('');if(c.length<6){$('#otp').classList.add('bad');$('.au-otperr').textContent='Digite os 6 dígitos';return;}
   const b=$('#ivF [type=submit]');b.classList.add('busy');setTimeout(()=>{if(c==='000000'){b.classList.remove('busy');$('#otp').classList.add('bad');$('.au-otperr').textContent='Código inválido ou expirado. Peça um novo convite.';otp.forEach(x=>x.value='');otp[0].focus();return;}S.inviteOk=true;render();},800);});}
 const pf=$('#pwF');if(pf)pf.addEventListener('submit',e=>{e.preventDefault();let first=null;if(pf.n.value.trim().split(' ').length<2)first=fBad(pf,'n','Informe nome e sobrenome');const s=pwRules(pf.p.value);if(!s.len||!s.num||!s.case)first=first||fBad(pf,'p','A senha ainda não atende aos requisitos');if(!pf.t.checked){$('.au-terr').textContent='Aceite os termos para continuar';$('.au-terr').style.display='block';first=first||pf.t;}if(first){first.focus();return;}
  pf.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{S.inviteOk=false;S.authUser={...USERS[1],igs:['g1']};S.auth='church';render();},900);});
 const s1=$('#s1F');if(s1){s1.n.focus();s1.addEventListener('submit',e=>{e.preventDefault();let first=null;const n=s1.n.value.trim();if(!n)first=fBad(s1,'n','Informe o nome da igreja');else if(IGREJAS.some(g=>norm(g.n)===norm(n)))first=fBad(s1,'n','Já existe uma igreja com esse nome no Alva');if(!s1.c.value.trim())first=first||fBad(s1,'c','Informe a cidade');if(!/^[a-z]{2}$/i.test(s1.uf.value.trim()))first=first||fBad(s1,'uf','UF');if(first){first.focus();return;}
  Object.assign(S.sign,{n,c:s1.c.value.trim(),uf:s1.uf.value.trim().toUpperCase(),net:new FormData(s1).get('net')});S.signStep=2;render();});}
 const s2=$('#s2F');if(s2){s2.rn.focus();const ph=s2.rp;ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  s2.addEventListener('submit',e=>{e.preventDefault();let first=null;if(s2.rn.value.trim().split(' ').length<2)first=fBad(s2,'rn','Informe nome e sobrenome');const em=s2.re.value.trim();if(!/^\S+@\S+\.\S+$/.test(em))first=first||fBad(s2,'re',em?'E-mail inválido':'Informe o e-mail');else if(USERS.some(u=>u.e===em))first=first||fBad(s2,'re','Este e-mail já tem conta. Entre e peça acesso à nova igreja.');
   if(s2.rp.value.replace(/\D/g,'').length<10)first=first||fBad(s2,'rp','Telefone incompleto');const s=pwRules(s2.p.value);if(!s.len||!s.num||!s.case)first=first||fBad(s2,'p','A senha ainda não atende aos requisitos');if(!s2.t.checked){$('.au-terr').textContent='Aceite os termos para continuar';$('.au-terr').style.display='block';first=first||s2.t;}if(first){first.focus();return;}
   S.sign.re=em;s2.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{S.auth='signupDone';S.signStep=1;render();},1000);});}
}
const AU={
 auGo:v=>{if(v==='signup1'){S.signStep=1;S.auth='signup';}else{if(v==='signup'&&S.auth!=='signup'){S.signStep=1;S.sign={};}if(v==='invite')S.inviteOk=false;S.auth=v;}render();window.scrollTo({top:0});},
 auEye:(v,b)=>{const i=b.parentNode.querySelector('input');const show=i.type==='password';i.type=show?'text':'password';b.innerHTML=ic(show?'eyeOff':'eye',18);b.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');i.focus();},
 auResend:(v,b)=>{b.disabled=true;toast('Link reenviado');let t=30;const it=setInterval(()=>{t--;if(t<=0){clearInterval(it);b.disabled=false;b.textContent='Reenviar link';}else b.textContent=`Reenviar em ${t}s`;},1000);},
 auPick:(v,b)=>{b.classList.add('pk-on');setTimeout(()=>{const i=CHURCHES.findIndex(c=>norm(gById(v).n).includes(norm(c.n.replace('Alva ',''))));S.church=i<0?0:i;S.auth=null;S.active='hoje';S.animated=false;render();window.scrollTo({top:0});toast(`Você está em ${gById(v).n}`);},350);},
};
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

function busy(b,ms,label,fn){b.classList.add('busy');setTimeout(()=>{b.classList.remove('busy');b.classList.add('ok');const o=b.innerHTML;b.innerHTML=`${ic('check',15,2.4)}${label}`;fn&&fn();},ms);}
function setDone(id,v){const t=TASKS.find(x=>x.id===id);t.done=v;const el=$('#'+id);el.classList.toggle('gone',v);
 if(v)setTimeout(()=>{if(t.done)el.style.display='none';},380);else el.style.display='';
 $('#allDone').style.display=openCount()?'none':'';
 const n=openCount(),c=$('#cnt');c.textContent=n;c.style.visibility=n?'':'hidden';c.animate([{transform:'scale(1.3)'},{transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
 $('#undoAll').style.display=n<3&&n>0?'':'none';$('#lede').innerHTML=lede(n);softSide();}
const A={
 nav:v=>{S.active=v;S.member=null;S.integ=null;S.disc=null;S.casa=null;S.chamada=null;S.mini=null;S.user=null;closePops();$('#side').classList.remove('open');render();window.scrollTo({top:0});},
 churchMenu:()=>{const p=$('#churchPop');closePops(p);p.classList.toggle('open');},
 setChurch:v=>{S.church=+v;softSide();toast(`Agora em ${CHURCHES[S.church].n}`);},
 meMenu:()=>{const p=$('#mePop');closePops(p);p.classList.toggle('open');},
 theme:v=>{S.theme=v;try{localStorage.setItem('alva-web-theme',v);}catch(e){}document.documentElement.dataset.theme=v;$$('#mePop .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 soon:v=>{closePops();toast(`${v}: em breve no protótipo`);},
 openMobile:()=>{closePops();window.open(window.ALVA_MOBILE_URL||'https://claude.ai/artifact/NPBFaCUv4QQvtrKt9YsSxU','_blank','noopener');},
 logout:()=>{closePops();S.auth='login';S.authErr=0;render();window.scrollTo({top:0});},
 cmd:()=>cmdOpen(),
 side:()=>$('#side').classList.add('open'),
 navToggle:v=>{const t=$(`.ni.par[data-v=${v}]`).closest('.ntree');const open=!t.classList.contains('open');S.navOpen[v]=open;t.classList.toggle('open',open);t.querySelector('.par').setAttribute('aria-expanded',open);const cb=t.querySelector('.par .cnt');if(open&&cb)cb.remove();else if(!open&&!cb&&!TASKS[0].done&&v==='pessoas')t.querySelector('.par .chev').insertAdjacentHTML('beforebegin',cntBadge());},
 closeSide:()=>$('#side').classList.remove('open'),
 done:v=>{setDone(v,true);const lab={t1:'Acolhimento',t2:'Escala de domingo',t3:'Escalas de outubro'}[v];toast(`${lab} marcado como resolvido`,()=>setDone(v,false));},
 undoAll:()=>TASKS.forEach(t=>t.done&&setDone(t.id,false)),
 goTask:v=>{const t=TASKS.find(x=>x.id===v);A.nav(t.area);},
 remind:(v,b)=>busy(b,1100,'Enviado',()=>toast('Lembrete enviado para Bruno, Clara, Diego e Elisa')),
 team:v=>toast(`Escala de ${v}: detalhes em breve`),
 event:v=>toast(`${NEXT[v].t}: detalhes em breve`),
 day:v=>{S.day=+v;$$('.day').forEach((d,i)=>d.setAttribute('aria-pressed',i===S.day));const n=$('#daynote');n.innerHTML=dayNote();n.animate([{opacity:0,transform:'translateY(3px)'},{opacity:1,transform:'none'}],{duration:260});},
 range:v=>{if(S.range===v)return;S.range=v;$$('.segc button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));$('#chart').innerHTML=chartSVG();bindChart();$('.kpi .kd.up').textContent=v==='12s'?'+14 no período':'+20 no período';},
 bday:(v,b)=>{const x=BDAYS[+v];if(x.sent){toast(`Você já felicitou ${x[0].n.split(' ')[0]}`);return;}x.sent=true;b.classList.add('sent');toast(`Felicitação enviada para ${x[0].n.split(' ')[0]}`,()=>{x.sent=false;b.classList.remove('sent');});},
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');
 if(!e.target.closest('.pop')&&!(b&&/Menu$/.test(b.dataset.a)))closePops();
 if(e.target.closest('.veil'))$('#side').classList.remove('open');
 if(b&&A[b.dataset.a]&&!b.disabled){A[b.dataset.a](b.dataset.v,b,e);}
});
document.addEventListener('keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#scrim').classList.contains('open')?cmdClose():cmdOpen();return;}
 if(e.key==='Escape'){cmdClose();closePops();closeDlg();$('#side').classList.remove('open');}
 if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&$('#mq')){e.preventDefault();$('#mq').focus();}
 if(e.key==='Enter'&&document.activeElement.classList.contains('mrow')){PA.open(document.activeElement.dataset.v);}
 if($('#scrim').classList.contains('open')){if(e.key==='ArrowDown'){e.preventDefault();cmdMove(1);}if(e.key==='ArrowUp'){e.preventDefault();cmdMove(-1);}if(e.key==='Enter'){e.preventDefault();cmdPick(sel);}}
});
$('#q').addEventListener('input',e=>cmdList(e.target.value));
$('#res').addEventListener('click',e=>{const b=e.target.closest('.ri');if(b)cmdPick(+b.dataset.i);});
$('#res').addEventListener('mousemove',e=>{const b=e.target.closest('.ri');if(b&&+b.dataset.i!==sel){sel=+b.dataset.i;$$('.ri').forEach(x=>x.classList.toggle('sel',x===b));}});
$('#scrim').addEventListener('click',e=>{if(e.target.id==='scrim')cmdClose();});
Object.assign(A,PA,IA,DA,CA,HA,RA,KA,AA,AU);
render();
