/* ---------- data ---------- */
const TODAY={y:2026,m:9,d:29};
const MONTHS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const MON3=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const WD=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const ROLES={visitante:['Visitante','damasco'],membro:['Membro','ceu'],lider:['Líder','menta'],admin:['Administrador','brasa']};
const USERS={
 'renan.ferreira@email.com':{first:'Renan',name:'Renan Ferreira',role:'membro'},
 'giovanna.martins@email.com':{first:'Giovanna',name:'Giovanna Martins',role:'lider'},
 'carlos.andrade@email.com':{first:'Carlos',name:'Carlos Andrade',role:'admin'}
};
const CHURCHES=[
 {id:'sede',name:'Alva Sede',city:'São Paulo, SP',members:'1.240',tone:'brasa'},
 {id:'alpha',name:'Alva Alphaville',city:'Barueri, SP',members:'380',tone:'menta'},
 {id:'camp',name:'Alva Campinas',city:'Campinas, SP',members:'210',tone:'ceu'}
];
const DESC={
 Culto:'Um culto para toda a família, com louvor, Palavra e ceia no primeiro domingo do mês. Chegue 15 minutos antes para garantir lugar.',
 'Casas':'Encontro semanal na casa de uma família da igreja: estudo da Palavra, oração e um café no final.',
 'Liderança':'Alinhamento mensal dos líderes de Casa e de ministério. Traga seu relatório do mês.',
 'Oração':'Uma noite inteira dedicada à oração pela igreja, pelas famílias e pela cidade.',
 Jovens:'O culto dos jovens: banda ao vivo, mensagem e muito tempo junto depois.',
 'Conferência':'Três noites com preletores convidados, louvor e ministração. Tema deste ano: Seja da Partida.',
 Batismo:'Celebração de batismo nas águas para quem concluiu a classe de batismo.'
};
const EVENTS=[
 {id:'e1',y:2026,m:9,d:20,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:212},
 {id:'e2',y:2026,m:9,d:23,t:'Casa Jardins',h:'19h30',p:'Casa da Ana Costa',cat:'Casas',tone:'menta',g:'mar',n:14},
 {id:'e3',y:2026,m:9,d:24,t:'Reunião de Líderes',h:'20h',p:'Sala 3',cat:'Liderança',tone:'oceano',g:'mar',n:38},
 {id:'e4',y:2026,m:9,d:27,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:236},
 {id:'e5',y:2026,m:9,d:28,t:'Noite de Oração',h:'20h',p:'Capela',cat:'Oração',tone:'vinho',g:'vinho',n:54},
 {id:'e6',y:2026,m:9,d:30,t:'Casa Jardins',h:'19h30',p:'Casa da Ana Costa',cat:'Casas',tone:'menta',g:'mar',n:14},
 {id:'e7',y:2026,m:10,d:1,t:'Treinamento de Líderes',h:'20h',p:'Sala 3',cat:'Liderança',tone:'oceano',g:'mar',n:41},
 {id:'e8',y:2026,m:10,d:3,t:'Culto de Jovens',h:'19h30',p:'Templo Sede',cat:'Jovens',tone:'lima',g:'lima',n:128},
 {id:'e9',y:2026,m:10,d:4,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:198},
 {id:'e10',y:2026,m:10,d:11,t:'Culto de Celebração',h:'18h30',p:'Templo Sede',cat:'Culto',tone:'brasa',g:'aurora',n:120},
 {id:'e11',y:2026,m:10,d:18,t:'Conferência Anual 2026',h:'19h',p:'Templo Sede',cat:'Conferência',tone:'laranja',g:'brasa',n:640,range:'18 a 20 de outubro',sign:true},
 {id:'e12',y:2026,m:10,d:25,t:'Batismo nas Águas',h:'10h',p:'Templo Sede',cat:'Batismo',tone:'ceu',g:'mar',n:32,sign:true}
];
const evKey=e=>e.y*10000+e.m*100+e.d;
const todayKey=TODAY.y*10000+TODAY.m*100+TODAY.d;
const dow=(y,m,d)=>new Date(y,m-1,d).getDay();
const CASAS=[
 {id:'g1',tags:[],t:'Casa Jardins',day:'Quarta-feira',h:'19h30',km:'1,2',n:14,open:true,leader:'Ana e Paulo Costa',addr:'Rua das Acácias, 120 · Jardins'},
 {id:'g2',tags:['Homens'],t:'Casa Centro',day:'Quinta-feira',h:'20h',km:'3,4',n:9,open:true,leader:'Marcos Lima',addr:'Av. São João, 800 · Centro'},
 {id:'g3',tags:['Mulheres'],t:'Casa Pinheiros',day:'Sexta-feira',h:'19h',km:'2,8',n:11,open:false,leader:'Juliana Reis',addr:'Rua dos Pinheiros, 455 · Pinheiros'},
 {id:'g4',tags:['Connect','Jovens'],t:'Casa Jovens SP',day:'Terça-feira',h:'20h30',km:'4,1',n:18,open:true,leader:'Davi Melo',addr:'Rua Augusta, 1500 · Consolação'}
];
const MINIS=[
 {id:'m1',t:'Jovens e Adolescentes',s:'Encontros de 12 a 29 anos',tone:'lima',i:'sparkle',d:'Sábado à noite a Alva vira ponto de encontro: louvor alto, mensagem direta e muita conversa depois. Aqui se serve em tudo, da banda ao lanche.',when:'Sábados · 19h30',lead:'Davi e Bia Melo',n:42,need:['Ter entre 18 e 35 anos para servir na equipe','Participar do encontro de líderes às quintas']},
 {id:'m2',t:'Eventos',s:'Conferências, retiros e celebrações',tone:'laranja',i:'ticket',d:'Da primeira reunião de pauta ao último cabo recolhido. É a equipe que transforma uma ideia em uma noite que ninguém esquece.',when:'Conforme a agenda · 4 a 6 eventos por ano',lead:'Marina Castro',n:28,need:['Disponibilidade em fins de semana de evento','Gostar de planilha tanto quanto de gente']},
 {id:'m3',t:'Homens',s:'Discipulado e comunhão masculina',tone:'oceano',i:'shield',d:'Café da manhã, Bíblia aberta e conversa franca sobre trabalho, família e fé. Um lugar para ser forte sem precisar fingir.',when:'1º sábado do mês · 8h',lead:'Paulo Costa',n:15,need:['Ser membro da Alva','Topar acordar cedo uma vez por mês']},
 {id:'m4',t:'Cafeteria',s:'O café de antes e depois do culto',tone:'damasco',i:'coffee',d:'O cheiro de café é a primeira boa-vinda de muita gente. A equipe cuida do balcão, do cardápio e daquela conversa que começa com um "tudo bem?".',when:'Domingos · a partir das 17h',lead:'Juliana Reis',n:18,need:['Curso rápido de boas práticas (2h)','Uma escala a cada 3 semanas']},
 {id:'m5',t:'Zeladoria',s:'Cuidado com o templo e as salas',tone:'salvia',i:'bucket',d:'Lâmpada queimada, cadeira bamba, jardim pedindo água: a Zeladoria resolve antes que alguém perceba. Serviço silencioso que deixa a casa pronta.',when:'Sábados · 9h às 12h',lead:'Seu Antônio Prado',n:9,need:['Jeito para pequenos reparos ajuda, mas não é obrigatório']},
 {id:'m6',t:'Cozinha',s:'Refeições de eventos e confraternizações',tone:'ambar',i:'chef',d:'Almoço do retiro, jantar dos casais, bolo do aniversariante do mês. Onde tem mesa farta na Alva, tem essa equipe por trás.',when:'Eventos e 3º domingo do mês',lead:'Dona Célia Nunes',n:14,need:['Carteirinha de manipulação de alimentos (a igreja custeia)']},
 {id:'m7',t:'Voluntariado',s:'Banco de voluntários para toda a igreja',tone:'rosado',i:'heart',d:'Ainda não sabe onde servir? Comece aqui. Você entra no banco de voluntários e é chamado para ajudar onde falta gente, conhecendo vários ministérios.',when:'Quando você puder',lead:'Larissa Martins',n:63,need:['Nenhum. Só vontade de ajudar']},
 {id:'m8',t:'Louvor',s:'Banda, vocal e técnica de som',tone:'ceu',i:'music',d:'Mais do que tocar bem, conduzir a igreja para perto de Deus. Ensaios semanais, devocional em equipe e escala em rodízio.',when:'Ensaios às quintas · 20h',lead:'Davi Melo',n:24,need:['Audição com a liderança','Compromisso com os ensaios']},
 {id:'m9',t:'Ceia',s:'Preparo e serviço da Santa Ceia',tone:'vinho',i:'wine',d:'Pão partido e cálice servido com reverência. A equipe prepara os elementos, organiza a distribuição e cuida para que ninguém fique de fora.',when:'1º domingo do mês',lead:'Diac. Ana Costa',n:12,need:['Ser membro batizado','Participar do treinamento de 1 hora']},
 {id:'m10',t:'Integração',s:'Acompanhar quem acabou de chegar',tone:'menta',i:'userplus',d:'Quem visita pela primeira vez ganha um rosto conhecido. A Integração liga, convida para um café e ajuda a encontrar uma Casa de Apascentamento.',when:'Domingos e mensagens durante a semana',lead:'Gabriela Nunes',n:20,need:['Gostar de conversar','Uma ligação por semana, em média']},
 {id:'m11',t:'Secretariado',s:'Cadastros, documentos e atendimento',tone:'petroleo',i:'clipboard',d:'Declarações, cadastros de famílias, agenda do pastor. É o ministério que mantém tudo em ordem para que o resto possa acontecer.',when:'Seg a sex · turnos de 4h',lead:'Fernanda Lima',n:6,need:['Familiaridade com computador','Sigilo com dados pessoais']},
 {id:'m12',t:'Social',s:'Cestas, visitas e mutirões',tone:'salvia',i:'care',d:'Cestas básicas todo mês, visitas a quem está sozinho e mutirões nos bairros vizinhos. Fé que se traduz em arroz, feijão e presença.',when:'2º sábado do mês · 8h',lead:'Heitor Alves',n:37,need:['Nenhum requisito prévio']},
 {id:'m13',t:'Infantil',s:'Ensino para crianças de 0 a 11 anos',tone:'ambar',i:'baby',d:'Histórias bíblicas contadas com massinha, música e muita paciência. Enquanto os pais participam do culto, as crianças aprendem do jeito delas.',when:'Domingos · 9h e 18h30',lead:'Carla Reis',n:31,need:['Checagem de antecedentes (exigida por lei)','Treinamento de proteção infantil']},
 {id:'m14',t:'Mídia',s:'Fotos, vídeos, transmissão e redes sociais',tone:'ceu',i:'camera',d:'Câmera na mão, transmissão no ar e post publicado antes de o culto acabar. A equipe conta a história da Alva para quem está longe.',when:'Domingos + produção durante a semana',lead:'Otávio Ribeiro',n:19,need:['Portfólio ou vontade de aprender','Notebook ajuda na edição']},
 {id:'m15',t:'Livraria',s:'Bíblias, livros e materiais',tone:'oceano',i:'library',d:'Uma estante bem escolhida pode mudar uma vida. A Livraria indica leituras, cuida do estoque e atende antes e depois dos cultos.',when:'Domingos · 17h às 21h',lead:'Mateus Oliveira',n:8,need:['Gostar de ler e de recomendar livros']},
 {id:'m16',t:'Novos Começos',s:'Recuperação e recomeço',tone:'lima',i:'sprout',d:'Grupos de apoio para quem está atravessando um luto, um divórcio ou qualquer recomeço. Ninguém precisa recomeçar sozinho.',when:'Terças · 20h',lead:'Pr. Marcos Lima',n:11,need:['Formação de facilitador (4 encontros)']},
 {id:'m17',t:'Libras',s:'Interpretação para a comunidade surda',tone:'petroleo',i:'hand',d:'Cada louvor e cada mensagem traduzidos em Libras, ao vivo. A equipe também ensina o básico para quem quer acolher melhor.',when:'Domingos · culto das 18h30',lead:'Paula Mendes',n:7,need:['Fluência em Libras para intérprete','Curso básico para apoio']},
 {id:'m18',t:'Estacionamento',s:'Orientar a chegada e a saída',tone:'damasco',i:'car',d:'O primeiro sorriso muitas vezes é de colete refletivo. A equipe organiza as vagas, ajuda idosos e mantém o trânsito fluindo nos dias de culto.',when:'Domingos · 17h30 às 19h',lead:'Felipe Costa',n:16,need:['Chegar 1 hora antes do culto']},
 {id:'m19',t:'Recepção',s:'Acolher quem chega aos cultos',tone:'rosado',i:'door',d:'Bom dia na porta, lugar guardado para quem chegou atrasado, um mapa mental de onde fica cada sala. Recepção é hospitalidade em pé.',when:'Domingos · escala mensal',lead:'Juliana Reis',n:26,need:['Pontualidade','Um sorriso fácil']},
 {id:'m20',t:'Casa de Apascentamento',s:'Liderar ou hospedar uma Casa',tone:'menta',i:'home',d:'Abrir a casa, preparar o estudo e cuidar de perto de algumas famílias. É o coração pastoral da Alva, distribuído pelos bairros.',when:'Um encontro semanal + reunião mensal de líderes',lead:'Ana e Paulo Costa',n:48,need:['Ser membro há pelo menos 1 ano','Curso de liderança de Casas']}
];
const COURSES={
 fund:{id:'fund',t:'Fundamentos da Fé',cat:'Discipulado',g:'mar',done:9,lessons:['Por que acreditar em Deus?','A fé como resposta pessoal','Fé e obras','Como a Bíblia foi formada','Interpretando as Escrituras','A Bíblia no dia a dia','Memorização e meditação','O que é oração','Oração e jejum','Oração em comunidade','Vivendo em igreja','Enviados ao mundo'],started:true},
 oracao:{id:'oracao',t:'Vida de Oração',cat:'Crescimento espiritual',g:'lima',done:3,lessons:['Por que orar','O Pai Nosso','Oração e Escritura','Intercessão','Oração em família','Uma vida de oração'],started:true},
 lider:{id:'lider',t:'Liderança Cristã',cat:'Formação de líderes',g:'vinho',done:0,lessons:['O chamado para liderar','Caráter antes de função','Servir como Jesus','Liderando pessoas','Comunicação','Conflitos','Formando novos líderes','Rotina e descanso','Liderança em equipe','Legado'],started:false},
 evang:{id:'evang',t:'Evangelismo na Prática',cat:'Missões',g:'brasa',done:0,lessons:['O que é o evangelho','Sua história com Deus','Conversas que abrem portas','Evangelho em casa','No trabalho','Na cidade','Discipulando novos convertidos','Enviados'],started:false}
};
const LESSON_INFO={
 'Oração em comunidade':{d:'O valor de orar junto com outros irmãos e como pequenos grupos de oração fortalecem a caminhada de todos.',v:'Porque onde dois ou três estiverem reunidos em meu nome, aí estou eu no meio deles.',r:'Mateus 18:20'},
 'Vivendo em igreja':{d:'A igreja como família: pertencer, servir e ser cuidado. Por que ninguém foi feito para caminhar sozinho.',v:'E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações.',r:'Atos 2:42'},
 'Enviados ao mundo':{d:'Encerrando a jornada: como viver a fé fora das paredes da igreja, no trabalho, em casa e na cidade.',v:'Portanto, ide, ensinai todas as nações.',r:'Mateus 28:19'}
};
const lessonInfo=t=>LESSON_INFO[t]||{d:'Nesta aula você vai estudar o tema com base nas Escrituras e terminar com uma aplicação prática para a semana.',v:'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.',r:'Salmos 119:105'};

