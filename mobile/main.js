/* Alva Mobile · protótipo */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- icons ---------- */
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
const logo=(h,anim,cls)=>`<span class="logo ${cls||''}" role="img" aria-label="alva">${sunMark(h,anim)}<span class="lw">alva</span></span>`;
const tone=t=>`background:var(--tone-${t});color:var(--tone-${t}-ink)`;
/* tone pairs (Tag component) */
const TONES={brasa:['--pal-brasa','--pal-abismo'],laranja:['--pal-laranja','--pal-abismo'],ambar:['--pal-ambar','--pal-abismo'],damasco:['--pal-damasco','--pal-vinho-escuro'],rosado:['--pal-rosado','--pal-vinho'],vinho:['--pal-vinho','--pal-rosado'],lima:['--pal-lima','--pal-abismo'],menta:['--pal-menta','--pal-petroleo-escuro'],salvia:['--pal-salvia','--pal-abismo'],ceu:['--pal-ceu','--pal-marinho'],oceano:['--pal-oceano','--pal-branco'],petroleo:['--pal-petroleo-escuro','--pal-menta']};
(function(){let css=':root{';for(const k in TONES)css+=`--tone-${k}:var(${TONES[k][0]});--tone-${k}-ink:var(${TONES[k][1]});`;const st=document.createElement('style');st.textContent=css+'}';document.head.appendChild(st);})();

/* ---------- data ---------- */
const TODAY={y:2026,m:9,d:29};
const MONTHS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const MON3=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const WD=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const ROLES={visitante:['Visitante','damasco'],membro:['Membro','ceu'],lider:['Líder','menta'],admin:['Administrador','brasa']};
const USERS={
 'renan.ferreira@email.com':{first:'Renan',name:'Renan Ferreira',role:'membro'},
 'giovanna.martins@email.com':{first:'Giovanna',name:'Giovanna Martins',role:'lider'}
};
const CHURCHES=[
 {id:'sede',name:'Alva Sede',city:'São Paulo, SP',members:'1.240',tone:'brasa'},
 {id:'alpha',name:'Alva Alphaville',city:'Barueri, SP',members:'380',tone:'menta'},
 {id:'camp',name:'Alva Campinas',city:'Campinas, SP',members:'210',tone:'ceu'}
];
const DESC={
 Culto:'Um culto para toda a família, com louvor, Palavra e ceia no primeiro domingo do mês. Chegue 15 minutos antes para garantir lugar.',
 'Casas':'Encontro semanal na casa de uma família da igreja: estudo da Palavra, oração e um café no final.',
 'Liderança':'Alinhamento mensal dos líderes de Casa e de ministério. Traga seu relatório do mês.',
 'Oração':'Uma noite inteira dedicada à oração pela igreja, pelas famílias e pela cidade.',
 Jovens:'O culto dos jovens: banda ao vivo, mensagem e muito tempo junto depois.',
 'Conferência':'Três noites com preletores convidados, louvor e ministração. Tema deste ano: Seja da Partida.',
 Batismo:'Celebração de batismo nas águas para quem concluiu a classe de batismo.'
};
const EVENTS=[
 {id:'e1',y:2026,m:9,d:20,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:212},
 {id:'e2',y:2026,m:9,d:23,t:'Casa Jardins',h:'19h30',p:'Casa da Ana Costa',cat:'Casas',tone:'menta',g:'mar',n:14},
 {id:'e3',y:2026,m:9,d:24,t:'Reunião de Líderes',h:'20h',p:'Sala 3',cat:'Liderança',tone:'oceano',g:'mar',n:38},
 {id:'e4',y:2026,m:9,d:27,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:236},
 {id:'e5',y:2026,m:9,d:28,t:'Noite de Oração',h:'20h',p:'Capela',cat:'Oração',tone:'vinho',g:'vinho',n:54},
 {id:'e6',y:2026,m:9,d:30,t:'Casa Jardins',h:'19h30',p:'Casa da Ana Costa',cat:'Casas',tone:'menta',g:'mar',n:14},
 {id:'e7',y:2026,m:10,d:1,t:'Treinamento de Líderes',h:'20h',p:'Sala 3',cat:'Liderança',tone:'oceano',g:'mar',n:41},
 {id:'e8',y:2026,m:10,d:3,t:'Culto de Jovens',h:'19h30',p:'Templo Sede',cat:'Jovens',tone:'lima',g:'lima',n:128},
 {id:'e9',y:2026,m:10,d:4,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:198},
 {id:'e10',y:2026,m:10,d:11,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:120},
 {id:'e11',y:2026,m:10,d:18,t:'Conferência Anual 2026',h:'19h',p:'Templo Sede',cat:'Conferência',tone:'laranja',g:'brasa',n:640,range:'18 a 20 de outubro',sign:true},
 {id:'e12',y:2026,m:10,d:25,t:'Batismo nas Águas',h:'10h',p:'Templo Sede',cat:'Batismo',tone:'ceu',g:'mar',n:32,sign:true}
];
const evKey=e=>e.y*10000+e.m*100+e.d;
const todayKey=TODAY.y*10000+TODAY.m*100+TODAY.d;
const dow=(y,m,d)=>new Date(y,m-1,d).getDay();
const CASAS=[
 {id:'g1',t:'Casa Jardins',day:'Quarta-feira',h:'19h30',km:'1,2',n:14,open:true,leader:'Ana e Paulo Costa',addr:'Rua das Acácias, 120 · Jardins'},
 {id:'g2',t:'Casa Centro',day:'Quinta-feira',h:'20h',km:'3,4',n:9,open:true,leader:'Marcos Lima',addr:'Av. São João, 800 · Centro'},
 {id:'g3',t:'Casa Pinheiros',day:'Sexta-feira',h:'19h',km:'2,8',n:11,open:false,leader:'Juliana Reis',addr:'Rua dos Pinheiros, 455 · Pinheiros'},
 {id:'g4',t:'Casa Jovens SP',day:'Terça-feira',h:'20h30',km:'4,1',n:18,open:true,leader:'Davi Melo',addr:'Rua Augusta, 1500 · Consolação'}
];
const MINIS=[
 {id:'m1',t:'Jovens e Adolescentes',s:'Encontros de 12 a 29 anos',tone:'lima',i:'sparkle',d:'Sábado à noite a Alva vira ponto de encontro: louvor alto, mensagem direta e muita conversa depois. Aqui se serve em tudo, da banda ao lanche.',when:'Sábados · 19h30',lead:'Davi e Bia Melo',n:42,need:['Ter entre 18 e 35 anos para servir na equipe','Participar do encontro de líderes às quintas']},
 {id:'m2',t:'Eventos',s:'Conferências, retiros e celebrações',tone:'laranja',i:'ticket',d:'Da primeira reunião de pauta ao último cabo recolhido. É a equipe que transforma uma ideia em uma noite que ninguém esquece.',when:'Conforme a agenda · 4 a 6 eventos por ano',lead:'Marina Castro',n:28,need:['Disponibilidade em fins de semana de evento','Gostar de planilha tanto quanto de gente']},
 {id:'m3',t:'Homens',s:'Discipulado e comunhão masculina',tone:'oceano',i:'shield',d:'Café da manhã, Bíblia aberta e conversa franca sobre trabalho, família e fé. Um lugar para ser forte sem precisar fingir.',when:'1º sábado do mês · 8h',lead:'Paulo Costa',n:15,need:['Ser membro da Alva','Topar acordar cedo uma vez por mês']},
 {id:'m4',t:'Cafeteria',s:'O café de antes e depois do culto',tone:'damasco',i:'coffee',d:'O cheiro de café é a primeira boa-vinda de muita gente. A equipe cuida do balcão, do cardápio e daquela conversa que começa com um "tudo bem?".',when:'Domingos · a partir das 17h',lead:'Juliana Reis',n:18,need:['Curso rápido de boas práticas (2h)','Uma escala a cada 3 semanas']},
 {id:'m5',t:'Zeladoria',s:'Cuidado com o templo e as salas',tone:'salvia',i:'bucket',d:'Lâmpada queimada, cadeira bamba, jardim pedindo água: a Zeladoria resolve antes que alguém perceba. Serviço silencioso que deixa a casa pronta.',when:'Sábados · 9h às 12h',lead:'Seu Antônio Prado',n:9,need:['Jeito para pequenos reparos ajuda, mas não é obrigatório']},
 {id:'m6',t:'Cozinha',s:'Refeições de eventos e confraternizações',tone:'ambar',i:'chef',d:'Almoço do retiro, jantar dos casais, bolo do aniversariante do mês. Onde tem mesa farta na Alva, tem essa equipe por trás.',when:'Eventos e 3º domingo do mês',lead:'Dona Célia Nunes',n:14,need:['Carteirinha de manipulação de alimentos (a igreja custeia)']},
 {id:'m7',t:'Voluntariado',s:'Banco de voluntários para toda a igreja',tone:'rosado',i:'heart',d:'Ainda não sabe onde servir? Comece aqui. Você entra no banco de voluntários e é chamado para ajudar onde falta gente, conhecendo vários ministérios.',when:'Quando você puder',lead:'Larissa Martins',n:63,need:['Nenhum. Só vontade de ajudar']},
 {id:'m8',t:'Louvor',s:'Banda, vocal e técnica de som',tone:'ceu',i:'music',d:'Mais do que tocar bem, conduzir a igreja para perto de Deus. Ensaios semanais, devocional em equipe e escala em rodízio.',when:'Ensaios às quintas · 20h',lead:'Davi Melo',n:24,need:['Audição com a liderança','Compromisso com os ensaios']},
 {id:'m9',t:'Ceia',s:'Preparo e serviço da Santa Ceia',tone:'vinho',i:'wine',d:'Pão partido e cálice servido com reverência. A equipe prepara os elementos, organiza a distribuição e cuida para que ninguém fique de fora.',when:'1º domingo do mês',lead:'Diac. Ana Costa',n:12,need:['Ser membro batizado','Participar do treinamento de 1 hora']},
 {id:'m10',t:'Integração',s:'Acompanhar quem acabou de chegar',tone:'menta',i:'userplus',d:'Quem visita pela primeira vez ganha um rosto conhecido. A Integração liga, convida para um café e ajuda a encontrar uma Casa de Apascentamento.',when:'Domingos e mensagens durante a semana',lead:'Gabriela Nunes',n:20,need:['Gostar de conversar','Uma ligação por semana, em média']},
 {id:'m11',t:'Secretariado',s:'Cadastros, documentos e atendimento',tone:'petroleo',i:'clipboard',d:'Declarações, cadastros de famílias, agenda do pastor. É o ministério que mantém tudo em ordem para que o resto possa acontecer.',when:'Seg a sex · turnos de 4h',lead:'Fernanda Lima',n:6,need:['Familiaridade com computador','Sigilo com dados pessoais']},
 {id:'m12',t:'Social',s:'Cestas, visitas e mutirões',tone:'salvia',i:'care',d:'Cestas básicas todo mês, visitas a quem está sozinho e mutirões nos bairros vizinhos. Fé que se traduz em arroz, feijão e presença.',when:'2º sábado do mês · 8h',lead:'Heitor Alves',n:37,need:['Nenhum requisito prévio']},
 {id:'m13',t:'Infantil',s:'Ensino para crianças de 0 a 11 anos',tone:'ambar',i:'baby',d:'Histórias bíblicas contadas com massinha, música e muita paciência. Enquanto os pais participam do culto, as crianças aprendem do jeito delas.',when:'Domingos · 9h e 18h30',lead:'Carla Reis',n:31,need:['Checagem de antecedentes (exigida por lei)','Treinamento de proteção infantil']},
 {id:'m14',t:'Mídia',s:'Fotos, vídeos, transmissão e redes sociais',tone:'ceu',i:'camera',d:'Câmera na mão, transmissão no ar e post publicado antes de o culto acabar. A equipe conta a história da Alva para quem está longe.',when:'Domingos + produção durante a semana',lead:'Otávio Ribeiro',n:19,need:['Portfólio ou vontade de aprender','Notebook ajuda na edição']},
 {id:'m15',t:'Livraria',s:'Bíblias, livros e materiais',tone:'oceano',i:'library',d:'Uma estante bem escolhida pode mudar uma vida. A Livraria indica leituras, cuida do estoque e atende antes e depois dos cultos.',when:'Domingos · 17h às 21h',lead:'Mateus Oliveira',n:8,need:['Gostar de ler e de recomendar livros']},
 {id:'m16',t:'Novos Começos',s:'Recuperação e recomeço',tone:'lima',i:'sprout',d:'Grupos de apoio para quem está atravessando um luto, um divórcio ou qualquer recomeço. Ninguém precisa recomeçar sozinho.',when:'Terças · 20h',lead:'Pr. Marcos Lima',n:11,need:['Formação de facilitador (4 encontros)']},
 {id:'m17',t:'Libras',s:'Interpretação para a comunidade surda',tone:'petroleo',i:'hand',d:'Cada louvor e cada mensagem traduzidos em Libras, ao vivo. A equipe também ensina o básico para quem quer acolher melhor.',when:'Domingos · culto das 18h30',lead:'Paula Mendes',n:7,need:['Fluência em Libras para intérprete','Curso básico para apoio']},
 {id:'m18',t:'Estacionamento',s:'Orientar a chegada e a saída',tone:'damasco',i:'car',d:'O primeiro sorriso muitas vezes é de colete refletivo. A equipe organiza as vagas, ajuda idosos e mantém o trânsito fluindo nos dias de culto.',when:'Domingos · 17h30 às 19h',lead:'Felipe Costa',n:16,need:['Chegar 1 hora antes do culto']},
 {id:'m19',t:'Recepção',s:'Acolher quem chega aos cultos',tone:'rosado',i:'door',d:'Bom dia na porta, lugar guardado para quem chegou atrasado, um mapa mental de onde fica cada sala. Recepção é hospitalidade em pé.',when:'Domingos · escala mensal',lead:'Juliana Reis',n:26,need:['Pontualidade','Um sorriso fácil']},
 {id:'m20',t:'Casa de Apascentamento',s:'Liderar ou hospedar uma Casa',tone:'menta',i:'home',d:'Abrir a casa, preparar o estudo e cuidar de perto de algumas famílias. É o coração pastoral da Alva, distribuído pelos bairros.',when:'Um encontro semanal + reunião mensal de líderes',lead:'Ana e Paulo Costa',n:48,need:['Ser membro há pelo menos 1 ano','Curso de liderança de Casas']}
];
const COURSES={
 fund:{id:'fund',t:'Fundamentos da Fé',cat:'Discipulado',g:'mar',done:9,lessons:['Por que acreditar em Deus?','A fé como resposta pessoal','Fé e obras','Como a Bíblia foi formada','Interpretando as Escrituras','A Bíblia no dia a dia','Memorização e meditação','O que é oração','Oração e jejum','Oração em comunidade','Vivendo em igreja','Enviados ao mundo'],started:true},
 oracao:{id:'oracao',t:'Vida de Oração',cat:'Crescimento espiritual',g:'lima',done:3,lessons:['Por que orar','O Pai Nosso','Oração e Escritura','Intercessão','Oração em família','Uma vida de oração'],started:true},
 lider:{id:'lider',t:'Liderança Cristã',cat:'Formação de líderes',g:'vinho',done:0,lessons:['O chamado para liderar','Caráter antes de função','Servir como Jesus','Liderando pessoas','Comunicação','Conflitos','Formando novos líderes','Rotina e descanso','Liderança em equipe','Legado'],started:false},
 evang:{id:'evang',t:'Evangelismo na Prática',cat:'Missões',g:'brasa',done:0,lessons:['O que é o evangelho','Sua história com Deus','Conversas que abrem portas','Evangelho em casa','No trabalho','Na cidade','Discipulando novos convertidos','Enviados'],started:false}
};
const LESSON_INFO={
 'Oração em comunidade':{d:'O valor de orar junto com outros irmãos e como pequenos grupos de oração fortalecem a caminhada de todos.',v:'Porque onde dois ou três estiverem reunidos em meu nome, aí estou eu no meio deles.',r:'Mateus 18:20'},
 'Vivendo em igreja':{d:'A igreja como família: pertencer, servir e ser cuidado. Por que ninguém foi feito para caminhar sozinho.',v:'E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações.',r:'Atos 2:42'},
 'Enviados ao mundo':{d:'Encerrando a jornada: como viver a fé fora das paredes da igreja, no trabalho, em casa e na cidade.',v:'Portanto, ide, ensinai todas as nações.',r:'Mateus 28:19'}
};
const lessonInfo=t=>LESSON_INFO[t]||{d:'Nesta aula você vai estudar o tema com base nas Escrituras e terminar com uma aplicação prática para a semana.',v:'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.',r:'Salmos 119:105'};

/* ---------- state ---------- */
const S={
 screen:'welcome',hist:[],theme:'noite',role:'membro',
 user:{first:'Rafael',name:'Rafael Pereira'},church:null,
 email:'',otpCtx:'login',scn:'found',lookupMode:'email',prefill:null,su:{email:'',sel:0,att:5,expAt:0},
 ag:{y:2026,m:9,sel:29,tab:'Eventos'},
 escalas:[{id:'s1',min:'Louvor',area:'Ministério de Louvor',fn:'Vocal',y:2026,m:10,d:4,h:'18h30',st:'confirmado'},{id:'s2',min:'Recepção',area:'Recepção e Acolhimento',fn:'Recepcionista',y:2026,m:10,d:11,h:'17h30',st:'pendente'},{id:'s3',min:'Infantil',area:'Ministério Infantil',fn:'Monitor',y:2026,m:10,d:18,h:'9h',st:'pendente'},{id:'s4',min:'Louvor',area:'Ministério de Louvor',fn:'Vocal',y:2026,m:10,d:25,h:'18h30',st:'pendente',over:true,why:'Faltou vocal para o culto da noite'}],
 lim:{church:3,pref:null},
 discs:[{id:'d1',who:'Gabriel Souza',tone:'ceu',theme:'Identidade em Cristo',y:2026,m:10,d:1,h:'18h30',place:'Sala 3, Igreja',remote:false,st:'pendente'},{id:'d2',who:'Isabela Rocha',tone:'rosado',theme:'Serviço e doação',y:2026,m:10,d:2,h:'9h',place:'Remoto',remote:true,st:'aceito'},{id:'d3',who:'Fernanda Lima',tone:'lima',theme:'Multiplicação',y:2026,m:10,d:6,h:'19h',place:'Café Central',remote:false,st:'pendente'}],
 blocks:[],
 gr:{tab:'Casas',q:''},cu:{tab:'andamento',open:'fund',view:null,playing:false},
 rsvp:{},joined:{},serving:{},mood:null,notif:{Eventos:true,Escalas:true,'Pedidos de oração':true,Cursos:false,'Avisos gerais':true},nch:{Push:true,'E-mail':false,WhatsApp:true},quiet:true
};
const K=(y,m,d)=>y*10000+m*100+d;const KD=k=>({y:Math.floor(k/10000),m:Math.floor(k/100)%100,d:k%100});
const kDate=k=>{const o=KD(k);return new Date(o.y,o.m-1,o.d);};
const fmtK=k=>{const o=KD(k);return WD[dow(o.y,o.m,o.d)]+', '+o.d+' '+MONTHS[o.m-1].slice(0,3);};
const daysBetween=(a,b)=>Math.round((kDate(b)-kDate(a))/864e5)+1;
const blockedAt=k=>S.blocks.find(b=>k>=b.a&&k<=b.b);
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

const IDENTITY_TERMS=[{id:'alva',source:'Alva',title:'Termos de uso e privacidade',version:'2.0',required:true},{id:'product',source:'Assinaturas',title:'Termos do produto Alva',version:'1.1',required:true},{id:'news',source:'Assinaturas',title:'Receber novidades do produto',version:'1.0',required:false}];
function mobileTermsList(accept=true){return `<div class="stack g4" id="sTerms">${[true,false].map(required=>`<div class="stack g3"><h3 class="t3">${required?'Obrigatórios':'Opcionais'}</h3>${IDENTITY_TERMS.filter(d=>d.required===required).map(d=>`<div class="stack g2"><div class="row between g3"><span class="callout">${d.title}<small class="foot" style="display:block">${d.source} · versão ${d.version}</small></span>${accept?`<button type="button" class="switch" role="switch" aria-checked="false" aria-label="Aceitar ${d.title}" data-a="identityTerm" data-required="${d.required}"></button>`:''}</div><a class="link" href="/terms-demo.html#${d.id}" target="_blank" rel="noopener">Ler documento</a></div>`).join('')}</div>`).join('')}<span class="hint"></span></div>`;}
const mobileTermsAccepted=()=>$$('#sTerms [data-required="true"]').every(b=>b.getAttribute('aria-checked')==='true');
V.welcome=()=>({sb:'var(--ink)',amb:'welcome',html:`<div class="wel">
  <header class="wel-brand">
   <h1 class="wel-logo" aria-label="alva"><span class="lw">alva</span></h1>
   <p class="wel-line" aria-label="Sua comunidade, ao alcance de cada momento.">${'Sua comunidade,|ao alcance de|<em>cada momento</em>.'.split('|').map((w,i)=>`<span class="wl" style="--w:${i}">${w}</span>`).join(' ')}</p>
  </header>
  <div class="wel-actions">
   <button class="wbtn glow" data-a="go" data-v="login"><span class="wb-in">${ic('key',19,2)}Entrar com senha</span></button>
   <button class="wbtn sec" data-a="go" data-v="codeEmail"><span class="wb-in">${ic('mail',19,2)}Entrar com código por e-mail</span></button>
   <button class="wbtn sec" data-a="startSignup"><span class="wb-in">${ic('userplus',19,2)}Criar conta</span></button>
  </div>
  <p class="wel-legal"><button class="link" data-a="identityDocuments">Consultar termos e privacidade</button></p>
 </div>`});
V.terms=()=>({sb:'var(--ink)',html:flow({pct:90,body:`${head('','Aceitar termos','Há uma nova versão dos documentos. Confira antes de continuar.')}${mobileTermsList()}<p class="callout" id="identityRefusal" hidden>Sem aceitar os obrigatórios, o acesso permanece bloqueado. Reveja sua escolha ou saia.</p>`,dock:`<button class="btn primary block" id="identityAccept" data-a="identityAccept" disabled>Aceitar e continuar</button><button class="tlink" data-a="identityRefuse">Recusar obrigatórios</button><button class="tlink" data-a="identityExit">Sair</button>`})});
V.login=()=>({sb:'var(--ink)',html:flow({pct:50,form:'login',
 body:`${head('Entrar com senha','Bem-vindo de volta','Acesse sua conta da igreja.')}
  <div class="stack g4">${bigField({id:'lEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:S.email,ac:'email',im:'email'})}
  ${bigField({id:'lPass',label:'Senha',type:'password',ph:'Sua senha',ac:'current-password',reveal:true})}
  <div class="row" style="margin-top:-6px;justify-content:flex-end"><button type="button" class="link" data-a="forgot">Esqueci minha senha</button></div></div>`,
 dock:`<button class="btn primary block" type="submit">Entrar</button><button type="button" class="tlink" data-a="go" data-v="codeEmail">Prefiro receber um código</button>`})});

V.codeEmail=()=>({sb:'var(--ink)',html:flow({pct:35,form:'sendCode',
 body:`${head('Entrar com código','Qual é o seu e-mail?','Enviamos 6 dígitos para ele. Sem senha para lembrar.')}${bigField({id:'cEmail',type:'email',ph:'seu@email.com',val:S.email,ac:'email',im:'email',hint:'O mesmo e-mail que você usa na igreja'})}`,
 dock:`<button class="btn primary block" type="submit">Enviar código</button>`})});

V.otp=()=>{const su=S.otpCtx==='signup';const dest=su?maskEmail(S.su.email):S.email||'seu@email.com';return{sb:'var(--ink)',html:flow({pct:su?80:70,
 body:`${head('','Digite o código',`Enviamos 6 dígitos para <span class="mask">${esc(dest)}</span>`)}
  <div class="stack g3"><div class="otpu" id="otp" role="group" aria-label="Código de 6 dígitos">${[0,1,2,3,4,5].map(i=>`<input inputmode="numeric" autocomplete="${i?'off':'one-time-code'}" maxlength="1" aria-label="Dígito ${i+1}" data-i="${i}">`).join('')}</div>
  <div class="otpmeta"><span id="otpExp">expira em 15:00</span><span id="otpAtt">Tentativas: ${S.su.att} de 5</span></div>
  <div class="otpmsg" id="otpMsg" role="alert"></div></div>`,
 dock:`<div class="nochg"><b>Não chegou?</b><p>Verifique a caixa de spam. O remetente é <span class="mask">nao-responda@alva.app</span>.</p><button type="button" class="tlink" id="resend" data-a="resend" disabled>Reenviar em 1:00</button></div>`})};};

V.signupStart=()=>({sb:'var(--ink)',html:flow({pct:12,
 body:`${head('','Já tem um cadastro conosco?','Nos ajude a encontrá-lo. Se acharmos, seus dados vêm preenchidos e você só revisa.')}
  <div class="stack g3">
   <button class="selcard" data-a="pickLookup" data-v="email" aria-pressed="false">${ic('mail',28,1.5)}<span><b>Tenho um e-mail cadastrado</b><small>Caminho mais curto: o código chega nele.</small></span></button>
   <button class="selcard" data-a="pickLookup" data-v="phone" aria-pressed="false">${ic('phone',28,1.5)}<span><b>Tenho um telefone cadastrado</b><small>Se você não lembra qual e-mail usou.</small></span></button>
  </div>
  <div class="or">OU</div>
  <div class="dashed"><div><b>É o meu primeiro cadastro</b><p class="callout" style="margin:4px 0 0">Fazemos seu cadastro do zero. Leva cerca de 3 minutos.</p></div><button class="btn outline block md" data-a="newSignup">Criar novo cadastro</button></div>`})});

V.lookup=()=>{const ph=S.lookupMode==='phone';return{sb:'var(--ink)',html:flow({pct:30,form:'doLookup',
 body:`${head(ph?'Identificação por telefone':'Identificação por e-mail',ph?'Qual é o seu telefone?':'Qual é o seu e-mail?',ph?'Digite o número que você informou quando se cadastrou. O código de verificação chega por e-mail.':'Digite o e-mail que você informou quando se cadastrou. É só para localizar; nada é enviado agora.')}
  ${ph?bigField({id:'lkPhone',type:'tel',ph:'(11) 91234-5678',ac:'tel',im:'tel',max:15,hint:'Celular ou fixo, com DDD'}):bigField({id:'lkEmail',type:'email',ph:'seu@email.com',ac:'email',im:'email',hint:'Se tiver mais de um, comece pelo pessoal'})}
  <div id="lkRes"></div>`,
 dock:`${privacy}<button class="btn primary block" type="submit">Continuar</button>`})};};
const notFoundPanel=()=>{const ph=S.lookupMode==='phone';return `<div class="panel"><div class="ph"><span class="bang">!</span><div><b>Não encontramos ${ph?'esse telefone':'esse e-mail'}</b><p>Confira os dados e tente de novo, ou escolha outra forma de validação.</p></div></div><div class="stack g2"><button type="button" class="btn outline block md" data-a="lookupSwap">${ph?'Tentar por e-mail':'Tentar por telefone'}</button><button type="button" class="btn inverse block md" data-a="newSignup">Criar novo cadastro</button></div></div>`;};

V.pickRecord=()=>({sb:'var(--ink)',html:flow({pct:45,
 body:`${head('','Qual cadastro é o seu?',`Encontramos ${REC.length} cadastros com ${S.lookupMode==='phone'?'este telefone':'este e-mail'}. Alguns dados ficam ocultos por segurança.`)}
  <div class="stack g3" role="radiogroup" aria-label="Cadastros encontrados">${REC.map((r,i)=>`<button class="rec" role="radio" aria-checked="${S.su.sel===i}" data-a="pickRec" data-v="${i}"><span class="grow"><span class="l1"><span class="mask">${r.n}</span>${tag(r.t,r.r,true)}</span><span class="l2 stack"><span>${esc(S.lookupMode==='email'?S.su.email:maskEmail(S.su.email))}</span></span><span class="l3 mask" style="color:var(--ink-muted)">${r.ph}</span></span><span class="radio">${S.su.sel===i?ic('check',14,3):''}</span></button>`).join('')}</div>`,
 dock:`<button class="btn primary block" data-a="confirmRec">Confirmar seleção</button>`})});

V.confirmEmail=()=>{const r=REC[S.su.sel];return{sb:'var(--ink)',html:flow({pct:60,
 body:`${head('','Confirmar o e-mail do código',`Enviaremos um código de 6 dígitos para o e-mail do cadastro de <span class="mask">${r.n}</span>.`)}
  <div class="idcard"><span class="mk">${ic('mail',24,1.75)}</span><div><div class="v mask" style="font-size:19px">${esc(maskEmail(S.su.email))}</div><small>E-mail do cadastro encontrado</small></div></div>
  <div><p class="eb2" style="margin-bottom:10px">O que acontece agora</p><ol class="steps"><li>Você recebe um e-mail com o código, válido por 15 minutos.</li><li>Digita o código aqui para confirmarmos que o cadastro é seu.</li><li>Seus dados aparecem preenchidos para revisão. Nada é enviado antes disso.</li></ol></div>`,
 dock:`<button class="btn primary block" data-a="sendSignupCode">Enviar código</button><button class="tlink" data-a="back">Não é esse e-mail? Voltar</button>`})};};

V.noEmail=()=>({sb:'var(--ink)',html:flow({pct:60,
 body:`${head('','Cadastro sem e-mail','Encontramos o cadastro de <span class="mask">N*** M***</span>, mas não temos como confirmar que ele é seu.')}
  <div class="panel"><div class="ph"><span class="bang">!</span><div><b>Nenhum e-mail registrado</b><p>O código de confirmação vai só para o e-mail do cadastro, e esse cadastro não tem um.</p></div></div></div>
  <div><p class="eb2" style="margin-bottom:10px">O que você pode fazer</p><ol class="steps"><li>Criar um novo cadastro. Leva cerca de 3 minutos.</li><li>Voltar e buscar por outro telefone ou e-mail que você tenha usado.</li><li>Pedir à secretaria para incluir seu e-mail no cadastro atual.</li></ol></div>`,
 dock:`<button class="btn primary block" data-a="newSignup">Criar novo cadastro</button><button class="tlink" data-a="back">Voltar</button>`})});

