# === backend/Dockerfile ===
# image de base (ex: Node 18)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# copy source
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# expose port que ton app utilise
EXPOSE 5000
# healthcheck (optionnel)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost:5000/ || exit 1

# start
CMD ["node",  "ServiceLayer/index.js"]
