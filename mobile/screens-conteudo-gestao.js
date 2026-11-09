/* =========================================================
   CONTEÚDO E SECRETARIA · Conteúdo, Comunicação e Secretaria
   Mesmo motor de lista compacta e ficha (screens-pessoas.js). Conteúdo: ver o bloco no fim do arquivo.
   ========================================================= */
LS_READY.push('conteudo','comunicacao','secretaria');

/* ===== Conteúdo no app administrativo (Tiago, 08/11/2026) =====
 * Status da spec: Ativo / Inativo (não existe Publicado/Rascunho). Visibilidade: Pública, Interna ou Restrita ao ministério dono.
 * O app consulta a biblioteca e modera: progresso (quem iniciou e concluiu), comentários (apagar), usos, trilha e certificados em leitura,
 * e Inativar / Reativar. Cadastro, edição, arquivos, visibilidade e dono, montar trilha e aulas ficam na web. */
const CN_VIS={pub:'Pública',int:'Interna',res:'Restrita'};
let _cnN=0;
function cnMk(o){const r=Object.assign({id:'cn'+(++_cnN),st:'at',vis:'int',own:'',sub:'',det:[],ini:0,conc:0,files:0,coms:[],usos:[],trail:null,trailT:'',cert:false,inJ:false,prog:null},o);
 Object.defineProperties(r,{
  s:{get(){return [r.sub,CN_VIS[r.vis]+(r.own?' · '+r.own:'')].filter(Boolean).join(' · ')},enumerable:true},
  d:{get(){return [...r.det,['Visibilidade',CN_VIS[r.vis]],['Ministério dono',r.own||'—'],['Arquivos',String(r.files)],['Situação',r.st==='at'?'Ativo':'Inativo']];},enumerable:true}});
 return r;}
const cnC=(a,t,w)=>[a,t,w];
const cnComs=[cnC('Larissa Campos','Amém! Palavra que ficou no coração.','há 2 dias'),cnC('Murilo Santos','Pode compartilhar o material desta mensagem?','há 4 dias'),cnC('Visitante','Conteúdo ofensivo, apaguem isso.','ontem')];
/* progresso: quem iniciou e quem concluiu (nomes de membros integrados, geradas na primeira consulta) */
function cnProg(r){if(!r.prog){const pool=dvgInt(),n=Math.min(r.ini,12);r.prog=Array.from({length:n},(_,i)=>[pool[(i*3+r.id.length)%pool.length],i<Math.round(n*(r.conc/Math.max(1,r.ini)))?'co':'in']);}return r.prog;}
const cnPregs=[
 cnMk({n:'Identidade em Cristo',sub:'Pr. Rafael Pereira',det:[['Pregador','Pr. Rafael Pereira'],['Data','27 set'],['Duração','42:10'],['Referência','Efésios 1'],['Série','Fundamentos da fé']],vis:'pub',ini:128,conc:96,files:2,coms:cnComs,usos:[['Séries','Fundamentos da fé'],['Encontros','Casa Jardins · 4 out']]}),
 cnMk({n:'A força da comunhão',sub:'Pr. Marcos Lima',det:[['Pregador','Pr. Marcos Lima'],['Data','20 set'],['Duração','38:05'],['Referência','Atos 2'],['Série','Fundamentos da fé']],vis:'int',ini:97,conc:71,files:1,coms:cnComs.slice(0,1),usos:[['Séries','Fundamentos da fé']]}),
 cnMk({n:'Perseverança',sub:'Pr. Rafael Pereira',det:[['Pregador','Pr. Rafael Pereira'],['Data','13 set'],['Duração','44:30'],['Referência','Tiago 1']],vis:'pub',ini:84,conc:60,files:1}),
 cnMk({n:'Esperança que não falha',sub:'Pr. Marcos Lima',det:[['Pregador','Pr. Marcos Lima'],['Data','4 out'],['Duração','40:00'],['Referência','Romanos 5']],vis:'int',st:'in',ini:12,conc:8})];
