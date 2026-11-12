/* =========================================================
   GESTÃO · a visão administrativa do super-app
   Abas: Início · Pendências · Módulos (quem tem um módulo só vê a aba com o nome dele) · Mais
   ========================================================= */
APP.push('gAgenda','gInicio','gPend','gMods','gModulo','gSecao','gMais');
function gTabs(){const v=visibleMods();return [['gInicio','home','Início'],...(v.some(m=>m[0]==='agenda')?[['gAgenda','calendar','Agenda']]:[]),['gPend','check','Pendências'],v.length===1?['gMods',v[0][2],v[0][1]]:['gMods','layers','Módulos'],['gMais','dots','Mais']];}
const MOLDS={'Visão geral':'Visão geral','Calendário':'Calendário','Escalas':'Escala','Planejamento':'Quadro','DRE':'Relatório','Informe anual':'Relatório','Caixa diário':'Balcão','Vendas':'Balcão','Importar e conciliar':'Tela própria'};
const lvlLbl=id=>S.role==='lider'?LVLTAG[lvlOf(id)]:'';
const moldOf=s=>MOLDS[s]||'Lista compacta';
const vswitch=to=>`<button class="vswitch" data-a="switchView" data-v="${to}"><span class="vs-i">${ic(to==='gestao'?'sliders':'user',22,1.75)}</span><span class="grow stack" style="gap:2px"><b>${to==='gestao'?'Trocar para Gestão':'Trocar para Membro'}</b><small>${to==='gestao'?'Gerir a igreja pelo app':'Voltar ao app de membro'}</small></span><span class="ma" aria-hidden="true">${ic('swap',18,2)}</span></button>`;
const modRow=(m,meta)=>{const p=gPendOf(m[0]).reduce((a,x)=>a+x[1],0);return `<button class="chrow" data-a="gOpen" data-v="${m[0]}"><span class="mico" style="--mt:var(--tone-${m[3]},var(--brand-text));--mi:var(--tone-${m[3]}-ink,var(--brand-text))">${ic(m[2],24,1.6)}</span><span class="grow stack" style="gap:2px"><span class="chn">${m[1]}</span>${meta?`<span class="callout">${meta}</span>`:''}</span>${p?`<span class="gcount">${p}</span>`:''}<span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;};
const gHead=(eb,title,lede)=>appHead(`<div class="stack g2"><p class="eyebrow">${eb}</p><h1 class="t1">${title}</h1>${lede?`<p class="callout">${lede}</p>`:''}</div>`);
const gSub=(title,lede,eb)=>`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button></div>${eb?`<p class="eyebrow" style="margin-top:18px">${eb}</p>`:''}<h1 class="big" style="margin-top:${eb?4:18}px">${title}</h1>${lede?`<p class="callout">${lede}</p>`:''}</header>`;

/* Início da Gestão: o que fazer agora, atalhos do que o acesso permite, resumo do dia e a agenda. Os módulos ficam na aba Módulos. */
const GQUICK={zeladoria:[['Pedir um trabalho','bucket','sec:Trabalhos','criar']],cafe:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar']],rest:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar']],shop:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar']],social:[['Venda rápida','ticket','vsSaleNew','criar'],['Novo item','plus','vsItemNew','criar']],pessoas:[['Decidir pedidos','check','go:Integração','editar']],agenda:[['Escalas para aprovar','calendar','go:Escalas','editar']],espacos:[['Reservar uma sala','building','sec:Reservas','criar']],financeiro:[['Novo lançamento','wallet','sec:Lançamentos','criar'],['Enviar comprovante','camera','sec:Caixa de entrada','criar']],kids:[['Escolher a aula','baby','go:Planejamento','editar']],admin:[['Dar acesso','userplus','sec:Usuários e permissões','criar']],comunicacao:[['Aviso rápido','megaphone','sec:Mensagens','aprovar']],almox:[['Registrar empréstimo','box','sec:Empréstimos','criar']],secretaria:[['Emitir declaração','file','go:Documentos','criar']]};
const gQuick=()=>visibleMods().flatMap(m=>(GQUICK[m[0]]||[]).filter(q=>can(m[0],q[3])).map(q=>({mod:m,l:q[0],i:q[1],a:q[2]}))).sort((x,y)=>!!y.a-!!x.a).slice(0,4);
const gGreet=()=>{const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';};
const gTop=()=>visibleMods().flatMap(m=>gPendOf(m[0]).map(p=>({m,t:p[0],n:p[1]}))).sort((a,b)=>b.n-a.n).slice(0,3);
V.gInicio=()=>{const n=gPendTotal(),top=gTop(),q=gQuick(),v=visibleMods(),ready=v.filter(m=>VS_READY.includes(m[0])),ev=upcoming().slice(0,2);
 const snap=m=>{const s=vsSum(VS[m[0]].sales.filter(x=>x.day===VS_DAY));return `<button class="gsnap" data-a="gOpen" data-v="${m[0]}"><span class="grow stack" style="gap:2px"><span class="eb2">${m[1]} hoje</span><b>${vsMoney(s.sold)}</b><span class="vs">${s.count} vendas</span></span>${ic('arrowR',18,2)}</button>`;};
 return{sb:'var(--ink)',tabs:'gInicio',amb:'home',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${S.church.name} · Gestão</p><h1 class="t1">${gGreet()}, ${esc(S.user.first)}!</h1></div><button class="avatar tap" style="${tone('ceu')};border:0" data-a="tab" data-v="gMais" aria-label="Abrir perfil">${initials(S.user.name)}</button></div>`)}
 <div class="pad stack g8">
  ${gSubsNote()}<section class="ghero">${n?`<p class="eb2">Para hoje</p><h2 class="t2">${n>1?n+' itens esperam por você':'1 item espera por você'}</h2><p class="callout">Comece pelo que mais acumulou.</p><div class="vl">${top.map(x=>`<button class="vr tap" data-a="gOpenP" data-v="${x.m[0]}|${esc(x.t)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${x.t}</span><span class="vs">${x.m[1]}</span></span><span class="gcount">${x.n}</span></button>`).join('')}</div><button class="btn primary md block" data-a="tab" data-v="gPend">Ver todas as pendências</button>`:`<p class="eb2">Para hoje</p><h2 class="t2">Tudo em dia</h2><p class="callout">Nada espera por você agora. Que tal dar uma olhada nos módulos?</p>`}</section>
  ${q.length?`<section class="stack g3"><p class="eb2">Atalhos</p><div class="gquick">${q.map(x=>x.a?`<button class="gq" data-a="gQuick" data-v="${x.mod[0]}|${x.a}"><span class="gqi">${ic(x.i,22,1.75)}</span><span>${x.l}</span></button>`:`<button class="gq" data-a="gQuick" data-v="${x.mod[0]}|"><span class="gqi">${ic(x.i,22,1.75)}</span><span>${x.l}</span></button>`).join('')}</div></section>`:''}
  ${ready.length?`<section class="stack g3"><p class="eb2">Resumo do dia</p>${ready.slice(0,2).map(snap).join('')}</section>`:''}
  ${ev.length?`<section class="stack g3"><p class="eb2">Próximos na igreja</p><div class="list">${ev.map(evRow).join('')}</div></section>`:''}
  ${v.length>1?`<section class="stack g3"><div class="row between"><p class="eb2">Seus módulos</p><button class="link" data-a="tab" data-v="gMods">Ver todos</button></div><div class="gtiles">${v.map(m=>`<button class="gtile" data-a="gOpen" data-v="${m[0]}"><span style="--mt:var(--tone-${m[3]},var(--brand-text));--mi:var(--tone-${m[3]}-ink,var(--brand-text))">${ic(m[2],24,1.6)}</span><span>${m[1]}</span></button>`).join('')}</div></section>`:''}
 </div>`};};
Object.assign(A,{gQuick:v=>{const [id,a]=v.split('|');S.gmod=id;S.gpage=null;
 if(a&&/^(sec|go):/.test(a)){const sec=a.slice(a.indexOf(':')+1),sc=gMod(id)[5];if(!gFewSecs(id,sc)){S.gsec=sec;go('gSecao');}else{gToSec(id,sec);}
  if(a.startsWith('sec:'))setTimeout(()=>{const c=lsCfg();if(c&&(c.newFlow||c.add))A.lsNew();},350);return;}
 if(a&&A[a])A[a]();else toast('info','Em breve','Esse atalho é desenhado na Fase '+gMod(id)[4]+'.');}});

V.gAgenda=()=>({sb:'var(--ink)',tabs:'gAgenda',amb:'agenda',html:`${gHead('Gestão','Agenda','Eventos, cultos e cerimônias da igreja.')}<div class="pad stack g5">${agCalBody()}</div>`});
V.gPend=()=>{const secs=pgPendSections();return{sb:'var(--ink)',tabs:'gPend',amb:'agenda',html:`${gHead('Gestão','Pendências','O que precisa da sua decisão.')}
 <div class="pad stack g6">${secs.length?secs.map(([t,l])=>`<section class="stack g2"><p class="eb2">${t}</p>${l.join('')}</section>`).join(''):`<div class="pdempty"><span class="pde-i">${ic('check',30,2.4)}</span><b>Tudo em dia</b><span>Nada esperando por você agora. Quando algo precisar da sua decisão, aparece aqui.</span>${visibleMods().every(m=>lvlOf(m[0])<2)?`<small>${ic('info',14,2)}Com acesso só para ver, as pendências não aparecem.</small>`:''}</div>`}</div>`};};

/* Aba Módulos: grupos que abrem para baixo (um aberto por vez) e módulos que abrem direto. Cada item de um grupo abre uma PÁGINA própria
   (S.gpage = as seções do módulo que aquela página mostra). O menu real vai ser por perfil; aqui o corte é só pelo nível de acesso do módulo. */
const GMENU=[
 ['g','Pessoas','users',[['Integração','pessoas',['Visão geral · Integração','Integração']],['Membros','pessoas',['Visão geral · Membros','Membros']],['Devocional','pessoas',['Visão geral · Devocional','Devocional']]]],
 ['g','Comunidade','home',[['Casas de Apascentamento','comunidade',['Visão geral · Casas de Apascentamento','Casas de Apascentamento']],['Redes de casa','comunidade',['Visão geral · Redes de casa','Redes de casa']],['Ministérios','comunidade',['Visão geral · Ministérios','Ministérios']]]],
 ['g','Cuidado','heart',[['Discipulado','cuidado',['Visão geral · Discipulado','Discipulado','Resumo']],['Acompanhamento','cuidado',['Visão geral · Acompanhamento','Acompanhamento']],['Pedidos de oração','cuidado',['Visão geral · Pedidos de oração','Pedidos de oração']]]],
 ['m','kids'],['m','conteudo'],
 ['g','Agenda','ticket',[['Eventos','agenda',['Visão geral · Eventos','Eventos']],['Cultos','agenda',['Visão geral · Cultos','Cultos']],['Apresentações','agenda',['Visão geral · Apresentações','Apresentações']],['Batismos','agenda',['Visão geral · Batismos','Batismos']],['Consagrações','agenda',['Visão geral · Consagrações','Consagrações']],['Casamentos','agenda',['Visão geral · Casamentos','Casamentos']],['Escalas','agenda',['Visão geral · Escalas','Escalas']],['Inscrições','agenda',['Visão geral · Inscrições','Inscrições','Resultados · Inscrições']]]],
 ['m','espacos'],['m','zeladoria'],['m','almox'],['m','cafe'],['m','rest'],['m','shop'],['m','social'],['m','secretaria'],['m','financeiro'],['m','comunicacao'],['m','admin']
];
const gSeen=id=>visibleMods().some(m=>m[0]===id);
const gMenuNow=()=>GMENU.filter(e=>e[0]==='m'?gSeen(e[1]):e[0]==='i'?gSeen(e[3]):e[3].some(x=>gSeen(x[1])));
const gGrpCount=e=>[...new Set(e[3].map(x=>x[1]))].reduce((n,id)=>n+gPendOf(id).reduce((a,p)=>a+p[1],0),0);
V.gMods=()=>{const v=visibleMods();if(v.length===1){S.gmod=v[0][0];S.gpage=null;return V.gModulo(true);}
 const row=(ic_,tone,lab,act,val,cnt,extra)=>'<button class="chrow'+(extra||'')+'" data-a="'+act+'" data-v="'+val+'"'+(extra&&extra.includes('gg')?' aria-expanded="'+extra.includes('open')+'"':'')+'><span class="mico" style="--mt:var(--tone-'+tone+',var(--brand-text));--mi:var(--tone-'+tone+'-ink,var(--brand-text))">'+ic(ic_,24,1.6)+'</span><span class="grow stack" style="gap:2px"><span class="chn">'+lab+'</span></span>'+(cnt?'<span class="gcount">'+cnt+'</span>':'')+'<span class="ma gchev" aria-hidden="true">'+ic(extra&&extra.includes('gg')?'chevR':'arrowR',16,2)+'</span></button>';
 const rows=gMenuNow().map((e,k)=>{const gi=GMENU.indexOf(e);
  if(e[0]==='m'){const m=gMod(e[1]);return modRow(m,lvlLbl(m[0]));}
  if(e[0]==='i'){const m=gMod(e[3]);return row(e[2],m[3],e[1],'gPage',gi+'|',0,'');}
  const open=S.gopen===e[1],tone=gMod(e[3][0][1])[3],p=gGrpCount(e);
  return row(e[2],tone,e[1],'gGrp',e[1],open?0:p,' gg'+(open?' open':''))+(open?'<div class="gsubs">'+e[3].filter(x=>gSeen(x[1])).map(x=>'<button class="chrow" data-a="gPage" data-v="'+gi+'|'+e[3].indexOf(x)+'"><span class="grow stack"><span class="chn">'+x[0]+'</span></span><span class="ma" aria-hidden="true">'+ic('arrowR',16,2)+'</span></button>').join('')+'</div>':'');}).join('');
 return{sb:'var(--ink)',tabs:'gMods',amb:'grupos',html:gHead('Gestão','Módulos','Só aparece o que o seu acesso permite.')+'<div class="pad"><div class="chlist">'+rows+'</div></div>'};};

const gSubsNote=()=>S.subs==='suspensa'?`<div class="gnote"><b>Assinatura suspensa</b><span>O app está somente leitura até a regularização. Só quem tem Administrador abre a Assinatura, no painel web.</span></div>`:'';
/* corpo de uma seção: aqui entram os moldes de tela (Fases 2 a 6); por ora mostra o que o nível de acesso libera */
const gBody=(m,sec)=>{const id=m[0],mold=moldOf(sec);{const h=VS_READY.includes(id)?vsBody(id,sec):LS_READY.includes(id)?lsBody(m,sec):null;if(h)return gSubsNote()+h;}
 const acts=[can(id,'criar')?`<button class="btn primary md" data-a="gAct" data-v="Novo">${ic('plus',18,2)}Novo</button>`:'',can(id,'editar')?`<button class="btn outline md" data-a="gAct" data-v="Editar">Editar</button>`:'',can(id,'excluir')?`<button class="btn danger md" data-a="gDel" data-v="${esc(sec)}">Excluir</button>`:''].join('');
 return `<div class="gnote"><b>${esc(sec)}</b><span>Molde “${mold}” · desenhado na Fase ${m[4]}</span></div>
 <div class="stack g3"><p class="eb2">O que o seu acesso libera</p>${acts?`<div class="row g3">${acts}</div>`:'<p class="callout">Você só pode ver esta área. Não há botões de ação.</p>'}
 ${can(id,'acessos')&&id!=='admin'?`<button class="tlink" data-a="gAcc">Quem tem acesso a ${m[1]}</button>`:''}</div>`;};

const gIdx=()=>{const secs=gMod(S.gmod)[5],r=secs.map((s,i)=>i).filter(i=>!S.gpage||S.gpage.includes(secs[i]));return r.length?r:secs.map((s,i)=>i);};
const gPgFix=(m,s)=>{if(S.gpage&&(S.gpMod!==m||!S.gpage.includes(s)))S.gpage=null;};
V.gModulo=single=>{const m=gMod(S.gmod),secs=m[5],idx=gIdx();if(!idx.includes(S.gtab))S.gtab=idx[0];const pos=idx.indexOf(S.gtab);
 const lv=lvlLbl(m[0]),pill=lv?`<span class="glvl">${ic('shield',12,2.25)}${lv}</span>`:'';
 const head=S.gpage&&single!==true?gSub(esc(S.gpTitle),pill,S.gpGrp||''):single===true?gHead('Gestão',m[1],pill):gSub(m[1],pill);
 return{sb:'var(--ink)',tabs:'gMods',amb:'grupos',html:`${head}
 <div class="pad gnavw"><div class="gnav${idx.length<2?' one':''}"><button class="gar${pos<=0?' off':''}" data-a="gStep" data-v="-1" aria-label="Seção anterior">${ic('chevL',16,2.25)}</button><div class="gtw"><div class="utabs ul" id="gTabs" role="tablist">${idx.map(i=>`<button role="tab" aria-selected="${i===S.gtab}" data-a="gTab" data-v="${i}">${secLbl(secs[i])}</button>`).join('')}<i class="gind" aria-hidden="true"></i></div></div><button class="gar${pos>=idx.length-1?' off':''}" data-a="gStep" data-v="1" aria-label="Próxima seção">${ic('chevR',16,2.25)}</button></div><div class="gdots">${idx.map(i=>`<button class="gdot${i===S.gtab?' on':''}" data-a="gDot" data-v="${i}" aria-label="${esc(secLbl(secs[i]))}"></button>`).join('')}</div></div><div class="pad stack g6" id="gBody" style="padding-top:16px">${gLede(m[0],secs[S.gtab])?`<p class="callout glede">${esc(gLede(m[0],secs[S.gtab]))}</p>`:''}${gBody(m,secs[S.gtab])}</div>`};};

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
 gOpen:v=>{if(GGROUP[v]){S.gopen=GGROUP[v];if(S.screen==='gMods')softRender();else A.tab('gMods');return;}S.gmod=v;S.gpage=null;S.gtab=0;go('gModulo');},
 gGrp:v=>{S.gopen=S.gopen===v?null:v;softRender();},
 gPage:v=>{const [gi,ii,sc]=v.split('|'),e=GMENU[+gi],it=e[3][+ii],mod=it[1],secs=it[2];S.gmod=mod;S.gpMod=mod;S.gpage=secs;S.gpTitle=it[0];S.gpGrp=e[1];S.gtab=gMod(mod)[5].indexOf(sc||secs[0]);go('gModulo');},
 gTab:v=>{const w=$('#gTabs'),ind=w&&w.querySelector('.gind'),n=+v;S.gnavFrom=ind&&ind.style.left?{x:w.scrollLeft,l:parseFloat(ind.style.left),w:parseFloat(ind.style.width),dir:n>S.gtab?1:-1,i:S.gtab}:null;S.gtab=n;softRender();},
 gDot:v=>A.gTab(v),
 gStep:v=>{const idx=gIdx(),p=idx.indexOf(S.gtab)+(+v);if(p<0||p>=idx.length)return;A.gTab(String(idx[p]));},
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

/* Abas das seções da Gestão: a aba selecionada fica no centro, o traço colorido desliza até ela, as bordas esmaecem quando há mais
   e as setas ou o arrastar para o lado passam de uma seção à outra. Só no app: o web mantém o menu lateral. */
/* Mesma navegação em TODAS as abas do app: para o gTabs (módulos da Gestão) o markup nasce pronto; as demais (Casas, Cursos, Perfil, Escalas,
   check-in...) são embrulhadas por tabsEnhance logo depois de desenhadas. Setas, bolinhas e traço que desliza são sempre os mesmos. */
function tabsWire(w,from){const nav=w.closest('.gnav'),box=w.parentNode;if(!nav)return null;
 const bs=[...w.children].filter(e=>e.tagName==='BUTTON'),sel=bs.find(x=>x.getAttribute('aria-selected')==='true'),ind=w.querySelector('.gind');if(!sel||!ind)return null;
 const si=bs.indexOf(sel);nav.classList.remove('ov');const need=bs.reduce((s,x)=>s+x.offsetWidth,0)+4*(bs.length-1)>w.clientWidth+2;nav.classList.toggle('ov',need);
 const cs=getComputedStyle(sel),pl=parseFloat(cs.paddingLeft)||0,pr=parseFloat(cs.paddingRight)||0,L=sel.offsetLeft+pl,W=sel.offsetWidth-pl-pr;
 const x=Math.max(0,Math.min(sel.offsetLeft-(w.clientWidth-sel.offsetWidth)/2,w.scrollWidth-w.clientWidth));
 const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(from&&need&&!calm){w.scrollLeft=from.x;ind.style.transition='none';ind.style.left=from.l+'px';ind.style.width=from.w+'px';void ind.offsetWidth;ind.style.transition='';ind.style.left=L+'px';ind.style.width=W+'px';w.scrollTo({left:x,behavior:'smooth'});}
 else if(from&&!calm){ind.style.transition='none';ind.style.left=from.l+'px';ind.style.width=from.w+'px';void ind.offsetWidth;ind.style.transition='';ind.style.left=L+'px';ind.style.width=W+'px';w.scrollLeft=x;}
 else{ind.style.transition='none';ind.style.left=L+'px';ind.style.width=W+'px';w.scrollLeft=x;void ind.offsetWidth;ind.style.transition='';}
 const ar=nav.querySelectorAll(':scope>.gar');if(ar.length===2){ar[0].classList.toggle('off',si<=0);ar[1].classList.toggle('off',si>=bs.length-1);}
 const dots=nav.nextElementSibling&&nav.nextElementSibling.classList.contains('gdots')?[...nav.nextElementSibling.children]:[];
 if(dots.length){if(from&&!calm&&dots[from.i]&&dots[si]&&from.i!==si){dots[si].classList.remove('on');dots[from.i].classList.add('on');void dots[0].offsetWidth;dots[from.i].classList.remove('on');}dots.forEach((d,k)=>d.classList.toggle('on',k===si));}
 const sync=()=>{box.classList.toggle('fl',w.scrollLeft>4);box.classList.toggle('fr',w.scrollLeft<w.scrollWidth-w.clientWidth-4);};sync();w.addEventListener('scroll',sync,{passive:true});
 return{x,l:L,w:W,i:si};}
function gNavWire(){const w=$('#gTabs');if(!w)return;const from=S.gnavFrom;S.gnavFrom=null;tabsWire(w,from);
 if(from&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const b=$('#gBody');if(b){b.style.setProperty('--gd',(from.dir>0?26:-26)+'px');b.classList.remove('gsl');void b.offsetWidth;b.classList.add('gsl');}}}
{const base=render;render=function(){const r=base.apply(this,arguments);if($('#gTabs'))requestAnimationFrame(gNavWire);return r;};}
const TAB_MEM={};
function tabsEnhance(){const live=new Set();
 document.querySelectorAll('.utabs[role="tablist"]').forEach(w=>{const bs=[...w.children].filter(e=>e.tagName==='BUTTON');if(!bs.length)return;
  const lab=x=>x.textContent.replace(/\d+$/,'').trim(),key=bs.map(lab).join('|');
  if(!w.closest('.gnav')){
   const si=Math.max(0,bs.findIndex(x=>x.getAttribute('aria-selected')==='true')),nav=document.createElement('div'),gtw=document.createElement('div'),dots=document.createElement('div');
   nav.className='gnav'+(w.classList.contains('esub')?' esub':'')+(bs.length<2?' one':'');gtw.className='gtw';dots.className='gdots';
   const arrow=d=>{const a=document.createElement('button');a.type='button';a.className='gar';a.setAttribute('aria-label',d<0?'Aba anterior':'Próxima aba');a.innerHTML=ic(d<0?'chevL':'chevR',16,2.25);a.addEventListener('click',()=>{const k=bs.findIndex(x=>x.getAttribute('aria-selected')==='true')+d;if(bs[k])bs[k].click();});return a;};
   w.parentNode.insertBefore(nav,w);gtw.appendChild(w);nav.append(arrow(-1),gtw,arrow(1));
   dots.innerHTML=bs.map((x,k)=>'<button type="button" class="gdot'+(k===si?' on':'')+'" aria-label="'+esc(lab(x))+'"></button>').join('');
   [...dots.children].forEach((d,k)=>d.addEventListener('click',()=>bs[k].click()));nav.after(dots);
   w.insertAdjacentHTML('beforeend','<i class="gind" aria-hidden="true"></i>');
   const m=TAB_MEM[key];TAB_MEM[key]=tabsWire(w,m&&m.i!==si?{x:m.x,l:m.l,w:m.w,i:m.i}:null)||m;
  }
  live.add(key);});
 Object.keys(TAB_MEM).forEach(k=>{if(!live.has(k))delete TAB_MEM[k];});}
if(typeof MutationObserver!=='undefined'&&document.documentElement&&document.documentElement.nodeType){let q=0;new MutationObserver(()=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;tabsEnhance();});}).observe(document.documentElement,{childList:true,subtree:true});}
/* Visão geral: os avisos (.ova) seguidos viram uma lista só, num cartão, e o título da seção ganha a contagem do que pede atenção */
function ovGroup(){document.querySelectorAll('#gBody .ova').forEach(a=>{if(a.parentNode.classList.contains('ova-g'))return;
 const g=document.createElement('div');g.className='ova-g';a.before(g);let n=a;while(n&&n.classList&&n.classList.contains('ova')){const x=n.nextElementSibling;g.appendChild(n);n=x;}
 const sec=g.parentNode,hd=sec&&(sec.querySelector(':scope>.eb2')||sec.querySelector(':scope>.row>.eb2'));const k=g.querySelectorAll('.ova:not(.ok)').length;
 if(hd&&k&&!hd.querySelector('.eb2n')&&!/·/.test(hd.textContent))hd.insertAdjacentHTML('beforeend','<span class="eb2n">'+k+'</span>');});}
if(typeof MutationObserver!=='undefined'&&document.documentElement&&document.documentElement.nodeType){let q2=0;new MutationObserver(()=>{if(q2)return;q2=1;requestAnimationFrame(()=>{q2=0;ovGroup();});}).observe(document.documentElement,{childList:true,subtree:true});}
/* arrastar a tela para o lado passa de seção; não vale dentro do que já rola para o lado (chips, tabelas, quadros) */
{let t0=null;const hs=(el,root)=>{for(;el&&el!==root;el=el.parentNode){if(el.nodeType!==1)continue;const o=getComputedStyle(el).overflowX;if((o==='auto'||o==='scroll')&&el.scrollWidth>el.clientWidth+2)return true;}return false;};
 document.addEventListener('touchstart',e=>{const b=e.target.closest&&e.target.closest('#gBody');t0=b&&e.touches.length===1&&!hs(e.target,b)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
 document.addEventListener('touchend',e=>{if(!t0)return;const t=e.changedTouches[0],dx=t.clientX-t0.x,dy=t.clientY-t0.y;t0=null;if(Math.abs(dx)>70&&Math.abs(dy)<45&&Math.abs(dx)>Math.abs(dy)*2)A.gStep(dx<0?'1':'-1');},{passive:true});}

/* ===== Visão geral das páginas (Pessoas, Comunidade, Cuidado, Eventos e cultos) =====
   Cartões = os do web (mesmos nomes). "Precisam de atenção" = o que existe nos dados do módulo; o que só se resolve no web
   aparece como pedido para consulta (pgWeb) e diz onde resolver. */
const secLbl=s=>s.split(' · ')[0];
const pgK=l=>`<div class="vk${l.length%3?' k2':''}">${l.map(([v,t,s])=>`<div><b>${v}</b><span>${t}</span>${s?`<span>${s}</span>`:''}</div>`).join('')}</div>`;
const pgAtt=l=>`<section class="stack g3"><p class="eb2">Precisam de atenção</p>${l.filter(Boolean).join('')||rsOk('Tudo em dia','Nada esperando você agora.')}</section>`;
const PGW={};
const pgWeb=(tone,t,s,rows,where)=>{PGW[t]={t,rows,where};return rsAtt(tone,t,s,'pgWeb',t);};
const PEND_SEC={'Pedidos de integração':'Integração','Pedidos para entrar nas casas':'Casas de Apascentamento','Chamadas pendentes':'Casas de Apascentamento','Casos aguardando triagem':'Acompanhamento','Casos urgentes':'Acompanhamento','Discipulados atrasados':'Discipulado','Pedidos sem sua oração':'Pedidos de oração','Pedidos de cerimônia para decidir':'Batismos','Pessoas sem resposta nas escalas':'Escalas','Escalas para aprovar':'Escalas','Pagamentos de inscrição pendentes':'Inscrições'};
const GGROUP={pessoas:'Pessoas',comunidade:'Comunidade',cuidado:'Cuidado',agenda:'Agenda'};
const gItemOf=(mod,sec)=>{const gi=GMENU.findIndex(e=>e[0]==='g'&&e[3].some(x=>x[1]===mod&&x[2].includes(sec)));return gi<0?null:gi+'|'+GMENU[gi][3].findIndex(x=>x[1]===mod&&x[2].includes(sec))+'|'+sec;};
const pgGoSec=(mod,sec)=>{if(S.screen==='gModulo'&&S.gmod===mod&&S.gpage&&S.gpage.includes(sec)){S.gtab=gMod(mod)[5].indexOf(sec);softRender();}else gToSec(mod,sec);};
const gToSec=(mod,sec)=>{const it=gItemOf(mod,sec);if(it){A.gPage(it);return;}S.gmod=mod;S.gpage=null;S.gtab=gMod(mod)[5].indexOf(sec);go('gModulo');};
Object.assign(A,{
 pgWeb:v=>{const w=PGW[v];if(!w)return;sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${w.t}</h3><p class="callout">Isto se resolve no web: ${w.where}. Aqui você só acompanha.</p></div><div class="vl">${w.rows.map(([a,b])=>`<div class="vr"><span class="vs" style="min-width:104px">${a}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(b)}</span></div>`).join('')}</div><button class="btn outline md block" data-a="closeSheet">Entendi</button></div>`);},
 pgGo:v=>{const [mod,sec]=v.split('|');pgGoSec(mod,sec);},
 pgOpen:v=>{const [mod,sec,id]=v.split('|');pgGoSec(mod,sec);A.lsOpen(id);},
 gOpenP:v=>{const [mod,lab]=v.split('|'),sec=PEND_SEC[lab];if(sec&&gItemOf(mod,sec)){gToSec(mod,sec);return;}A.gOpen(mod);}
});
const pgPaged=()=>!!(S.gpage&&S.gpage.some(x=>x.startsWith('Visão geral · ')));
const pgHead=(label,btn)=>pgPaged()?(btn?vsHead('',btn):''):vsHead(label,btn);

