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
 *
 */
const meta: Meta = {
    title: 'Divider',
    component: 'swc-divider',
    args,
    argTypes,
    render: (args) => html`
        ${args.above && html`<h3>${args.above}</h3>`} ${template({ ...args })}
        ${args.below && html`<p>${args.below}</p>`}
    `,
    parameters: {
        actions: {
            handles: events,
        },
        docs: {
            subtitle: `Dividers bring clarity to a layout by grouping and dividing content in close proximity. They can also be used to establish rhythm and hierarchy.`,
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=13642-334',
        },
        stackblitz: {
            url: 'https://stackblitz.com/edit/vitejs-vite-rqfjtpgz?file=package.json',
        },
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    args: {},
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
    args: {},
    tags: ['overview'],
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
    tags: ['anatomy'],
    args: {
        above: 'Content above the divider',
        below: 'Content below the divider',
    },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Dividers come in three sizes to fit various contexts:
 *
 * - **Small**: Default size. Used to divide similar components such as table rows, action button groups, and components within a panel
 * - **Medium**: Used for dividing subsections on a page, or to separate different groupings of components such as panels, rails, etc.
 * - **Large**: Should only be used for page titles or section titles
 */
export const Sizes: Story = {
    render: (args) => html`
        <div>
            <h3>Small</h3>
            ${template({ ...args })}
            <p>Content below the small divider.</p>
        </div>
        <div>
            <h3>Medium</h3>
            ${template({ ...args, size: 'm' })}
            <p>Content below the medium divider.</p>
        </div>
        <div>
            <h3>Large</h3>
            ${template({ ...args, size: 'l' })}
            <p>Content below the large divider.</p>
        </div>
    `,
    parameters: {
        flexLayout: true,
        styles: {
            'flex-direction': 'row',
            gap: '16px',
        },
    },
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
    render: (args) => html`
        <div>
            <h3>Small</h3>
            ${template({
                ...args,
                size: 's',
            })}
            <p>Content below the small divider.</p>
        </div>
        <div>
            <h3>Medium</h3>
            ${template({
                ...args,
                size: 'm',
            })}
            <p>Content below the medium divider.</p>
        </div>
        <div>
            <h3>Large</h3>
            ${template({
                ...args,
                size: 'l',
            })}
            <p>Content below the large divider.</p>
        </div>
    `,
    parameters: {
        flexLayout: true,
        styles: {
            'flex-direction': 'row',
            gap: '16px',
        },
    },
    tags: ['options'],
    args: {
        vertical: true,
        style: 'align-self: stretch; height: auto;',
    },
};

export const StaticBlack: Story = {
    args: {
        'static-color': 'black',
    },
    render: (args: Record<string, unknown>) => html`
        <p>Content above the divider on a light background</p>
        ${template({ ...args, size: 'm' as DividerSize })}
        <p>Content below the divider</p>
    `,
    parameters: {
        flexLayout: false,
        styles: {
            color: 'black',
        },
    },
};

export const StaticWhite: Story = {
    args: {
        'static-color': 'white',
    },
    render: (args: Record<string, unknown>) => html`
        <p>Content above the divider on a dark background</p>
        ${template({ ...args, size: 'm' as DividerSize })}
        <p>Content below the divider</p>
    `,
    parameters: {
        flexLayout: false,
        styles: {
            color: 'white',
        },
    },
};

/**
 * When displaying over images or colored backgrounds, use the `static-color` attribute for better contrast, e.g. `static-color="white"` on a dark background or `static-color="black"` on a light background:
 */
export const StaticColors: Story = {
    render: (args) => html`
        ${['white', 'black'].map(
            (color) =>
                html` <div>
                    <h4>Dashboard settings</h4>
                    ${template({ ...args, 'static-color': color })}
                    <p>
                        Configure your dashboard preferences and layout options.
                    </p>
                </div>`
        )}
    `,
    args: {
        size: 'm',
    },
    parameters: {
        flexLayout: false,
        staticColorsDemo: true,
    },
    tags: ['options', '!test'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-divider>` element implements the following accessibility features:
 *
 * 1. **ARIA role**: Automatically sets `role="separator"` to ensure proper semantic meaning for assistive technologies
 * 2. **Orientation support**: When `vertical` is true, automatically sets `aria-orientation="vertical"` to indicate the divider's orientation
 *
 * ### Best practices
 *
 * - Medium or large dividers can be used with header text to visually create a section or page title. Place the divider below the header for best results
 * - Use dividers to create meaningful visual separation, not just decorative lines
 * - Use dividers sparingly; excessive use can diminish their visual impact
 */
export const Accessibility: Story = {
    render: () => html`
        <h4>Project overview</h4>
        ${template({ size: 'l' })}
        <p>
            Review the project timeline, milestones, and deliverables for the
            current sprint.
        </p>
    `,
    tags: ['a11y'],
};
