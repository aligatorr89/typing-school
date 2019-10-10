'use strict';
const http = require('http');
const routeFactory = require('./routes/factory');

const PORT = 8090;

const server = http.createServer((req, res) => routeFactory(req, res));

server.listen(PORT);
