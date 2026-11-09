/* ===== Visão geral padrão e aba Resultados (Tiago, 09/11/2026, FND-M-32) =====
 * Primeira aba = Visão geral: cartões e "Precisam de atenção" (direto ao ponto). Última aba = Resultados: os gráficos do web redesenhados para o celular
 * (lista vertical de barras). Vale para Zeladoria, Almoxarifado, Espaços, Secretaria, Financeiro, Cafeteria, Restaurante e Loja; Kids só tem a primeira aba.
 * Espaços ganha a Visão geral (não existia no web nem no app). */
const rsBars=l=>l.length?`<div class="vl">${l.map(x=>`<div class="vr zb"><span class="grow stack" style="gap:6px;min-width:0"><span class="row between"><span class="vn">${esc(x.l)}</span><span class="vs">${x.v}</span></span><span class="ztrk"><i style="width:${Math.max(2,Math.round(x.w))}%;${x.c?'background:'+x.c:''}"></i></span>${x.s?`<span class="vs">${x.s}</span>`:''}</span></div>`).join('')}</div>`:vsEmpty('Sem dados no período','');
const rsSec=(t,b,sub)=>`<section class="stack g3"><div class="row between" style="align-items:baseline"><p class="eb2">${t}</p>${sub?`<span class="vs">${sub}</span>`:''}</div>${b}</section>`;
const rsAtt=(tone,t,s,act,val)=>`<button class="ova ${tone}" data-a="${act}" data-v="${esc(val||'')}"><i></i><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${t}</span><span class="vs">${s}</span></span>${ic('chevR',18)}</button>`;
const rsOk=(t,s)=>`<div class="ova ok"><i></i><span class="grow stack" style="gap:2px"><span class="vn">${t}</span><span class="vs">${s}</span></span>${ic('check',18)}</div>`;
const rsPct=(a,b)=>b?Math.round(a/b*100):0;
/* ---------- Zeladoria ---------- */
function zlRes(){const g=ZW.filter(r=>r.gasto>0),tot=g.reduce((a,r)=>a+r.gasto,0),grp=(f)=>{const m={};g.forEach(r=>{const k=f(r);m[k]=(m[k]||0)+r.gasto;});return Object.entries(m).sort((a,b)=>b[1]-a[1]);},
 cat=grp(r=>r.cats[0]||'Sem categoria'),tipo=grp(r=>r.tipo),forn=grp(r=>r.forn||'Compras diretas, sem fornecedor'),top=g.slice().sort((a,b)=>b.gasto-a.gasto).slice(0,5);
 const mk=(l,mx)=>l.map(([n,v])=>({l:n,v:zlR(v),w:v/mx*100}));
 return `<div class="vk"><div><b>${zlR(tot)}</b><span>Gasto em 2026</span></div><div><b>${g.length}</b><span>Obras com gasto</span></div><div><b>${esc(cat.length?cat[0][0]:'—')}</b><span>Maior categoria</span></div></div>`
  +rsSec('Por categoria',rsBars(mk(cat,cat.length?cat[0][1]:1)),'2026')+rsSec('Por tipo de trabalho',rsBars(mk(tipo,tipo.length?tipo[0][1]:1)))
  +rsSec('Por fornecedor',rsBars(mk(forn,forn.length?forn[0][1]:1)))
  +rsSec('Maiores trabalhos',rsBars(top.map(r=>({l:r.n,v:zlR(r.gasto),w:r.gasto/(top[0]?top[0].gasto:1)*100,s:esc(r.tipo)+' · previsto '+zlR(r.prev)}))));}
/* ---------- Almoxarifado ---------- */
function wrhRes(){const at=WRH_ITEMS.filter(i=>i.st==='at'),cats=[...new Set(at.map(i=>i.cat))],lent={};WRH_LOANS.forEach(l=>{lent[l.item]=(lent[l.item]||0)+l.q;});
 const top=Object.entries(lent).sort((a,b)=>b[1]-a[1]).slice(0,5),kinds=['Empréstimo','Devolução','Distribuição','Repasse','Ajuste','Item'].map(k=>[k,WRH_MOV.filter(m=>m.k===k).length]).filter(x=>x[1]);
 const tot=at.reduce((a,i)=>a+i.qty,0),av=at.filter(i=>i.kind==='emp').reduce((a,i)=>a+wrhAvail(i),0),emp=at.filter(i=>i.kind==='emp').reduce((a,i)=>a+i.qty,0);
 return `<div class="vk"><div><b>${tot}</b><span>Unidades</span></div><div><b>${rsPct(av,emp)}%</b><span>Disponíveis</span></div><div><b>${WRH_LOANS.filter(wrhLate).length}</b><span>Em atraso</span></div></div>`
  +rsSec('Disponibilidade por categoria',rsBars(cats.map(c=>{const l=at.filter(i=>i.cat===c&&i.kind==='emp'),q=l.reduce((a,i)=>a+i.qty,0),a=l.reduce((a2,i)=>a2+wrhAvail(i),0);return {l:c,v:q?rsPct(a,q)+'%':'consumível',w:q?a/q*100:100,s:q?a+' de '+q+' disponíveis':at.filter(i=>i.cat===c).reduce((a2,i)=>a2+i.qty,0)+' em estoque'};})))
  +rsSec('Mais emprestados',rsBars(top.map(([n,q])=>({l:n,v:q+(q===1?' unidade':' unidades'),w:q/top[0][1]*100}))),'todos os empréstimos')
  +rsSec('Movimentações por tipo',rsBars(kinds.map(([k,n])=>({l:k,v:n+(n===1?' registro':' registros'),w:n/Math.max(...kinds.map(x=>x[1]))*100}))));}
