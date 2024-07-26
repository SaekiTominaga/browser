// @ts-check

import globals from 'globals';
import tseslint from 'typescript-eslint';
import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default tseslint.config(
	...w0sConfig,
	{
		ignores: ['dist/*.js'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				sourceType: 'script',
			},
		},
	},
	{
		files: ['src/*.js'],
		rules: {
			'no-alert': 'off',
		},
	},
);
