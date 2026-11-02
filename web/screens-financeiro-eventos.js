/* ================= Financeiro: eventos pagos ================= */
Object.assign(A,{evFinRep:v=>{rpState('agenda','financeiro').f.ev=v;A.rptGo('agenda|financeiro');}});


/* ---------- Integração › fila de espera (ações) ---------- */
Object.assign(A,{
 igTop:v=>{S.igTop=v;render();},
 igCall:v=>{const p=IGFILA.find(x=>x.id===v),cur=INTEGS.find(g=>g.current);if(!cur){toast('Não há integração aberta. Crie uma nova integração.');return;}if(!igCallIds([v])){toast('Integração lotada: aumente o limite ou espere a próxima.');return;}render();toast(`${p.n.split(' ')[0]} chamado(a) para ${cur.n}. A pessoa recebe o aviso no app.`);},
 igCallN:()=>{const cur=INTEGS.find(g=>g.current);if(!cur){toast('Não há integração aberta.');return;}const k=igCallIds(IGFILA.map(x=>x.id));render();toast(k?`${k} ${k===1?'pessoa chamada':'pessoas chamadas'} para ${cur.n}.`:'Sem vaga na integração atual.');},
 igRm:v=>{const p=IGFILA.find(x=>x.id===v);confirmDel({title:`Remover ${p.n.split(' ')[0]} da fila?`,body:'A pessoa é avisada no app e pode entrar na fila de novo.',label:'Remover',onConfirm:()=>{IGFILA.splice(IGFILA.indexOf(p),1);render();toast('Removido(a) da fila');}});}
});
/* ---------- Integração › Regras ---------- */
Object.assign(A,{
 igRules:()=>{const v={lim:INTR.max?'lim':'inf',n:INTR.max||30,aceite:INTR.aceite,cert:INTR.cert?'sim':'nao'};const limSub=l=>l==='lim'?'Padrão ao criar uma integração':'Sem teto de pessoas por integração';window._igR=v;
  const step=(id,val)=>`<div class="igr-fold ${v.lim==='lim'?'open':''}" id="igRfold"${v.lim==='lim'?'':' inert'}><div><div class="igr-step"><span>Pessoas por integração</span><div class="lm2-step"><button type="button" data-s="${id}|-1" aria-label="Diminuir">${ic('minus',15,2.4)}</button><output><b id="igR${id}">${val}</b></output><button type="button" data-s="${id}|1" aria-label="Aumentar">${ic('plus',15,2.4)}</button></div></div></div></div>`;
  const ch=(id,lab,sub,opts)=>`<div class="bb-rr"><div class="dkt"><b>${lab}</b><span>${sub}</span></div><div class="chips" data-ch="${id}">${opts.map(o=>`<button type="button" class="chipf ${v[id]===o[0]?'on':''}" data-v="${o[0]}">${o[1]}</button>`).join('')}</div></div>`;
  const fx=(lab,sub)=>`<div class="igr-fr"><b>${lab}</b><span>${sub}</span></div>`;
  openDlg(`${dlgHead('Regras da integração','Valem para os pedidos feitos pelo app.')}<div class="bb-rules"><div class="igr-card">${ch('lim','Limite de pessoas',limSub(v.lim),[['lim','Limitado'],['inf','Sem limite']]).replace('<span>','<span id="igRlimS">')}${step('n',v.n)}${ch('aceite','Aceite dos pedidos','Automático aceita enquanto houver vaga',[['manual','Manual'],['auto','Automático']])}${ch('cert','Certificado de conclusão','Secretaria pode emitir ao concluir',[['nao','Não'],['sim','Sim']])}</div><div class="igr-h"><span>Regras fixas</span><span class="bb-lock">${ic('lock',13,2)}Sempre valem</span></div><div class="igr-fx">${fx('Membro só após concluir a integração','Convite de acesso não torna ninguém membro')}${fx('Uma integração atual por igreja','Ao lotar, os pedidos vão para a fila de espera')}${fx('Fila de espera','Integração lotada, fora da janela ou inexistente · por ordem de chegada')}${fx('Quem recebe os pedidos','O responsável aceita ou recusa (no aceite manual)')}</div></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="igRulesSave">Salvar</button></div>`,'sm');
  const lim={n:[5,200,5]};
  $('.bb-rules').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b){const [k,d]=b.dataset.s.split('|');v[k]=Math.max(lim[k][0],Math.min(lim[k][1],v[k]+ +d*lim[k][2]));$('#igR'+k).textContent=v[k];return;}
   const c=e.target.closest('[data-ch] .chipf');if(c){const g=c.parentElement;v[g.dataset.ch]=c.dataset.v;g.querySelectorAll('.chipf').forEach(z=>z.classList.toggle('on',z===c));if(g.dataset.ch==='lim'){const f=$('#igRfold');f.classList.toggle('open',c.dataset.v==='lim');f.toggleAttribute('inert',c.dataset.v!=='lim');const t=$('#igRlimS');t.classList.add('sw');setTimeout(()=>{t.textContent=limSub(c.dataset.v);t.classList.remove('sw');},120);}}});},
 igRulesSave:()=>{const v=window._igR;Object.assign(INTR,{max:v.lim==='inf'?0:v.n,aceite:v.aceite,cert:v.cert==='sim'});closeDlg();render();toast('Regras da integração salvas');}
});

