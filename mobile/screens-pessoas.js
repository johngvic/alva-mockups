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
  'Membros':{noun:'membros',add:'Novo membro',av:1,fields:[['n','Nome completo','Ex.: Maria Souza'],['s','Casa e tempo de igreja','Ex.: Casa Jardins · desde 2021']],
   ST:{int:['ok','Integrado'],ing:['info','Em integração'],afa:['off','Afastado']},
   acts:[['Marcar como integrado','int',['ing','afa']],['Marcar como afastado','afa',['int','ing']]],
   rows:PN.map((n,i)=>({id:'pm'+i,n,s:LSCASAS[i%4]+' · desde '+(2016+i%9),st:i===3?'afa':i%5===4?'ing':'int',d:[['Casa',LSCASAS[i%4]],['Membro desde',String(2016+i%9)],['Telefone','(11) 9'+(8000+i*137)+'-'+(1000+i*91)],['E-mail',norm2(n.split(' ')[0])+'@email.com']]}))},
  'Integração':{noun:'pedidos',add:'Novo pedido',av:1,fields:[['n','Nome da pessoa','Ex.: Carlos Mendes'],['s','Como chegou','Ex.: Visitou o culto de domingo']],
   ST:{ag:['warning','Aguardando'],ct:['info','Em contato'],ok:['ok','Concluída']},
   acts:[['Iniciar contato','ct',['ag']],['Concluir integração','ok',['ag','ct']]],
   rows:[['Carlos Mendes','Visitou o culto de 27 set','ag'],['Luana Souza','Veio por convite de Ana Costa','ag'],['Paulo Alves','Pediu integração pelo app','ct'],['Renata Dias','Visitou a Casa Centro','ct'],['Tiago Lima','Participou da classe de batismo','ok'],['Vera Campos','Veio por convite de Marcos Lima','ok']].map(([n,s,st],i)=>({id:'pi'+i,n,s,st,d:[['Primeiro contato',(20+i)+' set'],['Responsável','Equipe de Integração']]}))}
 },
 cuidado:{
  'Discipulado':{noun:'discipulados',add:'Novo discipulado',av:1,fields:[['n','Discípulo','Ex.: Gabriel Souza'],['s','Discipulador','Ex.: Rafael Pereira']],
   ST:{at:['ok','Ativo'],pa:['off','Pausado']},acts:[['Pausar','pa',['at']],['Retomar','at',['pa']]],
   rows:[['Gabriel Souza','Rafael Pereira','at'],['Isabela Rocha','Ana Costa','at'],['Fernanda Lima','Marcos Lima','pa'],['Henrique Dias','Rafael Pereira','at'],['Larissa Melo','Juliana Reis','at']].map(([n,p,st],i)=>({id:'cd'+i,n,s:'Discipulado por '+p,st,d:[['Discipulador',p],['Encontros','Quinzenais'],['Último encontro',(2+i*3)+' out']]}))},
  'Acompanhamento':{noun:'casos',add:'Novo caso',av:1,fields:[['n','Pessoa','Ex.: Maria Santos'],['s','Resumo do caso','Ex.: Precisa de visita']],
   ST:{ur:['danger','Urgente'],nm:['info','Em andamento'],en:['ok','Encerrado']},acts:[['Assumir acompanhamento','nm',['ur']],['Encerrar caso','en',['ur','nm']]],
   rows:[...URG.map(u=>({id:'ca'+u.id,n:u.who,s:u.kind+' · '+u.txt,st:'ur',d:[['Tipo',u.kind],['Aberto em',u.d],['Responsável',u.resp],['Resumo',u.txt]]})),{id:'ca9',n:'Sérgio Matos',s:'Conversa pastoral sobre o casamento',st:'nm',d:[['Tipo','Aconselhamento'],['Aberto em','02/09/2026'],['Responsável','Pr. Marcos Lima']]},{id:'ca10',n:'Rita Gomes',s:'Visita após o nascimento do filho',st:'en',d:[['Tipo','Visita'],['Encerrado em','20/09/2026'],['Responsável','Diac. Ana Costa']]}]},
  'Pedidos de oração':{noun:'pedidos',add:'Novo pedido',fields:[['n','Quem pede','Ex.: Pedro Almeida'],['s','Pedido','Ex.: Pela família']],
   ST:{ag:['warning','Aguardando'],or:['ok','Orando']},acts:[['Estou orando','or',['ag']]],
   rows:[['Pedro Almeida','Pela família depois de perder o emprego','ag'],['Joana Ribeiro','Recuperação depois da cirurgia','ag'],['Marcos Lima','Viagem missionária da equipe','or'],['Camila Pereira','Sabedoria numa decisão no trabalho','ag'],['Davi Melo','Pela mãe, que está internada','or']].map(([n,s,st],i)=>({id:'po'+i,n,s,st,d:[['Recebido em',(15+i)+'/09/2026'],['Visibilidade',i%2?'Só a intercessão':'Toda a liderança'],['Pedido',s]]}))}
 },
 comunidade:{
  'Casas de Apascentamento':{noun:'casas',add:'Nova casa',fields:[['n','Nome da casa','Ex.: Casa Lapa'],['s','Dia, horário e líder','Ex.: Quartas, 19h30 · Ana e Paulo']],
   ST:{at:['ok','Ativa'],ab:['warning','Sem vagas'],fo:['info','Em formação']},acts:[['Marcar como ativa','at',['ab','fo']],['Fechar vagas','ab',['at']]],
   rows:[...CASAS.map(c=>({id:'cc'+c.id,n:c.t,s:c.day+', '+c.h+' · '+c.leader,st:c.open?'at':'ab',d:[['Encontro',c.day+', '+c.h],['Líder',c.leader],['Endereço',c.addr],['Pessoas',String(c.n)]]})),{id:'cc9',n:'Casa Lapa',s:'Segundas, 20h · Fernanda e Tiago',st:'fo',d:[['Encontro','Segundas, 20h'],['Líder','Fernanda e Tiago'],['Situação','Em formação']]}]},
  'Redes de casa':{noun:'redes',add:'Nova rede',fields:[['n','Nome da rede','Ex.: Rede Norte'],['s','Supervisor','Ex.: Pr. Marcos Lima']],
   ST:{at:['ok','Ativa']},acts:[],rows:[['Rede Centro','Pr. Marcos Lima',3],['Rede Sul','Diac. Ana Costa',2],['Rede Jovens','Davi Melo',2]].map(([n,p,c],i)=>({id:'cr'+i,n,s:'Supervisão de '+p+' · '+c+' casas',st:'at',d:[['Supervisor',p],['Casas',String(c)]]}))},
  'Ministérios':{noun:'ministérios',add:'Novo ministério',fields:[['n','Nome','Ex.: Louvor'],['s','Resumo','Ex.: Cuida da música dos cultos']],
   ST:{at:['ok','Ativo']},acts:[],rows:MINIS.map(m=>({id:'cm'+m.id,n:m.t,s:m.s,st:'at',d:[['Encontros',m.when||'—'],['Líder',m.lead||'—']]}))}
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
S.ls={key:'',q:'',f:'all'};
const lsC=(mod,sec)=>{const c=LSD[mod][sec],o=APPSEC[mod+'|'+sec];return o?Object.assign(Object.create(c),o):c;};
const lsCfg=()=>{const sc=gMod(S.gmod)[5];return lsC(S.gmod,sc.length>5?S.gsec:sc[S.gtab]);};
const lsRow=id=>lsCfg().rows.find(r=>r.id===id);
const lsTag=(c,st)=>{const t=c.ST[st];return vsTag(t[0],t[1]);};
function lsRows(c){const q=norm2(S.ls.q),l=c.rows.filter(r=>(S.ls.f==='all'||r.st===S.ls.f)&&(!q||norm2(r.n+' '+r.s).includes(q)));let g=null;
 return l.length?`<div class="vl">${l.map(r=>{const head=r.g&&r.g!==g?(g=r.g,`<p class="eb2" style="padding:16px 0 8px;box-shadow:inset 0 -1px 0 var(--line)">${r.g}</p>`):'';return head+`<button class="vr tap" data-a="lsOpen" data-v="${r.id}">${c.av?pavM(r.n,lsAv[r.id.length%6]):''}<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}</span></span>${lsTag(c,r.st)}</button>`;}).join('')}</div>`:vsEmpty('Nada encontrado','Tente outra busca ou filtro.');}
