---
title: "Preparation"
sidebar_position: 1
description: "Guide for preparation"

---
# Preparation
## Introduction
In this section, we will set up the necessary namespace for managing traffic-related components in your Kubernetes environment. A namespace in Kubernetes is a way to organize and isolate resources within a cluster, ensuring that different components don't conflict with one another.

For our use case, we will create a dedicated traffic namespace, which will house all the resources related to traffic management, such as the Ingress Controller and any other associated services. This step helps keep your traffic management infrastructure isolated and manageable within the cluster.
## Steps
### Create namespace
```bash
kubectl create namespace traffic
```