# Unified Dockerfile for SMS Viewer Application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install required tools
RUN apk add --no-cache jq

# Copy all project files
COPY . .

# Create a unified package.json
RUN jq -s '
    {
        "name": "sms-viewer",
        "version": "1.0.0",
        "scripts": {"start": "node server.js"},
        "dependencies": reduce .[] as $item ({}; . * $item.dependencies),
        "devDependencies": reduce .[] as $item ({}; . * $item.devDependencies)
    }' package.json package-json-backend package-json-frontend > merged-package.json \
    && mv merged-package.json package.json

# Install dependencies
RUN npm install

# Build-time argument for API URL
ARG API_URL=http://localhost:3000/get-latest-sms
ENV API_URL=$API_URL

# Modify script to use API URL
RUN sed -i "s|window.API_URL || \"/get-latest-sms\"|\"$API_URL\"|g" public/script.js

# Expose ports
EXPOSE 3000 80

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Default command
CMD ["/start.sh"]