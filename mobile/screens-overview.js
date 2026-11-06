/* ============================================================
   Visão geral · apresentação (Financeiro, Kids, Almoxarifado, Zeladoria, Secretaria)
   Peças: card de destaque (ovHero), atalhos clicáveis (ovTiles), alertas (ovAtt), gráficos leves.
   Só lê os dados dos motores existentes; não cria estado novo.
   ============================================================ */
{
const goSec=(m,s)=>{const sc=gMod(m)[5];S.gmod=m;if(sc.length>5){S.gsec=s;if(S.screen==='gSecao')softRender();else go('gSecao');}else{S.gtab=sc.indexOf(s);softRender();}};
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
 const net=ent-sai,pagar=rowsOf('financeiro','Contas a pagar'),atr=pagar.filter(r=>r.st==='at'),ven=pagar.filter(r=>r.st==='pe'),apr=rowsOf('financeiro','Aprovações').filter(r=>r.st==='pe');
 const chart=`<div class="ovc" role="img" aria-label="Entradas e saídas por mês">${meses.map(([m,e,s],i)=>`<div class="${i===meses.length-1?'now':''}"><span class="ovc-b"><i style="height:${Math.max(6,e/mx*100)}%"></i><i class="o" style="height:${Math.max(6,s/mx*100)}%"></i></span><em>${m}</em></div>`).join('')}</div><div class="ovh-lg"><span><i></i>Entradas</span><span><i class="o"></i>Saídas</span></div>`;
 return hero('Saldo total','R$ 48,3 mil',`<span class="ovh-chip ${net>=0?'up':'dn'}">${net>=0?'▲':'▼'} ${brl2(Math.abs(net))} em setembro</span><span>3 contas</span>`,chart)
 +tiles([tile('clock','warn',mil(6200),'A pagar','Contas a pagar',ven.length+atr.length+' em aberto'),tile('arrowR','ok',mil(9800),'A receber','Contas a receber','2 a vencer'),tile('check','info',apr.length,'Aprovações','Aprovações','aguardando você'),tile('wallet','mute','3','Contas','Contas financeiras','saldo e caixa')])
 +ovSec('Precisa de atenção',[...atr.map(r=>att('bad',esc(r.n),esc(r.s),'Contas a pagar')),...ven.map(r=>att('warn',esc(r.n),esc(r.s),'Contas a pagar')),...apr.map(r=>att('info',esc(r.n),'Aprovação · '+esc(r.s),'Aprovações'))].join('')||okAll('Tudo em dia','Nenhuma conta ou aprovação pendente.'))
 +ovSec('Últimos lançamentos',`<div class="vl">${lan.slice(0,5).map(r=>{const v=parse(r.s),d=(r.s||'').split(' · ')[0];return `<div class="vr"><span class="ovl ${v>=0?'in':'out'}">${ic(v>=0?'plus':'minus',16,2.2)}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(d)}${r.st==='pe'?' · pendente':''}</span></span><b class="ovv ${v>=0?'in':'out'}">${v>=0?'+':'−'} ${brl2(Math.abs(v))}</b></div>`;}).join('')}</div>`,['Ver todos','Lançamentos']);}};

