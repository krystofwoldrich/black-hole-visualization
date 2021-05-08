const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
let reduceRows = (pathFrom, pathTo) => {
  let reducedArray = []
  fs.createReadStream(path.resolve(__dirname, pathFrom))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      console.log(`Parsed ${rowCount} rows`)
      csv.writeToPath(path.resolve(__dirname, pathTo), reducedArray)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
    });
  let current = 0;
  let readRow = (row) => {
    current++
    if (current % 64 === 0) {
      reducedArray.push(row)
    }
  }
}

let makeScalars = (pathFrom, pathTo) => {

  let reducedArrayScalar = []
  reducedArrayScalar.push(["X","Y","Z","D"])
  fs.createReadStream(path.resolve(__dirname, pathFrom))
    // fs.createReadStream(path.resolve(__dirname, 'data', "data_1.csv"))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      // console.log(`BHrows ${BHcouter}`)
      console.log(`Parsed ${rowCount} rows`)
      csv.writeToPath(path.resolve(__dirname, pathTo), reducedArrayScalar)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
    });

  let readRow = (row) => {
    let x = parseFloat(row[0])
    let y = parseFloat(row[1])
    let z = parseFloat(row[2])
    let d1 = parseFloat(row[3])
    let d2 = parseFloat(row[4])
    let d3 = parseFloat(row[5])
    let scalar = Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3)
    let array = [x, y, z, scalar];
    reducedArrayScalar.push(array)
  }
}

let cutData = (pathFrom, pathTo, cuts) => {

  let reducedArrayCut = []
  // reducedArrayScalar.push(["X","Y","Z","D"])
  let counter = 0;
  fs.createReadStream(path.resolve(__dirname, pathFrom))
    // fs.createReadStream(path.resolve(__dirname, 'data', "data_1.csv"))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      // console.log(`BHrows ${BHcouter}`)
      console.log(`Parsed ${rowCount} rows`)
      console.log("-> counter", counter);
      csv.writeToPath(path.resolve(__dirname, pathTo), reducedArrayCut)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
    });

  let readRow = (row) => {
    let x = parseFloat(row[0])
    let y = parseFloat(row[1])
    let z = parseFloat(row[2])
    if( x <= cuts.x.high && x >= cuts.x.low){
      if( y <= cuts.y.high && y >= cuts.y.low){
        if( z <= cuts.z.high && z >= cuts.z.low){
          reducedArrayCut.push(row)
          counter++;
        }
      }
    }

  }
}


// reduceRows('data/dataset3/el3_512_512_512.csv', "data/dataset3/el3Reduced64.csv")
// makeScalars('data/dataset3/el3Reduced64.csv', 'data/dataset3/el3Reduced64Scalar.csv')
makeScalars('data/dataset1/el1CUT.csv', 'data/dataset1/el1CUTScalar.csv')

// const cut ={
//   x:{
//     high: 0.77,
//     low: -0.74
//   },
//   y:{
//     high: 0.223,
//     low: -0.17
//   },
//   z:{
//     high: 1.3,
//     low: 0.95
//   }
// }
//
//
// cutData('data/dataset1/mag1_512_512_512.csv', "data/dataset1/mag1CUT1.csv",cut)
