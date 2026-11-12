/* Alva PDV · equipamentos e testes de conectividade (leitor, impressora, maquininha).
   Nada fica "às cegas": cada equipamento tem um botão de teste que mostra, passo a passo, se está funcionando.
   Tudo simulado no protótipo; a faixa de cima tem uma chave para simular equipamentos com defeito. */
const TEST0 = () => ({ leitor: { state: 'idle' }, imp: { state: 'idle' }, maq: { state: 'idle', steps: [] } });
function testState() { if (!S.test) S.test = TEST0(); return S.test; }
const testedAt = k => (S.cfg.tested || {})[k];
function stamp(k) { S.cfg.tested = S.cfg.tested || {}; S.cfg.tested[k] = Date.now(); save(); }
function untest(k) { if (S.cfg.tested) { delete S.cfg.tested[k]; save(); } S.test = S.test || TEST0(); if (k === 'maq') S.test.maq = { state: 'idle', steps: [] }; if (k === 'imp') S.test.imp = { state: 'idle' }; }
const tbox = (k, inner) => `<div class="tbox" id="t_${k}">${inner}</div>`;
function paintTest(k) { const el = $('#t_' + k); if (el) el.innerHTML = testHTML(k); }
const TEF_ADQ = ['Cielo', 'Getnet', 'Stone', 'Rede', 'Outra'];

/* ---------- barra de status dos equipamentos (topo da janela) ---------- */
function eqStatus() {
  const c = S.cfg, t = k => testedAt(k);
  return [
    { k: 'leitor', ic: 'scan', cls: t('leitor') ? 'ok' : 'wait', tip: t('leitor') ? 'Leitor testado' : 'Leitor ainda não testado (a digitação do código funciona sempre)' },
    { k: 'imp', ic: 'printer', cls: c.printer === 'none' ? 'off' : t('imp') ? 'ok' : 'wait', tip: c.printer === 'none' ? 'Sem impressora: comprovante por e-mail' : t('imp') ? 'Impressora testada' : 'Impressora ainda não testada' },
    { k: 'maq', ic: 'card', cls: (c.mach === 'solta' || c.mach === 'none') ? 'off' : t('maq') ? 'ok' : 'wait', tip: c.mach === 'none' ? 'Sem maquininha: o PDV não aceita cartão' : c.mach === 'solta' ? 'Maquininha solta: o operador registra' : t('maq') ? 'Maquininha testada' : 'Maquininha ainda não testada' }
  ];
}
function eqChips() { return `<span class="eqs" role="group" aria-label="Equipamentos">${eqStatus().map(e => `<button class="eq ${e.cls}" data-a="go" data-v="config" title="${esc(e.tip)}" aria-label="${esc(e.tip)}">${ic(e.ic)}<i></i></button>`).join('')}</span>`; }
function eqSummary() { return eqStatus().map(e => e.tip.split(' (')[0]).join(' · '); }

/* ---------- maquininhas do cadastro (amarradas ao centro de custo) ---------- */
const curLoja = () => (S.setup && S.setup.lojaId) || (S.term && S.term.lojaId) || S.lojaId;
const curIgreja = () => (S.setup && S.setup.igrejaId) || (S.term && S.term.igrejaId) || 'sede';
const curPdv = () => (S.term && S.term.code) || '';
const maqSel = () => S.maqs.find(x => x.code === S.cfg.maq);
function syncMaqUse() {
  const pdv = curPdv(); if (!pdv) return;
  S.maqs.forEach(mq => { mq.usedBy = mq.usedBy.filter(c => c !== pdv); });
  const sel = maqSel(); if (sel && !sel.usedBy.includes(pdv)) sel.usedBy.push(pdv);
}
function maqCard(mq) {
  const pdv = curPdv(), outros = mq.usedBy.filter(c => c !== pdv), on = S.cfg.maq === mq.code;
  const detalhe = mq.tipo === 'nuvem' ? 'Terminal ' + mq.terminal : mq.tipo === 'tef' ? 'Pinpad no computador · ' + mq.adq : 'O operador registra o pagamento';
  return `<button class="opt" data-a="maqPick" data-v="${mq.code}" aria-pressed="${on}"><span class="rad"></span><span style="flex:1;min-width:0"><b>${esc(mq.nome)}</b><span class="d" style="font-family:var(--mono)">${esc(mq.code)} · ${esc(mq.adq)}</span><span class="d">${esc(detalhe)}</span><span class="d">${outros.length ? 'Também usada por ' + outros.map(esc).join(', ') : 'Nenhum outro PDV usa esta maquininha'}</span></span><span class="chips2"><span class="tg ${mq.tipo === 'solta' ? 'mut' : 'ok'}">${TIPOS_MAQ[mq.tipo]}</span><span class="tg mut">${esc(CENTROS[mq.centro])}</span></span></button>`;
}

