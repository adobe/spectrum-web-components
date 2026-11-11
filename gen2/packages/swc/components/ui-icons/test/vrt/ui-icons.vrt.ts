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
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

import {
  forcedColorsVrtParameters,
  row,
  SIZE_LABELS,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { UI_ICONS, type UiIconName } from '../../icon-set/index.js';
import { DIRECTIONAL_UI_ICONS } from '../../ui-icon-direction.js';

// Metadata

const meta: Meta = {
  title: 'UI icons/UI icons VRT',
  component: 'swc-ui-icon',
  tags: ['dev'],
};

export default meta;

// Helpers

const ICON_NAMES = Object.keys(UI_ICONS).sort() as UiIconName[];

// Directional icons mirror horizontally in RTL; the rest never flip. The
// dark/rtl theme pass below renders every directional icon mirrored, so the two
// directional rows read as a before/after against the light/ltr pass.
const DIRECTIONAL = ICON_NAMES.filter((name) => DIRECTIONAL_UI_ICONS.has(name));
const NON_DIRECTIONAL = ICON_NAMES.filter(
  (name) => !DIRECTIONAL_UI_ICONS.has(name)
);

const uiIcon = (name: UiIconName, size: IconSize) => html`
  <swc-ui-icon icon=${name} size=${size} accessible-label=${name}></swc-ui-icon>
`;

// A named cell so a reviewer can tell each glyph apart in a Chromatic diff.
const labeledCell = (name: UiIconName) => html`
  <div
    style="display: inline-flex; flex-direction: column; align-items: center; gap: 4px;"
  >
    ${uiIcon(name, 'm')}
    <code>${name}</code>
  </div>
`;

// One row per t-shirt size: every icon at that size, in a fixed order. A UI icon
// picks the optically-tuned step for its size rather than scaling one drawing,
// so reading a single column down the rows shows the discrete optical steps (and
// the nearest-step fallback for icons that do not ship every step). The medium
// row carries the icon names as the legend for the bare rows above and below it.
const sizeRow = (size: IconSize) =>
  row(
    ICON_NAMES.map((name) =>
      size === 'm' ? labeledCell(name) : uiIcon(name, size)
    ),
    `${SIZE_LABELS[size]} (${size})`
  );

const permutationContent = () => html`
  ${ICON_VALID_SIZES.map(sizeRow)}
  ${row(DIRECTIONAL.map(labeledCell), 'Directional (mirror in RTL)')}
  ${row(NON_DIRECTIONAL.map(labeledCell), 'Non-directional (never mirror)')}
  ${row(
    [
      html`
        <div style="color: blueviolet;">
          ${uiIcon('chevron', 'm')} ${uiIcon('checkmark', 'm')}
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
