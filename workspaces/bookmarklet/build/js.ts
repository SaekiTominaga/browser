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
}).values;

if (argsParsedValues.input === undefined) {
	throw new Error('Argument `input` not specified');
}
if (argsParsedValues.out === undefined) {
	throw new Error('Argument `out` not specified');
}
const inputDirectory = argsParsedValues.input;
const outDirectory = argsParsedValues.out;

const fileList = await Array.fromAsync(fs.promises.glob(`${inputDirectory}/*.js`));

await Promise.all(
	fileList.map(async (filePath) => {
		/* File read */
		const data = (await fs.promises.readFile(filePath)).toString();

		/* Minify */
		const minified = await minify(data);
		if (minified.code === undefined) {
			throw new Error(`${filePath}: minify failed`);
		}

		/* File write */
		const outPath = `${outDirectory}/${path.basename(filePath, '.js')}.txt`;
		const outData = `javascript:${minified.code}`;

		await fs.promises.writeFile(outPath, outData);

		console.info(`${filePath} -> ${outPath}`);
	}),
);
