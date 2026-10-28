/* ================= Administração › Parâmetros do sistema (só superusuários; ajuste pontual de protótipo) =================
   Mostra que existe: abas por área, descrição, faixa, padrão, valor atual e Restaurar padrão. Sem persistência. */
Object.assign(S,{spTab:'comunicacao'});
const SPTABS=[['geral','Geral'],['seguranca','Segurança e acesso'],['comunicacao','Comunicação'],['comunidade','Comunidade'],['quadros','Quadros e tarefas'],['arquivos','Arquivos'],['eventos','Eventos e inscrições'],['conectores','Conectores']];
const SPAR=[
 {a:'geral',k:'system.parameterCacheSeconds',n:'Tempo até uma mudança valer',d:'Quanto tempo, no máximo, o sistema leva para passar a usar um valor que você alterou aqui.',u:'segundos',min:5,max:600,def:60},
 {a:'geral',k:'facilities.agenda.maxRangeDays',n:'Período da agenda de uma sala',d:'Maior período que a agenda de ocupações de uma sala pode consultar de uma vez.',u:'dias',min:7,max:93,def:31},
 {a:'geral',k:'audit.retention.logEntryYears',n:'Guarda da auditoria',d:'Por quantos anos o registro de auditoria é guardado antes de ser apagado.',u:'anos',min:1,max:10,def:5},
 {a:'seguranca',k:'identity.code.validityMinutes',n:'Validade do código por e-mail',d:'Por quanto tempo vale o código enviado por e-mail para entrar, se identificar, trocar o e-mail ou excluir a conta.',u:'minutos',min:5,max:60,def:15},
 {a:'seguranca',k:'identity.code.maxAttempts',n:'Tentativas do código',d:'Quantas vezes a pessoa pode errar o código antes de ele deixar de valer.',u:'tentativas',min:3,max:10,def:5},
 {a:'seguranca',k:'identity.invite.validityDays',n:'Validade do convite',d:'Por quantos dias vale o convite para criar a senha.',u:'dias',min:1,max:30,def:7},
 {a:'seguranca',k:'identity.login.lockoutMinutes',n:'Bloqueio por senhas erradas',d:'Por quanto tempo o login por senha fica bloqueado depois das tentativas erradas.',u:'minutos',min:5,max:120,def:15},
 {a:'seguranca',k:'identity.session.idleTimeoutMinutes',n:'Sessão sem uso',d:'Quanto tempo sem uso encerra a sessão no painel e no app.',u:'minutos',min:10,max:480,def:30},
 {a:'seguranca',k:'identity.discovery.maxSearchesPerOrigin',n:'Buscas de cadastro por origem',d:'Quantas buscas de cadastro uma mesma origem (rede) pode fazer na janela de contagem.',u:'buscas',min:3,max:60,def:10},
 {a:'seguranca',k:'identity.export.maxRows',n:'Exportação da lista de usuários',d:'Máximo de linhas na exportação da lista de usuários e de visitantes.',u:'linhas',min:1000,max:100000,def:10000},
 {a:'comunicacao',k:'communication.automation.ReservationReminder.offsets',n:'Lembrete de reserva de espaço (padrão)',d:'Quando avisar o solicitante antes do horário da reserva. A igreja pode personalizar.',txt:true,def:'1 dia, 15 minutos',church:true},
 {a:'comunicacao',k:'communication.maxActiveBanners',n:'Banners ativos por igreja',d:'Quantos banners podem ficar ativos ao mesmo tempo no Início do app de cada igreja.',u:'banners',min:1,max:20,def:5},
 {a:'comunicacao',k:'communication.inboxRetentionDays',n:'Guarda da caixa de notificações',d:'Por quantos dias a notificação fica na caixa da pessoa no app.',u:'dias',min:7,max:365,def:90},
 {a:'comunicacao',k:'communication.liveWindowMinutes',n:'Duração do "ao vivo agora"',d:'Quanto tempo depois do horário da grade a transmissão aparece como "ao vivo agora".',u:'minutos',min:30,max:360,def:120},
 {a:'comunicacao',k:'communication.reminderJobPeriodMinutes',n:'Frequência da busca de lembretes',d:'De quanto em quanto tempo o sistema procura lembretes a enviar.',u:'minutos',min:1,max:60,def:5},
 {a:'comunicacao',k:'communication.taskDueGraceMinutes',n:'Prazo do lembrete "ao vencer"',d:'Até quanto tempo depois do vencimento da tarefa o lembrete "ao vencer" ainda pode ser enviado.',u:'minutos',min:0,max:2880,def:1440},
 {a:'comunicacao',k:'communication.deliveryMaxAttempts',n:'Tentativas de entrega',d:'Quantas vezes o sistema tenta entregar um aviso antes de marcá-lo como falha.',u:'tentativas',min:1,max:10,def:5},
 {a:'comunicacao',k:'communication.pushTitleMaxChars',n:'Limite do título do push',d:'Máximo de caracteres do título de uma notificação push.',u:'caracteres',min:20,max:100,def:65},
 {a:'comunicacao',k:'communication.pushBodyMaxChars',n:'Limite do texto do push',d:'Máximo de caracteres do texto de uma notificação push.',u:'caracteres',min:60,max:400,def:180},
 {a:'comunicacao',k:'communication.emailSubjectMaxChars',n:'Limite do assunto do e-mail',d:'Máximo de caracteres do assunto de um e-mail.',u:'caracteres',min:40,max:250,def:150},
 {a:'comunicacao',k:'communication.emailBodyMaxBytes',n:'Tamanho máximo do e-mail',d:'Tamanho máximo do corpo de um e-mail, em bytes.',u:'bytes',min:10240,max:1048576,def:204800},
 {a:'comunicacao',k:'communication.automation.EventReminder.offsets',n:'Lembrete de evento (padrão)',d:'Quando avisar os inscritos antes do evento. A igreja pode personalizar em Notificações › Automações.',txt:true,def:'7 dias, 1 dia, 1 hora',church:true},
 {a:'comunicacao',k:'communication.automation.MeetingReminder.offsets',n:'Lembrete de encontro (padrão)',d:'Quando avisar os convocados antes de qualquer encontro. A igreja pode personalizar.',txt:true,def:'1 dia, 1 hora',church:true},
 {a:'comunicacao',k:'communication.automation.TaskReminder.offsets',n:'Lembrete de tarefa (padrão)',d:'Quando avisar o responsável da tarefa. A igreja pode personalizar.',txt:true,def:'24 horas antes, ao vencer',church:true},
 {a:'comunicacao',k:'communication.automation.LiveReminder.offsets',n:'Lembrete de live ou culto (padrão)',d:'Quando avisar quem tem o app antes da transmissão. A igreja pode personalizar.',txt:true,def:'1 hora',church:true},
 {a:'comunicacao',k:'communication.automation.staff.thresholdDays',n:'Alerta da equipe: pendência parada (padrão)',d:'Depois de quantos dias parada uma pendência (por exemplo, na Secretaria) avisa a equipe. A igreja pode personalizar.',u:'dias',min:1,max:365,def:15,church:true},
 {a:'geral',k:'system.reasonMaxChars',n:'Tamanho do motivo de recusa',d:'Máximo de caracteres do motivo que a pessoa escreve ao recusar uma escala, um encontro, um pedido ou uma inscrição. O motivo é sempre um texto livre, sem lista de opções.',u:'caracteres',min:50,max:500,def:200},
 {a:'geral',k:'system.seriesRenewalWindowMonths',n:'Janela para renovar séries',d:'Toda série de eventos e encontros termina em 31/12 do ano em que começa. Nos últimos meses do ano, a agenda oferece "Renovar para o próximo ano". Aqui você escolhe quantos meses antes do fim do ano isso aparece.',u:'meses',min:1,max:3,def:1},
 {a:'quadros',k:'taskboards.dueSoonDays',n:'Dias para "perto de vencer"',d:'A tarefa de qualquer quadro (ministério, evento, culto) é marcada como "perto de vencer" quando faltam até esta quantidade de dias.',u:'dias',min:1,max:30,def:7},
 {a:'arquivos',k:'files.pendingDays',n:'Arquivo enviado e não confirmado',d:'Depois de quantos dias um arquivo enviado e nunca ligado a um registro é descartado.',u:'dias',min:1,max:60,def:7},
 {a:'arquivos',k:'files.unusedDays',n:'Arquivo sem uso',d:'Depois de quantos dias sem uso um arquivo é apagado.',u:'dias',min:1,max:365,def:7},
 {a:'arquivos',k:'files.usage.secretariat.template.maxBytes',n:'Modelo de documento da secretaria',d:'Tamanho máximo de um modelo de documento da secretaria (.docx ou .pdf).',u:'bytes',min:1048576,max:26214400,def:5242880},
 {a:'eventos',k:'registrations.regretDays',n:'Piso de arrependimento',d:'Dias depois da compra em que a pessoa pode pedir reembolso sem ter feito check-in. Valor a validar com o advogado.',u:'dias',min:0,max:30,def:7}
].map(p=>({...p,val:p.def}));

