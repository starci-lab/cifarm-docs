---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Websocket Node in your Kubernetes environment using Helm.
---
# Websocket Node Deployment
## Introduction
In this section, we will walk through the steps necessary to deploy the Websocket Node in your Kubernetes environment. The Websocket Node is a key component of the application, responsible for handling gameplay-related operations. We will guide you through adding and updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and finally, deploying the service using Helm.

The deployment process includes setting up necessary configurations, such as database connection details, and then installing the service using Helm charts. Once the service is deployed, we will also provide instructions for accessing the service both within the cluster and externally via port forwarding.

By following these steps, you'll be able to set up and deploy the Websocket Node within your Kubernetes environment and configure it to work with the PostgreSQL database.
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
kubectl create namespace graphql-maingraph-deployment
```
### Create environments
```bash

# Adapter Redis
export ADAPTER_REDIS_HOST=localhost
export ADAPTER_REDIS_PORT=6379

# Gameplay Test Postgres configuration
export GAMEPLAY_TEST_POSTGRES_DBNAME=cifarm_test
export GAMEPLAY_TEST_POSTGRES_HOST=127.0.0.1
export GAMEPLAY_TEST_POSTGRES_PORT=5432
export GAMEPLAY_TEST_POSTGRES_USER=postgres
export GAMEPLAY_TEST_POSTGRES_PASS=Cuong123_A

# Cache Redis
export CACHE_REDIS_HOST=127.0.0.1
export CACHE_REDIS_PORT=6379

```

### Install
You can install `graphql-maingraph-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install graphql-maingraph-deployment cifarm/graphql-maingraph-deployment
    --set namespace graphql-maingraph-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install graphql-maingraph-deployment ./charts/repo/containers/graphql-maingraph/build/
    --set namespace graphql-maingraph-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### Websocket Node
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `graphql-maingraph-cluster-ip.graphql-maingraph-deployment.svc.cluster.local`  
- **Port**: 3014
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/graphql-maingraph-cluster-ip --namespace graphql-maingraph-deployment 3014:3014
```