const cnVids=[
 cnMk({n:'Culto de Domingo · 27/09',sub:'1:42:10',det:[['Duração','1:42:10'],['Data','27 set'],['Link','youtube.com']],vis:'pub',ini:210,conc:150,coms:cnComs.slice(0,2)}),
 cnMk({n:'Noite de Oração',sub:'58:20',det:[['Duração','58:20'],['Data','23 set'],['Link','youtube.com']],vis:'pub',ini:73,conc:41}),
 cnMk({n:'Testemunho: Casa Jardins',sub:'6:40',det:[['Duração','6:40'],['Data','18 set'],['Link','youtube.com']],vis:'int',ini:45,conc:40,usos:[['Encontros','Casa Jardins']]}),
 cnMk({n:'Chamada da Conferência Anual',sub:'1:15',det:[['Duração','1:15'],['Data','5 out'],['Link','youtube.com']],vis:'pub',st:'in',ini:9,conc:9})];
const cnSongs=[
 cnMk({n:'Grande é o Senhor',sub:'Ministério de Louvor',det:[['Artista','Ministério de Louvor'],['Categoria','Adoração'],['Tom','D'],['BPM','72']],vis:'res',own:'Louvor',ini:0,files:3,usos:[['Blocos de escala','Escala Louvor — Novembro · dom, 15 nov']]}),
 cnMk({n:'Tua graça me basta',sub:'Ministério de Louvor',det:[['Artista','Ministério de Louvor'],['Categoria','Adoração'],['Tom','G'],['BPM','68']],vis:'res',own:'Louvor',files:2,usos:[['Blocos de escala','Escala Louvor — Novembro · dom, 15 nov']]}),
 cnMk({n:'Alvorada',sub:'Ministério de Louvor',det:[['Artista','Ministério de Louvor'],['Categoria','Celebração'],['Tom','E'],['BPM','96']],vis:'int',files:2}),
 cnMk({n:'Novo dia',sub:'Ministério de Louvor',det:[['Artista','Ministério de Louvor'],['Categoria','Celebração'],['Tom','A'],['BPM','88']],vis:'int',st:'in',files:1})];
const cnMats=[
 cnMk({n:'Guia da Casa de Apascentamento',sub:'PDF · 1,2 MB',det:[['Tipo','PDF'],['Categoria','Casas'],['Tamanho','1,2 MB'],['Data','10 set']],vis:'int',ini:60,conc:44,files:1,usos:[['Encontros','Casa Jardins · Casa Centro']]}),
 cnMk({n:'Roteiro de estudo · Fundamentos',sub:'PDF · 640 KB',det:[['Tipo','PDF'],['Categoria','Discipulado'],['Tamanho','640 KB'],['Data','2 set']],vis:'int',ini:38,conc:30,files:1,usos:[['Séries','Fundamentos da fé'],['Encontros','Discipulado']]}),
 cnMk({n:'Cartilha do Kids',sub:'PDF · 2,4 MB',det:[['Tipo','PDF'],['Categoria','Infantil'],['Tamanho','2,4 MB'],['Data','28 ago']],vis:'res',own:'Infantil',ini:14,conc:9,files:1}),
 cnMk({n:'Planilha de escalas',sub:'XLSX · 80 KB',det:[['Tipo','XLSX'],['Categoria','Escalas'],['Tamanho','80 KB'],['Data','15 ago']],vis:'int',st:'in',files:1})];
