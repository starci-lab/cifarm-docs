---
title: "Install Kafka"
sidebar_position: 2
description: "Install Kafka"
---
# Install Kafka
### Create Kafka values file
Create a YAML file `kafka-values.yaml` to configure your Kafka instance. This file defines the configuration settings for Kafka listeners, resource allocations, and other related settings.
```bash
# kafka-values.yaml

# Kafka listeners configuration
listeners:
  client:
    protocol: "PLAINTEXT"  # Protocol for client communication
  controller:
    protocol: "PLAINTEXT"  # Protocol for controller communication

# Kafka controller resource requests and limits
controller:
  resources:
    requests:
      cpu: "20m"          # Minimum CPU requested for the controller (20 millicores)
      memory: "40Mi"      # Minimum memory requested for the controller (40 MiB)
    limits:
      cpu: "200m"         # Maximum CPU allowed for the controller (200 millicores)
      memory: "400Mi"     # Maximum memory allowed for the controller (400 MiB)
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/kafka-values.yaml).
### Install Kafka
Once the values file is created, use the following Helm command to install Kafka from the Bitnami repository
```bash
helm install kafka bitnami/kafka \
    --namespace brokers \
    --values https://starci-lab.github.io/cifarm-k8s/values/kafka-values.yaml
```
### Using Kafka Services
The Kafka Headless service is a `ClusterIP` service that allows producers to send messages to one of the Kafka controllers. It exposes the following hostnames for each controller: `kafka-controller-0.kafka-controller-headless.brokers.svc.cluster.local`, `kafka-controller-1.kafka-controller-headless.brokers.svc.cluster.local`, and `kafka-controller-2.kafka-controller-headless.brokers.svc.cluster.local`, all reachable on port 9092.

On the other hand, the Kafka service, also of type `ClusterIP`, acts as the main broker endpoint (`kafka.brokers.svc.cluster.local`) on port `9092`. This service supports both producers and consumers, allowing full data streaming functionality for your applications.