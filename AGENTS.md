# Alva Mockups — regras para agentes

Protótipos navegáveis do Alva (web, mobile, site, subscriptions). São HTML/CSS/JS puro,
servidos por Vite. **Não existe build step de aplicação**: o `npm run dev` apenas serve os
arquivos e recarrega a página.

Referência canônica do visual: [`design-system/design-system.md`](design-system/design-system.md)
e [`design-system/tokens.ts`](design-system/tokens.ts). **Toda alteração de UI precisa
respeitar os dois.** Em caso de conflito entre eles e o protótipo, vale o `design-system.md`;
entre o protótipo e o DS, o DS manda.

---

## 1. Regra de ouro

**Nenhuma decisão visual é inventada.** Cor, tipografia, espaçamento, raio, sombra e animação
saem do design system. Se a tela pede algo que o DS não cobre, o certo é **adicionar ao DS
primeiro** (e só então usar), não criar uma exceção local.

Proibido em qualquer tela:

1. Hex direto em componente. Só tokens semânticos (`var(--brand)`, `var(--ink-muted)`, …).
   Os poucos hex que existam no CSS são de gradiente/illustration — não espalhar.
2. Faixa fina na borda esquerda de card ou linha. Para destacar: gradiente de fundo,
   chip de status ou ícone.
3. Bloco colorido com sigla. Avatares são **circulares** com tom de categoria; igrejas
   aparecem só com nome e local.
4. Hachura decorativa. Hachura (`repeating-linear-gradient`) só representa dado:
   dia bloqueado, segmento vazio.
5. Aviso de protótipo, "ambiente de demonstração", "em breve" na interface. As telas
   mostram o produto final.
6. Botão destrutivo sem modal de confirmação.
7. Busca solta no topo da página. A busca fica **dentro do container da lista**.
8. `backdrop-filter` em container com cantos arredondados sobre fundo de outra cor
   (o desfoque pega o fundo claro e cria borda nos cantos).

---

## 2. Tokens — o que existe de fato

O `design-system.md` descreve o **estado-alvo**. O protótipo em `web/style.css` ainda usa
alguns nomes antigos. **Use os nomes que existem no CSS atual**, para não quebrar.

### Superfícies, texto, linhas (existem nos dois temas)
`--bg` · `--surface` · `--surface-2` · `--glass` · `--ink` · `--ink-muted` · `--ink-soft` ·
`--line` · `--line-strong`

Não existe `--surface-3` no protótipo. Se precisar de um terceiro nível de superfície,
**crie a variável** (`--surface-3`) em `:root` e `:root[data-theme="noite"]` seguindo os
valores do DS (`#eceee8` / `#1a3337`) — não use `rgba()` avulso.

### Marca
`--brand` · `--on-brand` · `--brand-text` · `--brand-soft` · `--focus`

### Status (nome atual do protótipo → nome canônico do DS)
| Protótipo (use) | DS (não existe ainda) | Significado |
|---|---|---|
| `--st-int` / `--st-int-bg` | `--success` / `--success-bg` | sucesso, confirmado, presente, integrado |
| `--st-ace` / `--st-ace-bg` | `--info` / `--info-bg` | informativo, aceito, agendado |
| `--st-sol` / `--st-sol-bg` | `--warning` / `--warning-bg` | atenção, pendente, aguardando aprovação |
| `--st-rec` / `--st-rec-bg` | `--danger` / `--danger-bg` | erro, recusado, urgente, excluir |

Status é **sempre par texto + fundo**. Nunca status só na cor.

### Tons de categoria (avatares, ministérios, gráficos)
`--tone-ceu` · `--tone-menta` · `--tone-damasco` · `--tone-rosado` · `--tone-lima` ·
`--tone-salvia` — cada um com o par `--tone-<nome>-ink` para o texto.
Uso: `background:var(--tone-<nome>);color:var(--tone-<nome>-ink)`.

### Gráficos / sequencial
`--seq1` · `--seq2` · `--seq3` · `--seq4` · `--warm` (contraste/alerta)

### Ambiente e outros
`--a1` / `--a2` (manchas do gradiente de fundo) · `--accent` (verde sinal, ex.: ícone de
sucesso no toast) · `--ok` (variação positiva em KPI) · `--sun1/2/3` + `--sunray` (logo)

### Raios
`--r-sm: 10px` (declarado; o CSS usa `10px` literal em 54 pontos) · `--r-md: 14px` ·
`--r-lg: 20px`

Valores do DS que **não** têm variável no CSS: 6 (xs), 12 (field), 22 (dialog),
24 (sheet/mobile), 32 (xl), 999 (full). Ao precisar de um deles, **crie a variável**
com o nome canônico (`--r-xs`, `--r-field`, `--r-dialog`, `--r-sheet`, `--r-xl`, `--r-full`)
e aplique. Não introduza valores soltos sem variável.

