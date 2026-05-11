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

import { nothing, TemplateResult } from 'lit';

// Matches the Spectrum icon numeric suffix convention used in icon element file names.
// Aligns with spectrum-css's appendUiIconDefaultSizing mapping.
const sizeToSuffix: Record<string, string> = {
  xs: '50',
  s: '75',
  m: '100',
  l: '200',
  xl: '300',
  xxl: '400',
};

/**
 * Resolves a Spectrum icon TemplateResult from a namespace import of icon elements,
 * a PascalCase base name, and a t-shirt size string.
 *
 * Tries the size-variant key first (e.g. `Checkmark100Icon`), then falls back to
 * the unsuffixed key (e.g. `AlertIcon`) for icons with no size variants.
 *
 * @example
 * import * as Icons from '../icon/elements/index.js';
 * iconForSize(Icons, 'Checkmark', 'l') // → Icons.Checkmark200Icon()
 * iconForSize(Icons, 'Alert', 'm')     // → Icons.AlertIcon()
 */
export const iconForSize = (
  icons: Record<string, () => TemplateResult>,
  baseName: string,
  size: string
): TemplateResult | typeof nothing => {
  const suffix = sizeToSuffix[size] ?? '100';
  const sizedFn = icons[`${baseName}${suffix}Icon`];
  if (sizedFn) {
    return sizedFn();
  }
  const fixedFn = icons[`${baseName}Icon`];
  if (fixedFn) {
    return fixedFn();
  }
  return nothing;
};
