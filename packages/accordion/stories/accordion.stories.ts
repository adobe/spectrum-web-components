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

import { Template } from './template.js';
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
                testHeading: 'Standard',
            },
            {
                testHeading: 'Compact',
                density: 'compact',
                withStates: false,
                withSizes: true,
            },
            {
                testHeading: 'Spacious',
                density: 'spacious',
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

export const Default = Template.bind({});

// ********* VRT ONLY ********* //
export const WithForcedColors = Template.bind({});
WithForcedColors.args = Default.args;
WithForcedColors.tags = ['!autodocs', '!dev'];
WithForcedColors.parameters = {
    chromatic: {
        forcedColors: 'active',
        modes: {
            'Light | LTR': {
                disable: true,
            },
            'Dark | RTL': {
                disable: true,
            },
        },
    },
};

// ********* DOCS ONLY ********* //

/**
 * Accordion items have a default width for each size, but a custom width can also be set to any
 * width that meets or exceeds the minimum width.
 */
export const CustomWidth = Template.bind({});
CustomWidth.tags = ['!dev'];
CustomWidth.storyName = 'Custom width';
CustomWidth.args = {
    customStyles: {
        '--mod-accordion-item-width': '500px',
    },
};
CustomWidth.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * The compact density has less vertical spacing between rows.
 */
export const Compact = Template.bind({});
Compact.tags = ['!dev'];
Compact.args = {
    density: 'compact',
};
Compact.parameters = {
    chromatic: { disableSnapshot: true },
};
Compact.storyName = 'Density: Compact';

/**
 * The spacious density has more vertical spacing between rows.
 */
export const Spacious = Template.bind({});
Spacious.tags = ['!dev'];
Spacious.args = {
    density: 'spacious',
};
Spacious.parameters = {
    chromatic: { disableSnapshot: true },
};
Spacious.storyName = 'Density: Spacious';

/**
 * Individual accordion items can be disabled by applying the `.is-disabled` class to the
 * `.spectrum-Accordion-item` element. This example also demonstrates the use of the disabled
 * attribute on the heading button.
 */
export const Disabled = Template.bind({});
Disabled.tags = ['!dev'];
Disabled.args = {
    disableAll: true,
};
Disabled.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * The optional quiet style for accordion has no dividers between sections. This style works best
 * when a clear layout (vertical stack, table, grid) makes it easy to see and understand because
 * too many quiet components in a small space can be hard to differentiate. This can be applied by
 * adding the `.spectrum-Accordion--quiet` class alongside the parent `.spectrum-Accordion` class.
 */
export const Quiet = Template.bind({});
Quiet.tags = ['!dev'];
Quiet.args = {
    isQuiet: true,
};
Quiet.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Implementations may choose to remove inline padding from the accordion item headers by adding
 * the `.spectrum-Accordion--noInlinePadding` class alongside the parent `.spectrum-Accordion`
 * class. Accordion item header padding will be removed, but the body text content will keep its
 * own padding from the edge.
 */
export const NoInlinePadding = Template.bind({});
NoInlinePadding.storyName = 'No inline padding';
NoInlinePadding.tags = ['!dev'];
NoInlinePadding.args = {
    hasNoInlinePadding: true,
};
NoInlinePadding.parameters = {
    chromatic: { disableSnapshot: true },
};
