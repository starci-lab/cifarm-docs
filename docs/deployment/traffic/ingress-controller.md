---
title: "Ingress Controller"
sidebar_position: 2
description: "Guide for installing Ingress Controller"
---
# Ingress Controller
## Introduction
In this section, we will walk through the process of deploying an Ingress Controller in your Kubernetes environment using the Bitnami Helm chart. The Ingress Controller is responsible for managing external access to services in your cluster, particularly for HTTP and HTTPS traffic. By defining Ingress resources, you can control how requests are routed to various services within your Kubernetes cluster.

For this guide, we will be using the NGINX Ingress Controller from Bitnami, which is a widely adopted and reliable solution for handling ingress traffic. You’ll have the flexibility to install the Ingress Controller using either a remote values.yaml configuration file or a local one, depending on your environment and needs.
## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Install
You can install `ingress-controller` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install ingress-controller bitnami/nginx-ingress-controller \
    --namespace traffic \    
    -f https://starci-lab.github.io/cifarm-k8s/bitnami/ingress-controller/values.yaml
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install gameplay-postgresql bitnami/postgresql-ha \
    --namespace traffic \
    -f ./bitnami/ingress-controller/values.yaml
``` 
## Access
