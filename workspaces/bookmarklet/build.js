import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { minify } from 'terser';

const argsParsedValues = parseArgs({
	options: {
		input: {
			type: 'string',
			short: 'i',
		},
		out: {
			type: 'string',
			short: 'o',
		},
	},
	strict: false,
}).values;

const inputDirectory = String(argsParsedValues.input);
const outDirectory = String(argsParsedValues.out);

const files = fs.promises.glob(`${inputDirectory}/*.js`);

for await (const file of files) {
	/* File read */
	const data = await fs.promises.readFile(file);

	/* Minify */
	const minified = await minify(data.toString());

	/* File write */
	const outPath = `${outDirectory}/${path.basename(file, '.js')}.txt`;
	const outData = `javascript:${minified.code}`;

	await fs.promises.writeFile(outPath, outData);

	console.info(`${file} -> ${outPath}`);
}