function sysParamsPage(){
 if(S.spTab==='conectores')return spConnPage();
 const l=SPAR.filter(p=>p.a===S.spTab);
 const changed=SPAR.filter(p=>p.val!==p.def).length;
 return `${admHead('Parâmetros do sistema','Valores técnicos e padrões do produto. Só SuperAdmin e SuperOperator alteram; o que a igreja pode personalizar herda o padrão daqui.')}
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Parâmetros</span><span class="kv">${SPAR.length}</span><span class="kd">em ${SPTABS.length} áreas</span></div><div class="k4"><span class="kl">Alterados</span><span class="kv">${changed}</span><span class="kd">${changed?'diferentes do padrão':'todos no padrão'}</span></div><div class="k4"><span class="kl">Personalizáveis pela igreja</span><span class="kv">${SPAR.filter(p=>p.church).length}</span><span class="kd">com padrão aqui</span></div></section>
 <div class="ptabs" role="tablist" style="margin-top:6px">${SPTABS.map(t=>`<button role="tab" class="${S.spTab===t[0]?'on':''}" aria-selected="${S.spTab===t[0]}" data-a="spTab" data-v="${t[0]}">${t[1]}<small>${SPAR.filter(p=>p.a===t[0]).length}</small></button>`).join('')}<span class="tind"></span></div>
 <section class="card rise" style="--d:2;padding:6px 20px">${l.length?l.map(p=>`<div style="display:grid;grid-template-columns:1fr 230px;gap:18px;padding:16px 0;border-bottom:1px solid var(--line,rgba(0,0,0,.08));align-items:start">
   <div><b>${esc(p.n)}</b>${p.church?` <span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>A igreja pode personalizar</span>`:''}<div class="who" style="margin:4px 0 0">${esc(p.d)}</div><div class="soft" style="font-size:.8em;margin-top:6px"><code>${esc(p.k)}</code></div></div>
   <div><div class="row2" style="display:flex;gap:8px;align-items:center"><div class="fld" style="flex:1"><input data-sp="${p.k}" ${p.txt?'':'type="number"'} value="${esc(String(p.val))}" ${p.txt||p.min==null?'':`min="${p.min}" max="${p.max}"`} aria-label="${esc(p.n)}"></div>${p.u?`<em style="font-style:normal" class="soft">${p.u}</em>`:''}</div>
    <div class="soft" style="font-size:.8em;margin-top:6px">Padrão: ${p.def}${p.u?' '+p.u:''}${p.min!=null?` · faixa ${p.min.toLocaleString('pt-BR')} a ${p.max.toLocaleString('pt-BR')}`:''}</div>
    <div class="err" id="spE-${p.k.replace(/\W/g,'_')}" style="color:var(--st-neg,#b3261e);font-size:.8em"></div>
    ${p.val!==p.def?`<button class="btn ghost sm" data-a="spRestore" data-v="${p.k}" style="margin-top:4px">Restaurar padrão</button>`:''}</div></div>`).join(''):'<p class="who" style="padding:18px 0">Nenhum parâmetro geral além do tempo de cache. Os demais ficam nas áreas ao lado.</p>'}
 </section>`;
}
A.spTab=v=>{S.spTab=v;render();window.scrollTo({top:0});};
A.spRestore=v=>{const p=SPAR.find(x=>x.k===v);p.val=p.def;cmRe();toast('Parâmetro restaurado ao padrão');};
document.addEventListener('change',e=>{const i=e.target.closest&&e.target.closest('[data-sp]');if(!i)return;const p=SPAR.find(x=>x.k===i.dataset.sp);if(!p)return;
 const er=document.getElementById('spE-'+p.k.replace(/\W/g,'_'));
 if(p.txt){p.val=i.value.trim()||p.def;cmRe();toast('Parâmetro salvo (vale para o que vier depois)');return;}
 const n=Number(i.value);if(!Number.isFinite(n)||n<p.min||n>p.max){if(er)er.textContent='Use um valor entre '+p.min.toLocaleString('pt-BR')+' e '+p.max.toLocaleString('pt-BR')+'.';return;}
 p.val=n;cmRe();toast('Parâmetro salvo (vale para o que vier depois)');});

