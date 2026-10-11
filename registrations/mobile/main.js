/* VEM · app · protótipo. Feito sobre a base do Alva Mobile (temas, superfícies, entrada, componentes).
   Dados fictícios; pagamento e leitura de QR são simulados. */
import * as D from '../shared/data.js';
import { couponOk } from '../shared/data2.js';
import { qrSVG, todayName, nowHM, evCodes, accCodes, ckStats, ckFind, ckEval, ckCommit, ckResult, who } from '../shared/logic.js';
"use strict";

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));


/* ---------- icons ---------- */
const I={
 trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
 card:'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
 qr:'<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1"/>',
 scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
 percent:'<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
 receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
 pen:'<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
 copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
 store:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m2 7 4.4-4.4A2 2 0 0 1 7.8 2h8.4a2 2 0 0 1 1.4.6L22 7"/><path d="M2 7h20v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-2-.8 2.7 2.7 0 0 1-4 0 2.7 2.7 0 0 1-4 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2Z"/>',
 globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
 filter:'<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',


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
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
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
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8M9 9.5h.01M15 9.5h.01"/>'
};
const ic=(n,s=24,w=1.75)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]||''}</svg>`;
/* alva sun mark: sun rising over the horizon (alva = dawn) */
let _sunId=0;
function sunMark(h,anim){const id='sg'+(++_sunId);const rays=[-162,-126,-90,-54,-18].map((a,i)=>{const r=a*Math.PI/180,x1=24+13.5*Math.cos(r),y1=25+13.5*Math.sin(r),x2=24+19*Math.cos(r),y2=25+19*Math.sin(r);return `<line class="ray" style="--i:${i}" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`;}).join('');
 return `<svg class="sun ${anim?'sun-anim':''}" viewBox="0 0 48 32" height="${h}" width="${h*1.5}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sun1)"/><stop offset=".5" style="stop-color:var(--sun2)"/><stop offset="1" style="stop-color:var(--sun3)"/></linearGradient><clipPath id="${id}c"><rect x="0" y="0" width="48" height="25"/></clipPath></defs><g class="rays" style="stroke:var(--sunray)" stroke-width="2.6" stroke-linecap="round">${rays}</g><g clip-path="url(#${id}c)"><circle class="disc" cx="24" cy="25" r="10" fill="url(#${id})"/></g><line class="horizon" x1="5" y1="28.5" x2="43" y2="28.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`;}
const logo=(h,anim,cls)=>`<span class="logo ${cls||''}" role="img" aria-label="vem">${sunMark(h,anim)}<span class="lw">vem</span></span>`;
const tone=t=>`background:var(--tone-${t});color:var(--tone-${t}-ink)`;
/* tone pairs (Tag component) */
const TONES={brasa:['--pal-brasa','--pal-abismo'],laranja:['--pal-laranja','--pal-abismo'],ambar:['--pal-ambar','--pal-abismo'],damasco:['--pal-damasco','--pal-vinho-escuro'],rosado:['--pal-rosado','--pal-vinho'],vinho:['--pal-vinho','--pal-rosado'],lima:['--pal-lima','--pal-abismo'],menta:['--pal-menta','--pal-petroleo-escuro'],salvia:['--pal-salvia','--pal-abismo'],ceu:['--pal-ceu','--pal-marinho'],oceano:['--pal-oceano','--pal-branco'],petroleo:['--pal-petroleo-escuro','--pal-menta']};
(function(){let css=':root{';for(const k in TONES)css+=`--tone-${k}:var(${TONES[k][0]});--tone-${k}-ink:var(${TONES[k][1]});`;const st=document.createElement('style');st.textContent=css+'}';document.head.appendChild(st);})();



/* ---------- constantes e estado do VEM ---------- */
const MONTHS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const MON3=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const WD=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const dow=(y,m,d)=>new Date(y,m-1,d).getDay();
const ROLES={visitante:['Visitante','damasco'],comprador:['Comprador','ceu'],equipe:['Equipe','menta']};
const S={
 screen:'welcome',hist:[],theme:'noite',role:'visitante',
 user:{first:'Ana',name:D.BUYER.n},email:'',otpCtx:'login',su:{email:'',att:5,expAt:0},prefill:null,
 q:'',cat:'Todos',ev:null,rg:null,ord:null,mt:'prox',
 ckEv:null,ckMode:'camera',ckq:'',ckf:'todos',kiosk:null,
 cards:[{id:'c1',brand:'Visa',last:'4242',def:true},{id:'c2',brand:'Mastercard',last:'8810',def:false}],
 me:{nome:D.BUYER.n,email:D.BUYER.e,cpf:'123.456.789-09',tel:'(11) 98765-4321',cidade:'São Paulo, SP'},
 prefs:{lembrete:true,pagamento:true,organizador:true,novidades:false,push:true,email:true}
};
const initials=n=>n.split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase();

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
function overlayLoading(text){const o=$('#overlay');o.innerHTML=`<div class="loading-over"><div class="spin"></div><p class="callout">${esc(text)}</p></div>`;}

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

/* ---------- AUTH (v2: text-first flow) ---------- */
const maskEmail=e=>{const [u,d]=(e||'rafael@email.com').split('@');return u[0]+'***@'+(d||'email.com');};
const REC=[{n:'R*** P***',r:'Responsável familiar',t:'damasco',ph:'(11) 9****-**78'},{n:'R*** P***',r:'Cônjuge',t:'rosado',ph:'(11) 9****-**41'},{n:'R*** P*** J***',r:'Dependente',t:'ceu',ph:'(11) 9****-**03'}];
function topbar(pct,noBack){return `<div class="topbar"><div class="tb">${noBack?'<span></span>':`<button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button>`}<span class="wm">${logo(22,false,"sm")}</span><span></span></div><div class="prog" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>`;}
function flow(o){const inner=`${topbar(o.pct,o.noBack)}<div class="fbody">${o.body}</div>${o.dock?`<div class="dock">${o.dock}</div>`:''}`;return o.form?`<form class="flow" data-submit="${o.form}" novalidate>${inner}</form>`:`<div class="flow">${inner}</div>`;}
const head=(eb,title,lede)=>`<div>${eb?`<p class="eb2" style="margin-bottom:10px">${eb}</p>`:''}<h1 class="big">${title.replace(/e-mail/g,'e\u2011mail')}</h1>${lede?`<p class="lede">${lede}</p>`:''}</div>`;
function bigField(o){return `<div class="bigin" id="f-${o.id}">${o.label?`<label class="eb2" for="${o.id}">${o.label}</label>`:''}<div class="bigwrap"><input id="${o.id}" type="${o.type||'text'}" placeholder="${esc(o.ph||'')}" value="${esc(o.val||'')}" ${o.ac?`autocomplete="${o.ac}"`:''} ${o.im?`inputmode="${o.im}"`:''} ${o.max?`maxlength="${o.max}"`:''} aria-label="${esc(o.label||o.ph||'')}">${o.reveal?`<button type="button" class="eyebtn" data-a="reveal" data-v="${o.id}" aria-label="Mostrar senha" aria-pressed="false">${ic('eye',22,1.75)}</button>`:''}</div><span class="hint" data-hint="${esc(o.hint||'')}">${esc(o.hint||'')}</span></div>`;}
const privacy=`<p class="privacy">${ic('lock',16,1.75)}<span>Usamos esse dado apenas para localizar seu cadastro. Nada é alterado nesta etapa.</span></p>`;

const IDENTITY_TERMS=[{id:'alva',source:'VEM',title:'Termos de uso e privacidade',version:'2.0',required:true},{id:'product',source:'VEM',title:'Termos de compra de ingressos',version:'1.1',required:true},{id:'news',source:'VEM',title:'Receber novidades de eventos',version:'1.0',required:false}];
function mobileTermsList(accept=true){return `<div class="stack g4" id="sTerms">${[true,false].map(required=>`<div class="stack g3"><h3 class="t3">${required?'Obrigatórios':'Opcionais'}</h3>${IDENTITY_TERMS.filter(d=>d.required===required).map(d=>`<div class="stack g2"><div class="row between g3"><span class="callout">${d.title}<small class="foot" style="display:block">${d.source} · versão ${d.version}</small></span>${accept?`<button type="button" class="switch" role="switch" aria-checked="false" aria-label="Aceitar ${d.title}" data-a="identityTerm" data-required="${d.required}"></button>`:''}</div><a class="link" href="/terms-demo.html#${d.id}" target="_blank" rel="noopener">Ler documento</a></div>`).join('')}</div>`).join('')}<span class="hint"></span></div>`;}
const mobileTermsAccepted=()=>$$('#sTerms [data-required="true"]').every(b=>b.getAttribute('aria-checked')==='true');
V.welcome=()=>({sb:'var(--ink)',amb:'welcome',html:`<div class="wel">
  <header class="wel-brand">
   <h1 class="wel-logo" aria-label="vem"><span class="lw">vem</span></h1>
   <p class="wel-line" aria-label="Seus eventos, num só lugar.">${'Seus eventos,|num só|<em>lugar</em>.'.split('|').map((w,i)=>`<span class="wl" style="--w:${i}">${w}</span>`).join(' ')}</p>
  </header>
  <div class="wel-actions">
   <button class="wbtn glow" data-a="go" data-v="login"><span class="wb-in">${ic('key',19,2)}Entrar com senha</span></button>
   <button class="wbtn sec" data-a="go" data-v="codeEmail"><span class="wb-in">${ic('mail',19,2)}Entrar com código por e-mail</span></button>
   <button class="wbtn sec" data-a="startSignup"><span class="wb-in">${ic('userplus',19,2)}Criar conta</span></button>
  </div>
  <p class="wel-legal"><button class="link" data-a="guest">Explorar eventos sem conta</button><span aria-hidden="true"> · </span><button class="link" data-a="staffEntry">Sou da equipe de um evento</button></p>
 </div>`});
V.terms=()=>({sb:'var(--ink)',html:flow({pct:90,body:`${head('','Aceitar termos','Há uma nova versão dos documentos. Confira antes de continuar.')}${mobileTermsList()}<p class="callout" id="identityRefusal" hidden>Sem aceitar os obrigatórios, o acesso permanece bloqueado. Reveja sua escolha ou saia.</p>`,dock:`<button class="btn primary block" id="identityAccept" data-a="identityAccept" disabled>Aceitar e continuar</button><button class="tlink" data-a="identityRefuse">Recusar obrigatórios</button><button class="tlink" data-a="identityExit">Sair</button>`})});
V.login=()=>({sb:'var(--ink)',html:flow({pct:50,form:'login',
 body:`${head('Entrar com senha','Bem-vindo de volta','Acesse sua conta para comprar e ver seus ingressos.')}
  <div class="stack g4">${bigField({id:'lEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:S.email,ac:'email',im:'email'})}
  ${bigField({id:'lPass',label:'Senha',type:'password',ph:'Sua senha',ac:'current-password',reveal:true})}
  <div class="row" style="margin-top:-6px;justify-content:flex-end"><button type="button" class="link" data-a="forgot">Esqueci minha senha</button></div></div>`,
 dock:`<button class="btn primary block" type="submit">Entrar</button><button type="button" class="tlink" data-a="go" data-v="codeEmail">Prefiro receber um código</button>`})});

V.codeEmail=()=>({sb:'var(--ink)',html:flow({pct:35,form:'sendCode',
 body:`${head('Entrar com código','Qual é o seu e-mail?','Enviamos 6 dígitos para ele. Sem senha para lembrar.')}${bigField({id:'cEmail',type:'email',ph:'seu@email.com',val:S.email,ac:'email',im:'email',hint:'O e-mail da sua conta no VEM'})}`,
 dock:`<button class="btn primary block" type="submit">Enviar código</button>`})});

