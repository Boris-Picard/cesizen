FROM node:23-alpine AS builder
WORKDIR /app
COPY app/ /app
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
