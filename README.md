<!-- README gerado/atualizado conforme solicitação. -->

# 📅 Ignite Call
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma)

Aplicação de agendamento integrada ao Google Calendar

**Nome do projeto:** Ignite Call

**Descrição / Sobre o projeto**

Ignite Call é uma aplicação de agendamento construída com Next.js + TypeScript. O sistema permite que profissionais definam disponibilidade, conectem seu Google Calendar via OAuth e recebam agendamentos com criação automática de eventos (incluindo link de reunião). O backend usa Prisma com PostgreSQL para persistência e `next-auth` para autenticação.

Principais objetivos:
- Automatizar marcação de reuniões
- Evitar conflitos de horários
- Integrar agendamentos com Google Calendar

---

**O que o projeto faz / Problema que resolve**

- Usuários criam perfil e conectam seu Google Calendar.
- Usuários definem intervalos de disponibilidade por dia da semana.
- Visitantes veem uma página pública do usuário e podem agendar horários livres.
- Ao confirmar um agendamento, o sistema persiste o agendamento e cria um evento no Google Calendar do usuário, incluindo solicitação de conferência (Google Meet).

---

**Tecnologias utilizadas**

- Linguagens: TypeScript, JavaScript
- Framework: Next.js
- Biblioteca de UI: `@ignite-ui/react`
- Autenticação: `next-auth` (adapter Prisma)
- ORM: `prisma` / `@prisma/client`
- Banco de dados: PostgreSQL (ex.: Neon, Supabase ou local)
- Integração Google: `googleapis`
- Requests / cache: `axios`, `@tanstack/react-query`
- Formulários e validação: `react-hook-form`, `zod`, `@hookform/resolvers`
- Datas/horários: `dayjs` (+ plugin UTC)

As dependências estão no `package.json`.

---

**Funcionalidades (principais features)**

- Cadastro de usuário e edição de perfil
- Conexão OAuth com Google Calendar
- Definição de janelas de disponibilidade semanais
- Página pública para agendamento por username (`/schedule/[username]`)
- Verificação de horários já agendados e bloqueio de horários cheios
- Criação automática de eventos no Google Calendar com participantes e conferenceData

---

**O que o usuário consegue fazer**

- Criar conta e configurar perfil
- Conectar/desconectar Google Calendar
- Definir horários disponíveis por dia da semana
- Receber agendamentos e ver histórico (na base)

---

**Como executar o projeto (local)**

Pré-requisitos:
- Node.js (recomenda-se v18+)
- npm ou yarn
- PostgreSQL (local ou hosted)
- Credenciais Google OAuth (Client ID e Client Secret)

Passos:

```powershell
# clonar
git clone https://github.com/ValdeciNovak/ignite-call.git
cd ignite-call

# instalar dependências
npm install

# criar/ajustar .env com as variáveis necessárias (veja seção abaixo)

# gerar Prisma Client
npx prisma generate

# (opcional) aplicar migrações em dev
# npx prisma migrate dev --name init

# rodar em desenvolvimento
npm run dev
```

Abra `http://localhost:3000` no navegador.

---

**Variáveis de ambiente (exemplos)**

Crie um arquivo `.env` na raiz com as variáveis abaixo (substitua pelos seus valores):

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DATABASE_DIRECT_URL="postgresql://..."
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="some-random-secret"
```

Observação: não comite segredos no repositório.

---

**Arquitetura / Estrutura do projeto**

- `prisma/` — schema e migrações do Prisma (`schema.prisma` contém os modelos: User, Account, Session, UserTimeInterval, Scheduling)
- `src/pages/` — páginas Next.js e APIs em `src/pages/api`
	- `src/pages/api/users` — endpoints para criação de usuário, horários, perfil, disponibilidade e agendamentos
	- `src/pages/schedule/[username]` — páginas públicas de agendamento
- `src/lib/` — helpers e configurações (ex.: `prisma.ts`, `axios.ts`, `google.ts`, `react-query.ts`)
- `src/components/` — componentes reutilizáveis (Calendar, etc.)

Padrões aplicados:
- SSG para páginas públicas de agendamento (`getStaticPaths`/`getStaticProps`)
- API routes do Next.js para lógica do backend
- Prisma como camada de dados
- `react-query` para fetch e cache no cliente

---

**Endpoints principais (resumo)**

- `POST /api/users` — criar usuário
- `POST /api/users/time-intervals` — salvar disponibilidade (usuário autenticado)
- `PUT /api/users/profile` — atualizar perfil (usuário autenticado)
- `GET /api/users/[username]/availability?date=YYYY-MM-DD` — retorna horários possíveis e disponíveis
- `GET /api/users/[username]/blocked-dates?year=YYYY&month=M` — retorna dias bloqueados do mês
- `POST /api/users/[username]/schedule` — criar agendamento (visitante)

---

**Trabalhando com fusos horários**

- O projeto usa `dayjs` e o plugin `utc` em pontos onde é necessário garantir consistência entre front e back. Verifique `src/pages/schedule/[username]/ScheduleForm/*` e o endpoint `POST /api/users/[username]/schedule` para conversões aplicadas.

---

**Aprendizados e desafios**

- Integração OAuth com Google e criação de conferenceData para reuniões.
- Modelagem de disponibilidade e cálculo de horários bloqueados (consulta SQL raw para calcular dias cheios).
- Garantir consistência de datas/horários entre cliente e servidor (UTC vs local).

---

**Próximos passos / Melhorias**

- Implementar testes automatizados para endpoints críticos.
- Melhor tratamento de tokens do Google (refresh/erro/retry).
- Notificações por e-mail ao agendar/cancelar eventos.
- UI: histórico de agendamentos, cancelamento e re-agendamento.

---

**Screenshots / Demonstração**

Adicione screenshots em `public/screenshots` ou link para deploy aqui (ex.: Vercel). Se desejar, eu posso gerar GIFs com fluxo de agendamento.

---

**Autor**

- Valdeci Novak — https://github.com/ValdeciNovak

---

Se quiser, eu também posso:
- adicionar um arquivo `.env.example` com placeholders
- adicionar badges e link de deploy no topo do README
- gerar imagens/GIFs de demonstração e adicioná-los ao README

Diga qual próxima adição prefere e eu faço.
