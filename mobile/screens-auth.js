/* ---------- AUTH (v2: text-first flow) ---------- */
const maskEmail=e=>{const [u,d]=(e||'rafael@email.com').split('@');return u[0]+'***@'+(d||'email.com');};
const REC=[{n:'R*** P***',r:'Responsável familiar',t:'damasco',ph:'(11) 9****-**78'},{n:'R*** P***',r:'Cônjuge',t:'rosado',ph:'(11) 9****-**41'},{n:'R*** P*** J***',r:'Dependente',t:'ceu',ph:'(11) 9****-**03'}];
function topbar(pct,noBack){return `<div class="topbar"><div class="tb">${noBack?'<span></span>':`<button class="iconbtn" data-a="back" aria-label="Voltar">${ic('chevL',20,2.25)}</button>`}<span class="wm">${logo(22,false,"sm")}</span><span></span></div><div class="prog" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>`;}
function flow(o){const inner=`${topbar(o.pct,o.noBack)}<div class="fbody">${o.body}</div>${o.dock?`<div class="dock">${o.dock}</div>`:''}`;return o.form?`<form class="flow" data-submit="${o.form}" novalidate>${inner}</form>`:`<div class="flow">${inner}</div>`;}
const head=(eb,title,lede)=>`<div>${eb?`<p class="eb2" style="margin-bottom:10px">${eb}</p>`:''}<h1 class="big">${title.replace(/e-mail/g,'e\u2011mail')}</h1>${lede?`<p class="lede">${lede}</p>`:''}</div>`;
function bigField(o){return `<div class="bigin" id="f-${o.id}">${o.label?`<label class="eb2" for="${o.id}">${o.label}</label>`:''}<div class="bigwrap"><input id="${o.id}" type="${o.type||'text'}" placeholder="${esc(o.ph||'')}" value="${esc(o.val||'')}" ${o.ac?`autocomplete="${o.ac}"`:''} ${o.im?`inputmode="${o.im}"`:''} ${o.max?`maxlength="${o.max}"`:''} aria-label="${esc(o.label||o.ph||'')}">${o.reveal?`<button type="button" class="eyebtn" data-a="reveal" data-v="${o.id}" aria-label="Mostrar senha" aria-pressed="false">${ic('eye',22,1.75)}</button>`:''}</div><span class="hint" data-hint="${esc(o.hint||'')}">${esc(o.hint||'')}</span></div>`;}
const privacy=`<p class="privacy">${ic('lock',16,1.75)}<span>Usamos esse dado apenas para localizar seu cadastro. Nada é alterado nesta etapa.</span></p>`;

const IDENTITY_TERMS=[{id:'alva',source:'Alva',title:'Termos de uso e privacidade',version:'2.0',required:true},{id:'product',source:'Assinaturas',title:'Termos do produto Alva',version:'1.1',required:true},{id:'news',source:'Assinaturas',title:'Receber novidades do produto',version:'1.0',required:false}];
function mobileTermsList(accept=true){return `<div class="stack g4" id="sTerms">${[true,false].map(required=>`<div class="stack g3"><h3 class="t3">${required?'Obrigatórios':'Opcionais'}</h3>${IDENTITY_TERMS.filter(d=>d.required===required).map(d=>`<div class="stack g2"><div class="row between g3"><span class="callout">${d.title}<small class="foot" style="display:block">${d.source} · versão ${d.version}</small></span>${accept?`<button type="button" class="switch" role="switch" aria-checked="false" aria-label="Aceitar ${d.title}" data-a="identityTerm" data-required="${d.required}"></button>`:''}</div><a class="link" href="/terms-demo.html#${d.id}" target="_blank" rel="noopener">Ler documento</a></div>`).join('')}</div>`).join('')}<span class="hint"></span></div>`;}
const mobileTermsAccepted=()=>$$('#sTerms [data-required="true"]').every(b=>b.getAttribute('aria-checked')==='true');
V.welcome=()=>({sb:'var(--ink)',amb:'welcome',html:`<div class="wel">
  <header class="wel-brand">
   <h1 class="wel-logo" aria-label="alva"><span class="lw">alva</span></h1>
   <p class="wel-line" aria-label="Sua comunidade, ao alcance de cada momento.">${'Sua comunidade,|ao alcance de|<em>cada momento</em>.'.split('|').map((w,i)=>`<span class="wl" style="--w:${i}">${w}</span>`).join(' ')}</p>
  </header>
  <div class="wel-actions">
   <button class="wbtn glow" data-a="go" data-v="login"><span class="wb-in">${ic('key',19,2)}Entrar com senha</span></button>
   <button class="wbtn sec" data-a="go" data-v="codeEmail"><span class="wb-in">${ic('mail',19,2)}Entrar com código por e-mail</span></button>
   <button class="wbtn sec" data-a="startSignup"><span class="wb-in">${ic('userplus',19,2)}Criar conta</span></button>
  </div>
  <p class="wel-legal"><button class="link" data-a="identityDocuments">Consultar termos e privacidade</button></p>
 </div>`});
