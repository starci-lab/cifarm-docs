---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Static Subgraph in your Kubernetes environment using Helm.
---
# Static Subgraph Deployment
## Introduction

## Steps
### Set environments
```bash

# Redis cache configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Postgres configuration
GAMEPLAY_POSTGRES_DBNAME=gameplay
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=UqW1R2J7UhKv6Aqf

GRAPHQL_STATIC_SUBGRAPH_PORT=3007

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

# Install
helm install static-subgraph cifarm/deployment \
    --namespace containers \
    --set image.repository="cifarm/static-subgraph" \
    --set image.tag="latest" \
    --set service.port=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set service.targetPort=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set env.GRAPHQL_STATIC_SUBGRAPH_PORT=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set env.CACHE_REDIS_HOST=$CACHE_REDIS_HOST \
    --set env.CACHE_REDIS_PORT=$CACHE_REDIS_PORT \
    --set env.GAMEPLAY_POSTGRES_DBNAME=$GAMEPLAY_POSTGRES_DBNAME \
    --set env.GAMEPLAY_POSTGRES_HOST=$GAMEPLAY_POSTGRES_HOST \
    --set env.GAMEPLAY_POSTGRES_PORT=$GAMEPLAY_POSTGRES_PORT \
    --set env.GAMEPLAY_POSTGRES_USER=$GAMEPLAY_POSTGRES_USER \
    --set env.GAMEPLAY_POSTGRES_PASS=$GAMEPLAY_POSTGRES_PASS 
    
```

#### 2. Install (Local)
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install
helm install static-subgraph ./charts/repo/deployment \
    --namespace containers \
    --set image.repository="cifarm/static-subgraph" \
    --set image.tag="latest" \
    --set service.port=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set service.targetPort=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set env.GRAPHQL_STATIC_SUBGRAPH_PORT=$GRAPHQL_STATIC_SUBGRAPH_PORT \
    --set env.CACHE_REDIS_HOST=$CACHE_REDIS_HOST \
    --set env.CACHE_REDIS_PORT=$CACHE_REDIS_PORT \
    --set env.GAMEPLAY_POSTGRES_DBNAME=$GAMEPLAY_POSTGRES_DBNAME \
    --set env.GAMEPLAY_POSTGRES_HOST=$GAMEPLAY_POSTGRES_HOST \
    --set env.GAMEPLAY_POSTGRES_PORT=$GAMEPLAY_POSTGRES_PORT \
    --set env.GAMEPLAY_POSTGRES_USER=$GAMEPLAY_POSTGRES_USER \
    --set env.GAMEPLAY_POSTGRES_PASS=$GAMEPLAY_POSTGRES_PASS 
```
#### 3. Check deployment
```bash
kubectl get deployment static-subgraph-deployment -n containers
```
#### 4. Check pods
```bash
# Get all pods in namespace containers
kubectl get pods -n containers
# Describe a single pod
kubectl describe pods static-subgraph-xxxxxxxx  -n containers
# Log a single pod
kubectl logs static-subgraph-xxxxxxxx  -n containers
```
#### 5. Uninstall helm
```bash
helm uninstall static-subgraph -n containers
```

## Access
### Static Subgraph
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `static-subgraph-cluster-service.containers.svc.cluster.local`  
- **Port**: 3007