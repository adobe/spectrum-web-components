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

import '../../index.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Message sources/VRT',
  component: 'swc-message-sources',
  tags: ['dev'],
};

export default meta;

const sources = (open = false, label = 'Sources') => html`
  <swc-message-sources ?open=${open} label=${label}>
    <a href="#">Adobe Experience Manager documentation</a>
    <a href="#">Creative Cloud release notes 2026</a>
    <a href="#">Firefly API getting started guide</a>
  </swc-message-sources>
`;

const content = () => html`
  ${row(
    [sources(false), sources(true), sources(true, 'References')],
    'Collapsed and expanded'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(content(), 'light', 'ltr')} ${theme(content(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(content(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
