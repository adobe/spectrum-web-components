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

import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-close-button');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: BUTTON_VALID_SIZES,
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: 'select',
  options: ['', ...BUTTON_STATIC_COLORS],
  table: {
    ...argTypes['static-color']?.table,
    category: 'attributes',
  },
};

args['accessible-label'] = 'Close';

/**
 * Close buttons dismiss dialogs, banners, toasts, and similar surfaces. They
 * are compact, icon-forward controls that require an accessible name describing
 * the dismiss action.
 */
const meta: Meta = {
  title: 'Close Button',
  component: 'swc-close-button',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Compact dismiss control for overlays and chrome regions',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    'accessible-label': 'Close',
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    'accessible-label': 'Close',
  },
  tags: ['overview'],
};
