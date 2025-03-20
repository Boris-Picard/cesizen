pipeline {
    agent any

    environment {
        // Définissez ici les variables d'environnement nécessaires,
        // par exemple si vous utilisez un fichier .env, assurez-vous qu'il est présent
        COMPOSE_FILE = 'docker-compose.yml'
    }
    stages {
        stage('Build') {
            steps {
                // Construire les images définies dans le docker-compose (si besoin)
                sh "docker-compose -f ${COMPOSE_FILE} build"
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Exécution de docker-compose dans un container qui dispose de docker-compose
                    docker.image('docker/compose:latest').inside('-v /var/run/docker.sock:/var/run/docker.sock') {
                        sh "docker-compose -f docker-compose.yml up -d"
                    }
                }
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
