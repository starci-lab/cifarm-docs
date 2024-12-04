---
title: "Kafka"
sidebar_position: 2
description: "Guide for installing Kafka"
---
# Kafka
## Introduction
This guide outlines the steps for installing **Apache Kafka** on your Kubernetes cluster using the Bitnami Helm chart. Kafka is a distributed event streaming platform, commonly used for building real-time data pipelines and streaming applications.
## Steps
### Add the Bitnami helm repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Execute scripts
#### 1. Install
```bash
helm install kafka bitnami/kafka \
    --namespace brokers \
    --set listeners.client.protocol="PLAINTEXT" \
    --set listeners.controller.protocol="PLAINTEXT" \
    --set controller.resources.requests.cpu="20m" \
    --set controller.resources.requests.memory="40Mi" \
    --set controller.resources.limits.cpu="200m" \
    --set controller.resources.limits.memory="400Mi"
```
#### 2. Uninstall
```bash
helm uninstall kafka -n brokers
```
## Access
### Kafka Headless
- **Kind**: Service  
- **Type**: ClusterIP
- **Hosts**: 
    - `kafka-controller-0.kafka-controller-headless.brokers.svc.cluster.local`
    - `kafka-controller-1.kafka-controller-headless.brokers.svc.cluster.local`
    - `kafka-controller-2.kafka-controller-headless.brokers.svc.cluster.local`
- **Port**: 9092
- **Note**: Producer only
### Kafka
- **Kind**: Service  
- **Type**: ClusterIP
- **Broker**: 
    - `kafka.brokers.svc.cluster.local`
- **Port**: 9092    
- **Note**: Producer & Consumer