/* ---------- Espaços (Visão geral nova + Resultados) ---------- */
const spcWeek=()=>[...Array(7)].map((_,i)=>cuISO(i));
const spcDow=iso=>new Date(iso+'T12:00:00').getDay();
function spcEsp(){const act=SPC.filter(s=>s.st==='at'),off=SPC.filter(s=>s.st==='in'),ok=RSV.filter(r=>r.st==='cf'),hoje=ok.filter(r=>r.date===cuToday()).sort((a,b)=>a.from.localeCompare(b.from)),wk=spcWeek(),prox=ok.filter(r=>wk.includes(r.date));
 const att=[...ok.filter(r=>spcTemporal(r)[1]==='Próxima').flatMap(r=>r.items.filter(i=>i[2]==='re').map(i=>rsAtt('bad','Item recusado: '+esc(i[0])+' × '+i[1],esc(spcSp(r.sp).n)+' · '+agDay(r.date)+' · '+esc(i[3]),'spcOpen',r.id+'|'))),
  ...off.flatMap(s=>ok.filter(r=>r.sp===s.id&&spcTemporal(r)[1]==='Próxima').map(r=>rsAtt('warn','Sala desativada com reserva futura: '+esc(s.n),agDay(r.date)+' · '+esc(spcWho(r)||'Reserva'),'spcOpen',r.id+'|')))];
 return `<div class="vk"><div><b>${act.length}</b><span>Salas ativas</span></div><div><b>${hoje.length}</b><span>Reservas hoje</span></div><div><b>${prox.length}</b><span>Próximos 7 dias</span></div></div>`
  +rsSec('Precisam de atenção',att.join('')||rsOk('Tudo em dia','Nenhum item recusado nem sala desativada com reserva.'))
  +rsSec('Reservas de hoje',hoje.length?`<div class="vl">${hoje.map(r=>`<button class="vr tap" data-a="spcOpen" data-v="${r.id}|"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(spcLabel(r))}</span><span class="vs">${esc(spcSp(r.sp).n)} · ${r.from}–${r.to}${spcWho(r)?' · '+esc(spcWho(r)):''}</span></span>${spcTag(r)}</button>`).join('')}</div>`:vsEmpty('Nenhuma reserva hoje',''));}
function spcRes(){const act=SPC.filter(s=>s.st==='at'),ok=RSV.filter(r=>r.st==='cf'),wk=spcWeek();
 const occ=act.map(s=>{let m=0;wk.forEach(d=>{const dow=spcDow(d);s.fixed.filter(f=>f[0]===dow).forEach(f=>{m+=spcMin(f[2])-spcMin(f[1]);});ok.filter(r=>r.sp===s.id&&r.date===d).forEach(r=>{m+=spcMin(r.to)-spcMin(r.from);});});return [s,Math.round(m/(1440*7)*100)];}).sort((a,b)=>b[1]-a[1]),mx=Math.max(1,...occ.map(x=>x[1]));
 const per=[['Manhã',0,720],['Tarde',720,1080],['Noite',1080,1440]].map(([n,a,b])=>[n,ok.filter(r=>spcMin(r.from)>=a&&spcMin(r.from)<b).length]),mp=Math.max(1,...per.map(x=>x[1]));
 const who={};ok.forEach(r=>{who[r.who]=(who[r.who]||0)+1;});const top=Object.entries(who).sort((a,b)=>b[1]-a[1]).slice(0,5);
 return rsSec('Ocupação por sala',rsBars(occ.map(([s,p])=>({l:s.n,v:p+'%',w:p/mx*100,s:s.cap+' lugares'}))),'próximos 7 dias')
  +rsSec('Horários de pico',rsBars(per.map(([n,c])=>({l:n,v:c+(c===1?' reserva':' reservas'),w:c/mp*100}))),'por período do dia')
  +(can('espacos','editar')?rsSec('Quem mais reserva',rsBars(top.map(x=>({l:x[0],v:x[1]+(x[1]===1?' reserva':' reservas'),w:x[1]/top[0][1]*100}))),'reservas confirmadas'):'');}
