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

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Tabs/Tabs VRT',
  component: 'swc-tabs',
  tags: ['dev'],
};

export default meta;

// Helpers

// The host sets `inline-size: 100%`, so the width comes from the container and
// doesn't follow the content or the selected panel.
const DESCRIPTIONS = {
  'flex-row-center': 'Centered. Fills the available width.',
  'flex-column-center': 'Centered. Fills the available width.',
  'grid-place-items': 'Centered in a larger cell. Fills the available width.',
  'grid-place-content':
    'Track sizes to content, so the width follows the content.',
  'grid-stretch':
    'Gray sibling is taller. Fills the track width; host keeps its natural height.',
  'flex-row-stretch': 'Gray sibling is taller. Host keeps its natural height.',
  'flex-shrink':
    'Gray sibling is wider than the container. Shrinks to the remaining width; content can overflow.',
  'grid-narrow-track':
    'Track is 40px wide. The host fits the track; content can overflow.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line and fills the container width.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-tabs accessible-label="Product details" selected="1">
        <swc-tab tab-id="1">Overview</swc-tab>
        <swc-tab tab-id="2">Specifications</swc-tab>
        <swc-tab-panel tab-id="1">
          <p>Overview content for the selected tab.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="2">
          <p>Specifications content goes here.</p>
        </swc-tab-panel>
      </swc-tabs>
    `,
    {
      blockSize: '180px',
      descriptions: DESCRIPTIONS,
      siblingBlockSize: '280px',
    }
  )}
`;

// VRT stories

// Tabs fill the width of their container, so the host box should match the
// rendered tabs in every flex and grid context an app is likely to place them
// in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
