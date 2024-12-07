---
title: "Deployment"
sidebar_position: 2
description: Deployment
---
# Rest API Gateway Deployment

### Set environments
Before deploying, set the following environment variables to ensure the necessary configurations are applied to the Gameplay Service
```bash
# Rest API Gateway configuration
GAMEPLAY_SERVICE_HOST=gameplay-service-cluster-service.containers.svc.cluster.local
GAMEPLAY_SERVICE_PORT=3014

# Rest Api Gateway configuration
REST_API_GATEWAY_PORT=3001
```
### Remote Installation
If the Helm repository is not already added, the script will first add it and then update it. You can check and add the repository with the following
```bash
# Check if the 'cifarm' repository is already added
if helm repo list | grep -q "^cifarm" 
then
    # If the 'cifarm' repository is already in the list, print a message and update the repository
    echo "Repository 'cifarm' is already added. Updating..."
    helm repo update cifarm
else
    # If the 'cifarm' repository is not in the list, add it and update the repository
    echo "Repository 'cifarm' is not added. Adding now..."
    helm repo add cifarm https://starci-lab.github.io/cifarm-k8s/charts
    helm repo update cifarm
fi
```
Next, deploy the Rest API Gateway using Helm with the environment variables configured earlier
```bash
# Install
helm install rest-api-gateway cifarm/deployment \
    --namespace containers \
    --set image.repository="cifarm/rest-api-gateway" \
    --set image.tag="latest" \
    --set service.port=$REST_API_GATEWAY_PORT \
    --set service.targetPort=$REST_API_GATEWAY_PORT \
    --set env.GAMEPLAY_SERVICE_HOST=$GAMEPLAY_SERVICE_HOST \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT \
    --set env.REST_API_GATEWAY_PORT=$REST_API_GATEWAY_PORT 
```
#### 2. Locally Installation
If you prefer to install locally, clone the repository and proceed with the installation:
```bash
# Clone the repository
git clone https://github.com/starci-lab/cifarm-k8s.git
cd cifarm-k8s
```
Then, deploy and install the service
```bash
# Install Rest API Gateway locally
helm install rest-api-gateway ./charts/repo/deployment \
    --namespace containers \
        --set image.repository="cifarm/rest-api-gateway" \
    --set image.tag="latest" \
    --set service.port=$REST_API_GATEWAY_PORT \
    --set service.targetPort=$REST_API_GATEWAY_PORT \
    --set env.GAMEPLAY_SERVICE_HOST=$GAMEPLAY_SERVICE_HOST \
    --set env.GAMEPLAY_SERVICE_PORT=$GAMEPLAY_SERVICE_PORT \
    --set env.REST_API_GATEWAY_PORT=$REST_API_GATEWAY_PORT 
```
#### Check Deployment Status
After deploying, you can verify the status of the deployment
```bash
kubectl get deployment rest-api-gateway-deployment -n containers
```
#### Check pods
To view the pods, use the following command
```bash
# Get all pods in the 'containers' namespace
kubectl get pods -n containers

# Describe a specific pod to get more details
kubectl describe pods -n containers | grep 'rest-api-gateway.*'

# View logs of a specific pod
kubectl get pods -n containers | grep 'rest-api-gateway.*'
```
#### 5. Uninstall Helm Release
If you need to remove the deployment, you can uninstall the Helm release:
```bash
helm uninstall rest-api-gateway -n containers
```
### Access
You can access the Rest API Gateway via the `ClusterIP` service at `rest-api-gateway-cluster-service.containers.svc.cluster.local` on port `3014`.