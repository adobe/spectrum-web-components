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

// Registers `<demo-opacity-checkerboard-swatch>`, the internal Lit host the
// docs stories use to demonstrate how a consuming component adopts the
// shared opacity-checkerboard CSS fragment into its own shadow root.
import '../../stories/opacity-checkerboard.internal.stories.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Opacity checkerboard/Opacity checkerboard VRT',
  component: 'demo-opacity-checkerboard-swatch',
  tags: ['dev'],
};

export default meta;

// Helpers

// Mirrors the (unexported) `swatch()` helper in opacity-checkerboard.internal.stories.ts;
// duplicated locally rather than shared so this VRT-only change doesn't also touch the
// docs stories file.
const swatch = (size: 'm' | 's', color: string, label: string) => html`
  <demo-opacity-checkerboard-swatch
    size=${size}
    color=${color}
    label=${label}
  ></demo-opacity-checkerboard-swatch>
`;

// Sizes at full transparency, so the square pattern itself is the only thing
// on screen; the transparent-content row below covers the pattern's actual
// purpose of reading through partially-opaque fills.
const permutationContent = () => html`
  ${row(
    [
      swatch('m', 'transparent', 'Medium squares'),
      swatch('s', 'transparent', 'Small squares'),
    ],
    'Sizes'
  )}
  ${row(
    [
      swatch('m', 'rgba(255, 0, 0, 0.4)', 'Red, 40% opacity'),
      swatch('m', 'rgba(0, 128, 255, 0.25)', 'Blue, 25% opacity'),
      swatch('m', 'rgba(0, 0, 0, 0.6)', 'Black, 60% opacity'),
      swatch('m', 'rgb(0, 200, 120)', 'Green, fully opaque'),
    ],
    'Transparent content'
  )}
`;

// VRT stories

// The alternating square resolves one of its two colors via `light-dark()`,
// so the dark theme changes the pattern itself, not just the surrounding
// page; it earns its place here rather than being skipped as a plain
// direction check.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` sets `forced-color-adjust: none` on the checkerboard so
// the pattern stays visible under the system palette override, unlike most
// decorative backgrounds which get flattened.
export const ForcedColors: Story = {
  render: () => row([swatch('m', 'rgba(255, 0, 0, 0.4)', 'Red, 40% opacity')]),
  parameters: forcedColorsVrtParameters,
};
