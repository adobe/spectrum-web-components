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

/**
 * Wraps a set of permutations in a single flex-wrap row. Stack multiple
 * `row()` calls inside a VRT story to group permutations (e.g. one row per
 * variant, one column per size) without needing every combination to be its
 * own story/snapshot.
 */
export const row = (children: unknown) => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    ${children}
  </div>
`;

/**
 * Wraps content so it renders in a given theme/direction regardless of the
 * Storybook toolbar's global theme/lang. `.swc-theme--{mode}` only sets
 * `color-scheme`, which every token resolves via `light-dark()`; `dir` is a
 * plain HTML attribute. Both are inherited properties, so this works even
 * across the shadow boundary without needing the toolbar globals. Also
 * stacks its children (e.g. multiple `row()` groups) vertically with a gap,
 * since it already wraps everything a VRT story renders.
 */
export const theme = (
  children: unknown,
  mode: 'light' | 'dark' | 'adaptive',
  dir: 'ltr' | 'rtl' = 'ltr'
) => html`
  <div
    class="swc-theme--${mode}"
    dir=${dir}
    style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background-color: var(--swc-background-base-color);"
  >
    ${children}
  </div>
`;

// Matches the gradients in decorators/static-colors-demo.ts, so VRT static
// color groups look the same as the docs' staticColorsDemo decorator.
const STATIC_COLOR_GRADIENTS = {
  white: 'linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67))',
  black: 'linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255))',
} as const;

/**
 * Wraps a group of static-color="white"/"black" permutations in the matching
 * contrast background, so they render correctly outside of the docs-only
 * `staticColorsDemo` decorator (which only targets a story's top-level
 * children, and can't compose with `theme()` wrapping the whole story too).
 */
export const staticColorBackground = (
  children: unknown,
  staticColor: 'white' | 'black'
) => html`
  <div
    style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; padding: 24px; background: ${STATIC_COLOR_GRADIENTS[
      staticColor
    ]}; color: ${staticColor === 'white' ? 'white' : 'black'};"
  >
    ${children}
  </div>
`;
