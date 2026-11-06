/* ---------- rail ---------- */
const RAIL=[['welcome','Boas-vindas'],['terms','Aceitar novos termos'],['login','Entrar com senha'],['loginBlocked','Bloqueio (demo)'],['resetPassword','Nova senha'],['resetDone','Senha redefinida'],['codeEmail','Entrar com código'],['otp','Digite o código'],['signupStart','Já tem cadastro?'],['lookup','Identificação'],['pickRecord','Qual cadastro é o seu?'],['confirmEmail','Confirmar e-mail'],['noEmail','Cadastro sem e-mail'],['identity','Identidade confirmada'],['signupForm','Criar conta'],['church','Escolher igreja'],['home','Início'],['agenda','Agenda'],['grupos','Grupos'],['cursos','Cursos'],['curso','Aula do curso'],['cursoDone','Curso concluído'],['mais','Mais']];
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
const SIGN=['lookup','pickRecord','confirmEmail','noEmail','identity'];
$('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const s=b.dataset.s;$('#overlay').innerHTML='';
 if(APP.includes(s)||s==='cursoDone')ensureChurch();
 if(!S.su.email)S.su.email='rafael.pereira@hotmail.com';
 if(s==='otp'){S.otpCtx='login';S.email=S.email||'rafael.pereira@hotmail.com';S.su.att=5;S.su.expAt=Date.now()+15*60000;}
 if(s==='signupForm')S.prefill=null;
 if(s==='curso'){S.cu.open='fund';S.cu.view=null;if(COURSES.fund.done===12)COURSES.fund.done=9;}
 if(s==='cursoDone'){COURSES.fund.done=12;S.cu.open='fund';S.cu.view=null;S.hist=['cursos'];S.screen='curso';render();return;}
 S.hist=APP.includes(s)?(s==='curso'?['cursos']:SUBS.includes(s)?['mais']:[]):s==='welcome'?[]:SIGN.includes(s)?['welcome','signupStart']:['welcome'];S.screen=s;render();});
$('#scnSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.scn=b.dataset.v;$$('#scnSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('#demoUsers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.email=b.dataset.v;S.hist=['welcome'];S.screen='login';$('#overlay').innerHTML='';render();setTimeout(()=>{const p=$('#lPass');if(p)p.value='alva2026';},0);toast('info','Perfil de demonstração','Toque em Entrar para continuar.');});
$('#roleSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.role=b.dataset.v;setTimeout(roleApply,0);$$('#roleSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));const t=$('#roleTag');if(t){const r=ROLES[S.role];t.textContent=r[0];t.setAttribute('style',tone(r[1]));}});
function roleSync(){$$('#roleSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===S.role));}
function railSync(){roleSync();const cur=S.screen==='curso'&&COURSES[S.cu.open].done===COURSES[S.cu.open].lessons.length&&S.cu.open==='fund'&&S.cu.view==null?'cursoDone':S.screen;$$('#railNav button').forEach(b=>b.setAttribute('aria-current',b.dataset.s===cur));}
$('#modeSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;phone.classList.remove('m-aurora','m-float');if(b.dataset.m)phone.classList.add(b.dataset.m);$$('#modeSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('#themeSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.theme=b.dataset.t;phone.classList.toggle('dia',S.theme==='dia');$$('#themeSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));try{localStorage.setItem('alva-theme',S.theme)}catch(_){}});
try{const t=localStorage.getItem('alva-theme');if(t==='dia'){S.theme='dia';phone.classList.add('dia');$$('#themeSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t==='dia'));}}catch(_){}

