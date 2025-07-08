/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { AccordionMarkup } from './';
import { argTypes } from './args.js';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    title: 'Accordion',
    component: 'sp-accordion',
    args: {
        open: false,
        size: 'm',
        density: undefined,
    },
    argTypes,
    parameters: {
        testData: [
            {
                testHeading: "Standard",
            },
            {
                testHeading: "Compact",
                density: "compact",
                withStates: false,
                withSizes: true,
            },
            {
                testHeading: "Spacious",
                density: "spacious",
                withStates: false,
                withSizes: true,
            },
        ],
        stateData: [
            {
                testHeading: 'Disabled',
                disabled: true,
            },
        ],
    },
};

export const Default = AccordionMarkup.bind({});
