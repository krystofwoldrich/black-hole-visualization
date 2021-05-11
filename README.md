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
