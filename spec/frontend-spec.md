# Alva — Especificação de Frontend

Versão viva: https://claude.ai/code/artifact/972b6370-a924-4656-ab04-08a5f2e1a3c2 · atualizado em 2026-10-02

## Visão geral e princípios

O Alva tem dois fronts TypeScript, cada um no seu repositório e servidos pelo mesmo backend (alva-api): **Alva Web** (painel de gestão, Next.js) e **Alva Mobile** (app do membro, Expo), com design system, tipos, regras e camada de dados compartilhados por pacotes privados versionados. Esta especificação substitui a ideia anterior de Angular no painel web.

**Convenção de idioma:** todo código é escrito em inglês: variáveis, funções, hooks, tipos, tokens, rotas, query keys, permissões, nomes de arquivos, branches e commits. Os textos que o usuário vê ficam em pt-BR, no pacote de i18n. Esta especificação e os comentários de documentação podem ficar em português.

**Escopo inicial:** as funcionalidades já prototipadas nos dois artifacts (Alva Web e Alva Mobile), mapeadas na seção "Mapa de funcionalidades".

**Princípios que guiam todas as decisões:**

1. **O servidor é a fonte da verdade.** O cliente guarda cópias em cache; nunca uma segunda verdade.
2. **Real-time invalida ou corrige o cache; não é um estado paralelo.** Um evento recebido sempre termina dentro do cache de dados do servidor.
3. **Toda escrita é idempotente e reversível no cliente.** Ações otimistas têm rollback e nunca deixam a tela num estado impossível.
4. **Falha de uma área não derruba o app.** Cada rota e cada widget tem seu limite de erro e seu estado de vazio, carregando e erro.
5. **Mobile primeiro, também no painel.** Admins usam o painel no celular; toda tela web funciona a partir de 360px.
6. **Mesma identidade nas duas plataformas.** Tokens únicos; componentes com a mesma API e o mesmo comportamento, inclusive a animação dos botões assíncronos.

**Metas de robustez (medidas em produção):**

| Meta | Alvo |
| --- | --- |
| Sessões sem crash (mobile) | ≥ 99,8% |
| Erros JS não tratados (web) | < 0,1% das sessões |
| Tempo até um evento real-time aparecer na tela | p95 < 1,5 s |
| Recuperação após reconexão (dados conferidos) | < 3 s |
| Interação no web (INP) | p75 < 200 ms |
| Abertura a frio do app (até a primeira tela útil) | < 2,5 s em aparelho médio |

## Stack e arquitetura dos repositórios

O Alva tem quatro repositórios privados. Tudo que web e mobile compartilham (tema, contratos, regras de interface, camada de dados) mora num repositório próprio, o **alva-kit**, e chega aos apps como pacotes versionados no GitHub Packages. Os apps ficam só com telas, rotas, componentes visuais e adaptadores de plataforma.

| Repositório | Papel | Publica | Consome |
| --- | --- | --- | --- |
| `alva-api` | Backend (outra linguagem). Dono da verdade dos dados e das regras. Mantém `openapi.yaml`, `asyncapi.yaml` e as fixtures de regras | A especificação dos contratos, a cada release | — |
| `alva-kit` | Workspace pnpm com os pacotes compartilhados | `@alva/theme`, `@alva/contracts`, `@alva/core`, `@alva/config` | A especificação do `alva-api` |
| `alva-web` | Portal admin em Next.js | — | Os quatro pacotes |
| `alva-app` | App mobile em Expo + React Native | — | Os quatro pacotes |

Recomenda-se uma organização "alva" no GitHub com os quatro repositórios, para que o escopo `@alva/*` seja válido no GitHub Packages.

**Dependências entre pacotes:** `@alva/theme` e `@alva/contracts` não dependem de nada do Alva nem de React. `@alva/core` depende de `@alva/contracts`. Os apps dependem dos quatro. O backend não depende de nenhum: ele só fornece a especificação.

**Estrutura do alva-kit:**

```
alva-kit/
  packages/
    theme/         → @alva/theme       visual: tokens, CSS, preset Tailwind, helpers nativos, marca
    contracts/     → @alva/contracts   gerado da especificação do alva-api (nunca editado à mão)
      spec/          openapi.yaml + asyncapi.yaml + fixtures/ (cópias sincronizadas)
    core/          → @alva/core        regras de interface, cache, real-time, estado, hooks
    config/        → @alva/config      eslint, tsconfig, prettier compartilhados
  apps/
    playground/      Storybook do tema e dos hooks com dados simulados
  .changeset/
  .github/workflows/  ci.yml, release.yml, sync-contracts.yml
```

### @alva/theme

Tudo que é visual e igual nas duas plataformas. É só dado (sem React), então também serve para e-mails, PDFs (certificado de apresentação) e gráficos.

| Export | Conteúdo | Quem usa |
| --- | --- | --- |
| `@alva/theme` | Tokens tipados: `palette`, `themes` (light/dark), `tones`, `type`, `space`, `radius`, `layout`, `breakpoints`, `gradients`, `motion`, `zIndex`, `blur`; funções `toCssVars()` e `toCss()` | Os dois apps, gráficos, Reanimated |
| `@alva/theme/theme.css` | Variáveis CSS dos dois temas (seletores `[data-theme="dark"]` e `.dark`), bloco `@theme` do Tailwind v4 e aliases do shadcn | Web (`globals.css`) e mobile (`global.css` do NativeWind) |
| `@alva/theme/preset` | Preset de configuração do Tailwind em JS | NativeWind (enquanto usar Tailwind v3) |
| `@alva/theme/native` | Conversões para React Native: `textStyle('h1')` vira um `TextStyle`, `shadow('card')` vira props de sombra/elevação, `easing.standard` vira `Easing.bezier(...)` do Reanimated, `colors(theme)` devolve as cores resolvidas | Mobile |
| `@alva/theme/brand` | Geometria do logo (sol, raios, horizonte), ícones próprios (ex.: chupeta) como paths SVG, roteiro de tempos da splash | `Logo`, `SunMark`, `Splash` nos dois apps |

