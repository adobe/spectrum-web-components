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
import {
  create,
  type ThemeVars,
  type ThemeVarsPartial,
} from 'storybook/theming';

import type { ColorScheme } from './color-scheme.js';

/**
 * The Spectrum token, without its `--swc-` prefix, behind each Storybook
 * theme color.
 */
const THEME_COLOR_TOKENS = {
  colorPrimary: 'accent-content-color-default',
  colorSecondary: 'accent-background-color-default',
  appBg: 'background-layer-1-color',
  appContentBg: 'background-base-color',
  appHoverBg: 'tree-view-row-background-hover',
  appPreviewBg: 'background-base-color',
  appBorderColor: 'gray-200',
  textColor: 'neutral-content-color-default',
  textInverseColor: 'gray-25',
  textMutedColor: 'neutral-subdued-content-color-default',
  barTextColor: 'neutral-subdued-content-color-default',
  barHoverColor: 'accent-content-color-hover',
  barSelectedColor: 'accent-content-color-default',
  barBg: 'background-base-color',
  buttonBg: 'gray-100',
  buttonBorder: 'gray-300',
  booleanBg: 'gray-100',
  booleanSelectedBg: 'background-elevated-color',
  inputBg: 'background-base-color',
  inputBorder: 'gray-300',
  inputTextColor: 'neutral-content-color-default',
} satisfies Partial<Record<keyof ThemeVars, string>>;

/**
 * Storybook passes theme colors to `polished` (for example `opacify()`),
 * which cannot parse `var()` or `light-dark()`. Resolve each token to a
 * concrete color by applying it to a probe element that uses the requested
 * color scheme. This needs the token stylesheet to be loaded on the page.
 */
const resolveThemeColors = (
  scheme: ColorScheme
): Record<keyof typeof THEME_COLOR_TOKENS, string> => {
  const probe = document.createElement('div');
  probe.style.display = 'none';
  probe.style.colorScheme = scheme;
  document.body.append(probe);

  const colors = Object.fromEntries(
    Object.entries(THEME_COLOR_TOKENS).map(([key, token]) => {
      probe.style.color = `var(--swc-${token})`;
      return [key, getComputedStyle(probe).color];
    })
  ) as Record<keyof typeof THEME_COLOR_TOKENS, string>;

  probe.remove();
  return colors;
};

/**
 * Creates a Storybook theme that uses Spectrum token colors for the given
 * color scheme. Use `overrides` for values that aren't colors, such as
 * branding.
 */
export const createSpectrumTheme = (
  scheme: ColorScheme,
  overrides: Omit<ThemeVarsPartial, 'base'> = {}
): ThemeVars =>
  create({
    base: scheme,
    fontBase: 'var(--swc-sans-font-family-stack)',
    ...resolveThemeColors(scheme),
    ...overrides,
  });
