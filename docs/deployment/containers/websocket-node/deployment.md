---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Websocket Node in your Kubernetes environment using Helm.
---
# Websocket Node Deployment
## Introduction

## Steps
### Set environments
```bash

# Adapter Redis
ADAPTER_REDIS_HOST=adapter-redis-master.databases.svc.cluster.local
ADAPTER_REDIS_PORT=6379

# Redis cache configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Postgres configuration
GAMEPLAY_POSTGRES_DBNAME=gameplay
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=UqW1R2J7UhKv6Aqf

# Websocket Node Service
WEBSOCKET_API_GATEWAY_PORT=3003

# Kafka
HEADLESS_KAFKA_1_HOST=kafka-controller-0.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_1_PORT=9092
HEADLESS_KAFKA_2_HOST=kafka-controller-1.kafka-controller-headless.brokers.svc.cluster.local 
HEADLESS_KAFKA_2_PORT=9092
HEADLESS_KAFKA_3_HOST=kafka-controller-2.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_3_PORT=9092
KAFKA_1_HOST=kafka.brokers.svc.cluster.local
KAFKA_1_PORT=9092

# JWT
JWT_SECRET="C3ZofmtZ+hXQF2d~&bBu9x'UtkUyz?)MwXiXy_eGFlyO|:v!JW$?iZ&U6:kPQg("
JWT_ACCESS_TOKEN_EXPIRATION=5m
JWT_REFRESH_TOKEN_EXPIRATION=7d

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
helm install websocket-node cifarm/deployment \
    --namespace containers \
    --set image.repository="cifarm/websocket-node" \
    --set image.tag="latest" \
    --set service.port=$WEBSOCKET_API_GATEWAY_PORT \
    --set service.targetPort=$WEBSOCKET_API_GATEWAY_PORT \
    --set secret.env.GAMEPLAY_POSTGRES_DBNAME=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.GAMEPLAY_POSTGRES_HOST=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.GAMEPLAY_POSTGRES_PORT=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.GAMEPLAY_POSTGRES_USER=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.GAMEPLAY_POSTGRES_PASS=$GAMEPLAY_POSTGRES_PASS \
    --set env.HEADLESS_KAFKA_1_HOST=$HEADLESS_KAFKA_1_HOST \
    --set env.HEADLESS_KAFKA_1_PORT=$HEADLESS_KAFKA_1_PORT \
    --set env.HEADLESS_KAFKA_2_HOST=$HEADLESS_KAFKA_2_HOST \
    --set env.HEADLESS_KAFKA_2_PORT=$HEADLESS_KAFKA_2_PORT \
    --set env.HEADLESS_KAFKA_3_HOST=$HEADLESS_KAFKA_3_HOST \
    --set env.HEADLESS_KAFKA_3_PORT=$HEADLESS_KAFKA_3_PORT \
    --set env.KAFKA_1_HOST=$KAFKA_1_HOST \
    --set env.KAFKA_1_PORT=$KAFKA_1_PORT \
    --set env.CACHE_REDIS_HOST=$CACHE_REDIS_HOST \
    --set env.CACHE_REDIS_PORT=$CACHE_REDIS_PORT \
    --set env.ADAPTER_REDIS_HOST=$ADAPTER_REDIS_HOST \
    --set env.ADAPTER_REDIS_PORT=$ADAPTER_REDIS_PORT \
    --set env.JWT_SECRET="$JWT_SECRET" \
    --set env.JWT_ACCESS_TOKEN_EXPIRATION=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set env.JWT_REFRESH_TOKEN_EXPIRATION=$JWT_REFRESH_TOKEN_EXPIRATION
```

#### 2. Install (Local)
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install
helm install websocket-node ./charts/repo/deployment \
    --namespace containers \
    --set image.repository="cifarm/websocket-node" \
    --set image.tag="latest" \
    --set service.port=$WEBSOCKET_API_GATEWAY_PORT \
    --set service.targetPort=$WEBSOCKET_API_GATEWAY_PORT \
    --set secret.env.GAMEPLAY_POSTGRES_DBNAME=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.GAMEPLAY_POSTGRES_HOST=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.GAMEPLAY_POSTGRES_PORT=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.GAMEPLAY_POSTGRES_USER=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.GAMEPLAY_POSTGRES_PASS=$GAMEPLAY_POSTGRES_PASS \
    --set env.HEADLESS_KAFKA_1_HOST=$HEADLESS_KAFKA_1_HOST \
    --set env.HEADLESS_KAFKA_1_PORT=$HEADLESS_KAFKA_1_PORT \
    --set env.HEADLESS_KAFKA_2_HOST=$HEADLESS_KAFKA_2_HOST \
    --set env.HEADLESS_KAFKA_2_PORT=$HEADLESS_KAFKA_2_PORT \
    --set env.HEADLESS_KAFKA_3_HOST=$HEADLESS_KAFKA_3_HOST \
    --set env.HEADLESS_KAFKA_3_PORT=$HEADLESS_KAFKA_3_PORT \
    --set env.KAFKA_1_HOST=$KAFKA_1_HOST \
    --set env.KAFKA_1_PORT=$KAFKA_1_PORT \
    --set env.CACHE_REDIS_HOST=$CACHE_REDIS_HOST \
    --set env.CACHE_REDIS_PORT=$CACHE_REDIS_PORT \
    --set env.ADAPTER_REDIS_HOST=$ADAPTER_REDIS_HOST \
    --set env.ADAPTER_REDIS_PORT=$ADAPTER_REDIS_PORT \
    --set env.JWT_SECRET="$JWT_SECRET" \
    --set env.JWT_ACCESS_TOKEN_EXPIRATION=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set env.JWT_REFRESH_TOKEN_EXPIRATION=$JWT_REFRESH_TOKEN_EXPIRATION

```
#### 3. Check deployment
```bash
kubectl get deployment websocket-node-deployment -n containers
```
#### 4. Check pods
```bash
# Get all pods in namespace containers
kubectl get pods -n containers
# Describe a single pod
kubectl describe pods websocket-node-xxxxxxxx  -n containers
# Log a single pod
kubectl logs websocket-node-xxxxxxxx  -n containers
```
#### 5. Uninstall helm
```bash
helm uninstall websocket-node -n containers
```

## Access
### Websocket Node
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `websocket-node-cluster-ip.containers.svc.cluster.local`  
- **Port**: 3003