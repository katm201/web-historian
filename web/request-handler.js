var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  if (request.method === 'GET') {
    fs.readFile('web/public/index.html', 'utf8', function(err, data) {
      if (err) {
        console.error(err);
      }
      response.writeHead(200, httpHelpers.headers);
      response.end(data);
    });
    
  }
  // response.end(archive.paths.list);
};
