#!/bin/sh

# Debug: Log start script execution
echo "Starting backend server..."

# Start backend server for SMS retrieval
node server.js & 

# Debug: Log start of config server
echo "Starting config server..."

# Start small server to serve the API URL
node -e "const http = require('http'); \
    const port = 3001; \
    const server = http.createServer((req, res) => { \
      if (req.url === '/config') { \
        res.writeHead(200, { 'Content-Type': 'application/json' }); \
        res.end(JSON.stringify({ API_URL: process.env.API_URL })); \
      } else { \
        res.writeHead(404, { 'Content-Type': 'text/plain' }); \
        res.end('Not Found'); \
      } \
    }); \
    server.listen(port, () => { \
      console.log(\`Config server running at http://localhost:${port}/\`); \
    });" &

# Debug: Log start of static file server
echo "Starting static file server..."

# Start static file server for frontend
npx http-server public -p 80

# Debug: Log end of start script
echo "All services started."
