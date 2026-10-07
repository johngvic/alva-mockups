# Alva — Especificação de Frontend

Atualizado em 2026-10-07. Detalha, para os fronts do Alva, as decisões de `doc_alva/technical/frontend-architecture.md` (revisão aprovada em 04/10/2026). Em caso de conflito, vale o documento de arquitetura; regras de negócio e navegação de produto continuam nos documentos de produto.

## Visão geral e princípios

O Alva tem quatro fronts TypeScript, cada um no seu repositório, consumindo APIs .NET:

| Front | O que é | Base |
| --- | --- | --- |
| **Alva Web** | Painel de gestão das igrejas | SPA React + Vite |
| **Alva Mobile** | App do membro e do líder | React Native + Expo |
| **Landing** | Site público do Alva e cadastro de novas igrejas | Site estático React + Vite |
| **Assinaturas** | Painel de administração multiproduto (planos, clientes, cobranças) | SPA React + Vite; sem app mobile |

Alva Web, Alva Mobile e Landing falam com a API do Alva. Assinaturas é outro sistema, com API, banco e domínios próprios; segue o mesmo padrão técnico, mas não compartilha API com o Alva.

**Não há pacote compartilhado.** Cada repositório declara seus próprios tokens de tema, gera seu próprio cliente da API a partir do OpenAPI e mantém sua configuração de lint e TypeScript. A consistência visual vem de uma referência única (`ux_alva/docs/design-system.md` e `ux_alva/docs/tokens.ts`) copiada para cada repositório, não de uma dependência publicada.

**Convenção de idioma:** código e identificadores em inglês (variáveis, funções, hooks, tipos, tokens, rotas, query keys, permissões, arquivos, branches, commits). Textos de interface em pt-BR, com mensagens centralizadas por repositório.

**Escopo inicial:** as funcionalidades prototipadas em `ux_alva` (web, mobile, site e subscriptions), mapeadas em "Mapa de funcionalidades". Os protótipos definem identidade e fluxos; seus dados simulados não são regra.

**Princípios:**

1. **O servidor é a fonte da verdade.** O cliente guarda cópias em cache, nunca uma segunda verdade. Limites, autorização, valores e concorrência são validados na API.
2. **Sem tempo real na tela.** Nada de sockets, canais, replay ou assinaturas. Dados ficam frescos por revalidação (ao montar, ao voltar o foco, após escrever) e por push que leva o usuário à tela certa.
3. **Escrever é esperar o servidor.** Sucesso só aparece depois da confirmação da API. Atualização otimista só em casos explicitamente aprovados e reversíveis. Sem fila offline.
4. **Falha de uma área não derruba o app.** Cada rota e widget crítico tem limite de erro e estados de vazio, carregando, erro, sucesso e desabilitado.
5. **Mobile primeiro, também no painel.** Toda tela web funciona a partir de 360px.
6. **Mesma identidade em todos os fronts.** Os mesmos tokens semânticos e os mesmos comportamentos (como a animação do botão assíncrono), com implementação própria em cada plataforma.

**Metas de robustez (medidas em produção):**

| Meta | Alvo |
| --- | --- |
| Sessões sem crash (mobile) | ≥ 99,8% |
| Erros JS não tratados (web) | < 0,1% das sessões |
| Interação no web (INP) | p75 < 200 ms |
| Primeira tela útil no web (LCP) | p75 < 2,5 s |
| Abertura a frio do app | < 2,5 s em aparelho médio |

## Repositórios

```
alva-api            .NET (ASP.NET Core, EF Core, PostgreSQL): dados, regras, openapi.yaml
alva-web            painel de gestão (React + Vite)
alva-app            app mobile (Expo)
alva-site           landing (React + Vite, build estático)
assinaturas-api     .NET, sistema próprio de Assinaturas
assinaturas-web     painel de Assinaturas (React + Vite)
```

| Repositório | Responsabilidade | Consome |
| --- | --- | --- |
| `alva-api` | Dono dos dados e das regras do Alva. Publica `openapi.yaml` a cada release | — |
| `alva-web` | Telas, rotas, componentes e adaptadores do painel | OpenAPI do `alva-api` |
| `alva-app` | Telas, rotas, componentes e adaptadores do app | OpenAPI do `alva-api` |
| `alva-site` | Páginas públicas, planos e cadastro de igreja | Endpoints públicos do `alva-api` |
| `assinaturas-web` | Telas do painel multiproduto | OpenAPI do `assinaturas-api` |

