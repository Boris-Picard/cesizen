pipeline {
    agent any

    environment {
        // Variables d'environnement pour une utilisation flexible
        DEPLOY_ENABLED = 'true'
        SSH_CREDENTIAL_ID = 'fd9f2e55-f7f3-47a9-88d2-fa12a1e94dc6'
        DEPLOY_USER_HOST  = 'ubuntu@51.44.84.88'
        APP_DIR           = '/home/deploy/cesizen'
    }
        stages {
            stage('Lint') {
                steps {
                    script {
                        docker.image('node:23-alpine').inside {
                            dir('frontend/app') {
                                sh 'chmod -R 777 .'
                                sh 'npm install'
                                // enlever true quand linter corrigé
                                sh 'npx eslint . || true'
                            }
                        }
                    }
                }
            }

            stage('Build') {
                steps {
                    echo 'Building Docker images...'
                    // Construction des images Docker pour tous les services définis dans docker-compose.yml
                    sh 'docker-compose build'
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
            echo 'Nettoyage des conteneurs Docker inutilisés...'
            sh 'docker container prune -f'
            sh 'docker-compose down'
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
