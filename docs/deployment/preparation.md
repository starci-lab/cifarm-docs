---
title: "Preparation"
sidebar_position: 2
---

# Preparation
### Installing AWS CLI, EKS CLI, Kubectl
To get started, you'll need to install and configure the AWS CLI, EKS CLI, and Kubectl for managing your Kubernetes clusters on AWS. Follow the instructions [here](https://viblo.asia/p/thuc-hanh-set-up-kubernetes-cluster-tren-amazon-web-services-elastic-kubernetes-service-Qbq5QQEz5D8) to set up your environment.
For helm, you can take a look here
### Helm Repositories
We use the KEDA and Bitnami Helm charts for managing workloads and services in Kubernetes. To install Helm, ensure you have access to the required repositories:
```bash
helm repo add kedacore https://kedacore.github.io/charts  
helm repo add bitnami https://charts.bitnami.com/bitnami  
```