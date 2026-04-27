# PipeFlow CRM — Briefing do projeto

## Visão geral
SaaS web de CRM de vendas multi-empresa. O coração do produto é um **pipeline Kanban** simples e rápido para PMEs, freelancers e times de vendas, com gestão de leads, registro de atividades, dashboard de métricas e monetização via assinatura. Inspirado no Pipedrive (UX) e HubSpot (ecossistema), mas focado em simplicidade e modelo freemium acessível.

> Documento completo de requisitos: [docs/PRD.md](docs/PRD.md).
> Plano de execução por milestones: [docs/PLAN.md](docs/PLAN.md).

## Perfil do usuário do projeto
Profissional não técnico aprendendo desenvolvimento web. Explicar cada passo de forma didática, em **português**, como se estivesse ensinando alguém de 15 anos. Evitar jargões; quando inevitáveis, explicar rapidamente. Sempre que aplicar uma boa prática, dizer qual é e por quê.

## Stack técnica
- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript 5
- **Estilo**: Tailwind CSS + shadcn/ui
- **Banco + Auth**: Supabase (PostgreSQL com Row Level Security)
- **Pagamentos**: Stripe (Checkout + Webhooks + Customer Portal)
- **E-mail transacional**: Resend (convites de colaboradores)
- **Drag-and-drop**: @dnd-kit (Kanban)
- **Gráficos**: Recharts (dashboard / funil de vendas)
- **Deploy**: Vercel (app) + Supabase (DB)
- **Versionamento**: Git + GitHub

## Estrutura de pastas (proposta)
```
pipeflow-crm/
├── app/                        # App Router do Next.js
│   ├── (marketing)/            # rotas públicas (landing page)
│   │   └── page.tsx
│   ├── (auth)/                 # login, signup, recuperar senha
│   ├── (app)/                  # área autenticada
│   │   ├── dashboard/
│   │   ├── leads/
│   │   ├── pipeline/
│   │   ├── settings/
│   │   └── layout.tsx          # sidebar + workspace switcher
│   ├── api/
│   │   ├── stripe/webhook/     # webhook do Stripe
│   │   └── invites/            # envio de convites via Resend
│   └── layout.tsx
├── components/
│   ├── ui/                     # componentes shadcn/ui
│   ├── kanban/                 # board, coluna, card
│   ├── leads/                  # formulários, tabela, timeline
│   └── dashboard/              # cards de métricas, gráfico de funil
├── lib/
│   ├── supabase/               # clients (server, browser, admin)
│   ├── stripe/                 # client + helpers de checkout
│   ├── resend/                 # client de e-mail
│   └── utils.ts
├── hooks/                      # hooks reutilizáveis
├── types/                      # tipos TypeScript globais
├── supabase/
│   ├── migrations/             # SQL de schema e RLS
│   └── functions/              # Edge Functions (ex.: stripe-webhook)
├── docs/
│   ├── PRD.md
│   └── PLAN.md
├── public/
├── .env.local.example
├── CLAUDE.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Convenções de código
- **Idioma**: nomes de funções, variáveis e comentários em **português**. Verbos no infinitivo: `buscarLeads`, `moverNegocio`, `registrarAtividade`.
- **TypeScript estrito**: `strict: true` no `tsconfig.json`. Sem `any` sem justificativa.
- **Server Components por padrão**, só usar `"use client"` quando precisar de interatividade/estado/hooks.
- **`async/await` com `try/catch`** em toda chamada externa (Supabase, Stripe, Resend).
- **Validação de entrada** com `zod` em formulários e rotas de API.
- **Sem comentários redundantes**: comentar apenas o "porquê" quando não for óbvio.
- **Uma responsabilidade por arquivo**. Componentes pequenos e reutilizáveis.
- **RLS sempre ligado** em todas as tabelas — nunca confiar só na camada de aplicação.
- **Variáveis sensíveis** apenas em `.env.local` (nunca commitadas). Documentar em `.env.local.example`.

## Identidade visual
**Tom**: profissional, limpo, focado em produtividade. Inspiração no Pipedrive (clareza visual) e Linear (densidade informacional elegante).

**Paleta sugerida**
- Primária: `#2563EB` (azul confiança / ação)
- Secundária: `#0EA5E9` (azul claro / acentos)
- Sucesso (Fechado Ganho): `#10B981`
- Perigo (Fechado Perdido): `#EF4444`
- Alerta (Negociação): `#F59E0B`
- Neutros: escala de cinza Tailwind (`slate-50` a `slate-900`)
- Fundo do app: `#F8FAFC` / Fundo dark: `#0F172A`

**Tipografia**
- Família: **Inter** (UI) + **Geist Mono** (números/valores)
- Hierarquia: títulos `font-semibold`, corpo `font-normal`, valores monetários `tabular-nums`

**Componentes**
- Base: **shadcn/ui** (Radix por baixo) — botões, dialog, dropdown, table, form
- Cards de Kanban: arredondamento `rounded-lg`, sombra sutil `shadow-sm`, hover com `shadow-md`
- Densidade média (não tão compacta quanto Linear, não tão espaçada quanto HubSpot)

**Iconografia**
- **lucide-react** (já integrado ao shadcn/ui)

## Boas práticas que vamos seguir sempre
1. **Mensagens de erro amigáveis em português** — nunca jogar stacktrace na tela do usuário.
2. **Estados de carregamento e vazio** visíveis em toda lista/tela.
3. **Acessibilidade**: HTML semântico, labels em forms, foco visível, contraste AA.
4. **Responsivo**: mobile-first, testar em telas pequenas.
5. **Isolamento multi-tenant**: toda query filtra por `workspace_id` + RLS no banco.
6. **Idempotência em webhooks** do Stripe (verificar `event.id` antes de processar).
7. **Commits pequenos e focados**, mensagens descritivas em português.

## O que evitar
- Adicionar bibliotecas pesadas sem justificativa — preferir o que já está na stack.
- Lógica de negócio em Client Components quando puder ficar no servidor.
- Confiar apenas em validação de frontend — sempre validar no servidor/banco.
- Usar `service_role` do Supabase fora de rotas de servidor confiáveis.
- Hard-code de IDs de plano, preços ou URLs — usar variáveis de ambiente.

## Milestones de desenvolvimento (alto nível)
1. **Setup**: Next.js + Tailwind + shadcn/ui + Supabase conectado
2. **Auth + Workspaces**: signup, login, criar workspace, convidar membros (Resend)
3. **Leads**: CRUD completo + listagem com busca/filtros + página de detalhe
4. **Pipeline Kanban**: colunas, cards, drag-and-drop, persistência
5. **Atividades**: timeline (ligação, e-mail, reunião, nota)
6. **Dashboard**: métricas + gráfico de funil
7. **Monetização**: Stripe Checkout + Webhook + limites do Free
8. **Landing page**: hero, features, pricing, CTA
9. **Onboarding + polish**: tour inicial, estados vazios, mobile

## Como rodar (depois do setup)
```bash
npm install
cp .env.local.example .env.local   # preencher chaves
npm run dev
```

## Referências
- Next.js App Router: https://nextjs.org/docs/app
- Supabase + RLS: https://supabase.com/docs/guides/auth/row-level-security
- Stripe Checkout: https://stripe.com/docs/payments/checkout
- shadcn/ui: https://ui.shadcn.com
- @dnd-kit: https://dndkit.com
- Recharts: https://recharts.org
