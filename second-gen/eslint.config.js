import js from '@eslint/js';
import spectrumWebComponentsPlugin from '@spectrum-web-components/eslint-plugin';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsoncPlugin from 'eslint-plugin-jsonc';
import litA11yPlugin from 'eslint-plugin-lit-a11y';
import noticePlugin from 'eslint-plugin-notice';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import jsoncParser from 'jsonc-eslint-parser';

// Reusable configurations to keep things DRY
const disableTypeAwareRules = {
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unnecessary-template-expression': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
};

const jsonConfig = {
    languageOptions: {
        parser: jsoncParser,
    },
    plugins: {
        jsonc: jsoncPlugin,
    },
};

const disableProjectParserOption = {
    languageOptions: {
        parserOptions: {
            project: null,
        },
    },
};

export default [
    // Base recommended configs
    js.configs.recommended,
    prettierConfig,

    // Global configuration for TypeScript files
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: true,
            },
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
                customElements: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                Event: 'readonly',
                CustomEvent: 'readonly',
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
            '@spectrum-web-components': spectrumWebComponentsPlugin,
            notice: noticePlugin,
            import: importPlugin,
            'simple-import-sort': simpleImportSortPlugin,
            'lit-a11y': litA11yPlugin,
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...litA11yPlugin.configs.recommended.rules,
            '@spectrum-web-components/prevent-argument-names': [
                'error',
                ['e', 'ev', 'evt', 'err'],
            ],
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                    allowHigherOrderFunctions: true,
                    allowTypedFunctionExpressions: true,
                },
            ],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksConditionals: true,
                    checksSpreads: true,
                    checksVoidReturn: true,
                },
            ],
            '@typescript-eslint/no-unnecessary-template-expression': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            complexity: ['warn', 10],
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'import/prefer-default-export': 'off',
            'lit-a11y/click-events-have-key-events': [
                'error',
                {
                    allowList: [
                        'sp-button',
                        'sp-action-button',
                        'sp-checkbox',
                        'sp-radio',
                        'sp-switch',
                        'sp-menu-item',
                        'sp-clear-button',
                        'sp-underlay',
                    ],
                },
            ],
            'max-depth': ['warn', 4],
            'max-lines': [
                'warn',
                {
                    max: 300,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
            'max-lines-per-function': [
                'warn',
                {
                    max: 50,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'no-debugger': 2,
            'no-var': 'error',
            'notice/notice': [
                'error',
                {
                    mustMatch: 'Copyright [0-9]{4}',
                    templateFile: '../COPYRIGHT',
                },
            ],
            'prefer-const': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        [
                            '^lit',
                            '^@lit',
                            '^(?!@swc|@spectrum-web-components)@?\\w',
                        ],
                        ['^@swc', '^@spectrum-web-components'],
                        ['^\\u0000'],
                        ['^\\.'],
                        ['^.+\\.(css|scss|sass|less|styl)$'],
                    ],
                },
            ],
        },
    },

    // JSON files configuration
    {
        files: ['**/*.json'],
        ...jsonConfig,
        rules: {
            ...jsoncPlugin.configs['recommended-with-jsonc'].rules,
            'jsonc/sort-keys': ['warn'],
            // Disable TypeScript rules for JSON files
            ...disableTypeAwareRules,
            'notice/notice': 'off',
        },
    },

    // package.json specific configuration
    {
        files: ['**/package.json'],
        ...jsonConfig,
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
                    pathPattern: '^$', // Top-level properties
                },
                {
                    /*
                     * This rule excludes export conditions from alphabetical sorting.
                     * Since node.js processes export conditions in order and chooses the
                     * first match, they need to be ordered logically, not alphabetically.
                     */
                    order: { type: 'asc' },
                    pathPattern: '^(?!exports\\[).*', // All properties except export conditions
                },
            ],
            // Disable TypeScript rules for package.json
            ...disableTypeAwareRules,
        },
    },

    // Scripts directory - allow console
    {
        files: ['scripts/**/*'],
        rules: {
            'no-console': ['off'],
        },
    },

    // React wrapper files - allow any
    {
        files: ['react/**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },

    // Declaration and JavaScript files - disable type-aware rules
    {
        files: ['**/*.d.ts', '**/*.js'],
        ...disableProjectParserOption,
        rules: {
            ...disableTypeAwareRules,
        },
    },

    // Node.js config files - add Node environment
    {
        files: [
            '**/playwright.config.js',
            '**/vite.config.js',
            '**/vitest.config.js',
        ],
        ...disableProjectParserOption,
        languageOptions: {
            ...disableProjectParserOption.languageOptions,
            globals: {
                // Node globals
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                Buffer: 'readonly',
                global: 'readonly',
            },
        },
        rules: {
            ...disableTypeAwareRules,
        },
    },

    // Ignore patterns
    {
        ignores: ['**/dist/**', '**/custom-elements.json'],
    },
];
