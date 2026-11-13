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

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

import {
  captioned,
  layoutContexts,
  layoutContextsLegend,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Divider/Divider VRT',
  component: 'swc-divider',
  tags: ['dev'],
};

export default meta;

// Helpers

const HORIZONTAL_DESCRIPTIONS = {
  'flex-row-stretch':
    'Orientation mismatch: the divider keeps its minimum width and pushes the sibling out.',
  'flex-shrink':
    'Orientation mismatch: the divider keeps its minimum width instead of collapsing.',
  'flex-grow': 'flex: 1 grows the divider along the row; the bar follows.',
} as const;

const VERTICAL_DESCRIPTIONS = {
  'flex-column-center':
    'Orientation mismatch: stretch applies across the width, so it sits at the start.',
  'flex-grow': 'flex: 1 grows the host, but the bar stays thin.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-divider></swc-divider>
    `,
    { label: 'Horizontal', descriptions: HORIZONTAL_DESCRIPTIONS }
  )}
  ${layoutContexts(
    html`
      <swc-divider vertical></swc-divider>
    `,
    { label: 'Vertical', descriptions: VERTICAL_DESCRIPTIONS }
  )}
  ${row(
    [
      captioned(
        html`
          <div
            style="box-sizing: border-box; inline-size: 200px; padding-block: 22px; border: 1px dashed var(--swc-gray-500, #909090);"
          >
            <swc-divider
              style="padding-inline: 16px; outline: 1px solid magenta;"
            ></swc-divider>
          </div>
        `,
        'Horizontal, padding-inline: 16px'
      ),
      captioned(
        html`
          <div
            style="box-sizing: border-box; inline-size: 200px; padding-block: 22px; border: 1px dashed var(--swc-gray-500, #909090);"
          >
            <swc-divider
              style="margin-inline: 16px; outline: 1px solid magenta;"
            ></swc-divider>
          </div>
        `,
        'Horizontal, margin-inline: 16px (overflows)'
      ),
    ],
    'Inline spacing'
  )}
`;

// VRT stories

// A divider is a block with no intrinsic size, so it relies on its host
// resolving a width from its container. These contexts cover where that does
// and doesn't work: centered in flex and grid parents, beside taller siblings,
// under shrink pressure, in a narrow track, and inline with text. The
// centered flex column also stands in for a narrow navigation rail. Layout
// direction should match the divider's orientation: a horizontal divider
// belongs in block flow or a flex column, a vertical one in a flex or grid row.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
