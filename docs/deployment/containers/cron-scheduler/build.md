---
title: "Build"
sidebar_position: 1
description: This section guides you through building the Cron Scheduler in your Kubernetes environment using Helm.
---
# Cron Scheduler Build
## Introduction
In this section, we provide a comprehensive guide to building and deploying the Cron Scheduler in your Kubernetes environment. This service plays a vital role in managing and executing scheduled tasks within the application. The guide includes detailed instructions for configuring the Helm repository, creating namespaces, setting environment variables, and deploying the service using Helm charts to ensure smooth and reliable scheduling operations.

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
kubectl create namespace cron-scheduler-build
```
### Create environments
```bash
# Redis cache configuration
export CACHE_REDIS_HOST=localhost
export CACHE_REDIS_PORT=6379

# Gameplay Test Postgres configuration
export GAMEPLAY_TEST_POSTGRES_DBNAME=cifarm_test
export GAMEPLAY_TEST_POSTGRES_HOST=127.0.0.1
export GAMEPLAY_TEST_POSTGRES_PORT=5432
export GAMEPLAY_TEST_POSTGRES_USER=postgres
export GAMEPLAY_TEST_POSTGRES_PASS=Cuong123_A

# Gameplay Service
export GAMEPLAY_SERVICE_HOST=localhost
export GAMEPLAY_SERVICE_PORT=3014

```
### Create environments
```bash
export DOCKER_SERVER="https://index.docker.io/v1/"
export DOCKER_USERNAME="cifarm"
export DOCKER_PASSWORD="*****"
export DOCKER_EMAIL="cifarm.starcilab@gmail.com"
```
### Install
You can install `cron-scheduler-build` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install cron-scheduler-build cifarm/cron-scheduler-build
    --set namespace cron-scheduler-build
    --set secret.imageCredentials.registry=$DOCKER_SERVER
    --set secret.imageCredentials.username=$DOCKER_USERNAME
    --set secret.imageCredentials.password=$DOCKER_PASSWORD
    --set secret.imageCredentials.email=$DOCKER_EMAIL
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install cron-scheduler-build ./charts/repo/containers/cron-scheduler/build/
    --set namespace cron-scheduler-build
    --set secret.imageCredentials.registry=$DOCKER_SERVER
    --set secret.imageCredentials.username=$DOCKER_USERNAME
    --set secret.imageCredentials.password=$DOCKER_PASSWORD
    --set secret.imageCredentials.email=$DOCKER_EMAIL
```