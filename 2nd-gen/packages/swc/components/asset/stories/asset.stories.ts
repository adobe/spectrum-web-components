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

// since we cant't use HTML templates in a slot control,
// we need to use a select option and render a predefined HTML template based on the selected option
argTypes['default-slot'] = {
    ...argTypes['default-slot'],
    control: { type: 'text' },
};

/**
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
        docs: {
            subtitle: `Assets visually represent a file, folder or image in your application.`,
        },
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    render: (args) => template(args),
    args: {
        label: 'Background',
        'default-slot': `<img src="https://picsum.photos/id/56/80/80/?blur=2" alt="preview of background" />`,
    },
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

const anatomyArgs = [
    {
        variant: 'file',
        label: 'packages/swc/',
    },
    {
        label: 'Avatar',
        'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="preview of the avatar" />`,
    },
];
/**
 * An asset is made up of the following parts:
 *
 * - A large file or folder icon based on the asset `variant`
 * - An accessible label for the asset
 * - Optional content to be displayed in the asset when an acceptable value for `variant` is not present
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${anatomyArgs.map((arg) => template({ ...args, ...arg }))}
    `,
    parameters: {
        flexLayout: true,
    },
    tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * When the `file` variant is added, a file icon displays instead of the slotted content.
 */
export const File: Story = {
    args: {
        variant: 'file',
        label: 'README.md',
    },
    tags: ['options'],
};

/**
 * When the `folder` variant is added, a folder icon displays instead of the slotted content.
 */
export const Folder: Story = {
    args: {
        variant: 'folder',
        label: 'packages/swc/',
    },
    tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

const accessibilityArgs = [
    {
        variant: 'folder',
        label: '/packages/swc/ folder',
    },
    {
        label: 'Sara Sawyer avatar',
        'default-slot': `<img src="https://picsum.photos/id/823/80/80" alt="preview of the user profile picture" />`,
    },
];
/**
 * ### Features
 *
 * The `<sp-asset>` element implements several accessibility features:
 *
 * 1. **Labeling**: Uses the `label` attribute value as `aria-label`
 *
 * ### Best Practices
 *
 * - Always provide a descriptive `label` that explains what the asset represents, unless the asset is purely decorative
 */
export const Accessibility: Story = {
    render: (args) => html`
        ${accessibilityArgs.map((arg) => template({ ...args, ...arg }))}
    `,
    parameters: {
        flexLayout: true,
    },
    tags: ['a11y'],
};
