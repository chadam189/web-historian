var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers.js');
var path = require('path');
var url = require('url');



exports.handleRequest = function (req, res) {
  //res.end(archive.paths.siteAssets + '/index.html');
  var urlPath = url.parse(req.url);
  // pathname
  // console.log('request url', urlPath.path);
  // extension
  // console.log('extName', path.extname(req.url));
  
  req.on('error', (err) => {
    console.error(err);
  });
  if (req.method === 'GET') {
    var site = urlPath.path.slice(1, urlPath.path.length);
    console.log('GET this PATH NAME:', site);
    if (urlPath.path === '/') {
      res.writeHead(200, exports.headers);
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    } else {
      archive.isUrlArchived(site, function(bool) {
        if (bool) {
          res.writeHead(200, exports.headers);
          httpHelpers.serveAssets(res, archive.paths.archivedSites + urlPath.path);  
        } else {
          res.writeHead(404, httpHelpers.headers);
          res.end('Doesnt exists');
        }
      });
    }
  }
  
  if (req.method === 'POST') {
    console.log('is this POST running?');
    let rawData = '';
    req.on('data', (chunk) => { rawData += chunk; });
    req.on('end', (data) => {
      // callback(data);
      console.log('data', rawData);
      var site = rawData.slice(4, rawData.length);
      archive.isUrlArchived(site, function (bool) {
        console.log('req.url = ', site);
        console.log('urlPath', urlPath);
        if (bool === false) {
          console.log('are we crashing here?');
          res.writeHead(302, httpHelpers.headers);
          httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html');
          // add to list, call download URLs
          console.log('ORRRRRR.... are we crashing here? \n site = ', site);
          archive.addUrlToList(site, function () {
            archive.readListOfUrls(archive.downloadUrls);
          });
        } else {
          res.writeHead(302, httpHelpers.headers);
          httpHelpers.serveAssets(res, archive.paths.archivedSites + urlPath.path);
        }
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    console.log('it has fallen past the res.on section');
  }
};
