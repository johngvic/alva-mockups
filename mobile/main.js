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
const ROLES={visitante:['Visitante','damasco'],membro:['Membro','ceu'],lider:['Líder','menta'],admin:['Administrador','brasa'],staff:['Staff de eventos','lima']};
const USERS={
 'renan.ferreira@email.com':{first:'Renan',name:'Renan Ferreira',role:'membro'},
 'giovanna.martins@email.com':{first:'Giovanna',name:'Giovanna Martins',role:'lider'},
 'equipe.eventos@email.com':{first:'Equipe',name:'Equipe de Eventos',role:'staff'}
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

V.welcome=()=>({sb:'var(--ink)',amb:'welcome',html:`<div class="wel">
  <header class="wel-brand">
   <h1 class="wel-logo">${logo(30,true)}</h1>
   <p class="wel-line">Sua comunidade,<br>ao alcance de <em>cada momento</em>.</p>
  </header>
  <div class="wel-actions">
   <button class="wbtn" data-a="go" data-v="login">Entrar com senha</button>
   <button class="wbtn sec" data-a="go" data-v="codeEmail">Entrar com código por e-mail</button>
  </div>
  <p class="wel-sign">Ainda não tem uma conta? <button class="link" data-a="startSignup">Criar conta</button></p>
 </div>`});
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
 dock:`<div class="nochg"><b>Não chegou?</b><p>Verifique a caixa de spam. O remetente é <span class="mask">nao-responda@alva.app</span>.</p><button type="button" class="tlink" id="resend" data-a="resend" disabled>Reenviar em 0:30</button></div>`})};};

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
  <div class="field" id="f-sTerms"><div class="row between g3"><span class="callout" style="color:var(--ink)">Aceito os termos de uso e a política de privacidade</span><button type="button" class="switch" role="switch" aria-checked="false" id="sTerms" aria-label="Aceitar termos" data-a="toggleTerms"></button></div><span class="hint" data-hint=""></span></div>
  </div>`,
 dock:`<button class="btn primary block" type="submit">Criar conta</button>`})};};

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

V.home=()=>{const up=upcoming();const r=ROLES[S.role];return{sb:'var(--ink)',tabs:'home',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${S.church.name}</p><h1 class="t1">Olá, ${esc(S.user.first)}!</h1></div><button class="avatar tap" style="${tone('ceu')};border:0" data-a="tab" data-v="mais" aria-label="Abrir perfil">${initials(S.user.name)}<span class="online"></span></button></div>`)}
 ${S.role==='visitante'?visitorCard():''}${S.role==='staff'?staffCard():''}${(()=>{const n=S.role==='visitante'?0:S.escalas.filter(x=>x.st==='pendente').length+S.discs.filter(x=>x.st==='pendente').length;return n?`<div class="pad" style="margin:-6px 0 20px"><button class="pendpill" data-a="goPending"><span class="pcount">${n}</span><span class="grow">${n>1?n+' respostas pendentes':'1 resposta pendente'} na agenda</span>${ic('chevR',16,2.25)}</button></div>`:'';})()}
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
   ${[['Agenda','tab','agenda',S.escalas.filter(x=>x.st==='pendente').length+S.discs.filter(x=>x.st==='pendente').length],['Grupos','tab','grupos',0],['Cursos','tab','cursos',0],['Oração','prayer','',0],['Contribuir','give','',0],['Ao vivo','sub','aoVivo','live']].map(j=>`<button class="jw" data-a="${j[1]}" data-v="${j[2]}"><span>${j[0]}</span>${j[3]==='live'?'<sup class="jlive" aria-label="ao vivo agora"></sup>':j[3]?`<sup aria-label="${j[3]} pendentes">${j[3]}</sup>`:''}</button>`).join('')}
  </nav>
  <section class="pad stack g3">
   <div class="row g3" style="align-items:stretch">
    <div class="cta gr-lima grow" style="color:#010f12"><div><h3>Contribuir</h3><p>Dízimos, ofertas e missões</p></div><button class="btn dark md" data-a="give">Contribuir</button></div>
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
  cells+=`<button class="${cls}" data-a="pickDay" data-v="${d}" aria-label="${d} de ${MONTHS[m-1]}${ev.length?', '+ev.length+(ev.length>1?' eventos':' evento'):''}${esc_?', você está escalado':''}${k===todayKey?', hoje':''}" ${d===sel?'aria-pressed="true"':''}><span class="n">${d}</span><span class="mk">${ev.slice(0,3).map(e=>`<i style="background:${MK[e.tone]||'var(--ink-muted)'}"></i>`).join('')}</span></button>`;}
 const tot=first+days;const trail=(7-tot%7)%7;for(let d=1;d<=trail;d++)cells+=`<span class="day out" aria-hidden="true"><span class="n">${d}</span></span>`;
 const cats=[...new Map(EVENTS.filter(e=>e.y===y&&e.m===m).map(e=>[e.cat,e.tone])).entries()];
 return `<div class="card cal" id="cal"><div class="cal-grid ${anim||''}" id="calGrid">${cells}</div>
  <div class="cal-foot">${cats.length?cats.map(([c,t])=>`<span class="lg"><i style="background:${MK[t]}"></i>${c}</span>`).join(''):'<span class="lg">Sem eventos neste mês</span>'}<span class="lg"><i class="lg-mine"></i>Sua escala</span></div></div>`;
}
const evRow=e=>`<button class="item" data-a="event" data-v="${e.id}">${dateblk(e,true)}<span class="grow stack" style="gap:2px"><span class="it-title">${esc(e.t)}</span><span class="it-sub">${e.h} · ${esc(e.p)}</span></span>${S.rsvp[e.id]?status('success','Vou'):tag(e.tone,e.cat,true)}</button>`;
function limUse(y,m){const l=S.escalas.filter(x=>x.y===y&&x.m===m&&x.st!=='recusado'),reg=l.filter(x=>!x.over).length,ex=l.filter(x=>x.over).length,pend=l.filter(x=>x.st==='pendente').length;return {reg,ex,pend,tot:l.length,lim:S.lim.church,pref:S.lim.pref};}
function limCard(){const y=2026,m=10,u=limUse(y,m),full=u.reg>=u.lim,mon=MONTHS[m-1];const cap=u.pref&&u.pref<u.lim?u.pref:u.lim;
 const sub=u.ex?`Você chegou no limite. ${u.ex===1?'1 convite chegou':u.ex+' convites chegaram'} como exceção: tudo bem recusar.`:full?'Você chegou no limite. Novos convites só chegam como exceção, com aviso.':u.lim-u.reg===1?'Falta 1 para o seu limite do mês.':`Cabem mais ${u.lim-u.reg} neste mês.`;
 return `<section class="lim-card ${u.ex?'ov':full?'full':''}" aria-label="Seu mês servindo"><div class="row between g3"><span class="eb2" style="color:inherit;opacity:.8">Seu mês servindo</span><span class="lim-mo">${mon}</span></div>
  <div class="row g3" style="align-items:flex-end"><span class="lim-big">${u.reg}<small>/${u.lim}</small></span><div class="lim-dots" aria-hidden="true">${Array.from({length:Math.max(u.lim,u.tot)},(_,i)=>`<i class="${i<u.reg?'on':i<u.lim?'':'ex'}${i>=cap&&i<u.lim?' pf':''}"></i>`).join('')}</div></div>
  <p class="lim-sub">${sub}</p>
  <div class="lim-foot"><span>${ic('users',14,2)}Limite da igreja: ${u.lim} por mês</span><button type="button" class="lim-pref" data-a="limPref">${ic('heart',14,2)}${u.pref?'Prefiro até '+u.pref:'Definir preferência'}</button></div></section>`;}
