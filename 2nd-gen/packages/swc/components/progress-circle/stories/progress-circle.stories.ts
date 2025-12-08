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

const { events, args, argTypes, template } = getStorybookHelpers(
    'swc-progress-circle'
);

/*
 * @todo Blurring the range control seems to cause a catastrophic Storybook
 * render failure, so using number input for now.
 */
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
 * This is the `description` fo the progress circle component
 */
const meta: Meta = {
    title: 'Progress circle',
    component: 'swc-progress-circle',
    parameters: {
        docs: {
            subtitle: `Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. They can represent determinate or indeterminate progress.`,
        },
        actions: {
            handles: events,
        },
    },
    decorators: [
        (story) =>
            html`<div style="display: flex; gap: 24px; align-items: center;">
                ${story()}
            </div>`,
    ],
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
    render: (args) => template(args),
    tags: ['autodocs', 'dev'],
    args: {
        progress: 50,
        size: 'm',
        label: 'Loading progress',
    },
};

// ─────────────────────
//    USAGE STORIES
// ─────────────────────

/**
 * A progress circle consists of several key parts:
 *
 * - A label (via `label` attribute)
 * - A progress value (via `progress` attribute)
 * - An an optional indeterminate state (via `indeterminate` attribute)
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

/**
 * Progress circles come in three sizes to fit various contexts:
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

export const ProgressValues: Story = {
    render: () => html`
        ${template({ ...args, progress: 25, label: '25% progress' })}
        ${template({ ...args, progress: 50, label: '50% progress' })}
        ${template({ ...args, progress: 75, label: '75% progress' })}
        ${template({ ...args, progress: 100, label: '100% progress' })}
    `,
    tags: ['usage'],
    args: {
        size: 'm',
    },
};

/**
 * Use `indeterminate` progress when the duration cannot be calculated:
 *
 * - `size="s"`
 * - `size="m"`
 * - `size="l"`
 */
export const Indeterminate: Story = {
    render: () => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            <swc-progress-circle
                indeterminate
                size="s"
                label="Loading..."
            ></swc-progress-circle>
            <swc-progress-circle
                indeterminate
                size="m"
                label="Loading..."
            ></swc-progress-circle>
            <swc-progress-circle
                indeterminate
                size="l"
                label="Loading..."
            ></swc-progress-circle>
        </div>
    `,
    tags: ['states'],
};

/** When displaying over images or colored backgrounds, use the `static-color` attribute for better contrast, e.g. `static-color="white"` on a dark background or `static-color="black"` on a light background: */
// TODO: Add a story for each static color
export const StaticColors: Story = {
    render: () => html`
        <div
            style="background: linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67)); padding: 24px; display: inline-flex; gap: 24px; align-items: center;"
        >
            <swc-progress-circle
                .progress=${60}
                static-color="white"
                size="s"
                label="Loading on dark background"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${60}
                static-color="white"
                size="m"
                label="Loading on dark background"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${60}
                static-color="white"
                size="l"
                label="Loading on dark background"
            ></swc-progress-circle>
        </div>
        <div
            style="background: linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255)); padding: 24px; display: inline-flex; gap: 24px; align-items: center;"
        >
            <swc-progress-circle
                .progress=${60}
                static-color="black"
                size="s"
                label="Loading on dark background"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${60}
                static-color="black"
                size="m"
                label="Loading on dark background"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${60}
                static-color="black"
                size="l"
                label="Loading on dark background"
            ></swc-progress-circle>
        </div>
    `,
    tags: ['!dev', 'options'],
};

export const StaticWhite: Story = {
    render: (args) => template(args),
    args: {
        'static-color': 'white',
        progress: 60,
        label: 'Loading on dark background',
    },
    tags: ['usage'],
};

export const StaticBlack: Story = {
    render: (args) => template(args),
    args: {
        'static-color': 'black',
        progress: 60,
        label: 'Loading on dark background',
    },
    tags: ['usage'],
};

export const IndeterminateStaticWhite: Story = {
    render: (args) => template(args),
    args: {
        'static-color': 'white',
        indeterminate: true,
        label: 'Loading on dark background',
    },
    tags: ['usage'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
    render: () => html`
        <div>
            <p>
                This is coming from the accessibility story through the
                Accessibility block. This option allows us to fully customize
                the accessibility documentation for a component by writing a
                custom story that renders the accessibility documentation.
            </p>
        </div>
    `,
    tags: ['a11y'],
};

export const KeyboardNavigation: Story = {
    render: () => html`
        <div>
            <p>
                This is coming from the keyboard navigation story through the
                Accessibility block. This option allows us to fully customize
                allows us to fully customize the accessibility documentation for
                a component by writing a custom story that renders the
                accessibility documentation.
            </p>
        </div>
    `,
    tags: ['a11y'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const A11y: Story = {
    render: () => html`
        <div
            style="background: linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67)); padding: 24px; display: flex; gap: 24px; align-items: center;"
        >
            <swc-progress-circle
                .progress=${60}
                static-color="white"
                size="l"
                label="Loading on dark background"
            ></swc-progress-circle>
        </div>
    `,
    tags: ['!dev'],
};
