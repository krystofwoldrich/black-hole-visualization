const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

// fs.createReadStream(path.resolve(__dirname, 'data', "dataset2", 'el2_512_512_512.csv'))
fs.createReadStream(path.resolve(__dirname, 'data', "data_1.csv"))
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => readRow(row))
  .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
let counter = 0;
readRow = (row) => {
  counter++;
  if(counter % 1000000 === 0)console.log("ROW ", row)
  let x = parseFloat(row[0])
  let y = parseFloat(row[1])
  let z = parseFloat(row[2])
  let vx = parseFloat(row[3])
  if(x === 0.847 && z === 0 ){
    console.log("NullBod")
    console.log(row)
  }
  if(isNaN(vx)){
    console.log("BlackHole")
    console.log(row)
  }

}



//mag2_512_512_512.csv
