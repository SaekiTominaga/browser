import w0sConfig from '@w0s/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
export default [
	...w0sConfig,
	{
		ignores: ['@types', 'dist'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['src/*.user.ts'],
		languageOptions: {
			parserOptions: {
				sourceType: 'script',
			},
		},
		rules: {
			'line-comment-position': 'off',
		},
	},
];
