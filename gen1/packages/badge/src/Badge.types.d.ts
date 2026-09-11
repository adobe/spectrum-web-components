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
export declare const BADGE_VALID_SIZES: readonly ["s", "m", "l", "xl"];
export declare const BADGE_VARIANTS_SEMANTIC: readonly ["accent", "informative", "neutral", "positive", "notice", "negative"];
export declare const BADGE_VARIANTS_COLOR: readonly ["fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue", "pink", "turquoise", "brown", "cinnamon", "silver"];
export declare const FIXED_VALUES: readonly ["block-start", "block-end", "inline-start", "inline-end"];
export declare const BADGE_VARIANTS_COLOR_S1: readonly ["fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
export declare const BADGE_VARIANTS_S1: readonly ["accent", "informative", "neutral", "positive", "notice", "negative", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
export declare const BADGE_VARIANTS: readonly ["accent", "informative", "neutral", "positive", "notice", "negative", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue", "pink", "turquoise", "brown", "cinnamon", "silver"];
export type FixedValues = (typeof FIXED_VALUES)[number];
export type BadgeSize = (typeof BADGE_VALID_SIZES)[number];
export type BadgeSemanticVariant = (typeof BADGE_VARIANTS_SEMANTIC)[number];
export type BadgeColorVariantS1 = (typeof BADGE_VARIANTS_COLOR_S1)[number];
export type BadgeVariantS1 = (typeof BADGE_VARIANTS_S1)[number];
export type BadgeColorVariant = (typeof BADGE_VARIANTS_COLOR)[number];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