const cnCursos=[
 cnMk({n:'Fundamentos da fé',sub:'12 aulas',det:[['Aulas','12'],['Categoria','Discipulado'],['Gera certificado','Sim']],vis:'pub',ini:52,conc:30,cert:true,inJ:true,trailT:'Aulas',trail:[['Quem é Deus','18:20'],['A Bíblia','22:05'],['Salvação','19:40'],['Oração','25:10']],usos:[['Jornadas','Primeiros passos']],coms:cnComs.slice(0,1)}),
 cnMk({n:'Liderança de Casa',sub:'10 aulas',det:[['Aulas','10'],['Categoria','Liderança'],['Gera certificado','Sim']],vis:'int',ini:18,conc:9,cert:true,inJ:true,trailT:'Aulas',trail:[['O chamado do líder','20:00'],['Conduzir o encontro','24:30'],['Cuidar de pessoas','21:15']],usos:[['Jornadas','Liderança em casa']]}),
 cnMk({n:'Classe de batismo',sub:'4 aulas',det:[['Aulas','4'],['Categoria','Batismo'],['Gera certificado','Sim']],vis:'pub',ini:26,conc:21,cert:true,trailT:'Aulas',trail:[['Por que batizar','15:00'],['O que muda','17:30'],['Testemunho','12:45'],['O dia do batismo','10:20']]}),
 cnMk({n:'Casais',sub:'8 aulas',det:[['Aulas','8'],['Categoria','Família'],['Gera certificado','Não']],vis:'int',st:'in',ini:0,conc:0,trailT:'Aulas',trail:[['Aliança','20:00']]})];
const cnSeries=[
 cnMk({n:'Fundamentos da fé',sub:'6 itens',det:[['Itens','6'],['Duração total','3h 52min'],['Gera certificado','Não']],vis:'pub',ini:140,conc:88,trailT:'Trilha',trail:[['Identidade em Cristo','Pregação','75%'],['A força da comunhão','Pregação','55%'],['Perseverança','Pregação','47%'],['Roteiro de estudo · Fundamentos','Material','40%']],usos:[['Kids','Planejamento da turma Kids A']]}),
 cnMk({n:'Casa e família',sub:'4 itens',det:[['Itens','4'],['Duração total','2h 10min'],['Gera certificado','Não']],vis:'int',ini:63,conc:40,trailT:'Trilha',trail:[['Testemunho: Casa Jardins','Vídeo','63%'],['Guia da Casa de Apascentamento','Material','48%']]}),
 cnMk({n:'Propósito',sub:'3 itens',det:[['Itens','3'],['Duração total','1h 30min'],['Gera certificado','Não']],vis:'int',st:'in',ini:5,conc:2,trailT:'Trilha',trail:[['Esperança que não falha','Pregação','40%']]})];
const cnJorn=[
 cnMk({n:'Primeiros passos',sub:'5 cursos',det:[['Cursos','5'],['Gera certificado','Sim']],vis:'pub',ini:70,conc:34,cert:true,trailT:'Cursos',trail:[['Fundamentos da fé','12 aulas','43%'],['Classe de batismo','4 aulas','30%']]}),
 cnMk({n:'Vida com propósito',sub:'8 cursos',det:[['Cursos','8'],['Gera certificado','Sim']],vis:'int',ini:31,conc:12,cert:true,trailT:'Cursos',trail:[['Fundamentos da fé','12 aulas','38%']]}),
 cnMk({n:'Liderança em casa',sub:'6 cursos',det:[['Cursos','6'],['Gera certificado','Sim']],vis:'res',own:'Casas',st:'in',ini:8,conc:3,cert:true,trailT:'Cursos',trail:[['Liderança de Casa','10 aulas','37%']]})];