/* ---------- Secretaria ---------- */
const SEC_MOV=[['Jan',2,0],['Fev',2,0],['Mar',3,0],['Abr',3,0],['Mai',2,1],['Jun',2,1],['Jul',1,1],['Ago',3,0],['Set',1,0]];
const SEC_PERFIL=[['Faixa etária',[['0 a 12',1],['13 a 17',1],['18 a 29',1],['30 a 44',13],['45 a 59',0],['60 ou mais',0]]],['Estado civil',[['Solteiro(a)',3],['Casado(a)',13]]],['Gênero',[['Feminino',11],['Masculino',5]]],['Batismo',[['Batizado',12],['Ainda não batizado',4]]]];
function secRes(){const e=SEC_MOV.reduce((a,m)=>a+m[1],0),s=SEC_MOV.reduce((a,m)=>a+m[2],0),mx=Math.max(...SEC_MOV.map(m=>m[1]),1);
 return `<div class="vk"><div><b>${e}</b><span>Entradas em 2026</span></div><div><b>${s}</b><span>Saídas</span></div><div><b>+${e-s}</b><span>Saldo do ano</span></div></div>`
  +rsSec('Entradas e saídas, mês a mês',rsBars(SEC_MOV.map(([m,en,sa])=>({l:m,v:en+(en===1?' entrada':' entradas'),w:en/mx*100,s:sa?sa+(sa===1?' saída (transferência, desligamento ou falecimento)':' saídas (transferências, desligamentos ou falecimentos)'):''}))),'integrações concluídas')
  +SEC_PERFIL.map(([t,l])=>{const tot=l.reduce((a,x)=>a+x[1],0),mx2=Math.max(1,...l.map(x=>x[1]));return rsSec(t,rsBars(l.map(([n,q])=>({l:n,v:q+' · '+rsPct(q,tot)+'%',w:q/mx2*100}))),tot+' membros');}).join('');}
/* ---------- Financeiro: a Visão geral perde o cartão de saldo e o gráfico (vão para Resultados) ---------- */
const finOld=LSD.financeiro['Visão geral'].custom;
function finSplit(){const h=finOld(),i=h.indexOf('</section>')+10;return {hero:h.slice(0,i),rest:h.slice(i)};}
const FIN_ENT=[['Dízimos',24400],['Inscrições',10440],['Doações',5300],['Vendas',4870],['Ofertas',2140],['Rendimentos de aplicação',214]],FIN_SAI=[['Salários',6800],['Ajuda de custo pastoral',4500],['Estrutura',3200],['Custo de eventos',2150],['Encargos e benefícios',2060],['Missões',1400],['Comunicação',890],['Ministérios',780]];
function finRes(){const te=FIN_ENT.reduce((a,x)=>a+x[1],0),ts=FIN_SAI.reduce((a,x)=>a+x[1],0),brl=n=>'R$ '+n.toLocaleString('pt-BR');
 return finSplit().hero+`<div class="vk"><div><b>${brl(te)}</b><span>Entrou</span></div><div><b>${brl(ts)}</b><span>Saiu</span></div><div><b>${rsPct(te-ts,te)}%</b><span>Ficou</span></div></div>`
  +rsSec('Para onde foi cada real: entrou',rsBars(FIN_ENT.map(([n,v])=>({l:n,v:brl(v)+' · '+rsPct(v,te)+'%',w:v/FIN_ENT[0][1]*100}))),'setembro')
  +rsSec('Para onde foi cada real: saiu',rsBars(FIN_SAI.map(([n,v])=>({l:n,v:brl(v)+' · '+rsPct(v,ts)+'%',w:v/FIN_SAI[0][1]*100}))),'setembro');}
/* ---------- as seções ---------- */
LSD.zeladoria['Resultados']={custom:zlRes};LSD.almox['Resultados']={custom:wrhRes};LSD.secretaria['Resultados']={custom:secRes};
LSD.espacos={'Visão geral':{custom:spcEsp},'Salas':LSD.espacos['Salas'],'Reservas':LSD.espacos['Reservas'],'Resultados':{custom:spcRes}};
LSD.financeiro['Visão geral']={custom:()=>finSplit().rest};LSD.financeiro['Resultados']={custom:finRes};
gMod('zeladoria')[5]=['Visão geral','Trabalhos','Fornecedores','Resultados'];
gMod('almox')[5]=['Visão geral','Itens','Empréstimos','Movimentações','Resultados'];
gMod('secretaria')[5]=['Visão geral','Atos','Documentos','Cargos e mandatos','Resultados'];
gMod('espacos')[5]=['Visão geral','Salas','Reservas','Resultados'];
gMod('financeiro')[5]=[...gMod('financeiro')[5].filter(s=>s!=='Resultados'),'Resultados'];
LEDE_DYN['espacos|Visão geral']=()=>{const n=RSV.filter(r=>r.date===cuToday()&&r.st==='cf').length;return n?n+(n===1?' reserva hoje':' reservas hoje'):'Nenhuma reserva hoje';};
['zeladoria','almox','secretaria','espacos','financeiro'].forEach(m=>{LEDE_DYN[m+'|Resultados']=()=>'Os números do período, em gráficos';});
