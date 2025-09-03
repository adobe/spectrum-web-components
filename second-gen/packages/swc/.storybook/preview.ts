/** @type { import('@storybook/web-components').Preview } */

import '../tokens/index.css';
import '../tokens/light-vars.css';
import '../tokens/medium-vars.css';
import '../tokens/global-vars.css';

import { html } from 'lit';
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from './custom-elements.json';

// Set the Custom Elements Manifest for automatic controls generation
setCustomElementsManifest(customElements);

const preview = {
    parameters: {
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
};

export default preview;
