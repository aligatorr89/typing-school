const fs = require('fs');
const path = require('path');
const url = require('url');
const { root, getMimeType } = require('../../environment');

const get = (req, res) => {
  const webUrl = url.parse(req.url);
  const pathToFile = path.join(root, webUrl.pathname);
  res.setHeader('Content-Type', getMimeType(path.extname(pathToFile)));

  fs.createReadStream(pathToFile)
  .on('error', () => res.end())
  .pipe(res);
};

module.exports = {
  get
};
