# Alva — Design System

Referência do visual atual do Alva, extraída dos protótipos em `ux_alva`: **Alva Web** (`web/`), **Alva Mobile** (`mobile/`), **Landing** (`site/`) e **Painel de Assinaturas** (`subscriptions/`). Os quatro seguem este documento; o que é próprio de cada um está na seção 16. Os valores daqui estão em `tokens.ts`. Cada repositório (web, mobile, landing e Assinaturas) copia esses valores para a sua própria declaração de tema; não há pacote compartilhado.

**Convenção de nomes:** todo identificador (tokens, variáveis CSS, classes, chaves do TypeScript, nomes de componentes) é em **inglês**. Explicações e textos da interface ficam em pt-BR. Na interface, os temas continuam se chamando "Dia" e "Noite"; no código são `light` e `dark`.

**Princípios:** minimalista e moderno, superfícies que flutuam sobre um gradiente ambiente discreto, muito respiro, cor usada com intenção (marca, status) e não como decoração.

---

## 1. Temas

| Tema (código) | Rótulo na interface | Uso | Ativação |
| --- | --- | --- | --- |
| `light` | Dia | Padrão do Alva Web | `:root` |
| `dark` | Noite | Padrão do Alva Mobile, opcional no web | `:root[data-theme="dark"]` |

A troca é feita em Meu perfil → Preferências (Dia · Noite · Sistema), salva como `theme: 'light' | 'dark' | 'system'`. Todo componente usa só tokens semânticos, então funciona nos dois temas sem código extra.

---

## 2. Fontes

| Papel | Família | Fallback | Onde |
| --- | --- | --- | --- |
| Display | SF Pro Display | -apple-system, **Inter**, Helvetica Neue, Arial | Títulos, números, KPIs, logotipo |
| Texto | SF Pro Text | -apple-system, **Inter**, Helvetica Neue, Arial | Corpo, botões, rótulos, inputs |
| Serifada | **Instrument Serif** (normal e itálico) | Iowan Old Style, Georgia | Palavra de destaque no título, citações, certificado |

- Carregar do Google Fonts: `Inter:wght@400;500;600;700;800` e `Instrument Serif:ital@0;1`.
- `font-feature-settings: "ss01", "cv11"` e `-webkit-font-smoothing: antialiased` no `body`.
- Números em tabelas, KPIs, contadores e datas usam `font-variant-numeric: tabular-nums`.
- Mobile: usar a fonte do sistema (SF no iOS, Inter empacotada no Android).

---

## 3. Paleta base

Cores cruas. **Não usar direto em componentes**; elas alimentam os tokens semânticos.

| Chave (`palette.*`) | Hex | Chave | Hex |
| --- | --- | --- | --- |
| `abyss` | `#010f12` | `deepWine` | `#4c0000` |
| `night` | `#122529` | `wine` | `#711610` |
| `navy` | `#002236` | `ember` | `#fe3e00` |
| `deepTeal` | `#00474d` | `coral` | `#ff7b50` |
| **`ocean` (marca)** | `#07486e` | `orange` | `#ff7e00` |
| `teal` | `#008582` | `amber` | `#ffaf61` |
| `sage` | `#6da8a7` | `apricot` | `#ffcd9c` |
| `mint` | `#c7ebea` | `blush` | `#ffcdbd` |
| `sky` | `#a9c8da` | `olive` | `#85b037` |
| `stone` | `#b5b8ad` | `lime` | `#b1e454` |
| `white` | `#ffffff` | `lightLime` | `#ddff9f` |

Neutros de apoio do tema light: `mist` `#eef0ea`, `chalk` `#f5f6f2`, `slate` `#4f5a58`, `gray` `#7c8581`. Apoio: `dawn` `#fff6e0`, `lightSky` `#e6f4f7`.

---

## 4. Cores semânticas

### Superfícies, texto e linhas