V.otp=()=>{const su=S.otpCtx==='signup';const dest=su?maskEmail(S.su.email):S.email||'seu@email.com';return{sb:'var(--ink)',html:flow({pct:su?80:70,
 body:`${head('','Digite o código',`Enviamos 6 dígitos para <span class="mask">${esc(dest)}</span>`)}
  <div class="stack g3"><div class="otpu" id="otp" role="group" aria-label="Código de 6 dígitos">${[0,1,2,3,4,5].map(i=>`<input inputmode="numeric" autocomplete="${i?'off':'one-time-code'}" maxlength="1" aria-label="Dígito ${i+1}" data-i="${i}">`).join('')}</div>
  <div class="otpmeta"><span id="otpExp">expira em 15:00</span><span id="otpAtt">Tentativas: ${S.su.att} de 5</span></div>
  <div class="otpmsg" id="otpMsg" role="alert"></div></div>`,
 dock:`<div class="nochg"><b>Não chegou?</b><p>Verifique a caixa de spam. O remetente é <span class="mask">nao-responda@vem.app</span>.</p><button type="button" class="tlink" id="resend" data-a="resend" disabled>Reenviar em 1:00</button></div>`})};};


V.signupForm=()=>{const p=S.prefill||{};return{sb:'var(--ink)',html:flow({pct:p.found?100:50,form:'createAccount',noBack:!!p.found,
 body:`${head(p.found?'Integração · última etapa':'Novo cadastro',p.found?'Crie seu acesso':'Criar conta',p.found?'Confira nome e e-mail e defina uma senha. Família e endereço já estão com a gente.':'Só o essencial agora. Família e endereço você completa depois.')}
  <div class="stack g4">
  <div class="row g3" style="align-items:flex-start"><div class="grow">${field({id:'sNome',label:'Nome',ph:'Seu nome',val:p.nome||'',ac:'given-name'})}</div><div class="grow">${field({id:'sSobre',label:'Sobrenome',ph:'Seu sobrenome',val:p.sobre||'',ac:'family-name'})}</div></div>
  ${field({id:'sEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:p.email||'',ac:'email',im:'email'})}
  ${field({id:'sPass',label:'Senha',type:'password',ph:'Crie uma senha',ac:'new-password',reveal:true,hint:'Mínimo de 8 caracteres, com letras e números.'})}
  <div class="stack g2"><div class="bar" aria-hidden="true"><i id="pwBar" style="width:0"></i></div><span class="foot" id="pwTxt">Força da senha</span></div>
  <div class="field" id="f-sTerms">${mobileTermsList()}</div>
  </div>`,
 dock:`<button class="btn primary block" type="submit" id="identityCreate" disabled>Criar conta</button>`})};};


function forgotSheet(){sheet(`<form class="stack g5" data-submit="forgotSend" novalidate><div class="stack g2"><h3 class="t2">Redefinir senha</h3><p class="callout">Enviamos um botão e um código para criar sua nova senha. Botão e código válidos por 1 hora.</p></div>${field({id:'fEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:val('lEmail')||S.email,im:'email'})}<button class="btn primary block" type="submit">Continuar</button></form>`);}
V.loginBlocked=()=>({sb:'var(--ink)',html:flow({pct:50,body:`${head('Entrar','Entrada temporariamente bloqueada','Tente novamente em 14:59 ou escolha outra forma de acesso.')}<p class="foot">Demonstração de bloqueio. O tempo é ilustrativo.</p>`,dock:`<button class="btn primary block" data-a="go" data-v="codeEmail">Entrar com código</button><button class="btn secondary block" data-a="forgot">Redefinir senha</button>`})});
V.resetPassword=()=>({sb:'var(--ink)',html:flow({pct:70,form:'resetDemo',body:`${head('Redefinir senha','Crie sua nova senha','Se houver uma conta para este e-mail, enviamos as instruções. Confira também o spam.')}<div class="stack g4">${field({id:'resetCode',label:'Código de 6 dígitos',ph:'123456',im:'numeric',max:6,ac:'one-time-code'})}${field({id:'resetPass',label:'Nova senha',type:'password',ph:'Crie uma senha',ac:'new-password',reveal:true,hint:'Mínimo de 8 caracteres, com letras e números.'})}<p class="foot">Botão e código válidos por 1 hora. Demonstração: use 123456; nenhum e-mail é enviado.</p></div>`,dock:`<button class="btn primary block" type="submit">Redefinir senha</button><button class="tlink" type="button" data-a="resetResendDemo">Reenviar código</button>`})});
V.resetDone=()=>({sb:'var(--ink)',html:flow({pct:100,body:`${head('','Senha redefinida','As outras sessões foram encerradas. Entre com sua nova senha.')}`,dock:`<button class="btn primary block" data-a="go" data-v="login">Voltar para entrar</button>`})});

const HOOK={
 otp(){
  const box=$('#otp'),ins=$$('input',box),msg=$('#otpMsg'),att=$('#otpAtt');
  setTimeout(()=>ins[0]&&ins[0].focus({preventScroll:true}),320);
  if(!S.su.expAt)S.su.expAt=Date.now()+15*60000;
  clearInterval(expTimer);const tick=()=>{const e=$('#otpExp');if(!e){clearInterval(expTimer);return;}const left=Math.max(0,Math.round((S.su.expAt-Date.now())/1000));e.textContent='expira em '+Math.floor(left/60)+':'+String(left%60).padStart(2,'0');};tick();expTimer=setInterval(tick,1000);
  const lock=()=>{box.classList.add('locked');ins.forEach(i=>{i.disabled=true});msg.textContent='Tentativas esgotadas. Peça um novo código abaixo.';const r=$('#resend');clearInterval(resendTimer);r.disabled=false;r.textContent='Pedir novo código';};
  if(S.su.att<=0)lock();
  const code=()=>ins.map(i=>i.value).join('');
  const check=async()=>{const c=code();if(c.length<6)return;ins.forEach(i=>i.blur());
   if(c==='000000'){S.su.att--;att.textContent='Tentativas: '+S.su.att+' de 5';att.classList.toggle('warn',S.su.att<=2);box.classList.add('bad');box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake');
    msg.textContent=S.su.att>0?'Código incorreto. Confira o e-mail e tente de novo.':'';
    await wait(900);ins.forEach(i=>{i.value='';i.classList.remove('filled')});box.classList.remove('bad');if(S.su.att<=0){lock();return;}ins[0].focus();return;}
   box.classList.add('ok');msg.textContent='';await wait(550);
   if(S.otpCtx==='signup'){afterAuth('signup');}
   else{overlayLoading('Entrando…');await wait(800);afterAuth();}
  };
  ins.forEach((inp,i)=>{
   inp.addEventListener('input',()=>{const d=inp.value.replace(/\D/g,'');if(d.length>1){d.slice(0,6-i).split('').forEach((ch,k)=>{ins[i+k].value=ch;ins[i+k].classList.add('filled')});ins[Math.min(i+d.length,5)].focus();check();return;}inp.value=d;inp.classList.toggle('filled',!!d);if(d&&i<5)ins[i+1].focus();if(msg.textContent&&S.su.att>0)msg.textContent='';check();});
   inp.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!inp.value&&i>0){ins[i-1].focus();ins[i-1].value='';ins[i-1].classList.remove('filled');}if(e.key==='ArrowLeft'&&i>0)ins[i-1].focus();if(e.key==='ArrowRight'&&i<5)ins[i+1].focus();});
   inp.addEventListener('paste',e=>{const t=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);if(!t)return;e.preventDefault();t.split('').forEach((ch,k)=>{if(ins[k]){ins[k].value=ch;ins[k].classList.add('filled')}});ins[Math.min(t.length,5)].focus();check();});
  });
  if(S.su.att>0)startResend();
 },
 signupForm(){const p=$('#sPass'),bar=$('#pwBar'),t=$('#pwTxt');const upd=()=>{const v=p.value;let s=0;if(v.length>=8)s++;if(/[a-z]/i.test(v)&&/\d/.test(v))s++;if(/[^a-z0-9]/i.test(v)||v.length>=12)s++;const L=[['0%','Força da senha','var(--line)'],['34%','Fraca','var(--danger-text)'],['67%','Boa','var(--warning-fill)'],['100%','Forte','var(--accent)']][v?Math.max(s,1):0];bar.style.width=L[0];bar.style.background=L[2];t.textContent=L[1];};p.addEventListener('input',upd);},
};

function startResend(){clearInterval(resendTimer);let n=60;const b=$('#resend');if(!b)return;b.disabled=true;b.textContent='Reenviar em 1:00';resendTimer=setInterval(()=>{n--;if(!document.body.contains(b)){clearInterval(resendTimer);return;}b.textContent='Reenviar em 0:'+String(n).padStart(2,'0');if(n<=0){clearInterval(resendTimer);b.disabled=false;b.textContent='Reenviar código';}},1000);}
function splashSVG(){const C={x:60,y:58},R0=27,R1=40,ang=[-162,-126,-90,-54,-18],del=[.98,.72,.46,.6,.86],sh=[1.62,1.5,1.42,1.47,1.56];
 const L=(a,i,cls,st)=>{const r=a*Math.PI/180,x1=C.x+R0*Math.cos(r),y1=C.y+R0*Math.sin(r),x2=C.x+R1*Math.cos(r),y2=C.y+R1*Math.sin(r);return `<line class="${cls}" style="${st}" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" pathLength="1"/>`;};
 return `<svg class="sp-sun" viewBox="0 0 120 76" aria-hidden="true"><defs><linearGradient id="spG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sp-s1"/><stop offset="1" class="sp-s2"/></linearGradient><clipPath id="spC"><rect x="0" y="0" width="120" height="${C.y}"/></clipPath>
  <filter id="spBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6"/></filter></defs>
  <g class="sp-halo" filter="url(#spBlur)" stroke-width="7" stroke-linecap="round">${ang.map((a,i)=>L(a,i,'sp-hr',`--d:${sh[i]}s`)).join('')}</g>
  <g class="sp-rays" stroke-width="5.2" stroke-linecap="round">${ang.map((a,i)=>L(a,i,'sp-ray',`--d:${del[i]}s`)).join('')}</g>
  <g class="sp-shine" stroke-width="5.2" stroke-linecap="round">${ang.map((a,i)=>L(a,i,'sp-sh',`--d:${sh[i]}s`)).join('')}</g>
  <g clip-path="url(#spC)"><circle class="sp-disc" cx="${C.x}" cy="${C.y}" r="21" fill="url(#spG)"/><rect class="sp-dsh" x="30" y="30" width="16" height="30" fill="#fff" transform="skewX(-20)"/></g>
  <line class="sp-hz" x1="14" y1="66" x2="106" y2="66" stroke-width="5.2" stroke-linecap="round" pathLength="1"/></svg>`;}

function showSplash(){const ph=$('#phone');if(!ph)return;const old=$('#splash');if(old)old.remove();clearTimeout(window._spT1);clearTimeout(window._spT2);clearTimeout(window._spT3);
 const d=document.createElement('div');d.id='splash';d.className='splash';d.innerHTML=`<div class="sp-glow"></div><div class="sp-mark">${splashSVG()}</div>`;
 ph.appendChild(d);ph.classList.add('sp-on');
 window._spT1=setTimeout(()=>{const sun=$('.sp-sun',d),tgt=null;
  if(tgt){const a=sun.getBoundingClientRect(),b=tgt.getBoundingClientRect();const ax=a.left+a.width*.5,ay=a.top+a.height*58/76,bx=b.left+b.width*.5,by=b.top+b.height*25/32;
   const k=(b.height*10/32)/(a.width*21/120);sun.style.transformOrigin=`${a.width*.5}px ${a.height*58/76}px`;sun.style.transform=`translate(${bx-ax}px,${by-ay}px) scale(${k})`;d.classList.add('sp-morph');}
  else d.classList.add('sp-out');
  ph.classList.remove('sp-on');ph.classList.add('sp-reveal');},2250);
 window._spT2=setTimeout(()=>d.classList.add('sp-fade'),2900);
 window._spT3=setTimeout(()=>{d.remove();ph.classList.remove('sp-reveal');},3400);}

function dawnSky(on){
 const ph=$('#phone');if(!ph)return;let bg=$('#authBg');
 if(!bg){bg=document.createElement('div');bg.id='authBg';bg.className='authbg';bg.setAttribute('aria-hidden','true');
  bg.innerHTML='<div class="ab-veil v1"></div><div class="ab-veil v2"></div><div class="ab-veil v3"></div><div class="ab-horizon"></div>';
  ph.insertBefore(bg,$('#view'));}
 ph.classList.toggle('auth-on',on);ph.classList.toggle('auth-wel',on&&S.screen==='welcome');
}

