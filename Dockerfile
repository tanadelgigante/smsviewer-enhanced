# Unified Dockerfile for SMS Viewer Application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Install dependencies
RUN npm install

# Build-time argument for API URL
ARG API_URL=http://localhost:3000/get-latest-sms
ENV API_URL=$API_URL

# Expose ports
EXPOSE 3000 80 3001

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Default command
CMD ["/start.sh"]
