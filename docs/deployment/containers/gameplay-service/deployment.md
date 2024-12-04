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
kubectl create namespace containers
```
### Create environments
```bash
# Redis cache configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Test Postgres configuration
GAMEPLAY_POSTGRES_DBNAME=cifarm
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=UqW1R2J7UhKv6Aqf

# Gameplay Service
GAMEPLAY_SERVICE_PORT=3014

#producer
HEADLESS_KAFKA_1_HOST=kafka-controller-0.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_1_PORT=9092

HEADLESS_KAFKA_2_HOST=kafka-controller-1.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_2_PORT=9092

HEADLESS_KAFKA_3_HOST=kafka-controller-2.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_3_PORT=9092

#default
KAFKA_1_HOST=kafka.brokers.svc.cluster.local
KAFKA_1_PORT=9092

# JWT
JWT_SECRET="C3ZofmtZ+hXQF2d~&bBu9x'UtkUyz?)MwXiXy_eGFlyO|:v!JW$?iZ&U6:kPQg("
JWT_ACCESS_TOKEN_EXPIRATION=5m
JWT_REFRESH_TOKEN_EXPIRATION=7d

```

### Install
You can install `gameplay-service-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install gameplay-service cifarm/gameplay-service \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.kafka.producers.producer1.host=$PRODUCER_KAFKA_1_HOST \
    --set secret.env.kafka.producers.producer1.port=$PRODUCER_KAFKA_1_PORT \
    --set secret.env.kafka.producers.producer2.host=PRODUCER_KAFKA_2_HOST \
    --set secret.env.kafka.producers.producer2.port=$PRODUCER_KAFKA_2_PORT \
    --set secret.env.kafka.producers.producer3.host=PRODUCER_KAFKA_3_HOST \
    --set secret.env.kafka.producers.producer3.port=$$PRODUCER_KAFKA_3_PORT \
    --set secret.env.jwt.secret=$JWT_SECRET \
    --set secret.env.jwt.accessTokenExpiration=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set secret.env.jwt.refreshTokenExpiration=$JWT_REFRESH_TOKEN_EXPIRATION \
    --set secret.env.containers.gameplayService.port=$GAMEPLAY_SERVICE_PORT \
    --set deployment.resources.requests.cpu="20m" \
    --set deployment.resources.requests.memory="40Mi" \
    --set deployment.resources.limits.cpu="200m" \
    --set deployment.resources.limits.memory="400Mi"

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install gameplay-service ./charts/repo/containers/gameplay-service/deployment/ \
    --namespace containers \
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME \
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST \
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT \
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER \
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS \
    --set secret.env.redis.cache.host=$CACHE_REDIS_HOST \
    --set secret.env.redis.cache.port=$CACHE_REDIS_PORT \
    --set secret.env.kafka.producers.producer1.host=$PRODUCER_KAFKA_1_HOST \
    --set secret.env.kafka.producers.producer1.port=$PRODUCER_KAFKA_1_PORT \
    --set secret.env.kafka.producers.producer2.host=PRODUCER_KAFKA_2_HOST \
    --set secret.env.kafka.producers.producer2.port=$PRODUCER_KAFKA_2_PORT \
    --set secret.env.kafka.producers.producer3.host=PRODUCER_KAFKA_3_HOST \
    --set secret.env.kafka.producers.producer3.port=$$PRODUCER_KAFKA_3_PORT \
    --set secret.env.jwt.secret=$JWT_SECRET \
    --set secret.env.jwt.accessTokenExpiration=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set secret.env.jwt.refreshTokenExpiration=$JWT_REFRESH_TOKEN_EXPIRATION \
    --set secret.env.containers.gameplayService.port=$GAMEPLAY_SERVICE_PORT \
    --set deployment.resources.requests.cpu="20m" \
    --set deployment.resources.requests.memory="40Mi" \
    --set deployment.resources.limits.cpu="200m" \
    --set deployment.resources.limits.memory="400Mi"
```
### Check Deployment
```bash
kubectl get deployment gameplay-service -n containers
```
### Check Pod
#### Get
```bash
kubectl get pods -n containers
```
#### Describe
```bash
kubectl describe pods gameplay-service-xxxxxxxx  -n containers
```
#### Logs
```bash
kubectl logs gameplay-service-xxxxxxxx  -n containers
```
### Uninstall
```bash
helm uninstall gameplay-service -n containers
```

## Access
### Gameplay Service
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `gameplay-service-cluster-ip.containers.svc.cluster.local`  
- **Port**: 3014
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/gameplay-service-cluster-ip --namespace containers 3014:3014
```

