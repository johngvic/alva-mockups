/* =========================================================
   PESSOAS E CUIDADO · Pessoas, Cuidado, Comunidade e Kids
   Molde "Lista compacta" + ficha em folha: cada seção é uma configuração (estados, linhas, ações).
   O acesso do Gestão decide os botões: Editar muda estado e edita, Admin da área exclui.
   ========================================================= */
const LS_READY=['pessoas','cuidado','comunidade','kids'];
const lsAv=['ceu','rosado','lima','damasco','menta','salvia'];
const PN=['Ana Costa','Bruno Reis','Clara Nunes','Diego Faria','Elisa Moura','Felipe Andrade','Helena Duarte','Igor Matos','Júlia Rocha','Lucas Pereira','Marina Lopes','Otávio Braga'];
const LSCASAS=['Casa Jardins','Casa Centro','Casa Pinheiros','Casa Jovens SP'];
const LSD={
 pessoas:{
  /* Membros (consolidado 08/11): status do web; consulta, ligar/WhatsApp, família e ministérios, adicionar a um ministério */
  'Membros':{noun:'membros',av:1,
   ST:{int:['ok','Integrado'],ace:['info','Aceita'],sol:['warning','Solicitado'],rec:['danger','Recusado']},acts:[],
   extra:r=>pmExtra(r),
   rows:[['Ana Clara Lima',['Louvor'],'int','Set/2026','Ativo',''],['Carlos Eduardo Silva',[],'ace','Set/2026'],['Beatriz Martins Silva',[],'ace','Set/2026'],['Juliana Costa Ferreira',['Kids'],'int','Ago/2026','Ativo','Filho: Pedro Costa Ferreira'],['Marcos Souza Ramos',['Jovens'],'int','Ago/2026','Ativo',''],['Lucas Teixeira',[],'sol','Set/2026'],['Patrícia Oliveira Nunes',['Comunicação'],'int','Jul/2026','Ativo',''],['Daniela Rocha',['Louvor'],'int','Jun/2026','Ativo',''],['Felipe Andrade',['Recepção'],'int','Jun/2026','Afastado',''],['Marina Costa',['Kids'],'int','Mai/2026','Ativo',''],['Bruno Reis',['Louvor'],'int','Abr/2026','Ativo',''],['Clara Nunes',['Recepção'],'int','Abr/2026','Ativo',''],['Diego Faria',['Mídia'],'int','Abr/2026','Ativo',''],['Elisa Moura',['Kids','Louvor'],'int','Mar/2026','Ativo',''],['Otávio Lins',[],'int','Mar/2026','Ativo',''],['Igor Santana',[],'ace','Jan/2026'],['Gustavo Mendes',[],'rec','Fev/2026']].map(([n,mins,st,mes,sit,fam],i)=>{const r={id:'pm'+i,n,mins,st,mes,sit:sit||'',fam:fam||'',tel:'(11) 9'+(8000+i*137)+'-'+(1000+i*91),mail:norm2(n.split(' ')[0])+'@email.com'};r.s=pmS(r);r.d=pmD(r);return r;})},
  /* Integração (consolidado 08/11): integrações, fila de espera e as pessoas de cada integração; pedidos de família ficam na web */
  'Integração':{noun:'integrações',ST:{},rows:[],custom:()=>itgBody()},
  /* Devocional (consolidado 08/11): consulta do acompanhamento + adicionar e tirar participante; montar o dia e o resto ficam na web */
  'Devocional':{noun:'devocionais',
   ST:{and:['ok','Em andamento'],agd:['warning','Agendado'],enc:['off','Encerrado']},acts:[],
   extra:r=>dvgExtra(r),rows:[]}
 },
 cuidado:{
  /* Discipulado (consolidado 08/11): situação do web (Em dia, Atrasado, Pausado), calculada pelo último contato e pelo ritmo; registrar, agendar e concluir encontro, pausar e retomar. A árvore e a estrutura da rede ficam na web */
  'Discipulado':{noun:'discipulados',av:1,search:1,
   ST:{at:['danger','Atrasado'],em:['ok','Em dia'],pa:['off','Pausado']},acts:[],extra:r=>cuDiscExtra(r),rows:[]},
  /* Acompanhamento (consolidado 08/11): Aguardando triagem, Urgente, Acompanhando, Resolvido; caso restrito aparece redigido */
  'Acompanhamento':{noun:'casos',add:'Novo caso',av:1,search:1,newFlow:()=>{S.cu.nc=null;cuNcStep1();},hideActs:r=>cuHidden(r),
   ST:{nv:['warning','Aguardando triagem'],ur:['danger','Urgente'],ac:['info','Acompanhando'],re:['ok','Resolvido']},
   acts:[['Marcar como resolvido','re',['ur','ac']],['Reabrir','ac',['re']]],extra:r=>cuCaseExtra(r),rows:[]},
  /* Pedidos de oração (consolidado 08/11): Ativo e Respondido; "Estou orando" é contagem, não status */
  'Pedidos de oração':{noun:'pedidos',ST:{},rows:[],custom:()=>cuPrBody()}
 },
 kids:{
  'Visão geral':{custom:()=>{const salas=LSD.kids['Salas'].rows,occ=salas.reduce((n,r)=>n+r.oc,0),vol=LSD.kids['Escalas'].rows,conf=vol.filter(r=>r.st==='co').length;
   return `<div class="vk"><div><b>${occ}</b><span>Crianças hoje</span></div><div><b>${salas.filter(r=>r.st==='ab').length}/${salas.length}</b><span>Salas abertas</span></div><div><b>${conf}/${vol.length}</b><span>Equipe confirmada</span></div></div>
   <section class="stack g3"><p class="eb2">Ocupação das salas</p><div class="vl">${salas.map(r=>`<div class="vr"><span class="grow stack" style="gap:6px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vg"><i style="width:${Math.min(100,r.oc/r.cap*100)}%"></i></span></span><span class="vq">${r.oc}/${r.cap}</span></div>`).join('')}</div></section>
   <section class="stack g3"><p class="eb2">Precisam de atenção</p>${vol.filter(r=>r.st==='pe').length?`<div class="vl">${vol.filter(r=>r.st==='pe').map(r=>`<div class="vr"><span class="grow stack" style="gap:2px"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}</span></span>${vsTag('warning','Pendente')}</div>`).join('')}</div>`:vsEmpty('Tudo em dia','Equipe toda confirmada.')}</section>`;}},
  'Salas':{noun:'salas',add:'Nova sala',fields:[['n','Nome da sala','Ex.: Berçário'],['s','Faixa etária','Ex.: 0 a 2 anos']],ST:{ab:['ok','Aberta'],fe:['off','Fechada']},acts:[['Abrir sala','ab',['fe']],['Fechar sala','fe',['ab']]],
   rows:[['Berçário','0 a 2 anos',8,6,'ab'],['Maternal','3 a 4 anos',12,11,'ab'],['Jardim','5 a 6 anos',14,9,'ab'],['Júnior','7 a 9 anos',16,12,'ab'],['Pré-teens','10 a 12 anos',16,0,'fe']].map(([n,s,cap,oc,st],i)=>({id:'ks'+i,n,s:s+' · capacidade '+cap,st,cap,oc,d:[['Faixa etária',s],['Capacidade',String(cap)],['Hoje',oc+' crianças']]}))},
  'Times':{noun:'times',add:'Novo time',fields:[['n','Nome do time','Ex.: Time Berçário'],['s','Líder','Ex.: Camila Pereira']],ST:{at:['ok','Ativo']},acts:[],
   rows:[['Time Berçário','Camila Pereira',6],['Time Maternal','Helena Duarte',7],['Time Jardim','Marina Lopes',5],['Time Júnior','Otávio Braga',6]].map(([n,p,c],i)=>({id:'kt'+i,n,s:'Líder '+p+' · '+c+' voluntários',st:'at',d:[['Líder',p],['Voluntários',String(c)]]}))},
  'Planejamento':{noun:'aulas',add:'Nova aula',fields:[['n','Sala','Ex.: Maternal'],['s','Tema da aula','Ex.: Davi e Golias']],ST:{pl:['ok','Planejada'],pe:['warning','Falta tema']},acts:[['Marcar como planejada','pl',['pe']]],
   rows:['Dom, 4 out','Dom, 11 out','Dom, 18 out'].flatMap((g,gi)=>[['Berçário',['Deus cuida de mim','Jesus ama as crianças','Eu posso orar'][gi]],['Maternal',gi===2?'':['Davi e Golias','A arca de Noé','Daniel e os leões'][gi]],['Júnior',['O bom samaritano','Zaqueu','Pedro anda sobre as águas'][gi]]].map(([n,t],i)=>({id:'kp'+gi+i,g,n,s:t||'Ainda sem tema',st:t?'pl':'pe',d:[['Data',g],['Sala',n],['Tema',t||'—']]})))},
  'Escalas':{noun:'voluntários',add:'Escalar voluntário',av:1,fields:[['n','Voluntário','Ex.: Camila Pereira'],['s','Sala e função','Ex.: Berçário · Monitor']],ST:{co:['ok','Confirmado'],pe:['warning','Pendente']},acts:[['Confirmar presença','co',['pe']]],
   rows:[['Camila Pereira','Berçário · Líder','co'],['Helena Duarte','Maternal · Monitor','co'],['Marina Lopes','Jardim · Monitor','pe'],['Otávio Braga','Júnior · Líder','co'],['Júlia Rocha','Berçário · Apoio','pe']].map(([n,s,st],i)=>({id:'ke'+i,n,s,st,d:[['Domingo','4 out · 18h30'],['Sala e função',s]]}))},
  'Turmas':{noun:'turmas',add:'Nova turma',fields:[['n','Nome da turma','Ex.: Turma Estrelas'],['s','Faixa etária','Ex.: 5 a 6 anos']],ST:{at:['ok','Ativa']},acts:[],
   rows:[['Turma Sementes','0 a 2 anos',9],['Turma Brotos','3 a 4 anos',14],['Turma Estrelas','5 a 6 anos',13],['Turma Exploradores','7 a 9 anos',17]].map(([n,s,c],i)=>({id:'ku'+i,n,s:s+' · '+c+' crianças',st:'at',d:[['Faixa etária',s],['Crianças',String(c)]]}))}
 }
};
/* ===== Pessoas › Membros: ficha ===== */
function pmS(r){return r.st==='int'?(r.mins.length?r.mins.join(', ')+' · integrado em '+r.mes:'Integrado em '+r.mes):'Pedido de '+r.mes;}
function pmD(r){return [...(r.st==='int'?[['Situação',r.sit||'Ativo']]:[]),['Integração',r.mes],['Ministérios',r.mins.join(', ')||'—'],['Família',r.fam||'—'],['Telefone',r.tel],['E-mail',r.mail]];}
function pmExtra(r){const dg=r.tel.replace(/\D/g,'');
 return `<div class="row g3"><a class="btn outline md grow" href="tel:+55${dg}">Ligar</a><a class="btn outline md grow" href="https://wa.me/55${dg}" target="_blank" rel="noopener">WhatsApp</a></div>${r.st==='int'&&can('pessoas','editar')?`<button class="btn outline md block" data-a="pmMin" data-v="${r.id}">Adicionar a um ministério</button>`:''}`;}
