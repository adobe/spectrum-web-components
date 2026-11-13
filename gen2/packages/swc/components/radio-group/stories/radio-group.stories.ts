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

import { RADIO_GROUP_STATUSES } from '@adobe/spectrum-wc-core/components/radio-group/index.js';

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-radio-group');

argTypes['field-status'] = {
  ...argTypes['field-status'],
  control: { type: 'select' },
  options: [undefined, ...RADIO_GROUP_STATUSES],
};
args['field-status'] = undefined;

/**
 * Groups `swc-radio` items into a single selection that submits to forms under
 * one name. `swc-radio` is only supported inside a radio group.
 */
const meta: Meta = {
  title: 'Radio group',
  component: 'swc-radio-group',
  args,
  argTypes,
  render: (args) => html`
    ${group(args, { selected: 'standard' })}
  `,
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: 'A set of options where only one can be selected',
    },
    additionalApiTables: ['swc-radio'],
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

/** Adds the item's `description` slot when `description` is set. */
const radio = (
  value: string,
  label: string,
  attributes = '',
  description: string | null = null
): string => `
  <swc-radio value="${value}" ${attributes}>
    <span slot="label">${label}</span>
    ${description === null ? '' : `<span slot="description">${description}</span>`}
  </swc-radio>
`;

const SHIPPING_OPTIONS = [
  ['standard', 'Standard Shipping (Free)', 'Delivers in 5–7 business days'],
  ['expedited', 'Expedited Shipping ($9.99)', 'Delivers in 2–3 business days'],
  ['overnight', 'Overnight Shipping ($19.99)', 'Next-day delivery'],
] as const;

const ITEMS = [
  ...SHIPPING_OPTIONS.map(([value, label, description]) =>
    radio(value, label, '', description)
  ),
].join('');

const SPORTS = [
  ['soccer', 'Soccer'],
  ['baseball', 'Baseball'],
  ['basketball', 'Basketball'],
] as const;

const SPORT_ITEMS = SPORTS.map(([value, label]) => radio(value, label)).join(
  ''
);

const SIZES = ['s', 'm', 'l', 'xl'] as const;

const SPORT_ITEMS_HTML = html`
  ${SPORTS.map(
    ([value, label]) => html`
      <swc-radio value=${value}><span slot="label">${label}</span></swc-radio>
    `
  )}
`;

// Use `''` to omit a slot; `undefined` renders the text "undefined".
const group = (
  args: Record<string, unknown>,
  overrides: Record<string, unknown> = {}
) =>
  template({
    ...args,
    'label-slot': 'Shipping options',
    'description-slot': 'Choose how fast your order arrives.',
    'default-slot': ITEMS,
    ...overrides,
  });

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    selected: 'standard',
    'label-slot': 'Shipping options',
    'description-slot': 'Choose how fast your order arrives.',
    'error-text-slot': 'Overnight shipping is not available for this address.',
    'default-slot': ITEMS,
  },
  render: (args) => template(args),
  parameters: {
    styles: { maxInlineSize: '240px' },
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${group(args, {
      selected: 'standard',
      'default-slot': [
        radio(
          'standard',
          'Standard Shipping (Free)',
          '',
          'Delivers in 5–7 business days'
        ),
        radio('expedited', 'Expedited Shipping ($9.99)'),
      ].join(''),
    })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Labelling: Story = {
  render: () => html`
    <section style="display: grid; gap: var(--swc-spacing-100);">
      <h4 id="labelling-heading" class="swc-Heading swc-Heading--sizeXS">
        accessible-labelledby attribute
      </h4>
      <swc-radio-group
        accessible-labelledby="labelling-heading"
        selected="soccer"
      >
        ${SPORT_ITEMS_HTML}
      </swc-radio-group>
    </section>
    <swc-radio-group
      accessible-label="accessible-label attribute"
      selected="soccer"
    >
      ${SPORT_ITEMS_HTML}
    </swc-radio-group>
    <swc-radio-group selected="soccer">
      <span slot="label">Slotted label</span>
      ${SPORT_ITEMS_HTML}
    </swc-radio-group>
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)', alignItems: 'start' },
  },
  tags: ['options'],
};

export const Sizes: Story = {
  render: (args) => html`
    ${SIZES.map(
      (size) => html`
        ${group(args, {
          size,
          selected: 'baseball',
          'label-slot': `Size ${size}`,
          'description-slot': '',
          'default-slot': SPORT_ITEMS,
        })}
      `
    )}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)', alignItems: 'start' },
  },
  tags: ['options'],
};

