const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

function get(req, res) {
  const options = querystring.parse(url.parse(req.url).query);

  fs.createReadStream(getFileName(options.language, options.mode))
  .on('error', () => res.end())
  .pipe(res);
}

function getFileName(language, mode) {
  if (mode) {
    if (mode === '200') {
      mode = '';
    } else if (mode === '1000') {
      mode = '_advanced';
    }
  } else {
    mode = '_advanced'
  }

  return './10_fast_fingers_database_' + language + mode + '.txt'
}

module.exports = {
  get
}