### Paleta crua — só para alimentar tokens
`#010f12` `#122529` `#002236` `#00474d` `#07486e` `#008582` `#6da8a7` `#c7ebea` `#a9c8da`
`#b5b8ad` `#b1e454` `#ffcd9c` `#ffcdbd` `#ffaf61` `#711610` `#b4570b` `#d9730d` `#eef0ea`
`#f5f6f2` `#4f5a58` `#7c8581` `#fff6e0` `#e6f4f7`

Nunca usar direto em componente.

---

## 3. Tipografia

Fontes: `--font-display` (títulos, números, KPIs, logo) · `--font-text` (corpo, botões,
inputs) · `--font-serif` (palavra de destaque, citações, estado vazio).

Escala do DS (tamanho/linha · peso · tracking):

| Papel | Valor | Onde |
|---|---|---|
| `hero` | 44/0.9 · 700 · -.04em | número grande nos cards de atenção |
| `h1` | 30/34 · 700 · -.03em | título de página |
| `h1Accent` | 33/34 · 400 itálico · -.01em | `<em>` dentro do h1, cor `--brand-text` |
| `kpi` | 26/1 · 700 · -.03em | valor de KPI (tabular) |
| `title` | 22/1 · 700 · -.02em | título de bloco |
| `dialog` | 19/24 · 600 · -.01em | título de modal |
| `h2` | 17/22 · 600 · -.01em | título de seção / card |
| `lede` | 15/22 · 400 | subtítulo de página |
| `itemTitle` | 14.5/19 · 600 | nome em linha de lista |
| `body` | 14/20 · 400 | texto corrido |
| `bodyStrong` | 14/18 · 600 | item de menu ativo |
| `input` | 14.5/1 · 400 | campo de formulário |
| `bodySm` | 13/18 · 400 | descrição secundária |
| `button` | 13/1 · 600 | botões e links de ação |
| `label` | 12.5/16 · 500 | rótulo de campo |
| `caption` | 12/16 · 400 | legenda, data, contador |
| `badge` | 11/1 · 600 | badge e contador em pill |
| `eyebrow` | 11.5/16 · 600 · .14em MAIÚSC | sobretítulo acima do h1 (`.eb`) |
| `overline` | 11/14 · 600 · .12em MAIÚSC | grupo de menu, cabeçalho de popover |
| `logo` | 25/0.8 · 800 · -.055em | "alva" ao lado do sol |

Números em tabela, KPI, contador e data: `font-variant-numeric: tabular-nums`.

---

## 4. Espaçamento, raio, elevação

Espaçamento: base **4px**, escala Tailwind (`p-4` = 16px).
2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 32 · 40 · 56

Controle: 32 (pequeno) · **36 (botão)** · 38 (botão de ícone) · **42 (input)** · 58 (OTP).
Avatares: 24 · 30 · 36 · 44, circulares.
Modal: 440 (sm) · 480 (padrão) · 720 (lg).
Conteúdo: max **1240px**, padding da página `22px 16px 56px`.
Menu lateral: 248px desktop, drawer 284px mobile. **O menu nunca rola.**

Elevação: `--shadow-card` (cards, item de menu ativo) · `--shadow-pop` (popover, modal,
toast, drawer). Scrim: `rgba(1,15,18,.32)` + `blur(3px)`.
Borda é **`box-shadow: inset`**, nunca `border` (para não alterar o tamanho do elemento).

Camadas: topbar 40 · popover 50 · véu do drawer 55 · drawer 60 · paleta 80 · modal 85 · toast 90.

---

## 5. Movimento

| Curva | Valor | Uso |
|---|---|---|
| standard | `cubic-bezier(.2,.8,.2,1)` | entradas, drawers, popovers, modais |
| spring | `cubic-bezier(.2,1.4,.4,1)` | confirmação de botão, raios do sol, "pop" |
| emphasized | `cubic-bezier(.65,0,.35,1)` | traços desenhados (horizonte do logo) |
| progress | `cubic-bezier(.25,.8,.25,1)` | barra do botão assíncrono |

Duração: `instant` 120 (`:active` scale .97) · `fast` 150 (hover) · `base` 200 (popover) ·
`medium` 250 (fades, toast) · `slow` 320 (drawer, modal) · `pop` 450 (sucesso do botão) ·
`entrance` 700 (`.rise`, escalonado **70ms** por bloco) · `autoAdvance` 6000.

Padrões que já existem no código e devem ser reaproveitados, não reinventados:

- **Entrada de página:** bloco com `.rise` e `style="--d:N"` → sobe 10px com fade, 700ms
  standard, atraso `N × 70ms`.
