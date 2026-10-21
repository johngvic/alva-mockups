/* ================= Secretaria ================= */
/* Menu Secretaria (Visão geral, Atos, Documentos, Cargos e mandatos, Relatórios), situação do membro em Pessoas › Membros,
   Disciplina em Cuidado e informe de contribuições em Financeiro › Relatórios. Tudo sobre dados fixos de exemplo. */
Object.assign(I,{
 file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
 download:'<path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14"/>',
 upload:'<path d="M12 16V5M7.5 9 12 4.5 16.5 9M5 20h14"/>',
 folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 idcard:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2"/><path d="M6.5 16c.6-1.6 1.7-2.3 2.5-2.3s1.9.7 2.5 2.3M14.5 10h4M14.5 13.5h3"/>',
 scale:'<path d="M12 4v16M6 20h12M5 8h14"/><path d="M5 8l-2.5 6a3 3 0 0 0 5 0zM19 8l-2.5 6a3 3 0 0 0 5 0z"/>'});
const SX_TODAY='2026-09-30';
const sxDays=(a,b)=>Math.round((Date.parse(b)-Date.parse(a))/864e5);
const sxShort=d=>{const [,m,dd]=d.split('-');return +dd+' '+MONTHS[+m-1].slice(0,3);};
const sxMem=n=>MEMBERS.find(m=>m.n===n&&m.st==='integrado');
const sxInteg=()=>MEMBERS.filter(m=>m.st==='integrado');
const sxMe='Rafael Pereira';
const sxLog=(a,e,x,det)=>LOG.unshift({u:sxMe,a,e,x,det:det||'',d:SX_TODAY,t:'14:'+String(10+LOG.length%40).padStart(2,'0')});
ACOL.Consultou='var(--ink-muted)';ACOL.Registrou='var(--st-int)';ACOL.Encerrou='var(--st-rec)';ACOL.Emitiu='var(--st-int)';
const sxF=(l,body,hint)=>`<label class="fld"><span class="fl">${l}</span>${body}${hint?`<span class="hint">${hint}</span>`:''}<span class="err"></span></label>`;
const sxSel=(name,opts,v,id)=>`<span class="selw"><select name="${name}" ${id?`id="${id}"`:''}>${opts.map(o=>{const [k,t]=Array.isArray(o)?o:[o,o];return `<option value="${esc(k)}" ${k===v?'selected':''}>${esc(t)}</option>`;}).join('')}</select>${ic('updown',14)}</span>`;
const sxErr=(f,name,msg)=>{const el=f.elements[name];const fl=el&&(el.closest?el.closest('.fld'):null);if(fl){fl.classList.add('bad');fl.querySelector('.err').textContent=msg;}return false;};
const sxClr=f=>$$('.fld.bad',f).forEach(x=>{x.classList.remove('bad');const e=x.querySelector('.err');if(e)e.textContent='';});
const sxDlg=(title,sub,body,foot,cls)=>openDlg(dlgHead(title,sub)+`<form class="fgrid one" id="sxF" novalidate>${body}<div class="dfoot">${foot}</div></form>`,'sc-dlg '+(cls||''));
const sxOk=(label)=>`<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${label}</button>`;
const sxHead=(eb,t,lede,act)=>`<header class="ph rise"><div><p class="eb">${eb}</p><h1>${t}</h1><p class="lede">${lede}</p></div><div class="pact">${act||''}</div></header>`;
const sxKpis=(l)=>`<section class="card kpis4 rise${l.length===3?' k3':''}" style="--d:1">${l.map(k=>`<div class="k4"><span class="kl">${k[0]}</span><span class="kv" ${k[3]?`style="color:${k[3]}"`:''}>${k[1]}</span><span class="kd">${k[2]}</span></div>`).join('')}</section>`;
const sxSeg=(act,items,cur)=>`<div class="segc up-tabs rise" style="--d:2" role="tablist">${items.map(t=>`<button data-a="${act}" data-v="${t[0]}" aria-pressed="${cur===t[0]}">${t[1]}${t[2]!==undefined?`<small class="cm-n">${t[2]}</small>`:''}</button>`).join('')}</div>`;
const sxAv=n=>`<span class="av" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`;
const sxPill=(t,c,b)=>`<span class="stp" style="--c:${c};--b:${b}"><i></i>${t}</span>`;
const sxOpenMember=id=>{closeDlg();S.member=id;S.tab='geral';S.active='membros';render();window.scrollTo(0,0);};
Object.assign(S,{sxSit:'todas',sxAto:'todos',sxDocT:'emitidos',sxArq:'todas',sxArqQ:'',sxCg:'mandatos',sxRel:'mov',sxMes:'10',sxDi:'todos',sxIc:'2026'});

/* ---------- permissões e menu ---------- */
(()=>{
 const g=NAV.find(x=>x[0]==='Gestão')[1];
 g.unshift(['secretaria','file','Secretaria',[['sec-vis','Visão geral'],['sec-atos','Atos'],['sec-docs','Documentos'],['sec-cargos','Cargos e mandatos'],['sec-ana','Análises']]]);
 NAV.find(x=>x[0]==='Geral')[1].find(n=>n[0]==='cuidado')[3].push(['disciplina','Disciplina']);
 SAREAS.push(['Secretaria','file']);
 ['Secretaria','Disciplina'].forEach(k=>MODS.push(k));
 Object.keys(RPERM).forEach(r=>{RPERM[r].Secretaria=r==='Administrador'||r==='Secretaria'?ACTS.slice():r==='Pastor'?['Ver','Criar','Editar']:[];RPERM[r].Disciplina=r==='Administrador'?ACTS.slice():[];});
})();

/* ---------- situação do membro ---------- */
const SX_SITS={
 ativo:['Ativo','var(--st-int)','var(--st-int-bg)','Volta ao app e às listas, sem papéis nem lugares: quem lidera o recoloca.'],
 afastado:['Afastado','var(--st-sol)','var(--st-sol-bg)','Perde o acesso e sai de tudo (mandatos, escalas, casas e rede de discipulado), como no desligamento. Pode ser reativado sem nova integração, mas volta sem nada: quem lidera o coloca de novo onde quiser.'],
 transferido:['Transferido','var(--st-ace)','var(--st-ace-bg)','Saiu para outra igreja. O acesso ao painel e ao app é encerrado.'],
 desligado:['Desligado','var(--st-rec)','var(--st-rec-bg)','Deixou de ser membro. O acesso é encerrado e os mandatos vigentes terminam.'],
 falecido:['Falecido','var(--ink-muted)','var(--surface-2)','Registro de falecimento. O acesso é encerrado e os mandatos vigentes terminam.']};
const SX_BLOCK=['transferido','desligado','falecido'],SX_OUT=[...SX_BLOCK,'afastado'];
/* Impacto da mudança de situação no Cuidado: o painel mostra só números; nada é reatribuído sozinho (quem lidera é avisado e decide) */
const sxNode=m=>DISC.find(d=>d.n===m.n);
function sxImpact(m){const d=sxNode(m),ks=d?kids(d.id):[];
 return {disc:ks.length,meets:(d?d.meets.filter(e=>e.type==='sched').length:0)+ks.reduce((a,k)=>a+k.meets.filter(e=>e.type==='sched').length,0),cases:CASES.filter(c=>c.resp===m.n&&c.st!=='resolvido').length,mands:SX_MAND.filter(x=>x.pessoa===m.n&&sxMandSt(x)!=='encerrado').length,docs:SX_DOCS.filter(x=>x.mid===m.id&&x.st==='valido').length};}
function sxImpactHtml(m,s){const i=sxImpact(m),kv=(k,v)=>`<p class="sx-kv"><span>${k}</span><b>${v}</b></p>`,pl=(n,a,b)=>n+' '+(n===1?a:b);let r=[];
 if(s==='ativo'){r.push(kv('Acesso ao app','Reativado, sem papéis'));r.push(kv('O que ele exercia','Nada volta: rede, casas, escalas, tarefas, mandatos e documentos precisam ser dados de novo'));}
 else{const fim=SX_BLOCK.includes(s);
  r.push(kv('Acesso ao app',fim?'Encerrado':'Perdido (pode ser reativado)'));
  if(i.disc)r.push(kv('Discipulado',pl(i.disc,'discípulo fica','discípulos ficam')+' sem discipulador · a vaga fica cinza até alguém ser colocado'));
  if(i.cases)r.push(kv('Acompanhamento',pl(i.cases,'caso fica','casos ficam')+' sem responsável · quem administra o Acompanhamento é avisado'));
  r.push(kv('Encontros agendados',i.meets?pl(i.meets,'cancelado','cancelados'):'Nenhum a cancelar'));
  if(i.mands)r.push(kv('Mandatos',pl(i.mands,'mandato encerrado','mandatos encerrados')));
  if(i.docs)r.push(kv('Documentos',pl(i.docs,'documento revogado','documentos revogados')));}
 return `<h4 class="sx-h4">O que muda ao confirmar</h4>${r.join('')}${s==='ativo'?'':'<p class="who" style="margin:8px 0 0">Nada é reatribuído sozinho: a vaga no discipulado, o responsável de caso e o líder ficam com quem administra a área, e os líderes e administradores são avisados.</p>'}`;}
const SX_SIT={};
const sxSitOf=m=>m.st!=='integrado'?null:(SX_SIT[m.id]?SX_SIT[m.id].s:'ativo');
const sxSitPill=s=>sxPill(SX_SITS[s][0],SX_SITS[s][1],SX_SITS[s][2]);
function sxSetSit(m,s,o){
 const r=SX_SIT[m.id]||(SX_SIT[m.id]={s:'ativo',h:[]});
 r.h.unshift({d:o.d||SX_TODAY,s,from:r.s,why:o.why||'',dest:o.dest||'',by:sxMe});r.s=s;
 if(SX_OUT.includes(s)){sxEndMands(m);if(m.app&&m.app.st==='ativo')m.app.st='suspensa';const u=USERS.find(x=>x.n===m.n);if(u)u.revoked=true;}
 else if(s==='ativo'){if(m.app&&m.app.st==='suspensa')m.app.st='ativo';const u=USERS.find(x=>x.n===m.n);if(u)u.revoked=false;}
 sxLog('Alterou','Membro',m.n,'Situação: '+SX_SITS[r.h[0].from][0]+' → '+SX_SITS[s][0]);
}
[['Elisa Moura','afastado','2026-08-12','Mudança temporária de cidade por trabalho',''],['Patrícia Oliveira Nunes','transferido','2026-07-03','Mudou de cidade','Igreja de fora · Comunidade Esperança, Curitiba'],['Bruno Reis','desligado','2026-06-20','Pedido do próprio membro',''],['Diego Faria','falecido','2026-05-02','Falecimento comunicado pela família','']].forEach(([n,s,d,why,dest])=>{const m=sxMem(n);if(m){SX_SIT[m.id]={s,h:[{d,s,from:'ativo',why,dest,by:sxMe}]};if((SX_BLOCK.includes(s)||s==='afastado')&&m.app&&m.app.st==='ativo')m.app.st='suspensa';}});
{const _f=filtered;filtered=()=>_f().filter(m=>S.sxSit==='todas'||sxSitOf(m)===S.sxSit);}
{const _row=row;row=m=>{const h=_row(m),s=sxSitOf(m);if(!s||s==='ativo')return h;const sp=stPill(m.st);return h.replace(sp+'</span>',sp+sxSitPill(s)+'</span>');};}
{const _m=members;members=()=>{const h=_m(),c=k=>sxInteg().filter(m=>sxSitOf(m)===k).length;
 const bar=`<div class="sx-sitbar rise" style="--d:2"><span class="sx-sl">Situação</span><div class="chips" role="tablist" aria-label="Situação do membro">${[['todas','Todas',null],...Object.keys(SX_SITS).map(k=>[k,SX_SITS[k][0],c(k)])].map(x=>`<button role="tab" class="chipf ${S.sxSit===x[0]?'on':''}" data-a="sxSitF" data-v="${x[0]}" aria-selected="${S.sxSit===x[0]}">${x[0]!=='todas'?`<i style="background:${SX_SITS[x[0]][1]}"></i>`:''}${x[1]}${x[2]!==null?`<small>${x[2]}</small>`:''}</button>`).join('')}</div></div>`;
 return h.replace('<section class="card mtab rise" style="--d:3"',bar+'<section class="card mtab rise" style="--d:3"');};}
{const _p=profile;profile=()=>{let h=_p();const m=byId(S.member);if(!m||m.st!=='integrado')return h;const s=sxSitOf(m),r=SX_SIT[m.id];
 h=h.replace('<div class="pchips">','<div class="pchips"><span class="chip st" style="--c:'+SX_SITS[s][1]+';--b:'+SX_SITS[s][2]+'"><i></i>'+SX_SITS[s][0]+'</span>');
 h=h.replace('<button class="pi" data-a="inactivate">'+ic('pause',17)+'Inativar cadastro</button>','<button class="pi" data-a="sxSitDlg">'+ic('swap',17)+'Alterar situação</button>');
 if(s!=='ativo'&&r){const l=r.h[0];h=h.replace('<div id="ptab" class="rise" style="--d:2">','<div class="sx-note rise" style="--d:1;--c:'+SX_SITS[s][1]+'">'+ic(SX_BLOCK.includes(s)?'lock':'info',17,2)+'<span><b>'+SX_SITS[s][0]+' desde '+dBR(l.d)+'</b>'+(l.why?' · '+esc(l.why):'')+(l.dest?' · '+esc(l.dest):'')+'<br><small>'+SX_SITS[s][3]+'</small></span><button class="btn sec" data-a="sxSitDlg" data-v="ativo">Voltar a ativo</button></div><div id="ptab" class="rise" style="--d:2">');}
 return h;};}
{const _h=history;history=m=>{const h=_h(m),r=SX_SIT[m.id];
 if(r)r.h.slice().reverse().forEach(x=>h.push(['Situação: '+SX_SITS[x.s][0]+(x.why?' — '+x.why:''),x.by,'rp',sxShort(x.d)]));
 sxAtosOf(m).forEach(a=>h.push([sxAtoHist(a)+(a.dec==='aceito'?' · aceito'+(a.cargo?' como '+a.cargo:''):''),a.decBy||a.of||'Secretaria','rp',sxShort(a.d)]));
 SX_DOCS.filter(d=>d.mid===m.id).forEach(d=>h.push(['Emitido(a): '+d.t+' nº '+d.num,d.by,'rp',sxShort(d.d)]));
 return h;};}