| Token (CSS) | Tailwind | Light | Dark | Uso |
| --- | --- | --- | --- | --- |
| `--bg` | `bg-bg` | `#eef0ea` | `#010f12` | Fundo da página |
| `--surface` | `bg-surface` | `#ffffff` | `#13292d` | Cards, modais, popovers |
| `--surface-2` | `bg-surface-2` | `#f5f6f2` | `#0c2024` | Inputs, botão secundário, áreas internas |
| `--surface-3` | `bg-surface-3` | `#eceee8` | `#1a3337` | Terceiro nível: trilhos, células de destaque em tabela, superfície elevada no dark |
| `--glass` | `bg-surface-glass` | `rgba(255,255,255,.72)` | `rgba(18,37,41,.72)` | Botões de ícone, topbar com blur |
| `--ink` | `text-ink` | `#010f12` | `#ffffff` | Texto principal |
| `--ink-muted` | `text-ink-muted` | `#4f5a58` | `#b5b8ad` | Texto secundário, rótulos |
| `--ink-soft` | `text-ink-soft` | `#7c8581` | `#8a948f` | Ícones, placeholders, metadados |
| `--line` | `border-line` | `rgba(1,15,18,.09)` | `rgba(255,255,255,.08)` | Divisórias, contorno de cards |
| `--line-strong` | `border-line-strong` | `rgba(1,15,18,.16)` | `rgba(255,255,255,.16)` | Contorno de inputs, hover |

### Marca e interação

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `--brand` | `#07486e` | `#a9c8da` | Botão primário, item ativo, toggles ligados |
| `--on-brand` | `#ffffff` | `#002236` | Texto sobre `--brand` |
| `--brand-text` | `#07486e` | `#a9c8da` | Links, ícone ativo, contadores |
| `--brand-soft` | `rgba(7,72,110,.08)` | `rgba(169,200,218,.1)` | Hover, seleção, fundo de pills |
| `--focus` | `#008582` | `#c7ebea` | Anel de foco (2px, offset 2px) |
| `--signal` | `#b1e454` | `#b1e454` | Ícone de sucesso no toast (o nome `--accent` fica reservado para o alias do shadcn) |
| `--positive` | `#3f7a12` | `#b1e454` | Variação positiva em KPIs |

### Status

Usados em chips, badges, linhas e validações. Sempre em par **texto + fundo** (`--success` + `--success-bg`). Tailwind: `text-success bg-success-bg`.

| Token | Significado | Texto (light / dark) | Fundo `-bg` (light / dark) |
| --- | --- | --- | --- |
| `--success` | Sucesso, confirmado, presente, integrado | `#3f7a12` / `#b1e454` | `rgba(177,228,84,.28)` / `rgba(177,228,84,.14)` |
| `--info` | Informativo, aceito, agendado | `#07486e` / `#a9c8da` | `rgba(169,200,218,.4)` / `rgba(169,200,218,.16)` |
| `--warning` | Atenção, pendente, aguardando aprovação | `#b4570b` / `#ffaf61` | `rgba(255,175,97,.24)` / `rgba(255,175,97,.14)` |
| `--danger` | Erro, recusado, urgente, excluir | `#711610` / `#ffcdbd` | `rgba(255,205,189,.5)` / `rgba(255,123,80,.16)` |

### Tons de categoria

Para avatares, etiquetas de ministério e gráficos categóricos. Iguais nos dois temas.

| Token | Fundo | Texto (`-ink`) |
| --- | --- | --- |
| `--tone-sky` | `#a9c8da` | `#002236` |
| `--tone-mint` | `#c7ebea` | `#00474d` |
| `--tone-apricot` | `#ffcd9c` | `#4c0000` |
| `--tone-blush` | `#ffcdbd` | `#711610` |
| `--tone-lime` | `#ddff9f` | `#122529` |
| `--tone-sage` | `#6da8a7` | `#010f12` |

Destaques de texto com fundo suave: `--highlight-apricot`, `--highlight-sky`, `--highlight-mint` (+ `-bg`).

### Gráficos

| Token | Light | Dark |
| --- | --- | --- |
| `--chart-1` | `#c7dfe9` | `#1d4152` |
| `--chart-2` | `#7fb0c9` | `#3f7896` |
| `--chart-3` | `#2f6f94` | `#7fb0c9` |
| `--chart-4` | `#07486e` | `#c7e3ef` |
| `--chart-warm` (contraste/alerta) | `#d9730d` | `#ffaf61` |

---

## 5. Tipografia

