pipeline {
  // setting variables used for the build
  environment {
    registry = "rajithr007/"
    registryCredential = 'Jenkins-dockerhub'
    dockerImageFE = ''
    // dockerImageBE  = ''
  }  
  
  // Setting the agent for the pipeline
  agent any
    
  //tools {nodejs "node"}
    
  stages {
    stage("verify tools"){
      steps{
        bat '''
        git --version
        docker version
        // docker info
        // docker compose version
        npm version
        '''
      }
    }

    stage('Git') {
      steps {
        //git branch: 'develop', credentialsId: 'jenkins-gitab', url: 'http://192.168.1.11/devops/devops-sample-app.git'
        git branch:'develop',url: 'https://github.com/RajithRajan/devops-sample-app.git'
      }
    }
    
    stage('Build UI Angular') {
        steps {
            // dir("client\\angular-app") { 
            // Installed angulat cli locally with in the project
              bat 'npm install @angular/cli --save-dev'
            // Install the the dependency packages needed for the app  
              bat 'npm install'
            // run the build which create a dir ./dist/  
              bat 'npm run build'
            // }
        }
    }
     
//    stage('Test Angular') {
//        steps {
//            dir("client\\angular-app") { 
//                bat 'node test'
//            }            
//        }
//    }
    

//    stage('Test Node') {
//        steps {
//            dir("server") { 
//                catchError {
//                    bat 'node test'
//                }
//            }            
//        }
//    }

    // stage('Build Backend NodeJS') {
    //     steps { 
    //         dir("server") {
    //           // Install the the dependency packages needed for the app  
    //             bat 'npm install' 
    //           // run the build   
    //             //bat 'npm run build'
    //         }
    //     }    
    // }  
    stage('SonarQube analysis Proj') {
      steps {
        script {
          def scannerHome = tool 'sonarscan';
          withSonarQubeEnv('sonar') {
                bat "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=meanstack -Dsonar.projectName=devops-sample-app"
          }
        }
      }
    }

    // Build the docker image of frontend app with tag rajithr007/devops-sample-app-ui:50 if this is 50th build
    stage('Build docker for UI') {
      steps {
        script {
            // dir("client\\angular-app") {
            dockerImageFE = docker.build registry + "devops-sample-app-ui" + ":$BUILD_NUMBER"
            // }    
        }
      }
    }       

    // Build the docker image of backend app with tag rajithr007/devops-sample-app-be:50 if this is 50th build
    // stage('Build docker for Angular') {
    //   steps {
    //     script {
    //         dir('server') {
    //             dockerImageBE = docker.build registry + "devops-sample-app-be" + ":$BUILD_NUMBER"
    //         } 
    //     }
    //   }
    // }  

    // Push both the images to docker hub since registry name is blank using crediential defined in enviornment
    stage('Publish docker to docker hub') {
      steps {
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImageFE.push()
            // Adding additional latest tag to the image
            dockerImageFE.push("latest")
            // dockerImageBE.push()
            // // Adding additional latest tag to the image
            // dockerImageBE.push("latest")
          }
        }
      }
    }   

    stage('Deploy to K8S') {
      steps {
        script {
            // Running docker apply on kubernetes.yml file with 'kubeconfig.yml' credential 'kube'
            kubernetesDeploy(configs: "kubernetes.yml", kubeconfigId: "kube")
            // run the below command to remove the service & deployment before running the pipeline again
            // kubectl delete svc,deploy frontend backend mongodb-devops
        }
      }
    }

  } //end of stages
    
    post { 
        always { 
            //Remove Unused docker images
            bat "docker rmi ${registry}devops-sample-app-ui:$BUILD_NUMBER"
            // bat "docker rmi ${registry}devops-sample-app-be:$BUILD_NUMBER"
        }
        success {
            echo "=============================================="
            echo '************ Job completed successfully!'
            echo "=============================================="
        }        
    }  // end of post 
} // end of pipeline