export const LabelPosition: Story = {
  render: (args) => html`
    ${group(args, {
      'label-position': 'top',
      'label-slot': 'Top label',
      selected: 'soccer',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      'label-position': 'side',
      'label-slot': 'Side label',
      selected: 'soccer',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: { gap: 'var(--swc-spacing-500)', minInlineSize: '25ch' },
  },
  tags: ['options'],
};
LabelPosition.storyName = 'Label position';

export const NecessityIndicator: Story = {
  render: (args) => html`
    ${group(args, {
      required: true,
      'necessity-indicator': 'icon',
      'label-slot': 'Icon',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      required: true,
      'necessity-indicator': 'label',
      'label-slot': 'Label',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      'necessity-indicator': 'label',
      'label-slot': 'Label',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['options'],
};
NecessityIndicator.storyName = 'Necessity indicator';

export const Orientation: Story = {
  render: (args) => html`
    ${group(args, {
      orientation: 'vertical',
      'label-slot': 'Vertical',
      selected: 'soccer',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      orientation: 'horizontal',
      'label-slot': 'Horizontal',
      selected: 'soccer',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['options'],
};

export const Emphasized: Story = {
  render: (args) => html`
    ${group(args, {
      'label-slot': 'Default',
      selected: 'soccer',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      'label-slot': 'Emphasized',
      emphasized: true,
      selected: 'soccer',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Selection: Story = {
  render: (args) => html`
    ${group(args, {
      'label-slot': 'Nothing selected',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      'label-slot': 'Baseball selected',
      selected: 'baseball',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['states'],
};

export const Disabled: Story = {
  render: (args) => html`
    ${group(args, {
      'field-status': 'disabled',
      'label-slot': 'Disabled group',
      selected: 'baseball',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
    })}
    ${group(args, {
      'label-slot': 'Disabled item',
      selected: 'soccer',
      'description-slot': '',
      'default-slot': [
        radio('soccer', 'Soccer'),
        radio('baseball', 'Baseball', 'disabled'),
        radio('basketball', 'Basketball'),
      ].join(''),
    })}
  `,
  // Skipped: axe flags disabled text contrast, which WCAG 1.4.3 exempts.
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)', alignItems: 'start' },
  },
  tags: ['states', '!test'],
};

export const Invalid: Story = {
  render: (args) => html`
    ${group(args, {
      'field-status': 'invalid',
      selected: 'overnight',
      'error-text-slot':
        'Overnight shipping is not available for this address.',
    })}
  `,
  tags: ['states'],
};

export const ReadOnly: Story = {
  render: (args) => html`
    ${group(args, {
      'field-status': 'readonly',
      'label-slot': 'Favorite sport',
      'description-slot': '',
      'default-slot': SPORT_ITEMS,
      selected: 'baseball',
    })}
  `,
  tags: ['states'],
};
ReadOnly.storyName = 'Read-only';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <div style="display: grid; gap: var(--swc-spacing-100);">
      <p id="accessibility-delivery-note" style="margin: 0;">
        Delivery times exclude weekends and holidays.
      </p>
      <swc-radio-group
        accessible-describedby="accessibility-delivery-note"
        selected="standard"
      >
        <span slot="label">Shipping options</span>
        <span slot="description">
          You can change this until the order ships.
        </span>
        <swc-radio value="standard">
          <span slot="label">Standard Shipping</span>
          <span slot="description">Delivers in 5–7 business days</span>
        </swc-radio>
        <swc-radio value="expedited">
          <span slot="label">Expedited Shipping</span>
          <span slot="description">Delivers in 2–3 business days</span>
        </swc-radio>
        <swc-radio value="overnight">
          <span slot="label">Overnight Shipping</span>
          <span slot="description">Next-day delivery</span>
        </swc-radio>
      </swc-radio-group>
    </div>
  `,
  parameters: {
    styles: { 'max-inline-size': '40ch' },
  },
  tags: ['a11y'],
};
