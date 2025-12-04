/** @type { import('@storybook/web-components').Preview } */
import '../tokens/global-vars.css';
import '../tokens/index.css';
import '../tokens/light-vars.css';
import '../tokens/medium-vars.css';
import DocumentTemplate from './DocumentTemplate.mdx';

import { setCustomElementsManifest } from '@storybook/web-components';
import {
    setStorybookHelpersConfig,
    type Options,
} from '@wc-toolkit/storybook-helpers';
import customElements from './custom-elements.json';
import { withStaticColorBackground } from './decorators/static-color-background';

const options: Options = {
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

setStorybookHelpersConfig(options);

// Set the Custom Elements Manifest for automatic controls generation
setCustomElementsManifest(customElements);

const preview = {
    decorators: [withStaticColorBackground],
    parameters: {
        layout: 'centered',
        controls: {
            expanded: true,
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
        docs: {
            codePanel: true,
            page: DocumentTemplate,
            toc: {
                contentsSelector: '.sbdocs-content',
                headingSelector: 'h2, h3',
                ignoreSelector: '#primary',
                disable: false,
                unsafeTocbotOptions: {
                    orderedList: false,
                },
            },
        },
        options: {
            storySort: {
                method: 'alphabetical-by-kind',
                order: [
                    'Get Started',
                    [
                        'Welcome to 2nd-gen SWC',
                        'What is SWC?',
                        'When to use SWC?',
                        'First Gen vs Second Gen',
                    ],
                    'Components',
                    'Guides',
                    [
                        'Getting started guide',
                        'Contributor guide',
                        'Style guide',
                        'Project planning',
                        'Accessibility guides',
                        [
                            'Overview',
                            'Semantic HTML and ARIA', 
                            'Accessible pattern libraries', 
                            'Keyboard testing', 
                            'Screen reader testing', 
                            'Wave toolbar testing', 
                            'Accessibility resources'
                        ],
                        'React wrappers',
                    ],
                    'Resources',
                ],
            },
        },
    },
    tags: ['autodocs'],
};

export default preview;