V.identity=()=>{const r=REC[S.su.sel];return{sb:'var(--ink)',html:flow({pct:100,noBack:true,
 body:`<div class="okmark">${ic('check',28,2.75)}</div>
  ${head('','Identidade confirmada',`Bem-vindo, <span class="mask">${r.n}</span>. Carregamos o que já temos; você revisa e ajusta na próxima etapa.`)}
  <div class="kv"><div class="kh"><span>Dados encontrados</span><span>16 campos</span></div>
   <div class="kr"><span>Nome</span><span class="mask">${r.n}</span></div>
   <div class="kr"><span>E-mail</span><span class="mask">${esc(maskEmail(S.su.email))}</span></div>
   <div class="kr"><span>Telefone</span><span class="mask">${r.ph}</span></div>
   <div class="kr"><span>Nascimento</span><span>25/08/1992</span></div>
   <div class="kr stack2"><span>Endereço</span><span>Rua das A***, 1**<br><span style="font-weight:400;color:var(--ink-muted)">Jardins · São Paulo/SP</span></span></div></div>
  <div class="kv"><div class="kh" style="align-items:center"><span style="color:var(--ink);font-size:13px;letter-spacing:0;text-transform:none;font-weight:700">Família</span>${tag('menta','2 vínculos',true)}</div>
   <div class="kr"><span class="mask" style="color:var(--ink)">C*** P***</span><span style="font-weight:400;color:var(--ink-muted)">Cônjuge</span></div>
   <div class="kr"><span class="mask" style="color:var(--ink)">L*** P***</span><span style="font-weight:400;color:var(--ink-muted)">Filha · 9 anos</span></div></div>`,
 dock:`<button class="btn primary block" data-a="toIntegration">Prosseguir para integração</button><button class="tlink" data-a="restart">Não é você? Recomeçar</button>`})};};

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

const CH_META={sede:{g:'aurora',next:'Dom · 18h30',last:true,short:'Sede'},alpha:{g:'mar',next:'Dom · 10h',short:'Alphaville'},camp:{g:'lima',next:'Sáb · 19h30',short:'Campinas'}};
V.church=()=>({sb:'var(--ink)',html:`${appHead(`<div class="row g4"><span class="avatar lg" style="${tone('ceu')}">${initials(S.user.name)}</span><h1 class="big" style="margin:0">Olá, ${esc(S.user.first)}</h1></div>`)}
 <div class="pad stack g6">
  <div class="stack g2"><h2 class="t2">Escolha a igreja</h2><p class="body">Você tem acesso a ${CHURCHES.length} igrejas. Dá para trocar depois em Mais.</p></div>
  <div class="chlist">${CHURCHES.map(c=>{const m=CH_META[c.id];return `<button class="chrow" data-a="pickChurch" data-v="${c.id}"><span class="chdot" style="background:${MK[c.tone==='ceu'?'oceano':c.tone]}"></span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${m.short}</span>${m.last?'<span class="chl">Último acesso</span>':''}</span><span class="chm">${c.city} · ${c.members} membros</span></span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`;}).join('')}</div>
  <button class="tlink" data-a="cancelChurch">Cancelar e sair</button>
 </div>`});

/* ---------- APP ---------- */
const MOODS=[['Grato','#ffcd9c','#ff7e00','#010f12'],['Em paz','#c7ebea','#6da8a7','#010f12'],['Cansado','#a9c8da','#07486e','#ffffff'],['Preciso de oração','#ff7b50','#711610','#ffffff']];
const moodAfter=()=>!S.mood?'':S.mood==='Preciso de oração'?'<button class="link" data-a="prayer">Fazer um pedido de oração →</button>':'<p class="foot" style="margin:0">Obrigado por partilhar. Sua liderança acompanha.</p>';
const upcoming=()=>EVENTS.filter(e=>evKey(e)>=todayKey).sort((a,b)=>evKey(a)-evKey(b));
const poster=e=>`<button class="poster gr-${e.g}" data-a="event" data-v="${e.id}" aria-label="${esc(e.t)}"><div class="top">${tag(e.tone,e.cat,true)}${dateblk(e)}</div><div class="bot"><h4>${esc(e.t)}</h4><div class="meta"><span>${ic('clock',14)}${WD[dow(e.y,e.m,e.d)]} · ${e.h}</span><span>${ic('pin',14)}${esc(e.p)}</span></div>${S.rsvp[e.id]?status('success','Confirmado'):''}</div></button>`;

V.home=()=>{const up=upcoming();const r=ROLES[S.role];return{sb:'var(--ink)',tabs:'home',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${S.church.name}</p><h1 class="t1">${S.role==='visitante'?'Seja bem-vindo!':'Olá, '+esc(S.user.first)+'!'}</h1></div><button class="avatar tap" style="${tone('ceu')};border:0" data-a="tab" data-v="mais" aria-label="Abrir perfil">${initials(S.user.name)}<span class="online"></span></button></div>`)}
 ${S.role==='visitante'?visitorCard():''}${svcHome()}${(()=>{const n=S.role==='visitante'?0:S.escalas.filter(x=>x.st==='pendente').length+S.discs.filter(x=>x.st==='pendente').length;return n?`<div class="pad" style="margin:-6px 0 20px"><button class="pendpill" data-a="goPending"><span class="pcount">${n}</span><span class="grow">${n>1?n+' respostas pendentes':'1 resposta pendente'} na agenda</span>${ic('chevR',16,2.25)}</button></div>`:'';})()}
 <div class="stack g8">
  <div>
   <div class="carousel" id="car">
    <div class="slide gr-brasa" data-a="event" data-v="e11" role="button" tabindex="0"><span class="eyebrow" style="color:#fff">18 a 20 de outubro</span><h3>Conferência Anual 2026</h3><p>Seja da Partida. Três noites com preletores convidados.</p><button class="btn onmedia sm" data-a="event" data-v="e11">Inscrever-se</button></div>
    <div class="slide gr-mar" data-a="event" data-v="e12" role="button" tabindex="0"><span class="eyebrow" style="color:#c7ebea">Próxima turma · 25 out</span><h3>Batismo nas Águas</h3><p>Quer dar esse passo? A classe começa no domingo.</p><button class="btn onmedia sm" data-a="event" data-v="e12">Quero me batizar</button></div>
    <div class="slide gr-vinho" data-a="live" role="button" tabindex="0"><span class="eyebrow" style="color:#ffcdbd">Domingo · 18h30</span><h3>Culto ao vivo</h3><p>Assista de onde estiver e participe pelo chat.</p><button class="btn onmedia sm" data-a="live">Me lembrar</button></div>
   </div>
   <div class="dots" id="dots"><span class="on"></span><span></span><span></span></div>
  </div>
  <section class="pad stack g3 moodsec">
   <h2 class="t3">Como você está hoje?</h2>
   <div class="moods" id="moods" role="radiogroup" aria-label="Como você está hoje">${MOODS.map(m=>`<button class="moodt" role="radio" aria-checked="${S.mood===m[0]}" data-a="mood" data-v="${m[0]}" style="--m1:${m[1]};--m2:${m[2]};--mi:${m[3]}"><span class="orb2"></span><span class="mtx">${m[0]}</span><span class="mck" aria-hidden="true">${ic('check',16,2.75)}</span></button>`).join('')}</div>
   <div id="moodAfter" aria-live="polite">${moodAfter()}</div>
  </section>
  <nav class="pad jump" aria-label="Atalhos">
   ${(S.role==='visitante'?[['Agenda','tab','agenda',0],['Casas','tab','grupos',0],['Oração','prayer','',0],['Quem somos','sub','quemSomos',0],['Ao vivo','sub','aoVivo','live']]:[['Agenda','tab','agenda',S.escalas.filter(x=>x.st==='pendente').length+S.discs.filter(x=>x.st==='pendente').length],['Grupos','tab','grupos',0],['Cursos','tab','cursos',0],['Oração','prayer','',0],['Contribuir','give','',0],['Apresentações','sub','bebes',0],['Ao vivo','sub','aoVivo','live']]).map(j=>`<button class="jw" data-a="${j[1]}" data-v="${j[2]}"><span>${j[0]}</span>${j[3]==='live'?'<sup class="jlive" aria-label="ao vivo agora"></sup>':j[3]?`<sup aria-label="${j[3]} pendentes">${j[3]}</sup>`:''}</button>`).join('')}
  </nav>
  <section class="pad stack g3">
   <div class="row g3" style="align-items:stretch">
    ${S.role==='visitante'?`<div class="cta gr-lima grow" style="color:#010f12"><div><h3>Quero fazer parte</h3><p>Conheça o caminho para ser membro</p></div><button class="btn dark md" data-a="wantMember">Começar</button></div>`:`<div class="cta gr-lima grow" style="color:#010f12"><div><h3>Contribuir</h3><p>Dízimos, ofertas e missões</p></div><button class="btn dark md" data-a="give">Contribuir</button></div>`}
    <div class="cta gr-vinho grow" style="color:#fff"><div><h3>Pedido de oração</h3><p>Nossa equipe ora por você</p></div><button class="btn onmedia md" data-a="prayer">Pedir oração</button></div>
   </div>
   <div class="card row g3" style="padding:16px;border-radius:var(--r-md)"><span class="iconbox" style="${tone('salvia')}">${ic('message',22)}</span><div class="grow stack" style="gap:2px"><span class="it-title">Assistente no WhatsApp</span><span class="it-sub">Tire dúvidas a qualquer hora</span></div><button class="btn secondary sm" data-a="whats">Conversar</button></div>
  </section>
  <section class="stack g4">
   ${sectionHead('Agenda','Próximos eventos','Ver todos','tab','agenda')}
   <div class="hscroll">${up.slice(0,6).map(poster).join('')}</div>
  </section>
 </div>`};};

/* agenda */
const MK={petroleo:'var(--mk-menta)',damasco:'var(--mk-warn)',ambar:'var(--mk-warn)',rosado:'var(--mk-rosa)',salvia:'var(--mk-menta)',brasa:'var(--pal-brasa)',menta:'var(--mk-menta)',oceano:'var(--mk-oceano)',vinho:'var(--mk-vinho)',lima:'var(--mk-lima)',laranja:'var(--pal-laranja)',ceu:'var(--mk-oceano)'};
function monthSummary(){const {y,m}=S.ag;const ev=EVENTS.filter(e=>e.y===y&&e.m===m).length;const es=S.escalas.filter(e=>e.y===y&&e.m===m&&e.st!=='recusado').length;const bl=S.blocks.filter(b=>{const A=KD(b.a),B=KD(b.b);return (A.y*100+A.m)<=(y*100+m)&&(B.y*100+B.m)>=(y*100+m);}).length;
 return [ev?ev+(ev>1?' eventos':' evento'):'Nenhum evento',es?es+(es>1?' escalas suas':' escala sua'):'',bl?bl+(bl>1?' bloqueios':' bloqueio'):''].filter(Boolean).join(' · ');}
function calendarHTML(anim){
 const {y,m,sel}=S.ag;const first=dow(y,m,1);const days=new Date(y,m,0).getDate();const prevDays=new Date(y,m-1,0).getDate();
 let cells=['D','S','T','Q','Q','S','S'].map((d,i)=>`<span class="dow${i===0?' sun':''}">${d}</span>`).join('');
 for(let i=first-1;i>=0;i--)cells+=`<span class="day out" aria-hidden="true"><span class="n">${prevDays-i}</span></span>`;
 for(let d=1;d<=days;d++){const k=K(y,m,d);const ev=EVENTS.filter(e=>evKey(e)===k);const esc_=S.escalas.some(x=>K(x.y,x.m,x.d)===k&&x.st!=='recusado');
  const cls=['day',blockedAt(k)?'blocked':'',ev.length?'has':'',k===todayKey?'today':'',d===sel?'sel':'',k<todayKey?'past':'',esc_?'mine':''].join(' ');
  cells+=`<button class="${cls}" data-a="pickDay" data-v="${d}" aria-label="${d} de ${MONTHS[m-1]}${ev.length?', '+ev.length+(ev.length>1?' eventos':' evento'):''}${esc_?', você está escalado':''}${k===todayKey?', hoje':''}" ${d===sel?'aria-pressed="true"':''}><span class="n">${d}</span><span class="mk">${S.role!=='visitante'&&NX_MMEETS.some(h=>h.y===y&&h.m===m&&h.d===d)?'<i style="background:var(--brand)"></i>':''}${ev.slice(0,3).map(e=>`<i style="background:${MK[e.tone]||'var(--ink-muted)'}"></i>`).join('')}</span></button>`;}
 const tot=first+days;const trail=(7-tot%7)%7;for(let d=1;d<=trail;d++)cells+=`<span class="day out" aria-hidden="true"><span class="n">${d}</span></span>`;
 const cats=[...new Map(EVENTS.filter(e=>e.y===y&&e.m===m).map(e=>[e.cat,e.tone])).entries()];
 return `<div class="card cal" id="cal"><div class="cal-grid ${anim||''}" id="calGrid">${cells}</div>
  <div class="cal-foot">${cats.length?cats.map(([c,t])=>`<span class="lg"><i style="background:${MK[t]}"></i>${c}</span>`).join(''):'<span class="lg">Sem eventos neste mês</span>'}<span class="lg"><i class="lg-mine"></i>Sua escala</span></div></div>`;
}

const EVPPL=['Ana Costa','Bruno Reis','Clara Nunes','Diego Faria','Elisa Moura','Felipe Andrade','Helena Duarte','Igor Santana'];
const evAvs=e=>`<span class="ev-avs">${[0,1,2].map(i=>{const n=EVPPL[(e.d+i*3)%EVPPL.length];return `<span style="${tone(['ceu','menta','damasco','lima','rosado'][(e.d+i)%5])}">${initials(n)}</span>`;}).join('')}</span><span class="ev-n">${e.n>999?(e.n/1000).toFixed(1).replace('.',',')+' mil':e.n} vão</span>`;
const evRel=(e,base)=>{const dd=Math.round((new Date(e.y,e.m-1,e.d)-new Date(Math.floor(base/10000),Math.floor(base/100)%100-1,base%100))/864e5);return dd===1?'Amanhã':dd<7?`Em ${dd} dias`:dd<14?'Semana que vem':`Em ${Math.round(dd/7)} semanas`;};
const evWeekLbl=(e,base)=>{const b=new Date(Math.floor(base/10000),Math.floor(base/100)%100-1,base%100),d=new Date(e.y,e.m-1,e.d),sow=x=>{const c=new Date(x);c.setDate(c.getDate()-c.getDay());c.setHours(0,0,0,0);return c.getTime();},w=Math.round((sow(d)-sow(b))/(7*864e5));return w<=0?'Ainda esta semana':w===1?'Próxima semana':'Mais adiante';};
const evCard=(e,base,i)=>`<button class="ev-c ev-min" data-a="event" data-v="${e.id}" style="--t:var(--tone-${e.tone});--i:${i}"><span class="ev-dt"><b>${e.d}</b><small>${WD[dow(e.y,e.m,e.d)].toLowerCase()}</small></span>
 <span class="grow stack" style="gap:3px;min-width:0;align-items:flex-start"><span class="ev-t"><i class="ev-tdot"></i>${esc(e.t)}</span><span class="ev-m">${e.h}<span class="ev-dot"></span><span class="ev-pl">${esc(e.p)}</span></span></span>
 ${S.rsvp[e.id]?`<span class="ev-go">${ic('check',12,3)}Vou</span>`:`<span class="ev-chev">${ic('chevR',16,2)}</span>`}</button>`;
const evHero=e=>`<button class="ev-hero" data-a="event" data-v="${e.id}" style="--t:var(--tone-${e.tone});--ti:var(--tone-${e.tone}-ink)"><span class="ev-hc"><span class="ev-cat light"><i></i>${esc(e.cat)}</span><span class="ev-ht">${esc(e.t)}</span><span class="ev-hm">${ic('clock',14,2)}${e.h}<span class="ev-dot"></span>${ic('pin',14,2)}${esc(e.p)}</span></span>
 <span class="ev-hf">${evAvs(e)}<span class="ev-hb">${S.rsvp[e.id]?`${ic('check',14,3)}Você vai`:`Ver detalhes${ic('arrowR',14,2)}`}</span></span></button>`;
const apbFor=e=>typeof S!=='undefined'&&S.apb?S.apb.datas.find(d=>d.y===e.y&&d.m===e.m&&d.d===e.d):null;
const apbOpen=d=>d&&d.used<d.vagas&&apbDays(d)>=S.apb.prazo;
const apbChip=e=>{const d=apbFor(e);if(!d||S.role==='visitante')return '';const l=d.vagas-d.used;return `<span class="ev-apb ${apbOpen(d)?'':'off'}">${ic('pacifier',12,2)}Apresentações · ${apbOpen(d)?(l===1?'1 vaga':l+' vagas'):d.used>=d.vagas?'esgotado':'encerrado'}</span>`;};
const apbEvBlock=e=>{const d=apbFor(e);if(!d||S.role==='visitante')return '';const ok=apbOpen(d),l=d.vagas-d.used;return `<div class="apb-evb"><span class="apb-av">${ic('pacifier',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">Apresentação de bebês</span><span class="it-sub">${ok?`Neste culto · ${l===1?'1 vaga':l+' vagas'}`:d.used>=d.vagas?'Vagas esgotadas neste culto':'Pedidos encerrados para este culto'}</span></div>${ok?`<button class="btn primary sm" data-a="apbFromEv" data-v="${d.id}">Agendar</button>`:''}</div>`;};
const evRow=e=>`<button class="item" data-a="event" data-v="${e.id}">${dateblk(e,true)}<span class="grow stack" style="gap:2px"><span class="it-title">${esc(e.t)}</span><span class="it-sub">${e.h} · ${esc(e.p)}</span></span>${S.rsvp[e.id]?status('success','Vou'):tag(e.tone,e.cat,true)}</button>`;
function limUse(y,m){const l=S.escalas.filter(x=>x.y===y&&x.m===m&&x.st!=='recusado'),reg=l.filter(x=>!x.over).length,ex=l.filter(x=>x.over).length,pend=l.filter(x=>x.st==='pendente').length;return {reg,ex,pend,tot:l.length,lim:S.lim.church,pref:S.lim.pref};}
function limCard(){const y=2026,m=10,u=limUse(y,m),full=u.reg>=u.lim,mon=MONTHS[m-1];const cap=u.pref&&u.pref<u.lim?u.pref:u.lim;
 const sub=u.ex?`Você chegou no limite. ${u.ex===1?'1 convite chegou':u.ex+' convites chegaram'} como exceção: tudo bem recusar.`:full?'Você chegou no limite. Novos convites só chegam como exceção, com aviso.':u.lim-u.reg===1?'Falta 1 para o seu limite do mês.':`Cabem mais ${u.lim-u.reg} neste mês.`;
 return `<section class="lim-card ${u.ex?'ov':full?'full':''}" aria-label="Seu mês servindo"><div class="row between g3"><span class="eb2" style="color:inherit;opacity:.8">Seu mês servindo</span><span class="lim-mo">${mon}</span></div>
  <div class="row g3" style="align-items:flex-end"><span class="lim-big">${u.reg}<small>/${u.lim}</small></span><div class="lim-dots" aria-hidden="true">${Array.from({length:Math.max(u.lim,u.tot)},(_,i)=>`<i class="${i<u.reg?'on':i<u.lim?'':'ex'}${i>=cap&&i<u.lim?' pf':''}"></i>`).join('')}</div></div>
  <p class="lim-sub">${sub}</p>
  <div class="lim-foot"><span>${ic('users',14,2)}Limite da igreja: ${u.lim} por mês</span><button type="button" class="lim-pref" data-a="limPref">${ic('heart',14,2)}${u.pref?'Prefiro até '+u.pref:'Definir preferência'}</button></div></section>`;}

const ST2=(k,t)=>`<span class="st2 ${k}"><i></i>${t}</span>`;
const MINTONE={Louvor:'laranja','Recepção':'menta',Infantil:'ambar',Kids:'ambar',Jovens:'lima',Intercessão:'vinho'};
function escCard(x,i){const k=K(x.y,x.m,x.d),bl=blockedAt(k),o=KD(k),tn=MINTONE[x.min]||'ceu',off=x.st==='recusado';
 return `<article class="ev-c es2 ${off?'off':''} ${x.over&&!off?'lim-ov':''}" style="--t:var(--tone-${tn});--i:${i}">
  <div class="es2-r"><span class="ev-dt"><b>${o.d}</b><small>${WD[dow(o.y,o.m,o.d)].toLowerCase()}</small></span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-cat"><i></i>${esc(x.min)}<em>· ${x.h}</em></span><span class="ev-t">${esc(x.fn)}</span><span class="ev-m">${esc(x.what||x.area)}</span></span>
   ${x.st==='confirmado'?ST2('ok','Confirmado'):off?ST2('mute','Recusado'):ST2('warn','Aguardando')}</div>
  ${x.id==='s0'?svcBox():''}
  ${x.over&&!off?`<div class="lim-note">${ic('alert',16,2.2)}<div><b>Acima do seu limite do mês</b><span>${x.st==='confirmado'?'Você topou servir além do limite. Obrigado!':`O líder pediu mesmo assim${x.why?': “'+esc(x.why)+'”':''}. Tudo bem recusar.`}</span></div></div>`:''}
  ${bl&&!off?`<div class="es2-warn">${ic('alert',14,2)}Conflita com seu bloqueio de ${fmtK(bl.a)}${bl.a!==bl.b?' a '+fmtK(bl.b):''}</div>`:''}
  ${x.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="escalaOk" data-v="${x.id}">Confirmar</button><button class="btn ghost2 sm" data-a="escalaNo" data-v="${x.id}">Recusar</button></div>`:x.st==='confirmado'?`<div class="es2-a"><button class="tlink sm2" data-a="escalaNo" data-v="${x.id}">Não vou conseguir ir</button></div>`:''}
 </article>`;}
function discCard(x,i){const k=K(x.y,x.m,x.d),o=KD(k),off=x.st==='recusado';
 return `<article class="ev-c es2 ${off?'off':''}" style="--t:var(--tone-${x.tone||'ceu'});--i:${i}">
  <div class="es2-r"><span class="ev-dt"><b>${o.d}</b><small>${WD[dow(o.y,o.m,o.d)].toLowerCase()}</small></span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-cat"><i></i>${esc(x.who.split(' ').slice(0,2).join(' '))}<em>· ${x.h}</em></span><span class="ev-t">${esc(x.theme)}</span><span class="ev-m">${ic(x.remote?'monitor':'pin',13,2)}<span class="ev-pl">${esc(x.place)}</span></span></span>
   ${x.st==='aceito'?ST2('ok','Aceito'):off?ST2('mute','Recusado'):ST2('warn','Aguardando')}</div>
  ${x.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="discOk" data-v="${x.id}">Aceitar</button><button class="btn ghost2 sm" data-a="discNo" data-v="${x.id}">Recusar</button></div>`:x.st==='aceito'&&x.remote?`<div class="es2-a"><button class="tlink sm2" data-a="joinCall">${ic('monitor',14,2)}Entrar na chamada</button></div>`:''}
 </article>`;}