Object.assign(A,{
 sxSitF:v=>{S.sxSit=v;render();},
 sxSitDlg:v=>{closePops();const m=byId(S.member);if(!m||m.st!=='integrado')return;const cur=sxSitOf(m);
  const opts=Object.keys(SX_SITS).filter(k=>k!==cur).map(k=>[k,SX_SITS[k][0]]),first=v&&v!==cur?v:opts[0][0];
  sxDlg('Alterar situação',esc(m.n)+' · hoje '+SX_SITS[cur][0].toLowerCase(),
   sxF('Nova situação',sxSel('s',opts,first,'sxS'))+`<p class="sx-eff" id="sxEff"></p><div id="sxImp"></div>`
   +`<div id="sxDest" hidden>${sxF('Para onde',sxSel('dk',[['int','Outra igreja da organização (usa Trocar igreja)'],['out','Igreja de fora']],'out'))}<div id="sxDestN">${sxF('Nome da igreja de destino','<input name="dn" placeholder="Ex.: Comunidade Esperança, Curitiba" autocomplete="off">')}</div></div>`
   +sxF('Data',`<input type="date" name="d" value="${SX_TODAY}" max="${SX_TODAY}">`)+sxF('Motivo','<input name="why" placeholder="Obrigatório, exceto ao voltar a ativo" autocomplete="off">'),
   sxOk('Salvar situação'));
  const f=$('#sxF'),upd=()=>{const s=f.s.value;$('#sxEff').innerHTML=ic(SX_BLOCK.includes(s)?'lock':'info',14,2)+' '+SX_SITS[s][3];$('#sxImp').innerHTML=sxImpactHtml(m,s);$('#sxDest').hidden=s!=='transferido';$('#sxDestN').hidden=f.dk.value!=='out';};
  f.s.onchange=upd;f.dk.onchange=upd;upd();
  f.onsubmit=e=>{e.preventDefault();sxClr(f);const s=f.s.value;
   if(s==='transferido'&&f.dk.value==='int'){closeDlg();toast('A transferência dentro da organização é feita em Trocar igreja');A.idMemberChurch();return;}
   if(s!=='ativo'&&!f.why.value.trim())return sxErr(f,'why','Informe o motivo');
   if(s==='transferido'&&!f.dn.value.trim())return sxErr(f,'dn','Informe a igreja de destino');
   if(!f.d.value)return sxErr(f,'d','Informe a data');
   const dest=s==='transferido'?'Igreja de fora · '+f.dn.value.trim():'';
   sxSetSit(m,s,{d:f.d.value,why:f.why.value.trim(),dest});closeDlg();render();toast(m.n.split(' ')[0]+': situação alterada para '+SX_SITS[s][0].toLowerCase());
   if(s==='transferido')setTimeout(()=>sxDocDlg({mid:m.id,t:'Carta de transferência',dest:f.dn.value.trim()}),350);};}
});

/* ---------- atos ---------- */
const SX_ATO_T={batismo:['Batismo','bucket'],casamento:['Casamento','heart'],consagracao:['Consagração','flame'],apresentacao:['Apresentação','pacifier']};
/* Atos registrados à mão: feitos aqui sem evento na Agenda, ou informados de outra igreja. Os atos de eventos (apresentação, batismo, consagração e casamento) vêm da Agenda: ver sxEvAtos. */
const SX_ATOS=[
 {id:'at5',t:'batismo',st:'informado',d:'2024-11-10',loc:'Outra igreja (informado pelo membro)',of:'',ppl:['Clara Nunes'],obs:''}];
/* atos que vêm da Agenda: o evento de apresentação, batismo, consagração ou casamento, depois de realizado, vira ato aqui sem duplicar dado */
const sxEvAtos=()=>{
 const out=[];
 BBP.filter(p=>p.st==='realizada').forEach(p=>{const e=bbEv(p);out.push({id:'bb'+p.id,t:'apresentacao',st:'realizado',d:e.d,loc:e.place||e.t,of:e.of||'',ppl:[p.bebe],ro:true,ev:e.id,obs:'Responsáveis: '+p.pais.join(' e ')});});
 EVTS.filter(e=>(e.type==='Batismo'||e.type==='Consagração')&&e.d).forEach(e=>{const ok=CEP.filter(x=>x.ev===e.id&&x.st==='realizada');if(ok.length)out.push({id:'ev'+e.id,t:e.type==='Batismo'?'batismo':'consagracao',st:'realizado',d:e.d,loc:e.place,of:e.of||'',ppl:ok.map(x=>x.ppl[0]),ro:true,ev:e.id,obs:ok.length===1&&ok[0].obs?ok[0].obs:e.t});});
 EVTS.filter(e=>e.type==='Casamento'&&e.d).forEach(e=>{const ok=CEP.filter(x=>x.ev===e.id&&x.st==='realizada');ok.forEach(x=>out.push({id:'evc'+x.id,t:'casamento',st:'realizado',d:e.d,loc:e.place,of:e.of||'',ppl:x.ppl,ro:true,ev:e.id,obs:ok.length>1?'Casamento coletivo: '+ok.length+' casais nesta data.':''}));});
 return out;
};
/* apresentação registrada à mão em Atos entra na lista de "bebês" do certificado, como se viesse da Agenda */
const sxManPres=()=>SX_ATOS.filter(a=>a.t==='apresentacao'&&a.st==='realizado').map(a=>({id:'m'+a.id,bebe:a.ppl[0],nasc:a.nasc||'',pais:a.pais||[],cert:a.ppl[0],st:'realizada',certOk:!!a.certOk,evx:{t:a.loc||'Apresentação',d:a.d,place:a.loc||''},manual:a.id}));
const sxBbP=id=>BBP.find(x=>x.id===id)||sxManPres().find(x=>x.id===id)||null;
const sxAtoAll=()=>[...SX_ATOS,...sxEvAtos()].sort((a,b)=>a.d<b.d?1:-1);
const sxAtosOf=m=>sxAtoAll().filter(a=>a.ppl.includes(m.n));
const sxAtoPill=s=>s==='realizado'?sxPill('Realizado','var(--st-int)','var(--st-int-bg)'):s==='previsto'?sxPill('Previsto','var(--st-sol)','var(--st-sol-bg)'):sxPill('Informado','var(--ink-muted)','var(--surface-2)');

/* ---------- atos automáticos: o que a pessoa declara na ficha ao concluir a integração ----------
   Quando a integração de alguém é concluída, olhamos os três campos declarados na ficha (Batizado, Consagrado, Casado). Para cada "Sim" nasce um ato "em outra igreja",
   PENDENTE DE DECISÃO: a Secretaria Aceita ou Recusa. O ato manual já nasce decidido (a Secretaria julgou ao registrar). Aceitar ou Recusar NUNCA mexe no que a pessoa declarou
   (bap, pastor, civil continuam como estão); Aceitar só liga a validação (bapOk, consOk, marOk) e, na consagração, guarda o cargo (consRole). */
