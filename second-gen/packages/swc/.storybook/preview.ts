// TODO: storybook-addon-web-components-knobs
// TODO: check import { setCustomElementsManifest } from '@storybook/web-components';
// TODO: check globalTypes / themes
/** @type { import('@storybook/web-components').Preview } */

import './index.css';
import './light-vars.css';
import './medium-vars.css';
import './global-vars.css';

import { html } from 'lit';

const preview = {
    decorators: [
        (story) => html`
            <div class="spectrum spectrum--light spectrum--medium">
                ${story()}
            </div>
        `,
    ],
    parameters: {
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
