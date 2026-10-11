/* VEM · web · entrada: senha, código por e-mail, primeiro acesso e redefinição de senha (mesmo fluxo do Alva Web).
   Protótipo: o código é 123456; senha "errada" recusa. */
import { $, $$, esc, ic, vemLogo } from '../shared/ui.js';
import * as D from '../shared/data.js';
import { ACCOUNTS, INVITES } from '../shared/data2.js';
import { S, A, toast, val, fld, ferr, fclear, render, later } from './core.js';

export const ENTRY = [
  ['org', 'o3', 'building', 'Organizador · empresa', 'Studio Vida Eventos cria eventos, vende ingressos, monta a equipe e acompanha o dinheiro.'],
  ['org', 'o1', 'home', 'Organizador · igreja (Alva)', 'Alva Sede. Os eventos criados no Alva já estão aqui; a igreja acompanha vendas, portaria e financeiro.'],
  ['buyer', 'o3', 'ticket', 'Comprador', 'Ana Costa descobre eventos, compra ingressos e mostra o QR Code na entrada.'],
  ['staff', 'o1', 'scan', 'Equipe do evento', 'Juliana faz o check-in: lê códigos, opera o totem e confere a lista.'],
  ['super', 'o3', 'shield', 'Super admin da plataforma', 'Tiago vê todos os organizadores, liga recursos, cuida dos super usuários e da auditoria.'],
];
const A0 = () => S.au || (S.au = { step: 'login', tab: 'senha', email: '', acct: null, code: '' });
const rules = v => ({ len: v.length >= 8, num: /\d/.test(v), let: /[a-z]/i.test(v) });
export function enterAs(profile, org) {
  S.profile = profile; S.org = org || S.org; S.pg = {}; S.evId = null; S.evTab = 'resumo'; S.au = null;
  S.screen = profile === 'org' ? 'overview' : profile === 'buyer' ? 'descobrir' : profile === 'super' ? 'superOverview' : 'stEventos';
  render(); window.scrollTo(0, 0);
}
function finish(acct) { if (acct.orgs.length > 1) { A0().acct = acct; A0().step = 'org'; render(); return; } toast('Bem-vindo(a), ' + acct.n.split(' ')[0] + '!'); enterAs(acct.profile, acct.orgs[0]); }

const back = (to, l) => `<button class="btn ghost sm" data-a="auGo" data-v="${to}" style="margin:-6px 0 10px -8px">${ic('chevL', 15, 2.2)}${l}</button>`;
const tabsH = tab => `<div class="tabs" role="tablist" style="margin-bottom:16px"><button role="tab" aria-selected="${tab === 'senha'}" data-a="auGo" data-v="login">${ic('key', 14, 2)}Senha</button><button role="tab" aria-selected="${tab === 'codigo'}" data-a="auGo" data-v="code">${ic('mail', 14, 2)}Código por e-mail</button></div>`;
const otpH = id => `<div class="fld" id="f-${id}"><label for="otp0">Código de 6 dígitos</label><div class="otp" role="group" aria-label="Código de 6 dígitos">${[0, 1, 2, 3, 4, 5].map(k => `<input class="otp-i" id="otp${k}" inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="${k ? 'off' : 'one-time-code'}" aria-label="Dígito ${k + 1} de 6" placeholder="·">`).join('')}</div><input type="hidden" id="${id}"><span class="hint"></span></div>`;
const pwH = (id = 'pw') => `${fld(id, 'Nova senha', { type: 'password', ph: 'Mínimo de 8 caracteres' })}<ul class="rules" id="rules"><li data-r="len">8 caracteres ou mais</li><li data-r="let">Letras</li><li data-r="num">Números</li></ul>`;

