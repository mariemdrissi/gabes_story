// Ultra-lightweight static file server for the exported site
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'out');
const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]; // Remove query strings
  
  // Default to index.html
  if (urlPath === '/') urlPath = '/index.html';
  
  const filePath = path.join(OUT_DIR, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // For SPA routing, serve index.html for non-static routes
      if (!ext || ext === '.html') {
        fs.readFile(path.join(OUT_DIR, 'index.html'), (e2, d2) => {
          if (e2) { res.writeHead(404); res.end('Not found'); return; }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(d2);
        });
        return;
      }
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on http://0.0.0.0:${PORT}`);
  console.log(`Serving files from ${OUT_DIR}`);
});

// Keep the process alive
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, keeping alive...');
});

process.on('SIGINT', () => {
  console.log('SIGINT received, keeping alive...');
});
