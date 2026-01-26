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

import { Badge } from '@adobe/swc/badge';

import '@adobe/swc/badge';

import {
    BADGE_VALID_SIZES,
    BADGE_VARIANTS_COLOR_S2,
    BADGE_VARIANTS_S2,
    BADGE_VARIANTS_SEMANTIC,
    type BadgeColorVariantS2,
    type BadgeSemanticVariant,
    type BadgeSize,
    FIXED_VALUES,
    type FixedValues,
} from '../../../../core/components/badge/Badge.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-badge');

// @todo: Carry the args table defaultValue pattern to all argTypes in all components. Explore how to get our custom types to properly reflect with this new pattern.
argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: Badge.VARIANTS,
    table: {
        category: 'attributes',
        defaultValue: {
            summary: 'informative',
        },
    },
};

argTypes.fixed = {
    ...argTypes.fixed,
    control: { type: 'select' },
    options: ['', ...Badge.FIXED_VALUES],
    table: {
        category: 'attributes',
        defaultValue: {
            summary: '',
        },
    },
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Badge.VALID_SIZES,
    table: {
        category: 'attributes',
        defaultValue: {
            summary: 'm',
        },
    },
};

/**
 * Similar to [status lights](/?path=/docs/components-status-light--readme), they use color and text to convey status or category information.
 *
 * Badges come in three styles: bold fill (default), subtle fill, and outline.
 * Choose one style consistently within a product - `outline` and `subtle` fill draw similar attention levels.
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
        flexLayout: 'row-wrap',
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
    s: 'Small',
    m: 'Medium',
    l: 'Large',
    xl: 'Extra-large',
} as const satisfies Record<BadgeSize, string>;

const semanticLabels = {
    accent: 'New',
    informative: 'Active',
    neutral: 'Archived',
    positive: 'Approved',
    notice: 'Pending approval',
    negative: 'Rejected',
} as const satisfies Record<BadgeSemanticVariant, string>;

const nonSemanticLabels = {
    fuchsia: 'Marketing',
    indigo: 'Engineering',
    magenta: 'Design',
    purple: 'Product',
    seafoam: 'Support',
    yellow: 'Busy',
    gray: 'Available',
    red: 'Sales',
    orange: 'Research',
    chartreuse: 'Quality',
    celery: 'Documentation',
    green: 'Legal',
    cyan: 'Analytics',
    blue: 'Security',
    pink: 'Creative',
    turquoise: 'Training',
    brown: 'Facilities',
    cinnamon: 'Compliance',
    silver: 'Version 1.2.10',
} as const satisfies Record<BadgeColorVariantS2, string>;

const allVariantsLabels = { ...semanticLabels, ...nonSemanticLabels };

const fixedLabels = {
    'block-start': 'Block start',
    'block-end': 'Block end',
    'inline-start': 'Inline start',
    'inline-end': 'Inline end',
} as const satisfies Record<FixedValues, string>;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    render: (args) => template(args),
    args: {
        size: 'm',
        variant: 'informative',
        'default-slot': 'Active',
    },
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
    render: (args) => html` ${template(args)} `,
    tags: ['overview'],
    args: {
        size: 'm',
        variant: 'informative',
        'default-slot': 'Active',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A badge consists of:
 *
 * 1. **Container** - Colored background with rounded corners
 * 2. **Label** - Text content describing the status or category (required)
 * 3. **Icon** (optional) - Visual indicator positioned before the label
 *
 * ### Content
 *
 * - **Default slot**: Text content describing the status or category (required for accessibility)
 * - **icon slot**: (optional) - Visual indicator positioned before the label
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, 'default-slot': 'Label only' })}
        ${template({ ...args, 'icon-slot': '✓', 'aria-label': 'Icon only' })}
        ${template({
            ...args,
            'icon-slot': '✓',
            'default-slot': 'Icon and label',
        })}
    `,
    tags: ['anatomy'],
    args: {
        variant: 'informative',
        size: 'm',
    },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Badges come in four sizes to fit various contexts:
 *
 * - **Small (`s`)**: Compact spaces, inline with text, or in tables
 * - **Medium (`m`)**: Default size for most common usage scenarios
 * - **Large (`l`)**: Increased emphasis in cards or content areas
 * - **Extra-large (`xl`)**: Maximum visibility for primary status indicators
 *
 * The `m` size is the default and most frequently used option. Use larger sizes sparingly to create a hierarchy of importance on a page.
 */
export const Sizes: Story = {
    render: (args) => html`
        ${BADGE_VALID_SIZES.map((size) =>
            template({
                ...args,
                size,
                'default-slot': sizeLabels[size],
            })
        )}
    `,
    parameters: { 'section-order': 1 },
    tags: ['options'],
    args: {
        variant: 'informative',
    },
};

/**
 * Semantic variants provide meaning through color and should be used when status has specific significance.
 * These variants align consistently with other design system components that use the same semantic meanings.
 *
 * Use these variants for the following statuses:
 *
 * - **accent**: New, beta, prototype, draft
 * - **informative**: Active, in use, live, published
 * - **neutral**: Archived, deleted, paused, not started, ended
 * - **positive**: Approved, complete, success, purchased, licensed
 * - **notice**: Pending, expiring soon, limited, deprecated
 * - **negative**: Rejected, error, alert, failed
 */