let _auto=0;
const SX_DEC={batismo:['bapOk','Batismo'],consagracao:['consOk','Consagração'],casamento:['marOk','Casamento']};
const sxAtoSit=a=>a.dec==='pendente'?'pendente':a.dec==='recusado'?'recusado':a.st;
const sxAtoPillA=a=>a.dec==='pendente'?sxPill('Pendente de decisão','var(--st-sol)','var(--st-sol-bg)'):a.dec==='recusado'?sxPill('Recusado','var(--st-rec)','var(--st-rec-bg)'):a.dec==='aceito'?sxPill('Informado · aceito','var(--st-ace)','var(--st-ace-bg)'):sxAtoPill(a.st);
const sxSpouse=m=>{const f=(m.fam||[]).find(x=>/c[ôo]njuge|esposa|marido/i.test(x[1]));const p=f&&byId(f[0]);return p?p.n:'';};
function sxAutoAtos(m,when){
 const out=[],has=t=>sxAtoAll().some(a=>a.t===t&&a.ppl.includes(m.n)),mk=(t,ppl,obs)=>({id:'au'+(++_auto),t,st:'informado',auto:true,dec:'pendente',mid:m.id,d:when,loc:'Outra igreja (declarado na integração)',of:'',ppl,obs:obs||'Declarado na ficha ao concluir a integração.'});
 if(m.bap&&!has('batismo'))out.push(mk('batismo',[m.n]));
 if(m.pastor&&!has('consagracao'))out.push(mk('consagracao',[m.n]));
 if(m.civil==='Casado(a)'&&!has('casamento')){const sp=sxSpouse(m);out.push(mk('casamento',sp?[m.n,sp]:[m.n],sp?'':'Declarado na ficha ao concluir a integração. Cônjuge não informado.'));}
 out.forEach(a=>SX_ATOS.unshift(a));return out;
}
/* chamado quando a integração de alguém é concluída */
function sxIntegrated(m){
 const n=sxAutoAtos(m,SX_TODAY);
 if(n.length)sxLog('Registrou','Ato',n.length+(n.length>1?' atos declarados':' ato declarado')+' na integração de '+m.n,'Pendente de decisão');
 return n.length?n.length+(n.length>1?' atos declarados aguardam':' ato declarado aguarda')+' decisão em Secretaria › Atos.':'';
}
/* curadoria do protótipo: alguns membros já integrados com atos declarados em cada estado */
(()=>{const mk=(nm,t,dec,o={})=>{const m=MEMBERS.find(x=>x.n===nm);if(!m)return;
  const a={id:'au'+(++_auto),t,st:'informado',auto:true,dec,mid:m.id,d:m.int+'-26',loc:'Outra igreja (declarado na integração)',of:'',ppl:[nm],obs:o.obs||'Declarado na ficha ao concluir a integração.'};
  if(dec!=='pendente'){a.decBy=sxMe;a.decAt=o.at||'2026-09-28';}if(o.cargo)a.cargo=o.cargo;if(o.why)a.why=o.why;
  if(t==='consagracao')m.pastor=true;if(t==='batismo')m.bap=true;
  if(dec==='aceito'){m[SX_DEC[t][0]]=true;if(o.cargo)m.consRole=o.cargo;}
  SX_ATOS.push(a);};
 mk('Felipe Andrade','batismo','pendente');mk('Renata Campos','consagracao','pendente');mk('Patrícia Oliveira Nunes','casamento','pendente',{obs:'Declarado na ficha ao concluir a integração. Cônjuge não informado.'});
 mk('Otávio Lins','batismo','aceito');mk('Diego Faria','consagracao','aceito',{cargo:'Diácono(a)'});mk('Larissa Pires','casamento','recusado',{why:'Sem comprovação'});})();
{const m=MEMBERS.find(x=>x.n==='Clara Nunes'),a=SX_ATOS.find(x=>x.id==='at5');if(a&&m){a.dec='aceito';a.decBy=sxMe;a.decAt='2024-11-10';m.bapOk=true;}}
const sxAtoHist=a=>SX_ATO_T[a.t][0]+(a.dec==='pendente'?' (declarado, aguardando decisão)':a.dec==='recusado'?' (outra igreja, recusado)':a.st==='informado'?' (informado, outra igreja)':'');
/* ficha: o que foi declarado e o que a Secretaria decidiu */
function sxRecon(m){
 const l=SX_ATOS.filter(a=>a.auto&&a.mid===m.id);if(!l.length)return '';
 return `<section class="card pc"><div class="sh"><div><h2>Declarado na integração</h2><p class="who" style="margin:4px 0 0">A Secretaria decide se reconhece. A decisão não muda o que a pessoa declarou.</p></div></div>
  <div class="clist">${l.map(a=>`<button class="dk" data-a="sxAtoOpen" data-v="${a.id}"><span class="sx-ti">${ic(SX_ATO_T[a.t][1],18)}</span><span class="dkt"><b>${SX_ATO_T[a.t][0]}${a.t==='consagracao'&&a.cargo?' · '+esc(a.cargo):''}</b><span>${a.dec==='pendente'?'Aguardando decisão da Secretaria':a.dec==='aceito'?'Aceito por '+esc(a.decBy)+' em '+dBR(a.decAt):'Recusado por '+esc(a.decBy)+' em '+dBR(a.decAt)+(a.why?' · '+esc(a.why):'')}</span></span>${sxAtoPillA(a)}</button>`).join('')}</div></section>`;
}
/* decisão da Secretaria sobre um ato automático */
function sxAtoDecide(id,kind){
 const a=SX_ATOS.find(x=>x.id===id);if(!a||!a.auto||a.dec!=='pendente')return;const m=byId(a.mid),T=SX_ATO_T[a.t][0],cons=a.t==='consagracao';
 const nm=a.ppl.join(' & ');
 if(kind==='aceitar'){
  const roles=['Diácono(a)','Presbítero(a)','Evangelista','Missionário(a)','Pastor(a)','Outro'];
  sxDlg('Aceitar '+T.toLowerCase(),esc(nm)+' · feito em outra igreja',
   `<p class="hint" style="margin:0">A Secretaria reconhece o que ${esc(m?m.n.split(' ')[0]:'a pessoa')} declarou. O que está na ficha não muda: só a validação fica registrada.${cons?' Escolha o cargo da consagração.':''}</p>`
   +(cons?sxF('Cargo da consagração',sxSel('cg',roles,'Diácono(a)'))+`<div id="cgOW" hidden>${sxF('Qual cargo?','<input name="cgo" placeholder="Ex.: Missionário(a)" autocomplete="off">')}</div><p class="hint" style="margin:0">Guardar o cargo não cria mandato nem acesso: isso continua em Cargos e mandatos.</p>`:''),sxOk('Aceitar'));
  const f=$('#sxF');if(cons)f.cg.onchange=()=>{$('#cgOW').hidden=f.cg.value!=='Outro';};
  f.onsubmit=e=>{e.preventDefault();sxClr(f);let role='';
   if(cons){role=f.cg.value==='Outro'?f.cgo.value.trim():f.cg.value;if(!role)return sxErr(f,'cgo','Informe o cargo');}
   a.dec='aceito';a.decBy=sxMe;a.decAt=SX_TODAY;if(cons)a.cargo=role;
   if(m){m[SX_DEC[a.t][0]]=true;if(cons)m.consRole=role;}
   sxLog('Aceitou','Ato',T+' declarado de '+nm+(cons?' · cargo '+role:''),'Outra igreja');closeDlg();render();toast(T+' aceito'+(cons?' como '+role:'')+'. A ficha continua como declarada.');};
 }else{
  sxDlg('Recusar '+T.toLowerCase(),esc(nm)+' · feito em outra igreja',sxF('Motivo <small>opcional</small>','<input name="w" maxlength="140" placeholder="Ex.: sem comprovação" autocomplete="off">','O que a pessoa declarou na ficha continua exatamente como está.'),sxOk('Recusar'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();a.dec='recusado';a.decBy=sxMe;a.decAt=SX_TODAY;a.why=f.w.value.trim();
   sxLog('Recusou','Ato',T+' declarado de '+nm,a.why||'Sem motivo');closeDlg();render();toast(T+' recusado. A ficha continua como declarada.');};
 }
}
function secAtos(){
 const all=sxAtoAll(),f=S.sxAto,l=all.filter(a=>f==='todos'||a.t===f),c=k=>all.filter(a=>a.t===k).length;
 const done=all.filter(a=>a.st==='realizado'&&a.d.startsWith('2026')),pp=done.reduce((n,a)=>n+a.ppl.length,0),prev=all.filter(a=>a.st==='previsto');
 return sxHead('Secretaria','Atos','Batismos, casamentos, consagrações e apresentações registrados pela igreja. Alimentam a ficha do membro e as certidões.',`<button class="btn pri" data-a="sxAtoNew">${ic('plus',15,2.2)}Registrar ato</button>`)
 +sxKpis([['Realizados em 2026',done.length,pp+' pessoas envolvidas'],['Previstos',prev.length,prev.length?'próximo: '+dBR(prev.sort((a,b)=>a.d<b.d?-1:1)[0].d):'nenhum agendado',prev.length?'var(--st-sol)':''],['Batismos',c('batismo'),'registrados'],['Casamentos e consagrações',c('casamento')+c('consagracao'),'registrados']])
 +sxSeg('sxAtoF',[['todos','Todos',all.length],['batismo','Batismos',c('batismo')],['casamento','Casamentos',c('casamento')],['consagracao','Consagrações',c('consagracao')],['apresentacao','Apresentações',c('apresentacao')]],f)
 +`<section class="card sx-list rise" style="--d:3">${l.length?l.map(a=>`<button class="sx-r" data-a="sxAtoOpen" data-v="${a.id}"><span class="sx-ti">${ic(SX_ATO_T[a.t][1],20)}</span><span class="sx-m"><b>${SX_ATO_T[a.t][0]} · ${a.ppl.length} ${a.ppl.length>1?'pessoas':'pessoa'}</b><small>${a.ppl.slice(0,3).map(esc).join(', ')}${a.ppl.length>3?' e mais '+(a.ppl.length-3):''}</small></span><span class="sx-c">${dBR(a.d)}<small>${esc(a.loc||'—')}</small></span><span class="sx-s">${sxAtoPill(a.st)}</span><span class="sx-ch">${ic('chevR',16)}</span></button>`).join(''):'<div class="mempty"><p>Nenhum ato por aqui.</p><span>Registre o primeiro em “Registrar ato”.</span></div>'}</section>`;
}
const sxAtoPpl=a=>a.ppl.map(esc).join(a.t==='casamento'?' & ':', ');
function sxAtoView(id){
 const a=sxAtoAll().find(x=>x.id===id);if(!a)return;sxLog('Consultou','Ato',SX_ATO_T[a.t][0]+' de '+dBR(a.d));
 /* só o que aconteceu aqui gera certidão ou certificado; o informado de outra igreja nunca, mesmo depois de aceito */
 const can=a.st==='realizado',inf=a.st==='informado',ev=a.ev&&eById(a.ev),pend=a.auto&&a.dec==='pendente';
 const row=n=>{
  if(a.t==='apresentacao'){const p=a.ro?sxBbP(a.id.slice(2)):sxBbP('m'+a.id),d=p&&bbDoc(p);
   return `<div class="sx-pr">${sxAv(n)}<span class="sx-m"><b>${esc(n)}</b><small>Bebê apresentado${!can?' · outra igreja':d?' · certificado nº '+d.num+(p.certOk?', enviado à família':', ainda não enviado'):' · certificado ainda não emitido'}</small></span>${can&&p?(d?`<button class="btn sec sm" data-a="sxDocOpen" data-v="${d.id}">${ic('file',14)}Ver certificado</button>`:`<button class="btn pri sm" data-a="sxBbCert" data-v="${p.id}">${ic('file',14)}Emitir certificado</button>`):''}</div>`;}
  const m=MEMBERS.find(x=>x.n===n&&x.st==='integrado');
  return `<div class="sx-pr">${sxAv(n)}<span class="sx-m"><b>${esc(n)}</b><small>${m?'Membro':'Fora da igreja / sem ficha'}</small></span>${m?`<button class="lnk" data-a="sxOpenM" data-v="${m.id}">Ficha</button>`:''}${m&&can?`<button class="btn sec sm" data-a="sxDocFromAto" data-v="${m.id}|${a.t}">${ic('file',14)}Emitir ${a.t==='casamento'?'certidão':a.t==='batismo'?'certidão':'certificado'}</button>`:''}</div>`;};
 const dec=a.dec?(pend?`<p class="fi-note">${ic('clock',15)}<span><b>Declarado pela própria pessoa ao concluir a integração</b> (feito em outra igreja). A Secretaria decide se reconhece. Aceitar ou recusar <b>não muda o que ficou na ficha</b>.</span></p>`
   :`<p class="fi-note">${ic(a.dec==='aceito'?'check':'x',15)}<span><b>${a.dec==='aceito'?'Aceito':'Recusado'}</b> por ${esc(a.decBy)} em ${dBR(a.decAt)}${a.dec==='aceito'&&a.cargo?'. Cargo da consagração: <b>'+esc(a.cargo)+'</b>':''}${a.why?'. Motivo: '+esc(a.why):''}. ${a.auto?'A ficha continua como a pessoa declarou.':'Registrado pela Secretaria.'}</span></p>`):'';
 openDlg(dlgHead(SX_ATO_T[a.t][0]+' · '+dBR(a.d),(a.loc?esc(a.loc)+' · ':'')+sxAtoPillA(a).replace(/<[^>]*>/g,'').trim())+`
  ${a.t==='casamento'?`<div class="sx-couple">${a.ppl.map(n=>`<span>${sxAv(n)}<b>${esc(n)}</b></span>`).join('<i>&amp;</i>')}</div>`:''}
  ${a.of?`<p class="sx-kv"><span>Quem oficiou</span><b>${esc(a.of)}</b></p>`:''}${a.obs?`<p class="sx-kv"><span>Observação</span><b>${esc(a.obs)}</b></p>`:''}
  <div class="sx-people">${a.ppl.map(row).join('')}</div>
  ${dec}
  ${inf&&!a.dec?`<p class="fi-note">${ic('info',15)}<span><b>Aconteceu em outra igreja.</b> Consta na ficha, mas a Secretaria não emite certidão nem certificado de algo que não foi celebrado aqui. Quem precisa deve pedir à igreja onde aconteceu.</span></p>`:''}
  ${inf&&a.dec&&!pend?`<p class="fi-note">${ic('info',15)}<span>Mesmo aceito, é um ato de outra igreja: a Secretaria <b>não emite certidão nem certificado</b> dele.</span></p>`:''}
  ${ev?`<p class="fi-note">${ic('info',15)}<span>Gerado do evento <b>${esc(ev.t)}</b>, em Agenda › Eventos. Pedido, vaga e confirmação ficam lá; <b>a certidão ou o certificado é emitido aqui</b>.</span></p>`:''}
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button>${pend?`<button class="btn sec" data-a="sxAtoRecusar" data-v="${a.id}">Recusar</button><button class="btn pri" data-a="sxAtoAceitar" data-v="${a.id}">Aceitar</button>`:''}${ev?`<button class="btn pri" data-a="sxOpenEv" data-v="${ev.id}">Abrir o evento</button>`:''}</div>`,'sc-dlg');
}
function sxAtoNew(){
 const people=sxInteg().filter(m=>!SX_BLOCK.includes(sxSitOf(m)));
 sxDlg('Registrar ato','Atos de apresentação ficam em Agenda › Apresentações.',
  sxF('Tipo',sxSel('t',[['batismo','Batismo'],['casamento','Casamento'],['consagracao','Consagração']],'batismo'))
  +`<div class="fgrid" style="gap:14px">${sxF('Data',`<input type="date" name="d" value="${SX_TODAY}">`,'Data futura = ato previsto')}${sxF('Local','<input name="loc" placeholder="Ex.: Chácara Alva" autocomplete="off">')}</div>`
  +sxF('Quem oficiou','<input name="of" placeholder="Ex.: Pr. Marcos Souza" autocomplete="off">')
  +`<label class="chk3"><input type="checkbox" name="inf"><span>Aconteceu em outra igreja (só informar, sem celebrar aqui)</span></label>`
  +sxF('Pessoas',`<input type="search" id="sxPq" placeholder="Filtrar membros" autocomplete="off" data-scq="pick"><div class="sx-pick" id="sxPick" tabindex="-1">${people.map(m=>`<label data-n="${esc(norm(m.n))}"><input type="checkbox" name="p" value="${m.id}"><span>${sxAv(m.n)}<b>${esc(m.n)}</b></span></label>`).join('')}</div>`)
  +sxF('Pessoas de fora (opcional)','<input name="ext" placeholder="Nomes separados por vírgula" autocomplete="off">','Para quem não tem ficha na igreja, como o cônjuge de um casamento.')
  +sxF('Observação (opcional)','<input name="obs" autocomplete="off">'),sxOk('Registrar'),'sc-wide');
 const f=$('#sxF');
 f.onsubmit=e=>{e.preventDefault();sxClr(f);
  const ids=[...f.querySelectorAll('input[name=p]:checked')].map(x=>x.value),ext=f.ext.value.split(',').map(s=>s.trim()).filter(Boolean),t=f.t.value,inf=f.inf.checked;
  if(!f.d.value)return sxErr(f,'d','Informe a data');
  if(inf&&f.d.value>SX_TODAY)return sxErr(f,'d','Ato informado já aconteceu: use uma data passada');
  const ppl=[...ids.map(i=>byId(i).n),...ext];
  if(!ppl.length)return sxErr(f,'ext','Escolha ao menos uma pessoa');
  if(t==='casamento'&&ppl.length!==2)return sxErr(f,'ext','Casamento tem duas pessoas (ficha ou de fora)');
  const st=inf?'informado':f.d.value>SX_TODAY?'previsto':'realizado';
  const a={id:'at'+Date.now(),t,st,d:f.d.value,loc:inf?(f.loc.value.trim()||'Outra igreja (informado)'):f.loc.value.trim(),of:f.of.value.trim(),ppl,obs:f.obs.value.trim()};
  SX_ATOS.unshift(a);if(t==='batismo'&&st!=='previsto')ids.forEach(i=>{byId(i).bap=true;});
  sxLog('Registrou','Ato',SX_ATO_T[t][0]+' · '+ppl.length+' '+(ppl.length>1?'pessoas':'pessoa'),dBR(a.d));
  closeDlg();render();toast(SX_ATO_T[t][0]+(st==='previsto'?' previsto registrado':' registrado'));};
}
Object.assign(A,{
 sxAtoF:v=>{S.sxAto=v;render();},sxAtoOpen:v=>sxAtoView(v),sxAtoAceitar:v=>{closeDlg();setTimeout(()=>sxAtoDecide(v,'aceitar'),200);},sxAtoRecusar:v=>{closeDlg();setTimeout(()=>sxAtoDecide(v,'recusar'),200);},sxPendGo:()=>{S.sxAto='todos';S.sxAtoSt='pendente';A.nav('sec-atos');},sxAtoNew:()=>sxAtoNew(),sxOpenM:v=>sxOpenMember(v),sxGoBebes:()=>{closeDlg();A.nav('bebes');},
 sxOpenEv:v=>{closeDlg();A.evOpen(v);},
 sxBbCert:v=>{closeDlg();setTimeout(()=>sxDocDlg({t:'Certificado de apresentação',bb:v}),200);},
 sxBbSend:v=>{const d=SX_DOCS.find(x=>x.id===v),p=sxBbP(d.bb),was=p.certOk;p.certOk=true;if(p.manual){const at=SX_ATOS.find(z=>z.id===p.manual);if(at)at.certOk=true;}sxLog('Enviou','Documento',d.t+' nº '+d.num,p.pais.join(' e '));closeDlg();render();toast(`${was?'Certificado reenviado':'Certificado enviado'} para ${p.pais.map(n=>n.split(' ')[0]).join(' e ')}: no app e por e-mail.`);},
 sxDocFromAto:v=>{const [id,t]=v.split('|');closeDlg();setTimeout(()=>sxDocDlg({mid:id,t:t==='batismo'?'Certidão de batismo':t==='casamento'?'Certidão de casamento':'Certificado de consagração'}),200);}
});

/* ---------- documentos emitidos ---------- */
const sxAtoOf=(m,t)=>sxAtosOf(m).find(a=>a.t===t&&a.st!=='previsto');
/* certidão e certificado só saem de ato realizado aqui: "informado" (de outra igreja) nunca emite */
const sxNeedAto=(m,t,rotulo)=>{const l=sxAtosOf(m).filter(a=>a.t===t&&a.dec!=='recusado');return l.some(a=>a.st==='realizado')?'':l.length?`O ${rotulo} consta como informado, feito em outra igreja. A certidão ou o certificado deve ser pedido à igreja onde aconteceu.`:`Sem registro de ${rotulo} celebrado nesta igreja. Registre o ato ou conclua-o no evento da Agenda.`;};
const SX_DOC_T={
 'Certidão de batismo':{ic:'bucket',need:m=>sxNeedAto(m,'batismo','batismo'),
  txt:m=>{const a=sxAtosOf(m).find(a=>a.t==='batismo'&&a.st==='realizado');return `Certificamos que ${m.n} foi batizado(a) nas águas em ${dBR(a.d)}${a.loc?', em '+a.loc:''}, conforme o livro de atos desta igreja.`;}},
 'Certidão de casamento':{ic:'heart',need:m=>sxNeedAto(m,'casamento','casamento'),
  txt:m=>{const a=sxAtosOf(m).find(a=>a.t==='casamento'&&a.st==='realizado'),o=a.ppl.filter(n=>n!==m.n);return `Certificamos que ${m.n}${o.length?' e '+o.join(' e '):''} contraíram matrimônio em ${dBR(a.d)}${a.loc?', em '+a.loc:''}, celebrado por ${a.of||'ministro desta igreja'}, conforme o livro de atos.`;}},
 'Certificado de consagração':{ic:'flame',need:m=>sxNeedAto(m,'consagracao','consagração'),
  txt:m=>{const a=sxAtosOf(m).find(a=>a.t==='consagracao'&&a.st==='realizado');return `Certificamos que ${m.n} foi consagrado(a) em ${dBR(a.d)}${a.obs&&!/^Consagração de/.test(a.obs)?' — '+a.obs.replace(/\.$/,''):''}, conforme o livro de atos desta igreja.`;}},
 'Certificado de apresentação':{ic:'pacifier',bb:true,need:b=>b.bbp.st==='realizada'?'':'A apresentação ainda não foi realizada.',
  txt:b=>{const p=b.bbp,e=bbEv(p);return `Certificamos que ${b.n}, nascido(a) em ${dBR(p.nasc)}, filho(a) de ${p.pais.join(' e ')}, foi apresentado(a) ao Senhor diante da igreja reunida em ${dBR(e.d)}.`;}},
 'Certificado de integração':{ic:'check',need:m=>!INTR.cert?'O certificado de integração está desligado em Pessoas › Integração › Regras.':m.int?'':'Sem integração concluída.',
  txt:m=>`Certificamos que ${m.n} concluiu a integração desta igreja em ${MONTHS[+m.int.slice(5)-1]} de ${m.int.slice(0,4)}, conforme os registros de integração.`},
 'Declaração de membro':{ic:'idcard',need:m=>sxSitOf(m)==='ativo'?'':'Só membros ativos recebem declaração.',
  txt:m=>`Declaramos que ${m.n} é membro ativo desta igreja desde ${MONTHS[+m.int.slice(5)-1]} de ${m.int.slice(0,4)}, em plena comunhão.`},
 'Carta de recomendação':{ic:'mail',dest:true,need:m=>sxSitOf(m)==='ativo'?'':'Só membros ativos recebem carta de recomendação.',
  txt:(m,o)=>`Recomendamos ${m.n}, membro ativo desta igreja, ${o.dest?'à comunidade '+o.dest:'a quem possa interessar'}, para participar da vida e do serviço da igreja que o(a) receber.`},
 'Carta de transferência':{ic:'swap',dest:true,need:m=>['ativo','transferido'].includes(sxSitOf(m))?'':'A carta de transferência é emitida para membro ativo ou já transferido.',
  txt:(m,o)=>`Informamos que ${m.n} foi membro desta igreja em plena comunhão e está sendo transferido(a)${o.dest?' para '+o.dest:''}, com a nossa recomendação.`}};
const SX_DOCS=[];
/* modelos dos documentos: uma pasta de versões por tipo; a mais nova é a ativa */
const SX_MOD={};
const sxModFile=t=>'modelo-'+norm(t).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.docx';
const sxModOf=t=>SX_MOD[t]||(SX_MOD[t]=[{v:1,file:sxModFile(t),by:'Marcos Souza Ramos',d:'2026-03-02',sz:'36 KB',note:'Modelo inicial'}]);
const sxCode=n=>'AV'+(10000+n*7919%90000)+'KQXMR'[n%5];
const sxNewDoc=(t,m,o)=>{const n=SX_DOCS.length+1,T=SX_DOC_T[t];const d={id:'dc'+n,num:'2026-'+String(n).padStart(4,'0'),t,mid:m.id,bb:m.bbp?m.bbp.id:'',pessoa:m.n,d:o.d||SX_TODAY,by:o.by||sxMe,sig:o.sig||'Marcos Souza Ramos — Pastor presidente',dest:o.dest||'',obs:o.obs||'',st:'valido',code:sxCode(n),text:T.txt(m,o),mv:T.fin?0:sxModOf(t)[0].v};SX_DOCS.push(d);return d;};
[['Certidão de batismo','Ana Clara Lima','2026-06-20'],['Certidão de batismo','Helena Duarte','2026-06-20'],['Declaração de membro','Juliana Costa Ferreira','2026-08-04'],['Carta de transferência','Patrícia Oliveira Nunes','2026-07-03','Comunidade Esperança, Curitiba'],['Carta de recomendação','Thiago Barros','2026-09-12','Igreja Batista Central'],['Certificado de consagração','Larissa Pires','2026-04-15'],['Declaração de membro','Bruno Reis','2026-05-10']].forEach(([t,n,d,dest])=>{const m=sxMem(n);if(m)sxNewDoc(t,m,{d,dest});});
{const x=SX_DOCS[SX_DOCS.length-1];if(x){x.st='revogado';x.why='Membro desligado em 20/06/2026';}}
BBP.filter(p=>p.certOk).forEach(p=>sxNewDoc('Certificado de apresentação',{id:'bb'+p.id,n:p.cert,bbp:p},{d:'2026-09-06'}));
/* modelos: a versão mais nova de cada tipo é a ativa */
Object.keys(SX_DOC_T).forEach(t=>{if(!SX_DOC_T[t].fin)sxModOf(t);});
['Certidão de batismo','Declaração de membro'].forEach(t=>SX_MOD[t].unshift({v:2,file:sxModFile(t),by:'Thiago Barros',d:'2026-08-20',sz:'38 KB',note:'Ajuste na linha de assinatura'}));
function sxRevokeDocs(m){SX_DOCS.filter(d=>d.mid===m.id&&d.st==='valido'&&['Declaração de membro','Carta de recomendação'].includes(d.t)).forEach(d=>{d.st='revogado';d.why='Membro '+SX_SITS[sxSitOf(m)][0].toLowerCase()+' em '+dBR(SX_SIT[m.id].h[0].d);});}
const sxSigners=()=>SX_MAND.filter(x=>sxMandSt(x)==='vigente'&&['Pastor presidente','Secretário(a)'].includes(sxCargo(x.cg).n)).map(x=>[x.pessoa+' — '+sxCargo(x.cg).n,x.pessoa+' — '+sxCargo(x.cg).n]);
function sxDocDlg(pre){
 pre=pre||{};const sig=sxSigners(),ms=sxInteg().filter(m=>sxSitOf(m)!=='falecido'),bbs=[...BBP.filter(p=>p.st==='realizada'),...sxManPres()].sort((a,b)=>bbEv(a).d<bbEv(b).d?1:-1);
 sxDlg('Emitir documento','Certidões, declarações e cartas com número e código de validação.',
  sxF('Tipo',sxSel('t',Object.keys(SX_DOC_T),pre.t||'Certidão de batismo','sxT'))
  +`<div id="sxPw">${sxF('Pessoa',sxSel('m',ms.map(m=>[m.id,m.n+(sxSitOf(m)!=='ativo'?' · '+SX_SITS[sxSitOf(m)][0].toLowerCase():'')]),pre.mid||ms[0].id))}</div>`
  +`<div id="sxBw" hidden>${sxF('Bebê apresentado',sxSel('bb',bbs.map(p=>[p.id,p.cert+' · '+dBR(bbEv(p).d)+(bbDoc(p)?' · já emitido':'')]),pre.bb||(bbs[0]||{}).id),bbs.length?'Só apresentações realizadas. O nome é o que a família confirmou em Agenda › Apresentações.':'Nenhuma apresentação realizada ainda.')}</div>`
  +`<div id="sxDw" hidden>${sxF('Igreja ou comunidade de destino','<input name="dest" placeholder="Opcional na recomendação" autocomplete="off" value="'+esc(pre.dest||'')+'">')}</div>`
  +sxF('Assinado por',sig.length?sxSel('sig',sig,sig[0][0]):'<input name="sig" disabled value="Sem signatário vigente">',sig.length?'Vem dos mandatos vigentes (Pastor presidente e Secretário).':'Cadastre o mandato do Pastor presidente em Cargos e mandatos.')
  +sxF('Observação (opcional)','<input name="obs" autocomplete="off">')+'<div id="sxPv"></div>',sxOk('Emitir documento'));
 const f=$('#sxF'),upd=()=>{const T=SX_DOC_T[f.t.value];$('#sxDw').hidden=!T.dest;$('#sxPw').hidden=!!T.bb;$('#sxBw').hidden=!T.bb;};const pv=()=>{const t=f.t.value,T=SX_DOC_T[t];let m;if(T.bb){const p=sxBbP(f.bb.value);m=p&&{id:'bb'+p.id,n:p.cert,bbp:p};}else m=byId(f.m.value);
  const box=$('#sxPv');if(!m){box.innerHTML='';return;}const why=T.need(m);
  box.innerHTML=why?`<p class="fi-note">${ic('alert',15)}<span><b>Ainda não dá para emitir.</b> ${esc(why)}</span></p>`:`<div class="sx-pv"><span class="fl">Prévia do documento</span><div class="sx-paper"><h2>${esc(t.toUpperCase())}</h2><p>${esc(T.txt(m,{dest:f.dest.value.trim()}))}</p><p class="sx-city">São Paulo, ${dBR(SX_TODAY)}.</p></div><span class="hint">O texto é fixado na emissão. Número, assinatura e código de validação são gerados ao emitir.</span></div>`;};
 f.t.onchange=()=>{upd();pv();};f.m.onchange=pv;f.bb.onchange=pv;f.dest.oninput=pv;upd();pv();
 f.onsubmit=e=>{e.preventDefault();sxClr(f);const t=f.t.value,T=SX_DOC_T[t];let m,fld='m';
  if(T.bb){fld='bb';const p=sxBbP(f.bb.value);if(!p)return sxErr(f,'bb','Escolha a apresentação');const ja=SX_DOCS.find(x=>x.bb===p.id&&x.st==='valido');if(ja)return sxErr(f,'bb','Já existe o certificado nº '+ja.num+'. Revogue-o para emitir outro.');m={id:'bb'+p.id,n:p.cert,bbp:p};}else m=byId(f.m.value);
  const why=T.need(m);if(why)return sxErr(f,fld,why);
  if(!sig.length)return sxErr(f,'sig','Sem signatário: cadastre o mandato do Pastor presidente.');
  if(t==='Carta de transferência'&&!f.dest.value.trim())return sxErr(f,'dest','Informe a igreja de destino');
  const d=sxNewDoc(t,m,{dest:f.dest.value.trim(),sig:f.sig.value,obs:f.obs.value.trim()});sxLog('Emitiu','Documento',t+' nº '+d.num,m.n);
  closeDlg();render();toast(t+' nº '+d.num+' emitido(a)');setTimeout(()=>sxDocView(d.id),250);};
}
function sxDocView(id){
 const d=SX_DOCS.find(x=>x.id===id),m=byId(d.mid);if(!d)return;sxLog('Consultou','Documento',d.t+' nº '+d.num,d.pessoa);
 const [sn,sc]=d.sig.split(' — ');
 openDlg(dlgHead(d.t,'Nº '+d.num+' · emitido em '+dBR(d.d)+' por '+esc(d.by)+(d.mv?' · modelo v'+d.mv:''))+`<div class="sx-paper ${d.st==='revogado'?'rev':''}">${d.st==='revogado'?'<span class="sx-stamp">Revogado</span>':''}
  <div class="sx-ph">${sunMark(18)}<b>Alva Sede</b><small>Av. Paulista, 1200 · São Paulo, SP</small></div><h2>${esc(d.t.toUpperCase())}</h2><p>${esc(d.text)}</p>${d.obs?`<p class="sx-obs">${esc(d.obs)}</p>`:''}<p class="sx-city">São Paulo, ${dBR(d.d)}.</p>
  <div class="sx-sg"><div class="sx-sig"><span></span><b>${esc(sn)}</b><small>${esc(sc||'')}</small></div><div class="sx-val">${qrSvg(parseInt(d.num.replace('-','')))}<span>Código de validação<br><b>${d.code}</b></span></div></div></div>
  ${d.st==='revogado'?`<p class="fi-note">${ic('alert',15)}<span><b>Documento revogado.</b> ${esc(d.why||'')}</span></p>`:''}
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button>${d.st==='valido'?`<button class="btn sec" data-a="sxDocRevoke" data-v="${d.id}">Revogar</button>`:''}<button class="btn sec" data-a="sxToast" data-v="PDF gerado e baixado (simulado)">${ic('download',15)}Baixar PDF</button>${d.bb?`<button class="btn pri" data-a="sxBbSend" data-v="${d.id}" ${d.st==='valido'?'':'disabled'}>${ic('mail',15)}${BBP.find(x=>x.id===d.bb).certOk?'Reenviar à família':'Enviar à família'}</button>`:`<button class="btn pri" data-a="${m&&m.e?'sxToast':''}" data-v="${m&&m.e?'Enviado para '+esc(m.e)+' (simulado)':''}" ${m&&m.e?'':'disabled title="Sem e-mail cadastrado"'}>${ic('mail',15)}Enviar por e-mail</button>`}</div>`,'sc-dlg sc-wide');
}
function sxValidate(){
 openDlg(dlgHead('Validar documento','Qualquer pessoa pode conferir o código impresso, sem entrar no sistema.')+`<form id="sxF" class="fgrid one" novalidate>${sxF('Código de validação','<input name="c" placeholder="Ex.: AV25919K" autocomplete="off">')}<div id="sxRes"></div><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Fechar</button><button type="submit" class="btn pri">Validar</button></div></form>`,'sc-dlg');
 const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();const c=f.c.value.trim().toUpperCase(),d=SX_DOCS.find(x=>x.code===c),r=$('#sxRes');
  r.innerHTML=!c?'':!d?`<div class="sx-vr bad">${ic('x',18,2.2)}<span><b>Código não encontrado</b><small>Confira o código ou peça outra via à secretaria.</small></span></div>`
  :d.st==='revogado'?`<div class="sx-vr bad">${ic('alert',18,2)}<span><b>Documento revogado</b><small>${esc(d.t)} nº ${d.num} · ${esc(d.why||'')}</small></span></div>`
  :`<div class="sx-vr ok">${ic('check',18,2.4)}<span><b>Documento válido</b><small>${esc(d.t)} nº ${d.num} · ${esc(d.pessoa.split(' ')[0]+' '+d.pessoa.split(' ').slice(-1)[0][0])}. · emitido em ${dBR(d.d)} por Alva Sede</small></span></div>`;};
}

