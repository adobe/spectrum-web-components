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

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Asset/Asset VRT',
  component: 'swc-asset',
  tags: ['dev'],
};

export default meta;

// Helpers

const LANDSCAPE_SRC = './images/landscape-asset.jpg';

// An unsized asset behaves like responsive media (`inline-size: 100%`, height
// from the content's ratio): it fills the width it is given, so its height
// depends on that ratio. The SVG uses the image's wide ratio so both rows are
// comparable and fit the 96px-tall cells; a square SVG would be taller than
// those cells, exactly as a plain responsive `<svg>` is. Card avoids this by
// giving the asset a definite width and a default ratio.
const UNSIZED_DESCRIPTIONS = {
  'block-flow': 'Fills the container width; height follows the content ratio.',
  'flex-row-center':
    'Centered. Fills the available width at the content ratio.',
  'flex-column-center':
    'Centered. Fills the available width at the content ratio.',
  'grid-place-items':
    'Centered in a larger cell. Fills the available width at the content ratio.',
  'grid-place-content':
    'Track sizes to content. Fills the available width at the content ratio.',
  'flex-shrink':
    'Gray sibling is wider than the container. Collapses; set a size to prevent it.',
  'grid-narrow-track': 'Track is 40px wide. Shrinks to the track.',
} as const;

const SIZED_DESCRIPTIONS = {
  'block-flow': 'Plain block parent. Host matches the 64px frame.',
  'grid-narrow-track': 'Track is 40px wide. Capped at the track width.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-asset>
        <img src=${LANDSCAPE_SRC} alt="Landscape" />
      </swc-asset>
    `,
    { label: 'Image, unsized', descriptions: UNSIZED_DESCRIPTIONS }
  )}
  ${layoutContexts(
    html`
      <swc-asset>
        <svg viewBox="0 0 24 10" aria-label="Placeholder">
          <rect width="24" height="10" fill="currentColor"></rect>
        </svg>
      </swc-asset>
    `,
    { label: 'SVG, unsized', descriptions: UNSIZED_DESCRIPTIONS }
  )}
  ${layoutContexts(
    html`
      <swc-asset width="64px" height="64px">
        <img src=${LANDSCAPE_SRC} alt="Landscape" />
      </swc-asset>
    `,
    { label: 'Image, sized 64px', descriptions: SIZED_DESCRIPTIONS }
  )}
  ${layoutContexts(
    html`
      <swc-asset width="64px" height="64px">
        <svg viewBox="0 0 24 24" aria-label="Placeholder">
          <rect width="24" height="24" fill="currentColor"></rect>
        </svg>
      </swc-asset>
    `,
    { label: 'SVG, sized 64px', descriptions: SIZED_DESCRIPTIONS }
  )}
`;

// VRT stories

// An asset is a media frame, so its host box should match the rendered frame
// in every flex and grid context an app is likely to place it in, whether the
// frame is sized or takes its size from its content.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
