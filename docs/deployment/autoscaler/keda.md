---
title: "Keda"
sidebar_position: 2
description: "Guide for installing Keda"
---
# Keda
## Introduction
In this section, we will guide you through the process of deploying KEDA (Kubernetes Event-Driven Autoscaling) in your Kubernetes environment. KEDA enables automatic scaling of your Kubernetes workloads based on external events, rather than just CPU or memory utilization. It allows your applications to scale dynamically based on factors like the length of message queues or custom metrics, making it ideal for event-driven applications.

We will install KEDA using the Bitnami Helm chart, which simplifies the process of deploying KEDA and ensures a stable and supported installation. You will also have the option to use a remote values.yaml configuration or a local copy, depending on your preference.
## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Install
You can install `keda` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install keda kedacore/keda \
    --namespace autoscaler \
    -f https://starci-lab.github.io/cifarm-k8s/keda/values.yaml
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install kedacore/keda \
    --namespace autoscaler \
    -f ./bitnami/ingress-controller/values.yaml
``` 
## Access
