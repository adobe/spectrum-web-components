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

const converter = converterFor('spectrum-Asset');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/asset',
            outPackage: 'asset',
            fileName: 'asset',
            components: [
                converter.classToHost(),
                converter.classToSlotted('spectrum-Asset-image'),
                converter.classToClass('spectrum-Asset-file'),
                converter.classToClass('spectrum-Asset-folder'),
                converter.classToClass('spectrum-Asset-folderBackground'),
                converter.classToClass('spectrum-Asset-fileBackground'),
                converter.classToClass('spectrum-Asset-fileOutline'),
                converter.classToClass('spectrum-Asset-folderOutline'),
            ],
        },
    ],
};

export default config;
