---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Static Subgraph in your Kubernetes environment using Helm.
---
# Static Subgraph Deployment
## Introduction

This section provides a step-by-step guide to deploying the Static Subgraph in your Kubernetes environment. The Static Subgraph is an essential component of the application, designed to manage and serve static data queries efficiently. This guide will walk you through adding or updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and deploying the service using Helm charts.

The deployment process includes configuring key settings, such as database connection details, and installing the service with the appropriate Helm values. After deployment, we will also provide instructions on accessing the Static Subgraph service both within the Kubernetes cluster and externally using port forwarding.

By following this guide, you will successfully deploy the Static Subgraph in your Kubernetes environment, integrate it with the PostgreSQL database, and ensure it is fully functional to handle static data queries effectively.

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

# Redis cache configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Postgres configuration
GAMEPLAY_POSTGRES_DBNAME=cifarm
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.database.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=******

GRAPHQL_STATIC_SUBGRAPH_PORT=3007

```

### Install
You can install `static-subgraph-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install static-subgraph cifarm/static-subgraph \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.subgraphStatic.port=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set deployment.resources.requests.cpu="10m" \
    --set deployment.resources.requests.memory="20Mi" \
    --set deployment.resources.limits.cpu="100m" \
    --set deployment.resources.limits.memory="200Mi"


```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install static-subgraph ./charts/repo/containers/static-subgraph/deployment/ \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.subgraphStatic.port=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set deployment.resources.requests.cpu="10m" \
    --set deployment.resources.requests.memory="20Mi" \
    --set deployment.resources.limits.cpu="100m" \
    --set deployment.resources.limits.memory="200Mi"
```
### Check Deployment
```bash
kubectl get deployment static-subgraph -n containers
```
### Check Pod
#### Get
```bash
kubectl get pods -n containers
```
#### Describe
```bash
kubectl describe pods static-subgraph-xxxxxxxx  -n containers
```
#### Logs
```bash
kubectl logs static-subgraph-xxxxxxxx  -n containers
```
### Uninstall
```bash
helm uninstall static-subgraph -n containers
```
## Access
### Static Subgraph
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `static-subgraph-cluster-ip.containers.svc.cluster.local`  
- **Port**: 3007
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/static-subgraph-cluster-ip --namespace containers 3007:3007
```