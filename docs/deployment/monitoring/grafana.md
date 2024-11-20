---
title: "Grafana"
sidebar_position: 3
description: "Guide for installing Grafana"
---
# Grafana
## Introduction
This guide explains how to deploy Grafana in a Kubernetes environment, using the Bitnami Helm Chart to streamline the process. Grafana is an open-source platform for data visualization and monitoring, allowing you to create rich, interactive dashboards that can display a wide variety of data sources, including Prometheus.

Grafana is widely used in conjunction with Prometheus to visualize time-series data. It allows you to create customizable dashboards that give you a clear view of your infrastructure's health, performance, and key metrics. By integrating Prometheus with Grafana, you can easily visualize the metrics collected from your Kubernetes cluster and services, helping you gain insights into system performance, detect issues, and optimize workloads.
## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Set Grafana Environments
```bash
# Set the new Grafana admin credentials
export GRAFANA_ADMIN_USER='admin'
export GRAFANA_ADMIN_PASSWORD='secret_password'
```
### Install
You can install `grafana` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install prometheus bitnami/kube-prometheus \
    --namespace monitoring \
    -f https://starci-lab.github.io/cifarm-k8s/bitnami/monitoring/grafana/values.yaml
    --set admin.user=$GRAFANA_ADMIN_USER \
    --set admin.password=$GRAFANA_ADMIN_PASSWORD
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install the chart
helm install grafana bitnami/grafana \
    --namespace monitoring \
    -f ./bitnami/monitoring/grafana/values.yaml
    --set admin.user=$GRAFANA_ADMIN_USER \
    --set admin.password=$GRAFANA_ADMIN_PASSWORD
```
## Access
### Grafana Web UI
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `grafana.monitoring.svc.cluster.local`  
- **Port**: 3000

To forward the port for local access, use the following command
```bash
# Forward port for Grafana
kubectl port-forward svc/grafana --namespace monitoring 3000:3000
curl 127.0.0.1:3000

# Visit the Grafana Dashboard
http://127.0.0.1:3000
```