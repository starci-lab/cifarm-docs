---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the GraphQL Maingraph in your Kubernetes environment using Helm.
---
# GraphQL Maingraph Deployment
## Introduction

## Steps
### Set environments
```bash

# GraphQL Subgraph
GRAPHQL_SUBGRAPH_STATIC_URL=http://static-subgraph-service.containers.svc.cluster.local:3007/graphql
GRAPHQL_API_GATEWAY_PORT=3006

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
```bash
helm install graphql-maingraph cifarm/deployment \
    --namespace containers \
    --set image.repository="cifarm/graphql-maingraph" \
    --set image.tag="latest" \
    --set service.port=$GRAPHQL_API_GATEWAY_PORT \
    --set service.targetPort=$GRAPHQL_API_GATEWAY_PORT \
    --set env.GRAPHQL_SUBGRAPH_STATIC_URL=$GRAPHQL_SUBGRAPH_STATIC_URL \
    --set env.GRAPHQL_API_GATEWAY_PORT=$GRAPHQL_API_GATEWAY_PORT

```

#### 2. Install (Local)
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install
helm install graphql-maingraph ./charts/repo/deployment \
    --namespace containers \
    --set image.repository="cifarm/graphql-maingraph" \
    --set image.tag="latest" \
    --set service.port=$GRAPHQL_API_GATEWAY_PORT \
    --set service.targetPort=$GRAPHQL_API_GATEWAY_PORT \
    --set env.GRAPHQL_SUBGRAPH_STATIC_URL=$GRAPHQL_SUBGRAPH_STATIC_URL \
    --set env.GRAPHQL_API_GATEWAY_PORT=$GRAPHQL_API_GATEWAY_PORT
```
#### 3. Check deployment
```bash
kubectl get deployment graphql-maingraph-deployment -n containers
```
#### 4. Check pods
```bash
# Get all pods in namespace containers
kubectl get pods -n containers
# Describe a single pod
kubectl describe pods graphql-maingraph-xxxxxxxx  -n containers
# Log a single pod
kubectl logs graphql-maingraph-xxxxxxxx  -n containers
```
#### 5. Uninstall helm
```bash
helm uninstall graphql-maingraph -n containers
```

## Access
### GraphQL Maingraph
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `graphql-maingraph-cluster-service.containers.svc.cluster.local`  
- **Port**: 3006
