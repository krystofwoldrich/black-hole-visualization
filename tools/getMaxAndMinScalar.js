const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Buffer } = require('buffer');
const cliProgress = require('cli-progress');

const argv = require('minimist')(process.argv.slice(2));

const pathFrom = argv.pathFrom

getMaxAndMinScalar(pathFrom)

function getMaxAndMinScalar(pathFrom) {
  const { size } = fs.statSync(path.resolve(process.cwd(), pathFrom));

  const bar = new cliProgress.SingleBar(
    {
      format: 'CLI Progress |' + '{bar}'
        + '| {percentage}% || {value}/{total} Chunks | Duration: {duration_formatted} || ETA: {eta_formatted}'
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(size, 0);

  let min = 10;
  let max = 0;
  fs.createReadStream(path.resolve(process.cwd(), pathFrom))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      console.log(`Parsed ${rowCount} rows`)
      console.log("-> MIN: ", min);
      console.log("-> MAX: ", max);
    });

  let readRow = (row) => {
	bar.increment(Buffer.from(row).length)

    if(isNaN(row[3])){
      return
    }
    let d = parseFloat(row[3])
    if(d> max){
      max = d
    }
    if( d < min){
      min = d
    }
  }
}
