---
title: "Direct Domain Traffic to Network Load Balancer"
sidebar_position: 2
description: "Direct Domain Traffic to Network Load Balancer"
---
# Direct Domain Traffic To Network Load Balancer
### Define the Domain Name
Define the domain you wish to map to the NLB
```bash
# Set domain
export DOMAIN_NAME=cifarm.starci.net
```
### Create a Hosted Zone in Route 53
Use the AWS CLI to create a hosted zone for your domain in Route 53
```bash
aws route53 create-hosted-zone --caller-reference $(uuidgen) --name $DOMAIN_NAME
```
### Retrieve Name Server (NS) Records
After creating the hosted zone, AWS will provide you with a set of Name Server (NS) records, for example

- ns-885.awsdns-46.net
- ns-1219.awsdns-24.org
- ns-181.awsdns-22.com
- ns-1730.awsdns-24.co.uk

These NS records should be set with your domain registrar or DNS provider (e.g., Cloudflare).

Run an nslookup to ensure the domain is resolving correctly to the NLB’s IP address:
```bash
nslookup cifarm.starci.net

# Server:         10.255.255.254
# Address:        10.255.255.254#53

# Non-authoritative answer:
# Name:   cifarm.starci.net
# Address: 52.76.162.112
```
If you see the NLB's IP address in the result, this confirms that the domain is correctly mapped to the NLB.

### References

- [Getting Started with AWS and Let's Encrypt - cert-manager](https://cert-manager.io/docs/tutorials/getting-started-aws-letsencrypt/)