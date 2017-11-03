// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers.js');
var fs = require('fs');

checkQueue = function() {
  archive.readListOfUrls(function(urls) {
    console.log('checking...');
    if (urls) {
      console.log('download in progress');
      archive.downloadUrls(urls, archive.paths.archivedSites);
      fs.writeFile(archive.paths.list, '', {flag: 'w'}, function(err) {
        if (err) {
          console.error(err);
        }
        console.log('download complete');
      });
    }
  }, archive.paths.list);
};

checkQueue();

exports.checkQueue = checkQueue;