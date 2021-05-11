# Blackhole vizualization

## Tools example usage

How to reduce original file to every 64th row.

```bash
node tools/reduceRows.js \
	--modulo 64 \
	--pathFrom "../el1_512_512_512.csv" \
	--pathTo "test1.csv"
```

How to make scalars.

```bash
node tools/makeScalars.js \
	--pathFrom "../el1_512_512_512.csv" \
	--pathTo "test1.csv"
```

How to cut data.

```bash
node tools/cutData.js \
	--pathFrom "../el1_512_512_512.csv" \
	--pathTo "test1.csv" \
	--cutXH 21 --cutXL 10 \
	--cutYH 21 --cutYL 10 \
	--cutZH 21 --cutZL 10
```

How to get min and max scalar.


```bash
node tools/getMaxAndMinScalar.js \
	--pathFrom "../el1_512_512_512.csv"
```

### How to run tools as multithread

The multithread runner needs to be executed in folder, where the data source is located.

| Position | Argument detail                 |
|----------|---------------------------------|
| 1        | Data source file name           |
| 2        | Tool name                       |
| 3        | Tool arguments (as string)      |
| 4        | Threads count                   |
| 5        | Absolute path to the repository |

```bash
./tools/multithreadRunner.sh \
	el1_512_512_512.csv \
	reduceRows.js \
	"--modulo 64" \
	30 \
	/home/ubuntu/viz-black-hole-visualization
```

```bash
./tools/multithreadRunner.sh \
	el1_512_512_512.csv \
	cutData.js \
	"--cutXH=0.7 --cutXL=-0.7 --cutYH=0.7 --cutYL=-0.7 --cutZH=1.264 --cutZL=0.969" \
	16 \
	/home/ubuntu/viz-black-hole-visualization
```
