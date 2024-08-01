// @ts-check

import globals from 'globals';
import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default [
	...w0sConfig,
	{
		ignores: ['dist/*.js'],
	},
	{
		files: ['src/*.js'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				sourceType: 'script',
			},
		},
		rules: {
			'no-alert': 'off',
			strict: ['error', 'global'],
		},
	},
	{
		files: ['build.js'],
		rules: {
			'no-console': 'off',
		},
	},
];
