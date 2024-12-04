---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Rest API Gateway in your Kubernetes environment using Helm.
---
# Rest API Gateway Deployment
## Introduction

## Steps
### Set environments
```bash

# Gameplay Service configuration
GAMEPLAY_SERVICE_HOST=gameplay-service-cluster-service.containers.svc.cluster.local
GAMEPLAY_SERVICE_PORT=3014

# Rest Api Gateway configuration
REST_API_GATEWAY_PORT=3001

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
helm install rest-api-gateway cifarm/rest-api-gateway \
    --namespace containers \
    --set image.repository="cifarm/rest-api-gateway" \
    --set image.tag="latest" \
    --set env.GAMEPLAY_SERVICE_HOST=$GAMEPLAY_SERVICE_HOST \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT \
    --set env.REST_API_GATEWAY_PORT=$REST_API_GATEWAY_PORT 
```

#### 2. Install (Local)
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install
helm install rest-api-gateway ./charts/repo/deployment \
    --namespace containers \
    --set image.repository="cifarm/rest-api-gateway" \
    --set image.tag="latest" \
    --set service.port=$REST_API_GATEWAY_PORT \
    --set service.targetPort=$REST_API_GATEWAY_PORT \
    --set env.GAMEPLAY_SERVICE_HOST=$GAMEPLAY_SERVICE_HOST \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT \
    --set env.REST_API_GATEWAY_PORT=$REST_API_GATEWAY_PORT 
```
#### 3. Check deployment
```bash
kubectl get deployment rest-api-gateway-deployment -n containers
```
#### 4. Check pods
```bash
# Get all pods in namespace containers
kubectl get pods -n containers
# Describe a single pod
kubectl describe pods rest-api-gateway-xxxxxxxx  -n containers
# Log a single pod
kubectl logs rest-api-gateway-xxxxxxxx  -n containers
```
#### 5. Uninstall helm
```bash
helm uninstall rest-api-gateway -n containers
```

## Access
### Rest API Gateway
- **Kind**: Service 
- **Type**: ClusterIP  
- **Host**: `rest-api-gateway-cluster-service.containers.svc.cluster.local`  
- **Port**: 3001
