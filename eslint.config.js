import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jsoncPlugin from 'eslint-plugin-jsonc';
import monorepoPlugin from 'eslint-plugin-monorepo';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import jsoncParser from 'jsonc-eslint-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import secondGenConfig from './2nd-gen/eslint.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [
    // Base recommended configs
    js.configs.recommended,
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    prettierConfig,

    // Global configuration
    {
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
                // Node globals
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                // ES6 globals
                Promise: 'readonly',
                Symbol: 'readonly',
                Map: 'readonly',
                Set: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            monorepo: monorepoPlugin,
        },
        rules: {
            'monorepo/no-internal-import': 'error',
            'monorepo/no-relative-import': 'error',
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'no-debugger': 2,
        },
    },

    // JSON files configuration
    {
        files: ['*.json'],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            jsonc: jsoncPlugin,
        },
        rules: {
            ...jsoncPlugin.configs['recommended-with-jsonc'].rules,
            'jsonc/sort-keys': ['warn'],
        },
    },

    // package.json specific configuration
    {
        files: ['package.json'],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            jsonc: jsoncPlugin,
        },
        rules: {
            ...jsoncPlugin.configs['recommended-with-jsonc'].rules,
            'jsonc/sort-keys': [
                'warn',
                {
                    hasProperties: ['type'],
                    order: [
                        '$schema',
                        'name',
                        'version',
                        'private',
                        'description',
                        'license',
                        'author',
                        'maintainers',
                        'contributors',
                        'homepage',
                        'repository',
                        'bugs',
                        'type',
                        'exports',
                        'main',
                        'module',
                        'browser',
                        'man',
                        'preferGlobal',
                        'bin',
                        'files',
                        'directories',
                        'scripts',
                        'config',
                        'sideEffects',
                        'types',
                        'typings',
                        'workspaces',
                        'resolutions',
                        'dependencies',
                        'bundleDependencies',
                        'bundledDependencies',
                        'peerDependencies',
                        'peerDependenciesMeta',
                        'optionalDependencies',
                        'devDependencies',
                        'keywords',
                        'engines',
                        'engineStrict',
                        'os',
                        'cpu',
                        'publishConfig',
                    ],
                    pathPattern: '^$',
                },
                {
                    order: { type: 'asc' },
                    pathPattern: '^(?!exports\\[).*',
                },
            ],
        },
    },

    // Load 1st-gen configuration using compatibility layer
    ...compat.extends('./1st-gen/.eslintrc.json').map((config) => ({
        ...config,
        files: ['1st-gen/**/*'],
    })),

    // Load 2nd-gen flat configuration
    ...secondGenConfig.map((config) => ({
        ...config,
        files: config.files
            ? config.files.map((f) => `2nd-gen/${f}`)
            : ['2nd-gen/**/*'],
        rules: {
            ...config.rules,
            // Disable monorepo rules for 2nd-gen - it has its own internal package structure
            'monorepo/no-internal-import': 'off',
            'monorepo/no-relative-import': 'off',
        },
    })),

    // Ignore auto-generated files
    {
        ignores: ['**/custom-elements.json', '**/CHANGELOG.md'],
    },
];
