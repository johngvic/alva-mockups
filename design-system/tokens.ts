/**
 * Alva Design System — tokens
 * Fonte única para @alva/theme (alva-kit/packages/theme). Extraído dos protótipos Alva Web (v71) e Alva Mobile (v62).
 *
 * Gera:
 *  - variáveis CSS (web)            → toCssVars()
 *  - preset Tailwind / NativeWind   → tailwindPreset
 *  - constantes para Reanimated     → importar `motion`, `radius`, `space` direto
 *
 * Temas: "light" (claro, padrão do web) e "dark" (escuro, padrão do mobile).
 * Convenção: todo identificador em inglês; comentários e documentação em pt-BR.
 * Regra: componentes usam SEMPRE tokens semânticos (theme.*), nunca a paleta crua nem hex direto.
 */

/* ───────────────────────── 1. Paleta base (crua) ───────────────────────── */

export const palette = {
  abyss: '#010f12',
  night: '#122529',
  navy: '#002236',
  deepTeal: '#00474d',
  ocean: '#07486e', // cor da marca
  teal: '#008582',
  sage: '#6da8a7',
  mint: '#c7ebea',
  sky: '#a9c8da',
  deepWine: '#4c0000',
  wine: '#711610',
  ember: '#fe3e00',
  coral: '#ff7b50',
  orange: '#ff7e00',
  amber: '#ffaf61',
  apricot: '#ffcd9c',
  blush: '#ffcdbd',
  olive: '#85b037',
  lime: '#b1e454',
  lightLime: '#ddff9f',
  stone: '#b5b8ad',
  white: '#ffffff',
  // neutros de apoio usados no tema Dia
  mist: '#eef0ea',
  chalk: '#f5f6f2',
  slate: '#4f5a58',
  gray: '#7c8581',
  // apoio
  dawn: '#fff6e0',
  lightSky: '#e6f4f7',
} as const;

/* ───────────────────────── 2. Temas (semânticos) ───────────────────────── */

const light = {
  // superfícies
  bg: '#eef0ea',
  surface: '#ffffff',
  surface2: '#f5f6f2',
  glass: 'rgba(255,255,255,.72)',
  // texto
  ink: '#010f12',
  inkMuted: '#4f5a58',
  inkSoft: '#7c8581',
  // linhas
  line: 'rgba(1,15,18,.09)',
  lineStrong: 'rgba(1,15,18,.16)',
  // marca
  brand: '#07486e',
  onBrand: '#ffffff',
  brandText: '#07486e',
  brandSoft: 'rgba(7,72,110,.08)',
  focus: '#008582',
  signal: '#b1e454',
  positive: '#3f7a12',
  // ambiente (gradiente de fundo)
  ambient1: 'rgba(169,200,218,.38)',
  ambient2: 'rgba(199,235,234,.34)',
  // status — success = confirmado/presente · info = aceito/agendado · warning = pendente · danger = erro/recusado/urgente
  success: '#3f7a12', successBg: 'rgba(177,228,84,.28)',
  info: '#07486e', infoBg: 'rgba(169,200,218,.4)',
  warning: '#b4570b', warningBg: 'rgba(255,175,97,.24)',
  danger: '#711610', dangerBg: 'rgba(255,205,189,.5)',
  // tons de texto para destaques
  highlightApricot: '#b4570b', highlightApricotBg: 'rgba(255,175,97,.2)',
  highlightSky: '#07486e', highlightSkyBg: 'rgba(169,200,218,.34)',
  highlightMint: '#00605c', highlightMintBg: 'rgba(199,235,234,.7)',
  // gráficos (escala sequencial)
  chart1: '#c7dfe9', chart2: '#7fb0c9', chart3: '#2f6f94', chart4: '#07486e',
  chartWarm: '#d9730d',
  // logo (sol)
  sun1: '#c7ebea', sun2: '#6da8a7', sun3: '#07486e', sunRay: '#07486e',
  // sombras
  shadowCard: '0 1px 2px rgba(1,15,18,.04), 0 10px 30px rgba(1,15,18,.06)',
  shadowPop: '0 2px 6px rgba(1,15,18,.06), 0 24px 60px rgba(1,15,18,.16)',
  scrim: 'rgba(1,15,18,.32)',
} as const;

