/* =========================================================
   FORMULÁRIOS COMPLETOS · demais módulos
   Usa o motor de screens-forms.js. Cada seção declara seus campos;
   as linhas de exemplo já existentes viram valores do formulário
   a partir do subtítulo (partes separadas por " · ").
   ========================================================= */
{
const B=t=>(k,l,o)=>Object.assign({k,l,t},o||{});
const tx=B('text'),ar=B('area'),dt=B('date'),tm=B('time'),nu=B('num'),mo=B('money'),lk=B('link'),im=B('image'),tg=B('tog');
const sl=(k,l,opts,o)=>Object.assign({k,l,t:'sel',opts},o||{}),mu=(k,l,opts,o)=>Object.assign({k,l,t:'multi',opts},o||{}),fl=(k,l,o)=>Object.assign({k,l,t:'file'},o||{});
const H=h=>({h}),half=o=>Object.assign({half:1},o||{});
const names=(m,s)=>LSD[m][s].rows.map(r=>r.n);
const PEOPLE=names('pessoas','Membros'),SALAS=names('kids','Salas'),MINIST=names('comunidade','Ministérios'),CASAS=names('comunidade','Casas de Apascentamento');
const FAIXAS=['0 a 2 anos','3 a 4 anos','5 a 6 anos','7 a 9 anos','10 a 12 anos'],PASTORES=['Pr. Rafael Pereira','Pr. Marcos Lima','Convidado'];
const conv=(f,p)=>{const t=f.t||'text';if(f.pre&&p.startsWith(f.pre))p=p.slice(f.pre.length);
 if(t==='date')return rfIso(p)||'';if(t==='num')return String(parseInt(p.replace(/\./g,''))||'');if(t==='money')return p.replace(/[^\d.,]/g,'');if(t==='multi')return [p];return p;};
const def=(mod,sec,o)=>{const c=LSD[mod][sec];Object.assign(c,o);
 c.rows.forEach(r=>{if(r.v)return;const parts=r.s.split(' · '),v={[c.main]:r.n},n=c.sub.length;
  c.sub.forEach((k,i)=>{const f=c.form.find(y=>y.k===k);if(!f||parts[i]==null)return;v[k]=conv(f,i===n-1?parts.slice(i).join(' · '):parts[i]);});
  if(c.seed)Object.assign(v,c.seed(r.s,r.n));r.v=v;});};

/* ---------- Pessoas ---------- */
def('pessoas','Membros',{main:'n',sub:['casa','desde'],form:[
 tx('n','Nome completo',{req:1,ph:'Ex.: Ana Costa'}),
 H('Contato'),tx('tel','Telefone',{ph:'(11) 90000-0000',half:1}),tx('email','E-mail',{ph:'nome@email.com',half:1}),
 H('Vida na igreja'),sl('casa','Casa de Apascentamento',CASAS),tx('desde','Membro desde',{pre:'desde ',ph:'2016'}),
 tg('batizado','Batizado',{hint:'Já passou pelo batismo nas águas'}),
 mu('min','Ministérios',MINIST.slice(0,6)),
 H('Pessoal'),dt('nasc','Nascimento',half()),sl('civil','Estado civil',['Solteiro(a)','Casado(a)','Viúvo(a)','Divorciado(a)']),
 ar('obs','Observações',{ph:'Anotações da liderança'})]});
def('pessoas','Integração',{main:'n',sub:['como'],form:[
 tx('n','Nome da pessoa',{req:1,ph:'Ex.: Carlos Mendes'}),
 tx('como','Como chegou',{ph:'Ex.: Visitou o culto de 27 set'}),
 tx('tel','Telefone',{ph:'(11) 90000-0000',half:1}),dt('data','Primeiro contato',half()),
 sl('resp','Responsável pelo acompanhamento',PEOPLE),
 mu('int','Interesses',['Casa de Apascentamento','Batismo','Voluntariado','Cursos']),
 ar('obs','Observações',{ph:'Como foi a conversa'})]});

/* ---------- Cuidado ---------- */
def('cuidado','Discipulado',{main:'n',sub:['disc'],form:[
 sl('n','Discípulo',PEOPLE,{req:1}),sl('disc','Discipulador',PEOPLE,{pre:'Discipulado por ',req:1}),
 dt('inicio','Início',half()),sl('freq','Frequência',['Semanal','Quinzenal','Mensal']),
 tx('mat','Material em estudo',{ph:'Ex.: Fundamentos da fé'}),ar('obs','Anotações')]});
def('cuidado','Acompanhamento',{main:'n',sub:['tipo','resumo'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),sl('tipo','Tipo de cuidado',['Hospital','Luto','Família','Saúde','Financeiro','Outro']),
 ar('resumo','Resumo do caso',{ph:'O que está acontecendo'}),sl('resp','Responsável',PEOPLE),
 dt('prox','Próximo contato'),tg('priv','Caso reservado',{hint:'Visível só para a liderança de cuidado'})]});
