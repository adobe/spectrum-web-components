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

import {
  CHECKBOX_STATUSES,
  CHECKBOX_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-checkbox');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: CHECKBOX_VALID_SIZES,
};

argTypes['field-status'] = {
  ...argTypes['field-status'],
  control: { type: 'select' },
  options: [undefined, ...CHECKBOX_STATUSES],
};
args['field-status'] = undefined;

/**
 * A checkbox selects or marks an item, or gives consent. Each checkbox is an
 * independent control.
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
    docs: {
      subtitle: 'Independent selection or consent control',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    'label-slot': 'Send me product updates',
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    checked: true,
    'label-slot': 'Send me product updates',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, checked: true, 'label-slot': 'Label' })}
    ${template({
      ...args,
      'label-slot': 'Label',
      'description-slot': 'Description',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${CHECKBOX_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        checked: true,
        'label-slot': `Size ${size}`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const Emphasized: Story = {
  render: (args) => html`
    ${template({ ...args, emphasized: true, 'label-slot': 'Unchecked' })}
    ${template({
      ...args,
      emphasized: true,
      checked: true,
      'label-slot': 'Checked',
    })}
    ${template({
      ...args,
      emphasized: true,
      indeterminate: true,
      'label-slot': 'Indeterminate',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const WithDescription: Story = {
  args: {
    'label-slot': 'Send me product updates',
    'description-slot': 'We send one email a month.',
  },
  tags: ['options'],
};

export const LabelWrapping: Story = {
  args: {
    'label-slot':
      'Send me product updates, event invitations, and occasional surveys about new features',
  },
  parameters: { styles: { maxInlineSize: '240px' } },
  tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Selection: Story = {
  render: (args) => html`
    ${template({ ...args, 'label-slot': 'Unchecked' })}
    ${template({ ...args, checked: true, 'label-slot': 'Checked' })}
    ${template({ ...args, indeterminate: true, 'label-slot': 'Indeterminate' })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

export const Disabled: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'field-status': 'disabled',
      'label-slot': 'Unchecked',
    })}
    ${template({
      ...args,
      'field-status': 'disabled',
      checked: true,
      'label-slot': 'Checked',
    })}
    ${template({
      ...args,
      'field-status': 'disabled',
      indeterminate: true,
      'label-slot': 'Indeterminate',
    })}
    ${template({
      ...args,
      'field-status': 'disabled',
      emphasized: true,
      checked: true,
      'label-slot': 'Emphasized checked',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

export const ReadOnly: Story = {
  args: {
    'field-status': 'readonly',
    checked: true,
    'label-slot': 'Send me product updates',
  },
  tags: ['states'],
};

export const Invalid: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'field-status': 'invalid',
      required: true,
      'label-slot': 'I agree to the terms',
      'error-text-slot': 'Check this box to continue.',
    })}
    ${template({
      ...args,
      'field-status': 'invalid',
      'label-slot': 'Share my usage data',
      'description-slot': 'Required by your organization.',
    })}
    ${template({
      ...args,
      'field-status': 'invalid',
      'label-slot': 'Confirm my email address',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

// TODO: Phase 7 adds the Accessibility story and the per-unit MDX docs page.
