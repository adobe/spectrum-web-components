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
 * A divider is a visual separator that brings clarity to a layout by grouping and dividing
 * content in close proximity. Dividers help establish rhythm and hierarchy, making it easier
 * for users to scan and understand content structure.
 */
const meta: Meta = {
    title: 'Divider',
    component: 'swc-divider',
    args,
    argTypes,
    render: (args) => html` ${template({ ...args })} `,
    parameters: {
        actions: {
            handles: events,
        },
        docs: {
            subtitle: `Visual separator for grouping and dividing content`,
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=13642-334',
        },
        stackblitz: {
            url: 'https://stackblitz.com/edit/vitejs-vite-rqfjtpgz?file=package.json',
        },
        flexLayout: 'row-nowrap',
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
    render: (args) => html`
        <h3>Content above the divider</h3>
        ${template({ ...args, size: 'm' })}
        <p>Content below the divider</p>
    `,
    parameters: {
        flexLayout: 'column-stretch',
    },
    tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A divider consists of:
 *
 * 1. **Line** - The visual separator element that creates visual separation between content
 */
export const Anatomy: Story = {
    render: (args) => html`
        <h4>Content above the divider</h4>
        ${template({ ...args, size: 'm' })}
        <p>Content below the divider</p>
    `,
    tags: ['anatomy'],
    parameters: {
        flexLayout: 'column-stretch',
    },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Dividers come in three sizes to fit various contexts:
 *
 * - **Small (`s`)**: Used to divide similar components such as table rows, action button groups, and components within a panel
 * - **Medium (`m`)**: Used for dividing subsections on a page, or to separate different groupings of components such as panels, rails, etc.
 * - **Large (`l`)**: Should only be used for page titles or section titles
 */
export const Sizes: Story = {
    render: (args) => html`
        <div>
            <h3>Small</h3>
            ${template({ ...args, size: 's' })}
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
        'section-order': 1,
    },
    tags: ['options'],
};

/**
 * The default horizontal divider is used to separate content stacked vertically. To separate
 * horizontal content, use the `vertical` attribute.
 */
export const Vertical: Story = {
    render: (args) => html`
        <h4>Small</h4>
        ${template({
            ...args,
            size: 's',
        })}
        <p>Content next to the small divider.</p>
        <h4>Medium</h4>
        ${template({
            ...args,
            size: 'm',
        })}
        <p>Content next to the medium divider.</p>
        <h4>Large</h4>
        ${template({
            ...args,
            size: 'l',
        })}
        <p>Content next to the large divider.</p>
    `,
    parameters: {
        'section-order': 2,
    },
    tags: ['options'],
    args: {
        vertical: true,
    },
};

/**
 * Use the `static-color` attribute when displaying over images or colored backgrounds:
 *
 * - **white**: Use on dark or colored backgrounds for better contrast
 * - **black**: Use on light backgrounds for better contrast
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
        staticColorsDemo: true,
        'section-order': 3,
    },
    tags: ['options'],
};
StaticColors.storyName = 'Static colors';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-divider>` element implements several accessibility features:
 *
 * #### ARIA implementation
 *
 * 1. **ARIA role**: Automatically sets `role="separator"` to ensure proper semantic meaning for assistive technologies
 * 2. **Orientation support**: When `vertical` is true, automatically sets `aria-orientation="vertical"` to indicate the divider's orientation
 *
 * #### Visual accessibility
 *
 * - Dividers use sufficient thickness and color contrast to be perceivable
 * - Static color variants ensure contrast on different backgrounds
 * - High contrast mode is supported with appropriate color overrides
 *
 * ### Best practices
 *
 * - Place medium or large dividers below header text to visually create a section or page title
 * - Use dividers to create meaningful visual separation, not just decorative lines
 * - Use dividers sparingly; excessive use can diminish their visual impact
 * - Ensure sufficient color contrast when using `static-color` variants on colored backgrounds
 * - Consider using headings or other semantic elements for screen reader users when dividers mark major content transitions
 */
export const Accessibility: Story = {
    render: (args) => html`
        <h4>Project overview</h4>
        ${template({ ...args, size: 'l' })}
        <p>
            Review the project timeline, milestones, and deliverables for the
            current sprint.
        </p>
    `,
    parameters: {
        flexLayout: 'column-stretch',
    },
    tags: ['a11y'],
};
