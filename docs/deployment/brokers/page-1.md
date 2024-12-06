---
title: "Setup"
sidebar_position: 1
description: "Setup"
---
# Setup
This guide walks you through the steps to set up your Kubernetes environment, starting with creating the `brokers` namespace to organize your broker-related resources.
### Create Namespace
```bash
kubectl create namespace brokers
```
This command sets up the `brokers` namespace within your Kubernetes cluster, helping to logically group and isolate resources related to brokers.