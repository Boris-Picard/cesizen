FROM node:23-alpine AS builder
WORKDIR /app
COPY ./frontend/app/package*.json ./
RUN npm install
COPY ./frontend/app/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
