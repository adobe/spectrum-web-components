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
 * render failure, so disabling for now.
 */
// argTypes.progress = {
//     ...argTypes.progress,
//     control: { type: 'range', min: 0, max: 100, step: 1 },
// };

/*
 * @todo This is properly configuring the Select, but the control doesn't
 * seem to work; need to investigate.
 */
// argTypes.size = {
//     ...argTypes.size,
//     control: { type: 'select' },
//     options: ProgressCircle.VALID_SIZES,
// };

argTypes['static-color'] = {
    ...argTypes['static-color'],
    control: { type: 'select' },
    options: [undefined, ...ProgressCircle.STATIC_COLORS],
};

/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 */
const meta: Meta = {
    title: 'Progress circle',
    component: 'swc-progress-circle',
    args,
    argTypes,
    render: (args) => template(args),
    parameters: {
        actions: {
            handles: events,
        },
    },
    tags: ['migrated'],
};

export default meta;

// ───────────────
//    STORIES
// ───────────────

export const Default: Story = {
    name: 'Playground',
    args: {
        progress: 50,
        size: 'm',
        label: 'Loading progress',
    },
    render: (args) => template(args),
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            <swc-progress-circle
                .progress=${25}
                size="s"
                label="Small progress"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${25}
                size="m"
                label="Medium progress"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${25}
                size="l"
                label="Large progress"
            ></swc-progress-circle>
        </div>
    `,
    tags: ['!dev'],
};

export const ProgressValues: Story = {
    render: () => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            <swc-progress-circle
                .progress=${25}
                label="25% complete"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${50}
                label="50% complete"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${75}
                label="75% complete"
            ></swc-progress-circle>
            <swc-progress-circle
                .progress=${100}
                label="Complete"
            ></swc-progress-circle>
        </div>
    `,
    tags: ['!dev'],
};

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
    tags: ['!dev'],
};

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
    tags: ['!dev'],
};

export const IndeterminateStaticWhite: Story = {
    render: () => html`
        <div
            style="background-color: rgba(0,0,0,0.4); padding: 24px; display: flex; gap: 24px; align-items: center;"
        >
            <swc-progress-circle
                indeterminate
                static-color="white"
                size="s"
                label="Loading on dark background"
            ></swc-progress-circle>
            <swc-progress-circle
                indeterminate
                static-color="white"
                size="m"
                label="Loading on dark background"
            ></swc-progress-circle>
            <swc-progress-circle
                indeterminate
                static-color="white"
                size="l"
                label="Loading on dark background"
            ></swc-progress-circle>
        </div>
    `,
    tags: ['!dev'],
};

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
