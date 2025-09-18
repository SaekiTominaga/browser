// @ts-check

import globals from 'globals';
import w0sConfig from '@w0s/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
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
			strict: 'off', // TODO: 本来は ['error', 'global'] を指定したいがなぜかエラーになる
		},
	},
	{
		files: ['build.js'],
		rules: {
			'no-console': 'off',
		},
	},
];
