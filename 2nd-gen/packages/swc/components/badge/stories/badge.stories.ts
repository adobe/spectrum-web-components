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

import { Badge } from '@adobe/swc/badge';

import '@adobe/swc/badge';

import {
    capitalize,
    Container,
    VRT,
} from '../../../.storybook/decorators/utilities.js';

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
type BadgeSize = typeof Badge.prototype.size;

/**
 * Badges can contain label, icon, or label and icon. Text wrapping is also included when a `max-inline-size` is applied to the badge.
 */
export const Default: Story = {
    args: {
        size: 'm',
    },
    tags: ['!dev'],
};

/**
 * Badges can be rendered with or without an icon. Icons can be passed to the component using the `icon` slot and can be sourced from either the Spectrum icon library or a custom icon library as needed.
 */
export const WithIcon: Story = {
    args: {
        ['icon-slot']: '✓',
    },
    // Removes the story from the side navigation while keeping in the docs view
    tags: ['!dev'],
};

/**
 * Semantic variants allow you to render the badge with a descriptive name that maps to a design-system-aligned color. This is the preferred way to assign color to a badge because it will align more consistently with other components in your UI with the same meaning.
 */
export const SemanticVariants: Story = {
    render: () =>
        Container(
            Badge.VARIANTS_SEMANTIC.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant}
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
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
    render: () =>
        Container(
            Badge.VARIANTS_SEMANTIC.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant} outline
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
    tags: ['!dev'],
};

/**
 * Color variants are available for the badge component and provide a more granular access to the full color palette in the design system.
 */
export const ColorVariants: Story = {
    render: () =>
        Container(
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
    render: () =>
        Container(
            Badge.VALID_SIZES.map(
                (size) => html`
                    <swc-badge size=${size as BadgeSize}
                        >${capitalize(size)}</swc-badge
                    >
                `
            )
        ),
    tags: ['!dev'],
};

/**
 * The `subtle` style is available for all variants. It is useful when you want to reduce the visual prominence of the badge while still mapping to the design system color palette.
 */
export const Subtle: Story = {
    render: () =>
        Container(
            Badge.VARIANTS.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant} subtle
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
    tags: ['!dev'],
};

/**
 * VRT story for visual regression testing.
 * Displays semantic variants with different slot content configurations
 * in light/medium/LTR and dark/large/RTL.
 */
export const VisualRegressionTest: Story = {
    render: () =>
        VRT([
            // Default style - semantic variants with icon variations
            {
                Template: (permArgs) => template({ ...args, ...permArgs }),
                permutations: [
                    {
                        variant: Badge.VARIANTS,
                        'default-slot': ['Badge'],
                        'icon-slot': ['', '✓'],
                    },
                    {
                        variant: Badge.VARIANTS,
                        'default-slot': [''],
                        'icon-slot': ['✓'],
                    },
                    {
                        variant: Badge.VARIANTS,
                        subtle: [true],
                    },
                    {
                        variant: Badge.VARIANTS_SEMANTIC,
                        outline: [true],
                    },
                    {
                        variant: ['informative'],
                        'default-slot': ['Badge'],
                        fixed: [
                            'inline-start',
                            'inline-end',
                            'block-start',
                            'block-end',
                        ],
                    },
                ],
            },
            {
                Template: (permArgs) =>
                    template({
                        ...args,
                        ...permArgs,
                        style: 'max-inline-size: 120px',
                    }),
                permutations: [
                    {
                        variant: ['neutral'],
                        'default-slot': ['Very long label that should wrap'],
                        'icon-slot': ['', '✓'],
                    },
                ],
            },
        ]),
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['!autodocs'],
};
