---
title: "Cache"
sidebar_position: 1
description: "Guide for installing Cache Redis"
---
# Cache Redis
## Introduction
This guide explains how to install **Cache Redis** using the Bitnami Redis Helm chart. It covers the installation process, how to uninstall the release, and how to access both the **Master** and **Replica**
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Excecute scripts
#### 1. Install
```bash
helm install cache-redis bitnami/redis \
    --namespace database \
    --set replica.replicaCount=1 \
    --set replica.resources.requests.cpu="10m" \
    --set replica.resources.requests.memory="20Mi" \
    --set replica.resources.limits.cpu="100m" \
    --set replica.resources.limits.memory="200Mi" \
    --set master.resources.requests.cpu="20m" \
    --set master.resources.requests.memory="40Mi" \
    --set master.resources.limits.cpu="200m" \
    --set master.resources.limits.memory="400Mi"
```
#### 2. Uninstall
```bash
helm uninstall cache-redis --namespace databases
```
## Access 
### Cache Redis Master
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `cache-redis-master.databases.svc.cluster.local`  
- **Port**: 5432
- **Note**: Write & Read
### Cache Redis Replicas
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `cache-redis-replicas.databases.svc.cluster.local`  
- **Port**: 5432
- **Note**: Read-only