/* ================= Central de ajuda ================= */
/* Guia do Alva Web por módulo, com perguntas já respondidas e busca. O conteúdo é do produto (a igreja não edita) e segue o que o sistema faz hoje.
   Cada pergunta: [pergunta, resposta, palavras-chave]. "go" leva para a área no sistema. */
const AJ=[
 {id:'dash',n:'Dashboard',ic:'dawn',go:'hoje',lede:'A tela inicial: o que pede a sua atenção hoje.',f:[
  ['O que aparece em “Precisa da sua atenção”?','O que está esperando por você: pessoas aguardando o primeiro contato, escalas sem resposta e as suas tarefas que vencem em até 7 dias. Cada card tem a ação direta, como Acolher agora ou Abrir escalas. Os lembretes são automáticos.','atenção cards pendências início'],
  ['O que são “Suas tarefas”?','São as tarefas dos quadros (de ministérios e eventos) atribuídas a você. “Ver todas” separa em atrasadas, próximos 7 dias, depois e sem prazo, e clicar numa tarefa abre o quadro dela.','tarefas quadros prazo atrasada'],
  ['Como troco de igreja?','No topo do menu, clique no nome da igreja e escolha outra da rede. O que você vê e faz depende do seu acesso naquela igreja.','igreja rede trocar sede'],
  ['Como mudo para o tema noturno?','Abra o menu do seu nome, no canto inferior do menu lateral, e escolha Dia ou Noite em Aparência.','tema escuro noite dia aparência']]},
 {id:'pessoas',n:'Pessoas',ic:'users',go:'membros',lede:'Cadastro e situação dos membros.',f:[
  ['Como cadastro uma pessoa?','Em Pessoas › Membros, use o botão para adicionar, informe nome e contato e salve. A pessoa só passa a ser membro integrado depois de concluir a Integração.','cadastrar novo membro adicionar pessoa'],
  ['Por que alguém não aparece como membro?','Porque a integração é obrigatória: só quem conclui a integração vira membro. Convite de acesso ao sistema nunca transforma uma pessoa em membro.','membro integrado integração visitante'],
  ['Como altero a situação de um membro (afastado, transferido…)?','Na lista ou na ficha, use Alterar situação. Data e motivo são obrigatórios, exceto ao voltar a Ativo. Afastado suspende o acesso ao app até voltar a Ativo. Afastado, Transferido, Desligado e Falecido encerram o acesso e os mandatos da pessoa; o Afastado pode ser reativado sem nova integração, mas volta sem nada. Antes de confirmar, você vê o impacto no Cuidado. Antes de confirmar, você vê o impacto no Cuidado.','situação afastado transferido desligado falecido ativo'],
  ['Como tiro a lista de membros em PDF ou planilha?','Vá em Relatórios › Membros, filtre o que precisa e use Gerar PDF ou Exportar CSV. Só sai o que está filtrado e as colunas escolhidas.','exportar lista planilha csv pdf relatório membros']]},
 {id:'integ',n:'Integração',ic:'users',go:'integracao',lede:'O caminho de quem chega até virar membro.',f:[
  ['Como crio uma integração?','Em Pessoas › Integração, clique em Nova integração e informe nome, data e horário, limite (opcional), grupo de WhatsApp e responsável. Marque “atual” para ela receber os pedidos novos.','criar nova integração turma'],
  ['Por que só pode haver uma integração atual?','Os pedidos feitos pelo app precisam de um destino. Ao definir outra como atual, a anterior deixa de receber pedidos novos.','integração atual pedidos'],
  ['O que são as Regras da integração?','O botão Regras guarda os padrões da igreja: limite de pessoas, prazo para pedir (dias antes do início), aceite manual ou automático e certificado de conclusão.','regras limite prazo aceite automático certificado'],
  ['O que acontece quando a integração lota?','Ela não aceita mais. Quem pede entra na Fila de espera, aba ao lado de Integrações. Também entra na fila quem pede fora do prazo ou quando não há integração aberta.','lotada lotou fila de espera vagas limite'],
  ['Como chamo alguém da fila de espera?','Na aba Fila de espera, use Chamar (uma pessoa) ou Chamar os próximos N (até as vagas livres). Chamar aceita a pessoa na integração atual e avisa no app. Com o aceite automático, a fila é chamada sozinha quando uma integração abre.','chamar fila espera aceitar posição']]},
 {id:'cuidado',n:'Cuidado',ic:'heart',go:'acompanhamento',lede:'Discipulado, acompanhamento, oração e disciplina.',f:[
  ['Como agendo um encontro de discipulado?','Em Cuidado › Discipulado, informe data e hora, participantes e a modalidade (com link, se for online). Cada convidado aceita ou recusa, e a resposta aparece na lista.','discipulado encontro agendar'],
  ['Pausar um vínculo cancela os encontros?','Não. Pausar o vínculo e cancelar um encontro são coisas separadas. Cancelar tira o encontro da agenda e avisa os participantes, mantendo o histórico.','pausar vínculo cancelar encontro'],
  ['Como abro um caso de acompanhamento?','O pastor escolhe a pessoa e cadastra o caso, com tipo, descrição, urgência (normal ou urgente) e responsável. O próprio membro também pode pedir ajuda pelo app.','caso pastoral acompanhamento urgência'],
  ['Quem vê os pedidos de oração?','Os intercessores. Qualquer pessoa pode pedir oração, até sem conta. Quem ora registra, e o pedido pode ser marcado como respondido ou reaberto.','pedido oração intercessor respondido'],
  ['Quem vê a Disciplina?','Só quem tem a permissão própria: de início, o Administrador; a igreja concede aos demais. O registro é invisível ao membro e às buscas, e todo acesso é auditado. Afastamento e desligamento chegam à Secretaria como um pendente para confirmar, sem a observação. Afastamento e desligamento chegam à Secretaria como um pendente para confirmar, sem a observação.','disciplina admoestação afastamento restrito']]},
 {id:'comunidade',n:'Comunidade',ic:'home',go:'casas',lede:'Casas de Apascentamento, redes de casa e ministérios.',f:[
  ['Como agendo um encontro da Casa e faço a chamada?','Na Casa, agende o encontro com data, hora e modalidade. Depois do encontro, registre a chamada marcando quem esteve presente e o motivo de quem faltou.','casa encontro chamada presença'],
  ['Como uma pessoa entra numa Casa?','Um membro integrado pede para participar. O pedido fica Pendente até o líder aceitar ou recusar; aceitar cria o vínculo.','casa participar pedido aceitar'],
  ['Rede de casa é a mesma coisa que rede de discipulado?','Não. Rede de casa apenas agrupa Casas, com um supervisor, normalmente regional. Rede de discipulado é outra coisa e fica em Cuidado.','rede célula discipulado supervisor'],
  ['Como monto um time de ministério?','Em Ministérios, abra o ministério e crie o time, escolhendo os membros e as funções de cada um. O time pode ser reutilizado nas escalas.','ministério time membros funções'],
  ['Como uma pessoa passa a servir num ministério?','Conversando com o líder, que a adiciona ao time. Não existe pedido obrigatório de voluntariado, e entrar num time não dá acesso de gestão.','servir voluntário time líder']]},
 {id:'kids',n:'Kids',ic:'baby',go:'kvis',lede:'Salas, turmas e times do ministério infantil.',f:[
  ['O que eu gerencio no Kids?','Salas (com capacidade), turmas por faixa etária e times do ministério. Há também uma visão geral para a liderança.','salas turmas times kids'],
  ['De onde vêm a presença e a ocupação das crianças?','Do sistema infantil externo. O check-in e check-out, a etiqueta e a retirada autorizada continuam nesse sistema; o Alva mostra a ocupação e o histórico, que a família também consegue ver.','presença check-in ocupação sistema externo'],
  ['Sala do Kids é a mesma coisa que Sala de Espaços?','Não. A sala do Kids é do ministério infantil; a sala de Espaços é reservável. São cadastros separados.','sala espaço kids reserva']]},
 {id:'agenda',n:'Agenda',ic:'calendar',go:'eventos',lede:'Cultos, eventos, escalas, apresentações e inscrições.',f:[
  ['Como crio um evento pago?','Em Agenda › Eventos, crie o evento e, em Detalhes, marque a inscrição como Paga. Crie os tipos de ingresso e as compras adicionais (almoço, camiseta…), e use a aba Vouchers para descontos.','evento pago ingresso criar compras adicionais voucher'],
  ['Onde vejo o dinheiro de um evento?','Em Detalhes do evento há o card Financeiro com três números: arrecadado, líquido e a receber. O detalhe por ingresso, compra, forma de pagamento e desconto fica em Relatórios › Agenda e eventos › Financeiro do evento.','financeiro evento arrecadado líquido receber taxa'],
  ['Como faço o check-in de um evento?','Em Detalhes do evento, escolha o check-in (desabilitado, evento inteiro ou por período). O Alva só acompanha: a entrada é confirmada pela equipe no app do VEM, com leitor de QR.','check-in qr portaria vem'],
  ['Como monto uma escala?','Em Agenda › Escalas, crie o agrupamento do ministério, adicione as datas (ligadas a cultos ou eventos) e monte os blocos com as pessoas. Ao enviar, cada pessoa aceita ou recusa.','escala bloco aceite montar ministério'],
  ['Como funcionam as apresentações de bebês?','A tela é uma lista de datas (próximas, realizadas, todas). Entre numa data para ver os bebês e, enquanto houver vaga, use Adicionar bebê. Os pedidos das famílias chegam pelo app, e o certificado é emitido pela Secretaria.','apresentação bebê vagas data certificado'],
  ['Como divulgo um evento no VEM?','Em Detalhes, ligue “Mostrar este evento no VEM” e preencha categoria, cidade, UF, descrição e capa. Sem isso o evento não é publicado, e a tela mostra o que falta.','vem divulgar publicar capa']]},
 {id:'espacos',n:'Espaços',ic:'building',go:'reservas',lede:'Salas e reservas.',f:[
  ['Como reservo uma sala?','Em Espaços › Reservas, informe a sala, o início e o fim, a quantidade de pessoas e a finalidade (opcional). O Alva confere a capacidade e impede sobreposição com outra reserva ou com um uso fixo.','reservar sala reserva horário'],
  ['Quem vê quem reservou?','Quem tem só Ver enxerga que a sala está ocupada, o período e a quantidade de pessoas, mas não o solicitante nem a finalidade. Quem pode Editar ou Administrar vê tudo.','privacidade reserva solicitante permissão'],
  ['O que é um uso fixo?','Um uso que se repete (semanal, quinzenal, mensal ou anual), como um grupo que ocupa a sala sempre no mesmo dia. Ele bloqueia o horário para novas reservas.','uso fixo recorrente sala']]},
 {id:'almox',n:'Almoxarifado',ic:'box',go:'aitens',lede:'Itens, empréstimos e estoque.',f:[
  ['Como empresto um item?','Em Empréstimos, escolha o membro, o item e o período. A devolução pode ser parcial ou total, e o sistema impede devolver mais do que foi emprestado e avisa quando o prazo vence.','emprestar empréstimo devolução prazo'],
  ['O que é item consumível?','Um item que sai do estoque sem prazo de devolução, como material de limpeza. Você distribui para um destino, e o destino pode devolver parte ou tudo ao estoque.','consumível distribuição estoque'],
  ['Como ajusto o estoque?','Abra o item e use Ajustar estoque, informando o motivo (compra, correção de contagem, perda ou validade). O saldo nunca fica negativo, e tudo aparece em Movimentações.','ajustar estoque inventário saldo movimentações']]},
 {id:'cafe',n:'Cafeteria',ic:'coffee',go:'cafe-vis',lede:'Itens, vendas e caixa da cafeteria.',f:[
  ['De onde vêm as vendas?','De um sistema de vendas externo, usado no caixa. O Alva acompanha as vendas, o estoque e o caixa, e lança o valor no Financeiro.','vendas caixa sistema externo'],
  ['O caixa diário precisa ser fechado?','Não. É um resumo automático do dia, sem ação de fechar o caixa.','caixa diário fechar resumo'],
  ['Como ajusto o estoque de um item?','Abra o item e use Ajustar estoque, com o motivo. O registro fica em Movimentações, com saldo anterior, saldo novo e autor.','estoque ajuste item movimentações']]},
 {id:'rest',n:'Restaurante',ic:'chef',go:'rest-vis',lede:'Itens, vendas e caixa do restaurante.',f:[
  ['O Restaurante e a Cafeteria se misturam?','Não. Cada um tem menu, permissão, dados e relatórios próprios, porque quem opera cada um é diferente.','restaurante cafeteria separado permissão'],
  ['Como vejo o que foi vendido no dia?','No Caixa diário, que mostra as vendas válidas do dia. As vendas podem ser Concluídas, Canceladas ou Estornadas, com meio de pagamento (Pix, Cartão ou Dinheiro).','vendas dia caixa estorno pagamento'],
  ['O valor das vendas entra no Financeiro?','Sim. As vendas entram como receita, e o painel do Financeiro mostra Cafeteria, Restaurante e Loja.','financeiro receita vendas']]},
 {id:'loja',n:'Loja',ic:'bag',go:'shop-vis',lede:'Venda de livros, camisetas e acessórios, no balcão e pelo app.',f:[
  ['Como faço uma venda rápida?','Digite o código do item, a quantidade e o valor e aperte Enter; a lista vai se montando. O valor vem do preço do item, mas pode ser alterado, e há um botão de desconto. Confirme a venda no fim.','venda rápida balcão desconto'],
  ['Como funcionam os pedidos feitos pelo app?','Em Loja › Pedidos do app, a equipe vê o quadro Separando, Pronto para retirar e Retirados. Ao marcar como pronto, o comprador é avisado no app. A retirada é na igreja.','pedidos app retirada separando'],
  ['Como cancelo uma venda?','A qualquer hora, a partir da venda. O cancelamento devolve o estoque e gera o estorno no Financeiro.','cancelar venda estorno'],
  ['A Loja pode vender curso ou e-book?','Não. A Loja vende só bens físicos, por regra das lojas de aplicativos. Item digital exigiria rever essa regra.','digital e-book curso política loja aplicativos']]},
 {id:'conteudo',n:'Conteúdo',ic:'layers',go:'pregacoes',lede:'Pregações, vídeos, músicas, séries, jornadas, cursos e materiais.',f:[
  ['Quem vê cada conteúdo?','Cada conteúdo é Público (qualquer pessoa, inclusive visitante), Interno (todos os membros, o padrão) ou Restrito a um ministério. Escolher um ministério torna o conteúdo restrito.','visibilidade público interno restrito ministério'],
  ['O que é uma série?','Uma coleção ordenada de pregações, vídeos ou músicas, de um único tipo, escolhido ao criar. Os itens continuam existindo sozinhos; a série só os reúne.','série pregações vídeos músicas'],
  ['Qual a diferença entre jornada e curso?','A jornada tem etapas e vincula cursos que já existem; ela não cria curso. Um curso pode existir sem jornada e estar em várias jornadas.','jornada curso etapas vincular'],
  ['Posso excluir um material que já foi usado?','O melhor é inativar. Novos vínculos ficam bloqueados e os existentes são preservados; dá para consultar onde o material é usado.','excluir inativar material usado'],
  ['Onde o membro baixa o certificado de um curso?','No app, em Mais › Meus documentos, junto com as certidões e os certificados emitidos pela igreja. Tudo é PDF.','certificado curso baixar pdf app']]},
 {id:'comunicacao',n:'Comunicação',ic:'megaphone',go:'noticias',lede:'Notícias, push, e-mail, banners e transmissões.',f:[
  ['Como envio um push ou e-mail?','Em Notificações, ligue as automações, escolha os canais e as antecedências, edite os modelos e acompanhe os envios; ninguém dispara aviso à mão. Para revisar antes de enviar. Um envio agendado pode ser cancelado, e reenviar cria uma nova execução.','push email enviar agendar público'],
  ['Como publico uma notícia?','Em Notícias, informe título, corpo, imagem, link, categoria e a data em que ela expira. Dá para publicar, editar, duplicar, renovar e retirar.','notícia publicar expirar'],
  ['O Alva mostra quem abriu o e-mail ou push?','Não. Não há rastreamento de abertura nem recibo de leitura; a auditoria de envio é só técnica.','abertura leitura rastreamento']]},
 {id:'fin',n:'Financeiro',ic:'wallet',go:'fvis',lede:'Lançamentos, contas e análises.',f:[
  ['O que é o card Financeiro do evento?','No detalhe do evento, mostra o vendido bruto, o recebido líquido e o que falta receber das inscrições pagas. Clicar nele abre o relatório Financeiro do evento.','financeiro evento card receita inscrições'],
  ['O dinheiro de um evento entra sozinho no Financeiro?','Não. O evento não lança nada no Financeiro: o card mostra só o vendido, o recebido líquido e o que falta receber das inscrições. O dinheiro entra na conta pelo extrato, e o Financeiro lança ou importa por lá. O caixa do evento não soma as inscrições.','inscrição receita líquido taxa lançamento evento'],
  ['Como emito o informe de contribuições?','Em Financeiro › Análises, escolha o ano-calendário. O informe só inclui doadores identificados com cadastro e CPF, e dá para gerar por pessoa ou de uma vez para todos.','informe contribuições imposto de renda cpf doador'],
  ['Onde estão o DRE e o fluxo de caixa?','Em Financeiro › Análises. São visões gerenciais por período; as listas exportáveis ficam em Relatórios.','dre fluxo de caixa análises']]},
 {id:'sec',n:'Secretaria',ic:'file',go:'sec-vis',lede:'Atos, documentos, mandatos e a vida formal da igreja.',f:[
  ['Como emito uma certidão ou declaração?','Em Secretaria › Documentos › Emitir documento, escolha o tipo e a pessoa. O Alva mostra uma prévia do texto, ou o motivo de ainda não dar para emitir. O documento sai com número, assinatura do mandato vigente e código de validação.','emitir documento certidão declaração carta prévia'],
  ['Emitir documento é fazer upload?','Não. O Alva gera o documento a partir do modelo do tipo. O upload é de outra coisa: o Arquivo guarda arquivos prontos da igreja (estatuto, atas, contratos) e Modelos guarda os modelos usados na geração.','upload arquivo gerar documento modelo'],
  ['Como troco o modelo de um documento?','Em Documentos › Modelos, use Nova versão no tipo desejado e envie um arquivo Word ou PDF. A versão mais nova passa a valer nas próximas emissões; o que já foi emitido não muda e o Histórico permite reativar uma anterior.','modelo versão upload word pdf template'],
  ['Quem emite o certificado de apresentação de bebê?','A Secretaria, em Atos (ou Documentos). Em Agenda › Eventos, dentro do evento de apresentação, ele aparece só para consulta. Toda certidão e certificado de ato é emitido pela Secretaria; só o de curso fica em Conteúdo.','certificado apresentação bebê secretaria'],
  ['Como funcionam cargos e mandatos?','O cargo é do catálogo da igreja e o mandato liga a pessoa ao cargo, com início e fim opcional. Ao criar o mandato, o administrador confirma se concede o acesso sugerido; ele sai ao encerrar o mandato ou se a pessoa deixar a igreja.','cargo mandato acesso pastor tesoureiro'],
  ['Como valido um documento?','Em Documentos › Validar código, digite o código impresso. A validação é pública e mostra só se o documento é válido, o tipo, o nome abreviado e a data.','validar código qr autenticidade'],
  ['O membro tem como ver os documentos dele?','Sim, no app: Mais › Meus documentos lista o que foi emitido e permite baixar o PDF. O app não pede, não gera nem edita documentos; o pedido é feito à secretaria.','meus documentos app baixar pdf membro']]},
 {id:'rel',n:'Relatórios',ic:'clipboard',go:'rp-membros',lede:'Listas por módulo, com PDF e CSV.',f:[
  ['Como gero um PDF ou CSV?','Em Relatórios, abra o módulo, escolha a aba do relatório, filtre e use Gerar PDF ou Exportar CSV. Só sai o que está filtrado e as colunas que você escolheu.','exportar pdf csv relatório filtro colunas'],
  ['Quem pode exportar?','Quem tem Editar ou Administrar no módulo. Quem tem só Ver consulta o relatório na tela, sem exportar. Toda exportação fica registrada na auditoria.','exportar permissão editar ver auditoria'],
  ['Por que o telefone e o e-mail não aparecem?','Dados pessoais vêm desmarcados e com cadeado. Ligue só o que precisa em Colunas.','dados pessoais colunas telefone email privacidade'],
  ['Qual a diferença entre Relatórios e Análises?','Relatórios são listas (com busca, filtros e exportação). Análises são números e gráficos, como DRE, fluxo de caixa, perfil dos membros e entradas e saídas, e ficam no próprio módulo.','relatórios análises diferença dre gráfico']]},
 {id:'admin',n:'Administração',ic:'shield',go:'usuarios',lede:'Usuários, permissões, recursos e auditoria.',f:[
  ['Como dou acesso a alguém?','Em Administração › Usuários e permissões, convide a pessoa e escolha o papel, ou conceda acesso por área. O que o papel permite (Ver, Criar, Editar, Excluir) é definido por módulo.','usuário permissão papel acesso convidar'],
  ['Onde vejo quem fez o quê?','Em Administração › Auditoria e LGPD, com o autor, a ação e o momento. Consultas e exportações sensíveis também aparecem ali.','auditoria log lgpd quem fez'],
  ['O acesso concedido por um mandato aparece onde?','Em Acessos por área, marcado como “via mandato”. Ele sai sozinho quando o mandato termina.','mandato acesso via mandato área']]}
];
const AJ_TOP=[['integ',3],['agenda',1],['sec',0],['fin',1]]; /* perguntas mais procuradas: [módulo, posição] */

