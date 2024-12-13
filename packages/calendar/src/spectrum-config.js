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
// @ts-check

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Calendar');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/calendar',
            outPackage: 'calendar',
            fileName: 'calendar',
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-Calendar--padded'),
                {
                    find: [
                        builder.class('spectrum-Calendar-date'),
                        builder.class('is-focused'),
                    ],
                    replace: [
                        {
                            replace: builder.class('table-cell'),
                        },
                        {
                            replace: builder.pseudoClass('focus-within'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.class('date'),
                        },
                    ],
                    collapseSelector: true,
                },
                converter.classToClass('spectrum-Calendar-header', 'header'),
                converter.classToClass('spectrum-Calendar-title', 'title'),
                converter.classToClass(
                    'spectrum-Calendar-prevMonth',
                    'prevMonth'
                ),
                converter.classToClass(
                    'spectrum-Calendar-nextMonth',
                    'nextMonth'
                ),
                converter.classToClass(
                    'spectrum-Calendar-dayOfWeek',
                    'dayOfWeek'
                ),
                converter.classToClass('spectrum-Calendar-body', 'body'),
                converter.classToClass('spectrum-Calendar-table', 'table'),
                converter.classToClass(
                    'spectrum-Calendar-tableCell',
                    'table-cell'
                ),
                converter.classToClass('spectrum-Calendar-date', 'date'),
            ],
        },
    ],
};

export default config;
