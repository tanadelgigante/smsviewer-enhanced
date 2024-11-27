# Unified Dockerfile for SMS Viewer Application
FROM node:18-alpine

# Set working directory
WORKDIR /app

RUN apk update && apk add --no-cache jq

# Copy package.json files first to leverage Docker cache
COPY package.json package-json-backend package-json-frontend ./

# Merge package.json files
RUN jq -s '
  {
    "name": "sms-viewer",
    "version": "1.0.0",
    "scripts": {
      "start": "node server.js"
    },
    "dependencies": (.[0].dependencies + .[1].dependencies),
    "devDependencies": (.[0].devDependencies + .[1].devDependencies)
  }' package.json package-json-backend package-json-frontend > merged-package.json \
  && mv merged-package.json package.json

# Copy all project files
COPY . .

# Install dependencies
RUN npm install

# Build-time argument for API URL
ARG API_URL=http://localhost:3000/get-latest-sms
ENV API_URL=$API_URL

# Modify script to use API URL
RUN sed -i "s|window.API_URL || \"/get-latest-sms\"|\"$API_URL\"|g" public/script.js

# Expose ports
EXPOSE 3000 80

# Use a startup script to run both backend and frontend
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Default command
CMD ["/start.sh"]