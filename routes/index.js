const fs = require('fs');
const path = require('path');
const { publicPath, root } = require('../environment');

const indexHtml = fs.readFileSync(path.join(publicPath, 'index.html'), {encoding: 'utf8'});
const notFoundHtml = fs.readFileSync(path.join(publicPath, '404.html'), {encoding: 'utf8'});
const serviceWorkerFile = fs.readFileSync(path.join(root, 'sw.js'), {encoding: 'utf8'});

function get(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(indexHtml);
};

function get404(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(notFoundHtml);
}

function getServiceWorker(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.end(serviceWorkerFile);
};

module.exports = {
  get, get404, getServiceWorker
};
