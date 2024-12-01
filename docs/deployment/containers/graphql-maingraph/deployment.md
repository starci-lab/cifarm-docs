---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the GraphQL Maingraph in your Kubernetes environment using Helm.
---
# GraphQL Maingraph Deployment
## Introduction
This section provides a comprehensive guide to deploying the GraphQL Maingraph in your Kubernetes environment. As a central component of the application, the GraphQL Maingraph is responsible for managing and aggregating GraphQL queries to support gameplay-related operations. This guide will take you through the process of adding or updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and deploying the service using Helm charts.

The deployment steps include configuring essential settings, such as database connection details, and installing the service with the appropriate Helm values. After deployment, we will provide instructions on how to access the GraphQL Maingraph service both within the cluster and externally using port forwarding.

By following this guide, you will successfully deploy the GraphQL Maingraph in your Kubernetes environment, integrate it with the PostgreSQL database, and ensure it is fully functional to handle GraphQL operations efficiently.

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
kubectl create namespace graphql-maingraph-deployment
```
### Create environments
```bash

# GraphQL Subgraph
export GRAPHQL_SUBGRAPH_STATIC_URL=http://host.docker.internal:3007/graphql

```

### Install
You can install `graphql-maingraph-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install graphql-maingraph-deployment cifarm/graphql-maingraph-deployment
    --set namespace graphql-maingraph-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install graphql-maingraph-deployment ./charts/repo/containers/graphql-maingraph/build/
    --set namespace graphql-maingraph-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### GraphQL Maingraph
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `graphql-maingraph-cluster-ip.graphql-maingraph-deployment.svc.cluster.local`  
- **Port**: 3014
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/graphql-maingraph-cluster-ip --namespace graphql-maingraph-deployment 3014:3014
```