| Estilo | Família | Tamanho / altura | Peso | Tracking | Uso |
| --- | --- | --- | --- | --- | --- |
| `hero` | Display | 44 / 0.9 | 700 | -0.04em | Número grande nos cards de atenção |
| `h1` | Display | 30 / 34 | 700 | -0.03em | Título de página |
| `h1Accent` | Serif itálico | 33 / 34 | 400 | -0.01em | Palavra de destaque dentro do h1 (`<em>`), cor `--brand-text` |
| `kpi` | Display | 26 / 1 | 700 | -0.03em | Valores de KPI (tabular) |
| `title` | Display | 22 / 1 | 700 | -0.02em | Títulos de bloco, valores em resumo |
| `dialog` | Display | 19 / 24 | 600 | -0.01em | Título de modal |
| `h2` | Display | 17 / 22 | 600 | -0.01em | Título de seção / card |
| `lede` | Texto | 15 / 22 | 400 | — | Subtítulo da página, `--ink-muted` |
| `itemTitle` | Texto | 14.5 / 19 | 600 | — | Nome em linhas de lista |
| `body` | Texto | 14 / 20 | 400 | — | Texto corrido |
| `bodyStrong` | Texto | 14 / 18 | 600 | — | Destaques, itens de menu ativos |
| `input` | Texto | 14.5 / 1 | 400 | — | Campos de formulário |
| `bodySm` | Texto | 13 / 18 | 400 | — | Descrições secundárias |
| `button` | Texto | 13 / 1 | 600 | — | Botões, links de ação |
| `label` | Texto | 12.5 / 16 | 500 | — | Rótulos de campo, metadados |
| `caption` | Texto | 12 / 16 | 400 | — | Legendas, datas, contadores |
| `badge` | Texto | 11 / 1 | 600 | — | Badges e contadores em pill |
| `eyebrow` | Texto | 11.5 / 16 | 600 | 0.14em, MAIÚSC. | Sobretítulo acima do h1 |
| `overline` | Texto | 11 / 14 | 600 | 0.12em, MAIÚSC. | Grupos do menu, cabeçalhos de popover |
| `logo` | Display | 25 / 0.8 | 800 | -0.055em | Palavra "alva" ao lado do sol |

---

## 6. Espaçamento

Base de **4px**, mesma escala do Tailwind (`p-4` = 16px).

| Token | px | Uso típico |
| --- | --- | --- |
| `0.5` | 2 | Separação mínima entre segmentados |
| `1` | 4 | Ícone ↔ texto pequeno |
| `1.5` | 6 | Rótulo ↔ campo, gap de chips |
| `2` | 8 | Gap entre botões, KPIs |
| `2.5` | 10 | Padding de item de menu |
| `3` | 12 | Gap entre cards em grade, gap em linha |
| `3.5` | 14 | Padding horizontal de chips grandes |
| `4` | 16 | Gutter mobile, gap padrão entre blocos |
| `4.5` | 18 | Padding interno de card (mobile) |
| `5` | 20 | Padding de card, gap de seção |
| `5.5` | 22 | Padding superior da página |
| `6` | 24 | Padding de modal (desktop) |
| `8` | 32 | Separação entre seções grandes |
| `10` | 40 | — |
| `14` | 56 | Padding inferior da página |

---

## 7. Raios de borda

| Token | px | Uso |
| --- | --- | --- |
| `xs` | 6 | `kbd`, mini-etiquetas |
| `sm` | 10 | Itens de menu, linhas selecionáveis |
| `field` | 12 | Inputs e selects |
| `md` | 14 | Popovers, dias da semana, cards pequenos, seletor de igreja |
| `lg` | 20 | Cards (web) |
| `lgMobile` | 24 | Cards e sheets (mobile) |
| `dialog` | 22 | Modais a partir de 640px |
| `sheet` | 24 | Topo do bottom sheet (mobile / web < 640px) |
| `xl` | 32 | Blocos de destaque no mobile |
| `full` | 999 | Botões, pills, chips, toasts, segmentados, avatares |

---

## 8. Sombras e elevação

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `--shadow-card` | `0 1px 2px rgba(1,15,18,.04), 0 10px 30px rgba(1,15,18,.06)` | `inset 0 1px 0 rgba(255,255,255,.05), 0 14px 34px rgba(0,0,0,.3)` | Cards, item de menu ativo |
| `--shadow-pop` | `0 2px 6px rgba(1,15,18,.06), 0 24px 60px rgba(1,15,18,.16)` | `inset 0 1px 0 rgba(255,255,255,.06), 0 24px 60px rgba(0,0,0,.55)` | Popovers, modais, toasts, drawer |
| Scrim | `rgba(1,15,18,.32)` + `blur(3px)` | igual | Fundo de modal e paleta de comandos |
| Contorno | `inset 0 0 0 1px var(--line)` | igual | Bordas são `box-shadow inset`, não `border` |

