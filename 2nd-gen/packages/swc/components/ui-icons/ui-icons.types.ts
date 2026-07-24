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
import { TemplateResult } from 'lit';

import { IconSize } from '@adobe/spectrum-wc-core/components/icon';

/**
 * The numeral optical steps a UI icon can ship, from smallest to largest. These are
 * the Spectrum numeral scale values, not pixel sizes.
 */
export const UI_STEPS = [50, 75, 100, 200, 300] as const;

export type UiStep = (typeof UI_STEPS)[number];

/**
 * Per-logical-icon art: a numeral optical step mapped to its rendered template. Not
 * every logical icon ships every step, so the record is partial.
 */
export type UiIconArt = Partial<Record<UiStep, TemplateResult>>;

/**
 * Fixed t-shirt size to numeral step map (see `icon-rfc.md`, section 7). Stable
 * since Spectrum 1.
 */
export const SIZE_TO_STEP = {
  xs: 50,
  s: 75,
  m: 100,
  l: 200,
  xl: 300,
} as const satisfies Record<IconSize, UiStep>;

/**
 * Resolves the numeral optical step for a t-shirt size. Callers that render from a
 * `UiIconArt` bundle should fall back to the nearest available step when the exact
 * one is absent.
 */
export function uiStepFor(size: IconSize): UiStep {
  return SIZE_TO_STEP[size];
}
