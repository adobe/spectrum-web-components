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
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from '../../../../core/components/accordion/Accordion.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-accordion');

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
  personal: 'Manage your name, email address, and contact details.',
  billing:
    'Your billing address is used to verify your payment method and calculate taxes.',
  shipping: 'Physical products and documents are sent to this address.',
  payment: 'Contact your administrator to update payment information.',
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
 * Items support an **`actions` slot** for placing interactive controls — such
 * as an edit button — directly in the header row, outside the toggle button so
 * they remain independently clickable.
 */
const meta: Meta = {
  title: 'Accordion',
  component: 'swc-accordion',
  args,
  argTypes,
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template(args, defaultItems)}
    </div>
  `,
  parameters: {
    layout: 'centered',
    actions: { handles: [SWC_ACCORDION_ITEM_TOGGLE_EVENT] },
    docs: {
      subtitle: 'Groups related content sections behind expandable headers.',
    },
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
  },
  tags: ['autodocs', 'dev'],
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

/**
 * A `<swc-accordion>` item exposes three content surfaces:
 *
 * - **`label` slot**: The heading text shown in the collapsed and expanded header
 * - **`actions` slot**: Optional interactive controls placed outside the toggle
 *   button so they remain independently clickable (see the second item below)
 * - **Default slot**: The panel body revealed when the item expands
 */
export const Anatomy: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template(args, anatomyItems)}
    </div>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Accordions come in four sizes to fit different layout contexts.
 */
export const Sizes: Story = {
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; inline-size: 720px; max-inline-size: 100%;"
    >
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

/**
 * Density controls the vertical spacing between items and within each header.
 *
 * - **Compact**: Tighter spacing for data-dense interfaces
 * - **Regular**: The default, suitable for most contexts
 * - **Spacious**: More breathing room for content-focused layouts
 */
export const Density: Story = {
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; inline-size: 720px; max-inline-size: 100%;"
    >
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

/**
 * The `quiet` variant removes the divider borders for a lighter visual style,
 * and adds rounded corners on hover for a contained feel.
 */
export const Quiet: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template({ ...args, quiet: true }, defaultItems)}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['options'],
  parameters: { 'section-order': 3 },
};

/**
 * The `level` attribute sets the heading level (h2–h6) applied to every item
 * header. Use it to fit the accordion into the surrounding page heading
 * hierarchy without changing the visual style.
 */
export const HeadingLevel: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template({ ...args, level: 2 }, defaultItems)}
    </div>
  `,
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

/**
 * Items can be in a default (collapsed), open (expanded), or disabled state.
 * A disabled item remains in the tab order but its toggle is blocked.
 */
export const ItemStates: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template({ ...args, 'allow-multiple': true }, stateItems)}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['states'],
  parameters: { 'section-order': 1 },
};

/**
 * Setting `disabled` on the `<swc-accordion>` parent disables all items at
 * once without overwriting individual item disabled state. Re-enabling the
 * accordion restores each item's original state.
 */
export const DisabledAccordion: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template({ ...args, disabled: true }, defaultItems)}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['states'],
  parameters: { 'section-order': 2 },
};

/**
 * When the accordion host is `disabled`, all items become non-interactive
 * regardless of their individual `disabled` state. Per-item `disabled` is
 * preserved underneath: toggle the **disabled** control off and the third
 * item remains disabled while the first two become interactive again.
 *
 * This separation means an item that was already disabled before the
 * host was disabled does not silently become enabled when the host
 * is re-enabled.
 */
export const MixedDisabledStates: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template(
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
      )}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['states'],
  parameters: { 'section-order': 3 },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

