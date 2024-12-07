---
title: "Portainer"
sidebar_position: 5
description: "Guide for installing Portainer"
---
# Portainer
## Introduction

## Steps
### Add the Bitnami helm repository
```bash
helm repo add portainer https://portainer.github.io/k8s/
helm repo update
```
### Execute scripts
#### 1.Install
```bash
helm install portainer -n monitoring portainer/portainer \
    --namespace monitoring \
    --set replicaCount=1 \
    --set service.type=ClusterIP \
    --set serviceAccount.name=cifarm \
    --set ingress.enabled=true \
    --set ingress.annotations."kubernetes\.io/ingress\.class"=nginx \
    --set persistence.size="5Gi"
```
#### 2.Uninstall
```bash
helm uninstall portainer --namespace monitoring
```
## Access