Os nomes dos repositórios acima são propostas; o que importa é a separação. Cada repositório é autossuficiente.

## Stack

As versões exatas saem de uma única matriz homologada no bootstrap (.NET/EF/Npgsql, PostgreSQL, Node/React/Vite/TypeScript, Expo SDK/React Native). O Expo determina as compatibilidades de React no mobile; nada de dependência em preview.

| Camada | Web (alva-web, assinaturas-web) | Landing (alva-site) | Mobile (alva-app) |
| --- | --- | --- | --- |
| Linguagem | TypeScript `strict` | TypeScript `strict` | TypeScript `strict` |
| Base | React + Vite + React Router | React + Vite, saída estática (pré-renderização das páginas públicas) | React Native + Expo + Expo Router |
| UI | shadcn/ui + Tailwind | Tailwind | Componentes nativos próprios |
| Dados do servidor | TanStack Query | TanStack Query só onde houver chamada (planos, cadastro) | TanStack Query |
| Sessão e contexto | Zustand | — | Zustand |
| Estado de tela | `useState` / `useReducer` | `useState` / `useReducer` | `useState` / `useReducer` |
| Formulários | React Hook Form + Zod | React Hook Form + Zod | React Hook Form + Zod |
| Cliente da API | Gerado do OpenAPI | Gerado do OpenAPI | Gerado do OpenAPI |
| Persistência de catálogo | IndexedDB (teto de 7 dias) | — | Adaptador local (teto de 7 dias) |
| Testes | Vitest + Testing Library + MSW, Playwright | Vitest, Playwright | Jest + React Native Testing Library, Maestro |
| Catálogo de componentes | Storybook | — | Storybook |

A animação usa a biblioteca de cada plataforma (CSS/Motion no web, Reanimated no mobile), sempre com as curvas e durações dos tokens. Listas longas usam virtualização (TanStack Virtual no web, FlashList no mobile).

## Estrutura de um repositório

Uma SPA (ou app) por produto, com rotas carregadas sob demanda por domínio:

```
src/
  app/                composição: Router, providers, QueryClient, injeção das implementações
  theme/              tokens do repositório (ver "Tokens e tema")
  shared/
    ui/               componentes sem regra de negócio (Button, Field, Dialog, AsyncButton…)
    platform/         storage, autenticação, rede, foco, geolocalização (adaptadores da plataforma)
    api/              cliente gerado do OpenAPI (nunca editado à mão) e wrapper de erros
    i18n/             mensagens pt-BR, inclusive textos de erro por error.code
  features/
    schedules/
      domain/         tipos e funções puras (formatação, agrupamento, avisos antecipados)
      application/    casos de uso e portas (interfaces que a feature precisa)
      data-access/    queryOptions, query keys, mutations, chamadas HTTP
      presentation/   telas e componentes da feature, que só usam os hooks públicos dela
      index.ts        API pública da feature
```

**Regras de dependência:**

- `presentation` → hooks públicos da própria feature → `application` → `domain`. `data-access` implementa as portas de `application`.
- Uma feature não importa a implementação interna de outra; só o `index.ts` dela.
- Telas não chamam o cliente da API nem montam query keys.
- `app/` é o único lugar que liga portas a implementações (por exemplo, o `StorageAdapter` do web usa IndexedDB; o do mobile, o armazenamento local do Expo).

Essas regras são verificadas por lint (ESLint com regras de import por camada), não só por revisão.

## Tokens e tema

**Cada repositório declara seus tokens.** A referência é `ux_alva/docs/tokens.ts` (valores) e `ux_alva/docs/design-system.md` (uso). Cada repositório copia o que precisa para `src/theme/` e gera a saída da sua plataforma:

