
# ====================================
# Etapa 1 - Build
# ====================================
FROM node:18-alpine AS builder

# Dependências do sistema para bcrypt e builds
RUN apk add --no-cache python3 make g++ bash

WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências para instalar
COPY apps/backend/package*.json ./

# Instala todas as dependências (incluindo bcrypt)
RUN npm install

# Copia o restante do código
COPY apps/backend/. .

# Build se necessário (por exemplo TypeScript)
RUN npm run build

# ====================================
# Etapa 2 - Produção
# ====================================
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copia apenas node_modules e build final
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY apps/backend/package*.json ./

# Definição da porta e comando padrão
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]