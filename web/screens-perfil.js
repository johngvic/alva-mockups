/* ================= Meu perfil ================= */
const ME={n:'Rafael Pereira',first:'Rafael',email:'rafael.pereira@alvaigreja.com.br',tel:'(11) 98456-2210',nasc:'1984-06-12',cargo:'Pastor presidente',since:'2019-03-10',bio:'',tone:'ceu',
 tfa:true,notif:{email:true,push:true,resumo:true,urg:true},
 sess:[{d:'Chrome · Windows',where:'São Paulo, SP',when:'agora',cur:true,ic:'monitor'},{d:'App Alva · iPhone',where:'São Paulo, SP',when:'há 2 horas',ic:'phone'},{d:'Safari · MacBook',where:'Campinas, SP',when:'há 4 dias',ic:'monitor'}]};
Object.assign(S,{pft:'dados'});
function perfilPage(){
 const c=CHURCHES[S.church],role=c.role,perm=(typeof RPERM!=='undefined'&&RPERM[role])||{},mods=Object.keys(perm),full=mods.filter(m=>perm[m].length>=4).length;
 const tabs=[['dados','Dados pessoais'],['acesso','Igrejas e acesso',CHURCHES.length],['seg','Segurança'],['pref','Preferências']];
 return `<header class="card prof pf-h rise" style="--d:1">
  <div class="pid"><div class="pf-av"><span class="av xl" style="background:var(--tone-${ME.tone});color:var(--tone-${ME.tone}-ink)">${initials(ME.n)}</span></div>
   <div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(ME.n)}</h1><span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>${role}</span></div>
   <p>${esc(ME.email)}</p></div></div>
  <div class="pact"><button class="btn sec" data-a="openMobile">${ic('phone',15)}Ver no app</button></div>
  <div class="ikpi hk"><div><b>${CHURCHES.length}</b><span>Igrejas com acesso</span></div><div><b>${full}<small class="kof">/${MODS.length}</small></b><span>Áreas com acesso total</span></div></div>
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${S.pft===t[0]?'on':''}" data-a="pfTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${S.pft==='dados'?pfDados():S.pft==='acesso'?pfAcesso(c,perm):S.pft==='seg'?pfSeg():pfPref()}</div>`;
}
function pfDados(){return `<section class="card pc pf-form"><div class="sh"><h2>Dados pessoais</h2><span class="who" id="pfSaved">Altere e salve</span></div>
 <form id="pfF" class="fgrid" novalidate>
  <label class="fld"><span class="fl">Nome completo</span><input name="n" value="${esc(ME.n)}" autocomplete="name"><span class="err"></span></label>
  <label class="fld"><span class="fl">Como prefere ser chamado</span><input name="first" value="${esc(ME.first)}"><span class="err"></span></label>
  <label class="fld"><span class="fl">E-mail</span><input name="email" type="email" value="${esc(ME.email)}" autocomplete="email"><span class="hint">É o seu login. Ao trocar, enviamos um link de confirmação.</span><span class="err"></span></label>
  <label class="fld"><span class="fl">Celular</span><input name="tel" value="${esc(ME.tel)}" inputmode="tel"><span class="err"></span></label>
  <label class="fld"><span class="fl">Data de nascimento</span><input name="nasc" type="date" value="${ME.nasc}"></label>
  <label class="fld"><span class="fl">Cargo ou função <small>aparece para a equipe</small></span><input name="cargo" value="${esc(ME.cargo)}"></label>
  <label class="fld wide"><span class="fl">Sobre você <small>opcional</small></span><textarea class="ta" name="bio" rows="3" maxlength="240" placeholder="Uma linha sobre você para a equipe">${esc(ME.bio)}</textarea></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="pfReset">Descartar</button><button type="submit" class="btn pri" disabled>Salvar alterações</button></div>
 </form></section>`;}
