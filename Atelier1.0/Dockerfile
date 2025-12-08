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

# healthcheck (optionnel)


CMD ["node",  "ServiceLayer/index.js"]