### @alva/contracts

A tradução em TypeScript do que o alva-api declara. 100% gerado; ninguém edita à mão. Sem React e sem TanStack, só tipos, validação e chamadas HTTP.

| Export | Conteúdo |
| --- | --- |
| Tipos de entidade | `Schedule`, `ScheduleAssignment`, `Event`, `Member`, `Church`, `CareCase`, `CareMeeting`, `BabyDedication`, `DedicationDate`, `CheckIn`, `Notification`, `ServiceLimit`… com os campos derivados da API (`checkInWindow`, `limitUsage`, `availableSlots`) |
| Schemas Zod | Um por entidade, por corpo de requisição e por resposta. Usados para validar respostas em desenvolvimento e como base dos formulários |
| Cliente HTTP | Uma função por endpoint (`schedules.list`, `schedules.confirm`, `care.cases.create`…), criado com `createApiClient({ baseUrl, getToken, onUnauthorized, appVersion })`. Usa `fetch`, funciona no web e no React Native |
| Eventos real-time | `RealtimeEvent`, união discriminada por `type` (`schedule.assignment.updated`, `checkin.created`…), com o schema Zod de cada payload |
| Erros | `ProblemDetails` com a união de todos os `code` possíveis, para mapear mensagens no i18n |
| Constantes | Enums de status, lista tipada de permissões (`Permission = 'schedules:edit' \| 'care:read' \| …`), versão da API |
| Fixtures | Casos de teste das regras que existem nos dois lados, em JSON tipado (`fixtures.checkInWindow`, `fixtures.limitUsage`) |

**Como ele é gerado:**

1. O time da API altera `openapi.yaml` ou `asyncapi.yaml` no alva-api. O CI de lá valida e roda `oasdiff` para detectar quebra de contrato.
2. No merge, o alva-api publica a especificação como artefato da release e dispara um `repository_dispatch` para o alva-kit com a versão.
3. O workflow `sync-contracts` do alva-kit baixa a especificação, gera o pacote (Hey API para REST, script próprio para AsyncAPI → Zod), **compila o `@alva/core` contra os novos tipos** e abre um PR com um changeset.
4. Se o contrato não quebra nada, o PR é mesclado automaticamente e a versão é publicada. Se quebra, o PR mostra exatamente o que o core precisa ajustar, antes de chegar aos apps.
5. O Renovate abre PRs no alva-web e no alva-app com as novas versões de `@alva/*`, agrupadas.

A vantagem de gerar no alva-kit (e não no alva-api) é que contratos e core mudam juntos e são testados juntos, num só lugar.

### @alva/core

A lógica de cliente que seria duplicada entre web e mobile. Depende de `@alva/contracts`; tem `react`, `@tanstack/react-query` e `zustand` como peer dependencies. Não importa nada de DOM nem de React Native: diferenças de plataforma entram por adaptadores.

| Submódulo | Oferece |
| --- | --- |
| `/platform` | Interfaces `StorageAdapter`, `NetworkAdapter`, `FocusAdapter`, `LocationAdapter`, `RealtimeTransport`; `createAlvaCore(adapters)` e o `<AlvaProvider>` que monta QueryClient, sessão e real-time |
| `/domain` | Funções puras de interface: formatação pt-BR (datas, horários, moeda), ordenação e agrupamento de listas, schemas de formulário (Zod sobre os contratos), avisos antecipados ("vai passar do limite"), `can(permissions, p)` |
| `/query` | Fábrica de chaves `qk.*` escopada por igreja, `queryOptions` por recurso, fábricas de mutation com patch otimista e rollback, `createQueryClient()` com os padrões da spec, lista de chaves que podem ser persistidas |
| `/realtime` | `createRealtimeClient()` com transporte plugável (troca de provedor sem mexer nas telas), validação do envelope, deduplicação, ordem por versão, lote de 50 ms, tabela de handlers `type → patch/invalidate`, máquina de estados da conexão e resync por cursor |
| `/stores` | Store de sessão (usuário, igreja ativa, papel, permissões, preferência de tema), store de conexão e barramento de UI (toasts, haptics) |
| `/hooks` | Hooks de domínio (`useSchedules`, `useCheckIn`, `useCareCase`, `useBabyDedications`, `useChurchSwitch`…) e de interface (`useAsyncAction`, `useConfirm`, `useDebouncedSearch`, `useListState`) |
| `/i18n` | Textos pt-BR compartilhados: mensagens de erro por `code`, status, rótulos de domínio |
| `/testing` | Handlers MSW gerados dos contratos, fábricas de dados falsos, servidor real-time simulado, `renderWithAlva()` para testes dos dois apps |

**Regra de dependência:** telas → `@alva/core/hooks` → `/query`, `/realtime`, `/stores` → `/domain` + `@alva/contracts`. Telas nunca chamam `@alva/contracts` direto (regra de lint em `@alva/config`).

**Quem decide as regras de negócio:** o alva-api é a única autoridade. Para as duas linguagens não divergirem:

1. **Regras críticas chegam calculadas pela API.** Janela de check-in, limite de escalas, vagas de apresentação e permissões vêm prontas nas respostas (`checkInWindow`, `limitUsage`, `availableSlots`, `permissions`). O front só exibe.
2. **`@alva/core/domain` fica com regras de interface:** validação de formulário, aviso antecipado, formatação, ordenação e agrupamento. Se o front errar, o servidor recusa e o rollback corrige a tela.
3. **Regra que precisa existir nos dois lados ganha fixtures compartilhadas**, mantidas no alva-api e distribuídas em `@alva/contracts`. Os testes do backend e do core rodam os mesmos casos; mudou de um lado só, o teste quebra.