| Repositório | Arquivos | Saída |
| --- | --- | --- |
| `alva-web` | `src/theme/tokens.ts`, `src/theme/theme.css` | Variáveis CSS dos temas Dia e Noite, bloco `@theme` do Tailwind, aliases do shadcn (`--background`, `--primary`…) |
| `alva-app` | `src/theme/tokens.ts`, `src/theme/native.ts` | Constantes para StyleSheet, `textStyle()`, `shadow()`, curvas para o Reanimated, `colors(theme)` |
| `alva-site` | `src/theme/tokens.ts`, `src/theme/theme.css` | Só o tema Dia, com fundo branco; inclui o gradiente do rodapé "Alvorada" |
| `assinaturas-web` | `src/theme/tokens.ts`, `src/theme/theme.css` | Temas Dia e Noite; marca neutra "Assinaturas" e selos de produto, conforme seção 16 do design system |

**Como manter alinhado sem pacote:**

1. Toda mudança de token começa na referência (`ux_alva/docs/tokens.ts` e `design-system.md`), num PR no `alva-docs`.
2. Cada repositório afetado recebe um PR com a mesma mudança, citando o PR da referência. O checklist de PR de UI tem o item "tokens conferidos com a referência".
3. Nomes de tokens são fixos em todos os repositórios (`--ink`, `--brand`, `--success-bg`…). Um repositório pode ter tokens a mais (como `authSky` no app ou os selos de produto em Assinaturas), nunca o mesmo nome com outro significado.
4. Componentes usam só tokens semânticos; cor em hex ou `rgb()` em componente é bloqueada por lint.

**Temas:** `light` (rótulo "Dia") e `dark` ("Noite"), ativados por `data-theme="dark"` no web e por contexto de tema no mobile. Preferência `theme: 'light' | 'dark' | 'system'`, guardada nas preferências do Zustand.

## Design system

Referência completa em `ux_alva/docs/design-system.md`. Resumo do que todo front segue:

**Paleta base:** `ocean` `#07486e` (marca), `navy`, `abyss`, `night`, `teal`, `deepTeal`, `sky` `#a9c8da` (marca no tema Noite), `mint`, `sage`, `lime`, `olive`, `amber`, `orange`, `wine`, `blush`, `ember`, `coral`, `apricot`, `stone`. Só alimenta os tokens semânticos.

**Tokens semânticos:**

