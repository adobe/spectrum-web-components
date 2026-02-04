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

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-asset');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: [undefined, ...Asset.VARIANTS],
};

// Add image-specific argTypes
// argTypes.src = {
//     control: { type: 'text' },
//     description: 'The image source URL. When provided, renders an <img> element directly.',
//     table: {
//         category: 'Image Properties',
//     },
// };

// argTypes.alt = {
//     control: { type: 'text' },
//     description: 'Alternative text for the image. Required for accessibility when using src.',
//     table: {
//         category: 'Image Properties',
//     },
// };

// argTypes.loading = {
//     control: { type: 'select' },
//     options: [undefined, 'lazy', 'eager'],
//     description: 'Loading behavior for the image.',
//     table: {
//         category: 'Image Properties',
//     },
// };

// argTypes['object-fit'] = {
//     control: { type: 'select' },
//     options: [undefined, 'contain', 'cover', 'fill', 'none', 'scale-down'],
//     description: 'How the image should be resized to fit its container.',
//     table: {
//         category: 'Image Properties',
//     },
// };

// argTypes['object-position'] = {
//     control: { type: 'text' },
//     description: 'Position of the image within its container when using object-fit.',
//     table: {
//         category: 'Image Properties',
//     },
// };

// argTypes.srcset = {
//     control: { type: 'text' },
//     description: 'Responsive image sources.',
//     table: {
//         category: 'Image Properties',
//     },
// };

// argTypes.sizes = {
//     control: { type: 'text' },
//     description: 'Sizes for responsive images.',
//     table: {
//         category: 'Image Properties',
//     },
// };

/**
 * An asset provides a visual representation of files, folders, or images in your application.
 *
 * The component supports three usage patterns:
 * - **Built-in variants**: Use `variant="file"` or `variant="folder"` for standard icons
 * - **Direct image rendering** (NEW): Use the `src` attribute for streamlined image display with modern features
 * - **Slot-based**: Provide custom content via the default slot (backwards compatible)
 *
 * The direct image rendering approach includes support for lazy loading, object-fit controls, responsive images (srcset/sizes),
 * and all standard HTML image attributes.
 */
const meta: Meta = {
    title: 'Asset',
    component: 'swc-asset',
    args,
    argTypes,
    actions: {
        handles: events,
    },
    parameters: {
        docs: {
            subtitle: `Visually represent files, folders, or images in your application`,
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
        label: 'Background',
        'default-slot': `<img src="https://picsum.photos/id/56/80/80/?blur=2" alt="preview of background" />`,
    },
    tags: ['autodocs', 'dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
    args: {
        label: 'Background',
        'default-slot': `<img src="https://picsum.photos/id/56/80/80/?blur=2" alt="preview of background" />`,
    },
    tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An asset consists of:
 *
 * 1. **Icon or image content** - Either a file/folder icon or custom slotted content
 * 2. **Accessible label** - Provides context for assistive technologies
 *
 * The asset automatically centers its content both horizontally and vertically within the available space.
 *
 * ### Content
 *
 * - **Default slot**: Custom content to display (typically an image) when variant is not set
 * - **Label**: Accessible label for screen readers (used as `aria-label` on the icon SVGs)
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, variant: 'file', label: 'README.md' })}
        ${template({ ...args, variant: 'folder', label: 'packages/swc/' })}
        ${template({
            ...args,
            ...args,
            src: 'https://picsum.photos/id/64/80/80',
            alt: 'Portrait photo',
        })}
    `,
    tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Assets support two built-in icon variants for representing files and folders:
 *
 * - **`file`**: Displays a file icon, useful for representing documents, files, or file types
 * - **`folder`**: Displays a folder icon, useful for representing directories or collections
 *
 * When no variant is specified, the asset displays custom content provided via the default slot (typically an image).
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
            src: 'https://picsum.photos/id/64/80/80',
            alt: 'Portrait photo',
        })}
    `,
    parameters: {
        'section-order': 1,
    },
    tags: ['options'],
};

/**
 * The asset component now supports direct image rendering via the `src` attribute, providing a more streamlined API
 * for displaying images without needing to manually slot an `<img>` element.
 *
 * - **Basic usage**: Simply provide `src` and `alt` attributes
 * - **Lazy loading**: Use `loading="lazy"` for performance optimization
 * - **Object-fit**: Control how images are sized with `object-fit` (contain, cover, fill, none, scale-down)
 * - **Responsive**: Support for `srcset` and `sizes` for responsive images
 *
 * This is a new feature that doesn't break existing slot-based usage.
 */
export const DirectImageRendering: Story = {
    render: (args) => html`
        ${template({
            ...args,
            src: 'https://picsum.photos/id/64/80/80',
            alt: 'Portrait photo',
        })}
        ${template({
            ...args,
            src: 'https://picsum.photos/id/237/80/80',
            alt: 'Dog photo',
            loading: 'lazy',
        })}
        ${template({
            ...args,
            src: 'https://picsum.photos/id/1015/120/80',
            alt: 'Landscape photo',
            'object-fit': 'cover',
        })}
        ${template({
            ...args,
            src: 'https://picsum.photos/id/1015/120/80',
            alt: 'Landscape photo',
            'object-fit': 'contain',
        })}
    `,
    parameters: {
        'section-order': 2,
    },
    tags: ['options'],
};

/**
 * When using the `src` attribute, you can control how the image fits within the asset container using the `object-fit` property:
 *
 * - **contain** (default): Scales image to fit while maintaining aspect ratio, may leave empty space
 * - **cover**: Scales image to fill container while maintaining aspect ratio, may crop image
 * - **fill**: Stretches image to fill container, may distort aspect ratio
 * - **none**: Image is not resized
 * - **scale-down**: Uses whichever is smaller: none or contain
 *
 * You can also use `object-position` to control where the image is positioned within the container.
 */
export const ObjectFit: Story = {
    render: (args) => html`
        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem;"
        >
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">
                    contain (default)
                </p>
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
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">none</p>
                ${template({
                    ...args,
                    src: 'https://picsum.photos/id/1015/200/300',
                    alt: 'Tall image',
                    'object-fit': 'none',
                })}
            </div>
            <div>
                <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">
                    scale-down
                </p>
                ${template({
                    ...args,
                    src: 'https://picsum.photos/id/1015/200/300',
                    alt: 'Tall image',
                    'object-fit': 'scale-down',
                })}
            </div>
        </div>
    `,
    parameters: {
        'section-order': 3,
        flexLayout: false,
    },
    tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-asset>` element implements several accessibility features:
 *
 * #### ARIA implementation
 *
 * - **Icon labeling**: File and folder SVG icons automatically use the `label` property as `aria-label`
 * - **Non-interactive**: Assets have no interactive behavior and are not focusable
 *
 * #### Visual accessibility
 *
 * - Icons use sufficient color contrast in both light and dark modes
 * - High contrast mode is supported with appropriate color overrides
 * - Content automatically centers for consistent layout and visual balance
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` attribute for file and folder variants
 * - Use specific, meaningful labels or alt text (e.g., "Project proposal PDF", "projects/2025/proposal.pdf", or not just "File")
 * - The `label` on the asset itself should describe the asset's purpose or context
 * - For decorative images, use an empty `alt=""` attribute on the img tag
 * - Test with screen readers to verify assets are announced appropriately in context
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
            label: 'User profile photo',
            'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="Profile photo of Maria Rodriguez, Senior Designer" />`,
        })}
    `,
    tags: ['a11y'],
};