/* ---------- Conectores (pagamento e comércio) ---------- */
/* ---------- Conectores: conexões da igreja aberta; cada conexão guarda a credencial de Produção e, se quiser, a de Homologação; o ambiente ativo decide qual vale ---------- */
const CN_PROV={Pagamento:['Asaas','Stripe'],Comércio:['Totify']};
const CN_ICON={Pagamento:'wallet',Comércio:'bag'};
const CN_ENV={prod:'Produção',hom:'Homologação'};
const CN_KINDS=[['key','Chave de API','enviada em um cabeçalho'],['bearer','Bearer token','Authorization: Bearer'],['cc','Client credentials','ID e segredo do cliente'],['basic','Usuário e senha','Basic, em base64'],['hdr','Cabeçalho personalizado','nome e valor']];
const CN_LIST=[{k:'pay',cap:'Pagamento',prov:'Asaas',on:true,env:'prod',cred:{prod:{kind:'key',hint:'7f3a'},hom:{kind:'key',hint:'91c0'}},hook:'https://api.alva.app/webhooks/payments/asaas/9c1e4b7a',tested:{prod:'Testada hoje, 09:12',hom:'Testada em 12/10'}},
  {k:'com',cap:'Comércio',prov:'Totify',on:false,env:'prod',cred:{prod:{kind:'cc',hint:'c21e'},hom:null},hook:'https://api.alva.app/webhooks/commerce/totify/5d20a8f3',tested:{prod:'Nunca testada',hom:null}}];
