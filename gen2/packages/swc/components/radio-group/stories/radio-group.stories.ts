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

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-radio-group');

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
  },
  tags: ['migrated', '!autodocs'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

const radio = (
  value: string,
  label: string,
  attributes = '',
  description = ''
): string => `
  <swc-radio value="${value}" ${attributes}>
    <span slot="label">${label}</span>
    <span slot="description">${description ? `${description}` : `Description for ${label}`}</span>
  </swc-radio>
`;

const ITEMS = [
  radio('1', 'Option 1'),
  radio('2', 'Option 2'),
  radio('3', 'Option 3'),
].join('');

const SIZES = ['s', 'm', 'l', 'xl'] as const;

const group = (args: Record<string, unknown>, overrides = {}) =>
  template({
    ...args,
    'label-slot': 'Example radios',
    'description-slot': 'This is the description for the radio group.',
    'default-slot': ITEMS,
    ...overrides,
  });

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
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
        radio('1', 'Option 1', ''),
        radio('2', 'Option 2', ''),
      ].join(''),
    })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${SIZES.map(
      (size) => html`
        ${group(args, {
          size,
          selected: '2',
          'label-slot': `Size ${size}`,
        })}
      `
    )}
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      gap: 'var(--swc-spacing-500)',
    },
  },

  tags: ['options'],
};

export const LabelPosition: Story = {
  render: (args) => html`
    ${group(args, {
      'label-position': 'top',
      'label-slot': 'Top label',
      selected: '1',
    })}
    ${group(args, {
      'label-position': 'side',
      'label-slot': 'Side label',
      selected: '1',
    })}
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['options'],
};

export const NecessityIndicator: Story = {
  render: (args) => html`
    ${group(args, {
      required: true,
      'necessity-indicator': 'icon',
      'label-slot': 'Icon',
    })}
    ${group(args, {
      required: true,
      'necessity-indicator': 'label',
      'label-slot': 'Label',
    })}
    ${group(args, {
      'necessity-indicator': 'label',
      'label-slot': 'Label',
    })}
  `,
  parameters: {
    flexLayout: 'column-center',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['options'],
};

export const Orientation: Story = {
  render: (args) => html`
    ${group(args, {
      orientation: 'vertical',
      'label-slot': 'Vertical',
      selected: '1',
    })}
    ${group(args, {
      orientation: 'horizontal',
      'label-slot': 'Horizontal',
      selected: '1',
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
    ${group(args, { emphasized: true, selected: '1' })}
  `,
  tags: ['options'],
};

export const WithItemDescription: Story = {
  render: (args) => html`
    ${group(args, {
      selected: '1',
      'default-slot': [
        radio('1', 'Option 1', ''),
        radio('2', 'Option 2', ''),
      ].join(''),
    })}
  `,
  tags: ['options'],
};
WithItemDescription.storyName = 'Item description';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Selection: Story = {
  render: (args) => html`
    ${group(args, { 'label-slot': 'Nothing selected' })}
    ${group(args, { 'label-slot': 'Option 2 selected', selected: '2' })}
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
      disabled: true,
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
  parameters: {
    flexLayout: 'row-wrap',
    styles: { gap: 'var(--swc-spacing-500)' },
  },
  tags: ['states'],
};

export const Invalid: Story = {
  render: (args) => html`
    ${group(args, {
      invalid: true,
      selected: '1',
      'error-text-slot': 'This option is not available.',
    })}
  `,
  tags: ['states'],
};

export const Required: Story = {
  render: (args) => html`
    ${group(args, { required: true })}
  `,
  tags: ['states'],
};

export const ReadOnly: Story = {
  render: (args) => html`
    ${group(args, { readonly: true, selected: '2' })}
  `,
  tags: ['states'],
};
ReadOnly.storyName = 'Read-only';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  render: (args) => html`
    ${group(args, {
      selected: '1',
      'label-slot': `Text wrapping`,
      'default-slot': [
        radio(
          '1',
          'A long option label that wraps onto a second line to check alignment of the control and text',
          '',
          'A long description that also wraps to confirm spacing between lines'
        ),
        radio('2', 'Short option'),
      ].join(''),
    })}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { 'max-inline-size': '40ch' },
  },
  tags: ['behaviors'],
};
TextWrapping.storyName = 'Text wrapping';
