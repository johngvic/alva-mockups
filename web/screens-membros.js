/* ================= Pessoas › Membros ================= */
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const ST={
 solicitado:{l:'Solicitado',step:1,c:'var(--st-sol)',bg:'var(--st-sol-bg)'},
 aceita:{l:'Aceita',step:2,c:'var(--st-ace)',bg:'var(--st-ace-bg)'},
 integrado:{l:'Integrado',step:3,c:'var(--st-int)',bg:'var(--st-int-bg)'},
 recusado:{l:'Recusado',step:0,c:'var(--st-rec)',bg:'var(--st-rec-bg)'},
};
const MONTHS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const monthLabel=k=>{const [y,m]=k.split('-');return MONTHS[+m-1][0].toUpperCase()+MONTHS[+m-1].slice(1)+' '+y;};
const mShort=k=>{const [y,m]=k.split('-');return MONTHS[+m-1].slice(0,3)+'/'+y.slice(2);};
const TONES=['ceu','menta','damasco','rosado','lima','salvia'];
let _mid=0;
const M=(n,e,ph,int,st,min,o={})=>({id:'m'+(++_mid),n,e,ph,int,st,min,tone:o.tone||TONES[_mid%6],bap:o.bap!==false,tit:o.tit!==false,dup:o.dup||null,role:o.role||'Membro da equipe',since:o.since||'jan/2026',nasc:o.nasc||'1990-05-10',gen:o.gen||'Feminino',civil:o.civil||'Casado(a)',conv:o.conv||'Mais de 10 anos',def:false,pastor:false,second:false,bapOk:false,consOk:false,marOk:false,consRole:'',addr:o.addr||{cep:'04538-132',rua:'R. Tabapuã',num:'540',bairro:'Itaim Bibi',cid:'São Paulo',uf:'SP',comp:''},fam:o.fam||[],app:o.app||{st:'ativo',last:'há 3 dias'},attend:o.attend||[1,1,0,1,1,1,1,0,1,1]});
const MEMBERS=[
 M('Ana Clara Lima','anaclara@email.com','(11) 99241-3301','2026-09','integrado',['Louvor'],{tone:'ceu',dup:'m2',nasc:'1997-03-14',civil:'Solteiro(a)',conv:'Entre 5 e 10 anos',addr:{cep:'01310-100',rua:'Av. Paulista',num:'1200',bairro:'Bela Vista',cid:'São Paulo',uf:'SP',comp:''},app:{st:'ativo',last:'há 2 dias'}}),
 M('Ana Clara Lima','anaclara@email.com','(11) 98800-1234','2026-07','solicitado',[],{tone:'ceu',dup:'m1',bap:false}),
 M('Carlos Eduardo Silva','carlos.edu@email.com','(11) 98754-2201','2026-09','aceita',[],{gen:'Masculino',bap:false,tone:'menta'}),
 M('Beatriz Martins Silva','beatriz.ms@email.com','(11) 98754-2202','2026-09','aceita',[],{tone:'rosado'}),
 M('Juliana Costa Ferreira','juliana.cf@email.com','(11) 97643-9912','2026-08','integrado',['Kids'],{tone:'lima',fam:[['m6','Filho']]}),
 M('Pedro Costa Ferreira','','','2026-08','integrado',[],{tit:false,gen:'Masculino',tone:'lima',civil:'Solteiro(a)',nasc:'2014-02-02',fam:[['m5','Mãe']],app:{st:'sem conta'}}),
 M('Marcos Souza Ramos','marcos.sramos@email.com','(11) 98123-4456','2026-08','integrado',['Jovens'],{gen:'Masculino',dup:'m8',tone:'salvia'}),
 M('Marcos Souza Ramos','ramos.antigo@email.com','(11) 98123-4456','2026-07','solicitado',[],{gen:'Masculino',dup:'m7',tone:'salvia'}),
 M('Patrícia Oliveira Nunes','patricia.on@email.com','(11) 97800-8823','2026-07','integrado',['Comunicação'],{tone:'damasco'}),
 M('Daniela Rocha','dani.rocha@email.com','(11) 99102-7781','2026-06','integrado',['Louvor'],{role:'Líder',tone:'rosado',since:'mar/2025'}),
 M('Felipe Andrade','felipe.and@email.com','(11) 98877-1020','2026-06','integrado',['Recepção'],{gen:'Masculino',tone:'ceu'}),
 M('Marina Costa','marina.costa@email.com','(11) 99654-3321','2026-05','integrado',['Kids'],{role:'Líder',tone:'rosado',since:'ago/2024'}),
 M('Lucas Teixeira','lucas.tx@email.com','(11) 97231-5540','2026-09','solicitado',[],{gen:'Masculino',bap:false,tone:'menta'}),
 M('Juliana Prado','ju.prado@email.com','(11) 98012-4431','2026-05','integrado',['Eventos'],{tone:'lima'}),
 M('Bruno Reis','bruno.reis@email.com','(11) 99300-1188','2026-04','integrado',['Louvor'],{gen:'Masculino',tone:'damasco'}),
 M('Clara Nunes','clara.nunes@email.com','(11) 98455-9090','2026-04','integrado',['Recepção'],{tone:'lima'}),
 M('Diego Faria','diego.faria@email.com','(11) 97766-2210','2026-04','integrado',['Mídia'],{gen:'Masculino',tone:'ceu'}),
 M('Elisa Moura','elisa.moura@email.com','(11) 99888-4512','2026-03','integrado',['Kids','Louvor'],{tone:'salvia'}),
 M('Otávio Lins','otavio.lins@email.com','(11) 98111-6677','2026-03','integrado',[],{gen:'Masculino',tone:'menta'}),
 M('Renata Campos','renata.c@email.com','(11) 97002-3345','2026-03','integrado',['Intercessão'],{tone:'damasco'}),
 M('Thiago Barros','thiago.b@email.com','(11) 99745-1102','2026-02','integrado',['Jovens'],{gen:'Masculino',tone:'ceu',fam:[['m22','Filha']]}),
 M('Sofia Barros','','','2026-02','integrado',[],{tit:false,bap:false,tone:'rosado',civil:'Solteiro(a)',nasc:'2012-07-21',fam:[['m21','Pai']],app:{st:'sem conta'}}),
 M('Gustavo Mendes','gustavo.m@email.com','(11) 98543-7788','2026-02','recusado',[],{gen:'Masculino',tone:'salvia',bap:false}),
 M('Helena Duarte','helena.d@email.com','(11) 99432-1009','2026-01','integrado',['Louvor'],{tone:'lima'}),
 M('Igor Santana','igor.s@email.com','(11) 97654-0032','2026-01','aceita',[],{gen:'Masculino',tone:'damasco'}),
 M('Larissa Pires','larissa.p@email.com','(11) 98990-5541','2026-01','integrado',['Diaconia'],{tone:'menta'}),
];
const MIN_ALL=['Louvor','Kids','Jovens','Recepção','Mídia','Comunicação','Intercessão','Diaconia','Eventos','Zeladoria'];
Object.assign(S,{sort:{k:'int',d:-1},filter:'todos',q:'',month:'todas',member:null,tab:'geral',edit:null});
const byId=id=>MEMBERS.find(m=>m.id===id);
const initials=n=>n.split(' ').filter(w=>w.length>2||w===w.toUpperCase()).map(w=>w[0]).slice(0,2).join('')||n.slice(0,2);
const mav=(m,cls='')=>`<span class="av ${cls}" style="background:var(--tone-${m.tone});color:var(--tone-${m.tone}-ink)">${initials(m.n)}</span>`;
const age=d=>{const b=new Date(d),t=new Date(2026,8,30);let a=t.getFullYear()-b.getFullYear();if(t<new Date(t.getFullYear(),b.getMonth(),b.getDate()))a--;return a;};
const fmtDate=d=>{const [y,m,dd]=d.split('-');return `${+dd} de ${MONTHS[+m-1]} de ${y}`;};
const dupPairs=()=>{const s=new Set(),out=[];MEMBERS.forEach(m=>{if(m.dup&&byId(m.dup)&&!s.has(m.id)){s.add(m.id);s.add(m.dup);out.push([m,byId(m.dup)]);}});return out;};

