#!/bin/sh
# Start backend server
node server.js & 

# Start static file server for frontend
npx http-server public -p 80