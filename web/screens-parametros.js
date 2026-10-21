/* ================= Administração › Parâmetros do sistema (só superusuários; ajuste pontual de protótipo) =================
   Mostra que existe: abas por área, descrição, faixa, padrão, valor atual e Restaurar padrão. Sem persistência. */
Object.assign(S,{spTab:'comunicacao'});
const SPTABS=[['geral','Geral'],['seguranca','Segurança e acesso'],['comunicacao','Comunicação'],['comunidade','Comunidade'],['quadros','Quadros e tarefas'],['arquivos','Arquivos'],['eventos','Eventos e inscrições']];
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
 {a:'comunidade',k:'meetings.maxSeriesMonths',n:'Período máximo de uma série de encontros',d:'Até quantos meses depois da primeira data uma série recorrente pode se estender.',u:'meses',min:1,max:36,def:12},
 {a:'quadros',k:'taskboards.dueSoonDays',n:'Dias para "perto de vencer"',d:'A tarefa de qualquer quadro (ministério, evento, culto) é marcada como "perto de vencer" quando faltam até esta quantidade de dias.',u:'dias',min:1,max:30,def:7},
 {a:'arquivos',k:'files.pendingDays',n:'Arquivo enviado e não confirmado',d:'Depois de quantos dias um arquivo enviado e nunca ligado a um registro é descartado.',u:'dias',min:1,max:60,def:7},
 {a:'arquivos',k:'files.unusedDays',n:'Arquivo sem uso',d:'Depois de quantos dias sem uso um arquivo é apagado.',u:'dias',min:1,max:365,def:7},
 {a:'arquivos',k:'files.usage.secretariat.template.maxBytes',n:'Modelo de documento da secretaria',d:'Tamanho máximo de um modelo de documento da secretaria (.docx ou .pdf).',u:'bytes',min:1048576,max:26214400,def:5242880},
 {a:'eventos',k:'registrations.regretDays',n:'Piso de arrependimento',d:'Dias depois da compra em que a pessoa pode pedir reembolso sem ter feito check-in. Valor a validar com o advogado.',u:'dias',min:0,max:30,def:7}
].map(p=>({...p,val:p.def}));

function sysParamsPage(){
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
