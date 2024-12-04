---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Gameplay Service in your Kubernetes environment using Helm.
---
# Gameplay Service Deployment
## Introduction

## Steps
###  Add/Update the helm repository (Remote only)
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
### Set environments
```bash
# Redis cache configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Test Postgres configuration
GAMEPLAY_POSTGRES_DBNAME=gameplay
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=UqW1R2J7UhKv6Aqf

# Gameplay Service
GAMEPLAY_SERVICE_PORT=3014

# Kafka
KAFKA_BROKER_1_HOST=kafka-controller-0.kafka-controller-headless.brokers.svc.cluster.local
KAFKA_BROKER_1_PORT=9092
KAFKA_BROKER_2_HOST=kafka-controller-1.kafka-controller-headless.brokers.svc.cluster.local
KAFKA_BROKER_2_PORT=9092
KAFKA_BROKER_3_HOST=kafka-controller-2.kafka-controller-headless.brokers.svc.cluster.local
KAFKA_BROKER_3_PORT=9092

# JWT
JWT_SECRET="C3ZofmtZ+hXQF2d~&bBu9x'UtkUyz?)MwXiXy_eGFlyO|:v!JW$?iZ&U6:kPQg("
JWT_ACCESS_TOKEN_EXPIRATION=5m
JWT_REFRESH_TOKEN_EXPIRATION=7d

```

### Excute scripts
#### 1. Install (Remote)
```bash
helm install gameplay-service cifarm/deployment \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.kafka.broker1.host=$KAFKA_BROKER_1_HOST \
    --set secret.env.kafka.broker1.port=$KAFKA_BROKER_1_PORT \
    --set secret.env.kafka.broker2.host=$KAFKA_BROKER_2_HOST \
    --set secret.env.kafka.broker2.port=$KAFKA_BROKER_2_PORT \
    --set secret.env.kafka.broker3.host=$KAFKA_BROKER_3_HOST \
    --set secret.env.kafka.broker3.port=$CKAFKA_BROKER_3_PORT \
    --set secret.env.jwt.secret=$JWT_SECRET \
    --set secret.env.jwt.accessTokenExpiration=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set secret.env.jwt.refreshTokenExpiration=$JWT_REFRESH_TOKEN_EXPIRATION \
    --set secret.env.containers.gameplayService.port=$GAMEPLAY_SERVICE_PORT

```
#### 2. Install (Local)
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install
helm install gameplay-service ./charts/repo/deployment \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.kafka.broker1.host=$KAFKA_BROKER_1_HOST \
    --set secret.env.kafka.broker1.port=$KAFKA_BROKER_1_PORT \
    --set secret.env.kafka.broker2.host=$KAFKA_BROKER_2_HOST \
    --set secret.env.kafka.broker2.port=$KAFKA_BROKER_2_PORT \
    --set secret.env.kafka.broker3.host=$KAFKA_BROKER_3_HOST \
    --set secret.env.kafka.broker3.port=$CKAFKA_BROKER_3_PORT \
    --set secret.env.jwt.secret=$JWT_SECRET \
    --set secret.env.jwt.accessTokenExpiration=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set secret.env.jwt.refreshTokenExpiration=$JWT_REFRESH_TOKEN_EXPIRATION \
    --set secret.env.containers.gameplayService.port=$GAMEPLAY_SERVICE_PORT
```
#### 3. Check deployment
```bash
kubectl get deployment gameplay-service -n containers
```
#### 4. Check pods
```bash
# Get all pods in namespace containers
kubectl get pods -n containers
# Describe a single pod
kubectl describe pods gameplay-service-xxxxxxxx  -n containers
```
#### Logs
```bash
kubectl describe logs gameplay-service-xxxxxxxx  -n containers
```
#### 5. Uninstall helm
```bash
helm uninstall gameplay-service -n containers
```

## Access
### Gameplay Service
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `gameplay-service-cluster-service.containers.svc.cluster.local`  
- **Port**: 3014