Camadas (`z-index`): topbar 40 · popover 50 · véu do drawer 55 · drawer 60 · paleta 80 · modal 85 · toast 90.

---

## 9. Gradientes

| Nome | Valor | Onde |
| --- | --- | --- |
| **Ambiente** | `radial-gradient(900px 520px at 100% 0%, var(--ambient-1), transparent 70%), radial-gradient(760px 460px at 20% 0%, var(--ambient-2), transparent 72%)` | Fundo fixo de todas as telas (`body::before`). `--ambient-1`/`--ambient-2`: light `rgba(169,200,218,.38)` / `rgba(199,235,234,.34)`; dark `rgba(7,72,110,.45)` / `rgba(0,71,77,.32)` |
| Painel da marca | `linear-gradient(180deg, #07486e, #002236)` | Login, lado esquerdo (75% no desktop) |
| Brilho do painel | `radial-gradient(60% 90% at 50% 100%, rgba(199,235,234,.22), transparent 70%)` | Sobre o painel da marca |
| Amanhecer | `linear-gradient(180deg, rgba(255,246,224,.26), rgba(199,235,234,.10) 38%, transparent 60%)` | Topo do painel da marca |
| Disco do sol | `linear-gradient(180deg, var(--sun-1), var(--sun-2) 50%, var(--sun-3))` | Logo |
| Halo do sol | `radial-gradient(circle, rgba(199,235,234,.35), rgba(109,168,167,.1) 45%, transparent 70%)` | Splash (brilho suave, nunca forte) |
| **Céu de alvorada** | Fundo `radial-gradient(140% 70% at 50% 0%, var(--sky-2), var(--sky-1) 70%)` + três véus radiais desfocados (48px) + brilho de horizonte | Telas de acesso do app (boas-vindas, login, cadastro). Valores na tabela abaixo |
| **Título da marca** | Noite `linear-gradient(180deg, #ffffff 20%, #c7ebea 70%, #a9c8da)` · Dia `linear-gradient(180deg, #010f12 25%, #07486e)` | Palavra "alva" grande na tela de boas-vindas (recortada no texto) |
| Brilho do título | `linear-gradient(105deg, transparent 40%, rgba(255,255,255,.55) 50%, transparent 60%)` (Dia: `rgba(169,200,218,.65)`) | Passa sobre o título a cada 9s |
| **Borda de luz** | `conic-gradient(from var(--ang), rgba(199,235,234,.25), rgba(169,200,218,.9) 25%, rgba(199,235,234,.25) 50%, #ffd6aa 75%, rgba(199,235,234,.25))` como `border-box` de 1.5px | Botão principal das telas de acesso. Preenchimento Noite `#0b3a52 → #062a3d`, Dia `#0a5a85 → #07486e` |
| Rodapé "Alvorada" | Cena ilustrada (céu `#0a2a3d`, sol nascendo, morros em azuis suaves) com camada desfocada (18px) e véu `rgba(10,42,61,.35 → .08)` | Footer da landing, em painel arredondado |
| Cabeçalho do perfil | `linear-gradient(135deg, var(--brand-soft), var(--surface-2) 75%)` | Meu perfil |
| Card de destaque | `linear-gradient(160deg, var(--brand-soft), var(--surface) 70%)` | Cards hero |
| **Linha urgente** | `linear-gradient(90deg, color-mix(in srgb, var(--danger-bg) 70%, transparent), transparent 45%)` | Casos urgentes. **Substitui faixas laterais** |
| Linha ativa | `linear-gradient(90deg, var(--brand-soft), transparent 85%)` | Igreja ativa no seletor |
| Brilho de carregamento | `linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)` | Botão assíncrono |
| Fade de rolagem | `linear-gradient(to bottom, transparent, #000 10px, #000 calc(100% - 16px), transparent)` | `mask-image` em listas roláveis |
| Hachura | `repeating-linear-gradient(135deg, var(--line-strong) 0 1.5px, transparent 1.5px 5px)` | Só em dados: dias bloqueados e segmentos vazios. Nunca como decoração ou em peças de marca (footer, ilustrações) |
| Certificado | `linear-gradient(135deg, #e9dcc0, #f7f0df 40%, #e4d3b0)` | Moldura do certificado de apresentação |

