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

/*
 * @todo This is properly configuring the Select, but the control doesn't
 * seem to work; need to investigate.
 */

// argTypes.size = {
//     ...argTypes.size,
//     control: { type: 'select' },
//     options: Divider.VALID_SIZES,
// };

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
    },
    tags: ['migrated'],
};

export default meta;

type DividerSize = typeof Divider.prototype.size;

// ────────────────────
//    PRIMARY STORIES
// ────────────────────

/**
 * By default, dividers are horizontal and should be used for separating content vertically. The medium divider is the default size.
 */
export const Playground: Story = {
    args: {
        size: 'm',
    },
    tags: ['autodocs', 'dev'],
};

// ────────────────────
//    USAGE STORIES
// ────────────────────

/**
 * The small divider is used to divide similar components such as table rows, action button groups, and components within a panel.
 *
 * The medium divider is used for dividing subsections on a page, or to separate different groupings of components such as panels, rails, etc.
 *
 * The large divider should only be used for page titles or section titles.
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
    tags: ['usage', '!dev'],
};

/**
 * Vertical dividers are used to separate content horizontally.
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
    tags: ['!dev', '!autodocs', 'usage'],
};

/**
 * Use the static color options when a divider needs to be placed on top of a color background or visual. Static color dividers are available in black or white regardless of color theme.
 */
export const StaticColors: Story = {
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
    tags: ['!dev', '!autodocs', 'usage'],
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
    tags: ['!dev', '!autodocs', 'usage'],
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
    tags: ['!dev', '!autodocs', 'usage'],
};
