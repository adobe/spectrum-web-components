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
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';

import { row } from '../../../.storybook/helpers/index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-button');

const meta: Meta = {
  title: 'Button/VRT',
  component: 'swc-button',
  args,
  argTypes,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  tags: ['dev'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// Row = one variant/fill-style pair, columns = every size. Outline only
// applies to primary/secondary (accent/negative don't ship an outline style).
const ROWS: ReadonlyArray<{ variant: string; fillStyle: string }> = [
  ...BUTTON_VARIANTS.map((variant) => ({ variant, fillStyle: 'fill' })),
  { variant: 'primary', fillStyle: 'outline' },
  { variant: 'secondary', fillStyle: 'outline' },
];

// ──────────────────────────
//    VRT STORIES
// ──────────────────────────

// Every variant × fill-style × size combination, plus disabled/pending states
// at every size, all rendered in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: (args) => html`
    ${ROWS.map(({ variant, fillStyle }) =>
      row(
        BUTTON_VALID_SIZES.map((size) =>
          template({
            ...args,
            variant,
            'fill-style': fillStyle,
            size,
            'default-slot': `${variant} ${fillStyle} ${size}`,
          })
        )
      )
    )}
    ${row(
      BUTTON_VALID_SIZES.map((size) =>
        template({
          ...args,
          size,
          disabled: true,
          'default-slot': `Disabled ${size}`,
        })
      )
    )}
    ${row(
      BUTTON_VALID_SIZES.map((size) =>
        template({
          ...args,
          size,
          pending: true,
          'default-slot': `Pending ${size}`,
        })
      )
    )}
  `,
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '16px' },
  },
};

// Static-color variants, both backgrounds, every fill-style, in one snapshot.
// Reuses the same `staticColorsDemo` decorator the docs stories use
// (see button.stories.ts StaticColors) for the background gradients.
export const StaticColors: Story = {
  render: (args) => html`
    ${row(
      ['fill', 'outline'].map((fillStyle) =>
        template({
          ...args,
          'static-color': 'white',
          'fill-style': fillStyle,
          'default-slot': `White ${fillStyle}`,
        })
      )
    )}
    ${row(
      ['fill', 'outline'].map((fillStyle) =>
        template({
          ...args,
          'static-color': 'black',
          'fill-style': fillStyle,
          'default-slot': `Black ${fillStyle}`,
        })
      )
    )}
  `,
  parameters: { staticColorsDemo: true },
};