### @alva/config

Configurações compartilhadas para os apps se comportarem igual: `@alva/config/eslint` (com `react-hooks`, `@tanstack/query` e as regras de importação), `@alva/config/tsconfig` (base `strict`) e `@alva/config/prettier`.

### O que fica em cada app

| alva-web | alva-app |
| --- | --- |
| Rotas do App Router, layouts, Server Components da casca | Rotas do Expo Router, tabs, deep links |
| `components/ui` (shadcn tematizado) | `components/ui` (NativeWind, mesma API) |
| `features/*`: telas por módulo | `features/*`: telas por módulo |
| Adaptadores: IndexedDB, `navigator.onLine`, foco da janela, geolocalização do navegador | Adaptadores: MMKV, NetInfo, AppState, expo-location, push |
| `nuqs` para estado na URL, middleware de permissão | Params do Expo Router, guardas no layout |

### Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Linguagem (fronts e kit) | TypeScript `strict` | Contratos gerados garantem o mesmo tipo em todo lugar |
| Web | Next.js 15 (App Router) + React 19 | SSR no primeiro carregamento, rotas aninhadas para lista/detalhe |
| Mobile | Expo SDK atual + Expo Router + React Native (New Architecture) | Rotas por arquivo, OTA updates, EAS Build |
| Estilo web | Tailwind CSS v4 + shadcn/ui (Radix) | Componentes no repositório, tematizados por `@alva/theme` |
| Estilo mobile | NativeWind v4 + react-native-reusables como base | Mesmas classes e tokens do web |
| Dados do servidor | TanStack Query v5 | Cache, deduplicação, retry, otimista, persistência |
| Estado do cliente | Zustand | Sem provider, seletores finos, igual nas duas plataformas |
| Formulários | React Hook Form + Zod (schemas de `@alva/contracts`) | Mesma validação que a API declara |
| Real-time | WebSocket gerenciado via `@alva/core/realtime` | Um canal por sessão, eventos tipados pelo AsyncAPI |
| Animação | Motion (web) + Reanimated 3 (mobile) | Curvas e durações de `@alva/theme` |
| Listas longas | TanStack Virtual (web) + FlashList (mobile) | Escalas, membros e lançamentos passam de milhares de linhas |
| Armazenamento local | MMKV (mobile), IndexedDB via idb-keyval (web) | Cache persistido e fila offline |
| Observabilidade | Sentry + PostHog | Erros com contexto e funis de uso |

### Versionamento e dia a dia

- **Versões independentes por pacote**, com Changesets. Quebra de contrato ou de API pública do core = versão major.
- **Mudar o tema:** editar `packages/theme`, abrir PR com changeset, conferir no playground (Storybook) e mesclar; a versão é publicada e o Renovate atualiza os apps.
- **Desenvolver core e app juntos:** `pnpm link` ou `yalc` apontando o app para o kit local. No CI dos apps, sempre a versão publicada.
- **Compatibilidade:** versões antigas do app continuam nas lojas, então o alva-api mantém contratos antigos por no mínimo 90 dias depois de uma major.

## Design system

O design system vive em `alva-kit/packages/theme` e é publicado como `@alva/theme` (referência completa em `design-system/design-system.md` na pasta da prototipação). Um único objeto TypeScript gera as variáveis CSS, o preset do Tailwind (web e NativeWind) e as constantes para React Native e Reanimated. Nenhum componente usa cor em hex direto.

**Temas:** `light` (rótulo "Dia" na interface, padrão do web) e `dark` ("Noite", padrão do mobile), ativados por `data-theme="dark"`. A preferência fica salva como `theme: 'light' | 'dark' | 'system'`.

**Paleta base (`palette.*`):** `ocean` `#07486e` (marca), `navy` `#002236`, `abyss` `#010f12`, `night` `#122529`, `teal` / `deepTeal`, `sky` `#a9c8da` (marca no dark), `mint`, `sage`, `lime`, `olive`, `amber`, `orange`, `wine`, `blush`, `ember`, `coral`, `apricot`, `stone`. Só alimenta os tokens semânticos; componentes não usam a paleta direto.

**Tokens semânticos** (o que os componentes usam):

