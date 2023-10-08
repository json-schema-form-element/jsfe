#!/usr/bin/env bash

cem analyze --globs packages/form/src/*.ts --litelement --outdir packages/form

for dir in ./packages/*; do
	echo "$dir"
	cem analyze --globs $dir/src/*.ts --litelement --outdir $dir
	node scripts/cem-to-md.js $dir
done
