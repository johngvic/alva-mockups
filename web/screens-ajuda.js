/* ================= Central de ajuda ================= */
/* Guia do Alva Web por módulo, com perguntas já respondidas e busca. O conteúdo é do produto (a igreja não edita) e segue o que o sistema faz hoje.
   Cada pergunta: [pergunta, resposta, palavras-chave]. "go" leva para a área no sistema. */
const AJ=[
 {id:'dash',n:'Dashboard',ic:'dawn',go:'hoje',lede:'A tela inicial: o que pede a sua atenção hoje.',f:[
  ['O que aparece em “Precisa da sua atenção”?','O que está esperando por você: pessoas aguardando o primeiro contato, escalas sem resposta e as suas tarefas que vencem em até 7 dias. Cada card tem a ação direta, como Acolher agora ou Lembrar.','atenção cards pendências início'],
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
  ['Quem vê a Disciplina?','Só quem tem a permissão própria: de início, o Administrador; a igreja concede aos demais. O registro é invisível ao membro e às buscas, e todo acesso é auditado. Afastamento e desligamento chegam à Secretaria como um pendente para confirmar, sem a observação. Afastamento e desligamento chegam à Secretaria como um pendente para confirmar, sem a observação.','disciplina admoestação afastamento restrito'],
  ['Quem vê o “Como estou me sentindo”?','Apenas quem tem acesso ao módulo Como estou me sentindo (pastores, pelos papéis). Para os demais, a página mostra que não há acesso.','sentimento como estou me sentindo']]},
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
  ['Use o botão do próprio card para agir: **Acolher agora**, **Lembrar os 4** ou **Abrir escalas**.'],
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

