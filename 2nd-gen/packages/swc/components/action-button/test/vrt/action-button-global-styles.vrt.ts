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

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import {
  FORCED_STATES,
  forcePseudoStates,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Action Button/Action Button VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

const globalIconSvg = html`
  <svg
    class="swc-ActionButton-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
    ></path>
  </svg>
`;

// One <a> and one <button>, both with the same classes. The whole point of the
// global stylesheet is that both element types render identically. Labels are
// wrapped in `.swc-ActionButton-label`, matching the component's shadow DOM.
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

// A <swc-avatar> carrying the `.swc-ActionButton-icon` class, which the global
// stylesheet gives `--swc-avatar-size: var(--_swc-action-button-icon-size)` so
// the avatar tracks the button size — the class-based counterpart to the
// shadow-DOM ::slotted rule covered in action-button.vrt.ts. A local asset
// keeps the image deterministic for Chromatic (matching the docs stories).
const AVATAR_ICON_SRC = './images/avatar-preview.png';

const globalAvatarIcon = html`
  <swc-avatar
    class="swc-ActionButton-icon"
    src=${AVATAR_ICON_SRC}
    alt=""
    decorative
  ></swc-avatar>
`;

// Medium is the default (no size class); the rest map to their modifier class.
const SIZE_CASES = [
  { classes: 'swc-ActionButton--sizeXs', label: 'Extra-small' },
  { classes: 'swc-ActionButton--sizeS', label: 'Small' },
  { classes: '', label: 'Medium' },
  { classes: 'swc-ActionButton--sizeL', label: 'Large' },
  { classes: 'swc-ActionButton--sizeXl', label: 'Extra-large' },
];

// Same size, quiet, icon anatomy, static-color, and forced-state permutations
// as Action Button/VRT, but for global-action-button.css's class-based delivery
// on plain <a>/<button> elements (global-elements.css is imported in
// preview.ts, so these classes work with no swc-action-button import),
// confirming the shared stylesheet (generated from the same action-button.css
// the component uses) produces identical results regardless of element type.
// `disabled` is button-only, matching the documented limitation that native
// links can't support a real disabled state. Pending is excluded from the
// global stylesheet (it requires the PendingMixin JS runtime), so it isn't
// covered here.
const globalStylesContent = () => html`
  ${row(
    SIZE_CASES.flatMap(({ classes, label }) => asLinkAndButton(classes, label)),
    'Sizes'
  )}
  ${row(asLinkAndButton('swc-ActionButton--quiet', 'Quiet'), 'Quiet')}
  ${row(
    [
      html`
        <button type="button" class="swc-ActionButton" disabled>
          <span class="swc-ActionButton-label">Disabled (button)</span>
        </button>
      `,
    ],
    'Disabled'
  )}
  ${row(
    [
      html`
        <a href="#" class="swc-ActionButton" onclick="return false;">
          <span class="swc-ActionButton-label">Label only (link)</span>
        </a>
      `,
      html`
        <button
          type="button"
          class="swc-ActionButton swc-ActionButton--hasIcon"
        >
          ${globalIconSvg}
          <span class="swc-ActionButton-label">With icon (button)</span>
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
    ],
    'Anatomy'
  )}
  ${row(
    [
      ...SIZE_CASES.map(
        ({ classes, label }) => html`
          <button
            type="button"
            class="swc-ActionButton swc-ActionButton--hasIcon ${classes}"
          >
            ${globalAvatarIcon}
            <span class="swc-ActionButton-label">${label}</span>
          </button>
        `
      ),
      ...SIZE_CASES.map(
        ({ classes }) => html`
          <button
            type="button"
            class="swc-ActionButton swc-ActionButton--iconOnly ${classes}"
            aria-label="Jane Doe"
          >
            ${globalAvatarIcon}
          </button>
        `
      ),
    ],
    'Avatar icon'
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

// VRT stories

export const GlobalStyles: Story = {
  render: () => html`
    ${theme(globalStylesContent(), 'light', 'ltr')}
    ${theme(globalStylesContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  // No shadowRoot on these plain elements, so forcePseudoState() mirrors from
  // document.styleSheets instead. See helpers/pseudo-state.ts.
  play: forcePseudoStates('.swc-ActionButton[data-force-state]'),
};
