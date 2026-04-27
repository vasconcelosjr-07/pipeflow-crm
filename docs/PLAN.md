# PLAN.md — Plano de execução do PipeFlow CRM

> Plano dividido em **milestones**. Estratégia: construir a **interface primeiro com dados mocados** (entender UX, ganhar velocidade), depois conectar o **backend** (Supabase, Stripe, Resend) e por fim **deploy**.
>
> Cada milestone tem:
> - **Branch** (Git): nome sugerido para isolar o trabalho
> - **Objetivo**: o que esse milestone entrega de valor
> - **Entregas**: checklist do que precisa ficar pronto
> - **Commit final**: mensagem sugerida ao mergear/fechar a branch
>
> Convenção de commits: estilo [Conventional Commits](https://www.conventionalcommits.org/) em português curto. Ex.: `feat: criar layout autenticado com sidebar`.

---

## FASE 1 — FUNDAÇÃO

### Milestone 1 — Setup do projeto
- **Branch**: `chore/setup-projeto`
- **Objetivo**: Repositório inicializado com Next.js 14, TypeScript, Tailwind, shadcn/ui e estrutura de pastas pronta para escalar.
- **Entregas**:
  - [x] `npx create-next-app@latest` com TypeScript, Tailwind, App Router, ESLint
  - [x] Configurar `tsconfig.json` em modo estrito (`strict: true`)
  - [x] Instalar e inicializar shadcn/ui (`npx shadcn@latest init`)
  - [x] Configurar paleta de cores e fontes (Inter + Geist Mono) no `tailwind.config.ts`
  - [x] Criar estrutura de pastas: `app/`, `components/`, `lib/`, `hooks/`, `types/`
  - [x] Criar `.env.local.example` com placeholders das chaves
  - [x] Criar `.gitignore` (incluir `.env.local`)
  - [x] Inicializar repositório Git e fazer primeiro push para GitHub
  - [x] README curto explicando como rodar (`npm install` + `npm run dev`)
- **Commit final**: `chore: inicializar projeto com next.js, tailwind e shadcn/ui`

---

### Milestone 2 — Design system base
- **Branch**: `feat/design-system`
- **Objetivo**: Componentes base do shadcn/ui instalados e um Storybook visual simples (`/showcase`) para validar a identidade visual antes de construir telas.
- **Entregas**:
  - [ ] Instalar componentes shadcn/ui: `button`, `input`, `label`, `card`, `dialog`, `dropdown-menu`, `table`, `form`, `badge`, `avatar`, `tabs`, `select`, `toast`
  - [ ] Criar página `/showcase` (apenas em dev) mostrando todos os componentes com variações
  - [ ] Definir tokens de cor no CSS (variáveis para light/dark mode)
  - [ ] Criar componente `Logo` do PipeFlow
  - [ ] Configurar `lucide-react` para ícones
- **Commit final**: `feat: adicionar design system com shadcn/ui e showcase`

---

## FASE 2 — INTERFACE COM DADOS MOCADOS

> Toda essa fase usa dados de mentira em arquivos `lib/mocks/*.ts`. Foco em UX, navegação e visual. Backend entra na Fase 3.

### Milestone 3 — Landing page
- **Branch**: `feat/landing-page`
- **Objetivo**: Página pública de apresentação do produto, responsiva, com CTA para signup.
- **Entregas**:
  - [ ] Rota `app/(marketing)/page.tsx` com layout próprio
  - [ ] Seção Hero com headline, subheadline e CTA "Começar grátis"
  - [ ] Seção Funcionalidades (cards com ícone + título + descrição)
  - [ ] Seção Pricing com 2 planos (Free e Pro R$49/mês)
  - [ ] Seção CTA final + Footer
  - [ ] Header público com logo e botão "Entrar"
  - [ ] Responsividade mobile (testar < 640px)
- **Commit final**: `feat: criar landing page com hero, features, pricing e cta`

---

### Milestone 4 — Telas de autenticação (visuais)
- **Branch**: `feat/telas-auth`
- **Objetivo**: Telas de login, signup e recuperar senha bonitas e funcionais visualmente (sem backend ainda — só validação de form).
- **Entregas**:
  - [ ] Layout `app/(auth)/layout.tsx` (centralizado, com logo)
  - [ ] Tela `/signup` com form (nome, e-mail, senha) + validação `zod`
  - [ ] Tela `/login` com form (e-mail, senha)
  - [ ] Tela `/forgot-password`
  - [ ] Estados de loading e erro nos forms
  - [ ] Links cruzados (login ↔ signup ↔ forgot)
- **Commit final**: `feat: criar telas de signup, login e recuperar senha`

---

### Milestone 5 — Layout autenticado (shell do app)
- **Branch**: `feat/shell-app`
- **Objetivo**: Estrutura visual da área logada com sidebar, header, workspace switcher e navegação entre seções.
- **Entregas**:
  - [ ] Layout `app/(app)/layout.tsx` com sidebar fixa + área de conteúdo
  - [ ] Sidebar com navegação: Dashboard, Leads, Pipeline, Configurações
  - [ ] Workspace switcher no topo da sidebar (dropdown com workspaces mocados)
  - [ ] Avatar do usuário no canto inferior + menu (perfil, sair)
  - [ ] Header com breadcrumb da página atual
  - [ ] Sidebar colapsável em telas pequenas (mobile drawer)
- **Commit final**: `feat: criar shell do app com sidebar e workspace switcher`

---

### Milestone 6 — Lista e detalhe de Leads (mocados)
- **Branch**: `feat/leads-ui`
- **Objetivo**: CRUD visual de leads com listagem, busca, filtros e página de detalhe — tudo com dados de mentira.
- **Entregas**:
  - [ ] Mock `lib/mocks/leads.ts` com 20+ leads de exemplo
  - [ ] Página `/leads` com tabela (nome, e-mail, empresa, status, responsável)
  - [ ] Busca por nome/e-mail (filtro client-side)
  - [ ] Filtros por status e responsável
  - [ ] Botão "Novo lead" abre dialog com form
  - [ ] Página `/leads/[id]` com perfil completo + abas (Visão geral, Atividades)
  - [ ] Estados de vazio ("Nenhum lead ainda") e loading skeleton
- **Commit final**: `feat: criar listagem e detalhe de leads com dados mocados`

---

### Milestone 7 — Pipeline Kanban (mocado, com drag-and-drop)
- **Branch**: `feat/pipeline-kanban`
- **Objetivo**: Board Kanban funcional com drag-and-drop entre colunas, ainda sem persistência real.
- **Entregas**:
  - [ ] Instalar `@dnd-kit/core` e `@dnd-kit/sortable`
  - [ ] Mock `lib/mocks/negocios.ts` com negócios distribuídos nas 6 etapas
  - [ ] Página `/pipeline` com 6 colunas (Novo Lead → Fechado Perdido)
  - [ ] Card de negócio: título, valor (R$), lead, responsável, prazo
  - [ ] Drag-and-drop entre colunas (estado em memória)
  - [ ] Soma de valores no topo de cada coluna
  - [ ] Botão "Novo negócio" abre dialog
  - [ ] Scroll horizontal em mobile
- **Commit final**: `feat: criar pipeline kanban com drag-and-drop`

---

### Milestone 8 — Timeline de Atividades (mocada)
- **Branch**: `feat/atividades-timeline`
- **Objetivo**: Aba de atividades no detalhe do lead com timeline cronológica e formulário para registrar nova atividade.
- **Entregas**:
  - [ ] Mock `lib/mocks/atividades.ts` (ligação, e-mail, reunião, nota)
  - [ ] Componente `Timeline` com ícone por tipo de atividade
  - [ ] Form para registrar nova atividade (tipo, descrição, data)
  - [ ] Ordenação cronológica decrescente
  - [ ] Estado vazio amigável
- **Commit final**: `feat: criar timeline de atividades no detalhe do lead`

---

### Milestone 9 — Dashboard de métricas (mocado)
- **Branch**: `feat/dashboard-metricas`
- **Objetivo**: Página inicial do app com cards de KPIs e gráfico de funil.
- **Entregas**:
  - [ ] Página `/dashboard` com 4 cards: total de leads, negócios abertos, valor do pipeline, taxa de conversão
  - [ ] Instalar `recharts`
  - [ ] Gráfico de funil de vendas (FunnelChart)
  - [ ] Lista "Meus negócios com prazo próximo"
  - [ ] Loading skeleton e estado vazio
- **Commit final**: `feat: criar dashboard com kpis e gráfico de funil`

---

### Milestone 10 — Configurações (workspace, time, plano)
- **Branch**: `feat/settings-ui`
- **Objetivo**: Telas de configurações com abas para gerenciar workspace, membros e plano (UI mocada).
- **Entregas**:
  - [ ] `/settings/workspace`: nome do workspace, logo
  - [ ] `/settings/members`: tabela de membros + botão "Convidar"
  - [ ] Dialog de convite (e-mail + papel: Admin/Membro)
  - [ ] `/settings/billing`: plano atual, botão "Fazer upgrade"
  - [ ] `/settings/profile`: dados do usuário
- **Commit final**: `feat: criar telas de configurações de workspace, time e plano`

---

## FASE 3 — BACKEND E INTEGRAÇÕES

### Milestone 11 — Supabase setup + schema + RLS
- **Branch**: `feat/supabase-schema`
- **Objetivo**: Banco de dados modelado, com migrations versionadas e Row Level Security ligado em todas as tabelas.
- **Entregas**:
  - [ ] Criar projeto no Supabase
  - [ ] Configurar Supabase CLI local (`supabase/migrations/`)
  - [ ] Tabelas: `workspaces`, `workspace_members`, `profiles`, `leads`, `deals`, `activities`, `subscriptions`
  - [ ] Enums: `deal_stage`, `activity_type`, `member_role`
  - [ ] Policies RLS por `workspace_id` em todas as tabelas
  - [ ] Trigger `updated_at` automático
  - [ ] Seed mínimo para teste local
  - [ ] Adicionar variáveis no `.env.local.example`
- **Commit final**: `feat: criar schema do banco com migrations e rls`

---

### Milestone 12 — Autenticação real (Supabase Auth)
- **Branch**: `feat/auth-supabase`
- **Objetivo**: Substituir telas de auth mocadas por login/signup real com sessão persistente.
- **Entregas**:
  - [ ] Clients Supabase em `lib/supabase/{server,browser,middleware}.ts`
  - [ ] Middleware Next.js para proteger rotas `(app)/*`
  - [ ] Server Action de signup (cria `auth.user` + `profile` + `workspace` inicial)
  - [ ] Server Action de login
  - [ ] Server Action de logout
  - [ ] Recuperação de senha por e-mail
  - [ ] Redirecionamentos pós-login para `/dashboard`
- **Commit final**: `feat: integrar autenticação real com supabase`

---

### Milestone 13 — Workspaces e convites (Resend)
- **Branch**: `feat/workspaces-convites`
- **Objetivo**: Multi-tenant funcional: criar workspaces, alternar entre eles, convidar membros por e-mail.
- **Entregas**:
  - [ ] Criar workspace ao fazer signup (workspace pessoal)
  - [ ] Workspace switcher real lendo `workspace_members` do usuário
  - [ ] Página `/settings/members` lendo do banco
  - [ ] Rota `app/api/invites/route.ts` que cria registro pendente + dispara e-mail via Resend
  - [ ] Template de e-mail de convite (HTML simples)
  - [ ] Página `/invites/[token]` para aceitar convite
  - [ ] Verificação de papel (Admin vs Membro) em ações sensíveis
- **Commit final**: `feat: implementar workspaces multi-tenant com convites por e-mail`

---

### Milestone 14 — Leads conectados ao banco
- **Branch**: `feat/leads-backend`
- **Objetivo**: Substituir mocks de leads por dados reais com Server Components + Server Actions.
- **Entregas**:
  - [ ] Server Component `/leads` consultando Supabase (filtrado por `workspace_id`)
  - [ ] Server Action `criarLead`, `atualizarLead`, `excluirLead` com validação `zod`
  - [ ] Filtros e busca usando query params (`?status=`, `?q=`)
  - [ ] Página de detalhe `/leads/[id]` real
  - [ ] Tratamento de erros amigável + `toast` de sucesso
  - [ ] `revalidatePath` após mutações
- **Commit final**: `feat: conectar leads ao supabase com server actions`

---

### Milestone 15 — Pipeline e Atividades conectados
- **Branch**: `feat/pipeline-atividades-backend`
- **Objetivo**: Drag-and-drop persistido no banco e timeline de atividades real.
- **Entregas**:
  - [ ] Server Action `moverNegocio(dealId, novaEtapa)` com optimistic UI
  - [ ] Server Actions de CRUD de negócios e atividades
  - [ ] Realtime opcional (Supabase Realtime) para sincronizar entre abas
  - [ ] Validação: ao mover para "Fechado Ganho/Perdido", registrar data
  - [ ] Atividades reais na timeline do lead
- **Commit final**: `feat: persistir pipeline e atividades no banco`

---

### Milestone 16 — Dashboard com dados reais
- **Branch**: `feat/dashboard-backend`
- **Objetivo**: KPIs e gráfico do dashboard agregando dados reais do workspace.
- **Entregas**:
  - [ ] Queries de agregação (contagem de leads, soma de pipeline, taxa de conversão)
  - [ ] View ou função SQL para o funil
  - [ ] Cache leve com `revalidate` por tempo
  - [ ] Estado vazio ("Cadastre seu primeiro lead")
- **Commit final**: `feat: dashboard agregando dados reais do workspace`

---

### Milestone 17 — Monetização com Stripe
- **Branch**: `feat/stripe-billing`
- **Objetivo**: Plano Free com limites + upgrade para Pro via Stripe Checkout, ativação automática por webhook.
- **Entregas**:
  - [ ] Criar produtos e preços no Stripe (Free e Pro R$49/mês)
  - [ ] Server Action `criarSessaoCheckout` retornando URL do Stripe
  - [ ] Webhook `app/api/stripe/webhook/route.ts` (verificar assinatura, idempotência por `event.id`)
  - [ ] Eventos tratados: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
  - [ ] Tabela `subscriptions` atualizada por workspace
  - [ ] Bloqueios no plano Free: 50 leads, 2 colaboradores (verificação no servidor antes de mutar)
  - [ ] Botão "Gerenciar assinatura" abrindo Customer Portal
  - [ ] Documentar uso de `stripe listen` em dev
- **Commit final**: `feat: integrar stripe checkout, webhook e limites do plano free`

---

## FASE 4 — POLISH E DEPLOY

### Milestone 18 — Onboarding e estados vazios
- **Branch**: `feat/onboarding`
- **Objetivo**: Primeira experiência caprichada para novo usuário.
- **Entregas**:
  - [ ] Tour rápido pós-signup (3-4 passos)
  - [ ] Estados vazios com call-to-action em todas as listas
  - [ ] Dados de exemplo opcionais no primeiro workspace
- **Commit final**: `feat: adicionar onboarding e estados vazios`

---

### Milestone 19 — Acessibilidade, performance e mobile
- **Branch**: `chore/polish`
- **Objetivo**: App utilizável em qualquer dispositivo, acessível e rápido.
- **Entregas**:
  - [ ] Auditoria Lighthouse (perf, a11y, best practices > 90)
  - [ ] Foco visível, labels em forms, contraste AA
  - [ ] Testar todas as telas em mobile (320px–768px)
  - [ ] `next/image` em todas as imagens
  - [ ] Loading states e error boundaries em rotas
- **Commit final**: `chore: melhorias de acessibilidade, performance e responsividade`

---

### Milestone 20 — Deploy em produção
- **Branch**: `chore/deploy`
- **Objetivo**: App rodando em domínio público com Stripe e Resend em modo produção.
- **Entregas**:
  - [ ] Conectar repositório à Vercel
  - [ ] Configurar variáveis de ambiente em Vercel (Supabase, Stripe, Resend)
  - [ ] Migrar Supabase para projeto de produção (rodar migrations)
  - [ ] Configurar webhook do Stripe apontando para a URL de produção
  - [ ] Configurar domínio do Resend (DNS verificado)
  - [ ] Smoke test completo: signup → criar lead → mover negócio → upgrade → cancelar
  - [ ] README atualizado com instruções de deploy
- **Commit final**: `chore: configurar deploy em produção na vercel`

---

## Resumo do fluxo

```
Fase 1 (Fundação)            → M1, M2
Fase 2 (Interface mocada)    → M3, M4, M5, M6, M7, M8, M9, M10
Fase 3 (Backend real)        → M11, M12, M13, M14, M15, M16, M17
Fase 4 (Polish + Deploy)     → M18, M19, M20
```

**Por que interface antes de backend?**
1. Validamos UX rapidamente, sem ficar travados em modelagem de banco.
2. É mais fácil ajustar layout sem dados reais para perder.
3. Quando o backend entra, a gente já sabe exatamente quais dados cada tela precisa — economiza retrabalho.

**Como usar este plano:**
- Trabalhe um milestone por vez, na sua branch dedicada.
- Marque os checkboxes conforme entrega.
- Ao terminar: PR → merge na `main` → próxima branch.
- Se um milestone ficar grande demais, quebre em sub-tarefas (não em sub-branches).
