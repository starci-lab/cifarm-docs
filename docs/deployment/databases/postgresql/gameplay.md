---
title: "Gameplay"
sidebar_position: 1
description: "Guide for installing Gameplay PostgreSQL"
---
# Gameplay PostgreSQL Database
## Introduction
This guide will walk you through the process of setting up the **Gameplay PostgreSQL** database using the Bitnami PostgreSQL HA Helm chart. It covers everything from adding the necessary Helm repositories to configuring and installing the PostgreSQL setup, as well as uninstalling it if needed.

## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Set environments
```bash
export POSTGRES_DBNAME=gameplay
export POSTGRES_PASS=UqW1R2J7UhKv6Aqf
```
### Excecute scripts
#### 1. Install
```bash
helm install gameplay-postgresql bitnami/postgresql-ha \
    --namespace databases \
    --set global.postgresql.database=$POSTGRES_DBNAME \
    --set global.postgresql.password=$POSTGRES_PASS \
    --set global.postgresql.repmgrDatabase=$POSTGRES_DBNAME \
    --set global.postgresql.repmgrPassword=$POSTGRES_PASS \
    --set pgpool.resources.requests.cpu="40m" \
    --set pgpool.resources.requests.memory="80Mi" \
    --set pgpool.resources.limits.cpu="400m" \
    --set pgpool.resources.limits.memory="800Mi" \
    --set postgresql.resources.requests.cpu="20m" \
    --set postgresql.resources.requests.memory="40Mi" \
    --set postgresql.resources.limits.cpu="200m" \
    --set postgresql.resources.limits.memory="400Mi" \
    --set witness.resources.requests.cpu="10m" \
    --set witness.resources.requests.memory="20Mi" \
    --set witness.resources.limits.cpu="100m" \
    --set witness.resources.limits.memory="200Mi"
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/gameplay-postgresql-values.yaml).
#### 2. Uninstall
```bash
helm uninstall gameplay-postgresql --namespace databases
#If passwords is not specified, careful to use
kubectl delete pvc --all --namespace databases
```
## Access 
### Gameplay PgPool
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local`  
- **Port**: 5432
- **Note**: Write & Read