export function login() {
  const a = A0(), st = a.step;
  let body = '';
  if (st === 'login') body = `<p class="eb">Painel e app</p><h1>Entrar</h1><p class="lede">Use o e-mail do seu cadastro no VEM.</p>${tabsH('senha')}${fld('lE', 'E-mail', { type: 'email', v: a.email, ph: 'nome@email.com' })}${fld('lP', 'Senha', { type: 'password', ph: 'Sua senha' })}<button class="btn block" id="lGo">Entrar</button><button class="btn ghost block" data-a="auGo" data-v="forgot" style="margin-top:6px">Esqueci minha senha</button>
    <button class="au-opt" data-a="auGo" data-v="first">${ic('mail', 18, 2)}<span class="grow"><b>Primeiro acesso</b><small>Recebi um convite por e-mail</small></span>${ic('chevR', 15, 2.2)}</button>`;
  else if (st === 'code') body = `<p class="eb">Painel e app</p><h1>Entrar com código</h1><p class="lede">Enviamos um código de 6 dígitos para o seu e-mail. Sem senha para lembrar.</p>${tabsH('codigo')}${fld('cE', 'E-mail', { type: 'email', v: a.email, ph: 'nome@email.com' })}<button class="btn block" id="cGo">Enviar código</button>`;
  else if (st === 'otp') body = `${back(a.tab === 'senha' ? 'login' : 'code', 'Trocar e-mail')}<p class="eb">Confirmação</p><h1>Digite o código</h1><p class="lede">Enviamos 6 dígitos para <b>${esc(a.email)}</b>. <em>Protótipo: 123456.</em></p>${otpH('mC')}<button class="btn block" id="mGo">Entrar</button><p class="foot" style="text-align:center">Não chegou? Confira o spam. <button class="btn ghost sm" data-a="auResend">Reenviar código</button></p>`;
  else if (st === 'forgot') body = `${back('login', 'Voltar para entrar')}<p class="eb">Senha</p><h1>Redefinir senha</h1><p class="lede">Enviamos um código para criar a sua nova senha. Válido por 1 hora.</p>${fld('fE', 'E-mail', { type: 'email', v: a.email, ph: 'nome@email.com' })}<button class="btn block" id="fGo">Continuar</button>`;
  else if (st === 'reset') body = `${back('forgot', 'Trocar e-mail')}<p class="eb">Senha</p><h1>Crie sua nova senha</h1><p class="lede">Se houver uma conta para <b>${esc(a.email)}</b>, enviamos o código. <em>Protótipo: 123456.</em></p>${otpH('rC')}${pwH()}<button class="btn block" id="rGo">Salvar nova senha</button>`;
  else if (st === 'done') body = `<div class="cf-ic" style="background:var(--st-int-bg);color:var(--st-int)">${ic('check', 22, 2.4)}</div><h1>Senha redefinida</h1><p class="lede">As outras sessões foram encerradas. Entre com a sua nova senha.</p><button class="btn block" data-a="auGo" data-v="login">Voltar para entrar</button>`;
  else if (st === 'first') body = `${back('login', 'Voltar para entrar')}<p class="eb">Primeiro acesso</p><h1>Informe o convite</h1><p class="lede">Use o e-mail e o código que chegaram no convite. <em>Protótipo: renata@studiovida.com.br e 123456.</em></p>${fld('iE', 'E-mail do convite', { type: 'email', v: a.email || '', ph: 'seu@email.com' })}${otpH('iC')}<button class="btn block" id="iGo">Continuar</button>`;
  else if (st === 'firstPass') body = `<p class="eb">Primeiro acesso</p><h1>Crie sua senha</h1><p class="lede">Olá, <b>${esc(a.acct.n)}</b>. Falta só definir a senha para entrar no painel.</p>${pwH()}<button class="btn block" id="pGo">Criar senha e entrar</button>`;
  else if (st === 'org') body = `<p class="eb">Organizador</p><h1>Selecione o organizador</h1><p class="lede">Você tem acesso a mais de um. Escolha em qual quer entrar.</p><div class="au-orgs">${a.acct.orgs.map(id => { const o = D.orgOf(id); return `<button class="au-opt" data-a="auPickOrg" data-v="${id}"><span class="oav">${o.n.split(' ').map(w => w[0]).slice(0, 2).join('')}</span><span class="grow"><b>${esc(o.n)}</b><small>${o.kind === 'igreja' ? 'Igreja · via Alva' : 'Empresa'} · ${esc(o.city)}, ${o.uf}</small></span>${ic('chevR', 15, 2.2)}</button>`; }).join('')}</div>`;
  const demo = st === 'login' || st === 'code' ? `<div class="au-demo"><p class="eb" style="margin:22px 0 10px">Ou entre como (demonstração)</p><div class="au-dg">${ENTRY.map(([p, o, i, t, d], k) => `<button class="au-d" data-a="enter" data-v="${k}" title="${esc(d)}"><span class="lg-i">${ic(i, 18, 1.9)}</span><span class="grow"><b>${t}</b><small>${d}</small></span></button>`).join('')}</div><button class="btn ghost block" data-a="enterGuest" style="margin-top:8px">Explorar eventos sem conta</button><p class="test">Contas de teste: <code>marina@studiovida.com.br</code>, <code>financeiro@alvasede.org</code> (duas igrejas), <code>ana.costa@email.com</code>, <code>juliana.reis@email.com</code>, <code>tiago@alva.app</code>. Qualquer senha de 6+ caracteres entra; <code>errada</code> recusa.</p></div>` : '';
  return `<div class="auth"><aside class="auth-art"><div class="auth-brand">${vemLogo(34)}</div><div class="art-body"><p class="art-eb">Inscrições para eventos</p><h2>Igrejas e organizadores vendem, controlam a entrada e <em>acompanham o dinheiro.</em></h2><p>Quem compra recebe um QR Code para cada coisa: a entrada, o almoço, o kit. A equipe lê tudo pelo app do VEM.</p><ul class="art-ul"><li>${ic('home', 16, 2)}Eventos das igrejas que usam o Alva aparecem aqui sozinhos</li><li>${ic('card', 16, 2)}Cobrança e taxas configuradas no Assinaturas</li><li>${ic('scan', 16, 2)}Check-in pela equipe, com QR, totem ou lista</li></ul></div><small class="art-ft">VEM · um produto Alva</small></aside><div class="auth-main"><div class="box">${body}${demo}</div></div></div>`;
}

