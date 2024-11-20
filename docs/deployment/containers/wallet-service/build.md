---
title: "Build"
sidebar_position: 1
description: This section guides you through building the Wallet Service in your Kubernetes environment using Helm.
---
# Wallet Service Build
## Introduction
In this section, we will guide you through the process of building and deploying the Wallet Service within your Kubernetes environment. This service is responsible for handling the wallet-related functionalities of the application. We will cover all the necessary steps including setting up the Helm repository, creating the required namespaces, setting environment variables, and installing the service using Helm charts.
## Steps
### Add/Update the Helm Repository (Remote)
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
### Create namespace
```bash
kubectl create namespace wallet-service-build
```
### Create environments
```bash
export GAMEPLAY_POSTGRES_DBNAME=cifarm
export GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.gameplay-postgresql.svc.cluster.local
export GAMEPLAY_POSTGRES_PORT=5432
export GAMEPLAY_POSTGRES_USER=postgres
export GAMEPLAY_POSTGRES_PASS=Cuong123_A
```
### Create environments
```bash
export DOCKER_SERVER="https://index.docker.io/v1/"
export DOCKER_USERNAME="cifarm"
export DOCKER_PASSWORD="*****"
export DOCKER_EMAIL="cifarm.starcilab@gmail.com"
```
### Install
You can install `wallet-service-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install wallet-service-build cifarm/wallet-service-build
    --set namespace wallet-service-build
    --set secret.imageCredentials.registry=$DOCKER_SERVER
    --set secret.imageCredentials.username=$DOCKER_USERNAME
    --set secret.imageCredentials.password=$DOCKER_PASSWORD
    --set secret.imageCredentials.email=$DOCKER_EMAIL
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install wallet-service-build ./charts/repo/containers/wallet-service/build/
    --set namespace wallet-service-build
    --set secret.imageCredentials.registry=$DOCKER_SERVER
    --set secret.imageCredentials.username=$DOCKER_USERNAME
    --set secret.imageCredentials.password=$DOCKER_PASSWORD
    --set secret.imageCredentials.email=$DOCKER_EMAIL
```