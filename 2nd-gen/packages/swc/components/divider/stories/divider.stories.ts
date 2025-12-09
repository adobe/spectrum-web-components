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

import { Divider } from '@adobe/swc/divider';

import '@adobe/swc/divider';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-divider');

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Divider.VALID_SIZES,
};

argTypes['static-color'] = {
    ...argTypes['static-color'],
    control: { type: 'select' },
    options: [undefined, ...Divider.STATIC_COLORS],
};

/**
 * Dividers bring clarity to a layout by grouping and dividing content that exists in close proximity. It can also be used to establish rhythm and hierarchy.
 */
const meta: Meta = {
    title: 'Divider',
    component: 'swc-divider',
    args,
    argTypes,
    render: (args) => template(args),
    parameters: {
        actions: {
            handles: events,
        },
        docs: {
            subtitle: `Dividers bring clarity to a layout by grouping and dividing content in close proximity.`,
        },
    },
    tags: ['migrated'],
};

export default meta;

type DividerSize = typeof Divider.prototype.size;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

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
 * A divider consists of a line with the following aspects:
 *
 * - An optional size
 * - An optional orientation
 * - An optional static color for backgrounds that have color
 */
export const Anatomy: Story = {
    render: (args) => html`
        <div>
            <p>Content above the divider</p>
            ${template({ ...args, size: 'm' })}
            <p>Content below the divider</p>
        </div>
    `,
    tags: ['anatomy'],
    args: {},
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Dividers come in three sizes to fit various contexts:
 *
 * - **Small**: Used to divide similar components such as table rows, action button groups, and components within a panel
 * - **Medium**: Used for dividing subsections on a page, or to separate different groupings of components such as panels, rails, etc.
 * - **Large**: Should only be used for page titles or section titles
 */
export const Sizes: Story = {
    render: () =>
        html` <div style="display: flex; flex-direction: row; gap: 16px;">
            ${Divider.VALID_SIZES.map((size) => {
                const label =
                    size === 's' ? 'Small' : size === 'l' ? 'Large' : 'Medium';
                return html`<div>
                    <h3 class="demo">${label}</h3>
                    <swc-divider size=${size}></swc-divider>
                    <p>Text below the divider.</p>
                </div>`;
            })}
        </div>`,
    tags: ['options'],
};

/**
 * The default horizontal divider is used to separate content stacked vertically. To separate horizontal content, use the `vertical` attribute.
 *
 * When a vertical divider is used inside of a flex container, use `align-self: stretch; height: auto;` on the divider.
 */
export const Vertical: Story = {
    args: {
        vertical: true,
    },
    render: () => html`
        <div style="display: flex; flex-direction: row; gap: 48px;">
            ${Divider.VALID_SIZES.map((size) => {
                const label =
                    size === 's' ? 'Small' : size === 'l' ? 'Large' : 'Medium';
                return html` <h3 class="demo">${label}</h3>
                    <swc-divider vertical size=${size}></swc-divider>`;
            })}
        </div>
    `,
    tags: ['options'],
};

export const StaticBlack: Story = {
    args: {
        'static-color': 'black',
    },
    render: (args: Record<string, unknown>) => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            ${Divider.VALID_SIZES.map((size) =>
                template({ ...args, size: size as DividerSize })
            )}
        </div>
    `,
};

export const StaticWhite: Story = {
    args: {
        'static-color': 'white',
    },
    render: (args: Record<string, unknown>) => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            ${Divider.VALID_SIZES.map((size) =>
                template({ ...args, size: size as DividerSize })
            )}
        </div>
    `,
};

/**
 * When displaying over images or colored backgrounds, use the `static-color` attribute for better contrast, e.g. `static-color="white"` on a dark background or `static-color="black"` on a light background:
 */
export const StaticColors: Story = {
    render: () => html`
        <div style="display: flex; gap: 48px;">
            <div
                style="background: var(--spectrum-gray-900); padding: 24px; flex: 1;"
            >
                <h4 style="color: white;">White on dark</h4>
                ${template({ 'static-color': 'white', size: 'm' })}
            </div>
            <div
                style="background: var(--spectrum-gray-50); padding: 24px; flex: 1;"
            >
                <h4>Black on light</h4>
                ${template({ 'static-color': 'black', size: 'm' })}
            </div>
        </div>
    `,
    tags: ['options', '!test'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<sp-divider>` element implements the following accessibility features:
 *
 * 1. **ARIA Role**: Automatically sets `role="separator"` to ensure proper semantic meaning for assistive technologies
 * 2. **Orientation support**: When `vertical` is true, automatically sets `aria-orientation="vertical"` to indicate the divider's orientation
 *
 * ### Best Practices
 *
 * - Medium or large dividers can be used with header text to visually create a section or page title. Place the divider below the header for best results
 * - Use dividers to create meaningful visual separation, not just decorative lines
 * - Use dividers sparingly; excessive use can diminish their visual impact
 */
export const Accessibility: Story = {
    render: () => html`
        <div>
            <h2>Section title</h2>
            ${template({ size: 'l' })}
            <p>Content in this section...</p>
        </div>
    `,
    tags: ['a11y'],
};
