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
  ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS,
  ILLUSTRATED_MESSAGE_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/illustrated-message';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Illustrated Message/Illustrated Message VRT',
  component: 'swc-illustrated-message',
  tags: ['dev'],
};

export default meta;

const cloud = () => html`
  <svg slot="" viewBox="0 0 160 160" aria-hidden="true">
    <path
      fill="currentColor"
      d="M45 118h70c19 0 35-15 35-34 0-17-12-31-28-34C116 31 100 18 80 18 63 18 48 29 42 45 24 47 10 62 10 81c0 20 16 37 35 37Z"
    ></path>
  </svg>
`;

const illustratedMessage = ({
  size = 'm',
  orientation = 'vertical',
  heading = 'No files found',
  description = 'Try another search or upload a new file.',
  actions = false,
}: {
  size?: (typeof ILLUSTRATED_MESSAGE_VALID_SIZES)[number];
  orientation?: (typeof ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS)[number];
  heading?: string;
  description?: string;
  actions?: boolean;
}) => html`
  <swc-illustrated-message size=${size} orientation=${orientation}>
    ${cloud()}
    <h2 slot="heading">${heading}</h2>
    <span slot="description">${description}</span>
    ${actions
      ? html`
          <swc-button-group slot="actions">
            <swc-button variant="accent">Upload</swc-button>
            <swc-button variant="secondary">Browse</swc-button>
          </swc-button-group>
        `
      : ''}
  </swc-illustrated-message>
`;

const illustratedMessageContent = () => html`
  ${row(
    ILLUSTRATED_MESSAGE_VALID_SIZES.map((size) =>
      illustratedMessage({ size, heading: `Size ${size}` })
    ),
    'Sizes'
  )}
  ${row(
    ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS.map((orientation) =>
      illustratedMessage({ orientation, heading: orientation })
    ),
    'Orientations'
  )}
  ${row(
    [
      illustratedMessage({ heading: 'Heading only', description: '' }),
      illustratedMessage({ heading: 'With actions', actions: true }),
      illustratedMessage({
        heading: 'ファイルが見つかりません',
        description: '別の検索を試してください。',
      }),
    ],
    'Anatomy and CJK'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(illustratedMessageContent(), 'light', 'ltr')}
    ${theme(illustratedMessageContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(illustratedMessageContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
