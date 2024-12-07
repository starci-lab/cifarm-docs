---
title: "Install Prometheus & Grafana"
sidebar_position: 2
description: "Install Prometheus & Grafana"
---
# Install Prometheus & Grafana
### Install Prometheus
First, create a YAML configuration file named `prometheus-values.yaml` for configuring Prometheus. This file defines resource settings for components such as Alertmanager, Blackbox Exporter, Operator, Prometheus, Node Exporter, and Kube-State-Metrics.
```bash
# prometheus-values.yaml

# Resource settings for Alertmanager
alertmanager:
  resources:
    requests:
      cpu: "10m"
      memory: "20Mi"
    limits:
      cpu: "100m"
      memory: "200Mi"

# Resource settings for Blackbox Exporter
blackboxExporter:
  resources:
    requests:
      cpu: "10m"
      memory: "20Mi"
    limits:
      cpu: "100m"
      memory: "200Mi"

# Resource settings for Operator
operator:
  resources:
    requests:
      cpu: "10m"
      memory: "20Mi"
    limits:
      cpu: "100m"
      memory: "200Mi"

# Resource settings for Prometheus
prometheus:
  resources:
    requests:
      cpu: "40m"
      memory: "80Mi"
    limits:
      cpu: "400m"
      memory: "900Mi"
  thanos:
    resources:
      requests:
        cpu: "10m"
        memory: "20Mi"
      limits:
        cpu: "100m"
        memory: "200Mi"

# Resource settings for Node Exporter
node-exporter:
  resources:
    requests:
      cpu: "10m"
      memory: "20Mi"
    limits:
      cpu: "100m"
      memory: "200Mi"

# Resource settings for Kube-State-Metrics
kube-state-metrics:
  resources:
    requests:
      cpu: "10m"
      memory: "20Mi"
    limits:
      cpu: "100m"
      memory: "200Mi"
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/prometheus-values.yaml).

After creating the `prometheus-values.yaml` file, use the following Helm command to install Prometheus from the Bitnami repository:

```bash
helm install prometheus bitnami/kube-prometheus \
    --namespace monitoring \
    --values https://starci-lab.github.io/cifarm-k8s/values/prometheus-values.yaml
```
### Access Prometheus
After Prometheus is installed, you can access it through the following `ClusterIP` services: 

Prometheus Service at `prometheus-kube-prometheus-prometheus.monitoring.svc.cluster.local` on port `9090` and Prometheus Alertmanager Service at `prometheus-kube-prometheus-alertmanager.monitoring.svc.cluster.local` on port `9093`.

### Install Grafana
Start by creating a YAML configuration file named `grafana-values.yaml` to set up Grafana. This file includes settings for the Grafana admin credentials, resource requests, data sources, and metrics collection.
```bash
# grafana-values.yaml

# Admin credentials for the Grafana instance
admin:
  user: example  # Set admin username
  password: example  # Set admin password

# Enable or disable metrics collection
metrics:
  enabled: true  # Set to true to enable metrics

# Resource requests and limits for the Grafana pod
grafana:
  resources:
    requests:
      cpu: "10m"  # Minimum CPU requested for the Grafana pod
      memory: "20Mi"  # Minimum memory requested for the Grafana pod
    limits:
      cpu: "100m"  # Maximum CPU limit for the Grafana pod
      memory: "200Mi"  # Maximum memory limit for the Grafana pod

# Data sources configuration for Grafana
datasources:
  secretDefinition:
    apiVersion: 1  # API version for the datasource configuration
    datasources:
      # Configuration for the Prometheus data source
      - name: Prometheus
        type: prometheus  # Type of the data source
        access: proxy  # Access mode (proxy means the Grafana pod will access the data source directly)
        orgId: 1  # Organization ID in Grafana (default organization)
        url: https://prometheus.eks.starci.net  # URL for Prometheus instance
        version: 1  # Version of the data source configuration
        editable: true  # Allow users to edit the data source configuration
        isDefault: true  # Set this as the default data source
        basicAuth: true
        basicAuthUser: example
        secureJsonData:
          basicAuthPassword: example
        jsonData:
          httpMethod: POST        # HTTP method (POST or GET)
          keepCookies: []         # Cookies to keep
          timeInterval: "5s"     # Time interval between queries
          queryTimeout: "30s"    # Timeout for each query
          tlsSkipVerify: false    # Skip TLS certificate verification (if any)

      # Configuration for the Alertmanager data source
      - name: Alertmanager
        uid: alertmanager  # Unique identifier for Alertmanager
        type: alertmanager  # Type of the data source
        access: proxy  # Access mode (proxy means the Grafana pod will access the data source directly)
        orgId: 1  # Organization ID in Grafana
        url: https://prometheus-alertmanager.eks.starci.net  # URL for Alertmanager instance
        version: 1  # Version of the data source configuration
        editable: true  # Allow users to edit the data source configuration
        basicAuth: true
        basicAuthUser: example
        secureJsonData:
          basicAuthPassword: example
        jsonData:
          implementation: prometheus  # Implementation type (Prometheus)
          httpMethod: POST        # HTTP method (POST or GET)
          keepCookies: []         # Cookies to keep
          timeInterval: "5s"     # Time interval between queries
          queryTimeout: "30s"     # Timeout for each query
          tlsSkipVerify: false    # Skip TLS certificate verification (if any)

```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/grafana-values.yaml).

After creating the `grafana-values.yaml` file, use the following Helm command to install Grafana from the Bitnami repository
```bash
helm install grafana bitnami/grafana \
    --namespace monitoring \
    --values https://starci-lab.github.io/cifarm-k8s/values/grafana-values.yaml
```
### Access Grafana
The Grafana Web UI is accessible via the `ClusterIP` service at `grafana.monitoring.svc.cluster.local` on port `3000`.