/* ---------- arquivo da secretaria ---------- */
const SX_CATS=['Estatuto e registro','Atas','Contratos e certidões','Outros'],SX_ACC=['Secretaria','Administradores','Liderança'];
const SX_ARQ=[
 {id:'ar1',n:'Estatuto social registrado',cat:'Estatuto e registro',d:'2019-03-12',acc:'Administradores',sz:'1,8 MB'},
 {id:'ar2',n:'Cartão CNPJ e certidões negativas',cat:'Contratos e certidões',d:'2026-08-20',acc:'Secretaria',sz:'640 KB'},
 {id:'ar3',n:'Ata da assembleia geral ordinária 2026',cat:'Atas',sub:'Assembleia',d:'2026-03-15',acc:'Secretaria',sz:'920 KB'},
 {id:'ar4',n:'Ata da eleição da diretoria 2025',cat:'Atas',sub:'Eleição',d:'2024-12-08',acc:'Secretaria',sz:'880 KB'},
 {id:'ar5',n:'Ata da reunião de diretoria — setembro/2026',cat:'Atas',sub:'Diretoria',d:'2026-09-14',acc:'Administradores',sz:'310 KB'},
 {id:'ar6',n:'Contrato de locação — Chácara Alva',cat:'Contratos e certidões',d:'2025-02-01',acc:'Administradores',sz:'2,4 MB'}];