/* Guias passo a passo (alguns exemplos por módulo, não todos). Cada guia: resumo, o que precisa antes, passos [texto com **negrito**, imagem, legenda], dica e aviso.
   As imagens são telas reais do próprio protótipo, com destaque, geradas por scripts (ux_alva/web/help). Perguntas sem guia mostram só a resposta. */
const AJ_IMG=import.meta.glob('./help/*.jpg',{eager:true,query:'?url',import:'default'});
const ajImg=k=>AJ_IMG['./help/'+k+'.jpg']||'';
const AJ_GUIDE={
 'dash|O que aparece em “Precisa da sua atenção”?':{steps:[
  ['Abra o **Dashboard**, a primeira opção do menu lateral.'],
  ['Em **Precisa da sua atenção**, cada card mostra algo que espera por você, com um número grande, como as pessoas aguardando o primeiro contato.','dash-atencao','Os cards de atenção, no alto do Dashboard.'],
  ['Use o botão do próprio card para agir: **Acolher agora** ou **Abrir escalas**.'],
  ['Quando você resolve, o card some. Para ver tudo de novo, use **Restaurar pendências**.']],
  tip:'O card **Suas tarefas** mostra só o que está atribuído a você nos quadros de ministérios e eventos.'},
 'pessoas|Como cadastro uma pessoa?':{pre:['Seu papel precisa permitir criar membros em Pessoas.'],steps:[
  ['Abra **Pessoas › Membros** e clique em **Adicionar membro**.','membros-lista'],
  ['Preencha o **Nome completo**. **E-mail** e **Telefone** são opcionais, e os demais dados podem ser completados depois.','membros-novo'],
  ['Deixe **Convidar para o app** ligado se quiser que a pessoa receba o acesso por e-mail.'],
  ['Clique em **Adicionar membro**. A pessoa entra na lista.']],
  warn:'Cadastrar não é o mesmo que ser membro. A pessoa só vira **membro integrado** depois de concluir a Integração.'},
 'integ|Como crio uma integração?':{steps:[
  ['Abra **Pessoas › Integração** e clique em **Nova integração**.'],
  ['Informe o **Nome da integração**, a **Data de início** e o **Horário**.','integ-nova'],
  ['Se quiser, defina o **Limite de membros** (o padrão vem das **Regras**) e o **Link do grupo** de WhatsApp.'],
  ['Escolha o **Responsável**. O contato é preenchido sozinho.'],
  ['Deixe **Definir como integração atual** ligado para ela receber os pedidos novos; a anterior deixa de receber.'],
  ['Clique em **Criar integração**.']]},
 'integ|O que são as Regras da integração?':{steps:[
  ['Em **Pessoas › Integração**, clique em **Regras**.'],
  ['Ajuste o **Limite de pessoas** e o **Prazo para pedir** com os botões − e +. O símbolo ∞ significa sem limite.','integ-regras'],
  ['Escolha o **Aceite dos pedidos**: **Manual** (o responsável aceita) ou **Automático** (aceita sozinho enquanto houver vaga).'],
  ['Escolha se há **Certificado de conclusão** e clique em **Salvar**.']],
  tip:'As regras com cadeado não mudam: só a integração concluída habilita membro, há uma integração atual por igreja e quem lota espera na fila.'},
 'integ|Como chamo alguém da fila de espera?':{steps:[
  ['Em **Pessoas › Integração**, abra a aba **Fila de espera**.'],
  ['A lista mostra a posição, o contato, desde quando a pessoa espera e o motivo. Acima, o aviso diz quantas vagas a integração atual tem.','integ-fila','A aba Fila de espera, com o botão para chamar os próximos.'],
  ['Para chamar uma pessoa, clique em **Chamar**. Para chamar várias, use **Chamar os próximos**, que respeita as vagas livres.'],
  ['Para tirar alguém da fila, clique no ✕ e confirme.']],
  tip:'Com o aceite automático ligado nas Regras, a fila é chamada sozinha quando você cria a próxima integração.'},
 'cuidado|Como abro um caso de acompanhamento?':{steps:[
  ['Abra **Cuidado › Acompanhamento** e clique em **Adicionar caso**.'],
  ['No passo **Pessoa e tipo**, escolha a pessoa e o **Tipo**: Visita, Hospital, Aconselhamento, Luto ou Oração.','cuidado-caso'],
  ['No passo **Detalhes**, descreva a situação, a urgência e quem acompanha.'],
  ['Conclua para criar o caso. Ele aparece em **Ativos**, e os urgentes ganham destaque.']],
  warn:'O conteúdo do caso é pastoral e restrito: só quem tem acesso vê.'},
 'cuidado|Quem vê os pedidos de oração?':{steps:[
  ['Abra **Cuidado › Pedidos de oração**.'],
  ['Para avisar que você está orando, clique em **Estou orando** no pedido. O botão passa a mostrar **Você está orando** e não volta atrás. Quem pediu é avisado, com o seu nome: “Pr. Fulano está orando por você”.','cuidado-oracao'],
  ['Quando o pedido for atendido, use **Marcar como respondido**. Se precisar, ele pode ser reaberto.']]},
 'agenda|Como crio um evento pago?':{steps:[
  ['Abra **Agenda › Eventos** e clique em **Novo evento**.'],
  ['No passo **Sobre**, escolha a **Situação** (Confirmado ou Previsão), o **Título**, o **Tipo** e o **Ministério responsável**.','agenda-evento-novo'],
  ['Siga pelos passos **Programação**, **Local** e **Inscrição**. Em Inscrição, escolha **Paga**.'],
  ['Depois de criado, abra o evento. Em **Detalhes**, crie os **Ingressos** e as **Compras adicionais** (almoço, camiseta…).'],
  ['O card **Financeiro** do evento mostra o **Arrecadado**, o **Líquido** e o **A receber**.','agenda-evento-detalhes','Os três números do evento, em Detalhes.']],
  tip:'Para dar descontos, use a aba **Vouchers** do evento.'},
 'agenda|Como funcionam as apresentações de bebês?':{steps:[
  ['Apresentação é um **tipo de evento**, com data própria. Em **Agenda › Eventos**, filtre o **Tipo** por **Apresentação** ou crie um **Novo evento** desse tipo.'],
  ['Abra o evento. Na aba **Bebês** ficam os pedidos das famílias, as vagas e os confirmados.','agenda-bebes-data','A aba Bebês do evento, com o botão Adicionar bebê.'],
  ['Para incluir alguém, clique em **Adicionar bebê** (enquanto houver vaga): nome, nascimento e um responsável membro ativo. O bebê entra confirmado.'],
  ['Para os pedidos que vieram do app, clique em **Confirmar**. No dia, use **Marcar realizado**.'],
  ['O certificado é emitido pela **Secretaria**; aqui ele aparece só para consulta.']],
  warn:'Só dá para confirmar ou adicionar bebês com o evento **Confirmado**. Em previsão, a lista fica bloqueada.'},
 'agenda|Como monto uma escala?':{steps:[
  ['Abra **Agenda › Escalas** e clique em **Nova escala**.'],
  ['Escolha o **Ministério**, dê um **Nome** (e uma descrição, se quiser) e crie.','agenda-escala-nova'],
  ['Depois, adicione as **datas** (ligadas a cultos ou eventos) e monte os **blocos** com as pessoas.'],
  ['Ao enviar, cada pessoa recebe o aviso e aceita ou recusa.']]},
 'espacos|Como reservo uma sala?':{steps:[
  ['Abra **Espaços › Reservas** e clique em **Nova reserva**.'],
  ['No passo **Sala e horário**, escolha a sala (cada uma mostra os lugares e o andar), o **Início** e o **Término** (data e hora), ou marque **Dia inteiro**.','espacos-reserva'],
  ['Informe a quantidade de pessoas e, se quiser, a finalidade.'],
  ['No passo **Itens do almoxarifado**, peça o que precisa (opcional) e confira tudo em **Revisão**.']],
  warn:'O Alva confere a capacidade e impede sobreposição com outra reserva ou com um uso fixo.'},
 'almox|Como empresto um item?':{steps:[
  ['Abra **Almoxarifado › Itens**. Para cadastrar, clique em **Novo item** e informe **Nome**, **Tipo** (Empréstimo ou Consumível), **Categoria** e **Quantidade inicial**.','almox-item'],
  ['Na linha do item, clique em **Emprestar**.','almox-emprestar'],
  ['Escolha o membro e o período do empréstimo.'],
  ['Na devolução, abra **Empréstimos** e clique em **Registrar devolução**. Ela pode ser parcial.']]},
 'cafe|Como ajusto o estoque de um item?':{steps:[
  ['Abra **Cafeteria › Itens** e clique em **Ajustar estoque** no item.'],
  ['A janela mostra o **Saldo atual**. Informe o **Novo saldo** e o **Motivo**: Compra / reposição, Correção de contagem ou Perda / validade.','cafe-ajuste'],
  ['Se for compra, informe a **Quantidade recebida**; se quiser, escreva uma **Observação**.'],
  ['Clique em **Confirmar ajuste**. O registro fica em **Movimentações**.']]},
 'rest|Como vejo o que foi vendido no dia?':{steps:[
  ['Abra **Restaurante › Caixa diário**.'],
  ['Escolha **Por dia** ou **Por mês** e o mês no alto.','rest-caixa','O caixa diário do restaurante.'],
  ['Cada dia mostra as vendas válidas. Vendas canceladas ou estornadas ficam de fora do total.']]},
 'loja|Como faço uma venda rápida?':{steps:[
  ['Abra **Loja › Vendas** e clique em **Nova venda**.'],
  ['Escolha os produtos. Dá para filtrar por **Todos**, **Livros**, **Camisetas** ou **Acessórios**; cada produto mostra o código, o estoque e o preço.','loja-venda'],
  ['Ajuste a quantidade e, se precisar, o valor ou o desconto.'],
  ['Escolha a forma de pagamento e confirme. A venda baixa o estoque e lança o valor no Financeiro.']]},
 'conteudo|Como cadastro uma pregação?':{steps:[
  ['Abra **Conteúdo › Pregações** e clique em **Nova pregação**.'],
  ['Informe o **Título** e o **Pregador(a)**.','conteudo-pregacao'],
  ['Em **Séries**, escolha uma ou mais (opcional). Em **Vínculo**, deixe **Avulsa** ou escolha um ministério.'],
  ['Escolha a **Visibilidade** (pública, interna ou restrita) e salve. Depois você adiciona vídeo, passagem e arquivos.']]},
 'comunicacao|Como envio um push ou e-mail?':{steps:[
  ['Abra **Comunicação › Notificações** e use as abas **Automações**, **Modelos** e **Envios**.'],
  ['No passo **Conteúdo**, escolha **Push no app** ou **E-mail**, escreva o **Título** e a **Mensagem** e, se quiser, escolha **Ao tocar, abrir**. A prévia no celular mostra como vai chegar.','com-push','O novo envio, com a prévia da notificação.'],
  ['No passo **Público**, escolha quem recebe. O contador mostra quantas pessoas.'],
  ['No passo **Quando**, escolha enviar agora ou agendar.'],
  ['Em **Revisão**, confira e envie.']]},
 'fin|Como registro um lançamento?':{steps:[
  ['Abra **Financeiro › Lançamentos** e clique em **Novo lançamento**.'],
  ['Escolha **Entrada** ou **Saída** e informe o **Valor** e a **Descrição**.','fin-lanc'],
  ['Escolha a **Categoria**, a **Data** e a **Competência**.'],
  ['Clique em **Enviar para aprovação**. O lançamento entra como pendente e só passa a contar no saldo depois de aprovado, em **Aprovações**.']]},
 'sec|Como emito uma certidão ou declaração?':{steps:[
  ['Abra **Secretaria › Documentos** e clique em **Emitir documento**.'],
  ['Escolha o **Tipo** e a **Pessoa**. O campo **Assinado por** vem dos mandatos vigentes (Pastor presidente e Secretário).','sec-emitir'],
  ['Se quiser, escreva uma **Observação**.'],
  ['Confira a **Prévia do documento**. Se não der para emitir, o Alva diz o motivo.'],
  ['Clique em **Emitir documento**. Ele abre com número, assinatura e código de validação.']]},
 'sec|Como troco o modelo de um documento?':{steps:[
  ['Abra **Secretaria › Documentos** e a aba **Modelos**.'],
  ['No tipo de documento, clique em **Nova versão**.','sec-modelos','A aba Modelos, com Nova versão em cada tipo.'],
  ['Escolha o arquivo Word (.docx) ou PDF. A janela lista os campos, como {{nome}}, que o arquivo pode usar, e deixa baixar o modelo atual e um exemplo.'],
  ['Clique em **Enviar nova versão**. Ela vale nas próximas emissões; **Histórico** permite reativar uma anterior.']]},
 'rel|Como gero um PDF ou CSV?':{steps:[
  ['Abra o menu **Relatórios** e escolha o módulo, por exemplo **Membros**.'],
  ['Se houver abas, escolha o relatório. Use a busca, os chips e os filtros para deixar só o que você precisa.'],
  ['Em **Colunas**, escolha o que aparece. Dados pessoais vêm desmarcados.'],
  ['Clique em **Gerar PDF** ou **Exportar CSV**.','rel-gerar','Os botões de exportação, no alto do relatório.']],
  warn:'Só quem tem Editar ou Administrar no módulo exporta. Toda exportação fica na auditoria.'},
 'admin|Como dou acesso a alguém?':{steps:[
  ['Abra **Administração › Usuários e permissões** e clique em **Adicionar usuário**.'],
  ['Digite ao menos 3 letras para **Buscar membro** e selecione a pessoa.','admin-usuario'],
  ['Escolha o **Papel**: Administrador, Pastor, Líder, Secretaria ou Voluntário.'],
  ['Clique em **Adicionar usuário**.']]}
};
/* guias de perguntas que ainda não existiam na lista */
const AJ_NEW=[
 ['comunidade','Como crio uma Casa de Apascentamento?','Cadastre a casa com líder, anfitrião e endereço. Os participantes entram depois.','casa nova criar líder anfitrião','casas',{steps:[
  ['Abra **Comunidade › Casas de Apascentamento** e clique em **Nova casa**.'],
  ['Informe o **Nome da casa**, o **Líder** e o **Anfitrião**, escolhidos entre os membros.','casas-nova'],
  ['Preencha o **Endereço** e o **Telefone** (opcionais) e escolha o **Ministério** responsável. Sem ministério, é uma casa geral.'],
  ['Clique em **Criar casa**. Os participantes podem ser adicionados depois.']]}],
 ['kids','Como crio uma sala do Kids?','A sala tem nome, capacidade, e pode ter uma turma (faixa etária) e um time de voluntários.','sala criar capacidade turma time','ksalas',{steps:[
  ['Abra **Kids › Salas** e clique em **Nova sala**.'],
  ['Informe o **Nome da sala** e a **Capacidade**.','kids-sala'],
  ['Se quiser, escolha a **Turma**, que define a faixa etária, e o **Time** de voluntários que serve nela.'],
  ['Clique em **Criar sala**.']]}],
 ['cafe','Como cadastro um item da Cafeteria?','O item tem nome, categoria, preço de venda, quantidade inicial e estoque mínimo.','item cadastrar produto preço estoque mínimo','cafe-items',{steps:[
  ['Abra **Cafeteria › Itens** e clique em **Novo item**.'],
  ['Informe o **Nome**, a **Categoria** e o **Preço de venda**.','cafe-item'],
  ['Preencha a **Quantidade inicial** e o **Estoque mínimo**; o Alva avisa quando o saldo chegar nele.'],
  ['Clique em **Adicionar item**.']]}],
 ['conteudo','Como cadastro uma pregação?','Informe título e pregador, escolha séries e visibilidade, e depois adicione vídeo, passagem e arquivos.','pregação cadastrar nova série visibilidade','pregacoes'],
 ['fin','Como registro um lançamento?','Todo lançamento novo entra pendente e só conta no saldo depois de aprovado.','lançamento entrada saída aprovação categoria competência','flanc']
];

