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

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Radio group/Radio group VRT',
  component: 'swc-radio-group',
  tags: ['dev'],
};

export default meta;

// Helpers

// Content-sized: the host is a plain block, so in flex and grid parents its
// width follows its content, like a `<fieldset>` or `<div>`.
const DESCRIPTIONS = {
  'flex-row-center': 'Centered. Width follows its content.',
  'flex-column-center': 'Centered. Width follows its content.',
  'grid-place-items': 'Centered. Width follows its content.',
  'grid-place-content': 'Centered. Width follows its content.',
  'grid-stretch':
    'Gray sibling is taller. Fills the track width; host keeps its natural height.',
  'flex-row-stretch': 'Gray sibling is taller. Host keeps its natural height.',
  'flex-shrink':
    'Gray sibling is wider than the container. The host shrinks no narrower than its 10ch minimum.',
  'grid-narrow-track':
    'Track is 40px wide. The host holds its 10ch minimum and overflows the track.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line and fills the container width.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-radio-group selected="standard">
        <span slot="label">Shipping method</span>
        <swc-radio value="standard">
          <span slot="label">Standard</span>
        </swc-radio>
        <swc-radio value="express">
          <span slot="label">Express</span>
        </swc-radio>
      </swc-radio-group>
    `,
    { descriptions: DESCRIPTIONS, siblingBlockSize: '120px' }
  )}
`;

// VRT stories

// A radio group is a fluid, block-level field, so its host box should match
// the rendered group in every flex and grid context an app is likely to place
// it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
