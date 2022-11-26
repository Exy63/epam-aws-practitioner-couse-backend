# Base
FROM node:16-alpine AS base

# Dependencies
FROM base AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build
FROM dependencies AS build
WORKDIR /app
COPY . .
RUN npm run build

# release
FROM node:16-alpine AS release

COPY --from=dependencies /app/package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist

USER node 
EXPOSE 4000

CMD ["node", "dist/main.js"]