const dark: Record<keyof typeof light, string> = {
  bg: '#010f12',
  surface: '#13292d',
  surface2: '#0c2024',
  glass: 'rgba(18,37,41,.72)',
  ink: '#ffffff',
  inkMuted: '#b5b8ad',
  inkSoft: '#8a948f',
  line: 'rgba(255,255,255,.08)',
  lineStrong: 'rgba(255,255,255,.16)',
  brand: '#a9c8da',
  onBrand: '#002236',
  brandText: '#a9c8da',
  brandSoft: 'rgba(169,200,218,.1)',
  focus: '#c7ebea',
  signal: '#b1e454',
  positive: '#b1e454',
  ambient1: 'rgba(7,72,110,.45)',
  ambient2: 'rgba(0,71,77,.32)',
  success: '#b1e454', successBg: 'rgba(177,228,84,.14)',
  info: '#a9c8da', infoBg: 'rgba(169,200,218,.16)',
  warning: '#ffaf61', warningBg: 'rgba(255,175,97,.14)',
  danger: '#ffcdbd', dangerBg: 'rgba(255,123,80,.16)',
  highlightApricot: '#ffcd9c', highlightApricotBg: 'rgba(255,175,97,.14)',
  highlightSky: '#a9c8da', highlightSkyBg: 'rgba(169,200,218,.14)',
  highlightMint: '#c7ebea', highlightMintBg: 'rgba(109,168,167,.18)',
  chart1: '#1d4152', chart2: '#3f7896', chart3: '#7fb0c9', chart4: '#c7e3ef',
  chartWarm: '#ffaf61',
  sun1: '#e6f4f7', sun2: '#a9c8da', sun3: '#6da8a7', sunRay: '#a9c8da',
  shadowCard: 'inset 0 1px 0 rgba(255,255,255,.05), 0 14px 34px rgba(0,0,0,.3)',
  shadowPop: 'inset 0 1px 0 rgba(255,255,255,.06), 0 24px 60px rgba(0,0,0,.55)',
  scrim: 'rgba(1,15,18,.32)',
};

export const themes = { light, dark } as const;
export type ThemeName = keyof typeof themes;
export type ThemeToken = keyof typeof light;

/* Tons de categoria (avatares, etiquetas, gráficos categóricos). Iguais nos dois temas. */
export const tones = {
  sky: { fill: '#a9c8da', ink: '#002236' },
  mint: { fill: '#c7ebea', ink: '#00474d' },
  apricot: { fill: '#ffcd9c', ink: '#4c0000' },
  blush: { fill: '#ffcdbd', ink: '#711610' },
  lime: { fill: '#ddff9f', ink: '#122529' },
  sage: { fill: '#6da8a7', ink: '#010f12' },
} as const;

/* ───────────────────────── 3. Tipografia ───────────────────────── */

export const fontFamily = {
  display: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Arial, sans-serif',
  text: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", "Iowan Old Style", Georgia, serif',
} as const;

/** Fallback carregado do Google Fonts: Inter 400–800 e Instrument Serif (normal + itálico). */
export const fontFeatures = '"ss01", "cv11"';

type TypeStyle = {
  family: keyof typeof fontFamily;
  size: number; // px
  lineHeight: number | string; // px ou relativo
  weight: 400 | 500 | 600 | 700 | 800;
  tracking?: string; // letter-spacing
  italic?: boolean;
  uppercase?: boolean;
  tabular?: boolean;
};

