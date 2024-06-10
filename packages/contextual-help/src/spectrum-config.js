/*
Copyright 2024 Adobe. All rights reserved.
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

const converter = converterFor('spectrum-ContextualHelp');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/contextualhelp',
            outPackage: 'contextual-help',
            fileName: 'contextual-help',
            hoistCustomPropertiesFrom: 'spectrum-ContextualHelp',
            excludeByComponents: [
                // No need to style the trigger, it is already styled by sp-button
                builder.class('spectrum-ContextualHelp-button'),
                builder.class('spectrum--large'),
            ],
            components: [
                // The min-width should be applied to the popover, not the :host
                converter.classToClass('spectrum-ContextualHelp', 'popover'),
                converter.classToClass('spectrum-ContextualHelp-popover'),
                converter.classToSlotted(
                    'spectrum-ContextualHelp-heading',
                    'heading'
                ),
                converter.classToClass('spectrum-ContextualHelp-body'),
                converter.classToSlotted(
                    'spectrum-ContextualHelp-link',
                    'link'
                ),
            ],
        },
    ],
};

export default config;
