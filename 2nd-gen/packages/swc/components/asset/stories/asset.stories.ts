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

import { Asset } from '@adobe/swc/asset';

import '@adobe/swc/asset';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-asset');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: [undefined, ...Asset.VARIANTS],
};

const meta: Meta = {
    title: 'Asset',
    component: 'swc-asset',
    args,
    argTypes,
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

args['default-slot'] = IMAGE_PLACEHOLDER_STRING();

export const Default: Story = {
    render: (args) => template(args),
};

export const File: Story = {
    args: {
        variant: 'file',
    },
    render: (args) =>
        html`<swc-asset
            style="min-inline-size: 150px; block-size: 128px"
            variant=${args.variant as 'file'}
        ></swc-asset>`,
    tags: ['!dev'],
};

export const Folder: Story = {
    args: {
        variant: 'folder',
    },
    render: (args) =>
        html`<swc-asset
            style="min-inline-size: 150px; block-size: 128px"
            variant=${args.variant as 'folder'}
        ></swc-asset>`,
    tags: ['!dev'],
};

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────

function IMAGE_PLACEHOLDER_STRING(): string {
    return `<img class="spectrum-Asset-image" alt="Example image" src="https://cdn2.thecatapi.com/images/d4i.jpg" height="128">`;
}
