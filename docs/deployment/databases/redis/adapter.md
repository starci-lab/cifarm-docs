---
title: "Adapter"
sidebar_position: 2
description: "Guide for installing Adapter redis"
---
# Redis
## Introduction

## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Create namespace
```bash
kubectl create namespace adapter-redis
```
### Install
You can install `adapter-redis` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install job-redis bitnami/redis \
    --namespace job-redis \
    -f https://starci-lab.github.io/cifarm-k8s/bitnami/databases/gameplay-postgresql/values.yaml
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install the chart
helm install job-redis bitnami/redis \
    --namespace job-redis \
    -f ./bitnami/databases/redis/job/values.yaml
```
## Access 
### Master Redis
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `job-redis-master.job-redis.svc.cluster.local`  
- **Port**: 6379

To forward the port for local access, use the following command
```bash
# Forward port for Gameplay Redis
kubectl port-forward --namespace job-redis svc/job-redis-master 6379:6379

# Connect to Redis using redis-cli
redis-cli -h 127.0.0.1 -p 6379
```