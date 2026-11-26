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

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Button group/Button group VRT',
  component: 'swc-button-group',
  tags: ['dev'],
};

export default meta;

// Helpers

const renderGroup = (orientation: 'horizontal' | 'vertical') => html`
  <swc-button-group orientation=${orientation}>
    <swc-button>Save</swc-button>
    <swc-button>Cancel</swc-button>
  </swc-button-group>
`;

// A button group fills the width of its container, and its buttons sit at the
// start unless `align` says otherwise, so the host is wider than the buttons
// in block flow and stretched tracks.
const DESCRIPTIONS = {
  'block-flow': 'Fills the container width. Buttons sit at the start.',
  'grid-stretch':
    'Gray sibling is taller. Fills the track width; host keeps its natural height.',
  'flex-shrink':
    'Gray sibling is wider than the container. Buttons wrap instead of shrinking.',
  'grid-narrow-track':
    'Track is 40px wide. Buttons keep their width and overflow.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line and fills the container width.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(renderGroup('horizontal'), {
    label: 'Horizontal',
    descriptions: DESCRIPTIONS,
  })}
  ${layoutContexts(renderGroup('vertical'), {
    label: 'Vertical',
    descriptions: DESCRIPTIONS,
  })}
`;

// VRT stories

// A button group fills the width of its container and wraps its buttons, so
// its host box should match the rendered group in every flex and grid context
// an app is likely to place it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
