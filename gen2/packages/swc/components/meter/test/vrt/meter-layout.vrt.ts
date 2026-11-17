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

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Meter/Meter VRT',
  component: 'swc-meter',
  tags: ['dev'],
};

export default meta;

// Helpers

// A fluid bar has no intrinsic width, so its host sets `inline-size: 100%` and
// fills the available space, including centered flex and grid cells. It keeps
// its minimum in tracks that size to content or are narrower than that.
const DESCRIPTIONS = {
  'flex-row-center': 'Centered on both axes. Fills the available width.',
  'flex-column-center': 'Centered on both axes. Fills the available width.',
  'grid-place-items': 'Centered in a larger cell. Fills the available width.',
  'grid-place-content':
    'Track sizes to content, so it keeps its minimum width.',
  'flex-row-stretch':
    'Gray sibling is taller. Fills the remaining width; host keeps its natural height.',
  'grid-stretch':
    'Gray sibling is taller. Fills the track width; host keeps its natural height.',
  'flex-shrink':
    'Gray sibling is wider than the container. Keeps its minimum width.',
  'grid-narrow-track': 'Track is 40px wide. Keeps its minimum width.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line and fills the container width.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-meter value="50" accessible-label="Storage"></swc-meter>
    `,
    { descriptions: DESCRIPTIONS }
  )}
`;

// VRT stories

// A meter fills the width of its container, so its host box should match the
// rendered meter in every flex and grid context an app is likely to place it
// in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
