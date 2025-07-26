pipeline {
  agent any

  environment {
    DEPLOY_USER = 'ec2-user' // or ubuntu
    DEPLOY_HOST = '54.152.19.225'
    DEPLOY_PATH = '/var/www/app'
    SSH_KEY_CRED_ID = 'ec2-natours-ssh-key' // Jenkins SSH key credential ID
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Deploy to EC2 natours server') {
      steps {
        sshagent (credentials: [SSH_KEY_CRED_ID]) {
          sh """
            ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST '
              mkdir -p $DEPLOY_PATH &&
              rm -rf $DEPLOY_PATH/*'
            scp -r * $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/
            ssh $DEPLOY_USER@$DEPLOY_HOST '
              cd $DEPLOY_PATH &&
              npm install &&
              pm2 restart all || pm2 start server.js'
          """
        }
      }
    }
  }
}