function pfAcesso(c,perm){
 const mods=Object.keys(perm),lvl=a=>a.length>=4?['Total','var(--st-int)','var(--st-int-bg)']:a.length?[a.join(', '),'var(--st-sol)','var(--st-sol-bg)']:['Sem acesso','var(--ink-muted)','var(--surface-2)'];
 return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Permissões em ${esc(c.n)}</h2><span class="who">perfil ${c.role}</span></div>
  <p class="who" style="margin:-6px 0 14px">Definidas em Administração › Usuários e permissões. Para mudar, fale com outro administrador da rede.</p>
  <div class="pf-perm">${mods.map(m=>{const l=lvl(perm[m]);return `<div class="pf-pr"><span>${esc(m)}</span><span class="stp" style="--c:${l[1]};--b:${l[2]}"><i></i>${l[0]}</span></div>`;}).join('')}</div></section>
  <section class="card pc"><div class="sh"><h2>Suas igrejas</h2><span class="who">${NETWORK}</span></div><div class="pf-ch">${CHURCHES.map((x,i)=>`<div class="pf-c ${i===S.church?'on':''}">${chTile(x,36)}<span class="dkt"><b>${esc(x.n)}</b><span>${x.role} · último acesso ${x.last}</span></span>${i===S.church?'<span class="pf-now">Atual</span>':`<button class="btn sec sm" data-a="setChurch" data-v="${i}">Entrar</button>`}</div>`).join('')}</div></section></div>`;}
function pfSeg(){return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Senha</h2><span class="who">alterada há 3 meses</span></div><p class="who" style="margin:-6px 0 14px">Use pelo menos 8 caracteres, com letras e números.</p><button class="btn sec" data-a="pfPwd">${ic('lock',15)}Alterar senha</button></section><section class="card pc"><div class="sh"><h2>Sessões</h2></div><p class="who">Encerre o acesso nos outros aparelhos. Você continua conectado neste aparelho.</p><button class="btn sec" data-a="pfOutAll">Sair de todos os outros aparelhos</button></section></div>`;}
function pfPref(){const N=ME.notif;return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Notificações</h2></div><div class="pf-tg">
 ${[['email','Por e-mail','Avisos de aprovações, inscrições e escalas'],['push','No celular','Pelo app Alva, em tempo real'],['resumo','Resumo semanal','Toda segunda, o que mudou na igreja'],['urg','Casos urgentes de cuidado','Sempre avisar na hora, mesmo fora do horário']].map(t=>`<label class="tog"><input type="checkbox" data-nt="${t[0]}" ${N[t[0]]?'checked':''}><span class="sw"></span><span><b>${t[1]}</b><small>${t[2]}</small></span></label>`).join('')}</div></section>
 <section class="card pc"><div class="sh"><h2>Aparência</h2></div><div class="pf-th">${[['dia','Dia'],['noite','Noite']].map(t=>`<button class="pf-thb ${S.theme===t[0]?"on":""}" data-a="pfTheme" data-v="${t[0]}"><span class="pf-sw ${t[0]}"><i></i><i></i><i></i></span>${t[1]}</button>`).join('')}</div>
  <label class="fld" style="margin-top:16px"><span class="fl">Idioma</span><span class="selw"><select id="pfLang">${['Português (Brasil)','Español','English'].map(l=>`<option ${ME.lang===l?'selected':''}>${l}</option>`).join('')}</select>${ic('updown',14)}</span></label></section></div>`;}
function perfilAfter(){
 requestAnimationFrame(()=>typeof tabInd==='function'&&tabInd());
 const f=$('#pfF');if(f){const sb=f.querySelector('[type=submit]'),orig=new FormData(f);const dirty=()=>[...new FormData(f)].some(([k,v])=>orig.get(k)!==v);
  f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');sb.disabled=!dirty();$('#pfSaved').textContent=dirty()?'Alterações não salvas':'Altere e salve';});
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),bad=(n,m)=>{const i=f[n];i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;};let ok=true;
   if(fd.get('n').trim().split(/\s+/).length<2){bad('n','Informe nome e sobrenome');ok=false;}
   if(!fd.get('first').trim()){bad('first','Como devemos te chamar?');ok=false;}
   if(!/^\S+@\S+\.\S+$/.test(fd.get('email'))){bad('email','E-mail inválido');ok=false;}
   if(fd.get('tel').replace(/\D/g,'').length<10){bad('tel','Celular com DDD');ok=false;}
   if(!ok)return;const em=fd.get('email')!==ME.email;
   busy(sb,700,'Salvo',()=>{['n','first','email','tel','nasc','cargo','bio'].forEach(k=>ME[k]=fd.get(k).trim());setTimeout(()=>{render();toast(em?`Dados salvos. Enviamos um link de confirmação para ${ME.email}`:'Dados salvos');},300);});});}

 $$('[data-nt]').forEach(i=>i.addEventListener('change',()=>{ME.notif[i.dataset.nt]=i.checked;toast(i.checked?'Notificação ligada':'Notificação desligada');}));
}
const PFA={
 myProfile:v=>{closePops();S.active='perfil';S.pft=v||'dados';S.member=null;$('#side').classList.remove('open');render();window.scrollTo({top:0});},
 pfTab:v=>{S.pft=v;const y=window.scrollY;render();window.scrollTo(0,y);},
 pfTheme:v=>{A.theme(v);const y=window.scrollY;render();window.scrollTo(0,y);},
 pfReset:()=>{render();toast('Alterações descartadas');},
 pfPhoto:()=>toast('Escolha uma foto quadrada, até 5 MB'),
 pfPwd:()=>{openDlg(`${dlgHead('Alterar senha','As outras sessões serão encerradas. Você continua conectado neste aparelho.')}<form id="pwF" class="fgrid one" novalidate>
   <label class="fld"><span class="fl">Senha atual</span><input type="password" name="a" autocomplete="current-password"><span class="err"></span></label>
   <label class="fld"><span class="fl">Nova senha</span><input type="password" name="b" autocomplete="new-password"><span class="hint">Mínimo de 8 caracteres, com letras e números.</span><span class="err"></span></label>
   <label class="fld"><span class="fl">Repita a nova senha</span><input type="password" name="c" autocomplete="new-password"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Alterar senha</button></div></form>`,'sm');
  const f=$('#pwF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));f.addEventListener('submit',e=>{e.preventDefault();const bad=(n,m)=>{f[n].closest('.fld').classList.add('bad');f[n].closest('.fld').querySelector('.err').textContent=m;};
   if(!f.a.value)return bad('a','Informe a senha atual');if(f.a.value==='errada')return bad('a','Senha atual incorreta');if(f.b.value.length<8||!/\d/.test(f.b.value)||!/[a-z]/i.test(f.b.value))return bad('b','Use 8+ caracteres, com letras e números');if(f.b.value===f.a.value)return bad('b','A nova senha precisa ser diferente');if(f.c.value!==f.b.value)return bad('c','As senhas não conferem');
   busy(f.querySelector('[type=submit]'),700,'Alterada',()=>{setTimeout(()=>{closeDlg();toast('Senha alterada. As outras sessões foram encerradas · demonstração.');},300);});});},

 pfOutAll:()=>{confirmDel({title:'Sair de todos os outros aparelhos?',body:'Os outros acessos serão encerrados. Você continua conectado neste aparelho.',label:'Sair dos outros aparelhos',onConfirm:()=>toast('Outras sessões encerradas · demonstração')});},
};