**Céu de alvorada — valores por tema**

| Variável | Noite | Dia |
| --- | --- | --- |
| `--sky-1` / `--sky-2` | `#010f12` / `#03202e` | `#eef0ea` / `#e3edf1` |
| Véu 1 (oceano) | `rgba(7,72,110,.55)` | `rgba(169,200,218,.55)` |
| Véu 2 (teal / menta) | `rgba(0,133,130,.30)` | `rgba(199,235,234,.6)` |
| Véu 3 (céu) | `rgba(169,200,218,.16)` | `rgba(7,72,110,.10)` |
| Horizonte (quente) | `rgba(255,214,170,.16)` | `rgba(255,205,156,.28)` |

Sem partículas, faixas ou pontos em movimento: só o gradiente se move.

---

## 10. Motion

| Curva | Valor | Uso |
| --- | --- | --- |
| `standard` | `cubic-bezier(.2,.8,.2,1)` | Entradas, drawers, popovers, modais |
| `spring` | `cubic-bezier(.2,1.4,.4,1)` | Confirmação do botão, raios do sol, "pop" |
| `emphasized` | `cubic-bezier(.65,0,.35,1)` | Traços desenhados (horizonte do logo) |
| `progress` | `cubic-bezier(.25,.8,.25,1)` | Barra do botão assíncrono |

| Duração | ms | Uso |
| --- | --- | --- |
| `instant` | 120 | `:active` (scale .97) |
| `fast` | 150 | Hover, troca de cor |
| `base` | 200 | Popover |
| `medium` | 250 | Fades, toggles, toast saindo |
| `slow` | 320 | Drawer, sheet, modal |
| `pop` | 450 | Sucesso do botão |
| `entrance` | 700 | Entrada de blocos (`.rise`), escalonada a cada **70ms** |
| `splash` | 2000–3000 | Splash completa |
| `autoAdvance` | 6000 | Abas e carrosséis com avanço automático |
| `sheenLoop` | 9000 | Intervalo do brilho do título da marca |
| `glowSpin` | 14000 | Uma volta da borda de luz |
| `skyDrift` | 38000–52000 | Deriva dos véus do céu de alvorada (cada véu num tempo) |

**Padrões:**

- **Entrada de página:** blocos sobem 10px com fade, `700ms standard`, atraso de `n × 70ms`.
- **Modal:** desktop sobe 8px com `scale(.98)` → 1; mobile entra como sheet de baixo (24px). Scrim com fade de 220ms.
- **Toast:** pill escura (`--ink` sobre `--bg`), centralizado embaixo, entra subindo 10px com `scale(.97)` em 350ms.
- **Botão assíncrono (idêntico no web e no mobile):** `idle → loading` (barra de progresso preenchendo e brilho passando) `→ success` (fundo `--success`, ícone de check, pop com `spring` em 450ms) `→ idle`. Clique durante o loading é ignorado.
- **Splash:** o sol nasce (disco sobe 12px), os 5 raios aparecem um a um (90ms de intervalo, `spring`), o horizonte é desenhado e a splash termina com fade. Não há transição do sol até a tela seguinte. Brilho sempre suave.
- **Telas de acesso (app):** o céu de alvorada faz fade (600ms) e fica fixo entre boas-vindas, login e cadastro, sem reiniciar. Os véus derivam devagar (`skyDrift`, `ease-in-out`, alternando) e o horizonte respira em 9s.
- **Boas-vindas:** o subtítulo entra palavra a palavra (sobe 8px com desfoque de 4px, 900ms, 180ms entre palavras); os botões sobem 14px em 800ms com 100ms entre eles. O título é estático, com o brilho passando a cada 9s. O botão principal tem só a borda de luz girando (`glowSpin`, linear); sem halo externo e sem brilho atravessando.
- **Abas com avanço automático:** a aba ativa mostra uma barra de progresso de `autoAdvance` (6s, linear) e troca sozinha, sem exigir interação. O painel entra com fade e sobe 16px (`standard`).
- **Reduzir movimento:** com `prefers-reduced-motion`, todas as animações e transições são desligadas.

