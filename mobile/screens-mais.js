/* =========================================================
   MAIS › sub-telas
   ========================================================= */
const SUBS=['carteirinha','documentos','tarefas','meusDados','notifs','quemSomos','cuidado','contribuir','inscricoes','aoVivo','meusMin','meusEmp','oracao','secretaria','assistente','privacidade'];
APP.push(...SUBS);
const brl=n=>'R$ '+Number(n).toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');
Object.assign(S,{
 me:{nome:'Rafael Pereira',email:'rafael@alvaigreja.com.br',tel:'(11) 99123-4455',nasc:'',end:'',upd:'12/03/2026',gen:'Masculino',civil:'Casado(a)',
  pais:'Brasil',cep:'',rua:'',num:'',comp:'',bairro:'',cid:'',uf:'',
  since:'2019',integ:'Integrado',bap:'12/05/2019',conv:'Mais de 5 anos',casa:'Casa Jardins',casaLead:'Gabriela Nunes',disc:'Gabriel Souza',
  fam:[{id:'f1',n:'Camila Pereira',rel:'Esposa',g:'sp',app:true,tone:'rosado'},{id:'f2',n:'Lucas Pereira',rel:'Filho',g:'kid',age:'3 anos',kids:true,tone:'ambar'},{id:'f3',n:'Helena Pereira',rel:'Filha',g:'kid',age:'7 meses',kids:true,tone:'lima'},{id:'f4',n:'Antônio Pereira',rel:'Pai',g:'par',app:false,tone:'salvia'},{id:'f5',n:'Marta Pereira',rel:'Mãe',g:'par',app:true,tone:'menta'}],
  hist:[['Cadastro criado','pelo app','12/03/2019'],['Integração aceita','por Pr. Rafael Pereira','02/04/2019'],['Batismo','Culto de Celebração','12/05/2019'],['Integrado(a) à comunidade','por Pr. Rafael Pereira','26/05/2019'],['Entrou na Casa Jardins','com Gabriela Nunes','08/09/2019'],['Começou a servir no Louvor','Vocal','03/2021'],['Família vinculada','Camila, Lucas e Helena','14/05/2023']]},meEdit:false,meTab:'dados',
 notifs:[{id:'n8',t:'Encontro de quinta muda de horário',s:'André Rocha · Líder da Casa Norte — Lapa: O encontro desta semana será às 20h, na casa do anfitrião.',when:'Hoje · 08h40',grp:'Hoje',tone:'ceu',i:'users',go:'encontros',unread:true},{id:'n0',t:'Convite acima do seu limite: Louvor · Vocal',s:'Dom, 25 out. Você já tem 3 escalas em outubro. Tudo bem recusar.',when:'Hoje · 09h05',grp:'Hoje',tone:'vinho',i:'alert',go:'escalas',unread:true},{id:'n1',t:'Você tem uma nova escala: Infantil · Monitor',s:'Dom, 18 out · 9h. Aceite até sexta.',when:'Hoje · 08h12',grp:'Hoje',tone:'lima',i:'calendar',go:'escalas',unread:true},
  {id:'n2',t:'Inscrições abertas: Conferência Anual 2026',s:'18 a 20 de outubro · gratuito',when:'Hoje · 07h30',grp:'Hoje',tone:'brasa',i:'ticket',go:'inscricoes',unread:true},
  {id:'n3b',t:'Você chegou ao limite de escalas de outubro',s:'3 de 3. Novos convites só chegam como exceção, com aviso.',when:'Hoje · 08h12',grp:'Hoje',tone:'damasco',i:'calendar',go:'escalas',unread:false},
  {id:'n3',t:'Sua escala de domingo foi aprovada',s:'Louvor · Vocal · Dom, 4 out',when:'Sex, 25 set · 09h20',grp:'Esta semana',tone:'laranja',i:'check',go:'escalas',unread:false},
  {id:'n4',t:'Seu pedido de oração foi respondido',s:'Pr. Marcos Lima está orando por você',when:'Qua, 23 set · 08h16',grp:'Esta semana',tone:'vinho',i:'hands',go:'oracao',unread:false},
  {id:'n5',t:'Feliz aniversário! A Alva ora por você hoje.',s:'Que seu novo ano seja cheio da graça de Deus.',when:'12 set',grp:'Anteriores',tone:'damasco',i:'sparkle',go:null,unread:true}],
 care:{urg:'Normal',next:{who:'Pr. Marcos Lima',when:'Qui, 8 out · 19h',remote:true,st:'pendente'},list:[{t:'Conversa sobre pressão no trabalho',d:'10/09/2026',who:'Pr. Marcos Lima',st:'urgente'},{t:'Aconselhamento familiar',d:'02/08/2026',who:'Diac. Ana Costa',st:'andamento'}]},
 give:{dest:'livre',amt:null,hist:[]},
 camps:[{id:'livre',t:'Contribuição livre',s:'Dízimos e ofertas para a obra'},{id:'retiro',t:'Retiro de Jovens 2026',s:'Ajude a levar 60 jovens ao retiro',got:8420,goal:15000},{id:'reforma',t:'Reforma do Templo',s:'Nova acústica e acessibilidade',got:34200,goal:80000},{id:'natal',t:'Natal Solidário',s:'Cestas para 80 famílias',got:12600,goal:20000,fixed:true,link:'pay.alva.app/f/natal-solidario'}],
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
const ME_ADDR=m=>[m.rua&&(m.rua+(m.num?', '+m.num:'')),m.comp,m.bairro,m.cid&&(m.cid+(m.uf?' - '+m.uf:''))].filter(Boolean).join(' · ');
const ME_DIV={Brasil:'Estado (sigla)',Argentina:'Província',Chile:'Região'};
const meAge=s=>{const m=String(s||'').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!m)return null;let a=TODAY.y-+m[3];if(TODAY.m<+m[2]||(TODAY.m===+m[2]&&TODAY.d<+m[1]))a--;return a>=0?a:null;};
const ME_MISS=m=>[['nasc','Data de nascimento'],['rua','Endereço'],['cep','Código postal']].filter(x=>!m[x[0]]);
const FAMG=[['par','Pais'],['me','Você'],['kid','Filhos'],['oth','Outros familiares']];
/* valor longo ou com detalhe vai para baixo do rótulo, alinhado à esquerda */
function meRow(l,v,ph,sub){const st=sub||String(v||'').length>24;return `<div class="kr${st?' kr-st':''}"><span>${l}</span><span${v?'':' class="kr-none"'}>${v?esc(v):(ph||'Não informado')}${v&&sub?`<small>${esc(sub)}</small>`:''}</span></div>`;}
function meDados(m,member){const miss=ME_MISS(m);
 return `${miss.length?`<div class="panel" style="animation:none"><div class="ph"><span class="bang">!</span><div><b>Faltam ${miss.length} ${miss.length>1?'dados':'dado'}</b><p>${miss.map(x=>x[1].toLowerCase()).join(', ').replace(/, ([^,]*)$/,' e $1').replace(/^./,c=>c.toUpperCase())}. Com aniversário e endereço, sua Casa consegue te visitar e celebrar com você.</p></div></div><button class="btn primary md block" data-a="meEdit">Completar agora</button></div>`:''}
  <div class="kv"><div class="kh"><span>Pessoais</span><span>você edita</span></div>${meRow('Nome completo',m.nome)}${meRow('E-mail',m.email)}${meRow('Telefone',m.tel)}${meRow('Nascimento',m.nasc)}${meAge(m.nasc)!=null?meRow('Idade','Você tem '+meAge(m.nasc)+' anos'):''}${meRow('Gênero',m.gen)}${meRow('Estado civil',m.civil)}</div>
  <div class="kv"><div class="kh"><span>Endereço</span><span>você edita</span></div>${meRow('País',m.pais||'Brasil')}${meRow('Rua e número',m.rua&&(m.rua+(m.num?', '+m.num:'')))}${meRow('Complemento',m.comp,'—')}${meRow('Bairro ou distrito',m.bairro)}${meRow('Cidade',m.cid)}${meRow((ME_DIV[m.pais||'Brasil']||'Estado').replace(' (sigla)',''),m.uf)}${meRow('Código postal',m.cep)}</div>
  <div class="kv"><div class="kh"><span>Na igreja</span><span>definido pela secretaria</span></div>${meRow('Igreja',S.church.name)}${meRow('Perfil',ROLES[S.role][0])}${member?meRow('Membro desde',m.since)+meRow('Integração',m.integ)+meRow('Batismo',m.bap)+meRow('Tempo de conversão',m.conv)+meRow('Casa de Apascentamento',m.casa,'',m.casaLead?'Liderada por '+m.casaLead:'')+meRow('Discipulado',m.disc,'',m.disc?'Seu discipulador':'')+meRow('Ministérios',MYMIN.length?MYMIN.length+(MYMIN.length>1?' ministérios':' ministério'):'','',MYMIN.map(x=>x.t).join(' · ')):''}</div>
  <button class="btn primary block" data-a="meEdit">Editar meus dados</button>
  ${member?`<button class="tlink" data-a="go" data-v="secretaria">Algo errado em “Na igreja”? Fale com a secretaria</button>`:''}`;}
function famNode(p,me){const app=me?'':p.kids?'<span class="fn-tag kid">Kids</span>':p.rem?'<span class="fn-tag wait">Remoção em análise</span>':p.pend?'<span class="fn-tag wait">Em análise</span>':p.app?'<span class="fn-tag on">No app</span>':'<span class="fn-tag">Sem o app</span>';
 return `<button class="fnode ${me?'me':''}" ${me?'disabled':`data-a="famOpen" data-v="${p.id}"`}>${pavM(me?p.nome:p.n,p.tone||'ceu')}<span class="grow stack" style="gap:3px;min-width:0"><span class="fn-n">${esc(me?p.nome:p.n)}</span><span class="fn-r">${me?'Você':esc(p.rel)+(p.age?' · '+esc(p.age):'')}</span></span>${app}${me?'':`<span class="chev">${ic('chevR',18,2)}</span>`}</button>`;}
function meFamilia(m){const by=g=>m.fam.filter(p=>p.g===g),sp=by('sp');
 const grp=(lbl,inner)=>`<section class="fgen"><p class="eb2">${lbl}</p><div class="fgen-l">${inner}</div></section>`;
 const blocks=[by('par').length?grp('Pais',by('par').map(p=>famNode(p)).join('')):'',grp(sp.length?'Você e '+(sp[0].rel==='Esposa'?'sua esposa':sp[0].rel==='Marido'?'seu marido':'seu cônjuge'):'Você',famNode(m,true)+sp.map(p=>famNode(p)).join('')),by('kid').length?grp('Filhos',by('kid').map(p=>famNode(p)).join('')):'',by('oth').length?grp('Outros familiares',by('oth').map(p=>famNode(p)).join('')):''].filter(Boolean);
 const n=m.fam.length+1,gens=(by('par').length?1:0)+1+(by('kid').length?1:0),inApp=1+m.fam.filter(p=>p.app).length;
 return `<div class="fstats"><div><b>${n}</b><span>pessoas</span></div><div><b>${gens}</b><span>${gens>1?'gerações':'geração'}</span></div><div><b>${inApp}</b><span>no app</span></div></div>
  <div class="ftree">${blocks.join('<i class="fline" aria-hidden="true"></i>')}</div>
  <button class="btn outline block" data-a="famAdd">${ic('userplus',18,2)}Pedir vínculo</button>
  <p class="foot" style="margin:0;text-align:center">Cada vínculo é analisado antes de aparecer para a liderança.</p>`;}
function meCaminhada(m){const steps=[['Cadastro',1,'2019'],['Integração aceita',1,'abr 2019'],['Batismo',1,'mai 2019'],['Integrado(a)',1,'mai 2019'],['Casa de Apascentamento',!!m.casa,'set 2019'],['Serve em um ministério',MYMIN.length>0,'2021']];
 return `<section class="stack g3"><p class="eb2">Sua caminhada</p><ol class="walk2">${steps.map(x=>`<li class="${x[1]?'done':''}"><span class="w-d">${x[1]?ic('check',14,2.6):''}</span><span class="grow">${x[0]}</span><span class="w-t">${x[1]?x[2]:'próximo passo'}</span></li>`).join('')}</ol></section>
  <section class="stack g3"><div class="row between"><p class="eb2">Onde você serve</p><button class="link" data-a="go" data-v="meusMin">Ver tudo</button></div><div class="list">${MYMIN.map(x=>`<button class="item" data-a="go" data-v="meusMin"><span class="iconbox" style="${tone(x.tone)}">${ic(x.i,20)}</span><span class="grow stack" style="gap:2px"><span class="it-title">${x.t}</span><span class="it-sub">${x.role} · desde ${x.since}</span></span><span class="chev">${ic('chevR',18,2)}</span></button>`).join('')}</div></section>
  <section class="stack g3"><p class="eb2">Histórico</p><ol class="mhist">${m.hist.slice().reverse().map(h=>`<li><span class="mh-d">${h[2]}</span><span class="stack" style="gap:2px"><b>${esc(h[0])}</b><span>${esc(h[1])}</span></span></li>`).join('')}</ol></section>`;}
V.meusDados=()=>{const m=S.me,member=S.role!=='visitante';
 if(!S.meEdit){const t=member?(S.meTab||'dados'):'dados';
  return sub('Meus dados','',`
  <div class="mhead">${pavM(m.nome,'ceu','lg')}<div class="stack" style="gap:6px;min-width:0"><span class="t3">${esc(m.nome)}</span><span class="foot">${member?`Membro desde ${m.since} · ${esc(S.church.name)}`:`Visitante · ${esc(S.church.name)}`}</span>${member?ST2('ok',m.integ):''}</div></div>
  ${member?`<div class="utabs ul" role="tablist">${[['dados','Dados'],['familia','Família'],['caminhada','Caminhada']].map(z=>`<button role="tab" aria-selected="${t===z[0]}" data-a="meTab" data-v="${z[0]}">${z[1]}</button>`).join('')}</div>`:''}
  ${t==='familia'?meFamilia(m):t==='caminhada'?meCaminhada(m):meDados(m,member)}
  <p class="foot" style="margin:0;text-align:center">Atualizado em ${m.upd}. Só a liderança da sua igreja vê esses dados.</p>`);}
 const opt=(id,label,opts,v)=>`<div class="stack g2" id="f-${id}"><span class="eb2">${label}</span><div class="chips2" role="radiogroup" aria-label="${label}">${opts.map(o=>`<button type="button" class="chip" role="radio" aria-pressed="${v===o}" aria-checked="${v===o}" data-a="meOpt" data-v="${id}|${o}">${o}</button>`).join('')}</div><input type="hidden" id="${id}" value="${esc(v||'')}"></div>`;
 return sub('Editar dados','Seus dados ficam visíveis só para a liderança da sua igreja.',`<form class="stack g6" data-submit="saveMe" novalidate>
  <section class="stack g4"><p class="eb2">Pessoais</p>
  ${field({id:'mNome',label:'Nome completo',val:m.nome,ac:'name'})}
  ${field({id:'mEmail',label:'E-mail',type:'email',val:m.email,im:'email'})}
  ${field({id:'mTel',label:'Telefone',type:'tel',val:m.tel,im:'tel',max:15})}
  ${field({id:'mNasc',label:'Data de nascimento',val:m.nasc,ph:'dd/mm/aaaa',im:'numeric',max:10})}
  ${opt('mGen','Gênero',['Feminino','Masculino'],m.gen)}
  ${opt('mCivil','Estado civil',['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)'],m.civil)}</section>
  <section class="stack g4"><p class="eb2">Endereço</p>
  ${opt('mPais','País',['Brasil','Argentina','Chile'],m.pais||'Brasil')}
  ${field({id:'mCep',label:'Código postal',val:m.cep,ph:'00000-000',im:'numeric',max:9,hint:'No Brasil, preenchemos rua, bairro e cidade a partir do CEP.'})}
  ${field({id:'mRua',label:'Rua',val:m.rua,ac:'address-line1'})}
  <div class="frow">${field({id:'mNum',label:'Número',val:m.num,im:'numeric',max:8})}${field({id:'mComp',label:'Complemento',val:m.comp,ph:'Opcional'})}</div>
  ${field({id:'mBairro',label:'Bairro ou distrito',val:m.bairro})}
  <div class="frow r">${field({id:'mCid',label:'Cidade',val:m.cid})}${field({id:'mUf',label:ME_DIV[m.pais||'Brasil'],val:m.uf,max:(m.pais||'Brasil')==='Brasil'?2:40})}</div></section>
  <div class="stack g3"><button class="btn primary block" type="submit">Salvar alterações</button><button type="button" class="tlink" data-a="meCancel">Cancelar</button></div></form>`);};

/* 2. Notificações */
V.notifs=()=>{const n=S.notifs.filter(x=>x.unread).length;const grps=['Hoje','Esta semana','Anteriores'];
 return {sb:'var(--ink)',tabs:'mais',html:`<header class="subhead"><div class="row between"><button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button><button class="iconbtn" data-a="notif" aria-label="Preferências de notificação">${ic('sliders',19,1.9)}</button></div><h1 class="big" style="margin-top:18px">Notificações</h1>
  <div class="row between" style="margin-top:8px;min-height:28px"><span class="lede" style="margin:0">${n?`<b style="color:var(--ink)">${n}</b> ${n>1?'novas':'nova'}`:'Tudo em dia'}</span>${n?`<button class="link" data-a="readAll">Marcar como lidas</button>`:''}${S.notifs.some(x=>!x.unread)?`<button class="link" data-a="delRead">Apagar as lidas</button>`:''}</div></header>
 <div class="pad stack g6" style="padding-top:4px">
  ${grps.map(g=>{const l=S.notifs.filter(x=>x.grp===g);return l.length?`<section class="stack"><p class="eb2" style="margin-bottom:4px">${g}</p><div class="chlist">${l.map(x=>`<button class="nrow ${x.unread?'unread':''}" data-a="openNotif" data-v="${x.id}"><span class="ndot" aria-hidden="true"></span><span class="grow stack" style="gap:3px"><span class="row between" style="gap:12px;align-items:baseline"><span class="nt">${esc(x.t)}</span><span class="nwhen">${x.when.split(' · ').pop()}</span></span><span class="chm">${esc(x.s)}</span></span></button>`).join('')}</div></section>`:'';}).join('')}
  <p class="foot" style="margin:0;text-align:center">As notificações ficam guardadas por 90 dias.</p>
 </div>`};};

/* redes da igreja: mesmo formato do Alva Web (t = tipo, n = nome exibido, h = perfil, u = link) */
const SOCIAL=[{t:'instagram',n:'Instagram',h:'@igrejaalva',u:'instagram.com/igrejaalva'},{t:'tiktok',n:'TikTok',h:'@igrejaalva',u:'tiktok.com/@igrejaalva'},{t:'facebook',n:'Facebook',h:'Igreja Alva',u:'facebook.com/igrejaalva'}];
/* 3. Quem somos */
V.quemSomos=()=>sub('Quem somos','',`
  <div class="qs-hero gr-aurora"><p>Um lugar para encontrar Deus, crescer em comunidade e ser enviado.</p></div>
  <div class="stack g4"><p class="body" style="color:var(--ink)">A Igreja Alva nasceu em 2012 com um propósito simples: ser um lugar onde pessoas encontram Deus, crescem em comunidade e são enviadas para transformar o mundo ao redor.</p><p class="body">Desde então, vimos centenas de vidas transformadas pelo Evangelho em São Paulo e região.</p></div>
  <div class="stats">${[['2012','fundação'],['1.240','membros na Sede'],['3','igrejas'],['48','Casas ativas']].map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
  <section class="stack g3"><p class="eb2">Nossos valores</p><ol class="steps"><li>Presença de Deus</li><li>Comunidade autêntica</li><li>Discipulado intencional</li><li>Missão local e global</li></ol></section>
  ${SOCIAL.length?`<section class="stack g3"><p class="eb2">Conecte-se</p><div class="socials">${SOCIAL.map(r=>`<a class="soc" href="https://${esc(r.u)}" target="_blank" rel="noopener" data-a="social" data-v="${esc(r.n)}"><span class="sn">${esc(r.n)}</span><span class="sh">${esc(r.h||r.u)}</span><span class="sa" aria-hidden="true">${ic('arrowR',16,2)}</span></a>`).join('')}</div></section>`:''}
  <section class="stack g3"><p class="eb2">Onde estamos</p><div class="list">${CHURCHES.map(c=>`<div class="item" style="cursor:default"><span class="iconbox" style="${tone(c.tone)};font:800 17px/1 var(--font-display)">A</span><span class="grow stack" style="gap:2px"><span class="it-title">${c.name}</span><span class="it-sub">${c.city} · cultos aos domingos</span></span></div>`).join('')}</div></section>`);

/* 4. Cuidado pastoral */
function careBody(inTab){const c=S.care,nx=c.next;return `${inTab===false?'':'<p class="callout" style="margin:0">Passando por um momento difícil ou precisa conversar com um pastor? Conte aqui: alguém da equipe pastoral entra em contato.</p>'}<div class="stack g6">
  <form class="stack g4" data-submit="sendCare" novalidate>
   ${field({id:'cText',label:'Como podemos te ajudar?',area:true,ph:'Conte o que está acontecendo',max:600,hint:'Só a equipe pastoral lê.'})}
   <div class="stack g2"><span class="eb2">Urgência</span><div class="seg" id="urgSeg">${['Normal','Urgente'].map(u=>`<button type="button" aria-selected="${c.urg===u}" data-a="urg" data-v="${u}">${u}</button>`).join('')}</div>
   ${c.urg==='Urgente'?`<p class="foot" style="margin:4px 0 0">Respondemos pedidos urgentes no mesmo dia. Em risco imediato, ligue 188 (CVV) ou 192 (SAMU).</p>`:''}</div>
   <button class="btn primary block" type="submit">Solicitar atendimento</button>
  </form>
  ${nx?`<section class="stack g3"><p class="eb2">Meu próximo encontro</p><article class="ev-c es2 care1" style="--t:var(--tone-oceano)"><div class="es2-r">${pavM(nx.who,'oceano','','width:44px;height:44px;font-size:14px')}
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-t">${nx.who}</span><span class="ev-m">${ic('clock',13,2)}${nx.when}<span class="ev-dot"></span>${ic(nx.remote?'monitor':'pin',13,2)}${nx.remote?'Remoto':'Presencial'}</span></span>
   ${nx.st==='aceito'?ST2('ok','Confirmado'):nx.st==='recusado'?ST2('mute','Recusado'):ST2('warn','Responda')}</div>
   ${nx.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="careOk">Aceitar</button><button class="btn ghost2 sm" data-a="careNo">Recusar</button></div>`:`<p class="es2-note">${nx.st==='aceito'?'O link da chamada aparece aqui 15 minutos antes.':'Avisamos o pastor. Ele vai propor outro horário.'}</p>`}</article></section>`:''}
  <section class="stack g3"><div class="row between"><p class="eb2">Meus atendimentos</p><span class="foot">urgentes primeiro</span></div>
   <div class="ev-list">${[...c.list].sort((a,b)=>(a.st==='urgente'?0:1)-(b.st==='urgente'?0:1)).map((x,i)=>{const k=x.st==='urgente'?['bad','Urgente','vinho','alert']:x.st==='novo'?['info','Recebido','ceu','mail']:['info','Em atendimento','menta','care'];return `<div class="ev-c es2 care2" style="--t:var(--tone-${k[2]});--i:${i};cursor:default"><div class="es2-r"><span class="care-i">${ic(k[3],17,2)}</span><span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-t" style="font-size:15px">${esc(x.t)}</span><span class="ev-m">${x.d.slice(0,5)}<span class="ev-dot"></span><span class="ev-pl">${esc(x.who)}</span></span></span>${ST2(k[0],k[1])}</div></div>`;}).join('')}</div>
   <p class="foot" style="text-align:center;margin:2px 0 0">As anotações e o histórico completo ficam com a equipe pastoral.</p></section></div>`;}
V.cuidado=()=>sub('Acompanhamento','Passando por um momento difícil ou precisa conversar com um pastor? Conte um pouco aqui e alguém da equipe pastoral entra em contato.',careBody(false));

/* 5. Contribuir */
const giveQrCells=()=>Array.from({length:441},(_,i)=>{const x=i%21,y=Math.floor(i/21),f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);const edge=f&&(x%14===0||x%14===6||y%14===0||y%14===6||(x%14>=2&&x%14<=4&&y%14>=2&&y%14<=4));return f?(edge?1:0):((x*5+y*11+x*y)%5<2?1:0);});
V.contribuir=()=>{const g=S.give,amt=g.amt,dst=S.camps.find(c=>c.id===g.dest),fx=!!dst.fixed;return sub('Contribuir','',`
  <section class="stack g3"><p class="eb2">Para onde vai sua contribuição?</p><div class="stack g3" role="radiogroup">${S.camps.map(c=>`<button class="rec" role="radio" aria-checked="${g.dest===c.id}" data-a="giveDest" data-v="${c.id}"><span class="grow stack" style="gap:4px"><span class="it-title">${c.t}</span><span class="it-sub">${c.s}${c.fixed?' · link fixo, anônimo':''}</span>${c.goal?`<span class="bar" style="margin-top:6px"><i style="width:${Math.round(c.got/c.goal*100)}%"></i></span><span class="foot" style="font-variant-numeric:tabular-nums">${brl(c.got)} de ${brl(c.goal)}</span>`:''}</span><span class="radio">${g.dest===c.id?ic('check',14,3):''}</span></button>`).join('')}</div></section>
  ${fx?`<section class="stack g3"><div class="card stack g3" style="padding:16px;border-radius:var(--r-md)"><div class="lj-qr" aria-label="QR code do link da campanha (demonstração)">${giveQrCells().map(c=>`<i${c?' class="on"':''}></i>`).join('')}</div><div class="copybox"><span class="mask" style="font-size:13px;word-break:break-all">https://${dst.link}</span></div><button class="btn secondary block" data-a="copy" data-v="https://${dst.link}">Copiar link</button></div>
   <div class="svc-note" style="margin:0">${ic('info',16,2)}<div><b>Doação anônima</b><span>Neste link a igreja não recebe o seu nome e você não recebe recibo nem informe. Escolha o valor na página de pagamento.</span></div></div>
   <button class="btn accent block" data-a="giveOpenFixed">Abrir o pagamento</button></section>`
  :`<section class="stack g3"><p class="eb2">Valor</p><div class="amt2">${[50,100,200].map(v=>`<button class="chip" aria-pressed="${amt===v&&!g.other}" data-a="giveAmt" data-v="${v}">R$ ${v}</button>`).join('')}<button class="chip" aria-pressed="${!!g.other}" data-a="giveAmt" data-v="outro">Outro valor</button></div>
   <div ${g.other?'':'hidden'} id="giveOther">${field({id:'gOther',label:'Quanto?',ph:'R$ 0,00',im:'decimal',val:g.other&&amt?brl(amt):''})}</div></section>
  <section class="stack g3"><p class="eb2">CPF <span class="foot" style="font-weight:400">opcional</span></p>${field({id:'gCpf',label:'CPF',ph:'000.000.000-00',im:'numeric'})}<p class="foot" style="margin:0">Só para o informe anual de contribuições. Pode deixar em branco.</p></section>
  <button class="btn accent block ${amt?'split':''}" id="giveGo" data-a="giveGo" ${amt?'':'disabled'}>${amt?`<span>Contribuir</span><span class="meta">${brl(amt)}</span>`:'Escolha um valor acima'}</button>
  <p class="foot" style="margin:0">O pagamento abre no navegador do celular, em Pix ou cartão, e volta para cá quando terminar.</p>`}
  <section class="stack g3"><div class="row between"><p class="eb2">Minhas contribuições</p>${g.hist.length?`<button class="link" data-a="informe">Informe 2025</button>`:''}</div>
   ${g.hist.length?`<div class="list">${g.hist.map((h,i)=>`<div class="item" style="cursor:default"><span class="grow stack" style="gap:3px"><span class="it-title" style="font-variant-numeric:tabular-nums">${brl(h.v)}</span><span class="it-sub">${h.dest} · ${h.d}</span>${h.st==='ok'&&h.n?`<button class="link" data-a="giveRecibo" data-v="${i}" style="align-self:flex-start">Recibo nº ${h.n}</button>`:''}${h.st==='wait'||(h.st==='ok'&&h.cancel)?`<button class="link" data-a="giveCancel" data-v="${i}" style="align-self:flex-start">Cancelar contribuição</button>`:''}</span>${h.st==='ok'?status('success','Confirmada'):h.st==='wait'?status('warning','Aguardando pagamento'):status('danger','Estornada')}</div>`).join('')}</div>`:`<p class="callout" style="margin:0">Você ainda não fez nenhuma contribuição pelo app.</p>`}</section>`);};

/* 6. Inscrições */
V.inscricoes=()=>{const I_=S.insc;const mineIds=I_.mine.map(m=>m.id);return sub('Inscrições','',`
  <section class="stack g3"><p class="eb2">Eventos abertos</p>${I_.open.filter(e=>!mineIds.includes(e.id)).map(e=>`<article class="card" style="overflow:hidden"><div class="gr-${e.g}" style="height:10px"></div><div class="stack g3" style="padding:16px 18px 18px"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="t3">${e.t}</span><span class="it-sub">${e.when} · ${e.price?brl(e.price):'Gratuito'}</span></div>${e.left<20?status('warning',e.left+' vagas'):''}</div><button class="btn primary md block ${e.price?'split':''}" data-a="inscrever" data-v="${e.id}">${e.price?`<span>Inscrever-se</span><span class="meta">${brl(e.price)}</span>`:'Inscrever-se'}</button></div></article>`).join('')||'<p class="callout">Você já está inscrito em todos os eventos abertos.</p>'}
   <p class="foot" style="margin:0">A inscrição confirma quando o pagamento cai.</p></section>
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

/* Meus empréstimos (somente leitura) */
const MYLOANS=[{t:'Violão Yamaha F310',qty:1,due:[2026,9,28],sub:'Almoxarifado'},{t:'Microfone Shure SM58',qty:2,due:[2026,10,6],sub:'Almoxarifado'}];
const lnLate=x=>new Date(x.due[0],x.due[1]-1,x.due[2])<new Date(TODAY.y,TODAY.m-1,TODAY.d);
V.meusEmp=()=>sub('Meus empréstimos','O que do almoxarifado está com você.',`
  <p class="tk-note">${ic('info',16,2)}<span>Só para consulta. Para devolver, fale com quem cuida do almoxarifado.</span></p>
  ${MYLOANS.length?`<div class="stack g3">${MYLOANS.map(x=>`<article class="card row g3" style="padding:14px 16px;border-radius:var(--r-md)"><span class="iconbox" style="${tone('ceu')}">${ic('clipboard',22)}</span><span class="grow stack" style="gap:4px;min-width:0"><span class="it-title">${esc(x.t)}</span><span class="it-sub">${x.qty} ${x.qty>1?'unidades':'unidade'} · devolver até ${x.due[2]} ${MTH[x.due[1]-1]}</span><span>${lnLate(x)?status('danger','Em atraso'):status('info','No prazo')}</span></span></article>`).join('')}</div>`:`<div class="card" style="padding:28px 18px;border-radius:var(--r-lg);text-align:center"><p class="callout" style="margin:0">Você não tem empréstimos.</p></div>`}`);

/* Minhas tarefas (somente leitura) */
const MYTASKS=[
 {id:'tk1',t:'Aprovar o roteiro de boas-vindas aos visitantes',min:'Recepção',tone:'rosado',i:'door',board:'Melhorias do domingo',owner:'Culto de Celebração',col:'A fazer',due:[2026,9,28],by:'Juliana Reis',desc:'A Recepção mandou a proposta com o novo trajeto até a sala de café.'},
 {id:'tk2',t:'Aprovar o repertório final do mês',min:'Louvor',tone:'laranja',i:'music',board:'Repertório de outubro',owner:'Ministério de Louvor',col:'Fazendo',due:[2026,10,2],by:'Davi Melo',desc:''},
 {id:'tk3',t:'Fechar o orçamento com o Financeiro',min:'Eventos',tone:'ceu',i:'ticket',board:'Preparação do congresso',owner:'Congresso de Mulheres 2027',col:'A fazer',due:[2026,10,12],by:'Diego Martins',desc:''},
 {id:'tk4',t:'Aprovar a data com o conselho',min:'Eventos',tone:'ceu',i:'ticket',board:'Preparação do congresso',owner:'Congresso de Mulheres 2027',col:'Feito',due:null,by:'Diego Martins',desc:'',done:true}];
const MTH=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const tkDue=x=>{if(!x.due||x.done)return null;const k=K(...x.due),n=Math.round((new Date(x.due[0],x.due[1]-1,x.due[2])-new Date(TODAY.y,TODAY.m-1,TODAY.d))/864e5),lbl=x.due[2]+' '+MTH[x.due[1]-1];
 return n<0?['danger','Atrasada · '+lbl,lbl]:n===0?['warning','Vence hoje',lbl]:n===1?['warning','Vence amanhã',lbl]:n<=3?['warning','Em '+n+' dias',lbl]:['info',lbl,lbl];};
const tkOpen=()=>MYTASKS.filter(x=>!x.done);
V.tarefas=()=>{const op=tkOpen(),dn=MYTASKS.filter(x=>x.done);
 const card=x=>{const o=S.tkOpen===x.id,d=tkDue(x);return `<article class="card acc tkc ${o?'open':''} ${x.done?'done':''}"><button class="acc-h" data-a="tkToggle" data-v="${x.id}" aria-expanded="${o}"><span class="iconbox" style="${tone(x.tone)}">${ic(x.done?'check':x.i,22,x.done?2.25:1.75)}</span><span class="grow stack" style="gap:4px;min-width:0"><span class="it-title tk-t">${esc(x.t)}</span><span class="it-sub">${esc(x.min)} · ${esc(x.board)}</span>${d?`<span>${status(d[0],d[1])}</span>`:''}</span><span class="chev acc-c">${ic('chevR',18,2)}</span></button>
  ${o?`<div class="acc-b">${x.desc?`<p class="tk-desc">${esc(x.desc)}</p>`:''}<div class="kv" style="box-shadow:none;background:transparent"><div class="kr"><span>Situação</span><span>${x.col}</span></div><div class="kr"><span>Prazo</span><span>${d?d[2]:x.done?'Concluída':'Sem prazo'}</span></div><div class="kr"><span>Quadro</span><span>${esc(x.board)}</span></div><div class="kr"><span>De</span><span>${esc(x.owner)}</span></div><div class="kr"><span>Criada por</span><span>${esc(x.by)}</span></div></div></div>`:''}</article>`;};
 return sub('Minhas tarefas','O que foi atribuído a você nos quadros dos ministérios e eventos.',`
  <p class="tk-note">${ic('info',16,2)}<span>Só para consulta. Para mudar uma tarefa, fale com quem criou o quadro.</span></p>
  ${op.length?`<section class="stack g3"><p class="eb2">Em aberto · ${op.length}</p><div class="stack g3">${op.map(card).join('')}</div></section>`:`<div class="card" style="padding:28px 18px;border-radius:var(--r-lg);text-align:center"><p class="callout" style="margin:0">Nenhuma tarefa em aberto.</p></div>`}
  ${dn.length?`<section class="stack g3"><p class="eb2">Concluídas</p><div class="stack g3">${dn.map(card).join('')}</div></section>`:''}`);};

/* 9. Pedidos de oração */
V.oracao=()=>sub('Pedidos de oração','A equipe de intercessão ora por cada pedido durante a semana.',`
  <form class="stack g4" data-submit="sendPrayer" novalidate>
   ${field({id:'prText',label:'Seu pedido',area:true,ph:'Pelo que podemos orar?',max:500,hint:'0/500'})}
   <div class="list"><div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">Manter anônimo</span><span class="it-sub">Só quem administra os pedidos vê seu nome</span></span><button type="button" class="switch" role="switch" aria-checked="false" id="prAnon" aria-label="Manter anônimo" data-a="sw"></button></div></div>
   <button class="btn primary block" type="submit">Enviar pedido</button>
  </form>
  <section class="stack g3"><p class="eb2">Meus pedidos</p><div class="list">${S.prayers.map(p=>`<div class="item" style="cursor:default;align-items:flex-start;padding-block:14px;flex-direction:column;gap:6px"><span class="it-title" style="font-weight:500">${esc(p.t)}</span><span class="row between" style="width:100%;gap:8px"><span class="foot">${p.d}${p.anon?' · anônimo':''}</span>${p.st==='orado'?status('success','Orado'):p.st==='respondido'?status('info','Respondido'):status('warning','Aguardando')}</span>${p.st==='orado'?`<span class="foot">${p.by} orou por você em ${p.at}.</span><button class="link" data-a="answered" data-v="${p.id}" style="font-size:14px">Deus respondeu? Conte pra gente</button>`:''}</div>`).join('')}</div></section>`);

/* 10. Secretaria */
V.secretaria=()=>sub('Fale com a secretaria','Atendimento de segunda a sexta, das 9h às 18h.',`
  <button class="btn primary block" data-a="whatsSec">Chamar no WhatsApp</button>
  <div class="kv">${[['Telefone','(11) 99123-4455'],['E-mail','secretaria@alvaigreja.com.br']].map(r=>`<div class="kr" style="align-items:center"><span class="stack" style="gap:2px"><span class="foot">${r[0]}</span><span style="color:var(--ink);font-weight:600">${r[1]}</span></span><button class="btn outline sm" data-a="copy" data-v="${r[1]}">Copiar</button></div>`).join('')}
   <div class="kr stack2"><span>Endereço</span><span>Rua das Acácias, 500 · Jardins<br><span style="font-weight:400;color:var(--ink-muted)">São Paulo, SP</span></span></div></div>
  <section class="stack g3"><p class="eb2">Resolver agora</p><div class="list">${S.role==='visitante'?'':S.decReq&&S.decReq.wait?`<div class="item" style="align-items:center"><span class="grow stack" style="gap:2px"><span class="it-title" style="font-weight:500">Declaração de membro</span><span class="foot" style="margin:0">Pedido em análise desde ${S.decReq.d}. A secretaria avisa você.</span></span><button class="btn outline sm" data-a="decCancel">Cancelar pedido</button></div>`:S.decReq?`<div class="item" style="align-items:center"><span class="grow stack" style="gap:2px"><span class="it-title" style="font-weight:500">Declaração de membro</span><span class="foot" style="margin:0">Emitida em ${S.decReq.d}. Já está em Meus documentos, pronta para baixar.</span></span><button class="btn outline sm" data-a="sub" data-v="documentos">Ver</button></div>`:`<button class="item" data-a="decReq"><span class="grow stack" style="gap:2px"><span class="it-title" style="font-weight:500">Pedir declaração de membro</span><span class="foot" style="margin:0">Sai na hora para quem está em dia. Se não sair, a secretaria analisa e avisa você.</span></span><span class="chev">${ic('chevR',18,2)}</span></button>`}<button class="item" data-a="sub" data-v="contribuir"><span class="grow it-title" style="font-weight:500">Segunda via de recibo</span><span class="chev">${ic('chevR',18,2)}</span></button></div><p class="foot" style="margin:0">Para outros assuntos, como casamento, fale com a secretaria pelos canais acima.</p></section>`);

/* 11. Assistente */
V.assistente=()=>sub('Assistente no WhatsApp','Um jeito rápido de resolver algumas coisas sem abrir o app. Funciona para um conjunto pequeno de perguntas, não para tudo.',`
  <div class="chat" id="chat">${(S.chat.length?S.chat:[['me','Qual a agenda da igreja?'],['bot',BOT['Qual a agenda da igreja?']]]).map(m=>`<div class="bub ${m[0]}">${esc(m[1]).replace(/\n/g,'<br>')}</div>`).join('')}</div>
  <section class="stack g3"><p class="eb2">Toque para testar</p><div class="row g2" style="flex-wrap:wrap">${Object.keys(BOT).map(q=>`<button class="chip" data-a="ask" data-v="${q}">${q}</button>`).join('')}</div></section>
  <button class="btn primary block" data-a="whats2">Abrir no WhatsApp</button>
  <p class="foot" style="margin:0;text-align:center">Protótipo ilustrativo: as respostas acima são simuladas.</p>`);

/* 12. Privacidade */
/* carteirinha digital do membro: QR de validação, vale só com a situação Ativa; fica inválida no Afastado (Secretaria no Alva Web) */
const ccNum=()=>'AV-2026-'+String(1000+S.user.name.split('').reduce((a,c)=>(a*31+c.charCodeAt(0))%9000,7)).slice(-4);
const ccMini=()=>`<button class="ccm" data-a="sub" data-v="carteirinha" aria-label="Abrir carteirinha de membro"><span class="ccm-qr">${ic('qr',22,2)}</span><span class="grow stack" style="gap:3px;min-width:0"><span class="ccm-k">Carteirinha</span><span class="ccm-n">Membro · ${ccNum()}</span></span><span class="ccm-st"><i></i>Ativa</span><span class="ccm-a" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;
V.carteirinha=()=>{const nm=S.user.name,num=ccNum();
 if(S.role==='visitante')return sub('Carteirinha de membro','Disponível para quem já é membro da igreja.',`<p class="callout" style="margin:0">Peça para ser membro em <b>Mais › Quero ser membro</b>. Depois da integração, a sua carteirinha aparece aqui.</p>`);
 return sub('Carteirinha de membro','Sua identificação na igreja. Mostre na entrada de eventos e quando pedirem a sua membresia.',`
  <section class="cc" aria-label="Carteirinha de membro">
   <div class="cc-top"><span class="cc-ch"><span class="cc-lg">${ic('church',14,2)}</span>${S.church.name}</span><span class="cc-st"><i></i>Ativo</span></div>
   <div class="cc-mid"><div class="cc-qr">${qrSVG(num)}</div><div class="cc-nm"><small>Membro</small><b>${esc(nm)}</b></div></div>
   <div class="cc-ft"><span><small>Número</small><b>${num}</b></span><span><small>Membro desde</small><b>mar/2023</b></span></div>
  </section>
  <section class="cci" aria-label="Como funciona">
   <div class="cci-r"><span class="cci-i">${ic('qr',18,2)}</span><span><b>Confere na hora</b><small>Quem lê o QR vê se você é membro, sem precisar de documento.</small></span></div>
   <div class="cci-r"><span class="cci-i">${ic('eyeOff',18,2)}</span><span><b>Mostra só o essencial</b><small>Aparecem apenas o seu nome e se a carteirinha está válida.</small></span></div>
   <div class="cci-r"><span class="cci-i warn">${ic('info',18,2)}</span><span><b>Quando deixa de valer</b><small>Se a sua situação mudar para <b>afastado</b>, <b>transferido</b>, <b>desligado</b> ou <b>falecido</b>. Ao voltar a Ativo, ela volta a valer.</small></span></div>
  </section>`);};
/* meus documentos: o que a secretaria emitiu para a pessoa (e certificados de curso). Só consulta e download; o app não edita nem gera nada */
const IG_FILA=5; /* pessoas já na fila da integração (igual ao protótipo web) */
const MYDOCS=[{t:'Certidão de batismo',n:'2026-0002',d:'2026-06-20',i:'bucket'},{t:'Declaração de membro',n:'2026-0014',d:'2026-08-04',i:'clipboard'},{t:'Certificado de apresentação',n:'2026-0008',d:'2026-09-06',i:'pacifier',who:'Lucas Pereira'},{t:'Certificado do curso Fundamentos da fé',d:'2026-07-12',i:'award',src:'Cursos'}];
V.documentos=()=>{
 if(S.role==='visitante')return sub('Meus documentos','Certidões, declarações e certificados emitidos para você.',`<p class="callout" style="margin:0">Quando você for membro, os documentos que a igreja emitir para você aparecem aqui, prontos para baixar.</p>`);
 return sub('Meus documentos','Certidões, declarações e certificados emitidos para você. É só baixar.',`
  <section class="stack g3"><div class="list">${MYDOCS.map((x,i)=>`<div class="item" style="cursor:default"><span class="avatar" style="${tone('ceu')}">${ic(x.i,18,1.8)}</span><span class="grow stack" style="gap:2px"><span class="it-title">${esc(x.t)}</span><span class="it-sub">${x.who?esc(x.who)+' · ':''}Emitido em ${x.d.split('-').reverse().join('/')}${x.n?' · nº '+x.n:''}</span></span><button type="button" class="btn outline sm" data-a="docDl" data-v="${i}" aria-label="Baixar PDF de ${esc(x.t)}">Baixar</button></div>`).join('')}</div></section>
  <p class="callout" style="margin:4px 0 0">Precisa de uma declaração de membro? Peça em Resolver agora: estando tudo em dia, ela sai na hora e aparece aqui. Outros documentos, como cartas, a secretaria emite. O app só mostra e baixa; não edita nem gera documentos.</p>
  <button class="btn outline block" data-a="sub" data-v="secretaria">Fale com a secretaria</button>`);};
V.privacidade=()=>sub('Privacidade e dados','Você controla o que a igreja vê e guarda sobre você (LGPD).',`
  <section class="stack g3"><p class="eb2">Minha imagem</p><div class="list">${[['fotos','Usar minha foto em divulgação','Fotos de eventos nas redes da igreja']].map(r=>`<div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">${r[1]}</span><span class="it-sub">${r[2]}</span></span><button type="button" class="switch" role="switch" aria-checked="${S.priv[r[0]]}" aria-label="${r[1]}" data-a="privSw" data-v="${r[0]}"></button></div>`).join('')}</div></section>
  <section class="stack g3"><p class="eb2">Seus dados</p><div class="list">
   <button class="item" data-a="dlData"><span class="grow stack" style="gap:2px"><span class="it-title">Pedir meus dados</span><span class="it-sub">Receba o link do arquivo por e-mail</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
   <button class="item" data-a="policy"><span class="grow stack" style="gap:2px"><span class="it-title">Política de privacidade</span><span class="it-sub">Atualizada em março de 2026</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
   <button class="item" data-a="delAcc"><span class="grow stack" style="gap:2px"><span class="it-title" style="color:var(--danger-text)">Excluir minha conta</span><span class="it-sub">Bloqueia a conta e apaga seus dados; sem volta</span></span><span class="chev">${ic('chevR',18,2)}</span></button>
  </div></section>`);

/* ---------- helpers ---------- */
function qrSVG(seed){let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;const rnd=()=>{h^=h<<13;h>>>=0;h^=h>>>17;h^=h<<5;h>>>=0;return h/4294967296;};const N=25;let r='';
 const fin=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="#010f12"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#010f12"/>`;
 const inF=(x,y)=>(x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16);
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(inF(x,y))continue;if(rnd()<.5)r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#010f12"/>`;}
 return `<svg viewBox="-2 -2 29 29" width="220" height="220" shape-rendering="crispEdges" role="img" aria-label="QR Code da inscrição"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/>${r}${fin(0,0)}${fin(18,0)}${fin(0,18)}</svg>`;}
async function copyText(t){try{await navigator.clipboard.writeText(t);toast('success','Copiado',t);}catch(_){toast('info','Não deu para copiar',t);}}
function playerSheet(v){sheet(`<div class="stack g4"><div class="player gr-${v.g}" id="player"><span class="ttl">${v.t}</span>${v.live?'<span class="livebadge" style="position:absolute;right:14px;top:14px"><i></i>Ao vivo</span>':''}<button class="pbtn" data-a="play" aria-label="Assistir">${ic('play',28,2.5)}</button><div class="pbar"><span id="pt">0:00</span><div class="bar"><i id="pp" style="width:0"></i></div><span>${v.live?'ao vivo':v.dur}</span></div></div>
 <div class="stack g2"><h3 class="t2">${v.t}</h3><p class="callout" style="margin:0">${v.live?v.n:v.s}</p></div><div class="row g2"><button class="btn secondary md grow" data-a="shareEv">Compartilhar</button><button class="btn secondary md grow" data-a="notesSoon">Anotações</button></div>${v.cid?`<button class="btn ${S.nxDone[v.cid]?'outline':'primary'} md block" id="doneBtn" data-a="nxDone" data-v="${v.cid}">${S.nxDone[v.cid]?'Concluído · desmarcar':'Marcar como concluído'}</button>`:''}${v.cm?cmtHtml(v.cm):''}</div>`);}

/* ---------- actions ---------- */
Object.assign(A,{
 /* integração lotada: ninguém é aceito além do limite; a pessoa entra na fila de espera da igreja (ordem de chegada) */
 wantMember:async(v,el)=>{
  if(S.igFila){toast('info','Você já está na fila','Você é o '+S.igFila+'º. Avisamos aqui quando a próxima integração abrir.');return;}
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">A integração está lotada</h3><p class="callout">As vagas desta integração acabaram. Entre na fila de espera: você é chamado(a) quando a próxima abrir, na ordem de chegada. Você seria o ${IG_FILA+1}º.</p></div><div class="stack g3"><button type="button" class="btn primary block" id="igQ">Entrar na fila de espera</button><button type="button" class="tlink" data-a="closeSheet">Agora não</button></div></div>`,sh=>{$('#igQ',sh).addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Na fila');S.igFila=IG_FILA+1;await closeSheet();softRender();toast('success','Você está na fila','Você é o '+S.igFila+'º. Avisamos aqui quando a próxima integração abrir.');});});},
 igLeave:()=>{S.igFila=null;softRender();toast('info','Você saiu da fila','Dá para entrar de novo quando quiser.');},
 sub:v=>{ensureChurch();if(v==='cuidado'&&S.role!=='visitante'){S.ag.tab='Acompanhamento';A.tab('agenda');return;}go(v);},
 give:()=>{ensureChurch();go('contribuir');},prayer:()=>{ensureChurch();go('oracao');},whats:()=>go('assistente'),
 inscr:()=>go('inscricoes'),
 meEdit:()=>{S.meEdit=true;softRender();},meCancel:()=>{S.meEdit=false;softRender();},
  meTab:v=>{S.meTab=v;softRender();},
  meOpt:(v,el)=>{const [id,o]=v.split('|');$('#'+id).value=o;$$('button',el.parentElement).forEach(b=>{const on=b===el;b.setAttribute('aria-pressed',on);b.setAttribute('aria-checked',on);});
  if(id==='mPais'){const lb=$('#f-mUf label'),ip=$('#mUf');if(lb)lb.textContent=ME_DIV[o]||'Estado';if(ip){ip.maxLength=o==='Brasil'?2:40;ip.value='';}}},
  famOpen:v=>{const p=S.me.fam.find(x=>x.id===v);if(!p)return;sheet(`<div class="stack g5"><div class="row g4">${pavM(p.n,p.tone||'ceu','lg')}<div class="stack" style="gap:4px"><h3 class="t2">${esc(p.n)}</h3><span class="foot">${esc(p.rel)}${p.age?' · '+esc(p.age):''}</span></div></div>
   <div class="kv">${meRow('Parentesco',p.rel)}${meRow('No app',p.kids?'Pelo seu cadastro (Kids)':p.rem?'Remoção em análise':p.pend?'Em análise':p.app?'Sim, tem conta própria':'Ainda não')}${p.kids?meRow('Check-in Kids','Você é responsável'):''}</div>
   ${!p.app&&!p.kids&&!p.pend?`<button class="btn primary block" data-a="famInvite" data-v="${p.id}">Convidar para o app</button>`:''}
   ${p.rem?'':`<button class="btn outline block" data-a="famDel" data-v="${p.id}">Pedir remoção do vínculo</button>`}</div>`);},
  famInvite:async(v,el)=>{await busy(el,800,null,'Convite enviado');closeSheet();toast('success','Convite enviado',S.me.fam.find(x=>x.id===v).n.split(' ')[0]+' recebe um link para baixar o app.');},
  famDel:v=>{const p=S.me.fam.find(x=>x.id===v);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pedir remoção do vínculo com ${esc(p.n.split(' ')[0])}?</h3><p class="body">O vínculo continua até o pedido ser analisado.</p></div><div class="stack g3"><button class="btn dangerfill block" data-a="famDelOk" data-v="${p.id}">Pedir remoção do vínculo</button><button class="btn outline block" data-a="closeSheet">Manter vínculo</button></div></div>`);},
  famDelOk:async(v,el)=>{await busy(el,700,null,'Pedido enviado');const p=S.me.fam.find(x=>x.id===v);p.rem=true;closeSheet();softRender();toast('success','Pedido enviado','Avisamos quando o pedido for analisado.');},
  famAdd:()=>{sheet(`<form class="stack g5" data-submit="famReq" novalidate><div class="stack g2"><h3 class="t2">Pedir vínculo de familiar</h3><p class="body">Informe os dados do familiar. Seu pedido será analisado e o vínculo aparece aqui quando for aprovado.</p></div>
   ${field({id:'fNome',label:'Nome completo',ac:'off'})}
   <div class="stack g2" id="f-fRel"><span class="eb2">Parentesco</span><div class="chips2" role="radiogroup" aria-label="Parentesco">${['Cônjuge','Filho(a)','Pai','Mãe','Irmão(ã)','Outro'].map((o,i)=>`<button type="button" class="chip" role="radio" aria-pressed="${!i}" aria-checked="${!i}" data-a="meOpt" data-v="fRel|${o}">${o}</button>`).join('')}</div><input type="hidden" id="fRel" value="Cônjuge"></div>
   ${field({id:'fNasc',label:'Data de nascimento',ph:'dd/mm/aaaa',im:'numeric',max:10,hint:'Para filhos, libera o check-in no Kids.'})}
   <div class="stack g3"><button class="btn primary block" type="submit">Enviar pedido</button><button type="button" class="tlink" data-a="closeSheet">Cancelar</button></div></form>`);},

 readAll:()=>{S.notifs.forEach(n=>n.unread=false);softRender();toast('success','Tudo lido','');},
 delRead:()=>{S.notifs=S.notifs.filter(n=>n.unread);softRender();toast('success','Notificações lidas apagadas','');},
 openNotif:v=>{const n=S.notifs.find(x=>x.id===v);n.unread=false;if(n.go==='escalas'){S.ag.tab='Escalas';A.tab('agenda');}else if(n.go){go(n.go);}else softRender();},
 urg:v=>{S.care.urg=v;const t=$('#cText');const keep=t?t.value:'';softRender();$('#cText').value=keep;},
 careOk:async(v,el)=>{await busy(el,600,null,'Confirmado');S.care.next.st='aceito';softRender();toast('success','Encontro confirmado',S.care.next.who+' recebeu sua confirmação.');},
 careNo:()=>{const nx=S.care.next;reasonSheet({title:'Recusar encontro',callout:esc(nx.who)+' · '+nx.when,ph:'Ex.: nesse horário não consigo; posso na próxima semana',btn:'Recusar',who:nx.who.replace(/^\w+\.\s/,'').split(' ')[0],done:'Recusado',ms:600,run:async why=>{nx.st='recusado';nx.why=why;await closeSheet();softRender();toast('info','Encontro recusado','O pastor vai propor outro horário.');}});},
 giveDest:v=>{S.give.dest=v;softRender();},
 giveAmt:v=>{if(v==='outro'){S.give.other=true;S.give.amt=null;softRender();setTimeout(()=>$('#gOther').focus(),50);}else{S.give.other=false;S.give.amt=+v;softRender();}},
 giveGo:async(v,el)=>{const g=S.give;if(g.other&&(!g.amt||g.amt<1)){setErr('gOther','Informe um valor a partir de R$ 1,00.');return;}if(g.amt>5000){setErr('gOther','Acima de R$ 5.000, fale com a tesouraria.');return;}
  await busy(el,900,null,'Abrindo');const dest=S.camps.find(c=>c.id===g.dest).t,rec={v:g.amt,dest,d:'29/09/2026',st:'wait',n:null,cancel:true};
  g.hist.unshift(rec);g.amt=null;g.other=false;softRender();toast('info','Aguardando pagamento','O pagamento abriu no navegador. Assim que cair, sua contribuição confirma.');
  setTimeout(()=>{if(rec.st!=='wait')return;rec.st='ok';rec.n=String(412+g.hist.length).padStart(4,'0');const c=S.camps.find(c=>c.t===dest);if(c&&c.goal)c.got+=rec.v;if(S.screen==='contribuir')softRender();toast('success','Contribuição confirmada',brl(rec.v)+' para '+dest+'. O recibo foi enviado por e-mail.');},3500);},
 giveCancel:v=>{const h=S.give.hist[+v];sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Cancelar esta contribuição?</h3><p class="callout">${brl(h.v)} para ${h.dest}. ${h.st==='wait'?'O pagamento ainda não foi feito, então nada é cobrado.':'O valor volta pelo mesmo meio de pagamento. A taxa do provedor não volta.'}</p></div><div class="stack g3"><button class="btn primary block" id="giveYes">Cancelar contribuição</button><button class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#giveYes',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Cancelada');await closeSheet();const wasOk=h.st==='ok';h.st='refunded';if(wasOk){const c=S.camps.find(c=>c.t===h.dest);if(c&&c.goal)c.got-=h.v;}softRender();toast('info','Contribuição cancelada',wasOk?'O valor volta pelo mesmo meio de pagamento.':'Nada foi cobrado.');});});},
 giveRecibo:v=>{const h=S.give.hist[+v];toast('success','Recibo nº '+h.n,'Enviamos o recibo para '+S.me.email+'.');},
 giveOpenFixed:()=>toast('info','Abrindo o pagamento','O link abre no navegador do celular. Como a doação é anônima, não há recibo.'),
 informe:()=>toast('success','Informe de contribuições 2025','Enviamos o PDF para '+S.me.email+'.'),
 copy:v=>copyText(v),
 inscrever:async(v,el)=>{const e=S.insc.open.find(x=>x.id===v);if(!e.price){await busy(el,700,null,'Inscrito');S.insc.mine.push({id:v,st:'ok',method:'-'});softRender();toast('success','Inscrição confirmada','Seu QR Code está em Minhas inscrições.');return;}
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${e.t}</h3><p class="callout">${e.when} · ${brl(e.price)}</p></div><div class="stack g2"><span class="eb2">Pagamento</span><div class="seg" id="iPay">${['Pix','Cartão'].map((m,i)=>`<button type="button" aria-selected="${!i}" data-v="${m}">${m}</button>`).join('')}</div></div><p class="foot" style="margin:0">Sua vaga fica reservada por 30 minutos.</p><button class="btn primary block split" id="iGo"><span>Pagar</span><span class="meta">${brl(e.price)}</span></button></div>`);
  let m='Pix';$('#iPay').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;m=b.dataset.v;$$('#iPay button').forEach(x=>x.setAttribute('aria-selected',x===b));});
  $('#iGo').addEventListener('click',async ev=>{await busy(ev.currentTarget,900,null,'Reservado');const rec={id:v,st:'wait',method:m};S.insc.mine.push(rec);await closeSheet();softRender();toast('info','Aguardando pagamento','Assim que o '+m+' cair, sua inscrição confirma.');
   setTimeout(()=>{rec.st='ok';if(S.screen==='inscricoes')softRender();toast('success','Pagamento confirmado','Inscrição em '+e.t+' garantida.');},3500);});},
 showQR:v=>{const e=S.insc.open.find(x=>x.id===v);sheet(`<div class="stack g5" style="align-items:center;text-align:center"><div class="stack g2"><h3 class="t2">${e.t}</h3><p class="callout" style="margin:0">${e.when} · ${esc(S.user.name)}</p></div><div class="qr">${qrSVG(v+S.user.name)}</div><p class="mask" style="margin:0">ALVA-${v.toUpperCase()}-${initials(S.user.name)}0929</p><p class="foot" style="margin:0">Mostre este código na entrada. Funciona sem internet.</p></div>`);},
 watch:v=>playerSheet(VIDEOS.find(x=>x.id===v)),
 notesSoon:()=>toast('info','Anotações','Em breve você poderá anotar durante a pregação.'),
 tkToggle:v=>{S.tkOpen=S.tkOpen===v?null:v;softRender();},
 minToggle:v=>{S.minOpen=S.minOpen===v?null:v;softRender();},
 minAgenda:()=>{S.ag.tab='Escalas';A.tab('agenda');},
 answered:(v)=>{const p=S.prayers.find(x=>x.id===v);p.st='respondido';softRender();toast('success','Que alegria!','Vamos agradecer junto com você no próximo culto.');},
 social:v=>toast('info','Abrindo '+v,'No app real, abre o perfil da igreja no '+v+'.'),
 whatsSec:()=>toast('info','Abrindo o WhatsApp','Conversa com a secretaria da '+S.church.name+'.'),
 decReq:()=>{const dd=String(TODAY.d).padStart(2,'0'),mm=String(TODAY.m).padStart(2,'0');if(S.role==='lider'){/* demo: quem não é elegível não recebe na hora; a secretaria analisa */S.decReq={d:dd+'/'+mm,wait:true};softRender();toast('info','Pedido enviado','A secretaria vai analisar e avisar você.');return;}S.decReq={d:dd+'/'+mm};MYDOCS.push({t:'Declaração de membro',n:'2026-0051',d:TODAY.y+'-'+mm+'-'+dd,i:'clipboard'});softRender();toast('success','Declaração emitida','Já está em Meus documentos, pronta para baixar.');},
 decCancel:()=>{S.decReq=null;softRender();toast('info','Pedido cancelado','Você pode pedir de novo quando quiser.');},
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
 async saveMe(f){let ok=true;const n=val('mNome'),e=val('mEmail'),t=val('mTel'),d=val('mNasc'),pais=val('mPais')||'Brasil',cep=val('mCep'),uf=pais==='Brasil'?val('mUf').toUpperCase():val('mUf');
  if(n.split(' ').filter(Boolean).length<2){setErr('mNome','Informe nome e sobrenome.');ok=false;}
  if(!EMAIL_RE.test(e)){setErr('mEmail','Esse e-mail parece incompleto. Ex.: nome@email.com');ok=false;}
  if(t.replace(/\D/g,'').length<10){setErr('mTel','Use DDD + número.');ok=false;}
  if(d){const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);const dt=m&&new Date(+m[3],+m[2]-1,+m[1]);if(!m||dt.getDate()!==+m[1]||dt>new Date(2026,8,29)||+m[3]<1900){setErr('mNasc','Data inválida. Use dd/mm/aaaa.');ok=false;}}
  if(pais==='Brasil'&&cep&&cep.replace(/\D/g,'').length!==8){setErr('mCep','O CEP tem 8 números.');ok=false;}
  if(pais==='Brasil'&&uf&&!/^[A-Z]{2}$/.test(uf)){setErr('mUf','Use a sigla, ex.: SP');ok=false;}
  if(!ok){const x=$('.field.invalid');x&&x.scrollIntoView({block:'center',behavior:'smooth'});return;}
  await busy($('button[type=submit]',f),900,null,'Salvo');Object.assign(S.me,{nome:n,email:e,tel:t,nasc:d,gen:val('mGen'),civil:val('mCivil'),pais,cep,rua:val('mRua'),num:val('mNum'),comp:val('mComp'),bairro:val('mBairro'),cid:val('mCid'),uf,upd:'29/09/2026'});S.me.end=ME_ADDR(S.me);S.user={first:n.split(' ')[0],name:n};S.meEdit=false;softRender();toast('success','Dados atualizados','');},
 async famReq(f){const n=val('fNome'),r=val('fRel'),d=val('fNasc');let ok=true;
  if(n.split(' ').filter(Boolean).length<2){setErr('fNome','Informe nome e sobrenome.');ok=false;}
  if(d){const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);const dt=m&&new Date(+m[3],+m[2]-1,+m[1]);if(!m||dt.getDate()!==+m[1]||dt>new Date(2026,8,29)){setErr('fNasc','Data inválida. Use dd/mm/aaaa.');ok=false;}}
  if(!ok)return;await busy($('button[type=submit]',f),900,null,'Enviado');const g=r==='Cônjuge'?'sp':r==='Filho(a)'?'kid':r==='Pai'||r==='Mãe'?'par':'oth';
  S.me.fam.push({id:'f'+Date.now(),n,rel:r,g,pend:true,tone:['ceu','menta','damasco','lima','salvia'][S.me.fam.length%5]});closeSheet();S.meTab='familia';softRender();toast('success','Pedido enviado','Avisamos quando o pedido for analisado.');},
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
 if(e==='giovanna.martins@email.com'&&!S.give.hist.length)S.give.hist.push({v:350,dest:'Contribuição livre',m:'Pix',d:'05/09/2026',st:'ok',n:'0398'},{v:350,dest:'Contribuição livre',m:'Pix',d:'05/08/2026',st:'ok',n:'0371'},{v:120,dest:'Retiro de Jovens 2026',m:'Cartão',d:'20/07/2026',st:'ok',n:'0342'});
 if(S.user&&S.user.name)S.me.nome=S.user.name;};
RAIL.push(...[['carteirinha','Mais › Você › Carteirinha de membro'],['documentos','Mais › Meus documentos'],['meusDados','Mais › Meus dados'],['notifs','Mais › Notificações'],['quemSomos','Mais › Quem somos'],['cuidado','Agenda › Acompanhamento'],['contribuir','Mais › Contribuir'],['inscricoes','Mais › Inscrições'],['aoVivo','Mais › Ao vivo'],['meusMin','Mais › Meus ministérios'],['meusEmp','Mais › Meus empréstimos'],['tarefas','Mais › Minhas tarefas'],['oracao','Mais › Pedidos de oração'],['secretaria','Mais › Secretaria'],['assistente','Mais › Assistente'],['privacidade','Mais › Privacidade']]);
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');