export const type: Record<string, TypeStyle> = {
  hero:      { family: 'display', size: 44, lineHeight: 0.9, weight: 700, tracking: '-0.04em', tabular: true },
  h1:        { family: 'display', size: 30, lineHeight: 34, weight: 700, tracking: '-0.03em' },
  h1Accent:  { family: 'serif', size: 33, lineHeight: 34, weight: 400, italic: true, tracking: '-0.01em' },
  kpi:       { family: 'display', size: 26, lineHeight: 1, weight: 700, tracking: '-0.03em', tabular: true },
  title:     { family: 'display', size: 22, lineHeight: 1, weight: 700, tracking: '-0.02em' },
  dialog:    { family: 'display', size: 19, lineHeight: 24, weight: 600, tracking: '-0.01em' },
  h2:        { family: 'display', size: 17, lineHeight: 22, weight: 600, tracking: '-0.01em' },
  lede:      { family: 'text', size: 15, lineHeight: 22, weight: 400 },
  itemTitle: { family: 'text', size: 14.5, lineHeight: 19, weight: 600 },
  body:      { family: 'text', size: 14, lineHeight: 20, weight: 400 },
  bodyStrong:{ family: 'text', size: 14, lineHeight: 18, weight: 600 },
  input:     { family: 'text', size: 14.5, lineHeight: 1, weight: 400 },
  bodySm:    { family: 'text', size: 13, lineHeight: 18, weight: 400 },
  button:    { family: 'text', size: 13, lineHeight: 1, weight: 600 },
  label:     { family: 'text', size: 12.5, lineHeight: 16, weight: 500 },
  caption:   { family: 'text', size: 12, lineHeight: 16, weight: 400 },
  badge:     { family: 'text', size: 11, lineHeight: 1, weight: 600 },
  eyebrow:   { family: 'text', size: 11.5, lineHeight: 16, weight: 600, tracking: '0.14em', uppercase: true },
  overline:  { family: 'text', size: 11, lineHeight: 14, weight: 600, tracking: '0.12em', uppercase: true },
  serifQuote:{ family: 'serif', size: 17, lineHeight: 1, weight: 400, italic: true },
  logo:      { family: 'display', size: 25, lineHeight: 0.8, weight: 800, tracking: '-0.055em' },
};

/* ───────────────────────── 4. Espaço, raio, layout ───────────────────────── */

/** Base 4px. Chaves seguem a escala do Tailwind (1 = 4px). */
export const space = {
  0: 0, 0.5: 2, 1: 4, 1.5: 6, 2: 8, 2.5: 10, 3: 12, 3.5: 14, 4: 16, 4.5: 18,
  5: 20, 5.5: 22, 6: 24, 7: 28, 8: 32, 10: 40, 12: 48, 14: 56,
} as const;

export const radius = {
  xs: 6,     // kbd, mini-etiquetas
  sm: 10,    // itens de menu, botões de ícone quadrados, linhas
  field: 12, // inputs, selects
  md: 14,    // popovers, dias da semana, cards pequenos
  lg: 20,    // cards (web)
  lgMobile: 24, // cards e sheets (mobile)
  dialog: 22,   // modais (≥640px)
  sheet: 24,    // bottom sheet (topo)
  xl: 32,       // mobile: blocos de destaque
  full: 999,    // botões, pills, chips, toasts, segmentados
} as const;

export const layout = {
  contentMax: 1240,   // .wrap
  sidebar: 248,       // menu lateral desktop
  drawer: 284,        // menu lateral mobile (off-canvas)
  topbar: 58,
  gutterMobile: 16,
  dialog: { sm: 440, md: 480, lg: 720 },
  control: { sm: 32, md: 36, lg: 42, icon: 38 }, // alturas
  avatar: { xs: 24, sm: 30, md: 36, lg: 44 },
} as const;

export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

/* ───────────────────────── 5. Gradientes ───────────────────────── */

/** Strings CSS; variáveis referem-se a toCssVars(). */
export const gradients = {
  /** Fundo ambiente de toda tela (body::before). Duas manchas radiais suaves no topo. */
  ambient:
    'radial-gradient(900px 520px at 100% 0%, var(--ambient-1), transparent 70%), radial-gradient(760px 460px at 20% 0%, var(--ambient-2), transparent 72%)',
  /** Painel da marca no login (75% da largura no desktop). */
  brandPanel: 'linear-gradient(180deg, #07486e 0%, #002236 100%)',
  brandPanelGlow: 'radial-gradient(60% 90% at 50% 100%, rgba(199,235,234,.22), transparent 70%)',
  brandPanelDawn: 'linear-gradient(180deg, rgba(255,246,224,.26), rgba(199,235,234,.10) 38%, rgba(109,168,167,0) 60%)',
  /** Disco do sol (logo): vertical sun1 → sun2 → sun3. */
  sunDisc: 'linear-gradient(180deg, var(--sun-1) 0%, var(--sun-2) 50%, var(--sun-3) 100%)',
  /** Brilho suave atrás do sol (splash). */
  sunHalo: 'radial-gradient(circle, rgba(199,235,234,.35), rgba(109,168,167,.1) 45%, transparent 70%)',
  /** Cabeçalho do perfil. */
  profileHeader: 'linear-gradient(135deg, var(--brand-soft), var(--surface-2) 75%)',
  /** Card de destaque / hero. */
  heroCard: 'linear-gradient(160deg, var(--brand-soft), var(--surface) 70%)',
  /** Linha urgente — substitui faixas laterais (proibidas). */
  urgentRow: 'linear-gradient(90deg, color-mix(in srgb, var(--danger-bg) 70%, transparent), transparent 45%)',
  /** Item ativo no seletor de igreja. */
  activeRow: 'linear-gradient(90deg, var(--brand-soft), transparent 85%)',
  /** Brilho que atravessa o botão em carregamento. */
  sheen: 'linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)',
  /** Fade de borda para listas roláveis (mask-image). */
  scrollFade: 'linear-gradient(to bottom, transparent, #000 10px, #000 calc(100% - 16px), transparent)',
  /** Hachura para dias bloqueados / segmentos vazios. */
  hatch: 'repeating-linear-gradient(135deg, var(--line-strong) 0 1.5px, transparent 1.5px 5px)',
  /** Certificado de apresentação (moldura). */
  certificate: 'linear-gradient(135deg, #e9dcc0, #f7f0df 40%, #e4d3b0)',
} as const;

