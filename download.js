const fs = require('fs');
const request = require("request");

module.exports = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri)
      .pipe(fs.createWriteStream('images/' + filename))
      .on('close', callback)
  });
};