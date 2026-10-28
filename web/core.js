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
 pacifier:'<circle cx="12" cy="5" r="2.6"/><path d="M12 7.6V10"/><path d="M12 10c-2-1.7-6.2-1.9-7.4.3-.9 1.7.5 3.8 2.9 4.1 1.8.3 3.4-.3 4.5-1.3 1.1 1 2.7 1.6 4.5 1.3 2.4-.3 3.8-2.4 2.9-4.1-1.2-2.2-5.4-2-7.4-.3z"/><path d="M10.9 14c-.3.9-.9 2-.9 3.3a2 2 0 0 0 4 0c0-1.3-.6-2.4-.9-3.3"/>',
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
 chevD:'<path d="m6 9 6 6 6-6"/>',
 expand:'<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
 collapse:'<path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/>',
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
const S={navOpen:{},theme:'dia',church:0,active:'hoje',day:2,range:'12s',platformRole:null};
try{const t=localStorage.getItem('alva-web-theme');if(t)S.theme=t;}catch(e){}
const NETWORK='Rede Alva';
const CHURCHES=[{n:'Alva Sede',c:'Centro',i:'AS',city:'São Paulo, SP',m:1240,role:'Administrador',tone:'ceu',last:'agora'},{n:'Alva Norte',c:'Santana',i:'AN',city:'São Paulo, SP',m:380,role:'Pastor',tone:'menta',last:'há 2 dias'},{n:'Alva Jardins',c:'Jardim Europa',i:'AJ',city:'São Paulo, SP',m:290,role:'Líder',tone:'damasco',last:'há 1 semana'},{n:'Alva Campinas',c:'Cambuí',i:'AC',city:'Campinas, SP',m:210,role:'Líder',tone:'rosado',last:'há 3 semanas'}];
const chTile=()=>'';
const NAV=[
 ['Geral',[['hoje','dawn','Dashboard'],['pessoas','users','Pessoas',[['membros','Membros'],['integracao','Integração']]],['cuidado','heart','Cuidado',[['discipulado','Discipulado'],['acompanhamento','Acompanhamento'],['oracao','Pedidos de oração']]],['comunidade','home','Comunidade',[['casas','Casas de Apascentamento'],['redes','Redes de casa'],['ministerios','Ministérios']]],['kids','baby','Kids',[['kvis','Visão geral'],['ksalas','Salas'],['ktimes','Times'],['kplano','Planejamento'],['kescalas','Escalas'],['kturmas','Turmas']]]]],
 ['Operação',[['agenda','calendar','Agenda',[['eventos','Eventos'],['cultos','Cultos'],['bebes','Apresentações'],['batismos','Batismos'],['consagracoes','Consagrações'],['casamentos','Casamentos'],['integracoes','Integrações'],['calendario','Calendário'],['escalas','Escalas'],['ag-insc','Inscrições']]],['espacos','building','Espaços',[['salas','Salas'],['reservas','Reservas']]],['shop','bag','Loja', [['shop-vis','Visão geral'],['shop-items','Itens'],['shop-cats','Categorias'],['shop-sales','Vendas'],['shop-cash','Caixa diário'],['shop-moves','Movimentações']]],['almox','box','Almoxarifado',[['arel','Visão geral'],['aitens','Itens'],['acat','Categorias'],['aemp','Empréstimos'],['adev','Devoluções'],['amov','Movimentações']]],["cafe", "coffee", "Cafeteria", [["cafe-vis", "Visão geral"], ["cafe-items", "Itens"], ["cafe-cats", "Categorias"], ["cafe-sales", "Vendas"], ["cafe-cash", "Caixa diário"], ["cafe-moves", "Movimentações"]]],["rest", "chef", "Restaurante", [["rest-vis", "Visão geral"], ["rest-items", "Itens"], ["rest-cats", "Categorias"], ["rest-sales", "Vendas"], ["rest-cash", "Caixa diário"], ["rest-moves", "Movimentações"]]]]],
 ['Comunicação',[['conteudo','layers','Conteúdo',[['pregacoes','Pregações'],['videos','Vídeos'],['musicas','Músicas'],['series','Séries'],['jornadas','Jornadas'],['cursos','Cursos'],['material','Material de apoio']]],['comunicacao','megaphone','Comunicação',[['noticias','Notícias'],['push','Notificações'],['banners','Banners'],['transmissoes','Transmissões']]]]],
 ['Gestão',[['financeiro','wallet','Financeiro',[['fvis','Visão geral'],['flanc','Lançamentos'],['fpag','Contas a pagar'],['frec','Contas a receber'],['fapr','Aprovações'],['frel','Análises'],['fimp','Importar e exportar'],['fdoa','Doações']]],['admin','shield','Administração',[['usuarios','Usuários e permissões'],['visitantes','Visitantes'],['superusuarios','Superusuários'],['recursos-plataforma','Recursos habilitados'],['parametros','Parâmetros do sistema'],['multi','Multi-igreja'],['auditoria','Auditoria e LGPD']]]]],
];
const P=(n,t)=>({n,t,i:n.split(' ').map(w=>w[0]).slice(0,2).join('')});
const WAITING=[P('Carlos Mendes','ceu'),P('Luana Souza','damasco'),P('Paulo Alves','menta')];
const PENDING=[P('Bruno Reis','rosado'),P('Clara Nunes','lima'),P('Diego Faria','ceu'),P('Elisa Moura','salvia')];
const DRAFTS=[['Louvor',75],['Recepção',40],['Kids',20]];
const TASKS=[{id:'t1',area:'integracao'},{id:'t2',area:'escalas'}];
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
  <button class="church" data-a="churchMenu" aria-haspopup="menu"><span class="cn"><small class="ch-net">${NETWORK}</small><b>${c.n}</b><span>${c.c} · ${c.role}</span></span><span class="chv">${ic('updown',14)}</span></button>
  <div class="pop chpop" id="churchPop" role="menu"><div class="chp-h"><span>${ic('church',14)}${NETWORK}</span><small>${CHURCHES.length} igrejas</small></div>
   ${CHURCHES.length>4?`<label class="sbox chp-q">${ic('search',14)}<input placeholder="Buscar igreja" oninput="this.closest('.chpop').querySelectorAll('.chp-i').forEach(b=>b.hidden=!norm(b.dataset.n).includes(norm(this.value)))"></label>`:''}
   <div class="chp-l">${CHURCHES.map((x,i)=>`<button class="chp-i ${i===S.church?'on':''}" role="menuitemradio" aria-checked="${i===S.church}" data-a="setChurch" data-v="${i}" data-n="${esc(x.n+' '+x.c)}">${chTile(x,36)}<span class="dkt"><b>${esc(x.n)}</b><span>${esc(x.c)} · ${x.m.toLocaleString('pt-BR')} membros</span></span><span class="chp-r"><small>${x.role}</small>${i===S.church?`<span class="chp-ck">${ic('check',12,2.8)}</span>`:''}</span></button>`).join('')}</div>
   <div class="chp-f"><button class="pi" data-a="nav" data-v="multi">${ic('sliders',15)}Gerenciar igrejas da rede</button></div></div>
 </div>
 <button class="search" data-a="cmd">${ic('search',17)}<span>Buscar</span><kbd>⌘K</kbd></button>
 <nav class="nav" aria-label="Áreas">${NAV.map(g=>`${g[0]?`<div class="grp">${g[0]}</div>`:''}${g[1].filter(n=>modOn(n[0])).map(navItem).join('')}`).join('')}</nav>
 <div class="me">
  <button class="mebtn ${S.active==='perfil'?'on':''}" data-a="meMenu" aria-haspopup="menu"><span class="av">RP</span><span class="cn"><b>Rafael Pereira</b><span>Administrador</span></span>${ic('updown',16)}</button>
  <div class="pop" id="mePop" role="menu" style="left:0;right:0;bottom:calc(100% + 6px)">
   <div class="pl">Aparência</div>
   <div class="seg" role="group" aria-label="Tema"><button data-a="theme" data-v="dia" aria-pressed="${S.theme==='dia'}">Dia</button><button data-a="theme" data-v="noite" aria-pressed="${S.theme==='noite'}">Noite</button></div>
   <hr><button class="pi" data-a="myProfile">${ic('user',17)}Meu perfil</button><button class="pi" data-a="myProfile" data-v="pref">${ic('sliders',17)}Preferências</button><hr><button class="pi pi-out" data-a="logout">${ic('logout',17)}Sair</button>
  </div>
 </div>`;
}
const greet=()=>{const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';};
const today=()=>new Date(2026,8,30).toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});
const openCount=()=>TASKS.filter(t=>!t.done).length+(myUrgent().length?1:0);
function lede(n){return n?`<b>${n} ${n>1?'assuntos pedem':'assunto pede'}</b> sua atenção. O próximo culto é domingo, às 10h.`:'Tudo em dia. O próximo culto é domingo, às 10h.';}
function dayNote(){const w=WEEK[S.day];return w[2]?`<b>${w[0]==='qua'?'Hoje':w[0][0].toUpperCase()+w[0].slice(1)+', '+w[1]}</b>${esc(w[2])}`.replace('</b>','</b> · '):`<b>${w[0][0].toUpperCase()+w[0].slice(1)}, ${w[1]}</b> · Nada na agenda`;}

function actCards(){
 const [t1,t2]=TASKS;
 return `<div class="acts" id="acts">
  <article class="card act ${t1.done?'gone':''}" id="t1" style="${t1.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--warm)"></span>Acolhimento<button class="x" data-a="done" data-v="t1" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${WAITING.length}</span><span class="u">pessoas esperando o primeiro contato</span></div>
   <div class="viz"><div style="display:flex;align-items:center;gap:10px"><span class="stack">${WAITING.map(p=>av(p)).join('')}</span><span class="who"><b>Carlos</b>, Luana e Paulo</span></div><span class="age">A mais antiga espera há 3 dias</span></div>
   <div class="foot"><button class="btn pri" data-a="goTask" data-v="t1">Acolher agora</button></div>
  </article>
  <article class="card act ${t2.done?'gone':''}" id="t2" style="${t2.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--seq3)"></span>Escalas<button class="x" data-a="done" data-v="t2" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${PENDING.length}</span><span class="u">ainda sem resposta para o culto de domingo</span></div>
   <div class="viz"><div class="segl"><span><b>12</b>/16 aceitaram</span><span class="stack sm">${PENDING.map(p=>av(p)).join('')}</span></div><div class="segs" aria-label="12 de 16 aceitaram">${Array.from({length:16},(_,i)=>`<i class="${i<12?'':'off'}"></i>`).join('')}</div></div>
   <div class="act-sub"><p class="act-sh">Escalas de outubro<span>${DRAFTS.length} em rascunho · fecham dia 10</span></p><div class="drafts">${DRAFTS.map(d=>`<div class="dr"><span>${d[0]}</span><span class="tr"><i data-w="${d[1]}%"></i></span><b>${d[1]}%</b></div>`).join('')}</div></div>
   <div class="foot"><button class="btn pri" data-a="remind">Lembrar os ${PENDING.length}</button><button class="lnk" data-a="goTask" data-v="t2" style="margin-left:4px">Abrir escalas</button></div>
  </article>
  ${myTasksAct()}
  <article class="card act alldone" id="allDone" style="${openCount()?'display:none':''}">${logo(18,false)}<p>Tudo em dia por aqui.</p><span class="who">Nada pendente agora. Que tal olhar a escala de domingo com calma?</span><button class="lnk" data-a="undoAll">Restaurar pendências</button></article>
 </div>`;
}
function nextCard(){
 const conf=TEAMS.reduce((a,t)=>a+t[1],0),tot=TEAMS.reduce((a,t)=>a+t[2],0);
 return `<section class="nxw rise" style="--d:2" aria-labelledby="h-nx">
 <div class="sh"><h2 id="h-nx">Próximo encontro</h2><span class="pill">em 4 dias</span></div>
 <div class="card nx">
  <div class="nxh"><span class="nxd"><small>dom</small><b>4</b><small>out</small></span><div><h3>Culto de Celebração</h3><p class="when">10h · Templo principal · ~180 pessoas</p></div></div>
  <div class="nxt"><div class="nxth"><span>Equipe</span><span><b>${conf}</b> de ${tot} aceitaram</span></div>
   ${TEAMS.map(t=>`<button class="nxr" data-a="team" data-v="${t[0]}"><span class="nxn">${t[0]}</span><span class="pips">${Array.from({length:t[2]},(_,i)=>`<i class="${i<t[1]?'':'off'}"></i>`).join('')}</span><b class="${t[1]<t[2]?'lack':''}">${t[1]<t[2]?`faltam ${t[2]-t[1]}`:'completa'}</b></button>`).join('')}</div>
  <button class="btn lt" data-a="nav" data-v="escalas">Abrir escala</button>
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
  <div class="sh"><h2 id="h-tl">Depois disso</h2><button class="lnk" data-a="nav" data-v="calendario">Agenda ${ic('arrowR',14,2)}</button></div>
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
 <section class="card rise" style="--d:1;padding:56px 24px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center"><span class="av" style="width:52px;height:52px;border-radius:16px;background:var(--brand-soft);color:var(--brand-text)">${ic(n[1],22)}</span><p style="margin:6px 0 0;font:italic 400 24px/28px var(--font-serif)">Em construção.</p><span style="font:400 14px/20px var(--font-text);color:var(--ink-muted)">Envie o print da tela atual e redesenhamos seguindo o mesmo sistema.</span><button class="lnk" data-a="nav" data-v="hoje" style="margin-top:6px">Voltar para o Dashboard ${ic('arrowR',14,2)}</button></section>`;}
function topbar(){const c=CHURCHES[S.church];return `<button class="ibtn" data-a="side" aria-label="Abrir menu">${ic('menu',18)}</button>${logo(16,false)}<button class="ibtn" data-a="cmd" aria-label="Buscar">${ic('search',17)}</button><button class="ibtn" data-a="side" aria-label="${c.n}" style="background:var(--brand);color:var(--on-brand);box-shadow:none;font:700 11px/1 var(--font-text)">${c.i}</button>`;}
function render(){
 document.documentElement.dataset.theme=S.theme;
 if(S._navAct!==S.active){S._navAct=S.active;S.navOpen={};}
 if(S.auth){document.body.classList.add('authmode');$('#auth').innerHTML=authView();authAfter();return;}
 document.body.classList.remove('authmode');$('#auth').innerHTML='';
 $('#side').innerHTML=sidebar();$('#topbar').innerHTML=topbar();
 $('#main .wrap').innerHTML=/^(cafe|rest|shop)-/.test(S.active)?foodPage():S.active==='hoje'?home():S.active==='perfil'?perfilPage():S.active==='membros'?(S.member?profile():members()):S.active==='integracao'?(S.integ?integDetail():integList()):S.active==='discipulado'?(S.disc?discDetail():discList()):S.active==='acompanhamento'?(S.case?caseDetail():casesList()):S.active==='oracao'?prayerList():S.active==='sentimentos'?feelList():S.active==='casas'?(S.casa?casaDetail():casasList()):S.active==='redes'?redesList():S.active==='ministerios'?(S.mini?miniDetail():minisList()):S.active==='kvis'?kVis():S.active==='ksalas'?kSalas():S.active==='ktimes'?kTimes():S.active==='kplano'?kPlano():S.active==='kescalas'?kEscalas():S.active==='kturmas'?kTurmas():S.active==='visitantes'?idVisitors():S.active==='superusuarios'?idSuperUsers():S.active==='parametros'?sysParamsPage():S.active==='recursos-plataforma'?idFlags():S.active==='usuarios'?(S.user?userDetail():usersList()):S.active==='multi'?(S.chp?chpPage():multiList()):S.active==='auditoria'?auditPage():S.active==='cultos'||S.active==='eventos'||S.active==='integracoes'?(S.evt?evDetail():evList(S.active)):CERPG[S.active]?(S.evt?evDetail():cerPage(S.active)):S.active==='calendario'?(S.evt?evDetail():calPage()):S.active==='ag-insc'?inscPage():S.active==='escalas'?(S.esc?escDetail():escList()):S.active==='reservas'?rvPage():S.active==='salas'?(S.sala?slDetail():slPage()):S.active==='noticias'?ntPage():S.active==='push'?puPage():S.active==='banners'?bnPage():S.active==='transmissoes'?txPage():S.active==='videos'?nxVideoPage():S.active==='series'?nxSeriesPage():S.active==='pregacoes'?pgPage():S.active==='musicas'?sgPage():S.active==='jornadas'?joPage():S.active==='cursos'?csPage():S.active==='fvis'?fVis():S.active==='aitens'?axItems():S.active==='acat'?axCats():S.active==='aemp'?axLoans():S.active==='adev'?axRets():S.active==='adist'?axDists():S.active==='atrf'?axTrans():S.active==='amov'?axMoves():S.active==='arel'?axRep():S.active==='flanc'?fLanc():S.active==='fpag'?fPag():S.active==='frec'?fRec():S.active==='fapr'?fApr():S.active==='frel'?fRel():S.active==='fimp'?fImp():S.active==='fdoa'?fDoa():S.active==='material'?mtPage():placeholder(S.active);
 if(['cultos','eventos','integracoes','bebes','batismos','consagracoes','casamentos','calendario','ag-insc'].includes(S.active))agAfter();
 if(S.active==='escalas')escAfter();
 if(S.active==='perfil')perfilAfter();
 if(S.active==='reservas'||S.active==='salas')spAfter();
 if(S.active==='salas'&&S.sala)slAfter();
 if(S.active==='flanc')fAfter();
 if(S.active==='aitens')axAfter();
 if(/^(cafe|rest|shop)-/.test(S.active))foodAfter();
 if(S.active==='fdoa'&&S.camp)requestAnimationFrame(tabInd);
 if(['noticias','push','banners','transmissoes'].includes(S.active))cmAfter();
 if(['pregacoes','musicas','jornadas','cursos','material','videos','series'].includes(S.active))ctAfter();
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