/* junta as perguntas novas aos módulos e liga cada pergunta ao seu guia (se houver) */
AJ_NEW.forEach(x=>{const m=AJ.find(y=>y.id===x[0]);if(m)m.f.push([x[1],x[2],x[3],x[5]||null,x[4]]);});
const ajGuide=(m,f)=>f[3]||AJ_GUIDE[m.id+'|'+f[0]]||null;
const ajGo=(m,f)=>f[4]||m.go;
Object.assign(S,{ajM:null,ajQ:'',ajRes:'',ajA:null});
const AJ_STOP=new Set(['de','da','do','das','dos','a','o','as','os','e','em','um','uma','para','por','que','como','se','na','no','nas','nos','eu','posso','pode','onde','qual','quais','com','sem','ao','aos','meu','minha']);
const ajById=id=>AJ.find(m=>m.id===id);
const ajRich=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const ajMark=(t,terms)=>{const n=norm(t),r=[];terms.forEach(x=>{let i=n.indexOf(x);while(x&&i>=0){r.push([i,i+x.length]);i=n.indexOf(x,i+x.length);}});if(!r.length)return esc(t);r.sort((p,q)=>p[0]-q[0]);const m=[];r.forEach(z=>{const l=m[m.length-1];if(l&&z[0]<=l[1])l[1]=Math.max(l[1],z[1]);else m.push(z.slice());});let o='',p=0;m.forEach(z=>{o+=esc(t.slice(p,z[0]))+'<mark>'+esc(t.slice(z[0],z[1]))+'</mark>';p=z[1];});return o+esc(t.slice(p));};
/* busca: separa as palavras, ignora as comuns e pontua pergunta (3), palavras-chave (2), nome do módulo (1,5) e resposta e passos (1); quem tem todas as palavras sobe */
function ajSearch(q){
 const terms=norm(q).split(/[^a-z0-9]+/).filter(t=>t.length>1&&!AJ_STOP.has(t));if(!terms.length)return {terms,list:[]};
 const stem=t=>t.length>5?t.slice(0,t.length-2):t;
 const list=[];
 AJ.forEach(m=>m.f.forEach((f,i)=>{const g=ajGuide(m,f),nq=norm(f[0]),nk=norm(f[2]),na=norm(f[1]+' '+(g?g.steps.map(s=>s[0]).join(' ')+' '+(g.tip||'')+' '+(g.warn||''):'')),nm=norm(m.n);let s=0,hit=0;
  terms.forEach(t=>{const k=stem(t);let h=0;if(nq.includes(k))h+=3;if(nk.includes(k))h+=2;if(nm.includes(k))h+=1.5;if(na.includes(k))h+=1;if(h)hit++;s+=h;});
  if(s&&hit===terms.length)s+=4;if(s)list.push({m,f,i,s});}));
 list.sort((a,b)=>b.s-a.s);return {terms:terms.map(stem),list:list.slice(0,8)};
}
/* linha de pergunta: título, resumo e, se houver, a etiqueta de passo a passo */
function ajRow(m,f,i,terms,chip){
 const g=ajGuide(m,f);
 return `<button class="hc-li" data-a="ajArt" data-v="${m.id}|${i}"><span class="hc-lt">${chip?`<span class="hc-chip">${ic(m.ic,12,2)}${esc(m.n)}</span>`:''}<b>${terms?ajMark(f[0],terms):esc(f[0])}</b><small>${terms?ajMark(f[1],terms):esc(f[1])}</small></span>${g?`<span class="hc-badge">${ic('clipboard',12,2)}Passo a passo</span>`:''}<span class="hc-ch">${ic('chevR',16,2)}</span></button>`;
}
function ajArtPage(){
 const [mid,ix]=S.ajA.split('|'),m=ajById(mid),f=m&&m.f[+ix];if(!f){S.ajA=null;return ajudaPage();}
 const g=ajGuide(m,f),go=ajGo(m,f),rel=m.f.map((x,i)=>[x,i]).filter(([x,i])=>i!==+ix).slice(0,4);
 const steps=g?`<section class="hc-sec rise" style="--d:2"><p class="hc-eb">Passo a passo</p><ol class="hc-steps">${g.steps.map((s,k)=>`<li><span class="hc-n">${k+1}</span><div class="hc-sbd"><p>${ajRich(s[0])}</p>${s[1]&&ajImg(s[1])?`<figure class="hc-fig"><img src="${ajImg(s[1])}" alt="${esc(s[2]||'Tela do sistema')}"><figcaption>${esc(s[2]||'Tela do sistema, com o ponto da etapa em destaque.')}</figcaption></figure>`:''}</div></li>`).join('')}</ol></section>`:'';
 return `<nav class="crumb rise"><button class="lnk back" data-a="ajArtBack">${S.ajRes?'Resultados da busca':esc(m.n)}</button>${ic('chevR',13,2)}<span>${esc(f[0])}</span></nav>
 <article class="hc-art">
  <header class="card hc-ah rise" style="--d:1"><button class="hc-chip" data-a="ajMod" data-v="${m.id}">${ic(m.ic,12,2)}${esc(m.n)}</button><h1>${esc(f[0])}</h1><p class="hc-lede">${esc(f[1])}</p>
   ${g&&g.pre&&g.pre.length?`<div class="hc-pre"><b>Antes de começar</b><ul>${g.pre.map(x=>`<li>${ajRich(x)}</li>`).join('')}</ul></div>`:''}</header>
  ${steps}
  ${g&&g.tip?`<div class="hc-call c-tip rise" style="--d:3">${ic('info',17,2)}<div><b>Dica</b><p>${ajRich(g.tip)}</p></div></div>`:''}
  ${g&&g.warn?`<div class="hc-call c-warn rise" style="--d:3">${ic('alert',17,2)}<div><b>Importante</b><p>${ajRich(g.warn)}</p></div></div>`:''}
  <footer class="card hc-ft rise" style="--d:4"><div class="hc-fa"><button class="btn pri" data-a="ajGo" data-v="${go}">${ic('arrowR',15,2)}Abrir ${esc(m.n)} no sistema</button><span class="hc-ok">Isso ajudou? <button class="lnk" data-a="ajOk" data-v="1">Sim</button> · <button class="lnk" data-a="ajOk" data-v="0">Não</button></span></div>
   ${rel.length?`<div class="hc-rel"><p class="hc-eb">Veja também</p>${rel.map(([x,i])=>`<button class="lnk" data-a="ajArt" data-v="${m.id}|${i}">${esc(x[0])}</button>`).join('')}</div>`:''}</footer>
 </article>`;
}
function ajudaPage(){
 if(S.ajA)return ajArtPage();
 const q=S.ajQ,m=S.ajM&&ajById(S.ajM),total=AJ.reduce((n,x)=>n+x.f.length,0),guias=AJ.reduce((n,x)=>n+x.f.filter(f=>ajGuide(x,f)).length,0);
 const bar=`<form class="hc-bar rise" style="--d:1" id="ajF" novalidate><label class="sbox hc-sb">${ic('search',18)}<input id="ajq" placeholder="O que você quer saber? Ex.: como criar um evento" value="${esc(q)}" autocomplete="off" aria-label="Buscar na central de ajuda"></label><button type="submit" class="btn pri" data-a="ajSearch">Buscar</button></form>`;
 if(S.ajRes){
  const r=ajSearch(S.ajRes);
  return `<header class="ph rise"><div><p class="eb">Ajuda</p><h1>Central de ajuda</h1><p class="lede">Guia do sistema, módulo por módulo.</p></div></header>${bar}
  <section class="rise" style="--d:2"><div class="hc-rh"><span class="who" style="margin:0">${r.list.length?`<b>${r.list.length}</b> ${r.list.length===1?'resultado':'resultados'} para “${esc(S.ajRes)}”, do mais ao menos relevante`:''}</span><button class="lnk" data-a="ajClear">Limpar busca</button></div>
  ${r.list.length?`<div class="card hc-list">${r.list.map(x=>ajRow(x.m,x.f,x.i,r.terms,true)).join('')}</div>`
  :`<div class="card mempty" style="padding:40px 20px"><p>Nada encontrado para “${esc(S.ajRes)}”.</p><span>Tente outras palavras, ou escolha um módulo abaixo. Se não achar, fale com a equipe do Alva ou com a secretaria da sua igreja.</span></div>`}</section>
  ${r.list.length?'':ajGrid()}`;
 }
 if(m){
  return `<nav class="crumb rise"><button class="lnk back" data-a="ajClear">Central de ajuda</button>${ic('chevR',13,2)}<span>${esc(m.n)}</span></nav>
  <header class="ph rise" style="--d:1"><div><p class="eb">Central de ajuda</p><h1>${esc(m.n)}</h1><p class="lede">${esc(m.lede)}</p></div><div class="pact"><button class="btn sec" data-a="ajGo" data-v="${m.go}">${ic('arrowR',15,2)}Abrir ${esc(m.n)}</button></div></header>
  ${bar}<section class="rise" style="--d:2"><div class="hc-lh"><p class="hc-eb">Guias e respostas</p><span class="who" style="margin:0">${m.f.length} ${m.f.length===1?'item':'itens'} · ${m.f.filter(f=>ajGuide(m,f)).length} com passo a passo</span></div>
  <div class="card hc-list">${m.f.map((f,i)=>ajRow(m,f,i,null,false)).join('')}</div></section>
  <p class="who rise" style="--d:3">Não achou o que procurava? Use a busca acima, que pesquisa em todos os módulos.</p>`;
 }
 return `<header class="ph rise"><div><p class="eb">Ajuda</p><h1>Central de ajuda</h1><p class="lede">Guia do sistema, módulo por módulo. Escolha um módulo ou pesquise.</p></div></header>${bar}
 <section class="rise" style="--d:2"><div class="sh" style="margin:8px 0 12px"><h2 style="font:600 17px/22px var(--font-display);margin:0">Mais procuradas</h2></div>
  <div class="hc-top">${AJ_TOP.map(([id,i])=>{const mm=ajById(id),f=mm.f[i];return `<button class="hc-t" data-a="ajArt" data-v="${id}|${i}"><span>${esc(f[0])}</span><small>${esc(mm.n)}</small></button>`;}).join('')}</div></section>
 ${ajGrid()}<p class="who rise" style="--d:4">${total} perguntas em ${AJ.length} módulos, ${guias} com passo a passo e telas do sistema.</p>`;
}
function ajGrid(){
 return `<section class="rise" style="--d:3"><div class="sh" style="margin:22px 0 12px"><h2 style="font:600 17px/22px var(--font-display);margin:0">Escolha um módulo</h2></div>
  <div class="hc-grid">${AJ.map(m=>`<button class="card hc-m" data-a="ajMod" data-v="${m.id}"><span class="hc-i">${ic(m.ic,20,1.9)}</span><span class="hc-mt"><b>${esc(m.n)}</b><small>${m.f.length} ${m.f.length===1?'item':'itens'}</small></span><span class="hc-ch">${ic('chevR',16,2)}</span></button>`).join('')}</div></section>`;
}
Object.assign(A,{
 ajMod:v=>{S.ajM=v;S.ajRes='';S.ajQ='';S.ajA=null;render();window.scrollTo({top:0});},
 ajClear:()=>{S.ajM=null;S.ajRes='';S.ajQ='';S.ajA=null;render();window.scrollTo({top:0});},
 ajArt:v=>{S.ajA=v;if(!S.ajRes)S.ajM=v.split('|')[0];render();window.scrollTo({top:0});},
 ajArtBack:()=>{S.ajA=null;render();window.scrollTo({top:0});},
 ajSearch:()=>{const v=($('#ajq')||{}).value||'';S.ajQ=v;S.ajM=null;S.ajA=null;S.ajRes=v.trim();if(!S.ajRes)toast('Digite o que você quer saber');render();const i=$('#ajq');if(i&&!S.ajRes)i.focus();},
 ajGo:v=>A.nav(v),
 ajOk:v=>toast(v==='1'?'Obrigado pelo retorno':'Obrigado. Vamos melhorar esta resposta')
});
document.addEventListener('keydown',e=>{if(e.target&&e.target.id==='ajq'&&e.key==='Enter'){e.preventDefault();A.ajSearch();}});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='ajq')S.ajQ=e.target.value;});
document.addEventListener('submit',e=>{if(e.target&&e.target.id==='ajF')e.preventDefault();});
{const _n=A.nav;A.nav=v=>{if(v==='ajuda'){S.ajM=null;S.ajRes='';S.ajQ='';S.ajA=null;}_n(v);};}
{const _ph3=placeholder;placeholder=id=>id==='ajuda'?ajudaPage():_ph3(id);}
{const _sb3=sidebar;sidebar=function(){return _sb3().replace('</nav>',()=>`<div class="grp">Ajuda</div><button class="ni ${S.active==='ajuda'?'on':''}" data-a="nav" data-v="ajuda" ${S.active==='ajuda'?'aria-current="page"':''}>${ic('book',18)}Central de ajuda</button></nav>`);};}

