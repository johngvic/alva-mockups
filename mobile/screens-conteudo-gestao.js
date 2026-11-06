/* =========================================================
   CONTEÚDO E SECRETARIA · Conteúdo, Comunicação e Secretaria
   Mesmo motor de lista compacta e ficha (screens-pessoas.js).
   ========================================================= */
LS_READY.push('conteudo','comunicacao','secretaria');
const PUB={pb:['ok','Publicado'],rs:['off','Rascunho']},PUBA=[['Publicar','pb',['rs']],['Voltar para rascunho','rs',['pb']]];
const cont=(noun,add,f1,f2,rows,p,det)=>({noun,add,fields:[['n',f1,''],['s',f2,'']],ST:PUB,acts:PUBA,rows:R(p,rows,([n,s,st])=>({n,s,st,d:det(n,s)}))});
Object.assign(LSD,{
 conteudo:{
  'Pregações':cont('pregações','Nova pregação','Título','Pregador e data',[['Identidade em Cristo','Pr. Rafael Pereira · 27 set','pb'],['A força da comunhão','Pr. Marcos Lima · 20 set','pb'],['Perseverança','Pr. Rafael Pereira · 13 set','pb'],['Esperança que não falha','Pr. Marcos Lima · 4 out','rs']],'cp',(n,s)=>[['Pregador',s.split(' · ')[0]],['Data',s.split(' · ')[1]],['Série','Fundamentos da fé']]),
  'Vídeos':cont('vídeos','Novo vídeo','Título','Duração e data',[['Culto de Domingo · 27/09','1:42:10 · 27 set','pb'],['Noite de Oração','58:20 · 23 set','pb'],['Testemunho: Casa Jardins','6:40 · 18 set','pb'],['Chamada da Conferência Anual','1:15 · 5 out','rs']],'cv',(n,s)=>[['Duração',s.split(' · ')[0]],['Data',s.split(' · ')[1]]]),
  'Músicas':cont('músicas','Nova música','Nome','Artista e tom',[['Grande é o Senhor','Ministério de Louvor · Tom D','pb'],['Tua graça me basta','Ministério de Louvor · Tom G','pb'],['Alvorada','Ministério de Louvor · Tom E','pb'],['Novo dia','Ministério de Louvor · Tom A','rs']],'cm',(n,s)=>[['Artista',s.split(' · ')[0]],['Tom',s.split(' · ')[1]]]),
  'Séries':cont('séries','Nova série','Nome da série','Episódios',[['Fundamentos da fé','6 episódios','pb'],['Casa e família','4 episódios','pb'],['Propósito','3 episódios','rs']],'cs',(n,s)=>[['Episódios',s]]),
  'Jornadas':cont('jornadas','Nova jornada','Nome da jornada','Etapas',[['Primeiros passos','5 etapas','pb'],['Vida com propósito','8 etapas','pb'],['Liderança em casa','6 etapas','rs']],'cj',(n,s)=>[['Etapas',s],['Público','Membros']]),
  'Cursos':cont('cursos','Novo curso','Nome do curso','Aulas e turma',[['Fundamentos da fé','12 aulas · aberto','pb'],['Liderança de Casa','10 aulas · aberto','pb'],['Classe de batismo','4 aulas · inscrições','pb'],['Casais','8 aulas · em preparo','rs']],'cc',(n,s)=>[['Aulas',s.split(' · ')[0]],['Situação',s.split(' · ')[1]]]),
  'Material de apoio':cont('arquivos','Novo arquivo','Nome do arquivo','Tipo e tamanho',[['Guia da Casa de Apascentamento','PDF · 1,2 MB','pb'],['Roteiro de estudo · Fundamentos','PDF · 640 KB','pb'],['Cartilha do Kids','PDF · 2,4 MB','pb'],['Planilha de escalas','XLSX · 80 KB','rs']],'cx',(n,s)=>[['Tipo',s.split(' · ')[0]],['Tamanho',s.split(' · ')[1]]])
 },
 comunicacao:{
  'Notícias':{noun:'notícias',add:'Nova notícia',fields:[['n','Título',''],['s','Resumo','']],ST:{pe:['warning','Aguardando aprovação'],pb:['ok','Publicada'],rs:['off','Rascunho']},acts:[['Aprovar e publicar','pb',['pe','rs']],['Voltar para rascunho','rs',['pb','pe']]],
   rows:R('mn',[['Conferência Anual 2026','Três noites com preletores convidados.','pe'],['Nova turma de batismo','A classe começa no domingo, 25 out.','pb'],['Horários de fim de ano','Confira a programação de dezembro.','rs']],([n,s,st])=>({n,s,st,d:[['Resumo',s],['Autor','Equipe de Comunicação']]}))},
  'Notificações':{noun:'notificações',add:'Nova notificação',fields:[['n','Título',''],['s','Público','']],ST:{ag:['info','Agendada'],en:['ok','Enviada']},acts:[['Enviar agora','en',['ag']]],
   rows:R('mt',[['Culto de domingo muda de horário','Todos os membros','ag'],['Inscrições abertas: Retiro de Jovens','Jovens','ag'],['Sua escala de domingo foi aprovada','Voluntários','en'],['Lembrete: Noite de Oração','Todos os membros','en']],([n,s,st])=>({n,s,st,d:[['Público',s],['Canais','Push e e-mail']]}))},
  'Mensagens':{noun:'conversas',add:'Nova mensagem',av:1,fields:[['n','Pessoa',''],['s','Mensagem','']],ST:{nv:['warning','Nova'],rs:['ok','Respondida']},acts:[['Marcar como respondida','rs',['nv']]],
   rows:R('mm',[['Carlos Mendes','Qual o horário do culto de jovens?','nv'],['Luana Souza','Como faço para entrar em uma casa?','nv'],['Paulo Alves','Obrigado pelo acolhimento!','rs']],([n,s,st])=>({n,s,st,d:[['Mensagem',s],['Canal','WhatsApp']]}))},
  'Banners':{noun:'banners',add:'Novo banner',fields:[['n','Título',''],['s','Destino','']],ST:{at:['ok','No ar'],pa:['off','Pausado']},acts:[['Pausar','pa',['at']],['Colocar no ar','at',['pa']]],
   rows:R('mb',[['Conferência Anual 2026','Abre o evento','at'],['Batismo nas Águas','Abre a inscrição','at'],['Retiro de Jovens','Abre o evento','pa']],([n,s,st])=>({n,s,st,d:[['Destino',s],['Posição','Início do app']]}))},
  'Transmissões':{noun:'transmissões',add:'Nova transmissão',fields:[['n','Título',''],['s','Dia e horário','']],ST:{ag:['info','Agendada'],vi:['danger','Ao vivo'],en:['off','Encerrada']},acts:[['Iniciar transmissão','vi',['ag']],['Encerrar','en',['vi']]],
   rows:R('mx',[['Culto de Celebração','Dom, 4 out · 18h30','ag'],['Noite de Oração','Qua, 30 set · 20h','en'],['Culto de Domingo','Dom, 27 set · 18h30','en']],([n,s,st])=>({n,s,st,d:[['Quando',s],['Plataforma','YouTube']]}))}
 },
 secretaria:{
  'Atendimentos':{noun:'atendimentos',add:'Novo atendimento',av:1,fields:[['n','Pessoa',''],['s','Assunto','']],ST:{ab:['warning','Aberto'],an:['info','Em andamento'],co:['ok','Concluído']},acts:[['Assumir atendimento','an',['ab']],['Concluir','co',['ab','an']]],
   rows:R('sa',[['Camila Pereira','Atualizar endereço no cadastro','ab'],['Lucas Pereira','Segunda via da carteirinha','an'],['Marina Lopes','Transferência de igreja','ab'],['Otávio Braga','Dúvida sobre batismo','co']],([n,s,st])=>({n,s,st,d:[['Assunto',s],['Canal','App']]}))},
  'Documentos':{noun:'documentos',add:'Novo documento',av:1,fields:[['n','Pessoa',''],['s','Documento','']],ST:{ae:['warning','A emitir'],em:['ok','Emitido']},acts:[['Marcar como emitido','em',['ae']]],
   rows:R('sd',[['Rafael Pereira','Declaração de membro','ae'],['Ana Costa','Carta de recomendação','ae'],['Marcos Lima','Certificado de batismo','em'],['Juliana Reis','Declaração de membro','em']],([n,s,st])=>({n,s,st,d:[['Documento',s],['Assinatura','Pr. Rafael Pereira']]}))}
 }
});