function splitWords(el){if(el.dataset.split||el.children.length)return;const txt=el.textContent;el.dataset.split='1';el.setAttribute('aria-label',txt);
 const chars=el.classList.contains('wordmark');el.innerHTML=(chars?txt.split(''):txt.split(/(\s+)/)).map((w,i)=>/^\s+$/.test(w)?w:`<span class="w" aria-hidden="true"><span style="--wi:${i}">${esc(w)}</span></span>`).join('');}
function motionIn(){const sc=$('#scr');if(!sc||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sc.classList.add('fresh');
 $$('.big,.t1,.wordmark,.mname',sc).forEach(splitWords);
 const picks=$$(':scope > header > *, :scope > .pad > *, :scope .fbody > *, :scope .dock > *, :scope .list > *, :scope .qgrid > *, :scope .hscroll > *, :scope .carousel > *, :scope .agh > *, :scope .stats > *, :scope #agBody > *, :scope .cal-grid > .day',sc);
 let i=0;picks.forEach(el=>{if(el.closest('.list')&&el.parentElement.children.length>10&&[...el.parentElement.children].indexOf(el)>9)return;el.classList.add('rise');el.style.setProperty('--d',Math.min(i*(el.classList.contains('day')?8:45),520)+'ms');i++;});
 setTimeout(()=>{if(sc.isConnected){sc.classList.remove('fresh');$$('.rise',sc).forEach(el=>el.classList.remove('rise'));}},1300);}
let lastTab=null;
function tabIndicator(){const bar=$('.tabbar');if(!bar)return;const act=$('.tab[aria-current="page"]',bar);if(!act)return;const ind=document.createElement('span');ind.className='tabind';bar.prepend(ind);
 const place=el=>{ind.style.width=el.offsetWidth+'px';ind.style.transform=`translateX(${el.offsetLeft}px)`;};
 const prev=lastTab&&$(`.tab[data-v="${lastTab}"]`,bar);if(prev&&prev!==act){ind.style.transition='none';place(prev);void ind.offsetWidth;ind.style.transition='';act.classList.add('just');}place(act);lastTab=act.dataset.v;}


const A={
 identityDocuments:()=>sheet(`<div class="stack g4"><h3 class="t2">Termos e privacidade</h3>${mobileTermsList(false)}<button class="btn primary block" data-a="closeSheet">Fechar</button></div>`),
 identityTerm:(v,el)=>{el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true');const b=$('#identityCreate')||$('#identityAccept');if(b)b.disabled=!mobileTermsAccepted();const msg=$('#identityRefusal');if(msg&&mobileTermsAccepted())msg.hidden=true;},
 reveal:(v,el)=>{const i=$('#'+v);const show=i.type==='password';i.type=show?'text':'password';el.innerHTML=ic(show?'eyeOff':'eye',el.closest('.bigwrap')?22:20,1.75);el.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');el.setAttribute('aria-pressed',show);const n=i.value.length;i.focus();try{i.setSelectionRange(n,n)}catch(_){}},
 forgot:()=>forgotSheet(),
 resetResendDemo:()=>toast('info','Código reenviado','Demonstração: use 123456.'),
 toggleTerms:(v,el)=>{el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true');clearErr('sTerms');},
 sw:(v,el)=>el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true'),
 resend:async(v,el)=>{el.disabled=true;el.textContent='Enviando…';await wait(900);const was=S.su.att<=0;S.su.att=5;S.su.expAt=Date.now()+15*60000;toast('success','Novo código enviado','O anterior deixou de valer.');if(was){softRender();}else{startResend();}},
 closeSheet:()=>closeSheet()
};

const LEGAL={termos:['Termos de uso','Regras de uso do app da igreja: o que você pode fazer, o que a igreja faz com o que você publica e como encerrar a conta quando quiser.'],privacidade:['Política de privacidade','Quais dados guardamos (nome, contato, família e participação), quem na igreja pode ver cada um e como pedir cópia ou exclusão.']};

const F={
 async forgotSend(f){const e=val('fEmail');if(!e){setErr('fEmail','Informe seu e-mail.');return;}if(!EMAIL_RE.test(e)){setErr('fEmail','Digite um e-mail válido, como nome@email.com.');return;}
  S.email=e;await closeSheet();go('resetPassword');},
 resetDemo:()=>go('resetDone')
};

/* ---------- delegation ---------- */
const phone=$('#phone');
phone.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||!phone.contains(el))return;
 if(el.dataset.self&&e.target!==el)return;const fn=A[el.dataset.a];if(!fn)return;e.preventDefault();e.stopPropagation();fn(el.dataset.v,el);});
phone.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-a]')){e.preventDefault();e.target.click();}if(e.key==='Escape'&&$('#overlay .scrim'))closeSheet();});
phone.addEventListener('submit',e=>{const f=e.target;e.preventDefault();const fn=F[f.dataset.submit];if(fn)fn(f);});
phone.addEventListener('input',e=>{if(e.target.id)clearErr(e.target.id);const t=e.target;
 if(t.id==='mCep'){const d=t.value.replace(/\D/g,'').slice(0,8);t.value=d.length>5?d.slice(0,5)+'-'+d.slice(5):d;if(d.length===8&&!val('mRua')){[['mRua','Rua das Acácias'],['mBairro','Jardins'],['mCid','São Paulo'],['mUf','SP']].forEach(([i,v])=>{const x=$('#'+i);if(x&&!x.value)x.value=v;});$('#mNum')&&$('#mNum').focus();}}
 if(t.id==='mNasc'||t.id==='fNasc'){const d=t.value.replace(/\D/g,'').slice(0,8);t.value=d.length>4?d.slice(0,2)+'/'+d.slice(2,4)+'/'+d.slice(4):d.length>2?d.slice(0,2)+'/'+d.slice(2):d;}
 if(t.id==='mTel')t.value=maskPhone(t.value);});



/* ---------- navegação, perfis e entrada ---------- */
const AUTHS=['welcome','login','codeEmail','otp','signupForm','resetPassword','resetDone','loginBlocked','terms'];
const TABS={visitante:[['home','search','Descobrir'],['ingressos','ticket','Ingressos'],['perfil','user','Perfil']],comprador:[['home','search','Descobrir'],['ingressos','ticket','Ingressos'],['perfil','user','Perfil']],equipe:[['staffHome','scan','Check-in'],['perfil','user','Perfil']]};
const tabsFor=()=>TABS[S.role];
const AMB={home:'home',ingressos:'agenda',perfil:'mais',staffHome:'home',evento:'home',comprar:'home',ingresso:'agenda',ckEvento:'home',meusDados:'mais',pagamentos:'mais',notifs:'mais'};
let resendTimer=null,expTimer=null;
function render(dir){
 clearInterval(expTimer);
 const out=V[S.screen]();const view=$('#view');
 view.innerHTML=`<div data-amb="${out.amb||AMB[S.screen]||(AUTHS.includes(S.screen)?'auth':'mais')}" class="screen ${out.tabs?'has-tabs':''} ${dir==='back'?'enter-back':dir==='none'?'':dir==='tab'?'enter-tab':'enter'}" id="scr">${out.html}</div>`;
 const sbar=$('.statusbar');sbar.style.setProperty('--sb',out.sb||'var(--ink)');sbar.style.setProperty('--sbbg','transparent');const scr=$('#scr');if(out.tabs)scr.addEventListener('scroll',()=>{sbar.style.setProperty('--sbbg',scr.scrollTop>40?'var(--glass)':'transparent');sbar.style.backdropFilter=scr.scrollTop>40?'blur(20px)':'none';},{passive:true});else sbar.style.backdropFilter='none';
 $('#tabbarSlot').innerHTML=out.tabs?`<nav class="tabbar" aria-label="Navegação principal">${tabsFor().map(t=>`<button class="tab" data-a="tab" data-v="${t[0]}" ${out.tabs===t[0]?'aria-current="page"':''}>${ic(t[1],24,out.tabs===t[0]?2.25:1.75)}${t[2]}</button>`).join('')}</nav>`:'';
 dawnSky(AUTHS.includes(S.screen));
 (HOOK[S.screen]||(()=>{}))();
 const q=$('#q');if(q)q.addEventListener('input',()=>{S.q=q.value;const p=q.selectionStart;softRender();const n=$('#q');if(n){n.focus();try{n.setSelectionRange(p,p);}catch(_){}}});
 const kq=$('#ckq');if(kq)kq.addEventListener('input',()=>{S.ckq=kq.value;const p=kq.selectionStart;softRender();const n=$('#ckq');if(n){n.focus();try{n.setSelectionRange(p,p);}catch(_){}}});
 const kc=$('#kc');if(kc)kc.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();A.kioskGo();}});
 if(dir!=='none')motionIn();
 tabIndicator();
 railSync();
}
function go(s,opt={}){if(opt.replace)S.hist=[];else S.hist.push(S.screen);S.screen=s;$('#overlay').innerHTML='';render(opt.dir);}
function back(){S.screen=S.hist.pop()||(S.role==='equipe'?'staffHome':S.role==='visitante'&&S.screen!=='home'?'home':'home');$('#overlay').innerHTML='';render('back');}
function softRender(){const sc=$('#scr');const top=sc?sc.scrollTop:0;render('none');const n=$('#scr');if(n)n.scrollTop=top;}
/* depois de entrar: equipe vai para o check-in; comprador para o Descobrir */
function afterAuth(kind){
 const em=(S.email||'').toLowerCase();
 if(em===D.STAFF_ME.e.toLowerCase()||S.role==='equipe'||S.entryStaff){S.role='equipe';S.user={first:D.STAFF_ME.n.split(' ')[0],name:D.STAFF_ME.n};}
 else{S.role='comprador';if(kind!=='signup'||!S.user||!S.user.name)S.user={first:'Ana',name:D.BUYER.n};}
 S.entryStaff=false;S.hist=[];S.screen=S.role==='equipe'?'staffHome':'home';$('#overlay').innerHTML='';render();
 toast('success','Bem-vindo(a)!',S.user.name);
}
function setRole(r){
 S.role=r;S.hist=[];$('#overlay').innerHTML='';
 if(r==='equipe'){S.user={first:D.STAFF_ME.n.split(' ')[0],name:D.STAFF_ME.n};S.screen='staffHome';}
 else if(r==='comprador'){S.user={first:'Ana',name:D.BUYER.n};S.screen=['staffHome','ckEvento'].includes(S.screen)||AUTHS.includes(S.screen)?'home':S.screen;}
 else{S.screen=['staffHome','ckEvento','ingresso','comprar'].includes(S.screen)||AUTHS.includes(S.screen)?'home':S.screen;}
 render();
}

