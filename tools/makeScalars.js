const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Buffer } = require('buffer');
const cliProgress = require('cli-progress');

const argv = require('minimist')(process.argv.slice(2));

const pathFrom = argv.pathFrom
const pathTo = argv.pathTo

makeScalars(pathFrom, pathTo)

function makeScalars(pathFrom, pathTo) {
  const { size } = fs.statSync(path.resolve(process.cwd(), pathFrom));

  const bar = new cliProgress.SingleBar(
    {
      format: 'CLI Progress |' + '{bar}'
        + '| {percentage}% || {value}/{total} Chunks | Duration: {duration_formatted} || ETA: {eta_formatted}'
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(size, 0);

  let reducedArrayScalar = []
  reducedArrayScalar.push(["X","Y","Z","D"])
  fs.createReadStream(path.resolve(process.cwd(), pathFrom))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      console.log(`Parsed ${rowCount} rows`)
      csv.writeToPath(path.resolve(process.cwd(), pathTo), reducedArrayScalar)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
    });

  let readRow = (row) => {
	bar.increment(Buffer.from(row).length)

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
