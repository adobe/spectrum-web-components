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

// Icon SVG strings — include slot="icon" so they work with both the template()
// helper (via the 'icon-slot' arg) and unsafeHTML() in hand-authored field markup.
const chevronIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z"/></svg>`;
const addIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M16 16V4.5a2 2 0 0 1 4 0V16h11.5a2 2 0 0 1 0 4H20v11.5a2 2 0 0 1-4 0V20H4.5a2 2 0 0 1 0-4Z"/></svg>`;
const removeIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><rect x="4" y="16" width="28" height="4" rx="2"/></svg>`;
const crossIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M20.5 18l8.2-8.2a1.8 1.8 0 1 0-2.5-2.5L18 15.5 9.8 7.3a1.8 1.8 0 0 0-2.5 2.5L15.5 18l-8.2 8.2a1.8 1.8 0 1 0 2.5 2.5L18 20.5l8.2 8.2a1.8 1.8 0 1 0 2.5-2.5Z"/></svg>`;

// Field context helpers — show swc-infield-button inside a labelled native field,
// mirroring real-world usage where the parent field owns focus and the focus ring.

const pickerField = (
  id: string,
  labelText: string,
  value: string,
  size: InfieldButtonSize = 'm',
  disabled = false
) => html`
  <div
    style="display:flex;flex-direction:column;gap:4px;min-inline-size:220px;"
  >
    <label
      for=${id}
      style="font-size:11px;font-weight:700;letter-spacing:0.06em;"
    >
      ${labelText}
    </label>
    <div
      style="display:flex;align-items:center;border:1px solid var(--spectrum-gray-400,#b0b0b0);border-radius:4px;overflow:hidden;"
    >
      <input
        id=${id}
        type="text"
        .value=${value}
        readonly
        ?disabled=${disabled}
        style="flex:1;border:none;outline:none;padding:7px 8px;font-size:14px;background:transparent;min-inline-size:0;color:inherit;"
      />
      <swc-infield-button
        accessible-label="Open ${labelText.toLowerCase()} picker"
        size=${size}
        ?disabled=${disabled}
      >
        ${unsafeHTML(chevronIconSvg)}
      </swc-infield-button>
    </div>
  </div>
`;

const searchField = (id: string, labelText: string, value: string) => html`
  <div
    style="display:flex;flex-direction:column;gap:4px;min-inline-size:220px;"
  >
    <label
      for=${id}
      style="font-size:11px;font-weight:700;letter-spacing:0.06em;"
    >
      ${labelText}
    </label>
    <div
      style="display:flex;align-items:center;border:1px solid var(--spectrum-gray-400,#b0b0b0);border-radius:4px;overflow:hidden;"
    >
      <input
        id=${id}
        type="search"
        .value=${value}
        style="flex:1;border:none;outline:none;padding:7px 8px;font-size:14px;background:transparent;min-inline-size:0;color:inherit;"
      />
      <swc-infield-button
        accessible-label="Clear ${labelText.toLowerCase()} search"
      >
        ${unsafeHTML(crossIconSvg)}
      </swc-infield-button>
    </div>
  </div>
`;

const stepperField = (
  id: string,
  labelText: string,
  value: number,
  size: InfieldButtonSize = 'm',
  disabled = false
) => html`
  <div
    style="display:flex;flex-direction:column;gap:4px;min-inline-size:160px;"
  >
    <label
      for=${id}
      style="font-size:11px;font-weight:700;letter-spacing:0.06em;"
    >
      ${labelText}
    </label>
    <div
      style="display:flex;align-items:center;border:1px solid var(--spectrum-gray-400,#b0b0b0);border-radius:4px;overflow:hidden;"
    >
      <swc-infield-button
        accessible-label="Decrement ${labelText.toLowerCase()}"
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
        style="flex:1;border:none;outline:none;padding:7px 8px;font-size:14px;background:transparent;text-align:center;min-inline-size:0;color:inherit;-moz-appearance:textfield;"
      />
      <swc-infield-button
        accessible-label="Increment ${labelText.toLowerCase()}"
        size=${size}
        ?disabled=${disabled}
      >
        ${unsafeHTML(addIconSvg)}
      </swc-infield-button>
    </div>
  </div>
`;

/**
 * A compact icon button embedded inside a form field. Infield buttons are clickable via
 * pointer only; keyboard behavior and the visible focus ring are owned by the parent field.
 * Common affordances include disclosure (picker/combobox), clear (search/text field), and
 * increment/decrement (number field stepper pair).
 */
const meta: Meta = {
  title: 'Infield Button',
  component: 'swc-infield-button',
  args,
  argTypes,
  render: (args) => template(args),
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
