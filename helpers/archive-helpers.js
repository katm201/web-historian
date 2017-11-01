var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(callback, path) {
  path = path || '../archives/sites.txt';
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
    }
    var urls = data.split('\n');
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback, path) {
  path = path || '../archives/sites.txt';
  exports.readListOfUrls(function(urls) {
    callback(urls.indexOf(url) > -1);
  }, path);
};

exports.addUrlToList = function(url, callback, path) {
  path = path || '../archives/sites.txt';
  exports.isUrlInList(url, function(isInList) {
    if (!isInList) {
      fs.appendFile(path, url, function(err) {
        if (err) {
          console.error(err);
        }
        callback();
      });
    }
  }, path);
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
