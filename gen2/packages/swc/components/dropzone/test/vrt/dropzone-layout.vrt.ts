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

import '@adobe/spectrum-wc/components/dropzone/swc-dropzone.js';
import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Drop Zone/Drop Zone VRT',
  component: 'swc-dropzone',
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
      <swc-dropzone aria-label="File drop area">
        <swc-illustrated-message>
          <h2 slot="heading">Drag and drop your file</h2>
          <span slot="description">Or, select a file from your computer</span>
        </swc-illustrated-message>
      </swc-dropzone>
    `,
    {
      blockSize: '200px',
      descriptions: DESCRIPTIONS,
      siblingBlockSize: '220px',
    }
  )}
`;

// VRT stories

// A drop zone is a fluid, block-level container, so its host box should match
// the rendered zone in every flex and grid context an app is likely to place it
// in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