export const SemanticVariants: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_SEMANTIC.map((variant) =>
            template({
                ...args,
                variant,
                'default-slot': semanticLabels[variant],
            })
        )}
    `,
    parameters: { 'section-order': 2 },
    tags: ['options'],
};
SemanticVariants.storyName = 'Semantic variants';

/**
 * Non-semantic variants use distinctive colors for visual categorization without inherent meaning.
 * These are ideal for color-coding categories, teams, or projects - especially when there are 8 categories or fewer.
 *
 * Use non-semantic variants when:
 * - Categories don't have universal status meanings
 * - Visual distinction matters more than semantic meaning
 * - Creating department, team, or project color schemes
 *
 * > **Note**: 2nd-gen adds `pink`, `turquoise`, `brown`, `cinnamon`, and `silver` variants.
 * 1st-gen variants `gray`, `red`, `orange`, `green`, and `blue` are not available in 2nd-gen.
 */
export const NonSemanticVariants: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_COLOR_S2.map((variant) =>
            template({
                ...args,
                variant,
                'default-slot': nonSemanticLabels[variant],
            })
        )}
    `,
    parameters: { 'section-order': 3 },
    tags: ['options'],
};
NonSemanticVariants.storyName = 'Non-semantic variants';

/**
 * The `outline` style provides a bordered appearance with a transparent background.
 * This style reduces visual weight while maintaining semantic meaning.
 *
 * **Important**: The outline style is only valid for semantic variants (`accent`, `informative`, `neutral`, `positive`, `notice`, `negative`).
 * Attempting to use `outline` with non-semantic color variants will not apply the style.
 */
export const Outline: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_SEMANTIC.map((variant) =>
            template({
                ...args,
                variant,
                outline: true,
                'default-slot': semanticLabels[variant],
            })
        )}
    `,
    parameters: { 'section-order': 4 },
    tags: ['options'],
};

/**
 * The `subtle` style reduces visual prominence with a softer background fill.
 * Unlike outline, subtle is available for **all** variants (semantic and non-semantic).
 *
 * Use subtle style when:
 * - Multiple badges appear together and need less visual competition
 * - Status is secondary to main content
 * - Maintaining design system color palette while reducing emphasis
 */
export const Subtle: Story = {
    render: (args) => html`
        ${BADGE_VARIANTS_S2.map((variant) =>
            template({
                ...args,
                variant,
                subtle: true,
                'default-slot': allVariantsLabels[variant],
            })
        )}
    `,
    parameters: { 'section-order': 5 },
    tags: ['options'],
};

/**
 * The `fixed` attribute adjusts border radius based on edge positioning, creating the appearance that the badge is "fixed" to a UI edge.
 *
 * Fixed positioning options:
 *
 * - **block-start**: Top edge (removes top-left and top-right border radius)
 * - **block-end**: Bottom edge (removes bottom-left and bottom-right border radius)
 * - **inline-start**: Left edge (removes top-left and bottom-left border radius)
 * - **inline-end**: Right edge (removes top-right and bottom-right border radius)
 *
 * This is purely visual styling - actual positioning must be handled separately with CSS.
 *
 * All fixed positions shown below for comparison.
 */
export const Fixed: Story = {
    render: (args) => html`
        ${FIXED_VALUES.map((fixed) =>
            template({
                ...args,
                fixed,
                'default-slot': fixedLabels[fixed],
            })
        )}
    `,
    parameters: { 'section-order': 6 },
    tags: ['options'],
    args: {
        variant: 'informative',
        size: 'm',
    },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When a badge's label is too long for the available horizontal space, it wraps to form multiple lines.
 * Text wrapping can be controlled by applying a `max-inline-size` constraint to the badge.
 *
 * This ensures badges remain readable even with longer status messages or category names.
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
    args: {
        size: 'm',
    },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-badge>` element implements several accessibility features:
 *
 * #### Color meaning
 *
 * - Colors are used in combination with text labels and/or icons to ensure that status information is not conveyed through color alone
 * - Users with color vision deficiencies can understand badge meaning through text content
 * - High contrast mode is supported with appropriate color overrides
 *
 * #### Non-interactive element
 *
 * - Badges have no interactive behavior and are not focusable
 * - Screen readers will announce the badge content as static text
 * - No keyboard interaction is required or expected
 *
 * ### Best practices
 *
 * - Use semantic variants (`positive`, `negative`, `notice`, `informative`, `neutral`, `accent`) when the status has specific meaning
 * - Include clear, descriptive labels that explain the status without relying on color alone
 * - For icon-only badges, provide descriptive text in the default slot or use the `aria-label` attribute directly on the element
 * - Ensure sufficient color contrast between the badge and its background
 * - Badges are not interactive elements - for interactive status indicators, consider using buttons, tags, or links instead
 * - When using multiple badges together, ensure they're clearly associated with their related content
 * - Use consistent badge variants across your application for the same statuses
 * - Test with screen readers to verify badge content is announced in context
 * - Consider placement carefully - badges should be close to the content they describe
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
            'default-slot': 'Pending approval',
        })}
        ${template({
            ...args,
            variant: 'informative',
            'default-slot': 'Active',
        })}
        ${template({
            ...args,
            variant: 'neutral',
            'default-slot': 'Archived',
        })}
        ${template({
            ...args,
            variant: 'celery',
            'default-slot': 'Documentation',
        })}
        ${template({
            ...args,
            variant: 'yellow',
            'default-slot': 'Busy',
        })}
        ${template({
            ...args,
            variant: 'silver',
            'default-slot': 'Version 1.2.10',
        })}
    `,
    tags: ['a11y'],
    args: {
        size: 'm',
    },
};
