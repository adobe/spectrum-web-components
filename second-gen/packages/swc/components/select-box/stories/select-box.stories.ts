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

import { html, nothing, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import '@swc/components/select-box';

/** @todo Pull this up into a utility function for all components to leverage */
function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/** @todo Pull this up into a decorator for all stories to leverage */
const CONTAINER = (content: TemplateResult<1>[]) =>
    html`<div
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

/**
 * Select boxes allow users to choose from a collection of options. They are ideal for presenting multiple
 * options in a selectable format, often used for configuration settings or content selection interfaces.
 */
const meta: Meta = {
    title: 'Components/Select Box',
    component: 'swc-select-box',
    argTypes: {
        size: {
            name: 'Size',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
        },
        orientation: {
            name: 'Orientation',
            control: { type: 'select' },
            options: ['vertical', 'horizontal'],
        },
        selected: {
            name: 'Selected',
            control: { type: 'boolean' },
        },
        disabled: {
            name: 'Disabled',
            control: { type: 'boolean' },
        },
        showIllustration: {
            name: 'Show Illustration',
            control: { type: 'boolean' },
        },
        showCheckbox: {
            name: 'Show Checkbox',
            control: { type: 'boolean' },
        },
        emphasized: {
            name: 'Emphasized Checkbox',
            control: { type: 'boolean' },
        },
        label: {
            name: 'Label',
            control: { type: 'text' },
            table: { category: 'Slots' },
        },
        description: {
            name: 'Description',
            control: { type: 'text' },
            table: { category: 'Slots' },
        },
        illustration: {
            name: 'Illustration',
            control: { type: 'text' },
            table: { category: 'Slots' },
        },
    },
    args: {
        label: 'Home address',
        size: 'm',
        orientation: 'vertical',
        selected: false,
        disabled: false,
        showIllustration: true,
        showCheckbox: false,
        emphasized: false,
        description: '',
        illustration: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8461 8H37.1539C40.3826 8 43 10.6863 43 14V14C43 17.3137 40.3826 20 37.1539 20H10.8461C7.61741 20 5 17.3137 5 14V14C5 10.6863 7.61741 8 10.8461 8Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 21V27" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 14H22" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 14H11V14H11V14Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.8461 28H37.1539C40.3826 28 43 30.6863 43 34V34C43 37.3137 40.3826 40 37.1539 40H10.8461C7.61741 40 5 37.3137 5 34V34C5 30.6863 7.61741 28 10.8461 28Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 34H22" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 34H11V34H11V34Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=147054-100043',
        },
    },
    tags: ['migrated'],
};

export default meta;
type Story = StoryObj;
type StoryArgs = StoryObj['args'];

/**
 * @param args - The arguments for the select box as sourced from the storybook args.
 * @returns A lightweight template to render a single select box with bindings to the args.
 */
const BASE_TEMPLATE = (args: StoryArgs = {}) => html`
    <swc-select-box
        size="${args.size || 'm'}"
        orientation="${args.orientation || 'vertical'}"
        .selected=${args.selected}
        .disabled=${args.disabled}
        .showIllustration=${args.showIllustration}
        .showCheckbox=${args.showCheckbox}
        .emphasized=${args.emphasized}
    >
        ${args.illustration && args.showIllustration
            ? html`<span slot="illustration"
                  >${unsafeHTML(args.illustration)}</span
              >`
            : nothing}
        ${args.label}
        ${args.description
            ? html`<span slot="description">${args.description}</span>`
            : nothing}
    </swc-select-box>
`;

/**
 * Select boxes can contain a label, optional illustration, and optional description.
 * They provide clear visual feedback when selected and support keyboard navigation.
 */
export const Default: Story = {
    args: {
        size: 'm',
    },
    render: BASE_TEMPLATE,
};

/**
 * Select boxes can include illustrations or icons to provide visual context for the option.
 * The illustration appears above the label in vertical orientation.
 */
export const WithIllustration: Story = {
    args: {
        showIllustration: true,
        illustration: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8461 8H37.1539C40.3826 8 43 10.6863 43 14V14C43 17.3137 40.3826 20 37.1539 20H10.8461C7.61741 20 5 17.3137 5 14V14C5 10.6863 7.61741 8 10.8461 8Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 21V27" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 14H22" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 14H11V14H11V14Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.8461 28H37.1539C40.3826 28 43 30.6863 43 34V34C43 37.3137 40.3826 40 37.1539 40H10.8461C7.61741 40 5 37.3137 5 34V34C5 30.6863 7.61741 28 10.8461 28Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 34H22" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 34H11V34H11V34Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
    },
    render: BASE_TEMPLATE,
    tags: ['!dev'],
};

/**
 * A checkbox indicator can be displayed to show the selected state more clearly.
 * This is useful when multiple select boxes are presented together.
 */
export const WithCheckbox: Story = {
    args: {
        showCheckbox: true,
        selected: true,
    },
    render: BASE_TEMPLATE,
    tags: ['!dev'],
};

/**
 * The checkbox can be emphasized with blue styling for better visual prominence.
 * This is optimal for forms, settings, lists or grids where checkboxes need to be noticed.
 */
export const WithEmphasizedCheckbox: Story = {
    args: {
        showCheckbox: true,
        emphasized: true,
        selected: true,
    },
    render: BASE_TEMPLATE,
    tags: ['!dev'],
};

/**
 * Select boxes can include additional descriptive text to provide more context about the option.
 */
export const WithDescription: Story = {
    args: {
        description: 'Primary residential address for delivery',
    },
    render: BASE_TEMPLATE,
    tags: ['!dev'],
};

/**
 * Select boxes are available in different sizes to fit various layout needs.
 */
export const Sizes: Story = {
    render: (args) =>
        CONTAINER(
            ['s', 'm', 'l', 'xl'].map((size) =>
                BASE_TEMPLATE({
                    ...args,
                    size,
                    label: `Size ${size?.toUpperCase()}`,
                })
            )
        ),
    tags: ['!dev'],
};

/**
 * Select boxes support both vertical and horizontal orientations for different layout requirements.
 */
export const Orientations: Story = {
    render: (args) =>
        CONTAINER(
            ['vertical', 'horizontal'].map((orientation) =>
                BASE_TEMPLATE({
                    ...args,
                    orientation,
                    label: `${capitalize(orientation)} layout`,
                })
            )
        ),
    tags: ['!dev'],
};

/**
 * Select boxes can be in selected or unselected states, with clear visual feedback.
 */
export const States: Story = {
    render: (args) =>
        CONTAINER([
            BASE_TEMPLATE({
                ...args,
                selected: false,
                label: 'Unselected',
            }),
            BASE_TEMPLATE({
                ...args,
                selected: true,
                label: 'Selected',
                showCheckbox: true,
            }),
            BASE_TEMPLATE({
                ...args,
                disabled: true,
                label: 'Disabled',
            }),
        ]),
    tags: ['!dev'],
};