function lsBody(m,sec){const c=lsC(m[0],sec);if(c.restrict&&S.role!=='admin')return `<div class="stack g5 vs-root">${vsEmpty('Área restrita','Só o Administrador e quem a igreja autorizar acessam este registro. Cada consulta vai para a auditoria.')}</div>`;if(c.custom)return `<div class="stack g5 vs-root">${c.custom()}</div>`;const key=m[0]+'|'+sec;if(S.ls.key!==key)Object.assign(S.ls,{key,q:'',f:'all'});
 const n=st=>c.rows.filter(r=>st==='all'||r.st===st).length,sts=Object.keys(c.ST);
 return `<div class="stack g5 vs-root">${vsHead(c.rows.length+' '+c.noun,c.noAdd?'':vsAdd(m[0],'lsNew',c.add))}${c.rows.length>6?vsSearch('lsQ','Buscar',''):''}${sts.length>1?vsChips('lsF',S.ls.f,[['all','Todos',n('all')],...sts.map(s=>[s,c.ST[s][1],n(s)])]):''}<div id="lsList">${lsRows(c)}</div></div>`;}
function lsSheet(id){const m=S.gmod,c=lsCfg(),r=lsRow(id);if(c.sheet==='usr')return admUserSheet(id);const acts=c.acts.filter(a=>a[2].includes(r.st)&&can(m,a[3]||'editar'));
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
 lsF:v=>{S.ls.f=v;softRender();},lsOpen:id=>lsSheet(id),lsNew:()=>lsForm(),lsEdit:id=>lsForm(id),
 lsAct:v=>{const [id,to]=v.split('|'),r=lsRow(id),c=lsCfg();r.st=to;closeSheet();softRender();toast('success',c.ST[to][1],r.n);},
 lsDel:id=>{const r=lsRow(id),c=lsCfg();vsConfirm('Excluir “'+esc(r.n)+'”?',c.delBody||'Isso remove o registro da lista e não pode ser desfeito.','Excluir',()=>{c.rows.splice(c.rows.indexOf(r),1);closeSheet();softRender();toast('success','Excluído',r.n);});}
});
phone.addEventListener('input',e=>{if(e.target.id!=='lsQ')return;S.ls.q=e.target.value;const l=$('#lsList');if(l)l.innerHTML=lsRows(lsCfg());});
