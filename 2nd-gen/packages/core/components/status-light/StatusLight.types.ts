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

/**
 * @todo Rename STATUSLIGHT_ prefix to STATUS_LIGHT_ to align with type prefix
 * naming convention (use underscore separators for multi-word names).
 */
import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

export const STATUSLIGHT_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

export const STATUSLIGHT_VARIANTS_SEMANTIC = [
  'neutral',
  'info',
  'positive',
  'negative',
  'notice',
] as const;

export const STATUSLIGHT_VARIANTS_COLOR = [
  'fuchsia',
  'indigo',
  'magenta',
  'purple',
  'seafoam',
  'yellow',
  'chartreuse',
  'celery',
  'cyan',
  'pink',
  'turquoise',
  'brown',
  'cinnamon',
  'silver',
] as const;

export const STATUSLIGHT_VARIANTS = [
  ...STATUSLIGHT_VARIANTS_SEMANTIC,
  ...STATUSLIGHT_VARIANTS_COLOR,
] as const;

export type StatusLightSemanticVariant =
  (typeof STATUSLIGHT_VARIANTS_SEMANTIC)[number];

export type StatusLightColorVariant =
  (typeof STATUSLIGHT_VARIANTS_COLOR)[number];

export type StatusLightVariant = (typeof STATUSLIGHT_VARIANTS)[number];