V.terms=()=>({sb:'var(--ink)',html:flow({pct:90,body:`${head('','Aceitar termos','Há uma nova versão dos documentos. Confira antes de continuar.')}${mobileTermsList()}<p class="callout" id="identityRefusal" hidden>Sem aceitar os obrigatórios, o acesso permanece bloqueado. Reveja sua escolha ou saia.</p>`,dock:`<button class="btn primary block" id="identityAccept" data-a="identityAccept" disabled>Aceitar e continuar</button><button class="tlink" data-a="identityRefuse">Recusar obrigatórios</button><button class="tlink" data-a="identityExit">Sair</button>`})});
V.login=()=>({sb:'var(--ink)',html:flow({pct:50,form:'login',
 body:`${head('Entrar com senha','Bem-vindo de volta','Acesse sua conta da igreja.')}
  <div class="stack g4">${bigField({id:'lEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:S.email,ac:'email',im:'email'})}
  ${bigField({id:'lPass',label:'Senha',type:'password',ph:'Sua senha',ac:'current-password',reveal:true})}
  <div class="row" style="margin-top:-6px;justify-content:flex-end"><button type="button" class="link" data-a="forgot">Esqueci minha senha</button></div></div>`,
 dock:`<button class="btn primary block" type="submit">Entrar</button><button type="button" class="tlink" data-a="go" data-v="codeEmail">Prefiro receber um código</button>`})});

V.codeEmail=()=>({sb:'var(--ink)',html:flow({pct:35,form:'sendCode',
 body:`${head('Entrar com código','Qual é o seu e-mail?','Enviamos 6 dígitos para ele. Sem senha para lembrar.')}${bigField({id:'cEmail',type:'email',ph:'seu@email.com',val:S.email,ac:'email',im:'email',hint:'O mesmo e-mail que você usa na igreja'})}`,
 dock:`<button class="btn primary block" type="submit">Enviar código</button>`})});

V.otp=()=>{const su=S.otpCtx==='signup';const dest=su?maskEmail(S.su.email):S.email||'seu@email.com';return{sb:'var(--ink)',html:flow({pct:su?80:70,
 body:`${head('','Digite o código',`Enviamos 6 dígitos para <span class="mask">${esc(dest)}</span>`)}
  <div class="stack g3"><div class="otpu" id="otp" role="group" aria-label="Código de 6 dígitos">${[0,1,2,3,4,5].map(i=>`<input inputmode="numeric" autocomplete="${i?'off':'one-time-code'}" maxlength="1" aria-label="Dígito ${i+1}" data-i="${i}">`).join('')}</div>
  <div class="otpmeta"><span id="otpExp">expira em 15:00</span><span id="otpAtt">Tentativas: ${S.su.att} de 5</span></div>
  <div class="otpmsg" id="otpMsg" role="alert"></div></div>`,
 dock:`<div class="nochg"><b>Não chegou?</b><p>Verifique a caixa de spam. O remetente é <span class="mask">nao-responda@alva.app</span>.</p><button type="button" class="tlink" id="resend" data-a="resend" disabled>Reenviar em 1:00</button></div>`})};};

V.signupStart=()=>({sb:'var(--ink)',html:flow({pct:12,
 body:`${head('','Já tem um cadastro conosco?','Nos ajude a encontrá-lo. Se acharmos, seus dados vêm preenchidos e você só revisa.')}
  <div class="stack g3">
   <button class="selcard" data-a="pickLookup" data-v="email" aria-pressed="false">${ic('mail',28,1.5)}<span><b>Tenho um e-mail cadastrado</b><small>Caminho mais curto: o código chega nele.</small></span></button>
   <button class="selcard" data-a="pickLookup" data-v="phone" aria-pressed="false">${ic('phone',28,1.5)}<span><b>Tenho um telefone cadastrado</b><small>Se você não lembra qual e-mail usou.</small></span></button>
  </div>
  <div class="or">OU</div>
  <div class="dashed"><div><b>É o meu primeiro cadastro</b><p class="callout" style="margin:4px 0 0">Fazemos seu cadastro do zero. Leva cerca de 3 minutos.</p></div><button class="btn outline block md" data-a="newSignup">Criar novo cadastro</button></div>`})});