const cnList=()=>CN_LIST;
const cnGet=k=>cnList().find(x=>x.k===k);
const cnKind=k=>CN_KINDS.find(x=>x[0]===k)[1];
const cnPill=(t,on)=>`<span class="stp" style="--c:var(${on?'--st-int':'--ink-muted'});--b:var(${on?'--st-int-bg':'--surface-2'})"><i></i>${t}</span>`;
const cnCredTxt=(c,e)=>{const x=c.cred[e];return x?`${cnKind(x.kind)} · ••••${x.hint}`:'<span class="soft">Não cadastrada</span>';};
function spConnPage(){
 const L=cnList();
 return `${admHead('Parâmetros do sistema','Valores técnicos e padrões do produto. Só SuperAdmin e SuperOperator alteram; o que a igreja pode personalizar herda o padrão daqui.',`<button class="btn pri" data-a="cnNew">${ic('plus',15,2.2)}Nova conexão</button>`)}
 <div class="ptabs" role="tablist" style="margin-top:6px">${SPTABS.map(t=>`<button role="tab" class="${S.spTab===t[0]?'on':''}" aria-selected="${S.spTab===t[0]}" data-a="spTab" data-v="${t[0]}">${t[1]}<small>${t[0]==='conectores'?L.length:SPAR.filter(p=>p.a===t[0]).length}</small></button>`).join('')}<span class="tind"></span></div>
 <p class="fi-note rise" style="--d:1">${ic('shield',15)}<span>Cada igreja tem <b>uma conexão ativa por capacidade</b>. A conexão guarda a credencial de <b>Produção</b> e, se quiser, a de <b>Homologação</b>; o <b>ambiente ativo</b> decide qual vale para tudo. As credenciais ficam mascaradas e nunca aparecem em log nem em auditoria.</span></p>
 <div class="rise" style="--d:2;display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;align-items:stretch">${L.map(c=>{const v=c.view||c.env,x=c.cred[v],isAct=c.env===v;return `<section class="card fd-card" style="display:flex;flex-direction:column"><div class="sh"><div style="display:flex;align-items:center;gap:10px"><span class="ax-mi" style="--c:var(--brand-text);--b:var(--brand-soft)">${ic(CN_ICON[c.cap],16,2)}</span><div><h2 style="margin:0">${c.cap}</h2><p class="fd-sub" style="margin:0">${c.prov}</p></div></div><span style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">${c.env==='hom'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Homologação ativa</span>`:''}${cnPill(c.on?'Ativa':'Inativa',c.on)}</span></div>
  <div class="segc" role="group" style="align-self:flex-start;margin-bottom:12px">${['prod','hom'].map(e=>`<button type="button" aria-pressed="${v===e}" data-a="cnView" data-v="${c.k}|${e}">${CN_ENV[e]}${c.env===e?' · ativo':''}</button>`).join('')}</div>
  ${x?`<div class="fd-lines"><div class="fd-ln"><span>Credencial</span><b>${cnCredTxt(c,v)}</b></div><div class="fd-ln"><span>Último teste</span><b>${c.tested[v]||'Nunca testada'}</b></div><div class="fd-ln"><span>Situação</span>${isAct?cnPill('Ambiente ativo',true):`<span style="display:flex;align-items:center;gap:8px"><span class="soft">Não é o ativo</span><button class="btn sec sm" data-a="cnEnv" data-v="${c.k}|${v}">Ativar este ambiente</button></span>`}</div></div>`:`<div class="fd-lines"><div class="fd-ln"><span>Credencial</span><span class="soft">${CN_ENV[v]} ainda não cadastrada</span></div></div>`}
  <p class="fl" style="margin-top:12px">URL do webhook</p><div style="display:flex;gap:8px;align-items:center"><code style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.hook.replace(/[^/]+$/,'••••••••')}</code><button class="btn ghost sm" data-a="cnRev" data-v="${c.k}">${ic('eye',14)}Revelar</button><button class="btn ghost sm" data-a="cnRegen" data-v="${c.k}">${ic('swap',14)}Regenerar</button></div>
  <div class="dfoot" style="margin-top:auto;padding-top:14px">${x?`<button class="btn sec" data-a="cnTest" data-v="${c.k}|${v}">Testar</button>`:''}<button class="btn sec" data-a="cnCred" data-v="${c.k}|${v}">${x?'Trocar credenciais':'Cadastrar credencial'}</button><button class="btn ${c.on?'sec':'pri'}" data-a="cnToggle" data-v="${c.k}">${c.on?'Desativar':'Ativar'}</button></div></section>`;}).join('')}</div>`;
}
/* formulário de credencial: ambiente, tipo e os campos do tipo */
const cnFields=kind=>{const I=(n,l,t,ph)=>`<label class="fld"><span class="fl">${l}</span><input name="${n}" type="${t||'text'}" placeholder="${ph||''}" autocomplete="off"><span class="err"></span></label>`;
 return ({key:I('sec','Chave de API','password','Cole a chave'),bearer:I('sec','Token','password','Cole o token'),cc:I('id','Client ID')+I('sec','Client secret','password'),basic:I('usr','Usuário')+I('sec','Senha','password'),hdr:I('hn','Nome do cabeçalho','text','Ex.: X-API-Key')+I('sec','Valor','password')})[kind]
  +`<label class="fld"><span class="fl">Cabeçalhos extras <small>opcional</small></span><textarea class="ta" name="extra" rows="2" placeholder="Nome: valor, um por linha"></textarea><span class="hint">Só para provedores que pedem algo além da credencial.</span></label>`;};
