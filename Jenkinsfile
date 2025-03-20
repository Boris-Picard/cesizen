pipeline {
    agent any

    environment {
        // Variables d'environnement pour une utilisation flexible
        DEPLOY_ENABLED = 'false'
        SSH_CREDENTIAL_ID = 'git'
        DEPLOY_USER_HOST  = 'deploy@staging.myserver.com'  // Valeur fictive pour l'instant
        APP_DIR           = '/home/deploy/myapp'
    }
        stages {
            stage('Lint') {
                steps {
                    script {
                        docker.image('node:23-alpine').inside("-v \$WORKSPACE:\$WORKSPACE -w \$WORKSPACE") {
                            sh 'chmod -R 777 .'
                            sh 'npm install'
                            sh 'npx eslint .'
                        }
                    }
                }
            }

            stage('Build') {
                steps {
                    echo 'Building Docker images...'
                    // Construction des images Docker pour tous les services définis dans docker-compose.yml
                    sh 'docker compose --build'
                }
            }

        // Exemple d'étape de tests unitaires à ajouter ultérieurement
        // stage('Test') {
        //     steps {
        //         echo 'Running unit tests...'
        //         sh 'npm test'  // ou la commande de tests adaptée (pytest, etc.)
        //     }
        // }

        stage('Deploy') {
            when {
                expression { env.DEPLOY_ENABLED == 'true' }
            }
            steps {
                echo 'Deploying services...'
                sshagent(credentials: [env.SSH_CREDENTIAL_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER_HOST} << 'EOF'
                        cd ${APP_DIR} || exit 1
                        docker-compose up -d --remove-orphans
                        EOF
                    """
                }
            }
        }
        }

    post {
        always {
            echo 'Cleaning up...'
            deleteDir()
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
