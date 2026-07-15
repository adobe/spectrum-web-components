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
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Suggestion item/Suggestion item VRT',
  component: 'swc-suggestion-item',
  tags: ['dev'],
};

export default meta;

const forceItemStates = forcePseudoStates('swc-suggestion-item', 'button');

const content = () => html`
  ${row(
    [
      html`
        <swc-suggestion-item>Short action</swc-suggestion-item>
      `,
      html`
        <swc-suggestion-item data-force-state="hover">
          Create a year-over-year growth chart
        </swc-suggestion-item>
      `,
      html`
        <swc-suggestion-item data-force-state="focus-visible">
          Summarize in 3 bullet points
        </swc-suggestion-item>
      `,
      html`
        <swc-suggestion-item>承認ワークフローを要約</swc-suggestion-item>
      `,
    ],
    'Labels and states'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(content(), 'light', 'ltr')} ${theme(content(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceItemStates,
};

export const ForcedColors: Story = {
  render: () => theme(content(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceItemStates,
};