def('cuidado','Pedidos de oração',{main:'n',sub:['pedido'],form:[
 tx('n','Quem pede',{req:1,ph:'Nome da pessoa'}),ar('pedido','Pedido',{req:1,ph:'Pelo que podemos orar'}),
 sl('cat','Categoria',['Família','Saúde','Trabalho','Espiritual','Outro']),
 tg('priv','Pedido privado',{hint:'Só a liderança vê'})]});

/* ---------- Comunidade ---------- */
def('comunidade','Casas de Apascentamento',{main:'n',sub:['quando','lider'],form:[
 tx('n','Nome da casa',{req:1,ph:'Ex.: Casa Jardins'}),im('foto','Foto da casa'),
 tx('quando','Dia e horário',{ph:'Quarta-feira, 19h30'}),tx('lider','Líderes',{ph:'Ex.: Ana e Paulo Costa'}),
 sl('rede','Rede',names('comunidade','Redes de casa')),
 H('Endereço'),tx('end','Endereço',{ph:'Rua e número'}),tx('bairro','Bairro',{half:1}),tx('tel','Contato',{half:1,ph:'(11) 90000-0000'}),
 tg('vis','Aceita visitantes',{hint:'Aparece na busca de casas do app'}),ar('desc','Sobre a casa')]});
def('comunidade','Redes de casa',{main:'n',sub:['sup','casas'],form:[
 tx('n','Nome da rede',{req:1,ph:'Ex.: Rede Centro'}),tx('sup','Supervisor',{pre:'Supervisão de ',ph:'Pr. Marcos Lima'}),
 nu('casas','Casas',{sfx:'casas'}),ar('desc','Descrição')]});
def('comunidade','Ministérios',{main:'n',sub:['resumo'],form:[
 tx('n','Nome',{req:1,ph:'Ex.: Jovens e Adolescentes'}),im('logo','Imagem'),tx('resumo','Resumo',{ph:'Uma linha sobre o ministério'}),
 sl('lider','Líder',PEOPLE),sl('pub','Público',['Todos','Jovens','Mulheres','Homens','Crianças']),
 tx('quando','Quando se reúne',{ph:'Sábados, 17h'}),tx('tel','WhatsApp',{ph:'(11) 90000-0000'}),ar('desc','Descrição')]});

/* ---------- Kids ---------- */
def('kids','Salas',{main:'n',sub:['faixa','cap'],form:[
 tx('n','Nome da sala',{req:1,ph:'Ex.: Berçário'}),sl('faixa','Faixa etária',FAIXAS),
 nu('cap','Capacidade',{pre:'capacidade ',half:1,ph:'8'}),tx('local','Localização',{half:1,ph:'Térreo'}),
 mu('rec','Recursos',['Berço','TV','Brinquedos','Ar-condicionado','Banheiro']),ar('obs','Observações')]});
def('kids','Times',{main:'n',sub:['lider','vol'],form:[
 tx('n','Nome do time',{req:1,ph:'Ex.: Time Berçário'}),sl('sala','Sala',SALAS),
 tx('lider','Líder',{pre:'Líder ',ph:'Nome do líder'}),nu('vol','Voluntários',{sfx:'voluntários'}),ar('obs','Observações')]});
