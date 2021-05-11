const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Buffer } = require('buffer');
const cliProgress = require('cli-progress');

const argv = require('minimist')(process.argv.slice(2));

const modulo = argv.modulo
const pathFrom = argv.pathFrom
const pathTo = argv.pathTo

reduceRows(pathFrom, pathTo, modulo)

function reduceRows(pathFrom, pathTo, modulo) {
  let reducedArray = []

  const { size } = fs.statSync(path.resolve(process.cwd(), pathFrom));

  const bar = new cliProgress.SingleBar(
    {
      format: 'CLI Progress |' + '{bar}'
        + '| {percentage}% || {value}/{total} Chunks | Duration: {duration_formatted} || ETA: {eta_formatted}'
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(size, 0);

  fs.createReadStream(path.resolve(process.cwd(), pathFrom))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      bar.stop()
      console.log(`Parsed ${rowCount} rows`)
      csv.writeToPath(path.resolve(process.cwd(), pathTo), reducedArray)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
    });
  let current = 0;
  let readRow = (row) => {
    bar.increment(Buffer.from(row).length)
    current++
    if (current % modulo === 0) {
      reducedArray.push(row)
    }
  }
}
