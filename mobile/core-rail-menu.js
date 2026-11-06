/* ---------- Lateral: "Ir para a tela" como seletor ----------
   Os botões continuam existindo (escondidos em #railNav) porque vários arquivos registram telas e tratam o clique neles;
   o seletor espelha a lista e dispara o clique no botão certo. */
(function(){const sel=$('#railSel'),nav=$('#railNav');if(!sel||!nav)return;
 const sync=()=>{const bs=$$('button',nav),cur=bs.find(b=>b.getAttribute('aria-current')==='true');
  const html='<option value="" disabled>Escolher tela…</option>'+bs.map(b=>`<option value="${b.dataset.s}">${esc(b.textContent)}</option>`).join('');
  if(sel.dataset.h!==html){sel.innerHTML=html;sel.dataset.h=html;}
  sel.value=cur?cur.dataset.s:'';};
 sel.addEventListener('change',()=>{const b=$$('button',nav).find(x=>x.dataset.s===sel.value);if(b)b.click();});
 new MutationObserver(sync).observe(nav,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-current']});sync();})();
/* "Entrar como" fica logo abaixo de "Perfil de acesso" (e do seletor "Líder de", quando visível) */
(function(){const dm=$('#demoUsers'),role=$('#roleSeg');if(!dm||!role)return;const sec=dm.closest('.rail-sec'),base=role.closest('.rail-sec'),lid=$('#liderSec');(lid&&lid.previousElementSibling===base?lid:base).after(sec);})();