---

## 11. Logo

- **Marca:** sol nascendo (disco com gradiente vertical recortado pelo horizonte) + 5 raios em leque (-162°, -126°, -90°, -54°, -18°) + linha do horizonte. `viewBox="0 0 48 32"`, traço 2.6px com pontas arredondadas.
- **Cores:** disco `--sun-1 → --sun-2 → --sun-3`, raios `--sun-ray`, horizonte `currentColor`.

| | Light | Dark |
| --- | --- | --- |
| `--sun-1` | `#c7ebea` | `#e6f4f7` |
| `--sun-2` | `#6da8a7` | `#a9c8da` |
| `--sun-3` | `#07486e` | `#6da8a7` |
| `--sun-ray` | `#07486e` | `#a9c8da` |

- **Logotipo:** "alva" em minúsculas, Display 800, tracking -0.055em, alinhado pela base ao lado do sol.

| Variante | Onde |
| --- | --- |
| Completo (sol + "alva") | Menu, topbar, login do web, landing |
| Só o sol | Splash, favicon (`site/favicon.svg`), ícones |
| Só a palavra | Tela de boas-vindas do app: 76px, tracking -0.06em, gradiente "Título da marca" |

- **Sobre fundo escuro de marca** (rodapé da landing), o horizonte e a palavra ficam brancos e os raios em `#a9c8da`. No resto, o horizonte segue `currentColor` (preto no Dia).

---

## 12. Ícones

- Estilo Lucide: traço 2px (1.75px em 16px), pontas e junções arredondadas, `viewBox 0 0 24 24`, `fill: none`, `stroke: currentColor`.
- Tamanhos: 16 (inline, chips), 18 (botões, menu), 20 (topbar), 24 (tab bar mobile).
- Cor padrão `--ink-soft`; ativo `--brand-text`; destrutivo no hover `--danger`.
- Web: `lucide-react`. Mobile: `lucide-react-native`. Ícones próprios (ex.: chupeta de Apresentações) seguem o mesmo traço.

---

## 13. Layout e breakpoints

| Breakpoint | px | Mudança |
| --- | --- | --- |
| `sm` | 640 | Modais centralizados (até aqui são sheets), grades de formulário com 2 colunas |
| `md` | 768 | — |
| `lg` | 1024 | Menu lateral fixo (248px), topbar some; tabelas viram grade com colunas |
| `xl` | 1280 | — |

- Conteúdo com no máximo **1240px**, padding da página `22px 16px 56px` (mobile first).
- Menu lateral: 248px no desktop; drawer de 284px no mobile. **O menu nunca rola:** em telas baixas (altura ≤ 760px) entra uma versão compacta (itens com padding menor, subtítulos ocultos).
- Alturas de controle: 32 (pequeno), **36 (botão)**, 38 (botão de ícone), **42 (input)**.
- Avatares: 24 · 30 · 36 · 44, sempre circulares com tom de categoria. Nunca blocos quadrados coloridos com sigla.
- Modais: 440 (sm), 480 (padrão), 720 (lg).

---

## 14. Componentes

