/* ================= Financeiro: eventos pagos ================= */
function evFinRows(){
 return EVTS.filter(e=>e.st==='confirmado'&&evMoney(e)&&e.regs.length).map(e=>{evEnsure(e);
  const paid=e.regs.filter(r=>r.pay==='pago'),pend=e.regs.filter(r=>r.pay==='pendente'),sum=(l,f)=>l.reduce((a,r)=>a+f(r),0),net=r=>regTot(e,r)-regFee(e,r);
  const gross=sum(paid,r=>regTot(e,r)),fees=sum(paid,r=>regFee(e,r));
  return {e,gross,fees,net:gross-fees,pend:sum(pend,r=>regTot(e,r)),netPaid:sum(paid,net),netAll:sum(paid,net)+sum(pend,net),posted:past(e)?gross-fees:0};});
}
/* a lista de recebimentos acompanha as inscrições reais dos eventos */
function evRecebSync(){
 for(let i=RECEB.length-1;i>=0;i--)if(/^(ev-|cr1$|cr3$)/.test(RECEB[i].id))RECEB.splice(i,1);
 evFinRows().forEach(x=>{if(x.netAll>0)RECEB.push({id:'ev-'+x.e.id,desc:x.e.t+' — inscrições',prev:x.e.d,v:Math.round(x.netAll*100)/100,got:Math.round(x.netPaid*100)/100,src:'Inscrições · líquido de taxas'});});
}
function evFinCard(){
 const rows=evFinRows(),t=k=>rows.reduce((a,x)=>a+x[k],0);
 return `<div class="fd-fin"><div class="fd-fin-h">${kTile({c:'var(--tone-lima-ink)',ic:'ticket'},36)}<span class="dkt"><b>Eventos pagos</b><span>${rows.length} ${rows.length===1?'evento':'eventos'} com inscrições</span></span></div>
  <div class="fd-ln"><span>Vendido (bruto)</span><b>${brl2(t('gross'))}</b></div>
  <div class="fd-ln"><span>Recebido líquido</span><b style="color:var(--st-int)">${brl2(t('net'))}</b></div>
  <div class="fd-ln"><span>A receber</span><b>${brl2(t('pend'))}</b></div>
  <div class="fd-ln"><span>Lançado em Receitas</span><b>${brl2(t('posted'))}</b></div>
  <button class="lnk" data-a="evFinGo">Ver eventos ${ic('arrowR',13)}</button></div>`;
}
{const _v=fVis;fVis=()=>{evRecebSync();return _v();};const _r=fRec;fRec=()=>{evRecebSync();return _r();};}
Object.assign(A,{evFinGo:()=>{const f=S.rpSt['agenda/financeiro'];if(f)f.f.ev='todos';A.rptGo('agenda|financeiro');},
 evFinRep:v=>{rpState('agenda','financeiro').f.ev=v;A.rptGo('agenda|financeiro');}});


/* ---------- Integração › fila de espera (ações) ---------- */
Object.assign(A,{
 igTop:v=>{S.igTop=v;render();},
 igCall:v=>{const p=IGFILA.find(x=>x.id===v),cur=INTEGS.find(g=>g.current);if(!cur){toast('Não há integração aberta. Crie uma nova integração.');return;}if(!igCallIds([v])){toast('Integração lotada: aumente o limite ou espere a próxima.');return;}render();toast(`${p.n.split(' ')[0]} chamado(a) para ${cur.n}. A pessoa recebe o aviso no app.`);},
 igCallN:()=>{const cur=INTEGS.find(g=>g.current);if(!cur){toast('Não há integração aberta.');return;}const k=igCallIds(IGFILA.map(x=>x.id));render();toast(k?`${k} ${k===1?'pessoa chamada':'pessoas chamadas'} para ${cur.n}.`:'Sem vaga na integração atual.');},
 igRm:v=>{const p=IGFILA.find(x=>x.id===v);confirmDel({title:`Remover ${p.n.split(' ')[0]} da fila?`,body:'A pessoa é avisada no app e pode entrar na fila de novo.',label:'Remover',onConfirm:()=>{IGFILA.splice(IGFILA.indexOf(p),1);render();toast('Removido(a) da fila');}});}
});
/* ---------- Integração › Regras ---------- */
Object.assign(A,{
 igRules:()=>{const v={max:INTR.max,aceite:INTR.aceite,cert:INTR.cert?'sim':'nao'};window._igR=v;
  const step=(id,lab,sub,val)=>`<div class="bb-rr"><div class="dkt"><b>${lab}</b><span>${sub}</span></div><div class="lm2-step"><button type="button" data-s="${id}|-1">${ic('minus',15,2.4)}</button><output><b id="igR${id}">${val}</b></output><button type="button" data-s="${id}|1">${ic('plus',15,2.4)}</button></div></div>`;
  const ch=(id,lab,sub,opts)=>`<div class="bb-rr"><div class="dkt"><b>${lab}</b><span>${sub}</span></div><div class="chips" data-ch="${id}">${opts.map(o=>`<button type="button" class="chipf ${v[id]===o[0]?'on':''}" data-v="${o[0]}">${o[1]}</button>`).join('')}</div></div>`;
  const fx=(lab,sub,icn)=>`<div class="bb-rr fixed"><div class="dkt"><b>${lab}</b><span>${sub}</span></div><span class="bb-lock">${ic(icn||'lock',13,2)}Sempre</span></div>`;
  openDlg(`${dlgHead('Regras da integração','Valem para os pedidos feitos pelo app.')}<div class="bb-rules">
   ${step('max','Limite de pessoas','padrão ao criar uma integração; ∞ é sem limite',v.max||'∞')}   ${ch('aceite','Aceite dos pedidos','automático aceita sozinho enquanto houver vaga',[['manual','Manual'],['auto','Automático']])}${ch('cert','Certificado de conclusão','se ligado, a secretaria pode emitir o certificado de integração',[['nao','Não'],['sim','Sim']])}
   ${fx('Só a integração concluída habilita membro','Convite de acesso nunca transforma pessoa em membro')}${fx('Uma integração atual por igreja','Os pedidos novos entram nela; ao lotar, não aceita mais e o pedido vai para a fila de espera')}${fx('Fila de espera','Quem pede com a integração lotada, fora da janela de pedidos ou sem integração aberta entra na fila, por ordem de chegada','clock')}${fx('Quem recebe os pedidos','O responsável da integração aceita ou recusa (no aceite manual)')}</div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="igRulesSave">Salvar</button></div>`,'sm');
  const lim={max:[0,200,5]};
  $('.bb-rules').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b){const [k,d]=b.dataset.s.split('|');v[k]=Math.max(lim[k][0],Math.min(lim[k][1],v[k]+ +d*lim[k][2]));$('#igR'+k).textContent=k==='max'&&!v[k]?'∞':v[k];return;}
   const c=e.target.closest('[data-ch] .chipf');if(c){const g=c.parentElement;v[g.dataset.ch]=c.dataset.v;g.querySelectorAll('.chipf').forEach(z=>z.classList.toggle('on',z===c));}});},
 igRulesSave:()=>{const v=window._igR;Object.assign(INTR,{max:v.max,aceite:v.aceite,cert:v.cert==='sim'});closeDlg();render();toast('Regras da integração salvas');}
});

