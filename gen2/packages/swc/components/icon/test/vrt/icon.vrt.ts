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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  forcedColorsVrtParameters,
  row,
  SIZE_LABELS,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Icon/Icon VRT',
  component: 'swc-icon',
  tags: ['dev'],
};

export default meta;

// Helpers

// A custom, non-Spectrum SVG following the frame's slotted-SVG contract (single
// `<svg>`, `viewBox`, no `width`/`height`, `currentColor`, no ARIA). Keeping the
// fixture literal decouples the frame's VRT goldens from the icon packages.
const iconSvg = html`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="currentColor"
    />
  </svg>
`;

const icon = ({
  size,
  accessibleLabel,
}: {
  size: IconSize;
  accessibleLabel?: string;
}) => html`
  <swc-icon size=${size} accessible-label=${ifDefined(accessibleLabel)}>
    ${iconSvg}
  </swc-icon>
`;

const permutationContent = () => html`
  ${row(
    ICON_VALID_SIZES.map((size) =>
      icon({ size, accessibleLabel: SIZE_LABELS[size] })
    ),
    'Sizes'
  )}
  ${row([icon({ size: 'm', accessibleLabel: 'Search' })], 'Labeled (role=img)')}
  ${row([icon({ size: 'm' })], 'Decorative (aria-hidden)')}
  ${row(
    [
      html`
        <div style="color: blueviolet;">
          ${icon({ size: 'm', accessibleLabel: 'Search' })}
        </div>
      `,
    ],
    'Inherited color (currentColor)'
  )}
`;

// VRT stories

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
