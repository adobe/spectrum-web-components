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
    BADGE_FIXED_VALUES,
    BADGE_VARIANTS_COLOR_S2,
    BADGE_VARIANTS_S2,
    BADGE_VARIANTS_SEMANTIC,
} from '../../../../core/components/badge/Badge.types.js';
import { capitalize } from '../../../../core/shared/utilities/index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-badge');

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
 * Similar to [status lights](../?path=/docs/components-status-light--readme), they use color and text to convey status or category information.
 *
 * Badges come in three styles: bold fill (default), subtle fill, and outline.
 * Choose one style consistently within a product - outline and subtle fill draw similar attention levels.
 * Reserve bold fill for high-attention badging only.
 */
const meta: Meta = {
    title: 'Badge',
    component: 'swc-badge',
    args,
    argTypes,
    render: (args) => template(args),
    parameters: {
        docs: {
            subtitle: `Display small amounts of color-categorized metadata to get a user's attention.`,
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=36806-6551',
        },
        stackblitz: {
            url: 'https://stackblitz.com/edit/vitejs-vite-4glrpeeb?file=package.json',
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

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
    render: (args) => html` ${template(args)} `,
    parameters: parameters,
    tags: ['overview'],
    args: {
        size: 's',
        'default-slot': 'New',
    },
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
        ${template({ ...args, 'icon-slot': '✓', label: 'Icon only' })}
        ${template({
            ...args,
            'icon-slot': '✓',
            'default-slot': 'Icon and label',
        })}
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
 * - **`s` - Small**: Compact spaces, inline with text
 * - **`m` - Medium**: Default size, most common usage
 * - **`l` - Large**: Increased emphasis
 * - **`xl` - Extra-large**: Maximum visibility
 *
 * The `s` size is the default and most frequently used option. Use the other sizes sparingly to create a hierarchy of importance on a page.
 *
 * ```typescript
 * import { BADGE_VALID_SIZES, type BadgeSize } from '@adobe/swc/badge';
 * ```
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
 * - **`accent`**: (e.g., new, beta, prototype, draft)
 * - **`informative`**: (e.g., active, in use, live, published)
 * - **`neutral`**: (e.g., archived, deleted, paused, not started, ended)
 * - **`positive`**: (e.g., approved, complete, success, purchased, licensed)
 * - **`notice`**: (e.g., pending, expiring soon, limited, deprecated )
 * - **`negative`**: (e.g., error, alert, rejected, failed)
 *
 * ```typescript
 * import { BADGE_VARIANTS_SEMANTIC, type BadgeVariantS2 } from '@adobe/swc/badge';
 * ```
 */
export const SemanticVariants: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_SEMANTIC.map((variant) =>
            template({ ...args, variant, 'default-slot': capitalize(variant) })
        )}
    `,
    parameters: { ...parameters, 'section-order': 1 },
    tags: ['options'],
};
SemanticVariants.storyName = 'Semantic variants';

/**
 * When badges are for color-coded categories, they use non-semantic colors. Non-semantic variants are ideally used for when there are 8 categories or less.
 *
 * ```typescript
 * import { BADGE_VARIANTS_COLOR_S2, type BadgeVariantS2 } from '@adobe/swc/badge';
 * ```
 */
export const NonSemanticVariants: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_COLOR_S2.map((variant) =>
            template({ ...args, variant, 'default-slot': capitalize(variant) })
        )}
    `,
    parameters: { ...parameters, 'section-order': 2 },
    tags: ['options'],
};
NonSemanticVariants.storyName = 'Non-semantic variants';

/**
 * The `outline` style is only valid for semantic color variants.
 *
 * ```typescript
 * import { BADGE_VARIANTS_SEMANTIC, type BadgeVariantS2 } from '@adobe/swc/badge';
 * ```
 */
export const Outline: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_SEMANTIC.map((variant) =>
            template({
                ...args,
                variant,
                outline: true,
                'default-slot': capitalize(variant),
            })
        )}
    `,
    parameters: { ...parameters, 'section-order': 3 },
    tags: ['options'],
};

/**
 * The `subtle` style is available for all variants. It is useful when you want to reduce the visual prominence of the badge while still mapping to the design system color palette.
 *
 * ```typescript
 * import { BADGE_VARIANTS_S2, type BadgeVariantS2 } from '@adobe/swc/badge';
 * ```
 */
export const Subtle: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_S2.map((variant) =>
            template({
                ...args,
                variant,
                subtle: true,
                'default-slot': capitalize(variant),
            })
        )}
    `,
    parameters: { ...parameters, 'section-order': 4 },
    tags: ['options'],
};

/**
 * Badge can be displayed as if it is "fixed" to the edge of a UI. The `fixed` attribute can be leveraged to alter the border rounding based on the position you would like to achieve. Fixed positioning options include `block-start`, `block-end`, `inline-start`, and `inline-end`.
 *
 * ```typescript
 * import { BADGE_FIXED_VALUES, type BadgeFixedValues } from '@adobe/swc/badge';
 * ```
 */
export const Fixed: Story = {
    render: (args) => html`
        ${BADGE_FIXED_VALUES.map((fixed) =>
            template({
                ...args,
                fixed,
                'default-slot': capitalize(fixed),
            })
        )}
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

// @TODO: add links to the interactive components in the last bullet point
/**
 * ### Features
 *
 * The `<sp-badge>` element implements several accessibility features:
 *
 * 1. **Color Meaning**: Colors are used in combination with text labels and/or icons to ensure that status information is not conveyed through color alone
 *
 * ### Best Practices
 *
 * - Use semantic variants (`positive`, `negative`, `notice`, `informative`, `neutral`) when the status has specific meaning
 * - Include a clear, descriptive label that explains the status via the `default-slot` or `label` attribute if using an icon-only badge
 * - Ensure sufficient color contrast between the badge and its background
 * - Badges are not interactive elements. Consider using buttons, tags, or links instead
 */
export const Accessibility: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            'default-slot': 'Approved',
        })}
        ${template({
            ...args,
            variant: 'negative',
            'default-slot': 'Rejected',
        })}
        ${template({
            ...args,
            variant: 'notice',
            'default-slot': 'Needs approval',
        })}
        ${template({
            ...args,
            variant: 'informative',
            'default-slot': 'New feature',
        })}
        ${template({
            ...args,
            variant: 'neutral',
            'default-slot': 'Version 1.2.10',
        })}
        ${template({ ...args, variant: 'celery', 'default-slot': 'Available' })}
        ${template({ ...args, variant: 'yellow', 'default-slot': 'Busy' })}
        ${template({
            ...args,
            variant: 'silver',
            'default-slot': 'Out of office',
        })}
    `,
    parameters: parameters,
    tags: ['a11y'],
};
