---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Gameplay Service in your Kubernetes environment using Helm.
---
# Gameplay Service Deployment
## Introduction
This section provides a step-by-step guide to deploying the Gameplay Service in your Kubernetes environment. As a core component of the application, the Gameplay Service is responsible for managing gameplay-related functionalities. This guide includes instructions for adding or updating the Helm repository, creating a dedicated namespace, configuring essential environment variables, and deploying the service using Helm charts.

The deployment process covers setting up key configurations, such as database connection details, and installing the service with the required Helm values. After deployment, we will also provide guidance on accessing the Gameplay Service within the Kubernetes cluster and externally using port forwarding.

By following this guide, you will successfully deploy the Gameplay Service in your Kubernetes environment, integrate it with the PostgreSQL database, and ensure it is fully operational for managing gameplay tasks.

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
kubectl create namespace gameplay-service-deployment
```
### Create environments
```bash
# Redis cache configuration
export CACHE_REDIS_HOST=localhost
export CACHE_REDIS_PORT=6379

# Gameplay Test Postgres configuration
export GAMEPLAY_TEST_POSTGRES_DBNAME=cifarm_test
export GAMEPLAY_TEST_POSTGRES_HOST=127.0.0.1
export GAMEPLAY_TEST_POSTGRES_PORT=5432
export GAMEPLAY_TEST_POSTGRES_USER=postgres
export GAMEPLAY_TEST_POSTGRES_PASS=Cuong123_A

# Gameplay Service
export GAMEPLAY_SERVICE_HOST=localhost
export GAMEPLAY_SERVICE_PORT=3014

# Kafka
export KAFKA_BROKER_1_HOST=localhost
export KAFKA_BROKER_1_PORT=9092
export KAFKA_BROKER_2_HOST=localhost
export KAFKA_BROKER_2_PORT=9093
export KAFKA_BROKER_3_HOST=localhost
export KAFKA_BROKER_3_PORT=9094

```

### Install
You can install `gameplay-service-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install gameplay-service-deployment cifarm/gameplay-service-deployment
    --set namespace gameplay-service-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install gameplay-service-deployment ./charts/repo/containers/gameplay-service/build/
    --set namespace gameplay-service-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### Gameplay Service
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `gameplay-service-cluster-ip.gameplay-service-deployment.svc.cluster.local`  
- **Port**: 3014
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/gameplay-service-cluster-ip --namespace gameplay-service-deployment 3014:3014
```