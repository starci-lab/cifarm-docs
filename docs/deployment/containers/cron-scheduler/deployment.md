---
title: "Deployment"
sidebar_position: 2
description: This section guides you through building the Cron Scheduler in your Kubernetes environment using Helm.
---
# Cron Scheduler Deployment
## Introduction
In this section, we will guide you through the process of deploying the Cron Scheduler in your Kubernetes environment. The Cron Scheduler is a critical component of the application, responsible for managing and executing scheduled tasks efficiently. This guide covers all essential steps, including adding or updating the Helm repository, creating a dedicated namespace for deployment, configuring environment variables, and deploying the service using Helm charts.

The deployment process involves setting up key configurations, such as database connection details, and installing the service with the appropriate Helm values. After deployment, we will provide instructions on how to access the service within the cluster and externally using port forwarding.

By following this guide, you will successfully deploy the Cron Scheduler in your Kubernetes environment, integrate it with your PostgreSQL database, and ensure it is fully operational to handle scheduled tasks effectively.

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
kubectl create namespace cron-scheduler-deployment
```
### Create environments
```bash
# Redis cache configuration
export CACHE_REDIS_HOST=localhost
export CACHE_REDIS_PORT=6379

# Redis job configuration
export JOB_REDIS_HOST=localhost
export JOB_REDIS_PORT=6379

# Gameplay Test Postgres configuration
export GAMEPLAY_TEST_POSTGRES_DBNAME=cifarm_test
export GAMEPLAY_TEST_POSTGRES_HOST=127.0.0.1
export GAMEPLAY_TEST_POSTGRES_PORT=5432
export GAMEPLAY_TEST_POSTGRES_USER=postgres
export GAMEPLAY_TEST_POSTGRES_PASS=Cuong123_A

# Cron Scheduler
export GAMEPLAY_SERVICE_HOST=localhost
export GAMEPLAY_SERVICE_PORT=3014

```

### Install
You can install `cron-scheduler-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install cron-scheduler-deployment cifarm/cron-scheduler-deployment
    --set namespace cron-scheduler-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS

```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install cron-scheduler-deployment ./charts/repo/containers/cron-scheduler/build/
    --set namespace cron-scheduler-deployment
    --set secret.env.gameplayPostgres.dbName=$GAMEPLAY_POSTGRES_DBNAME
    --set secret.env.gameplayPostgres.host=$GAMEPLAY_POSTGRES_HOST
    --set secret.env.gameplayPostgres.port=$GAMEPLAY_POSTGRES_PORT
    --set secret.env.gameplayPostgres.user=$GAMEPLAY_POSTGRES_USER
    --set secret.env.gameplayPostgres.pass=$GAMEPLAY_POSTGRES_PASS
```
## Access
### Cron Scheduler
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `cron-scheduler-cluster-ip.cron-scheduler-deployment.svc.cluster.local`  
- **Port**: Private
To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/cron-scheduler-cluster-ip --namespace cron-scheduler-deployment
```