def('kids','Planejamento',{main:'n',sub:['tema'],form:[
 sl('n','Sala',SALAS,{req:1}),tx('tema','Tema da aula',{req:1,ph:'Ex.: Deus cuida de mim'}),
 dt('data','Data da aula',half()),tx('passagem','Passagem',{half:1,ph:'Salmo 23'}),
 ar('atv','Atividades',{ph:'Roteiro, brincadeiras e lembrancinha'}),fl('mat','Materiais da aula',{multi:1,btn:'Anexar materiais'})]});
def('kids','Escalas',{main:'n',sub:['sala','funcao'],form:[
 sl('n','Voluntário',PEOPLE,{req:1}),sl('sala','Sala',SALAS),sl('funcao','Função',['Líder','Auxiliar','Apoio']),
 dt('data','Data'),ar('obs','Observações')]});
def('kids','Turmas',{main:'n',sub:['faixa','criancas'],form:[
 tx('n','Nome da turma',{req:1,ph:'Ex.: Turma Sementes'}),sl('faixa','Faixa etária',FAIXAS),
 nu('criancas','Crianças',{sfx:'crianças'}),sl('sala','Sala',SALAS),sl('prof','Professor',PEOPLE)]});

/* ---------- Agenda ---------- */
def('agenda','Eventos',{main:'n',sub:['quando','local'],form:[
 tx('n','Nome do evento',{req:1,ph:'Ex.: Conferência Anual 2026'}),im('banner','Banner'),
 sl('cat','Tipo',['Conferência','Retiro','Culto especial','Curso','Social']),
 tx('quando','Quando',{ph:'18 a 20 out',half:1}),tm('hora','Horário',half()),tx('local','Local',{ph:'Templo'}),
 H('Inscrições'),tg('insc','Aceitar inscrições pelo app'),nu('vagas','Vagas',{half:1,ph:'200'}),mo('valor','Valor',{half:1,ph:'Gratuito'}),
 ar('desc','Descrição'),fl('mat','Anexos',{multi:1,btn:'Anexar arquivos'})]});
def('agenda','Cultos',{main:'n',sub:['dia','hora'],form:[
 tx('n','Culto',{req:1,ph:'Ex.: Culto de Celebração'}),tx('dia','Dia',{ph:'Dom, 4 out',half:1}),tx('hora','Horário',{ph:'18h30',half:1}),
 sl('preg','Pregador',PASTORES),tx('tema','Tema'),tx('louvor','Ministério de louvor'),
 tg('live','Transmitir ao vivo'),tg('kids','Tem culto kids'),ar('obs','Observações')]});
def('agenda','Apresentações',{main:'n',sub:['familia'],form:[
 tx('n','Criança',{req:1,ph:'Nome da criança'}),tx('familia','Família',{ph:'Ex.: Rafael e Camila Pereira'}),
 dt('nasc','Nascimento',half()),dt('data','Apresentação',half()),sl('pastor','Pastor',PASTORES),ar('obs','Observações')]});
def('agenda','Batismos',{main:'n',sub:['obs'],form:[
 tx('n','Nome',{req:1,ph:'Quem será batizado'}),tx('obs','Observação',{ph:'Ex.: Concluiu a classe de batismo'}),
 dt('data','Data do batismo',half()),tg('classe','Concluiu a classe',{hint:'Classe de batismo'}),
 ar('test','Testemunho',{ph:'Resumo do testemunho'}),fl('doc','Documentos',{multi:1})]});
def('agenda','Consagrações',{main:'n',sub:['tipo','dia'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),sl('tipo','Tipo',['Diaconato','Presbiterato','Pastorado','Missionário']),
 tx('dia','Dia',{ph:'Dom, 25 out'}),sl('pastor','Pastor responsável',PASTORES),ar('obs','Observações')]});
