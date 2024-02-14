// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { converterFor } from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Thumbnail');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
export default {
    conversions: [
        {
            inPackage: '@spectrum-css/thumbnail',
            outPackage: 'thumbnail',
            fileName: 'thumbnail',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('spectrum-Thumbnail--cover'),
                converter.classToAttribute('spectrum-Thumbnail-layer'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Thumbnail--size50', '50'],
                        ['spectrum-Thumbnail--size75', '75'],
                        ['spectrum-Thumbnail--size100', '100'],
                        ['spectrum-Thumbnail--size200', '200'],
                        ['spectrum-Thumbnail--size300', '300'],
                        ['spectrum-Thumbnail--size400', '400'],
                        ['spectrum-Thumbnail--size500', '500'],
                        ['spectrum-Thumbnail--size600', '600'],
                        ['spectrum-Thumbnail--size700', '700'],
                        ['spectrum-Thumbnail--size800', '800'],
                        ['spectrum-Thumbnail--size900', '900'],
                        ['spectrum-Thumbnail--size1000', '1000'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Thumbnail-background'),
                converter.classToClass('spectrum-Thumbnail-image-wrapper'),
                converter.classToClass('spectrum-Thumbnail-layer-inner'),
                converter.classToSlotted('spectrum-Thumbnail-image'),
            ],
        },
    ],
};
