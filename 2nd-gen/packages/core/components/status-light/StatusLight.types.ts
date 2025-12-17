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

export const STATUSLIGHT_VARIANTS_SEMANTIC = [
    'neutral',
    'info',
    'positive',
    'negative',
    'notice',
] as const;

export const STATUSLIGHT_VARIANTS_SEMANTIC_S1 = [
    ...STATUSLIGHT_VARIANTS_SEMANTIC,
    'accent',
] as const;

export const STATUSLIGHT_VARIANTS_SEMANTIC_S2 = [
    ...STATUSLIGHT_VARIANTS_SEMANTIC,
] as const;

export const STATUSLIGHT_VARIANTS_COLOR_S1 = [
    'fuchsia',
    'indigo',
    'magenta',
    'purple',
    'seafoam',
    'yellow',
    'chartreuse',
    'celery',
    'cyan',
] as const;

export const STATUSLIGHT_VARIANTS_COLOR_S2 = [
    ...STATUSLIGHT_VARIANTS_COLOR_S1,
    'pink',
    'turquoise',
    'brown',
    'cinnamon',
    'silver',
] as const;

export const STATUSLIGHT_VARIANTS_S1 = [
    ...STATUSLIGHT_VARIANTS_SEMANTIC_S1,
    ...STATUSLIGHT_VARIANTS_COLOR_S1,
] as const;

export const STATUSLIGHT_VARIANTS_S2 = [
    ...STATUSLIGHT_VARIANTS_SEMANTIC_S2,
    ...STATUSLIGHT_VARIANTS_COLOR_S2,
] as const;

export type StatusLightSemanticVariantS1 =
    (typeof STATUSLIGHT_VARIANTS_SEMANTIC_S1)[number];
export type StatusLightSemanticVariantS2 =
    (typeof STATUSLIGHT_VARIANTS_SEMANTIC_S2)[number];
export type StatusLightSemanticVariant =
    | StatusLightSemanticVariantS1
    | StatusLightSemanticVariantS2;

export type StatusLightColorVariantS1 =
    (typeof STATUSLIGHT_VARIANTS_COLOR_S1)[number];
export type StatusLightColorVariantS2 =
    (typeof STATUSLIGHT_VARIANTS_COLOR_S2)[number];
export type StatusLightColorVariant =
    | StatusLightColorVariantS1
    | StatusLightColorVariantS2;

export type StatusLightVariantS1 = (typeof STATUSLIGHT_VARIANTS_S1)[number];
export type StatusLightVariantS2 = (typeof STATUSLIGHT_VARIANTS_S2)[number];
export type StatusLightVariant = StatusLightVariantS1 | StatusLightVariantS2;
