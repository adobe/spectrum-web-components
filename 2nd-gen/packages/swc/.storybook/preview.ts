/** @type { import('@storybook/web-components').Preview } */
import '../tokens/index.css';
import '../tokens/light-vars.css';
import '../tokens/medium-vars.css';
import '../tokens/global-vars.css';

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
    },
    tags: ['autodocs'],
};

export default preview;
