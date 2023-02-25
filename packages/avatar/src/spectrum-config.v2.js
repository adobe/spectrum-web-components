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

const converter = converterFor('spectrum-Avatar');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/avatar',
            outPackage: 'avatar',
            fileName: 'avatar',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.notToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Avatar--size50', '50'],
                        ['spectrum-Avatar--size75', '75'],
                        ['spectrum-Avatar--size100', '100'],
                        ['spectrum-Avatar--size200', '200'],
                        ['spectrum-Avatar--size300', '300'],
                        ['spectrum-Avatar--size400', '400'],
                        ['spectrum-Avatar--size500', '500'],
                        ['spectrum-Avatar--size600', '600'],
                        ['spectrum-Avatar--size700', '700'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Avatar-image'),
                converter.classToClass('spectrum-Avatar-link'),
            ],
        },
    ],
};

export default config;
