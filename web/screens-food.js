/* Cafeteria e Restaurante: demonstração local, sem integração ou caixa de venda. */
const FOOD_DATE='2026-09-30';
const FOOD_STORES={
 cafe:{name:'Cafeteria',icon:'coffee',tone:'damasco',cats:[['salg','Salgados','damasco'],['bolo','Bolos','rosado'],['lan','Lanches','lima'],['agua','Água','ceu'],['beb','Bebidas','menta'],['doc','Doces','salvia']],items:[['Coxinha','salg',700,32],['Pão de queijo','salg',500,8],['Bolo de cenoura · fatia','bolo',800,12],['Sanduíche natural','lan',1200,14],['Pipoca · porção','lan',500,0],['Água mineral 500 ml','agua',400,80],['Refrigerante · lata','beb',600,36],['Café expresso','beb',500,45],['Bombom','doc',300,24]]},
 rest:{name:'Restaurante',icon:'chef',tone:'menta',cats:[['alm','Almoço','damasco'],['mar','Marmitas','lima'],['sob','Sobremesas','rosado'],['agua','Água','ceu'],['beb','Bebidas','menta']],items:[['Almoço · prato completo','alm',3900,46],['Marmita completa','mar',2900,18],['Pudim · porção','sob',900,7],['Mousse de maracujá','sob',800,10],['Água mineral 500 ml','agua',400,65],['Refrigerante · lata','beb',600,28],['Suco natural · copo','beb',800,20]]}
};
const FOOD_SALES=[],FOOD_MOVES=[];
let foodSequence=0;
Object.entries(FOOD_STORES).forEach(([key,store],si)=>{
 store.cats=store.cats.map(([id,name,tone])=>({id,name,tone}));
 store.items=store.items.map(([name,cat,price,stock],i)=>({id:key+'-item-'+i,name,cat,price,stock,min:10,active:true,sku:(si?'RE':'CF')+'-'+String(i+1).padStart(3,'0')}));
 for(let month=4;month<=9;month++)for(let day=1;day<=30;day++){
  const date=`2026-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  for(let turn=0;turn<3;turn++){
   const idx=(day+turn+month)%store.items.length,second=(idx+3)%store.items.length;
   const lines=[idx,second].map((ix,j)=>{const it=store.items[ix];return {item:it.id,name:it.name,cat:it.cat,qty:1+(day+turn+j)%3,price:it.price};});
   const status=day===12&&turn===0?'cancelled':day===21&&turn===1?'cancelled':'completed';
   const method=status==='refunded'?'Pix':['Pix','Cartão','Pix','Dinheiro'][(day+turn)%4];
   const total=lines.reduce((n,l)=>n+l.qty*l.price,0),pending=month===9&&day>=28&&method==='Cartão'&&status==='completed';
   FOOD_SALES.push({id:(si?'RE':'CF')+'-'+String(++foodSequence).padStart(4,'0'),store:key,date,time:`${si?12+turn:16+turn}:${String(10+(day%4)*10).padStart(2,'0')}`,lines,status,method,total,fee:method==='Cartão'?Math.round(total*.025):0,settled:!pending,settlement:pending?'2026-10-02':date});
  }
 }
 store.items.forEach((it,i)=>{
  const sold=FOOD_SALES.filter(s=>s.store===key&&s.status!=='cancelled').flatMap(s=>s.lines).filter(l=>l.item===it.id).reduce((n,l)=>n+l.qty,0);
  FOOD_MOVES.push({id:'opening-'+it.id,store:key,item:it.id,date:'2026-04-01',kind:'entry',qty:it.stock+sold-20,reason:'Saldo inicial'});
  FOOD_MOVES.push({id:'supply-'+it.id,store:key,item:it.id,date:'2026-09-25',kind:'entry',qty:20,reason:'Compra / reposição'});
 });
});
Object.assign(S,{foodMode:'month',foodMonth:'2026-09',foodDay:FOOD_DATE,foodCat:'all',foodQuery:'',foodStatus:'all',foodMethod:'all',foodItemF:'all',foodMv:'all',foodRows:20});
const foodMoney=n=>R$(n/100);
const foodStore=()=>S.active.startsWith('shop-')?'shop':S.active.startsWith('rest-')?'rest':'cafe';
const foodCat=(k,id)=>FOOD_STORES[k].cats.find(c=>c.id===id)||{name:'Sem categoria',tone:'salvia'};
const foodItem=(k,id)=>FOOD_STORES[k].items.find(i=>i.id===id);
const foodAmount=a=>a.reduce((n,s)=>n+s.total,0);
const foodPeriod=s=>S.foodMode==='day'?s.date===S.foodDay:s.date.startsWith(S.foodMonth);
/* itens vendidos no totem, saldo negativo, origem das vendas e divergências de exemplo */
const foodOrigin=s=>s.app?'App':s.totemNo?'Totem':'Balcão';
function foodSeedItems(k,si){const st=FOOD_STORES[k];st.items.forEach((it,i)=>{if(i<4){it.totem=true;it.totemCode='TT-'+(si+1)+String(i+1).padStart(2,'0');}});if(st.items[2])st.items[2].stock=-2;}
FOOD_SALES.forEach((s,i)=>{if(s.method!=='Dinheiro'&&i%2===0)s.totemNo='T-'+String(2000+i);});
Object.keys(FOOD_STORES).forEach((k,si)=>foodSeedItems(k,si));
const FOOD_DIV_T={neg:['Estoque negativo','bad','alert'],line:['Linha sem item','warn','box'],price:['Preço diferente','info','tag']};
const FOOD_DIV={};
function foodDivSeed(k){const st=FOOD_STORES[k],a=st.items[2],b=st.items[4]||st.items[0],m=x=>(x/100).toLocaleString('pt-BR',{minimumFractionDigits:2});
 return [
  {id:k+'-d1',t:'neg',title:`${a.name} ficou com saldo −2`,sub:'Vendas do totem e do balcão passaram do estoque. Ajuste o saldo.',item:a.id},
  {id:k+'-d2',t:'line',title:k==='rest'?'Almoço executivo (pedido do totem T-2041)':k==='shop'?'Chaveiro Alva (pedido do totem T-2058)':'Suco de uva 300 ml (pedido do totem T-2033)',sub:'O totem vendeu uma linha que não existe no cadastro. A venda foi registrada como veio.',came:k==='rest'?{name:'Almoço executivo',price:3200,totemCode:'T3302'}:k==='shop'?{name:'Chaveiro Alva',price:1500,totemCode:'T3303'}:{name:'Suco de uva 300 ml',price:650,totemCode:'T3301'}},
  {id:k+'-d3',t:'price',title:`${b.name}: R$ ${m(b.price+200)} no totem, R$ ${m(b.price)} no cadastro`,sub:'O preço da venda difere do preço do item. Confira qual vale.',item:b.id}
 ];}
['cafe','rest'].forEach(k=>{FOOD_DIV[k]=foodDivSeed(k);});

const foodFiltered=(k)=>FOOD_SALES.filter(s=>s.store===k&&foodPeriod(s));
const foodValid=a=>a.filter(s=>s.status==='completed');
const foodSummary=a=>{const v=foodValid(a),paid=v.filter(s=>s.settled);return {sold:foodAmount(v),count:v.length,units:v.flatMap(s=>s.lines).reduce((n,l)=>n+l.qty,0),received:paid.reduce((n,s)=>n+s.total-s.fee,0),pending:v.filter(s=>!s.settled).reduce((n,s)=>n+s.total-s.fee,0),fees:paid.reduce((n,s)=>n+s.fee,0),refund:foodAmount(a.filter(s=>s.status==='refunded'))};};
/* ---------- Cafeteria e Restaurante · interface no padrão do Almoxarifado ---------- */
Object.assign(I,{
 croissant:'<path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"/><path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"/><path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"/><path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"/><path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"/>',
 cake:'<circle cx="9" cy="7" r="2"/><path d="M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"/><path d="M16 13H3"/><path d="M16 17H3"/>',
 sandwich:'<path d="m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777"/><path d="M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25"/><path d="M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9"/><path d="m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/><rect width="20" height="4" x="2" y="11" rx="1"/>',
 cupSoda:'<path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/><path d="M5 8h14"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/><path d="m12 8 1-6h2"/>',
 cookie:'<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>',
 utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 3 2h3Zm0 0v7"/>',
 soup:'<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/>',
 iceCream:'<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"/><path d="M17 7A5 5 0 0 0 7 7"/><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"/>',
 pix:'<path d="m12 3 4.5 4.5L12 12 7.5 7.5Z"/><path d="M3 12l4.5-4.5L12 12l-4.5 4.5Z"/><path d="m12 12 4.5-4.5L21 12l-4.5 4.5Z"/><path d="m12 12 4.5 4.5L12 21l-4.5-4.5Z"/>',
 card:'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
 cash:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>'
});
/* cada categoria ganha cor e ícone, como no almoxarifado */
const FOOD_LOOK={salg:['#c25a12','croissant'],bolo:['#db2777','cake'],lan:['#84a516','sandwich'],agua:['#2f7de1','droplet'],beb:['#0ea5a4','cupSoda'],doc:['#7c3aed','cookie'],alm:['#c25a12','utensils'],mar:['#1f9a52','soup'],sob:['#db2777','iceCream']};
const FOOD_ICONS=['croissant','cake','sandwich','cookie','iceCream','utensils','soup','cupSoda','droplet','coffee','chef','box'];
Object.assign(FOOD_STORES.cafe,{c:'#c25a12'});Object.assign(FOOD_STORES.rest,{c:'#1f9a52'});
Object.values(FOOD_STORES).forEach(st=>st.cats.forEach(c=>{const l=FOOD_LOOK[c.id]||['#475569','box'];c.c=l[0];c.ic=l[1];}));
const FOOD_PAY={Pix:['pix','#0ea5a4'],'Cartão':['card','#2f7de1'],Dinheiro:['cash','#1f9a52']};
const FOOD_ST={ok:['var(--st-int)','var(--st-int-bg)'],warn:['var(--st-sol)','var(--st-sol-bg)'],bad:['var(--st-rec)','var(--st-rec-bg)'],off:['var(--ink-muted)','var(--surface-2)'],info:['var(--brand-text)','var(--brand-soft)']};
const foodPill=(label,kind='ok')=>`<span class="stp" style="--c:${FOOD_ST[kind][0]};--b:${FOOD_ST[kind][1]}"><i></i>${esc(label)}</span>`;
const foodStatus=s=>foodPill({completed:'Concluída',cancelled:'Cancelada'}[s.status],s.status==='completed'?'ok':'off');
const foodItemSt=i=>!i.active?['Inativo','off']:i.stock<0?['Negativo','bad']:!i.stock?['Esgotado','bad']:i.stock<=i.min?['Estoque baixo','warn']:['Disponível','ok'];
const foodCatK=c=>({c:c.c,ic:c.ic,n:c.name});
const foodEmpty=txt=>`<div class="mempty"><p>${txt}</p><span>Escolha outro período ou ajuste os filtros.</span></div>`;
const foodKpis=rows=>`<section class="card kpis4 rise" style="--d:1">${rows.map(([a,b,c,col])=>`<div class="k4"><span class="kl">${a}</span><span class="kv"${col?` style="color:${col}"`:''}>${b}</span><span class="kd">${c}</span></div>`).join('')}</section>`;
const foodPeriodTxt=()=>S.foodMode==='day'?dBR(S.foodDay):monthName(S.foodMonth);
const foodWd=d=>['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'][new Date(d+'T12:00').getDay()];
const foodDayLabel=d=>{const x=new Date(d+'T12:00:00Z');const w=wd(d);return w[0].toUpperCase()+w.slice(1)+', '+x.getUTCDate()+' de '+MONTHS[x.getUTCMonth()];};
function foodToolbar(){const day=S.foodMode==='day',cur=day?S.foodDay===FOOD_DATE:S.foodMonth===FOOD_DATE.slice(0,7);
 return `<div class="fi-mbar fd-tb rise" style="--d:1"><div class="mp"><button class="ibtn" data-a="foodStep" data-v="-1" aria-label="${day?'Dia anterior':'Mês anterior'}">${ic('chevL',16,2)}</button>
  <div class="fd-pkw"><button type="button" class="mp-btn fd-pick" data-a="foodPkMenu" aria-haspopup="dialog">${ic('calendar',16)}<b>${day?foodDayLabel(S.foodDay):monthName(S.foodMonth)}</b>${cur?`<em>${day?'último dia':'mês atual'}</em>`:''}${ic('chevD',14,2)}</button><div class="pop fd-pk" id="fdPk" role="dialog" aria-label="Escolher período"></div></div>
  <button class="ibtn" data-a="foodStep" data-v="1" aria-label="${day?'Próximo dia':'Próximo mês'}">${ic('chevR',16,2)}</button></div>
  <div class="segc" role="group" aria-label="Período"><button data-a="foodMode" data-v="day" aria-pressed="${day}">Por dia</button><button data-a="foodMode" data-v="month" aria-pressed="${!day}">Por mês</button></div>
  ${cur?'':`<button class="lnk" data-a="foodToday">Voltar para ${day?'o último dia':'o mês atual'}</button>`}</div>`;}
const FDPK={y:+FOOD_DATE.slice(0,4),v:FOOD_DATE.slice(0,7)};
function foodPkPaint(){const p=$('#fdPk');if(!p)return;const day=S.foodMode==='day',last=FOOD_DATE.slice(0,7);
 if(!day){const y=FDPK.y;p.innerHTML=`<div class="fd-pk-h"><button type="button" class="ibtn sm" data-a="foodPkNav" data-v="-1" aria-label="Ano anterior">${ic('chevL',14,2)}</button><b>${y}</b><button type="button" class="ibtn sm" data-a="foodPkNav" data-v="1" aria-label="Próximo ano" ${y>=+last.slice(0,4)?'disabled':''}>${ic('chevR',14,2)}</button></div>
  <div class="fd-pk-m">${MONTHS.map((m,i)=>{const ym=`${y}-${String(i+1).padStart(2,'0')}`;return `<button type="button" class="${ym===S.foodMonth?'on':''} ${ym===last?'cur':''}" data-a="foodPkPick" data-v="${ym}" ${ym>last?'disabled':''}>${m.slice(0,3).replace(/^./,c=>c.toUpperCase())}</button>`;}).join('')}</div>
  <div class="fd-pk-f"><button type="button" class="lnk" data-a="foodPkPick" data-v="${last}">Mês atual</button></div>`;return;}
 const v=FDPK.v,[y,m]=v.split('-').map(Number),n=new Date(y,m,0).getDate(),off=new Date(y,m-1,1).getDay(),k=foodStore(),has=new Set(FOOD_SALES.filter(x=>x.store===k&&x.date.startsWith(v)).map(x=>x.date));
 p.innerHTML=`<div class="fd-pk-h"><button type="button" class="ibtn sm" data-a="foodPkNav" data-v="-1" aria-label="Mês anterior">${ic('chevL',14,2)}</button><b>${monthName(v)}</b><button type="button" class="ibtn sm" data-a="foodPkNav" data-v="1" aria-label="Próximo mês" ${v>=last?'disabled':''}>${ic('chevR',14,2)}</button></div>
  <div class="fd-pk-w">${['D','S','T','Q','Q','S','S'].map(x=>`<span>${x}</span>`).join('')}</div>
  <div class="fd-pk-d">${'<span></span>'.repeat(off)}${Array.from({length:n},(_,i)=>{const d=`${v}-${String(i+1).padStart(2,'0')}`;return `<button type="button" class="${d===S.foodDay?'on':''} ${d===FOOD_DATE?'cur':''} ${has.has(d)?'has':''}" data-a="foodPkPick" data-v="${d}" ${d>FOOD_DATE?'disabled':''}>${i+1}</button>`;}).join('')}</div>
  <div class="fd-pk-f"><span class="fd-pk-lg"><i></i>dia com vendas</span><button type="button" class="lnk" data-a="foodPkPick" data-v="${FOOD_DATE}">Último dia</button></div>`;}

function foodPage(){const k=foodStore(),page=S.active.split('-')[1],M={cafe:CAFE_PAGES,rest:REST_PAGES,shop:SHOP_PAGES}[k];return (M[page]||M.vis)(k);}
function foodHead(k,title,subtitle,actions='',bar=''){const st=FOOD_STORES[k];return `<header class="ph rise"><div><p class="eb">${esc(st.name)}</p><h1>${title}</h1><p class="lede">${subtitle}</p></div>${actions?`<div class="pact">${actions}</div>`:''}</header>${bar}`;}

const foodSel=(id,label,opts,val)=>`<label class="fd-sel">${ic('sliders',14)}<select id="${id}" aria-label="${label}">${opts.map(([a,b])=>`<option value="${a}" ${val===a?'selected':''}>${b}</option>`).join('')}</select>${ic('chevD',13,2)}</label>`;
const foodChips=(act,cur,list)=>`<div class="chips">${list.map(([v,l,n])=>`<button class="chipf ${cur===v?'on':''}" data-a="${act}" data-v="${v}">${l}<small>${n}</small></button>`).join('')}</div>`;
const foodMore=(n,total,noun)=>`<div class="tfoot"><span>${total} ${noun}</span>${total>n?`<button class="lnk" data-a="foodMore">Mostrar mais</button>`:''}</div>`;

const FOOD_MVT={refund:['Estorno','undo','var(--st-sol)','var(--st-sol-bg)'],entry:['Entrada','arrowR','var(--st-int)','var(--st-int-bg)'],sale:['Venda','ticket','var(--brand-text)','var(--brand-soft)'],correction:['Correção','scale','var(--ink-muted)','var(--surface-2)'],loss:['Perda','alert','var(--st-rec)','var(--st-rec-bg)']};

function foodAfter(){const bind=(id,fn)=>{const el=$('#'+id);if(el)el.onchange=e=>{fn(e.target.value);S.foodRows=20;render();};};bind('foodPeriod',v=>{if(v)S[S.foodMode==='day'?'foodDay':'foodMonth']=v;});bind('foodCategory',v=>S.foodCat=v);bind('foodMethod',v=>S.foodMethod=v);
 const pk=$('#foodPeriod');if(pk)pk.closest('.fd-pick').onclick=e=>{if(e.target!==pk){e.preventDefault();try{pk.showPicker();}catch(_){pk.focus();}}};
 const q=$('#foodSearch');if(q)q.oninput=e=>{S.foodQuery=e.target.value;const pos=e.target.selectionStart;render();const n=$('#foodSearch');n.focus();n.setSelectionRange(pos,pos);};}

const FOODA={foodPkMenu:()=>{const p=$('#fdPk');if(!p)return;const open=!p.classList.contains('open');closePops(p);if(open){FDPK.y=+(S.foodMonth||FOOD_DATE).slice(0,4);FDPK.v=(S.foodDay||FOOD_DATE).slice(0,7);foodPkPaint();}p.classList.toggle('open',open);},
 foodPkNav:v=>{if(S.foodMode==='day'){const [y,m]=FDPK.v.split('-').map(Number),d=new Date(y,m-1+(+v),1);FDPK.v=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}else FDPK.y+=+v;foodPkPaint();},
 foodPkPick:v=>{if(v.length===7){S.foodMode='month';S.foodMonth=v;}else{S.foodMode='day';S.foodDay=v;}S.foodRows=20;closePops();render();},
 foodToday:()=>{S.foodDay=FOOD_DATE;S.foodMonth=FOOD_DATE.slice(0,7);S.foodRows=20;render();},foodSt:v=>{S.foodStatus=v;S.foodRows=20;render();},foodItF:v=>{S.foodItemF=v;render();},foodMv:v=>{S.foodMv=S.foodMv===v?'all':v;S.foodRows=20;render();},foodMenu:v=>{const p=$('#fdPop-'+v);closePops(p);p.classList.toggle('open');},
 
 
 foodStep:v=>{if(S.foodMode==='month'){S.foodMonth=ymAdd(S.foodMonth,+v);}else{const d=new Date(S.foodDay+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+Number(v));S.foodDay=d.toISOString().slice(0,10);}S.foodRows=20;render();},foodGo:v=>{const [k,p]=v.split('|');S.foodQuery='';S.foodCat='all';S.foodStatus='all';S.foodMethod='all';S.foodItemF='all';S.foodMv='all';S.foodRows=20;closeDlg();A.nav(k+'-'+p);},foodMode:v=>{S.foodMode=v;S.foodRows=20;render();},foodMore:()=>{S.foodRows+=30;render();},foodDaySales:v=>{const[k,d]=v.split('|');S.foodMode='day';S.foodDay=d;FOODA.foodGo(k+'|sales');},};