const cnCredBlock=(env,fixed)=>`${fixed?`<input type="hidden" name="env" value="${env}">`:`<div class="fld"><span class="fl">Ambiente</span><div class="yn" role="radiogroup">${['prod','hom'].map(e=>`<label><input type="radio" name="env" value="${e}" ${e===env?'checked':''}><span>${CN_ENV[e]}</span></label>`).join('')}</div><span class="hint">Cada ambiente tem a sua credencial. O ambiente ativo da conexão decide qual vale.</span></div>`}
 <label class="fld"><span class="fl">Tipo de credencial</span><span class="selw"><select name="kind">${CN_KINDS.map(k=>`<option value="${k[0]}">${k[1]} · ${k[2]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
 <div id="cnFlds" class="fgrid one">${cnFields('key')}</div>`;
const cnBindCred=f=>{f.elements.namedItem('kind').addEventListener('change',e=>{$('#cnFlds').innerHTML=cnFields(e.target.value);});f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));};
const cnReadCred=f=>{const fd=new FormData(f),sec=(fd.get('sec')||'').trim();if(!sec){const i=f.elements.namedItem('sec'),fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Informe este campo';i.focus();return null;}return {env:fd.get('env'),cred:{kind:fd.get('kind'),hint:sec.slice(-4).padStart(4,'•')}};};
A.cnView=v=>{const [k,env]=v.split('|');cnGet(k).view=env;cmRe();};
A.cnTest=v=>{const [k,e]=v.split('|'),c=cnGet(k)||cnList()[0],env=e||c.env;c.tested[env]='Testada agora';cmRe();toast('Conexão testada em '+CN_ENV[env].toLowerCase()+': respondeu normalmente (simulado)');};
A.cnToggle=v=>{const c=cnGet(v);if(!c.on)cnList().filter(x=>x!==c&&x.cap===c.cap).forEach(x=>{x.on=false;});c.on=!c.on;cmRe();toast(c.on?c.prov+' ativada para '+c.cap.toLowerCase():c.prov+' desativada');};
A.cnCopy=v=>{const c=cnGet(v);try{navigator.clipboard&&navigator.clipboard.writeText(c.hook);}catch(e){}toast('URL do webhook copiada');};
A.cnEnv=v=>{const [k,env]=v.split('|'),c=cnGet(k);if(c.env===env)return;
 if(!c.cred[env])return;
 confirmDel({title:env==='hom'?`Ativar a homologação de ${c.prov}?`:`Voltar para a produção de ${c.prov}?`,
  body:env==='hom'?'A conexão é testada antes. Daqui em diante, pagamentos e vendas passam pelo ambiente de testes do provedor e entram nos números da igreja como qualquer outro. Pagamentos de produção ainda pendentes não migram.':`A conexão é testada antes.${c.cap==='Comércio'?' Os itens vendidos no totem são republicados no provedor de produção e os códigos dos produtos mudam.':''} Pagamentos de homologação ainda pendentes não migram.`,
  label:env==='hom'?'Ativar homologação':'Voltar para produção',onConfirm:()=>{c.env=env;c.tested[env]='Testada agora';cmRe();toast(env==='hom'?'Homologação ativa para '+c.cap.toLowerCase():'Produção ativa para '+c.cap.toLowerCase());}});};
A.cnCred=v=>{const [k,env]=v.split('|'),c=cnGet(k);
 openDlg(`${dlgHead(c.cred[env||c.view||c.env]?'Trocar credenciais':'Cadastrar credencial',c.cap+' · '+c.prov+' · '+CN_ENV[env||c.view||c.env])}<form id="cnF" class="fgrid one" novalidate>${cnCredBlock(env||c.view||c.env,true)}<p class="hint" style="margin:0">Os campos começam vazios: a credencial atual nunca aparece. A anterior fica guardada enquanto houver pagamentos ou pedidos nela.</p><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`,'sm');
 const f=$('#cnF');cnBindCred(f);
 f.addEventListener('submit',e=>{e.preventDefault();const r=cnReadCred(f);if(!r)return;c.cred[r.env]=r.cred;c.tested[r.env]='Nunca testada';closeDlg();cmRe();toast('Credencial de '+CN_ENV[r.env].toLowerCase()+' atualizada');});};
A.cnNew=()=>{
 openDlg(`${dlgHead('Nova conexão','Capacidade, provedor e a primeira credencial.')}<form id="cnF" class="fgrid one" novalidate>
  <label class="fld"><span class="fl">Capacidade</span><span class="selw"><select name="cap">${Object.keys(CN_PROV).map(x=>`<option>${x}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="fld"><span class="fl">Provedor</span><span class="selw"><select name="prov">${CN_PROV.Pagamento.map(x=>`<option>${x}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  ${cnCredBlock('prod')}
  <label class="tog"><input type="checkbox" name="on" checked><span class="sw"></span><span><b>Ativar agora</b><small>Só uma conexão fica ativa por capacidade; a que estiver ativa é desativada</small></span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar conexão</button></div></form>`,'sm');
 const f=$('#cnF');cnBindCred(f);
 f.elements.namedItem('cap').addEventListener('change',e=>{f.elements.namedItem('prov').innerHTML=CN_PROV[e.target.value].map(x=>`<option>${x}</option>`).join('');});
 f.addEventListener('submit',e=>{e.preventDefault();const r=cnReadCred(f);if(!r)return;const fd=new FormData(f),cap=fd.get('cap'),prov=fd.get('prov'),on=!!fd.get('on'),L=cnList();
  if(on)L.filter(x=>x.cap===cap).forEach(x=>{x.on=false;});
  L.push({k:'n'+Date.now(),cap,prov,on,env:r.env,cred:{prod:r.env==='prod'?r.cred:null,hom:r.env==='hom'?r.cred:null},hook:'https://api.alva.app/webhooks/'+(cap==='Pagamento'?'payments':'commerce')+'/'+norm(prov).replace(/\W/g,'')+'/'+Math.random().toString(16).slice(2,10),tested:{prod:null,hom:null}});
  closeDlg();cmRe();toast('Conexão criada'+(cap==='Comércio'?'. Copie a URL do webhook para o painel do provedor':''));});};
A.cnRev=v=>{const c=cnGet(v);openDlg(`${dlgHead('URL do webhook',c.cap+' · '+c.prov)}<p class="hint" style="margin:0 0 10px">O segredo vale para esta igreja; quem o tiver pode enviar avisos. Cole esta URL no painel do provedor.</p><div style="display:flex;gap:8px;align-items:center"><code style="flex:1;word-break:break-all">${c.hook}</code><button class="btn sec sm" data-a="cnCopy" data-v="${c.k}">${ic('copy',14)}Copiar</button></div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'sm');};
A.cnRegen=v=>{const c=cnGet(v);confirmDel({title:`Regenerar a URL de ${c.prov}?`,body:'A URL atual deixa de funcionar. Atualize o painel do provedor com a nova.',label:'Regenerar',onConfirm:()=>{c.hook=c.hook.replace(/[^/]+$/,Math.random().toString(16).slice(2,10));cmRe();toast('Nova URL gerada. Revele para copiar');}});};
