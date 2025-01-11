---
title: "Jenkins"
sidebar_position: 2
description: "Guide for installing Jenkins"
---
# Jenkins
## Introduction
This guide outlines the steps for installing **Jenkins** on your Kubernetes cluster using the official Helm chart. Jenkins is a popular open-source ci-cd server used for building, testing, and deploying software.

---

## Prerequisites
1. A Kubernetes cluster running and accessible.
2. `kubectl` and `Helm` installed on your local machine.
3. A namespace for Jenkins (recommended: `jenkins` or `ci-cd`).

---

## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Set environments
```bash
# Set the new Grafana admin credentials
export ADMIN_USER=cifarm
export ADMIN_PASSWORD=admin@123456
```
### Execute scripts
#### 1. Install
```bash
helm install jenkins bitnami/jenkins \
    --namespace ci-cd \
    --set jenkinsUser=$ADMIN_USER \
    --set jenkinsPassword=$ADMIN_PASSWORD \
    --set persistence.enabled=true \
    --set persistence.size=10Gi \
    --set resources.requests.cpu="30m" \
    --set resources.requests.memory="60Mi" \
    --set resources.limits.cpu="300m" \
    --set resources.limits.memory="600Mi" \
    --set service.type=ClusterIP

```
#### 2. Uninstall
```bash
helm uninstall jenkins -n ci-cd
```
## Access
### Jenkins
- **Kind**: Service  
- **Type**: ClusterIP
- **Broker**: 
    - `jenkins.ci-cd.svc.cluster.local`
- **Port**: 9092    
- **Note**: Producer & Consumer