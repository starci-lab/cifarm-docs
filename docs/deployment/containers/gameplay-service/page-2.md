---
title: "Deployment"
sidebar_position: 2
description: Deployment
---
# Gameplay Service Deployment
Before deploying, set the following environment variables to ensure the necessary configurations are applied to the Gameplay Service
### Set environments
```bash
# Redis Cache Configuration
CACHE_REDIS_HOST=cache-redis-master.databases.svc.cluster.local
CACHE_REDIS_PORT=6379

# Gameplay Test Postgres Configuration
GAMEPLAY_POSTGRES_DBNAME=gameplay
GAMEPLAY_POSTGRES_HOST=gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local
GAMEPLAY_POSTGRES_PORT=5432
GAMEPLAY_POSTGRES_USER=postgres
GAMEPLAY_POSTGRES_PASS=UqW1R2J7UhKv6Aqf

# Gameplay Service Configuration
GAMEPLAY_SERVICE_PORT=3014

# Kafka Configuration
HEADLESS_KAFKA_1_HOST=kafka-controller-0.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_1_PORT=9092
HEADLESS_KAFKA_2_HOST=kafka-controller-1.kafka-controller-headless.brokers.svc.cluster.local 
HEADLESS_KAFKA_2_PORT=9092
HEADLESS_KAFKA_3_HOST=kafka-controller-2.kafka-controller-headless.brokers.svc.cluster.local
HEADLESS_KAFKA_3_PORT=9092
KAFKA_1_HOST=kafka.brokers.svc.cluster.local
KAFKA_1_PORT=9092

# JWT Authentication Configuration
JWT_SECRET="C3ZofmtZ+hXQF2d~&bBu9x'UtkUyz?)MwXiXy_eGFlyO|:v!JW$?iZ&U6:kPQg("
JWT_ACCESS_TOKEN_EXPIRATION=5m
JWT_REFRESH_TOKEN_EXPIRATION=7d

# Repeat the Gameplay Service Port for clarity
GAMEPLAY_SERVICE_PORT=3014
```
### Remote Installation
If the Helm repository is not already added, the script will first add it and then update it. You can check and add the repository with the following
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
Next, deploy the Gameplay Service using Helm with the environment variables configured earlier
```bash
# Install
helm install gameplay-service cifarm/deployment \
    --namespace containers \
    --set image.repository="cifarm/gameplay-service" \
    --set image.tag="latest" \
    --set service.port=3014 \
    --set service.targetPort=3014 \
    --set env.CACHE_REDIS_HOST=$CACHE_REDIS_HOST \
    --set env.CACHE_REDIS_PORT=$CACHE_REDIS_PORT \
    --set env.GAMEPLAY_POSTGRES_DBNAME=$GAMEPLAY_POSTGRES_DBNAME \
    --set env.GAMEPLAY_POSTGRES_HOST=$GAMEPLAY_POSTGRES_HOST \
    --set env.GAMEPLAY_POSTGRES_PORT=$GAMEPLAY_POSTGRES_PORT \
    --set env.GAMEPLAY_POSTGRES_USER=$GAMEPLAY_POSTGRES_USER \
    --set env.GAMEPLAY_POSTGRES_PASS=$GAMEPLAY_POSTGRES_PASS \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT \
    --set env.HEADLESS_KAFKA_1_HOST=$HEADLESS_KAFKA_1_HOST \
    --set env.HEADLESS_KAFKA_1_PORT=$HEADLESS_KAFKA_1_PORT \
    --set env.HEADLESS_KAFKA_2_HOST=$HEADLESS_KAFKA_2_HOST \
    --set env.HEADLESS_KAFKA_2_PORT=$HEADLESS_KAFKA_2_PORT \
    --set env.HEADLESS_KAFKA_3_HOST=$HEADLESS_KAFKA_3_HOST \
    --set env.HEADLESS_KAFKA_3_PORT=$HEADLESS_KAFKA_3_PORT \
    --set env.KAFKA_1_HOST=$KAFKA_1_HOST \
    --set env.KAFKA_1_PORT=$KAFKA_1_PORT \
    --set env.JWT_SECRET="$JWT_SECRET" \
    --set env.JWT_ACCESS_TOKEN_EXPIRATION=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set env.JWT_REFRESH_TOKEN_EXPIRATION=$JWT_REFRESH_TOKEN_EXPIRATION \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT
```
#### 2. Locally Installation
If you prefer to install locally, clone the repository and proceed with the installation:
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s
```
Then, deploy and install the service
```bash
# Install Gameplay Service locally
helm install gameplay-service ./charts/repo/deployment \
    --namespace containers \
    --set image.repository="cifarm/gameplay-service" \
    --set image.tag="latest" \
    --set service.port=3014 \
    --set service.targetPort=3014 \
    --set env.CACHE_REDIS_HOST=$CACHE_REDIS_HOST \
    --set env.CACHE_REDIS_PORT=$CACHE_REDIS_PORT \
    --set env.GAMEPLAY_POSTGRES_DBNAME=$GAMEPLAY_POSTGRES_DBNAME \
    --set env.GAMEPLAY_POSTGRES_HOST=$GAMEPLAY_POSTGRES_HOST \
    --set env.GAMEPLAY_POSTGRES_PORT=$GAMEPLAY_POSTGRES_PORT \
    --set env.GAMEPLAY_POSTGRES_USER=$GAMEPLAY_POSTGRES_USER \
    --set env.GAMEPLAY_POSTGRES_PASS=$GAMEPLAY_POSTGRES_PASS \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT \
    --set env.HEADLESS_KAFKA_1_HOST=$HEADLESS_KAFKA_1_HOST \
    --set env.HEADLESS_KAFKA_1_PORT=$HEADLESS_KAFKA_1_PORT \
    --set env.HEADLESS_KAFKA_2_HOST=$HEADLESS_KAFKA_2_HOST \
    --set env.HEADLESS_KAFKA_2_PORT=$HEADLESS_KAFKA_2_PORT \
    --set env.HEADLESS_KAFKA_3_HOST=$HEADLESS_KAFKA_3_HOST \
    --set env.HEADLESS_KAFKA_3_PORT=$HEADLESS_KAFKA_3_PORT \
    --set env.KAFKA_1_HOST=$KAFKA_1_HOST \
    --set env.KAFKA_1_PORT=$KAFKA_1_PORT \
    --set env.JWT_SECRET="$JWT_SECRET" \
    --set env.JWT_ACCESS_TOKEN_EXPIRATION=$JWT_ACCESS_TOKEN_EXPIRATION \
    --set env.JWT_REFRESH_TOKEN_EXPIRATION=$JWT_REFRESH_TOKEN_EXPIRATION \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT
```
#### Check Deployment Status
After deploying, you can verify the status of the deployment
```bash
kubectl get deployment gameplay-service-deployment -n containers
```
#### Check pods
To view the pods, use the following command
```bash
# Get all pods in the 'containers' namespace
kubectl get pods -n containers

# Describe a specific pod to get more details
kubectl describe pods -n containers | grep 'gameplay-service.*'

# View logs of a specific pod
kubectl get pods -n containers | grep 'gameplay-service.*'
```
#### 5. Uninstall Helm Release
If you need to remove the deployment, you can uninstall the Helm release:
```bash
helm uninstall gameplay-service -n containers
```
### Access
You can access the Gameplay Service via the `ClusterIP` service at `gameplay-service-cluster-service.containers.svc.cluster.local` on port `3014`.