const fs = require('fs');

function get(req, res) {
  // const type = req
  fs.createReadStream('./10_fast_fingers_database_en_advanced.txt')
  .pipe(res);
}

module.exports = {
  get
}
