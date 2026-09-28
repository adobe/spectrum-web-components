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

// Registers `<demo-opacity-checkerboard-swatch>`; see opacity-checkerboard.vrt.ts.
import '../../stories/opacity-checkerboard.internal.stories.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  customPropertyRows,
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

// The shared fragment reads its light-square color through `token()`, which
// makes it internal per the custom-properties naming convention (only `_`-
// or `token()`-sourced values are internal); only the two alternating-square
// colors consumed directly via `var()` are genuinely exposed for override.
// This utility has no custom-elements.json declaration to check coverage
// against (it's a shared `css` fragment, not a published custom element),
// so unlike other components' *-custom-properties.vrt.ts files this one
// skips verifyCustomPropertyCoverage() and documents the exposed set here
// instead.
type OpacityCheckerboardPropertyCase = CustomPropertyCase<
  | '--swc-opacity-checkerboard-square-dark-light'
  | '--swc-opacity-checkerboard-square-dark-dark'
>;

// `--square-dark-light` only resolves in a light color-scheme and
// `--square-dark-dark` only in dark, since both feed the same `light-dark()`
// call; each case is rendered in the theme where its override actually
// takes effect, not just the default light/ltr theme every other file uses.
const LIGHT_SQUARE_CASE: OpacityCheckerboardPropertyCase = {
  property: '--swc-opacity-checkerboard-square-dark-light',
  value: 'magenta',
};

const DARK_SQUARE_CASE: OpacityCheckerboardPropertyCase = {
  property: '--swc-opacity-checkerboard-square-dark-dark',
  value: 'cyan',
};

const renderPropertyCase = (
  _testCase: OpacityCheckerboardPropertyCase,
  style?: string
) => html`
  <demo-opacity-checkerboard-swatch
    color="transparent"
    label="Opacity checkerboard"
    style=${style ?? nothing}
  ></demo-opacity-checkerboard-swatch>
`;

// VRT stories

export const CustomProperties: Story = {
  render: () => html`
    ${theme(
      customPropertyRows([LIGHT_SQUARE_CASE], renderPropertyCase),
      'light',
      'ltr'
    )}
    ${theme(
      customPropertyRows([DARK_SQUARE_CASE], renderPropertyCase),
      'dark',
      'ltr'
    )}
  `,
  parameters: vrtParameters,
};
