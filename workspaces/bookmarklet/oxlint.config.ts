import config from '@w0s/oxlint-config/browser';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [config],
	overrides: [
		{
			files: ['src/**/*.js'],
			rules: {
				'no-alert': 'off',
				'typescript/no-unsafe-member-access': 'off',
				'typescript/no-unsafe-argument': 'off',
				'typescript/no-unsafe-assignment': 'off',
				'typescript/no-unsafe-call': 'off',
				'import/unambiguous': 'off',
				'unicorn/filename-case': 'off',
				'unicorn/prefer-module': 'off',
			},
		},
		{
			files: ['build/js.ts'],
			rules: {
				'no-console': 'off',
				'import/no-nodejs-modules': 'off',
			},
		},
	],
});
