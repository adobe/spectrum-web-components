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

const converter = converterFor('spectrum-FieldGroup');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/fieldgroup',
            outPackage: 'field-group',
            fileName: 'field-group',
            hoistCustomPropertiesFrom: 'spectrum-FieldGroup',
            excludeByComponents: [builder.class('spectrum-Checkbox')],
            components: [
                converter.classToClass('spectrum-FieldGroup', 'group'),
                converter.classToAttribute('spectrum-FieldGroup--horizontal'),
                converter.classToAttribute('spectrum-FieldGroup--vertical'),
                converter.classToClass(
                    'spectrum-FieldGroupInputLayout',
                    'group'
                ),
                {
                    find: [
                        // .spectrum-FieldGroup-item:not(:last-child)
                        builder.class('spectrum-FieldGroup-item'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [[builder.pseudoClass('last-child')]],
                        },
                    ],
                    replace: [
                        //slot:not([name])::slotted(:not(:last-child))
                        {
                            replace: builder.element('slot'),
                        },
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [[builder.attribute('name')]],
                            },
                        },
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    {
                                        type: 'pseudo-class',
                                        kind: 'not',
                                        selectors: [
                                            [builder.pseudoClass('last-child')],
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
