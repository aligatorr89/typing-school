const url = require('url');
const index = require('./index');
const public = require('./public/public');
const api = require('./api/api');

function factory(req, res) {
  switch(req.method) {
    case 'GET': return getFactory(req, res);
    case 'POST': return postFactory(req, res);
    default: return index.get404(req, res);
  }
}

function getFactory(req, res) {
  const reqPath = url.parse(req.url).pathname.split('/')[1];
  switch(reqPath) {
    case '': return index.get(req, res);
    case 'sw.js': return index.getServiceWorker(req, res);
    case 'public': return public.get(req, res);
    case 'api': return api.get(req, res);
    default: return index.get404(req, res);
  }
}

function postFactory(req, res) {

}

module.exports = factory;