function bindOtp(id, onDone) {
  const otps = $$('.otp-i'); if (!otps.length) return;
  const sync = () => { $('#' + id).value = otps.map(o => o.value).join(''); otps.forEach(o => o.classList.toggle('filled', !!o.value)); fclear(); $('.otp').classList.remove('bad'); if (otps.every(o => o.value) && onDone) setTimeout(onDone, 140); };
  otps.forEach((o, k) => {
    o.addEventListener('input', () => { o.value = o.value.replace(/\D/g, '').slice(-1); if (o.value && otps[k + 1]) otps[k + 1].focus(); sync(); });
    o.addEventListener('keydown', e => { if (e.key === 'Backspace' && !o.value && otps[k - 1]) { otps[k - 1].value = ''; otps[k - 1].focus(); sync(); e.preventDefault(); } if (e.key === 'Enter' && onDone) onDone(); });
    o.addEventListener('focus', () => o.select());
    o.addEventListener('paste', e => { const d = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault(); d.split('').forEach((c, x) => { if (otps[x]) otps[x].value = c; }); (otps[d.length] || otps[5]).focus(); sync(); });
  });
  setTimeout(() => otps[0].focus(), 40);
}
function checkCode(id, ok) { fclear(); const c = val(id); if (c.length < 6) { ferr(id, 'Digite os 6 dígitos do código.'); $$('.otp-i').find(o => !o.value)?.focus(); return false; } if (c !== '123456') { const b = $('.otp'); b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); ferr(id, 'Código incorreto. Confira o e-mail e tente de novo.'); setTimeout(() => { $$('.otp-i').forEach(o => { o.value = ''; o.classList.remove('filled'); }); $('#' + id).value = ''; $('#otp0')?.focus(); }, 450); return false; } return true; }
const acctOf = e => ACCOUNTS.find(a => a.e === String(e).trim().toLowerCase());
const mailOk = e => /^\S+@\S+\.\S+$/.test(e);

