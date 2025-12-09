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

import '@adobe/swc/asset';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-asset');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: [undefined, 'file', 'folder'],
};

argTypes.label = {
    control: { type: 'text' },
};

argTypes.size = {
    control: { disable: true },
};

// since we cant't use HTML templates in a slot control,
// we need to use a select option and render a predefined HTML template based on the selected option
argTypes['default-slot'] = {
    ...argTypes['default-slot'],
    control: { type: 'text' },
};

/*
 * Use an `<sp-asset>` element to visually represent a file, folder or image in your application.
 * File and folder representations will center themselves horizontally and vertically in the space provided to the element.
 * Images will be contained to the element, growing to the element's full height while centering itself within the width provided.
 */
const meta: Meta = {
    title: 'Asset',
    component: 'swc-asset',
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

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

/*
 * Use an `<sp-asset>` element to visually represent a file, folder or image in your application.
 * File and folder representations will center themselves horizontally and vertically in the space provided to the element.
 * Images will be contained to the element, growing to the element's full height while centering itself within the width provided.
 */
export const Playground: Story = {
    // since we cant't use HTML templates in a slot control,
    // we need to use a select option and render a predefined HTML template based on the selected option
    render: (args) => template({ ...args }),
    args: {
        label: 'picture.png',
        variant: undefined,
        'default-slot': `<img src="https://picsum.photos/120/120" alt="Avatar" />`,
    },
    tags: ['autodocs', 'dev'],
};

// ─────────────────────
//    USAGE STORIES
// ─────────────────────
export const Anatomy: Story = {
    render: () =>
        html`<swc-asset label="Avatar"
            ><img src="https://picsum.photos/120/120" alt="Avatar"
        /></swc-asset>`,
    tags: ['autodocs', '!dev'],
};

export const File: Story = {
    args: {
        variant: 'file',
        label: 'README.md',
    },
    tags: ['!dev'],
};
export const Folder: Story = {
    args: {
        variant: 'folder',
        label: 'packages/swc/',
    },
    tags: ['!dev'],
};