/* ---------- state ---------- */
const S={
 screen:'welcome',hist:[],theme:'noite',role:'membro',
 user:{first:'Rafael',name:'Rafael Pereira'},church:null,
 email:'',otpCtx:'login',scn:'found',lookupMode:'email',prefill:null,su:{email:'',sel:0,att:5,expAt:0},
 ag:{y:2026,m:9,sel:29,tab:'Eventos'},
 escalas:[{id:'s1',min:'Louvor',area:'Ministério de Louvor',fn:'Vocal',y:2026,m:10,d:4,h:'18h30',st:'confirmado'},{id:'s2',min:'Recepção',area:'Recepção e Acolhimento',fn:'Recepcionista',y:2026,m:10,d:11,h:'17h30',st:'pendente'},{id:'s3',min:'Infantil',area:'Ministério Infantil',fn:'Monitor',y:2026,m:10,d:18,h:'9h',st:'pendente'},{id:'s4',min:'Louvor',area:'Ministério de Louvor',fn:'Vocal',y:2026,m:10,d:25,h:'18h30',st:'pendente',over:true,why:'Faltou vocal para o culto da noite'}],
 lim:{church:3,pref:null},
 discs:[{id:'d1',who:'Gabriel Souza',tone:'ceu',theme:'Identidade em Cristo',y:2026,m:10,d:1,h:'18h30',place:'Sala 3, Igreja',remote:false,st:'pendente'},{id:'d2',who:'Isabela Rocha',tone:'rosado',theme:'Serviço e doação',y:2026,m:10,d:2,h:'9h',place:'Remoto',remote:true,st:'aceito'},{id:'d3',who:'Fernanda Lima',tone:'lima',theme:'Multiplicação',y:2026,m:10,d:6,h:'19h',place:'Café Central',remote:false,st:'pendente'}],
 blocks:[],
 gr:{tab:'Casas',q:''},cu:{tab:'andamento',open:'fund',view:null,playing:false},
 rsvp:{},joined:{},serving:{},notif:{Eventos:true,Escalas:true,'Pedidos de oração':true,Cursos:false,'Avisos gerais':true,'Mensagens de líderes':true},nch:{Push:true,'E-mail':false,WhatsApp:true},quiet:true
};
const K=(y,m,d)=>y*10000+m*100+d;const KD=k=>({y:Math.floor(k/10000),m:Math.floor(k/100)%100,d:k%100});
const kDate=k=>{const o=KD(k);return new Date(o.y,o.m-1,o.d);};
const fmtK=k=>{const o=KD(k);return WD[dow(o.y,o.m,o.d)]+', '+o.d+' '+MONTHS[o.m-1].slice(0,3);};
const daysBetween=(a,b)=>Math.round((kDate(b)-kDate(a))/864e5)+1;
const blockedAt=k=>S.blocks.find(b=>k>=b.a&&k<=b.b);
const initials=n=>n.split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase();
/* Foto no lugar das iniciais (melhoria 1, 04/11/2026): com foto mostra a foto; sem foto, as iniciais coloridas de sempre. */
const _hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const _MASC=new Set(['Rafael','Marcos','Rodrigo','Diego','André','Renan','Thiago','Ricardo','Bruno','Carlos','Felipe','Gabriel','Henrique','Rogério']);
const _SKIN=['#F6D5BC','#EBBE98','#D9A074','#BC8159','#8F5B3C','#613B27'],_HAIR=['#1c1713','#3b2a1d','#6a4426','#9b5a2e','#caa23a','#8a8a8a'],_BG=['#DCEBFA','#DDF3E7','#FBE6D2','#F9DDE5','#EAF3CF','#E1E8EE'],_SHIRT=['#2F6FB5','#2E8B6E','#C46A2D','#B84A6A','#6E8F2E','#5A6B7A'];
const _AVC={};
const avatarUri=n=>_AVC[n]||(_AVC[n]=(()=>{const h=_hs(n),m=_MASC.has(n.split(' ')[0]),sk=_SKIN[h%6],hr=_HAIR[(h>>>3)%6],bg=_BG[(h>>>5)%6],sh=_SHIRT[(h>>>7)%6],st=(m?['short','short','bald','curly']:['long','bun','curly','long'])[(h>>>9)%4],beard=m&&st!=='curly'&&(h>>>11)%3===0;
 const back=st==='long'?`<path d="M16 36c0-15 6-24 16-24s16 9 16 24v16H16z" fill="${hr}"/>`:'';
 const front=st==='short'||st==='long'||st==='bun'?`<path d="M20.5 29c0-9 5-14.5 11.5-14.5S43.5 20 43.5 29c-3-4.5-6.5-6.5-11.5-6.5S23.5 24.5 20.5 29z" fill="${hr}"/>`:st==='curly'?[[22,23],[27,18],[33,17],[39,19],[43,24],[32,21]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${hr}"/>`).join(''):'';
 const bun=st==='bun'?`<circle cx="32" cy="12.5" r="5" fill="${hr}"/>`:'';
 const bd=beard?`<path d="M21.5 31c0 9 4.5 13 10.5 13s10.5-4 10.5-13c-2 5-5 7-10.5 7s-8.5-2-10.5-7z" fill="${hr}"/>`:'';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${bg}"/>${back}<path d="M8 64c0-12 10-18 24-18s24 6 24 18z" fill="${sh}"/><rect x="28" y="40" width="8" height="9" fill="${sk}"/><ellipse cx="32" cy="30" rx="11" ry="13" fill="${sk}"/>${front}${bun}${bd}<circle cx="27.5" cy="30" r="1.3" fill="#2a2018"/><circle cx="36.5" cy="30" r="1.3" fill="#2a2018"/><path d="M28.5 36q3.5 3 7 0" stroke="#7a3b2a" fill="none" stroke-width="1.4" stroke-linecap="round"/></svg>`;
 return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);})());
