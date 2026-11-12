/* ================= Mercado Social =================
   Módulo do grupo de vendas, copiado da Loja (mesmas telas: Visão geral, Itens, Categorias, Vendas, Caixa diário,
   Divergências e Movimentações), sem o que é só da Loja (pedidos do app, vitrine do app). Só existe no web e no PDV;
   não vai ao app do usuário nem ao app administrativo. Centro de custo próprio no Financeiro.
   As telas são as da Loja (screens-loja.js), que recebem a chave do módulo; aqui ficam os dados de exemplo e o menu. */
Object.assign(I,{cart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'});
FOOD_STORES.social={name:'Mercado Social',icon:'cart',tone:'salvia',c:'#52837a',
 cats:[{id:'merc',name:'Mercearia',tone:'damasco',c:'#bb7136',ic:'box'},{id:'hig',name:'Higiene e limpeza',tone:'ceu',c:'#07486e',ic:'droplet'},{id:'beb',name:'Bebidas',tone:'menta',c:'#0ea5a4',ic:'cupSoda'}],
 items:[
  ['Arroz 5 kg','merc',2890,30,'7892000100010'],['Feijão 1 kg','merc',850,42,'7892000100027'],['Macarrão 500 g','merc',420,60,'7892000100034'],['Açúcar 1 kg','merc',540,35,'7892000100041'],
  ['Óleo de soja 900 ml','merc',790,28,'7892000100058'],['Café 500 g','merc',1690,18,'7892000100065'],['Sabão em pó 1 kg','hig',1450,12,'7892000200017'],['Sabonete','hig',230,70,'7892000200024'],
  ['Creme dental','hig',590,24,'7892000200031'],['Leite 1 L','beb',560,40,'7892000300014'],['Suco de caixa 1 L','beb',720,16,'7892000300021']
 ].map(([name,cat,price,stock,barcode],i)=>({id:'ms'+(i+1),sku:'MS-'+String(i+1).padStart(3,'0'),barcode,name,cat,price,stock,min:8,active:true,desc:''}))};
(()=>{const st=FOOD_STORES.social,its=st.items,T=['09:15','10:05','11:20','14:30','15:10','16:45'],W=['Rafael Pereira','Camila Sousa','Lucas Mendes'],M=['Pix','Dinheiro','Pix','Cartão','Dinheiro'];let k=0;
 for(let month=4;month<=9;month++){const mm=String(month).padStart(2,'0'),days=new Date(2026,month,0).getDate();
  for(let day=1;day<=days;day++){const date=`2026-${mm}-${String(day).padStart(2,'0')}`;if(date>FOOD_DATE)break;const w=new Date(date+'T12:00').getDay(),n=w===0?0:w===6?3:1+(day%2);
   for(let j=0;j<n;j++){k++;const a=its[(day+j*2+month)%its.length],b=its[(day+j+4)%its.length],lines=[a,b].filter((x,ix,ar)=>ar.indexOf(x)===ix).map((it,ix)=>({item:it.id,name:it.name,cat:it.cat,qty:1+((day+ix+j)%3===0?1:0),price:it.price})),gross=lines.reduce((t,l)=>t+l.qty*l.price,0),discount=k%11===0?Math.round(gross*.1):0,cancelled=k%29===0;
    const s={id:`MS-${mm}${String(day).padStart(2,'0')}-${j+1}`,store:'social',date,time:T[(day+j)%T.length],status:cancelled?'cancelled':'completed',lines,total:gross-discount,discount,who:W[k%W.length],method:M[k%M.length],reason:cancelled?'Cliente desistiu':''};
    FOOD_SALES.push(s);lines.forEach(l=>FOOD_MOVES.push({id:'mv-'+s.id+'-'+l.item,store:'social',item:l.item,date,kind:'sale',qty:-l.qty,reason:s.id}));
    if(cancelled)lines.forEach(l=>FOOD_MOVES.push({id:'rv-'+s.id+'-'+l.item,store:'social',item:l.item,date,kind:'refund',qty:l.qty,reason:s.id+' · cliente desistiu'}));}}
  its.forEach((it,i)=>{if((month+i)%3===0)FOOD_MOVES.push({id:`in-${it.id}-${mm}`,store:'social',item:it.id,date:`2026-${mm}-${String(3+i).padStart(2,'0')}`,kind:'entry',qty:10+((month*3+i*5)%20),reason:['Doação · campanha de alimentos','Compra · Atacadão','Doação · membros'][i%3]});});}
 its.forEach(it=>{const delta=FOOD_MOVES.filter(m=>m.store==='social'&&m.item===it.id).reduce((s,m)=>s+m.qty,0);FOOD_MOVES.push({id:'open-'+it.id,store:'social',item:it.id,date:'2026-04-01',kind:'entry',qty:it.stock-delta,reason:'Saldo inicial'});});
})();
FOOD_SALES.filter(x=>x.store==='social').forEach((x,i)=>{if(i%7===3&&!x.buyer)x.buyer=MEMBERS[(i*3)%MEMBERS.length].n;});
FOOD_DIV.social=[
 {id:'social-d1',t:'neg',title:`${FOOD_STORES.social.items[6].name} ficou com saldo −2`,sub:'Vendas do PDV passaram do estoque. Ajuste o saldo.',item:FOOD_STORES.social.items[6].id},
 {id:'social-d2',t:'price',title:`${FOOD_STORES.social.items[0].name}: R$ 26,90 cobrado no PDV, R$ 28,90 no cadastro`,sub:'O preço cobrado foi mudado à mão no PDV. Confira qual vale.',item:FOOD_STORES.social.items[0].id}
];
FOOD_STORES.social.items[6].stock=-2;
const SOCIAL_PAGES={vis:nxShopOverview,sales:nxShopSales,cash:nxShopCash,moves:nxShopMoves,items:shopItems,cats:shopCategories,div:shopDivPage};
/* menu: entra logo depois da Loja, com as mesmas telas e sem "Pedidos do app" */
{const grp=NAV.find(g=>g[1].some(i=>i[0]==='shop'));
 if(grp){const at=grp[1].findIndex(i=>i[0]==='shop'),shop=grp[1][at];
  if(!grp[1].some(i=>i[0]==='social')){const copy=shop.slice();copy[0]='social';copy[1]='cart';copy[2]='Mercado Social';
   copy[3]=shop[3].filter(x=>x[0]!=='shop-orders').map(([id,l])=>['social-'+id.slice(5),l]);grp[1].splice(at+1,0,copy);}}}
