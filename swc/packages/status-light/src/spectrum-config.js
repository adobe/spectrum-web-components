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

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-StatusLight');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
export default {
    conversions: [
        {
            inPackage: '@spectrum-css/statuslight',
            outPackage: 'status-light',
            fileName: 'status-light',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('spectrum-StatusLight--active'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-StatusLight--negative', 'negative'],
                        ['spectrum-StatusLight--notice', 'notice'],
                        ['spectrum-StatusLight--positive', 'positive'],
                        ['spectrum-StatusLight--info', 'info'],
                        ['spectrum-StatusLight--neutral', 'neutral'],
                        ['spectrum-StatusLight--yellow', 'yellow'],
                        ['spectrum-StatusLight--fuchsia', 'fuchsia'],
                        ['spectrum-StatusLight--indigo', 'indigo'],
                        ['spectrum-StatusLight--seafoam', 'seafoam'],
                        ['spectrum-StatusLight--chartreuse', 'chartreuse'],
                        ['spectrum-StatusLight--magenta', 'magenta'],
                        ['spectrum-StatusLight--purple', 'purple'],
                        ['spectrum-StatusLight--celery', 'celery'],
                    ],
                    'variant'
                ),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-StatusLight--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-StatusLight--sizeS', 's'],
                        ['spectrum-StatusLight--sizeL', 'l'],
                        ['spectrum-StatusLight--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'lang',
                    },
                    hoist: true,
                },
                {
                    exactSelector: true,
                    find: [builder.class('spectrum-StatusLight')],
                    replace: [
                        {
                            replace: builder.attribute('dir'),
                        },
                    ],
                },
            ],
        },
    ],
};
