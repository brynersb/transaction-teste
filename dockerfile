# Etapa 1: build da aplicação
FROM node18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/main"]
