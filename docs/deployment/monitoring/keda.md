---
title: "Keda"
sidebar_position: 4
description: "Guide for installing Keda"
---
# Keda
## Introduction
**Keda** (Kubernetes Event-Driven Autoscaling) is an open-source project that allows Kubernetes workloads to scale based on external events, such as messages in a queue or metrics from an external service. This guide provides the steps to install **Keda** using the **Keda Helm chart** in your Kubernetes cluster. With **Keda**, you can implement event-driven scaling that integrates with various event sources, ensuring efficient resource usage and scaling based on actual demand.
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Execute scripts
#### 1.Install
```bash
helm install keda kedacore/keda \
    --namespace monitoring \
    --set replicaCount=1 \
    --set resources.operator.requests.cpu="10m" \
    --set resources.operator.requests.memory="20Mi" \
    --set resources.operator.limits.cpu="100m" \
    --set resources.operator.limits.memory="200Mi" \
    --set resources.metricServer.requests.cpu="10m" \
    --set resources.metricServer.requests.memory="20Mi" \
    --set resources.metricServer.limits.cpu="100m" \
    --set resources.metricServer.limits.memory="200Mi" \
    --set resources.webhooks.requests.cpu="10m" \
    --set resources.webhooks.requests.memory="20Mi" \
    --set resources.webhooks.limits.cpu="100m" \
    --set resources.webhooks.limits.memory="200Mi"
```
#### 2.Uninstall
```bash
helm uninstall keda --namespace monitoring
```
## Access
