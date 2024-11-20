---
title: "Prometheus"
sidebar_position: 2
description: "Guide for installing Prometheus"
---
# Prometheus
## Introduction
This guide outlines the steps to deploy and configure Prometheus for monitoring and alerting in your Kubernetes environment. Prometheus is a powerful, open-source monitoring and alerting toolkit widely used to collect and store metrics, providing detailed insights into the health and performance of your applications and infrastructure.

By deploying Prometheus in a Kubernetes cluster, you can monitor the performance of your PostgreSQL database (or any other services) in real-time, track key metrics, and set up alerts for various thresholds, such as database health, resource usage, and query performance.

Prometheus integrates seamlessly with Kubernetes, leveraging the cluster's native capabilities to discover and scrape metrics from services, pods, and nodes. It collects time-series data, making it easier to visualize trends, diagnose issues, and ensure the smooth operation of your system.

In this guide, we will walk through the steps to deploy Prometheus, configure essential monitoring components, and set up alerting rules to help you proactively monitor your PostgreSQL database and other critical resources within your Kubernetes infrastructure.
## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Install
You can install `prometheus` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install grafana bitnami/grafana \
    --namespace monitoring \
    -f https://starci-lab.github.io/cifarm-k8s/bitnami/monitoring/prometheus/values.yaml \
    --set 
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s

# Install the chart
helm install prometheus bitnami/kube-prometheus \
    --namespace monitoring \
    -f ./bitnami/monitoring/prometheus/values.yaml
```
## Access 
### Prometheus Server
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `prometheus-kube-prometheus-prometheus.monitoring.svc.cluster.local`  
- **Port**: 9090

To forward the port for local access, use the following command
```bash
# Forward port for Prometheus
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090 \
--namespace monitoring

# Visit the Prometheus Dashboard
http://127.0.0.1:9090
```
### Prometheus Alertmanager Server
- **Kind**: Service  
- **Type**: ClusterIP  
- **Host**: `prometheus-kube-prometheus-alertmanager.monitoring.svc.cluster.local`  
- **Port**: 9093

To forward the port for local access, use the following command
```bash
# Forward port for Alertmanager
kubectl port-forward svc/prometheus-kube-prometheus-alertmanager 9093:9093 \
--namespace monitoring

# Visit the Alertmanager Dashboard
http://127.0.0.1:9093
```