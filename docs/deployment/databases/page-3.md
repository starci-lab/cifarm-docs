---
title: "Install Redis"
sidebar_position: 3
description: "Install Redis"
---
# Create a YAML Configuration File
Create a file named `redis-values.yaml` to define the configuration for your Redis deployment. This file contains settings for the master and replica Redis instances, including resource requests and limits.
```bash
# redis-values.yaml

# Disable authentication for Redis
auth:
  enabled: false

# Redis replica configuration
replica:
  replicaCount: 1
  resources:
    requests:
      cpu: "10m"               # CPU request for Redis replica (10 millicores)
      memory: "20Mi"           # Memory request for Redis replica (20 MiB)
    limits:
      cpu: "100m"              # CPU limit for Redis replica (100 millicores)
      memory: "200Mi"          # Memory limit for Redis replica (200 MiB)

# Redis master configuration
master:
  resources:
    requests:
      cpu: "20m"               # CPU request for Redis master (20 millicores)
      memory: "40Mi"           # Memory request for Redis master (40 MiB)
    limits:
      cpu: "200m"              # CPU limit for Redis master (200 millicores)
      memory: "400Mi"          # Memory limit for Redis master (400 MiB)
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/redis-values.yaml).

### Install Job Redis with Bitnami Helm
Job Redis is typically used for handling tasks in a job queue system. It is ideal for managing background tasks or job processing in a distributed system. The Redis master handles both read and write operations for job-related data, while the Redis replicas are primarily used to offload read traffic and ensure availability in high-traffic scenarios.

Once you've created the values file, use the following helm command to install Redis from Bitnami.
```bash
helm install job-redis bitnami/redis \
    --namespace databases \
    --values redis-values.yaml
```
Once Redis is deployed, you can connect to it using the Kubernetes services created for both the Redis Master and Replica. The Redis Master service is accessible via a `ClusterIP` service, with the host `job-redis-master.databases.svc.cluster.local` and port `5432`. This service supports both read and write operations, making it the primary endpoint for interacting with your Redis data.

On the other hand, the Redis Replica service is also exposed via a `ClusterIP` service, using the host `job-redis-replicas.databases.svc.cluster.local` and port `5432`. This service is specifically intended for read-only operations, ensuring that your application can offload read traffic to the replicas while maintaining write operations on the master.

### Install Cache Redis with Bitnami Helm
Cache Redis is used for caching purposes, speeding up application performance by storing frequently accessed data in memory. It is often deployed to cache data such as user sessions, configuration settings, or results of expensive database queries. By storing data in Redis, you reduce the need to access slower back-end systems, which significantly improves application response times.

Once you've created the values file, use the following helm command to install Redis from Bitnami.
```bash
helm install cache-redis bitnami/redis \
    --namespace databases \
    --values redis-values.yaml
```
Once Redis is deployed, you can connect to it using the Kubernetes services created for both the Redis Master and Replica. The Redis Master service is accessible via a `ClusterIP` service, with the host `cache-redis-master.databases.svc.cluster.local` and port `5432`. This service supports both read and write operations, making it the primary endpoint for interacting with your Redis data.

On the other hand, the Redis Replica service is also exposed via a `ClusterIP` service, using the host `cache-redis-replicas.databases.svc.cluster.local` and port `5432`. This service is specifically intended for read-only operations, ensuring that your application can offload read traffic to the replicas while maintaining write operations on the master.

### Install Adapter Redis with Bitnami Helm
Adapter Redis is commonly used in WebSocket applications to manage real-time communication between clients and servers. In this setup, Redis acts as a message broker to efficiently handle and broadcast messages across multiple WebSocket instances or nodes. Redis serves as an intermediary for message passing, ensuring that messages sent by one WebSocket client can be broadcast to other clients across multiple servers or services.

Once you've created the values file, use the following helm command to install Redis from Bitnami.
```bash
helm install adapter-redis bitnami/redis \
    --namespace databases \
    --values redis-values.yaml
```
Once Redis is deployed, you can connect to it using the Kubernetes services created for both the Redis Master and Replica. The Redis Master service is accessible via a `ClusterIP` service, with the host `adapter-redis-master.databases.svc.cluster.local` and port `5432`. This service supports both read and write operations, making it the primary endpoint for interacting with your Redis data.

On the other hand, the Redis Replica service is also exposed via a `ClusterIP` service, using the host `adapter-redis-replicas.databases.svc.cluster.local` and port `5432`. This service is specifically intended for read-only operations, ensuring that your application can offload read traffic to the replicas while maintaining write operations on the master.

