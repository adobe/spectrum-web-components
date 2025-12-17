/** @type { import('@storybook/web-components').Preview } */
import '../stylesheets/swc.css';

import { setCustomElementsManifest } from '@storybook/web-components';
import {
    setStorybookHelpersConfig,
    type Options,
} from '@wc-toolkit/storybook-helpers';
import customElements from './custom-elements.json';
import { withContext } from './decorators/contexts';
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
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            toolbar: {
                title: 'Theme',
                items: [
                    { value: 'light', title: 'Light', icon: 'sun' },
                    { value: 'dark', title: 'Dark', icon: 'moon' },
                    { value: 'adaptive', title: 'Adaptive', icon: 'mirror' },
                ],
                dynamicTitle: true,
            },
        },
        scale: {
            description: 'Global scale for components',
            toolbar: {
                title: 'Scale',
                items: [
                    { value: 'medium', title: 'Medium' },
                    { value: 'large', title: 'Large' },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: 'light',
        scale: 'medium',
    },
    decorators: [withContext, withStaticColorBackground],
    parameters: {
        options: {
            storySort: {
                order: [
                    'Guides',
                    [
                        'Welcome to 2nd-gen SWC',
                        'Customization',
                        [
                            'Getting Started',
                            'Theme and Scales',
                            'Component Styles',
                        ],
                    ],
                    'Components',
                ],
            },
        },
        layout: 'centered',
        backgrounds: { disable: true }, // Use custom context switches
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
