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

import { Asset } from '@adobe/swc/asset';

import '@adobe/swc/image';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-asset');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: [undefined, ...Asset.VARIANTS],
};

/**
 * An asset is a media wrapper. It displays either a built-in file or folder icon,
 * an error state, or slotted content (e.g. swc-image, video, iframe). Use the
 * default slot to wrap images (via swc-image), video, or other media.
 */
const meta: Meta = {
    title: 'Asset',
    component: 'swc-asset',
    args,
    argTypes,
    parameters: {
        actions: {
            handles: events,
        },
        docs: {
            subtitle: `Media wrapper for file/folder icons, error state, or slotted image, video, iframe`,
        },
        flexLayout: 'row-nowrap',
    },
    render: (args) => template(args),
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    args: {
        'default-slot': `<swc-image src="https://picsum.photos/id/56/80/80/?blur=2" alt="Preview of background"></swc-image>`,
    },
    tags: ['autodocs', 'dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
    args: {
        'default-slot': `<swc-image src="https://picsum.photos/id/56/80/80/?blur=2" alt="Preview of background"></swc-image>`,
    },
    tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An asset consists of:
 *
 * 1. **File/folder icon** – When `variant="file"` or `variant="folder"`
 * 2. **Error state** – When `error` is set (icon + optional label text)
 * 3. **Slotted media** – When no variant: image (e.g. swc-image), video, or iframe
 *
 * The asset centers its content. Use the default slot for swc-image, video, or iframe.
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, variant: 'file', label: 'README.md' })}
        ${template({ ...args, variant: 'folder', label: 'packages/swc/' })}
        ${template({
            ...args,
            'default-slot': `<swc-image src="https://picsum.photos/id/64/80/80" alt="Portrait"></swc-image>`,
        })}
    `,
    tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Use `variant="file"` or `variant="folder"` for built-in icons. Omit variant
 * and put content in the default slot to use the asset as a media wrapper.
 */
export const Variants: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'file',
            label: 'README.md',
        })}
        ${template({
            ...args,
            variant: 'folder',
            label: 'packages/swc/',
        })}
        ${template({
            ...args,
            'default-slot': `<swc-image src="https://picsum.photos/id/64/80/80" alt="Portrait photo"></swc-image>`,
        })}
    `,
    parameters: { 'section-order': 1 },
    tags: ['options'],
};

/**
 * Use the default slot to wrap different media types. For images, use swc-image.
 * For video or iframe, slot the native element. Slotted content is sized to fit the container.
 */
export const MediaWrapper: Story = {
    render: (args) => html`
        ${template({
            ...args,
            'default-slot': `<swc-image src="https://picsum.photos/id/64/80/80" alt="Portrait"></swc-image>`,
        })}
        ${template({
            ...args,
            'default-slot': `<swc-image src="https://picsum.photos/id/56/80/80/?blur=2" alt="Background preview"></swc-image>`,
        })}
        ${template({
            ...args,
            'default-slot': `<video style="max-inline-size:100%;max-block-size:100%;object-fit:contain;" src="https://www.w3schools.com/html/mov_bbb.mp4" muted playsinline aria-label="Sample video"></video>`,
        })}
    `,
    parameters: { 'section-order': 2 },
    tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * When `error` is set, the asset shows an error icon and optional label text.
 * Use for failed or unavailable media.
 */
export const Error: Story = {
    args: {
        error: true,
        label: 'Failed to load',
    },
    tags: ['states'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * - **Icon labeling**: File, folder, and error SVGs use `label` as `aria-label`
 * - **Slotted media**: Provide accessible content (e.g. swc-image with `alt`, video with captions/aria-label)
 *
 * ### Best practices
 *
 * - Use a descriptive `label` for file, folder, and error variants
 * - When wrapping an image, use swc-image with a meaningful `alt`
 */
export const Accessibility: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'file',
            label: 'Project proposal document',
        })}
        ${template({
            ...args,
            variant: 'folder',
            label: 'Design assets directory',
        })}
        ${template({
            ...args,
            'default-slot': `<swc-image src="https://picsum.photos/id/64/80/80" alt="Profile photo of Maria Rodriguez, Senior Designer"></swc-image>`,
        })}
    `,
    tags: ['a11y'],
};
