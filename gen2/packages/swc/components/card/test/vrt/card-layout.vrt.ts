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

import '@adobe/spectrum-wc/components/card/swc-card.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Card/Card VRT',
  component: 'swc-card',
  tags: ['dev'],
};

export default meta;

// Helpers

// The host sets `inline-size: 100%`, so the width comes from the container and
// doesn't follow the content or the selected panel.
const DESCRIPTIONS = {
  'flex-row-center':
    'Centered. Fills the available width, up to its 280px maximum.',
  'flex-column-center':
    'Centered. Fills the available width, up to its 280px maximum.',
  'grid-place-items':
    'Centered in a larger cell. Fills the available width, up to its 280px maximum.',
  'grid-place-content':
    'Track sizes to content; in this story it still fills the available width.',
  'grid-stretch':
    'Gray sibling is taller. Fills the track width and stretches to match.',
  'flex-row-stretch': 'Gray sibling is taller. Stretches to match.',
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
      <swc-card>
        <img slot="preview" src="./images/card-preview.jpg" alt="" />
        <span slot="title">Card title</span>
        <span slot="description">Supporting description text.</span>
      </swc-card>
    `,
    {
      blockSize: '260px',
      descriptions: DESCRIPTIONS,
      siblingBlockSize: '280px',
    }
  )}
`;

// VRT stories

// A card is a block-level container capped at a maximum width, so its host box
// should match the rendered card in every flex and grid context an app is
// likely to place it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
