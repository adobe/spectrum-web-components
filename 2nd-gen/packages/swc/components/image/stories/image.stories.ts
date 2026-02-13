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

import '@adobe/swc/image';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-image');

argTypes['object-fit'] = {
    control: { type: 'select' },
    options: [undefined, 'contain', 'cover', 'fill', 'none', 'scale-down'],
    description: 'How the image fits within the container.',
    table: {
        category: 'Image',
    },
};

/**
 * An image component is a container for an image. It provides a consistent wrapper and
 * exposes the inner image via the `image` part and `.spectrum-Image-image` class so you
 * can customize width, height, border-radius, and other styles from outside.
 */
const meta: Meta = {
    title: 'Image',
    component: 'swc-image',
    args,
    argTypes,
    parameters: {
        actions: {
            handles: events,
        },
        docs: {
            subtitle: `Container for images with styleable inner image`,
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
        src: 'https://picsum.photos/id/64/80/80',
        alt: 'Portrait photo',
    },
    tags: ['autodocs', 'dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
    args: {
        src: 'https://picsum.photos/id/64/80/80',
        alt: 'Portrait photo',
    },
    tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An image consists of:
 *
 * 1. **Container** (`.spectrum-Image`) – Flex wrapper that centers the image
 * 2. **Image** (`.spectrum-Image-image`, `part="image"`) – The inner `<img>`.
 *    Style this for width, height, border-radius, etc.
 *
 * ### Styling the inner image
 *
 * Use the `image` part or the `.spectrum-Image-image` class from your CSS:
 *
 * ```css
 * swc-image::part(image) { width: 80px; height: 80px; border-radius: 8px; }
 * ```
 */
export const Anatomy: Story = {
    render: (args) =>
        template({
            ...args,
            src: 'https://picsum.photos/id/64/80/80',
            alt: 'Portrait',
        }),
    tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Control how the image fits inside the container with `object-fit` and `object-position`.
 */
export const ObjectFit: Story = {
    render: (args) => html`
        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem;"
        >
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">contain</p>
                ${template({
                    ...args,
                    src: 'https://picsum.photos/id/1015/200/300',
                    alt: 'Tall image',
                    'object-fit': 'contain',
                })}
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">cover</p>
                ${template({
                    ...args,
                    src: 'https://picsum.photos/id/1015/200/300',
                    alt: 'Tall image',
                    'object-fit': 'cover',
                })}
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">fill</p>
                ${template({
                    ...args,
                    src: 'https://picsum.photos/id/1015/200/300',
                    alt: 'Tall image',
                    'object-fit': 'fill',
                })}
            </div>
        </div>
    `,
    parameters: { 'section-order': 1, flexLayout: false },
    tags: ['options'],
};

/**
 * Style the inner image with the `image` part (e.g. width, height, border-radius).
 * This mirrors how engineers use `.spectrum-Asset-image` with sp-asset.
 */
export const StylingTheImage: Story = {
    render: () => html`
        <div
            style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-end;"
        >
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Default</p>
                <swc-image
                    style="block-size: 80px; inline-size: 80px;"
                    src="https://picsum.photos/id/64/80/80"
                    alt="Avatar"
                ></swc-image>
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Rounded</p>
                <swc-image
                    style="block-size: 80px; inline-size: 80px;"
                    src="https://picsum.photos/id/64/80/80"
                    alt="Avatar"
                    class="image-rounded"
                ></swc-image>
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Circle</p>
                <swc-image
                    style="block-size: 80px; inline-size: 80px;"
                    src="https://picsum.photos/id/64/80/80"
                    alt="Avatar"
                    class="image-circle"
                ></swc-image>
            </div>
        </div>
        <style>
            .image-rounded::part(image) {
                border-radius: 8px;
            }
            .image-circle::part(image) {
                border-radius: 50%;
            }
        </style>
    `,
    parameters: { 'section-order': 3, flexLayout: false },
    tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * - **Labeling**: Provide an `alt` attribute for the image.
 *
 * ### Best practices
 *
 * - Always set `alt` when using `src` (meaningful description, or empty string for decorative images).
 * - Use the `image` part for visual styling only; do not rely on color alone for meaning.
 */
export const Accessibility: Story = {
    render: (args) => html`
        ${template({
            ...args,
            src: 'https://picsum.photos/id/64/80/80',
            alt: 'Profile photo of Maria Rodriguez, Senior Designer',
        })}
    `,
    tags: ['a11y'],
};