| Grupo | Tokens |
| --- | --- |
| Superfícies | `bg`, `surface`, `surface-2`, `glass` |
| Texto | `ink`, `ink-muted`, `ink-soft` |
| Linhas | `line`, `line-strong` |
| Marca | `brand`, `on-brand`, `brand-text`, `brand-soft`, `focus`, `signal`, `positive` |
| Status | `success`, `info`, `warning`, `danger`, cada um com `-bg` |
| Categorias | `tone-sky`, `tone-mint`, `tone-apricot`, `tone-blush`, `tone-lime`, `tone-sage`, cada um com `-ink` |
| Gráficos | `chart-1` a `chart-4`, `chart-warm` |
| Ambiente e logo | `ambient-1`, `ambient-2`, `sun-1`, `sun-2`, `sun-3`, `sun-ray` |
| Elevação | `shadow-card`, `shadow-pop`, `scrim` |
| Aliases shadcn | `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `radius` |

**Tipografia:** SF Pro Display (títulos e números) e SF Pro Text (corpo), com Inter como fallback; Instrument Serif itálico para a palavra de destaque do título, citações e certificado. Estilos nomeados: `hero`, `h1`, `h1Accent`, `kpi`, `title`, `dialog`, `h2`, `lede`, `itemTitle`, `body`, `bodyStrong`, `input`, `bodySm`, `button`, `label`, `caption`, `badge`, `eyebrow`, `overline`, `logo`. Números com `tabular-nums`.

**Forma e espaço:** espaçamento em passos de 4 (escala do Tailwind); raios `xs 6 · sm 10 · field 12 · md 14 · lg 20 · lgMobile 24 · dialog 22 · sheet 24 · xl 32 · full 999`; gutter de 16px no celular.

**Motion:** curvas `standard cubic-bezier(.2,.8,.2,1)`, `spring cubic-bezier(.2,1.4,.4,1)`, `emphasized cubic-bezier(.65,0,.35,1)`; durações `fast 150 · base 200 · medium 250 · slow 320 · pop 450 · entrance 700` ms; stagger de 70 ms; tudo desligado com *reduzir movimento*.

**Regras visuais fixas** (decididas na prototipação):

- Proibido faixa colorida fina na borda esquerda de cards; destaque por gradiente suave ou fundo.
- Toda exclusão abre modal de confirmação; remoções leves oferecem *desfazer* no toast.
- Busca e filtros ficam dentro do container da lista.
- Telas de detalhe têm botão *Voltar* ao lado do breadcrumb.
- Igrejas e pessoas sem blocos coloridos com sigla.
- Cards de evento minimalistas: data discreta em texto, nome, horário e local.
- Brilhos sempre suaves.

**Componentes:** mesma API nos dois repositórios (`alva-web/components/ui` e `alva-app/components/ui`), para que telas de domínio sejam quase idênticas.

| Grupo | Componentes |
| --- | --- |
| Ação | `Button` (variantes `primary`, `secondary`, `ghost`, `danger`), `AsyncButton`, `IconButton`, `Toggle`, `SegmentedControl` |
| Entrada | `Field`, `TextArea`, `Select`, `DatePicker`, `MonthPicker`, `Stepper`, `OtpInput`, `SearchBox`, `FilterChips`, `ColorPicker` |
| Exibição | `Card`, `StatusPill`, `Tag`, `Avatar`, `KpiRow`, `DateNumber`, `EmptyState`, `Skeleton`, `ProgressBar`, `Ring` |
| Sobreposição | `Dialog` (web) / `Sheet` (mobile) sobre o mesmo `Overlay`, `ConfirmDialog`, `Toast` com desfazer, `Popover` / `Menu` |
| Navegação | `Sidebar` com acordeão (web), `TabBar` (mobile), `Breadcrumb` + `BackButton`, `Tabs`, `StepFlow` |
| Marca | `Logo` (sol + "alva"), `SunMark` animado, `Splash` |

O **botão assíncrono** é um contrato único: recebe uma `Promise`, mostra o texto de progresso ("Salvando", "Enviando"), bloqueia duplo clique e termina com o check verde. Web e mobile usam o mesmo hook `useAsyncAction`.

## Estratégia de estado

Todo dado do app pertence a exatamente uma de cinco camadas, e cada camada tem uma ferramenta só. A maior parte dos bugs de apps real-time vem de guardar o mesmo dado em dois lugares; esta regra elimina isso.

| Camada | O que guarda | Ferramenta | Exemplos no Alva |
| --- | --- | --- | --- |
| 1. Servidor | Qualquer dado que existe no backend | TanStack Query | Escalas, membros, casos, eventos, lançamentos, notificações |
| 2. Tempo real | Nada próprio: só aplica eventos na camada 1 | `@alva/core/realtime` → `queryClient` | Check-in feito, convite aceito, novo pedido de oração |
| 3. Sessão e app | Dado do cliente que vale para o app inteiro | Zustand (persistido) | Usuário, igreja ativa, papel, tema, preferências, status da conexão |
| 4. Tela | Estado efêmero de UI | `useState` / `useReducer` local, Zustand só se compartilhado entre irmãos distantes | Aba aberta, item selecionado, modal aberto, rascunho de busca |
| 5. URL | O que precisa sobreviver a reload e ser compartilhável | `nuqs` (web) / params do Expo Router | Filtros, busca, mês do relatório, aba do detalhe, id do item |
| (formulários) | Valores em edição | React Hook Form + Zod | Adicionar caso, nova escala, regras de limite |

**Regras de ouro:**

1. **Nunca copiar dado do servidor para `useState` ou Zustand.** Se precisar derivar (contagens, ordenação, "quem está no limite"), usar `select` do Query ou `useMemo` sobre o resultado.
2. **Query keys são uma fábrica tipada por igreja**: `qk.schedules.list(churchId, filters)`, `qk.schedules.detail(churchId, id)`. Trocar de igreja muda a chave inteira, nunca mistura dados de igrejas.
3. **Toda leitura passa por `queryOptions`** definidos em `@alva/core/query`; telas não escrevem `useQuery({ queryKey: [...] })` à mão.
4. **Escritas só por `useMutation`** com `mutationKey`, `onMutate` otimista, `onError` com rollback e `onSettled` invalidando as chaves afetadas.
5. **Zustand com seletores sempre** (`useSession(s => s.churchId)`), nunca o store inteiro, para não re-renderizar o app a cada mudança.
6. **Formulário não é estado global.** Rascunhos que precisam sobreviver (mensagem longa, pedido de oração) são salvos no armazenamento local por chave, com limpeza ao enviar.

**Configuração padrão do QueryClient:**

| Opção | Valor | Motivo |
| --- | --- | --- |
| `staleTime` | 30 s (listas), 5 min (cadastros estáveis), `Infinity` (dados só alterados via real-time, ex.: presença do dia) | Real-time mantém fresco; evita refetch em cascata |
| `gcTime` | 24 h | Necessário para o cache persistido funcionar offline |
| `retry` | 3 com backoff exponencial, 0 para erros 4xx | Não insistir em erro de validação ou permissão |
| `refetchOnWindowFocus` | true (web), via `focusManager` + AppState (mobile) | Conferência ao voltar para o app |
| `networkMode` | `offlineFirst` | Mostra cache sem rede; mutations entram em fila |
| `structuralSharing` | true | Eventos que não mudam nada não re-renderizam |

**Persistência:** `persistQueryClient` com MMKV (mobile) e IndexedDB (web), só para chaves marcadas `meta: { persist: true }` (agenda, minhas escalas, notificações, perfil). Dados sensíveis de cuidado pastoral e financeiro **nunca** são persistidos. O cache persistido tem `buster` com a versão do schema: muda o schema, o cache antigo é descartado.

## Real-time

O real-time do Alva tem uma única porta de entrada (`@alva/core/realtime`) e um único destino (o cache do TanStack Query). Telas nunca assinam canais diretamente; elas só leem queries, e as queries ficam frescas sozinhas.

**Fluxo de um evento:**

1. **Conexão** — um `RealtimeClient` por sessão (WebSocket; Supabase Realtime, Ably ou Socket.IO servem, ver decisões em aberto). Autentica com o token da sessão e entra no canal `church:{churchId}` e no canal pessoal `user:{userId}`.
2. **Envelope** — todo evento chega no formato `{ id, type, churchId, entity, entityId, version, at, payload }`, validado por Zod. Evento inválido é descartado e reportado ao Sentry, nunca derruba o app.
3. **Deduplicação** — um LRU com os últimos 500 `id`s ignora repetições (reconexão reenvia eventos).
4. **Ordem** — cada entidade tem `version` crescente. Evento com versão menor ou igual à do cache é ignorado; isso resolve corrida entre a resposta da mutation e o eco do socket.
5. **Roteador** — uma tabela `type → handler` em `@alva/core/realtime/handlers`. Cada handler decide entre **patch** (aplica `payload` com `setQueryData` nas chaves conhecidas) ou **invalidate** (marca as chaves como velhas e o Query refaz só as que estão na tela).
6. **Lote** — eventos são agrupados em janelas de 50 ms antes de aplicar (`notifyManager.batch`). Um domingo com 300 check-ins em 2 minutos vira poucos renders, não 300.
7. **Efeitos colaterais** — handlers podem disparar toast, badge ou haptic via um barramento de UI separado, nunca mexendo em estado de tela.

**Quando usar patch e quando invalidar:**

| Situação | Estratégia | Exemplo |
| --- | --- | --- |
| Payload completo, entidade pequena | Patch | Check-in confirmado, status de convite da escala, presença no Kids |
| Afeta agregados ou várias listas | Invalidate | Lançamento financeiro (totais, gráficos), mudança de limite de serviço |
| Item novo em lista paginada | Patch no topo da primeira página + invalidate das contagens | Novo pedido de oração, nova notificação |
| Remoção | Patch removendo + invalidate do detalhe | Escala excluída, caso arquivado |
| Payload ausente ou parcial | Invalidate | Qualquer evento "algo mudou em X" |

**Ciclo de vida da conexão:**

| Estado | Gatilho | Comportamento |
| --- | --- | --- |
| `connecting` | login, troca de igreja, volta do background | Indicador discreto só após 2 s |
| `live` | handshake ok | Nada visível |
| `reconnecting` | queda de rede, socket fechado | Backoff exponencial com jitter (1 s → 30 s). Banner "Reconectando…" após 5 s |
| `resync` | reconectou | Pede eventos desde o último cursor; se o servidor não tiver o histórico, invalida tudo que está montado |
| `paused` | app em background no mobile por mais de 30 s | Fecha o socket para poupar bateria; ao voltar, `resync` |
| `offline` | `NetInfo` / `navigator.onLine` falso | Banner offline, mutations em fila |

**Presença e telas ao vivo:** telas como o painel de check-in do líder ou o Kids assinam um sub-canal (`church:{id}:service:{eventId}`) via `useLiveChannel(key)`, com contagem de referências: o canal abre quando a primeira tela monta e fecha quando a última desmonta.

**Push no mobile:** Expo Notifications entrega o aviso com o app fechado; ao abrir pela notificação, o deep link leva à tela e a query correspondente é invalidada. O push nunca carrega dados que o app grava, só o aviso.

## Hooks

Os hooks são a API pública entre telas e dados. Ficam em `@alva/core/hooks` (compartilhados web + mobile) e seguem três níveis; uma tela só importa do nível de domínio ou de UI.

| Nível | Onde | Responsabilidade | Exemplos |
| --- | --- | --- | --- |
| Infra | `@alva/core/query`, `@alva/core/realtime` | Fetch, auth, socket, cache. Nunca usados direto por telas | `apiClient`, `qk`, `scheduleQueries`, `useRealtimeStatus` |
| Domínio | `@alva/core/hooks/<feature>` | Uma query ou mutation com regra de negócio embutida | `useSchedules`, `useConfirmSchedule`, `useCheckIn`, `useCareCase`, `useBabyDedications` |
| UI | `@alva/core/hooks/ui` | Comportamento visual reutilizável | `useAsyncAction`, `useConfirm`, `useDebouncedSearch`, `useListState` |

**Hooks de domínio da primeira versão:**

| Hook | Retorna / faz | Notas |
| --- | --- | --- |
| `useSession()` | usuário, igreja ativa, papel, `can(perm)` | Seletor fino sobre o store de sessão |
| `useSchedules(filters)` / `useSchedule(id)` | lista e detalhe | `select` deriva mine, pending, atLimit |
| `useConfirmSchedule()` / `useDeclineSchedule()` | mutations otimistas | Atualiza lista, detalhe e contador de limite juntos |
| `useServiceLimits(memberId)` | uso vs. limite por mês e exceções | Lê limitUsage da API; usado no card de limite e no aviso ao escalar |
| `useCheckInWindow(eventId)` | `{ state: 'upcoming' \| 'open' \| 'closed', opensAt, closesAt }` | Estado vem pronto da API (checkInWindow); o cliente só atualiza a contagem regressiva, por minuto, com o relógio do servidor + offset |
| `useCheckIn(eventId)` | `checkIn()` com geolocalização | Valida raio no cliente para feedback, servidor decide |
| `useServiceRoster(eventId)` | equipe com presença ao vivo | Assina o sub-canal do culto; líder marca quem esqueceu |
| `useCareCases(filters)` / `useCareCase(id)` / `useScheduleCareMeeting()` | acompanhamento pastoral | Nunca persistido em disco |
| `useBabyDedications()` / `useRequestBabyDedication()` | datas, vagas, solicitações | Bloqueia data cheia de forma otimista |
| `useEvents(month)` | eventos do mês | Prefetch do mês seguinte |
| `useNotifications()` | lista infinita + `unreadCount` | Patch via real-time |
| `useChurchSwitch()` | troca a igreja ativa | Cancela queries, limpa cache da igreja anterior, reconecta canais |

**Contrato de toda mutation de domínio:**

```ts
export function useConfirmSchedule() {
  const qc = useQueryClient();
  const { churchId } = useSession();
  return useMutation({
    mutationKey: ['schedule', 'confirm'],
    mutationFn: (id: string) => api.schedules.confirm(churchId, id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: qk.schedules.all(churchId) });
      const snapshot = snapshotQueries(qc, qk.schedules.all(churchId));
      patchSchedule(qc, churchId, id, { status: 'confirmed' });
      return { snapshot };
    },
    onError: (_e, _id, ctx) => restoreQueries(qc, ctx?.snapshot),
    onSettled: () => qc.invalidateQueries({ queryKey: qk.schedules.all(churchId) }),
  });
}
```

**`useAsyncAction` (contrato visual do botão assíncrono):** envolve qualquer `mutateAsync` e devolve `{ run, state }` com `idle → loading → success → idle` (ou `error`). O componente `<AsyncButton>` de web e mobile consome o mesmo estado e o mesmo token de motion, garantindo a animação idêntica nas duas plataformas. Clique duplo durante `loading` é ignorado.

**Regras para escrever hooks:**

- Um hook, uma responsabilidade. Hooks que combinam outros hooks são permitidos só no nível de domínio.
- Sem `useEffect` para sincronizar dados. Se está escrevendo `useEffect(() => setX(data))`, use `select` ou `useMemo`.
- `useEffect` só para efeitos externos (assinar canal, foco, AppState) e sempre com limpeza.
- Retornos estáveis: callbacks com `useCallback`, objetos com `useMemo` quando passados para listas virtualizadas.
- Todo hook de domínio tem teste com MSW + `renderHook`.

## Resiliência

O objetivo é que nenhuma falha isolada (um evento malformado, uma tela com bug, rede ruim no culto) derrube o app inteiro. Cada camada tem sua proteção.

| Risco | Proteção | Comportamento para o usuário |
| --- | --- | --- |
| Erro de render em uma tela | Error Boundary por rota (layout do Next / Expo Router) + por widget em dashboards | Só aquela área mostra "Algo deu errado · Tentar de novo"; menu e navegação continuam |
| Erro de query | `throwOnError` só para 5xx em telas críticas; demais mostram estado de erro inline | Lista mostra mensagem e botão de recarregar, dados em cache continuam visíveis |
| Mutation falhou | Rollback do `onMutate` + toast com "Desfazer" / "Tentar de novo" | A UI volta ao estado anterior sem piscar |
| Sem rede | `onlineManager` + fila de mutations persistida (`resumePausedMutations`) | Banner offline; ações seguras (confirmar escala, pedido de oração) entram na fila; ações que exigem servidor (check-in, pagamento) ficam desabilitadas com explicação |
| Evento real-time inválido ou fora de ordem | Zod + versão + dedupe (seção Real-time) | Invisível |
| Rajada de eventos | Lote de 50 ms + `structuralSharing` + listas virtualizadas | App continua fluido |
| Token expirado | Interceptor faz refresh único (mutex) e repete as requisições em espera | Invisível; se o refresh falhar, volta ao login preservando a rota |
| Troca de igreja no meio de uma requisição | `AbortController` por `churchId` + chaves com `churchId` | Respostas antigas são descartadas, nunca aparecem na igreja errada |
| Versão do app desatualizada | Header `x-app-version`; servidor responde 426 | Tela "Atualize o Alva" (mobile) ou recarga suave (web) |
| Memória no mobile | `gcTime` + limite de páginas em `useInfiniteQuery` (`maxPages: 5`) + FlashList | Sem crescimento ilimitado em sessões longas |
| Bateria / background | Socket pausado após 30 s em background, sem polling | Ao voltar, resync rápido |

**Relógio do servidor:** check-in, janelas de escala e prazos usam `serverNow()` = `Date.now() + offset`, com offset medido no login e a cada reconexão. Nunca confiar no relógio do aparelho para regras.

**Feature flags e kill switch:** flags remotas (PostHog) por igreja permitem desligar uma feature com problema sem publicar versão. O módulo de real-time tem flag própria: desligado, o app cai para `refetchInterval` de 60 s nas telas ao vivo.

**Observabilidade:** Sentry com breadcrumbs de navegação, mutations e estado da conexão; tag `churchId` e `role` (nunca dados pessoais). Métricas de real-time (latência evento→tela, reconexões por sessão, eventos descartados) vão para o PostHog.

## Mapa de funcionalidades

O que já foi prototipado, onde vive em cada plataforma e o que precisa de real-time.

| Feature | Web (admin) | Mobile (membro / líder) | Real-time | Persistir offline |
| --- | --- | --- | --- | --- |
| Login, primeiro acesso (OTP), esqueci a senha, seleção de igreja | Sim | Sim + splash | — | Sessão |
| Dashboard / Início | KPIs, pendências | Próximos eventos e escalas | Invalidate | Sim |
| Agenda e eventos | CRUD, calendário | Aba Eventos (cards minimalistas) | Patch | Sim |
| Escalas | Montagem, conteúdo por tipo (seleção múltipla), limites e exceções, carga | Minhas escalas, Disponibilidade, card de limite | Patch (convites, status) | Sim |
| Check-in de serviço | Aba Check-in na escala, líder marca presença | Check-in por geolocalização (janela de 2 h, raio), tela da equipe para o líder | Patch ao vivo (sub-canal do culto) | Não (exige servidor) |
| Conteúdo / aulas | Biblioteca, formatos vídeo / arquivo / ambos, upload | Consumo | Invalidate | Sim (metadados) |
| Acompanhamento pastoral | Lista, detalhe do caso, registro, agendar (2 passos) | Aba Acompanhamento (membro), Mais (admin) | Patch | **Não** (sensível) |
| Discipulado | Grupos e encontros | Aba Discipulado | Invalidate | Sim |
| Kids | Salas, check-in / check-out | Responsáveis | Patch ao vivo | Não |
| Apresentação de bebês | Datas abertas pela igreja, aprovação, regras (idade máx.), certificado | Solicitação pelos pais membros, acompanhamento | Patch (vagas, status) | Sim |
| Financeiro / reservas | Lançamentos, relatórios, reservas | — | Invalidate | **Não** |
| Notificações | Sino | Lista + push | Patch | Sim |
| Meu perfil | Dados, acesso, segurança, preferências (tema) | Perfil | — | Sim |
| Visitante | — | Boas-vindas e acesso restrito | — | Sim |

**Ordem sugerida de construção:** fundação (auth, sessão, design system, query client, real-time) → Agenda → Escalas → Check-in → Notificações → Acompanhamento e Discipulado → Kids → Apresentações → Conteúdo → Financeiro. Escalas + Check-in são o primeiro teste real da arquitetura de real-time, por isso vêm cedo.

## Navegação, permissões e multi-igreja

**Rotas web (Next.js App Router):**

- `/(auth)/login`, `/(auth)/first-access`, `/(auth)/forgot-password`, `/(auth)/churches`
- `/[churchSlug]/(app)/...` com o menu lateral em acordeão (grupo "Geral" primeiro) e busca no menu. Cada módulo é um segmento em inglês: `schedules`, `schedules/[id]?tab=check-in`, `care/[caseId]`, `baby-dedications`, `profile`. Os rótulos visíveis continuam em português ("Escalas", "Acompanhamento").
- Telas de detalhe sempre com botão **Voltar** ao lado do breadcrumb.
- Server Components só para a casca (layout, menu, permissões); conteúdo de dados é Client Component com Query, hidratado via `HydrationBoundary` quando houver prefetch.

**Rotas mobile (Expo Router):**

- `(auth)` stack → `(tabs)` com as rotas `home`, `calendar` (sub-abas `events` · `schedules` · `discipleship` · `care`), `notifications` e `more`. Rótulos: Início, Agenda (Eventos · Escalas · Discipulado · Acompanhamento), Notificações, Mais.
- Abas visíveis calculadas por `tabsFor(role)`; visitante vê a versão restrita.
- Deep links `alva://schedule/{id}`, `alva://checkin/{eventId}` usados por push.

