---
title: "Provision and Apply Let's Encrypt SSL Certificate to NGINX Load Balancer"
sidebar_position: 3
description: "Provision and Apply Let's Encrypt SSL Certificate to NGINX Load Balancer"
---
# Provision and Apply Let's Encrypt SSL Certificate to NGINX Load Balancer
### Create the ClusterIssuer Configuration
First, create a file called `cluster-issuer.yaml` with the following configuration:
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
  namespace: cert
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: cuongnvtse160875@gmail.com  # Replace with your email
    privateKeySecretRef:
      name: letsencrypt-production
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx  # Ensures use of the NGINX Ingress Controller
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/resources/cluster-issuer.yaml).

Save this file on your local machine and apply it to your Kubernetes cluster:
```bash
kubectl apply -f https://starci-lab.github.io/cifarm-k8s/resources/cluster-issuer.yaml
```
### Create the Ingress Resource
Apply the example-ingress.yaml configuration to create the Ingress resource, which will allow your domain to be routed to the game-2048 service and manage SSL with Let's Encrypt.
```bash
# Create the game-2048 namespace, deployment, and service
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.8.0/docs/examples/2048/2048_full.yaml
```
Now, create the Ingress resource YAML file called `example-ingress.yaml`. This file will define the SSL termination with Let's Encrypt for your application.
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: demo-ingress
  namespace: game-2048  # Replace with your namespace if different
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-production"  # Refer to the ClusterIssuer
    nginx.ingress.kubernetes.io/ssl-redirect: "true"           # Redirect HTTP to HTTPS
spec:
  rules:
  - host: cifarm.starci.net  # Replace with your domain name
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: service-2048  # Replace with your service name
            port:
              number: 80
  tls:
  - hosts:
    - cifarm.starci.net  # The domain name for the certificate
    secretName: letsencrypt-production-tls  # Secret where the TLS certificate will be stored
```
You can access the file from this [link](https://starci-lab.github.io/cifarm-k8s/resources/example-ingress.yaml).

Next, apply the `example-ingress.yaml` configuration to create the Ingress resource, which will allow your domain to be routed to the game-2048 service and manage SSL with Let's Encrypt.
```bash
# Apply the Ingress resource that maps domain to the service and configures SSL
kubectl apply -f https://starci-lab.github.io/cifarm-k8s/resources/example-ingress.yaml
```

### Waiting for Certificate to be Ready
After you apply the Ingress and ClusterIssuer configurations, cert-manager will automatically request a certificate from Let's Encrypt. You can monitor the status of the certificate using the following command
```bash
kubectl get certificate
```
This command will display the status of all certificates in your cluster. The certificate you created for your domain (letsencrypt-production-tls) should show up here. It may take a few moments for the certificate to be issued.

You can check the status of a specific certificate by describing it:
```bash
kubectl describe certificate letsencrypt-production-tls -n game-2048
```
When the certificate is successfully issued, you'll see something like this in the output
```bash
Status:
  Conditions:
    Last Transition Time:  <timestamp>
    Message:               Certificate issued successfully
    Reason:                Issued
    Status:                True
    Type:                  Ready
```
Once the certificate is issued and ready, your application will be accessible via HTTPS
### References
- [Amazon cifarm Quickstart Guide](https://docs.aws.amazon.com/cifarm/latest/userguide/quickstart.html)