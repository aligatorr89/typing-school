const fs = require('fs');
const path = require('path');
const { publicPath } = require('../environment');

const indexHtml = fs.readFileSync(path.join(publicPath, 'index.html'), {encoding: 'utf8'});
const notFoundHtml = fs.readFileSync(path.join(publicPath, '404.html'), {encoding: 'utf8'});

function get(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(indexHtml);
};

function get404(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(notFoundHtml);
}

module.exports = {
  get, get404
};