/* ---------- Regras e fluxos (07/11/2026) ----------
   Página de consulta para apresentar as regras do Financeiro (verba, caixas, despesa, pagamentos e conciliação).
   Não é busca nem passo a passo: são diagramas. Fica na Ajuda por enquanto. */
const FLW_WHO={lider:['Líder ou equipe','var(--brand-text)','var(--brand-soft)','var(--brand)'],fin:['Financeiro','var(--st-ace)','var(--st-ace-bg)','var(--st-ace)'],alva:['O Alva','var(--st-int)','var(--st-int-bg)','var(--st-int)'],pessoa:['A pessoa','var(--st-sol)','var(--st-sol-bg)','var(--st-sol)'],ext:['Fora do Alva','var(--st-rec)','var(--st-rec-bg)','var(--st-rec)']};
/* nós: ['s',quem,título,texto] passo · ['f',rótulo,[coluna,...]] ramificação (coluna = lista de nós; ['h',texto] é título) · ['h',texto] título de trecho · ['n',texto] observação · ['e',título,texto] fim · ['x',aba,texto] segue em outra aba */
const FLW=[
 {id:'verba',n:'Verba (averbação)',go:['fprev','Abrir Caixas e vendas'],
  lede:'Verba é a autorização para gastar. Não é dinheiro, não entra no saldo da igreja nem no resultado. Só eventos, obras e campanhas têm verba; ministérios não.',
  rules:['A verba autoriza o gasto. Quem gasta é o caixa do projeto.','O ministério tem dinheiro real no seu caixa permanente e não precisa de verba.','A receita do próprio projeto (inscrições, vendas) também libera gasto quando o parâmetro do sistema está ligado: ligado em evento, desligado em obra.','A verba que sobra expira. Ela nunca vira dinheiro.'],
  nodes:[
   ['f','Como a verba nasce',[
     [['s','fin','Averba direto','Novo lançamento, opção Averbação: escolhe o evento ou a obra e o valor. Já nasce aprovada.']],
     [['s','lider','Pede a verba','O líder do evento ou da obra informa o valor. Na Zeladoria, o orçamento enviado vira o pedido.'],['s','alva','Vai para Aprovações','O pedido espera o Admin do Financeiro.'],['s','fin','Decide','Aprova, ou recusa explicando o motivo em texto livre. O líder recebe a resposta.']]]],
   ['s','alva','A verba aparece no caixa do projeto','O caixa mostra Verba aprovada, Receitas, Gasto e Limite restante (o quanto ainda pode gastar), e embaixo o dinheiro de verdade: Dinheiro no caixa e Adiantamento em aberto. Na Zeladoria, a obra fica aguardando o início até alguém iniciá-la.'],
   ['s','lider','O projeto gasta','As despesas são lançadas no caixa (veja Despesa e reembolso). Passou do limite restante, o líder não consegue lançar e pede reforço de verba (ou só recebe um aviso, conforme o parâmetro do sistema).'],
   ['s','fin','Encerra o caixa do projeto','Só quando o evento ou a obra terminou e não há nada pendente: tudo conferido e conciliado.'],
   ['f','O que acontece com a sobra',[
     [['s','alva','Verba que sobrou','Expira. Não vira dinheiro nem lançamento.']],
     [['s','fin','Dinheiro real que sobrou','Volta ao caixa do ministério do evento; sem ministério, vai para a igreja. O líder propõe e o Financeiro confirma.']]]],
   ['n','Campanha com destino prometido (por exemplo, uma oferta para uma finalidade) não pode ir livremente para o caixa geral da igreja.'],
   ['e','Caixa encerrado','Sai da lista principal e fica no filtro Encerradas.']]},
 {id:'caixas',n:'Caixas e fundos',go:['fprev','Abrir Caixas e vendas'],
  lede:'Cada ministério, evento, obra ou campanha tem o seu caixa. Há dois tipos de fundo, e a diferença muda o que o Financeiro cobra de cada um.',
  rules:['Cada unidade tem um caixa principal e, se quiser, subcaixas.','O líder move dinheiro entre as subcaixas sem lançar nada no Financeiro.','O Financeiro enxerga o caixa principal e abre o detalhe só para conferir.'],
  nodes:[
   ['f','Dois tipos de fundo',[
     [['h','Fundo permanente (ministério)'],['s','lider','É dinheiro real','Mostra quanto o ministério tem. O líder declara o saldo inicial e o Financeiro confirma.'],['s','lider','Gasta e lança','Cada despesa abate o saldo na hora.'],['s','fin','Confere todo mês','Prestação de contas mensal: o Financeiro confere notas e pendências.'],['e','Nunca é excluído','O caixa principal do ministério permanece e só movimenta.']],
     [['h','Fundo de projeto (evento, obra, campanha)'],['s','fin','Tem verba e dinheiro real','A verba autoriza o gasto. O dinheiro real vem de inscrições, vendas e ofertas.'],['s','lider','Gasta e lança','Igual ao permanente.'],['s','fin','Presta contas no fim','No evento, ao terminar. Na obra, a etapa Prestação de contas vem antes de encerrar.'],['e','É encerrado','A sobra de dinheiro volta ao ministério ou à igreja.']]]],
   ['x','verba','Como a verba nasce e o que acontece com a sobra: veja Verba (averbação).']]},
 {id:'despesa',n:'Despesa e reembolso',go:['fprev','Abrir Caixas e vendas'],
  lede:'Despesa é execução: não precisa de aprovação antes (a aprovação é a verba). O Financeiro confere depois.',
  rules:['Quem lança é o líder; o saldo do caixa abate na hora.','O caixa pode ficar negativo, com alerta.','Despesa paga pelo próprio Financeiro já nasce conferida.','Quem pagou do bolso é reembolsado por uma conta a pagar; o valor não conta duas vezes no caixa.'],
  nodes:[
   ['h','1. Lançar e conferir'],
   ['s','lider','Lança a despesa','Valor, categoria, nota e Paguei com. No fundo permanente o padrão é dinheiro do caixa; no evento, meu bolso.'],
   ['s','alva','Abate o saldo na hora','A despesa fica A conferir.'],
   ['s','fin','Confere a despesa','Olha a nota e a categoria. Pode reclassificar.'],
   ['f','Resultado da conferência',[
     [['s','fin','Aceita','Vira Conferida.']],
     [['s','fin','Devolve','Vira Com pendência. O líder corrige e a despesa volta a ser conferida.']],
     [['s','fin','Recusa','O líder recebe o motivo, escrito em texto livre.']]]],
   ['h','2. Se o líder pagou do próprio bolso'],
   ['s','alva','Cria a conta a pagar ao líder','Automática. A despesa fica A reembolsar.'],
   ['s','fin','Paga o reembolso','Em Contas a pagar, com o comprovante do depósito.'],
   ['e','Reembolsada','O valor não entra duas vezes no caixa.'],
   ['h','3. Receita lançada pelo líder'],
   ['s','lider','Declara como entrou','Dinheiro, cartão ou Pix. Cada forma é um registro (R$ 100 em dinheiro e R$ 400 no cartão são dois).'],
   ['s','fin','Confirma o recebimento','A receita nasce A conferir, passa a Conciliada e, quando o dinheiro aparece no banco, Recebida no banco.']]},
 {id:'link',n:'Pagamento por link',go:['fimp','Abrir Importar e conciliar'],
  lede:'Inscrição, doação e pedido do app pagos online. O Alva não cobra: o Asaas cobra e avisa.',
  rules:['O Asaas informa valor, taxa, líquido e data na própria confirmação.','Por isso o pagamento já nasce conciliado com o provedor, sem aprovação.','Se o aviso se perder, um job do Alva confere e dá a baixa.'],
  nodes:[
   ['s','pessoa','Paga online','Cartão, Pix ou boleto, pelo link ou pelo app.'],
   ['s','ext','O Asaas processa','Confirma o pagamento e calcula a taxa.'],
   ['f','Como o Alva fica sabendo',[
     [['s','ext','Aviso do Asaas (webhook)','Normalmente chega na hora.']],
     [['s','alva','Se o aviso se perder','A cada 10 minutos, o job de pagamentos consulta o Asaas sobre o que ficou sem aviso e dá a baixa.']]]],
   ['s','alva','Confirma o pagamento','Já com valor, taxa, líquido e data de recebimento. Nasce conciliado com o provedor.'],
   ['s','alva','Entra na carteira Asaas como a liberar','É uma previsão. Ainda não é receita nem saldo.'],
   ['x','carteira','Continua em Da carteira ao banco.']]},
 {id:'maq',n:'Maquininha e totem',go:['fapr','Abrir Aprovações'],tag:'Em definição',
  lede:'A venda no cartão é registrada pelo módulo. A cobrança vem da adquirente (Mercado Pago). O Alva liga as duas e guarda a taxa e o valor líquido.',
  rules:['O totem não cobra: quem cobra é a maquininha ligada a ele.','Com o mesmo código de autorização, o vínculo é automático e sem aviso.','Sem código, o Alva compara maquininha, valor, forma e horário, e só vincula sozinho quando não há dúvida.','O que não tem par aparece em Aprovações, na aba Conciliação, com três saídas: vincular, classificar ou ignorar com motivo.'],
  nodes:[
   ['s','pessoa','Passa o cartão','No balcão ou no totem.'],
   ['f','Como a venda chega ao Alva',[
     [['s','alva','Totem (Totify)','O Totify avisa a venda como paga, com o terminal, o cardápio e o código de autorização.']],
     [['s','lider','Balcão','A venda é registrada no módulo: cafeteria, restaurante ou loja.']],
     [['s','fin','Maquininha da igreja','Toda cobrança é dízimo ou oferta. O Alva liga a cobrança ao culto do horário.']]]],
   ['s','ext','A adquirente registra a cobrança','Valor bruto, taxa, líquido, parcelas, data de liberação e código de autorização.'],
   ['s','alva','O job busca as cobranças','Consulta o Mercado Pago de hora em hora e relê os últimos dias. Importar o arquivo da maquininha usa a mesma regra.'],
   ['f','O Alva liga a cobrança à venda',[
     [['s','alva','Mesmo código de autorização','Vincula sozinho, sem avisar.']],
     [['s','alva','Sem código: por aproximação','Mesma maquininha, valor, forma e horário. Vincula sozinho quando não há dúvida.']],
     [['s','fin','Maquininha da igreja','Sugestão: lançar como oferta do culto do horário. O Financeiro confirma, uma cobrança por vez.']],
     [['s','fin','Sem par','Vira exceção em Aprovações, e toda exceção tem saída: vincular à mão, classificar ou ignorar com motivo.']]]],
   ['s','alva','Conciliada','Ficam registrados o bruto, a taxa, o líquido e a data prevista.'],
   ['s','alva','Entra na carteira Mercado Pago como a liberar','É uma previsão. Ainda não é receita nem saldo.'],
   ['x','carteira','Continua em Da carteira ao banco.'],
   ['n','Em definição: o aviso (webhook) do Mercado Pago para venda direta na maquininha será testado. Sem ele vale a consulta do job. Como o Totify avisa por webhook e não permite consultar depois, uma cobrança sem venda também revela um aviso perdido.']]},
 {id:'pixd',n:'Pix e dinheiro',go:['fimp','Abrir Importar e conciliar'],tag:'Em definição',
  lede:'Pix e dinheiro não passam pela adquirente. O dinheiro chega direto ao banco, e é o extrato do banco que concilia.',
  rules:['O Alva não conta como recebido o que ainda não apareceu no extrato.','Dinheiro é depositado somando o dia, por módulo.'],
  nodes:[
   ['f','Duas formas',[
     [['h','Pix'],['s','pessoa','Paga por Pix','No balcão, no app ou no totem.'],['s','alva','Venda registrada','Fica A conferir.'],['s','ext','Cai direto no banco','Na hora.'],['s','alva','O extrato concilia','A linha do banco bate com uma venda de mesmo valor e horário próximo.'],['e','Recebida no banco','']],
     [['h','Dinheiro'],['s','lider','Recebe em dinheiro','Fica no caixa do módulo.'],['s','lider','Deposita no banco','Normalmente no dia seguinte, somando as vendas do dia.'],['s','alva','O extrato concilia','A linha do banco bate com a soma do dia daquele módulo.'],['e','Depositada no banco','']]]],
   ['n','Em definição: como o Totify trata o Pix ainda será confirmado.']]},
 {id:'carteira',n:'Da carteira ao banco',go:['fcon','Abrir Contas financeiras'],tag:'Em definição',
  lede:'O Mercado Pago e o Asaas guardam o dinheiro numa conta própria antes de ele ir ao banco. No Alva, cada um é uma conta do tipo carteira, com saldo e extrato.',
  rules:['A conciliação só gera previsão (a liberar).','A receita e a taxa nascem quando o dinheiro é liberado.','O saque para o banco é uma transferência entre contas: não é receita nem despesa.','Assim a receita é contada uma vez, mesmo que o valor sacado seja diferente do repasse.'],
  nodes:[
   ['h','Exemplo: venda de R$ 100,00 no crédito, com taxa de R$ 3,49'],
   ['s','alva','27/09 · Conciliada: a liberar','R$ 96,51 previstos na carteira. É só previsão.'],
   ['s','ext','27/10 · Liberação','O dinheiro fica disponível na conta Mercado Pago.'],
   ['s','alva','Vira saldo da carteira','Nascem a receita de R$ 100,00 e a taxa de R$ 3,49, no centro de custo do módulo.'],
   ['s','fin','Saque para o banco','Alguém transfere da carteira para a conta da igreja. No Alva é uma Transferência.'],
   ['s','alva','O extrato do banco confirma','A linha do banco casa com a transferência. O saldo total da igreja não muda.'],
   ['e','Dinheiro na Conta principal',''],
   ['n','Em definição: se a conta da igreja guarda o saldo no Mercado Pago ou deposita direto no banco; e se a competência da receita é o mês da venda (setembro) e não o mês da liberação.']]}
];
const flwNode=(n,i)=>{
 const t=n[0];
 if(t==='s'){const w=FLW_WHO[n[1]];return `<div class="flw-s" style="--c:${w[3]};--ct:${w[1]};--cb:${w[2]}"><span class="flw-w">${w[0]}</span><b>${esc(n[2])}</b>${n[3]?`<p>${esc(n[3])}</p>`:''}</div>`;}
 if(t==='h')return `<p class="flw-h">${esc(n[1])}</p>`;
 if(t==='n')return `<div class="hc-call c-tip flw-n">${ic('info',17,2)}<div><p>${esc(n[1])}</p></div></div>`;
 if(t==='e')return `<div class="flw-e">${ic('check',16,2.4)}<span><b>${esc(n[1])}</b>${n[2]?`<small>${esc(n[2])}</small>`:''}</span></div>`;
 if(t==='x'){const f=FLW.find(x=>x.id===n[1]);return `<button class="flw-x" data-a="flwTab" data-v="${n[1]}">${ic('arrowR',14,2)}<span>${esc(n[2])}</span><b>${esc(f?f.n:'')}</b></button>`;}
 if(t==='f')return `<div class="flw-fk"><p class="flw-fl">${esc(n[1])}</p><div class="flw-cols" style="--n:${n[2].length}">${n[2].map(c=>`<div class="flw-col">${flwSeq(c)}</div>`).join('')}</div></div>`;
 return '';
};
/* uma coluna ou o fluxo todo: nós separados por seta (títulos e observações não levam seta antes) */
function flwSeq(L){return L.map((n,i)=>{const arrow=i>0&&!['h','n'].includes(n[0])&&!['h','n'].includes(L[i-1][0])?`<span class="flw-ar" aria-hidden="true">${ic('chevD',16,2)}</span>`:'';return arrow+flwNode(n,i);}).join('');}
Object.assign(S,{flw:'verba'});
Object.assign(A,{flwTab:v=>{S.flw=v;S.active='fluxos';render();window.scrollTo({top:0});}});
/* ---- áreas e novos fluxos (07/11/2026): Zeladoria, Eventos, Integração e Secretaria ---- */
const FLW_AREAS=[['fin','Financeiro'],['zel','Zeladoria'],['evt','Eventos'],['int','Integração'],['sec','Secretaria']];
const FLW_AREA={adiantamento:'fin',fechamento:'fin',rateio:'fin',verba:'fin',caixas:'fin',despesa:'fin',link:'fin',maq:'fin',pixd:'fin',carteira:'fin'};
FLW.forEach(f=>{f.area=FLW_AREA[f.id];});
FLW.push(
 {id:'adiantamento',area:'fin',n:'Adiantamento',go:['fprev','Abrir Caixas e vendas'],
  lede:'Adiantamento é dinheiro de verdade que a igreja entrega ao responsável de uma obra ou de um evento. Reserva a verba até ele prestar contas e não é receita nem despesa.',
  rules:['Verba é autorização. Adiantamento é dinheiro. Os dois são separados.','O adiantamento em aberto reduz o Limite restante: a verba fica reservada até a prestação de contas.','Dinheiro no caixa = adiantamento recebido + receitas − despesas pagas com o caixa. A verba nunca entra.','Não aparece na DRE. No plano de contas é um ativo (adiantamentos a prestar contas).','O prazo para prestar contas é um parâmetro do sistema. Vencido, o Financeiro não lança outro adiantamento e o caixa não pode ser encerrado.'],
  nodes:[
   ['s','fin','Lança o adiantamento','Na página do caixa: valor e quem recebe. Precisa caber no limite restante.'],
   ['s','alva','Reserva a verba','O valor sai do Limite restante e entra em Adiantamento em aberto. O Dinheiro no caixa sobe.'],
   ['s','lider','Gasta com o dinheiro do caixa','Cada saída paga com o caixa abate o adiantamento em aberto, sem consumir o limite de novo. Gasto do bolso do líder vira reembolso e consome o limite.'],
   ['f','Quando o prazo chega',[
     [['h','Prestou contas'],['s','fin','Dá baixa','O gasto conferido vira a prestação de contas. O que não foi justificado volta para a igreja primeiro.']],
     [['h','Venceu'],['s','alva','Avisa e trava','Aparece como aviso na revisão do fechamento, não deixa lançar outro adiantamento e impede o encerramento do caixa.']]]],
   ['e','Caixa encerrado','No encerramento, o adiantamento em aberto é baixado: o não justificado volta à igreja, a verba não usada expira e a sobra real segue o destino escolhido.']]},
 {id:'fechamento',area:'fin',n:'Fechamento do mês',go:['ffech','Abrir Fechamentos'],
  lede:'Fechar o mês trava os lançamentos daquele mês. Nunca é direto: o Admin vê a revisão e só então dá o ok.',
  rules:['Só se fecha o mês seguinte ao último fechado, depois que ele terminou.','Três coisas bloqueiam: aprovação pendente, Conciliação aberta e saldo diferente do extrato do banco.','O resto só avisa, e os avisos ficam registrados no fechamento.','O Admin pode reabrir o último mês fechado; o anterior fica selado.'],
  nodes:[
   ['s','fin','Abre Revisar e fechar','Na tela de Fechamentos, quando o mês terminou.'],
   ['s','alva','Monta a revisão','Confere aprovações, Conciliação e o saldo de cada conta bancária e carteira contra o último extrato do mês.'],
   ['f','O que a revisão mostra',[
     [['h','Precisa estar em ordem'],['s','alva','Bloqueia o fechamento','Aprovação pendente, Conciliação aberta ou saldo diferente do extrato. O botão Fechar fica desligado e diz o motivo.']],
     [['h','Só avisos'],['s','alva','Não bloqueia, mas fica registrado','Conta sem extrato até o fim do mês, conta vencida sem baixa, saída sem comprovante, despesa de caixa a conferir e conta do plano sem código contábil.']]]],
   ['s','fin','Resolve o que bloqueia','Cada item tem um atalho: Aprovações, Conciliação, Importar extrato.'],
   ['s','fin','Dá o ok','Fechar, ou Fechar com N avisos. O servidor refaz a revisão na hora.'],
   ['e','Mês fechado','Fica registrado quem fechou, quando e com quantos avisos. O mês anterior passa a Selado.']]},
 {id:'rateio',area:'fin',n:'Rateio entre centros de custo',go:['flanc','Abrir Lançamentos'],
  lede:'Uma despesa que serve a vários lugares (a energia do templo, da cafeteria e da loja) é dividida entre centros de custo. O valor continua sendo um só movimento.',
  rules:['Só entre centros de custo: a conta do plano é uma só.','Cada parte tem o centro e a porcentagem; pode-se digitar em % ou em reais.','No mínimo duas partes, sem centro repetido, e a soma tem que fechar 100%.','O banco e a aprovação enxergam um lançamento só; as partes alimentam a DRE por centro e os relatórios.'],
  nodes:[
   ['s','fin','Lança ou cadastra a conta','No Novo lançamento ou na conta a pagar ou a receber, liga Ratear entre centros de custo.'],
   ['f','Como monta a divisão',[
     [['s','fin','Aplica um modelo','Por exemplo, Energia e água: Cultos 60%, Cafeteria 25% e Loja 15%.']],
     [['s','fin','Monta à mão','Escolhe os centros e digita a porcentagem ou o valor em reais. Um campo acompanha o outro.']]]],
   ['s','alva','Confere a soma','Fecha em 100%, sem centro repetido. A última parte leva o centavo que sobrar.'],
   ['s','fin','Salva como modelo (opcional)','Na próxima conta parecida, é só aplicar.'],
   ['s','alva','Segue o caminho normal','Entra em Aprovações como um lançamento só. Se a conta repete todo mês ou é parcelada, as outras também nascem com o mesmo rateio.'],
   ['s','ext','O banco concilia o movimento inteiro','A linha do extrato casa com o lançamento, não com cada parte.'],
   ['e','Cada centro vê a sua parte','A DRE por centro, a página de Centros de custo e os relatórios somam só a parte de cada um. A Exportação contábil leva uma linha por parte.']]},
 {id:'zpedido',area:'zel',n:'Do pedido à aprovação',go:['zel-trab','Abrir Zeladoria'],
  lede:'Todo trabalho da Zeladoria (manutenção ou melhoria) anda por cinco etapas fixas: Pedido, Orçamento, Aprovação, Execução e Concluído. Pode ser cancelado só antes da execução.',
  rules:['Quem tem permissão de Editar na Zeladoria faz o pedido.','A equipe da Zeladoria faz o pequeno e orça só o material. Serviço de fornecedor leva propostas.','O orçamento vira um pedido de verba. Só o Admin do Financeiro aprova.','Aprovar não inicia a obra: ela espera a Zeladoria dar o início.'],
  nodes:[
   ['s','lider','Pede o trabalho','Nome, tipo (manutenção ou melhoria), local, urgência e foto. A categoria não é do pedido: escolhe-se em cada despesa.'],
   ['s','alva','Avisa a equipe','Nasce na etapa Pedido, com uma pendência: pedido novo a avaliar.'],
   ['s','lider','Avalia o pedido','Define quem faz (a equipe ou um fornecedor) e o responsável, que precisa ser da equipe da Zeladoria. O solicitante é avisado.'],
   ['s','lider','Monta o orçamento','Material em itens. Se for de fornecedor, propostas A, B e C (PDF ou PPT) e uma delas escolhida.'],
   ['s','lider','Envia para aprovação','Exige material orçado (equipe) ou proposta escolhida (fornecedor). Cria o pedido de verba.'],
   ['f','Quem aprova a verba',[
     [['s','fin','Aprova em Aprovações','Só o Admin do Financeiro decide. O valor aprovado pode ser diferente do pedido.']],
     [['s','lider','Registra a aprovação à mão','Quando a aprovação foi dada fora do sistema. O Financeiro valida depois.']]]],
   ['s','alva','Aprovada, aguardando o início','A verba nasce no caixa da obra. O caixa ainda não aceita lançamento.'],
   ['x','zobra','Continua em Execução e prestação de contas.'],
   ['n','O trabalho pode ser cancelado com motivo escrito em texto livre, mas só enquanto está em Pedido, Orçamento ou Aprovação.']]},
 {id:'zobra',area:'zel',n:'Execução e prestação de contas',go:['fprev','Abrir Caixas e vendas'],
  lede:'Depois de aprovada, a obra começa quando a Zeladoria decidir. Ao terminar, o Financeiro faz a prestação de contas e só ele encerra.',
  rules:['A obra é um fundo de projeto: tem verba e dinheiro real.','Todo gasto lançado pela Zeladoria nasce A conferir.','Concluir fecha o caixa para lançamento novo, mas ele segue aberto para conferência.','Só o Financeiro encerra, e só sem pendência de conferência.'],
  nodes:[
   ['s','lider','Inicia a obra','Informa a data de início e a previsão de término. A tela sugere o prazo da proposta escolhida (7 dias sem proposta). O caixa passa a aceitar lançamento.'],
   ['s','lider','Lança os gastos','Valor, categoria, material ou mão de obra, fornecedor e comprovante. Paguei com: caixa ou bolso.'],
   ['s','fin','Confere os gastos','Aceita ou devolve. Gasto do bolso gera um reembolso a pagar ao líder.'],
   ['s','lider','Conclui o trabalho','A etapa vira Prestação de contas. O caixa não recebe mais lançamento novo, mas segue aberto para conferência.'],
   ['s','fin','Faz a prestação de contas','Confere tudo o que falta. O botão Encerrar obra fica desabilitado enquanto houver lançamento a conferir, devolvido ou com reembolso de receita solicitado.'],
   ['s','fin','Encerra a obra','A verba que não foi usada expira. A sobra de dinheiro real, se houver, vai para a igreja.'],
   ['e','Obra encerrada','Sai do quadro e fica no filtro Encerradas, só para consulta.'],
   ['n','Reembolso a pagar ao líder só avisa: não impede o encerramento.']]},
 {id:'einsc',area:'evt',n:'Inscrição e ingresso',go:['eventos','Abrir Eventos'],
  lede:'Retiro, conferência e evento especial podem ter inscrição. O evento gratuito e o pago funcionam igual, a diferença é o pagamento.',
  rules:['O evento nasce com as vendas fechadas. A equipe abre quando estiver pronto.','Evento pago precisa de ao menos um ingresso ativo para ser publicado.','Cancela-se a compra inteira, nunca um ingresso isolado.','Com check-in feito em qualquer inscrição, a pessoa não cancela mais.'],
  nodes:[
   ['s','lider','Prepara o evento','Liga a participação por inscrição, cria os ingressos, itens adicionais e vouchers, e define a política de reembolso e a janela de check-in.'],
   ['s','lider','Abre as vendas','O evento é publicado e a inscrição fica disponível no app.'],
   ['f','Como a pessoa se inscreve',[
     [['h','Pelo app'],['s','pessoa','Monta o carrinho','Ingressos para si e para outras pessoas, itens adicionais e voucher.'],['s','alva','Grava a compra','Evento gratuito: a inscrição já nasce confirmada. Pago: fica pendente.'],['s','ext','Paga pelo Asaas','Link, Pix ou cartão. O Alva pede a cobrança ao Conectores.'],['s','alva','Confirma a inscrição','Pelo aviso do Asaas, ou pelo job que confere os pagamentos pendentes. Compra vencida sem pagamento expira.']],
     [['h','No balcão'],['s','lider','Vende na hora','A mesma janela da venda rápida da cafeteria e da loja. Nome, e-mail e telefone obrigatórios.'],['s','pessoa','Paga na hora','Pix, cartão ou dinheiro. A equipe pode dar desconto, que nunca zera o total.'],['s','alva','Inscrição já paga','Vende mesmo com as vendas fechadas e acima das vagas, até o fim do último dia do evento.']]]],
   ['s','alva','Envia o ingresso com código','Cada inscrição tem o seu código QR e o seu check-in. Uma compra com 3 ingressos gera 3 inscrições.'],
   ['f','Se a pessoa cancelar',[
     [['s','pessoa','Compra pendente','Cancela com reembolso de 100%.']],
     [['s','pessoa','Compra paga','Reembolso conforme a política do evento. O estorno sai sempre pelo provedor.']]]],
   ['x','echeck','Continua em Check-in e vendas no dia.']]},
 {id:'echeck',area:'evt',n:'Check-in e vendas no dia',go:['eventos','Abrir Eventos'],
  lede:'No dia, o check-in confirma quem entrou. A aba Check-in acompanha tudo em tempo real.',
  rules:['Só entram na conta as inscrições confirmadas.','No evento gratuito, o check-in da própria pessoa é opcional.','No evento pago, quem faz o check-in é a equipe.','Depois do último dia do evento, nada mais se vende.'],
  nodes:[
   ['f','Quem faz o check-in',[
     [['h','Evento gratuito'],['s','pessoa','Toca em Fazer check-in','No dia e no horário, no app. Registra a presença na hora.']],
     [['h','Evento pago'],['s','pessoa','Mostra o código do ingresso','No app, no dia e no horário.'],['s','lider','Lê o código ou procura o nome','A equipe lê o QR ou busca por nome, e-mail, telefone, CPF, voucher ou código, e faz o check-in na ficha.']]]],
   ['s','alva','Valida e registra','Inscrição confirmada, sem duplicidade e dentro da janela. Se recusar, a tela diz o motivo (já entrou, não confirmada, fora do horário).'],
   ['s','lider','Retira os itens','Almoço, camiseta e outros itens: cada unidade comprada ou inclusa é uma retirada.'],
   ['s','lider','Desfaz, se clicou errado','Só a equipe desfaz, pela ficha da inscrição. A pessoa nunca desfaz.'],
   ['s','fin','Acompanha','A aba Check-in mostra quantos entraram, quantos faltam, quem aguarda pagamento e o último a entrar.'],
   ['n','Vendas pela internet seguem o prazo e as vagas. A venda de balcão continua até o fim do último dia do evento, mesmo com vendas fechadas ou sem vagas.']]},
 {id:'eenc',area:'evt',n:'Encerramento do evento e do caixa',go:['fapr','Abrir Aprovações'],
  lede:'Quando o evento termina, o dinheiro precisa ser fechado. O líder pede o encerramento e o Financeiro decide.',
  rules:['O caixa só encerra com o evento terminado e a prestação de contas feita.','Não pode haver subcaixa aberta nem lançamento a conferir ou devolvido.','A verba que não foi usada expira.','A sobra de dinheiro real vai para o ministério do evento ou para a igreja. Não existe deixar no caixa.'],
  nodes:[
   ['s','lider','Pede o encerramento','Botão Encerrar caixa no caixa principal. O líder escolhe o destino da sobra.'],
   ['s','alva','Trava o caixa','Enquanto o pedido espera, o caixa não recebe lançamento novo.'],
   ['s','alva','Vai para Aprovações','Aparece como Pedido de encerramento de caixa, com sobra, receita, despesa e pendências.'],
   ['f','Decisão do Financeiro',[
     [['s','fin','Aprova','O caixa fecha, a verba não usada expira e a sobra vai ao destino.']],
     [['s','fin','Recusa','Com motivo em texto livre. O caixa continua aberto e o líder vê o motivo.']]]],
   ['f','Para onde vai a sobra',[
     [['s','fin','Ao ministério','Quando o evento tem ministério e o ministério tem caixa.']],
     [['s','fin','À igreja','Sempre possível. É o único caminho quando o evento não tem ministério.']]]],
   ['e','Caixa encerrado','O evento sai do dia a dia do ministério e fica só para consulta.']]},
 {id:'ipedido',area:'int',n:'Do pedido à conclusão',go:['integracao','Abrir Integração'],
  lede:'A Integração é o período em que quem já tem cadastro pede para se tornar membro. O dia em que ela acontece é um evento interno.',
  rules:['A pessoa pede pelo app, com ou sem conta (sem conta, comprova o e-mail por um código).','Sem integração aberta, sem vaga ou fora do prazo de pedidos, o pedido vai para a fila de espera.','Recusar exige motivo, escrito em texto livre.','Concluir não exige todas as etapas: a lista é informativa.'],
  nodes:[
   ['s','lider','Cria a integração','Nome, período de pedidos, limite de vagas, grupo de WhatsApp e responsável.'],
   ['s','pessoa','Toca em Quero ser membro','No app. Se ainda não tem cadastro, o Alva cria um com a situação Em integração.'],
   ['f','O Alva verifica o pedido',[
     [['s','alva','Sem integração, sem vaga ou fora do prazo','A pessoa entra na fila de espera.']],
     [['s','alva','Aceitação manual (padrão)','O pedido fica Solicitado e o responsável é avisado.']],
     [['s','alva','Aceitação automática, com vaga','O pedido já nasce Aceito.']]]],
   ['f','Decisão do responsável',[
     [['s','lider','Aceita','Confere a vaga na hora. A pessoa é avisada.']],
     [['s','lider','Recusa','Com motivo em texto livre. A pessoa é avisada.']]]],
   ['s','lider','Registra as etapas','Cada etapa do catálogo é marcada uma vez por pedido aceito.'],
   ['s','lider','Conclui a integração','A pessoa passa a membro integrado.'],
   ['s','alva','Avisa a Secretaria','O que a pessoa declarou (batismo, consagração, casamento) vira Ato informado, para a Secretaria aceitar ou recusar.'],
   ['x','sato','Veja Ato de outra igreja, na Secretaria.']]},
 {id:'ifila',area:'int',n:'Fila de espera e dia da integração',go:['integracao','Abrir Integração'],
  lede:'Quem pede sem vaga espera na fila. Quem é aceito entra automaticamente no evento do dia da integração.',
  rules:['A pessoa na fila vê a posição e pode sair quando quiser.','A equipe chama uma pessoa, ou os próximos N até as vagas livres.','O dia da integração é um evento do tipo Integração, nunca público.','Cada pessoa aceita vira uma inscrição interna e gratuita nesse evento.'],
  nodes:[
   ['h','Fila de espera'],
   ['s','pessoa','Entra na fila','Automático, quando o pedido não tem vaga, prazo ou integração aberta.'],
   ['s','lider','Chama da fila','Uma pessoa, ou os próximos N, até o número de vagas livres.'],
   ['s','alva','Vira pedido','A pessoa chamada segue o fluxo normal de aceite.'],
   ['h','Dia da integração'],
   ['s','lider','Cria o evento do dia','Na ficha da integração: data e horário (café, apresentação dos pastores e líderes, almoço).'],
   ['s','alva','Inscreve os aceitos','Cada pessoa aceita ganha uma inscrição interna e gratuita. Isso dá a contagem para o almoço.'],
   ['s','lider','Faz o check-in','No dia, a presença é marcada como em qualquer evento.'],
   ['e','Integrado','O processo da pessoa (etapas e conclusão) continua sendo da Integração.']]},
 {id:'sbebe',area:'sec',n:'Apresentação de bebê',go:['secretaria','Abrir Secretaria'],
  lede:'A família pede pelo app, a equipe confirma a data, a cerimônia acontece e a Secretaria emite o certificado.',
  rules:['O pedido não reserva vaga; só a confirmação reserva.','A vaga e o limite de idade são conferidos na confirmação. Idade acima do limite é só um aviso.','O pedido pelo app existe para Apresentação e Batismo. Consagração e Casamento a equipe cadastra.','O Ato realizado vem da Agenda para a Secretaria sem duplicar dado.'],
  nodes:[
   ['s','pessoa','Pede a apresentação','Pelo app, em Agenda › Apresentações: nome e nascimento do bebê e os responsáveis (membro ativo).'],
   ['s','alva','Fica aguardando','É só um pedido. A equipe do evento é avisada.'],
   ['f','Decisão da equipe',[
     [['s','lider','Confirma','Respeitando as vagas da data. Vira uma inscrição gratuita, uma por bebê. A família é avisada.']],
     [['s','lider','Recusa','Com motivo em texto livre. A família vê o motivo e pode pedir outra data com vaga.']]]],
   ['s','lider','Marca como realizada','No dia da cerimônia ou depois dele.'],
   ['s','alva','O Ato chega à Secretaria','A Secretaria lê o Ato realizado na Agenda. Não existe cadastro duplicado.'],
   ['s','lider','Emite o certificado','Pela Secretaria, com modelo de documento versionado. Fica um registro que pode ser validado pelo código.'],
   ['n','Depois de emitido o certificado, o Ato não pode mais ser desmarcado como realizado. É preciso revogar o documento antes.']]},
 {id:'sdecl',area:'sec',n:'Declaração de membro',go:['secretaria','Abrir Secretaria'],
  lede:'O membro pede a declaração pelo app. Quando ele é elegível, ela sai sozinha na hora.',
  rules:['Só membro integrado e ativo pede.','Há um pedido em aberto por pessoa.','Quando não é elegível, a Secretaria decide e a pessoa não vê o motivo da inelegibilidade.','Os demais documentos continuam pelos canais da igreja.'],
  nodes:[
   ['s','pessoa','Pede a declaração','No app, em Fale com a secretaria › Resolver agora.'],
   ['s','alva','Confere se é elegível','Membro integrado e ativo.'],
   ['f','Resultado',[
     [['s','alva','Elegível','A declaração é emitida na hora e aparece em Meus documentos. A pessoa é avisada.']],
     [['s','alva','Não elegível','O pedido fica Pendente para a Secretaria. A pessoa não recebe o motivo.']]]],
   ['f','Se ficou pendente',[
     [['s','lider','Emite','Abre a emissão já preenchida. A pessoa é avisada.']],
     [['s','lider','Recusa','Com motivo em texto livre, que a pessoa vê no app.']],
     [['s','pessoa','Cancela o pedido','Enquanto estiver pendente.']]]]]},
 {id:'sato',area:'sec',n:'Ato de outra igreja',go:['secretaria','Abrir Secretaria'],
  lede:'Quem se integra declara o que já viveu em outra igreja (batismo, consagração, casamento). A Secretaria decide o que o Alva passa a considerar oficial.',
  rules:['O dado que a pessoa preencheu nunca é alterado pela decisão. É a verdade dela.','Relatórios e contagens oficiais usam sempre o que a Secretaria aceitou.','Aceitar a consagração pede também o cargo declarado.'],
  nodes:[
   ['s','pessoa','Declara na ficha','Batizada? Consagrada? Casada? Ao pedir a integração.'],
   ['s','lider','Conclui a integração','Na Integração (veja Do pedido à conclusão).'],
   ['s','alva','Cria um Ato informado','Um para cada fato declarado como verdadeiro, pendente de decisão.'],
   ['f','Decisão da Secretaria',[
     [['s','lider','Aceita','Marca a pessoa como batizada, consagrada ou casada para os relatórios oficiais. Na consagração, pede o cargo.']],
     [['s','lider','Recusa','A pessoa continua sem esse registro oficial. O que ela declarou não muda.']]]],
   ['e','Registro oficial','Fica disponível para certidões e relatórios.']]}
);
function fluxosPage(){
 const f=FLW.find(x=>x.id===S.flw)||FLW[0],L=FLW.filter(x=>x.area===f.area);
 const areas=`<div class="chips flw-areas rise" style="--d:2" role="tablist" aria-label="Área">${FLW_AREAS.map(a=>`<button role="tab" class="chipf ${a[0]===f.area?'on':''}" aria-selected="${a[0]===f.area}" data-a="flwArea" data-v="${a[0]}">${a[1]}<small>${FLW.filter(x=>x.area===a[0]).length}</small></button>`).join('')}</div>`;
 const tabs=`<div class="utabs rise" style="--d:2" role="tablist">${L.map(x=>`<button role="tab" class="${x.id===f.id?'on':''}" aria-selected="${x.id===f.id}" data-a="flwTab" data-v="${x.id}">${esc(x.n)}</button>`).join('')}</div>`;
 const leg=`<div class="flw-lg rise" style="--d:2" aria-label="Quem faz cada passo">${Object.values(FLW_WHO).map(w=>`<span><i style="--c:${w[3]}"></i>${w[0]}</span>`).join('')}</div>`;
 return `<header class="ph rise"><div><p class="eb">Ajuda</p><h1>Regras e fluxos</h1><p class="lede">Como funcionam os principais processos do Alva, passo a passo e com quem faz cada coisa. Página de consulta.</p></div></header>
 ${areas}${leg}${tabs}
 <article class="flw-pg rise" style="--d:3"><header class="card flw-top"><div><h2>${esc(f.n)}${f.tag?`<span class="flw-tag">${esc(f.tag)}</span>`:''}</h2><p class="hc-lede">${esc(f.lede)}</p></div><button class="btn sec" data-a="nav" data-v="${f.go[0]}">${ic('arrowR',15,2)}${esc(f.go[1])}</button></header>
  <section class="card flw-rules"><p class="hc-eb">As regras em uma frase</p><ul>${f.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></section>
  <section class="card flw-dia"><p class="hc-eb">O fluxo</p><div class="flw">${flwSeq(f.nodes)}</div></section>
 </article>
 <p class="who rise" style="--d:4">Este é o desenho das regras definidas. Alguns pontos ainda estão em definição e algumas telas estão em construção.</p>`;
}
Object.assign(A,{flwArea:v=>{const f=FLW.find(x=>x.area===v);if(f)A.flwTab(f.id);}});