const directActionsItems = html`
  <swc-accordion-item open>
    <span id="label-personal" slot="label">Personal information</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      aria-describedby="label-personal"
    >
      Edit
    </swc-button>
    ${content.personal}
  </swc-accordion-item>
  <swc-accordion-item>
    <span id="label-billing" slot="label">Billing address</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      aria-describedby="label-billing"
    >
      Edit
    </swc-button>
    ${content.billing}
  </swc-accordion-item>
  <swc-accordion-item>
    <span id="label-shipping" slot="label">Shipping address</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      aria-describedby="label-shipping"
    >
      Edit
    </swc-button>
    ${content.shipping}
  </swc-accordion-item>
`;

/**
 * Place interactive controls in the **`actions` slot** to render them inline
 * with the heading, outside the toggle button. This keeps them independently
 * clickable without expanding or collapsing the item.
 *
 * The component automatically stops click and keydown propagation from the
 * actions container so action buttons never accidentally trigger the toggle.
 */
export const DirectActions: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template(args, directActionsItems)}
    </div>
  `,
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

/**
 * By default only one item may be open at a time; opening a new item closes
 * the previously open one. Set `allow-multiple` to allow any number of items
 * to be open simultaneously.
 */
export const AllowMultiple: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template({ ...args, 'allow-multiple': true }, allowMultipleItems)}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['behaviors'],
  parameters: { 'section-order': 2 },
};

/**
 * Every expand or collapse dispatches a `swc-accordion-item-toggle` event from
 * the item. The event bubbles and is composed, so a single listener on the
 * `<swc-accordion>` can observe all items. It is cancelable; calling
 * `preventDefault()` reverts the open state.
 *
 * Open the **Actions** panel in Storybook to observe events as you interact
 * with the accordion below.
 */
export const ToggleEvent: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template(args, defaultItems)}
    </div>
  `,
  args: { density: 'regular' },
  tags: ['behaviors'],
  parameters: { 'section-order': 3 },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

const a11yItems = html`
  <swc-accordion-item open>
    <span id="a11y-label-personal" slot="label">Personal information</span>
    <swc-button
      slot="actions"
      variant="secondary"
      fill-style="outline"
      size="s"
      aria-describedby="a11y-label-personal"
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

/**
 * ### Features
 *
 * The `<swc-accordion>` and `<swc-accordion-item>` elements implement several
 * accessibility features:
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd>: Moves focus to the next focusable element; header buttons
 *   and `actions` slot controls each have their own tab stop
 * - <kbd>Enter</kbd> or <kbd>Space</kbd>: Expands or collapses the focused header
 * - <kbd>Tab</kbd> past an actions button: Continues to the next item header
 *   without affecting accordion state
 *
 * #### ARIA implementation
 *
 * 1. **Role**: Each header is a `<button>` inside a heading element (`h2`–`h6`,
 *    controlled by the `level` attribute), satisfying the disclosure widget pattern
 * 2. **Expanded state**: `aria-expanded="true/false"` on the header button
 *    announces open or closed to screen readers
 * 3. **Panel region**: The content `<div>` carries `role="region"` and
 *    `aria-labelledby` pointing to its header button, naming the region for
 *    landmark navigation
 * 4. **Disabled state**: `aria-disabled="true"` is set instead of the native
 *    `disabled` attribute, keeping the header in the tab order while blocking
 *    toggle interactions
 * 5. **Actions isolation**: Clicks and keydown events on the actions container
 *    are stopped from propagating, so action buttons never accidentally trigger
 *    the accordion toggle
 *
 * ### Best practices
 *
 * - Set the `level` attribute to match the surrounding page heading hierarchy
 *   so the structure makes sense to screen reader users navigating by headings
 * - Provide a descriptive `label` slot value that identifies the section
 *   content; avoid generic labels like "Section 1"
 * - When using the `actions` slot, give each button a visible label or
 *   `aria-label` that conveys its purpose independent of the heading text
 */
export const Accessibility: Story = {
  render: (args) => html`
    <div style="inline-size: 720px; max-inline-size: 100%;">
      ${template(args, a11yItems)}
    </div>
  `,
  args: { density: 'regular', level: 3 },
  tags: ['a11y'],
};
