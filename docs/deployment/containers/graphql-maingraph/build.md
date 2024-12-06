---
title: "Build"
sidebar_position: 1
description: This section guides you through building the Graphql Maingraph in your Kubernetes environment using Helm.
---
# GraphQL Maingraph Build
## Introduction
In this section, we provide a comprehensive guide to building and deploying the GraphQL Maingraph in your Kubernetes environment. This service is a core component responsible for managing and aggregating GraphQL queries, enabling seamless interaction with various data sources within your application. The guide covers all the necessary steps, including configuring the Helm repository, setting up namespaces, defining environment variables, and deploying the service using Helm charts to ensure robust and efficient GraphQL operations.

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
helm install graphql-maingraph-build cifarm/build \
    --namespace build \
    --set imageCredentials.registry=$DOCKER_SERVER \
    --set imageCredentials.username=$DOCKER_USERNAME \
    --set imageCredentials.password=$DOCKER_PASSWORD \
    --set imageCredentials.email=$DOCKER_EMAIL \
    --set image.repository="cifarm/graphql-maingraph" \
    --set image.tag="latest" \
    --set image.dockerfile="./apps/graphql-maingraph/Dockerfile" \
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

helm install graphql-maingraph-build ./charts/repo/build \
    --namespace build \
    --set imageCredentials.registry=$DOCKER_SERVER \
    --set imageCredentials.username=$DOCKER_USERNAME \
    --set imageCredentials.password=$DOCKER_PASSWORD \
    --set imageCredentials.email=$DOCKER_EMAIL \
    --set image.repository="cifarm/graphql-maingraph" \
    --set image.tag="latest" \
    --set image.dockerfile="./apps/graphql-maingraph/Dockerfile" \
    --set image.context="git://github.com/starci-lab/cifarm-containers" \
    --set resources.requests.cpu="50m" \
    --set resources.requests.memory="100Mi" \
    --set resources.limits.cpu="500m" \
    --set resources.limits.memory="1Gi"
```
#### 3. Check pods
```bash

#View build file like -watch
kubectl logs graphql-maingraph-build-kaniko -n build -f

# check build is completed
kubectl get pods -n build

# View secrets
kubectl get secret graphql-maingraph-build-secret -n build
kubectl describe secret graphql-maingraph-build-secret -n build

```
#### 4. Uninstall pod and helm
```bash
kubectl delete pod graphql-maingraph-build-kaniko -n build

helm uninstall graphql-maingraph-build -n build
```