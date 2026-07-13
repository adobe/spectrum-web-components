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

import '../../../upload-artifact/index.js';
import '../../index.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Prompt field/VRT',
  component: 'swc-prompt-field',
  tags: ['dev'],
};

export default meta;

const placeholder = 'Ask a question, share an idea, or add a task.';

const artifact = html`
  <swc-upload-artifact slot="artifact" type="card" dismissible>
    <div slot="thumbnail" role="img" aria-label="PDF"></div>
    <span slot="title">Brand guidelines</span>
    <span slot="subtitle">PDF</span>
  </swc-upload-artifact>
`;

const content = () => html`
  ${row(
    [
      html`
        <swc-prompt-field
          label="Prompt"
          placeholder=${placeholder}
        ></swc-prompt-field>
      `,
      html`
        <swc-prompt-field
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
      `,
      html`
        <swc-prompt-field
          mode="loading"
          label="Prompt"
          value="Generate a concise launch plan."
        ></swc-prompt-field>
      `,
      html`
        <swc-prompt-field
          mode="disabled"
          label="Prompt"
          value="This input is disabled."
        ></swc-prompt-field>
      `,
    ],
    'Modes'
  )}
  ${row(
    [
      html`
        <swc-prompt-field
          label="Prompt"
          value="Use attached assets for a launch plan."
        >
          ${artifact}
          <div slot="legal">
            AI output may be inaccurate. Verify before using.
          </div>
        </swc-prompt-field>
      `,
      html`
        <swc-prompt-field
          label="プロンプト"
          value="承認ワークフローを要約"
        ></swc-prompt-field>
      `,
    ],
    'Artifacts and CJK'
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
