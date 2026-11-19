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

import { CHECKBOX_VALID_SIZES } from '@adobe/spectrum-wc-core/components/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import meta from './checkbox.stories.js';

// ────────────────
//    METADATA
// ────────────────

// Local-only edge cases. The `.internal` filename excludes this file from the
// production Storybook build; the docs page uses `checkbox.stories.ts` only.
export default {
  ...meta,
  title: 'Checkbox/Edge cases',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

const { template } = getStorybookHelpers('swc-checkbox');

// ──────────────────────────
//    EDGE CASE STORIES
// ──────────────────────────

export const LabelWrappingAtEverySize: Story = {
  render: (args) => html`
    ${CHECKBOX_VALID_SIZES.map(
      (size) => html`
        <div style="inline-size: 200px;">
          ${template({
            ...args,
            size,
            checked: true,
            'label-slot': `Size ${size}: send me product updates and event invitations`,
            'description-slot': 'We send one email a month.',
          })}
        </div>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
};
LabelWrappingAtEverySize.storyName = 'Label wrapping at every size';

export const NoVisibleLabel: Story = {
  render: (args) => html`
    ${CHECKBOX_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        checked: true,
        'accessible-label': `Select row, size ${size}`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
};
NoVisibleLabel.storyName = 'No visible label';

export const EmphasizedDisabled: Story = {
  render: (args) => html`
    ${template({
      ...args,
      emphasized: true,
      'field-status': 'disabled',
      'label-slot': 'Unchecked',
    })}
    ${template({
      ...args,
      emphasized: true,
      'field-status': 'disabled',
      checked: true,
      'label-slot': 'Checked',
    })}
    ${template({
      ...args,
      emphasized: true,
      'field-status': 'disabled',
      indeterminate: true,
      'label-slot': 'Indeterminate',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
};
EmphasizedDisabled.storyName = 'Emphasized and disabled';

export const ReadOnlyVariations: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'field-status': 'readonly',
      'label-slot': 'Unchecked',
    })}
    ${template({
      ...args,
      'field-status': 'readonly',
      indeterminate: true,
      'label-slot': 'Indeterminate',
    })}
    ${template({
      ...args,
      'field-status': 'readonly',
      required: true,
      'label-slot': 'Required, not announced as required',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
};
ReadOnlyVariations.storyName = 'Read-only variations';

export const InvalidInDisabledFieldset: Story = {
  render: () => html`
    <fieldset
      disabled
      style="display: grid; gap: var(--swc-spacing-100); margin: 0; padding: 0; border: none;"
    >
      <legend>Agreements</legend>
      <swc-checkbox field-status="invalid" required>
        <span slot="label">I agree to the terms of service</span>
        <span slot="error-text">Agree to the terms to continue.</span>
      </swc-checkbox>
      <swc-checkbox field-status="invalid">
        <span slot="label">Share my usage data</span>
        <span slot="description">Required by your organization.</span>
      </swc-checkbox>
      <swc-checkbox field-status="invalid">
        <span slot="label">Confirm my email address</span>
      </swc-checkbox>
    </fieldset>
  `,
};
InvalidInDisabledFieldset.storyName = 'Invalid in a disabled fieldset';