**Permissões:**

| Papel | Web | Mobile |
| --- | --- | --- |
| Admin / pastor | Tudo | Tudo + Acompanhamento em Mais |
| Líder de ministério | Escalas e check-in do seu ministério | Equipe do culto, marcar presença |
| Membro | — | Agenda, escalas, acompanhamento próprio, apresentações |
| Visitante | — | Boas-vindas, eventos públicos, convite para tornar-se membro |

- Permissões vêm do servidor como lista (`schedules:edit`, `care:read`…); o cliente só usa `can(perm)` para esconder UI. **Quem decide é o servidor.**
- Componente `<Can perm>` e guarda de rota (`middleware.ts` na web, redirect no layout do Expo Router).

**Multi-igreja:**

1. Igreja ativa vive no store de sessão e na URL (web: `churchSlug`).
2. `useChurchSwitch()` cancela queries em voo, remove do cache tudo que tem a chave da igreja anterior (dados sensíveis) ou mantém em memória (dados públicos, para voltar rápido), troca canais de real-time e navega para o Início.
3. Seletor de igreja sem blocos coloridos de sigla, só nome e local.

## Qualidade

| Tipo | Ferramenta | O que cobre | Meta |
| --- | --- | --- | --- |
| Tipos | TypeScript `strict` + tipos de @alva/contracts (gerados do OpenAPI) | Contrato com o backend | Zero `any` em `@alva/core` |
| Unitário | Vitest | `@alva/core/domain` (regras de limite, janela de check-in, idade máxima) | 90% em domain |
| Hooks | Vitest + `renderHook` + MSW | Queries, mutations otimistas, rollback | Todo hook de domínio |
| Real-time | Vitest com socket simulado | Dedupe, ordem por versão, lote, resync | Todos os handlers |
| Componentes | Testing Library (web) / RNTL (mobile) + Storybook | Design system e estados (vazio, carregando, erro) | Todo componente de `components/ui` |
| E2E web | Playwright | Login, escalar, check-in do líder, aprovar apresentação | Fluxos críticos no CI |
| E2E mobile | Maestro | Login, confirmar escala, check-in por geolocalização simulada | Fluxos críticos antes de cada release |
| Visual | Chromatic sobre o Storybook | Regressão visual do DS, temas light e dark | Aprovação em PR |
| Acessibilidade | axe (web), labels obrigatórios (lint) | Contraste, foco, leitores de tela | Sem violações sérias |
| Performance | Lighthouse CI, React Profiler, Flashlight (mobile) | LCP, renders por evento, FPS em listas | LCP < 2,5 s; 60 fps em listas |

