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
  // var filePath 'archives/sites';
  var filePath = 'test/testdata/sites';
  var urlInfo = urlParser.parse(request.url);

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


  // response.end(archive.paths.list);
};

