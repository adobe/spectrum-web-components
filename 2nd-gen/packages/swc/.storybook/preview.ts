/** @type { import('@storybook/web-components').Preview } */
import './../../../../1st-gen/tools/styles/tokens/global-vars.css';
import './../../../../1st-gen/tools/styles/tokens/index.css';
import './../../../../1st-gen/tools/styles/tokens/light-vars.css';
import './../../../../1st-gen/tools/styles/tokens/medium-vars.css';
import '../stylesheets/swc.css';
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
import { withContext } from './decorators/contexts';
import { FontLoader } from './loaders/font-loader';

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
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Global theme for components',
            defaultValue: 'light',
            type: 'string',
            toolbar: {
                title: 'Theme',
                icon: 'paintbrush',
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark', title: 'Dark' },
                    { value: 'adaptive', title: 'Adaptive' },
                ],
                dynamicTitle: true,
            },
        },
        scale: {
            name: 'Scale',
            description: 'Global scale for components',
            defaultValue: 'medium',
            type: 'string',
            toolbar: {
                title: 'Scale',
                items: [
                    { value: 'medium', title: 'Medium' },
                    { value: 'large', title: 'Large' },
                ],
                dynamicTitle: true,
            },
        },
        textDirection: {
            name: 'Text direction',
            description: 'Direction of the content flow',
            defaultValue: 'ltr',
            type: 'string',
            toolbar: {
                title: 'Text direction',
                icon: 'transfer',
                items: [
                    { right: '➡️', value: 'ltr', title: 'Left to right (ltr)' },
                    { right: '⬅️', value: 'rtl', title: 'Right to left (rtl)' },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: 'light',
        scale: 'medium',
        textDirection: 'ltr',
    },
    decorators: [
        withContext,
        withStaticColorsDemo,
        withFlexLayout,
        withTextDirectionWrapper,
    ],
    parameters: {
        layout: 'centered',
        backgrounds: { disable: true }, // Use custom context switches
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
                        'Getting started guide',
                        'Customization',
                        [
                            'Getting Started',
                            'Theme and Scales',
                            'Component Styles',
                        ],
                        'Contributor guides',
                        [
                            'Getting involved',
                            'Using the issue tracker',
                            'Working in the SWC repo',
                            'Making a pull request',
                            'Participating in PR reviews',
                            'Releasing SWC',
                            'Authoring SWC guides',
                            'Patching dependencies',
                            'Accessibility testing',
                        ],
                        'Style guide',
                        'Project planning',
                        [
                            'Overview',
                            'Components',
                            'Milestones',
                            'Workstreams',
                            [
                                'About workstreams',
                                '2nd-gen definition and development',
                                '2nd-gen component migration',
                                [
                                    'Overview',
                                    'Factor rendering out of 1st-gen component',
                                    'Move base class to 2nd-gen core',
                                    'Formalize Spectrum data model',
                                    'Add 2nd-gen component',
                                    'Migrate rendering and styles',
                                ],
                                'Accessibility improvements',
                                'Component improvements',
                                '1st-gen Spectrum 2 enhancements',
                            ],
                        ],
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
                        'React wrappers',
                    ],
                    'Resources',
                ],
            },
        },
    },
    tags: ['!autodocs', '!dev'], // We only want the playground stories to be visible in the docs and sidenav. Since a majority of our stories are tagged with '!autodocs' and '!dev', we set those tags globally. We can opt in to visibility by adding the 'autodocs' or 'dev' tags to individual stories.
    loaders: [FontLoader],
};

export default preview;
