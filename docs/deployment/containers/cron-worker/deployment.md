---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Cron Worker in your Kubernetes environment using Helm.
---
# Cron Worker Deployment
## Introduction

In this section, we provide a detailed guide to deploying the Cron Worker in your Kubernetes environment. The Cron Worker is an integral part of the application, responsible for executing scheduled tasks and background operations. This guide will walk you through the process of adding or updating the Helm repository, creating a dedicated namespace, configuring essential environment variables, and deploying the service using Helm charts.

The deployment steps include configuring key settings, such as database connection details, and installing the service using Helm. After deployment, we will outline how to access the Cron Worker service both within the cluster and externally using port forwarding.

By following this guide, you will be able to deploy the Cron Worker in your Kubernetes environment, integrate it with your PostgreSQL database, and ensure it is fully operational to handle scheduled jobs and tasks effectively.

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
kubectl create namespace cron-worker-deployment
```
### Create environments
```bash

# Redis job configuration
export JOB_REDIS_HOST=localhost
export JOB_REDIS_PORT=6379

# Gameplay Test Postgres configuration
export GAMEPLAY_TEST_POSTGRES_DBNAME=cifarm_test
export GAMEPLAY_TEST_POSTGRES_HOST=127.0.0.1
export GAMEPLAY_TEST_POSTGRES_PORT=5432
export GAMEPLAY_TEST_POSTGRES_USER=postgres
export GAMEPLAY_TEST_POSTGRES_PASS=Cuong123_A

# Redis adapter configuration
export ADAPTER_REDIS_HOST=localhost
export ADAPTER_REDIS_PORT=6379

```

### Install
You can install `cron-worker-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install cron-worker-deployment cifarm/cron-worker-deployment
    --set namespace cron-worker-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install cron-worker-deployment ./charts/repo/containers/cron-worker/build/
    --set namespace cron-worker-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### Cron Worker
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `cron-worker-cluster-ip.cron-worker-deployment.svc.cluster.local`  
- **Port**: Private
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/cron-worker-cluster-ip --namespace cron-worker-deployment
```