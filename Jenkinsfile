def kubernetes_config = """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: eclipsetheia/theia-blueprint
    tty: true
    resources:
      limits:
        memory: "2Gi"
        cpu: "1"
      requests:
        memory: "2Gi"
        cpu: "1"
    command:
    - cat
    volumeMounts:
    - mountPath: "/home/jenkins"
      name: "jenkins-home"
      readOnly: false
    - mountPath: "/.yarn"
      name: "yarn-global"
      readOnly: false   
  volumes:
  - name: "jenkins-home"
    emptyDir: {}
  - name: "yarn-global"
    emptyDir: {}
"""

pipeline {
    agent {
        kubernetes {
            label 'emfcloud-agent-pod'
            yaml kubernetes_config
        }
    }
    
    options {
        buildDiscarder logRotator(numToKeepStr: '15')
    }
    
    environment {
        YARN_CACHE_FOLDER = "${env.WORKSPACE}/yarn-cache"
        SPAWN_WRAP_SHIM_ROOT = "${env.WORKSPACE}"
    }

    stages {
        stage('Build') {
            steps {
                container('node') {
                    withCredentials([string(credentialsId: "github-bot-token", variable: 'GITHUB_TOKEN')]) {
                        sh "rm -rf ${YARN_CACHE_FOLDER}"
                        sh "yarn --ignore-engines --unsafe-perm"
                    }
                }
            }
        }

        stage('Codechecks ESLint') {
            steps {
                container('node') {
                    sh "yarn lint -o eslint.xml -f checkstyle"
                }
            }
        }

        stage('Deploy (master only)') {
            when { branch 'master' }
            steps {
                build job: 'deploy-jsonforms-property-view-npm', wait: false
            }
        }
    }

    post {
        always {
            // Record & publish ESLint issues
            recordIssues enabledForFailure: true, publishAllIssues: true, aggregatingResults: true, 
            tools: [esLint(pattern: 'node_modules/**/*/eslint.xml')], 
            qualityGates: [[threshold: 1, type: 'TOTAL', unstable: true]]
        }
    }
}