- **Botão assíncrono:** `busy(b, ms, label, fn)` de `core-ui.js` já faz o ciclo
  `idle → loading → success → idle` com barra de progresso, brilho e pop `spring` 450ms.
  **Nunca implemente isso à mão** — chame `busy()`.
- **Toast:** `toast(msg, undo?)` de `core-ui.js`. Pill escura, entra subindo 10px.
- **Popover / menu:** classe `.pop` + `.open`. Fechar com `closePops()`.
- **Modal:** usar o padrão já existente na tela (`.dlg` / `.dlgw` em `style.css`).
- **Ícone que "pop":** `.ax-pop` e afins já existem — reaproveitar.
- **`prefers-reduced-motion`:** toda animação nova precisa respeitar a media query
  `reduce` (o CSS já tem blocos para vários componentes; incluir o novo).

---

## 6. Componentes (fazer igual, não inventar)

**Card** `--surface`, raio `--r-lg`, `--shadow-card`, padding 18–20.
**Botão primário** altura 36, padding 0 15, raio `999px`, `--brand`/`--on-brand`, `13/600`;
hover `brightness(1.08)`; active `scale(.97)`. → `.btn.pri`
**Botão secundário** `--surface-2` + contorno `inset 1px --line`; hover contorno e texto
`--brand-text`. → `.btn.sec`
**Botão destrutivo** texto `--danger` sobre `--danger-bg` + modal de confirmação. → `.btn.dang`
**Botão de ícone** 38×38 circular, `--glass` + contorno `--line`. → `.ibtn`
**Link de ação** `--brand-text` `13/600`, seta anda 3px no hover. → `.lnk`
**Input / select** altura 42, raio 12, `--surface-2`, contorno `inset 1px --line-strong`;
foco `inset 1.5px --brand-text` + halo `0 0 0 4px --brand-soft`; erro `inset 1.5px --danger`
+ mensagem. → `.fld`
**Rótulo de campo** `12.5/500`, `--ink-muted`, gap 6. → `.fl` (fora de `.funnel`, onde `.fl` tem outro papel)
**Pill / contador** `--brand-text` sobre `--brand-soft`, raio `999px`, padding 5×9, tabular. → `.pill`
**Chip** `12/600`, `--surface-2` + contorno, padding 6×10. Chip de status: cor + fundo + ponto 6px. → `.chip`
**Segmentado** trilho `--surface-2` com contorno, padding 3; ativa em `--surface` com sombra. → `.seg` / `.segc`
**Toggle** 40×24, trilho `--line-strong` → `--brand` ligado, bolinha branca 18px. → `.tog`
**Popover / menu** `--surface`, raio 14, `--shadow-pop`, padding 6, itens raio 9, hover `--brand-soft`. → `.pop` / `.pi`
**Modal** mobile: sheet raio 24 + alça 36×4. Desktop: raio 22, padding 24. Título `dialog`,
descrição `13.5/19 --ink-muted`. Fluxo longo = **passos**, nunca modal alto.
**Item de menu** `14/500 --ink-muted`, raio 10. Ativo: `--surface` + `--shadow-card`, ícone
`--brand-text`. Grupos em acordeão com `overline`. → `.ni`
**KPI** rótulo `label --ink-muted`, valor `kpi`, variação `caption` (`--ok` se positiva).
**Lista** busca dentro do container; linhas sem faixa lateral; urgência com gradiente de
linha urgente `linear-gradient(90deg, color-mix(in srgb, var(--st-rec-bg) 70%, transparent), transparent 45%)`.
**Detalhe** breadcrumbs com botão **Voltar** ao lado (o `addCrumbBack()` já injeta
automaticamente quando a tela usa `.crumb` + `.lnk.back`).
**Estado vazio** ícone em círculo `--brand-soft`, título `h2`, texto `bodySm`, uma ação. → `.mempty`
**Select** sempre o select próprio (o nativo fica oculto), nunca o do navegador. Abre popover
(raio 16, `--shadow-pop`, ativa em `--brand-text` com check); abaixo de 640px abre como sheet.
**Paginação** rodapé da tabela separado por linha: "Mostrando **1–10** de **48**" à esquerda;
botões redondos à direita (`.mpg-n` 30px, `.ibtn.sm` 30px), atual em `--brand`/`--on-brand`,
reticências entre faixas (`.mpg-e`).
**Paleta de comandos** Cmd/Ctrl+K. Caixa até 580px, raio 20, busca no topo, resultados
agrupados, navegação por setas e Enter. (Já implementada em `core-ui.js`.)
**Ícones** estilo Lucide: `viewBox 0 0 24 24`, `fill:none`, `stroke:currentColor`, traço
1.75px em 16px e 2px em 18px+, pontas e junções arredondadas. Tamanhos 16 · 18 · 20 · 24.
Use o helper `ic(nome, tamanho, largura)` e o dicionário `I` em `core.js`.