/* ───────────────────────── 6. Motion ───────────────────────── */

export const motion = {
  easing: {
    standard: 'cubic-bezier(.2,.8,.2,1)',   // entradas, painéis, popovers
    spring: 'cubic-bezier(.2,1.4,.4,1)',    // confirmações, raios do sol, "pop"
    emphasized: 'cubic-bezier(.65,0,.35,1)',// traços (linha do horizonte)
    progress: 'cubic-bezier(.25,.8,.25,1)', // barra de progresso do botão assíncrono
    exit: 'ease',
  },
  duration: {
    instant: 120, // :active scale
    fast: 150,    // hover, cor
    base: 200,    // popover
    medium: 250,  // fades, toggles
    slow: 320,    // drawer, sheet, modal
    pop: 450,     // sucesso do botão
    entrance: 700,// .rise
    splash: 2600, // splash completo (2–3 s)
  },
  stagger: 70, // ms entre itens na entrada (.rise)
  press: 0.97, // scale no :active
} as const;

/* ───────────────────────── 7. Elevação e camadas ───────────────────────── */

export const zIndex = {
  topbar: 40, popover: 50, drawerVeil: 55, drawer: 60, palette: 80, dialog: 85, toast: 90,
} as const;

export const blur = { scrim: 3, glass: 16 } as const;

/* ───────────────────────── 8. Saídas ───────────────────────── */

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([a-z])([0-9])/g, '$1$2').toLowerCase();

/** Nomes das variáveis CSS em kebab-case (ex.: --ink-muted, --success-bg, --ambient-1, --sun-ray). */
const cssName: Partial<Record<ThemeToken, string>> = {
  ambient1: 'ambient-1', ambient2: 'ambient-2', surface2: 'surface-2',
  chart1: 'chart-1', chart2: 'chart-2', chart3: 'chart-3', chart4: 'chart-4',
  sun1: 'sun-1', sun2: 'sun-2', sun3: 'sun-3',
};

export function toCssVars(theme: ThemeName): Record<string, string> {
  const t = themes[theme];
  const out: Record<string, string> = {};
  for (const k of Object.keys(t) as ThemeToken[]) out[`--${cssName[k] ?? kebab(k)}`] = t[k];
  for (const [k, v] of Object.entries(tones)) {
    out[`--tone-${k}`] = v.fill;
    out[`--tone-${k}-ink`] = v.ink;
  }
  out['--font-display'] = fontFamily.display;
  out['--font-text'] = fontFamily.text;
  out['--font-serif'] = fontFamily.serif;
  out['--radius-sm'] = `${radius.sm}px`;
  out['--radius-md'] = `${radius.md}px`;
  out['--radius-lg'] = `${radius.lg}px`;
  // aliases shadcn/ui
  Object.assign(out, {
    '--background': 'var(--bg)', '--foreground': 'var(--ink)',
    '--card': 'var(--surface)', '--card-foreground': 'var(--ink)',
    '--popover': 'var(--surface)', '--popover-foreground': 'var(--ink)',
    '--primary': 'var(--brand)', '--primary-foreground': 'var(--on-brand)',
    '--secondary': 'var(--surface-2)', '--secondary-foreground': 'var(--ink)',
    '--muted': 'var(--surface-2)', '--muted-foreground': 'var(--ink-muted)',
    '--accent': 'var(--brand-soft)', '--accent-foreground': 'var(--brand-text)',
    '--destructive': 'var(--danger)', '--destructive-foreground': 'var(--surface)',
    '--border': 'var(--line)', '--input': 'var(--line-strong)', '--ring': 'var(--focus)',
    '--radius': 'var(--radius-md)',
  });
  return out;
}

