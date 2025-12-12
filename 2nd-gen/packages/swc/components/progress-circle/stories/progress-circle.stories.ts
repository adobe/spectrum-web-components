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
 * They can represent determinate or indeterminate progress.
 * By default, they represent determinate progress. To represent determinate progress, set the `progress` attribute to a value between 0 and 100.
 * To represent indeterminate progress, set the `indeterminate` attribute to `true`.
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
    },
    args,
    argTypes,
    render: (args) => template(args), // This is the default render function for the component. Think of this like a beforeEach setup function for the stories below.
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
        label: 'Loading progress',
    },
};

// ──────────────────────────
//    STATIC STORIES
// ──────────────────────────

export const Overview: Story = {
    tags: ['overview'],
    args: {
        progress: 50,
        label: 'Loading progress',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A progress circle consists of several key parts:
 *
 * - An accessible label (via `label` attribute)
 * - A progress value (via `progress` attribute)
 * - An indeterminate state (via `indeterminate` attribute)
 * - An optional size
 * - An optional static color for backgrounds that have color
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, progress: 25, size: 'l', label: 'Loading' })}
        ${template({ ...args, indeterminate: true, label: 'Saving progress' })}
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
 * - **Small**: Used for inline indicators or space-constrained areas
 * - **Medium**: Default size, used for typical loading states
 * - **Large**: Used for prominent loading states or primary content areas
 */
export const Sizes: Story = {
    render: (args) => html`
        ${template({ ...args, size: 's', label: 'Small progress' })}
        ${template({ ...args, size: 'm', label: 'Medium progress' })}
        ${template({ ...args, size: 'l', label: 'Large progress' })}
    `,
    tags: ['options'],
    args: {
        progress: 25,
    },
};

/**
 * When displaying over images or colored backgrounds, use the `static-color` attribute for better contrast,
 * e.g. `static-color="white"` on a dark background or `static-color="black"` on a light background.
 */
export const StaticWhite: Story = {
    args: {
        'static-color': 'white',
        progress: 60,
        label: 'Loading on dark background',
    },
};

export const StaticBlack: Story = {
    args: {
        'static-color': 'black',
        progress: 60,
        label: 'Loading on light background',
    },
};

/**
 * When displaying over images or colored backgrounds, use the `static-color` attribute for better contrast,
 * e.g. `static-color="white"` on a dark background or `static-color="black"` on a light background.
 */
export const StaticColors: Story = {
    render: (args) => html`
        ${['white', 'black'].map(
            (color) => html`${template({ ...args, 'static-color': color })}`
        )}
    `,
    args: {
        progress: 60,
        label: 'Loading',
    },
    tags: ['options', '!test'],
    parameters: {
        flexLayout: false,
        staticColorsDemo: true,
    },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * Set the `progress` attribute to a value between 0 and 100 to represent determinate progress. This automatically sets `aria-valuenow` to the provided value.
 */
export const ProgressValues: Story = {
    render: (args) => html`
        ${template({ ...args, progress: 25, label: '25% progress' })}
        ${template({ ...args, progress: 50, label: '50% progress' })}
        ${template({ ...args, progress: 75, label: '75% progress' })}
        ${template({ ...args, progress: 100, label: '100% progress' })}
    `,
    tags: ['states'],
    args: {
        size: 'm',
    },
};

/**
 * Set the `indeterminate` attribute to render an animated loading indicator when the progress is unknown. This removes `aria-valuenow` from the element.
 */
export const Indeterminate: Story = {
    tags: ['states'],
    args: {
        indeterminate: true,
        size: 'm',
        label: 'Loading...',
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
 * 1. **ARIA role**: Automatically sets `role="progressbar"` for proper semantic meaning
 * 2. **Labeling**:
 *     - Uses the `label` attribute value as `aria-label`
 *     - When determinate, adds `aria-valuenow` with the current progress
 *     - Includes `aria-valuemin="0"` and `aria-valuemax="100"` for the progress range
 * 3. **Status communication**:
 *     - Screen readers announce progress updates
 *     - Indeterminate state is properly conveyed to assistive technologies
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` that explains what the progress represents
 * - Use determinate progress when possible to give users a clear sense of completion
 * - For determinate progress, ensure the `progress` value accurately reflects the actual progress
 * - Consider using `size="l"` for primary loading states to improve visibility
 */
export const Accessibility: Story = {
    tags: ['a11y'],
    args: {
        progress: 60,
        size: 'l',
        label: 'Uploading document',
    },
};
