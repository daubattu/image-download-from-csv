const fs = require("fs");
const parse = require("csv-parse");
const request = require("request");

const file = "data.csv";
const folder = "images";

if (!fs.existsSync(folder)){
  fs.mkdirSync(folder);
}

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body) {
    request(uri)
      .pipe(fs.createWriteStream(folder + '/' + filename))
      .on('close', callback)
  });
};

fs.createReadStream(file)
  .pipe(parse({delimiter: ','}))
  .on('data', function(row) {
    try {
      download(row[1], row[0].replace(/[^a-zA-Z0-9 ]/g, '') + '.png', () => {
        console.log(`Downloaded ${row[0].replace(/[^a-zA-Z0-9 ]/g, '')}`)
      }); 
    } catch (error) {
      console.log(error)
    }  
  })
  .on('end',function() {
    console.log('Read file csv success!!!');
  })


