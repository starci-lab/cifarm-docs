---
title: "Install PostgreSQL HA"
sidebar_position: 1
description: "Install PostgreSQL HA"
---
# Install PostgreSQL HA
### Gameplay PostgreSQL
Create a YAML file `postgresql-ha-values.yaml` with the following content to configure your PostgreSQL instance. This file defines settings for the database, replication, and resource allocations for the pods.
```bash
# Global PostgreSQL settings
global:
  postgresql:
    # The name of the PostgreSQL database to be created
    database: example        # Replace example with your database name
    
    # The password for the PostgreSQL superuser
    password: example          # Replace example with your password
    
    # The name of the repmgr database used for replication
    repmgrDatabase: example  # Replication database name (usually same as database)
    
    # The password for the PostgreSQL replication user
    repmgrPassword: example    # Password for the repmgr user

# PostgreSQL PGPool resource configurations (for connection pooling)
pgpool:
  resources:
    # Resource requests for PGPool, setting the CPU and memory needed at a minimum
    requests:
      cpu: "40m"                       # Set the requested CPU for PGPool (40 millicores)
      memory: "80Mi"                   # Set the requested memory for PGPool (80 MiB)
    
    # Resource limits for PGPool, setting the maximum CPU and memory PGPool can use
    limits:
      cpu: "400m"                      # Set the maximum CPU for PGPool (400 millicores)
      memory: "800Mi"                  # Set the maximum memory for PGPool (800 MiB)

# PostgreSQL database resource configurations (for the main PostgreSQL instances)
postgresql:
  resources:
    # Resource requests for PostgreSQL, setting the CPU and memory needed at a minimum
    requests:
      cpu: "20m"                       # Set the requested CPU for PostgreSQL (20 millicores)
      memory: "40Mi"                   # Set the requested memory for PostgreSQL (40 MiB)
    
    # Resource limits for PostgreSQL, setting the maximum CPU and memory PostgreSQL can use
    limits:
      cpu: "200m"                      # Set the maximum CPU for PostgreSQL (200 millicores)
      memory: "400Mi"                  # Set the maximum memory for PostgreSQL (400 MiB)

# Witness server resource configurations (for the HA witness pod)
witness:
  resources:
    # Resource requests for the witness pod, setting the CPU and memory needed at a minimum
    requests:
      cpu: "10m"                       # Set the requested CPU for witness (10 millicores)
      memory: "20Mi"                   # Set the requested memory for witness (20 MiB)
    
    # Resource limits for the witness pod, setting the maximum CPU and memory it can use
    limits:
      cpu: "100m"                      # Set the maximum CPU for witness (100 millicores)
      memory: "200Mi"                  # Set the maximum memory for witness (200 MiB)
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/gameplay-postgresql-values.yaml).

Once you've created the values file, use the following helm command to install PostgreSQL with high availability (HA) from Bitnami.
```bash
helm install gameplay-postgresql bitnami/postgresql-ha \
    --namespace databases \
    --values postgresql-ha-values.yaml
```
Once the PostgreSQL deployment is complete, you can connect to the database using the PgPool service, which is accessible via the host `gameplay-postgresql-postgresql-ha-pgpool.databases.svc.cluster.local` on port `5432`. This service is configured as a `ClusterIP` type, allowing it to handle both read and write operations, ensuring efficient load balancing and connection pooling for improved performance.