| Grupo | Tokens |
| --- | --- |
| Superfícies | `bg`, `surface`, `surface-2`, `surface-3`, `glass` |
| Texto | `ink`, `ink-muted`, `ink-soft` |
| Linhas | `line`, `line-strong` |
| Marca | `brand`, `on-brand`, `brand-text`, `brand-soft`, `focus`, `signal`, `positive` |
| Status | `success`, `info`, `warning`, `danger`, cada um com `-bg` |
| Categorias | `tone-sky`, `tone-mint`, `tone-apricot`, `tone-blush`, `tone-lime`, `tone-sage`, cada um com `-ink` |
| Gráficos | `chart-1` a `chart-4`, `chart-warm` |
| Ambiente e logo | `ambient-1`, `ambient-2`, `sun-1`, `sun-2`, `sun-3`, `sun-ray`; céu das telas de acesso em `authSky` |
| Elevação | `shadow-card`, `shadow-pop`, `scrim` |
| Aliases shadcn (web) | `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `radius` |

**Tipografia:** SF Pro Display (títulos e números) e SF Pro Text (corpo), Inter como fallback; Instrument Serif itálico para a palavra de destaque, citações e certificado. Estilos: `hero`, `h1`, `h1Accent`, `kpi`, `title`, `dialog`, `h2`, `lede`, `itemTitle`, `body`, `bodyStrong`, `input`, `bodySm`, `button`, `label`, `caption`, `badge`, `eyebrow`, `overline`, `logo`. Números com `tabular-nums`.

**Forma e espaço:** passos de 4; raios `xs 6 · sm 10 · field 12 · md 14 · lg 20 · lgMobile 24 · dialog 22 · sheet 24 · xl 32 · full 999`; gutter de 16px no celular.

**Motion:** curvas `standard`, `spring`, `emphasized`; durações `fast 150 · base 200 · medium 250 · slow 320 · pop 450 · entrance 700` ms e ciclos lentos `autoAdvance 6000 · sheenLoop 9000 · glowSpin 14000` ms; stagger de 70 ms; tudo desligado com *reduzir movimento*.

**Regras visuais fixas:**

- Sem faixa colorida fina na borda esquerda; destaque por gradiente suave ou fundo.
- Toda exclusão abre modal de confirmação; remoções leves oferecem *desfazer* no toast (desfazer chama a API; não é rollback local).
- Busca e filtros dentro do container da lista.
- Telas de detalhe com botão *Voltar* ao lado do breadcrumb.
- Igrejas e pessoas sem blocos coloridos com sigla.
- Cards de evento minimalistas.
- Brilhos sempre suaves.
- Menu lateral nunca rola; em telas baixas entra a versão compacta.
- Sem avisos de protótipo ou demonstração.
- Toda tabela principal é paginada; selects são o componente próprio.
- Filtro que reduz a tela mostra um chip com saída (×).
- Hachura só para dado (dia bloqueado), nunca decoração.

**Componentes:** mesma API (props e comportamento) entre web e mobile, implementação própria em cada um. shadcn/ui é a base no web; o mobile tem componentes nativos.

| Grupo | Componentes |
| --- | --- |
| Ação | `Button` (`primary`, `secondary`, `ghost`, `danger`, `glass`, `glow`), `AsyncButton`, `IconButton`, `Toggle`, `SegmentedControl` |
| Entrada | `Field`, `TextArea`, `Select`, `DatePicker`, `MonthPicker`, `Stepper`, `OtpInput` (seis caixas), `SearchBox`, `FilterChips`, `ColorPicker` |
| Exibição | `Card`, `StatusPill`, `Tag`, `Avatar`, `KpiRow`, `DateNumber`, `EmptyState`, `Skeleton`, `ProgressBar`, `Ring`, `Pagination`, `ChartTooltip`, `ProductBadge` |
| Sobreposição | `Dialog` (web) / `Sheet` (mobile), `ConfirmDialog`, `Toast` com desfazer, `Popover` / `Menu`, `CommandPalette` (Cmd/Ctrl+K, web) |
| Navegação | `Sidebar` com acordeão e modo compacto (web), `TabBar` (mobile), `Breadcrumb` + `BackButton`, `Tabs`, `StepFlow` |
| Marca | `Logo` (completo, só o sol, só a palavra), `SunMark`, `Splash`, `AuthSky` |

**Botão assíncrono:** recebe uma `Promise`, mostra o texto de progresso ("Salvando", "Enviando"), bloqueia duplo envio e só mostra o check verde quando a API confirma. Mesmo contrato (`useAsyncAction`) e mesma animação no web e no mobile, cada um com sua implementação.

## Contrato HTTP

- **Cliente gerado do OpenAPI** em cada repositório (`src/shared/api`), nunca editado à mão. O servidor é dono do contrato; DTOs do backend não viram entidades expostas no front.
- **Validação Zod** só na fronteira, onde necessário (formulários e respostas críticas).
- **Coleções:** `{ items, page, pageSize, totalCount, totalPages }`. Filtros, ordenação e paginação seguem o QuerySpec/OData-lite do backend.
- **Erros:** `{ error: { code, message, details } }`. O front traduz por `error.code` nas mensagens pt-BR e leva `details` para o campo certo do formulário.
- **Concorrência e repetição:** `If-Match` em edições concorrentes; `Idempotency-Key` nos comandos repetíveis que o endpoint aceitar. Reenvio de comando nunca é automático sem contrato de idempotência.
- **Autenticação:** por adaptador em `shared/platform`. No web, sessão em cookie HttpOnly/Secure com CSRF; nenhum token em Zustand, IndexedDB ou localStorage. No mobile, armazenamento seguro do sistema. `401` (sessão) é tratado separado de `403` (permissão).
- **Invalidação:** depois de uma escrita, invalidar só as queries afetadas, incluindo agregados (totais, contadores).
- **Quebra de contrato:** o CI de cada front gera o cliente a partir do OpenAPI publicado e falha se algo deixar de compilar, antes de qualquer atualização chegar aos usuários.

## Estado, consulta e cache

| Camada | O que guarda | Ferramenta | Exemplos |
| --- | --- | --- | --- |
| Servidor | Qualquer dado que existe no backend | TanStack Query (única cópia) | Escalas, membros, casos, eventos, lançamentos, notificações |
| Sessão e contexto | Sessão mínima, igreja ativa, preferências, flags de interface | Zustand | Usuário, igreja ativa, papel, tema |
| Tela | Estado efêmero | `useState` / `useReducer` | Aba, modal, seleção |
| URL | Rotas e filtros compartilháveis (sem dado sensível) | React Router / Expo Router | Filtros, busca, mês, aba do detalhe |
| Formulários | Valores em edição | React Hook Form + Zod | Novo caso, nova escala, regras de limite |

**Regras:**

1. Nunca copiar dado do servidor para `useState` ou Zustand; derivar com `select` ou `useMemo`.
2. **Query keys** incluem sistema, usuário, contexto ativo (igreja), recurso, id e filtros: `['alva', userId, churchId, 'schedules', 'list', filters]`. Fábrica tipada por feature; telas não montam chaves.
3. Toda leitura passa por `queryOptions` da feature; escritas só por `useMutation` que espera o servidor e invalida as chaves afetadas.
4. Zustand sempre com seletores (`useSession(s => s.churchId)`).
5. Rascunho de formulário não vai para o store global.

**Cache e persistência:**

- **Operacional só em memória.** Membros, transações, casos, escalas e cobranças nunca são persistidos em disco.
- **Catálogo pequeno** (por exemplo, categorias, tipos, ministérios, salas) pode ser persistido: IndexedDB no web, adaptador local no mobile, com `fetchedAt`, versão do schema, limite de espaço e idade máxima de 7 dias. O persister e a leitura verificam idade e versão (`gcTime` sozinho não é política de expiração). Login e troca de contexto forçam revalidação; catálogo expirado não é servido.
- **Revalidação:** ao montar a tela e ao voltar o foco, conforme a necessidade de cada dado. `staleTime` infinito nunca é garantia de atualização.
- **Logout, troca de identidade ou perda de permissão:** cancelar requisições, remover dados do usuário e invalidar a persistência.
- **Troca de igreja:** cancelar consultas em voo e descartar respostas antigas; como a chave inclui a igreja, dados de igrejas diferentes nunca se misturam. Cache nunca autoriza acesso.

**Configuração padrão do QueryClient (ponto de partida):**

| Opção | Valor | Motivo |
| --- | --- | --- |
| `staleTime` | 30 s (listas operacionais), 5 min (catálogo) | Evita refetch em cascata sem esconder mudanças |
| `retry` | 2 com backoff para leituras; 0 para 4xx; mutations sem retry automático | Não insistir em erro de validação ou permissão; não repetir comandos |
| `refetchOnWindowFocus` | true (web), via `focusManager` + AppState (mobile) | Conferência ao voltar para o app |
| `networkMode` | `online` | Sem rede, ações ficam desabilitadas com explicação; sem fila |

## Atualização de dados sem tempo real

O documento de arquitetura proíbe sockets e polling global. Telas que antes dependeriam de tempo real usam:

| Situação | Estratégia |
| --- | --- |
| Voltar para a tela ou para o app | Revalidação por foco |
| Depois de uma escrita | Invalidação das queries afetadas |
| Push no mobile | Leva à tela pelo deep link e invalida a query correspondente; o push nunca carrega dados que o app grava |
| Painéis acompanhados ao vivo (check-in do culto, Kids) | Botão "Atualizar" com horário da última atualização e revalidação por foco. Recarga periódica restrita a essa tela é decisão em aberto (ver final) |

## Hooks

Os hooks públicos de cada feature são a API entre telas e dados. Ficam em `features/<domínio>/` e são exportados pelo `index.ts`. Não existe biblioteca de hooks compartilhada entre repositórios: web e mobile implementam os hooks equivalentes com o mesmo nome e a mesma assinatura sempre que a feature existir nos dois.

| Nível | Onde | Exemplos |
| --- | --- | --- |
| Infra | `shared/api`, `shared/platform`, `data-access` | cliente HTTP, `qk`, `scheduleQueries` |
| Domínio | `features/<domínio>` (públicos) | `useSchedules`, `useConfirmSchedule`, `useCheckIn`, `useCareCase` |
| UI | `shared/ui` | `useAsyncAction`, `useConfirm`, `useDebouncedSearch` |

**Hooks de domínio da primeira versão (Alva):**

| Hook | Faz | Notas |
| --- | --- | --- |
| `useSession()` | usuário, igreja ativa, papel, `can(perm)` | Seletor fino; `can` só controla apresentação |
| `useSchedules(filters)` / `useSchedule(id)` | lista e detalhe | `select` deriva minhas, pendentes, no limite |
| `useConfirmSchedule()` / `useDeclineSchedule()` | mutations | Esperam a API e invalidam lista, detalhe e contador de limite |
| `useServiceLimits(memberId)` | uso vs. limite e exceções | Lê `limitUsage` calculado pela API |
| `useCheckInWindow(eventId)` | `{ state, opensAt, closesAt }` | Estado vem da API; o cliente só atualiza a contagem com o relógio do servidor |
| `useCheckIn(eventId)` | `checkIn()` com geolocalização | Feedback de raio no cliente; servidor decide |
| `useServiceRoster(eventId)` | equipe do culto com presença | Revalida ao focar e por "Atualizar" |
| `useCareCases()` / `useCareCase(id)` / `useScheduleCareMeeting()` | acompanhamento pastoral | Só em memória |
| `useBabyDedications()` / `useRequestBabyDedication()` | datas, vagas, solicitações | Vagas confirmadas pela API |
| `useEvents(month)` | eventos do mês | Prefetch do mês seguinte |
| `useNotifications()` | lista paginada + não lidas | Invalidada por push e por foco |
| `useChurchSwitch()` | troca a igreja ativa | Cancela consultas, limpa dados da igreja anterior, navega para o Início |

**Contrato de toda mutation de domínio (padrão, sem otimista):**

```ts
export function useConfirmSchedule() {
  const qc = useQueryClient();
  const { userId, churchId } = useSession(s => ({ userId: s.userId, churchId: s.churchId }));
  return useMutation({
    mutationKey: ['schedule', 'confirm'],
    mutationFn: (id: string) => api.schedules.confirm({ churchId, id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.schedules.all(userId, churchId) }),
  });
}
```

Otimista só quando aprovado caso a caso e reversível, documentado no hook. Pagamento, aprovação, exclusão e ações concorrentes nunca mostram sucesso antes da confirmação.

**Regras para escrever hooks:** uma responsabilidade por hook; sem `useEffect` para sincronizar dados; `useEffect` só para efeitos externos, sempre com limpeza; retornos estáveis; todo hook de domínio com teste (MSW + `renderHook` no web, Jest + RNTL no mobile).

## Resiliência

| Risco | Proteção | Para o usuário |
| --- | --- | --- |
| Erro de render | Error boundary por rota e por widget crítico | Só aquela área mostra "Algo deu errado · Tentar de novo" |
| Erro de rede ou de query | Erro inline, dados em cache continuam visíveis | Mensagem e botão de recarregar |
| Mutation falhou | Formulário preservado; erro no campo ou toast com "Tentar de novo" | Nada some; a pessoa corrige e reenvia |
| Sem rede | Ações que escrevem ficam desabilitadas com explicação | Banner offline; leitura do que já está em memória |
| Sessão expirada | Adaptador de autenticação renova a sessão uma vez; se falhar, volta ao login preservando a rota | Invisível na maioria dos casos |
| Troca de igreja no meio de uma requisição | Cancelamento por contexto + chave com igreja | Respostas antigas nunca aparecem na igreja errada |
| Resposta tardia | Chaves por contexto e cancelamento ao desmontar | Sem dado "pulando" na tela |
| Versão do app desatualizada | Janela de suporte definida no contrato de release | Tela "Atualize o Alva" no mobile |
| Memória no mobile | Paginação com limite de páginas + FlashList | Sem crescimento ilimitado |

**Relógio do servidor:** janelas de check-in e prazos usam a hora do servidor (offset medido no login); nunca o relógio do aparelho para regras.

**Observabilidade:** erros com contexto de rota, igreja e papel, sem dados pessoais. Ferramenta a definir no bootstrap.

## Mapa de funcionalidades

| Feature | Web (admin) | Mobile (membro / líder) | Atualização | Persistir em disco |
| --- | --- | --- | --- | --- |
| Login, primeiro acesso (OTP), esqueci a senha, seleção de igreja | Sim | Sim + splash; entrar com senha, código por e-mail, criar conta | — | Só preferências |
| Dashboard / Início | KPIs, pendências | Próximos eventos e escalas | Foco + após escrita | Não |
| Agenda e eventos | CRUD, calendário | Eventos | Foco + após escrita | Não |
| Escalas | Montagem, limites e exceções | Minhas escalas, disponibilidade, limite | Foco + push | Não |
| Check-in de serviço | Aba Check-in, líder marca presença | Check-in por geolocalização, equipe do culto | Foco + "Atualizar" | Não |
| Conteúdo / aulas | Biblioteca, upload | Consumo | Foco | Não (categorias como catálogo) |
| Acompanhamento pastoral | Casos, registro, agendar | Acompanhamento | Foco + push | **Nunca** |
| Discipulado | Grupos e encontros | Discipulado | Foco | Não |
| Kids | Salas, check-in / check-out | Responsáveis | Foco + "Atualizar" | Não |
| Apresentação de bebês | Datas, aprovação, certificado | Solicitação e acompanhamento | Foco + push | Não |
| Espaços e almoxarifado | Salas (uso fixo, calendário), reservas em etapas, empréstimos com aprovação | — | Foco + após escrita | Não (salas e categorias como catálogo) |
| Cafeteria e Restaurante | Itens, categorias, vendas e caixa diário vindos do sistema de vendas, ajustes de estoque, receitas no Financeiro | — | Foco + após escrita | Não (categorias como catálogo) |
| Financeiro | Lançamentos, relatórios | — | Foco | **Nunca** |
| Multi-igreja | Redes, igrejas, perfil institucional de cada igreja | Quem somos, secretaria, redes | Foco | Não |
| Notificações | Sino | Lista + push | Push + foco | Não |
| Meu perfil / Meus dados | Dados, acesso, preferências | Dados, família, caminhada | Após escrita | Só preferências |
| Visitante | — | Boas-vindas e acesso restrito | — | — |

**Assinaturas:** visão geral, clientes, assinaturas, planos, cobranças e pagamentos, vouchers, avisos aos produtos, auditoria, com Cmd+K e OTP de seis caixas; mesmas regras de estado e cache (cobranças e pagamentos nunca persistidos).

**Landing:** páginas públicas pré-renderizadas, planos e cadastro de igreja em etapas; sem sessão de usuário.

**Ordem sugerida de construção (Alva):** fundação (auth, sessão, tema, QueryClient, cliente gerado) → Agenda → Escalas → Check-in → Notificações → Acompanhamento e Discipulado → Kids → Apresentações → Conteúdo → Espaços e almoxarifado → Financeiro.

## Navegação, permissões e multi-igreja

**Rotas web (React Router, rotas lazy por domínio):**

- `/login`, `/first-access`, `/forgot-password`, `/churches`.
- `/:churchSlug/...` com menu lateral em acordeão. Segmentos em inglês (`schedules`, `schedules/:id?tab=check-in`, `care/:caseId`, `spaces/rooms/:id`), rótulos em português.
- Detalhes sempre com *Voltar* ao lado do breadcrumb.
- Guards de rota são experiência, não segurança: o servidor revalida toda operação.

**Rotas mobile (Expo Router):** `(auth)` → `(tabs)` com `home`, `calendar` (eventos · escalas · discipulado · acompanhamento), `notifications` e `more`; abas calculadas por papel; deep links `alva://schedule/{id}`, `alva://checkin/{eventId}` usados pelo push.

