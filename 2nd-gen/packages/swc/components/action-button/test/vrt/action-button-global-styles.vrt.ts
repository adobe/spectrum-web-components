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
  FORCED_STATES,
  forcePseudoStates,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Action Button/Action Button VRT',
  tags: ['dev'],
};

export default meta;

const globalIconSvg = html`
  <svg
    class="swc-ActionButton-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M9.60547 4.46973 6.3457 1.20996c-.29297-.29297-.76758-.29297-1.06055 0s-.29297.76758 0 1.06055l1.97949 1.97949H.9248c-.41406 0-.75.33594-.75.75s.33594.75.75.75h6.33984l-1.97949 1.97949c-.29297.29297-.29297.76758 0 1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l3.25977-3.25977c.29297-.29297.29297-.76758 0-1.06055Z"
    ></path>
  </svg>
`;

const asLinkAndButton = (classes: string, label: string) => [
  html`
    <a href="#" class="swc-ActionButton ${classes}" onclick="return false;">
      <span class="swc-ActionButton-label">${label} (link)</span>
    </a>
  `,
  html`
    <button type="button" class="swc-ActionButton ${classes}">
      <span class="swc-ActionButton-label">${label} (button)</span>
    </button>
  `,
];

const SIZE_CASES = [
  { classes: 'swc-ActionButton--sizeXs', label: 'Extra-small' },
  { classes: 'swc-ActionButton--sizeS', label: 'Small' },
  { classes: '', label: 'Medium' },
  { classes: 'swc-ActionButton--sizeL', label: 'Large' },
  { classes: 'swc-ActionButton--sizeXl', label: 'Extra-large' },
];

const forceGlobalActionButtonStates = forcePseudoStates('.swc-ActionButton');

const globalStylesContent = () => html`
  ${row(
    SIZE_CASES.flatMap(({ classes, label }) => asLinkAndButton(classes, label)),
    'Sizes'
  )}
  ${row(
    [
      ...asLinkAndButton('swc-ActionButton--quiet', 'Quiet'),
      html`
        <button type="button" class="swc-ActionButton" disabled>
          <span class="swc-ActionButton-label">Disabled</span>
        </button>
      `,
      html`
        <button
          type="button"
          class="swc-ActionButton swc-ActionButton--pendingActive"
        >
          <span class="swc-ActionButton-label">Pending</span>
        </button>
      `,
    ],
    'States'
  )}
  ${row(
    [
      html`
        <button
          type="button"
          class="swc-ActionButton swc-ActionButton--hasIcon"
        >
          ${globalIconSvg}
          <span class="swc-ActionButton-label">With icon</span>
        </button>
      `,
      html`
        <button
          type="button"
          class="swc-ActionButton swc-ActionButton--iconOnly"
          aria-label="Icon only"
        >
          ${globalIconSvg}
        </button>
      `,
      html`
        <button type="button" class="swc-ActionButton">
          <span class="swc-ActionButton-label">承認ワークフロー</span>
        </button>
      `,
    ],
    'Anatomy and CJK'
  )}
  ${staticColorBackground(
    row(
      [
        ...asLinkAndButton('swc-ActionButton--staticWhite', 'White'),
        ...asLinkAndButton(
          'swc-ActionButton--staticWhite swc-ActionButton--quiet',
          'White quiet'
        ),
      ],
      'Static white'
    ),
    'white'
  )}
  ${staticColorBackground(
    row(
      [
        ...asLinkAndButton('swc-ActionButton--staticBlack', 'Black'),
        ...asLinkAndButton(
          'swc-ActionButton--staticBlack swc-ActionButton--quiet',
          'Black quiet'
        ),
      ],
      'Static black'
    ),
    'black'
  )}
  ${row(
    FORCED_STATES.flatMap((state) => [
      html`
        <a
          href="#"
          class="swc-ActionButton"
          data-force-state=${state}
          onclick="return false;"
        >
          <span class="swc-ActionButton-label">${state} (link)</span>
        </a>
      `,
      html`
        <button
          type="button"
          class="swc-ActionButton"
          data-force-state=${state}
        >
          <span class="swc-ActionButton-label">${state} (button)</span>
        </button>
      `,
    ]),
    'Forced states'
  )}
`;

export const GlobalStyles: Story = {
  render: () => html`
    ${theme(globalStylesContent(), 'light', 'ltr')}
    ${theme(globalStylesContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceGlobalActionButtonStates,
};