V.lookup=()=>{const ph=S.lookupMode==='phone';return{sb:'var(--ink)',html:flow({pct:30,form:'doLookup',
 body:`${head(ph?'Identificação por telefone':'Identificação por e-mail',ph?'Qual é o seu telefone?':'Qual é o seu e-mail?',ph?'Digite o número que você informou quando se cadastrou. O código de verificação chega por e-mail.':'Digite o e-mail que você informou quando se cadastrou. É só para localizar; nada é enviado agora.')}
  ${ph?bigField({id:'lkPhone',type:'tel',ph:'(11) 91234-5678',ac:'tel',im:'tel',max:15,hint:'Celular ou fixo, com DDD'}):bigField({id:'lkEmail',type:'email',ph:'seu@email.com',ac:'email',im:'email',hint:'Se tiver mais de um, comece pelo pessoal'})}
  <div id="lkRes"></div>`,
 dock:`${privacy}<button class="btn primary block" type="submit">Continuar</button>`})};};
const notFoundPanel=()=>{const ph=S.lookupMode==='phone';return `<div class="panel"><div class="ph"><span class="bang">!</span><div><b>Não encontramos ${ph?'esse telefone':'esse e-mail'}</b><p>Confira os dados e tente de novo, ou escolha outra forma de validação.</p></div></div><div class="stack g2"><button type="button" class="btn outline block md" data-a="lookupSwap">${ph?'Tentar por e-mail':'Tentar por telefone'}</button><button type="button" class="btn inverse block md" data-a="newSignup">Criar novo cadastro</button></div></div>`;};

V.pickRecord=()=>({sb:'var(--ink)',html:flow({pct:45,
 body:`${head('','Qual cadastro é o seu?',`Encontramos ${REC.length} cadastros com ${S.lookupMode==='phone'?'este telefone':'este e-mail'}. Alguns dados ficam ocultos por segurança.`)}
  <div class="stack g3" role="radiogroup" aria-label="Cadastros encontrados">${REC.map((r,i)=>`<button class="rec" role="radio" aria-checked="${S.su.sel===i}" data-a="pickRec" data-v="${i}"><span class="grow"><span class="l1"><span class="mask">${r.n}</span>${tag(r.t,r.r,true)}</span><span class="l2 stack"><span>${esc(S.lookupMode==='email'?S.su.email:maskEmail(S.su.email))}</span></span><span class="l3 mask" style="color:var(--ink-muted)">${r.ph}</span></span><span class="radio">${S.su.sel===i?ic('check',14,3):''}</span></button>`).join('')}</div>`,
 dock:`<button class="btn primary block" data-a="confirmRec">Confirmar seleção</button>`})});

V.confirmEmail=()=>{const r=REC[S.su.sel];return{sb:'var(--ink)',html:flow({pct:60,
 body:`${head('','Confirmar o e-mail do código',`Enviaremos um código de 6 dígitos para o e-mail do cadastro de <span class="mask">${r.n}</span>.`)}
  <div class="idcard"><span class="mk">${ic('mail',24,1.75)}</span><div><div class="v mask" style="font-size:19px">${esc(maskEmail(S.su.email))}</div><small>E-mail do cadastro encontrado</small></div></div>
  <div><p class="eb2" style="margin-bottom:10px">O que acontece agora</p><ol class="steps"><li>Você recebe um e-mail com o código, válido por 15 minutos.</li><li>Digita o código aqui para confirmarmos que o cadastro é seu.</li><li>Seus dados aparecem preenchidos para revisão. Nada é enviado antes disso.</li></ol></div>`,
 dock:`<button class="btn primary block" data-a="sendSignupCode">Enviar código</button><button class="tlink" data-a="back">Não é esse e-mail? Voltar</button>`})};};

V.noEmail=()=>({sb:'var(--ink)',html:flow({pct:60,
 body:`${head('','Cadastro sem e-mail','Encontramos o cadastro de <span class="mask">N*** M***</span>, mas não temos como confirmar que ele é seu.')}
  <div class="panel"><div class="ph"><span class="bang">!</span><div><b>Nenhum e-mail registrado</b><p>O código de confirmação vai só para o e-mail do cadastro, e esse cadastro não tem um.</p></div></div></div>
  <div><p class="eb2" style="margin-bottom:10px">O que você pode fazer</p><ol class="steps"><li>Criar um novo cadastro. Leva cerca de 3 minutos.</li><li>Voltar e buscar por outro telefone ou e-mail que você tenha usado.</li><li>Pedir à secretaria para incluir seu e-mail no cadastro atual.</li></ol></div>`,
 dock:`<button class="btn primary block" data-a="newSignup">Criar novo cadastro</button><button class="tlink" data-a="back">Voltar</button>`})});