function journey(st,compact){
 if(st==='recusado')return `<span class="jr rec" title="Recusado"><i></i><i></i><i></i><em>Recusado</em></span>`;
 const k=ST[st].step;return `<span class="jr s${k}" title="${ST[st].l}"><i></i><i></i><i></i><em>${ST[st].l}</em></span>`;
}
function filtered(){const q=norm(S.q);return MEMBERS.filter(m=>(S.filter==='todos'||m.st===S.filter)&&(S.month==='todas'||m.int===S.month)&&(!q||norm(m.n+' '+m.e+' '+m.ph+' '+m.min.join(' ')).includes(q)));}

/* ---------- list ---------- */
function stPill(st){return `<span class="stp" style="--c:${ST[st].c};--b:${ST[st].bg}"><i></i>${ST[st].l}</span>`;}
function sorted(list){const {k,d}=S.sort;return list.slice().sort((a,b)=>{const va=k==='int'?a.int:k==='st'?ST[a.st].step:norm(a[k]),vb=k==='int'?b.int:k==='st'?ST[b.st].step:norm(b[k]);return (va<vb?-1:va>vb?1:0)*d||norm(a.n).localeCompare(norm(b.n));});}
function members(){
 const tot=MEMBERS.length,cnt=k=>MEMBERS.filter(m=>m.st===k).length,bap=MEMBERS.filter(m=>m.bap).length,tit=MEMBERS.filter(m=>m.tit).length,integ=cnt('integrado');
 const dups=dupPairs();
 const months=[...new Set(MEMBERS.map(m=>m.int))].sort().reverse();
 return `<header class="ph rise">
  <div><p class="eb">Pessoas</p><h1>Membros</h1><p class="lede">${tot} membros cadastrados</p></div>
  <div class="pact">
   ${rpBtn('membros','membros')}
   
   <button class="btn pri" data-a="addMember">${ic('plus',15,2.2)}Adicionar membro</button>
  </div>
 </header>
 <section class="card kpis4 rise" style="--d:1" aria-label="Resumo">
  <div class="k4"><span class="kl">Total de membros</span><span class="kv">${tot}</span><span class="kd">cadastrados</span></div>
  <div class="k4"><span class="kl">Integrados</span><span class="kv">${integ}</span><span class="kmeter"><i style="width:${Math.round(integ/tot*100)}%"></i></span><span class="kd">${Math.round(integ/tot*100)}% do total</span></div>
  <div class="k4"><span class="kl">Batizados</span><span class="kv">${bap}</span><span class="kmeter"><i style="width:${Math.round(bap/tot*100)}%"></i></span><span class="kd">${Math.round(bap/tot*100)}% do total</span></div>
  <div class="k4"><span class="kl">Titulares</span><span class="kv">${tit}</span><span class="kd">${tot-tit} dependentes</span></div>
 </section>
 ${dups.length?`<div class="dupn rise" style="--d:2"><span class="dd"></span><span><b>${dups.length} possíveis cadastros duplicados</b> · ${dups.map(p=>p[0].n).join(' e ')}</span><button class="lnk" data-a="dupes">Revisar ${ic('arrowR',14,2)}</button></div>`:''}
 <section class="card mtab rise" style="--d:3" aria-label="Lista de membros">
  <div class="tbar">
   <label class="sbox">${ic('search',16)}<input id="mq" placeholder="Pesquisar membro" value="${esc(S.q)}" autocomplete="off"><kbd>/</kbd></label>
   <div style="position:relative"><button class="btn sec sel" data-a="monthMenu" aria-haspopup="menu">${S.month==='todas'?'Todas as integrações':'Integração de '+monthLabel(S.month).toLowerCase()}${ic('updown',14)}</button>
    <div class="pop" id="monthPop" role="menu" style="left:0;top:calc(100% + 6px);max-height:300px;overflow:auto"><button class="pi" data-a="month" data-v="todas">Todas as integrações${S.month==='todas'?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button><hr>${months.map(k=>`<button class="pi" data-a="month" data-v="${k}">${monthLabel(k)}<small style="margin-left:6px;color:var(--ink-soft)">${MEMBERS.filter(m=>m.int===k).length}</small>${S.month===k?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>
   <div class="chips" role="tablist" aria-label="Status">${['todos','integrado','aceita','solicitado','recusado'].map(k=>`<button role="tab" class="chipf ${S.filter===k?'on':''}" data-a="filter" data-v="${k}" aria-selected="${S.filter===k}">${k==='todos'?'Todos':`<i style="background:${ST[k].c}"></i>${ST[k].l}`}<small>${k==='todos'?tot:cnt(k)}</small></button>`).join('')}</div>
  </div>
  <div id="mrows">${rows()}</div>
 </section>`;
}
function rows(){
 const list=sorted(filtered());
 const th=(k,l)=>`<button class="th ${S.sort.k===k?'on':''}" data-a="sort" data-v="${k}">${l}${S.sort.k===k?`<span class="sd ${S.sort.d<0?'dn':''}">${ic('chevR',12,2.4)}</span>`:''}</button>`;
 if(!list.length)return `<div class="mempty"><p>Ninguém por aqui.</p><span>Nenhum membro corresponde a esses filtros.</span><button class="lnk" data-a="clearFilters">Limpar filtros</button></div>`;
 return `<div class="trow thead" role="row">${th('n','Nome')}<span>E-mail</span><span>Telefone</span>${th('int','Integração')}<span>Ministério</span>${th('st','Status')}<span></span></div>
 ${list.map(row).join('')}
 <div class="tfoot"><span>${list.length} ${list.length>1?'resultados':'resultado'}</span>${S.filter!=='todos'||S.q||S.month!=='todas'?'<button class="lnk" data-a="clearFilters">Limpar filtros</button>':''}</div>`;
}
function row(m){
 return `<div class="trow ${S.flash===m.id?'flash':''}" role="row" tabindex="0" data-a="open" data-v="${m.id}">
  <span class="tn">${mav(m)}<span><b>${esc(m.n)}</b>${!m.tit?'<em class="tag">Dependente</em>':''}${m.dup?'<em class="tag warn" title="Possível duplicado">Duplicado?</em>':''}</span></span>
  <span class="te ${m.e?'':'nil'}">${m.e?`<span class="cp" data-a="copy" data-v="${esc(m.e)}" title="Copiar">${esc(m.e)}</span>`:'<span class="soft">—</span>'}</span>
  <span class="tp mono ${m.ph?'':'nil'}">${m.ph||'<span class="soft">—</span>'}</span>
  <span class="ti">${monthLabel(m.int).replace(' ','/')}</span>
  <span class="tm">${m.min.length?m.min.join(', '):'<span class="soft">—</span>'}</span>
  <span class="ts">${stPill(m.st)}</span>
  <span class="tc">${ic('chevR',16)}</span>
 </div>`;
}

/* ---------- profile ---------- */
const TABS=[['geral','Visão geral'],['dados','Dados'],['familia','Família'],['min','Ministérios'],['hist','Histórico']];
function profile(){
 const m=byId(S.member);if(!m){S.member=null;return members();}
 const first=m.n.split(' ')[0];
 return `<nav class="crumb rise" aria-label="Você está em"><span class="soft">Pessoas</span>${ic('chevR',13,2)}<button class="lnk back" data-a="backList">Membros</button>${ic('chevR',13,2)}<span>${esc(m.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${mav(m,'xl')}<div class="pn"><h1>${esc(m.n)}</h1><p>${m.tit?'Titular':'Dependente'} · Integração de ${monthLabel(m.int).toLowerCase()}${m.nasc?` · ${age(m.nasc)} anos`:''}</p>
   <div class="pchips"><span class="chip st" style="--c:${ST[m.st].c};--b:${ST[m.st].bg}"><i></i>${ST[m.st].l}</span>${m.bap?'<span class="chip">Batizado(a)</span>':''}${m.min.map(x=>`<span class="chip">${x}</span>`).join('')}</div></div></div>
  <div class="pact">
   ${m.ph?`<button class="ibtn" data-a="wa" data-v="${m.id}" title="WhatsApp" aria-label="WhatsApp">${ic('message',17)}</button><button class="ibtn" data-a="call" data-v="${m.id}" title="Ligar" aria-label="Ligar">${ic('phone',17)}</button>`:''}
   ${m.e?`<button class="ibtn" data-a="copy" data-v="${esc(m.e)}" title="Copiar e-mail" aria-label="Copiar e-mail">${ic('mail',17)}</button>`:''}
   <div style="position:relative"><button class="ibtn" data-a="profMenu" aria-label="Mais ações">${ic('dots',17)}</button>
    <div class="pop" id="profPop" role="menu" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="inactivate">${ic('pause',17)}Inativar cadastro</button><button class="pi" data-a="idMemberChurch">${ic('swap',17)}Trocar igreja</button><hr><button class="pi danger" data-a="delMember">${ic('x',17)}Excluir cadastro</button></div></div>
  </div>
  <div class="ptabs" role="tablist">${TABS.map(t=>`<button role="tab" class="${S.tab===t[0]?'on':''}" aria-selected="${S.tab===t[0]}" data-a="tab" data-v="${t[0]}">${t[1]}${t[0]==='familia'&&m.fam.length?`<small>${m.fam.length}</small>`:''}${t[0]==='min'&&m.min.length?`<small>${m.min.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="ptab" class="rise" style="--d:2">${tabBody(m)}</div>`;
}
function tabBody(m){return ({geral:tGeral,dados:tDados,familia:tFam,min:tMin,hist:tHist})[S.tab](m);}
function history(m){
 const h=[['Cadastro criado','Pelo app','sys',`02 ${mShort(m.int).split('/')[0]}`]];
 if(m.st!=='recusado'){h.push(['Pediu para se integrar','Pelo app','sys',`05 ${mShort(m.int).split('/')[0]}`]);}
 if(ST[m.st].step>=2)h.push(['Integração aceita','Rafael Pereira','rp',`12 ${mShort(m.int).split('/')[0]}`]);
 if(m.st==='integrado')h.push(['Integrado(a) à comunidade','Rafael Pereira','rp',`26 ${mShort(m.int).split('/')[0]}`]);
 if(m.st==='recusado')h.push(['Integração recusada','Rafael Pereira','rp',`09 ${mShort(m.int).split('/')[0]}`]);
 m.min.forEach(x=>h.push([`Entrou no ministério ${x}`,'Daniela Rocha','dr',m.since]));
 return h;
}
function tGeral(m){
 const steps=[['Cadastro',1],['Solicitou',1],['Aceita',ST[m.st].step>=2],['Integrada',ST[m.st].step>=3],['Batismo',m.bap],['Serve',m.min.length>0]];
 const cur=steps.findIndex(s=>!s[1]);
 const att=m.attend,pres=att.filter(Boolean).length;
 return `<div class="pgrid">
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Caminhada</h2><span class="who">${m.st==='recusado'?'Integração recusada':cur===-1?'Caminho completo':'Próximo passo: <b>'+steps[cur][0].toLowerCase()+'</b>'}</span></div>
    <ol class="walk">${steps.map((s,i)=>`<li class="${s[1]?'done':i===cur?'next':''}"><span class="wd">${s[1]?ic('check',13,2.6):''}</span><span class="wl">${s[0]}</span></li>`).join('')}</ol>
   </section>
   ${sxRecon(m)}
   <section class="card pc"><div class="sh"><h2>Onde serve</h2><button class="lnk" data-a="tab" data-v="min">Ministérios ${ic('arrowR',14,2)}</button></div>
    ${m.min.length?`<div class="serve">${m.min.map(x=>`<div class="sv"><div><b>${x}</b><span>${m.role} · desde ${m.since}</span></div><div class="attd" title="${pres} de ${att.length} últimas escalas">${att.map(a=>`<i class="${a?'':'off'}"></i>`).join('')}</div><span class="who"><b>${pres}</b> de ${att.length} escalas</span></div>`).join('')}</div>`:`<div class="soft-empty"><p>${m.n.split(' ')[0]} ainda não serve em nenhum ministério.</p><button class="btn sec" data-a="addMin">${ic('plus',14,2.2)}Vincular a um ministério</button></div>`}
   </section>
   <section class="card pc"><div class="sh"><h2>Família</h2><button class="lnk" data-a="tab" data-v="familia">Ver família ${ic('arrowR',14,2)}</button></div>${famStrip(m)}</section>
  </div>
  <div class="col">
   <section class="card pc"><div class="sh"><h2>Contato</h2></div>
    <dl class="kv">
     <div><dt>E-mail</dt><dd>${m.e?`<span class="cp" data-a="copy" data-v="${esc(m.e)}">${esc(m.e)}</span>`:'<span class="soft">Não informado</span>'}</dd></div>
     <div><dt>Telefone</dt><dd class="mono">${m.ph||'<span class="soft">Não informado</span>'}</dd></div>
     <div><dt>Endereço</dt><dd>${m.addr.rua}, ${m.addr.num}<br><span class="soft">${m.addr.bairro} · ${m.addr.cid}/${m.addr.uf} · ${m.addr.cep}</span></dd></div>
     <div><dt>Nascimento</dt><dd>${fmtDate(m.nasc)}</dd></div>
    </dl></section>
   <section class="card pc appc"><div class="sh"><h2>Conta no app</h2><span class="chip st" style="--c:${m.app.st==='ativo'?'var(--st-int)':m.app.st==='suspensa'?'var(--st-rec)':'var(--ink-soft)'};--b:${m.app.st==='ativo'?'var(--st-int-bg)':m.app.st==='suspensa'?'var(--st-rec-bg)':'var(--surface-2)'}"><i></i>${m.app.st==='ativo'?'Ativa':m.app.st==='suspensa'?'Suspensa':'Sem conta'}</span></div>
    ${m.app.st==='sem conta'?`<p class="who" style="margin:10px 0 14px">Dependentes usam o app pela conta do titular.</p>`:`<p class="who" style="margin:10px 0 14px">${esc(m.e)}${m.app.last?` · último acesso ${m.app.last}`:''}</p><div class="row2"><button class="btn sec" data-a="resetPw">Redefinir senha</button><button class="btn ghostd" data-a="suspend">${m.app.st==='suspensa'?'Reativar acesso':'Suspender acesso'}</button></div>`}
   </section>
   <section class="card pc"><div class="sh"><h2>Últimos registros</h2><button class="lnk" data-a="tab" data-v="hist">Histórico ${ic('arrowR',14,2)}</button></div>
    <ol class="mini-tl">${history(m).slice(-3).reverse().map(h=>`<li><b>${h[0]}</b><span>${h[3]} · ${h[1]}</span></li>`).join('')}</ol></section>
  </div>
 </div>`;
}
const FREL=r=>/c[ôo]njuge/i.test(r)?'sp':/pai|m[ãa]e/i.test(r)?'par':/filh/i.test(r)?'kid':/irm/i.test(r)?'sib':'oth';
function famNode(m,p,rel,i,small,me){const k=me?'me':FREL(rel);return `<div class="gt-n ${k} ${me?'self':''}" style="--d:${i||0}">${me?'':`<button class="gt-x" data-a="unlink" data-v="${i}" aria-label="Desvincular ${esc(p.n)}" title="Desvincular">${ic('x',11,2.4)}</button>`}
 <button class="gt-c" ${me?'':`data-a="open" data-v="${p.id}"`}><span class="gt-av">${mav(p)}${p.app&&p.app.st==='ativo'?'<i class="gt-app" title="Usa o app"></i>':''}</span><b>${esc(small?p.n.split(' ')[0]:p.n.split(' ').slice(0,2).join(' '))}</b><small>${me?(p.tit?'Titular':'Dependente'):esc(rel)}${!small&&p.nasc?' · '+age(p.nasc)+' anos':''}</small></button></div>`;}
const famGhost=(rel,lab)=>`<button class="gt-n gt-gh" data-a="addFam" data-v="${rel}"><span class="gt-av"><span class="av">${ic('plus',14,2.2)}</span></span><b>${lab}</b></button>`;
function famTree(m,small){const L={par:[],sp:[],kid:[],sib:[],oth:[]};m.fam.forEach((f,i)=>{const p=byId(f[0]);if(p)L[FREL(f[1])].push([p,f[1],i]);});
 const gens=(L.par.length?1:0)+1+(L.kid.length?1:0),nd=x=>famNode(m,x[0],x[1],x[2],small);
 const par=L.par.length?L.par.map(nd).join(''):small?'':famGhost('Pai/Mãe','Pais');
 const kids=L.kid.length?L.kid.map(nd).join(''):small?'':famGhost('Filho(a)','Filhos');
 return `<div class="gt ${small?'sm':''}">${small?'':`<div class="gt-meta"><span><b>${m.fam.length+1}</b> pessoas</span><span><b>${gens}</b> gera${gens>1?'ções':'ção'}</span><span><b>${[m,...m.fam.map(f=>byId(f[0]))].filter(p=>p&&p.app&&p.app.st==='ativo').length}</b> no app</span></div>`}
  ${par?`<div class="gt-row gt-par"><span class="gt-lbl">Pais</span><div class="gt-grp ${L.par.length>1?'gt-cpl':''}">${par}</div></div><div class="gt-v"></div>`:''}
  <div class="gt-row gt-mid"><div class="gt-side l">${L.sib.length?`<div class="gt-grp gt-sibs">${L.sib.map(nd).join('')}</div><i class="gt-h sib"></i>`:''}</div><div class="gt-grp gt-me">${famNode(m,m,'',0,small,true)}</div><div class="gt-side r">${L.sp.length?`<i class="gt-heart">${ic('heart',12,2.2)}</i>${L.sp.map(nd).join('')}`:small?'':`<i class="gt-heart off"></i>${famGhost('Cônjuge','Cônjuge')}`}${L.oth.length?`<i class="gt-h"></i><div class="gt-grp">${L.oth.map(nd).join('')}</div>`:''}</div></div>
  ${kids?`<div class="gt-v"></div><div class="gt-row gt-kids"><span class="gt-lbl">Filhos</span><div class="gt-grp gt-rail ${L.kid.length>1?'multi':''}">${kids}</div></div>`:''}</div>`;}
function famStrip(m){
 if(!m.fam.length)return `<div class="famempty"><span class="fdots">${mav(m)}<i></i><span class="av ghost">${ic('plus',16,2)}</span></span><div><p>Nenhum familiar vinculado.</p><span class="who">Vincule cônjuge, filhos ou pais para relatórios por família.</span></div><button class="btn sec" data-a="addFam">Vincular</button></div>`;
 return famTree(m,true);
}
/* Dados: read-first sections, edit in place */
const SECS={
 pess:{t:'Dados pessoais',f:[['n','Nome completo','text'],['e','E-mail','email'],['ph','Telefone','tel'],['nasc','Data de nascimento','date'],['gen','Gênero','seg',['Feminino','Masculino']],['civil','Estado civil','select',['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)']]]},
 fe:{t:'Vida na igreja',f:[['bap','Batizado(a)','bool'],['conv','Tempo de conversão','select',['Menos de 1 ano','Entre 1 e 5 anos','Entre 5 e 10 anos','Mais de 10 anos']],['st','Status de integração','select',['solicitado','aceita','integrado','recusado']],['second','Segunda aliança de casamento','bool'],['pastor','Consagrado(a)','bool'],['def','Possui deficiência física','bool']]},
 end:{t:'Endereço',f:[['addr.cep','CEP','text'],['addr.rua','Rua','text'],['addr.num','Número','text'],['addr.bairro','Bairro','text'],['addr.cid','Cidade','text'],['addr.uf','Estado','text'],['addr.comp','Complemento','text']]},
};
const gv=(m,k)=>k.split('.').reduce((o,x)=>o&&o[x],m);
const sv=(m,k,v)=>{const p=k.split('.');if(p.length>1)m[p[0]][p[1]]=v;else m[k]=v;};
function showVal(f,v){if(f[2]==='bool')return v?'Sim':'Não';if(f[0]==='st')return ST[v].l;if(f[2]==='date')return v?fmtDate(v):'';return v;}
function tDados(m){return `<div class="dgrid">${Object.keys(SECS).map(k=>secCard(m,k)).join('')}</div>`;}
function secCard(m,k){
 const s=SECS[k],ed=S.edit===k;
 return `<section class="card pc sec ${ed?'editing':''}" id="sec-${k}"><div class="sh"><h2>${s.t}</h2>${ed?'':`<button class="btn sec sm" data-a="editSec" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" data-sec="${k}" novalidate>${s.f.map(f=>field(m,f)).join('')}<div class="dfoot"><button type="button" class="btn sec" data-a="cancelSec">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid">${s.f.map(f=>{const v=showVal(f,gv(m,f[0]));return `<div><dt>${f[1]}</dt><dd>${v===''||v==null?'<span class="soft">Não informado</span>':esc(v)}</dd></div>`;}).join('')}</dl>`}
 </section>`;
}
function field(m,f){const v=gv(m,f[0]),id='f-'+f[0].replace('.','-');
 if(f[2]==='bool')return `<div class="fld"><span class="fl">${f[1]}</span><div class="yn" role="radiogroup" aria-label="${f[1]}"><label><input type="radio" name="${f[0]}" value="1" ${v?'checked':''}><span>Sim</span></label><label><input type="radio" name="${f[0]}" value="0" ${!v?'checked':''}><span>Não</span></label></div></div>`;
 if(f[2]==='seg')return `<div class="fld"><span class="fl">${f[1]}</span><div class="yn" role="radiogroup">${f[3].map(o=>`<label><input type="radio" name="${f[0]}" value="${o}" ${v===o?'checked':''}><span>${o}</span></label>`).join('')}</div></div>`;
 if(f[2]==='select')return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="${f[0]}">${f[3].map(o=>`<option value="${o}" ${v===o?'selected':''}>${f[0]==='st'?ST[o].l:o}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;
 return `<label class="fld ${f[0]==='addr.comp'||f[0]==='n'?'wide':''}" for="${id}"><span class="fl">${f[1]}</span><input id="${id}" name="${f[0]}" type="${f[2]}" value="${esc(v||'')}" ${f[0]==='n'?'required':''}><span class="err"></span></label>`;
}
function tFam(m){
 return `<section class="card pc"><div class="sh"><h2>Árvore da família</h2><button class="btn sec sm" data-a="addFam">${ic('plus',14,2.2)}Vincular familiar</button></div>${famTree(m,false)}</section>`;
}
function tMin(m){
 return `<section class="card pc"><div class="sh"><h2>Ministérios</h2><button class="btn sec sm" data-a="addMin">${ic('plus',14,2.2)}Vincular</button></div>
  ${m.min.length?`<div class="mins">${m.min.map((x,i)=>{const pres=m.attend.filter(Boolean).length;return `<article class="minc2"><div class="mt"><b>${x}</b><div style="position:relative"><button class="ibtn sm" data-a="minMenu" data-v="${i}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="minPop${i}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="soon" data-v="Alterar função">Alterar função</button><button class="pi danger" data-a="unMin" data-v="${i}">Remover do ministério</button></div></div></div><span class="who">${m.role} · desde ${m.since}</span><div class="attd big">${m.attend.map(a=>`<i class="${a?'':'off'}"></i>`).join('')}</div><div class="segl"><span><b>${pres}</b> de ${m.attend.length} últimas escalas</span><span>próxima: dom, 4 out</span></div></article>`;}).join('')}</div>`
  :`<div class="soft-empty"><p>Sem ministérios por enquanto.</p><button class="btn pri" data-a="addMin">${ic('plus',14,2.2)}Vincular a um ministério</button></div>`}
 </section>`;
}
function tHist(m){const h=history(m).reverse();
 return `<section class="card pc"><div class="sh"><h2>Histórico</h2><span class="who">${h.length} registros</span></div>
  <ol class="htl">${h.map(x=>`<li><span class="hd2">${x[3]}</span><span class="hdot ${x[2]}"></span><span class="hb"><b>${x[0]}</b><span>${x[2]==='sys'?'Automático · '+x[1]:'por '+x[1]}</span></span></li>`).join('')}</ol></section>`;
}

/* ---------- dialogs / sheets ---------- */
function openDlg(html,cls=''){closeDlg(true);const d=document.createElement('div');d.className='dlgw';d.innerHTML=`<div class="dlg ${cls}" role="dialog" aria-modal="true">${html}</div>`;document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('open'));d.addEventListener('click',e=>{if(e.target===d)closeDlg();});setTimeout(()=>d.querySelector('input,button.pri')?.focus(),60);return d;}
function closeDlg(now){$$('.dlgw').forEach(d=>{if(now){d.remove();return;}d.classList.remove('open');setTimeout(()=>d.remove(),240);});}
const dlgHead=(t,s)=>`<div class="dh"><div><h3>${t}</h3>${s?`<p>${s}</p>`:''}</div><button class="ibtn sm" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>`;

function peopleAfter(){
 requestAnimationFrame(()=>{$$('.stseg i').forEach(i=>i.style.flexGrow=i.dataset.g);tabInd();});
 const q=$('#mq');if(q){q.addEventListener('input',e=>{S.q=e.target.value;$('#mrows').innerHTML=rows();});}
 $$('form[data-sec]').forEach(f=>f.addEventListener('submit',saveSec));
 if(S.flash)setTimeout(()=>{S.flash=null;},1600);
}
function tabInd(){const on=$('.ptabs button.on'),ind=$('.tind');if(on&&ind){ind.style.width=on.offsetWidth+'px';ind.style.transform=`translateX(${on.offsetLeft}px)`;}}
function reTab(){const m=byId(S.member);$('#ptab').innerHTML=tabBody(m);$$('.ptabs button').forEach(b=>{b.classList.toggle('on',b.dataset.v===S.tab);b.setAttribute('aria-selected',b.dataset.v===S.tab);});tabInd();$$('form[data-sec]').forEach(f=>f.addEventListener('submit',saveSec));}
function saveSec(e){e.preventDefault();const f=e.target,m=byId(S.member),k=f.dataset.sec,fd=new FormData(f),was=m.st;
 const nm=f.querySelector('[name=n]');if(nm&&!nm.value.trim()){nm.closest('.fld').classList.add('bad');nm.nextElementSibling.textContent='Informe o nome';nm.focus();return;}
 const em=f.querySelector('[name=e]');if(em&&em.value&&!/^\S+@\S+\.\S+$/.test(em.value)){em.closest('.fld').classList.add('bad');em.nextElementSibling.textContent='E-mail inválido';em.focus();return;}
 const b=f.querySelector('button[type=submit]');b.classList.add('busy');
 setTimeout(()=>{SECS[k].f.forEach(x=>{if(!fd.has(x[0]))return;let v=fd.get(x[0]);if(x[2]==='bool')v=v==='1';sv(m,x[0],v);});S.edit=null;const au=was!=='integrado'&&m.st==='integrado'?sxIntegrated(m):'';
  if(k==='pess'||k==='fe'){render();}else reTab();toast(`${SECS[k].t} atualizados`+(au?'. '+au:''));
  const c=$('#sec-'+k);if(c)c.animate([{boxShadow:'0 0 0 2px var(--brand)'},{boxShadow:'var(--shadow-card)'}],{duration:900});},800);}

const PA={
 open:(v,b,e)=>{if(e&&e.target.closest('[data-a=copy],[data-a=wa]'))return;S.member=v;S.tab='geral';S.edit=null;closePops();render();window.scrollTo({top:0,behavior:'smooth'});},
 backList:()=>{S.member=null;render();},
 sort:v=>{S.sort=S.sort.k===v?{k:v,d:-S.sort.d}:{k:v,d:v==='int'?-1:1};$('#mrows').innerHTML=rows();},
 reportMenu:()=>{const p=$('#reportPop');closePops(p);p.classList.toggle('open');},
 filter:v=>{S.filter=v;$$('.chipf').forEach(b=>{b.classList.toggle('on',b.dataset.v===v);b.setAttribute('aria-selected',b.dataset.v===v);});$$('.stb').forEach(b=>{b.classList.toggle('on',b.dataset.v===v);b.setAttribute('aria-selected',b.dataset.v===v);});$$('.stseg i').forEach((i,j)=>i.classList.toggle('dim',v!=='todos'&&['integrado','aceita','solicitado','recusado'][j]!==v));const r=$('#mrows');r.innerHTML=rows();r.animate([{opacity:.3},{opacity:1}],{duration:220});},
 clearFilters:()=>{S.filter='todos';S.q='';S.month='todas';render();},
 monthMenu:()=>{const p=$('#monthPop');closePops(p);p.classList.toggle('open');},
 month:v=>{S.month=v;closePops();render();},
 exportMenu:()=>{const p=$('#exportPop');closePops(p);p.classList.toggle('open');},
 export:v=>{closePops();toast(`Preparando ${v}…`);setTimeout(()=>toast(`Arquivo com ${v} pronto para baixar`),1400);},
 copy:v=>{try{navigator.clipboard.writeText(v);}catch(e){}toast(`${v} copiado`);},
 wa:v=>toast(`Abrindo conversa com ${byId(v).n.split(' ')[0]} no WhatsApp`),
 call:v=>toast(`Ligando para ${byId(v).ph}`),
 profMenu:()=>{const p=$('#profPop');closePops(p);p.classList.toggle('open');},
 minMenu:v=>{const p=$('#minPop'+v);closePops(p);p.classList.toggle('open');},
 tab:v=>{S.tab=v;S.edit=null;reTab();},
 editSec:v=>{S.edit=v;reTab();const f=$('#sec-'+v+' input,#sec-'+v+' select');f&&f.focus();},
 cancelSec:()=>{S.edit=null;reTab();},
 closeDlg:()=>closeDlg(),
 addMember:()=>{openDlg(`${dlgHead('Adicionar membro','Os demais dados podem ser preenchidos depois.')}
  <form class="fgrid one" id="addF" novalidate>
   <label class="fld"><span class="fl">Nome completo</span><input name="n" required autocomplete="off" placeholder="Ex.: Maria Souza"><span class="err"></span></label>
   <label class="fld"><span class="fl">E-mail <small>opcional</small></span><input name="e" type="email" autocomplete="off" placeholder="nome@email.com"><span class="err"></span></label>
   <label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="ph" type="tel" autocomplete="off" placeholder="(11) 90000-0000" inputmode="tel"><span class="err"></span></label>
   <label class="tog"><input type="checkbox" name="inv" checked><span class="sw"></span><span><b>Convidar para o app</b><small>Enviamos o acesso por e-mail</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Adicionar membro</button></div>
  </form>`);
  const f=$('#addF');const ph=f.querySelector('[name=ph]');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,msg)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=msg;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),em=fd.get('e').trim();if(n.split(' ').length<2)bad('n',n?'Informe nome e sobrenome':'Informe o nome');if(em&&!/^\S+@\S+\.\S+$/.test(em))bad('e','E-mail inválido');
   if(em&&MEMBERS.some(m=>m.e===em))bad('e','Já existe um membro com este e-mail');if(!ok)return;
   const b=f.querySelector('button[type=submit]');b.classList.add('busy');
   setTimeout(()=>{const m=M(n,em,fd.get('ph'),'2026-09','solicitado',[],{bap:false,app:fd.get('inv')?{st:'ativo',last:'convite enviado'}:{st:'sem conta'}});MEMBERS.unshift(m);S.flash=m.id;S.filter='todos';S.month='todas';S.q='';closeDlg();render();toast(`${n.split(' ')[0]} adicionado(a)${fd.get('inv')&&em?' · convite enviado':''}`,()=>{MEMBERS.splice(MEMBERS.indexOf(m),1);render();});},900);});},
 dupes:()=>{const ps=dupPairs();S.dupI=0;dupDlg(ps);},
 merge:(v,b)=>{const ps=dupPairs(),[a,c]=ps[S.dupI];const keep=$('input[name=keep]:checked').value==='a'?a:c,drop=keep===a?c:a;
  b.classList.add('busy');setTimeout(()=>{keep.dup=null;MEMBERS.splice(MEMBERS.indexOf(drop),1);if(!keep.min.length)keep.min=drop.min;const left=dupPairs();toast(`Cadastros de ${keep.n.split(' ')[0]} mesclados`);if(left.length){S.dupI=0;dupDlg(left);}else closeDlg();render();},900);},
 notDup:()=>{const ps=dupPairs(),[a,c]=ps[S.dupI];a.dup=null;c.dup=null;const left=dupPairs();toast('Marcados como pessoas diferentes');if(left.length)dupDlg(left);else closeDlg();render();},
 addFam:(v)=>{const pre=['Cônjuge','Filho(a)','Pai/Mãe','Irmão(ã)','Outro'].includes(v)?v:'Cônjuge';const m=byId(S.member);const cands=MEMBERS.filter(x=>x.id!==m.id&&!m.fam.some(f=>f[0]===x.id));
  openDlg(`${dlgHead('Vincular familiar',`Quem faz parte da família de ${m.n.split(' ')[0]}?`)}
   <label class="sbox" style="margin:0 0 12px">${ic('search',16)}<input id="fq" placeholder="Buscar membro" autocomplete="off"></label>
   <div class="pick" id="fpick">${cands.slice(0,6).map(p=>`<label class="pk">${mav(p)}<span><b>${esc(p.n)}</b><small>${p.tit?'Titular':'Dependente'}</small></span><input type="radio" name="fp" value="${p.id}"></label>`).join('')}</div>
   <div class="fld" style="margin-top:14px"><span class="fl">Parentesco</span><div class="minpick" role="radiogroup" aria-label="Parentesco">${['Cônjuge','Filho(a)','Pai/Mãe','Irmão(ã)','Outro'].map((o,i)=>`<label><input type="radio" name="rel" value="${o}" ${o===pre?'checked':''}><span>${o}</span></label>`).join('')}</div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" data-a="doFam">Vincular</button></div>`,'sm');
  $('#fq').addEventListener('input',e=>{const q=norm(e.target.value);$('#fpick').innerHTML=cands.filter(p=>norm(p.n).includes(q)).slice(0,6).map(p=>`<label class="pk">${mav(p)}<span><b>${esc(p.n)}</b><small>${p.tit?'Titular':'Dependente'}</small></span><input type="radio" name="fp" value="${p.id}"></label>`).join('')||'<p class="who" style="padding:12px">Ninguém encontrado.</p>';});},
 doFam:(v,b)=>{const p=$('input[name=fp]:checked');if(!p){$('#fpick').animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'none'}],{duration:240});toast('Escolha uma pessoa da lista');return;}
  const m=byId(S.member),rel=$('input[name=rel]:checked').value,o=byId(p.value);b.classList.add('busy');setTimeout(()=>{m.fam.push([o.id,rel]);closeDlg();reTab();$$('.ptabs button').forEach(x=>{if(x.dataset.v==='familia')x.innerHTML=`Família<small>${m.fam.length}</small>`;});toast(`${o.n.split(' ')[0]} vinculado(a) como ${rel.toLowerCase()}`);},700);},
 unlink:v=>{const m=byId(S.member),f=m.fam[+v],o=byId(f[0]);confirmDel({title:`Desvincular ${o.n.split(' ')[0]}?`,body:`${o.n} deixa de aparecer na família de ${m.n.split(' ')[0]}. Os dois cadastros continuam existindo.`,label:'Desvincular',onConfirm:()=>{m.fam.splice(+v,1);reTab();toast(`${o.n.split(' ')[0]} desvinculado(a)`,()=>{m.fam.splice(+v,0,f);reTab();});}});},
 addMin:()=>{const m=byId(S.member);openDlg(`${dlgHead('Vincular a um ministério')}
   <div class="minpick">${MIN_ALL.filter(x=>!m.min.includes(x)).map((x,i)=>`<label><input type="radio" name="mn" value="${x}" ${i===0?'checked':''}><span>${x}</span></label>`).join('')}</div>
   <div class="fld" style="margin-top:14px"><span class="fl">Função</span><div class="yn" role="radiogroup">${['Membro da equipe','Líder','Apoio'].map((o,i)=>`<label><input type="radio" name="rl" value="${o}" ${i===0?'checked':''}><span>${o}</span></label>`).join('')}</div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" data-a="doMin">Vincular</button></div>`,'sm');},
 doMin:(v,b)=>{const m=byId(S.member),x=$('input[name=mn]:checked').value;b.classList.add('busy');setTimeout(()=>{m.min.push(x);m.role=$('input[name=rl]:checked').value;m.since='out/2026';closeDlg();render();toast(`${m.n.split(' ')[0]} agora serve em ${x}`);},700);},
 unMin:v=>{closePops();const m=byId(S.member),x=m.min[+v];confirmDel({title:`Remover ${m.n.split(' ')[0]} de ${x}?`,body:'A pessoa sai das próximas escalas deste ministério. O histórico de participação é mantido.',label:'Remover',onConfirm:()=>{m.min.splice(+v,1);render();toast(`Removido(a) de ${x}`,()=>{m.min.splice(+v,0,x);render();});}});},
 resetPw:(v,b)=>busy(b,900,'Link enviado',()=>toast(`Link de redefinição enviado para ${byId(S.member).e}`)),
 suspend:()=>{const m=byId(S.member);if(m.app.st==='suspensa'){m.app.st='ativo';reTab();toast('Acesso reativado');return;}
  openDlg(`${dlgHead('Suspender acesso ao app?',`${m.n.split(' ')[0]} não conseguirá entrar até você reativar. O cadastro continua intacto.`)}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn dang" data-a="doSuspend">Suspender acesso</button></div>`,'sm');},
 doSuspend:(v,b)=>{b.classList.add('busy');setTimeout(()=>{byId(S.member).app.st='suspensa';closeDlg();reTab();toast('Acesso suspenso');},700);},
 inactivate:()=>{closePops();const m=byId(S.member);openDlg(`${dlgHead('Inativar cadastro?',`${m.n.split(' ')[0]} sai das listas e escalas, mas o histórico é mantido. Você pode reativar quando quiser.`)}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="doInact">Inativar</button></div>`,'sm');},
 doInact:(v,b)=>{b.classList.add('busy');setTimeout(()=>{const m=byId(S.member),i=MEMBERS.indexOf(m);MEMBERS.splice(i,1);closeDlg();S.member=null;render();toast(`${m.n.split(' ')[0]} foi inativado(a)`,()=>{MEMBERS.splice(i,0,m);render();});},700);},
 delMember:()=>{closePops();const m=byId(S.member);openDlg(`${dlgHead('Excluir cadastro?','Esta ação não pode ser desfeita. Para confirmar, digite o primeiro nome.')}<label class="fld"><span class="fl">Digite “${m.n.split(' ')[0]}”</span><input id="delq" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn dang" data-a="doDel" disabled id="delb">Excluir definitivamente</button></div>`,'sm');
  $('#delq').addEventListener('input',e=>{$('#delb').disabled=e.target.value.trim().toLowerCase()!==m.n.split(' ')[0].toLowerCase();});},
 doDel:(v,b)=>{b.classList.add('busy');setTimeout(()=>{const m=byId(S.member);MEMBERS.splice(MEMBERS.indexOf(m),1);closeDlg();S.member=null;render();toast(`Cadastro de ${m.n.split(' ')[0]} excluído`);},800);},
};
function dupDlg(ps){const [a,c]=ps[S.dupI];
 const rowsC=[['E-mail','e'],['Telefone','ph'],['Integração','int'],['Status','st'],['Ministérios','min'],['Batizado(a)','bap']];
 const val=(m,k)=>k==='int'?monthLabel(m.int):k==='st'?ST[m.st].l:k==='min'?(m.min.join(', ')||'—'):k==='bap'?(m.bap?'Sim':'Não'):(m[k]||'—');
 openDlg(`${dlgHead(`Possível duplicado · ${ps.length>1?`1 de ${ps.length}`:''}`.replace(' · ',ps.length>1?' · ':''),`Compare os cadastros de ${a.n} e escolha qual manter.`)}
  <div class="cmp">${[a,c].map((m,i)=>`<label class="cmpc"><input type="radio" name="keep" value="${i?'c':'a'}" ${m.st==='integrado'||(!i&&a.st!=='integrado'&&c.st!=='integrado')?'checked':''}><span class="cmph">${mav(m)}<span><b>Manter este</b><small>Cadastro de ${monthLabel(m.int).toLowerCase()}</small></span><span class="rd"></span></span>
   <dl>${rowsC.map(r=>{const same=val(a,r[1])===val(c,r[1]);return `<div class="${same?'':'diff'}"><dt>${r[0]}</dt><dd>${esc(val(m,r[1]))}</dd></div>`;}).join('')}</dl></label>`).join('')}</div>
  <p class="who" style="margin:12px 0 0">Os campos marcados são diferentes. Ministérios e histórico do outro cadastro são trazidos para o que ficar.</p>
  <div class="dfoot"><button class="btn sec" data-a="notDup">São pessoas diferentes</button><button class="btn pri" data-a="merge">Mesclar cadastros</button></div>`,'lg');}