def('agenda','Casamentos',{main:'n',sub:['dia','hora','local'],form:[
 tx('n','Casal',{req:1,ph:'Ex.: Tiago e Vera Campos'}),tx('dia','Dia',{ph:'Sáb, 14 nov',half:1}),tx('hora','Horário',{ph:'16h',half:1}),
 tx('local','Local',{ph:'Templo'}),sl('cel','Celebrante',PASTORES),tx('tel','Contato',{ph:'(11) 90000-0000'}),
 tg('acon','Aconselhamento concluído',{hint:'Aconselhamento pré-nupcial'}),fl('doc','Documentos',{multi:1,btn:'Anexar documentos'}),ar('obs','Observações')]});
def('agenda','Integrações',{main:'n',sub:['dia','hora'],form:[
 tx('n','Encontro',{req:1,ph:'Ex.: Café de boas-vindas'}),tx('dia','Dia',{ph:'Dom, 11 out',half:1}),tx('hora','Horário',{ph:'9h',half:1}),
 tx('local','Local'),sl('resp','Responsável',PEOPLE),nu('vagas','Vagas'),ar('desc','Descrição')]});
def('agenda','Calendário',{main:'n',sub:['hora','local'],form:[
 tx('n','Compromisso',{req:1,ph:'Ex.: Reunião de líderes'}),sl('tipo','Tipo',['Evento','Culto','Reunião']),
 dt('dia','Data',half()),tx('hora','Horário',{ph:'19h30',half:1}),tx('local','Local'),
 sl('rep','Repetição',['Não repete','Semanal','Mensal']),ar('desc','Detalhes')]});
def('agenda','Escalas',{main:'n',sub:['min','funcao'],form:[
 sl('n','Voluntário',PEOPLE,{req:1}),sl('min','Ministério',MINIST),tx('funcao','Função',{ph:'Ex.: Vocal'}),
 dt('data','Data',half()),tm('hora','Horário',half()),ar('obs','Observações')]});
def('agenda','Inscrições',{main:'n',sub:['evento'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),sl('evento','Evento',names('agenda','Eventos'),{req:1}),
 sl('pag','Pagamento',['Gratuito','Pix','Cartão','Dinheiro']),mo('valor','Valor pago'),ar('obs','Observações')]});

/* ---------- Espaços, Zeladoria e Almoxarifado ---------- */
def('espacos','Salas',{main:'n',sub:['cap'],form:[
 tx('n','Nome do espaço',{req:1,ph:'Ex.: Sala 3'}),im('foto','Foto'),nu('cap','Capacidade',{sfx:'pessoas',half:1}),tx('local','Localização',{half:1}),
 mu('rec','Recursos',['Projetor','Som','Ar-condicionado','Wi-Fi','Cozinha']),ar('obs','Regras de uso')]});
def('espacos','Reservas',{main:'n',sub:['quem','dia','hora'],form:[
 sl('n','Espaço',names('espacos','Salas'),{req:1}),tx('quem','Quem reserva',{ph:'Casa ou ministério'}),
 tx('dia','Dia',{ph:'Qua, 30 set',half:1}),tx('hora','Horário',{ph:'19h30',half:1}),
 tx('fin','Finalidade'),nu('pessoas','Pessoas esperadas'),mu('rec','Precisa de',['Projetor','Som','Cadeiras extras','Cozinha'])]});
def('zeladoria','Chamados',{main:'n',sub:['onde'],form:[
 tx('n','O que precisa de reparo',{req:1,ph:'Ex.: Lâmpada queimada'}),tx('onde','Onde',{ph:'Corredor · Térreo'}),
 sl('prio','Prioridade',['Baixa','Média','Alta']),im('foto','Foto do problema'),sl('resp','Responsável',PEOPLE),ar('desc','Detalhes')]});
def('zeladoria','Rotinas',{main:'n',sub:['freq'],form:[
 tx('n','Rotina',{req:1,ph:'Ex.: Limpeza do templo'}),tx('freq','Frequência',{ph:'Todo sábado · 9h'}),
 tx('local','Local'),sl('resp','Responsável',PEOPLE),ar('check','Lista de tarefas',{ph:'Uma por linha'})]});
