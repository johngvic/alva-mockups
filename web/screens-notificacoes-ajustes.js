/* ================= Comunicação › Notificações: abas Automações, Modelos e Envios (ajuste pontual) =================
   O protótipo só mostra que existe: automações, modelos por tipo (e-mail e push no mesmo editor), lista de envios
   e o "Novo envio" imediato ou agendado. */
Object.assign(S,{put:'auto'});

/* Modelos: lista fixa de tipos de aviso; cada tipo tem um modelo por canal (e-mail e/ou push), versionado */
const NTT=[
 ['Identidade','Código de login',['E-mail']],['Identidade','Convite para entrar',['E-mail']],
 ['Casas','Encontro da casa marcado',['Push','E-mail']],['Casas','Pedido de entrada decidido',['Push','E-mail']],
 ['Ministérios','Tarefa atribuída',['Push','E-mail']],['Eventos','Lembrete de evento',['Push','E-mail']],
 ['Lembretes','Live ou culto',['Push']],['Datas','Feliz aniversário',['Push','E-mail']],['Datas','Boas-vindas',['E-mail','Push']],['Equipe','Pedido pendente na Secretaria',['Push','E-mail']]
].map((r,i)=>({id:'tp'+i,dom:r[0],n:r[1],sup:r[2],when:'2026-10-0'+(1+i%8),
 ch:Object.fromEntries(r[2].map((c,j)=>[c,{on:true,v:1+((i+j)%3),t:r[1]+' · {{igreja}}',m:'Olá, {{nome}}! '+(c==='E-mail'?'<p>Mensagem completa do aviso “'+r[1]+'”, com <b>formatação</b> e imagem.</p>':'Detalhes no app.')}]))}));
const ntTp=id=>NTT.find(x=>x.id===id);
const ntLim=ch=>ch==='Push'?180:5000;
const ntSample=s=>s.replace(/\{\{nome\}\}/g,'Marta').replace(/\{\{igreja\}\}/g,'Igreja Alva').replace(/\{\{[a-z]+\}\}/g,'…');

function puModelos(){
 return `<section class="card mtab rise" style="--d:2"><div class="tbar"><p class="who" style="margin:0">Um modelo por tipo de aviso, com texto próprio para cada canal (e-mail e push). Editar cria uma nova versão e o próximo aviso já usa a mais nova. Só a Comunicação edita.</p></div>
  <div class="cm-pl">${NTT.map(m=>`<div class="cm-pr enviado">
   <span class="cm-pd"><b>${m.sup.length}</b><small>${m.sup.length>1?'canais':'canal'}</small><em></em></span>
   <div class="cm-pt"><b>${esc(m.n)}</b><span>${esc(m.dom)} · atualizado em ${fmtD(m.when)}</span></div>
   <div class="cm-pm">${m.sup.map(c=>`<span class="cm-seg" style="${m.ch[c].on?'':'opacity:.5'}">${ic(c==='Push'?'bell':'mail',12)}${c} v${m.ch[c].v}${m.ch[c].on?'':' · desligado'}</span>`).join(' ')}</div>
   <div class="cm-ps"><span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span></div>
   <div class="cm-pa"><button class="btn sec sm" data-a="mdEdit" data-v="${m.id}">Editar</button></div></div>`).join('')}</div>
  <div class="tfoot"><span>${NTT.length} tipos de aviso</span><span>${ic('info',13)} A lista de tipos é fixa; a igreja não cria tipo novo.</span></div></section>`;
}

{const _pu=puPage;puPage=function(){
 if(S.pw)return _pu();
 let h=_pu();
 h=h.replace('<h1>Push e e-mail</h1><p class="lede">Avisos que chegam no celular e na caixa de entrada dos membros</p>','<h1>Notificações</h1><p class="lede">Automações, modelos e envios por push e e-mail</p>');
 h=h.replace(/<div class="k4"><span class="kl">Taxa de abertura<\/span>[\s\S]*?<\/div><\/section>/,`<div class="k4"><span class="kl">Automações ligadas</span><span class="kv">${AUTOS.filter(a=>a.on).length}</span><span class="kd">de ${AUTOS.length}</span></div></section>`);
 h=h.replace(/<small>\d+% abriram<\/small>/g,'');
 h=h.replace(' Automáticos</h2>',' Automações</h2>');
 const iA=h.indexOf('<section class="card cm-auto">'),iM=h.indexOf('<section class="card mtab rise"');
 if(iA<0||iM<0)return h;
 const eA=h.indexOf('</section>',iA)+10;
 const head=h.slice(0,iA)+'</div>',auto=h.slice(iA,eA),envios=h.slice(iM);
 const tabs=`<div class="ptabs" role="tablist" style="margin-top:6px">${[['auto','Automações'],['modelos','Modelos'],['envios','Envios']].map(t=>`<button role="tab" class="${S.put===t[0]?'on':''}" aria-selected="${S.put===t[0]}" data-a="puT" data-v="${t[0]}">${t[1]}</button>`).join('')}<span class="tind"></span></div>`;
 return head+tabs+(S.put==='modelos'?puModelos():S.put==='envios'?envios:`<div class="cm-pg rise" style="--d:2">${auto}</div>`);
};}

