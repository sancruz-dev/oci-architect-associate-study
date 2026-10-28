# OCI Study

Trilha de estudo para a certificação **Oracle Cloud Infrastructure Architect Associate**.
Cada seção é uma página com lições, diagramas, exemplos interativos e autotestes.
O progresso fica salvo no navegador (localStorage).

## Como rodar

Precisa de Node.js 18 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a pasta dist/
npm run preview    # serve o build de dist/
npm run typecheck  # só confere os tipos
```

O app usa `HashRouter` e `base: './'`, então a pasta `dist/` funciona em qualquer hospedagem estática
(GitHub Pages, Azure Static Web Apps, um servidor de arquivos) sem configurar redirecionamento.

## Como o progresso é calculado

Cada seção vale `número de lições + 1` pontos:

- cada lição marcada como lida vale 1 ponto;
- a skill check da Oracle vale 1 ponto, quando a maior nota registrada é de pelo menos 80%.

Seção de 3 lições = 4 pontos, 25% cada. A página inicial mostra o status (Não iniciada, Em andamento, Concluída,
Em breve), a porcentagem de cada seção e o progresso geral.

A regra fica em `src/core/progressMath.ts`. A nota mínima fica em cada seção (`skillCheck.passScore`).

## O que fica no localStorage

| Chave | Conteúdo |
|---|---|
| `oci-study:v1:progress` | lições lidas, respostas dos autotestes e notas das skill checks, por seção |
| `oci-study:v1:theme` | tema escolhido (`system`, `light` ou `dark`) |

O localStorage vale só para um navegador e some se você limpar os dados do site. Na página inicial, use
**Exportar progresso** para baixar um `.json` e **Importar progresso** para restaurar. Um arquivo que não segue o formato
é recusado, sem alterar o que já está salvo.

## Estrutura

```
src/
  core/                 regras sem interface
    types.ts              SectionDef, LessonDef, QuizItem, ProgressState
    storage.ts            localStorage que nunca lança erro
    progressStore.tsx     contexto + reducer do progresso, com validação ao ler e importar
    progressMath.ts       porcentagem e status de cada seção
    theme.tsx             tema claro, escuro ou do sistema
  components/           peças reutilizáveis, sem conteúdo de lições
    ui/                   Box, Callout, ChipGroup, Panel, TableScroll, CodeBlock, ProgressBar...
    lesson/               LessonLayout, LessonBlock, LessonScope
    quiz/                 Quiz, QuizQuestion
    section/              SectionPage, LessonTabs, LessonFooter, SkillCheckCard, SectionCard, BackupCard
    layout/               AppShell, SectionsMenu (painel lateral de seções), ThemeToggle
  sections/             o conteúdo do curso
    registry.ts           lista das seções, na ordem do menu
    section1/             Seção 1: lições, interativos, dados e autotestes
    section2/             Seção 2 (IAM Advanced): 7 lições, interativos, dados e autotestes
    section3/             Seção 3 (Networking - VCN): 13 lições, interativos, cálculo de CIDR e autotestes
  pages/                HomePage, SectionRoute, NotFoundPage
  styles/               tokens e CSS por responsabilidade
```

## Herança e componentização

React não usa herança de classes. A reutilização é por **composição**, que é o equivalente recomendado:

- `SectionPage` é a página-base de toda seção. Recebe um `SectionDef` (dados) e monta cabeçalho, abas, lição, rodapé e skill check.
  Uma seção nova não escreve página.
- `LessonLayout` é o esqueleto de toda lição. Cada lição o usa e só informa o conteúdo. Título, número e ids vêm do
  `LessonScope`, então as lições não recebem props.
- `ChipGroup` é o seletor base. Glossário, limites e a demonstração de policy com domain o especializam.
- `Box`, `Callout`, `Fact` e `PolicyLine` são blocos que as lições compõem.
- Os tipos (`SectionDef`, `LessonDef`, `QuizItem`) definem o contrato que toda seção segue.

## Menu de seções

A barra superior tem só a marca, o botão **Seções** e o seletor de tema, então ela não cresce com o número de seções.
O botão abre um painel lateral com a página inicial e todas as seções (número, título, status e porcentagem).

- Mostra "Seção N" ao lado do botão quando você está dentro de uma seção.
- Fecha com Esc, clique fora, botão Fechar ou ao navegar. O foco fica preso no painel e volta ao botão.
- A lista rola por dentro. Com mais de 8 seções aparece um campo de busca (número ou título). O limite fica em
  `SEARCH_FROM`, em `src/components/layout/SectionsMenu.tsx`.

## Seção 2 (IAM Advanced)

Baseada no índice "Identity and Access Management - Advanced" da Oracle University (na plataforma é a seção 3).
Itens "Demo:" e "Use-Case:" ficam de fora e as duas partes de IAM Policy Optimization viram uma lição.

| Lição | Id | Tempo na plataforma |
|---|---|---|
| Herança e anexação de policies em compartimentos | `heranca` | 7 min |
| Conditional Policies | `condicionais` | 7 min |
| Advanced Policies | `avancadas` | 6 min |
| Tag Based Access Control | `tbac` | 10 min |
| Network Sources | `network-sources` | 3 min |
| Dynamic Groups | `dynamic-groups` | 8 min |
| IAM Policy Optimization | `otimizacao` | 17 min (partes 1 e 2) |

## Como criar uma seção nova

1. Crie `src/sections/<nome>/lessons/` com um componente por lição. Cada um usa `LessonLayout`, `LessonBlock`
   e, no fim, `<Quiz items={...} />`.
2. Crie `src/sections/<nome>/index.ts` com um `SectionDef` (veja `section2/index.ts`).
3. Acrescente a seção em `src/sections/registry.ts`.
4. Pronto. A rota, o item do menu, o cartão da página inicial, a porcentagem e a tela de skill check já funcionam.

Para deixar uma seção como "em breve", use `comingSoon: true`, `lessons: []` e, se quiser, `planned` com o roteiro.

## Fontes

As fontes (Bricolage Grotesque, IBM Plex) vêm do Google Fonts pelo `index.html`. Sem internet, o app usa as fontes do sistema.
