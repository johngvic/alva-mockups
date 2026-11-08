/* =========================================================
   GESTÃO · a visão administrativa do super-app
   Abas: Início · Pendências · Módulos (quem tem um módulo só vê a aba com o nome dele) · Mais
   ========================================================= */
APP.push('gInicio','gPend','gMods','gModulo','gSecao','gMais');
function gTabs(){const v=visibleMods();return [['gInicio','home','Início'],['gPend','check','Pendências'],v.length===1?['gMods',v[0][2],v[0][1]]:['gMods','layers','Módulos'],['gMais','dots','Mais']];}
const MOLDS={'Visão geral':'Visão geral','Calendário':'Calendário','Escalas':'Escala','Planejamento':'Quadro','DRE':'Relatório','Informe anual':'Relatório','Caixa diário':'Balcão','Vendas':'Balcão','Importar e conciliar':'Tela própria'};
const lvlLbl=id=>S.role==='lider'?LVLTAG[lvlOf(id)]:'';
const moldOf=s=>MOLDS[s]||'Lista compacta';
const vswitch=to=>`<button class="vswitch" data-a="switchView" data-v="${to}"><span class="vs-i">${ic(to==='gestao'?'sliders':'user',22,1.75)}</span><span class="grow stack" style="gap:2px"><b>${to==='gestao'?'Trocar para Gestão':'Trocar para Membro'}</b><small>${to==='gestao'?'Gerir a igreja pelo app':'Voltar ao app de membro'}</small></span><span class="ma" aria-hidden="true">${ic('swap',18,2)}</span></button>`;
const modRow=(m,meta)=>{const p=gPendOf(m[0]).reduce((a,x)=>a+x[1],0);return `<button class="chrow" data-a="gOpen" data-v="${m[0]}"><span class="mico" style="color:var(--tone-${m[3]}-ink,var(--brand-text))">${ic(m[2],24,1.6)}</span><span class="grow stack" style="gap:2px"><span class="chn">${m[1]}</span>${meta?`<span class="callout">${meta}</span>`:''}</span>${p?`<span class="gcount">${p}</span>`:''}<span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;};
const gHead=(eb,title,lede)=>appHead(`<div class="stack g2"><p class="eyebrow">${eb}</p><h1 class="t1">${title}</h1>${lede?`<p class="callout">${lede}</p>`:''}</div>`);
const gSub=(title,lede,eb)=>`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button></div>${eb?`<p class="eyebrow" style="margin-top:18px">${eb}</p>`:''}<h1 class="big" style="margin-top:${eb?4:18}px">${title}</h1>${lede?`<p class="callout">${lede}</p>`:''}</header>`;

/* Início da Gestão: o que fazer agora, atalhos do que o acesso permite, resumo do dia e a agenda. Os módulos ficam na aba Módulos. */
const GQUICK={zeladoria:[['Pedir um trabalho','bucket','sec:Trabalhos','criar']],cafe:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar'],['Movimentar estoque','box','vsMoveNew','criar']],rest:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar'],['Movimentar estoque','box','vsMoveNew','criar']],shop:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar'],['Movimentar estoque','box','vsMoveNew','criar']],pessoas:[['Novo pedido de integração','userplus','sec:Integração','criar']],agenda:[['Novo compromisso','calendar','sec:Calendário','criar']],financeiro:[['Novo lançamento','wallet','sec:Lançamentos','criar'],['Enviar comprovante','camera','sec:Caixa de entrada','criar']],kids:[['Check-in Kids','baby',null,'criar']],comunicacao:[['Aviso rápido','megaphone','sec:Notificações','criar']],almox:[['Registrar empréstimo','box','sec:Empréstimos','criar']],secretaria:[['Emitir declaração','file','go:Documentos','criar']],admin:[['Dar acesso','userplus','sec:Usuários e permissões','criar']]};
const gQuick=()=>visibleMods().flatMap(m=>(GQUICK[m[0]]||[]).filter(q=>can(m[0],q[3])).map(q=>({mod:m,l:q[0],i:q[1],a:q[2]}))).sort((x,y)=>!!y.a-!!x.a).slice(0,4);
const gGreet=()=>{const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';};
const gTop=()=>visibleMods().flatMap(m=>gPendOf(m[0]).map(p=>({m,t:p[0],n:p[1]}))).sort((a,b)=>b.n-a.n).slice(0,3);
V.gInicio=()=>{const n=gPendTotal(),top=gTop(),q=gQuick(),v=visibleMods(),ready=v.filter(m=>VS_READY.includes(m[0])),ev=upcoming().slice(0,2);
 const snap=m=>{const s=vsSum(VS[m[0]].sales.filter(x=>x.day===VS_DAY));return `<button class="gsnap" data-a="gOpen" data-v="${m[0]}"><span class="grow stack" style="gap:2px"><span class="eb2">${m[1]} hoje</span><b>${vsMoney(s.sold)}</b><span class="vs">${s.count} vendas · caixa ${VS[m[0]].cash.open?'aberto':'fechado'}</span></span>${ic('arrowR',18,2)}</button>`;};
 return{sb:'var(--ink)',tabs:'gInicio',amb:'home',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${S.church.name} · Gestão</p><h1 class="t1">${gGreet()}, ${esc(S.user.first)}!</h1></div><button class="avatar tap" style="${tone('ceu')};border:0" data-a="tab" data-v="gMais" aria-label="Abrir perfil">${initials(S.user.name)}</button></div>`)}
 <div class="pad stack g8">
  ${gSubsNote()}<section class="ghero">${n?`<p class="eb2">Para hoje</p><h2 class="t2">${n>1?n+' itens esperam por você':'1 item espera por você'}</h2><p class="callout">Comece pelo que mais acumulou.</p><div class="vl">${top.map(x=>`<button class="vr tap" data-a="gOpen" data-v="${x.m[0]}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${x.t}</span><span class="vs">${x.m[1]}</span></span><span class="gcount">${x.n}</span></button>`).join('')}</div><button class="btn primary md block" data-a="tab" data-v="gPend">Ver todas as pendências</button>`:`<p class="eb2">Para hoje</p><h2 class="t2">Tudo em dia</h2><p class="callout">Nada espera por você agora. Que tal dar uma olhada nos módulos?</p>`}</section>
  ${q.length?`<section class="stack g3"><p class="eb2">Atalhos</p><div class="gquick">${q.map(x=>x.a?`<button class="gq" data-a="gQuick" data-v="${x.mod[0]}|${x.a}"><span class="gqi">${ic(x.i,22,1.75)}</span><span>${x.l}</span></button>`:`<button class="gq" data-a="gQuick" data-v="${x.mod[0]}|"><span class="gqi">${ic(x.i,22,1.75)}</span><span>${x.l}</span></button>`).join('')}</div></section>`:''}
  ${ready.length?`<section class="stack g3"><p class="eb2">Resumo do dia</p>${ready.slice(0,2).map(snap).join('')}</section>`:''}
  ${ev.length?`<section class="stack g3"><p class="eb2">Próximos na igreja</p><div class="list">${ev.map(evRow).join('')}</div></section>`:''}
  ${v.length>1?`<section class="stack g3"><div class="row between"><p class="eb2">Seus módulos</p><button class="link" data-a="tab" data-v="gMods">Ver todos</button></div><div class="gtiles">${v.map(m=>`<button class="gtile" data-a="gOpen" data-v="${m[0]}"><span style="color:var(--tone-${m[3]}-ink,var(--brand-text))">${ic(m[2],24,1.6)}</span><span>${m[1]}</span></button>`).join('')}</div></section>`:''}
 </div>`};};
Object.assign(A,{gQuick:v=>{const [id,a]=v.split('|');S.gmod=id;
 if(a&&/^(sec|go):/.test(a)){const sec=a.slice(a.indexOf(':')+1),sc=gMod(id)[5];if(sc.length>5){S.gsec=sec;go('gSecao');}else{S.gtab=sc.indexOf(sec);go('gModulo');}
  if(a.startsWith('sec:'))setTimeout(()=>A.lsNew(),350);return;}
 if(a&&A[a])A[a]();else toast('info','Em breve','Esse atalho é desenhado na Fase '+gMod(id)[4]+'.');}});

V.gPend=()=>{const v=visibleMods().filter(m=>gPendOf(m[0]).length);return{sb:'var(--ink)',tabs:'gPend',amb:'agenda',html:`${gHead('Gestão','Pendências','O que precisa da sua decisão.')}
 <div class="pad stack g6">${v.length?v.map(m=>`<section class="stack g2"><p class="eb2">${m[1]}</p><div class="chlist">${gPendOf(m[0]).map(p=>`<button class="chrow" data-a="gOpen" data-v="${m[0]}"><span class="grow stack"><span class="chn">${p[0]}</span></span><span class="gcount">${p[1]}</span><span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`).join('')}</div></section>`).join(''):`<p class="callout">Nada esperando por você agora.${visibleMods().every(m=>lvlOf(m[0])<2)?' Com acesso só para ver, as pendências não aparecem.':''}</p>`}</div>`};};

V.gMods=()=>{const v=visibleMods();if(v.length===1){S.gmod=v[0][0];return V.gModulo(true);}
 return{sb:'var(--ink)',tabs:'gMods',amb:'grupos',html:`${gHead('Gestão','Módulos','Só aparece o que o seu acesso permite.')}
 <div class="pad"><div class="chlist">${v.map(m=>modRow(m,lvlLbl(m[0]))).join('')}</div></div>`};};

const gSubsNote=()=>S.subs==='suspensa'?`<div class="gnote"><b>Assinatura suspensa</b><span>O app está somente leitura até a regularização. Só quem tem Administrador abre a Assinatura, no painel web.</span></div>`:'';
/* corpo de uma seção: aqui entram os moldes de tela (Fases 2 a 6); por ora mostra o que o nível de acesso libera */
const gBody=(m,sec)=>{const id=m[0],mold=moldOf(sec);{const h=VS_READY.includes(id)?vsBody(id,sec):LS_READY.includes(id)?lsBody(m,sec):null;if(h)return gSubsNote()+h+(sec===m[5][0]?gRelLink(id):'');}
 const acts=[can(id,'criar')?`<button class="btn primary md" data-a="gAct" data-v="Novo">${ic('plus',18,2)}Novo</button>`:'',can(id,'editar')?`<button class="btn outline md" data-a="gAct" data-v="Editar">Editar</button>`:'',can(id,'excluir')?`<button class="btn danger md" data-a="gDel" data-v="${esc(sec)}">Excluir</button>`:''].join('');
 return `<div class="gnote"><b>${esc(sec)}</b><span>Molde “${mold}” · desenhado na Fase ${m[4]}</span></div>
 <div class="stack g3"><p class="eb2">O que o seu acesso libera</p>${acts?`<div class="row g3">${acts}</div>`:'<p class="callout">Você só pode ver esta área. Não há botões de ação.</p>'}
 ${can(id,'acessos')&&id!=='admin'?`<button class="tlink" data-a="gAcc">Quem tem acesso a ${m[1]}</button>`:''}</div>`;};

V.gModulo=single=>{const m=gMod(S.gmod),secs=m[5],few=secs.length<=5;if(S.gtab>=secs.length)S.gtab=0;
 const head=single===true?gHead('Gestão',m[1],lvlLbl(m[0])):gSub(m[1],lvlLbl(m[0]));
 return{sb:'var(--ink)',tabs:'gMods',amb:'grupos',html:`${head}
 ${few?`<div class="pad" style="margin-top:8px"><div class="utabs ul" role="tablist">${secs.map((s,i)=>`<button role="tab" aria-selected="${i===S.gtab}" data-a="gTab" data-v="${i}">${s}</button>`).join('')}</div></div><div class="pad stack g6" style="padding-top:20px">${gLede(m[0],secs[S.gtab])?`<p class="callout">${esc(gLede(m[0],secs[S.gtab]))}</p>`:''}${gBody(m,secs[S.gtab])}</div>`
 :`<div class="pad stack g3" style="padding-top:8px"><p class="eb2">${secs.length} seções</p><div class="chlist">${secs.map((s,i)=>`<button class="chrow" data-a="gSec" data-v="${i}"><span class="grow stack"><span class="chn">${s}</span></span><span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`).join('')}</div></div>`}`};};

V.gSecao=()=>{const m=gMod(S.gmod);return{sb:'var(--ink)',tabs:'gMods',amb:'grupos',html:`${gSub(esc(S.gsec),esc(gLede(m[0],S.gsec)),m[1])}<div class="pad stack g6" style="padding-top:12px">${gBody(m,S.gsec)}</div>`};};

V.gMais=()=>({sb:'var(--ink)',tabs:'gMais',amb:'mais',html:`${appHead(`<div class="mhead">${pavM(S.user.name,'ceu','lg')}<span class="stack" style="align-items:flex-start;gap:2px"><span class="t2">${esc(S.user.name)}</span><span class="callout">${S.church.name} · Gestão</span></span></div>`)}
 <div class="pad stack g8" style="padding-top:16px">
  ${vswitch('membro')}
  <section class="mgrp"><p class="eb2" style="margin-bottom:4px">Conta</p>
   <button class="mrow" data-a="switchChurch"><span class="chdot" style="background:${MK[S.church.tone==='ceu'?'oceano':S.church.tone]}"></span><span class="grow stack" style="gap:1px"><span class="chm">Igreja atual</span><span class="mt">${S.church.name.replace('Alva ','')}</span></span><span class="mm hotline">Trocar</span><span class="ma" aria-hidden="true">${ic('swap',16,2)}</span></button>
  </section>
  <section class="stack g3"><button class="btn danger block md" data-a="logout">Sair da conta</button><p class="foot" style="text-align:center;margin:4px 0 0">alva v2.0.0</p></section>
 </div>`});

Object.assign(A,{
 gOpen:v=>{S.gmod=v;S.gtab=0;go('gModulo');},
 gTab:v=>{S.gtab=+v;softRender();},
 gSec:v=>{S.gsec=gMod(S.gmod)[5][+v];go('gSecao');},
 gAct:v=>{const m=gMod(S.gmod);toast('info',v+' em '+m[1],'O formulário é desenhado na Fase '+m[4]+'.');},
 gDel:v=>{sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Excluir em ${esc(v)}?</h3><p class="callout">Só o Admin da área vê esta ação, e ela sempre pede confirmação.</p></div><div class="row g3"><button class="btn outline md grow" id="gdN">Cancelar</button><button class="btn danger md grow" id="gdY">Excluir</button></div></div>`,sh=>{$('#gdN',sh).addEventListener('click',()=>closeSheet());$('#gdY',sh).addEventListener('click',async()=>{await closeSheet();toast('info','Exclusão simulada','Nada foi apagado no protótipo.');});});},
 gAcc:()=>{const m=gMod(S.gmod);toast('info','Acessos por área','Abre “Quem tem acesso a '+m[1]+'”, na Administração.');},
 switchView:v=>{if(v==='gestao'&&!canGestao())return;S.lastView=v;showSplash(true);setTimeout(()=>{S.view=v;S.hist=[];S.gmod=null;S.screen=v==='gestao'?'gInicio':'home';$('#overlay').innerHTML='';lastTab=null;render('none');},650);}
});

