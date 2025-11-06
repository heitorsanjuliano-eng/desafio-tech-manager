

# Desafio Técnico – Tech Manager | Teddy Open Finance

## Visão Geral

Este projeto é um MVP full-stack de um sistema de clientes com autenticação, CRUD, dashboard/admin básico, pronto para rodar localmente via Docker. O repositório está organizado como **monorepo Nx.dev**, contendo frontend e backend separados.

O objetivo é demonstrar:
- Arquitetura modular e escalável.
- Boas práticas de DevOps e observabilidade.
- Funcionalidades essenciais de gestão de clientes.

---

## Estrutura do Repositório

desafio-tech-manager/
├── apps/
│ ├── frontend/
│ │ ├── Dockerfile
│ │ ├── .env
│ │ ├── README.md
│ │ └── src/
│ │ └── ... (código React + Vite + TS)
│ └── backend/
│ ├── Dockerfile
│ ├── .env
│ ├── README.md
│ └── src/
│ └── ... (código NestJS + TypeORM)
├── docs/
│ └── architecture.png
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md


---

## Tecnologias

**Frontend:**
- React + Vite + TypeScript
- Roteamento, formulários com validação e UI responsiva
- Testes unitários (diferencial: E2E)
- Docker + docker-compose

**Backend:**
- NestJS modular
- TypeORM + PostgreSQL
- JWT para autenticação
- Swagger em `/docs`
- Logs estruturados (JSON)
- Healthcheck em `/healthz`
- Docker + docker-compose
- Validação com class-validator/Zod

**Monorepo Nx:**
- Apps organizados com Nx
- Pipelines separados para build e testes
- CI/CD via GitHub Actions

---

## Escopo Funcional (MVP)

**Autenticação:**
- Login com e-mail/senha usando JWT

**CRUD de Clientes:**
- Criar, listar, editar, excluir (soft delete)
- Detalhes do cliente com contador de acessos
- Auditoria com timestamps

**Dashboard/Admin:**
- Totais
- Últimos clientes cadastrados
- Gráfico de clientes

---

## Endpoints Backend

| Método | Endpoint            | Descrição                       |
|--------|------------------|---------------------------------|
| POST   | /auth/login       | Autenticação                    |
| POST   | /clients          | Criação de cliente (auth)       |
| GET    | /clients          | Listagem de clientes (auth)     |
| GET    | /clients/:id      | Detalhe + contador (auth)       |
| PUT    | /clients/:id      | Atualização (auth)              |
| DELETE | /clients/:id      | Soft delete (auth)              |
| GET    | /healthz          | Healthcheck                     |
| GET    | /docs             | Swagger UI                      |

---

## Instruções para rodar localmente

1. Clone o repositório:
```bash
git clone https://github.com/heitorsanjuliano-eng/desafio-tech-manager.git
cd desafio-tech-manager

2. Suba os containers com Docker Compose:

docker compose up --build

3. Acesse a aplicação:

Frontend: http://localhost:5173

Backend: http://localhost:3000

Swagger: http://localhost:3000/docs

Usuário seedado automaticamente:

Email: admin@teddy.com
Senha: password

## Observabilidade

Logs estruturados em JSON

Endpoints /healthz e /metrics (Prometheus exposition format)

Possibilidade de integração futura com traces (OpenTelemetry/X-Ray)

Documentação no README explicando a importância das práticas


## Diagrama da Arquitetura

![Diagrama da Arquitetura](./docs/architecture.png)

graph TD
    Browser[Browser / User Interface\nReact + Vite + TS] -->|HTTP (JWT)| Frontend[Frontend App\nLogin / Dashboard / Clients Pages]
    Frontend -->|REST API (JSON)| Backend[NestJS Backend\nModules: Auth, Clients, Health\nJWT Auth, Soft Delete, Auditoria]
    Backend -->|TypeORM Queries| Postgres[(Postgres Database)\nTables: Users, Clients\nSoft Delete + Timestamps]]
    Backend -->|Logs estruturados (JSON)| Logs[Logs & Metrics]
    Backend -->|Endpoint /healthz| HealthCheck[Healthcheck]
    Backend -->|Endpoint /metrics| Prometheus[Prometheus Metrics]
    subgraph "CI/CD Pipeline (GitHub Actions)"
        FE_Workflow[Frontend Workflow\nBuild / Test / Deploy Docker]
        BE_Workflow[Backend Workflow\nBuild / Test / Deploy Docker]
        FE_Workflow --> Frontend
        BE_Workflow --> Backend
    end
    subgraph "Local Dev Environment (Docker Compose)"
        FE_Container[Frontend Container (nginx:alpine)]
        BE_Container[Backend Container (Node/NestJS)]
        DB_Container[Postgres Container]
        FE_Container --> Frontend
        BE_Container --> Backend
        DB_Container --> Postgres
    end
    subgraph "Cloud Deployment (AWS)"
        ALB[Application Load Balancer]
        EC2_Frontend[EC2 / Fargate Frontend]
        EC2_Backend[EC2 / Fargate Backend]
        RDS[Amazon RDS (Postgres)]
        ALB --> EC2_Frontend
        ALB --> EC2_Backend
        EC2_Backend --> RDS
    end


## Escalabilidade

Frontend e backend containerizados para deploy em cloud

Arquitetura modular e separação de responsabilidades

Pipelines CI/CD independentes para frontend e backend

Banco PostgreSQL isolado via container, pronto para replicação


## Testes & Qualidade

Este projeto segue práticas de qualidade e padronização de código alinhadas às exigências do desafio técnico.

✅ Testes Unitários

Backend: configurado com Jest e @nestjs/testing, incluindo testes de serviços e cobertura via npm run test:coverage.

Frontend: configurado com Jest + React Testing Library, garantindo renderização correta dos principais componentes.

Cobertura de código validada automaticamente nos pipelines do GitHub Actions.

🧰 Ferramentas e Padrões

ESLint + Prettier: garantem padronização de estilo e qualidade de código.

Commits semânticos: estrutura de mensagens seguindo o padrão Conventional Commits.

CI/CD: Workflows separados para Frontend e Backend utilizando Nx + GitHub Actions, com execução automática de testes e build.

Testes E2E: podem ser adicionados como diferencial com Cypress ou Playwright.


### Desafio concluído por: Heitor San Juliano
