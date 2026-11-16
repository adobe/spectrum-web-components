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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Action Group/Action Group VRT',
  component: 'swc-action-group',
  tags: ['dev'],
};

export default meta;

// Helpers

// The horizontal group has three buttons so it wraps when space is tight. The
// vertical group has two so it fits the 96px-tall contexts.
const renderGroup = (orientation: 'horizontal' | 'vertical') => html`
  <swc-action-group accessible-label="Edit actions" orientation=${orientation}>
    <swc-action-button>Cut</swc-action-button>
    <swc-action-button>Copy</swc-action-button>
    ${orientation === 'horizontal'
      ? html`
          <swc-action-button>Paste</swc-action-button>
        `
      : nothing}
  </swc-action-group>
`;

// An action group is a block, so in block flow it fills the container width and
// breaks onto its own line beside text. In flex and grid parents it is a flex
// or grid item and sizes to its buttons.
const HORIZONTAL_DESCRIPTIONS = {
  'block-flow': 'Fills the container width. Buttons sit at the start.',
  'flex-row-stretch':
    'Gray sibling is taller. Host keeps its natural height; buttons wrap to the available width.',
  'grid-stretch':
    'Gray sibling is taller. Host keeps its natural height; buttons wrap to the track width.',
  'flex-shrink':
    'Gray sibling is wider than the container. Buttons wrap instead of shrinking.',
  'grid-narrow-track':
    'Track is 40px wide. Buttons keep their width and overflow.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line and fills the container width.',
} as const;

const VERTICAL_DESCRIPTIONS = {
  'block-flow': 'Fills the container width; buttons stretch to match.',
  'grid-stretch':
    'Gray sibling is taller. Fills the track width; buttons stretch to match.',
  'grid-narrow-track':
    'Track is 40px wide. Buttons keep their width and overflow.',
  'inline-flow':
    'Placed between lines of text. Breaks onto its own line; buttons stretch to match.',
} as const;

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(renderGroup('horizontal'), {
    label: 'Horizontal',
    descriptions: HORIZONTAL_DESCRIPTIONS,
  })}
  ${layoutContexts(renderGroup('vertical'), {
    label: 'Vertical',
    descriptions: VERTICAL_DESCRIPTIONS,
  })}
`;

// VRT stories

// An action group wraps its buttons, so its host box should match the
// rendered group in every flex and grid context an app is likely to place it
// in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
