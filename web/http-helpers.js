var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var needCSS = asset.slice(asset.length - 4) === 'html';
  
  fs.readFile(asset, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
    }
    // adds our css file for our index or loading page
    if (needCSS) {
      fs.readFile('web/public/styles.css', 'utf8', function(err, cssData) {
        response.end('<style>' + cssData + '</style>' + data);
      }); 
    } else {
      response.end(data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
