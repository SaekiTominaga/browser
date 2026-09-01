import config from '@w0s/oxlint-config/browser';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [config],
	ignorePatterns: ['dist'],
	overrides: [
		{
			files: ['src/*.user.ts'],
			rules: {
				'import/unambiguous': 'off',
				'unicorn/filename-case': 'off',
				'unicorn/prefer-module': 'off',
			},
		},
		{
			files: ['build/js.ts'],
			rules: {
				'import/no-nodejs-modules': 'off',
			},
		},
	],
});