Object.assign(A,{
 go:v=>go(v),back,
 tab:v=>{closeSheet();if(S.role==='visitante'&&v==='ingressos'){}if(S.screen===v)return;S.hist=[];S.screen=v;render('tab');},
 guest:()=>{S.role='visitante';S.hist=[];S.screen='home';render();},
 toWelcome:()=>{closeSheet();S.hist=[];S.screen='welcome';render('back');},
 staffEntry:()=>{S.entryStaff=true;go('login');setTimeout(()=>{const e=$('#lEmail');if(e)e.value=D.STAFF_ME.e;},0);toast('info','Entrada da equipe','Use o e-mail que o organizador cadastrou.');},
 startSignup:()=>{S.prefill=null;go('signupForm');},
 logout:()=>{closeSheet();S.role='visitante';S.user={first:'Ana',name:D.BUYER.n};S.hist=[];S.screen='welcome';render('back');toast('info','Você saiu da conta','');},
 logoutAsk:()=>sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Sair da conta?</h3><p class="body">Você vai precisar entrar de novo para ver seus ingressos e QR Codes.</p></div><div class="stack g3"><button class="btn danger block" data-a="logout">Sair da conta</button><button class="btn secondary block" data-a="closeSheet">Cancelar</button></div></div>`),
 identityAccept:()=>afterAuth('signup'),
 soon:v=>toast('info',v||'Em breve','Disponível na versão final do app.'),
 copy:v=>toast('success','Copiado',v||'')
});
Object.assign(F,{
 async login(f){const e=val('lEmail'),p=$('#lPass').value;let ok=true;
  if(!e){setErr('lEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('lEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}
  if(!p){setErr('lPass','Informe sua senha.');ok=false;}
  if(!ok)return;const btn=$('button[type=submit]',f);await busy(btn,1100);
  if(p.toLowerCase()==='errada'){setErr('lPass','E-mail ou senha incorretos');toast('error','E-mail ou senha incorretos','Tente de novo ou entre com código por e-mail.');return;}
  S.email=e;afterAuth();},
 async sendCode(f){const e=val('cEmail');if(!e){setErr('cEmail','Informe seu e-mail.');return;}if(!EMAIL_RE.test(e)){setErr('cEmail','Digite um e-mail válido, como nome@email.com.');return;}
  await busy($('button[type=submit]',f),1000);S.email=e;S.otpCtx='login';S.su.att=5;S.su.expAt=Date.now()+15*60000;
  toast('success','Código enviado','Confira a caixa de entrada de '+e+'.');go('otp');},
 async createAccount(f){let ok=true;const n=val('sNome'),s=val('sSobre'),e=val('sEmail'),p=$('#sPass').value,t=mobileTermsAccepted();
  if(!n){setErr('sNome','Informe seu nome.');ok=false;}
  if(!s){setErr('sSobre','Informe seu sobrenome.');ok=false;}
  if(!e){setErr('sEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('sEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}else if(e.toLowerCase()==='teste@example.org'){setErr('sEmail','Este e-mail já tem conta. Volte e entre com ele.');ok=false;}
  if(!p){setErr('sPass','Crie uma senha.');ok=false;}else if(p.length<8||!/[a-z]/i.test(p)||!/\d/.test(p)){setErr('sPass','Use 8 caracteres ou mais, com letras e números.');ok=false;}
  if(!t){setErr('sTerms','Aceite os termos para continuar.');ok=false;}
  if(!ok){toast('error','Revise os campos destacados','');return;}
  await busy($('button[type=submit]',f),1300,null,'Conta criada');S.user={first:n,name:n+' '+s};S.email=e;S.otpCtx='signup';S.su.email=e;S.su.att=5;S.su.expAt=Date.now()+15*60000;
  toast('success','Código enviado','Confirme o e-mail '+e+' para ativar a conta.');go('otp');}
});


/* =========================================================
   VEM · comprador: descobrir, evento, compra, ingressos, perfil
   ========================================================= */
const money=D.money,evs=D.evOf;
const orgN=e=>D.orgOf(e.org).n;
const CTONE={Conferência:'laranja',Retiro:'lima',Congresso:'ambar',Curso:'menta',Show:'rosado',Encontro:'salvia',Outro:'ceu'};
const GCLS={Conferência:'brasa',Retiro:'lima',Congresso:'aurora',Curso:'mar',Show:'vinho',Encontro:'mar',Outro:'brasa'};
const gOf=e=>GCLS[e.cat]||'brasa';
const stateOf=e=>D.isPast(e)?['danger','Encerrado']:e.st==='pausado'?['warning','Vendas pausadas']:D.evLeft(e)===0?['danger','Esgotado']:null;
const myOrder=e=>S.role==='comprador'&&D.MY().find(o=>o.ev===e.id&&o.st!=='cancelado'&&o.st!=='reembolsado');
const dparts=e=>{const d=new Date(e.d+'T12:00:00');return {d:d.getDate(),m:d.getMonth()+1,y:d.getFullYear()};};
const priceTxt=e=>D.evFrom(e)?(e.tickets.length>1?'a partir de ':'')+D.moneyS(D.evFrom(e)):'Grátis';
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const orgBadge=e=>D.orgOf(e.org).via==='alva'?`<span class="tag sm" style="${tone('ceu')}">Igreja</span>`:'';
const nxChips=(opts,cur,act)=>`<div class="nxchips" role="tablist">${opts.map(o=>`<button class="chip" aria-pressed="${o===cur}" data-a="${act}" data-v="${o}">${o}</button>`).join('')}</div>`;
const ST2=(k,t)=>`<span class="st2 ${k}"><i></i>${t}</span>`;
const subHead=(title,lede,right)=>`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button>${right||''}</div><h1 class="big" style="margin-top:18px">${title}</h1>${lede?`<p class="lede">${lede}</p>`:''}</header>`;
const sub=(title,lede,body,right,tabs)=>({sb:'var(--ink)',tabs:tabs===undefined?'perfil':tabs,html:`${subHead(title,lede,right)}<div class="pad stack g6" style="padding-top:8px">${body}</div>`});
const flowScreen=(title,lede,body,right)=>({sb:'var(--ink)',tabs:null,amb:'home',html:`${subHead(title,lede,right)}<div class="pad stack g6 lj-body" style="padding-top:8px">${body}</div>`});
const gate=(msg)=>`<div class="card" style="padding:28px 18px;border-radius:var(--r-lg);text-align:center"><span class="iconbox" style="${tone('ceu')};margin:0 auto 10px">${ic('user',22)}</span><p class="it-title" style="justify-content:center">Entre na sua conta</p><p class="foot" style="margin:4px 0 16px">${msg}</p><button class="btn primary md" data-a="toWelcome">Entrar</button></div>`;

function listEvents(){const q=norm(S.q.trim());
 return D.EVENTS.filter(e=>(e.st==='publicado'||e.st==='pausado')&&!D.isPast(e)&&(S.cat==='Todos'||e.cat===S.cat)&&(!q||norm(e.t+' '+orgN(e)+' '+e.city+' '+e.cat).includes(q))).sort((a,b)=>a.d<b.d?-1:1);}
const evRow=e=>{const s=stateOf(e);return `<button class="item" data-a="evento" data-v="${e.id}">${dateblk(dparts(e))}<span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${esc(e.t)}</span><span class="it-sub">${D.whenOf(e)} · ${esc(e.city)}</span><span class="it-sub"><b style="color:var(--ink)">${priceTxt(e)}</b> · ${esc(orgN(e))}</span></span><span class="stack" style="align-items:flex-end;gap:5px">${s?status(s[0],s[1]):orgBadge(e)}</span></button>`;};
const slide=(e)=>{const b=e.banner||{};return `<div class="slide gr-${gOf(e)}" data-a="evento" data-v="${e.id}" role="button" tabindex="0"><span class="eyebrow" style="color:#fff">${D.whenOf(e)}${e.city?' · '+esc(e.city):''}</span><h3>${esc(b.title||e.t)}</h3><p>${esc(b.line||e.desc.slice(0,70))}</p><button class="btn onmedia sm" data-a="evento" data-v="${e.id}">${D.evFrom(e)?'Ver ingressos':'Inscrever-se'}</button></div>`;};
V.home=()=>{
 const l=listEvents(),buyer=S.role==='comprador',ban=D.EVENTS.filter(e=>e.banner&&e.banner.on&&e.st==='publicado'&&!D.isPast(e)),pend=buyer?D.MY().filter(o=>o.st==='pendente').length:0;
 return {sb:'var(--ink)',tabs:'home',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${buyer?'São Paulo, SP':'Bem-vindo ao VEM'}</p><h1 class="t1">${buyer?'Olá, '+esc(S.user.first)+'!':'O que vem por aí?'}</h1></div>${buyer?`<button class="avatar tap" style="${tone('ceu')};border:0" data-a="tab" data-v="perfil" aria-label="Abrir perfil">${initials(S.user.name)}<span class="online"></span></button>`:`<button class="btn primary sm" data-a="toWelcome">Entrar</button>`}</div>`)}
 <div class="stack g6">
  <div class="pad stack g4"><label class="lj-search">${ic('search',18,2)}<input id="q" type="search" placeholder="Evento, cidade ou organizador" value="${esc(S.q)}" autocomplete="off"></label>${nxChips(['Todos',...D.CATS.filter(c=>c!=='Outro')],S.cat,'cat')}</div>
  ${pend?`<div class="pad" style="margin-top:-8px"><button class="pendpill" data-a="tab" data-v="ingressos"><span class="pcount">${pend}</span><span class="grow">${pend>1?pend+' pagamentos aguardando':'1 pagamento aguardando'}</span>${ic('chevR',16,2.25)}</button></div>`:''}
  ${!S.q&&S.cat==='Todos'&&ban.length?`<div class="carousel" id="car">${ban.map(slide).join('')}</div>`:''}
  <section class="stack g3 pad"><div class="row between"><h2 class="t2">${S.q||S.cat!=='Todos'?l.length+(l.length===1?' evento':' eventos'):'Próximos eventos'}</h2></div>${l.length?`<div class="list">${l.map(evRow).join('')}</div>`:'<p class="foot" style="text-align:center;padding:24px 0">Nenhum evento encontrado. Tente outra busca.</p>'}</section>
 </div>`};};
Object.assign(A,{cat:v=>{S.cat=v;softRender();},mt:v=>{S.mt=v;softRender();}});

/* ---------- evento ---------- */
const initRg=e=>{const t=e.tickets.find(x=>!x.off&&D.tkLeft(e,x)!==0)||e.tickets[0];S.rg={ev:e.id,tk:t.id,buy:[],cp:'',cpTxt:'',pay:'pix',other:false,pn:'',pe:''};};
V.evento=()=>{const e=evs(S.ev),s=stateOf(e),org=D.orgOf(e.org),mine=myOrder(e),left=D.evLeft(e);
 if(!S.rg||S.rg.ev!==e.id)initRg(e);
 const g=S.rg,t=D.tkOf(e,g.tk),tks=e.tickets.filter(x=>!x.off);
 const cta=s?`<button class="btn primary block" disabled>${s[1]}</button>`:`<button class="btn primary block split" data-a="comprar"><span>${S.role==='visitante'?'Entrar para comprar':mine?'Comprar outro ingresso':'Comprar ingresso'}</span><span class="meta">${t.price?money(t.price):'Grátis'}</span></button>`;
 return {sb:'#fff',tabs:null,amb:'home',html:`<header class="evh gr-${gOf(e)}"><div class="row between"><button class="iconbtn glass" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button><button class="iconbtn glass" data-a="shareEv" aria-label="Compartilhar">${ic('share',19,1.9)}</button></div>
  <div class="evh-b"><div class="row g2" style="flex-wrap:wrap"><span class="tag sm" style="${tone(CTONE[e.cat]||'ceu')}">${esc(e.cat)}</span>${orgBadge(e)}${s?status(s[0],s[1]):left&&left<30?status('warning','Últimas '+left+' vagas'):''}</div><h1 class="evh-t">${esc(e.t)}</h1><p class="evh-s">por ${esc(org.n)}</p></div></header>
 <div class="pad stack g6 evb">
  ${mine?`<button class="lj-ord" data-a="rgOpen" data-v="${mine.id}"><span class="iconbox" style="${tone('menta')}">${ic('ticket',20)}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">Você já tem ingresso</span><span class="it-sub">${esc(D.tkOf(e,mine.tk).n)} · toque para ver os QR Codes</span></span>${mine.st==='pago'?status('success','Confirmado'):status('warning','Pendente')}</button>`:''}
  <div class="kv"><div class="kr"><span>Quando</span><span>${D.whenOf(e)} · ${e.time}</span></div>${e.periods.length?`<div class="kr"><span>Períodos</span><span>${e.periods.join(' e ')}</span></div>`:''}<div class="kr stack2"><span>Onde</span><span>${esc(e.venue)}<br><small>${esc(e.city)}, ${e.uf}</small></span></div></div>
  <section class="stack g2"><p class="eb2">Sobre o evento</p><p class="body">${esc(e.desc)}</p></section>
  <section class="stack g3"><p class="eb2">Escolha o ingresso</p><div class="lj-pay rg-pay" role="radiogroup">${tks.map(x=>{const l=D.tkLeft(e,x),out=l===0;return `<button type="button" role="radio" aria-checked="${x.id===g.tk}" data-a="evTk" data-v="${x.id}" ${out||s?'disabled':''}><span class="grow stack" style="gap:2px;align-items:flex-start"><b>${esc(x.n)}</b><small>${out?'Esgotado':esc(x.desc)}</small>${x.incl.length?`<small class="rg-inc">Inclui ${x.incl.map(id=>esc(D.itLabel(D.itOf(e,id)))).join(', ')}</small>`:''}${x.per.length?`<small class="rg-inc">Vale só ${x.per.join(' e ')}</small>`:''}${l!=null&&l>0&&l<=15?`<small class="rg-inc">Restam ${l}</small>`:''}</span><b class="rg-pr">${x.price?money(x.price):'Grátis'}</b><i class="lj-rd"></i></button>`;}).join('')}</div>
   ${e.items.filter(i=>!i.off).length?`<p class="foot">${ic('gift',13,2)} Você ainda escolhe, na compra: ${e.items.filter(i=>!i.off).map(D.itLabel).join(', ')}.</p>`:''}</section>
  <div class="card row g3" style="padding:14px 16px;border-radius:var(--r-md);align-items:center"><span class="iconbox" style="${tone('ceu')}">${ic(org.via==='alva'?'church':'store',20)}</span><span class="grow stack" style="gap:2px"><span class="it-title" style="font-size:16px">${esc(org.n)}</span><span class="it-sub">${org.via==='alva'?'Igreja · evento publicado pelo Alva':'Organizador no VEM'}</span></span></div>
  <p class="foot">Cancelamento: até 7 dias antes do evento, com reembolso integral. O organizador pode ter regras próprias.</p>
 </div><div class="stickycta">${cta}</div>`};};
Object.assign(A,{
 evento:v=>{S.ev=v;initRg(evs(v));go('evento');const sc=$('#scr');if(sc)sc.scrollTop=0;},
 evTk:v=>{const g=S.rg,t=D.tkOf(evs(g.ev),v);g.tk=v;g.buy=g.buy.filter(id=>!t.incl.includes(id));softRender();},
 shareEv:()=>toast('success','Link copiado','vem.app/e/'+S.ev),
 comprar:()=>{if(S.role==='visitante'){sheet(`<div class="stack g5" style="align-items:center;text-align:center"><span class="iconbox" style="${tone('ceu')}">${ic('user',24)}</span><div class="stack g2"><h3 class="t2">Entre para comprar</h3><p class="body">Seu ingresso e os QR Codes ficam guardados na sua conta.</p></div><button class="btn primary block" data-a="toWelcome">Entrar</button><button class="tlink" data-a="closeSheet">Agora não</button></div>`);return;}
  S.rg.buy=S.rg.buy||[];go('comprar');}
});

/* ---------- compra ---------- */
function rgCalc(){const g=S.rg,e=evs(g.ev),t=D.tkOf(e,g.tk),c=e.coupons.find(x=>x.code===g.cp),disc=c?Math.min(t.price,c.type==='pct'?Math.round(t.price*c.v)/100:c.v):0;
 const adds=g.buy.map(id=>D.itOf(e,id)).filter(i=>i&&!t.incl.includes(i.id)),add=adds.reduce((a,i)=>a+i.price,0);return {e,t,c,disc,adds,add,total:t.price-disc+add};}
V.comprar=()=>{const c=rgCalc(),g=S.rg,{e,t}=c,tks=e.tickets.filter(x=>!x.off);
 return flowScreen(esc(e.t),D.whenOf(e)+' · '+esc(e.city),`
  ${tks.length>1?`<section class="stack g3"><p class="eb2">Ingresso</p><div class="lj-pay rg-pay" role="radiogroup">${tks.map(x=>{const l=D.tkLeft(e,x),out=l===0;return `<button type="button" role="radio" aria-checked="${x.id===g.tk}" data-a="rgTk" data-v="${x.id}" ${out?'disabled':''}><span class="grow stack" style="gap:2px;align-items:flex-start"><b>${esc(x.n)}</b><small>${out?'Esgotado':esc(x.desc)}</small>${x.incl.length?`<small class="rg-inc">Inclui ${x.incl.map(id=>esc(D.itLabel(D.itOf(e,id)))).join(', ')}</small>`:''}${l!=null&&l>0&&l<=15?`<small class="rg-inc">Restam ${l}</small>`:''}</span><b class="rg-pr">${x.price?money(x.price):'Grátis'}</b><i class="lj-rd"></i></button>`;}).join('')}</div></section>`:''}
  ${e.items.filter(i=>!i.off).length?`<section class="stack g3"><p class="eb2">Compras adicionais <span class="rg-opt">opcional</span></p><div class="lj-pay rg-pay">${e.items.filter(i=>!i.off).map(i=>{const inc=t.incl.includes(i.id),on=inc||g.buy.includes(i.id);return `<button type="button" role="checkbox" aria-checked="${on}" data-a="rgAdd" data-v="${i.id}" ${inc?'disabled':''}><span class="grow stack" style="gap:1px;align-items:flex-start"><b>${esc(i.n)}</b><small>${inc?'Já incluso no seu ingresso':esc(i.p||'Evento todo')}</small></span><b class="rg-pr">${inc?'Incluso':money(i.price)}</b><i class="rg-ck">${ic('check',13,3)}</i></button>`;}).join('')}</div></section>`:''}
  <section class="stack g3"><p class="eb2">Participante</p><div class="seg"><button aria-selected="${!g.other}" data-a="rgWho" data-v="me">Para mim</button><button aria-selected="${g.other}" data-a="rgWho" data-v="other">Para outra pessoa</button></div>
   ${g.other?`<div class="stack g3">${field({id:'pn',label:'Nome da pessoa',ph:'Nome completo',val:g.pn})}${field({id:'pe',label:'E-mail',type:'email',ph:'pessoa@email.com',val:g.pe,hint:'Os códigos ficam na sua conta e o nome dela vai no ingresso.'})}</div>`:''}</section>
  ${t.price?`<section class="stack g3"><p class="eb2">Voucher ou cupom <span class="rg-opt">opcional</span></p>${c.c?`<div class="card row g3 rg-vcok" style="padding:12px 16px;border-radius:var(--r-md);align-items:center"><span class="iconbox" style="${tone('menta')}">${ic('percent',18)}</span><span class="grow stack" style="gap:1px"><b class="mask">${esc(c.c.code)}</b><span class="it-sub">− ${money(c.disc)} no ingresso</span></span><button type="button" class="tlink" data-a="cpClear">Remover</button></div>`:`<div class="rg-vcf"><input id="cp" placeholder="Código do voucher" value="${esc(g.cpTxt||'')}" autocomplete="off" autocapitalize="characters"><button type="button" class="btn secondary md" data-a="cpApply">Aplicar</button></div>`}</section>`:''}
  ${c.total?`<section class="stack g3"><p class="eb2">Pagamento</p><div class="lj-pay" role="radiogroup">${[['pix','Pix','qr','Confirmação na hora'],['cartao','Cartão de crédito','card',(S.cards.find(x=>x.def)||S.cards[0]||{brand:'Cartão',last:'----'}).brand+' final '+(S.cards.find(x=>x.def)||S.cards[0]||{last:'----'}).last]].map(([k,l,i,s])=>`<button type="button" role="radio" aria-checked="${g.pay===k}" data-a="rgPay" data-v="${k}">${ic(i,20,1.9)}<span class="grow stack" style="gap:1px;align-items:flex-start"><b>${l}</b><small>${s}</small></span><i class="lj-rd"></i></button>`).join('')}</div></section>`:''}
  <div class="kv"><div class="kr"><span>${esc(t.n)}</span><span>${t.price?money(t.price):'Grátis'}</span></div>${c.disc?`<div class="kr"><span>Voucher ${esc(c.c.code)}</span><span>− ${money(c.disc)}</span></div>`:''}${c.add?`<div class="kr"><span>${c.adds.length} ${c.adds.length===1?'compra adicional':'compras adicionais'}</span><span>${money(c.add)}</span></div>`:''}<div class="kr"><span style="color:var(--ink);font-weight:600">Total</span><span>${c.total?money(c.total):'Grátis'}</span></div></div>
  <button class="btn primary block" data-a="rgGo">${c.total?(g.pay==='pix'?'Pagar com Pix':'Pagar com cartão')+' · '+money(c.total):'Confirmar inscrição'}</button>
  <p class="foot" style="text-align:center">${c.total?'Sua vaga fica reservada por 30 minutos. Os códigos são liberados quando o pagamento confirmar.':'Seus códigos aparecem em Ingressos.'}</p>`);};
function rgPaySheet(c,onPaid){const kind=c.existing?c.existing.m:S.rg.pay,total=c.total;
 if(kind==='cartao'){const cd=S.cards.find(x=>x.def)||S.cards[0];sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pagar com cartão</h3><p class="callout">${money(total)} à vista.</p></div><div class="lj-cardv">${ic('card',22,1.9)}<span class="grow stack" style="gap:1px"><b>${cd.brand} final ${cd.last}</b><small>Cartão salvo na sua conta</small></span>${ST2('ok','Padrão')}</div><div class="stack g3"><button type="button" class="btn primary block" id="rgPaid">Pagar ${money(total)}</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#rgPaid',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Aprovado');await closeSheet();onPaid();});});return;}
 const cells=Array.from({length:441},(_,i)=>{const x=i%21,y=Math.floor(i/21),f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);const edge=f&&(x%14===0||x%14===6||y%14===0||y%14===6||(x%14>=2&&x%14<=4&&y%14>=2&&y%14<=4));return f?(edge?1:0):((x*7+y*13+x*y)%5<2?1:0);});
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pagar com Pix</h3><p class="callout">${money(total)} · a inscrição confirma assim que o pagamento cair.</p></div><div class="lj-qr" aria-label="QR code do Pix (demonstração)">${cells.map(x=>`<i${x?' class="on"':''}></i>`).join('')}</div><button type="button" class="btn secondary block" data-a="copy" data-v="Código Pix copiado">Copiar código Pix</button><div class="stack g3"><button type="button" class="btn primary block" id="rgPaid">Já paguei</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#rgPaid',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Reservado');await closeSheet();onPaid();});});}
function rgPlace(){const c=rgCalc(),g=S.rg,e=c.e,st=c.total?'pendente':'pago';
 const o={id:'p'+Date.now(),ev:e.id,buyer:D.BUYER,at:D.TODAY,tk:g.tk,buy:c.adds.map(i=>i.id),cp:c.c?c.c.code:'',st,m:g.pay,ck:{}};if(g.other)o.part={n:g.pn.trim(),e:g.pe.trim()};
 D.ORDERS.push(o);if(c.c&&st==='pago')c.c.uses++;S.ord=o.id;S.screen='ingresso';$('#overlay').innerHTML='';render();
 if(c.total){toast('info','Aguardando pagamento','Assim que o '+(g.pay==='pix'?'Pix':'cartão')+' cair, seus códigos são liberados.');setTimeout(()=>confirmPay(o),3500);}else toast('success','Inscrição confirmada','Seus QR Codes estão em Ingressos.');}
function confirmPay(o){if(o.st!=='pendente')return;o.st='pago';const e=evs(o.ev),c=e.coupons.find(x=>x.code===o.cp);if(c)c.uses++;if(['ingresso','ingressos'].includes(S.screen))softRender();toast('success','Pagamento confirmado','Inscrição em '+e.t+' garantida.');}
Object.assign(A,{
 rgTk:v=>{const g=S.rg,t=D.tkOf(evs(g.ev),v);g.tk=v;g.buy=g.buy.filter(id=>!t.incl.includes(id));softRender();},
 rgAdd:v=>{const g=S.rg;g.buy=g.buy.includes(v)?g.buy.filter(x=>x!==v):[...g.buy,v];softRender();},
 rgWho:v=>{S.rg.other=v==='other';softRender();},rgPay:v=>{S.rg.pay=v;softRender();},
 cpApply:()=>{const g=S.rg,e=evs(g.ev),code=(val('cp')||'').toUpperCase(),c=e.coupons.find(x=>x.code===code);
  if(!code){toast('error','Digite o código','Informe o voucher ou cupom que você recebeu.');return;}
  const why=couponOk(c,D.BUYER.e);if(why){g.cpTxt=code;toast('error',why,'Confira o código e tente de novo.');return;}
  g.cp=c.code;g.cpTxt='';softRender();toast('success','Voucher aplicado','O desconto já está no total.');},
 cpClear:()=>{S.rg.cp='';softRender();},
 rgGo:()=>{const g=S.rg;if(g.other){g.pn=val('pn')||g.pn;g.pe=val('pe')||g.pe;let ok=true;if(!g.pn.trim()){setErr('pn','Informe o nome da pessoa.');ok=false;}if(!EMAIL_RE.test(g.pe)){setErr('pe','Digite um e-mail válido.');ok=false;}if(!ok)return;}
  const c=rgCalc();if(!c.total){rgPlace();return;}rgPaySheet(c,rgPlace);},
 rgOpen:v=>{S.ord=v;go('ingresso');const sc=$('#scr');if(sc)sc.scrollTop=0;},
 rePay:()=>{const o=D.ORDERS.find(x=>x.id===S.ord),e=evs(o.ev);rgPaySheet({e,t:D.tkOf(e,o.tk),total:D.total(e,o),existing:o},()=>{closeSheet();toast('info','Aguardando pagamento','Assim que cair, seus códigos são liberados.');setTimeout(()=>confirmPay(o),2200);});}
});
document.addEventListener('input',e=>{if(!S.rg)return;if(e.target.id==='pn')S.rg.pn=e.target.value;if(e.target.id==='pe')S.rg.pe=e.target.value;if(e.target.id==='cp')S.rg.cpTxt=e.target.value;});

/* ---------- ingressos ---------- */
V.ingressos=()=>{
 if(S.role==='visitante')return {sb:'var(--ink)',tabs:'ingressos',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Seus eventos</p><h1 class="t1">Ingressos</h1></div>`)}<div class="pad" style="padding-top:12px">${gate('Seus ingressos e QR Codes ficam guardados na sua conta.')}</div>`};
 const all=D.MY(),up=all.filter(o=>!D.isPast(evs(o.ev))),past=all.filter(o=>D.isPast(evs(o.ev))),l=S.mt==='prox'?up:past;
 return {sb:'var(--ink)',tabs:'ingressos',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Seus eventos</p><h1 class="t1">Ingressos</h1></div>`)}
 <div class="pad stack g5" style="padding-top:8px"><div class="seg"><button aria-selected="${S.mt==='prox'}" data-a="mt" data-v="prox">Próximos · ${up.length}</button><button aria-selected="${S.mt==='past'}" data-a="mt" data-v="past">Anteriores · ${past.length}</button></div>
  ${l.length?`<div class="list">${l.map(o=>{const e=evs(o.ev),t=D.tkOf(e,o.tk),cs=D.codes(e,o),used=cs.filter(c=>o.ck[c.k]).length;return `<button class="item" data-a="rgOpen" data-v="${o.id}">${dateblk(dparts(e))}<span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${esc(e.t)}</span><span class="it-sub">${esc(t.n)}${o.buy.length?' · +'+o.buy.length+(o.buy.length===1?' compra':' compras'):''}</span><span class="it-sub">${cs.length?cs.length+(cs.length===1?' código':' códigos')+(used?' · '+used+' usado'+(used===1?'':'s'):''):'Sem controle de entrada'}</span></span>${o.st==='pago'?status('success','Confirmado'):o.st==='pendente'?status('warning','Pendente'):status('danger',o.st==='cancelado'?'Cancelado':'Reembolsado')}</button>`;}).join('')}</div>`:`<p class="foot" style="text-align:center;padding:30px 0">${S.mt==='prox'?'Você ainda não tem ingressos para eventos futuros.':'Nenhum evento anterior.'}</p>`}</div>`};};
V.ingresso=()=>{const o=D.ORDERS.find(x=>x.id===S.ord)||D.MY()[0],e=evs(o.ev),t=D.tkOf(e,o.tk),cs=D.codes(e,o),locked=o.st!=='pago';
 return flowScreen(esc(e.t),D.whenOf(e)+' · '+esc(t.n),`
  ${o.st==='pendente'?`<div class="svc-note"><span>${ic('alert',16,2)}</span><div><b>Aguardando pagamento</b><span>Os códigos são liberados quando o ${o.m==='pix'?'Pix':'cartão'} confirmar.</span><button class="tlink" style="padding:6px 0 0;align-self:flex-start" data-a="rePay">Pagar agora</button></div></div>`:locked?`<div class="svc-note"><span>${ic('alert',16,2)}</span><div><b>${o.st==='cancelado'?'Inscrição cancelada':'Inscrição reembolsada'}</b><span>Os códigos deste ingresso não valem mais.</span></div></div>`:''}
  <div class="kv"><div class="kr"><span>Ingresso</span><span>${esc(t.n)}</span></div>${o.part?`<div class="kr"><span>Participante</span><span>${esc(o.part.n)}</span></div>`:''}${D.addons(e,o).length?`<div class="kr stack2"><span>Compras adicionais</span><span>${D.addons(e,o).map(i=>esc(D.itLabel(i))).join(', ')}</span></div>`:''}${o.cp?`<div class="kr"><span>Voucher</span><span class="mask">${esc(o.cp)}</span></div>`:''}<div class="kr"><span>Total</span><span>${D.total(e,o)?money(D.total(e,o))+' · '+D.PAY[o.m].n:'Grátis'}</span></div></div>
  ${cs.length?`<section class="stack g4"><p class="eb2">${cs.length} ${cs.length===1?'código':'códigos'} · mostre cada um no momento certo</p>${cs.map(c=>{const at=o.ck[c.k];return `<article class="card rg-code ${at?'used':''} ${locked?'locked':''}"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="it-title" style="font-size:16px">${esc(c.n)}</span><span class="it-sub">${c.tag==='Acesso'?'Entrada':c.tag==='Incluso'?'Incluso no ingresso':'Compra adicional'}</span></div>${at?ST2('mute','Usado às '+at):locked?ST2('warn','Bloqueado'):ST2('ok','Válido')}</div>
   <div class="qr rgq">${locked?`<span class="rg-lock">${ic('lock',28,1.9)}</span>`:qrSVG(c.code)}</div><p class="mask" style="margin:0;text-align:center">${c.code}</p></article>`;}).join('')}
   <p class="foot" style="margin:0">A equipe confirma a entrada lendo o QR no app do VEM. Os códigos funcionam sem internet.</p></section>`:`<div class="card" style="padding:20px 18px;border-radius:var(--r-lg)"><p class="it-title">Inscrição confirmada</p><p class="foot" style="margin:4px 0 0">Este evento não usa QR na entrada.</p></div>`}`,null);};

/* ---------- perfil ---------- */
V.perfil=()=>{
 const st=S.role==='equipe',visit=S.role==='visitante',row=(label,v,meta,hot)=>`<button class="mrow" data-a="sub" data-v="${v}"><span class="mt">${label}</span>${meta?`<span class="mm ${hot?'hot':''}">${meta}</span>`:''}<span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;
 const grp=(t,rows)=>`<section class="mgrp"><p class="eb2">${t}</p>${rows}</section>`;
 if(visit)return {sb:'var(--ink)',tabs:'perfil',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Sua conta</p><h1 class="t1">Perfil</h1></div>`)}<div class="pad" style="padding-top:12px">${gate('Entre para ver seus dados, formas de pagamento e preferências.')}</div>`};
 const pend=D.MY().filter(o=>o.st==='pendente').length;
 return {sb:'var(--ink)',tabs:'perfil',html:`${appHead(`<button class="mhead" data-a="sub" data-v="meusDados"><span class="avatar lg" style="${tone(st?'menta':'ceu')}">${initials(S.user.name)}</span><span class="stack" style="align-items:flex-start;gap:2px"><span class="t2">${esc(S.user.name)}</span><span class="callout">${st?D.STAFF_ME.role+' · '+esc(D.orgOf(D.STAFF_ME.org).n):esc(S.me.email)}</span></span></button>`)}
 <div class="pad stack g8" style="padding-top:16px">
  ${st?grp('Equipe',row('Meus eventos','staffHome',D.STAFF_ME.events.length+' atribuídos')+row('PIN do totem','pin','Só a coordenação define'))+grp('Você',row('Meus dados','meusDados','')+row('Notificações','notifs',''))
   :grp('Você',row('Meus dados','meusDados','')+row('Pagamentos','pagamentos',S.cards.length+(S.cards.length===1?' cartão':' cartões'))+row('Notificações','notifs',''))+grp('Seus ingressos',row('Meus ingressos','ingressos',D.MY().length+' no total',pend>0))}
  ${grp('Sobre o VEM',row('Ajuda e contato','ajuda','')+row('Termos e privacidade','termosVem',''))}
  <section class="stack g3"><button class="btn danger block md" data-a="logoutAsk">Sair da conta</button><p class="foot" style="text-align:center;margin:4px 0 0">vem v1.0.0 · um produto Alva</p></section>
 </div>`};};