V.identity=()=>{const r=REC[S.su.sel];return{sb:'var(--ink)',html:flow({pct:100,noBack:true,
 body:`<div class="okmark">${ic('check',28,2.75)}</div>
  ${head('','Identidade confirmada',`Bem-vindo, <span class="mask">${r.n}</span>. Carregamos o que já temos; você revisa e ajusta na próxima etapa.`)}
  <div class="kv"><div class="kh"><span>Dados encontrados</span><span>16 campos</span></div>
   <div class="kr"><span>Nome</span><span class="mask">${r.n}</span></div>
   <div class="kr"><span>E-mail</span><span class="mask">${esc(maskEmail(S.su.email))}</span></div>
   <div class="kr"><span>Telefone</span><span class="mask">${r.ph}</span></div>
   <div class="kr"><span>Nascimento</span><span>25/08/1992</span></div>
   <div class="kr stack2"><span>Endereço</span><span>Rua das A***, 1**<br><span style="font-weight:400;color:var(--ink-muted)">Jardins · São Paulo/SP</span></span></div></div>
  <div class="kv"><div class="kh" style="align-items:center"><span style="color:var(--ink);font-size:13px;letter-spacing:0;text-transform:none;font-weight:700">Família</span>${tag('menta','2 vínculos',true)}</div>
   <div class="kr"><span class="mask" style="color:var(--ink)">C*** P***</span><span style="font-weight:400;color:var(--ink-muted)">Cônjuge</span></div>
   <div class="kr"><span class="mask" style="color:var(--ink)">L*** P***</span><span style="font-weight:400;color:var(--ink-muted)">Filha · 9 anos</span></div></div>`,
 dock:`<button class="btn primary block" data-a="toIntegration">Prosseguir para integração</button><button class="tlink" data-a="restart">Não é você? Recomeçar</button>`})};};

V.signupForm=()=>{const p=S.prefill||{};return{sb:'var(--ink)',html:flow({pct:p.found?100:50,form:'createAccount',noBack:!!p.found,
 body:`${head(p.found?'Integração · última etapa':'Novo cadastro',p.found?'Crie seu acesso':'Criar conta',p.found?'Confira nome e e-mail e defina uma senha. Família e endereço já estão com a gente.':'Só o essencial agora. Família e endereço você completa depois.')}
  <div class="stack g4">
  <div class="row g3" style="align-items:flex-start"><div class="grow">${field({id:'sNome',label:'Nome',ph:'Seu nome',val:p.nome||'',ac:'given-name'})}</div><div class="grow">${field({id:'sSobre',label:'Sobrenome',ph:'Seu sobrenome',val:p.sobre||'',ac:'family-name'})}</div></div>
  ${field({id:'sEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:p.email||'',ac:'email',im:'email'})}
  ${field({id:'sPhone',label:'Celular',type:'tel',ph:'(11) 91234-5678',ac:'tel',im:'tel',max:15,hint:'Com DDD. É por ele que o Alva reconhece você.'})}
  ${field({id:'sPass',label:'Senha',type:'password',ph:'Crie uma senha',ac:'new-password',reveal:true,hint:'Mínimo de 8 caracteres, com letras e números.'})}
  <div class="stack g2"><div class="bar" aria-hidden="true"><i id="pwBar" style="width:0"></i></div><span class="foot" id="pwTxt">Força da senha</span></div>
  <div class="field" id="f-sTerms">${mobileTermsList()}</div>
  </div>`,
 dock:`<button class="btn primary block" type="submit" id="identityCreate" disabled>Criar conta</button>`})};};

const CH_META={sede:{g:'aurora',next:'Dom · 18h30',last:true,short:'Sede'},alpha:{g:'mar',next:'Dom · 10h',short:'Alphaville'},camp:{g:'lima',next:'Sáb · 19h30',short:'Campinas'}};
V.church=()=>({sb:'var(--ink)',html:`${appHead(`<div class="row g4">${pavM(S.user.name,'ceu','lg')}<h1 class="big" style="margin:0">Olá, ${esc(S.user.first)}</h1></div>`)}
 <div class="pad stack g6">
  <div class="stack g2"><h2 class="t2">Escolha a igreja</h2><p class="body">Você tem acesso a ${CHURCHES.length} igrejas. Dá para trocar depois em Mais.</p></div>
  <div class="chlist">${CHURCHES.map(c=>{const m=CH_META[c.id];return `<button class="chrow" data-a="pickChurch" data-v="${c.id}"><span class="chdot" style="background:${MK[c.tone==='ceu'?'oceano':c.tone]}"></span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${m.short}</span>${m.last?'<span class="chl">Último acesso</span>':''}</span><span class="chm">${c.city} · ${c.members} membros</span></span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`;}).join('')}</div>
  <button class="tlink" data-a="cancelChurch">Cancelar e sair</button>
 </div>`});

