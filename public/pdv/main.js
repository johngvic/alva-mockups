/* Alva PDV · protótipo navegável. Simula o app de Windows: offline primeiro, leitor, impressora e maquininha opcionais.
   Nada sai deste navegador. O botão "Internet" da faixa de cima simula a queda da conexão. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const brl = n => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad = (n, l) => String(n).padStart(l, '0');
const hhmm = t => { const d = new Date(t); return pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2); };
const dmy = t => { const d = new Date(t); return pad(d.getDate(), 2) + '/' + pad(d.getMonth() + 1, 2) + ' ' + hhmm(t); };
const round2 = n => Math.round(n * 100) / 100;

const IC = {
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/>',
  list: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
  scan: '<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M8 8v8M12 8v8M16 8v8"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
  wifioff: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/><path d="M3 3l18 18"/>',
  printer: '<path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  pix: '<path d="M12 3l4 4-4 4-4-4zM12 13l4 4-4 4-4-4z"/><path d="M3 12l4-4M21 12l-4-4M3 12l4 4M21 12l-4 4"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  edit: '<path d="M4 20h4l11-11-4-4L4 16z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v5h-5"/>',
  ticket: '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  out: '<path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5M15 8l4 4-4 4M19 12H9"/>'
};
const ic = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || ''}</svg>`;

/* ---------- estado e persistência ---------- */
const KEY = 'alva-pdv-v1';
const S = {
  screen: 'login', loginStep: 'cred', loginErr: '', tema: 'noite', online: true, user: null, lojaId: null,
  itemsByLoja: null, cat: 'Todos', q: '', cart: [], disc: { t: 'v', v: 0 }, sales: [], seq: 0, cache: null,
  cfg: { printer: 'none', paper: '80', mach: 'none', maq: '', tested: {}, head: 'Alva Sede', foot: 'Obrigado e que Deus abençoe!', askEmail: true },
  scanSel: '', synclog: [], catver: 0, lastSales: null, lastCheck: null, nextAt: Date.now() + SYNC_S * 1000, sending: false, pdvs: null, maqs: null, blockWhy: 'removed', term: null, setup: null, regOk: true, hi: 0, test: null, protoFail: false, panel: 'cart', discOpen: false, priceEdit: null, railOpen: false, lastSale: null, afterSync: 'sale', filter: 'todas', pq: '', pcat: 'Todas', lastScan: '', pay: null, modal: null, voucher: null, vErr: '', vTry: '', vouchers: null, vAt: null, clock: { off: 0, at: null, bad: false, logged: false }, protoDrift: false, tpl: null, tplAt: null, ver: APP_VER, updCheck: null, protoTpl: false, protoAdmin: true, protoUpd: 'none', refundQ: []
};
function load() {
  try {
    const j = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (j) { S.tema = j.tema || 'noite'; S.sales = j.sales || []; S.seq = j.seq || 0; S.cache = j.cache || null; S.cfg = Object.assign(S.cfg, j.cfg || {}); S.itemsByLoja = j.itemsByLoja || null; S.user = j.user || null; S.term = j.term || null; S.pdvs = j.pdvs || null; S.maqs = j.maqs || null; S.synclog = j.synclog || []; S.catver = j.catver || 0; S.lastSales = j.lastSales || null; S.vouchers = j.vouchers || null; S.vAt = j.vAt || null; S.tpl = j.tpl || null; S.tplAt = j.tplAt || null; S.ver = j.ver || APP_VER; }
  } catch (e) { /* sem armazenamento: segue em memória */ }
  if (!S.itemsByLoja) seedItems();
  if (!S.vouchers) S.vouchers = {};
  if (!S.pdvs) S.pdvs = JSON.parse(JSON.stringify(PDVS));
  if (!S.maqs) S.maqs = JSON.parse(JSON.stringify(MAQS));
  if (!S.cfg.maq) { S.cfg.maq = ''; S.cfg.mach = 'none'; }
  for (const k of Object.keys(CATALOG)) if (!S.itemsByLoja[k]) S.itemsByLoja[k] = CATALOG[k].map(([code, name, cat, price, stock]) => ({ id: code, code, name, cat, price, stock }));
}
function seedItems() {
  S.itemsByLoja = {};
  for (const k of Object.keys(CATALOG)) S.itemsByLoja[k] = CATALOG[k].map(([code, name, cat, price, stock]) => ({ id: code, code, name, cat, price, stock }));
}
function save() { try { localStorage.setItem(KEY, JSON.stringify({ tema: S.tema, sales: S.sales, seq: S.seq, cache: S.cache, cfg: S.cfg, itemsByLoja: S.itemsByLoja, user: S.user, term: S.term, pdvs: S.pdvs, maqs: S.maqs, synclog: S.synclog, catver: S.catver, lastSales: S.lastSales, vouchers: S.vouchers, vAt: S.vAt, tpl: S.tpl, tplAt: S.tplAt, ver: S.ver })); } catch (e) { /* ok */ } }
const items = () => S.itemsByLoja[S.lojaId || (S.setup && S.setup.lojaId)] || [];
const loja = () => LOJAS.find(l => l.id === S.lojaId) || LOJAS[0];
function logSync(kind, ok, msg) { S.synclog.unshift({ at: Date.now(), kind, ok, msg }); if (S.synclog.length > 80) S.synclog.length = 80; save(); }
const pending = () => S.sales.filter(s => !s.sent || (s.canc && !s.canc.sent)).length;

/* ---------- avisos e janelas ---------- */
function toast(kind, msg) {
  const el = document.createElement('div');
  el.className = 'toast ' + kind; el.innerHTML = (kind === 'ok' ? ic('check') : '') + '<span>' + esc(msg) + '</span>';
  $('#toasts').appendChild(el); setTimeout(() => el.remove(), 3600);
}
function openModal(html, w) {
  S.modal = true; const m = $('#modal'); m.innerHTML = `<div class="scrim" data-a="scrim"><div class="dlg" style="--w:${w || 560}px" role="dialog" aria-modal="true">${html}</div></div>`; m.classList.add('on');
  const f = $('input:not([disabled]),select,button.pri,button.ok', m); if (f && f.tagName === 'INPUT') setTimeout(() => f.focus(), 30);
}
function closeModal() { S.modal = null; S.pay && (S.pay.tok = (S.pay.tok || 0) + 1); const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; focusCode(); }
const dlg = (title, body, foot) => `<header><h2>${title}</h2><button class="xbtn" data-a="closeModal" aria-label="Fechar">${ic('x')}</button></header><div class="cont">${body}</div>${foot ? `<footer>${foot}</footer>` : ''}`;

/* ---------- carrinho ---------- */
function vDesc(sub) { const v = S.voucher; if (!v) return 0; return v.tipo === 'p' ? round2(sub * v.valor / 100) : Math.min(sub, v.valor); }
function calc() {
  const sub = round2(S.cart.reduce((a, l) => a + l.qty * l.price, 0)), vd = vDesc(sub), base = round2(sub - vd);
  const d = S.disc.t === 'p' ? round2(base * Math.min(100, S.disc.v) / 100) : Math.min(base, S.disc.v);
  return { sub, vd, disc: d, total: round2(base - d), qty: S.cart.reduce((a, l) => a + l.qty, 0) };
}
const vouchersAtivos = lojaId => (VOUCHERS[lojaId] || []).filter(v => v.ativo && v.dias >= 0 && (v.limite == null || v.usos < v.limite)).map(v => Object.assign({}, v, { ate: Date.now() + v.dias * 864e5 }));
const dateFromDias = d => { const t = new Date(Date.now() + d * 864e5); return pad(t.getDate(), 2) + '/' + pad(t.getMonth() + 1, 2) + '/' + t.getFullYear(); };
const fmtOff = off => { const a = Math.abs(off), s = off >= 0 ? '+' : '−'; return s + (a >= 60000 ? Math.floor(a / 60000) + ' min ' + Math.round((a % 60000) / 1000) + ' s' : (a / 1000).toFixed(1).replace('.', ',') + ' s'); };
function clockCheck(manual) {
  const off = S.protoDrift ? 312000 : 380, bad = Math.abs(off) > 60000, was = S.clock.bad, first = !S.clock.logged;
  S.clock = { off, at: Date.now(), bad, logged: true };
  if (bad !== was && S.term && !['login', 'setup', 'sync'].includes(S.screen)) { if (S.screen === 'sale') refreshTop(); else render(); }
  if (manual || first || bad !== was) logSync('Relógio', !bad, bad ? 'O relógio deste computador está ' + fmtOff(off) + ' do servidor: acerte a hora do Windows' : 'Relógio conferido: diferença de ' + fmtOff(off) + ' para o servidor');
}
function resetDisc() { S.disc = { t: 'v', v: 0 }; S.voucher = null; S.vErr = ''; S.vTry = ''; }
function applyVoucher(v, fonte) { S.voucher = { code: v.code, nome: v.nome, tipo: v.tipo, valor: v.valor, fonte }; S.vErr = ''; S.vTry = ''; render(); toast('ok', 'Voucher ' + v.code + ' aplicado.'); }
function validateVoucher(raw) {
  const code = String(raw || '').trim().toUpperCase(); S.vTry = code;
  if (!S.cart.length) return;
  if (!code) { S.vErr = 'Digite o código do voucher.'; render(); return; }
  const lj = S.lojaId;
  { const lv = ((S.vouchers || {})[lj] || []).find(x => x.code === code); if (lv && lv.ate >= Date.now()) return applyVoucher(lv, 'lista baixada'); }
  if (S.online) {
    const v = (VOUCHERS[lj] || []).find(x => x.code === code);
    if (!v) S.vErr = 'Voucher não encontrado nesta loja.';
    else if (!v.ativo) S.vErr = 'Este voucher está pausado.';
    else if (v.dias < 0) S.vErr = 'Este voucher venceu em ' + dateFromDias(v.dias) + '.';
    else if (v.limite != null && v.usos >= v.limite) S.vErr = 'Este voucher já foi usado o máximo de vezes.';
    else return applyVoucher(v, 'conferido no Alva');
  } else {
    const v = ((S.vouchers || {})[lj] || []).find(x => x.code === code);
    if (!v) S.vErr = 'Sem internet: este código não está na lista baixada' + (S.vAt ? ' em ' + dmy(S.vAt) : '') + '.';
    else if (v.ate < Date.now()) S.vErr = 'Este voucher venceu.';
    else return applyVoucher(v, 'lista baixada, sem internet');
  }
  render();
}
function autoVoucher(raw) {
  const code = String(raw || '').trim().toUpperCase(); if (code.length < 3 || !S.cart.length || S.voucher) return;
  const list = (S.vouchers || {})[S.lojaId] || [], ex = list.find(x => x.code === code);
  if (!ex || ex.ate < Date.now() || list.some(x => x.code !== code && x.code.startsWith(code))) return;
  applyVoucher(ex, 'lista baixada');
}
const bgNote = () => { if (!S.term) return ''; const p = pending(); return 'Sincronização em segundo plano ativa' + (p ? ': ' + p + (p === 1 ? ' venda aguardando envio' : ' vendas aguardando envio') : '.') + (S.online ? '' : ' Sem internet: tenta de novo sozinha.'); };
const updBg = () => { const e = $('#bgnote'); if (e) e.textContent = bgNote(); };
const divTag = s => s.divs && s.divs.length ? '<span class="tg wait" title="A equipe confere em Loja › Divergências">' + s.divs.length + (s.divs.length === 1 ? ' divergência registrada' : ' divergências registradas') + '</span>' : '';
const saleExtra = s => (s.voucher ? '<div class="kv"><span>Voucher</span><span>' + esc(s.voucher.code) + ' · − ' + brl(s.vd) + '</span></div>' : '') + (s.divs && s.divs.length ? '<div class="divs"><b>Divergências</b>' + s.divs.map(d => '<div><span class="tg wait">' + esc(d.tipo) + '</span> ' + esc(d.txt) + '</div>').join('') + '<small>A equipe confere em Loja › Divergências.</small></div>' : '') + ((s.pays || []).filter(x => x.why).map(x => '<div class="kv"><span>Pix à mão</span><span>' + esc(x.why) + '</span></div>').join('')) + (s.atSrv && Math.abs(s.at - s.atSrv) > 60000 ? '<small class="hint2">Hora do computador ' + dmy(s.at) + '; hora corrigida pelo servidor ' + dmy(s.atSrv) + '.</small>' : '');
function addItem(it) {
  if (S.panel === 'pay') { toast('warn', 'Termine o pagamento ou volte à venda antes de adicionar produtos.'); return; }
  if (S.panel === 'done') { S.panel = 'cart'; S.lastSale = null; }
  const l = S.cart.find(x => x.id === it.id);
  if (l) l.qty++; else S.cart.push({ id: it.id, code: it.code, name: it.name, qty: 1, price: it.price });
  const have = it.stock - (S.cart.find(x => x.id === it.id).qty);
  if (have < 0) toast('warn', 'Estoque no PDV: ' + it.stock + '. Vendendo mesmo assim; a conferência vem depois.');
  render(); const g = $('[data-id="' + it.id + '"]'); if (g) g.classList.add('flash');
}
function handleCode(raw) {
  const v = String(raw || '').trim(); if (!v) return;
  S.lastScan = v;
  if (S.panel === 'pay') { toast('warn', 'Termine o pagamento ou volte à venda antes de adicionar produtos.'); return; }
  if (S.panel === 'done') { S.panel = 'cart'; S.lastSale = null; }
  if (/^\d{6,14}$/.test(v)) {
    const it = items().find(x => x.code === v);
    S.q = '';
    if (it) { addItem(it); return; }
    toast('bad', 'Código ' + v + ' não encontrado.' + (S.online ? ' Cadastre em Produtos.' : ' Sem internet: cadastre depois, em Produtos.'));
    render(); return;
  }
  const l = filtered(); if (l.length) { const it = l[S.hi] || l[0]; S.q = ''; S.hi = 0; addItem(it); } else toast('warn', 'Nada encontrado para "' + v + '".');
}
function filtered() {
  const q = S.q.trim().toLowerCase();
  return items().filter(i => (S.cat === 'Todos' || i.cat === S.cat) && (!q || i.name.toLowerCase().includes(q) || i.code.includes(q)));
}
function focusCode() { if (S.screen === 'sale' && !S.modal) { const c = $('#code'); if (c) { c.focus(); } } }

