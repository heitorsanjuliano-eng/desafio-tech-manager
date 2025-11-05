
Teddy Tech Manager – Desafio Técnico
Visão Geral

O Teddy Tech Manager é um MVP full-stack desenvolvido como parte do desafio técnico da Teddy Open Finance.
Ele consiste em um sistema de gerenciamento de clientes com:

Autenticação via e-mail/senha com JWT

CRUD de clientes com soft delete

Dashboard/Admin com totais, últimos clientes e gráficos

Contador de acessos em detalhes de cliente

Auditoria com timestamps

Observabilidade mínima via logs estruturados e healthcheck

O projeto é estruturado como monorepo Nx.dev, contendo dois apps principais:

Backend: NestJS + TypeORM + PostgreSQL

Frontend: React + Vite + TypeScript

Estrutura do Repositório

<img width="183" height="321" alt="image" src="https://github.com/user-attachments/assets/f650ae83-8f33-450c-a6e5-52238ce62f92" />

Cada app possui docker-compose.yml, .env e README.md próprios, permitindo execução isolada.

Arquitetura

Substitua diagrama.png pela imagem do seu diagrama de arquitetura.

Visão local:

Frontend: http://localhost:5173

Backend API: http://localhost:3000

PostgreSQL: localhost:5432

Redis (opcional): localhost:6379

Arquitetura proposta para cloud (AWS):

Backend e Frontend em containers Docker

Banco de dados gerenciado (RDS)

Load balancer + escalabilidade automática

Observabilidade via logs estruturados e métricas Prometheus

Instalação e Execução Local

Clone o repositório:

git clone https://github.com/heitorsanjuliano-eng/desafio-tech-manager.git
cd desafio-tech-manager


Configure variáveis de ambiente em apps/backend/.env e apps/frontend/.env (exemplo já incluso).

Execute os containers:

docker compose up --build


Acesse:

Frontend: http://localhost:5173

Swagger Backend: http://localhost:3000/docs

Endpoints Principais (Backend)
Método	Rota	Descrição
POST	/auth/login	Autenticação via JWT
POST	/clients	Criar cliente (auth)
GET	/clients	Listar clientes (auth)
GET	/clients/:id	Detalhe + contador (auth)
PUT	/clients/:id	Atualizar cliente (auth)
DELETE	/clients/:id	Soft delete (auth)
GET	/healthz	Healthcheck da API
GET	/metrics	Métricas para Prometheus
Fluxos (Frontend)

Login → redireciona para Dashboard

Dashboard → exibe cards de totais, gráficos e últimos clientes

Clientes → Listar, Criar, Editar, Excluir (soft delete), Detalhes com contador

Observabilidade

Logs estruturados JSON no backend

Healthcheck: /healthz

Métricas Prometheus: /metrics

Possível integração futura: traces com OpenTelemetry

Testes & Qualidade

Testes unitários obrigatórios (frontend e backend)

Testes E2E (diferencial)

ESLint + Prettier configurados

Commits semânticos

CI/CD via GitHub Actions (pipelines separados para frontend e backend)

Escalabilidade e Cloud

Backend e frontend containerizados → fácil deploy em cloud

Banco de dados gerenciado (Postgres)

Redis opcional para caching e contadores

Possível integração com AWS ECS/Fargate ou EKS para escalabilidade automática

Observações

Usuário seed do sistema: admin@teddy.com / password

Arquitetura modular e desacoplada para facilitar manutenção e expansão

Documentação Swagger disponível em /docs
