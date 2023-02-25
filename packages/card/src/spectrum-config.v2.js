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

import { converterFor } from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Card');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/card',
            outPackage: 'card',
            fileName: 'card',
            components: [
                converter.classToHost(),
                converter.classToClass('spectrum-Card-body'),
                converter.classToClass('spectrum-Card-header'),
                converter.classToClass('spectrum-Card-title'),
                converter.classToClass('spectrum-Card-subtitle'),
                converter.classToClass('spectrum-Card-content'),
                converter.classToClass(
                    'spectrum-Card-quickActions',
                    'quick-actions'
                ),
                converter.classToClass('spectrum-Card-actions'),
                converter.classToClass(
                    'spectrum-Card-actionButton',
                    'action-button'
                ),
                converter.classToClass('spectrum-Checkbox', 'checkbox'),
                ...converter.enumerateAttributes(
                    [['spectrum-Card--quiet'], ['spectrum-Card--gallery']],
                    'variant'
                ),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-drop-target', 'drop-target'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Card--sizeS', 's'],
                        ['spectrum-Card--sizeM', 'm'],
                        ['spectrum-Card--sizeL', 'l'],
                        ['spectrum-Card--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToAttribute('spectrum-Card--horizontal'),
                converter.classToId('spectrum-Card-coverPhoto', 'cover-photo'),
                converter.classToId('spectrum-Card-preview'),
                converter.classToSlotted('spectrum-Card-footer', 'footer'),
                converter.classToSlotted(
                    'spectrum-Card-description',
                    'description'
                ),
            ],
        },
    ],
};

export default config;