**Teste de carga do real-time:** antes do primeiro domingo em produção, simular 500 eventos/min no sub-canal de um culto e medir renders, memória e latência nas duas plataformas.

**CI (GitHub Actions + um pipeline por repositório):** lint → typecheck → testes → build → Playwright → preview na Vercel. Mobile com EAS Build e EAS Update (canais `preview` e `production`), OTA só para mudanças de JS. No alva-api, o CI valida OpenAPI e AsyncAPI, detecta mudanças que quebram contrato (oasdiff) e publica @alva/contracts; no alva-kit, o workflow sync-contracts gera @alva/contracts a partir da especificação e o Changesets publica @alva/theme, @alva/contracts, @alva/core e @alva/config.

**Convenções:** ESLint com `react-hooks`, `@tanstack/query` e regra proibindo import de `@alva/contracts` em telas; Prettier; commits convencionais; PR pequeno com Storybook do componente novo.

## Requisitos para o alva-api

A robustez do front depende de garantias que só o backend pode dar. Estes pontos precisam ser combinados com o time da API antes da fase 1.

| Requisito | Detalhe | Por que o front precisa |
| --- | --- | --- |
| Contratos versionados | `openapi.yaml` e `asyncapi.yaml` no repo; CI valida, roda `oasdiff` e avisa o alva-kit, que gera e publica `@alva/contracts`. Quebra de contrato = versão major + janela de compatibilidade de no mínimo 90 dias | Versões antigas do app continuam instaladas nos celulares |
| Versão por registro | Toda entidade tem `version` (inteiro crescente) e `updatedAt`, nas respostas e nos eventos | Descartar eventos fora de ordem e resolver corrida entre mutation e socket |
| Envelope de evento | `{ id, type, churchId, entity, entityId, version, at, payload }`, com `id` único; payload completo quando a entidade é pequena | Deduplicação e decisão entre patch e invalidate |
| Histórico e cursor | Eventos guardados por 24 h; ao reconectar, o cliente envia o último cursor e recebe o que perdeu. Fora da janela, responde `resync_required` | Reconexão sem perder atualizações |
| Idempotência | Toda escrita aceita o header `Idempotency-Key`; repetir a chave devolve o mesmo resultado | Fila offline e retries não duplicam check-ins nem pedidos |
| Campos derivados | `checkInWindow`, `limitUsage`, `availableSlots`, `permissions` calculados no servidor | Uma única implementação das regras críticas |
| Hora do servidor | Header `Date` (ou `x-server-time`) em toda resposta | Calcular o offset do relógio do aparelho |
| Erros padronizados | `application/problem+json` (RFC 9457) com `code` estável e `fields` para validação | Mensagens traduzidas no front e erro no campo certo |
| Autenticação | Access token curto + refresh token com rotação; `401` (sessão) diferente de `403` (permissão) | Refresh automático sem deslogar quem só não tem acesso |
| Versão mínima do app | Lê `x-app-version` e responde `426` abaixo do mínimo | Tela "Atualize o Alva" em vez de erros estranhos |
| Escopo por igreja | Rotas em `/churches/{churchId}/...`; permissões avaliadas por igreja; canais `church:{churchId}` | Multi-igreja sem vazamento de dados |
| Paginação por cursor | Listas que recebem itens em tempo real usam cursor, não offset | Itens novos não duplicam nem pulam páginas |
| Dados sensíveis | Eventos e push de acompanhamento pastoral e financeiro levam só ids, nunca conteúdo | O front invalida e busca com autorização; nada sensível fica em notificações |
| Fixtures de regras | Casos de teste em JSON para regras que existem nos dois lados, publicados em `@alva/contracts` | Garantir que front e back calculam igual |

