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

import { AVATAR_VALID_SIZES } from '@adobe/spectrum-wc-core/components/avatar';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Avatar/Avatar VRT',
  component: 'swc-avatar',
  tags: ['dev'],
};

export default meta;

const PLACEHOLDER_SRC = 'https://picsum.photos/id/64/500/500';

const avatar = ({
  size,
  outline = false,
  disabled = false,
  decorative = false,
}: {
  size: (typeof AVATAR_VALID_SIZES)[number];
  outline?: boolean;
  disabled?: boolean;
  decorative?: boolean;
}) => html`
  <swc-avatar
    src=${PLACEHOLDER_SRC}
    alt=${decorative ? '' : 'Jane Doe'}
    size=${size}
    ?outline=${outline}
    ?disabled=${disabled}
    ?decorative=${decorative}
  ></swc-avatar>
`;

const avatarContent = () => html`
  ${row(
    AVATAR_VALID_SIZES.map((size) => avatar({ size })),
    'Sizes'
  )}
  ${row(
    [
      html`
        <div
          style="display: flex; gap: 12px; align-items: center; padding: 16px; background: linear-gradient(to right, rgb(15 23 42), rgb(51 65 85)); border-radius: 8px;"
        >
          ${avatar({ size: 500, outline: true })}
          ${avatar({ size: 1000, outline: true })}
        </div>
      `,
    ],
    'Outline'
  )}
  ${row([avatar({ size: 500, disabled: true })], 'Disabled')}
  ${row(
    [
      html`
        <span>${avatar({ size: 500, decorative: true })}Jane Doe</span>
      `,
    ],
    'Decorative'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(avatarContent(), 'light', 'ltr')}
    ${theme(avatarContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(avatarContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
