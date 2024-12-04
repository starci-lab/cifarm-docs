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
kubectl create namespace containers
```
### Create environments
```bash

# Adapter Redis
ADAPTER_REDIS_HOST=adapter-redis-master.databases.svc.cluster.local
ADAPTER_REDIS_PORT=6379

# Redis cache configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Postgres configuration
GAMEPLAY_POSTGRES_DBNAME=cifarm
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.database.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=******

# Websocket Node Service
WEBSOCKET_API_GATEWAY_PORT=3003

```

### Install
You can install `websocket-node` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install websocket-node cifarm/websocket-node \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.redis.adapter.host=$ADAPTER_REDIS_HOST \
    --set secret.env.redis.adapter.port=$ADAPTER_REDIS_PORT \
    --set secret.env.containers.websocketApiGateway.port=$WEBSOCKET_API_GATEWAY_PORT \
    --set deployment.resources.requests.cpu="10m" \
    --set deployment.resources.requests.memory="20Mi" \
    --set deployment.resources.limits.cpu="100m" \
    --set deployment.resources.limits.memory="200Mi"

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install websocket-node ./charts/repo/containers/websocket-node/deployment/ \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.redis.adapter.host=$ADAPTER_REDIS_HOST \
    --set secret.env.redis.adapter.port=$ADAPTER_REDIS_PORT \
    --set secret.env.containers.websocketApiGateway.port=$WEBSOCKET_API_GATEWAY_PORT \
    --set deployment.resources.requests.cpu="10m" \
    --set deployment.resources.requests.memory="20Mi" \
    --set deployment.resources.limits.cpu="100m" \
    --set deployment.resources.limits.memory="200Mi"

```
### Check Deployment
```bash
kubectl get deployment websocket-node -n containers
```
### Check Pod
#### Get
```bash
kubectl get pods -n containers
```
#### Describe
```bash
kubectl describe pods websocket-node-xxxxxxxx  -n containers
```
#### Logs
```bash
kubectl logs websocket-node-xxxxxxxx  -n containers
```
### Uninstall
```bash
helm uninstall websocket-node -n containers
```

## Access
### Websocket Node
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `websocket-node-cluster-ip.containers.svc.cluster.local`  
- **Port**: 3003
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/websocket-node-cluster-ip --namespace containers 3003:3003
```