function cnRow(id){for(const s of Object.values(LSD.conteudo)){const r=s.rows.find(x=>x.id===id);if(r)return r;}return null;}
/* onde está cada item de uma trilha: série → pregação, vídeo, música ou material; jornada → curso; curso → aula (abre a folha da aula) */
function cnFind(n){for(const s of Object.keys(LSD.conteudo)){const r=LSD.conteudo[s].rows.find(x=>x.n===n);if(r)return {sec:s,r};}return null;}
S.cn={back:null};
function cnExtra(r){const ed=can('conteudo','editar'),isCurso=r.trailT==='Aulas';
 const trail=r.trail?`<div class="stack g2"><p class="eb2">${r.trailT}</p><div class="vl">${r.trail.map((t,i)=>{const f=isCurso?null:cnFind(t[0]);return `<button class="vr tap" data-a="${isCurso?'cnAula':'cnGo'}" data-v="${isCurso?r.id+'|'+i:f?f.r.id+'|'+r.id:''}"${isCurso||f?'':' disabled'}><span class="vs" style="min-width:20px">${i+1}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(t[0])}</span><span class="vs">${esc(t[1])}</span></span>${ic('chevR',18)}</button>`;}).join('')}</div></div>`:'';
 const coms=r.coms.length?`<div class="stack g2"><p class="eb2">Comentários</p><div class="vl">${r.coms.map((c,i)=>`<div class="vr" style="flex-wrap:wrap;gap:6px"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(c[0])} <small class="vs">${c[2]}</small></span><span class="vs" style="white-space:normal">${esc(c[1])}</span></span>${ed?`<button class="link" data-a="cnDelCom" data-v="${r.id}|${i}">Apagar</button>`:''}</div>`).join('')}</div></div>`:'';
 const bk=S.cn.back;S.cn.back=null;if(bk)S.cn.last=bk;
 const back=bk?`<button class="btn outline md block" data-a="cnBack">Voltar</button>`:'';
 return trail+coms+(ed?`<button class="btn ${r.st==='at'?'outline':'primary'} md block" data-a="cnToggle" data-v="${r.id}">${r.st==='at'?'Inativar':'Reativar'}</button>`:'')+back;}
Object.assign(A,{
 cnGo:v=>{const [to,from]=v.split('|'),dst=Object.keys(LSD.conteudo).find(s=>LSD.conteudo[s].rows.some(x=>x.id===to));
  S.cn.back={sec:S.gsec,id:from};closeSheet().then(()=>{S.gmod='conteudo';A.ovGo(dst);setTimeout(()=>A.lsOpen(to),350);});},
 cnBack:()=>{const b=S.cn.last;closeSheet().then(()=>{S.gmod='conteudo';A.ovGo(b.sec);setTimeout(()=>A.lsOpen(b.id),350);});},
 cnAula:v=>{const [cid,i]=v.split('|'),c=cnRow(cid),a=c.trail[+i];
  sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(a[0])}</h3><span class="vs">Aula ${+i+1} de ${c.trail.length} · ${esc(c.n)}</span></div><div class="vl"><div class="vr"><span class="vs" style="min-width:104px">Duração</span><span class="grow" style="text-align:right">${esc(a[1])}</span></div><div class="vr"><span class="vs" style="min-width:104px">Curso</span><span class="grow" style="text-align:right">${esc(c.n)}</span></div></div><p class="body">${esc(a[2]||'Vídeo da aula com o roteiro de estudo em anexo.')}</p><button class="btn outline md block" data-a="lsOpen" data-v="${cid}">Voltar ao curso</button></div>`);},
 cnToggle:id=>{const r=cnRow(id);if(!r)return;
  if(r.st==='at'){if(r.inJ){toast('error','Este curso está em uma jornada','Tire o curso da jornada na web para inativar.');return;}
   vsConfirm('Inativar '+esc(r.n)+'?','Os usos existentes permanecem; o conteúdo deixa de aparecer no app. Dá para reativar depois.','Inativar',()=>{r.st='in';closeSheet().then(()=>{softRender();toast('success','Inativado',r.n);});});}
  else{r.st='at';closeSheet().then(()=>{softRender();toast('success','Reativado',r.n);});}},
 cnDelCom:v=>{const [id,i]=v.split('|'),r=cnRow(id),c=r.coms[+i];vsConfirm('Apagar o comentário?','O comentário de '+esc(c[0])+' some para todos. Só a moderação apaga.','Apagar',()=>{r.coms.splice(+i,1);closeSheet().then(()=>{softRender();toast('success','Comentário apagado',c[0]);A.lsOpen(id);});});}
});
{const ST={at:['ok','Ativo'],in:['off','Inativo']},mk=(noun,rows)=>({noun,ST,acts:[],extra:cnExtra,rows});
 LSD.conteudo={'Pregações':mk('pregações',cnPregs),'Vídeos':mk('vídeos',cnVids),'Músicas':mk('músicas',cnSongs),'Séries':mk('séries',cnSeries),'Jornadas':mk('jornadas',cnJorn),'Cursos':mk('cursos',cnCursos),'Material de apoio':mk('arquivos',cnMats)};}
