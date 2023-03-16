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

const converter = converterFor('spectrum-Popover');
/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/popover',
            outPackage: 'popover',
            fileName: 'popover',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('spectrum-Popover--withTip', 'tip'),
                converter.classToAttribute(
                    'spectrum-Popover--dialog',
                    'dialog'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Popover--top', 'top'],
                        ['spectrum-Popover--bottom', 'bottom'],
                        ['spectrum-Popover--left', 'left'],
                        ['spectrum-Popover--right', 'right'],
                    ],
                    'placement',
                    'substring'
                ),
                converter.classToId('spectrum-Popover-tip', 'tip'),
                converter.classToClass(
                    'spectrum-Popover-tip-triangle',
                    'triangle'
                ),
            ],
        },
    ],
};

export default config;
