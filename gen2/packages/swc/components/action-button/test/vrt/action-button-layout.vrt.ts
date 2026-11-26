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

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc-icons/swc-icon-edit.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Action Button/Action Button VRT',
  component: 'swc-action-button',
  tags: ['dev'],
};

export default meta;

// Helpers

// The button fills the width of a stretched grid track, as a vertical action
// group relies on, but should never grow taller than its own height.
const DESCRIPTIONS = {
  'grid-stretch':
    'Gray sibling is taller. Fills the track width, but not the height.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-action-button>Edit</swc-action-button>
    `,
    { label: 'Label', descriptions: DESCRIPTIONS }
  )}
  ${layoutContexts(
    html`
      <swc-action-button accessible-label="Edit">
        <swc-icon-edit slot="icon"></swc-icon-edit>
      </swc-action-button>
    `,
    { label: 'Icon only', descriptions: DESCRIPTIONS }
  )}
`;

// VRT stories

// An action button is a shrink-wrapped control, so its host box should match
// the rendered button in every flex and grid context an app is likely to place
// it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