function agendaTab(){
 const t=S.ag.tab;
 if(t==='Eventos'){const {y,m,sel}=S.ag;const k=y*10000+m*100+sel;const day=EVENTS.filter(e=>evKey(e)===k);const nxt=EVENTS.filter(e=>evKey(e)>Math.max(k,todayKey-1)&&evKey(e)!==k).sort((a,b)=>evKey(a)-evKey(b)).slice(0,6);
  const grp={};nxt.forEach(e=>{const g=evWeekLbl(e,k);(grp[g]=grp[g]||[]).push(e);});
  return `<div class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">${k===todayKey?'Hoje · ':''}${WD[dow(y,m,sel)].toLowerCase()}, ${sel} de ${MONTHS[m-1]}</p>${day.length?day.map(evHero).join(''):`<div class="ev-none"><span>${ic('calendar',20)}</span><div class="stack" style="gap:2px"><b>Dia livre</b><span>Nada marcado. Que tal descansar ou chamar alguém para um café?</span></div></div>`}</div>
   ${nxt.length?Object.entries(grp).map(([g,l])=>`<div class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">${g}</p><div class="ev-list">${l.map((e,i)=>evCard(e,k,i)).join('')}</div></div>`).join(''):'<p class="callout">Nenhum evento depois desta data.</p>'}`;}
 if(t==='Escalas'){const seg=`<div class="seg esub" role="tablist">${[['minhas','Minhas escalas'],['disp','Disponibilidade']].map(z=>`<button type="button" aria-selected="${(S.ag.esub||'minhas')===z[0]}" data-a="esSub" data-v="${z[0]}">${z[1]}${z[0]==='disp'&&S.blocks.length?`<small>${S.blocks.length}</small>`:''}</button>`).join('')}</div>`;if(S.ag.esub==='disp')return seg+dispoHTML();return `${seg}${limCard()}<div class="stack g3"><p class="eb2">Minhas escalas de serviço</p>${S.escalas.map(escCard).join('')}</div>`;}
 if(t==='Discipulado'){return `<div class="stack g3"><p class="eb2">Encontros de discipulado</p><div class="ev-list">${S.discs.map(discCard).join('')}</div></div>`;}
 if(t==='Acompanhamento')return careBody();
 return dispoHTML();
}
function dispoHTML(){
 const bl=[...S.blocks].sort((p,q)=>p.a-q.a);
 return `<div class="stack g5"><p class="callout" style="margin:0">Bloqueie os períodos em que você não pode ser escalado. Vale para qualquer ministério (Louvor, Kids, Recepção, Estacionamento…). Quem monta a escala verá o conflito.</p>
  <button class="btn primary block" data-a="newBlock">Bloquear período</button>
  <div class="stack g3"><p class="eb2">Meus bloqueios${bl.length?' · '+bl.length:''}</p>
  ${bl.length?bl.map(x=>{const n=daysBetween(x.a,x.b);const A=KD(x.a),B=KD(x.b);return `<article class="card row g4" style="padding:16px 18px;border-radius:var(--r-lg);align-items:center"><div class="blkdate"><b>${A.d}${x.a!==x.b?'–'+B.d:''}</b><small>${MON3[A.m-1]}${A.m!==B.m?'/'+MON3[B.m-1]:''}</small></div><div class="grow stack" style="gap:3px"><span class="it-title">${x.a===x.b?fmtK(x.a):fmtK(x.a)+' a '+fmtK(x.b)}</span><span class="it-sub">${n} ${n>1?'dias':'dia'}${x.note?' · '+esc(x.note):''}</span>${x.why?`<span>${tag(x.why==='Viagem'?'ceu':x.why==='Trabalho'?'ambar':x.why==='Família'?'rosado':'salvia',x.why,true)}</span>`:''}</div><button class="tlink" data-a="rmBlock" data-v="${x.id}" aria-label="Remover bloqueio">Remover</button></article>`;}).join('')
  :`<div class="card" style="padding:28px 18px;border-radius:var(--r-lg);text-align:center"><p class="callout" style="margin:0">Nenhum período bloqueado.</p><p class="foot" style="margin:4px 0 0">Você pode ser escalado em qualquer data.</p></div>`}</div></div>`;
}
V.agenda=()=>{const {y,m}=S.ag;const isNow=y===TODAY.y&&m===TODAY.m&&S.ag.sel===TODAY.d;return{sb:'var(--ink)',tabs:'agenda',html:`${appHead(`<div class="agh"><div class="row between" style="min-height:48px"><p class="eyebrow">Agenda</p><div class="mnav ${isNow?'':'has-today'}" role="group" aria-label="Trocar mês"><button data-a="month" data-v="-1" aria-label="Mês anterior" ${y*100+m<=202609?'disabled':''}>${ic('chevL',18,2.5)}</button><span></span><button class="mtoday" data-a="goToday" ${isNow?'tabindex="-1" aria-hidden="true"':''}>Hoje</button><span class="s2"></span><button data-a="month" data-v="1" aria-label="Próximo mês">${ic('chevR',18,2.5)}</button></div></div><h1 class="mtitle" id="mTitle"><span class="mname">${MONTHS[m-1]}</span> <span class="myear">${y}</span></h1>
  <p class="msum" id="mSum">${monthSummary()}</p></div>`,['#07486e','#6da8a7'])}
 <div class="pad stack g5">${calendarHTML()}
  ${S.role==='visitante'?'':`<div class="utabs" role="tablist">${['Eventos','Escalas','Discipulado','Acompanhamento'].map(t=>`<button role="tab" aria-selected="${S.ag.tab===t}" data-a="agTab" data-v="${t}">${t}${t==='Acompanhamento'&&S.care.next&&S.care.next.st==='pendente'?'<i class="tdot"></i>':''}</button>`).join('')}</div>`}
  <div class="stack g6" id="agBody">${agendaTab()}</div>
 </div>`};};

/* grupos */
function casasList(){const q=S.gr.q.toLowerCase();const l=CASAS.filter(c=>!q||(c.t+' '+c.addr).toLowerCase().includes(q));
 if(!l.length)return `<div class="empty"><span class="it-title" style="color:var(--ink)">Nenhuma Casa encontrada</span><span class="callout">Tente outro bairro ou limpe a busca.</span><button class="link" data-a="clearQ">Limpar busca</button></div>`;
 return `<div class="chlist">${l.map(c=>{const st=S.joined[c.id]?['Pedido enviado','var(--brand-text)']:c.open?null:['Lotada','var(--mk-warn)'];return `<button class="chrow" data-a="group" data-v="${c.id}"><span class="chdot" style="background:${c.open?'var(--mk-lima)':'var(--mk-warn)'}"></span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${c.t.replace('Casa ','')}</span>${st?`<span class="chl" style="color:${st[1]}">${st[0]}</span>`:''}</span><span class="chm">${c.day.replace('-feira','')} · ${c.h} · ${c.km} km · ${c.n} membros</span></span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`;}).join('')}</div>`;}
V.grupos=()=>({sb:'var(--ink)',tabs:'grupos',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Comunhão</p><h1 class="t1">Grupos</h1><p class="callout">Casas de Apascentamento e ministérios para você pertencer e servir.</p></div>`,['#008582','#b1e454'])}
 <div class="pad stack g5">
  <div class="seg" role="tablist">${[['Casas','Casas'],['Ministérios','Ministérios']].map(t=>`<button role="tab" aria-selected="${S.gr.tab===t[0]}" data-a="grTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
  ${S.gr.tab==='Casas'?`<div class="fbox" style="min-height:48px">${ic('search',20)}<input id="grQ" type="search" placeholder="Buscar por bairro ou endereço" value="${esc(S.gr.q)}" aria-label="Buscar Casa"></div>
   <div class="stack g2"><p class="eb2">Casas de Apascentamento · ${CASAS.length}</p><div id="casas">${casasList()}</div></div>`
  :`<div class="stack g2"><p class="eb2">Ministérios · ${MINIS.length}</p><div class="chlist">${MINIS.map(mi=>`<button class="chrow" data-a="mini" data-v="${mi.id}"><span class="mico" style="color:${MK[mi.tone]||'var(--tone-'+mi.tone+'-ink)'}">${ic(mi.i,24,1.6)}</span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${mi.t}</span>${S.serving[mi.id]?'<span class="chl">Interesse enviado</span>':''}</span><span class="chm">${mi.s}</span></span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`).join('')}</div></div>`}
 </div>`});

/* cursos */
const pct=c=>Math.round(c.done/c.lessons.length*100);
V.cursos=()=>{const act=Object.values(COURSES).filter(c=>c.started),cat=Object.values(COURSES).filter(c=>!c.started);return{sb:'var(--ink)',tabs:'cursos',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Formação</p><h1 class="t1">Cursos e jornadas</h1><p class="callout">Crescimento espiritual no seu ritmo.</p></div>`,['#07486e','#a9c8da'])}
 <div class="pad stack g5">
  <div class="seg" role="tablist">${[['andamento','Em andamento'],['catalogo','Catálogo']].map(t=>`<button role="tab" aria-selected="${S.cu.tab===t[0]}" data-a="cuTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
  ${S.cu.tab==='andamento'?(act.length?act.map(c=>{const p=pct(c),fin=c.done===c.lessons.length;return `<article class="card" style="overflow:hidden"><div class="course-top gr-${c.g}" style="${c.g==='lima'?'color:#010f12':''}"><span class="eyebrow" style="color:inherit;opacity:.85">${c.cat}</span><h3 class="t2" style="text-transform:uppercase;font-weight:800;letter-spacing:-.03em">${c.t}</h3></div><div class="stack g3" style="padding:16px"><div class="row between"><span class="callout">${fin?'Todas as aulas concluídas':`Aula ${c.done} de ${c.lessons.length}`}</span><b style="font-variant-numeric:tabular-nums">${p}%</b></div><div class="bar"><i style="width:${p}%"></i></div>${fin?`<div class="row between">${status('success','Concluído')}<button class="btn secondary md" data-a="openCourse" data-v="${c.id}">Rever curso</button></div>`:`<button class="btn primary block md split" data-a="openCourse" data-v="${c.id}"><span>${c.done?'Continuar':'Começar'}</span><span class="meta">Aula ${c.done+1}</span></button>`}</div></article>`;}).join(''):'')
  :(cat.length?`<div class="list">${cat.map(c=>`<div class="item" style="cursor:default"><span class="gr-${c.g}" style="width:56px;height:56px;border-radius:var(--r-sm);flex:none"></span><span class="grow stack" style="gap:2px"><span class="it-title">${c.t}</span><span class="it-sub">${c.cat} · ${c.lessons.length} aulas</span></span><button class="btn secondary sm" data-a="startCourse" data-v="${c.id}">Iniciar</button></div>`).join('')}</div>`:`<div class="empty"><span class="iconbox">${ic('award',22)}</span><span class="it-title" style="color:var(--ink)">Você já começou todos os cursos</span><span class="callout">Novos cursos aparecem aqui assim que forem publicados.</span></div>`)}
 </div>`};};

V.curso=()=>{const c=COURSES[S.cu.open];const total=c.lessons.length,fin=c.done===total,p=pct(c);const cur=S.cu.view!=null?S.cu.view:Math.min(c.done,total-1);const lt=c.lessons[cur],li=lessonInfo(lt);const isReview=cur<c.done;
 return{sb:'var(--ink)',tabs:'cursos',html:`${appHead(`<button class="iconbtn" data-a="back" aria-label="Voltar para Cursos">${ic('chevL',20,2.25)}</button><div class="stack g2" style="margin-top:8px"><p class="eyebrow">${c.cat}</p><h1 class="t1">${c.t}</h1><div class="row g3" style="margin-top:6px"><div class="bar grow"><i style="width:${p}%"></i></div><b style="font:700 13px/1 var(--font-text);font-variant-numeric:tabular-nums">${p}%</b></div></div>`,['#07486e','#b1e454'])}
 <div class="pad stack g6">
  ${fin&&S.cu.view==null?`<div class="cta gr-lima" style="color:#010f12;min-height:0;gap:10px;padding:24px">${ic('award',32,1.75)}<p class="serif" style="margin:0;font-size:40px;line-height:40px">Curso concluído</p><p style="margin:0;font:400 15px/20px var(--font-text)">Você assistiu às ${total} aulas de ${c.t}. Que caminhada.</p><div class="row g2" style="margin-top:6px"><button class="btn dark md" data-a="cert">Ver certificado</button><button class="btn md" style="background:rgba(1,15,18,.1);color:#010f12" data-a="shareCourse">Compartilhar</button></div></div>`
  :`<div class="stack g4">
   <div class="player gr-${c.g}" id="player"><span class="ttl">${esc(lt)}</span><button class="pbtn" data-a="play" aria-label="${S.cu.playing?'Pausar':'Assistir'}">${ic(S.cu.playing?'pause':'play',28,2.5)}</button><div class="pbar"><span id="pt">0:00</span><div class="bar"><i id="pp" style="width:0"></i></div><span>12:40</span></div></div>
   <div class="stack g2"><p class="eyebrow">Aula ${cur+1} de ${total}${isReview?' · revisão':''}</p><h2 class="t2">${esc(lt)}</h2><p class="body">${esc(li.d)}</p></div>
   <div class="verse"><div class="orb gr-aurora"></div><p>${esc(li.v)}</p><div class="ref">${li.r}</div></div>
   ${isReview?`<button class="btn secondary block" data-a="resumeLesson">Voltar para a aula ${Math.min(c.done+1,total)}</button>`:`<button class="btn primary block split" data-a="completeLesson"><span>Concluir aula</span><span class="meta">${cur+1<total?'Próxima: '+(cur+2):'Última'}</span></button>`}
  </div>`}
  <section class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">Aulas do curso</p>
   <div class="list">${c.lessons.map((l,i)=>{const st=i<c.done?'done':i===c.done?'cur':'lock';return `<button class="lesson ${st}" data-a="lesson" data-v="${i}"><span class="ck">${st==='done'?ic('check',14,3):st==='lock'?ic('lock',12,2.25):i+1}</span><span class="grow">${esc(l)}</span>${S.cu.view===i?'<span class="foot">vendo</span>':''}</button>`;}).join('')}</div>
  </section>
 </div>`};};

/* mais */
const MAIS_ITEMS=[['Meus dados','user','damasco','meusDados'],['Notificações','bell','ambar','notifs'],['Quem somos','church','brasa','quemSomos'],['Acompanhamento','care','rosado','cuidado'],['Contribuir','gift','lima','contribuir'],['Inscrições','ticket','laranja','inscricoes'],['Ao vivo','radio','brasa','aoVivo'],['Meus ministérios','flame','laranja','meusMin'],['Pedidos de oração','hands','vinho','oracao'],['Fale com a secretaria','phone','ceu','secretaria'],['Assistente no WhatsApp','message','salvia','assistente'],['Privacidade e dados','lock','oceano','privacidade']];
V.mais=()=>{const nN=S.notifs.filter(n=>n.unread).length,miss=ME_MISS(S.me).length,ins=S.insc.mine.length,prW=S.prayers.filter(p=>p.st==='aguardando').length,care=S.care.next&&S.care.next.st==='pendente';
 const row=(label,v,meta,hot)=>`<button class="mrow" data-a="sub" data-v="${v}"><span class="mt">${label}</span>${meta?`<span class="mm ${hot?'hot':''}">${meta}</span>`:''}<span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;
 const grp=(t,rows)=>`<section class="mgrp"><p class="eb2">${t}</p>${rows}</section>`;
 return{sb:'var(--ink)',tabs:'mais',html:`${appHead(`<button class="mhead" data-a="sub" data-v="meusDados"><span class="avatar lg" style="${tone('ceu')}">${initials(S.user.name)}</span><span class="stack" style="align-items:flex-start;gap:2px"><span class="t2">${esc(S.user.name)}</span><span class="callout">${S.church.name}</span></span></button>`)}
 <div class="pad stack g8" style="padding-top:16px">
  ${grp('Você',row('Meus dados','meusDados',miss?miss+' dados faltando':'')+row('Notificações','notifs',nN?nN+(nN>1?' novas':' nova'):'',nN>0)+row('Privacidade e dados','privacidade',''))}
  ${grp('Sua caminhada',(S.role==='visitante'?row('Quero ser membro','secretaria','Primeiros passos'):row('Meus ministérios','meusMin',MYMIN.length+' ministérios'))+row('Inscrições','inscricoes',ins?ins+(ins>1?' ativas':' ativa'):'')+row('Pedidos de oração','oracao',prW?prW+' aguardando':'')+(S.role==='visitante'?'':row('Apresentações','bebes',S.apb.pedidos.some(p=>p.st==='aguardando')?'Aguardando':'')))}
  ${['lider','admin'].includes(S.role)?grp('Liderança',row('Acompanhamentos','urgentes',URG.length+' urgentes',true)):''}
  ${grp('A igreja',row('Quem somos','quemSomos','')+row('Fale com a secretaria','secretaria','Seg a sex')+row('Assistente no WhatsApp','assistente',''))}
  <section class="stack g3">
   <section class="mgrp"><p class="eb2" style="margin-bottom:4px">Conta</p>
    <button class="mrow" data-a="switchChurch"><span class="chdot" style="background:${MK[S.church.tone==='ceu'?'oceano':S.church.tone]}"></span><span class="grow stack" style="gap:1px"><span class="chm">Igreja atual</span><span class="mt">${S.church.name.replace('Alva ','')}</span></span><span class="mm hotline">Trocar</span><span class="ma" aria-hidden="true">${ic('swap',16,2)}</span></button>
    ${S.role==='admin'?`<button class="mrow" data-a="admin"><span class="chdot" style="background:var(--ink-muted)"></span><span class="grow stack" style="gap:1px"><span class="chm">Administração</span><span class="mt">Painel admin</span></span><span class="mm">Abre no navegador</span><span class="ma" aria-hidden="true" style="transform:rotate(-45deg)">${ic('arrowR',16,2)}</span></button>`:''}
   </section>
   <button class="btn danger block md" data-a="logout">Sair da conta</button>
   <p class="foot" style="text-align:center;margin:4px 0 0">alva v2.0.0</p>
  </section>
 </div>`};};

/* ---------- engine ---------- */
const tabsFor=()=>S.role==='visitante'?TABS.filter(t=>t[0]!=='cursos'):TABS;
const TABS=[['home','home','Início'],['agenda','calendar','Agenda'],['grupos','users','Grupos'],['cursos','book','Cursos'],['mais','dots','Mais']];
const APP=['home','agenda','grupos','cursos','curso','mais'];
let resendTimer=null,playTimer=null,expTimer=null;
const AUTHS=['welcome','login','codeEmail','otp','signupStart','lookup','pickRecord','confirmEmail','noEmail','identity','signupForm'];
function dawnSky(on){
 const ph=$('#phone');if(!ph)return;let bg=$('#authBg');
 if(!bg){bg=document.createElement('div');bg.id='authBg';bg.className='authbg';bg.setAttribute('aria-hidden','true');
  bg.innerHTML='<div class="ab-veil v1"></div><div class="ab-veil v2"></div><div class="ab-veil v3"></div><div class="ab-horizon"></div>';
  ph.insertBefore(bg,$('#view'));}
 ph.classList.toggle('auth-on',on);ph.classList.toggle('auth-wel',on&&S.screen==='welcome');
}
function render(dir){
 clearInterval(playTimer);S.cu.playing=S.screen==='curso'?S.cu.playing:false;
 const out=V[S.screen]();const view=$('#view');
 const AMB={home:'home',agenda:'agenda',grupos:'grupos',cursos:'cursos',curso:'cursos',mais:'mais',church:'church',contribuir:'grupos',aoVivo:'home',quemSomos:'home',meusMin:'cursos',inscricoes:'home',assistente:'grupos',secretaria:'agenda',privacidade:'agenda'};
 view.innerHTML=`<div data-amb="${out.amb||AMB[S.screen]||(out.tabs==='mais'?'mais':'auth')}" class="screen ${out.tabs?'has-tabs':''} ${dir==='back'?'enter-back':dir==='none'?'':dir==='tab'?'enter-tab':'enter'}" id="scr">${out.html}</div>`;
 const sbar=$('.statusbar');sbar.style.setProperty('--sb',out.sb||'var(--ink)');sbar.style.setProperty('--sbbg','transparent');const scr=$('#scr');if(out.tabs)scr.addEventListener('scroll',()=>{sbar.style.setProperty('--sbbg',scr.scrollTop>40?'var(--glass)':'transparent');sbar.style.backdropFilter=scr.scrollTop>40?'blur(20px)':'none';},{passive:true});else sbar.style.backdropFilter='none';
 $('#tabbarSlot').innerHTML=out.tabs?`<nav class="tabbar" aria-label="Navegação principal">${tabsFor().map(t=>`<button class="tab" data-a="tab" data-v="${t[0]}" ${out.tabs===t[0]?'aria-current="page"':''}>${ic(t[1],24,out.tabs===t[0]?2.25:1.75)}${t[2]}</button>`).join('')}</nav>`:'';
 dawnSky(AUTHS.includes(S.screen));
 (HOOK[S.screen]||(()=>{}))();
 if(dir!=='none')motionIn();
 tabIndicator();
 railSync();
}
function go(s,opt={}){if(opt.replace)S.hist=[];else S.hist.push(S.screen);S.screen=s;$('#overlay').innerHTML='';render(opt.dir);}
function back(){S.screen=S.hist.pop()||'welcome';$('#overlay').innerHTML='';render('back');}
function softRender(){const sc=$('#scr');const top=sc?sc.scrollTop:0;render('none');const n=$('#scr');if(n)n.scrollTop=top;}
function ensureChurch(){if(!S.church)S.church=CHURCHES[0];}

/* ---------- hooks ---------- */
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
   if(S.otpCtx==='signup'){go('identity');}
   else{overlayLoading('Entrando…');await wait(800);go('church');}
  };
  ins.forEach((inp,i)=>{
   inp.addEventListener('input',()=>{const d=inp.value.replace(/\D/g,'');if(d.length>1){d.slice(0,6-i).split('').forEach((ch,k)=>{ins[i+k].value=ch;ins[i+k].classList.add('filled')});ins[Math.min(i+d.length,5)].focus();check();return;}inp.value=d;inp.classList.toggle('filled',!!d);if(d&&i<5)ins[i+1].focus();if(msg.textContent&&S.su.att>0)msg.textContent='';check();});
   inp.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!inp.value&&i>0){ins[i-1].focus();ins[i-1].value='';ins[i-1].classList.remove('filled');}if(e.key==='ArrowLeft'&&i>0)ins[i-1].focus();if(e.key==='ArrowRight'&&i<5)ins[i+1].focus();});
   inp.addEventListener('paste',e=>{const t=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);if(!t)return;e.preventDefault();t.split('').forEach((ch,k)=>{if(ins[k]){ins[k].value=ch;ins[k].classList.add('filled')}});ins[Math.min(t.length,5)].focus();check();});
  });
  if(S.su.att>0)startResend();
 },
 lookup(){const p=$('#lkPhone');if(p)p.addEventListener('input',()=>{p.value=maskPhone(p.value)});},
 signupForm(){const p=$('#sPass'),bar=$('#pwBar'),t=$('#pwTxt');const upd=()=>{const v=p.value;let s=0;if(v.length>=8)s++;if(/[a-z]/i.test(v)&&/\d/.test(v))s++;if(/[^a-z0-9]/i.test(v)||v.length>=12)s++;const L=[['0%','Força da senha','var(--line)'],['34%','Fraca','var(--danger-text)'],['67%','Boa','var(--warning-fill)'],['100%','Forte','var(--accent)']][v?Math.max(s,1):0];bar.style.width=L[0];bar.style.background=L[2];t.textContent=L[1];};p.addEventListener('input',upd);},
 home(){const car=$('#car'),dots=$$('#dots span');const N=dots.length,DUR=5000;let idx=0,paused=false,t0=Date.now(),left=DUR,timer=null;
  const w=()=>car.children[1].offsetLeft-car.children[0].offsetLeft;
  const mark=i=>{dots.forEach((d,k)=>{d.classList.toggle('on',k===i);d.classList.remove('run');});void car.offsetWidth;dots[i].classList.add('run');};
  const go=i=>{idx=(i+N)%N;car.scrollTo({left:idx*w(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  const sched=ms=>{clearTimeout(timer);t0=Date.now();left=ms;timer=setTimeout(()=>{if(!car.isConnected)return;go(idx+1);},ms);};
  const pause=()=>{if(paused)return;paused=true;clearTimeout(timer);left=Math.max(600,left-(Date.now()-t0));$('#dots').classList.add('paused');};
  const resume=()=>{if(!paused)return;paused=false;$('#dots').classList.remove('paused');sched(left);};
  let st;car.addEventListener('scroll',()=>{clearTimeout(st);st=setTimeout(()=>{const i=Math.round(car.scrollLeft/w());if(i!==idx||!dots[i].classList.contains('run')){idx=i;}mark(idx);if(!paused)sched(DUR);},90);},{passive:true});
  car.addEventListener('pointerenter',pause);car.addEventListener('pointerleave',resume);
  car.addEventListener('touchstart',pause,{passive:true});car.addEventListener('touchend',()=>setTimeout(resume,1500),{passive:true});
  car.addEventListener('focusin',pause);car.addEventListener('focusout',resume);
  dots.forEach((d,k)=>{d.style.cursor='pointer';d.addEventListener('click',()=>go(k));});
  mark(0);sched(DUR);
 },
 grupos(){const q=$('#grQ');if(q)q.addEventListener('input',()=>{S.gr.q=q.value;$('#casas').innerHTML=casasList();});},
 curso(){if(S.cu.playing)startPlay();}
};
function startResend(){clearInterval(resendTimer);let n=60;const b=$('#resend');if(!b)return;b.disabled=true;b.textContent='Reenviar em 1:00';resendTimer=setInterval(()=>{n--;if(!document.body.contains(b)){clearInterval(resendTimer);return;}b.textContent='Reenviar em 0:'+String(n).padStart(2,'0');if(n<=0){clearInterval(resendTimer);b.disabled=false;b.textContent='Reenviar código';}},1000);}
function startPlay(){let t=0;const pp=$('#pp'),pt=$('#pt');clearInterval(playTimer);playTimer=setInterval(()=>{if(!pp){clearInterval(playTimer);return;}t+=4;const pc=Math.min(t/760*100,100);pp.style.width=pc+'%';pt.textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0');if(pc>=100)clearInterval(playTimer);},250);}

/* ---------- sheets ---------- */
function eventSheet(id){
 const e=EVENTS.find(x=>x.id===id);const on=S.rsvp[e.id];
 sheet(`<div class="sheet-hero gr-${e.g}" style="margin-top:-10px;border-radius:var(--r-xl) var(--r-xl) 0 0">${tag(e.tone,e.cat,true)}<h3>${esc(e.t)}</h3><div class="row g4" style="font:400 15px/20px var(--font-text);flex-wrap:wrap"><span class="row" style="gap:4px">${ic('calendar',16)}${e.range||WD[dow(e.y,e.m,e.d)]+', '+e.d+' de '+MONTHS[e.m-1]}</span><span class="row" style="gap:4px">${ic('clock',16)}${e.h}</span><span class="row" style="gap:4px">${ic('pin',16)}${esc(e.p)}</span></div></div>
 <div class="stack g5"><p class="body">${DESC[e.cat]||''}</p>
  <div class="row between">${avs(4,(e.n+(on?1:0))+(e.sign?' inscritos':' confirmados'),'var(--surface-raised)')}${on?status('success',e.sign?'Inscrito':'Confirmado'):''}</div>
  ${apbEvBlock(e)}
  <div class="stack g3">${on?`<button class="btn outline block" data-a="rsvp" data-v="${e.id}">${e.sign?'Cancelar inscrição':'Cancelar presença'}</button>`:`<button class="btn primary block split" data-a="rsvp" data-v="${e.id}"><span>${e.sign?'Inscrever-se':'Confirmar presença'}</span><span class="meta">${e.sign?'Gratuito':WD[dow(e.y,e.m,e.d)]+' '+e.d+'/'+String(e.m).padStart(2,'0')}</span></button>`}
  <div class="row g3"><button class="btn secondary md grow" data-a="addCal">Salvar na agenda</button><button class="btn secondary md grow" data-a="shareEv">Compartilhar</button></div></div></div>`);
}
function groupSheet(id){
 const c=CASAS.find(x=>x.id===id);const j=S.joined[id];const st=j?['Pedido enviado','var(--brand-text)']:c.open?['Aberta','var(--mk-lima)']:['Lotada','var(--mk-warn)'];
 const leaders=c.leader.replace(/^(\w+) e (\w+) (\w+)$/,'$1 $3|$2 $3').split('|');
 sheet(`<div class="stack g5">
  <div class="stack" style="gap:6px"><div class="row between"><p class="eb2">Casa de Apascentamento</p><span class="gst"><i style="background:${st[1]}"></i>${st[0]}</span></div><h3 class="gname">${c.t.replace('Casa ','')}</h3></div>
  <div class="gfacts"><div><span class="eb2">Quando</span><b>${c.day.replace('-feira','')}</b><small>${c.h}</small></div><div><span class="eb2">Distância</span><b>${c.km}</b><small>km de você</small></div><div><span class="eb2">Membros</span><b>${c.n}</b><small>${c.open?'vagas abertas':'sem vagas'}</small></div></div>
  <div class="chlist">
   <div class="prow"><span class="grow stack" style="gap:2px"><span class="eb2">Endereço</span><span class="pt" style="font-size:16px">${esc(c.addr)}</span></span><button class="link" data-a="openMap">Ver no mapa</button></div>
   <div class="prow"><span class="grow stack" style="gap:6px"><span class="eb2">${leaders.length>1?'Líderes':'Líder'}</span><span class="row g2">${leaders.map((l,k)=>`<span class="avatar" style="${tone(['menta','damasco'][k%2])};width:30px;height:30px;font-size:11px">${initials(l)}</span>`).join('')}<span class="pt" style="font-size:16px">${esc(c.leader)}</span></span></span></div>
  </div>
  ${j?`<button class="btn outline block" data-a="joinGroup" data-v="${id}">Cancelar pedido</button>`:c.open?`<button class="btn primary block split" data-a="joinGroup" data-v="${id}"><span>Quero participar</span><span class="meta">${c.day.slice(0,3)} · ${c.h}</span></button>`:`<button class="btn inverse block" data-a="joinGroup" data-v="${id}">Entrar na lista de espera</button>`}
  <button class="btn secondary block talkbtn" data-a="talkLeader" data-v="g|${id}">${ic('message',18)}Falar com o líder</button>
 </div>`);
}
function serveBox(m,on,note){return on?`<div class="servecard"><span class="svdot"></span><span class="grow stack" style="gap:2px"><b>Interesse enviado</b><span>${m.lead} vai falar com você em até 3 dias.</span></span></div><button class="btn outline block md" data-a="serve" data-v="${m.id}">Cancelar interesse</button>`:`${note?`<p class="svnote">${note}</p>`:''}<button class="btn primary block split" data-a="serve" data-v="${m.id}"><span>Quero servir</span><span class="meta">Resposta em até 3 dias</span></button>`;}
function miniSheet(id){const m=MINIS.find(x=>x.id===id);const on=S.serving[id];
 sheet(`<div class="stack g5"><div class="row between" style="align-items:flex-start;gap:16px"><div class="stack" style="gap:6px"><p class="eb2">Ministério</p><h3 class="gname" style="font-size:${m.t.length>14?30:40}px;line-height:1">${m.t}</h3></div><span class="mico" style="color:${MK[m.tone]||'var(--tone-'+m.tone+'-ink)'};width:auto;margin-top:18px">${ic(m.i,34,1.5)}</span></div>
  <p class="body" style="color:var(--ink);margin:0">${m.d}</p>
  <div class="gfacts"><div style="grid-column:span 2"><span class="eb2">Quando</span><b style="font-size:17px;line-height:22px;letter-spacing:-.02em">${m.when}</b></div><div><span class="eb2">Equipe</span><b>${m.n}</b><small>voluntários</small></div></div>
  <div class="chlist"><div class="prow"><span class="grow stack" style="gap:2px"><span class="eb2">Liderança</span><span class="pt" style="font-size:16px">${m.lead}</span></span></div><div class="prow" style="align-items:flex-start"><span class="grow stack" style="gap:6px"><span class="eb2">Para servir aqui</span>${m.need.map(n=>`<span class="row g2" style="align-items:flex-start;font:400 15px/20px var(--font-text)"><span class="mico" style="width:auto;color:var(--brand-text);margin-top:2px">${ic('check',14,2.5)}</span>${n}</span>`).join('')}</span></div></div>
  <div class="servebox" id="serveBox">${S.role==='visitante'?`<div class="svc-note" style="margin:0">${ic('info',16,2)}<div><b>Servir é para membros</b><span>Depois da integração você pode servir em qualquer ministério. Enquanto isso, converse com o líder para conhecer.</span></div></div>`:serveBox(m,on)}</div><button class="btn secondary block talkbtn" data-a="talkLeader" data-v="m|${m.id}">${ic('message',18)}Falar com o líder</button></div>`);}
function giveSheet(){
 const st={type:'Dízimo',amt:50,method:'Pix'};
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Contribuir</h3><p class="callout">Sua generosidade sustenta a obra da ${esc(S.church?S.church.name:'igreja')}.</p></div>
  <div class="seg" id="gType">${['Dízimo','Oferta','Missões'].map(t=>`<button type="button" aria-selected="${t==='Dízimo'}" data-v="${t}">${t}</button>`).join('')}</div>
  <div class="stack g2"><span class="foot" style="font-weight:600">Valor</span><div class="amounts" id="gAmt">${[20,50,100].map(v=>`<button type="button" class="chip" aria-pressed="${v===50}" data-v="${v}">R$ ${v}</button>`).join('')}<button type="button" class="chip" aria-pressed="false" data-v="outro">Outro</button></div></div>
  <div id="gOther" hidden>${field({id:'gVal',label:'Outro valor',type:'text',ph:'R$ 0,00',im:'decimal'})}</div>
  <div class="stack g2"><span class="foot" style="font-weight:600">Forma de pagamento</span><div class="row g2" id="gMet">${['Pix','Cartão','Boleto'].map(m=>`<button type="button" class="chip" aria-pressed="${m==='Pix'}" data-v="${m}">${m}</button>`).join('')}</div></div>
  <button class="btn accent block split" id="gGo"><span>Contribuir</span><span class="meta" id="gGoV">R$ 50,00</span></button></div>`,sh=>{
  const fmt=v=>'R$ '+v.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  const upd=()=>{$('#gGoV').textContent=st.amt?fmt(st.amt):'—';};
  const group=(sel,fn)=>$(sel,sh).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',$(sel,sh)).forEach(x=>x.setAttribute(sel==='#gType'?'aria-selected':'aria-pressed',x===b));fn(b.dataset.v);upd();});
  group('#gType',v=>st.type=v);group('#gMet',v=>st.method=v);
  group('#gAmt',v=>{const o=$('#gOther',sh);if(v==='outro'){o.hidden=false;st.amt=0;$('#gVal').focus();}else{o.hidden=true;st.amt=+v;clearErr('gVal');}});
  $('#gVal',sh).addEventListener('input',e=>{let d=e.target.value.replace(/\D/g,'');const n=(+d||0)/100;e.target.value=d?fmt(n):'';st.amt=n;clearErr('gVal');upd();});
  $('#gGo',sh).addEventListener('click',async e=>{if(!$('#gOther',sh).hidden&&st.amt<1){setErr('gVal','Informe um valor a partir de R$ 1,00.');return;}if(st.amt>5000){setErr('gVal','Para valores acima de R$ 5.000, fale com a tesouraria.');return;}
   await busy(e.currentTarget,1200,null,'Registrado');await closeSheet();toast('success',st.type+' registrado',fmt(st.amt)+' via '+st.method+'. O comprovante fica em Minhas contribuições.');});
 });
}
function prayerSheet(){
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pedido de oração</h3><p class="callout">A equipe de intercessão ora por cada pedido durante a semana.</p></div>
  ${field({id:'pText',label:'Seu pedido',area:true,ph:'Pelo que podemos orar?',hint:'0/500',max:500})}
  <div class="list"><div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">Enviar anonimamente</span><span class="it-sub">Seu nome não aparece para a equipe</span></span><button type="button" class="switch" role="switch" aria-checked="false" aria-label="Anônimo" data-a="sw"></button></div><div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">Compartilhar com minha Casa</span><span class="it-sub">Casa Jardins</span></span><button type="button" class="switch" role="switch" aria-checked="true" aria-label="Compartilhar com minha Casa" data-a="sw"></button></div></div>
  <button class="btn primary block" id="pGo">Enviar pedido</button></div>`,sh=>{
  const ta=$('#pText',sh);ta.addEventListener('input',()=>{clearErr('pText');$('#f-pText .hint').textContent=ta.value.length+'/500';$('#f-pText .hint').dataset.hint=ta.value.length+'/500';});
  $('#pGo',sh).addEventListener('click',async e=>{const v=ta.value.trim();if(!v){setErr('pText','Escreva seu pedido para enviarmos à equipe.');return;}if(v.length<10){setErr('pText','Conte um pouco mais para a equipe saber como orar.');return;}
   await busy(e.currentTarget,1100,null,'Enviado');await closeSheet();toast('success','Pedido enviado','Nossa equipe de intercessão vai orar por você.');});
 });
}
const NDESC={Eventos:'Cultos, conferências e eventos da sua igreja','Escalas':'Novas escalas e lembretes de confirmação','Pedidos de oração':'Quando alguém orar pelo seu pedido','Cursos':'Novas aulas e lembretes de estudo','Avisos gerais':'Comunicados da secretaria e da liderança'};
function notifSheet(){sheet(`<div class="stack g5"><div class="row between" style="align-items:center"><h3 class="t2">Preferências</h3><span class="saved" id="nSaved" aria-live="polite"></span></div>
 <section class="stack"><p class="eb2" style="margin-bottom:4px">O que avisar</p><div class="chlist">${Object.keys(S.notif).map(k=>`<div class="prow"><span class="grow stack" style="gap:2px"><span class="pt">${k}</span><span class="chm">${NDESC[k]}</span></span><button type="button" class="switch" role="switch" aria-checked="${S.notif[k]}" aria-label="${k}" data-a="notifSw" data-v="${k}"></button></div>`).join('')}</div></section>
 <section class="stack g3"><p class="eb2">Como avisar</p><div class="row g2" style="flex-wrap:wrap">${Object.keys(S.nch).map(k=>`<button type="button" class="chip" aria-pressed="${S.nch[k]}" data-a="nch" data-v="${k}">${k}</button>`).join('')}</div></section>
 <div class="chlist"><div class="prow"><span class="grow stack" style="gap:2px"><span class="pt">Silenciar à noite</span><span class="chm">Das 22h às 7h, exceto avisos urgentes</span></span><button type="button" class="switch" role="switch" aria-checked="${S.quiet}" aria-label="Silenciar à noite" data-a="quietSw"></button></div></div>
</div>`);}
function churchSheet(){sheet(`<div class="stack g4"><h3 class="t2">Trocar de igreja</h3><div class="chlist">${CHURCHES.map(c=>{const cur=S.church&&S.church.id===c.id;return `<button class="chrow ${cur?'current':''}" data-a="setChurch" data-v="${c.id}" ${cur?'aria-current="true"':''}><span class="chdot" style="background:${MK[c.tone==='ceu'?'oceano':c.tone]}"></span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${CH_META[c.id].short}</span>${cur?'<span class="chl">Atual</span>':''}</span><span class="chm">${c.city} · ${c.members} membros</span></span>${cur?`<span class="chk" aria-hidden="true">${ic('check',18,2.5)}</span>`:`<span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span>`}</button>`;}).join('')}</div></div>`);}
function forgotSheet(){sheet(`<form class="stack g5" data-submit="forgotSend" novalidate><div class="stack g2"><h3 class="t2">Redefinir senha</h3><p class="callout">Enviamos um botão e um código para criar sua nova senha. Botão e código válidos por 1 hora.</p></div>${field({id:'fEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:val('lEmail')||S.email,im:'email'})}<button class="btn primary block" type="submit">Continuar</button></form>`);}
V.loginBlocked=()=>({sb:'var(--ink)',html:flow({pct:50,body:`${head('Entrar','Entrada temporariamente bloqueada','Tente novamente em 14:59 ou escolha outra forma de acesso.')}<p class="foot">Demonstração de bloqueio. O tempo é ilustrativo.</p>`,dock:`<button class="btn primary block" data-a="go" data-v="codeEmail">Entrar com código</button><button class="btn secondary block" data-a="forgot">Redefinir senha</button>`})});
V.resetPassword=()=>({sb:'var(--ink)',html:flow({pct:70,form:'resetDemo',body:`${head('Redefinir senha','Crie sua nova senha','Se houver uma conta para este e-mail, enviamos as instruções. Confira também o spam.')}<div class="stack g4">${field({id:'resetCode',label:'Código de 6 dígitos',ph:'123456',im:'numeric',max:6,ac:'one-time-code'})}${field({id:'resetPass',label:'Nova senha',type:'password',ph:'Crie uma senha',ac:'new-password',reveal:true,hint:'Mínimo de 8 caracteres, com letras e números.'})}<p class="foot">Botão e código válidos por 1 hora. Demonstração: use 123456; nenhum e-mail é enviado.</p></div>`,dock:`<button class="btn primary block" type="submit">Redefinir senha</button><button class="tlink" type="button" data-a="resetResendDemo">Reenviar código</button>`})});
V.resetDone=()=>({sb:'var(--ink)',html:flow({pct:100,body:`${head('','Senha redefinida','As outras sessões foram encerradas. Entre com sua nova senha.')}`,dock:`<button class="btn primary block" data-a="go" data-v="login">Voltar para entrar</button>`})});

function logoutSheet(){sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Sair da conta?</h3><p class="body">Você vai precisar entrar de novo para ver sua agenda, grupos e cursos.</p></div><div class="stack g3"><button class="btn dangerfill block" data-a="doLogout">Sair da conta</button><button class="btn outline block" data-a="closeSheet">Continuar conectado</button></div></div>`);}
function inscrSheet(){const l=EVENTS.filter(e=>S.rsvp[e.id]);sheet(`<div class="stack g5"><h3 class="t2">Minhas inscrições</h3>${l.length?`<div class="list">${l.map(evRow).join('')}</div>`:`<div class="empty"><span class="iconbox">${ic('ticket',22)}</span><span class="it-title" style="color:var(--ink)">Nenhuma inscrição ainda</span><span class="callout">Confirme presença em um evento e ele aparece aqui.</span><button class="btn primary md" data-a="tab" data-v="agenda">Ver agenda</button></div>`}</div>`);}
/* ---------- disponibilidade: bloqueio por período ---------- */
function blockSheet(){
 const st={y:TODAY.y,m:TODAY.m,a:null,b:null,why:null};
 const grid=()=>{const first=dow(st.y,st.m,1),days=new Date(st.y,st.m,0).getDate();let h=['D','S','T','Q','Q','S','S'].map(d=>`<span class="dow">${d}</span>`).join('');for(let i=0;i<first;i++)h+='<span></span>';
  for(let d=1;d<=days;d++){const k=K(st.y,st.m,d),past=k<todayKey,lo=st.a,hi=st.b||st.a;const inR=lo&&k>=lo&&k<=hi;const ex=blockedAt(k);const esc_=S.escalas.find(x=>K(x.y,x.m,x.d)===k&&x.st!=='recusado');
   h+=`<button type="button" class="rday${inR?' in':''}${k===lo?' lo':''}${k===hi&&st.b?' hi':''}${k===lo&&!st.b?' one':''}${ex?' taken':''}" data-k="${k}" ${past?'disabled':''} aria-label="${d} de ${MONTHS[st.m-1]}${ex?', já bloqueado':''}${esc_?', você está escalado':''}">${d}${esc_?'<i></i>':''}</button>`;}
  return h;};
 const summary=()=>{if(!st.a)return '<span class="callout">Toque no primeiro dia. Para um período, toque também no último.</span>';const b=st.b||st.a,n=daysBetween(st.a,b);
  const conf=S.escalas.filter(x=>{const k=K(x.y,x.m,x.d);return k>=st.a&&k<=b&&x.st!=='recusado';});
  return `<div class="stack g2"><span class="it-title">${st.a===b?fmtK(st.a):fmtK(st.a)+' → '+fmtK(b)}</span><span class="foot">${n} ${n>1?'dias bloqueados':'dia bloqueado'}</span>${conf.length?`<div class="panel" style="padding:14px;gap:6px;animation:none"><div class="ph"><span class="bang">!</span><div><b style="font-size:15px">Você já está escalado nesse período</b><p style="font-size:14px">${conf.map(x=>x.min+' · '+fmtK(K(x.y,x.m,x.d))).join('<br>')}<br>A liderança será avisada do conflito.</p></div></div></div>`:''}</div>`;};
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Bloquear período</h3><p class="callout">Escolha as datas em que você não pode servir.</p></div>
  <div class="rangecal"><div class="row between" style="margin-bottom:8px"><button type="button" class="iconbtn" id="rcPrev" aria-label="Mês anterior">${ic('chevL',18,2.25)}</button><b id="rcM" style="font:700 17px/1 var(--font-display);text-transform:capitalize"></b><button type="button" class="iconbtn" id="rcNext" aria-label="Próximo mês">${ic('chevR',18,2.25)}</button></div><div class="rgrid" id="rcG"></div><p class="foot" style="margin:8px 0 0;display:flex;gap:14px"><span class="row" style="gap:6px"><i class="lg-esc"></i>você está escalado</span><span class="row" style="gap:6px"><i class="lg-blk"></i>já bloqueado</span></p></div>
  <div id="rcSum"></div>
  <div class="stack g2"><span class="eb2">Motivo (opcional)</span><div class="row g2" style="flex-wrap:wrap" id="rcWhy">${['Viagem','Trabalho','Família','Outro'].map(w=>`<button type="button" class="chip" aria-pressed="false" data-v="${w}">${w}</button>`).join('')}</div></div>
  ${field({id:'bNote',label:'Observação para a liderança',ph:'Ex.: volto a tempo do culto de domingo à noite',max:120})}
  <div class="otpmsg" id="rcErr" role="alert" style="min-height:0"></div>
  <button type="button" class="btn primary block" id="rcGo">Bloquear</button></div>`,sh=>{
  const draw=()=>{$('#rcM',sh).textContent=MONTHS[st.m-1]+' '+st.y;$('#rcG',sh).innerHTML=grid();$('#rcSum',sh).innerHTML=summary();$('#rcPrev',sh).disabled=(st.y===TODAY.y&&st.m===TODAY.m);const b=st.b||st.a;$('#rcGo',sh).innerHTML=st.a?`<span>Bloquear</span><span class="meta">${daysBetween(st.a,b)} ${daysBetween(st.a,b)>1?'dias':'dia'}</span>`:'Bloquear';$('#rcGo',sh).classList.toggle('split',!!st.a);$('#rcErr',sh).textContent='';};
  $('#rcPrev',sh).onclick=()=>{st.m--;if(st.m<1){st.m=12;st.y--;}draw();};
  $('#rcNext',sh).onclick=()=>{st.m++;if(st.m>12){st.m=1;st.y++;}draw();};
  $('#rcG',sh).addEventListener('click',e=>{const b=e.target.closest('.rday');if(!b||b.disabled)return;const k=+b.dataset.k;
   if(!st.a||st.b){st.a=k;st.b=null;}else if(k<st.a){st.a=k;}else if(k===st.a){st.b=null;}else st.b=k;draw();});
  $('#rcWhy',sh).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const on=b.getAttribute('aria-pressed')!=='true';$$('#rcWhy button',sh).forEach(x=>x.setAttribute('aria-pressed',x===b&&on));st.why=on?b.dataset.v:null;});
  $('#rcGo',sh).addEventListener('click',async e=>{const err=$('#rcErr',sh);
   if(!st.a){err.textContent='Escolha pelo menos um dia no calendário.';$('#rcG',sh).classList.remove('shake');void sh.offsetWidth;$('#rcG',sh).classList.add('shake');return;}
   const a=st.a,b=st.b||st.a;if(S.blocks.some(x=>a<=x.b&&b>=x.a)){err.textContent='Parte desse período já está bloqueada. Remova o bloqueio antigo ou escolha outras datas.';return;}
   if(daysBetween(a,b)>90){err.textContent='Bloqueios vão até 90 dias. Para afastamentos longos, fale com a liderança.';return;}
   await busy(e.currentTarget,800,null,'Bloqueado');S.blocks.push({id:'b'+Date.now(),a,b,why:st.why,note:val('bNote')});await closeSheet();
   const conf=S.escalas.some(x=>{const k=K(x.y,x.m,x.d);return k>=a&&k<=b&&x.st!=='recusado';});
   toast(conf?'info':'success','Período bloqueado',conf?'Você tinha escala nessas datas; a liderança foi avisada.':'Ninguém vai te escalar nessas datas.');softRender();});
  draw();
 });
}
function refuseSheet(kind,id){
 const x=kind==='escala'?S.escalas.find(e=>e.id===id):S.discs.find(e=>e.id===id);const who=kind==='escala'?'a liderança de '+x.min:x.who.split(' ')[0];
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${kind==='escala'?'Recusar escala':'Recusar encontro'}</h3><p class="callout">${kind==='escala'?x.min+' · '+x.fn+' · '+fmtK(K(x.y,x.m,x.d)):x.theme+' · '+fmtK(K(x.y,x.m,x.d))+' · '+x.h}</p></div>
  <div class="stack g2"><span class="eb2">Por quê?</span><div class="row g2" style="flex-wrap:wrap" id="rfWhy">${(kind==='escala'?(x.over?['Já sirvo bastante este mês','Viagem','Trabalho','Outro']:['Viagem','Trabalho','Compromisso familiar','Outro']):['Horário não dá','Prefiro remoto','Outro']).map(w=>`<button type="button" class="chip" aria-pressed="false" data-v="${w}">${w}</button>`).join('')}</div></div>
  ${field({id:'rfMsg',label:'Mensagem para '+who+' (opcional)',area:true,ph:kind==='escala'?'Posso trocar com alguém do time?':'Que tal na semana seguinte?',max:200})}
  <div class="otpmsg" id="rfErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="rfGo">Recusar</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{
  let why=null;$('#rfWhy',sh).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#rfWhy button',sh).forEach(z=>z.setAttribute('aria-pressed',z===b));why=b.dataset.v;$('#rfErr',sh).textContent='';});
  $('#rfGo',sh).addEventListener('click',async e=>{if(!why){$('#rfErr',sh).textContent='Escolha um motivo para '+who+' entender.';return;}
   await busy(e.currentTarget,700,null,'Recusado');x.st='recusado';await closeSheet();$('#agBody').innerHTML=agendaTab();
   toast('info',kind==='escala'?'Escala recusada':'Encontro recusado',kind==='escala'?(()=>{const u=limUse(x.y,x.m);return 'A liderança de '+x.min+' vai procurar outra pessoa.'+(x.over?' Seu mês segue em '+u.reg+' de '+u.lim+'.':' Uma vaga do seu mês ficou livre ('+u.reg+' de '+u.lim+').');})():x.who.split(' ')[0]+' vai sugerir outro horário.');});
 });
}

