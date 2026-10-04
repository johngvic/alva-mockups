import { priceLabel, total, money } from './pricing.js';
const host = document.createElement('main');
host.className = 'signup wrap';
host.hidden = true;
document.querySelector('footer').before(host);
const landing = document.querySelector('#inicio');
const data = { email: '', name: '', org: '', church: '', cycle: 'mensal' };
const plans = { semente: 'Semente', essencial: 'Essencial', crescimento: 'Crescimento' };
let plan = 'semente', step = 0;
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const field = (key, label, type = 'text', autocomplete = '') => `<label>${label}<input name="${key}" type="${type}" value="${esc(data[key] || '')}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} required></label>`;
function render() {
  const free = plan === 'semente';
  const labels = ['E-mail', 'Código', 'Seus dados', 'Sua igreja', free ? 'Começar' : 'Assinatura'];
  const summary = `<div class="signup-summary"><span>Plano <b>${plans[plan]}</b></span><strong data-price>${free ? 'Gratuito' : priceLabel(plan, data.cycle)}</strong><a href="#planos">Trocar plano</a></div>`;
  let body = '';
  if (step === 0) body = `<h1>Uma nova caminhada<br><em>começa aqui.</em></h1><p>Crie sua conta para organizar a vida da sua igreja. Primeiro, vamos confirmar seu e-mail.</p>${summary}${field('email', 'Seu e-mail', 'email', 'email')}<button class="button">Enviar código →</button>`;
  if (step === 1) body = `<h1>Confira seu <em>e-mail.</em></h1><p>Enviaremos um código para <b>${esc(data.email)}</b>.</p><label>Código de confirmação<input name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" placeholder="000000" required></label><p class="fine">Neste protótipo, use <b>123456</b>. Nenhum e-mail é enviado.</p><button class="button">Confirmar e-mail →</button><button type="button" class="text-link" id="resend">Reenviar código</button>`;
  if (step === 2) body = `<h1>Como podemos<br><em>chamar você?</em></h1><p>Este será o nome do responsável por iniciar a organização no Alva.</p>${field('name', 'Seu nome', 'text', 'name')}<p class="fine">Você poderá entrar usando um código por e-mail, sem precisar criar uma senha agora.</p><button class="button">Continuar →</button>`;
  if (step === 3) body = `<h1>Um lugar para<br>a sua <em>comunidade.</em></h1><p>Comece com sua organização e a primeira igreja. Elas podem ter o mesmo nome.</p>${field('org', 'Nome da organização', 'text', 'organization')}${field('church', 'Nome da igreja inicial')}<button class="button">Revisar ${free ? 'cadastro' : 'assinatura'} →</button>`;
  if (step === 4) body = `<h1>${free ? 'Tudo pronto para' : 'Seu próximo'}<br><em>${free ? 'começar.' : 'passo.'}</em></h1>${summary}<dl class="signup-details"><dt>Responsável</dt><dd>${esc(data.name)}</dd><dt>E-mail confirmado</dt><dd>${esc(data.email)}</dd><dt>Organização</dt><dd>${esc(data.org)}</dd><dt>Igreja inicial</dt><dd>${esc(data.church)}</dd></dl>${free ? '<p>Seu plano Semente é gratuito. Você não precisa informar cartão ou fazer um pagamento.</p>' : `<label>Ciclo da assinatura<select name="cycle"><option value="mensal" ${data.cycle === 'mensal' ? 'selected' : ''}>Mensal</option><option value="anual" ${data.cycle === 'anual' ? 'selected' : ''}>Anual</option></select></label><div class="payment-preview"><b>Pagamento</b><p>Na contratação, o checkout apresentará o valor e as formas de pagamento disponíveis. Aqui você pode simular a confirmação, sem inserir dados financeiros.</p><span>Total: valor em definição</span></div>`}<button class="button">${free ? 'Começar gratuitamente' : 'Simular pagamento e assinar'} →</button>`;
  if (step === 5) body = `<span class="signup-check" aria-hidden="true">✓</span><p class="eyebrow">${free ? 'CADASTRO CONCLUÍDO' : 'ASSINATURA CONFIRMADA'} · SIMULAÇÃO</p><h1>Bem-vindo<br>ao <em>Alva.</em></h1><p>${esc(data.name)}, sua igreja está pronta para dar o próximo passo.</p>${summary}<p class="fine">Fluxo demonstrativo concluído. Nenhuma conta, igreja ou cobrança real foi criada. O painel a seguir usa os dados fixos do protótipo.</p><a class="button" href="../web/">Conhecer o painel →</a>`;
  host.innerHTML = `<a class="text-link" href="#planos">← Voltar aos planos</a><ol class="signup-steps" aria-label="Etapas do cadastro">${labels.map((x, i) => `<li ${i === Math.min(step, 4) ? 'aria-current="step"' : ''} class="${i < step ? 'done' : ''}"><span>${i < step ? '✓' : i + 1}</span>${x}</li>`).join('')}</ol><section class="signup-card"><form>${body}<p role="status" id="signup-status"></p>${step > 0 && step < 5 ? '<button type="button" class="text-link" id="previous">← Etapa anterior</button>' : ''}</form></section><p class="signup-disclaimer">Protótipo de experiência. Preços, ciclos comerciais e recursos por plano ainda serão definidos.</p>`;
  const paymentTotal = host.querySelector('.payment-preview span');
  const updateTotal = () => {
    if (paymentTotal) paymentTotal.textContent = `Total simulado: ${money(total(plan, data.cycle))}${data.cycle === 'anual' ? ' · cobrança anual · 2 meses grátis' : ' · cobrança mensal'}`;
    host.querySelector('[data-price]').textContent = free ? 'Gratuito' : priceLabel(plan, data.cycle);
  };
  if (paymentTotal) updateTotal();
  host.querySelector('[name=cycle]')?.addEventListener('change', event => { data.cycle = event.target.value; updateTotal(); });
  host.querySelector('.signup-disclaimer').textContent = 'Protótipo de experiência · preços e desconto ilustrativos · recursos e limites por plano em definição.';
  host.querySelector('form').onsubmit = event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (step === 1 && values.code !== '123456') { host.querySelector('#signup-status').textContent = 'Use o código demonstrativo 123456.'; return; }
    Object.assign(data, values); delete data.code;
    step++; render();
  };
  host.querySelector('#previous')?.addEventListener('click', () => { Object.assign(data, Object.fromEntries(new FormData(host.querySelector('form')))); step--; render(); });
  host.querySelector('#resend')?.addEventListener('click', () => { host.querySelector('#signup-status').textContent = 'Reenvio simulado. Use 123456 para continuar.'; });
  const heading = host.querySelector('h1'); heading.tabIndex = -1; heading.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}
function route() {
  const key = location.hash.replace('#assinar/', '');
  const active = location.hash.startsWith('#assinar/') && Object.hasOwn(plans, key);
  host.hidden = !active; landing.hidden = active;
  if (active) { plan = key; data.cycle = document.querySelector('#planos').dataset.cycle || 'mensal'; step = 0; render(); document.title = `Comece com ${plans[plan]} · Alva`; }
  else { document.title = 'Alva — Mais tempo para cuidar de pessoas'; if (location.hash === '#planos') document.querySelector('#planos').scrollIntoView(); }
}
window.addEventListener('hashchange', route);
route();