/* ---------------- Kids ---------------- */
LSD.kids['Visão geral']={custom:()=>{
 const salas=rowsOf('kids','Salas'),occ=salas.reduce((n,r)=>n+r.oc,0),cap=salas.filter(r=>r.st==='ab').reduce((n,r)=>n+r.cap,0),vol=rowsOf('kids','Escalas'),conf=vol.filter(r=>r.st==='co').length,pen=vol.filter(r=>r.st==='pe'),pl=rowsOf('kids','Planejamento'),sem=pl.filter(r=>r.st==='pe');
 const aber=salas.filter(r=>r.st==='ab').length,pct=cap?Math.round(occ/cap*100):0;
 const gauge=`<div class="ovp"><span class="ovp-t"><i style="width:${Math.min(100,pct)}%"></i></span><span class="ovp-l"><span>${pct}% da capacidade</span><span>${occ} de ${cap}</span></span></div>`;
 return hero('Crianças hoje',occ,`<span class="ovh-chip">${aber} de ${salas.length} salas abertas</span>`,gauge)
 +tiles([tile('door','ok',aber+'/'+salas.length,'Salas abertas','Salas'),tile('users',pen.length?'warn':'ok',conf+'/'+vol.length,'Equipe confirmada','Escalas',pen.length?pen.length+' pendente'+(pen.length>1?'s':''):'completa'),tile('clipboard',sem.length?'warn':'ok',pl.length-sem.length+'/'+pl.length,'Aulas planejadas','Planejamento',sem.length?sem.length+' sem tema':'tudo pronto'),tile('baby','info',rowsOf('kids','Turmas').length,'Turmas','Turmas')])
 +ovSec('Ocupação das salas',`<div class="vl">${salas.map(r=>`<div class="vr zb"><span class="grow stack" style="gap:6px;min-width:0"><span class="row between"><span class="vn">${esc(r.n)}</span><span class="vs">${r.st==='ab'?r.oc+' de '+r.cap:'Fechada'}</span></span><span class="ztrk ${r.oc/r.cap>.85?'hot':''}"><i style="width:${r.st==='ab'?Math.max(2,Math.min(100,r.oc/r.cap*100)):0}%"></i></span></span></div>`).join('')}</div>`,['Ver salas','Salas'])
 +ovSec('Precisa de atenção',[...pen.map(r=>att('warn',esc(r.n),'Escala pendente · '+esc(r.s),'Escalas')),...sem.map(r=>att('warn',esc(r.n),'Aula sem tema definido','Planejamento'))].join('')||okAll('Tudo em dia','Equipe confirmada e aulas planejadas.'));}};

/* ---------------- Almoxarifado ---------------- */
LSD.almox['Visão geral']={custom:()=>{
 const it=rowsOf('almox','Itens'),em=rowsOf('almox','Empréstimos'),at=em.filter(r=>r.st==='at'),dv=rowsOf('almox','Devoluções').filter(r=>r.st==='pa'),emp=em.filter(r=>r.st!=='de');
 const disp=Math.max(0,it.length-emp.length),pct=it.length?Math.round(disp/it.length*100):0;
 const gauge=`<div class="ovp"><span class="ovp-t"><i style="width:${pct}%"></i></span><span class="ovp-l"><span>${disp} disponíveis</span><span>${emp.length} emprestados</span></span></div>`;
 return hero('Itens no acervo',it.length,`<span class="ovh-chip ${at.length?'dn':'up'}">${at.length?at.length+' atrasado'+(at.length>1?'s':''):'Nenhum atraso'}</span>`,gauge)
 +tiles([tile('swap','info',emp.length,'Emprestados','Empréstimos'),tile('alert',at.length?'bad':'ok',at.length,'Atrasados','Empréstimos',at.length?'cobrar devolução':'em dia'),tile('check',dv.length?'warn':'ok',dv.length,'Devoluções a confirmar','Devoluções'),tile('box','mute',it.length,'Itens','Itens','ver acervo')])
 +ovSec('Precisa de atenção',[...at.map(r=>att('bad',esc(r.n),'Atrasado · '+esc(r.s),'Empréstimos')),...dv.map(r=>att('warn',esc(r.n),'Devolução a confirmar · '+esc(r.s),'Devoluções'))].join('')||okAll('Tudo em dia','Nenhum atraso ou devolução pendente.'));}};

