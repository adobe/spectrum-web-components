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

// Metadata

const meta: Meta = {
  title: 'Button/VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

const globalIconSvg = html`
  <svg
    class="swc-Button-icon"
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

// One <a> and one <button>, both with the same classes. The whole point of
// the global stylesheet is that both element types render identically.
const asLinkAndButton = (classes: string, label: string) => [
  html`
    <a href="#" class="swc-Button ${classes}" onclick="return false;">
      ${label} (link)
    </a>
  `,
  html`
    <button type="button" class="swc-Button ${classes}">
      ${label} (button)
    </button>
  `,
];

const VARIANT_CASES = [
  { classes: '', label: 'Primary' },
  { classes: 'swc-Button--secondary', label: 'Secondary' },
  { classes: 'swc-Button--accent', label: 'Accent' },
  { classes: 'swc-Button--negative', label: 'Negative' },
  { classes: 'swc-Button--outline', label: 'Primary outline' },
  {
    classes: 'swc-Button--secondary swc-Button--outline',
    label: 'Secondary outline',
  },
];

const SIZE_CASES = [
  { classes: 'swc-Button--sizeS', label: 'Small' },
  { classes: '', label: 'Medium' },
  { classes: 'swc-Button--sizeL', label: 'Large' },
  { classes: 'swc-Button--sizeXl', label: 'Extra-large' },
];

// Same variant/fill-style, size, icon anatomy, truncate, and justified
// permutations as Button/VRT, but for global-button.css's class-based
// delivery on plain <a>/<button> elements (global-elements.css is imported in
// preview.ts, so these classes work with no swc-button import), confirming the
// shared stylesheet (generated from the same button.css the component uses)
// produces identical results regardless of element type. `disabled` is
// button-only, matching the documented limitation that native links can't
// support a real disabled state.
const globalStylesContent = () => html`
  ${row(
    VARIANT_CASES.flatMap(({ classes, label }) =>
      asLinkAndButton(classes, label)
    ),
    'Variants'
  )}
  ${row(
    SIZE_CASES.flatMap(({ classes, label }) => asLinkAndButton(classes, label)),
    'Sizes'
  )}
  ${row(
    [
      html`
        <button type="button" class="swc-Button" disabled>
          Disabled (button)
        </button>
      `,
    ],
    'Disabled'
  )}
  ${row(
    [
      html`
        <a href="#" class="swc-Button" onclick="return false;">
          <span class="swc-Button-label">Label only (link)</span>
        </a>
      `,
      html`
        <button type="button" class="swc-Button swc-Button--hasIcon">
          ${globalIconSvg}
          <span class="swc-Button-label">With icon (button)</span>
        </button>
      `,
      html`
        <button
          type="button"
          class="swc-Button swc-Button--iconOnly"
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
      html`
        <button
          type="button"
          class="swc-Button"
          style="--swc-button-max-inline-size: 120px;"
        >
          <span class="swc-Button-label">Submit to stakeholders</span>
        </button>
      `,
      html`
        <button
          type="button"
          class="swc-Button swc-Button--truncate"
          style="--swc-button-max-inline-size: 120px;"
        >
          <span class="swc-Button-label">Submit to stakeholders</span>
        </button>
      `,
    ],
    'Wrapping and truncation'
  )}
  ${row(
    [
      html`
        <div style="inline-size: 240px;">
          <a
            href="#"
            class="swc-Button swc-Button--justified"
            onclick="return false;"
          >
            Justified (link)
          </a>
        </div>
      `,
      html`
        <div style="inline-size: 64px;">
          <button type="button" class="swc-Button swc-Button--justified">
            Justified narrow (button)
          </button>
        </div>
      `,
    ],
    'Justified'
  )}
  ${staticColorBackground(
    row(
      [
        ...asLinkAndButton('swc-Button--staticWhite', 'White'),
        ...asLinkAndButton(
          'swc-Button--staticWhite swc-Button--secondary',
          'White secondary'
        ),
      ],
      'Static white'
    ),
    'white'
  )}
  ${staticColorBackground(
    row(
      [
        ...asLinkAndButton('swc-Button--staticBlack', 'Black'),
        ...asLinkAndButton(
          'swc-Button--staticBlack swc-Button--secondary',
          'Black secondary'
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
          class="swc-Button"
          data-force-state=${state}
          onclick="return false;"
        >
          ${state} (link)
        </a>
      `,
      html`
        <button type="button" class="swc-Button" data-force-state=${state}>
          ${state} (button)
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
  // No shadowRoot on these plain elements, so forcePseudoState() mirrors
  // from document.styleSheets instead. See helpers/pseudo-state.ts.
  play: forcePseudoStates('.swc-Button[data-force-state]'),
};
