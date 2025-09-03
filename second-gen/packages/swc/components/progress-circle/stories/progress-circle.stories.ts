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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import '@swc/components/progress-circle';

const meta: Meta = {
    title: 'Components/Progress Circle',
    component: 'swc-progress-circle',
    argTypes: {
        indeterminate: {
            control: { type: 'boolean' },
            description: 'Whether the progress is indeterminate.',
        },
        progress: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'Progress value from 0 to 100.',
        },
        size: {
            control: { type: 'select' },
            options: ['s', 'm', 'l'],
            description: 'Size of the progress circle.',
        },
        staticColor: {
            control: { type: 'select' },
            options: [undefined, 'white'],
            description: 'Static color variant.',
        },
        label: {
            control: { type: 'text' },
            description: 'Accessible label for the progress circle.',
        },
    },
    args: {
        progress: 50,
        size: 'm',
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        progress: 50,
        size: 'm',
        label: 'Loading progress',
    },
    render: (args) => html`
        <swc-progress-circle
            .progress=${args.progress}
            size="${args.size}"
            .label=${args.label}
            ?indeterminate=${args.indeterminate}
            static-color="${ifDefined(args.staticColor)}"
        ></swc-progress-circle>
    `,
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
};

export const StaticWhite: Story = {
    render: () => html`
        <div
            style="background: linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67)); padding: 24px; display: flex; gap: 24px; align-items: center;"
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
    `,
};

export const StaticBlack: Story = {
    render: () => html`
        <div
            style="background: linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255)); padding: 24px; display: flex; gap: 24px; align-items: center;"
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
};
