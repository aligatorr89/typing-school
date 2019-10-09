'use strict';
const http = require('http');
const routes = require('./routes');

const PORT = 8090;

const server = http.createServer((req, res) => {
  if(req.method === 'GET') {
    routes.get(req, res);
  }
});

server.listen(PORT);
