---
title: "NGINX Ingress Controller & Cert Manager"
sidebar_position: 2
description: "Guide for installing NGINX Ingress Controller & Cert Manager"
---
# NGINX Ingress Controller & Cert Manager
## Introduction
This guide will help you install and uninstall the NGINX Ingress Controller using the Bitnami Helm chart.
## Steps
### Add the Bitnami helm repository
```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```
### Excute scripts
#### 1. Install
1.1. Install helm
```bash
helm install nginx-ingress-controller bitnami/nginx-ingress-controller \
  --namespace traffic \
  --set replicaCount=1 \
  --set defaultBackend.resources.requests.cpu=10m \
  --set defaultBackend.resources.requests.memory=20Mi \
  --set defaultBackend.resources.limits.cpu=100m \
  --set defaultBackend.resources.limits.memory=200Mi \
  --set resources.requests.cpu=50m \
  --set resources.requests.memory=100Mi \
  --set resources.limits.cpu=500m \
  --set resources.limits.memory=1000Mi \
  --set service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-proxy-protocol"="*" \
  --set service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-type"="external" \
  --set service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-nlb-target-type"="ip" \
  --set service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-scheme"="internet-facing" \
  --set service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-backend-protocol"="tcp" \
  --set config.real-ip-header="proxy_protocol" \
  --set-string config.use-proxy-protocol="true" \
  --set-string config.use-forwarded-headers="true"
```
1.3. Allow the domain to map to the Network Load Balancer using Route 53
```bash
# Set domain
export DOMAIN_NAME=eks.starci.net
```
# Create hosted zone via Route53
aws route53 create-hosted-zone --caller-reference $(uuidgen) --name $DOMAIN_NAME
```
We then obtain the following NS

- ns-885.awsdns-46.net
- ns-1219.awsdns-24.org
- ns-181.awsdns-22.com
- ns-1730.awsdns-24.co.uk

You can set the NS records with any DNS provider, such as Cloudflare, and then create an A record in Route 53 to the Network Load Balancer.

After that, do a check
```bash
nslookup eks.starci.net

# Server:         10.255.255.254
# Address:        10.255.255.254#53

# Non-authoritative answer:
# Name:   eks.starci.net
# Address: 52.76.162.112
```
Install the cert manager
```bash
helm install cert-manager bitnami/cert-manager \
  --namespace cert \
  --set cainjector.resources.requests.cpu=10m \
  --set cainjector.resources.requests.memory=20Mi \
  --set cainjector.resources.limits.cpu=100m \
  --set cainjector.resources.limits.memory=200Mi \
  --set controller.resources.requests.cpu=10m \
  --set controller.resources.requests.memory=20Mi \
  --set controller.resources.limits.cpu=100m\
  --set controller.resources.limits.memory=200Mi \
  --set webhook.resources.requests.cpu=10m \
  --set webhook.resources.requests.memory=20Mi \
  --set webhook.resources.limits.cpu=100m \
  --set webhook.resources.limits.memory=200Mi
```
Create and apply ClusterIssuer for Let's Encrypt
```bash
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
  namespace: cert
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: cuongnvtse160875@gmail.com
    privateKeySecretRef:
      name: letsencrypt-production
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
EOF
```
# Apply
kubectl apply -f ingress.yaml

Refererene
- [Getting Started with AWS and Let's Encrypt - cert-manager](https://cert-manager.io/docs/tutorials/getting-started-aws-letsencrypt/)

1.4. Apply demo ingress for testing

#### 2. Demo using an
```bash
helm uninstall nginx-ingress-controller --namespace traffic
```
#### 3. Uninstall
```bash
helm uninstall nginx-ingress-controller --namespace traffic
```