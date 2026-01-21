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

import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Badge } from '@adobe/swc/badge';

import '@adobe/swc/badge';

import {
    testBadgeDefaults,
    testDefaultSlotContent,
    testFixedProperty,
    testFixedPropertySetViaAttribute,
    testIconSlot,
    testOutlinePropertyReflection,
    testOutlinePropertySetViaAttribute,
    testSizeProperty,
    testSizePropertySetViaAttribute,
    testSubtlePropertyReflection,
    testSubtlePropertySetViaAttribute,
    testVariantPropertyReflection,
} from '../test/badge.test.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-badge');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: Badge.VARIANTS,
};

argTypes.fixed = {
    ...argTypes.fixed,
    control: { type: 'select' },
    options: [undefined, ...Badge.FIXED_VALUES],
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Badge.VALID_SIZES,
};

args['default-slot'] = 'Badge';

/**
 * Badges are for showing a small amount of color-categorized metadata. They're ideal for getting a user's attention. There are two additional styles - subtle fill and outline - in addition to the default, bold fill style.
 *
 * Because outline and subtle fill styles draw a similar level of attention, choose only one to use consistently within a single product. Bold fill can be paired with either style, and is reserved for high-attention badging only.
 */
const meta: Meta = {
    title: 'Badge',
    component: 'swc-badge',
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

// ───────────────
//    STORIES
// ───────────────

type BadgeVariant = typeof Badge.prototype.variant;

/**
 * Badges can contain label, icon, or label and icon. Text wrapping is also included when a `max-inline-size` is applied to the badge.
 */
export const Default: Story = {
    args: {
        size: 'm',
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testBadgeDefaults(badge);
        await testDefaultSlotContent(badge);
    },
};

/**
 * Badges can be rendered with or without an icon. Icons can be passed to the component using the `icon` slot and can be sourced from either the Spectrum icon library or a custom icon library as needed.
 */
export const WithIcon: Story = {
    args: {
        ['icon-slot']: '✓',
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testIconSlot(badge);
    },
    tags: ['!dev'],
};

/**
 * Semantic variants allow you to render the badge with a descriptive name that maps to a design-system-aligned color. This is the preferred way to assign color to a badge because it will align more consistently with other components in your UI with the same meaning.
 */
export const SemanticVariants: Story = {
    args: {
        variant: 'positive',
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testVariantPropertyReflection(badge);
    },
    tags: ['!dev'],
};

/**
 * The `outline` style is only valid for semantic color variants.
 */
export const Outline: Story = {
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Badge.VARIANTS_SEMANTIC,
        },
    },
    args: {
        outline: true,
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testOutlinePropertyReflection(badge);
        await testOutlinePropertySetViaAttribute(badge);
    },
    tags: ['!dev'],
};

/**
 * Color variants are available for the badge component and provide a more granular access to the full color palette in the design system.
 */
export const ColorVariants: Story = {
    render: () =>
        CONTAINER(
            Badge.VARIANTS_COLOR.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant}
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
    tags: ['!dev'],
};

export const Sizes: Story = {
    args: {
        size: 'l',
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testSizeProperty(badge);
        await testSizePropertySetViaAttribute(badge);
    },
    tags: ['!dev'],
};

/**
 * The `subtle` style is available for all variants. It is useful when you want to reduce the visual prominence of the badge while still mapping to the design system color palette.
 */
export const Subtle: Story = {
    args: {
        subtle: true,
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testSubtlePropertyReflection(badge);
        await testSubtlePropertySetViaAttribute(badge);
    },
    tags: ['!dev'],
};

/**
 * Badge can be positioned in a fixed location relative to its parent container using the `fixed` property.
 */
export const Fixed: Story = {
    args: {
        fixed: 'inline-start',
    },
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;

        await testFixedProperty(badge);
        await testFixedPropertySetViaAttribute(badge);
    },
    tags: ['!dev'],
};

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────

/* @todo Pull this up into a utility function for all components to leverage */
function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* @todo Pull this up into a decorator for all stories to leverage */
function CONTAINER(content: TemplateResult<1>[]): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'flex',
            gap: 'var(--spectrum-spacing-200)',
            'flex-wrap': 'wrap',
            'justify-content': 'center',
            // Used 80ch because that's generally considered the maximum readable width for text in a web page.
            'max-inline-size': '80ch',
        })}
    >
        ${content}
    </div>`;
}
