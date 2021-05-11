const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Buffer } = require('buffer');
const cliProgress = require('cli-progress');

const argv = require('minimist')(process.argv.slice(2));

const pathFrom = argv.pathFrom
const pathTo = argv.pathTo
const cut = {
  x: { high: argv.cutXH, low: argv.cutXL },
  y: { high: argv.cutYH, low: argv.cutYL },
  z: { high: argv.cutZH, low: argv.cutZL },
}

cutData(pathFrom, pathTo, cut)

function cutData(pathFrom, pathTo, cut) {
  const { size } = fs.statSync(path.resolve(process.cwd(), pathFrom));

  const bar = new cliProgress.SingleBar(
    {
      format: 'CLI Progress |' + '{bar}'
        + '| {percentage}% || {value}/{total} Chunks | Duration: {duration_formatted} || ETA: {eta_formatted}'
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(size, 0);

  let reducedArrayCut = []
  let counter = 0;
  fs.createReadStream(path.resolve(process.cwd(), pathFrom))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      console.log(`Parsed ${rowCount} rows`)
      console.log("-> counter", counter);
      csv.writeToPath(path.resolve(process.cwd(), pathTo), reducedArrayCut)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
    });

  let readRow = (row) => {
    bar.increment(Buffer.from(row).length)

    let x = parseFloat(row[0])
    let y = parseFloat(row[1])
    let z = parseFloat(row[2])
    if( x <= cut.x.high && x >= cut.x.low){
      if( y <= cut.y.high && y >= cut.y.low){
        if( z <= cut.z.high && z >= cut.z.low){
          reducedArrayCut.push(row)
          counter++;
        }
      }
    }
  }
}