---

## 7. Estrutura do código

`web/main.js` é **manifesto**: lista de `//#include ./arquivo.js` na ordem de carga + `render()`.
O plugin `vite-include.js` inlina tudo num escopo único. **Não há `import`/`export`.**

Ordem do manifesto importa para o que executa ao carregar (`const` de dados, `Object.assign(A,…)`,
patches). Corpo de função é resolvido na chamada.

```
core.js              ícones, helpers, S, NAV, sidebar, render()   ← só mexa em NAV/roteamento
core-ui.js           botões assíncronos (busy), padrão de lista, toast, paleta de comandos
core-actions.js      dispatcher A e eventos da paleta
screens-<area>.js    uma tela por arquivo
style.css            todo o CSS do web
```

Regras:

- **Edite o arquivo dono da tela.** Para mudar uma tela, edite `screens-<area>.js` e o CSS
  correspondente em `style.css`. Não edite `core.js` a não ser para `NAV` ou o roteamento
  do `render()`.
- **Tela nova:** crie `screens-<nome>.js`, inclua a linha em `main.js` (antes dos
  `screens-ext-*` se não for um patch) e registre a rota em `NAV` + `render()`.
- `screens-ext-*.js` são camadas de ajuste sobre telas anteriores. **Ao mexer numa tela,
  confira se algum `ext` sobrescreve a função dela** — o patch posterior vence.
- Cada `screens-*.js` expõe funções que retornam HTML inline e, quando precisa, um
  `*After()` que faz o bind dos eventos (chamado no fim do `render()`).
- **Padrão de lista:** `lstd()` (em `core-ui.js`) injeta busca + contador no container da
  lista. Registrar a tela em `LSTD` (`core-ui.js:16`) para ter busca e filtro.
- **Ações:** `data-a="nome"` + `data-v="valor"`; o handler vive no objeto `A`
  (`core-actions.js` ou no arquivo da tela). Não use `onclick` inline para lógica nova.
- **Ícones:** adicionar ao dicionário `I` em `core.js` (Lucide, `viewBox 0 0 24 24`).

---

## 8. Como verificar

```bash
# subir (o protótipo roda em http://localhost:5174/web/ neste ambiente)
cd C:\data\dev\mevam\alva\alva-mockups
npm run dev
```

Não há lint nem teste automatizado. **A verificação é visual.** Fluxo esperado de uma
alteração de UI:

1. Editar o arquivo da tela e o CSS.
2. Recarregar e **tirar screenshot** da tela nos dois temas (Dia e Noite) e em, no mínimo,
   1440×900 e 390×844 (mobile).
3. Conferir: hierarquia, respiro, contraste, alinhamento, estados (vazio, carregando,
   erro, desabilitado), foco visível, e que nada quebrou nos outros temas.
4. Conferir o console do browser — erro de JS é falha, mesmo que a tela "pareça certo".

Existe um helper de screenshot no repo:

```bash
node tools/screenshot.mjs <areaId> <nome> [w] [h] [light|dark] [full]
# ex.: node tools/screenshot.mjs membros membros-dark 1440 900 dark
```

Ele faz login demo, navega para a área pedida (o `areaId` é o id do `NAV`), salva em
`tools/shots/<nome>.png` e imprime os erros de console, se houver.

**Toda entrega de UI vem com o screenshot conferido nos dois temas.** Se não der para
entregar, avisar o que ficou sem verificação.

---

## 9. Checklist antes de entregar

- [ ] Só tokens semânticos; nenhum hex novo em componente
- [ ] Nenhuma faixa lateral fina; nenhum bloco de sigla; nenhuma hachura decorativa
- [ ] Tipografia na escala do DS; números com `tabular-nums`
- [ ] Espaçamento múltiplo de 4; raio de um token existente
- [ ] Borda com `box-shadow: inset`, não `border`
- [ ] Transição com curva e duração do DS; `prefers-reduced-motion` respeitado
- [ ] Entrada de bloco com `.rise` + `--d`
- [ ] Botão assíncrono usando `busy()`, não reimplementado
- [ ] Busca dentro do container da lista
- [ ] Exclusão com modal de confirmação
- [ ] Estados de vazio, carregando, erro e desabilitado cobertos
- [ ] Ícone Lucide, no dicionário `I`
- [ ] Funciona nos dois temas (Dia e Noite)
- [ ] Funciona em 390px e 1440px
- [ ] Sem erro no console
- [ ] Screenshot conferido nos dois temas
