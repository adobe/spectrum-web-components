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

import { html, nothing, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import { Badge } from '@swc/components/badge';
import { FIXED_VALUES } from '@swc/components/badge';

import '@swc/components/badge';

/** @todo Pull this up into a utility function for all components to leverage */
function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/** @todo Pull this up into a decorator for all stories to leverage */
const CONTAINER = (content: TemplateResult<1>[]) =>
    html`<div
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

/**
 * Badges are for showing a small amount of color-categorized metadata. They're ideal for getting a user's attention. There are two additional styles - subtle fill and outline - in addition to the default, bold fill style.
 *
 * Because outline and subtle fill styles draw a similar level of attention, choose only one to use consistently within a single product. Bold fill can be paired with either style, and is reserved for high-attention badging only.
 */
const meta: Meta = {
    title: 'Components/Badge',
    component: 'swc-badge',
    argTypes: {
        size: {
            name: 'Size',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
        },
        variant: {
            name: 'Variant',
            control: { type: 'select' },
            options: Badge.BADGE_VARIANTS,
        },
        subtle: {
            name: 'Subtle',
            control: { type: 'boolean' },
        },
        outline: {
            name: 'Outline',
            control: { type: 'boolean' },
        },
        fixed: {
            name: 'Fixed',
            control: { type: 'select' },
            options: [...FIXED_VALUES],
        },
        label: {
            name: 'Label',
            control: { type: 'text' },
            table: { category: 'Slots' },
        },
        icon: {
            name: 'Icon',
            control: { type: 'text' },
            table: { category: 'Slots' },
        },
    },
    args: {
        label: 'Badge',
        // updating this to make the options more readable as a demo
        size: 'l',
        variant: 'informative',
        subtle: false,
        outline: false,
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2-%2F-Desktop?node-id=36806-6551',
        },
    },
    tags: ['migrated'],
};

export default meta;
type Story = StoryObj;
type StoryArgs = StoryObj['args'];

/**
 * @param args - The arguments for the badge as sourced from the storybook args.
 * @returns A lightweight template for to render a single badge with bindings to the args.
 * @todo could also surface a knob to select an icon from our icon library and use that instead of the string.
 * @todo is there stronger typing we can use for the args?
 */
const BASE_TEMPLATE = (args: StoryArgs = {}) => html`
    <swc-badge
        variant="${args.variant}"
        size="${args.size || 'm'}"
        .fixed=${args.fixed}
        .subtle=${args.subtle}
        .outline=${args.outline}
    >
        ${args.icon ? html`<span slot="icon">${args.icon}</span>` : nothing}
        ${args.label}
    </swc-badge>
`;

/**
 * Badges can contain label, icon, or label and icon. Text wrapping is also included when a `max-inline-size` is applied to the badge.
 */
export const Default: Story = {
    args: {
        size: 'm',
    },
    render: BASE_TEMPLATE,
};

/**
 * Badges can be rendered with or without an icon. Icons can be passed to the component using the `icon` slot and can be sourced from either the Spectrum icon library or a custom icon library as needed.
 */
export const WithIcon: Story = {
    args: {
        icon: '✓',
    },
    render: BASE_TEMPLATE,
    // Removes the story from the side navigation while keeping in the docs view
    tags: ['!dev'],
};

/**
 * Semantic variants allow you to render the badge with a descriptive name that maps to a design-system-aligned color. This is the preferred way to assign color to a badge because it will align more consistently with other components in your UI with the same meaning.
 */
export const SemanticVariants: Story = {
    render: (args) =>
        CONTAINER(
            Badge.BADGE_VARIANTS_SEMANTIC.map((variant) =>
                BASE_TEMPLATE({
                    ...args,
                    variant,
                    label: capitalize(variant),
                })
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
            options: Badge.BADGE_VARIANTS_SEMANTIC,
        },
    },
    render: (args) =>
        CONTAINER(
            Badge.BADGE_VARIANTS_SEMANTIC.map((variant) =>
                BASE_TEMPLATE({
                    ...args,
                    variant,
                    label: capitalize(variant),
                    outline: true,
                })
            )
        ),
    tags: ['!dev'],
};

/**
 * Color variants are available for the badge component and provide a more granular access to the full color palette in the design system.
 */
export const ColorVariants: Story = {
    render: (args) =>
        CONTAINER(
            Badge.BADGE_VARIANTS_COLOR.map((variant) =>
                BASE_TEMPLATE({
                    ...args,
                    variant,
                    label: capitalize(variant),
                })
            )
        ),
    tags: ['!dev'],
};

export const Sizes: Story = {
    render: (args) =>
        CONTAINER(
            ['s', 'm', 'l', 'xl'].map((size) =>
                BASE_TEMPLATE({
                    ...args,
                    size,
                    label: capitalize(size),
                })
            )
        ),
    tags: ['!dev'],
};

/**
 * The `subtle` style is available for all variants. It is useful when you want to reduce the visual prominence of the badge while still mapping to the design system color palette.
 */
export const Subtle: Story = {
    render: (args) =>
        CONTAINER(
            Badge.BADGE_VARIANTS.map((variant) =>
                BASE_TEMPLATE({
                    ...args,
                    variant,
                    label: capitalize(variant),
                    subtle: true,
                })
            )
        ),
    tags: ['!dev'],
};
