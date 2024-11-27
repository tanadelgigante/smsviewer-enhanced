#!/bin/sh

# Debug: Log start script execution
echo "Starting backend server..."

# Start backend server for SMS retrieval and static content
node server.js 

# Debug: Log end of start script
echo "All services started."
