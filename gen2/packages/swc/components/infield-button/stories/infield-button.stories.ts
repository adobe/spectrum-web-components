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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  INFIELD_BUTTON_VALID_SIZES,
  type InfieldButtonSize,
} from '@adobe/spectrum-wc-core/components/infield-button';

import '@adobe/spectrum-wc/components/infield-button/swc-infield-button.js';
import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-infield-button');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: INFIELD_BUTTON_VALID_SIZES,
};

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<InfieldButtonSize, string>;

// S2 UI chevron (right-pointing) rotated 90° clockwise to point down for picker disclosure.
const chevronIconSvg = `<swc-ui-icon slot="icon" icon="chevron" style="rotate: 90deg;"></swc-ui-icon>`;
const addIconSvg = `<swc-ui-icon slot="icon" icon="add"></swc-ui-icon>`;
const removeIconSvg = `<swc-ui-icon slot="icon" icon="dash"></swc-ui-icon>`;
const crossIconSvg = `<swc-ui-icon slot="icon" icon="cross"></swc-ui-icon>`;

// ──────────────────────────────────────────────────
//    REUSABLE FIELD TEMPLATE
// ──────────────────────────────────────────────────

// Single function renders the labelled field wrapper for all three field types.
// Stepper: decrement | input | increment (standard stepper layout).
//
// TODO: Replace the native <label> and <input> elements with <swc-text-field>,
// <swc-search>, and <swc-number-field> once those components are migrated to gen2.

type FieldType = 'picker' | 'search' | 'stepper';

interface FieldConfig {
  id: string;
  label: string;
  value: string | number;
  type: FieldType;
  size?: InfieldButtonSize;
  disabled?: boolean;
}

const renderField = ({
  id,
  label,
  value,
  type,
  size = 'm',
  disabled = false,
}: FieldConfig) => {
  const inputStyle =
    'flex:1;border:none;outline:none;background:transparent;min-inline-size:0;color:inherit;';

  const trailingButton =
    type === 'picker'
      ? html`
          <swc-infield-button
            accessible-label="Open ${label.toLowerCase()} picker"
            size=${size}
            ?disabled=${disabled}
          >
            ${unsafeHTML(chevronIconSvg)}
          </swc-infield-button>
        `
      : type === 'search'
        ? html`
            <swc-infield-button
              accessible-label="Clear ${label.toLowerCase()} search"
            >
              ${unsafeHTML(crossIconSvg)}
            </swc-infield-button>
          `
        : null;

  return html`
    <div
      style="display:flex;flex-direction:column;gap:4px;min-inline-size:${type ===
      'stepper'
        ? '180px'
        : '220px'};"
    >
      <label
        for=${id}
        style="font-size:var(--spectrum-font-size-75,12px);font-weight:var(--spectrum-regular-font-weight,400);color:inherit;"
      >
        ${label}
      </label>
      <div
        style="display:flex;align-items:stretch;padding:6px;border:1px solid var(--spectrum-gray-300,#cacaca);border-radius:var(--spectrum-corner-radius-100,4px);overflow:hidden;"
      >
        ${type === 'stepper'
          ? html`
              <swc-infield-button
                accessible-label="Decrement ${label.toLowerCase()}"
                size=${size}
                ?disabled=${disabled}
              >
                ${unsafeHTML(removeIconSvg)}
              </swc-infield-button>
              <input
                id=${id}
                type="number"
                .value=${String(value)}
                ?disabled=${disabled}
                style=${inputStyle +
                '-moz-appearance:textfield;text-align:center;'}
              />
              <swc-infield-button
                accessible-label="Increment ${label.toLowerCase()}"
                size=${size}
                ?disabled=${disabled}
              >
                ${unsafeHTML(addIconSvg)}
              </swc-infield-button>
            `
          : html`
              <input
                id=${id}
                type=${type === 'search' ? 'search' : 'text'}
                .value=${String(value)}
                ?readonly=${type === 'picker'}
                ?disabled=${disabled}
                style=${inputStyle}
              />
              ${trailingButton}
            `}
      </div>
    </div>
  `;
};

const pickerField = (
  id: string,
  label: string,
  value: string,
  size: InfieldButtonSize = 'm',
  disabled = false
) => renderField({ id, label, value, type: 'picker', size, disabled });

const searchField = (id: string, label: string, value: string) =>
  renderField({ id, label, value, type: 'search' });

const stepperField = (
  id: string,
  label: string,
  value: number,
  size: InfieldButtonSize = 'm',
  disabled = false
) => renderField({ id, label, value, type: 'stepper', size, disabled });

/**
 * A compact icon button embedded inside a form field. Infield buttons are clickable via
 * pointer only; keyboard behavior and the visible focus ring are owned by the parent field.
 * Common affordances include disclosure (picker/combobox), clear (search/text field), and
 * increment/decrement (number field stepper pair).
 */
const meta: Meta = {
  title: 'Infield button',
  component: 'swc-infield-button',
  args,
  argTypes,
  render: (args) => template(args),
  decorators: [
    (story) => html`
      <style>
        /* Hide browser-native spinner controls on story number inputs */
        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Hide browser-native clear button on story search inputs */
        input[type='search']::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      </style>
      ${story()}
    `,
  ],
  parameters: {
    docs: {
      subtitle: 'Icon button embedded inside a form field',
    },
    // TODO: add Figma and Stackblitz links
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    'accessible-label': 'Open picker',
    'icon-slot': chevronIconSvg,
    size: 'm',
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => pickerField('overview-country', 'Country', 'United States'),
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    ${pickerField('anatomy-country', 'Country', 'United States')}
    ${searchField('anatomy-keyword', 'Keyword', 'Spectrum')}
    ${stepperField('anatomy-quantity', 'Quantity', 5)}
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${INFIELD_BUTTON_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        'accessible-label': `${sizeLabels[size]} open picker`,
        'icon-slot': chevronIconSvg,
      })
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Quiet: Story = {
  render: (args) => html`
    ${template({
      ...args,
      quiet: false,
      'accessible-label': 'Open picker (default)',
      'icon-slot': chevronIconSvg,
    })}
    ${template({
      ...args,
      quiet: true,
      'accessible-label': 'Open picker (quiet)',
      'icon-slot': chevronIconSvg,
    })}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'accessible-label': 'Open picker',
      'icon-slot': chevronIconSvg,
    })}
    ${template({
      ...args,
      disabled: true,
      'accessible-label': 'Open picker (disabled)',
      'icon-slot': chevronIconSvg,
    })}
    ${template({
      ...args,
      quiet: true,
      'accessible-label': 'Open picker (quiet)',
      'icon-slot': chevronIconSvg,
    })}
    ${template({
      ...args,
      quiet: true,
      disabled: true,
      'accessible-label': 'Open picker (quiet disabled)',
      'icon-slot': chevronIconSvg,
    })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    ${pickerField('a11y-country', 'Country', 'United States')}
    ${searchField('a11y-keyword', 'Keyword', 'Spectrum')}
    ${stepperField('a11y-quantity', 'Quantity', 5)}
  `,
  tags: ['a11y'],
  parameters: { flexLayout: 'row-wrap' },
};
