var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers.js');
var path = require('path');
var url = require('path');


exports.handleRequest = function (req, res) {
  //res.end(archive.paths.siteAssets + '/index.html');
  var urlPath = url.parse(req.url);
  // pathname
  console.log('request url', urlPath.name);
  // extension
  console.log('extName', path.extname(req.url));
  
  req.on('error', (err) => {
    console.error(err);
  });
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    // httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css');
  }
  if (req.method === 'POST') {
    httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    // httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css');
  }

  //res.end();  
};
