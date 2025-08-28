// TODO: storybook-addon-web-components-knobs
// TODO: check import { setCustomElementsManifest } from '@storybook/web-components';
// TODO: check globalTypes / themes
/** @type { import('@storybook/web-components').Preview } */
const preview = {
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
