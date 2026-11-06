/* ---------- Acesso: visões (Membro / Gestão) e nível por módulo ----------
   Mesma regra do web: papel único por pessoa (ADR-0012) + acesso por área; vale o maior.
   Nível por módulo: 0 Nenhum (oculto) · 1 Ver · 2 Editar (cria e edita) · 3 Admin da área (exclui e gere acessos). */
Object.assign(I,{
 building:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
 box:'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
 megaphone:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
 layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
 wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
 bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
 file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'
});
const VENDAS=['Visão geral','Itens','Categorias','Vendas','Caixa diário','Movimentações'];
/* [id, nome, ícone, tom, fase do protótipo, seções] */
const GMODS=[
 ['pessoas','Pessoas','users','ceu',3,['Membros','Integração']],
 ['cuidado','Cuidado','heart','rosado',3,['Discipulado','Acompanhamento','Pedidos de oração']],
 ['comunidade','Comunidade','home','menta',3,['Casas de Apascentamento','Redes de casa','Ministérios']],
 ['kids','Kids','baby','ambar',3,['Visão geral','Salas','Times','Planejamento','Escalas','Turmas']],
 ['agenda','Agenda','calendar','laranja',4,['Eventos','Cultos','Apresentações','Batismos','Consagrações','Casamentos','Integrações','Calendário','Escalas','Inscrições']],
 ['espacos','Espaços','building','salvia',4,['Salas','Reservas']],
 ['zeladoria','Zeladoria','bucket','salvia',4,['Chamados','Rotinas']],
 ['almox','Almoxarifado','box','damasco',4,['Visão geral','Itens','Categorias','Empréstimos','Devoluções','Movimentações']],
 ['shop','Loja','bag','lima',2,VENDAS],
 ['cafe','Cafeteria','coffee','brasa',2,VENDAS],
 ['rest','Restaurante','chef','vinho',2,VENDAS],
 ['conteudo','Conteúdo','layers','oceano',5,['Pregações','Vídeos','Músicas','Séries','Jornadas','Cursos','Material de apoio']],
 ['comunicacao','Comunicação','megaphone','laranja',5,['Notícias','Notificações','Mensagens','Banners','Transmissões']],
 ['secretaria','Secretaria','file','ceu',5,['Atendimentos','Documentos']],
 ['financeiro','Financeiro','wallet','petroleo',6,['Visão geral','Lançamentos','Contas financeiras','Contas a pagar','Contas a receber','Caixas e vendas','Aprovações','DRE','Informe anual','Importar e conciliar','Doações','Plano de contas','Centros de custo','Contatos','Contador','Fechamentos','Mensagens']],
 ['admin','Administração','shield','brasa',6,['Usuários e permissões','Papéis e matriz','Visitantes','Multi-igreja']]
];
const gMod=id=>GMODS.find(m=>m[0]===id);
const GPEND={pessoas:[['Pedidos de integração',3],['Cadastros a revisar',2]],cuidado:[['Pedidos de oração aguardando',4]],kids:[['Check-ins sem responsável',1]],agenda:[['Escalas sem resposta',6],['Inscrições a aprovar',2]],espacos:[['Reservas a aprovar',2]],almox:[['Devoluções atrasadas',3]],zeladoria:[['Chamados abertos',2]],shop:[['Pedidos a separar',5]],cafe:[['Pedidos a separar',4],['Caixa a fechar',1]],rest:[['Caixa a fechar',1]],conteudo:[['Rascunhos para revisar',3]],comunicacao:[['Notícias para aprovar',1]],secretaria:[['Declarações a emitir',3]],financeiro:[['Contas a pagar esta semana',5],['Aprovações',2]],admin:[['Convites de acesso',2]]};
/* Casos de teste do protótipo: Administrador = tudo em Admin; Líder = um módulo (nível escolhido na lateral). */
Object.assign(S,{view:'membro',gl:{mod:'cafe',lvl:3},gmod:null,gsec:null,gtab:0});
const lvlOf=id=>S.role==='admin'?3:S.role==='lider'&&S.gl.mod===id?S.gl.lvl:0;
const CAN={ver:1,criar:2,editar:2,excluir:3,acessos:3};
const can=(id,act)=>lvlOf(id)>=CAN[act];
const visibleMods=()=>GMODS.filter(m=>lvlOf(m[0])>0);
const canGestao=()=>visibleMods().length>0;
const gPendOf=id=>lvlOf(id)>=2?(GPEND[id]||[]):[];
const gPendTotal=()=>visibleMods().reduce((n,m)=>n+gPendOf(m[0]).reduce((a,p)=>a+p[1],0),0);
const LVLTAG=['','Ver','Editar','Admin da área'];