A.puT=v=>{S.put=v;cmRe();};

/* Editor do modelo: escolhe os canais (e-mail, push ou os dois) e escreve o texto de cada um, com prévia */
A.mdEdit=v=>{const m=ntTp(v);
 openDlg(`${dlgHead('Editar modelo · '+m.n,'Escolha por quais canais este aviso vai e escreva o texto de cada um. Salvar cria uma nova versão em cada canal alterado.')}
 <form id="mdF" class="fgrid one" novalidate>
  <div class="fld"><span class="fl">Canais</span><div class="cm-dpick">${m.sup.map(c=>`<label><input type="checkbox" name="ch" value="${c}" ${m.ch[c].on?'checked':''}><span>${c}</span></label>`).join('')}</div>${m.sup.length<2?'<small class="soft">Este aviso só existe por '+m.sup[0]+'.</small>':''}</div>
  ${m.sup.map(c=>`<fieldset class="fld mdch" data-ch="${c}" style="border:1px solid var(--line,rgba(0,0,0,.1));border-radius:12px;padding:12px;margin:0;${m.ch[c].on?'':'display:none'}">
   <legend class="fl" style="padding:0 6px">${c} · versão ${m.ch[c].v}</legend>
   <label class="fld"><span class="fl">${c==='E-mail'?'Assunto':'Título'}</span><input name="t-${c}" value="${esc(m.ch[c].t)}" autocomplete="off"></label>
   <label class="fld"><span class="fl">Mensagem <small>${c==='E-mail'?'aceita HTML e imagem':'texto simples e curto'}</small></span><textarea name="m-${c}" rows="4">${esc(m.ch[c].m)}</textarea><small class="soft" id="mdC-${c}"></small></label>
   <div class="fld"><span class="fl">Pré-visualização</span><div id="mdPv-${c}" style="background:var(--bg-soft,rgba(0,0,0,.04));border-radius:12px;padding:12px;font-size:.92em"></div></div></fieldset>`).join('')}
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="mdOk">Salvar nova versão</button></div></form>`,'lg');
 const f=$('#mdF'),ok=$('#mdOk');
 const val=()=>{let bad=false,any=false;m.sup.forEach(c=>{const on=f.querySelector('[name=ch][value="'+c+'"]').checked,box=f.querySelector('.mdch[data-ch="'+c+'"]');box.style.display=on?'':'none';if(!on)return;any=true;
   const t=f['t-'+c].value,mm=f['m-'+c].value,len=mm.length,lim=ntLim(c);let msg=len+' / '+lim+' caracteres';
   if(c==='Push'&&/<[a-z][\s\S]*>/i.test(mm)){msg='Push aceita só texto simples (sem HTML)';bad=true;}else if(len>lim){msg+=' — acima do limite';bad=true;}
   if(!t.trim()||!mm.trim())bad=true;
   $('#mdC-'+c).textContent=msg;$('#mdPv-'+c).innerHTML='<b>'+esc(ntSample(t))+'</b><div style="margin-top:6px">'+(c==='E-mail'?ntSample(mm):esc(ntSample(mm)))+'</div>';});
  ok.disabled=bad||!any;};
 f.addEventListener('input',val);f.addEventListener('change',val);val();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{
  m.sup.forEach(c=>{const x=m.ch[c],on=f.querySelector('[name=ch][value="'+c+'"]').checked;x.on=on;if(!on)return;const t=f['t-'+c].value.trim(),mm=f['m-'+c].value.trim();if(t!==x.t||mm!==x.m){x.v++;x.t=t;x.m=mm;}});
  m.when=NOWD;closeDlg();cmRe();toast('Modelo salvo — o próximo aviso já usa estes textos');},500);});};
