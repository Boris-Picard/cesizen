pipeline {
    agent any

    environment {
        // Définissez ici les variables d'environnement nécessaires,
        // par exemple si vous utilisez un fichier .env, assurez-vous qu'il est présent
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupérer votre code depuis votre dépôt Git
                git 'https://github.com/Boris-Picard/cesizen'
            }
        }
        stage('Build') {
            steps {
                // Construire les images définies dans le docker-compose (si besoin)
                sh "docker-compose -f ${COMPOSE_FILE} build"
            }
        }
        stage('Deploy') {
            steps {
                // Lancer les containers en arrière-plan
                sh "docker-compose -f ${COMPOSE_FILE} up -d"
            }
        }
        stage('Test') {
            steps {
                // Vous pouvez ajouter ici des tests, par exemple vérifier l'état de vos services
                sh "docker-compose -f ${COMPOSE_FILE} ps"
            }
        }
    }

    post {
        always {
            // Optionnel : arrêter et nettoyer les containers après la build
            sh "docker-compose -f ${COMPOSE_FILE} down"
        }
    }
}