Object.assign(A,{sub:v=>{if(v==='staffHome'||v==='ingressos'){A.tab(v);return;}if(['ajuda','termosVem','pin'].includes(v)){A.subSheet(v);return;}go(v);},
 subSheet:v=>{const T={ajuda:['Ajuda e contato','Fale com o suporte do VEM pelo e-mail ajuda@vem.app ou pelo WhatsApp (11) 4000-1234, de segunda a sexta, das 9h às 18h.'],termosVem:['Termos e privacidade','Resumo de demonstração: o VEM guarda só os dados necessários para a compra e para a entrada no evento. O texto completo fica disponível no app final.'],pin:['PIN do totem','O PIN de 4 dígitos é definido pela coordenação do evento. No protótipo é 1234.']}[v];sheet(`<div class="stack g4"><div class="stack g2"><h3 class="t2">${T[0]}</h3><p class="body">${T[1]}</p></div><button class="btn primary block" data-a="closeSheet">Entendi</button></div>`);}});

V.meusDados=()=>sub('Meus dados','Usamos para emitir o ingresso e avisar sobre o evento.',`<form class="stack g5" data-submit="saveMe" novalidate>
  ${field({id:'mNome',label:'Nome completo',val:S.me.nome,ac:'name'})}${field({id:'mEmail',label:'E-mail',type:'email',val:S.me.email,ac:'email',im:'email',hint:'Os ingressos são enviados para este e-mail.'})}
  ${field({id:'mCpf',label:'CPF',val:S.me.cpf,im:'numeric',hint:'Usado na emissão do ingresso e na nota, quando houver.'})}${field({id:'mTel',label:'Telefone',val:S.me.tel,ac:'tel',im:'tel'})}${field({id:'mCid',label:'Cidade',val:S.me.cidade})}
  <button class="btn primary block" type="submit">Salvar alterações</button></form>`);