/* Quem tem retrato de exemplo: pastores, supervisores, líderes de casa e de ministério e alguns membros comuns. */
const FOTOS_EX=new Set(['Rafael Pereira','Ana Costa','Marcos Lima','Daniela Rocha','Rodrigo Alves','Camila Duarte','Diego Martins','André Rocha','Fernanda Alves Melo','Renan Ferreira','Larissa Pinto Rocha','Thiago Mendes','Isabela Rocha','Ricardo Santos','Camila Sousa','Bruno Carvalho','Mônica Souza','Ana Clara Lima','Cláudia Ferraz','Carlos Eduardo Silva','Marina Costa','Patrícia Lima','Beatriz Martins Silva','Juliana Costa Ferreira','Bruno Reis','Helena Duarte','Felipe Andrade','Gabriel Souza','Elisa Moura','Diego Faria','Clara Nunes','Fernanda Lima','Lucas Pereira']);
const _phName=n=>String(n||'').replace(/^(Pr\.|Pra\.|Diác\.|Diac\.)\s+/,'').trim();
const photoOf=n=>{const k=_phName(n),m=typeof MEMBERS!=='undefined'?MEMBERS.find(x=>x.n===k):null;if(m&&m.photo!==undefined)return m.photo;return FOTOS_EX.has(k)?avatarUri(k):'';};
const pavM=(name,toneName,cls='',extra='')=>{const ph=photoOf(name);return ph?`<span class="avatar ${cls}" style="${extra}"><img src="${ph}" alt=""></span>`:`<span class="avatar ${cls}" style="${tone(toneName)};${extra}">${initials(_phName(name))}</span>`;};

