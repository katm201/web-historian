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
    response.writeHead(200, httpHelpers.headers);
    httpHelpers.serveAssets(response, asset);
  }    


  // response.end(archive.paths.list);
};

