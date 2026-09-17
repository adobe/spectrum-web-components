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
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';
import { Icon_ChevronDown } from '@adobe/spectrum-wc-icons/ChevronDown.js';

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

const iconSvg = unsafeSVG(Icon_ChevronDown());

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
