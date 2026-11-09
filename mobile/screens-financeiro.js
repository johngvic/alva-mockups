/* =========================================================
   GESTÃO AVANÇADA · Financeiro, Relatórios e Administração
   Financeiro usa o motor de lista (screens-pessoas.js); Visão geral, DRE e Informe anual são telas de leitura.
   ========================================================= */
LS_READY.push('financeiro','admin');
const FIN=(a,p,f)=>R(p,a,f);
const pg=(a,p)=>FIN(a,p,([n,s,st])=>({n,s,st,d:[['Detalhe',s],['Conta','Conta principal']]}));
const dre=(t,rows,tot)=>`<section class="stack g3"><p class="eb2">${t}</p><div class="vl">${rows.map(([l,v])=>`<div class="vr"><span class="grow">${l}</span><b>${v}</b></div>`).join('')}<div class="vr"><span class="grow"><b>Total</b></span><b class="vamt">${tot}</b></div></div></section>`;
Object.assign(LSD,{financeiro:{
 'Visão geral':{custom:()=>{const l=LSD.financeiro['Lançamentos'].rows.slice(0,5);return `<div class="vk"><div><b>R$ 48,3 mil</b><span>Saldo</span></div><div><b>R$ 6,2 mil</b><span>A pagar</span></div><div><b>R$ 9,8 mil</b><span>A receber</span></div></div>
  <section class="stack g3"><p class="eb2">Últimos lançamentos</p><div class="vl">${l.map(r=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}</span></span></div>`).join('')}</div></section>`;}},
 'Caixa de entrada':{noun:'documentos',add:'Enviar documento',fields:[['n','Documento','Ex.: boleto-internet.pdf'],['s','De onde veio','Ex.: E-mail · empresas@netfacil.example']],ST:{co:['warning','Para conferir'],la:['ok','Lançado'],ig:['off','Ignorado']},acts:[['Lançar despesa','la',['co']],['Ignorar','ig',['co']]],
  rows:FIN([['print-compra-equipamento-som.jpg','WhatsApp · Marcos (Louvor)','co'],['nota-material-limpeza.pdf','Envio manual · Rafael Pereira','co'],['recibo-aluguel-salao.pdf','E-mail · contratos@imobcentral.example','co'],['comprovante-material-limpeza.pdf','E-mail · pedidos@limpabem.example','la'],['boleto-internet-setembro.pdf','E-mail · empresas@netfacil.example','la'],['foto-recibo-antigo.jpg','Envio manual · Rafael Pereira','ig']],'fe',([n,s,st])=>({n,s,st,d:[['Origem',s],['Recebido','set 2026']]}))},
 'Lançamentos':{noun:'lançamentos',add:'Novo lançamento',ST:{ok:['ok','Aprovado'],pe:['warning','Aguardando aprovação']},acts:[],
  /* FIN-P-97/98: o que o Admin lança já nasce aprovado; quem só edita, fica pendente; o Admin corrige o aprovado enquanto o mês está aberto */
  newSt:()=>can('financeiro','aprovar')?'ok':'pe',canEdit:r=>!r.lock&&(r.st==='pe'||can('financeiro','aprovar')),editLabel:r=>r.st==='ok'?'Corrigir':'Editar',noDel:r=>r.st==='ok',
  rows:[
    {id:'fl0',...{n:"Oferta missionária — Culto de quarta",s:"29 set · + R$ 1.860,00",st:'pe',d:[['Data e valor',"29 set · + R$ 1.860,00"],['Conta','Conta principal'],['Categoria',"Ofertas"],['Lançado por',"Larissa Pires"],['Competência',"Set/2026"]]}},
    {id:'fl1',...{n:"Dízimos e Ofertas — Culto Dom",s:"17 set · + R$ 12.480,00",st:'ok',d:[['Data e valor',"17 set · + R$ 12.480,00"],['Conta','Conta principal'],['Categoria',"Dízimos"],['Lançado por',"Rafael Pereira"],['Competência',"Set/2026"]]}},
    {id:'fl2',...{n:"Pagamento fornecedor gráfica",s:"15 set · − R$ 890,00",st:'ok',d:[['Data e valor',"15 set · − R$ 890,00"],['Conta','Conta principal'],['Categoria',"Comunicação"],['Lançado por',"Rafael Pereira"],['Competência',"Set/2026"]]}},
    {id:'fl3',...{n:"Aluguel do salão",s:"14 set · − R$ 3.200,00",st:'ok',d:[['Data e valor',"14 set · − R$ 3.200,00"],['Conta','Conta principal'],['Categoria',"Estrutura"],['Lançado por',"Rafael Pereira"],['Competência',"Set/2026"]]}},
    {id:'fl4',...{n:"Campanha Retiro Jovens",s:"12 set · + R$ 5.300,00",st:'ok',d:[['Data e valor',"12 set · + R$ 5.300,00"],['Conta','Conta principal'],['Categoria',"Doações"],['Lançado por',"Rafael Pereira"],['Competência',"Set/2026"]]}},
    {id:'fl5',...{n:"Material de limpeza",s:"10 set · − R$ 340,00",st:'ok',d:[['Data e valor',"10 set · − R$ 340,00"],['Conta','Conta principal'],['Categoria',"Manutenção"],['Lançado por',"Rafael Pereira"],['Competência',"Set/2026"]]}},
    {id:'fl6',...{n:"Manutenção ar-condicionado",s:"5 set · − R$ 1.200,00",st:'ok',lock:1,d:[['Data e valor',"5 set · − R$ 1.200,00"],['Conta','Conta principal'],['Categoria',"Manutenção"],['Lançado por',"Rafael Pereira"],['Competência',"Ago/2026 · mês fechado"]]}}]},
 'Contas a pagar e a receber':{noun:'contas',add:'Nova conta',ST:{pe:['info','Em aberto'],at:['danger','Atrasada'],pg:['ok','Quitada']},acts:[['Dar baixa','pg',['pe','at']]],
  rows:FIN([
    ['Energia elétrica','A pagar · Vence 28 set · R$ 640,00','at','Todo mês'],
    ['Fornecedor gráfica — banners','A pagar · Vence 30 set · R$ 890,00','pe','Não repete'],
    ['Aluguel do salão — Outubro','A pagar · Vence 5 out · R$ 3.200,00','pe','Todo mês'],
    ['Internet e telefonia','A pagar · Vence 8 out · R$ 289,00','pe','Todo mês'],
    ['Equipamentos de som','A pagar · Vence 20 set · R$ 2.400,00','at','Parcela 2 de 3 · já baixado R$ 1.000,00'],
    ['Material de limpeza','A pagar · Vence 10 set · R$ 340,00','pg','Não repete'],
    ['Conferência Missões — inscrições','A receber · Vence 9 out · R$ 4.800,00','pe','Não repete'],
    ['Aluguel do salão — Associação Esportiva Vida','A receber · Vence 25 set · R$ 1.200,00','at','Não repete · já recebido R$ 400,00'],
    ['Inscrições — Retiro de Jovens 2026','A receber · Vence 27 set · R$ 10.440,00','pg','Não repete']],'fp',([n,s,st,x])=>({n,s,st,d:[['Tipo',s.split(' · ')[0]],['Vencimento',s.split(' · ')[1].replace('Vence ','')],['Valor',s.split(' · ')[2]],['Repetição ou parcela',x]]}))},
 'Aprovações':{noun:'aprovações',noAdd:1,ro:1,ST:{pe:['warning','Pendente'],ap:['ok','Aprovada'],re:['danger','Rejeitada']},acts:[['Aprovar','ap',['pe'],'aprovar']],extra:r=>r.st==='pe'&&can('financeiro','aprovar')?`<button class="btn outline md block" data-a="finRej" data-v="${r.id}">Rejeitar</button>`:'',
  rows:FIN([['Oferta missionária — Culto de quarta','Lançamento · + R$ 1.860,00 · Larissa Pires','pe'],['Extrato Bradesco (OFX)','Importação · 18 movimentos · Rafael Pereira','pe'],['Dízimos e Ofertas — Culto Dom','Lançamento · + R$ 12.480,00 · Larissa Pires','ap']],'fa',([n,s,st])=>({n,s,st,d:[['Tipo',s.split(' · ')[0]],['Detalhe',s.split(' · ').slice(1).join(' · ')],['Quem aprova','Só o Admin do Financeiro']]}))},
 'Importar e conciliar':{noun:'movimentos do extrato',add:'Importar extrato',fields:[['n','Descrição',''],['s','Valor','']],ST:{sp:['warning','Sem par'],co:['ok','Conciliado']},acts:[['Conciliar com a sugestão','co',['sp']]],
  rows:pg([['PIX recebido · Dízimos','+ R$ 1.200,00 · sugestão: Dízimos 29 set','sp'],['Débito · Enel','− R$ 890,00 · sugestão: Conta de energia','sp'],['TED · Aluguel','− R$ 2.400,00 · sugestão: Aluguel da sala','sp'],['PIX recebido · Cafeteria','+ R$ 77,00 · conciliado com vendas de hoje','co']],'fi')},
 'Exportação contábil':{custom:()=>{const pen=LSD.financeiro['Lançamentos'].rows.filter(r=>r.st==='pe').length;
   const chk=(ok,t,s)=>`<div class="vr"><span class="ovl ${ok?'in':'out'}">${ic(ok?'check':'alert',16,2.2)}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${t}</span><span class="vs">${s}</span></span></div>`;
   return `<p class="vs">Setembro de 2026</p><section class="stack g3"><p class="eb2">Antes de exportar</p><div class="vl">${chk(false,'Mês ainda aberto','Feche o mês antes de exportar, para o arquivo não mudar depois.')}${chk(!pen,pen?pen+(pen>1?' lançamentos aguardando aprovação':' lançamento aguardando aprovação'):'Nada aguardando aprovação','Só o que foi aprovado entra no pacote.')}${chk(true,'Contas usadas com código contábil','O arquivo sai pronto para importar.')}</div></section>${can('financeiro','editar')?'<button class="btn primary md block" data-a="finExp">Gerar arquivo (CSV)</button>':''}`;}},
 'Doações':{noun:'doações',add:'Nova doação',av:1,fields:[['n','Doador',''],['s','Valor e destino','']],ST:{ok:['ok','Confirmada'],es:['off','Estornada']},acts:[],rows:pg([['Carlos Mendes','R$ 350,00 · Contribuição livre','ok'],['Ana Costa','R$ 120,00 · Retiro de Jovens','ok'],['Paulo Alves','R$ 200,00 · Reforma do Templo','es']],'fd')},
 'Caixas e vendas':{noun:'caixas',add:'Novo caixa',fields:[['n','Caixa',''],['s','Responsável','']],ST:{ab:['info','Aberto'],fe:['ok','Fechado']},acts:[['Fechar caixa','fe',['ab']]],rows:pg([['Cafeteria · hoje','R$ 77,00 em vendas','ab'],['Restaurante · hoje','R$ 116,00 em vendas','ab'],['Loja · ontem','R$ 235,00 em vendas','fe']],'fv')},
 'Informe anual':{custom:()=>`<div class="vl">${[['2026','Em andamento'],['2025','Fechado'],['2024','Fechado']].map(([y,s])=>`<div class="vr"><span class="grow stack" style="gap:2px"><span class="vn">Informe ${y}</span><span class="vs">${s}</span></span>${can(S.gmod,'editar')?`<button class="btn outline sm" data-a="finPdf" data-v="${y}">Gerar PDF</button>`:''}</div>`).join('')}</div>`},
 'DRE':{custom:()=>`<p class="vs">Setembro de 2026</p>${dre('Receitas',[['Dízimos','R$ 38.400,00'],['Ofertas','R$ 12.150,00'],['Cafeteria e Restaurante','R$ 2.980,00'],['Loja','R$ 1.720,00']],'R$ 55.250,00')}${dre('Despesas',[['Pessoal','R$ 21.000,00'],['Aluguel e manutenção','R$ 6.400,00'],['Operação','R$ 4.230,00']],'R$ 31.630,00')}<div class="gnote"><b>Resultado do mês</b><span>+ R$ 23.620,00</span></div>`},
 'Fechamentos':{noun:'fechamentos',noAdd:1,ro:1,ST:{ab:['info','Aberto'],fe:['ok','Fechado']},acts:[],
  /* FIN-P-92: fechar o mês exige a revisão completa; isso fica no painel web */
  extra:r=>r.st==='ab'?'<p class="callout">Fechar o mês exige a revisão completa do fechamento e é feito no painel web.</p>':'',
  rows:pg([['Setembro de 2026','Resultado parcial · + R$ 23.620,00','ab'],['Agosto de 2026','Resultado · + R$ 19.870,00','fe'],['Julho de 2026','Resultado · + R$ 21.040,00','fe']],'ff')},
 'Contas financeiras':{noun:'contas',add:'Nova conta',fields:[['n','Nome da conta',''],['s','Banco e saldo','']],ST:{at:['ok','Ativa']},acts:[],rows:pg([['Conta principal','Banco do Brasil · R$ 41.200,00','at'],['Conta de eventos','Banco do Brasil · R$ 5.320,00','at'],['Caixa físico','Dinheiro · R$ 1.800,00','at']],'fc')},
 'Plano e centros de custo':{noun:'cadastros',add:'Novo cadastro',ST:{at:['ok','Ativo']},acts:[],
  rows:FIN([['Dízimos','Conta do plano · Receita · 1.01'],['Ofertas','Conta do plano · Receita · 1.02'],['Pessoal','Conta do plano · Despesa · 2.01'],['Aluguel e manutenção','Conta do plano · Despesa · 2.02'],['Geral','Centro de custo · Rafael Pereira'],['Cultos','Centro de custo · Davi Melo'],['Cafeteria','Centro de custo · Giovanna Martins'],['Eventos','Centro de custo · Ana Costa'],['Ministério Kids','Centro de custo · Camila Pereira'],['Missões','Centro de custo · Marcos Lima']],'fo',([n,s])=>({n,s,st:'at',k:s.startsWith('Centro')?'cc':'plano',d:[['Cadastro',s.split(' · ')[0]],['Detalhe',s.split(' · ').slice(1).join(' · ')]]}))},
 'Contatos':{noun:'contatos',add:'Novo contato',av:1,fields:[['n','Nome',''],['s','Tipo','']],ST:{at:['ok','Ativo']},acts:[],rows:pg([['Enel','Fornecedor · energia','at'],['Climatec','Fornecedor · manutenção','at'],['Papelaria Central','Fornecedor · material','at']],'ft')},
 'Mensagens':{noun:'mensagens',add:'Nova mensagem',fields:[['n','Assunto',''],['s','Para','']],ST:{nv:['warning','Nova'],rs:['ok','Respondida']},acts:[['Marcar como respondida','rs',['nv']]],rows:pg([['Dúvida sobre o informe','Camila Pereira','nv'],['Comprovante de doação','Paulo Alves','rs']],'fm')}

},admin:{
 'Usuários e permissões':{noun:'usuários',add:'Convidar usuário',av:1,fields:[['n','Nome',''],['s','E-mail','']],ST:{at:['ok','Ativo'],cv:['warning','Convidado'],su:['danger','Suspenso']},acts:[],sheet:'usr',rows:[]}
}});

/* ---- Administração (Tiago, 08/11/2026): usuário Ativo, Convidado ou Suspenso; papel único (ADR-0012) e acessos por área em CONSULTA.
 * Dar ou mudar acesso, papéis e matriz ficam na web (segurança). No app: suspender e reativar o acesso (Administrar) e revogar ou restabelecer um visitante. ---- */
const ALV=['Nenhum','Ver','Editar','Admin da área'],AMODS=GMODS.filter(m=>m[0]!=='admin');
const ADMU=[['Carlos Andrade','Administrador',{},'at','hoje'],['Rafael Pereira','Pastor',{},'at','hoje'],['Marcos Lima','Pastor',{cuidado:3},'at','ontem'],['Giovanna Martins','Líder',{cafe:3},'at','há 3 dias'],['Ana Costa','Líder',{kids:2},'at','ontem'],['Patrícia Oliveira','Secretaria',{secretaria:3,financeiro:1},'at','hoje'],['Davi Melo','Voluntário',{conteudo:1},'at','há 5 dias'],['Elisa Moura','Líder',{espacos:2},'cv','nunca'],['Josias Ferreira','Voluntário',{zeladoria:2},'su','há 40 dias']].map(([n,role,acc,st,last],i)=>({id:'au'+i,n,role,acc,st,last,d:[]}));
const admSync=()=>ADMU.forEach(u=>{const k=Object.keys(u.acc).filter(m=>u.acc[m]>0).length;u.s=u.role+(u.role==='Administrador'?' · todas as áreas':k?' · '+k+(k>1?' áreas':' área'):'')+' · último acesso '+u.last;u.d=[['Papel',u.role],['Último acesso',u.last]];});
admSync();LSD.admin['Usuários e permissões'].rows=ADMU;
Object.defineProperty(GPEND,'admin',{configurable:true,enumerable:true,get:()=>[['Convites de acesso pendentes',ADMU.filter(u=>u.st==='cv').length]].filter(x=>x[1]>0)});
const AROLES=['Administrador','Pastor','Líder','Secretaria','Voluntário'];S.am={uid:''};
const admLvlRows=u=>AMODS.map(m=>{const l=u.role==='Administrador'?3:(u.acc[m[0]]||0),ed=can('admin','editar')&&u.role!=='Administrador'&&u.st!=='su';return `<div class="vr"><span class="grow vn">${m[1]}</span>${ed?`<button class="vlv l${l}" data-a="admLvl" data-v="${u.id}|${m[0]}">${ALV[l]}</button>`:vsTag(l?'info':'off',ALV[l])}</div>`;}).join('');
function admUserSheet(id){const u=ADMU.find(x=>x.id===id),adm=can('admin','aprovar'),b=[];
 if(adm&&u.role!=='Administrador'&&u.st==='at')b.push(`<button class="btn danger md block" data-a="admSusp" data-v="${id}">Suspender o acesso</button>`);
 if(adm&&u.st==='su')b.push(`<button class="btn primary md block" data-a="admReat" data-v="${id}">Reativar o acesso</button>`);
 sheet(`<div class="stack g5"><div class="row g3" style="align-items:center">${pavM(u.n,'ceu','lg')}<div class="grow stack" style="gap:4px;align-items:flex-start"><h3 class="t2">${esc(u.n)}</h3>${vsTag({at:'ok',cv:'warning',su:'danger'}[u.st],{at:'Ativo',cv:'Convidado',su:'Suspenso'}[u.st])}</div></div>
 <div class="field"><label>Papel</label>${vsChips('admRole',u.role,AROLES.map(x=>[x,x]))}</div><p class="vs">Último acesso: ${u.last}</p>
 <div class="stack g2"><p class="eb2">Acessos por área</p><div class="vl vsel" id="admAcc">${admLvlRows(u)}</div><p class="vs">Um papel por pessoa. O acesso vale o maior entre o papel e as áreas. Papéis e a matriz ficam na web.</p></div>
 <div class="stack g3">${b.join('')}<button class="tlink" data-a="closeSheet">Concluir</button></div></div>`);S.am.uid=u.id;$$('.sheet [data-a=admRole]').forEach(b=>{if(!can('admin','editar'))b.disabled=true;});}
const admU=()=>ADMU.find(x=>x.id===S.am.uid);
function admAccSheet(){const m=gMod(S.gmod);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Quem tem acesso a ${m[1]}</h3><p class="callout">Toque no nível para mudar. Administrador sempre tem tudo.</p></div><div class="vl vsel" id="admAccM">${ADMU.filter(u=>u.st!=='su').map(u=>{const l=u.role==='Administrador'?3:(u.acc[m[0]]||0);return `<div class="vr">${pavM(u.n,'ceu')}<span class="grow stack" style="gap:2px"><span class="vn">${esc(u.n)}</span><span class="vs">${u.role}</span></span>${can('admin','editar')&&u.role!=='Administrador'?`<button class="vlv l${l}" data-a="admLvlM" data-v="${u.id}">${ALV[l]}</button>`:vsTag(l?'info':'off',ALV[l])}</div>`;}).join('')}</div><button class="btn outline md block" data-a="closeSheet">Fechar</button></div>`);}
Object.assign(A,{
 admSusp:id=>{const u=ADMU.find(x=>x.id===id);vsConfirm('Suspender o acesso de '+esc(u.n.split(' ')[0])+'?',esc(u.n)+' deixa de entrar no sistema agora. Dá para reativar depois.','Suspender',()=>{u.st='su';admSync();closeSheet().then(()=>{softRender();toast('info','Acesso suspenso',u.n);});});},
 admReat:id=>{const u=ADMU.find(x=>x.id===id);u.st='at';admSync();closeSheet().then(()=>{softRender();toast('success','Acesso reativado',u.n);});},
 admRole:r=>{const u=admU();u.role=r;admSync();$$('.sheet .vchips button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===r));$('#admAcc').innerHTML=admLvlRows(u);},
 admLvl:v=>{const [id,m]=v.split('|'),u=ADMU.find(x=>x.id===id);u.acc[m]=((u.acc[m]||0)+1)%4;admSync();$('#admAcc').innerHTML=admLvlRows(u);},
 admLvlM:id=>{const m=S.gmod,u=ADMU.find(x=>x.id===id);u.acc[m]=((u.acc[m]||0)+1)%4;admSync();admAccSheet();},
 gAcc:()=>admAccSheet(),finExp:()=>toast('success','Arquivo gerado','Os lançamentos aprovados do mês foram enviados para o seu e-mail.'),finPdf:y=>toast('success','Informe '+y+' gerado','O PDF foi enviado para o seu e-mail.')
});
