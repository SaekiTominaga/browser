import { defineConfig } from 'oxlint';
import configBookmarklet from './workspaces/bookmarklet/oxlint.config.ts';
import configUserscript from './workspaces/userscript/oxlint.config.ts';

export default defineConfig({
	extends: [configBookmarklet, configUserscript],
	options: {
		typeAware: true,
		typeCheck: true,
	},
});
