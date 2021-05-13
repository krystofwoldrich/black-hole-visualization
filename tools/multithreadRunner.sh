INPUT_FILE_NAME="$1"
TOOL="$2"
TOOL_ARGS="$3"
BASE="$5"
THREADS="$4"

mv "$INPUT_FILE_NAME" "$INPUT_FILE_NAME.original"

rm *.csv.part.*

split --numeric-suffixes=1 --number=l/$THREADS "$INPUT_FILE_NAME.original" "$INPUT_FILE_NAME.part."

running_tools=()

for part in *.csv.part.*; do
	NODE_ARGS="$TOOL_ARGS --pathFrom $part --pathTo $part.reduced"
	node "$BASE/tools/$TOOL" $NODE_ARGS &
	running_tools+=($!)
done

for pid in ${running_tools[@]}; do
    wait $pid
done

cat *.reduced > "$INPUT_FILE_NAME.$TOOL"

rm *.csv.part.*

mv "$INPUT_FILE_NAME.original" "$INPUT_FILE_NAME"