/* ---------- os três painéis ---------- */
function equipPanels() {
  const c = S.cfg, lojaId = curLoja(), ig = curIgreja();
  const ok = S.maqs.filter(x => x.ativo && x.igrejaId === ig && x.centro === lojaId), fora = S.maqs.filter(x => x.ativo && x.igrejaId === ig && x.centro && x.centro !== lojaId), aguard = S.maqs.filter(x => x.ativo && x.igrejaId === ig && !x.centro);
  const sel = maqSel(), outros = sel ? sel.usedBy.filter(x => x !== curPdv()) : [];
  const machTest = !sel ? `<p class="note">Sem maquininha, este PDV não aceita cartão (dinheiro e Pix continuam).</p>`
    : sel.tipo === 'solta' ? `<p class="note">A maquininha solta não se conecta ao PDV: o cliente passa o cartão e o operador registra. Não há o que testar. A venda guarda o código ${esc(sel.code)} para a conciliação.</p>`
    : tbox('maq', testHTML('maq'));
  return `<div class="two"><div class="panel"><h3>${ic('scan')} Leitor de código de barras ${tbadge('leitor')}</h3><div class="cont pc">
     <p class="note">O leitor USB simples funciona como um teclado: lê o código e aperta Enter. O PDV só fica escutando durante o teste.</p>${tbox('leitor', testHTML('leitor'))}</div></div>
   <div class="panel"><h3>${ic('printer')} Impressora ${c.printer === 'none' ? '' : tbadge('imp')}</h3><div class="cont pc">
     <div class="field"><label for="prn">Impressora do comprovante</label><select class="inp" id="prn">${IMPRESSORAS.map(x => `<option value="${x.id}" ${c.printer === x.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></div>
     <div class="field"><label>Largura do papel</label><div class="seg" style="align-self:flex-start">${[['58', '58 mm'], ['80', '80 mm'], ['A4', 'Folha comum']].map(x => `<button data-a="cfg" data-k="paper" data-v="${x[0]}" aria-pressed="${c.paper === x[0]}">${x[1]}</button>`).join('')}</div></div>
     ${c.printer === 'none' ? `<p class="note">Sem impressora, o comprovante só vai por e-mail.</p>` : tbox('imp', testHTML('imp'))}</div></div></div>
   <div class="panel"><h3>${ic('card')} Maquininha ${sel && sel.tipo !== 'solta' ? tbadge('maq') : ''}</h3><div class="cont pc">
     <p class="note">As maquininhas vêm do cadastro do Alva Web (Financeiro › Maquininhas). Só aparecem as do centro de custo desta loja: <b>${esc(CENTROS[lojaId])}</b>.</p>
     ${ok.length ? ok.map(maqCard).join('') : `<div class="banner">${ic('card')}<span>Nenhuma maquininha cadastrada para ${esc(CENTROS[lojaId])}. Cadastre em Alva Web › Financeiro › Contas financeiras › Maquininhas.</span></div>`}
     <button class="opt" data-a="maqPick" data-v="" aria-pressed="${!c.maq}"><span class="rad"></span><span><b>Nenhuma maquininha</b><span class="d">Este PDV não aceita cartão. Dinheiro e Pix continuam.</span></span></button>
     ${fora.length ? `<p class="note">${fora.length} ${fora.length === 1 ? 'maquininha de outro centro de custo não aparece' : 'maquininhas de outros centros de custo não aparecem'} (${[...new Set(fora.map(x => CENTROS[x.centro]))].map(esc).join(', ')}): uma maquininha só serve ao centro de custo dela.</p>` : ''}
     ${aguard.length ? `<p class="note">${aguard.length} ${aguard.length === 1 ? 'maquininha recém-cadastrada aguarda' : 'maquininhas recém-cadastradas aguardam'} o vínculo ao centro de custo pelo Financeiro (${aguard.map(x => esc(x.nome)).join(', ')}): ainda não podem ser usadas.</p>` : ''}
     ${outros.length ? `<div class="banner info">${ic('refresh')}<span>Esta maquininha também é usada por ${outros.map(esc).join(', ')}. Pode ser, mas ela atende um pagamento por vez. O Financeiro vê quais PDVs usam cada maquininha.</span></div>` : ''}
     ${machTest}</div></div>`;
}
const tbadge = k => testedAt(k) ? `<span class="tg ok">Testado em ${dmy(testedAt(k))}</span>` : `<span class="tg wait">Ainda não testado</span>`;

/* ---------- o que aparece dentro de cada caixa de teste ---------- */
function stepsHTML(steps) {
  return `<ul class="tsteps">${steps.map(s => `<li class="${s.st}"><i>${s.st === 'ok' ? '✓' : s.st === 'bad' ? '✕' : ''}${s.st === 'wait' ? '<u class="mini"></u>' : ''}</i><span><b>${esc(s.t)}</b>${s.note ? `<small>${esc(s.note)}</small>` : ''}</span></li>`).join('')}</ul>`;
}
function testHTML(k) {
  const T = testState()[k];
  if (k === 'leitor') {
    if (T.state === 'wait') return `<div class="tlisten"><div class="spin"></div><div><b>Aguardando a leitura…</b><small>Passe um produto no leitor agora. Também vale digitar um código e apertar Enter.</small></div></div>
      <input class="inp" id="scantest" autocomplete="off" placeholder="O código lido aparece aqui" aria-label="Teste do leitor"><button class="btn sm ghost" data-a="testCancel" data-v="leitor" style="align-self:flex-start">Cancelar o teste</button>`;
    if (T.state === 'ok') return `<div class="tres ok"><div class="okmark sm">${ic('check')}</div><div><b>Leitor funcionando</b><small>Leu <code>${esc(T.code)}</code>${T.item ? ' · ' + esc(T.item) : ' · esse código não está no cadastro, mas a leitura chegou'}</small></div></div><button class="btn sm" data-a="testLeitor">Testar de novo</button>`;
    if (T.state === 'fail') return `<div class="tres bad"><div class="badmark sm">${ic('x')}</div><div><b>Nada foi lido</b><small>Confira o cabo USB e se o leitor está no modo teclado (que aperta Enter no fim). Depois tente de novo.</small></div></div><button class="btn sm" data-a="testLeitor">Tentar de novo</button>`;
    return `<button class="btn" data-a="testLeitor" style="align-self:flex-start">${ic('scan')}Testar leitor</button>`;
  }
  if (k === 'imp') {
    const nome = (IMPRESSORAS.find(x => x.id === S.cfg.printer) || IMPRESSORAS[0]).nome.split(' · ')[0];
    if (T.state === 'run') return `<div class="tlisten"><div class="spin"></div><div><b>Enviando a página de teste…</b><small>${esc(nome)}</small></div></div>`;
    if (T.state === 'ask') return `${testPaper()}<b>Saiu o papel com o teste?</b><div class="tb"><button class="btn ok" data-a="impAns" data-v="sim">Saiu, está certo</button><button class="btn" data-a="impAns" data-v="nao">Não saiu</button></div>`;
    if (T.state === 'ok') return `<div class="tres ok"><div class="okmark sm">${ic('check')}</div><div><b>Impressora funcionando</b><small>${esc(nome)} · papel ${esc(S.cfg.paper === 'A4' ? 'folha comum' : S.cfg.paper + ' mm')}</small></div></div><button class="btn sm" data-a="testImp">Imprimir outro teste</button>`;
    if (T.state === 'fail') return `<div class="tres bad"><div class="badmark sm">${ic('x')}</div><div><b>${esc(T.msg || 'O papel não saiu')}</b><small>Confira se a impressora está ligada e com papel, o cabo USB ou a rede, e se o driver está instalado no Windows.</small></div></div><button class="btn sm" data-a="testImp">Tentar de novo</button>`;
    return `<button class="btn" data-a="testImp" style="align-self:flex-start">${ic('printer')}Imprimir teste</button>`;
  }
  /* maquininha */
  const mach = S.cfg.mach, nome = mach === 'tef' ? 'pinpad' : 'maquininha';
  let h = '';
  if (T.steps && T.steps.length) h += stepsHTML(T.steps);
  if (T.state === 'idle') return `<button class="btn" data-a="testMaq" style="align-self:flex-start">${ic('refresh')}${mach === 'tef' ? 'Testar o pinpad' : 'Testar a conexão'}</button>`;
  if (T.state === 'run') return h;
  if (T.state === 'fail') return h + `<div class="tres bad"><div class="badmark sm">${ic('x')}</div><div><b>Não foi possível conectar</b><small>${esc(T.msg)}</small></div></div><button class="btn sm" data-a="testMaq">Testar de novo</button>`;
  if (T.state === 'conn') return h + `<div class="tres ok"><div class="okmark sm">${ic('check')}</div><div><b>${mach === 'tef' ? 'Pinpad e TEF respondendo' : 'Maquininha encontrada e em modo PDV'}</b><small>Agora faça uma cobrança de teste de <b>R$ 0,01</b> para ver a venda chegar de ponta a ponta.</small></div></div>
     <div class="tb"><button class="btn pri" data-a="testCharge" data-v="card">${ic('card')}Cobrança de teste no cartão</button>${mach === 'nuvem' ? `<button class="btn" data-a="testCharge" data-v="pix">${ic('pix')}Cobrança de teste no Pix</button>` : ''}<button class="btn sm ghost" data-a="testMaq">Testar de novo</button></div>`;
  if (T.state === 'charge') {
    const c = T.charge;
    if (c.phase === 'send') return h + `<div class="tlisten"><div class="spin"></div><div><b>Enviando R$ 0,01 para a ${nome}…</b></div></div>`;
    return h + `<div class="tlisten"><div class="spin"></div><div><b>${c.kind === 'pix' ? 'Aguardando o pagamento do Pix de R$ 0,01' : 'Aguardando o cartão na ' + nome}</b><small>${c.kind === 'pix' ? 'Leia o QR com o celular e pague um centavo.' : 'Passe qualquer cartão na ' + nome + '. A cobrança é de R$ 0,01.'}</small></div></div>
      ${c.kind === 'pix' ? qrSVG(0.01) : ''}<div class="tb"><button class="btn sm" data-a="testChargeSim" data-v="ok">Simular: pago</button><button class="btn sm" data-a="testChargeSim" data-v="bad">Simular: recusado</button><button class="btn sm ghost" data-a="testCancel" data-v="maq">Cancelar</button></div>`;
  }
  if (T.state === 'ok') { const c = T.charge; return h + `<div class="tres ok"><div class="okmark sm">${ic('check')}</div><div><b>Funcionando de ponta a ponta</b><small>A cobrança de R$ 0,01 chegou, foi paga e voltou para o PDV.</small></div></div>
    <div class="kv"><span>Pagamento</span><span style="font-family:var(--mono)">${esc(c.id)}</span><span>Forma</span><span>${esc(c.kind === 'pix' ? 'Pix' : 'Cartão ' + c.brand)}</span><span>Valor</span><span>R$ 0,01</span><span>Estorno do teste</span><span>pela sincronização</span></div><p style="margin:6px 0 0;color:var(--muted);font-size:12.5px">Não é venda: não aparece em Vendas nem no caixa. A sincronização estorna sozinha.</p><button class="btn sm" data-a="testMaq">Testar de novo</button>`; }
  return '';
}
function testPaper() {
  const w = S.cfg.paper === '58' ? 'w58' : 'w80';
  return `<div class="paper ${w}"><div class="c b">${esc(S.cfg.head)}</div><div class="c">${esc(loja().nome)}</div><div class="c">${esc(termCode())}</div><hr><div class="c b">TESTE DE IMPRESSÃO</div><div>${dmy(Date.now())}</div><div>Acentos: áéíóú ãõ ç</div><div>Números: 0123456789</div><div class="c">|| ||| | |||| || |||</div><hr><div class="c">Se você está lendo isto, a impressora funciona.</div></div>`;
}

/* ---------- execução dos testes ---------- */
function runSteps(defs, done) {
  const T = testState().maq, tok = (T.tok = (T.tok || 0) + 1); T.state = 'run'; T.steps = defs.map(d => ({ t: d.t, st: '', note: '' })); T.steps[0].st = 'wait'; paintTest('maq');
  let i = 0;
  const next = () => {
    if (T.tok !== tok) return;
    const r = defs[i].fn();
    T.steps[i].st = r.ok ? 'ok' : 'bad'; T.steps[i].note = r.note || '';
    if (!r.ok) { T.state = 'fail'; T.msg = r.note; paintTest('maq'); return; }
    i++;
    if (i >= defs.length) { done(); paintTest('maq'); return; }
    T.steps[i].st = 'wait'; paintTest('maq'); setTimeout(next, 750);
  };
  setTimeout(next, 750);
}
function leitorRead(code) {
  const T = testState().leitor; if (T.state !== 'wait' || S.protoFail) return false;
  T.tok = (T.tok || 0) + 1; const it = items().find(x => x.code === String(code).trim());
  Object.assign(T, { state: 'ok', code: String(code).trim(), item: it ? it.name : '' }); stamp('leitor'); S.lastScan = T.code; renderEquipHeads(); paintTest('leitor'); return true;
}
function renderEquipHeads() { if (S.screen === 'config' || S.screen === 'setup') { const y = window.scrollY, b = $('.body'), sc = b ? b.scrollTop : 0; render(); const b2 = $('.body'); if (b2) b2.scrollTop = sc; window.scrollTo(0, y); } }
function equipActions() {
  return {
    testLeitor() {
      const T = testState().leitor, tok = (T.tok = (T.tok || 0) + 1); T.state = 'wait'; paintTest('leitor'); const i = $('#scantest'); if (i) i.focus();
      setTimeout(() => { if (T.tok === tok && T.state === 'wait') { T.state = 'fail'; paintTest('leitor'); } }, 15000);
    },
    toggleFail() { S.protoFail = !S.protoFail; S.test = TEST0(); toast(S.protoFail ? 'warn' : 'ok', S.protoFail ? 'Equipamentos simulados com defeito.' : 'Equipamentos simulados funcionando.'); render(); },
    setupEquipNext() { S.setup.step = 'done'; render(); },
    testCancel(v) { const T = testState()[v]; T.tok = (T.tok || 0) + 1; T.state = v === 'maq' ? 'idle' : 'idle'; if (v === 'maq') T.steps = []; paintTest(v); },
    testImp() {
      const T = testState().imp, tok = (T.tok = (T.tok || 0) + 1); T.state = 'run'; paintTest('imp');
      setTimeout(() => { if (T.tok !== tok) return; if (S.protoFail) { T.state = 'fail'; T.msg = 'Não consegui falar com a impressora'; } else T.state = 'ask'; paintTest('imp'); }, 1200);
    },
    impAns(v) { const T = testState().imp; if (v === 'sim') { T.state = 'ok'; stamp('imp'); renderEquipHeads(); } else { T.state = 'fail'; T.msg = 'O papel não saiu'; } paintTest('imp'); },
    testMaq() {
      const c = S.cfg, T = testState().maq, mq = maqSel() || {}; T.charge = null;
      const defs = c.mach === 'tef'
        ? [{ t: 'Procurando o pinpad na porta USB', fn: () => S.protoFail ? { ok: false, note: 'Pinpad não encontrado. Confira o cabo USB e se o driver do pinpad está instalado no Windows.' } : { ok: true, note: 'Gertec PPC930 · COM3' } },
          { t: 'Iniciando o software TEF', fn: () => ({ ok: true, note: 'TEF pronto' }) },
          { t: 'Falando com a adquirente (' + mq.adq + ')', fn: () => S.online ? { ok: true, note: 'Adquirente respondeu' } : { ok: false, note: 'Sem internet: o TEF precisa falar com a adquirente.' } }]
        : [{ t: 'Conferindo as credenciais do Mercado Pago', fn: () => S.online ? { ok: true, note: 'Credenciais válidas' } : { ok: false, note: 'Sem internet: não dá para falar com o Mercado Pago.' } },
          { t: 'Procurando o terminal ' + mq.terminal, fn: () => ({ ok: true, note: 'Terminal encontrado · ' + mq.code }) },
          { t: 'Conferindo o modo de operação', fn: () => S.protoFail ? { ok: false, note: 'O terminal está em modo STANDALONE. Ative o modo PDV na maquininha (Mais opções › Configurações › Modo de vinculação) e teste de novo.' } : { ok: true, note: 'Modo PDV' } }];
      runSteps(defs, () => { T.state = 'conn'; });
    },
    testCharge(v) {
      const T = testState().maq, tok = (T.tok = (T.tok || 0) + 1); T.state = 'charge'; T.charge = { kind: v, phase: 'send' }; paintTest('maq');
      setTimeout(() => { if (T.tok !== tok) return; T.charge.phase = 'wait'; paintTest('maq'); }, 1000);
    },
    testChargeSim(v) {
      const T = testState().maq; T.tok = (T.tok || 0) + 1;
      if (v === 'ok') { T.charge = Object.assign(T.charge, { id: 'PAY' + Math.random().toString(36).slice(2, 10).toUpperCase(), brand: ['Visa', 'Mastercard', 'Elo'][Math.floor(Math.random() * 3)] }); T.state = 'ok'; stamp('maq'); renderEquipHeads(); S.refundQ.push(T.charge.id); logSync('Teste', true, 'Cobrança de teste de R$ 0,01 paga (' + T.charge.id + '): não é venda. A sincronização estorna.'); }
      else { T.state = 'fail'; T.msg = 'A cobrança de teste foi recusada. Tente outro cartão.'; }
      paintTest('maq');
    }
  };
}

function eqSetupHTML(bar) {
  return `<div class="eqwrap"><div class="eqtop"><h2>Equipamentos deste terminal</h2><p class="note">Ligue e teste o que este terminal vai usar. Nada precisa estar conectado: o que faltar pode ser feito depois, em Ajustes.</p>${bar}</div>${equipPanels()}
    <div class="tb eqact"><button class="btn" data-a="setupBack">Voltar</button><span class="grow"></span><button class="btn ghost" data-a="setupEquipNext">Pular por agora</button><button class="btn pri lg" data-a="setupEquipNext">Continuar</button></div></div>`;
}
