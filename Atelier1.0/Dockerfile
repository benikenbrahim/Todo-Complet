# === backend/Dockerfile ===
# image de base (ex: Node 18)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# copy source
# ===== BASE NODE =====
FROM node:18

# ===== WORKDIR =====
WORKDIR /app

# ===== COPY PACKAGE.JSON =====
COPY package*.json ./

# ===== INSTALL DEPENDENCIES =====
RUN npm ci

# ===== COPY PROJECT =====
COPY . .
# expose port que ton app utilise
EXPOSE 5000
# healthcheck (optionnel)

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost:5000/health || exit 1

# start
CMD ["node",  "ServiceLayer/index.js"]
