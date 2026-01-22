/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { ProgressCircle } from '@adobe/swc/progress-circle';

import '@adobe/swc/progress-circle';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-progress-circle');

// @TODO: Blurring the range control seems to cause a catastrophic Storybook render failure, so using number input for now. React spectrum has the range control working, check their implementation for a solution.
argTypes.progress = {
    ...argTypes.progress,
    control: { type: 'number', min: 0, max: 100, step: 1 },
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: ProgressCircle.VALID_SIZES,
};

argTypes['static-color'] = {
    ...argTypes['static-color'],
    control: { type: 'select' },
    options: [undefined, ...ProgressCircle.STATIC_COLORS],
};

/**
 * Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way.
 * They can represent determinate or indeterminate progress.
 */
const meta: Meta = {
    title: 'Progress circle',
    component: 'swc-progress-circle',
    parameters: {
        docs: {
            subtitle: `Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way.`,
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13061-181&p=f&t=l8WhfseyuepkVXrl-0',
        },
        stackblitz: {
            url: 'https://stackblitz.com/edit/vitejs-vite-xx1plot6?file=package.json',
        },
        flexLayout: 'row-wrap',
    },
    args,
    argTypes,
    render: (args) => template(args),
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    tags: ['autodocs', 'dev'],
    args: {
        progress: 50,
        size: 'm',
        label: 'Uploading document',
    },
};

// ──────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────

export const Overview: Story = {
    tags: ['overview'],
    args: {
        progress: 50,
        label: 'Uploading document',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A progress circle consists of:
 *
 * 1. **Track** - Background ring showing the full progress range
 * 2. **Fill** - Colored ring segment showing current progress
 * 3. **Label** - Accessible text describing the operation (not visually rendered)
 *
 * ### Content
 * - **Default slot**: Alternative way to provide an accessible label (the `label` attribute is preferred)
 * - **Label**: Accessible text describing what is loading or progressing (not visually rendered)
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({
            ...args,
            progress: 0,
            size: 'l',
            label: 'Starting upload',
        })}
        ${template({
            ...args,
            progress: 50,
            size: 'l',
            label: 'Uploading document',
        })}
        ${template({
            ...args,
            progress: 100,
            size: 'l',
            label: 'Upload complete',
        })}
    `,
    tags: ['anatomy'],
    args: {},
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Progress circles come in three sizes to fit various contexts:
 *
 * - **Small (`s`)**: Used for inline indicators or space-constrained areas, such as in tables or alongside small text
 * - **Medium (`m`)**: Default size, used for typical loading states in cards, forms, or content areas
 * - **Large (`l`)**: Used for prominent loading states, primary content areas, or full-page loading indicators
 */
export const Sizes: Story = {
    render: (args) => html`
        ${template({ ...args, size: 's', label: 'Processing small item' })}
        ${template({ ...args, size: 'm', label: 'Processing medium item' })}
        ${template({ ...args, size: 'l', label: 'Processing large item' })}
    `,
    tags: ['options'],
    args: {
        progress: 25,
    },
    parameters: {
        'section-order': 1,
    },
};

/**
 * Use the `static-color` attribute when displaying over images or colored backgrounds:
 *
 * - **white**: Use on dark or colored backgrounds for better contrast
 * - **black**: Use on light backgrounds for better contrast
 */
export const StaticColors: Story = {
    render: (args) => html`
        ${ProgressCircle.STATIC_COLORS.map(
            (color) => html`${template({ ...args, 'static-color': color })}`
        )}
    `,
    args: {
        progress: 60,
        label: 'Processing media',
    },
    tags: ['options'],
    parameters: {
        staticColorsDemo: true,
        'section-order': 2,
    },
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * Progress circles can show specific progress values from 0% to 100%.
 * Set the `progress` attribute to a value between 0 and 100 to represent determinate progress.
 * This automatically sets `aria-valuenow` to the provided value for screen readers.
 */
export const ProgressValues: Story = {
    render: (args) => html`
        ${template({ ...args, progress: 0, label: 'Starting download' })}
        ${template({ ...args, progress: 25, label: 'Downloading (25%)' })}
        ${template({ ...args, progress: 50, label: 'Downloading (50%)' })}
        ${template({ ...args, progress: 75, label: 'Downloading (75%)' })}
        ${template({ ...args, progress: 100, label: 'Download complete' })}
    `,
    tags: ['states'],
    args: {
        size: 'm',
    },
    parameters: {
        'section-order': 1,
    },
};
ProgressValues.storyName = 'Progress values';

/**
 * The indeterminate state shows an animated loading indicator when progress is unknown or cannot be determined.
 * Set the `indeterminate` attribute to `true` to activate this state.
 * This removes `aria-valuenow` from the element and provides appropriate feedback to assistive technologies.
 *
 * Use indeterminate progress when:
 * - The operation duration is unknown
 * - Progress cannot be accurately measured
 * - Multiple sub-operations are running in parallel
 */
export const Indeterminate: Story = {
    tags: ['states'],
    args: {
        indeterminate: true,
        size: 'm',
        label: 'Processing request',
    },
    parameters: {
        'section-order': 2,
    },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-progress-circle>` element implements several accessibility features:
 *
 * #### ARIA implementation
 *
 * 1. **ARIA role**: Automatically sets `role="progressbar"` for proper semantic meaning
 * 2. **Labeling**:
 *     - Uses the `label` attribute value as `aria-label`
 *     - Alternative: Content in the default slot can provide the label
 * 3. **Progress state** (determinate):
 *     - Sets `aria-valuenow` with the current `progress` value
 * 4. **Loading state** (indeterminate):
 *     - Removes `aria-valuenow` when `indeterminate="true"`
 *     - Screen readers understand this as an ongoing operation with unknown duration
 * 5. **Status communication**: Screen readers announce progress updates as values change
 *
 * #### Visual accessibility
 *
 * - Progress is shown visually through the fill amount, not relying solely on color
 * - High contrast mode is supported with appropriate color overrides
 * - Static color variants ensure sufficient contrast on different backgrounds
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` that explains what the progress represents
 * - Use specific, meaningful labels (e.g., "Uploading profile photo" instead of "Loading")
 * - Use determinate progress (`progress="50"`) when possible to give users a clear sense of completion
 * - For determinate progress, ensure the `progress` value accurately reflects the actual progress
 * - Use indeterminate progress only when duration is truly unknown
 * - Consider using `size="l"` for primary loading states to improve visibility
 * - Ensure sufficient color contrast between the progress circle and its background
 * - Use `static-color="white"` on dark backgrounds or `static-color="black"` on light backgrounds
 * - Test with screen readers to verify progress announcements are clear and timely
 * - Avoid updating progress values more frequently than every 1-2 seconds to prevent announcement overload
 */
export const Accessibility: Story = {
    tags: ['a11y'],
    args: {
        progress: 60,
        size: 'l',
        label: 'Uploading presentation slides',
    },
};
