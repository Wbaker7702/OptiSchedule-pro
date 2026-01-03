#!/bin/bash
echo "Starting deployment process..."
npm run build
if [ $? -eq 0 ]; then
  echo "Build successful."
  echo "Deploying to production server..."
  # Simulate deployment delay
  sleep 2
  echo "Deployment complete! Application is live."
else
  echo "Build failed. Deployment aborted."
  exit 1
fi
