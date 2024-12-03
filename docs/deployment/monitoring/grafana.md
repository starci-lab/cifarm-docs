---
title: "Grafana"
sidebar_position: 3
description: "Guide for installing Grafana"
---
# Grafana
## Introduction
This guide provides the steps to install **Grafana** using the Bitnami Helm chart in your Kubernetes cluster. Grafana is a popular open-source platform for monitoring and observability, and this guide includes the installation of Grafana with metrics enabled, as well as configuring admin credentials for secure access.
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Set environments
```bash
# Set the new Grafana admin credentials
export ADMIN_USER=cifarm
export ADMIN_PASSWORD=WfcEm30BoFg92XCq
```
### Execute scripts
#### 1. Install
```bash
helm install grafana bitnami/grafana \
    --namespace monitoring \
    --set admin.user=$ADMIN_USER \
    --set admin.password=$ADMIN_PASSWORD \
    --set metrics.enabled=true \
    --set grafana.resources.requests.cpu="10m" \
    --set grafana.resources.requests.memory="20Mi" \
    --set grafana.resources.limits.cpu="100m" \
    --set grafana.resources.limits.memory="200Mi"
```
#### 2. Uninstall
```bash
helm uninstall grafana --namespace monitoring
```
## Access
### Grafana Web UI
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `grafana.monitoring.svc.cluster.local`  
- **Port**: 3000