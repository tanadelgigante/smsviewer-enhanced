#!/bin/sh

# Debug: Log start script execution
echo "Starting backend server..."

# Start backend server for SMS retrieval
node server.js & 

# Debug: Log start of static file server
echo "Starting static file server..."

# Start static file server for frontend
npx http-server public -p 80

# Debug: Log end of start script
echo "All services started."
