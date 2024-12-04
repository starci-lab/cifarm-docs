---
title: "Ingress Controller"
sidebar_position: 2
description: "Guide for installing Ingress Controller"
---
# Ingress Controller
## Introduction
This guide will help you install and uninstall the NGINX Ingress Controller using the Bitnami Helm chart.
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Excute scripts
#### 1. Install
```bash
helm install ingress-controller bitnami/nginx-ingress-controller \
  --namespace traffic \
  --set defaultBackend.resources.requests.cpu=10m \
  --set defaultBackend.resources.requests.memory=20Mi \
  --set defaultBackend.resources.limits.cpu=100m \
  --set defaultBackend.resources.limits.memory=200Mi \
  --set resources.requests.cpu=30m \
  --set resources.requests.memory=60Mi \
  --set resources.limits.cpu=300m \
  --set resources.limits.memory=600Mi
```
#### 2. Uninstall
```bash
helm uninstall ingress-controller --namespace traffic
```