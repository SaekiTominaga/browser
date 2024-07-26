// @ts-check

/** @type {import('stylelint').Config} */
export default {
	extends: ['@w0s/stylelint-config'],
	rules: {
		'at-rule-no-vendor-prefix': null,
		'color-named': null,
		'declaration-no-important': null,
		'property-disallowed-list': null,
		'selector-class-pattern': null,
		'selector-id-pattern': null,
		'selector-max-id': null,
		'plugin/use-logical-properties-and-values': null,
	},
};
