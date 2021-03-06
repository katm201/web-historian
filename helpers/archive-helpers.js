var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var downloadFile = require('download-file');
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
    if (data) {
      var urls = data.split('\n');
      callback(urls);
    } else {
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback, path) {
  path = path || '../archives/sites.txt';
  exports.readListOfUrls(function(urls) {
    if (urls !== undefined) {
      callback(urls.indexOf(url) > -1);
    } else {
      callback(false);
    }
  }, path);
};

exports.addUrlToList = function(url, callback, path) {
  path = path || '../archives/sites.txt';
  exports.isUrlInList(url, function(isInList) {
    if (!isInList) {
      fs.appendFile(path, url + '\n', function(err) {
        if (err) {
          console.error(err);
        }
        callback();
      });
    }
  }, path);
};

exports.isUrlArchived = function(url, callback, path) {
  path = path || '../archives/sites/';
  var substr;
  path[path.length - 1] === '/' ? substr = path.substring(0, path.length - 1) : substr = path; 
  filePath = substr + '.txt';
  exports.isUrlInList(url, function() {
    fs.readdir(path, 'utf8', function(err, files) {
      if (err) {
        console.error(err);
      }
      callback(files.indexOf(url) > -1);
    });
  }, filePath);
};

exports.downloadUrls = function(urls, path) {
  // path = path || '../archives/sites/';
  urls = urls.filter(function(item) {
    if (item !== '') {
      return true;
    }
  });
  for (var i = 0; i < urls.length; i++) {
    downloadFile('http://' + urls[i], {directory: path + '/', filename: urls[i]}, function(err) { 
      if (err) {
        console.error(err);
      }
    });
  }
  
};


