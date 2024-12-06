---
title: "Jenkins"
sidebar_position: 2
description: "Guide for installing Jenkins"
---
# Jenkins
## Introduction
This guide outlines the steps for installing **Jenkins** on your Kubernetes cluster using the official Helm chart. Jenkins is a popular open-source automation server used for building, testing, and deploying software.

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
export ADMIN_PASSWORD=WfcEm30BoFg92XCq
```
### Execute scripts
#### 1. Install
```bash
helm install jenkins bitnami/jenkins \
    --namespace automation \
    --set jenkinsUser=$ADMIN_USER \
    --set jenkinsPassword=$ADMIN_PASSWORD \
    --set persistence.enabled=true \
    --set persistence.size=10Gi \
    --set controller.resources.requests.cpu="30m" \
    --set controller.resources.requests.memory="60Mi" \
    --set controller.resources.limits.cpu="300m" \
    --set controller.resources.limits.memory="600Mi" \
    --set service.type=ClusterIP

```
#### 2. Uninstall
```bash
helm uninstall jenkins -n automation
```
## Access
### Jenkins
- **Kind**: Service  
- **Type**: ClusterIP
- **Broker**: 
    - `jenkins.automation.svc.cluster.local`
- **Port**: 9092    
- **Note**: Producer & Consumer