Object.assign(F,{async saveMe(f){let ok=true;const n=val('mNome'),e=val('mEmail');if(!n){setErr('mNome','Informe seu nome.');ok=false;}if(!EMAIL_RE.test(e)){setErr('mEmail','Digite um e-mail válido.');ok=false;}if(!ok)return;
  await busy($('button[type=submit]',f),900,null,'Salvo');Object.assign(S.me,{nome:n,email:e,cpf:val('mCpf'),tel:val('mTel'),cidade:val('mCid')});S.user={first:n.split(' ')[0],name:n};toast('success','Dados salvos','');back();}});
V.pagamentos=()=>sub('Pagamentos','Cartões salvos para comprar mais rápido. Pix não precisa de cadastro.',`
 ${S.cards.length?`<div class="list">${S.cards.map(c=>`<div class="item" style="cursor:default"><span class="iconbox" style="${tone('ceu')}">${ic('card',20)}</span><span class="grow stack" style="gap:2px"><span class="it-title">${c.brand} final ${c.last}</span><span class="it-sub">${c.def?'Cartão padrão':'Toque para tornar padrão'}</span></span>${c.def?status('success','Padrão'):`<button class="btn secondary sm" data-a="cardDef" data-v="${c.id}">Usar</button>`}<button class="iconbtn" data-a="cardDel" data-v="${c.id}" aria-label="Remover cartão">${ic('trash',17,1.9)}</button></div>`).join('')}</div>`:`<p class="foot" style="text-align:center;padding:20px 0">Nenhum cartão salvo.</p>`}
 <button class="btn secondary block md" data-a="cardAdd">${ic('plus',16,2.2)}Adicionar cartão</button>
 <div class="card row g3" style="padding:14px 16px;border-radius:var(--r-md);align-items:flex-start"><span class="iconbox" style="${tone('menta')}">${ic('qr',20)}</span><span class="grow stack" style="gap:2px"><span class="it-title" style="font-size:16px">Pix</span><span class="it-sub">Gerado na hora, a cada compra. Reembolsos voltam para a mesma forma de pagamento.</span></span></div>`);
