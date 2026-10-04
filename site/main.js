// Ícones vetoriais da mesma família visual; sem dependência de fontes de símbolos.
const shapes = {
  seed: '<path d="M12 21v-9M12 16C5 16 3 12 4 7c5-1 8 2 8 6M12 12c0-5 3-8 8-8 1 5-2 8-8 8M6 21h12"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 4v2"/>',
  grid: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 10h18M10 10v11"/>',
  church: '<path d="M7 21V10l5-4 5 4v11M3 21V14l4-3M21 21V14l-4-3M10 21v-5h4v5M12 2v4M10 3h4M3 21h18"/>',
  growth: '<path d="M4 19 20 3M10 3h10v10M4 11v8h8"/>',
  harvest: '<path d="m5 21 14-14M10 16C3 16 3 10 3 10s7-1 7 6ZM14 12c-6 0-6-6-6-6s6 0 6 6ZM14 12c0 6 6 6 6 6s0-6-6-6ZM18 8c-3-4 1-7 1-7s5 4-1 7Z"/>'
};
const svg = key => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[key]}</svg>`;
document.querySelectorAll('.features .icon').forEach((el,i)=>el.innerHTML=svg(['seed','heart','team','grid'][i]));
document.querySelectorAll('.plan-icon').forEach((el,i)=>el.innerHTML=svg(['seed','church','growth','harvest'][i]));
const dialog = document.querySelector('#contact');
const form = document.querySelector('#interest');
const success = document.querySelector('#success');
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  form.reset(); form.hidden = false; success.hidden = true;
  document.querySelector('#plan-context').textContent = `Seu interesse: ${button.dataset.contact}.`;
  dialog.showModal();
}));
document.querySelectorAll('.close, .close-done').forEach(button => button.addEventListener('click', () => dialog.close()));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.hidden = true; success.hidden = false;
  success.querySelector('button').focus();
});

import "./signup.js";
import { monthlyPrices, money, total, priceLabel } from './pricing.js';

const cyclePicker = document.createElement('div');
cyclePicker.className = 'billing-picker';
cyclePicker.setAttribute('role', 'group');
cyclePicker.setAttribute('aria-label', 'Ciclo de cobrança');
cyclePicker.innerHTML = '<button type="button" data-cycle="mensal" aria-pressed="true">Mensal</button><button type="button" data-cycle="anual" aria-pressed="false">Anual <small>2 meses grátis</small></button>';
document.querySelector('#planos .center').after(cyclePicker);
cyclePicker.addEventListener('click', event => {
  const button = event.target.closest('[data-cycle]');
  if (!button) return;
  const cycle = button.dataset.cycle;
  document.querySelector('#planos').dataset.cycle = cycle;
  cyclePicker.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  showPrices(cycle);
});
function showPrices(cycle) {
  for (const [selector, plan] of [['.essential', 'essencial'], ['.growth', 'crescimento']]) {
    const price = document.querySelector(`${selector} .price`);
    price.classList.remove('pending');
    price.innerHTML = `${money(total(plan, cycle))}<small>/${cycle === 'anual' ? 'ano · cobrança anual' : 'mês'}</small>${cycle === 'anual' ? `<small>Equivale a ${money(total(plan, cycle) / 12)}/mês<br>Economize ${money(monthlyPrices[plan] * 2)} por ano</small>` : ''}`;
  }
}
showPrices('mensal');
document.querySelector('.plan-note').textContent = 'Preços ilustrativos. No anual, pague o equivalente a 10 meses e use por 12. Recursos e limites por plano ainda serão definidos.';