def('almox','Itens',{main:'n',sub:['cat','local'],form:[
 tx('n','Nome do item',{req:1,ph:'Ex.: Projetor portátil'}),im('foto','Foto'),sl('cat','Categoria',names('almox','Categorias')),
 tx('local','Local de guarda',{ph:'Armário 2'}),nu('qtd','Quantidade',{half:1}),tx('pat','Patrimônio',{half:1,ph:'Nº'}),
 mo('valor','Valor estimado'),ar('obs','Observações')]});
def('almox','Categorias',{main:'n',sub:['desc'],form:[tx('n','Nome',{req:1}),tx('desc','Descrição',{ph:'Ex.: Som, imagem e eletrônicos'})]});
def('almox','Empréstimos',{main:'n',sub:['item','prazo'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),sl('item','Item',names('almox','Itens'),{req:1}),nu('qtd','Quantidade',{half:1,ph:'1'}),
 tx('prazo','Devolver até',{pre:'devolver ',ph:'sex, 2 out',half:1}),ar('obs','Observações')]});
def('almox','Devoluções',{main:'n',sub:['item','quando'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),sl('item','Item',names('almox','Itens'),{req:1}),tx('quando','Quando',{ph:'entregue hoje'}),
 sl('cond','Condição',['Bom','Com defeito','Faltando peça']),im('foto','Foto do estado'),ar('obs','Observações')]});
def('almox','Movimentações',{main:'n',sub:['tipo','motivo','data'],form:[
 sl('n','Item',names('almox','Itens'),{req:1}),sl('tipo','Tipo',['Entrada','Saída','Ajuste']),
 tx('motivo','Motivo',{ph:'compra'}),tx('data','Data',{ph:'12 set',half:1}),nu('qtd','Quantidade',{half:1})]});

/* ---------- Comunicação e Secretaria ---------- */
def('comunicacao','Notícias',{main:'n',sub:['resumo'],form:[
 tx('n','Título',{req:1,ph:'Manchete da notícia'}),im('capa','Imagem de capa'),ar('resumo','Resumo',{ph:'Uma ou duas frases'}),
 ar('corpo','Texto completo'),sl('cat','Categoria',['Avisos','Eventos','Ministérios','Testemunhos']),
 tg('notif','Avisar membros ao publicar',{hint:'Envia uma notificação no app'})]});
def('comunicacao','Notificações',{main:'n',sub:['pub'],form:[
 tx('n','Título',{req:1,ph:'Título curto'}),ar('msg','Mensagem',{req:1}),
 sl('pub','Público',['Todos os membros','Jovens','Voluntários','Líderes']),mu('canais','Canais',['App','E-mail','WhatsApp']),
 sl('quando','Envio',['Enviar agora','Agendar'],{def:1}),dt('data','Data',{half:1,if:['quando','Agendar']}),tm('hora','Horário',{half:1,if:['quando','Agendar']})]});
def('comunicacao','Mensagens',{main:'n',sub:['msg'],form:[
 tx('n','Pessoa',{req:1}),sl('canal','Canal',['App','WhatsApp','E-mail']),ar('msg','Mensagem',{req:1}),fl('arq','Anexos',{multi:1})]});
def('comunicacao','Banners',{main:'n',sub:['destino'],form:[
 tx('n','Título',{req:1}),im('img','Imagem do banner',{req:1}),tx('destino','Abre',{ph:'Ex.: o evento, a inscrição'}),
 sl('pos','Posição',['Início do app','Agenda','Mais']),dt('ini','Começa em',half()),dt('fim','Termina em',half())]});
def('comunicacao','Transmissões',{main:'n',sub:['dia','hora'],form:[
 tx('n','Título',{req:1,ph:'Ex.: Culto de Celebração'}),tx('dia','Dia',{ph:'Dom, 4 out',half:1}),tx('hora','Horário',{ph:'18h30',half:1}),
 sl('plat','Plataforma',['YouTube','Instagram','Facebook']),lk('link','Link da transmissão',{ph:'https://youtube.com/…'}),im('capa','Capa'),ar('desc','Descrição')]});