Object.assign(A,{
 cardDef:v=>{S.cards.forEach(c=>c.def=c.id===v);softRender();toast('success','Cartão padrão alterado','');},
 cardDel:v=>{const c=S.cards.find(x=>x.id===v);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Remover cartão?</h3><p class="body">${c.brand} final ${c.last} deixa de aparecer na hora de pagar.</p></div><div class="stack g3"><button class="btn danger block" data-a="cardDelOk" data-v="${v}">Remover</button><button class="btn secondary block" data-a="closeSheet">Cancelar</button></div></div>`);},
 cardDelOk:async v=>{await closeSheet();const was=S.cards.find(x=>x.id===v).def;S.cards=S.cards.filter(x=>x.id!==v);if(was&&S.cards[0])S.cards[0].def=true;softRender();toast('info','Cartão removido','');},
 cardAdd:()=>sheet(`<form class="stack g5" data-submit="cardNew" novalidate><div class="stack g2"><h3 class="t2">Adicionar cartão</h3><p class="callout">Demonstração: nenhum dado é enviado.</p></div>${field({id:'kNum',label:'Número do cartão',ph:'0000 0000 0000 0000',im:'numeric',max:19})}<div class="row g3" style="align-items:flex-start"><div class="grow">${field({id:'kVal',label:'Validade',ph:'MM/AA',im:'numeric',max:5})}</div><div class="grow">${field({id:'kCvv',label:'CVV',ph:'000',im:'numeric',max:4})}</div></div><button class="btn primary block" type="submit">Salvar cartão</button></form>`)
});
Object.assign(F,{async cardNew(f){const n=val('kNum').replace(/\D/g,''),v=val('kVal'),c=val('kCvv');let ok=true;if(n.length<13){setErr('kNum','Número incompleto.');ok=false;}if(!/^\d{2}\/\d{2}$/.test(v)){setErr('kVal','Use MM/AA.');ok=false;}if(c.length<3){setErr('kCvv','Código inválido.');ok=false;}if(!ok)return;
  await busy($('button[type=submit]',f),900,null,'Salvo');S.cards.push({id:'c'+Date.now(),brand:n[0]==='5'?'Mastercard':'Visa',last:n.slice(-4),def:!S.cards.length});await closeSheet();softRender();toast('success','Cartão adicionado','');}});
V.notifs=()=>{const sw=(k,t,s)=>`<div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">${t}</span><span class="it-sub">${s}</span></span><button class="switch" role="switch" aria-checked="${!!S.prefs[k]}" data-a="pref" data-v="${k}" aria-label="${t}"></button></div>`;
 return sub('Notificações','Escolha o que o VEM pode te avisar.',`
  <section class="stack g3"><p class="eb2">Seus eventos</p><div class="list">${sw('lembrete','Lembrete do evento','Um dia antes e na manhã do evento')}${sw('pagamento','Ingresso e pagamento','Confirmação, QR Code liberado e reembolsos')}${sw('organizador','Avisos do organizador','Mudança de horário, local e novidades')}</div></section>
  <section class="stack g3"><p class="eb2">Descobrir</p><div class="list">${sw('novidades','Novos eventos','Eventos novos perto de você e de organizadores que você segue')}</div></section>
  <section class="stack g3"><p class="eb2">Canais</p><div class="list">${sw('push','Notificação no celular','Push do app')}${sw('email','E-mail','Ingresso e avisos por e-mail')}</div></section>`);};
Object.assign(A,{pref:v=>{S.prefs[v]=!S.prefs[v];softRender();}});


/* =========================================================
   VEM · equipe do evento: painel, check-in, pessoa e totem
   ========================================================= */
const todayN=()=>todayName();
const greet=()=>'Bom dia';
V.staffHome=()=>{
 const me=D.STAFF_ME,mine=me.events.map(evs).sort((a,b)=>(D.isToday(b)-D.isToday(a))||(a.d<b.d?-1:1)),today=mine.filter(D.isToday);
 const pend=today.reduce((n,e)=>n+D.ordersOf(e).filter(o=>o.st==='pendente').length,0);
 const attn=[...today.map(e=>{const s=ckStats(e);return {ic:'door',t:`${esc(e.t)} é hoje`,s:`${s.d} de ${s.n} entradas · ${D.whenOf(e)}`,a:'ckOpen',v:e.id};}),...(pend?[{ic:'alert',t:`${pend} ${pend===1?'pagamento pendente':'pagamentos pendentes'}`,s:'Esses códigos não entram até pagar.',a:'ckOpen',v:today[0]?today[0].id:mine[0].id}]:[])];
 return {sb:'var(--ink)',tabs:'staffHome',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${esc(D.orgOf(me.org).n)} · ${me.role}</p><h1 class="t1">${greet()}, ${esc(me.n.split(' ')[0])}!</h1></div><button class="avatar tap" style="${tone('menta')};border:0" data-a="tab" data-v="perfil" aria-label="Abrir perfil">${initials(me.n)}<span class="online"></span></button></div>`)}
 <div class="pad stack g6" style="padding-top:4px">
  ${attn.length?`<section class="stack g3"><p class="eb2">Precisa da sua atenção</p>${attn.map(x=>`<button class="lj-ord" data-a="${x.a}" data-v="${x.v}"><span class="iconbox" style="${tone(x.ic==='alert'?'ambar':'menta')}">${ic(x.ic,20)}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${x.t}</span><span class="it-sub">${x.s}</span></span>${ic('chevR',16,2.25)}</button>`).join('')}</section>`:`<div class="card" style="padding:18px;border-radius:var(--r-lg)"><p class="it-title">Tudo em dia</p><p class="foot" style="margin:4px 0 0">Nenhum evento hoje e nada pendente.</p></div>`}
  <section class="stack g3"><p class="eb2">Seus eventos</p><div class="stack g3">${mine.map(e=>{const s=ckStats(e),today=D.isToday(e),past=D.isPast(e);return `<button class="card" style="text-align:left;padding:16px 18px;border:0;color:var(--ink);width:100%" data-a="ckOpen" data-v="${e.id}"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:3px;min-width:0"><span class="it-title" style="font-size:17px">${esc(e.t)}</span><span class="it-sub">${D.whenOf(e)} · ${esc(e.venue)}</span></div>${today?status('success','Hoje'):past?status('info','Encerrado'):tag('ceu',D.dShort(e.d),true)}</div><div class="bar" style="margin:14px 0 8px" aria-hidden="true"><i style="width:${s.n?s.d/s.n*100:0}%"></i></div><div class="row between"><span class="it-sub"><b style="color:var(--ink)">${s.d}</b> de ${s.n} entradas</span><span class="link" style="pointer-events:none">Abrir portaria${ic('chevR',14,2)}</span></div></button>`;}).join('')}</div></section>
 </div>`};};
Object.assign(A,{ckOpen:v=>{S.ckEv=v;S.ckMode='camera';S.ckq='';S.ckf='todos';S.kiosk=null;go('ckEvento');}});

const personRows=e=>evCodes(e);
V.ckEvento=()=>{const e=evs(S.ckEv),s=ckStats(e);
 const all=evCodes(e),q=norm(S.ckq.trim()),f=S.ckf;
 const cnt={todos:all.length,wait:all.filter(x=>!x.at&&x.o.st==='pago').length,in:all.filter(x=>x.at).length,blk:all.filter(x=>x.o.st==='pendente'&&!x.at).length};
 const rows=all.filter(x=>(f==='todos'||(f==='in'?x.at:f==='wait'?!x.at&&x.o.st==='pago':x.o.st==='pendente'&&!x.at))&&(!q||norm(who(x.o)+' '+x.c.n+' '+x.c.code).includes(q))).sort((a,b)=>(!!b.at-!!a.at)||who(a.o).localeCompare(who(b.o))).slice(0,40);
 const head=`<div class="stack g2"><div class="row between"><span class="callout"><b style="color:var(--ink);font:700 22px/1 var(--font-display)">${s.d}</b> de ${s.n} entradas</span><span class="foot">${s.n?Math.round(s.d/s.n*100):0}%</span></div><div class="bar" aria-hidden="true"><i style="width:${s.n?s.d/s.n*100:0}%"></i></div></div>`;
 const seg=`<div class="seg">${[['camera','Câmera'],['totem','Totem'],['manual','Lista']].map(([k,l])=>`<button aria-selected="${S.ckMode===k}" data-a="ckMode" data-v="${k}">${l}</button>`).join('')}</div>`;
 const cam=`<div class="vf"><div class="vf-fr"></div><div class="vf-ln"></div><span class="vf-hint">Aponte para o QR Code do ingresso</span></div><button class="btn primary block" data-a="ckSim" data-v="ok">${ic('scan',18,2)}Simular leitura</button>
  <div class="stack g2"><p class="eb2">Ou digite o código</p><div class="rg-vcf"><input id="ckc" placeholder="Código do ingresso" autocomplete="off" autocapitalize="characters"><button type="button" class="btn secondary md" data-a="ckType">Buscar</button></div></div>
  <div class="stack g2"><p class="eb2">Demonstração: outros resultados</p><div class="row g2" style="flex-wrap:wrap"><button class="chip" data-a="ckSim" data-v="used">Já usado</button><button class="chip" data-a="ckSim" data-v="pend">Pagamento pendente</button><button class="chip" data-a="ckSim" data-v="bad">Código inválido</button></div></div>`;
 const man=`<label class="lj-search">${ic('search',18,2)}<input id="ckq" type="search" placeholder="Nome ou código" value="${esc(S.ckq)}" autocomplete="off"></label>
  <div class="nxchips" role="tablist">${[['todos','Todos'],['wait','Aguardando'],['in','Entraram'],['blk','Sem pagamento']].filter(c=>c[0]!=='blk'||cnt.blk).map(([k,l])=>`<button class="chip" aria-pressed="${f===k}" data-a="ckf" data-v="${k}">${l} · ${cnt[k]}</button>`).join('')}</div>
  ${rows.length?`<div class="list">${rows.map(x=>`<button class="item" data-a="person" data-v="${x.o.id}|${x.c.k}"><span class="avatar" style="${tone(TNS[who(x.o).length%5])}">${initials(who(x.o))}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${esc(who(x.o))}</span><span class="it-sub">${esc(x.c.n)} · ${esc(D.tkOf(e,x.o.tk).n)}</span></span>${x.at?status('success',x.at):x.o.st!=='pago'?status('warning','Pendente'):status('info','Aguardando')}</button>`).join('')}</div>`:'<p class="foot" style="text-align:center;padding:24px 0">Ninguém encontrado.</p>'}`;
 return flowScreen(esc(e.t),(D.isToday(e)?'Hoje · ':'')+D.whenOf(e)+' · '+esc(e.venue),`${head}${seg}${S.ckMode==='camera'?cam:man}`);};
const TNS=['ceu','menta','damasco','rosado','lima'];
V.kiosk=()=>{const e=evs(S.ckEv),k=S.kiosk||{};
 return {sb:'#fff',tabs:null,amb:'home',html:`<div class="kiosk"><button class="tlink" style="color:#fff;align-self:flex-end;opacity:.85" data-a="kioskExit">Sair do totem (equipe)</button>${k.ok?`<div class="kc"><span class="kok">${ic('check',54,2.4)}</span><h1 class="t1" style="color:#fff;font-size:32px">Tudo certo, ${esc(String(k.who).split(' ')[0])}!</h1><p>Retire a sua pulseira com a equipe.<br>Bom evento!</p></div>`:`<div class="kc"><span class="kl">${logo(30,false)}</span><h1 class="t1" style="color:#fff;font-size:30px;line-height:34px">${esc(e.t)}</h1><p>Digite o código do seu ingresso ou o e-mail da inscrição.</p><div class="field"><div class="fbox"><input id="kc" placeholder="Código ou e-mail" autocomplete="off" value="${esc(k.v||'')}"></div></div>${k.err?`<p class="kerr">${esc(k.err)}</p>`:''}<button class="btn primary block" data-a="kioskGo">Confirmar entrada</button><small>Não achou? Fale com a equipe na entrada.</small></div>`}</div>`};};

/* pessoa: todos os ingressos e compras, com o check-in de cada um */
function personSheet(oid,key,resKey){
 const o=D.ORDERS.find(x=>x.id===oid),e=evs(o.ev),t=D.tkOf(e,o.tk),cs=D.codes(e,o),tot=D.total(e,o),blocked=o.st!=='pago';
 const hit=key?{o,c:cs.find(c=>c.k===key),at:o.ck[key]||''}:null,res=hit&&hit.c?ckEval(e,hit):null;
 const bn=res?`<div class="svc-note ${res.k==='ok'?'':res.k==='warn'?'':'bad'}" style="${res.k==='ok'?'':''}"><span>${ic(res.icon,16,2.2)}</span><div><b>${res.t}</b><span>${esc(res.d)}</span></div></div>`:'';
 sheet(`<div class="stack g5"><div class="row g3" style="align-items:center"><span class="avatar lg" style="${tone(TNS[who(o).length%5])}">${initials(who(o))}</span><div class="stack" style="gap:2px;min-width:0"><h3 class="t2">${esc(who(o))}</h3><span class="callout">${esc(o.part?o.buyer.n+' comprou':o.buyer.e)}</span></div></div>
  ${bn}
  <div class="kv"><div class="kr"><span>Ingresso</span><span>${esc(t.n)}</span></div>${D.addons(e,o).length?`<div class="kr stack2"><span>Compras</span><span>${D.addons(e,o).map(i=>esc(D.itLabel(i))).join(', ')}</span></div>`:''}<div class="kr"><span>Pagamento</span><span>${o.st==='pago'?'Pago':o.st==='pendente'?'Pendente':o.st==='cancelado'?'Cancelado':'Reembolsado'}${tot?' · '+money(tot):''}</span></div></div>
  <div class="stack g3"><p class="eb2">Ingressos e compras</p>${blocked?`<p class="foot" style="margin:0">${o.st==='pendente'?'O check-in libera quando o pagamento for confirmado.':'Esta inscrição não vale mais.'}</p>`:''}
   <div class="stack g2">${cs.map(c=>{const at=o.ck[c.k],isKey=key===c.k,r=ckEval(e,{o,c,at}),can=r.ready;return `<div class="card row g3" style="padding:12px 14px;border-radius:var(--r-md);align-items:center;${isKey?'box-shadow:inset 0 0 0 2px var(--brand)':''}"><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title" style="font-size:15px">${esc(c.n)}</span><span class="it-sub mask" style="font-size:12px">${c.code}</span></span>${at?status('success','Entrou às '+at):can?`<button class="btn primary sm" data-a="personCk" data-v="${o.id}|${c.k}">Confirmar</button>`:`<span class="it-sub">${r.k==='bad'?(o.st==='pendente'?'Aguardando pagamento':'Bloqueado'):r.t}</span>`}</div>`;}).join('')||'<p class="foot">Sem códigos neste evento.</p>'}</div></div>
  <button class="btn secondary block" data-a="closeSheet">Fechar</button></div>`);
}
Object.assign(A,{
 ckMode:v=>{S.ckMode=v;S.kiosk=null;if(v==='totem'){go('kiosk');return;}softRender();},
 ckf:v=>{S.ckf=v;softRender();},
 person:v=>{const [oid,key]=v.split('|');personSheet(oid,key);},
 personCk:v=>{const [oid,key]=v.split('|'),o=D.ORDERS.find(x=>x.id===oid),e=evs(o.ev),c=D.codes(e,o).find(x=>x.k===key);const hit={o,c,at:''};if(ckEval(e,hit).ready){ckCommit(hit);toast('success',c.tag==='Acesso'?'Entrada registrada':'Item entregue',who(o)+' · '+c.n);}personSheet(oid,key);if(S.screen==='ckEvento')softRender();},
 ckSim:v=>{const e=evs(S.ckEv),all=evCodes(e);let hit=null;
  if(v==='ok'){const pool=all.filter(x=>x.o.st==='pago'&&!x.at&&x.c.tag==='Acesso'&&(x.c.k==='geral'||x.c.k==='p:'+todayN()));hit=pool[Math.floor(Math.random()*pool.length)];if(!hit){toast('info','Sem códigos para ler','Todos já entraram ou o evento não é hoje.');return;}}
  else if(v==='used'){hit=all.find(x=>x.at);if(!hit){toast('info','Ninguém entrou ainda','Leia um código válido primeiro.');return;}}
  else if(v==='pend'){hit=all.find(x=>x.o.st==='pendente');if(!hit){toast('info','Sem pendências','Todos os pagamentos estão confirmados.');return;}}
  scanShow(e,hit);},
 ckType:()=>{const e=evs(S.ckEv),v=val('ckc');if(!v){toast('error','Digite o código','Informe o código do ingresso.');return;}scanShow(e,ckFind(e,v));},
 kioskGo:()=>{const e=evs(S.ckEv),v=val('kc'),hit=ckFind(e,v);if(!v)return;
  if(!hit){S.kiosk={v,err:'Não encontramos esse código. Confira o ingresso ou fale com a equipe.'};softRender();return;}
  const r=ckResult(e,hit,'totem');if(r.k!=='ok'){S.kiosk={v,err:r.t+'. '+r.d};softRender();return;}
  S.kiosk={ok:true,who:r.who};softRender();setTimeout(()=>{if(S.kiosk&&S.kiosk.ok){S.kiosk={};if(S.screen==='kiosk')softRender();}},3200);},
 kioskExit:()=>sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Sair do totem</h3><p class="callout">Digite o PIN da equipe. PIN de demonstração: 1234</p></div>${field({id:'pin',label:'PIN',ph:'••••',im:'numeric',max:4})}<button class="btn primary block" data-a="pinGo">Sair</button></div>`),
 pinGo:()=>{if(val('pin')==='1234'){closeSheet();S.kiosk=null;S.ckMode='manual';back();softRender();}else{setErr('pin','PIN incorreto.');}}
});
/* leitura: mostra a pessoa com o resultado e o botão para confirmar */
function scanShow(e,hit){if(!hit){sheet(`<div class="stack g5" style="text-align:center;align-items:center"><span class="iconbox" style="${tone('rosado')}">${ic('x',24)}</span><div class="stack g2"><h3 class="t2">Código não encontrado</h3><p class="body">Esse código não pertence a este evento. Confira com a pessoa.</p></div><button class="btn primary block" data-a="closeSheet">Entendi</button></div>`);return;}
 personSheet(hit.o.id,hit.c.k);}


/* ---------- rail (painel lateral do protótipo) ---------- */
const RAIL=[['welcome','Boas-vindas'],['login','Entrar com senha'],['loginBlocked','Bloqueio (demo)'],['resetPassword','Nova senha'],['resetDone','Senha redefinida'],['codeEmail','Entrar com código'],['otp','Digite o código'],['signupForm','Criar conta'],['home','Descobrir'],['evento','Evento'],['comprar','Compra'],['ingressos','Ingressos'],['ingresso','Ingresso e QR'],['perfil','Perfil'],['meusDados','Meus dados'],['pagamentos','Pagamentos'],['notifs','Notificações'],['staffHome','Equipe · painel'],['ckEvento','Equipe · check-in'],['kiosk','Equipe · totem']];
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
const STAFFS=['staffHome','ckEvento','kiosk'],BUYS=['ingressos','ingresso','comprar','meusDados','pagamentos','notifs'];
$('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const s=b.dataset.s;$('#overlay').innerHTML='';
 if(STAFFS.includes(s)&&S.role!=='equipe'){S.role='equipe';S.user={first:D.STAFF_ME.n.split(' ')[0],name:D.STAFF_ME.n};}
 else if(!STAFFS.includes(s)&&S.role==='equipe'&&!AUTHS.includes(s)&&s!=='perfil'&&s!=='meusDados'&&s!=='notifs'){S.role='comprador';S.user={first:'Ana',name:D.BUYER.n};}
 else if(BUYS.includes(s)&&S.role==='visitante'){S.role='comprador';S.user={first:'Ana',name:D.BUYER.n};}
 if(s==='otp'){S.otpCtx='login';S.email=S.email||D.BUYER.e;S.su.att=5;S.su.expAt=Date.now()+15*60000;}
 if(s==='signupForm')S.prefill=null;
 if(s==='evento'&&!S.ev)S.ev=D.EVENTS.find(x=>x.st==='publicado'&&!D.isPast(x)).id;
 if(s==='comprar'){if(!S.ev||D.isPast(evs(S.ev))||D.MY().some(o=>o.ev===S.ev))S.ev='e4';initRg(evs(S.ev));}
 if(s==='ingresso'&&!S.ord)S.ord=D.MY()[0].id;
 if(['ckEvento','kiosk'].includes(s)&&!S.ckEv)S.ckEv=D.STAFF_ME.events[0];
 S.hist=AUTHS.includes(s)?(s==='welcome'?[]:['welcome']):(['evento','comprar','ingresso','meusDados','pagamentos','notifs','ckEvento'].includes(s)?[s==='comprar'?'evento':s==='ckEvento'?'staffHome':s==='ingresso'?'ingressos':['meusDados','pagamentos','notifs'].includes(s)?'perfil':'home']:[]);S.screen=s;render();});
