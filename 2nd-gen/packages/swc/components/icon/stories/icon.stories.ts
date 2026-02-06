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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/swc/icon';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-icon');

/**
 * The `<swc-icon>` element renders a single icon from either an external image source or slotted SVG markup.
 * Use it to display decorative or informative icons alongside text, buttons, and other UI elements.
 */
const meta: Meta = {
    title: 'Icon',
    component: 'swc-icon',
    args,
    argTypes,
    render: (args) => template(args),
    parameters: {
        docs: { subtitle: `Render icons from an image URL or slotted SVG.` },
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const iconSvg = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
            d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
    </svg>
`;
const iconSrc =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path d='M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z'/></svg>";

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    tags: ['autodocs', 'dev'],
    render: (args) => html`
        <swc-icon label=${ifDefined(args.label)} src=${ifDefined(args.src)}>
            ${args.src ? '' : iconSvg}
        </swc-icon>
    `,
    args: {
        label: 'Search',
    },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
    tags: ['overview'],
    render: (args) => html`
        <swc-icon label=${ifDefined(args.label)} src=${ifDefined(args.src)}>
            ${args.src ? '' : iconSvg}
        </swc-icon>
    `,
    args: {
        label: 'Search',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An icon consists of:
 *
 * 1. **Rendered graphic** - Either a slotted SVG or an image element
 *
 * ### Content
 *
 * - Default slot: Provide SVG markup to render.
 */
export const Anatomy: Story = {
    render: (args) => html`
        <swc-icon label="Inline SVG">${iconSvg}</swc-icon>
        ${template({ ...args, src: iconSrc, label: 'Image source' })}
    `,
    tags: ['anatomy'],
    parameters: {
        flexLayout: true,
    },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Icons can render from either slotted SVG markup or an image URL.
 *
 * Use the default slot for SVG markup you control, and `src` for external assets.
 */
export const Sources: Story = {
    render: (args) => html`
        <swc-icon label="Inline SVG">${iconSvg}</swc-icon>
        ${template({ ...args, src: iconSrc, label: 'Image source' })}
    `,
    tags: ['options'],
    parameters: {
        flexLayout: true,
    },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-icon>` element implements several accessibility features:
 *
 * #### SVG labeling
 *
 * - Slotted SVGs receive `role="img"` and use `aria-label` when `label` is provided
 * - When no label is provided, slotted SVGs are marked `aria-hidden="true"`
 *
 * #### Image labeling
 *
 * - Images use the `label` value as the `alt` text
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` for informative icons
 * - Use empty labels only for purely decorative icons
 * - Keep labels short and specific (e.g., "Search" instead of "Icon")
 */
export const Accessibility: Story = {
    render: (args) => html`
        <swc-icon label="Search">${iconSvg}</swc-icon>
        ${template({ ...args, src: iconSrc, label: 'Search' })}
    `,
    tags: ['a11y'],
    parameters: {
        flexLayout: true,
    },
};
