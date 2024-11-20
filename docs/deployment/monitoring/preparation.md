---
title: "Preparation"
sidebar_position: 1
description: "Guide for preparation"
---
# Preparation
## Introduction
In this section, we will prepare the necessary namespace and initial configurations for deploying monitoring solutions such as Prometheus, Grafana, and other related services in your Kubernetes environment. A namespace provides a scope for names, helping organize resources within the cluster and ensuring that different Environments or services can coexist without conflict.

To keep our monitoring resources isolated and organized, we will create a dedicated monitoring namespace. All the resources required for monitoring—such as Prometheus, Grafana, and their associated services—will reside within this namespace.
## Steps
### Create namespace
```bash
kubectl create namespace monitoring
```