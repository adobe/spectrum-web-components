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

import { StatusLight } from '@adobe/swc/status-light';
import {
    STATUSLIGHT_VARIANTS_COLOR_S2,
    STATUSLIGHT_VARIANTS_SEMANTIC_S2,
    StatusLightColorVariantS2,
    StatusLightSemanticVariantS2,
} from '@spectrum-web-components/core/components/status-light';

import '@adobe/swc/status-light';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-status-light');

const parameters = {
    flexLayout: true,
    styles: {
        gap: 'var(--spectrum-spacing-200)',
        'flex-wrap': 'wrap',
        'justify-content': 'center',
        // Used 80ch because that's generally considered the maximum readable width for text in a web page.
        'max-inline-size': '80ch',
    },
};

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
 * Status lights describe the condition of an entity. Much like [Badges](../?path=/docs/components-badge--readme), they can be used to convey semantic meaning, such as statuses and categories.
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
    },
    args,
    argTypes,
    render: (args) => template(args),
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    tags: ['autodocs', 'dev'],
    args: {
        size: 'm',
        'default-slot': 'New Feature',
    },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
    tags: ['overview'],
    args: {
        size: 'm',
        'default-slot': 'Active',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A status light consists of a colored dot indicator and a required text label. The dot's color represents the status or category, while the text provides additional context.
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
 * Status lights come in four different sizes: `s`, `m`, `l`, and `xl`. The `m` size is the default and most frequently used option. Use the other sizes sparingly; they should be used to create a hierarchy of importance within the page.
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

const semanticLabels = {
    info: 'Information',
    neutral: 'Archived',
    positive: 'Approved',
    notice: 'Pending approval',
    negative: 'Rejected',
} as const satisfies Record<StatusLightSemanticVariantS2, string>;
/**
 * When status lights have a semantic meaning, they use semantic colors. Use these variants for the following statuses:
 *
 * - **Info**: active, in use, live, published
 * - **Neutral**: archived, deleted, paused, draft, not started, ended
 * - **Positive**: approved, complete, success, new, purchased, licensed
 * - **Notice**: needs approval, pending, scheduled, syncing, indexing, processing
 * - **Negative**: error, alert, rejected, failed
 *
 * Semantic status lights should never be used for color coding categories or labels, and vice versa.
 */
export const SemanticVariants: Story = {
    render: () => html`
        ${STATUSLIGHT_VARIANTS_SEMANTIC_S2.map(
            (variant: StatusLightSemanticVariantS2) =>
                template({
                    ...args,
                    variant,
                    'default-slot': semanticLabels[variant],
                })
        )}
    `,
    parameters: { ...parameters, 'section-order': 1 },
    tags: ['options'],
};

const nonSemanticLabels = {
    yellow: 'Busy',
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
/**
 * When status lights are used to color code categories and labels that are commonly found in data visualization, they use label colors. The ideal usage for these is when there are **8 or fewer** categories or labels being color coded.
 */
export const NonSemanticVariants: Story = {
    render: () => html`
        ${STATUSLIGHT_VARIANTS_COLOR_S2.map(
            (variant: StatusLightColorVariantS2) =>
                template({
                    ...args,
                    variant,
                    'default-slot': nonSemanticLabels[variant],
                })
        )}
    `,
    parameters: { ...parameters, 'section-order': 2 },
    tags: ['options'],
};
NonSemanticVariants.storyName = 'Non-semantic variants';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When the text is too long for the horizontal space available, it wraps to form another line. You can control the wrapping behavior by setting the `style` attribute to `max-inline-size`.
 */
export const TextWrapping: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'info',
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
 * 1. **Color meaning**: Colors are used in combination with text labels to ensure that status information is not conveyed through color alone
 * 2. **ARIA support**: When disabled, the component automatically sets `aria-disabled="true"`
 *
 * ### Best practices
 *
 * - Use semantic variants (`positive`, `negative`, `notice`, `info`, `neutral`) when the status has specific meaning
 * - Include a clear, descriptive text label that explains the status
 * - Ensure sufficient color contrast between the status light and its background
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
