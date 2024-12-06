---
title: "Build"
sidebar_position: 1
description: This section guides you through building the Rest Api Gateway in your Kubernetes environment using Helm.
---
# Rest API Gateway Build
## Introduction
In this section, we provide a step-by-step guide to building and deploying the REST API Gateway in your Kubernetes environment. This service acts as a central entry point for managing API requests and routing them to the appropriate services within your application. The guide includes detailed instructions for configuring the Helm repository, setting up namespaces, defining necessary environment variables, and deploying the service using Helm charts to ensure efficient and reliable API management.

## Steps
### Set environments
```bash
export DOCKER_SERVER="https://index.docker.io/v1/"
export DOCKER_USERNAME="cifarm"
export DOCKER_PASSWORD="*****"
export DOCKER_EMAIL="cifarm.starcilab@gmail.com"
```

### Excute scripts
#### 1. Install (Remote)
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

### Install
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
#### 2. Install (Local)
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

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
#### 3. Check pods
```bash

#View build file like -watch
kubectl logs rest-api-gateway-build-kaniko -n build -f

# check build is completed
kubectl get pods -n build

# View secrets
kubectl get secret rest-api-gateway-build-secret -n build
kubectl describe secret rest-api-gateway-build-secret -n build

```
#### 4. Uninstall pod and helm
```bash
kubectl delete pod rest-api-gateway-build-kaniko -n build

helm uninstall rest-api-gateway-build -n build
```