Object.assign(A,{
 pmMin:id=>{const r=LSD.pessoas['Membros'].rows.find(x=>x.id===id),l=LSD.comunidade['Ministérios'].rows.map(x=>x.n).filter(n=>!r.mins.includes(n));
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Adicionar a um ministério</h3><p class="callout">${esc(r.n)} entra no ministério escolhido.</p></div>${l.length?`<div class="vl">${l.map(n=>`<button class="vr tap" data-a="pmMinGo" data-v="${id}|${esc(n)}"><span class="grow vn">${esc(n)}</span></button>`).join('')}</div>`:vsEmpty('Já está em todos','Não há outro ministério para escolher.')}<button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div>`);},
 pmMinGo:v=>{const [id,n]=v.split('|'),r=LSD.pessoas['Membros'].rows.find(x=>x.id===id);r.mins.push(n);r.s=pmS(r);r.d=pmD(r);closeSheet();softRender();toast('success','Adicionado ao ministério',r.n.split(' ')[0]+' · '+n);}
});

/* ===== Pessoas › Integração: espelha a web (Integrações e Fila de espera); pedidos de família ficam na web ===== */
const ITG_PO=['Ana Beatriz Lopes','Caio Martins','Débora Nascimento','Eduardo Pires','Fabiana Rocha','Gabriel Tavares','Heloísa Ramos','Ícaro Mendes','Jéssica Farias','Kleber Duarte','Larissa Campos','Murilo Santos','Natália Vieira','Orlando Reis','Priscila Moraes','Quésia Almeida','Rafael Bastos','Sabrina Lima','Tales Ferreira','Úrsula Gomes','Vitor Hugo Dias','Yasmin Costa','Zeca Barbosa','Amanda Peixoto'];
const ITG_STEPS=['Boas-vindas','Café com a liderança','Fundamentos da fé','Batismo','Integração'];
const ITG_ST={pe:['warning','Pendente'],ac:['info','Aceito'],em:['off','Em etapas'],ok:['ok','Integrado']};
const ITG_WHY={lo:['warning','Integração lotada'],pz:['info','Fora do prazo'],se:['off','Sem integração aberta']};
function itgMk(id,n,from,to,cur,lim,seq,off,o){return Object.assign({id,n,from,to,cur,lim,ppl:seq.map((st,i)=>({id:id+'p'+i,n:ITG_PO[(i*5+off)%24],st,step:st==='ok'?5:st==='em'?(i%4)+1:0}))},o||{});}
const ITG=[
 itgMk('i1','Setembro/2026','18 set','3 out',true,16,['pe','pe','pe','ac','ac','em','em','em','em','em','ok','ok','ok','ok'],0,{link:'https://chat.whatsapp.com/grupo-do-zap',resp:'Daniela Rocha',contact:'https://wa.me/5511987542201'}),
 itgMk('i2','Agosto/2026','18 ago','2 set',false,30,['em','em','ok','ok','ok','ok','ok','ok','ok'],7,{link:'https://chat.whatsapp.com/agosto',resp:'Marina Costa'}),
 itgMk('i3','Julho/2026','18 jul','2 ago',false,0,['ok','ok','ok','ok','ok','ok'],11),
 itgMk('i4','Abril/2026','17 abr','2 mai',false,0,['em','ok','ok','ok','ok','ok'],3)
];
ITG[0].ppl[0].prev={s:'Desligado',d:'12/04/2026',r:'Decisão pastoral'};
/* a fila é da igreja, não de uma integração: entra quem pede com a integração lotada, fora do prazo ou sem integração aberta */
const ITG_FILA=[['Mariana Teixeira','(11) 98811-2034','12/09/2026','lo'],['Gustavo Lopes','(11) 97722-3410','15/09/2026','lo'],['Paula Menezes','(11) 98123-9087','22/09/2026','pz'],['Rogério Alves','(11) 99144-7755','25/09/2026','pz'],['Tatiane Duarte','(11) 96655-2218','28/09/2026','se']].map(([n,ph,since,why],i)=>({id:'if'+i,n,ph,since,why}));
S.itg={top:'lista',f:'todos',q:'',sel:null,n:1};
const itgCur=()=>ITG.find(g=>g.cur);
const itgFree=()=>{const g=itgCur();return !g?0:g.lim?Math.max(0,g.lim-g.ppl.length):Infinity;};
const itgOverBy=g=>g&&g.lim?Math.max(0,g.ppl.length-g.lim):0;/* quantas pessoas passam do limite (INT-P-09: a equipe pode passar) */
const itgPend=()=>{const g=itgCur();return g?g.ppl.filter(p=>p.st==='pe').length:0;};
const itgG=()=>ITG.find(x=>x.id===S.itg.sel);
const itgP=id=>itgG().ppl.find(x=>x.id===id);
const itgStep=p=>p.st==='pe'?'Aguardando aceite':p.st==='ok'?'Concluiu todas as etapas':'Etapa '+(p.step+1)+' de '+ITG_STEPS.length+' · '+ITG_STEPS[p.step];
const itgOpen1=g=>g.ppl.filter(p=>p.st==='pe'||p.st==='ac').length;/* quem ainda tem etapa em aberto: alvo do reenvio de e-mail */
/* as pendências do módulo (Início e Pendências) saem dos dados */
Object.defineProperty(GPEND,'pessoas',{configurable:true,enumerable:true,get:()=>[['Pedidos de integração',itgPend()]].filter(x=>x[1]>0)});
function itgLista(){return fndBox('itgLst','Buscar integração')+`<div class="vl" id="itgLst">${ITG.map(g=>{const ok=g.ppl.filter(p=>p.st==='ok').length;return `<button class="vr tap" data-q="${esc(g.n)}" data-a="itgOpen" data-v="${g.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(g.n)}</span><span class="vs">Pedidos de ${g.from} a ${g.to} · ${g.ppl.length}${g.lim?' de '+g.lim:''} pessoas · ${ok} integradas${itgOverBy(g)?' · '+itgOverBy(g)+' acima do limite':''}</span></span>${vsTag(g.cur?'ok':'off',g.cur?'Atual':'Encerrada')}</button>`;}).join('')}</div>`;}
function itgFila(){const g=itgCur(),free=itgFree(),n=ITG_FILA.length,ed=can('pessoas','editar'),over=itgOverBy(g);
 const info=!g?'Não há integração atual. Crie uma na web para chamar a fila.':free===Infinity?g.n+' está aberta, sem limite de vagas.':free>0?g.n+' tem '+free+(free===1?' vaga livre.':' vagas livres.'):g.n+(over?' está '+over+(over===1?' pessoa':' pessoas')+' acima do limite.':' está lotada.')+' Chamar continua valendo: a decisão é do líder.';
 return `<p class="callout">A fila é da igreja, não de uma integração. ${info}</p>${ed&&n>0?`<button class="btn primary md block" data-a="itgCallN">Chamar os próximos…</button>`:''}${ITG_FILA.length?fndBox('itgFl','Buscar pessoa na fila')+`<div class="vl" id="itgFl">${ITG_FILA.map((p,i)=>`<button class="vr tap" data-q="${esc(p.n)}" data-a="itgFilaOpen" data-v="${p.id}"><span class="vs" style="min-width:28px">${i+1}º</span><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">na fila desde ${p.since}</span></span>${vsTag(ITG_WHY[p.why][0],ITG_WHY[p.why][1])}</button>`).join('')}</div>`:vsEmpty('Ninguém na fila','Quem pedir com a integração lotada ou fechada entra aqui.')}`;}
function itgBody(){const T=S.itg.top;
 return vsChips('itgTop',T,[['lista','Integrações',ITG.length],['fila','Fila de espera',ITG_FILA.length]])+(T==='fila'?itgFila():itgLista());}
/* lista de pessoas da integração, com o filtro por status e a busca */
function itgRows(g){const f=S.itg.f,q=norm2(S.itg.q),ord={pe:0,ac:1,em:2,ok:3};
 const l=g.ppl.filter(p=>(f==='todos'||p.st===f)&&(!q||norm2(p.n).includes(q))).sort((a,b)=>ord[a.st]-ord[b.st]||b.step-a.step);
 return l.length?`<div class="vl">${l.map(p=>`<button class="vr tap" data-a="itgPerson" data-v="${p.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">${p.prev?'Já saiu antes · ':''}${itgStep(p)}</span></span>${vsTag(ITG_ST[p.st][0],ITG_ST[p.st][1])}</button>`).join('')}</div>`:vsEmpty('Ninguém aqui','Nenhuma pessoa nesse filtro ou busca.');}
function itgSheet(){const g=itgG();if(!g)return;const f=S.itg.f,cnt=s=>g.ppl.filter(p=>p.st===s).length,ed=can('pessoas','editar'),nr=itgOpen1(g);
 const cp=(l,v)=>`<div class="vr"><span class="vs" style="min-width:104px">${l}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${v?esc(v.replace('https://','')):'Não informado'}</span>${v?`<button class="link" data-a="itgCopy" data-v="${esc(v)}">Copiar</button>`:''}</div>`;
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><div class="row g3" style="align-items:center"><h3 class="t2">${esc(g.n)}</h3>${vsTag(g.cur?'ok':'off',g.cur?'Atual':'Encerrada')}</div><p class="vs">Pedidos de ${g.from} a ${g.to} · ${g.ppl.length}${g.lim?' de '+g.lim:''} pessoas${itgOverBy(g)?' · '+itgOverBy(g)+' acima do limite':''}</p></div>
  <div class="vl">${cp('Grupo do WhatsApp',g.link)}${cp('Responsável',g.resp)}${g.contact?cp('Contato',g.contact):''}</div>
  ${ed?`<button class="btn outline md block" data-a="itgResend" ${nr?'':'disabled'}>Reenviar e-mail${nr?' ('+nr+')':''}</button>${nr?'':'<p class="vs">Ninguém com etapa em aberto para reenviar.</p>'}`:''}
  ${vsSearch('itgQ','Buscar pessoa',S.itg.q)}
  ${vsChips('itgF',f,[['todos','Todos',g.ppl.length],...Object.keys(ITG_ST).map(s=>[s,ITG_ST[s][1],cnt(s)])])}
  <div id="itgList">${itgRows(g)}</div>
  <button class="btn outline md block" data-a="closeSheet">Fechar</button></div>`,sh=>{const q=$('#itgQ',sh);if(q)q.addEventListener('input',e=>{S.itg.q=e.target.value;const l=$('#itgList',sh);if(l)l.innerHTML=itgRows(g);});});}
function itgPersonSheet(id){const g=itgG(),p=itgP(id),ed=can('pessoas','editar');
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(p.n)}</h3>${vsTag(ITG_ST[p.st][0],ITG_ST[p.st][1])}</div>
  <div class="vl"><div class="vr"><span class="vs" style="min-width:104px">Integração</span><span class="grow" style="text-align:right">${esc(g.n)}</span></div><div class="vr"><span class="vs" style="min-width:104px">Etapa atual</span><span class="grow" style="text-align:right">${itgStep(p)}</span></div></div>
  ${p.prev?`<p class="callout">Já saiu antes: ${p.prev.s} em ${p.prev.d} · ${esc(p.prev.r)}.</p>`:''}
  <div class="stack g3">${ed&&p.st==='pe'?`<button class="btn primary md block" data-a="itgAccept" data-v="${id}">Aceitar</button><button class="btn outline md block" data-a="itgNo" data-v="${id}">Recusar</button>`:''}${ed&&(p.st==='ac'||p.st==='em')?`<button class="btn primary md block" data-a="itgAdv" data-v="${id}">${p.step>=ITG_STEPS.length-1?'Concluir integração':'Avançar etapa'}</button>`:''}${ed&&(p.st==='pe'||p.st==='ac')?`<button class="btn outline md block" data-a="itgResend1" data-v="${id}">Reenviar e-mail</button>`:''}<button class="tlink" data-a="itgBack">Voltar</button></div></div>`);}
function itgFilaSheet(id){const p=ITG_FILA.find(x=>x.id===id),i=ITG_FILA.indexOf(p),free=itgFree(),ed=can('pessoas','editar'),cur=itgCur();
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(p.n)}</h3>${vsTag(ITG_WHY[p.why][0],ITG_WHY[p.why][1])}</div>
  <div class="vl"><div class="vr"><span class="vs" style="min-width:104px">Posição</span><span class="grow" style="text-align:right">${i+1}º</span></div><div class="vr"><span class="vs" style="min-width:104px">Telefone</span><span class="grow" style="text-align:right">${p.ph}</span></div><div class="vr"><span class="vs" style="min-width:104px">Na fila desde</span><span class="grow" style="text-align:right">${p.since}</span></div></div>
  <div class="stack g3">${ed?(!cur?'<p class="callout">Não há integração atual. Crie uma na web para chamar a fila.</p>':(free>0?'':`<p class="callout">${esc(cur.n)} está no limite (${cur.ppl.length} de ${cur.lim}). Chamar deixa em ${cur.ppl.length+1} de ${cur.lim}. A decisão é sua.</p>`)+`<button class="btn primary md block" data-a="itgCall" data-v="${id}">${free>0?'Chamar':'Chamar mesmo assim'}</button>`)+`<button class="btn outline md block" data-a="itgFilaRm" data-v="${id}">Remover da fila</button>`:''}<button class="tlink" data-a="closeSheet">Voltar</button></div></div>`);}
/* Chamar os próximos: o líder escolhe a quantidade; passar do limite é decisão dele (INT-P-09) */
function itgCallSheet(){const g=itgCur(),free=itgFree(),n=S.itg.n,over=free!==Infinity&&n>free;
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Chamar os próximos</h3><p class="callout">Por ordem de chegada, para ${esc(g.n)}.</p></div>
  <div class="row g3" style="align-items:center;justify-content:center"><button class="btn outline md" data-a="itgNDec" aria-label="Menos uma pessoa">−</button><b class="t2" style="min-width:56px;text-align:center">${n}</b><button class="btn outline md" data-a="itgNInc" aria-label="Mais uma pessoa">+</button></div>
  <p class="${over?'callout':'vs'}" style="text-align:center">${free===Infinity?'Sem limite de vagas.':!over?'Cabem nas '+free+(free===1?' vaga livre.':' vagas livres.'):'Passa do limite: a integração fica com '+(g.ppl.length+n)+' de '+g.lim+'. A decisão é sua.'}</p>
  <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Voltar</button><button class="btn primary md grow" data-a="itgCallGo">Chamar ${n}</button></div></div>`);}
Object.assign(A,{
 itgTop:v=>{S.itg.top=v;softRender();},
 itgOpen:id=>{S.itg.sel=id;S.itg.f='todos';S.itg.q='';itgSheet();},
 itgF:v=>{S.itg.f=v;itgSheet();},
 itgBack:()=>itgSheet(),
 itgPerson:id=>itgPersonSheet(id),
 itgCopy:v=>{try{navigator.clipboard.writeText(v);}catch(e){}toast('success','Copiado','');},
 itgAccept:id=>{const p=itgP(id);p.st='ac';softRender();toast('success','Pedido aceito',p.n+' foi avisada no app.');itgSheet();},
 itgAdv:id=>{const p=itgP(id);p.step++;p.st=p.step>=ITG_STEPS.length?'ok':'em';softRender();toast('success',p.st==='ok'?'Integração concluída':'Etapa concluída',p.n);itgSheet();},
 itgNo:id=>{const g=itgG(),p=itgP(id);reasonSheet({title:'Recusar pedido',callout:esc(p.n)+' · pedido de integração em '+esc(g.n),ph:'Ex.: pediu para entrar na próxima turma',btn:'Recusar',who:p.n.split(' ')[0],done:'Recusado',ms:600,
  run:async why=>{g.ppl.splice(g.ppl.indexOf(p),1);await closeSheet();softRender();toast('info','Pedido recusado',p.n.split(' ')[0]+' vê o motivo no app.');itgSheet();}});},
 /* reenviar e-mail: o pedido vai para Comunicação, que envia (INT-UC-17 e 18); só quem ainda tem etapa em aberto */
 itgResend:()=>{const g=itgG(),n=itgOpen1(g);if(!n){toast('info','Nada a reenviar','Ninguém com etapa em aberto.');return;}toast('success','E-mail reenviado',n+(n===1?' pessoa':' pessoas'));},
 itgResend1:id=>{const p=itgP(id);toast('success','E-mail reenviado',p.n);},
 itgFilaOpen:id=>itgFilaSheet(id),
 itgCall:id=>{const g=itgCur(),i=ITG_FILA.findIndex(x=>x.id===id);if(!g||i<0)return;const p=ITG_FILA.splice(i,1)[0];g.ppl.push({id:g.id+'q'+p.id,n:p.n,st:'ac',step:0});closeSheet();softRender();toast('success','Pessoa chamada',p.n+' foi aceita em '+g.n+' e avisada no app.');},
 itgFilaRm:id=>{const p=ITG_FILA.find(x=>x.id===id);vsConfirm('Remover da fila?',esc(p.n)+' sai da fila de espera. Essa ação não pode ser desfeita.','Remover',()=>{ITG_FILA.splice(ITG_FILA.indexOf(p),1);closeSheet();softRender();toast('success','Removida da fila',p.n);});},
 itgCallN:()=>{if(!itgCur())return;const free=itgFree();S.itg.n=Math.min(ITG_FILA.length,Math.max(1,free===Infinity?ITG_FILA.length:free));itgCallSheet();},
 itgNDec:()=>{S.itg.n=Math.max(1,S.itg.n-1);itgCallSheet();},
 itgNInc:()=>{S.itg.n=Math.min(ITG_FILA.length,S.itg.n+1);itgCallSheet();},
 itgCallGo:()=>{const g=itgCur(),n=Math.min(S.itg.n,ITG_FILA.length);if(!g||n<1)return;for(let k=0;k<n;k++){const p=ITG_FILA.shift();g.ppl.push({id:g.id+'q'+p.id,n:p.n,st:'ac',step:0});}closeSheet();softRender();toast('success',n+(n===1?' pessoa chamada':' pessoas chamadas'),'Aceitas em '+g.n+' e avisadas no app.');}
});

/* ===== Pessoas › Devocional: acompanhamento + adicionar e tirar participante (montar o dia e o resto ficam na web) ===== */
const DVG_PASTORES=['Pr. Rafael Pereira','Pr. Marcos Lima','Pr. Paulo Mendes','Diac. Ana Costa'];
const DVG_TG={em:['ok','Em dia'],at:['warning','Atrasado'],nc:['danger','Não começou']};
const dvgCls=p=>!p.contam?'em':p.leu===0?'nc':p.leu>=p.contam?'em':'at';
const dvgPct=p=>p.contam?Math.round(p.leu/p.contam*100):null;
const dvgInt=()=>LSD.pessoas['Membros'].rows.filter(r=>r.st==='int').map(r=>r.n);
function dvgRows(){const I=dvgInt();
 const mk=(id,n,per,dias,cont,st,ppl)=>{const r={id,n,per,dias,cont,st,ppl:ppl.map(([nm,leu,contam,hoje])=>({n:nm,leu,contam,hoje:!!hoje}))};dvgSync(r);return r;};
 return [
  mk('dv0','Liderança Forte','21 set a 5 out',15,'13 de 15','and',[[I[0],11,11,1],[I[1],11,11,1],[I[2],10,11,1],[I[3],9,11,1],[I[4],11,11,1],[I[5],8,11,1],[I[6],7,11,0],[I[7],10,11,1],[I[8],4,11,0],[I[9],11,11,1],[I[10],0,11,0],[I[11],0,6,0]]),
  mk('dv1','Tempo com Deus · Pastores','5 a 14 out',10,'4 de 10','agd',DVG_PASTORES.map(n=>[n,0,0,0])),
  mk('dv2','Semana de Oração','8 a 14 set',7,'7 de 7','enc',[[I[0],7,7,0],[I[1],7,7,0],[I[2],7,7,0],[I[3],7,7,0],[I[4],7,7,0],[I[5],6,7,0],[I[6],6,7,0],[I[7],5,7,0]])];}
/* resumo, subtítulo e detalhes saem dos participantes (e se atualizam ao adicionar ou tirar) */
function dvgSync(r){const n=r.ppl.length,c={em:0,at:0,nc:0};r.ppl.forEach(p=>c[dvgCls(p)]++);
 const pcts=r.ppl.map(dvgPct).filter(x=>x!==null),avg=pcts.length?Math.round(pcts.reduce((a,b)=>a+b,0)/pcts.length):null,viram=r.ppl.filter(p=>p.hoje).length;
 r.s=r.per+' · '+n+(n===1?' participante':' participantes')+(r.st==='agd'?' · começa em breve':avg!==null?' · leitura '+avg+'%':'');
 r.d=[['Período',r.per+' · '+r.dias+' dias'],['Dias com conteúdo',r.cont],['Participantes',String(n)],['Leitura média',r.st==='agd'||avg===null?'—':avg+'%'],...(r.st==='and'?[['Hoje',viram+' de '+n+' viram']]:[]),...(r.st!=='agd'?[['Em dia',String(c.em)],['Atrasados',String(c.at)],['Não começaram',String(c.nc)]]:[])];}
LSD.pessoas['Devocional'].rows=dvgRows();
function dvgExtra(r){const ed=can('pessoas','editar')&&r.st!=='enc',nv=r.st==='and'?r.ppl.filter(p=>!p.hoje):[],ord={nc:0,at:1,em:2};
 const l=r.ppl.map((p,i)=>({p,i})).sort((a,b)=>ord[dvgCls(a.p)]-ord[dvgCls(b.p)]);
 return (nv.length?`<div class="stack g2"><p class="eb2">Ainda não viram hoje</p><div class="vl">${nv.map(p=>`<div class="vr"><span class="vn">${esc(p.n)}</span></div>`).join('')}</div></div>`:'')
  +`<div class="stack g2"><div class="row between" style="align-items:center"><p class="eb2">Participantes</p>${ed?`<button class="link" data-a="dvgAdd" data-v="${r.id}">Adicionar</button>`:''}</div>${fndBox('dvgPl','Buscar participante')}<div class="vl" id="dvgPl">${l.map(({p,i})=>{const k=dvgCls(p);return `<div class="vr" data-q="${esc(p.n)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">${r.st==='agd'?'Começa em breve':p.contam?'leu '+p.leu+' de '+p.contam:'Entrou hoje'}</span></span>${r.st==='agd'?'':vsTag(DVG_TG[k][0],DVG_TG[k][1])}${ed?`<button class="link" data-a="dvgRm" data-v="${r.id}|${i}" aria-label="Tirar ${esc(p.n)}">Tirar</button>`:''}</div>`;}).join('')}</div></div>`;}
const dvgRow=id=>LSD.pessoas['Devocional'].rows.find(x=>x.id===id);
function dvgPoolFor(r){return [...new Set([...DVG_PASTORES,...dvgInt()])].filter(n=>!r.ppl.some(p=>p.n===n));}
function dvgAddSheet(id){const r=dvgRow(id),pool=dvgPoolFor(r),mins=[...new Set(LSD.pessoas['Membros'].rows.filter(x=>x.st==='int').flatMap(x=>x.mins))];
 const grp=[['Pastores',DVG_PASTORES],...mins.map(m=>[m,LSD.pessoas['Membros'].rows.filter(x=>x.st==='int'&&x.mins.includes(m)).map(x=>x.n)]),['Todos os membros integrados',dvgInt()]].map(([n,l])=>[n,l.filter(x=>pool.includes(x))]).filter(x=>x[1].length);S.dvg={id,grp};
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Adicionar participantes</h3><p class="callout">Só entram membros integrados. Quem entra no meio vê o que já foi liberado, mas só conta a partir de hoje.</p></div>
  ${grp.length?`<div class="stack g2"><p class="eb2">Grupo inteiro</p><div class="vl">${grp.map(([n,l],k)=>`<button class="vr tap" data-a="dvgGrp" data-v="${id}|${k}"><span class="grow vn">${esc(n)}</span><span class="vs">${l.length}</span></button>`).join('')}</div></div>`:''}
  <div class="stack g2"><p class="eb2">Buscar pessoa</p>${vsSearch('dvgQ','Nome (mínimo 3 letras)','')}<div id="dvgRes"></div></div>
  <button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div>`,sh=>{
  const q=$('#dvgQ',sh);if(q)q.addEventListener('input',e=>{const t=norm2(e.target.value),box=$('#dvgRes',sh);if(!box)return;
   if(t.length<3){box.innerHTML='';return;}const l=dvgPoolFor(r).filter(n=>norm2(n).includes(t));
   box.innerHTML=l.length?`<div class="vl">${l.map(n=>`<button class="vr tap" data-a="dvgOne" data-v="${id}|${esc(n)}"><span class="grow vn">${esc(n)}</span><span class="vs">Adicionar</span></button>`).join('')}</div>`:vsEmpty('Ninguém encontrado','Só membros integrados aparecem aqui.');});});}
Object.assign(A,{
 dvgAdd:id=>dvgAddSheet(id),
 dvgOne:v=>{const [id,n]=v.split('|'),r=dvgRow(id);r.ppl.push({n,leu:0,contam:0,hoje:false});dvgSync(r);softRender();toast('success','Participante adicionado',n);A.lsOpen(id);},
 dvgGrp:v=>{const [id,k]=v.split('|'),r=dvgRow(id),l=(S.dvg&&S.dvg.id===id?S.dvg.grp:[])[+k];if(!l)return;l[1].forEach(n=>{if(!r.ppl.some(p=>p.n===n))r.ppl.push({n,leu:0,contam:0,hoje:false});});dvgSync(r);softRender();toast('success',l[1].length+(l[1].length===1?' participante adicionado':' participantes adicionados'),l[0]);A.lsOpen(id);},
 dvgRm:v=>{const [id,i]=v.split('|'),r=dvgRow(id),p=r.ppl[+i];vsConfirm('Tirar '+esc(p.n.split(' ')[0])+' do devocional?',esc(p.n)+' deixa de ver o devocional. O que já viu sai do progresso.','Tirar',()=>{r.ppl.splice(+i,1);dvgSync(r);softRender();closeSheet().then(()=>A.lsOpen(id));toast('success','Participante tirado',p.n);});}
});
/* ===== Cuidado (consolidado 08/11/2026): Discipulado, Acompanhamento e Pedidos de oração com os status da spec e do web ===== */
const cuISO=k=>{const d=new Date();d.setDate(d.getDate()+k);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
const cuToday=()=>cuISO(0);
const cuDays=iso=>Math.max(0,Math.round((new Date(cuToday()+'T12:00:00')-new Date(iso+'T12:00:00'))/864e5));
const cuFmt=iso=>{const [,m,d]=iso.split('-');return +d+' '+['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'][+m-1];};
const cuTel=i=>'(11) 9'+(8000+i*137)+'-'+(1000+i*91);
const cuAdm=()=>S.role==='admin'||lvlOf('cuidado')>=3;/* Administrar em Cuidado */
const cuAgo=n=>n===0?'hoje':'há '+n+(n===1?' dia':' dias');
const cuBtns=tel=>{const dg=tel.replace(/\D/g,'');return `<div class="row g3"><a class="btn outline md grow" href="tel:+55${dg}">Ligar</a><a class="btn outline md grow" href="https://wa.me/55${dg}" target="_blank" rel="noopener">WhatsApp</a></div>`;};
S.cu={nc:null};
/* grupo de opções de escolha única dentro de um sheet: <div data-pick="nome"> com botões data-val; devolve o valor marcado */
const cuPickHTML=(name,opts,cur)=>`<div class="row g2" style="flex-wrap:wrap" data-pick="${name}">${opts.map(o=>`<button type="button" class="chip" data-val="${esc(o)}" aria-pressed="${o===cur}">${esc(o)}</button>`).join('')}</div>`;
const cuPickWire=sh=>sh.querySelectorAll('[data-pick]').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('[data-val]');if(!b)return;g.querySelectorAll('[data-val]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));}));
const cuPicked=(sh,name)=>{const b=sh.querySelector(`[data-pick="${name}"] [aria-pressed="true"]`);return b?b.getAttribute('data-val'):'';};
const cuVal=(sh,id)=>{const e=sh.querySelector('#'+id);return e?(e.value||'').trim():'';};

/* ---------- Discipulado ---------- */
const CU_RIT={Semanal:7,Quinzenal:14,Mensal:30};
function cuDiscMk(i,n,disc,rit,days,base,paused){
 const r={id:'cd'+i,n,disc,rit,lastISO:cuISO(-days),base,paused:!!paused,tel:cuTel(i)};
 const stOf=()=>r.paused?'pa':cuDays(r.lastISO)>CU_RIT[r.rit]?'at':'em';
 Object.defineProperties(r,{
  st:{get:stOf,set(){},enumerable:true},
  s:{get(){return 'Discipulado por '+r.disc+' · '+(r.paused?'pausado':'último contato '+cuAgo(cuDays(r.lastISO)));},enumerable:true},
  d:{get(){const dias=cuDays(r.lastISO),resto=CU_RIT[r.rit]-dias;
   return [['Discipulador',r.disc],['Ritmo',r.rit],['Último contato',cuAgo(dias)],r.paused?['Situação','Pausado']:resto>=0?['Próximo contato','em até '+resto+(resto===1?' dia':' dias')]:['Atraso','há '+(-resto)+(-resto===1?' dia':' dias')],['Na base',r.base+(r.base===1?' pessoa':' pessoas')],...mtgNextRow(r),['Telefone',r.tel]];},enumerable:true}});
 return r;}
const CU_DISC=[cuDiscMk(0,'Gabriel Souza','Rafael Pereira','Quinzenal',5,0),cuDiscMk(1,'Isabela Rocha','Ana Costa','Semanal',9,2),cuDiscMk(2,'Fernanda Lima','Marcos Lima','Quinzenal',30,1,true),cuDiscMk(3,'Henrique Dias','Rafael Pereira','Quinzenal',20,0),cuDiscMk(4,'Larissa Melo','Juliana Reis','Semanal',3,3)];
{const o={at:0,em:1,pa:2};Object.defineProperty(LSD.cuidado['Discipulado'],'rows',{configurable:true,enumerable:true,get:()=>CU_DISC.slice().sort((a,b)=>o[a.st]-o[b.st]||cuDays(b.lastISO)-cuDays(a.lastISO))});}
function cuDiscExtra(r){const ed=can('cuidado','editar');
 return cuBtns(r.tel)+mtgBlock('disc',r)+(ed?`<div class="stack g3">${r.paused?`<button class="btn outline md block" data-a="cuResume" data-v="${r.id}">Retomar discipulado</button>`:`<button class="btn outline md block" data-a="cuPause" data-v="${r.id}">Pausar discipulado</button>`}</div>`:'');}

/* ---------- Acompanhamento ---------- */
const cuSeeRestr=r=>cuAdm()||(S.user&&r.resp===S.user.name);
const cuHidden=r=>r.st==='nv'||(r.restr&&!cuSeeRestr(r));
function cuCaseMk(o){
 const r=Object.assign({restr:false,mine:false,tel:'(11) 98765-4321',viewers:'Toda a liderança de Cuidado'},o);
 const red=()=>r.restr&&!cuSeeRestr(r);
 Object.defineProperties(r,{
  n:{get(){return red()?'Caso restrito':r.who;},enumerable:true},
  s:{get(){return red()?'Só o Administrar e os pastores escolhidos veem':r.st==='nv'?r.kind+' · aguardando a triagem':r.kind+' · '+r.txt;},enumerable:true},
  d:{get(){if(red())return [['Acesso','Só o Administrar e os pastores escolhidos veem este caso.']];
   return [['Tipo',r.kind],['Aberto em',r.opened],['Responsável',r.resp||'Ainda sem responsável'],['Quem vê',r.restr?'Só o Administrar e os pastores escolhidos':r.viewers],['Descrição',r.txt],...(r.st==='nv'?[]:mtgSummaryRows(r))];},enumerable:true}});
 return r;}
const CU_CASES=[...URG.map(u=>cuCaseMk({id:'ca'+u.id,who:u.who,kind:u.kind,txt:u.txt,resp:u.resp,opened:u.d,st:'ur'})),
 cuCaseMk({id:'ca9',who:'Sérgio Matos',kind:'Aconselhamento',txt:'Conversa pastoral sobre o casamento.',resp:'Pr. Marcos Lima',opened:'02/09/2026',st:'ac'}),
 cuCaseMk({id:'ca10',who:'Rita Gomes',kind:'Visita',txt:'Visita depois do nascimento do filho.',resp:'Diac. Ana Costa',opened:'10/09/2026',st:'re'}),
 cuCaseMk({id:'ca11',who:'Lúcia Ferraz',kind:'Aconselhamento',txt:'Assunto familiar delicado.',resp:'Pr. Rafael Pereira',opened:'25/10/2026',st:'ac',restr:true}),
 cuCaseMk({id:'ca12',who:'Paulo Nunes',kind:'Família',txt:'Casal em conflito pediu conversa com a liderança.',resp:'',opened:'07/11/2026',st:'nv',mine:true})];
{const o={nv:0,ur:1,ac:2,re:3};Object.defineProperty(LSD.cuidado['Acompanhamento'],'rows',{configurable:true,enumerable:true,get:()=>CU_CASES.filter(r=>r.st!=='nv'||cuAdm()||r.mine).sort((a,b)=>o[a.st]-o[b.st])});}
function cuCaseExtra(r){if(r.restr&&!cuSeeRestr(r))return '';
 if(r.st==='nv')return cuAdm()?`<p class="callout">Caso novo. Triar define quem acompanha, se é urgente e quem pode ver.</p><button class="btn primary md block" data-a="cuTriage" data-v="${r.id}">Triar caso</button>`:'<p class="callout">Aguardando a triagem de quem tem Administrar em Cuidado.</p>';
 return cuBtns(r.tel)+mtgBlock('caso',r);}
const cuRow=(k,id)=>(k==='disc'?CU_DISC:CU_CASES).find(x=>x.id===id);
/* triagem: quem acompanha, urgência e quem vê (PAS-UC-28) */
const CU_PASTORES=['Pr. Marcos Lima','Pr. Rafael Pereira','Diac. Ana Costa'];
function cuTriageSave(r,o){if(!o.resp)return 'Escolha quem acompanha o caso.';r.resp=o.resp;r.restr=o.vis==='Restrito';r.st=o.urg==='Urgente'?'ur':'ac';return null;}
function cuTriageSheet(id){const r=CU_CASES.find(x=>x.id===id);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Triar caso</h3><p class="callout">${esc(r.who)} · ${esc(r.kind)}</p></div>
  <div class="stack g2"><span class="eb2">Quem acompanha</span>${cuPickHTML('resp',CU_PASTORES,'')}</div>
  <div class="stack g2"><span class="eb2">Urgência</span>${cuPickHTML('urg',['Normal','Urgente'],r.urgente?'Urgente':'Normal')}</div>
  <div class="stack g2"><span class="eb2">Quem vê</span>${cuPickHTML('vis',['Toda a liderança de Cuidado','Restrito'],'Toda a liderança de Cuidado')}<p class="vs">Restrito: só o Administrar e os pastores escolhidos. A escolha dos pastores fica na web.</p></div>
  <div class="otpmsg" id="cuErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="cuGo">Triar</button><button type="button" class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div></div>`,sh=>{cuPickWire(sh);
  $('#cuGo',sh).addEventListener('click',()=>{const e=cuTriageSave(r,{resp:cuPicked(sh,'resp'),urg:cuPicked(sh,'urg'),vis:cuPicked(sh,'vis')});if(e){$('#cuErr',sh).textContent=e;return;}closeSheet();softRender();toast('success','Caso triado',r.who.split(' ')[0]+' · '+r.resp);});});}
