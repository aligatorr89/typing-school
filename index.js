'use strict';
const http = require('http');
const routeFactory = require('./routes/factory');

const PORT = 8090;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  routeFactory(req, res);
});

server.listen(PORT);
