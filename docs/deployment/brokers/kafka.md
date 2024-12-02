---
title: "Kafka"
sidebar_position: 2
description: "Guide for installing Kafka"
---
# Kafka
## Introduction

## Steps
### Add the Bitnami Helm Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```
### Install
You can install `kafka` using either a remote `values.yaml` file via a URL or a local copy of the configuration file. Choose the method that best suits your setup.
#### Option 1: Install Using a URL for the values.yaml File
```bash
helm install kafka bitnami/kafka \
    --namespace brokers \
    -f https://starci-lab.github.io/cifarm-k8s/bitnami/brokers/kafka/values.yaml
```
#### Option 2: Install Using a Local Path for the values.yaml File
```bash
helm install kafka bitnami/kafka \
    --namespace brokers \
    -f ./bitnami/brokers/kafka/values.yaml
``` 
## Access