/* ---------- agenda: month swap + swipe ---------- */
function monthSwap(dir){const sc=$('#scr');const top=sc.scrollTop;render('none');const n=$('#scr');n.scrollTop=top;
 if(!dir)return;const g=$('#calGrid'),t=$('#mTitle'),s=$('#mSum');[g,t,s].forEach(el=>{if(!el)return;el.classList.add(dir==='next'?'in-next':'in-prev');});}
HOOK.agenda=function(){const g=$('#cal');if(!g)return;let x0=null,y0=null;
 g.addEventListener('pointerdown',e=>{x0=e.clientX;y0=e.clientY;});
 g.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){A.month(dx<0?'1':'-1');}});};
/* ---------- motion: stagger, word reveal, tab indicator ---------- */
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

/* ---------- actions ---------- */
const soon=(what)=>toast('info',what||'Em construção','Esta tela entra na próxima leva do protótipo.');
const LEGAL={termos:['Termos de uso','Regras de uso do app da igreja: o que você pode fazer, o que a igreja faz com o que você publica e como encerrar a conta quando quiser.'],privacidade:['Política de privacidade','Quais dados guardamos (nome, contato, família e participação), quem na igreja pode ver cada um e como pedir cópia ou exclusão.']};
const A={
 identityDocuments:()=>sheet(`<div class="stack g4"><h3 class="t2">Termos e privacidade</h3>${mobileTermsList(false)}<button class="btn primary block" data-a="closeSheet">Fechar</button></div>`),
 identityTerm:(v,el)=>{el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true');const b=$('#identityCreate')||$('#identityAccept');if(b)b.disabled=!mobileTermsAccepted();const msg=$('#identityRefusal');if(msg&&mobileTermsAccepted())msg.hidden=true;},
 identityRefuse:()=>{$$('#sTerms [data-required="true"]').forEach(b=>b.setAttribute('aria-checked','false'));$('#identityAccept').disabled=true;$('#identityRefusal').hidden=false;},
 identityAccept:()=>{if(!mobileTermsAccepted())return;ensureChurch();go('home');toast('success','Termos aceitos','Demonstração');},
 identityExit:()=>go('welcome'),
 go:v=>go(v),back,
 closeSheet:()=>closeSheet(),
 tab:v=>{ensureChurch();closeSheet();if(S.role==='visitante'&&v==='cursos'){toast('info','Cursos são para membros','Depois da integração você tem acesso às jornadas e cursos.');return;}if(S.screen===v)return;S.hist=[];S.screen=v;render('tab');},
 reveal:(v,el)=>{const i=$('#'+v);const show=i.type==='password';i.type=show?'text':'password';el.innerHTML=ic(show?'eyeOff':'eye',el.closest('.bigwrap')?22:20,1.75);el.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');el.setAttribute('aria-pressed',show);const n=i.value.length;i.focus();try{i.setSelectionRange(n,n)}catch(_){}},
 forgot:()=>forgotSheet(),
 resetResendDemo:()=>toast('info','Código reenviado','Demonstração: use 123456.'),
 startSignup:()=>go('signupStart'),
 legal:v=>{const l=LEGAL[v];sheet(`<div class="stack g4"><div class="stack g2"><h3 class="t2">${l[0]}</h3><p class="body">${l[1]}</p><p class="foot">Versão de demonstração. O texto completo fica disponível no app final.</p></div><button class="btn primary block" data-a="closeSheet">Entendi</button></div>`);},
 pickLookup:async(v,el)=>{$$('.selcard').forEach(c=>c.setAttribute('aria-pressed',c===el));S.lookupMode=v;await wait(260);go('lookup');},
 lookupSwap:()=>{S.lookupMode=S.lookupMode==='phone'?'email':'phone';S.screen='lookup';render();},
 pickRec:(v,el)=>{S.su.sel=+v;$$('.rec').forEach((r,i)=>{const on=i===+v;r.setAttribute('aria-checked',on);$('.radio',r).innerHTML=on?ic('check',14,3):'';});},
 confirmRec:()=>go('confirmEmail'),
 sendSignupCode:async(v,el)=>{await busy(el,1000,null,'Código enviado');S.otpCtx='signup';S.su.att=5;S.su.expAt=Date.now()+15*60000;toast('success','Código enviado','Válido por 15 minutos.');go('otp');},
 toIntegration:()=>{S.prefill={found:true,nome:'Rafael',sobre:'Pereira',email:S.su.email};go('signupForm');},
 restart:()=>{S.hist=['welcome'];S.screen='signupStart';S.prefill=null;render('back');},
 newSignup:()=>{S.prefill=null;go('signupForm');},
 toggleTerms:(v,el)=>{el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true');clearErr('sTerms');},
 sw:(v,el)=>el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true'),
 resend:async(v,el)=>{el.disabled=true;el.textContent='Enviando…';await wait(900);const was=S.su.att<=0;S.su.att=5;S.su.expAt=Date.now()+15*60000;toast('success','Novo código enviado','O anterior deixou de valer.');if(was){softRender();}else{startResend();}},
 pickChurch:async(v,el)=>{if(el&&el.classList){$$('.chrow').forEach(c=>c.classList.toggle('dim',c!==el));el.classList.add('chosen');await wait(380);}S.church=CHURCHES.find(c=>c.id===v);overlayLoading('Entrando em '+S.church.name+'…');await wait(1000);S.hist=[];S.screen='home';$('#overlay').innerHTML='';render();},
 cancelChurch:()=>{S.hist=[];S.screen='welcome';render('back');toast('info','Acesso cancelado','Você precisa escolher uma igreja para usar o app.');},
 /* home */
 event:v=>eventSheet(v),
 live:()=>toast('info','Lembrete ativado','Avisamos quando o culto de domingo, 18h30, entrar ao vivo.'),
 mood:(v,el)=>{S.mood=v;$$('#moods .chip').forEach(c=>c.setAttribute('aria-pressed',c===el));if(v==='Preciso de oração'){prayerSheet();}else toast('success','Obrigado por partilhar','Sua liderança da Casa acompanha como você está.');},
 ministerios:()=>{S.gr.tab='Ministérios';A.tab('grupos');},
 prayer:()=>prayerSheet(),give:()=>giveSheet(),
 whats:()=>toast('info','Abrindo o WhatsApp','No app real, a conversa com o assistente abre aqui.'),
 rsvp:async(v,el)=>{const e=EVENTS.find(x=>x.id===v);await busy(el,700,null,S.rsvp[v]?'Cancelado':(EVENTS.find(x=>x.id===v).sign?'Inscrito':'Confirmado'));S.rsvp[v]=!S.rsvp[v];await closeSheet();
  if(S.rsvp[v])toast('success',e.sign?'Inscrição confirmada':'Presença confirmada',e.sign?'Seu QR Code está em Mais › Inscrições.':e.t+', '+e.d+' de '+MONTHS[e.m-1]+' às '+e.h+'.');else toast('info',e.sign?'Inscrição cancelada':'Presença cancelada','Você pode confirmar de novo quando quiser.');softRender();},
 addCal:()=>toast('success','Adicionado à agenda','O evento está no calendário do seu celular.'),
 shareEv:()=>toast('info','Link copiado','Cole no WhatsApp ou nas redes para convidar alguém.'),
 /* agenda */
 pickDay:v=>{S.ag.sel=+v;S.ag.tab='Eventos';$$('#calGrid .day.sel').forEach(d=>{d.classList.remove('sel');d.removeAttribute('aria-pressed');});const b=$(`#calGrid [data-v="${v}"]`);b.classList.add('sel');b.setAttribute('aria-pressed','true');$$('.utabs button').forEach(x=>x.setAttribute('aria-selected',x.dataset.v==='Eventos'));const body=$('#agBody');body.innerHTML=agendaTab();body.classList.remove('swap');void body.offsetWidth;body.classList.add('swap');const isNow=S.ag.y===TODAY.y&&S.ag.m===TODAY.m&&S.ag.sel===TODAY.d;const nav=$('.mnav'),mt=$('.mtoday');nav.classList.toggle('has-today',!isNow);if(isNow){mt.setAttribute('tabindex','-1');mt.setAttribute('aria-hidden','true');}else{mt.removeAttribute('tabindex');mt.removeAttribute('aria-hidden');}},
 month:v=>{let m=S.ag.m+(+v),y=S.ag.y;if(m<1){m=12;y--;}if(m>12){m=1;y++;}if(y*100+m<202609){toast('error','Sem histórico','A agenda mostra de setembro de 2026 em diante.');return;}S.ag.m=m;S.ag.y=y;S.ag.sel=(y===TODAY.y&&m===TODAY.m)?TODAY.d:1;monthSwap(+v>0?'next':'prev');},
 goToday:()=>{const dir=(S.ag.y*100+S.ag.m)>(TODAY.y*100+TODAY.m)?'prev':'next';const same=S.ag.y===TODAY.y&&S.ag.m===TODAY.m;S.ag.y=TODAY.y;S.ag.m=TODAY.m;S.ag.sel=TODAY.d;S.ag.tab='Eventos';monthSwap(same?null:dir);},
 esSub:v=>{S.ag.esub=v;$('#agBody').innerHTML=agendaTab();},
 agTab:v=>{S.ag.tab=v;$$('.utabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));$('#agBody').innerHTML=agendaTab();},
 limPref:()=>{let v=S.lim.pref||Math.min(2,S.lim.church);const u=limUse(2026,10);const paint=sh=>{$('#lpV',sh).textContent=v;$('#lpM',sh).disabled=v<=1;$('#lpP',sh).classList.toggle('dim',v>=S.lim.church);$('#lpP',sh).setAttribute('aria-disabled',v>=S.lim.church);$('#lpW',sh).hidden=!(v<u.tot);$('#lpH',sh).textContent=v>=S.lim.church?'Esse é o limite da igreja. Para servir mais, fale com seu líder.':v===1?'Uma vez por mês.':'Até '+v+' vezes por mês.';};
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Quantas vezes você quer servir por mês?</h3><p class="callout">Os líderes veem sua preferência ao montar a escala. O limite da igreja é ${S.lim.church} por mês, somando todos os ministérios.</p></div>
   <div class="lim-step"><button type="button" class="lim-sb" id="lpM" aria-label="Menos">${ic('minus',20,2.4)}</button><div class="stack" style="align-items:center;gap:4px"><b id="lpV">${v}</b><span class="it-sub">por mês</span></div><button type="button" class="lim-sb" id="lpP" aria-label="Mais">${ic('plus',20,2.4)}</button></div>
   <p class="callout" id="lpH" style="text-align:center;margin-top:-8px"></p>
   <div class="lim-note soft" id="lpW" hidden>${ic('info',16,2.2)}<div><b>Você já tem ${u.tot} escalas em outubro</b><span>Elas continuam. A preferência vale para os próximos convites.</span></div></div>
   <div class="stack g3"><button type="button" class="btn primary block" id="lpGo">Salvar preferência</button>${S.lim.pref?'<button type="button" class="tlink" id="lpClr">Remover preferência</button>':'<button type="button" class="tlink" data-a="closeSheet">Agora não</button>'}</div></div>`,sh=>{
   paint(sh);$('#lpM',sh).addEventListener('click',()=>{if(v>1){v--;paint(sh);}});$('#lpP',sh).addEventListener('click',()=>{if(v<S.lim.church){v++;paint(sh);}else toast('info','Esse é o limite da igreja','Para servir mais vezes, fale com o líder do seu ministério.');});
   $('#lpGo',sh).addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Salvo');S.lim.pref=v;await closeSheet();$('#agBody').innerHTML=agendaTab();toast('success','Preferência salva','Até '+v+(v===1?' vez':' vezes')+' por mês. Os líderes veem isso ao te escalar.');});
   const c=$('#lpClr',sh);if(c)c.addEventListener('click',async()=>{S.lim.pref=null;await closeSheet();$('#agBody').innerHTML=agendaTab();toast('info','Preferência removida','Vale só o limite da igreja: '+S.lim.church+' por mês.');});});},
 escalaOk:async(v,el)=>{const x=S.escalas.find(e=>e.id===v);const k=K(x.y,x.m,x.d);if(blockedAt(k)){toast('error','Essa data está bloqueada','Remova o bloqueio em Escalas › Disponibilidade para confirmar.');return;}await busy(el,600,null,'Confirmado');x.st='confirmado';$('#agBody').innerHTML=agendaTab();const u=limUse(x.y,x.m);toast('success','Escala confirmada',x.over?'Obrigado por topar! Essa foi uma exceção ao seu limite de '+MONTHS[x.m-1]+'.':u.reg>=u.lim&&u.pend===0?x.min+' · '+fmtK(k)+'. Você fechou seu mês: '+u.reg+' de '+u.lim+'.':x.min+' · '+fmtK(k)+' · '+x.h+'.');},
 escalaNo:v=>refuseSheet('escala',v),
 discOk:async(v,el)=>{const x=S.discs.find(e=>e.id===v);await busy(el,600,null,'Aceito');x.st='aceito';$('#agBody').innerHTML=agendaTab();toast('success','Encontro aceito',x.who.split(' ')[0]+' recebeu sua confirmação.');},
 discNo:v=>refuseSheet('disc',v),
 openMap:()=>toast('info','Abrindo o mapa','No app real, abre o endereço no Maps.'),
 joinCall:()=>toast('info','Abrindo a chamada','No app real, o link da reunião abre aqui.'),
 newBlock:()=>blockSheet(),
 goPending:()=>{S.ag.tab=S.escalas.some(x=>x.st==='pendente')?'Escalas':'Discipulado';A.tab('agenda');setTimeout(()=>{const s=$('#scr');if(s)s.scrollTo({top:420,behavior:'smooth'})},80);},
 rmBlock:v=>{const i=S.blocks.findIndex(b=>b.id===v);const b=S.blocks[i];S.blocks.splice(i,1);softRender();toast('info','Bloqueio removido',fmtK(b.a)+(b.a!==b.b?' a '+fmtK(b.b):'')+' voltou a ficar livre.');},
 /* grupos */
 grTab:v=>{S.gr.tab=v;softRender();},
 clearQ:()=>{S.gr.q='';softRender();},
 group:v=>groupSheet(v),mini:v=>miniSheet(v),
 joinGroup:async(v,el)=>{const c=CASAS.find(x=>x.id===v);await busy(el,800,null,S.joined[v]?'Cancelado':(CASAS.find(x=>x.id===v).open?'Pedido enviado':'Na lista'));S.joined[v]=!S.joined[v];await closeSheet();
  if(!S.joined[v])toast('info','Pedido cancelado','');else if(c.open)toast('success','Pedido enviado',c.leader+' vai falar com você pelo WhatsApp.');else toast('info','Você está na lista de espera','Avisamos quando abrir uma vaga na '+c.t+'.');
  if(S.screen==='grupos')$('#casas').innerHTML=casasList();},
 talkLeader:async(v,el)=>{const [k,id]=v.split('|');const who=k==='g'?((CASAS.find(x=>x.id===id)||{}).leader||'o líder'):((MINIS.find(x=>x.id===id)||{}).lead||'o líder');await busy(el,900,null,'Mensagem enviada');toast('success','Pedido enviado',who.split(/ e |,/)[0]+' vai receber seu contato. Em breve definimos o próximo passo.');},
 serve:async(v,el)=>{const m=MINIS.find(x=>x.id===v);const was=!!S.serving[v];await busy(el,800,null,was?'Cancelado':'Enviado');S.serving[v]=!was;const box=$('#serveBox');
  if(box){box.style.height=box.offsetHeight+'px';box.classList.add('svout');await wait(180);box.innerHTML=serveBox(m,!was,was?'Interesse cancelado. Você pode voltar quando quiser.':'');box.classList.remove('svout');box.style.height=box.scrollHeight+'px';box.classList.add('svin');setTimeout(()=>{box.style.height='';box.classList.remove('svin');},420);}
  if(S.screen==='grupos'){const sc=$('#scr');const t=sc.scrollTop;const ov=$('#overlay').innerHTML;render('none');$('#scr').scrollTop=t;}},
 /* cursos */
 cuTab:v=>{S.cu.tab=v;softRender();},
 startCourse:async(v,el)=>{await busy(el,600,null,'Adicionado');COURSES[v].started=true;S.cu.tab='andamento';toast('success','Curso adicionado',COURSES[v].t+' está em Em andamento.');softRender();},
 openCourse:v=>{S.cu.open=v;S.cu.view=null;S.cu.playing=false;if(S.screen==='curso')softRender();else go('curso');},
 play:()=>{S.cu.playing=!S.cu.playing;const b=$('.pbtn');b.innerHTML=ic(S.cu.playing?'pause':'play',28,2.5);b.setAttribute('aria-label',S.cu.playing?'Pausar':'Assistir');if(S.cu.playing)startPlay();else clearInterval(playTimer);},
 completeLesson:async(v,el)=>{const c=COURSES[S.cu.open];await busy(el,700,null,'Concluída');c.done=Math.min(c.done+1,c.lessons.length);S.cu.view=null;S.cu.playing=false;
  if(c.done===c.lessons.length)toast('success','Curso concluído','Parabéns! Seu certificado já está disponível.');else toast('success','Aula '+c.done+' concluída','Próxima: '+c.lessons[c.done]+'.');softRender();$('#scr').scrollTo({top:0,behavior:'smooth'});},
 lesson:v=>{const c=COURSES[S.cu.open];const i=+v;if(i>c.done){toast('error','Aula bloqueada','Conclua a aula '+(c.done+1)+' para liberar esta.');return;}S.cu.view=(i===c.done)?null:i;S.cu.playing=false;softRender();$('#scr').scrollTo({top:0,behavior:'smooth'});},
 resumeLesson:()=>{S.cu.view=null;softRender();$('#scr').scrollTo({top:0,behavior:'smooth'});},
 cert:()=>toast('success','Certificado gerado','No app real, o PDF abre para salvar ou imprimir.'),
 shareCourse:()=>toast('info','Link copiado','Conte para alguém que você concluiu o curso.'),
 /* mais */
 soon:v=>soon(v),notif:()=>notifSheet(),
 notifSw:(v,el)=>{S.notif[v]=!S.notif[v];el.setAttribute('aria-checked',S.notif[v]);flashSaved();},
 nch:(v,el)=>{const on=!S.nch[v];if(!on&&Object.values(S.nch).filter(Boolean).length===1){toast('error','Escolha pelo menos um canal','Senão você não recebe nenhum aviso.');return;}S.nch[v]=on;el.setAttribute('aria-pressed',on);flashSaved();},
 quietSw:(v,el)=>{S.quiet=!S.quiet;el.setAttribute('aria-checked',S.quiet);flashSaved();},
 inscr:()=>inscrSheet(),
 secretaria:()=>toast('info','Secretaria','Seg a sex, 9h às 18h · (11) 3333-4444'),
 switchChurch:()=>churchSheet(),
 setChurch:async v=>{if(S.church.id===v){closeSheet();return;}S.church=CHURCHES.find(c=>c.id===v);await closeSheet();overlayLoading('Trocando para '+S.church.name+'…');await wait(900);$('#overlay').innerHTML='';S.hist=[];S.screen='home';render();},
 admin:()=>S.role==='admin'?toast('info','Abrindo painel admin','O painel web abre no navegador.'):toast('error','Acesso restrito','O painel é só para administradores. Troque o perfil na escolha de igreja (demo).'),
 logout:()=>logoutSheet(),
 doLogout:async()=>{await closeSheet();S.hist=[];S.church=null;S.screen='welcome';render('back');toast('info','Você saiu da conta','Até logo!');}
};
function flashSaved(){const s=$('#nSaved');if(!s)return;s.innerHTML=ic('check',14,2.75)+'Salvo';s.classList.remove('on');void s.offsetWidth;s.classList.add('on');}
/* ---------- form submits ---------- */
const F={
 async login(f){const e=val('lEmail'),p=$('#lPass').value;let ok=true;
  if(!e){setErr('lEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('lEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}
  if(!p){setErr('lPass','Informe sua senha.');ok=false;}
  if(!ok)return;const btn=$('button[type=submit]',f);await busy(btn,1100);
  if(p.toLowerCase()==='errada'){setErr('lPass','E-mail ou senha incorretos');toast('error','E-mail ou senha incorretos','Tente de novo ou entre com código por e-mail.');return;}
  S.email=e;const u=USERS[e.toLowerCase()];if(u){S.user={first:u.first,name:u.name};S.role=u.role;}else{S.user={first:'Rafael',name:'Rafael Pereira'};S.role='membro';}
  go('church');},
 async sendCode(f){const e=val('cEmail');if(!e){setErr('cEmail','Informe seu e-mail.');return;}if(!EMAIL_RE.test(e)){setErr('cEmail','Digite um e-mail válido, como nome@email.com.');return;}
  await busy($('button[type=submit]',f),1000);S.email=e;S.otpCtx='login';S.su.att=5;S.su.expAt=Date.now()+15*60000;const u=USERS[e.toLowerCase()];if(u){S.user={first:u.first,name:u.name};S.role=u.role;}
  toast('success','Código enviado','Confira a caixa de entrada de '+e+'.');go('otp');},
 async doLookup(f){const ph=S.lookupMode==='phone';const id=ph?'lkPhone':'lkEmail';const v=val(id);$('#lkRes').innerHTML='';
  if(!v){setErr(id,ph?'Digite seu telefone com DDD.':'Digite seu e-mail.');return;}
  if(ph&&v.replace(/\D/g,'').length<10){setErr(id,'Número incompleto. Use DDD + número.');return;}
  if(!ph&&!EMAIL_RE.test(v)){setErr(id,'Esse e-mail parece incompleto. Ex.: nome@email.com');return;}
  await busy($('button[type=submit]',f),1300);
  if(ph)S.phone=v;else S.su.email=v;if(ph&&!S.su.email)S.su.email='rafael.pereira@hotmail.com';
  S.su.sel=0;const sc=S.scn;
  if(sc==='notfound'){$('#lkRes').innerHTML=notFoundPanel();return;}
  if(sc==='multi'){go('pickRecord');return;}
  if(sc==='noemail'&&ph){go('noEmail');return;}
  go('confirmEmail');},
 async createAccount(f){let ok=true;const n=val('sNome'),s=val('sSobre'),e=val('sEmail'),p=$('#sPass').value,t=mobileTermsAccepted();
  if(!n){setErr('sNome','Informe seu nome.');ok=false;}
  if(!s){setErr('sSobre','Informe seu sobrenome.');ok=false;}
  if(!e){setErr('sEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('sEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}else if(e.toLowerCase()==='teste@example.org'&&!(S.prefill&&S.prefill.found)){setErr('sEmail','Este e-mail já tem conta. Volte e entre com ele.');ok=false;}
  if(!p){setErr('sPass','Crie uma senha.');ok=false;}else if(p.length<8||!/[a-z]/i.test(p)||!/\d/.test(p)){setErr('sPass','Use 8 caracteres ou mais, com letras e números.');ok=false;}
  if(!t){setErr('sTerms','Aceite os termos para continuar.');ok=false;}
  if(!ok){toast('error','Revise os campos destacados','');return;}
  await busy($('button[type=submit]',f),1300,null,'Conta criada');S.user={first:n,name:n+' '+s};S.email=e;S.role='membro';toast('success','Conta criada','Bem-vindo ao Alva, '+n+'!');go('church');},
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

/* ---------- rail ---------- */
const RAIL=[['welcome','Boas-vindas'],['terms','Aceitar novos termos'],['login','Entrar com senha'],['loginBlocked','Bloqueio (demo)'],['resetPassword','Nova senha'],['resetDone','Senha redefinida'],['codeEmail','Entrar com código'],['otp','Digite o código'],['signupStart','Já tem cadastro?'],['lookup','Identificação'],['pickRecord','Qual cadastro é o seu?'],['confirmEmail','Confirmar e-mail'],['noEmail','Cadastro sem e-mail'],['identity','Identidade confirmada'],['signupForm','Criar conta'],['church','Escolher igreja'],['home','Início'],['agenda','Agenda'],['grupos','Grupos'],['cursos','Cursos'],['curso','Aula do curso'],['cursoDone','Curso concluído'],['mais','Mais']];
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
const SIGN=['lookup','pickRecord','confirmEmail','noEmail','identity'];
$('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const s=b.dataset.s;$('#overlay').innerHTML='';
 if(APP.includes(s)||s==='cursoDone')ensureChurch();
 if(!S.su.email)S.su.email='rafael.pereira@hotmail.com';
 if(s==='otp'){S.otpCtx='login';S.email=S.email||'rafael.pereira@hotmail.com';S.su.att=5;S.su.expAt=Date.now()+15*60000;}
 if(s==='signupForm')S.prefill=null;
 if(s==='curso'){S.cu.open='fund';S.cu.view=null;if(COURSES.fund.done===12)COURSES.fund.done=9;}
 if(s==='cursoDone'){COURSES.fund.done=12;S.cu.open='fund';S.cu.view=null;S.hist=['cursos'];S.screen='curso';render();return;}
 S.hist=APP.includes(s)?(s==='curso'?['cursos']:SUBS.includes(s)?['mais']:[]):s==='welcome'?[]:SIGN.includes(s)?['welcome','signupStart']:['welcome'];S.screen=s;render();});
$('#scnSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.scn=b.dataset.v;$$('#scnSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('#demoUsers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.email=b.dataset.v;S.hist=['welcome'];S.screen='login';$('#overlay').innerHTML='';render();setTimeout(()=>{const p=$('#lPass');if(p)p.value='alva2026';},0);toast('info','Perfil de demonstração','Toque em Entrar para continuar.');});
$('#roleSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.role=b.dataset.v;setTimeout(roleApply,0);$$('#roleSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));const t=$('#roleTag');if(t){const r=ROLES[S.role];t.textContent=r[0];t.setAttribute('style',tone(r[1]));}});
function roleSync(){$$('#roleSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===S.role));}
function railSync(){roleSync();const cur=S.screen==='curso'&&COURSES[S.cu.open].done===COURSES[S.cu.open].lessons.length&&S.cu.open==='fund'&&S.cu.view==null?'cursoDone':S.screen;$$('#railNav button').forEach(b=>b.setAttribute('aria-current',b.dataset.s===cur));}
$('#modeSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;phone.classList.remove('m-aurora','m-float');if(b.dataset.m)phone.classList.add(b.dataset.m);$$('#modeSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('#themeSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.theme=b.dataset.t;phone.classList.toggle('dia',S.theme==='dia');$$('#themeSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));try{localStorage.setItem('alva-theme',S.theme)}catch(_){}});
try{const t=localStorage.getItem('alva-theme');if(t==='dia'){S.theme='dia';phone.classList.add('dia');$$('#themeSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t==='dia'));}}catch(_){}

/* =========================================================
   MAIS › sub-telas
   ========================================================= */
const SUBS=['meusDados','notifs','quemSomos','cuidado','contribuir','inscricoes','aoVivo','meusMin','oracao','secretaria','assistente','privacidade'];
APP.push(...SUBS);
const brl=n=>'R$ '+Number(n).toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');
Object.assign(S,{
 me:{nome:'Rafael Pereira',email:'rafael@alvaigreja.com.br',tel:'(11) 99123-4455',nasc:'',end:'',upd:'12/03/2026',gen:'Masculino',civil:'Casado(a)',
  cep:'',rua:'',num:'',comp:'',bairro:'',cid:'',uf:'',
  since:'2019',integ:'Integrado',bap:'12/05/2019',conv:'Mais de 5 anos',casa:'Casa Jardins',casaLead:'Gabriela Nunes',disc:'Gabriel Souza',
  fam:[{id:'f1',n:'Camila Pereira',rel:'Esposa',g:'sp',app:true,tone:'rosado'},{id:'f2',n:'Lucas Pereira',rel:'Filho',g:'kid',age:'3 anos',kids:true,tone:'ambar'},{id:'f3',n:'Helena Pereira',rel:'Filha',g:'kid',age:'7 meses',kids:true,tone:'lima'},{id:'f4',n:'Antônio Pereira',rel:'Pai',g:'par',app:false,tone:'salvia'},{id:'f5',n:'Marta Pereira',rel:'Mãe',g:'par',app:true,tone:'menta'}],
  hist:[['Cadastro criado','pelo app','12/03/2019'],['Integração aceita','por Pr. Rafael Pereira','02/04/2019'],['Batismo','Culto de Celebração','12/05/2019'],['Integrado(a) à comunidade','por Pr. Rafael Pereira','26/05/2019'],['Entrou na Casa Jardins','com Gabriela Nunes','08/09/2019'],['Começou a servir no Louvor','Vocal','03/2021'],['Família vinculada','Camila, Lucas e Helena','14/05/2023']]},meEdit:false,meTab:'dados',
 notifs:[{id:'n0',t:'Convite acima do seu limite: Louvor · Vocal',s:'Dom, 25 out. Você já tem 3 escalas em outubro. Tudo bem recusar.',when:'Hoje · 09h05',grp:'Hoje',tone:'vinho',i:'alert',go:'escalas',unread:true},{id:'n1',t:'Você tem uma nova escala: Infantil · Monitor',s:'Dom, 18 out · 9h. Confirme até sexta.',when:'Hoje · 08h12',grp:'Hoje',tone:'lima',i:'calendar',go:'escalas',unread:true},
  {id:'n2',t:'Inscrições abertas: Conferência Anual 2026',s:'18 a 20 de outubro · gratuito',when:'Hoje · 07h30',grp:'Hoje',tone:'brasa',i:'ticket',go:'inscricoes',unread:true},
  {id:'n3b',t:'Você chegou ao limite de escalas de outubro',s:'3 de 3. Novos convites só chegam como exceção, com aviso.',when:'Hoje · 08h12',grp:'Hoje',tone:'damasco',i:'calendar',go:'escalas',unread:false},
  {id:'n3',t:'Sua escala de domingo foi confirmada',s:'Louvor · Vocal · Dom, 4 out',when:'Sex, 25 set · 09h20',grp:'Esta semana',tone:'laranja',i:'check',go:'escalas',unread:false},
  {id:'n4',t:'Seu pedido de oração foi respondido',s:'Pr. Marcos Lima orou por você',when:'Qua, 23 set · 08h16',grp:'Esta semana',tone:'vinho',i:'hands',go:'oracao',unread:false},
  {id:'n5',t:'Feliz aniversário! A Alva ora por você hoje.',s:'Que seu novo ano seja cheio da graça de Deus.',when:'12 set',grp:'Anteriores',tone:'damasco',i:'sparkle',go:null,unread:true}],
 care:{urg:'Normal',next:{who:'Pr. Marcos Lima',when:'Qui, 8 out · 19h',remote:true,st:'pendente'},list:[{t:'Conversa sobre pressão no trabalho',d:'10/09/2026',who:'Pr. Marcos Lima',st:'urgente'},{t:'Aconselhamento familiar',d:'02/08/2026',who:'Diac. Ana Costa',st:'andamento'}]},
 give:{dest:'livre',amt:null,method:'Pix',hist:[]},
 camps:[{id:'livre',t:'Contribuição livre',s:'Dízimos e ofertas para a obra'},{id:'retiro',t:'Retiro de Jovens 2026',s:'Ajude a levar 60 jovens ao retiro',got:8420,goal:15000},{id:'reforma',t:'Reforma do Templo',s:'Nova acústica e acessibilidade',got:34200,goal:80000}],
 insc:{open:[{id:'i1',t:'Conferência Anual 2026',when:'18 a 20 out',price:0,left:180,g:'brasa'},{id:'i2',t:'Conferência de Missões',when:'Sáb, 7 nov',price:60,left:42,g:'mar'},{id:'i3',t:'Retiro de Jovens 2026',when:'14 a 16 nov',price:120,left:12,g:'lima'}],mine:[]},
 prayers:[{id:'p1',t:'Pela recuperação da minha mãe depois da cirurgia.',d:'15/09/2026',st:'orado',by:'Pr. Marcos Lima',at:'16/09 às 08h15'},{id:'p2',t:'Por sabedoria numa decisão importante no trabalho.',d:'10/09/2026',st:'aguardando'}],
 minOpen:'louvor',chat:[],priv:{aniv:true,lista:true,fotos:false}
});
const MYMIN=[{id:'louvor',t:'Louvor',tone:'laranja',i:'music',role:'Vocal',next:'Dom, 4 out · 18h30',leader:'Davi Melo',since:'2021'},{id:'recep',t:'Recepção e Acolhimento',tone:'rosado',i:'door',role:'Recepcionista',next:'Dom, 11 out · 17h30',leader:'Juliana Reis',since:'2023'},{id:'kids',t:'Infantil',tone:'ambar',i:'baby',role:'Monitor',next:'Dom, 18 out · 9h',leader:'Carla Reis',since:'2025'}];
const VIDEOS=[{id:'v1',t:'Culto de Celebração',s:'Transmitindo agora',live:true,g:'vinho',n:'1,2 mil assistindo'},{id:'v2',t:'Culto de Domingo · 27/09',s:'Gravado · há 2 dias',g:'aurora',dur:'1:42:10'},{id:'v3',t:'Noite de Oração',s:'Gravado · há 1 semana',g:'mar',dur:'58:20'},{id:'v4',t:'Conferência de Jovens · Sessão 1',s:'Gravado · há 2 semanas',g:'lima',dur:'1:15:03'}];
const BOT={
 'Qual a agenda da igreja?':'Esta semana:\nQua, 30 set · 19h30 · Casa Jardins\nQui, 1 out · 20h · Treinamento de Líderes\nSáb, 3 out · 19h30 · Culto de Jovens\nDom, 4 out · 18h30 · Culto de Celebração',
 'Qual a minha agenda?':'Você tem:\nDom, 4 out · Louvor (Vocal), confirmado\nDom, 11 out · Recepção, aguardando sua resposta',
 'Criar bloqueio':'Claro. Que datas você quer bloquear? Ex.: "de 10 a 12 de outubro".',
 'Quero contribuir':'Aqui está o Pix da Alva Sede: pix@alvaigreja.com.br. Se preferir cartão, toque em Contribuir no app.'
};

const subHead=(title,lede,right)=>`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button>${right||''}</div><h1 class="big" style="margin-top:18px">${title}</h1>${lede?`<p class="lede">${lede}</p>`:''}</header>`;
const sub=(title,lede,body,right)=>({sb:'var(--ink)',tabs:'mais',html:`${subHead(title,lede,right)}<div class="pad stack g6" style="padding-top:8px">${body}</div>`});

/* 1. Meus dados */
const ME_ADDR=m=>[m.rua&&(m.rua+(m.num?', '+m.num:'')),m.comp,m.bairro,m.cid&&(m.cid+(m.uf?' - '+m.uf:''))].filter(Boolean).join(' · ');
const ME_MISS=m=>[['nasc','Data de nascimento'],['rua','Endereço'],['cep','CEP']].filter(x=>!m[x[0]]);
const FAMG=[['par','Pais'],['me','Você'],['kid','Filhos'],['oth','Outros familiares']];
/* valor longo ou com detalhe vai para baixo do rótulo, alinhado à esquerda */
function meRow(l,v,ph,sub){const st=sub||String(v||'').length>24;return `<div class="kr${st?' kr-st':''}"><span>${l}</span><span${v?'':' class="kr-none"'}>${v?esc(v):(ph||'Não informado')}${v&&sub?`<small>${esc(sub)}</small>`:''}</span></div>`;}
function meDados(m,member){const miss=ME_MISS(m);
 return `${miss.length?`<div class="panel" style="animation:none"><div class="ph"><span class="bang">!</span><div><b>Faltam ${miss.length} ${miss.length>1?'dados':'dado'}</b><p>${miss.map(x=>x[1].toLowerCase().replace('cep','CEP')).join(', ').replace(/, ([^,]*)$/,' e $1').replace(/^./,c=>c.toUpperCase())}. Com aniversário e endereço, sua Casa consegue te visitar e celebrar com você.</p></div></div><button class="btn primary md block" data-a="meEdit">Completar agora</button></div>`:''}
  <div class="kv"><div class="kh"><span>Pessoais</span><span>você edita</span></div>${meRow('Nome completo',m.nome)}${meRow('E-mail',m.email)}${meRow('Telefone',m.tel)}${meRow('Nascimento',m.nasc)}${meRow('Gênero',m.gen)}${meRow('Estado civil',m.civil)}</div>
  <div class="kv"><div class="kh"><span>Endereço</span><span>você edita</span></div>${meRow('Rua e número',m.rua&&(m.rua+(m.num?', '+m.num:'')))}${meRow('Complemento',m.comp,'—')}${meRow('Bairro',m.bairro)}${meRow('Cidade',m.cid&&(m.cid+(m.uf?' - '+m.uf:'')))}${meRow('CEP',m.cep)}</div>
  <div class="kv"><div class="kh"><span>Na igreja</span><span>definido pela secretaria</span></div>${meRow('Igreja',S.church.name)}${meRow('Perfil',ROLES[S.role][0])}${member?meRow('Membro desde',m.since)+meRow('Integração',m.integ)+meRow('Batismo',m.bap)+meRow('Tempo de conversão',m.conv)+meRow('Casa de Apascentamento',m.casa,'',m.casaLead?'Liderada por '+m.casaLead:'')+meRow('Discipulado',m.disc,'',m.disc?'Seu discipulador':'')+meRow('Ministérios',MYMIN.length?MYMIN.length+(MYMIN.length>1?' ministérios':' ministério'):'','',MYMIN.map(x=>x.t).join(' · ')):''}</div>
  <button class="btn primary block" data-a="meEdit">Editar meus dados</button>
  ${member?`<button class="tlink" data-a="go" data-v="secretaria">Algo errado em “Na igreja”? Fale com a secretaria</button>`:''}`;}
function famNode(p,me){const app=me?'':p.kids?'<span class="fn-tag kid">Kids</span>':p.pend?'<span class="fn-tag wait">Aguardando secretaria</span>':p.app?'<span class="fn-tag on">No app</span>':'<span class="fn-tag">Sem o app</span>';
 return `<button class="fnode ${me?'me':''}" ${me?'disabled':`data-a="famOpen" data-v="${p.id}"`}><span class="avatar" style="${tone(p.tone||'ceu')}">${initials(me?p.nome:p.n)}</span><span class="grow stack" style="gap:3px;min-width:0"><span class="fn-n">${esc(me?p.nome:p.n)}</span><span class="fn-r">${me?'Você':esc(p.rel)+(p.age?' · '+esc(p.age):'')}</span></span>${app}${me?'':`<span class="chev">${ic('chevR',18,2)}</span>`}</button>`;}
function meFamilia(m){const by=g=>m.fam.filter(p=>p.g===g),sp=by('sp');
 const grp=(lbl,inner)=>`<section class="fgen"><p class="eb2">${lbl}</p><div class="fgen-l">${inner}</div></section>`;
 const blocks=[by('par').length?grp('Pais',by('par').map(p=>famNode(p)).join('')):'',grp(sp.length?'Você e '+(sp[0].rel==='Esposa'?'sua esposa':sp[0].rel==='Marido'?'seu marido':'seu cônjuge'):'Você',famNode(m,true)+sp.map(p=>famNode(p)).join('')),by('kid').length?grp('Filhos',by('kid').map(p=>famNode(p)).join('')):'',by('oth').length?grp('Outros familiares',by('oth').map(p=>famNode(p)).join('')):''].filter(Boolean);
 const n=m.fam.length+1,gens=(by('par').length?1:0)+1+(by('kid').length?1:0),inApp=1+m.fam.filter(p=>p.app).length;
 return `<div class="fstats"><div><b>${n}</b><span>pessoas</span></div><div><b>${gens}</b><span>${gens>1?'gerações':'geração'}</span></div><div><b>${inApp}</b><span>no app</span></div></div>
  <div class="ftree">${blocks.join('<i class="fline" aria-hidden="true"></i>')}</div>
  <button class="btn outline block" data-a="famAdd">${ic('userplus',18,2)}Vincular familiar</button>
  <p class="foot" style="margin:0;text-align:center">A secretaria confere cada vínculo antes de ele aparecer para a liderança.</p>`;}
function meCaminhada(m){const steps=[['Cadastro',1,'2019'],['Integração aceita',1,'abr 2019'],['Batismo',1,'mai 2019'],['Integrado(a)',1,'mai 2019'],['Casa de Apascentamento',!!m.casa,'set 2019'],['Serve em um ministério',MYMIN.length>0,'2021']];
 return `<section class="stack g3"><p class="eb2">Sua caminhada</p><ol class="walk2">${steps.map(x=>`<li class="${x[1]?'done':''}"><span class="w-d">${x[1]?ic('check',14,2.6):''}</span><span class="grow">${x[0]}</span><span class="w-t">${x[1]?x[2]:'próximo passo'}</span></li>`).join('')}</ol></section>
  <section class="stack g3"><div class="row between"><p class="eb2">Onde você serve</p><button class="link" data-a="go" data-v="meusMin">Ver tudo</button></div><div class="list">${MYMIN.map(x=>`<button class="item" data-a="go" data-v="meusMin"><span class="iconbox" style="${tone(x.tone)}">${ic(x.i,20)}</span><span class="grow stack" style="gap:2px"><span class="it-title">${x.t}</span><span class="it-sub">${x.role} · desde ${x.since}</span></span><span class="chev">${ic('chevR',18,2)}</span></button>`).join('')}</div></section>
  <section class="stack g3"><p class="eb2">Histórico</p><ol class="mhist">${m.hist.slice().reverse().map(h=>`<li><span class="mh-d">${h[2]}</span><span class="stack" style="gap:2px"><b>${esc(h[0])}</b><span>${esc(h[1])}</span></span></li>`).join('')}</ol></section>`;}
V.meusDados=()=>{const m=S.me,member=S.role!=='visitante';
 if(!S.meEdit){const t=member?(S.meTab||'dados'):'dados';
  return sub('Meus dados','',`
  <div class="mhead"><span class="avatar lg" style="${tone('ceu')}">${initials(m.nome)}</span><div class="stack" style="gap:6px;min-width:0"><span class="t3">${esc(m.nome)}</span><span class="foot">${member?`Membro desde ${m.since} · ${esc(S.church.name)}`:`Visitante · ${esc(S.church.name)}`}</span>${member?ST2('ok',m.integ):''}</div></div>
  ${member?`<div class="seg" role="tablist">${[['dados','Dados'],['familia','Família'],['caminhada','Caminhada']].map(z=>`<button role="tab" aria-selected="${t===z[0]}" data-a="meTab" data-v="${z[0]}">${z[1]}</button>`).join('')}</div>`:''}
  ${t==='familia'?meFamilia(m):t==='caminhada'?meCaminhada(m):meDados(m,member)}
  <p class="foot" style="margin:0;text-align:center">Atualizado em ${m.upd}. Só a liderança da sua igreja vê esses dados.</p>`);}
 const opt=(id,label,opts,v)=>`<div class="stack g2" id="f-${id}"><span class="eb2">${label}</span><div class="chips2" role="radiogroup" aria-label="${label}">${opts.map(o=>`<button type="button" class="chip" role="radio" aria-pressed="${v===o}" aria-checked="${v===o}" data-a="meOpt" data-v="${id}|${o}">${o}</button>`).join('')}</div><input type="hidden" id="${id}" value="${esc(v||'')}"></div>`;
 return sub('Editar dados','Seus dados ficam visíveis só para a liderança da sua igreja.',`<form class="stack g6" data-submit="saveMe" novalidate>
  <section class="stack g4"><p class="eb2">Pessoais</p>
  ${field({id:'mNome',label:'Nome completo',val:m.nome,ac:'name'})}
  ${field({id:'mEmail',label:'E-mail',type:'email',val:m.email,im:'email'})}
  ${field({id:'mTel',label:'Telefone',type:'tel',val:m.tel,im:'tel',max:15})}
  ${field({id:'mNasc',label:'Data de nascimento',val:m.nasc,ph:'dd/mm/aaaa',im:'numeric',max:10})}
  ${opt('mGen','Gênero',['Feminino','Masculino'],m.gen)}
  ${opt('mCivil','Estado civil',['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)'],m.civil)}</section>
  <section class="stack g4"><p class="eb2">Endereço</p>
  ${field({id:'mCep',label:'CEP',val:m.cep,ph:'00000-000',im:'numeric',max:9,hint:'Preenchemos rua, bairro e cidade a partir do CEP.'})}
  ${field({id:'mRua',label:'Rua',val:m.rua,ac:'address-line1'})}
  <div class="frow">${field({id:'mNum',label:'Número',val:m.num,im:'numeric',max:8})}${field({id:'mComp',label:'Complemento',val:m.comp,ph:'Opcional'})}</div>
  ${field({id:'mBairro',label:'Bairro',val:m.bairro})}
  <div class="frow r">${field({id:'mCid',label:'Cidade',val:m.cid})}${field({id:'mUf',label:'UF',val:m.uf,max:2})}</div></section>
  <div class="stack g3"><button class="btn primary block" type="submit">Salvar alterações</button><button type="button" class="tlink" data-a="meCancel">Cancelar</button></div></form>`);};

/* 2. Notificações */
V.notifs=()=>{const n=S.notifs.filter(x=>x.unread).length;const grps=['Hoje','Esta semana','Anteriores'];
 return {sb:'var(--ink)',tabs:'mais',html:`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button><button class="iconbtn" data-a="notif" aria-label="Preferências de notificação">${ic('sliders',19,1.9)}</button></div><h1 class="big" style="margin-top:18px">Notificações</h1>
  <div class="row between" style="margin-top:8px;min-height:28px"><span class="lede" style="margin:0">${n?`<b style="color:var(--ink)">${n}</b> ${n>1?'novas':'nova'}`:'Tudo em dia'}</span>${n?`<button class="link" data-a="readAll">Marcar como lidas</button>`:''}</div></header>
 <div class="pad stack g6" style="padding-top:4px">
  ${grps.map(g=>{const l=S.notifs.filter(x=>x.grp===g);return l.length?`<section class="stack"><p class="eb2" style="margin-bottom:4px">${g}</p><div class="chlist">${l.map(x=>`<button class="nrow ${x.unread?'unread':''}" data-a="openNotif" data-v="${x.id}"><span class="ndot" aria-hidden="true"></span><span class="grow stack" style="gap:3px"><span class="row between" style="gap:12px;align-items:baseline"><span class="nt">${esc(x.t)}</span><span class="nwhen">${x.when.split(' · ').pop()}</span></span><span class="chm">${esc(x.s)}</span></span></button>`).join('')}</div></section>`:'';}).join('')}
 </div>`};};

/* redes da igreja: mesmo formato do Alva Web (t = tipo, n = nome exibido, h = perfil, u = link) */
const SOCIAL=[{t:'instagram',n:'Instagram',h:'@igrejaalva',u:'instagram.com/igrejaalva'},{t:'tiktok',n:'TikTok',h:'@igrejaalva',u:'tiktok.com/@igrejaalva'},{t:'facebook',n:'Facebook',h:'Igreja Alva',u:'facebook.com/igrejaalva'}];
/* 3. Quem somos */
V.quemSomos=()=>sub('Quem somos','',`
  <div class="qs-hero gr-aurora"><p>Um lugar para encontrar Deus, crescer em comunidade e ser enviado.</p></div>
  <div class="stack g4"><p class="body" style="color:var(--ink)">A Igreja Alva nasceu em 2012 com um propósito simples: ser um lugar onde pessoas encontram Deus, crescem em comunidade e são enviadas para transformar o mundo ao redor.</p><p class="body">Desde então, vimos centenas de vidas transformadas pelo Evangelho em São Paulo e região.</p></div>
  <div class="stats">${[['2012','fundação'],['1.240','membros na Sede'],['3','igrejas'],['48','Casas ativas']].map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
  <section class="stack g3"><p class="eb2">Nossos valores</p><ol class="steps"><li>Presença de Deus</li><li>Comunidade autêntica</li><li>Discipulado intencional</li><li>Missão local e global</li></ol></section>
  ${SOCIAL.length?`<section class="stack g3"><p class="eb2">Conecte-se</p><div class="socials">${SOCIAL.map(r=>`<a class="soc" href="https://${esc(r.u)}" target="_blank" rel="noopener" data-a="social" data-v="${esc(r.n)}"><span class="sn">${esc(r.n)}</span><span class="sh">${esc(r.h||r.u)}</span><span class="sa" aria-hidden="true">${ic('arrowR',16,2)}</span></a>`).join('')}</div></section>`:''}
  <section class="stack g3"><p class="eb2">Onde estamos</p><div class="list">${CHURCHES.map(c=>`<div class="item" style="cursor:default"><span class="iconbox" style="${tone(c.tone)};font:800 17px/1 var(--font-display)">A</span><span class="grow stack" style="gap:2px"><span class="it-title">${c.name}</span><span class="it-sub">${c.city} · cultos aos domingos</span></span></div>`).join('')}</div></section>`);

/* 4. Cuidado pastoral */
function careBody(inTab){const c=S.care,nx=c.next;return `${inTab===false?'':'<p class="callout" style="margin:0">Passando por um momento difícil ou precisa conversar com um pastor? Conte aqui: alguém da equipe pastoral entra em contato.</p>'}<div class="stack g6">
  <form class="stack g4" data-submit="sendCare" novalidate>
   ${field({id:'cText',label:'Como podemos te ajudar?',area:true,ph:'Conte o que está acontecendo',max:600,hint:'Só o pastor responsável lê.'})}
   <div class="stack g2"><span class="eb2">Urgência</span><div class="seg" id="urgSeg">${['Normal','Urgente'].map(u=>`<button type="button" aria-selected="${c.urg===u}" data-a="urg" data-v="${u}">${u}</button>`).join('')}</div>
   ${c.urg==='Urgente'?`<p class="foot" style="margin:4px 0 0">Respondemos pedidos urgentes no mesmo dia. Em risco imediato, ligue 188 (CVV) ou 192 (SAMU).</p>`:''}</div>
   <button class="btn primary block" type="submit">Solicitar atendimento</button>
  </form>
  ${nx?`<section class="stack g3"><p class="eb2">Meu próximo encontro</p><article class="ev-c es2 care1" style="--t:var(--tone-oceano)"><div class="es2-r"><span class="avatar" style="${tone('oceano')};width:44px;height:44px;font-size:14px">${initials(nx.who.replace(/^\w+\.\s/,''))}</span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-t">${nx.who}</span><span class="ev-m">${ic('clock',13,2)}${nx.when}<span class="ev-dot"></span>${ic(nx.remote?'monitor':'pin',13,2)}${nx.remote?'Remoto':'Presencial'}</span></span>
   ${nx.st==='aceito'?ST2('ok','Confirmado'):nx.st==='recusado'?ST2('mute','Recusado'):ST2('warn','Responda')}</div>
   ${nx.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="careOk">Aceitar</button><button class="btn ghost2 sm" data-a="careNo">Recusar</button></div>`:`<p class="es2-note">${nx.st==='aceito'?'O link da chamada aparece aqui 15 minutos antes.':'Avisamos o pastor. Ele vai propor outro horário.'}</p>`}</article></section>`:''}
  <section class="stack g3"><div class="row between"><p class="eb2">Meus atendimentos</p><span class="foot">urgentes primeiro</span></div>
   <div class="ev-list">${[...c.list].sort((a,b)=>(a.st==='urgente'?0:1)-(b.st==='urgente'?0:1)).map((x,i)=>{const k=x.st==='urgente'?['bad','Urgente','vinho','alert']:x.st==='novo'?['info','Recebido','ceu','mail']:['info','Em andamento','menta','care'];return `<div class="ev-c es2 care2" style="--t:var(--tone-${k[2]});--i:${i};cursor:default"><div class="es2-r"><span class="care-i">${ic(k[3],17,2)}</span><span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-t" style="font-size:15px">${esc(x.t)}</span><span class="ev-m">${x.d.slice(0,5)}<span class="ev-dot"></span><span class="ev-pl">${esc(x.who)}</span></span></span>${ST2(k[0],k[1])}</div></div>`;}).join('')}</div>
   <p class="foot" style="text-align:center;margin:2px 0 0">O histórico completo fica com a equipe pastoral.</p></section></div>`;}
V.cuidado=()=>sub('Acompanhamento','Passando por um momento difícil ou precisa conversar com um pastor? Conte um pouco aqui e alguém da equipe pastoral entra em contato.',careBody(false));

/* 5. Contribuir */
V.contribuir=()=>{const g=S.give;const amt=g.amt;return sub('Contribuir','',`
  <section class="stack g3"><p class="eb2">Para onde vai sua contribuição?</p><div class="stack g3" role="radiogroup">${S.camps.map(c=>`<button class="rec" role="radio" aria-checked="${g.dest===c.id}" data-a="giveDest" data-v="${c.id}"><span class="grow stack" style="gap:4px"><span class="it-title">${c.t}</span><span class="it-sub">${c.s}</span>${c.goal?`<span class="bar" style="margin-top:6px"><i style="width:${Math.round(c.got/c.goal*100)}%"></i></span><span class="foot" style="font-variant-numeric:tabular-nums">${brl(c.got)} de ${brl(c.goal)}</span>`:''}</span><span class="radio">${g.dest===c.id?ic('check',14,3):''}</span></button>`).join('')}</div></section>
  <section class="stack g3"><p class="eb2">Valor</p><div class="amt2">${[50,100,200].map(v=>`<button class="chip" aria-pressed="${amt===v&&!g.other}" data-a="giveAmt" data-v="${v}">R$ ${v}</button>`).join('')}<button class="chip" aria-pressed="${!!g.other}" data-a="giveAmt" data-v="outro">Outro valor</button></div>
   <div ${g.other?'':'hidden'} id="giveOther">${field({id:'gOther',label:'Quanto?',ph:'R$ 0,00',im:'decimal',val:g.other&&amt?brl(amt):''})}</div></section>
  <section class="stack g3"><p class="eb2">Como</p><div class="seg" id="payM">${['Pix','Cartão','Boleto'].map(m=>`<button type="button" aria-selected="${g.method===m}" data-a="giveMethod" data-v="${m}">${m}</button>`).join('')}</div></section>
  <button class="btn accent block ${amt?'split':''}" id="giveGo" data-a="giveGo" ${amt?'':'disabled'}>${amt?`<span>Contribuir</span><span class="meta">${brl(amt)}</span>`:'Escolha um valor acima'}</button>
  <section class="stack g3"><div class="row between"><p class="eb2">Minhas contribuições</p>${g.hist.length?`<button class="link" data-a="informe">Informe 2025</button>`:''}</div>
   ${g.hist.length?`<div class="list">${g.hist.map(h=>`<div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title" style="font-variant-numeric:tabular-nums">${brl(h.v)}</span><span class="it-sub">${h.dest} · ${h.m} · ${h.d}</span></span>${h.st==='ok'?status('success','Confirmada'):status('warning','Aguardando')}</div>`).join('')}</div>`:`<p class="callout" style="margin:0">Você ainda não fez nenhuma contribuição pelo app.</p>`}</section>`);};

/* 6. Inscrições */
V.inscricoes=()=>{const I_=S.insc;const mineIds=I_.mine.map(m=>m.id);return sub('Inscrições','',`
  <section class="stack g3"><p class="eb2">Eventos abertos</p>${I_.open.filter(e=>!mineIds.includes(e.id)).map(e=>`<article class="card" style="overflow:hidden"><div class="gr-${e.g}" style="height:10px"></div><div class="stack g3" style="padding:16px 18px 18px"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="t3">${e.t}</span><span class="it-sub">${e.when} · ${e.price?brl(e.price):'Gratuito'}</span></div>${e.left<20?status('warning',e.left+' vagas'):''}</div><button class="btn primary md block ${e.price?'split':''}" data-a="inscrever" data-v="${e.id}">${e.price?`<span>Inscrever-se</span><span class="meta">${brl(e.price)}</span>`:'Inscrever-se'}</button></div></article>`).join('')||'<p class="callout">Você já está inscrito em todos os eventos abertos.</p>'}
   <p class="foot" style="margin:0">Eventos pagos são processados pelo Asaas. A inscrição confirma quando o pagamento cai.</p></section>
  <section class="stack g3"><p class="eb2">Minhas inscrições</p>${I_.mine.length?`<div class="list">${I_.mine.map(m=>{const e=I_.open.find(x=>x.id===m.id);return `<div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">${e.t}</span><span class="it-sub">${e.when}${e.price?' · '+brl(e.price)+' via '+m.method:''}</span></span>${m.st==='ok'?`<button class="btn secondary sm" data-a="showQR" data-v="${m.id}">Ver QR Code</button>`:status('warning','Aguardando pagamento')}</div>`;}).join('')}</div>`:`<p class="callout" style="margin:0">Você ainda não tem inscrição em nenhum evento.</p>`}</section>`);};

/* 7. Ao vivo */
V.aoVivo=()=>{const live=VIDEOS[0];return sub('Ao vivo','',`
  <button class="livecard gr-${live.g}" data-a="watch" data-v="${live.id}"><span class="livebadge"><i></i>Ao vivo</span><span class="stack" style="gap:4px"><b>${live.t}</b><span>${live.n}</span></span><span class="lplay" aria-hidden="true">${ic('play',26,2.5)}</span></button>
  <section class="stack g3"><p class="eb2">Cultos gravados</p><div class="list">${VIDEOS.slice(1).map(v=>`<button class="item" data-a="watch" data-v="${v.id}"><span class="thumb gr-${v.g}">${ic('play',16,2.5)}</span><span class="grow stack" style="gap:2px"><span class="it-title">${v.t}</span><span class="it-sub">${v.s} · ${v.dur}</span></span></button>`).join('')}</div></section>`);};

/* 8. Meus ministérios */
V.meusMin=()=>sub('Meus ministérios','',`
  <div class="stack g3">${MYMIN.map(m=>{const o=S.minOpen===m.id;return `<article class="card acc ${o?'open':''}"><button class="acc-h" data-a="minToggle" data-v="${m.id}" aria-expanded="${o}"><span class="iconbox" style="${tone(m.tone)}">${ic(m.i,22)}</span><span class="grow stack" style="gap:2px"><span class="it-title">${m.t}</span><span class="it-sub">${m.role} · próxima escala ${m.next.split(' · ')[0]}</span></span><span class="chev acc-c">${ic('chevR',18,2)}</span></button>
   ${o?`<div class="acc-b"><div class="kv" style="box-shadow:none;background:transparent"><div class="kr"><span>Meu papel</span><span>${m.role}</span></div><div class="kr"><span>Próxima escala</span><span>${m.next}</span></div><div class="kr"><span>Líder</span><span>${m.leader}</span></div><div class="kr"><span>Servindo desde</span><span>${m.since}</span></div></div><button class="btn primary md block" data-a="minAgenda">Ver na agenda</button></div>`:''}</article>`;}).join('')}</div>
  <button class="tlink" data-a="ministerios">Quero servir em outro ministério</button>`);

/* 9. Pedidos de oração */
V.oracao=()=>sub('Pedidos de oração','A equipe de intercessão ora por cada pedido durante a semana.',`
  <form class="stack g4" data-submit="sendPrayer" novalidate>
   ${field({id:'prText',label:'Seu pedido',area:true,ph:'Pelo que podemos orar?',max:500,hint:'0/500'})}
   <div class="list"><div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">Manter anônimo</span><span class="it-sub">Outros membros não veem seu nome</span></span><button type="button" class="switch" role="switch" aria-checked="false" id="prAnon" aria-label="Manter anônimo" data-a="sw"></button></div><div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">Compartilhar com minha Casa</span><span class="it-sub">Casa Jardins ora junto</span></span><button type="button" class="switch" role="switch" aria-checked="true" aria-label="Compartilhar com minha Casa" data-a="sw"></button></div></div>
   <button class="btn primary block" type="submit">Enviar pedido</button>
  </form>
  <section class="stack g3"><p class="eb2">Meus pedidos</p><div class="list">${S.prayers.map(p=>`<div class="item" style="cursor:default;align-items:flex-start;padding-block:14px;flex-direction:column;gap:6px"><span class="it-title" style="font-weight:500">${esc(p.t)}</span><span class="row between" style="width:100%;gap:8px"><span class="foot">${p.d}${p.anon?' · anônimo':''}</span>${p.st==='orado'?status('success','Orado'):p.st==='respondido'?status('info','Respondido'):status('warning','Aguardando')}</span>${p.st==='orado'?`<span class="foot">${p.by} orou por você em ${p.at}.</span><button class="link" data-a="answered" data-v="${p.id}" style="font-size:14px">Deus respondeu? Conte pra gente</button>`:''}</div>`).join('')}</div></section>`);

/* 10. Secretaria */
V.secretaria=()=>sub('Fale com a secretaria','Atendimento de segunda a sexta, das 9h às 18h.',`
  <button class="btn primary block" data-a="whatsSec">Chamar no WhatsApp</button>
  <div class="kv">${[['Telefone','(11) 99123-4455'],['E-mail','secretaria@alvaigreja.com.br']].map(r=>`<div class="kr" style="align-items:center"><span class="stack" style="gap:2px"><span class="foot">${r[0]}</span><span style="color:var(--ink);font-weight:600">${r[1]}</span></span><button class="btn outline sm" data-a="copy" data-v="${r[1]}">Copiar</button></div>`).join('')}
   <div class="kr stack2"><span>Endereço</span><span>Rua das Acácias, 500 · Jardins<br><span style="font-weight:400;color:var(--ink-muted)">São Paulo, SP</span></span></div></div>
  <section class="stack g3"><p class="eb2">Pedidos mais comuns</p><div class="list">${['Declaração de membro','Agendar batismo ou casamento','Atualizar cadastro da família','Segunda via de recibo'].map(t=>`<button class="item" data-a="secReq" data-v="${t}"><span class="grow it-title" style="font-weight:500">${t}</span><span class="chev">${ic('chevR',18,2)}</span></button>`).join('')}</div></section>`);

/* 11. Assistente */
V.assistente=()=>sub('Assistente no WhatsApp','Um jeito rápido de resolver algumas coisas sem abrir o app. Funciona para um conjunto pequeno de perguntas, não para tudo.',`
  <div class="chat" id="chat">${(S.chat.length?S.chat:[['me','Qual a agenda da igreja?'],['bot',BOT['Qual a agenda da igreja?']]]).map(m=>`<div class="bub ${m[0]}">${esc(m[1]).replace(/\n/g,'<br>')}</div>`).join('')}</div>
  <section class="stack g3"><p class="eb2">Toque para testar</p><div class="row g2" style="flex-wrap:wrap">${Object.keys(BOT).map(q=>`<button class="chip" data-a="ask" data-v="${q}">${q}</button>`).join('')}</div></section>
  <button class="btn primary block" data-a="whats2">Abrir no WhatsApp</button>
  <p class="foot" style="margin:0;text-align:center">Protótipo ilustrativo: as respostas acima são simuladas.</p>`);

/* 12. Privacidade */
V.privacidade=()=>sub('Privacidade e dados','Você controla o que a igreja vê e guarda sobre você (LGPD).',`
  <section class="stack g3"><p class="eb2">Visibilidade</p><div class="list">${[['aniv','Mostrar meu aniversário','Para sua Casa e ministérios'],['lista','Aparecer na lista de membros','Outros membros podem te encontrar'],['fotos','Usar minha foto em divulgação','Fotos de eventos nas redes da igreja']].map(r=>`<div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">${r[1]}</span><span class="it-sub">${r[2]}</span></span><button type="button" class="switch" role="switch" aria-checked="${S.priv[r[0]]}" aria-label="${r[1]}" data-a="privSw" data-v="${r[0]}"></button></div>`).join('')}</div></section>
  <section class="stack g3"><p class="eb2">Seus dados</p><div class="list">
   <button class="item" data-a="dlData"><span class="grow stack" style="gap:2px"><span class="it-title">Baixar meus dados</span><span class="it-sub">Prepare e baixe uma cópia dos seus dados</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
   <button class="item" data-a="policy"><span class="grow stack" style="gap:2px"><span class="it-title">Política de privacidade</span><span class="it-sub">Atualizada em março de 2026</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
   <button class="item" data-a="delAcc"><span class="grow stack" style="gap:2px"><span class="it-title" style="color:var(--danger-text)">Excluir minha conta</span><span class="it-sub">Apaga seu acesso e seus dados pessoais</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
  </div></section>`);

/* ---------- helpers ---------- */
function qrSVG(seed){let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;const rnd=()=>{h^=h<<13;h>>>=0;h^=h>>>17;h^=h<<5;h>>>=0;return h/4294967296;};const N=25;let r='';
 const fin=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="#010f12"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#010f12"/>`;
 const inF=(x,y)=>(x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16);
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(inF(x,y))continue;if(rnd()<.5)r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#010f12"/>`;}
 return `<svg viewBox="-2 -2 29 29" width="220" height="220" shape-rendering="crispEdges" role="img" aria-label="QR Code da inscrição"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/>${r}${fin(0,0)}${fin(18,0)}${fin(0,18)}</svg>`;}
async function copyText(t){try{await navigator.clipboard.writeText(t);toast('success','Copiado',t);}catch(_){toast('info','Não deu para copiar',t);}}
function playerSheet(v){sheet(`<div class="stack g4"><div class="player gr-${v.g}" id="player"><span class="ttl">${v.t}</span>${v.live?'<span class="livebadge" style="position:absolute;right:14px;top:14px"><i></i>Ao vivo</span>':''}<button class="pbtn" data-a="play" aria-label="Assistir">${ic('play',28,2.5)}</button><div class="pbar"><span id="pt">0:00</span><div class="bar"><i id="pp" style="width:0"></i></div><span>${v.live?'ao vivo':v.dur}</span></div></div>
 <div class="stack g2"><h3 class="t2">${v.t}</h3><p class="callout" style="margin:0">${v.live?v.n:v.s}</p></div><div class="row g2"><button class="btn secondary md grow" data-a="shareEv">Compartilhar</button><button class="btn secondary md grow" data-a="notesSoon">Anotações</button></div></div>`);}

/* ---------- actions ---------- */
Object.assign(A,{
 wantMember:async(v,el)=>{if(el)await busy(el,600,null,'Enviado');toast('success','Que alegria!','A secretaria vai te chamar para a integração. Enquanto isso, que tal visitar uma Casa?');},
 sub:v=>{ensureChurch();if(v==='cuidado'&&S.role!=='visitante'){S.ag.tab='Acompanhamento';A.tab('agenda');return;}go(v);},
 give:()=>{ensureChurch();go('contribuir');},prayer:()=>{ensureChurch();go('oracao');},whats:()=>go('assistente'),
 mood:(v,el)=>{S.mood=S.mood===v?null:v;$$('#moods .moodt').forEach(c=>c.setAttribute('aria-checked',c.dataset.v===S.mood));const a=$('#moodAfter');a.innerHTML=moodAfter();a.classList.remove('swap');void a.offsetWidth;a.classList.add('swap');},
 inscr:()=>go('inscricoes'),
 meEdit:()=>{S.meEdit=true;softRender();},meCancel:()=>{S.meEdit=false;softRender();},
  meTab:v=>{S.meTab=v;softRender();},
  meOpt:(v,el)=>{const [id,o]=v.split('|');$('#'+id).value=o;$$('button',el.parentElement).forEach(b=>{const on=b===el;b.setAttribute('aria-pressed',on);b.setAttribute('aria-checked',on);});},
  famOpen:v=>{const p=S.me.fam.find(x=>x.id===v);if(!p)return;sheet(`<div class="stack g5"><div class="row g4"><span class="avatar lg" style="${tone(p.tone||'ceu')}">${initials(p.n)}</span><div class="stack" style="gap:4px"><h3 class="t2">${esc(p.n)}</h3><span class="foot">${esc(p.rel)}${p.age?' · '+esc(p.age):''}</span></div></div>
   <div class="kv">${meRow('Parentesco',p.rel)}${meRow('No app',p.kids?'Pelo seu cadastro (Kids)':p.pend?'Aguardando a secretaria':p.app?'Sim, tem conta própria':'Ainda não')}${p.kids?meRow('Check-in Kids','Você é responsável'):''}</div>
   ${!p.app&&!p.kids&&!p.pend?`<button class="btn primary block" data-a="famInvite" data-v="${p.id}">Convidar para o app</button>`:''}
   <button class="btn outline block" data-a="famDel" data-v="${p.id}">Pedir remoção do vínculo</button></div>`);},
  famInvite:async(v,el)=>{await busy(el,800,null,'Convite enviado');closeSheet();toast('success','Convite enviado',S.me.fam.find(x=>x.id===v).n.split(' ')[0]+' recebe um link para baixar o app.');},
  famDel:v=>{const p=S.me.fam.find(x=>x.id===v);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Remover ${esc(p.n.split(' ')[0])} da sua família?</h3><p class="body">O pedido vai para a secretaria. Até ela confirmar, o vínculo continua aparecendo para a liderança.</p></div><div class="stack g3"><button class="btn dangerfill block" data-a="famDelOk" data-v="${p.id}">Pedir remoção</button><button class="btn outline block" data-a="closeSheet">Manter vínculo</button></div></div>`);},
  famDelOk:async(v,el)=>{await busy(el,700,null,'Pedido enviado');const p=S.me.fam.find(x=>x.id===v);S.me.fam=S.me.fam.filter(x=>x.id!==v);closeSheet();softRender();toast('success','Pedido enviado','A secretaria vai confirmar a remoção de '+p.n.split(' ')[0]+'.');},
  famAdd:()=>{sheet(`<form class="stack g5" data-submit="famReq" novalidate><div class="stack g2"><h3 class="t2">Vincular familiar</h3><p class="body">A secretaria confere e confirma o vínculo. Se a pessoa já tem cadastro na igreja, a gente encontra pelo nome.</p></div>
   ${field({id:'fNome',label:'Nome completo',ac:'off'})}
   <div class="stack g2" id="f-fRel"><span class="eb2">Parentesco</span><div class="chips2" role="radiogroup" aria-label="Parentesco">${['Cônjuge','Filho(a)','Pai','Mãe','Irmão(ã)','Outro'].map((o,i)=>`<button type="button" class="chip" role="radio" aria-pressed="${!i}" aria-checked="${!i}" data-a="meOpt" data-v="fRel|${o}">${o}</button>`).join('')}</div><input type="hidden" id="fRel" value="Cônjuge"></div>
   ${field({id:'fNasc',label:'Data de nascimento',ph:'dd/mm/aaaa',im:'numeric',max:10,hint:'Para filhos, libera o check-in no Kids.'})}
   <div class="stack g3"><button class="btn primary block" type="submit">Enviar para a secretaria</button><button type="button" class="tlink" data-a="closeSheet">Cancelar</button></div></form>`);},

 readAll:()=>{S.notifs.forEach(n=>n.unread=false);softRender();toast('success','Tudo lido','');},
 openNotif:v=>{const n=S.notifs.find(x=>x.id===v);n.unread=false;if(n.go==='escalas'){S.ag.tab='Escalas';A.tab('agenda');}else if(n.go){go(n.go);}else softRender();},
 urg:v=>{S.care.urg=v;const t=$('#cText');const keep=t?t.value:'';softRender();$('#cText').value=keep;},
 careOk:async(v,el)=>{await busy(el,600,null,'Confirmado');S.care.next.st='aceito';softRender();toast('success','Encontro confirmado',S.care.next.who+' recebeu sua confirmação.');},
 careNo:()=>{S.care.next.st='recusado';softRender();toast('info','Encontro recusado','O pastor vai propor outro horário.');},
 giveDest:v=>{S.give.dest=v;softRender();},
 giveAmt:v=>{if(v==='outro'){S.give.other=true;S.give.amt=null;softRender();setTimeout(()=>$('#gOther').focus(),50);}else{S.give.other=false;S.give.amt=+v;softRender();}},
 giveMethod:v=>{S.give.method=v;$$('#payM button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));},
 giveGo:async(v,el)=>{const g=S.give;if(g.other&&(!g.amt||g.amt<1)){setErr('gOther','Informe um valor a partir de R$ 1,00.');return;}if(g.amt>5000){setErr('gOther','Acima de R$ 5.000, fale com a tesouraria.');return;}
  await busy(el,900,null,S.give.method==='Cartão'?'Confirmado':'Gerado');const dest=S.camps.find(c=>c.id===g.dest).t;const rec={v:g.amt,dest,m:g.method,d:'29/09/2026',st:g.method==='Cartão'?'ok':'wait'};
  if(g.method==='Cartão'){g.hist.unshift(rec);const c=S.camps.find(c=>c.id===g.dest);if(c.goal)c.got+=g.amt;g.amt=null;g.other=false;softRender();toast('success','Contribuição confirmada',brl(rec.v)+' para '+dest+'. Obrigado!');return;}
  const code='00020126580014BR.GOV.BCB.PIX0136alva-'+Math.round(g.amt*100)+'-sede5204000053039865802BR';
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${g.method==='Pix'?'Pix gerado':'Boleto gerado'}</h3><p class="callout">${brl(rec.v)} para ${dest}. ${g.method==='Pix'?'Válido por 30 minutos.':'Vence em 3 dias úteis.'}</p></div>
   <div class="copybox"><span class="mask" style="font-size:12px;word-break:break-all">${g.method==='Pix'?code:'23793.38128 60000.000003 00000.000400 1 99990000'+Math.round(g.amt*100)}</span></div>
   <button class="btn secondary block" data-a="copy" data-v="${g.method==='Pix'?code:'boleto'}">Copiar código</button><button class="btn primary block" data-a="paid">Já paguei</button></div>`);
  S._pending=rec;},
 paid:async(v,el)=>{await busy(el,1200,null,'Recebido');const g=S.give,rec=S._pending;rec.st='ok';g.hist.unshift(rec);const c=S.camps.find(c=>c.t===rec.dest);if(c&&c.goal)c.got+=rec.v;g.amt=null;g.other=false;await closeSheet();softRender();toast('success','Pagamento recebido',brl(rec.v)+' para '+rec.dest+'. Obrigado!');},
 informe:()=>toast('success','Informe de contribuições 2025','Enviamos o PDF para '+S.me.email+'.'),
 copy:v=>copyText(v),
 inscrever:async(v,el)=>{const e=S.insc.open.find(x=>x.id===v);if(!e.price){await busy(el,700,null,'Inscrito');S.insc.mine.push({id:v,st:'ok',method:'-'});softRender();toast('success','Inscrição confirmada','Seu QR Code está em Minhas inscrições.');return;}
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${e.t}</h3><p class="callout">${e.when} · ${brl(e.price)}</p></div><div class="stack g2"><span class="eb2">Pagamento</span><div class="seg" id="iPay">${['Pix','Cartão'].map((m,i)=>`<button type="button" aria-selected="${!i}" data-v="${m}">${m}</button>`).join('')}</div></div><p class="foot" style="margin:0">Processado pelo Asaas. Sua vaga fica reservada por 30 minutos.</p><button class="btn primary block split" id="iGo"><span>Pagar</span><span class="meta">${brl(e.price)}</span></button></div>`);
  let m='Pix';$('#iPay').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;m=b.dataset.v;$$('#iPay button').forEach(x=>x.setAttribute('aria-selected',x===b));});
  $('#iGo').addEventListener('click',async ev=>{await busy(ev.currentTarget,900,null,'Reservado');const rec={id:v,st:'wait',method:m};S.insc.mine.push(rec);await closeSheet();softRender();toast('info','Aguardando pagamento','Assim que o '+m+' cair, sua inscrição confirma.');
   setTimeout(()=>{rec.st='ok';if(S.screen==='inscricoes')softRender();toast('success','Pagamento confirmado','Inscrição em '+e.t+' garantida.');},3500);});},
 showQR:v=>{const e=S.insc.open.find(x=>x.id===v);sheet(`<div class="stack g5" style="align-items:center;text-align:center"><div class="stack g2"><h3 class="t2">${e.t}</h3><p class="callout" style="margin:0">${e.when} · ${esc(S.user.name)}</p></div><div class="qr">${qrSVG(v+S.user.name)}</div><p class="mask" style="margin:0">ALVA-${v.toUpperCase()}-${initials(S.user.name)}0929</p><p class="foot" style="margin:0">Mostre este código na entrada. Funciona sem internet.</p></div>`);},
 watch:v=>playerSheet(VIDEOS.find(x=>x.id===v)),
 notesSoon:()=>toast('info','Anotações','Em breve você poderá anotar durante a pregação.'),
 minToggle:v=>{S.minOpen=S.minOpen===v?null:v;softRender();},
 minAgenda:()=>{S.ag.tab='Escalas';A.tab('agenda');},
 answered:(v)=>{const p=S.prayers.find(x=>x.id===v);p.st='respondido';softRender();toast('success','Que alegria!','Vamos agradecer junto com você no próximo culto.');},
 social:v=>toast('info','Abrindo '+v,'No app real, abre o perfil da igreja no '+v+'.'),
 whatsSec:()=>toast('info','Abrindo o WhatsApp','Conversa com a secretaria da '+S.church.name+'.'),
 secReq:v=>toast('success','Pedido enviado',v+'. A secretaria responde em até 2 dias úteis.'),
 ask:async v=>{const box=$('#chat');if(!S.chat.length)S.chat=[['me','Qual a agenda da igreja?'],['bot',BOT['Qual a agenda da igreja?']]];S.chat.push(['me',v]);box.insertAdjacentHTML('beforeend',`<div class="bub me">${esc(v)}</div><div class="bub bot typing"><i></i><i></i><i></i></div>`);box.scrollTop=box.scrollHeight;
  await wait(1100);S.chat.push(['bot',BOT[v]]);const t=$('.typing',box);if(t){t.classList.remove('typing');t.innerHTML=esc(BOT[v]).replace(/\n/g,'<br>');}box.scrollTop=box.scrollHeight;},
 whats2:()=>toast('info','Abrindo o WhatsApp','No app real, a conversa com o assistente abre aqui.'),
 privSw:(v,el)=>{S.priv[v]=!S.priv[v];el.setAttribute('aria-checked',S.priv[v]);toast('success','Preferência salva','');},
 dlData:()=>sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Baixar meus dados</h3><p class="body">Juntamos cadastro, inscrições, contribuições e participação em grupos num arquivo e enviamos para <b style="color:var(--ink)">${esc(S.me.email)}</b> em até 48 horas.</p></div><button class="btn primary block" data-a="dlGo">Solicitar arquivo</button><button class="tlink" data-a="closeSheet">Agora não</button></div>`),
 dlGo:async(v,el)=>{await busy(el,900,null,'Solicitado');await closeSheet();toast('success','Pedido registrado','O arquivo chega por e-mail em até 48 horas.');},
 policy:()=>sheet(`<div class="stack g4"><h3 class="t2">Política de privacidade</h3>${[['O que coletamos','Nome, contato, data de nascimento, endereço e sua participação em eventos, grupos e contribuições.'],['Para que usamos','Para cuidar de você: organizar escalas, Casas, cursos e o acompanhamento pastoral. Não vendemos nem compartilhamos seus dados com terceiros.'],['Quem vê','A secretaria e os líderes diretamente ligados a você. Pedidos de oração anônimos não mostram seu nome.'],['Seus direitos','Pela LGPD você pode acessar, corrigir, baixar ou pedir a exclusão dos seus dados a qualquer momento.']].map(s=>`<div class="stack" style="gap:4px"><b style="font:700 16px/22px var(--font-text)">${s[0]}</b><p class="callout" style="margin:0">${s[1]}</p></div>`).join('')}</div>`),
 delAcc:()=>{sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2" style="color:var(--danger-text)">Excluir conta</h3><p class="body">Isso apaga seu acesso ao app e seus dados pessoais. Contribuições ficam registradas de forma anônima, por exigência fiscal. Não dá para desfazer.</p></div>${field({id:'delTxt',label:'Digite EXCLUIR para confirmar',ph:'EXCLUIR'})}<button class="btn dangerfill block" id="delGo">Solicitar exclusão</button><button class="tlink" data-a="closeSheet">Manter minha conta</button></div>`);
  $('#delGo').addEventListener('click',async ev=>{if(val('delTxt').toUpperCase()!=='EXCLUIR'){setErr('delTxt','Digite EXCLUIR, em letras maiúsculas.');return;}await busy(ev.currentTarget,1000,null,'Solicitado');await closeSheet();toast('info','Pedido de exclusão registrado','A secretaria confirma por e-mail em até 15 dias.');});}
});
Object.assign(F,{
 async saveMe(f){let ok=true;const n=val('mNome'),e=val('mEmail'),t=val('mTel'),d=val('mNasc'),cep=val('mCep'),uf=val('mUf').toUpperCase();
  if(n.split(' ').filter(Boolean).length<2){setErr('mNome','Informe nome e sobrenome.');ok=false;}
  if(!EMAIL_RE.test(e)){setErr('mEmail','Esse e-mail parece incompleto. Ex.: nome@email.com');ok=false;}
  if(t.replace(/\D/g,'').length<10){setErr('mTel','Use DDD + número.');ok=false;}
  if(d){const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);const dt=m&&new Date(+m[3],+m[2]-1,+m[1]);if(!m||dt.getDate()!==+m[1]||dt>new Date(2026,8,29)||+m[3]<1900){setErr('mNasc','Data inválida. Use dd/mm/aaaa.');ok=false;}}
  if(cep&&cep.replace(/\D/g,'').length!==8){setErr('mCep','O CEP tem 8 números.');ok=false;}
  if(uf&&!/^[A-Z]{2}$/.test(uf)){setErr('mUf','Use a sigla, ex.: SP');ok=false;}
  if(!ok){const x=$('.field.invalid');x&&x.scrollIntoView({block:'center',behavior:'smooth'});return;}
  await busy($('button[type=submit]',f),900,null,'Salvo');Object.assign(S.me,{nome:n,email:e,tel:t,nasc:d,gen:val('mGen'),civil:val('mCivil'),cep,rua:val('mRua'),num:val('mNum'),comp:val('mComp'),bairro:val('mBairro'),cid:val('mCid'),uf,upd:'29/09/2026'});S.me.end=ME_ADDR(S.me);S.user={first:n.split(' ')[0],name:n};S.meEdit=false;softRender();toast('success','Dados atualizados','');},
 async famReq(f){const n=val('fNome'),r=val('fRel'),d=val('fNasc');let ok=true;
  if(n.split(' ').filter(Boolean).length<2){setErr('fNome','Informe nome e sobrenome.');ok=false;}
  if(d){const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);const dt=m&&new Date(+m[3],+m[2]-1,+m[1]);if(!m||dt.getDate()!==+m[1]||dt>new Date(2026,8,29)){setErr('fNasc','Data inválida. Use dd/mm/aaaa.');ok=false;}}
  if(!ok)return;await busy($('button[type=submit]',f),900,null,'Enviado');const g=r==='Cônjuge'?'sp':r==='Filho(a)'?'kid':r==='Pai'||r==='Mãe'?'par':'oth';
  S.me.fam.push({id:'f'+Date.now(),n,rel:r,g,pend:true,tone:['ceu','menta','damasco','lima','salvia'][S.me.fam.length%5]});closeSheet();S.meTab='familia';softRender();toast('success','Pedido enviado','A secretaria confirma o vínculo com '+n.split(' ')[0]+'.');},
 async sendCare(f){const t=val('cText');if(t.length<10){setErr('cText',t?'Conte um pouco mais para o pastor entender.':'Escreva como podemos te ajudar.');return;}
  await busy($('button[type=submit]',f),1000,null,'Enviado');S.care.list.unshift({t:t.length>48?t.slice(0,46)+'…':t,d:'29/09/2026',who:'Equipe pastoral',st:S.care.urg==='Urgente'?'urgente':'novo'});S.care.urg='Normal';softRender();toast('success','Pedido enviado',S.care.list[0].st==='urgente'?'Um pastor fala com você ainda hoje.':'Um pastor entra em contato em até 3 dias.');},
 async sendPrayer(f){const t=val('prText');if(!t){setErr('prText','Escreva seu pedido para enviarmos à equipe.');return;}if(t.length<10){setErr('prText','Conte um pouco mais para a equipe saber como orar.');return;}
  const anon=$('#prAnon').getAttribute('aria-checked')==='true';await busy($('button[type=submit]',f),900,null,'Enviado');S.prayers.unshift({id:'p'+Date.now(),t,d:'29/09/2026',st:'aguardando',anon});softRender();toast('success','Pedido enviado','Nossa equipe de intercessão vai orar por você.');}
});
/* masks + counters on sub-screens */
phone.addEventListener('input',e=>{const t=e.target;
 if(t.id==='mTel')t.value=maskPhone(t.value);
 if(t.id==='mNasc'){const d=t.value.replace(/\D/g,'').slice(0,8);t.value=d.length>4?d.slice(0,2)+'/'+d.slice(2,4)+'/'+d.slice(4):d.length>2?d.slice(0,2)+'/'+d.slice(2):d;}
 if(t.id==='gOther'){const d=t.value.replace(/\D/g,'');const n=(+d||0)/100;t.value=d?brl(n):'';S.give.amt=n||null;const b=$('#giveGo');if(b){b.disabled=!n;b.classList.toggle('split',!!n);b.innerHTML=n?`<span>Contribuir</span><span class="meta">${brl(n)}</span>`:'Escolha um valor acima';}}
 if(t.id==='prText'||t.id==='cText'){const h=$('#f-'+t.id+' .hint');if(h&&t.id==='prText'){h.textContent=t.value.length+'/500';h.dataset.hint=h.textContent;}}
});
/* demo users preload */
const _login=F.login;F.login=async function(f){await _login(f);const e=(S.email||'').toLowerCase();
 if(e==='renan.ferreira@email.com'&&!S.insc.mine.length)S.insc.mine.push({id:'i1',st:'ok',method:'-'});
 if(e==='giovanna.martins@email.com'&&!S.give.hist.length)S.give.hist.push({v:350,dest:'Contribuição livre',m:'Pix',d:'05/09/2026',st:'ok'},{v:350,dest:'Contribuição livre',m:'Pix',d:'05/08/2026',st:'ok'},{v:120,dest:'Retiro de Jovens 2026',m:'Cartão',d:'20/07/2026',st:'ok'});
 if(S.user&&S.user.name)S.me.nome=S.user.name;};
RAIL.push(...[['meusDados','Mais › Meus dados'],['notifs','Mais › Notificações'],['quemSomos','Mais › Quem somos'],['cuidado','Agenda › Acompanhamento'],['contribuir','Mais › Contribuir'],['inscricoes','Mais › Inscrições'],['aoVivo','Mais › Ao vivo'],['meusMin','Mais › Meus ministérios'],['oracao','Mais › Pedidos de oração'],['secretaria','Mais › Secretaria'],['assistente','Mais › Assistente'],['privacidade','Mais › Privacidade']]);
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');

/* ---------- cenários por tipo de usuário ---------- */
function visitorCard(){return `<div class="pad" style="margin:-4px 0 22px"><div class="vcard gr-aurora"><p class="eb2" style="color:#fff;opacity:.85">Primeira vez por aqui?</p><p class="vtitle">Que bom ter você com a gente.</p><p style="margin:0;font:400 15px/20px var(--font-text);color:rgba(255,255,255,.88)">O melhor jeito de conhecer a Alva é numa Casa de Apascentamento perto de você.</p><div class="row g2" style="margin-top:6px"><button class="btn dark md" data-a="tab" data-v="grupos">Encontrar uma Casa</button><button class="btn onmedia md" data-a="sub" data-v="quemSomos">Quem somos</button></div></div></div>`;}
function roleApply(){if(S.role==='visitante'){S.ag.tab='Eventos';if(['cursos','curso','bebes','bebeNovo','meusMin','svcTeam','urgentes','contribuir'].includes(S.screen)){S.hist=[];S.screen='home';render('tab');return;}}if(APP.includes(S.screen))softRender();}
const SCN={
 visitante:()=>{S.user={first:'Lucas',name:'Lucas Almeida'};S.role='visitante';S.me.nome='Lucas Almeida';S.ag.tab='Eventos';return 'home';},
 membro:()=>{S.user={first:'Rafael',name:'Rafael Pereira'};S.role='membro';S.me.nome='Rafael Pereira';return 'home';}
};
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Cenários por tipo de usuário</span><div class="rail-nav" id="scnUsers"><button type="button" data-v="visitante">Visitante · primeiro acesso</button><button type="button" data-v="membro">Membro · agenda e escalas</button></div>`;
 sec.parentNode.insertBefore(box,sec);
 $('#scnUsers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.church=S.church||CHURCHES[0];const scr=SCN[b.dataset.v]();$('#overlay').innerHTML='';S.hist=[];S.screen=scr;render('tab');});
})();

/* ---------- Liderança › Casos urgentes ---------- */
APP.push('urgentes');SUBS.push('urgentes');
const URG=[{id:'u1',who:'Maria Santos',kind:'Hospital',tone:'vinho',d:'16/09/2026',txt:'Internada no Hospital São Paulo. Cirurgia programada para sexta.',resp:'Pr. Marcos Lima',upd:'Atualizado há 2 dias'},
 {id:'u2',who:'Pedro Almeida',kind:'Oração',tone:'ambar',d:'14/09/2026',txt:'Pediu oração pela família depois de perder o emprego. Casa Centro acompanhando.',resp:'Pr. Marcos Lima',upd:'Atualizado há 5 dias'},
 {id:'u3',who:'Joana Ribeiro',kind:'Visita',tone:'oceano',d:'12/09/2026',txt:'Mora sozinha e pediu visita depois da alta médica. Prefere as manhãs.',resp:'Diac. Ana Costa',upd:'Atualizado há 1 semana'}];
S.urgOpen='u1';
V.urgentes=()=>({sb:'var(--ink)',tabs:'mais',html:`${subHead('Acompanhamentos','Casos que você acompanha, urgentes primeiro. Para editar, agendar ou encerrar, use o painel web.')}
 <div class="pad stack g5" style="padding-top:8px">
  <div class="chlist">${URG.map(u=>{const o=S.urgOpen===u.id;return `<div class="urg ${o?'open':''}"><button class="urg-h" data-a="urgToggle" data-v="${u.id}" aria-expanded="${o}"><span class="chdot" style="background:${MK[u.tone]||'var(--ink-muted)'}"></span><span class="grow stack" style="gap:2px"><span class="chn" style="font-size:22px;line-height:26px">${u.who}</span><span class="chm">${u.kind} · ${u.d}</span></span><span class="chev acc-c">${ic('chevR',18,2)}</span></button>
   ${o?`<div class="urg-b"><p class="body" style="color:var(--ink);margin:0">${esc(u.txt)}</p><div class="stack" style="gap:2px"><span class="chm">Responsável: <b style="color:var(--ink)">${u.resp}</b></span><span class="foot">${u.upd}</span></div><button class="btn outline md" style="align-self:flex-start" data-a="admin">Abrir no painel</button></div>`:''}</div>`;}).join('')}</div>
  <p class="foot" style="margin:0;text-align:center">Só líderes e administradores veem esta lista.</p>
 </div>`});
A.urgToggle=v=>{S.urgOpen=S.urgOpen===v?null:v;softRender();};
RAIL.push(['urgentes','Liderança › Acompanhamentos']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
$('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.dataset.s==='urgentes'&&!['lider','admin'].includes(S.role)){S.role='lider';}},true);


/* ================= Escala › presença no dia (check-in com localização) ================= */
S.escalas.unshift({id:'s0',min:'Louvor',area:'Ministério de Louvor',fn:'Vocal',y:2026,m:9,d:29,h:'20h',st:'confirmado',what:'Ensaio do Louvor',place:'Templo principal'});
S.svc={now:18*60+40,geo:'perto',perm:null,leader:'Daniela Rocha',
 team:[{n:'Rafael Pereira',fn:'Vocal',me:true},{n:'Elisa Moura',fn:'Vocal',ck:{at:'18h22',dist:12}},{n:'Diego Faria',fn:'Bateria',ck:{at:'18h31',dist:85}},{n:'Igor Santana',fn:'Baixo'},{n:'Clara Nunes',fn:'Teclado',ck:{at:'18h05',dist:30},pr:'ok'}]};
const SVC_R=150,SVC_GEO={perto:{dist:40,acc:12},longe:{dist:2300,acc:20},fraco:{dist:90,acc:600},negado:null};
const svcHM=m=>`${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`.replace('h00','h');
const svcEsc=()=>S.escalas.find(x=>x.id==='s0');
const svcWin=()=>{const st=20*60;return {open:st-120,start:st,close:st+120};};
const svcPhase=()=>{const w=svcWin(),n=S.svc.now;return n<w.open?'antes':n>w.close?'fim':'aberto';};
const svcMe=()=>S.svc.team.find(p=>p.me);
const svcOf=p=>p.pr==='ok'?'ok':p.pr==='falta'?'falta':p.ck?'ck':'pend';
const svcDist=d=>d>=1000?(d/1000).toFixed(1).replace('.',',')+' km':d+' m';
function svcStatus(){const x=svcEsc(),me=svcMe(),ph=svcPhase(),w=svcWin(),k=svcOf(me);
 if(!x||x.st==='recusado')return null;
 if(x.st==='pendente')return {k:'conf',t:'Confirme a escala para liberar o check-in',s:'O check-in abre às '+svcHM(w.open)+', 2h antes.',btn:['Confirmar escala','escalaOk','s0']};
 if(k==='ok')return {k:'ok',t:'Presença confirmada',s:me.manual?'Marcada por '+S.svc.leader.split(' ')[0]+' · '+me.why:'Check-in às '+me.ck.at+' · confirmado por '+S.svc.leader.split(' ')[0]};
 if(k==='falta')return {k:'falta',t:'Falta registrada',s:'Se você esteve lá, fale com '+S.svc.leader.split(' ')[0]+' para corrigir.',btn:['Falar com o líder','svcTalk','']};
 if(k==='ck')return {k:'ck',t:'Check-in feito às '+me.ck.at,s:'A '+svcDist(me.ck.dist)+' do local · aguardando '+S.svc.leader.split(' ')[0]+' confirmar'};
 if(ph==='antes')return {k:'antes',t:'Check-in abre às '+svcHM(w.open),s:'Faltam '+svcHM(w.open-S.svc.now).replace('h',' h ').replace(/ $/,'')+'. Você precisa estar no local.'};
 if(ph==='fim')return {k:'fim',t:'Check-in encerrado às '+svcHM(w.close),s:'Se você esteve lá, avise '+S.svc.leader.split(' ')[0]+': o líder pode marcar sua presença.',btn:['Avisar o líder','svcTalk','']};
 return {k:'aberto',t:'Check-in aberto até '+svcHM(w.close),s:'Funciona a até '+SVC_R+' m de '+x.place+'.',btn:['Fazer check-in','svcStart','']};}
function svcBox(compact){const st=svcStatus();if(!st)return '';const x=svcEsc();
 return `<div class="svc-box ${st.k}"><div class="row g3" style="align-items:center"><span class="svc-ic">${ic(st.k==='ok'?'check':st.k==='falta'?'x':st.k==='conf'?'alert':'pin',18,2.2)}</span><div class="grow stack" style="gap:2px"><span class="svc-t">${st.t}</span><span class="svc-s">${st.s}</span></div></div>${st.btn?`<button type="button" class="btn ${st.k==='aberto'||st.k==='conf'?'primary':'outline'} md block" data-a="${st.btn[1]}" data-v="${st.btn[2]}">${st.k==='aberto'?ic('pin',16,2.2):''}${st.btn[0]}</button>`:''}</div>`;}
function svcHome(){const x=svcEsc();if(!x||x.st==='recusado'||S.role==='visitante')return '';
 const lead=['lider','admin'].includes(S.role),team=S.svc.team,c=k=>team.filter(p=>svcOf(p)===k).length;
 return `<div class="pad" style="margin:-4px 0 22px"><section class="svc-card"><div class="row between" style="align-items:flex-start"><div class="stack" style="gap:3px"><span class="eb2" style="color:inherit;opacity:.8">Hoje você serve</span><span class="svc-h">${x.what}</span><span class="svc-m">${x.min} · ${x.fn} · ${x.h} · ${x.place}</span></div><span class="svc-day"><b>${x.d}</b>${MONTHS[x.m-1].slice(0,3)}</span></div>${svcBox()}</section>
  ${lead?`<button class="scard svc-lead" data-a="svcTeam" style="margin-top:12px"><span class="grow stack" style="gap:4px"><span class="eb2">Você lidera hoje</span><span class="chn" style="font-size:19px">Presença do time</span><span class="chm">${c('ok')} presentes · ${c('ck')} para confirmar · ${c('pend')} sem check-in</span></span><span class="ring sm" style="--p:${Math.round((c('ok'))/team.length*100)}"><span>${c('ok')}/${team.length}</span></span></button>`:''}</div>`;}
/* sheet de check-in */
function svcSheet(){const x=svcEsc();
 sheet(`<div class="stack g5" id="svcSh"><div class="stack g2"><h3 class="t2">Check-in da escala</h3><p class="callout">${x.what} · ${x.fn} · hoje, ${x.h}</p></div>
  <div class="svc-map" id="svcMap"><div class="svc-rad"><i></i><i></i><i></i></div><span class="svc-pin">${ic('church',16,2)}</span><span class="svc-me" id="svcMe"></span><span class="svc-lbl">${x.place} · raio de ${SVC_R} m</span></div>
  <div id="svcMsg"></div><div class="stack g3" id="svcAct"></div></div>`,sh=>{svcStep(sh,S.svc.perm?'ready':'perm');});}
function svcStep(sh,step,data){const msg=$('#svcMsg',sh),act=$('#svcAct',sh),map=$('#svcMap',sh),me=$('#svcMe',sh);map.className='svc-map '+step;
 const B=(lab,id,pri=true)=>`<button type="button" class="btn ${pri?'primary':'outline'} block" id="${id}">${lab}</button>`;
 if(step==='perm'){msg.innerHTML=`<div class="svc-note">${ic('pin',16,2)}<div><b>Precisamos da sua localização</b><span>Só no momento do check-in, para confirmar que você está no local. Não acompanhamos você depois.</span></div></div>`;act.innerHTML=B('Permitir localização','svP')+'<button type="button" class="tlink" data-a="closeSheet">Agora não</button>';
  $('#svP',sh).onclick=()=>{if(S.svc.geo==='negado'){S.svc.perm='negado';return svcStep(sh,'negado');}S.svc.perm='ok';svcStep(sh,'ready');};return;}
 if(step==='ready'){msg.innerHTML=`<p class="callout" style="text-align:center">Chegou? Confirme sua presença. O check-in só vale a até ${SVC_R} m do local.</p>`;act.innerHTML=B(ic('pin',16,2.2)+'Estou aqui','svGo');
  $('#svGo',sh).onclick=async e=>{if(S.svc.geo==='negado'){S.svc.perm='negado';return svcStep(sh,'negado');}const b=e.currentTarget;svcStep(sh,'loc');};return;}
 if(step==='loc'){msg.innerHTML=`<p class="callout" style="text-align:center">Buscando sua localização…</p>`;act.innerHTML='';
  setTimeout(()=>{const g=SVC_GEO[S.svc.geo];if(!g)return svcStep(sh,'negado');if(g.acc>SVC_R)return svcStep(sh,'fraco',g);if(g.dist>SVC_R)return svcStep(sh,'longe',g);svcStep(sh,'ok',g);},1400);return;}
 if(step==='longe'){me.style.setProperty('--d','1');msg.innerHTML=`<div class="svc-note bad">${ic('alert',16,2.2)}<div><b>Você está a ${svcDist(data.dist)} do local</b><span>O check-in só funciona a até ${SVC_R} m de ${svcEsc().place}. Chegue lá e tente de novo.</span></div></div>`;act.innerHTML=B('Tentar de novo','svR')+B('Ver no mapa','svM',false);$('#svR',sh).onclick=()=>svcStep(sh,'loc');$('#svM',sh).onclick=()=>toast('info','Abrindo o mapa',svcEsc().place+' · Rua das Flores, 120');return;}
 if(step==='fraco'){msg.innerHTML=`<div class="svc-note warn">${ic('alert',16,2.2)}<div><b>Localização imprecisa (± ${svcDist(data.acc)})</b><span>Não dá para confirmar que você está no local. Ligue o Wi-Fi ou vá para perto de uma janela e tente de novo.</span></div></div>`;act.innerHTML=B('Tentar de novo','svR');$('#svR',sh).onclick=()=>svcStep(sh,'loc');return;}
 if(step==='negado'){msg.innerHTML=`<div class="svc-note bad">${ic('lock',16,2.2)}<div><b>Localização bloqueada</b><span>Ative em Ajustes › Alva › Localização. Se não der, avise ${S.svc.leader.split(' ')[0]}: o líder pode marcar sua presença.</span></div></div>`;act.innerHTML=B('Abrir ajustes','svA')+B('Avisar o líder','svL',false);$('#svA',sh).onclick=()=>toast('info','Abrindo os ajustes do aparelho','Volte aqui depois de permitir.');$('#svL',sh).onclick=async()=>{await closeSheet();A.svcTalk();};return;}
 if(step==='ok'){msg.innerHTML=`<div class="svc-note ok">${ic('check',16,2.4)}<div><b>Você está no local · a ${svcDist(data.dist)}</b><span>Confirme para registrar sua presença.</span></div></div>`;act.innerHTML=B('Confirmar presença','svC');
  $('#svC',sh).onclick=async e=>{await busy(e.currentTarget,700,null,'Presença registrada');const m=svcMe();m.ck={at:svcHM(S.svc.now),dist:data.dist};await wait(250);await closeSheet();softRender();toast('success','Check-in feito às '+m.ck.at,S.svc.leader.split(' ')[0]+' vai confirmar sua presença. Bom serviço!');};}
}
/* tela do líder */
V.svcTeam=()=>{const x=svcEsc(),t=S.svc.team,c=k=>t.filter(p=>svcOf(p)===k).length,ph=svcPhase(),w=svcWin(),nck=c('ck');
 return {sb:'var(--ink)',html:`${subHead('Presença do time',`${x.what} · hoje, ${x.h} · ${x.place}`)}
 <div class="pad stack g5" style="padding-bottom:40px">
  <div class="svc-sum ${ph}"><div class="row g4" style="align-items:center"><span class="ring" style="--p:${Math.round(c('ok')/t.length*100)}"><span><b style="font:700 20px/1 var(--font-display)">${c('ok')}</b><small style="display:block;font-size:10px;opacity:.7">de ${t.length}</small></span></span>
   <div class="grow stack" style="gap:6px"><span class="it-title">${ph==='antes'?'Check-in abre às '+svcHM(w.open):ph==='fim'?'Check-in encerrado às '+svcHM(w.close):'Check-in aberto até '+svcHM(w.close)}</span><div class="svc-cn"><span class="ck"><b>${nck}</b> para confirmar</span><span><b>${c('pend')}</b> sem check-in</span>${c('falta')?`<span class="falta"><b>${c('falta')}</b> falta${c('falta')===1?'':'s'}</span>`:''}</div></div></div>
   ${nck?`<button type="button" class="btn primary md block" data-a="svcAll" style="margin-top:14px">Confirmar ${nck} check-in${nck===1?'':'s'}</button>`:''}</div>
  <div class="stack g3"><p class="eb2">Time</p><div class="svc-list">${t.map((p,i)=>{const k=svcOf(p);return `<div class="svc-row ${k}"><span class="avatar" style="${tone(['ceu','menta','lima','damasco','vinho'][i%5])};width:40px;height:40px;font-size:13px">${initials(p.n)}</span>
   <div class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${esc(p.n.split(' ')[0])}${p.me?' <span class="it-sub">· você</span>':' '+esc(p.n.split(' ').slice(1).join(' '))}</span><span class="it-sub">${p.fn} · ${k==='ok'?(p.manual?'marcado por você · '+p.why:'presente · check-in '+p.ck.at):k==='ck'?'check-in '+p.ck.at+' · a '+svcDist(p.ck.dist):k==='falta'?'falta registrada':'sem check-in'}</span></div>
   ${k==='ck'?`<button type="button" class="btn primary sm" data-a="svcOk" data-v="${i}">Confirmar</button>`:k==='pend'?`<button type="button" class="svc-more" data-a="svcPend" data-v="${i}" aria-label="Opções para ${esc(p.n)}">${ic('dots',18,2)}</button>`:`${status(k==='ok'?'success':'danger',k==='ok'?'Presente':'Faltou')}<button type="button" class="svc-more" data-a="svcUndo" data-v="${i}" aria-label="Desfazer">${ic('swap',16,2)}</button>`}</div>`;}).join('')}</div></div>
  <p class="foot" style="text-align:center">Check-in só vale a até ${SVC_R} m do local. Quem esqueceu ou ficou sem sinal, você marca aqui.</p></div>`};};
APP.push('svcTeam');SUBS.push('svcTeam');
Object.assign(A,{
 svcStart:()=>{const ph=svcPhase();if(ph!=='aberto'){toast('error',ph==='antes'?'O check-in ainda não abriu':'O check-in já encerrou',ph==='antes'?'Abre às '+svcHM(svcWin().open)+'.':'Fale com o líder para marcar sua presença.');return;}svcSheet();},
 svcTalk:async(v,el)=>{if(el)await busy(el,600,null,'Avisado');toast('success','Aviso enviado para '+S.svc.leader.split(' ')[0],'Ela pode marcar sua presença pelo app.');},
 svcTeam:()=>go('svcTeam'),
 svcOk:async(v,el)=>{const p=S.svc.team[+v];await busy(el,500,null,'Confirmado');p.pr='ok';softRender();toast('success','Presença confirmada',p.n.split(' ')[0]+' recebe a confirmação no app.');},
 svcAll:async(v,el)=>{const l=S.svc.team.filter(p=>svcOf(p)==='ck');await busy(el,700,null,'Confirmados');l.forEach(p=>p.pr='ok');softRender();toast('success',l.length+' presenças confirmadas',l.map(p=>p.n.split(' ')[0]).join(', ')+'.');},
 svcUndo:v=>{const p=S.svc.team[+v],o={pr:p.pr,manual:p.manual,why:p.why};delete p.pr;delete p.manual;delete p.why;softRender();toast('info','Presença reaberta',p.n.split(' ')[0]+' volta para '+(p.ck?'“para confirmar”':'“sem check-in”')+'.');},
 svcPend:v=>{const p=S.svc.team[+v],f=p.n.split(' ')[0],w=svcWin(),pre=S.svc.now<w.start;
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${esc(p.n)}</h3><p class="callout">Ainda não fez check-in.</p></div>
   <div class="stack g2"><span class="eb2">Marcar presente · por quê?</span><div class="row g2" style="flex-wrap:wrap" id="svW">${['Esqueceu o celular','Sem internet','Localização bloqueada','Chegou depois'].map(w=>`<button type="button" class="chip" aria-pressed="false" data-v="${w}">${w}</button>`).join('')}</div></div>
   <div class="otpmsg" id="svE" role="alert" style="min-height:0"></div>
   <div class="stack g3"><button type="button" class="btn primary block" id="svMan">Marcar presente</button><button type="button" class="btn outline block" id="svF" ${pre?'disabled':''}>Registrar falta</button>${pre?`<p class="foot" style="text-align:center;margin-top:-4px">Falta só pode ser registrada depois do início (${svcHM(w.start)}).</p>`:''}<button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{
   let why=null;$('#svW',sh).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#svW button',sh).forEach(z=>z.setAttribute('aria-pressed',z===b));why=b.dataset.v;$('#svE',sh).textContent='';});
   $('#svMan',sh).addEventListener('click',async e=>{if(!why){$('#svE',sh).textContent='Escolha um motivo. Fica no histórico.';return;}await busy(e.currentTarget,600,null,'Marcado');Object.assign(p,{pr:'ok',manual:true,why});await closeSheet();softRender();toast('success',f+' marcado(a) como presente',why+'.');});
   $('#svF',sh).addEventListener('click',()=>{sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Registrar falta de ${esc(f)}?</h3><p class="callout">${esc(p.n)} recebe um aviso gentil no app. A falta fica no histórico de serviço e dá para desfazer.</p></div><div class="stack g3"><button type="button" class="btn primary block danger" id="svFOk">Registrar falta</button><button type="button" class="tlink" data-a="closeSheet">Cancelar</button></div></div>`,s2=>{$('#svFOk',s2).addEventListener('click',async ev=>{await busy(ev.currentTarget,600,null,'Registrada');p.pr='falta';await closeSheet();softRender();toast('info','Falta de '+f+' registrada','Dá para desfazer na lista.');});});});});},
});
/* rail: simulação de horário e localização */
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Check-in de escala · horário</span><div class="rail-chips" id="svcT">${[[16*60+30,'16h30 · antes'],[18*60+40,'18h40 · aberto'],[20*60+25,'20h25 · durante'],[22*60+30,'22h30 · encerrado']].map(t=>`<button type="button" data-v="${t[0]}" aria-pressed="${S.svc.now===t[0]}">${t[1]}</button>`).join('')}</div>
  <span class="rail-lbl" style="margin-top:10px">Check-in de escala · localização</span><div class="rail-chips" id="svcG">${[['perto','No local (40 m)'],['longe','Longe (2,3 km)'],['fraco','GPS fraco'],['negado','Sem permissão']].map(g=>`<button type="button" data-v="${g[0]}" aria-pressed="${S.svc.geo===g[0]}">${g[1]}</button>`).join('')}</div>`;
 sec.parentNode.insertBefore(box,sec);
 const clock=()=>{const s=$('.statusbar span');if(s)s.textContent=Math.floor(S.svc.now/60)+':'+String(S.svc.now%60).padStart(2,'0');};clock();
 $('#svcT').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.svc.now=+b.dataset.v;$$('#svcT button').forEach(x=>x.setAttribute('aria-pressed',x===b));clock();if(['home','agenda','svcTeam'].includes(S.screen))softRender();});
 $('#svcG').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.svc.geo=b.dataset.v;if(b.dataset.v!=='negado'&&S.svc.perm==='negado')S.svc.perm=null;$$('#svcG button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
 RAIL.push(['svcTeam','Líder › Presença do time']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
 $('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.dataset.s==='svcTeam'&&!['lider','admin'].includes(S.role)){S.role='lider';}},true);
})();


/* ================= Apresentação de Bebês ao Senhor (membro) ================= */
S.apb={max:24,prazo:7,
 datas:[{id:'bd1',y:2026,m:10,d:4,h:'10h',t:'Culto de Celebração',vagas:5,used:2},{id:'bd2',y:2026,m:10,d:11,h:'10h',t:'Culto de Celebração',vagas:6,used:2},{id:'bd4',y:2026,m:10,d:25,h:'10h',t:'Culto de Celebração',vagas:6,used:6},{id:'bd5',y:2026,m:11,d:8,h:'10h',t:'Culto de Celebração',vagas:6,used:1}],
 kids:[{id:'k1',n:'Helena Pereira',nasc:'2026-02-10'},{id:'k2',n:'Lucas Pereira',nasc:'2023-05-02'}],
 pedidos:[{id:'ap1',kid:'k2',bebe:'Lucas Pereira',cert:'Lucas Pereira',pais:['Rafael Pereira','Camila Pereira'],when:'Dom, 14 mai 2023 · 10h',culto:'Culto de Celebração',st:'realizada'}],
 f:null};
const APB_ST={aguardando:['warning','Aguardando'],confirmado:['success','Confirmado'],realizada:['success','Realizada'],recusado:['danger','Recusado'],cancelado:['danger','Cancelado']};
const apbM=(nasc,y,m,d)=>{const a=new Date(nasc+'T12:00'),b=new Date(y,m-1,d,12);let n=(b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth());if(b.getDate()<a.getDate())n--;return Math.max(0,n);};
const apbAge=n=>n<1?'recém-nascido(a)':n<12?`${n} ${n===1?'mês':'meses'}`:(()=>{const y=Math.floor(n/12),r=n%12;return `${y} ano${y>1?'s':''}${r?` e ${r} ${r===1?'mês':'meses'}`:''}`;})();
const apbMaxTx=()=>S.apb.max%12?`${S.apb.max} meses`:`${S.apb.max/12} anos`;
const apbDays=dt=>Math.round((new Date(dt.y,dt.m-1,dt.d,12)-new Date(TODAY.y,TODAY.m-1,TODAY.d,12))/864e5);
const apbKidNow=k=>apbM(k.nasc,TODAY.y,TODAY.m,TODAY.d);
const apbActive=kid=>S.apb.pedidos.find(p=>p.kid===kid&&['aguardando','confirmado','realizada'].includes(p.st));
function apbCertHTML(p){return `<div class="apb-cert"><div class="apb-cert-in"><span class="apb-c-eb">Certificado de</span><h2 class="apb-c-t">Apresentação ao Senhor</h2><p class="apb-c-tx">Certificamos que</p><p class="apb-c-n">${esc(p.cert)}</p><p class="apb-c-tx">filho(a) de ${p.pais.map(esc).join(' e ')}, foi apresentado(a) ao Senhor diante da igreja reunida no ${esc(p.culto)}, ${p.when.split(' · ')[0].replace(/^\w+, /,'')}.</p><blockquote>“Levaram-no a Jerusalém, para o apresentarem ao Senhor.”<cite>Lucas 2:22</cite></blockquote><div class="apb-c-sig"><span><i></i>Pr. Rafael Pereira</span><span><i></i>${esc(S.church.name||'Alva Sede')}</span></div></div></div>`;}

V.bebes=()=>{const P=S.apb.pedidos,open=S.apb.datas.filter(d=>apbDays(d)>=S.apb.prazo&&d.used<d.vagas);
 return {sb:'var(--ink)',html:`${subHead('Apresentações','Seu bebê apresentado ao Senhor no culto, com a igreja reunida.')}
 <div class="pad stack g6" style="padding-bottom:24px">
  <section class="apb-hero"><span class="apb-hi">${ic('pacifier',22,1.8)}</span><blockquote>“Levaram-no a Jerusalém, para o apresentarem ao Senhor.”<cite>Lucas 2:22</cite></blockquote><p>Os pais trazem o bebê à frente no culto, a igreja ora pela família e vocês recebem o certificado no app.</p></section>
  ${P.length?`<section class="stack g3"><p class="eb2">Seus pedidos</p>${P.map(p=>{const s=APB_ST[p.st];return `<article class="card apb-p ${p.st}"><div class="row g3" style="align-items:flex-start"><span class="apb-av">${ic('pacifier',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">${esc(p.bebe)}</span><span class="it-sub">${p.culto} · ${p.when}</span></div>${status(s[0],s[1])}</div>
   ${p.st==='aguardando'?`<p class="apb-note">${ic('clock',14,2)}A secretaria confirma em até 3 dias úteis. Você recebe um aviso aqui no app.</p><button class="tlink" style="align-self:flex-start;padding:0" data-a="apbCancel" data-v="${p.id}">Cancelar pedido</button>`:p.st==='confirmado'?`<p class="apb-note ok">${ic('check',14,2.4)}Chegue 20 minutos antes e procure a recepção. Vocês serão chamados à frente.</p><button class="tlink" style="align-self:flex-start;padding:0" data-a="apbCancel" data-v="${p.id}">Não vamos conseguir</button>`:p.st==='realizada'?`<button class="btn outline md block" data-a="apbCert" data-v="${p.id}">${ic('award',16,2)}Ver certificado</button>`:p.why?`<p class="apb-note bad">${ic('info',14,2)}${esc(p.why)}</p>`:''}</article>`;}).join('')}</section>`:''}
  <section class="stack g3"><p class="eb2">Como funciona</p><ol class="steps"><li>Escolha um dos cultos com apresentação.</li><li>A secretaria confirma o pedido.</li><li>No culto, vocês apresentam o bebê à frente.</li><li>O certificado chega aqui no app.</li></ol>
   <p class="foot">Para bebês de até ${apbMaxTx()}. Pelo menos um dos responsáveis precisa ser membro. Pedidos até ${S.apb.prazo} dias antes do culto.</p></section>
 </div>
 <div class="apb-dock"><button class="btn primary block" data-a="apbNew" ${open.length?'':'disabled'}>${open.length?'Agendar apresentação':'Sem datas abertas no momento'}</button></div>`};};

V.bebeNovo=()=>{const F=S.apb.f,st=F.step;
 const steps=['Bebê','Data','Confirmar'];
 let body='';
 if(st===1){const pd=F.date&&S.apb.datas.find(x=>x.id===F.date);body=`${pd?`<div class="apb-evb"><span class="apb-av">${ic('calendar',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">${pd.t}</span><span class="it-sub">${fmtK(K(pd.y,pd.m,pd.d))} · ${pd.h} · culto escolhido</span></div></div>`:''}<div class="stack g3"><p class="eb2">Quem será apresentado?</p>${S.apb.kids.map(k=>{const n=apbKidNow(k),done=apbActive(k.id),ov=n>S.apb.max,dis=done||ov;return `<button class="apb-k ${F.kid===k.id?'on':''}" data-a="apbKid" data-v="${k.id}" ${dis?'disabled':''}><span class="apb-av">${ic('pacifier',18,1.8)}</span><span class="grow stack" style="gap:2px;align-items:flex-start"><span class="it-title">${esc(k.n)}</span><span class="it-sub">${apbAge(n)}${done?` · ${done.st==='realizada'?'já apresentado(a)':'já tem pedido'}`:ov?` · acima de ${apbMaxTx()}`:''}</span></span>${dis?ic('lock',16,2):`<span class="apb-rd"></span>`}</button>`;}).join('')}
   ${S.apb.kids.some(k=>apbKidNow(k)>S.apb.max&&!apbActive(k.id))?`<p class="foot">${ic('info',13,2)} Criança acima de ${apbMaxTx()}? Fale com a secretaria.</p>`:''}
   <button class="apb-add ${F.adding?'on':''}" data-a="apbAddKid">${ic('plus',18,2.2)}Cadastrar outro bebê</button>
   ${F.adding?`<div class="stack g4 apb-nk">${field({id:'apbN',label:'Nome completo do bebê',ph:'Como no registro',val:F.nk.n})}${field({id:'apbD',label:'Data de nascimento',type:'date',val:F.nk.d})}<button class="btn outline md block" data-a="apbSaveKid">Adicionar à família</button></div>`:''}</div>`;}
 if(st===2){const k=S.apb.kids.find(x=>x.id===F.kid);body=`<div class="stack g3"><p class="eb2">Em qual culto?</p>${S.apb.datas.map(d=>{const dd=apbDays(d),full=d.used>=d.vagas,late=dd<S.apb.prazo,m=apbM(k.nasc,d.y,d.m,d.d),ov=m>S.apb.max,dis=full||late||ov,left=d.vagas-d.used;
   return `<button class="apb-d ${F.date===d.id?'on':''}" data-a="apbDate" data-v="${d.id}" ${dis?'disabled':''}><span class="apb-dt"><b>${d.d}</b>${MONTHS[d.m-1].slice(0,3)}</span><span class="grow stack" style="gap:2px;align-items:flex-start"><span class="it-title">${d.t}</span><span class="it-sub">${fmtK(K(d.y,d.m,d.d)).split(',')[0]} · ${d.h} · ${esc(k.n.split(' ')[0])} com ${apbAge(m)}</span></span><span class="apb-v ${dis?'x':left<=2?'few':''}">${full?'Esgotado':late?'Prazo encerrado':ov?'Acima da idade':left===1?'1 vaga':left+' vagas'}</span></button>`;}).join('')}
   <p class="foot">Os pedidos fecham ${S.apb.prazo} dias antes de cada culto.</p></div>`;}
 if(st===3){const k=S.apb.kids.find(x=>x.id===F.kid),d=S.apb.datas.find(x=>x.id===F.date);body=`<div class="stack g5"><div class="apb-sum"><span class="apb-av lg">${ic('pacifier',22,1.8)}</span><div class="stack" style="gap:2px"><span class="it-title">${esc(k.n)}</span><span class="it-sub">${d.t} · ${fmtK(K(d.y,d.m,d.d))} · ${d.h}</span></div></div>
   ${field({id:'apbC',label:'Nome no certificado',val:F.cert,hint:'Confira a grafia: é assim que sai no certificado.'})}
   <div class="stack g2"><span class="eb2">Responsáveis</span><div class="apb-r"><span class="it-title">Rafael Pereira</span><span class="apb-mb">${ic('check',11,3)}Membro</span></div></div>
   ${field({id:'apbP2',label:'Outro responsável (opcional)',val:F.p2,ph:'Nome completo'})}
   <p class="apb-note">${ic('info',14,2)}A presença dos responsáveis no culto é obrigatória: vocês serão chamados à frente com o bebê.</p></div>`;}
 return {sb:'var(--ink)',html:`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="apbBack" aria-label="Voltar">${ic('chevL',20,2.25)}</button><span class="apb-steps">${steps.map((s,i)=>`<i class="${i+1<st?'done':i+1===st?'on':''}"></i>`).join('')}</span></div><h1 class="t1" style="margin-top:14px">Agendar apresentação</h1><p class="callout">Passo ${st} de 3 · ${steps[st-1]}</p></header>
 <div class="pad stack g5" style="padding-bottom:24px">${body}</div>
 <div class="apb-dock"><button class="btn primary block" data-a="apbNext" id="apbGo">${st===3?'Enviar pedido':'Continuar'}</button></div>`};};
HOOK.bebeNovo=function(){const F=S.apb.f;[['apbN',v=>F.nk.n=v],['apbD',v=>F.nk.d=v],['apbC',v=>F.cert=v],['apbP2',v=>F.p2=v]].forEach(([id,fn])=>{const el=$('#'+id);if(el)el.addEventListener('input',()=>{fn(el.value);clearErr(id);});});};
V.bebeCert=()=>{const p=S.apb.pedidos.find(x=>x.id===S.apb.cert);return {sb:'var(--ink)',html:`${subHead('Certificado',esc(p.bebe))}<div class="pad stack g5" style="padding-bottom:40px">${apbCertHTML(p)}<div class="stack g3"><button class="btn primary block" data-a="apbPdf">${ic('share',16,2)}Compartilhar</button><button class="btn outline block" data-a="apbPdf" data-v="pdf">Baixar PDF</button></div></div>`};};
APP.push('bebes','bebeNovo','bebeCert');SUBS.push('bebes','bebeNovo','bebeCert');
Object.assign(A,{
 apbNew:()=>{if(S.role==='visitante'){toast('error','Só para membros','Pelo menos um dos responsáveis precisa ser membro. Fale com a secretaria.');return;}S.apb.f={step:1,kid:null,date:null,cert:'',p2:'Camila Pereira',ok:false,adding:false,nk:{n:'',d:''}};go('bebeNovo');},
 apbBack:()=>{const F=S.apb.f;if(F.step>1){F.step--;render('back');}else back();},
 apbKid:v=>{S.apb.f.kid=v;S.apb.f.adding=false;softRender();},
 apbDate:v=>{S.apb.f.date=v;softRender();},
 apbAddKid:()=>{S.apb.f.adding=!S.apb.f.adding;softRender();setTimeout(()=>{const n=$('#apbN');n&&n.focus();},50);},
 apbSaveKid:()=>{const F=S.apb.f,n=F.nk.n.trim(),d=F.nk.d;let ok=true;
  if(n.split(/\s+/).length<2){setErr('apbN','Informe nome e sobrenome');ok=false;}
  if(!d){setErr('apbD','Informe a data de nascimento');ok=false;}else{const t=new Date(d+'T12:00'),now=new Date(TODAY.y,TODAY.m-1,TODAY.d,12);if(t>now){setErr('apbD','A data não pode ser no futuro');ok=false;}else if(apbM(d,TODAY.y,TODAY.m,TODAY.d)>S.apb.max){setErr('apbD',`Acima de ${apbMaxTx()}. Fale com a secretaria.`);ok=false;}}
  if(!ok)return;const k={id:'k'+Date.now(),n,nasc:d};S.apb.kids.push(k);F.kid=k.id;F.adding=false;F.nk={n:'',d:''};softRender();toast('success',n.split(' ')[0]+' adicionado(a) à família','A secretaria confere os dados na confirmação.');},
 apbTog:(v,el)=>{const on=el.getAttribute('aria-checked')!=='true';el.setAttribute('aria-checked',on);S.apb.f.ok=on;clearErr('apbOk');},
 apbNext:async(v,el)=>{const F=S.apb.f;
  if(F.step===1){if(!F.kid){toast('error','Escolha o bebê','Ou cadastre um novo.');return;}const k=S.apb.kids.find(x=>x.id===F.kid);if(!F.cert)F.cert=k.n;F.step=2;render('fwd');return;}
  if(F.step===2){if(!F.date){toast('error','Escolha um culto','Datas esgotadas ou fora do prazo ficam bloqueadas.');return;}{const d=S.apb.datas.find(x=>x.id===F.date),k=S.apb.kids.find(x=>x.id===F.kid);if(apbM(k.nasc,d.y,d.m,d.d)>S.apb.max||!apbOpen(d)){F.date=null;softRender();toast('error','Esse culto não serve para '+k.n.split(' ')[0],'Escolha outra data da lista.');return;}}F.step=3;render('fwd');return;}
  let ok=true;if(!F.cert.trim()||F.cert.trim().split(/\s+/).length<2){setErr('apbC','Informe o nome completo');ok=false;}if(!ok)return;
  await busy(el,800,null,'Pedido enviado');const k=S.apb.kids.find(x=>x.id===F.kid),d=S.apb.datas.find(x=>x.id===F.date);d.used++;
  S.apb.pedidos.unshift({id:'ap'+Date.now(),kid:k.id,bebe:k.n,cert:F.cert.trim(),pais:['Rafael Pereira',F.p2.trim()].filter(Boolean),when:fmtK(K(d.y,d.m,d.d))+' · '+d.h,culto:d.t,st:'aguardando'});
  S.notifs.unshift({id:'n'+Date.now(),t:'Pedido de apresentação enviado: '+k.n.split(' ')[0],s:d.t+' · '+fmtK(K(d.y,d.m,d.d))+'. A secretaria confirma em até 3 dias.',when:'Agora',grp:'Hoje',tone:'damasco',i:'pacifier',go:'bebes',unread:true});
  S.hist=S.hist.filter(h=>h!=='bebeNovo');S.screen='bebes';render('back');toast('success','Pedido enviado','Avisamos aqui quando a secretaria confirmar.');},
 apbCancel:v=>{const p=S.apb.pedidos.find(x=>x.id===v);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${p.st==='confirmado'?'Cancelar a apresentação?':'Cancelar o pedido?'}</h3><p class="callout">${esc(p.bebe)} · ${p.when}. A vaga volta a ficar livre para outra família.</p></div><div class="stack g3"><button type="button" class="btn primary block danger" id="apbX">Cancelar ${p.st==='confirmado'?'apresentação':'pedido'}</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#apbX',sh).addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Cancelado');p.st='cancelado';p.why='Cancelado por você. Dá para pedir outra data quando quiser.';const d=S.apb.datas.find(x=>p.when.startsWith(fmtK(K(x.y,x.m,x.d))));if(d)d.used--;await closeSheet();softRender();toast('info','Cancelado','A secretaria foi avisada.');});});},
 apbCert:v=>{S.apb.cert=v;go('bebeCert');},
 apbFromEv:async v=>{await closeSheet();A.apbNew();if(S.apb.f){S.apb.f.date=v;}},
 apbPdf:(v,el)=>toast('success',v==='pdf'?'Baixando o certificado':'Compartilhando',v==='pdf'?'Certificado-'+S.apb.pedidos.find(x=>x.id===S.apb.cert).bebe.split(' ')[0]+'.pdf':'Escolha onde enviar.'),
});
RAIL.push(['bebes','Membro › Apresentações']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');

render('none');
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
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Abertura</span><div class="rail-nav"><button type="button" id="spReplay">Rever splash screen</button></div>`;sec.parentNode.insertBefore(box,sec);
 $('#spReplay').addEventListener('click',()=>{S.hist=[];S.screen='welcome';$('#overlay').innerHTML='';render('none');showSplash();});})();