/* novo caso, em dois passos: pessoa e tipo; depois descrição e urgência (PAS-WEB-04.06) */
const CU_TIPOS=['Hospital','Luto','Família','Saúde','Financeiro','Aconselhamento','Visita','Outro'];
function cuNcStep1(){const c=S.cu.nc||(S.cu.nc={who:'',kind:''});
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Novo caso</h3><p class="callout">Passo 1 de 2: quem e que tipo de cuidado.</p></div>
  ${vsSearch('cuNcQ','Buscar pessoa (mínimo 3 letras)','')}<div id="cuNcRes"></div>
  <div class="stack g2"><span class="eb2">Pessoa</span><p class="vn" id="cuNcWho">${c.who?esc(c.who):'<span class="vs">Nenhuma escolhida</span>'}</p></div>
  <div class="stack g2"><span class="eb2">Tipo</span>${cuPickHTML('kind',CU_TIPOS,c.kind)}</div>
  <div class="otpmsg" id="cuErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="cuGo">Continuar</button><button type="button" class="tlink" data-a="closeSheet">Cancelar</button></div></div>`,sh=>{cuPickWire(sh);
  $('#cuNcQ',sh).addEventListener('input',e=>{const t=norm2(e.target.value),box=$('#cuNcRes',sh);if(t.length<3){box.innerHTML='';return;}
   const l=LSD.pessoas['Membros'].rows.filter(x=>x.st==='int'&&norm2(x.n).includes(t));
   box.innerHTML=l.length?`<div class="vl">${l.map(x=>`<button class="vr tap" data-a="cuNcPick" data-v="${esc(x.n)}"><span class="grow vn">${esc(x.n)}</span></button>`).join('')}</div>`:vsEmpty('Ninguém encontrado','Só membros integrados aparecem aqui.');});
  $('#cuGo',sh).addEventListener('click',()=>{c.kind=cuPicked(sh,'kind');if(!c.who){$('#cuErr',sh).textContent='Escolha a pessoa.';return;}if(!c.kind){$('#cuErr',sh).textContent='Escolha o tipo de cuidado.';return;}cuNcStep2();});});}
