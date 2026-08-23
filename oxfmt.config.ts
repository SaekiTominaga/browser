import { defineConfig } from 'oxfmt';

export default defineConfig({
	singleQuote: true,
	sortImports: {
		newlinesBetween: false,
	},
	ignorePatterns: ['/workspaces/*/dist/'],
	overrides: [
		{
			files: ['*.css'],
			options: {
				singleQuote: false,
			},
		},
	],
});
