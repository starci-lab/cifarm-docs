---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Rest API Gateway in your Kubernetes environment using Helm.
---
# Rest API Gateway Deployment
## Introduction
This section provides a detailed guide for deploying the REST API Gateway in your Kubernetes environment. As a vital component of the application, the REST API Gateway serves as the central entry point for routing and managing API requests. This guide will walk you through adding or updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and deploying the service using Helm charts.

The deployment process involves setting up necessary configurations, such as database connection details, and installing the service with appropriate Helm values. After deployment, instructions are provided for accessing the REST API Gateway both within the Kubernetes cluster and externally using port forwarding.

By following this guide, you will successfully deploy the REST API Gateway in your Kubernetes environment, integrate it with the PostgreSQL database, and ensure it is fully operational to manage and route API traffic efficiently.

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
kubectl create namespace rest-api-gateway
```
### Create environments
```bash

# Gameplay Service configuration
export GAMEPLAY_SERVICE_HOST=gameplay-service-cluster-ip.containers.svc.cluster.local
export GAMEPLAY_SERVICE_PORT=3014

# Rest Api Gateway configuration
export REST_API_GATEWAY_PORT=3001

```

### Install
You can install `rest-api-gateway-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install rest-api-gateway cifarm/rest-api-gateway
    --namespace rest-api-gateway
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install rest-api-gateway-deployment ./charts/repo/containers/rest-api-gateway/deployment/
    --set namespace rest-api-gateway-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### Rest API Gateway
- **Kind**: Service 
- **Type**: ClusterIP  
- **Host**: `rest-api-gateway-cluster-ip.rest-api-gateway-deployment.svc.cluster.local`  
- **Port**: 3001
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/rest-api-gateway-cluster-ip --namespace rest-api-gateway-deployment 3001:3001
```