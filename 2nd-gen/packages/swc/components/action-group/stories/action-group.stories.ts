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
  ACTION_GROUP_ORIENTATIONS,
  ACTION_GROUP_VALID_SIZES,
} from '@spectrum-web-components/core/components/action-group';

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-action-group');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [...ACTION_GROUP_VALID_SIZES],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'none' },
  },
};

argTypes.orientation = {
  ...argTypes.orientation,
  control: { type: 'select' },
  options: [...ACTION_GROUP_ORIENTATIONS],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'horizontal' },
  },
};

argTypes.disabled = {
  ...argTypes.disabled,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.compact = {
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.quiet = {
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.justified = {
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

/**
 * An action group clusters related action buttons together with composite
 * keyboard navigation: one Tab stop into the strip, arrow keys move among
 * `swc-action-button` and `swc-action-menu` children.
 *
 * Unlike [Button Group](../?path=/docs/button-group--overview), which lets
 * Tab reach each button independently, action group owns composite navigation
 * (one Tab stop; arrow keys move among items).
 */
const meta: Meta = {
  title: 'Action Group',
  component: 'swc-action-group',
  args,
  argTypes,
  render: (renderArgs) => html`
    <swc-action-group
      label="Text formatting"
      orientation=${renderArgs.orientation ?? 'horizontal'}
    >
      <swc-action-button label="Bold">Bold</swc-action-button>
      <swc-action-button label="Italic">Italic</swc-action-button>
      <swc-action-button label="Underline">Underline</swc-action-button>
    </swc-action-group>
  `,
  parameters: {
    docs: {
      subtitle:
        'Clusters related action buttons with composite keyboard navigation',
    },
    flexLayout: 'row-wrap',
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
    orientation: 'horizontal',
    disabled: false,
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    orientation: 'horizontal',
  },
};
