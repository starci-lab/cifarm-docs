---
title: "Build Using Kaniko"
sidebar_position: 1
description: "Build Using Kaniko"
---
# Rest API Gateway Build Using Kanaiko
### Set environments
Begin by configuring the environment variables needed for Docker authentication
```bash
export DOCKER_SERVER="https://index.docker.io/v1/"  
export DOCKER_USERNAME="cifarm"  
export DOCKER_PASSWORD="*****"  
export DOCKER_EMAIL="cifarm.starcilab@gmail.com"  
```
### Remote Installation
Before proceeding with the installation, check if the cifarm Helm repository is already added. If it’s not, the script will add it for you:
```bash
# Check if the 'cifarm' repository is already added
if helm repo list | grep -q "^cifarm" 
then
    # If the 'cifarm' repository is already in the list, print a message and update the repository
    echo "Repository 'cifarm' is already added. Updating..."
    helm repo update cifarm
else
    # If the 'cifarm' repository is not in the list, add it and update the repository
    echo "Repository 'cifarm' is not added. Adding now..."
    helm repo add cifarm https://starci-lab.github.io/cifarm-k8s/charts
    helm repo update cifarm
fi
```
To install the Rest API Gateway using Helm with the Docker authentication and image settings provided through environment variables:
```bash
# Install
helm install rest-api-gateway-build cifarm/build \
    --namespace build \
    --set imageCredentials.registry=$DOCKER_SERVER \
    --set imageCredentials.username=$DOCKER_USERNAME \
    --set imageCredentials.password=$DOCKER_PASSWORD \
    --set imageCredentials.email=$DOCKER_EMAIL \
    --set image.repository="cifarm/rest-api-gateway" \
    --set image.tag="latest" \
    --set image.dockerfile="./apps/rest-api-gateway/Dockerfile" \
    --set image.context="git://github.com/starci-lab/cifarm-containers" \
    --set resources.requests.cpu="50m" \
    --set resources.requests.memory="100Mi" \
    --set resources.limits.cpu="500m" \
    --set resources.limits.memory="1Gi"
```
This will deploy the Rest API Gateway, configuring it with the required Docker image and resource limits as per the provided settings
### Local Installation
If you prefer to run the installation locally, clone the repository first:
```bash
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s
```
Then, build and install the service
```bash    
helm install rest-api-gateway-build ./charts/repo/build \
    --namespace build \
    --set imageCredentials.registry=$DOCKER_SERVER \
    --set imageCredentials.username=$DOCKER_USERNAME \
    --set imageCredentials.password=$DOCKER_PASSWORD \
    --set imageCredentials.email=$DOCKER_EMAIL \
    --set image.repository="cifarm/rest-api-gateway" \
    --set image.tag="latest" \
    --set image.dockerfile="./apps/rest-api-gateway/Dockerfile" \
    --set image.context="git://github.com/starci-lab/cifarm-containers" \
    --set resources.requests.cpu="50m" \
    --set resources.requests.memory="100Mi" \
    --set resources.limits.cpu="500m" \
    --set resources.limits.memory="1Gi"
```
#### Verify Pod Status
To monitor the status of the Kaniko build process, you can check the logs and ensure everything is running smoothly:
```bash
# Monitor the build logs to watch the process in real-time
kubectl logs rest-api-gateway-build-kaniko --namespace build -f

# Check if the pod build process has completed successfully
kubectl get pods --namespace build

# Inspect the secrets related to the build process
kubectl get secret rest-api-gateway-build-secret --namespace build
kubectl describe secret rest-api-gateway-build-secret --namespace build
```
This section helps you verify whether the build is progressing correctly, monitor the logs, and check any related secrets that might be created during the process.
#### Once the build is complete, you can delete the pod and uninstall the Helm release
```bash
helm uninstall rest-api-gateway-build --namespace build
```