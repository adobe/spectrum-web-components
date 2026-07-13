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
  PROGRESS_CIRCLE_STATIC_COLORS,
  PROGRESS_CIRCLE_VALID_SIZES,
} from '@spectrum-web-components/core/components/progress-circle';

import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';

import {
  forcedColorsVrtParameters,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Progress circle/VRT',
  component: 'swc-progress-circle',
  tags: ['dev'],
};

export default meta;

const progressCircleContent = () => html`
  ${row(
    PROGRESS_CIRCLE_VALID_SIZES.map(
      (size) => html`
        <swc-progress-circle
          size=${size}
          progress="50"
          label="Processing ${size} item"
        ></swc-progress-circle>
      `
    ),
    'Sizes'
  )}
  ${row(
    [0, 25, 50, 75, 100].map(
      (progress) => html`
        <swc-progress-circle
          progress=${progress}
          label="Downloading ${progress}%"
        ></swc-progress-circle>
      `
    ),
    'Progress values'
  )}
  ${row(
    [
      html`
        <swc-progress-circle label="Processing request"></swc-progress-circle>
      `,
      html`
        <swc-progress-circle
          lang="ja"
          progress="75"
          label="アップロード中"
        ></swc-progress-circle>
      `,
    ],
    'Indeterminate and CJK'
  )}
  ${PROGRESS_CIRCLE_STATIC_COLORS.map((color) =>
    staticColorBackground(
      row(
        PROGRESS_CIRCLE_VALID_SIZES.map(
          (size) => html`
            <swc-progress-circle
              size=${size}
              static-color=${color}
              progress="50"
              label="Processing ${color}"
            ></swc-progress-circle>
          `
        ),
        `Static ${color}`
      ),
      color
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(progressCircleContent(), 'light', 'ltr')}
    ${theme(progressCircleContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(progressCircleContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
