
/* =========================================================
   AGENDA › EVENTOS · check-in na porta e ingressos (como no web)
   Aparecem como dois botões na ficha do evento.
   ========================================================= */
{
const TK={};
const tkOf=n=>TK[n]||(TK[n]=n==='Conferência Anual 2026'?[{n:'Inscrição geral',p:'80,00',q:120,s:84},{n:'Estudante',p:'40,00',q:30,s:12}]:[]);
const insOf=r=>LSD.agenda['Inscrições'].rows.filter(x=>x.v&&x.v.evento===r.n&&x.st!=='ca');
LSD.agenda['Eventos'].extra=r=>`<div class="row g3"><button class="btn outline md grow" data-a="evCk" data-v="${r.id}">Check-in</button><button class="btn outline md grow" data-a="evTk" data-v="${r.id}">Ingressos</button></div>`;
const ckLine=(x,i)=>`<div class="vr">${pavM(x.n,lsAv[i%6])}<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(x.n)}</span><span class="vs">${x.ck?'Presente':'Aguardando'}</span></span><button class="btn ${x.ck?'primary':'outline'} sm" data-a="evCkT" data-v="${x.id}" id="ck-${x.id}">${x.ck?'Presente':'Check-in'}</button></div>`;
Object.assign(A,{
 evCk:id=>{const r=lsRow(id),l=insOf(r),n=l.filter(x=>x.ck).length;
  sheet(`<div class="stack g5"><div class="row between" style="align-items:baseline"><h3 class="t2">Check-in</h3><span class="vs" id="ckN">${n} de ${l.length} presentes</span></div><p class="callout">${esc(r.n)}</p>
  ${l.length?`<div class="vl">${l.map(ckLine).join('')}</div>`:vsEmpty('Sem inscritos','As inscrições deste evento aparecem aqui.')}
  <button class="btn outline md block" data-a="lsOpen" data-v="${id}">Voltar</button></div>`);},
 evCkT:iid=>{const x=LSD.agenda['Inscrições'].rows.find(y=>y.id===iid);x.ck=!x.ck;const b=$('#ck-'+iid);if(b){b.className='btn '+(x.ck?'primary':'outline')+' sm';b.textContent=x.ck?'Presente':'Check-in';b.previousElementSibling.lastElementChild.textContent=x.ck?'Presente':'Aguardando';}
  const l=insOf({n:x.v.evento}),n=$('#ckN');if(n)n.textContent=l.filter(y=>y.ck).length+' de '+l.length+' presentes';},
 evTk:id=>{const r=lsRow(id),l=tkOf(r.n);
  sheet(`<div class="stack g5"><h3 class="t2">Ingressos</h3><p class="callout">${esc(r.n)}</p>
  ${l.length?`<div class="vl">${l.map(t=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(t.n)}</span><span class="vs">R$ ${t.p} · ${t.s} de ${t.q} vendidos</span></span>${vsTag(t.s>=t.q?'off':'ok',t.s>=t.q?'Esgotado':'À venda')}</div>`).join('')}</div>`:vsEmpty('Sem ingressos','Crie o primeiro tipo de ingresso deste evento.')}
  <div class="row g3"><button class="btn outline md grow" data-a="lsOpen" data-v="${id}">Voltar</button><button class="btn primary md grow" data-a="evTkNew" data-v="${id}">Novo ingresso</button></div></div>`);},
 evTkNew:id=>{const r=lsRow(id);
  sheet(`<div class="stack g5"><h3 class="t2">Novo ingresso</h3>${field({id:'tk_n',label:'Nome',ph:'Ex.: Inscrição geral'})}<div class="row g3">${field({id:'tk_p',label:'Preço',ph:'0,00',im:'decimal'})}${field({id:'tk_q',label:'Quantidade',ph:'100',im:'numeric'})}</div>
  <div class="row g3"><button class="btn outline md grow" data-a="evTk" data-v="${id}">Cancelar</button><button class="btn primary md grow" id="tkOk">Salvar</button></div></div>`,sh=>$('#tkOk',sh).addEventListener('click',()=>{
   const n=val('tk_n'),q=parseInt(val('tk_q'),10);let bad=0;if(!n){setErr('tk_n','Preencha este campo.');bad=1;}if(!(q>0)){setErr('tk_q','Informe a quantidade.');bad=1;}if(bad)return;
   tkOf(r.n).push({n,p:val('tk_p')||'0,00',q,s:0});A.evTk(id);toast('success','Ingresso criado',n);}));}
});
}
