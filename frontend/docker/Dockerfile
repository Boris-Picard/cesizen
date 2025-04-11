FROM node:23-alpine AS builder
WORKDIR /app
COPY app/package*.json ./
ENV NODE_ENV=development
RUN npm i
COPY app/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