/** CSS pronto: :root = light, [data-theme="dark"] = dark. */
export function toCss(): string {
  const block = (sel: string, vars: Record<string, string>) =>
    `${sel}{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`;
  return [
    block(':root', { ...toCssVars('light'), 'color-scheme': 'light' }),
    block(':root[data-theme="dark"]', { ...toCssVars('dark'), 'color-scheme': 'dark' }),
  ].join('\n');
}

const v = (name: string) => `var(--${name})`;
const px = (o: Record<string | number, number>) =>
  Object.fromEntries(Object.entries(o).map(([k, n]) => [k, `${n}px`]));

/** Preset para tailwind.config (web) e NativeWind (mobile). */
export const tailwindPreset = {
  theme: {
    screens: px(breakpoints),
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: v('bg'),
      surface: { DEFAULT: v('surface'), 2: v('surface-2'), glass: v('glass') },
      ink: { DEFAULT: v('ink'), muted: v('ink-muted'), soft: v('ink-soft') },
      line: { DEFAULT: v('line'), strong: v('line-strong') },
      brand: { DEFAULT: v('brand'), on: v('on-brand'), text: v('brand-text'), soft: v('brand-soft') },
      focus: v('focus'),
      signal: v('signal'),
      positive: v('positive'),
      success: { DEFAULT: v('success'), bg: v('success-bg') },
      info: { DEFAULT: v('info'), bg: v('info-bg') },
      warning: { DEFAULT: v('warning'), bg: v('warning-bg') },
      danger: { DEFAULT: v('danger'), bg: v('danger-bg') },
      highlight: {
        apricot: v('highlight-apricot'), 'apricot-bg': v('highlight-apricot-bg'),
        sky: v('highlight-sky'), 'sky-bg': v('highlight-sky-bg'),
        mint: v('highlight-mint'), 'mint-bg': v('highlight-mint-bg'),
      },
      tone: Object.fromEntries(
        Object.keys(tones).flatMap((k) => [[k, v(`tone-${k}`)], [`${k}-ink`, v(`tone-${k}-ink`)]]),
      ),
      chart: { 1: v('chart-1'), 2: v('chart-2'), 3: v('chart-3'), 4: v('chart-4'), warm: v('chart-warm') },
      // aliases shadcn
      background: v('background'), foreground: v('foreground'),
      primary: { DEFAULT: v('primary'), foreground: v('primary-foreground') },
      secondary: { DEFAULT: v('secondary'), foreground: v('secondary-foreground') },
      muted: { DEFAULT: v('muted'), foreground: v('muted-foreground') },
      accent: { DEFAULT: v('accent'), foreground: v('accent-foreground') },
      card: { DEFAULT: v('card'), foreground: v('card-foreground') },
      popover: { DEFAULT: v('popover'), foreground: v('popover-foreground') },
      border: v('border'), input: v('input'), ring: v('ring'),
      destructive: { DEFAULT: v('destructive'), foreground: v('destructive-foreground') },
    },
    fontFamily: {
      display: fontFamily.display.split(', '),
      sans: fontFamily.text.split(', '),
      serif: fontFamily.serif.split(', '),
    },
    spacing: px(space),
    borderRadius: { none: '0px', ...px(radius), DEFAULT: `${radius.md}px` },
    boxShadow: { card: v('shadow-card'), pop: v('shadow-pop'), none: 'none' },
    backgroundImage: gradients,
    transitionTimingFunction: motion.easing,
    transitionDuration: Object.fromEntries(Object.entries(motion.duration).map(([k, n]) => [k, `${n}ms`])),
    zIndex: Object.fromEntries(Object.entries(zIndex).map(([k, n]) => [k, String(n)])),
    extend: {
      maxWidth: { content: `${layout.contentMax}px` },
      backdropBlur: px(blur),
    },
  },
} as const;
