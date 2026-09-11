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
export declare const STATUSLIGHT_VALID_SIZES: readonly ["s", "m", "l", "xl"];
export declare const STATUSLIGHT_VARIANTS_SEMANTIC: readonly ["neutral", "info", "positive", "negative", "notice"];
export declare const STATUSLIGHT_VARIANTS_SEMANTIC_S1: readonly ["neutral", "info", "positive", "negative", "notice", "accent"];
export declare const STATUSLIGHT_VARIANTS_SEMANTIC_S2: readonly ["neutral", "info", "positive", "negative", "notice"];
export declare const STATUSLIGHT_VARIANTS_COLOR_S1: readonly ["fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan"];
export declare const STATUSLIGHT_VARIANTS_COLOR_S2: readonly ["fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan", "pink", "turquoise", "brown", "cinnamon", "silver"];
export declare const STATUSLIGHT_VARIANTS_S1: readonly ["neutral", "info", "positive", "negative", "notice", "accent", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan"];
export declare const STATUSLIGHT_VARIANTS_S2: readonly ["neutral", "info", "positive", "negative", "notice", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan", "pink", "turquoise", "brown", "cinnamon", "silver"];
export type StatusLightSemanticVariantS1 = (typeof STATUSLIGHT_VARIANTS_SEMANTIC_S1)[number];
export type StatusLightSemanticVariantS2 = (typeof STATUSLIGHT_VARIANTS_SEMANTIC_S2)[number];
export type StatusLightSemanticVariant = StatusLightSemanticVariantS1 | StatusLightSemanticVariantS2;
export type StatusLightColorVariantS1 = (typeof STATUSLIGHT_VARIANTS_COLOR_S1)[number];
export type StatusLightColorVariantS2 = (typeof STATUSLIGHT_VARIANTS_COLOR_S2)[number];
export type StatusLightColorVariant = StatusLightColorVariantS1 | StatusLightColorVariantS2;
export type StatusLightVariantS1 = (typeof STATUSLIGHT_VARIANTS_S1)[number];
export type StatusLightVariantS2 = (typeof STATUSLIGHT_VARIANTS_S2)[number];
export type StatusLightVariant = StatusLightVariantS1 | StatusLightVariantS2;
