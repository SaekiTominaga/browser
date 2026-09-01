import fs from 'node:fs';
import { parseArgs } from 'node:util';

const argsParsedValues = parseArgs({
	options: {
		dir: {
			type: 'string',
			short: 'd',
		},
	},
}).values;

if (argsParsedValues.dir === undefined) {
	throw new Error('Argument `dir` not specified');
}
const targetDirectory = argsParsedValues.dir;

const fileList = await Array.fromAsync(fs.promises.glob(`${targetDirectory}/*.js`));

await Promise.all(
	fileList.map(async (filePath) => {
		/* File read */
		const data = (await fs.promises.readFile(filePath)).toString();

		/* Convert */
		const converted = data.replace(/^"use strict";/v, '').trimStart();

		/* File write */
		await fs.promises.writeFile(filePath, converted);
	}),
);
