---
title: "Prometheus"
sidebar_position: 2
description: "Guide for installing Prometheus"
---
# Prometheus
## Introduction
This guide will walk you through the process of installing **Prometheus** for monitoring your Kubernetes cluster using the Bitnami **Kube-Prometheus** Helm chart. Prometheus is an open-source system monitoring and alerting toolkit, and this setup includes various components like **Alertmanager**, **Blackbox Exporter**, **Prometheus Thanos**, and others for comprehensive monitoring.
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Execute scripts
#### 1. Install
```bash
helm install prometheus bitnami/kube-prometheus \
    --namespace monitoring \
    --set alertmanager.resources.requests.cpu="10m" \
    --set alertmanager.resources.requests.memory="20Mi" \
    --set alertmanager.resources.limits.cpu="100m" \
    --set alertmanager.resources.limits.memory="200Mi" \
    --set blackboxExporter.resources.requests.cpu="10m" \
    --set blackboxExporter.resources.requests.memory="20Mi" \
    --set blackboxExporter.resources.limits.cpu="100m" \
    --set blackboxExporter.resources.limits.memory="200Mi" \
    --set operator.resources.requests.cpu="10m" \
    --set operator.resources.requests.memory="20Mi" \
    --set operator.resources.limits.cpu="100m" \
    --set operator.resources.limits.memory="200Mi" \
    --set prometheus.resources.requests.cpu="20m" \
    --set prometheus.resources.requests.memory="40Mi" \
    --set prometheus.resources.limits.cpu="200m" \
    --set prometheus.resources.limits.memory="400Mi" \
    --set prometheus.thanos.resources.requests.cpu="10m" \
    --set prometheus.thanos.resources.requests.memory="20Mi" \
    --set prometheus.thanos.resources.limits.cpu="100m" \
    --set prometheus.thanos.resources.limits.memory="200Mi" \
    --set node-exporter.resources.requests.cpu="10m" \
    --set node-exporter.resources.requests.memory="20Mi" \
    --set node-exporter.resources.limits.cpu="100m" \
    --set node-exporter.resources.limits.memory="200Mi" \
    --set kube-state-metrics.resources.requests.cpu="10m" \
    --set kube-state-metrics.resources.requests.memory="20Mi" \
    --set kube-state-metrics.resources.limits.cpu="100m" \
    --set kube-state-metrics.resources.limits.memory="200Mi"
```
#### 2. Uninstall
```bash
helm uninstall prometheus --namespace monitoring
```
## Access 
### Prometheus
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `prometheus-kube-prometheus-prometheus.monitoring.svc.cluster.local`  
- **Port**: 9090

### Prometheus Alertmanager
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `prometheus-kube-prometheus-alertmanager.monitoring.svc.cluster.local`  
- **Port**: 9093