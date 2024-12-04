---
title: "Adapter"
sidebar_position: 2
description: "Guide for installing Adapter Redis"
---
# Adapter Redis
## Introduction
This guide explains how to install **Adapter Redis** using the Bitnami Redis Helm chart. It covers the installation process, how to uninstall the release, and how to access both the **Master** and **Replica**
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Excecute scripts
#### 1. Install
```bash
helm install adapter-redis bitnami/redis \
    --namespace databases \
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
helm uninstall adapter-redis --namespace databases
```
## Access 
### Adapter Redis Master
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `adapter-redis-master.databases.svc.cluster.local`  
- **Port**: 6379
- **Note**: Write & Read
### Adapter Redis Replicas
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `adapter-redis-replicas.databases.svc.cluster.local`  
- **Port**: 6379
- **Note**: Read-only