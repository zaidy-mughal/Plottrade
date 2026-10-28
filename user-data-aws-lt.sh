#!/bin/bash
set -euxo pipefail

exec > >(tee -a /var/log/mern-setup.log) 2>&1

# Application configuration
AWS_REGION="us-east-1"
IMAGE="zaydecode/server:latest"
CONTAINER_NAME="plottrade-api"

# Update Ubuntu and install Docker + AWS CLI
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y docker.io awscli

# Enable Docker
systemctl enable --now docker

# Pull your image from public Docker Hub
docker pull "$IMAGE"

# Replace existing container if present
docker rm -f "$CONTAINER_NAME" || true

# Start the backend
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p 5000:5000 \
  -e AWS_REGION="$AWS_REGION" \
  -e AWS_SECRET_ID="prod/plottrade/mern" \
  "$IMAGE"

# Show initial status
docker ps --filter "name=$CONTAINER_NAME"
docker logs --tail 50 "$CONTAINER_NAME" || true
