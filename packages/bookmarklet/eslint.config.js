// @ts-check

import globals from 'globals';
import tseslint from 'typescript-eslint';
import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default tseslint.config(
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
		},
	},
	{
		files: ['build.js'],
		rules: {
			'no-console': 'off',
		},
	},
);
