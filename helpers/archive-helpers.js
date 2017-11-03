var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetch = require('../workers/htmlfetcher.js');
var httpHelpers = require('../web/http-helpers.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // var urlList = [];
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      callback(err);
    } else {
      var urlList = [];
      urlList = data.split('\n');
      callback(urlList);  
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls( (data) => {
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList( url, (bool) => {
    if (bool === false) {
      exports.isUrlArchived(url, function (bool) {
        if (bool === false) {
          fs.appendFile(exports.paths.list, '\n' + url, function(err) {
            if (err) {
              callback(err);
            } else {
              callback();
            }
          });
        }
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  exports.readArchivesDir(function (files) {
    callback(files.includes(url));
  });
};

exports.downloadUrls = function(urls) {
  for (let i = 0; i < urls.length; i++) {
    // wait for fetchHTML to complete
    let tempURL = urls[i];
    fetch.fetchHTML(tempURL, function (data) {
      // once complete, save files from fetchHTML into the dir
      // console.log('fetchHTML is writing here: ', exports.paths.archivedSites + '/' + tempURL);
      let filePath = '' + exports.paths.archivedSites + '/' + tempURL;
      console.log('file path = ', filePath);
      // fs.writeFile(filePath, data, function (err) { 
      //   if (err) {
      //     throw err;
      //   }
      //   console.log('This url (', tempURL, ') has been archived!');
      // });
    }); 
  }
};

exports.readArchivesDir = function (callback) {
  fs.readdir(exports.paths.archivedSites, function (err, files) {
    if (err) {
      callback(err);
    }
    callback(files);
  });
};















