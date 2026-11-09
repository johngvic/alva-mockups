/* =========================================================
   FORMULÁRIOS COMPLETOS · demais módulos
   Usa o motor de screens-forms.js. Cada seção declara seus campos;
   as linhas de exemplo já existentes viram valores do formulário
   a partir do subtítulo (partes separadas por " · ").
   ========================================================= */
{
const B=t=>(k,l,o)=>Object.assign({k,l,t},o||{});
const tx=B('text'),ar=B('area'),dt=B('date'),tm=B('time'),nu=B('num'),mo=B('money'),lk=B('link'),im=B('image'),tg=B('tog');
const sl=(k,l,opts,o)=>Object.assign({k,l,t:'sel',opts},o||{}),mu=(k,l,opts,o)=>Object.assign({k,l,t:'multi',opts},o||{}),fl=(k,l,o)=>Object.assign({k,l,t:'file'},o||{});
const H=h=>({h}),half=o=>Object.assign({half:1},o||{});
const names=(m,s)=>LSD[m][s].rows.map(r=>r.n);
const PEOPLE=names('pessoas','Membros'),SALAS=names('kids','Salas'),MINIST=names('comunidade','Ministérios'),CASAS=names('comunidade','Casas de Apascentamento');
const FAIXAS=['0 a 2 anos','3 a 4 anos','5 a 6 anos','7 a 9 anos','10 a 12 anos'],PASTORES=['Pr. Rafael Pereira','Pr. Marcos Lima','Convidado'];
const conv=(f,p)=>{const t=f.t||'text';if(f.pre&&p.startsWith(f.pre))p=p.slice(f.pre.length);
 if(t==='date')return rfIso(p)||'';if(t==='num')return String(parseInt(p.replace(/\./g,''))||'');if(t==='money')return p.replace(/[^\d.,]/g,'');if(t==='multi')return [p];return p;};
const def=(mod,sec,o)=>{const c=LSD[mod][sec];Object.assign(c,o);
 c.rows.forEach(r=>{if(r.v)return;const parts=r.s.split(' · '),v={[c.main]:r.n},n=c.sub.length;
  c.sub.forEach((k,i)=>{const f=c.form.find(y=>y.k===k);if(!f||parts[i]==null)return;v[k]=conv(f,i===n-1?parts.slice(i).join(' · '):parts[i]);});
  if(c.seed)Object.assign(v,c.seed(r.s,r.n));r.v=v;});};

/* ---------- Pessoas ---------- */
def('pessoas','Membros',{main:'n',sub:['casa','desde'],form:[
 tx('n','Nome completo',{req:1,ph:'Ex.: Ana Costa'}),
 H('Contato'),tx('tel','Telefone',{ph:'(11) 90000-0000',half:1}),tx('email','E-mail',{ph:'nome@email.com',half:1}),
 H('Vida na igreja'),sl('casa','Casa de Apascentamento',CASAS),tx('desde','Membro desde',{pre:'desde ',ph:'2016'}),
 tg('batizado','Batizado',{hint:'Já passou pelo batismo nas águas'}),
 mu('min','Ministérios',MINIST.slice(0,6)),
 H('Pessoal'),dt('nasc','Nascimento',half()),sl('civil','Estado civil',['Solteiro(a)','Casado(a)','Viúvo(a)','Divorciado(a)']),
 ar('obs','Observações',{ph:'Anotações da liderança'})]});

/* ---------- Cuidado ---------- */


/* ---------- Espaços, Zeladoria e Almoxarifado ---------- */
def('zeladoria','Chamados',{main:'n',sub:['onde'],form:[
 tx('n','O que precisa de reparo',{req:1,ph:'Ex.: Lâmpada queimada'}),tx('onde','Onde',{ph:'Corredor · Térreo'}),
 sl('prio','Prioridade',['Baixa','Média','Alta']),im('foto','Foto do problema'),sl('resp','Responsável',PEOPLE),ar('desc','Detalhes')]});
def('zeladoria','Rotinas',{main:'n',sub:['freq'],form:[
 tx('n','Rotina',{req:1,ph:'Ex.: Limpeza do templo'}),tx('freq','Frequência',{ph:'Todo sábado · 9h'}),
 tx('local','Local'),sl('resp','Responsável',PEOPLE),ar('check','Lista de tarefas',{ph:'Uma por linha'})]});
/* ---------- Financeiro ---------- */
const CONTAS=names('financeiro','Contas financeiras'),CONTATOS=names('financeiro','Contatos'),PCC=LSD.financeiro['Plano e centros de custo'].rows,PLANO=PCC.filter(r=>r.k==='plano').map(r=>r.n),CCUSTO=PCC.filter(r=>r.k==='cc').map(r=>r.n);
const sgn=v=>(v.tipo==='Despesa'?'− ':'+ ')+'R$ '+v.valor;
def('financeiro','Lançamentos',{main:'n',sub:['data','valor'],
 subFn:v=>[v.data?rfDate(v.data).replace(/ \d{4}$/,''):'',v.valor?sgn(v):''].filter(Boolean).join(' · '),
 seed:s=>{const [d,x]=s.split(' · ');return {data:rfIso(d),tipo:/^[−-]/.test(x)?'Despesa':'Receita',valor:x.replace(/[^\d.,]/g,'')};},
 form:[tx('n','Descrição',{req:1,ph:'Ex.: Dízimos'}),sl('tipo','Tipo',['Receita','Despesa'],{def:1}),
 mo('valor','Valor',{req:1,half:1}),dt('data','Data',{half:1,req:1}),sl('conta','Conta',CONTAS),sl('cat','Categoria',PLANO),sl('cc','Centro de custo',CCUSTO),
 fl('comp','Comprovante',{multi:1,btn:'Anexar comprovante'}),ar('obs','Observações')]});
def('financeiro','Contas financeiras',{main:'n',sub:['banco','saldo'],form:[
 tx('n','Nome da conta',{req:1,ph:'Ex.: Conta principal'}),sl('banco','Banco',['Banco do Brasil','Caixa','Itaú','Bradesco','Nubank','Sicredi','Outro']),
 mo('saldo','Saldo inicial'),sl('tipo','Tipo',['Corrente','Poupança','Caixa físico']),tx('ag','Agência',{half:1}),tx('num','Conta',{half:1})]});
def('financeiro','Contas a pagar e a receber',{main:'n',sub:['tipo','venc','valor'],seed:()=>({rep:'Não repete'}),form:[
 sl('tipo','Tipo',['A pagar','A receber'],{def:1}),tx('n','Descrição',{req:1,ph:'Ex.: Conta de energia'}),mo('valor','Valor total',{req:1,half:1}),dt('venc','Primeiro vencimento',{pre:'Vence ',req:1,half:1}),
 sl('forn','Contato',CONTATOS),sl('cat','Conta do plano',PLANO),sl('cc','Centro de custo',CCUSTO),
 sl('rep','Repetição',['Não repete','Todo mês'],{def:1}),nu('par','Parcelas (1 a 60)',{if:['rep','Não repete'],ph:'1'}),
 fl('comp','Boleto ou nota',{multi:1}),ar('obs','Observações')]});
def('financeiro','Caixa de entrada',{main:'n',sub:['orig'],form:[
 tx('n','Descrição do documento',{req:1,ph:'Ex.: Nota do material de limpeza'}),fl('arq','Foto ou arquivo',{multi:1,acc:'image/*,.pdf',btn:'Tirar foto ou anexar'}),tx('orig','De onde veio',{ph:'Ex.: Envio manual · Rafael Pereira'})]});
def('financeiro','Caixas e vendas',{main:'n',sub:['resumo'],form:[
 tx('n','Nome do caixa',{req:1,ph:'Ex.: Cafeteria · hoje'}),sl('setor','Setor',['Cafeteria','Restaurante','Loja']),
 sl('resp','Responsável',PEOPLE),mo('ab','Valor de abertura'),tx('resumo','Resumo',{ph:'Ex.: R$ 77,00 em vendas'})]});
def('financeiro','Importar e conciliar',{main:'n',sub:['conta'],form:[
 tx('n','Nome da importação',{req:1,ph:'Ex.: Extrato de outubro'}),fl('arq','Arquivo do extrato',{req:1,acc:'.ofx,.csv,.xlsx,.pdf',btn:'Escolher extrato'}),
 sl('conta','Conta',CONTAS),tx('per','Período',{ph:'01/10 a 31/10'})]});
def('financeiro','Doações',{main:'n',sub:['valor','dest'],form:[
 tx('n','Doador',{req:1}),mo('valor','Valor',{req:1,half:1}),dt('data','Data',{half:1}),
 sl('dest','Destino',['Contribuição livre','Dízimo','Oferta','Missões','Construção']),sl('forma','Forma',['Pix','Cartão','Dinheiro','Transferência']),
 tg('recibo','Enviar recibo')]});
def('financeiro','Plano e centros de custo',{main:'n',sub:['cad'],
 subFn:v=>v.cad==='Centro de custo'?['Centro de custo',v.resp].filter(Boolean).join(' · '):[v.cad||'Conta do plano',v.tipo,v.cod].filter(Boolean).join(' · '),
 seed:s=>{const p=s.split(' · ');return p[0]==='Centro de custo'?{cad:p[0],resp:p[1]}:{cad:p[0],tipo:p[1],cod:p[2]};},
 form:[sl('cad','O que cadastrar',['Conta do plano','Centro de custo'],{def:1}),tx('n','Nome',{req:1,ph:'Ex.: Dízimos'}),
 sl('tipo','Tipo',['Receita','Despesa','Ativo','Passivo'],{if:['cad','Conta do plano']}),tx('cod','Código',{ph:'1.01',if:['cad','Conta do plano']}),
 sl('resp','Responsável',PEOPLE,{if:['cad','Centro de custo']}),mo('orc','Orçamento mensal',{if:['cad','Centro de custo']})]});
def('financeiro','Contatos',{main:'n',sub:['tipo','cat'],form:[
 tx('n','Nome',{req:1}),sl('tipo','Tipo',['Fornecedor','Doador','Prestador','Outro']),tx('cat','Categoria',{ph:'Ex.: energia'}),
 tx('doc','CPF ou CNPJ'),tx('tel','Telefone',{half:1}),tx('email','E-mail',{half:1}),ar('obs','Observações')]});
def('financeiro','Fechamentos',{main:'n',sub:['obs'],form:[
 tx('n','Mês de referência',{req:1,ph:'Outubro de 2026'}),ar('obs','Observações')]});
}