export function authAfter() {
  const a = A0(), st = a.step;
  const pw = $('#pw'); if (pw) pw.addEventListener('input', () => { const r = rules(pw.value); $$('#rules li').forEach(li => li.classList.toggle('ok', r[li.dataset.r])); });
  $('#lGo')?.addEventListener('click', () => { fclear(); const e = val('lE').toLowerCase(), p = $('#lP').value; a.email = e; if (!mailOk(e)) return ferr('lE', 'Digite um e-mail válido.'); if (!p) return ferr('lP', 'Informe sua senha.'); const ac = acctOf(e); if (!ac || p === 'errada' || p.length < 6) return ferr('lP', 'E-mail ou senha incorretos.'); later($('#lGo'), 700, () => { a.acct = ac; a.tab = 'senha'; a.step = 'otp'; render(); }); });
  $('#cGo')?.addEventListener('click', () => { fclear(); const e = val('cE').toLowerCase(); a.email = e; if (!mailOk(e)) return ferr('cE', 'Digite um e-mail válido.'); later($('#cGo'), 700, () => { a.acct = acctOf(e); a.tab = 'codigo'; a.step = 'otp'; render(); toast('Código enviado para ' + e); }); });
  if (st === 'otp') bindOtp('mC', () => $('#mGo')?.click());
  $('#mGo')?.addEventListener('click', () => { if (!checkCode('mC')) return; const ac = a.acct || acctOf(a.email); if (!ac) { a.step = 'login'; render(); return toast('Não achamos um acesso para esse e-mail.', 'bad'); } later($('#mGo'), 500, () => finish(ac)); });
  $('#fGo')?.addEventListener('click', () => { fclear(); const e = val('fE').toLowerCase(); a.email = e; if (!mailOk(e)) return ferr('fE', 'Digite um e-mail válido.'); later($('#fGo'), 600, () => { a.step = 'reset'; render(); }); });
  if (st === 'reset') bindOtp('rC');
  $('#rGo')?.addEventListener('click', () => { if (!checkCode('rC')) return; const r = rules($('#pw').value); if (!(r.len && r.let && r.num)) return ferr('pw', 'Use 8 caracteres ou mais, com letras e números.'); later($('#rGo'), 600, () => { a.step = 'done'; render(); }); });
  if (st === 'first') bindOtp('iC');
  $('#iGo')?.addEventListener('click', () => { fclear(); const e = val('iE').toLowerCase(), inv = INVITES.find(x => x.e === e); if (!mailOk(e)) return ferr('iE', 'Digite o e-mail do convite.'); if (!checkCode('iC')) return; if (!inv) return ferr('iE', 'Não achamos um convite para esse e-mail.'); later($('#iGo'), 600, () => { a.acct = inv; a.email = e; a.step = 'firstPass'; render(); }); });
  $('#pGo')?.addEventListener('click', () => { const r = rules($('#pw').value); if (!(r.len && r.let && r.num)) return ferr('pw', 'Use 8 caracteres ou mais, com letras e números.'); later($('#pGo'), 700, () => { toast('Senha criada. Bem-vinda, ' + a.acct.n.split(' ')[0] + '!'); enterAs(a.acct.profile, a.acct.orgs[0]); }); });
}
Object.assign(A, {
  auGo: v => { A0().step = v; if (v === 'login') A0().tab = 'senha'; render(); },
  auResend: () => toast('Novo código enviado. O anterior deixou de valer.'),
  auPickOrg: v => { const ac = A0().acct; toast('Entrando em ' + D.orgOf(v).n); enterAs(ac.profile, v); },
  enter: v => { const [p, o] = ENTRY[+v]; enterAs(p, o); },
  enterGuest: () => { S.profile = 'visitor'; S.screen = 'descobrir'; S.au = null; render(); },
  logout: () => { S.profile = null; S.screen = 'login'; S.au = null; render(); window.scrollTo(0, 0); },
});
