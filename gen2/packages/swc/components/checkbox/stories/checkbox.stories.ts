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

import { CHECKBOX_VALID_SIZES } from '@adobe/spectrum-wc-core/components/checkbox';

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
