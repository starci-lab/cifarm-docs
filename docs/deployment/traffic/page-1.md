---
title: "Install Required Resources"
sidebar_position: 1
description: "Install Required Resources"
---
# Install Required Resources
### NGINX Ingress Controller
First, create the Kubernetes namespace where the NGINX Ingress Controller will be installed. If the namespace already exists, the command will be ignored.
```bash
kubectl create namespace traffic cert
```
Create a file called `nginx-ingress-controller-values.yaml` and add the following configuration to it:
```yaml
# nginx-ingress-controller-values.yaml

# Replica count for the NGINX Ingress Controller deployment
replicaCount: 1

# Default backend resource configuration
defaultBackend:
  resources:
    requests:
      cpu: 10m
      memory: 20Mi
    limits:
      cpu: 100m
      memory: 200Mi

# NGINX Ingress Controller resource configuration
resources:
  requests:
    cpu: 50m
    memory: 100Mi
  limits:
    cpu: 500m
    memory: 1000Mi

# AWS-specific service annotations for load balancer
service:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"
    service.beta.kubernetes.io/aws-load-balancer-type: "external"
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "ip"
    service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"

# NGINX configuration to handle real IP headers and proxy protocol
config:
  real-ip-header: "proxy_protocol"
  use-proxy-protocol: "true"
  use-forwarded-headers: "true"
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/nginx-ingress-controller-values.yaml).

You can install the NGINX Ingress Controller using Helm by referring to the values file you just created. Below is the installation command:
```bash
helm install nginx-ingress-controller bitnami/nginx-ingress-controller \
--namespace traffic \
--values https://starci-lab.github.io/cifarm-k8s/values/nginx-ingress-controller-values.yaml
```
### Cert Manager
To configure Cert Manager, create a `cert-manager-values.yaml` file with the following content:
```yaml
# cert-manager-values.yaml

# Resources for the cainjector component
cainjector:
  resources:
    requests:
      cpu: 10m
      memory: 20Mi
    limits:
      cpu: 100m
      memory: 200Mi

# Resources for the controller component
controller:
  resources:
    requests:
      cpu: 10m
      memory: 20Mi
    limits:
      cpu: 100m
      memory: 200Mi

# Resources for the webhook component
webhook:
  resources:
    requests:
      cpu: 10m
      memory: 20Mi
    limits:
      cpu: 100m
      memory: 200Mi
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/values/cert-manager-values.yaml).

You can install Cert Manager using Helm by referencing the `cert-manager-values.yaml` file you created. Below is the installation command:
```bash
helm install cert-manager bitnami/cert-manager \
--namespace cert \
--values https://starci-lab.github.io/cifarm-k8s/values/cert-manager-values.yaml
```
### Direct Domain Traffic to Network Load Balancer
Define the domain you wish to map to the NLB
```bash
# Set domain
export DOMAIN_NAME=eks.starci.net
```
Use the AWS CLI to create a hosted zone for your domain in Route 53
```bash
aws route53 create-hosted-zone --caller-reference $(uuidgen) --name $DOMAIN_NAME
```
After creating the hosted zone, AWS will provide you with a set of Name Server (NS) records, for example

- ns-885.awsdns-46.net
- ns-1219.awsdns-24.org
- ns-181.awsdns-22.com
- ns-1730.awsdns-24.co.uk

These NS records should be set with your domain registrar or DNS provider (e.g., Cloudflare).

Run an nslookup to ensure the domain is resolving correctly to the NLB’s IP address:
```bash
nslookup eks.starci.net

# Server:         10.255.255.254
# Address:        10.255.255.254#53

# Non-authoritative answer:
# Name:   eks.starci.net
# Address: 52.76.162.112
```
If you see the NLB's IP address in the result, this confirms that the domain is correctly mapped to the NLB.


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