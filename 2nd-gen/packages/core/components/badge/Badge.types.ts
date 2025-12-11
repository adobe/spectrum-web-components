/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/*
 * @todo The S1 types can be removed once we are no longer maintaining 1st-gen.
 */

import type { ElementSize } from '@spectrum-web-components/core/shared/base/index.js';

export const VALID_SIZES: ElementSize[] = ['s', 'm', 'l'] as const;

export const FIXED_VALUES = [
    'inline-start',
    'inline-end',
    'block-start',
    'block-end',
] as const;

export type FixedValues = (typeof FIXED_VALUES)[number];

export const BADGE_VARIANTS_SEMANTIC = [
    'accent',
    'neutral',
    'informative',
    'positive',
    'negative',
    'notice',
] as const;

export const BADGE_VARIANTS_COLOR_S1 = [
    'fuchsia',
    'indigo',
    'magenta',
    'purple',
    'seafoam',
    'yellow',
    'gray',
    'red',
    'orange',
    'chartreuse',
    'celery',
    'green',
    'cyan',
    'blue',
] as const;

export const BADGE_VARIANTS_COLOR_S2 = [
    ...BADGE_VARIANTS_COLOR_S1,
    'pink',
    'turquoise',
    'brown',
    'cinnamon',
    'silver',
] as const;

export const BADGE_VARIANTS_S1 = [
    ...BADGE_VARIANTS_SEMANTIC,
    ...BADGE_VARIANTS_COLOR_S1,
] as const;

export const BADGE_VARIANTS_S2 = [
    ...BADGE_VARIANTS_SEMANTIC,
    ...BADGE_VARIANTS_COLOR_S2,
] as const;

export type BadgeVariantS1 = (typeof BADGE_VARIANTS_S1)[number];
export type BadgeVariantS2 = (typeof BADGE_VARIANTS_S2)[number];
export type BadgeVariant = BadgeVariantS1 | BadgeVariantS2;
