FROM node:23-alpine AS development

WORKDIR /app

# Installer Bash et Git si nécessaire
RUN apk add --no-cache bash git

# Copier le script d’entrypoint depuis docker/
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copier le code frontend
COPY app/ /app

# Définir l’entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Exposer le port Vite
EXPOSE 3000

# Commande pour démarrer le serveur de développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
