# Unified Dockerfile for SMS Viewer Application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Install dependencies for both frontend and backend
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install

# Build-time argument for API URL
ARG API_URL=http://localhost:3000/get-latest-sms
ENV API_URL=$API_URL

# Modify script.js to use the API URL
RUN sed -i "s|window.API_URL || \"/get-latest-sms\"|\"$API_URL\"|g" public/script.js

# Expose ports for both backend and frontend
EXPOSE 3000 80

# Use a startup script to run both backend and frontend
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Default command
CMD ["/start.sh"]