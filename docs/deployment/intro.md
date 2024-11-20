---
sidebar_position: 1
---

# Intro

Welcome to **CiFarm Kubernetes Configuration**! This documentation will guide you through deploying and managing your CiFarm application, including its dependencies, using Helm charts on Kubernetes.

## Overview

This repository contains a Helm chart for deploying CiFarm alongside essential dependencies provided by **Bitnami** and **Kuda Helm charts**. These dependencies include databases, caching systems, monitoring tools, and message brokers.

### Key Components

- **Bitnami**: Trusted open-source Helm charts for Kubernetes.
    - **Databases**: [Gameplay PostgreSQL](./bitnami/databases/gameplay-postgresql/README.md)
    - **Monitoring**:
        - [Grafana](./bitnami/monitoring/README.md)
        - [Prometheus](./bitnami/monitoring/README.md)
        - [IngressController](./bitnami/ingress-controller/README.md)

- **Keda**: [Keda](./keda/README.md), a Kubernetes-based event-driven autoscaler.

### CiFarm Helm Chart

#### Wallet Service
- **Build**: [Build Instructions](./charts/repo/containers/wallet-service/build/README.md)
- **Deployment**: [Deployment Instructions](./charts/repo/containers/wallet-service/deployment/README.md)

#### Ingress Configuration
- Main configuration and routing rules are detailed in the [Ingress README](./charts/repo/ingress/README.md).

---

Get started by exploring the guides and configuration files to set up your CiFarm application effortlessly!
