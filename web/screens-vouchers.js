/* ================= Vouchers dos módulos de venda =================
   Submenu "Vouchers" em Loja, Cafeteria, Restaurante e Mercado Social (em Eventos o voucher segue como aba da inscrição).
   O voucher é de um módulo só (código único por módulo), de alcance geral nas vendas: sem voucher por pessoa.
   Quem tem Admin do módulo cria, edita e pausa; o PDV baixa os ativos e aplica na venda mesmo sem internet.
   No código real é o kernel Vouchers; aqui são dados de exemplo. */
const VCH={cafe:[],rest:[],shop:[],social:[]};
const VCH_ROW=(k,id,code,name,type,value,from,to,limit,uses,disc,paused)=>VCH[k].push({id:k+'-v'+id,code,name,type,value,from,to,limit,uses,disc,paused:!!paused});
VCH_ROW('shop',1,'BEMVINDO10','Boas-vindas · 10%','p',10,'2026-08-01','2026-12-31',null,12,18400);
VCH_ROW('shop',2,'LIVRO5','Campanha do livro · R$ 5','v',500,'2026-09-01','2026-10-09',null,31,15500);
VCH_ROW('shop',3,'VOLUNTARIO20','Voluntários · 20%','p',20,'2026-07-01','2027-01-31',null,4,9900);
VCH_ROW('shop',4,'NATAL15','Natal · 15%','p',15,'2025-12-01','2026-09-27',null,60,64200);
VCH_ROW('shop',5,'PAUSADO30','Promoção pausada · 30%','p',30,'2026-09-01','2026-12-31',null,0,0,true);
VCH_ROW('shop',6,'UNICO50','Cortesia · R$ 50 (1 uso)','v',5000,'2026-09-10','2026-10-30',1,1,5000);
VCH_ROW('social',1,'SOCIAL5','Mercado · R$ 5','v',500,'2026-09-01','2026-10-20',null,8,4000);
VCH_ROW('social',2,'CESTA10','Cesta básica · 10%','p',10,'2026-09-15','2026-12-15',200,41,23800);
VCH_ROW('cafe',1,'CAFE2','Segunda do café · R$ 2','v',200,'2026-09-01','2026-12-31',null,27,5400);
VCH_ROW('cafe',2,'EQUIPE15','Equipe · 15%','p',15,'2026-06-01','2027-06-01',null,9,6100);
VCH_ROW('rest',1,'ALMOCO10','Almoço da família · 10%','p',10,'2026-09-01','2026-11-30',null,18,13200);
VCH_ROW('rest',2,'VOLUNTARIO','Voluntários do culto · 25%','p',25,'2026-07-01','2027-01-31',null,14,25100);
const vchStatus=v=>v.paused?['Pausado','off']:(v.to&&v.to<FOOD_DATE)?['Vencido','bad']:(v.limit!=null&&v.uses>=v.limit)?['Esgotado','warn']:v.from>FOOD_DATE?['Agendado','info']:['Ativo','ok'];
const vchValue=v=>v.type==='p'?v.value+'%':foodMoney(v.value);
const vchNote={shop:'Códigos de desconto para o caixa, o PDV e o pedido pelo app.',social:'Códigos de desconto para o caixa e o PDV do mercado.',cafe:'Códigos de desconto para o caixa e o PDV da cafeteria.',rest:'Códigos de desconto para o caixa e o PDV do restaurante.'};
Object.assign(S,{vchSt:'all'});
function vchPage(k){
 const all=VCH[k],q=norm(S.foodQuery),st=S.vchSt,in7=v=>!v.paused&&v.to&&v.to>=FOOD_DATE&&v.to<=new Date(new Date(FOOD_DATE+'T12:00').getTime()+7*864e5).toISOString().slice(0,10);
 const list=all.filter(v=>(st==='all'||(st==='ativo'&&vchStatus(v)[0]==='Ativo')||(st==='pausado'&&v.paused)||(st==='vencido'&&['Vencido','Esgotado'].includes(vchStatus(v)[0])))&&(!q||norm(v.code+' '+v.name).includes(q)));
 const ativos=all.filter(v=>vchStatus(v)[0]==='Ativo');
 const cnt=x=>all.filter(v=>x==='all'||(x==='ativo'&&vchStatus(v)[0]==='Ativo')||(x==='pausado'&&v.paused)||(x==='vencido'&&['Vencido','Esgotado'].includes(vchStatus(v)[0]))).length;
 return foodHead(k,'Vouchers',vchNote[k],`<button class="btn pri" data-a="vchNew" data-v="${k}">${ic('plus',15,2.2)}Novo voucher</button>`)+
  foodKpis([['Ativos',ativos.length,'valem agora'],['Usos',all.reduce((n,v)=>n+v.uses,0),'desde o início'],['Desconto concedido',foodMoney(all.reduce((n,v)=>n+v.disc,0)),'em todas as campanhas'],['Vencem em 7 dias',all.filter(in7).length,'confira a validade',all.some(in7)?'var(--st-sol)':'']])+
  `<section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="foodSearch" value="${esc(S.foodQuery)}" placeholder="Buscar por código ou campanha" autocomplete="off"></label>${foodChips('vchSt',st,[['all','Todos',cnt('all')],['ativo','Ativos',cnt('ativo')],['pausado','Pausados',cnt('pausado')],['vencido','Vencidos e esgotados',cnt('vencido')]])}</div>
  ${list.length?`<div class="trow fd-vc thead"><span>Código</span><span>Campanha</span><span>Desconto</span><span>Validade</span><span>Usos</span><span>Situação</span><span></span></div>${list.map(v=>{const [sl,sk]=vchStatus(v);return `<div class="trow fd-vc" data-a="vchEdit" data-v="${k}|${v.id}"><span class="vc-code">${esc(v.code)}</span><span class="dkt"><b>${esc(v.name)}</b></span><span>${vchValue(v)}</span><span>${v.to?'até '+dBR(v.to).slice(0,5)+(in7(v)?' · '+foodPill('em breve','warn'):''):'sem data final'}</span><span>${v.uses}${v.limit!=null?' de '+v.limit:''}</span><span>${foodPill(sl,sk)}</span><span class="vc-act"><button class="btn sec sm" data-a="vchToggle" data-v="${k}|${v.id}">${v.paused?'Ativar':'Pausar'}</button></span></div>`;}).join('')}`:foodEmpty('Nenhum voucher corresponde ao filtro.')}</section>`;
}
function vchForm(k,id){
 const v=id?VCH[k].find(x=>x.id===id):{code:'',name:'',type:'p',value:'',from:FOOD_DATE,to:'',limit:null};
 let type=v.type;const val0=id?(v.type==='p'?v.value:v.value/100):'';
 openDlg(`${dlgHead(id?'Editar voucher':'Novo voucher','O código vale só neste módulo. Para tirar de circulação, pause.')}<form class="fgrid" id="vchF" novalidate style="grid-template-columns:1fr 1fr">
  <label class="fld wide"><span class="fl">Código</span><input name="code" class="mono" value="${esc(v.code)}" maxlength="20" placeholder="Ex.: PASCOA10" autocomplete="off" style="text-transform:uppercase" ${id?'readonly':''}><span class="err"></span></label>
  <label class="fld wide"><span class="fl">Campanha</span><input name="name" value="${esc(v.name)}" maxlength="40" placeholder="Ex.: Páscoa · 10%" autocomplete="off"><span class="err"></span></label>
  <div class="fld"><span class="fl">Desconto</span><div class="pos-disc"><div class="segc"><button type="button" data-vt="v" aria-pressed="${type==='v'}">R$</button><button type="button" data-vt="p" aria-pressed="${type==='p'}">%</button></div><input name="disc" type="number" min="1" step="any" inputmode="decimal" placeholder="0" value="${val0}"></div><span class="hint" id="vchVh"></span><span class="err"></span></div>
  <label class="fld"><span class="fl">Limite de usos <small>opcional</small></span><input name="limit" type="number" min="1" inputmode="numeric" placeholder="Sem limite" value="${v.limit==null?'':v.limit}"><span class="hint">Cada venda com o voucher conta um uso.</span></label>
  <label class="fld"><span class="fl">Vale a partir de</span><input name="from" type="date" value="${v.from}"></label>
  <label class="fld"><span class="fl">Vale até <small>opcional</small></span><input name="to" type="date" value="${v.to||''}"></label>
  <p class="hint" style="grid-column:1/-1;margin:0">Vale para qualquer pessoa que tiver o código. O desconto nunca passa do valor da venda.</p>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${id?'Salvar':'Criar voucher'}</button></div></form>`,'sm');
 const f=$('#vchF'),hint=()=>{const d=+f.disc.value;$('#vchVh').textContent=type==='p'?(d>=100?'100%: a venda fica gratuita':'De 1% a 100% do valor da venda'):'Em reais; nunca passa do valor da venda';f.disc.max=type==='p'?100:'';};hint();
 f.addEventListener('click',x=>{const b=x.target.closest('[data-vt]');if(!b)return;type=b.dataset.vt;f.querySelectorAll('[data-vt]').forEach(y=>y.setAttribute('aria-pressed',y===b));hint();});
 f.addEventListener('input',x=>{x.target.closest('.fld')?.classList.remove('bad');if(x.target.name==='code')x.target.value=x.target.value.toUpperCase().replace(/\s/g,'');hint();});
 const bad=(el,msg)=>{const fl=el.closest('.fld');fl.classList.add('bad');const er=fl.querySelector('.err');if(er)er.textContent=msg;el.focus();};
 f.onsubmit=e=>{e.preventDefault();const code=f.code.value.trim().toUpperCase(),name=f.name.value.trim(),raw=+f.disc.value,from=f.from.value,to=f.to.value,limit=f.limit.value?parseInt(f.limit.value,10):null;
  if(!id){if(!/^[A-Z0-9]{3,20}$/.test(code))return bad(f.code,'3 a 20 letras ou números, sem espaço');if(VCH[k].some(x=>x.code===code))return bad(f.code,'Já existe um voucher com esse código neste módulo');}
  if(!name)return bad(f.name,'Informe a campanha');
  if(!(raw>0)||(type==='p'&&raw>100))return bad(f.disc,type==='p'?'De 1% a 100%':'Informe o valor do desconto');
  if(!from)return bad(f.from,'Informe quando começa a valer');if(to&&to<from)return bad(f.to,'A data final não pode ser antes da inicial');
  if(f.limit.value&&!(limit>0))return bad(f.limit,'Maior que zero');
  const value=type==='p'?Math.round(raw):Math.round(raw*100);
  if(id)Object.assign(v,{name,type,value,from,to,limit});else VCH[k].unshift({id:k+'-v'+Date.now(),code,name,type,value,from,to,limit,uses:0,disc:0,paused:false});
  closeDlg();render();toast(id?'Voucher salvo':'Voucher '+code+' criado');};
}
Object.assign(A,{foodOrg:v=>{S.foodOrg=v;render();},vchNew:k=>vchForm(k),vchEdit:v=>{const [k,id]=v.split('|');vchForm(k,id);},
 vchToggle:v=>{const [k,id]=v.split('|'),x=VCH[k].find(y=>y.id===id);x.paused=!x.paused;render();toast(x.paused?x.code+' pausado: sai de circulação':x.code+' ativado');},
 vchSt:v=>{S.vchSt=v;render();}});
