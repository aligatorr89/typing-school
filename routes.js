'use strict';
const fs = require('fs');
const path = require('path');

const publicFolder = path.join(__dirname, 'public');
const publicFolderJs = path.join(publicFolder, 'js');
const indexHtml = fs.readFileSync(path.join(publicFolder, 'index.html'), {encoding: 'utf8'});
const notFoundHtml = fs.readFileSync(path.join(publicFolder, '404.html'), {encoding: 'utf8'});

const getUrlPath = (reqUrl) => {
  return reqUrl.split('/').slice(1);
};

function get(req, res) {
  const urlPath = getUrlPath(req.url);
  switch(urlPath[0]) {
    case '': return getRoot(req, res);
    case 'api': return getApi(req, res);
    case 'public': return getPublic(req, res, urlPath);
    default: getDefault(req, res);
  }
}
module.exports = {
  get
};

function getRoot(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(indexHtml);
}

function getApi(req, res) {
  // const type = req
  const stream = fs.createReadStream('./10_fast_fingers_database_en_advanced.txt');
  stream.pipe(res);
}

function getPublic(req, res, urlPath) {
  const pathToFile = path.join(__dirname, ...urlPath);
  if(urlPath[1] === 'js') {
    res.setHeader('Content-Type', 'text/javascript');
  }
  fs.exists(pathToFile, exists => {
    if(exists) {
      fs.createReadStream(pathToFile).pipe(res);
    }
    else {
      res.end();
    }
  });
}

function getDefault(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(notFoundHtml);
}