**Permissões:** vêm do servidor por igreja e por área (`schedules:edit`, `care:read`, `loans:approve`…). O cliente usa `can(perm)` e `<Can>` só para apresentação. Quem decide é o servidor.

| Papel | Web | Mobile |
| --- | --- | --- |
| Admin / pastor | Tudo | Tudo + Acompanhamento em Mais |
| Líder de ministério | Escalas e check-in do seu ministério; aprovar empréstimos se tiver a permissão | Equipe do culto, marcar presença |
| Membro | — | Agenda, escalas, acompanhamento próprio, apresentações, meus dados |
| Visitante | — | Boas-vindas, eventos públicos |

**Multi-igreja:** igreja ativa no Zustand e na URL (web: `churchSlug`). `useChurchSwitch()` cancela consultas, remove do cache os dados da igreja anterior e navega para o Início. Seletor de igreja sem blocos coloridos de sigla.

## Qualidade

| Tipo | Web / Landing | Mobile | Meta |
| --- | --- | --- | --- |
| Tipos | TypeScript `strict` + cliente gerado | TypeScript `strict` + cliente gerado | Zero `any` em `domain` e `data-access` |
| Unitário e hooks | Vitest + Testing Library + MSW | Jest + RNTL | Por risco; sem percentual como garantia |
| Componentes | Storybook + Testing Library | Storybook + RNTL | Todo componente de `shared/ui` com estados vazio, carregando, erro, sucesso, desabilitado |
| E2E | Playwright (fluxos críticos e regressão visual) | Maestro | Fluxos críticos no CI / antes de cada release |
| Acessibilidade | Verificação automática + revisão manual | Labels obrigatórios + revisão manual | Sem violações sérias |

