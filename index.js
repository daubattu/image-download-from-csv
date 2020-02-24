const fs = require("fs");
const parse = require("csv-parse");
const download = require("./download");

const inputFile = "data.csv";

if (!fs.existsSync('images')){
  fs.mkdirSync('images');
}

fs.createReadStream(inputFile)
  .pipe(parse({delimiter: ','}))
  .on('data', function(row) {
    try {
      download(row[1], row[0] + '.png', () => {
        console.log(`Downloaded ${row[0]}`)
      }); 
    } catch (error) {
      console.log(error)
    }  
  })
  .on('end',function() {
    console.log('Read file csv success!!!');
  })


