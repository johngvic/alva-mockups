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
const S={navOpen:{},theme:'dia',church:0,active:'hoje',day:2,range:'12s'};
try{const t=localStorage.getItem('alva-web-theme');if(t)S.theme=t;}catch(e){}
const NETWORK='Rede Alva';
const CHURCHES=[{n:'Alva Sede',c:'Centro',i:'AS',city:'São Paulo, SP',m:1240,role:'Administrador',tone:'ceu',last:'agora'},{n:'Alva Norte',c:'Santana',i:'AN',city:'São Paulo, SP',m:380,role:'Pastor',tone:'menta',last:'há 2 dias'},{n:'Alva Jardins',c:'Jardim Europa',i:'AJ',city:'São Paulo, SP',m:290,role:'Líder',tone:'damasco',last:'há 1 semana'},{n:'Alva Campinas',c:'Cambuí',i:'AC',city:'Campinas, SP',m:210,role:'Líder',tone:'rosado',last:'há 3 semanas'}];
const chTile=()=>'';
const NAV=[
 ['Geral',[['hoje','dawn','Dashboard'],['pessoas','users','Pessoas',[['membros','Membros'],['integracao','Integração de membros']]],['cuidado','heart','Cuidado',[['discipulado','Discipulado'],['acompanhamento','Acompanhamento'],['oracao','Pedidos de oração']]],['comunidade','home','Comunidade',[['casas','Casas de Apascentamento'],['redes','Redes de célula'],['ministerios','Ministérios']]],['kids','baby','Kids',[['kvis','Visão geral'],['ksalas','Salas'],['ktimes','Times'],['kturmas','Turmas']]]]],
 ['Operação',[['agenda','calendar','Agenda e serviço',[['cultos','Cultos'],['eventos','Eventos'],['calendario','Calendário'],['escalas','Escalas'],['bebes','Apresentações'],['ag-insc','Inscrições']]],['espacos','building','Espaços',[['reservas','Reservas'],['salas','Salas']]],['almox','box','Almoxarifado',[['aitens','Itens'],['acat','Categorias'],['aemp','Empréstimos'],['adev','Devoluções'],['adist','Distribuições'],['atrf','Transferências'],['aaj','Ajustes'],['amov','Movimentações'],['arel','Relatórios']]]]],
 ['Comunicação',[['conteudo','layers','Conteúdo',[['pregacoes','Pregações'],['musicas','Músicas'],['jornadas','Jornadas'],['cursos','Cursos'],['material','Material de apoio']]],['comunicacao','megaphone','Comunicação',[['noticias','Notícias'],['push','Push e e-mail'],['banners','Banners'],['transmissoes','Transmissões']]]]],
 ['Gestão',[['financeiro','wallet','Financeiro',[['fvis','Visão geral'],['flanc','Lançamentos'],['fpag','Contas a pagar'],['frec','Contas a receber'],['fapr','Aprovações'],['frel','Relatórios'],['fimp','Importar e exportar'],['fdoa','Doações']]],['admin','shield','Administração',[['usuarios','Usuários e permissões'],['multi','Multi-igreja'],['auditoria','Auditoria e LGPD']]]]],
];
const P=(n,t)=>({n,t,i:n.split(' ').map(w=>w[0]).slice(0,2).join('')});
const WAITING=[P('Carlos Mendes','ceu'),P('Luana Souza','damasco'),P('Paulo Alves','menta')];
const PENDING=[P('Bruno Reis','rosado'),P('Clara Nunes','lima'),P('Diego Faria','ceu'),P('Elisa Moura','salvia')];
const DRAFTS=[['Louvor',75],['Recepção',40],['Kids',20]];
const TASKS=[{id:'t1',area:'integracao'},{id:'t2',area:'escalas'},{id:'t3',area:'escalas'}];
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
 <nav class="nav" aria-label="Áreas">${NAV.map(g=>`${g[0]?`<div class="grp">${g[0]}</div>`:''}${g[1].map(navItem).join('')}`).join('')}</nav>
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
 $('#main .wrap').innerHTML=S.active==='hoje'?home():S.active==='perfil'?perfilPage():S.active==='membros'?(S.member?profile():members()):S.active==='integracao'?(S.integ?integDetail():integList()):S.active==='discipulado'?(S.disc?discDetail():discList()):S.active==='acompanhamento'?(S.case?caseDetail():casesList()):S.active==='oracao'?prayerList():S.active==='casas'?(S.casa?casaDetail():casasList()):S.active==='redes'?redesList():S.active==='ministerios'?(S.mini?miniDetail():minisList()):S.active==='kvis'?kVis():S.active==='ksalas'?kSalas():S.active==='ktimes'?kTimes():S.active==='kturmas'?kTurmas():S.active==='usuarios'?(S.user?userDetail():usersList()):S.active==='multi'?multiList():S.active==='auditoria'?auditPage():S.active==='cultos'||S.active==='eventos'?(S.evt?evDetail():evList(S.active)):S.active==='calendario'?(S.evt?evDetail():calPage()):S.active==='ag-insc'?inscPage():S.active==='bebes'?bbPage():S.active==='escalas'?(S.esc?escDetail():escList()):S.active==='reservas'?rvPage():S.active==='salas'?slPage():S.active==='noticias'?ntPage():S.active==='push'?puPage():S.active==='banners'?bnPage():S.active==='transmissoes'?txPage():S.active==='pregacoes'?pgPage():S.active==='musicas'?sgPage():S.active==='jornadas'?joPage():S.active==='cursos'?csPage():S.active==='fvis'?fVis():S.active==='aitens'?axItems():S.active==='acat'?axCats():S.active==='aemp'?axLoans():S.active==='adev'?axRets():S.active==='adist'?axDists():S.active==='atrf'?axTrans():S.active==='aaj'?axAdj():S.active==='amov'?axMoves():S.active==='arel'?axRep():S.active==='flanc'?fLanc():S.active==='fpag'?fPag():S.active==='frec'?fRec():S.active==='fapr'?fApr():S.active==='frel'?fRel():S.active==='fimp'?fImp():S.active==='fdoa'?fDoa():S.active==='material'?mtPage():placeholder(S.active);
 if(['cultos','eventos','calendario','ag-insc'].includes(S.active))agAfter();
 if(S.active==='escalas')escAfter();
 if(S.active==='perfil')perfilAfter();
 if(S.active==='bebes')bbAfter();
 if(S.active==='reservas'||S.active==='salas')spAfter();
 if(S.active==='flanc')fAfter();
 if(S.active==='aitens')axAfter();
 if(S.active==='fdoa'&&S.camp)requestAnimationFrame(tabInd);
 if(['noticias','push','banners','transmissoes'].includes(S.active))cmAfter();
 if(['pregacoes','musicas','jornadas','cursos','material'].includes(S.active))ctAfter();
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
const FREL=r=>/c[ôo]njuge/i.test(r)?'sp':/pai|m[ãa]e/i.test(r)?'par':/filh/i.test(r)?'kid':/irm/i.test(r)?'sib':'oth';
function famNode(m,p,rel,i,small,me){const k=me?'me':FREL(rel);return `<div class="gt-n ${k} ${me?'self':''}" style="--d:${i||0}">${me?'':`<button class="gt-x" data-a="unlink" data-v="${i}" aria-label="Desvincular ${esc(p.n)}" title="Desvincular">${ic('x',11,2.4)}</button>`}
 <button class="gt-c" ${me?'':`data-a="open" data-v="${p.id}"`}><span class="gt-av">${mav(p)}${p.app&&p.app.st==='ativo'?'<i class="gt-app" title="Usa o app"></i>':''}</span><b>${esc(small?p.n.split(' ')[0]:p.n.split(' ').slice(0,2).join(' '))}</b><small>${me?(p.tit?'Titular':'Dependente'):esc(rel)}${!small&&p.nasc?' · '+age(p.nasc)+' anos':''}</small></button></div>`;}
const famGhost=(rel,lab)=>`<button class="gt-n gt-gh" data-a="addFam" data-v="${rel}"><span class="gt-av"><span class="av">${ic('plus',14,2.2)}</span></span><b>${lab}</b></button>`;
function famTree(m,small){const L={par:[],sp:[],kid:[],sib:[],oth:[]};m.fam.forEach((f,i)=>{const p=byId(f[0]);if(p)L[FREL(f[1])].push([p,f[1],i]);});
 const gens=(L.par.length?1:0)+1+(L.kid.length?1:0),nd=x=>famNode(m,x[0],x[1],x[2],small);
 const par=L.par.length?L.par.map(nd).join(''):small?'':famGhost('Pai/Mãe','Pais');
 const kids=L.kid.length?L.kid.map(nd).join(''):small?'':famGhost('Filho(a)','Filhos');
 return `<div class="gt ${small?'sm':''}">${small?'':`<div class="gt-meta"><span><b>${m.fam.length+1}</b> pessoas</span><span><b>${gens}</b> gera${gens>1?'ções':'ção'}</span><span><b>${[m,...m.fam.map(f=>byId(f[0]))].filter(p=>p&&p.app&&p.app.st==='ativo').length}</b> no app</span></div>`}
  ${par?`<div class="gt-row gt-par"><span class="gt-lbl">Pais</span><div class="gt-grp ${L.par.length>1?'gt-cpl':''}">${par}</div></div><div class="gt-v"></div>`:''}
  <div class="gt-row gt-mid"><div class="gt-side l">${L.sib.length?`<div class="gt-grp gt-sibs">${L.sib.map(nd).join('')}</div><i class="gt-h sib"></i>`:''}</div><div class="gt-grp gt-me">${famNode(m,m,'',0,small,true)}</div><div class="gt-side r">${L.sp.length?`<i class="gt-heart">${ic('heart',12,2.2)}</i>${L.sp.map(nd).join('')}`:small?'':`<i class="gt-heart off"></i>${famGhost('Cônjuge','Cônjuge')}`}${L.oth.length?`<i class="gt-h"></i><div class="gt-grp">${L.oth.map(nd).join('')}</div>`:''}</div></div>
  ${kids?`<div class="gt-v"></div><div class="gt-row gt-kids"><span class="gt-lbl">Filhos</span><div class="gt-grp gt-rail ${L.kid.length>1?'multi':''}">${kids}</div></div>`:''}</div>`;}
function famStrip(m){
 if(!m.fam.length)return `<div class="famempty"><span class="fdots">${mav(m)}<i></i><span class="av ghost">${ic('plus',16,2)}</span></span><div><p>Nenhum familiar vinculado.</p><span class="who">Vincule cônjuge, filhos ou pais para relatórios por família.</span></div><button class="btn sec" data-a="addFam">Vincular</button></div>`;
 return famTree(m,true);
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
 return `<section class="card pc"><div class="sh"><h2>Árvore da família</h2><button class="btn sec sm" data-a="addFam">${ic('plus',14,2.2)}Vincular familiar</button></div>${famTree(m,false)}</section>`;
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
 addFam:(v)=>{const pre=['Cônjuge','Filho(a)','Pai/Mãe','Irmão(ã)','Outro'].includes(v)?v:'Cônjuge';const m=byId(S.member);const cands=MEMBERS.filter(x=>x.id!==m.id&&!m.fam.some(f=>f[0]===x.id));
  openDlg(`${dlgHead('Vincular familiar',`Quem faz parte da família de ${m.n.split(' ')[0]}?`)}
   <label class="sbox" style="margin:0 0 12px">${ic('search',16)}<input id="fq" placeholder="Buscar membro" autocomplete="off"></label>
   <div class="pick" id="fpick">${cands.slice(0,6).map(p=>`<label class="pk">${mav(p)}<span><b>${esc(p.n)}</b><small>${p.tit?'Titular':'Dependente'}</small></span><input type="radio" name="fp" value="${p.id}"></label>`).join('')}</div>
   <div class="fld" style="margin-top:14px"><span class="fl">Parentesco</span><div class="minpick" role="radiogroup" aria-label="Parentesco">${['Cônjuge','Filho(a)','Pai/Mãe','Irmão(ã)','Outro'].map((o,i)=>`<label><input type="radio" name="rel" value="${o}" ${o===pre?'checked':''}><span>${o}</span></label>`).join('')}</div></div>
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
const CS=(n,st,type,desc,resp,o={})=>({id:'c'+(++_cid),sched:o.sched||[],n,tone:o.tone||TONES[_cid%6],st,type,desc,resp,restr:!!o.restr,meets:o.meets||[],opened:o.opened||addDays(-10),resolved:o.resolved||''});
const CASES=[
 CS('Maria Santos','urgente','Hospital','Internada no Hospital São Paulo — cirurgia programada para sexta.','Pr. Rafael Pereira',{tone:'rosado',opened:addDays(-4),meets:[{d:addDays(-1),t:'Visita no hospital. Família presente, pediu oração pela cirurgia.'},{d:addDays(-4),t:'Ligação após a internação.'}]}),
 CS('João Oliveira','acompanhando','Aconselhamento','Passando por divórcio. Terceira sessão de aconselhamento agendada.','Diác. Ana Costa',{restr:true,tone:'ceu',opened:addDays(-40),sched:[{d:addDays(5),t:'19:30',mode:'Presencial',where:'Gabinete pastoral'}],meets:[{d:addDays(-6),t:'2ª sessão de aconselhamento.'},{d:addDays(-20),t:'1ª sessão.'},{d:addDays(-40),t:'Primeira conversa após o culto.'}]}),
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
  <button class="btn pri" data-a="cAdd">${ic('plus',15,2.2)}Adicionar caso</button></div></header>
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
   <div class="c3"><span class="cresp"><span class="av" style="background:var(--tone-${pTone(c.resp)});color:var(--tone-${pTone(c.resp)}-ink)">${pInit(c.resp)}</span>${esc(c.resp)}</span><span class="sep">·</span><span>${c.meets.length?`${c.meets.length} encontro${c.meets.length>1?'s':''} · último ${ago(last.d)}`:'<b style="color:var(--st-sol)">Nenhum encontro ainda</b>'}</span>${(c.sched||[]).length?`<span class="c-nxp">${ic('calendar',12,2)}Próximo: ${wd(c.sched[0].d).slice(0,3)}, ${fmtD(c.sched[0].d)} · ${c.sched[0].t}</span>`:''}</div></div>
  <span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}</div>
 <div class="tfoot"><span>${l.length} ${l.length>1?'casos':'caso'}</span></div>`;
}
function caseDetail(){
 const c=cById(S.case);if(!c){S.case=null;return casesList();}
 const sch=c.sched||[];
 return `<nav class="crumb rise"><span class="soft">Cuidado</span>${ic('chevR',13,2)}<button class="lnk back" data-a="cBack">Acompanhamento</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid"><span class="av xl" style="background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${initials(c.n)}</span><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(c.n)}</h1>${cPill(c)}</div>
   <p><span class="ctype">${ic(CTYPE[c.type],14)}${c.type}</span> · aberto ${ago(c.opened)}${c.restr?` · <span class="crestr">${ic('lock',12,2.2)}Restrito</span>`:''}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="cReg" data-v="${c.id}">Registrar encontro</button><button class="btn pri" data-a="cSched" data-v="${c.id}">${ic('calendar',15)}Agendar</button>
   <div style="position:relative"><button class="ibtn" data-a="cMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="cPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="cDel" data-v="${c.id}">${ic('x',17)}Excluir caso</button></div></div></div>
 </header>
 <div class="pgrid cdet rise" style="--d:2">
  <section class="card pc"><div class="sh"><h2>Encontros</h2><span class="who">${c.meets.length} registrado${c.meets.length===1?'':'s'}${sch.length?` · ${sch.length} agendado${sch.length===1?'':'s'}`:''}</span></div>
   ${sch.length?`<p class="fl" style="margin:0 0 8px">Próximos</p><div class="c-next">${sch.map((m,i)=>`<div class="c-nx"><span class="c-nd"><b>${+m.d.slice(8)}</b><small>${wd(m.d).slice(0,3)}</small></span><span class="dkt"><b>${m.mode==='Remoto'?'Encontro remoto':'Encontro presencial'}</b><span>${fmtD(m.d)} · ${m.t}${m.mode==='Remoto'?(m.link?' · link enviado':' · link a definir'):m.where?' · '+esc(m.where):''}</span></span><button class="btn sec sm" data-a="cDone" data-v="${c.id}|${i}">Concluir</button><button class="ibtn sm" data-a="cUnsched" data-v="${c.id}|${i}" aria-label="Cancelar encontro" title="Cancelar encontro">${ic('x',13)}</button></div>`).join('')}</div>`:''}
   ${c.meets.length?`${sch.length?'<p class="fl" style="margin:18px 0 10px">Histórico</p>':''}<ol class="mini-tl">${c.meets.map(m=>`<li><b>${esc(m.t)}</b><span>${fmtD(m.d)} · ${ago(m.d)}</span></li>`).join('')}</ol>`
   :`<div class="eempty" style="padding:24px 0 8px"><span class="eei">${ic('calendar',22)}</span><p>Nenhum encontro ainda.</p><span class="who">Agende o primeiro ou registre um que já aconteceu.</span></div>`}</section>
  <aside class="stack-col">
   <section class="card pc"><div class="sh"><h2>Situação</h2></div><div class="yn cst" role="radiogroup" id="cstG">${Object.keys(CST).map(k=>`<label><input type="radio" name="cst" value="${k}" ${c.st===k?'checked':''}><span><i style="background:${CST[k][1]}"></i>${CST[k][0]}</span></label>`).join('')}</div></section>
   <section class="card pc"><div class="sh"><h2>Sobre o caso</h2></div><p class="cdtx">${esc(c.desc)}</p>
    <dl class="cdkv"><div><dt>Responsável</dt><dd class="cresp"><span class="av" style="background:var(--tone-${pTone(c.resp)});color:var(--tone-${pTone(c.resp)}-ink)">${pInit(c.resp)}</span>${esc(c.resp)}</dd></div><div><dt>Quem vê</dt><dd>${c.restr?`${ic('lock',13,2.2)} Responsável e Presbitério`:'Todos os pastores'}</dd></div><div><dt>Aberto em</dt><dd>${fmtD(c.opened)}</dd></div></dl></section>
  </aside></div>`;
}
function caseAfter(){const c=cById(S.case);const g=$('#cstG');if(!c||!g)return;g.addEventListener('change',e=>{const old=c.st;c.st=e.target.value;if(c.st==='resolvido')c.resolved=TODAY.toISOString().slice(0,10);cRe();toast(`Caso de ${c.n.split(' ')[0]}: ${CST[c.st][0].toLowerCase()}`,()=>{c.st=old;cRe();});});}
const cRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
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
 if(S.case){caseAfter();return;}
 const q=$('#cq');if(q)q.addEventListener('input',e=>{S.cq=e.target.value;$('#crows').innerHTML=cRows();});
}
const CA={
 cexpMenu:()=>{const p=$('#cexpPop');closePops(p);p.classList.toggle('open');},
 pexpMenu:()=>{const p=$('#pexpPop');closePops(p);p.classList.toggle('open');},
 cFilter:v=>{S.cf=v;$$('.chipf[data-a=cFilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#crows').innerHTML=cRows();},
 cOpen:v=>{S.case=v;render();window.scrollTo({top:0});},
 cBack:()=>{S.case=null;render();},
 cMenu:()=>{const p=$('#cPop');closePops(p);p.classList.toggle('open');},
 cReg:v=>{const c=cById(v);openDlg(`${dlgHead('Registrar encontro',`Caso de ${esc(c.n)}. Para um encontro que já aconteceu e não foi agendado.`)}<form id="crgF" class="fgrid" novalidate style="grid-template-columns:180px 1fr"><label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${TODAY.toISOString().slice(0,10)}" max="${TODAY.toISOString().slice(0,10)}"><span class="err"></span></label><div></div><label class="fld wide" style="grid-column:1/-1"><span class="fl">O que aconteceu?</span><textarea class="ta" name="t" rows="4" placeholder="Resumo do encontro. Só quem vê o caso tem acesso."></textarea><span class="err"></span></label><div class="dfoot" style="grid-column:1/-1"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Registrar</button></div></form>`,'sm');
  const f=$('#crgF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));f.addEventListener('submit',e=>{e.preventDefault();const t=f.t.value.trim(),d=f.d.value;const bad=(n,m)=>{const i=f[n];i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;};if(!d)return bad('d','Informe a data');if(d>TODAY.toISOString().slice(0,10))return bad('d','Para datas futuras, use Agendar');if(t.length<5)return bad('t','Conte o que foi tratado');const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{c.meets.unshift({d,t});c.meets.sort((a,b)=>a.d<b.d?1:-1);closeDlg();cRe();toast('Encontro registrado');},500);});},
 cDel:v=>{closePops();const c=cById(v);setTimeout(()=>confirmDel({title:`Excluir o caso de ${c.n.split(' ')[0]}?`,body:`A descrição e os ${c.meets.length} encontros registrados serão apagados. Esta ação não pode ser desfeita.`,label:'Excluir caso',onConfirm:()=>{CASES.splice(CASES.indexOf(c),1);S.case=null;render();toast('Caso excluído');}}),50);},
 cAdd:()=>{const cand=MEMBERS.filter(m=>m.tit),st={step:1,pm:null,type:'Visita',desc:'',resp:PASTORS[0][0],restr:'0',urg:false};
  openDlg(`${dlgHead('Adicionar caso','Uma situação que precisa de cuidado pastoral.')}<div class="ca-steps" id="caSt"></div><div id="caB"></div><div class="dfoot" id="caFt"></div>`,'lg ca-dlg');
  const paint=()=>{const m=st.pm&&byId(st.pm);
   $('#caSt').innerHTML=[['1','Pessoa e tipo'],['2','Detalhes']].map((z,i)=>`<span class="${st.step>i+1?'done':st.step===i+1?'on':''}"><i>${st.step>i+1?ic('check',11,3):z[0]}</i>${z[1]}</span>`).join('<b></b>');
   if(st.step===1){$('#caB').innerHTML=`<div class="ca-g"><div class="fld" id="caPm"><span class="fl">Quem precisa de cuidado?</span><label class="sbox" style="margin-bottom:8px">${ic('search',16)}<input id="caq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="capick" style="max-height:232px">${candList(cand,'')}</div><span class="err"></span></div>
     <div class="fld"><span class="fl">Tipo</span><div class="ca-types">${Object.keys(CTYPE).map(t=>`<label><input type="radio" name="catype" value="${t}" ${st.type===t?'checked':''}><span>${ic(CTYPE[t],16)}<b>${t}</b></span></label>`).join('')}</div></div></div>`;
    if(st.pm){const r=$(`#capick input[value="${st.pm}"]`);if(r)r.checked=true;}
    $('#caq').addEventListener('input',e=>{$('#capick').innerHTML=candList(cand,e.target.value);const r=st.pm&&$(`#capick input[value="${st.pm}"]`);if(r)r.checked=true;});
    $('#capick').addEventListener('change',e=>{st.pm=e.target.value;$('#caPm').classList.remove('bad');});
    $$('input[name=catype]').forEach(r=>r.addEventListener('change',()=>st.type=r.value));
    $('#caFt').innerHTML=`<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" id="caNx">Continuar</button>`;
    $('#caNx').onclick=()=>{if(!st.pm){$('#caPm').classList.add('bad');$('#caPm .err').textContent='Escolha quem precisa de cuidado';return;}st.step=2;paint();setTimeout(()=>$('#caD')?.focus(),40);};}
   else{$('#caB').innerHTML=`<div class="ca-who">${mav(m)}<span class="dkt"><b>${esc(m.n)}</b><span>${ic(CTYPE[st.type],13)} ${st.type}</span></span><button class="lnk" id="caEd">Trocar</button></div>
    <div class="ca-g"><label class="fld" style="grid-column:1/-1"><span class="fl">O que está acontecendo?</span><textarea class="ta" id="caD" rows="3" maxlength="400" placeholder="Situação e do que a pessoa precisa">${esc(st.desc)}</textarea><span class="err"></span></label>
     <label class="fld"><span class="fl">Responsável</span><span class="selw"><select id="caR">${PASTORS.map(p=>`<option ${st.resp===p[0]?'selected':''}>${p[0]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
     <div class="fld"><span class="fl">Quem pode ver</span><div class="segc ca-vis" role="group"><button type="button" data-r="0" aria-pressed="${st.restr==='0'}">Todos os pastores</button><button type="button" data-r="1" aria-pressed="${st.restr==='1'}">${ic('lock',12,2.2)} Restrito</button></div><span class="hint" id="caVh">${st.restr==='1'?'Só o responsável e o Presbitério.':'Qualquer pastor do sistema.'}</span></div>
     <label class="tog" style="grid-column:1/-1"><input type="checkbox" id="caU" ${st.urg?'checked':''}><span class="sw"></span><span><b>Marcar como urgente</b><small>Aparece no topo da lista e no Dashboard</small></span></label></div>`;
    $('#caEd').onclick=()=>{st.desc=$('#caD').value;st.step=1;paint();};
    $('#caD').addEventListener('input',e=>{st.desc=e.target.value;e.target.closest('.fld').classList.remove('bad');});
    $('#caR').addEventListener('change',e=>st.resp=e.target.value);
    $('.ca-vis').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;st.restr=b.dataset.r;$$('.ca-vis button').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#caVh').textContent=st.restr==='1'?'Só o responsável e o Presbitério.':'Qualquer pastor do sistema.';});
    $('#caU').addEventListener('change',e=>st.urg=e.target.checked);
    $('#caFt').innerHTML=`<button type="button" class="btn sec" id="caBk">Voltar</button><button type="button" class="btn pri" id="caGo">Criar caso</button>`;
    $('#caBk').onclick=()=>{st.desc=$('#caD').value;st.step=1;paint();};
    $('#caGo').onclick=e=>{const d=st.desc.trim();if(d.length<10){const f=$('#caD').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent=d?'Conte um pouco mais':'Descreva a situação';return;}
     const b=e.currentTarget;b.classList.add('busy');setTimeout(()=>{const c=CS(m.n,st.urg?'urgente':'acompanhando',st.type,d,st.resp,{restr:st.restr==='1',tone:m.tone,opened:TODAY.toISOString().slice(0,10)});CASES.unshift(c);closeDlg();S.cf='ativos';S.case=c.id;render();window.scrollTo({top:0});toast(`Caso de ${m.n.split(' ')[0]} criado · ${st.resp} foi avisado`);},700);};}
  };paint();},
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

Object.assign(CA,{
 cSched:v=>{const c=cById(v);openDlg(`${dlgHead('Agendar encontro',`Caso de ${esc(c.n)}. O que foi tratado você registra ao concluir.`)}
  <form class="fgrid" id="cschF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" min="${TODAY.toISOString().slice(0,10)}" value="${addDays(7)}"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input type="time" name="t" value="19:30"><span class="err"></span></label>
   <div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup" id="cmodeG"><label><input type="radio" name="mode" value="Presencial" checked><span>${ic('pin',15)}&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"><span>${ic('monitor',15)}&nbsp;Remoto</span></label></div></div>
   <label class="fld wide" id="cwhereF"><span class="fl">Local <small>opcional</small></span><input name="where" placeholder="Ex.: Gabinete pastoral, visita em casa"></label>
   <label class="fld wide" id="clinkF" hidden><span class="fl">Link da reunião <small>opcional</small></span><input name="link" type="url" placeholder="Meet, Teams, Zoom… pode preencher depois"><span class="err"></span></label>
   <label class="tog wide"><input type="checkbox" name="notify" checked><span class="sw"></span><span><b>Avisar ${esc(c.n.split(' ')[0])} no app</b><small>A pessoa confirma ou recusa em Agenda › Acompanhamento</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Agendar</button></div></form>`);
  $('#cmodeG').addEventListener('change',e=>{const r=e.target.value==='Remoto';$('#clinkF').hidden=!r;$('#cwhereF').hidden=r;});
  const f=$('#cschF');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;};
   if(!fd.get('d'))return bad('d','Escolha a data');if(fd.get('d')<TODAY.toISOString().slice(0,10))return bad('d','A data já passou');if(!fd.get('t'))return bad('t','Informe o horário');
   const lk=fd.get('link');if(lk&&!/^https?:\/\//.test(lk))return bad('link','Link inválido');
   if((c.sched||[]).some(m=>m.d===fd.get('d')&&m.t===fd.get('t')))return bad('d','Já existe encontro neste horário');
   const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{c.sched=c.sched||[];c.sched.push({d:fd.get('d'),t:fd.get('t'),mode:fd.get('mode'),where:fd.get('where'),link:lk});c.sched.sort((a,b)=>a.d<b.d?-1:1);closeDlg();cRe();toast(`Encontro agendado para ${wd(fd.get('d'))}, ${fmtD(fd.get('d'))} às ${fd.get('t')}${fd.get('notify')?` · ${c.n.split(' ')[0]} foi avisado(a)`:''}`);},700);});},
 cDone:v=>{const [id,i]=v.split('|'),c=cById(id),m=c.sched[+i];openDlg(`${dlgHead('Concluir encontro',`${esc(c.n)} · ${fmtD(m.d)} às ${m.t}`)}<form id="cdnF" class="fgrid one" novalidate><label class="fld"><span class="fl">O que foi tratado?</span><textarea class="ta" name="t" rows="4" placeholder="Resumo do encontro. Só quem vê o caso tem acesso."></textarea><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Concluir</button></div></form>`,'sm');
  const f=$('#cdnF');f.addEventListener('submit',e=>{e.preventDefault();const t=f.t.value.trim();if(t.length<5){f.t.closest('.fld').classList.add('bad');f.t.nextElementSibling.textContent='Escreva um resumo do encontro';return;}const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{c.sched.splice(+i,1);c.meets.unshift({d:m.d,t});closeDlg();cRe();toast('Encontro concluído e registrado');},500);});},
 cUnsched:v=>{const [id,i]=v.split('|'),c=cById(id),m=c.sched[+i];confirmDel({title:'Cancelar este encontro?',body:`${esc(c.n)} recebe o aviso de que o encontro de ${fmtD(m.d)} às ${m.t} foi cancelado.`,label:'Cancelar encontro',onConfirm:()=>{c.sched.splice(+i,1);closeDlg();cRe();toast('Encontro cancelado',()=>{c.sched.splice(+i,0,m);closeDlg();cRe();});}});},
});

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
   <button class="kfn kmain" data-a="nav" data-v="ksalas"><span class="kfi">${ic('door',16)}</span><span><b>Sala</b><small>o espaço, com capacidade</small></span></button><span class="kfa rev">${ic('arrowR',14,2)}<small>servida por</small></span>
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
const MODS=['Membros','Integração','Cuidado','Comunidade','Kids','Agenda e eventos','Espaços','Almoxarifado','Conteúdo','Comunicação','Financeiro','Multi-igreja','Administração'];
const RPERM={};const rp=o=>Object.fromEntries(MODS.map(m=>[m,o[m]||[]]));
RPERM.Administrador=rp(Object.fromEntries(MODS.map(m=>[m,ACTS])));
RPERM.Pastor=rp({Membros:ACTS,Integração:ACTS,Cuidado:ACTS,Comunidade:ACTS,Kids:['Ver'],'Agenda e eventos':['Ver','Criar','Editar'],Conteúdo:['Ver','Criar','Editar'],Comunicação:['Ver','Criar'],Financeiro:['Ver']});
RPERM['Líder']=rp({Membros:['Ver'],Comunidade:['Ver','Editar'],'Agenda e eventos':['Ver','Criar','Editar'],Espaços:['Ver','Criar'],Almoxarifado:['Ver','Criar']});
RPERM.Secretaria=rp({Membros:ACTS,Integração:ACTS,'Agenda e eventos':ACTS,Espaços:ACTS,Comunicação:['Ver','Criar','Editar'],Financeiro:['Ver']});
RPERM['Voluntário']=rp({'Agenda e eventos':['Ver'],Kids:['Ver'],Espaços:['Ver']});
const SAREAS=[['Almoxarifado','box'],['Ministério de Louvor','music'],['Ministério Infantil','baby'],['Casa Norte — Lapa','home'],['Integração','userplus'],['Financeiro','wallet']];
const SPERM={Visualizar:['Só consulta','eye','var(--ink-muted)','var(--surface-2)'],Editar:['Cria e altera','pen','var(--st-ace)','var(--st-ace-bg)'],Admin:['Líder da área — pode conceder acesso','shield','var(--st-rec)','var(--st-rec-bg)']};
let _scid=0;const SC=(area,who,perm)=>({id:'sc'+(++_scid),area,who,perm});
const SCOPES=[SC('Almoxarifado','Lucas Teixeira','Admin'),SC('Ministério de Louvor','Ana Clara Lima','Admin'),SC('Ministério de Louvor','Bruno Reis','Visualizar'),SC('Ministério Infantil','Daniela Rocha','Admin'),SC('Ministério Infantil','Clara Nunes','Editar'),SC('Casa Norte — Lapa','Otávio Lins','Admin'),SC('Integração','Helena Duarte','Editar')];
Object.assign(S,{utab:'users',mxRole:'Administrador',mxDraft:null});
const spPill=p=>`<span class="stp" style="--c:${SPERM[p][2]};--b:${SPERM[p][3]}"><i></i>${p}</span>`;
function usersList(){
 const kp=`<section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Usuários do painel</span><span class="kv">${USERS.length}</span><span class="kd">${USERS.filter(u=>u.active).length} ativos</span></div>
  <div class="k4"><span class="kl">Administradores</span><span class="kv" style="color:var(--st-rec)">${USERS.filter(u=>u.role==='Administrador').length}</span><span class="kd">acesso total</span></div>
  <div class="k4"><span class="kl">Líderes</span><span class="kv">${USERS.filter(u=>u.role==='Líder').length}</span><span class="kd">${Object.keys(ROLES).length} roles cadastradas</span></div>
  <div class="k4"><span class="kl">Acessos por área</span><span class="kv">${SCOPES.length}</span><span class="kd">em ${new Set(SCOPES.map(x=>x.area)).size} áreas</span></div></section>`;
 const tabs=`<div class="segc up-tabs rise" style="--d:2" role="tablist">${[['users','Usuários',USERS.length],['scope','Acessos por área',SCOPES.length],['matrix','Matriz de permissões',Object.keys(ROLES).length]].map(t=>`<button data-a="uTab" data-v="${t[0]}" aria-pressed="${S.utab===t[0]}">${t[1]}<small class="cm-n">${t[2]}</small></button>`).join('')}</div>`;
 return `${admHead('Usuários e permissões','Quem acessa o painel, com qual role e em quais áreas',`<button class="btn sec" data-a="export" data-v="os usuários (CSV)">Exportar CSV</button><button class="btn pri" data-a="uInvite">${ic('plus',15,2.2)}Adicionar usuário</button>`)}${kp}${tabs}
 <div class="rise" style="--d:3">${S.utab==='scope'?scopeTab():S.utab==='matrix'?matrixTab():usersTab()}</div>`;
}
function usersTab(){const q=norm(S.uq),l=USERS.filter(u=>!q||norm(u.n+' '+u.e+' '+u.role).includes(q));
 return `<section class="card mtab"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="uq" placeholder="Buscar por nome, e-mail ou role" value="${esc(S.uq)}" autocomplete="off"></label></div>
  <div class="trow us thead"><span>Usuário</span><span>Role</span><span>Acesso</span><span>Igrejas</span><span>Último acesso</span><span></span></div>
  ${l.map(u=>{const sc=SCOPES.filter(x=>x.who.split(' ')[0]===u.n.split(' ')[0]);return `<div class="trow us ${u.active?'':'off'}" tabindex="0" data-a="uOpen" data-v="${u.id}"><span class="tn">${uAv(u)}<span class="hn"><b>${esc(u.n)}</b><span>${esc(u.e)}</span></span></span>
   <span class="ts">${rPill(u.role)}</span>
   <span class="uacc">${u.role==='Administrador'?'<span class="soft">Todas as áreas</span>':`<span class="pmini">${AREAS_P.map(a=>`<i class="${u.perm[a].length?(u.perm[a].length>=3?'full':'on'):''}" title="${a}: ${u.perm[a].join(', ')||'sem acesso'}"></i>`).join('')}</span><span>${AREAS_P.filter(a=>u.perm[a].length).length} áreas${sc.length?` · +${sc.length} escopado`:''}</span>`}</span>
   <span class="uig">${u.igs.length} ${u.igs.length>1?'igrejas':'igreja'}</span><span class="ulast">${u.active?u.last:'<span class="soft">Suspenso</span>'}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
  <div class="tfoot"><span>${l.length} usuários</span></div></section>`;}
function scopeTab(){
 const byA={};SCOPES.forEach(x=>{(byA[x.area]=byA[x.area]||[]).push(x);});
 return `<p class="fi-note">${ic('info',15)}<span>Acesso restrito a <b>uma área</b> (só o Almoxarifado, só o Louvor…): a pessoa não vê os outros módulos. Quem é <b>Admin</b> da área pode conceder Visualizar ou Editar a outros ali — nunca acima do próprio nível. O acesso global por role fica na <button class="lnk" data-a="uTab" data-v="matrix">Matriz de permissões</button>.</span></p>
 <div class="sc-g">${Object.entries(byA).map(([a,xs])=>{const ai=(SAREAS.find(s=>s[0]===a)||[a,'layers'])[1];return `<article class="card sc-c"><div class="sc-h"><span class="sc-ai">${ic(ai,18)}</span><div class="dkt"><b>${esc(a)}</b><span>${xs.length} pessoa${xs.length>1?'s':''} com acesso</span></div><button class="ibtn sm" data-a="scNew" data-v="${esc(a)}" aria-label="Adicionar acesso em ${esc(a)}" title="Adicionar pessoa">${ic('plus',14,2.2)}</button></div>
  ${xs.sort((p,q)=>Object.keys(SPERM).indexOf(q.perm)-Object.keys(SPERM).indexOf(p.perm)).map(x=>`<div class="sc-r" id="${x.id}"><span class="av" style="background:var(--tone-${TONES[x.who.length%6]});color:var(--tone-${TONES[x.who.length%6]}-ink)">${initials(x.who)}</span><span class="dkt"><b>${esc(x.who)}</b><span>${SPERM[x.perm][0]}</span></span>
   <div class="sc-seg" role="radiogroup" aria-label="Permissão de ${esc(x.who)}">${Object.keys(SPERM).map(p=>`<button class="${x.perm===p?'on':''}" data-a="scSet" data-v="${x.id}|${p}" style="--c:${SPERM[p][2]};--b:${SPERM[p][3]}" title="${SPERM[p][0]}">${p==='Visualizar'?'Ver':p}</button>`).join('')}</div>
   <button class="ibtn sm sc-x" data-a="scDel" data-v="${x.id}" aria-label="Remover acesso">${ic('x',13)}</button></div>`).join('')}</article>`;}).join('')}
  <button class="cm-badd" data-a="scNew" style="min-height:180px"><span>${ic('plus',20,2)}</span><b>Adicionar acesso</b><small>Área, pessoa e nível</small></button></div>`;}
function matrixTab(){const r=S.mxRole,d=S.mxDraft||(S.mxDraft=JSON.parse(JSON.stringify(RPERM[r]))),dirty=JSON.stringify(d)!==JSON.stringify(RPERM[r]),n=MODS.reduce((a,m)=>a+d[m].length,0),locked=r==='Administrador';
 return `<p class="fi-note">${ic('info',15)}<span>Define o acesso <b>global</b> de cada role aos módulos. O nome da role é livre (Tesoureiro, Visualizador…). Acesso a um ministério ou departamento específico fica em <button class="lnk" data-a="uTab" data-v="scope">Acessos por área</button>.</span></p>
 <section class="card mx-c"><div class="mx-roles">${Object.keys(ROLES).map(k=>`<button class="mx-rb ${k===r?'on':''}" data-a="mxRole" data-v="${esc(k)}" style="--c:var(--${ROLES[k][0]})"><i></i><b>${esc(k)}</b><small>${USERS.filter(u=>u.role===k).length} usuário${USERS.filter(u=>u.role===k).length===1?'':'s'}</small></button>`).join('')}<button class="mx-rb new" data-a="mxNew">${ic('plus',14,2.2)}<b>Nova role</b></button></div>
  <div class="mx-sum" style="--c:var(--${ROLES[r][0]})"><div class="mx-id">${ring(Math.round(n/(MODS.length*ACTS.length)*100),64,`var(--${ROLES[r][0]})`)}<div><b>${esc(r)}</b><span>${n} de ${MODS.length*ACTS.length} permissões</span>${locked?`<small>${ic('lock',11)} Sempre acesso total</small>`:`<small class="ok">${MODS.filter(m=>d[m].length).length} de ${MODS.length} módulos visíveis</small>`}</div></div>
   <div class="mx-acts">${ACTS.map(a=>{const c=MODS.filter(m=>d[m].includes(a)).length;return `<div class="mx-ab"><span><b>${a}</b><em>${c}/${MODS.length}</em></span><span class="mx-abb"><i style="width:${c/MODS.length*100}%"></i></span></div>`;}).join('')}</div>
   ${locked?'':`<div class="mx-pre"><span class="fl">Atalhos</span><div class="mx-pg"><button data-a="mxPre" data-v="all">${ic('check',12,2.6)}Tudo</button><button data-a="mxPre" data-v="ver">${ic('eye',12)}Só ver</button><button data-a="mxPre" data-v="none">${ic('x',12,2.4)}Limpar</button></div></div>`}</div>
  <div class="mx-t ${locked?'locked':''}"><div class="mx-hr"><span>Módulo</span>${ACTS.map(a=>`<button class="mx-col" data-a="mxCol" data-v="${a}" ${locked?'disabled':''} title="Marcar/desmarcar coluna">${a}</button>`).join('')}</div>
   ${MODS.map(m=>`<div class="mx-r ${d[m].length?'':'none'}"><button class="mx-m" data-a="mxRow" data-v="${esc(m)}" ${locked?'disabled':''}>${esc(m)}<small>${d[m].length?d[m].length===4?'acesso total':d[m].join(' · '):'sem acesso'}</small></button>${ACTS.map(a=>`<button class="mx-cell ${d[m].includes(a)?'on':''}" data-a="mxCell" data-v="${esc(m)}|${a}" ${locked?'disabled':''} aria-pressed="${d[m].includes(a)}" aria-label="${esc(m)}: ${a}">${ic('check',14,2.8)}</button>`).join('')}</div>`).join('')}</div>
  <div class="mx-f ${dirty?'dirty':''}"><span>${dirty?`${ic('alert',13,2)}Alterações não salvas`:`${ic('check',13,2.4)}Tudo salvo`}</span><span class="row2"><button class="btn sec" data-a="mxCancel" ${dirty?'':'disabled'}>Cancelar</button><button class="btn pri" data-a="mxSave" ${dirty?'':'disabled'}>Salvar permissões</button></span></div></section>`;}
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

const admRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const mxRe=()=>{const y=window.scrollY;const w=$('.mx-c');if(w){const t=document.createElement('div');t.innerHTML=matrixTab();w.replaceWith(t.querySelector('.mx-c'));}window.scrollTo(0,y);};
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
 uInvite:()=>{const cands=[...new Map(MEMBERS.filter(m=>m.tit&&m.e&&!USERS.some(u=>u.e===m.e)).map(m=>[m.n,m])).values()];
  openDlg(`${dlgHead('Adicionar usuário','Precisa ser um membro cadastrado. Ele recebe um e-mail para criar a senha.')}<form class="fgrid one" id="uiF" novalidate>
   <div class="fld"><span class="fl">Membro</span><label class="sbox" style="height:40px">${ic('search',15)}<input id="uiQ" placeholder="Buscar membro" autocomplete="off"></label><div class="pick ui-pick" id="uiP"></div><span class="err"></span></div>
   <label class="fld"><span class="fl">E-mail</span><span class="cm-pre">${ic('mail',14)}<input name="e" readonly placeholder="Escolha um membro" tabindex="-1"></span><span class="hint">Vem do cadastro do membro — para mudar, edite em Membros.</span></label>
   <div class="fld"><span class="fl">Role</span><div class="ui-roles">${Object.keys(ROLES).map((r,i)=>`<label><input type="radio" name="role" value="${r}" ${r==='Voluntário'?'checked':''}><span style="--c:var(--${ROLES[r][0]})"><i></i><b>${r}</b><small>${MODS.filter(m=>RPERM[r]&&RPERM[r][m].length).length} módulos</small></span></label>`).join('')}</div></div>
   <div class="fld"><span class="fl">Igrejas da rede</span><div class="ui-chs">${CHURCHES.map((c,i)=>`<label><input type="checkbox" name="ig" value="g${i+1}" ${!i?'checked':''}><span>${chTile(c,28)}<b>${esc(c.n)}</b><i class="cb">${ic('check',11,3)}</i></span></label>`).join('')}</div><span class="err"></span></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="uiOk" disabled>Adicionar</button></div></form>`,'lg');
  const f=$('#uiF');let sel=null;const draw=q=>{q=norm(q||'');$('#uiP').innerHTML=cands.filter(m=>norm(m.n).includes(q)).slice(0,5).map(m=>`<label class="pk ${sel===m?'on':''}">${mav(m)}<span><b>${esc(m.n)}</b><small>${esc(m.e)}</small></span><input type="radio" name="pm" value="${m.id}" ${sel===m?'checked':''}></label>`).join('')||'<p class="who" style="padding:10px">Nenhum membro encontrado.</p>';};draw();
  $('#uiQ').addEventListener('input',e=>draw(e.target.value));
  $('#uiP').addEventListener('change',e=>{sel=MEMBERS.find(m=>m.id===e.target.value);f.e.value=sel.e;$('#uiOk').disabled=false;$$('#uiP .pk').forEach(l=>l.classList.toggle('on',l.querySelector('input').checked));});
  f.addEventListener('submit',e=>{e.preventDefault();if(!sel)return;const igs=[...f.querySelectorAll('[name=ig]:checked')].map(x=>x.value);if(!igs.length){const fl=$('.ui-chs').closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha ao menos uma igreja';return;}
   $('#uiOk').classList.add('busy');setTimeout(()=>{const r=f.querySelector('[name=role]:checked').value;USERS.push(U(sel.n,sel.e,r,igs,r==='Administrador'?JSON.parse(JSON.stringify(ALL)):PM({}),'convite enviado',sel.tone||'menta'));closeDlg();S.utab='users';render();toast(`${sel.n.split(' ')[0]} adicionado · convite enviado para ${sel.e}`);},800);});},
 uTab:v=>{if(S.utab==='matrix'&&S.mxDraft&&JSON.stringify(S.mxDraft)!==JSON.stringify(RPERM[S.mxRole])&&v!=='matrix'){confirmDel({title:'Descartar alterações?',body:`As mudanças na role ${esc(S.mxRole)} não foram salvas.`,label:'Descartar',onConfirm:()=>{S.mxDraft=null;S.utab=v;admRe();}});return;}S.utab=v;admRe();},
 scSet:v=>{const [id,p]=v.split('|'),x=SCOPES.find(z=>z.id===id);if(x.perm===p)return;const old=x.perm;x.perm=p;admRe();toast(`${x.who.split(' ')[0]}: ${p} em ${x.area}`,()=>{x.perm=old;admRe();});},
 scDel:v=>{const x=SCOPES.find(z=>z.id===v);confirmDel({title:'Remover este acesso?',body:`${esc(x.who)} deixa de ver ${esc(x.area)}.`,label:'Remover',onConfirm:()=>{const i=SCOPES.indexOf(x);SCOPES.splice(i,1);admRe();toast('Acesso removido',()=>{SCOPES.splice(i,0,x);admRe();});}});},
 scNew:v=>{const ppl=[...new Set(MEMBERS.filter(m=>m.tit).map(m=>m.n))].sort();openDlg(`${dlgHead('Adicionar acesso','A pessoa só vê a área escolhida.')}<form id="scF" class="fgrid one" novalidate>
   <div class="fld"><span class="fl">Área</span><div class="sc-ap">${SAREAS.map(a=>`<label><input type="radio" name="a" value="${esc(a[0])}" ${a[0]===(v||SAREAS[0][0])?'checked':''}><span>${ic(a[1],15)}${esc(a[0])}</span></label>`).join('')}</div></div>
   <label class="fld"><span class="fl">Pessoa</span><span class="selw"><select name="w"><option value="">Escolha…</option>${ppl.map(n=>`<option>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="err"></span></label>
   <div class="fld"><span class="fl">Nível nesta área</span><div class="sc-lv">${Object.entries(SPERM).map(([k,x],i)=>`<label><input type="radio" name="p" value="${k}" ${i?'':'checked'}><span style="--c:${x[2]};--b:${x[3]}"><i>${ic(x[1],15)}</i><b>${k}</b><small>${x[0]}</small></span></label>`).join('')}</div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="scOk" disabled>Adicionar acesso</button></div></form>`);
  const f=$('#scF'),ok=$('#scOk');const chk=()=>{const a=f.querySelector('[name=a]:checked').value,w=f.w.value,dup=w&&SCOPES.some(x=>x.area===a&&x.who===w);f.w.closest('.fld').classList.toggle('bad',!!dup);f.w.closest('.fld').querySelector('.err').textContent=dup?'Essa pessoa já tem acesso a essa área':'';ok.disabled=!w||dup;};f.addEventListener('change',chk);chk();
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const x=SC(f.querySelector('[name=a]:checked').value,f.w.value,f.querySelector('[name=p]:checked').value);SCOPES.push(x);closeDlg();admRe();setTimeout(()=>{const el=document.getElementById(x.id);el&&el.classList.add('sc-new');},30);toast(`${x.who.split(' ')[0]} agora acessa ${x.area}`);},600);});},
 mxRole:v=>{const go=()=>{S.mxRole=v;S.mxDraft=null;admRe();};if(S.mxDraft&&JSON.stringify(S.mxDraft)!==JSON.stringify(RPERM[S.mxRole])){confirmDel({title:'Descartar alterações?',body:`As mudanças na role ${esc(S.mxRole)} não foram salvas.`,label:'Descartar',onConfirm:go});return;}go();},
 mxCell:(v,b)=>{const [m,a]=v.split('|'),d=S.mxDraft;let p=d[m];if(p.includes(a)){p=p.filter(x=>x!==a);if(a==='Ver')p=[];}else{p.push(a);if(!p.includes('Ver'))p.push('Ver');}d[m]=ACTS.filter(x=>p.includes(x));mxRe();},
 mxRow:v=>{const d=S.mxDraft;d[v]=d[v].length===4?[]:[...ACTS];mxRe();},
 mxCol:v=>{const d=S.mxDraft,all=MODS.every(m=>d[m].includes(v));MODS.forEach(m=>{let p=d[m].filter(x=>x!==v);if(!all){p.push(v);if(!p.includes('Ver'))p.push('Ver');}else if(v==='Ver')p=[];d[m]=ACTS.filter(x=>p.includes(x));});mxRe();},
 mxPre:v=>{const d=S.mxDraft;MODS.forEach(m=>d[m]=v==='all'?[...ACTS]:v==='ver'?['Ver']:[]);mxRe();},
 mxCancel:()=>{S.mxDraft=null;admRe();toast('Alterações descartadas');},
 mxSave:(v,b)=>busy(b,800,'Salvo',()=>{RPERM[S.mxRole]=JSON.parse(JSON.stringify(S.mxDraft));setTimeout(()=>{S.mxDraft=null;admRe();},950);toast(`Permissões de ${S.mxRole} salvas · ${USERS.filter(u=>u.role===S.mxRole).length} usuário(s) afetado(s)`);}),
 mxNew:()=>simpleDlg('Nova role','Nome da role','Ex.: Tesoureiro',v=>{if(ROLES[v]){toast('Essa role já existe');return;}ROLES[v]=['st-sol'];RPERM[v]=rp({});S.mxRole=v;S.mxDraft=null;admRe();toast(`Role ${v} criada — marque as permissões`);}),
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
const AUDEMO=['rafael@alvasede.com.br','demo1234'];
Object.assign(S,{auth:'login',authErr:0,authEmail:'',authUser:null,signStep:1,sign:{}});
const RROLE={g1:'Administrador',g2:'Administrador',g3:'Administrador'};
const brand=()=>`<aside class="au-brand">
 <div class="au-top">${logo(26,!S.auAnim)}${S.auth==='login'?`<button class="au-mcta" data-a="auGo" data-v="signup">Nova igreja?<b>Conhecer o Alva</b></button>`:''}</div>
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
   <label class="fld"><span class="fl">Senha</span><span class="au-pw"><input name="p" type="password" autocomplete="current-password" placeholder="Sua senha" ${locked?'disabled':''}>${eye}</span><span class="err"></span><button type="button" class="lnk au-forgot" data-a="auGo" data-v="forgot">Esqueci minha senha</button></label>
   ${S.authErr&&!locked?`<p class="au-warn">${ic('alert',14,2)}E-mail ou senha incorretos. ${5-S.authErr} ${5-S.authErr===1?'tentativa restante':'tentativas restantes'}.</p>`:''}
   ${locked?`<div class="au-lock">${ic('lock',16,2)}<div><b>Acesso bloqueado por 15 minutos</b><span>Por segurança, depois de 5 tentativas. Você pode redefinir a senha agora.</span></div></div>`:''}
   <button class="btn pri au-cta" type="submit" ${locked?'disabled':''}>Entrar</button>
   <button class="btn sec au-cta" type="button" data-a="auGo" data-v="codeEmail">Entrar com código por e-mail</button>
   ${locked?'':`<button type="button" class="btn sec au-cta au-demob" data-a="auDemo">${ic('sparkle',15)}Entrar com conta demo</button>`}
   ${locked?`<button type="button" class="btn sec au-cta" data-a="auGo" data-v="forgot">Redefinir senha</button>`:''}
  </form>
  <div class="au-alt"><button class="au-opt" data-a="auGo" data-v="invite">${ic('mail',18)}<span><b>Primeiro acesso</b><small>Recebi um convite por e-mail</small></span>${ic('chevR',16)}</button>
   <button class="au-opt" data-a="auGo" data-v="signup">${ic('church',18)}<span><b>Conhecer o Alva para minha igreja</b><small>Planos e apresentação do produto</small></span>${ic('chevR',16)}</button></div>
  <p class="au-demo">Demonstração: qualquer e-mail entra. Senha <code>errada</code> mostra o erro. Um e-mail com <code>novo</code> não tem conta.</p>`;}
 else if(v==='codeEmail')body=`${back('login','Entrar com senha')}<div class="au-h"><h1>Entrar com código</h1><p>Receba um código no e-mail cadastrado pela sua igreja.</p></div><form id="codeEmailF" class="au-form"><label class="fld"><span class="fl">E-mail</span><input name="e" type="email" required autocomplete="email" placeholder="nome@suaigreja.com.br" value="${esc(S.authEmail)}"><span class="err"></span></label><button class="btn pri au-cta" type="submit">Enviar código</button></form>`;
 else if(v==='loginCode')body=`${back('codeEmail','Trocar e-mail')}<div class="au-h"><h1>Confira seu e-mail</h1><p>Se houver um acesso para <b>${esc(S.authEmail)}</b>, o código chegará em instantes. Confira também o spam.</p></div><form id="loginCodeF" class="au-form"><label class="fld"><span class="fl">Código de 6 dígitos</span><input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required placeholder="000000" style="font-size:26px;letter-spacing:.35em;text-align:center"><span class="err"></span></label><p class="who">Válido por 15 minutos. Até 5 tentativas.</p><button class="btn pri au-cta" type="submit">Entrar</button><button type="button" class="btn sec au-cta" id="loginCodeResend">Reenviar código</button><p class="au-demo">Demonstração: use <code>123456</code>. Nenhum e-mail é enviado.</p></form>`;
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
  <div class="au-h"><h1>Selecione a igreja</h1><p>${CHURCHES.length>1?`Você tem acesso a ${CHURCHES.length} igrejas. O seu papel pode ser diferente em cada uma.`:'Confirme a igreja para entrar no painel.'}</p></div>
  <p class="au-net">${ic('church',13)}${NETWORK}<span class="soft">· ${CHURCHES.length} igrejas</span></p>
  <div class="au-ch2">${CHURCHES.map((x,i)=>`<button class="au-ig2" data-a="auPick" data-v="${i}" style="--d:${i}"><span class="au-ign"><b>${esc(x.n)}</b><span>${esc(x.c)} · ${x.m.toLocaleString('pt-BR')} membros</span></span><span class="au-igr"><b>${esc(x.role)}</b><small>${x.last==='agora'?'acessada agora':x.last}</small></span><span class="au-iga">${ic('arrowR',16,2)}</span></button>`).join('')}</div>
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
 const cf=$('#codeEmailF');if(cf)cf.addEventListener('submit',e=>{e.preventDefault();S.authEmail=cf.elements.e.value.trim();S.codeAttempts=0;S.codeIssued=Date.now();S.codeResendAt=Date.now()+60000;S.auth='loginCode';render();});
 const oc=$('#loginCodeF');if(oc){const resend=$('#loginCodeResend');const refresh=()=>{const seconds=Math.max(0,Math.ceil((S.codeResendAt-Date.now())/1000));resend.disabled=seconds>0;resend.textContent=seconds?'Reenviar em '+seconds+'s':'Reenviar código';};refresh();const timer=setInterval(()=>{if(!resend.isConnected){clearInterval(timer);return;}refresh();},1000);
 resend.addEventListener('click',()=>{S.codeAttempts=0;S.codeIssued=Date.now();S.codeResendAt=Date.now()+60000;render();toast('Novo código simulado. Use 123456.');});
 oc.addEventListener('submit',e=>{e.preventDefault();if(S.codeAttempts>=5){fBad(oc,'code','Limite de tentativas. Solicite um novo código.').focus();return;}if(Date.now()-S.codeIssued>=900000){fBad(oc,'code','Código expirado. Solicite um novo código.').focus();return;}if(oc.elements.code.value!=='123456'){S.codeAttempts++;fBad(oc,'code','Código inválido. '+(5-S.codeAttempts)+' tentativas restantes.').focus();return;}S.authErr=0;S.authUser=USERS[0];S.auth='church';render();});}

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
 auDemo:(v,b)=>{const f=$('#auF');if(!f)return;b.disabled=true;f.e.value='';f.p.value='';let i=0;const [em,pw]=AUDEMO;
  const step=()=>{if(i<em.length){f.e.value+=em[i++];setTimeout(step,14);}else if(i<em.length+pw.length){f.p.value+=pw[i++-em.length];setTimeout(step,28);}else setTimeout(()=>f.requestSubmit(),160);};step();},
 auGo:v=>{const email=$('#auF [name=e]');if(email)S.authEmail=email.value.trim();if(v==='signup'){window.location.href='../site/#planos';return;}if(v==='signup1'){S.signStep=1;S.auth='signup';}else{if(v==='signup'&&S.auth!=='signup'){S.signStep=1;S.sign={};}if(v==='invite')S.inviteOk=false;S.auth=v;}render();window.scrollTo({top:0});},
 auEye:(v,b)=>{const i=b.parentNode.querySelector('input');const show=i.type==='password';i.type=show?'text':'password';b.innerHTML=ic(show?'eyeOff':'eye',18);b.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');i.focus();},
 auResend:(v,b)=>{b.disabled=true;toast('Link reenviado');let t=30;const it=setInterval(()=>{t--;if(t<=0){clearInterval(it);b.disabled=false;b.textContent='Reenviar link';}else b.textContent=`Reenviar em ${t}s`;},1000);},
 auPick:(v,b)=>{b.classList.add('pk-on');setTimeout(()=>{S.church=+v;S.auth=null;S.active='hoje';S.animated=false;render();window.scrollTo({top:0});toast(`Você está em ${CHURCHES[S.church].n}`);},350);},
};

/* ================= Agenda e serviço: Cultos, Eventos, Calendário, Inscrições ================= */
const ETYPES=['Culto','Retiro','Batismo','Conferência','Evento especial'];
const ETONE={Ensaio:'salvia',Culto:'ceu',Retiro:'lima',Batismo:'menta',Conferência:'damasco','Evento especial':'rosado'};
let _eid=0;
const R=(n,d,pay,val,vch)=>({id:'rg'+Math.random().toString(36).slice(2,8),n,d,pay,val,vch:vch||''});
const EV=(o)=>Object.assign({id:'ev'+(++_eid),kind:'evento',st:'confirmado',time:'19h',place:'Templo principal',min:'',paid:false,price:0,cap:0,regs:[],vouchers:[],checkin:'off',periods:[],items:[],link:'',rep:'none',prev:''},o);
const EVTS=[
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-09-27',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-10-04',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-10-11',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Jovens',type:'Culto',d:'2026-10-03',time:'19h30',min:'Jovens e Adolescentes',rep:'semanal',place:'Auditório'}),
 EV({t:'Retiro de Jovens 2026',type:'Retiro',d:'2026-10-17',time:'08h',place:'Chácara Alva',min:'Jovens e Adolescentes',paid:true,price:120,cap:100,checkin:'periodo',periods:['Sábado','Domingo'],items:[{n:'Almoço',price:25,p:'Sábado'},{n:'Almoço',price:25,p:'Domingo'}],link:'https://asaas.com/c/retiro-jovens-2026',
  regs:[R('Giovanna Martins','2026-09-10','pago',120),R('Renan Ferreira','2026-09-11','pendente',120),R('Camila Sousa','2026-09-12','pago',120),R('Thiago Mendes','2026-09-13','pendente',100,'RETIRO10'),R('Larissa Pinto Rocha','2026-09-14','pago',0,'BOLSA-INTEGRAL-LARISSA')],
  vouchers:[{code:'RETIRO10',disc:20,exp:'2026-09-30',mode:'liberado',email:'',uses:4},{code:'BOASVINDAS-GIOVANNA',disc:30,exp:'',mode:'especifico',email:'giovanna.martins@email.com',uses:0},{code:'BOLSA-INTEGRAL-LARISSA',disc:120,exp:'',mode:'especifico',email:'larissa.pr@email.com',uses:1}]}),
 EV({t:'Culto + Batismo',type:'Batismo',d:'2026-10-18',time:'16h',place:'Chácara Alva',regs:[R('Ana Lima','2026-09-20','—',0)]}),
 EV({t:'Conferência Missões',type:'Conferência',d:'2026-10-09',time:'19h30',place:'Auditório',paid:true,price:60,cap:150,checkin:'inteiro',link:'https://asaas.com/c/conferencia-missoes',regs:[R('Felipe Andrade','2026-09-18','pago',60),R('Diego Faria','2026-09-22','pendente',60)]}),
 EV({t:'Convergir 2027',type:'Conferência',st:'previsao',prev:'Fev/2027',d:''}),
 EV({t:'Congresso de Mulheres 2027',type:'Conferência',st:'previsao',prev:'Mar/2027',d:''}),
 EV({t:'12 Horas de Oração',type:'Evento especial',d:'2026-10-24',time:'05h às 17h',min:'Intercessão',regs:[R('Renata Campos','2026-09-25','—',0),R('Elisa Moura','2026-09-26','—',0)]}),
 EV({t:'Ensaio do Louvor',type:'Ensaio',d:'2026-09-30',time:'20h',min:'Louvor',place:'Templo principal'})
];
const MYESC=[{t:'Louvor · Culto de Celebração',min:'Louvor',d:'2026-10-04',role:'Vocal'},{t:'Louvor · Culto de Celebração',min:'Louvor',d:'2026-10-18',role:'Vocal'},{t:'Recepção · Conferência Missões',min:'Recepção',d:'2026-10-09',role:'Porta principal'}].sort((a,b)=>a.d<b.d?-1:1);
const BLOCKS=[{id:'b1',from:'2026-10-24',to:'2026-10-26',why:'Viagem em família'}];
Object.assign(S,{evt:null,etab:'det',eq:'',ef:'todos',etype:'todos',calM:'2026-10',calSel:null,caltab:'igreja',iqf:'todos',iq:''});
const eById=id=>EVTS.find(e=>e.id===id);
const brl=v=>v?`R$ ${(+v).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:2})}`:'Gratuito';
const raised=e=>e.regs.filter(r=>r.pay==='pago').reduce((a,r)=>a+(+r.val||0),0);
const past=e=>e.d&&inDays(e.d)<0;
const tTag=t=>`<span class="stp" style="--c:var(--tone-${ETONE[t]}-ink);--b:color-mix(in srgb,var(--tone-${ETONE[t]}) 55%,transparent)"><i></i>${t}</span>`;
const sPill=e=>e.st==='previsao'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Previsão</span>':past(e)?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizado</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmado</span>';
const dTile=e=>e.st==='previsao'?`<span class="edt prev"><small>prev.</small><b>${e.prev.split('/')[0]}</b><small>${e.prev.split('/')[1]}</small></span>`:`<span class="edt ${past(e)?'past':''}"><small>${wd(e.d)}</small><b>${+e.d.slice(8)}</b><small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></span>`;
const minOpts=v=>`<option value="">Nenhum · evento geral da igreja</option>${MINIS.filter(m=>m.active).map(m=>`<option value="${esc(m.n)}" ${v===m.n?'selected':''}>Ministério de ${esc(m.n)}</option>`).join('')}`;

/* ---------- list ---------- */
function evList(kind){
 const all=EVTS.filter(e=>e.kind===(kind==='cultos'?'culto':'evento')),conf=all.filter(e=>e.st==='confirmado'&&!past(e)),regs=all.reduce((a,e)=>a+e.regs.length,0),paid=all.filter(e=>e.paid);
 const isC=kind==='cultos';
 return `<header class="ph rise"><div><p class="eb">Agenda e serviço</p><h1>${isC?'Cultos':'Eventos'}</h1><p class="lede">${isC?'Cultos recorrentes da igreja':'Eventos especiais: batismos, conferências, retiros…'}</p></div>
  <div class="pact"><div style="position:relative"><button class="btn sec" data-a="gexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="gexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="a lista de ${isC?'cultos':'eventos'}">Lista (CSV)</button><button class="pi" data-a="export" data-v="o calendário (.ics)">Calendário (.ics)</button></div></div>
  <button class="btn pri" data-a="evAdd" data-v="${isC?'culto':'evento'}">${ic('plus',15,2.2)}${isC?'Novo culto':'Novo evento'}</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Próximos confirmados</span><span class="kv">${conf.length}</span><span class="kd">${all.filter(e=>e.st==='previsao').length} em previsão</span></div>
  <div class="k4"><span class="kl">Inscritos</span><span class="kv">${regs}</span><span class="kd">em ${all.filter(e=>e.regs.length).length} ${isC?'cultos':'eventos'}</span></div>
  <div class="k4"><span class="kl">${isC?'Recorrentes':'Arrecadado'}</span><span class="kv">${isC?all.filter(e=>e.rep!=='none').length:brl(paid.reduce((a,e)=>a+raised(e),0))}</span><span class="kd">${isC?'repetem toda semana':`${paid.length} eventos pagos`}</span></div>
 </section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="eq" placeholder="Buscar por título" value="${esc(S.eq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos'],['confirmado','Confirmados'],['previsao','Previsão']].map(c=>`<button class="chipf ${S.ef===c[0]?'on':''}" data-a="evF" data-v="${c[0]}">${c[1]}<small>${c[0]==='todos'?all.length:all.filter(e=>e.st===c[0]).length}</small></button>`).join('')}</div>
  ${isC?'':`<div style="position:relative"><button class="btn sec sel" data-a="etMenu">${S.etype==='todos'?'Todos os tipos':S.etype}${ic('updown',14)}</button><div class="pop" id="etPop" style="right:0;top:calc(100% + 6px)">${['todos',...ETYPES.slice(1)].map(t=>`<button class="pi" data-a="evT" data-v="${t}">${t==='todos'?'Todos os tipos':t}${S.etype===t?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>`}</div>
  <div id="erows">${evRows(all)}</div></section>`;
}
function evRows(all){
 const q=norm(S.eq),l=all.filter(e=>(S.ef==='todos'||e.st===S.ef)&&(S.etype==='todos'||e.type===S.etype)&&(!q||norm(e.t).includes(q))).sort((a,b)=>(a.d||'9'+a.prev)<(b.d||'9'+b.prev)?-1:1);
 if(!l.length)return `<div class="mempty"><p>Nada por aqui.</p><span>Nenhum item corresponde a esses filtros.</span></div>`;
 return `<div class="trow ev thead"><span>Evento</span><span>Tipo</span><span>Status</span><span>Inscrições</span><span></span></div>${l.map(e=>`<div class="trow ev ${past(e)?'off':''}" tabindex="0" data-a="evOpen" data-v="${e.id}">
  <span class="tn">${dTile(e)}<span class="hn"><b>${esc(e.t)}</b><span>${e.st==='previsao'?`Previsto para ${e.prev}`:`${e.time} · ${esc(e.place)}`}${e.min?` · ${esc(e.min)}`:''}${e.rep!=='none'?` · ${ic('swap',11,2)} semanal`:''}</span></span></span>
  <span class="ety">${tTag(e.type)}</span><span class="ts">${sPill(e)}</span>
  <span class="ein">${e.st==='previsao'?`<button class="btn sec sm" data-a="evConfirm" data-v="${e.id}">Confirmar data</button>`:`<span class="eib"><b>${e.regs.length}${e.cap?`<span class="soft">/${e.cap}</span>`:''}</b> ${e.regs.length===1?'inscrito':'inscritos'}${e.cap?`<span class="tr"><i style="width:${Math.min(100,e.regs.length/e.cap*100)}%"></i></span>`:''}</span><span class="eip">${e.paid?brl(e.price):'Gratuito'}</span>`}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`).join('')}<div class="tfoot"><span>${l.length} ${l.length===1?'item':'itens'}</span></div>`;
}

/* ---------- detail ---------- */
function evDetail(){
 const e=eById(S.evt);if(!e){S.evt=null;return calPage();}
 const pg=e.paid,cnt=e.regs.length,pd=e.regs.filter(r=>r.pay==='pago').length;
 const tabs=[['det','Detalhes'],['ins','Inscrições',cnt],...(pg?[['vch','Vouchers',e.vouchers.length]]:[])];
 if(!tabs.some(t=>t[0]===S.etab))S.etab='det';
 return `<nav class="crumb rise"><span class="soft">Agenda e serviço</span>${ic('chevR',13,2)}<button class="lnk back" data-a="evBack">Calendário</button>${ic('chevR',13,2)}<span>${esc(e.t)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid">${dTile(e)}<div class="pn"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><h1>${esc(e.t)}</h1>${tTag(e.type)}${sPill(e)}</div><p>${e.st==='previsao'?`Previsto para ${e.prev}`:`${wd(e.d)}, ${dBR(e.d)} · ${e.time} · ${esc(e.place)}`}${e.min?` · Ministério de ${esc(e.min)}`:''}</p></div></div>
  <div class="pact">${e.st==='previsao'?`<button class="btn pri" data-a="evConfirm" data-v="${e.id}">Confirmar data</button>`:`<button class="btn sec" data-a="copy" data-v="https://alva.app/e/${e.id}">${ic('share',15)}Copiar link</button>`}<div style="position:relative"><button class="ibtn" data-a="evMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="evPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="evDup" data-v="${e.id}">${ic('layers',17)}Duplicar</button><hr><button class="pi danger" data-a="evDel" data-v="${e.id}">${ic('x',17)}Excluir ${e.kind==='culto'?'culto':'evento'}</button></div></div></div>
  ${e.st==='previsao'?'':`<div class="ikpi hk"><div><b>${cnt}${e.cap?`<small class="kof">/${e.cap}</small>`:''}</b><span>Inscritos</span></div>${pg?`<div><b>R$ ${raised(e).toLocaleString('pt-BR')}</b><span>Arrecadado · ${pd} pagos</span></div><div><b>${cnt-pd}</b><span>Pagamentos pendentes</span></div>`:`<div><b>Gratuito</b><span>Inscrição</span></div>`}<div><b>${{off:'Sem check-in',inteiro:'1 código',periodo:e.periods.length+' códigos'}[e.checkin]}</b><span>Check-in</span></div></div>`}
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${S.etab===t[0]?'on':''}" data-a="evTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="etb" class="rise" style="--d:2">${({det:evDet,ins:evIns,vch:evVch})[S.etab](e)}</div>`;
}
function evDet(e){
 const ed=S.eedit;
 return `<div class="pgrid"><div class="col">
  <section class="card pc sec ${ed?'editing':''}"><div class="sh"><h2>Informações</h2>${ed?'':`<button class="btn sec sm" data-a="evEdit">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" id="eiF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(e.t)}"><span class="err"></span></label>
   ${e.st==='previsao'?`<label class="fld"><span class="fl">Previsto para</span><input name="prev" value="${esc(e.prev)}" placeholder="Fev/2027"><span class="err"></span></label>`:`<label class="fld"><span class="fl">Data</span><input name="d" type="date" value="${e.d}"><span class="err"></span></label><label class="fld"><span class="fl">Horário</span><input name="time" value="${esc(e.time)}"></label><label class="fld"><span class="fl">Local</span><input name="place" value="${esc(e.place)}"></label>`}
   ${e.kind==='evento'?`<label class="fld"><span class="fl">Tipo</span><span class="selw"><select name="type">${ETYPES.slice(1).map(t=>`<option ${t===e.type?'selected':''}>${t}</option>`).join('')}</select>${ic('updown',14)}</span></label>`:''}
   <label class="fld wide"><span class="fl">Ministério responsável <small>opcional</small></span><span class="selw"><select name="min">${minOpts(e.min)}</select>${ic('updown',14)}</span><span class="hint">Diz quem organiza. Um culto do Ministério de Jovens continua sendo do tipo Culto, mas fica identificado como voltado aos jovens.</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="evCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid2"><div><dt>Data</dt><dd>${e.st==='previsao'?`<span class="soft">Previsto para ${e.prev}</span>`:`${wd(e.d)}, ${dBR(e.d)} · ${e.time}`}</dd></div><div><dt>Local</dt><dd>${esc(e.place)}</dd></div><div><dt>Tipo</dt><dd>${e.type}${e.rep!=='none'?' · repete toda semana':''}</dd></div><div><dt>Ministério</dt><dd>${e.min?'Ministério de '+esc(e.min):'<span class="soft">Evento geral da igreja</span>'}</dd></div></dl>`}</section>
  ${e.st==='previsao'?`<section class="card pc"><div class="soft-empty"><p>Ainda é uma previsão.</p><span class="who">Inscrições, pagamento e check-in ficam disponíveis quando a data for confirmada.</span><button class="btn pri" data-a="evConfirm" data-v="${e.id}">Confirmar data</button></div></section>`:`
  <section class="card pc"><div class="sh"><h2>Inscrição</h2></div>
   <div class="yn" style="max-width:280px" id="payG"><label><input type="radio" name="pay" value="0" ${!e.paid?'checked':''}><span>Gratuita</span></label><label><input type="radio" name="pay" value="1" ${e.paid?'checked':''}><span>Paga</span></label></div>

   ${e.paid?`<div class="fld" style="margin-top:16px"><span class="fl">Link de pagamento</span><div class="asaas">${e.link?`<span class="mono">${esc(e.link.replace('https://',''))}</span><button class="btn sec sm" data-a="copy" data-v="${esc(e.link)}">Copiar</button>`:`<span class="soft">Ainda não gerado</span><button class="btn pri sm" data-a="evAsaas">Gerar no Asaas</button>`}</div><span class="hint">Pagamento, PIX, cartão e reembolso são processados pelo Asaas. O Alva só mostra o status.</span></div>`:''}
  </section>`}
 </div><div class="col">${e.st==='previsao'?'':`
  <section class="card pc"><div class="sh"><h2>Check-in</h2></div><p class="who" style="margin:-6px 0 12px">Escolha de quem monta o evento, independe de ser gratuito ou pago.</p>
   <div class="vis" id="ckG">${[['off','Desabilitado','Sem controle de entrada.'],['inteiro','Evento inteiro','Um código vale para o evento todo.'],['periodo','Por período','Um código por dia ou turno.']].map(o=>`<label><input type="radio" name="ck" value="${o[0]}" ${e.checkin===o[0]?'checked':''}><span><b>${o[1]}</b><small>${o[2]}</small></span></label>`).join('')}</div>
   ${e.checkin==='inteiro'?`<div class="fld ckc"><span class="fl">Código de acesso</span><div class="ccode"><span class="mono">${codeOf(e,'*')}</span><button class="btn sec sm" data-a="copy" data-v="${codeOf(e,'*')}">Copiar</button><button class="ibtn sm" data-a="ckRegen" data-v="*" aria-label="Gerar novo código" title="Gerar novo código">${ic('swap',14)}</button></div><span class="hint">Vale do início ao fim do evento. Use no totem ou no app de check-in.</span></div>`:''}
   ${e.checkin==='periodo'?`<div class="fld ckc"><span class="fl">Períodos <small>cada um gera seu próprio código</small></span>
    ${e.periods.length?`<div class="pers">${e.periods.map((p,i)=>`<div class="per"><span class="pn">${esc(p)}</span><span class="mono">${codeOf(e,p)}</span><button class="ibtn sm" data-a="copy" data-v="${codeOf(e,p)}" aria-label="Copiar código de ${esc(p)}" title="Copiar">${ic('clipboard',14)}</button><button class="ibtn sm" data-a="evPerDel" data-v="${i}" aria-label="Remover ${esc(p)}" title="Remover">${ic('x',14)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhum período ainda. Adicione o primeiro, ex.: Sábado.</p>'}
    <form class="perF" id="perF"><input placeholder="Ex.: Sábado" aria-label="Novo período" autocomplete="off"><button class="btn sec sm" type="submit">${ic('plus',13,2.2)}Adicionar período</button></form></div>`:''}
  </section>
  ${e.checkin==='off'?'':`<section class="card pc"><div class="sh"><h2>Itens adicionais</h2><span class="who">almoço, lanche, camiseta…</span></div>
   ${e.items.length?`<div class="eitems">${e.items.map((it,i)=>`<div class="eit"><span><b>${esc(it.n)}</b><small>${it.p||'Evento inteiro'}</small></span><b class="mono">${brl(it.price)}</b><button class="ibtn sm" data-a="evItemDel" data-v="${i}" aria-label="Remover">${ic('x',14)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0 0 12px">Nenhum item ainda. Itens são compras opcionais feitas junto com a inscrição.</p>'}
   <form class="itF ${e.checkin==='periodo'&&e.periods.length?'wp':''}" id="itF"><input name="n" placeholder="Ex.: Almoço" aria-label="Item"><span class="mpre sm"><em>R$</em><input name="p" type="number" min="1" placeholder="0" aria-label="Preço"></span>${e.checkin==='periodo'&&e.periods.length?`<span class="selw"><select name="per" aria-label="Vale para"><option value="">Evento inteiro</option>${e.periods.map(p=>`<option>${esc(p)}</option>`).join('')}</select>${ic('updown',13)}</span>`:''}<button class="btn sec sm" type="submit">${ic('plus',13,2.2)}Adicionar item</button></form></section>`}`}
 </div></div>`;
}
function evIns(e){
 const pd=e.regs.filter(r=>r.pay==='pago').length;
 return `<section class="card mtab"><div class="tbar"><span class="who" style="margin-right:auto"><b style="color:var(--ink)">${e.regs.length}</b>${e.cap?` de ${e.cap} vagas`:' inscritos'}${e.paid?` · ${pd} pagos · ${brl(raised(e))}`:''}</span><button class="btn pri sm" data-a="evReg">${ic('plus',14,2.2)}Adicionar inscrição</button></div>
  ${e.regs.length?`<div class="trow rg thead"><span>Nome</span><span>Inscrição</span>${e.paid?'<span>Pagamento</span><span>Valor</span>':''}<span></span></div>${e.regs.map(r=>`<div class="trow rg ${e.paid?'':'free'} ${S.rgHi===r.id?'hi':''}" id="rg-${r.id}" tabindex="0" data-a="rgView" data-v="${r.id}" style="cursor:pointer"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span class="hn"><b>${esc(r.n)}</b>${r.vch?`<span class="mono vtag">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</span></span>
   <span class="rdt">${dBR(r.d)}</span>${e.paid?`<span class="ts">${r.pay==='pago'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago</span>':'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente</span>'}</span><span class="rv mono">${r.val?brl(r.val):'Bolsa'}</span>`:''}
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="rgMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rgPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rgView" data-v="${r.id}">${ic('eye',16)}Ver inscrição</button><hr>${e.paid&&r.pay!=='pago'?`<button class="pi" data-a="rgPaid" data-v="${r.id}">${ic('check',16)}Marcar como pago</button><button class="pi" data-a="rgLink" data-v="${r.id}">${ic('mail',16)}Reenviar link de pagamento</button><hr>`:''}<button class="pi danger" data-a="rgDel" data-v="${r.id}">${ic('x',16)}Cancelar inscrição</button></div></div></span></div>`).join('')}`
  :`<div class="mempty"><p>Ninguém inscrito ainda.</p><span>Compartilhe o link do evento ou adicione alguém manualmente.</span></div>`}</section>`;
}
function evVch(e){
 return `<section class="card mtab"><div class="tbar"><span class="who" style="margin-right:auto">Códigos de desconto válidos só para este evento.</span><button class="btn pri sm" data-a="vAdd">${ic('plus',14,2.2)}Novo voucher</button></div>
  ${e.vouchers.length?`<div class="vgrid">${e.vouchers.map((v,i)=>{const exp=v.exp&&inDays(v.exp)<0;return `<article class="vc ${exp?'exp':''}"><div class="vc1"><span class="mono vcode">${esc(v.code)}</span><button class="ibtn sm" data-a="vDel" data-v="${i}" aria-label="Excluir voucher">${ic('x',14)}</button></div>
   <div class="vc2"><b>${v.disc>=e.price?'100%':'− '+brl(v.disc)}</b><span>${v.disc>=e.price?'bolsa integral':`paga ${brl(Math.max(0,e.price-v.disc))}`}</span></div>
   <div class="vc3"><span>${v.mode==='liberado'?`${ic('users',13)}Qualquer pessoa`:`${ic('lock',13)}${esc(v.email)}`}</span><span>${v.uses} ${v.uses===1?'uso':'usos'}</span></div>
   <div class="vc4 ${exp?'bad':''}">${v.exp?(exp?`Expirou em ${dBR(v.exp)}`:`Vale até ${dBR(v.exp)}`):'Nunca expira'}</div></article>`;}).join('')}</div>`:`<div class="mempty"><p>Nenhum voucher.</p><span>Crie códigos de desconto ou bolsas para este evento.</span></div>`}</section>`;
}

const codeOf=(e,p)=>{e.codes=e.codes||{};if(!e.codes[p]){const a='ABCDEFGHJKMNPQRSTUVWXYZ23456789';let h=0;for(const c of e.id+p+(e.seed||''))h=(h*31+c.charCodeAt(0))>>>0;let o='';for(let k=0;k<6;k++){o+=a[h%a.length];h=Math.floor(h/a.length)+k*7919;}e.codes[p]=o.slice(0,3)+'-'+o.slice(3);}return e.codes[p];};
function tickets(e,r){
 const num=String(400+EVTS.indexOf(e)*37+e.regs.indexOf(r)+1),slug=t=>norm(t).replace(/[^a-z0-9]+/g,'-').toUpperCase();
 const acc=e.checkin==='off'?[{k:'insc',n:'Inscrição',tag:'Inscrição',code:''}]:e.checkin==='inteiro'?[{k:'geral',n:'Entrada geral',tag:'Acesso',code:`ALVA-${num}-ACESSO-GERAL`}]:e.periods.map(p=>({k:'p:'+p,n:'Entrada · '+p,tag:'Acesso',code:`ALVA-${num}-${slug(p)}`}));
 if(r.buy===undefined)r.buy=e.items.map((_,i)=>i).filter(i=>(r.n.length+i)%2===0&&r.pay!=='pendente');
 const its=r.buy.filter(i=>e.items[i]).map(i=>{const it=e.items[i];return {k:'i:'+i,n:it.n+(it.p?' · '+it.p:''),tag:'Compra',price:it.price,code:e.checkin==='off'?'':`ALVA-${num}-${slug(it.n+(it.p?'-'+it.p:''))}`};});
 return [...acc,...its];
}
function rgDlg(e,rid){
 const r=e.regs.find(x=>x.id===rid);if(!r)return;r.ck=r.ck||{};
 const mail=(MEMBERS.find(m=>m.n===r.n)||{}).e||norm(r.n).replace(/\s+/g,'.')+'@email.com';
 const tk=tickets(e,r),tot=(+r.val||0)+tk.filter(t=>t.price).reduce((a,t)=>a+t.price,0),done=tk.filter(t=>r.ck[t.k]).length,blocked=e.paid&&r.pay!=='pago';
 openDlg(`<div class="dh"><div class="drh"><span class="av lg" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><div><h3>${esc(r.n)}</h3><p>${esc(e.t)}</p></div></div><button class="ibtn sm" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  <dl class="kv grid2 rgkv"><div><dt>E-mail</dt><dd><span class="cp" data-a="copy" data-v="${esc(mail)}">${esc(mail)}</span></dd></div><div><dt>Inscrição</dt><dd>${dBR(r.d)}</dd></div>
   ${e.paid?`<div><dt>Pagamento</dt><dd>${r.pay==='pago'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago</span>':'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente</span>'}</dd></div><div><dt>Total</dt><dd class="mono">${tot?brl(tot):'Bolsa integral'}${r.vch?` <span class="vtag mono">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</dd></div>`:''}</dl>
  <div class="sh" style="margin:20px 0 10px"><span class="fl">Ingressos e compras</span><span class="who">${e.checkin==='off'?'check-in desabilitado':`${done} de ${tk.length} com check-in`}</span></div>
  ${blocked?`<div class="rgwarn">${ic('alert',14,2)}O check-in libera quando o pagamento for confirmado.</div>`:''}
  <div class="tks">${tk.map(t=>{const c=r.ck[t.k];return `<div class="tk ${c?'in':''}"><div class="tkl"><div class="tk1"><b>${esc(t.n)}</b><span class="stp" style="--c:${t.tag==='Compra'?'var(--st-ace)':'var(--st-int)'};--b:${t.tag==='Compra'?'var(--st-ace-bg)':'var(--st-int-bg)'}"><i></i>${t.tag}</span>${t.price?`<span class="mono who">${brl(t.price)}</span>`:''}</div>${t.code?`<span class="mono tkc">${t.code}</span>`:''}</div>
   ${e.checkin==='off'?'':c?`<button class="tks-st ok" data-a="rgCk" data-v="${r.id}|${t.k}" title="Desfazer check-in">${ic('check',13,2.6)}Entrou às ${c}</button>`:`<button class="tks-st" data-a="rgCk" data-v="${r.id}|${t.k}" ${blocked?'disabled':''}>Aguardando · fazer check-in</button>`}</div>`;}).join('')}</div>
  <div class="dfoot" style="justify-content:space-between;margin-top:18px">${e.paid&&r.pay!=='pago'?`<button class="btn sec" data-a="rgLinkD" data-v="${r.id}">${ic('mail',15)}Reenviar link</button>`:'<span></span>'}<button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'');
}
/* ---------- calendário ---------- */
function calPage(){
 return `<header class="ph rise"><div><p class="eb">Agenda e serviço</p><h1>Calendário</h1><p class="lede">${S.caltab==='igreja'?'Todos os cultos e eventos da igreja':'Suas escalas e os períodos em que você não pode servir'}</p></div><div class="pact">${S.caltab==='igreja'?`<div style="position:relative"><button class="btn sec" data-a="gexpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="gexpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="o calendário (.ics)">Calendário (.ics)</button><button class="pi" data-a="export" data-v="os eventos do mês (CSV)">Eventos do mês (CSV)</button></div></div><button class="btn pri" data-a="evAdd" data-v="evento">${ic('plus',15,2.2)}Adicionar evento</button>`:`<button class="btn pri" data-a="blkAdd">${ic('plus',15,2.2)}Bloquear período</button>`}</div></header>
 <div class="utabs rise" style="--d:1">${[['igreja','Calendário da igreja'],['minha','Minha agenda']].map(t=>`<button class="${S.caltab===t[0]?'on':''}" data-a="calTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
 <div class="rise" style="--d:2">${S.caltab==='igreja'?calGrid():myAgenda()}</div>`;
}
function calGrid(){
 const [y,m]=S.calM.split('-').map(Number),first=new Date(y,m-1,1),days=new Date(y,m,0).getDate(),off=first.getDay();
 const iso=d=>`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
 const on=d=>EVTS.filter(e=>e.d===iso(d)),mine=d=>MYESC.filter(x=>x.d===iso(d)),blk=d=>BLOCKS.some(b=>iso(d)>=b.from&&iso(d)<=b.to);
 const sel=S.calSel&&S.calSel.startsWith(S.calM)?S.calSel:null;
 const cells=[];for(let i=0;i<off;i++)cells.push('<span class="cd0"></span>');
 for(let d=1;d<=days;d++){const es=on(d),me=mine(d),td=iso(d)==='2026-10-01';cells.push(`<button class="cdy ${td?'today':''} ${sel===iso(d)?'sel':''}" data-a="calDay" data-v="${iso(d)}"><span class="cn">${d}</span>${es.slice(0,2).map(e=>`<span class="cev" style="--t:var(--tone-${ETONE[e.type]});--ti:var(--tone-${ETONE[e.type]}-ink)">${esc(e.t)}</span>`).join('')}${es.length>2?`<span class="cmore">+${es.length-2}</span>`:''}</button>`);}
 const list=sel?[...on(+sel.slice(8))]:EVTS.filter(e=>e.d&&e.d.startsWith(S.calM)).sort((a,b)=>a.d<b.d?-1:1);
 return `<div class="calw"><section class="card pc cal"><div class="sh"><h2>${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} ${y}</h2><div class="row2"><button class="ibtn sm" data-a="calM" data-v="-1" aria-label="Mês anterior">${ic('chevL',15,2)}</button><button class="btn sec sm" data-a="calM" data-v="0">Hoje</button><button class="ibtn sm" data-a="calM" data-v="1" aria-label="Próximo mês">${ic('chevR',15,2)}</button></div></div>
  <div class="cgrid">${['dom','seg','ter','qua','qui','sex','sáb'].map(x=>`<span class="cwd">${x}</span>`).join('')}${cells.join('')}</div>
  <div class="cleg">${ETYPES.map(t=>`<span><i class="lt" style="background:var(--tone-${ETONE[t]})"></i>${t}</span>`).join('')}</div></section>
  <section class="card pc"><div class="sh"><h2>${sel?`${wd(sel)}, ${fmtD(sel)}`:'Neste mês'}</h2>${sel?'<button class="lnk" data-a="calDay" data-v="">Ver o mês</button>':''}</div>
   ${list.length?`<div class="clist">${list.map(e=>`<button class="dk" data-a="evOpen" data-v="${e.id}">${dTile(e)}<span class="dkt"><b>${esc(e.t)}</b><span>${e.time} · ${esc(e.place)}</span></span>${tTag(e.type)}</button>`).join('')}</div>`:'<p class="who" style="margin:0">Nada marcado.</p>'}
   ${!sel&&EVTS.some(e=>e.st==='previsao')?`<p class="fl" style="margin:16px 0 8px">Em previsão</p><div class="clist">${EVTS.filter(e=>e.st==='previsao').map(e=>`<button class="dk" data-a="evOpen" data-v="${e.id}">${dTile(e)}<span class="dkt"><b>${esc(e.t)}</b><span>Data a confirmar</span></span></button>`).join('')}</div>`:''}</section></div>`;
}
function myAgenda(){
 return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Minhas escalas</h2><span class="who">${MYESC.length} confirmadas</span></div>${myLimit()}
  <div class="clist">${MYESC.map(x=>`<div class="dk" style="cursor:default"><span class="edt"><small>${wd(x.d)}</small><b>${+x.d.slice(8)}</b><small>${MONTHS[+x.d.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(x.t)}</b><span>${esc(x.role)} · ${inDays(x.d)<=7?'<b style="color:var(--st-sol)">em '+inDays(x.d)+' dias</b>':'em '+inDays(x.d)+' dias'}</span></span><button class="btn sec sm" data-a="escSwap">Pedir troca</button></div>`).join('')}</div></section>
 <section class="card pc"><div class="sh"><h2>Meus bloqueios</h2><span class="who">${BLOCKS.length}</span></div>
  <p class="who" style="margin:-6px 0 14px">Nesses dias você não é sugerido em nenhuma escala: Louvor, Kids, Recepção ou qualquer outro ministério.</p>
  ${BLOCKS.length?`<div class="clist">${BLOCKS.map((b,i)=>`<div class="dk blkr" style="cursor:default"><span class="kfi" style="flex:none">${ic('pause',15)}</span><span class="dkt"><b>${b.from===b.to?fmtD(b.from):`${fmtD(b.from)} a ${fmtD(b.to)}`}</b><span>${esc(b.why||'Sem motivo informado')}</span></span><button class="ibtn sm" data-a="blkDel" data-v="${i}" aria-label="Remover bloqueio">${ic('x',14)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhum período bloqueado.</p>'}</section></div>`;
}

/* ---------- inscrições (todas) ---------- */
function insSum(rows,pend){
 const v=r=>+r.val||0,rec=rows.filter(r=>r.pay==='pago').reduce((a,r)=>a+v(r),0),aR=pend.reduce((a,r)=>a+v(r),0),tot=rec+aR,pct=tot?Math.round(rec/tot*100):0,paid=rows.filter(r=>r.pay==='pago'),tk=paid.filter(r=>v(r)>0);
 const evs=EVTS.filter(e=>e.paid&&e.regs.length).map(e=>({e,r:e.regs.filter(x=>x.pay==='pago').reduce((a,x)=>a+v(x),0),p:e.regs.filter(x=>x.pay==='pendente').reduce((a,x)=>a+v(x),0)})).sort((a,b)=>(b.r+b.p)-(a.r+a.p)),mx=Math.max(1,...evs.map(x=>x.r+x.p));
 const m=n=>`<small>R$</small>${n.toLocaleString('pt-BR')}`;
 return `<section class="card insum rise" style="--d:1">
  <div class="ism"><span class="kl">Arrecadado</span><b class="ismv">${m(rec)}</b><span class="kd">de <b>R$ ${tot.toLocaleString('pt-BR')}</b> previstos · ${pct}% recebido</span>
   <div class="isbar" role="img" aria-label="${pct}% recebido"><i style="width:${pct}%"></i><em style="width:${100-pct}%"></em></div>
   <div class="islg"><span><i class="r"></i>Recebido<b>R$ ${rec.toLocaleString('pt-BR')}</b></span><span><i class="p"></i>A receber<b style="color:var(--st-sol)">R$ ${aR.toLocaleString('pt-BR')}</b></span></div></div>
  <div class="isev"><span class="kl">Por evento</span>${evs.map(x=>`<button class="isr" data-a="evOpenIns" data-v="${x.e.id}"><span class="isn">${esc(x.e.t)}</span><span class="isb"><i style="width:${x.r/mx*100}%"></i><em style="width:${x.p/mx*100}%"></em></span><span class="isvv">R$ ${x.r.toLocaleString('pt-BR')}${x.p?`<small>+${x.p.toLocaleString('pt-BR')}</small>`:''}</span></button>`).join('')}${pend.length?`<div class="isfoot"><span>${ic('alert',14,2)}<b>${pend.length}</b> pagamento${pend.length===1?'':'s'} pendente${pend.length===1?'':'s'} · R$ ${aR.toLocaleString('pt-BR')}</span><button class="btn sec sm" data-a="insCharge">${ic('mail',13)}Reenviar links</button></div>`:''}</div>
  <div class="isct">
   <div><b>${rows.length}</b><span>Inscrições<small>em ${EVTS.filter(e=>e.regs.length).length} eventos</small></span></div>
   <div><b style="${pend.length?'color:var(--st-sol)':''}">${pend.length}</b><span>Pendentes<small>sem pagar ainda</small></span></div>
   <div><b>${tk.length?'R$ '+Math.round(tk.reduce((a,r)=>a+v(r),0)/tk.length):'—'}</b><span>Ticket médio<small>só inscrições pagas</small></span></div>
  </div></section>`;
}

function inscPage(){
 const rows=EVTS.flatMap(e=>e.regs.map(r=>({...r,e}))),q=norm(S.iq);
 const l=rows.filter(r=>(S.iqf==='todos'||(S.iqf==='pago'?r.pay==='pago':S.iqf==='pendente'?r.pay==='pendente':r.pay==='—'))&&(!q||norm(r.n+' '+r.e.t).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 const pend=rows.filter(r=>r.pay==='pendente');
 return `<header class="ph rise"><div><p class="eb">Agenda e serviço</p><h1>Inscrições</h1><p class="lede">Todas as inscrições em cultos e eventos</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="as inscrições">Exportar CSV</button></div></header>
 ${insSum(rows,pend)}
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="iq2" placeholder="Buscar pessoa ou evento" value="${esc(S.iq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todas'],['pendente','Pendentes'],['pago','Pagas'],['gratis','Gratuitas']].map(c=>`<button class="chipf ${S.iqf===c[0]?'on':''}" data-a="iqF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="trow ai thead"><span>Pessoa</span><span>Evento</span><span>Pagamento</span><span>Data</span></div>${l.map(r=>`<div class="trow ai" tabindex="0" data-a="evOpenIns" data-v="${r.e.id}|${r.id}"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span><b>${esc(r.n)}</b></span></span><span class="aev">${esc(r.e.t)}</span><span class="ts">${r.pay==='pago'?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago · ${r.val?brl(r.val):'bolsa'}</span>`:r.pay==='pendente'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente · ${brl(r.val)}</span>`:'<span class="soft">Gratuita</span>'}</span><span class="rdt">${dBR(r.d)}</span></div>`).join('')}`:'<div class="mempty"><p>Nada encontrado.</p></div>'}
  <div class="tfoot"><span>${l.length} inscrições</span></div></section>`;
}

/* ---------- behaviour ---------- */
function agAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#eq');if(q)q.addEventListener('input',x=>{S.eq=x.target.value;$('#erows').innerHTML=evRows(EVTS.filter(e=>e.kind===(S.active==='cultos'?'culto':'evento')));});
 const q2=$('#iq2');if(q2)q2.addEventListener('input',x=>{S.iq=x.target.value;const p=x.target.selectionStart;render();const n=$('#iq2');n.focus();n.setSelectionRange(p,p);});
 const e=S.evt&&eById(S.evt);if(!e)return;
 const f=$('#eiF');if(f)f.addEventListener('submit',x=>{x.preventDefault();const fd=new FormData(f),t=fd.get('t').trim();if(!t){const i=f.t;i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Informe o título';i.focus();return;}
  if(f.d&&!f.d.value){f.d.closest('.fld').classList.add('bad');f.d.nextElementSibling.textContent='Escolha a data';return;}f.querySelector('[type=submit]').classList.add('busy');
  setTimeout(()=>{e.t=t;['d','time','place','type','min','prev'].forEach(k=>{if(fd.has(k))e[k]=fd.get(k);});S.eedit=false;render();toast('Informações atualizadas');},600);});
 const pg=$('#payG');if(pg)pg.addEventListener('change',x=>{e.paid=x.target.value==='1';if(e.paid&&!e.price)e.price=50;rerEv();toast(e.paid?'Inscrição agora é paga':'Inscrição agora é gratuita');});
 const pr=$('#ePrice');if(pr)pr.addEventListener('change',()=>{const v=+pr.value;if(v>0){e.price=v;toast(`Valor alterado para ${brl(v)}`);rerEv();}else pr.value=e.price;});
 const cp=$('#eCap');if(cp)cp.addEventListener('change',()=>{const v=+cp.value;if(cp.value&&v<e.regs.length){toast(`Já há ${e.regs.length} inscritos; as vagas não podem ser menos que isso`);cp.value=e.cap||'';return;}e.cap=v||0;toast(v?`${v} vagas`:'Sem limite de vagas');rerEv();});
 const ck=$('#ckG');if(ck)ck.addEventListener('change',x=>{e.checkin=x.target.value;rerEv();toast({off:'Check-in desabilitado',inteiro:'Um código para o evento inteiro',periodo:'Um código por período'}[e.checkin]);});
 const pf=$('#perF');if(pf)pf.addEventListener('submit',x=>{x.preventDefault();const i=pf.querySelector('input'),v=i.value.trim();if(!v)return i.focus();if(e.periods.some(p=>norm(p)===norm(v))){toast('Esse período já existe');return;}e.periods.push(v);rerEv();$('#perF input')?.focus();});
 const it=$('#itF');if(it)it.addEventListener('submit',x=>{x.preventDefault();const fd=new FormData(it),n=fd.get('n').trim(),p=+fd.get('p');if(!n){it.n.focus();return;}if(!(p>0)){it.p.focus();toast('Informe o preço do item');return;}e.items.push({n,price:p,p:fd.get('per')||''});rerEv();toast(`${n} adicionado`);});
}
function rerEv(){const y=window.scrollY;render();window.scrollTo(0,y);}
function evForm(kind,pre){
 const isC=kind==='culto',st=pre?.st||'confirmado';
 openDlg(`${dlgHead(pre?.confirm?`Confirmar ${esc(pre.t)}`:isC?'Novo culto':'Novo evento',pre?.confirm?`Previsto para ${pre.prev}. Defina a data para abrir inscrições.`:'')}
 <form class="fgrid" id="evF" novalidate style="grid-template-columns:1fr 1fr">
  ${pre?.confirm?'':`<div class="fld wide"><span class="fl">Situação</span><div class="vis two" id="stG"><label><input type="radio" name="st" value="confirmado" ${st==='confirmado'?'checked':''}><span><b>Confirmado</b><small>Data fechada. Abre inscrições e pagamento.</small></span></label><label><input type="radio" name="st" value="previsao" ${st==='previsao'?'checked':''}><span><b>Previsão</b><small>Sem data. Só reserva o mês no planejamento.</small></span></label></div></div>`}
  <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(pre?.t||'')}" placeholder="${isC?'Ex.: Culto de Celebração':'Ex.: Retiro de Casais'}" autocomplete="off"><span class="err"></span></label>
  <label class="fld cf"><span class="fl">Data</span><input name="d" type="date" min="2026-10-01"><span class="err"></span></label>
  <label class="fld cf"><span class="fl">Horário</span><input name="time" type="time" value="${isC?'10:00':'19:30'}"></label>
  <label class="fld pf wide"><span class="fl">Previsto para</span><input name="prev" placeholder="Ex.: Fev/2027"><span class="err"></span></label>
  ${isC?`<div class="fld cf wide"><span class="fl">Repetição</span><div class="yn"><label><input type="radio" name="rep" value="none"><span>Não repete</span></label><label><input type="radio" name="rep" value="semanal" checked><span>Toda semana</span></label><label><input type="radio" name="rep" value="mensal"><span>Todo mês</span></label></div></div>`
   :`<label class="fld"><span class="fl">Tipo</span><span class="selw"><select name="type">${ETYPES.slice(1).map(t=>`<option ${pre?.type===t?'selected':''}>${t}</option>`).join('')}</select>${ic('updown',14)}</span></label>`}
  <label class="fld ${isC?'wide':''}"><span class="fl">Ministério <small>opcional</small></span><span class="selw"><select name="min">${minOpts(pre?.min||'')}</select>${ic('updown',14)}</span></label>
  <div class="fld cf wide"><span class="fl">Inscrição</span><div class="yn" id="fpG" style="max-width:280px"><label><input type="radio" name="pay" value="0" checked><span>Gratuita</span></label><label><input type="radio" name="pay" value="1"><span>Paga</span></label></div></div>
  <label class="fld cf pay" hidden><span class="fl">Valor</span><span class="mpre"><em>R$</em><input name="price" type="number" min="1" inputmode="decimal"></span><span class="err"></span></label>
  <label class="fld cf"><span class="fl">Vagas <small>opcional</small></span><input name="cap" type="number" min="1" placeholder="Sem limite" inputmode="numeric"></label>
  <p class="hint wide cf pay" hidden style="margin:-6px 0 0">O link de pagamento do Asaas pode ser gerado na página do evento.</p>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${pre?.confirm?'Confirmar data':'Criar'}</button></div></form>`);
 const f=$('#evF'),sync=()=>{const prev=(f.st&&f.st.value)==='previsao',paid=f.querySelector('[name=pay]:checked').value==='1';f.querySelectorAll('.cf').forEach(x=>x.hidden=prev);f.querySelectorAll('.pf').forEach(x=>x.hidden=!prev);f.querySelectorAll('.pay').forEach(x=>x.hidden=prev||!paid);};
 f.addEventListener('change',sync);f.addEventListener('input',x=>x.target.closest('.fld')?.classList.remove('bad'));sync();
 f.addEventListener('submit',x=>{x.preventDefault();const fd=new FormData(f),prev=fd.get('st')==='previsao';let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;if(ok)i.focus();ok=false;};
  const t=fd.get('t').trim();if(!t)bad('t','Informe o título');
  if(prev){if(!/^[A-Za-zç]{3}\/\d{4}$/.test(fd.get('prev').trim()))bad('prev','Use mês/ano, ex.: Fev/2027');}else{if(!fd.get('d'))bad('d','Escolha a data');if(fd.get('pay')==='1'&&!(+fd.get('price')>0))bad('price','Informe o valor');}
  if(!ok)return;f.querySelector('[type=submit]').classList.add('busy');
  setTimeout(()=>{const tm=(fd.get('time')||'').replace(':00','h').replace(/^0/,'').replace(':','h');const data={t,type:isC?'Culto':fd.get('type'),min:fd.get('min'),st:prev?'previsao':'confirmado',prev:prev?fd.get('prev').trim():'',d:prev?'':fd.get('d'),time:tm||'19h',paid:!prev&&fd.get('pay')==='1',price:+fd.get('price')||0,cap:+fd.get('cap')||0,rep:fd.get('rep')||'none'};
   let e;if(pre?.confirm){e=eById(pre.id);Object.assign(e,data,{t:e.t,type:e.type,st:'confirmado',prev:''});}else{e=EV({kind,...data});EVTS.push(e);}
   closeDlg();S.evt=e.id;S.etab='det';S.active='calendario';render();window.scrollTo({top:0});toast(pre?.confirm?`${e.t} confirmado para ${dBR(e.d)}`:`${t} criado`);},700);});
}
const GA={
 gexpMenu:()=>{const p=$('#gexpPop');closePops(p);p.classList.toggle('open');},
 etMenu:()=>{const p=$('#etPop');closePops(p);p.classList.toggle('open');},
 evMenu:()=>{const p=$('#evPop');closePops(p);p.classList.toggle('open');},
 rgView:(v,b,x)=>{if(x&&x.target.closest('.hact'))return;closePops();rgDlg(eById(S.evt),v);},
 rgCk:v=>{const [rid,k]=v.split('|'),e=eById(S.evt),r=e.regs.find(x=>x.id===rid);r.ck=r.ck||{};if(r.ck[k]){const old=r.ck[k];delete r.ck[k];rgDlg(e,rid);toast('Check-in desfeito',()=>{r.ck[k]=old;rgDlg(e,rid);});return;}r.ck[k]=new Date().toTimeString().slice(0,5);rgDlg(e,rid);toast(`Check-in de ${r.n.split(' ')[0]} registrado`);},
 rgMenu:v=>{const p=$('#rgPop-'+v);closePops(p);p.classList.toggle('open');},
 evF:v=>{S.ef=v;render();},
 evT:v=>{S.etype=v;closePops();render();},
 evOpen:(v,b,x)=>{if(x&&x.target.closest('[data-a=evConfirm]'))return;const e=eById(v);S.evFrom=S.active==='calendario'&&!S.evt?'calendario':S.evFrom&&S.evt?S.evFrom:S.active;S.active='calendario';S.evt=v;S.etab='det';S.eedit=false;render();window.scrollTo({top:0});},
 insCharge:(v,b)=>busy(b,1000,'Enviado',()=>toast('Link de pagamento reenviado para quem está pendente')),
 evOpenIns:v=>{const [eid,rid]=v.split('|');GA.evOpen(eid);S.etab='ins';S.rgHi=rid||null;render();if(rid)setTimeout(()=>{const el=document.getElementById('rg-'+rid);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.focus({preventScroll:true});}setTimeout(()=>{S.rgHi=null;el&&el.classList.remove('hi');},2600);},80);},
 evBack:()=>{S.evt=null;S.active='calendario';render();window.scrollTo({top:0});},
 evTab:v=>{S.etab=v;S.eedit=false;render();},
 evEdit:()=>{S.eedit=true;rerEv();$('#eiF [name=t]')?.focus();},
 evCancel:()=>{S.eedit=false;rerEv();},
 evAdd:v=>evForm(v),
 evConfirm:(v,b,x)=>{x&&x.stopPropagation();const e=eById(v);
  openDlg(`${dlgHead('Confirmar evento',`Defina a data de <b>${esc(e.t)}</b> (previsto para ${e.prev}) e se a inscrição é gratuita ou paga. O link do Asaas você gera depois, na página do evento.`)}
  <form class="fgrid" id="cfF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Data confirmada</span><input name="d" type="date" min="2026-10-01"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input name="time" type="time" value="19:30"></label>
   <div class="fld wide"><span class="fl">Inscrição</span><div class="yn" id="cfP" style="max-width:280px"><label><input type="radio" name="pay" value="0" checked><span>Gratuita</span></label><label><input type="radio" name="pay" value="1"><span>Paga</span></label></div></div>
   <label class="fld" id="cfV" hidden><span class="fl">Valor da taxa</span><span class="mpre"><em>R$</em><input name="price" type="number" min="1" inputmode="decimal"></span><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Confirmar evento</button></div></form>`,'sm');
  const f=$('#cfF'),mo=()=>{const p=f.querySelector('[name=pay]:checked').value==='1';$('#cfV').hidden=!p;if(p)setTimeout(()=>f.price.focus(),30);};
  $('#cfP').addEventListener('change',mo);f.addEventListener('input',z=>z.target.closest('.fld')?.classList.remove('bad'));setTimeout(()=>f.d.focus(),80);
  f.addEventListener('submit',z=>{z.preventDefault();const fd=new FormData(f),bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;i.focus();};
   if(!fd.get('d'))return bad('d','Escolha a data');const paid=fd.get('pay')==='1';if(paid&&!(+fd.get('price')>0))return bad('price','Informe o valor');
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{Object.assign(e,{st:'confirmado',prev:'',d:fd.get('d'),time:(fd.get('time')||'19:30').replace(':00','h').replace(':','h').replace(/^0/,''),paid,price:paid?+fd.get('price'):0,cap:0});closeDlg();S.evFrom=S.active;S.active='calendario';S.evt=e.id;S.etab='det';render();window.scrollTo({top:0});toast(`${e.t} confirmado para ${dBR(e.d)}${paid?' · gere o link no Asaas':''}`);},700);});},
 ckRegen:v=>{const e=eById(S.evt),old=codeOf(e,v);confirmDel({title:'Gerar um novo código?',body:`O código atual <b class="mono">${old}</b> deixa de funcionar na hora. Quem já fez check-in não é afetado.`,label:'Gerar novo código',onConfirm:()=>{e.seed=(e.seed||0)+1;delete e.codes[v];rerEv();toast(`Novo código: ${codeOf(e,v)}`,()=>{e.codes[v]=old;rerEv();});}});},
 evDup:v=>{closePops();const e=eById(v),c=EV({...JSON.parse(JSON.stringify(e)),id:undefined,t:e.t+' (cópia)',regs:[],vouchers:[]});c.id='ev'+(++_eid);EVTS.push(c);S.evt=c.id;render();toast('Duplicado sem inscrições');},
 evDel:v=>{closePops();const e=eById(v);confirmDel({title:`Excluir ${e.t}?`,body:`${e.regs.length?`As ${e.regs.length} inscrições serão canceladas e os inscritos avisados.${e.paid&&raised(e)?` Reembolsos de ${brl(raised(e))} precisam ser feitos no Asaas.`:''} `:''}Esta ação não pode ser desfeita.`,label:'Excluir',typed:e.regs.length?e.t:null,onConfirm:()=>{EVTS.splice(EVTS.indexOf(e),1);S.evt=null;render();toast(`${e.t} excluído`);}});},
 evAsaas:(v,b)=>busy(b,1200,'Gerado',()=>{const e=eById(S.evt);e.link='https://asaas.com/c/'+norm(e.t).replace(/[^a-z0-9]+/g,'-');rerEv();toast('Link de pagamento gerado no Asaas');}),
 evPerDel:v=>{const e=eById(S.evt),p=e.periods[+v],used=e.items.some(i=>i.p===p);confirmDel({title:`Remover o período ${p}?`,body:`O código de check-in de ${p} deixa de valer.${used?' Os itens vinculados a ele passam a valer para o evento inteiro.':''}`,label:'Remover',onConfirm:()=>{e.periods.splice(+v,1);e.items.forEach(i=>{if(i.p===p)i.p='';});rerEv();toast('Período removido');}});},
 evItemDel:v=>{const e=eById(S.evt),it=e.items[+v];confirmDel({title:`Remover ${it.n}${it.p?' · '+it.p:''}?`,body:'Quem já comprou continua com o item; ele só deixa de ser vendido.',label:'Remover item',onConfirm:()=>{e.items.splice(+v,1);rerEv();toast('Item removido',()=>{e.items.splice(+v,0,it);rerEv();});}});},
 evReg:()=>{const e=eById(S.evt);if(e.cap&&e.regs.length>=e.cap){toast('Vagas esgotadas. Aumente as vagas para inscrever mais pessoas.');return;}const cand=MEMBERS.filter(m=>!e.regs.some(r=>r.n===m.n));
  openDlg(`${dlgHead('Adicionar inscrição',esc(e.t))}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="rq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="rpk" style="max-height:200px">${candList(cand,'')}</div>
   ${e.paid?`<label class="fld" style="margin-top:14px"><span class="fl">Voucher <small>opcional</small></span><input id="rv" class="mono" placeholder="Ex.: RETIRO10" autocomplete="off" style="text-transform:uppercase"><span class="err"></span></label><p class="rtot" id="rtot">Valor da inscrição: <b>${brl(e.price)}</b></p>`:''}
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="evRegDo">Inscrever</button></div>`,'sm');
  $('#rq').addEventListener('input',x=>{$('#rpk').innerHTML=candList(cand,x.target.value);});
  const rv=$('#rv');if(rv)rv.addEventListener('input',()=>{const c=rv.value.trim().toUpperCase(),fl=rv.closest('.fld');fl.classList.remove('bad');if(!c){$('#rtot').innerHTML=`Valor da inscrição: <b>${brl(e.price)}</b>`;return;}const v=e.vouchers.find(x=>x.code===c);
   if(!v){$('#rtot').innerHTML=`Valor da inscrição: <b>${brl(e.price)}</b>`;return;}if(v.exp&&inDays(v.exp)<0){fl.classList.add('bad');fl.querySelector('.err').textContent=`Expirou em ${dBR(v.exp)}`;return;}
   $('#rtot').innerHTML=`<s>${brl(e.price)}</s> → <b>${brl(Math.max(0,e.price-v.disc))}</b> com ${v.code}${v.mode==='especifico'?` · só para ${esc(v.email)}`:''}`;});},
 evRegDo:(v,b)=>{const e=eById(S.evt),s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const m=byId(s.value);let val=e.paid?e.price:0,code='';const rv=$('#rv');
  if(rv&&rv.value.trim()){code=rv.value.trim().toUpperCase();const vc=e.vouchers.find(x=>x.code===code);const fl=rv.closest('.fld');if(!vc){fl.classList.add('bad');fl.querySelector('.err').textContent='Voucher não encontrado neste evento';return;}if(vc.exp&&inDays(vc.exp)<0){fl.classList.add('bad');fl.querySelector('.err').textContent=`Expirou em ${dBR(vc.exp)}`;return;}if(vc.mode==='especifico'&&vc.email!==m.e){fl.classList.add('bad');fl.querySelector('.err').textContent=`Este voucher é só para ${vc.email}`;return;}val=Math.max(0,e.price-vc.disc);vc.uses++;}
  b.classList.add('busy');setTimeout(()=>{e.regs.push(R(m.n,'2026-10-01',e.paid?(val===0?'pago':'pendente'):'—',val,code));closeDlg();rerEv();toast(e.paid&&val>0?`${m.n.split(' ')[0]} inscrito(a) · link de pagamento enviado`:`${m.n.split(' ')[0]} inscrito(a)`);},600);},
 rgPaid:v=>{closePops();const e=eById(S.evt),r=e.regs.find(x=>x.id===v);r.pay='pago';rerEv();toast(`Pagamento de ${r.n.split(' ')[0]} confirmado manualmente`,()=>{r.pay='pendente';rerEv();});},
 rgLinkD:v=>{const r=eById(S.evt).regs.find(x=>x.id===v);toast(`Link de pagamento reenviado para ${r.n.split(' ')[0]}`);},
 rgLink:v=>{closePops();const r=eById(S.evt).regs.find(x=>x.id===v);toast(`Link de pagamento reenviado para ${r.n.split(' ')[0]}`);},
 rgDel:v=>{closePops();const e=eById(S.evt),i=e.regs.findIndex(x=>x.id===v),r=e.regs[i];confirmDel({title:`Cancelar a inscrição de ${r.n.split(' ')[0]}?`,body:`A vaga fica livre.${r.pay==='pago'&&r.val?` O reembolso de ${brl(r.val)} precisa ser feito no Asaas.`:''}`,label:'Cancelar inscrição',onConfirm:()=>{e.regs.splice(i,1);rerEv();toast('Inscrição cancelada',()=>{e.regs.splice(i,0,r);rerEv();});}});},
 vAdd:()=>{const e=eById(S.evt);openDlg(`${dlgHead('Novo voucher',`Desconto no ${esc(e.t)} (${brl(e.price)})`)}<form class="fgrid" id="vF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Código</span><input name="code" class="mono" placeholder="Ex.: RETIRO10" autocomplete="off" style="text-transform:uppercase"><span class="err"></span></label>
   <label class="fld"><span class="fl">Desconto</span><span class="mpre"><em>R$</em><input name="disc" type="number" min="1" max="${e.price}" inputmode="decimal"></span><span class="hint" id="vH">Até ${brl(e.price)} (bolsa integral)</span><span class="err"></span></label>
   <label class="fld"><span class="fl">Expira em <small>opcional</small></span><input name="exp" type="date" min="2026-10-01"></label>
   <div class="fld wide"><span class="fl">Quem pode usar</span><div class="vis two" id="vmG"><label><input type="radio" name="mode" value="liberado" checked><span><b>Qualquer pessoa</b><small>Quem tiver o código.</small></span></label><label><input type="radio" name="mode" value="especifico"><span><b>Uma pessoa</b><small>Só um e-mail autorizado.</small></span></label></div></div>
   <label class="fld wide" id="vEm" hidden><span class="fl">E-mail autorizado</span><input name="email" type="email" placeholder="pessoa@email.com"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="vOk" disabled>Criar voucher</button></div></form>`,'sm');
  const f=$('#vF'),chk=()=>{const sp=f.mode.value==='especifico';$('#vEm').hidden=!sp;const d=+f.disc.value;$('#vH').textContent=d>0?(d>=e.price?'Bolsa integral: a inscrição fica gratuita':`Paga ${brl(e.price-d)}`):`Até ${brl(e.price)} (bolsa integral)`;$('#vOk').disabled=!(f.code.value.trim().length>=3&&d>0&&(!sp||/^\S+@\S+\.\S+$/.test(f.email.value)));};
  f.addEventListener('input',x=>{x.target.closest('.fld')?.classList.remove('bad');if(x.target.name==='code')x.target.value=x.target.value.toUpperCase().replace(/\s/g,'-');chk();});f.addEventListener('change',chk);
  f.addEventListener('submit',x=>{x.preventDefault();const c=f.code.value.trim();if(e.vouchers.some(v=>v.code===c)){f.code.closest('.fld').classList.add('bad');f.code.nextElementSibling.textContent='Esse código já existe neste evento';f.code.focus();return;}if(+f.disc.value>e.price){f.disc.closest('.fld').classList.add('bad');f.disc.closest('.fld').querySelector('.err').textContent=`No máximo ${brl(e.price)}`;return;}
   $('#vOk').classList.add('busy');setTimeout(()=>{e.vouchers.push({code:c,disc:Math.min(+f.disc.value,e.price),exp:f.exp.value,mode:f.mode.value,email:f.mode.value==='especifico'?f.email.value.trim():'',uses:0});closeDlg();rerEv();toast(`Voucher ${c} criado`);},500);});},
 vDel:v=>{const e=eById(S.evt),c=e.vouchers[+v];confirmDel({title:`Excluir o voucher ${c.code}?`,body:`${c.uses?`Ele já foi usado ${c.uses} ${c.uses===1?'vez':'vezes'}; essas inscrições mantêm o desconto. `:''}Ninguém mais consegue usar o código.`,label:'Excluir voucher',onConfirm:()=>{e.vouchers.splice(+v,1);rerEv();toast('Voucher excluído',()=>{e.vouchers.splice(+v,0,c);rerEv();});}});},
 calTab:v=>{S.caltab=v;render();},
 calM:v=>{if(v==='0'){S.calM='2026-10';S.calSel='2026-10-01';}else{let [y,m]=S.calM.split('-').map(Number);m+=+v;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.calM=`${y}-${String(m).padStart(2,'0')}`;S.calSel=null;}render();},
 calDay:v=>{S.calSel=v||null;render();},
 escSwap:()=>toast('Pedido de troca enviado ao líder do ministério'),
 blkAdd:()=>{openDlg(`${dlgHead('Bloquear período','Você não será sugerido em escalas nesses dias.')}<form class="fgrid" id="bF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">De</span><input name="from" type="date" min="2026-10-01"><span class="err"></span></label><label class="fld"><span class="fl">Até</span><input name="to" type="date" min="2026-10-01"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Motivo <small>opcional, só a liderança vê</small></span><input name="why" placeholder="Ex.: Viagem"></label><p class="hint wide" id="bH" style="margin:-6px 0 0"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Bloquear</button></div></form>`,'sm');
  const f=$('#bF'),hint=()=>{if(!f.from.value)return;if(!f.to.value||f.to.value<f.from.value)f.to.value=f.from.value;const c=MYESC.filter(x=>x.d>=f.from.value&&x.d<=f.to.value);$('#bH').innerHTML=c.length?`<span style="color:var(--st-sol)">Você já está escalado em ${c.map(x=>fmtD(x.d)).join(', ')}. Peça troca ao líder.</span>`:'';};
  f.addEventListener('change',hint);f.addEventListener('submit',x=>{x.preventDefault();if(!f.from.value){f.from.closest('.fld').classList.add('bad');f.from.nextElementSibling.textContent='Escolha o início';return;}
   BLOCKS.push({id:'b'+Date.now(),from:f.from.value,to:f.to.value||f.from.value,why:f.why.value.trim()});BLOCKS.sort((a,b)=>a.from<b.from?-1:1);closeDlg();if(S.active!=='calendario'){S.active='calendario';}S.caltab='minha';render();toast('Período bloqueado');});},
 blkDel:v=>{const b=BLOCKS[+v];confirmDel({title:'Remover este bloqueio?',body:`Você volta a poder ser escalado ${b.from===b.to?'em '+fmtD(b.from):`de ${fmtD(b.from)} a ${fmtD(b.to)}`}.`,label:'Remover',onConfirm:()=>{BLOCKS.splice(+v,1);render();toast('Bloqueio removido',()=>{BLOCKS.splice(+v,0,b);render();});}});},
 iqF:v=>{S.iqf=v;render();},
};

/* ================= Agenda e serviço › Escalas ================= */
const EST={criacao:['Em criação','var(--ink-muted)','var(--surface-2)'],aguardando:['Aguardando aceite','var(--st-sol)','var(--st-sol-bg)'],aprovada:['Aprovada','var(--st-int)','var(--st-int-bg)']};
const MST={rascunho:['Não enviado','var(--ink-muted)','var(--surface)'],aguardando:['Aguardando','var(--st-sol)','var(--st-sol-bg)'],confirmado:['Confirmado','var(--st-int)','var(--st-int-bg)'],recusado:['Recusou','var(--st-rec)','var(--st-rec-bg)']};
let _bid=0;
const BK=(label,members=[],content=[],team='')=>({id:'bk'+(++_bid),label,team,members:members.map(m=>({n:m[0],role:m[1],st:m[2]||'confirmado',over:m[3]||undefined})),content:content.map(c=>({t:c[0],d:c[1]||'',k:c[2]||(/^Tom /.test(c[1]||'')?'musica':'material')}))});
const DT=(ev,blocks)=>({id:'dt'+(++_bid),ev,blocks});
/* ---------- presença no dia (check-in com geolocalização) ---------- */
const CKDAY='2026-09-30',CKNOW=20*60+25,CKRAIO=150;
const ckMin=t=>{const m=String(t).match(/(\d{1,2})h(\d{2})?/);return m?+m[1]*60+(+m[2]||0):19*60;};
const ckHM=m=>`${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`.replace('h00','h');
function ckWin(e){const st=ckMin(e.time);return {open:st-120,start:st,close:st+120};}
function ckState(e){if(!e||e.d!==CKDAY)return null;const w=ckWin(e);return CKNOW<w.open?'antes':CKNOW>w.close?'fim':'aberto';}
const CKPR={pend:['Sem check-in','var(--ink-muted)','var(--surface)'],ck:['Check-in feito','var(--st-sol)','var(--st-sol-bg)'],ok:['Presente','var(--st-int)','var(--st-int-bg)'],falta:['Faltou','var(--st-rec)','var(--st-rec-bg)']};
const ckOf=m=>m.pr==='ok'?'ok':m.pr==='falta'?'falta':m.ck?'ck':'pend';
const ESCALAS=[
 {id:'es0',n:'Escala Louvor — Ensaios de setembro',min:'Louvor',desc:'Ensaio geral antes dos cultos de outubro.',st:'aprovada',dates:[
  DT('ev11',[BK('Ensaio',[['Daniela Rocha','Vocal'],['Elisa Moura','Vocal'],['Diego Faria','Bateria'],['Igor Santana','Baixo'],['Clara Nunes','Teclado'],['Gustavo Mendes','Guitarra','recusado']],[['Grande é o Senhor','Tom G']],'Domingo manhã')])]},
 {id:'es1',n:'Escala Louvor — Outubro',min:'Louvor',desc:'Cultos de celebração de outubro.',st:'aprovada',dates:[
  DT('ev2',[BK('Culto inteiro',[['Ana Clara Lima','Vocal'],['Daniela Rocha','Vocal'],['Bruno Reis','Violão'],['Helena Duarte','Teclado']],[['Grande é o Senhor','Tom G'],['Te louvarei','Tom D']],'Domingo manhã')]),
  DT('ev3',[BK('Culto inteiro',[['Ana Clara Lima','Vocal'],['Elisa Moura','Vocal'],['Bruno Reis','Violão']],[['Aclame ao Senhor','Tom A']],'Domingo manhã')])]},
 {id:'es2',n:'Escala Kids — Outubro',min:'Kids',desc:'',st:'aguardando',dates:[
  DT('ev10',[BK('Manhã — Berçário',[['Mônica Souza','Monitora']],[['Apostila — Deus cuida de mim','Cap. 3']]),BK('Manhã — Maternal',[['Cláudia Ferraz','Monitora']],[['Apostila — Deus cuida de mim','Cap. 3']]),BK('Tarde — Berçário',[['Renan Ferreira','Monitor','aguardando']],[['Apostila — Deus cuida de mim','Cap. 3']]),BK('Tarde — Maternal',[],[['Apostila — Deus cuida de mim','Cap. 3']])])]},
 {id:'es3',n:'Escala Diaconia — Outubro',min:'Diaconia',desc:'',st:'criacao',dates:[DT('ev6',[BK('Evento inteiro',[['Larissa Pires','Ceia','rascunho',true],['Ana Clara Lima','Recepção','rascunho']])])]},
 {id:'es4',n:'Escala Retiro de Jovens',min:'Jovens e Adolescentes',desc:'Equipe de apoio do retiro.',st:'criacao',dates:[DT('ev5',[BK('Sábado',[['Thiago Barros','Coordenação','rascunho']]),BK('Domingo')])]},
 {id:'es5',n:'Escala Louvor — Novembro',min:'Louvor',desc:'',st:'criacao',dates:[]},
];
(()=>{const m=ESCALAS[0].dates[0].blocks[0].members;Object.assign(m[0],{ck:{at:'19h12',dist:40},pr:'ok',by:'Você'});m[1].ck={at:'20h02',dist:12};m[2].ck={at:'19h58',dist:85};})();
Object.assign(S,{esc:null,estab:'datas',esview:'blocos',esq:'',esf:'todos',esM:null,esSel:null,esCol:{}});
const esById=id=>ESCALAS.find(x=>x.id===id);
const esPill=s=>`<span class="stp" style="--c:${EST[s][1]};--b:${EST[s][2]}"><i></i>${EST[s][0]}</span>`;
const msPill=(m,clickable,ref)=>`<${clickable?`button data-a="esMst" data-v="${ref}" title="Marcar como confirmado"`:'span'} class="stp ${clickable?'clk':''}" style="--c:${MST[m.st][1]};--b:${MST[m.st][2]}"><i></i>${MST[m.st][0]}</${clickable?'button':'span'}>`;
const esMembers=x=>x.dates.flatMap(d=>d.blocks.flatMap(b=>b.members));
const esSorted=x=>x.dates.slice().sort((a,b)=>(eById(a.ev)?.d||'')<(eById(b.ev)?.d||'')?-1:1);
const dateState=d=>{const e=eById(d.ev);if(e&&past(e))return 'past';const ms=d.blocks.flatMap(b=>b.members);if(!ms.length)return 'empty';if(ms.some(m=>m.st==='recusado')||d.blocks.some(b=>!b.members.length))return 'acao';if(ms.some(m=>m.st!=='confirmado'))return 'wait';return 'ok';};
function teamsFor(min){if(min==='Kids')return KTEAMS.map(t=>({n:t.n,m:t.m}));const mn=MINIS.find(m=>m.n===min);return (mn?mn.teams:[]).map((t,i)=>({n:t.n,m:MEMBERS.filter(x=>x.tit).slice(i*2,i*2+Math.min(3,t.m)).map(x=>x.n)}));}

/* ---------- list ---------- */
function escList(){
 const c=k=>ESCALAS.filter(x=>x.st===k).length,q=norm(S.esq);
 const l=ESCALAS.filter(x=>(S.esf==='todos'||x.st===S.esf)&&(!q||norm(x.n+' '+x.min).includes(q)));
 return `<header class="ph rise"><div><p class="eb">Agenda e serviço</p><h1>Escalas</h1><p class="lede">Quem serve em cada culto e evento, por ministério</p></div>
  <div class="pact"><button class="btn sec" data-a="lmOpen" data-v="lim">${ic('sliders',15)}Regras de escala</button><div style="position:relative"><button class="btn sec" data-a="esExpMenu">Exportar${ic('updown',14)}</button><div class="pop" id="esExpPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="export" data-v="as escalas (CSV)">Escalas (CSV)</button><button class="pi" data-a="export" data-v="as escalas para impressão (PDF)">Para imprimir (PDF)</button></div></div>
  <button class="btn pri" data-a="esAdd">${ic('plus',15,2.2)}Nova escala</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Aprovadas</span><span class="kv" style="color:var(--st-int)">${c('aprovada')}</span><span class="kd">todos confirmaram</span></div>
  <div class="k4"><span class="kl">Aguardando aceite</span><span class="kv" style="color:var(--st-sol)">${c('aguardando')}</span><span class="kd">${ESCALAS.filter(x=>x.st==='aguardando').reduce((a,x)=>a+esMembers(x).filter(m=>m.st==='aguardando').length,0)} pessoas sem resposta</span></div>
  <div class="k4"><span class="kl">Em criação</span><span class="kv">${c('criacao')}</span><span class="kd">ainda não enviadas</span></div>
 </section>
 ${ckStrip()}${lmCard()}
 <section class="card mtab rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="esq" placeholder="Buscar escala ou ministério" value="${esc(S.esq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todas',ESCALAS.length],['aprovada','Aprovadas',c('aprovada')],['aguardando','Aguardando aceite',c('aguardando')],['criacao','Em criação',c('criacao')]].map(x=>`<button class="chipf ${S.esf===x[0]?'on':''}" data-a="esF" data-v="${x[0]}">${x[0]!=='todos'?`<i style="background:${EST[x[0]][1]}"></i>`:''}${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow es thead"><span>Escala</span><span>Datas</span><span>Confirmações</span><span>Status</span><span></span></div>${l.map(x=>{const ms=esMembers(x),ok=ms.filter(m=>m.st==='confirmado').length,ds=esSorted(x);return `<div class="trow es" tabindex="0" data-a="esOpen" data-v="${x.id}">
   <span class="tn"><span class="htile" style="--s:36px;background:var(--tone-${(MINIS.find(m=>m.n===x.min)||{tone:'ceu'}).tone});color:var(--tone-${(MINIS.find(m=>m.n===x.min)||{tone:'ceu'}).tone}-ink)">${ic((MINIS.find(m=>m.n===x.min)||{icon:'users'}).icon,17)}</span><span class="hn"><b>${esc(x.n)}</b><span>Ministério de ${esc(x.min)}</span></span></span>
   <span class="esd">${ds.length?ds.slice(0,4).map(d=>{const e=eById(d.ev);return `<span class="esdc ${dateState(d)}" title="${esc(e.t)}">${+e.d.slice(8)}<small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></span>`;}).join('')+(ds.length>4?`<span class="soft">+${ds.length-4}</span>`:''):'<span class="soft">Nenhuma data</span>'}</span>
   <span class="esc">${ms.length?`<span class="tr"><i style="width:${ok/ms.length*100}%"></i></span><span><b>${ok}</b>/${ms.length}</span>`:'<span class="soft">Ninguém escalado</span>'}</span>
   <span class="ts">${esPill(x.st)}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}`:'<div class="mempty"><p>Nenhuma escala.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} escalas</span></div></section>`;
}

/* ---------- detail ---------- */
function escDetail(){
 const x=esById(S.esc);if(!x){S.esc=null;return escList();}
 const ms=esMembers(x),ok=ms.filter(m=>m.st==='confirmado').length,pend=ms.filter(m=>m.st==='aguardando').length,bl=x.dates.reduce((a,d)=>a+d.blocks.length,0),allOk=ms.length&&ok===ms.length;
 const act=x.st==='criacao'?`<button class="btn pri" data-a="esSend" ${ms.length?'':'disabled title="Adicione pessoas antes de enviar"'}>${ic('mail',15)}Enviar para os escalados</button>`:x.st==='aguardando'?(allOk?`<button class="btn pri" data-a="esApprove">${ic('check',15,2.4)}Aprovar escala</button>`:`<button class="btn sec" data-a="esRemind" ${pend?'':'disabled'}>${ic('bell',15)}Lembrar ${pend} pendente${pend===1?'':'s'}</button>`):'';
 return `<nav class="crumb rise"><span class="soft">Agenda e serviço</span>${ic('chevR',13,2)}<button class="lnk back" data-a="esBack">Escalas</button>${ic('chevR',13,2)}<span>${esc(x.n)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid"><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(x.n)}</h1>${esPill(x.st)}</div><p>Ministério de ${esc(x.min)}${x.desc?' · '+esc(x.desc):''}</p></div></div>
  <div class="pact">${act}<div style="position:relative"><button class="ibtn" data-a="esMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="esPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="esDup">${ic('layers',17)}Duplicar para o próximo mês</button><hr><button class="pi danger" data-a="esDel">${ic('x',17)}Excluir escala</button></div></div></div>
  ${x.st==='criacao'?`<div class="esflow"><span class="on"><i>1</i>Montar</span><b></b><span><i>2</i>Escalados confirmam</span><b></b><span><i>3</i>Aprovada</span></div>`:x.st==='aguardando'?`<div class="esflow"><span class="done"><i>${ic('check',11,3)}</i>Montar</span><b class="on"></b><span class="on"><i>2</i>Escalados confirmam</span><b></b><span><i>3</i>Aprovada</span></div>`:''}
  <div class="ikpi hk"><div><b>${x.dates.length}</b><span>Datas</span></div><div><b>${bl}</b><span>Blocos</span></div><div><b>${ms.length}</b><span>Pessoas escaladas</span></div><div><b>${ok}<small class="kof">/${ms.length}</small></b><span>Confirmaram</span></div></div>
  <div class="ptabs" role="tablist">${[['det','Detalhes'],['datas','Datas',x.dates.length],['ck','Check-in']].map(t=>`<button role="tab" class="${S.estab===t[0]?'on':''}" data-a="esTab" data-v="${t[0]}">${t[0]==='ck'&&ckToday(x)?'<i class="cklive"></i>':''}${t[1]}${t[2]?`<small>${t[2]}</small>`:t[0]==='ck'&&ckPendN(x)?`<small class="ckn">${ckPendN(x)}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${S.estab==='det'?esDet(x):S.estab==='ck'?esCk(x):esDatas(x)}</div>`;
}
function esDet(x){
 const ms=esMembers(x),tot=ms.length||1,cnt=k=>ms.filter(m=>m.st===k).length,mn=MINIS.find(m=>m.n===x.min)||{tone:'ceu',icon:'users'},tm=teamsFor(x.min),ds=esSorted(x);
 const seg=[['confirmado','var(--st-int)'],['aguardando','var(--st-sol)'],['recusado','var(--st-rec)'],['rascunho','var(--line-strong)']];
 if(x.auto===undefined)x.auto=true;
 return `<section class="card esdet">
  <div class="esdf"><div class="sh" style="margin-bottom:14px"><h2>Sobre a escala</h2><span class="who" id="essaved">Salva sozinha</span></div>
   <div class="fgrid">
    <label class="fld"><span class="fl">Nome</span><input id="esN" value="${esc(x.n)}"></label>
    <label class="fld"><span class="fl">Ministério</span><span class="selw"><select id="esMin">${MINIS.filter(m=>m.active).map(m=>`<option value="${esc(m.n)}" ${m.n===x.min?'selected':''}>Ministério de ${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
    <label class="fld" style="grid-column:1/-1"><span class="fl">Recado para quem vai servir <small>opcional</small></span><textarea class="ta" id="esDesc" rows="3" placeholder="Ex.: chegar 40 min antes para oração e passagem de som">${esc(x.desc)}</textarea><span class="hint">Aparece no convite que cada pessoa recebe no app.</span></label>
   </div>
   <label class="tog esauto"><input type="checkbox" id="esAuto" ${x.auto?'checked':''}><span class="sw"></span><span><b>Lembrar quem não respondeu</b><small>Enviamos um lembrete automático 2 dias antes de cada data</small></span></label>
  </div>
  <aside class="esdx">
   <div class="esxm"><span class="htile" style="--s:40px;background:var(--tone-${mn.tone});color:var(--tone-${mn.tone}-ink)">${ic(mn.icon,19)}</span><span class="dkt"><b>Ministério de ${esc(x.min)}</b><span>${tm.length} time${tm.length===1?'':'s'} disponíve${tm.length===1?'l':'is'} para escalar</span></span></div>
   ${tm.length?`<div class="esxt">${tm.map(t=>`<span>${ic('users',12)}${esc(t.n)}<small>${(t.m||[]).length||''}</small></span>`).join('')}</div>`:''}
   <div class="esxb"><p class="fl">Respostas</p>
    <div class="esbar">${ms.length?seg.map(z=>cnt(z[0])?`<i style="flex:${cnt(z[0])};background:${z[1]}"></i>`:'').join(''):'<i style="flex:1;background:var(--line)"></i>'}</div>
    <div class="eslg">${seg.map(z=>`<span><i style="background:${z[1]}"></i>${MST[z[0]][0]}<b>${cnt(z[0])}</b></span>`).join('')}</div></div>
   <div class="esxb"><p class="fl">Datas cobertas</p>${ds.length?`<div class="esd">${ds.map(d=>{const e=eById(d.ev);return `<button class="esdc ${dateState(d)}" data-a="esGoBlocks" data-v="${d.id}" title="${esc(e.t)}">${+e.d.slice(8)}<small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></button>`;}).join('')}</div>`:'<p class="who" style="margin:0">Nenhuma data ainda.</p>'}</div>
  </aside></section>`;
}
function esDatas(x){
 const ds=esSorted(x);
 return `<section class="card pc"><div class="sh"><div class="segc" role="group"><button data-a="esView" data-v="blocos" aria-pressed="${S.esview==='blocos'}">Blocos</button><button data-a="esView" data-v="cal" aria-pressed="${S.esview==='cal'}">Calendário</button></div><span class="row2">${S.esview==='blocos'&&ds.length>0?`<button class="btn ghost sm" data-a="esColAll">${ic(ds.every(d=>S.esCol[d.id])?'expand':'collapse',14)}${ds.every(d=>S.esCol[d.id])?'Expandir tudo':'Recolher tudo'}</button>`:''}<button class="btn pri sm" data-a="esAddDate">${ic('plus',14,2.2)}Adicionar data</button></span></div>
  ${!ds.length?`<div class="eempty"><span class="eei">${ic('calendar',22)}</span><p>Nenhuma data ainda.</p><span class="who">Escolha um culto ou evento do Calendário para começar a escalar.</span><button class="btn pri" data-a="esAddDate" style="margin-top:10px">${ic('plus',14,2.2)}Adicionar data</button></div>`
  :S.esview==='cal'?esCal(x,ds):`<p class="who" style="margin:-4px 0 16px;max-width:640px">Cada data começa com um bloco para o evento inteiro. Se precisar de mais de um time ao mesmo tempo, ou trocar de time ao longo do dia, adicione blocos. O nome do bloco é livre.</p>${ds.map(d=>esDateCard(x,d)).join('')}`}
 </section>`;
}
function esDateCard(x,d){
 const e=eById(d.ev),st=dateState(d),col=!!S.esCol[d.id],ms=d.blocks.flatMap(b=>b.members),ok=ms.filter(m=>m.st==='confirmado').length;
 return `<article class="esdt ${col?'col':''}" id="${d.id}"><header class="esdh"><button class="ibtn sm estog" data-a="esCol" data-v="${d.id}" aria-expanded="${!col}" aria-label="${col?'Expandir':'Recolher'} data" title="${col?'Expandir':'Recolher'}">${ic('chevD',15,2.2)}</button>${dTile(e)}<div class="dkt"><b>${esc(e.t)}</b><span>${wd(e.d)}, ${dBR(e.d)} · ${e.time} · ${esc(e.place)}</span></div>${tTag(e.type)}<span class="esst ${st}">${{ok:'Tudo confirmado',wait:'Aguardando respostas',acao:'Precisa de ação',empty:'Sem ninguém',past:'Já aconteceu'}[st]}</span><button class="ibtn sm" data-a="esDelDate" data-v="${d.id}" aria-label="Remover data" title="Remover data">${ic('x',14)}</button></header>
  ${ckBar(d,e)}${col?`<button class="esmini" data-a="esCol" data-v="${d.id}"><span>${d.blocks.map(b=>`<em>${esc(b.label)}</em>`).join('')}</span><span class="esmc">${ms.length?`<b>${ok}</b>/${ms.length} confirmados`:'Ninguém escalado'}</span><span class="avs">${ms.slice(0,5).map(m=>`<span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span>`).join('')}</span></button>`:`<div class="esbl">${d.blocks.map(b=>esBlock(x,d,b)).join('')}</div>
  <button class="btn sec sm esaddb" data-a="esAddBlock" data-v="${d.id}">${ic('plus',13,2.2)}Adicionar bloco</button>`}</article>`;
}
function esBlock(x,d,b){
 const ym=lmYmOf(d),r=`${d.id}|${b.id}`,pend=b.members.filter(m=>m.st==='aguardando'||m.st==='rascunho').length;
 return `<div class="esb"><div class="esbh"><input class="esbl-in" value="${esc(b.label)}" data-ref="${r}" aria-label="Nome do bloco">${d.blocks.length>1?`<button class="ibtn sm" data-a="esDelBlock" data-v="${r}" aria-label="Remover bloco" title="Remover bloco">${ic('x',14)}</button>`:''}</div>
  <div class="esbc"><div><p class="fl">Time e pessoas</p>
   ${b.team?`<span class="esteam">${ic('users',13)}${esc(b.team)}<button data-a="esTeamClr" data-v="${r}" aria-label="Tirar time">${ic('x',11,2.4)}</button></span>`:''}
   ${b.members.length?`<div class="esms">${b.members.map((m,i)=>`<div class="esm"><span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span><span class="dkt"><b>${esc(m.n)}</b><span>${esc(m.role)}${m.over&&m.st!=='recusado'?` <em class="lm-x" title="Escalado(a) acima do limite mensal">${ic('alert',10,2.6)}Exceção ao limite</em>`:''}</span></span>${m.st!=='recusado'&&['over','full','pause'].includes(lmUse(m.n,ym).st)?lmPill(m.n,ym):''}${msPill(m,x.st==='aguardando'&&m.st==='aguardando',r+'|'+i)}<button class="ibtn sm" data-a="esDelM" data-v="${r}|${i}" aria-label="Remover ${esc(m.n)}">${ic('x',13)}</button></div>`).join('')}</div>`:`<p class="esempty">${ic('alert',13,2)}Ninguém escalado neste bloco.</p>`}
   <div class="row2" style="margin-top:8px">${b.team?'':`<button class="btn sec sm" data-a="esTeam" data-v="${r}">${ic('users',13)}Selecionar time</button>`}<button class="btn sec sm" data-a="esAddM" data-v="${r}">${ic('plus',13,2.2)}Pessoa</button>${x.st!=='criacao'?`<button class="btn sec sm" data-a="esNotify" data-v="${r}" ${pend?'':'disabled'}>${ic('bell',13)}Notificar</button>`:''}</div></div>
  <div><p class="fl">Conteúdo <small>repertório, material de apoio…</small></p>
   ${b.content.length?`<div class="escs">${b.content.map((c,i)=>`<div class="escc"><span class="cti ec-k ${c.k||'outro'}" style="width:28px;height:28px;border-radius:8px">${ic(ECT[c.k||'outro'][2],13)}</span><span class="dkt"><b>${esc(c.t)}</b><span>${ECT[c.k||'outro'][0]}${c.d?' · '+esc(c.d):''}</span></span><button class="ibtn sm" data-a="esDelC" data-v="${r}|${i}" aria-label="Remover">${ic('x',13)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0 0 4px">Nada ainda.</p>'}
   <div class="row2" style="margin-top:8px"><button class="btn sec sm" data-a="esAddC" data-v="${r}">${ic('plus',13,2.2)}Conteúdo</button><button class="btn sec sm" data-a="esReuse" data-v="${r}">${ic('layers',13)}Reaproveitar de outro bloco</button></div></div></div></div>`;
}
function esCal(x,ds){
 const first=eById(ds[0].ev).d;S.esM=S.esM||first.slice(0,7);const [y,m]=S.esM.split('-').map(Number),off=new Date(y,m-1,1).getDay(),days=new Date(y,m,0).getDate();
 const by={};ds.forEach(d=>{by[eById(d.ev).d]=d;});const sel=S.esSel&&by[S.esSel]?S.esSel:(Object.keys(by).find(k=>k.startsWith(S.esM))||null);
 const cells=[];for(let i=0;i<off;i++)cells.push('<span></span>');for(let d=1;d<=days;d++){const iso=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`,dd=by[iso];cells.push(dd?`<button class="escd ${dateState(dd)} ${sel===iso?'sel':''}" data-a="esDay" data-v="${iso}">${d}</button>`:`<span class="escd no">${d}</span>`);}
 const sd=sel&&by[sel],se=sd&&eById(sd.ev);
 return `<div class="escal"><div><div class="sh" style="margin-bottom:10px"><button class="ibtn sm" data-a="esM" data-v="-1" aria-label="Mês anterior">${ic('chevL',14,2)}</button><b style="font:600 15px/1 var(--font-display)">${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} ${y}</b><button class="ibtn sm" data-a="esM" data-v="1" aria-label="Próximo mês">${ic('chevR',14,2)}</button></div>
  <div class="escg">${['D','S','T','Q','Q','S','S'].map(w=>`<span class="cwd">${w}</span>`).join('')}${cells.join('')}</div>
  <div class="esleg">${[['ok','Tudo confirmado'],['wait','Aguardando alguém'],['acao','Precisa de ação'],['past','Já aconteceu'],['empty','Sem ninguém']].map(l=>`<span><i class="escd ${l[0]}"></i>${l[1]}</span>`).join('')}</div></div>
  <div class="essum">${sd?`<div class="esdh" style="padding:0 0 12px">${dTile(se)}<div class="dkt"><b>${esc(se.t)}</b><span>${wd(se.d)}, ${dBR(se.d)} · ${se.time}</span></div><button class="btn sec sm" data-a="esGoBlocks" data-v="${sd.id}">Editar blocos</button></div>
   ${sd.blocks.map(b=>`<div class="essb"><p class="fl">${esc(b.label)}</p>${b.members.length?b.members.map(mm=>`<div class="essr"><span>${esc(mm.n)} <span class="soft">· ${esc(mm.role)}</span></span>${msPill(mm)}</div>`).join(''):'<p class="esempty">Ninguém escalado ainda.</p>'}</div>`).join('')}`:'<div class="soft-empty"><p>Nenhuma data neste mês.</p></div>'}</div></div>`;
}

function escAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#esq');if(q)q.addEventListener('input',e=>{S.esq=e.target.value;const p=e.target.selectionStart;render();const n=$('#esq');n.focus();n.setSelectionRange(p,p);});
 const x=S.esc&&esById(S.esc);if(!x)return;
 $$('.esbl-in').forEach(i=>i.addEventListener('change',()=>{const [di,bi]=i.dataset.ref.split('|'),b=x.dates.find(d=>d.id===di).blocks.find(b=>b.id===bi),v=i.value.trim();if(!v){i.value=b.label;return;}b.label=v;toast('Nome do bloco salvo');}));
 let t;const sv=()=>{clearTimeout(t);$('#essaved').textContent='Salvando…';t=setTimeout(()=>{const n=$('#esN').value.trim();if(n)x.n=n;x.min=$('#esMin').value;x.desc=$('#esDesc').value.trim();$('#essaved').innerHTML=`${ic('check',13,2.4)} Salvo`;$('#essaved').style.color='var(--st-int)';$('.prof .pn p').textContent='Ministério de '+x.min+(x.desc?' · '+x.desc:'');$('.prof h1').textContent=x.n;$('.crumb>span:last-child').textContent=x.n;},600);};
 ['esN','esDesc'].forEach(id=>{const el=$('#'+id);if(el)el.addEventListener('input',sv);});
 const mi=$('#esMin');if(mi)mi.addEventListener('change',()=>{x.min=mi.value;esRe();toast('Ministério alterado');});
 const au=$('#esAuto');if(au)au.addEventListener('change',()=>{x.auto=au.checked;toast(au.checked?'Lembretes automáticos ligados':'Lembretes automáticos desligados');});
}
const esRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const refB=v=>{const x=esById(S.esc),[di,bi,mi]=v.split('|'),d=x.dates.find(z=>z.id===di),b=d&&d.blocks.find(z=>z.id===bi);return {x,d,b,mi:mi!==undefined?+mi:null};};
function sentSt(x){return x.st==='criacao'?'rascunho':'aguardando';}
const EA={
 esExpMenu:()=>{const p=$('#esExpPop');closePops(p);p.classList.toggle('open');},
 esMenu:()=>{const p=$('#esPop');closePops(p);p.classList.toggle('open');},
 esF:v=>{S.esf=v;render();},
 esOpen:v=>{S.esc=v;S.estab='det';S.esview='blocos';S.esM=null;S.esSel=null;render();window.scrollTo({top:0});},
 esBack:()=>{S.esc=null;render();},
 esTab:v=>{S.estab=v;esRe();},
 esCol:v=>{S.esCol[v]=!S.esCol[v];esRe();},
 esColAll:()=>{const x=esById(S.esc),all=x.dates.every(d=>S.esCol[d.id]);x.dates.forEach(d=>S.esCol[d.id]=!all);esRe();},
 esView:v=>{S.esview=v;esRe();},
 esM:v=>{let [y,m]=S.esM.split('-').map(Number);m+=+v;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.esM=`${y}-${String(m).padStart(2,'0')}`;S.esSel=null;esRe();},
 esDay:v=>{S.esSel=v;esRe();},
 esGoBlocks:v=>{S.esview='blocos';S.estab='datas';render();setTimeout(()=>{const el=document.getElementById(v);el&&el.scrollIntoView({behavior:'smooth',block:'start'});},60);},
 esAdd:()=>{openDlg(`${dlgHead('Nova escala','Depois você adiciona as datas e quem serve em cada uma.')}<form class="fgrid one" id="esF" novalidate>
   <label class="fld"><span class="fl">Ministério</span><span class="selw"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option value="${esc(m.n)}">Ministério de ${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Escala Louvor — Novembro" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="2"></textarea></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar escala</button></div></form>`,'sm');
  const f=$('#esF'),fill=()=>{if(!f.n.dataset.touched)f.n.value=`Escala ${f.min.value.split(' ')[0]} — Novembro`;};fill();f.min.addEventListener('change',fill);f.n.addEventListener('input',()=>{f.n.dataset.touched=1;f.n.closest('.fld').classList.remove('bad');});
  f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(!n){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Dê um nome';return;}if(ESCALAS.some(x=>norm(x.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Já existe uma escala com esse nome';return;}
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{const x={id:'es'+Date.now(),n,min:f.min.value,desc:f.desc.value.trim(),st:'criacao',dates:[]};ESCALAS.unshift(x);closeDlg();S.esc=x.id;S.estab='datas';render();toast(`${n} criada`);},600);});},
 esAddDate:()=>{const x=esById(S.esc),used=new Set(x.dates.map(d=>d.ev)),opts=EVTS.filter(e=>e.st==='confirmado'&&!past(e)&&!used.has(e.id)).sort((a,b)=>a.d<b.d?-1:1);
  openDlg(`${dlgHead('Adicionar data','A data e o tipo vêm do evento cadastrado no Calendário. Começa com um bloco; divida depois se precisar.')}<div class="pick" id="edp">${opts.length?opts.map((e,i)=>`<label class="pk">${dTile(e)}<span><b>${esc(e.t)}</b><small>${e.time} · ${esc(e.place)}${e.min?' · '+esc(e.min):''}</small></span><input type="radio" name="ev" value="${e.id}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Todos os eventos futuros já estão nesta escala.</p>'}</div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoDate" ${opts.length?'':'disabled'}>Adicionar</button></div>`,'sm');},
 esDoDate:(v,b)=>{const x=esById(S.esc),s=$('input[name=ev]:checked');if(!s)return;b.classList.add('busy');setTimeout(()=>{const d=DT(s.value,[BK('Evento inteiro')]);x.dates.push(d);closeDlg();S.esview='blocos';esRe();setTimeout(()=>document.getElementById(d.id)?.scrollIntoView({behavior:'smooth',block:'center'}),80);toast(`${eById(s.value).t} adicionado`);},400);},
 esDelDate:v=>{const x=esById(S.esc),i=x.dates.findIndex(d=>d.id===v),d=x.dates[i],e=eById(d.ev),n=d.blocks.reduce((a,b)=>a+b.members.length,0);confirmDel({title:`Remover ${e.t} (${fmtD(e.d)}) da escala?`,body:`${n?`As ${n} pessoas escaladas nesta data ${x.st==='criacao'?'saem da escala':'são avisadas de que não precisam mais servir'}. `:''}O evento continua no Calendário.`,label:'Remover data',onConfirm:()=>{x.dates.splice(i,1);esRe();toast('Data removida',()=>{x.dates.splice(i,0,d);esRe();});}});},
 esAddBlock:v=>{const x=esById(S.esc),d=x.dates.find(z=>z.id===v);if(d.blocks.length===1&&d.blocks[0].label==='Evento inteiro')d.blocks[0].label='Bloco 1';d.blocks.push(BK('Bloco '+(d.blocks.length+1)));esRe();const ins=$$(`#${v} .esbl-in`);ins[ins.length-1]?.select();},
 esDelBlock:v=>{const {d,b}=refB(v);const go=()=>{const i=d.blocks.indexOf(b);d.blocks.splice(i,1);esRe();toast('Bloco removido',()=>{d.blocks.splice(i,0,b);esRe();});};if(!b.members.length&&!b.content.length)return go();confirmDel({title:`Remover o bloco “${b.label}”?`,body:`${b.members.length?`${b.members.length} pessoa${b.members.length>1?'s saem':' sai'} da escala nesta data. `:''}${b.content.length?'O conteúdo do bloco também é removido.':''}`,label:'Remover bloco',onConfirm:go});},
 esTeam:v=>{const {x,b}=refB(v),ts=teamsFor(x.min);openDlg(`${dlgHead('Selecionar time',`Times do Ministério de ${esc(x.min)}. As pessoas do time entram no bloco.`)}<div class="pick">${ts.length?ts.map((t,i)=>`<label class="pk"><span class="cti">${ic('users',15)}</span><span><b>${esc(t.n)}</b><small>${t.m.length?t.m.join(', '):'Sem pessoas'}</small></span><input type="radio" name="tm" value="${i}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Este ministério ainda não tem times. Crie em Comunidade › Ministérios.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoTeam" data-v="${v}" ${ts.length?'':'disabled'}>Usar este time</button></div>`,'sm');},
 esDoTeam:v=>{const {x,d,b}=refB(v),t=teamsFor(x.min)[+$('input[name=tm]:checked').value],ym=lmYmOf(d),nw=t.m.filter(n=>!b.members.some(m=>m.n===n)),blk=nw.filter(n=>{const u=lmUse(n,ym);return u.c>=u.lim;});
  if(blk.length){window._lmTeam={x,b,t,ym};const free=nw.length-blk.length;openDlg(`${dlgHead(`${blk.length} ${blk.length===1?'pessoa do time já chegou':'pessoas do time já chegaram'} ao limite`,`${esc(t.n)} · ${esc(eById(d.ev).t)}, ${dBR(eById(d.ev).d)}. O limite soma todos os ministérios em ${lmMon(ym)}.`)}<div class="lm-cl">${blk.map(n=>{const u=lmUse(n,ym);return `<div class="lm-hr">${lmAv(n)}<span class="lm-hn">${esc(n)}${u.e?`<small>${u.lim===0?'Em pausa':'Exceção'}: ${esc(u.e.why)}</small>`:''}</span>${lmDots(u.c,u.lim)}${lmPill(n,ym)}</div>`;}).join('')}</div>
   <p class="lm-hint">${ic('info',12,2.2)}Se adicionar mesmo assim, o convite chega marcado como exceção e a pessoa pode recusar sem constrangimento.</p>
   <div class="dfoot lm-tf"><button class="btn sec" data-a="lmTeamGo" data-v="all">Adicionar todos mesmo assim</button><button class="btn pri" data-a="lmTeamGo" data-v="free" ${free?'':'disabled'}>Adicionar só quem tem vaga (${free})</button></div>`,'sm');return;}
  b.team=t.n;let add=0;t.m.forEach(n=>{if(!b.members.some(m=>m.n===n)){b.members.push({n,role:'Equipe',st:sentSt(x)});add++;}});closeDlg();esRe();toast(`${t.n}: ${add} ${add===1?'pessoa adicionada':'pessoas adicionadas'}${x.st!=='criacao'&&add?' e avisadas':''}`);},
 esTeamClr:v=>{const {b}=refB(v);b.team='';esRe();},
 esAddM:v=>{const {x,d,b}=refB(v),cand=MEMBERS.filter(m=>!b.members.some(z=>z.n===m.n));openDlg(`${dlgHead('Adicionar pessoa',`${esc(b.label)} · ${esc(eById(d.ev).t)}`)}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="emq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="emp" style="max-height:200px">${lmCand(cand,'',lmYmOf(d))}</div><p class="eswarn" id="emw" hidden></p><div id="eml"></div>
   <label class="fld" style="margin-top:12px"><span class="fl">Responsabilidade</span><input id="emr" placeholder="Ex.: Vocal, Bateria, Monitor…" autocomplete="off" list="emrl"><datalist id="emrl">${[...new Set(esMembers(x).map(m=>m.role))].map(r=>`<option value="${esc(r)}">`).join('')}</datalist><span class="err"></span></label>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoM" data-v="${v}">Adicionar</button></div>`,'sm');
  const ym=lmYmOf(d),warn=()=>{const s=$('input[name=pm]:checked'),w=$('#emw'),L=$('#eml'),bt=$('[data-a=esDoM]');if(!s){w.hidden=true;L.innerHTML='';bt.textContent='Adicionar';bt.classList.remove('lm-go');return;}const n=byId(s.value).n,o=d.blocks.find(z=>z!==b&&z.members.some(m=>m.n===n));w.hidden=!o;if(o)w.innerHTML=`${ic('alert',13,2)}${esc(n.split(' ')[0])} já está em “${esc(o.label)}” nesta data. Cada bloco conta 1 no limite do mês.`;
   L.innerHTML=lmWarn(n,ym);const ov=!!L.querySelector('.lm-w.bad');bt.textContent=ov?'Escalar acima do limite':'Adicionar';bt.classList.toggle('lm-go',ov);};
  $('#emp').addEventListener('change',warn);$('#emq').addEventListener('input',e=>{$('#emp').innerHTML=lmCand(cand,e.target.value,ym);warn();});},
 esDoM:(v,bt)=>{const {x,b}=refB(v),s=$('input[name=pm]:checked'),r=$('#emr');if(!s){toast('Escolha uma pessoa');return;}if(!r.value.trim()){r.closest('.fld').classList.add('bad');r.nextElementSibling.textContent='Diga o que a pessoa vai fazer';r.focus();return;}
  const n=byId(s.value).n,{d}=refB(v),ym=lmYmOf(d),u=lmUse(n,ym),ov=u.c>=u.lim,ack=$('#emack');
  if(ov&&!(ack&&ack.checked)){const l=ack.closest('.lm-ack');l.classList.remove('shk');void l.offsetWidth;l.classList.add('shk','bad');return;}
  bt.classList.add('busy');setTimeout(()=>{b.members.push({n,role:r.value.trim(),st:sentSt(x),over:ov||undefined});if(ov)LOG.unshift({u:'Rafael Pereira',a:'Escalou acima do limite',e:'Escala',x:n,det:`${u.c+1}/${u.lim} em ${lmMon(ym)} · ${x.n}`,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});closeDlg();esRe();const f=n.split(' ')[0];toast(ov?`${f} escalado(a) como exceção: ${u.c+1} de ${u.lim} em ${lmMon(ym)}${x.st!=='criacao'?'. O convite avisa que pode recusar':''}`:u.c+1===u.lim&&LMR.on?`${f} adicionado(a) · fechou o limite de ${lmMon(ym)} (${u.lim}/${u.lim})`:x.st==='criacao'?`${f} adicionado(a)`:`${f} adicionado(a) e avisado(a)`);},400);},
 esDelM:v=>{const {x,b,mi}=refB(v),m=b.members[mi];const go=()=>{b.members.splice(mi,1);esRe();toast(`${m.n.split(' ')[0]} removido(a)`,()=>{b.members.splice(mi,0,m);esRe();});};if(x.st==='criacao')return go();confirmDel({title:`Tirar ${m.n.split(' ')[0]} deste bloco?`,body:`${m.n} ${m.st==='confirmado'?'já tinha confirmado e ':''}será avisado(a) de que não precisa mais servir em “${esc(b.label)}”.`,label:'Tirar da escala',onConfirm:go});},
 esMst:v=>{const {x,b,mi}=refB(v),m=b.members[mi];m.st='confirmado';esRe();toast(`${m.n.split(' ')[0]} marcado(a) como confirmado`,()=>{m.st='aguardando';esRe();});},
 esNotify:(v,bt)=>{const {b}=refB(v),p=b.members.filter(m=>m.st==='aguardando'||m.st==='rascunho');busy(bt,800,'Avisado',()=>{p.forEach(m=>m.st='aguardando');toast(`${p.map(m=>m.n.split(' ')[0]).join(', ')} ${p.length>1?'foram avisados':'foi avisado(a)'}`);setTimeout(esRe,900);});},
 esAddC:v=>{const {x,b}=refB(v);window._ecS={v,k:x.min==='Louvor'?'musica':x.min==='Kids'?'material':'musica',sel:{musica:{ids:[],cfg:{}},material:{ids:[],cfg:{}},pregacao:{ids:[],cfg:{}}},out:{t:'',d:''},q:''};
  openDlg(`${dlgHead('Adicionar conteúdo',`${esc(b.label)} · escolha o tipo e depois o item da biblioteca`)}<div class="ec-ty" role="radiogroup" aria-label="Tipo de conteúdo">${Object.entries(ECT).map(([k,t])=>`<button type="button" role="radio" class="ec-t ${k}" data-k="${k}"><span class="ec-ti">${ic(t[2],16)}</span><b>${t[0]}</b><small>${t[1]}</small><em class="ec-bd" data-bd="${k}"></em></button>`).join('')}</div><div id="ecBody"></div>
   <div class="dfoot ec-ft"><span class="ec-sum" id="ecSum"></span><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" data-a="esDoC" data-v="${v}" id="ecGo" disabled>Adicionar</button></div>`,'lg');
  $('.ec-ty').addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t)return;const E=window._ecS;if(E.k===t.dataset.k)return;Object.assign(E,{k:t.dataset.k,q:''});ecPaint();});ecPaint();},
 esDoC:(v,bt)=>{const E=window._ecS,{b}=refB(v),err=(m,k)=>{if(k&&k!==E.k){E.k=k;E.q='';ecPaint();}const e=$('#ecErr');e.innerHTML=`${ic('alert',13,2)}${m}`;e.hidden=false;};const items=[];
  for(const k of ['musica','material','pregacao']){const P=E.sel[k],lib=ecSrc(k);
   for(const id of P.ids){const src=lib.find(z=>z.id===id),o=src.o,cf=P.cfg[id];
    if(k==='musica'){if(b.content.some(c=>c.k==='musica'&&c.ref===id&&c.key===cf.key))return err(`${src.t} em ${cf.key} já está neste bloco`,k);items.push({t:src.t,d:`Tom ${cf.key}${cf.key!==o.key?' (original '+o.key+')':''} · ${o.art}`,k,ref:id,key:cf.key});}
    else if(k==='material'){const fs=o.files.map(f=>f.n).filter(n=>cf.files.includes(n));if(o.files.length&&!fs.length)return err(`Marque pelo menos um arquivo de “${src.t}”`,k);items.push({t:src.t,d:fs.length===o.files.length?(fs.length?`${fs.length} arquivo${fs.length===1?'':'s'}`:'sem arquivos'):fs.join(', '),k,ref:id,files:fs});}
    else items.push({t:src.t,d:`${o.who} · ${fmtD(o.d)}`,k,ref:id});}}
  const ot=E.out.t.trim();if(ot)items.push({t:ot,d:E.out.d.trim(),k:'outro'});
  if(!items.length)return err(E.k==='outro'?'Dê um título ou selecione itens de outro tipo':'Selecione pelo menos um item');
  bt.classList.add('busy');setTimeout(()=>{b.content.push(...items);closeDlg();esRe();toast(items.length>1?`${items.length} itens adicionados ao bloco`:`${ECT[items[0].k][0]}: ${items[0].t} adicionad${items[0].k==='musica'||items[0].k==='pregacao'?'a':'o'}`);},350);},
 esDelC:v=>{const {b,mi}=refB(v),c=b.content[mi];b.content.splice(mi,1);esRe();toast(`${c.t} removido`,()=>{b.content.splice(mi,0,c);esRe();});},
 esReuse:v=>{const {x,b}=refB(v),src=x.dates.flatMap(d=>d.blocks.filter(z=>z!==b&&z.content.length).map(z=>({d,z})));
  openDlg(`${dlgHead('Reaproveitar conteúdo','Copia o conteúdo de outro bloco desta escala.')}<div class="pick">${src.length?src.map((s,i)=>`<label class="pk"><span class="cti">${ic('layers',15)}</span><span><b>${esc(s.z.label)} · ${fmtD(eById(s.d.ev).d)}</b><small>${s.z.content.map(c=>esc(c.t)).join(', ')}</small></span><input type="radio" name="rs" value="${i}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Nenhum outro bloco tem conteúdo ainda.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoReuse" data-v="${v}" ${src.length?'':'disabled'}>Copiar conteúdo</button></div>`,'sm');
  window._esSrc=src;},
 esDoReuse:v=>{const {b}=refB(v),s=window._esSrc[+$('input[name=rs]:checked').value];let n=0;s.z.content.forEach(c=>{if(!b.content.some(z=>z.t===c.t)){b.content.push({...c});n++;}});closeDlg();esRe();toast(n?`${n} ${n===1?'item copiado':'itens copiados'}`:'Esse conteúdo já estava no bloco');},
 esSend:(v,bt)=>{const x=esById(S.esc),ms=esMembers(x),empty=x.dates.reduce((a,d)=>a+d.blocks.filter(b=>!b.members.length).length,0);
  openDlg(`${dlgHead('Enviar para os escalados?',`${ms.length} ${ms.length===1?'pessoa recebe':'pessoas recebem'} o pedido no app e por e-mail para confirmar.`)}${empty?`<p class="eswarn">${ic('alert',13,2)}${empty} ${empty===1?'bloco está':'blocos estão'} sem ninguém. Dá para completar depois.</p>`:''}${(()=>{const ov=[...new Set(ms.filter(m=>m.over&&m.st!=='recusado').map(m=>m.n))];return ov.length?`<div class="lm-w bad" style="margin-top:10px">${ic('alert',14,2.2)}<div><b>${ov.length} ${ov.length===1?'convite vai':'convites vão'} como exceção ao limite mensal</b><span>${ov.map(n=>esc(n.split(' ')[0])).join(', ')} ${ov.length===1?'vê':'veem'} o aviso no app e ${ov.length===1?'pode':'podem'} recusar sem constrangimento.</span></div></div>`:'';})()}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoSend">Enviar</button></div>`,'sm');},
 esDoSend:(v,bt)=>{bt.classList.add('busy');setTimeout(()=>{const x=esById(S.esc);x.st='aguardando';esMembers(x).forEach(m=>{if(m.st==='rascunho')m.st='aguardando';});closeDlg();esRe();toast('Pedidos enviados. Você será avisado quando confirmarem.');},800);},
 esRemind:(v,bt)=>busy(bt,800,'Lembrete enviado',()=>{const x=esById(S.esc),p=esMembers(x).filter(m=>m.st==='aguardando');toast(`Lembrete enviado para ${p.map(m=>m.n.split(' ')[0]).join(', ')}`);}),
 esApprove:(v,bt)=>{bt.classList.add('busy');setTimeout(()=>{const x=esById(S.esc);x.st='aprovada';esRe();toast(`${x.n} aprovada`);},600);},
 esDup:()=>{closePops();const x=esById(S.esc),c=JSON.parse(JSON.stringify(x));c.id='es'+Date.now();c.n=x.n.replace(/— \w+$/,'')+'(cópia)';c.st='criacao';c.dates=[];ESCALAS.unshift(c);S.esc=c.id;render();toast('Escala duplicada sem datas. Adicione as do próximo mês.');},
 esDel:()=>{closePops();const x=esById(S.esc),n=esMembers(x).length;confirmDel({title:`Excluir ${x.n}?`,body:`${n&&x.st!=='criacao'?`As ${n} pessoas escaladas são avisadas do cancelamento. `:''}Os eventos continuam no Calendário. Esta ação não pode ser desfeita.`,label:'Excluir escala',typed:n&&x.st!=='criacao'?x.n:null,onConfirm:()=>{ESCALAS.splice(ESCALAS.indexOf(x),1);S.esc=null;render();toast(`${x.n} excluída`);}});},
};

/* ---------- limite mensal de escalas ---------- */
const LMR={on:true,limit:3,notifyMember:true,warnNear:true};
const LMX=[
 {n:'Helena Duarte',lim:1,until:'2026-11',why:'Semestre de provas na faculdade',by:'Rafael Pereira',at:'2026-09-12'},
 {n:'Daniela Rocha',lim:5,until:'',why:'Líder do Louvor, serve na maioria dos cultos',by:'Ana Lima',at:'2026-08-30'},
 {n:'Larissa Pires',lim:0,until:'2026-10',why:'Mudança de casa neste mês',by:'Rafael Pereira',at:'2026-09-25'}];
const LMPREF={'Bruno Reis':2};
const LMYM='2026-10';
Object.assign(S,{lmtab:'lim',lmD:null,lmYm:LMYM,lmEx:null,lmq:'',lmF:null,lmConf:false});
const lmMon=ym=>MONTHS[+ym.slice(5,7)-1];
const lmMs=ym=>lmMon(ym).slice(0,3);
const lmYmOf=d=>(eById(d.ev)||{}).d?.slice(0,7)||'';
const lmMonY=ym=>lmMon(ym)[0].toUpperCase()+lmMon(ym).slice(1)+' '+ym.slice(0,4);
function lmEntries(n,ym){const r=[];ESCALAS.forEach(x=>x.dates.forEach(d=>{if(lmYmOf(d)!==ym)return;d.blocks.forEach(b=>b.members.forEach(m=>{if(m.n===n&&m.st!=='recusado')r.push({x,d,b,m});}));}));return r;}
const lmCount=(n,ym)=>lmEntries(n,ym).length;
function lmExc(n,ym){const e=LMX.find(z=>z.n===n);return e&&(!e.until||e.until>=ym)?e:null;}
function lmLim(n,ym,r=LMR){const e=lmExc(n,ym);return e?e.lim:r.on?r.limit:Infinity;}
function lmUse(n,ym,r=LMR){const c=lmCount(n,ym),lim=lmLim(n,ym,r),e=lmExc(n,ym);const st=lim===0?(c?'over':'pause'):lim===Infinity?'free':c>lim?'over':c===lim?'full':c===lim-1?'near':'free';return {c,lim,e,st,pref:LMPREF[n]};}
const LMST={over:['Acima do limite','var(--st-rec)','var(--st-rec-bg)'],full:['No limite','var(--st-rec)','var(--st-rec-bg)'],pause:['Em pausa','var(--ink-muted)','var(--surface-2)'],near:['Última vaga','var(--st-sol)','var(--st-sol-bg)'],free:['Com vaga','var(--st-int)','var(--st-int-bg)']};
const LMORD=['over','full','pause','near','free'];
const lmSort=(a,b)=>LMORD.indexOf(a.st)-LMORD.indexOf(b.st)||b.c-a.c||a.n.localeCompare(b.n);
const lmPill=(n,ym,r)=>{const u=lmUse(n,ym,r);if(u.lim===Infinity)return '';return `<span class="lm-p ${u.st}" title="${u.c} de ${u.lim} escalas em ${lmMon(ym)}${u.e?' · exceção individual':''}">${u.lim===0?`${ic('pause',10,2.6)}Pausa`:`<b>${u.c}</b>/${u.lim}`}<small>${lmMs(ym)}</small></span>`;};
const lmStp=s=>`<span class="stp" style="--c:${LMST[s][1]};--b:${LMST[s][2]}"><i></i>${LMST[s][0]}</span>`;
const lmDots=(c,lim)=>{const t=Math.min(10,Math.max(c,lim===Infinity?c:lim));return `<span class="lm-dots" aria-hidden="true">${Array.from({length:t},(_,i)=>`<i class="${i<c?(i>=lim?'ov':'on'):''}"></i>`).join('')}</span>`;};
const lmAv=n=>`<span class="av" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`;
function lmPeople(ym,r){const s=new Set();ESCALAS.forEach(x=>x.dates.forEach(d=>{if(lmYmOf(d)===ym)d.blocks.forEach(b=>b.members.forEach(m=>{if(m.st!=='recusado')s.add(m.n);}));}));LMX.forEach(e=>{if(!e.until||e.until>=ym)s.add(e.n);});return [...s].map(n=>({n,...lmUse(n,ym,r)}));}
function lmCand(c,q,ym){q=norm(q);const l=c.filter(m=>norm(m.n).includes(q)).slice(0,8);return l.length?l.map(m=>`<label class="pk">${mav(m)}<span><b>${esc(m.n)}</b><small>${m.min.length?m.min.join(', '):ST[m.st].l}</small></span>${lmPill(m.n,ym)}<input type="radio" name="pm" value="${m.id}"></label>`).join(''):'<p class="who" style="padding:10px">Ninguém encontrado.</p>';}

function lmCard(){
 const ym=LMYM,p=lmPeople(ym),k=s=>p.filter(z=>z.st===s).length,hot=p.filter(z=>['over','full','near','pause'].includes(z.st)).sort(lmSort).slice(0,4);
 return `<section class="card lm-bal rise" style="--d:2">
  <div class="lm-rule"><div class="lm-big ${LMR.on?'':'off'}"><b>${LMR.on?LMR.limit:'∞'}</b><span>${LMR.on?'por mês':'sem teto'}</span></div>
   <div class="dkt"><b>${LMR.on?`Até ${LMR.limit} escalas por pessoa`:'Limite mensal desligado'}</b><span>${LMR.on?'Somando todos os ministérios':'Só as exceções individuais valem'} · ${LMX.length} exceç${LMX.length===1?'ão':'ões'}</span>
   <button class="btn sec sm" data-a="lmOpen" data-v="lim" style="margin-top:10px;align-self:flex-start">${ic('sliders',14)}Regras de escala</button></div></div>
  <div class="lm-cnt">${[['over','Acima'],['full','No limite'],['near','Última vaga'],['pause','Em pausa']].map(s=>`<button class="lm-c ${s[0]}" data-a="lmOpen" data-v="carga"><b>${k(s[0])}</b><span>${s[1]}</span></button>`).join('')}</div>
  <div class="lm-hot"><div class="sh" style="margin:0 0 8px"><p class="fl" style="margin:0">Equilíbrio de ${lmMon(ym)}</p><button class="lnk" data-a="lmOpen" data-v="carga">Ver todos</button></div>
   ${hot.length?hot.map(z=>`<div class="lm-hr">${lmAv(z.n)}<span class="lm-hn">${esc(z.n)}</span>${lmDots(z.c,z.lim)}${lmPill(z.n,ym)}</div>`).join(''):`<p class="who" style="margin:0">Ninguém perto do limite em ${lmMon(ym)}.</p>`}</div>
 </section>`;
}

/* rules dialog */
function lmPaint(){
 const t=S.lmtab,el=$('#lmIn');if(!el)return;
 el.innerHTML=`<div class="segc lm-tabs" role="tablist">${[['lim','Limite'],['exc','Exceções',LMX.length],['carga','Carga do mês']].map(z=>`<button data-a="lmTab" data-v="${z[0]}" aria-pressed="${t===z[0]}">${z[1]}${z[2]!==undefined?`<small>${z[2]}</small>`:''}</button>`).join('')}</div>
 <div class="lm-body">${t==='lim'?(S.lmConf?lmConfView():lmTabLim()):t==='exc'?(S.lmEx!==null?lmExForm():lmTabExc()):lmTabCarga()}</div>`;
 lmMount();
}
const lmDirty=()=>{const D=S.lmD;return D.on!==LMR.on||D.limit!==LMR.limit||D.notifyMember!==LMR.notifyMember||D.warnNear!==LMR.warnNear;};
function lmTabLim(){
 const D=S.lmD,p=lmPeople(LMYM,D),ov=p.filter(z=>z.st==='over').length,fu=p.filter(z=>z.st==='full').length;
 const impact=!D.on?'Sem limite. Só as exceções individuais valem.':ov||fu?`Em ${lmMon(LMYM)}: ${[fu?`${fu} ${fu===1?'pessoa':'pessoas'} no limite`:'',ov?`<b>${ov} acima</b>`:''].filter(Boolean).join(' · ')}`:`Em ${lmMon(LMYM)}, ninguém chega no limite.`;
 return `<div class="lm2 ${D.on?'':'off'}">
  <div class="lm2-top"><span class="lm2-lbl">Limite mensal</span><label class="tog lm2-sw"><input type="checkbox" id="lmOn" ${D.on?'checked':''}><span class="sw"></span><span>${D.on?'Ligado':'Desligado'}</span></label></div>
  <div class="lm2-main"><span>Cada pessoa serve até</span>
   <span class="lm2-step"><button type="button" data-a="lmStep" data-v="-1" ${!D.on||D.limit<=1?'disabled':''} aria-label="Diminuir">${ic('minus',16,2.4)}</button><output aria-live="polite"><b>${D.limit}</b></output><button type="button" data-a="lmStep" data-v="1" ${!D.on||D.limit>=10?'disabled':''} aria-label="Aumentar">${ic('plus',16,2.4)}</button></span>
   <span>${D.limit===1?'vez':'vezes'} por mês</span></div>
  <p class="lm2-sub">Somando todos os ministérios. Acima disso, só como exceção.</p>
  <button type="button" class="lm2-imp ${ov?'bad':''}" data-a="lmTab" data-v="carga">${impact}${D.on?ic('chevR',13,2.2):''}</button>
 </div>
 <details class="lm2-how" ${S.lmHow?'open':''}><summary>${ic('info',14,2)}Como a conta funciona${ic('chevD',14,2.2)}</summary><ul><li>Convites <b>confirmados e pendentes</b> contam.</li><li>Se a pessoa <b>recusa</b>, a vaga volta.</li><li>Cada <b>bloco</b> conta 1 (manhã e tarde = 2).</li></ul></details>
 <label class="tog lm2-ntf"><input type="checkbox" id="lmNm" ${D.notifyMember?'checked':''}><span class="sw"></span><span><b>Enviar avisos</b><small>Para a pessoa quando chega no limite, e para o líder na última vaga</small></span></label>
 <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="lmSave" ${lmDirty()?'':'disabled'}>Salvar</button></div>`;
}
function lmConfView(){
 const D=S.lmD,nw=lmPeople(LMYM,D).filter(z=>z.st==='over'&&lmUse(z.n,LMYM).st!=='over').sort(lmSort);
 return `<div class="lm-conf"><span class="lm-ci">${ic('alert',20,2)}</span><h4>${nw.length} ${nw.length===1?'pessoa fica':'pessoas ficam'} acima do novo limite</h4><p class="who">Em ${lmMon(LMYM)}, com ${D.limit} por mês. Nada é desfeito: as escalas já feitas continuam e ninguém é avisado. Novos convites para essas pessoas vão exigir exceção.</p>
  <div class="lm-cl">${nw.map(z=>`<div class="lm-hr">${lmAv(z.n)}<span class="lm-hn">${esc(z.n)}</span>${lmDots(z.c,z.lim)}${lmPill(z.n,LMYM,D)}</div>`).join('')}</div></div>
  <div class="dfoot"><button class="btn sec" data-a="lmBack">Voltar</button><button class="btn pri" data-a="lmSave" data-v="force">Salvar mesmo assim</button></div>`;
}
function lmTabExc(){
 const q=norm(S.lmq),l=LMX.map((e,i)=>({e,i})).filter(z=>!q||norm(z.e.n+' '+z.e.why).includes(q));
 return `<div class="lm-exh"><label class="sbox">${ic('search',16)}<input id="lmq" placeholder="Buscar pessoa ou motivo" value="${esc(S.lmq)}" autocomplete="off"></label><button class="btn pri sm" data-a="lmExNew">${ic('plus',14,2.2)}Nova exceção</button></div>
 <p class="who" style="margin:0 0 10px">Um limite próprio para quem precisa servir menos (ou mais) que o padrão. Limite 0 é uma pausa: a pessoa não aparece como disponível.</p>
 ${l.length?`<div class="lm-exl">${l.map(({e,i})=>{const exp=e.until&&e.until<LMYM,u=lmUse(e.n,LMYM),k=e.lim===0?'pz':e.lim>LMR.limit?'up':'dn',cap=e.lim===0?0:e.lim;
   return `<article class="lmx ${k} ${exp?'exp':''}">
    <div class="lmx-h">${lmAv(e.n)}<div class="lmx-n"><b>${esc(e.n)}</b><span>${esc(e.why)}</span></div>
     <div class="lmx-r"><span class="lmx-v">${e.lim===0?`${ic('pause',13,2.6)}<b>Pausa</b>`:`<b>${e.lim}</b><small>por mês</small>`}</span>
      <div class="lmx-a"><button class="ibtn sm" data-a="lmExEdit" data-v="${i}" aria-label="Editar exceção" title="Editar">${ic('sliders',14)}</button><button class="ibtn sm lm-del" data-a="lmExDel" data-v="${i}" aria-label="Remover exceção" title="Remover">${ic('x',14)}</button></div></div></div>
    <div class="lmx-f"><span class="lmx-t">${e.lim===0?'Não aparece como disponível':e.lim>LMR.limit?`Acima do padrão (${LMR.limit})`:`Abaixo do padrão (${LMR.limit})`}</span><span class="lmx-d">${ic('clock',12,2)}${exp?'Expirou':e.until?'até '+lmMs(e.until)+'/'+e.until.slice(2,4):'Sem prazo'}</span>
     <span class="lmx-u ${u.st}">${e.lim===0?(u.c?`<b>${u.c}</b> escala${u.c===1?'':'s'} em ${lmMs(LMYM)}`:`Nenhuma escala em ${lmMs(LMYM)}`):`${lmDots(u.c,cap)}<b>${u.c}</b>/${cap} em ${lmMs(LMYM)}`}</span></div>
   </article>`;}).join('')}</div>`
 :`<div class="mempty"><p>${q?'Nenhuma exceção encontrada':'Nenhuma exceção'}</p><span>${q?'Tente outro nome.':'Todos seguem o limite da igreja.'}</span></div>`}`;
}
const LMUNTIL=['','2026-10','2026-11','2026-12','2027-01','2027-02','2027-03'];
function lmExForm(){
 const F=S.lmF,isNew=S.lmEx===-1,u=F.n?lmUse(F.n,LMYM):null,names=[...new Set(MEMBERS.map(m=>m.n))],dup=isNew&&F.n&&LMX.some(e=>e.n===F.n);
 const cmp=!LMR.on?'A igreja está sem limite. Esta exceção vira o teto dessa pessoa.':F.lim===0?'Pausa: não aparece como disponível e qualquer convite vira exceção.':F.lim<LMR.limit?`Menos que o padrão da igreja (${LMR.limit}). Para aliviar.`:F.lim>LMR.limit?`Mais que o padrão da igreja (${LMR.limit}). Use para líderes e quem pediu mais.`:`Igual ao padrão da igreja (${LMR.limit}).`;
 return `<div class="lm-exf"><button class="lnk back" data-a="lmExBack">${ic('chevL',13,2.2)}Exceções</button><h4>${isNew?'Nova exceção':'Editar exceção'}</h4>
  <div class="fld"><span class="fl">Membro</span>${isNew?`<label class="sbox">${ic('search',16)}<input id="lxq" placeholder="Buscar membro" autocomplete="off" value="${esc(S.lxq||'')}"></label><div class="pick" id="lxp" style="max-height:170px;margin-top:6px">${lmXList(names)}</div>`:`<div class="lm-xm">${lmAv(F.n)}<b>${esc(F.n)}</b>${lmPill(F.n,LMYM)}</div>`}<span class="err" id="lxe1"></span>
   ${dup?`<p class="eswarn">${ic('info',13,2)}${esc(F.n.split(' ')[0])} já tem uma exceção. Salvar substitui a atual.</p>`:''}</div>
  <div class="fgrid lm-x2">
   <div class="fld"><span class="fl">Limite próprio</span><div class="lm-step sm"><button type="button" data-a="lmXStep" data-v="-1" ${F.lim<=0?'disabled':''} aria-label="Diminuir">${ic('minus',14,2.4)}</button><output><b>${F.lim===0?'Pausa':F.lim}</b><small>${F.lim===0?'não escalar':F.lim===1?'escala por mês':'escalas por mês'}</small></output><button type="button" data-a="lmXStep" data-v="1" ${F.lim>=10?'disabled':''} aria-label="Aumentar">${ic('plus',14,2.4)}</button></div><span class="hint">${cmp}</span><span class="err" id="lxe2"></span></div>
   <label class="fld"><span class="fl">Vale até</span><span class="selw"><select id="lxu">${LMUNTIL.map(v=>`<option value="${v}" ${F.until===v?'selected':''}>${v?lmMonY(v):'Sem prazo'}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Depois disso volta ao limite da igreja, sozinho.</span></label>
  </div>
  <label class="fld"><span class="fl">Motivo</span><input id="lxw" maxlength="120" value="${esc(F.why)}" placeholder="Ex.: semestre de provas, líder do ministério…" autocomplete="off"><span class="hint">Só líderes e admins veem. <span id="lxc">${F.why.length}</span>/120</span><span class="err" id="lxe3"></span></label>
  ${u&&F.lim<u.c?`<p class="eswarn">${ic('alert',13,2)}${esc(F.n.split(' ')[0])} já tem ${u.c} escalas em ${lmMon(LMYM)}. Elas continuam; novos convites viram exceção.</p>`:''}
  <div class="dfoot"><button class="btn sec" data-a="lmExBack">Cancelar</button><button class="btn pri" data-a="lmExSave">${isNew?'Criar exceção':'Salvar exceção'}</button></div></div>`;
}
function lmXList(names){const q=norm(S.lxq||''),l=names.filter(n=>norm(n).includes(q)).slice(0,8);return l.length?l.map(n=>`<label class="pk">${lmAv(n)}<span><b>${esc(n)}</b><small>${LMX.some(e=>e.n===n)?'Já tem exceção':lmCount(n,LMYM)+' escala'+(lmCount(n,LMYM)===1?'':'s')+' em '+lmMon(LMYM)}</small></span>${lmPill(n,LMYM)}<input type="radio" name="lxm" value="${esc(n)}" ${S.lmF.n===n?'checked':''}></label>`).join(''):'<p class="who" style="padding:10px">Ninguém encontrado.</p>';}
function lmTabCarga(){
 const ym=S.lmYm,p=lmPeople(ym).sort(lmSort),tot=p.reduce((a,z)=>a+z.c,0);
 return `<div class="lm-mh"><button class="ibtn sm" data-a="lmYm" data-v="-1" ${ym<='2026-10'?'disabled':''} aria-label="Mês anterior">${ic('chevL',14,2)}</button><b>${lmMonY(ym)}</b><button class="ibtn sm" data-a="lmYm" data-v="1" ${ym>='2026-12'?'disabled':''} aria-label="Próximo mês">${ic('chevR',14,2)}</button><span class="who">${p.length} pessoas · ${tot} escalas</span></div>
 ${p.length?`<div class="lm-tb">${p.map(z=>{const mins=[...new Set(lmEntries(z.n,ym).map(e=>e.x.min))];return `<div class="lm-tr">${lmAv(z.n)}<span class="dkt"><b>${esc(z.n)}</b><span>${mins.length?mins.join(', '):'Sem escalas'}${z.e?` · <em class="lm-xt">exceção</em>`:''}${z.pref?` · prefere até ${z.pref}`:''}</span></span>${lmDots(z.c,z.lim)}<span class="lm-n"><b>${z.c}</b>/${z.lim===Infinity?'∞':z.lim}</span>${lmStp(z.st)}</div>`;}).join('')}</div>`
 :`<div class="mempty"><p>Ninguém escalado em ${lmMon(ym)}</p><span>As escalas desse mês ainda não foram montadas.</span></div>`}`;
}
function lmMount(){
 const on=$('#lmOn');if(on)on.addEventListener('change',()=>{S.lmD.on=on.checked;lmPaint();});
 const hw=$('.lm2-how');if(hw)hw.addEventListener('toggle',()=>{S.lmHow=hw.open;});const nm=$('#lmNm');if(nm)nm.addEventListener('change',()=>{S.lmD.notifyMember=nm.checked;S.lmD.warnNear=nm.checked;lmPaint();});
 const wn=$('#lmWn');if(wn)wn.addEventListener('change',()=>{S.lmD.warnNear=wn.checked;lmPaint();});
 const q=$('#lmq');if(q)q.addEventListener('input',()=>{S.lmq=q.value;const p=q.selectionStart;lmPaint();const n=$('#lmq');n.focus();n.setSelectionRange(p,p);});
 const lq=$('#lxq');if(lq)lq.addEventListener('input',()=>{S.lxq=lq.value;$('#lxp').innerHTML=lmXList([...new Set(MEMBERS.map(m=>m.n))]);});
 const lp=$('#lxp');if(lp)lp.addEventListener('change',e=>{if(e.target.name==='lxm'){S.lmF.n=e.target.value;const ex=LMX.find(z=>z.n===S.lmF.n);if(ex)Object.assign(S.lmF,{lim:ex.lim,until:ex.until,why:ex.why});lmPaint();}});
 const lu=$('#lxu');if(lu)lu.addEventListener('change',()=>{S.lmF.until=lu.value;});
 const lw=$('#lxw');if(lw)lw.addEventListener('input',()=>{S.lmF.why=lw.value;$('#lxc').textContent=lw.value.length;lw.closest('.fld').classList.remove('bad');});
}
const lmErr=(id,msg)=>{const e=$('#'+id);if(!e)return;e.textContent=msg;e.closest('.fld').classList.add('bad');};
function myLimit(){const c=MYESC.filter(x=>x.d.startsWith(LMYM)).length,lim=lmLim('Rafael Pereira',LMYM);if(lim===Infinity)return '';const st=c>lim?'over':c===lim?'full':c===lim-1?'near':'free';
 return `<div class="lm-me ${st}">${lmDots(c,lim)}<span class="dkt"><b>${c} de ${lim} escalas em ${lmMon(LMYM)}</b><span>${st==='full'||st==='over'?'Você chegou no limite do mês. Novos convites só chegam como exceção.':st==='near'?'Falta 1 para o seu limite do mês.':'Limite da igreja para ninguém ficar sobrecarregado.'}</span></span></div>`;}

const LMA={
 lmOpen:v=>{closePops&&closePops();S.lmtab=v||'lim';S.lmD={...LMR};S.lmEx=null;S.lmConf=false;S.lmq='';S.lmYm=LMYM;openDlg(`${dlgHead('Regras de escala','Para ninguém ficar sobrecarregado.')}<div id="lmIn"></div>`,'lm-dlg');lmPaint();},
 lmTab:v=>{S.lmtab=v;S.lmEx=null;S.lmConf=false;lmPaint();},
 lmStep:v=>{const D=S.lmD;D.limit=Math.max(1,Math.min(10,D.limit+ +v));lmPaint();const o=$('.lm-step output b');o&&o.animate([{transform:`translateY(${+v>0?6:-6}px)`,opacity:.3},{transform:'none',opacity:1}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});},
 lmBack:()=>{S.lmConf=false;lmPaint();},
 lmSave:(v,bt)=>{const D=S.lmD,nw=lmPeople(LMYM,D).filter(z=>z.st==='over'&&lmUse(z.n,LMYM).st!=='over');
  if(nw.length&&v!=='force'){S.lmConf=true;lmPaint();return;}
  const was={...LMR};busy(bt,700,'Salvo',()=>{Object.assign(LMR,D);LOG.unshift({u:'Rafael Pereira',a:'Alterou',e:'Regras de escala',x:'Limite mensal',det:D.on?`${was.on?was.limit:'sem limite'} → ${D.limit} por mês`:'Limite desligado',d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});
   setTimeout(()=>{closeDlg();render();toast(D.on?(was.on&&was.limit!==D.limit?`Limite alterado para ${D.limit} escalas por mês`:`Limite de ${D.limit} escalas por mês salvo`):'Limite mensal desligado. As exceções continuam valendo');},350);});},
 lmExNew:()=>{S.lmEx=-1;S.lxq='';S.lmF={n:'',lim:1,until:'',why:''};lmPaint();setTimeout(()=>$('#lxq')?.focus(),30);},
 lmExEdit:v=>{const e=LMX[+v];S.lmEx=+v;S.lmF={n:e.n,lim:e.lim,until:e.until,why:e.why};lmPaint();},
 lmExBack:()=>{S.lmEx=null;lmPaint();},
 lmXStep:v=>{S.lmF.lim=Math.max(0,Math.min(10,S.lmF.lim+ +v));lmPaint();},
 lmExSave:(v,bt)=>{const F=S.lmF;let ok=true;F.why=F.why.trim();
  if(!F.n){lmErr('lxe1','Escolha um membro');ok=false;}
  if(LMR.on&&F.lim===LMR.limit){lmErr('lxe2',`Igual ao limite da igreja (${LMR.limit}). Não precisa de exceção.`);ok=false;}
  if(!F.why){lmErr('lxe3','Conte o motivo. Ajuda outros líderes a entender');ok=false;}
  if(!ok)return;
  busy(bt,600,'Salvo',()=>{const i=LMX.findIndex(e=>e.n===F.n),rec={n:F.n,lim:F.lim,until:F.until,why:F.why,by:'Rafael Pereira',at:'2026-10-01'};if(i>-1)LMX[i]=rec;else LMX.unshift(rec);
   LOG.unshift({u:'Rafael Pereira',a:i>-1?'Editou':'Adicionou',e:'Exceção de escala',x:F.n,det:F.lim===0?'Pausa':`${F.lim} por mês`,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});
   const u=lmUse(F.n,LMYM),f=F.n.split(' ')[0];setTimeout(()=>{S.lmEx=null;S.lmq='';lmPaint();if(S.active==='escalas'&&!S.esc){const y=window.scrollY;render();window.scrollTo(0,y);}toast(F.lim===0?`${f} em pausa${F.until?' até '+lmMs(F.until):''}`:`${f}: até ${F.lim} por mês${u.c>F.lim?` · já tem ${u.c} em ${lmMon(LMYM)}, mantidas`:''}`);},300);});},
 lmExDel:v=>{const e=LMX[+v],f=e.n.split(' ')[0],c=lmCount(e.n,LMYM);confirmDel({title:`Remover a exceção de ${f}?`,body:`${esc(e.n)} volta a seguir o limite da igreja (${LMR.on?LMR.limit+' por mês':'sem limite'}).${LMR.on&&c>LMR.limit?` Já tem ${c} escalas em ${lmMon(LMYM)}: elas continuam valendo.`:''}`,label:'Remover exceção',onConfirm:()=>{const i=LMX.indexOf(e);LMX.splice(i,1);LOG.unshift({u:'Rafael Pereira',a:'Removeu',e:'Exceção de escala',x:e.n,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});if(S.active==='escalas'&&!S.esc)render();LMA.lmOpen('exc');toast(`Exceção de ${f} removida`,()=>{LMX.splice(i,0,e);if(S.active==='escalas'&&!S.esc)render();});}});},
 lmYm:v=>{let [y,m]=S.lmYm.split('-').map(Number);m+=+v;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.lmYm=`${y}-${String(m).padStart(2,'0')}`;lmPaint();},
 lmTeamGo:(v,bt)=>{const P=window._lmTeam;if(!P)return;const {x,b,t,ym}=P,list=t.m.filter(n=>!b.members.some(m=>m.n===n)),blk=list.filter(n=>{const u=lmUse(n,ym);return u.c>=u.lim;}),use=v==='all'?list:list.filter(n=>!blk.includes(n));
  b.team=t.n;use.forEach(n=>b.members.push({n,role:'Equipe',st:sentSt(x),over:blk.includes(n)||undefined}));if(v==='all'&&blk.length)LOG.unshift({u:'Rafael Pereira',a:'Escalou acima do limite',e:'Escala',x:blk.join(', '),det:x.n,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});
  closeDlg();esRe();toast(`${t.n}: ${use.length} ${use.length===1?'pessoa adicionada':'pessoas adicionadas'}${v==='all'&&blk.length?` · ${blk.length} como exceção`:blk.length?` · ${blk.length} ficaram de fora (limite)`:''}`);},
};

function lmWarn(n,ym){const u=lmUse(n,ym),f=esc(n.split(' ')[0]),mon=lmMon(ym);if(u.lim===Infinity)return '';let h='';
 if(u.lim===0)h=`<div class="lm-w bad">${ic('pause',14,2.4)}<div><b>${f} está em pausa${u.e.until?' até '+lmMonY(u.e.until).toLowerCase():''}</b><span>Motivo: ${esc(u.e.why)}. Só escale se já tiver combinado com ${f}.</span></div></div>`;
 else if(u.c>=u.lim)h=`<div class="lm-w bad">${ic('alert',14,2.2)}<div><b>${f} já tem ${u.c} de ${u.lim} escalas em ${mon}</b><span>${u.e?`Limite próprio (${esc(u.e.why)}).`:'Limite da igreja, somando todos os ministérios.'} Dá para escalar mesmo assim: o convite chega marcado como exceção e ${f} pode recusar sem constrangimento.</span></div></div>`;
 else if(u.c===u.lim-1&&LMR.warnNear)h=`<div class="lm-w near">${ic('info',14,2.2)}<div><b>Última vaga de ${f} em ${mon}</b><span>Com este convite fica ${u.lim} de ${u.lim}. Outros ministérios não vão conseguir escalar sem exceção.</span></div></div>`;
 if(u.pref&&u.c>=u.pref&&u.c<u.lim)h+=`<div class="lm-w soft">${ic('heart',14,2)}<div><b>${f} prefere servir até ${u.pref}x por mês</b><span>Definiu no app. Não bloqueia, mas vale conversar antes.</span></div></div>`;
 if(u.c>=u.lim)h+=`<label class="lm-ack"><input type="checkbox" id="emack"><span class="lm-ck">${ic('check',11,3)}</span><span>Entendo e quero escalar ${f} como exceção</span></label>`;
 return h;}

/* conteúdo do bloco: tipo + item da biblioteca */
const ECT={musica:['Música','Do repertório','music'],material:['Material de apoio','Apostilas e arquivos','file'],pregacao:['Pregação','Mensagem gravada','play'],outro:['Outro','Observação livre','layers']};
function ecSrc(k){return k==='musica'?SONGS.map(z=>({id:z.id,t:z.n,sub:`${z.art} · Tom ${z.key} · ${z.bpm} bpm`,tag:z.cat,o:z})):k==='material'?MATS.map(z=>({id:z.id,t:z.t,sub:`${z.files.length} arquivo${z.files.length===1?'':'s'}${z.min?' · '+z.min:''}`,tag:'',o:z})):k==='pregacao'?PREGS.slice().sort((a,b)=>a.d<b.d?1:-1).map(z=>({id:z.id,t:z.t,sub:`${z.who} · ${fmtD(z.d)}`,tag:'',o:z})):[];}
function ecPaint(){const E=window._ecS,el=$('#ecBody');if(!el)return;$$('.ec-t').forEach(t=>t.setAttribute('aria-checked',t.dataset.k===E.k));const go=$('#ecGo'),P=E.sel[E.k]||{ids:[],cfg:{}};ecFoot();
 if(E.k==='outro'){el.innerHTML=`<div class="ec-out"><p class="ec-note">${ic('info',13,2)}Use só para o que não está na biblioteca, como um recado ou uma dinâmica.</p><label class="fld"><span class="fl">Título</span><input id="ecT" maxlength="80" placeholder="Ex.: Momento de oração pelos pais" autocomplete="off" value="${esc(E.out.t)}"><span class="err"></span></label><label class="fld"><span class="fl">Observação <small>opcional</small></span><input id="ecD" maxlength="120" placeholder="Duração, responsável, link…" autocomplete="off" value="${esc(E.out.d)}"></label></div>`;$('#ecT').addEventListener('input',e=>{E.out.t=e.target.value;e.target.closest('.fld').classList.remove('bad');ecFoot();});$('#ecD').addEventListener('input',e=>{E.out.d=e.target.value;});setTimeout(()=>$('#ecT').focus(),30);return;}
 const lib={musica:'Repertório',material:'Material de apoio',pregacao:'Pregações'}[E.k],src=ecSrc(E.k),{b}=refB(E.v);
 el.innerHTML=`<div class="ec-2"><div class="ec-l"><div class="ec-lh"><p class="fl">1 · Selecione em ${lib}</p><span class="ec-n" id="ecN"></span></div><label class="sbox">${ic('search',16)}<input id="ecQ" placeholder="Buscar ${E.k==='musica'?'música ou artista':E.k==='material'?'material':'pregação ou pregador'}" value="${esc(E.q)}" autocomplete="off"></label><div class="ec-grid" id="ecL"></div></div><div class="ec-r" id="ecR"></div></div><p class="eswarn" id="ecErr" hidden></p>`;
 const inBlk=id=>b.content.some(c=>c.k===E.k&&c.ref===id);
 const list=()=>{const q=norm(E.q),l=src.filter(z=>!q||norm(z.t+' '+z.sub).includes(q));$('#ecL').innerHTML=l.length?l.map(z=>{const on=P.ids.includes(z.id),ib=inBlk(z.id)&&E.k!=='musica';return `<button type="button" class="ec-it ${on?'on':''}" data-id="${z.id}" aria-pressed="${on}" ${ib?'disabled title="Já está neste bloco"':''}><span class="cti ec-k ${E.k}">${ic(ECT[E.k][2],14)}</span><span class="dkt"><b>${esc(z.t)}</b><span>${ib?'Já está neste bloco':esc(z.sub)}</span></span><span class="ec-cb">${ic(ib||on?'check':'plus',12,2.6)}</span></button>`;}).join(''):`<p class="who" style="padding:10px">Nada encontrado. Cadastre em Conteúdo › ${lib}.</p>`;};
 const detail=()=>{const r=$('#ecR'),n=P.ids.length;$('#ecN').textContent=n?`${n} selecionad${E.k==='musica'||E.k==='pregacao'?'a':'o'}${n===1?'':'s'}`:'';ecFoot();
  if(!n){r.innerHTML=`<div class="ec-empty"><span>${ic(ECT[E.k][2],20)}</span><p>Toque nos itens ao lado para selecionar.<br>Dá para escolher mais de um.</p></div>`;return;}
  r.innerHTML=`<p class="fl">2 · ${E.k==='musica'?'Tom de cada música':E.k==='material'?'Arquivos de cada material':'Selecionadas'}</p><div class="ec-sl">${P.ids.map((id,i)=>{const z=src.find(q=>q.id===id),o=z.o,cf=P.cfg[id];
   const body=E.k==='musica'?`<div class="ec-kr"><span class="soft">${esc(o.art)}</span><span class="selw sm"><select data-key="${id}" aria-label="Tom de ${esc(o.n)}">${KEYS.map(k=>`<option ${k===cf.key?'selected':''}>${k}</option>`).join('')}</select>${ic('updown',12)}</span>${cf.key!==o.key?`<small class="ec-tr">de ${o.key}</small>`:''}</div>`
    :E.k==='material'?(o.files.length?`<div class="ec-chips">${o.files.map(f=>`<button type="button" class="ec-fc ${cf.files.includes(f.n)?'on':''}" data-f="${id}|${esc(f.n)}" aria-pressed="${cf.files.includes(f.n)}">${fTile(f.n,20)}<span>${esc(f.n)}</span>${ic('check',11,3)}</button>`).join('')}</div>`:`<p class="ec-note warn" style="margin:4px 0 0">${ic('alert',12,2)}Sem arquivos. Vai como referência.</p>`)
    :`<span class="soft">${esc(o.who)} · ${fmtD(o.d)} · ${o.dur} min</span>`;
   return `<div class="ec-s" style="--i:${i}"><div class="ec-sh"><span class="cti ec-k ${E.k}">${ic(ECT[E.k][2],13)}</span><b>${esc(z.t)}</b><button type="button" class="ibtn sm" data-rm="${id}" aria-label="Tirar ${esc(z.t)}">${ic('x',12)}</button></div>${body}</div>`;}).join('')}</div>`;};
 list();detail();
 $('#ecQ').addEventListener('input',e=>{E.q=e.target.value;list();});
 $('#ecL').addEventListener('click',e=>{const t=e.target.closest('.ec-it');if(!t||t.disabled)return;const id=t.dataset.id,i=P.ids.indexOf(id);if(i>-1)P.ids.splice(i,1);else{P.ids.push(id);const o=src.find(z=>z.id===id).o;P.cfg[id]=P.cfg[id]||(E.k==='musica'?{key:o.key}:E.k==='material'?{files:o.files.map(f=>f.n)}:{});}$('#ecErr').hidden=true;list();detail();});
 $('#ecR').addEventListener('click',e=>{const rm=e.target.closest('[data-rm]');if(rm){P.ids.splice(P.ids.indexOf(rm.dataset.rm),1);list();detail();return;}
  const fc=e.target.closest('[data-f]');if(fc){const [id,n]=fc.dataset.f.split('|'),fs=P.cfg[id].files,i=fs.indexOf(n);if(i>-1)fs.splice(i,1);else fs.push(n);fc.classList.toggle('on',i<0);fc.setAttribute('aria-pressed',i<0);$('#ecErr').hidden=true;}});
 $('#ecR').addEventListener('change',e=>{const s=e.target.closest('[data-key]');if(s){P.cfg[s.dataset.key].key=s.value;detail();}});
}

function ecFoot(){const E=window._ecS,go=$('#ecGo');if(!go)return;const c={musica:E.sel.musica.ids.length,material:E.sel.material.ids.length,pregacao:E.sel.pregacao.ids.length,outro:E.out.t.trim()?1:0},n=c.musica+c.material+c.pregacao+c.outro;
 $$('[data-bd]').forEach(x=>{const v=c[x.dataset.bd];x.textContent=v||'';x.classList.toggle('on',!!v);});
 go.disabled=!n;go.textContent=n>1?`Adicionar ${n} itens`:'Adicionar';
 const sm=$('#ecSum');if(sm){const parts=[[c.musica,'música','músicas'],[c.material,'material','materiais'],[c.pregacao,'pregação','pregações'],[c.outro,'outro','outros']].filter(z=>z[0]).map(z=>`${z[0]} ${z[0]===1?z[1]:z[2]}`);sm.innerHTML=parts.length?`${ic('check',12,2.6)}No bloco vão: ${parts.join(' · ')}`:'';}}

/* presença: UI */
function ckBar(d,e){const st=ckState(e);if(!st)return '';const w=ckWin(e),ms=d.blocks.flatMap(b=>b.members).filter(m=>m.st==='confirmado'),c=k=>ms.filter(m=>ckOf(m)===k).length,nck=c('ck');
 const tx=st==='antes'?`Check-in abre às ${ckHM(w.open)}, 2h antes`:st==='fim'?`Check-in encerrou às ${ckHM(w.close)}`:`Check-in aberto até ${ckHM(w.close)}`;
 return `<div class="ckbar ${st}"><span class="ckb-i">${ic('pin',16,2)}</span><div class="dkt"><b>Hoje · ${tx}</b><span>Só vale a até ${CKRAIO} m de ${esc(e.place)} · agora ${ckHM(CKNOW)}</span></div>
  <div class="ckb-n">${[['ok','presentes'],['ck','a confirmar'],['pend','sem check-in'],['falta','faltas']].filter(z=>c(z[0])||z[0]!=='falta').map(z=>`<span class="${z[0]}"><b>${c(z[0])}</b>${z[1]}</span>`).join('')}</div>
  ${S.estab==='ck'?(nck?`<button class="btn pri sm" data-a="ckAll" data-v="${d.id}">${ic('check',14,2.4)}Confirmar ${nck} check-in${nck===1?'':'s'}</button>`:''):`<button class="btn pri sm" data-a="esTab" data-v="ck">Abrir check-in${ic('arrowR',14,2)}</button>`}</div>`;}
function ckCell(m,ref,e){const k=ckOf(m),w=ckWin(e),pill=(lab,sub)=>`<span class="ckp ${k}"><b>${lab}</b>${sub?`<small>${sub}</small>`:''}</span>`;
 if(k==='ck')return `${pill(`Check-in ${m.ck.at}`,`a ${m.ck.dist} m do local`)}<button class="btn pri sm ckgo" data-a="ckOk" data-v="${ref}">${ic('check',13,2.4)}Confirmar</button>`;
 if(k==='ok')return `${pill('Presente',m.manual?`marcado por ${m.by.toLowerCase()} · ${esc(m.why)}`:`check-in ${m.ck.at} · ${m.dist||m.ck.dist} m`)}<button class="ibtn sm" data-a="ckUndo" data-v="${ref}" aria-label="Desfazer" title="Desfazer">${ic('swap',13)}</button>`;
 if(k==='falta')return `${pill('Faltou','marcado por você')}<button class="ibtn sm" data-a="ckUndo" data-v="${ref}" aria-label="Desfazer" title="Desfazer">${ic('swap',13)}</button>`;
 const pre=CKNOW<w.start;return `${pill('Sem check-in','')}<button class="btn sec sm" data-a="ckMan" data-v="${ref}">Marcar presente</button><button class="btn sec sm ckf" data-a="ckFalta" data-v="${ref}" ${pre?`disabled title="Disponível depois do início (${ckHM(w.start)})"`:''}>Falta</button>`;}
const CKA={
 ckOk:(v,bt)=>{const {b,mi}=refB(v),m=b.members[mi];busy(bt,500,'Confirmado',()=>{m.pr='ok';m.by='Você';setTimeout(()=>{esRe();toast(`Presença de ${m.n.split(' ')[0]} confirmada`,()=>{delete m.pr;esRe();});},250);});},
 ckAll:(v,bt)=>{const x=esById(S.esc),d=x.dates.find(z=>z.id===v),l=d.blocks.flatMap(b=>b.members).filter(m=>m.st==='confirmado'&&ckOf(m)==='ck');busy(bt,700,'Confirmados',()=>{l.forEach(m=>{m.pr='ok';m.by='Você';});setTimeout(()=>{esRe();toast(`${l.length} presença${l.length===1?'':'s'} confirmada${l.length===1?'':'s'}: ${l.map(m=>m.n.split(' ')[0]).join(', ')}`,()=>{l.forEach(m=>delete m.pr);esRe();});},250);});},
 ckMan:v=>{const {b,mi}=refB(v),m=b.members[mi],f=m.n.split(' ')[0];
  openDlg(`${dlgHead(`Marcar ${esc(f)} como presente?`,`Use quando a pessoa está no local mas não conseguiu fazer check-in.`)}<div class="ckwhy" id="ckWhy">${['Esqueceu o celular','Sem internet','Localização bloqueada','Chegou depois','Outro'].map(w=>`<button type="button" class="chipf" data-w="${w}">${w}</button>`).join('')}</div><p class="eswarn" id="ckE" hidden>${ic('alert',13,2)}Escolha um motivo. Fica registrado no histórico.</p>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="ckDoMan" data-v="${v}">Marcar presente</button></div>`,'sm');
  $('#ckWhy').addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(!t)return;$$('#ckWhy .chipf').forEach(z=>z.classList.toggle('on',z===t));$('#ckE').hidden=true;});},
 ckDoMan:(v,bt)=>{const w=$('#ckWhy .chipf.on');if(!w){$('#ckE').hidden=false;return;}const {b,mi}=refB(v),m=b.members[mi];bt.classList.add('busy');setTimeout(()=>{Object.assign(m,{pr:'ok',manual:true,why:w.dataset.w,by:'Você'});LOG.unshift({u:'Rafael Pereira',a:'Marcou presença',e:'Escala',x:m.n,det:`Manual · ${w.dataset.w}`,d:CKDAY,t:ckHM(CKNOW)});closeDlg();esRe();toast(`${m.n.split(' ')[0]} marcado(a) como presente`,()=>{delete m.pr;delete m.manual;delete m.why;esRe();});},400);},
 ckFalta:v=>{const {b,mi}=refB(v),m=b.members[mi],f=m.n.split(' ')[0];confirmDel({title:`Registrar falta de ${f}?`,body:`${esc(m.n)} não fez check-in e não foi marcado(a) como presente. A falta fica no histórico de serviço e ${f} recebe um aviso gentil no app. Dá para desfazer.`,label:'Registrar falta',onConfirm:()=>{m.pr='falta';LOG.unshift({u:'Rafael Pereira',a:'Registrou falta',e:'Escala',x:m.n,d:CKDAY,t:ckHM(CKNOW)});esRe();toast(`Falta de ${f} registrada`,()=>{delete m.pr;esRe();});}});},
 ckUndo:v=>{const {b,mi}=refB(v),m=b.members[mi],old={pr:m.pr,manual:m.manual,why:m.why};delete m.pr;delete m.manual;delete m.why;esRe();toast(`Presença de ${m.n.split(' ')[0]} reaberta`,()=>{Object.assign(m,old);esRe();});},
};

/* aba Check-in */
const ckToday=x=>x.dates.find(d=>{const e=eById(d.ev);return e&&e.d===CKDAY;});
const ckPendN=x=>{const d=ckToday(x);return d?d.blocks.flatMap(b=>b.members).filter(m=>m.st==='confirmado'&&ckOf(m)==='ck').length:0;};
function esCk(x){const d=ckToday(x),ds=esSorted(x),fut=ds.filter(z=>{const e=eById(z.ev);return e&&e.d>CKDAY;}),pas=ds.filter(z=>{const e=eById(z.ev);return e&&e.d<CKDAY;});
 const how=`<div class="ckhow"><span>${ic('clock',15,2)}<b>Abre 2h antes</b><small>e fecha 2h depois do início</small></span><span>${ic('pin',15,2)}<b>Até ${CKRAIO} m do local</b><small>fora disso, o app bloqueia</small></span><span>${ic('check',15,2.4)}<b>Você confirma</b><small>ou marca quem esqueceu</small></span></div>`;
 if(!d){const nx=fut[0],e=nx&&eById(nx.ev),w=e&&ckWin(e);
  return `<section class="card ckempty"><span class="cke-i">${ic('pin',26,1.8)}<i></i></span><h2>${nx?'O check-in ainda não abriu':'Nenhuma data com check-in'}</h2><p class="who">${nx?`Os check-ins aparecem aqui no dia da escala. O próximo é <b>${esc(e.t)}</b>, ${wd(e.d)}, ${dBR(e.d)}, a partir das <b>${ckHM(w.open)}</b>.`:'Adicione datas futuras na aba Datas para acompanhar a presença do time.'}</p>
   ${nx?`<div class="cknext">${fut.slice(0,4).map(z=>{const ev=eById(z.ev),wn=ckWin(ev),n=z.blocks.reduce((a,b)=>a+b.members.filter(m=>m.st!=='recusado').length,0);return `<div class="ckn-r">${dTile(ev)}<span class="dkt"><b>${esc(ev.t)}</b><span>${n} pessoa${n===1?'':'s'} · abre às ${ckHM(wn.open)}</span></span><span class="ckn-in">em ${inDays(ev.d)} dia${inDays(ev.d)===1?'':'s'}</span></div>`;}).join('')}</div>`:`<button class="btn pri" data-a="esTab" data-v="datas" style="margin-top:6px">Ir para Datas</button>`}
   ${how}</section>`;}
 const e=eById(d.ev),ms=d.blocks.flatMap(b=>b.members.map((m,i)=>({m,b,i}))).filter(z=>z.m.st==='confirmado'),c=k=>ms.filter(z=>ckOf(z.m)===k).length,tot=ms.length,okp=Math.round(c('ok')/Math.max(tot,1)*100);
 const ord={ck:0,pend:1,ok:2,falta:3},nck=c('ck');
 return `<section class="card ckpanel">${ckBar(d,e)}
  <div class="ckgrid"><div class="ckring" style="--p:${okp}"><div><b>${c('ok')}<small>/${tot}</small></b><span>presentes</span></div></div>
   <div class="cklist">${ms.sort((a,b)=>ord[ckOf(a.m)]-ord[ckOf(b.m)]).map(({m,b,i})=>`<div class="esm ckr ${ckOf(m)}"><span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span><span class="dkt"><b>${esc(m.n)}</b><span>${esc(m.role)}${d.blocks.length>1?' · '+esc(b.label):''}</span></span>${ckCell(m,`${d.id}|${b.id}|${i}`,e)}</div>`).join('')}</div></div>
  ${d.blocks.flatMap(b=>b.members).some(m=>m.st!=='confirmado'&&m.st!=='recusado')?`<p class="eswarn" style="margin-top:12px">${ic('alert',13,2)}Quem não confirmou a escala não aparece no check-in.</p>`:''}
 </section>`;}

function ckStrip(){const it=ESCALAS.map(x=>({x,d:ckToday(x)})).filter(z=>z.d);if(!it.length)return '';
 return it.map(({x,d})=>{const e=eById(d.ev),st=ckState(e),w=ckWin(e),ms=d.blocks.flatMap(b=>b.members).filter(m=>m.st==='confirmado'),c=k=>ms.filter(m=>ckOf(m)===k).length;
  return `<section class="cktoday-strip rise" style="--d:1"><span class="ckb-i">${ic('pin',16,2)}</span><div class="dkt"><b>Hoje · ${esc(e.t)} · ${st==='aberto'?`check-in aberto até ${ckHM(w.close)}`:st==='antes'?`check-in abre às ${ckHM(w.open)}`:'check-in encerrado'}</b><span>${esc(x.n)} · ${e.time} · ${esc(e.place)}</span></div>
   <div class="ckt-n"><span><b>${c('ok')}</b>presentes</span><span><b>${c('ck')}</b>a confirmar</span><span><b>${c('pend')}</b>sem check-in</span></div><button class="btn sm" data-a="ckGo" data-v="${x.id}">Abrir check-in${ic('arrowR',14,2)}</button></section>`;}).join('');}
CKA.ckGo=v=>{S.esc=v;S.estab='ck';S.esview='blocos';render();window.scrollTo({top:0});};

/* ================= Agenda e serviço › Apresentação de Bebês ao Senhor ================= */
const BBR={maxM:24,vagas:6,prazo:7};
const BBD=[{id:'bd0',ev:'ev1',vagas:6,st:'fechada'},{id:'bd1',ev:'ev2',vagas:5,st:'aberta'},{id:'bd2',ev:'ev3',vagas:6,st:'aberta'}];
let _bbid=0;const BBP_=(bebe,nasc,pais,d,st,at,extra={})=>Object.assign({id:'bp'+(++_bbid),bebe,nasc,pais,cert:bebe,d,st,at,why:'',certOk:false},extra);
const BBP=[
 BBP_('Alice Rocha Reis','2026-03-12',['Daniela Rocha','Bruno Reis'],'bd1','aguardando','2026-09-24'),
 BBP_('Theo Andrade Costa','2025-11-02',['Felipe Andrade','Marina Costa'],'bd1','confirmado','2026-09-12'),
 BBP_('Laura Nunes Faria','2026-06-20',['Clara Nunes','Diego Faria'],'bd2','aguardando','2026-09-27'),
 BBP_('Miguel Santana','2024-01-15',['Igor Santana'],'bd2','aguardando','2026-09-28'),
 BBP_('Benjamin Lins Campos','2026-01-10',['Otávio Lins','Renata Campos'],'bd0','realizada','2026-09-02',{certOk:true}),
 BBP_('Maria Clara Prado','2025-12-04',['Juliana Prado'],'bd0','realizada','2026-09-05'),
 BBP_('Davi Teixeira','2026-02-18',['Lucas Teixeira'],'bd1','recusado','2026-09-20',{why:'Data já estava cheia; família vai escolher 11/out'}),
];
Object.assign(S,{bbq:'',bbf:'todos',bbd:null});
const BBST={aguardando:['Aguardando','var(--st-sol)','var(--st-sol-bg)'],confirmado:['Confirmado','var(--st-int)','var(--st-int-bg)'],realizada:['Realizada','var(--brand-text)','var(--brand-soft)'],recusado:['Recusado','var(--st-rec)','var(--st-rec-bg)']};
const bbPill=s=>`<span class="stp" style="--c:${BBST[s][1]};--b:${BBST[s][2]}"><i></i>${BBST[s][0]}</span>`;
const bbD=id=>BBD.find(d=>d.id===id);
const bbEv=p=>eById(bbD(p.d).ev);
const bbM=(nasc,iso)=>{const a=new Date(nasc+'T12:00'),b=new Date(iso+'T12:00');let m=(b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth());if(b.getDate()<a.getDate())m--;return Math.max(0,m);};
const bbAge=m=>m<1?'recém-nascido':m<12?`${m} ${m===1?'mês':'meses'}`:(()=>{const y=Math.floor(m/12),r=m%12;return `${y} ano${y>1?'s':''}${r?` e ${r} ${r===1?'mês':'meses'}`:''}`;})();
const bbUsed=d=>BBP.filter(p=>p.d===d.id&&(p.st==='confirmado'||p.st==='aguardando'||p.st==='realizada')).length;
const bbOver=p=>bbM(p.nasc,bbEv(p).d)>BBR.maxM;
const bbAv=n=>`<span class="bb-av" style="--h:${(n.length*37)%360}">${ic('pacifier',16,1.8)}</span>`;
const bbMaxTx=()=>BBR.maxM%12?`${BBR.maxM} meses`:`${BBR.maxM/12} ano${BBR.maxM>12?'s':''}`;

function bbPage(){
 const q=norm(S.bbq),c=k=>BBP.filter(p=>p.st===k).length,cert=BBP.filter(p=>p.st==='realizada'&&!p.certOk).length;
 const l=BBP.filter(p=>(S.bbf==='todos'||p.st===S.bbf)&&(!S.bbd||p.d===S.bbd)&&(!q||norm(p.bebe+' '+p.pais.join(' ')).includes(q))).sort((a,b)=>(bbEv(a).d<bbEv(b).d?-1:1));
 const fut=BBD.filter(d=>{const e=eById(d.ev);return e&&!past(e);}).sort((a,b)=>eById(a.ev).d<eById(b.ev).d?-1:1);
 return `<header class="ph rise"><div><p class="eb">Agenda e serviço</p><h1>Apresentações</h1><p class="lede">Bebês apresentados ao Senhor no culto, com a igreja reunida · <em class="bb-ref">Lucas 2:22</em></p></div>
  <div class="pact"><button class="btn sec" data-a="bbRules">${ic('sliders',15)}Regras</button><button class="btn pri" data-a="bbOpenDate">${ic('plus',15,2.2)}Abrir data</button></div></header>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Aguardando confirmação</span><span class="kv" style="color:var(--st-sol)">${c('aguardando')}</span><span class="kd">pedidos de famílias</span></div>
  <div class="k4"><span class="kl">Confirmados</span><span class="kv" style="color:var(--st-int)">${c('confirmado')}</span><span class="kd">nas próximas datas</span></div>
  <div class="k4"><span class="kl">Certificados a emitir</span><span class="kv" style="color:${cert?'var(--brand-text)':'inherit'}">${cert}</span><span class="kd">de apresentações feitas</span></div>
  <div class="k4"><span class="kl">Apresentados em 2026</span><span class="kv">${c('realizada')+14}</span><span class="kd">bebês ao Senhor</span></div>
 </section>
 <section class="rise" style="--d:2"><div class="sh" style="margin:6px 0 12px"><h2 style="font:600 17px/22px var(--font-display);margin:0">Próximas datas</h2><span class="who">Até ${bbMaxTx()} · ${BBR.vagas} vagas por culto</span></div>
  <div class="bb-dates">${fut.map(d=>{const e=eById(d.ev),u=bbUsed(d),ps=BBP.filter(p=>p.d===d.id&&p.st!=='recusado'),full=u>=d.vagas;return `<button class="card bb-dc ${S.bbd===d.id?'on':''} ${full?'full':''}" data-a="bbDate" data-v="${d.id}">
    <div class="bb-dh">${dTile(e)}<div class="dkt"><b>${esc(e.t)}</b><span>${wd(e.d)}, ${dBR(e.d)} · ${e.time}</span></div>${full?'<span class="bb-full">Esgotada</span>':''}</div>
    <div class="bb-seats">${Array.from({length:d.vagas},(_,i)=>{const p=ps[i];return `<i class="${p?p.st:''}" title="${p?esc(p.bebe):'Vaga livre'}">${p?ic('pacifier',12,2):''}</i>`;}).join('')}</div>
    <div class="bb-df"><span><b>${u}</b> de ${d.vagas} vagas</span><span>${ps.filter(p=>p.st==='aguardando').length?`${ps.filter(p=>p.st==='aguardando').length} aguardando`:'tudo confirmado'}</span></div></button>`;}).join('')}
   <button class="bb-dc add" data-a="bbOpenDate"><span>${ic('plus',18,2.2)}</span><b>Abrir data</b><small>Escolha um culto e as vagas</small></button></div></section>
 <section class="card mtab rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="bbq" placeholder="Buscar bebê ou responsável" value="${esc(S.bbq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos',BBP.length],['aguardando','Aguardando',c('aguardando')],['confirmado','Confirmados',c('confirmado')],['realizada','Realizadas',c('realizada')],['recusado','Recusados',c('recusado')]].map(x=>`<button class="chipf ${S.bbf===x[0]?'on':''}" data-a="bbF" data-v="${x[0]}">${x[0]!=='todos'?`<i style="background:${BBST[x[0]][1]}"></i>`:''}${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>
  ${S.bbd?`<div class="bb-filt">${ic('calendar',13,2)}Mostrando ${esc(eById(bbD(S.bbd).ev).t)}, ${dBR(eById(bbD(S.bbd).ev).d)}<button class="lnk" data-a="bbDate" data-v="${S.bbd}">Ver todas as datas</button></div>`:''}
  ${l.length?`<div class="trow bb thead"><span>Bebê</span><span>Responsáveis</span><span>Culto</span><span>Status</span><span></span></div>${l.map(p=>{const e=bbEv(p),m=bbM(p.nasc,e.d),ov=m>BBR.maxM;return `<div class="trow bb" tabindex="0" data-a="bbOpen" data-v="${p.id}">
   <span class="tn">${bbAv(p.bebe)}<span class="hn"><b>${esc(p.bebe)}</b><span class="${ov&&p.st!=='realizada'?'bb-ov':''}">${bbAge(m)} na data${ov&&p.st!=='realizada'?` · acima de ${bbMaxTx()}`:''}</span></span></span>
   <span class="bb-pa">${p.pais.map(n=>esc(n)).join(' e ')}</span>
   <span class="bb-cu">${dBR(e.d)} · ${e.time}<small>${esc(e.t)}</small></span>
   <span class="ts">${bbPill(p.st)}${p.st==='realizada'?`<span class="bb-cs ${p.certOk?'ok':''}">${ic(p.certOk?'check':'award',11,2.4)}${p.certOk?'Certificado enviado':'Emitir certificado'}</span>`:''}</span>
   <span class="bb-ac">${p.st==='aguardando'?`<button class="btn pri sm" data-a="bbOk" data-v="${p.id}">Confirmar</button>`:p.st==='realizada'?`<button class="btn sec sm" data-a="bbCert" data-v="${p.id}">${ic('award',13)}Certificado</button>`:p.st==='confirmado'&&!past(e)?'':p.st==='confirmado'?`<button class="btn sec sm" data-a="bbDone" data-v="${p.id}">Marcar realizada</button>`:''}${ic('chevR',16)}</span></div>`;}).join('')}`
  :`<div class="mempty"><p>Nenhum pedido.</p><span>${q||S.bbf!=='todos'||S.bbd?'Nada corresponde a esse filtro.':'Quando uma família pedir pelo app, aparece aqui.'}</span></div>`}
  <div class="tfoot"><span>${l.length} pedido${l.length===1?'':'s'}</span><span class="who">Pedidos chegam pelo app (Mais › Apresentações)</span></div></section>`;
}
function bbAfter(){const q=$('#bbq');if(q)q.addEventListener('input',e=>{S.bbq=e.target.value;const p=e.target.selectionStart;render();const n=$('#bbq');n.focus();n.setSelectionRange(p,p);});}
const bbRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};

function bbCertHTML(p){const e=bbEv(p);return `<div class="bb-cert"><div class="bb-cert-in">
 <div class="bb-c-top">${logo(18,false)}<span>${esc(CHURCHES[S.church].n)}</span></div>
 <p class="bb-c-eb">Certificado de</p><h2 class="bb-c-t">Apresentação ao Senhor</h2>
 <p class="bb-c-tx">Certificamos que</p><p class="bb-c-name">${esc(p.cert)}</p>
 <p class="bb-c-tx">nascido(a) em ${dBR(p.nasc)}, filho(a) de ${p.pais.map(esc).join(' e ')}, foi apresentado(a) ao Senhor diante da igreja reunida no ${esc(e.t)} de ${dBR(e.d)}.</p>
 <blockquote>“Levaram-no a Jerusalém, para o apresentarem ao Senhor.”<cite>Lucas 2:22</cite></blockquote>
 <div class="bb-c-sig"><span><i></i>Pr. Rafael Pereira<small>Pastor presidente</small></span><span><i></i>${esc(CHURCHES[S.church].n)}<small>${dBR(e.d)}</small></span></div>
 </div></div>`;}

const BBA={
 bbF:v=>{S.bbf=v;render();},
 bbDate:v=>{S.bbd=S.bbd===v?null:v;bbRe();},
 bbOpen:(v,b,ev)=>{if(ev&&ev.target.closest('[data-a=bbOk],[data-a=bbCert],[data-a=bbDone]'))return;const p=BBP.find(x=>x.id===v),e=bbEv(p),m=bbM(p.nasc,e.d),ov=m>BBR.maxM&&p.st!=='realizada';
  openDlg(`${dlgHead('Pedido de apresentação',`Recebido em ${dBR(p.at)}`)}
   <div class="bb-head">${bbAv(p.bebe)}<div class="dkt"><b>${esc(p.bebe)}</b><span>Nasceu em ${dBR(p.nasc)} · ${bbAge(m)} na data</span></div>${bbPill(p.st)}</div>
   ${ov?`<p class="lm-w bad" style="margin:12px 0 0">${ic('alert',14,2.2)}<span><b>Acima da idade da regra (${bbMaxTx()})</b><br>Converse com a família antes de confirmar. Você pode confirmar mesmo assim.</span></p>`:''}
   <dl class="bb-dl"><div><dt>Culto</dt><dd>${esc(e.t)} · ${wd(e.d)}, ${dBR(e.d)} · ${e.time}</dd></div><div><dt>Responsáveis</dt><dd>${p.pais.map(n=>`${esc(n)} <span class="bb-mb">${ic('check',10,3)}membro</span>`).join('<br>')}</dd></div>${p.why?`<div><dt>Motivo da recusa</dt><dd>${esc(p.why)}</dd></div>`:''}</dl>
   <label class="fld"><span class="fl">Nome no certificado</span><input id="bbCn" value="${esc(p.cert)}" ${p.certOk?'disabled':''} autocomplete="off"><span class="hint">${p.certOk?'Certificado já enviado à família.':'Confira com a família: é assim que sai no certificado.'}</span><span class="err"></span></label>
   <div class="dfoot bb-ft">${p.st==='aguardando'?`<button class="btn sec" data-a="bbNo" data-v="${p.id}">Recusar</button><button class="btn pri" data-a="bbOk" data-v="${p.id}">${ov?'Confirmar mesmo assim':'Confirmar'}</button>`:p.st==='confirmado'?`<button class="btn sec" data-a="bbCancel" data-v="${p.id}">Cancelar apresentação</button>${past(e)||e.d===CKDAY?`<button class="btn pri" data-a="bbDone" data-v="${p.id}">Marcar realizada</button>`:`<button class="btn pri" data-a="bbSaveName" data-v="${p.id}">Salvar</button>`}`:p.st==='realizada'?`<button class="btn sec" data-a="bbSaveName" data-v="${p.id}" ${p.certOk?'disabled':''}>Salvar nome</button><button class="btn pri" data-a="bbCert" data-v="${p.id}">${ic('award',14)}Ver certificado</button>`:`<button class="btn sec" data-a="closeDlg">Fechar</button>`}</div>`,'sm');},
 bbSaveName:(v,bt)=>{const p=BBP.find(x=>x.id===v),n=$('#bbCn').value.trim();if(!n){const f=$('#bbCn').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent='Informe o nome';return;}busy(bt,500,'Salvo',()=>{p.cert=n;setTimeout(()=>{closeDlg();bbRe();toast('Nome do certificado salvo');},300);});},
 bbOk:(v,bt)=>{const p=BBP.find(x=>x.id===v),d=bbD(p.d),cn=$('#bbCn');if(cn&&cn.value.trim())p.cert=cn.value.trim();
  const conf=BBP.filter(x=>x.d===d.id&&(x.st==='confirmado'||x.st==='realizada')).length;if(conf>=d.vagas){toast(`Não há vagas confirmadas livres em ${dBR(eById(d.ev).d)}. Aumente as vagas ou recuse.`);return;}
  busy(bt,600,'Confirmado',()=>{p.st='confirmado';LOG.unshift({u:'Rafael Pereira',a:'Confirmou',e:'Apresentação de bebê',x:p.bebe,det:dBR(eById(d.ev).d),d:'2026-09-30',t:new Date().toTimeString().slice(0,5)});setTimeout(()=>{closeDlg();bbRe();toast(`Apresentação de ${p.bebe.split(' ')[0]} confirmada. A família recebe o aviso no app.`,()=>{p.st='aguardando';bbRe();});},300);});},
 bbNo:v=>{const p=BBP.find(x=>x.id===v),others=BBD.filter(d=>d.id!==p.d&&d.st==='aberta'&&bbUsed(d)<d.vagas);
  openDlg(`${dlgHead(`Recusar o pedido de ${esc(p.bebe.split(' ')[0])}?`,'A família recebe o motivo no app.')}<div class="ckwhy" id="bbW">${['Data cheia','Acima da idade','Responsáveis não são membros','Outro'].map(w=>`<button type="button" class="chipf" data-w="${w}">${w}</button>`).join('')}</div>
   <label class="fld" style="margin-top:10px"><span class="fl">Mensagem para a família</span><textarea class="ta" id="bbWm" rows="3" maxlength="200" placeholder="Ex.: que tal no culto do dia 11?"></textarea><span class="err"></span></label>
   ${others.length?`<p class="hint" style="margin:8px 0 0">${ic('info',12,2)} Datas com vaga: ${others.map(d=>dBR(eById(d.ev).d)).join(', ')}. A família pode pedir de novo pelo app.</p>`:''}
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" data-a="bbDoNo" data-v="${v}">Recusar pedido</button></div>`,'sm');
  $('#bbW').addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(!t)return;$$('#bbW .chipf').forEach(z=>z.classList.toggle('on',z===t));$('#bbWm').closest('.fld').classList.remove('bad');});},
 bbDoNo:(v,bt)=>{const w=$('#bbW .chipf.on'),m=$('#bbWm').value.trim();if(!w){const f=$('#bbWm').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent='Escolha um motivo';return;}if(w.dataset.w==='Outro'&&!m){const f=$('#bbWm').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent='Explique o motivo para a família';return;}
  const p=BBP.find(x=>x.id===v);bt.classList.add('busy');setTimeout(()=>{p.st='recusado';p.why=w.dataset.w+(m?' · '+m:'');closeDlg();bbRe();toast(`Pedido de ${p.bebe.split(' ')[0]} recusado. A família foi avisada.`,()=>{p.st='aguardando';p.why='';bbRe();});},500);},
 bbCancel:v=>{const p=BBP.find(x=>x.id===v);confirmDel({title:`Cancelar a apresentação de ${p.bebe.split(' ')[0]}?`,body:`A família é avisada no app e a vaga de ${dBR(bbEv(p).d)} volta a ficar livre.`,label:'Cancelar apresentação',onConfirm:()=>{p.st='recusado';p.why='Cancelada pela secretaria';bbRe();toast('Apresentação cancelada',()=>{p.st='confirmado';p.why='';bbRe();});}});},
 bbDone:(v,bt)=>{const p=BBP.find(x=>x.id===v);busy(bt,600,'Realizada',()=>{p.st='realizada';setTimeout(()=>{closeDlg();bbRe();toast(`Apresentação de ${p.bebe.split(' ')[0]} registrada. Emita o certificado.`);},300);});},
 bbCert:v=>{const p=BBP.find(x=>x.id===v);openDlg(`${dlgHead('Certificado de apresentação',`${esc(p.bebe)} · confira antes de enviar`)}${bbCertHTML(p)}
  <div class="dfoot"><button class="btn sec" data-a="bbPdf" data-v="${p.id}">${ic('arrowDn',14,2)}Baixar PDF</button><button class="btn pri" data-a="bbSend" data-v="${p.id}">${ic('mail',14)}${p.certOk?'Reenviar à família':'Enviar à família'}</button></div>`,'lg bb-cdlg');},
 bbPdf:v=>{const p=BBP.find(x=>x.id===v);toast(`Baixando Certificado-${p.bebe.split(' ')[0]}.pdf`);},
 bbSend:(v,bt)=>{const p=BBP.find(x=>x.id===v);busy(bt,800,'Enviado',()=>{const was=p.certOk;p.certOk=true;setTimeout(()=>{closeDlg();bbRe();toast(`${was?'Certificado reenviado':'Certificado enviado'} para ${p.pais.map(n=>n.split(' ')[0]).join(' e ')}: no app e por e-mail.`);},300);});},
 bbOpenDate:()=>{const used=new Set(BBD.map(d=>d.ev)),opts=EVTS.filter(e=>e.kind==='culto'&&e.st==='confirmado'&&!past(e)&&!used.has(e.id)).sort((a,b)=>a.d<b.d?-1:1);let v=BBR.vagas;
  openDlg(`${dlgHead('Abrir data de apresentação','Escolha o culto. As famílias passam a ver a data no app.')}<div class="pick" id="bbOp">${opts.length?opts.map((e,i)=>`<label class="pk">${dTile(e)}<span><b>${esc(e.t)}</b><small>${wd(e.d)}, ${dBR(e.d)} · ${e.time} · ${esc(e.place)}</small></span><input type="radio" name="bbe" value="${e.id}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Todos os cultos futuros já têm apresentação. Cadastre novos cultos em Cultos.</p>'}</div>
   <div class="fld" style="margin-top:12px"><span class="fl">Vagas neste culto</span><div class="lm2-step" style="align-self:flex-start"><button type="button" id="bbVm" aria-label="Menos">${ic('minus',16,2.4)}</button><output><b id="bbVv">${v}</b></output><button type="button" id="bbVp" aria-label="Mais">${ic('plus',16,2.4)}</button></div><span class="hint">Pedidos fecham ${BBR.prazo} dias antes do culto.</span></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="bbDoDate" ${opts.length?'':'disabled'}>Abrir data</button></div>`,'sm');
  const pt=()=>{$('#bbVv').textContent=v;$('#bbVm').disabled=v<=1;$('#bbVp').disabled=v>=20;};pt();$('#bbVm').onclick=()=>{v--;pt();};$('#bbVp').onclick=()=>{v++;pt();};},
 bbDoDate:(v,bt)=>{const s=$('input[name=bbe]:checked');if(!s)return;const n=+$('#bbVv').textContent;busy(bt,600,'Aberta',()=>{BBD.push({id:'bd'+Date.now(),ev:s.value,vagas:n,st:'aberta'});setTimeout(()=>{closeDlg();bbRe();toast(`${dBR(eById(s.value).d)} aberta com ${n} vagas. As famílias já veem no app.`);},300);});},
 bbRules:()=>{let m=BBR.maxM,vg=BBR.vagas,pz=BBR.prazo;const row=(id,lab,val,sub)=>`<div class="bb-rr"><div class="dkt"><b>${lab}</b><span>${sub}</span></div><div class="lm2-step"><button type="button" data-s="${id}|-1">${ic('minus',15,2.4)}</button><output><b id="bbR${id}">${val}</b></output><button type="button" data-s="${id}|1">${ic('plus',15,2.4)}</button></div></div>`;
  openDlg(`${dlgHead('Regras da apresentação','Valem para os pedidos feitos pelo app.')}<div class="bb-rules">${row('m','Idade máxima',m,'em meses, no dia do culto')}${row('v','Vagas por culto',vg,'padrão ao abrir uma data')}${row('p','Prazo para pedir',pz,'dias antes do culto')}
   <div class="bb-rr fixed"><div class="dkt"><b>Responsável membro</b><span>Pelo menos um dos responsáveis precisa ser membro ativo</span></div><span class="bb-lock">${ic('lock',13,2)}Sempre</span></div>
   <div class="bb-rr fixed"><div class="dkt"><b>Certificado</b><span>Emitido depois da apresentação e enviado no app e por e-mail</span></div><span class="bb-lock">${ic('award',13,2)}Sempre</span></div></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="bbSaveRules">Salvar</button></div>`,'sm');
  const lim={m:[1,48],v:[1,20],p:[0,30]},val={m,v:vg,p:pz};$('.bb-rules').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;const [k,d]=b.dataset.s.split('|');val[k]=Math.max(lim[k][0],Math.min(lim[k][1],val[k]+ +d));$('#bbR'+k).textContent=val[k];});window._bbR=val;},
 bbSaveRules:(v,bt)=>{const r=window._bbR;busy(bt,500,'Salvo',()=>{Object.assign(BBR,{maxM:r.m,vagas:r.v,prazo:r.p});setTimeout(()=>{closeDlg();bbRe();toast(`Regras salvas: até ${bbMaxTx()}, ${BBR.vagas} vagas, pedidos até ${BBR.prazo} dias antes`);},300);});},
};

/* ================= Espaços › Reservas e Salas ================= */
Object.assign(I,{
 tv:'<rect width="20" height="15" x="2" y="3" rx="2"/><path d="M7 21h10"/>',
 mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
 snow:'<path d="M12 2v20"/><path d="m4.9 4.9 14.2 14.2"/><path d="M2 12h20"/><path d="m4.9 19.1 14.2-14.2"/>',
 chair:'<path d="M7 18v3"/><path d="M17 18v3"/><path d="M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6"/><path d="M4 11h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/>',
 piano:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 4v10"/><path d="M10 4v10"/><path d="M14 4v10"/><path d="M18 4v10"/><path d="M2 14h20"/>',
 wifi:'<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M12 20h.01"/>',
});
const RECS=[['som','Som','mic'],['proj','Projetor','monitor'],['tv','TV','tv'],['ar','Ar-condicionado','snow'],['cad','Cadeiras extras','chair'],['inst','Instrumentos','piano'],['wifi','Wi-Fi','wifi']];
const ESPS=[
 {id:'s1',n:'Auditório Principal',cap:300,loc:'Térreo',desc:'',act:true,rec:['som','proj','ar','wifi'],tone:'ceu',icon:'church',fixed:[[0,'09:00','12:30','Culto da manhã'],[0,'18:00','20:30','Culto da noite'],[3,'19:30','21:30','Culto de quarta']]},
 {id:'s2',n:'Sala de Reuniões A',cap:12,loc:'1º andar',desc:'',act:true,rec:['tv','ar','wifi'],tone:'menta',icon:'users',fixed:[]},
 {id:'s3',n:'Sala de Reuniões B',cap:8,loc:'1º andar',desc:'Ideal para aconselhamento.',act:true,rec:['ar'],tone:'salvia',icon:'message',fixed:[]},
 {id:'s4',n:'Sala Kids',cap:25,loc:'Anexo',desc:'Já usada pelo Zelo Kids nos cultos — fora do horário de culto fica livre pra reserva.',act:true,rec:['tv','ar'],tone:'damasco',icon:'baby',fixed:[[0,'09:00','12:30','Zelo Kids'],[0,'18:00','20:30','Zelo Kids']]},
 {id:'s5',n:'Espaço Multiuso',cap:60,loc:'2º andar',desc:'',act:true,rec:['som','cad','inst'],tone:'rosado',icon:'layers',fixed:[]},
 {id:'s6',n:'Sala de Oração',cap:15,loc:'Térreo',desc:'Em reforma até novembro.',act:false,rec:[],tone:'lima',icon:'hands',fixed:[]},
];
let _rvid=0;
const RV=(s,d,f,t,p,who,why,st='confirmada',reason='')=>({id:'rv'+(++_rvid),s,d,f,t,p,who,why,st,reason});
const RESERVAS=[
 RV('s3','2026-09-20','09:00','10:00',5,'Ana Clara Lima','Aconselhamento pastoral','cancelada','Remarcado pelo solicitante'),
 RV('s2','2026-09-24','19:00','21:00',8,'Lucas Teixeira','Reunião de liderança do Ministério de Jovens'),
 RV('s5','2026-09-26','14:00','17:00',40,'Helena Duarte','Ensaio do coral'),
 RV('s5','2026-10-01','14:00','17:00',40,'Helena Duarte','Ensaio do coral'),
 RV('s2','2026-10-01','19:00','21:00',10,'Lucas Teixeira','Reunião de liderança do Ministério de Jovens'),
 RV('s3','2026-10-02','10:00','11:00',3,'Otávio Lins','Aconselhamento pastoral'),
 RV('s1','2026-10-03','08:00','12:00',120,'Thiago Barros','Ensaio geral — Conferência Missões'),
 RV('s4','2026-10-03','15:00','17:00',18,'Daniela Rocha','Treinamento de monitores Kids'),
 RV('s1','2026-10-04','14:00','16:00',80,'Clara Nunes','Ensaio de casamento','cancelada','Data mudou'),
 RV('s5','2026-10-05','19:30','21:30',35,'Marina Costa','Curso de casais'),
 RV('s2','2026-10-06','08:00','09:00',6,'Carlos Eduardo Silva','Reunião de pastores'),
 RV('s3','2026-10-07','16:00','17:30',4,'Otávio Lins','Aconselhamento pastoral'),
];
const NOWD='2026-10-01',NOWM=15*60+20,H0=7,H1=23;
Object.assign(S,{rvDay:NOWD,rvWk:NOWD,rvq:'',rvf:'prox',rvSala:null,slq:''});
const slById=id=>ESPS.find(s=>s.id===id);
const mm=t=>{const [h,m]=t.split(':').map(Number);return h*60+m;};
const hm=t=>{const [h,m]=t.split(':');return `${+h}h${m!=='00'?m:''}`;};
const tt=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
const addD=(iso,n)=>{const d=new Date(iso+'T12:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
const dow=iso=>new Date(iso+'T12:00').getDay();
const avN=n=>`<span class="av" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`;
const rvPast=r=>r.d<NOWD||(r.d===NOWD&&mm(r.t)<NOWM);
/* everything occupying a room on a date: reservations + fixed uses */
function busyOn(sid,d,skip){const s=slById(sid);
 return [...RESERVAS.filter(r=>r.s===sid&&r.d===d&&r.st==='confirmada'&&r.id!==skip).map(r=>({f:mm(r.f),t:mm(r.t),l:r.why,r})),...s.fixed.filter(x=>x[0]===dow(d)).map(x=>({f:mm(x[1]),t:mm(x[2]),l:x[3],fix:1}))].sort((a,b)=>a.f-b.f);}
function conflict(sid,d,f,t,skip){return busyOn(sid,d,skip).find(b=>f<b.t&&t>b.f);}
function nextFree(sid,d,f,t,skip){const dur=t-f;let s=f;for(let i=0;i<60;i++){const c=busyOn(sid,d,skip).find(b=>s<b.t&&s+dur>b.f);if(!c)return s+dur<=H1*60?s:null;s=c.t;}return null;}
const hrs=(sid,d)=>busyOn(sid,d).reduce((a,b)=>a+(b.t-b.f),0)/60;
const occ=(sid,d)=>busyOn(sid,d).reduce((a,b)=>a+(b.t-b.f),0)/((H1-H0)*60);

/* ---------- Reservas ---------- */
function rvPage(){
 const act=ESPS.filter(s=>s.act),days=[...Array(7)].map((_,i)=>addD(S.rvWk,i)),dayR=RESERVAS.filter(r=>r.d===S.rvDay&&r.st==='confirmada');
 const pct=Math.round(act.reduce((a,s)=>a+occ(s.id,S.rvDay),0)/act.length*100);
 const span=(H1-H0)*60,pos=(f,t)=>`left:${(f-H0*60)/span*100}%;width:${(t-f)/span*100}%`;
 return `<header class="ph rise"><div><p class="eb">Espaços</p><h1>Reservas</h1><p class="lede">Quem usa cada sala, e quando</p></div><div class="pact"><button class="btn pri" data-a="rvNew">${ic('plus',15,2.2)}Nova reserva</button></div></header>
 <section class="card sp-map rise" style="--d:1">
  <div class="sp-mh"><div class="sp-wk"><button class="ibtn sm" data-a="rvWk" data-v="-7" aria-label="Semana anterior">${ic('chevL',14,2)}</button>
   <div class="sp-days">${days.map(d=>{const n=RESERVAS.filter(r=>r.d===d&&r.st==='confirmada').length;return `<button class="sp-day ${d===S.rvDay?'on':''} ${d===NOWD?'today':''}" data-a="rvDay" data-v="${d}"><small>${d===NOWD?'hoje':wd(d)}</small><b>${+d.slice(8)}</b><i>${[...Array(Math.min(n,3))].map(()=>'<em></em>').join('')}</i></button>`;}).join('')}</div>
   <button class="ibtn sm" data-a="rvWk" data-v="7" aria-label="Próxima semana">${ic('chevR',14,2)}</button></div>
   <div class="sp-stat"><div><b>${dayR.length}</b><span>reserva${dayR.length===1?'':'s'}</span></div><div><b>${dayR.reduce((a,r)=>a+r.p,0)}</b><span>pessoas esperadas</span></div><div><b>${pct}<small>%</small></b><span>de ocupação</span></div></div></div>
  <div class="sp-tlw"><div class="sp-tl">
   <div class="sp-hrs"><span></span><div>${[...Array(H1-H0)].map((_,i)=>`<span>${H0+i}h</span>`).join('')}</div></div>
   ${act.map(s=>`<div class="sp-row"><div class="sp-rn"><b>${esc(s.n)}</b><span>${s.cap} lugares</span></div><div class="sp-trk" data-sala="${s.id}" title="Clique num horário livre para reservar">
    ${busyOn(s.id,S.rvDay).map(b=>b.fix?`<span class="sp-blk fix" style="${pos(b.f,b.t)}" title="${esc(b.l)} · uso fixo"><b>${esc(b.l)}</b><small>${hm(tt(b.f))}–${hm(tt(b.t))}</small></span>`:`<button class="sp-blk ${rvPast(b.r)?'past':''}" style="${pos(b.f,b.t)}" data-a="rvView" data-v="${b.r.id}" title="${esc(b.l)}"><b>${esc(b.l)}</b><small>${hm(b.r.f)}–${hm(b.r.t)} · ${b.r.p} pessoas</small></button>`).join('')}
   </div></div>`).join('')}
   ${S.rvDay===NOWD&&NOWM>H0*60&&NOWM<H1*60?`<span class="sp-now" style="--x:${(NOWM-H0*60)/span}"><i>${tt(NOWM).replace(':','h')}</i></span>`:''}
  </div></div>
  <div class="sp-leg"><span><i class="r"></i>Reserva</span><span><i class="f"></i>Uso fixo (cultos e Kids)</span><span class="soft">Toque num horário livre para reservar</span></div>
 </section>
 ${rvList()}`;
}
function rvList(){
 const q=norm(S.rvq),cnt=f=>RESERVAS.filter(r=>rvF(r,f)).length;
 const l=RESERVAS.filter(r=>rvF(r,S.rvf)&&(!S.rvSala||r.s===S.rvSala)&&(!q||norm(r.who+' '+r.why+' '+slById(r.s).n).includes(q))).sort((a,b)=>(a.d+a.f<b.d+b.f?-1:1)*(S.rvf==='pass'||S.rvf==='canc'?-1:1));
 return `<section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="rvq" placeholder="Buscar sala, pessoa ou finalidade" value="${esc(S.rvq)}" autocomplete="off"></label>
  <div class="chips">${[['prox','Próximas'],['pass','Passadas'],['canc','Canceladas'],['todas','Todas']].map(c=>`<button class="chipf ${S.rvf===c[0]?'on':''}" data-a="rvF" data-v="${c[0]}">${c[1]}<small>${cnt(c[0])}</small></button>`).join('')}
  ${S.rvSala?`<button class="chipf on sp-flt" data-a="rvSalaClr">${esc(slById(S.rvSala).n)}${ic('x',12,2.4)}</button>`:''}</div></div>
  ${l.length?`<div class="trow rsv thead"><span>Quando</span><span>Sala</span><span>Pessoas</span><span>Solicitante</span><span>Status</span></div>${l.map(r=>{const s=slById(r.s),pc=Math.min(100,r.p/s.cap*100);return `<div class="trow rsv ${r.st==='cancelada'||rvPast(r)?'off':''}" tabindex="0" data-a="rvView" data-v="${r.id}">
   <span class="tn">${dTile({d:r.d})}<span class="hn"><b>${hm(r.f)} – ${hm(r.t)}</b><span>${esc(r.why||'Sem finalidade')}</span></span></span>
   <span class="rvs"><b>${esc(s.n)}</b><span>${esc(s.loc)}</span></span>
   <span class="rvp"><span class="tr"><i style="width:${pc}%"></i></span><span><b>${r.p}</b>/${s.cap}</span></span>
   <span class="rvw">${avN(r.who)}<span>${esc(r.who)}</span></span>
   <span class="ts">${r.st==='cancelada'?`<span class="rvc"><span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Cancelada</span>${r.reason?`<small>${esc(r.reason)}</small>`:''}</span>`:rvPast(r)?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizada</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmada</span>'}</span></div>`;}).join('')}`
  :`<div class="mempty"><p>Nenhuma reserva aqui.</p><span>${S.rvf==='prox'?'Quando alguém reservar uma sala, ela aparece nesta lista.':'Nada corresponde a esse filtro.'}</span></div>`}
  <div class="tfoot"><span>${l.length} reserva${l.length===1?'':'s'}</span></div></section>`;
}
function rvF(r,f){return f==='todas'?true:f==='canc'?r.st==='cancelada':f==='pass'?r.st==='confirmada'&&rvPast(r):r.st==='confirmada'&&!rvPast(r);}

function rvDlg(rid){const r=RESERVAS.find(x=>x.id===rid),s=slById(r.s),pastR=rvPast(r);
 openDlg(`${dlgHead(esc(s.n),`${esc(s.loc)} · até ${s.cap} pessoas`)}
  <div class="rvd-when">${dTile({d:r.d})}<div><b>${hm(r.f)} – ${hm(r.t)}</b><span>${wd(r.d)}, ${fmtDate(r.d)}</span></div>${r.st==='cancelada'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Cancelada</span>':pastR?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizada</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmada</span>'}</div>
  <dl class="rvd-kv"><div><dt>Finalidade</dt><dd>${esc(r.why||'—')}</dd></div><div><dt>Solicitante</dt><dd class="rvw">${avN(r.who)}${esc(r.who)}</dd></div>
   <div><dt>Pessoas</dt><dd><span class="rvp"><span class="tr"><i style="width:${Math.min(100,r.p/s.cap*100)}%"></i></span><span><b>${r.p}</b> de ${s.cap}</span></span></dd></div>
   ${r.st==='cancelada'?`<div><dt>Motivo do cancelamento</dt><dd>${esc(r.reason||'Não informado')}</dd></div>`:''}</dl>
  <div class="dfoot" style="justify-content:space-between">${r.st==='confirmada'&&!pastR?`<button class="btn ghostd" data-a="rvCancel" data-v="${r.id}">Cancelar reserva</button><span class="row2"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="rvEdit" data-v="${r.id}">${ic('clock',15)}Remarcar</button></span>`:r.st==='cancelada'&&!pastR?`<span></span><span class="row2"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="rvRestore" data-v="${r.id}">Reativar reserva</button></span>`:'<span></span><button class="btn sec" data-a="closeDlg">Fechar</button>'}</div>`,'sm');}

function rvForm(o={}){
 const edit=o.id?RESERVAS.find(x=>x.id===o.id):null,d0=o.d||(S.rvDay<NOWD?NOWD:S.rvDay),s0=o.s||'s2';let f0=o.f,t0=o.t;if(!f0){const nf=nextFree(s0,d0,19*60,20*60);f0=tt(nf!=null?nf:19*60);t0=tt((nf!=null?nf:19*60)+60);}
 const v=edit?{...edit}:{s:s0,d:d0,f:f0,t:t0,p:'',who:'',why:''};
 openDlg(`${dlgHead(edit?'Remarcar reserva':'Nova reserva',edit?'Mude a sala, o dia ou o horário. Avisamos o solicitante.':'Escolha a sala e o horário. A disponibilidade aparece na hora.')}
  <form id="rvF" class="fgrid" novalidate>
   <div class="fld wide"><span class="fl">Sala</span><div class="sp-pick">${ESPS.filter(s=>s.act).map(s=>`<label><input type="radio" name="s" value="${s.id}" ${v.s===s.id?'checked':''}><span class="htile" style="--s:30px;background:var(--tone-${s.tone});color:var(--tone-${s.tone}-ink)">${ic(s.icon,15)}</span><span><b>${esc(s.n)}</b><small>${s.cap} lugares · ${esc(s.loc)}</small></span></label>`).join('')}</div></div>
   <label class="fld wide"><span class="fl">Data</span><input type="date" name="d" value="${v.d}" min="${NOWD}"></label>
   <label class="fld"><span class="fl">Início</span><input type="time" name="f" value="${v.f}" step="900"></label>
   <label class="fld"><span class="fl">Término</span><input type="time" name="t" value="${v.t}" step="900"></label>
   <div class="wide sp-av" id="rvAv"></div>
   <label class="fld"><span class="fl">Quantidade de pessoas</span><input type="number" name="p" min="1" inputmode="numeric" value="${v.p}" placeholder="0"><span class="sp-cap" id="rvCap"></span></label>
   <label class="fld"><span class="fl">Solicitante</span><span class="selw"><select name="who"><option value="">Escolha…</option>${MEMBERS.filter((m,i,a)=>a.findIndex(x=>x.n===m.n)===i).map(m=>`<option ${m.n===v.who?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld wide"><span class="fl">Finalidade <small>opcional</small></span><input name="why" value="${esc(v.why)}" placeholder="Ex.: Reunião de liderança" autocomplete="off"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="rvOk">${edit?'Salvar novo horário':'Confirmar reserva'}</button></div></form>`,'lg');
 const f=$('#rvF'),ok=$('#rvOk'),span=(H1-H0)*60;
 const chk=()=>{const sid=f.s.value,s=slById(sid),d=f.d.value,a=f.f.value?mm(f.f.value):0,b=f.t.value?mm(f.t.value):0,p=+f.p.value||0;
  let msg='',bad=false;const c=d&&a<b&&conflict(sid,d,a,b,edit&&edit.id);
  if(!d||!f.f.value||!f.t.value){msg=`<span class="soft">Escolha data e horário para ver a disponibilidade.</span>`;bad=true;}
  else if(a>=b){msg=`<span class="sp-bad">${ic('alert',14,2)}O término precisa ser depois do início.</span>`;bad=true;}
  else if(c){const nf=nextFree(sid,d,a,b,edit&&edit.id);msg=`<span class="sp-bad">${ic('alert',14,2)}Conflita com <b>${esc(c.l)}</b> (${hm(tt(c.f))}–${hm(tt(c.t))})</span>${nf!=null?`<button type="button" class="btn sec sm" id="rvSug" data-f="${tt(nf)}" data-t="${tt(nf+b-a)}">Usar ${hm(tt(nf))}–${hm(tt(nf+b-a))}</button>`:''}`;bad=true;}
  else msg=`<span class="sp-ok">${ic('check',14,2.4)}${esc(s.n)} está livre nesse horário</span>`;
  const av=$('#rvAv');if(!av.dataset.init){av.dataset.init=1;av.innerHTML=`<div class="sp-mini"><div class="sp-bars"></div><em id="rvSel" class="hide"><span></span></em></div><div class="sp-mt"><span>${H0}h</span><span>12h</span><span>18h</span><span>${H1}h</span></div><div class="sp-msg" id="rvMsg"></div>`;}
  const key=sid+'|'+d,bw=av.querySelector('.sp-bars');
  if(bw.dataset.k!==key){bw.dataset.k=key;bw.innerHTML=d?busyOn(sid,d,edit&&edit.id).map((x,i)=>`<i class="${x.fix?'f':''}" style="left:${(x.f-H0*60)/span*100}%;width:${(x.t-x.f)/span*100}%;--i:${i}" title="${esc(x.l)} · ${hm(tt(x.f))}–${hm(tt(x.t))}"></i>`).join(''):'';}
  const sel=$('#rvSel'),valid=d&&f.f.value&&f.t.value&&a<b;
  if(valid){const L=Math.max(0,(a-H0*60)/span*100),W=Math.max(1.2,(Math.min(b,H1*60)-Math.max(a,H0*60))/span*100);
   const wasHidden=sel.classList.contains('hide');if(wasHidden){sel.style.transition='none';sel.style.left=L+'%';sel.style.width=W+'%';sel.offsetWidth;sel.style.transition='';}
   sel.classList.remove('hide');sel.style.left=L+'%';sel.style.width=W+'%';sel.querySelector('span').textContent=`${hm(f.f.value)}–${hm(f.t.value)}`;
   sel.classList.toggle('lbl-r',L>70);
   const wasBad=sel.classList.contains('bad');sel.classList.toggle('bad',!!c);if(c&&!wasBad){sel.classList.remove('sx');sel.offsetWidth;sel.classList.add('sx');}
   if(!c&&wasBad){sel.classList.remove('sb');sel.offsetWidth;sel.classList.add('sb');}
   $$('.sp-bars i',av).forEach(i=>i.classList.toggle('hit',!!c&&i.title.startsWith(c.l)));}
  else sel.classList.add('hide');
  const mg=$('#rvMsg');if(mg.dataset.m!==msg){mg.dataset.m=msg;mg.innerHTML=msg;mg.classList.remove('in');mg.offsetWidth;mg.classList.add('in');}
  const sg=$('#rvSug');if(sg)sg.onclick=()=>{f.f.value=sg.dataset.f;f.t.value=sg.dataset.t;chk();};
  const cp=$('#rvCap');if(p>s.cap){cp.innerHTML=`<span class="tr bad"><i style="width:100%"></i></span><span class="sp-bad">Passa ${p-s.cap} da capacidade (${s.cap})</span>`;bad=true;}else cp.innerHTML=`<span class="tr"><i style="width:${p/s.cap*100}%"></i></span><span>${p?`${p} de ${s.cap} lugares`:`Capacidade: ${s.cap} lugares`}</span>`;
  if(!p||!f.who.value)bad=true;ok.disabled=bad;};
 f.addEventListener('input',chk);f.addEventListener('change',chk);chk();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o2={s:f.s.value,d:f.d.value,f:f.f.value,t:f.t.value,p:+f.p.value,who:f.who.value,why:f.why.value.trim()};
  if(edit){Object.assign(edit,o2);}else RESERVAS.push(RV(o2.s,o2.d,o2.f,o2.t,o2.p,o2.who,o2.why));
  S.rvDay=o2.d;if(o2.d<S.rvWk||o2.d>addD(S.rvWk,6))S.rvWk=o2.d;closeDlg();render();toast(edit?`Reserva remarcada · ${o2.who.split(' ')[0]} foi avisado(a)`:`Reserva confirmada · ${slById(o2.s).n}, ${hm(o2.f)}–${hm(o2.t)}`);},650);});
}

/* ---------- Salas ---------- */
function slPage(){
 const act=ESPS.filter(s=>s.act),off=ESPS.filter(s=>!s.act),wk=[...Array(7)].map((_,i)=>addD(NOWD,i));
 const wkN=s=>RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&wk.includes(r.d)).length,top=act.slice().sort((a,b)=>wkN(b)-wkN(a))[0];
 return `<header class="ph rise"><div><p class="eb">Espaços</p><h1>Salas</h1><p class="lede">Os espaços da igreja que podem ser reservados</p></div><div class="pact"><button class="btn pri" data-a="slNew">${ic('plus',15,2.2)}Adicionar sala</button></div></header>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Salas ativas</span><span class="kv">${act.length}</span><span class="kd">${off.length?`${off.length} desativada${off.length===1?'':'s'}`:'todas disponíveis'}</span></div>
  <div class="k4"><span class="kl">Capacidade total</span><span class="kv">${act.reduce((a,s)=>a+s.cap,0)}</span><span class="kd">lugares nas salas ativas</span></div>
  <div class="k4"><span class="kl">Reservas nos próximos 7 dias</span><span class="kv">${act.reduce((a,s)=>a+wkN(s),0)}</span><span class="kd">sem contar os cultos</span></div>
  <div class="k4"><span class="kl">Mais procurada</span><span class="kv sp-kvt">${esc(top.n)}</span><span class="kd">${wkN(top)} reservas na semana</span></div></section>
 <div class="sp-grid rise" style="--d:2">${act.map(s=>slCard(s,wk)).join('')}<button class="sp-add" data-a="slNew"><span>${ic('plus',20,2)}</span><b>Adicionar sala</b><small>Capacidade, local e recursos</small></button></div>
 ${off.length?`<section class="card sp-off rise" style="--d:3"><div class="sh"><h2>Desativadas</h2><span class="who">Não aparecem para reserva</span></div>${off.map(s=>`<div class="sp-or"><span class="htile" style="--s:34px;background:var(--surface-2);color:var(--ink-soft)">${ic(s.icon,16)}</span><span class="dkt"><b>${esc(s.n)}</b><span>${s.cap} lugares · ${esc(s.loc)}${s.desc?' · '+esc(s.desc):''}</span></span><button class="btn sec sm" data-a="slOn" data-v="${s.id}">Reativar</button></div>`).join('')}</section>`:''}`;
}
function slCard(s,wk){
 const nx=RESERVAS.filter(r=>r.s===s.id&&r.st==='confirmada'&&!rvPast(r)).sort((a,b)=>a.d+a.f<b.d+b.f?-1:1)[0];
 const fx=s.fixed.length?[...new Set(s.fixed.map(x=>x[3]))].join(', '):'';
 return `<article class="card sp-c"><header><span class="htile" style="--s:42px;background:var(--tone-${s.tone});color:var(--tone-${s.tone}-ink)">${ic(s.icon,20)}</span><div class="dkt"><b>${esc(s.n)}</b><span>${ic('pin',12)}${esc(s.loc)}</span></div>
  <div style="position:relative"><button class="ibtn sm" data-a="slMenu" data-v="${s.id}" aria-label="Ações">${ic('dots',16)}</button><div class="pop" id="slPop-${s.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="slEdit" data-v="${s.id}">${ic('sliders',16)}Editar sala</button><button class="pi" data-a="slRes" data-v="${s.id}">${ic('calendar',16)}Ver reservas</button><hr><button class="pi danger" data-a="slOff" data-v="${s.id}">${ic('x',16)}Desativar</button></div></div></header>
  <div class="sp-cap2"><b>${s.cap}</b><span>lugares</span></div>
  ${s.desc?`<p class="sp-desc">${esc(s.desc)}</p>`:''}
  ${s.rec.length?`<div class="sp-recs">${s.rec.map(k=>{const r=RECS.find(x=>x[0]===k);return `<span title="${r[1]}">${ic(r[2],13)}${r[1]}</span>`;}).join('')}</div>`:''}
  <div class="sp-wkb"><p class="fl">Próximos 7 dias <b>${(()=>{const h=wk.reduce((a,d)=>a+hrs(s.id,d),0);return h?(Math.round(h*10)/10).toString().replace('.',',')+'h em uso':'livre a semana toda';})()}</b></p><div>${wk.map(d=>{const h=hrs(s.id,d);return `<span title="${wd(d)} ${+d.slice(8)} · ${h?String(Math.round(h*10)/10).replace('.',',')+'h em uso':'livre'}"><i style="height:${h?Math.max(10,Math.min(1,h/6)*100):4}%" class="${h>=3?'hi':''} ${h?'':'z'}"></i><small>${wd(d)}</small></span>`;}).join('')}</div>${fx?`<span class="hint">${ic('lock',11)}Uso fixo: ${esc(fx)}</span>`:''}</div>
  <footer>${nx?`<span class="sp-nx"><small>Próxima</small>${wd(nx.d)} ${+nx.d.slice(8)} · ${hm(nx.f)} · ${esc(nx.why)}</span>`:'<span class="sp-nx"><small>Próxima</small>Nenhuma reserva</span>'}<button class="btn sec sm" data-a="slBook" data-v="${s.id}">Reservar</button></footer></article>`;
}
function slForm(id){
 const s=id?slById(id):null,v=s||{n:'',cap:'',loc:'',desc:'',rec:[]};
 openDlg(`${dlgHead(s?'Editar sala':'Adicionar sala',s?'':'A sala fica disponível para reserva assim que você salvar.')}
  <form id="slF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(v.n)}" placeholder="Ex.: Sala de Reuniões A" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Capacidade</span><span class="sp-unit"><input type="number" name="cap" min="1" inputmode="numeric" value="${v.cap}" placeholder="0"><em>pessoas</em></span></label>
   <label class="fld"><span class="fl">Localização <small>opcional</small></span><input name="loc" value="${esc(v.loc)}" placeholder="Ex.: 1º andar" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Recursos <small>opcional</small></span><div class="sp-rpick">${RECS.map(r=>`<label><input type="checkbox" name="rec" value="${r[0]}" ${v.rec.includes(r[0])?'checked':''}><span>${ic(r[2],14)}${r[1]}</span></label>`).join('')}</div></div>
   <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="2" placeholder="Regras de uso, observações…">${esc(v.desc)}</textarea></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="slOk">${s?'Salvar':'Adicionar sala'}</button></div></form>`);
 const f=$('#slF'),ok=$('#slOk'),chk=()=>{ok.disabled=!f.n.value.trim()||!(+f.cap.value>0);};f.addEventListener('input',chk);chk();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const n=f.n.value.trim();if(ESPS.some(x=>x!==s&&norm(x.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Já existe uma sala com esse nome';return;}
  ok.classList.add('busy');setTimeout(()=>{const o={n,cap:+f.cap.value,loc:f.loc.value.trim()||'—',desc:f.desc.value.trim(),rec:[...f.querySelectorAll('[name=rec]:checked')].map(x=>x.value)};
   if(s)Object.assign(s,o);else ESPS.push({id:'s'+Date.now(),act:true,tone:TONES[ESPS.length%6],icon:'building',fixed:[],...o});closeDlg();render();toast(s?'Sala atualizada':`${n} adicionada`);},600);});
}

function spAfter(){
 const q=$('#rvq');if(q)q.addEventListener('input',e=>{S.rvq=e.target.value;const p=e.target.selectionStart;const y=window.scrollY;render();window.scrollTo(0,y);const n=$('#rvq');n.focus();n.setSelectionRange(p,p);});
 $$('.sp-trk').forEach(t=>t.addEventListener('click',e=>{if(e.target.closest('.sp-blk'))return;const r=t.getBoundingClientRect(),m=H0*60+Math.floor((e.clientX-r.left)/r.width*(H1-H0)*2)*30,sid=t.dataset.sala;
  const c=conflict(sid,S.rvDay,m,m+60);if(c&&c.fix){toast(`${slById(sid).n}: ${c.l} nesse horário`);return;}rvForm({s:sid,d:S.rvDay<NOWD?NOWD:S.rvDay,f:tt(m),t:tt(Math.min(m+60,H1*60))});}));
 const now=$('.sp-now');if(now){const w=$('.sp-tlw');if(w&&w.scrollWidth>w.clientWidth)w.scrollLeft=Math.max(0,now.offsetLeft-w.clientWidth/2);}
}
const spRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const SPA={
 rvNew:()=>rvForm(),
 rvDay:v=>{S.rvDay=v;spRe();},
 rvWk:v=>{S.rvWk=addD(S.rvWk,+v);S.rvDay=S.rvWk;spRe();},
 rvF:v=>{S.rvf=v;spRe();},
 rvSalaClr:()=>{S.rvSala=null;spRe();},
 rvView:v=>rvDlg(v),
 rvEdit:v=>rvForm({id:v}),
 rvCancel:v=>{const r=RESERVAS.find(x=>x.id===v),s=slById(r.s);
  openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Cancelar esta reserva?',`${esc(s.n)} · ${wd(r.d)} ${+r.d.slice(8)}, ${hm(r.f)}–${hm(r.t)}. ${esc(r.who.split(' ')[0])} recebe um aviso.`)}</div>
   <div class="fld"><span class="fl">Motivo</span><div class="sp-why">${['Remarcado pelo solicitante','Sala indisponível','Evento cancelado','Outro'].map((m,i)=>`<label><input type="radio" name="cw" value="${m}" ${i?'':'checked'}><span>${m}</span></label>`).join('')}</div></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="cwOk">Cancelar reserva</button></div>`,'sm del');
  $('#cwOk').addEventListener('click',e=>{const why=$('[name=cw]:checked').value;e.target.classList.add('busy');setTimeout(()=>{r.st='cancelada';r.reason=why;closeDlg();spRe();toast('Reserva cancelada',()=>{r.st='confirmada';r.reason='';spRe();});},600);});},
 rvRestore:v=>{const r=RESERVAS.find(x=>x.id===v),c=conflict(r.s,r.d,mm(r.f),mm(r.t),r.id);if(c){toast(`Não dá: o horário agora está com ${c.l}`);return;}r.st='confirmada';r.reason='';closeDlg();spRe();toast('Reserva reativada');},
 slNew:()=>slForm(),
 slEdit:v=>{closePops();slForm(v);},
 slMenu:v=>{const p=$('#slPop-'+v);closePops(p);p.classList.toggle('open');},
 slRes:v=>{closePops();S.rvSala=v;S.rvf='prox';A.nav('reservas');S.rvSala=v;render();},
 slBook:v=>rvForm({s:v,d:NOWD}),
 slOff:v=>{closePops();const s=slById(v),fut=RESERVAS.filter(r=>r.s===v&&r.st==='confirmada'&&!rvPast(r));
  confirmDel({title:`Desativar ${s.n}?`,body:fut.length?`Ela sai da lista de reservas. ${fut.length} reserva${fut.length===1?' futura será cancelada':'s futuras serão canceladas'} e os solicitantes recebem aviso.`:'Ela sai da lista de reservas. Você pode reativar quando quiser.',label:'Desativar',typed:fut.length?s.n:null,
   onConfirm:()=>{s.act=false;fut.forEach(r=>{r.st='cancelada';r.reason='Sala desativada';});spRe();toast(`${s.n} desativada`,()=>{s.act=true;fut.forEach(r=>{r.st='confirmada';r.reason='';});spRe();});}});},
 slOn:v=>{const s=slById(v);s.act=true;spRe();toast(`${s.n} reativada`);},
};

/* ================= Comunicação › Notícias, Push, Banners, Transmissões ================= */
Object.assign(I,{
 image:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
 copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
 news:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>',
 tag:'<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5"/>',
 send:'<path d="M14.5 21.7a.5.5 0 0 0 .9 0L22 2.5a.5.5 0 0 0-.6-.6L2.3 8.6a.5.5 0 0 0 0 .9l8 3.2a2 2 0 0 1 1.1 1.1z"/><path d="m21.9 2.1-11 10.9"/>',
 video:'<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect width="14" height="12" x="2" y="6" rx="2"/>',
 arrowUp:'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
 arrowDn:'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
 grip:'<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>',
 zap:'<path d="M4 14a1 1 0 0 1-.8-1.6l9.9-10.2a.5.5 0 0 1 .9.4l-1.9 6a1 1 0 0 0 .9 1.4h7a1 1 0 0 1 .8 1.6l-9.9 10.2a.5.5 0 0 1-.9-.4l1.9-6a1 1 0 0 0-.9-1.4z"/>',
});
const CTONES=['ceu','menta','damasco','rosado','lima','salvia'];
const fmtWa=t=>esc(t).replace(/\*([^*\n]+)\*/g,'<b>$1</b>').replace(/_([^_\n]+)_/g,'<i>$1</i>').replace(/~([^~\n]+)~/g,'<s>$1</s>').replace(/\n/g,'<br>');
const relD=iso=>{const n=Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);return n===0?'hoje':n===1?'amanhã':n===-1?'ontem':n>0?`em ${n} dias`:`há ${-n} dias`;};
const dIn=iso=>Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);

/* ---------- Notícias ---------- */
const NCATS=[{id:'c1',n:'Eventos',tone:'ceu'},{id:'c2',n:'Culto',tone:'menta'},{id:'c3',n:'Pastoral',tone:'salvia'},{id:'c4',n:'Missões',tone:'damasco'}];
let _nid=0;const NW=(t,c,pub,exp,desc,url='')=>({id:'nw'+(++_nid),t,c,pub,exp,desc,url,cover:''});
const NEWS=[
 NW('Retiro de Jovens 2026 — Inscrições abertas!','c1','2026-09-01','2026-10-16','*Últimas vagas!* Três dias de imersão na Chácara Alva. Inscreva-se pelo app.','/eventos/calendario/ev5'),
 NW('Culto especial de Ação de Graças','c2','2026-09-20','2026-10-04','Domingo, às 10h e às 19h. Traga sua família e um _alimento não perecível_.'),
 NW('Novo grupo de oração nas quintas-feiras','c3','2026-09-28','2026-11-30','Toda quinta, 7h, na Sala de Oração. Aberto a todos.'),
 NW('Conferência Missões — programação completa','c4','2026-09-25','2026-10-09','Palestrantes, horários e oficinas. ~Vagas esgotadas para a oficina 2~ — abrimos nova turma!','/eventos/calendario/ev7'),
 NW('Campanha Missionária 2026','c4','2026-08-01','2026-09-15','Obrigado a todos que contribuíram. Arrecadamos 112% da meta!'),
];
Object.assign(S,{ntab:'news',ntf:'ativas',ntq:''});
const ncById=id=>NCATS.find(c=>c.id===id);
const ntSt=n=>n.exp&&n.exp<NOWD?'exp':'ativa';
const catChip=c=>c?`<span class="cm-cat" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)">${esc(c.n)}</span>`:'<span class="cm-cat none">Sem categoria</span>';
const cover=(n,cls='')=>{const c=ncById(n.c)||{tone:'salvia'};return `<span class="cm-cov ${cls}" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)">${n.cover?`<img src="${esc(n.cover)}" alt="">`:ic('news',cls?26:18)}</span>`;};

function ntPage(){
 const act=NEWS.filter(n=>ntSt(n)==='ativa'),soon=act.filter(n=>n.exp&&dIn(n.exp)<=7);
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Notícias</h1><p class="lede">Avisos e comunicados que aparecem no app</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="as notícias (CSV)">Exportar CSV</button><button class="btn pri" data-a="${S.ntab==='cats'?'ncNew':'ntNew'}">${ic('plus',15,2.2)}${S.ntab==='cats'?'Nova categoria':'Nova notícia'}</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">No ar</span><span class="kv" style="color:var(--st-int)">${act.length}</span><span class="kd">visíveis no app agora</span></div>
  <div class="k4"><span class="kl">Saem do ar em 7 dias</span><span class="kv" style="${soon.length?'color:var(--st-sol)':''}">${soon.length}</span><span class="kd">${soon.length?esc(soon.sort((a,b)=>a.exp<b.exp?-1:1)[0].t.split(' — ')[0])+' '+relD(soon[0].exp):'nenhuma'}</span></div>
  <div class="k4"><span class="kl">Expiradas</span><span class="kv">${NEWS.length-act.length}</span><span class="kd">guardadas no histórico</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><div class="segc" role="tablist"><button data-a="ntTab" data-v="news" aria-pressed="${S.ntab==='news'}">Notícias</button><button data-a="ntTab" data-v="cats" aria-pressed="${S.ntab==='cats'}">Categorias <small class="cm-n">${NCATS.length}</small></button></div>
  ${S.ntab==='news'?`<label class="sbox">${ic('search',16)}<input id="ntq" placeholder="Buscar notícia" value="${esc(S.ntq)}" autocomplete="off"></label><div class="chips">${[['ativas','No ar'],['exp','Expiradas'],['todas','Todas']].map(c=>`<button class="chipf ${S.ntf===c[0]?'on':''}" data-a="ntF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div>`:''}</div>
  ${S.ntab==='news'?ntList():ncList()}</section>`;
}
function ntList(){
 const q=norm(S.ntq),l=NEWS.filter(n=>(S.ntf==='todas'||(S.ntf==='exp'?ntSt(n)==='exp':ntSt(n)==='ativa'))&&(!q||norm(n.t+' '+(ncById(n.c)?.n||'')).includes(q))).sort((a,b)=>a.pub<b.pub?1:-1);
 if(!l.length)return `<div class="mempty"><p>Nenhuma notícia aqui.</p><span>${S.ntf==='exp'?'Quando uma notícia passa da data de expiração, ela vem para cá.':'Nada corresponde a essa busca.'}</span></div>`;
 return `<div class="cm-nl">${l.map(n=>{const st=ntSt(n),life=n.exp?Math.max(0,Math.min(100,(dIn(n.pub)*-1)/((new Date(n.exp)-new Date(n.pub))/864e5)*100)):0;return `<div class="cm-nr ${st}" tabindex="0" data-a="ntEdit" data-v="${n.id}">${cover(n)}
  <div class="cm-nt"><b>${esc(n.t)}</b><span>${catChip(ncById(n.c))}<span class="soft">Publicada ${fmtD(n.pub)}</span></span></div>
  <div class="cm-life">${n.exp?`<span>${st==='exp'?`Expirou ${relD(n.exp)}`:`Sai do ar <b>${relD(n.exp)}</b>`}</span><span class="tr ${st==='ativa'&&dIn(n.exp)<=7?'warn':''}"><i style="width:${st==='exp'?100:life}%"></i></span>`:'<span>Sem data para sair</span>'}</div>
  <span class="ts">${st==='exp'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Expirada</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>No ar</span>'}</span>
  <div class="hact" style="position:relative"><button class="ibtn sm" data-a="ntMenu" data-v="${n.id}" aria-label="Ações">${ic('dots',16)}</button><div class="pop" id="ntPop-${n.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="ntEdit" data-v="${n.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="ntDup" data-v="${n.id}">${ic('copy',16)}Duplicar</button>${st==='exp'?`<button class="pi" data-a="ntRenew" data-v="${n.id}">${ic('clock',16)}Republicar por 30 dias</button>`:''}<hr><button class="pi danger" data-a="ntDel" data-v="${n.id}">${ic('x',16)}Excluir</button></div></div></div>`;}).join('')}</div><div class="tfoot"><span>${l.length} notícia${l.length===1?'':'s'}</span></div>`;
}
function ncList(){
 return `<div class="cm-cats">${NCATS.map(c=>{const ns=NEWS.filter(n=>n.c===c.id),on=ns.filter(n=>ntSt(n)==='ativa').length;return `<div class="cm-cc" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)"><span class="cm-ci">${ic('tag',18)}</span><input class="cm-cn" value="${esc(c.n)}" data-id="${c.id}" aria-label="Nome da categoria"><span class="cm-cs"><b>${ns.length}</b> notícia${ns.length===1?'':'s'}${on?` · ${on} no ar`:''}</span><button class="ibtn sm" data-a="ncDel" data-v="${c.id}" aria-label="Excluir ${esc(c.n)}">${ic('x',14)}</button></div>`;}).join('')}
  <button class="cm-cc add" data-a="ncNew"><span class="cm-ci">${ic('plus',18,2)}</span><b>Nova categoria</b></button></div>
  <p class="who" style="padding:0 20px 18px;margin:0">Clique no nome para renomear. As alterações salvam sozinhas.</p>`;
}
function ncForm(after){openDlg(`${dlgHead('Nova categoria','Ajuda os membros a filtrar as notícias no app.')}<form id="ncF" class="fgrid one" novalidate><label class="fld"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Jovens" autocomplete="off"><span class="err"></span></label>
  <div class="fld"><span class="fl">Cor</span><div class="cm-sw">${CTONES.map((t,i)=>`<label><input type="radio" name="tone" value="${t}" ${i===NCATS.length%6?'checked':''}><span style="background:var(--tone-${t})"></span></label>`).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Adicionar</button></div></form>`,'sm');
 const f=$('#ncF'),ok=f.querySelector('[type=submit]');f.n.focus();f.n.addEventListener('input',()=>{ok.disabled=!f.n.value.trim();f.n.closest('.fld').classList.remove('bad');});
 f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(NCATS.some(c=>norm(c.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Essa categoria já existe';return;}const c={id:'c'+Date.now(),n,tone:f.tone.value};NCATS.push(c);closeDlg();if(after)after(c);else{cmRe();toast(`Categoria ${n} criada`);}});}

function ntForm(id){
 const n=id?NEWS.find(x=>x.id===id):null,v=n?{...n}:{t:'',c:NCATS[0]?.id||'',exp:addD(NOWD,30),url:'',desc:'',cover:''};
 openDlg(`${dlgHead(n?'Editar notícia':'Nova notícia',n?`Publicada em ${fmtDate(n.pub)}`:'Aparece no app assim que você publicar.')}
  <div class="cm-split"><form id="ntF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(v.t)}" maxlength="90" placeholder="Ex.: Culto especial de Ação de Graças" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Categoria</span><div class="cm-catpick" id="ntCats">${ntCatPick(v.c)}</div></div>
   <div class="fld wide"><span class="fl">Sai do ar em</span><div class="cm-exp"><div class="cm-q">${[[7,'1 semana'],[30,'1 mês'],[90,'3 meses'],[0,'Nunca']].map(x=>`<button type="button" data-q="${x[0]}">${x[1]}</button>`).join('')}</div><input type="date" name="exp" value="${v.exp||''}" min="${NOWD}"></div></div>
   <div class="fld wide"><span class="fl">Foto de capa <small>opcional</small></span><div class="cm-drop" id="ntDrop"><span>${ic('image',18)}</span><div><b>Arraste uma imagem ou <u>escolha um arquivo</u></b><small>JPG ou PNG, 1200 × 630 px</small></div><input type="url" name="cover" value="${esc(v.cover)}" placeholder="ou cole uma URL"></div></div>
   <label class="fld wide"><span class="fl">Link ao tocar <small>opcional</small></span><span class="cm-pre">${ic('link',14)}<input name="url" value="${esc(v.url)}" placeholder="https://… ou /eventos/…" autocomplete="off"></span></label>
   <div class="fld wide"><span class="fl">Descrição</span><div class="cm-fmt"><button type="button" data-w="*" title="Negrito"><b>B</b></button><button type="button" data-w="_" title="Itálico"><i>I</i></button><button type="button" data-w="~" title="Riscado"><s>S</s></button><span class="hint">Como no WhatsApp: *negrito*, _itálico_, ~riscado~</span></div><textarea class="ta" name="desc" rows="4" placeholder="O que os membros precisam saber?">${esc(v.desc)}</textarea></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="ntOk">${n?'Salvar':'Publicar'}</button></div>
  </form><aside class="cm-prev"><p class="fl">Como aparece no app</p><div class="cm-phone" id="ntPrev"></div></aside></div>`,'xl');
 const f=$('#ntF'),ok=$('#ntOk');
 const prev=()=>{const c=ncById(f.dataset.c||v.c),t=f.t.value.trim(),cv=f.cover.value.trim();$('#ntPrev').innerHTML=`<div class="cm-pbar"><span>9:41</span><span>Notícias</span><span></span></div><div class="cm-pcard"><div class="cm-pcov" style="--t:var(--tone-${c?.tone||'salvia'});--ti:var(--tone-${c?.tone||'salvia'}-ink)">${cv?`<img src="${esc(cv)}" alt="" onerror="this.remove()">`:ic('news',30)}</div><div class="cm-pbody">${c?`<span class="cm-cat" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)">${esc(c.n)}</span>`:''}<h4>${t?esc(t):'<span class="soft">Título da notícia</span>'}</h4><p>${f.desc.value.trim()?fmtWa(f.desc.value.trim()):'<span class="soft">A descrição aparece aqui.</span>'}</p>${f.url.value.trim()?`<span class="cm-plink">Saiba mais ${ic('arrowR',12,2)}</span>`:''}</div></div>`;ok.disabled=!t||!f.desc.value.trim();
  $$('.cm-q button',f).forEach(b=>b.classList.toggle('on',+b.dataset.q===0?!f.exp.value:f.exp.value===addD(NOWD,+b.dataset.q)));};
 f.dataset.c=v.c;
 f.addEventListener('input',prev);
 $('#ntCats').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.new!==undefined)return ntInlineCat();f.dataset.c=b.dataset.c;$('#ntCats').innerHTML=ntCatPick(b.dataset.c);prev();});
 $$('.cm-q button',f).forEach(b=>b.onclick=()=>{f.exp.value=+b.dataset.q?addD(NOWD,+b.dataset.q):'';prev();});
 $$('.cm-fmt button',f).forEach(b=>b.onclick=()=>{const ta=f.desc,s=ta.selectionStart,e=ta.selectionEnd,w=b.dataset.w,sel=ta.value.slice(s,e)||'texto';ta.setRangeText(w+sel+w,s,e,'select');ta.focus();prev();});
 $('#ntDrop').addEventListener('click',e=>{if(e.target.tagName==='INPUT')return;f.cover.value='';toast('Upload de imagem: em breve no protótipo — cole uma URL por enquanto');});
 prev();setTimeout(()=>f.t.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={t:f.t.value.trim(),c:f.dataset.c,exp:f.exp.value,url:f.url.value.trim(),desc:f.desc.value.trim(),cover:f.cover.value.trim()};
  if(n)Object.assign(n,o);else NEWS.push({...NW(o.t,o.c,NOWD,o.exp,o.desc,o.url),cover:o.cover});closeDlg();S.ntab='news';if(!n)S.ntf='ativas';cmRe();toast(n?'Notícia atualizada':'Notícia publicada no app');},650);});
}
function ntCatPick(sel){return NCATS.map(c=>`<button type="button" class="${c.id===sel?'on':''}" data-c="${c.id}" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)"><i></i>${esc(c.n)}</button>`).join('')+`<button type="button" class="new" data-new>${ic('plus',13,2.2)}Nova</button>`;}
function ntInlineCat(){const w=$('#ntCats');if($('#ntNc'))return;w.insertAdjacentHTML('beforeend',`<span class="cm-inl" id="ntNc"><input placeholder="Nome da categoria" maxlength="24"><button type="button" class="btn pri sm">Criar</button><button type="button" class="ibtn sm" aria-label="Cancelar">${ic('x',13)}</button></span>`);
 const box=$('#ntNc'),inp=box.querySelector('input');inp.focus();
 const go=()=>{const n=inp.value.trim();if(!n){inp.focus();return;}let c=NCATS.find(x=>norm(x.n)===norm(n));if(!c){c={id:'c'+Date.now(),n,tone:CTONES[NCATS.length%6]};NCATS.push(c);}const f=$('#ntF');f.dataset.c=c.id;w.innerHTML=ntCatPick(c.id);f.dispatchEvent(new Event('input'));toast(`Categoria ${n} criada`);};
 box.querySelector('.btn').onclick=go;inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}if(e.key==='Escape'){e.stopPropagation();box.remove();}});box.querySelector('.ibtn').onclick=()=>box.remove();}

/* ---------- Envio de Push ---------- */
const SEGS=[['todos','Todos os membros',1247,'users'],['integrados','Membros integrados',986,'circleCheck'],['grupos','Participantes de Casas',483,'home'],['jovens','Jovens (18–35 anos)',198,'flame'],['aniv','Aniversariantes do mês',34,'gift'],['mini','Um ministério',0,'music']];
let _psid=0;const PS=(t,msg,seg,type,st,dt,ch=['push'],open=null)=>({id:'ps'+(++_psid),t,msg,seg,type,st,dt,ch,open});
const PUSHES=[
 PS('Culto de Celebração — hoje às 19h','Te esperamos! Chegue cedo e traga um amigo 🙌','todos','manual','enviado','2026-09-18 09:00',['push'],46),
 PS('Feliz aniversário, Ana Clara Lima! 🎂','Que Deus abençoe seu novo ciclo. Com carinho, Alva Sede.','aniv','auto','agendado','2026-10-03 08:00'),
 PS('Feliz aniversário, Marcos Souza Ramos! 🎂','Que Deus abençoe seu novo ciclo. Com carinho, Alva Sede.','aniv','auto','agendado','2026-10-06 08:00'),
 PS('Você está escalado — Culto de Domingo','Louvor · Domingo, 10h. Confirme pelo app.','mini:Louvor','auto','agendado','2026-10-03 10:00'),
 PS('Inscrições abertas — Retiro de Jovens 2026','Últimas vagas! Garanta a sua pelo app.','jovens','manual','enviado','2026-09-01 12:00',['push','email'],58),
 PS('Conferência Missões começa sexta','Confira a programação e escolha suas oficinas.','todos','manual','agendado','2026-10-08 18:00',['push','email']),
];
const AUTOS=[{id:'au1',n:'Aniversário',d:'No dia, às 8h, para o aniversariante',icon:'gift',on:true},{id:'au2',n:'Escala',d:'1 dia antes, para quem está escalado',icon:'calendar',on:true},{id:'au3',n:'Boas-vindas',d:'Quando um membro é integrado',icon:'smile',on:false}];
Object.assign(S,{puf:'prox',pw:null});
const segOf=k=>k.startsWith('mini:')?['mini','Ministério de '+k.slice(5),(MINIS.find(m=>m.n===k.slice(5))||{m:24}).m||24,'music']:SEGS.find(s=>s[0]===k);
const dtFmt=dt=>{const [d,t]=dt.split(' ');return `${wd(d)}, ${fmtD(d)} · ${hm(t)}`;};

function puPage(){
 if(S.pw)return puWizard();
 const ag=PUSHES.filter(p=>p.st==='agendado'),env=PUSHES.filter(p=>p.st==='enviado'),op=env.filter(p=>p.open),rate=op.length?Math.round(op.reduce((a,p)=>a+p.open,0)/op.length):0;
 const l=PUSHES.filter(p=>S.puf==='todos'||(S.puf==='prox'?p.st==='agendado':S.puf==='env'?p.st==='enviado':p.st==='cancelado')).sort((a,b)=>(a.dt<b.dt?-1:1)*(S.puf==='prox'?1:-1));
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Push e e-mail</h1><p class="lede">Avisos que chegam no celular e na caixa de entrada dos membros</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="os envios (CSV)">Exportar CSV</button><button class="btn pri" data-a="puNew">${ic('send',15)}Novo envio</button></div></header>
 <div class="cm-pg rise" style="--d:1">
  <section class="card kpis4 k3"><div class="k4"><span class="kl">Agendados</span><span class="kv">${ag.length}</span><span class="kd">${ag.length?'próximo '+relD(ag.sort((a,b)=>a.dt<b.dt?-1:1)[0].dt.slice(0,10)):'nenhum'}</span></div><div class="k4"><span class="kl">Enviados no mês</span><span class="kv">${env.length}</span><span class="kd">${env.reduce((a,p)=>a+segOf(p.seg)[2],0).toLocaleString('pt-BR')} pessoas alcançadas</span></div><div class="k4"><span class="kl">Taxa de abertura</span><span class="kv" style="color:var(--st-int)">${rate}<small style="font-size:.55em">%</small></span><span class="kd">média dos últimos envios</span></div></section>
  <section class="card cm-auto"><div class="sh"><h2>${ic('zap',16,2)} Automáticos</h2></div>${AUTOS.map(a=>`<label class="tog cm-au"><span class="htile" style="--s:34px;background:var(--brand-soft);color:var(--brand-text)">${ic(a.icon,16)}</span><span><b>${a.n}</b><small>${a.d}</small></span><input type="checkbox" data-au="${a.id}" ${a.on?'checked':''}><span class="sw"></span></label>`).join('')}</section>
 </div>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><div class="chips">${[['prox','Agendados',ag.length],['env','Enviados',env.length],['canc','Cancelados',PUSHES.filter(p=>p.st==='cancelado').length],['todos','Todos',PUSHES.length]].map(c=>`<button class="chipf ${S.puf===c[0]?'on':''}" data-a="puF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="cm-pl">${l.map(p=>{const s=segOf(p.seg);return `<div class="cm-pr ${p.st}">
   <span class="cm-pd"><b>${+p.dt.slice(8,10)}</b><small>${MONTHS[+p.dt.slice(5,7)-1].slice(0,3)}</small><em>${hm(p.dt.slice(11))}</em></span>
   <div class="cm-pt"><b>${esc(p.t)}</b><span>${esc(p.msg)}</span></div>
   <div class="cm-pm"><span class="cm-seg">${ic(s[3],13)}${esc(s[1])}<small>${s[2].toLocaleString('pt-BR')}</small></span><span class="cm-chs">${p.ch.map(c=>`<i title="${c==='push'?'Push':'E-mail'}">${ic(c==='push'?'bell':'mail',12)}</i>`).join('')}${p.type==='auto'?`<em title="Automático">${ic('zap',11,2)}Auto</em>`:''}</span></div>
   <div class="cm-ps">${p.st==='enviado'?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Enviado</span>${p.open?`<small>${p.open}% abriram</small>`:''}`:p.st==='agendado'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>${relD(p.dt.slice(0,10)).replace(/^./,c=>c.toUpperCase())}</span>`:'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Cancelado</span>'}</div>
   <div class="cm-pa">${p.st==='agendado'?`<button class="btn sec sm" data-a="puCancel" data-v="${p.id}">Cancelar</button>`:p.st==='enviado'?`<button class="btn ghost sm" data-a="puAgain" data-v="${p.id}">${ic('copy',13)}Reenviar</button>`:''}</div></div>`;}).join('')}</div>`:'<div class="mempty"><p>Nada por aqui.</p><span>Os envios aparecem aqui conforme forem criados.</span></div>'}
  <div class="tfoot"><span>${l.length} envio${l.length===1?'':'s'}</span><span>${ic('gift',13)} Ao integrar um membro, o aniversário dele já entra nos automáticos.</span></div></section>`;
}
const PSTEPS=['Conteúdo','Público','Quando','Revisão'];
function puWizard(){const w=S.pw,s=segOf(w.seg==='mini'?'mini:'+w.mini:w.seg);
 return `<nav class="crumb rise"><span class="soft">Comunicação</span>${ic('chevR',13,2)}<button class="lnk back" data-a="puBack">Push e e-mail</button>${ic('chevR',13,2)}<span>Novo envio</span></nav>
 <header class="ph rise" style="--d:1"><div><h1>Novo envio</h1><p class="lede">Escreva, escolha quem recebe e quando</p></div></header>
 ${w.done?puDone(w,s):`<ol class="cm-steps rise" style="--d:1">${PSTEPS.map((t,i)=>`<li class="${i<w.step?'done':i===w.step?'on':''}"><button ${i<w.step?`data-a="puStep" data-v="${i}"`:'disabled'}><i>${i<w.step?ic('check',12,3):i+1}</i>${t}</button></li>`).join('')}</ol>
 <div class="cm-wz rise" style="--d:2"><section class="card cm-wc" id="puCard">${puStepHtml(w,s)}</section>
  <aside class="cm-wp"><div class="cm-lock"><span class="cm-pvl">Prévia</span><span class="cm-lt">${w.when==='later'&&w.d?(()=>{const s=`${['domingo','segunda','terça','quarta','quinta','sexta','sábado'][dow(w.d)]}, ${+w.d.slice(8)} de ${MONTHS[+w.d.slice(5,7)-1]}`;return s[0].toUpperCase()+s.slice(1);})():'Quinta, 1 de outubro'}</span><b class="cm-lc">${w.when==='later'&&w.t?(+w.t.slice(0,2))+':'+w.t.slice(3):'9:41'}</b>
   <div class="cm-nt2 ${w.ch.includes('push')?'':'off'}"><span class="cm-na">a</span><div><span class="cm-nh"><b>Alva</b><small>${w.when==='later'?'agendado':'agora'}</small></span><b id="pvT">${w.title?esc(w.title):'Título da notificação'}</b><p id="pvM">${w.msg?esc(w.msg):'A mensagem aparece aqui…'}</p></div></div>
   ${w.ch.includes('email')?`<div class="cm-nt2 mail"><span class="cm-na m">${ic('mail',14)}</span><div><span class="cm-nh"><b>Alva Sede</b><small>e-mail</small></span><b>${w.title?esc(w.title):'Assunto do e-mail'}</b><p>${w.msg?esc(w.msg):'…'}</p></div></div>`:''}
   <div class="cm-reach in">${ic('users',14)}<b>${s[2].toLocaleString('pt-BR')}</b><span>pessoas vão receber</span></div></div></aside></div>`}`;
}
function puStepHtml(w,s){
 const foot=(ok=true,label='Avançar')=>`<div class="cm-wf"><button class="btn sec" data-a="${w.step?'puPrev':'puBack'}">${w.step?ic('chevL',14,2)+'Voltar':'Cancelar'}</button><button class="btn pri" data-a="puNext" id="puNx" ${ok?'':'disabled'}>${label}${w.step<3?ic('arrowR',14,2):''}</button></div>`;
 if(w.step===0)return `<h2>O que você quer dizer?</h2>
  <div class="fld"><span class="fl">Enviar por</span><div class="cm-chpick">${[['push','Push no app','bell'],['email','E-mail','mail']].map(c=>`<label><input type="checkbox" data-ch="${c[0]}" ${w.ch.includes(c[0])?'checked':''}><span>${ic(c[2],15)}${c[1]}</span></label>`).join('')}</div></div>
  <label class="fld"><span class="fl cm-cnt">Título <small id="ctT">${w.title.length}/65</small></span><input id="puT" maxlength="65" value="${esc(w.title)}" placeholder="Ex.: 🙌 Lembrete: Culto de Domingo"></label>
  <label class="fld"><span class="fl cm-cnt">Mensagem <small id="ctM">${w.msg.length}/200</small></span><textarea class="ta" id="puM" maxlength="200" rows="3" placeholder="Ex.: O culto começa às 10h. Te esperamos!">${esc(w.msg)}</textarea></label>
  <div class="cm-emo">${['🙌','🙏','❤️','🎉','📖','🎂','⛪'].map(e=>`<button type="button" data-e="${e}">${e}</button>`).join('')}<span class="hint">Toque para inserir na mensagem</span></div>
  <label class="fld"><span class="fl">Ao tocar, abrir <small>opcional</small></span><span class="selw"><select id="puL"><option value="">A tela inicial do app</option>${EVTS.filter(e=>!past(e)&&e.st!=='previsao').slice(0,6).map(e=>`<option ${w.link===e.t?'selected':''}>${esc(e.t)}</option>`).join('')}<option ${w.link==='Doações'?'selected':''}>Doações</option></select>${ic('updown',14)}</span></label>
  ${foot(w.title.trim()&&w.msg.trim()&&w.ch.length)}`;
 if(w.step===1)return `<h2>Quem vai receber?</h2><div class="cm-segs">${SEGS.map(g=>`<label class="${w.seg===g[0]?'on':''}"><input type="radio" name="seg" value="${g[0]}" ${w.seg===g[0]?'checked':''}><span class="htile" style="--s:36px;background:var(--brand-soft);color:var(--brand-text)">${ic(g[3],17)}</span><span><b>${g[1]}</b><small>${g[0]==='mini'?'escolha abaixo':g[2].toLocaleString('pt-BR')+' pessoas'}</small></span><i class="cm-rd"></i></label>`).join('')}</div>
  ${w.seg==='mini'?`<div class="cm-minis">${MINIS.filter(m=>m.active).map(m=>`<button type="button" class="${w.mini===m.n?'on':''}" data-mini="${esc(m.n)}">${esc(m.n)}<small>${m.m||''}</small></button>`).join('')}</div>`:''}
  ${foot(w.seg!=='mini'||w.mini)}`;
 if(w.step===2)return `<h2>Quando enviar?</h2><div class="cm-when">${[['now','Enviar agora','Chega em segundos','zap'],['later','Agendar','Escolha dia e hora','clock']].map(o=>`<label class="${w.when===o[0]?'on':''}"><input type="radio" name="when" value="${o[0]}" ${w.when===o[0]?'checked':''}><span class="htile" style="--s:36px;background:var(--brand-soft);color:var(--brand-text)">${ic(o[3],17)}</span><span><b>${o[1]}</b><small>${o[2]}</small></span><i class="cm-rd"></i></label>`).join('')}</div>
  ${w.when==='later'?`<div class="cm-sug">${[['2026-10-04','08:00','Domingo, 8h'],['2026-10-02','09:00','Amanhã, 9h'],['2026-10-03','18:00','Sábado, 18h']].map(x=>`<button type="button" class="${w.d===x[0]&&w.t===x[1]?'on':''}" data-d="${x[0]}" data-t="${x[1]}">${x[2]}</button>`).join('')}</div>
   <div class="fgrid"><label class="fld"><span class="fl">Data</span><input type="date" id="puD" min="${NOWD}" value="${w.d||''}"></label><label class="fld"><span class="fl">Hora</span><input type="time" id="puH" value="${w.t||'09:00'}" step="900"></label></div>`:''}
  ${foot(w.when==='now'||(w.d&&w.t))}`;
 return `<h2>Tudo certo?</h2><dl class="cm-rev">${[['Canais',w.ch.map(c=>c==='push'?'Push no app':'E-mail').join(' + '),0],['Título',esc(w.title),0],['Mensagem',esc(w.msg),0],['Ao tocar',esc(w.link||'Tela inicial do app'),0],['Público',`${esc(s[1])} · ${s[2].toLocaleString('pt-BR')} pessoas`,1],['Quando',w.when==='now'?'Agora':dtFmt(w.d+' '+w.t),2]].map(r=>`<div><dt>${r[0]}</dt><dd>${r[1]}</dd><button class="lnk" data-a="puStep" data-v="${r[2]}">Editar</button></div>`).join('')}</dl>
  ${foot(true,w.when==='now'?ic('send',15)+'Enviar agora':ic('clock',15)+'Agendar envio')}`;
}
function puDone(w,s){return `<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>${w.when==='now'?'Enviado!':'Envio agendado'}</h2><p>${w.when==='now'?`Sua mensagem está chegando para <b>${s[2].toLocaleString('pt-BR')}</b> pessoas.`:`Vai para <b>${esc(s[1])}</b> em ${dtFmt(w.d+' '+w.t)}.`}</p>
 <div class="cm-dsum"><b>${esc(w.title)}</b><span>${esc(w.msg)}</span></div><div class="row2" style="justify-content:center"><button class="btn sec" data-a="puNew">Novo envio</button><button class="btn pri" data-a="puBack">Ver envios</button></div></section>`;}
function puAfter(){
 $$('[data-au]').forEach(i=>i.addEventListener('change',()=>{const a=AUTOS.find(x=>x.id===i.dataset.au);a.on=i.checked;toast(`${a.n}: envio automático ${a.on?'ligado':'desligado'}`);}));
 const w=S.pw;if(!w||w.done)return;const c=$('#puCard');if(!c)return;
 const valid=()=>{const nx=$('#puNx');if(!nx)return;nx.disabled=w.step===0?!(w.title.trim()&&w.msg.trim()&&w.ch.length):w.step===1?(w.seg==='mini'&&!w.mini):w.step===2?!(w.when==='now'||(w.d&&w.t)):false;};
 const T=$('#puT'),M=$('#puM');
 if(T){T.addEventListener('input',()=>{w.title=T.value;$('#ctT').textContent=`${T.value.length}/65`;$$('#pvT').forEach(x=>x.textContent=T.value||'Título da notificação');const ms=$('.cm-nt2.mail div>b');if(ms)ms.textContent=T.value||'Assunto do e-mail';valid();});
  M.addEventListener('input',()=>{w.msg=M.value;$('#ctM').textContent=`${M.value.length}/200`;$('#pvM').textContent=M.value||'A mensagem aparece aqui…';valid();});
  $('#puL').addEventListener('change',e=>w.link=e.target.value);
  $$('.cm-emo button').forEach(b=>b.onclick=()=>{const s=M.selectionStart??M.value.length;M.setRangeText(b.dataset.e,s,M.selectionEnd??s,'end');M.focus();M.dispatchEvent(new Event('input'));});
  $$('[data-ch]').forEach(i=>i.addEventListener('change',()=>{w.ch=$$('[data-ch]').filter(x=>x.checked).map(x=>x.dataset.ch);puRe();}));}
 $$('[name=seg]').forEach(r=>r.addEventListener('change',()=>{w.seg=r.value;if(r.value!=='mini')w.mini=null;puRe();}));
 $$('[data-mini]').forEach(b=>b.onclick=()=>{w.mini=b.dataset.mini;puRe();});
 $$('[name=when]').forEach(r=>r.addEventListener('change',()=>{w.when=r.value;puRe();}));
 $$('.cm-sug button').forEach(b=>b.onclick=()=>{w.d=b.dataset.d;w.t=b.dataset.t;puRe();});
 const D=$('#puD'),H=$('#puH');if(D){D.addEventListener('change',()=>{w.d=D.value;puRe();});H.addEventListener('change',()=>{w.t=H.value;puRe();});}
}
const puRe=()=>{const y=window.scrollY,a=document.activeElement?.id;render();window.scrollTo(0,y);if(a&&$('#'+a))$('#'+a).focus();};

/* ---------- Banners ---------- */
const GRADS=[['ceu','#2f6fbd','#7fb4ec'],['mata','#1f8a4c','#6cc690'],['ambar','#b4561b','#e3a06a'],['vinho','#7a2048','#c96a92'],['noite','#1d2b4f','#5a6ea8'],['areia','#8a6d3b','#d7bb84']];
let _bid2=0;const BN=(t,g,f,to,dest,act=true)=>({id:'bn'+(++_bid2),t,g,f,to,dest,act,sub:''});
const BANNERS=[BN('Retiro de Jovens 2026','ceu','2026-09-01','2026-10-16',['evento','ev5']),BN('Campanha Reforma do Templo','mata','2026-08-01','2026-12-31',['doacoes','']),BN('Conferência Missões','ambar','2026-09-15','2026-10-09',['evento','ev7'],false)];
BANNERS[0].sub='Últimas vagas · 17 a 19 de outubro';BANNERS[1].sub='Faltam R$ 48 mil para a meta';BANNERS[2].sub='9 de outubro, 19h30';
Object.assign(S,{bnI:0});
const gBg=g=>{const x=GRADS.find(z=>z[0]===g)||GRADS[0];return `linear-gradient(120deg,${x[1]},${x[2]})`;};
const destTxt=d=>d[0]==='evento'?(eById(d[1])?.t||'Evento'):d[0]==='doacoes'?'Doações':d[0]==='noticia'?(NEWS.find(n=>n.id===d[1])?.t||'Notícia'):d[1]||'Link externo';
const destIc=d=>({evento:'calendar',doacoes:'wallet',noticia:'news',link:'link'})[d[0]];
const bnLive=b=>b.act&&b.f<=NOWD&&b.to>=NOWD;
function bnPage(){
 const live=BANNERS.filter(bnLive);if(S.bnI>=live.length)S.bnI=0;
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Banners</h1><p class="lede">Os destaques que giram no topo do app e do site</p></div><div class="pact"><button class="btn pri" data-a="bnNew">${ic('plus',15,2.2)}Novo banner</button></div></header>
 <section class="card cm-bhero rise" style="--d:1"><div class="cm-bph"><div class="cm-bscr">${live.length?live.map((b,i)=>`<div class="cm-bsl ${i===S.bnI?'on':''}" style="background:${gBg(b.g)}"><b>${esc(b.t)}</b><span>${esc(b.sub)}</span></div>`).join(''):'<div class="cm-bsl on empty"><span>Nenhum banner no ar</span></div>'}<div class="cm-dots">${live.map((_,i)=>`<i class="${i===S.bnI?'on':''}"></i>`).join('')}</div></div><div class="cm-bsk"><i></i><i></i><i></i></div></div>
  <div class="cm-bht"><p class="eb">No ar agora</p><h2>${live.length} banner${live.length===1?'':'s'} girando no app</h2><p class="who">Trocam a cada 5 segundos, na ordem abaixo. Arraste ou use as setas para mudar.</p>
   <ol class="cm-bord">${BANNERS.filter(b=>b.act).map((b,i,a)=>`<li data-id="${b.id}"><span class="cm-grip" title="Arraste para reordenar">${ic('grip',14,2)}</span><span class="cm-bsw" style="background:${gBg(b.g)}"></span><span class="cm-bon">${esc(b.t)}${bnLive(b)?'':`<small>${b.f>NOWD?'entra '+relD(b.f):'período encerrado'}</small>`}</span><button class="ibtn sm" data-a="bnUp" data-v="${b.id}" ${i?'':'disabled'} aria-label="Subir">${ic('arrowUp',13,2)}</button><button class="ibtn sm" data-a="bnDn" data-v="${b.id}" ${i<a.length-1?'':'disabled'} aria-label="Descer">${ic('arrowDn',13,2)}</button></li>`).join('')}</ol></div></section>
 <p class="cm-dhint rise" style="--d:2">${ic('grip',13,2)}Arraste os cartões pelo ${ic('grip',12,2)} para mudar a ordem no carrossel</p><div class="cm-bgrid rise" id="bnGrid" style="--d:2">${BANNERS.map(b=>{const ord=BANNERS.filter(x=>x.act).indexOf(b)+1;const tot=Math.max(1,(new Date(b.to)-new Date(b.f))/864e5),pg=Math.max(0,Math.min(100,(new Date(NOWD)-new Date(b.f))/864e5/tot*100)),lv=bnLive(b);return `<article class="card cm-bc ${b.act?'':'off'}" data-id="${b.id}">
  <div class="cm-bv" style="background:${gBg(b.g)}"><button class="cm-bgrip" type="button" aria-label="Arrastar para reordenar" title="Arraste para reordenar">${ic('grip',16,2.2)}</button>${b.act?`<span class="cm-bord-n">${ord}º</span>`:''}<b>${esc(b.t)}</b><span>${esc(b.sub)}</span>${lv?'<em class="cm-onair">No ar</em>':''}</div>
  <div class="cm-bb"><div class="cm-bper"><span>${fmtD(b.f)} – ${fmtD(b.to)}</span><span class="soft">${b.to<NOWD?'encerrado':b.f>NOWD?'começa '+relD(b.f):'termina '+relD(b.to)}</span></div><span class="tr"><i style="width:${b.to<NOWD?100:b.f>NOWD?0:pg}%"></i></span>
   <span class="cm-dest">${ic(destIc(b.dest),13)}${esc(destTxt(b.dest))}</span>
   <footer><label class="tog cm-bt"><input type="checkbox" data-bn="${b.id}" ${b.act?'checked':''}><span class="sw"></span><span>${b.act?'Ativo':'Pausado'}</span></label><span class="row2"><button class="btn sec sm" data-a="bnEdit" data-v="${b.id}">${ic('pen',13)}Editar</button><button class="ibtn sm" data-a="bnDel" data-v="${b.id}" aria-label="Excluir">${ic('x',14)}</button></span></footer></div></article>`;}).join('')}
  <button class="cm-badd" data-a="bnNew"><span>${ic('plus',20,2)}</span><b>Novo banner</b><small>Imagem, período e destino</small></button></div>`;
}
function bnForm(id){const b=id?BANNERS.find(x=>x.id===id):null,v=b?{...b}:{t:'',sub:'',g:'noite',f:NOWD,to:addD(NOWD,30),dest:['evento',EVTS.find(e=>!past(e)&&e.st!=='previsao')?.id]};
 openDlg(`${dlgHead(b?'Editar banner':'Novo banner','Formato 16:9 no app, 3:1 no site.')}
  <div class="cm-bprev" id="bnPv"></div>
  <form id="bnF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(v.t)}" maxlength="40" placeholder="Ex.: Conferência Missões" autocomplete="off"></label>
   <label class="fld wide"><span class="fl">Linha de apoio <small>opcional</small></span><input name="sub" value="${esc(v.sub)}" maxlength="50" placeholder="Ex.: 9 de outubro, 19h30" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Fundo</span><div class="cm-gp">${GRADS.map(g=>`<label><input type="radio" name="g" value="${g[0]}" ${v.g===g[0]?'checked':''}><span style="background:linear-gradient(120deg,${g[1]},${g[2]})"></span></label>`).join('')}<button type="button" class="cm-up" id="bnUp">${ic('image',15)}Enviar imagem</button></div></div>
   <label class="fld"><span class="fl">Começa em</span><input type="date" name="f" value="${v.f}"></label>
   <label class="fld"><span class="fl">Termina em</span><input type="date" name="to" value="${v.to}"><span class="err"></span></label>
   <div class="fld wide"><span class="fl">Ao tocar, abrir</span><div class="cm-dpick">${[['evento','Evento','calendar'],['noticia','Notícia','news'],['doacoes','Doações','wallet'],['link','Link','link']].map(d=>`<label><input type="radio" name="dt" value="${d[0]}" ${v.dest[0]===d[0]?'checked':''}><span>${ic(d[2],14)}${d[1]}</span></label>`).join('')}</div><div id="bnDx"></div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="bnOk">${b?'Salvar':'Adicionar banner'}</button></div></form>`,'lg');
 const f=$('#bnF'),ok=$('#bnOk');let dv=v.dest[1]||'';
 const dx=()=>{const t=f.dt.value;$('#bnDx').innerHTML=t==='evento'?`<span class="selw" style="margin-top:8px"><select id="bnSel">${EVTS.filter(e=>!past(e)&&e.st!=='previsao').map(e=>`<option value="${e.id}" ${dv===e.id?'selected':''}>${esc(e.t)} · ${fmtD(e.d)}</option>`).join('')}</select>${ic('updown',14)}</span>`:t==='noticia'?`<span class="selw" style="margin-top:8px"><select id="bnSel">${NEWS.filter(n=>ntSt(n)==='ativa').map(n=>`<option value="${n.id}" ${dv===n.id?'selected':''}>${esc(n.t)}</option>`).join('')}</select>${ic('updown',14)}</span>`:t==='link'?`<span class="cm-pre" style="margin-top:8px">${ic('link',14)}<input id="bnSel" value="${esc(dv.startsWith('http')?dv:'')}" placeholder="https://…"></span>`:'<p class="hint" style="margin:8px 0 0">Abre a tela de doações do app.</p>';const s=$('#bnSel');if(s){dv=s.value;s.addEventListener('input',()=>{dv=s.value;});s.addEventListener('change',()=>{dv=s.value;});}};
 const pv=()=>{$('#bnPv').innerHTML=`<div style="background:${gBg(f.g.value)}"><b>${esc(f.t.value.trim()||'Título do banner')}</b><span>${esc(f.sub.value.trim())}</span></div>`;const badD=f.to.value&&f.f.value&&f.to.value<f.f.value;f.to.closest('.fld').classList.toggle('bad',badD);f.to.nextElementSibling.textContent=badD?'Termina antes de começar':'';ok.disabled=!f.t.value.trim()||!f.f.value||!f.to.value||badD;};
 f.addEventListener('input',pv);$$('[name=dt]',f).forEach(r=>r.addEventListener('change',()=>{dv='';dx();}));dx();pv();setTimeout(()=>f.t.focus(),80);
 $('#bnUp').onclick=()=>toast('Upload de imagem: em breve no protótipo');
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={t:f.t.value.trim(),sub:f.sub.value.trim(),g:f.g.value,f:f.f.value,to:f.to.value,dest:[f.dt.value,dv]};if(b)Object.assign(b,o);else BANNERS.unshift({...BN(o.t,o.g,o.f,o.to,o.dest),sub:o.sub});closeDlg();cmRe();toast(b?'Banner atualizado':'Banner adicionado');},600);});
}

/* ---------- Transmissões ---------- */
let _chid=0;const CH=(n,pl,url,sch,act=true)=>({id:'ch'+(++_chid),n,pl,url,sch,act});
const CHANS=[CH('Canal Principal','youtube','youtube.com/@AlvaIgreja',[[0,'09:00'],[0,'19:00']]),CH('Canal de Jovens','youtube','youtube.com/@AlvaJovens',[[3,'20:00']]),CH('Instagram da igreja','instagram','instagram.com/alvasede',[],false)];
const PASTL=[['Culto de Celebração','ch1','2026-09-27 19:00','1h42',812],['Culto da manhã','ch1','2026-09-27 09:00','1h35',604],['Noite de Jovens','ch2','2026-09-23 20:00','1h20',231],['Culto da manhã','ch1','2026-09-20 09:00','1h38',577]];
const PLAT={youtube:['YouTube','#e62117'],instagram:['Instagram','#c13584'],facebook:['Facebook','#1877f2']};
const WDN=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
Object.assign(S,{live:null});let _liveT=null;
const chById=id=>CHANS.find(c=>c.id===id);
function nextLive(){let best=null;CHANS.filter(c=>c.act).forEach(c=>c.sch.forEach(([d,t])=>{for(let i=0;i<8;i++){const iso=addD(NOWD,i);if(dow(iso)===d&&(i>0||mm(t)>NOWM)){const k=iso+' '+t;if(!best||k<best.k)best={k,c,iso,t};break;}}}));return best;}
function txPage(){
 const L=S.live,nx=nextLive();
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Transmissões</h1><p class="lede">Canais e lives que os membros assistem pelo app</p></div><div class="pact"><button class="btn pri" data-a="chNew">${ic('plus',15,2.2)}Novo canal</button></div></header>
 <section class="card cm-live ${L?'on':''} rise" style="--d:1">${L?`<span class="cm-lv">${ic('video',26)}<i></i></span><div class="cm-lt2"><span class="cm-badge">● Ao vivo</span><b>${esc(L.t)}</b><span>${esc(chById(L.ch).n)} · começou às ${tt(L.startM).replace(':','h')}</span></div>
  <div class="cm-lstats"><div><b id="lvTime">00:00</b><span>no ar</span></div><div><b id="lvView">${L.v}</b><span>assistindo</span></div></div><button class="btn dang" data-a="txStop">Encerrar live</button>`
  :`<span class="cm-lv idle">${ic('video',26)}</span><div class="cm-lt2"><b>Nenhuma live agora</b><span>${nx?`Próxima: <b>${WDN[dow(nx.iso)].toLowerCase()}, ${hm(nx.t)}</b> no ${esc(nx.c.n)} · ${relD(nx.iso)}`:'Nenhuma live programada'}</span></div><button class="btn pri" data-a="txStart">${ic('play',15)}Iniciar live</button>`}</section>
 <div class="cm-tx rise" style="--d:2"><div class="cm-chs2">${CHANS.map(c=>`<article class="card cm-ch ${c.act?'':'off'}"><header><span class="cm-plat" style="--p:${PLAT[c.pl][1]}">${ic(c.pl==='youtube'?'play':c.pl==='instagram'?'camera':'video',18)}</span><div class="dkt"><b>${esc(c.n)}</b><span>${PLAT[c.pl][0]}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="chMenu" data-v="${c.id}" aria-label="Ações">${ic('dots',16)}</button><div class="pop" id="chPop-${c.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="chEdit" data-v="${c.id}">${ic('pen',16)}Editar</button><hr><button class="pi danger" data-a="chDel" data-v="${c.id}">${ic('x',16)}Excluir</button></div></div></header>
   <button class="cm-url" data-a="chCopy" data-v="${c.id}" title="Copiar link"><span>${esc(c.url)}</span>${ic('copy',14)}</button>
   <div class="cm-sch">${c.sch.length?c.sch.map(([d,t])=>`<span><b>${WDN[d].slice(0,3)}</b>${hm(t)}</span>`).join(''):'<span class="soft">Sem horário fixo</span>'}</div>
   <footer><label class="tog cm-bt"><input type="checkbox" data-ch2="${c.id}" ${c.act?'checked':''}><span class="sw"></span><span>${c.act?'Visível no app':'Oculto'}</span></label><span class="soft">${PASTL.filter(p=>p[1]===c.id).length} lives no mês</span></footer></article>`).join('')}</div>
  <section class="card cm-hist"><div class="sh"><h2>Últimas lives</h2></div>${PASTL.map(p=>`<div class="cm-hr"><span class="cm-th" style="--p:${PLAT[chById(p[1])?.pl||'youtube'][1]}">${ic('play',13)}<em>${p[3]}</em></span><span class="dkt"><b>${esc(p[0])}</b><span>${wd(p[2].slice(0,10))} ${fmtD(p[2].slice(0,10))} · ${esc(chById(p[1])?.n||'')}</span></span><span class="cm-vw"><b>${p[4]}</b>${ic('eye',13)}</span></div>`).join('')}
   <div class="cm-hsum"><span>Média por live</span><b>${Math.round(PASTL.reduce((a,p)=>a+p[4],0)/PASTL.length)} pessoas</b></div></section></div>`;
}
function chForm(id){const c=id?chById(id):null,v=c?{...c,sch:c.sch.map(x=>[...x])}:{n:'',pl:'youtube',url:'',sch:[[0,'09:00']]};
 openDlg(`${dlgHead(c?'Editar canal':'Novo canal','As lives desse canal aparecem na aba Ao vivo do app.')}<form id="chF" class="fgrid one" novalidate>
  <label class="fld"><span class="fl">Nome</span><input name="n" value="${esc(v.n)}" placeholder="Ex.: Canal Principal" autocomplete="off"></label>
  <div class="fld"><span class="fl">Plataforma</span><div class="cm-dpick">${Object.entries(PLAT).map(([k,p])=>`<label><input type="radio" name="pl" value="${k}" ${v.pl===k?'checked':''}><span><i style="width:8px;height:8px;border-radius:50%;background:${p[1]}"></i>${p[0]}</span></label>`).join('')}</div></div>
  <label class="fld"><span class="fl">Link do canal</span><span class="cm-pre">${ic('link',14)}<input name="url" value="${esc(v.url)}" placeholder="youtube.com/@suaigreja" autocomplete="off"></span><span class="err"></span></label>
  <div class="fld"><span class="fl">Horários das lives <small>opcional</small></span><div id="chS"></div><button type="button" class="btn ghost sm" id="chAdd" style="align-self:flex-start">${ic('plus',13,2.2)}Adicionar horário</button></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="chOk">${c?'Salvar':'Adicionar canal'}</button></div></form>`,'sm');
 const f=$('#chF'),ok=$('#chOk');
 const rs=()=>{$('#chS').innerHTML=v.sch.map(([d,t],i)=>`<div class="cm-sr"><span class="selw"><select data-i="${i}" data-k="d">${WDN.map((w,j)=>`<option value="${j}" ${j===d?'selected':''}>${w}</option>`).join('')}</select>${ic('updown',14)}</span><input type="time" data-i="${i}" data-k="t" value="${t}" step="900"><button type="button" class="ibtn sm" data-rm="${i}" aria-label="Remover">${ic('x',13)}</button></div>`).join('');};
 const val=()=>{const u=f.url.value.trim(),bad=u&&!/\.(com|tv|be)\//.test(u);f.url.closest('.fld').classList.toggle('bad',!!bad);f.url.closest('.fld').querySelector('.err').textContent=bad?'Cole o link do canal, ex.: youtube.com/@suaigreja':'';ok.disabled=!f.n.value.trim()||!u||bad;};
 $('#chS').addEventListener('change',e=>{const el=e.target;if(el.dataset.i==null)return;v.sch[+el.dataset.i][el.dataset.k==='d'?0:1]=el.dataset.k==='d'?+el.value:el.value;});
 $('#chS').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(b){v.sch.splice(+b.dataset.rm,1);rs();}});
 $('#chAdd').onclick=()=>{v.sch.push([0,'19:00']);rs();};
 f.addEventListener('input',val);rs();val();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={n:f.n.value.trim(),pl:f.pl.value,url:f.url.value.trim().replace(/^https?:\/\//,''),sch:v.sch.sort((a,b)=>a[0]-b[0]||(a[1]<b[1]?-1:1))};if(c)Object.assign(c,o);else CHANS.push(CH(o.n,o.pl,o.url,o.sch));closeDlg();cmRe();toast(c?'Canal atualizado':'Canal adicionado');},600);});
}
function txTick(){clearInterval(_liveT);if(!S.live||S.active!=='transmissoes')return;const up=()=>{const L=S.live;if(!L||!$('#lvTime')){clearInterval(_liveT);return;}const s=Math.floor((Date.now()-L.t0)/1000);$('#lvTime').textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;if(Math.random()<.5){L.v+=Math.floor(Math.random()*9);$('#lvView').textContent=L.v;}};up();_liveT=setInterval(up,1000);}

/* drag-to-reorder (pointer events: mouse + touch) */
function sortable(box,itemSel,handleSel,onDone){if(!box)return;
 box.addEventListener('pointerdown',e=>{const h=e.target.closest(handleSel);if(!h||!box.contains(h))return;const it=h.closest(itemSel);if(!it)return;e.preventDefault();
  for(let a=box;a&&a!==document.body;a=a.parentElement)if(getComputedStyle(a).animationName!=='none'||getComputedStyle(a).transform!=='none')a.style.animation='none',a.style.transform='none';
  const r=it.getBoundingClientRect(),ox=e.clientX-r.left,oy=e.clientY-r.top,ph=document.createElement(it.tagName);ph.className='cm-ph';ph.style.height=r.height+'px';ph.style.width=r.width+'px';
  it.parentNode.insertBefore(ph,it);Object.assign(it.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',zIndex:60,pointerEvents:'none'});it.classList.add('cm-drag');document.body.classList.add('cm-dragging');
  const items=()=>[...box.querySelectorAll(itemSel)].filter(x=>x!==it);
  const flip=fn=>{const els=items(),pos=new Map(els.map(x=>[x,x.getBoundingClientRect()]));fn();els.forEach(x=>{const a=pos.get(x),b=x.getBoundingClientRect(),dx=a.left-b.left,dy=a.top-b.top;if(dx||dy)x.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});});};
  const mv=ev=>{it.style.left=(ev.clientX-ox)+'px';it.style.top=(ev.clientY-oy)+'px';
   const tgt=items().find(x=>{const b=x.getBoundingClientRect();return ev.clientX>=b.left&&ev.clientX<=b.right&&ev.clientY>=b.top&&ev.clientY<=b.bottom;});
   if(tgt){const b=tgt.getBoundingClientRect(),horiz=getComputedStyle(box).display.includes('grid')&&b.width<box.clientWidth*.8,after=horiz?ev.clientX>b.left+b.width/2:ev.clientY>b.top+b.height/2,ref=after?tgt.nextSibling:tgt;if(ref!==ph&&ref!==ph.nextSibling)flip(()=>box.insertBefore(ph,ref));}
   const m=40;if(ev.clientY<m)window.scrollBy(0,-12);else if(ev.clientY>innerHeight-m)window.scrollBy(0,12);};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);const pr=ph.getBoundingClientRect();
   it.animate([{left:it.style.left,top:it.style.top},{left:pr.left+'px',top:pr.top+'px'}],{duration:180,easing:'ease-out'}).onfinish=()=>{ph.replaceWith(it);it.removeAttribute('style');it.classList.remove('cm-drag');document.body.classList.remove('cm-dragging');onDone([...box.querySelectorAll(itemSel)].map(x=>x.dataset.id));};};
  addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up);});
}
function bnReorder(ids,activeOnly){const before=BANNERS.map(b=>b.id).join();let next;
 if(activeOnly){const act=ids.map(id=>BANNERS.find(b=>b.id===id));let k=0;next=BANNERS.map(b=>b.act?act[k++]:b);}else next=ids.map(id=>BANNERS.find(b=>b.id===id));
 if(next.map(b=>b.id).join()===before){return;}const old=BANNERS.slice();BANNERS.splice(0,BANNERS.length,...next);S.bnI=0;cmRe();toast('Ordem do carrossel atualizada',()=>{BANNERS.splice(0,BANNERS.length,...old);cmRe();});}

/* ---------- shared ---------- */
function cmAfter(){
 const q=$('#ntq');if(q)q.addEventListener('input',e=>{S.ntq=e.target.value;const p=e.target.selectionStart;cmRe();const n=$('#ntq');n.focus();n.setSelectionRange(p,p);});
 $$('.cm-cn').forEach(i=>i.addEventListener('change',()=>{const c=ncById(i.dataset.id),v=i.value.trim();if(!v||NCATS.some(x=>x!==c&&norm(x.n)===norm(v))){i.value=c.n;toast(v?'Já existe uma categoria com esse nome':'O nome não pode ficar vazio');return;}c.n=v;toast('Categoria renomeada');}));
 $$('[data-bn]').forEach(i=>i.addEventListener('change',()=>{const b=BANNERS.find(x=>x.id===i.dataset.bn);b.act=i.checked;cmRe();toast(`${b.t} ${b.act?'ativado':'pausado'}`);}));
 $$('[data-ch2]').forEach(i=>i.addEventListener('change',()=>{const c=chById(i.dataset.ch2);c.act=i.checked;cmRe();toast(`${c.n} ${c.act?'visível no app':'oculto do app'}`);}));
 if(S.active==='banners'){sortable($('#bnGrid'),'.cm-bc','.cm-bgrip',ids=>bnReorder(ids,false));sortable($('.cm-bord'),'li','.cm-grip',ids=>bnReorder(ids,true));}
 clearInterval(window._bnT);if(S.active==='banners'){const n=BANNERS.filter(bnLive).length;if(n>1)window._bnT=setInterval(()=>{if(S.active!=='banners'||!$('.cm-bscr')){clearInterval(window._bnT);return;}S.bnI=(S.bnI+1)%n;$$('.cm-bsl').forEach((s,i)=>s.classList.toggle('on',i===S.bnI));$$('.cm-dots i').forEach((s,i)=>s.classList.toggle('on',i===S.bnI));},5000);}
 if(S.active==='push')puAfter();
 if(S.active==='transmissoes')txTick();
}
const cmRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const CMA={
 ntTab:v=>{S.ntab=v;cmRe();},ntF:v=>{S.ntf=v;cmRe();},
 ntNew:()=>ntForm(),ntEdit:(v,b,e)=>{if(e&&e.target.closest('.hact')&&!e.target.closest('.pi'))return;closePops();ntForm(v);},
 ntMenu:v=>{const p=$('#ntPop-'+v);closePops(p);p.classList.toggle('open');},
 ntDup:v=>{closePops();const n=NEWS.find(x=>x.id===v);NEWS.push({...n,id:'nw'+(++_nid),t:n.t+' (cópia)',pub:NOWD,exp:addD(NOWD,30)});S.ntf='ativas';cmRe();toast('Notícia duplicada');},
 ntRenew:v=>{closePops();const n=NEWS.find(x=>x.id===v),old=n.exp;n.exp=addD(NOWD,30);S.ntf='ativas';cmRe();toast('Notícia de volta no ar por 30 dias',()=>{n.exp=old;cmRe();});},
 ntDel:v=>{closePops();const n=NEWS.find(x=>x.id===v);confirmDel({title:'Excluir esta notícia?',body:`“${esc(n.t)}” sai do app e do histórico.`,onConfirm:()=>{const i=NEWS.indexOf(n);NEWS.splice(i,1);cmRe();toast('Notícia excluída',()=>{NEWS.splice(i,0,n);cmRe();});}});},
 ncNew:()=>ncForm(),
 ncDel:v=>{const c=ncById(v),ns=NEWS.filter(n=>n.c===v);confirmDel({title:`Excluir a categoria ${esc(c.n)}?`,body:ns.length?`${ns.length} notícia${ns.length===1?' fica':'s ficam'} sem categoria. Nenhuma notícia é apagada.`:'Nenhuma notícia usa essa categoria.',onConfirm:()=>{const i=NCATS.indexOf(c);NCATS.splice(i,1);ns.forEach(n=>n.c='');cmRe();toast('Categoria excluída',()=>{NCATS.splice(i,0,c);ns.forEach(n=>n.c=v);cmRe();});}});},
 puF:v=>{S.puf=v;cmRe();},
 puNew:()=>{S.pw={step:0,ch:['push'],title:'',msg:'',link:'',seg:'todos',mini:null,when:'now',d:'',t:'09:00'};render();window.scrollTo({top:0});},
 puBack:()=>{if(S.pw&&!S.pw.done&&(S.pw.title||S.pw.msg)){confirmDel({title:'Descartar este envio?',body:'O que você escreveu não será salvo.',label:'Descartar',onConfirm:()=>{S.pw=null;render();}});return;}S.pw=null;render();window.scrollTo({top:0});},
 puStep:v=>{S.pw.step=+v;puRe();},puPrev:()=>{S.pw.step--;puRe();},
 puNext:(v,b)=>{const w=S.pw;if(w.step<3){w.step++;puRe();window.scrollTo({top:0,behavior:'smooth'});return;}b.classList.add('busy');setTimeout(()=>{const dt=w.when==='now'?NOWD+' '+tt(NOWM):w.d+' '+w.t;PUSHES.push(PS(w.title,w.msg,w.seg==='mini'?'mini:'+w.mini:w.seg,'manual',w.when==='now'?'enviado':'agendado',dt,w.ch,w.when==='now'?null:null));w.done=true;S.puf=w.when==='now'?'env':'prox';render();window.scrollTo({top:0});},800);},
 puCancel:v=>{const p=PUSHES.find(x=>x.id===v);confirmDel({title:'Cancelar este envio?',body:`“${esc(p.t)}” não será enviado ${relD(p.dt.slice(0,10))}.`,label:'Cancelar envio',onConfirm:()=>{p.st='cancelado';cmRe();toast('Envio cancelado',()=>{p.st='agendado';cmRe();});}});},
 puAgain:v=>{const p=PUSHES.find(x=>x.id===v);S.pw={step:3,ch:[...p.ch],title:p.t,msg:p.msg,link:'',seg:p.seg.startsWith('mini:')?'mini':p.seg,mini:p.seg.startsWith('mini:')?p.seg.slice(5):null,when:'now',d:'',t:'09:00'};render();window.scrollTo({top:0});},
 bnNew:()=>bnForm(),bnEdit:v=>bnForm(v),
 bnDel:v=>{const b=BANNERS.find(x=>x.id===v);confirmDel({title:'Excluir este banner?',body:`“${esc(b.t)}” sai do app e do site.`,onConfirm:()=>{const i=BANNERS.indexOf(b);BANNERS.splice(i,1);cmRe();toast('Banner excluído',()=>{BANNERS.splice(i,0,b);cmRe();});}});},
 bnUp:v=>{const a=BANNERS.filter(b=>b.act),i=a.findIndex(b=>b.id===v),x=BANNERS.indexOf(a[i]),y=BANNERS.indexOf(a[i-1]);[BANNERS[x],BANNERS[y]]=[BANNERS[y],BANNERS[x]];S.bnI=0;cmRe();},
 bnDn:v=>{const a=BANNERS.filter(b=>b.act),i=a.findIndex(b=>b.id===v),x=BANNERS.indexOf(a[i]),y=BANNERS.indexOf(a[i+1]);[BANNERS[x],BANNERS[y]]=[BANNERS[y],BANNERS[x]];S.bnI=0;cmRe();},
 chNew:()=>chForm(),chEdit:v=>{closePops();chForm(v);},
 chMenu:v=>{const p=$('#chPop-'+v);closePops(p);p.classList.toggle('open');},
 chCopy:(v,b)=>{const c=chById(v);try{navigator.clipboard.writeText('https://'+c.url);}catch(e){}b.classList.add('ok');setTimeout(()=>b.classList.remove('ok'),1200);toast('Link copiado');},
 chDel:v=>{closePops();const c=chById(v);confirmDel({title:`Excluir ${esc(c.n)}?`,body:'O canal some da aba Ao vivo do app. As lives antigas continuam no YouTube.',typed:c.n,onConfirm:()=>{const i=CHANS.indexOf(c);CHANS.splice(i,1);cmRe();toast('Canal excluído',()=>{CHANS.splice(i,0,c);cmRe();});}});},
 txStart:()=>{const act=CHANS.filter(c=>c.act);openDlg(`${dlgHead('Iniciar live','Os membros recebem um aviso no app quando a live começar.')}<form id="lvF" class="fgrid one" novalidate>
   <label class="fld"><span class="fl">Título</span><input name="t" value="Culto ao vivo" autocomplete="off"></label>
   <label class="fld"><span class="fl">Canal</span><span class="selw"><select name="ch">${act.map(c=>`<option value="${c.id}">${esc(c.n)} · ${PLAT[c.pl][0]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="tog"><input type="checkbox" name="push" checked><span class="sw"></span><span><b>Avisar os membros</b><small>Push para todos: “Estamos ao vivo!”</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${ic('play',15)}Entrar ao vivo</button></div></form>`,'sm');
  const f=$('#lvF');f.addEventListener('submit',e=>{e.preventDefault();if(!f.t.value.trim())return;f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{S.live={t:f.t.value.trim(),ch:f.ch.value,t0:Date.now(),startM:NOWM,v:12};closeDlg();cmRe();toast(f.push.checked?'Você está ao vivo · membros avisados':'Você está ao vivo');},800);});},
 txStop:()=>confirmDel({title:'Encerrar a live?',body:'A transmissão para no app. A gravação fica disponível no canal.',label:'Encerrar',onConfirm:()=>{const L=S.live;PASTL.unshift([L.t,L.ch,NOWD+' '+tt(L.startM),Math.max(1,Math.round((Date.now()-L.t0)/60000))+' min',L.v]);S.live=null;clearInterval(_liveT);cmRe();toast('Live encerrada');}}),
};

/* ================= Conteúdo › Pregações, Músicas, Jornadas ================= */
Object.assign(I,{
 anchor:'<path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>',
 file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
 upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
 route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
 metro:'<path d="M12 11.4V9.1"/><path d="m12 17 6.6-6.6"/><path d="M8.3 6.9 4 20h16L15.7 6.9a4 4 0 0 0-7.4 0Z"/>',
});
const HUES=[['#26476e','#5f8fc4'],['#3d5a3a','#8fb27c'],['#6b3a2a','#d0875c'],['#4a2d5c','#9a74b8'],['#1f4d4f','#5fa7a2'],['#5c4a1e','#c9a24f']];
const thumbBg=i=>`linear-gradient(135deg,${HUES[i%6][0]},${HUES[i%6][1]})`;
/* ---------- Pregações ---------- */
const PSERIES=[{id:'sr1',n:'Fé que Transforma',h:0},{id:'sr2',n:'Graça & Verdade',h:2},{id:'sr3',n:'Quem Sou Eu?',h:3},{id:'sr4',n:'Vida no Espírito',h:4}];
const PREACHERS=['Pr. Rafael Pereira','Pr. Marcos Lima','Pra. Ana Costa','Pr. Otávio Lins'];
let _pgid=0;const PG=(t,who,sr,d,dur,ref,views,desc='',yt='',files=[],min='')=>({id:'pg'+(++_pgid),t,who,sr,d,dur,ref,views,desc,yt,files,link:'',min});
const PREGS=[
 PG('O Chamado de Abraão','Pr. Rafael Pereira','sr1','2026-09-15',52,'Gênesis 12:1-9',2140,'Deus chama, Abraão vai. O que isso diz sobre os nossos próprios chamados?','https://youtube.com/watch?v=aBr4a0',['Esboço-O-Chamado.pdf']),
 PG('Graça Suficiente','Pr. Marcos Lima','sr2','2026-09-08',44,'2 Coríntios 12:9',1876,'Quando a fraqueza vira lugar de encontro.','https://youtube.com/watch?v=Gr4c4'),
 PG('Identidade em Cristo','Pr. Rafael Pereira','sr3','2026-09-01',48,'Efésios 1:3-14',1420,'Quem Deus diz que você é — e por que isso muda a forma como você vive.','https://www.youtube.com/watch?v=M7lc1UVf-VE',['Slides-Identidade-em-Cristo.pdf']),
 PG('O Espírito Santo no Cotidiano','Pra. Ana Costa','sr4','2026-08-25',39,'Gálatas 5:16-25',908,'','',[],'Jovens e Adolescentes'),
 PG('Um coração grato','Pr. Otávio Lins','','2026-08-18',36,'Salmos 103',612,'Mensagem avulsa de Ação de Graças.'),
];
Object.assign(S,{pgq:'',pgf:'todas',pgSr:null,preg:null});
const srById=id=>PSERIES.find(s=>s.id===id);
const pgThumb=(p,big)=>{const s=srById(p.sr),h=s?s.h:5;return `<div class="ct-th ${big?'big':''}" style="background:${thumbBg(h)}"><span class="ct-q">“</span><b>${esc(p.ref||p.t)}</b>${s?`<small>${esc(s.n)}</small>`:''}<em>${p.dur} min</em>${p.yt?`<i class="ct-play">${ic('play',big?22:16)}</i>`:''}</div>`;};
const nfmt=n=>n>=1000?(n/1000).toFixed(1).replace('.0','').replace('.',',')+' mil':String(n);
function pgPage(){
 if(S.preg)return pgEdit();
 const q=norm(S.pgq),l=PREGS.filter(p=>(S.pgf==='todas'||(S.pgf==='serie'?p.sr:!p.sr))&&(!S.pgSr||p.sr===S.pgSr)&&(!q||norm(p.t+' '+p.who+' '+p.ref+' '+(srById(p.sr)?.n||'')).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 const top=PREGS.slice().sort((a,b)=>b.views-a.views)[0];
 return `<header class="ph rise"><div><p class="eb">Conteúdo</p><h1>Pregações</h1><p class="lede">Vídeos e áudios das mensagens</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="as pregações (CSV)">Exportar CSV</button><button class="btn pri" data-a="pgNew">${ic('plus',15,2.2)}Nova pregação</button></div></header>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Pregações</span><span class="kv">${PREGS.length}</span><span class="kd">${PREGS.filter(p=>p.d>=addD(NOWD,-30)).length} no último mês</span></div><div class="k4"><span class="kl">Visualizações</span><span class="kv">${nfmt(PREGS.reduce((a,p)=>a+p.views,0))}</span><span class="kd">somando todas</span></div><div class="k4"><span class="kl">Séries</span><span class="kv">${PSERIES.length}</span><span class="kd">${PREGS.filter(p=>!p.sr).length} avulsa${PREGS.filter(p=>!p.sr).length===1?'':'s'}</span></div><div class="k4"><span class="kl">Mais assistida</span><span class="kv sp-kvt">${esc(top.t)}</span><span class="kd">${nfmt(top.views)} visualizações</span></div></section>
 <div class="ct-bar rise" style="--d:2"><label class="sbox">${ic('search',16)}<input id="pgq" placeholder="Buscar título, pregador ou passagem" value="${esc(S.pgq)}" autocomplete="off"></label>
  <div class="chips">${[['todas','Todas'],['serie','Em série'],['avulsa','Avulsas']].map(c=>`<button class="chipf ${S.pgf===c[0]&&!S.pgSr?'on':''}" data-a="pgF" data-v="${c[0]}">${c[1]}</button>`).join('')}<span class="ct-sep"></span>${PSERIES.map(s=>`<button class="chipf ct-src ${S.pgSr===s.id?'on':''}" data-a="pgSr" data-v="${s.id}"><i style="background:${HUES[s.h][1]}"></i>${esc(s.n)}<small>${PREGS.filter(p=>p.sr===s.id).length}</small></button>`).join('')}</div></div>
 ${l.length?`<div class="ct-grid rise" style="--d:3">${l.map(p=>`<article class="card ct-pc" tabindex="0" data-a="pgOpen" data-v="${p.id}">${pgThumb(p)}<div class="ct-pb"><b>${esc(p.t)}</b><span class="ct-who">${avN(p.who.replace(/^Pra?\. /,''))}${esc(p.who)}</span><div class="ct-pm"><span>${fmtD(p.d)}</span><span>${ic('eye',13)}${nfmt(p.views)}</span>${p.min?`<span class="ct-min">${esc(p.min)}</span>`:''}${p.files.length?`<span>${ic('file',13)}${p.files.length}</span>`:''}</div></div></article>`).join('')}</div>`
 :'<section class="card mempty rise"><p>Nenhuma pregação aqui.</p><span>Nada corresponde a esse filtro.</span></section>'}`;
}
function pgEdit(){const p=PREGS.find(x=>x.id===S.preg);if(!p){S.preg=null;return pgPage();}
 return `<nav class="crumb rise"><span class="soft">Conteúdo</span>${ic('chevR',13,2)}<button class="lnk back" data-a="pgBack">Pregações</button>${ic('chevR',13,2)}<span>${esc(p.t)}</span></nav>
 <header class="ph rise" style="--d:1"><div><h1 id="pgH">${esc(p.t)}</h1><p class="lede">${esc(p.who)} · ${fmtDate(p.d)}</p></div><div class="pact"><span class="who" id="pgSv">As alterações salvam sozinhas</span></div></header>
 <div class="ct-ed rise" style="--d:2"><section class="card ct-ef"><h2>Sobre a mensagem</h2><form id="pgF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(p.t)}"></label>
   <label class="fld"><span class="fl">Pregador(a)</span><input name="who" value="${esc(p.who)}" list="pgWho" autocomplete="off"><datalist id="pgWho">${PREACHERS.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></label>
   <label class="fld"><span class="fl">Série <small>opcional</small></span><span class="selw"><select name="sr"><option value="">Avulsa (sem série)</option>${PSERIES.map(s=>`<option value="${s.id}" ${s.id===p.sr?'selected':''}>${esc(s.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${p.d}"></label>
   <label class="fld"><span class="fl">Duração</span><span class="sp-unit"><input type="number" name="dur" min="1" value="${p.dur}"><em>min</em></span></label>
   <label class="fld wide"><span class="fl">Referência bíblica</span><span class="cm-pre">${ic('book',14)}<input name="ref" value="${esc(p.ref)}" placeholder="Ex.: Efésios 1:3-14"></span></label>
   <label class="fld wide"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="3" placeholder="Um resumo curto que aparece no app">${esc(p.desc)}</textarea></label>
   <div class="fld wide"><span class="fl">Vínculo <small>opcional</small></span><div class="ct-vin"><div class="cm-q"><button type="button" data-vin="0" class="${p.min?'':'on'}">Avulsa</button><button type="button" data-vin="1" class="${p.min?'on':''}">Ministério</button></div><span class="selw ${p.min?'':'ct-hide'}" id="pgMinW"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option ${m.n===p.min?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></div></div>
  </form><div class="ct-danger"><button class="btn ghostd" data-a="pgDel" data-v="${p.id}">Excluir pregação</button></div></section>
  <aside class="ct-side"><section class="card ct-media"><h2>${ic('play',15)} Vídeo</h2>${pgThumb(p,true)}<label class="fld"><span class="fl">Link do YouTube</span><span class="cm-pre">${ic('link',14)}<input id="pgYt" value="${esc(p.yt)}" placeholder="https://youtube.com/watch?v=…"></span><span class="hint" id="pgYtH">${p.yt?'Miniatura e duração vêm do YouTube.':'Sem vídeo? Tudo bem — dá para publicar só o áudio ou o esboço.'}</span></label></section>
   <section class="card ct-files"><div class="sh"><h2>${ic('file',15)} Arquivos</h2><button class="btn ghost sm" data-a="pgFile">${ic('upload',13)}Enviar</button></div>
    <div id="pgFl">${pgFiles(p)}</div>
    <label class="fld" style="margin-top:12px"><span class="fl">Link adicional <small>podcast, Spotify…</small></span><span class="cm-pre">${ic('link',14)}<input id="pgLk" value="${esc(p.link)}" placeholder="https://"></span></label></section>
   <section class="card ct-stat"><div><b>${nfmt(p.views)}</b><span>visualizações</span></div><div><b>${Math.round(p.dur*.62)} min</b><span>tempo médio assistido</span></div></section></aside></div>`;
}
const pgFiles=p=>p.files.length?p.files.map((f,i)=>`<div class="ct-file"><span class="ct-fi">${f.split('.').pop().toUpperCase()}</span><span class="dkt"><b>${esc(f)}</b><span>${(1.2+i*.8).toFixed(1).replace('.',',')} MB</span></span><button class="ibtn sm" data-a="pgFileDel" data-v="${i}" aria-label="Remover">${ic('x',13)}</button></div>`).join(''):'<div class="ct-drop" data-a="pgFile">'+ic('upload',18)+'<span><b>Slides, esboço ou áudio</b><small>Arraste aqui ou clique para enviar</small></span></div>';
function pgForm(){openDlg(`${dlgHead('Nova pregação','Depois você adiciona vídeo, passagem e arquivos.')}<form id="pgNF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Título</span><input name="t" placeholder="Ex.: O Chamado de Abraão" autocomplete="off"></label>
  <label class="fld"><span class="fl">Pregador(a)</span><input name="who" list="pgWho2" placeholder="Nome" autocomplete="off"><datalist id="pgWho2">${PREACHERS.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></label>
  <label class="fld"><span class="fl">Série <small>opcional</small></span><span class="selw"><select name="sr"><option value="">Avulsa</option>${PSERIES.map(s=>`<option value="${s.id}">${esc(s.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <div class="fld wide"><span class="fl">Vínculo <small>opcional</small></span><div class="ct-vin"><div class="cm-q"><button type="button" data-vin="0" class="on">Avulsa</button><button type="button" data-vin="1">Ministério</button></div><span class="selw ct-hide" id="pgNMin"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></div><span class="hint">Uma pregação não precisa pertencer a nenhum ministério.</span></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" disabled>Criar e continuar</button></div></form>`);
 const f=$('#pgNF'),ok=f.querySelector('[type=submit]');let vin=0;f.addEventListener('input',()=>ok.disabled=!f.t.value.trim()||!f.who.value.trim());setTimeout(()=>f.t.focus(),80);
 $$('[data-vin]',f).forEach(b=>b.onclick=()=>{vin=+b.dataset.vin;$$('[data-vin]',f).forEach(x=>x.classList.toggle('on',x===b));$('#pgNMin').classList.toggle('ct-hide',!vin);});
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const p=PG(f.t.value.trim(),f.who.value.trim(),f.sr.value,NOWD,45,'',0,'','',[],vin?f.min.value:'');PREGS.push(p);closeDlg();S.preg=p.id;render();window.scrollTo({top:0});toast('Pregação criada — complete os detalhes');},600);});}
function pgAfter(){const p=S.preg&&PREGS.find(x=>x.id===S.preg);
 const q=$('#pgq');if(q)q.addEventListener('input',e=>{S.pgq=e.target.value;const c=e.target.selectionStart;ctRe();const n=$('#pgq');n.focus();n.setSelectionRange(c,c);});
 if(!p)return;const f=$('#pgF');let t;
 const sv=()=>{clearTimeout(t);$('#pgSv').textContent='Salvando…';t=setTimeout(()=>{const o={t:f.t.value.trim()||p.t,who:f.who.value.trim()||p.who,sr:f.sr.value,d:f.d.value||p.d,dur:+f.dur.value||p.dur,ref:f.ref.value.trim(),desc:f.desc.value.trim(),min:$('#pgMinW').classList.contains('ct-hide')?'':f.min.value,yt:$('#pgYt').value.trim(),link:$('#pgLk').value.trim()};const thumbCh=o.sr!==p.sr||o.ref!==p.ref||o.dur!==p.dur||!!o.yt!==!!p.yt;Object.assign(p,o);$('#pgH').textContent=p.t;$('.crumb>span:last-child').textContent=p.t;$('#pgSv').innerHTML=`${ic('check',13,2.4)} Salvo`;if(thumbCh){$('.ct-media .ct-th').outerHTML=pgThumb(p,true);}$('#pgYtH').textContent=p.yt?'Miniatura e duração vêm do YouTube.':'Sem vídeo? Tudo bem — dá para publicar só o áudio ou o esboço.';},500);};
 f.addEventListener('input',sv);f.addEventListener('change',sv);$('#pgYt').addEventListener('input',sv);$('#pgLk').addEventListener('input',sv);
 $$('[data-vin]',f).forEach(b=>b.onclick=()=>{$$('[data-vin]',f).forEach(x=>x.classList.toggle('on',x===b));$('#pgMinW').classList.toggle('ct-hide',b.dataset.vin==='0');sv();});
}
/* ---------- Músicas ---------- */
const SCATS=['Adoração','Louvor','Hino','Infantil'];
const KEYS=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let _sgid=0;const SG=(n,art,key,bpm,cat,yt=true,res={},min='')=>({id:'sg'+(++_sgid),n,art,key,bpm,cat,yt:yt?'https://youtube.com/watch?v=x'+_sgid:'',res,min});
const SONGS=[SG('Majestade','Fernandinho','G',68,'Adoração',true,{cifra:1,vs:1}),SG('Oceanos','Hillsong','D',72,'Adoração',true,{cifra:1,mp3:1,kit:1}),SG('Deus Cuida de Mim','Ministério Zoe','A',124,'Infantil',false,{cifra:1},'Kids'),SG('Quão Grande és Tu','Tradicional','E',80,'Hino',true,{cifra:1,mapa:1}),SG('Aclame ao Senhor','Diante do Trono','A',132,'Louvor',true,{cifra:1,vs:1,kit:1},'Louvor'),SG('Grande é o Senhor','Adhemar de Campos','G',96,'Louvor',true,{})];
const SRES=[['cifra','Cifra','file'],['mp3','MP3','music'],['vs','VS','layers'],['kit','Kit de voz','mic'],['mapa','Mapa vocal','route']];
Object.assign(S,{sgq:'',sgf:'todas'});
function sgPage(){
 const q=norm(S.sgq),l=SONGS.filter(s=>(S.sgf==='todas'||(S.sgf==='novideo'?!s.yt:s.cat===S.sgf))&&(!q||norm(s.n+' '+s.art).includes(q)));const nov=SONGS.filter(s=>!s.yt).length;
 return `<header class="ph rise"><div><p class="eb">Conteúdo</p><h1>Músicas</h1><p class="lede">O repertório do louvor, com tom, andamento e materiais de ensaio</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="o repertório (CSV)">Exportar CSV</button><button class="btn pri" data-a="sgNew">${ic('plus',15,2.2)}Nova música</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Músicas</span><span class="kv">${SONGS.length}</span><span class="kd">em ${new Set(SONGS.map(s=>s.cat)).size} categorias</span></div><div class="k4"><span class="kl">Com material de ensaio</span><span class="kv">${SONGS.filter(s=>Object.keys(s.res).length>1).length}</span><span class="kd">cifra e mais algum recurso</span></div><div class="k4"><span class="kl">Sem vídeo</span><span class="kv" style="${nov?'color:var(--st-sol)':''}">${nov}</span><span class="kd">${nov?'vale adicionar uma referência':'todas com vídeo'}</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="sgq" placeholder="Buscar música ou artista" value="${esc(S.sgq)}" autocomplete="off"></label><div class="chips">${[['todas','Todas'],...SCATS.map(c=>[c,c]),['novideo','Sem vídeo']].map(c=>`<button class="chipf ${S.sgf===c[0]?'on':''}" data-a="sgF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="ct-sl">${l.map((s,i)=>`<div class="ct-sr" tabindex="0" data-a="sgEdit" data-v="${s.id}">
   <span class="ct-sv" style="${s.yt?`background:${thumbBg(SONGS.indexOf(s))}`:''}">${s.yt?ic('play',14):`<small>sem<br>vídeo</small>`}</span>
   <span class="ct-sn"><b>${esc(s.n)}</b><span>${esc(s.art)}</span></span>
   <span class="ct-key" title="Tom">${esc(s.key)}</span>
   <span class="ct-bpm" style="--bt:${(60/s.bpm).toFixed(3)}s"><i></i><b>${s.bpm}</b><small>bpm</small></span>
   <span class="ct-cat">${esc(s.cat)}${s.min?`<small>${esc(s.min)}</small>`:''}</span>
   <span class="ct-res">${SRES.map(r=>`<i class="${s.res[r[0]]?'on':''}" title="${r[1]}${s.res[r[0]]?'':' (não tem)'}">${ic(r[2],12)}</i>`).join('')}</span></div>`).join('')}</div>`:'<div class="mempty"><p>Nenhuma música aqui.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} música${l.length===1?'':'s'}</span><span class="soft">O ponto pulsa no andamento da música</span></div></section>`;
}
function sgForm(id){const s=id?SONGS.find(x=>x.id===id):null,v=s?{...s,res:{...s.res}}:{n:'',art:'',key:'G',bpm:'',cat:'Louvor',yt:'',res:{},min:''};let minor=v.key.endsWith('m');let k=v.key.replace(/m$/,'');
 openDlg(`${dlgHead(s?esc(s.n):'Nova música',s?esc(s.art):'Tom e andamento ajudam a banda a ensaiar.')}<form id="sgF" class="fgrid" novalidate>
  <label class="fld"><span class="fl">Nome da música</span><input name="n" value="${esc(v.n)}" autocomplete="off"></label>
  <label class="fld"><span class="fl">Artista</span><input name="art" value="${esc(v.art)}" autocomplete="off"></label>
  <div class="fld wide"><span class="fl">Tom <b class="ct-kv" id="sgKv">${esc(k+(minor?'m':''))}</b></span><div class="ct-keys">${KEYS.map(x=>`<button type="button" class="${x===k?'on':''} ${x.includes('#')?'sh':''}" data-k="${x}">${x}</button>`).join('')}<label class="ct-min2"><input type="checkbox" id="sgMin" ${minor?'checked':''}><span>menor</span></label></div></div>
  <div class="fld"><span class="fl">Andamento</span><div class="ct-tap"><span class="sp-unit"><input type="number" name="bpm" min="30" max="240" value="${v.bpm}" placeholder="0"><em>bpm</em></span><button type="button" class="btn sec" id="sgTap">${ic('metro',15)}Tap</button></div><span class="hint" id="sgTapH">Toque no ritmo da música para medir</span></div>
  <label class="fld"><span class="fl">Categoria</span><span class="selw"><select name="cat">${SCATS.map(c=>`<option ${c===v.cat?'selected':''}>${c}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="fld wide"><span class="fl">Vídeo de referência <small>opcional</small></span><span class="cm-pre">${ic('link',14)}<input name="yt" value="${esc(v.yt)}" placeholder="https://youtube.com/watch?v=…"></span></label>
  <div class="fld wide"><span class="fl">Materiais de ensaio <small>opcional</small></span><div class="ct-rpick">${SRES.map(r=>`<label><input type="checkbox" name="res" value="${r[0]}" ${v.res[r[0]]?'checked':''}><span>${ic(r[2],14)}${r[1]}</span></label>`).join('')}</div><span class="hint">Marque o que já está disponível. O envio dos arquivos fica na pasta da música.</span></div>
  <div class="fld wide"><span class="fl">Vínculo <small>opcional</small></span><div class="ct-vin"><div class="cm-q"><button type="button" data-vin="0" class="${v.min?'':'on'}">Avulsa</button><button type="button" data-vin="1" class="${v.min?'on':''}">Ministério</button></div><span class="selw ${v.min?'':'ct-hide'}" id="sgMinW"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option ${m.n===v.min?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></div></div>
  <div class="dfoot" style="justify-content:space-between">${s?`<button type="button" class="btn ghostd" data-a="sgDel" data-v="${s.id}">Excluir</button>`:'<span></span>'}<span class="row2"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="sgOk">${s?'Salvar':'Adicionar música'}</button></span></div></form>`,'lg');
 const f=$('#sgF'),ok=$('#sgOk');let vin=v.min?1:0;
 const chk=()=>{ok.disabled=!f.n.value.trim()||!f.art.value.trim()||!(+f.bpm.value>0);$('#sgKv').textContent=k+($('#sgMin').checked?'m':'');};
 f.addEventListener('input',chk);$('#sgMin').addEventListener('change',chk);
 $$('[data-k]',f).forEach(b=>b.onclick=()=>{k=b.dataset.k;$$('[data-k]',f).forEach(x=>x.classList.toggle('on',x===b));chk();});
 $$('[data-vin]',f).forEach(b=>b.onclick=()=>{vin=+b.dataset.vin;$$('[data-vin]',f).forEach(x=>x.classList.toggle('on',x===b));$('#sgMinW').classList.toggle('ct-hide',!vin);});
 let taps=[];$('#sgTap').onclick=e=>{const n=performance.now();taps=taps.filter(x=>n-x<2500);taps.push(n);const b=e.currentTarget;b.animate([{transform:'scale(.94)'},{transform:'none'}],{duration:120});if(taps.length>1){const d=(taps[taps.length-1]-taps[0])/(taps.length-1);f.bpm.value=Math.round(60000/d);$('#sgTapH').textContent=`${taps.length} toques · continue para refinar`;chk();}else $('#sgTapH').textContent='Continue tocando no ritmo…';};
 chk();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const res={};$$('[name=res]:checked',f).forEach(x=>res[x.value]=1);const o={n:f.n.value.trim(),art:f.art.value.trim(),key:k+($('#sgMin').checked?'m':''),bpm:+f.bpm.value,cat:f.cat.value,yt:f.yt.value.trim(),res,min:vin?f.min.value:''};if(s)Object.assign(s,o);else{const x=SG(o.n,o.art,o.key,o.bpm,o.cat,false,o.res,o.min);x.yt=o.yt;SONGS.push(x);}closeDlg();ctRe();toast(s?'Música atualizada':`${o.n} adicionada ao repertório`);},600);});
}
/* ---------- Jornadas ---------- */
let _jcid=0,_alid=0;const AL=(t,on=true)=>({id:'al'+(++_alid),t,on,desc:'',yt:'',ref:'',files:[]});
const CU=(n,desc,aulas,on=true)=>({id:'cu'+(++_jcid),n,desc,on,aulas:aulas.map(a=>AL(a))});
const PP=(n,prog,cert=false,certC=[])=>({n,prog,cert,certC});
const JORNS=[
 {id:'j1',n:'Fundamentos da Fé',icon:'anchor',h:0,wk:12,st:'ativa',courses:[CU('O que é a Fé','Fundamentos racionais e existenciais da fé cristã.',['Por que acreditar em Deus?','A fé como resposta pessoal','Fé e obras']),CU('A Palavra de Deus','Como a Bíblia foi formada, interpretada e vivida no dia a dia.',['Como a Bíblia chegou até nós','Lendo com contexto','A Palavra que transforma','Hábitos de leitura']),CU('Oração e Comunhão','A oração como diálogo com Deus, sozinho e em comunidade.',['O que é orar','O Pai Nosso','Oração em comunidade','Jejum','Perseverança'])],
  people:[PP('Gabriel Souza',[100,100,100]),PP('Isabela Rocha',[100,100,25]),PP('Fernanda Lima',[100,100,100],true,[0,1,2]),PP('Lucas Teixeira',[100,50,0]),PP('Clara Nunes',[67,0,0])],more:79},
 {id:'j2',n:'Vida de Oração',icon:'hands',h:1,wk:6,st:'ativa',courses:[CU('Primeiros passos','Criando o hábito diário.',['Um lugar e um horário','Diário de oração']),CU('Intercessão','Orando pelos outros.',['Quem é o intercessor','Orando pela cidade','Vigílias'])],people:[PP('Renata Campos',[100,50]),PP('Igor Santana',[50,0]),PP('Sofia Barros',[100,100])],more:54},
 {id:'j3',n:'Caráter Cristão',icon:'sparkle',h:2,wk:8,st:'concluida',courses:[CU('O fruto do Espírito','Gálatas 5 na prática.',['Amor','Alegria e paz','Paciência','Domínio próprio'])],people:[PP('Daniela Rocha',[100],true,[0]),PP('Bruno Reis',[100]),PP('Marina Costa',[75])],more:36},
 {id:'j4',n:'Liderança Servidora',icon:'users',h:4,wk:10,st:'rascunho',courses:[],people:[],more:0},
];
Object.assign(S,{jf:'todas',jq:'',jor:null,jtab:'trilha',cur:null,ctab:'det'});
const CSOLO=[
 {id:'cs1',n:'',solo:true,min:'Louvor',courses:[CU('Fundamentos de Louvor','Treinamento básico para novos integrantes do ministério de louvor.',['O que é adoração','Postura no altar'])],people:[PP('Helena Duarte',[100]),PP('Bruno Reis',[50]),PP('Elisa Moura',[100],true,[0])],more:0},
 {id:'cs2',n:'',solo:true,min:'Louvor',courses:[CU('Teoria Musical Básica','Fundamentos de teoria musical para músicos do ministério.',['Notas, escalas e acordes'])],people:[PP('Bruno Reis',[100]),PP('Diego Faria',[0])],more:0},
 {id:'cs3',n:'',solo:true,min:'',courses:[CU('Primeiros passos na Bíblia','Para quem está começando a ler a Bíblia agora.',['Como ler a Bíblia','Antigo e Novo Testamento','Montando um plano de leitura'],false)],people:[],more:0},
];
(()=>{const c=JORNS[0].courses[0].aulas,o=JORNS[1].courses[0].aulas,f=CSOLO[1].courses[0].aulas;c[0].yt='https://youtube.com/watch?v=fe01';c[0].files=[{n:'Slides-Por-que-acreditar.pdf',kb:1840}];c[1].yt='https://youtube.com/watch?v=fe02';o[1].files=[{n:'Modelo-Diario-de-Oracao.pdf',kb:420},{n:'Plano-30-dias.docx',kb:96}];f[0].files=[{n:'Apostila-Teoria-Musical.pdf',kb:3260},{n:'Exercicios-escalas.pdf',kb:880},{n:'Audio-intervalos.mp3',kb:5400}];})();
const alSum=a=>{const p=[];if(a.yt)p.push(`${ic('play',11)}Vídeo`);if(a.files.length)p.push(`${ic('file',11)}${a.files.length} arquivo${a.files.length===1?'':'s'}`);if(a.ref)p.push(esc(a.ref));return p.length?p.join(' · '):`<span class="al-none">${ic('alert',11,2.4)}Sem vídeo nem arquivos</span>`;};
const alFiles=fs=>fs.length?fs.map((f,i)=>`<div class="ct-file">${fTile(f.n,38)}<span class="dkt"><b>${esc(f.n)}</b><span>${fSize(f.kb)}</span></span><button type="button" class="ibtn sm" data-a="alFDel" data-v="${i}" aria-label="Remover ${esc(f.n)}">${ic('x',13)}</button></div>`).join('')+`<button type="button" class="btn ghost sm" data-a="alFUp" style="margin-top:8px">${ic('upload',13)}Enviar mais</button>`:`<div class="ct-drop" data-a="alFUp">${ic('upload',18)}<span><b>Apostila, slides, áudio ou exercícios</b><small>Arraste aqui ou clique para enviar · PDF, DOCX, PPTX, MP3 até 50 MB</small></span></div>`;
const jById=id=>JORNS.find(j=>j.id===id)||CSOLO.find(j=>j.id===id);
Object.assign(S,{csq:'',csf:'todos'});
const csAll=()=>[...JORNS.flatMap(j=>j.courses.map(c=>({c,j}))),...CSOLO.map(j=>({c:j.courses[0],j}))];
const csKind=r=>r.j.solo?(r.j.min?'min':'av'):'jor';
function csPage(){
 if(S.jor&&S.cur)return cuDetail();
 const all=csAll(),q=norm(S.csq),n=k=>all.filter(r=>csKind(r)===k).length;
 const l=all.filter(r=>(S.csf==='todos'||csKind(r)===S.csf)&&(!q||norm(r.c.n+' '+r.c.desc+' '+(r.j.n||'')+' '+(r.j.min||'')).includes(q)));
 return `<header class="ph rise"><div><p class="eb">Conteúdo</p><h1>Cursos</h1><p class="lede">Conteúdo estruturado em aulas — avulso, em jornada ou de um ministério</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="os cursos (CSV)">Exportar CSV</button><button class="btn pri" data-a="csNew">${ic('plus',15,2.2)}Novo curso</button></div></header>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Cursos</span><span class="kv">${all.length}</span><span class="kd">${all.filter(r=>r.c.on).length} ativos</span></div><div class="k4"><span class="kl">Em jornadas</span><span class="kv">${n('jor')}</span><span class="kd">dentro de ${JORNS.filter(j=>j.courses.length).length} trilhas</span></div><div class="k4"><span class="kl">De ministérios</span><span class="kv">${n('min')}</span><span class="kd">${n('av')} avulso${n('av')===1?'':'s'}</span></div><div class="k4"><span class="kl">Aulas no total</span><span class="kv">${all.reduce((a,r)=>a+r.c.aulas.length,0)}</span><span class="kd">somando todos os cursos</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="csq" placeholder="Buscar curso, jornada ou ministério" value="${esc(S.csq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos',all.length],['av','Avulsos',n('av')],['jor','Em jornada',n('jor')],['min','De ministério',n('min')]].map(c=>`<button class="chipf ${S.csf===c[0]?'on':''}" data-a="csF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow cs thead"><span>Curso</span><span>Vínculo</span><span>Aulas</span><span>Progresso</span><span>Status</span><span></span></div>${l.map(r=>{const ci=r.j.courses.indexOf(r.c),pr=pAvg(r.j.people.map(p=>p.prog[ci]||0)),k=csKind(r),mn=MINIS.find(m=>m.n===r.j.min);return `<div class="trow cs ${r.c.on?'':'off'}" tabindex="0" data-a="csOpen" data-v="${r.j.id}|${r.c.id}">
   <span class="tn"><span class="htile" style="--s:38px;background:${k==='jor'?thumbBg(r.j.h):k==='min'?`var(--tone-${mn?.tone||'ceu'})`:'var(--surface-2)'};color:${k==='jor'?'#fff':k==='min'?`var(--tone-${mn?.tone||'ceu'}-ink)`:'var(--ink-muted)'}">${ic(k==='jor'?r.j.icon:k==='min'?(mn?.icon||'users'):'book',17)}</span><span class="hn"><b>${esc(r.c.n)}</b><span>${esc(r.c.desc)}</span></span></span>
   <span class="cs-v">${k==='jor'?`<span class="cs-vb">${ic('route',12)}${esc(r.j.n)}<small>curso ${ci+1}/${r.j.courses.length}</small></span>`:k==='min'?`<span class="cs-vb">${ic('users',12)}Ministério de ${esc(r.j.min)}</span>`:'<span class="soft">Avulso</span>'}</span>
   <span class="cs-a"><b>${r.c.aulas.length}</b> aulas</span>
   <span class="cs-p">${r.j.people.length?`<span class="tr"><i style="width:${pr}%"></i></span><small>${pr}% · ${r.j.people.length+(r.j.more||0)} inscritos</small>`:'<small class="soft">Sem inscritos</small>'}</span>
   <span class="ts">${r.c.on?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>'}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}`:'<div class="mempty"><p>Nenhum curso aqui.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} curso${l.length===1?'':'s'}</span><span class="soft">Jornada é só um agrupamento de cursos que já existem</span></div></section>`;
}
function csForm(){const jo=JORNS.filter(j=>j.st!=='concluida');openDlg(`${dlgHead('Novo curso','Depois você monta as aulas.')}<form id="csF" class="fgrid one" novalidate>
  <label class="fld"><span class="fl">Nome</span><input name="n" autocomplete="off" placeholder="Ex.: Teoria Musical Básica"></label>
  <label class="fld"><span class="fl cm-cnt">Descrição <small id="csDc">0/500</small></span><textarea class="ta" name="desc" rows="3" maxlength="500"></textarea></label>
  <div class="fld"><span class="fl">Vínculo <small>opcional</small></span><div class="ct-vin"><div class="cm-q">${[['av','Avulso'],['jor','Jornada'],['min','Ministério']].map((x,i)=>`<button type="button" data-cv="${x[0]}" class="${i?'':'on'}">${x[1]}</button>`).join('')}</div></div>
   <span class="selw ct-hide" id="csJ" style="margin-top:8px"><select name="j">${jo.map(j=>`<option value="${j.id}">${esc(j.n)} · entra como curso ${j.courses.length+1}</option>`).join('')}</select>${ic('updown',14)}</span>
   <span class="selw ct-hide" id="csM" style="margin-top:8px"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span>
   <span class="hint">Um curso não precisa pertencer a nenhuma jornada ou ministério.</span></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" disabled>Criar e montar aulas</button></div></form>`);
 const f=$('#csF'),ok=f.querySelector('[type=submit]');let cv='av';f.addEventListener('input',()=>{ok.disabled=!f.n.value.trim();$('#csDc').textContent=`${f.desc.value.length}/500`;});setTimeout(()=>f.n.focus(),80);
 $$('[data-cv]',f).forEach(b=>b.onclick=()=>{cv=b.dataset.cv;$$('[data-cv]',f).forEach(x=>x.classList.toggle('on',x===b));$('#csJ').classList.toggle('ct-hide',cv!=='jor');$('#csM').classList.toggle('ct-hide',cv!=='min');});
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const c=CU(f.n.value.trim(),f.desc.value.trim(),[]);let j;
  if(cv==='jor'){j=jById(f.j.value);j.courses.push(c);j.people.forEach(p=>p.prog.push(0));}else{j={id:'cs'+Date.now(),n:'',solo:true,min:cv==='min'?f.min.value:'',courses:[c],people:[],more:0};CSOLO.push(j);}
  closeDlg();S.jor=j.id;S.cur=c.id;S.ctab='aulas';ctGo();toast('Curso criado — adicione as aulas');},600);});}
const cuById=(j,id)=>j.courses.find(c=>c.id===id);
const pAvg=pr=>pr.length?Math.round(pr.reduce((a,b)=>a+b,0)/pr.length):0;
const jProg=j=>j.people.length?Math.round(j.people.reduce((a,p)=>a+pAvg(p.prog),0)/j.people.length):0;
const jCount=j=>j.people.length+j.more;
const JST={ativa:['Ativa','var(--st-int)','var(--st-int-bg)'],rascunho:['Rascunho','var(--ink-muted)','var(--surface-2)'],concluida:['Concluída','var(--brand-text)','var(--brand-soft)']};
const jPill=s=>`<span class="stp" style="--c:${JST[s][1]};--b:${JST[s][2]}"><i></i>${JST[s][0]}</span>`;
const ring=(pct,sz=56,col)=>{const r=(sz-8)/2,c=2*Math.PI*r;return `<svg class="ct-ring" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}"><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="${col||'var(--brand)'}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}" transform="rotate(-90 ${sz/2} ${sz/2})" style="--c:${c}"/><text x="50%" y="50%" dy=".35em" text-anchor="middle">${pct}%</text></svg>`;};
function joPage(){
 if(S.jor&&S.cur)return cuDetail();if(S.jor)return joDetail();
 const q=norm(S.jq),l=JORNS.filter(j=>(S.jf==='todas'||j.st===S.jf)&&(!q||norm(j.n).includes(q)));const act=JORNS.filter(j=>j.st==='ativa');
 return `<header class="ph rise"><div><p class="eb">Conteúdo</p><h1>Jornadas</h1><p class="lede">Trilhas de discipulado em várias semanas, curso a curso</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="as jornadas (CSV)">Exportar CSV</button><button class="btn pri" data-a="joNew">${ic('plus',15,2.2)}Nova jornada</button></div></header>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Jornadas ativas</span><span class="kv">${act.length}</span><span class="kd">${JORNS.length-act.length} entre rascunho e concluídas</span></div><div class="k4"><span class="kl">Pessoas inscritas</span><span class="kv">${JORNS.reduce((a,j)=>a+jCount(j),0)}</span><span class="kd">somando todas</span></div><div class="k4"><span class="kl">Progresso médio</span><span class="kv">${Math.round(act.reduce((a,j)=>a+jProg(j),0)/Math.max(1,act.length))}<small style="font-size:.55em">%</small></span><span class="kd">nas jornadas ativas</span></div><div class="k4"><span class="kl">Certificados prontos</span><span class="kv" style="color:var(--st-int)">${JORNS.reduce((a,j)=>a+j.people.filter(p=>pAvg(p.prog)===100&&!p.cert).length,0)}</span><span class="kd">pessoas concluíram e aguardam</span></div></section>
 <div class="ct-bar rise" style="--d:2"><label class="sbox">${ic('search',16)}<input id="jq" placeholder="Buscar jornada" value="${esc(S.jq)}" autocomplete="off"></label><div class="chips">${[['todas','Todas'],['ativa','Ativas'],['concluida','Concluídas'],['rascunho','Rascunho']].map(c=>`<button class="chipf ${S.jf===c[0]?'on':''}" data-a="joF" data-v="${c[0]}">${c[1]}<small>${c[0]==='todas'?JORNS.length:JORNS.filter(j=>j.st===c[0]).length}</small></button>`).join('')}</div></div>
 <div class="ct-jg rise" style="--d:3">${l.map(j=>{const pr=jProg(j),au=j.courses.reduce((a,c)=>a+c.aulas.length,0);return `<article class="card ct-jc" tabindex="0" data-a="joOpen" data-v="${j.id}"><div class="ct-jh" style="background:${thumbBg(j.h)}"><span class="ct-ji">${ic(j.icon,22)}</span>${jPill(j.st)}</div>
  <div class="ct-jb"><b>${esc(j.n)}</b><span class="ct-jm">${j.wk} semanas · ${j.courses.length} curso${j.courses.length===1?'':'s'} · ${au} aulas</span>
   <div class="ct-path">${j.courses.length?j.courses.map((c,i)=>`<i title="${esc(c.n)}" class="${pAvg(j.people.map(p=>p.prog[i]||0))>=60?'hi':''}"></i>`).join('<em></em>'):'<span class="soft">Nenhum curso ainda</span>'}</div>
   <footer>${j.people.length?`<span class="avs">${j.people.slice(0,4).map(p=>avN(p.n)).join('')}</span><span class="ct-jn"><b>${jCount(j)}</b> inscritos</span>`:'<span class="soft">Sem inscritos</span>'}${ring(pr,52,j.st==='concluida'?'var(--st-int)':'var(--brand)')}</footer></div></article>`;}).join('')}
  <button class="cm-badd" data-a="joNew" style="min-height:300px"><span>${ic('plus',20,2)}</span><b>Nova jornada</b><small>Uma trilha com vários cursos</small></button></div>`;
}
function joHead(j,crumbs,title,sub,kpis,tabs,tab,act){
 return `<nav class="crumb rise">${crumbs}</nav><header class="card prof rise" style="--d:1"><div class="pid"><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${title}</h1>${act||''}</div><p>${sub}</p></div></div>
  <div class="ikpi hk">${kpis.map(k=>`<div><b>${k[0]}</b><span>${k[1]}</span></div>`).join('')}</div>
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${tab===t[0]?'on':''}" data-a="${t[2]}" data-v="${t[0]}">${t[1]}${t[3]!=null?`<small>${t[3]}</small>`:''}</button>`).join('')}<span class="tind"></span></div></header>`;
}
function joDetail(){const j=jById(S.jor);if(!j){S.jor=null;return joPage();}const apt=j.people.filter(p=>pAvg(p.prog)===100&&!p.cert).length;
 return joHead(j,`<span class="soft">Conteúdo</span>${ic('chevR',13,2)}<button class="lnk back" data-a="joBack">Jornadas</button>${ic('chevR',13,2)}<span>${esc(j.n)}</span>`,
  `<input class="ct-tin" id="joT" size="${j.n.length+1}" value="${esc(j.n)}" aria-label="Nome da jornada">`,`${j.courses.length} cursos na trilha · <span class="ct-wk"><input id="joW" type="number" min="1" value="${j.wk}"> semanas</span>`,
  [[j.courses.length,'Cursos'],[j.courses.reduce((a,c)=>a+c.aulas.length,0),'Aulas'],[jCount(j),'Inscritos'],[jProg(j)+'<small class="kof">%</small>','Progresso médio']],
  [['trilha','Trilha','joTab',j.courses.length],['insc','Inscritos e progresso','joTab',null],['cert','Certificados','joTab',apt||null]],S.jtab,
  `<span class="ct-stsel">${jPill(j.st)}<select id="joSt" aria-label="Status">${Object.entries(JST).map(([k,v])=>`<option value="${k}" ${k===j.st?'selected':''}>${v[0]}</option>`).join('')}</select></span>`)
 +`<div class="rise" style="--d:2">${S.jtab==='trilha'?joTrail(j):S.jtab==='insc'?peopleTab(j.people,j.courses,null,j.more):certTab(j,null)}</div>`;
}
function joTrail(j){return `<section class="card ct-trail"><div class="sh"><p class="who" style="margin:0">${ic('grip',13,2)} Arraste para mudar a ordem. Quem se inscreve faz os cursos nessa sequência.</p><button class="btn pri sm" data-a="cuNew">${ic('plus',14,2.2)}Adicionar curso</button></div>
 <ol class="ct-tl" id="cuList">${j.courses.map((c,i)=>{const pr=pAvg(j.people.map(p=>p.prog[i]||0));return `<li data-id="${c.id}" class="${c.on?'':'off'}"><span class="ct-node">${i+1}</span><div class="ct-cc" tabindex="0" data-a="cuOpen" data-v="${c.id}"><span class="cm-grip" title="Arraste para reordenar">${ic('grip',14,2)}</span>
  <div class="ct-ccb"><b>${esc(c.n)}${c.on?'':' <span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>'}</b><span>${esc(c.desc)}</span></div>
  <span class="ct-ccm"><b>${c.aulas.length}</b> aulas</span><span class="ct-ccp"><span class="tr"><i style="width:${pr}%"></i></span><small>${pr}% concluído</small></span>${ic('chevR',16)}</div></li>`;}).join('')}
  <li class="ct-addn"><span class="ct-node add">${ic('plus',14,2.2)}</span><button class="ct-cc add" data-a="cuNew"><b>Adicionar curso</b><span>Nome e descrição — as aulas você monta depois</span></button></li></ol></section>`;}
function peopleTab(people,courses,ci,more){
 return `<section class="card mtab"><div class="trow pp thead"><span>Pessoa</span><span>Progresso</span><span>${ci==null?'Onde está':'Aulas'}</span><span>Certificado</span></div>${people.map(p=>{const pr=ci==null?pAvg(p.prog):p.prog[ci]||0,cur=ci==null?p.prog.findIndex(x=>x<100):-1,cert=ci==null?p.cert:p.certC.includes(ci);return `<div class="trow pp"><span class="tn">${avN(p.n)}<b>${esc(p.n)}</b></span>
  <span class="ct-pg"><span class="tr ${pr===100?'done':''}"><i style="width:${pr}%"></i></span><b>${pr}%</b></span>
  <span class="ct-where">${ci==null?(cur<0?`<span class="sp-ok">${ic('check',13,2.4)}Concluiu a trilha</span>`:`Curso ${cur+1} de ${courses.length} · <span class="soft">${esc(courses[cur]?.n||'')}</span>`):`${Math.round(pr/100*courses[ci].aulas.length)} de ${courses[ci].aulas.length}`}</span>
  <span class="ts">${cert?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Emitido</span>':pr===100?'<span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>Pronto para emitir</span>':`<span class="soft">Falta ${100-pr}%</span>`}</span></div>`;}).join('')}
  ${more?`<div class="tfoot"><span>Mostrando ${people.length} de ${people.length+more} inscritos</span><button class="lnk" data-a="soon" data-v="Lista completa">Ver todos</button></div>`:''}</section>`;
}
function certTab(j,ci){const pc=p=>ci==null?pAvg(p.prog):p.prog[ci]||0,has=p=>ci==null?p.cert:p.certC.includes(ci);const apt=j.people.filter(p=>pc(p)===100&&!has(p)),em=j.people.filter(has);
 return `<section class="card ct-certs"><div class="ct-chd"><div class="ct-cst"><div><b>${em.length}</b><span>emitidos</span></div><div><b style="color:var(--brand-text)">${apt.length}</b><span>prontos para emitir</span></div><div><b>${j.people.length-em.length-apt.length}</b><span>ainda cursando</span></div></div>${apt.length?`<button class="btn pri" data-a="certAll" data-v="${ci==null?'':ci}">${ic('award',15)}Emitir ${apt.length} certificado${apt.length===1?'':'s'}</button>`:''}</div>
 <div class="ct-cl">${j.people.map((p,i)=>{const pr=pc(p),h=has(p);return `<div class="ct-cr ${h?'em':pr===100?'apt':''}"><span class="ct-cert">${ic('award',18)}</span><span class="dkt"><b>${esc(p.n)}</b><span>${pr}% ${ci==null?'da trilha':'do curso'}</span></span>
  ${h?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Emitido</span><button class="btn ghost sm" data-a="soon" data-v="Certificado em PDF">${ic('file',13)}PDF</button>`:pr===100?`<button class="btn pri sm" data-a="certOne" data-v="${i}|${ci==null?'':ci}">Emitir</button>`:`<span class="ct-lock" title="Libera quando chegar a 100%">${ic('lock',12)}Falta ${100-pr}%</span>`}</div>`;}).join('')}</div></section>`;}
function cuDetail(){const j=jById(S.jor),c=j&&cuById(j,S.cur);if(!c){S.cur=null;if(S.active==='cursos'){S.jor=null;return csPage();}return joDetail();}const ci=j.courses.indexOf(c),inC=S.active==='cursos';
 return joHead(j,inC?`<span class="soft">Conteúdo</span>${ic('chevR',13,2)}<button class="lnk back" data-a="cuBack">Cursos</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span>`:`<span class="soft">Conteúdo</span>${ic('chevR',13,2)}<button class="lnk back" data-a="joBack">Jornadas</button>${ic('chevR',13,2)}<button class="lnk back" data-a="cuBack">${esc(j.n)}</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span>`,
  esc(c.n),j.solo?(j.min?`Curso do Ministério de ${esc(j.min)}`:'Curso avulso'):`Curso ${ci+1} de ${j.courses.length} na trilha ${esc(j.n)}`,[[c.aulas.length,'Aulas'],[c.aulas.filter(a=>a.on).length,'Ativas'],[j.people.length,'Cursando'],[pAvg(j.people.map(p=>p.prog[ci]||0))+'<small class="kof">%</small>','Progresso médio']],
  [['det','Detalhes','cuTab',null],['aulas','Aulas','cuTab',c.aulas.length],['insc','Inscritos e progresso','cuTab',null],['cert','Certificados','cuTab',null]],S.ctab,
  `<label class="tog cm-bt ct-ontog"><input type="checkbox" id="cuOn" ${c.on?'checked':''}><span class="sw"></span><span>${c.on?'Ativo':'Inativo'}</span></label>`)
 +`<div class="rise" style="--d:2">${S.ctab==='det'?`<section class="card ct-cdet"><form id="cuF" class="fgrid one" novalidate><label class="fld"><span class="fl">Nome do curso</span><input name="n" value="${esc(c.n)}"></label><label class="fld"><span class="fl cm-cnt">Descrição <small id="cuDc">${c.desc.length}/500</small></span><textarea class="ta" name="desc" rows="4" maxlength="500">${esc(c.desc)}</textarea></label></form>
   <aside class="ct-cpos">${j.solo?`<p class="fl">Vínculo</p><div class="ct-vin"><div class="cm-q"><button type="button" data-sv="0" class="${j.min?'':'on'}">Avulso</button><button type="button" data-sv="1" class="${j.min?'on':''}">Ministério</button></div></div><span class="selw ${j.min?'':'ct-hide'}" id="cuMinW" style="margin-top:8px"><select id="cuMin">${MINIS.filter(m=>m.active).map(m=>`<option ${m.n===j.min?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span><p class="hint" style="margin:8px 0 0">Para colocar este curso numa trilha, adicione-o a uma jornada.</p>`:`<p class="fl">Posição na trilha</p><ol>${j.courses.map((x,i)=>`<li class="${x===c?'on':''}"><i>${i+1}</i>${esc(x.n)}</li>`).join('')}</ol><button class="lnk" data-a="cuTrail">Mudar a ordem na trilha ${ic('arrowR',13,2)}</button>`}<p class="who" style="margin:14px 0 0">As alterações salvam sozinhas. <span id="cuSv"></span></p><button class="btn ghostd sm" data-a="cuDel" data-v="${c.id}" style="margin-top:14px">Excluir curso</button></aside></section>`
  :S.ctab==='aulas'?`<section class="card ct-trail"><div class="sh"><p class="who" style="margin:0">${ic('grip',13,2)} Arraste para reordenar. Clique numa aula para editar vídeo, arquivos, versículo e texto.</p><button class="btn pri sm" data-a="alNew">${ic('plus',14,2.2)}Adicionar aula</button></div>
   <ol class="ct-al" id="alList">${c.aulas.map((a,i)=>`<li data-id="${a.id}" class="${a.on?'':'off'}"><span class="cm-grip">${ic('grip',14,2)}</span><span class="ct-an">${i+1}</span><button class="ct-at" data-a="alEdit" data-v="${a.id}"><b>${esc(a.t)}</b><span>${alSum(a)}</span></button><label class="tog cm-bt"><input type="checkbox" data-al="${a.id}" ${a.on?'checked':''}><span class="sw"></span><span>${a.on?'Ativa':'Oculta'}</span></label><button class="ibtn sm" data-a="alDel" data-v="${a.id}" aria-label="Excluir aula">${ic('x',13)}</button></li>`).join('')}</ol>
   ${c.aulas.length?'':'<div class="mempty"><p>Nenhuma aula ainda.</p><span>Comece pela primeira — o título basta.</span></div>'}</section>`
  :S.ctab==='insc'?peopleTab(j.people,j.courses,ci,0):certTab(j,ci)}</div>`;
}
function ctAfter(){
 requestAnimationFrame(()=>{if($('.tind'))tabInd();});
 if(S.active==='pregacoes')pgAfter();
 if(S.active==='material')mtAfter();
 const sq=$('#sgq');if(sq)sq.addEventListener('input',e=>{S.sgq=e.target.value;const c=e.target.selectionStart;ctRe();const n=$('#sgq');n.focus();n.setSelectionRange(c,c);});
 const cq=$('#csq');if(cq)cq.addEventListener('input',e=>{S.csq=e.target.value;const c=e.target.selectionStart;ctRe();const n=$('#csq');n.focus();n.setSelectionRange(c,c);});
 const jq=$('#jq');if(jq)jq.addEventListener('input',e=>{S.jq=e.target.value;const c=e.target.selectionStart;ctRe();const n=$('#jq');n.focus();n.setSelectionRange(c,c);});
 const j=S.jor&&jById(S.jor);if(!j)return;
 const T=$('#joT');if(T){const fit=()=>{const m=document.createElement('span');m.style.cssText=`position:absolute;visibility:hidden;white-space:pre;font:${getComputedStyle(T).font};letter-spacing:${getComputedStyle(T).letterSpacing}`;m.textContent=T.value||'x';document.body.appendChild(m);T.style.width=(m.offsetWidth+16)+'px';m.remove();};fit();T.addEventListener('input',fit);T.addEventListener('change',()=>{const v=T.value.trim();if(!v){T.value=j.n;return;}j.n=v;$('.crumb>span:last-child').textContent=v;toast('Nome salvo');});$('#joW').addEventListener('change',e=>{j.wk=Math.max(1,+e.target.value||j.wk);toast('Duração salva');});
  $('#joSt').addEventListener('change',e=>{j.st=e.target.value;ctRe();toast(`Jornada marcada como ${JST[j.st][0].toLowerCase()}`);});}
 sortable($('#cuList'),'li[data-id]','.cm-grip',ids=>{const old=j.courses.slice(),oldP=j.people.map(p=>[p.prog.slice(),p.certC.slice()]);const idx=ids.map(id=>j.courses.findIndex(c=>c.id===id));if(idx.every((x,i)=>x===i))return;j.courses=idx.map(i=>old[i]);j.people.forEach(p=>{p.prog=idx.map(i=>p.prog[i]||0);p.certC=p.certC.map(c=>idx.indexOf(c));});ctRe();toast('Ordem da trilha atualizada',()=>{j.courses=old;j.people.forEach((p,k)=>{p.prog=oldP[k][0];p.certC=oldP[k][1];});ctRe();});});
 const c=S.cur&&cuById(j,S.cur);if(!c)return;
 $$('[data-sv]').forEach(b=>b.onclick=()=>{const on=b.dataset.sv==='1';j.min=on?$('#cuMin').value:'';ctRe();toast(on?`Vinculado ao Ministério de ${j.min}`:'Agora é um curso avulso');});const cm=$('#cuMin');if(cm)cm.addEventListener('change',()=>{j.min=cm.value;ctRe();toast(`Vinculado ao Ministério de ${j.min}`);});
 $('#cuOn').addEventListener('change',e=>{c.on=e.target.checked;ctRe();toast(c.on?'Curso ativo na trilha':'Curso oculto da trilha');});
 const f=$('#cuF');if(f){let t;f.addEventListener('input',()=>{$('#cuDc').textContent=`${f.desc.value.length}/500`;clearTimeout(t);$('#cuSv').textContent='Salvando…';t=setTimeout(()=>{c.n=f.n.value.trim()||c.n;c.desc=f.desc.value.trim();$('.prof h1').textContent=c.n;$('.crumb>span:last-child').textContent=c.n;$('.ct-cpos li.on').lastChild.textContent=c.n;$('#cuSv').innerHTML=`${ic('check',12,2.4)} Salvo`;},500);});}
 sortable($('#alList'),'li[data-id]','.cm-grip',ids=>{const old=c.aulas.slice();const n=ids.map(id=>c.aulas.find(a=>a.id===id));if(n.every((a,i)=>a===old[i]))return;c.aulas=n;ctRe();toast('Ordem das aulas atualizada',()=>{c.aulas=old;ctRe();});});
 $$('[data-al]').forEach(i=>i.addEventListener('change',()=>{const a=c.aulas.find(x=>x.id===i.dataset.al);a.on=i.checked;ctRe();}));
}
const ctRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const ctGo=()=>{render();window.scrollTo({top:0});};
function simpleForm(title,sub,fields,label,onOk){openDlg(`${dlgHead(title,sub)}<form id="smF" class="fgrid one" novalidate>${fields}<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" disabled>${label}</button></div></form>`,'sm');
 const f=$('#smF'),ok=f.querySelector('[type=submit]'),req=$$('[data-req]',f);const chk=()=>ok.disabled=req.some(x=>!x.value.trim());f.addEventListener('input',chk);chk();setTimeout(()=>f.querySelector('input,textarea')?.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{closeDlg();onOk(f);},500);});}
const CTA={
 pgNew:()=>pgForm(),pgOpen:v=>{S.preg=v;ctGo();},pgBack:()=>{S.preg=null;ctGo();},
 pgF:v=>{S.pgf=v;S.pgSr=null;ctRe();},pgSr:v=>{S.pgSr=S.pgSr===v?null:v;S.pgf='todas';ctRe();},
 pgFile:()=>{const p=PREGS.find(x=>x.id===S.preg);p.files.push(['Esboço','Slides','Áudio'][p.files.length%3]+'-'+p.t.split(' ').slice(0,2).join('-')+(p.files.length%3===2?'.mp3':'.pdf'));$('#pgFl').innerHTML=pgFiles(p);toast('Arquivo enviado');},
 pgFileDel:v=>{const p=PREGS.find(x=>x.id===S.preg),f=p.files.splice(+v,1)[0];$('#pgFl').innerHTML=pgFiles(p);toast(`${f} removido`,()=>{p.files.splice(+v,0,f);$('#pgFl').innerHTML=pgFiles(p);});},
 pgDel:v=>{const p=PREGS.find(x=>x.id===v);confirmDel({title:'Excluir esta pregação?',body:`“${esc(p.t)}” sai do app, junto com os arquivos anexados.`,onConfirm:()=>{const i=PREGS.indexOf(p);PREGS.splice(i,1);S.preg=null;ctGo();toast('Pregação excluída',()=>{PREGS.splice(i,0,p);ctRe();});}});},
 sgNew:()=>sgForm(),sgEdit:v=>sgForm(v),sgF:v=>{S.sgf=v;ctRe();},
 sgDel:v=>{const s=SONGS.find(x=>x.id===v);confirmDel({title:`Excluir ${esc(s.n)}?`,body:'Ela sai do repertório e das escalas futuras de louvor.',onConfirm:()=>{const i=SONGS.indexOf(s);SONGS.splice(i,1);ctRe();toast('Música excluída',()=>{SONGS.splice(i,0,s);ctRe();});}});},
 joF:v=>{S.jf=v;ctRe();},joOpen:v=>{S.jor=v;S.jtab='trilha';S.cur=null;ctGo();},joBack:()=>{S.jor=null;S.cur=null;ctGo();},joTab:v=>{S.jtab=v;ctRe();},
 joNew:()=>simpleForm('Nova jornada','Uma trilha de discipulado com vários cursos.',`<label class="fld"><span class="fl">Título</span><input name="n" data-req placeholder="Ex.: Liderança Servidora" autocomplete="off"></label><div class="fld"><span class="fl">Ícone</span><div class="cm-sw ct-icp">${['anchor','hands','sparkle','book','flame','heart'].map((x,i)=>`<label><input type="radio" name="icon" value="${x}" ${i?'':'checked'}><span>${ic(x,16)}</span></label>`).join('')}</div></div><label class="fld"><span class="fl">Duração</span><span class="sp-unit"><input type="number" name="wk" value="8" min="1"><em>semanas</em></span></label>`,'Criar jornada',f=>{const j={id:'j'+Date.now(),n:f.n.value.trim(),icon:f.icon.value,h:JORNS.length%6,wk:+f.wk.value||8,st:'rascunho',courses:[],people:[],more:0};JORNS.push(j);S.jor=j.id;S.jtab='trilha';ctGo();toast('Jornada criada como rascunho — adicione os cursos');}),
 cuOpen:(v,b,e)=>{if(e&&e.target.closest('.cm-grip'))return;S.cur=v;S.ctab='det';ctGo();},cuBack:()=>{S.cur=null;S.jtab='trilha';if(S.active==='cursos')S.jor=null;ctGo();},cuTrail:()=>{S.active='jornadas';S.cur=null;S.jtab='trilha';ctGo();},csF:v=>{S.csf=v;ctRe();},csNew:()=>csForm(),csOpen:v=>{const [j,c]=v.split('|');S.jor=j;S.cur=c;S.ctab='det';ctGo();},cuTab:v=>{S.ctab=v;ctRe();},
 cuNew:()=>{const j=jById(S.jor);simpleForm('Novo curso',`Entra como curso ${j.courses.length+1} da trilha.`,`<label class="fld"><span class="fl">Nome do curso</span><input name="n" data-req autocomplete="off"></label><label class="fld"><span class="fl cm-cnt">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="3" maxlength="500"></textarea></label>`,'Adicionar curso',f=>{const c=CU(f.n.value.trim(),f.desc.value.trim(),[]);j.courses.push(c);j.people.forEach(p=>p.prog.push(0));ctRe();toast(`${c.n} adicionado à trilha`);});},
 cuDel:v=>{const j=jById(S.jor),c=cuById(j,v);confirmDel({title:`Excluir ${esc(c.n)}?`,body:`As ${c.aulas.length} aulas e o progresso dos inscritos neste curso serão apagados.`,typed:c.n,onConfirm:()=>{if(j.solo){CSOLO.splice(CSOLO.indexOf(j),1);}else{const i=j.courses.indexOf(c);j.courses.splice(i,1);j.people.forEach(p=>p.prog.splice(i,1));}S.cur=null;S.jtab='trilha';if(S.active==='cursos'||j.solo)S.jor=null;ctGo();toast('Curso excluído');}});},
 alNew:()=>{const c=cuById(jById(S.jor),S.cur);simpleForm('Nova aula',`Aula ${c.aulas.length+1} do curso. Vídeo, arquivos e versículo você adiciona clicando nela.`,`<label class="fld"><span class="fl">Título</span><input name="t" data-req autocomplete="off"></label>`,'Adicionar aula',f=>{c.aulas.push(AL(f.t.value.trim()));ctRe();toast('Aula adicionada');});},
 alEdit:v=>{const c=cuById(jById(S.jor),S.cur),a=c.aulas.find(x=>x.id===v);window._alD={a,files:a.files.map(f=>({...f}))};
  openDlg(`${dlgHead(`Aula ${c.aulas.indexOf(a)+1}`,esc(c.n))}<form id="alF" class="al-f" novalidate>
   <div class="al-c1"><label class="fld"><span class="fl">Título</span><input name="t" value="${esc(a.t)}" autocomplete="off"><span class="err"></span></label>
    <div class="fld"><span class="fl">Formato</span><div class="segc al-fmt" role="group">${[['video','Vídeo'],['arq','Só arquivos'],['ambos','Vídeo + arquivos']].map(z=>`<button type="button" data-fmt="${z[0]}" aria-pressed="${(a.yt&&a.files.length?'ambos':!a.yt&&a.files.length?'arq':'video')===z[0]}">${z[1]}</button>`).join('')}</div></div>
    <label class="fld al-yt"><span class="fl">Vídeo</span><span class="cm-pre">${ic('link',14)}<input name="yt" value="${esc(a.yt)}" placeholder="https://youtube.com/…" autocomplete="off"></span><span class="err"></span></label>
    <label class="fld"><span class="fl">Versículo-base <small>opcional</small></span><span class="cm-pre">${ic('book',14)}<input name="ref" value="${esc(a.ref)}" placeholder="Ex.: Hebreus 11:1" autocomplete="off"></span></label>
    <label class="fld"><span class="fl">Texto da aula <small>opcional</small></span><textarea class="ta" name="desc" rows="5" placeholder="O conteúdo que a pessoa lê no app">${esc(a.desc)}</textarea></label></div>
   <section class="al-c2"><div class="sh" style="margin-bottom:10px"><p class="fl" style="margin:0">${ic('file',13)} Arquivos <small id="alFc">${a.files.length||''}</small></p></div><div id="alFl">${alFiles(window._alD.files)}</div><p class="hint al-fh">A pessoa baixa ou abre no app, na própria aula.</p><span class="err" id="alFe"></span></section>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Salvar aula</button></div></form>`,'lg');
  const f=$('#alF'),D=window._alD;let fmt=(a.yt&&a.files.length)?'ambos':(!a.yt&&a.files.length)?'arq':'video';
  const paint=()=>{f.classList.toggle('nov',fmt==='arq');$$('[data-fmt]',f).forEach(b=>b.setAttribute('aria-pressed',b.dataset.fmt===fmt));};paint();
  f.querySelector('.al-fmt').addEventListener('click',e=>{const b=e.target.closest('[data-fmt]');if(!b)return;fmt=b.dataset.fmt;paint();if(fmt!=='arq')setTimeout(()=>f.yt.focus(),30);});
  f.addEventListener('input',e=>{const l=e.target.closest('.fld');l&&l.classList.remove('bad');});
  f.addEventListener('submit',e=>{e.preventDefault();const t=f.t.value.trim(),yt=fmt==='arq'?'':f.yt.value.trim();let ok=true;const bad=(el,m)=>{const l=el.closest('.fld')||el.parentNode;l.classList.add('bad');(l.querySelector('.err')||$('#alFe')).textContent=m;ok=false;};
   if(!t)bad(f.t,'Dê um título');
   if(fmt!=='arq'&&!yt)bad(f.yt,fmt==='ambos'?'Cole o link do vídeo ou escolha “Só arquivos”':'Cole o link do vídeo');
   else if(yt&&!/^https?:\/\/\S+\.\S+/.test(yt))bad(f.yt,'Link inválido. Comece com https://');
   if(fmt!=='video'&&!D.files.length){$('#alFe').textContent='Envie pelo menos um arquivo';$('.al-c2').classList.add('bad');ok=false;}
   if(!ok)return;
   const sb=f.querySelector('[type=submit]');sb.classList.add('busy');setTimeout(()=>{Object.assign(a,{t,yt,ref:f.ref.value.trim(),desc:f.desc.value.trim(),files:fmt==='video'?[]:D.files});closeDlg();ctRe();toast(fmt==='video'&&D.files.length?'Aula salva. Os arquivos foram removidos (formato só vídeo)':'Aula salva');},500);});},
 alFUp:()=>{const D=window._alD;if(!D)return;const k=D.files.length%4,nm=['Apostila','Slides','Exercicios','Audio'][k],ex=['pdf','pptx','pdf','mp3'][k];
  if(D.files.length>=10){toast('Limite de 10 arquivos por aula');return;}
  const fl=$('#alFl');fl.insertAdjacentHTML('beforeend',`<div class="al-up"><span>${ic('upload',13)}Enviando ${nm}-${D.a.t.split(' ')[0]}.${ex}…</span><i></i></div>`);
  setTimeout(()=>{D.files.push({n:`${nm}-${norm(D.a.t).split(' ').slice(0,2).join('-')}.${ex}`,kb:[1820,2640,540,4800][k]});fl.innerHTML=alFiles(D.files);$('#alFc').textContent=D.files.length;$('.al-c2').classList.remove('bad');$('#alFe').textContent='';},700);},
 alFDel:v=>{const D=window._alD,f=D.files.splice(+v,1)[0];$('#alFl').innerHTML=alFiles(D.files);$('#alFc').textContent=D.files.length||'';toast(`${f.n} removido`,()=>{D.files.splice(+v,0,f);const l=$('#alFl');if(l){l.innerHTML=alFiles(D.files);$('#alFc').textContent=D.files.length;}});},
 alDel:v=>{const c=cuById(jById(S.jor),S.cur),a=c.aulas.find(x=>x.id===v);confirmDel({title:'Excluir esta aula?',body:`“${esc(a.t)}” sai do curso.`,onConfirm:()=>{const i=c.aulas.indexOf(a);c.aulas.splice(i,1);ctRe();toast('Aula excluída',()=>{c.aulas.splice(i,0,a);ctRe();});}});},
 certOne:(v,b)=>{const [i,ci]=v.split('|'),j=jById(S.jor),p=j.people[+i];busy(b,700,'Emitido',()=>{if(ci==='')p.cert=true;else p.certC.push(+ci);setTimeout(ctRe,350);toast(`Certificado de ${p.n.split(' ')[0]} emitido e enviado por e-mail`);});},
 certAll:(v,b)=>{const j=jById(S.jor),ci=v===''?null:+v,l=j.people.filter(p=>(ci==null?pAvg(p.prog):p.prog[ci])===100&&!(ci==null?p.cert:p.certC.includes(ci)));busy(b,900,'Emitidos',()=>{l.forEach(p=>ci==null?p.cert=true:p.certC.push(ci));setTimeout(ctRe,350);toast(`${l.length} certificado${l.length===1?'':'s'} emitido${l.length===1?'':'s'}`);});},
};

/* ---------- Material de apoio ---------- */
const MLINKS=[['jornada','Jornada','route'],['disc','Discipulado','heart'],['casas','Casas de Apascentamento','home'],['curso','Curso','book'],['outro','Outro','layers']];
let _mtid=0;const MTR=(t,desc,d,lk,ref,files,min='',url='')=>({id:'mt'+(++_mtid),t,desc,d,lk,ref,files:files.map((f,i)=>({n:f,kb:[820,1430,2310,640][i%4]})),min,url,dl:Math.round(20+Math.random()*120)});
const MATS=[
 MTR('Apostila — Fundamentos da Fé','Apostila de apoio para as 3 primeiras semanas da jornada.','2026-09-02','jornada','j1',['Apostila-Fundamentos-da-Fe.pdf']),
 MTR('Roteiro de Encontro — Discipulado Inicial','Roteiro passo a passo para o primeiro encontro de discipulado.','2026-08-18','disc','',['Roteiro-Discipulado-Inicial.pdf']),
 MTR('Guia do Líder de Casa','Boas práticas para condução de encontros nas Casas de Apascentamento.','2026-03-03','casas','',['Casas-de-Apascentamento_03MAR1.pdf','Dinamicas-quebra-gelo.docx','Lista-de-presenca.xlsx'],'','https://drive.google.com/casas-guia'),
 MTR('Escala de ensaio — Louvor','Planilha com o cronograma de ensaios do semestre.','2026-07-10','outro','Ensaios',['Ensaios-2026-2.xlsx'],'Louvor','https://drive.google.com/…'),
];
Object.assign(S,{mtq:'',mtf:'todos',mat:null});
const fExt=n=>n.split('.').pop().toLowerCase();
const fCol=e=>({pdf:['var(--st-rec-bg)','var(--st-rec)'],doc:['var(--brand-soft)','var(--brand-text)'],docx:['var(--brand-soft)','var(--brand-text)'],xlsx:['var(--st-int-bg)','var(--st-int)'],pptx:['var(--st-sol-bg)','var(--st-sol)']})[e]||['var(--surface-2)','var(--ink-muted)'];
const fSize=kb=>kb>=1000?(kb/1000).toFixed(1).replace('.',',')+' MB':kb+' KB';
const mtLink=m=>{const L=MLINKS.find(x=>x[0]===m.lk)||MLINKS[4];const tx=m.lk==='jornada'?(jById(m.ref)?.n||'Jornada'):m.lk==='curso'?(csAll().find(r=>r.c.id===m.ref)?.c.n||'Curso'):m.lk==='outro'?(m.ref||'Geral'):L[1];return {L,tx};};
const fTile=(n,sz=34)=>{const e=fExt(n),c=fCol(e);return `<span class="mt-ft" style="--s:${sz}px;background:${c[0]};color:${c[1]}">${e.toUpperCase().slice(0,4)}</span>`;};
function mtPage(){
 if(S.mat)return mtEdit();
 const q=norm(S.mtq),l=MATS.filter(m=>(S.mtf==='todos'||m.lk===S.mtf||(S.mtf==='min'&&m.min))&&(!q||norm(m.t+' '+m.desc+' '+mtLink(m).tx+' '+m.files.map(f=>f.n).join(' ')).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 const nf=MATS.reduce((a,m)=>a+m.files.length,0),kb=MATS.reduce((a,m)=>a+m.files.reduce((x,f)=>x+f.kb,0),0);
 return `<header class="ph rise"><div><p class="eb">Conteúdo</p><h1>Material de apoio</h1><p class="lede">Apostilas, roteiros e arquivos para jornadas, discipulado e Casas</p></div><div class="pact"><button class="btn sec" data-a="export" data-v="os materiais (CSV)">Exportar CSV</button><button class="btn pri" data-a="mtNew">${ic('plus',15,2.2)}Novo material</button></div></header>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Materiais</span><span class="kv">${MATS.length}</span><span class="kd">${MATS.filter(m=>m.min).length} de ministérios</span></div><div class="k4"><span class="kl">Arquivos anexados</span><span class="kv">${nf}</span><span class="kd">${fSize(kb)} no total</span></div><div class="k4"><span class="kl">Downloads no mês</span><span class="kv">${MATS.reduce((a,m)=>a+m.dl,0)}</span><span class="kd">pelos líderes no app</span></div><div class="k4"><span class="kl">Mais baixado</span><span class="kv sp-kvt">${esc(MATS.slice().sort((a,b)=>b.dl-a.dl)[0].t.split(' — ')[0])}</span><span class="kd">${MATS.slice().sort((a,b)=>b.dl-a.dl)[0].dl} downloads</span></div></section>
 <div class="ct-bar rise" style="--d:2"><label class="sbox">${ic('search',16)}<input id="mtq" placeholder="Buscar material ou arquivo" value="${esc(S.mtq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos'],...MLINKS.slice(0,4).map(x=>[x[0],x[1]]),['min','De ministério']].map(c=>`<button class="chipf ${S.mtf===c[0]?'on':''}" data-a="mtF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div>
 ${l.length?`<div class="mt-grid rise" style="--d:3">${l.map(m=>{const {L,tx}=mtLink(m);return `<article class="card mt-c" tabindex="0" data-a="mtOpen" data-v="${m.id}">
  <div class="mt-stack">${m.files.slice(0,3).map((f,i)=>`<span class="mt-pg" style="--i:${i}">${fTile(f.n,30)}</span>`).join('')||`<span class="mt-pg empty">${ic('file',20)}</span>`}</div>
  <div class="mt-b"><span class="mt-lk">${ic(L[2],12)}${esc(tx)}</span><b>${esc(m.t)}</b><p>${esc(m.desc)}</p></div>
  <footer><span>${m.files.length} arquivo${m.files.length===1?'':'s'}${m.url?` · ${ic('link',11)} link`:''}</span><span>${fmtD(m.d)}</span>${m.min?`<span class="ct-min">${esc(m.min)}</span>`:''}<button class="ibtn sm mt-dl" data-a="mtDl" data-v="${m.id}" aria-label="Baixar" title="Baixar tudo">${ic('arrowDn',14,2)}</button></footer></article>`;}).join('')}
  <button class="cm-badd" data-a="mtNew" style="min-height:250px"><span>${ic('upload',20,2)}</span><b>Novo material</b><small>Título, vínculo e arquivos</small></button></div>`:'<section class="card mempty rise"><p>Nenhum material aqui.</p><span>Nada corresponde a esse filtro.</span></section>'}`;
}
function mtLinkFields(v){return `<div class="fld wide"><span class="fl">Usado em <small>opcional</small></span><div class="cm-dpick" id="mtLk">${MLINKS.map(x=>`<label><input type="radio" name="lk" value="${x[0]}" ${v.lk===x[0]?'checked':''}><span>${ic(x[2],14)}${x[1]}</span></label>`).join('')}</div><div id="mtRef"></div></div>
  <div class="fld wide"><span class="fl">Ministério <small>opcional</small></span><div class="ct-vin"><div class="cm-q"><button type="button" data-mv="0" class="${v.min?'':'on'}">Avulso</button><button type="button" data-mv="1" class="${v.min?'on':''}">Ministério</button></div><span class="selw ${v.min?'':'ct-hide'}" id="mtMinW"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option ${m.n===v.min?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></div><span class="hint">Aparece também na aba Conteúdo do ministério.</span></div>`;}
function mtBind(f,v,onCh){let ref=v.ref||'';
 const rr=()=>{const t=f.lk.value;$('#mtRef').innerHTML=t==='jornada'?`<span class="selw" style="margin-top:8px"><select id="mtR">${JORNS.map(j=>`<option value="${j.id}" ${ref===j.id?'selected':''}>${esc(j.n)}</option>`).join('')}</select>${ic('updown',14)}</span>`:t==='curso'?`<span class="selw" style="margin-top:8px"><select id="mtR">${csAll().map(r=>`<option value="${r.c.id}" ${ref===r.c.id?'selected':''}>${esc(r.c.n)}</option>`).join('')}</select>${ic('updown',14)}</span>`:t==='outro'?`<input id="mtR" style="margin-top:8px" value="${esc(ref)}" placeholder="Ex.: Retiro de Jovens">`:'';const r=$('#mtR');if(r){ref=r.value;r.addEventListener('input',()=>{ref=r.value;onCh&&onCh();});r.addEventListener('change',()=>{ref=r.value;onCh&&onCh();});}};
 $$('[name=lk]',f).forEach(x=>x.addEventListener('change',()=>{ref='';rr();onCh&&onCh();}));rr();
 let mv=v.min?1:0;$$('[data-mv]',f).forEach(b=>b.onclick=()=>{mv=+b.dataset.mv;$$('[data-mv]',f).forEach(x=>x.classList.toggle('on',x===b));$('#mtMinW').classList.toggle('ct-hide',!mv);onCh&&onCh();});
 return ()=>({lk:f.lk?.value||'',ref:$('#mtR')?.value||'',min:mv?f.min.value:''});}
function mtForm(){openDlg(`${dlgHead('Novo material','Depois você envia os arquivos — sem limite de quantidade.')}<form id="mtF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Título</span><input name="t" autocomplete="off" placeholder="Ex.: Guia do Líder de Casa"></label>
  <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="2"></textarea></label>
  ${mtLinkFields({lk:'',min:''})}
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" disabled>Criar e enviar arquivos</button></div></form>`,'lg');
 const f=$('#mtF'),ok=f.querySelector('[type=submit]'),get=mtBind(f,{lk:''});f.addEventListener('input',()=>ok.disabled=!f.t.value.trim());setTimeout(()=>f.t.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const g=get(),m=MTR(f.t.value.trim(),f.desc.value.trim(),NOWD,g.lk||'outro',g.ref,[],g.min);m.dl=0;MATS.push(m);closeDlg();S.mat=m.id;ctGo();toast('Material criado — envie os arquivos');},600);});}
function mtEdit(){const m=MATS.find(x=>x.id===S.mat);if(!m){S.mat=null;return mtPage();}
 return `<nav class="crumb rise"><span class="soft">Conteúdo</span>${ic('chevR',13,2)}<button class="lnk back" data-a="mtBack">Material de apoio</button>${ic('chevR',13,2)}<span>${esc(m.t)}</span></nav>
 <header class="ph rise" style="--d:1"><div><h1 id="mtH">${esc(m.t)}</h1><p class="lede">${m.files.length} arquivo${m.files.length===1?'':'s'} · ${m.dl} downloads no mês</p></div><div class="pact"><span class="who" id="mtSv">As alterações salvam sozinhas</span></div></header>
 <div class="ct-ed rise" style="--d:2"><section class="card ct-ef"><h2>Sobre o material</h2><form id="mtE" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(m.t)}"></label>
  <label class="fld wide"><span class="fl">Descrição</span><textarea class="ta" name="desc" rows="3">${esc(m.desc)}</textarea></label>
  <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${m.d}"></label>
  <label class="fld wide"><span class="fl">Link <small>opcional</small></span><span class="mt-url"><span class="cm-pre">${ic('link',14)}<input name="url" value="${esc(m.url)}" placeholder="https://"></span><button type="button" class="btn sec sm" data-a="mtLinkOpen" title="Abrir link">${ic('arrowR',13,2)}Abrir</button></span></label>
  ${mtLinkFields(m)}</form><div class="ct-danger"><button class="btn ghostd" data-a="mtDel" data-v="${m.id}">Excluir material</button></div></section>
  <aside class="ct-side"><section class="card ct-files"><div class="sh"><h2>${ic('file',15)} Arquivos</h2>${m.files.length?`<button class="btn ghost sm" data-a="mtDl" data-v="${m.id}">${ic('arrowDn',13,2)}Baixar tudo</button>`:''}</div>
   <div id="mtFl">${mtFiles(m)}</div></section></aside></div>`;
}
const mtFiles=m=>`${m.files.map((f,i)=>`<div class="ct-file">${fTile(f.n,38)}<span class="dkt"><b>${esc(f.n)}</b><span>${fSize(f.kb)}</span></span><button class="ibtn sm" data-a="mtFDl" data-v="${i}" aria-label="Baixar">${ic('arrowDn',13,2)}</button><button class="ibtn sm" data-a="mtFDel" data-v="${i}" aria-label="Remover">${ic('x',13)}</button></div>`).join('')}<div class="ct-drop" data-a="mtUp" style="margin-top:${m.files.length?8:0}px">${ic('upload',18)}<span><b>${m.files.length?'Adicionar mais arquivos':'Envie os arquivos'}</b><small>PDF, Word, Excel, PowerPoint — sem limite de quantidade</small></span></div>`;
function mtAfter(){const q=$('#mtq');if(q)q.addEventListener('input',e=>{S.mtq=e.target.value;const c=e.target.selectionStart;ctRe();const n=$('#mtq');n.focus();n.setSelectionRange(c,c);});
 const m=S.mat&&MATS.find(x=>x.id===S.mat),f=$('#mtE');if(!m||!f)return;let t;
 const sv=()=>{clearTimeout(t);$('#mtSv').textContent='Salvando…';t=setTimeout(()=>{const g=get();Object.assign(m,{t:f.t.value.trim()||m.t,desc:f.desc.value.trim(),d:f.d.value||m.d,url:f.url.value.trim(),lk:g.lk||m.lk,ref:g.ref,min:g.min});$('#mtH').textContent=m.t;$('.crumb>span:last-child').textContent=m.t;$('#mtSv').innerHTML=`${ic('check',13,2.4)} Salvo`;},500);};
 const get=mtBind(f,m,sv);f.addEventListener('input',sv);}
Object.assign(CTA,{
 mtLinkOpen:()=>{const u=$('#mtE [name=url]').value.trim();if(!u){toast('Cole um link primeiro');return;}window.open(/^https?:/.test(u)?u:'https://'+u,'_blank','noopener');},
 mtNew:()=>mtForm(),mtOpen:(v,b,e)=>{if(e&&e.target.closest('.mt-dl'))return;S.mat=v;ctGo();},mtBack:()=>{S.mat=null;ctGo();},mtF:v=>{S.mtf=v;ctRe();},
 mtDl:(v,b)=>{const m=MATS.find(x=>x.id===v);if(!m.files.length){toast('Este material ainda não tem arquivos');return;}m.dl++;toast(m.files.length>1?`Baixando ${m.files.length} arquivos (.zip)`:`Baixando ${m.files[0].n}`);},
 mtFDl:v=>{const m=MATS.find(x=>x.id===S.mat);toast(`Baixando ${m.files[+v].n}`);},
 mtUp:()=>{const m=MATS.find(x=>x.id===S.mat),nm=['Slides','Roteiro','Planilha','Apostila'][m.files.length%4],ex=['pptx','pdf','xlsx','pdf'][m.files.length%4];m.files.push({n:`${nm}-${m.t.split(' ')[0]}.${ex}`,kb:300+m.files.length*410});$('#mtFl').innerHTML=mtFiles(m);toast('Arquivo enviado');},
 mtFDel:v=>{const m=MATS.find(x=>x.id===S.mat),f=m.files.splice(+v,1)[0];$('#mtFl').innerHTML=mtFiles(m);toast(`${f.n} removido`,()=>{m.files.splice(+v,0,f);$('#mtFl').innerHTML=mtFiles(m);});},
 mtDel:v=>{const m=MATS.find(x=>x.id===v);confirmDel({title:'Excluir este material?',body:`“${esc(m.t)}” e ${m.files.length} arquivo${m.files.length===1?'':'s'} saem do app.`,onConfirm:()=>{const i=MATS.indexOf(m);MATS.splice(i,1);S.mat=null;ctGo();toast('Material excluído',()=>{MATS.splice(i,0,m);ctRe();});}});},
});

/* ================= Financeiro ================= */
const R$=(v,sign)=>`${sign&&v>0?'+':''}${v<0?'−':''}R$ ${Math.abs(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const R0=v=>`R$ ${Math.round(v).toLocaleString('pt-BR')}`;
const FCATS={'Dízimos':['ceu','e'],'Ofertas':['menta','e'],'Doações':['lima','e'],'Inscrições':['salvia','e'],'Estrutura':['damasco','s'],'Comunicação':['rosado','s'],'Manutenção':['salvia','s'],'Missões':['lima','s'],'Ministérios':['menta','s']};
const catTag=c=>{const t=(FCATS[c]||['salvia'])[0];return `<span class="fi-cat" style="--t:var(--tone-${t});--ti:var(--tone-${t}-ink)">${esc(c)}</span>`;};
let _lid=0;const LC=(d,comp,desc,cat,tipo,v,st='ok',who='Rafael Pereira')=>({id:'lc'+(++_lid),d,comp,desc,cat,tipo,v,st,who});
const LANCS=[
 LC('2026-09-17','2026-09','Dízimos e Ofertas — Culto Dom','Dízimos','e',12480),
 LC('2026-09-15','2026-09','Pagamento fornecedor gráfica','Comunicação','s',890),
 LC('2026-09-14','2026-09','Aluguel do salão','Estrutura','s',3200),
 LC('2026-09-12','2026-09','Campanha Retiro Jovens','Doações','e',5300),
 LC('2026-09-10','2026-09','Material de limpeza','Manutenção','s',340),
 LC('2026-09-07','2026-09','Dízimos e Ofertas — Culto Dom','Dízimos','e',11920),
 LC('2026-09-05','2026-08','Manutenção ar-condicionado','Manutenção','s',1200),
 LC('2026-09-29','2026-09','Oferta missionária — Culto de quarta','Ofertas','e',1860,'pend','Larissa Pires'),
];
const FLOW=[['Abr',24800,6100],['Mai',27300,7900],['Jun',24100,5600],['Jul',28900,8200],['Ago',30200,6900],['Set',29700,4430]];
let _pid2=0;const CP=(desc,venc,v,cat,paid=false)=>({id:'cp'+(++_pid2),desc,venc,v,cat,paid});
const PAGAR=[CP('Energia elétrica','2026-09-28',640,'Estrutura'),CP('Fornecedor gráfica — banners','2026-09-30',890,'Comunicação'),CP('Aluguel do salão — Outubro','2026-10-05',3200,'Estrutura'),CP('Internet e telefonia','2026-10-08',289,'Estrutura'),CP('Seguro do prédio','2026-10-20',1150,'Estrutura'),CP('Material de limpeza','2026-09-10',340,'Manutenção',true)];
const RECEB=[{id:'cr1',desc:'Inscrições — Retiro de Jovens 2026',prev:'2026-09-27',v:10440,got:10440,src:'Inscrições no app'},{id:'cr2',desc:'Campanha Reforma do Templo',prev:'',v:80000,got:34200,src:'Asaas · contínuo'},{id:'cr3',desc:'Conferência Missões — inscrições',prev:'2026-10-09',v:4800,got:1900,src:'Inscrições no app'}];
let _aid=0;const AP=(tipo,desc,v,d,who,extra={})=>({id:'ap'+(++_aid),tipo,desc,v,d,who,...extra});
const APROVS=[
 AP('imp','Extrato Bradesco (OFX)',null,'2026-09-17','Rafael Pereira',{n:18,ent:14,sai:4,te:21340,ts:3870,rows:[['16/09','PIX recebido — M. Souza','Dízimos','e',350],['16/09','PIX recebido — A. C. Lima','Dízimos','e',500],['15/09','Boleto Enel','Estrutura','s',640],['15/09','TED recebida — campanha','Doações','e',1200],['14/09','Pag. Gráfica Rápida','Comunicação','s',890]]}),
 AP('lanc','Oferta missionária — Culto de quarta',1860,'2026-09-29','Larissa Pires',{tp:'e',cat:'Ofertas',lid:'lc8'}),
];
let _cid2=0;const CMP=(n,meta,got,st='ativo',donors=[])=>({id:'cm'+(++_cid2),n,meta,got,st,donors,link:st==='ativo'?'asaas.com/c/'+n.toLowerCase().replace(/\s+/g,'-').normalize('NFD').replace(/[̀-ͯ]/g,''):''});
const CAMPS=[CMP('Retiro de Jovens 2026',15000,8420,'ativo',[['Marcos Souza Ramos',500,'2026-09-28','Cartão'],['Ana Clara Lima',250,'2026-09-27','PIX'],['Anônimo',1000,'2026-09-25','PIX'],['Helena Duarte',120,'2026-09-22','Boleto']]),CMP('Reforma do Templo',80000,34200,'ativo',[['Família Teixeira',5000,'2026-09-29','PIX',1],['Ana Clara Lima',200,'2026-09-15','PIX'],['Marcos Souza Ramos',500,'2026-09-14','Cartão'],['Carlos Eduardo Silva',800,'2026-09-26','Boleto'],['Anônimo',100,'2026-09-12','PIX']]),CMP('Missões 2026',20000,20000,'concluido',[['Igreja parceira — Alva Norte',8000,'2026-08-10','PIX',1]])];
Object.assign(S,{lf:'todos',lq:'',fbar:5,relM:'2026-09',fbank:'bb',ffile:null,apOpen:null,camp:null,ctab2:'pag'});
const monthName=ym=>{const [y,m]=ym.split('-');return MONTHS[+m-1][0].toUpperCase()+MONTHS[+m-1].slice(1)+'/'+y;};
const compTxt=ym=>{const [y,m]=ym.split('-');return MONTHS[+m-1].slice(0,3).replace(/^./,c=>c.toUpperCase())+'/'+y;};
const okL=()=>LANCS.filter(l=>l.st==='ok'&&l.comp==='2026-09');
const sumT=(l,t)=>l.filter(x=>x.tipo===t).reduce((a,x)=>a+x.v,0);
const fHead=(t,lede,act='')=>`<header class="ph rise"><div><p class="eb">Financeiro</p><h1>${t}</h1><p class="lede">${lede}</p></div><div class="pact">${act}</div></header>`;
const dDays=iso=>Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);

/* ---------- Visão geral ---------- */
function fVis(){
 const l=okL(),late=PAGAR.filter(p=>!p.paid&&dDays(p.venc)<0),soon=PAGAR.filter(p=>!p.paid&&dDays(p.venc)>=0&&dDays(p.venc)<=7);
 const f=FLOW[S.fbar],cur=S.fbar===FLOW.length-1,e=f[1],s=f[2],sal=e-s,prev=FLOW[S.fbar-1],de=prev?Math.round((e/prev[1]-1)*100):null,ds=prev?Math.round((s/prev[2]-1)*100):null;
 const mx=Math.max(...FLOW.map(x=>x[1])),W=600,H=190,bw=W/FLOW.length,sy=v=>H-v/mx*H;
 const pts=FLOW.map((x,i)=>[i*bw+bw/2,sy(x[1]-x[2])]);
 const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
 const cats={};l.forEach(x=>{cats[x.cat]=cats[x.cat]||{e:0,s:0};cats[x.cat][x.tipo]+=x.v;});
 const E=sumT(l,'e'),Sx=sumT(l,'s'),ent=Object.entries(cats).filter(c=>c[1].e).sort((a,b)=>b[1].e-a[1].e),sai=Object.entries(cats).filter(c=>c[1].s).sort((a,b)=>b[1].s-a[1].s);
 const tone=c=>(FCATS[c]||['salvia'])[0];
 const seg=(c,v,tot,kind)=>`<span class="fv-sg ${kind} ${v/tot<.13?'sm':''}" style="flex:${v};--t:var(--tone-${tone(c)});--ti:var(--tone-${tone(c)}-ink)" title="${esc(c)} · ${R0(v)}"><b>${esc(c)}</b><small>${R0(v)} · ${Math.round(v/tot*100)}%</small></span>`;
 const pct=v=>v==null?'':`<small class="${v>=0?'up':'dn'}">${ic(v>=0?'arrowUp':'arrowDn',11,2.4)}${Math.abs(v)}%</small>`;
 return fHead('Visão geral','Como está o caixa da igreja',`<button class="btn sec" data-a="nav" data-v="frel">${ic('file',15)}Relatórios</button><button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +`<section class="card fv-hero rise" style="--d:1">
  <div class="fv-now"><span class="kl">Saldo de ${MONTHS[['Abr','Mai','Jun','Jul','Ago','Set'].indexOf(f[0])+3]}${cur?' · mês atual':''}</span><b class="fi-big ${sal<0?'neg':''}" id="fvSal">${R$(sal)}</b>
   <div class="fv-io"><div><span><i class="e"></i>Entrou</span><b>${R$(e)}</b>${pct(de)}</div><div><span><i class="s"></i>Saiu</span><b>${R$(s)}</b>${pct(ds)}</div></div>
   <div class="fv-keep"><span class="tr"><i style="width:${Math.max(0,sal/e*100)}%"></i></span><span>Ficaram <b>${Math.round(sal/e*100)}%</b> de cada real que entrou</span></div></div>
  <div class="fv-chart"><div class="fv-ch"><span class="fl">Últimos 6 meses</span><div class="fi-leg"><span><i class="e"></i>Entradas</span><span><i class="s"></i>Saídas</span><span><i class="ln"></i>Saldo</span></div></div>
   <div class="fv-plot"><div class="fv-cols">${FLOW.map((x,i)=>`<button class="fv-col ${i===S.fbar?'on':''}" data-a="fBar" data-v="${i}" aria-label="${x[0]}"><span class="fi-bars"><i class="e" style="height:${x[1]/mx*100}%;--i:${i}"></i><i class="s" style="height:${x[2]/mx*100}%;--i:${i}"></i></span><small>${x[0]}</small></button>`).join('')}</div>
    <svg class="fv-line" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${path}" pathLength="1"/></svg>
    <div class="fv-dots">${pts.map((p,i)=>`<i class="${i===S.fbar?'on':''}" style="left:${p[0]/W*100}%;top:${p[1]/H*100}%"></i>`).join('')}</div></div></div></section>
 <div class="fv-act rise" style="--d:2">
  <button class="card fv-a ${late.length?'bad':'ok'}" data-a="nav" data-v="fpag"><span class="fv-ai">${ic('clock',18)}</span><b class="fv-an">${late.length}</b><span class="fv-at"><b>conta${late.length===1?'':'s'} atrasada${late.length===1?'':'s'}</b><span>${late.length?R$(late.reduce((a,p)=>a+p.v,0)):'Tudo em dia'}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a wait" data-a="nav" data-v="fpag"><span class="fv-ai">${ic('calendar',18)}</span><b class="fv-an">${soon.length}</b><span class="fv-at"><b>vence${soon.length===1?'':'m'} em 7 dias</b><span>${R$(soon.reduce((a,p)=>a+p.v,0))}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a brand" data-a="nav" data-v="fapr"><span class="fv-ai">${ic('check',18,2.2)}</span><b class="fv-an">${APROVS.length}</b><span class="fv-at"><b>aguardando aprovação</b><span>${APROVS.length?APROVS.map(a=>a.tipo==='imp'?'extrato':'lançamento').join(' + '):'Nada pendente'}</span></span>${ic('arrowR',15,2)}</button></div>
 <section class="card fv-flow rise" style="--d:3"><div class="sh"><div><h2>Para onde foi cada real de setembro</h2><p class="who" style="margin:4px 0 0">De ${R0(E)} que entraram, ${R0(Sx)} saíram — o resto ficou no caixa.</p></div><button class="btn ghost sm" data-a="nav" data-v="frel">Ver DRE ${ic('arrowR',13,2)}</button></div>
  <p class="fl fv-lb"><i class="e"></i>Entrou</p><div class="fv-bar">${ent.map(([c,v])=>seg(c,v.e,E,'in')).join('')}</div>
  <div style="height:16px"></div>
  <p class="fl fv-lb"><i class="s"></i>Saiu · e o que ficou</p><div class="fv-bar">${sai.map(([c,v])=>seg(c,v.s,E,'out')).join('')}<span class="fv-sg keep" style="flex:${E-Sx}"><b>Ficou no caixa</b><small>${R0(E-Sx)} · ${Math.round((E-Sx)/E*100)}%</small></span></div>
  <div class="fv-key">${sai.map(([c,v])=>`<span><i style="background:var(--tone-${tone(c)})"></i>${esc(c)} <b>${R0(v.s)}</b></span>`).join('')}</div></section>`;
}
/* ---------- Lançamentos ---------- */
function fLanc(){
 const q=norm(S.lq),all=LANCS.slice().sort((a,b)=>a.d<b.d?1:-1),l=all.filter(x=>(S.lf==='todos'||(S.lf==='pend'?x.st==='pend':x.tipo===S.lf&&x.st==='ok'))&&(!q||norm(x.desc+' '+x.cat).includes(q))),ok=okL();
 return fHead('Lançamentos','Entradas e saídas do caixa',`<button class="btn sec" data-a="export" data-v="os lançamentos (CSV)">Exportar CSV</button><button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Entradas em setembro</span><span class="kv" style="color:var(--st-int)">${R$(sumT(ok,'e'))}</span><span class="kd">${ok.filter(x=>x.tipo==='e').length} lançamentos</span></div><div class="k4"><span class="kl">Saídas em setembro</span><span class="kv" style="color:var(--st-rec)">${R$(sumT(ok,'s'))}</span><span class="kd">${ok.filter(x=>x.tipo==='s').length} lançamentos</span></div><div class="k4"><span class="kl">Saldo</span><span class="kv">${R$(sumT(ok,'e')-sumT(ok,'s'))}</span><span class="kd">competência set/2026</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv" style="${LANCS.some(x=>x.st==='pend')?'color:var(--st-sol)':''}">${LANCS.filter(x=>x.st==='pend').length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="lq" placeholder="Buscar descrição ou categoria" value="${esc(S.lq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos'],['e','Entradas'],['s','Saídas'],['pend','Aguardando']].map(c=>`<button class="chipf ${S.lf===c[0]?'on':''}" data-a="lcF" data-v="${c[0]}">${c[0]==='e'?'<i style="background:var(--st-int)"></i>':c[0]==='s'?'<i style="background:var(--st-rec)"></i>':''}${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="trow lc thead"><span>Lançamento</span><span>Categoria</span><span>Competência</span><span>Valor</span><span></span></div>${l.map(x=>`<div class="trow lc ${x.st==='pend'?'pend':''}" tabindex="0" data-a="lcEdit" data-v="${x.id}">
   <span class="tn"><span class="fi-dir ${x.tipo}">${ic(x.tipo==='e'?'arrowDn':'arrowUp',15,2.2)}</span><span class="hn"><b>${esc(x.desc)}</b><span>${dBR(x.d)}${x.st==='pend'?` · <span class="fi-pend">${ic('clock',11)}aguardando aprovação</span>`:''}</span></span></span>
   <span class="lc-c">${catTag(x.cat)}</span><span class="lc-m">${compTxt(x.comp)}</span>
   <span class="lc-v ${x.tipo}">${R$(x.tipo==='e'?x.v:-x.v,true)}</span>
   <span class="hact" style="position:relative"><button class="ibtn sm" data-a="lcMenu" data-v="${x.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="lcPop-${x.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="lcEdit" data-v="${x.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="lcDup" data-v="${x.id}">${ic('copy',16)}Duplicar</button><hr><button class="pi danger" data-a="lcDel" data-v="${x.id}">${ic('x',16)}Excluir</button></div></span></div>`).join('')}`:'<div class="mempty"><p>Nenhum lançamento aqui.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} lançamento${l.length===1?'':'s'}</span><span>Saldo do filtro <b>${R$(l.filter(x=>x.st==='ok').reduce((a,x)=>a+(x.tipo==='e'?x.v:-x.v),0))}</b></span></div></section>`;
}
function lcForm(id){const x=id?LANCS.find(y=>y.id===id):null,v=x?{...x}:{tipo:'e',desc:'',cat:'',v:'',comp:'2026-09',d:NOWD};
 openDlg(`${dlgHead(x?'Editar lançamento':'Novo lançamento',x?(x.st==='pend'?'Ainda aguardando aprovação.':`Lançado por ${esc(x.who)}`):'')}
  ${x?'':`<p class="fi-note">${ic('info',14)}<span>Entra como <b>pendente de aprovação</b> e só passa a contar no saldo depois que alguém com alçada aprovar.</span></p>`}
  <form id="lcF" class="fgrid" novalidate>
   <div class="fld wide"><div class="fi-tg"><button type="button" data-tp="e" class="${v.tipo==='e'?'on':''}">${ic('arrowDn',15,2.2)}Entrada</button><button type="button" data-tp="s" class="${v.tipo==='s'?'on':''}">${ic('arrowUp',15,2.2)}Saída</button></div></div>
   <label class="fld wide fi-val"><span class="fl">Valor</span><span class="fi-amt"><em>R$</em><input name="v" inputmode="decimal" value="${v.v?String(v.v).replace('.',','):''}" placeholder="0,00" autocomplete="off"></span></label>
   <label class="fld wide"><span class="fl">Descrição</span><input name="desc" value="${esc(v.desc)}" placeholder="Ex.: Dízimos e ofertas — culto de domingo" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Categoria</span><div class="fi-cats2" id="lcC"></div></div>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${v.d}"></label>
   <label class="fld"><span class="fl">Competência</span><input type="month" name="comp" value="${v.comp}"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="lcOk">${x?'Salvar':'Enviar para aprovação'}</button></div></form>`);
 const f=$('#lcF'),ok=$('#lcOk');let tp=v.tipo,cat=v.cat;
 const rc=()=>{$('#lcC').innerHTML=Object.entries(FCATS).filter(c=>c[1][1]===tp).map(([c,t])=>`<button type="button" class="${c===cat?'on':''}" data-c="${esc(c)}" style="--t:var(--tone-${t[0]});--ti:var(--tone-${t[0]}-ink)">${esc(c)}</button>`).join('');$$('#lcC button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;rc();chk();});};
 const val=()=>+String(f.v.value).replace(/\./g,'').replace(',','.')||0;
 const chk=()=>{ok.disabled=!(val()>0)||!f.desc.value.trim()||!cat;f.querySelector('.fi-amt').className='fi-amt '+tp;};
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{tp=b.dataset.tp;$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y===b));if(!FCATS[cat]||FCATS[cat][1]!==tp)cat='';rc();chk();});
 f.addEventListener('input',chk);rc();chk();setTimeout(()=>f.v.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={tipo:tp,v:val(),desc:f.desc.value.trim(),cat,d:f.d.value||NOWD,comp:f.comp.value||'2026-09'};
  if(x){Object.assign(x,o);const a=APROVS.find(a=>a.lid===x.id);if(a)Object.assign(a,{desc:o.desc,v:o.v,tp:o.tipo,cat:o.cat});closeDlg();fRe();toast('Lançamento atualizado');}
  else{const n=LC(o.d,o.comp,o.desc,o.cat,o.tipo,o.v,'pend');LANCS.push(n);APROVS.push(AP('lanc',o.desc,o.v,o.d,'Rafael Pereira',{tp:o.tipo,cat:o.cat,lid:n.id}));closeDlg();fRe();toast('Enviado para aprovação',()=>{LANCS.splice(LANCS.indexOf(n),1);APROVS.splice(APROVS.findIndex(a=>a.lid===n.id),1);fRe();});}},600);});}

/* ---------- Contas a pagar ---------- */
function fPag(){
 const open=PAGAR.filter(p=>!p.paid).sort((a,b)=>a.venc<b.venc?-1:1),late=open.filter(p=>dDays(p.venc)<0),wk=open.filter(p=>dDays(p.venc)>=0&&dDays(p.venc)<=7),lt=open.filter(p=>dDays(p.venc)>7),paid=PAGAR.filter(p=>p.paid);
 const grp=(t,l,cls)=>l.length?`<div class="fi-grp ${cls}"><p class="fi-gh"><b>${t}</b><span>${l.length} · ${R$(l.reduce((a,p)=>a+p.v,0))}</span></p>${l.map(p=>{const d=dDays(p.venc);return `<div class="fi-bill" id="${p.id}"><span class="fi-due ${cls}"><b>${+p.venc.slice(8)}</b><small>${MONTHS[+p.venc.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(p.desc)}</b><span>${catTag(p.cat)} <span class="${cls==='late'?'fi-latetx':''}">${d<0?`venceu há ${-d} dia${d===-1?'':'s'}`:d===0?'vence hoje':`vence ${relD(p.venc)}`}</span></span></span><b class="fi-amt2">${R$(p.v)}</b><button class="btn ${cls==='late'?'pri':'sec'} sm" data-a="cpPay" data-v="${p.id}">${ic('check',14,2.4)}Marcar como paga</button></div>`;}).join('')}</div>`:'';
 return fHead('Contas a pagar','O que a igreja precisa pagar e quando',`<button class="btn sec" data-a="export" data-v="as contas a pagar (CSV)">Exportar CSV</button><button class="btn pri" data-a="cpNew">${ic('plus',15,2.2)}Nova conta</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Em aberto</span><span class="kv">${R$(open.reduce((a,p)=>a+p.v,0))}</span><span class="kd">${open.length} contas</span></div><div class="k4"><span class="kl">Atrasadas</span><span class="kv" style="${late.length?'color:var(--st-rec)':''}">${late.length}</span><span class="kd">${late.length?R$(late.reduce((a,p)=>a+p.v,0)):'nenhuma'}</span></div><div class="k4"><span class="kl">Próximos 7 dias</span><span class="kv" style="color:var(--st-sol)">${wk.length}</span><span class="kd">${R$(wk.reduce((a,p)=>a+p.v,0))}</span></div><div class="k4"><span class="kl">Pagas no mês</span><span class="kv">${paid.length}</span><span class="kd">${R$(paid.reduce((a,p)=>a+p.v,0))}</span></div></section>
 <section class="card fi-bills rise" style="--d:2">${open.length?grp('Atrasadas',late,'late')+grp('Próximos 7 dias',wk,'soon')+grp('Depois',lt,'later'):'<div class="mempty"><p>Tudo pago 🎉</p><span>Nenhuma conta em aberto.</span></div>'}
  ${paid.length?`<details class="fi-paid"><summary>${ic('check',13,2.4)}${paid.length} paga${paid.length===1?'':'s'} este mês</summary>${paid.map(p=>`<div class="fi-bill done"><span class="fi-due"><b>${+p.venc.slice(8)}</b><small>${MONTHS[+p.venc.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(p.desc)}</b><span>${catTag(p.cat)}</span></span><b class="fi-amt2">${R$(p.v)}</b><button class="btn ghost sm" data-a="cpUnpay" data-v="${p.id}">Desfazer</button></div>`).join('')}</details>`:''}</section>`;
}
function cpForm(){openDlg(`${dlgHead('Nova conta a pagar','Ela aparece na lista e avisamos 2 dias antes do vencimento.')}<form id="cpF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Descrição</span><input name="desc" placeholder="Ex.: Energia elétrica — outubro" autocomplete="off"></label>
  <label class="fld"><span class="fl">Valor</span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
  <label class="fld"><span class="fl">Vencimento</span><input type="date" name="venc" value="${addD(NOWD,7)}"></label>
  <label class="fld wide"><span class="fl">Categoria</span><span class="selw"><select name="cat">${Object.entries(FCATS).filter(c=>c[1][1]==='s').map(c=>`<option>${c[0]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="tog wide"><input type="checkbox" name="rec"><span class="sw"></span><span><b>Repete todo mês</b><small>Criamos a próxima automaticamente quando esta for paga</small></span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Adicionar conta</button></div></form>`);
 const f=$('#cpF'),ok=f.querySelector('[type=submit]'),val=()=>+String(f.v.value).replace(/\./g,'').replace(',','.')||0;f.addEventListener('input',()=>ok.disabled=!f.desc.value.trim()||!(val()>0)||!f.venc.value);setTimeout(()=>f.desc.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;PAGAR.push(CP(f.desc.value.trim(),f.venc.value,val(),f.cat.value));closeDlg();fRe();toast('Conta adicionada');});}

/* ---------- Contas a receber ---------- */
function fRec(){
 const tot=RECEB.reduce((a,r)=>a+r.v,0),got=RECEB.reduce((a,r)=>a+r.got,0);
 return fHead('Contas a receber','Valores previstos de entrada — inscrições e campanhas',`<button class="btn sec" data-a="export" data-v="as contas a receber (CSV)">Exportar CSV</button>`)
 +`<section class="card fi-rh rise" style="--d:1"><div><span class="kl">Já recebido</span><b class="fi-big">${R$(got)}</b><span class="kd">de ${R$(tot)} previstos · ${Math.round(got/tot*100)}%</span></div><div class="fi-rbar"><i style="width:${got/tot*100}%"></i></div><div class="fi-two"><div><span><i class="e"></i>Recebido</span><b>${R$(got)}</b></div><div><span><i class="w"></i>Falta receber</span><b>${R$(tot-got)}</b></div><div><span>Confirmadas</span><b>${RECEB.filter(r=>r.got>=r.v).length} de ${RECEB.length}</b></div></div></section>
 <div class="fi-recs rise" style="--d:2">${RECEB.map(r=>{const p=Math.min(100,Math.round(r.got/r.v*100)),done=p>=100;return `<article class="card fi-rc"><div class="fi-rch"><span class="dkt"><b>${esc(r.desc)}</b><span>${esc(r.src)}</span></span>${done?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmado</span>':'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Parcial</span>'}</div>
  <div class="fi-rcv"><b>${R$(r.got)}</b><span>de ${R$(r.v)}</span></div><span class="tr ${done?'done':''}"><i style="width:${p}%"></i></span>
  <footer><span>${r.prev?`${ic('calendar',12)}Previsão ${dBR(r.prev)}`:`${ic('clock',12)}Contínuo`}</span><span>${p}%</span></footer></article>`;}).join('')}</div>`;
}

/* ---------- Aprovações ---------- */
function fApr(){
 return fHead('Aprovações','Lançamentos e importações aguardando quem tem alçada',APROVS.length>1?`<button class="btn pri" data-a="apAll">${ic('check',15,2.4)}Aprovar todos (${APROVS.length})</button>`:'')
 +`<p class="fi-note rise" style="--d:1">${ic('shield',15)}<span>Todo lançamento manual e toda importação de extrato nasce aqui. Só depois de aprovado entra no saldo. Quem tem alçada também pode aprovar pelo app.</span></p>
 ${APROVS.length?`<div class="fi-aps rise" style="--d:2">${APROVS.map(a=>`<article class="card fi-ap" id="${a.id}"><div class="fi-aph"><span class="htile" style="--s:42px;background:${a.tipo==='imp'?'var(--st-sol-bg)':'var(--brand-soft)'};color:${a.tipo==='imp'?'var(--st-sol)':'var(--brand-text)'}">${ic(a.tipo==='imp'?'upload':a.tp==='e'?'arrowDn':'arrowUp',19,2)}</span>
   <span class="dkt"><span class="fi-apt">${a.tipo==='imp'?'Importação de extrato':'Lançamento manual'}</span><b>${esc(a.desc)}${a.tipo==='imp'?` — ${a.n} lançamentos`:''}</b><span>Enviado por ${esc(a.who)} · ${dBR(a.d)}</span></span>
   ${a.tipo==='imp'?`<span class="fi-apv"><b class="e">+${R0(a.te)}</b><b class="s">−${R0(a.ts)}</b></span>`:`<span class="fi-apv"><b class="${a.tp}">${R$(a.tp==='e'?a.v:-a.v,true)}</b>${catTag(a.cat)}</span>`}</div>
  ${a.tipo==='imp'?`<button class="fi-apx" data-a="apX" data-v="${a.id}">${ic('chevD',14,2)}${S.apOpen===a.id?'Esconder':'Ver'} os lançamentos (${a.ent} entradas, ${a.sai} saídas)</button>${S.apOpen===a.id?`<div class="fi-apr">${a.rows.map(r=>`<div><span>${r[0]}</span><span>${esc(r[1])}</span>${catTag(r[2])}<b class="${r[3]}">${R$(r[3]==='e'?r[4]:-r[4],true)}</b></div>`).join('')}<p class="who">+ ${a.n-a.rows.length} lançamentos · categorias sugeridas automaticamente</p></div>`:''}`:''}
  <footer><button class="btn ghostd sm" data-a="apNo" data-v="${a.id}">Rejeitar</button><button class="btn pri sm" data-a="apOk" data-v="${a.id}">${ic('check',14,2.4)}Aprovar</button></footer></article>`).join('')}</div>`
 :`<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>Tudo aprovado</h2><p>Quando alguém lançar algo ou importar um extrato, aparece aqui.</p></section>`}`;
}

/* ---------- Relatórios ---------- */
const REL0='2021-03',RELN='2026-09';
const ymAdd=(ym,n)=>{let [y,m]=ym.split('-').map(Number);m+=n;y+=Math.floor((m-1)/12);m=((m-1)%12+12)%12+1;return `${y}-${String(m).padStart(2,'0')}`;};
function relData(ym){const real=LANCS.filter(x=>x.st==='ok'&&x.comp===ym);if(real.length||ym>=RELN)return real;
 let h=0;for(const ch of ym)h=(h*31+ch.charCodeAt(0))%9973;const r=k=>{h=(h*9301+49297)%233280;return h/233280;};const yr=+ym.slice(0,4),g=1+(yr-2021)*.09,m=+ym.slice(5);
 const L=[['Dízimos','e',(19000+r()*5000)*g*(m===12?1.25:1)],['Ofertas','e',(1800+r()*1400)*g],['Doações','e',r()<.55?(1500+r()*5000)*g:0],['Estrutura','s',3000*g+r()*400],['Manutenção','s',200+r()*1300],['Comunicação','s',r()<.6?300+r()*900:0],['Missões','s',r()<.5?800+r()*1800:0],['Ministérios','s',400+r()*900]];
 return L.filter(x=>x[2]>0).map(x=>({cat:x[0],tipo:x[1],v:Math.round(x[2]/10)*10}));}
const mpRe=()=>{const o=$('#mpPop');o.outerHTML=mpick();const n=$('#mpPop');n.classList.add('open','mp-in');};
function mpick(){const [y]=S.relM.split('-').map(Number),yy=S.mpY||y,ny=+RELN.slice(0,4),oy=+REL0.slice(0,4);
 return `<div class="mp-pop pop" id="mpPop"><div class="mp-yh"><button class="ibtn sm" data-a="mpY" data-v="-1" ${yy<=oy?'disabled':''} aria-label="Ano anterior">${ic('chevL',14,2)}</button><button class="mp-yy" data-a="mpYears">${yy}${ic('chevD',13,2)}</button><button class="ibtn sm" data-a="mpY" data-v="1" ${yy>=ny?'disabled':''} aria-label="Próximo ano">${ic('chevR',14,2)}</button></div>
  ${S.mpYears?`<div class="mp-yrs">${Array.from({length:ny-oy+1},(_,i)=>oy+i).reverse().map(x=>`<button class="${x===yy?'on':''}" data-a="mpPickY" data-v="${x}">${x}</button>`).join('')}</div>`
  :`<div class="mp-grid">${MONTHS.map((n,i)=>{const ym=`${yy}-${String(i+1).padStart(2,'0')}`,dis=ym<REL0||ym>RELN;return `<button class="${ym===S.relM?'on':''} ${ym===RELN?'now':''}" data-a="relM" data-v="${ym}" ${dis?'disabled':''}>${n.slice(0,3)}</button>`;}).join('')}</div>`}
  <div class="mp-q">${[['Este mês',RELN],['Mês anterior',ymAdd(RELN,-1)],['Mesmo mês em '+(ny-1),ymAdd(RELN,-12)]].map(q=>`<button data-a="relM" data-v="${q[1]}" class="${S.relM===q[1]?'on':''}">${q[0]}</button>`).join('')}</div>
  <p class="mp-ft">${ic('clock',12)}Histórico desde ${monthName(REL0).toLowerCase()}</p></div>`;}
function fRel(){
 const l=relData(S.relM),cats={};l.forEach(x=>{cats[x.cat]=cats[x.cat]||{e:0,s:0};cats[x.cat][x.tipo]+=x.v;});
 const rows=Object.entries(cats).map(([c,v])=>[c,v.e,v.s,v.e-v.s]).sort((a,b)=>b[3]-a[3]),mx=Math.max(1,...rows.map(r=>Math.abs(r[3]))),e=sumT(l,'e'),s=sumT(l,'s');
 const ms=['2026-07','2026-08','2026-09'];
 return fHead('Relatórios','DRE por categoria e fluxo de caixa',`<button class="btn sec" data-a="export" data-v="o DRE (PDF)">${ic('file',15)}DRE (PDF)</button><button class="btn sec" data-a="export" data-v="o fluxo de caixa (CSV)">Fluxo de caixa (CSV)</button>`)
 +`<div class="fi-mbar rise" style="--d:1"><div class="mp"><button class="ibtn" data-a="relStep" data-v="-1" ${S.relM<=REL0?'disabled':''} aria-label="Mês anterior">${ic('chevL',16,2)}</button><div style="position:relative"><button class="mp-btn" data-a="mpMenu">${ic('calendar',16)}<b>${monthName(S.relM)}</b>${S.relM===RELN?'<em>mês atual</em>':''}${ic('chevD',14,2)}</button>${mpick()}</div><button class="ibtn" data-a="relStep" data-v="1" ${S.relM>=RELN?'disabled':''} aria-label="Próximo mês">${ic('chevR',16,2)}</button></div>${S.relM!==RELN?`<button class="lnk" data-a="relM" data-v="${RELN}">Voltar para o mês atual</button>`:''}</div>
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Resultado do mês</span><span class="kv" style="color:${e-s>=0?'var(--st-int)':'var(--st-rec)'}">${R$(e-s)}</span><span class="kd">receitas menos despesas</span></div><div class="k4"><span class="kl">Receitas</span><span class="kv">${R$(e)}</span><span class="kd">${rows.filter(r=>r[1]).length} categorias</span></div><div class="k4"><span class="kl">Despesas</span><span class="kv">${R$(s)}</span><span class="kd">${e?Math.round(s/e*100):0}% das receitas</span></div></section>
 <section class="card fi-dre rise" style="--d:2"><div class="sh"><h2>DRE por categoria · ${monthName(S.relM)}</h2></div>
  ${rows.length?`<div class="fi-dr thead"><span>Categoria</span><span>Entradas</span><span>Saídas</span><span>Resultado</span></div>${rows.map(r=>`<div class="fi-dr"><span>${catTag(r[0])}</span><span class="e">${r[1]?R$(r[1]):'—'}</span><span class="s">${r[2]?R$(r[2]):'—'}</span><span class="fi-net"><span class="fi-dv"><i class="${r[3]>=0?'p':'n'}" style="width:${Math.abs(r[3])/mx*50}%"></i></span><b class="${r[3]>=0?'e':'s'}">${R$(r[3],true)}</b></span></div>`).join('')}
  <div class="fi-dr tot"><span>Total</span><span class="e">${R$(e)}</span><span class="s">${R$(s)}</span><span class="fi-net"><span></span><b>${R$(e-s,true)}</b></span></div>`:'<div class="mempty"><p>Sem lançamentos aprovados neste mês.</p><span>Os dados de exemplo estão em setembro.</span></div>'}</section>`;
}

/* ---------- Importar/Exportar ---------- */
const BANKS=[['bb','Banco do Brasil','#f8d117','#1b3d8f'],['brad','Bradesco','#cc092f','#fff'],['itau','Itaú','#ec7000','#fff'],['cef','Caixa','#005ca9','#fff'],['nu','Nubank','#820ad1','#fff'],['outro','Outro banco','var(--surface-2)','var(--ink-muted)']];
function fImp(){const b=BANKS.find(x=>x[0]===S.fbank);
 return fHead('Importar e exportar','Extratos bancários entram para aprovação; relatórios saem em CSV')
 +`<div class="fi-io rise" style="--d:1"><section class="card fi-imp"><h2>${ic('upload',16)} Importar extrato</h2>
   <p class="fl">1. Banco</p><div class="fi-banks">${BANKS.map(x=>`<button class="${S.fbank===x[0]?'on':''}" data-a="fBank" data-v="${x[0]}"><span style="background:${x[2]};color:${x[3]}">${x[0]==='outro'?ic('building',14):x[1][0]}</span>${x[1]}</button>`).join('')}</div>
   <p class="fl">2. Arquivo</p>${S.ffile?`<div class="ct-file"><span class="mt-ft" style="--s:38px;height:38px;border-radius:10px;background:var(--st-sol-bg);color:var(--st-sol)">OFX</span><span class="dkt"><b>${esc(S.ffile)}</b><span>${b[1]} · 23 transações encontradas</span></span><button class="ibtn sm" data-a="fFileX" aria-label="Remover">${ic('x',13)}</button></div>`:`<div class="ct-drop" data-a="fFile">${ic('upload',18)}<span><b>Arraste o extrato aqui ou clique para escolher</b><small>OFX ou CSV exportado do internet banking</small></span></div>`}
   <div class="fi-impf"><span class="who">${ic('shield',13)} Entra como pendente em <button class="lnk" data-a="nav" data-v="fapr">Aprovações</button>. Lançamentos repetidos são ignorados.</span><button class="btn pri" data-a="fImport" ${S.ffile?'':'disabled'}>Importar</button></div></section>
  <section class="card fi-exp"><h2>${ic('arrowDn',16,2)} Exportar</h2>${[['Lançamentos','os lançamentos (CSV)',LANCS.length+' registros','layers'],['Contas a pagar','as contas a pagar (CSV)',PAGAR.length+' contas','clock'],['Contas a receber','as contas a receber (CSV)',RECEB.length+' previsões','wallet'],['DRE do mês','o DRE (PDF)','Setembro/2026','file']].map(x=>`<button class="fi-ex" data-a="export" data-v="${x[1]}"><span class="htile" style="--s:38px;background:var(--brand-soft);color:var(--brand-text)">${ic(x[3],17)}</span><span class="dkt"><b>${x[0]}</b><span>${x[2]}</span></span><em>${x[1].includes('PDF')?'PDF':'CSV'}</em></button>`).join('')}</section></div>`;
}

/* ---------- Doações ---------- */
const FORMA={PIX:['menta','zap'],'Cartão':['ceu','wallet'],Boleto:['damasco','file']};
const qrSvg=seed=>{let x=seed*9301+49297,c='';const n=21;for(let i=0;i<n;i++)for(let j=0;j<n;j++){const fin=(i<7&&j<7)||(i<7&&j>13)||(i>13&&j<7);let on;if(fin){const a=i>13?i-14:i,b=j>13?j-14:j;on=a===0||a===6||b===0||b===6||(a>1&&a<5&&b>1&&b<5);}else{x=(x*9301+49297)%233280;on=x/233280>.52;}if(on)c+=`<rect x="${j}" y="${i}" width="1" height="1"/>`;}return `<svg viewBox="-1 -1 23 23" class="fi-qr"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><g fill="#0b1f2e">${c}</g></svg>`;};
function cmDetail(){const c=CAMPS.find(x=>x.id===S.camp);if(!c){S.camp=null;return fDoa();}const p=Math.min(100,Math.round(c.got/c.meta*100)),act=c.st==='ativo',named=c.donors.filter(d=>d[0]!=='Anônimo'),pend=named.filter(d=>!d[4]);
 const by={};c.donors.forEach(d=>{by[d[3]]=(by[d[3]]||0)+d[1];});const tot=c.donors.reduce((a,d)=>a+d[1],0)||1;
 return `<nav class="crumb rise"><span class="soft">Financeiro</span>${ic('chevR',13,2)}<button class="lnk back" data-a="cmBack">Doações</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid fi-cdh">${ring(p,76,act?'var(--brand)':'var(--st-int)')}<div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(c.n)}</h1>${act?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativa</span>':'<span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>Concluída</span>'}</div><p><b style="color:var(--ink)">${R$(c.got)}</b> de ${R$(c.meta)} · ${act?`faltam ${R0(Math.max(0,c.meta-c.got))}`:'meta batida'}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="cmSt">${act?'Encerrar campanha':'Reabrir campanha'}</button><button class="ibtn" data-a="cmDel" data-v="${c.id}" aria-label="Excluir campanha" title="Excluir">${ic('x',16)}</button></div>
  <div class="ikpi hk"><div><b>${c.donors.length}</b><span>Contribuições</span></div><div><b>${R0(c.donors.length?tot/c.donors.length:0)}</b><span>Ticket médio</span></div><div><b>${named.length}</b><span>Doadores identificados</span></div><div><b>${named.filter(d=>d[4]).length}<small class="kof">/${named.length}</small></b><span>Informes enviados</span></div></div>
  <div class="ptabs" role="tablist">${[['pag','Pagamento'],['con','Contribuições',c.donors.length]].map(t=>`<button role="tab" class="${S.ctab2===t[0]?'on':''}" data-a="cmTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div></header>
 <div class="rise" style="--d:2">${S.ctab2==='pag'?`<div class="fi-pay"><section class="card fi-pl"><h2>${ic('link',15)} Link de pagamento</h2>${c.link?`<p class="who" style="margin:0 0 12px">Divulgue no app, nos banners e no WhatsApp. Gerado pelo Asaas.</p><button class="cm-url fi-big-url" data-a="cmCopy" data-v="${c.id}"><span>https://${esc(c.link)}</span><b>${ic('copy',14)}Copiar</b></button>
   <div class="fi-share">${[['message','WhatsApp'],['megaphone','Criar banner'],['bell','Enviar push']].map(x=>`<button class="btn sec sm" data-a="soon" data-v="${x[1]}">${ic(x[0],14)}${x[1]}</button>`).join('')}</div>`:`<p class="who">${act?'Esta campanha ainda não tem link de pagamento.':'Campanha encerrada — o link foi desativado.'}</p>${act?`<button class="btn pri" data-a="cmLink" data-v="${c.id}">${ic('link',14)}Gerar link de pagamento</button>`:''}`}
   <div class="fi-forms"><p class="fl">Por forma de pagamento</p>${Object.entries(FORMA).map(([k,v])=>`<div class="fi-cr"><span>${ic(v[1],13)} ${k}</span><b>${R0(by[k]||0)}</b><span class="tr"><i style="width:${(by[k]||0)/tot*100}%;background:var(--tone-${v[0]}-ink)"></i></span></div>`).join('')}</div></section>
  <section class="card fi-qrc"><h2>${ic('zap',15)} QR Code PIX</h2>${c.link?`<div class="fi-qrw">${qrSvg(c.id.length*7+(c.qr||0)*13+c.n.length)}</div><p class="who" style="text-align:center;margin:10px 0 12px">Para imprimir no boletim ou projetar no telão</p><div class="fi-share" style="justify-content:center"><button class="btn sec sm" data-a="soon" data-v="Download do QR Code">${ic('arrowDn',13,2)}Baixar PNG</button><button class="btn ghost sm" data-a="cmQr">Gerar novo</button></div>`:'<div class="fi-qrw off">'+ic('zap',28)+'</div><p class="who" style="text-align:center">Disponível depois de gerar o link</p>'}</section></div>
  <p class="fi-note" style="margin-top:16px">${ic('shield',15)}<span>PIX, cartão, recorrência e estorno são processados pelo Asaas — o Alva só reflete o status das contribuições.</span></p>`
 :`<section class="card mtab">${c.donors.length?`<div class="tbar" style="justify-content:space-between;align-items:center"><span class="who" style="margin:0 6px">${pend.length?`${pend.length} doador${pend.length===1?'':'es'} sem informe de doação`:'Todos os informes enviados'}</span>${pend.length?`<button class="btn pri sm" data-a="cmNotaAll">${ic('file',13)}Gerar ${pend.length} informe${pend.length===1?'':'s'}</button>`:''}</div>
  <div class="trow dn thead"><span>Doador</span><span>Forma</span><span>Valor</span><span>Informe de doação</span></div>${c.donors.map((d,i)=>{const an=d[0]==='Anônimo',f=FORMA[d[3]]||FORMA.PIX;return `<div class="trow dn"><span class="tn">${an?`<span class="av" style="background:var(--surface-2);color:var(--ink-soft)">${ic('user',14)}</span>`:avN(d[0])}<span class="hn"><b>${esc(d[0])}</b><span>${dBR(d[2])}</span></span></span>
   <span class="dn-f"><span class="fi-cat" style="--t:var(--tone-${f[0]});--ti:var(--tone-${f[0]}-ink)">${ic(f[1],11)} ${d[3]}</span></span><span class="dn-v e">${R$(d[1])}</span>
   <span class="dn-n">${an?'<span class="soft">Anônima — sem destinatário</span>':d[4]?`<span class="sp-ok">${ic('check',13,2.4)}Enviado</span><button class="btn ghost sm" data-a="soon" data-v="Informe em PDF">${ic('file',12)}PDF</button>`:`<button class="btn sec sm" data-a="cmNota" data-v="${i}">${ic('file',13)}Gerar informe</button>`}</span></div>`;}).join('')}
  <div class="tfoot"><span>${c.donors.length} contribuições</span><span>Total <b>${R$(tot)}</b></span></div>`:'<div class="mempty"><p>Nenhuma contribuição ainda.</p><span>Assim que alguém doar pelo link, aparece aqui.</span></div>'}</section>`}</div>`;}

function fDoa(){if(S.camp)return cmDetail();const act=CAMPS.filter(c=>c.st==='ativo'),got=CAMPS.reduce((a,c)=>a+c.got,0);
 return fHead('Doações','Campanhas de arrecadação com link de pagamento',`<button class="btn sec" data-a="export" data-v="as doações (CSV)">Exportar CSV</button><button class="btn pri" data-a="cmNew">${ic('plus',15,2.2)}Nova campanha</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Campanhas ativas</span><span class="kv">${act.length}</span><span class="kd">${CAMPS.length-act.length} concluída${CAMPS.length-act.length===1?'':'s'}</span></div><div class="k4"><span class="kl">Arrecadado</span><span class="kv" style="color:var(--st-int)">${R$(got)}</span><span class="kd">${ic('arrowUp',11,2.4)}18% vs trimestre anterior</span></div><div class="k4"><span class="kl">Falta nas ativas</span><span class="kv">${R$(act.reduce((a,c)=>a+Math.max(0,c.meta-c.got),0))}</span><span class="kd">para bater as metas</span></div></section>
 <div class="fi-camps rise" style="--d:2">${CAMPS.map(c=>{const p=Math.min(100,Math.round(c.got/c.meta*100)),done=c.st==='concluido';return `<article class="card fi-cm ${done?'done':''}" tabindex="0" data-a="cmOpen" data-v="${c.id}"><div class="fi-cmh"><b>${esc(c.n)}</b>${done?'<span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>Concluída</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativa</span>'}</div>
  <div class="fi-cmb">${ring(p,84,done?'var(--st-int)':'var(--brand)')}<div><b class="fi-cmv">${R$(c.got)}</b><span>de ${R$(c.meta)}</span><small>${done?'Meta batida':`Faltam ${R0(c.meta-c.got)}`} · ${c.donors.length} doações recentes</small></div></div>
  ${c.link?`<button class="cm-url" data-a="cmCopy" data-v="${c.id}" title="Copiar link de pagamento"><span>${esc(c.link)}</span>${ic('copy',14)}</button>`:done?'':`<button class="btn ghost sm" data-a="cmLink" data-v="${c.id}">${ic('link',13)}Gerar link de pagamento</button>`}
  <footer><button class="btn sec sm" data-a="cmView" data-v="${c.id}">Ver doações</button><button class="ibtn sm" data-a="cmDel" data-v="${c.id}" aria-label="Excluir campanha">${ic('x',14)}</button></footer></article>`;}).join('')}
  <button class="cm-badd" data-a="cmNew" style="min-height:270px"><span>${ic('plus',20,2)}</span><b>Nova campanha</b><small>Nome, meta e link de pagamento</small></button></div>`;}

function fAfter(){
 const q=$('#lq');if(q)q.addEventListener('input',e=>{S.lq=e.target.value;const c=e.target.selectionStart;fRe();const n=$('#lq');n.focus();n.setSelectionRange(c,c);});
}
const fGo=()=>{render();window.scrollTo({top:0});};
const fRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const FIA={
 fBar:v=>{S.fbar=+v;fRe();},
 lcNew:()=>lcForm(),lcEdit:(v,b,e)=>{if(e&&e.target.closest('.hact')&&!e.target.closest('.pi'))return;closePops();lcForm(v);},lcF:v=>{S.lf=v;fRe();},
 lcMenu:v=>{const p=$('#lcPop-'+v);closePops(p);p.classList.toggle('open');},
 lcDup:v=>{closePops();const x=LANCS.find(y=>y.id===v);lcForm();setTimeout(()=>{const f=$('#lcF');f.desc.value=x.desc;f.v.value=String(x.v).replace('.',',');$(`[data-tp=${x.tipo}]`).click();setTimeout(()=>{const b=$(`#lcC [data-c="${x.cat}"]`);b&&b.click();},20);},30);},
 lcDel:v=>{closePops();const x=LANCS.find(y=>y.id===v);confirmDel({title:'Excluir este lançamento?',body:`“${esc(x.desc)}” · ${R$(x.v)}. ${x.st==='ok'?'O saldo do mês será recalculado.':'Ele também sai das aprovações.'}`,onConfirm:()=>{const i=LANCS.indexOf(x),ai=APROVS.findIndex(a=>a.lid===x.id),ap=ai>=0?APROVS.splice(ai,1)[0]:null;LANCS.splice(i,1);fRe();toast('Lançamento excluído',()=>{LANCS.splice(i,0,x);if(ap)APROVS.splice(ai,0,ap);fRe();});}});},
 cpNew:()=>cpForm(),
 cpPay:(v,b)=>{const p=PAGAR.find(x=>x.id===v);busy(b,600,'Paga',()=>{const el=document.getElementById(v);el.classList.add('fi-gone');setTimeout(()=>{p.paid=true;LANCS.push(LC(NOWD,'2026-10',p.desc,p.cat,'s',p.v));fRe();toast(`${p.desc} paga · lançada como saída`,()=>{p.paid=false;LANCS.pop();fRe();});},350);});},
 cpUnpay:v=>{PAGAR.find(x=>x.id===v).paid=false;fRe();toast('Voltou para em aberto');},
 apX:v=>{S.apOpen=S.apOpen===v?null:v;fRe();},
 apOk:(v,b)=>{const a=APROVS.find(x=>x.id===v);busy(b,600,'Aprovado',()=>{document.getElementById(v).classList.add('fi-gone');setTimeout(()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l)l.st='ok';}fRe();toast(a.tipo==='imp'?`${a.n} lançamentos importados`:'Lançamento aprovado · já conta no saldo');},350);});},
 apNo:v=>{const a=APROVS.find(x=>x.id===v);openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Rejeitar?',`“${esc(a.desc)}” não entra no caixa. ${esc(a.who.split(' ')[0])} recebe o motivo.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="apWhy" rows="2" placeholder="Ex.: valor diferente do comprovante"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="apNoOk">Rejeitar</button></div>`,'sm del');
  $('#apNoOk').onclick=()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.lid){const i=LANCS.findIndex(x=>x.id===a.lid);if(i>=0)LANCS.splice(i,1);}closeDlg();fRe();toast('Rejeitado · motivo enviado');};},
 apAll:(v,b)=>busy(b,800,'Aprovados',()=>{const n=APROVS.length;APROVS.forEach(a=>{if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l)l.st='ok';}});APROVS.length=0;setTimeout(fRe,300);toast(`${n} itens aprovados`);}),
 relM:v=>{S.relM=v;S.mpY=null;S.mpYears=false;closePops();fRe();},
 relStep:v=>{const n=ymAdd(S.relM,+v);if(n<REL0||n>RELN)return;S.relM=n;S.mpY=null;fRe();},
 mpMenu:()=>{const p=$('#mpPop');const o=!p.classList.contains('open');closePops();if(o)p.classList.add('open');},
 mpY:(v,b,e)=>{e&&e.stopPropagation();S.mpY=(S.mpY||+S.relM.slice(0,4))+ +v;mpRe();},
 mpYears:(v,b,e)=>{e&&e.stopPropagation();S.mpYears=!S.mpYears;mpRe();},
 mpPickY:(v,b,e)=>{e&&e.stopPropagation();S.mpY=+v;S.mpYears=false;mpRe();},
 fBank:v=>{S.fbank=v;fRe();},fFile:()=>{S.ffile=`extrato-${S.fbank}-set2026.ofx`;fRe();},fFileX:()=>{S.ffile=null;fRe();},
 fImport:(v,b)=>busy(b,1000,'Importado',()=>{const bk=BANKS.find(x=>x[0]===S.fbank)[1];APROVS.push(AP('imp',`Extrato ${bk} (OFX)`,null,NOWD,'Rafael Pereira',{n:23,ent:17,sai:6,te:18420,ts:4210,rows:[['30/09','PIX recebido — J. Prado','Dízimos','e',300],['29/09','Boleto Sabesp','Estrutura','s',212],['29/09','PIX recebido — campanha','Doações','e',150]]}));S.ffile=null;setTimeout(fRe,400);toast('Extrato enviado para aprovação',null);}),
 cmNew:()=>{openDlg(`${dlgHead('Nova campanha','O link de pagamento pode ser gerado agora ou depois.')}<form id="cmF" class="fgrid one" novalidate><label class="fld"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Construção do salão infantil" autocomplete="off"></label><label class="fld"><span class="fl">Meta</span><span class="fi-amt e"><em>R$</em><input name="meta" inputmode="decimal" placeholder="0,00"></span></label><label class="tog"><input type="checkbox" name="link" checked><span class="sw"></span><span><b>Gerar link de pagamento (Asaas)</b><small>Pix, boleto e cartão — para divulgar no app e nos banners</small></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Criar campanha</button></div></form>`,'sm');
  const f=$('#cmF'),ok=f.querySelector('[type=submit]'),val=()=>+String(f.meta.value).replace(/\./g,'').replace(',','.')||0;f.addEventListener('input',()=>ok.disabled=!f.n.value.trim()||!(val()>0));setTimeout(()=>f.n.focus(),80);
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const c=CMP(f.n.value.trim(),val(),0,'ativo',[]);if(!f.link.checked)c.link='';CAMPS.unshift(c);closeDlg();fRe();toast(c.link?'Campanha criada com link de pagamento':'Campanha criada');},700);});},
 cmLink:(v,b)=>{const c=CAMPS.find(x=>x.id===v);if(!b.classList.contains('btn'))return;busy(b,900,'Gerado',()=>{c.link='asaas.com/c/'+c.id;setTimeout(fRe,300);toast('Link de pagamento gerado');});},
 cmCopy:(v,b)=>{const c=CAMPS.find(x=>x.id===v);try{navigator.clipboard.writeText('https://'+c.link);}catch(e){}b.classList.add('ok');setTimeout(()=>b.classList.remove('ok'),1200);toast('Link copiado');},
 cmOpen:(v,b,e)=>{if(e&&e.target.closest('button'))return;S.camp=v;S.ctab2='pag';fGo();},
 cmView:v=>{S.camp=v;S.ctab2='pag';fGo();},cmBack:()=>{S.camp=null;fGo();},cmTab:v=>{S.ctab2=v;fRe();},
 cmQr:(v,b)=>busy(b,800,'Gerado',()=>{const c=CAMPS.find(x=>x.id===S.camp);c.qr=(c.qr||0)+1;setTimeout(fRe,300);toast('Novo QR Code PIX gerado');}),
 cmNota:(v,b)=>{const c=CAMPS.find(x=>x.id===S.camp),d=c.donors[+v];busy(b,700,'Enviado',()=>{d[4]=1;setTimeout(fRe,300);toast(`Informe de doação de ${d[0].split(' ')[0]} gerado e enviado por e-mail`);});},
 cmNotaAll:(v,b)=>{const c=CAMPS.find(x=>x.id===S.camp),l=c.donors.filter(d=>d[0]!=='Anônimo'&&!d[4]);busy(b,900,'Enviados',()=>{l.forEach(d=>d[4]=1);setTimeout(fRe,300);toast(`${l.length} informes gerados e enviados`);});},
 cmSt:()=>{const c=CAMPS.find(x=>x.id===S.camp);c.st=c.st==='ativo'?'concluido':'ativo';fRe();toast(c.st==='ativo'?'Campanha reaberta':'Campanha encerrada · link desativado');},
 cmDel:v=>{const c=CAMPS.find(x=>x.id===v);confirmDel({title:`Excluir ${esc(c.n)}?`,body:c.st==='ativo'?'O link de pagamento é desativado. As doações já recebidas continuam nos lançamentos.':'As doações já recebidas continuam nos lançamentos.',typed:c.st==='ativo'?c.n:null,onConfirm:()=>{const i=CAMPS.indexOf(c);CAMPS.splice(i,1);S.camp=null;fGo();toast('Campanha excluída',()=>{CAMPS.splice(i,0,c);fRe();});}});},
};

/* ================= Almoxarifado ================= */
Object.assign(I,{
 minus:'<path d="M5 12h14"/>',
 droplet:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
 arrowRL:'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
 undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
 truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
 scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
});
const AXICONS=['monitor','mic','music','chair','coffee','box','camera','wrench','sparkle','baby','book','droplet'];
const ICATS=[{id:'k1',n:'Audiovisual',c:'#2f7de1',ic:'monitor'},{id:'k2',n:'Áudio',c:'#1f9a52',ic:'mic'},{id:'k3',n:'Instrumentos',c:'#c25a12',ic:'music'},{id:'k4',n:'Mobiliário',c:'#7c3aed',ic:'chair'},{id:'k5',n:'Cafeteria',c:'#dc2626',ic:'coffee'}];
let _ix=0;const IT=(n,tipo,cat,total,sku='',desc='')=>({id:'it'+(++_ix),n,tipo,cat,total,sku,desc});
const ITEMS=[IT('Câmera Sony A7 III','emp','k1',1,'AV-CAM-001'),IT('Microfone Shure SM58','emp','k2',4,'AU-MIC-058'),IT('Projetor Epson 3000lm','emp','k1',2,'AV-PRJ-002'),IT('Violão Yamaha F310','emp','k3',3,'IN-VIO-310'),IT('Mesa de Som Yamaha','emp','k2',1,'AU-MES-001'),IT('Cadeira dobrável','emp','k4',50,'MO-CAD-050'),IT('Água Mineral 500ml','cons','k5',240,'CF-AGU-500'),IT('Copo descartável 200ml','cons','k5',1000,'CF-COP-200')];
let _lx=0;const LN=(item,qty,who,from,due,back=[])=>({id:'ln'+(++_lx),item,qty,who,from,due,back});
const LOANS=[LN('it1',1,'André Rocha','2026-09-10','2026-09-17'),LN('it2',2,'Fernanda Alves','2026-09-15','2026-10-06'),LN('it4',2,'Lucas Gomes','2026-09-14','2026-10-04'),LN('it6',12,'Carla Nogueira','2026-09-07','2026-09-14'),
 LN('it3',2,'Marcos Souza','2026-09-05','2026-09-12',[[2,'2026-09-12']]),LN('it2',1,'Ana Lima','2026-09-03','2026-09-10',[[1,'2026-09-10']])];
LOANS[5].qty=2;LOANS[5].note='1 unidade com defeito ficou na manutenção';
let _dx=0;const DS=(item,dest,qty,date,tr=[])=>({id:'ds'+(++_dx),item,dest,qty,date,tr});
const DISTS=[DS('it7','Cafeteria',72,'2026-09-18')];
const ADJS=[];
Object.assign(S,{axq:'',axf:'todos',lnf:'ativos',mvf:'todos'});
const icat=id=>ICATS.find(c=>c.id===id)||{n:'Sem categoria',c:'#8a8f98',ic:'box'};
const itm=id=>ITEMS.find(x=>x.id===id);
const lnOpen=l=>l.qty-l.back.reduce((a,b)=>a+b[0],0);
const outOf=it=>it.tipo==='emp'?LOANS.filter(l=>l.item===it.id).reduce((a,l)=>a+lnOpen(l),0):DISTS.filter(d=>d.item===it.id).reduce((a,d)=>a+d.qty,0);
const avOf=it=>Math.max(0,it.total-outOf(it));
const itSt=it=>{const o=outOf(it),a=avOf(it);return a===0?'out':o===0?'ok':'part';};
const AXST={ok:['Disponível','var(--st-int)','var(--st-int-bg)'],part:['Parcial','var(--st-sol)','var(--st-sol-bg)'],out:['Esgotado','var(--st-rec)','var(--st-rec-bg)']};
const axPill=(k,txt)=>`<span class="stp" style="--c:${AXST[k][1]};--b:${AXST[k][2]}"><i></i>${txt||AXST[k][0]}</span>`;
const kChip=c=>`<span class="ax-k" style="--k:${c.c}">${ic(c.ic,11)}${esc(c.n)}</span>`;
const kTile=(c,s=38)=>`<span class="ax-kt" style="--k:${c.c};--s:${s}px">${ic(c.ic,Math.round(s*.45))}</span>`;
const axHead=(t,lede,act='')=>`<header class="ph rise"><div><p class="eb">Almoxarifado</p><h1>${t}</h1><p class="lede">${lede}</p></div><div class="pact">${act}</div></header>`;
const lnLate=l=>lnOpen(l)>0&&dDays(l.due)<0;
const AXPPL=()=>[...new Set(MEMBERS.map(m=>m.n))].sort((a,b)=>a.localeCompare(b));
const meter=it=>{const o=outOf(it),t=Math.max(1,it.total);return `<span class="ax-m"><span class="ax-mb"><i style="width:${avOf(it)/t*100}%"></i><em style="width:${o/t*100}%"></em></span><small><b>${avOf(it)}</b> de ${it.total}${o?` · ${o} ${it.tipo==='emp'?'emprestado'+(o>1?'s':''):'distribuído'+(o>1?'s':'')}`:''}</small></span>`;};

/* ---------- Itens ---------- */
function axItems(){
 const q=norm(S.axq),l=ITEMS.filter(it=>(S.axf==='todos'||(S.axf==='emp'||S.axf==='cons'?it.tipo===S.axf:itSt(it)===S.axf))&&(!q||norm(it.n+' '+it.sku+' '+icat(it.cat).n).includes(q)));
 const cnt=k=>ITEMS.filter(it=>k==='emp'||k==='cons'?it.tipo===k:itSt(it)===k).length;
 return axHead('Itens','Patrimônio que sai e volta, e consumíveis que saem e não voltam',`<button class="btn sec" data-a="export" data-v="os itens (CSV)">Exportar CSV</button><button class="btn pri" data-a="axNew">${ic('plus',15,2.2)}Novo item</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Itens cadastrados</span><span class="kv">${ITEMS.length}</span><span class="kd">${cnt('emp')} de empréstimo · ${cnt('cons')} consumíveis</span></div><div class="k4"><span class="kl">Unidades disponíveis</span><span class="kv" style="color:var(--st-int)">${ITEMS.reduce((a,i)=>a+avOf(i),0).toLocaleString('pt-BR')}</span><span class="kd">prontas para sair</span></div><div class="k4"><span class="kl">Fora do estoque</span><span class="kv" style="color:var(--st-sol)">${ITEMS.reduce((a,i)=>a+outOf(i),0)}</span><span class="kd">emprestadas ou distribuídas</span></div><div class="k4"><span class="kl">Empréstimos atrasados</span><span class="kv" style="${LOANS.some(lnLate)?'color:var(--st-rec)':''}">${LOANS.filter(lnLate).length}</span><span class="kd"><button class="lnk" data-a="nav" data-v="aemp">Ver empréstimos</button></span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="axq" placeholder="Buscar item, código ou categoria" value="${esc(S.axq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos',ITEMS.length],['emp','Empréstimo',cnt('emp')],['cons','Consumível',cnt('cons')],['part','Parcial',cnt('part')],['out','Esgotado',cnt('out')]].map(c=>`<button class="chipf ${S.axf===c[0]?'on':''}" data-a="axF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow ax thead"><span>Item</span><span>Categoria</span><span>Estoque</span><span>Status</span><span></span></div>${l.map(it=>{const c=icat(it.cat),st=itSt(it);return `<div class="trow ax" id="row-${it.id}">
   <span class="tn">${kTile(c)}<span class="hn"><b>${esc(it.n)}</b><span><span class="ax-tp ${it.tipo}">${it.tipo==='emp'?ic('undo',11,2)+'Sai e volta':ic('arrowR',11,2)+'Sai e não volta'}</span>${it.sku?`<span class="ax-sku">${esc(it.sku)}</span>`:''}</span></span></span>
   <span class="ax-c">${kChip(c)}</span><span class="ax-s">${meter(it)}</span><span class="ts">${axPill(st)}</span>
   <span class="ax-act"><button class="btn sec sm" data-a="${it.tipo==='emp'?'lnNew':'dsNew'}" data-v="${it.id}" ${avOf(it)?'':'disabled'}>${it.tipo==='emp'?'Emprestar':'Distribuir'}</button><span style="position:relative"><button class="ibtn sm" data-a="axMenu" data-v="${it.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="axPop-${it.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="axEdit" data-v="${it.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="ajOpen" data-v="${it.id}">${ic('scale',16)}Ajustar estoque</button><hr><button class="pi danger" data-a="axDel" data-v="${it.id}">${ic('x',16)}Excluir</button></div></span></span></div>`;}).join('')}`:'<div class="mempty"><p>Nenhum item aqui.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} ite${l.length===1?'m':'ns'}</span></div></section>`;
}
function axForm(id){const it=id?itm(id):null,v=it?{...it}:{n:'',desc:'',tipo:'emp',cat:ICATS[0]?.id,total:1,sku:''};
 openDlg(`${dlgHead(it?'Editar item':'Novo item')}<form id="axF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(v.n)}" placeholder="Ex.: Mesa dobrável" autocomplete="off"><span class="err"></span></label>
  <div class="fld wide"><span class="fl">Tipo</span><div class="ax-tps">${[['emp','undo','Empréstimo','Sai e volta — câmera, projetor, cadeira'],['cons','arrowR','Consumível','Sai e não volta — água, copo descartável']].map(t=>`<label><input type="radio" name="tipo" value="${t[0]}" ${v.tipo===t[0]?'checked':''} ${it?'disabled':''}><span><i>${ic(t[1],16,2)}</i><b>${t[2]}</b><small>${t[3]}</small></span></label>`).join('')}</div>${it?'<span class="hint">O tipo não muda depois de criado.</span>':''}</div>
  <div class="fld wide"><span class="fl">Categoria</span><div class="ax-kp" id="axK">${ICATS.map(c=>`<button type="button" class="${c.id===v.cat?'on':''}" data-k="${c.id}" style="--k:${c.c}">${ic(c.ic,13)}${esc(c.n)}</button>`).join('')}<button type="button" class="new" data-kn>${ic('plus',13,2.2)}Nova</button></div></div>
  <label class="fld"><span class="fl">${it?'Quantidade total':'Quantidade inicial'}</span><span class="ax-step"><button type="button" data-st="-1">${ic('minus',14,2.4)}</button><input name="total" type="number" min="0" value="${v.total}" inputmode="numeric" ${it?'readonly':''}><button type="button" data-st="1">${ic('plus',14,2.4)}</button></span>${it?`<span class="hint">Para mudar o total, use <button type="button" class="lnk" data-a="ajOpen" data-v="${it.id}">Ajustar estoque</button>.</span>`:''}</label>
  <label class="fld"><span class="fl">Código / SKU <small>opcional</small></span><input name="sku" value="${esc(v.sku)}" placeholder="Ex.: MO-MES-001" autocomplete="off"></label>
  <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="2">${esc(v.desc)}</textarea></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="axOk">${it?'Salvar':'Adicionar item'}</button></div></form>`);
 const f=$('#axF'),ok=$('#axOk');let cat=v.cat;
 const chk=()=>{ok.disabled=!f.n.value.trim()||!cat;};f.addEventListener('input',chk);chk();setTimeout(()=>f.n.focus(),80);
 const bindK=()=>{$$('#axK [data-k]').forEach(b=>b.onclick=()=>{cat=b.dataset.k;$$('#axK [data-k]').forEach(x=>x.classList.toggle('on',x===b));chk();});$('#axK [data-kn]').onclick=()=>kForm(null,c=>{const w=$('#axK');if(!w)return;w.querySelector('[data-kn]').insertAdjacentHTML('beforebegin',`<button type="button" data-k="${c.id}" style="--k:${c.c}">${ic(c.ic,13)}${esc(c.n)}</button>`);cat=c.id;bindK();$$('#axK [data-k]').forEach(x=>x.classList.toggle('on',x.dataset.k===c.id));chk();},true);};bindK();
 if(!it)$$('[data-st]',f).forEach(b=>b.onclick=()=>{f.total.value=Math.max(0,(+f.total.value||0)+ +b.dataset.st);});
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const n=f.n.value.trim();if(ITEMS.some(x=>x!==it&&norm(x.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Já existe um item com esse nome';return;}
  ok.classList.add('busy');setTimeout(()=>{const o={n,cat,sku:f.sku.value.trim(),desc:f.desc.value.trim()};if(it)Object.assign(it,o);else{const x=IT(n,f.querySelector('[name=tipo]:checked').value,cat,+f.total.value||0,o.sku,o.desc);ITEMS.unshift(x);}closeDlg();axRe();toast(it?'Item atualizado':`${n} adicionado ao almoxarifado`);},500);});}

/* ---------- Categorias + color picker ---------- */
const hsl2hex=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return '#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');};
const hex2hsl=hex=>{let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;}return [Math.round(h),Math.round(s*100),Math.round(l*100)];};
const lum=hex=>{const c=[1,3,5].map(i=>{const v=parseInt(hex.slice(i,i+2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const KPRE=['#2f7de1','#0ea5a4','#1f9a52','#84a516','#d4a017','#c25a12','#dc2626','#db2777','#7c3aed','#475569'];
function axCats(){
 const tot=ITEMS.length;
 return axHead('Categorias','Como os itens do almoxarifado se organizam',`<button class="btn pri" data-a="kNew">${ic('plus',15,2.2)}Nova categoria</button>`)
 +`<section class="card ax-kbar rise" style="--d:1"><div class="ax-kbh"><b>${ICATS.length} categorias</b><span>${tot} itens classificados · ${ICATS.filter(c=>!ITEMS.some(i=>i.cat===c.id)).length} sem itens</span></div><div class="ax-kst">${ICATS.map(c=>{const n=ITEMS.filter(i=>i.cat===c.id).length;return n?`<i style="flex:${n};--k:${c.c}" title="${esc(c.n)} · ${n}"></i>`:'';}).join('')}</div></section>
 <div class="ax-kg rise" style="--d:2">${ICATS.map(c=>{const its=ITEMS.filter(i=>i.cat===c.id),u=its.reduce((a,i)=>a+i.total,0);return `<article class="card ax-kc" style="--k:${c.c}"><div class="ax-kch">${kTile(c,46)}<div class="dkt"><b>${esc(c.n)}</b><span>${its.length} ite${its.length===1?'m':'ns'} · ${u.toLocaleString('pt-BR')} unidades</span></div>
  <span style="position:relative"><button class="ibtn sm" data-a="kMenu" data-v="${c.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kPop-${c.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="kEdit" data-v="${c.id}">${ic('pen',16)}Editar</button><hr><button class="pi danger" data-a="kDel" data-v="${c.id}">${ic('x',16)}Excluir</button></div></span></div>
  <div class="ax-kit">${its.length?its.slice(0,4).map(i=>`<span>${esc(i.n)}</span>`).join('')+(its.length>4?`<span class="soft">+${its.length-4}</span>`:''):'<span class="soft">Nenhum item ainda</span>'}</div></article>`;}).join('')}
  <button class="cm-badd" data-a="kNew" style="min-height:150px"><span>${ic('plus',20,2)}</span><b>Nova categoria</b><small>Nome, cor e ícone</small></button></div>`;
}
function kForm(id,after,stack){const c=id?ICATS.find(x=>x.id===id):null;let col=c?c.c:KPRE[ICATS.length%KPRE.length],icn=c?c.ic:'box';let [H,Sa,L]=hex2hsl(col);
 const html=`${dlgHead(c?'Editar categoria':'Nova categoria','Escolha uma cor que dê para reconhecer de longe.')}<form id="kF" class="ax-kf" novalidate>
  <label class="fld"><span class="fl">Nome</span><input name="n" value="${esc(c?c.n:'')}" placeholder="Ex.: Iluminação" autocomplete="off"><span class="err"></span></label>
  <div class="ax-cp"><div class="ax-wheel" id="kW"><div class="ax-wh-in" id="kWi"><span id="kHex">${col}</span><small>arraste na roda</small></div><i class="ax-knob" id="kKnob"></i></div>
   <div class="ax-cpr"><p class="fl">Sugestões</p><div class="ax-pre">${KPRE.map(p=>`<button type="button" data-p="${p}" style="--k:${p}" aria-label="${p}"></button>`).join('')}</div>
    <p class="fl">Tom</p><input type="range" id="kL" min="28" max="62" value="${L}" class="ax-rng"><p class="fl">Ícone</p><div class="ax-icp">${AXICONS.map(x=>`<button type="button" data-i="${x}" class="${x===icn?'on':''}">${ic(x,15)}</button>`).join('')}</div></div></div>
  <div class="ax-prev"><p class="fl">Prévia</p><div class="ax-pv"><span id="kPv1"></span><span id="kPv2"></span><span class="ax-pvd" id="kPv3"></span></div><p class="ax-ctr" id="kCtr"></p></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="kOk">${c?'Salvar':'Adicionar categoria'}</button></div></form>`;
 if(stack){const d=document.createElement('div');d.className='dlgw open ax-stack';d.innerHTML=`<div class="dlg" role="dialog" aria-modal="true">${html}</div>`;document.body.appendChild(d);d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-a=closeDlg]')){e.stopPropagation();d.remove();}});}else openDlg(html);
 const root=stack?$('.ax-stack'):document,f=root.querySelector('#kF'),ok=root.querySelector('#kOk'),W=root.querySelector('#kW'),kn=root.querySelector('#kKnob');
 const paint=(pop)=>{col=hsl2hex(H,Sa,L);const nm=f.n.value.trim()||'Nova categoria';W.style.setProperty('--k',col);root.querySelector('#kHex').textContent=col.toUpperCase();
  const a=(H-90)*Math.PI/180;kn.style.left=`calc(50% + ${Math.cos(a)*42}%)`;kn.style.top=`calc(50% + ${Math.sin(a)*42}%)`;kn.style.background=col;
  root.querySelector('#kPv1').outerHTML=`<span id="kPv1">${kChip({n:nm,c:col,ic:icn})}</span>`;root.querySelector('#kPv2').outerHTML=`<span id="kPv2" class="ax-pvi">${kTile({c:col,ic:icn},34)}<span><b>Projetor Epson</b><small>${esc(nm)}</small></span></span>`;root.querySelector('#kPv3').innerHTML=kChip({n:nm,c:col,ic:icn});
  const cr=(1.05)/(lum(col)+.05);root.querySelector('#kCtr').innerHTML=cr<3?`${ic('alert',12,2)}Cor clara demais — o texto pode sumir no tema Dia`:`${ic('check',12,2.4)}Boa leitura nos dois temas`;root.querySelector('#kCtr').className='ax-ctr '+(cr<3?'warn':'ok');
  $$('[data-p]',root).forEach(b=>b.classList.toggle('on',b.dataset.p.toLowerCase()===col.toLowerCase()));if(pop){const i=root.querySelector('#kWi');i.classList.remove('ax-bump');i.offsetWidth;i.classList.add('ax-bump');}ok.disabled=!f.n.value.trim();};
 const fromPt=e=>{const r=W.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;H=(Math.round(Math.atan2(y,x)*180/Math.PI+90)+360)%360;Sa=72;paint();};
 W.addEventListener('pointerdown',e=>{if(e.target.closest('.ax-wh-in'))return;W.setPointerCapture(e.pointerId);W.classList.add('drag');fromPt(e);const mv=ev=>fromPt(ev),up=()=>{W.classList.remove('drag');W.removeEventListener('pointermove',mv);W.removeEventListener('pointerup',up);paint(true);};W.addEventListener('pointermove',mv);W.addEventListener('pointerup',up);});
 $$('[data-p]',root).forEach(b=>b.onclick=()=>{[H,Sa,L]=hex2hsl(b.dataset.p);root.querySelector('#kL').value=L;paint(true);});
 root.querySelector('#kL').addEventListener('input',e=>{L=+e.target.value;paint();});
 $$('[data-i]',root).forEach(b=>b.onclick=()=>{icn=b.dataset.i;$$('[data-i]',root).forEach(x=>x.classList.toggle('on',x===b));paint(true);});
 f.addEventListener('input',()=>paint());paint();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const n=f.n.value.trim();if(ICATS.some(x=>x!==c&&norm(x.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Essa categoria já existe';return;}
  if(c){Object.assign(c,{n,c:col,ic:icn});closeDlg();axRe();toast('Categoria atualizada');}else{const k={id:'k'+Date.now(),n,c:col,ic:icn};ICATS.push(k);if(stack){root.remove();after&&after(k);toast(`Categoria ${n} criada`);}else{closeDlg();axRe();toast(`Categoria ${n} criada`);}}});}

/* ---------- Empréstimos / Devoluções ---------- */
function axLoans(){
 const act=LOANS.filter(l=>lnOpen(l)>0).sort((a,b)=>a.due<b.due?-1:1),late=act.filter(lnLate);
 return axHead('Empréstimos','O que está com quem — e até quando',`<button class="btn pri" data-a="lnNew">${ic('plus',15,2.2)}Novo empréstimo</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Em aberto</span><span class="kv">${act.length}</span><span class="kd">${act.reduce((a,l)=>a+lnOpen(l),0)} unidades fora</span></div><div class="k4"><span class="kl">Atrasados</span><span class="kv" style="${late.length?'color:var(--st-rec)':''}">${late.length}</span><span class="kd">${late.length?'passaram do prazo':'tudo no prazo'}</span></div><div class="k4"><span class="kl">Devolvem esta semana</span><span class="kv" style="color:var(--st-sol)">${act.filter(l=>dDays(l.due)>=0&&dDays(l.due)<=7).length}</span><span class="kd">próximos 7 dias</span></div></section>
 ${act.length?`<div class="ax-lg rise" style="--d:2">${act.map(l=>{const it=itm(l.item),c=icat(it.cat),d=dDays(l.due),lt=d<0,op=lnOpen(l),span=Math.max(1,dDays(l.due)-dDays(l.from)),el=Math.min(1,Math.max(0,-dDays(l.from)/span));return `<article class="card ax-lc ${lt?'late':d<=3?'soon':''}">
  <div class="ax-lch">${kTile(c,42)}<div class="dkt"><b>${esc(it.n)}</b><span>${op}${op!==l.qty?` de ${l.qty}`:''} unidade${op>1?'s':''}${l.back.length?' · devolução parcial':''}</span></div>${lt?axPill('out','Atrasado'):d<=3?axPill('part',d===0?'Vence hoje':`${d} dia${d>1?'s':''}`):axPill('ok','No prazo')}</div>
  <div class="ax-who">${avN(l.who)}<span class="dkt"><b>${esc(l.who)}</b><span>desde ${dBR(l.from)}</span></span></div>
  <div class="ax-tl"><span class="ax-tlb"><i style="width:${el*100}%"></i></span><span class="ax-tlt"><span>${dBR(l.from).slice(0,5)}</span><b class="${lt?'s':''}">${lt?`${-d} dia${d<-1?'s':''} de atraso`:`devolve ${relD(l.due)}`}</b><span>${dBR(l.due).slice(0,5)}</span></span></div>
  <footer>${lt?`<button class="btn ghost sm" data-a="soon" data-v="Lembrete por WhatsApp">${ic('bell',13)}Lembrar</button>`:'<span></span>'}<button class="btn ${lt?'pri':'sec'} sm" data-a="lnBack" data-v="${l.id}">${ic('undo',13,2)}Registrar devolução</button></footer></article>`;}).join('')}</div>`:'<section class="card cm-done rise"><span class="cm-ok">'+ic('check',30,2.6)+'</span><h2>Tudo devolvido</h2><p>Nenhum item emprestado agora.</p></section>'}`;
}
const RETS=()=>LOANS.flatMap(l=>l.back.map((b,i)=>({l,qty:b[0],date:b[1],kind:lnOpen(l)===0&&i===l.back.length-1?'total':'parcial'}))).sort((a,b)=>a.date<b.date?1:-1);
function axRets(){const r=RETS();
 return axHead('Devoluções','Histórico do que voltou para o almoxarifado')
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Devoluções</span><span class="kv">${r.length}</span><span class="kd">${r.reduce((a,x)=>a+x.qty,0)} unidades de volta</span></div><div class="k4"><span class="kl">Totais</span><span class="kv" style="color:var(--st-int)">${r.filter(x=>x.kind==='total').length}</span><span class="kd">empréstimo encerrado</span></div><div class="k4"><span class="kl">Parciais</span><span class="kv" style="color:var(--st-sol)">${r.filter(x=>x.kind==='parcial').length}</span><span class="kd">ainda falta voltar algo</span></div></section>
 <section class="card ax-feed rise" style="--d:2">${r.length?r.map(x=>{const it=itm(x.l.item),c=icat(it.cat);return `<div class="ax-fr">${kTile(c,38)}<span class="dkt"><b>${esc(it.n)} <span class="ax-q">×${x.qty}</span></b><span>${esc(x.l.who)} devolveu${x.kind==='parcial'?` · faltam ${lnOpen(x.l)}`:''}${x.l.note?` · ${esc(x.l.note)}`:''}</span></span><span class="ax-fd">${dBR(x.date)}</span>${x.kind==='total'?axPill('ok','Total'):axPill('part','Parcial')}</div>`;}).join(''):'<div class="mempty"><p>Nenhuma devolução ainda.</p></div>'}</section>`;}
function lnForm(itemId){const em=ITEMS.filter(i=>i.tipo==='emp'&&avOf(i)>0);let sel=itemId||em[0]?.id;
 openDlg(`${dlgHead('Novo empréstimo','Avisamos a pessoa no app e lembramos 1 dia antes do prazo.')}<form id="lnF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Item</span><span class="selw"><select name="it">${em.map(i=>`<option value="${i.id}" ${i.id===sel?'selected':''}>${esc(i.n)} — ${avOf(i)} disponíve${avOf(i)>1?'is':'l'}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="fld wide"><span class="fl">Com quem vai ficar</span><span class="selw"><select name="who"><option value="">Escolha o membro…</option>${AXPPL().map(n=>`<option>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="fld"><span class="fl">Quantidade</span><span class="ax-step"><button type="button" data-st="-1">${ic('minus',14,2.4)}</button><input name="q" type="number" min="1" value="1" inputmode="numeric"><button type="button" data-st="1">${ic('plus',14,2.4)}</button></span><span class="hint" id="lnMax"></span></label>
  <div class="fld"><span class="fl">Devolve até</span><input type="date" name="due" value="${addD(NOWD,7)}" min="${NOWD}"><div class="ax-qd">${[[3,'3 dias'],[7,'1 semana'],[14,'2 semanas'],[30,'1 mês']].map(x=>`<button type="button" data-d="${x[0]}" class="${x[0]===7?'on':''}">${x[1]}</button>`).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="lnOk">Confirmar empréstimo</button></div></form>`);
 const f=$('#lnF'),ok=$('#lnOk');const mx=()=>avOf(itm(f.it.value));
 const chk=()=>{const q=+f.q.value||0,m=mx();$('#lnMax').innerHTML=q>m?`<span class="sp-bad">Só há ${m} disponíve${m>1?'is':'l'}</span>`:`Até ${m} disponíve${m>1?'is':'l'}`;ok.disabled=!f.who.value||q<1||q>m||!f.due.value;$$('[data-d]',f).forEach(b=>b.classList.toggle('on',f.due.value===addD(NOWD,+b.dataset.d)));};
 $$('[data-st]',f).forEach(b=>b.onclick=()=>{f.q.value=Math.min(mx(),Math.max(1,(+f.q.value||0)+ +b.dataset.st));chk();});
 $$('[data-d]',f).forEach(b=>b.onclick=()=>{f.due.value=addD(NOWD,+b.dataset.d);chk();});
 f.addEventListener('input',chk);f.addEventListener('change',chk);chk();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{LOANS.push(LN(f.it.value,+f.q.value,f.who.value,NOWD,f.due.value));closeDlg();axRe();toast(`Emprestado para ${f.who.value.split(' ')[0]} · devolve ${relD(f.due.value)}`);},600);});}
function lnBackForm(id){const l=LOANS.find(x=>x.id===id),it=itm(l.item),op=lnOpen(l);
 openDlg(`${dlgHead('Registrar devolução',`${esc(it.n)} · com ${esc(l.who)}`)}<form id="rbF" class="fgrid one" novalidate>
  <div class="fld"><span class="fl">Quantas voltaram?</span><div class="ax-rb">${Array.from({length:Math.min(op,12)},(_,i)=>`<button type="button" class="${i<op?'on':''}" data-u="${i+1}"></button>`).join('')}${op>12?`<span class="soft">+${op-12}</span>`:''}</div><span class="ax-step" style="max-width:180px"><button type="button" data-st="-1">${ic('minus',14,2.4)}</button><input name="q" type="number" min="1" max="${op}" value="${op}"><button type="button" data-st="1">${ic('plus',14,2.4)}</button></span><span class="hint" id="rbH"></span></div>
  <label class="fld"><span class="fl">Observação <small>opcional</small></span><input name="note" placeholder="Ex.: 1 unidade com defeito" autocomplete="off"></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="rbOk">Confirmar devolução</button></div></form>`,'sm');
 const f=$('#rbF'),ok=$('#rbOk');const up=()=>{const q=Math.min(op,Math.max(1,+f.q.value||1));$$('.ax-rb [data-u]').forEach(b=>b.classList.toggle('on',+b.dataset.u<=q));$('#rbH').innerHTML=q===op?`${ic('check',12,2.4)} Devolução total — o empréstimo é encerrado`:`Parcial — ${op-q} continua${op-q>1?'m':''} com ${esc(l.who.split(' ')[0])}`;ok.textContent=q===op?'Confirmar devolução total':'Confirmar devolução parcial';};
 $$('[data-st]',f).forEach(b=>b.onclick=()=>{f.q.value=Math.min(op,Math.max(1,(+f.q.value||0)+ +b.dataset.st));up();});$$('.ax-rb [data-u]').forEach(b=>b.onclick=()=>{f.q.value=b.dataset.u;up();});f.addEventListener('input',up);up();
 f.addEventListener('submit',e=>{e.preventDefault();const q=Math.min(op,Math.max(1,+f.q.value||1));ok.classList.add('busy');setTimeout(()=>{l.back.push([q,NOWD]);if(f.note.value.trim())l.note=f.note.value.trim();closeDlg();axRe();toast(q===op?`${it.n} de volta ao estoque`:`${q} de ${op} devolvida${q>1?'s':''}`,()=>{l.back.pop();axRe();});},600);});}

/* ---------- Distribuições / Transferências ---------- */
const DESTS=()=>{const m={};DISTS.forEach(d=>{const add=(k,it,q)=>{m[k]=m[k]||{};m[k][it]=(m[k][it]||0)+q;};add(d.dest,d.item,d.qty);d.tr.forEach(t=>{add(d.dest,d.item,-t.qty);add(t.to,d.item,t.qty);});});return m;};
function axDists(){const D=DESTS(),dn=Object.keys(D).filter(k=>Object.values(D[k]).some(v=>v>0));
 return axHead('Distribuições','Consumíveis enviados do estoque central para um destino',`<button class="btn pri" data-a="dsNew">${ic('plus',15,2.2)}Nova distribuição</button>`)
 +`<p class="fi-note rise" style="--d:1">${ic('info',15)}<span>Não voltam ao estoque central, diferente de empréstimo. Um destino pode repassar parte do que recebeu para outro com <b>Transferir</b>.</span></p>
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Distribuições</span><span class="kv">${DISTS.length}</span><span class="kd">este mês</span></div><div class="k4"><span class="kl">Unidades enviadas</span><span class="kv">${DISTS.reduce((a,d)=>a+d.qty,0)}</span><span class="kd">saíram do estoque central</span></div><div class="k4"><span class="kl">Destinos com saldo</span><span class="kv">${dn.length}</span><span class="kd">${dn.join(', ')||'—'}</span></div></section>
 <div class="ax-dg rise" style="--d:2">${dn.map(k=>`<article class="card ax-dc"><div class="ax-dch"><span class="ax-dp">${ic('truck',18)}</span><div class="dkt"><b>${esc(k)}</b><span>${Object.values(D[k]).filter(v=>v>0).length} ite${Object.values(D[k]).filter(v=>v>0).length===1?'m':'ns'} em estoque local</span></div></div>
  ${Object.entries(D[k]).filter(e=>e[1]>0).map(([iid,q])=>{const it=itm(iid),sent=DISTS.filter(d=>d.dest===k&&d.item===iid).reduce((a,d)=>a+d.qty,0)+DISTS.flatMap(d=>d.item===iid?d.tr.filter(t=>t.to===k):[]).reduce((a,t)=>a+t.qty,0);return `<div class="ax-dr">${kTile(icat(it.cat),32)}<span class="dkt"><b>${esc(it.n)}</b><span>recebeu ${sent} · saldo <b>${q}</b></span></span><button class="btn sec sm" data-a="trNew" data-v="${esc(k)}|${iid}">${ic('arrowRL',13,2)}Transferir</button></div>`;}).join('')}</article>`).join('')}
  <button class="cm-badd" data-a="dsNew" style="min-height:160px"><span>${ic('truck',20,2)}</span><b>Nova distribuição</b><small>Item consumível e destino</small></button></div>
 <section class="card ax-feed rise" style="--d:3"><div class="sh" style="padding:4px 4px 8px"><h2 style="font:600 15px/1.2 var(--font-display);margin:0">Envios</h2></div>${DISTS.slice().reverse().map(d=>{const it=itm(d.item);return `<div class="ax-fr">${kTile(icat(it.cat),36)}<span class="dkt"><b>${esc(it.n)} <span class="ax-q">×${d.qty}</span></b><span>estoque central → ${esc(d.dest)}${d.tr.length?` · ${d.tr.reduce((a,t)=>a+t.qty,0)} repassadas`:''}</span></span><span class="ax-fd">${dBR(d.date)}</span></div>`;}).join('')}</section>`;}
function dsForm(itemId){const cs=ITEMS.filter(i=>i.tipo==='cons'&&avOf(i)>0),dests=[...new Set(DISTS.flatMap(d=>[d.dest,...d.tr.map(t=>t.to)]).concat(['Ministério Kids','Recepção','Conferência Missões']))];
 openDlg(`${dlgHead('Nova distribuição','Consumível — não volta ao estoque central depois de enviado.')}<form id="dsF" class="fgrid one" novalidate>
  <label class="fld"><span class="fl">Item</span><span class="selw"><select name="it">${cs.map(i=>`<option value="${i.id}" ${i.id===itemId?'selected':''}>${esc(i.n)} — ${avOf(i)} disponíveis</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <div class="fld"><span class="fl">Destino</span><div class="ax-qd ax-dst">${dests.map(d=>`<button type="button" data-ds="${esc(d)}">${esc(d)}</button>`).join('')}</div><input name="dest" placeholder="Ou escreva um destino novo" autocomplete="off" style="margin-top:8px"></div>
  <div class="fld"><span class="fl">Quantidade</span><input type="range" class="ax-rng" name="r" min="1" value="1"><span class="ax-step" style="max-width:200px"><button type="button" data-st="-1">${ic('minus',14,2.4)}</button><input name="q" type="number" min="1" value="1"><button type="button" data-st="1">${ic('plus',14,2.4)}</button></span><span class="hint" id="dsH"></span></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="dsOk">Confirmar envio</button></div></form>`,'sm');
 const f=$('#dsF'),ok=$('#dsOk'),mx=()=>avOf(itm(f.it.value));
 const up=src=>{const m=mx();f.r.max=m;if(src==='r')f.q.value=f.r.value;f.q.value=Math.min(m,Math.max(1,+f.q.value||1));f.r.value=f.q.value;const q=+f.q.value;$('#dsH').textContent=`Fica${m-q===1?'':'m'} ${m-q} no estoque central`;$$('[data-ds]',f).forEach(b=>b.classList.toggle('on',b.dataset.ds===f.dest.value.trim()));ok.disabled=!f.dest.value.trim();};
 $$('[data-ds]',f).forEach(b=>b.onclick=()=>{f.dest.value=b.dataset.ds;up();});$$('[data-st]',f).forEach(b=>b.onclick=()=>{f.q.value=(+f.q.value||0)+ +b.dataset.st;up();});f.r.addEventListener('input',()=>up('r'));f.addEventListener('input',e=>{if(e.target!==f.r)up();});f.it.addEventListener('change',()=>up());up();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{DISTS.push(DS(f.it.value,f.dest.value.trim(),+f.q.value,NOWD));closeDlg();axRe();toast(`${f.q.value} enviadas para ${f.dest.value.trim()}`);},600);});}
function trForm(v){const [from,iid]=v.split('|'),it=itm(iid),have=DESTS()[from][iid],dests=[...new Set(DISTS.flatMap(d=>[d.dest,...d.tr.map(t=>t.to)]).concat(['Ministério Kids','Recepção']))].filter(d=>d!==from);
 openDlg(`${dlgHead('Transferir',`${esc(it.n)} · ${have} em ${esc(from)}`)}<form id="trF" class="fgrid one" novalidate>
  <div class="ax-trv"><span class="ax-tn">${ic('truck',16)}<b>${esc(from)}</b><small id="trA">${have}</small></span><span class="ax-tarr">${ic('arrowR',18,2)}<em id="trQ">0</em></span><span class="ax-tn to"><b id="trTo">Destino</b><small id="trB">+0</small></span></div>
  <div class="fld"><span class="fl">Para</span><div class="ax-qd ax-dst">${dests.map(d=>`<button type="button" data-ds="${esc(d)}">${esc(d)}</button>`).join('')}</div><input name="to" placeholder="Ou escreva outro destino" autocomplete="off" style="margin-top:8px"></div>
  <div class="fld"><span class="fl">Quantidade</span><input type="range" class="ax-rng" name="q" min="1" max="${have}" value="${Math.ceil(have/4)}"></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="trOk">Transferir</button></div></form>`,'sm');
 const f=$('#trF'),ok=$('#trOk'),up=()=>{const q=+f.q.value;$('#trQ').textContent=q;$('#trA').textContent=have-q;$('#trB').textContent='+'+q;$('#trTo').textContent=f.to.value.trim()||'Destino';$$('[data-ds]',f).forEach(b=>b.classList.toggle('on',b.dataset.ds===f.to.value.trim()));ok.disabled=!f.to.value.trim();};
 $$('[data-ds]',f).forEach(b=>b.onclick=()=>{f.to.value=b.dataset.ds;up();});f.addEventListener('input',up);up();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const q=+f.q.value,to=f.to.value.trim();let left=q;DISTS.filter(d=>d.item===iid&&d.dest===from).forEach(d=>{if(!left)return;const can=d.qty-d.tr.reduce((a,t)=>a+t.qty,0),t=Math.min(can,left);if(t>0){d.tr.push({to,qty:t,date:NOWD});left-=t;}});if(left){const d0=DISTS.find(d=>d.item===iid&&d.tr.some(t=>t.to===from));d0&&d0.tr.push({to,qty:left,date:NOWD,from});}
  closeDlg();axRe();toast(`${q} transferidas de ${from} para ${to}`);});}
function axTrans(){const T=DISTS.flatMap(d=>d.tr.map(t=>({it:itm(d.item),from:t.from||d.dest,...t}))).sort((a,b)=>a.date<b.date?1:-1);
 return axHead('Transferências','Repasses de estoque entre destinos')
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Transferências</span><span class="kv">${T.length}</span><span class="kd">entre destinos</span></div><div class="k4"><span class="kl">Unidades repassadas</span><span class="kv">${T.reduce((a,t)=>a+t.qty,0)}</span><span class="kd">sem passar pelo estoque central</span></div><div class="k4"><span class="kl">Destinos com saldo</span><span class="kv">${Object.keys(DESTS()).filter(k=>Object.values(DESTS()[k]).some(v=>v>0)).length}</span><span class="kd">podem repassar</span></div></section>
 ${T.length?`<section class="card ax-feed rise" style="--d:2">${T.map(t=>`<div class="ax-fr">${kTile(icat(t.it.cat),36)}<span class="dkt"><b>${esc(t.it.n)} <span class="ax-q">×${t.qty}</span></b><span class="ax-path"><span>${esc(t.from)}</span>${ic('arrowR',12,2)}<span>${esc(t.to)}</span></span></span><span class="ax-fd">${dBR(t.date)}</span></div>`).join('')}</section>`
 :`<section class="card ax-empty rise" style="--d:2"><div class="ax-eill"><span>${ic('truck',20)}</span><i></i><span>${ic('truck',20)}</span></div><h2>Nenhuma transferência ainda</h2><p>Quando um destino repassar parte do que recebeu para outro, aparece aqui.</p><button class="btn pri" data-a="nav" data-v="adist">${ic('arrowRL',14,2)}Transferir a partir de Distribuições</button></section>`}`;}

/* ---------- Ajustes ---------- */
function axAdj(){
 return axHead('Ajustes','Correção de saldo depois de um inventário físico')
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Itens cadastrados</span><span class="kv">${ITEMS.length}</span><span class="kd">passíveis de ajuste</span></div><div class="k4"><span class="kl">Ajustes realizados</span><span class="kv">${ADJS.length}</span><span class="kd">${ADJS.length?`saldo líquido ${(()=>{const s=ADJS.reduce((a,j)=>a+j.to-j.from,0);return (s>0?'+':'')+s;})()}`:'nenhum ainda'}</span></div><div class="k4"><span class="kl">Último ajuste</span><span class="kv sp-kvt">${ADJS.length?esc(itm(ADJS.at(-1).item).n):'—'}</span><span class="kd">${ADJS.length?esc(ADJS.at(-1).why):'Contou algo diferente? Ajuste aqui.'}</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="trow aj thead"><span>Item</span><span>Saldo</span><span>Último ajuste</span><span></span></div>${ITEMS.map(it=>{const j=ADJS.filter(a=>a.item===it.id).at(-1),o=outOf(it),t=Math.max(1,it.total);return `<div class="trow aj" id="aj-${it.id}"><span class="tn">${kTile(icat(it.cat))}<span class="hn"><b>${esc(it.n)}</b><span>${it.tipo==='emp'?'Empréstimo':'Consumível'}</span></span></span>
  <span class="aj-s"><b class="aj-t" data-n="${it.total}">${it.total.toLocaleString('pt-BR')}</b><span class="ax-mb"><i style="width:${avOf(it)/t*100}%"></i><em style="width:${o/t*100}%"></em></span><small>${avOf(it)} disponíve${avOf(it)===1?'l':'is'} · ${o} fora</small></span>
  <span class="aj-l">${j?`<span class="aj-d ${j.to>j.from?'up':'dn'}">${j.to>j.from?'+':''}${j.to-j.from}</span><span class="dkt"><b>${esc(j.why)}</b><span>${dBR(j.date)}</span></span>`:'<span class="soft">Nunca ajustado</span>'}</span>
  <span><button class="btn sec sm" data-a="ajOpen" data-v="${it.id}">${ic('scale',13)}Ajustar</button></span></div>`;}).join('')}</section>`;}
function ajForm(id){closePops();const it=itm(id),o=outOf(it),from=it.total;let to=from;
 openDlg(`${dlgHead(`Ajustar estoque`,esc(it.n))}<form id="ajF" class="ax-aj" novalidate>
  <div class="ax-od"><button type="button" class="ax-ob" data-st="-1" aria-label="Menos">${ic('minus',20,2.6)}</button><div class="ax-odw"><div class="ax-odn" id="ajN">${from}</div><span class="ax-dl" id="ajD"></span><small>novo total</small></div><button type="button" class="ax-ob" data-st="1" aria-label="Mais">${ic('plus',20,2.6)}</button></div>
  <div class="ax-qd" style="justify-content:center">${[-10,-1,1,10].map(x=>`<button type="button" data-st="${x}">${x>0?'+':''}${x}</button>`).join('')}<input type="number" id="ajI" value="${from}" min="${o}" aria-label="Digitar total"></div>
  <div class="ax-viz"><div class="ax-vb" id="ajB"><i class="o" style="flex:${o}"></i><i class="a" style="flex:${from-o}"></i><i class="g" style="flex:0"></i><i class="l" style="flex:0"></i></div>
   <div class="ax-vl"><span><i class="o"></i>${it.tipo==='emp'?'Emprestado':'Distribuído'} <b>${o}</b></span><span><i class="a"></i>Disponível <b id="ajA">${from-o}</b></span><span id="ajGL"></span></div></div>
  <label class="fld"><span class="fl">Motivo</span><div class="ax-qd">${['Inventário físico','Item danificado','Doação recebida','Perda/extravio'].map(m=>`<button type="button" data-m="${m}">${m}</button>`).join('')}</div><textarea class="ta" name="why" rows="2" placeholder="Ex.: inventário mensal — encontradas 2 unidades extras" style="margin-top:8px"></textarea></label>
  <p class="ax-warn" id="ajW"></p>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="ajOk" disabled>Confirmar ajuste</button></div></form>`,'sm');
 const f=$('#ajF'),ok=$('#ajOk'),N=$('#ajN');let shown=from,raf;
 const roll=(target)=>{cancelAnimationFrame(raf);const s=shown,t0=performance.now(),dur=Math.min(600,200+Math.abs(target-s)*25);const step=t=>{const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);shown=Math.round(s+(target-s)*e);N.textContent=shown.toLocaleString('pt-BR');if(p<1)raf=requestAnimationFrame(step);};raf=requestAnimationFrame(step);};
 const up=(dir)=>{const d=to-from,B=$('#ajB').children;roll(to);B[1].style.flex=Math.max(0,Math.min(to,from)-o);B[2].style.flex=Math.max(0,d);B[3].style.flex=Math.max(0,-d);$('#ajA').textContent=to-o;
  const D=$('#ajD');D.textContent=d?(d>0?'+':'')+d:'';D.className='ax-dl '+(d>0?'up':d<0?'dn':'');if(d){D.classList.remove('ax-bump');D.offsetWidth;D.classList.add('ax-bump');}
  $('#ajGL').innerHTML=d>0?`<i class="g"></i>Entrando <b>+${d}</b>`:d<0?`<i class="l"></i>Saindo <b>${d}</b>`:'';
  N.classList.remove('bump-up','bump-dn','shake');N.offsetWidth;if(dir)N.classList.add(dir>0?'bump-up':'bump-dn');
  $('#ajI').value=to;const nw=!f.why.value.trim();$('#ajW').innerHTML=to===o&&o>0?`${ic('alert',13,2)}Todo o saldo está fora — nada disponível depois do ajuste.`:'';ok.disabled=!d||nw;$$('[data-m]',f).forEach(b=>b.classList.toggle('on',f.why.value.startsWith(b.dataset.m)));};
 const set=(v,dir)=>{if(v<o){N.classList.remove('shake');N.offsetWidth;N.classList.add('shake');$('#ajW').innerHTML=`${ic('alert',13,2)}Não dá para ficar abaixo de ${o}: essas unidades estão ${it.tipo==='emp'?'emprestadas':'distribuídas'}.`;to=o;}else to=v;up(dir);};
 $$('[data-st]',f).forEach(b=>b.onclick=()=>set(to+ +b.dataset.st,+b.dataset.st));
 $('#ajI').addEventListener('change',e=>set(Math.max(0,+e.target.value||0),Math.sign(+e.target.value-to)));
 $$('[data-m]',f).forEach(b=>b.onclick=()=>{f.why.value=b.dataset.m;up();});f.why.addEventListener('input',()=>up());
 f.addEventListener('keydown',e=>{if(e.target.tagName==='TEXTAREA'||e.target.id==='ajI')return;if(e.key==='ArrowUp'||e.key==='+'){e.preventDefault();set(to+1,1);}if(e.key==='ArrowDown'||e.key==='-'){e.preventDefault();set(to-1,-1);}});
 up();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{ADJS.push({item:it.id,from,to,why:f.why.value.trim(),date:NOWD});it.total=to;closeDlg();axRe();
  const row=document.getElementById((S.active==='aaj'?'aj-':'row-')+it.id);if(row){row.classList.add('ax-flash',to>from?'up':'dn');const b=row.querySelector('.aj-t');if(b){let s=from;const t0=performance.now();const st=t=>{const p=Math.min(1,(t-t0)/700),v=Math.round(from+(to-from)*(1-Math.pow(1-p,3)));b.textContent=v.toLocaleString('pt-BR');if(p<1)requestAnimationFrame(st);};requestAnimationFrame(st);}}
  toast(`${it.n}: ${from} → ${to}`,()=>{it.total=from;ADJS.pop();axRe();});},600);});}

/* ---------- Movimentações ---------- */
const MVT={emp:['Empréstimo','undo','var(--st-sol)','var(--st-sol-bg)'],dev:['Devolução','check','var(--st-int)','var(--st-int-bg)'],dist:['Distribuição','truck','var(--brand-text)','var(--brand-soft)'],tr:['Transferência','arrowRL','#7c3aed','color-mix(in srgb,#7c3aed 14%,var(--surface))'],aj:['Ajuste','scale','var(--ink-muted)','var(--surface-2)']};
function moves(){return [...LOANS.map(l=>({t:'emp',it:l.item,q:l.qty,d:l.from,txt:`para ${l.who}`})),...LOANS.flatMap(l=>l.back.map(b=>({t:'dev',it:l.item,q:b[0],d:b[1],txt:`de ${l.who}`}))),...DISTS.map(x=>({t:'dist',it:x.item,q:x.qty,d:x.date,txt:`estoque central → ${x.dest}`})),...DISTS.flatMap(x=>x.tr.map(t=>({t:'tr',it:x.item,q:t.qty,d:t.date,txt:`${t.from||x.dest} → ${t.to}`}))),...ADJS.map(j=>({t:'aj',it:j.item,q:j.to-j.from,d:j.date,txt:j.why}))].sort((a,b)=>a.d<b.d?1:-1);}
function axMoves(){const all=moves(),l=all.filter(m=>S.mvf==='todos'||m.t===S.mvf);const g={};l.forEach(m=>{(g[m.d]=g[m.d]||[]).push(m);});
 return axHead('Movimentações','Tudo o que entrou, saiu e voltou — numa linha do tempo',`<button class="btn sec" data-a="export" data-v="as movimentações (CSV)">Exportar CSV</button>`)
 +`<div class="ax-mvk rise" style="--d:1">${Object.entries(MVT).map(([k,v])=>`<button class="card ax-mk ${S.mvf===k?'on':''}" data-a="mvF" data-v="${k}" style="--c:${v[2]};--b:${v[3]}"><span>${ic(v[1],16,2)}</span><b>${all.filter(m=>m.t===k).length}</b><small>${v[0]}${all.filter(m=>m.t===k).length===1?'':'s'}</small></button>`).join('')}</div>
 ${S.mvf!=='todos'?`<p class="rise" style="margin:0 0 10px"><button class="lnk" data-a="mvF" data-v="todos">${ic('x',12,2)} Mostrar todas</button></p>`:''}
 <section class="card ax-tline rise" style="--d:2">${Object.keys(g).length?Object.entries(g).map(([d,ms])=>`<div class="ax-day"><p class="ax-dh"><b>${+d.slice(8)}</b><span>${MONTHS[+d.slice(5,7)-1].slice(0,3)}</span><small>${wd(d)}</small></p><div class="ax-dms">${ms.map(m=>{const v=MVT[m.t],it=itm(m.it);return `<div class="ax-mv"><span class="ax-mi" style="--c:${v[2]};--b:${v[3]}">${ic(v[1],14,2)}</span><span class="dkt"><b>${esc(it?it.n:'Item removido')}</b><span>${v[0]} · ${esc(m.txt)}</span></span><span class="ax-mq ${m.t==='dev'||(m.t==='aj'&&m.q>0)?'in':m.t==='tr'?'':'out'}">${m.t==='dev'?'+':m.t==='aj'?(m.q>0?'+':''):m.t==='tr'?'':'−'}${Math.abs(m.q)}</span></div>`;}).join('')}</div></div>`).join(''):'<div class="mempty"><p>Nenhuma movimentação desse tipo.</p></div>'}</section>`;}

/* ---------- Relatórios ---------- */
function axRep(){const tot=ITEMS.reduce((a,i)=>a+i.total,0),rows=ICATS.map(c=>{const its=ITEMS.filter(i=>i.cat===c.id);return {c,n:its.length,t:its.reduce((a,i)=>a+i.total,0),a:its.reduce((a,i)=>a+avOf(i),0),o:its.reduce((a,i)=>a+outOf(i),0),its};}).filter(r=>r.n);
 const low=ITEMS.filter(i=>i.total&&avOf(i)/i.total<.35);
 return axHead('Relatórios','O almoxarifado por categoria',`<button class="btn sec" data-a="export" data-v="o relatório do almoxarifado (CSV)">Exportar CSV</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Unidades no total</span><span class="kv">${tot.toLocaleString('pt-BR')}</span><span class="kd">em ${ITEMS.length} itens</span></div><div class="k4"><span class="kl">Disponíveis</span><span class="kv" style="color:var(--st-int)">${Math.round(ITEMS.reduce((a,i)=>a+avOf(i),0)/tot*100)}%</span><span class="kd">do total</span></div><div class="k4"><span class="kl">Empréstimos atrasados</span><span class="kv" style="color:var(--st-rec)">${LOANS.filter(lnLate).length}</span><span class="kd">${LOANS.filter(lnLate).reduce((a,l)=>a+lnOpen(l),0)} unidades</span></div><div class="k4"><span class="kl">Estoque baixo</span><span class="kv" style="color:var(--st-sol)">${low.length}</span><span class="kd">menos de 35% disponível</span></div></section>
 <div class="ax-rg rise" style="--d:2">${rows.map(r=>`<article class="card ax-rc" style="--k:${r.c.c}"><div class="ax-rch">${kTile(r.c,40)}<div class="dkt"><b>${esc(r.c.n)}</b><span>${r.n} ite${r.n===1?'m':'ns'} · ${r.t.toLocaleString('pt-BR')} unidades</span></div><b class="ax-rp">${Math.round(r.a/Math.max(1,r.t)*100)}%<small>disponível</small></b></div>
  ${r.its.map(i=>`<div class="ax-ri"><span>${esc(i.n)}</span><span class="ax-mb"><i style="width:${avOf(i)/Math.max(1,i.total)*100}%"></i><em style="width:${outOf(i)/Math.max(1,i.total)*100}%"></em></span><small>${avOf(i)}/${i.total}</small></div>`).join('')}</article>`).join('')}</div>`;}

function axAfter(){const q=$('#axq');if(q)q.addEventListener('input',e=>{S.axq=e.target.value;const c=e.target.selectionStart;axRe();const n=$('#axq');n.focus();n.setSelectionRange(c,c);});}
const axRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const AXA={
 axF:v=>{S.axf=v;axRe();},axNew:()=>axForm(),axEdit:v=>{closePops();axForm(v);},
 axMenu:v=>{const p=$('#axPop-'+v);closePops(p);p.classList.toggle('open');},
 axDel:v=>{closePops();const it=itm(v),o=outOf(it);if(o){toast(`${it.n} tem ${o} unidade${o>1?'s':''} fora — registre a devolução antes de excluir`);return;}confirmDel({title:`Excluir ${esc(it.n)}?`,body:'O item sai do catálogo. O histórico de movimentações continua.',onConfirm:()=>{const i=ITEMS.indexOf(it);ITEMS.splice(i,1);axRe();toast('Item excluído',()=>{ITEMS.splice(i,0,it);axRe();});}});},
 kNew:()=>kForm(),kEdit:v=>{closePops();kForm(v);},kMenu:v=>{const p=$('#kPop-'+v);closePops(p);p.classList.toggle('open');},
 kDel:v=>{closePops();const c=ICATS.find(x=>x.id===v),n=ITEMS.filter(i=>i.cat===v).length;if(n){toast(`${c.n} tem ${n} ite${n>1?'ns':'m'} — mova para outra categoria antes`);return;}confirmDel({title:`Excluir ${esc(c.n)}?`,body:'Nenhum item usa essa categoria.',onConfirm:()=>{const i=ICATS.indexOf(c);ICATS.splice(i,1);axRe();toast('Categoria excluída',()=>{ICATS.splice(i,0,c);axRe();});}});},
 lnNew:v=>lnForm(v),lnBack:v=>lnBackForm(v),
 dsNew:v=>dsForm(v),trNew:v=>trForm(v),
 ajOpen:v=>{closeDlg(true);ajForm(v);},
 mvF:v=>{S.mvf=S.mvf===v?'todos':v;axRe();},
};

/* ================= Meu perfil ================= */
const ME={n:'Rafael Pereira',first:'Rafael',email:'rafael.pereira@alvaigreja.com.br',tel:'(11) 98456-2210',nasc:'1984-06-12',cargo:'Pastor presidente',since:'2019-03-10',bio:'',tone:'ceu',
 tfa:true,notif:{email:true,push:true,resumo:true,urg:true},
 sess:[{d:'Chrome · Windows',where:'São Paulo, SP',when:'agora',cur:true,ic:'monitor'},{d:'App Alva · iPhone',where:'São Paulo, SP',when:'há 2 horas',ic:'phone'},{d:'Safari · MacBook',where:'Campinas, SP',when:'há 4 dias',ic:'monitor'}]};
Object.assign(S,{pft:'dados'});
function perfilPage(){
 const c=CHURCHES[S.church],role=c.role,perm=(typeof RPERM!=='undefined'&&RPERM[role])||{},mods=Object.keys(perm),full=mods.filter(m=>perm[m].length>=4).length;
 const tabs=[['dados','Dados pessoais'],['acesso','Igrejas e acesso',CHURCHES.length],['seg','Segurança'],['pref','Preferências']];
 return `<header class="card prof pf-h rise" style="--d:1">
  <div class="pid"><div class="pf-av"><span class="av xl" style="background:var(--tone-${ME.tone});color:var(--tone-${ME.tone}-ink)">${initials(ME.n)}</span><button class="pf-cam" data-a="pfPhoto" aria-label="Alterar foto" title="Alterar foto">${ic('camera',14,2)}</button></div>
   <div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(ME.n)}</h1><span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>${role}</span></div>
   <p>${esc(ME.cargo)} · ${esc(ME.email)}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="openMobile">${ic('phone',15)}Ver no app</button></div>
  <div class="ikpi hk"><div><b>${CHURCHES.length}</b><span>Igrejas com acesso</span></div><div><b>${full}<small class="kof">/${MODS.length}</small></b><span>Áreas com acesso total</span></div><div><b>${new Date().getFullYear()-+ME.since.slice(0,4)}<small class="kof"> anos</small></b><span>Na Alva</span></div><div><b>${ME.tfa?'Ativa':'Off'}</b><span>Verificação em 2 etapas</span></div></div>
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${S.pft===t[0]?'on':''}" data-a="pfTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${S.pft==='dados'?pfDados():S.pft==='acesso'?pfAcesso(c,perm):S.pft==='seg'?pfSeg():pfPref()}</div>`;
}
function pfDados(){return `<section class="card pc pf-form"><div class="sh"><h2>Dados pessoais</h2><span class="who" id="pfSaved">Altere e salve</span></div>
 <form id="pfF" class="fgrid" novalidate>
  <label class="fld"><span class="fl">Nome completo</span><input name="n" value="${esc(ME.n)}" autocomplete="name"><span class="err"></span></label>
  <label class="fld"><span class="fl">Como prefere ser chamado</span><input name="first" value="${esc(ME.first)}"><span class="err"></span></label>
  <label class="fld"><span class="fl">E-mail</span><input name="email" type="email" value="${esc(ME.email)}" autocomplete="email"><span class="hint">É o seu login. Ao trocar, enviamos um link de confirmação.</span><span class="err"></span></label>
  <label class="fld"><span class="fl">Celular</span><input name="tel" value="${esc(ME.tel)}" inputmode="tel"><span class="err"></span></label>
  <label class="fld"><span class="fl">Data de nascimento</span><input name="nasc" type="date" value="${ME.nasc}"></label>
  <label class="fld"><span class="fl">Cargo ou função <small>aparece para a equipe</small></span><input name="cargo" value="${esc(ME.cargo)}"></label>
  <label class="fld wide"><span class="fl">Sobre você <small>opcional</small></span><textarea class="ta" name="bio" rows="3" maxlength="240" placeholder="Uma linha sobre você para a equipe">${esc(ME.bio)}</textarea></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="pfReset">Descartar</button><button type="submit" class="btn pri" disabled>Salvar alterações</button></div>
 </form></section>`;}
function pfAcesso(c,perm){
 const mods=Object.keys(perm),lvl=a=>a.length>=4?['Total','var(--st-int)','var(--st-int-bg)']:a.length?[a.join(', '),'var(--st-sol)','var(--st-sol-bg)']:['Sem acesso','var(--ink-muted)','var(--surface-2)'];
 return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Permissões em ${esc(c.n)}</h2><span class="who">perfil ${c.role}</span></div>
  <p class="who" style="margin:-6px 0 14px">Definidas em Administração › Usuários e permissões. Para mudar, fale com outro administrador da rede.</p>
  <div class="pf-perm">${mods.map(m=>{const l=lvl(perm[m]);return `<div class="pf-pr"><span>${esc(m)}</span><span class="stp" style="--c:${l[1]};--b:${l[2]}"><i></i>${l[0]}</span></div>`;}).join('')}</div></section>
  <section class="card pc"><div class="sh"><h2>Suas igrejas</h2><span class="who">${NETWORK}</span></div><div class="pf-ch">${CHURCHES.map((x,i)=>`<div class="pf-c ${i===S.church?'on':''}">${chTile(x,36)}<span class="dkt"><b>${esc(x.n)}</b><span>${x.role} · último acesso ${x.last}</span></span>${i===S.church?'<span class="pf-now">Atual</span>':`<button class="btn sec sm" data-a="setChurch" data-v="${i}">Entrar</button>`}</div>`).join('')}</div></section></div>`;}
function pfSeg(){return `<div class="pgrid"><div class="stack-col">
 <section class="card pc"><div class="sh"><h2>Senha</h2><span class="who">alterada há 3 meses</span></div><p class="who" style="margin:-6px 0 14px">Use pelo menos 8 caracteres, com letras e números.</p><button class="btn sec" data-a="pfPwd">${ic('lock',15)}Alterar senha</button></section>
 <section class="card pc"><div class="sh"><h2>Verificação em 2 etapas</h2></div><label class="tog"><input type="checkbox" id="pfTfa" ${ME.tfa?'checked':''}><span class="sw"></span><span><b>${ME.tfa?'Ativa':'Desativada'}</b><small>Pedimos um código do celular ao entrar em um aparelho novo</small></span></label></section></div>
 <section class="card pc"><div class="sh"><h2>Aparelhos conectados</h2><span class="who">${ME.sess.length}</span></div><div class="pf-ch">${ME.sess.map((x,i)=>`<div class="pf-c"><span class="pf-di">${ic(x.ic,17)}</span><span class="dkt"><b>${x.d}</b><span>${x.where} · ${x.when}</span></span>${x.cur?'<span class="pf-now">Este aparelho</span>':`<button class="btn sec sm" data-a="pfOut" data-v="${i}">Desconectar</button>`}</div>`).join('')}</div>
  ${ME.sess.length>1?`<button class="btn ghost sm" data-a="pfOutAll" style="margin-top:12px">Desconectar todos os outros</button>`:''}</section></div>`;}
function pfPref(){const N=ME.notif;return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Notificações</h2></div><div class="pf-tg">
 ${[['email','Por e-mail','Avisos de aprovações, inscrições e escalas'],['push','No celular','Pelo app Alva, em tempo real'],['resumo','Resumo semanal','Toda segunda, o que mudou na igreja'],['urg','Casos urgentes de cuidado','Sempre avisar na hora, mesmo fora do horário']].map(t=>`<label class="tog"><input type="checkbox" data-nt="${t[0]}" ${N[t[0]]?'checked':''}><span class="sw"></span><span><b>${t[1]}</b><small>${t[2]}</small></span></label>`).join('')}</div></section>
 <section class="card pc"><div class="sh"><h2>Aparência</h2></div><div class="pf-th">${[['dia','Dia'],['noite','Noite']].map(t=>`<button class="pf-thb ${S.theme===t[0]?"on":""}" data-a="pfTheme" data-v="${t[0]}"><span class="pf-sw ${t[0]}"><i></i><i></i><i></i></span>${t[1]}</button>`).join('')}</div>
  <label class="fld" style="margin-top:16px"><span class="fl">Idioma</span><span class="selw"><select><option>Português (Brasil)</option><option>English</option><option>Español</option></select>${ic('updown',14)}</span></label></section></div>`;}
function perfilAfter(){
 requestAnimationFrame(()=>typeof tabInd==='function'&&tabInd());
 const f=$('#pfF');if(f){const sb=f.querySelector('[type=submit]'),orig=new FormData(f);const dirty=()=>[...new FormData(f)].some(([k,v])=>orig.get(k)!==v);
  f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');sb.disabled=!dirty();$('#pfSaved').textContent=dirty()?'Alterações não salvas':'Altere e salve';});
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),bad=(n,m)=>{const i=f[n];i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;};let ok=true;
   if(fd.get('n').trim().split(/\s+/).length<2){bad('n','Informe nome e sobrenome');ok=false;}
   if(!fd.get('first').trim()){bad('first','Como devemos te chamar?');ok=false;}
   if(!/^\S+@\S+\.\S+$/.test(fd.get('email'))){bad('email','E-mail inválido');ok=false;}
   if(fd.get('tel').replace(/\D/g,'').length<10){bad('tel','Celular com DDD');ok=false;}
   if(!ok)return;const em=fd.get('email')!==ME.email;
   busy(sb,700,'Salvo',()=>{['n','first','email','tel','nasc','cargo','bio'].forEach(k=>ME[k]=fd.get(k).trim());setTimeout(()=>{render();toast(em?`Dados salvos. Enviamos um link de confirmação para ${ME.email}`:'Dados salvos');},300);});});}
 const t=$('#pfTfa');if(t)t.addEventListener('change',()=>{if(!t.checked){t.checked=true;confirmDel({title:'Desativar a verificação em 2 etapas?',body:'Sua conta fica menos protegida: basta a senha para entrar em qualquer aparelho.',label:'Desativar',onConfirm:()=>{ME.tfa=false;render();toast('Verificação em 2 etapas desativada');}});}else{ME.tfa=true;render();toast('Verificação em 2 etapas ativada');}});
 $$('[data-nt]').forEach(i=>i.addEventListener('change',()=>{ME.notif[i.dataset.nt]=i.checked;toast(i.checked?'Notificação ligada':'Notificação desligada');}));
}
const PFA={
 myProfile:v=>{closePops();S.active='perfil';S.pft=v||'dados';S.member=null;$('#side').classList.remove('open');render();window.scrollTo({top:0});},
 pfTab:v=>{S.pft=v;const y=window.scrollY;render();window.scrollTo(0,y);},
 pfTheme:v=>{A.theme(v);const y=window.scrollY;render();window.scrollTo(0,y);},
 pfReset:()=>{render();toast('Alterações descartadas');},
 pfPhoto:()=>toast('Escolha uma foto quadrada, até 5 MB'),
 pfPwd:()=>{openDlg(`${dlgHead('Alterar senha','Você continua conectado neste aparelho.')}<form id="pwF" class="fgrid one" novalidate>
   <label class="fld"><span class="fl">Senha atual</span><input type="password" name="a" autocomplete="current-password"><span class="err"></span></label>
   <label class="fld"><span class="fl">Nova senha</span><input type="password" name="b" autocomplete="new-password"><span class="hint">Mínimo de 8 caracteres, com letras e números.</span><span class="err"></span></label>
   <label class="fld"><span class="fl">Repita a nova senha</span><input type="password" name="c" autocomplete="new-password"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Alterar senha</button></div></form>`,'sm');
  const f=$('#pwF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));f.addEventListener('submit',e=>{e.preventDefault();const bad=(n,m)=>{f[n].closest('.fld').classList.add('bad');f[n].closest('.fld').querySelector('.err').textContent=m;};
   if(!f.a.value)return bad('a','Informe a senha atual');if(f.a.value==='errada')return bad('a','Senha atual incorreta');if(f.b.value.length<8||!/\d/.test(f.b.value)||!/[a-z]/i.test(f.b.value))return bad('b','Use 8+ caracteres, com letras e números');if(f.b.value===f.a.value)return bad('b','A nova senha precisa ser diferente');if(f.c.value!==f.b.value)return bad('c','As senhas não conferem');
   busy(f.querySelector('[type=submit]'),700,'Alterada',()=>{setTimeout(()=>{closeDlg();toast('Senha alterada. Avisamos por e-mail.');},300);});});},
 pfOut:v=>{const s=ME.sess[+v];confirmDel({title:`Desconectar ${s.d}?`,body:`Esse aparelho precisará entrar de novo com e-mail e senha.`,label:'Desconectar',onConfirm:()=>{ME.sess.splice(+v,1);render();toast('Aparelho desconectado');}});},
 pfOutAll:()=>{confirmDel({title:'Desconectar todos os outros aparelhos?',body:`${ME.sess.length-1} aparelho(s) precisarão entrar de novo. Este continua conectado.`,label:'Desconectar todos',onConfirm:()=>{ME.sess=ME.sess.filter(s=>s.cur);render();toast('Outros aparelhos desconectados');}});},
};

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
 aaj:{list:'section.card.mtab',item:'.trow:not(.thead)',ph:'Buscar item'},
 amov:{list:'section.ax-tline',item:'.ax-mv',group:'.ax-day',ph:'Buscar item, pessoa ou destino'},
 pregacoes:{list:'.ct-grid',move:'.ct-bar',item:null},
 jornadas:{list:'.ct-jg',move:'.ct-bar',item:null},
 material:{list:'.mt-grid',move:'.ct-bar',item:null},
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
const A={
 nav:v=>{S.active=v;S.navOpen={};S.case=null;S.member=null;S.integ=null;S.disc=null;S.casa=null;S.chamada=null;S.mini=null;S.user=null;S.evt=null;S.esc=null;S.preg=null;S.mat=null;S.camp=null;S.jor=null;S.cur=null;S.pw=null;closePops();$('#side').classList.remove('open');render();window.scrollTo({top:0});},
 churchMenu:(v,b)=>{const p=$('#churchPop');closePops(p);p.classList.toggle('open');b.setAttribute('aria-expanded',p.classList.contains('open'));},
 setChurch:v=>{S.church=+v;softSide();toast(`Agora em ${CHURCHES[S.church].n}`);},
 meMenu:()=>{const p=$('#mePop');closePops(p);p.classList.toggle('open');},
 theme:v=>{S.theme=v;try{localStorage.setItem('alva-web-theme',v);}catch(e){}document.documentElement.dataset.theme=v;$$('#mePop .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 soon:v=>{closePops();toast(`${v}: em breve no protótipo`);},
 openMobile:()=>{closePops();window.open(window.ALVA_MOBILE_URL||'https://claude.ai/artifact/NPBFaCUv4QQvtrKt9YsSxU','_blank','noopener');},
 logout:()=>{closePops();S.auth='login';S.authErr=0;render();window.scrollTo({top:0});},
 cmd:()=>cmdOpen(),
 side:()=>$('#side').classList.add('open'),
 navToggle:v=>{const t=$(`.ni.par[data-v=${v}]`).closest('.ntree');const open=!t.classList.contains('open');if(open)$$('.ntree.open').forEach(o=>{if(o===t)return;const k=o.querySelector('.par').dataset.v;S.navOpen[k]=false;o.classList.remove('open');o.querySelector('.par').setAttribute('aria-expanded',false);if(k==='pessoas'&&!TASKS[0].done&&!o.querySelector('.par .cnt'))o.querySelector('.par .chev').insertAdjacentHTML('beforebegin',cntBadge());});S.navOpen[v]=open;t.classList.toggle('open',open);t.querySelector('.par').setAttribute('aria-expanded',open);const cb=t.querySelector('.par .cnt');if(open&&cb)cb.remove();else if(!open&&!cb&&!TASKS[0].done&&v==='pessoas')t.querySelector('.par .chev').insertAdjacentHTML('beforebegin',cntBadge());},
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
Object.assign(A,PA,IA,DA,CA,HA,RA,KA,AA,AU,GA,EA,LMA,CKA,BBA,PFA,SPA,CMA,CTA,FIA,AXA,BKA);
render();
