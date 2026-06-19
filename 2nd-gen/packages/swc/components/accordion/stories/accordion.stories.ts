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

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  ACCORDION_DENSITIES,
  ACCORDION_VALID_SIZES,
  SWC_ACCORDION_ITEM_AFTER_CLOSE_EVENT,
  SWC_ACCORDION_ITEM_AFTER_OPEN_EVENT,
  SWC_ACCORDION_ITEM_CLOSE_EVENT,
  SWC_ACCORDION_ITEM_OPEN_EVENT,
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from '../../../../core/components/accordion/Accordion.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-accordion');

// swc-accordion-item exposes its styling hooks as CSS custom properties. They
// inherit, so setting them on an ancestor of the items cascades to every item.
// Pull just the item's CSS custom property controls (auto-derived from the
// manifest, so they stay in sync) and relabel them under their own category.
// They are attached to the Playground story and applied via an inheriting
// wrapper in its render, so they affect all items uniformly.
const itemHelpers = getStorybookHelpers('swc-accordion-item');
const itemCssArgTypes = Object.fromEntries(
  Object.entries(itemHelpers.argTypes ?? {})
    .filter(([, argType]) => argType?.table?.category === 'css properties')
    .map(([name, argType]) => [
      name,
      {
        ...argType,
        table: { ...argType.table, category: 'css properties (item)' },
      },
    ])
);

// Seed each item CSS custom property with an empty string so Storybook renders
// an editable field immediately instead of a "Set string" placeholder button.
// Empty values are filtered out before they reach the DOM (see the Playground
// render).
const itemCssArgs = Object.fromEntries(
  Object.keys(itemCssArgTypes).map((name) => [name, ''])
);

argTypes.density = {
  ...argTypes.density,
  control: { type: 'select' },
  options: [...ACCORDION_DENSITIES],
  table: {
    ...argTypes.density?.table,
    category: 'attributes',
    defaultValue: { summary: 'regular' },
  },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ['', ...ACCORDION_VALID_SIZES],
  table: {
    ...argTypes.size?.table,
    category: 'attributes',
  },
};

argTypes.level = {
  ...argTypes.level,
  control: { type: 'number', min: 2, max: 6 },
  table: {
    ...argTypes.level?.table,
    category: 'attributes',
    defaultValue: { summary: '3' },
  },
};

const content = {
  personal: html`
    <p>Manage your name, email address, and contact details.</p>
  `,
  billing: html`
    <p>
      Your billing address is used to verify your payment method and calculate
      taxes.
    </p>
  `,
  shipping: html`
    <p>Physical products and documents are sent to this address.</p>
  `,
  payment: html`
    <p>Contact your administrator to update payment information.</p>
  `,
};

const defaultItems = html`
  <swc-accordion-item>
    <span slot="label">Personal information</span>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item open>
    <span slot="label">Billing address</span>
    ${content.billing}
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Shipping address</span>
    ${content.shipping}
  </swc-accordion-item>
`;

/**
 * An accordion groups related content sections, each behind a header that can
 * be expanded or collapsed. Only one section is open at a time by default;
 * set `allow-multiple` to let any number of sections be open simultaneously.
 *
 * Items support an **`actions` slot** for placing interactive controls (such
 * as an edit button) directly in the header row, outside the toggle button so
 * they remain independently clickable.
 */
