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

import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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

argTypes['aspect-ratio'] = {
    control: { type: 'select' },
    options: [undefined, '1', '16/9', '4/3', '9/16', '3/4'],
    description:
        'CSS aspect-ratio for the container (e.g. "1", "16/9", "4/3"). Keeps the wrapper shape consistent.',
    table: {
        category: 'Layout',
    },
};

argTypes.rounded = {
    control: { type: 'boolean' },
    description:
        'When true, applies rounded corners to the asset container and clips slotted content.',
    table: {
        category: 'Layout',
    },
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
        styles: { inlineSize: '320px' },
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
        'aspect-ratio': '1',
        'default-slot': `<swc-image src="https://picsum.photos/id/1015/400/400" alt="Landscape"></swc-image>`,
    },
    render: (args) => html`
        <swc-asset
            .aspectRatio=${args['aspect-ratio'] ?? undefined}
            .label=${args.label ?? ''}
            .variant=${args.variant}
            .error=${args.error ?? false}
            .rounded=${args.rounded ?? false}
        >
            ${args['default-slot'] ? unsafeHTML(args['default-slot']) : nothing}
        </swc-asset>
    `,
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
 * Optional `aspect-ratio` keeps the container shape consistent (e.g. "1", "16/9"). The asset centers its content.
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
            'default-slot': `<video src="https://www.w3schools.com/html/mov_bbb.mp4" muted playsinline aria-label="Sample video"></video>`,
        })}
    `,
    parameters: { 'section-order': 2 },
    tags: ['options'],
};

/**
 * Use the `aspect-ratio` attribute so the asset container keeps a consistent shape.
 * Any valid CSS aspect-ratio value works (e.g. "1" for square, "16/9", "4/3").
 * Useful for grids and cards where thumbnails should share the same ratio.
 */
export const AspectRatio: Story = {
    render: () => html`
        <div
            style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;"
        >
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">
                    1:1 (square)
                </p>
                <swc-asset style="inline-size: 120px;" aspect-ratio="1">
                    <swc-image
                        src="https://picsum.photos/id/64/120/120"
                        alt="Portrait"
                    ></swc-image>
                </swc-asset>
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">16:9</p>
                <swc-asset style="inline-size: 160px;" aspect-ratio="16/9">
                    <swc-image
                        src="https://picsum.photos/id/1015/320/180"
                        alt="Landscape"
                    ></swc-image>
                </swc-asset>
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">4:3</p>
                <swc-asset style="inline-size: 120px;" aspect-ratio="4/3">
                    <swc-image
                        src="https://picsum.photos/id/1015/160/120"
                        alt="Landscape"
                    ></swc-image>
                </swc-asset>
            </div>
        </div>
    `,
    parameters: { 'section-order': 3, flexLayout: false },
    tags: ['options'],
};

/**
 * Use the `rounded` attribute to apply rounded corners to the asset container.
 * Slotted content is clipped to the rounded shape. Useful for thumbnails and cards.
 */
export const Rounded: Story = {
    render: () => html`
        <div
            style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;"
        >
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Default</p>
                <swc-asset style="inline-size: 120px;" aspect-ratio="1">
                    <swc-image
                        src="https://picsum.photos/id/64/120/120"
                        alt="Portrait"
                    ></swc-image>
                </swc-asset>
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Rounded</p>
                <swc-asset style="inline-size: 120px;" aspect-ratio="1" rounded>
                    <swc-image
                        src="https://picsum.photos/id/64/120/120"
                        alt="Portrait"
                    ></swc-image>
                </swc-asset>
            </div>
        </div>
    `,
    parameters: { 'section-order': 4, flexLayout: false },
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
