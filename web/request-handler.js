var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
var urlParser = require('url');
// require more modules/folders here!

// fs.readdir(path, 'utf8', function(err, files) {
  
//   callback(files.indexOf(url) > -1);
// });


exports.handleRequest = function (request, response) {
  // note: must change hardcoded file path once done with tests!
  // var filePath = 'archives/sites';
  var filePath = 'test/testdata/sites';
  var urlInfo = urlParser.parse(request.url);
  
  var loading = 'web/public/loading.html';

  var asset;
  urlInfo.pathname.length > 1 ? asset = (filePath + urlInfo.pathname) : asset = 'web/public/index.html';

  if (request.method === 'GET') {
    // reads our directory
    fs.readdir(filePath, 'utf8', function(err, files) {
      if (err) {
        console.error(err);
      }
      // if our filepath is index.html or is present in
      // our files array, return 200 and serve the asset
      if (urlInfo.pathname === '/' || files.indexOf(urlInfo.pathname.slice(1)) > -1) {
        response.writeHead(200, httpHelpers.headers);
        httpHelpers.serveAssets(response, asset);
      } else {
      // otherwise, return 404 not found
        response.writeHead(404, httpHelpers.headers);
        response.end('Not Found');
      }
    });
  }
  if (request.method === 'POST') {
    // build body
    var body = '';
    request.on('data', chunk => { body += chunk; } );
    // when finished building body
    request.on('end', function() {
      // check the directory
      fs.readdir(filePath, 'utf8', function(err, files) {
        // if it exists in our directory, serve it up
        var url = body.slice(4);
        if (files.indexOf(url) > -1) {
          response.writeHead(302, httpHelpers.headers);
          httpHelpers.serveAssets(response, asset);
        } else {
        // if it doesn't exist, 
          // serve the loading page
          response.writeHead(201, httpHelpers.headers);
          httpHelpers.serveAssets(response, loading);
          // add website to queue
          console.log(files);
          archive.addUrlToList(url, function() {}, filePath);
        }
      });
    });
  }



};

