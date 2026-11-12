/* Dados fictícios do protótipo do Alva PDV. Nada é salvo fora deste navegador. */
const LOJAS = [
  { id: 'sede', nome: 'Loja Alva Sede', sub: 'Livraria e presentes', igreja: 'Alva Sede' },
  { id: 'social', nome: 'Mercado Social', sub: 'Itens da ação social', igreja: 'Alva Sede' },
  { id: 'norte', nome: 'Loja Alva Norte', sub: 'Livraria e presentes', igreja: 'Alva Norte' }
];
const ORG = { nome: 'Rede Alva' };
const IGREJAS = [
  { id: 'sede', nome: 'Alva Sede', cnpj: '12.345.678/0001-90', dominio: 'alva.org', lojas: ['sede', 'social'] },
  { id: 'norte', nome: 'Alva Norte', cnpj: '98.765.432/0001-10', dominio: 'alvanorte.org', lojas: ['norte'] }
];
/* PDVs cadastrados no Alva Web (Financeiro › Contas financeiras › PDVs). Cada PDV tem no máximo UMA instalação ativa. */
const MAQUINA = 'CAIXA-DEMO-01';
const IP = '192.168.0.23';
const SYNC_S = 30; /* o processo interno confere a conexão a cada 30 segundos (parâmetro do PDV) */
const PDVS = [
  { code: 'PDV-SEDE-01', nome: 'Caixa da livraria 1', igrejaId: 'sede', lojaId: 'sede', ativo: true, inst: null },
  { code: 'PDV-SEDE-02', nome: 'Caixa da livraria 2', igrejaId: 'sede', lojaId: 'sede', ativo: true, inst: { maquina: 'CAIXA-LIVRARIA-02', ip: '192.168.0.41', desde: Date.now() - 6 * 864e5, visto: 'há 2 min' } },
  { code: 'PDV-SEDE-03', nome: 'Caixa antigo da livraria', igrejaId: 'sede', lojaId: 'sede', ativo: false, inst: null },
  { code: 'PDV-SOCIAL-01', nome: 'Caixa do mercadinho', igrejaId: 'sede', lojaId: 'social', ativo: true, inst: null },
  { code: 'PDV-SEDE-04', nome: 'Caixa novo (recém-cadastrado)', igrejaId: 'sede', lojaId: null, ativo: true, inst: null },
  { code: 'PDV-NORTE-01', nome: 'Caixa da Norte', igrejaId: 'norte', lojaId: 'norte', ativo: true, inst: null }
];
const CATS = {
  sede: ['Livros', 'Bíblias', 'Música', 'Presentes', 'Papelaria'],
  social: ['Mercearia', 'Higiene', 'Bebidas'],
  norte: ['Livros', 'Presentes']
};
const CAT_TONE = { 'Livros': 'ceu', 'Bíblias': 'menta', 'Música': 'rosado', 'Presentes': 'ambar', 'Papelaria': 'lima', 'Mercearia': 'ambar', 'Higiene': 'ceu', 'Bebidas': 'menta' };
const CATALOG = {
  sede: [
    ['7891000100011', 'Devocional 365 Dias', 'Livros', 39.9, 14],
    ['7891000100028', 'Manual do Discipulador', 'Livros', 44.9, 9],
    ['7891000100035', 'Mulheres de Fé', 'Livros', 36.0, 12],
    ['7891000100042', 'Casamento Para Sempre', 'Livros', 42.5, 7],
    ['7891000100059', 'Jovens em Missão', 'Livros', 34.9, 3],
    ['7891000100066', 'Orações para Cada Dia', 'Livros', 29.9, 18],
    ['7891000100073', 'Estudo em Romanos', 'Livros', 48.0, 6],
    ['7891000200018', 'Bíblia NVI Capa Dura', 'Bíblias', 119.9, 10],
    ['7891000200025', 'Bíblia de Estudo', 'Bíblias', 189.9, 5],
    ['7891000200032', 'Bíblia Kids Ilustrada', 'Bíblias', 69.9, 8],
    ['7891000200049', 'Bíblia Bolso Preta', 'Bíblias', 49.9, 2],
    ['7891000300015', 'CD Louvor Alva Vol. 1', 'Música', 29.9, 20],
    ['7891000300022', 'CD Alva Kids', 'Música', 24.9, 11],
    ['7891000300039', 'Vinil Alva Ao Vivo', 'Música', 129.9, 4],
    ['7891000400012', 'Caneca Alva', 'Presentes', 32.0, 25],
    ['7891000400029', 'Camiseta Alva', 'Presentes', 59.9, 16],
    ['7891000400036', 'Ecobag Alva', 'Presentes', 25.0, 13],
    ['7891000400043', 'Chaveiro Alva', 'Presentes', 9.9, 40],
    ['7891000400050', 'Marcador de Bíblia', 'Presentes', 6.5, 55],
    ['7891000400067', 'Cartão com Versículo', 'Presentes', 4.0, 80],
    ['7891000500019', 'Caderno Devocional', 'Papelaria', 27.9, 15],
    ['7891000500026', 'Caneta Alva', 'Papelaria', 8.0, 30],
    ['7891000500033', 'Kit de Adesivos', 'Papelaria', 12.0, 22],
    ['7891000500040', 'Agenda Ministerial', 'Papelaria', 49.9, 6]
  ],
  social: [
    ['7892000100010', 'Arroz 5 kg', 'Mercearia', 28.9, 30],
    ['7892000100027', 'Feijão 1 kg', 'Mercearia', 8.5, 42],
    ['7892000100034', 'Macarrão 500 g', 'Mercearia', 4.2, 60],
    ['7892000100041', 'Açúcar 1 kg', 'Mercearia', 5.4, 35],
    ['7892000100058', 'Óleo de Soja 900 ml', 'Mercearia', 7.9, 28],
    ['7892000100065', 'Café 500 g', 'Mercearia', 16.9, 18],
    ['7892000200017', 'Sabão em Pó 1 kg', 'Higiene', 14.5, 12],
    ['7892000200024', 'Sabonete', 'Higiene', 2.3, 70],
    ['7892000200031', 'Creme Dental', 'Higiene', 5.9, 24],
    ['7892000300014', 'Leite 1 L', 'Bebidas', 5.6, 40],
    ['7892000300021', 'Suco de Caixa 1 L', 'Bebidas', 7.2, 16]
  ],
  norte: [
    ['7893000100016', 'Devocional 365 Dias', 'Livros', 39.9, 8],
    ['7893000100023', 'Orações para Cada Dia', 'Livros', 29.9, 10],
    ['7893000100030', 'Estudo em Romanos', 'Livros', 48.0, 4],
    ['7893000400019', 'Caneca Alva Norte', 'Presentes', 32.0, 12],
    ['7893000400026', 'Chaveiro Alva Norte', 'Presentes', 9.9, 25],
    ['7893000400033', 'Marcador de Bíblia', 'Presentes', 6.5, 40]
  ]
};
const IMPRESSORAS = [
  { id: 'none', nome: 'Nenhuma (comprovante só por e-mail)' },
  { id: 'epson', nome: 'EPSON TM-T20X · térmica USB (Windows)' },
  { id: 'elgin', nome: 'Elgin i9 · térmica pela rede (192.168.0.50:9100)' },
  { id: 'comum', nome: 'HP LaserJet · impressora comum (Windows)' }
];

