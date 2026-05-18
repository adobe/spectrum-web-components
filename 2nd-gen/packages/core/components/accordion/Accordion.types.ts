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

import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

export const ACCORDION_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];
export type AccordionSize = (typeof ACCORDION_VALID_SIZES)[number];

export const ACCORDION_DENSITIES = ['compact', 'regular', 'spacious'] as const;
export type AccordionDensity = (typeof ACCORDION_DENSITIES)[number];

export const ACCORDION_HEADING_LEVELS = [2, 3, 4, 5, 6] as const;
export type AccordionHeadingLevel = (typeof ACCORDION_HEADING_LEVELS)[number];

export const SWC_ACCORDION_ITEM_TOGGLE_EVENT = 'swc-accordion-item-toggle';