Cenários obrigatórios de teste: troca de contexto, sessão expirada, resposta tardia, erro de validação, concorrência (`If-Match`) e isolamento de cache entre usuários e igrejas.

**CI por repositório:** lint → TypeScript strict → testes → build (Vite / EAS) → E2E. Geração do cliente a partir do OpenAPI publicado detecta quebra de contrato. Publicação de pacotes e automerge não são necessários.

## Requisitos para o alva-api

| Requisito | Detalhe | Por que o front precisa |
| --- | --- | --- |
| OpenAPI versionado | `openapi.yaml` publicado a cada release; CI detecta mudanças que quebram contrato | Clientes gerados em cada front |
| Coleções e erros padronizados | `items/page/pageSize/totalCount/totalPages` e `error.code/message/details` | Paginação e mensagens uniformes |
| Concorrência e idempotência | `If-Match`/ETag nas edições; `Idempotency-Key` nos comandos repetíveis | Evitar sobrescrever edição alheia e duplicar comandos |
| Campos derivados | `checkInWindow`, `limitUsage`, `availableSlots`, `permissions` calculados no servidor | Regras críticas com uma única implementação |
| Hora do servidor | Header `Date` em toda resposta | Offset do relógio do aparelho |
| Autenticação | Cookie HttpOnly/Secure com CSRF no web; tokens para o mobile; `401` diferente de `403` | Renovação de sessão sem deslogar quem só não tem acesso |
| Escopo por igreja | Rotas e permissões avaliadas por igreja e por área | Multi-igreja sem vazamento |
| Push sem conteúdo sensível | Push de acompanhamento pastoral e financeiro leva só ids | O app busca com autorização |
| Contrato de release do mobile | Versão mínima suportada e janela de compatibilidade | Apps antigos continuam nas lojas |