/* Identity E: preserve profile layout; add preference and security sheets. */
S.identityPrefs={email:true,push:true,resumo:true,urg:true,lang:'Português'};
const idMeView=V.meusDados;
V.meusDados=()=>{const result=idMeView();if(!S.meEdit&&(S.meTab||'dados')==='dados'){const actions=`<section class="stack g3"><p class="eb2">Conta e preferências</p><div class="list">${[['Preferências','idMobilePrefs'],['Alterar e-mail','idMobileEmail'],['Alterar senha','idMobilePassword'],['Sair dos outros aparelhos','idMobileSessions']].map(([t,a])=>`<button class="item" data-a="${a}"><span class="grow it-title">${t}</span>${ic('chevR',18,2)}</button>`).join('')}</div></section>`;result.html=result.html.replace(/<\/div>$/,actions+'</div>');}if(S.meEdit)result.html=result.html.replace('id="mEmail"','readonly id="mEmail"').replace('id="mEmail"', 'aria-description="Use Alterar e-mail no perfil para confirmar o novo endereço" id="mEmail"');return result;};
function idMobileCode(title,email,done){sheet(`<div class="stack g4"><h3 class="t2">${title}</h3><p class="callout">Código enviado para ${esc(email)}. Demonstração: 123456.</p>${field({id:'identityCode',label:'Código de 6 dígitos',im:'numeric',max:6})}<button class="btn primary block" id="identityConfirm">Confirmar</button><button class="tlink" data-a="closeSheet">Cancelar</button></div>`,()=>{$('#identityConfirm').onclick=async()=>{if(val('identityCode')!=='123456'){setErr('identityCode','Use 123456 nesta demonstração.');return;}await closeSheet();done();};});}
function idMobileFile(){const url=URL.createObjectURL(new Blob([JSON.stringify({demonstracao:true,nome:S.me.nome,email:S.me.email},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='alva-dados-demonstracao.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('success','Arquivo baixado','Dados demonstrativos.');}
Object.assign(A,{
 idMobilePrefs:()=>sheet(`<div class="stack g5"><h3 class="t2">Preferências</h3><div class="list">${[['email','Por e-mail'],['push','No celular'],['resumo','Resumo semanal'],['urg','Casos urgentes de cuidado']].map(([k,t])=>`<div class="item"><span class="grow it-title">${t}</span><button class="switch" role="switch" aria-label="${t}" aria-checked="${S.identityPrefs[k]}" data-a="idMobileNotif" data-v="${k}"></button></div>`).join('')}</div><div class="stack g2"><p class="eb2">Tema</p><div class="seg">${[['dia','Dia'],['noite','Noite']].map(([k,t])=>`<button data-a="idMobileTheme" data-v="${k}" aria-selected="${S.theme===k}">${t}</button>`).join('')}</div></div><div class="stack g2"><p class="eb2">Idioma</p><div class="seg">${['Português','Español','English'].map(l=>`<button data-a="idMobileLanguage" data-v="${l}" aria-selected="${S.identityPrefs.lang===l}">${l}</button>`).join('')}</div></div><button class="btn primary block" data-a="closeSheet">Concluir</button></div>`),
 idMobileLanguage:(v,el)=>{S.identityPrefs.lang=v;el.parentNode.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b===el));},
 idMobileNotif:(k,el)=>{S.identityPrefs[k]=!S.identityPrefs[k];el.setAttribute('aria-checked',S.identityPrefs[k]);},
 idMobileTheme:(v,el)=>{S.theme=v;phone.classList.toggle('dia',v==='dia');el.parentNode.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b===el));$$('#themeSeg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===v));},
 idMobileEmail:()=>sheet(`<div class="stack g4"><h3 class="t2">Alterar e-mail</h3>${field({id:'identityPassword',label:'Senha atual',type:'password'})}${field({id:'identityEmail',label:'Novo e-mail',type:'email'})}<button class="btn primary block" id="identityEmailGo">Enviar código</button></div>`,()=>{$('#identityEmailGo').onclick=async()=>{const email=val('identityEmail');if(!val('identityPassword'))return setErr('identityPassword','Informe a senha atual.');if(!EMAIL_RE.test(email))return setErr('identityEmail','Informe um e-mail válido.');await closeSheet();idMobileCode('Confirmar novo e-mail',email,()=>{S.me.email=email;softRender();toast('success','E-mail atualizado','Demonstração');});};}),
 idMobilePassword:()=>sheet(`<div class="stack g4"><h3 class="t2">Alterar senha</h3><p class="callout">As outras sessões serão encerradas. Você continua neste aparelho.</p>${field({id:'identityOld',label:'Senha atual',type:'password'})}${field({id:'identityNew',label:'Nova senha',type:'password',hint:'Mínimo de 8 caracteres, com letras e números.'})}${field({id:'identityRepeat',label:'Repita a nova senha',type:'password'})}<button class="btn primary block" id="identityPasswordGo">Salvar senha</button></div>`,()=>{$('#identityPasswordGo').onclick=async()=>{if(!val('identityOld'))return setErr('identityOld','Informe a senha atual.');const p=val('identityNew');if(p.length<8||!/[a-z]/i.test(p)||!/[0-9]/.test(p))return setErr('identityNew','Use 8 caracteres, com letras e números.');if(p!==val('identityRepeat'))return setErr('identityRepeat','As senhas não conferem.');await closeSheet();toast('success','Senha alterada','Outras sessões encerradas · demonstração.');};}),
 idMobileSessions:()=>sheet(`<div class="stack g4"><h3 class="t2">Sair dos outros aparelhos?</h3><p class="callout">Você continua conectado neste aparelho.</p><button class="btn primary block" data-a="idMobileSessionsDone">Confirmar</button><button class="tlink" data-a="closeSheet">Cancelar</button></div>`),
 idMobileSessionsDone:async()=>{await closeSheet();toast('success','Outras sessões encerradas','Demonstração');},
 dlData:()=>sheet(`<div class="stack g4"><h3 class="t2">Baixar meus dados</h3><p class="callout">Prepare uma cópia dos seus dados. O arquivo deste protótipo contém apenas informações demonstrativas.</p><button class="btn primary block" data-a="dlGo">Preparar arquivo</button></div>`),
 dlGo:async(v,el)=>{await busy(el,700,null,'Pronto');await closeSheet();sheet(`<div class="stack g4"><h3 class="t2">Arquivo pronto</h3><p class="callout">Seus dados de demonstração estão disponíveis.</p><button class="btn primary block" data-a="idMobileFile">Baixar arquivo</button></div>`);},idMobileFile:idMobileFile,
 delAcc:()=>sheet(`<div class="stack g4"><h3 class="t2">Excluir minha conta</h3><p class="callout">A exclusão não pode ser desfeita. Permanecem o nome, os registros de retenção obrigatória e a auditoria. Baixe seus dados antes de continuar.</p><button class="btn outline block" data-a="idMobileFile">Baixar meus dados</button><button class="btn dangerfill block" data-a="idMobileDeleteCode">Enviar código de confirmação</button><button class="tlink" data-a="closeSheet">Manter minha conta</button></div>`),
 idMobileDeleteCode:async()=>{await closeSheet();idMobileCode('Confirmar exclusão',S.me.email,()=>sheet(`<div class="stack g4"><h3 class="t2">Exclusão concluída</h3><p class="callout">Fim da demonstração. Nenhuma conta real foi excluída.</p><button class="btn primary block" data-a="closeSheet">Fechar</button></div>`));}
});

const NX_MVIDEOS=[{id:'v1',t:'Servir com propósito',desc:'Um convite para servir na comunidade.',url:'https://www.youtube.com/watch?v=jfKfPfyJRdk',public:true},{id:'v2',t:'Primeiros passos na Alva',desc:'Conheça nossa comunidade e sua caminhada.',url:'https://www.youtube.com/watch?v=5qap5aO4i9A',public:false}];
const NX_MSERIES=[{id:'s1',t:'Vida em comunidade',type:'Vídeo',desc:'Conheça, participe e sirva.',public:true,items:[{t:'Servir com propósito',url:NX_MVIDEOS[0].url},{t:'Caminhar juntos',url:NX_MVIDEOS[0].url}]},{id:'s2',t:'Fundamentos da fé',type:'Pregação',desc:'Mensagens para fortalecer sua caminhada.',public:false,items:[{t:'Uma nova vida',url:NX_MVIDEOS[0].url},{t:'Fé no cotidiano',url:NX_MVIDEOS[0].url}]},{id:'s3',t:'Canções de adoração',type:'Música',desc:'Uma seleção para ouvir e compartilhar.',public:true,items:[{t:'Majestade',url:'https://www.youtube.com/results?search_query=Majestade+Fernandinho'},{t:'Oceanos',url:'https://www.youtube.com/results?search_query=Oceanos+Hillsong'}]}];
S.nxSeriesProgress={};
const nxMobileThumb=v=>`<img src="https://i.ytimg.com/vi/${new URL(v.url).searchParams.get('v')}/hqdefault.jpg" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:16px">`;
V.nxVideos=()=>sub('Vídeos','Conteúdos para conhecer e compartilhar.',`<div class="stack g5">${NX_MVIDEOS.filter(v=>S.role!=='visitante'||v.public).map(v=>`<a href="${esc(v.url)}" target="_blank" rel="noopener" class="stack g2" style="color:inherit;text-decoration:none">${nxMobileThumb(v)}<b class="t3">${v.t}</b><p class="callout">${v.desc}</p><span class="foot">${v.public?'Público':'Interno'} · Abrir vídeo ${ic('arrowR',14)}</span></a>`).join('')}</div>`);
V.nxSeries=()=>sub('Séries','Conteúdos em sequência para sua caminhada.',`<div class="list">${NX_MSERIES.filter(s=>S.role!=='visitante'||s.public).map(s=>`<button class="item" data-a="nxSeriesOpen" data-v="${s.id}"><span class="iconbox" style="${tone('ceu')}">${ic(s.type==='Música'?'music':'book',22)}</span><span class="grow stack g2"><b class="it-title">${s.t}</b><span class="it-sub">${s.type} · ${s.items.length} itens</span></span>${ic('chevR',18)}</button>`).join('')}</div>`);
V.nxSeriesDetail=()=>{const s=NX_MSERIES.find(s=>s.id===S.nxSeries),p=S.nxSeriesProgress[s.id],track=s.type!=='Música',pct=p?Math.round(p.length/s.items.length*100):0;return sub(s.t,s.desc,`<span class="foot">${s.type} · ${s.items.length} itens</span>${track&&S.role!=='visitante'?p?`<section class="stack g2"><span class="it-title">${pct===100?'Concluiu':'Fazendo'} · ${pct}%</span><div style="height:6px;border-radius:9px;background:var(--line);overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--brand)"></div></div></section>`:`<button class="btn primary block" data-a="nxSeriesStart">Começar série</button>`:''}<div class="stack g4">${s.items.map((it,i)=>`<section class="list"><div class="item"><span class="grow stack g2"><span class="foot">${i+1} · ${s.type}</span><b class="it-title">${it.t}</b><a class="link" href="${esc(it.url)}" target="_blank" rel="noopener">${s.type==='Música'?'Ouvir':'Assistir'} ${ic('arrowR',14)}</a></span></div>${track&&p?`<button class="item" data-a="nxSeriesDone" data-v="${i}"><span class="grow">${p.includes(i)?'Concluído':'Marcar como concluído'}</span>${ic(p.includes(i)?'check':'plus',18)}</button>`:''}</section>`).join('')}</div>`);};
Object.assign(A,{nxSeriesOpen:id=>{S.nxSeries=id;go('nxSeriesDetail');},nxSeriesStart:()=>{S.nxSeriesProgress[S.nxSeries]=[];softRender();},nxSeriesDone:v=>{const p=S.nxSeriesProgress[S.nxSeries];if(!p.includes(+v))p.push(+v);softRender();}});
const nxOldMais=V.mais;V.mais=()=>{const r=nxOldMais();r.html+=`<section class="pad stack g3"><p class="eb2">Conteúdo</p><div class="list"><button class="item" data-a="go" data-v="nxVideos"><span class="iconbox" style="${tone('ceu')}">${ic('play',20)}</span><span class="grow it-title">Vídeos</span>${ic('chevR',18)}</button><button class="item" data-a="go" data-v="nxSeries"><span class="iconbox" style="${tone('salvia')}">${ic('book',20)}</span><span class="grow it-title">Séries</span>${ic('chevR',18)}</button></div></section>`;return r;};
SUBS.push('nxVideos','nxSeries','nxSeriesDetail');RAIL.push(['nxVideos','Conteúdo › Vídeos'],['nxSeries','Conteúdo › Séries']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
const NX_MMEETS=[{d:10,m:10,y:2026,name:'Casa de Apascentamento',start:'19:30',end:'21:00',mode:'Remoto',url:'https://meet.google.com/'},{d:17,m:10,y:2026,name:'Casa de Apascentamento',start:'19:30',end:'21:00',mode:'Presencial',url:''}];
const nxOldAgendaTab=agendaTab;agendaTab=function(){const list=NX_MMEETS.filter(m=>m.y===S.ag.y&&m.m===S.ag.m&&(!S.ag.sel||m.d===S.ag.sel));return nxOldAgendaTab()+(S.role==='visitante'?'':`<section class="stack g3"><p class="eb2">Casa · encontros agendados</p>${list.map(m=>`<div class="list"><div class="item"><span class="grow stack g2"><b class="it-title">${m.name}</b><span class="it-sub">${String(m.d).padStart(2,'0')}/${String(m.m).padStart(2,'0')} · ${m.start}–${m.end} · ${m.mode}</span>${m.url?`<a class="link" href="${m.url}" target="_blank" rel="noopener">Entrar na reunião ${ic('arrowR',14)}</a>`:''}</span></div></div>`).join('')||'<p class="foot">Nenhum encontro da casa neste dia.</p>'}</section>`);};

showSplash();

})();