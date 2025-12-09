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
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Badge } from '@adobe/swc/badge';
import { capitalize } from '@spectrum-web-components/core/shared/utilities';

import '@adobe/swc/badge';

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
 * Badges are for showing a small amount of color-categorized metadata. They're ideal for getting a user's attention.
 *
 * There are two additional styles - subtle fill and outline - in addition to the default, bold fill style.
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
        docs: {
            subtitle: `Badges are for showing a small amount of color-categorized metadata. They're ideal for getting a user's attention.`,
        },
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

type BadgeVariant = typeof Badge.prototype.variant;
type BadgeSize = typeof Badge.prototype.size;
type FixedValues = typeof Badge.prototype.fixed;

export const Playground: Story = {
    args: {
        size: 'm',
    },
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A badge is made up of the following parts:
 *
 * - Text can be displayed within the badge by using the default slot
 * - An optional icon element can be used to display an icon within the badge
 *
 * Badges can contain either a label, an icon, or both.
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, 'default-slot': 'Label only' })}
        ${template({ ...args, 'icon-slot': '✓', 'default-slot': '' })}
        ${template({
            ...args,
            'icon-slot': '✓',
            'default-slot': 'Icon and label',
        })}
    `,
    tags: ['anatomy'],
    args: {
        size: 'm',
    },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Badges come in four sizes to fit various contexts:
 */
export const Sizes: Story = {
    render: () =>
        CONTAINER(
            Badge.VALID_SIZES.map(
                (size) => html`
                    <swc-badge size=${size as BadgeSize}
                        >${capitalize(size)}</swc-badge
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * Semantic variants allow you to render the badge with a descriptive name that maps to a design-system-aligned color. This is the preferred way to assign color to a badge because it will align more consistently with other components in your UI with the same meaning.
 *
 * Use these variants for the following statuses:
 * - **Positive**: approved, complete, success, new, purchased, licensed
 * - **Informative**: active, in use, live, published
 * - **Negative**: error, alert, rejected, failed
 * - **Neutral**: archived, deleted, paused, draft, not started, ended
 */
export const SemanticVariants: Story = {
    render: () =>
        CONTAINER(
            Badge.VARIANTS_SEMANTIC.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant}
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * When badges are for color-coded categories, they use non-semantic colors. Non-semantic variants are ideally used for when there are 8 categories or less.
 */
export const NonsemanticVariants: Story = {
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
    tags: ['options'],
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
        CONTAINER(
            Badge.VARIANTS_SEMANTIC.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant} outline
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * The `subtle` style is available for all variants. It is useful when you want to reduce the visual prominence of the badge while still mapping to the design system color palette.
 */
export const Subtle: Story = {
    render: () =>
        CONTAINER(
            Badge.VARIANTS.map(
                (variant) => html`
                    <swc-badge variant=${variant as BadgeVariant} subtle
                        >${capitalize(variant)}</swc-badge
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * Badge can be displayed as if it is "fixed" to the edge of a UI. The `fixed` attribute can be leveraged to alter the border rounding based on the position you would like to achieve. Fixed positioning options include `block-start`, `block-end`, `inline-start`, and `inline-end`.
 */
export const Fixed: Story = {
    render: () =>
        CONTAINER(
            Badge.FIXED_VALUES.map(
                (fixed) => html`
                    <swc-badge fixed=${ifDefined(fixed as FixedValues)}
                        >${capitalize(fixed)}</swc-badge
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * When a badge's label is too long for the available horizontal space, it wraps to form another line. Text wrapping can be enforced when a `max-inline-size` is applied to the badge.
 */
export const Textwrapping: Story = {
    render: () => html`
        <swc-badge style="max-inline-size: 100px">
            This is a very long badge label that wraps when it reaches its max
            inline size
        </swc-badge>
    `,
    tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<sp-badge>` element implements several accessibility features:
 *
 * 1. **Color Meaning**: Colors are used in combination with text labels to ensure that status information is not conveyed through color alone
 *
 * ### Best Practices
 *
 * - Use semantic variants (`positive`, `negative`, `notice`, `informative`, `neutral`) when the status has specific meaning
 * - Include a clear, descriptive text label that explains the status
 * - Ensure sufficient color contrast between the badge and its background
 * - Avoid using badges for interactive elements; consider using buttons, tags, or links instead
 */
export const Accessibility: Story = {
    render: () => html`
        <swc-badge variant="positive">approved</swc-badge>
        <swc-badge variant="negative">rejected</swc-badge>
        <swc-badge variant="notice">needs approval</swc-badge>
        <swc-badge variant="informative">new feature</swc-badge>
        <swc-badge variant="neutral">version 1.2.10</swc-badge>
        <swc-badge variant="celery">available</swc-badge>
        <swc-badge variant="yellow">busy</swc-badge>
        <swc-badge variant="silver">out of office</swc-badge>
    `,
    tags: ['a11y'],
};

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────

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
