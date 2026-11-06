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
import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';

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
    ${group(args, { selected: '1' })}
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

/** `description: null` omits the item description. */
const radio = (
  value: string,
  label: string,
  attributes = '',
  description: string | null = `Description for ${label}`
): string => `
  <swc-radio value="${value}" ${attributes}>
    <span slot="label">${label}</span>
    ${description === null ? '' : `<span slot="description">${description}</span>`}
  </swc-radio>
`;

const ITEMS = [
  radio('1', 'Option 1'),
  radio('2', 'Option 2'),
  radio('3', 'Option 3'),
].join('');

// Items without descriptions, for compact layout comparisons.
const PLAIN_ITEMS = [
  radio('1', 'Option 1', '', null),
  radio('2', 'Option 2', '', null),
  radio('3', 'Option 3', '', null),
].join('');

const SIZES = ['s', 'm', 'l', 'xl'] as const;

const SHIPPING_ITEMS = html`
  <swc-radio value="standard"><span slot="label">Standard</span></swc-radio>
  <swc-radio value="express"><span slot="label">Express</span></swc-radio>
`;

// Use `''` to omit a slot; `undefined` renders the text "undefined".
const group = (
  args: Record<string, unknown>,
  overrides: Record<string, unknown> = {}
) =>
  template({
    ...args,
    'label-slot': 'Example radios',
    'description-slot': 'This is the description for the radio group.',
    'default-slot': ITEMS,
    ...overrides,
  });

const handleFormSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;
  const field = form.querySelector('swc-radio-group');

  if (!field) {
    return;
  }

  // Clear only `invalid` so `disabled` and `readonly` survive.
  if (field.fieldStatus === 'invalid') {
    field.fieldStatus = undefined;
  }

  await field.updateComplete;
  if (!field.checkValidity()) {
    field.fieldStatus = 'invalid';
  }
};

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    selected: '1',
    'label-slot': 'Example radios',
    'description-slot': 'This is the description for the radio group.',
    'error-text-slot': 'This option is not available.',
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
      selected: '1',
      'default-slot': [
        radio('1', 'Option 1'),
        radio('2', 'Option 2', '', null),
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
    <swc-radio-group selected="standard">
      <span slot="label">Slotted label</span>
      ${SHIPPING_ITEMS}
    </swc-radio-group>
    <swc-radio-group accessible-label="Shipping speed" selected="standard">
      ${SHIPPING_ITEMS}
    </swc-radio-group>
    <section style="display: grid; gap: var(--swc-spacing-100);">
      <h4 id="labelling-heading" class="swc-Heading swc-Heading--sizeXS">
        Return shipping
      </h4>
      <swc-radio-group
        accessible-labelledby="labelling-heading"
        selected="standard"
      >
        ${SHIPPING_ITEMS}
      </swc-radio-group>
    </section>
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['options'],
};

export const Sizes: Story = {
  render: (args) => html`
    ${SIZES.map(
      (size) => html`
        ${group(args, {
          size,
          selected: '2',
          'label-slot': `Size ${size}`,
          'description-slot': '',
          'default-slot': PLAIN_ITEMS,
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
      selected: '1',
      'default-slot': PLAIN_ITEMS,
    })}
    ${group(args, {
      'label-position': 'side',
      'label-slot': 'Side label',
      selected: '1',
      'default-slot': PLAIN_ITEMS,
    })}
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: { gap: 'var(--swc-spacing-500)' },
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
      'default-slot': PLAIN_ITEMS,
    })}
    ${group(args, {
      required: true,
      'necessity-indicator': 'label',
      'label-slot': 'Label',
      'default-slot': PLAIN_ITEMS,
    })}
    ${group(args, {
      'necessity-indicator': 'label',
      'label-slot': 'Label',
      'default-slot': PLAIN_ITEMS,
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
      selected: '1',
      'description-slot': '',
      'default-slot': PLAIN_ITEMS,
    })}
    ${group(args, {
      orientation: 'horizontal',
      'label-slot': 'Horizontal',
      selected: '1',
      'description-slot': '',
      'default-slot': PLAIN_ITEMS,
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
      selected: '1',
      'description-slot': '',
      'default-slot': PLAIN_ITEMS,
    })}
    ${group(args, {
      'label-slot': 'Emphasized',
      emphasized: true,
      selected: '1',
      'description-slot': '',
      'default-slot': PLAIN_ITEMS,
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
      'default-slot': PLAIN_ITEMS,
    })}
    ${group(args, {
      'label-slot': 'Option 2 selected',
      selected: '2',
      'description-slot': '',
      'default-slot': PLAIN_ITEMS,
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
      selected: '2',
    })}
    ${group(args, {
      'label-slot': 'Disabled item',
      selected: '1',
      'default-slot': [
        radio('1', 'Option 1'),
        radio('2', 'Option 2', 'disabled'),
        radio('3', 'Option 3'),
      ].join(''),
    })}
  `,
  // Skipped: axe flags disabled text contrast, which WCAG 1.4.3 exempts.
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['states', '!test'],
};

export const Invalid: Story = {
  render: (args) => html`
    ${group(args, {
      'field-status': 'invalid',
      selected: '1',
      'error-text-slot': 'This option is not available.',
    })}
  `,
  tags: ['states'],
};

export const ReadOnly: Story = {
  render: (args) => html`
    ${group(args, { 'field-status': 'readonly', selected: '2' })}
  `,
  tags: ['states'],
};
ReadOnly.storyName = 'Read-only';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const FormParticipation: Story = {
  render: () => html`
    <form
      novalidate
      @submit=${handleFormSubmit}
      style="display: grid; gap: var(--swc-spacing-300);"
    >
      <swc-radio-group name="shipping" required>
        <span slot="label">Shipping method</span>
        <span slot="description">Choose your preferred shipping method.</span>
        <span slot="error-text">You must select a shipping method.</span>
        <swc-radio value="standard">
          <span slot="label">Standard shipping</span>
        </swc-radio>
        <swc-radio value="express">
          <span slot="label">Express shipping</span>
        </swc-radio>
      </swc-radio-group>

      <swc-button-group>
        <button class="swc-Button" type="submit">Submit</button>
        <button class="swc-Button swc-Button--secondary" type="reset">
          Reset
        </button>
      </swc-button-group>
    </form>
  `,
  parameters: {
    styles: { 'inline-size': 'min(240px, 100vw)' },
  },
  tags: ['behaviors'],
};
FormParticipation.storyName = 'Form participation';

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
        <span slot="label">Delivery speed</span>
        <span slot="description">
          You can change this until the order ships.
        </span>
        <swc-radio value="standard">
          <span slot="label">Standard</span>
          <span slot="description">3 to 5 business days</span>
        </swc-radio>
        <swc-radio value="express">
          <span slot="label">Express</span>
          <span slot="description">1 to 2 business days</span>
        </swc-radio>
      </swc-radio-group>
    </div>
  `,
  parameters: {
    styles: { 'max-inline-size': '40ch' },
  },
  tags: ['a11y'],
};
