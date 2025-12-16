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
import { FontLoader } from './loaders/font-loader';
import customElements from './custom-elements.json';
import {
    withSingleStaticColor,
    withStaticColorsDemo,
    withFlexLayout,
    withTextDirectionWrapper,
} from './decorators';
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
        withSingleStaticColor,
        withStaticColorsDemo,
        withTextDirectionWrapper,
        withFlexLayout,
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
            },
        },
        options: {
            storySort: {
                method: 'alphabetical-by-kind',
                order: [
                    'About SWC',
                    ['Overview', 'When to use SWC', 'First Gen vs Second Gen'],
                    'Components',
                    'Guides',
                    [
                        'Getting started guide',
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
    globalTypes,
};

export default preview;
