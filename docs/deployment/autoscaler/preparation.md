---
title: "Preparation"
sidebar_position: 1
description: "Guide for preparation"
---
# Preparation
## Introduction
In this section, we will set up the necessary namespace for managing autoscaling components in your Kubernetes environment. A namespace in Kubernetes is a way to organize resources within the cluster, ensuring that different components can be isolated and managed independently. For this guide, we will create a dedicated autoscaler namespace, which will house all resources related to scaling, such as KEDA (Kubernetes Event-Driven Autoscaling) and other related services.

By creating a dedicated namespace, you help keep autoscaling resources organized and easily manageable within your Kubernetes cluster, ensuring that scaling-related components do not interfere with other workloads.
## Steps
### Create namespace
```bash
kubectl create namespace autoscaler
```