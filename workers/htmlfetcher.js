// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var url = require('url');
var request = require('request');

exports.fetchHTML = function(site, callback) {
  console.log('fetchHTML has been called with this url: ', site);
  request('http://' + site, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    callback(body);
  });
  // http.get('http://' + site, function(res) {
  //   let rawData = '';
  //   res.on('data', (chunk) => { rawData += chunk; });
  //   res.on('end', (data) => {
  //     callback(data);
  //   });
  //   res.on('error', function(e) {
  //     console.log('problem with request: ' + e.message);
  //   });
  // });
};


 // console.log('fetchHTML has been called with this url: ', site);
 //  var urlParsed = url.parse(site);
 //  let UrlObject = {
 //    path: urlParsed.pathname,
 //    port: 8080
 //  };
 //  console.log('urlParsed is this: ', urlParsed);
 //  console.log(JSON.stringify(urlParsed));
  
 //  console.log('http.get will be called with this item: ', JSON.stringify(UrlObject));
 //  // console.log('the callback passed in was: \n');
 //  // console.log(JSON.stringify(callback));