/* ---------- telas ---------- */
function render() {
  document.documentElement.setAttribute('data-tema', S.tema);
  renderProto();
  const app = $('#app');
  if (S.screen === 'login') app.innerHTML = loginView();
  else if (S.screen === 'setup') app.innerHTML = setupView();
  else if (S.screen === 'blocked') app.innerHTML = blockedView();
  else if (S.screen === 'sync') { app.innerHTML = syncView(); runSync(); }
  else app.innerHTML = shell(S.screen === 'sale' ? saleView() : S.screen === 'sales' ? salesView() : S.screen === 'products' ? productsView() : S.screen === 'cats' ? catsView() : S.screen === 'vouchers' ? vouchersView() : S.screen === 'synclog' ? syncLogView() : configView());
  if (S.screen === 'sale') { const c = $('#code'); if (c) { c.value = S.q; if (!S.modal) c.focus(); } }
}
function renderProto() {
  const sel = (items() && items().length ? items() : S.itemsByLoja.sede);
  $('#proto').innerHTML = `<b>Protótipo</b>
   <span class="sw" role="switch" aria-pressed="${S.online}" tabindex="0" data-a="toggleNet"><i></i>Internet ${S.online ? 'ligada' : 'caída'}</span>
   <span class="sw" role="switch" aria-pressed="${S.regOk}" tabindex="0" data-a="toggleReg"><i></i>PDV cadastrado no web</span>
   <span class="sw" role="switch" aria-pressed="${S.protoFail}" tabindex="0" data-a="toggleFail"><i></i>Equipamentos com defeito</span>
   <span class="sw" role="switch" aria-pressed="${S.protoDrift}" tabindex="0" data-a="toggleDrift"><i></i>Relógio desajustado</span>
   <span class="sw" role="switch" aria-pressed="${S.protoAdmin}" tabindex="0" data-a="toggleAdmin"><i></i>Perfil Admin da loja</span>
   <span class="sw" role="switch" aria-pressed="${S.protoTpl}" tabindex="0" data-a="toggleTpl"><i></i>Modelo do comprovante alterado no Alva</span>
   <button class="pb" data-a="toggleUpd" type="button">Atualização: ${S.protoUpd === 'none' ? 'em dia' : S.protoUpd === 'opt' ? 'nova versão' : 'obrigatória'}</button>
   <button class="pb" data-a="movePdv" type="button">Simular: PDV registrado em outra máquina</button>
   <span>Leitor:</span><select id="scanSel" aria-label="Produto para passar no leitor">${sel.map(i => `<option value="${i.code}" ${S.scanSel === i.code ? 'selected' : ''}>${esc(i.name)} · ${i.code}</option>`).join('')}</select>
   <button class="pb" data-a="scanSim" type="button">Passar no leitor</button><button class="pb" data-a="scanBad" type="button">Código desconhecido</button>
   <span class="grow"></span>
   <button class="pb" data-a="tema" type="button">Tema: ${S.tema === 'noite' ? 'noite' : 'dia'}</button><button class="pb" data-a="reset" type="button">Reiniciar demonstração</button>`;
}
function shell(inner) {
  const nav = [['sale', 'Venda', 'cart', 'F1'], ['sales', 'Vendas', 'list', 'F5'], ['products', 'Catálogo', 'box', 'F6'], ['synclog', 'Sync', 'refresh', 'F8'], ['config', 'Ajustes', 'gear', 'F7']];
  const p = pending();
  const chip = S.online
    ? `<button class="chip" data-a="go" data-v="synclog" title="Ver a sincronização"><i></i>Online · atualizado às ${S.cache ? hhmm(S.cache.at) : '--:--'}</button>`
    : `<button class="chip off" data-a="go" data-v="synclog" title="Ver a sincronização"><i></i>Sem internet · vendendo normalmente${p ? ' · ' + p + (p === 1 ? ' venda aguardando envio' : ' vendas aguardando envio') : ''}</button>`;
  const ckChip = S.clock.bad ? `<button class="chip off" data-a="go" data-v="synclog" title="O relógio deste computador está fora de hora"><i></i>Relógio ${fmtOff(S.clock.off)}</button>` : '';
  const updChip = S.protoUpd !== 'none' ? `<button class="chip off" data-a="go" data-v="config" title="Abrir as atualizações"><i></i>${S.protoUpd === 'must' ? 'Atualização obrigatória até 12/11' : 'Nova versão ' + APP_NEW}</button>` : '';
  const chipP = S.online && p ? `<button class="chip off" data-a="go" data-v="synclog" title="Ver a sincronização"><i></i>${p} ${p === 1 ? 'venda aguardando envio' : 'vendas aguardando envio'}</button>` : '';
  return `<div class="shell${S.screen === 'sale' ? ' focus' : ''}${S.railOpen ? ' open' : ''}">${S.railOpen && S.screen === 'sale' ? '<div class="railscrim" data-a="railToggle"></div>' : ''}<nav class="rail" aria-label="Menu"><div class="logo">alva<small>PDV</small></div>
    ${nav.map(n => `<button data-a="go" data-v="${n[0]}" ${(S.screen === n[0] || (n[0] === 'products' && ['cats', 'vouchers'].includes(S.screen))) ? 'aria-current="page"' : ''}>${ic(n[2])}${n[1]}<kbd>${n[3]}</kbd></button>`).join('')}
    <span class="sp"></span><button data-a="logout">${ic('out')}Sair</button></nav>
   <div class="main"><header class="top">${S.screen === 'sale' ? `<button class="menubtn" data-a="railToggle" aria-label="Menu">${ic('menu')}</button>` : ''}<div class="loja"><b>${esc(loja().nome)}</b><span>${esc(termCode())} · ${esc(igrejaNome())}</span></div><span class="grow"></span>${eqChips()}${updChip}${ckChip}${chip}${chipP}
    <div class="who"><span class="av">${esc((S.user || 'OP').slice(0, 2).toUpperCase())}</span>${esc(S.user || 'Operador')}</div></header>
   <div class="body">${inner}</div></div></div>`;
}

