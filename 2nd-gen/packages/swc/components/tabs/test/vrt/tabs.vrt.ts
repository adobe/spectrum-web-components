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

import {
  KEYBOARD_ACTIVATIONS,
  TAB_DENSITIES,
  TABS_DIRECTIONS,
} from '@spectrum-web-components/core/components/tabs';

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Tabs/Tabs VRT',
  component: 'swc-tabs',
  tags: ['dev'],
};

export default meta;

const tabs = ({
  direction = 'horizontal',
  density = 'regular',
  keyboardActivation = 'automatic',
  disabled = false,
  cjk = false,
} = {}) => html`
  <swc-tabs
    selected="2"
    accessible-label="Product details"
    direction=${direction}
    density=${density}
    keyboard-activation=${keyboardActivation}
    ?disabled=${disabled}
  >
    <swc-tab tab-id="1">${cjk ? '概要' : 'Overview'}</swc-tab>
    <swc-tab tab-id="2" selected>${cjk ? '仕様' : 'Specifications'}</swc-tab>
    <swc-tab tab-id="3" disabled>
      ${cjk ? 'ガイドライン' : 'Guidelines'}
    </swc-tab>
    <swc-tab-panel tab-id="1"><p>Overview content.</p></swc-tab-panel>
    <swc-tab-panel tab-id="2">
      <p>${cjk ? '仕様の詳細を確認します。' : 'Specifications content.'}</p>
    </swc-tab-panel>
    <swc-tab-panel tab-id="3"><p>Guidelines content.</p></swc-tab-panel>
  </swc-tabs>
`;

const tabsContent = () => html`
  ${row(
    TABS_DIRECTIONS.map((direction) => tabs({ direction })),
    'Directions'
  )}
  ${row(
    TAB_DENSITIES.map((density) => tabs({ density })),
    'Densities'
  )}
  ${row(
    KEYBOARD_ACTIVATIONS.map((keyboardActivation) =>
      tabs({ keyboardActivation })
    ),
    'Keyboard activation'
  )}
  ${row([tabs({ disabled: true }), tabs({ cjk: true })], 'States and CJK')}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(tabsContent(), 'light', 'ltr')}
    ${theme(tabsContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(tabsContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