/* ---- Jobs (07/11/2026): um fluxo por job, para conferir sobreposição antes de especificar ---- */
FLW_AREAS.push(['job','Jobs']);
const flwJob=(id,n,tag,lede,rules,nodes)=>({id:'j'+id,area:'job',n,tag,go:['automacoes','Abrir Automações'],lede,rules,nodes});
const FLW_JOBS_GO=['automacoes','Abrir Automações'];
FLW.push(
 {id:'jmapa',area:'job',n:'Mapa dos jobs',tag:'Para validar',go:FLW_JOBS_GO,
  lede:'O Alva tem 15 jobs. Cada um faz uma coisa só. Esta página mostra como todo job funciona e o que foi unificado.',
  rules:['Um job é uma agenda mais uma lista de passos. Cada domínio registra o passo dele, e o Alva chama os passos igreja por igreja.','Só o superusuário liga, desliga e escolhe a recorrência. Cada execução deixa um log com os itens.','Todo passo é idempotente: rodar de novo o mesmo item não duplica o efeito. É isso que permite tentar de novo.','Reação a evento em tempo real não é job. Só entra aqui o que precisa de relógio ou de nova tentativa.'],
  nodes:[
   ['h','Como todo job funciona'],
   ['s','alva','O relógio dispara','Na recorrência do job. Uma execução por job por vez. Depois de uma parada da plataforma, roda uma vez só.'],
   ['s','alva','Chama o passo de cada domínio','Igreja por igreja, nunca misturando dados de duas igrejas. Nos jobs de aviso, antes pergunta se a igreja quer o aviso.'],
   ['s','alva','O passo faz o trabalho','Pela porta do próprio domínio. Chamada a provedor externo fica fora de qualquer transação.'],
   ['s','alva','Registra a execução','Quantos itens, quais deram certo e quais falharam. O que falhou é tentado de novo na próxima rodada.'],
   ['h','Os jobs, por tema'],
   ['f','Avisos e lembretes',[
     [['s','alva','1 · Entrega de notificações','Envia e-mail e push da fila.'],['s','alva','2 · Lembretes e compromissos','Compromissos e lembrete diário do devocional.'],['s','alva','3 · Aniversário e boas-vindas','Aniversário e boas-vindas.'],['s','alva','4 · Transmissão ao vivo','Cria os compromissos da grade das próximas 24 horas.'],['s','alva','5 · Alertas da equipe','Contas, escalas, disciplina, empréstimo, obra e pedido do app.'],['s','alva','6 · Alertas de estoque','Estoque abaixo do mínimo.']]]],
   ['f','Pagamentos e provedores',[
     [['s','alva','7 · Pagamentos','Confere e dá baixa no que o provedor não avisou.'],['s','alva','8 · Pedidos do provedor de comércio','Refaz a venda do pedido que falhou.'],['s','alva','9 · Sincronização de itens','Envia ao provedor o que mudou e, uma vez por dia, reenvia todos.'],['s','alva','10 · Conciliação de cartão','Busca as cobranças da adquirente e liga à venda.'],['s','alva','15 · Sincronização com o provedor externo','Importa, compara e registra divergências.']]]],
   ['f','Dados e segurança',[
     [['s','alva','11 · Exportação de dados e exclusão de conta','Gera o arquivo e conclui a exclusão.'],['s','alva','12 · Retenção e expurgo','Apaga o que passou do prazo.'],['s','alva','13 · Entrega durável de eventos','Reentrega o evento que um consumidor não recebeu.'],['s','alva','14 · Cadastros duplicados','Procura pares que parecem a mesma pessoa.']]]],
   ['h','Sobreposições resolvidas (Tiago, 07/11/2026)'],
   ['n','O antigo job 10 (sincronização completa) virou o modo completo do job 9: uma vez por dia o mesmo job reenvia o estado de todos os itens, e Sincronizar tudo agora é o Rodar agora desse modo.'],
   ['n','O lembrete diário do devocional saiu do job 3 e passou a ser passo do job 2, que cuida dos lembretes de horário.'],
   ['n','O job 15 não se aplica ao Totify (a API dele só recebe): para o Totify valem os jobs 8 e 9. O 15 fica para quem devolve dados, como o Zelos Kids.'],
   ['n','O antigo job 16 (encerramento de mandatos) foi retirado: mandato só se encerra à mão, pelo administrador da Secretaria; passar da data de fim não encerra nada.'],
   ['n','O job 10 agora é a conciliação de cartão, separado do job 7: o 7 diz se o pagamento foi feito; o 10 liga a cobrança da adquirente à venda e grava a taxa. Os alertas 5 e 6 seguem separados, porque não fazem a mesma coisa.']]},
  flwJob(1,'1 · Entrega de notificações','','Envia o e-mail e o push que estão na fila da Comunicação e tenta de novo o que falhou.',['A fila é da Comunicação; o job só entrega.','Roda a cada 1 minuto.','A unidade de nova tentativa é o destinatário.'],[
   ['s','alva','Lê a fila de envio','Notificações e destinatários ainda não entregues ou que falharam.'],
   ['s','ext','Envia','Pelo provedor de e-mail ou de push.'],
   ['f','Resultado por destinatário',[[['s','alva','Entregue','Marca como entregue.']],[['s','alva','Falhou','Fica para a próxima rodada.']]]],
   ['e','Fila esvaziada','Cada destinatário é tentado de novo até entregar.']]),
 flwJob(2,'2 · Lembretes e compromissos','','Calcula e dispara os lembretes dos compromissos (eventos, escalas, prazos) e o lembrete diário do devocional.',['Roda a cada 5 minutos.','Só roda para a igreja que quer receber lembretes.','A unidade é o lembrete.'],[
   ['s','alva','Pergunta se a igreja quer','Se não quer, os passos nem são chamados.'],
   ['s','alva','Calcula o que venceu','Lembretes de compromissos cujo horário chegou.'],
   ['s','alva','Dispara o lembrete diário do devocional','Na hora que cada devocional escolheu, para quem participa e tem o lembrete ligado. Passo do domínio Devocional.'],
   ['s','alva','Põe na fila de envio','Quem entrega é o job 1.'],
   ['e','Lembrete disparado','Cada lembrete dispara uma vez.']]),
 flwJob(3,'3 · Aniversário e boas-vindas','','Dispara o aniversário na hora local de cada igreja e as boas-vindas.',['Roda a cada hora e age na hora local da igreja.','As boas-vindas chegam pelo evento de pessoa integrada.','A unidade é a pessoa.'],[
   ['s','alva','Pergunta se a igreja quer','Se não quer, nada é gravado.'],
   ['f','O que dispara',[
     [['s','alva','Aniversário','Quem faz aniversário hoje, na hora local de cada igreja.']],
     [['s','alva','Boas-vindas','Quem acabou de ser integrado. O evento chega pelo job 13.']]]],
   ['s','alva','Põe na fila de envio','Quem entrega é o job 1. Uma trava impede enviar duas vezes.']]),
 flwJob(4,'4 · Transmissão ao vivo (grade)','','Transforma a grade semanal dos canais em compromissos das próximas 24 horas.',['Roda a cada hora.','Só para igrejas com o aviso de transmissão ligado.','Os compromissos criados são disparados pelo job 2.'],[
   ['s','alva','Lê a grade dos canais','Dia da semana, horário e canal.'],
   ['s','alva','Cria os compromissos das próximas 24 horas','Sem duplicar os que já existem.'],
   ['s','alva','O job 2 dispara os lembretes','Quem acompanha o canal é avisado antes da transmissão.']]),
 flwJob(5,'5 · Alertas da equipe','','Detecta o que está vencendo ou atrasado e avisa quem cuida.',['Roda a cada hora e age no horário de cada igreja (padrão 8h).','Cada domínio detecta o seu; a Comunicação entrega a pendência.','A unidade é a pendência.'],[
   ['s','alva','Pergunta se a igreja quer','Se não quer, nada é detectado.'],
   ['f','O que detecta',[
     [['s','alva','Financeiro','Contas a vencer e vencidas.'],['s','alva','Escalas','Escala próxima e ainda não aprovada.']],
     [['s','alva','Cuidado','Revisão de disciplina vencida.'],['s','alva','Almoxarifado','Empréstimo em atraso.']],
     [['s','alva','Zeladoria','Obra atrasada.'],['s','alva','Loja','Pedido do app parado.']]]],
   ['s','alva','Entrega a pendência','Aparece para quem cuida e fecha sozinha quando a causa some.']]),
 flwJob(6,'6 · Alertas de estoque','','Avisa quando o estoque de Cafeteria, Restaurante e Loja fica abaixo do mínimo.',['Roda a cada hora.','No máximo um aviso por item a cada período configurado.','O Almoxarifado não usa este job: avisa por evento, a cada baixa ou ajuste.'],[
   ['s','alva','Compara estoque com o mínimo','Item por item, em cada módulo.'],
   ['f','Resultado',[[['s','alva','Abaixo do mínimo','Abre o aviso, respeitando o intervalo entre repetições.']],[['s','alva','Voltou ao normal','Fecha o aviso sozinho.']]]]]),
 flwJob(7,'7 · Pagamentos','','Garante que todo pagamento chegue a um estado final: confere o que ficou sem aviso, dá baixa, expira o que venceu e acompanha reembolsos.',['Roda a cada 10 minutos.','É o caminho de exceção: o normal é o aviso do provedor.','Atende conectores, doações, inscrições de evento e pedidos do app.'],[
   ['s','alva','Lê os pagamentos não finalizados','Pendentes há muito tempo, aguardando aviso, ou com estorno pedido.'],
   ['s','ext','Pergunta ao provedor','Hoje o Asaas.'],
   ['f','O que faz com a resposta',[
     [['s','alva','Foi pago','Dá a baixa e avisa o dono do pagamento (inscrição, doação ou pedido).']],
     [['s','alva','Venceu sem pagar','Cancela a cobrança no provedor e expira a compra.']],
     [['s','alva','Reembolso pedido','Reenvia o estorno até o provedor confirmar.']]]]]),
 flwJob(8,'8 · Pedidos do provedor de comércio','','Refaz a venda do pedido do totem que chegou mas não virou venda no módulo.',['Roda a cada 5 minutos.','A unidade é o pedido.','Hoje o provedor é o Totify.'],[
   ['s','alva','Lê os pedidos recebidos com falha','Pedido que chegou por webhook e não virou venda.'],
   ['s','alva','Aplica o cancelamento que chegou antes','Se o aviso de cancelamento veio antes do pedido, aplica agora.'],
   ['s','alva','Refaz a venda no módulo','Cafeteria, restaurante ou loja, pelo terminal e pelo cardápio.']]),
 flwJob(9,'9 · Sincronização de itens (incremental e completa)','','Envia ao provedor os itens que mudaram no Alva (nome, preço, estoque, ativo) e, uma vez por dia, reenvia o estado de todos.',['Roda a cada 5 minutos (modo incremental).','Uma vez por dia, de madrugada, o mesmo job faz a passagem completa. O botão Sincronizar tudo agora é o Rodar agora em modo completo.','Tenta de novo com intervalo crescente, até um limite de tentativas.'],[
   ['s','alva','Lê os vínculos marcados como alterados',''],
   ['s','ext','Cria ou atualiza no provedor',''],
   ['f','Resultado',[[['s','alva','Deu certo','Limpa a marca de alterado.']],[['s','alva','Falhou','Tenta de novo mais tarde, com intervalo maior.']]]],
   ['s','ext','Uma vez por dia: passagem completa','Reenvia o estado absoluto de todos os vínculos, para corrigir o que alguém mexeu no painel do provedor. Um vínculo com falha não interrompe os outros.']]),
 flwJob(10,'10 · Conciliação de cartão','','Busca as cobranças da adquirente e as liga à venda ou à receita, gravando taxa, líquido e data prevista.',['De hora em hora, relendo os últimos 7 dias.','O motor de casamento é do Financeiro; o conector só traz as cobranças.','É um job próprio, separado do job 7 (que diz se o pagamento foi feito).'],[
   ['s','ext','Busca as cobranças','No conector da adquirente (Mercado Pago).'],
   ['s','alva','Liga cada cobrança','Pelo código de autorização, por aproximação ou como sugestão (veja Maquininha e totem).'],
   ['s','alva','Grava taxa, líquido e data prevista','A venda entra na carteira como a liberar.'],
   ['s','fin','O que sobra vai para Aprovações','Sugestões e exceções, na aba Conciliação.']]),
 flwJob(11,'11 · Exportação de dados e exclusão de conta','','Gera o arquivo de Baixar meus dados e conclui a exclusão da conta quando o arquivo está pronto.',['Roda a cada 5 minutos.','A unidade é o pedido da pessoa.','A exclusão passa por uma varredura de segurança.'],[
   ['s','pessoa','Pede os dados ou a exclusão','Pelo app ou pela web.'],
   ['s','alva','Gera o arquivo','Reúne o que cada domínio guarda dessa pessoa.'],
   ['s','alva','Entrega o arquivo','Com prazo de validade.'],
   ['s','alva','Conclui a exclusão','Só quando o arquivo está pronto e a varredura de segurança passa.']]),
 flwJob(12,'12 · Retenção e expurgo','','Expira ou apaga o que passou do prazo de guarda, com uma política por origem.',['Roda uma vez por dia, de madrugada.','Cada dono apaga o que é dele, pela porta do seu expurgo.','A unidade é a política.'],[
   ['s','alva','Percorre as políticas','Auditoria, chamadas a provedor, notificações, oração e disciplina, buscas da Ajuda, rascunhos de importação, arquivos sem uso, quadros e caixas antigos, execuções deste domínio.'],
   ['s','alva','Cada dono expurga o seu','Nome e e-mail ficam; só o dado sensível sai. A parte financeira fica pelo prazo de 5 anos.'],
   ['s','alva','Registra o que apagou','Quantos itens, por política.']]),
 flwJob(13,'13 · Entrega durável de eventos','','Reentrega aos consumidores o evento interno que não chegou (boas-vindas, exclusão de conta, auditoria).',['Roda a cada 1 minuto.','Pagamento não passa por aqui: é chamada direta, com o job 7 como rede de segurança.','A unidade é a entrega (evento e consumidor).'],[
   ['s','alva','Lê as entregas pendentes ou com falha',''],
   ['s','alva','Entrega ao consumidor','Quem estava fora do ar recebe agora.'],
   ['f','Resultado',[[['s','alva','Entregue','Marca como entregue.']],[['s','alva','Falhou','Tenta de novo e registra a tentativa.']]]]]),
 flwJob(14,'14 · Cadastros duplicados','','Procura pares de membros ativos que parecem a mesma pessoa.',['Roda uma vez por dia.','Só grava candidatos: não altera cadastro.','Nunca reabre um par que alguém já marcou como diferente.'],[
   ['s','alva','Compara os cadastros ativos','Nome parecido, telefone igual, e-mail parecido e combinações.'],
   ['s','alva','Grava os candidatos','Com pontuação e motivo.'],
   ['s','lider','A equipe decide','O banner da lista de Membros mostra os pares. Quem decide é a pessoa, não o job.']]),
 flwJob(15,'15 · Sincronização com o provedor externo','','Importa o que o provedor tem e o Alva não, compara os dois lados e registra as divergências. É também a migração inicial de quem já usa o sistema.',['Roda sob demanda e uma vez por dia.','Nunca apaga nos dois lados.','Serve ao Zelos Kids e aos provedores de comércio que permitem listar.'],[
   ['s','ext','Lê o que o provedor tem','Produtos (comércio) ou salas, turmas, programação, escalas, famílias e voluntários (Zelos Kids).'],
   ['s','alva','Compara os dois lados',''],
   ['f','O que faz',[[['s','alva','Só o provedor tem','Importa.']],[['s','alva','Só o Alva tem','Envia ao provedor.']],[['s','lider','Os dois têm, diferente','Registra a divergência para o responsável decidir.']]]],
   ['n','O Totify só recebe e não devolve, então a importação não se aplica a ele. Sobreposição a decidir com o job 10 (veja o Mapa dos jobs).']])
);

{const _ph4=placeholder;placeholder=id=>id==='fluxos'?fluxosPage():_ph4(id);}
{const _sb4=sidebar;sidebar=function(){return _sb4().replace('</nav>',()=>`<button class="ni ${S.active==='fluxos'?'on':''}" data-a="nav" data-v="fluxos" ${S.active==='fluxos'?'aria-current="page"':''}>${ic('swap',18)}Regras e fluxos</button></nav>`);};}
