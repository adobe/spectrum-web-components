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

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Accordion/Accordion VRT',
  component: 'swc-accordion',
  tags: ['dev'],
};

export default meta;

// Helpers

// The host has a 200px minimum width and otherwise sizes to its content, so it
// doesn't fill the container when centered. These cells have a 194px content
// area, narrower than that minimum, so the accordion overflows them slightly.
// A consumer changes the minimum with `min-inline-size` on the host.
const DESCRIPTIONS = {
  'block-flow':
    'Fills the container, but its 200px minimum is wider than this cell.',
  'flex-row-center': 'Centered. Width follows its content, 200px minimum.',
  'flex-column-center': 'Centered. Width follows its content, 200px minimum.',
  'grid-place-items':
    'Centered in a larger cell. Width follows its content, 200px minimum.',
  'grid-place-content': 'Track sizes to content. Keeps its 200px minimum.',
  'flex-row-stretch':
    'Gray sibling is taller. Host keeps its natural height and 200px minimum.',
  'grid-stretch':
    'Gray sibling is taller. Host keeps its natural height and 200px minimum.',
  'flex-shrink':
    'Gray sibling is wider than the container. Keeps its 200px minimum and overflows.',
  'grid-narrow-track':
    'Track is 40px wide. Keeps its 200px minimum and overflows.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line, 200px minimum.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-accordion>
        <swc-accordion-item open>
          <span slot="label">Shipping</span>
          <p>Supporting panel content.</p>
        </swc-accordion-item>
        <swc-accordion-item>
          <span slot="label">Returns</span>
          <p>Supporting panel content.</p>
        </swc-accordion-item>
      </swc-accordion>
    `,
    {
      blockSize: '160px',
      descriptions: DESCRIPTIONS,
      siblingBlockSize: '180px',
    }
  )}
`;

// VRT stories

// An accordion is a fluid, block-level container, so its host box should match
// the rendered accordion in every flex and grid context an app is likely to
// place it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