## Roadmap e decisões em aberto

| Fase | Entregas |
| --- | --- |
| 0. Fundação | Matriz de versões homologada; repositórios com estrutura de pastas, tema próprio, lint de camadas, cliente gerado, autenticação, sessão, QueryClient, Storybook e CI |
| 1. Núcleo do culto | Agenda, Escalas, Check-in, notificações e push |
| 2. Cuidado | Acompanhamento pastoral, Discipulado, Kids |
| 3. Vida da igreja | Apresentações, Conteúdo, Meu perfil, Multi-igreja |
| 4. Gestão | Espaços e almoxarifado, Cafeteria e Restaurante, Financeiro, relatórios |
| Paralelo | Landing (antes do lançamento) e Assinaturas (com o `assinaturas-api`) |

**Decisões em aberto:**

| Decisão | Opções | Recomendação |
| --- | --- | --- |
| Painéis ao vivo (check-in do culto, Kids) | Só foco + "Atualizar" · recarga periódica só nessa tela | Começar só com foco + "Atualizar"; recarga periódica local exige aprovação, pois o documento de arquitetura veda polling global |
| Gerador do cliente OpenAPI | Hey API · Orval · openapi-typescript + fetch | Escolher um só para os quatro fronts |
| Componentes do mobile | Próprios do zero · base de componentes nativos | Próprios sobre os tokens, com API igual à do web |
| Web do membro | Só admin na web · versão membro | Começar só admin |
| Geolocalização do check-in | Raio fixo · raio por igreja · QR como alternativa | Raio por igreja, QR do líder como plano B |
