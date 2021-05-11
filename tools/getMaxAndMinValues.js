const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Buffer } = require('buffer');
const cliProgress = require('cli-progress');

const argv = require('minimist')(process.argv.slice(2));

const pathFrom = argv.pathFrom

getMaxAndMinValues(pathFrom)

function getMaxAndMinValues(pathFrom) {
  const { size } = fs.statSync(path.resolve(process.cwd(), pathFrom));

  const bar = new cliProgress.SingleBar(
    {
      format: 'CLI Progress |' + '{bar}'
        + '| {percentage}% || {value}/{total} Chunks | Duration: {duration_formatted} || ETA: {eta_formatted}'
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(size, 0);

  let minScalar = Number.MAX_SAFE_INTEGER;
  let maxScalar = Number.MIN_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  let minZ = Number.MAX_SAFE_INTEGER;
  let maxZ = Number.MIN_SAFE_INTEGER;
  fs.createReadStream(path.resolve(process.cwd(), pathFrom))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => readRow(row))
    .on('end', rowCount => {
      console.log(`Parsed ${rowCount} rows`)
      console.log("-> MIN: ", minScalar);
      console.log("-> MAX: ", maxScalar);
    });

  let readRow = (row) => {
	  bar.increment(Buffer.from(row).length)

    if(isNaN(row[3])){
      return
    }
    const currentScalar = parseFloat(row[3])
    if(currentScalar > maxScalar){
      maxScalar = currentScalar
    }
    if( currentScalar < minScalar){
      minScalar = currentScalar
    }

    const currentX = parseFloat(row[0])
    if(currentX > maxX){
      maxX = currentX
    }
    if( currentX < minX){
      minX = currentX
    }

    const currentY = parseFloat(row[1])
    if(currentY > maxY){
      maxY = currentY
    }
    if( currentY < minY){
      minY = currentY
    }

    const currentZ = parseFloat(row[2])
    if(currentZ > maxZ){
      maxZ = currentZ
    }
    if( currentZ < minZ){
      minZ = currentZ
    }
  }
}
