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

import { StatusLight } from '@adobe/swc/status-light';
import { capitalize } from '@spectrum-web-components/core/shared/utilities';

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

args['default-slot'] = 'Status light';
args.size = 'm';

/**
 * An `<sp-status-light>` is a great way to convey semantic meaning, such as statuses and categories.
 * It provides visual indicators through colored dots accompanied by descriptive text.
 */
const meta: Meta = {
    title: 'Status light',
    component: 'swc-status-light',
    argTypes,
    parameters: {
        docs: {
            subtitle: `Status lights convey semantic meaning through colored dots accompanied by descriptive text.`,
        },
    },
    args,
    render: (args) => template(args),
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

type StatusLightVariant = typeof StatusLight.prototype.variant;
type StatusLightSize = typeof StatusLight.prototype.size;

/**
 * An `<sp-status-light>` is a great way to convey semantic meaning, such as statuses and categories.
 * It provides visual indicators through colored dots accompanied by descriptive text.
 */
export const Playground: Story = {
    tags: ['autodocs', 'dev'],
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
 * Status lights come in four different sizes: small, medium, large, and extra-large. The medium size is the default and most frequently used option. Use the other sizes sparingly; they should be used to create a hierarchy of importance within the page.
 */
export const Sizes: Story = {
    render: () =>
        CONTAINER(
            StatusLight.VALID_SIZES.map(
                (size: StatusLightSize) => html`
                    <swc-status-light size="${size}"
                        >${sizeMap(size)}</swc-status-light
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * When status lights have a semantic meaning, they use semantic colors. Use these variants for the following statuses:
 *
 * - **Informative**: active, in use, live, published
 * - **Neutral**: archived, deleted, paused, draft, not started, ended
 * - **Positive**: approved, complete, success, new, purchased, licensed
 * - **Notice**: needs approval, pending, scheduled, syncing, indexing, processing
 * - **Negative**: error, alert, rejected, failed
 *
 * Semantic status lights should never be used for color coding categories or labels, and vice versa.
 */
export const SemanticVariants: Story = {
    render: () =>
        CONTAINER(
            StatusLight.VARIANTS_SEMANTIC.map(
                (variant: StatusLightVariant) => html`
                    <swc-status-light variant="${variant as StatusLightVariant}"
                        >${capitalize(variant)}</swc-status-light
                    >
                `
            )
        ),
    tags: ['options'],
};

/**
 * When status lights are used to color code categories and labels that are commonly found in data visualization, they use label colors. The ideal usage for these is when there are 8 or fewer categories or labels being color coded.
 */
export const NonsemanticVariants: Story = {
    render: () =>
        CONTAINER(
            StatusLight.VARIANTS_COLOR.map(
                (variant: StatusLightVariant) => html`
                    <swc-status-light variant="${variant as StatusLightVariant}"
                        >${capitalize(variant)}</swc-status-light
                    >
                `
            )
        ),
    tags: ['options'],
};
NonsemanticVariants.storyName = 'Non-semantic variants';

/**
 * When the text is too long for the horizontal space available, it wraps to form another line.
 */
export const TextWrapping: Story = {
    render: () =>
        html` <swc-status-light style="max-inline-size: 200px">
            This is a very long status light label that wraps when it reaches
            its max inline size
        </swc-status-light>`,
    tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<sp-status-light>` element implements several accessibility features:
 *
 * 1. **Color Meaning**: Colors are used in combination with text labels to ensure that status information is not conveyed through color alone
 *
 * ### Best Practices
 *
 * - Use semantic variants (`positive`, `negative`, `notice`, `info`, `neutral`) when the status has specific meaning
 * - Include a clear, descriptive text label that explains the status
 * - Ensure sufficient color contrast between the status light and its background
 */
export const Accessibility: Story = {
    render: () => html`
        <swc-status-light variant="positive">approved</swc-status-light>
        <swc-status-light variant="negative">rejected</swc-status-light>
        <swc-status-light variant="notice">needs approval</swc-status-light>
        <swc-status-light variant="info">new feature</swc-status-light>
        <swc-status-light variant="neutral">version 1.2.10</swc-status-light>
        <swc-status-light variant="celery">online</swc-status-light>
        <swc-status-light variant="yellow">busy</swc-status-light>
        <swc-status-light variant="silver">away</swc-status-light>
    `,
    tags: ['a11y'],
};

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────

/* @todo Pull this up into a utility function for more components to leverage. Are all sizes accounted for? */
function sizeMap(str?: StatusLightSize): string {
    const sizeLabels = {
        labels: {
            xxs: 'Extra-extra-small',
            xs: 'Extra-small',
            s: 'Small',
            m: 'Medium',
            l: 'Large',
            xl: 'Extra-large',
            xxl: 'Extra-extra-large',
        },
    };

    return str ? sizeLabels.labels[str] : '';
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