/* ---------------- Zeladoria ---------------- */
LSD.zeladoria['Visão geral']={custom:()=>{
 const t=rowsOf('zeladoria','Trabalhos'),n=s=>t.filter(r=>r.st===s).length,need=t.filter(r=>r.st==='pe'||r.st==='ap'),andam=n('or')+n('ap')+n('ex');
 const steps=[['pe','Pedido'],['or','Orçado'],['ap','Aprovado'],['ex','Execução'],['co','Concluído']],tot=Math.max(1,t.length);
 const pipe=`<div class="ovpipe">${steps.map(([k,l],i)=>`<i class="s${i}" style="flex:${Math.max(.35,n(k))}"></i>`).join('')}</div><div class="ovpipe-l">${steps.map(([k,l])=>`<span><b>${n(k)}</b>${l}</span>`).join('')}</div>`;
 return hero('Trabalhos em andamento',andam,`<span class="ovh-chip ${need.length?'dn':'up'}">${need.length?need.length+' esperando você':'Nada esperando você'}</span><span>${n('co')} concluídos</span>`,pipe)
 +tiles([tile('clipboard',n('pe')?'warn':'ok',n('pe'),'Pedidos a avaliar','Trabalhos'),tile('clock','info',n('or')+n('ap'),'Em orçamento ou aprovação','Trabalhos'),tile('wrench','ok',n('ex'),'Em execução','Trabalhos'),tile('check','mute',n('co'),'Concluídos','Trabalhos')])
 +ovSec('Precisa de você',need.length?need.map(r=>att(r.st==='pe'?'warn':'info',esc(r.n),r.st==='pe'?'Pedido novo · '+esc(r.s):'Aguardando o Financeiro · previsto R$ '+((r.v&&r.v.prev)||'—'),'', 'zeOpen',r.id)).join(''):okAll('Nada esperando você','Os pedidos novos e as aprovações aparecem aqui.'),['Ver trabalhos','Trabalhos'])
 +ovSec('Em execução',`<div class="vl">${t.filter(r=>r.st==='ex').map(r=>`<button class="vr tap" data-a="zeOpen" data-v="${r.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}</span></span><span class="vs">R$ ${(r.v&&r.v.prev)||'—'}</span></button>`).join('')||vsEmpty('Nada em execução','')}</div>`);}};

/* ---------------- Secretaria ---------------- */
LSD.secretaria['Visão geral']={custom:()=>{
 const c=(s,st)=>cnt('secretaria',s,st),ap=c('Atos','pd'),dp=c('Documentos','pd'),mv=c('Cargos e mandatos','vc'),em=c('Documentos','va');
 const prox=[['18','out','Batismo','3 pessoas · Chácara Alva'],['04','out','Apresentação','2 bebês · Templo principal'],['11','out','Apresentação','2 bebês · Templo principal']];
 return hero('Membros ativos','142',`<span class="ovh-chip">2 afastados</span><span>${em} documentos emitidos</span>`,`<div class="ovh-act"><button class="btn sm ovh-btn" data-a="seNew" data-v="Atos">${ic('plus',16,2.2)}Registrar ato</button><button class="btn sm ovh-btn" data-a="seNew" data-v="Documentos">${ic('plus',16,2.2)}Emitir documento</button></div>`)
 +tiles([tile('award',ap?'warn':'ok',ap,'Atos a decidir','Atos'),tile('mail',dp?'warn':'ok',dp,'Pedidos de documento','Documentos'),tile('clock',mv?'warn':'ok',mv,'Mandatos vencendo','Cargos e mandatos'),tile('check','mute',em,'Documentos emitidos','Documentos')])
 +ovSec('Precisa da sua atenção',[ap?att('warn',ap+' atos aguardam decisão','Declarados na integração','Atos'):'',dp?att('warn',dp+' pedidos de documento','Declarações a emitir','Documentos'):'',mv?att('warn',mv+' mandato vencendo','Thiago Barros · Secretário(a) · vence em 31 dias','Cargos e mandatos'):''].join('')||okAll('Tudo em dia','Nada esperando você agora.'),null)
 +ovSec('Próximos atos',`<div class="ovn">${prox.map(([d,m,t,s])=>`<div class="ovn-r"><span class="ovn-d"><b>${d}</b>${m}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${t}</span><span class="vs">${s}</span></span></div>`).join('')}</div>`,['Ver atos','Atos']);}};
}
