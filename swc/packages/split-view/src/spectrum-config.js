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

const converter = converterFor('spectrum-SplitView');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
export default {
    conversions: [
        {
            inPackage: '@spectrum-css/splitview',
            outPackage: 'split-view',
            fileName: 'split-view',
            hoistCustomPropertiesFrom: 'spectrum-SplitView',
            components: [
                converter.classToHost('spectrum-SplitView'),
                converter.classToAttribute('spectrum-SplitView--vertical'),
                converter.classToId('spectrum-SplitView-splitter'),
                converter.classToId('spectrum-SplitView-gripper'),
                converter.classToSlotted('spectrum-SplitView-pane'),
                {
                    find: [
                        builder.class('spectrum-SplitView-splitter'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        { replace: builder.id('splitter') },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-SplitView-splitter'),
                        builder.class('is-draggable'),
                    ],
                    replace: [
                        { replace: builder.id('splitter') },
                        {
                            replace: builder.attribute('resizable'),
                            hoist: true,
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-SplitView-splitter'),
                        builder.class('is-draggable'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        { replace: builder.id('splitter') },
                        {
                            replace: builder.attribute('resizable'),
                            hoist: true,
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                            hoist: false,
                        },
                    ],
                },
            ],
        },
    ],
};
