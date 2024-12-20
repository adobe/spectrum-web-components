/*
Copyright 2024 Adobe. All rights reserved.

This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
module.exports = {
	allowEmptyInput: true,
	cache: true,
	defaultSeverity: "warning",
	extends: ["stylelint-config-standard"],
	plugins: [
		"stylelint-header",
		"stylelint-selector-bem-pattern",
		"stylelint-order",
		"stylelint-use-logical",
		"stylelint-high-performance-animation",
	],
	rules: {
		/** --------------------------------------------------------------
		 * Disabled rules
		 * -------------------------------------------------------------- */
		"custom-property-empty-line-before": null,
		"declaration-block-no-redundant-longhand-properties": null,
		"declaration-empty-line-before": null,
		"import-notation": null,
		"no-descending-specificity": null,
		"no-duplicate-selectors": null,

		/** --------------------------------------------------------------
		 * Customized rule settings
		 * -------------------------------------------------------------- */
		/** @note use floats for opacity because it minifies better than percent */
		"alpha-value-notation": ["percentage", { exceptProperties: ["opacity"] }],
		"at-rule-empty-line-before": [
			"always",
			{
				except: ["blockless-after-blockless", "first-nested"],
				ignore: ["after-comment", "first-nested"],
				ignoreAtRules: ["extend"],
			},
		],
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["extend", "each", "include", "mixin"],
			},
		],
		"block-no-empty": [
			true,
			{
				ignore: ["comments"],
			},
		],
		"color-function-notation": ["modern", { ignore: ["with-var-inside"] }],
		"comment-empty-line-before": [
			"always",
			{
				except: ["first-nested"],
				ignore: ["after-comment", "stylelint-commands"],
				// don't require a newline before a passthrough flag
				ignoreComments: [/^@?passthroughs?/],
			},
		],
		"custom-property-pattern": [/^(spectrum|mod|highcontrast|system|_)/, {}],
		"declaration-block-no-duplicate-custom-properties": true,
		"declaration-property-value-no-unknown": [
			true,
			{
				ignoreProperties: {
					color: ["CanvasText"],
					"forced-color-adjust": ["preserve-parent-color"],
				},
			},
		],
		"declaration-block-no-shorthand-property-overrides": true,
		"function-no-unknown": [
			true,
			{
				severity: "warning",
			},
		],
		"length-zero-no-unit": [true, { ignore: "custom-properties" }],
		"max-nesting-depth": [3, { severity: "warning" }],
		"property-no-unknown": [
			true,
			{
				checkPrefixed: true,
			},
		],
		"rule-empty-line-before": [
			"always",
			{
				except: ["first-nested"],
				ignore: ["after-comment"],
			},
		],
		"selector-attribute-quotes": "always",
		"selector-class-pattern": [
			"^(spectrum-|is-|u-)[A-Za-z0-9-]+",
			{
				resolveNestedSelectors: true,
			},
		],
		"selector-not-notation": "complex",
		"selector-pseudo-element-colon-notation": ["single", {}],
		"selector-type-no-unknown": [true, { ignore: ["custom-elements"] }],
		"value-keyword-case": [
			"lower",
			{
				camelCaseSvgKeywords: true,
				ignoreKeywords: ["Transparent", "Text"],
			},
		],
		"value-no-vendor-prefix": [
			true,
			{
				disableFix: true,
				severity: "warning",
			},
		],

		/** --------------------------------------------------------------
		 * Plugins
		 * -------------------------------------------------------------- */
		"csstools/use-logical": true,
		"header/header": [
			"config/license.js",
			{
				nonMatchingTolerance: 0.8,
			},
			{
				fix: true,
			},
		],
		"order/order": ["custom-properties", "declarations"],
		"plugin/selector-bem-pattern": [
			{
				preset: "suit",
				presetOptions: { namespace: "spectrum" },
				utilitySelectors: /^\.(is|u)-[A-z0-9]+$/,
				componentName: /^[A-Z][A-z0-9]+$/,
			},
			{
				severity: "warning",
			},
		],
		/** Performance */
		"plugin/no-low-performance-animation-properties": [
			true,
			{ severity: "warning" },
		],
	},
	/** --------------------------------------------------------------
	 * Overrides
	 * -------------------------------------------------------------- */
	overrides: [
		{
			files: ["storybook/assets/*.css"],
			rules: {
				"custom-property-pattern": null,
				"color-function-notation": null,
				"spectrum-tools/no-unused-custom-properties": null,
				"spectrum-tools/no-unknown-custom-properties": null,
			},
		},
		{
			files: [
				"packages/**/src/spectrum-*.css",
				"tools/**/src/spectrum-*.css",
				"tools/styles/**/*.css",
			],
			extends: [],
			rules: {
				"header/header": [
					"config/license.js",
					{
						nonMatchingTolerance: 0.8,
					},
					{
						fix: true,
					},
				],
			},
		},
	],
};
