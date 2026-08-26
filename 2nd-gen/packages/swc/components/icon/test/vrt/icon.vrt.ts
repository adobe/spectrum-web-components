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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Chevron100Icon } from '../../elements/Chevron100Icon.js';

// Metadata

const meta: Meta = {
  title: 'Icon/Icon VRT',
  component: 'swc-icon',
  tags: ['dev'],
};

export default meta;

// Helpers

const iconSvg = Chevron100Icon();

const sizeLabels = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<IconSize, string>;

const icon = ({
  size,
  accessibleLabel,
}: {
  size: IconSize;
  accessibleLabel?: string;
}) => html`
  <swc-icon size=${size} accessible-label=${accessibleLabel ?? nothing}>
    ${iconSvg}
  </swc-icon>
`;

const permutationContent = () => html`
  ${row(
    ICON_VALID_SIZES.map((size) =>
      icon({ size, accessibleLabel: sizeLabels[size] })
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

// Every size, labeled (role="img") vs. decorative (aria-hidden, the
// default with no accessible-label) host semantics, and the `color:
// var(--swc-icon-color, currentColor)` fallback that inherits an ancestor's
// `color` when the custom property is unset (see icon-custom-properties.vrt.ts
// for the property override itself). Rendered once in light/ltr and once in
// dark/rtl, since that fallback tracks the surrounding theme's content color
// rather than a fixed token.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` replaces the page palette wholesale, and the icon's fill
// resolves through `currentColor`, so it's worth confirming size and
// labeled/decorative permutations still render legibly under the system
// palette.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
