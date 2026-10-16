# Alva Web · protótipo

`main.js` é só um **manifesto**: uma lista de `//#include ./arquivo.js` na ordem de carga, mais o `render();` final. O plugin [`../vite-include.js`](../vite-include.js) troca cada linha pelo conteúdo do arquivo, então o resultado é o mesmo de um arquivo único (um só escopo, tudo compartilhado). Não há `import`/`export` entre os arquivos.

## Regras

- **A ordem do manifesto importa** só para o que executa ao carregar (`const` de dados, `Object.assign(A, …)`, patches como `foodMovements=function…`). Corpo de função é resolvido na chamada.
- Edite o arquivo da tela. O `npm run dev` recarrega a página ao salvar qualquer arquivo incluído.
- Tela nova: crie `screens-<nome>.js` e inclua a linha em `main.js` (antes dos `screens-ext-*` se não for um patch).
- Dois arquivos só se tocam em: `NAV` e o roteamento do `render()` (ambos em `core.js`).

## Mapa (linhas do `main.js` anterior à divisão)

| Arquivo | Linhas originais | Conteúdo |
|---|---|---|
| `core.js` | 1–291 | ícones, helpers, `S`, `NAV`, sidebar, `render` |
| `screens-membros.js` | 292–607 | Pessoas › Membros |
| `screens-integracao.js` | 608–830 | Pessoas › Integração |
| `screens-discipulado.js` | 831–1045 | Cuidado › Discipulado |
| `screens-acompanhamento.js` | 1046–1121 | Cuidado › Acompanhamento |
| `screens-oracao.js` | 1122–1230 | Cuidado › Pedidos de oração |
| `screens-casas.js` | 1231–1418 | Comunidade › Casas |
| `screens-redes.js` | 1419–1466 | Comunidade › Redes de célula |
| `screens-ministerios.js` | 1467–1612 | Comunidade › Ministérios |
| `screens-kids.js` | 1613–1738 | Kids |
| `screens-admin.js` | 1739–2197 | Administração |
| `screens-acesso.js` | 2198–2301 | Entrar, recuperar, convite, escolher/cadastrar igreja |
| `screens-agenda.js` | 2302–2720 | Cultos, Eventos, Calendário, Inscrições |
| `screens-escalas.js` | 2721–3220 | Agenda › Escalas |
| `screens-bebes.js` | 3221–3380 | Apresentação de Bebês |
| `screens-espacos.js` | 3381–3788 | Reservas e Salas |
| `screens-comunicacao.js` | 3789–4104 | Notícias, Push, Banners, Transmissões |
| `screens-conteudo.js` | 4105–4465 | Pregações, Músicas, Jornadas |
| `screens-financeiro.js` | 4466–4714 | Financeiro |
| `screens-almox.js` | 4715–4970 | Almoxarifado |
| `screens-perfil.js` | 4971–5042 | Meu perfil |
| `core-ui.js` | 5043–5130 | botões assíncronos, padrão de lista, toast, paleta de comandos |
| `screens-food.js` | 5131–5365 | Cafeteria, Restaurante e Loja (dados e ações) |
| `core-actions.js` | 5366–5404 | dispatcher `A` e eventos da paleta |
| `screens-ext-1.js` … `-4.js` | 5405–6860 | camadas de ajustes sobre telas anteriores (a redistribuir) |
| `screens-evento-ingressos.js` | 6861–7077 | Eventos: ingressos e compras |
| `screens-evento-checkin.js` | 7078–7251 | Eventos: check-in, financeiro, VEM |
| `screens-financeiro-eventos.js` | 7252–7301 | Financeiro: eventos pagos |
| `screens-secretaria.js` | 7302–7807 | Secretaria |
| `screens-relatorios.js` | 7808–8141 | Relatórios |
| `screens-ajuda.js` | 8142–8473 | Central de ajuda |
| `screens-ext-5.js`, `-6.js` | 8474–9189 | camadas de ajustes (tabelas, paginação, Lojas) |

Os `screens-ext-*` são trechos que sobrescrevem ou estendem telas definidas antes; ficaram onde estavam para não mudar a ordem de execução. A ideia é movê-los, aos poucos, para o arquivo da tela dona.
