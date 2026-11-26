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

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Text field/Text field VRT',
  component: 'swc-text-field',
  tags: ['dev'],
};

export default meta;

// Helpers

// A text field hugs its natural input width when its parent doesn't give it
// one, and fills the container in block flow.
const DESCRIPTIONS = {
  'flex-row-center':
    'Centered. Takes its natural input width, up to the available width.',
  'flex-column-center':
    'Centered. Takes its natural input width, up to the available width.',
  'grid-place-items':
    'Centered in a larger cell. Takes its natural input width, up to the available width.',
  'grid-place-content':
    'Track sizes to content, so it takes its natural input width.',
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
      <swc-text-field placeholder="Enter a name">
        <span slot="label">Name</span>
      </swc-text-field>
    `,
    { descriptions: DESCRIPTIONS }
  )}
`;

// VRT stories

// A text field is a fluid, block-level control, so its host box should match
// the rendered field in every flex and grid context an app is likely to place
// it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
