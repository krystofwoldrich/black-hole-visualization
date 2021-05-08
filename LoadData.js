const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

arrayOfBH = [[[]]]

fs.createReadStream(path.resolve(__dirname, 'data', "dataset1", 'el1_512_512_512.csv'))
// fs.createReadStream(path.resolve(__dirname, 'data', "data_1.csv"))
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => readRow(row))
  .on('end', rowCount => {
    console.log(`BHrows ${BHcouter}`)
    console.log(`Parsed ${rowCount} rows`)
  });
let counter = 0;
let BHcouter = 0;
readRow = (row) => {
  counter++;
  if(counter % 1000000 === 0)console.log("ROW ", row)
  let x = row[0].slice(0, 2);
  let y = row[1].slice(0, 3);
  let z = row[2].slice(0, 1);
  if(x === "0.8" && y === "-1.9" && z === "0"){
      console.log("NullBod")
      console.log(row)
  }
  if(x === "0.8" && y === "-1.9"){
    console.log("NullBod bez Z")
    console.log(row)
  }
  x = parseFloat(row[0])
  y = parseFloat(row[1])
  z = parseFloat(row[2])
  let vx = parseFloat(row[3])
  if(z === 0 ){
    console.log("NullBod z = 0 only")
    console.log(row)
  }
  if(isNaN(vx)){
    BHcouter++
    // console.log("BlackHole isNaN ")
    // console.log(row)
  }

  if(vx === 0){
    console.log("Null point from vx === 0")
    console.log(row)
  }

}



//mag2_512_512_512.csv