const meta: Meta = {
  title: 'Accordion',
  component: 'swc-accordion',
  args,
  argTypes,
  render: (args) => template(args, defaultItems),
  parameters: {
    layout: 'padded',
    actions: {
      handles: [
        SWC_ACCORDION_ITEM_TOGGLE_EVENT,
        SWC_ACCORDION_ITEM_OPEN_EVENT,
        SWC_ACCORDION_ITEM_CLOSE_EVENT,
        SWC_ACCORDION_ITEM_AFTER_OPEN_EVENT,
        SWC_ACCORDION_ITEM_AFTER_CLOSE_EVENT,
      ],
    },
    docs: {
      subtitle: 'Groups related content sections behind expandable headers.',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=124732-6479&m=dev',
    },
    // TODO: replace with the accordion Stackblitz project URL (resolved in PR).
    stackblitz: {
      url: '',
    },
    // swc-accordion-item is a second element of this component; surface its API
    // table alongside swc-accordion's on the docs page.
    additionalApiTables: ['swc-accordion-item'],
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    density: 'regular',
    ...itemCssArgs,
  },
  argTypes: itemCssArgTypes,
  render: (args) => {
    // Item-level CSS custom properties (the `--*` args) are applied on a
    // wrapper so they inherit into every slotted item; the remaining args drive
    // the accordion element itself.
    const itemStyle = Object.entries(args)
      .filter(([key, value]) => key.startsWith('--') && value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
    const elementArgs = Object.fromEntries(
      Object.entries(args).filter(([key]) => !key.startsWith('--'))
    );
    return html`
      <div style=${itemStyle}>${template(elementArgs, defaultItems)}</div>
    `;
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    density: 'regular',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

const anatomyItems = html`
  <swc-accordion-item open>
    <span slot="label">Personal information</span>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Billing address</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
    >
      Edit
    </swc-button>
    ${content.billing}
  </swc-accordion-item>
`;

export const Anatomy: Story = {
  render: (args) => template(args, anatomyItems),
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${ACCORDION_VALID_SIZES.map(
        (size) => html`
          ${template(
            { ...args, size },
            html`
              <swc-accordion-item>
                <span slot="label">Personal information (size=${size})</span>
                ${content.personal}
              </swc-accordion-item>
            `
          )}
        `
      )}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['options'],
  parameters: { 'section-order': 1 },
};

export const Density: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${ACCORDION_DENSITIES.map(
        (density) => html`
          ${template(
            { ...args, density },
            html`
              <swc-accordion-item>
                <span slot="label">
                  Personal information (density=${density})
                </span>
                ${content.personal}
              </swc-accordion-item>
            `
          )}
        `
      )}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['options'],
  parameters: { 'section-order': 2 },
};

export const Quiet: Story = {
  render: (args) => template({ ...args, quiet: true }, defaultItems),
  args: { density: 'regular' },
  tags: ['options'],
  parameters: { 'section-order': 3 },
};

export const HeadingLevel: Story = {
  render: (args) => template({ ...args, level: 2 }, defaultItems),
  args: { density: 'regular' },
  tags: ['options'],
  parameters: { 'section-order': 4 },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

const stateItems = html`
  <swc-accordion-item>
    <span slot="label">Personal information</span>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item open>
    <span slot="label">Billing address</span>
    ${content.billing}
  </swc-accordion-item>
  <swc-accordion-item disabled>
    <span slot="label">Payment method</span>
    ${content.payment}
  </swc-accordion-item>
`;

export const ItemStates: Story = {
  render: (args) => template({ ...args, 'allow-multiple': true }, stateItems),
  args: { density: 'regular' },
  tags: ['states'],
  parameters: { 'section-order': 1 },
};

export const DisabledAccordion: Story = {
  render: (args) => template({ ...args, disabled: true }, defaultItems),
  args: { density: 'regular' },
  tags: ['states'],
  parameters: { 'section-order': 2 },
};

export const MixedDisabledStates: Story = {
  render: (args) =>
    template(
      { ...args, disabled: true, 'allow-multiple': true },
      html`
        <swc-accordion-item open>
          <span slot="label">Personal information</span>
          ${content.personal}
        </swc-accordion-item>
        <swc-accordion-item>
          <span slot="label">Billing address</span>
          ${content.billing}
        </swc-accordion-item>
        <swc-accordion-item disabled>
          <span slot="label">Payment method</span>
          ${content.payment}
        </swc-accordion-item>
      `
    ),
  args: { density: 'regular' },
  tags: ['states'],
  parameters: { 'section-order': 3 },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

const directActionsItems = html`
  <swc-accordion-item open>
    <span slot="label">Personal information</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      accessible-label="Edit personal information"
    >
      Edit
    </swc-button>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Billing address</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      accessible-label="Edit billing address"
    >
      Edit
    </swc-button>
    ${content.billing}
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Shipping address</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      accessible-label="Edit shipping address"
    >
      Edit
    </swc-button>
    ${content.shipping}
  </swc-accordion-item>
`;

export const DirectActions: Story = {
  render: (args) => template(args, directActionsItems),
  args: { density: 'regular' },
  tags: ['behaviors'],
  parameters: { 'section-order': 1 },
};

const allowMultipleItems = html`
  <swc-accordion-item open>
    <span slot="label">Personal information</span>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item open>
    <span slot="label">Billing address</span>
    ${content.billing}
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Shipping address</span>
    ${content.shipping}
  </swc-accordion-item>
`;

export const AllowMultiple: Story = {
  render: (args) =>
    template({ ...args, 'allow-multiple': true }, allowMultipleItems),
  args: { density: 'regular' },
  tags: ['behaviors'],
  parameters: { 'section-order': 2 },
};

export const ToggleEvent: Story = {
  render: (args) => template(args, defaultItems),
  args: { density: 'regular' },
  tags: ['behaviors'],
  parameters: { 'section-order': 3 },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

const a11yItems = html`
  <swc-accordion-item open>
    <span slot="label">Personal information</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      accessible-label="Edit personal information"
    >
      Edit
    </swc-button>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Billing address</span>
    ${content.billing}
  </swc-accordion-item>
  <swc-accordion-item disabled>
    <span slot="label">Payment method</span>
    ${content.payment}
  </swc-accordion-item>
`;

export const Accessibility: Story = {
  render: (args) => template(args, a11yItems),
  args: { density: 'regular', level: 3 },
  tags: ['a11y'],
};
