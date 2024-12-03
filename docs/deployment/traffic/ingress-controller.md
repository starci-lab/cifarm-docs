---
title: "Ingress Controller"
sidebar_position: 2
description: "Guide for installing Ingress Controller"
---
# Ingress Controller
## Introduction
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Excute scripts
#### 1. Install
```bash
helm install ingress-controller bitnami/nginx-ingress-controller \
--namespace traffic
```
#### 2. Uninstall
```bash
helm uninstall ingress-controller --namespace traffic
```