def('secretaria','Atendimentos',{main:'n',sub:['assunto'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),tx('assunto','Assunto',{req:1,ph:'Do que se trata'}),
 sl('canal','Canal',['App','Presencial','Telefone','WhatsApp']),sl('resp','Atendente',PEOPLE),ar('desc','Detalhes'),fl('arq','Anexos',{multi:1})]});
def('secretaria','Documentos',{main:'n',sub:['doc'],form:[
 sl('n','Pessoa',PEOPLE,{req:1}),sl('doc','Documento',['Declaração de membro','Carta de recomendação','Certificado de batismo','Certidão de casamento']),
 sl('assin','Assinatura',PASTORES),fl('arq','Arquivo emitido'),ar('obs','Observações')]});

/* ---------- Financeiro ---------- */
const CONTAS=names('financeiro','Contas financeiras'),PLANO=names('financeiro','Plano de contas'),CCUSTO=names('financeiro','Centros de custo'),CONTATOS=names('financeiro','Contatos');
const sgn=v=>(v.tipo==='Despesa'?'− ':'+ ')+'R$ '+v.valor;
def('financeiro','Lançamentos',{main:'n',sub:['data','valor'],
 subFn:v=>[v.data?rfDate(v.data).replace(/ \d{4}$/,''):'',v.valor?sgn(v):''].filter(Boolean).join(' · '),
 seed:s=>{const [d,x]=s.split(' · ');return {data:rfIso(d),tipo:/^[−-]/.test(x)?'Despesa':'Receita',valor:x.replace(/[^\d.,]/g,'')};},
 form:[tx('n','Descrição',{req:1,ph:'Ex.: Dízimos'}),sl('tipo','Tipo',['Receita','Despesa'],{def:1}),
 mo('valor','Valor',{req:1,half:1}),dt('data','Data',{half:1,req:1}),sl('conta','Conta',CONTAS),sl('cat','Categoria',PLANO),sl('cc','Centro de custo',CCUSTO),
 fl('comp','Comprovante',{multi:1,btn:'Anexar comprovante'}),ar('obs','Observações')]});
def('financeiro','Contas financeiras',{main:'n',sub:['banco','saldo'],form:[
 tx('n','Nome da conta',{req:1,ph:'Ex.: Conta principal'}),sl('banco','Banco',['Banco do Brasil','Caixa','Itaú','Bradesco','Nubank','Sicredi','Outro']),
 mo('saldo','Saldo inicial'),sl('tipo','Tipo',['Corrente','Poupança','Caixa físico']),tx('ag','Agência',{half:1}),tx('num','Conta',{half:1})]});
def('financeiro','Contas a pagar',{main:'n',sub:['venc','valor'],form:[
 tx('n','Descrição',{req:1,ph:'Ex.: Conta de energia'}),mo('valor','Valor',{req:1,half:1}),dt('venc','Vencimento',{pre:'Vence ',req:1,half:1}),
 sl('forn','Fornecedor',CONTATOS),sl('cat','Categoria',PLANO),sl('cc','Centro de custo',CCUSTO),
 tg('rec','Conta recorrente',{hint:'Repete todo mês'}),fl('comp','Boleto ou nota',{multi:1}),ar('obs','Observações')]});
def('financeiro','Contas a receber',{main:'n',sub:['venc','valor'],form:[
 tx('n','Descrição',{req:1,ph:'Ex.: Inscrições da Conferência'}),mo('valor','Valor',{req:1,half:1}),dt('venc','Vencimento',{pre:'Vence ',req:1,half:1}),
 tx('quem','Quem paga'),sl('cat','Categoria',PLANO),sl('cc','Centro de custo',CCUSTO),ar('obs','Observações')]});
def('financeiro','Caixas e vendas',{main:'n',sub:['resumo'],form:[
 tx('n','Nome do caixa',{req:1,ph:'Ex.: Cafeteria · hoje'}),sl('setor','Setor',['Cafeteria','Restaurante','Loja']),
 sl('resp','Responsável',PEOPLE),mo('ab','Valor de abertura'),tx('resumo','Resumo',{ph:'Ex.: R$ 77,00 em vendas'})]});