const sxAtas=()=>SX_ARQ.filter(x=>x.cat==='Atas');
const sxAccPill=a=>sxPill(a,a==='Administradores'?'var(--st-rec)':a==='Liderança'?'var(--st-ace)':'var(--ink-muted)',a==='Administradores'?'var(--st-rec-bg)':a==='Liderança'?'var(--st-ace-bg)':'var(--surface-2)');
function sxDocList(){
 const q=norm(S.sxDocQ||'');
 const l=SX_DOCS.slice().sort((a,b)=>a.d===b.d?SX_DOCS.indexOf(b)-SX_DOCS.indexOf(a):a.d<b.d?1:-1).filter(d=>!q||norm(d.pessoa+' '+d.t+' '+d.num+' '+d.code).includes(q));
 return l.length?l.map(d=>`<button class="sx-r" data-a="sxDocOpen" data-v="${d.id}"><span class="sx-ti">${ic(SX_DOC_T[d.t].ic,20)}</span><span class="sx-m"><b>${esc(d.t)}</b><small>${esc(d.pessoa)} · nº ${d.num}</small></span><span class="sx-c">${dBR(d.d)}<small>${esc(d.sig.split(' — ')[0])}</small></span><span class="sx-s">${d.st==='valido'?sxPill('Válido','var(--st-int)','var(--st-int-bg)'):sxPill('Revogado','var(--st-rec)','var(--st-rec-bg)')}</span><span class="sx-ch">${ic('chevR',16)}</span></button>`).join(''):'<div class="mempty"><p>Nenhum documento encontrado.</p><span>Emita o primeiro em “Emitir documento”.</span></div>';
}
function sxArqList(){
 const q=norm(S.sxArqQ),c=S.sxArq;
 const l=SX_ARQ.filter(x=>(c==='todas'||x.cat===c)&&(!q||norm(x.n+' '+x.cat+' '+(x.sub||'')).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 return l.length?l.map(x=>`<div class="sx-r static"><span class="sx-ti">${ic('folder',20)}</span><span class="sx-m"><b>${esc(x.n)}</b><small>${esc(x.cat)}${x.sub?' · '+esc(x.sub):''} · ${x.sz}</small></span><span class="sx-c">${dBR(x.d)}<small>${esc(x.by||sxMe)}</small></span><span class="sx-s"><button class="sx-acc" data-a="sxArqAcc" data-v="${x.id}" title="Quem pode abrir">${ic('lock',12,2.2)}${sxAccPill(x.acc)}</button></span><span class="sx-ch"><button class="btn sec sm" data-a="sxArqOpen" data-v="${x.id}">Abrir</button></span></div>`).join(''):'<div class="mempty"><p>Nenhum arquivo por aqui.</p><span>Envie estatutos, atas, contratos e certidões em “Enviar arquivo”.</span></div>';
}
/* ---------- modelos dos documentos (upload versionado; o Alva só preenche os campos) ---------- */
const SX_VARS={'Certidão de batismo':['nome','data do batismo','local do batismo','quem oficiou'],'Certidão de casamento':['nome','nome do cônjuge','data do casamento','local do casamento','quem celebrou'],'Certificado de consagração':['nome','data da consagração','observação'],
 'Certificado de apresentação':['nome do bebê','data de nascimento','responsáveis','data da apresentação','culto'],'Certificado de integração':['nome','mês e ano da integração'],'Declaração de membro':['nome','membro desde'],'Carta de recomendação':['nome','destino'],'Carta de transferência':['nome','destino']};
const SX_VARS_ALL=['igreja','cidade','data de emissão','signatário','cargo do signatário','número','código de validação'];
function sxModList(){
 const n=t=>SX_DOCS.filter(d=>d.t===t).length;
 return Object.keys(SX_DOC_T).map(t=>{const T=SX_DOC_T[t];
  if(T.fin)return `<div class="sx-r static"><span class="sx-ti">${ic(T.ic,20)}</span><span class="sx-m"><b>${esc(t)}</b><small>Modelo do sistema, com o layout exigido para o informe. Não é enviado pela igreja.</small></span><span class="sx-c">${n(t)} ${n(t)===1?'emitido':'emitidos'}</span><span class="sx-s"><span class="bb-lock">${ic('lock',13,2)}Fixo</span></span><span class="sx-ch"></span></div>`;
  const a=sxModOf(t)[0];
  return `<div class="sx-r static"><span class="sx-ti">${ic(T.ic,20)}</span><span class="sx-m"><b>${esc(t)}</b><small>${esc(a.file)} · v${a.v} · ${dBR(a.d)} por ${esc(a.by)}</small></span><span class="sx-c">${n(t)} ${n(t)===1?'emitido':'emitidos'}</span><span class="sx-s">${sxPill('Ativa v'+a.v,'var(--st-int)','var(--st-int-bg)')}</span><span class="sx-ch"><button class="btn sec sm" data-a="sxModHist" data-v="${esc(t)}">Histórico</button><button class="btn sec sm" data-a="sxModNew" data-v="${esc(t)}">${ic('upload',14,2)}Nova versão</button></span></div>`;}).join('');
}
Object.assign(A,{
 sxModDl:v=>toast('Baixando '+v+' (simulado)'),
 sxModNew:t=>{const a=sxModOf(t)[0],vs=[...SX_VARS_ALL,...(SX_VARS[t]||[])];
  sxDlg('Nova versão do modelo',esc(t)+' · hoje v'+a.v,
   sxF('Arquivo Word (.docx) ou PDF','<input type="file" name="fi" accept=".docx,.pdf">','Opcional no protótipo. O arquivo vale como v'+(a.v+1)+' nas próximas emissões; o que já foi emitido não muda.')
   +sxF('O que mudou (opcional)','<input name="note" placeholder="Ex.: novo texto de assinatura" autocomplete="off">')
   +`<div class="fld"><span class="fl">Campos que o arquivo pode usar</span><div class="sx-vars">${vs.map(x=>`<code>{{${esc(x)}}}</code>`).join('')}</div><span class="hint">Escreva o campo exatamente assim no Word; o Alva troca pelo dado do registro. Número, assinatura do mandato vigente, código e QR entram sozinhos.</span></div>`
   +`<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn sec sm" data-a="sxModDl" data-v="${esc(a.file)}">${ic('download',14,2)}Baixar o modelo atual</button><button type="button" class="btn sec sm" data-a="sxModDl" data-v="${esc(sxModFile(t).replace('.docx','-exemplo.docx'))}">${ic('download',14,2)}Baixar um exemplo</button></div>`,sxOk('Enviar nova versão'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();sxClr(f);const fl=f.fi.files[0];
   if(fl&&!/\.(docx|pdf)$/i.test(fl.name))return sxErr(f,'fi','Envie um arquivo Word (.docx) ou PDF');
   const x={v:a.v+1,file:fl?fl.name:sxModFile(t),by:sxMe,d:SX_TODAY,sz:fl?(fl.size>1048576?(fl.size/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(fl.size/1024))+' KB'):'38 KB',note:f.note.value.trim()};
   SX_MOD[t].unshift(x);sxLog('Enviou','Modelo',t+' v'+x.v,x.file);closeDlg();render();toast('Modelo de '+t.toLowerCase()+' atualizado: v'+x.v+' está ativa');};},
 sxModHist:t=>{const l=sxModOf(t);
  openDlg(dlgHead('Histórico do modelo',esc(t))+`<div class="sx-people">${l.map((x,i)=>`<div class="sx-pr"><span class="sx-m"><b>v${x.v} · ${esc(x.file)}</b><small>${dBR(x.d)} por ${esc(x.by)} · ${x.sz}${x.note?' · '+esc(x.note):''} · ${SX_DOCS.filter(d=>d.t===t&&d.mv===x.v).length} emitidos</small></span>${i===0?sxPill('Ativa','var(--st-int)','var(--st-int-bg)'):`<button class="btn sec sm" data-a="sxModRe" data-v="${esc(t)}|${x.v}">Reativar</button>`}<button class="ibtn sm" data-a="sxModDl" data-v="${esc(x.file)}" aria-label="Baixar" title="Baixar">${ic('download',15)}</button></span></div>`).join('')}</div>
  <p class="hint" style="margin:12px 0 0">${ic('info',12,2)} Reativar cria uma versão nova com o mesmo arquivo. Nada é apagado, e os documentos já emitidos mantêm o texto e a versão que usaram.</p>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'sc-dlg');},
 sxModRe:v=>{const [t,n]=v.split('|'),o=sxModOf(t).find(x=>x.v===+n),x={v:sxModOf(t)[0].v+1,file:o.file,by:sxMe,d:SX_TODAY,sz:o.sz,note:'Reativação da v'+o.v};SX_MOD[t].unshift(x);sxLog('Enviou','Modelo',t+' v'+x.v,'Reativou a v'+o.v);closeDlg();render();toast('v'+x.v+' ativa (a mesma da v'+o.v+')');}
});
function secDocs(){
 const t=S.sxDocT,val=SX_DOCS.filter(d=>d.st==='valido').length;
 const act=t==='emitidos'?`<button class="btn sec" data-a="sxValidate">${ic('check',15,2.2)}Validar código</button><button class="btn pri" data-a="sxDocNew">${ic('plus',15,2.2)}Emitir documento</button>`:t==='modelos'?'':`<button class="btn pri" data-a="sxArqNew">${ic('upload',15,2)}Enviar arquivo</button>`;
 return sxHead('Secretaria','Documentos','Documentos emitidos, o arquivo da secretaria (estatuto, atas, contratos) e os modelos usados para gerar os documentos.',act)
 +sxSeg('sxDocTab',[['emitidos','Emitidos',SX_DOCS.length],['arquivo','Arquivo',SX_ARQ.length],['modelos','Modelos',Object.keys(SX_DOC_T).length]],t)
 +(t==='modelos'?`<div class="sx-note rise" style="--d:2;--c:var(--brand-text)">${ic('info',17,2)}<span><b>Um modelo por tipo de documento.</b> <small>Você envia um arquivo Word (.docx) ou PDF com campos como {{nome}}; ele vira uma versão nova e passa a valer nas próximas emissões. Documentos já emitidos guardam o texto e a versão que usaram. Enviar versão exige Editar ou Administrar em Secretaria e fica na auditoria.</small></span></div><section class="card sx-list rise" style="--d:3">${sxModList()}</section>`:'')
 +(t==='modelos'?'':t==='emitidos'?`<section class="card sx-list rise" style="--d:3"><div class="sx-bar"><label class="sbox">${ic('search',16)}<input data-scq="doc" placeholder="Buscar por pessoa, tipo, número ou código" value="${esc(S.sxDocQ||'')}" autocomplete="off"></label><span class="who">${val} válidos · ${SX_DOCS.length-val} revogados</span></div><div id="sxDl">${sxDocList()}</div></section>`
 :`<section class="card sx-list rise" style="--d:3"><div class="sx-bar"><label class="sbox">${ic('search',16)}<input data-scq="arq" placeholder="Buscar arquivo" value="${esc(S.sxArqQ)}" autocomplete="off"></label><div class="chips">${['todas',...SX_CATS].map(c=>`<button class="chipf ${S.sxArq===c?'on':''}" data-a="sxArqCat" data-v="${c}">${c==='todas'?'Todas':c}<small>${c==='todas'?SX_ARQ.length:SX_ARQ.filter(x=>x.cat===c).length}</small></button>`).join('')}</div></div><p class="sx-priv">${ic('lock',13,2)} Cada arquivo diz quem pode abrir: Secretaria, Administradores ou Liderança. Aberturas ficam na auditoria.</p><div id="sxAl">${sxArqList()}</div></section>`);
}
Object.assign(A,{
 sxDocTab:v=>{S.sxDocT=v;render();},sxDocNew:()=>sxDocDlg(),sxDocOpen:v=>sxDocView(v),sxValidate:()=>sxValidate(),sxToast:v=>toast(v),
 sxDocRevoke:v=>{const d=SX_DOCS.find(x=>x.id===v);sxDlg('Revogar documento','Nº '+d.num+' · '+d.t+' · '+d.pessoa,sxF('Motivo','<input name="w" placeholder="Ex.: Emitido com dado incorreto" autocomplete="off">','O documento passa a aparecer como inválido na validação.'),sxOk('Revogar'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();sxClr(f);if(!f.w.value.trim())return sxErr(f,'w','Informe o motivo');d.st='revogado';d.why=f.w.value.trim();sxLog('Encerrou','Documento','Revogou '+d.t+' nº '+d.num,d.why);closeDlg();render();toast('Documento revogado');};},
 sxArqCat:v=>{S.sxArq=v;render();},
 sxArqOpen:v=>{const x=SX_ARQ.find(a=>a.id===v);sxLog('Consultou','Arquivo',x.n,x.acc);toast('Abrindo “'+x.n+'” (simulado)');},
 sxArqAcc:v=>{const x=SX_ARQ.find(a=>a.id===v);sxDlg('Quem pode abrir',esc(x.n),sxF('Acesso',sxSel('a',SX_ACC,x.acc),'Administradores: só o papel Administrador. Liderança: pastores e líderes. Secretaria: o papel Secretaria e acima.'),sxOk('Salvar'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();x.acc=f.a.value;sxLog('Editou','Arquivo',x.n,'Acesso: '+x.acc);closeDlg();render();toast('Acesso atualizado');};},
 sxArqNew:()=>{
  sxDlg('Enviar arquivo','Estatuto, atas, contratos e certidões da igreja.',
   sxF('Arquivo (opcional no protótipo)','<input type="file" name="fi">')+sxF('Nome','<input name="n" placeholder="Ex.: Ata da assembleia de outubro" autocomplete="off">')
   +`<div class="fgrid" style="gap:14px">${sxF('Categoria',sxSel('c',SX_CATS,'Atas','sxCat'))}<div id="sxSubW">${sxF('Tipo de ata',sxSel('s',['Assembleia','Diretoria','Eleição','Outra'],'Assembleia'))}</div></div>`
   +`<div class="fgrid" style="gap:14px">${sxF('Data do documento',`<input type="date" name="d" value="${SX_TODAY}" max="${SX_TODAY}">`)}${sxF('Quem pode abrir',sxSel('a',SX_ACC,'Secretaria'))}</div>`,sxOk('Enviar'));
  const f=$('#sxF'),upd=()=>{$('#sxSubW').hidden=f.c.value!=='Atas';};f.c.onchange=upd;upd();
  f.fi.onchange=()=>{if(f.fi.files[0]&&!f.n.value)f.n.value=f.fi.files[0].name.replace(/\.[^.]+$/,'');};
  f.onsubmit=e=>{e.preventDefault();sxClr(f);if(!f.n.value.trim())return sxErr(f,'n','Informe o nome');if(!f.d.value)return sxErr(f,'d','Informe a data');
   const fl=f.fi.files[0],x={id:'ar'+Date.now(),n:f.n.value.trim(),cat:f.c.value,d:f.d.value,acc:f.a.value,sz:fl?(fl.size>1048576?(fl.size/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(fl.size/1024))+' KB'):'240 KB'};
   if(x.cat==='Atas')x.sub=f.s.value;SX_ARQ.unshift(x);sxLog('Adicionou','Arquivo',x.n,x.cat);S.sxArq='todas';closeDlg();render();toast('Arquivo enviado');};}
});

/* ---------- cargos e mandatos ---------- */
const SX_CARGOS=[
 {id:'cg1',n:'Pastor presidente',desc:'Representa a igreja e preside a diretoria.',ac:null},
 {id:'cg2',n:'Secretário(a)',desc:'Guarda os livros, as atas e os documentos da igreja.',ac:{area:'Secretaria',perm:'Editar'}},
 {id:'cg3',n:'Tesoureiro(a)',desc:'Responde pelas contas e pelos relatórios financeiros.',ac:{area:'Financeiro',perm:'Editar'}},
 {id:'cg4',n:'Diácono(a)',desc:'Serve no cuidado e na ordem da igreja.',ac:null},
 {id:'cg5',n:'Presbítero(a)',desc:'Auxilia na liderança e no governo da igreja.',ac:null},
 {id:'cg6',n:'Conselho fiscal',desc:'Confere as contas e os relatórios da tesouraria.',ac:{area:'Financeiro',perm:'Visualizar'}}];
const sxCargo=id=>SX_CARGOS.find(c=>c.id===id)||{n:'—',ac:null};
const SX_MAND=[
 {id:'md1',cg:'cg1',pessoa:'Marcos Souza Ramos',ini:'2020-02-01',fim:'',ata:'',sc:''},
 {id:'md2',cg:'cg2',pessoa:'Thiago Barros',ini:'2024-10-01',fim:'2026-10-31',ata:'ar4',sc:'+'},
 {id:'md3',cg:'cg3',pessoa:'Helena Duarte',ini:'2025-03-01',fim:'2027-02-28',ata:'ar4',sc:'+'},
 {id:'md4',cg:'cg4',pessoa:'Larissa Pires',ini:'2025-01-01',fim:'2026-12-31',ata:'',sc:''},
 {id:'md5',cg:'cg6',pessoa:'Clara Nunes',ini:'2026-01-01',fim:'2026-12-31',ata:'ar3',sc:'+'},
 {id:'md6',cg:'cg5',pessoa:'Bruno Reis',ini:'2022-01-01',fim:'2025-12-31',ata:'',sc:''}];
const sxMandSt=x=>x.enc?'encerrado':x.ini>SX_TODAY?'agendado':x.fim&&x.fim<SX_TODAY?'encerrado':'vigente';
function sxGrant(x){const c=sxCargo(x.cg);if(!c.ac)return;const s=SC(c.ac.area,x.pessoa,c.ac.perm);s.via='mandato';s.mid=x.id;SCOPES.push(s);x.sc=s.id;}
function sxRevoke(x){if(!x.sc)return;const i=SCOPES.findIndex(s=>s.id===x.sc);if(i>=0)SCOPES.splice(i,1);x.sc='';}
SX_MAND.forEach(x=>{if(x.sc==='+'){x.sc='';sxGrant(x);}});
function sxEndMands(m){SX_MAND.filter(x=>x.pessoa===m.n&&sxMandSt(x)!=='encerrado').forEach(x=>{sxRevoke(x);x.fim=x.ini>SX_TODAY?x.ini:SX_TODAY;x.enc=1;sxLog('Encerrou','Mandato',sxCargo(x.cg).n+' · '+x.pessoa,'Encerrado pela situação do membro');});sxRevokeDocs(m);}
{const _s=scopeTab;scopeTab=o=>{let h=_s(o);SCOPES.filter(x=>x.via).forEach(x=>{const md=SX_MAND.find(y=>y.id===x.mid);h=h.replace(new RegExp('(id="'+x.id+'">[\\s\\S]*?<b>[^<]*</b><span>)([^<]*)(</span>)'),(a,p,t,s)=>p+t+' · via mandato'+(md?' de '+sxCargo(md.cg).n:'')+s);});return h;};}
function secCargos(){
 const t=S.sxCg,vig=SX_MAND.filter(x=>sxMandSt(x)==='vigente'),soon=vig.filter(x=>x.fim&&sxDays(SX_TODAY,x.fim)<=90);
 const l=SX_MAND.slice().filter(x=>S.sxMdF==='todos'||sxMandSt(x)!=='encerrado').sort((a,b)=>((sxMandSt(a)==='encerrado')-(sxMandSt(b)==='encerrado'))||((a.fim||'9')<(b.fim||'9')?-1:1));
 const pill=x=>{const s=sxMandSt(x);if(s==='encerrado')return sxPill('Encerrado','var(--ink-muted)','var(--surface-2)');if(s==='agendado')return sxPill('Começa em '+dBR(x.ini),'var(--st-ace)','var(--st-ace-bg)');const d=x.fim?sxDays(SX_TODAY,x.fim):null;return d!==null&&d<=90?sxPill('Vence em '+d+' dias','var(--st-sol)','var(--st-sol-bg)'):sxPill('Vigente','var(--st-int)','var(--st-int-bg)');};
 const acc=x=>{const c=sxCargo(x.cg);return x.sc?`<span class="sx-via">${ic('key',12,2)}${esc(c.ac.area)} · ${c.ac.perm==='Visualizar'?'Ver':c.ac.perm}<small>via mandato</small></span>`:c.ac&&sxMandSt(x)==='vigente'?'<span class="sx-via off">Acesso não concedido</span>':'<span class="sx-via off">—</span>';};
 return sxHead('Secretaria','Cargos e mandatos','Quem ocupa cada cargo da igreja, por quanto tempo e com que acesso ao sistema.',t==='mandatos'?`<button class="btn pri" data-a="sxMdNew">${ic('plus',15,2.2)}Novo mandato</button>`:`<button class="btn pri" data-a="sxCgNew">${ic('plus',15,2.2)}Novo cargo</button>`)
 +sxKpis([['Mandatos vigentes',vig.length,'em '+new Set(vig.map(x=>x.cg)).size+' cargos'],['Vencem em 90 dias',soon.length,soon.length?'renovar ou encerrar':'nenhum vencendo',soon.length?'var(--st-sol)':''],['Com acesso ao sistema',vig.filter(x=>x.sc).length,'concedido pelo mandato'],['Cargos cadastrados',SX_CARGOS.length,'no catálogo da igreja']])
 +sxSeg('sxCgTab',[['mandatos','Mandatos',SX_MAND.length],['cargos','Cargos',SX_CARGOS.length]],t)
 +(t==='mandatos'?`<section class="card sx-list rise" style="--d:3"><div class="sx-bar"><div class="chips">${[['vigentes','Vigentes e futuros'],['todos','Todos, com encerrados']].map(c=>`<button class="chipf ${(S.sxMdF||'vigentes')===c[0]?'on':''}" data-a="sxMdF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div>
   ${l.map(x=>{const ata=SX_ARQ.find(a=>a.id===x.ata);return `<div class="sx-r static"><span class="sx-ti">${sxAv(x.pessoa)}</span><span class="sx-m"><b>${esc(x.pessoa)}</b><small>${esc(sxCargo(x.cg).n)}${ata?' · Ata: '+esc(ata.n):''}</small></span><span class="sx-c">${dBR(x.ini)} → ${x.fim?dBR(x.fim):'sem prazo'}<small>${acc(x)}</small></span><span class="sx-s">${pill(x)}</span><span class="sx-ch">${sxMandSt(x)==='encerrado'?'':`<button class="btn sec sm" data-a="sxMdEnd" data-v="${x.id}">Encerrar</button>`}</span></div>`;}).join('')}</section>`
 :`<div class="sx-cg rise" style="--d:3">${SX_CARGOS.map(c=>{const n=vig.filter(x=>x.cg===c.id);return `<article class="card sx-cgc"><div class="sx-cgh"><b>${esc(c.n)}</b><small>${n.length?n.map(x=>esc(x.pessoa)).join(', '):'Sem ocupante vigente'}</small></div><p>${esc(c.desc)}</p><div class="sx-cgf">${c.ac?`<span class="sx-via">${ic('key',12,2)}Acesso sugerido: ${esc(c.ac.area)} · ${c.ac.perm==='Visualizar'?'Ver':c.ac.perm}</span>`:'<span class="sx-via off">Sem acesso sugerido</span>'}<button class="lnk" data-a="sxCgEdit" data-v="${c.id}">Editar</button></div></article>`;}).join('')}</div>`);
}
function sxCgDlg(id){
 const c=id?sxCargo(id):null,areas=['Secretaria','Financeiro','Integração','Almoxarifado','Ministério de Louvor','Ministério Infantil'];
 sxDlg(c?'Editar cargo':'Novo cargo','O acesso sugerido é uma ajuda ao conceder o mandato: nunca é automático.',
  sxF('Nome do cargo',`<input name="n" value="${esc(c?c.n:'')}" placeholder="Ex.: Tesoureiro(a)" autocomplete="off">`)+sxF('Descrição',`<input name="ds" value="${esc(c?c.desc:'')}" autocomplete="off">`)
  +`<div class="fgrid" style="gap:14px">${sxF('Acesso sugerido (área)',sxSel('ar',[['','Sem acesso sugerido'],...areas],c&&c.ac?c.ac.area:''))}${sxF('Nível',sxSel('pm',[['Visualizar','Ver'],['Editar','Editar'],['Admin','Administrar']],c&&c.ac?c.ac.perm:'Editar'))}</div>`,sxOk(c?'Salvar':'Criar cargo'));
 const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();sxClr(f);if(!f.n.value.trim())return sxErr(f,'n','Informe o nome do cargo');
  if(SX_CARGOS.some(x=>x.id!==id&&norm(x.n)===norm(f.n.value)))return sxErr(f,'n','Já existe um cargo com esse nome');
  const o={n:f.n.value.trim(),desc:f.ds.value.trim(),ac:f.ar.value?{area:f.ar.value,perm:f.pm.value}:null};
  if(c)Object.assign(c,o);else SX_CARGOS.push({id:'cg'+Date.now(),...o});sxLog(c?'Editou':'Adicionou','Cargo',o.n);closeDlg();render();toast(c?'Cargo atualizado':'Cargo criado');};
}
function sxMdDlg(){
 const cs=SX_CARGOS,ms=sxInteg().filter(m=>!SX_BLOCK.includes(sxSitOf(m))),atas=sxAtas();
 sxDlg('Novo mandato','O mandato liga a pessoa ao cargo e pode conceder o acesso sugerido ao sistema.',
  sxF('Cargo',sxSel('cg',cs.map(c=>[c.id,c.n]),cs[0].id,'sxCg'))+sxF('Pessoa',sxSel('p',ms.map(m=>[m.n,m.n]),ms[0].n))
  +`<div class="fgrid" style="gap:14px">${sxF('Início',`<input type="date" name="i" value="${SX_TODAY}">`)}${sxF('Fim (opcional)','<input type="date" name="e">','Em branco = sem prazo')}</div>`
  +`<label class="chk3" id="sxGW"><input type="checkbox" name="g" checked><span id="sxGT"></span></label><p class="hint" id="sxGH"></p>`
  +sxF('Ata da eleição ou nomeação (opcional)',sxSel('a',[['','Sem ata'],...atas.map(a=>[a.id,a.n+' · '+dBR(a.d)])],'')),sxOk('Criar mandato'));
 const f=$('#sxF'),upd=()=>{const c=sxCargo(f.cg.value);$('#sxGW').hidden=!c.ac;$('#sxGH').hidden=!c.ac;if(c.ac){$('#sxGT').textContent='Conceder '+c.ac.area+' · '+(c.ac.perm==='Visualizar'?'Ver':c.ac.perm)+' durante o mandato';$('#sxGH').textContent=USERS.some(u=>u.n===f.p.value)?'O acesso sai sozinho quando o mandato termina.':'Esta pessoa ainda não tem usuário no painel. O acesso aparece em Acessos por área e vale quando ela for convidada em Usuários e permissões.';}};
 f.cg.onchange=upd;f.p.onchange=upd;upd();
 f.onsubmit=e=>{e.preventDefault();sxClr(f);
  if(!f.i.value)return sxErr(f,'i','Informe o início');
  if(f.e.value&&f.e.value<f.i.value)return sxErr(f,'e','O fim não pode ser antes do início');
  if(SX_MAND.some(x=>x.cg===f.cg.value&&x.pessoa===f.p.value&&sxMandSt(x)!=='encerrado'))return sxErr(f,'p','Essa pessoa já tem esse cargo vigente');
  const x={id:'md'+Date.now(),cg:f.cg.value,pessoa:f.p.value,ini:f.i.value,fim:f.e.value,ata:f.a.value,sc:''};SX_MAND.push(x);
  if(f.g.checked&&!$('#sxGW').hidden&&sxMandSt(x)!=='encerrado')sxGrant(x);
  sxLog('Adicionou','Mandato',sxCargo(x.cg).n+' · '+x.pessoa,x.sc?'Acesso concedido: '+sxCargo(x.cg).ac.area:'');closeDlg();render();toast('Mandato criado'+(x.sc?' e acesso concedido':''));};
}
Object.assign(A,{
 sxCgTab:v=>{S.sxCg=v;render();},sxMdF:v=>{S.sxMdF=v;render();},sxMdNew:()=>sxMdDlg(),sxCgNew:()=>sxCgDlg(),sxCgEdit:v=>sxCgDlg(v),
 sxMdEnd:v=>{const x=SX_MAND.find(y=>y.id===v);sxDlg('Encerrar mandato',esc(x.pessoa)+' · '+esc(sxCargo(x.cg).n),`<p class="sx-eff">${ic('info',14,2)} O mandato termina hoje.${x.sc?' O acesso '+esc(sxCargo(x.cg).ac.area)+' concedido por ele é retirado.':''}</p>`,sxOk('Encerrar mandato'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();sxRevoke(x);x.fim=x.ini>SX_TODAY?x.ini:SX_TODAY;x.enc=1;sxLog('Encerrou','Mandato',sxCargo(x.cg).n+' · '+x.pessoa);closeDlg();render();toast('Mandato encerrado');};}
});

/* ---------- análises da secretaria (os relatórios de lista ficam em Relatórios) ---------- */
function secAna(){
 const t=S.sxRel==='perfil'?'perfil':'mov',integ=sxInteg(),on=integ.filter(m=>!SX_BLOCK.includes(sxSitOf(m)));
 let body='';
 if(t==='mov'){
  const ms=['01','02','03','04','05','06','07','08','09'],ent=ms.map(k=>integ.filter(m=>m.int==='2026-'+k).length),sai=ms.map(k=>integ.filter(m=>{const r=SX_SIT[m.id];return r&&SX_BLOCK.includes(r.s)&&r.h[0].d.slice(0,7)==='2026-'+k;}).length),mx=Math.max(1,...ent,...sai);
  {const tE=ent.reduce((a,b)=>a+b,0),tS=sai.reduce((a,b)=>a+b,0);body=sxKpis([['Entradas em 2026',tE,'integrações concluídas','var(--st-int)'],['Saídas',tS,'transferências, desligamentos e falecimentos',tS?'var(--st-rec)':''],['Saldo do ano',(tE-tS>0?'+':'')+(tE-tS),'membros a mais que em janeiro']]).replace('--d:1','--d:3');}
  body+=`<section class="card rise sxa-mov" style="--d:4;padding:20px 22px"><div class="sh"><h2>Mês a mês</h2><span class="who"><i class="sx-lg in"></i>Integrações <i class="sx-lg out"></i>Transferências, desligamentos e falecimentos</span></div>
   <div class="sxa-ch"><div class="sxa-grid">${[0,1,2,3].map(()=>'<i></i>').join('')}</div><div class="sx-bars">${ms.map((k,i)=>`<div class="sx-bc"><div class="sx-bb"><span class="sxa-b in" style="height:${ent[i]/mx*100}%" title="${ent[i]} entradas">${ent[i]?`<em>${ent[i]}</em>`:''}</span>${sai[i]?`<span class="sxa-b out" style="height:${sai[i]/mx*100}%" title="${sai[i]} saídas"><em>${sai[i]}</em></span>`:''}</div><small>${MONTHS[i].slice(0,3)}</small></div>`).join('')}</div></div>
   <div class="sx-note" style="--c:var(--brand);margin:18px 0 0">${ic('info',18,2)}<span>A lista de quem saiu, com o motivo, está em <button class="lnk" data-a="rptGo" data-v="membros|membros">Relatórios › Membros</button>.</span></div></section>`;
 }else{
  const dist=(f,keys)=>keys.map(k=>[k,on.filter(m=>f(m)===k).length]),fx=m=>{const a=age(m.nasc);return a<13?'0 a 12':a<18?'13 a 17':a<30?'18 a 29':a<45?'30 a 44':a<60?'45 a 59':'60 ou mais';};
  const blocks=[['Faixa etária',dist(fx,['0 a 12','13 a 17','18 a 29','30 a 44','45 a 59','60 ou mais'])],['Estado civil',dist(m=>m.civil,[...new Set(on.map(m=>m.civil))])],['Gênero',dist(m=>m.gen,[...new Set(on.map(m=>m.gen))])],['Batismo',[['Batizados',on.filter(m=>m.bap).length],['Ainda não batizados',on.filter(m=>!m.bap).length]]]];
  body=`<div class="sx-dist rise" style="--d:3">${blocks.map(b=>{const mx=Math.max(1,...b[1].map(x=>x[1]));const tot=Math.max(1,b[1].reduce((q,x)=>q+x[1],0));return `<section class="card sxa-p" style="padding:18px 20px"><div class="sh"><h2>${b[0]}</h2><span class="who">${on.length} membros</span></div>${b[1].map(x=>`<div class="sx-hb"><span>${esc(x[0])}</span><span class="sx-hbb"><i style="width:${x[1]/mx*100}%"></i></span><b>${x[1]}<small>${Math.round(x[1]/tot*100)}%</small></b></div>`).join('')}</section>`;}).join('')}</div>`;
 }
 return sxHead('Secretaria','Análises','Números da vida da igreja: entradas e saídas de membros e o perfil de quem está na igreja.','')+sxSeg('sxRelTab',[['mov','Entradas e saídas'],['perfil','Perfil']],t)+body;
}
Object.assign(A,{sxRelTab:v=>{S.sxRel=v;render();}});

/* ---------- visão geral da secretaria ---------- */
function secVis(){
 const integ=sxInteg(),ativos=integ.filter(m=>sxSitOf(m)==='ativo'),afast=integ.filter(m=>sxSitOf(m)==='afastado');
 const docs30=SX_DOCS.filter(d=>sxDays(d.d,SX_TODAY)<=30&&d.st==='valido').length;
 const vig=SX_MAND.filter(x=>sxMandSt(x)==='vigente'&&x.fim&&sxDays(SX_TODAY,x.fim)<=90).sort((a,b)=>a.fim<b.fim?-1:1);
 const prev=EVTS.filter(e=>isCer(e)&&e.st==='confirmado'&&e.d&&sxDays(SX_TODAY,e.d)>=0&&sxDays(SX_TODAY,e.d)<=30);
 const semCert=[];sxAtoAll().filter(a=>a.t==='batismo'&&a.st==='realizado').forEach(a=>a.ppl.forEach(n=>{const m=sxMem(n);if(m&&!SX_DOCS.some(d=>d.mid===m.id&&d.t==='Certidão de batismo'&&d.st==='valido'))semCert.push(m);}));
 const semBb=[...BBP,...sxManPres()].filter(p=>p.st==='realizada'&&!bbDoc(p));
 const semInt=INTR.cert?ativos.filter(m=>m.int&&m.int>='2026-09'&&!SX_DOCS.some(d=>d.mid===m.id&&d.t==='Certificado de integração'&&d.st==='valido')):[];
 const long=afast.filter(m=>sxDays(SX_SIT[m.id].h[0].d,SX_TODAY)>=30);
 const pend=SX_ATOS.filter(a=>a.auto&&a.dec==='pendente');
 const items=[
  ...sxDiPend().map(p=>({ic:'care',t:p.k==='ret'?`Confirmar a volta de <b>${esc(p.x.m)}</b> à situação Ativo`:`Confirmar ${p.x.req==='Away'?'afastamento':'desligamento'} de <b>${esc(p.x.m)}</b>`,s:'Caso de disciplina · '+(p.k==='ret'?'registro encerrado':'registrado em '+dBR(p.x.d)),a:'sxPendDisc',v:p.x.id,l:'Revisar'})),
  ...(pend.length?[{ic:'clock',t:`<b>${pend.length}</b> ${pend.length===1?'ato declarado':'atos declarados'} na integração ${pend.length===1?'aguarda':'aguardam'} decisão`,s:pend.slice(0,3).map(a=>esc(a.ppl[0])+' · '+SX_ATO_T[a.t][0].toLowerCase()).join(', '),a:'sxPendGo',v:'',l:'Decidir'}]:[]),
  ...vig.map(x=>({ic:'key',t:`Mandato de <b>${esc(x.pessoa)}</b> (${esc(sxCargo(x.cg).n)}) vence em ${dBR(x.fim)}`,s:`${sxDays(SX_TODAY,x.fim)} dias${x.sc?' · o acesso '+esc(sxCargo(x.cg).ac.area)+' sai junto':''}`,a:'sxGo',v:'sec-cargos',l:'Ver mandatos'})),
  ...prev.map(e=>({ic:SX_ATO_T[CERT[e.type].k][1],t:`${e.type} em ${dBR(e.d)}: <b>${ceUsed(e)} ${ceUsed(e)===1?CERT[e.type].un:CERT[e.type].pl}</b>`,s:esc(e.place||'')+' · evento na Agenda',a:'sxOpenEv',v:e.id,l:'Abrir evento'})),
  ...(semBb.length?[{ic:'pacifier',t:`<b>${semBb.length}</b> ${semBb.length===1?'apresentação':'apresentações'} sem certificado emitido`,s:semBb.slice(0,3).map(p=>esc(p.cert)).join(', '),a:'sxBbCert',v:semBb[0].id,l:'Emitir certificado'}]:[]),
  ...(semInt.length?[{ic:'check',t:`<b>${semInt.length}</b> ${semInt.length===1?'integrado(a) sem':'integrados sem'} certificado de integração`,s:semInt.slice(0,3).map(m=>esc(m.n)).join(', '),a:'sxDocNew',v:'',l:'Emitir certificado'}]:[]),
  ...(semCert.length?[{ic:'file',t:`<b>${semCert.length}</b> ${semCert.length===1?'batizado(a) sem':'batizados sem'} certidão emitida`,s:semCert.slice(0,3).map(m=>esc(m.n)).join(', '),a:'sxDocNew',v:'',l:'Emitir certidão'}]:[]),
  ...long.map(m=>({ic:'care',t:`<b>${esc(m.n)}</b> está afastado(a) há ${sxDays(SX_SIT[m.id].h[0].d,SX_TODAY)} dias`,s:'Vale uma conversa para rever a situação',a:'sxOpenM',v:m.id,l:'Abrir ficha'}))];
 const bd=ativos.filter(m=>m.nasc).map(m=>{const [,mo,da]=m.nasc.split('-'),d=`2026-${mo}-${da}`,n=sxDays(SX_TODAY,d);return {m,d,n};}).filter(x=>x.n>=0&&x.n<=7).sort((a,b)=>a.n-b.n);
 return sxHead('Secretaria','Visão geral','O que a secretaria precisa acompanhar: situação dos membros, atos, documentos e mandatos.',`<button class="btn sec" data-a="sxAtoNew">${ic('plus',15,2.2)}Registrar ato</button><button class="btn pri" data-a="sxDocNew">${ic('file',15)}Emitir documento</button>`)
 +sxKpis([['Membros ativos',ativos.length,integ.length+' integrados no total'],['Afastados',afast.length,afast.length?'acompanhe de perto':'nenhum afastado',afast.length?'var(--st-sol)':''],['Documentos nos últimos 30 dias',docs30,'emitidos e válidos'],['Mandatos vencendo',vig.length,'em até 90 dias',vig.length?'var(--st-sol)':'']])
 +`<div class="sx-two"><section class="card rise" style="--d:2;padding:18px 20px"><div class="sh"><h2>Precisa da sua atenção <span class="pill">${items.length}</span></h2></div>${items.length?items.map(i=>`<div class="sx-ai"><span class="sx-ti">${ic(i.ic,18)}</span><span class="sx-m"><b>${i.t}</b><small>${i.s}</small></span><button class="btn sec sm" data-a="${i.a}" data-v="${i.v}">${i.l}</button></div>`).join(''):'<div class="mempty"><p>Tudo em dia.</p><span>Nada pedindo a sua atenção agora.</span></div>'}</section>
  <div class="sx-col"><section class="card rise" style="--d:3;padding:18px 20px"><div class="sh"><h2>Aniversariantes da semana</h2><button class="lnk" data-a="rptGo" data-v="membros|aniv">Ver mês</button></div>${bd.length?bd.map(x=>`<button class="sx-bd" data-a="sxOpenM" data-v="${x.m.id}">${mav(x.m)}<span class="sx-m"><b>${esc(x.m.n)}</b><small>faz ${2026-+x.m.nasc.slice(0,4)} anos</small></span><span class="who">${x.n===0?'hoje':sxShort(x.d)}</span></button>`).join(''):'<p class="who" style="margin:8px 0 0">Ninguém nesta semana.</p>'}</section>
  <section class="card rise" style="--d:4;padding:18px 20px"><div class="sh"><h2>Atalhos</h2></div><div class="sx-sc">${[['sec-atos','bucket','Atos'],['sec-docs','file','Documentos'],['sec-cargos','key','Cargos e mandatos'],['rp-secretaria','clipboard','Relatórios']].map(x=>`<button data-a="sxGo" data-v="${x[0]}">${ic(x[1],18)}<span>${x[2]}</span></button>`).join('')}</div></section></div></div>`;
}
Object.assign(A,{sxGo:v=>A.nav(v)});

/* ---------- disciplina (Cuidado) ---------- */
const SX_DISC_T={adm:['Admoestação','var(--st-sol)','var(--st-sol-bg)'],afa:['Afastamento temporário','var(--st-ace)','var(--st-ace-bg)'],des:['Desligamento','var(--st-rec)','var(--st-rec-bg)']};
const SX_DISC=[
 {id:'ds1',m:'Otávio Lins',t:'adm',d:'2026-07-15',rev:'2026-10-15',resp:'Pr. Marcos Souza',obs:'Conversa pastoral registrada. Acompanhar em 90 dias.',st:'vigente',h:[['2026-07-15','Registro criado']]},
 {id:'ds2',m:'Juliana Prado',t:'afa',d:'2026-08-30',rev:'2026-09-20',resp:'Pr. Marcos Souza',obs:'Afastamento acordado com a liderança, com revisão no fim do prazo.',st:'vigente',req:'Away',conf:'2026-08-30',h:[['2026-08-30','Registro criado']]},
 {id:'ds6',m:'Ana Clara Lima',t:'afa',d:'2026-09-28',rev:'2026-12-28',resp:'Pr. Rafael Pereira',obs:'Afastamento acordado com a liderança. Retomar a conversa ao fim do prazo.',st:'vigente',req:'Away',h:[['2026-09-28','Registro criado']]},
 {id:'ds3',m:'Clara Nunes',t:'adm',d:'2026-03-10',rev:'',resp:'Pr. Rafael Pereira',obs:'Orientação feita e aceita. Caso encerrado.',st:'encerrada',h:[['2026-03-10','Registro criado'],['2026-04-02','Encerrado']]}];
{const m=sxMem('Juliana Prado');if(m&&!SX_SIT[m.id])SX_SIT[m.id]={s:'afastado',h:[{d:'2026-08-30',s:'afastado',from:'ativo',why:'Afastamento a pedido da liderança',dest:'',by:sxMe}]};if(m.app&&m.app.st==='ativo')m.app.st='suspensa';}
const sxDiPend=()=>SX_DISC.flatMap(x=>x.st==='vigente'&&x.req&&!x.conf?[{k:'sit',x}]:x.ret==='pend'?[{k:'ret',x}]:[]);
const sxRevDue=x=>x.st==='vigente'&&x.rev&&x.rev<SX_TODAY;
function discPage(){
 const f=S.sxDi,l=SX_DISC.filter(x=>f==='todos'||(f==='vigente'?x.st==='vigente':x.st!=='vigente')).sort((a,b)=>a.d<b.d?1:-1),vig=SX_DISC.filter(x=>x.st==='vigente');
 return sxHead('Cuidado','Disciplina','Registro pastoral de admoestações, afastamentos e desligamentos. Acesso super restrito.',`<button class="btn pri" data-a="sxDiNew">${ic('plus',15,2.2)}Novo registro</button>`)
 +`<div class="sx-lock rise" style="--d:1">${ic('lock',20,2)}<span><b>Área restrita</b> · só o Administrador e quem a igreja autorizar para a Disciplina. Cada consulta e cada alteração vai para a auditoria. Estes registros <b>não aparecem</b> em buscas, listas, exportações, no app nem em avisos, e nunca são mostrados ao próprio membro.</span></div>`
 +sxKpis([['Em vigor',vig.length,'registros abertos'],['Revisão vencida',vig.filter(sxRevDue).length,'pedem uma conversa',vig.some(sxRevDue)?'var(--st-rec)':''],['Encerrados',SX_DISC.length-vig.length,'no histórico']])
 +`<section class="card sx-list rise" style="--d:3"><div class="sx-bar"><div class="chips">${[['todos','Todos'],['vigente','Em vigor'],['encerrada','Encerrados']].map(c=>`<button class="chipf ${f===c[0]?'on':''}" data-a="sxDiF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div>
  ${l.length?l.map(x=>{const m=sxMem(x.m);return `<button class="sx-r" data-a="sxDiOpen" data-v="${x.id}"><span class="sx-ti">${m?mav(m):sxAv(x.m)}</span><span class="sx-m"><b>${esc(x.m)}</b><small>${esc(SX_DISC_T[x.t][0])} · desde ${dBR(x.d)} · ${esc(x.resp)}</small></span><span class="sx-c">${x.rev?'Revisar até '+dBR(x.rev):'Sem revisão'}<small>${x.st==='vigente'&&x.req&&!x.conf?'<span style="color:var(--st-sol)">aguardando a Secretaria</span>':sxRevDue(x)?'<span style="color:var(--st-rec)">revisão vencida</span>':x.st==='vigente'?'em vigor':'encerrado'}</small></span><span class="sx-s">${sxPill(SX_DISC_T[x.t][0],SX_DISC_T[x.t][1],SX_DISC_T[x.t][2])}</span><span class="sx-ch">${ic('chevR',16)}</span></button>`;}).join(''):'<div class="mempty"><p>Nenhum registro.</p><span>Os registros aparecem aqui.</span></div>'}</section>`;
}
function sxPendDlg(id){
 const x=SX_DISC.find(y=>y.id===id),m=sxMem(x.m),ret=x.ret==='pend'&&x.st!=='vigente',tgt=ret?'ativo':x.req==='Away'?'afastado':'desligado',T=ret?'Confirmar a volta a Ativo':x.req==='Away'?'Confirmar afastamento':'Confirmar desligamento';
 openDlg(dlgHead(T,esc(x.m)+' · decisão da Disciplina')+`<div class="sx-lock sm">${ic('lock',16,2)}<span>Os pastores tratam o caso e a observação fica só com eles. Aqui você confirma a situação.</span></div>
  <p class="sx-kv"><span>Pessoa</span><b>${esc(x.m)}</b></p><p class="sx-kv"><span>Origem</span><b>Caso de disciplina · ${ret?'encerrado':SX_DISC_T[x.t][0].toLowerCase()}</b></p><p class="sx-kv"><span>Situação hoje</span><b>${SX_SITS[sxSitOf(m)][0]}</b></p><p class="sx-kv"><span>Nova situação</span><b>${SX_SITS[tgt][0]}</b></p>
  ${sxImpactHtml(m,tgt)}
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Agora não</button><button class="btn pri" data-a="sxPendOk" data-v="${x.id}">${T}</button></div>`,'sc-dlg');
}
function sxDiView(id){
 const x=SX_DISC.find(y=>y.id===id);sxLog('Consultou','Disciplina',x.m,SX_DISC_T[x.t][0]);
 openDlg(dlgHead('Registro de disciplina',esc(x.m)+' · '+SX_DISC_T[x.t][0])+`<div class="sx-lock sm">${ic('lock',16,2)}<span>Consulta registrada na auditoria.</span></div>
  <p class="sx-kv"><span>Desde</span><b>${dBR(x.d)}</b></p><p class="sx-kv"><span>Responsável</span><b>${esc(x.resp)}</b></p><p class="sx-kv"><span>Revisão</span><b>${x.rev?dBR(x.rev)+(sxRevDue(x)?' (vencida)':''):'—'}</b></p>${x.req?`<p class="sx-kv"><span>Situação do membro</span><b>${x.conf?'Confirmada pela Secretaria em '+dBR(x.conf):x.st==='vigente'?'Aguardando a Secretaria':'Pendente encerrado, sem efeito'}</b></p>`:''}<p class="sx-kv"><span>Observação restrita</span><b>${esc(x.obs)}</b></p>
  <h4 class="sx-h4">Histórico</h4><ol class="sx-hist">${x.h.slice().reverse().map(h=>`<li><span>${dBR(h[0])}</span>${esc(h[1])}</li>`).join('')}</ol>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button>${x.st==='vigente'?`<button class="btn sec" data-a="sxDiRev" data-v="${x.id}">Registrar revisão</button><button class="btn pri" data-a="sxDiEnd" data-v="${x.id}">Encerrar registro</button>`:''}</div>`,'sc-dlg');
}
Object.assign(A,{
 sxDiF:v=>{S.sxDi=v;render();},sxDiOpen:v=>sxDiView(v),sxPendDisc:v=>sxPendDlg(v),
 sxPendOk:v=>{const x=SX_DISC.find(y=>y.id===v),m=sxMem(x.m),ret=x.ret==='pend'&&x.st!=='vigente',nm=m.n.split(' ')[0];
  if(ret){x.ret='done';sxSetSit(m,'ativo',{why:'Retorno após a Disciplina'});x.h.push([SX_TODAY,'Volta a Ativo confirmada pela Secretaria']);}
  else{x.conf=SX_TODAY;sxSetSit(m,x.req==='Away'?'afastado':'desligado',{why:'Disciplina: '+SX_DISC_T[x.t][0].toLowerCase()});x.h.push([SX_TODAY,'Situação confirmada pela Secretaria']);}
  closeDlg();render();toast(ret?nm+': situação voltou a Ativo':nm+': '+(x.req==='Away'?'afastamento':'desligamento')+' confirmado · quem lidera foi avisado');},
 sxDiNew:()=>{const ms=sxInteg().filter(m=>!SX_BLOCK.includes(sxSitOf(m)));
  sxDlg('Novo registro de disciplina','Acesso restrito. Registre só o necessário.',
   sxF('Membro',sxSel('m',ms.map(m=>[m.id,m.n]),ms[0].id))+sxF('Tipo',sxSel('t',Object.keys(SX_DISC_T).map(k=>[k,SX_DISC_T[k][0]]),'adm','sxDt'))
   +`<div class="fgrid" style="gap:14px">${sxF('Data',`<input type="date" name="d" value="${SX_TODAY}" max="${SX_TODAY}">`)}${sxF('Revisar até',`<input type="date" name="r" value="${D_PLUS(90)}">`,'Obrigatório em afastamento')}</div>`
   +sxF('Responsável',sxSel('rp',['Pr. Marcos Souza','Pr. Rafael Pereira'],'Pr. Marcos Souza'))
   +sxF('Observação restrita','<textarea name="o" rows="3" placeholder="Só o necessário. Só quem tem acesso a Disciplina vê."></textarea>')
   +`<p class="hint" id="sxSh"><b id="sxSt"></b> No cadastro do membro aparece só um texto genérico: o detalhe fica aqui.</p>`,sxOk('Registrar'));
  const f=$('#sxF'),upd=()=>{const t=f.t.value;$('#sxSh').hidden=t==='adm';$('#sxSt').textContent=t==='des'?'A Secretaria recebe um pendente para confirmar o desligamento.':'A Secretaria recebe um pendente para confirmar o afastamento.';};f.t.onchange=upd;upd();
  f.onsubmit=e=>{e.preventDefault();sxClr(f);const m=byId(f.m.value),t=f.t.value;
   if(!f.d.value)return sxErr(f,'d','Informe a data');if(t==='afa'&&!f.r.value)return sxErr(f,'r','Informe a data de revisão');if(f.r.value&&f.r.value<f.d.value)return sxErr(f,'r','A revisão não pode ser antes do registro');
   if(!f.o.value.trim())return sxErr(f,'o','Escreva a observação');
   const x={id:'ds'+Date.now(),m:m.n,t,d:f.d.value,rev:f.r.value,resp:f.rp.value,obs:f.o.value.trim(),req:t==='afa'?'Away':t==='des'?'Dismissed':null,st:'vigente',h:[[f.d.value,'Registro criado']]};SX_DISC.unshift(x);
      sxLog('Registrou','Disciplina',m.n,SX_DISC_T[t][0]);closeDlg();render();toast(t==='adm'?'Registro criado':'Registro criado · a Secretaria foi avisada para confirmar a mudança de situação');};},
 sxDiRev:v=>{const x=SX_DISC.find(y=>y.id===v);sxDlg('Registrar revisão',esc(x.m),sxF('Como foi a conversa','<input name="n" autocomplete="off" placeholder="Resumo curto">')+sxF('Próxima revisão (opcional)',`<input type="date" name="r" value="${D_PLUS(60)}">`),sxOk('Registrar revisão'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();sxClr(f);if(!f.n.value.trim())return sxErr(f,'n','Escreva o resumo');x.h.push([SX_TODAY,'Revisão: '+f.n.value.trim()]);x.rev=f.r.value;sxLog('Editou','Disciplina',x.m,'Revisão registrada');closeDlg();render();toast('Revisão registrada');};},
 sxDiEnd:v=>{const x=SX_DISC.find(y=>y.id===v),m=sxMem(x.m),back=m&&sxSitOf(m)==='afastado'&&x.t==='afa'&&!!x.conf;
  sxDlg('Encerrar registro',esc(x.m)+' · '+SX_DISC_T[x.t][0],sxF('Motivo do encerramento','<input name="n" autocomplete="off" placeholder="Ex.: Restauração concluída">')+(back?'<p class="hint">A Secretaria recebe um pendente para confirmar a volta do membro à situação Ativo.</p>':''),sxOk('Encerrar'));
  const f=$('#sxF');f.onsubmit=e=>{e.preventDefault();sxClr(f);if(!f.n.value.trim())return sxErr(f,'n','Informe o motivo');x.st='encerrada';x.rev='';x.h.push([SX_TODAY,'Encerrado: '+f.n.value.trim()]);if(back)x.ret='pend';sxLog('Encerrou','Disciplina',x.m);closeDlg();render();toast(back?'Registro encerrado · a Secretaria foi avisada para confirmar a volta':'Registro encerrado');};}
});
function D_PLUS(n){const d=new Date(Date.parse(SX_TODAY)+n*864e5);return d.toISOString().slice(0,10);}

/* ---------- informe de contribuições (Financeiro › Relatórios) ---------- */
SX_DOC_T['Informe de contribuições']={ic:'wallet',fin:true,need:()=>'',txt:(m,o)=>`Informamos que ${m.n}, CPF ${o.cpf}, contribuiu com esta igreja, no ano-calendário de ${o.year}, o valor total de ${brl2(o.total)}, em ${o.qt} ${o.qt>1?'contribuições identificadas':'contribuição identificada'}, conforme os registros da tesouraria. Valores de doações anônimas não constam deste informe.`};
{const _n=sxDocDlg;sxDocDlg=pre=>{_n(pre);const s=$('#sxT');if(s)[...s.options].forEach(o=>{if(SX_DOC_T[o.value].fin)o.remove();});};}
const sxCpf=m=>'***.'+String(400+(m.n.length*37)%500)+'.***-'+String(10+(m.n.length*7)%80);
function sxDonors(y){const by={};CAMPS.forEach(c=>c.donors.forEach(d=>{if(d[0]==='Anônimo'||!d[2].startsWith(y))return;const o=by[d[0]]||(by[d[0]]={n:d[0],v:0,qt:0});o.v+=d[1];o.qt++;}));
 return Object.values(by).map(o=>{const m=MEMBERS.find(x=>x.n===o.n&&x.st==='integrado');return {...o,m,doc:m?SX_DOCS.find(d=>d.mid===m.id&&d.t==='Informe de contribuições'&&d.st==='valido'&&d.text.includes('ano-calendário de '+y)):null};}).sort((a,b)=>b.v-a.v);}
function sxInforme(){
 const y=S.sxIc,l=sxDonors(y),ok=l.filter(x=>x.m),todo=ok.filter(x=>!x.doc);
 return `<section class="card sx-list rise" style="--d:3;margin-top:16px"><div class="sx-bar" style="padding-top:18px"><div><h2 class="sx-h2">Informe anual de contribuições</h2><p class="who" style="margin:4px 0 0">Total doado por pessoa no ano-calendário, para a declaração de imposto de renda. Só entram doadores identificados, com cadastro e CPF; doações anônimas ficam de fora.</p></div>
   <div class="pact"><label class="fld sx-mes"><span class="selw"><select data-scs="ic">${['2026','2025'].map(a=>`<option ${y===a?'selected':''}>${a}</option>`).join('')}</select>${ic('updown',14)}</span></label><button class="btn pri" data-a="sxInfAll" ${todo.length?'':'disabled'}>${ic('file',15)}Gerar todos${todo.length?' ('+todo.length+')':''}</button></div></div>
  ${l.length?`<div class="sx-t inf thead"><span>Doador</span><span>Contribuições</span><span>Total no ano</span><span>CPF</span><span></span></div>${l.map(x=>`<div class="sx-t inf"><span class="sx-n">${x.m?mav(x.m):sxAv(x.n)}<b>${esc(x.n)}</b></span><span>${x.qt}</span><span><b>${brl2(x.v)}</b></span><span>${x.m?sxPill('Informado','var(--st-int)','var(--st-int-bg)'):sxPill('Sem cadastro','var(--st-sol)','var(--st-sol-bg)')}</span><span>${!x.m?'<small class="who">Cadastre a pessoa para emitir</small>':x.doc?`<button class="btn sec sm" data-a="sxDocOpen" data-v="${x.doc.id}">Ver informe</button>`:`<button class="btn pri sm" data-a="sxInfOne" data-v="${esc(x.n)}">Gerar informe</button>`}</span></div>`).join('')}`:`<div class="mempty"><p>Sem doações identificadas em ${y}.</p><span>${y==='2025'?'Os dados de exemplo estão em 2026.':'Quando houver doações com cadastro, elas aparecem aqui.'}</span></div>`}</section>`;
}
function sxInfEmit(x,y){const sig=SX_MAND.find(z=>sxMandSt(z)==='vigente'&&sxCargo(z.cg).n==='Tesoureiro(a)');
 const d=sxNewDoc('Informe de contribuições',x.m,{total:x.v,qt:x.qt,year:y,cpf:sxCpf(x.m),sig:sig?sig.pessoa+' — Tesoureiro(a)':'Tesouraria',by:sxMe});
 sxLog('Emitiu','Documento','Informe de contribuições '+y+' nº '+d.num,x.n);return d;}
Object.assign(A,{
 sxInfOne:v=>{const x=sxDonors(S.sxIc).find(o=>o.n===v);if(!x||!x.m)return;const d=sxInfEmit(x,S.sxIc);render();toast('Informe nº '+d.num+' gerado');setTimeout(()=>sxDocView(d.id),250);},
 sxInfAll:()=>{const l=sxDonors(S.sxIc).filter(x=>x.m&&!x.doc);l.forEach(x=>sxInfEmit(x,S.sxIc));render();toast(l.length+' informes gerados');}
});
{const _fr=fRel;fRel=()=>_fr().replace('<h1>Relatórios</h1>','<h1>Análises</h1>').replace('DRE por categoria e fluxo de caixa','DRE, fluxo de caixa e informe de contribuições')+sxInforme();}

/* ---------- ligações e eventos ---------- */
{const _ph=placeholder;placeholder=id=>{const f={'sec-vis':secVis,'sec-atos':secAtos,'sec-docs':secDocs,'sec-cargos':secCargos,'sec-ana':secAna,disciplina:discPage}[id];return f?f():_ph(id);};}
document.addEventListener('input',e=>{const t=e.target,k=t&&t.dataset&&t.dataset.scq;if(!k)return;
 if(k==='doc'){S.sxDocQ=t.value;$('#sxDl').innerHTML=sxDocList();}
 else if(k==='arq'){S.sxArqQ=t.value;$('#sxAl').innerHTML=sxArqList();}
 else if(k==='pick'){const q=norm(t.value);$$('#sxPick label').forEach(l=>{l.hidden=!!q&&!l.dataset.n.includes(q);});}});
document.addEventListener('change',e=>{const t=e.target,k=t&&t.dataset&&t.dataset.scs;if(!k)return;if(k==='mes'){S.sxMes=t.value;render();}else if(k==='ic'){S.sxIc=t.value;render();}});

[['Marina Costa','1992-09-30'],['Felipe Andrade','1988-10-01'],['Juliana Prado','1995-10-03'],['Otávio Lins','1990-10-04']].forEach(([n,d])=>{const m=sxMem(n);if(m)m.nasc=d;});


