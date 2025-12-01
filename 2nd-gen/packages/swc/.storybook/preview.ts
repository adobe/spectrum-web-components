/** @type { import('@storybook/web-components').Preview } */
import '../stylesheets/tokens/index.css';
import '../stylesheets/tokens/light-vars.css';
import '../stylesheets/tokens/medium-vars.css';
import '../stylesheets/tokens/global-vars.css';
import '../stylesheets/global/elements.css';

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
        options: {
            storySort: {
                order: [
                    'Guides',
                    ['Welcome to 2nd-gen SWC', 'Global Element Styling'],
                    'Components',
                ],
            },
        },
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
    },
    tags: ['autodocs'],
};

export default preview;
