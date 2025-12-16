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

// since we cant't use HTML templates in a slot control,
// we need to use a select option and render a predefined HTML template based on the selected option
argTypes['default-slot'] = {
    ...argTypes['default-slot'],
    control: { type: 'text' },
};

/**
 * An asset visually represents a file, folder, or image in your application.
 * File and folder representations center themselves horizontally and vertically in the space provided.
 * Images are contained within the element, growing to the element's full height while centering within the width provided.
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
            subtitle: `Visually represent files, folders, or images in your application`,
        },
    },
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
 * ### Visual structure
 *
 * An asset consists of:
 *
 * 1. **Icon or image content** - Either a file/folder icon or custom slotted content
 * 2. **Accessible label** - Provides context for assistive technologies
 *
 * The asset automatically centers its content both horizontally and vertically within the available space.
 *
 * ### Technical structure
 *
 * #### Slots
 *
 * - **Default slot**: Custom content to display (typically an image) when variant is not set
 *
 * #### Properties
 *
 * Properties that control the asset's appearance:
 *
 * - **variant**: Controls which built-in icon to display (`file`, `folder`, or unset for custom content)
 * - **label**: Accessible label for screen readers (used as `aria-label` on the icon SVGs)
 *
 * All variations shown below for comparison.
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, variant: 'file', label: 'README.md' })}
        ${template({ ...args, variant: 'folder', label: 'packages/swc/' })}
        ${template({
            ...args,
            label: 'User avatar',
            'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="User avatar preview" />`,
        })}
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
 * Assets support two built-in icon variants for representing files and folders:
 *
 * - **file**: Displays a file icon, useful for representing documents, files, or file types
 * - **folder**: Displays a folder icon, useful for representing directories or collections
 *
 * When no variant is specified, the asset displays custom content provided via the default slot (typically an image).
 *
 * All variants shown below for comparison.
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
            label: 'User profile image',
            'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="User profile preview" />`,
        })}
    `,
    parameters: {
        flexLayout: true,
        'section-order': 1,
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
 * - **Semantic role**: SVG icons use `role="img"` to identify them as image content
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
 * - Use specific, meaningful labels (e.g., "Project proposal PDF" not just "File")
 * - When using images in the default slot, provide descriptive `alt` text on the `<img>` element
 * - The `label` on the asset itself should describe the asset's purpose or context
 * - For decorative images, use an empty `alt=""` attribute on the img tag
 * - Ensure images have sufficient contrast against their backgrounds
 * - Test with screen readers to verify assets are announced appropriately in context
 * - Consider the surrounding context - assets should be clearly associated with related content
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
    parameters: {
        flexLayout: true,
    },
    tags: ['a11y'],
};