/* menu e páginas: o item Vouchers entra logo depois de Categorias nos quatro módulos */
['cafe','rest','shop','social'].forEach(k=>{const grp=NAV.find(g=>g[1].some(i=>i[0]===k));if(!grp)return;const m=grp[1].find(i=>i[0]===k);
 if(m&&!m[3].some(x=>x[0]===k+'-vouchers')){const at=m[3].findIndex(x=>x[0]===k+'-cats');m[3].splice(at<0?m[3].length:at+1,0,[k+'-vouchers','Vouchers']);}});
CAFE_PAGES.vouchers=vchPage;REST_PAGES.vouchers=vchPage;SHOP_PAGES.vouchers=vchPage;SOCIAL_PAGES.vouchers=vchPage;
/* dados de exemplo do PDV na Loja e no Mercado Social: origem PDV, pagamento dividido, voucher, divergências e código de barras */
(()=>{const pdvOf={shop:'PDV-SEDE-01',social:'PDV-SOCIAL-01'};
 ['shop','social'].forEach((k,ki)=>{
  FOOD_STORES[k].items.forEach((it,i)=>{if(!it.barcode)it.barcode='78920'+(ki?'2':'1')+String(i+1).padStart(6,'0');});
  FOOD_SALES.filter(x=>x.store===k&&!x.app).forEach((x,i)=>{
   if(i%2===0){x.pdv=pdvOf[k];delete x.totemNo;}
   if(!x.pdv||x.status!=='completed')return;
   const gross=x.lines.reduce((n,l)=>n+l.qty*l.price,0),v=VCH[k][0];
   if(i%10===2&&v&&x.total>1000){const vd=v.type==='p'?Math.round(gross*v.value/100):Math.min(gross,v.value);x.voucher={code:v.code,name:v.name,type:v.type,value:v.value};x.voucherDiscount=vd;x.total=Math.max(100,x.total-vd);}
   if(i%6===0&&x.method!=='Dinheiro'&&x.total>=1000){const a=Math.round(x.total*.4/10)*10;x.pays=[{method:'Dinheiro',amount:a},{method:x.method,amount:x.total-a}];x.method='Misto';}
   if(i%14===4)x.divs=['Preço alterado à mão no PDV.'];
  });});
 const sh=FOOD_STORES.shop.items;
 FOOD_DIV.shop.push({id:'shop-d4',t:'price',title:`${sh[0].name}: R$ 41,00 cobrado no PDV, R$ ${(sh[0].price/100).toLocaleString('pt-BR',{minimumFractionDigits:2})} no cadastro`,sub:'O operador mudou o preço à mão no PDV. A venda foi aceita; confira qual vale.',item:sh[0].id},
  {id:'shop-d5',t:'voucher',title:'UNICO50 usado 2 vezes (limite 1)',sub:'Dois PDVs usaram o voucher enquanto estavam sem internet. As duas vendas foram aceitas.'});
})();
/* voucher de evento: ainda não vale ou esgotado (os novos campos "vale a partir de" e "limite de usos") */
const evVchBlock=v=>v.from&&inDays(v.from)>0?'Este voucher ainda não começou a valer':(v.limit&&v.uses>=v.limit)?'Este voucher já foi usado o máximo de vezes':'';
