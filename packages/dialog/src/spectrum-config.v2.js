// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Dialog');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/dialog',
            outPackage: 'dialog',
            fileName: 'dialog',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('spectrum-Dialog--error'),
                converter.classToAttribute('spectrum-Dialog--dismissable'),
                converter.classToAttribute(
                    'spectrum-Dialog--noDivider',
                    'no-divider'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Dialog--small', 's'],
                        ['spectrum-Dialog--medium', 'm'],
                        ['spectrum-Dialog--large', 'l'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Dialog--fullscreen'],
                        ['spectrum-Dialog--fullscreenTakeover'],
                    ],
                    'mode'
                ),
                converter.classToSlotted('spectrum-Dialog-heading', 'heading'),
                converter.classToSlotted('spectrum-Dialog-hero', 'hero'),
                converter.classToSlotted('*'),
                converter.classToClass('spectrum-Dialog-grid'),
                converter.classToClass('spectrum-Dialog-divider'),
                converter.classToClass('spectrum-Dialog-content'),
                converter.classToClass(
                    'spectrum-Dialog-closeButton',
                    'close-button'
                ),
                converter.classToClass('spectrum-Dialog-header'),
                converter.classToClass('spectrum-Dialog-footer'),
                converter.classToClass('spectrum-Dialog-typeIcon', 'type-icon'),
                converter.classToClass('spectrum-Button'),
                converter.classToClass(
                    'spectrum-Dialog-buttonGroup',
                    'button-group'
                ),
                converter.classToClass(
                    'spectrum-Dialog-buttonGroup--noFooter',
                    'button-group--noFooter'
                ),
                {
                    find: [
                        builder.class('spectrum-Dialog-heading'),
                        builder.class('spectrum-Dialog-heading--noHeader'),
                    ],
                    replace: [
                        {
                            replace: builder.class('no-header'),
                        },
                        {
                            replace: builder.slotted('heading'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Dialog-heading'),
                        {
                            type: 'combinator',
                            value: 'next-sibling',
                        },
                        builder.class('spectrum-Dialog-divider'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('name', 'heading'),
                            hoist: false,
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
