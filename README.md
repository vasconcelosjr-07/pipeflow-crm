# PipeFlow CRM

CRM de vendas simples e rápido para times e freelancers. Pipeline Kanban, gestão de leads, registro de atividades e dashboard de métricas.

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Copiar e preencher as variáveis de ambiente
cp .env.local.example .env.local

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (banco PostgreSQL + autenticação)
- **Stripe** (pagamentos e assinaturas)
- **Resend** (e-mails transacionais)

## Plano de desenvolvimento

Veja [docs/PLAN.md](docs/PLAN.md) para o plano completo dividido em milestones.
