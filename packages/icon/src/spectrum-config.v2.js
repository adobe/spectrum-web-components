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

const converter = converterFor('spectrum-Icon');

/**
 *
 * @param {string} fileName
 * @param {RegExp} regex
 * @returns {import('../../../tasks/spectrum-css-converter').Conversion}
 */
const iconType = (fileName, regex) => ({
    inPackage: '@spectrum-css/icon',
    outPackage: 'icon',
    fileName,
    requireComponentPresence: [
        /** @type {import('../../../tasks/spectrum-css-converter').SelectorComponentWithRegex} */ ({
            type: 'class',
            regex,
        }),
    ],
    components: [],
});

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/icon',
            outPackage: 'icon',
            fileName: 'icon',
            requireComponentPresence: [
                /** @type {import('../../../tasks/spectrum-css-converter').SelectorComponentWithRegex} */ ({
                    type: 'class',
                    regex: /spectrum-Icon/,
                }),
            ],
            components: [
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [
                            [
                                {
                                    type: 'pseudo-class',
                                    kind: 'root',
                                },
                            ],
                        ],
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [
                            [
                                {
                                    type: 'pseudo-class',
                                    kind: 'root',
                                },
                            ],
                        ],
                    },
                    hoist: true,
                },
                converter.classToHost(),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Icon--sizeXXS', 'xxs'],
                        ['spectrum-Icon--sizeXS', 'xs'],
                        ['spectrum-Icon--sizeS', 's'],
                        ['spectrum-Icon--sizeM', 'm'],
                        ['spectrum-Icon--sizeL', 'l'],
                        ['spectrum-Icon--sizeXL', 'xl'],
                        ['spectrum-Icon--sizeXXL', 'xxl'],
                    ],
                    'size'
                ),
            ],
            excludeByComponents: [
                builder.element('svg'),
                builder.element('img'),
            ],
        },
        iconType('icon-arrow', /^spectrum-UIIcon-Arrow/),
        iconType('icon-asterisk', /^spectrum-UIIcon-Asterisk/),
        iconType('icon-checkmark', /^spectrum-UIIcon-Checkmark/),
        iconType('icon-chevron', /^spectrum-UIIcon-Chevron/),
        iconType('icon-corner-triangle', /^spectrum-UIIcon-CornerTriangle/),
        iconType('icon-cross', /^spectrum-UIIcon-Cross/),
        iconType('icon-dash', /^spectrum-UIIcon-Dash/),
        iconType('icon-double-gripper', /^spectrum-UIIcon-DoubleGripper/),
        iconType('icon-single-gripper', /^spectrum-UIIcon-SingleGripper/),
        iconType('icon-triple-gripper', /^spectrum-UIIcon-TripleGripper/),
    ],
};

export default config;
