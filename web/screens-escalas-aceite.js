/* ================= Escalas › aceite pessoal e permissões ================= */
(()=>{const k=ESCALAS.find(z=>z.id==='es2');if(k){k.dates[0].blocks[3].members.push({n:ME.n,role:'Apoio',st:'aguardando'});}
 ESCALAS.push({id:'es7',n:'Escala Recepção — Outubro',min:'Recepção',desc:'Cultos de domingo.',st:'aguardando',dates:[DT('ev3',[BK('Culto inteiro',[['Felipe Andrade','Porta principal'],[ME.n,'Porta principal','aguardando']],[],'Domingo manhã')])]});})();
/* quem gerencia a escala: administrador ou líder do ministério (ME.perfil: 'admin' | 'lider' | 'membro') */
const ESLEADS=['Recepção'];
const esCanManage=x=>!!x&&ME.perfil!=='membro'&&(ME.perfil==='lider'?ESLEADS.includes(x.min):true);
const esMine=m=>m.n===ME.n;
const esInv=()=>{const r=[];ESCALAS.forEach(x=>x.dates.forEach(d=>d.blocks.forEach(b=>b.members.forEach((m,mi)=>{if(esMine(m)&&m.st==='aguardando'&&!esIsPast(d))r.push({x,d,b,m,ref:x.id+'|'+d.id+'|'+b.id+'|'+mi});}))));return r.sort((a,b)=>{const ea=eById(a.d.ev),eb=eById(b.d.ev);return (ea.d||'')<(eb.d||'')?-1:1;});};
const esInvFind=ref=>{const [xi,di,bi,mi]=ref.split('|'),x=esById(xi),d=x.dates.find(z=>z.id===di),b=d.blocks.find(z=>z.id===bi);return {x,d,b,m:b.members[+mi],ev:eById(d.ev)};};
{const o=msPill;msPill=function(m,clickable,ref){if(clickable&&!esCanManage(esById(S.esc)))return o(m,false,ref);return o.apply(this,arguments);};}
const esInvRow=i=>{const e=eById(i.d.ev);return `<div class="inv"><span class="edt"><small>${wd(e.d)}</small><b>${+e.d.slice(8)}</b><small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(e.t)}</b><span>${esc(i.m.role)} · ${esc(i.x.min)}${e.time?' · '+esc(e.time):''}</span></span><span class="inv-a"><button class="btn sec sm" data-a="esMeNo" data-v="${i.ref}">Recusar</button><button class="btn pri sm" data-a="esMeOk" data-v="${i.ref}">${ic('check',14,2.4)}Aceitar</button></span></div>`;};
{const o=myAgenda;myAgenda=function(){const h=o.apply(this,arguments),l=esInv();if(!l.length)return h;
  const card=`<section class="card pc inv-card" style="grid-column:1/-1"><div class="sh"><h2>Convites de escala</h2><span class="who">${l.length} aguardando sua resposta</span></div><p class="who" style="margin:-6px 0 12px">A liderança só conta com você depois que aceitar. Se não puder, recuse para que alguém seja chamado.</p><div class="clist">${l.map(esInvRow).join('')}</div></section>`;
  return h.replace('<div class="pgrid">','<div class="pgrid">'+card);};}
{const o=escDetail;escDetail=function(){const h=o.apply(this,arguments),x=esById(S.esc);if(!x)return h;
  const l=esInv().filter(i=>i.x.id===x.id);if(!l.length)return h;
  const ban=l.map(i=>{const e=eById(i.d.ev);return `<div class="inv-ban rise"><span class="kfi">${ic('mail',16)}</span><span class="dkt"><b>Você foi escalado(a) como ${esc(i.m.role)}</b><span>${esc(e.t)} · ${fmtD(e.d)}. Confirme sua presença para a liderança.</span></span><span class="inv-a"><button class="btn sec" data-a="esMeNo" data-v="${i.ref}">Recusar</button><button class="btn pri" data-a="esMeOk" data-v="${i.ref}">${ic('check',15,2.4)}Aceitar</button></span></div>`;}).join('');
  return h.replace('</header>','</header>'+ban);};}
Object.assign(A,{
 esMeOk:ref=>{const {x,m,ev}=esInvFind(ref);m.st='confirmado';const my={t:`${x.min} · ${ev.t}`,min:x.min,d:ev.d,role:m.role};MYESC.push(my);MYESC.sort((a,b)=>a.d<b.d?-1:1);render();
  toast(`Presença confirmada em ${fmtD(ev.d)}`,()=>{m.st='aguardando';MYESC.splice(MYESC.indexOf(my),1);render();});},
 esMeNo:ref=>{const {x,m,ev}=esInvFind(ref);
  openDlg(`${dlgHead('Recusar escala',`${esc(ev.t)} · ${fmtD(ev.d)} · ${esc(m.role)}`)}<form id="enF" novalidate><p class="fl" style="margin:0 0 8px">Motivo</p><div class="en-w">${['Viagem','Trabalho','Saúde','Compromisso familiar','Outro'].map((w,i)=>`<button type="button" class="en-c ${i?'':'on'}" data-w="${w}">${w}</button>`).join('')}</div>
   <label class="fld" style="margin-top:14px"><span class="fl">Observação <small>opcional, a liderança recebe junto</small></span><input name="obs" placeholder="Ex.: posso na próxima semana"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Voltar</button><button type="submit" class="btn pri">Recusar escala</button></div></form>`,'sm');
  const f=$('#enF');f.querySelectorAll('.en-c').forEach(b=>b.onclick=()=>{f.querySelectorAll('.en-c').forEach(z=>z.classList.toggle('on',z===b));});
  f.onsubmit=e2=>{e2.preventDefault();const w=f.querySelector('.en-c.on').dataset.w,o=f.obs.value.trim();m.st='recusado';m.why=w+(o?' · '+o:'');closeDlg();render();
   toast(`Recusa enviada à liderança de ${x.min}`,()=>{m.st='aguardando';delete m.why;render();});};},
});
/* seletor de time */
A.esTeam=v=>{const {x,b}=refB(v),ts=teamsFor(x.min);
 const row=(t,i)=>{const m=[...new Set(t.m)],ja=m.filter(n=>b.members.some(z=>z.n===n)).length,sh=m.slice(0,4);
  return `<label class="tmc"><input type="radio" name="tm" value="${i}" ${!i?'checked':''}><span class="tmc-i">${ic('users',18)}</span><span class="tmc-b"><b>${esc(t.n)}</b><small>${m.length?m.length+(m.length===1?' pessoa':' pessoas')+(ja?` · ${ja} já no bloco`:''):'Sem pessoas'}</small>${m.length?`<span class="tmc-av">${sh.map(n=>`<span class="av" title="${esc(n)}" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`).join('')}${m.length>4?`<em>+${m.length-4}</em>`:''}<span class="tmc-n">${esc(m.slice(0,2).map(n=>n.split(' ')[0]).join(', '))}${m.length>2?' e outros':''}</span></span>`:''}</span><span class="tmc-r"></span></label>`;};
 openDlg(`${dlgHead('Adicionar time',`Times de ${esc(x.min)}. Todas as pessoas do time entram em “${esc(b.label)}”.`)}<div class="tmc-l">${ts.length?ts.map(row).join(''):'<p class="who" style="padding:12px">Este ministério ainda não tem times. Crie em Comunidade › Ministérios.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoTeam" data-v="${v}" ${ts.length?'':'disabled'}>Adicionar time</button></div>`,'sm');};
