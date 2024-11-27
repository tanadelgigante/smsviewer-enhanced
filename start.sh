#!/bin/sh

# Start backend server for SMS retrieval
node server.js &

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
      console.log(\`Server running at http://localhost:${port}/\`); \
    });" &

# Start static file server for frontend
npx http-server public -p 80
