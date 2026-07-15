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
import '../../../suggestion-item/index.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Suggestion group/Suggestion group VRT',
  component: 'swc-suggestion-group',
  tags: ['dev'],
};

export default meta;

const group = (
  count: 1 | 3 | 5,
  heading = 'What would you like to do next?'
) => html`
  <swc-suggestion-group>
    <h3 slot="heading">${heading}</h3>
    <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
    ${count >= 3
      ? html`
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        `
      : ''}
    ${count === 5
      ? html`
          <swc-suggestion-item>
            Refine the executive summary
          </swc-suggestion-item>
          <swc-suggestion-item>承認ワークフローを要約</swc-suggestion-item>
        `
      : ''}
  </swc-suggestion-group>
`;

const content = () => html`
  ${row([group(1), group(3), group(5, 'Suggested next actions')], 'Counts')}
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