def('financeiro','Aprovações',{main:'n',sub:['valor','sol'],form:[
 tx('n','O que aprovar',{req:1,ph:'Ex.: Compra de projetor'}),mo('valor','Valor',{req:1}),tx('sol','Solicitante',{ph:'Ministério ou pessoa'}),
 sl('cat','Categoria',PLANO),sl('cc','Centro de custo',CCUSTO),ar('just','Justificativa'),fl('orc','Orçamentos e cotações',{multi:1,btn:'Anexar orçamentos'})]});
def('financeiro','Importar e conciliar',{main:'n',sub:['conta'],form:[
 tx('n','Nome da importação',{req:1,ph:'Ex.: Extrato de outubro'}),fl('arq','Arquivo do extrato',{req:1,acc:'.ofx,.csv,.xlsx,.pdf',btn:'Escolher extrato'}),
 sl('conta','Conta',CONTAS),tx('per','Período',{ph:'01/10 a 31/10'})]});
def('financeiro','Doações',{main:'n',sub:['valor','dest'],form:[
 tx('n','Doador',{req:1}),mo('valor','Valor',{req:1,half:1}),dt('data','Data',{half:1}),
 sl('dest','Destino',['Contribuição livre','Dízimo','Oferta','Missões','Construção']),sl('forma','Forma',['Pix','Cartão','Dinheiro','Transferência']),
 tg('recibo','Enviar recibo')]});
def('financeiro','Plano de contas',{main:'n',sub:['tipo','cod'],form:[
 tx('n','Nome',{req:1,ph:'Ex.: Dízimos'}),sl('tipo','Tipo',['Receita','Despesa','Ativo','Passivo']),tx('cod','Código',{ph:'1.01'})]});
def('financeiro','Centros de custo',{main:'n',sub:['resp'],form:[
 tx('n','Nome',{req:1,ph:'Ex.: Kids'}),sl('resp','Responsável',PEOPLE),mo('orc','Orçamento mensal')]});
def('financeiro','Contatos',{main:'n',sub:['tipo','cat'],form:[
 tx('n','Nome',{req:1}),sl('tipo','Tipo',['Fornecedor','Doador','Prestador','Outro']),tx('cat','Categoria',{ph:'Ex.: energia'}),
 tx('doc','CPF ou CNPJ'),tx('tel','Telefone',{half:1}),tx('email','E-mail',{half:1}),ar('obs','Observações')]});
def('financeiro','Contador',{main:'n',sub:['per'],form:[
 tx('n','Pacote',{req:1,ph:'Ex.: Fechamento de outubro'}),tx('per','Período',{pre:'Período: ',ph:'out 2026'}),
 tx('email','Enviar para',{ph:'contador@email.com'}),fl('arq','Arquivos',{multi:1,btn:'Anexar arquivos'}),ar('obs','Mensagem ao contador')]});
def('financeiro','Fechamentos',{main:'n',sub:['obs'],form:[
 tx('n','Mês de referência',{req:1,ph:'Outubro de 2026'}),ar('obs','Observações')]});
def('financeiro','Mensagens',{main:'n',sub:['para'],form:[
 tx('n','Assunto',{req:1}),sl('para','Para',PEOPLE),ar('msg','Mensagem',{req:1}),fl('arq','Anexos',{multi:1})]});

/* ---------- Administração ---------- */
def('admin','Visitantes',{main:'n',sub:['como'],form:[
 tx('n','Nome',{req:1}),tx('como','Como chegou',{ph:'Ex.: Primeiro acesso pelo app'}),
 tx('tel','Telefone',{half:1}),tx('email','E-mail',{half:1}),mu('int','Interesses',['Casa de Apascentamento','Batismo','Voluntariado','Cursos']),ar('obs','Observações')]});
def('admin','Multi-igreja',{main:'n',sub:['cidade','membros'],form:[
 tx('n','Nome da igreja',{req:1,ph:'Ex.: Alva Sede'}),im('logo','Logo'),tx('cidade','Cidade',{half:1}),nu('membros','Membros',{sfx:'membros',half:1}),
 sl('resp','Pastor responsável',PASTORES),tx('end','Endereço')]});
}