const igrejaObj = () => IGREJAS.find(x => x.id === (S.term && S.term.igrejaId)) || IGREJAS[0];
const igrejaNome = () => (S.term ? igrejaObj().nome : '');
const termCode = () => (S.term ? S.term.code : 'PDV');
function heroHTML(sub) {
  return `<div class="hero"><div style="display:flex;align-items:center;gap:10px;font:800 26px/1 var(--font);letter-spacing:-.05em;color:var(--brand)">alva <span style="font:600 13px/1 var(--font);letter-spacing:.2em;color:var(--soft)">PDV</span></div>
    <h1>Passou o leitor, pagou, acabou.</h1><p>${sub || 'O ponto de venda da loja da igreja. Vende mesmo sem internet e se acerta sozinho quando a conexão volta.'}</p>
    <ul><li>${ic('check')}Produtos, preços e estoque baixados ao entrar</li><li>${ic('check')}Leitor de código de barras, impressora e maquininha opcionais</li><li>${ic('check')}Comprovante simples, por e-mail ou impresso</li></ul></div>`;
}
function termCard() {
  return `<div class="termcard"><span class="ti">${ic('box')}</span><div><b>${esc(loja().nome)}</b><small>${esc(igrejaNome())} · ${esc(S.term.org)}</small></div><code>${esc(S.term.code)}</code></div>`;
}
function loginView() {
  const cached = S.cache && S.user;
  const card = S.term ? termCard() : `<div class="termcard off"><span class="ti">${ic('box')}</span><div><b>Terminal ainda não configurado</b><small>O modo demonstração já vem pronto. Para vender de verdade, configure o terminal.</small></div></div>`;
  return `<div class="login">${heroHTML()}<div class="form"><h2>Entrar</h2>${card}
      ${!S.online ? `<div class="banner">${ic('wifioff')}<span>${cached ? 'Sem internet. Dá para entrar com os dados do último acesso.' : 'Sem internet. O primeiro acesso precisa de conexão.'}</span></div>` : ''}
      ${S.loginErr ? `<div class="banner">${ic('x')}<span>${esc(S.loginErr)}</span></div>` : ''}
      <div class="field"><label for="em">E-mail</label><input class="inp" id="em" type="email" autocomplete="username" placeholder="voce@${esc(igrejaObj().dominio)}"></div>
      <div class="field"><label for="pw">Senha</label><input class="inp" id="pw" type="password" autocomplete="current-password" placeholder="Qualquer senha, é um protótipo"></div>
      <button class="btn pri lg" data-a="login">Entrar</button><button class="btn lg" data-a="demo">${ic('spark')}Entrar com conta demo</button>
      ${S.term ? `<p class="note">Só usuários da ${esc(igrejaNome())} entram neste terminal.</p><p class="note bg" id="bgnote">${esc(bgNote())}</p>` : ''}
      <div class="sep2"><button class="btn sm" data-a="reconfig">${ic('gear')}${S.term ? 'Reconfigurar este terminal' : 'Configurar este terminal'}</button></div></div></div>`;
}
function setupView() {
  const st = S.setup, steps = ['Super operador', 'Loja', 'PDV deste computador', 'Equipamentos', 'Conclusão'], idx = { cred: 0, target: 1, code: 2, equip: 3, done: 4 }[st.step];
  const bar = `<p class="stepline">Passo ${idx + 1} de ${steps.length} · ${steps[idx]}</p>`;
  let b = '';
  if (st.step === 'cred') {
    b = `<h2>Configurar este terminal</h2><p class="note" style="margin-top:-8px">Só um super operador faz isso, uma vez por terminal. É preciso estar com internet.</p>${bar}
      ${!S.online ? `<div class="banner">${ic('wifioff')}<span>O setup precisa de internet para conferir o cadastro do PDV no Alva Web.</span></div>` : ''}
      ${st.err ? `<div class="banner">${ic('x')}<span>${esc(st.err)}</span></div>` : ''}
      <div class="field"><label for="em">E-mail do super operador</label><input class="inp" id="em" type="email" placeholder="super@alva.org"></div>
      <div class="field"><label for="pw">Senha</label><input class="inp" id="pw" type="password" placeholder="Qualquer senha, é um protótipo"></div>
      <button class="btn pri lg" data-a="setupLogin">Entrar</button><button class="btn lg" data-a="setupDemo">${ic('spark')}Entrar como super operador (demo)</button>
      <button class="btn ghost sm" data-a="setupCancel" style="align-self:flex-start">Voltar ao login</button>`;
  } else if (st.step === 'target') {
    const ig = IGREJAS.find(x => x.id === st.igrejaId), ls = ig.lojas.map(id => LOJAS.find(l => l.id === id));
    b = `<h2>Onde este terminal vai vender?</h2>${bar}
      <div class="field"><label>Organização</label><div class="inp" style="opacity:.85">${esc(ORG.nome)}</div></div>
      <div class="field"><label for="stIg">Igreja</label><select class="inp" id="stIg">${IGREJAS.map(x => `<option value="${x.id}" ${x.id === st.igrejaId ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></div>
      <div class="field"><label for="stLj">Loja</label><select class="inp" id="stLj">${ls.map(l => `<option value="${l.id}" ${l.id === st.lojaId ? 'selected' : ''}>${esc(l.nome)} · ${esc(l.sub)}</option>`).join('')}</select></div>
      <p class="note">Os produtos, categorias e preços vêm da loja escolhida. Só usuários desta igreja poderão entrar.</p>
      <div class="tb"><button class="btn" data-a="setupBack">Voltar</button><button class="btn pri lg grow" data-a="setupNext">Continuar</button></div>`;
  } else if (st.step === 'code') {
    const ig = IGREJAS.find(x => x.id === st.igrejaId), lj = LOJAS.find(l => l.id === st.lojaId), list = S.pdvs.filter(p => p.igrejaId === st.igrejaId && (p.lojaId === st.lojaId || !p.lojaId));
    const sel = S.pdvs.find(p => p.code === st.code), other = sel && sel.inst && sel.inst.maquina !== MAQUINA ? sel.inst : null;
    const chip = p => !p.ativo ? '<span class="tg mut">Inativo no Alva Web</span>' : !p.lojaId ? '<span class="tg wait">Aguardando vínculo financeiro</span>' : !p.inst ? '<span class="tg ok">Livre</span>' : p.inst.maquina === MAQUINA ? '<span class="tg ok">Já registrado neste computador</span>' : '<span class="tg wait">Em uso em ' + esc(p.inst.maquina) + (p.inst.ip ? ' · IP ' + esc(p.inst.ip) : '') + '</span>';
    b = `<h2>Qual PDV é este computador?</h2><p class="note" style="margin-top:-8px">Os PDVs de ${esc(lj.nome)} (${esc(ig.nome)}) vêm do cadastro do Alva Web. Cada PDV tem uma instalação só.</p>${bar}
      ${st.err ? `<div class="banner">${ic('x')}<span>${esc(st.err)}</span></div>` : ''}
      ${list.length ? `<div class="lojas">${list.map(p => `<button class="opt" data-a="setupPick" data-v="${p.code}" aria-pressed="${st.code === p.code}" ${p.ativo && p.lojaId ? '' : 'disabled'}><span class="rad"></span><span style="flex:1;min-width:0"><b>${esc(p.nome)}</b><span class="d" style="font-family:var(--mono)">${esc(p.code)}</span>${p.inst && p.ativo ? `<span class="d">Último contato ${esc(p.inst.visto)}</span>` : ''}</span>${chip(p)}</button>`).join('')}</div>`
        : `<div class="banner">${ic('box')}<span>Esta loja ainda não tem PDV cadastrado. Cadastre em Alva Web › Financeiro › Contas financeiras › PDVs e volte aqui.</span></div>`}
      ${other ? `<div class="banner">${ic('refresh')}<span><b>Este PDV está registrado em ${esc(other.maquina)} (IP ${esc(other.ip || '—')}).</b> Ao continuar, ele é desregistrado de lá e registrado neste computador. Quem estiver vendendo nele perde o acesso assim que a máquina tiver internet.</span></div>` : ''}
      <div class="tb"><button class="btn" data-a="setupBack">Voltar</button><button class="btn pri lg grow" data-a="setupValidate" ${st.busy || !st.code ? 'disabled' : ''}>${st.busy ? 'Registrando no Alva Web…' : other ? 'Desregistrar de lá e registrar aqui' : 'Registrar neste computador'}</button></div>`;
  } else if (st.step === 'equip') { b = '';
  } else {
    const ig = IGREJAS.find(x => x.id === st.igrejaId), lj = LOJAS.find(l => l.id === st.lojaId);
    b = `<h2>Tudo certo</h2>${bar}
      <div class="okcard"><div class="okmark">${ic('check')}</div><div class="kv"><span>Organização</span><span>${esc(ORG.nome)}</span><span>Igreja</span><span>${esc(ig.nome)}</span><span>Loja</span><span>${esc(lj.nome)}</span><span>Código do PDV</span><span style="font-family:var(--mono)">${esc(st.code)}</span><span>Configurado por</span><span>${esc(st.user)}</span><span>Equipamentos</span><span>${esc(eqSummary())}</span></div></div>
      <div class="banner info">${ic('lock')}<span>Daqui em diante só usuários da ${esc(ig.nome)} entram neste terminal. Para vender em outra loja, o terminal precisa ser configurado de novo.</span></div>
      <button class="btn ok lg" data-a="setupFinish">Baixar os produtos e concluir</button>`;
  }
  if (st.step === 'equip') return eqSetupHTML(bar);
  return `<div class="login">${heroHTML('Antes de vender, o terminal é ligado a uma igreja e a uma loja. Assim ele já sabe quais produtos baixar e quem pode entrar.')}<div class="form">${b}</div></div>`;
}
function blockedView() {
  const moved = S.blockWhy === 'moved', p = S.pdvs.find(x => S.term && x.code === S.term.code), where = p && p.inst ? p.inst.maquina : 'outra máquina';
  return `<div class="sync"><div class="box" style="align-items:center;text-align:center"><div class="badmark">${ic('lock')}</div><h2>${moved ? 'PDV registrado em outra máquina' : 'Terminal desativado'}</h2>
    <p style="color:var(--muted);margin:0">${moved ? `O PDV <b style="font-family:var(--mono)">${esc(termCode())}</b> foi registrado em <b>${esc(where)}</b>. Cada PDV tem uma instalação só, então esta máquina não pode mais vender. Para voltar a usá-la, um super operador registra um PDV aqui de novo.` : `O PDV <b style="font-family:var(--mono)">${esc(termCode())}</b> não está mais cadastrado no Alva Web. Peça a um super operador para cadastrá-lo de novo em Financeiro › Contas financeiras › PDVs e reconfigure este terminal.`}</p>
    ${pending() ? `<div class="banner info">${ic('refresh')}<span>${pending()} ${pending() === 1 ? 'venda continua guardada' : 'vendas continuam guardadas'} neste computador e saem para o Alva Web mesmo com o terminal bloqueado.</span></div>` : ''}
    <button class="btn pri lg" data-a="reconfig">Reconfigurar este terminal</button></div></div>`;
}
function enterApp() { S.cat = 'Todos'; S.q = ''; S.hi = 0; S.afterSync = 'sale'; S.screen = 'sync'; save(); render(); }
function syncView() {
  const n = items().length, c = (CATS[S.lojaId] || []).length;
  const mq = S.maqs.find(x => x.code === S.cfg.maq), st = [['Configurações', 'PDV, maquininha' + (mq ? ' (' + (TIPOS_MAQ[mq.tipo] || mq.tipo).toLowerCase() + ')' : '') + ', parâmetros e modelo do comprovante'], ['Categorias', c + ' categorias'], ['Produtos', n + ' itens, com preço e estoque'], ['Vouchers', vouchersAtivos(S.lojaId).length + ' ativos']];
  return `<div class="sync"><div class="box"><div><h2>Baixando os dados da loja</h2><p style="color:var(--muted);margin:6px 0 0">${esc(loja().nome)}. Mudanças no cadastro (maquininha, parâmetros) só valem depois deste download. Depois dele, o PDV vende mesmo sem internet.</p></div>
   ${st.map((s, i) => `<div class="step" id="st${i}"><div class="h"><span>${s[0]}</span><span>${s[1]}</span></div><div class="bar"><i></i></div></div>`).join('')}</div></div>`;
}
let syncTimer = null;
function runSync() {
  clearTimeout(syncTimer);
  if (S.online && !S.regOk && S.term) { S.screen = 'blocked'; render(); return; }
  if (!S.online) {
    toast('warn', 'Sem internet: usando os dados de ' + (S.cache ? dmy(S.cache.at) : 'antes') + '.');
    syncTimer = setTimeout(() => { S.screen = S.afterSync || 'sale'; S.afterSync = 'sale'; render(); }, 500); return;
  }
  let i = 0;
  const step = () => {
    if (S.screen !== 'sync') return;
    const el = $('#st' + i); if (!el) { S.cache = { at: Date.now(), loja: S.lojaId }; S.catver++; { const vs = vouchersAtivos(S.lojaId); S.vouchers[S.lojaId] = vs; S.vAt = Date.now(); logSync('Vouchers', true, 'Vouchers ativos baixados: ' + vs.length + ' (pausados, vencidos e esgotados ficam de fora)'); clockCheck(false); } { const mq = S.maqs.find(x => x.code === S.cfg.maq); S.tpl = S.protoTpl ? RECEIPT_ALT : RECEIPT_DEFAULT; S.tplAt = Date.now(); logSync('Configurações', true, 'Configurações baixadas: PDV ' + termCode() + ', maquininha ' + (mq ? mq.code + ' (' + (TIPOS_MAQ[mq.tipo] || mq.tipo).toLowerCase() + ')' : 'nenhuma') + ', parâmetros do PDV e modelo do comprovante (' + (S.protoTpl ? 'alterado pela igreja' : 'padrão') + ')'); } logSync('Produtos', true, 'Catálogo v' + S.catver + ' baixado: ' + items().length + ' itens (com preço e estoque) e ' + (CATS[S.lojaId] || []).length + ' categorias'); save(); S.screen = S.afterSync || 'sale'; S.afterSync = 'sale'; render(); toast('ok', 'Produtos atualizados.'); return; }
    $('i', el).style.width = '100%'; el.classList.add('done'); i++; syncTimer = setTimeout(step, 520);
  };
  syncTimer = setTimeout(step, 250);
}

function saleView() {
  if (!S.cart.length) { S.discOpen = false; S.priceEdit = null; }
  const cats = ['Todos', ...(CATS[S.lojaId] || [])];
  return `<div class="sale"><section class="catalog">
    <div class="codebar"><label class="codebox">${ic('scan')}<input id="code" autocomplete="off" spellcheck="false" placeholder="Passe o leitor, digite o código ou busque pelo nome" aria-label="Código de barras ou nome"><span class="hint"><kbd>F2</kbd> foco</span></label><select class="inp catsel" id="catsel" aria-label="Categoria">${cats.map(c => `<option ${S.cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div>
    <div class="plist" id="plist">${listHTML()}</div></section>
   <aside class="cart" aria-label="Carrinho">${cartPanel()}</aside></div>`;
}
function cartPanel() {
  if (S.panel === 'pay' && S.pay) return payPanel();
  if (S.panel === 'done') return donePanel();
  const t = calc(), d = S.disc;
  const vch = S.voucher
    ? `<div class="row"><span class="vchip">${ic('ticket')}<b>${esc(S.voucher.code)}</b><small>${S.voucher.tipo === 'p' ? S.voucher.valor + '%' : brl(S.voucher.valor)} · ${esc(S.voucher.fonte)}</small><button data-a="vrm" aria-label="Tirar o voucher">${ic('x')}</button></span><b id="vdisc" style="color:var(--ok)">− ${brl(t.vd)}</b></div>`
    : `<div class="vou">${ic('ticket')}<input class="inp vin" id="vcode" autocomplete="off" value="${esc(S.vTry)}" placeholder="Código do voucher (aplica sozinho)" ${S.cart.length ? '' : 'disabled'} aria-label="Voucher"><button class="btn sm" data-a="vval" ${S.cart.length ? '' : 'disabled'}>Validar</button></div>${S.vErr ? `<span class="verr">${esc(S.vErr)}</span>` : ''}`;
  const disc = S.discOpen
    ? `<div class="discbox"><div class="seg"><button data-a="dtype" data-v="v" aria-pressed="${d.t === 'v'}">R$</button><button data-a="dtype" data-v="p" aria-pressed="${d.t === 'p'}">%</button></div><input class="inp" id="dv" inputmode="decimal" value="${d.v ? String(d.v).replace('.', ',') : ''}" placeholder="${d.t === 'p' ? 'Porcentagem' : 'Valor do desconto'}" aria-label="Desconto"><button class="btn sm" data-a="dzero">Tirar</button><button class="btn sm pri" data-a="dok">OK</button></div>`
    : `<div class="row"><button class="tag" data-a="discount" ${S.cart.length ? '' : 'disabled'}>${ic('tag')}${t.disc ? 'Desconto' : 'Dar desconto'} <kbd>F4</kbd></button><b id="discv" style="color:${t.disc ? 'var(--ok)' : 'var(--soft)'}">${t.disc ? '− ' + brl(t.disc) : brl(0)}</b></div>`;
  return `<h2>Venda atual<span>${t.qty} ${t.qty === 1 ? 'item' : 'itens'}</span></h2>
    <div class="lines">${S.cart.length ? S.cart.map(lineHTML).join('') : `<div class="none">${ic('scan')}<b>Passe o primeiro produto</b><span>O leitor adiciona sozinho. Sem leitor, digite o código e aperte Enter.</span></div>`}</div>
    <div class="sums"><div class="row"><span class="l">Subtotal</span><b id="sub">${brl(t.sub)}</b></div>${vch}${disc}</div>
    <div class="total"><span>Total</span><b id="tot">${brl(t.total)}</b></div>
    <div class="acts"><button class="btn lg" data-a="clear" ${S.cart.length ? '' : 'disabled'} aria-label="Limpar venda">${ic('trash')}</button><button class="btn ok lg" data-a="pay" ${S.cart.length ? '' : 'disabled'}>Pagar <kbd>F10</kbd></button></div>`;
}
function updTotals() {
  const t = calc(), a = $('#sub'), b = $('#discv'), c = $('#tot'); if (a) a.textContent = brl(t.sub); if (c) c.textContent = brl(t.total);
  if (b) { b.textContent = t.disc ? '− ' + brl(t.disc) : brl(0); b.style.color = t.disc ? 'var(--ok)' : 'var(--soft)'; }
  const vd = $('#vdisc'); if (vd) vd.textContent = '− ' + brl(t.vd);
}
function payPanel() {
  const t = calc(), p = S.pay, tabs = [['cash', 'Dinheiro', '1'], ['pix', 'Pix', '2'], ['card', 'Cartão', '3']], paid = payPaid(), rem = payRem();
  const ds = [t.vd ? 'voucher ' + S.voucher.code + ' − ' + brl(t.vd) : '', t.disc ? 'desconto − ' + brl(t.disc) : ''].filter(Boolean).join(' · ');
  return `<h2><button class="btn sm ghost" data-a="payBack">← Voltar</button>Pagamento</h2>
    <div class="paytot"><span>${paid ? 'Falta pagar' : 'Total a pagar'}</span><b>${brl(rem)}</b>${ds ? `<small>${esc(ds)}</small>` : ''}${paid ? `<div class="pparts">${p.parts.map(x => `<div><span>${esc(x.method)}${x.tipo ? ' ' + esc(String(x.tipo).toLowerCase()) : ''}</span><b>${brl(x.amount)}</b></div>`).join('')}<div><span>Total da venda</span><b>${brl(t.total)}</b></div></div>` : ''}</div>
    <div class="pbody"><div class="seg full" role="tablist">${tabs.map(x => `<button data-a="method" data-v="${x[0]}" aria-pressed="${p.method === x[0]}">${x[1]} <kbd>${x[2]}</kbd></button>`).join('')}</div><div id="paybody" class="pb2">${payBody()}</div></div>
    <div class="acts one"><button class="btn ok lg" id="payok" data-a="payOk" ${canConfirm() ? '' : 'disabled'}>${payOkLabel()} <kbd>Enter</kbd></button></div>`;
}
const payOkLabel = () => payAmt() < payRem() - 0.004 ? 'Registrar esta parte' : 'Confirmar pagamento';
function donePanel() {
  const s = S.sales.find(x => x.id === S.lastSale); if (!s) return '';
  const prn = S.cfg.printer !== 'none';
  return `<div class="donehead"><div class="okmark">${ic('check')}</div><div><h2 style="padding:0;display:block">Venda registrada</h2><span style="color:var(--muted)">${esc(s.no)} · ${brl(s.total)}</span></div></div>
    <div class="lines donebody">${s.sent ? '<span class="tg ok">Enviada ao servidor</span>' : '<span class="tg wait">Aguardando envio · sai quando a internet voltar</span>'}${divTag(s)}${paperHTML(s)}</div>
    <div class="sums"><div class="tb"><button class="btn" data-a="printSale" data-v="${s.id}" ${prn ? '' : 'disabled'} title="${prn ? '' : 'Sem impressora configurada'}">${ic('printer')}Imprimir</button><input class="inp grow" id="rmail" type="email" placeholder="E-mail do cliente" value="${esc(s.emailTo || '')}"><button class="btn" data-a="mailSale" data-v="${s.id}">${ic('mail')}</button></div>
     ${s.emailTo ? `<span class="tg ${s.emailSent ? 'ok' : 'wait'}">${s.emailSent ? 'E-mail enviado para ' + esc(s.emailTo) : 'E-mail aguardando a internet'}</span>` : ''}${prn ? '' : '<span style="color:var(--muted);font-size:12.5px">Sem impressora: use o e-mail ou configure em Ajustes.</span>'}</div>
    <div class="acts one"><button class="btn ok lg" data-a="newSale">Nova venda <kbd>Enter</kbd></button></div>`;
}
function listHTML() {
  const l = filtered(); if (S.hi >= l.length) S.hi = Math.max(0, l.length - 1);
  if (!l.length) return `<div class="empty">Nenhum produto encontrado.</div>`;
  return `<div class="ph"><span>Produto</span><span>Código</span><span class="r">Estoque</span><span class="r">Preço</span></div>` + l.map((i, k) => {
    const inCart = S.cart.find(c => c.id === i.id), left = i.stock - (inCart ? inCart.qty : 0);
    return `<button class="pr-row${k === S.hi ? ' hi' : ''}" data-a="add" data-id="${i.id}" data-v="${i.id}"><span class="pn">${esc(i.name)}<small>${esc(i.cat)}</small></span><span class="pc">${esc(i.code)}</span><span class="ps r ${left <= 0 ? 'zero' : left <= 3 ? 'low' : ''}">${left}</span><span class="pp r">${brl(i.price)}</span></button>`;
  }).join('');
}
function gridHTML(l) {
  if (!l.length) return `<div class="empty">Nenhum produto encontrado.</div>`;
  return l.map(i => {
    const inCart = S.cart.find(c => c.id === i.id), left = i.stock - (inCart ? inCart.qty : 0);
    return `<button class="prod" data-a="add" data-id="${i.id}" data-v="${i.id}"><span class="st ${left <= 0 ? 'zero' : left <= 3 ? 'low' : ''}">${left <= 0 ? 'sem estoque' : left + ' em estoque'}</span>
     <span class="tile" style="background:var(--t-${CAT_TONE[i.cat] || 'ceu'})">${esc(i.name.split(' ').slice(0, 2).map(w => w[0]).join(''))}</span>
     <span class="nfo"><span class="nm">${esc(i.name)}</span><span class="pr">${brl(i.price)}</span></span></button>`;
  }).join('');
}
function lineHTML(l) {
  const editing = S.priceEdit === l.id, cat = items().find(x => x.id === l.id), alt = cat && round2(l.price) !== round2(cat.price);
  return `<div class="line"><span class="n">${esc(l.name)}</span><span class="lt">${brl(l.qty * l.price)}</span>
   <span class="u"><div class="stepper"><button data-a="dec" data-v="${l.id}" aria-label="Menos">${ic('minus')}</button><b>${l.qty}</b><button data-a="inc" data-v="${l.id}" aria-label="Mais">${ic('plus')}</button></div>
   ${editing ? `<input class="inp pe" id="pe" inputmode="decimal" value="${l.price.toFixed(2).replace('.', ',')}" aria-label="Novo preço"><button class="btn sm pri" data-a="priceOk" data-v="${l.id}">OK</button><small class="hint2">gera divergência; para abater, use Desconto</small>` : `${brl(l.price)} <button data-a="price" data-v="${l.id}">alterar preço</button>${alt ? `<span class="tg wait" title="O preço cobrado é diferente do cadastro: a equipe vai conferir">preço alterado · cadastro ${brl(cat.price)}</span>` : ''}`}</span>
   <span></span><button class="u" style="justify-self:end;border:0;background:none;color:var(--soft)" data-a="rm" data-v="${l.id}" aria-label="Remover">${ic('x')}</button></div>`;
}


/* ---------- pagamento ---------- */
const fmtN = n => Number(n).toFixed(2).replace('.', ',');
const payPaid = () => round2((S.pay.parts || []).reduce((a, x) => a + x.amount, 0));
const payRem = () => Math.max(0, round2(calc().total - payPaid()));
const payAmt = () => { const a = num(S.pay.amt); return a > 0 ? Math.min(round2(a), payRem()) : payRem(); };
function openPay() {
  const t = calc(); if (!S.cart.length) return;
  S.pay = { parts: [], method: 'cash', amt: fmtN(t.total), recv: fmtN(t.total), pix: { state: 'idle' }, tipo: 'Crédito', parc: 1, nsu: '', l4: '', cloud: { state: 'idle' }, manualPix: false, forceSolta: false, tok: 0 };
  S.panel = 'pay'; S.discOpen = false; S.priceEdit = null; renderPay();
}
const num = s => { const n = parseFloat(String(s).replace(/\./g, '').replace(',', '.')); return isNaN(n) ? 0 : n; };
function payBody() {
  const p = S.pay, amt = payAmt(), rem = payRem(), locked = ['sending', 'wait', 'ok'].includes(p.cloud.state) && p.method === 'card' && (S.cfg.mach === 'nuvem' || S.cfg.mach === 'tef') && !p.forceSolta;
  let body = `<div class="field"><label for="pamt">Valor desta forma de pagamento</label><div class="tb"><input class="inp grow" id="pamt" inputmode="decimal" value="${esc(p.amt)}" ${locked ? 'disabled' : ''} style="font:700 18px/22px var(--font)"><button class="btn sm" data-a="amtRest" ${locked ? 'disabled' : ''}>Restante</button></div>${rem > amt + 0.004 ? `<small class="hint2">Depois faltam ${brl(round2(rem - amt))} em outra forma.</small>` : ''}</div>`;
  if (p.method === 'cash') {
    const r = num(p.recv), tr = round2(r - amt);
    body += `<div class="field"><label for="recv">Valor recebido</label><input class="inp" id="recv" inputmode="decimal" value="${esc(p.recv)}" style="font:700 22px/28px var(--font)"></div>
     <div class="quick">${[amt, 20, 50, 100, 200].map((v, i) => `<button class="btn sm" data-a="quick" data-v="${v}">${i === 0 ? 'Valor exato' : brl(v)}</button>`).join('')}</div>
     <div class="row"><span class="l">Troco</span><span class="troco" id="troco">${tr >= 0 ? brl(tr) : '—'}</span></div>`;
  } else if (p.method === 'pix') {
    if (p.manualPix) body += `<div class="banner info">${ic('check')}<span>Confirmação à mão de <b>${brl(amt)}</b>: confira o comprovante no celular do cliente.</span></div><div class="field"><label for="pixwhy">Por que está confirmando à mão?</label><input class="inp" id="pixwhy" maxlength="120" value="${esc(p.pix.why || '')}" placeholder="Ex.: sem internet, maquininha sem sinal, comprovante conferido"></div>${S.online ? '<button class="btn sm ghost" data-a="pixBack">Voltar ao QR</button>' : ''}`;
    else if (!S.online) body += `<div class="banner">${ic('wifioff')}<span>O Pix precisa de internet para confirmar sozinho. Você pode conferir o comprovante no celular do cliente e confirmar à mão.</span></div><button class="btn" data-a="manualPix">Confirmar o Pix à mão</button>`;
    else if (p.pix.state === 'ok') body += `<div class="wait"><div class="okmark">${ic('check')}</div><b>Pix recebido</b><span style="color:var(--muted)">${brl(amt)} confirmado pelo Alva.</span></div>`;
    else body += `${qrSVG(amt)}<p style="text-align:center;margin:0;color:var(--muted)">O cliente lê o QR e paga ${brl(amt)}. Aguardando a confirmação…</p><div class="tb" style="justify-content:center"><button class="btn sm" data-a="pixSim">Simular: Pix pago</button>${p.pix.late ? '<button class="btn sm" data-a="manualPix">O cliente já pagou? Confirmar à mão</button>' : ''}</div>`;
  } else {
    const mach = S.cfg.mach, cloud = (mach === 'nuvem' || mach === 'tef') && !p.forceSolta;
    if (mach === 'none') body += `<div class="banner">${ic('card')}<span>Este PDV não tem maquininha ligada. Escolha uma em Ajustes › Maquininha. As maquininhas vêm do cadastro do Alva Web.</span></div>`;
    else if (cloud) {
      const c = p.cloud;
      if (!S.online) body += `<div class="banner">${ic('wifioff')}<span>${mach === 'tef' ? 'O TEF precisa de internet para falar com a adquirente' : 'A maquininha pela nuvem precisa de internet'}. Nesta venda, use a maquininha solta: o cliente passa o cartão e você registra.</span></div><button class="btn" data-a="forceSolta">Usar a maquininha solta</button>`;
      else if (c.state === 'idle') body += `<p style="margin:0;color:var(--muted)">O valor de <b style="color:var(--ink)">${brl(amt)}</b> vai direto para ${mach === 'tef' ? 'o pinpad do TEF' : 'a maquininha Mercado Pago Point'} do caixa.</p><button class="btn pri lg" data-a="cloudSend">Enviar para a maquininha</button>`;
      else if (c.state === 'sending') body += `<div class="wait"><div class="spin"></div><b>Enviando o valor para a maquininha…</b></div>`;
      else if (c.state === 'wait') body += `<div class="wait"><div class="spin"></div><b>Aguardando o cliente passar o cartão</b><span style="color:var(--muted)">A maquininha mostra ${brl(amt)}.</span><div class="tb"><button class="btn sm" data-a="cloudSim" data-v="ok">Simular: aprovado</button><button class="btn sm" data-a="cloudSim" data-v="bad">Simular: recusado</button><button class="btn sm ghost" data-a="cloudCancel">Cancelar cobrança</button></div></div>`;
      else if (c.state === 'ok') body += `<div class="wait"><div class="okmark">${ic('check')}</div><b>Pagamento aprovado</b><div class="kv"><span>Bandeira</span><span>${esc(c.info.brand)}</span><span>Forma</span><span>${esc(c.info.tipo)}${c.info.parc > 1 ? ' em ' + c.info.parc + 'x' : ''}</span><span>Pagamento</span><span style="font-family:var(--mono)">${esc(c.info.id)}</span></div></div>`;
      else body += `<div class="wait"><div class="badmark">${ic('x')}</div><b>Pagamento recusado</b><span style="color:var(--muted)">O cartão não foi aprovado. Tente outro cartão ou outra forma.</span><button class="btn pri" data-a="cloudSend">Tentar de novo</button></div>`;
    } else {
      body += `<div class="field"><label>Como o cliente pagou?</label><div class="seg" role="group"><button data-a="tipo" data-v="Crédito" aria-pressed="${p.tipo === 'Crédito'}">Crédito</button><button data-a="tipo" data-v="Débito" aria-pressed="${p.tipo === 'Débito'}">Débito</button></div></div>
       ${p.tipo === 'Crédito' ? `<div class="field"><label for="parc">Parcelas</label><select class="inp" id="parc">${[1, 2, 3, 4, 5, 6].map(n => `<option value="${n}" ${p.parc === n ? 'selected' : ''}>${n}x de ${brl(amt / n)}</option>`).join('')}</select></div>` : ''}
       <div class="two"><div class="field"><label for="nsu">Autorização ou NSU (opcional)</label><input class="inp" id="nsu" value="${esc(p.nsu)}" placeholder="Do comprovante da máquina"></div><div class="field"><label for="l4">Final do cartão (opcional)</label><input class="inp" id="l4" maxlength="4" value="${esc(p.l4)}" placeholder="0000"></div></div>
       <p style="margin:0;color:var(--muted);font-size:12.5px">Maquininha solta: o cliente passa o cartão na máquina e você só registra aqui. Funciona sem internet.</p>`;
    }
  }
  return body;
}
function renderPay() {
  render(); armPix(); { const w = $('#pixwhy'); if (w) w.focus(); }
  if (S.pay && S.pay.method === 'cash') { const r = $('#recv'); if (r) { r.focus(); r.select(); } }
}
function canConfirm() {
  const p = S.pay, amt = payAmt();
  if (amt <= 0) return false;
  if (p.method === 'cash') return num(p.recv) >= amt - 0.004;
  if (p.method === 'pix') return p.manualPix ? String(p.pix.why || '').trim().length >= 3 : (S.online && p.pix.state === 'ok');
  if (S.cfg.mach === 'none') return false;
  if ((S.cfg.mach === 'nuvem' || S.cfg.mach === 'tef') && !p.forceSolta) return S.online && p.cloud.state === 'ok';
  return true;
}
function updPay() { const p = S.pay, amt = payAmt(); const tr = $('#troco'); if (tr) { const v = round2(num(p.recv) - amt); tr.textContent = v >= 0 ? brl(v) : '—'; } const b = $('#payok'); if (b) { b.disabled = !canConfirm(); b.innerHTML = payOkLabel() + ' <kbd>Enter</kbd>'; } }
function armPix() {
  const p = S.pay; if (!p || p.method !== 'pix' || !S.online || p.manualPix || p.pix.state === 'ok' || p.pix.t0) return;
  p.pix.t0 = Date.now(); const tok = p.tok;
  setTimeout(() => { if (S.pay !== p || p.tok !== tok || p.pix.state === 'ok') return; p.pix.late = true; if (p.method === 'pix' && !p.manualPix) { const b = $('#paybody'); if (b) b.innerHTML = payBody(); updPay(); } }, PIX_MANUAL_S * 1000);
}
function qrSVG(seed) {
  let h = Math.round(seed * 100) + 7, cells = '';
  const rnd = () => { h = (h * 1103515245 + 12345) & 0x7fffffff; return h / 0x7fffffff; };
  for (let y = 0; y < 25; y++) for (let x = 0; x < 25; x++) {
    const f = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
    if (!f && rnd() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  const fp = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#000"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#000"/>`;
  return `<svg class="qr" viewBox="0 0 25 25" aria-label="QR Code do Pix (demonstração)"><g fill="#000">${cells}</g>${fp(0, 0)}${fp(18, 0)}${fp(0, 18)}</svg>`;
}
function startCloud() {
  const p = S.pay; p.tok++; const tok = p.tok; p.cloud = { state: 'sending' }; renderPay();
  setTimeout(() => { if (S.pay !== p || p.tok !== tok) return; p.cloud.state = 'wait'; renderPay(); }, 1100);
}
function cloudResult(kind) {
  const p = S.pay; p.tok++;
  if (kind === 'ok') { const b = ['Visa', 'Mastercard', 'Elo'][Math.floor(Math.random() * 3)]; p.cloud = { state: 'ok', info: { brand: b, tipo: 'Crédito', parc: 1, id: 'PAY' + Math.random().toString(36).slice(2, 10).toUpperCase() } }; }
  else p.cloud = { state: 'bad' };
  renderPay();
}
function payInfo() {
  const o = payInfo0();
  if (o.method === 'Cartão') { o.maq = S.cfg.maq || ''; const mq = S.maqs.find(x => x.code === o.maq); if (mq) { o.maqNome = mq.nome; o.terminal = mq.terminal || ''; } }
  return o;
}
function payInfo0() {
  const p = S.pay, amt = payAmt();
  if (p.method === 'cash') { const r = num(p.recv); return { method: 'Dinheiro', amount: amt, recv: r, troco: round2(r - amt) }; }
  if (p.method === 'pix') return { method: 'Pix', amount: amt, manual: !!p.manualPix, why: p.manualPix ? String(p.pix.why || '').trim() : '' };
  if ((S.cfg.mach === 'nuvem' || S.cfg.mach === 'tef') && !p.forceSolta) return { method: 'Cartão', amount: amt, via: S.cfg.mach === 'tef' ? 'TEF (pinpad)' : 'Mercado Pago Point (nuvem)', tipo: p.cloud.info.tipo, parc: p.cloud.info.parc, brand: p.cloud.info.brand, ref: p.cloud.info.id };
  return { method: 'Cartão', amount: amt, via: 'Maquininha solta', tipo: p.tipo, parc: p.tipo === 'Crédito' ? p.parc : 1, nsu: p.nsu, l4: p.l4 };
}
function addPart() {
  const part = payInfo(), p = S.pay; p.parts.push(part); const rem = payRem();
  if (rem <= 0.004) { finalize(); return; }
  p.tok++; p.method = 'cash'; p.pix = { state: 'idle' }; p.amt = fmtN(rem); p.recv = fmtN(rem); p.cloud = { state: 'idle' }; p.manualPix = false; p.forceSolta = false; p.nsu = ''; p.l4 = '';
  toast('ok', brl(part.amount) + ' registrado em ' + part.method.toLowerCase() + '. Faltam ' + brl(rem) + '.'); renderPay();
}
function finalize() {
  const t = calc(), now = Date.now(); S.seq++;
  const pays = S.pay.parts.slice(), divs = [];
  S.cart.forEach(l => { const it = items().find(x => x.id === l.id); if (it && round2(l.price) !== round2(it.price)) divs.push({ tipo: 'Preço', txt: l.name + ': cobrado ' + brl(l.price) + ', cadastro ' + brl(it.price) }); });
  S.cart.forEach(l => { const it = items().find(x => x.id === l.id); if (it) { it.stock -= l.qty; if (it.stock < 0) divs.push({ tipo: 'Estoque', txt: l.name + ': saldo ficou em ' + it.stock }); } });
  if (S.voucher) { const lv = ((S.vouchers || {})[S.lojaId] || []).find(x => x.code === S.voucher.code); if (lv) { lv.usos++; if (lv.limite != null && lv.usos > lv.limite) divs.push({ tipo: 'Voucher', txt: 'Voucher ' + lv.code + ' usado acima do limite de ' + lv.limite + ' uso(s)' }); } }
  const sale = { id: 'v' + now, no: termCode() + '-' + pad(S.seq, 6), term: termCode(), at: now, atSrv: now - (S.clock ? S.clock.off : 0), loja: S.lojaId, lines: S.cart.map(l => ({ id: l.id, code: l.code, name: l.name, qty: l.qty, price: l.price })), sub: t.sub, vd: t.vd, voucher: S.voucher ? { code: S.voucher.code, nome: S.voucher.nome, tipo: S.voucher.tipo, valor: S.voucher.valor } : null, disc: t.disc, total: t.total, pays, pay: Object.assign({}, pays[0], { method: pays.length > 1 ? 'Misto' : pays[0].method }), divs, sent: S.online };
  S.sales.unshift(sale); S.cart = []; S.disc = { t: 'v', v: 0 }; S.voucher = null; S.vErr = ''; S.q = '';
  logSync('Vendas', S.online ? true : 'wait', S.online ? 'Venda ' + sale.no + ' enviada ao Alva' : 'Venda ' + sale.no + ' guardada no computador: sem internet');
  if (divs.length) logSync('Divergência', 'wait', 'Venda ' + sale.no + ': ' + divs.length + (divs.length === 1 ? ' divergência registrada' : ' divergências registradas') + ' (' + [...new Set(divs.map(x => x.tipo.toLowerCase()))].join(', ') + '); a equipe confere em Loja › Divergências');
  if (S.online) S.lastSales = Date.now(); save();
  S.panel = 'done'; S.lastSale = sale.id; S.pay = null; S.discOpen = false; S.priceEdit = null; render();
}
const payMethodOf = s => (s.pays || [s.pay]).length > 1 ? 'Misto' : s.pay.method;
function payText(p) {
  if (p.method === 'Dinheiro') return 'Dinheiro · recebido ' + brl(p.recv) + ' · troco ' + brl(p.troco);
  if (p.method === 'Pix') return 'Pix' + (p.manual ? ' (conferido à mão)' : '');
  return 'Cartão ' + p.tipo + (p.parc > 1 ? ' em ' + p.parc + 'x' : '') + (p.brand ? ' · ' + p.brand : '') + ' · ' + p.via + (p.maq ? ' · ' + p.maq : '');
}
const payLinesHTML = s => { const ps = s.pays || [s.pay]; return ps.length === 1 ? `<div>${esc(payText(ps[0]))}</div>` : ps.map(x => `<div>${esc(brl(x.amount))} · ${esc(payText(x))}</div>`).join(''); };

/* ---------- comprovante ---------- */
const dmy0 = t => { const d = new Date(t); return pad(d.getDate(), 2) + '/' + pad(d.getMonth() + 1, 2) + '/' + d.getFullYear(); };
/* monta o comprovante a partir do modelo (texto com marcas); a largura (58 ou 80 mm) é do agente de impressão */
function rcpFormat(tpl, s, width) {
  const L = LOJAS.find(l => l.id === s.loja) || LOJAS[0], ig = IGREJAS.find(x => x.id === (S.term && S.term.igrejaId)) || IGREJAS[0], pays = s.pays || [s.pay];
  const D = { igreja: ig.nome, cnpj: ig.cnpj || '', loja: L.nome, pdv: s.term || termCode(), numero: s.no, data: dmy0(s.at), hora: hhmm(s.at), subtotal: brl(s.sub), voucher: s.vd ? 'Voucher ' + s.voucher.code + '   − ' + brl(s.vd) : '', desconto: s.disc ? 'Desconto   − ' + brl(s.disc) : '', total: brl(s.total), pagamento: pays.length === 1 ? payText(pays[0]) : pays.map(x => brl(x.amount) + ' ' + payText(x).split(' · ')[0]).join('\n') };
  const out = String(tpl).replace(/\{\{#itens\}\}\n?([\s\S]*?)\{\{\/itens\}\}\n?/g, (_, b) => s.lines.map(l => b.replace(/\{\{qtd\}\}/g, l.qty).replace(/\{\{nome\}\}/g, l.name).replace(/\{\{valor\}\}/g, brl(l.qty * l.price)).replace(/\n$/, '')).join('\n') + '\n');
  const ls = out.split('\n').filter(l => !(/^\{\{(voucher|desconto)\}\}$/.test(l.trim()) && !D[l.trim().slice(2, -2)])).join('\n').replace(/\{\{(\w+)\}\}/g, (m, k) => k in D ? D[k] : m).split('\n');
  return ls.map(l => { if (/^-{5,}$/.test(l.trim())) return '-'.repeat(width); const m = l.match(/^(.*?\S)\s{2,}(\S.*)$/); if (!m) return l; const nm = m[1].length + 1 + m[2].length <= width ? m[1] : m[1].slice(0, Math.max(4, width - m[2].length - 1)); return nm + ' '.repeat(Math.max(1, width - nm.length - m[2].length)) + m[2]; }).join('\n') + (s.canc ? '\n\nVENDA CANCELADA' : '');
}
function paperHTML(s) {
  const w58 = S.cfg.paper === '58';
  return `<div class="paper ${w58 ? 'w58' : 'w80'}"><pre>${esc(rcpFormat(S.tpl || RECEIPT_DEFAULT, s, w58 ? 32 : 48))}</pre></div>`;
}
function openReceipt(id, fresh) {
  const s = S.sales.find(x => x.id === id); if (!s) return;
  const prn = S.cfg.printer !== 'none';
  openModal(dlg(fresh ? 'Venda registrada' : 'Comprovante ' + esc(s.no),
   `<div class="recbox">${paperHTML(s)}<div class="side">
    <div>${s.sent ? '<span class="tg ok">Enviada ao servidor</span>' : '<span class="tg wait">Aguardando envio · sai quando a internet voltar</span>'}</div>
    <button class="btn lg" data-a="printSale" data-v="${s.id}" ${prn ? '' : 'disabled'}>${ic('printer')}Imprimir</button>
    ${prn ? '' : `<span style="color:var(--muted);font-size:12.5px;margin-top:-6px">Sem impressora configurada. Use o e-mail ou configure em Ajustes.</span>`}
    <div class="field"><label for="rmail">Enviar por e-mail</label><div class="tb"><input class="inp grow" id="rmail" type="email" placeholder="cliente@email.com" value="${esc(s.email || '')}"><button class="btn" data-a="mailSale" data-v="${s.id}">${ic('mail')}Enviar</button></div></div>
    ${s.emailTo ? `<span class="tg ${s.emailSent ? 'ok' : 'wait'}">${s.emailSent ? 'E-mail enviado para ' + esc(s.emailTo) : 'E-mail de ' + esc(s.emailTo) + ' aguardando a internet'}</span>` : ''}
    </div></div>`, `<button class="btn ok lg" data-a="closeModal">${fresh ? 'Nova venda' : 'Fechar'} <kbd>Enter</kbd></button>`), 780);
}

/* ---------- vendas do dia ---------- */
function salesView() {
  const ok = S.sales.filter(s => !s.canc), tot = ok.reduce((a, s) => a + s.total, 0), sumBy = k => ok.reduce((a, s) => a + (s.pays || [s.pay]).filter(p => p.method === k).reduce((b, p) => b + (p.amount != null ? p.amount : s.total), 0), 0);
  const cash = sumBy('Dinheiro'), card = sumBy('Cartão'), pix = sumBy('Pix');
  const l = S.sales.filter(s => S.filter === 'todas' || (S.filter === 'aguardando' && (!s.sent || (s.canc && !s.canc.sent))) || (S.filter === 'canceladas' && s.canc) || (S.filter === 'divergencia' && s.divs && s.divs.length));
  return `<div class="pg"><h1>Vendas do dia</h1><p class="sub">${esc(loja().nome)} · ${esc(termCode())}</p>
   <div class="cards"><div class="card"><b>${ok.length}</b><span>Vendas</span></div><div class="card"><b>${brl(tot)}</b><span>Total vendido</span></div><div class="card"><b>${pending()}</b><span>Aguardando envio</span></div><div class="card"><b>${S.sales.length - ok.length}</b><span>Canceladas</span></div></div>
   <div class="tb"><div class="seg">${[['todas', 'Todas'], ['aguardando', 'Aguardando envio'], ['canceladas', 'Canceladas'], ['divergencia', 'Com divergência']].map(x => `<button data-a="filter" data-v="${x[0]}" aria-pressed="${S.filter === x[0]}">${x[1]}</button>`).join('')}</div><span class="grow"></span><span style="color:var(--muted)">Dinheiro ${brl(cash)} · Pix ${brl(pix)} · Cartão ${brl(card)}</span></div>
   <div class="panel">${l.length ? `<table class="tbl"><thead><tr><th>Venda</th><th>Hora</th><th>Itens</th><th>Pagamento</th><th class="r">Total</th><th>Situação</th></tr></thead><tbody>${l.map(s => `<tr class="click" data-a="openSale" data-v="${s.id}"><td style="font-family:var(--mono)">${esc(s.no)}</td><td>${hhmm(s.at)}</td><td>${s.lines.reduce((a, x) => a + x.qty, 0)}</td><td>${esc(payMethodOf(s))}</td><td class="r"><b>${brl(s.total)}</b></td><td>${s.canc ? '<span class="tg bad">Cancelada</span> ' : ''}${s.divs && s.divs.length ? '<span class="tg wait">Divergência</span> ' : ''}${(!s.sent || (s.canc && !s.canc.sent)) ? '<span class="tg wait">Aguardando envio</span>' : '<span class="tg ok">Enviada</span>'}</td></tr>`).join('')}</tbody></table>` : `<div class="empty" style="padding:48px 0">Nenhuma venda ainda. Faça uma venda na tela Venda.</div>`}</div></div>`;
}
function openSale(id) {
  const s = S.sales.find(x => x.id === id); if (!s) return;
  openModal(dlg('Venda ' + esc(s.no), `<div class="recbox">${paperHTML(s)}<div class="side">
    <div>${s.canc ? `<span class="tg bad">Cancelada: ${esc(s.canc.why)}</span>` : ''} ${(!s.sent) ? '<span class="tg wait">Aguardando envio</span>' : '<span class="tg ok">Enviada</span>'}</div>
    ${saleExtra(s)}
    <button class="btn" data-a="receipt" data-v="${s.id}">${ic('printer')}Reimprimir ou enviar por e-mail</button>
    ${s.canc ? '' : `<button class="btn bad" data-a="cancelAsk" data-v="${s.id}">${ic('x')}Cancelar esta venda</button>`}</div></div>`, null), 780);
}
function cancelAsk(id) {
  const s = S.sales.find(x => x.id === id);
  openModal(dlg('Cancelar a venda ' + esc(s.no) + '?', `<p style="margin:0;color:var(--muted)">Os itens voltam ao estoque. ${S.online ? '' : 'Sem internet, o cancelamento também fica aguardando envio.'}</p>
   <div class="field"><label for="why">Motivo</label><select class="inp" id="why">${['Cliente desistiu', 'Erro de digitação', 'Produto com defeito', 'Outro'].map(x => `<option>${x}</option>`).join('')}</select></div>`,
   `<button class="btn" data-a="closeModal">Voltar</button><button class="btn bad" data-a="cancelDo" data-v="${s.id}">Cancelar a venda</button>`), 480);
}

/* ---------- produtos ---------- */
function productsView() {
  const l = items().filter(i => (S.pcat === 'Todas' || i.cat === S.pcat) && (!S.pq || (i.name + ' ' + i.code).toLowerCase().includes(S.pq.toLowerCase())));
  return `<div class="pg"><h1>Catálogo</h1>${ctabs('products')}<p class="sub">${items().length} itens em ${esc(loja().nome)}. Os mesmos do cadastro da loja no Alva.</p>
   ${S.online ? '' : `<div class="banner">${ic('wifioff')}<span><b>Ajustes só com internet.</b> Sem conexão, o PDV só vende. Os produtos abaixo são os últimos baixados.</span></div>`}
   <div class="tb"><label class="srch">${ic('search')}<input id="pq" placeholder="Buscar por nome ou código" value="${esc(S.pq)}"></label>
    <select class="inp" id="pcat">${['Todas', ...(CATS[S.lojaId] || [])].map(c => `<option ${S.pcat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select><span class="grow"></span>
    <button class="btn pri" data-a="newProd" ${S.online && S.protoAdmin ? '' : 'disabled'} ${S.protoAdmin ? '' : 'title="Só o Admin da loja"'}>${ic('plus')}Novo produto</button></div>
   <div class="panel"><table class="tbl"><thead><tr><th>Produto</th><th>Código</th><th>Categoria</th><th class="r">Preço</th><th class="r">Estoque</th><th></th></tr></thead><tbody>
   ${l.map(i => `<tr><td><b>${esc(i.name)}</b></td><td style="font-family:var(--mono)">${esc(i.code)}</td><td>${esc(i.cat)}</td><td class="r">${brl(i.price)}</td><td class="r">${i.stock <= 3 ? `<span class="tg wait">${i.stock}</span>` : i.stock}</td><td class="r"><button class="btn sm" data-a="editProd" data-v="${i.id}" ${S.online && S.protoAdmin ? '' : 'disabled'}>${ic('edit')}Ajustar</button></td></tr>`).join('') || `<tr><td colspan="6" class="empty" style="padding:30px;text-align:center">Nenhum produto.</td></tr>`}</tbody></table></div></div>`;
}
const ctabs = cur => `<div class="utabs" role="tablist">${[['products', 'Produtos'], ['cats', 'Categorias'], ['vouchers', 'Vouchers']].map(x => `<button role="tab" data-a="go" data-v="${x[0]}" aria-selected="${cur === x[0]}">${x[1]}</button>`).join('')}</div>`;
function catsView() {
  const q = (S.cq || '').toLowerCase(), cs = (CATS[S.lojaId] || []).filter(c => !q || c.toLowerCase().includes(q));
  return `<div class="pg"><h1>Catálogo</h1>${ctabs('cats')}<p class="sub">${(CATS[S.lojaId] || []).length} categorias de ${esc(loja().nome)}, baixadas com os produtos. Servem de filtro na venda.</p>
   ${S.online ? '' : `<div class="banner">${ic('wifioff')}<span><b>Ajustes só com internet.</b> Estas são as categorias da última atualização (${S.cache ? dmy(S.cache.at) : 'nunca'}).</span></div>`}
   <div class="tb"><label class="srch">${ic('search')}<input id="cq" placeholder="Buscar categoria" value="${esc(S.cq || '')}"></label><span class="grow"></span><button class="btn pri" data-a="newCat" ${S.online && S.protoAdmin ? '' : 'disabled'}>${ic('plus')}Nova categoria</button></div>
   <div class="panel"><table class="tbl"><thead><tr><th>Categoria</th><th class="r">Produtos</th><th class="r">Em estoque</th><th></th></tr></thead><tbody>
   ${cs.map(c => { const l = items().filter(i => i.cat === c); return `<tr class="click" data-a="catGo" data-v="${esc(c)}"><td><b>${esc(c)}</b></td><td class="r">${l.length}</td><td class="r">${l.reduce((a, i) => a + Math.max(0, i.stock), 0)}</td><td class="r"><button class="btn sm" data-a="catGo" data-v="${esc(c)}">Ver produtos</button></td></tr>`; }).join('') || `<tr><td colspan="4" class="empty" style="padding:30px;text-align:center">Nenhuma categoria.</td></tr>`}</tbody></table></div></div>`;
}
function vouchersView() {
  const q = (S.vq || '').toLowerCase(), all = (S.vouchers || {})[S.lojaId] || [], vs = all.filter(v => !q || (v.code + ' ' + v.nome).toLowerCase().includes(q)), dd = t => { const d = new Date(t); return pad(d.getDate(), 2) + '/' + pad(d.getMonth() + 1, 2) + '/' + d.getFullYear(); };
  return `<div class="pg"><h1>Catálogo</h1>${ctabs('vouchers')}<p class="sub">${all.length} vouchers ativos de ${esc(loja().nome)}, baixados ${S.vAt ? 'em ' + dmy(S.vAt) : 'ainda não'}. Pausados, vencidos e esgotados não vêm. A pausa é no Alva Web.</p>
   ${S.online ? '' : `<div class="banner">${ic('wifioff')}<span><b>Ajustes só com internet.</b> O PDV confere os vouchers por esta lista.</span></div>`}
   <div class="tb"><label class="srch">${ic('search')}<input id="vq" placeholder="Buscar por código ou campanha" value="${esc(S.vq || '')}"></label><button class="btn" data-a="syncNow" ${S.online ? '' : 'disabled'}>${ic('refresh')}Atualizar agora</button><span class="grow"></span><button class="btn pri" data-a="newVou" ${S.online && S.protoAdmin ? '' : 'disabled'}>${ic('plus')}Novo voucher</button></div>
   <div class="panel"><table class="tbl"><thead><tr><th>Código</th><th>Campanha</th><th>Desconto</th><th>Vale até</th><th class="r">Usos</th></tr></thead><tbody>
   ${vs.map(v => `<tr><td style="font-family:var(--mono)"><b>${esc(v.code)}</b></td><td>${esc(v.nome)}</td><td>${v.tipo === 'p' ? v.valor + '%' : brl(v.valor)}</td><td>${dd(v.ate)}${v.ate - Date.now() < 7 * 864e5 ? ' <span class="tg wait">vence em breve</span>' : ''}</td><td class="r">${v.usos}${v.limite != null ? ' de ' + v.limite : ''}</td></tr>`).join('') || `<tr><td colspan="5" class="empty" style="padding:30px;text-align:center">Nenhum voucher ativo.</td></tr>`}</tbody></table></div></div>`;
}
function editCat() { openModal(dlg('Nova categoria', `<div class="field"><label for="cn">Nome da categoria</label><input class="inp" id="cn" maxlength="40" placeholder="Ex.: Infantil"></div><p style="margin:0;color:var(--muted);font-size:12.5px">Vai direto para o cadastro da loja no Alva. Só o Admin da loja cria categorias.</p>`, `<button class="btn" data-a="closeModal">Cancelar</button><button class="btn pri" data-a="saveCat">Salvar</button>`), 460); }
function editVou() {
  openModal(dlg('Novo voucher', `<div class="two"><div class="field"><label for="vk">Código</label><input class="inp" id="vk" maxlength="20" placeholder="Ex.: PASCOA10" style="text-transform:uppercase"></div><div class="field"><label for="vn">Campanha</label><input class="inp" id="vn" maxlength="40" placeholder="Ex.: Páscoa"></div></div>
   <div class="two"><div class="field"><label for="vt">Tipo de desconto</label><select class="inp" id="vt"><option value="p">Percentual (%)</option><option value="v">Valor fixo (R$)</option></select></div><div class="field"><label for="vv">Valor</label><input class="inp" id="vv" inputmode="decimal" placeholder="10"></div></div>
   <div class="two"><div class="field"><label for="vd">Vale por quantos dias</label><input class="inp" id="vd" inputmode="numeric" value="30"></div><div class="field"><label for="vl">Limite de usos (opcional)</label><input class="inp" id="vl" inputmode="numeric" placeholder="Sem limite"></div></div>
   <p style="margin:0;color:var(--muted);font-size:12.5px">Vai direto para o cadastro da loja no Alva e entra na lista baixada deste PDV. Só o Admin da loja cria vouchers.</p>`, `<button class="btn" data-a="closeModal">Cancelar</button><button class="btn pri" data-a="saveVou">Salvar</button>`), 560);
}
function editProd(id) {
  const it = id ? items().find(x => x.id === id) : { id: '', code: '', name: '', cat: (CATS[S.lojaId] || [])[0], price: 0, stock: 0 };
  openModal(dlg(id ? 'Ajustar produto' : 'Novo produto', `<div class="field"><label for="pn">Nome</label><input class="inp" id="pn" value="${esc(it.name)}"></div>
   <div class="two"><div class="field"><label for="pc">Código de barras</label><input class="inp" id="pc" inputmode="numeric" value="${esc(it.code)}" placeholder="Passe o leitor aqui"></div><div class="field"><label for="pk">Categoria</label><select class="inp" id="pk">${(CATS[S.lojaId] || []).map(c => `<option ${it.cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div></div>
   <div class="two"><div class="field"><label for="pp">Preço (R$)</label><input class="inp" id="pp" inputmode="decimal" value="${String(it.price.toFixed ? it.price.toFixed(2) : it.price).replace('.', ',')}"></div><div class="field"><label for="ps">Estoque</label><input class="inp" id="ps" inputmode="numeric" value="${it.stock}"></div></div>
   <p style="margin:0;color:var(--muted);font-size:12.5px">A alteração vai direto para o cadastro da loja no Alva.</p>`,
   `<button class="btn" data-a="closeModal">Cancelar</button><button class="btn pri" data-a="saveProd" data-v="${esc(id || '')}">Salvar</button>`), 560);
}

/* ---------- ajustes ---------- */
function configView() {
  const c = S.cfg, p = pending();
  const opt = (k, v, t, d, dis) => `<button class="opt" data-a="cfg" data-k="${k}" data-v="${v}" aria-pressed="${c[k] === v}" ${dis ? 'disabled' : ''}><span class="rad"></span><span><b>${t}</b><span class="d">${d}</span></span></button>`;
  return `<div class="pg"><h1>Ajustes do PDV</h1><p class="sub">Cada equipamento é opcional: o que não estiver ligado simplesmente não aparece na venda.</p>
   <div class="panel"><h3>${ic('box')} Terminal</h3><div class="cont" style="padding:8px 18px 18px;display:flex;flex-direction:column;gap:10px"><div class="two" style="gap:6px 28px"><div class="row"><span class="l">Organização</span><b>${esc(S.term.org)}</b></div><div class="row"><span class="l">Igreja</span><b>${esc(igrejaNome())}</b></div><div class="row"><span class="l">Loja</span><b>${esc(loja().nome)}</b></div><div class="row"><span class="l">PDV</span><b>${esc(S.term.nome || '')} · <span style="font-family:var(--mono)">${esc(S.term.code)}</span></b></div><div class="row"><span class="l">Maquininha</span><b>${S.maqs.find(x => x.code === S.cfg.maq) ? esc(S.maqs.find(x => x.code === S.cfg.maq).nome) + ' · <span style="font-family:var(--mono)">' + esc(S.cfg.maq) + '</span>' : 'nenhuma'}</b></div><div class="row"><span class="l">Esta máquina</span><b style="font-family:var(--mono)">${esc(MAQUINA)}</b></div><div class="row"><span class="l">IP</span><b style="font-family:var(--mono)">${IP}</b></div><div class="row"><span class="l">Versão do PDV</span><b style="font-family:var(--mono)">${S.ver}</b></div><div class="row"><span class="l">Configurado em</span><b>${dmy(S.term.at)} · ${esc(S.term.by)}</b></div><div class="row"><span class="l">Cadastro no Alva Web</span>${S.regOk ? '<span class="tg ok">Ativo</span>' : '<span class="tg bad">Removido</span>'}</div></div><button class="btn sm" data-a="reconfig" style="align-self:flex-start">Reconfigurar este terminal</button></div></div>
   ${equipPanels()}
   <div class="two"><div class="panel"><h3>${ic('list')} Comprovante</h3><div class="cont" style="padding:8px 18px 18px;display:flex;flex-direction:column;gap:10px">
     <div class="row"><span class="l">Modelo</span><b>${S.tplAt ? 'Baixado do Alva em ' + dmy(S.tplAt) : 'Padrão do PDV (ainda não baixou)'}</b></div>
     <p style="margin:0;color:var(--muted);font-size:12.5px">O texto do comprovante é um parâmetro da igreja (Alva Web › Parâmetros › PDV e vendas). O PDV baixa na sincronização; sem o baixado, usa o padrão. Sem valor fiscal.</p>
     <div class="paper ${S.cfg.paper === '58' ? 'w58' : 'w80'}"><pre>${esc(rcpFormat(S.tpl || RECEIPT_DEFAULT, { no: termCode() + '-000123', term: termCode(), at: Date.now(), loja: S.lojaId, lines: [{ qty: 1, name: 'Livro · Uma vida com propósito', price: 49 }, { qty: 2, name: 'Caneca Alva', price: 28 }], sub: 105, vd: 10.5, voucher: { code: 'BEMVINDO10' }, disc: 0, total: 94.5, pay: { method: 'Pix', amount: 94.5 } }, S.cfg.paper === '58' ? 32 : 48))}</pre></div>
     <p style="margin:0;color:var(--muted);font-size:12.5px">Comprovante simples, sem valor fiscal.</p></div></div>
    <div class="panel"><h3>${ic('refresh')} Atualizações do PDV</h3><div class="cont" style="padding:8px 18px 18px;display:flex;flex-direction:column;gap:10px">${updPanel()}</div></div>
    <div class="panel"><h3>${ic('refresh')} Sincronização <button class="btn sm" data-a="go" data-v="synclog" style="margin-left:10px">Ver registro</button></h3><div class="cont" style="padding:8px 18px 18px;display:flex;flex-direction:column;gap:10px">
     <div class="row"><span class="l">Produtos atualizados</span><b>${S.cache ? dmy(S.cache.at) : 'nunca'}</b></div><div class="row"><span class="l">Vouchers baixados</span><b>${((S.vouchers || {})[S.lojaId] || []).length}${S.vAt ? ' · ' + dmy(S.vAt) : ''}</b></div><div class="row"><span class="l">Relógio vs. servidor</span><b>${S.clock.at ? fmtOff(S.clock.off) : '—'}${S.clock.bad ? ' · acerte a hora do Windows' : ''}</b></div><div class="row"><span class="l">Vendas aguardando envio</span><b>${p}</b></div>
     <div class="tb"><button class="btn" data-a="syncNow" ${S.online ? '' : 'disabled'}>${ic('refresh')}Atualizar produtos agora</button><button class="btn" data-a="sendNow" ${S.online && p ? '' : 'disabled'}>Enviar vendas agora</button></div>
     ${S.online ? '' : `<span style="color:var(--muted);font-size:12.5px">Sem internet: tudo sai sozinho quando a conexão voltar.</span>`}</div></div></div></div>`;
}

/* ---------- sincronização das vendas ---------- */
function updPanel() {
  const st = S.protoUpd, pend = pending();
  return `<div class="row"><span class="l">Versão instalada</span><b style="font-family:var(--mono)">${S.ver}</b></div><div class="row"><span class="l">Última verificação</span><b>${S.updCheck ? dmy(S.updCheck) : 'nunca'}</b></div>
   ${st === 'none' ? '<span class="tg ok">Este PDV está na versão mais recente</span>' : st === 'opt' ? `<div class="banner info">${ic('refresh')}<span>A versão <b>${APP_NEW}</b> está disponível. Dá para instalar quando quiser; o PDV fecha e abre sozinho.</span></div>` : `<div class="banner">${ic('x')}<span><b>Atualização obrigatória até 12/11.</b> Esta versão deixa de funcionar com o Alva depois do prazo. Instale a ${APP_NEW}.</span></div>`}
   <div class="tb"><button class="btn" data-a="updCheck" ${S.online ? '' : 'disabled'}>${ic('refresh')}Verificar atualizações</button>${st !== 'none' ? `<button class="btn pri" data-a="updInstall" ${S.online && !pend ? '' : 'disabled'}>Instalar ${APP_NEW}</button>` : ''}</div>
   ${st !== 'none' && pend ? '<span style="color:var(--muted);font-size:12.5px">Há vendas aguardando envio. Envie antes de instalar: o PDV reinicia.</span>' : ''}${S.online ? '' : '<span style="color:var(--muted);font-size:12.5px">Sem internet: a verificação e a instalação esperam a conexão.</span>'}`;
}
function refreshTop() {
  const old = $('.top'); if (!old) return;
  const tmp = document.createElement('div'); tmp.innerHTML = shell('<i></i>'); const nw = tmp.querySelector('.top'); if (nw) old.innerHTML = nw.innerHTML;
}
function sendPending(silent) {
  const n = pending(); if (!n || S.sending) return;
  S.sending = true;
  if (!silent) toast('ok', 'Enviando ' + n + (n === 1 ? ' venda…' : ' vendas…'));
  setTimeout(() => {
    S.sending = false;
    if (!S.online) { logSync('Vendas', false, 'Envio interrompido: a internet caiu. As vendas continuam guardadas'); return; }
    S.sales.forEach(s => { s.sent = true; if (s.canc) s.canc.sent = true; if (s.emailTo) s.emailSent = true; });
    S.lastSales = Date.now(); logSync('Vendas', true, n + (n === 1 ? ' venda enviada ao Alva' : ' vendas enviadas ao Alva'));
    save(); toast('ok', n + (n === 1 ? ' venda enviada.' : ' vendas enviadas.'));
    if (S.screen === 'sale') refreshTop(); else if (S.screen === 'login') updBg(); else if (!['sync', 'setup'].includes(S.screen)) render();
  }, 1500);
}

/* ---------- processo interno de sincronização (não é job: roda dentro do app) ---------- */
function syncTick(manual) {
  S.nextAt = Date.now() + SYNC_S * 1000; S.lastCheck = Date.now();
  if (!S.term || ['setup', 'sync'].includes(S.screen)) return;
  if (S.online) clockCheck(false);
  if (S.online && S.refundQ.length) S.refundQ.splice(0).forEach(id => logSync('Teste', true, 'Cobrança de teste ' + id + ' estornada (R$ 0,01). Não gerou venda.'));
  if (S.online && pending()) sendPending(true);
  else if (manual) toast(S.online ? 'ok' : 'warn', S.online ? 'Nada a enviar: tudo em dia.' : 'Sem internet: o processo continua tentando a cada ' + SYNC_S + ' s.');
  const lc = $('#lastcheck'); if (lc) lc.textContent = hhmm(S.lastCheck) + ':' + pad(new Date(S.lastCheck).getSeconds(), 2);
  updBg();
}
function syncLogView() {
  const p = pending(), left = Math.max(0, Math.round((S.nextAt - Date.now()) / 1000));
  const st = (k, kind) => k === true ? '<span class="tg ok">Ok</span>' : k === 'wait' ? '<span class="tg wait">' + (kind === 'Divergência' ? 'Registrada' : 'Guardada') + '</span>' : '<span class="tg bad">' + (kind === 'Relógio' ? 'Atenção' : 'Falhou') + '</span>';
  return `<div class="pg"><h1>Sincronização</h1><p class="sub">O PDV guarda tudo no computador (banco local). Um processo dentro do próprio app confere a conexão a cada ${SYNC_S} segundos, envia as vendas guardadas e atualiza os produtos.</p>
   ${S.clock.bad ? `<div class="banner">${ic('x')}<span><b>O relógio deste computador está ${fmtOff(S.clock.off)} do servidor.</b> As vendas guardam também a hora corrigida, mas acerte a hora do Windows.</span></div>` : ''}
   <div class="cards c3"><div class="card"><b>${S.online ? 'Online' : 'Sem internet'}</b><span>Conexão</span></div>
    <div class="card"><b>${S.cache ? dmy(S.cache.at) : 'nunca'}</b><span>Produtos · catálogo v${S.catver} · ${items().length} itens</span></div>
    <div class="card"><b>${((S.vouchers || {})[S.lojaId] || []).length}</b><span>Vouchers ativos baixados · ${S.vAt ? dmy(S.vAt) : 'nunca'}</span></div>
    <div class="card"><b>${S.lastSales ? dmy(S.lastSales) : 'nunca'}</b><span>Vendas · ${p} ${p === 1 ? 'aguardando envio' : 'aguardando envio'}</span></div>
    <div class="card"><b id="clockv">${S.clock.at ? fmtOff(S.clock.off) : '—'}</b><span>Relógio vs. servidor · ${S.clock.bad ? 'acerte a hora do Windows' : S.clock.at ? 'conferido às ' + hhmm(S.clock.at) : 'sem conferência'}</span></div>
    <div class="card"><b id="nextin">${left} s</b><span>Próxima verificação · última às <span id="lastcheck">${S.lastCheck ? hhmm(S.lastCheck) + ':' + pad(new Date(S.lastCheck).getSeconds(), 2) : '—'}</span></span></div></div>
   <div class="tb"><button class="btn" data-a="syncNow" ${S.online ? '' : 'disabled'}>${ic('refresh')}Atualizar produtos agora</button><button class="btn" data-a="sendNow" ${S.online && p ? '' : 'disabled'}>Enviar vendas agora</button><button class="btn ghost" data-a="checkNow">Verificar agora</button>${S.online ? '' : `<span style="color:var(--muted)">Sem internet: o PDV continua vendendo e tenta de novo sozinho.</span>`}</div>
   <div class="panel"><h3>Registro</h3>${S.synclog.length ? `<table class="tbl"><thead><tr><th>Quando</th><th>O quê</th><th>Resultado</th><th>Detalhe</th></tr></thead><tbody>${S.synclog.map(x => `<tr><td style="white-space:nowrap">${dmy(x.at)}</td><td>${esc(x.kind)}</td><td>${st(x.ok, x.kind)}</td><td>${esc(x.msg)}</td></tr>`).join('')}</tbody></table>` : `<div class="empty" style="padding:30px;text-align:center">Nada registrado ainda.</div>`}</div></div>`;
}

/* ---------- ações ---------- */
const A = {
  closeModal, scrim: (v, e) => { if (e.target.classList.contains('scrim')) closeModal(); },
  toggleNet() { S.online = !S.online; logSync('Conexão', S.online, S.online ? 'Internet de volta' : 'Sem internet: o PDV continua vendendo e guardando as vendas'); toast(S.online ? 'ok' : 'warn', S.online ? 'Internet de volta.' : 'Sem internet: o PDV continua vendendo.'); if (S.online && !S.regOk && S.term && ['sale', 'sales', 'products', 'cats', 'vouchers', 'config', 'synclog'].includes(S.screen)) S.screen = 'blocked'; render(); if (S.online) sendPending(); },
  tema() { S.tema = S.tema === 'noite' ? 'dia' : 'noite'; save(); render(); },
  reset() { try { localStorage.removeItem(KEY); } catch (e) { /* ok */ } location.reload(); },
  scanSim() { S.scanSel = $('#scanSel').value; scan(S.scanSel); },
  scanBad() { scan('7899999999999'); },
  login() {
    const em = ($('#em').value || '').trim(), dom = igrejaObj().dominio;
    if (!em) { S.loginErr = 'Informe o e-mail.'; return render(); }
    if (!S.term) { S.loginErr = 'Este terminal ainda não foi configurado. Use "Configurar este terminal" abaixo, ou entre com a conta demo.'; return render(); }
    if (em.includes('@') && em.split('@')[1].toLowerCase() !== dom) { S.loginErr = 'Este usuário não é da ' + igrejaNome() + '. Só usuários da ' + igrejaNome() + ' entram neste terminal.'; return render(); }
    if (!S.online && !(S.cache && S.user)) { S.loginErr = 'Sem internet. O primeiro acesso precisa de conexão.'; return render(); }
    S.user = em.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()); S.loginErr = ''; enterApp();
  },
  demo() {
    if (!S.term) { const p = S.pdvs.find(x => x.code === 'PDV-SEDE-01'); p.inst = { maquina: MAQUINA, ip: IP, desde: Date.now(), visto: 'agora' }; S.term = { org: ORG.nome, igrejaId: 'sede', lojaId: 'sede', code: 'PDV-SEDE-01', nome: p.nome, at: Date.now(), by: 'Configuração demo', demo: true }; S.lojaId = 'sede'; if (!S.cfg.maq) { S.cfg.maq = 'MQ-LOJA-02'; S.cfg.mach = 'solta'; } syncMaqUse(); }
    S.user = 'Operador Demo'; S.loginErr = ''; enterApp();
  },
  setupLogin() {
    const em = ($('#em').value || '').trim(), st = S.setup;
    if (!S.online) { st.err = 'Sem internet. O setup precisa de conexão.'; return render(); }
    if (!em) { st.err = 'Informe o e-mail do super operador.'; return render(); }
    st.err = ''; st.user = em.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()); st.step = 'target'; render();
  },
  setupDemo() { const st = S.setup; if (!S.online) { st.err = 'Sem internet. O setup precisa de conexão.'; return render(); } st.err = ''; st.user = 'Super Operador Demo'; st.step = 'target'; render(); },
  setupNext() { S.setup.err = ''; S.setup.step = 'code'; render(); },
  setupBack() { const st = S.setup; st.err = ''; st.step = st.step === 'code' ? 'target' : st.step === 'equip' ? 'code' : st.step === 'done' ? 'equip' : 'cred'; render(); },
  setupCancel() { S.screen = 'login'; S.setup = null; render(); },
  setupPick(v) { S.setup.code = v; S.setup.err = ''; render(); },
  setupValidate() {
    const st = S.setup; st.err = '';
    if (!st.code) { st.err = 'Escolha o PDV deste computador.'; return render(); }
    if (!S.online) { st.err = 'Sem internet. Não dá para registrar o PDV no Alva Web.'; return render(); }
    st.busy = true; render();
    setTimeout(() => { st.busy = false; st.step = 'equip'; render(); }, 900);
  },
  setupFinish() {
    const st = S.setup, p = S.pdvs.find(x => x.code === st.code), was = p.inst && p.inst.maquina !== MAQUINA ? p.inst.maquina : null;
    if (S.term && S.term.code !== st.code) { const old = S.pdvs.find(x => x.code === S.term.code); if (old && old.inst && old.inst.maquina === MAQUINA) old.inst = null; }
    p.inst = { maquina: MAQUINA, ip: IP, desde: Date.now(), visto: 'agora' }; if (was) toast('warn', 'PDV desregistrado de ' + was + ' e registrado neste computador.'); logSync('Registro', true, 'PDV ' + st.code + ' registrado neste computador (' + MAQUINA + ', IP ' + IP + ')' + (was ? '; desregistrado de ' + was : ''));
    { const mq = S.maqs.find(x => x.code === S.cfg.maq); if (mq && mq.centro !== st.lojaId) { S.cfg.maq = ''; S.cfg.mach = 'none'; untest('maq'); toast('warn', 'A maquininha escolhida é de outro centro de custo e foi desligada deste PDV.'); } }
    S.term = { org: ORG.nome, igrejaId: st.igrejaId, lojaId: st.lojaId, code: st.code, nome: p.nome, at: Date.now(), by: st.user };
    S.lojaId = st.lojaId; S.cat = 'Todos'; S.q = ''; S.cart = []; S.cache = null; S.user = null; syncMaqUse(); S.regOk = true; S.blockWhy = 'removed'; S.setup = null; S.afterSync = 'login'; S.screen = 'sync'; save(); render();
  },
  reconfig() {
    const p = pending(); if (S.term && p) { toast('bad', 'Há ' + p + (p === 1 ? ' venda aguardando envio' : ' vendas aguardando envio') + '. Envie antes de reconfigurar.'); return; }
    S.setup = { step: 'cred', user: '', igrejaId: (S.term && S.term.igrejaId) || 'sede', lojaId: (S.term && S.term.lojaId) || 'sede', code: '', err: '', busy: false }; S.screen = 'setup'; render();
  },
  movePdv() {
    const p = S.pdvs.find(x => S.term && x.code === S.term.code); if (!p) return toast('warn', 'Configure o terminal primeiro.');
    p.inst = { maquina: 'CAIXA-LIVRARIA-02', ip: '192.168.0.41', desde: Date.now(), visto: 'agora' }; S.regOk = false; S.blockWhy = 'moved'; save();
    logSync('Registro', false, 'PDV ' + p.code + ' foi registrado em outra máquina (CAIXA-LIVRARIA-02, IP 192.168.0.41)'); toast('warn', 'Simulado: o PDV foi registrado em outra máquina.'); if (S.online && S.term && ['sale', 'sales', 'products', 'cats', 'vouchers', 'config', 'synclog'].includes(S.screen)) S.screen = 'blocked'; render();
  },
  toggleReg() { S.blockWhy = 'removed'; if (!S.regOk) { const p = S.pdvs.find(x => S.term && x.code === S.term.code); if (p && p.inst && p.inst.maquina !== MAQUINA) p.inst = { maquina: MAQUINA, ip: IP, desde: Date.now(), visto: 'agora' }; } S.regOk = !S.regOk; toast(S.regOk ? 'ok' : 'warn', S.regOk ? 'PDV cadastrado de novo no Alva Web.' : 'PDV removido do cadastro no Alva Web.'); if (!S.regOk && S.online && S.term && ['sale', 'sales', 'products', 'cats', 'vouchers', 'config', 'synclog'].includes(S.screen)) S.screen = 'blocked'; if (S.regOk && S.screen === 'blocked') S.screen = 'sale'; render(); },
  logout() { S.screen = 'login'; S.loginStep = 'cred'; S.cart = []; resetDisc(); S.panel = 'cart'; S.pay = null; S.railOpen = false; render(); },
  go(v) { S.screen = v; S.railOpen = false; render(); },
  cat(v) { S.cat = v; render(); }, add(v) { const it = items().find(x => x.id === v); if (it) addItem(it); },
  inc(v) { const l = S.cart.find(x => x.id === v); if (l) l.qty++; render(); },
  dec(v) { const l = S.cart.find(x => x.id === v); if (l) { l.qty--; if (l.qty <= 0) S.cart = S.cart.filter(x => x !== l); } if (!S.cart.length) resetDisc(); render(); },
  rm(v) { S.cart = S.cart.filter(x => x.id !== v); if (!S.cart.length) resetDisc(); render(); },
  clear() { S.cart = []; resetDisc(); render(); },
  price(v) { S.priceEdit = v; render(); const e = $('#pe'); if (e) { e.focus(); e.select(); } },
  priceOk(v) { const l = S.cart.find(x => x.id === v), e = $('#pe'); if (l && e) { const n = num(e.value); if (n >= 0) l.price = n; } S.priceEdit = null; render(); },
  discount() { if (!S.cart.length) return; S.discOpen = !S.discOpen; render(); if (S.discOpen) { const e = $('#dv'); if (e) { e.focus(); e.select(); } } },
  dtype(v) { S.disc = { t: v, v: S.disc.v }; render(); const e = $('#dv'); if (e) { e.focus(); e.select(); } },
  dok() { S.discOpen = false; render(); },
  dzero() { S.disc = { t: 'v', v: 0 }; S.discOpen = false; render(); },
  railToggle() { S.railOpen = !S.railOpen; render(); },
  newSale() { S.panel = 'cart'; S.lastSale = null; render(); },
  payBack() { if (S.pay && S.pay.parts.length) { toast('warn', 'Já há pagamento registrado nesta venda. Termine o pagamento; se errou, conclua e cancele a venda inteira.'); return; } if (S.pay) S.pay.tok++; S.panel = 'cart'; S.pay = null; render(); },
  pay: openPay,
  method(v) { S.pay.method = v; renderPay(); },
  quick(v) { S.pay.recv = String(Number(v).toFixed(2)).replace('.', ','); renderPay(); },
  manualPix() { S.pay.manualPix = true; renderPay(); },
  pixBack() { S.pay.manualPix = false; renderPay(); },
  pixSim() { S.pay.pix.state = 'ok'; renderPay(); },
  forceSolta() { S.pay.forceSolta = true; renderPay(); },
  tipo(v) { S.pay.tipo = v; renderPay(); },
  cloudSend: startCloud, cloudSim(v) { cloudResult(v); }, cloudCancel() { S.pay.tok++; S.pay.cloud = { state: 'idle' }; renderPay(); },
  payOk() { if (canConfirm()) addPart(); },
  amtRest() { S.pay.amt = fmtN(payRem()); if (S.pay.method === 'cash') S.pay.recv = fmtN(payRem()); renderPay(); },
  vval() { const e = $('#vcode'); validateVoucher(e ? e.value : S.vTry); },
  vrm() { S.voucher = null; S.vErr = ''; S.vTry = ''; render(); },
  toggleDrift() { S.protoDrift = !S.protoDrift; if (S.online) clockCheck(true); else toast('warn', 'Sem internet: o relógio só é conferido com conexão.'); render(); },
  receipt(v) { openReceipt(v, false); }, openSale(v) { openSale(v); }, cancelAsk,
  cancelDo(v) { const s = S.sales.find(x => x.id === v); s.canc = { at: Date.now(), why: $('#why').value, sent: S.online }; s.lines.forEach(l => { const it = items().find(x => x.id === l.id); if (it) it.stock += l.qty; }); save(); closeModal(); render(); toast('ok', 'Venda cancelada. Os itens voltaram ao estoque.'); },
  filter(v) { S.filter = v; render(); },
  printSale(v) { const x = IMPRESSORAS.find(i => i.id === S.cfg.printer); toast('ok', 'Enviado para ' + x.nome.split(' · ')[0] + '.'); },
  mailSale(v) { const s = S.sales.find(x => x.id === v), e = ($('#rmail').value || '').trim(); if (!/^\S+@\S+\.\S+$/.test(e)) return toast('bad', 'E-mail inválido.'); s.emailTo = e; s.emailSent = S.online; save(); toast(S.online ? 'ok' : 'warn', S.online ? 'Comprovante enviado para ' + e + '.' : 'Sem internet: o e-mail sai quando a conexão voltar.'); if (S.panel === 'done') render(); else openReceipt(v, false); },
  newProd() { editProd(''); }, editProd(v) { editProd(v); },
  saveProd(v) {
    const name = $('#pn').value.trim(), code = $('#pc').value.trim(), price = num($('#pp').value), stock = parseInt($('#ps').value, 10) || 0;
    if (!name) return toast('bad', 'Informe o nome.');
    if (code && !/^\d{6,14}$/.test(code)) return toast('bad', 'O código tem de 6 a 14 números.');
    if (code && items().some(i => i.code === code && i.id !== v)) return toast('bad', 'Já existe um produto com esse código.');
    if (v) { const it = items().find(x => x.id === v); Object.assign(it, { name, code, cat: $('#pk').value, price, stock }); }
    else items().push({ id: code || 'n' + Date.now(), code, name, cat: $('#pk').value, price, stock });
    save(); closeModal(); render(); toast('ok', 'Produto salvo no cadastro da loja.');
  },
  maqPick(v) { S.cfg.maq = v; const mq = S.maqs.find(x => x.code === v); S.cfg.mach = mq ? mq.tipo : 'none'; untest('maq'); syncMaqUse(); save(); render(); },
  cfg(v, e) { const b = e.target.closest('[data-k]'); S.cfg[b.dataset.k] = v; if (b.dataset.k === 'mach') untest('maq'); save(); render(); },
  printTest() { toast('ok', 'Página de teste enviada.'); },
  termTest() { toast(S.online ? 'ok' : 'warn', S.online ? 'Maquininha encontrada e em modo PDV.' : 'Sem internet para testar.'); },
  newCat() { editCat(); },
  saveCat() {
    const n = ($('#cn').value || '').trim(), cs = CATS[S.lojaId] || (CATS[S.lojaId] = []);
    if (n.length < 2) return toast('bad', 'Informe o nome da categoria.');
    if (cs.some(c => c.toLowerCase() === n.toLowerCase())) return toast('bad', 'Já existe uma categoria com esse nome.');
    cs.push(n); closeModal(); render(); toast('ok', 'Categoria criada no cadastro da loja.');
  },
  newVou() { editVou(); },
  saveVou() {
    const lj = S.lojaId, code = ($('#vk').value || '').trim().toUpperCase().replace(/\s+/g, ''), nome = ($('#vn').value || '').trim(), tipo = $('#vt').value, valor = num($('#vv').value), dias = parseInt($('#vd').value, 10), lim = ($('#vl').value || '').trim() ? parseInt($('#vl').value, 10) : null;
    if (!/^[A-Z0-9]{3,20}$/.test(code)) return toast('bad', 'O código tem de 3 a 20 letras ou números, sem espaço.');
    if ((VOUCHERS[lj] || []).some(v => v.code === code)) return toast('bad', 'Já existe um voucher com esse código.');
    if (!nome) return toast('bad', 'Informe a campanha.');
    if (!(valor > 0) || (tipo === 'p' && valor > 100)) return toast('bad', tipo === 'p' ? 'O percentual vai de 1 a 100.' : 'Informe o valor do desconto.');
    if (!(dias > 0)) return toast('bad', 'Informe por quantos dias vale.');
    if (lim !== null && !(lim > 0)) return toast('bad', 'O limite de usos tem de ser maior que zero.');
    (VOUCHERS[lj] || (VOUCHERS[lj] = [])).push({ code, nome, tipo, valor, dias, ativo: true, limite: lim, usos: 0 });
    S.vouchers[lj] = vouchersAtivos(lj); S.vAt = Date.now(); logSync('Vouchers', true, 'Voucher ' + code + ' criado neste PDV e baixado'); save(); closeModal(); render(); toast('ok', 'Voucher ' + code + ' criado.');
  },
  catGo(v) { S.pcat = v; S.pq = ''; S.screen = 'products'; render(); },
  toggleAdmin() { S.protoAdmin = !S.protoAdmin; toast(S.protoAdmin ? 'ok' : 'warn', S.protoAdmin ? 'Perfil Admin da loja: pode criar e ajustar no Catálogo.' : 'Perfil só vende: o Catálogo fica só para consulta.'); render(); },
  toggleTpl() { S.protoTpl = !S.protoTpl; toast('warn', S.protoTpl ? 'No Alva, o modelo do comprovante foi alterado. O PDV pega na próxima sincronização.' : 'No Alva, o modelo voltou ao padrão.'); render(); },
  toggleUpd() { S.protoUpd = S.protoUpd === 'none' ? 'opt' : S.protoUpd === 'opt' ? 'must' : 'none'; render(); },
  updCheck() { toast('ok', 'Verificando…'); setTimeout(() => { S.updCheck = Date.now(); logSync('Atualização', true, S.protoUpd === 'none' ? 'Versão ' + S.ver + ': já é a mais recente' : 'Versão ' + APP_NEW + ' disponível' + (S.protoUpd === 'must' ? ' (obrigatória até 12/11)' : '')); save(); render(); }, 700); },
  updInstall() { if (pending()) return toast('warn', 'Envie as vendas guardadas antes de instalar.'); toast('ok', 'Instalando a versão ' + APP_NEW + '… o PDV vai reiniciar.'); setTimeout(() => { S.ver = APP_NEW; S.protoUpd = 'none'; S.updCheck = Date.now(); logSync('Atualização', true, 'PDV atualizado para a versão ' + APP_NEW); save(); render(); }, 1200); },
  syncNow() { S.afterSync = ['synclog', 'vouchers', 'cats'].includes(S.screen) ? S.screen : 'config'; S.screen = 'sync'; render(); },
  sendNow() { sendPending(); },
  checkNow() { syncTick(true); }
};
Object.assign(A, equipActions());
function scan(code) {
  if (leitorRead(code)) return;
  S.lastScan = code;
  if (S.screen === 'sale' && !S.modal) handleCode(code);
  else if (S.screen === 'config') { const o = $('#scanout'); if (o) o.textContent = code; toast('ok', 'O leitor leu ' + code + '.'); }
  else toast('warn', 'Abra a tela Venda para o leitor adicionar produtos.');
}

/* ---------- eventos ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-a]'); if (!t) return;
  const f = A[t.dataset.a]; if (f) f(t.dataset.v, e);
});
document.addEventListener('input', e => {
  const id = e.target.id;
  if (id === 'scanSel') S.scanSel = e.target.value;
  else if (id === 'code') { S.q = e.target.value; S.hi = 0; const g = $('#plist'); if (g) g.innerHTML = listHTML(); }
  else if (id === 'catsel') { S.cat = e.target.value; S.hi = 0; render(); }
  else if (id === 'stIg') { const ig = IGREJAS.find(x => x.id === e.target.value); S.setup.igrejaId = ig.id; S.setup.lojaId = ig.lojas[0]; render(); }
  else if (id === 'stLj') { S.setup.lojaId = e.target.value; }
  else if (id === 'dv') { S.disc.v = Math.max(0, num(e.target.value)); updTotals(); }
  else if (id === 'recv') { S.pay.recv = e.target.value; updPay(); }
  else if (id === 'pamt') { S.pay.amt = e.target.value; updPay(); }
  else if (id === 'vcode') { S.vTry = e.target.value; if (S.vErr) { S.vErr = ''; const er = $('.verr'); if (er) er.remove(); } autoVoucher(e.target.value); }
  else if (id === 'pixwhy') { S.pay.pix.why = e.target.value; updPay(); }
  else if (id === 'nsu') S.pay.nsu = e.target.value; else if (id === 'l4') S.pay.l4 = e.target.value;
  else if (id === 'parc') { S.pay.parc = parseInt(e.target.value, 10); }
  else if (id === 'pq') { S.pq = e.target.value; const b = $('.tbl tbody'); render(); const x = $('#pq'); if (x) { x.focus(); x.setSelectionRange(x.value.length, x.value.length); } }
  else if (id === 'cq' || id === 'vq') { if (id === 'cq') S.cq = e.target.value; else S.vq = e.target.value; render(); const x = $('#' + id); if (x) { x.focus(); x.setSelectionRange(x.value.length, x.value.length); } }
  else if (id === 'pcat') { S.pcat = e.target.value; render(); }
  else if (id === 'prn') { S.cfg.printer = e.target.value; untest('imp'); save(); render(); }

  else if (id === 'head') { S.cfg.head = e.target.value; save(); } else if (id === 'foot') { S.cfg.foot = e.target.value; save(); } 
});
document.addEventListener('change', e => {
  if (e.target.id === 'pamt' && S.pay) { const a = payAmt(); S.pay.amt = fmtN(a); if (S.pay.method === 'cash') S.pay.recv = fmtN(a); const b = $('#paybody'); if (b) b.innerHTML = payBody(); updPay(); }
});
document.addEventListener('keydown', e => {
  const tg = e.target, inInput = tg && (tg.tagName === 'INPUT' || tg.tagName === 'SELECT' || tg.tagName === 'TEXTAREA');
  if (e.key === 'Escape') {
    if (S.modal) closeModal(); else if (S.railOpen) A.railToggle(); else if (S.screen === 'sale') { if (S.panel === 'pay') A.payBack(); else if (S.panel === 'done') A.newSale(); else if (S.priceEdit) { S.priceEdit = null; render(); } else if (S.discOpen) A.dok(); else if (S.cart.length) A.clear(); }
    return;
  }
  if (tg.id === 'code' && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); const n = filtered().length; S.hi = Math.max(0, Math.min(n - 1, S.hi + (e.key === 'ArrowDown' ? 1 : -1))); const pl = $('#plist'); if (pl) pl.innerHTML = listHTML(); const h = $('.pr-row.hi'); if (h) h.scrollIntoView({ block: 'nearest' }); return; }
  if (e.key === 'Enter') {
    if (tg.id === 'pe') { e.preventDefault(); A.priceOk(S.priceEdit); return; }
    if (tg.id === 'dv') { e.preventDefault(); A.dok(); return; }
    if (tg.id === 'vcode') { e.preventDefault(); A.vval(); return; }
    if (tg.id === 'pamt') { e.preventDefault(); tg.blur(); return; }
    if (S.screen === 'sale' && S.panel === 'done' && (!inInput || (tg.id === 'code' && !tg.value.trim()))) { e.preventDefault(); A.newSale(); return; }
    if (tg.id === 'code') { e.preventDefault(); handleCode(tg.value); return; }
    if (tg.id === 'scantest') { e.preventDefault(); const v = tg.value.trim(); if (v) leitorRead(v); tg.value = ''; return; }
    if (S.screen === 'sale' && S.panel === 'pay' && $('#payok') && (!inInput || tg.id === 'recv')) { e.preventDefault(); A.payOk(); return; }
    if (S.modal && !inInput && $('#modal .btn.ok')) { e.preventDefault(); closeModal(); return; }
  }
  const fk = { F1: () => A.go('sale'), F2: () => { A.go('sale'); setTimeout(focusCode, 0); }, F4: () => S.screen === 'sale' && S.panel === 'cart' && A.discount(), F5: () => A.go('sales'), F6: () => A.go('products'), F7: () => A.go('config'), F8: () => A.go('synclog'), F10: () => S.screen === 'sale' && !S.modal && (S.panel === 'pay' ? A.payOk() : S.panel === 'cart' && openPay()) };
  if (fk[e.key] && !['login', 'sync', 'setup', 'blocked'].includes(S.screen)) { e.preventDefault(); if (!S.modal || e.key === 'F10') fk[e.key](); return; }
  if (S.screen === 'sale' && S.panel === 'pay' && !S.modal && !inInput && ['1', '2', '3'].includes(e.key)) { S.pay.method = ['cash', 'pix', 'card'][+e.key - 1]; renderPay(); return; }
  /* leitor: letras e números fora de um campo caem no campo de código */
  if (S.screen === 'sale' && !S.modal && S.panel !== 'pay' && !inInput && /^[0-9a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey) { const c = $('#code'); if (c) c.focus(); }
});
document.getElementById('proto').addEventListener('keydown', e => { const f = A[e.target.dataset.a]; if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('sw') && f) { e.preventDefault(); f(); } });

load();
if (S.term) S.lojaId = S.term.lojaId;
S.screen = 'login';
render();

/* relógio do processo de sincronização */
setInterval(() => { const el = $('#nextin'); const left = Math.max(0, Math.round((S.nextAt - Date.now()) / 1000)); if (el) el.textContent = left + ' s'; if (Date.now() >= S.nextAt) syncTick(); }, 1000);