| Componente | Especificação |
| --- | --- |
| **Card** | `--surface`, raio `lg` (20 web / 24 mobile), `--shadow-card`, padding 18–20 |
| **Botão primário** | Altura 36, padding 0 15, raio `full`, `--brand` / `--on-brand`, `button` 13/600. Hover `brightness(1.08)`, active `scale(.97)` |
| **Botão secundário** | `--surface-2`, contorno `inset 1px --line`; hover com contorno e texto em `--brand-text` |
| **Botão destrutivo** | Texto `--danger` sobre `--danger-bg`. Sempre abre modal de confirmação |
| **Botão de ícone** | 38×38 circular, `--glass` + contorno `--line` |
| **Link de ação** | `--brand-text` 13/600, seta que anda 3px no hover |
| **Input / select** | Altura 42, raio 12, `--surface-2`, contorno `inset 1px --line-strong`. Foco: `inset 1.5px --brand-text` + halo `0 0 0 4px --brand-soft`. Erro: `inset 1.5px --danger` + mensagem |
| **Rótulo de campo** | `label` 12.5/500, `--ink-muted`, gap 6 até o campo |
| **Pill / contador** | `badge`, `--brand-text` sobre `--brand-soft`, raio `full`, padding 5×9, tabular |
| **Chip** | 12/600, `--surface-2` + contorno, padding 6×10. Chip de status: cor + fundo do status e ponto de 6px |
| **Segmentado** | Trilho `--surface-2` com contorno, padding 3; opção ativa em `--surface` com sombra leve |
| **Abas de detalhe** | Texto 14/500, ativa 600 em `--ink`; contador em pill; rolam na horizontal no mobile |
| **Toggle** | 40×24, trilho `--line-strong` → `--brand` ligado, bolinha branca de 18px |
| **Modal** | Mobile: sheet com raio 24 no topo e alça de 36×4. Desktop: raio 22, padding 24. Título `dialog`, descrição 13.5/19 `--ink-muted`. Fluxos longos são divididos em passos, nunca um modal alto |
| **Popover / menu** | `--surface`, raio 14, `--shadow-pop`, padding 6. Itens com raio 9 e hover `--brand-soft` |
| **Toast** | Pill `--ink` / `--bg`, ícone `--signal`, ação em botão translúcido |
| **Item de menu** | 14/500 `--ink-muted`, raio 10. Ativo: `--surface` + `--shadow-card`, ícone `--brand-text`. Grupos em acordeão com `overline` |
| **KPI** | Rótulo `label` `--ink-muted`, valor `kpi`, variação `caption` (`--positive` se positiva) |
| **Lista** | Busca dentro do container da lista; linhas sem faixas laterais; urgência com o gradiente de linha urgente |
| **Detalhe** | Breadcrumbs com botão **Voltar** ao lado |
| **Estado vazio** | Ícone em círculo `--brand-soft`, título `h2`, texto `bodySm`, uma ação |
| **Select** | Sempre o select próprio, nunca o nativo do navegador (o nativo fica oculto para acessibilidade e formulários). Botão com papel de combobox: em barra de filtros é pill de 40px em `--surface-2`; em formulário segue o input (44px, raio 12). Abre um popover (raio 16, `--shadow-pop`, opção ativa em `--brand-text` com check); abaixo de 640px abre como sheet |
| **Campo de código (OTP)** | Seis caixas, uma por dígito: 58px de altura, raio 14, Display 24/600 tabular. Foco com contorno `--brand` + halo `--brand-soft`; dígito preenchido faz um pop (`spring`); código errado treme a linha. Colar preenche tudo |
| **Paginação** | Rodapé da tabela, separado por linha: "Mostrando **1–10** de **48**" à esquerda; botões redondos de 34px à direita, página atual em `--brand` / `--on-brand`, reticências entre faixas. Toda tabela principal é paginada |
| **Paleta de comandos** | Cmd/Ctrl+K. Caixa de até 580px, raio 20, busca no topo, resultados agrupados, navegação por setas e Enter; camada `palette` |
| **Tooltip de gráfico** | Segue o ponto mais próximo do cursor ou do toque; mês, valor tabular e legenda curta. Rótulos de eixo nunca se sobrepõem (pular rótulos quando faltar espaço) |
| **Chip de filtro ativo** | Quando um filtro reduz a tela (ex.: "Ver só o Alva"), aparece um chip com o filtro e um × para voltar; nunca deixar a pessoa sem saída. Pode levar a marca ou mascote do produto |
| **Botão de vidro** | Telas de acesso do app: altura 54, raio `full`, 16/600, fundo translúcido com `blur(18px)`, contorno claro de 1px. Todos os botões da pilha têm o mesmo tamanho |
| **Passos de cadastro** | Barra de progresso no topo com o botão **Voltar** ao lado; não há botão "Etapa anterior" no rodapé. No desktop, lista de etapas com ponto de 30px e linha que preenche em `--brand` |
| **Abas com avanço automático** | Lista à esquerda (título + texto que abre na aba ativa, barra vertical de progresso de 3px); palco à direita com o fundo ambiente. No mobile o palco vem primeiro |

---

## 15. Regras visuais fixas

