// Valores ilustrativos aprovados para explorar a experiência comercial.
export const monthlyPrices = { semente: 0, essencial: 97, crescimento: 197 };
export const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const total = (plan, cycle) => monthlyPrices[plan] * (cycle === 'anual' ? 10 : 1);
export const priceLabel = (plan, cycle) => `${money(total(plan, cycle))}/${cycle === 'anual' ? 'ano' : 'mês'}`;
