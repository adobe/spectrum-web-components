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
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

// Register only the icons the size/color/forced-colors rows use. Gallery loads the full
// set lazily via its loader, so this page doesn't define all ~413 elements.
import '../../src/swc-icon-delete.js';
import '../../src/swc-icon-folder.js';
import '../../src/swc-icon-heart.js';
import '../../src/swc-icon-search.js';
import '../../src/swc-icon-settings.js';
import '../../src/swc-icon-star.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../swc/.storybook/helpers/index.js';
import { WORKFLOW_ICONS } from '../../src/manifest.js';

// Metadata

const meta: Meta = {
  title: 'Workflow icons VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

/** Render one workflow icon element by tag, with size and label. */
const renderIcon = (
  tag: string,
  size: IconSize = 'm',
  label = ''
): ReturnType<typeof staticHtml> => {
  const el = unsafeStatic(tag);
  return staticHtml`<${el} size=${size} accessible-label=${label}></${el}>`;
};

// A handful of recognizable icons for the size, color, and forced-colors rows.
const FEATURED = [
  'swc-icon-star',
  'swc-icon-folder',
  'swc-icon-heart',
  'swc-icon-settings',
  'swc-icon-search',
  'swc-icon-delete',
] as const;

// Size (the box scales; the single drawing scales with it) and color (inherited
// `color` vs the `--swc-icon-color` override) axes, kept small so they read clearly
// in both themes.
const axesContent = () => html`
  ${row(
    ICON_VALID_SIZES.map((size) => renderIcon('swc-icon-star', size, size)),
    'Sizes'
  )}
  ${row(
    [
      html`
        <span style="color: var(--swc-blue-900, #1473e6);">
          ${renderIcon('swc-icon-heart', 'l', 'Favorite')}
        </span>
      `,
      html`
        <span style="--swc-icon-color: var(--swc-red-900, #d7373f);">
          ${renderIcon('swc-icon-heart', 'l', 'Favorite')}
        </span>
      `,
    ],
    'Color: inherited vs --swc-icon-color'
  )}
`;

// VRT stories

// Size and color axes across light/ltr and dark/rtl in a single snapshot, so the
// theme and direction axes cost one image. Icons resolve color via currentColor, so
// the dark theme is a meaningful axis.
export const Permutations: Story = {
  render: () => html`
    ${theme(axesContent(), 'light', 'ltr')}
    ${theme(axesContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// The full set at the medium size: dense art coverage so any change to a single
// icon's drawing is caught. One theme is enough to catch geometry regressions; the
// color axis is covered by Permutations above.
export const Gallery: Story = {
  // Register the full set only when the gallery renders, not on module load.
  loaders: [
    async () => {
      await import('../../src/elements.js');
      return {};
    },
  ],
  render: () =>
    theme(
      row(
        WORKFLOW_ICONS.map(({ name, tag }) => renderIcon(tag, 'm', name)),
        'All workflow icons'
      ),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
};

// Forced-colors mode replaces the whole page palette, so it needs its own snapshot.
// Icons fill with currentColor, which maps to the system CanvasText color.
export const ForcedColors: Story = {
  render: () =>
    theme(
      row(
        FEATURED.map((tag) =>
          renderIcon(tag, 'l', tag.replace('swc-icon-', ''))
        ),
        'Featured icons'
      ),
      'light',
      'ltr'
    ),
  parameters: forcedColorsVrtParameters,
};
