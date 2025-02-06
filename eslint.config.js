import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import SWC from "./linters/eslint/index.js";
import importPlugin from "eslint-plugin-import";
// import { default as requirePlugin } from "eslint-plugin-require-extensions";
import prettier from 'eslint-plugin-prettier';
import litA11y from 'eslint-plugin-lit-a11y';
import TSParser from "@typescript-eslint/parser";
import json from 'eslint-plugin-jsonc';

const plugins = {
    eslint,
    tseslint,
    SWC,
    importPlugin,
    // requirePlugin,
};

const ignores = [
    'packages/**/*.d.ts',
    'packages/*/node_modules/**/*',
    'tools/**/*.d.ts',
    'tools/*/node_modules/**/*',
    'config/*',
    'tools/base/src/version.js',
];

const languageOptions = {
    ecmaVersion: 2020,
    sourceType: "module",
    globals: {
        browser: true,
        node: true,
        es6: true
    },
    parser: TSParser,
};

export default [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettier.configs.recommended,
    litA11y.configs.recommended,
    json.configs['recommended-with-jsonc'],
    // requirePlugin.configs.recommended,
    {
        languageOptions,
        plugins,
        ignores: [
            ...ignores,
            "package.json"
        ],
        rules: {
            "notice/notice": [
                "error",
                {
                    "mustMatch": "Copyright [0-9]{0,4} Adobe. All rights reserved.",
                    "templateFile": "config/license.js"
                }
            ],
            "curly": ["error", "all"],
            "no-debugger": 2,
            "no-console": [
                "error",
                {
                    "allow": ["warn", "error"]
                }
            ],
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    "ts": "never"
                }
            ],
            "import/prefer-default-export": "off",
            "@spectrum-web-components/prevent-argument-names": [
                "error",
                ["e", "ev", "evt", "err"]
            ],
            "sort-imports": [
                "error",
                {
                    "ignoreCase": true,
                    "ignoreDeclarationSort": true,
                    "ignoreMemberSort": false,
                    "allowSeparatedGroups": false
                }
            ],
            "lit-a11y/click-events-have-key-events": [
                "error",
                {
                    "allowList": [
                        "sp-button",
                        "sp-action-button",
                        "sp-checkbox",
                        "sp-radio",
                        "sp-switch",
                        "sp-menu-item",
                        "sp-clear-button",
                        "sp-underlay"
                    ]
                }
            ]
        },
    }, {
        "files": ["tasks/*", "scripts/*"],
        languageOptions,
        plugins,
        ignores: [
            ...ignores,
            "package.json"
        ],
        "rules": {
            "no-console": ["off"]
        }
    }, {
        "files": ["*.json"],
        languageOptions: {
            ...languageOptions,
            parser: json.parseForESLint,
        },
        ignores,
        rules: {
            "jsonc/sort-keys": [
                "warn",
                {
                    "pathPattern": ".*", // Hits the all properties
                    "hasProperties": ["type"],
                    "order": [
                        "type",
                        "properties",
                        "items",
                        "required",
                        "minItems",
                        "additionalProperties",
                        "additionalItems"
                    ]
                },
                {
                    "pathPattern": ".*",
                    "order": { "type": "asc" }
                }
            ]
        }
    }, {
        files: ["package.json"],
        languageOptions: {
            ...languageOptions,
            parser: json.parseForESLint,
        },
        ignores,
        rules: {
            "jsonc/sort-keys": [
                "warn",
                {
                    "pathPattern": "^$",
                    "order": [
                        "$schema",
                        "private",
                        "name",
                        "version",
                        "description",
                        "license",
                        "author",
                        "maintainers",
                        "contributors",
                        "homepage",
                        "repository",
                        "bugs",
                        "type",
                        "exports",
                        "main",
                        "module",
                        "browser",
                        "man",
                        "preferGlobal",
                        "bin",
                        "files",
                        "directories",
                        "scripts",
                        "config",
                        "sideEffects",
                        "types",
                        "typings",
                        "workspaces",
                        "resolutions",
                        "dependencies",
                        "bundleDependencies",
                        "bundledDependencies",
                        "peerDependencies",
                        "peerDependenciesMeta",
                        "optionalDependencies",
                        "devDependencies",
                        "keywords",
                        "engines",
                        "engineStrict",
                        "os",
                        "cpu",
                        "publishConfig"
                    ]
                },
                {
                    "pathPattern": "^repository$",
                    "order": ["type", "url", "directory"]
                },
                {
                    "pathPattern": ".*",
                    "order": { "type": "asc" }
                }
            ]
        }
    }
];