/* lateral do protótipo: o Líder escolhe módulo e nível */
(function(){const seg=$('#roleSeg');if(!seg)return;const sec=seg.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';box.id='liderSec';box.hidden=true;
 box.innerHTML=`<span class="rail-lbl">Líder de</span><select class="rail-sel" id="liderMod" aria-label="Módulo do líder">${GMODS.filter(m=>m[0]!=='admin').map(m=>`<option value="${m[0]}" ${m[0]===S.gl.mod?'selected':''}>${m[1]}</option>`).join('')}</select><div class="rail-chips" id="liderLvl">${[[1,'Ver'],[2,'Editar'],[3,'Admin da área']].map(l=>`<button type="button" data-v="${l[0]}" aria-pressed="${l[0]===S.gl.lvl}">${l[1]}</button>`).join('')}</div>`;
 sec.after(box);
 $('#liderMod').addEventListener('change',e=>{S.gl.mod=e.target.value;gSyncRole();});
 $('#liderLvl').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.gl.lvl=+b.dataset.v;$$('#liderLvl button').forEach(x=>x.setAttribute('aria-pressed',x===b));gSyncRole();});})();
/* lateral do protótipo: estado da assinatura da igreja (FND-M-31) */
(function(){const seg=$('#roleSeg');if(!seg)return;const sec=seg.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Assinatura da igreja</span><div class="rail-chips" id="subsSeg">${[['ativa','Ativa'],['suspensa','Suspensa']].map(l=>`<button type="button" data-v="${l[0]}" aria-pressed="${l[0]===S.subs}">${l[1]}</button>`).join('')}</div>`;
 sec.after(box);
 $('#subsSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.subs=b.dataset.v;$$('#subsSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));softRender();});})();
/* perfil ou acesso mudou: sai da Gestão se perdeu o acesso; senão recarrega a Gestão */
function gSyncRole(){const ls=$('#liderSec');if(ls)ls.hidden=S.role!=='lider';
 if(S.screen==='profile'){if(!canGestao()){S.hist=[];S.view='membro';S.screen='home';}render('tab');return true;}
 if(S.view!=='gestao')return false;
 if(!canGestao())S.view='membro';
 S.hist=[];S.gmod=null;S.screen=S.view==='gestao'?'gInicio':'home';lastTab=null;render('tab');return true;}

/* ---------- Escolha do perfil na entrada: depois da igreja, quem tem Gestão decide como quer usar o app ---------- */
APP.push('profile');
S.lastView='membro';
V.profile=()=>{const v=visibleMods(),adm=S.role==='admin',sub=adm?'Todos os módulos da igreja':v.map(m=>m[1]).join(', ');
 const card=(id,ic_,t,s)=>`<button class="pcard ${S.lastView===id?'last':''}" data-a="pickProfile" data-v="${id}"><span class="pc-i">${ic(ic_,26,1.6)}</span><span class="grow stack" style="gap:3px;align-items:flex-start"><span class="row" style="gap:10px;align-items:baseline"><b>${t}</b>${S.lastView===id?'<span class="chl">Último acesso</span>':''}</span><span class="vs" style="white-space:normal">${s}</span></span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`;
 return{sb:'var(--ink)',amb:'church',html:`${appHead(`<div class="stack g2"><p class="eyebrow">${S.church.name}</p><h1 class="big" style="margin:0">Como você quer entrar?</h1></div>`)}
 <div class="pad stack g4">
  ${card('membro','user','Membro','Agenda, grupos, cursos e tudo da sua caminhada')}
  ${canGestao()?card('gestao','sliders','Gestão',sub):''}
  <p class="foot" style="margin:8px 0 0">Dá para trocar a qualquer momento em Mais.</p>
 </div>`};};
A.pickProfile=v=>{S.lastView=v;if(v==='gestao')return A.switchView('gestao');S.view='membro';S.hist=[];S.screen='home';lastTab=null;render('tab');};
