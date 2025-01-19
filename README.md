# Projet Dockerisé : Backend Symfony (CLI) & Frontend React (Vite)

## Table des Matières
- [Projet Dockerisé : Backend Symfony (CLI) \& Frontend React (Vite)](#projet-dockerisé--backend-symfony-cli--frontend-react-vite)
  - [Table des Matières](#table-des-matières)
  - [Prérequis](#prérequis)
  - [Structure du Projet](#structure-du-projet)
  - [Installation](#installation)
    - [1. Cloner le Dépôt Git](#1-cloner-le-dépôt-git)
    - [2. Configurer les Variables d’Environnement](#2-configurer-les-variables-denvironnement)
    - [3. Construire et Lancer les Conteneurs Docker](#3-construire-et-lancer-les-conteneurs-docker)
  - [Accès aux Applications](#accès-aux-applications)
  - [Développement Collaboratif](#développement-collaboratif)
    - [Migrations](#migrations)
    - [Dépendances](#dépendances)
    - [Variables d’Environnement](#variables-denvironnement)
  - [Bonnes Pratiques Git](#bonnes-pratiques-git)
    - [Ne pas Committer les Dépendances Installées](#ne-pas-committer-les-dépendances-installées)
    - [Versionner les Fichiers Essentiels](#versionner-les-fichiers-essentiels)
  - [Résolution des Problèmes](#résolution-des-problèmes)
    - [Erreur PostgreSQL : Password non spécifié](#erreur-postgresql--password-non-spécifié)
    - [Erreur Backend : Répertoire non vide](#erreur-backend--répertoire-non-vide)
    - [Erreur Frontend : `package.json` introuvable](#erreur-frontend--packagejson-introuvable)
    - [Erreur Backend : Connexion à PostgreSQL](#erreur-backend--connexion-à-postgresql)
    - [Rien sur le Port 8000 (Symfony CLI écoute en localhost)](#rien-sur-le-port-8000-symfony-cli-écoute-en-localhost)
    - [Vérifiez les Logs des Conteneurs](#vérifiez-les-logs-des-conteneurs)
    - [Nettoyer le Cache Docker](#nettoyer-le-cache-docker)

---

## Prérequis

Avant de commencer, assurez-vous d’avoir installé :
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

---

## Structure du Projet

- **`backend/app`** : Contient le code du backend Symfony (ou peut être vide au premier démarrage pour initialiser un nouveau projet).
- **`backend/docker`** : Contient le `Dockerfile` et le script `entrypoint.sh` pour le backend.
- **`frontend/app`** : Contient le code du frontend React (ou peut être vide au premier démarrage).
- **`frontend/docker`** : Contient le `Dockerfile` et le script d’entrypoint pour le frontend.
- **`docker-compose.yml`** : Orchestre l’ensemble des conteneurs (base de données, backend, frontend, etc.).

---

## Installation

### 1. Cloner le Dépôt Git

```bash
git clone https://votre-repo.git
cd votre-repo
```

### 2. Configurer les Variables d’Environnement

Créez un fichier `.env` à la racine du projet (copie de `.env.example`) et personnalisez :

```bash
cp .env.example .env
```

Exemple de contenu `.env` :

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mydb

# pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

# Frontend
VITE_API_URL=http://localhost:8000/api
```

> **Sécurité** : ne commitez pas vos identifiants sensibles si votre dépôt est public.

### 3. Construire et Lancer les Conteneurs Docker

Lancez la commande :

```bash
docker-compose up --build
```

- **Premier Démarrage** : Si `backend/app` ou `frontend/app` sont vides, les scripts d’entrypoint initieront les projets Symfony/React.
- **Démarrages Suivants** : Vos projets existants seront montés en volume et Docker ne recréera pas tout.

---

## Accès aux Applications

Une fois les conteneurs démarrés :

- **Backend (Symfony CLI)** : [http://localhost:8000](http://localhost:8000)  
  (Le conteneur exécute `symfony serve --listen=0.0.0.0:8000`).  

- **Frontend (Vite - Développement)** : [http://localhost:3000](http://localhost:3000)  
  (Si vous avez lancé le serveur de développement Vite dans le conteneur `frontend`).

- **pgAdmin** : [http://localhost:5050](http://localhost:5050)  
  (Utilisez vos identifiants définis dans `.env`).

---

## Développement Collaboratif

### Migrations

Créez vos migrations dans le conteneur `backend` :

```bash
docker-compose exec backend bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

Commitez ensuite le fichier créé dans `migrations/` :

```bash
git add .
git commit -m "Ajout nouvelle migration"
```

### Dépendances

- **Backend (Symfony)** :  
  ```bash
  docker-compose exec backend composer install
  ```
- **Frontend (Node/Vite)** :  
  ```bash
  docker-compose exec frontend npm install
  ```

### Variables d’Environnement

Chacun configure son fichier `.env` local (non commité) pour adapter la base de données, l’e-mail pgAdmin, etc.

---

## Bonnes Pratiques Git

### Ne pas Committer les Dépendances Installées

Ignorez `vendor/` (backend) et `node_modules/` (frontend) :

```gitignore
# Symfony / Composer
backend/app/vendor/
backend/app/.env.local

# React / Node
frontend/app/node_modules/
frontend/app/.env.local

# Logs / Docker
*.log
docker-compose.override.yml

# Build files
frontend/app/dist/
```

### Versionner les Fichiers Essentiels

- `composer.json` / `composer.lock` (backend)  
- `package.json` / `package-lock.json` (frontend)  
- Configs : `.env.example`, `tailwind.config.js`, etc.

---

## Résolution des Problèmes

### Erreur PostgreSQL : Password non spécifié

```log
db | Error: Database is uninitialized and superuser password is not specified.
```
- Vérifiez votre fichier `.env` pour `POSTGRES_PASSWORD`.
- Supprimez et recréez les conteneurs si nécessaire.

### Erreur Backend : Répertoire non vide

```log
backend | Project directory "/var/www/." is not empty.
```
- Assurez-vous que `backend/app` soit vide lors du premier lancement si vous voulez générer un squelette Symfony.
- Sinon, retirez la logique d’initialisation automatique.

### Erreur Frontend : `package.json` introuvable

```log
frontend | npm error enoent Could not read package.json
```
- Vérifiez que `frontend/app` est vide si vous souhaitez créer un projet React avec Vite.
- Sinon, retirez la logique d’initialisation automatique.

### Erreur Backend : Connexion à PostgreSQL

```log
backend | SQLSTATE[08006] [7] could not translate host name "db"
```
- Assurez-vous que le service `db` est sur le même réseau Docker et que la variable `DATABASE_URL` pointe bien vers `db:5432`.

### Rien sur le Port 8000 (Symfony CLI écoute en localhost)

```log
[WARNING] Please note that the Symfony CLI only listens on 127.0.0.1 by default
```
- Ajoutez `--allow-all-ip` ou `--listen=0.0.0.0:8000` à la commande `symfony serve`.  
- Exemples :  
  ```bash
  symfony serve --port=8000 --allow-all-ip --no-tls
  ```
  ou
  ```bash
  symfony serve --listen=0.0.0.0:8000 --no-tls
  ```

### Vérifiez les Logs des Conteneurs

```bash
docker-compose logs db
docker-compose logs backend
docker-compose logs frontend
```

### Nettoyer le Cache Docker

```bash
docker builder prune
```
ou, pour tout réinitialiser :

```bash
docker-compose down --rmi all --volumes --remove-orphans
docker-compose up --build
```