function agendaTab(){
 const t=S.ag.tab;
 if(t==='Eventos'){const {y,m,sel}=S.ag;const k=y*10000+m*100+sel;const day=EVENTS.filter(e=>evKey(e)===k);const nxt=EVENTS.filter(e=>evKey(e)>Math.max(k,todayKey-1)&&evKey(e)!==k).sort((a,b)=>evKey(a)-evKey(b)).slice(0,5);
  return `<div class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">${sel} de ${MONTHS[m-1]}${k===todayKey?' · hoje':''}</p>${day.length?`<div class="list">${day.map(evRow).join('')}</div>`:`<div class="card row g3" style="padding:16px;border-radius:var(--r-md)"><span class="iconbox" style="background:var(--surface-raised);color:var(--ink-muted)">${ic('calendar',20)}</span><span class="callout">Nada marcado para este dia.</span></div>`}</div>
   <div class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">Próximos</p>${nxt.length?`<div class="list">${nxt.map(evRow).join('')}</div>`:'<p class="callout">Nenhum evento depois desta data.</p>'}</div>`;}
 if(t==='Escalas'){return `${limCard()}<div class="stack g3"><p class="eb2">Minhas escalas de serviço</p>${S.escalas.map(x=>{const k=K(x.y,x.m,x.d),bl=blockedAt(k);return `<article class="card stack g3 ${x.over&&x.st!=='recusado'?'lim-ov':''}" style="padding:18px;border-radius:var(--r-lg)">
   <div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="t3">${x.min}</span><span class="it-sub">${x.area}</span></div>${x.st==='confirmado'?status('success','Confirmado'):x.st==='recusado'?status('danger','Recusado'):status('warning','Aguardando')}</div>
   <div class="callout" style="color:var(--ink)">Função: <b>${x.fn}</b> · ${fmtK(k)} · ${x.h}</div>
   ${x.over&&x.st!=='recusado'?`<div class="lim-note">${ic('alert',16,2.2)}<div><b>Acima do seu limite do mês</b><span>${x.st==='confirmado'?'Você topou servir além do limite. Obrigado!':`O líder pediu mesmo assim${x.why?': “'+esc(x.why)+'”':''}. Tudo bem recusar.`}</span></div></div>`:''}
   ${bl&&x.st!=='recusado'?`<div class="row g2 foot" style="color:var(--danger-text)">${ic('alert',14,2)}Conflita com seu bloqueio de ${fmtK(bl.a)}${bl.a!==bl.b?' a '+fmtK(bl.b):''}</div>`:''}
   ${x.st==='pendente'?`<div class="row g2"><button class="btn primary md grow" data-a="escalaOk" data-v="${x.id}">Confirmar</button><button class="btn outline md grow" data-a="escalaNo" data-v="${x.id}">Recusar</button></div>`:x.st==='confirmado'?`<button class="tlink" style="align-self:flex-start;padding:0" data-a="escalaNo" data-v="${x.id}">Não vou conseguir ir</button>`:''}
  </article>`;}).join('')}</div>`;}
 if(t==='Discipulado'){return `<div class="stack g3"><p class="eb2">Encontros de discipulado agendados</p>${S.discs.map(x=>{const k=K(x.y,x.m,x.d);return `<article class="card stack g3" style="padding:18px;border-radius:var(--r-lg)">
   <div class="row g3" style="align-items:flex-start"><span class="avatar" style="${tone(x.tone)}">${initials(x.who)}</span><div class="grow stack" style="gap:2px"><span class="it-title">${x.who}</span><span class="it-sub">${x.theme}</span></div>${x.st==='aceito'?status('success','Você aceitou'):x.st==='recusado'?status('danger','Recusado'):status('warning','Aguardando você')}</div>
   <div class="stack" style="gap:4px;padding-left:56px"><span class="callout row" style="gap:6px;color:var(--ink)">${ic('clock',15)}${fmtK(k)} · ${x.h}</span><span class="callout row" style="gap:6px">${ic(x.remote?'monitor':'pin',15)}${x.place}</span></div>
   ${x.st==='pendente'?`<div class="row g2"><button class="btn primary md grow" data-a="discOk" data-v="${x.id}">Aceitar</button><button class="btn outline md grow" data-a="discNo" data-v="${x.id}">Recusar</button></div>`:x.st==='aceito'&&x.remote?`<button class="tlink" style="align-self:flex-start;padding:0 0 0 56px" data-a="joinCall">Entrar na chamada</button>`:''}
  </article>`;}).join('')}</div>`;}
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
  ${S.role==='visitante'?'':`<div class="utabs" role="tablist">${['Eventos','Escalas','Discipulado','Disponibilidade'].map(t=>`<button role="tab" aria-selected="${S.ag.tab===t}" data-a="agTab" data-v="${t}">${t}</button>`).join('')}</div>`}
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
const MAIS_ITEMS=[['Meus dados','user','damasco','meusDados'],['Notificações','bell','ambar','notifs'],['Quem somos','church','brasa','quemSomos'],['Cuidado pastoral','care','rosado','cuidado'],['Contribuir','gift','lima','contribuir'],['Inscrições','ticket','laranja','inscricoes'],['Ao vivo','radio','brasa','aoVivo'],['Meus ministérios','flame','laranja','meusMin'],['Pedidos de oração','hands','vinho','oracao'],['Fale com a secretaria','phone','ceu','secretaria'],['Assistente no WhatsApp','message','salvia','assistente'],['Privacidade e dados','lock','oceano','privacidade']];
V.mais=()=>{const nN=S.notifs.filter(n=>n.unread).length,miss=[!S.me.nasc,!S.me.end].filter(Boolean).length,ins=S.insc.mine.length,prW=S.prayers.filter(p=>p.st==='aguardando').length,care=S.care.next&&S.care.next.st==='pendente';
 const row=(label,v,meta,hot)=>`<button class="mrow" data-a="sub" data-v="${v}"><span class="mt">${label}</span>${meta?`<span class="mm ${hot?'hot':''}">${meta}</span>`:''}<span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;
 const grp=(t,rows)=>`<section class="mgrp"><p class="eb2">${t}</p>${rows}</section>`;
 return{sb:'var(--ink)',tabs:'mais',html:`${appHead(`<button class="mhead" data-a="sub" data-v="meusDados"><span class="avatar lg" style="${tone('ceu')}">${initials(S.user.name)}</span><span class="stack" style="align-items:flex-start;gap:2px"><span class="t2">${esc(S.user.name)}</span><span class="callout">${S.church.name}</span></span></button>`)}
 <div class="pad stack g8" style="padding-top:16px">
  ${grp('Você',row('Meus dados','meusDados',miss?miss+' dados faltando':'')+row('Notificações','notifs',nN?nN+(nN>1?' novas':' nova'):'',nN>0)+row('Privacidade e dados','privacidade',''))}
  ${grp('Sua caminhada',(S.role==='visitante'?'':row('Meus ministérios','meusMin',MYMIN.length+' ministérios'))+row('Inscrições','inscricoes',ins?ins+(ins>1?' ativas':' ativa'):'')+row('Pedidos de oração','oracao',prW?prW+' aguardando':'')+row('Cuidado pastoral','cuidado',care?'Encontro a confirmar':'',care))}
  ${['lider','admin'].includes(S.role)?grp('Liderança',row('Casos urgentes','urgentes',URG.length+' abertos',true)):''}
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
const tabsFor=()=>S.role==='staff'?TABS.map(t=>t[0]==='cursos'?['checkin','scan','Check-in']:t):TABS;
const TABS=[['home','home','Início'],['agenda','calendar','Agenda'],['grupos','users','Grupos'],['cursos','book','Cursos'],['mais','dots','Mais']];
const APP=['home','agenda','grupos','cursos','curso','mais'];
let resendTimer=null,playTimer=null,expTimer=null;
function render(dir){
 clearInterval(playTimer);S.cu.playing=S.screen==='curso'?S.cu.playing:false;
 const out=V[S.screen]();const view=$('#view');
 const AMB={home:'home',agenda:'agenda',grupos:'grupos',cursos:'cursos',curso:'cursos',mais:'mais',church:'church',contribuir:'grupos',aoVivo:'home',quemSomos:'home',meusMin:'cursos',inscricoes:'home',assistente:'grupos',secretaria:'agenda',privacidade:'agenda'};
 view.innerHTML=`<div data-amb="${out.amb||AMB[S.screen]||(out.tabs==='mais'?'mais':'auth')}" class="screen ${out.tabs?'has-tabs':''} ${dir==='back'?'enter-back':dir==='none'?'':dir==='tab'?'enter-tab':'enter'}" id="scr">${out.html}</div>`;
 const sbar=$('.statusbar');sbar.style.setProperty('--sb',out.sb||'var(--ink)');sbar.style.setProperty('--sbbg','transparent');const scr=$('#scr');if(out.tabs)scr.addEventListener('scroll',()=>{sbar.style.setProperty('--sbbg',scr.scrollTop>40?'var(--glass)':'transparent');sbar.style.backdropFilter=scr.scrollTop>40?'blur(20px)':'none';},{passive:true});else sbar.style.backdropFilter='none';
 $('#tabbarSlot').innerHTML=out.tabs?`<nav class="tabbar" aria-label="Navegação principal">${tabsFor().map(t=>`<button class="tab" data-a="tab" data-v="${t[0]}" ${out.tabs===t[0]?'aria-current="page"':''}>${ic(t[1],24,out.tabs===t[0]?2.25:1.75)}${t[2]}</button>`).join('')}</nav>`:'';
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
function startResend(){clearInterval(resendTimer);let n=30;const b=$('#resend');if(!b)return;b.disabled=true;b.textContent='Reenviar em 0:30';resendTimer=setInterval(()=>{n--;if(!document.body.contains(b)){clearInterval(resendTimer);return;}b.textContent='Reenviar em 0:'+String(n).padStart(2,'0');if(n<=0){clearInterval(resendTimer);b.disabled=false;b.textContent='Reenviar código';}},1000);}
function startPlay(){let t=0;const pp=$('#pp'),pt=$('#pt');clearInterval(playTimer);playTimer=setInterval(()=>{if(!pp){clearInterval(playTimer);return;}t+=4;const pc=Math.min(t/760*100,100);pp.style.width=pc+'%';pt.textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0');if(pc>=100)clearInterval(playTimer);},250);}

/* ---------- sheets ---------- */
function eventSheet(id){
 const e=EVENTS.find(x=>x.id===id);const on=S.rsvp[e.id];
 sheet(`<div class="sheet-hero gr-${e.g}" style="margin-top:-10px;border-radius:var(--r-xl) var(--r-xl) 0 0">${tag(e.tone,e.cat,true)}<h3>${esc(e.t)}</h3><div class="row g4" style="font:400 15px/20px var(--font-text);flex-wrap:wrap"><span class="row" style="gap:4px">${ic('calendar',16)}${e.range||WD[dow(e.y,e.m,e.d)]+', '+e.d+' de '+MONTHS[e.m-1]}</span><span class="row" style="gap:4px">${ic('clock',16)}${e.h}</span><span class="row" style="gap:4px">${ic('pin',16)}${esc(e.p)}</span></div></div>
 <div class="stack g5"><p class="body">${DESC[e.cat]||''}</p>
  <div class="row between">${avs(4,(e.n+(on?1:0))+(e.sign?' inscritos':' confirmados'),'var(--surface-raised)')}${on?status('success',e.sign?'Inscrito':'Confirmado'):''}</div>
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
  <div class="servebox" id="serveBox">${serveBox(m,on)}</div><button class="btn secondary block talkbtn" data-a="talkLeader" data-v="m|${m.id}">${ic('message',18)}Falar com o líder</button></div>`);}
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
function forgotSheet(){sheet(`<form class="stack g5" data-submit="forgotSend" novalidate><div class="stack g2"><h3 class="t2">Redefinir senha</h3><p class="callout">Enviamos um link para você criar uma nova senha.</p></div>${field({id:'fEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:val('lEmail'),im:'email'})}<button class="btn primary block" type="submit">Enviar link</button></form>`);}
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
const A={
 go:v=>go(v),back,
 closeSheet:()=>closeSheet(),
 tab:v=>{ensureChurch();closeSheet();if(S.screen===v)return;S.hist=[];S.screen=v;render('tab');},
 reveal:(v,el)=>{const i=$('#'+v);const show=i.type==='password';i.type=show?'text':'password';el.innerHTML=ic(show?'eyeOff':'eye',el.closest('.bigwrap')?22:20,1.75);el.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');el.setAttribute('aria-pressed',show);const n=i.value.length;i.focus();try{i.setSelectionRange(n,n)}catch(_){}},
 forgot:()=>forgotSheet(),
 startSignup:()=>go('signupStart'),
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
 pickChurch:async(v,el)=>{if(el&&el.classList){$$('.chrow').forEach(c=>c.classList.toggle('dim',c!==el));el.classList.add('chosen');await wait(380);}S.church=CHURCHES.find(c=>c.id===v);overlayLoading('Entrando em '+S.church.name+'…');await wait(1000);S.hist=[];S.screen=S.role==='staff'?'checkin':'home';$('#overlay').innerHTML='';render();},
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
 escalaOk:async(v,el)=>{const x=S.escalas.find(e=>e.id===v);const k=K(x.y,x.m,x.d);if(blockedAt(k)){toast('error','Essa data está bloqueada','Remova o bloqueio em Disponibilidade para confirmar.');return;}await busy(el,600,null,'Confirmado');x.st='confirmado';$('#agBody').innerHTML=agendaTab();const u=limUse(x.y,x.m);toast('success','Escala confirmada',x.over?'Obrigado por topar! Essa foi uma exceção ao seu limite de '+MONTHS[x.m-1]+'.':u.reg>=u.lim&&u.pend===0?x.min+' · '+fmtK(k)+'. Você fechou seu mês: '+u.reg+' de '+u.lim+'.':x.min+' · '+fmtK(k)+' · '+x.h+'.');},
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
  if(!p){setErr('lPass','Informe sua senha.');ok=false;}else if(p.length<6){setErr('lPass','A senha tem pelo menos 6 caracteres.');ok=false;}
  if(!ok)return;const btn=$('button[type=submit]',f);await busy(btn,1100);
  if(p.toLowerCase()==='errada'){setErr('lPass','Senha incorreta.');toast('error','E-mail ou senha incorretos','Tente de novo ou entre com código por e-mail.');return;}
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
 async createAccount(f){let ok=true;const n=val('sNome'),s=val('sSobre'),e=val('sEmail'),p=$('#sPass').value,t=$('#sTerms').getAttribute('aria-checked')==='true';
  if(!n){setErr('sNome','Informe seu nome.');ok=false;}
  if(!s){setErr('sSobre','Informe seu sobrenome.');ok=false;}
  if(!e){setErr('sEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('sEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}else if(e.toLowerCase()==='teste@example.org'&&!(S.prefill&&S.prefill.found)){setErr('sEmail','Este e-mail já tem conta. Volte e entre com ele.');ok=false;}
  if(!p){setErr('sPass','Crie uma senha.');ok=false;}else if(p.length<8||!/[a-z]/i.test(p)||!/\d/.test(p)){setErr('sPass','Use 8 caracteres ou mais, com letras e números.');ok=false;}
  if(!t){setErr('sTerms','Aceite os termos para continuar.');ok=false;}
  if(!ok){toast('error','Revise os campos destacados','');return;}
  await busy($('button[type=submit]',f),1300,null,'Conta criada');S.user={first:n,name:n+' '+s};S.email=e;S.role='membro';toast('success','Conta criada','Bem-vindo ao Alva, '+n+'!');go('church');},
 async forgotSend(f){const e=val('fEmail');if(!e){setErr('fEmail','Informe seu e-mail.');return;}if(!EMAIL_RE.test(e)){setErr('fEmail','Digite um e-mail válido, como nome@email.com.');return;}
  await busy($('button[type=submit]',f),1000,null,'Link enviado');await closeSheet();toast('success','Link enviado','Confira a caixa de entrada de '+e+'.');}
};
/* ---------- delegation ---------- */
const phone=$('#phone');
phone.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||!phone.contains(el))return;
 if(el.dataset.self&&e.target!==el)return;const fn=A[el.dataset.a];if(!fn)return;e.preventDefault();e.stopPropagation();fn(el.dataset.v,el);});
phone.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-a]')){e.preventDefault();e.target.click();}if(e.key==='Escape'&&$('#overlay .scrim'))closeSheet();});
phone.addEventListener('submit',e=>{const f=e.target;e.preventDefault();const fn=F[f.dataset.submit];if(fn)fn(f);});
phone.addEventListener('input',e=>{if(e.target.id)clearErr(e.target.id);});

/* ---------- rail ---------- */
const RAIL=[['welcome','Boas-vindas'],['login','Entrar com senha'],['codeEmail','Entrar com código'],['otp','Digite o código'],['signupStart','Já tem cadastro?'],['lookup','Identificação'],['pickRecord','Qual cadastro é o seu?'],['confirmEmail','Confirmar e-mail'],['noEmail','Cadastro sem e-mail'],['identity','Identidade confirmada'],['signupForm','Criar conta'],['church','Escolher igreja'],['home','Início'],['agenda','Agenda'],['grupos','Grupos'],['cursos','Cursos'],['curso','Aula do curso'],['cursoDone','Curso concluído'],['mais','Mais']];
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
 me:{nome:'Rafael Pereira',email:'rafael@alvaigreja.com.br',tel:'(11) 99123-4455',nasc:'',end:'',upd:'12/03/2026'},meEdit:false,
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
V.meusDados=()=>{const m=S.me;const row=(l,v,ph)=>`<div class="kr stack2"><span>${l}</span><span${v?'':' style="color:var(--ink-muted);font-weight:400"'}>${v?esc(v):ph}</span></div>`;
 if(!S.meEdit)return sub('Meus dados','',`
  <div class="row g4"><span class="avatar lg" style="${tone('ceu')}">${initials(m.nome)}</span><div class="stack" style="gap:4px"><span class="t3">${esc(m.nome)}</span><span class="foot">Atualizado em ${m.upd}</span></div></div>
  <div class="kv">${row('Nome completo',m.nome)}${row('E-mail',m.email)}${row('Telefone',m.tel)}${row('Data de nascimento',m.nasc,'Não informado')}${row('Endereço',m.end,'Não informado')}</div>
  ${(!m.nasc||!m.end)?`<div class="panel" style="animation:none"><div class="ph"><span class="bang">!</span><div><b>Faltam ${[!m.nasc,!m.end].filter(Boolean).length} dados</b><p>Com aniversário e endereço, sua Casa de Apascentamento consegue te visitar e celebrar com você.</p></div></div></div>`:''}
  <div class="kv"><div class="kh"><span>Na igreja</span><span>definido pela secretaria</span></div><div class="kr"><span>Igreja</span><span>${S.church.name}</span></div><div class="kr"><span>Perfil</span><span>${ROLES[S.role][0]}</span></div></div>
  <button class="btn primary block" data-a="meEdit">Editar dados</button>`);
 return sub('Editar dados','Seus dados ficam visíveis só para a liderança da sua igreja.',`<form class="stack g4" data-submit="saveMe" novalidate>
  ${field({id:'mNome',label:'Nome completo',val:m.nome,ac:'name'})}
  ${field({id:'mEmail',label:'E-mail',type:'email',val:m.email,im:'email'})}
  ${field({id:'mTel',label:'Telefone',type:'tel',val:m.tel,im:'tel',max:15})}
  ${field({id:'mNasc',label:'Data de nascimento',val:m.nasc,ph:'dd/mm/aaaa',im:'numeric',max:10})}
  ${field({id:'mEnd',label:'Endereço',val:m.end,ph:'Rua, número · bairro, cidade'})}
  <div class="stack g3" style="margin-top:8px"><button class="btn primary block" type="submit">Salvar alterações</button><button type="button" class="tlink" data-a="meCancel">Cancelar</button></div></form>`);};

/* 2. Notificações */
V.notifs=()=>{const n=S.notifs.filter(x=>x.unread).length;const grps=['Hoje','Esta semana','Anteriores'];
 return {sb:'var(--ink)',tabs:'mais',html:`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button><button class="iconbtn" data-a="notif" aria-label="Preferências de notificação">${ic('sliders',19,1.9)}</button></div><h1 class="big" style="margin-top:18px">Notificações</h1>
  <div class="row between" style="margin-top:8px;min-height:28px"><span class="lede" style="margin:0">${n?`<b style="color:var(--ink)">${n}</b> ${n>1?'novas':'nova'}`:'Tudo em dia'}</span>${n?`<button class="link" data-a="readAll">Marcar como lidas</button>`:''}</div></header>
 <div class="pad stack g6" style="padding-top:4px">
  ${grps.map(g=>{const l=S.notifs.filter(x=>x.grp===g);return l.length?`<section class="stack"><p class="eb2" style="margin-bottom:4px">${g}</p><div class="chlist">${l.map(x=>`<button class="nrow ${x.unread?'unread':''}" data-a="openNotif" data-v="${x.id}"><span class="ndot" aria-hidden="true"></span><span class="grow stack" style="gap:3px"><span class="row between" style="gap:12px;align-items:baseline"><span class="nt">${esc(x.t)}</span><span class="nwhen">${x.when.split(' · ').pop()}</span></span><span class="chm">${esc(x.s)}</span></span></button>`).join('')}</div></section>`:'';}).join('')}
 </div>`};};

/* 3. Quem somos */
V.quemSomos=()=>sub('Quem somos','',`
  <div class="qs-hero gr-aurora"><p>Um lugar para encontrar Deus, crescer em comunidade e ser enviado.</p></div>
  <div class="stack g4"><p class="body" style="color:var(--ink)">A Igreja Alva nasceu em 2012 com um propósito simples: ser um lugar onde pessoas encontram Deus, crescem em comunidade e são enviadas para transformar o mundo ao redor.</p><p class="body">Desde então, vimos centenas de vidas transformadas pelo Evangelho em São Paulo e região.</p></div>
  <div class="stats">${[['2012','fundação'],['1.240','membros na Sede'],['3','igrejas'],['48','Casas ativas']].map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
  <section class="stack g3"><p class="eb2">Nossos valores</p><ol class="steps"><li>Presença de Deus</li><li>Comunidade autêntica</li><li>Discipulado intencional</li><li>Missão local e global</li></ol></section>
  <section class="stack g3"><p class="eb2">Conecte-se</p><div class="socials">${[['Instagram','@igrejaalva','18,4 mil','instagram.com/igrejaalva'],['TikTok','@igrejaalva','6,2 mil','tiktok.com/@igrejaalva'],['Facebook','Igreja Alva','9,8 mil','facebook.com/igrejaalva']].map(r=>`<a class="soc" href="https://${r[3]}" target="_blank" rel="noopener" data-a="social" data-v="${r[0]}"><span class="sn">${r[0]}</span><span class="sh">${r[1]}</span><span class="sf">${r[2]} seguidores</span><span class="sa" aria-hidden="true">${ic('arrowR',16,2)}</span></a>`).join('')}</div></section>
  <section class="stack g3"><p class="eb2">Onde estamos</p><div class="list">${CHURCHES.map(c=>`<div class="item" style="cursor:default"><span class="iconbox" style="${tone(c.tone)};font:800 17px/1 var(--font-display)">A</span><span class="grow stack" style="gap:2px"><span class="it-title">${c.name}</span><span class="it-sub">${c.city} · cultos aos domingos</span></span></div>`).join('')}</div></section>`);

/* 4. Cuidado pastoral */
V.cuidado=()=>{const c=S.care,nx=c.next;return sub('Cuidado pastoral','Passando por um momento difícil ou precisa conversar com um pastor? Conte um pouco aqui e alguém da equipe pastoral entra em contato.',`
  <form class="stack g4" data-submit="sendCare" novalidate>
   ${field({id:'cText',label:'Como podemos te ajudar?',area:true,ph:'Conte o que está acontecendo',max:600,hint:'Só o pastor responsável lê.'})}
   <div class="stack g2"><span class="eb2">Urgência</span><div class="seg" id="urgSeg">${['Normal','Urgente'].map(u=>`<button type="button" aria-selected="${c.urg===u}" data-a="urg" data-v="${u}">${u}</button>`).join('')}</div>
   ${c.urg==='Urgente'?`<p class="foot" style="margin:4px 0 0">Respondemos pedidos urgentes no mesmo dia. Em risco imediato, ligue 188 (CVV) ou 192 (SAMU).</p>`:''}</div>
   <button class="btn primary block" type="submit">Solicitar atendimento</button>
  </form>
  ${nx?`<section class="stack g3"><p class="eb2">Meu próximo encontro</p><article class="card stack g3" style="padding:18px"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="it-title">${nx.who}</span><span class="it-sub">${nx.when} · ${nx.remote?'Remoto':'Presencial'}</span></div>${nx.st==='aceito'?status('success','Confirmado'):nx.st==='recusado'?status('danger','Recusado'):status('warning','Aguardando você')}</div>
   ${nx.st==='pendente'?`<div class="row g2"><button class="btn primary md grow" data-a="careOk">Aceitar</button><button class="btn outline md grow" data-a="careNo">Recusar</button></div>`:nx.st==='aceito'?`<p class="foot" style="margin:0">O link da chamada aparece aqui 15 minutos antes.</p>`:`<p class="foot" style="margin:0">Avisamos o pastor. Ele vai propor outro horário.</p>`}</article></section>`:''}
  <section class="stack g3"><p class="eb2">Meus atendimentos</p><p class="foot" style="margin:-4px 0 0">Casos em aberto, urgentes primeiro. O histórico completo fica no painel web.</p>
   <div class="list">${[...c.list].sort((a,b)=>(a.st==='urgente'?0:1)-(b.st==='urgente'?0:1)).map(x=>`<div class="item" style="cursor:default;align-items:flex-start;padding-block:14px"><span class="grow stack" style="gap:2px"><span class="it-title">${esc(x.t)}</span><span class="it-sub">${x.d} · ${x.who}</span></span>${x.st==='urgente'?status('danger','Urgente'):x.st==='novo'?status('info','Recebido'):status('info','Em andamento')}</div>`).join('')}</div></section>`);};

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
   <button class="item" data-a="dlData"><span class="grow stack" style="gap:2px"><span class="it-title">Baixar meus dados</span><span class="it-sub">Enviamos um arquivo por e-mail</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
   <button class="item" data-a="policy"><span class="grow stack" style="gap:2px"><span class="it-title">Política de privacidade</span><span class="it-sub">Atualizada em março de 2026</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
   <button class="item" data-a="delAcc"><span class="grow stack" style="gap:2px"><span class="it-title" style="color:var(--danger-text)">Solicitar exclusão da conta</span><span class="it-sub">Apaga seu acesso e seus dados pessoais</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
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
 sub:v=>{ensureChurch();go(v);},
 give:()=>{ensureChurch();go('contribuir');},prayer:()=>{ensureChurch();go('oracao');},whats:()=>go('assistente'),
 mood:(v,el)=>{S.mood=S.mood===v?null:v;$$('#moods .moodt').forEach(c=>c.setAttribute('aria-checked',c.dataset.v===S.mood));const a=$('#moodAfter');a.innerHTML=moodAfter();a.classList.remove('swap');void a.offsetWidth;a.classList.add('swap');},
 inscr:()=>go('inscricoes'),
 meEdit:()=>{S.meEdit=true;softRender();},meCancel:()=>{S.meEdit=false;softRender();},
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
 async saveMe(f){let ok=true;const n=val('mNome'),e=val('mEmail'),t=val('mTel'),d=val('mNasc');
  if(n.split(' ').filter(Boolean).length<2){setErr('mNome','Informe nome e sobrenome.');ok=false;}
  if(!EMAIL_RE.test(e)){setErr('mEmail','Esse e-mail parece incompleto. Ex.: nome@email.com');ok=false;}
  if(t.replace(/\D/g,'').length<10){setErr('mTel','Use DDD + número.');ok=false;}
  if(d){const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);const dt=m&&new Date(+m[3],+m[2]-1,+m[1]);if(!m||dt.getDate()!==+m[1]||dt>new Date(2026,8,29)||+m[3]<1900){setErr('mNasc','Data inválida. Use dd/mm/aaaa.');ok=false;}}
  if(!ok)return;await busy($('button[type=submit]',f),900,null,'Salvo');Object.assign(S.me,{nome:n,email:e,tel:t,nasc:d,end:val('mEnd'),upd:'29/09/2026'});S.user={first:n.split(' ')[0],name:n};S.meEdit=false;softRender();toast('success','Dados atualizados','');},
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
RAIL.push(...[['meusDados','Mais › Meus dados'],['notifs','Mais › Notificações'],['quemSomos','Mais › Quem somos'],['cuidado','Mais › Cuidado pastoral'],['contribuir','Mais › Contribuir'],['inscricoes','Mais › Inscrições'],['aoVivo','Mais › Ao vivo'],['meusMin','Mais › Meus ministérios'],['oracao','Mais › Pedidos de oração'],['secretaria','Mais › Secretaria'],['assistente','Mais › Assistente'],['privacidade','Mais › Privacidade']]);
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');

/* =========================================================
   STAFF DE EVENTOS › Check-in  ·  cenários por tipo de usuário
   ========================================================= */
I.scan='<path d="M17 12v4a1 1 0 0 1-1 1h-4"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 8V7"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M7 17h.01"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="5" height="5" rx="1"/>';
I.maximize='<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>';
APP.push('checkin','checkinEv');
const PEOPLE=['Ana Souza','Bruno Lima','Carla Reis','Davi Melo','Elisa Prado','Felipe Costa','Gabriela Nunes','Heitor Alves','Isabela Rocha','João Pedro Santos','Larissa Martins','Mateus Oliveira','Natália Ferreira','Otávio Ribeiro','Paula Mendes','Rafael Pereira'];
const mkList=(n,done,seed)=>Array.from({length:n},(_,i)=>{const nm=PEOPLE[(i+seed)%PEOPLE.length];return {id:seed+'-'+i,n:nm,e:nm.split(' ')[0].toLowerCase()[0]+'***@email.com',code:'#'+String(240+i*7+seed).padStart(4,'0'),at:i<done?`${19+Math.floor(i/40)}h${String((2+i*3)%60).padStart(2,'0')}`:null};});
const CK=[
 {id:'c1',t:'Culto + Batismo',when:'Hoje · 19h30',type:'Evento único',total:120,g:'mar',today:true,list:mkList(16,9,0),base:39},
 {id:'c2',t:'12 Horas de Oração',when:'Hoje · 5h às 17h',type:'Por período',slots:['5h–9h','9h–13h','13h–17h'],total:36,g:'vinho',today:true,list:mkList(12,7,3),base:14},
 {id:'c3',t:'Retiro de Jovens 2026',when:'17 a 19 out',type:'Por período',slots:['Sex 17','Sáb 18','Dom 19'],total:60,g:'lima',list:mkList(12,0,6),base:0},
 {id:'c4',t:'Conferência de Missões',when:'Sáb, 7 nov',type:'Evento único',total:42,g:'brasa',list:mkList(12,0,9),base:0}
];
const ckDone=ev=>ev.base+ev.list.filter(p=>p.at).length;
Object.assign(S,{ck:{open:'c1',mode:'qr',slot:0,q:'',recent:[]}});

V.checkin=()=>{const today=CK.filter(e=>e.today),next=CK.filter(e=>!e.today);
 const row=ev=>{const d=ckDone(ev),p=Math.round(d/ev.total*100);return `<button class="ckrow" data-a="ckOpen" data-v="${ev.id}"><span class="grow stack" style="gap:6px"><span class="row between" style="gap:10px;align-items:baseline"><span class="chn" style="font-size:22px;line-height:26px">${ev.t}</span><span class="cktype">${ev.type}</span></span><span class="chm">${ev.when}</span><span class="row g3" style="margin-top:4px"><span class="bar grow"><i style="width:${p}%"></i></span><b class="ckcount">${d}<span>/${ev.total}</span></b></span></span></button>`;};
 return {sb:'var(--ink)',tabs:'checkin',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Staff de eventos</p><h1 class="t1">Check-in</h1><p class="callout">Escolha o evento para confirmar a entrada.</p></div>`,['#008582','#07486e'])}
 <div class="pad stack g6">
  <section class="stack"><p class="eb2" style="margin-bottom:4px">Acontecendo hoje</p><div class="chlist">${today.map(row).join('')}</div></section>
  <section class="stack"><p class="eb2" style="margin-bottom:4px">Próximos</p><div class="chlist">${next.map(row).join('')}</div></section>
 </div>`};};

function ckPanel(ev){const m=S.ck.mode;
 if(m==='qr')return `<div class="scanner" id="scanner"><span class="sc tl"></span><span class="sc tr"></span><span class="sc bl"></span><span class="sc br"></span><span class="scline"></span><p class="schint">Aponte para o QR Code da inscrição</p><div class="scres" id="scres" aria-live="assertive"></div></div>
  <div class="stack g2"><p class="eb2">Simular leitura</p><div class="row g2" style="flex-wrap:wrap"><button class="chip" data-a="ckSim" data-v="ok">Código válido</button><button class="chip" data-a="ckSim" data-v="dup">Já utilizado</button><button class="chip" data-a="ckSim" data-v="bad">De outro evento</button></div></div>
  ${S.ck.recent.length?`<section class="stack"><p class="eb2" style="margin-bottom:4px">Últimas entradas</p><div class="chlist">${S.ck.recent.slice(0,5).map(r=>`<div class="prow" style="padding:12px 0"><span class="avatar" style="${tone('lima')};width:34px;height:34px;font-size:12px">${initials(r.n)}</span><span class="grow stack" style="gap:1px"><span class="pt" style="font-size:16px">${esc(r.n)}</span><span class="chm">${r.code}</span></span><span class="nwhen">${r.at}</span></div>`).join('')}</div></section>`:''}`;
 if(m==='totem')return `<div class="totem gr-${ev.g}"><p class="eb2" style="color:inherit;opacity:.85">Modo autoatendimento</p><div class="qr" style="align-self:center">${qrSVG('totem-'+ev.id)}</div><p class="mask" style="margin:0;text-align:center;color:inherit;opacity:.85">ALVA-TOTEM-${ev.id.toUpperCase()}</p><button class="btn onmedia md" style="align-self:center" data-a="ckTotem">Abrir em tela cheia</button></div>
  <section class="stack g3"><p class="eb2">Como funciona</p><ol class="steps"><li>O membro abre Mais › Inscrições no app Alva.</li><li>Aponta a câmera para o QR Code do totem.</li><li>O check-in é confirmado na hora.</li><li>A impressora libera a pulseira ou o crachá.</li></ol></section>`;
 const q=S.ck.q.toLowerCase();const l=ev.list.filter(p=>!q||p.n.toLowerCase().includes(q)||p.code.includes(q));
 return `<div class="fbox" style="min-height:52px">${ic('search',20)}<input id="ckQ" type="search" placeholder="Nome, e-mail ou nº da inscrição" value="${esc(S.ck.q)}" aria-label="Buscar inscrito"></div>
  <div id="ckList">${ckListHTML(ev,l)}</div>`;}
function ckListHTML(ev,l){if(!l.length)return `<div class="empty"><span class="it-title" style="color:var(--ink)">Ninguém com esse nome</span><span class="callout">Confira a grafia ou busque pelo número da inscrição.</span></div>`;
 return `<div class="chlist">${l.map(p=>`<div class="prow"><span class="avatar" style="${tone(p.at?'lima':'menta')};width:36px;height:36px;font-size:12px">${initials(p.n)}</span><span class="grow stack" style="gap:1px"><span class="pt" style="font-size:16px">${esc(p.n)}</span><span class="chm">${p.code} · ${p.e}</span></span>${p.at?`<span class="ckdone">${ic('check',14,2.75)}${p.at}</span>`:`<button class="btn inverse sm" data-a="ckManual" data-v="${p.id}">Check-in</button>`}</div>`).join('')}</div>`;}

V.checkinEv=()=>{const ev=CK.find(e=>e.id===S.ck.open);const d=ckDone(ev),p=Math.round(d/ev.total*100);
 return {sb:'var(--ink)',tabs:'checkin',html:`${appHead(`<button class="iconbtn" data-a="back" aria-label="Voltar para eventos">${ic('chevL',20,2.25)}</button>
  <div class="stack g2" style="margin-top:14px"><p class="eyebrow">${ev.type} · ${ev.when}</p><h1 class="t1">${ev.t}</h1></div>
  <div class="ckhero"><div class="stack" style="gap:0"><b class="cknum" id="ckNum">${d}</b><span class="callout">de ${ev.total} confirmados</span></div><div class="ring" style="--p:${p}"><span>${p}%</span></div></div>`,['#008582','#07486e'])}
 <div class="pad stack g5">
  ${ev.slots?`<div class="row g2" style="flex-wrap:wrap">${ev.slots.map((s,i)=>`<button class="chip" aria-pressed="${S.ck.slot===i}" data-a="ckSlot" data-v="${i}">${s}</button>`).join('')}</div>`:''}
  <div class="seg" role="tablist">${[['qr','Ler QR Code'],['totem','Totem'],['busca','Buscar pessoa']].map(t=>`<button role="tab" aria-selected="${S.ck.mode===t[0]}" data-a="ckMode" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
  <div class="stack g5" id="ckPanel">${ckPanel(ev)}</div>
 </div>`};};
HOOK.checkinEv=function(){const q=$('#ckQ');if(q)q.addEventListener('input',()=>{S.ck.q=q.value;const ev=CK.find(e=>e.id===S.ck.open);const qq=q.value.toLowerCase();$('#ckList').innerHTML=ckListHTML(ev,ev.list.filter(p=>!qq||p.n.toLowerCase().includes(qq)||p.code.includes(qq)));});};

function ckBump(ev){const d=ckDone(ev),p=Math.round(d/ev.total*100);const n=$('#ckNum');if(n){n.textContent=d;n.classList.remove('bump');void n.offsetWidth;n.classList.add('bump');}const r=$('.ckhero .ring');if(r){r.style.setProperty('--p',p);$('span',r).textContent=p+'%';}}
const nowHM=()=>{const t=new Date();return t.getHours()+'h'+String(t.getMinutes()).padStart(2,'0');};
function scanResult(kind,title,sub){const r=$('#scres');if(!r)return;r.className='scres '+kind;r.innerHTML=`<span class="scicon">${ic(kind==='ok'?'check':kind==='dup'?'clock':'x',30,2.75)}</span><b>${esc(title)}</b><span>${esc(sub)}</span>`;clearTimeout(r._t);r._t=setTimeout(()=>{r.className='scres';},2300);}

Object.assign(A,{
 ckOpen:v=>{S.ck.open=v;S.ck.mode='qr';S.ck.slot=0;S.ck.q='';S.ck.recent=[];go('checkinEv');},
 ckMode:v=>{S.ck.mode=v;$$('.seg [data-a=ckMode]').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));const pnl=$('#ckPanel');pnl.innerHTML=ckPanel(CK.find(e=>e.id===S.ck.open));pnl.classList.remove('swap');void pnl.offsetWidth;pnl.classList.add('swap');HOOK.checkinEv();},
 ckSlot:(v,el)=>{S.ck.slot=+v;$$('[data-a=ckSlot]').forEach(b=>b.setAttribute('aria-pressed',b===el));},
 ckSim:v=>{const ev=CK.find(e=>e.id===S.ck.open);const sc=$('#scanner');sc.classList.remove('flash');void sc.offsetWidth;sc.classList.add('flash');
  setTimeout(()=>{if(v==='ok'){const p=ev.list.find(x=>!x.at);if(!p){scanResult('dup','Todos já entraram','Não há inscrições pendentes neste evento.');return;}p.at=nowHM();S.ck.recent.unshift({n:p.n,code:p.code,at:p.at});scanResult('ok',p.n,'Inscrição '+p.code+' · entrada liberada');ckBump(ev);
    const pnl=$('#ckPanel');setTimeout(()=>{if(S.screen==='checkinEv'&&S.ck.mode==='qr'){pnl.innerHTML=ckPanel(ev);}},2400);}
   else if(v==='dup'){const p=ev.list.find(x=>x.at);scanResult('dup',p?p.n:'Inscrição repetida','Já fez check-in às '+(p?p.at:'19h02')+'. Não libere nova pulseira.');}
   else scanResult('bad','Código de outro evento','Este QR Code é da Conferência de Missões.');},450);},
 ckManual:async(v,el)=>{const ev=CK.find(e=>e.id===S.ck.open);const p=ev.list.find(x=>x.id===v);await busy(el,700,null,'Feito');p.at=nowHM();S.ck.recent.unshift({n:p.n,code:p.code,at:p.at});const q=(S.ck.q||'').toLowerCase();$('#ckList').innerHTML=ckListHTML(ev,ev.list.filter(x=>!q||x.n.toLowerCase().includes(q)||x.code.includes(q)));ckBump(ev);toast('success','Entrada confirmada',p.n+' · '+p.code);},
 ckTotem:()=>{const ev=CK.find(e=>e.id===S.ck.open);const o=$('#overlay');
  o.innerHTML=`<div class="totemfull gr-${ev.g}"><p class="eb2" style="color:inherit;opacity:.85">${ev.t}</p><h2 class="big" style="color:inherit;text-align:center;margin:0">Aponte a câmera<br>do app Alva</h2><div class="qr">${qrSVG('totem-'+ev.id)}</div><div class="totemcount"><b id="tNum">${ckDone(ev)}</b><span>de ${ev.total} já entraram</span></div><div class="totemhi" id="tHi" aria-live="polite"></div><button class="btn onmedia md" data-a="ckTotemClose">Sair do modo totem</button></div>`;
  clearInterval(S._tt);S._tt=setInterval(()=>{const p=ev.list.find(x=>!x.at);const t=$('#tNum');if(!p||!t){clearInterval(S._tt);return;}p.at=nowHM();S.ck.recent.unshift({n:p.n,code:p.code,at:p.at});t.textContent=ckDone(ev);t.classList.remove('bump');void t.offsetWidth;t.classList.add('bump');const h=$('#tHi');h.innerHTML=`<span>${ic('check',16,2.75)}Bem-vindo, ${esc(p.n.split(' ')[0])}!</span>`;h.classList.remove('in');void h.offsetWidth;h.classList.add('in');},3200);},
 ckTotemClose:()=>{clearInterval(S._tt);$('#overlay').innerHTML='';softRender();}
});

/* ---------- home cards per role ---------- */
function visitorCard(){return `<div class="pad" style="margin:-4px 0 22px"><div class="vcard gr-aurora"><p class="eb2" style="color:#fff;opacity:.85">Primeira vez por aqui?</p><p class="vtitle">Que bom ter você com a gente.</p><p style="margin:0;font:400 15px/20px var(--font-text);color:rgba(255,255,255,.88)">O melhor jeito de conhecer a Alva é numa Casa de Apascentamento perto de você.</p><div class="row g2" style="margin-top:6px"><button class="btn dark md" data-a="tab" data-v="grupos">Encontrar uma Casa</button><button class="btn onmedia md" data-a="sub" data-v="quemSomos">Quem somos</button></div></div></div>`;}
function staffCard(){const ev=CK.find(e=>e.today);const d=ckDone(ev);return `<div class="pad" style="margin:-4px 0 22px"><button class="scard" data-a="ckOpenHome" data-v="${ev.id}"><span class="grow stack" style="gap:4px"><span class="eb2">Seu turno de hoje</span><span class="chn" style="font-size:22px">${ev.t}</span><span class="chm">${ev.when} · ${d} de ${ev.total} entradas</span></span><span class="ring sm" style="--p:${Math.round(d/ev.total*100)}"><span>${Math.round(d/ev.total*100)}%</span></span></button></div>`;}
A.ckOpenHome=v=>{S.ck.open=v;S.ck.mode='qr';S.ck.recent=[];S.hist=['checkin'];S.screen='checkinEv';render('tab');};

/* ---------- role switching + demo scenarios ---------- */
function roleApply(){if(S.role==='visitante')S.ag.tab='Eventos';if(S.role!=='staff'&&(S.screen==='checkin'||S.screen==='checkinEv')){S.hist=[];S.screen='home';render('tab');return;}if(APP.includes(S.screen))softRender();}
const SCN={
 visitante:()=>{S.user={first:'Lucas',name:'Lucas Almeida'};S.role='visitante';S.me.nome='Lucas Almeida';S.ag.tab='Eventos';return 'home';},
 membro:()=>{S.user={first:'Rafael',name:'Rafael Pereira'};S.role='membro';S.me.nome='Rafael Pereira';return 'home';},
 staff:()=>{S.user={first:'Marina',name:'Marina Castro'};S.role='staff';S.me.nome='Marina Castro';return 'checkin';}
};
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Cenários por tipo de usuário</span><div class="rail-nav" id="scnUsers"><button type="button" data-v="visitante">Visitante · primeiro acesso</button><button type="button" data-v="membro">Membro · agenda e escalas</button><button type="button" data-v="staff">Staff de eventos · check-in</button></div>`;
 sec.parentNode.insertBefore(box,sec);
 $('#scnUsers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.church=S.church||CHURCHES[0];const scr=SCN[b.dataset.v]();$('#overlay').innerHTML='';S.hist=[];S.screen=scr;render('tab');});
 RAIL.push(['checkin','Staff › Check-in'],['checkinEv','Staff › Evento (leitor)']);
 $('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
 $('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.s==='checkin'||b.dataset.s==='checkinEv'){if(S.role!=='staff'){S.role='staff';S.user={first:'Marina',name:'Marina Castro'};}if(b.dataset.s==='checkinEv')S.hist=['checkin'];setTimeout(()=>render('none'),0);}},true);
})();

/* ---------- Liderança › Casos urgentes ---------- */
APP.push('urgentes');SUBS.push('urgentes');
const URG=[{id:'u1',who:'Maria Santos',kind:'Hospital',tone:'vinho',d:'16/09/2026',txt:'Internada no Hospital São Paulo. Cirurgia programada para sexta.',resp:'Pr. Marcos Lima',upd:'Atualizado há 2 dias'},
 {id:'u2',who:'Pedro Almeida',kind:'Oração',tone:'ambar',d:'14/09/2026',txt:'Pediu oração pela família depois de perder o emprego. Casa Centro acompanhando.',resp:'Pr. Marcos Lima',upd:'Atualizado há 5 dias'},
 {id:'u3',who:'Joana Ribeiro',kind:'Visita',tone:'oceano',d:'12/09/2026',txt:'Mora sozinha e pediu visita depois da alta médica. Prefere as manhãs.',resp:'Diac. Ana Costa',upd:'Atualizado há 1 semana'}];
S.urgOpen='u1';
V.urgentes=()=>({sb:'var(--ink)',tabs:S.role==='staff'?'checkin':'mais',html:`${subHead('Casos urgentes','Consulta rápida. Para editar, agendar ou encerrar um caso, use o painel admin.')}
 <div class="pad stack g5" style="padding-top:8px">
  <div class="chlist">${URG.map(u=>{const o=S.urgOpen===u.id;return `<div class="urg ${o?'open':''}"><button class="urg-h" data-a="urgToggle" data-v="${u.id}" aria-expanded="${o}"><span class="chdot" style="background:${MK[u.tone]||'var(--ink-muted)'}"></span><span class="grow stack" style="gap:2px"><span class="chn" style="font-size:22px;line-height:26px">${u.who}</span><span class="chm">${u.kind} · ${u.d}</span></span><span class="chev acc-c">${ic('chevR',18,2)}</span></button>
   ${o?`<div class="urg-b"><p class="body" style="color:var(--ink);margin:0">${esc(u.txt)}</p><div class="stack" style="gap:2px"><span class="chm">Responsável: <b style="color:var(--ink)">${u.resp}</b></span><span class="foot">${u.upd}</span></div><button class="btn outline md" style="align-self:flex-start" data-a="admin">Abrir no painel</button></div>`:''}</div>`;}).join('')}</div>
  <p class="foot" style="margin:0;text-align:center">Só líderes e administradores veem esta lista.</p>
 </div>`});
A.urgToggle=v=>{S.urgOpen=S.urgOpen===v?null:v;softRender();};
RAIL.push(['urgentes','Liderança › Casos urgentes']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
$('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.dataset.s==='urgentes'&&!['lider','admin'].includes(S.role)){S.role='lider';}},true);

render('none');
})();