$('#demoUsers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.email=b.dataset.v;S.entryStaff=b.dataset.v===D.STAFF_ME.e;S.hist=['welcome'];S.screen='login';$('#overlay').innerHTML='';render();setTimeout(()=>{const p=$('#lPass');if(p)p.value='vem2026';},0);toast('info','Perfil de demonstração','Toque em Entrar para continuar.');});
$('#roleSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;setRole(b.dataset.v);});
function railSync(){$$('#roleSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===S.role));$$('#railNav button').forEach(b=>b.setAttribute('aria-current',b.dataset.s===S.screen));}
$('#modeSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;phone.classList.remove('m-aurora','m-float');if(b.dataset.m)phone.classList.add(b.dataset.m);$$('#modeSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('#themeSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.theme=b.dataset.t;phone.classList.toggle('dia',S.theme==='dia');$$('#themeSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));try{localStorage.setItem('vem-theme',S.theme)}catch(_){}});
function applyTheme(t){S.theme=t;phone.classList.toggle('dia',t==='dia');$$('#themeSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t===t));}
try{const t=localStorage.getItem('vem-theme');if(t==='dia')applyTheme('dia');}catch(_){}
(function(){const nav=$('#demoUsers');const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Abertura</span><div class="rail-nav"><button type="button" id="spReplay">Rever splash screen</button></div>`;sec.parentNode.insertBefore(box,sec);
 $('#spReplay').addEventListener('click',()=>{S.hist=[];S.screen='welcome';$('#overlay').innerHTML='';render('none');showSplash();});})();

/* ---------- partida ---------- */
const QP=new URLSearchParams(location.search);
if(QP.get('theme'))applyTheme(QP.get('theme'));
if(QP.get('mode')!=null){phone.classList.remove('m-aurora','m-float');if(QP.get('mode'))phone.classList.add(QP.get('mode'));$$('#modeSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.m===QP.get('mode')));}
if(QP.get('role')){const r=QP.get('role');S.role=r;if(r==='equipe')S.user={first:D.STAFF_ME.n.split(' ')[0],name:D.STAFF_ME.n};S.screen=r==='equipe'?'staffHome':'home';}
if(QP.get('ev')){S.ev=QP.get('ev');S.ckEv=QP.get('ev');}
if(QP.get('screen')&&V[QP.get('screen')]){S.screen=QP.get('screen');if(S.screen==='comprar'){if(!S.ev||D.MY().some(o=>o.ev===S.ev))S.ev='e4';initRg(evs(S.ev));}}
if(QP.get('ord'))S.ord=QP.get('ord');
if(QP.get('mode2'))S.ckMode=QP.get('mode2');
render('none');
if(!QP.get('nosplash'))showSplash();
