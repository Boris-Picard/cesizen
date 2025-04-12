FROM node:23-alpine AS builder
WORKDIR /app
COPY app/package*.json ./
ENV NODE_ENV=development
RUN npm i
COPY app/ ./
RUN npm run build
