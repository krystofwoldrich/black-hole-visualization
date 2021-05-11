BASE="/home/ubuntu/viz-black-hole-visualization"
PARTS=30

rm *.csv.part.*

split --numeric-suffixes=1 --number=l/$PARTS el1_512_512_512.csv.original el1_512_512_512.csv.part.

for part in *.csv.part.*; do
	node "$BASE/tools/reduceRows.js" \
		--modulo 64 \
		--pathFrom "$part" \
		--pathTo "$part.reduced" &
done

# cat *.reduced > el1_512_512_512_reducedRows.csv
