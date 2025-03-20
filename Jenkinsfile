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
                script {
                    // Exécution de la commande docker-compose build dans un container dédié
                    docker.image('docker/compose:latest').inside('-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE') {
                        sh "docker-compose -f docker-compose.yml build"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.image('docker/compose:latest').inside('-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE') {
                        sh "docker-compose -f docker-compose.yml up -d"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                docker.image('docker/compose:latest').inside('-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE') {
                    sh "docker-compose -f docker-compose.yml down"
                }
            }
        }
    }

}
