import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { globby } from 'globby';
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

const files = await globby(`${inputDirectory}/*.js`);
await Promise.all(
	files.map(async (filePath) => {
		/* File read */
		const data = await fs.promises.readFile(filePath);

		/* Minify */
		const minified = await minify(data.toString());

		/* File write */
		const outFilePath = `${outDirectory}/${path.basename(filePath, '.js')}.txt`;
		const outData = `javascript:${minified.code}`;

		await fs.promises.writeFile(outFilePath, outData);

		console.info(`${filePath} -> ${outFilePath}`);
	}),
);
