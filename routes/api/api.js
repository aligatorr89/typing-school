const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

function get(req, res) {
  const options = querystring.parse(url.parse(req.url).query);
  options.language = options.language ? options.language : 'en';

  fs.createReadStream(getFileName(options.language))
  .pipe(res)
  .on('error', () => res.end());
}

function getFileName(language) {
  return './10_fast_fingers_database_' + language + '_advanced.txt'
}

module.exports = {
  get
}