function cuNcStep2(){const c=S.cu.nc;
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Novo caso</h3><p class="callout">Passo 2 de 2: ${esc(c.who)} · ${esc(c.kind)}</p></div>
  ${field({id:'cuTx',label:'O que está acontecendo',area:true,ph:'Descreva em poucas palavras',max:4000})}
  <div class="stack g2"><span class="eb2">Urgência</span>${cuPickHTML('urg',['Normal','Urgente'],'Normal')}</div>
  <div class="otpmsg" id="cuErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="cuGo">Abrir caso</button><button type="button" class="tlink" data-a="cuNcBack">Voltar</button></div></div>`,sh=>{cuPickWire(sh);
  $('#cuGo',sh).addEventListener('click',()=>{const e=cuNcSave({who:c.who,kind:c.kind,txt:cuVal(sh,'cuTx'),urg:cuPicked(sh,'urg')});if(typeof e==='string'){$('#cuErr',sh).textContent=e;return;}
   S.cu.nc=null;closeSheet().then(()=>{softRender();toast('success','Caso aberto',c.who.split(' ')[0]+' · aguardando a triagem');if(cuAdm())cuTriageSheet(e.id);});});});}
function cuNcSave(o){if(!o.txt)return 'Descreva o que está acontecendo.';const r=cuCaseMk({id:'cx'+Date.now(),who:o.who,kind:o.kind,txt:o.txt,resp:'',opened:cuToday().split('-').reverse().join('/'),st:'nv',mine:true,urgente:o.urg==='Urgente'});CU_CASES.unshift(r);return r;}

