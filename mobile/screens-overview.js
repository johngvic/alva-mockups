/* ============================================================
   Visão geral · apresentação (Financeiro, Kids, Almoxarifado, Zeladoria, Secretaria)
   Peças: card de destaque (ovHero), atalhos clicáveis (ovTiles), alertas (ovAtt), gráficos leves.
   Só lê os dados dos motores existentes; não cria estado novo.
   ============================================================ */
{
const goSec=(m,s)=>{const sc=gMod(m)[5];S.gmod=m;if(!gFewSecs(m,sc)){S.gsec=s;if(S.screen==='gSecao')softRender();else go('gSecao');}else{S.gtab=sc.indexOf(s);softRender();}};
A.ovGo=v=>goSec(S.gmod,v);
const R$=n=>'R$ '+Math.round(n).toLocaleString('pt-BR');
const mil=n=>'R$ '+(n/1000).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+' mil';
const brl2=n=>'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const rowsOf=(m,s)=>LSD[m][s].rows;
const cnt=(m,s,st)=>rowsOf(m,s).filter(r=>r.st===st).length;

const hero=(eb,big,sub,extra)=>`<section class="ovh"><p class="ovh-eb">${eb}</p><b class="ovh-n">${big}</b><p class="ovh-s">${sub}</p>${extra||''}</section>`;
const tile=(ico,tone,n,l,sec,hint)=>`<button class="ovt ${tone}" data-a="ovGo" data-v="${esc(sec)}"><span class="ovt-i">${ic(ico,18)}</span><b>${n}</b><span class="ovt-l">${l}</span>${hint?`<span class="ovt-h">${hint}</span>`:''}</button>`;
const tiles=a=>`<div class="ovg">${a.join('')}</div>`;
const att=(tone,t,s,sec,fn,v)=>`<button class="ova ${tone}" data-a="${fn||'ovGo'}" data-v="${esc(v||sec)}"><i></i><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${t}</span><span class="vs">${s}</span></span>${ic('chevR',18)}</button>`;
const ovSec=(t,b,link)=>`<section class="stack g3"><div class="row between"><p class="eb2">${t}</p>${link?`<button class="tlink" data-a="ovGo" data-v="${esc(link[1])}">${link[0]}</button>`:''}</div>${b}</section>`;
const okAll=(t,s)=>`<div class="ova ok"><i></i><span class="grow stack" style="gap:2px"><span class="vn">${t}</span><span class="vs">${s}</span></span>${ic('check',18)}</div>`;

/* ---------------- Financeiro ---------------- */
const parse=s=>{const m=/([+−-])\s*R\$\s*([\d.]+),(\d\d)/.exec(s||'');return m?(m[1]==='+'?1:-1)*(parseInt(m[2].replace(/\./g,''))+parseInt(m[3])/100):0;};
LSD.financeiro['Visão geral']={custom:()=>{
 const lan=rowsOf('financeiro','Lançamentos'),ent=lan.filter(r=>parse(r.s)>0).reduce((n,r)=>n+parse(r.s),0),sai=-lan.filter(r=>parse(r.s)<0).reduce((n,r)=>n+parse(r.s),0);
 const meses=[['abr',41.2,36.8],['mai',44.6,38.1],['jun',39.9,41.3],['jul',46.2,37.5],['ago',43.1,40.2],['set',44.8,39.6]],mx=Math.max(...meses.flatMap(m=>[m[1],m[2]]));
 const net=ent-sai,pagar=rowsOf('financeiro','Contas a pagar e a receber').filter(r=>r.s.startsWith('A pagar')),atr=pagar.filter(r=>r.st==='at'),ven=pagar.filter(r=>r.st==='pe'),apr=rowsOf('financeiro','Aprovações').filter(r=>r.st==='pe');
 const chart=`<div class="ovc" role="img" aria-label="Entradas e saídas por mês">${meses.map(([m,e,s],i)=>`<div class="${i===meses.length-1?'now':''}"><span class="ovc-b"><i style="height:${Math.max(6,e/mx*100)}%"></i><i class="o" style="height:${Math.max(6,s/mx*100)}%"></i></span><em>${m}</em></div>`).join('')}</div><div class="ovh-lg"><span><i></i>Entradas</span><span><i class="o"></i>Saídas</span></div>`;
 return hero('Saldo total','R$ 48,3 mil',`<span class="ovh-chip ${net>=0?'up':'dn'}">${net>=0?'▲':'▼'} ${brl2(Math.abs(net))} em setembro</span><span>3 contas</span>`,chart)
 +tiles([tile('clock','warn',mil(6200),'A pagar','Contas a pagar e a receber',ven.length+atr.length+' em aberto'),tile('arrowR','ok',mil(9800),'A receber','Contas a pagar e a receber','2 a vencer'),tile('check','info',apr.length,'Aprovações','Aprovações',can('financeiro','aprovar')?'aguardando você':'aguardando o Admin'),tile('wallet','mute',String(CXS.filter(c=>c.st==='ab').length),'Caixas','Caixas e vendas','com as pessoas')])
 +ovSec('Precisam de atenção',[...atr.map(r=>att('bad',esc(r.n),esc(r.s),'Contas a pagar e a receber')),...ven.map(r=>att('warn',esc(r.n),esc(r.s),'Contas a pagar e a receber')),...apr.map(r=>att('info',esc(r.n),'Aprovação · '+esc(r.s),'Aprovações'))].join('')||okAll('Tudo em dia','Nenhuma conta ou aprovação pendente.'))
 +ovSec('Últimos lançamentos',`<div class="vl">${lan.slice(0,5).map(r=>{const v=parse(r.s),d=(r.s||'').split(' · ')[0];return `<div class="vr"><span class="ovl ${v>=0?'in':'out'}">${ic(v>=0?'plus':'minus',16,2.2)}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(d)}${r.st==='pe'?' · pendente':''}</span></span><b class="ovv ${v>=0?'in':'out'}">${v>=0?'+':'−'} ${brl2(Math.abs(v))}</b></div>`;}).join('')}</div>`,['Ver todos','Lançamentos']);}};
}
