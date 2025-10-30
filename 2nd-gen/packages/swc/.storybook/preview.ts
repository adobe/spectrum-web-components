/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import type { Preview } from '@storybook/web-components';
import type { Options } from '@wc-toolkit/storybook-helpers';

import { setCustomElementsManifest } from '@storybook/web-components';
import { setStorybookHelpersConfig } from '@wc-toolkit/storybook-helpers';

import customElements from './custom-elements.json';
import { withStaticColorBackground } from './decorators/static-color-background';

import '../tokens/global-vars.css';
import '../tokens/index.css';
import '../tokens/light-vars.css';
import '../tokens/medium-vars.css';

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

const preview: Preview = {
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
