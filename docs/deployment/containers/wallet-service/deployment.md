---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Wallet Service in your Kubernetes environment using Helm.
---
# Wallet Service Deployment
## Introduction
n this section, we will walk through the steps necessary to deploy the Wallet Service in your Kubernetes environment. The Wallet Service is a key component of the application, responsible for handling wallet-related operations. We will guide you through adding and updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and finally, deploying the service using Helm.

The deployment process includes setting up necessary configurations, such as database connection details, and then installing the service using Helm charts. Once the service is deployed, we will also provide instructions for accessing the service both within the cluster and externally via port forwarding.

By following these steps, you'll be able to set up and deploy the Wallet Service within your Kubernetes environment and configure it to work with the PostgreSQL database.
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
kubectl create namespace wallet-service-deployment
```
### Create environments
```bash
export GAMEPLAY_POSTGRES_DBNAME=cifarm
export GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.gameplay-postgresql.svc.cluster.local
export GAMEPLAY_POSTGRES_PORT=5432
export GAMEPLAY_POSTGRES_USER=postgres
export GAMEPLAY_POSTGRES_PASS=Cuong123_A
```
### Install
You can install `wallet-service-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install wallet-service-deployment cifarm/wallet-service-deployment
    --set namespace wallet-service-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install wallet-service-deployment ./charts/repo/containers/wallet-service/build/
    --set namespace wallet-service-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### Wallet Service
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `wallet-service-cluster-ip.wallet-service-deployment.svc.cluster.local`  
- **Port**: 3008
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/wallet-service-cluster-ip --namespace wallet-service-deployment 3008:3008
```