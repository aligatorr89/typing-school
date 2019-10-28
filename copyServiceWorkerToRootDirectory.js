const fs = require('fs');
const path = require('path');
const environment = require('./environment');

const rs = fs.createReadStream(path.join(environment.publicPath, 'js', 'sw.js'));
const ws = fs.createWriteStream(path.join(environment.root, 'sw.js'), {flags: 'w+'});
rs.pipe(ws);
