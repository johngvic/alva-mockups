(() => {
  document.documentElement.classList.add('js');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- botões assíncronos (mesmo contrato de useAsyncAction) ---------- */
  const AWORK = { Enviar: 'Enviando', Confirmar: 'Confirmando', Continuar: 'Salvando', Revisar: 'Carregando', 'Começar': 'Criando conta', Assinar: 'Processando', Solicitar: 'Enviando', Reenviar: 'Enviando', Lembrar: 'Enviando', Fazer: 'Localizando' };
  const ackSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="ckd" d="M5 12.5l4.5 4.5L19 7"/></svg>';
  const escH = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function aStart(b, ms) {
    if (b.dataset.ahtml != null) return;
    const first = b.textContent.trim().split(/\s+/)[0];
    b.dataset.ahtml = b.innerHTML; b.style.width = b.getBoundingClientRect().width + 'px'; b.style.setProperty('--dur', (ms || 1100) + 'ms');
    b.classList.add('is-busy'); b.setAttribute('aria-busy', 'true');
    b.innerHTML = `<span class="bprog"></span><span class="bl"><i class="bspin"></i>${AWORK[first] || 'Um instante'}</span>`;
    requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('run')));
  }
  function aDone(b, label) { b.classList.remove('is-busy', 'run'); b.classList.add('is-done'); b.removeAttribute('aria-busy'); b.innerHTML = `<span class="bl">${ackSvg}${escH(label)}</span>`; }
  function aEnd(b) { if (b.dataset.ahtml == null) return; b.innerHTML = b.dataset.ahtml; delete b.dataset.ahtml; b.classList.remove('is-busy', 'run', 'is-done'); b.removeAttribute('aria-busy'); b.style.width = ''; }
  function aReset(b, html) { delete b.dataset.ahtml; b.classList.remove('is-busy', 'run', 'is-done'); b.removeAttribute('aria-busy'); b.style.width = ''; if (html != null) b.innerHTML = html; }
  /* busy(botão, duração, rótulo de sucesso, depois, manter): progresso → sucesso → volta ao normal (ou mantém) */
  function busy(b, ms, label, fn, keep) {
    aStart(b, ms);
    return setTimeout(() => { if (!b.isConnected) return; aDone(b, label); fn && fn(); if (!keep) setTimeout(() => b.isConnected && aEnd(b), 900); }, RM ? 0 : ms);
  }
  const okIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const NS = 'http://www.w3.org/2000/svg';

  /* ---------- logo e sol (geometria do @alva/theme/brand) ---------- */
  const RAYS = [[11.16,20.83,5.93,19.13],[16.06,14.08,12.83,9.63],[24,11.5,24,6],[31.94,14.08,35.17,9.63],[36.84,20.83,42.07,19.13]];
  const sunInner = () => `<g stroke-width="2.6" stroke-linecap="round">${RAYS.map((r,i)=>`<line class="ray" style="--i:${i}" x1="${r[0]}" y1="${r[1]}" x2="${r[2]}" y2="${r[3]}"/>`).join('')}</g><g clip-path="url(#sgc)"><circle class="disc" cx="24" cy="25" r="10" fill="url(#sg)"/></g><line class="horizon" x1="5" y1="28.5" x2="43" y2="28.5" stroke-width="2.6" stroke-linecap="round"/>`;
  document.querySelectorAll('[data-sun]').forEach(s => s.innerHTML = sunInner());
  document.querySelectorAll('[data-logo]').forEach(el => {
    const h = +el.dataset.logo;
    el.innerHTML = `<svg class="sun" viewBox="0 0 48 32" width="${h*1.5}" height="${h}" aria-hidden="true">${sunInner()}</svg><span class="lw">alva</span>`;
  });

  /* ---------- header ---------- */
  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- faixas em movimento ---------- */
  const ic = {
    check:'<path d="M20 6 9 17l-5-5"/>', heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', cal:'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>', book:'<path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    baby:'<circle cx="12" cy="9" r="5"/><path d="M10 9h.01M14 9h.01M10.5 11.5a2 2 0 0 0 3 0M7 21l2-6h6l2 6"/>', home:'<path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'
  };
  const tone = { sky:['--tone-sky','--tone-sky-ink'], mint:['--tone-mint','--tone-mint-ink'], apricot:['--tone-apricot','--tone-apricot-ink'], blush:['--tone-blush','--tone-blush-ink'], lime:['--tone-lime','--tone-lime-ink'], sage:['--tone-sage','--tone-sage-ink'] };
  const chip = ([t,i,txt,sub]) => `<span class="chip"><i style="background:var(${tone[t][0]});color:var(${tone[t][1]})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ic[i]}</svg></i>${txt}${sub?`<small>${sub}</small>`:''}</span>`;
  const A = [['lime','check','Escala confirmada','Louvor · dom, 4 out'],['mint','pin','Check-in feito','Ensaio do Louvor'],['blush','heart','Pedido de oração','orado por Pr. Marcos'],['sky','user','Acolhimento','3 esperando contato'],['apricot','baby','Apresentação de bebês','datas abertas'],['sage','book','Discipulado','Identidade em Cristo']];
  const B = [['sky','cal','Casa Jardins','qua, 19h30'],['blush','heart','Noite de Oração','Capela, 20h'],['lime','check','Lembrete enviado','escala de domingo'],['apricot','cal','Conferência Anual 2026','inscrições abertas'],['mint','home','Retiro de Jovens 2026','12 vagas'],['sage','user','Aniversário','Marina Costa, hoje']];
  const fill = (el, list) => { const h = list.map(chip).join(''); el.innerHTML = h + h + h + h; };
  fill(document.querySelector('[data-track="a"]'), A);
  fill(document.querySelector('[data-track="b"]'), B);

  /* ---------- revelar ao rolar (estado de repouso visível) ---------- */
  const rv = [...document.querySelectorAll('.reveal')];
  if (!RM && 'IntersectionObserver' in window) {
    const vh = innerHeight;
    rv.forEach((el, i) => { if (el.getBoundingClientRect().top > vh * .9) { el.classList.add('pre'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; } });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(el => io.observe(el));
  }

  /* ---------- contadores ---------- */
  const countUp = el => { const to = +el.dataset.count; if (RM) return; const t0 = performance.now(), d = 1200; const tick = t => { const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  setTimeout(() => document.querySelectorAll('[data-count]').forEach(countUp), 900);

  /* ---------- celular: troca de tela conforme a etapa ---------- */
  const steps = [...document.querySelectorAll('.step')], views = [...document.querySelectorAll('.view')], tabs = [...document.querySelectorAll('[data-tab]')];
  const $ = id => document.getElementById(id);
  const pinIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  let cur = -1, phT = [];
  const later = (f, ms) => { if (!RM) phT.push(setTimeout(f, ms)); };
  const show = n => {
    if (n === cur) return; cur = n;
    steps.forEach((s, i) => s.classList.toggle('on', i === n));
    views.forEach((v, i) => v.classList.toggle('on', i === n));
    tabs.forEach(t => t.classList.toggle('on', t.dataset.tab.split(' ').includes(String(n))));
    phT.forEach(clearTimeout); phT = [];
    if (n === 0) {
      aReset($('ph-btn'), 'Confirmar'); $('ph-pill').className = 'dpill dp-warn'; $('ph-pill').textContent = 'Aguardando'; $('ph-reg').textContent = '1'; $('ph-dot').className = 'off';
      later(() => phT.push(busy($('ph-btn'), 1100, 'Confirmado', () => { $('ph-pill').className = 'dpill dp-ok'; $('ph-pill').textContent = 'Confirmado'; $('ph-reg').textContent = '2'; $('ph-dot').className = ''; }, true)), 1100);
    }
    if (n === 1) {
      $('ck-btn').hidden = false; aReset($('ck-btn'), pinIc + 'Fazer check-in'); $('ck-ic').className = 'dic'; $('ck-ic').innerHTML = pinIc;
      $('ck-txt').innerHTML = 'Check-in aberto até 22h<small>Funciona a até 150 m de Templo principal.</small>';
      later(() => phT.push(busy($('ck-btn'), 1300, 'Check-in feito', () => { phT.push(setTimeout(() => { $('ck-btn').hidden = true; $('ck-ic').className = 'dic ok'; $('ck-ic').innerHTML = okIcon; $('ck-txt').innerHTML = 'Check-in feito às 18h40<small>A 40 m do local · aguardando Daniela confirmar</small>'; }, 900)); }, true)), 1000);
    }
  };
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) show(+e.target.dataset.step); }), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(s => so.observe(s));
  }
  show(0);
  if (matchMedia('(max-width:760px)').matches && !RM) { let k = 0; setInterval(() => { k = (k + 1) % 4; show(k); }, 4200); }

  /* ---------- sol do fechamento: mesma animação do topo, começa ao aparecer ---------- */
  const cs = document.getElementById('closing-sun');
  if (!('IntersectionObserver' in window)) cs.classList.add('run');
  else new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { cs.classList.add('run'); o.disconnect(); } }), { threshold: .5 }).observe(cs);

  /* ---------- ícones dos planos ---------- */
  const shapes = {
    seed:'<path d="M12 21v-9M12 16C5 16 3 12 4 7c5-1 8 2 8 6M12 12c0-5 3-8 8-8 1 5-2 8-8 8M6 21h12"/>',
    church:'<path d="M7 21V10l5-4 5 4v11M3 21v-7l4-3M21 21v-7l-4-3M10 21v-5h4v5M12 2v4M10 3h4M3 21h18"/>',
    growth:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    harvest:'<path d="M12 22V10M12 14c-4 0-6-3-6-7 4 0 6 3 6 7ZM12 10c0-4 2-7 6-7 0 4-2 7-6 7ZM8 22h8"/>'
  };
  document.querySelectorAll('[data-ic]').forEach(el => el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${shapes[el.dataset.ic]}</svg>`);

  /* ---------- preços ---------- */
  const monthlyPrices = { semente: 0, essencial: 97, crescimento: 197 };
  const money = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const total = (plan, c) => monthlyPrices[plan] * (c === 'anual' ? 10 : 1);
  const priceLabel = (plan, c) => `${money(total(plan, c))}/${c === 'anual' ? 'ano' : 'mês'}`;
  const plansEl = document.getElementById('planos');
  const showPrices = c => {
    document.querySelectorAll('[data-price]').forEach(el => {
      const p = el.dataset.price;
      el.innerHTML = c === 'anual'
        ? `${money(total(p, c))}<small>por ano · equivale a ${money(total(p, c) / 12)}/mês<br>economia de ${money(monthlyPrices[p] * 2)}</small>`
        : `${money(total(p, c))}<small>por mês</small>`;
      if (!RM) el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  };
  document.querySelector('.billing').addEventListener('click', e => {
    const b = e.target.closest('[data-cycle]'); if (!b) return;
    plansEl.dataset.cycle = b.dataset.cycle;
    document.querySelectorAll('.billing button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    showPrices(b.dataset.cycle);
  });
  showPrices('mensal');

  /* ---------- contato ---------- */
  const dialog = document.getElementById('contact'), form = document.getElementById('interest'), success = document.getElementById('success');
  document.querySelectorAll('[data-contact]').forEach(b => b.addEventListener('click', () => {
    form.reset(); form.hidden = false; success.hidden = true;
    document.getElementById('plan-context').textContent = `Assunto: ${b.dataset.contact}.`;
    dialog.showModal();
  }));
  dialog.addEventListener('click', e => { if (e.target.closest('.close, .close-done')) dialog.close(); });
  form.addEventListener('submit', e => { e.preventDefault(); const b = form.querySelector('[type=submit]'); busy(b, 1100, 'Enviado', () => setTimeout(() => { aReset(b, 'Solicitar contato'); form.hidden = true; success.hidden = false; success.querySelector('button').focus(); }, RM ? 0 : 700), true); });

  /* ---------- cadastro ---------- */
  const host = document.createElement('main'); host.className = 'signup wrap'; host.hidden = true;
  document.querySelector('footer').before(host);
  const landing = document.getElementById('inicio');
  const data = { email: '', name: '', org: '', church: '', cycle: 'mensal' };
  const plans = { semente: 'Semente', essencial: 'Essencial', crescimento: 'Crescimento' };
  let plan = 'semente', step = 0;
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const field = (k, label, type = 'text', ac = '') => `<label class="fld">${label}<input id="su-${k}" name="${k}" type="${type}" value="${esc(data[k] || '')}" ${ac ? `autocomplete="${ac}"` : ''} required></label>`;
  const arrow = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const backIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:scaleX(-1)"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  let resendT;
  function render() {
    const free = plan === 'semente';
    const labels = ['E-mail', 'Código', 'Seus dados', 'Sua igreja', free ? 'Começar' : 'Assinatura'];
    const descs = ['Para onde enviamos o código', 'Confirme que é você', 'Quem responde pela conta', 'Organização e primeira igreja', free ? 'Revise e crie a conta' : 'Pagamento e confirmação'];
    const summary = `<div class="su-sum"><span>Plano <b>${plans[plan]}</b></span><strong data-su-price>${free ? 'Gratuito' : priceLabel(plan, data.cycle)}</strong><a href="#planos">Trocar de plano</a></div>`;
    let body = '';
    if (step === 0) body = `<h1>Uma nova caminhada <em>começa aqui.</em></h1><p>Crie sua conta para organizar a vida da sua igreja. Primeiro, vamos confirmar seu e-mail.</p>${field('email', 'Seu e-mail', 'email', 'email')}<button class="btn pri">Enviar código ${arrow}</button>`;
    if (step === 1) body = `<h1>Confira seu <em>e-mail.</em></h1><p>Enviamos um código de 6 dígitos para <b>${esc(data.email)}</b>.</p><div class="fld"><span>Código de confirmação</span><div class="otp" role="group" aria-label="Código de confirmação"><input class="otp-i" id="su-otp0" inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="one-time-code" aria-label="Dígito 1 de 6"><input class="otp-i" id="su-otp1" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Dígito 2 de 6"><input class="otp-i" id="su-otp2" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Dígito 3 de 6"><input class="otp-i" id="su-otp3" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Dígito 4 de 6"><input class="otp-i" id="su-otp4" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Dígito 5 de 6"><input class="otp-i" id="su-otp5" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Dígito 6 de 6"></div><input type="hidden" name="code"></div><p class="fine">Não recebeu? Confira a caixa de spam ou peça um novo código.</p><button class="btn pri">Confirmar e-mail ${arrow}</button><button type="button" class="btn sec su-full" id="resend" disabled>Reenviar código em 30s</button>`;
    if (step === 2) body = `<h1>Como podemos <em>chamar você?</em></h1><p>Este será o nome do responsável pela organização no Alva.</p>${field('name', 'Seu nome', 'text', 'name')}<p class="fine">Você pode entrar com um código por e-mail, sem criar senha agora.</p><button class="btn pri">Continuar ${arrow}</button>`;
    if (step === 3) body = `<h1>Um lugar para a sua <em>comunidade.</em></h1><p>Comece com a organização e a primeira igreja. Elas podem ter o mesmo nome.</p>${field('org', 'Nome da organização', 'text', 'organization')}${field('church', 'Nome da igreja inicial')}<button class="btn pri">Revisar ${free ? 'cadastro' : 'assinatura'} ${arrow}</button>`;
    if (step === 4) body = `<h1>${free ? 'Tudo pronto para' : 'Seu próximo'} <em>${free ? 'começar.' : 'passo.'}</em></h1><p>Confira seus dados antes de ${free ? 'criar a conta' : 'assinar'}.</p><dl class="su-dl"><dt>Responsável</dt><dd>${esc(data.name)}</dd><dt>E-mail</dt><dd>${esc(data.email)}</dd><dt>Organização</dt><dd>${esc(data.org)}</dd><dt>Igreja inicial</dt><dd>${esc(data.church)}</dd></dl>${free ? '<p>O plano Semente é gratuito. Não é preciso informar cartão nem fazer pagamento.</p>' : `<label class="fld">Ciclo da assinatura<select id="su-cycle" name="cycle"><option value="mensal" ${data.cycle === 'mensal' ? 'selected' : ''}>Mensal</option><option value="anual" ${data.cycle === 'anual' ? 'selected' : ''}>Anual · 2 meses grátis</option></select></label><div class="su-pay"><b>Pagamento</b><p>Aceitamos Pix, cartão de crédito e boleto.</p><span class="tnum" data-total></span></div>`}<button class="btn pri">${free ? 'Começar gratuitamente' : 'Assinar ' + plans[plan]} ${arrow}</button>`;
    if (step === 5) body = `<div class="su-check">${okIcon}</div><p class="eb">${free ? 'Cadastro concluído' : 'Assinatura confirmada'}</p><h1 style="margin-top:8px">Bem-vindo ao <em>Alva.</em></h1><p>${esc(data.name)}, sua igreja está pronta para o próximo passo.</p><a class="btn pri" href="../web/">Conhecer o painel ${arrow}</a>`;
    const cur = Math.min(step, 4), okI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const chk = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const icMap = { semente: 'seed', essencial: 'church', crescimento: 'growth' };
    const kicker = step < 5 ? `<div class="su-top">${step > 0 ? `<button type="button" class="lnk su-back" id="previous">${backIc}Voltar</button>` : ''}<p class="su-kicker">Etapa ${step + 1} de 5<i style="--p:${(step + 1) * 20}%"></i></p></div>` : '';
    host.innerHTML = `<div class="su-shell">
      <aside class="su-side">
        <a class="lnk back" href="#planos">${backIc}Voltar aos planos</a>
        <svg class="sun" viewBox="0 0 48 32" aria-hidden="true" data-sun></svg>
        <p class="eb">Criar conta</p>
        <h2 class="su-side-h">${free ? 'Comece grátis em poucos minutos.' : 'Sua igreja organizada em poucos minutos.'}</h2>
        <ol class="su-steps" aria-label="Etapas do cadastro">${labels.map((x, i) => `<li ${i === cur && step < 5 ? 'aria-current="step"' : ''} class="${i < step ? 'done' : ''}"><span class="dot">${i < step ? okI : i + 1}</span><b>${x}</b><small>${descs[i]}</small></li>`).join('')}</ol>
        <div class="su-plan"><span class="pic" data-ic="${icMap[plan] || 'seed'}"></span><div><b>Plano ${plans[plan]}</b><span data-su-price>${free ? 'Gratuito' : priceLabel(plan, data.cycle)}</span></div>${step < 5 ? '<a href="#planos">Trocar</a>' : ''}</div>
        <div class="su-prog" aria-hidden="true">${labels.map((x, i) => `<i class="${i <= cur || step === 5 ? 'on' : ''}"></i>`).join('')}</div>
      </aside>
      <div class="su-main"><section class="su-card">${kicker}<form>${body}<p role="status" id="su-status"></p></form></section></div>
    </div>`;
    host.querySelectorAll('[data-sun]').forEach(el => el.innerHTML = sunInner());
    host.querySelectorAll('[data-ic]').forEach(el => el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${shapes[el.dataset.ic]}</svg>`);
    const tot = host.querySelector('[data-total]');
    const upd = () => { if (tot) tot.textContent = `Total: ${money(total(plan, data.cycle))}${data.cycle === 'anual' ? ' por ano' : ' por mês'}`; host.querySelectorAll('[data-su-price]').forEach(e => e.textContent = free ? 'Gratuito' : priceLabel(plan, data.cycle)); };
    upd();
    host.querySelector('[name=cycle]')?.addEventListener('change', e => { data.cycle = e.target.value; upd(); });
    host.querySelector('form').onsubmit = e => {
      e.preventDefault();
      const values = Object.fromEntries(new FormData(e.currentTarget));
      if (step === 1) {
        const otpEl = host.querySelector('.otp'); otpEl.classList.remove('bad');
        if (values.code.length < 6) { host.querySelector('#su-status').textContent = 'Digite os 6 dígitos do código.'; [...host.querySelectorAll('.otp-i')].find(o => !o.value)?.focus(); return; }
      }
      const DONE = ['Código enviado', 'E-mail confirmado', 'Salvo', 'Tudo certo', plan === 'semente' ? 'Conta criada' : 'Assinatura confirmada'];
      const b = e.currentTarget.querySelector('.btn.pri'); host.querySelector('#su-status').textContent = '';
      busy(b, step === 4 ? 1600 : 1000, DONE[step], () => setTimeout(() => { Object.assign(data, values); delete data.code; step++; render(); }, RM ? 0 : 650), true);
    };
    host.querySelector('#previous')?.addEventListener('click', () => { Object.assign(data, Object.fromEntries(new FormData(host.querySelector('form')))); delete data.code; step--; render(); });
    const rs = host.querySelector('#resend');
    if (rs) {
      let left = 30;
      const tick = () => { if (!rs.isConnected) return clearInterval(resendT); if (rs.dataset.ahtml != null) return; left--; if (left > 0) { rs.textContent = `Reenviar código em ${left}s`; rs.disabled = true; } else { rs.textContent = 'Reenviar código'; rs.disabled = false; clearInterval(resendT); } };
      clearInterval(resendT); resendT = setInterval(tick, 1000);
      rs.addEventListener('click', () => busy(rs, 900, 'Código reenviado', () => { host.querySelector('#su-status').textContent = ''; setTimeout(() => { if (!rs.isConnected) return; aEnd(rs); left = 31; tick(); clearInterval(resendT); resendT = setInterval(tick, 1000); }, 1100); }, true));
    }
    const otps = [...host.querySelectorAll('.otp-i')];
    if (otps.length) {
      const sync = () => { host.querySelector('[name=code]').value = otps.map(o => o.value).join(''); otps.forEach(o => o.classList.toggle('filled', !!o.value)); host.querySelector('.otp').classList.remove('bad'); host.querySelector('#su-status').textContent = ''; };
      otps.forEach((o, k) => {
        o.placeholder = '·';
        o.addEventListener('input', () => { o.value = o.value.replace(/\D/g, '').slice(-1); sync(); if (o.value && otps[k + 1]) otps[k + 1].focus(); if (otps.every(x => x.value)) host.querySelector('.su-card .btn.pri').focus(); });
        o.addEventListener('keydown', e => { if (e.key === 'Backspace' && !o.value && otps[k - 1]) { otps[k - 1].value = ''; otps[k - 1].focus(); sync(); e.preventDefault(); } if (e.key === 'ArrowLeft' && otps[k - 1]) otps[k - 1].focus(); if (e.key === 'ArrowRight' && otps[k + 1]) otps[k + 1].focus(); });
        o.addEventListener('focus', () => o.select());
        o.addEventListener('paste', e => { const d = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault(); d.split('').forEach((c, x) => { if (otps[x]) otps[x].value = c; }); sync(); (otps[d.length] || otps[5]).focus(); });
      });
    }
    const h = host.querySelector('h1'); h.tabIndex = -1; h.focus({ preventScroll: true }); if (step === 1) host.querySelector('#su-otp0')?.focus({ preventScroll: true });
    scrollTo(0, 0);
  }
  /* ---------- exemplos do hero: frase digitada + cena correspondente ---------- */
  const ASK = ['ver o que precisa da minha atenção hoje', 'completar a escala de domingo', 'fazer check-in no ensaio do louvor', 'pedir oração por uma decisão no trabalho'];
  const slides = [...document.querySelectorAll('.slide')], typed = document.getElementById('ask-typed');
  const toast = document.getElementById('live-toast'), rb = document.getElementById('remind-btn');
  const okSm = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const g = id => document.getElementById(id);
  let si = 0, paused = RM, auto, timers = [], typeT;
  const at = (f, ms) => timers.push(setTimeout(f, RM ? 0 : ms));
  const typeIt = txt => {
    clearInterval(typeT);
    if (RM) { typed.textContent = txt; return; }
    let k = 0; typed.textContent = '';
    typeT = setInterval(() => { typed.textContent = txt.slice(0, ++k); if (k >= txt.length) clearInterval(typeT); }, 32);
  };
  const scenes = [
    () => { aReset(rb, 'Lembrar os 4'); toast.classList.remove('show');
      at(() => timers.push(busy(rb, 1100, 'Enviado', () => toast.classList.add('show'), true)), 2000); },
    () => {},
    () => { g('s2-btn').hidden = false; aReset(g('s2-btn'), pin + 'Fazer check-in'); g('s2-ic').className = 'dic'; g('s2-ic').innerHTML = pin;
      g('s2-txt').innerHTML = 'Check-in aberto até 22h<small>Funciona a até 150 m de Templo principal.</small>';
      at(() => timers.push(busy(g('s2-btn'), 1300, 'Check-in feito', () => timers.push(setTimeout(() => { g('s2-btn').hidden = true; g('s2-ic').className = 'dic ok'; g('s2-ic').innerHTML = okIcon; g('s2-txt').innerHTML = 'Check-in feito às 18h40<small>A 40 m do local · aguardando Daniela confirmar</small>'; }, 900)), true)), 1600); },
    () => { const ta = g('s3-ta'), b = g('s3-btn'), msg = 'Por sabedoria numa decisão importante no trabalho.';
      ta.innerHTML = '<span class="ph">Pelo que podemos orar?</span>'; aReset(b, 'Enviar pedido');
      at(() => { let k = 0; const t = setInterval(() => { ta.innerHTML = msg.slice(0, ++k) + '<span class="tc"></span>'; if (k >= msg.length) clearInterval(t); }, RM ? 0 : 28); timers.push(t); }, 1500);
      at(() => { ta.textContent = msg; timers.push(busy(b, 1100, 'Pedido enviado', null, true)); }, 3300); }
  ];
  const go = n => {
    si = (n + slides.length) % slides.length;
    timers.forEach(t => { clearTimeout(t); clearInterval(t); }); timers = [];
    slides.forEach((sl, i) => { sl.classList.toggle('on', i === si); sl.setAttribute('aria-hidden', String(i !== si)); });
    typeIt(ASK[si]); scenes[si]();
    clearTimeout(auto); if (!paused) auto = setTimeout(() => go(si + 1), 7000);
  };
  g('sl-next').onclick = g('ask-next').onclick = () => go(si + 1);
  g('sl-prev').onclick = () => go(si - 1);
  const pb = g('sl-pause');
  pb.onclick = () => { paused = !paused; pb.setAttribute('aria-pressed', String(paused)); pb.setAttribute('aria-label', paused ? 'Continuar exemplos' : 'Pausar exemplos'); clearTimeout(auto); if (!paused) auto = setTimeout(() => go(si + 1), 4000); };
  if (RM) pb.setAttribute('aria-pressed', 'true');
  setTimeout(() => go(0), RM ? 0 : 900);

  /* ---------- frase de impacto: palavras acendem ao rolar ---------- */
  const st = document.getElementById('statement');
  const wrapWords = node => [...node.childNodes].forEach(c => {
    if (c.nodeType === 1 && c.classList.contains('pair')) { wrapWords(c); return; }
    if (c.nodeType === 3) { const frag = document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach(t => { if (!t) return; if (/^\s+$/.test(t)) frag.append(t); else { const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = t; frag.append(sp); } }); c.replaceWith(frag); }
  });
  wrapWords(st);
  const units = [...st.querySelectorAll('.w, .ichip')];
  const paint = () => {
    const r = st.getBoundingClientRect(), vh = innerHeight;
    const p = Math.max(0, Math.min(1, (vh * .85 - r.top) / (r.height + vh * .35)));
    const lit = Math.round(p * units.length);
    units.forEach((u, i) => { const on = i < lit; if (u.classList.contains('ichip')) { if (on && !u.dataset.lit) { u.dataset.lit = 1; u.classList.add('pop'); } } else u.classList.toggle('dim', !on); });
  };
  if (!RM) { addEventListener('scroll', paint, { passive: true }); paint(); }


  /* ---------- recursos: abas que avançam sozinhas ---------- */
  {
    const tabs = [...document.querySelectorAll('.tab')], panes = [...document.querySelectorAll('.pane')];
    const DUR = 6000; let cur = 0, timer;
    const show = k => {
      cur = k;
      tabs.forEach((t, i) => { t.classList.remove('on'); t.setAttribute('aria-selected', String(i === k)); t.style.setProperty('--dur', DUR + 'ms'); });
      void document.body.offsetWidth;
      tabs[k].classList.add('on');
      panes.forEach((p, i) => p.classList.toggle('on', i === k));
      clearTimeout(timer); timer = setTimeout(() => show((cur + 1) % tabs.length), DUR);
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
    tabs.forEach(t => t.classList.remove('static'));
    const box = document.querySelector('.tabs');
    if ('IntersectionObserver' in window) new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { show(0); o.disconnect(); } }), { threshold: .35 }).observe(box);
    else show(0);
  }

  /* ---------- rodapé: a alvorada acontece quando a página termina ---------- */
  const ftp = document.querySelector('.ft');
  if (ftp && !RM) {
    let ftq = 0;
    const ftPaint = () => { ftq = 0; const r = ftp.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight - r.top) / r.height)); ftp.style.setProperty('--rise', (p * p * (3 - 2 * p)).toFixed(3)); };
    addEventListener('scroll', () => { if (!ftq) ftq = requestAnimationFrame(ftPaint); }, { passive: true }); ftPaint();
  }
  /* ---------- barra flutuante ---------- */
  const dock = g('dock'), panel = document.querySelector('.hero-panel'), closing = document.querySelector('.closing');
  const dockUpd = () => {
    const past = panel.getBoundingClientRect().bottom < 0;
    const end = closing.getBoundingClientRect().top < innerHeight * .9;
    const show = past && !end && !landing.hidden;
    dock.classList.toggle('show', show); dock.setAttribute('aria-hidden', String(!show));
    dock.querySelectorAll('a').forEach(a => a.tabIndex = show ? 0 : -1);
  };
  addEventListener('scroll', dockUpd, { passive: true });

  function route() {
    const key = location.hash.replace('#assinar/', '');
    const active = location.hash.startsWith('#assinar/') && Object.hasOwn(plans, key);
    host.hidden = !active; landing.hidden = active; if (typeof dockUpd === 'function') dockUpd();
    if (active) { plan = key; data.cycle = plansEl.dataset.cycle || 'mensal'; step = 0; render(); document.title = `Comece com ${plans[plan]} · Alva`; }
    else { document.title = 'Alva — Mais tempo para cuidar de pessoas'; if (location.hash && location.hash !== '#inicio') document.querySelector(location.hash)?.scrollIntoView(); }
  }
  addEventListener('hashchange', route);
  route();
})();