## Roadmap e decisões em aberto

| Fase | Duração estimada | Entregas |
| --- | --- | --- |
| 0. Fundação | 2–3 semanas | Repositório alva-kit com @alva/theme, @alva/contracts, @alva/core e @alva/config publicados, sync de contratos com o alva-api, CI dos quatro repositórios, tokens e componentes base (web + native), auth e sessão, QueryClient, cliente real-time com roteador e testes, Sentry, CI |
| 1. Núcleo do culto | 4–5 semanas | Agenda, Escalas (montagem, convites, limites), Check-in com geolocalização e painel do líder, notificações e push |
| 2. Cuidado | 3–4 semanas | Acompanhamento pastoral, Discipulado, Kids |
| 3. Vida da igreja | 3 semanas | Apresentação de bebês com certificado, Conteúdo / aulas, Meu perfil completo |
| 4. Gestão | 3 semanas | Financeiro, reservas, relatórios |
| 5. Endurecimento | contínuo | Offline avançado, teste de carga, acessibilidade, performance |

**Decisões em aberto:**

| Decisão | Opções | Recomendação |
| --- | --- | --- |
| Provedor de real-time | Supabase Realtime · Ably · Socket.IO próprio · Pusher | Depende do backend: Supabase se o banco for Postgres no Supabase; Ably se quiser histórico e garantia de entrega sem operar servidor |
| Contrato de API | Gerador do cliente: Hey API · Orval · openapi-zod-client | REST + OpenAPI já decidido (API não é TypeScript). Hey API: gera tipos, Zod e queryOptions do TanStack Query |
| Cursor de resync | Servidor guarda histórico de eventos · sempre invalidar ao reconectar | Histórico curto (24 h) no servidor, invalidação como fallback |
| Offline no mobile | Só leitura · fila de mutations | Fila apenas para ações seguras (lista na seção Resiliência) |
| Componentes compartilhados | Duas bibliotecas (shadcn + NativeWind) · Tamagui / gluestack universal | Duas bibliotecas sobre os mesmos tokens: aproveita shadcn na web e mantém o nativo leve |
| Web do membro | Só admin na web · também versão membro | Começar só admin; Expo Web pode servir o membro depois |
| Geolocalização do check-in | Raio fixo · geofence por igreja · QR code como alternativa | Raio configurável por igreja, com QR do líder como plano B para GPS ruim |
