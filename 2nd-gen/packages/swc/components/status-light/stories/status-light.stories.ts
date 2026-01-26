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

import { StatusLight } from '@adobe/swc/status-light';
import {
    STATUS_LIGHT_VARIANTS_COLOR_S2,
    STATUS_LIGHT_VARIANTS_SEMANTIC_S2,
    StatusLightColorVariantS2,
    StatusLightSemanticVariantS2,
} from '@spectrum-web-components/core/components/status-light';

import '@adobe/swc/status-light';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-status-light');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: StatusLight.VARIANTS,
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: StatusLight.VALID_SIZES,
};

/**
 * Status lights describe the condition of an entity. Much like [badges](../?path=/docs/components-badge--readme), they can be used to convey semantic meaning, such as statuses and categories.
 */
const meta: Meta = {
    title: 'Status light',
    component: 'swc-status-light',
    parameters: {
        docs: {
            subtitle: `Status lights convey semantic meaning through colored dots accompanied by descriptive text.`,
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=36797-954',
        },
        stackblitz: {
            url: 'https://stackblitz.com/edit/vitejs-vite-y2kz1rkx?file=package.json',
        },
        flexLayout: 'row-wrap',
    },
    args,
    argTypes,
    render: (args) => template(args),
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const semanticLabels = {
    info: 'Active',
    neutral: 'Archived',
    positive: 'Approved',
    notice: 'Pending approval',
    negative: 'Rejected',
} as const satisfies Record<StatusLightSemanticVariantS2, string>;

const nonSemanticLabels = {
    yellow: 'Operations',
    chartreuse: 'Quality',
    celery: 'Documentation',
    seafoam: 'Support',
    cyan: 'Analytics',
    indigo: 'Engineering',
    purple: 'Product',
    fuchsia: 'Marketing',
    magenta: 'Design',
    pink: 'Creative',
    turquoise: 'Training',
    brown: 'Facilities',
    cinnamon: 'Compliance',
    silver: 'Version 1.2.10',
} as const satisfies Record<StatusLightColorVariantS2, string>;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    tags: ['autodocs', 'dev'],
    args: {
        size: 'm',
        variant: 'info',
        'default-slot': 'Active',
    },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
    tags: ['overview'],
    args: {
        size: 'm',
        variant: 'info',
        'default-slot': 'Active',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A status light consists of:
 *
 * 1. **Colored dot indicator** - Visual representation of status or category
 * 2. **Text label** - Descriptive text providing context
 *
 * ### Content
 *
 * - **Default slot**: Text content describing the status or category (required for accessibility)
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            'default-slot': 'Approved',
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
 * Status lights come in four sizes to fit various contexts:
 *
 * - **Small (`s`)**: Used for inline indicators or space-constrained areas
 * - **Medium (`m`)**: Default size, used for typical use cases
 * - **Large (`l`)**: Used for prominent displays or primary content areas
 * - **Extra-large (`xl`)**: Maximum visibility for high-priority statuses
 *
 * All sizes shown below for comparison.
 */
export const Sizes: Story = {
    render: (args) => html`
        ${template({ ...args, size: 's', 'default-slot': 'Small' })}
        ${template({ ...args, size: 'm', 'default-slot': 'Medium' })}
        ${template({ ...args, size: 'l', 'default-slot': 'Large' })}
        ${template({ ...args, size: 'xl', 'default-slot': 'Extra-large' })}
    `,
    parameters: { 'section-order': 1 },
    tags: ['options'],
};
/**
 * Semantic variants provide meaning through color:
 *
 * - **`info`**: Active, in use, live, published
 * - **`neutral`**: Archived, deleted, paused, draft, not started, ended
 * - **`positive`**: Approved, complete, success, new, purchased, licensed
 * - **`notice`**: Needs approval, pending, scheduled, syncing, indexing, processing
 * - **`negative`**: Error, alert, rejected, failed
 */
export const SemanticVariants: Story = {
    render: (args) => html`
        ${STATUS_LIGHT_VARIANTS_SEMANTIC_S2.map(
            (variant: StatusLightSemanticVariantS2) =>
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

/**
 * Non-semantic variants use color-coded categories, ideal for data visualization and labeling.
 * Best used when there are **8 or fewer** categories being color coded.
 *
 * **Note**: The `pink`, `turquoise`, `brown`, `cinnamon`, and `silver` variants are new in 2nd-gen and not available in 1st-gen.
 */
export const NonSemanticVariants: Story = {
    render: (args) => html`
        ${STATUS_LIGHT_VARIANTS_COLOR_S2.map(
            (variant: StatusLightColorVariantS2) =>
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

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When the text is too long for the horizontal space available, it wraps to form another line.
 * You can control the wrapping behavior by setting a `max-inline-size` style on the component.
 */
export const TextWrapping: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            'default-slot':
                'Document processing in progress - please wait while we validate your submission',
            style: 'max-inline-size: 200px',
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
 * The `<swc-status-light>` element implements several accessibility features:
 *
 * #### Visual accessibility
 *
 * - Status information is conveyed through both color and text labels, not relying on color alone
 * - High contrast mode is supported with appropriate color overrides
 * - Sufficient color contrast is maintained between the status dot and background
 *
 * #### Semantic meaning
 *
 * - Semantic variants provide consistent color associations for common statuses
 * - Text labels provide clear context for all users
 *
 * ### Best practices
 *
 * - Always provide a descriptive text label that explains the status
 * - Use semantic variants (`info`, `positive`, `negative`, `notice`, `neutral`) when the status has specific meaning
 * - Use meaningful, specific labels (e.g., "Approved" instead of "Green")
 * - Ensure sufficient color contrast between the status light and its background
 * - For non-semantic variants, ensure the text label provides complete context
 */
export const Accessibility: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'positive',
            'default-slot': semanticLabels['positive'],
        })}
        ${template({
            ...args,
            variant: 'negative',
            'default-slot': semanticLabels['negative'],
        })}
        ${template({
            ...args,
            variant: 'notice',
            'default-slot': semanticLabels['notice'],
        })}
        ${template({
            ...args,
            variant: 'info',
            'default-slot': semanticLabels['info'],
        })}
        ${template({
            ...args,
            variant: 'neutral',
            'default-slot': semanticLabels['neutral'],
        })}
        ${template({
            ...args,
            variant: 'celery',
            'default-slot': nonSemanticLabels['celery'],
        })}
        ${template({
            ...args,
            variant: 'yellow',
            'default-slot': nonSemanticLabels['yellow'],
        })}
        ${template({
            ...args,
            variant: 'silver',
            'default-slot': nonSemanticLabels['silver'],
        })}
    `,
    tags: ['a11y'],
};
