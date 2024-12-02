---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Rest API Gateway in your Kubernetes environment using Helm.
---
# Rest API Gateway Deployment
## Introduction
In this section, we will walk through the steps necessary to deploy the Rest API Gateway in your Kubernetes environment. The Rest API Gateway is a key component of the application, responsible for handling gameplay-related operations. We will guide you through adding and updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and finally, deploying the service using Helm.

The deployment process includes setting up necessary configurations, such as database connection details, and then installing the service using Helm charts. Once the service is deployed, we will also provide instructions for accessing the service both within the cluster and externally via port forwarding.

By following these steps, you'll be able to set up and deploy the Rest API Gateway within your Kubernetes environment and configure it to work with the PostgreSQL database.
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
kubectl create namespace rest-api-gateway-deployment
```
### Create environments
```bash

# Gameplay Service configuration
export GAMEPLAY_SERVICE_HOST=localhost
export GAMEPLAY_SERVICE_PORT=3014

# Rest Api Gateway configuration
export REST_API_GATEWAY_HOST=localhost
export REST_API_GATEWAY_PORT=3001

```

### Install
You can install `rest-api-gateway-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install rest-api-gateway-deployment cifarm/rest-api-gateway-deployment
    --set namespace rest-api-gateway-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install rest-api-gateway-deployment ./charts/repo/containers/rest-api-gateway/build/
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