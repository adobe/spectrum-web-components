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

import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Illustrated message/Illustrated message VRT',
  component: 'swc-illustrated-message',
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
    'Gray sibling is wider than the container. Keeps its minimum content width.',
  'grid-narrow-track':
    'Track is 40px wide. The host fits the track; content can overflow.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line and fills the container width.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-illustrated-message>
        <svg aria-hidden="true" viewBox="0 0 96 96" width="96" height="96">
          <circle cx="48" cy="48" r="40" fill="currentColor"></circle>
        </svg>
        <h2 slot="heading">Illustrated message</h2>
        <span slot="description">Supporting description text.</span>
      </swc-illustrated-message>
    `,
    {
      blockSize: '180px',
      descriptions: DESCRIPTIONS,
      siblingBlockSize: '280px',
    }
  )}
`;

// VRT stories

// An illustrated message is a fluid, block-level container, so its host box
// should match the rendered message in every flex and grid context an app is
// likely to place it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