1. **Proibido** faixas finas na borda esquerda de cards ou linhas. Para destacar, usar gradiente de fundo, chip de status ou ícone.
2. Nada de blocos coloridos com siglas (nem em igrejas, nem em pessoas). Avatares são circulares; igrejas aparecem só com nome e local.
3. Toda exclusão abre modal de confirmação.
4. A busca fica dentro do container da lista, não solta no topo da página.
5. Telas de detalhe têm botão **Voltar** ao lado dos breadcrumbs.
6. Cards de evento são minimalistas: data discreta em texto, sem blocos grandes de calendário.
7. Brilhos e glows sempre suaves.
8. A animação do botão assíncrono é idêntica no web e no mobile.
9. Bordas são `box-shadow inset`, para não alterar o tamanho dos elementos.
10. Nenhum hex direto em componente: só tokens semânticos.
11. O menu lateral nunca rola (ver seção 13).
12. Nada de avisos de protótipo ou de "ambiente de demonstração" nas telas: só o que vai para o produto final.
13. Não usar `backdrop-filter` em container com cantos arredondados sobre fundo de outra cor: o desfoque pega o fundo claro e aparece uma borda nos cantos.
14. Botões no mesmo grupo têm o mesmo tamanho e estilo, salvo um motivo claro.
15. Hachura só representa dado (dia bloqueado, segmento vazio), nunca decoração.

---

## 16. Landing e Painel de Assinaturas

Usam os mesmos tokens, fontes, raios e motion. O que muda:

**Landing (`site/`)**

- Só tema Dia, com `--bg` branco (`#ffffff`) para uma página de cor única; o `--mist` aparece nos palcos e blocos.
- Botões assíncronos com o mesmo padrão do web e do mobile.
- Recursos em abas com avanço automático (seção 14).
- Rodapé "Alvorada": painel arredondado (raio 24–40) com a cena como fundo e conteúdo flutuando em véu suave; marca à esquerda; colunas **Sistema** e **Suporte** à direita (Privacidade e Termos ficam em Suporte); linha final com "© 2026 Alva · Instituto CIAON" e "voltar ao topo". Sem hachura.
- Cadastro em passos (seção 14).

**Painel de Assinaturas (`subscriptions/`)**

- Administra vários produtos, então a marca da plataforma é **neutra**: selo quadrado com raio 30% em `--ink` / `--bg`, ícone de ciclo, nome "Assinaturas". O sol do Alva aparece só como produto.
- **Selo de produto:** logo de cada produto sobre fundo branco, contorno `--line`, nos tamanhos `sm` 28 · `md` 40 · `lg` 64. O mascote do produto pode aparecer em chips de filtro.
- **Seletor de produto** numa linha só, no topo do menu.
- Login 75/25 com o painel da marca listando os produtos; no mobile, o formulário vem num container como o do web.
- Tabelas sempre paginadas, select próprio, Cmd+K e OTP de seis caixas (seção 14).

---

## 17. Diferenças entre os protótipos a unificar

O protótipo mobile foi feito primeiro, só no tema dark, e tem alguns valores diferentes do web. O `tokens.ts` adota os valores do web como fonte única:

| Token | Mobile (protótipo) | Adotado |
| --- | --- | --- |
| `--surface` (dark) | `#122529` | `#13292d` |
| `--line` (dark) | `rgba(255,255,255,.12)` | `rgba(255,255,255,.08)` |
| `--line-strong` (dark) | `#7d8f90` | `rgba(255,255,255,.16)` |
| Raio dos cards | 24 | `radius.lg` 20 no web, `radius.lgMobile` 24 no mobile |
| Status | `--success-fill` / `--success-ink` etc. | `--success` / `--success-bg` (e `info`, `warning`, `danger`) |
| Nomes nos protótipos | `--st-int`, `--a1`, `--seq1`, `--t-damasco`, `data-theme="noite"`, nomes em português | `--success`, `--ambient-1`, `--chart-1`, `--highlight-apricot`, `data-theme="dark"`, nomes em inglês |

| `--surface-raised` (mobile, dark) | `#1b3439` | `--surface-3` `#1a3337` |
| Status no Painel de Assinaturas | erro `#8a1f16`, atenção `#9a4d0c`, fundos com 8–9% de opacidade; dark erro `#ffb4a1` | `--danger`, `--warning` e `-bg` desta referência |
| Cores de série no Painel de Assinaturas | `--c1` a `--c8` (gráficos com mais de quatro séries) | `--chart-1` a `--chart-4` + `--chart-warm`; definir uma escala categórica oficial se outro produto precisar de mais séries |
| `--bg` na landing | `#ffffff` | Exceção mantida (seção 16) |
