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

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-badge');

const parameters = {
    flexLayout: true,
    styles: {
        gap: 'var(--spectrum-spacing-200)',
        'flex-wrap': 'wrap',
        'justify-content': 'center',
        'max-inline-size': '80ch',
    },
};

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: Badge.VARIANTS,
    defaultValue: 'informative',
};

argTypes.fixed = {
    ...argTypes.fixed,
    control: { type: 'select' },
    options: ['', ...Badge.FIXED_VALUES],
    defaultValue: '',
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Badge.VALID_SIZES,
    defaultValue: 'm',
};

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

export const Playground: Story = {
    render: (args) => template(args),
    args: {
        size: 'm',
        'default-slot': 'New',
    },
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

const anatomyArgs = [
    {
        'default-slot': 'Label only',
    },
    {
        'icon-slot': '✓',
    },
    {
        'icon-slot': '✓',
        'default-slot': 'Icon and label',
    },
];
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
        ${anatomyArgs.map((anatomyArg) => template({ ...args, ...anatomyArg }))}
    `,
    parameters: parameters,
    tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Badges come in four sizes to fit various contexts:
 *
 * - **Small (s)**: Compact spaces, inline with text
 * - **Medium (m)**: Default size, most common usage
 * - **Large (l)**: Increased emphasis
 * - **Extra-large (xl)**: Maximum visibility
 */
export const Sizes: Story = {
    render: (args) => html`
        ${template({ ...args, size: 's', 'default-slot': 'Small' })}
        ${template({ ...args, size: 'm', 'default-slot': 'Medium' })}
        ${template({ ...args, size: 'l', 'default-slot': 'Large' })}
        ${template({ ...args, size: 'xl', 'default-slot': 'Extra-large' })}
    `,
    parameters: { ...parameters, 'section-order': 0 },
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
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            'default-slot': 'Approved',
        })}
        ${template({
            ...args,
            variant: 'informative',
            'default-slot': 'Published',
        })}
        ${template({
            ...args,
            variant: 'negative',
            'default-slot': 'Rejected',
        })}
        ${template({ ...args, variant: 'notice', 'default-slot': 'Pending' })}
        ${template({ ...args, variant: 'neutral', 'default-slot': 'Archived' })}
    `,
    parameters: { ...parameters, 'section-order': 1 },
    tags: ['options'],
};

/**
 * When badges are for color-coded categories, they use non-semantic colors. Non-semantic variants are ideally used for when there are 8 categories or less.
 */
export const NonSemanticVariants: Story = {
    render: (args) => html`
        ${template({ ...args, variant: 'seafoam', 'default-slot': 'Design' })}
        ${template({
            ...args,
            variant: 'indigo',
            'default-slot': 'Engineering',
        })}
        ${template({ ...args, variant: 'purple', 'default-slot': 'Marketing' })}
        ${template({ ...args, variant: 'fuchsia', 'default-slot': 'Sales' })}
        ${template({ ...args, variant: 'magenta', 'default-slot': 'Support' })}
        ${template({ ...args, variant: 'yellow', 'default-slot': 'Finance' })}
        ${template({
            ...args,
            variant: 'chartreuse',
            'default-slot': 'Operations',
        })}
        ${template({ ...args, variant: 'celery', 'default-slot': 'HR' })}
        ${template({ ...args, variant: 'cyan', 'default-slot': 'Legal' })}
    `,
    parameters: { ...parameters, 'section-order': 2 },
    tags: ['options'],
};
NonSemanticVariants.storyName = 'Non-semantic variants';

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
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            outline: true,
            'default-slot': 'Approved',
        })}
        ${template({
            ...args,
            variant: 'informative',
            outline: true,
            'default-slot': 'Published',
        })}
        ${template({
            ...args,
            variant: 'negative',
            outline: true,
            'default-slot': 'Rejected',
        })}
        ${template({
            ...args,
            variant: 'notice',
            outline: true,
            'default-slot': 'Pending',
        })}
        ${template({
            ...args,
            variant: 'neutral',
            outline: true,
            'default-slot': 'Archived',
        })}
    `,
    parameters: { ...parameters, 'section-order': 3 },
    tags: ['options'],
};

/**
 * The `subtle` style is available for all variants. It is useful when you want to reduce the visual prominence of the badge while still mapping to the design system color palette.
 */
export const Subtle: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            subtle: true,
            'default-slot': 'Approved',
        })}
        ${template({
            ...args,
            variant: 'informative',
            subtle: true,
            'default-slot': 'Published',
        })}
        ${template({
            ...args,
            variant: 'negative',
            subtle: true,
            'default-slot': 'Rejected',
        })}
        ${template({
            ...args,
            variant: 'notice',
            subtle: true,
            'default-slot': 'Pending',
        })}
        ${template({
            ...args,
            variant: 'neutral',
            subtle: true,
            'default-slot': 'Archived',
        })}
        ${template({
            ...args,
            variant: 'seafoam',
            subtle: true,
            'default-slot': 'Design',
        })}
        ${template({
            ...args,
            variant: 'indigo',
            subtle: true,
            'default-slot': 'Engineering',
        })}
    `,
    parameters: { ...parameters, 'section-order': 4 },
    tags: ['options'],
};

/**
 * Badge can be displayed as if it is "fixed" to the edge of a UI. The `fixed` attribute can be leveraged to alter the border rounding based on the position you would like to achieve. Fixed positioning options include `block-start`, `block-end`, `inline-start`, and `inline-end`.
 */
export const Fixed: Story = {
    render: (args) => html`
        ${template({
            ...args,
            fixed: 'block-start',
            'default-slot': 'Top edge',
        })}
        ${template({
            ...args,
            fixed: 'block-end',
            'default-slot': 'Bottom edge',
        })}
        ${template({
            ...args,
            fixed: 'inline-start',
            'default-slot': 'Left edge',
        })}
        ${template({
            ...args,
            fixed: 'inline-end',
            'default-slot': 'Right edge',
        })}
    `,
    parameters: { ...parameters, 'section-order': 5 },
    tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When a badge's label is too long for the available horizontal space, it wraps to form another line. Text wrapping can be enforced when a `max-inline-size` is applied to the badge.
 */
export const TextWrapping: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'informative',
            'default-slot': 'Document review pending approval from manager',
            style: 'max-inline-size: 120px',
        })}
    `,
    tags: ['behaviors'],
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
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            'default-slot': 'approved',
        })}
        ${template({
            ...args,
            variant: 'negative',
            'default-slot': 'rejected',
        })}
        ${template({
            ...args,
            variant: 'notice',
            'default-slot': 'needs approval',
        })}
        ${template({
            ...args,
            variant: 'informative',
            'default-slot': 'new feature',
        })}
        ${template({
            ...args,
            variant: 'neutral',
            'default-slot': 'version 1.2.10',
        })}
        ${template({ ...args, variant: 'celery', 'default-slot': 'available' })}
        ${template({ ...args, variant: 'yellow', 'default-slot': 'busy' })}
        ${template({
            ...args,
            variant: 'silver',
            'default-slot': 'out of office',
        })}
    `,
    parameters: parameters,
    tags: ['a11y'],
};

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────
