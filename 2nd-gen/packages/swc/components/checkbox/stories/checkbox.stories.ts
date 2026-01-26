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

import { Checkbox } from '@adobe/swc/checkbox';

import '@adobe/swc/checkbox';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
    getStorybookHelpers('swc-checkbox');

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Checkbox.VALID_SIZES,
};

args['default-slot'] = 'Checkbox label';

/**
 * Checkboxes allow users to select multiple items from a list of individual items,
 * or to mark one individual item as selected.
 */
const meta: Meta = {
    title: 'Checkbox',
    component: 'swc-checkbox',
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

// ───────────────
//    STORIES
// ───────────────

type CheckboxSize = typeof Checkbox.prototype.size;

/**
 * The default checkbox in its unchecked state.
 */
export const Default: Story = {
    args: {
        size: 'm',
    },
};

/**
 * A checked checkbox.
 */
export const Checked: Story = {
    args: {
        checked: true,
    },
    tags: ['!dev'],
};

/**
 * The indeterminate state is typically used for a "partially checked" state
 * in hierarchical lists where some but not all child items are selected.
 */
export const Indeterminate: Story = {
    args: {
        indeterminate: true,
    },
    tags: ['!dev'],
};

/**
 * The emphasized style provides a more prominent appearance for the checked state.
 */
export const Emphasized: Story = {
    render: () =>
        CONTAINER([
            html`<swc-checkbox>Unchecked</swc-checkbox>`,
            html`<swc-checkbox checked emphasized>Checked</swc-checkbox>`,
            html`<swc-checkbox indeterminate emphasized
                >Indeterminate</swc-checkbox
            >`,
        ]),
    tags: ['!dev'],
};

/**
 * The invalid state indicates that the current selection doesn't meet validation requirements.
 */
export const Invalid: Story = {
    render: () =>
        CONTAINER([
            html`<swc-checkbox invalid>Unchecked</swc-checkbox>`,
            html`<swc-checkbox checked invalid>Checked</swc-checkbox>`,
            html`<swc-checkbox indeterminate invalid
                >Indeterminate</swc-checkbox
            >`,
        ]),
    tags: ['!dev'],
};

/**
 * Disabled checkboxes cannot be interacted with and appear visually muted.
 */
export const Disabled: Story = {
    render: () =>
        CONTAINER([
            html`<swc-checkbox disabled>Unchecked</swc-checkbox>`,
            html`<swc-checkbox checked disabled>Checked</swc-checkbox>`,
            html`<swc-checkbox indeterminate disabled
                >Indeterminate</swc-checkbox
            >`,
        ]),
    tags: ['!dev'],
};

/**
 * Readonly checkboxes can be focused but their checked state cannot be changed by user interaction.
 */
export const Readonly: Story = {
    render: () =>
        CONTAINER([
            html`<swc-checkbox readonly>Unchecked</swc-checkbox>`,
            html`<swc-checkbox checked readonly>Checked</swc-checkbox>`,
            html`<swc-checkbox indeterminate readonly
                >Indeterminate</swc-checkbox
            >`,
        ]),
    tags: ['!dev'],
};

/**
 * Checkboxes are available in four different sizes: s, m (default), l, and xl.
 */
export const Sizes: Story = {
    render: () =>
        CONTAINER(
            Checkbox.VALID_SIZES.map(
                (size) => html`
                    <swc-checkbox size=${size as CheckboxSize} checked
                        >Size ${size}</swc-checkbox
                    >
                `
            )
        ),
    tags: ['!dev'],
};

/**
 * A comprehensive view of all checkbox states.
 */
export const AllStates: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'grid',
                'grid-template-columns': 'repeat(4, auto)',
                gap: 'var(--swc-spacing-200)',
                'align-items': 'center',
            })}
        >
            <div></div>
            <div style=${styleMap({ 'font-weight': 'bold' })}>Default</div>
            <div style=${styleMap({ 'font-weight': 'bold' })}>Checked</div>
            <div style=${styleMap({ 'font-weight': 'bold' })}>
                Indeterminate
            </div>

            <div style=${styleMap({ 'font-weight': 'bold' })}>Standard</div>
            <swc-checkbox>Label</swc-checkbox>
            <swc-checkbox checked>Label</swc-checkbox>
            <swc-checkbox indeterminate>Label</swc-checkbox>

            <div style=${styleMap({ 'font-weight': 'bold' })}>Emphasized</div>
            <swc-checkbox emphasized>Label</swc-checkbox>
            <swc-checkbox checked emphasized>Label</swc-checkbox>
            <swc-checkbox indeterminate emphasized>Label</swc-checkbox>

            <div style=${styleMap({ 'font-weight': 'bold' })}>Invalid</div>
            <swc-checkbox invalid>Label</swc-checkbox>
            <swc-checkbox checked invalid>Label</swc-checkbox>
            <swc-checkbox indeterminate invalid>Label</swc-checkbox>

            <div style=${styleMap({ 'font-weight': 'bold' })}>Disabled</div>
            <swc-checkbox disabled>Label</swc-checkbox>
            <swc-checkbox checked disabled>Label</swc-checkbox>
            <swc-checkbox indeterminate disabled>Label</swc-checkbox>

            <div style=${styleMap({ 'font-weight': 'bold' })}>Readonly</div>
            <swc-checkbox readonly>Label</swc-checkbox>
            <swc-checkbox checked readonly>Label</swc-checkbox>
            <swc-checkbox indeterminate readonly>Label</swc-checkbox>
        </div>
    `,
    tags: ['!dev'],
};

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────

function CONTAINER(content: TemplateResult<1>[]): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'flex',
            'flex-direction': 'column',
            gap: 'var(--swc-spacing-200)',
            'align-items': 'flex-start',
            'max-inline-size': '80ch',
        })}
    >
        ${content}
    </div>`;
}