Object.assign(A,{
 /* pausar não pede motivo: a spec grava PauseReason = Manual (PAS-UC-07); a pausa só deixa de contar atraso */
 cuPause:id=>{const r=CU_DISC.find(x=>x.id===id);r.paused=true;closeSheet();softRender();toast('info','Discipulado pausado',r.n+' não conta atraso enquanto estiver pausado.');},
 cuResume:id=>{const r=CU_DISC.find(x=>x.id===id);r.paused=false;closeSheet();softRender();toast('success','Discipulado retomado',r.n);},
 cuTriage:id=>cuTriageSheet(id),
 cuNcPick:n=>{S.cu.nc.who=n;const w=$('#cuNcWho'),r=$('#cuNcRes');if(w)w.textContent=n;if(r)r.innerHTML='';},
 cuNcBack:()=>cuNcStep1()
});

/* ---------- Pedidos de oração ---------- */
const CU_PR=[['Alícia Mendes','Cura e restauração da saúde da minha mãe.',0,12,1,0,'at'],['Samuel Torres','Sabedoria e direção para mudança de carreira.',1,8,0,0,'at'],['Beatriz Lima','Reconciliação com meu irmão.',2,15,0,1,'at'],['Fernando Dias','Aprovação no concurso público.',3,6,0,0,'at'],['Carla Souza','Um emprego novo depois de meses procurando.',21,19,1,0,'rs']].map(([n,text,days,count,mine,anon,st],i)=>({id:'cp'+i,n,text,days,count,mine:!!mine,anon:!!anon,st}));
const cuWhen=n=>n===0?'Hoje':n===1?'Ontem':n+' dias atrás';
const cuPrName=p=>p.anon?(cuAdm()?p.n+' (anônimo)':'Anônimo'):p.n;
const cuPrN=f=>CU_PR.filter(p=>f==='todos'||(f==='at'&&p.st==='at')||(f==='sem'&&p.st==='at'&&!p.mine)||(f==='rs'&&p.st==='rs')).length;
S.cu.pf='at';
function cuPrBody(){const f=S.cu.pf,l=CU_PR.filter(p=>f==='todos'||(f==='at'&&p.st==='at')||(f==='sem'&&p.st==='at'&&!p.mine)||(f==='rs'&&p.st==='rs'));
 return vsChips('cuPf',f,[['at','Ativos',cuPrN('at')],['sem','Sem sua oração',cuPrN('sem')],['rs','Respondidos',cuPrN('rs')],['todos','Todos',cuPrN('todos')]])
  +(l.length?fndBox('cuPrL','Buscar pedido')+`<div class="vl" id="cuPrL">${l.map(p=>`<button class="vr tap" data-q="${esc(cuPrName(p)+' '+p.text)}" data-a="cuPrOpen" data-v="${p.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(cuPrName(p))}</span><span class="vs">${cuWhen(p.days)} · ${p.count} ${p.count===1?'pessoa orando':'pessoas orando'}${p.mine?' · você está orando':''}</span></span>${vsTag(p.st==='at'?'ok':'info',p.st==='at'?'Ativo':'Respondido')}</button>`).join('')}</div>`:vsEmpty(f==='sem'?'Você está orando por todos':'Nenhum pedido aqui',f==='sem'?'Todos os pedidos ativos já têm a sua oração.':''));}
function cuPrSheet(id){const p=CU_PR.find(x=>x.id===id),ed=can('cuidado','editar');
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(cuPrName(p))}</h3>${vsTag(p.st==='at'?'ok':'info',p.st==='at'?'Ativo':'Respondido')}</div>
  <p class="body">${esc(p.text)}</p>
  <div class="vl"><div class="vr"><span class="vs" style="min-width:104px">Quando</span><span class="grow" style="text-align:right">${cuWhen(p.days)}</span></div><div class="vr"><span class="vs" style="min-width:104px">Orando</span><span class="grow" style="text-align:right">${p.count} ${p.count===1?'pessoa':'pessoas'}${p.mine?' · você':''}</span></div></div>
  <div class="stack g3">${p.st==='at'&&!p.mine?`<button class="btn primary md block" data-a="cuPray" data-v="${id}">Estou orando</button>`:p.mine?'<p class="callout">Você está orando por este pedido.</p>':''}${ed&&p.st==='at'?`<button class="btn outline md block" data-a="cuPrAns" data-v="${id}">Marcar como respondido</button>`:''}${ed&&p.st==='rs'?`<button class="btn outline md block" data-a="cuPrReopen" data-v="${id}">Reabrir</button>`:''}${can('cuidado','excluir')?`<button class="btn danger md block" data-a="cuPrDel" data-v="${id}">Excluir</button>`:''}<button class="tlink" data-a="closeSheet">Fechar</button></div></div>`);}
Object.assign(A,{
 cuPf:v=>{S.cu.pf=v;softRender();},
 cuPrOpen:id=>cuPrSheet(id),
 cuPray:id=>{const p=CU_PR.find(x=>x.id===id);if(p.mine)return;p.mine=true;p.count++;closeSheet();softRender();toast('success','Você está orando',cuPrName(p));},
 cuPrAns:id=>{const p=CU_PR.find(x=>x.id===id);p.st='rs';closeSheet();softRender();toast('success','Pedido respondido',cuPrName(p));},
 cuPrReopen:id=>{const p=CU_PR.find(x=>x.id===id);p.st='at';closeSheet();softRender();toast('success','Pedido reaberto',cuPrName(p));},
 cuPrDel:id=>{const p=CU_PR.find(x=>x.id===id);vsConfirm('Excluir o pedido de '+esc(cuPrName(p).split(' ')[0])+'?','O pedido sai das listas e de quem está orando. O autor não é avisado e o texto é apagado depois, pela retenção.','Excluir',()=>{CU_PR.splice(CU_PR.indexOf(p),1);closeSheet();softRender();toast('success','Pedido excluído','');});}
});
/* as pendências do módulo saem dos dados */
Object.defineProperty(GPEND,'cuidado',{configurable:true,enumerable:true,get:()=>[['Casos aguardando triagem',CU_CASES.filter(r=>r.st==='nv').length,3],['Casos urgentes',CU_CASES.filter(r=>r.st==='ur').length],['Discipulados atrasados',CU_DISC.filter(r=>r.st==='at').length],['Pedidos sem sua oração',cuPrN('sem')]].filter(x=>x[1]>0)});
S.ls={key:'',q:'',f:'all'};
const lsC=(mod,sec)=>{const c=LSD[mod][sec],o=APPSEC[mod+'|'+sec];return o?Object.assign(Object.create(c),o):c;};
const lsCfg=()=>{const sc=gMod(S.gmod)[5];return lsC(S.gmod,!gFewSecs(S.gmod,sc)?S.gsec:sc[S.gtab]);};
const lsRow=id=>lsCfg().rows.find(r=>r.id===id);
const lsTag=(c,st)=>{const t=c.ST[st];return vsTag(t[0],t[1]);};
function lsRows(c){const q=norm2(S.ls.q),l=c.rows.filter(r=>(S.ls.f==='all'||r.st===S.ls.f)&&(!q||norm2(r.n+' '+r.s).includes(q)));let g=null;
 return l.length?`<div class="vl">${l.map(r=>{const head=r.g&&r.g!==g?(g=r.g,`<p class="eb2" style="padding:16px 0 8px;box-shadow:inset 0 -1px 0 var(--line)">${r.g}</p>`):'';return head+`<button class="vr tap" data-a="lsOpen" data-v="${r.id}">${c.av?pavM(r.n,lsAv[r.id.length%6]):''}<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}</span></span>${lsTag(c,r.st)}</button>`;}).join('')}</div>`:vsEmpty('Nada encontrado','Tente outra busca ou filtro.');}
function lsBody(m,sec){const c=lsC(m[0],sec);if(c.restrict&&S.role!=='admin')return `<div class="stack g5 vs-root">${vsEmpty('Área restrita','Só o Administrador e quem a igreja autorizar acessam este registro. Cada consulta vai para a auditoria.')}</div>`;if(c.custom)return `<div class="stack g5 vs-root">${c.custom()}</div>`;const key=m[0]+'|'+sec;if(S.ls.key!==key)Object.assign(S.ls,{key,q:'',f:'all'});
 const n=st=>c.rows.filter(r=>st==='all'||r.st===st).length,sts=Object.keys(c.ST);
 return `<div class="stack g5 vs-root">${pgHead(c.rows.length+' '+c.noun,c.noAdd?'':vsAdd(m[0],'lsNew',c.add))}${c.rows.length?vsSearch('lsQ','Buscar',''):''}${sts.length>1?vsChips('lsF',S.ls.f,[['all','Todos',n('all')],...sts.map(s=>[s,c.ST[s][1],n(s)])]):''}<div id="lsList">${lsRows(c)}</div></div>`;}
function lsSheet(id){const m=S.gmod,c=lsCfg(),r=lsRow(id);if(c.sheet==='usr')return admUserSheet(id);const acts=(c.hideActs&&c.hideActs(r)?[]:c.acts).filter(a=>a[2].includes(r.st)&&can(m,a[3]||'editar'));
 sheet(`<div class="stack g5">${r.cover?`<img class="rfcover" src="${r.cover}" alt="">`:''}<div class="row g3" style="align-items:center">${c.av?pavM(r.n,lsAv[r.id.length%6],'lg'):''}<div class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><h3 class="t2">${esc(r.n)}</h3>${lsTag(c,r.st)}</div></div>
 <div class="vl">${r.d.map(([l,v])=>`<div class="vr"><span class="vs" style="min-width:104px">${l}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(v)}</span></div>`).join('')}</div>
 ${rfMedia(r)}${c.extra?c.extra(r):''}<div class="stack g3">${can(m,'editar')?acts.map((a,i)=>`<button class="btn ${i?'outline':'primary'} md block" data-a="lsAct" data-v="${id}|${a[1]}">${a[0]}</button>`).join('')+(c.ro?(acts.length?'':'<button class="btn outline md block" data-a="closeSheet">Fechar</button>'):(!c.canEdit||c.canEdit(r)?`<button class="btn outline md block" data-a="lsEdit" data-v="${id}">${c.editLabel?c.editLabel(r):'Editar'}</button>`:'')):'<p class="callout">Você só pode ver esta ficha.</p>'}
 ${can(m,'excluir')&&!c.ro&&!(c.noDel&&c.noDel(r))?`<button class="btn danger md block" data-a="lsDel" data-v="${id}">Excluir</button>`:''}</div></div>`);}
function lsForm(id){const c=lsCfg(),r=id?lsRow(id):null;if(c.form)return rfForm(c,r);
 sheet(`<div class="stack g5"><h3 class="t2">${r?'Editar':c.add}</h3>${c.fields.map(([k,l,ph])=>field({id:'lf_'+k,label:l,ph,val:r?r[k]:''})).join('')}
 <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="lfOk">Salvar</button></div></div>`,sh=>$('#lfOk',sh).addEventListener('click',()=>{
  const n=val('lf_n'),s=val('lf_s');if(!n){setErr('lf_n','Preencha este campo.');return;}
  if(r){r.n=n;r.s=s||r.s;}else c.rows.unshift({id:'x'+Date.now(),n,s:s||'Sem detalhes ainda',st:c.newSt?c.newSt():Object.keys(c.ST)[0],cap:10,oc:0,d:[['Criado em','hoje'],['Responsável',S.user.name]]});
  closeSheet();softRender();toast('success',r?'Salvo':'Criado',n);}));}
Object.assign(A,{
 lsF:v=>{S.ls.f=v;softRender();},lsOpen:id=>lsSheet(id),lsNew:()=>{const c=lsCfg();if(c.newFlow)c.newFlow();else lsForm();},lsEdit:id=>lsForm(id),
 lsAct:v=>{const [id,to]=v.split('|'),r=lsRow(id),c=lsCfg();r.st=to;closeSheet();softRender();toast('success',c.ST[to][1],r.n);},
 lsDel:id=>{const r=lsRow(id),c=lsCfg();vsConfirm('Excluir “'+esc(r.n)+'”?',c.delBody||'Isso remove o registro da lista e não pode ser desfeito.','Excluir',()=>{c.rows.splice(c.rows.indexOf(r),1);closeSheet();softRender();toast('success','Excluído',r.n);});}
});
phone.addEventListener('input',e=>{if(e.target.id!=='lsQ')return;S.ls.q=e.target.value;const l=$('#lsList');if(l)l.innerHTML=lsRows(lsCfg());});

/* ===== Visão geral das páginas de Pessoas e Cuidado (cartões do web; alertas dos dados do módulo) ===== */
const ITG_FAM=[{id:'fr1',k:'vinculo',q:'Rafael Pereira',n:'Helena Pereira',rel:'Filha',age:3,d:'28/09/2026'},{id:'fr2',k:'remocao',q:'Rafael Pereira',n:'Marcos Lima',rel:'Cunhado',age:41,d:'27/09/2026'}];
function pvgItg(only){const g=itgCur(),free=itgFree(),ed=can('pessoas','editar'),np=itgPend(),nf=ITG_FILA.length;
 const sFila=!g?'Não há integração aberta':free===Infinity?'A integração atual não tem limite de vagas':free?'A integração atual tem '+free+(free===1?' vaga':' vagas'):'A integração atual está lotada';
 const tp=np+(np===1?' pedido de integração aguarda':' pedidos de integração aguardam');
 const items=[np?(ed?rsAtt('warn',tp,'Aceitar ou recusar','pgGo','pessoas|Integração'):rsAttV('warn',tp,'Só quem edita decide')):'',
  ...ITG_FAM.map(p=>pgWeb('warn',esc(p.n)+' · '+(p.k==='vinculo'?'pedido de vínculo':'pedido de remoção'),esc(p.rel)+' · pedido de '+esc(p.q),[['Pedido',p.k==='vinculo'?'Vínculo':'Remoção'],['Familiar',p.n+' · '+p.rel+' · '+p.age+' anos'],['Pedido por',p.q],['Data',p.d],['Situação','Em análise']],'Pessoas › Integração › Pedidos de família')),
  nf?rsAtt('info',nf+(nf===1?' pessoa na fila de espera':' pessoas na fila de espera'),sFila,'pvgFila','pessoas|Integração'):''];
 if(only)return items;
 return pgK([[!g?'—':free===Infinity?'Sem limite':free,'Vagas na integração atual'],[nf,'Na fila de espera'],[ITG_FAM.length,'Pedidos de família']])+pgAtt(items);}
function pvgMem(){return pgK([[144,'Total de membros','cadastrados'],[138,'Integrados'],[121,'Batizados','84% do total'],[98,'Titulares','46 dependentes']])+pgAtt([]);}
function pvgDev(only){const rs=LSD.pessoas['Devocional'].rows,and=rs.filter(r=>r.st==='and'),agd=rs.filter(r=>r.st==='agd'),enc=rs.filter(r=>r.st==='enc');
 const leram=and.reduce((a,r)=>a+r.ppl.filter(p=>p.hoje).length,0),tot=and.reduce((a,r)=>a+r.ppl.length,0);
 const items=and.map(r=>{const c={em:0,at:0,nc:0};r.ppl.forEach(p=>c[dvgCls(p)]++);if(!c.at&&!c.nc)return '';
  return rsAtt('warn',esc(r.n),[c.at?c.at+(c.at===1?' atrasado':' atrasados'):'',c.nc?c.nc+(c.nc===1?' não começou':' não começaram'):''].filter(Boolean).join(' · '),'pgOpen','pessoas|Devocional|'+r.id);});
 if(only)return items;
 return pgK([[and.length,'Em andamento',tot+' participações'],[agd.length,'Agendados',agd[0]?'próximo: '+esc(agd[0].n):'nenhum agendado'],[enc.length,'Encerrados'],[leram,'Leram hoje','de '+tot]])+pgAtt(items);}
Object.assign(LSD.pessoas,{
 'Visão geral · Integração':{noun:'',ST:{},rows:[],custom:()=>pvgItg()},
 'Visão geral · Membros':{noun:'',ST:{},rows:[],custom:()=>pvgMem()},
 'Visão geral · Devocional':{noun:'',ST:{},rows:[],custom:()=>pvgDev()}});
gMod('pessoas')[5]=['Visão geral · Integração','Integração','Visão geral · Membros','Membros','Visão geral · Devocional','Devocional'];
Object.assign(A,{pvgFila:()=>{S.itg.top='fila';pgGoSec('pessoas','Integração');}});

function cvgDisc(only){const l=CU_DISC,em=l.filter(r=>r.st==='em').length,at=l.filter(r=>r.st==='at'),pa=l.filter(r=>r.st==='pa').length;
 const items=at.slice().sort((a,b)=>cuDays(b.lastISO)-cuDays(a.lastISO)).slice(0,4).map(r=>rsAtt('bad',esc(r.n),'Discipulado por '+esc(r.disc)+' · último contato '+cuAgo(cuDays(r.lastISO)),'pgOpen','cuidado|Discipulado|'+r.id));
 if(only)return items;
 return pgK([[l.length,'Pessoas na rede'],[em,'Em dia'],[at.length,'Atrasados'],[pa,'Pausados']])+pgAtt(items);}
function cvgRes(){const l=CU_DISC,td=cuToday(),mon=td.slice(0,7),yr=td.slice(0,4),all=l.flatMap(r=>mtgList(r).map(m=>({r,m})));
 const month=all.filter(x=>x.m.st==='re'&&x.m.date.startsWith(mon)).length,year=all.filter(x=>x.m.st==='re'&&x.m.date.startsWith(yr)).length,lim=cuISO(7);
 const next=all.filter(x=>x.m.st==='ag'&&x.m.date>=td).sort((a,b)=>a.m.date.localeCompare(b.m.date)||a.m.time.localeCompare(b.m.time)),n7=next.filter(x=>x.m.date<=lim).length,and=l.filter(r=>r.st!=='pa').length;
 const od=l.filter(r=>r.st==='at').sort((a,b)=>cuDays(b.lastISO)-cuDays(a.lastISO)).slice(0,4);
 return pgK([[and,'Em andamento',(l.length-and)+' pausado'],[month,'Encontros no mês',year+' no ano'],[n7,'Próximos 7 dias',next.length+' agendados no total']])
  +rsCard('Próximos encontros',next.length?`<div class="vl">${next.slice(0,10).map(x=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(x.r.n)}</span><span class="vs">${cuFmt(x.m.date)} · ${x.m.time} · ${esc(x.m.mode)}</span></span></div>`).join('')}</div>`:vsEmpty('Nada agendado','Nenhum encontro marcado.'))
  +rsCard('Contato mais atrasado',od.length?`<div class="vl">${od.map(r=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">último contato ${cuAgo(cuDays(r.lastISO))} · ritmo ${esc(r.rit)}</span></span></div>`).join('')}</div>`:vsEmpty('Ninguém atrasado','Todos dentro do ritmo.'));}
function cvgCase(only){const l=CU_CASES,at=l.filter(r=>r.st==='nv'||r.st==='ur'||r.st==='ac').length,ac=l.filter(r=>r.st==='ac').length,re=l.filter(r=>r.st==='re').length;
 const items=l.filter(r=>r.st==='ur'||r.st==='nv').map(r=>{const red=r.restr&&!cuSeeRestr(r);return rsAtt(r.st==='ur'?'bad':'warn',esc(r.n),(r.st==='ur'?'Urgente':'Aguardando triagem')+(red?'':' · '+esc(r.kind)),'pgOpen','cuidado|Acompanhamento|'+r.id);});
 if(only)return items;
 return pgK([[at,'Casos ativos'],[ac,'Acompanhando','em andamento'],[re,'Resolvidos','nos últimos 30 dias']])+pgAtt(items);}
function cvgPr(only){const act=CU_PR.filter(p=>p.st==='at'),rs=CU_PR.filter(p=>p.st==='rs').length,orando=act.reduce((a,p)=>a+p.count,0),mine=act.filter(p=>p.mine).length,sem=cuPrN('sem');
 const items=[sem?rsAtt('info',sem+(sem===1?' pedido sem a sua oração':' pedidos sem a sua oração'),'Orar e marcar “Estou orando”','cvgSem','cuidado|Pedidos de oração'):''];if(only)return items;
 return pgK([[act.length,'Pedidos ativos',rs+(rs===1?' respondido':' respondidos')],[orando,'Pessoas orando','confirmações “estou orando”'],[mine+' de '+act.length,'Você está orando']])
  +pgAtt(items);}
Object.assign(LSD.cuidado,{
 'Visão geral · Discipulado':{noun:'',ST:{},rows:[],custom:()=>cvgDisc()},
 'Resumo':{noun:'',ST:{},rows:[],custom:()=>cvgRes()},
 'Visão geral · Acompanhamento':{noun:'',ST:{},rows:[],custom:()=>cvgCase()},
 'Visão geral · Pedidos de oração':{noun:'',ST:{},rows:[],custom:()=>cvgPr()}});
gMod('cuidado')[5]=['Visão geral · Discipulado','Discipulado','Resumo','Visão geral · Acompanhamento','Acompanhamento','Visão geral · Pedidos de oração','Pedidos de oração'];
Object.assign(A,{cvgSem:()=>{S.cu.pf='sem';pgGoSec('cuidado','Pedidos de oração');}});