/* Pendências: os mesmos cartões da Visão geral de cada página (só o que pede decisão), e um cartão por pendência dos módulos sozinhos */
const PGFN={'Integração':()=>pvgItg(1),'Devocional':()=>pvgDev(1),'Casas de Apascentamento':()=>mvgCasas(1),'Redes de casa':()=>mvgRedes(1),'Discipulado':()=>cvgDisc(1),'Acompanhamento':()=>cvgCase(1),'Pedidos de oração':()=>cvgPr(1),
 'Eventos':()=>avgEv(1),'Apresentações':()=>avgRito('apr','Apresentações','Apresentados',1),'Batismos':()=>avgRito('bat','Batismos','Batizados',1),'Consagrações':()=>avgRito('con','Consagrações','Consagrados',1),'Casamentos':()=>avgRito('cas','Casamentos','Casais casados',1),'Escalas':()=>avgScl(1),'Inscrições':()=>avgInsc(1)};
function pgPendSections(){const out=[];
 gMenuNow().forEach(e=>{
  if(e[0]==='m'){const m=gMod(e[1]);if(lvlOf(m[0])<2)return;const l=gPendOf(m[0]).map(p=>rsAtt('warn',esc(p[0]),p[1]+(p[1]===1?' esperando você':' esperando você'),'gOpenP',m[0]+'|'+p[0]));if(l.length)out.push([m[1],l]);return;}
  e[3].forEach(it=>{const fn=PGFN[it[0]];if(!fn||!gSeen(it[1])||lvlOf(it[1])<2)return;const l=fn().filter(x=>/class="ova (warn|bad)/.test(x));if(l.length)out.push([e[1]+' › '+it[0],l]);});});
 return out;}
