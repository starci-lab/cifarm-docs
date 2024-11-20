---
title: "Gameplay"
sidebar_position: 1
description: "Guide for installing Gameplay PostgreSQL"
---
# Gameplay PostgreSQL Database
## Introduction
This guide outlines the steps to deploy a Gameplay PostgreSQL Database using the Bitnami PostgreSQL High Availability (HA) Helm Chart in a Kubernetes environment. PostgreSQL is a powerful, open-source relational database system, and with Bitnami's Helm chart, you can easily deploy a highly available, fault-tolerant PostgreSQL setup with replication and automatic failover.

The purpose of this deployment is to provide a robust database solution for storing gameplay data, such as player profiles, game states, scores, and more, in a Kubernetes-based infrastructure. By leveraging Kubernetes and Helm, you can automate the installation, scaling, and management of your PostgreSQL database with minimal manual intervention.

In the following sections, we will walk through the necessary steps to configure and deploy the database, customize key settings, and ensure that the database is accessible from other applications within the same Kubernetes cluster.
## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Create namespace
```bash
kubectl create namespace gameplay-postgresql
```
### Set Environments
```bash
export GAMEPLAY_POSTGRES_DBNAME="gameplay"
export GAMEPLAY_POSTGRES_PORT="5432"
export GAMEPLAY_POSTGRES_PASS="Cuong123_A"
```
### Install
You can install `gameplay-postgresql` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install gameplay-postgresql bitnami/postgresql-ha \
    --namespace gameplay-postgresql \
    -f https://starci-lab.github.io/cifarm-k8s/bitnami/databases/gameplay-postgresql/values.yaml \
    --set global.postgresql.password=$GAMEPLAY_POSTGRES_PASS \
    --set global.postgresql.repmgrPassword=$GAMEPLAY_POSTGRES_PASS \
    --set global.postgresql.database=$GAMEPLAY_POSTGRES_DBNAME \
    --set global.postgresql.repmgrDatabase=$GAMEPLAY_POSTGRES_DBNAME \
    --set postgresql.containerPorts.postgresql=$GAMEPLAY_POSTGRES_PORT
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install the chart
helm install gameplay-postgresql bitnami/postgresql-ha \
    --namespace gameplay-postgresql \
    -f ./bitnami/databases/gameplay-postgresql/values.yaml \
    --set global.postgresql.password=$GAMEPLAY_POSTGRES_PASS \
    --set global.postgresql.repmgrPassword=$GAMEPLAY_POSTGRES_PASS \
    --set global.postgresql.database=$GAMEPLAY_POSTGRES_DBNAME \
    --set global.postgresql.repmgrDatabase=$GAMEPLAY_POSTGRES_DBNAME \
    --set postgresql.containerPorts.postgresql=$GAMEPLAY_POSTGRES_PORT
```
## Access 
### PgPool
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `gameplay-postgresql-postgresql-ha-pgpool.gameplay-postgresql.svc.cluster.local`  
- **Port**: 5432

To forward the port for local access, use the following command
```bash
# Forward port for Gameplay PostgreSQL
kubectl port-forward svc/gameplay-postgresql-postgresql-ha-pgpool \
--namespace monitoring 5432:5432

# Connect to PostgreSQL Database
PGPASSWORD=Cuong123_A psql -h 127.0.0.1 -p 5432 -d gameplay
```