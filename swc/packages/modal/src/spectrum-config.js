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

const converter = converterFor('spectrum-Modal');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/modal',
            outPackage: 'modal',
            fileName: 'modal-wrapper',
            components: [
                converter.classToHost('spectrum-Modal-wrapper'),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('spectrum-Modal--responsive'),
            ],
            excludeByComponents: [
                builder.class('spectrum-Modal'),
                builder.class('spectrum-Modal--fullscreen'),
                builder.class('spectrum-Modal--fullscreenTakeover'),
            ],
        },
        {
            inPackage: '@spectrum-css/modal',
            outPackage: 'modal',
            fileName: 'modal',
            hoistCustomPropertiesFrom: 'spectrum-Modal',
            components: [
                {
                    find: [
                        builder.class('spectrum-Modal--fullscreenTakeover'),
                        builder.class('is-open'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('open')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.class('fullscreenTakeover'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Modal'),
                        builder.class('is-open'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('open')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.class('modal'),
                        },
                    ],
                },
                {
                    find: [builder.class('spectrum-Modal--responsive')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('responsive')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.class('modal'),
                        },
                    ],
                },
                converter.classToClass('spectrum-Modal', 'modal'),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('spectrum-Modal--responsive'),
                converter.classToClass('spectrum-Modal--fullscreen'),
                converter.classToClass('spectrum-Modal--fullscreenTakeover'),
            ],
            excludeByComponents: [builder.class('spectrum-Modal-wrapper')],
        },
    ],
};

export default config;