/* Maquininhas cadastradas no Alva Web (Financeiro › Contas financeiras › Maquininhas).
   Cada uma é amarrada a UM centro de custo (o módulo): o PDV da Loja só enxerga as da Loja.
   Tipo: solta (o operador registra), nuvem (Mercado Pago Point, com código do terminal) ou TEF conectado (pinpad local).
   Uma maquininha pode servir a mais de um PDV; o Financeiro vê quais usam. */
const CENTROS = { sede: 'Loja Alva Sede', social: 'Mercado Social', norte: 'Loja Alva Norte', cafe: 'Cafeteria', rest: 'Restaurante' };
const TIPOS_MAQ = { solta: 'Solta', nuvem: 'Nuvem', tef: 'TEF conectado' };
const MAQS = [
  { code: 'MQ-LOJA-01', nome: 'Moderninha da loja 1', tipo: 'nuvem', adq: 'Mercado Pago', terminal: 'NEWLAND_N950__123456789', centro: 'sede', igrejaId: 'sede', ativo: true, usedBy: ['PDV-SEDE-02'] },
  { code: 'MQ-LOJA-02', nome: 'Stone da loja', tipo: 'solta', adq: 'Stone', terminal: '', centro: 'sede', igrejaId: 'sede', ativo: true, usedBy: [] },
  { code: 'MQ-LOJA-03', nome: 'Cielo com pinpad', tipo: 'tef', adq: 'Cielo', terminal: '', centro: 'sede', igrejaId: 'sede', ativo: true, usedBy: [] },
  { code: 'MQ-SOCIAL-01', nome: 'Moderninha do mercadinho', tipo: 'nuvem', adq: 'Mercado Pago', terminal: 'NEWLAND_N950__987654321', centro: 'social', igrejaId: 'sede', ativo: true, usedBy: [] },
  { code: 'MQ-CAFE-01', nome: 'Moderninha da cafeteria', tipo: 'nuvem', adq: 'Mercado Pago', terminal: 'NEWLAND_N950__555000111', centro: 'cafe', igrejaId: 'sede', ativo: true, usedBy: [] },
  { code: 'MQ-REST-01', nome: 'Stone do restaurante', tipo: 'solta', adq: 'Stone', terminal: '', centro: 'rest', igrejaId: 'sede', ativo: true, usedBy: [] },
  { code: 'MQ-NOVA-01', nome: 'Moderninha nova (recém-cadastrada)', tipo: 'nuvem', adq: 'Mercado Pago', terminal: 'NEWLAND_N950__000111222', centro: null, igrejaId: 'sede', ativo: true, usedBy: [] },
  { code: 'MQ-NORTE-01', nome: 'Moderninha da Norte', tipo: 'nuvem', adq: 'Mercado Pago', terminal: 'NEWLAND_N950__222333444', centro: 'norte', igrejaId: 'norte', ativo: true, usedBy: [] }
];
/* Vouchers por loja (cadastro no Alva; o PDV baixa só os ativos). dias = dias até vencer (negativo = já venceu); limite null = sem limite de usos */
const VOUCHERS = {
  sede: [
    { code: 'BEMVINDO10', nome: 'Boas-vindas · 10%', tipo: 'p', valor: 10, dias: 40, ativo: true, limite: null, usos: 12 },
    { code: 'LIVRO5', nome: 'Campanha do livro · R$ 5', tipo: 'v', valor: 5, dias: 9, ativo: true, limite: null, usos: 31 },
    { code: 'VOLUNTARIO20', nome: 'Voluntários · 20%', tipo: 'p', valor: 20, dias: 120, ativo: true, limite: null, usos: 4 },
    { code: 'NATAL15', nome: 'Natal · 15%', tipo: 'p', valor: 15, dias: -3, ativo: true, limite: null, usos: 60 },
    { code: 'PAUSADO30', nome: 'Promoção pausada · 30%', tipo: 'p', valor: 30, dias: 60, ativo: false, limite: null, usos: 0 },
    { code: 'UNICO50', nome: 'Cortesia · R$ 50 (1 uso)', tipo: 'v', valor: 50, dias: 30, ativo: true, limite: 1, usos: 1 }
  ],
  social: [{ code: 'SOCIAL5', nome: 'Mercado · R$ 5', tipo: 'v', valor: 5, dias: 20, ativo: true, limite: null, usos: 8 }],
  norte: [{ code: 'NORTE10', nome: 'Norte · 10%', tipo: 'p', valor: 10, dias: 25, ativo: true, limite: null, usos: 2 }]
};
const PIX_MANUAL_S = 12; /* parâmetro do PDV: segundos até aparecer "confirmar à mão" no Pix (padrão real: 30) */
/* Modelo do comprovante (parâmetro da igreja sales.receipt.template): texto com marcas. O PDV leva este padrão e baixa o da igreja na sincronização. */
const RECEIPT_DEFAULT = '{{igreja}}\nCNPJ {{cnpj}}\n{{loja}} · {{pdv}}\nCOMPROVANTE · NÃO É DOCUMENTO FISCAL\n--------------------------------\nVenda {{numero}}\n{{data}} {{hora}}\n--------------------------------\n{{#itens}}\n{{qtd}}x {{nome}}   {{valor}}\n{{/itens}}\n--------------------------------\nSubtotal   {{subtotal}}\n{{voucher}}\n{{desconto}}\nTOTAL      {{total}}\n--------------------------------\n{{pagamento}}\nObrigado e que Deus abençoe!';
const RECEIPT_ALT = RECEIPT_DEFAULT.replace('Obrigado e que Deus abençoe!', 'Obrigado e que Deus abençoe!\nInstagram @alvasede');
const APP_VER = '1.0.3', APP_NEW = '1.0.4';
