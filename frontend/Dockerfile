# === frontend/Dockerfile ===
# 1) build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build    # create-react-app -> builds into /app/build

# 2) production image
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# optional: custom nginx config
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
