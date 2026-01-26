/** @type { import('@storybook/web-components').Preview } */
import '../tokens/global-vars.css';
import '../tokens/index.css';
import '../tokens/light-vars.css';
import '../tokens/medium-vars.css';
import './assets/preview.css';
import DocumentTemplate from './DocumentTemplate.mdx';

import { setCustomElementsManifest } from '@storybook/web-components';
import {
    setStorybookHelpersConfig,
    type Options,
} from '@wc-toolkit/storybook-helpers';
import customElements from './custom-elements.json';
import {
    withFlexLayout,
    withStaticColorsDemo,
    withTextDirectionWrapper,
} from './decorators';
import { FontLoader } from './loaders/font-loader';
import { globalTypes } from './types';

const storybookHelperOptions: Options = {
    categoryOrder: [
        'attributes',
        'properties',
        'slots',
        'cssProps',
        'cssParts',
        'events',
        'methods',
    ],
    hideArgRef: true,
    renderDefaultValues: true,
};

setStorybookHelpersConfig(storybookHelperOptions);

// Set the Custom Elements Manifest for automatic controls generation
setCustomElementsManifest(customElements);

const preview = {
    decorators: [
        withStaticColorsDemo,
        withFlexLayout,
        withTextDirectionWrapper,
    ],
    parameters: {
        layout: 'centered',
        controls: {
            expanded: true,
            hideNoControlsWarning: true,
            sort: 'requiredFirst',
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            config: {
                rules: [
                    // Customize axe-core rules if needed
                ],
            },
        },
        html: {
            root: '[data-html-preview]:first-of-type > *',
            removeComments: true,
            prettier: {
                tabWidth: 2,
                useTabs: false,
            },
            highlighter: {
                showLineNumbers: false,
                wrapLines: true,
            },
        },
        docs: {
            codePanel: true,
            page: DocumentTemplate,
            toc: {
                contentsSelector: '.sbdocs-content',
                headingSelector: 'h2, h3, h4',
                ignoreSelector:
                    '.sbdocs-subtitle, .sbdocs-preview *, #root-inner, #feedback',
                disable: false,
            },
            canvas: {
                withToolbar: true,
                layout: 'centered',
                sourceState: 'shown',
            },
            source: {
                excludeDecorators: true,
                type: 'auto',
                language: 'html',
                transform: async (source: string) => {
                    try {
                        const prettier = await import('prettier/standalone');
                        const prettierPluginHtml = await import(
                            'prettier/plugins/html'
                        );
                        const prettierPluginBabel = await import(
                            'prettier/plugins/babel'
                        );
                        const prettierPluginEstree = await import(
                            'prettier/plugins/estree'
                        );

                        return prettier.format(source, {
                            parser: 'html',
                            plugins: [
                                prettierPluginHtml.default,
                                prettierPluginBabel.default,
                                prettierPluginEstree.default,
                            ],
                            tabWidth: 2,
                            useTabs: false,
                            singleQuote: true,
                            printWidth: 80,
                        });
                    } catch (error) {
                        // If formatting fails, return the original source
                        console.error('Failed to format source code:', error);
                        return source;
                    }
                },
            },
        },
        options: {
            storySort: {
                method: 'alphabetical-by-kind',
                order: [
                    'Learn about SWC',
                    ['Overview', 'When to use SWC', '1st-gen vs 2nd-gen'],
                    'Components',
                    'Guides',
                    [
                        'Accessibility guides',
                        [
                            'Overview',
                            'Semantic HTML and ARIA',
                            'Accessible pattern libraries',
                            'Keyboard testing',
                            'Screen reader testing',
                            'Wave toolbar testing',
                            'Accessibility resources',
                        ],
                    ],
                ],
            },
        },
    },
    tags: ['!autodocs', '!dev'], // We only want the playground stories to be visible in the docs and sidenav. Since a majority of our stories are tagged with '!autodocs' and '!dev', we set those tags globally. We can opt in to visibility by adding the 'autodocs' or 'dev' tags to individual stories.
    loaders: [FontLoader],
    globalTypes,
};

export default preview;
